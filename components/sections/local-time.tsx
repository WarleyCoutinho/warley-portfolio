"use client";

import { useSyncExternalStore } from "react";
import { Clock3 } from "lucide-react";

import { Clock } from "@/components/clock";

const TZ = "America/Sao_Paulo"; // Anápolis, GO (horário de Brasília)

function offsetMinutes(timeZone: string, d: Date): number {
  const values = new Map<string, string>();
  for (const p of new Intl.DateTimeFormat("en-US", {
    timeZone,
    hourCycle: "h23",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).formatToParts(d)) {
    values.set(p.type, p.value);
  }

  const part = (type: Intl.DateTimeFormatPartTypes): number => {
    const value = values.get(type);
    if (value === undefined) throw new Error(`Parte de data ausente: ${type}`);
    return Number(value);
  };

  const asUtc = Date.UTC(
    part("year"),
    part("month") - 1,
    part("day"),
    part("hour"),
    part("minute"),
    part("second"),
  );
  return Math.round((asUtc - Math.floor(d.getTime() / 1000) * 1000) / 60000);
}

function utcLabel(min: number): string {
  const abs = Math.abs(min);
  const h = Math.floor(abs / 60);
  const m = abs % 60;
  return `UTC${min < 0 ? "−" : "+"}${h}${m ? `:${String(m).padStart(2, "0")}` : ""}`;
}

function span(abs: number): string {
  const h = Math.floor(abs / 60);
  const m = abs % 60;
  if (h === 0) return `${m} min`;
  return m ? `${h}h${String(m).padStart(2, "0")}` : `${h}h`;
}

type Info = { viewer: string; diff: string; zone: string; here: string };

const SEP = "\u0001";

function snapshot(): string {
  const now = new Date();
  const mine = offsetMinutes(TZ, now);
  const delta = -now.getTimezoneOffset() - mine;
  const hhmm = (timeZone?: string) =>
    new Intl.DateTimeFormat("pt-BR", {
      timeZone,
      hour: "2-digit",
      minute: "2-digit",
      hourCycle: "h23",
    }).format(now);
  const diff =
    delta === 0
      ? "Você está no mesmo fuso horário que eu."
      : `Seu horário está ${span(Math.abs(delta))} ${delta > 0 ? "à frente" : "atrás"} do meu.`;
  return [hhmm(), diff, utcLabel(mine), hhmm(TZ)].join(SEP);
}

function subscribe(onChange: () => void): () => void {
  const id = setInterval(onChange, 1000);
  return () => clearInterval(id);
}

function parse(raw: string): Info | null {
  if (!raw) return null;
  const [viewer = "", diff = "", zone = "", here = ""] = raw.split(SEP);
  return { viewer, diff, zone, here };
}

export function LocalTime() {
  const info = parse(useSyncExternalStore(subscribe, snapshot, () => ""));

  return (
    <div className="mt-10 max-w-md rounded-3xl bg-card p-5 shadow-[inset_0_0_0_1px_var(--color-line)]">
      <p className="flex items-center gap-2 font-mono text-[11px] tracking-[0.14em] text-dim uppercase">
        <Clock3 className="size-4" aria-hidden="true" />
        Horário local · Anápolis, GO
      </p>
      <Clock
        timeZone={TZ}
        className="mt-3 block text-[clamp(2.2rem,5vw,3.2rem)] leading-none font-bold tracking-tight tabular-nums"
      />
      <p className="mt-2 text-[13px] text-dim">
        Horário de Brasília{info ? ` · ${info.zone}` : ""}
      </p>
      <p className="mt-4 min-h-10 border-t border-line pt-3 text-[14px] leading-snug text-ink-2">
        {info ? (
          <>
            <span className="font-medium text-ink tabular-nums">
              Seu horário: {info.viewer}
            </span>{" "}
            · {info.diff}
          </>
        ) : (
          "\u00A0"
        )}
      </p>
      {/* o relógio visual não é lido a cada segundo; este texto cobre o leitor de tela */}
      {info && (
        <p className="sr-only">
          Horário em Anápolis, GO: {info.here}. {info.diff}
        </p>
      )}
    </div>
  );
}
