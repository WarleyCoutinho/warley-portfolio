export const profile = {
  name: "Warley Coutinho",
  role:
    "Engenheiro de Software | Full Stack | Backend Node.js | TypeScript | Next.js | React | PostgreSQL | APIs REST",
  location: "Anápolis, Goiás — Brasil",
  email: "warleycoutinho@icloud.com",
  phone: "(62) 9-9248-6492",
  phoneHref: "+5562992486492",
  linkedin: "https://www.linkedin.com/in/coutinhowarley/",
  linkedinLabel: "/in/coutinhowarley",
  github: "https://github.com/WarleyCoutinho",
  githubLabel: "/WarleyCoutinho",
  instagram: "https://www.instagram.com/warlycoutinho/",
  instagramLabel: "@warlycoutinho",
  githubOrg: "https://github.com/AdaptiCode",
  githubOrgLabel: "/AdaptiCode",
  studio: "https://www.adapticode.com.br/",
  studioLabel: "adapticode.com.br",
};

export const heroMeta = [
  { k: "foco atual", v: "Software Engineering — Node.js, TypeScript & Next.js" },
  { k: "experiência", v: "5+ anos em desenvolvimento de software" },
  { k: "formação", v: "Eng. de Software — UniEVANGÉLICA" },
];

export const aboutParagraphs = [
  "Sou Engenheiro de Software Full Stack com 5+ anos de experiência em desenvolvimento de software, com foco em TypeScript, Node.js, Next.js e React.",
  "Atuo no desenvolvimento de produtos e sistemas de ponta a ponta, desde arquitetura, modelagem de dados e desenvolvimento de APIs até integrações, deploy e manutenção em produção.",
  "De forma independente, desenvolvo produtos web e mobile e trabalho diretamente com arquitetura, backend, banco de dados, integrações e produção. Meu principal projeto é o Servix, plataforma SaaS de agendamento para salões, barbearias e clínicas de estética, em produção em 5 negócios, com web (Next.js), mobile (React Native) e API (Fastify, Prisma, PostgreSQL). Também entrego projetos sob demanda para pequenos negócios, do levantamento de requisitos ao deploy.",
  "No Servix, implementei lembretes automáticos via WhatsApp e sincronização com Google Calendar, contribuindo para uma redução de aproximadamente 90% nas faltas (no-shows). Também implementei reservas multisserviço atômicas utilizando Prisma $transaction.",
  "Na Rancheiro, desenvolvi soluções para Indústria 4.0, incluindo dashboards de produção, estoque e controle de acesso, APIs, integrações com sistemas e equipamentos industriais e automações. Um processo de fechamento operacional foi reduzido de aproximadamente 1 hora para cerca de 20 minutos.",
  "Na Avaloon, trabalhei com sistemas OEE para Indústria 4.0, APIs REST, microsserviços de coleta de dados diretamente das máquinas e otimização de performance, contribuindo para reduzir em até 70% as ocorrências identificadas.",
  "Minha stack principal inclui TypeScript, Node.js, Fastify, Next.js, React, React Native, Prisma, PostgreSQL, REST APIs, Microservices, Docker, Git, Vercel, Tailwind CSS e shadcn/ui.",
  "Busco oportunidades como Software Engineer, Backend Engineer ou Full Stack Engineer, em regime CLT ou PJ, especialmente em times de produto e engenharia que valorizem arquitetura, automação, performance e desenvolvimento de produtos. Meus projetos próprios, como o Servix, me mantêm em contato com o produto de ponta a ponta.",
];

export const facts = [
  { k: "local", v: "Anápolis, GO — Brasil" },
  { k: "projetos", v: "Servix e projetos sob demanda — adapticode.com.br" },
  { k: "e-mail", v: "warleycoutinho@icloud.com" },
  { k: "telefone", v: "(62) 9-9248-6492" },
  { k: "formação", v: "Eng. de Software, UniEVANGÉLICA (2018–2022)" },
  { k: "certificações", v: "React, React Native, Next.js, JavaScript" },
  { k: "disponibilidade", v: "Aberto a oportunidades CLT ou PJ" },
];

