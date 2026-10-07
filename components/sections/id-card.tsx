"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import {
  m,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  useVelocity,
} from "motion/react";

import { EDUCATION, PROFILE } from "@/lib/data";

const STRAP_TEXT = `${PROFILE.name.toUpperCase()} · ${PROFILE.role.toUpperCase()} · `;
const BARCODE = [
  2, 1, 3, 1, 2, 2, 1, 3, 1, 1, 2, 3, 1, 2, 1, 1, 3, 2, 1, 2, 3, 1, 1, 2, 1, 3,
  2, 1, 2, 1, 3, 1,
];

const FRONT_ROWS = [
  { k: "Foco", v: "Full Stack · Node.js · TypeScript" },
  { k: "Local", v: PROFILE.locationShort },
  { k: "Formação", v: "Eng. de Software · 2022" },
] as const;

const BACK_LINES = [
  PROFILE.role,
  "5+ anos de experiência em desenvolvimento de software",
  `${EDUCATION.degree} (${EDUCATION.school})`,
  "Servix em produção em 5 negócios",
  "~90% menos faltas (no-shows) com lembretes automáticos",
] as const;

/**
 * Crachá pendurado numa fita: pêndulo amortecido que reage à velocidade do
 * ponteiro (springs do `motion`), balanço sutil em repouso e giro 3D ao
 * passar o mouse, tocar ou usar Enter/Espaço.
 */
