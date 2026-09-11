import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter, BlueprintBackground } from "@/components/site-footer";
import { ResumeDownloadButtons } from "@/components/resume/resume-download-buttons";

export const metadata: Metadata = {
  title: "Currículo — Warley Coutinho",
  description:
    "Baixe o currículo de Warley Coutinho em PDF, sempre atualizado com as informações mais recentes do portfólio.",
};

export default function CurriculoPage() {
  return (
    <>
      <BlueprintBackground />
      <SiteHeader />
      <main className="relative z-10 mx-auto max-w-[1040px] px-6 sm:px-8">
        <section className="mx-auto max-w-[560px] px-0 py-28">
          <div className="mb-2 font-mono-brand text-[13px] text-amber">
            // currículo
          </div>
          <h1 className="mb-3 font-display text-[28px] font-semibold">
            Baixe o currículo em PDF
          </h1>
          <p className="mb-6 text-[15px] text-text-dim">
            O PDF é montado na hora do download, com as informações mais recentes do
            portfólio e um QR code que leva direto pra este site — sempre atualizado, sem
            versão desatualizada rodando por aí.
          </p>
          <p className="mb-10 text-[13px] text-text-faint">
            Escuro/claro: layout com design, pra enviar direto a uma pessoa ou anexar
            no LinkedIn. ATS: coluna única, sem foto e sem elementos gráficos — use essa
            versão em formulários de candidatura e sistemas de recrutamento automatizados.
          </p>
          <ResumeDownloadButtons />
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
