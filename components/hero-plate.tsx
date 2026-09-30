"use client";

import { useRef, type PointerEvent } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import Image from "next/image";

const badges = ["Next.js", "Fastify", "TypeScript"];

const badgePosition: Record<number, { top: string; left: string }> = {
  0: { top: "-8%", left: "68%" },
  1: { top: "40%", left: "-16%" },
  2: { top: "86%", left: "62%" },
};

export function HeroPlate() {
  const ref = useRef<HTMLDivElement>(null);
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const spx = useSpring(px, { stiffness: 140, damping: 16, mass: 0.4 });
  const spy = useSpring(py, { stiffness: 140, damping: 16, mass: 0.4 });

  const rotateX = useTransform(spy, [0, 1], [11, -11]);
  const rotateY = useTransform(spx, [0, 1], [-13, 13]);
  const shadowX = useTransform(spx, [0, 1], [16, -16]);
  const shadowY = useTransform(spy, [0, 1], [10, -10]);
  const spotX = useTransform(spx, (v) => `${v * 100}%`);
  const spotY = useTransform(spy, (v) => `${v * 100}%`);

  function handleMove(e: PointerEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    px.set((e.clientX - rect.left) / rect.width);
    py.set((e.clientY - rect.top) / rect.height);
  }

  function handleLeave() {
    px.set(0.5);
    py.set(0.5);
  }

  return (
    <div
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      className="group relative mx-auto h-70 w-60 select-none sm:h-80 sm:w-70"
      style={{ perspective: 1400 }}
    >
      <motion.div
        aria-hidden
        className="absolute inset-x-8 bottom-0 h-10 rounded-full bg-black/60 blur-2xl"
        style={{ x: shadowX, y: shadowY }}
      />

      <motion.div
        className="relative h-full w-full"
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        initial={{ opacity: 0, rotateX: 22, rotateY: -16, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
      >
        <div
          className="absolute inset-0 rounded-lg border border-border bg-bg-raised-2"
          style={{ transform: "translateZ(-26px) scale(0.93)" }}
        />
        <div
          className="absolute inset-0 rounded-lg border border-border-soft"
          style={{
            transform: "translateZ(-12px) scale(0.965)",
            background:
              "linear-gradient(155deg, var(--color-bg-raised) 0%, var(--color-bg-raised-2) 100%)",
          }}
        />
        <div
          className="absolute inset-0 rounded-lg border border-border"
          style={{
            transform: "translateZ(0px)",
            background:
              "linear-gradient(155deg, var(--color-bg-raised) 0%, var(--color-bg-raised-2) 65%, var(--color-bg-raised) 100%)",
          }}
        />
        <div
          className="bg-blueprint absolute inset-0 rounded-lg opacity-25"
          style={{ transform: "translateZ(4px)" }}
        />

        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-lg opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            transform: "translateZ(6px)",
            background: useTransform(
              [spotX, spotY],
              ([x, y]) =>
                `radial-gradient(160px circle at ${x} ${y}, color-mix(in srgb, var(--color-amber) 28%, transparent), transparent 72%)`,
            ),
          }}
        />

        {(
          [
            ["18px", "18px"],
            ["calc(100% - 18px)", "18px"],
            ["18px", "calc(100% - 18px)"],
            ["calc(100% - 18px)", "calc(100% - 18px)"],
          ] as const
        ).map(([x, y], i) => (
          <div
            key={i}
            className="absolute size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-dim"
            style={{ left: x, top: y, transform: "translateZ(18px)" }}
          />
        ))}

        <div
          className="absolute inset-0 flex flex-col items-center justify-center gap-2"
          style={{ transform: "translateZ(36px)" }}
        >
          <div className="size-23 overflow-hidden rounded-md border border-amber-dim shadow-[0_14px_30px_-10px_rgba(0,0,0,0.7)] sm:size-26">
            <Image
              src="/images/warley-avatar.jpg"
              alt="Warley Coutinho"
              width={208}
              height={208}
              className="h-full w-full object-cover grayscale-15 contrast-[1.05]"
              priority
            />
          </div>
          <span className="mt-1 font-mono-brand text-[10px] tracking-[0.18em] text-text-dim">
            FULL STACK DEV
          </span>
          <span className="h-px w-9 bg-amber-dim" />
          <span className="font-mono-brand text-[10px] text-text-faint">
            Adapti Code · 2026
          </span>
        </div>

        {badges.map((label, i) => (
          <motion.div
            key={label}
            className="absolute rounded-sm border border-border bg-bg px-2.5 py-1.5 font-mono-brand text-[11px] text-text-dim shadow-[0_10px_24px_-8px_rgba(0,0,0,0.6)]"
            style={{
              transform: `translateZ(${58 + i * 8}px)`,
              ...badgePosition[i],
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              delay: 0.45 + i * 0.12,
              duration: 0.5,
              ease: "easeOut",
            }}
          >
            {label}
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
