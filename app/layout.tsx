import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import localFont from "next/font/local";

import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono-brand",
  weight: ["400", "500"],
});

const interTight = localFont({ src: "./fonts/InterTight-Variable.woff", variable: "--font-tv-sans", weight: "100 900", display: "swap" });
const instrumentSerif = localFont({ src: "./fonts/InstrumentSerif-Italic.woff", variable: "--font-tv-serif", weight: "400", style: "italic", display: "swap" });
const tvMono = localFont({ src: "./fonts/JetBrainsMono-Variable.woff", variable: "--font-tv-mono", weight: "100 800", display: "swap" });

export const metadata: Metadata = {
  title: "Warley Coutinho — Engenheiro de Software Full Stack",
  description:
    "Engenheiro de Software Full Stack com 5+ anos de experiência em TypeScript, Node.js, Next.js e Fastify. Do chão de fábrica a SaaS próprio e sistemas de Indústria 4.0.",
  metadataBase: new URL("https://warley-portfolio.vercel.app"),
  openGraph: {
    title: "Warley Coutinho — Engenheiro de Software Full Stack",
    description:
      "Engenheiro de Software Full Stack com 5+ anos de experiência em TypeScript, Node.js, Next.js e Fastify.",
    images: [{ url: "/og.jpg", width: 1200, height: 630 }],
    locale: "pt_BR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="pt-BR"
      data-scroll-behavior="smooth"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} ${interTight.variable} ${instrumentSerif.variable} ${tvMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Aplica o tema salvo antes do primeiro paint, evitando flash dark->light */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("theme");if(t==="light"||(!t&&window.matchMedia("(prefers-color-scheme: light)").matches)){document.documentElement.classList.add("light");}}catch(e){}})();`,
          }}
        />
      </head>
      <body className="antialiased font-body" suppressHydrationWarning>{children}</body>
    </html>
  );
}
