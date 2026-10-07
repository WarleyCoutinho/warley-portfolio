"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";

import { BrandIcon } from "@/components/ui/brand-icon";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { SITE_URL } from "@/lib/resume-content";

type Variant = "dark" | "light";
type Busy = Variant | "pdf" | "docx";

const ATS = [
  { key: "pdf", href: "/curriculo/Warley_Coutinho_Curriculo_ATS.pdf", file: "Warley_Coutinho_Curriculo_ATS.pdf", label: "Versão ATS — PDF" },
  { key: "docx", href: "/curriculo/Warley_Coutinho_Curriculo_ATS.docx", file: "Warley_Coutinho_Curriculo_ATS.docx", label: "Versão ATS — Word (.docx)" },
] as const;

async function toDataUrl(path: string): Promise<string> {
  const blob = await (await fetch(path)).blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(blob);
  });
}

function save(blob: Blob, name: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  a.click();
  URL.revokeObjectURL(url);
}

export function ResumeSection() {
  const [busy, setBusy] = useState<Busy | null>(null);
  const [failed, setFailed] = useState(false);

  async function generate(variant: Variant) {
    setBusy(variant);
    setFailed(false);
    try {
      // bibliotecas pesadas só carregam no clique: a primeira carga do site fica leve
      const [{ pdf }, qr, { ResumeDocument }, photo] = await Promise.all([
        import("@react-pdf/renderer"),
        import("qrcode"),
        import("@/components/resume/resume-document"),
        toDataUrl("/images/warley-avatar.jpg"),
      ]);
      const qrDataUrl = await qr.default.toDataURL(SITE_URL, {
        width: 512,
        margin: 1,
        errorCorrectionLevel: "H",
        color: { dark: variant === "dark" ? "#ece9e2" : "#14171c", light: "#00000000" },
      });
      const blob = await pdf(<ResumeDocument theme={variant} qrDataUrl={qrDataUrl} photoDataUrl={photo} />).toBlob();
      save(blob, `Warley_Coutinho_Curriculo${variant === "dark" ? "" : "_Light"}.pdf`);
    } catch {
      setFailed(true);
    } finally {
      setBusy(null);
    }
  }

  async function fetchAts(file: (typeof ATS)[number]) {
    setBusy(file.key);
    setFailed(false);
    try {
      const res = await fetch(file.href);
      if (!res.ok) throw new Error(String(res.status));
      save(await res.blob(), file.file);
    } catch {
      setFailed(true);
    } finally {
      setBusy(null);
    }
  }

  const icon = (b: Busy) =>
    busy === b ? <Loader2 className="size-[18px] animate-spin" aria-hidden="true" /> : <BrandIcon name="download" />;

  return (
    <section id="curriculo" aria-labelledby="curriculo-title" className="section-y">
      <div className="container-x">
        <SectionHeading index="07" label="Currículo" accent="currículo." id="curriculo-title">
          Baixe o
        </SectionHeading>
        <Reveal className="mt-8">
          <p className="max-w-2xl text-[17px] leading-relaxed text-ink-2">
            Todas as versões são preparadas na hora do download. As com design (escuro e claro) são montadas com foto e um
            QR code que leva direto para este site; a versão ATS é entregue pronta, em PDF ou Word.
          </p>
          <p className="mt-3 max-w-2xl text-sm text-dim">
            Escuro/claro: com foto, para enviar direto a uma pessoa ou anexar no LinkedIn. ATS: coluna única, sem foto e sem
            elementos gráficos — use em formulários de candidatura e sistemas de recrutamento automatizados.
          </p>
          <div className="mt-10 grid max-w-3xl gap-3 sm:grid-cols-2">
            <Button size="lg" className="h-14" disabled={busy !== null} onClick={() => generate("dark")}>
              {icon("dark")}Currículo — tema escuro
            </Button>
            <Button size="lg" variant="outline" className="h-14" disabled={busy !== null} onClick={() => generate("light")}>
              {icon("light")}Currículo — tema claro
            </Button>
            {ATS.map((file) => (
              <Button key={file.key} size="lg" variant="outline" className="h-14" disabled={busy !== null} onClick={() => fetchAts(file)}>
                {icon(file.key)}
                {file.label}
              </Button>
            ))}
          </div>
          <p role="status" aria-live="polite" className="mt-4 font-mono text-[12px] text-dim">
            {failed ? "Não foi possível gerar o arquivo agora. Tente a versão ATS ou recarregue a página." : ""}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
