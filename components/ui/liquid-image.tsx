"use client";

import { useEffect, useRef } from "react";

import { cn } from "@/lib/utils";

const VERTEX = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

// Ondas que irradiam do cursor + um balanço líquido leve na imagem toda.
const FRAGMENT = /* glsl */ `
  uniform sampler2D uTexture;
  uniform vec2 uMouse;
  uniform vec2 uScale;
  uniform float uAspect;
  uniform float uHover;
  uniform float uTime;
  varying vec2 vUv;

  void main() {
    vec2 uv = (vUv - 0.5) * uScale + 0.5;

    vec2 d = vUv - uMouse;
    d.x *= uAspect;
    float dist = length(d);
    float falloff = smoothstep(0.5, 0.0, dist) * uHover;
    float wave = sin(dist * 26.0 - uTime * 3.2);
    vec2 dir = d / max(dist, 0.0001);

    vec2 offset = dir * wave * 0.014 * falloff;
    offset += vec2(
      sin(uv.y * 9.0 + uTime * 1.4),
      cos(uv.x * 9.0 + uTime * 1.2)
    ) * 0.004 * uHover;

    gl_FragColor = texture2D(uTexture, uv + offset);
  }
`;

type Props = {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** Classes do contêiner. */
  className?: string;
  /** Classes da <img> (ex.: blend/tema). */
  imgClassName?: string;
};

/**
 * Imagem com distorção líquida ao passar o mouse (three.js).
 *
 * - A <img> comum é sempre renderizada (SEO, a11y, fallback).
 * - O WebGL só existe com mouse (hover + pointer fino), sem
 *   `prefers-reduced-motion` e fora do tema escuro; `three` é baixado quando
 *   o componente chega perto da tela, e o loop de render só roda durante o hover.
 * - Com o efeito parado o canvas e a imagem são idênticos, então a troca é invisível.
 */
export function LiquidImage({
  src,
  alt,
  width,
  height,
  className,
  imgClassName,
}: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const img = imgRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !img || !canvas) return;

    const eligible =
      window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!eligible) return;

    let disposed = false;
    let teardown = () => {};

    const init = async () => {
      const THREE = await import("three");
      if (disposed) return;

      const renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setClearColor(0x000000, 0);

      const scene = new THREE.Scene();
      const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
      const geometry = new THREE.PlaneGeometry(2, 2);
      const uniforms = {
        uTexture: { value: null as unknown },
        uMouse: { value: new THREE.Vector2(0.5, 0.5) },
        uScale: { value: new THREE.Vector2(1, 1) },
        uAspect: { value: 1 },
        uHover: { value: 0 },
        uTime: { value: 0 },
      };
      const material = new THREE.ShaderMaterial({
        uniforms,
        vertexShader: VERTEX,
        fragmentShader: FRAGMENT,
        transparent: true,
      });
      scene.add(new THREE.Mesh(geometry, material));

      let texture: InstanceType<typeof THREE.Texture> | undefined;
      let imageAspect = width / height;
      let ready = false;
      let raf = 0;
      let hover = 0;
      let hoverTarget = 0;
      const target = { x: 0.5, y: 0.5 };
      const current = { x: 0.5, y: 0.5 };

      const resize = () => {
        const w = wrap.clientWidth;
        const h = wrap.clientHeight;
        if (!w || !h) return;
        renderer.setSize(w, h, false);
        const boxAspect = w / h;
        uniforms.uAspect.value = boxAspect;
        // "cover": preenche a caixa sem distorcer a imagem
        uniforms.uScale.value.set(
          boxAspect > imageAspect ? 1 : boxAspect / imageAspect,
          boxAspect > imageAspect ? imageAspect / boxAspect : 1,
        );
        if (ready) renderer.render(scene, camera);
      };

      const show = (on: boolean) => {
        canvas.style.opacity = on ? "1" : "0";
        img.style.opacity = on ? "0" : "";
      };

      const tick = (time: number) => {
        raf = 0;
        current.x += (target.x - current.x) * 0.14;
        current.y += (target.y - current.y) * 0.14;
        hover += (hoverTarget - hover) * 0.09;
        uniforms.uMouse.value.set(current.x, current.y);
        uniforms.uHover.value = hover;
        uniforms.uTime.value = time / 1000;
        renderer.render(scene, camera);
        if (hoverTarget === 0 && hover < 0.003) {
          show(false); // imagem e canvas são iguais aqui: troca invisível
          return;
        }
        raf = requestAnimationFrame(tick);
      };
      const wake = () => {
        if (!raf) raf = requestAnimationFrame(tick);
      };

      const updateTarget = (event: PointerEvent) => {
        const rect = wrap.getBoundingClientRect();
        target.x = (event.clientX - rect.left) / rect.width;
        target.y = 1 - (event.clientY - rect.top) / rect.height;
      };
      const onEnter = (event: PointerEvent) => {
        if (!ready || event.pointerType !== "mouse") return;
        // No tema escuro o logo ganha painel claro (CSS): fica só a imagem.
        if (document.documentElement.classList.contains("dark")) return;
        updateTarget(event);
        current.x = target.x;
        current.y = target.y;
        hoverTarget = 1;
        show(true);
        wake();
      };
      const onMove = (event: PointerEvent) => {
        if (event.pointerType === "mouse") updateTarget(event);
      };
      const onLeave = () => {
        hoverTarget = 0;
        wake();
      };

      const observer = new ResizeObserver(resize);
      observer.observe(wrap);

      new THREE.TextureLoader().load(
        img.currentSrc || img.src,
        (loaded) => {
          if (disposed) {
            loaded.dispose();
            return;
          }
          texture = loaded;
          const source = loaded.image as { width: number; height: number };
          imageAspect = source.width / source.height;
          uniforms.uTexture.value = loaded;
          ready = true;
          resize();
          renderer.render(scene, camera);
        },
        undefined,
        (error: unknown) => {
          // Sem textura o efeito não liga e a <img> continua normal.
          console.error("[liquid-image] falha ao carregar a textura:", error);
        },
      );

      wrap.addEventListener("pointerenter", onEnter);
      wrap.addEventListener("pointermove", onMove);
      wrap.addEventListener("pointerleave", onLeave);

      teardown = () => {
        if (raf) cancelAnimationFrame(raf);
        observer.disconnect();
        wrap.removeEventListener("pointerenter", onEnter);
        wrap.removeEventListener("pointermove", onMove);
        wrap.removeEventListener("pointerleave", onLeave);
        show(false);
        texture?.dispose();
        geometry.dispose();
        material.dispose();
        renderer.dispose();
        renderer.forceContextLoss();
      };
    };

    const start = () => {
      init().catch((error: unknown) => {
        console.error("[liquid-image] não foi possível iniciar:", error);
      });
    };

    // `three` só é baixado quando o componente chega perto da tela.
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          io.disconnect();
          start();
        }
      },
      { rootMargin: "200px" },
    );
    io.observe(wrap);

    return () => {
      disposed = true;
      io.disconnect();
      teardown();
    };
  }, [src, width, height]);

  return (
    <div ref={wrapRef} className={cn("relative", className)}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={cn("block h-auto w-full transition-opacity duration-200", imgClassName)}
      />
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 size-full mix-blend-multiply opacity-0 transition-opacity duration-200"
      />
    </div>
  );
}
