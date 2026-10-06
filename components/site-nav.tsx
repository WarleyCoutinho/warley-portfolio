"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { m, useScroll, useSpring } from "motion/react";
import { X } from "lucide-react";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { NAV, PROFILE } from "@/lib/data";
import { useScrolledPast } from "@/lib/hooks";
import { cn } from "@/lib/utils";

const SECTION_IDS = NAV.map((item) => item.id);

function useActiveSection(): string {
  const [active, setActive] = useState("");
  useEffect(() => {
    const elements = SECTION_IDS.map((id) =>
      document.getElementById(id),
    ).filter((el): el is HTMLElement => el !== null);
    if (elements.length === 0) return;
    const crossing = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) crossing.add(entry.target.id);
          else crossing.delete(entry.target.id);
        }
        const current = SECTION_IDS.find((id) => crossing.has(id));
        setActive(current ?? "");
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
  return active;
}

export function SiteNav() {
  const scrolled = useScrolledPast(40);
  const active = useActiveSection();
  const [open, setOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 28,
    mass: 0.4,
  });

  return (
    <>
      <m.div
        aria-hidden="true"
        className="fixed inset-x-0 top-0 z-60 h-0.5 origin-left bg-ink"
        style={{ scaleX: progress }}
      />
      <header
        className="fixed inset-x-0 top-0 z-40"
        style={{ paddingTop: "env(safe-area-inset-top, 0px)" }}
      >
        <div className="container-x flex h-18 items-center justify-between gap-4">
          <Link
            href="/"
            aria-label={`${PROFILE.name} — início`}
            className="group flex items-center gap-3 rounded-full"
          >
            <span
              className={cn(
                "grid size-11 place-items-center rounded-full font-mono text-[13px] font-medium tracking-tight transition-[background-color,color,transform] duration-700 ease-(--ease) group-hover:rotate-360",
                scrolled
                  ? "bg-ink text-paper"
                  : "text-ink shadow-[inset_0_0_0_1.5px_var(--color-ink)]",
              )}
            >
              {PROFILE.initials}
            </span>
            <span
              className={cn(
                "hidden text-[15px] font-semibold tracking-tight transition-opacity duration-500 sm:block",
                scrolled ? "pointer-events-none opacity-0" : "opacity-100",
              )}
            >
              {PROFILE.name}
            </span>
          </Link>

          <nav
            aria-label="Seções"
            className={cn(
              "hidden items-center gap-1 rounded-full p-1 transition-[background-color,box-shadow,backdrop-filter] duration-500 md:flex",
              scrolled
                ? "bg-white/70 shadow-[inset_0_0_0_1px_var(--color-line),0_8px_30px_-12px_rgba(13,13,13,0.18)] backdrop-blur-md"
                : "bg-transparent",
            )}
          >
            {NAV.map((item) => {
              const isActive = active === item.id;
              return (
                <Link
                  key={item.id}
                  href={`/#${item.id}`}
                  aria-current={isActive ? "location" : undefined}
                  className={cn(
                    "relative flex h-11 items-center rounded-full px-4 text-[14px] font-medium transition-colors duration-300",
                    isActive ? "text-paper" : "text-ink-2 hover:text-ink",
                  )}
                >
                  {isActive && (
                    <m.span
                      layoutId="nav-indicator"
                      className="absolute inset-0 rounded-full bg-ink"
                      transition={{
                        type: "spring",
                        stiffness: 420,
                        damping: 36,
                      }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button
                type="button"
                className="flex h-11 items-center rounded-full bg-ink px-5 text-[14px] font-medium text-paper md:hidden"
              >
                Menu
              </button>
            </SheetTrigger>
            <SheetContent className="menu-sheet bg-paper">
              <SheetTitle>Menu de navegação</SheetTitle>
              <SheetDescription>Escolha uma seção da página.</SheetDescription>
              <div
                className="flex h-full flex-col px-(--gutter) pb-10"
                style={{
                  paddingTop: "calc(env(safe-area-inset-top, 0px) + 18px)",
                }}
              >
                <div className="flex h-11 items-center justify-between">
                  <span className="font-mono text-[12px] tracking-[0.14em] text-dim uppercase">
                    {PROFILE.name}
                  </span>
                  <SheetClose asChild>
                    <button
                      type="button"
                      aria-label="Fechar menu"
                      className="grid size-11 place-items-center rounded-full bg-ink text-paper"
                    >
                      <X className="size-5" />
                    </button>
                  </SheetClose>
                </div>
                <nav aria-label="Seções" className="mt-auto flex flex-col">
                  {NAV.map((item, i) => (
                    <SheetClose asChild key={item.id}>
                      <Link
                        href={`/#${item.id}`}
                        style={{ "--i": i } as React.CSSProperties}
                        className="menu-link flex items-baseline gap-4 border-t border-line py-4 first:border-t-0"
                      >
                        <span className="font-mono text-[12px] text-dim">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="h-display text-[clamp(2.2rem,11vw,3.4rem)]">
                          {item.label}
                        </span>
                      </Link>
                    </SheetClose>
                  ))}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>
    </>
  );
}
