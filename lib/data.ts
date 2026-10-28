import { resumeRole } from "./resume-content";

export { SITE_URL } from "./resume-content";

export const PROFILE = {
  name: "Warley Coutinho",
  initials: "WC",
  role: resumeRole,
  location: "Anápolis, Goiás — Brasil",
  locationShort: "Anápolis, GO",
  email: "warleycoutinho@icloud.com",
  /** O telefone só é renderizado no HTML quando `showPhone` for `true` (LGPD / spam). */
  showPhone: false,
  phone: "(62) 9-9248-6492",
  phoneHref: "+5562992486492",
  linkedin: "https://www.linkedin.com/in/coutinhowarley/",
  linkedinLabel: "/in/coutinhowarley",
  github: "https://github.com/WarleyCoutinho",
  githubLabel: "/WarleyCoutinho",
  instagram: "https://www.instagram.com/warlycoutinho/",
  instagramLabel: "@warlycoutinho",
  studio: "https://www.adapticode.com.br/",
  studioLabel: "adapticode.com.br",
  resume: "/curriculo/Warley_Coutinho_Curriculo_ATS.pdf",
  resumeSummary:
    "Engenheiro de Software com experiência em aplicações web, APIs REST, integração de sistemas e automação de processos, com atuação em soluções para Indústria 4.0.",
  /** Texto falado no vídeo do hero (vira a transcrição acessível). Confira se bate com o áudio. */
  introTranscript:
    "Olá, eu sou Warley Coutinho. Sou engenheiro de software full stack e construo produtos web, APIs e sistemas do início ao fim.",
} as const;

export const NAV = [
  { id: "sobre", label: "Sobre" },
  { id: "stack", label: "Stack" },
  { id: "projetos", label: "Projetos" },
  { id: "experiencia", label: "Experiência" },
  { id: "resultados", label: "Resultados" },
  { id: "curriculo", label: "Currículo" },
  { id: "contato", label: "Contato" },
] as const;

export const HERO_META = [
  {
    k: "foco atual",
    v: "Software Engineering — Node.js, TypeScript & Next.js",
  },
  { k: "experiência", v: "4,5 anos em desenvolvimento de software" },
  { k: "formação", v: "Eng. de Software — UniEVANGÉLICA" },
] as const;

export const FACTS = {
  location: "Anápolis, GO — Brasil",
  education: "Eng. de Software, UniEVANGÉLICA (2018–2022)",
  last: "Analista de Sistemas Pleno · Rancheiro (até 03/2026)",
  availability: "Aberto a oportunidades CLT ou PJ",
} as const;

export const QUOTE =
  "Software para a indústria: dashboards, APIs e automação de processos.";

export const EDUCATION = {
  degree: "Bacharelado em Engenharia de Software",
  school: "UniEVANGÉLICA",
  period: "2018–2022",
} as const;

export const CERTIFICATIONS: readonly string[] = [
  "Fundamentos do Next.js",
  "Fundamentos do React",
  "Fundamentos do React Native",
  "JavaScript: Formação Básica",
  "Masterizando o Tailwind",
  "Clean Code",
];

export const ABOUT_PARAGRAPHS = [
  "Sou Engenheiro de Software com experiência em desenvolvimento de aplicações web, APIs REST, integração de sistemas e automação de processos, com foco em TypeScript, Node.js, Next.js e React.",
  "Atuo no frontend e no backend, desenvolvendo dashboards web, APIs e integrações, incluindo comunicação com equipamentos industriais, em soluções para Indústria 4.0.",
  "Na Rancheiro, como Analista de Sistemas Pleno, desenvolvi dashboards de produção, estoque e controle de acesso, APIs e integrações em Node.js e relatórios operacionais em PDF e Excel. Contribuí para reduzir o tempo de fechamento operacional de aproximadamente 1 hora para 20 minutos, por meio da automação de processos.",
  "Na Avaloon, atuei em sistema OEE para Indústria 4.0, com microsserviços de coleta de dados das máquinas, APIs REST e integrações, além da identificação e correção de gargalos e problemas de desempenho.",
  "Minha stack principal inclui TypeScript, Node.js, Fastify, Next.js, React, React Native, Prisma, PostgreSQL, REST APIs, Microservices, Docker, Git, Vercel, Tailwind CSS e shadcn/ui.",
  "Busco oportunidades como Software Engineer, Backend Engineer ou Full Stack Engineer, em regime CLT ou PJ, especialmente em times de produto e engenharia que valorizem arquitetura, automação, performance e desenvolvimento de produtos.",
];

