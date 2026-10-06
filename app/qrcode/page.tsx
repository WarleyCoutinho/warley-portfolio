import type { Metadata } from "next";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { QrGenerator } from "@/components/qr-generator";

export const metadata: Metadata = {
  title: "Gerador de QR code — Warley Coutinho",
  robots: { index: false, follow: false },
};

export default function QrCodePage() {
  return (
    <>
      <SiteNav />
      <main className="container-x pt-18">
        <QrGenerator />
      </main>
      <SiteFooter />
    </>
  );
}
