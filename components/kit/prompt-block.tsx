import { Fragment } from "react";

import { CopyButton } from "@/components/kit/copy-button";

/** Destaca cada [campo] que a pessoa precisa preencher. */
function HighlightedPrompt({ text }: { text: string }) {
  const parts = text.split(/(\[[^\]\n]+\])/g);
  return (
    <>
      {parts.map((part, i) =>
        /^\[[^\]\n]+\]$/.test(part) ? (
          <mark
            key={i}
            className="rounded bg-soft px-1 py-0.5 text-ink shadow-[inset_0_0_0_1px_var(--color-line-strong)]"
          >
            {part}
          </mark>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        ),
      )}
    </>
  );
}

export function PromptBlock({ text }: { text: string }) {
  return (
    <div className="overflow-hidden rounded-3xl border border-line-strong bg-card">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line p-3 pl-5">
        <span className="font-mono text-[12px] tracking-[0.08em] text-dim uppercase">
          Prompt completo
        </span>
        <CopyButton text={text} label="Copiar prompt" copiedLabel="Prompt copiado ✓" />
      </div>
      <div
        role="region"
        aria-label="Texto do prompt (toque para selecionar tudo)"
        tabIndex={0}
        className="max-h-[70vh] overflow-auto p-5 font-mono text-[13px] leading-relaxed break-words whitespace-pre-wrap text-ink-2 select-all"
      >
        <HighlightedPrompt text={text} />
      </div>
      <div className="flex justify-end border-t border-line p-3">
        <CopyButton text={text} label="Copiar prompt" copiedLabel="Prompt copiado ✓" variant="outline" />
      </div>
    </div>
  );
}
