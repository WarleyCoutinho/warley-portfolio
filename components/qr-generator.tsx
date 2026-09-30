"use client";

import { useEffect, useRef, useState } from "react";
import QRCode from "qrcode";
import { Download, RefreshCw } from "lucide-react";

const DEFAULT_URL = "https://warley-portfolio.vercel.app";

export function QrGenerator() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [url, setUrl] = useState(DEFAULT_URL);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !url) return;

    QRCode.toCanvas(canvas, url, {
      width: 1024,
      margin: 2,
      color: {
        dark: "#12151a",
        light: "#ffffff",
      },
      errorCorrectionLevel: "H",
    })
      .then(() => setError(null))
      .catch(() => setError("Não foi possível gerar o QR code para essa URL."));
  }, [url]);

  function handleDownload() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = "warley-coutinho-qrcode.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  }

  return (
    <section className="mx-auto max-w-140 px-6 py-28 sm:px-8">
      <div className="mb-2 font-mono-brand text-[13px] text-amber">
        // ferramenta interna
      </div>
      <h1 className="mb-3 font-display text-[28px] font-semibold">
        Gerador de QR code
      </h1>
      <p className="mb-10 text-[15px] text-text-dim">
        Aponte para o domínio em produção do portfólio. Depois de gerar, baixe o
        PNG e use nos currículos (light e dark) — quem escanear cai direto no
        site, sempre com a versão mais recente.
      </p>

      <label className="mb-2 block font-mono-brand text-[12px] text-text-faint">
        URL de destino
      </label>
      <div className="mb-8 flex gap-2.5">
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://warley-portfolio.vercel.app"
          className="flex-1 rounded-sm border border-border bg-bg-raised px-3.5 py-2.5 font-mono-brand text-[13px] text-text outline-none focus:border-amber"
        />
        <button
          onClick={() => setUrl(DEFAULT_URL)}
          title="Restaurar domínio padrão"
          className="inline-flex items-center justify-center rounded-sm border border-border px-3 text-text-dim transition-colors hover:border-amber hover:text-amber"
        >
          <RefreshCw className="size-4" />
        </button>
      </div>

      {error ? (
        <p className="mb-6 font-mono-brand text-[12px] text-red-400">{error}</p>
      ) : null}

      <div className="flex flex-col items-center gap-6 rounded-lg border border-border bg-bg-raised p-8">
        <canvas
          ref={canvasRef}
          className="h-55 w-55 rounded-md sm:h-70 sm:w-70"
        />
        <button
          onClick={handleDownload}
          className="inline-flex items-center gap-2 rounded-sm bg-amber px-5 py-3 font-mono-brand text-[13px] font-medium text-[#1a1206] transition-colors hover:bg-[#f0a13c]"
        >
          <Download className="size-3.5" />
          Baixar PNG (1024px)
        </button>
      </div>
    </section>
  );
}
