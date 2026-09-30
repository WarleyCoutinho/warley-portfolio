export const SITE_URL = "https://warley-portfolio.vercel.app";

export const siteDomainLabel = SITE_URL.replace(/^https?:\/\//, "");

export const resumeProjects = [
  {
    title: "Servix (2024 — atual)",
    description:
      "SaaS de agendamento e gestão para salões e barbearias, em produção em 5 negócios. Lembretes via WhatsApp (microserviço Node.js + Baileys) e sync com Google Calendar: ~90% menos faltas. Reservas multisserviço atômicas com Prisma $transaction.",
    linkLabel: "servix.app.br",
  },
  {
    title: "Products App/API (referência técnica)",
    description:
      "CRUD completo com auth via Google, cliente de API tipado gerado do OpenAPI (Orval), backend em camadas com ownership check por recurso.",
    linkLabel: "github.com/WarleyCoutinho",
  },
];

export const resumeSummary =
  "Engenheiro de Software Full Stack especializado em TypeScript, Node.js e produtos web, com experiência em sistemas de produção, SaaS e Indústria 4.0. Fundador da Adapti Code, onde desenvolvo produtos de ponta a ponta: arquitetura, banco de dados, integrações, deploy e manutenção. Transformo processos complexos em sistemas mais rápidos, automatizados e confiáveis. Trajetória fora do caminho tradicional — soldador, almoxarife e comerciante antes de migrar para software. Aberto a vagas de Software, Backend ou Full Stack Engineer.";

export const resumeExperienceOverrides: Record<string, string> = {
  "Adapti Code":
    "Projeto e desenvolvo produtos de ponta a ponta — web e mobile, APIs, banco, integrações, deploy e produção. Servix: SaaS de agendamento em produção em 5 salões e barbearias; ~90% menos faltas (lembretes via WhatsApp + Google Calendar) e reservas multisserviço atômicas com Prisma $transaction.",
  Rancheiro:
    "Soluções para Indústria 4.0: dashboards de produção, estoque e controle de acesso, com Next.js/React/TypeScript sobre APIs Python, mais APIs e integrações em Node.js e com equipamentos industriais. Automatizei um fechamento operacional de ~1h para ~20min e criei relatórios por turno, dia e mês (PDF e Excel).",
  Avaloon:
    "Sistema OEE para Indústria 4.0 (Node.js, Vue.js, PostgreSQL): microsserviços de coleta direto das máquinas, APIs REST e integrações. Correção de gargalos e problemas de performance, com redução de até 70% das ocorrências identificadas.",
};

export const resumeStats = [
  { value: "5+", label: "anos em desenvolvimento de software" },
  {
    value: "-90%",
    label: "faltas (no-shows) no Servix, com lembretes automáticos",
  },
  {
    value: "1h→20min",
    label: "fechamento operacional automatizado (Rancheiro)",
  },
];

export const education = {
  degree: "Bacharelado em Eng. de Software",
  school: "UniEVANGÉLICA — 2018-2022",
};

export const certifications = [
  "Fundamentos do Next.js",
  "Fundamentos do React",
  "Fundamentos do React Native",
  "JavaScript: Formação Básica",
];

export const availability =
  "Aberto a oportunidades PJ ou CLT em times de produto e engenharia.";
