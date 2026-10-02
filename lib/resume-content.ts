export const SITE_URL = "https://warley-portfolio.vercel.app";

export const siteDomainLabel = SITE_URL.replace(/^https?:\/\//, "");

export const resumeRole = "Engenheiro de Software Full Stack";

export const resumeLocation = "Anápolis, GO";

export const resumeSkills = [
  {
    label: "Front-end e mobile:",
    items:
      "TypeScript, JavaScript, React, Next.js, React Native, Tailwind CSS, shadcn/ui, TanStack Query, React Hook Form, Zod, PWA.",
  },
  {
    label: "Back-end e dados:",
    items:
      "Node.js, Fastify, APIs REST, Microsserviços, Prisma ORM, PostgreSQL, Better Auth, OpenAPI (Swagger), Orval.",
  },
  {
    label: "Integrações:",
    items: "WhatsApp API oficial, Google Calendar API, Stripe, Gemini.",
  },
  {
    label: "Infra e ferramentas:",
    items: "Docker, Git, GitHub, Vercel, Railway, Hetzner, Neon, pnpm.",
  },
];

export const resumeObjective = [
  "Engenheiro de Software Full Stack com 5+ anos de experiência, atuando de ponta a ponta: arquitetura, modelagem de dados, APIs, integrações, deploy e manutenção em produção.",
  "Busco oportunidades como Software Engineer, Backend Engineer ou Full Stack Engineer, em regime PJ ou CLT, em times de produto e engenharia.",
];

export type ResumeProject = {
  name: string;
  tech: string;
  href: string;
  linkLabel: string;
  description: string;
  bullets: string[];
};

export const resumeProjects: ResumeProject[] = [
  {
    name: "Servix",
    tech: "Next.js, React Native, Fastify, Prisma, PostgreSQL, Stripe",
    href: "https://www.servix.app.br",
    linkLabel: "servix.app.br",
    description:
      "SaaS multi-tenant de agendamento para salões, barbearias e clínicas de estética.",
    bullets: [
      "Em produção em 5 negócios, com ~90% menos faltas (no-shows) graças a lembretes automáticos via WhatsApp e sincronização com Google Calendar.",
      "Microsserviço em Node.js (Fastify + Baileys) que conecta o WhatsApp de cada profissional e envia a agenda para grupos.",
      "Reservas multisserviço atômicas com Prisma $transaction e pagamentos via Stripe.",
    ],
  },
  {
    name: "Products API e Frontend",
    tech: "Fastify, Prisma, Next.js, TanStack Query",
    href: "https://github.com/WarleyCoutinho/api-products",
    linkLabel: "github.com/WarleyCoutinho/api-products",
    description:
      "Projeto de referência técnica: API REST e painel web para gestão de produtos.",
    bullets: [
      "Autenticação por sessão com Better Auth, validação com Zod e documentação OpenAPI.",
      "Cliente de API tipado gerado do OpenAPI com Orval e backend em camadas com verificação de ownership por recurso.",
    ],
  },
];

export type ResumeJob = {
  company: string;
  role: string;
  place: string;
  period: string;
  bullets: string[];
  stack: string;
};

export const resumeJobs: ResumeJob[] = [
  {
    company: "Autônomo",
    role: "Engenheiro de Software Full Stack",
    place: "Anápolis, GO",
    period: "2026 – atual",
    bullets: [
      "Desenvolvo software de ponta a ponta: web e mobile, APIs, banco de dados, integrações, deploy e produção.",
      "Criei e mantenho o Servix (web, mobile e API), em produção em 5 negócios, com ~90% menos faltas (no-shows).",
      "Projetos sob demanda para pequenos negócios (sites, e-commerces e agendamento), do levantamento de requisitos ao deploy.",
    ],
    stack:
      "TypeScript, Next.js, React Native, Fastify, Prisma, PostgreSQL, Better Auth, Baileys.",
  },
  {
    company: "Rancheiro",
    role: "Analista de Sistemas Pleno",
    place: "Anápolis, GO",
    period: "mai 2023 – mar 2026",
    bullets: [
      "Soluções para Indústria 4.0: dashboards de produção, estoque e controle de acesso com Next.js, React e TypeScript sobre APIs Python.",
      "APIs e integrações em Node.js, inclusive com equipamentos industriais.",
      "Automatizei um fechamento operacional de ~1h para ~20 min e criei relatórios por turno, dia e mês (PDF e Excel).",
    ],
    stack:
      "Next.js, React, TypeScript, Node.js, PostgreSQL, Prisma, Tailwind CSS, shadcn/ui.",
  },
  {
    company: "Avaloon",
    role: "Desenvolvedor de Sistemas",
    place: "Goiânia, GO",
    period: "fev 2022 – mai 2023",
    bullets: [
      "Sistema OEE para Indústria 4.0: microsserviços de coleta direto das máquinas, APIs REST e integrações.",
      "Correção de gargalos e problemas de performance, com redução de até 70% das ocorrências identificadas.",
    ],
    stack: "Node.js, Vue.js, TypeScript, JavaScript, PostgreSQL, Microsserviços.",
  },
  {
    company: "Fábrica de Tecnologias Turing",
    role: "Desenvolvedor Full Stack",
    place: "Anápolis, GO",
    period: "ago 2021 – set 2021",
    bullets: [
      "Primeira experiência prática: sistema para um colégio, planejado e construído do zero em equipe (requisitos, regras de negócio, front-end, back-end, APIs, banco de dados e Docker).",
    ],
    stack: "Laravel, Angular, Spring Boot, Java, PHP, PostgreSQL, Docker.",
  },
];

export const resumeEarlierCareer =
  "Soldador na Kingspan Isoeste (2016–2021) e almoxarife / comerciante varejista na ASE Eldorado Distribuição (2008–2016).";

export const education = {
  degree: "Bacharelado em Engenharia de Software",
  school: "UniEVANGÉLICA (2018–2022)",
};

export const certifications = [
  "Fundamentos do Next.js",
  "Fundamentos do React",
  "Fundamentos do React Native",
  "JavaScript: Formação Básica",
];

export const languages = "Português: nativo. Inglês: básico.";
