"use client";

import { useState } from "react";
import { ArrowUpRight, Plus } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { TechLogo } from "@/components/ui/tech-logo";
import { PROJECTS, type Project } from "@/lib/data";
import { isBrand, isConcept } from "@/lib/tech-icons";
import { cn } from "@/lib/utils";

import {
  ProductsApiMockup,
  ProductsAppMockup,
  ServixMockup,
} from "./project-mockups";

const MOCKUPS: Record<string, () => React.JSX.Element> = {
  Servix: ServixMockup,
  "Products App": ProductsAppMockup,
  "Products API": ProductsApiMockup,
};

function Panel({
  project,
  index,
  open,
  onOpen,
}: {
  project: Project;
  index: number;
  open: boolean;
  onOpen: () => void;
}) {
  const number = String(index + 1).padStart(2, "0");
  const Mockup = MOCKUPS[project.title];
  const contentId = `project-${index}`;
  const titleId = `project-${index}-title`;

  return (
    <article
      data-open={open}
      className={cn(
        "group/panel relative overflow-hidden rounded-[28px] bg-card transition-[flex-grow,box-shadow] duration-700 ease-(--ease) lg:min-w-0",
        open
          ? "shadow-[inset_0_0_0_1px_var(--color-line),0_40px_80px_-40px_rgba(13,13,13,0.35)] lg:flex-[8_1_0%]"
          : "h-21 shadow-[inset_0_0_0_1px_var(--color-line)] lg:h-auto lg:flex-[1_1_0%]",
      )}
    >
      {/* botão que cobre o painel: abre ao passar o mouse, focar ou tocar */}
      <button
        type="button"
        aria-expanded={open}
        aria-controls={contentId}
        aria-label={
          open ? `${project.title} (aberto)` : `Abrir projeto ${project.title}`
        }
        onClick={onOpen}
        onFocus={onOpen}
        onPointerEnter={(event) => {
          if (
            event.pointerType === "mouse" &&
            window.matchMedia("(min-width: 1024px)").matches
          )
            onOpen();
        }}
        className="absolute inset-0 z-10 rounded-[28px]"
      />

      {/* lombada (painel fechado) */}
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none flex h-21 items-center gap-4 px-6 transition-opacity duration-500 lg:h-full lg:flex-col lg:justify-between lg:px-0 lg:py-7",
          open ? "opacity-0 max-lg:hidden" : "opacity-100 delay-300",
        )}
      >
        <span className="font-mono text-[12px] text-dim">{number}</span>
        <span className="flex-1 text-[22px] font-semibold tracking-tight lg:flex-none lg:rotate-180 lg:[writing-mode:vertical-rl]">
          {project.title}
        </span>
        <span className="grid size-10 place-items-center rounded-full shadow-[inset_0_0_0_1px_var(--color-line-strong)] transition-transform duration-500 ease-(--ease) group-hover/panel:rotate-90">
          <Plus className="size-4" />
        </span>
      </div>

      {/* conteúdo (painel aberto) */}
      <div
        id={contentId}
        role="region"
        aria-labelledby={titleId}
        inert={!open}
        className={cn(
          "pointer-events-none relative z-20 grid gap-6 p-6 transition-opacity duration-500 sm:p-8 lg:absolute lg:inset-0 lg:min-w-175 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-8 lg:p-9",
          open ? "opacity-100 delay-300" : "opacity-0 max-lg:hidden",
        )}
      >
        <div className="flex min-h-0 flex-col lg:overflow-y-auto lg:pr-1">
          <p className="font-mono text-[11px] tracking-[0.12em] text-dim uppercase">
            {number} · {project.kicker}
          </p>
          <h3
            id={titleId}
            className="h-display mt-3 text-[clamp(2rem,3.4vw,3rem)]"
          >
            {project.title}
          </h3>
          <p className="mt-3 text-[14.5px] leading-relaxed text-ink-2">
            {project.description}
          </p>
          <ul className="mt-4 grid gap-x-5 gap-y-3 sm:grid-cols-2">
            {project.features.map((feature) => (
              <li key={feature.title} className="text-[13px] leading-snug">
                <span className="block font-semibold">{feature.title}</span>
                <span className="text-dim">{feature.description}</span>
              </li>
            ))}
          </ul>
          <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Tecnologias">
            {project.stack.map((tech) => (
              <li key={tech}>
                <Badge variant="outline">
                  {(isBrand(tech) || isConcept(tech)) && (
                    <TechLogo name={tech} size={14} />
                  )}
                  {tech}
                </Badge>
              </li>
            ))}
          </ul>
          <div className="pointer-events-auto mt-5 flex flex-wrap gap-3 pb-1">
            {project.liveUrl && (
              <Button asChild>
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {project.liveLabel ?? "Ver produto ao vivo ↗"}
                </a>
              </Button>
            )}
            <Button asChild variant="outline">
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Ver no GitHub <ArrowUpRight />
              </a>
            </Button>
          </div>
        </div>

        <figure
          className={cn(
            "relative min-h-0 transition-[clip-path] duration-900 ease-(--ease)",
            open
              ? "delay-500 [clip-path:inset(0_0_0_0_round_20px)]"
              : "[clip-path:inset(0_100%_0_0_round_20px)]",
          )}
          data-reveal
        >
          {Mockup && <Mockup />}
          <figcaption className="absolute top-3 left-3 rounded-full bg-ink px-2.5 py-1 font-mono text-[10px] tracking-widest text-paper uppercase">
            UI ilustrativa
          </figcaption>
        </figure>
      </div>
    </article>
  );
}

export function Projects() {
  const [open, setOpen] = useState(0);
  return (
    <section
      id="projetos"
      aria-labelledby="projetos-title"
      className="section-y"
    >
      <div className="container-x">
        <SectionHeading
          index="03"
          label="Projetos"
          accent="construí."
          id="projetos-title"
        >
          O que eu
        </SectionHeading>
        <div className="mt-14 flex flex-col gap-3 lg:h-[min(78svh,600px)] lg:flex-row">
          {PROJECTS.map((project, i) => (
            <Panel
              key={project.title}
              project={project}
              index={i}
              open={open === i}
              onOpen={() => setOpen(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
