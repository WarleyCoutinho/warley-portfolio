import { CopyButton } from "@/components/kit/copy-button";

type Props = { text: string; label?: string };

export function CodeBlock({ text, label }: Props) {
  return (
    <figure className="overflow-hidden rounded-2xl border border-line bg-card">
      <figcaption className="flex min-h-12 items-center justify-between gap-3 border-b border-line py-1 pr-1.5 pl-4">
        <span className="font-mono text-[12px] tracking-[0.08em] text-dim uppercase">
          {label ?? "Terminal"}
        </span>
        <CopyButton text={text} variant="ghost" className="h-10 px-4" />
      </figcaption>
      <pre
        tabIndex={0}
        className="overflow-x-auto p-4 font-mono text-[13px] leading-relaxed text-ink-2"
      >
        <code>{text}</code>
      </pre>
    </figure>
  );
}
