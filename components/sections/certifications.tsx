import { Check } from "lucide-react";

import { SectionHeading } from "@/components/ui/section-heading";
import { CERTIFICATIONS } from "@/lib/data";

export function Certifications() {
  const count = String(CERTIFICATIONS.length).padStart(2, "0");
  return (
    <section
      id="certificacoes"
      aria-labelledby="cert-title"
      className="section-y border-y border-line bg-card"
    >
      <div className="container-x grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading
            index="04"
            label="Certificações"
            accent="aprendendo."
            id="cert-title"
          >
            Sempre
          </SectionHeading>
          <p className="mt-6 font-mono text-[13px] tracking-widest text-dim uppercase">
            {count} certificações
          </p>
        </div>

        <ol className="border-b border-line">
          {CERTIFICATIONS.map((title, i) => (
            <li
              key={title}
              tabIndex={0}
              className="group relative isolate flex items-center gap-6 overflow-hidden border-t border-line px-3 py-6 -outline-offset-2 before:absolute before:inset-0 before:-z-10 before:origin-left before:scale-x-0 before:bg-ink before:transition-transform before:duration-700 before:ease-(--ease) before:content-[''] hover:before:scale-x-100 focus-visible:before:scale-x-100"
            >
              <span className="font-mono text-[13px] text-dim transition-colors duration-500 group-hover:text-paper/70 group-focus-visible:text-paper/70">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="flex-1 text-[clamp(1.35rem,2.6vw,2.1rem)] leading-tight font-semibold tracking-tight transition-colors duration-500 group-hover:text-paper group-focus-visible:text-paper">
                {title}
              </span>
              <Check
                aria-hidden="true"
                className="size-5 text-dim transition-[color,transform] duration-500 group-hover:translate-x-0 group-hover:text-paper group-focus-visible:text-paper"
              />
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
