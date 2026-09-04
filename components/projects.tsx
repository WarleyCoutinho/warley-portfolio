import { SectionHead } from "@/components/section-head";
import { SectionReveal } from "@/components/section-reveal";
import { TiltCard } from "@/components/tilt-card";
import { projects } from "@/lib/data";

export function Projects() {
  return (
    <section id="projetos" className="border-t border-border py-24">
      <SectionReveal>
        <SectionHead num="04" title="Projetos em destaque" />
        <div className="flex flex-col gap-6">
          {projects.map((project) => (
            <TiltCard
              key={project.title}
              className="group relative grid grid-cols-1 gap-8 rounded-2xl border border-border bg-bg-raised p-9 shadow-[0_24px_50px_-28px_rgba(0,0,0,0.55)] transition-shadow duration-300 hover:shadow-[0_32px_64px_-24px_rgba(0,0,0,0.7)] lg:grid-cols-[1fr_1.4fr]"
            >
              {/* anel com brilho gradiente na borda — só a borda fica visível (mask-composite: exclude) */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-2xl opacity-45 transition-opacity duration-300 group-hover:opacity-90"
                style={{
                  padding: 1,
                  background:
                    "conic-gradient(from 200deg at 85% 12%, var(--color-amber) 0deg, transparent 55deg, transparent 300deg, var(--color-steel) 345deg, transparent 360deg)",
                  mask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
                  maskComposite: "exclude",
                  WebkitMask:
                    "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
                  WebkitMaskComposite: "xor",
                }}
              />

              <div className="relative">
                <div className="mb-2.5 font-mono-brand text-[11.5px] text-text-faint">
                  {project.kicker}
                </div>
                <h3 className="mb-2.5 font-display text-[22px] font-semibold">
                  {project.title}
                </h3>
                <p className="mb-4 text-[14.5px] text-text-dim">
                  {project.description}
                </p>
                <a
                  href={project.liveUrl ?? project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono-brand text-[12.5px] text-steel underline decoration-transparent underline-offset-4 transition-colors hover:decoration-steel"
                >
                  {project.liveUrl ? project.liveLabel : "ver o repositório ↗"}
                </a>
              </div>
              <div className="relative">
                <ul className="flex flex-col gap-2.5">
                  {project.features.map((feature) => (
                    <li
                      key={feature.title}
                      className="relative pl-4 text-[13.5px] text-text-dim"
                    >
                      <span className="absolute left-0 top-1.75 h-px w-1.5 bg-amber-dim" />
                      <strong className="font-medium text-text">
                        {feature.title}
                      </strong>{" "}
                      {feature.description}
                    </li>
                  ))}
                </ul>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-border-soft bg-bg-raised-2 px-2.5 py-1 font-mono-brand text-[11px] text-text-faint"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </TiltCard>
          ))}
        </div>
      </SectionReveal>
    </section>
  );
}