/* ───────────────────────── Stack (tabela periódica) ───────────────────────── */

export type FamilyId = "frontend" | "backend" | "integrations" | "infra";

export const SKILL_FAMILIES: readonly { id: FamilyId; label: string }[] = [
  { id: "frontend", label: "Frontend & Mobile" },
  { id: "backend", label: "Backend & Dados" },
  { id: "integrations", label: "Integrações" },
  { id: "infra", label: "Infra & Ferramentas" },
];

export type Skill = {
  id: string;
  number: string;
  symbol: string;
  name: string;
  family: FamilyId;
  familyLabel: string;
  /** Nomes que aparecem em `PROJECTS[].stack` para esta tecnologia. */
  aliases: readonly string[];
};

const SKILL_SOURCE: Record<FamilyId, readonly string[]> = {
  frontend: [
    "TypeScript",
    "JavaScript",
    "Next.js",
    "React",
    "React Native", // iOS/Android: usados dentro do React Native, não entram sozinhos
    "Tailwind CSS",
    "shadcn/ui",
    "21st.dev",
    "TanStack Query",
    "React Hook Form",
    "Zod",
    "Motion",
    "Lucide",
    "Simple Icons",
    "next-themes",
    "Sonner",
    "PWA",
    "Responsive Design",
    "Mobile First",
  ],
  backend: [
    "Node.js",
    "Fastify",
    "Prisma ORM",
    "PostgreSQL",
    "REST APIs",
    "Microservices",
    "Zod",
    "Better Auth",
    "Swagger / OpenAPI",
    "Scalar API Reference",
    "Orval",
  ],
  integrations: ["WhatsApp", "Google Calendar API", "Stripe", "Gemini"],
  infra: [
    "Docker",
    "Git",
    "GitHub",
    "Vercel",
    "Railway",
    "Hetzner",
    "Neon",
    "pnpm",
  ],
};

const EXTRA_ALIASES: Readonly<Record<string, readonly string[]>> = {
  "Prisma ORM": ["Prisma"],
  "Swagger / OpenAPI": ["Swagger"],
};

function buildSkills(): Skill[] {
  const seen = new Set<string>();
  const usedSymbols = new Set<string>();
  const skills: Skill[] = [];

  const makeSymbol = (name: string): string => {
    const letters = name.replace(/[^A-Za-z0-9]/g, "");
    const first = letters.charAt(0).toUpperCase();
    for (let i = 1; i < letters.length; i += 1) {
      const candidate = first + letters.charAt(i).toLowerCase();
      if (!usedSymbols.has(candidate)) return candidate;
    }
    for (let i = 0; i < 26; i += 1) {
      const candidate = first + String.fromCharCode(97 + i);
      if (!usedSymbols.has(candidate)) return candidate;
    }
    return first;
  };

  for (const family of SKILL_FAMILIES) {
    for (const name of SKILL_SOURCE[family.id]) {
      if (seen.has(name)) continue; // ex.: Zod aparece em duas famílias; fica só na primeira
      seen.add(name);
      const symbol = makeSymbol(name);
      usedSymbols.add(symbol);
      skills.push({
        id: name
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, ""),
        number: String(skills.length + 1).padStart(2, "0"),
        symbol,
        name,
        family: family.id,
        familyLabel: family.label,
        aliases: [name, ...(EXTRA_ALIASES[name] ?? [])],
      });
    }
  }
  return skills;
}

const [firstSkill, ...otherSkills] = buildSkills();
if (!firstSkill) throw new Error("SKILLS não pode ser vazio");

export const SKILLS: readonly [Skill, ...Skill[]] = [
  firstSkill,
  ...otherSkills,
];

