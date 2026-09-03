"use client";

import { motion } from "motion/react";
import { profile, heroMeta } from "@/lib/data";
import { HeroPlate } from "@/components/hero-plate";

export function Hero() {
  return (
    <section className="relative pt-28 pb-20 sm:pt-32 sm:pb-24">
      <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div className="mb-7 flex items-center gap-2.5 font-mono-brand text-[13px] text-amber">
            <span className="h-px w-8 bg-amber-dim" />
            {profile.location.toLowerCase()}
          </div>

          <h1 className="mb-7 max-w-[560px] font-display text-[clamp(34px,5.4vw,56px)] font-semibold leading-[1.08] tracking-tight">
            Construo sistemas que aguentam o peso real do trabalho.
          </h1>

          <p className="mb-10 max-w-[560px] text-lg text-text-dim">
            Sou {profile.name}, desenvolvedor full stack. Antes de escrever código eu soldava
            estrutura e organizava almoxarifado — hoje aplico essa mesma exigência de precisão
            em produtos web e mobile construídos com Next.js, Fastify e TypeScript.
          </p>

          <div className="flex flex-wrap gap-3.5">
            <a
              href="#projetos"
              className="rounded-sm bg-amber px-5 py-3 font-mono-brand text-[13px] font-medium text-[#1a1206] transition-colors hover:bg-[#f0a13c]"
            >
              Ver projetos
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-sm border border-border px-5 py-3 font-mono-brand text-[13px] transition-colors hover:border-text-dim"
            >
              LinkedIn ↗
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-sm border border-border px-5 py-3 font-mono-brand text-[13px] transition-colors hover:border-text-dim"
            >
              GitHub ↗
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="rounded-sm border border-border px-5 py-3 font-mono-brand text-[13px] transition-colors hover:border-text-dim"
            >
              Enviar e-mail
            </a>
          </div>
        </motion.div>

        <HeroPlate />
      </div>

      <div className="mt-16 grid grid-cols-1 border-t border-border sm:grid-cols-3">
        {heroMeta.map((item, i) => (
          <div
            key={item.k}
            className={`border-b border-border pb-4 pt-5 sm:border-b-0 sm:pb-0 ${
              i < heroMeta.length - 1 ? "sm:border-r sm:border-border sm:pr-6" : ""
            } ${i > 0 ? "sm:pl-6" : ""}`}
          >
            <div className="mb-1.5 font-mono-brand text-[11px] text-text-faint">{item.k}</div>
            <div className="text-[15px]">{item.v}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
