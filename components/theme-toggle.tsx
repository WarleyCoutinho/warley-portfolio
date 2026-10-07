"use client";

import { useSyncExternalStore } from "react";
import { Monitor, Moon, Sun } from "lucide-react";

type Mode = "system" | "light" | "dark";

const NEXT: Record<Mode, Mode> = {
  system: "light",
  light: "dark",
  dark: "system",
};
const LABEL: Record<Mode, string> = {
  system: "automático (sistema)",
  light: "claro",
  dark: "escuro",
};

function readMode(): Mode {
  try {
    const stored = localStorage.getItem("theme");
    return stored === "light" || stored === "dark" ? stored : "system";
  } catch {
    return "system";
  }
}

function apply(mode: Mode, animate: boolean) {
  const root = document.documentElement;
  const dark =
    mode === "dark" ||
    (mode === "system" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);
  if (
    animate &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    root.classList.add("theme-anim");
    window.setTimeout(() => root.classList.remove("theme-anim"), 350);
  }
  root.classList.toggle("dark", dark);
}

const listeners = new Set<() => void>();

function subscribe(onChange: () => void): () => void {
  listeners.add(onChange);
  const media = window.matchMedia("(prefers-color-scheme: dark)");
  const refresh = () => {
    apply(readMode(), false); // o sistema mudou ou outra aba mudou o tema
    onChange();
  };
  media.addEventListener("change", refresh);
  window.addEventListener("storage", refresh);
  return () => {
    listeners.delete(onChange);
    media.removeEventListener("change", refresh);
    window.removeEventListener("storage", refresh);
  };
}

const getSnapshot = (): Mode => readMode();
const getServerSnapshot = (): Mode => "system";

const noopSubscribe = () => () => {};

export function ThemeToggle() {
  const mode = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const mounted = useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );

  function cycle() {
    const next = NEXT[readMode()];
    try {
      if (next === "system") localStorage.removeItem("theme");
      else localStorage.setItem("theme", next);
    } catch {
      /* armazenamento indisponível: vale só nesta visita */
    }
    apply(next, true);
    listeners.forEach((l) => l());
  }

  const Icon = mode === "light" ? Sun : mode === "dark" ? Moon : Monitor;

  return (
    <>
      <button
        type="button"
        onClick={cycle}
        aria-label={`Tema: ${LABEL[mode]}. Ativar: ${LABEL[NEXT[mode]]}`}
        title={`Tema: ${LABEL[mode]}`}
        className="grid size-11 place-items-center rounded-full text-ink shadow-[inset_0_0_0_1px_var(--color-line-strong)] transition-colors duration-300 hover:bg-soft"
      >
        {mounted ? (
          <Icon className="size-4.5" aria-hidden="true" />
        ) : (
          <span className="size-4.5" />
        )}
      </button>
      <span role="status" aria-live="polite" className="sr-only">
        {mounted ? `Tema ${LABEL[mode]}` : ""}
      </span>
    </>
  );
}