/* ───────────────────────── Experiência e formação ───────────────────────── */

export type TimelineItem = {
  id: string;
  kind: "work" | "education";
  period: string;
  title: string;
  place: string;
  detail?: string;
  tags?: readonly string[];
};

export const TIMELINE: readonly TimelineItem[] = [
  {
    id: "unievangelica",
    kind: "education",
    period: "2018 — 2022",
    title: EDUCATION.degree,
    place: EDUCATION.school,
  },

  {
    id: "turing",
    kind: "work",
    period: "ago 2021 — set 2021",
    title: "Desenvolvedor Full Stack",
    place: "Fábrica de Tecnologias Turing (FTT) · Anápolis, GO",
    detail:
      "Participei do planejamento e desenvolvimento em equipe de um sistema para um colégio, abrangendo requisitos, regras de negócio, frontend, backend, APIs e banco de dados.",
    tags: [
      "Laravel",
      "Angular",
      "Spring Boot",
      "Java",
      "PHP",
      "PostgreSQL",
      "Docker",
    ],
  },
  {
    id: "avaloon",
    kind: "work",
    period: "fev 2022 — mai 2023",
    title: "Desenvolvedor de Sistemas",
    place: "Avaloon · Goiânia, GO",
    detail:
      "Atuei em sistema OEE para Indústria 4.0, com microsserviços de coleta de dados das máquinas, APIs REST e integrações. Identifiquei e corrigi gargalos e problemas de performance em sistemas OEE para Indústria 4.0.",
    tags: [
      "Node.js",
      "TypeScript",
      "JavaScript",
      "Vue.js",
      "PostgreSQL",
      "Microservices",
      "OEE",
    ],
  },
  {
    id: "rancheiro",
    kind: "work",
    period: "mai 2023 — mar 2026",
    title: "Analista de Sistemas Pleno",
    place: "Rancheiro · Anápolis, GO",
    detail:
      "Desenvolvi soluções para Indústria 4.0, incluindo dashboards de produção, gestão de estoque e controle de acesso, utilizando Next.js, React e TypeScript. Integrei aplicações frontend com APIs desenvolvidas em Python, consumindo endpoints disponibilizados pela equipe responsável pelo backend. Desenvolvi APIs e integrações em Node.js, incluindo comunicação com equipamentos industriais. Contribuí para a redução do tempo de fechamento operacional de aproximadamente 1 hora para 20 minutos, por meio da automação de processos. Desenvolvi relatórios operacionais por turno, dia e mês, com exportação em PDF e Excel.",
    tags: [
      "Next.js",
      "React",
      "TypeScript",
      "Node.js",
      "PostgreSQL",
      "Prisma",
      "Tailwind CSS",
      "shadcn/ui",
    ],
  },
];

/* ───────────────────────── Resultados ───────────────────────── */

export type ResultItem = {
  id: string;
  /** Iniciais do contexto (sem logos: não existem nos dados). */
  context: string;
  from: number;
  to: number;
  prefix?: string;
  suffix: string;
  /** Casas decimais exibidas no contador (padrão: 0). */
  decimals?: number;
  label: string;
  caption: string;
  detail: string;
};

export const RESULTS: readonly ResultItem[] = [
  {
    id: "anos",
    context: "DEV",
    from: 0,
    to: 4.5,
    suffix: "",
    decimals: 1,
    label: "anos de experiência",
    caption: "em desenvolvimento de software",
    detail: "Sistemas e Indústria 4.0",
  },
  {
    id: "negocios",
    context: "SX",
    from: 0,
    to: 5,
    suffix: "",
    label: "negócios em produção",
    caption: "usando o Servix, meu SaaS de agendamento",
    detail: "Salões, barbearias e clínicas de estética",
  },
  {
    id: "faltas",
    context: "SX",
    from: 0,
    to: 90,
    prefix: "~",
    suffix: "%",
    label: "menos faltas (no-shows)",
    caption: "com lembretes via WhatsApp e Google Calendar",
    detail: "Servix · desde 2026",
  },
  {
    id: "fechamento",
    context: "RC",
    from: 60,
    to: 20,
    prefix: "~",
    suffix: "min",
    label: "de fechamento operacional",
    caption: "que levava ~1h antes da automação",
    detail: "Rancheiro · Indústria 4.0",
  },
];

