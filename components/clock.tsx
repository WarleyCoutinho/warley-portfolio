"use client";

import { useMemo, useSyncExternalStore } from "react";

type ClockProps = {
  className?: string;
  /** Fuso IANA (ex.: "America/Sao_Paulo"). Sem ele, mostra a data e a hora do aparelho: DD/MM/YYYY HH:mm:ss. */
  timeZone?: string;
  /** Só vale com `timeZone`: mostra os segundos. */
  seconds?: boolean;
};

const LOCAL_FORMAT = new Intl.DateTimeFormat("pt-BR", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hourCycle: "h23",
});

/** DD/MM/AAAA HH:mm:ss (monta pelas partes: não depende do separador do ICU). */
function formatLocal(date: Date): string {
  const part = Object.fromEntries(
    LOCAL_FORMAT.formatToParts(date).map((p) => [p.type, p.value]),
  );
  return `${part.day}/${part.month}/${part.year} ${part.hour}:${part.minute}:${part.second}`;
}

/** O "tempo" é uma fonte externa: o React lê o texto atual e só re-renderiza quando ele muda. */
function subscribe(onChange: () => void): () => void {
  const id = setInterval(onChange, 1000);
  return () => clearInterval(id);
}

export function Clock({ className, timeZone, seconds = true }: ClockProps) {
  const zoned = useMemo(
    () =>
      timeZone
        ? new Intl.DateTimeFormat("pt-BR", {
            timeZone,
            hour: "2-digit",
            minute: "2-digit",
            ...(seconds ? { second: "2-digit" } : {}),
            hourCycle: "h23",
          })
        : null,
    [timeZone, seconds],
  );

  // Enquanto hidrata, reserva o mesmo espaço (sem pulo de layout).
  const placeholder = timeZone ? (seconds ? "--:--:--" : "--:--") : "--/--/---- --:--:--";

  const text = useSyncExternalStore(
    subscribe,
    () => (zoned ? zoned.format(new Date()) : formatLocal(new Date())),
    () => placeholder,
  );

  // Com fuso, o leitor de tela usa o texto de LocalTime (não lê a cada segundo).
  return (
    <span className={className} aria-hidden={timeZone ? true : undefined} suppressHydrationWarning>
      {text}
    </span>
  );
}
