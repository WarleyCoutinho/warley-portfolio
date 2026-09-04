"use client";

import { useEffect, useState } from "react";
import dayjs from "dayjs";

type ClockProps = {
  className?: string;
};

/**
 * Relógio ao vivo, atualizado a cada segundo via dayjs.
 * Renderiza `null` até o primeiro tick no client para evitar
 * mismatch de hidratação (o servidor não tem como saber a hora exata
 * em que o client vai montar o componente).
 */
export function Clock({ className }: ClockProps) {
  const [now, setNow] = useState<string | null>(null);

  useEffect(() => {
    const tick = () => setNow(dayjs().format("DD/MM/YYYY HH:mm:ss"));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  if (!now) return null;

  return (
    <span className={className} suppressHydrationWarning>
      {now}
    </span>
  );
}
