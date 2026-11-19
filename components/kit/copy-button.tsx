"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Copy } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Status = "idle" | "copied" | "failed";

/** Tenta a Clipboard API e cai para execCommand (navegadores embutidos, como o do Instagram, costumam bloquear a primeira). */
async function copyText(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    /* segue para o plano B */
  }
  try {
    const area = document.createElement("textarea");
    area.value = text;
    area.setAttribute("readonly", "");
    area.setAttribute("aria-hidden", "true");
    area.style.cssText =
      "position:fixed;top:0;left:0;opacity:0;font-size:16px;pointer-events:none";
    document.body.appendChild(area);
    area.select();
    area.setSelectionRange(0, text.length);
    const ok = document.execCommand("copy");
    document.body.removeChild(area);
    return ok;
  } catch {
    return false;
  }
}

type Props = {
  text: string;
  label?: string;
  copiedLabel?: string;
  size?: "default" | "lg";
  variant?: "default" | "outline" | "ghost";
  className?: string;
};

export function CopyButton({
  text,
  label = "Copiar",
  copiedLabel = "Copiado ✓",
  size = "default",
  variant = "default",
  className,
}: Props) {
  const [status, setStatus] = useState<Status>("idle");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );

  async function handleClick() {
    const ok = await copyText(text);
    setStatus(ok ? "copied" : "failed");
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setStatus("idle"), ok ? 2200 : 4500);
  }

  return (
    <>
      <Button
        type="button"
        size={size}
        variant={variant}
        onClick={handleClick}
        className={cn(className)}
      >
        {status === "copied" ? (
          <Check aria-hidden="true" />
        ) : (
          <Copy aria-hidden="true" />
        )}
        {status === "copied"
          ? copiedLabel
          : status === "failed"
            ? "Toque no texto e copie"
            : label}
      </Button>
      <span role="status" aria-live="polite" className="sr-only">
        {status === "copied"
          ? "Copiado para a área de transferência."
          : status === "failed"
            ? "Não foi possível copiar automaticamente. Selecione o texto e copie manualmente."
            : ""}
      </span>
    </>
  );
}