export function IdCard() {
  const reduceMotion = useReducedMotion();
  const [flipped, setFlipped] = useState(false);
  const pointerType = useRef("mouse");

  const pointerX = useMotionValue(0);
  const velocity = useVelocity(pointerX);
  const target = useTransform(velocity, [-2600, 0, 2600], [-15, 0, 15], {
    clamp: true,
  });
  const angle = useSpring(target, { stiffness: 85, damping: 6.5, mass: 1 });

  return (
    <div
      className="relative mx-auto h-160 w-75 touch-pan-y select-none"
      onPointerMove={(event) => {
        if (!reduceMotion) pointerX.set(event.clientX);
      }}
    >
      <m.div
        className="absolute inset-x-0 top-0 origin-top"
        style={{ rotate: reduceMotion ? 0 : angle }}
      >
        <div className="animate-sway">
          {/* fita: 30 px de largura, com nome e cargo rolando na vertical */}
          <div
            className="relative mx-auto h-42.5 w-7.5 overflow-hidden bg-ink"
            aria-hidden="true"
          >
            <div className="animate-strap flex h-[200%] flex-col items-center">
              {[0, 1].map((n) => (
                <span
                  key={n}
                  className="h-1/2 rotate-180 font-mono text-[10px] font-medium tracking-[0.18em] whitespace-nowrap text-paper/90 [writing-mode:vertical-rl]"
                >
                  {STRAP_TEXT.repeat(3)}
                </span>
              ))}
            </div>
          </div>
          {/* presilha metálica 30×56 */}
          <div
            aria-hidden="true"
            className="relative mx-auto h-14 w-7.5 rounded-b-[10px] bg-[linear-gradient(90deg,#8d8d8d,#e9e9e9_35%,#bdbdbd_60%,#7d7d7d)] shadow-[0_2px_6px_rgba(13,13,13,0.25)]"
          >
            <span className="absolute inset-x-1.75 top-2 h-3 rounded-full bg-ink/30" />
            <span className="absolute inset-x-2.5 bottom-2 h-1.5 rounded-full bg-ink/20" />
          </div>

          {/* cartão 300×404 */}
          <div className="-mt-1 perspective-[1400px]">
            <div
              role="button"
              tabIndex={0}
              aria-pressed={flipped}
              aria-label="Crachá de desenvolvedor de Warley Coutinho. Pressione Enter para virar o cartão."
              className="relative h-101 w-75 cursor-pointer rounded-[26px] outline-offset-6"
              onPointerDown={(event) => {
                pointerType.current = event.pointerType;
              }}
              onPointerEnter={(event) => {
                pointerType.current = event.pointerType;
                if (event.pointerType === "mouse") setFlipped(true);
              }}
              onPointerLeave={(event) => {
                if (event.pointerType === "mouse") setFlipped(false);
              }}
              onClick={() => {
                if (pointerType.current !== "mouse")
                  setFlipped((value) => !value);
              }}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  setFlipped((value) => !value);
                }
              }}
            >
              <m.div
                className="relative size-full transform-3d"
                animate={{ rotateY: flipped ? 180 : 0 }}
                transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* frente */}
                <div className="absolute inset-0 overflow-hidden rounded-[26px] bg-card shadow-[inset_0_0_0_1px_var(--color-line),0_30px_60px_-24px_rgba(13,13,13,0.35)] backface-hidden">
                  <div className="relative flex h-11 items-center justify-center bg-ink">
                    <span className="absolute top-2 h-1.5 w-12 rounded-full bg-paper/80" />
                    <span className="mt-3 font-mono text-[10px] tracking-[0.22em] text-paper">
                      ID DE DESENVOLVEDOR
                    </span>
                  </div>
                  <div className="flex flex-col items-center px-6 pt-5">
                    <div className="group/portrait relative size-33.5 rounded-[26px] bg-[linear-gradient(145deg,#d9d9d9,#8f8f8f_55%,#e6e6e6)] p-0.75 shadow-[0_0_40px_6px_rgba(13,13,13,0.08)]">
                      <div className="relative h-32 w-32 overflow-hidden rounded-[23px] bg-soft">
                        <Image
                          src="/portrait-bust.webp"
                          alt="Retrato de Warley Coutinho"
                          width={480}
                          height={600}
                          unoptimized
                          className="size-full object-cover object-top transition-transform duration-700 ease-(--ease) group-hover/portrait:scale-110"
                        />
                      </div>
                    </div>
                    <p className="mt-4 text-[22px] leading-none font-bold tracking-tight">
                      {PROFILE.name}
                    </p>
                    <p className="mt-1.5 text-center text-[12px] leading-snug text-dim">
                      {PROFILE.role}
                    </p>
                    <dl className="mt-4 w-full">
                      {FRONT_ROWS.map((row) => (
                        <div
                          key={row.k}
                          className="flex items-baseline justify-between gap-3 border-t border-line py-1.75"
                        >
                          <dt className="font-mono text-[10px] tracking-[0.14em] text-dim uppercase">
                            {row.k}
                          </dt>
                          <dd className="text-right text-[12px] font-medium">
                            {row.v}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                  <div
                    className="absolute inset-x-6 bottom-5 flex items-end justify-between"
                    aria-hidden="true"
                  >
                    <div className="flex h-8 items-stretch gap-0.5">
                      {BARCODE.map((w, i) => (
                        <span key={i} className="bg-ink" style={{ width: w }} />
                      ))}
                    </div>
                    <span className="grid size-9 place-items-center rounded-full bg-[conic-gradient(from_20deg,#f3f3f3,#b9b9b9,#fafafa,#8c8c8c,#e4e4e4,#f3f3f3)] font-mono text-[9px] font-semibold text-ink/70 shadow-[inset_0_0_0_1px_rgba(13,13,13,0.15)]">
                      WC
                    </span>
                  </div>
                </div>

                {/* verso */}
                <div className="absolute inset-0 flex flex-col overflow-hidden rounded-[26px] bg-ink px-7 pt-9 pb-7 text-paper backface-hidden transform-[rotateY(180deg)]">
                  <p className="font-mono text-[10px] tracking-[0.22em] text-paper/60">
                    O QUE EU SOU
                  </p>
                  <ul className="mt-5 space-y-3">
                    {BACK_LINES.map((line) => (
                      <li
                        key={line}
                        className="flex gap-3 text-[13px] leading-snug"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-1.75 size-1 shrink-0 rounded-full bg-paper/60"
                        />
                        {line}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto">
                    <p className="font-serif text-[30px] leading-none italic">
                      {PROFILE.name}
                    </p>
                    <div aria-hidden="true" className="mt-2 h-px bg-paper/40" />
                    <p className="mt-3 text-[11px] leading-snug text-paper/70">
                      Se me encontrou, diga olá · {PROFILE.email}
                    </p>
                  </div>
                </div>
              </m.div>
            </div>
          </div>
        </div>
      </m.div>
    </div>
  );
}
