import * as simpleIcons from "simple-icons";
import { Blocks, Network, ShieldCheck, type LucideIcon } from "lucide-react";

// Ícones reais das tecnologias, vindos do pacote `simple-icons` (SVG com a cor
// oficial de cada marca). Server-side apenas: o componente <Stack /> não é
// "use client", então o pacote não vai pro bundle do navegador.
//
// A chave é o mesmo texto usado em lib/data.ts#stackGroups. Se uma tecnologia
// nova não estiver aqui, ela aparece só com o texto (sem quebrar nada).

type SimpleIcon = { path: string; hex: string };
const icons = simpleIcons as unknown as Record<string, SimpleIcon | undefined>;

const SIMPLE_ICON_KEY: Record<string, string> = {
  TypeScript: "siTypescript",
  "Next.js": "siNextdotjs",
  React: "siReact",
  "React Native": "siReact",
  "Vue.js": "siVuedotjs",
  "Tailwind CSS": "siTailwindcss",
  "shadcn/ui": "siShadcnui",
  "React Query": "siReactquery",
  Zod: "siZod",
  "Node.js": "siNodedotjs",
  Fastify: "siFastify",
  "Prisma ORM": "siPrisma",
  PostgreSQL: "siPostgresql",
  "Better Auth": "siBetterauth",
  "Swagger / OpenAPI": "siSwagger",
  "Baileys (WhatsApp)": "siWhatsapp",
  "Google Calendar API": "siGooglecalendar",
  Stripe: "siStripe",
  Docker: "siDocker",
  Git: "siGit",
  Vercel: "siVercel",
  pnpm: "siPnpm",
};

// Conceitos sem logo de marca (ou marca ausente no pacote) usam ícone genérico.
const FALLBACK_ICON: Record<string, LucideIcon> = {
  "REST APIs": Network,
  Microservices: Blocks,
  "Better Auth": ShieldCheck,
};

// Cores de marca muito escuras (Next.js, Vercel, shadcn…) somem no tema escuro;
// nesses casos usamos currentColor, que acompanha o tema.
function channel(hex: string, start: number) {
  const c = parseInt(hex.slice(start, start + 2), 16) / 255;
  return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
}

function luminance(hex: string) {
  return (
    0.2126 * channel(hex, 0) +
    0.7152 * channel(hex, 2) +
    0.0722 * channel(hex, 4)
  );
}

export function TechIcon({ name }: { name: string }) {
  const key = SIMPLE_ICON_KEY[name];
  const icon = key ? icons[key] : undefined;

  if (icon) {
    const lum = luminance(icon.hex);
    const fill = lum < 0.06 || lum > 0.85 ? "currentColor" : `#${icon.hex}`;
    return (
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="size-4 shrink-0"
        fill={fill}
      >
        <path d={icon.path} />
      </svg>
    );
  }

  const Fallback = FALLBACK_ICON[name];
  if (Fallback)
    return <Fallback aria-hidden="true" className="size-4 shrink-0" />;

  return null;
}
