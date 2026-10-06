"use client";

import { useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { m, useInView, useScroll, useSpring } from "motion/react";

import { Badge } from "@/components/ui/badge";
import { SectionHeading } from "@/components/ui/section-heading";
import { usePrefersReducedMotion } from "@/lib/hooks";
import { TIMELINE, type TimelineItem } from "@/lib/data";
import { cn } from "@/lib/utils";

const LONG_TEXT = 220;

function Stop({ item, forceLit }: { item: TimelineItem; forceLit: boolean }) {
  const ref = useRef<HTMLLIElement>(null);
  const seen = useInView(ref, { once: true, margin: "0px 0px -45% 0px" });
  const lit = forceLit || seen;
  const [open, setOpen] = useState(false);
  const long = (item.detail?.length ?? 0) > LONG_TEXT;
  const detailId = `exp-${item.id}`;

  return (
    <li
      ref={ref}
      data-lit={lit}
      className="group relative grid gap-x-8 gap-y-2 pb-14 pl-9 last:pb-0 md:grid-cols-[180px_minmax(0,1fr)] md:pl-12"
    >
      <span
        aria-hidden="true"
        data-lit={lit}
        className="timeline-dot absolute top-1.75 left-0 size-3 -translate-x-1/2 rounded-full bg-paper shadow-[inset_0_0_0_2px_var(--color-line-strong)] transition-[background-color,box-shadow] duration-700 ease-(--ease)"
      />
      <p className="font-mono text-[12px] tracking-widest text-dim uppercase md:pt-2">
        {item.period}
        <span className="mt-1 block text-[11px] tracking-[0.14em] text-faint">
          {item.kind === "education" ? "Formação" : "Trabalho"}
        </span>
      </p>
      <div
        className={cn(
          "transition-opacity duration-700 ease-(--ease)",
          lit ? "opacity-100" : "opacity-45",
        )}
      >
        <h3 className="text-[clamp(1.4rem,2.4vw,2rem)] leading-tight font-semibold tracking-tight">
          {item.title}
        </h3>
        <p className="mt-1 text-[15px] text-dim">{item.place}</p>
        {item.detail && (
          <>
            <p
              id={detailId}
              className={cn(
                "mt-4 max-w-[68ch] text-[15.5px] leading-relaxed text-ink-2",
                long && !open && "line-clamp-3",
              )}
            >
              {item.detail}
            </p>
            {long && (
              <button
                type="button"
                aria-expanded={open}
                aria-controls={detailId}
                onClick={() => setOpen((v) => !v)}
                className="mt-2 inline-flex h-11 items-center text-[14px] font-medium underline decoration-line-strong underline-offset-4 hover:decoration-ink"
              >
                {open ? "ler menos" : "ler mais"}
              </button>
            )}
          </>
        )}
        {item.tags && (
          <ul className="mt-3 flex flex-wrap gap-2" aria-label="Tecnologias">
            {item.tags.map((tag) => (
              <li key={tag}>
                <Badge variant="outline">{tag}</Badge>
              </li>
            ))}
          </ul>
        )}
      </div>
    </li>
  );
}

export function Experience() {
  const listRef = useRef<HTMLOListElement>(null);
  const reduceMotion = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ["start 55%", "end 55%"],
  });
  const fill = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 26,
    mass: 0.4,
  });

  return (
    <section
      id="experiencia"
      aria-labelledby="experiencia-title"
      className="section-y"
    >
      <div className="container-x">
        <SectionHeading
          index="05"
          label="Experiência"
          accent="caminho."
          id="experiencia-title"
        >
          Meu
        </SectionHeading>

        <div className="relative mt-16 ml-1.5">
          {/* espinha: trilho + traço que desenha com a rolagem */}
          <div
            aria-hidden="true"
            className="absolute top-2 bottom-2 left-0 w-px bg-line"
          />
          <m.div
            aria-hidden="true"
            className="absolute top-2 bottom-2 left-0 w-px origin-top bg-ink"
            style={{ scaleY: reduceMotion ? 1 : fill }}
          />
          <ol ref={listRef}>
            {TIMELINE.map((item) => (
              <Stop key={item.id} item={item} forceLit={reduceMotion} />
            ))}
          </ol>
        </div>

        <a
          href="#contato"
          className="group mt-16 flex min-h-28 flex-wrap items-center justify-between gap-4 rounded-[28px] border border-dashed border-line-strong p-8 transition-colors duration-500 ease-(--ease) hover:bg-card"
        >
          <span>
            <span className="block font-mono text-[12px] tracking-[0.14em] text-dim uppercase">
              Próximo
            </span>
            <span className="h-display mt-1 block text-[clamp(1.8rem,3.6vw,3rem)]">
              Seu <span className="accent">time?</span>
            </span>
          </span>
          <span className="grid size-12 place-items-center rounded-full bg-ink text-paper transition-transform duration-500 ease-(--ease) group-hover:rotate-45">
            <ArrowUpRight className="size-5" aria-hidden="true" />
            <span className="sr-only">Ir para o contato</span>
          </span>
        </a>
      </div>
    </section>
  );
}
