"use client";

import { useEffect } from "react";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";

// Mesmo breakpoint `sm` do Tailwind — fonte única de verdade entre o CSS
// (classes `sm:*` abaixo) e o JS (gate do listener de mousemove).
const DESKTOP_QUERY = "(min-width: 640px)";

/**
 * Camada decorativa de fundo do Hero: retrato do Warley com profundidade,
 * glow ambiente (âmbar/steel) e o grid de fundo do projeto, todos reagindo
 * sutilmente à posição do mouse (parallax leve, sensação 3D) — a partir do
 * breakpoint `sm`.
 *
 * Mobile-first de verdade: no mobile a cena é só um glow leve e o grid
 * estático — sem imagem pesada (o retrato nem entra no DOM, então o
 * navegador nunca faz o fetch) e sem listener de mousemove (que não faz
 * sentido em touch e só custaria JS à toa). A partir do `sm` a cena ganha
 * profundidade progressivamente: retrato, glows maiores e parallax.
 *
 * Puramente decorativa: `pointer-events-none`, `aria-hidden`, e fica em
 * `-z-10` — sempre atrás do conteúdo real do Hero. Respeita
 * `prefers-reduced-motion` (não anima se o usuário pediu menos movimento).
 */
export function HeroBackgroundScene() {
  const reduceMotion = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, { stiffness: 60, damping: 20, mass: 0.6 });
  const smy = useSpring(my, { stiffness: 60, damping: 20, mass: 0.6 });

  useEffect(() => {
    if (reduceMotion) return;

    function handleMove(e: MouseEvent) {
      mx.set(e.clientX / window.innerWidth - 0.5);
      my.set(e.clientY / window.innerHeight - 0.5);
    }

    // Só registra o listener em telas >= sm — no mobile o parallax não
    // existe (não há mouse) e não vale pagar o custo do listener.
    const mql = window.matchMedia(DESKTOP_QUERY);
    function syncListener(matches: boolean) {
      window.removeEventListener("mousemove", handleMove);
      if (matches) window.addEventListener("mousemove", handleMove);
    }
    syncListener(mql.matches);
    const handleChange = (e: MediaQueryListEvent) => syncListener(e.matches);
    mql.addEventListener("change", handleChange);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      mql.removeEventListener("change", handleChange);
    };
  }, [reduceMotion, mx, my]);

  // Camadas mais "na frente" (retrato) se movem mais que as de trás (grid),
  // criando a sensação de profundidade — mesma lógica de qualquer parallax.
  const portraitX = useTransform(smx, [-0.5, 0.5], [16, -16]);
  const portraitY = useTransform(smy, [-0.5, 0.5], [10, -10]);
  const portraitRotate = useTransform(smx, [-0.5, 0.5], [2.2, -2.2]);
  const gridX = useTransform(smx, [-0.5, 0.5], [-8, 8]);
  const gridY = useTransform(smy, [-0.5, 0.5], [-6, 6]);
  const glowX = useTransform(smx, [-0.5, 0.5], [-22, 22]);
  const glowY = useTransform(smy, [-0.5, 0.5], [-14, 14]);

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {/* Base mobile: um único glow leve, sem blur pesado e sem parallax —
          é tudo que a cena é abaixo do `sm`. */}
      <div
        className="absolute -top-16 -right-16 size-[220px] rounded-full opacity-[var(--hero-glow-opacity)] blur-[50px] sm:hidden"
        style={{ background: "var(--color-amber)" }}
      />
      <div className="bg-blueprint absolute inset-0 opacity-25 sm:hidden" />

      {/* A partir do sm: profundidade completa — glows maiores com blur
          pesado, grid com parallax e retrato. */}
      <motion.div
        className="absolute -top-24 -right-32 hidden size-[520px] rounded-full opacity-[var(--hero-glow-opacity)] blur-[110px] sm:block"
        style={{ background: "var(--color-amber)", x: glowX, y: glowY }}
      />
      <motion.div
        className="absolute -bottom-40 -left-24 hidden size-[420px] rounded-full opacity-[calc(var(--hero-glow-opacity)*0.6)] blur-[110px] sm:block"
        style={{ background: "var(--color-steel)", x: glowX, y: glowY }}
      />
      <motion.div
        className="absolute left-[38%] top-[18%] hidden size-[280px] rounded-full opacity-[calc(var(--hero-glow-opacity)*0.35)] blur-[90px] sm:block"
        style={{ background: "var(--color-amber)", x: gridX, y: gridY }}
      />

      {/* grid do próprio projeto, reaproveitado como camada de profundidade */}
      <motion.div
        className="bg-blueprint absolute inset-0 hidden opacity-40 sm:block"
        style={{ x: gridX, y: gridY }}
      />

      {/* Retrato — recortado com máscara radial, bem discreto. Só existe no
          DOM a partir do sm: no mobile o navegador nunca faz o fetch da
          imagem (sem `hidden`/display:none escondendo um <Image> já
          montado — ela simplesmente não é renderizada). Sem `priority`
          porque essa cena é puramente decorativa, não faz parte do LCP. */}
      <motion.div
        className="absolute -right-6 bottom-0 hidden h-[115%] w-[560px] max-w-none sm:block sm:w-[720px]"
        style={{
          x: portraitX,
          y: portraitY,
          rotate: portraitRotate,
          maskImage:
            "radial-gradient(ellipse 62% 82% at 72% 55%, black 30%, transparent 76%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 62% 82% at 72% 55%, black 30%, transparent 76%)",
        }}
      >
        <Image
          src="/images/warley-portrait.jpg"
          alt=""
          fill
          sizes="720px"
          className="object-cover object-top grayscale-[55%] contrast-[1.08]"
          style={{ opacity: "var(--hero-portrait-opacity)" }}
        />
      </motion.div>
    </div>
  );
}
