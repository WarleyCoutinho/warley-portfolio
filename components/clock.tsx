"use client";

import { useEffect, useState } from "react";
import dayjs from "dayjs";

type ClockProps = {
  className?: string;
};

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
