import { PROFILE } from "@/lib/data";

export function SiteFooter() {
  return (
    <footer className="border-t border-line">
      <div className="container-x flex flex-wrap items-center justify-between gap-x-8 gap-y-3 py-8 font-mono text-[12px] tracking-[0.06em] text-dim">
        <p>
          © {new Date().getFullYear()} {PROFILE.name}
        </p>
        <a href="#inicio" className="inline-flex h-11 items-center underline underline-offset-4 hover:text-ink">
          Voltar ao topo ↑
        </a>
        <p>Feito com Next.js</p>
      </div>
    </footer>
  );
}
