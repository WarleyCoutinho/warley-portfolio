import { pdf } from "@react-pdf/renderer";
import QRCode from "qrcode";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { ResumeDocument } from "../components/resume/resume-document";
import { ResumeDocumentATS } from "../components/resume/resume-document-ats";
import { SITE_URL } from "../lib/resume-content";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function main() {
  const outDir = path.resolve(__dirname, "../out");
  fs.mkdirSync(outDir, { recursive: true });

  const photoPath = path.resolve(__dirname, "../public/images/warley-avatar.jpg");
  const photoBuffer = fs.readFileSync(photoPath);
  const photoDataUrl = `data:image/jpeg;base64,${photoBuffer.toString("base64")}`;

  for (const variant of ["dark", "light"] as const) {
    const qrDataUrl = await QRCode.toDataURL(SITE_URL, {
      width: 512,
      margin: 1,
      errorCorrectionLevel: "H",
      color: {
        dark: variant === "dark" ? "#ece9e2" : "#14171c",
        light: "#00000000",
      },
    });

    const blob = await pdf(
      ResumeDocument({ theme: variant, qrDataUrl, photoDataUrl })
    ).toBuffer();

    const chunks: Buffer[] = [];
    for await (const chunk of blob) {
      chunks.push(chunk as Buffer);
    }
    const buffer = Buffer.concat(chunks);
    const outPath = path.join(
      outDir,
      `Warley_Coutinho_Curriculo${variant === "light" ? "_Light" : ""}.pdf`
    );
    fs.writeFileSync(outPath, buffer);
    console.log("wrote", outPath, buffer.length, "bytes");
  }

  // Versão ATS: sem foto, sem QR, coluna única.
  const atsBlob = await pdf(ResumeDocumentATS()).toBuffer();
  const atsChunks: Buffer[] = [];
  for await (const chunk of atsBlob) {
    atsChunks.push(chunk as Buffer);
  }
  const atsBuffer = Buffer.concat(atsChunks);
  const atsPath = path.join(outDir, "Warley_Coutinho_Curriculo_ATS.pdf");
  fs.writeFileSync(atsPath, atsBuffer);
  console.log("wrote", atsPath, atsBuffer.length, "bytes");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
