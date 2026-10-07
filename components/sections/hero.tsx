import { ArrowDown, ArrowUpRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Reveal, RevealMask } from "@/components/ui/reveal";
import { HERO_META, PROFILE } from "@/lib/data";

import { HeroVideo } from "./hero-video";

export function Hero() {
  return (
    <section
      id="inicio"
      aria-labelledby="hero-title"
      className="relative isolate overflow-clip bg-paper pt-22 pb-10 lg:pb-0"
    >
      <div className="container-x grid items-end gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,380px)_minmax(0,1fr)] lg:gap-10">
        <div className="relative z-10 order-2 pb-4 lg:order-1 lg:pb-[12svh]">
          <h1
            id="hero-title"
            className="h-display text-[clamp(2.4rem,4.2vw,4.4rem)]"
          >
            <RevealMask>Engenheiro de</RevealMask>
            <RevealMask index={1}>Software</RevealMask>
            <RevealMask index={2}>
              <span className="accent">Full Stack.</span>
            </RevealMask>
          </h1>
          <Reveal index={3}>
            <p className="mt-6 max-w-[34ch] text-[17px] leading-relaxed text-ink-2">
              {PROFILE.resumeSummary}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <a href="#projetos">
                  Ver projetos <ArrowDown />
                </a>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href="#contato">
                  Vamos conversar <ArrowUpRight />
                </a>
              </Button>
              <Button asChild size="lg" variant="ghost">
                <a href="#curriculo">Currículo ↓</a>
              </Button>
            </div>
          </Reveal>
        </div>

        <div className="order-1 lg:order-2 lg:flex lg:justify-center">
          <HeroVideo transcriptId="hero-transcript" />
          <p id="hero-transcript" className="sr-only">
            Transcrição da apresentação em vídeo: {PROFILE.introTranscript}
          </p>
        </div>

        <dl className="relative z-10 order-3 hidden pb-[12svh] lg:block">
          {HERO_META.map((item) => (
            <div key={item.k} className="border-t border-line py-4">
              <dt className="font-mono text-[11px] tracking-[0.14em] text-dim uppercase">
                {item.k}
              </dt>
              <dd className="mt-1.5 text-[15px] leading-snug text-ink">
                {item.v}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
