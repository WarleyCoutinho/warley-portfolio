/* Conteúdo da página /kit (passo a passo + prompt de IA).
   Fica fora dos componentes, como o resto do site. Trechos entre `crases`
   viram <code> na página. */

export const KIT_REPO_URL = "https://github.com/WarleyCoutinho/warley-portfolio";

export type KitBlock =
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "note"; tone: "warn" | "info"; text: string }
  | { type: "code"; label?: string; text: string }
  | { type: "table"; head: [string, string]; rows: [string, string][] };

export type KitStep = {
  id: string;
  title: string;
  blocks: KitBlock[];
};

export const KIT_STEPS: KitStep[] = [
  {
    id: "passo-0",
    title: "Requisitos",
    blocks: [
      {
        type: "ul",
        items: [
          "Node.js 22+ e pnpm",
          "Git",
          "Para o vídeo do hero: ffmpeg e Python 3 (com numpy e opencv). Só se você for fazer o seu vídeo.",
        ],
      },
    ],
  },
  {
    id: "passo-1",
    title: "Clonar e rodar",
    blocks: [
      {
        type: "code",
        text: `git clone ${KIT_REPO_URL}.git meu-portfolio
cd meu-portfolio
rm -rf .git && git init   # histórico novo, só seu
pnpm install
pnpm dev                  # http://localhost:3338`,
      },
    ],
  },
  {
    id: "passo-2",
    title: "Trocar os dados",
    blocks: [
      {
        type: "p",
        text: "Todo o conteúdo do site vem de `lib/data.ts` (e de `lib/resume-content.ts`, para o currículo). Adaptar é, em grande parte, trocar dados e mídia.",
      },
      {
        type: "table",
        head: ["Bloco", "O que é"],
        rows: [
          [
            "PROFILE",
            "nome, iniciais, cargo, local, e-mail, links (LinkedIn, GitHub, Instagram), caminho do currículo e `introTranscript`",
          ],
          ["NAV", "ids e rótulos do menu"],
          ["HERO_META", "os 3 itens do hero (foco atual, experiência, formação)"],
          ["FACTS, QUOTE, EDUCATION", "fatos rápidos, frase de destaque e formação"],
          ["ABOUT_PARAGRAPHS", "texto da seção Sobre"],
          ["CERTIFICATIONS", "lista de certificações"],
          ["SKILL_FAMILIES / SKILLS", "stack da “tabela periódica”"],
          ["TIMELINE", "experiência e formação"],
          ["RESULTS", "resultados com contadores animados"],
          ["PROJECTS", "projetos (título, descrição, features, stack, links)"],
        ],
      },
      {
        type: "note",
        tone: "warn",
        text: "Não copie os números e resultados do Warley (anos de experiência, tempo de fechamento etc.). Use só o que for verdade para você. O projeto segue o princípio “nada é inventado”.",
      },
      {
        type: "ul",
        items: [
          "Mantenha `showPhone: false`. O telefone não vai para o HTML. Melhor ainda: deixe o campo vazio no repositório público.",
          "Os logos ficam em `lib/tech-icons.ts`. Para uma tecnologia nova, adicione o SVG em `public/logos/` e registre no mapa.",
        ],
      },
    ],
  },
  {
    id: "passo-3",
    title: "Trocar o currículo",
    blocks: [
      {
        type: "ul",
        items: [
          "Em `lib/resume-content.ts`, edite `SITE_URL` para o seu domínio.",
          "Edite cargo, headline, resumo, skills e projetos.",
          "Troque os arquivos de `public/curriculo/` (PDF e DOCX ATS).",
          "O PDF com design é gerado no clique, a partir de `resume-content.ts`.",
        ],
      },
    ],
  },
  {
    id: "passo-4",
    title: "Ajustar os pontos fixos",
    blocks: [
      {
        type: "p",
        text: "Alguns pontos têm texto ou lógica amarrada ao Warley, fora do `data.ts`. Se você não mexer, o site fica meio seu, meio dele.",
      },
      {
        type: "table",
        head: ["Arquivo", "O que ajustar"],
        rows: [
          ["app/layout.tsx", "`TITLE`, descrição e Open Graph"],
          [
            "components/sections/experience.tsx",
            "array `ORDER` com os ids da timeline. Precisa bater com os ids do seu `TIMELINE`",
          ],
          [
            "components/sections/projects.tsx e project-mockups.tsx",
            "mockups ligados ao título “Servix”. Reescreva ou remova",
          ],
          [
            "components/sections/contact.tsx",
            "link e ícone do estúdio (`AdapticodeIcon`). Remova ou troque",
          ],
          [
            "components/ui/adapticode-icon.tsx",
            "logo do estúdio do Warley. Apague se não usar",
          ],
          [
            "components/sections/local-time.tsx",
            "fuso `TZ` e textos “Anápolis, GO”",
          ],
          ["components/sections/about.tsx", "`accent=\"Warley Coutinho.\"` do título"],
          ["components/sections/id-card.tsx", "textos do crachá e `aria-label`"],
          ["components/sections/hero-video.tsx", "`aria-label` do vídeo"],
          [
            "components/sections/resume.tsx e components/resume/resume-download-buttons.tsx",
            "nomes dos arquivos `Warley_Coutinho_Curriculo...` e `warley-avatar.jpg`",
          ],
          ["components/qr-generator.tsx", "URL padrão do QR code"],
          ["app/curriculo/page.tsx e app/qrcode/page.tsx", "títulos das páginas"],
          ["public/images/servix.png", "imagem do projeto do Warley"],
        ],
      },
      {
        type: "p",
        text: "Para achar o que sobrou:",
      },
      {
        type: "code",
        text: `grep -rniE "warley|coutinho|anápolis|servix|adapticode|rancheiro|unievang" app components lib public --include=*.ts --include=*.tsx --include=*.css`,
      },
    ],
  },
  {
    id: "passo-5",
    title: "Trocar as imagens",
    blocks: [
      {
        type: "table",
        head: ["Arquivo", "Uso"],
        rows: [
          ["public/portrait-bust.webp", "retrato do crachá"],
          ["public/avatar.webp", "avatar do menu"],
          ["public/images/warley-avatar.jpg", "foto no currículo gerado"],
          ["public/og.jpg", "imagem de compartilhamento (1200×630)"],
        ],
      },
    ],
  },
  {
    id: "passo-6",
    title: "Gerar o vídeo do hero",
    blocks: [
      {
        type: "p",
        text: "O hero é um vídeo em loop do personagem, mais uma sequência de 81 frames que assume quando a pessoa rola a página. Sem vídeo ainda? Pule este passo e use uma foto estática por enquanto.",
      },
      {
        type: "ul",
        items: [
          "Foto de partida: use uma foto sua, nítida, de frente, com boa luz. Só use fotos de quem autorizou, ou seja, você mesmo.",
          "Personagem estilizado: em uma ferramenta de imagem por IA que você já use, gere um personagem 3D a partir da foto, com fundo branco liso. O fundo branco importa: o site usa `mix-blend-mode: multiply` no vídeo para o branco sumir no papel da página.",
          "Animação falando: em uma ferramenta de vídeo/avatar por IA, anime o personagem falando uma frase curta de apresentação em português. Enquadre para um corte central em 4:5 (o slot do hero tem proporção 768/960).",
        ],
      },
      {
        type: "p",
        text: "Gere os arquivos. Se a pasta `scripts/` existir no repositório, use o script do projeto:",
      },
      {
        type: "code",
        label: "Com o script do repositório",
        text: `python3 scripts/build-hero-assets.py _inputs/intro.mp4 public/hero --name hero`,
      },
      {
        type: "p",
        text: "Ele recorta o personagem, clareia o fundo, cria o loop sem emenda (crossfade de imagem e áudio) e exporta o vídeo. Sem o script, dá para fazer na mão com ffmpeg (ajuste os comandos ao seu vídeo):",
      },
      {
        type: "code",
        label: "Alternativa manual com ffmpeg",
        text: `mkdir -p public/hero/frames
ffmpeg -i intro.mp4 -frames:v 1 -vf "scale=1280:720" public/hero/poster.webp
ffmpeg -i intro.mp4 -vf "scale=1280:720,fps=12" -c:v libwebp -quality 80 public/hero/frames/frame_%05d.webp
ls public/hero/frames | wc -l   # conte os frames gerados`,
      },
      {
        type: "p",
        text: "O código espera estes arquivos em `public/hero/`:",
      },
      {
        type: "ul",
        items: [
          "`hero.mp4` (o `<source>` do `hero-video.tsx` só referencia MP4)",
          "`poster.webp`",
          "`frames/frame_00001.webp` … `frame_00081.webp` (1280×720)",
        ],
      },
      {
        type: "p",
        text: "Depois, ajuste `components/sections/hero-sequence.ts`:",
      },
      {
        type: "ul",
        items: [
          "`FRAME_COUNT`: o número real de frames.",
          "`SRC_X`, `SRC_Y`, `SRC_W`, `SRC_H`: o recorte 4:5 central do frame 1280×720 (hoje x=352, largura 576, altura 720). Se o seu personagem não estiver no centro, mude `SRC_X`.",
          "`PROFILE.introTranscript`: atualize com exatamente o que o vídeo fala. Ela vira a transcrição para leitores de tela.",
          "Peso: confira o tamanho de `hero.mp4` e dos frames. Em conexão ruim ou modo “economia de dados”, o site cai só para o vídeo.",
        ],
      },
    ],
  },
  {
    id: "passo-7",
    title: "Conferir",
    blocks: [
      {
        type: "code",
        text: `pnpm typecheck
pnpm lint
pnpm build`,
      },
      {
        type: "p",
        text: "Teste também: celular (de 320 px a 430 px), tema claro e escuro, `prefers-reduced-motion`, navegação por teclado e o botão de som do vídeo (navegadores bloqueiam áudio automático, e o código trata isso).",
      },
    ],
  },
  {
    id: "passo-8",
    title: "Publicar",
    blocks: [
      {
        type: "ul",
        items: [
          "Crie o repositório no GitHub (sem `.env` e sem dados pessoais que você não queira expor).",
          "Importe o repositório na Vercel.",
          "Atualize `SITE_URL` para o seu domínio final.",
          "Teste o link no LinkedIn e no Instagram para ver a imagem de compartilhamento (`og.jpg`).",
        ],
      },
    ],
  },
];

