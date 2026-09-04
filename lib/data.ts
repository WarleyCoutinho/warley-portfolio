export const profile = {
  name: "Warley Coutinho",
  role: "Desenvolvedor Full Stack",
  location: "Anápolis, Goiás — Brasil",
  email: "warleycoutinho@icloud.com",
  phone: "(62) 9-9248-6492",
  phoneHref: "+5562992486492",
  linkedin: "https://www.linkedin.com/in/coutinho-warley/",
  linkedinLabel: "/in/coutinho-warley",
  github: "https://github.com/WarleyCoutinho",
  githubLabel: "/WarleyCoutinho",
  githubOrg: "https://github.com/AdaptiCode",
  githubOrgLabel: "/AdaptiCode",
  studio: "https://www.adapticode.com.br/",
  studioLabel: "adapticode.com.br",
};

export const heroMeta = [
  { k: "foco atual", v: "Full stack — Next.js & Fastify" },
  { k: "experiência", v: "4+ anos em desenvolvimento de software" },
  { k: "formação", v: "Eng. de Software — UniEVANGÉLICA" },
];

export const aboutParagraphs = [
  "Minha trajetória não começou em uma faculdade de tecnologia. Passei anos soldando estrutura metálica e depois trabalhando com logística e vendas antes de decidir migrar para desenvolvimento de software — uma escolha que exigiu recomeçar do zero, mas que trouxe pra minha forma de programar uma disciplina que poucos currículos ensinam: entregar algo que funciona sob pressão real.",
  "Hoje sou Desenvolvedor Full Stack especializado em Next.js, Fastify e TypeScript de ponta a ponta. Gosto de trabalhar em todas as camadas de um produto — da modelagem do banco de dados à última interação de UI — e me importo tanto com a robustez da API quanto com a experiência de quem vai usar a tela.",
  "Também sou fundador da Adapti Code, meu estúdio de desenvolvimento sob medida, onde crio sistemas web, plataformas SaaS e apps mobile do zero — incluindo o Servix, produto próprio em produção desde 2024.",
];

export const facts = [
  { k: "local", v: "Anápolis, GO — Brasil" },
  { k: "estúdio", v: "Adapti Code — adapticode.com.br" },
  { k: "e-mail", v: "warleycoutinho@icloud.com" },
  { k: "telefone", v: "(62) 9-9248-6492" },
  { k: "formação", v: "Eng. de Software, UniEVANGÉLICA (2018–2022)" },
  { k: "certificações", v: "React, React Native, Next.js, JavaScript" },
  { k: "disponibilidade", v: "Freelance e CLT/PJ — 100% remoto" },
];

export const stackGroups = [
  {
    title: "frontend & mobile",
    items: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "shadcn/ui",
      "React Query",
      "Zustand",
      "Zod",
      "React Native",
      "Expo",
    ],
  },
  {
    title: "backend & dados",
    items: [
      "Node.js",
      "Fastify",
      "Prisma ORM",
      "PostgreSQL",
      "Better Auth",
      "JWT",
      "Swagger / OpenAPI",
      "bcrypt",
    ],
  },
  {
    title: "infra & ferramentas",
    items: ["Vercel", "Neon", "Docker", "pnpm", "Git", "GitHub Actions"],
  },
  {
    title: "processo",
    items: ["Agile / Scrum", "Code review", "Documentação técnica"],
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
    company: "Adapti Code",
    role: "Fundador & Desenvolvedor Full Stack · Anápolis, GO",
    description:
      "Estúdio próprio de desenvolvimento sob medida — sistemas web, plataformas SaaS e apps mobile, do levantamento de requisitos ao deploy em produção. Produto próprio em destaque: Servix, plataforma SaaS multi-tenant de gestão para negócios de beleza.",
    tags: ["Next.js", "Fastify", "Prisma", "PostgreSQL", "Better Auth"],
    url: "https://www.adapticode.com.br/",
  },
  {
    period: "mai 2023 — mar 2026",
    company: "Rancheiro",
    role: "Analista de Sistemas Pleno · Anápolis, GO",
    description:
      "Desenvolvimento de sistema web responsivo para Indústria 4.0, atuando do levantamento de requisitos à entrega em produção junto a uma equipe multidisciplinar.",
    tags: ["React.js", "Python", "PostgreSQL", "TypeScript"],
  },
  {
    period: "fev 2022 — mai 2023",
    company: "Avaloon",
    role: "Desenvolvedor de Sistemas · Goiânia, GO",
    description:
      "Levantamento de requisitos, desenvolvimento de novas funcionalidades, correção de bugs e integração com APIs de terceiros. Otimizações que resultaram em +90% de produtividade no fluxo dos usuários e -70% no tempo de resposta do sistema.",
    tags: ["Vue.js", "Node.js", "PostgreSQL", "MySQL", "Tailwind CSS"],
  },
  {
    period: "ago 2021 — set 2021",
    company: "Fábrica de Tecnologias Turing (FTT)",
    role: "Desenvolvedor · UniEVANGÉLICA, Anápolis",
    description:
      "Projeto acadêmico aplicado com stack poliglota, primeira imersão prática em desenvolvimento web full stack.",
    tags: ["Laravel", "Angular", "Spring Boot", "Java", "PHP", "PostgreSQL"],
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
    kicker: "produto em produção · saas multi-tenant · adapti code",
    title: "Servix",
    description:
      "Plataforma SaaS de gestão para negócios de beleza, com autenticação, dashboard interativo, agendamentos e API robusta. Produto próprio, em produção desde 2024, desenvolvido e mantido pela Adapti Code.",
    features: [
      {
        title: "Multi-tenant",
        description: "cada negócio opera isolado dentro da mesma plataforma",
      },
      {
        title: "Agendamentos",
        description: "fluxo completo de marcação e gestão de horários",
      },
      {
        title: "Dashboard interativo",
        description: "métricas e visão operacional do negócio em tempo real",
      },
      {
        title: "Autenticação segura",
        description: "sessão via Better Auth, pronta pra produção",
      },
    ],
    stack: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Better Auth"],
    liveUrl: "https://www.servix.app.br/",
    liveLabel: "Ver produto ao vivo ↗",
    repoUrl: "https://github.com/AdaptiCode",
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
        title: "React Query",
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
      "React Query",
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