/* ───────────────────────── Projetos ───────────────────────── */

export type Project = {
  kicker: string;
  title: string;
  description: string;
  features: { title: string; description: string }[];
  stack: string[];
  liveUrl?: string;
  liveLabel?: string;
  repoUrl: string;
};

export const PROJECTS: Project[] = [
  {
    kicker: "app mobile-first · next.js 16 + react 19",
    title: "Products App",
    description:
      "Frontend de referência para um CRUD completo de produtos: autenticação por e-mail/senha e Google, listagem, criação, edição e exclusão, com cliente de API tipado gerado automaticamente a partir do OpenAPI da própria API.",
    features: [
      {
        title: "Auth completa",
        description: "com sessão via cookie httpOnly e login social Google",
      },
      {
        title: "TanStack Query",
        description: "para cache e sincronização de dados em tempo real",
      },
      {
        title: "Cliente de API gerado",
        description:
          "via Orval a partir do schema OpenAPI — zero any, zero dessincronia com o backend",
      },
      {
        title: "UI shadcn/ui",
        description:
          "com navegação inferior mobile-first e formulários validados com Zod",
      },
    ],
    stack: [
      "Next.js",
      "React",
      "TypeScript",
      "TanStack Query",
      "Tailwind CSS",
      "shadcn/ui",
      "Zod",
    ],
    repoUrl: "https://github.com/WarleyCoutinho/frontend-products.git",
  },
  {
    kicker: "api rest · fastify 5 + prisma 7",
    title: "Products API",
    description:
      "API de referência construída em camadas (Route → Use Case → Prisma), com autenticação por sessão via Better Auth, validação de ponta a ponta com Zod e documentação OpenAPI navegável direto em produção.",
    features: [
      {
        title: "Arquitetura em camadas",
        description:
          "rotas nunca contêm regra de negócio, use cases nunca tratam erro HTTP",
      },
      {
        title: "Ownership check",
        description:
          "em todo recurso do usuário — retorna 404 em vez de 403 pra não vazar existência de dado de terceiro",
      },
      {
        title: "Docs automáticas",
        description: "com Swagger/OpenAPI + Scalar UI em /docs",
      },
      {
        title: "Better Auth",
        description: "com sessão e OAuth Google, pronta pra produção",
      },
    ],
    stack: [
      "Fastify",
      "TypeScript",
      "Prisma",
      "PostgreSQL",
      "Zod",
      "Better Auth",
      "Swagger",
    ],
    repoUrl: "https://github.com/WarleyCoutinho/api-products.git",
  },
  {
    kicker: "produto próprio em produção · saas",
    title: "Servix",
    description:
      "Plataforma SaaS de agendamento para salões, barbearias e clínicas de estética, desenvolvida e mantida por mim e em produção em 5 negócios desde 2026. Front-end e back-end construídos inteiramente em Next.js, com Prisma e PostgreSQL e integração com o Google Calendar. Apenas o microsserviço do WhatsApp é separado: em Node.js, com API em Fastify e Baileys.",
    features: [
      {
        title: "Lembretes via WhatsApp",
        description:
          "microsserviço independente (Node.js + Baileys), com cerca de 90% menos faltas",
      },
      {
        title: "Google Calendar",
        description: "sincronização da agenda de cada profissional",
      },
      {
        title: "Reservas atômicas",
        description:
          "reservas com vários serviços usando Prisma $transaction e controle de concorrência por profissional",
      },
      {
        title: "Autenticação segura",
        description: "sessão via Better Auth, pronta para produção",
      },
    ],
    stack: [
      "Next.js",
      "TypeScript",
      "Node.js",
      "Prisma",
      "PostgreSQL",
      "Better Auth",
      "Baileys",
    ],
    /*  liveUrl: "https://www.servix.app.br/", */
    liveLabel: "Ver produto ao vivo ↗",
    repoUrl: "https://github.com/WarleyCoutinho/servix",
  },
];
