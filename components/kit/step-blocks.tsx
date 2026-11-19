import { CodeBlock } from "@/components/kit/code-block";
import { RichText } from "@/components/kit/rich-text";
import type { KitBlock } from "@/lib/kit-content";
import { cn } from "@/lib/utils";

export function StepBlocks({ blocks }: { blocks: KitBlock[] }) {
  return (
    <div className="flex flex-col gap-5">
      {blocks.map((block, i) => {
        switch (block.type) {
          case "p":
            return (
              <p key={i} className="text-[15px] leading-relaxed text-ink-2">
                <RichText text={block.text} />
              </p>
            );
          case "ul":
            return (
              <ul
                key={i}
                className="flex list-disc flex-col gap-2 pl-5 text-[15px] leading-relaxed text-ink-2 marker:text-faint"
              >
                {block.items.map((item) => (
                  <li key={item}>
                    <RichText text={item} />
                  </li>
                ))}
              </ul>
            );
          case "note":
            return (
              <p
                key={i}
                className={cn(
                  "rounded-2xl border px-4 py-3 text-[14px] leading-relaxed text-ink-2",
                  block.tone === "warn"
                    ? "border-line-strong bg-soft"
                    : "border-line bg-card",
                )}
              >
                <span className="mr-2 font-mono text-[12px] tracking-[0.1em] text-ink uppercase">
                  {block.tone === "warn" ? "Atenção" : "Dica"}
                </span>
                <RichText text={block.text} />
              </p>
            );
          case "code":
            return <CodeBlock key={i} text={block.text} label={block.label} />;
          case "table":
            return (
              <dl
                key={i}
                className="overflow-hidden rounded-2xl border border-line bg-card"
              >
                <div className="hidden gap-4 border-b border-line px-4 py-2.5 font-mono text-[11px] tracking-[0.12em] text-dim uppercase sm:grid sm:grid-cols-[minmax(0,17rem)_1fr]">
                  <span>{block.head[0]}</span>
                  <span>{block.head[1]}</span>
                </div>
                {block.rows.map(([term, desc]) => (
                  <div
                    key={term}
                    className="grid gap-1 border-b border-line px-4 py-3 last:border-b-0 sm:grid-cols-[minmax(0,17rem)_1fr] sm:gap-4"
                  >
                    <dt className="font-mono text-[13px] leading-relaxed break-words text-ink">
                      {term}
                    </dt>
                    <dd className="text-[14px] leading-relaxed text-ink-2">
                      <RichText text={desc} />
                    </dd>
                  </div>
                ))}
              </dl>
            );
        }
      })}
    </div>
  );
}