export const stackGroups = [
  {
    title: "frontend & mobile",
    items: [
      "TypeScript",
      "JavaScript",
      "Next.js",
      "React",
      "React Native",
      "iOS",
      "Android",
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
  },
  {
    title: "backend & dados",
    items: [
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
  },
  {
    title: "integrações",
    items: ["WhatsApp API oficial", "Google Calendar API", "Stripe", "Gemini"],
  },
  {
    title: "infra & ferramentas",
    items: [
      "Docker",
      "Git",
      "GitHub",
      "Vercel",
      "Railway",
      "Hetzner",
      "Neon",
      "pnpm",
    ],
  },
];

export type ExperienceItem = {
  period: string;
  company: string;
  role: string;
  description: string;
  tags: string[];
  url?: string;
};

export const experience: ExperienceItem[] = [
  {
    period: "2026 — atual",
    company: "Autônomo",
    role: "Engenheiro de Software Full Stack · Projetos próprios e freelance · Anápolis, GO",
    description:
      "Desenvolvo software de ponta a ponta de forma independente — aplicações web e mobile, APIs, bancos de dados, integrações, deploy e manutenção em produção. Principal projeto: o Servix, plataforma SaaS própria de agendamento para salões, barbearias e clínicas de estética, em produção em 5 negócios, com web (Next.js), mobile (React Native) e API (Fastify, Prisma, PostgreSQL). Reduzi em ~90% as faltas (no-shows) com lembretes automáticos via WhatsApp e sincronização com o Google Calendar, e evitei conflitos de horário com reservas multisserviço atômicas (Prisma $transaction) e controle de concorrência por profissional. Um microsserviço independente em Node.js separa o processamento das mensagens do WhatsApp da aplicação principal. Também entrego projetos sob demanda — sites institucionais, e-commerces e sistemas de agendamento para pequenos negócios — do levantamento de requisitos ao deploy.",
    tags: [
      "TypeScript",
      "Next.js",
      "Fastify",
      "Prisma",
      "PostgreSQL",
      "Better Auth",
    ],
  },
  {
    period: "mai 2023 — mar 2026",
    company: "Rancheiro",
    role: "Analista de Sistemas Pleno · Anápolis, GO",
    description:
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
    period: "fev 2022 — mai 2023",
    company: "Avaloon",
    role: "Desenvolvedor de Sistemas · Goiânia, GO",
    description:
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
    period: "ago 2021 — set 2021",
    company: "Fábrica de Tecnologias Turing (FTT)",
    role: "Desenvolvedor Full Stack · Anápolis, GO",
    description:
      "Primeira experiência prática em desenvolvimento: sistema para um colégio, planejado e construído do zero em equipe — requisitos, regras de negócio, front-end, back-end, APIs, banco de dados e Docker.",
    tags: ["Laravel", "Angular", "Spring Boot", "Java", "PHP", "PostgreSQL", "Docker"],
  },
];

export const earlierCareer = {
  period: "2008 — 2021",
  description:
    "Soldador na Kingspan Isoeste (2016–2021) e almoxarife / comerciante varejista na ASE Eldorado Distribuição (2008–2016) — a base de disciplina e resolução de problemas que carrego pra engenharia de software.",
};

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

export const projects: Project[] = [
  {
    kicker: "produto próprio em produção · saas",
    title: "Servix",
    description:
      "Plataforma SaaS de agendamento para salões, barbearias e clínicas de estética, desenvolvida e mantida por mim e em produção em 5 negócios. Web em Next.js, mobile em React Native e API em Fastify, Prisma e PostgreSQL, com integração ao Google Calendar e um microserviço dedicado em Node.js e Baileys para o WhatsApp.",
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
      "React Native",
      "TypeScript",
      "Fastify",
      "Prisma",
      "PostgreSQL",
      "Better Auth",
      "Baileys",
    ],
    liveUrl: "https://www.servix.app.br/",
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
