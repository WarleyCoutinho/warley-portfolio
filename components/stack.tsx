import { SectionHead } from "@/components/section-head";
import { SectionReveal } from "@/components/section-reveal";
import { stackGroups } from "@/lib/data";
import { TechIcon } from "@/lib/tech-icons";

export function Stack() {
  return (
    <section id="stack" className="border-t border-border py-24">
      <SectionReveal>
        <SectionHead num="02" title="Stack" />
        <div className="grid grid-cols-1 gap-9 sm:grid-cols-2 sm:gap-12">
          {stackGroups.map((group) => (
            <div key={group.title}>
              <div className="mb-3.5 font-mono-brand text-xs text-text-faint">{group.title}</div>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="inline-flex items-center gap-2 rounded-sm border border-border px-2.5 py-1.5 font-mono-brand text-[12.5px] text-text-dim transition-colors hover:border-amber-dim hover:text-text"
                  >
                    <TechIcon name={item} />
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </SectionReveal>
    </section>
  );
}
