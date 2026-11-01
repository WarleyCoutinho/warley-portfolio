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
 * Acompanha a rolagem da seção hero com os 81 frames (GSAP ScrollTrigger).
 *
 * - No topo, o vídeo toca normalmente (com som, como antes).
 * - Ao rolar, o canvas assume (mesmo recorte central do vídeo) e avança/
 *   retrocede com o scroll; o retrato faz um dolly-in leve.
 * - O zoom é aplicado direto no <video>/<canvas>, nunca num ancestral: um
 *   transform no wrapper isolaria o `mix-blend-mode: multiply` do `.hero-video`
 *   e o fundo branco deixaria de sumir no papel.
 * - GSAP só é baixado depois do carregamento inicial (idle). Sem JS, com
 *   `prefers-reduced-motion` ou `saveData`, a página segue só com o vídeo.
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
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (disposed) return;
      gsap.registerPlugin(ScrollTrigger);

      const frames: (HTMLCanvasElement | undefined)[] = new Array(FRAME_COUNT);
      const proxy = { f: 0 };
      const volume = { v: 1 };
      let loadedCount = 0;
      let ready = false;
      let lastKey = -1;
      let tweens: { kill: () => unknown }[] = [];

      const nearest = (index: number) => {
        for (let d = 0; d < FRAME_COUNT; d++) {
          const before = frames[index - d];
          if (before) return before;
          const after = frames[index + d];
          if (after) return after;
        }
        return undefined;
      };

      /** Desenha o frame fracionário `f`: mistura 2 vizinhos (a fonte tem só 10 fps). */
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
              if (scrubbingRef.current) paint(proxy.f);
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

      const killTweens = () => {
        tweens.forEach((tween) => tween.kill());
        tweens = [];
      };

      const handOff = (on: boolean) => {
        if (on === scrubbingRef.current) return;
        if (on && !ready) return; // frames ainda chegando: o vídeo continua
        scrubbingRef.current = on;
        killTweens();

        if (on) {
          paint(proxy.f);
          tweens = [
            gsap.to(canvas, {
              opacity: 1,
              duration: FADE,
              ease: "power1.out",
              onComplete: () => {
                // Só esconde o vídeo com o canvas opaco (evita "fantasma" no multiply).
                if (scrubbingRef.current) video.style.visibility = "hidden";
              },
            }),
            gsap.to(volume, {
              v: 0,
              duration: FADE + 0.1,
              ease: "none",
              onUpdate: () => {
                video.volume = volume.v;
              },
              onComplete: () => {
                if (scrubbingRef.current) video.pause();
              },
            }),
          ];
          return;
        }

        volume.v = 1;
        video.volume = 1;
        video.style.visibility = "";
        video.currentTime = 0; // volta ao frame 1, igual ao do canvas
        video.play().catch(() => {
          video.muted = true;
          video.play().catch(() => undefined);
        });
        tweens = [gsap.to(canvas, { opacity: 0, duration: FADE })];
      };

      const context = gsap.context(() => {
        gsap.set([video, canvas], { transformOrigin: "50% 30%" });

        gsap
          .timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: "bottom 40%",
              scrub: 0.5,
              onUpdate: (self) => handOff(self.progress > HANDOFF),
            },
          })
          .fromTo(
            [video, canvas],
            { scale: 1 },
            { scale: DOLLY_SCALE, duration: 1 },
            0,
          )
          .fromTo(
            proxy,
            { f: 0 },
            { f: LAST_FRAME, duration: 1 - HANDOFF, onUpdate: () => paint(proxy.f) },
            HANDOFF,
          );
      }, section);

      teardown = () => {
        context.revert(); // mata timeline + ScrollTrigger e limpa o transform inline
        killTweens();
        video.style.visibility = "";
        video.volume = 1;
        canvas.style.opacity = "";
        scrubbingRef.current = false;
        frames.fill(undefined);
      };
    };

    const run = () => {
      start().catch((error: unknown) => {
        // Falha ao carregar o GSAP: o hero segue funcionando só com o vídeo.
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
