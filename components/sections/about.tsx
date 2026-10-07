import { BrandIcon } from "@/components/ui/brand-icon";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { ABOUT_PARAGRAPHS, FACTS, PROFILE, QUOTE } from "@/lib/data";

import { IdCard } from "./id-card";

function phoneDigits(href: string): string {
  return href.replace(/\D/g, "");
}

export function About() {
  const facts: { k: string; v: string; href?: string }[] = [
    { k: "Local", v: FACTS.location },
    { k: "Formação", v: FACTS.education },
    { k: "Atuação atual", v: FACTS.current },
    { k: "E-mail", v: PROFILE.email, href: `mailto:${PROFILE.email}` },
    ...(PROFILE.showPhone
      ? [
          {
            k: "Telefone",
            v: PROFILE.phone,
            href: `https://wa.me/${phoneDigits(PROFILE.phoneHref)}`,
          },
        ]
      : []),
    { k: "Disponibilidade", v: FACTS.availability },
  ];

  return (
    <section
      id="sobre"
      aria-labelledby="sobre-title"
      className="section-y relative"
    >
      <div className="container-x grid items-stretch gap-14 lg:grid-cols-[minmax(0,1fr)_320px_minmax(0,1fr)] lg:gap-12">
        <div className="order-2 lg:order-1">
          <SectionHeading
            index="01"
            label="Sobre"
            accent="Warley."
            id="sobre-title"
          >
            Olá, eu sou o
          </SectionHeading>
          <div className="mt-8 space-y-5 text-[17px] leading-relaxed text-ink-2">
            {ABOUT_PARAGRAPHS.slice(0, 2).map((paragraph, i) => (
              <Reveal key={paragraph} index={i}>
                <p>{paragraph}</p>
              </Reveal>
            ))}
          </div>
          <Reveal index={2} className="mt-8 flex flex-wrap gap-3">
            <Button asChild variant="outline">
              <a href={PROFILE.resume} download>
                <BrandIcon name="download" />
                Currículo
              </a>
            </Button>
            <Button asChild variant="outline">
              <a
                href={PROFILE.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                <BrandIcon name="github" />
                GitHub
              </a>
            </Button>
            <Button asChild variant="outline">
              <a
                href={PROFILE.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                <BrandIcon name="linkedin" />
                LinkedIn
              </a>
            </Button>
          </Reveal>
        </div>

        {/* a fita nasce na borda superior da seção */}
        <div className="order-1 -mt-(--section-py) lg:order-2">
          <IdCard />
        </div>

        <aside aria-labelledby="fatos-title" className="order-3">
          <Reveal>
            <h3
              id="fatos-title"
              className="font-mono text-[12px] tracking-[0.14em] text-dim uppercase"
            >
              Fatos rápidos
            </h3>
            <dl className="mt-5">
              {facts.map((fact) => (
                <div
                  key={fact.k}
                  className="grid grid-cols-[116px_minmax(0,1fr)] gap-3 border-t border-line py-3.5"
                >
                  <dt className="font-mono text-[11px] tracking-widest text-dim uppercase">
                    {fact.k}
                  </dt>
                  <dd className="text-[15px] leading-snug wrap-break-word">
                    {fact.href ? (
                      <a
                        href={fact.href}
                        className="underline decoration-line-strong underline-offset-4 hover:decoration-ink"
                      >
                        {fact.v}
                      </a>
                    ) : (
                      fact.v
                    )}
                  </dd>
                </div>
              ))}
            </dl>
            <blockquote className="mt-8 border-l-2 border-ink pl-5 font-serif text-[24px] leading-snug italic">
              {QUOTE}
            </blockquote>
          </Reveal>
        </aside>
      </div>
    </section>
  );
}
