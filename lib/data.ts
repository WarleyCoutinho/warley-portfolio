export { SITE_URL } from "./resume-content";

export const PROFILE = {
  name: "Warley Coutinho",
  initials: "WC",
  role: "Engenheiro de Software Full Stack",
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
    "Engenheiro de Software Full Stack com 5+ anos de experiência, atuando de ponta a ponta: arquitetura, modelagem de dados, APIs, integrações, deploy e manutenção em produção.",
  /** Texto falado no vídeo do hero (vira a transcrição acessível). Confira se bate com o áudio. */
  introTranscript:
    "Olá, eu sou o Warley Coutinho. Sou engenheiro de software full stack e construo produtos web, APIs e sistemas do início ao fim.",
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
  { k: "experiência", v: "5+ anos em desenvolvimento de software" },
  { k: "formação", v: "Eng. de Software — UniEVANGÉLICA" },
] as const;

export const FACTS = {
  location: "Anápolis, GO — Brasil",
  education: "Eng. de Software, UniEVANGÉLICA (2018–2022)",
  current: "Autônomo, desde 2026",
  availability: "Aberto a oportunidades CLT ou PJ",
} as const;

export const QUOTE =
  "Do chão de fábrica a SaaS próprio e sistemas de Indústria 4.0.";

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
  "Sou Engenheiro de Software Full Stack com 5+ anos de experiência em desenvolvimento de software, com foco em TypeScript, Node.js, Next.js e React.",
  "Atuo no desenvolvimento de produtos e sistemas de ponta a ponta, desde arquitetura, modelagem de dados e desenvolvimento de APIs até integrações, deploy e manutenção em produção.",
  "Desde 2026, de forma independente, desenvolvo produtos web, além de apps mobile (iOS e Android) com React Native quando o projeto pede, e trabalho diretamente com arquitetura, backend, banco de dados, integrações e produção. Meu principal projeto é o Servix, plataforma SaaS de agendamento para salões, barbearias e clínicas de estética, em produção desde 2026 em 5 negócios, com web (Next.js) e API (Fastify, Prisma, PostgreSQL). Também entrego projetos sob demanda para pequenos negócios, do levantamento de requisitos ao deploy.",
  "No Servix, implementei lembretes automáticos via WhatsApp e sincronização com Google Calendar, contribuindo para uma redução de aproximadamente 90% nas faltas (no-shows). Também implementei reservas multisserviço atômicas utilizando Prisma $transaction.",
  "Na Rancheiro, desenvolvi soluções para Indústria 4.0, incluindo dashboards de produção, estoque e controle de acesso, APIs, integrações com sistemas e equipamentos industriais e automações. Um processo de fechamento operacional foi reduzido de aproximadamente 1 hora para cerca de 20 minutos.",
  "Na Avaloon, trabalhei com sistemas OEE para Indústria 4.0, APIs REST, microsserviços de coleta de dados diretamente das máquinas e otimização de performance, contribuindo para reduzir em até 70% as ocorrências identificadas.",
  "Minha stack principal inclui TypeScript, Node.js, Fastify, Next.js, React, React Native, Prisma, PostgreSQL, REST APIs, Microservices, Docker, Git, Vercel, Tailwind CSS e shadcn/ui.",
  "Busco oportunidades como Software Engineer, Backend Engineer ou Full Stack Engineer, em regime CLT ou PJ, especialmente em times de produto e engenharia que valorizem arquitetura, automação, performance e desenvolvimento de produtos. Meus projetos próprios, como o Servix, me mantêm em contato com o produto de ponta a ponta.",
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
    id: "ase",
    kind: "work",
    period: "2008 — 2016",
    title: "Almoxarife / comerciante varejista",
    place: "ASE Eldorado Distribuição",
  },

  {
    id: "unievangelica",
    kind: "education",
    period: "2018 — 2022",
    title: EDUCATION.degree,
    place: EDUCATION.school,
  },

  {
    id: "kingspan",
    kind: "work",
    period: "2016 — 2021",
    title: "Soldador",
    place: "Kingspan Isoeste",
  },
  {
    id: "turing",
    kind: "work",
    period: "ago 2021 — set 2021",
    title: "Desenvolvedor Full Stack",
    place: "Fábrica de Tecnologias Turing (FTT) · Anápolis, GO",
    detail:
      "Primeira experiência prática em desenvolvimento: sistema para um colégio, planejado e construído do zero em equipe — requisitos, regras de negócio, front-end, back-end, APIs, banco de dados e Docker.",
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
      "Desenvolvimento e evolução de sistema OEE para Indústria 4.0, de ponta a ponta no back-end e front-end: microsserviços de coleta de dados direto das máquinas, APIs REST/JSON, novas funcionalidades e integrações com sistemas e equipamentos industriais. Análise e correção de bugs, gargalos e problemas de performance (rotas, consultas e processamento de dados), contribuindo para reduzir em até 70% as ocorrências identificadas.",
    tags: [
      "Node.js",
      "Vue.js",
      "TypeScript",
      "JavaScript",
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
      "Soluções para Indústria 4.0, do levantamento de requisitos e entendimento dos processos operacionais até a entrega. Sistemas web e dashboards de produção, controle de estoque e controle de acesso — atuando principalmente no front-end (Next.js, React, TypeScript) sobre APIs REST em Python, além de APIs e integrações em Node.js e integração com equipamentos industriais. Automatizei processos de produção, reduzindo um fechamento operacional de ~1h para ~20min, e criei indicadores e relatórios por turno, dia e mês com exportação para PDF e Excel.",
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
  {
    id: "autonomo",
    kind: "work",
    period: "2026 — atual",
    title: "Engenheiro de Software Full Stack",
    place: "Autônomo · Projetos próprios e sob demanda · Anápolis, GO",
    detail:
      "Desde 2026, desenvolvo software de ponta a ponta de forma independente — aplicações web, apps mobile com React Native (sob demanda), APIs, bancos de dados, integrações, deploy e manutenção em produção. Principal projeto: o Servix, plataforma SaaS própria de agendamento para salões, barbearias e clínicas de estética, em produção desde 2026 em 5 negócios, com web (Next.js) e API (Fastify, Prisma, PostgreSQL). Reduzi em ~90% as faltas (no-shows) com lembretes automáticos via WhatsApp e sincronização com o Google Calendar, e evitei conflitos de horário com reservas multisserviço atômicas (Prisma $transaction) e controle de concorrência por profissional. Também entrego projetos sob demanda — sites institucionais, e-commerces e sistemas de agendamento para pequenos negócios — do levantamento de requisitos ao deploy.",
    tags: [
      "TypeScript",
      "Next.js",
      "Fastify",
      "Prisma",
      "PostgreSQL",
      "Better Auth",
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
  label: string;
  caption: string;
  detail: string;
};

export const RESULTS: readonly ResultItem[] = [
  {
    id: "anos",
    context: "DEV",
    from: 0,
    to: 5,
    suffix: "+",
    label: "anos de experiência",
    caption: "em desenvolvimento de software",
    detail: "Do chão de fábrica à engenharia de software",
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
  {
    id: "ocorrencias",
    context: "AV",
    from: 0,
    to: 70,
    prefix: "até ",
    suffix: "%",
    label: "menos ocorrências identificadas",
    caption: "com correção de gargalos e performance",
    detail: "Avaloon · sistema OEE",
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
    kicker: "produto próprio em produção · saas",
    title: "Servix",
    description:
      "Plataforma SaaS de agendamento para salões, barbearias e clínicas de estética, desenvolvida e mantida por mim e em produção desde 2026 em 5 negócios. Front-end e back-end construídos inteiramente em Next.js, com Prisma e PostgreSQL e integração ao Google Calendar. Só o microsserviço do WhatsApp é separado: em Node.js, com API em Fastify e Baileys.",
    features: [
      {
        title: "Lembretes via WhatsApp",
        description:
          "microserviço independente (Node.js + Baileys) — cerca de 90% menos faltas",
      },
      {
        title: "Google Calendar",
        description: "sincronização da agenda de cada profissional",
      },
      {
        title: "Reservas atômicas",
        description:
          "multisserviço com Prisma $transaction e controle de concorrência por profissional",
      },
      {
        title: "Autenticação segura",
        description: "sessão via Better Auth, pronta pra produção",
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
];
