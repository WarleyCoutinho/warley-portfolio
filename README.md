# Warley Coutinho — Portfólio "talking-video"

Next.js 16 (App Router) · React 19 · TypeScript strict · Tailwind CSS 4 · `motion` · pnpm.
Visual claro (papel, tinta e cinzas), um vídeo de apresentação em loop no hero e uma seção única por tipo de conteúdo.

## Rodar

```bash
pnpm install
pnpm dev        # http://localhost:3000
pnpm lint && pnpm build
```

## Seções

| # | Seção | Componente | Destaque |
|---|---|---|---|
| — | Hero | `components/sections/hero.tsx` | vídeo em loop (webm + mp4), botão de som, transcrição `sr-only` |
| 01 | Sobre | `about.tsx`, `id-card.tsx` | crachá pendurado (pêndulo, flip por hover/toque/teclado) |
| 02 | Stack | `stack.tsx` | tabela periódica filtrável + inspetor com logo |
| 03 | Projetos | `projects.tsx` | galeria-acordeão com UI ilustrativa |
| 04 | Certificações | `certifications.tsx` | lista com preenchimento de tinta |
| 05 | Experiência | `experience.tsx` | linha do tempo cuja espinha desenha na rolagem |
| 06 | Resultados | `results.tsx` | galeria horizontal fixa; fallback com scroll-snap (mobile / movimento reduzido) |
| 07 | Contato | `contact.tsx` | e-mail com "Copiar", links, selo girando |

Rotas preservadas: `/curriculo` (download dos PDFs/DOCX e gerador) e `/qrcode`.

## Conteúdo

Todo o texto vem de `lib/data.ts` e `lib/resume-content.ts`. Nada é inventado.

- `PROFILE.showPhone` (padrão `false`): o telefone **não** é renderizado no HTML. O currículo ATS público também não traz telefone.
- `PROFILE.introTranscript`: texto falado no vídeo. **Mantenha igual ao áudio.**

## Reconstruir o vídeo do hero

Requer `ffmpeg`, `ffprobe`, `numpy` e `opencv-python`.

```bash
python3 scripts/build-hero-assets.py _inputs/intro.mp4 public/hero --name hero
```

Gera `public/hero/hero.mp4` (H.264 + AAC) e `hero.webm` (VP9 + Opus), com loop sem emenda (crossfade de 0,5 s em imagem e áudio).

## Currículo

`pnpm resume:pdf` regenera o PDF com design. Os arquivos ATS ficam em `public/curriculo/`.

## Créditos e licenças

Logos de marcas: [Simple Icons](https://simpleicons.org) (CC0), copiados para `public/logos/`. As marcas pertencem aos respectivos donos.
Fontes (auto-hospedadas): Inter Tight, Instrument Serif e JetBrains Mono (SIL OFL).

## Segurança e LGPD

Sem analytics, cookies ou trackers. Nenhuma variável de ambiente no cliente. `pnpm audit --prod` sem vulnerabilidades conhecidas.