export const KIT_LICENSE: string[] = [
  "Código: MIT. Mantenha o arquivo `LICENSE` com o aviso de copyright original.",
  "Vídeo, fotos, textos pessoais e currículo do Warley não estão cobertos pela licença: substitua tudo pelos seus.",
  "Logos: Simple Icons (CC0). Fontes: Inter Tight, Instrument Serif e JetBrains Mono (SIL OFL).",
];

/* Prompt para colar numa IA com acesso a código. Os trechos entre [colchetes]
   são campos para a pessoa preencher e ficam destacados na página. */
export const KIT_PROMPT = `Você é um engenheiro full stack sênior e especialista em UX/UI. Responda em português do Brasil. Todo código em inglês.

OBJETIVO
Adaptar o portfólio open source abaixo para o MEU perfil, mantendo a estrutura, a stack e a qualidade do original.

REPOSITÓRIO BASE
${KIT_REPO_URL}
O código é MIT. Mantenha o arquivo LICENSE. Fotos, vídeo, textos e currículo do autor original NÃO podem ficar no meu site.

MEUS DADOS (use só o que eu escrever aqui, não invente nada)
- Nome completo: [nome]
- Iniciais: [iniciais]
- Cargo/título: [ex.: Designer de Produto | Desenvolvedora Front-end]
- Cidade/estado e fuso horário: [cidade, UF, America/Sao_Paulo]
- E-mail: [e-mail]
- Telefone: [telefone ou "não exibir"]
- LinkedIn: [url]
- GitHub: [url]
- Instagram: [url ou "não tenho"]
- Formação: [curso, instituição, período]
- Disponibilidade: [ex.: aberto a CLT ou PJ]
- Resumo profissional (2 a 4 frases): [texto]
- Frase de destaque: [texto]
- Experiências (empresa, cargo, período, 2 a 3 entregas reais): [lista]
- Resultados com número REAL e verificável: [lista, ou "nenhum ainda"]
- Projetos (nome, descrição, tecnologias, link do site, link do repositório): [lista]
- Tecnologias/ferramentas que uso: [lista]
- Certificações: [lista ou "nenhuma"]

MEU ESTILO
- Cores: [ex.: fundo creme, texto preto, destaque verde #1f7a4d]
- Fontes: [manter as originais / outras]
- Tom do texto: [ex.: direto e profissional / leve e bem-humorado]
- Tema padrão: [claro / escuro / sistema]
- Seções para manter: [Sobre, Stack, Projetos, Experiência, Resultados, Currículo, Contato]
- Seções para remover: [lista ou "nenhuma"]
- Vídeo do hero: [já tenho o vídeo pronto / quero só uma foto estática por enquanto]
- Meu site vai ficar em: [https://meusite.com.br]

TAREFAS
1. Clone o repositório, rode \`pnpm install\` e \`pnpm dev\` e leia o README.
2. Edite \`lib/data.ts\` e \`lib/resume-content.ts\` com os meus dados. Todo o conteúdo vem desses arquivos.
3. Corrija os pontos fixos fora de \`data.ts\`: \`app/layout.tsx\` (título, descrição, Open Graph), \`experience.tsx\` (o array ORDER deve bater com os ids da minha timeline), \`projects.tsx\` e \`project-mockups.tsx\` (remover o mockup do Servix), \`contact.tsx\` e \`adapticode-icon.tsx\` (remover o estúdio do autor), \`local-time.tsx\` (meu fuso e cidade), \`about.tsx\`, \`id-card.tsx\`, \`hero-video.tsx\` (aria-labels), nomes dos arquivos de currículo, \`qr-generator.tsx\` e títulos das páginas /curriculo e /qrcode.
4. Aplique o meu estilo nos tokens de design em \`app/globals.css\`.
5. Mídia: não use as imagens, o vídeo nem o currículo do autor original. Se eu não tiver vídeo, remova o vídeo e a sequência de frames e deixe o hero funcionando com uma imagem estática. Se eu tiver, me diga exatamente onde colocar \`hero.mp4\`, \`poster.webp\` e os frames em \`public/hero/\` e o que ajustar em \`hero-sequence.ts\` (FRAME_COUNT e o recorte).
6. Mantenha \`showPhone: false\` e não coloque telefone nem dados pessoais desnecessários no repositório.
7. Rode este comando e zere tudo que restar do autor original: \`grep -rniE "warley|coutinho|anápolis|servix|adapticode|rancheiro|unievang" app components lib public\`
8. Rode \`pnpm typecheck\`, \`pnpm lint\` e \`pnpm build\` e corrija os erros.

REGRAS
- Não invente resultados, números, empregos, certificações ou projetos. Se faltar informação, me pergunte.
- Não adicione bibliotecas fora da stack sem me avisar.
- Zero \`any\`, zero \`@ts-ignore\`.
- Mantenha acessibilidade (foco visível, alt, aria-label, reduced motion).
- Não crie nem comite arquivos \`.env\` ou segredos.
- Antes de mexer, me diga em 5 linhas o que vai fazer. Depois, resuma o que mudou e liste o que ficou pendente (imagens, vídeo, currículo) para eu fazer.

ENTREGA
Um checklist final com: o que foi trocado, o que ainda é meu a fazer (fotos, vídeo, currículo) e como publicar na Vercel.`;
