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

const DESKTOP_QUERY = "(min-width: 640px)";

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

  const portraitX = useTransform(smx, [-0.5, 0.5], [16, -16]);
  const portraitY = useTransform(smy, [-0.5, 0.5], [10, -10]);
  const portraitRotate = useTransform(smx, [-0.5, 0.5], [2.2, -2.2]);
  const gridX = useTransform(smx, [-0.5, 0.5], [-8, 8]);
  const gridY = useTransform(smy, [-0.5, 0.5], [-6, 6]);
  const glowX = useTransform(smx, [-0.5, 0.5], [-22, 22]);
  const glowY = useTransform(smy, [-0.5, 0.5], [-14, 14]);

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      <div
        className="absolute -top-16 -right-16 size-55 rounded-full opacity-(--hero-glow-opacity) blur-[50px] sm:hidden"
        style={{ background: "var(--color-amber)" }}
      />
      <div className="bg-blueprint absolute inset-0 opacity-25 sm:hidden" />

      <motion.div
        className="absolute -top-24 -right-32 hidden size-130 rounded-full opacity-(--hero-glow-opacity) blur-[110px] sm:block"
        style={{ background: "var(--color-amber)", x: glowX, y: glowY }}
      />
      <motion.div
        className="absolute -bottom-40 -left-24 hidden size-105 rounded-full opacity-[calc(var(--hero-glow-opacity)*0.6)] blur-[110px] sm:block"
        style={{ background: "var(--color-steel)", x: glowX, y: glowY }}
      />
      <motion.div
        className="absolute left-[38%] top-[18%] hidden size-70 rounded-full opacity-[calc(var(--hero-glow-opacity)*0.35)] blur-[90px] sm:block"
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
        className="absolute -right-6 bottom-0 hidden h-[115%] w-140 max-w-none sm:block sm:w-180"
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
          priority
          sizes="720px"
          className="object-cover object-top grayscale-55 contrast-[1.08]"
          style={{ opacity: "var(--hero-portrait-opacity)" }}
        />
      </motion.div>
    </div>
  );
}
