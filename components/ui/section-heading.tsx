import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type Props = {
  index: string;
  label: string;
  /** Título; a última palavra em itálico vai em `accent`. */
  children: ReactNode;
  accent: string;
  id?: string;
  className?: string;
  as?: "h1" | "h2";
};

/** Tag mono ("03 — Projetos") + título com UMA palavra em Instrument Serif itálico. */
export function SectionHeading({
  index,
  label,
  children,
  accent,
  id,
  className,
  as: Tag = "h2",
}: Props) {
  return (
    <div className={className}>
      <p className="mb-5 font-mono text-[12px] tracking-[0.14em] text-dim uppercase">
        {index} — {label}
      </p>
      <Tag
        id={id}
        className={cn("h-display text-[clamp(2.4rem,6vw,5.2rem)]")}
      >
        {children} <span className="accent">{accent}</span>
      </Tag>
    </div>
  );
}
