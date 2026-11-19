import type { Metadata } from "next";
import { ArrowDown, ExternalLink } from "lucide-react";

import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import { PromptBlock } from "@/components/kit/prompt-block";
import { RichText } from "@/components/kit/rich-text";
import { StepBlocks } from "@/components/kit/step-blocks";
import { buttonVariants } from "@/components/ui/button";
import { KIT_LICENSE, KIT_PROMPT, KIT_REPO_URL, KIT_STEPS } from "@/lib/kit-content";
import { SITE_URL } from "@/lib/data";
import { cn } from "@/lib/utils";

const TITLE = "Kit do portfólio — passo a passo e prompt de IA";
const DESCRIPTION =
  "Adapte o portfólio open source do Warley para o seu perfil: passo a passo para devs e um prompt pronto para colar na sua IA.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/kit" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    locale: "pt_BR",
    type: "website",
    url: `${SITE_URL}/kit`,
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: TITLE }],
  },
  twitter: { card: "summary_large_image", images: ["/og.jpg"] },
};

export default function KitPage() {
  return (
    <>
      <SiteNav />
      <main id="inicio" className="container-x pt-18">
        <div className="mx-auto max-w-190 py-16 sm:py-24">
          {/* Cabeçalho */}
          <header>
            <p className="mb-5 font-mono text-[12px] tracking-[0.14em] text-dim uppercase">
              08 — Kit grátis
            </p>
            <h1 className="h-display text-[clamp(2.4rem,8vw,4.6rem)]">
              Faça o seu <span className="accent">portfólio.</span>
            </h1>
            <p className="mt-6 max-w-[56ch] text-[17px] leading-relaxed text-ink-2">
              O código do meu portfólio é aberto (MIT). Aqui está o passo a
              passo para adaptar ao seu perfil e um prompt pronto para colar na
              sua IA. Dev ou não dev.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#prompt" className={cn(buttonVariants({ size: "lg" }))}>
                Quero o prompt
                <ArrowDown aria-hidden="true" />
              </a>
              <a
                href="#passo-a-passo"
                className={cn(buttonVariants({ size: "lg", variant: "outline" }))}
              >
                Sou dev: passo a passo
              </a>
              <a
                href={KIT_REPO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(buttonVariants({ size: "lg", variant: "ghost" }))}
              >
                Repositório no GitHub
                <ExternalLink aria-hidden="true" />
              </a>
            </div>
          </header>

          {/* Regras do jogo */}
          <section
            aria-labelledby="regras"
            className="mt-14 rounded-3xl border border-line bg-card p-6 sm:p-8"
          >
            <h2
              id="regras"
              className="font-mono text-[12px] tracking-[0.14em] text-dim uppercase"
            >
              Regras do jogo
            </h2>
            <ul className="mt-4 flex list-decimal flex-col gap-2.5 pl-5 text-[15px] leading-relaxed text-ink-2 marker:font-mono marker:text-dim">
              <li>O código é MIT: pode usar e adaptar.</li>
              <li>
                Vídeo, fotos, textos e currículo são meus. Troque pelos seus
                antes de publicar.
              </li>
              <li>
                Se curtir, deixe uma ⭐ no repositório e me marque quando
                publicar o seu!
              </li>
            </ul>
          </section>

          {/* Prompt */}
          <section
            id="prompt"
            aria-labelledby="prompt-titulo"
            className="mt-20 scroll-mt-24"
          >
            <p className="mb-4 font-mono text-[12px] tracking-[0.14em] text-dim uppercase">
              Opção 1 — Para quem não programa (ou quer atalho)
            </p>
            <h2
              id="prompt-titulo"
              className="h-display text-[clamp(1.9rem,5vw,3rem)]"
            >
              Prompt para colar na <span className="accent">sua IA.</span>
            </h2>

            <ol className="mt-6 flex list-decimal flex-col gap-2.5 pl-5 text-[15px] leading-relaxed text-ink-2 marker:font-mono marker:text-dim">
              <li>Toque em “Copiar prompt”.</li>
              <li>
                Cole numa IA com acesso a código (Claude Code, Cursor, Codex ou
                similar).
              </li>
              <li>
                <strong className="font-semibold text-ink">
                  Antes de enviar, preencha os campos entre [colchetes]
                </strong>{" "}
                com os seus dados. Eles estão destacados no texto. Cada
                colchete é uma informação sua: nome, cargo, links, projetos,
                estilo e assim por diante.
              </li>
              <li>
                Não deixe nenhum colchete sem resposta. Se faltar informação, a
                IA vai perguntar, e não inventar.
              </li>
            </ol>

            <div className="mt-8">
              <PromptBlock text={KIT_PROMPT} />
            </div>
          </section>

          {/* Passo a passo */}
          <section
            id="passo-a-passo"
            aria-labelledby="passo-a-passo-titulo"
            className="mt-24 scroll-mt-24"
          >
            <p className="mb-4 font-mono text-[12px] tracking-[0.14em] text-dim uppercase">
              Opção 2 — Para devs
            </p>
            <h2
              id="passo-a-passo-titulo"
              className="h-display text-[clamp(1.9rem,5vw,3rem)]"
            >
              Passo a passo <span className="accent">manual.</span>
            </h2>
            <p className="mt-5 max-w-[60ch] text-[15px] leading-relaxed text-ink-2">
              O projeto tem uma regra central: todo o conteúdo vem de{" "}
              <RichText text="`lib/data.ts`" /> (e{" "}
              <RichText text="`lib/resume-content.ts`" /> para o currículo).
              Stack: Next.js 16, React 19, TypeScript, Tailwind 4 e motion.
            </p>

            <ol className="mt-10 flex flex-col">
              {KIT_STEPS.map((step, index) => (
                <li
                  key={step.id}
                  id={step.id}
                  className="scroll-mt-24 border-t border-line py-10 first:border-t-0 first:pt-0"
                >
                  <div className="grid gap-4 sm:grid-cols-[4rem_1fr] sm:gap-6">
                    <span
                      aria-hidden="true"
                      className="font-mono text-[13px] text-dim"
                    >
                      {String(index).padStart(2, "0")}
                    </span>
                    <div className="min-w-0">
                      <h3 className="mb-5 text-[22px] font-semibold tracking-tight">
                        <span className="sr-only">Passo {index}: </span>
                        {step.title}
                      </h3>
                      <StepBlocks blocks={step.blocks} />
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          {/* Licença */}
          <section
            aria-labelledby="licenca"
            className="mt-12 border-t border-line pt-10"
          >
            <h2 id="licenca" className="text-[22px] font-semibold tracking-tight">
              Licença e créditos
            </h2>
            <ul className="mt-5 flex list-disc flex-col gap-2.5 pl-5 text-[15px] leading-relaxed text-ink-2 marker:text-faint">
              {KIT_LICENSE.map((item) => (
                <li key={item}>
                  <RichText text={item} />
                </li>
              ))}
            </ul>
          </section>

          {/* Fecho */}
          <section className="mt-16 rounded-3xl bg-ink p-8 text-paper sm:p-10">
            <p className="h-display text-[clamp(1.6rem,4.5vw,2.4rem)]">
              Publicou o seu? <span className="accent text-paper/70!">Me marca.</span>
            </p>
            <p className="mt-3 max-w-[48ch] text-[15px] leading-relaxed text-paper/80">
              Vou adorar ver o resultado. Uma ⭐ no repositório ajuda o projeto
              a chegar em mais gente.
            </p>
            <a
              href={KIT_REPO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex h-12 items-center gap-2 rounded-full bg-paper px-7 text-[15px] font-medium text-ink transition-transform duration-300 hover:-translate-y-0.5"
            >
              Abrir no GitHub
              <ExternalLink aria-hidden="true" className="size-4" />
            </a>
          </section>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
