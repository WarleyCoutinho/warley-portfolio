import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";

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

export const metadata: Metadata = {
  title: "Warley Coutinho — Desenvolvedor Full Stack",
  description:
    "Desenvolvedor Full Stack especializado em Next.js, Fastify e TypeScript. Do chão de fábrica ao desenvolvimento de sistemas web e mobile.",
  metadataBase: new URL("https://warleycoutinho.dev"),
  openGraph: {
    title: "Warley Coutinho — Desenvolvedor Full Stack",
    description:
      "Desenvolvedor Full Stack especializado em Next.js, Fastify e TypeScript.",
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
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        {/* Aplica o tema salvo antes do primeiro paint, evitando flash dark->light */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("theme");if(t==="light"||(!t&&window.matchMedia("(prefers-color-scheme: light)").matches)){document.documentElement.classList.add("light");}}catch(e){}})();`,
          }}
        />
      </head>
      <body className="antialiased font-body">{children}</body>
    </html>
  );
}
