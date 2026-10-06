import { ArrowDown, Package, Plus, UserRound } from "lucide-react";

const DAYS = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
const BLOCKS: readonly (readonly [number, number])[][] = [
  [
    [0, 2],
    [3, 2],
  ],
  [[1, 3]],
  [
    [0, 1],
    [2, 2],
    [5, 1],
  ],
  [
    [1, 2],
    [4, 2],
  ],
  [
    [0, 3],
    [4, 1],
  ],
  [[2, 2]],
];

export function ServixMockup() {
  return (
    <div className="relative h-full min-h-75 rounded-[20px] bg-paper p-4">
      <div className="grid grid-cols-6 gap-1.5">
        {DAYS.map((day, col) => (
          <div key={day} className="min-w-0">
            <p className="mb-2 text-center font-mono text-[10px] text-dim">
              {day}
            </p>
            <div className="relative h-47.5 rounded-lg bg-card shadow-[inset_0_0_0_1px_var(--color-line)]">
              {(BLOCKS[col] ?? []).map(([top, len]) => (
                <span
                  key={`${top}-${len}`}
                  className="absolute inset-x-1 rounded-md bg-ink/85"
                  style={{
                    top: `${top * 15 + 4}%`,
                    height: `${len * 15 - 2}%`,
                    opacity: 0.35 + (len % 3) * 0.2,
                  }}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="absolute right-4 bottom-4 max-w-[78%] rounded-2xl rounded-br-sm bg-card px-3.5 py-2.5 text-[12px] leading-snug shadow-[0_10px_24px_-12px_rgba(13,13,13,0.35),inset_0_0_0_1px_var(--color-line)]">
        <p className="font-medium">Lembrete de agendamento</p>
        <p className="text-dim">
          Seu horário é amanhã. Responda para confirmar.
        </p>
        <p className="mt-1 text-right font-mono text-[10px] text-dim">✓✓</p>
      </div>
    </div>
  );
}

export function ProductsAppMockup() {
  return (
    <div className="grid h-full min-h-75 place-items-center rounded-[20px] bg-paper p-4">
      <div className="flex h-75 w-42.5 flex-col overflow-hidden rounded-[26px] bg-card shadow-[inset_0_0_0_1.5px_var(--color-ink),0_20px_40px_-24px_rgba(13,13,13,0.4)]">
        <div className="px-3.5 pt-4">
          <p className="text-[13px] font-bold tracking-tight">Produtos</p>
          <div className="mt-2 h-6 rounded-full bg-soft" />
        </div>
        <ul className="mt-3 flex-1 space-y-2 px-3.5">
          {[0, 1, 2, 3].map((n) => (
            <li key={n} className="flex items-center gap-2">
              <span className="size-8 shrink-0 rounded-lg bg-soft" />
              <span className="flex-1 space-y-1">
                <span
                  className="block h-2 rounded bg-ink/70"
                  style={{ width: `${86 - n * 12}%` }}
                />
                <span className="block h-1.5 w-1/2 rounded bg-faint/70" />
              </span>
            </li>
          ))}
        </ul>
        <div className="flex items-center justify-around border-t border-line py-2.5 text-ink">
          <Package className="size-4" />
          <span className="grid size-7 place-items-center rounded-full bg-ink text-paper">
            <Plus className="size-4" />
          </span>
          <UserRound className="size-4 text-dim" />
        </div>
      </div>
    </div>
  );
}

export function ProductsApiMockup() {
  const layers = [
    { name: "Route", note: "HTTP + validação com Zod" },
    { name: "Use Case", note: "regra de negócio" },
    { name: "Prisma", note: "acesso ao PostgreSQL" },
  ];
  return (
    <div className="flex h-full min-h-75 flex-col justify-center gap-2 rounded-[20px] bg-paper p-5">
      {layers.map((layer, i) => (
        <div key={layer.name} className="flex flex-col items-center gap-2">
          <div className="w-full rounded-2xl bg-card px-4 py-3 shadow-[inset_0_0_0_1px_var(--color-line)]">
            <p className="font-mono text-[11px] tracking-widest text-dim uppercase">{`0${i + 1}`}</p>
            <p className="text-[17px] font-bold tracking-tight">{layer.name}</p>
            <p className="text-[12px] text-dim">{layer.note}</p>
          </div>
          {i < layers.length - 1 && (
            <ArrowDown className="size-4 text-ink" aria-hidden="true" />
          )}
        </div>
      ))}
      <p className="mt-1 self-end rounded-full bg-ink px-3 py-1 font-mono text-[10px] text-paper">
        /docs · OpenAPI
      </p>
    </div>
  );
}
