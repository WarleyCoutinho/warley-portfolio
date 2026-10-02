import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter, BlueprintBackground } from "@/components/site-footer";
import { ResumeDownloadButtons } from "@/components/resume/resume-download-buttons";

export const metadata: Metadata = {
  title: "Currículo — Warley Coutinho",
  description:
    "Baixe o currículo de Warley Coutinho em PDF (com foto) ou na versão ATS em PDF e Word.",
};

export default function CurriculoPage() {
  return (
    <>
      <BlueprintBackground />
      <SiteHeader />
      <main className="relative z-10 mx-auto max-w-260 px-6 sm:px-8">
        <section className="mx-auto max-w-140 px-0 py-28">
          <div className="mb-2 font-mono-brand text-[13px] text-amber">
            // currículo
          </div>
          <h1 className="mb-3 font-display text-[28px] font-semibold">
            Baixe o currículo
          </h1>
          <p className="mb-6 text-[15px] text-text-dim">
            As versões com design (escuro e claro) são montadas na hora do
            download, com foto e um QR code que leva direto pra este site. A
            versão ATS é um arquivo pronto, em PDF ou Word.
          </p>
          <p className="mb-10 text-[13px] text-text-faint">
            Escuro/claro: com foto, pra enviar direto a uma pessoa ou anexar
            no LinkedIn. ATS: coluna única, sem foto e sem elementos gráficos —
            use essa versão em formulários de candidatura e sistemas de
            recrutamento automatizados.
          </p>
          <ResumeDownloadButtons />
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
