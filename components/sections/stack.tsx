"use client";

import { useRef, useState } from "react";
import { m, useInView } from "motion/react";

import { SectionHeading } from "@/components/ui/section-heading";
import { TechLogo } from "@/components/ui/tech-logo";
import {
  PROJECTS,
  SKILLS,
  SKILL_FAMILIES,
  type FamilyId,
  type Skill,
} from "@/lib/data";
import { cn } from "@/lib/utils";

type Filter = FamilyId | "all";

function projectsUsing(skill: Skill): string[] {
  return PROJECTS.filter((project) =>
    project.stack.some((tech) => skill.aliases.includes(tech)),
  ).map((project) => project.title);
}

export function Stack() {
  const [active, setActive] = useState<Skill>(SKILLS[0]);
  const [filter, setFilter] = useState<Filter>("all");
  const gridRef = useRef<HTMLUListElement>(null);
  const inView = useInView(gridRef, { once: true, margin: "0px 0px -12% 0px" });

  const usedIn = projectsUsing(active);
  const summary = `${active.name}. Família: ${active.familyLabel}. ${
    usedIn.length > 0
      ? `Usado em: ${usedIn.join(", ")}.`
      : "Não aparece nos projetos em destaque."
  }`;

  return (
    <section id="stack" aria-labelledby="stack-title" className="section-y">
      <div className="container-x">
        <SectionHeading
          index="02"
          label="Stack"
          accent="stack."
          id="stack-title"
        >
          A tabela periódica da minha
        </SectionHeading>

        <div
          role="group"
          aria-label="Filtrar por família"
          className="mt-10 flex flex-wrap gap-2"
        >
          {[{ id: "all" as const, label: "Todas" }, ...SKILL_FAMILIES].map(
            (fam) => (
              <button
                key={fam.id}
                type="button"
                aria-pressed={filter === fam.id}
                onClick={() => setFilter(fam.id)}
                className={cn(
                  "h-11 rounded-full px-5 text-[14px] font-medium transition-colors duration-300",
                  filter === fam.id
                    ? "bg-ink text-paper"
                    : "text-ink-2 shadow-[inset_0_0_0_1px_var(--color-line-strong)] hover:bg-soft",
                )}
              >
                {fam.label}
              </button>
            ),
          )}
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-8">
          <ul
            ref={gridRef}
            data-in={inView}
            className="grid grid-cols-4 gap-2 sm:grid-cols-8"
            aria-label="Tecnologias"
          >
            {SKILLS.map((skill, i) => {
              const dim = filter !== "all" && skill.family !== filter;
              const isActive = active.id === skill.id;
              const style = {
                "--d8": `${(Math.floor(i / 8) + (i % 8)) * 40}ms`,
                "--d4": `${(Math.floor(i / 4) + (i % 4)) * 40}ms`,
              } as React.CSSProperties;
              return (
                <li key={skill.id} className="tile-in" style={style}>
                  <button
                    type="button"
                    aria-label={`${skill.name}, ${skill.familyLabel}`}
                    aria-pressed={isActive}
                    onPointerEnter={() => setActive(skill)}
                    onFocus={() => setActive(skill)}
                    onClick={() => setActive(skill)}
                    className={cn(
                      "flex aspect-square w-full flex-col justify-between rounded-[14px] p-2 text-left transition-[background-color,color,opacity,box-shadow,transform] duration-300 ease-(--ease) hover:-translate-y-0.5",
                      isActive
                        ? "bg-ink text-paper shadow-[0_14px_30px_-14px_rgba(13,13,13,0.6)]"
                        : "bg-card shadow-[inset_0_0_0_1px_var(--color-line)] hover:shadow-[inset_0_0_0_1px_var(--color-ink)]",
                      dim && "opacity-25",
                    )}
                  >
                    <span
                      aria-hidden="true"
                      className={cn(
                        "font-mono text-[9px]",
                        isActive ? "text-paper/70" : "text-dim",
                      )}
                    >
                      {skill.number}
                    </span>
                    <span
                      aria-hidden="true"
                      className="text-[clamp(1.2rem,2.4vw,1.7rem)] leading-none font-semibold tracking-tight"
                    >
                      {skill.symbol}
                    </span>
                    <span
                      aria-hidden="true"
                      className={cn(
                        "line-clamp-2 text-[9px] leading-tight sm:text-[10px]",
                        isActive ? "text-paper/80" : "text-dim",
                      )}
                    >
                      {skill.name}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>

          <aside
            className="lg:sticky lg:top-24 lg:self-start"
            aria-label="Detalhes da tecnologia"
          >
            <div
              aria-hidden="true"
              className="rounded-[28px] bg-card p-6 shadow-[inset_0_0_0_1px_var(--color-line),0_30px_60px_-34px_rgba(13,13,13,0.3)]"
            >
              <div className="grid h-50 place-items-center rounded-[20px] bg-paper">
                <m.div
                  key={active.id}
                  initial={{ scale: 0.6, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 380, damping: 18 }}
                  className="text-ink"
                >
                  <TechLogo name={active.name} size={150} />
                </m.div>
              </div>
              <p className="mt-5 font-mono text-[11px] tracking-[0.14em] text-dim uppercase">
                {active.number} · {active.symbol} · {active.familyLabel}
              </p>
              <p className="mt-1 text-[26px] leading-tight font-bold tracking-tight">
                {active.name}
              </p>
              <p className="mt-4 text-[13px] text-dim">
                {usedIn.length > 0 ? "Usado em" : "Em uso no dia a dia"}
              </p>
              {usedIn.length > 0 && (
                <ul className="mt-2 flex flex-wrap gap-2">
                  {usedIn.map((title) => (
                    <li
                      key={title}
                      className="rounded-full bg-soft px-3 py-1 text-[12px] font-medium"
                    >
                      {title}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div aria-live="polite" className="sr-only">
              {summary}
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
