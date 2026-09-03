import Image from "next/image";
import { SectionHead } from "@/components/section-head";
import { SectionReveal } from "@/components/section-reveal";
import { aboutParagraphs, facts } from "@/lib/data";

export function About() {
  return (
    <section id="sobre" className="border-t border-border py-24">
      <SectionReveal>
        <SectionHead num="01" title="Sobre" />
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-[0.62fr_1.1fr_0.8fr]">
          <div className="relative mx-auto w-full max-w-[240px] lg:mx-0">
            <div className="absolute inset-0 translate-x-2.5 translate-y-2.5 rounded-md border border-border bg-bg-raised-2" />
            <div className="relative overflow-hidden rounded-md border border-amber-dim">
              <Image
                src="/images/warley-portrait.jpg"
                alt="Warley Coutinho"
                width={480}
                height={614}
                className="h-full w-full object-cover grayscale-[10%] contrast-[1.05]"
              />
            </div>
            <span className="tick -left-1 -top-1" />
            <span className="tick -bottom-1 -right-1" />
          </div>

          <div>
            {aboutParagraphs.map((p, i) => (
              <p key={i} className="mb-4.5 max-w-[60ch] text-[16px] text-text-dim">
                {p}
              </p>
            ))}
          </div>
          <div className="flex flex-col border-t border-border">
            {facts.map((fact) => (
              <div
                key={fact.k}
                className="flex justify-between gap-4 border-b border-border py-3.5 text-sm"
              >
                <span className="font-mono-brand text-[12px] text-text-faint">{fact.k}</span>
                <span className="text-right">{fact.v}</span>
              </div>
            ))}
          </div>
        </div>
      </SectionReveal>
    </section>
  );
}
