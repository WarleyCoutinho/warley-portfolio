"use client";

import { m } from "motion/react";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

type RevealProps = {
  children: ReactNode;
  /** Posição na sequência (stagger de 80 ms por índice). */
  index?: number;
  className?: string;
};

/** Fade + subida de 24 px ao entrar na tela. Anima uma única vez. */
export function Reveal({ children, index = 0, className }: RevealProps) {
  return (
    <m.div
      data-reveal
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 0.9, ease: EASE, delay: index * 0.08 }}
    >
      {children}
    </m.div>
  );
}

/** Variante "máscara": a linha sobe de dentro de uma janela com overflow oculto. */
export function RevealMask({ children, index = 0, className }: RevealProps) {
  return (
    <span className={cn("block overflow-hidden pb-[0.12em] -mb-[0.12em]", className)}>
      <m.span
        data-reveal
        className="block"
        initial={{ y: "110%" }}
        whileInView={{ y: 0 }}
        viewport={{ once: true, margin: "0px 0px -8% 0px" }}
        transition={{ duration: 1, ease: EASE, delay: index * 0.08 }}
      >
        {children}
      </m.span>
    </span>
  );
}
