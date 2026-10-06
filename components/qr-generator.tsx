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
    <section className="mx-auto max-w-140 py-28">
      <div className="mb-2 font-mono text-[13px] text-dim">
        {"// ferramenta interna"}
      </div>
      <h1 className="mb-3 font-sans text-[28px] font-semibold">
        Gerador de QR code
      </h1>
      <p className="mb-10 text-[15px] text-dim">
        Aponte para o domínio em produção do portfólio. Depois de gerar, baixe o
        PNG e use nos currículos (light e dark) — quem escanear cai direto no
        site, sempre com a versão mais recente.
      </p>

      <label className="mb-2 block font-mono text-[12px] text-dim">
        URL de destino
      </label>
      <div className="mb-8 flex gap-2.5">
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://warley-portfolio.vercel.app"
          className="min-w-0 flex-1 rounded-xl border border-line-strong bg-card px-3.5 py-2.5 font-mono text-[13px] text-ink outline-none focus:border-ink"
        />
        <button
          onClick={() => setUrl(DEFAULT_URL)}
          title="Restaurar domínio padrão"
          className="inline-flex items-center justify-center rounded-xl border border-line-strong px-3 text-dim transition-colors hover:border-ink hover:text-ink"
        >
          <RefreshCw className="size-4" />
        </button>
      </div>

      {error ? (
        <p className="mb-6 font-mono text-[12px] text-ink font-medium">{error}</p>
      ) : null}

      <div className="flex flex-col items-center gap-6 rounded-lg border border-line-strong bg-card p-8">
        <canvas
          ref={canvasRef}
          className="h-55! w-55! rounded-md sm:h-70! sm:w-70!"
        />
        <button
          onClick={handleDownload}
          className="inline-flex items-center gap-2 rounded-xl bg-ink px-5 py-3 font-mono text-[13px] font-medium text-paper transition-colors hover:bg-ink-2"
        >
          <Download className="size-3.5" />
          Baixar PNG (1024px)
        </button>
      </div>
    </section>
  );
}
