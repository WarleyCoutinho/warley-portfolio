"use client";

import type { PointerEvent, ReactNode } from "react";
import { m, useMotionTemplate, useMotionValue, useSpring } from "motion/react";

import { usePrefersReducedMotion } from "@/lib/hooks";
import { cn } from "@/lib/utils";

const RADIUS = 170;

type Props = {
  href: string;
  /** Classes do link (a camada revelada herda o tamanho dele). */
  className?: string;
  /** Classes da camada revelada (fundo, cor, layout). */
  revealClassName?: string;
  children: ReactNode;
  /** Conteúdo visível só dentro do círculo que segue o cursor. */
  reveal: ReactNode;
};

/**
 * Revelação com o mouse: um círculo que segue o cursor mostra uma segunda
 * camada por cima do link. Só com mouse e sem `prefers-reduced-motion`; a
 * camada é decorativa (aria-hidden), o link comum continua completo.
 */
export function CursorReveal({
  href,
  className,
  revealClassName,
  children,
  reveal,
}: Props) {
  const reduceMotion = usePrefersReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const radius = useSpring(0, { stiffness: 170, damping: 24, mass: 0.6 });
  const clip = useMotionTemplate`circle(${radius}px at ${x}px ${y}px)`;

  function track(event: PointerEvent<HTMLAnchorElement>) {
    if (reduceMotion || event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    x.set(event.clientX - rect.left);
    y.set(event.clientY - rect.top);
  }

  return (
    <a
      href={href}
      className={cn("relative overflow-hidden", className)}
      onPointerEnter={(event) => {
        track(event);
        if (!reduceMotion && event.pointerType === "mouse") radius.set(RADIUS);
      }}
      onPointerMove={track}
      onPointerLeave={() => radius.set(0)}
    >
      {children}
      <m.span
        aria-hidden="true"
        className={cn("pointer-events-none absolute inset-0", revealClassName)}
        style={{ clipPath: clip }}
      >
        {reveal}
      </m.span>
    </a>
  );
}
