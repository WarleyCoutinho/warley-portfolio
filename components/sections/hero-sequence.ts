"use client";

import { useEffect, type RefObject } from "react";

/** Frames originais (1280×720) em /public/hero/frames: frame_00001.webp … frame_00081.webp. */
const FRAME_COUNT = 81;
const LAST_FRAME = FRAME_COUNT - 1;
/**
 * Recorte 4:5 central do frame 1280×720: é o mesmo que `object-cover` faz no
 * <video> dentro do slot do hero. Feito no carregamento, em 480×600, para não
 * manter 81 bitmaps 1280×720 na memória.
 */
const SRC_X = 352;
const SRC_Y = 0;
const SRC_W = 576;
const SRC_H = 720;
const FRAME_W = 480;
const FRAME_H = 600;
/** Progresso do scroll (0–1) a partir do qual a sequência assume o lugar do vídeo. */
const HANDOFF = 0.06;
/** Dolly-in sutil do retrato ao longo da rolagem. */
const DOLLY_SCALE = 1.06;
const FADE = 0.3;
/** Constante de tempo (s) da suavização do scroll: equivale a um scrub suave. */
const SMOOTH = 0.14;
const CONCURRENCY = 4;

const frameUrl = (index: number) =>
  `/hero/frames/frame_${String(index + 1).padStart(5, "0")}.webp`;

/** Ordem de carregamento do grosso ao fino: qualquer ponto do scroll já tem um frame próximo. */
function loadOrder(): number[] {
  const seen = new Set<number>();
  const order: number[] = [];
  for (const step of [10, 5, 2, 1]) {
    for (let i = 0; i < FRAME_COUNT; i += step) {
      if (seen.has(i)) continue;
      seen.add(i);
      order.push(i);
    }
  }
  return order;
}

function prefersSavedData(): boolean {
  const connection = (
    navigator as Navigator & { connection?: { saveData?: boolean } }
  ).connection;
  return connection?.saveData === true;
}

type Options = {
  enabled: boolean;
  videoRef: RefObject<HTMLVideoElement | null>;
  canvasRef: RefObject<HTMLCanvasElement | null>;
  /** `true` enquanto a sequência está no lugar do vídeo (o vídeo fica pausado). */
  scrubbingRef: RefObject<boolean>;
};

/**
 * Acompanha a rolagem da seção hero com os 81 frames (Motion: `scroll` + `animate`).
 *
 * - No topo, o vídeo toca normalmente (com som, como antes).
 * - Ao rolar, o canvas assume (mesmo recorte central do vídeo) e avança/
 *   retrocede com o scroll; o retrato faz um dolly-in leve.
 * - O zoom é aplicado direto no <video>/<canvas>, nunca num ancestral: um
 *   transform no wrapper isolaria o `mix-blend-mode: multiply` do `.hero-video`
 *   e o fundo branco deixaria de sumir no papel.
 * - O Motion vanilla só é baixado depois do carregamento inicial (idle). Sem JS,
 *   com `prefers-reduced-motion` ou `saveData`, a página segue só com o vídeo.
 */
