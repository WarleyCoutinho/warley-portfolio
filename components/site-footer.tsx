export function SiteFooter() {
  return (
    <footer className="border-t border-border py-8 text-center font-mono-brand text-xs text-text-faint">
      © {new Date().getFullYear()} Warley Coutinho — construído com Next.js, Fastify e café.
    </footer>
  );
}

export function BlueprintBackground() {
  return <div className="bg-blueprint pointer-events-none fixed inset-0 z-0 opacity-35" />;
}
