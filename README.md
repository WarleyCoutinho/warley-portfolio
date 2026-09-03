# Warley Coutinho — Portfólio

Portfólio pessoal em Next.js 16 (App Router) + React 19 + Tailwind CSS v4, com
todo o currículo (sobre, stack, experiência, projetos e contato) e link para
o LinkedIn. Reaproveita o conteúdo do `Profile.pdf` original e apresenta os
projetos `products-frontend` e `api-products` como cases.

## Stack

- Next.js 16 (App Router, Server Components por padrão)
- React 19 + TypeScript (strict, zero `any`)
- Tailwind CSS v4 (config CSS-first em `app/globals.css`)
- `motion` (motion/react) para as animações de entrada e reveal ao rolar
- `lucide-react` para ícones

## Rodando localmente

```bash
pnpm install
pnpm dev
```

Abre em `http://localhost:3000`.

## Estrutura

```
app/
  layout.tsx        # fontes (Space Grotesk, Inter, JetBrains Mono) + metadata SEO
  page.tsx           # compõe as seções da home
  globals.css         # design tokens (@theme) e estilos globais
components/
  hero.tsx, about.tsx, stack.tsx, experience.tsx, projects.tsx, contact.tsx
  site-header.tsx, site-footer.tsx, section-head.tsx, section-reveal.tsx
lib/
  data.ts             # todo o conteúdo do currículo, tipado — edite aqui
  utils.ts            # helper cn()
```

## Editar o conteúdo

Todo o texto (experiência, stack, projetos, contato) vive em `lib/data.ts`.
Não precisa mexer nos componentes pra atualizar uma vaga nova, um projeto novo
ou trocar o e-mail de contato.

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

## Próximos passos sugeridos

- Trocar os links "Solicitar acesso ao repositório" pelas URLs reais do
  GitHub assim que os repositórios `products-frontend` e `api-products`
  estiverem públicos.
- Adicionar uma foto/avatar real na seção "Sobre" (hoje o layout é 100% tipográfico).
- Configurar domínio próprio (ex: `warleycoutinho.dev`) e ajustar `metadataBase` em `app/layout.tsx`.