export function useHeroScrollSequence({
  enabled,
  videoRef,
  canvasRef,
  scrubbingRef,
}: Options) {
  useEffect(() => {
    if (!enabled || prefersSavedData()) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const section = canvas?.closest("section");
    const ctx2d = canvas?.getContext("2d");
    if (!video || !canvas || !section || !ctx2d) return;

    let disposed = false;
    let teardown = () => {};

    const start = async () => {
      const { animate, scroll } = await import("motion");
      if (disposed) return;

      const frames: (HTMLCanvasElement | undefined)[] = new Array(FRAME_COUNT);
      let loadedCount = 0;
      let ready = false;
      let lastKey = -1;

      let rawProgress = 0;
      let smoothProgress = 0;
      let raf = 0;
      let lastTime = 0;
      let handOffId = 0;
      let running: { stop: () => unknown }[] = [];

      const frameAt = (progress: number) =>
        Math.min(Math.max((progress - HANDOFF) / (1 - HANDOFF), 0), 1) *
        LAST_FRAME;

      const nearest = (index: number) => {
        for (let d = 0; d < FRAME_COUNT; d++) {
          const before = frames[index - d];
          if (before) return before;
          const after = frames[index + d];
          if (after) return after;
        }
        return undefined;
      };

      /** Desenha o frame fracionário `f`: mistura 2 vizinhos (a fonte tem poucos fps). */
      const paint = (f: number) => {
        const clamped = Math.min(Math.max(f, 0), LAST_FRAME);
        const index = Math.floor(clamped);
        const blend = Math.round((clamped - index) * 8) / 8;
        const key = index + blend;
        if (key === lastKey) return;
        const base = nearest(index);
        if (!base) return;
        lastKey = key;
        ctx2d.globalAlpha = 1;
        ctx2d.drawImage(base, 0, 0, FRAME_W, FRAME_H);
        if (blend > 0 && index < LAST_FRAME) {
          const next = nearest(index + 1);
          if (next && next !== base) {
            ctx2d.globalAlpha = blend;
            ctx2d.drawImage(next, 0, 0, FRAME_W, FRAME_H);
            ctx2d.globalAlpha = 1;
          }
        }
      };

      const render = () => {
        const transform = `scale(${1 + (DOLLY_SCALE - 1) * smoothProgress})`;
        video.style.transform = transform;
        canvas.style.transform = transform;
        paint(frameAt(smoothProgress));
      };

      const loadFrame = (index: number) =>
        new Promise<void>((resolve) => {
          const img = new Image();
          img.decoding = "async";
          img.src = frameUrl(index);
          img
            .decode()
            .then(() => {
              if (disposed) return;
              const cropped = document.createElement("canvas");
              cropped.width = FRAME_W;
              cropped.height = FRAME_H;
              const croppedCtx = cropped.getContext("2d");
              if (!croppedCtx) return;
              croppedCtx.drawImage(img, SRC_X, SRC_Y, SRC_W, SRC_H, 0, 0, FRAME_W, FRAME_H);
              frames[index] = cropped;
              loadedCount += 1;
              if (!ready && frames[0] && loadedCount >= 5) ready = true;
              lastKey = -1;
              if (scrubbingRef.current) paint(frameAt(smoothProgress));
            })
            // Frame ausente: o vizinho mais próximo cobre; o vídeo segue como fallback.
            .catch(() => undefined)
            .finally(resolve);
        });

      const queue = loadOrder();
      let cursor = 0;
      const worker = async () => {
        while (!disposed) {
          const index = queue[cursor++];
          if (index === undefined) return;
          await loadFrame(index);
        }
      };
      void Promise.all(Array.from({ length: CONCURRENCY }, worker));

      /** Suaviza o progresso do scroll para o scrub não ficar "seco". */
      const step = (time: number) => {
        raf = 0;
        const dt = lastTime ? Math.min((time - lastTime) / 1000, 0.05) : 1 / 60;
        lastTime = time;
        smoothProgress += (rawProgress - smoothProgress) * (1 - Math.exp(-dt / SMOOTH));
        if (Math.abs(rawProgress - smoothProgress) < 0.0004) {
          smoothProgress = rawProgress;
          lastTime = 0;
          render();
          return;
        }
        render();
        raf = requestAnimationFrame(step);
      };
      const wake = () => {
        if (!raf) raf = requestAnimationFrame(step);
      };

      const stopRunning = () => {
        running.forEach((control) => control.stop());
        running = [];
      };

      const handOff = (on: boolean) => {
        if (on === scrubbingRef.current) return;
        if (on && !ready) return; // frames ainda chegando: o vídeo continua
        scrubbingRef.current = on;
        const id = ++handOffId;
        stopRunning();

        if (on) {
          paint(frameAt(smoothProgress));
          const fade = animate(canvas, { opacity: 1 }, { duration: FADE, ease: "easeOut" });
          const volume = animate(1, 0, {
            duration: FADE + 0.1,
            ease: "linear",
            onUpdate: (value) => {
              video.volume = value;
            },
          });
          fade.then(() => {
            // Só esconde o vídeo com o canvas opaco (evita "fantasma" no multiply).
            if (id === handOffId && scrubbingRef.current) {
              video.style.visibility = "hidden";
            }
          });
          volume.then(() => {
            if (id === handOffId && scrubbingRef.current) video.pause();
          });
          running = [fade, volume];
          return;
        }

        video.volume = 1;
        video.style.visibility = "";
        video.currentTime = 0; // volta ao frame 1, igual ao do canvas
        video.play().catch(() => {
          video.muted = true;
          video.play().catch(() => undefined);
        });
        running = [animate(canvas, { opacity: 0 }, { duration: FADE })];
      };

      video.style.transformOrigin = "50% 30%";
      canvas.style.transformOrigin = "50% 30%";

      // 0 = topo do hero no topo da tela; 1 = base do hero em 40% da altura da tela.
      const stopScroll = scroll(
        (progress: number) => {
          rawProgress = progress;
          handOff(progress > HANDOFF);
          wake();
        },
        { target: section, offset: ["start start", "end 40%"] },
      );

      teardown = () => {
        stopScroll();
        if (raf) cancelAnimationFrame(raf);
        stopRunning();
        handOffId += 1;
        video.style.transform = "";
        video.style.transformOrigin = "";
        video.style.visibility = "";
        video.volume = 1;
        canvas.style.transform = "";
        canvas.style.transformOrigin = "";
        canvas.style.opacity = "";
        scrubbingRef.current = false;
        frames.fill(undefined);
      };
    };

    const run = () => {
      start().catch((error: unknown) => {
        // Falha ao carregar o Motion: o hero segue funcionando só com o vídeo.
        console.error("[hero-sequence] não foi possível iniciar:", error);
      });
    };

    const usesIdle = typeof window.requestIdleCallback === "function";
    const handle = usesIdle
      ? window.requestIdleCallback(run, { timeout: 2500 })
      : window.setTimeout(run, 900);

    return () => {
      disposed = true;
      if (usesIdle) window.cancelIdleCallback(handle);
      else window.clearTimeout(handle);
      teardown();
    };
  }, [enabled, videoRef, canvasRef, scrubbingRef]);
}
