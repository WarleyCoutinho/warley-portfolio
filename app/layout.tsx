import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";

import { MotionProvider } from "@/components/ui/motion-provider";
import { SITE_URL } from "@/lib/data";

import "./globals.css";

const interTight = localFont({
  src: "./fonts/inter-tight-latin-wght-normal.woff2",
  variable: "--font-inter-tight",
  weight: "100 900",
  display: "swap",
});

const instrumentSerif = localFont({
  src: [
    {
      path: "./fonts/instrument-serif-latin-400-normal.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/instrument-serif-latin-400-italic.woff2",
      weight: "400",
      style: "italic",
    },
  ],
  variable: "--font-instrument-serif",
  display: "swap",
});

const jetbrainsMono = localFont({
  src: "./fonts/jetbrains-mono-latin-wght-normal.woff2",
  variable: "--font-jetbrains-mono",
  weight: "100 800",
  display: "swap",
});

const THEME_SCRIPT = `(function(){try{var t=localStorage.getItem("theme");var d=t==="dark"||(t!=="light"&&window.matchMedia("(prefers-color-scheme: dark)").matches);if(d)document.documentElement.classList.add("dark")}catch(e){}})()`;

const TITLE = "Warley Coutinho — Engenheiro de Software Full Stack";

export const metadata: Metadata = {
  title: TITLE,
  description:
    "Engenheiro de Software Full Stack com 5+ anos de experiência em TypeScript, Node.js, Next.js e Fastify. Do chão de fábrica a SaaS próprio e sistemas de Indústria 4.0.",
  metadataBase: new URL(SITE_URL),
  openGraph: {
    title: TITLE,
    description:
      "Engenheiro de Software Full Stack com 5+ anos de experiência em TypeScript, Node.js, Next.js e Fastify.",
    locale: "pt_BR",
    type: "website",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: TITLE }],
  },
  twitter: { card: "summary_large_image", images: ["/og.jpg"] },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f4f2ee" },
    { media: "(prefers-color-scheme: dark)", color: "#0e1116" },
  ],
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="pt-BR"
      suppressHydrationWarning
      data-scroll-behavior="smooth"
      className={`${interTight.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      </head>
      <body className="antialiased" suppressHydrationWarning>
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
