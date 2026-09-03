export function SectionHead({ num, title }: { num: string; title: string }) {
  return (
    <div className="mb-11 flex items-baseline gap-4">
      <span className="font-mono-brand text-[13px] text-amber">{num}</span>
      <h2 className="font-display text-[28px] font-semibold">{title}</h2>
      <span className="h-px flex-1 bg-border" />
    </div>
  );
}
