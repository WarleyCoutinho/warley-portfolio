"use client";

import { useRef, type PointerEvent, type ReactNode } from "react";

type SpotlightProps = {
  children: ReactNode;
  className?: string;
  /** Raio do glow em px. */
  size?: number;
};

export function Spotlight({
  children,
  className = "",
  size = 200,
}: SpotlightProps) {
  const ref = useRef<HTMLDivElement>(null);

  function handleMove(e: PointerEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    ref.current?.style.setProperty("--spot-x", `${e.clientX - rect.left}px`);
    ref.current?.style.setProperty("--spot-y", `${e.clientY - rect.top}px`);
  }

  return (
    <div
      ref={ref}
      onPointerMove={handleMove}
      className={`group/spotlight relative inline-flex ${className}`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover/spotlight:opacity-100"
        style={{
          background: `radial-gradient(${size}px circle at var(--spot-x, 50%) var(--spot-y, 50%), color-mix(in srgb, var(--color-amber) 22%, transparent), transparent 72%)`,
        }}
      />
      {children}
    </div>
  );
}
