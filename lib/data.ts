export const profile = {
  name: "Warley Coutinho",
  role: "Engenheiro de Software Full Stack",
  location: "Anápolis, Goiás — Brasil",
  email: "warleycoutinho@icloud.com",
  phone: "(62) 9-9248-6492",
  phoneHref: "+5562992486492",
  linkedin: "https://www.linkedin.com/in/coutinho-warley/",
  linkedinLabel: "/in/coutinho-warley",
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
  { k: "foco atual", v: "Full stack — TypeScript, Next.js & Fastify" },
  { k: "experiência", v: "5+ anos em desenvolvimento de software" },
  { k: "formação", v: "Eng. de Software — UniEVANGÉLICA" },
];

export const aboutParagraphs = [
  "Minha trajetória não começou em uma faculdade de tecnologia. Passei anos soldando estrutura metálica e depois trabalhando com logística e vendas antes de decidir migrar para desenvolvimento de software — uma escolha que exigiu recomeçar do zero, mas que trouxe pra minha forma de programar uma disciplina que poucos currículos ensinam: entregar algo que funciona sob pressão real.",
  "Hoje sou Engenheiro de Software Full Stack, especializado em TypeScript, Node.js, Next.js e Fastify. Atuo de ponta a ponta — da arquitetura e modelagem do banco às integrações, deploy e manutenção em produção — com experiência em sistemas de Indústria 4.0, APIs REST, microsserviços e dashboards. Gosto de atuar próximo do problema, entendendo o processo antes de transformar a necessidade em software.",
  "Sou fundador da Adapti Code, onde projeto e desenvolvo produtos web e mobile do zero — incluindo o Servix, SaaS de agendamento e gestão em produção em 5 salões e barbearias, que reduziu em cerca de 90% as faltas (no-shows) com lembretes automáticos via WhatsApp e sincronização com o Google Calendar.",
];

export const facts = [
  { k: "local", v: "Anápolis, GO — Brasil" },
  { k: "estúdio", v: "Adapti Code — adapticode.com.br" },
  { k: "e-mail", v: "warleycoutinho@icloud.com" },
  { k: "telefone", v: "(62) 9-9248-6492" },
  { k: "formação", v: "Eng. de Software, UniEVANGÉLICA (2018–2022)" },
  { k: "certificações", v: "React, React Native, Next.js, JavaScript" },
  { k: "disponibilidade", v: "Aberto a oportunidades PJ ou CLT" },
];

export const stackGroups = [
  {
    title: "frontend & mobile",
    items: [
      "TypeScript",
      "Next.js",
      "React",
      "React Native",
      "Vue.js",
      "Tailwind CSS",
      "shadcn/ui",
      "React Query",
      "Zod",
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
      "Better Auth",
      "Swagger / OpenAPI",
    ],
  },
  {
    title: "integrações",
    items: ["Baileys (WhatsApp)", "Google Calendar API", "Stripe"],
  },
  {
    title: "infra & ferramentas",
    items: ["Docker", "Git", "Vercel", "pnpm"],
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
    role: "Founder & Engenheiro de Software · Anápolis, GO",
    description:
      "Projeto e desenvolvo produtos de ponta a ponta — aplicações web e mobile, APIs, bancos de dados, integrações, deploy e manutenção em produção. Principal produto: o Servix, SaaS de agendamento e gestão para salões, barbearias e profissionais autônomos, em produção em 5 negócios. Reduzi em ~90% as faltas (no-shows) com lembretes automáticos via WhatsApp e sincronização com o Google Calendar, e evitei conflitos de horário com reservas multisserviço atômicas (Prisma $transaction) e controle de concorrência por profissional. Um microserviço independente em Node.js + Baileys separa o processamento das mensagens do WhatsApp da aplicação principal.",
    tags: [
      "TypeScript",
      "Next.js",
      "Fastify",
      "Prisma",
      "PostgreSQL",
      "Better Auth",
      "Baileys",
    ],
    url: "https://www.adapticode.com.br/",
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
    kicker: "produto em produção · saas multi-tenant · adapti code",
    title: "Servix",
    description:
      "SaaS de agendamento e gestão para salões, barbearias e profissionais autônomos, desenvolvido e mantido pela Adapti Code e em produção em 5 negócios. A primeira versão usa Next.js no front e no back, com um microserviço dedicado em Node.js e Baileys para o WhatsApp.",
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
