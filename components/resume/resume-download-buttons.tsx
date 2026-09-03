"use client";

import { useState } from "react";
import { pdf } from "@react-pdf/renderer";
import QRCode from "qrcode";
import { Download, Loader2 } from "lucide-react";
import { ResumeDocument } from "./resume-document";
import { SITE_URL } from "@/lib/resume-content";

async function fetchAsDataUrl(path: string): Promise<string> {
  const res = await fetch(path);
  const blob = await res.blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

type Variant = "dark" | "light";

export function ResumeDownloadButtons() {
  const [loading, setLoading] = useState<Variant | null>(null);

  async function handleDownload(variant: Variant) {
    setLoading(variant);
    try {
      const [qrDataUrl, photoDataUrl] = await Promise.all([
        QRCode.toDataURL(SITE_URL, {
          width: 512,
          margin: 1,
          errorCorrectionLevel: "H",
          color: {
            dark: variant === "dark" ? "#ece9e2" : "#14171c",
            light: "#00000000",
          },
        }),
        fetchAsDataUrl("/images/warley-avatar.jpg"),
      ]);

      const blob = await pdf(
        <ResumeDocument theme={variant} qrDataUrl={qrDataUrl} photoDataUrl={photoDataUrl} />
      ).toBlob();

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `Warley_Coutinho_Curriculo${variant === "light" ? "_Light" : ""}.pdf`;
      link.click();
      URL.revokeObjectURL(url);
    } finally {
      setLoading(null);
    }
  }

  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <button
        onClick={() => handleDownload("dark")}
        disabled={loading !== null}
        className="inline-flex flex-1 items-center justify-center gap-2 rounded-sm bg-amber px-5 py-3.5 font-mono-brand text-[13px] font-medium text-[#1a1206] transition-colors hover:bg-[#f0a13c] disabled:opacity-60"
      >
        {loading === "dark" ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          <Download className="size-4" />
        )}
        Currículo — tema escuro
      </button>
      <button
        onClick={() => handleDownload("light")}
        disabled={loading !== null}
        className="inline-flex flex-1 items-center justify-center gap-2 rounded-sm border border-border px-5 py-3.5 font-mono-brand text-[13px] text-text transition-colors hover:border-amber hover:text-amber disabled:opacity-60"
      >
        {loading === "light" ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          <Download className="size-4" />
        )}
        Currículo — tema claro
      </button>
    </div>
  );
}
