"use client";

import { useRef } from "react";
import { m, useScroll, useSpring, useTransform } from "motion/react";

import { TechLogo } from "@/components/ui/tech-logo";
import { SKILLS } from "@/lib/data";
import { usePrefersReducedMotion } from "@/lib/hooks";
import { isBrand, isConcept } from "@/lib/tech-icons";

/** Só as tecnologias que têm logo: a faixa fica leve e reconhecível. */
const ITEMS = SKILLS.filter((s) => isBrand(s.name) || isConcept(s.name));
const REPEATS = [0, 1, 2];
/** Quanto a faixa anda (px) ao longo da passagem pela tela. */
const TRAVEL = 900;

/**
 * Faixa diagonal com as tecnologias da stack. Anda na direção da inclinação
 * conforme a rolagem (só transform). É decorativa: duplica a tabela periódica
 * acima, então fica fora da árvore de acessibilidade.
 */
export function StackRibbon() {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const raw = useTransform(scrollYProgress, [0, 1], [0, -TRAVEL]);
  const x = useSpring(raw, { stiffness: 120, damping: 30, mass: 0.4 });

  return (
    <div ref={ref} aria-hidden="true" className="relative overflow-clip py-16">
      <div className="-ml-[10%] w-[120%] -rotate-3 border-y border-line py-5">
        <m.ul
          className="flex w-max items-center gap-12"
          style={{ x: reduceMotion ? 0 : x }}
        >
          {REPEATS.flatMap((repeat) =>
            ITEMS.map((skill) => (
              <li
                key={`${repeat}-${skill.id}`}
                className="flex items-center gap-3 text-[clamp(1.4rem,2.6vw,2.2rem)] font-semibold tracking-tight whitespace-nowrap text-ink/85"
              >
                <TechLogo name={skill.name} size={30} />
                {skill.name}
              </li>
            )),
          )}
        </m.ul>
      </div>
    </div>
  );
}
