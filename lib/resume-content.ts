export const SITE_URL = "https://warley-portfolio.vercel.app";

export const siteDomainLabel = SITE_URL.replace(/^https?:\/\//, "");

/* Fonte única do currículo: o PDF gerado na hora (tema escuro/claro) e os
   arquivos fixos em public/curriculo/ (ATS PDF e DOCX) devem refletir este
   conteúdo. Ao alterar aqui, regenere os arquivos fixos. */

export const resumeRole = "Engenheiro de Software | Desenvolvedor de Sistemas";

export const resumeHeadline =
  "Aplicações Web | APIs REST | Integração de Sistemas | Indústria 4.0";

export const resumeLocation = "Anápolis, Goiás, Brasil";

export const resumeSummary =
  "Engenheiro de Software com experiência em aplicações web, APIs REST, integração de sistemas e automação de processos. Atuação em soluções para Indústria 4.0: dashboards de produção e estoque, sistemas OEE (Overall Equipment Effectiveness), microsserviços de coleta de dados e comunicação com equipamentos industriais. Experiência com TypeScript, React, Next.js e Node.js, em frontend e backend, e relatórios operacionais em PDF e Excel. Contribuição para reduzir o fechamento operacional de aproximadamente 1 hora para 20 minutos.";

export const resumeSkills = [
  {
    label: "Linguagens e frontend:",
    items:
      "TypeScript, JavaScript, React, Next.js, Vue.js, React Native, Tailwind CSS, shadcn/ui, TanStack Query, React Hook Form, Zod, PWA",
  },
  {
    label: "Backend e APIs:",
    items:
      "Node.js, Fastify, APIs REST, microsserviços, integração de sistemas, Better Auth, OpenAPI (Swagger), Orval",
  },
  {
    label: "Banco de dados e integrações:",
    items:
      "PostgreSQL, Prisma ORM, WhatsApp, Google Calendar API, Stripe",
  },
  {
    label: "Ferramentas e infraestrutura:",
    items: "Docker, Git, GitHub, Vercel, Railway, Hetzner, Neon, pnpm",
  },
  {
    label: "Outras tecnologias (experiência inicial):",
    items: "Java, Spring Boot, PHP, Laravel, Angular",
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
      "Desenvolvimento de API REST e painel web de gestão de produtos, com autenticação por sessão via Better Auth, validação de dados com Zod e documentação OpenAPI.",
      "Implementação de cliente tipado com Orval e backend organizado em camadas, com verificação de propriedade dos recursos.",
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
    period: "05/2023 – 03/2026",
    bullets: [
      "Contribuição para a redução do tempo de fechamento operacional de aproximadamente 1 hora para 20 minutos, por meio da automação de processos.",
      "Desenvolvimento de dashboards web de produção, gestão de estoque e controle de acesso para soluções de Indústria 4.0, com Next.js, React e TypeScript.",
      "Desenvolvimento de APIs e integrações em Node.js, incluindo comunicação com equipamentos industriais.",
      "Integração de aplicações frontend com APIs desenvolvidas em Python pela equipe responsável pelo backend, com consumo dos endpoints disponibilizados.",
      "Desenvolvimento de relatórios operacionais por turno, dia e mês, com exportação em PDF e Excel.",
    ],
    stack:
      "Next.js, React, TypeScript, Node.js, PostgreSQL, Prisma, Tailwind CSS, shadcn/ui.",
  },
  {
    company: "Avaloon",
    role: "Desenvolvedor de Sistemas",
    place: "Goiânia, GO",
    period: "02/2022 – 05/2023",
    bullets: [
      "Atuação em sistema OEE (Overall Equipment Effectiveness) para Indústria 4.0, com microsserviços de coleta de dados das máquinas, APIs REST e integrações.",
      "Identificação e correção de gargalos e problemas de desempenho em sistemas OEE.",
    ],
    stack:
      "Node.js, TypeScript, JavaScript, Vue.js, PostgreSQL, microsserviços.",
  },
  {
    company: "Fábrica de Tecnologias Turing",
    role: "Desenvolvedor Full Stack",
    place: "Anápolis, GO",
    period: "08/2021 – 09/2021",
    bullets: [
      "Participação, em equipe, no planejamento e desenvolvimento de um sistema para um colégio, incluindo levantamento de requisitos, regras de negócio, frontend, backend, APIs e banco de dados.",
    ],
    stack: "Laravel, Angular, Spring Boot, Java, PHP, PostgreSQL, Docker.",
  },
];

export const education = {
  degree: "Bacharelado em Engenharia de Software",
  school: "UniEVANGÉLICA",
  period: "2018 – 2022",
};

export const certifications = [
  "Fundamentos do Next.js",
  "Fundamentos do React",
  "Fundamentos do React Native",
  "JavaScript: Formação Básica",
  "Masterizando o Tailwind",
  "Clean Code",
];

export const languages = "Português (nativo) | Inglês (básico)";
