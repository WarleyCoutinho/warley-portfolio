// Dados usados SÓ pelo currículo (PDF). O resto (experiência, stack, perfil)
// vem de lib/data.ts — mesma fonte que alimenta o site. Editando lá, o PDF
// gerado no botão de download já sai atualizado, sem precisar mexer aqui.

// TODO(warley): se warleycoutinho.dev já estiver no ar e apontando pra este
// site, troque só esta linha — header, rodapé e QR code do PDF atualizam
// juntos, porque todos leem daqui.
export const SITE_URL = "https://warley-portfolio.vercel.app";

export const siteDomainLabel = SITE_URL.replace(/^https?:\/\//, "");

// Versão enxuta de lib/data.ts#projects pro currículo: só o que cabe numa
// página A4 sem virar bula. Textos abaixo são recortes do que já existe em
// data.ts — nenhum dado novo foi inventado aqui.
export const resumeProjects = [
  {
    title: "Servix (2024 — atual)",
    description:
      "SaaS multi-tenant de agendamento e gestão para negócios de beleza — dashboard, autenticação e API em produção pela Adapti Code. 5 negócios ativos, ~50 agendamentos/mês.",
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
  "Desenvolvedor Full Stack com experiência prática em produtos web e mobile de ponta a ponta, especializado em Next.js, React, Fastify e TypeScript. Trajetória construída fora do caminho tradicional de tecnologia — atuei em manufatura e logística antes de migrar para desenvolvimento de software, trazendo forte disciplina de entrega e resolução de problemas sob pressão real. Foco em código type-safe, APIs bem documentadas e interfaces construídas com shadcn/ui.";

// Versões enxutas de lib/data.ts#experience[].description, só pro PDF — o
// site continua com o texto completo (sem limite de página). Currículo tem
// que caber numa folha A4, então aqui é a mesma informação, mais direta.
// Empresa sem entrada aqui usa o texto de data.ts normalmente.
export const resumeExperienceOverrides: Record<string, string> = {
  "Adapti Code":
    "Estúdio próprio de desenvolvimento sob medida — sistemas web, SaaS e apps mobile, do requisito ao deploy. Formalizado em 2026 a partir do Servix (projeto paralelo desde 2024), hoje SaaS multi-tenant pra negócios de beleza: 5 negócios ativos, ~50 agendamentos/mês.",
  Rancheiro:
    "Sistema web responsivo para Indústria 4.0, do requisito à produção, com equipe multidisciplinar. Usado por 5 linhas pra contagem de caixas por turno e fechamento mensal — reduziu o fechamento do líder de 1h pra ~20min (-66%).",
};

export const resumeStats = [
  { value: "4+", label: "anos em desenvolvimento de software" },
  { value: "+90%", label: "produtividade no fluxo de trabalho dos usuários" },
  { value: "-70%", label: "tempo de resposta do sistema em produção" },
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
  "Projetos freelance e vagas CLT / PJ — atendimento 100% remoto.";
