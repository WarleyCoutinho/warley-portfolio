export const SITE_URL = "https://warley-portfolio.vercel.app";

export const siteDomainLabel = SITE_URL.replace(/^https?:\/\//, "");

export const resumeRole = "Engenheiro de Software | Desenvolvedor Full Stack";

export const resumeHeadline =
  "Frontend | Backend | TypeScript | React | Next.js | Node.js";

export const resumeLocation = "Anápolis, GO";

export const resumeSummary =
  "Engenheiro de Software Full Stack com experiência em desenvolvimento de software, aplicações web, dashboards industriais, APIs REST, integração de sistemas e automação de processos. Atuo com TypeScript, JavaScript, React, Next.js, Vue.js, Node.js, Fastify e PostgreSQL. Experiência em soluções para Indústria 4.0, sistemas OEE, comunicação com equipamentos industriais e desenvolvimento de relatórios operacionais. Contribuí para reduzir o tempo de um fechamento operacional de aproximadamente 60 para 20 minutos.";

export const resumeSkills = [
  {
    label: "Frontend e desenvolvimento web:",
    items:
      "TypeScript, JavaScript, React, Next.js, React Native, Vue.js, Tailwind CSS, shadcn/ui, TanStack Query, React Hook Form, Zod, PWA.",
  },
  {
    label: "Backend e APIs:",
    items:
      "Node.js, Fastify, APIs REST, microsserviços, integração de sistemas, Prisma ORM, Better Auth, OpenAPI (Swagger), Orval.",
  },
  {
    label: "Banco de dados:",
    items: "PostgreSQL, modelagem e acesso a dados com Prisma ORM.",
  },
  {
    label: "Integrações:",
    items: "WhatsApp, Google Calendar API, Stripe.",
  },
  {
    label: "Ferramentas e infraestrutura:",
    items: "Docker, Git, GitHub, Vercel, Railway, Hetzner, Neon, pnpm.",
  },
  {
    label: "Domínios e soluções:",
    items:
      "desenvolvimento de software, aplicações web, Indústria 4.0, sistemas OEE, dashboards, controle de acesso, automação de processos, relatórios PDF e Excel, integração com equipamentos industriais.",
  },
];

export type ResumeProject = {
  name: string;
  tech: string;
  href: string;
  linkLabel: string;
  bullets: string[];
};

export const resumeProjects: ResumeProject[] = [
  {
    name: "Products API e Frontend",
    tech: "Fastify, Prisma, Next.js, TanStack Query",
    href: "https://github.com/WarleyCoutinho/api-products",
    linkLabel: "github.com/WarleyCoutinho/api-products",
    bullets: [
      "Desenvolvi uma API REST e um painel web de gestão de produtos, com autenticação por sessão via Better Auth, validação de dados com Zod e documentação OpenAPI.",
      "Implementei cliente tipado com Orval e backend organizado em camadas, com verificação de propriedade dos recursos.",
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
    company: "Rancheiro",
    role: "Analista de Sistemas Pleno",
    place: "Anápolis, GO",
    period: "mai/2023 – mar/2026",
    bullets: [
      "Reduzi o tempo de fechamento operacional de aproximadamente 60 para 20 minutos por meio da automação do processo.",
      "Desenvolvi dashboards web de produção, estoque e controle de acesso para soluções de Indústria 4.0, utilizando Next.js, React e TypeScript.",
      "Desenvolvi APIs e integrações em Node.js, incluindo comunicação com equipamentos industriais.",
      "Integrei aplicações frontend a APIs desenvolvidas em Python, consumindo endpoints disponibilizados pela equipe responsável pelo backend.",
      "Desenvolvi relatórios operacionais por turno, dia e mês, com exportação para PDF e Excel.",
    ],
    stack:
      "Next.js, React, TypeScript, Node.js, PostgreSQL, Prisma, Tailwind CSS, shadcn/ui.",
  },
  {
    company: "Avaloon",
    role: "Desenvolvedor de Sistemas",
    place: "Goiânia, GO",
    period: "fev/2022 – mai/2023",
    bullets: [
      "Atuei em sistema OEE para Indústria 4.0, envolvendo microsserviços de coleta de dados de máquinas, APIs REST e integrações.",
      "Identifiquei e corrigi gargalos e problemas de desempenho em sistemas OEE.",
    ],
    stack:
      "Node.js, Vue.js, TypeScript, JavaScript, PostgreSQL, microsserviços.",
  },
  {
    company: "Fábrica de Tecnologias Turing",
    role: "Desenvolvedor Full Stack",
    place: "Anápolis, GO",
    period: "ago/2021 – set/2021",
    bullets: [
      "Participei do planejamento e desenvolvimento em equipe de um sistema para um colégio, abrangendo requisitos, regras de negócio, frontend, backend, APIs e banco de dados.",
    ],
    stack: "Laravel, Angular, Spring Boot, Java, PHP, PostgreSQL, Docker.",
  },
];

export const education = {
  degree: "Bacharelado em Engenharia de Software",
  school: "UniEVANGÉLICA | 2018–2022",
};

export const certifications = [
  "Fundamentos do Next.js",
  "Fundamentos do React",
  "Fundamentos do React Native",
  "JavaScript: Formação Básica",
  "Masterizando o Tailwind",
  "Clean Code",
];

export const languages = "Português nativo | Inglês básico.";
