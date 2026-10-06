// Extra content for the talking-video home. Everything else comes from lib/data.ts (single source of truth).
export const INTRO_TRANSCRIPT =
  "Olá, eu sou o Warley. Sou engenheiro de software full stack e construo produtos web, APIs e sistemas do início ao fim."; // verified against the spoken audio

export const SHOW_PHONE = false; // LGPD: keep the phone number out of the public HTML

export const NAV = [
  { id: "sobre", label: "Sobre" },
  { id: "stack", label: "Stack" },
  { id: "projetos", label: "Projetos" },
  { id: "experiencia", label: "Experiência" },
  { id: "resultados", label: "Resultados" },
  { id: "contato", label: "Contato" },
] as const;

export const CERTIFICATIONS = ["React", "React Native", "Next.js", "JavaScript"] as const; // issuer not in the résumé data

export const TIMELINE = [
  { when: "2008 — 2021", title: "Kingspan Isoeste · ASE Eldorado", place: "Soldador · almoxarife e comerciante varejista", text: "A base de disciplina e resolução de problemas antes do software." },
  { when: "2018 — 2022", title: "Engenharia de Software", place: "UniEVANGÉLICA", text: "Bacharelado em Engenharia de Software." },
] as const;

export const RESULTS = [
  { n: 5, pre: "", suf: "+", label: "anos", cap: "de experiência em desenvolvimento de software", tag: "XP" },
  { n: 5, pre: "", suf: "", label: "negócios", cap: "usando o Servix em produção", tag: "SV" },
  { n: 90, pre: "~", suf: "%", label: "menos faltas", cap: "com lembretes via WhatsApp e Google Calendar", tag: "WA" },
  { n: 20, from: 60, pre: "~", suf: " min", label: "de fechamento", cap: "que levava cerca de 1 h (Rancheiro)", tag: "RN" },
  { n: 70, pre: "até ", suf: "%", label: "menos ocorrências", cap: "identificadas (Avaloon)", tag: "AV" },
] as const;
