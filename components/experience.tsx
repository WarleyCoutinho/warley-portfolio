import { SectionHead } from "@/components/section-head";
import { SectionReveal } from "@/components/section-reveal";
import { experience, earlierCareer } from "@/lib/data";

export function Experience() {
  return (
    <section id="experiencia" className="border-t border-border py-24">
      <SectionReveal>
        <SectionHead num="03" title="Experiência" />
        <div className="ml-1.5 border-l border-border">
          {experience.map((item) => (
            <div key={item.company} className="relative pb-11 pl-8 last:pb-0">
              <span className="absolute -left-[5px] top-1 size-[9px] rounded-full border border-amber bg-bg" />
              <div className="mb-2 font-mono-brand text-xs text-amber">{item.period}</div>
              <h3 className="font-display text-[19px] font-semibold">
                {item.url ? (
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline decoration-transparent underline-offset-4 transition-colors hover:text-amber hover:decoration-amber"
                  >
                    {item.company} ↗
                  </a>
                ) : (
                  item.company
                )}
              </h3>
              <div className="mb-3 text-sm text-text-dim">{item.role}</div>
              <p className="mb-3 max-w-[62ch] text-[14.5px] text-text-dim">{item.description}</p>
              <div className="flex flex-wrap gap-1.5">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-sm border border-border-soft px-2 py-1 font-mono-brand text-[11.5px] text-text-faint"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
          <div className="relative pl-8">
            <span className="absolute -left-[5px] top-1 size-[9px] rounded-full border border-amber bg-bg" />
            <div className="mb-2 font-mono-brand text-xs text-amber">{earlierCareer.period}</div>
            <h3 className="mb-2 font-display text-base font-semibold text-text-dim">
              Antes da tecnologia
            </h3>
            <p className="max-w-[62ch] text-[13.5px] text-text-faint">
              {earlierCareer.description}
            </p>
          </div>
        </div>
      </SectionReveal>
    </section>
  );
}
