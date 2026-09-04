import Link from "next/link";
import { ArrowRight, QrCode } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

const links = [
  { href: "/#sobre", label: "Sobre" },
  { href: "/#stack", label: "Stack" },
  { href: "/#experiencia", label: "Experiência" },
  { href: "/#projetos", label: "Projetos" },
  { href: "/curriculo", label: "Currículo" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-bg/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-260 items-center justify-between px-6 py-4 sm:px-8">
        <Link
          href="/"
          className="flex items-center gap-2 font-mono-brand text-sm text-text"
        >
          <span className="h-1.75 w-1.75 rounded-full bg-amber" />
          Warley Coutinho
        </Link>
        <nav className="hidden gap-7 text-sm text-text-dim sm:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-text"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link
            href="/qrcode"
            aria-label="Gerador de QR code"
            title="Gerador de QR code"
            className="inline-flex size-8 items-center justify-center rounded-sm border border-border text-text-dim transition-colors hover:border-amber hover:text-amber"
          >
            <QrCode className="size-3.5" />
          </Link>
          <Link
            href="/#contato"
            className="inline-flex items-center gap-1.5 rounded-sm border border-border px-3.5 py-2 font-mono-brand text-[13px] text-text transition-colors hover:border-amber hover:text-amber"
          >
            Contato <ArrowRight className="size-3.5" />
          </Link>
        </div>
      </div>
    </header>
  );
}
