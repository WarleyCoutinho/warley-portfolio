"use client";

import { motion } from "motion/react";
import { profile, heroMeta } from "@/lib/data";
import { HeroPlate } from "@/components/hero-plate";
import { HeroBackgroundScene } from "@/components/hero-background-scene";
import { Spotlight } from "@/components/spotlight";
import { Clock } from "@/components/clock";

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

const item = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" as const },
  },
};

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-28 pb-20 sm:pt-32 sm:pb-24">
      <HeroBackgroundScene />
      <div className="relative z-10 grid grid-cols-1 items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
        <motion.div variants={stagger} initial="hidden" animate="show">
          <motion.div
            variants={item}
            className="mb-7 flex items-center gap-2.5 font-mono-brand text-[13px] text-amber"
          >
            <span className="h-px w-8 bg-amber-dim" />
            {profile.location.toLowerCase()}
          </motion.div>

          <motion.div
            variants={item}
            className="mb-4 flex items-center gap-2 font-mono-brand text-[12px] tabular-nums text-text-faint"
          >
            <span className="relative flex size-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber opacity-60" />
              <span className="relative inline-flex size-1.5 rounded-full bg-amber" />
            </span>
            <Clock />
          </motion.div>

          <motion.h1
            variants={item}
            className="mb-7 max-w-140 font-display text-[clamp(34px,5.4vw,56px)] font-semibold leading-[1.08] tracking-tight"
          >
            Engenheiro de Software focado em produtos que resolvem problemas reais.
          </motion.h1>

          <motion.p
            variants={item}
            className="mb-10 max-w-140 text-lg text-text-dim"
          >
            Sou {profile.name}, Engenheiro de Software Full Stack com foco em
            TypeScript, Node.js, Next.js e React. Desenvolvo produtos e sistemas
            de ponta a ponta, da arquitetura e APIs às integrações, deploy e
            manutenção em produção.
          </motion.p>

          <motion.div variants={item} className="flex flex-wrap gap-3.5">
            <a
              href="#projetos"
              className="rounded-sm bg-amber px-5 py-3 font-mono-brand text-[13px] font-medium text-[#1a1206] transition-colors hover:bg-[#f0a13c]"
            >
              Ver projetos
            </a>
            <Spotlight className="rounded-sm">
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-sm border border-border px-5 py-3 font-mono-brand text-[13px] transition-colors hover:border-text-dim"
              >
                LinkedIn ↗
              </a>
            </Spotlight>
            <Spotlight className="rounded-sm">
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-sm border border-border px-5 py-3 font-mono-brand text-[13px] transition-colors hover:border-text-dim"
              >
                GitHub ↗
              </a>
            </Spotlight>
            <Spotlight className="rounded-sm">
              <a
                href={`mailto:${profile.email}`}
                className="rounded-sm border border-border px-5 py-3 font-mono-brand text-[13px] transition-colors hover:border-text-dim"
              >
                Enviar e-mail
              </a>
            </Spotlight>
          </motion.div>
        </motion.div>

        <HeroPlate />
      </div>

      <div className="relative z-10 mt-16 grid grid-cols-1 border-t border-border sm:grid-cols-3">
        {heroMeta.map((item, i) => (
          <div
            key={item.k}
            className={`border-b border-border pb-4 pt-5 sm:border-b-0 sm:pb-0 ${
              i < heroMeta.length - 1
                ? "sm:border-r sm:border-border sm:pr-6"
                : ""
            } ${i > 0 ? "sm:pl-6" : ""}`}
          >
            <div className="mb-1.5 font-mono-brand text-[11px] text-text-faint">
              {item.k}
            </div>
            <div className="text-[15px]">{item.v}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
