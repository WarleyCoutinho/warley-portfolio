# warley-portfolio

Portfólio pessoal de [Warley Coutinho](https://warleycoutinho.dev) — Desenvolvedor Full Stack (Next.js · Fastify · TypeScript).

Este repositório não é só uma vitrine estática: é também um espaço onde eu testo, na prática, os padrões do App Router do Next.js que uso no dia a dia — Server Components por padrão, uma única fonte de dados tipada pro conteúdo, geração de PDF no client e um design system minimalista todo em CSS-first (Tailwind v4).

**[warleycoutinho.dev →](https://warleycoutinho.dev)**

## Por que esse projeto existe

Depois de migrar de manufatura/logística pra desenvolvimento de software, decidi que meu portfólio não seria só uma página "sobre mim" — seria a prova viva do meu trabalho. Cada seção resolve um problema real de quem tá procurando vaga ou cliente:

- **Conteúdo fácil de manter** — toda experiência, stack e projeto vive em um único arquivo tipado (`lib/data.ts`). Atualizar uma vaga nova não exige tocar em nenhum componente.
- **Currículo sempre atualizado** — em vez de manter um PDF solto desatualizado no Google Drive, o currículo é **gerado no navegador, na hora do download**, com os mesmos dados que alimentam o site. Editar `lib/data.ts` já reflete no próximo PDF baixado.
- **QR code que nunca aponta pro lugar errado** — uma ferramenta interna (`/qrcode`) gera o QR do domínio de produção, pra colar no currículo impresso sem depender de um link estático que pode ficar obsoleto.
- **Tema claro/escuro de verdade** — porque nem toda impressora e nem todo recrutador lê bem em fundo escuro.

## Stack e por quê

| Tecnologia | Por quê |
|---|---|
| **Next.js 16 (App Router)** | Server Components por padrão — só uso `"use client"` onde há de fato interatividade (toggle de tema, animações, geração de PDF). Roteamento por pasta deixa cada página (`/`, `/curriculo`, `/qrcode`) isolada e simples de entender. |
| **React 19 + TypeScript estrito** | Zero `any`. O conteúdo do site (`lib/data.ts`) é tipado, então um erro de digitação num campo vira erro de compilação, não bug em produção. |
| **Tailwind CSS v4 (CSS-first)** | Os design tokens (`--color-bg`, `--color-amber`, etc.) vivem em `@theme`, dentro do próprio `globals.css` — sem `tailwind.config.js`. O tema claro é só uma sobrescrita dessas mesmas variáveis dentro de uma classe `.light`, então nenhum componente precisou saber que "tema" existe. |
| **`@react-pdf/renderer`** | Gera o PDF do currículo inteiramente no navegador, sem servidor, sem headless browser, sem Puppeteer. Funciona em qualquer hospedagem estática. |
| **`qrcode`** | Mesma lógica: QR code gerado 100% client-side, sem depender de nenhuma API externa. |
| **`motion` (Framer Motion)** | Só nas transições de entrada e no *reveal* ao rolar — nada de animação por animação. |

## Funcionalidades

### 🎨 Tema claro/escuro
Botão no header alterna a classe `.light` na `<html>`, com a preferência salva em `localStorage`. Um script inline no `<head>` aplica o tema salvo **antes do primeiro paint**, evitando o flash de tela escura → clara no carregamento.

### 📄 Currículo em PDF, sempre atualizado
A rota `/curriculo` tem dois botões — tema escuro e tema claro. Cada clique:
1. Busca a foto de perfil e gera um QR code (apontando pro domínio de produção) como imagens base64
2. Monta o documento PDF com `@react-pdf/renderer`, usando **os mesmos dados do site** (`lib/data.ts`)
3. Dispara o download — tudo no navegador, sem round-trip pro servidor

Resultado: não existe "currículo desatualizado". O PDF de hoje reflete a stack, a experiência e os projetos de hoje.

### 🔗 Gerador de QR code
Ferramenta interna em `/qrcode` (sem link no menu — só pra uso próprio) que gera o QR do domínio em produção e permite baixar em PNG de alta resolução, pra colar no currículo impresso.

## Estrutura

```
app/
  layout.tsx          # fontes (Space Grotesk, Inter, JetBrains Mono), metadata SEO, script anti-flash do tema
  page.tsx             # compõe as seções da home
  globals.css          # design tokens (@theme) + tema claro (.light) — CSS-first, sem config file
  curriculo/page.tsx   # download do currículo em PDF
  qrcode/page.tsx      # gerador de QR code (uso interno)
components/
  hero.tsx, about.tsx, stack.tsx, experience.tsx, projects.tsx, contact.tsx
  site-header.tsx, site-footer.tsx, theme-toggle.tsx, qr-generator.tsx
  resume/
    resume-document.tsx         # definição do PDF (dark + light) em @react-pdf/renderer
    resume-download-buttons.tsx # geração + download no client
lib/
  data.ts              # TODO o conteúdo do currículo/site, tipado — edite aqui
  resume-content.ts    # dados exclusivos do PDF (stats, formação, certificações)
  utils.ts             # helper cn()
```

## Editar o conteúdo

Experiência, stack técnica, projetos, dados de contato — tudo vive em `lib/data.ts`. Não precisa tocar em nenhum componente pra:
- adicionar uma vaga nova
- trocar uma tecnologia da stack
- atualizar o e-mail ou link do LinkedIn/GitHub

O currículo em PDF (`/curriculo`) lê exatamente os mesmos campos, então qualquer edição aqui já aparece no próximo download.

## Rodando localmente

```bash
pnpm install
pnpm dev
```

Abre em `http://localhost:3000`.

> Se aparecer `ERR_PNPM_IGNORED_BUILDS`, rode `pnpm approve-builds` e confirme — o repositório já vem com `pnpm-workspace.yaml` configurado pra aprovar automaticamente o build do `unrs-resolver`.

## Deploy

Pronto pra Vercel:

```bash
vercel deploy
```

Ou build manual:

```bash
pnpm build
pnpm start
```

## Roadmap

- [ ] Testes automatizados pra geração do PDF (hoje validado manualmente)
- [ ] Internacionalização (versão em inglês do site e do currículo)
- [ ] Domínio próprio da Adapti Code linkado como case de projeto

## Licença

Código aberto pra quem quiser estudar os padrões usados aqui (App Router, geração de PDF client-side, design tokens CSS-first). Conteúdo pessoal (textos, fotos, currículo) é meu — não reutilize sem permissão.

---

Feito por [Warley Coutinho](https://warleycoutinho.dev) · [LinkedIn](https://www.linkedin.com/in/coutinho-warley/) · [GitHub](https://github.com/WarleyCoutinho)
