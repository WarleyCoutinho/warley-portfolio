"use client";

import { useRef, useState } from "react";
import { ArrowUpRight, Check, Copy } from "lucide-react";
import { m } from "motion/react";

import { Reveal } from "@/components/ui/reveal";
import { PROFILE } from "@/lib/data";

const HOP = {
  y: [0, -22, 0],
  transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] as const },
};

function HopWord({ text }: { text: string }) {
  return (
    <span className="inline-block whitespace-nowrap">
      {Array.from(text).map((char, i) => (
        <m.span
          key={`${char}-${i}`}
          aria-hidden="true"
          className="inline-block"
          whileHover={HOP}
        >
          {char}
        </m.span>
      ))}
    </span>
  );
}

function SpinBadge() {
  return (
    <div
      aria-hidden="true"
      className="relative grid size-37.5 shrink-0 place-items-center"
    >
      <svg
        viewBox="0 0 150 150"
        className="animate-spin-slow absolute inset-0 size-full"
      >
        <defs>
          <path
            id="badge-circle"
            d="M75,75 m-58,0 a58,58 0 1,1 116,0 a58,58 0 1,1 -116,0"
          />
        </defs>
        <text className="fill-ink font-mono text-[11px] tracking-[0.28em] uppercase">
          <textPath href="#badge-circle">
            diga olá · diga olá · diga olá ·{" "}
          </textPath>
        </text>
      </svg>
      <span className="grid size-14 place-items-center rounded-full bg-ink text-paper">
        <ArrowUpRight className="size-6" />
      </span>
    </div>
  );
}

export function Contact() {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      setCopied(true);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
    }
  }

  const links = [
    { label: "GitHub", href: PROFILE.github },
    { label: "LinkedIn", href: PROFILE.linkedin },
    { label: "Instagram", href: PROFILE.instagram },
    { label: PROFILE.studioLabel, href: PROFILE.studio },
  ];

  return (
    <section id="contato" aria-labelledby="contato-title" className="section-y">
      <div className="container-x">
        <p className="mb-5 font-mono text-[12px] tracking-[0.14em] text-dim uppercase">
          07 — Contato
        </p>
        <h2
          id="contato-title"
          aria-label="Vamos construir algo juntos."
          className="h-display text-[clamp(3rem,10.5vw,9.5rem)]"
        >
          <span className="block">
            <HopWord text="Vamos" /> <HopWord text="construir" />
          </span>
          <span className="block">
            <span className="accent">
              <HopWord text="algo" /> <HopWord text="juntos." />
            </span>
          </span>
        </h2>

        <div className="mt-16 flex flex-wrap items-end justify-between gap-10">
          <Reveal className="min-w-0">
            <div className="flex flex-wrap items-center gap-4">
              <a
                href={`mailto:${PROFILE.email}`}
                className="text-[clamp(1.4rem,3.4vw,2.8rem)] font-semibold tracking-tight break-all underline decoration-line-strong decoration-2 underline-offset-10 transition-[text-decoration-color] duration-300 hover:decoration-ink"
              >
                {PROFILE.email}
              </a>
              <button
                type="button"
                onClick={copyEmail}
                className="inline-flex h-11 items-center gap-2 rounded-full px-5 text-[14px] font-medium shadow-[inset_0_0_0_1px_var(--color-line-strong)] transition-colors duration-300 hover:bg-ink hover:text-paper"
              >
                {copied ? (
                  <Check className="size-4" aria-hidden="true" />
                ) : (
                  <Copy className="size-4" aria-hidden="true" />
                )}
                {copied ? "Copiado ✓" : "Copiar"}
              </button>
              <span role="status" aria-live="polite" className="sr-only">
                {copied ? "E-mail copiado" : ""}
              </span>
            </div>

            <ul className="mt-10 flex flex-wrap gap-3">
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-11 items-center gap-1.5 rounded-full px-5 text-[14px] font-medium shadow-[inset_0_0_0_1px_var(--color-line-strong)] transition-colors duration-300 hover:bg-ink hover:text-paper"
                  >
                    {link.label}{" "}
                    <ArrowUpRight className="size-4" aria-hidden="true" />
                  </a>
                </li>
              ))}
              {PROFILE.showPhone && (
                <li>
                  <a
                    href={`tel:${PROFILE.phoneHref}`}
                    className="inline-flex h-11 items-center rounded-full px-5 text-[14px] font-medium shadow-[inset_0_0_0_1px_var(--color-line-strong)] transition-colors duration-300 hover:bg-ink hover:text-paper"
                  >
                    {PROFILE.phone}
                  </a>
                </li>
              )}
            </ul>
          </Reveal>
          <SpinBadge />
        </div>
      </div>
    </section>
  );
}
