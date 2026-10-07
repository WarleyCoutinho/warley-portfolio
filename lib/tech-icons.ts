export const BRAND: Readonly<Record<string, string>> = {
  TypeScript: "typescript",
  JavaScript: "javascript",
  "Next.js": "nextdotjs",
  React: "react",
  "React Native": "react",
  iOS: "ios",
  Android: "android",
  "Tailwind CSS": "tailwindcss",
  "shadcn/ui": "shadcnui",
  "TanStack Query": "reactquery",
  "React Hook Form": "reacthookform",
  Motion: "framer",
  Lucide: "lucide",
  "Simple Icons": "simpleicons",
  "next-themes": "nextdotjs",
  PWA: "pwa",
  Zod: "zod",
  "Node.js": "nodedotjs",
  Fastify: "fastify",
  "Prisma ORM": "prisma",
  Prisma: "prisma",
  PostgreSQL: "postgresql",
  "Better Auth": "betterauth",
  "Swagger / OpenAPI": "swagger",
  Swagger: "swagger",
  "Scalar API Reference": "scalar",
  WhatsApp: "whatsapp",
  "Google Calendar API": "googlecalendar",
  Stripe: "stripe",
  Gemini: "googlegemini",
  Docker: "docker",
  Git: "git",
  GitHub: "github",
  Vercel: "vercel",
  Railway: "railway",
  Hetzner: "hetzner",
  Neon: "neon",
  pnpm: "pnpm",
  Laravel: "laravel",
  Angular: "angular",
  "Spring Boot": "springboot",
  PHP: "php",
  "Vue.js": "vuedotjs",
  Java: "openjdk",
};

/** Tecnologias sem logo de marca: ganham um ícone de linha consistente. */
export const CONCEPT = [
  "21st.dev",
  "Sonner",
  "Orval",
  "Baileys",
  "REST APIs",
  "Microservices",
  "Responsive Design",
  "Mobile First",
  "OEE",
] as const;

export type ConceptName = (typeof CONCEPT)[number];

export function isBrand(name: string): boolean {
  return Object.prototype.hasOwnProperty.call(BRAND, name);
}

export function isConcept(name: string): name is ConceptName {
  return (CONCEPT as readonly string[]).includes(name);
}

/** Logos quase pretos (arquivos em /public/logos): invertidos no tema escuro via `.logo-ink` (globals.css). */
export const DARK_LOGOS: ReadonlySet<string> = new Set([
  "betterauth",
  "fastify",
  "github",
  "hetzner",
  "ios",
  "nextdotjs",
  "prisma",
  "pwa",
  "railway",
  "scalar",
  "shadcnui",
  "simpleicons",
  "vercel",
]);
