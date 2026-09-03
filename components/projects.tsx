import { SectionHead } from "@/components/section-head";
import { SectionReveal } from "@/components/section-reveal";
import { TiltCard } from "@/components/tilt-card";
import { projects } from "@/lib/data";

export function Projects() {
  return (
    <section id="projetos" className="border-t border-border py-24">
      <SectionReveal>
        <SectionHead num="04" title="Projetos em destaque" />
        <div className="flex flex-col gap-px border border-border bg-border">
          {projects.map((project) => (
            <TiltCard
              key={project.title}
              className="grid grid-cols-1 gap-8 bg-bg p-9 lg:grid-cols-[1fr_1.4fr]"
            >
              <div>
                <div className="mb-2.5 font-mono-brand text-[11.5px] text-text-faint">
                  {project.kicker}
                </div>
                <h3 className="mb-2.5 font-display text-[22px] font-semibold">{project.title}</h3>
                <p className="mb-4 text-[14.5px] text-text-dim">{project.description}</p>
                <a
                  href={project.liveUrl ?? "#contato"}
                  target={project.liveUrl ? "_blank" : undefined}
                  rel={project.liveUrl ? "noopener noreferrer" : undefined}
                  className="font-mono-brand text-[12.5px] text-steel underline decoration-transparent underline-offset-4 transition-colors hover:decoration-steel"
                >
                  {project.liveUrl ? project.liveLabel : "Solicitar acesso ao repositório ↗"}
                </a>
              </div>
              <div>
                <ul className="flex flex-col gap-2.5">
                  {project.features.map((feature) => (
                    <li key={feature.title} className="relative pl-4 text-[13.5px] text-text-dim">
                      <span className="absolute left-0 top-[7px] h-px w-1.5 bg-amber-dim" />
                      <strong className="font-medium text-text">{feature.title}</strong>{" "}
                      {feature.description}
                    </li>
                  ))}
                </ul>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-sm border border-border-soft px-2 py-1 font-mono-brand text-[11px] text-text-faint"
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
