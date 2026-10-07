<div align="center">

# Warley Coutinho — Portfólio

**Engenheiro de Software Full Stack · um portfólio onde o personagem fala com você.**

[![Next.js](https://img.shields.io/badge/Next.js-16-000?logo=nextdotjs&logoColor=white)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-149eca?logo=react&logoColor=white)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178c6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06b6d4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![License: MIT](https://img.shields.io/badge/c%C3%B3digo-MIT-black)](./LICENSE)

[**Ver o site**](https://warley-portfolio.vercel.app) · [LinkedIn](https://www.linkedin.com/in/coutinhowarley/) · [Instagram](https://www.instagram.com/warlycoutinho/) · [GitHub](https://github.com/WarleyCoutinho)

</div>

---

## Sobre o projeto

Um portfólio pessoal que foge do "cartão de visitas em texto". Um **personagem 3D estilizado**, criado a partir de uma foto e animado com IA, abre o site apresentando-se em um **vídeo em loop contínuo**. Dali, cada seção tem um componente próprio e uma animação própria, mas a página se lê como uma superfície única, calma e leve.

Todo o conteúdo (experiência, projetos, stack, resultados e currículo) vem de **uma única fonte tipada**, `lib/data.ts`. Para adaptar o site para você, o caminho principal é editar esse arquivo.

> Princípio de conteúdo: nada é inventado. Cada nome, número, data e link vem dos dados reais do currículo.

## Destaques

| Seção             | O que tem de especial                                                                                               |
| ----------------- | ------------------------------------------------------------------------------------------------------------------- |
| **Hero**          | Vídeo em loop sem emenda (WebM + MP4), fundo fundido com a página, botão de som e transcrição para leitores de tela |
| **Sobre**         | Crachá pendurado por fita, com física de pêndulo e giro 3D por mouse, toque ou teclado                              |
| **Stack**         | "Tabela periódica" filtrável por família, com inspetor que mostra o logo e os projetos que usam a tecnologia        |
| **Projetos**      | Galeria-acordeão com UI ilustrativa de cada produto                                                                 |
| **Certificações** | Lista com preenchimento de tinta no hover                                                                           |
| **Experiência**   | Linha do tempo cuja espinha se desenha com a rolagem                                                                |
| **Resultados**    | Galeria horizontal fixa na tela, com contadores animados                                                            |
| **Currículo**     | Versões ATS (PDF/Word) prontas e versões com design (claro/escuro) geradas no clique                                |
| **Contato**       | E-mail com "Copiar", links e cartão de horário local com diferença de fuso do visitante                             |

Também: **tema claro/escuro** (sistema → claro → escuro, sem flash), link "Pular para o conteúdo", respeito a `prefers-reduced-motion` e menu mobile em tela cheia.

## Abordagem e desenvolvimento

O projeto foi construído em etapas, cada uma com uma decisão deliberada:

1. **Identidade.** Personagem 3D gerado por IA a partir de uma foto e animado em vídeo (apresentação em pt-BR).
2. **Pipeline do vídeo.** Um script em Python (`ffmpeg` + `numpy` + `opencv`) recorta o personagem, clareia o fundo, cria o **loop sem emenda** (crossfade de imagem e de áudio feito amostra a amostra) e exporta WebM e MP4.
3. **Design system.** Papel, tinta e cinzas, com tokens em CSS (Tailwind 4, config CSS-first). Tipografia: Inter Tight, Instrument Serif (uma palavra em itálico por título) e JetBrains Mono.
4. **Conteúdo tipado.** `lib/data.ts` é a única fonte; os componentes só leem dela.
5. **Componentes por seção.** Server Components por padrão; `"use client"` só onde há interação.
6. **Movimento com critério.** `motion` carregado de forma preguiçosa (`LazyMotion`), animações que rodam uma vez e desligam com movimento reduzido.
7. **Acessibilidade e privacidade.** Estrutura semântica, foco visível, alvos de toque de 44 px, sem analytics e sem cookies. O telefone **não** é renderizado no HTML por padrão (`PROFILE.showPhone`).

## Tecnologias

**Aplicação:** Next.js 16 (App Router) · React 19 · TypeScript (strict, sem `any`) · Tailwind CSS 4 · motion · Radix UI (Dialog) · class-variance-authority · lucide-react · Simple Icons

**Currículo e utilitários:** @react-pdf/renderer · qrcode · dayjs · clsx · tailwind-merge

**Pipeline de mídia:** Python 3 · ffmpeg · numpy · opencv

**Ferramentas:** pnpm · ESLint 9 · esbuild · Playwright

## Como rodar

Requisitos: Node.js 22+ e [pnpm](https://pnpm.io).

```bash
git clone https://github.com/WarleyCoutinho/warley-portfolio.git
cd warley-portfolio
pnpm install
pnpm dev          # http://localhost:3338
```

| Comando           | O que faz                              |
| ----------------- | -------------------------------------- |
| `pnpm dev`        | servidor de desenvolvimento            |
| `pnpm lint`       | ESLint                                 |
| `pnpm build`      | build de produção                      |
| `pnpm start`      | serve o build                          |
| `pnpm resume:pdf` | regenera o PDF do currículo com design |

## Quer usar como base? Fique à vontade

Clone, adapte e publique o seu. O caminho mais curto:

1. **Dados:** edite `lib/data.ts` (`PROFILE`, `SKILLS`, `TIMELINE`, `RESULTS`, `PROJECTS`, `CERTIFICATIONS`) e `lib/resume-content.ts` (currículo).
2. **Imagens:** troque `public/portrait-bust.webp`, `public/avatar.webp` e `public/og.jpg` por imagens suas.
3. **Vídeo:** gere o seu com o pipeline abaixo e substitua `public/hero/`.
4. **Texto do vídeo:** atualize `PROFILE.introTranscript` para ficar igual ao áudio.
5. **Metadados:** ajuste `SITE_URL` e o título/descrição em `app/layout.tsx`.
6. **Currículo:** troque os arquivos em `public/curriculo/`.

```bash
python3 scripts/build-hero-assets.py _inputs/intro.mp4 public/hero --name hero
```

O pipeline gera `hero.mp4` (H.264 + AAC) e `hero.webm` (VP9 + Opus) com loop sem emenda.

> **Importante:** o código é livre (MIT), mas **fotos, vídeo, textos pessoais e currículo são meus** e não estão cobertos pela licença. Troque-os pelos seus antes de publicar.

## Estrutura

```text
app/                 rotas (/, /curriculo, /qrcode), layout, tokens de design
components/
  sections/          uma pasta de seção = um componente com animação própria
  ui/                primitivos (botão, badge, sheet, reveal, logos)
  resume/            documento do currículo em PDF
lib/
  data.ts            fonte única de conteúdo (tipada)
  resume-content.ts  conteúdo do currículo
  tech-icons.ts      mapa de logos e ícones de conceito
public/              vídeo, imagens, logos e currículos prontos
scripts/             pipeline do vídeo, exportação de logos e currículo
```

## Segurança e privacidade (LGPD)

- Sem analytics, cookies ou rastreadores.
- Nenhuma variável de ambiente exposta ao cliente.
- Telefone fora do HTML por padrão e currículo ATS público sem telefone.
- Dependências auditadas com `pnpm audit`.

## Créditos

- Logos de marcas: [Simple Icons](https://simpleicons.org) (CC0). As marcas pertencem aos seus donos.
- Fontes: Inter Tight, Instrument Serif e JetBrains Mono (SIL OFL), auto-hospedadas.

## Gostou? Apoie com um clique

Se este projeto te ajudou ou inspirou:

- ⭐ **Deixe uma estrela** neste repositório e nos meus projetos: [warley-portfolio](https://github.com/WarleyCoutinho/warley-portfolio), [servix](https://github.com/WarleyCoutinho/servix), [frontend-products](https://github.com/WarleyCoutinho/frontend-products) e [api-products](https://github.com/WarleyCoutinho/api-products).
- 📸 **Siga no Instagram:** [@warlycoutinho](https://www.instagram.com/warlycoutinho/)
- 💼 **Conecte-se no LinkedIn:** [/in/coutinhowarley](https://www.linkedin.com/in/coutinhowarley/)
- 🍴 **Faça um fork**, adapte e me marque quando publicar. Vou adorar ver.

## Licença

Código sob a licença [MIT](./LICENSE). Conteúdo pessoal (imagens, vídeo, textos e currículo) © Warley Coutinho, todos os direitos reservados.

<div align="center">

Feito com Next.js em Anápolis, GO.

</div>
