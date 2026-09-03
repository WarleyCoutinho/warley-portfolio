import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter, BlueprintBackground } from "@/components/site-footer";
import { QrGenerator } from "@/components/qr-generator";

export const metadata: Metadata = {
  title: "Gerador de QR code — Warley Coutinho",
  robots: { index: false, follow: false },
};

export default function QrCodePage() {
  return (
    <>
      <BlueprintBackground />
      <SiteHeader />
      <main className="relative z-10 mx-auto max-w-[1040px] px-6 sm:px-8">
        <QrGenerator />
      </main>
      <SiteFooter />
    </>
  );
}
