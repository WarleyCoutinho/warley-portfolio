"use client";

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { Download, Globe, Loader2, Moon, Sun } from "lucide-react";
import AdapticodeIcon from "./adapticode-icon";
import { animate, motion, useInView, useMotionValue, useMotionValueEvent, useScroll, useSpring, useTransform } from "motion/react";
import { TechIcon } from "@/lib/tech-icons";
import { SITE_URL } from "@/lib/resume-content";
import { aboutParagraphs, facts, experience, profile, projects, stackGroups } from "@/lib/data";
import { CERTIFICATIONS, INTRO_TRANSCRIPT, NAV, RESULTS, SHOW_PHONE, TIMELINE } from "@/lib/tv-data";

function Ico({ n }: { n: "github" | "linkedin" | "instagram" | "site" | "download" }) {
  const c = "h-[18px] w-[18px] shrink-0";
  if (n === "site") return <Globe aria-hidden className={c} />;
  if (n === "download") return <Download aria-hidden className={c} />;
  if (n === "instagram") return (
    <svg aria-hidden viewBox="0 0 24 24" className={c} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r=".6" fill="currentColor" /></svg>
  );
  return (
    <svg aria-hidden viewBox="0 0 24 24" className={c} fill="currentColor">
      <path d={n === "github"
        ? "M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
        : "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"} />
    </svg>
  );
}

const EASE = [0.16, 1, 0.3, 1] as const;
const reduced = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function Reveal({ children, i = 0, className }: { children: ReactNode; i?: number; className?: string }) {
  return (
    <motion.div className={className} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.9, ease: EASE, delay: i * 0.08 }}>
      {children}
    </motion.div>
  );
}

function Head({ n, tag, children }: { n: string; tag: string; children: ReactNode }) {
  return (
    <Reveal className="mb-12">
      <p className="mono mb-5">{n} — {tag}</p>
      <h2>{children}</h2>
    </Reveal>
  );
}

/* ───────── Theme (same mechanism as before: .light on <html>, key "theme") ───────── */
function ThemeBtn() {
  const [light, setLight] = useState<boolean | null>(null);
  useEffect(() => setLight(document.documentElement.classList.contains("light")), []);
  const toggle = () => {
    const next = !document.documentElement.classList.contains("light");
    document.documentElement.classList.toggle("light", next);
    try { localStorage.setItem("theme", next ? "light" : "dark"); } catch { /* storage unavailable */ }
    setLight(next);
  };
  return (
    <button type="button" onClick={toggle} aria-label={light ? "Ativar tema escuro" : "Ativar tema claro"} title={light ? "Tema escuro" : "Tema claro"} className="btn !w-11 !justify-center !px-0">
      {light === null ? <span className="h-[18px] w-[18px]" /> : light ? <Moon aria-hidden className="h-[18px] w-[18px]" /> : <Sun aria-hidden className="h-[18px] w-[18px]" />}
    </button>
  );
}

/* ───────── Navigation ───────── */
function Nav() {
  const [active, setActive] = useState("sobre");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)), { rootMargin: "-45% 0px -50% 0px" });
    NAV.forEach((n) => { const el = document.getElementById(n.id); if (el) io.observe(el); });
    return () => { window.removeEventListener("scroll", on); io.disconnect(); };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const k = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", k);
    return () => { window.removeEventListener("keydown", k); document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <motion.div aria-hidden style={{ scaleX: scrollYProgress }} className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-[var(--ink)]" />
      <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-[var(--gutter)] py-4">
        <a href="#hero" aria-label="Início" className="flex items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/avatar.webp" alt="" width={44} height={44} data-spin className={`h-11 w-11 rounded-full object-cover transition-all duration-500 hover:rotate-[360deg] ${scrolled ? "ring-[3px] ring-[var(--ink)]" : "ring-[1.5px] ring-[var(--ink)]/40"}`} />
          <span className={`hidden font-semibold transition-opacity sm:block ${scrolled ? "opacity-0" : ""}`}>{profile.name}</span>
        </a>
        <nav aria-label="Principal" className={`relative hidden gap-1 rounded-full p-1 md:flex ${scrolled ? "bg-[color-mix(in_srgb,var(--card)_72%,transparent)] shadow-[inset_0_0_0_1px_var(--line)] backdrop-blur-[12px]" : ""}`}>
          {NAV.map((n) => (
            <a key={n.id} href={`#${n.id}`} className={`relative rounded-full px-4 py-2 text-sm font-medium ${active === n.id ? "text-[var(--on-ink)]" : ""}`}>
              {active === n.id && <motion.span layoutId="pill" className="absolute inset-0 -z-0 rounded-full bg-[var(--ink)]" transition={{ duration: 0.5, ease: EASE }} />}
              <span className="relative">{n.label}</span>
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <ThemeBtn />
          <div className="md:hidden"><button type="button" className="btn pri" aria-expanded={open} onClick={() => setOpen(true)}>Menu</button></div>
        </div>
      </header>
      <motion.div initial={false} animate={{ clipPath: open ? "circle(150% at 90% 5%)" : "circle(0% at 90% 5%)" }} transition={{ duration: 0.7, ease: EASE }}
        className="fixed inset-0 z-[70] bg-[var(--paper)] p-[var(--gutter)] md:hidden" aria-hidden={!open} role="dialog" aria-label="Menu">
        <button type="button" className="btn ml-auto flex" tabIndex={open ? 0 : -1} onClick={() => setOpen(false)}>Fechar</button>
        <ul className="mt-10 space-y-3">
          {NAV.map((n, i) => (
            <li key={n.id}>
              <a href={`#${n.id}`} tabIndex={open ? 0 : -1} onClick={() => setOpen(false)} className="flex items-baseline gap-4 text-5xl font-bold tracking-tight">
                <span className="mono">0{i + 1}</span>{n.label}
              </a>
            </li>
          ))}
        </ul>
      </motion.div>
    </>
  );
}

/* ───────── Hero ───────── */
function Hero() {
  const sec = useRef<HTMLElement>(null);
  const vid = useRef<HTMLVideoElement>(null);
  const [on, setOn] = useState(false);
  const [blocked, setBlocked] = useState(false);

  useEffect(() => {
    const v = vid.current, s = sec.current;
    if (!v || !s) return;
    let unlocked = false;
    const unlock = () => {
      if (unlocked) return;
      unlocked = true;
      v.muted = false; setOn(true); setBlocked(false);
      v.play().catch(() => undefined);
    };
    if (!reduced()) {
      v.muted = false;
      v.play().then(() => { setOn(true); unlocked = true; }).catch(() => {
        v.muted = true; setBlocked(true); v.play().catch(() => undefined);
        (["pointerdown", "keydown", "touchend"] as const).forEach((t) => window.addEventListener(t, unlock, { once: true }));
      });
    }
    const io = new IntersectionObserver(([e]) => {
      if (e.intersectionRatio < 0.35) v.pause();
      else if (!reduced()) v.play().catch(() => undefined);
    }, { threshold: [0, 0.35, 1] });
    io.observe(s);
    return () => { io.disconnect(); (["pointerdown", "keydown", "touchend"] as const).forEach((t) => window.removeEventListener(t, unlock)); };
  }, []);

  const toggle = () => {
    const v = vid.current; if (!v) return;
    if (v.paused) v.play().catch(() => undefined);
    v.muted = !v.muted; setOn(!v.muted); setBlocked(false);
  };

  return (
    <section id="hero" ref={sec} className="relative flex min-h-svh flex-col items-center justify-end overflow-hidden !pb-16 !pt-20">
      <video ref={vid} loop muted playsInline preload="auto" poster="/hero/hero-poster.webp" aria-label="Apresentação em vídeo de Warley Coutinho"
        className="tv-video relative z-10 w-auto max-w-full" style={{ height: "min(78svh, 1040px)", aspectRatio: "576/720" }}>
        <source src="/hero/hero.webm" type="video/webm" />
        <source src="/hero/hero.mp4" type="video/mp4" />
      </video>
      <p className="sr-only">Transcrição da apresentação: {INTRO_TRANSCRIPT}</p>
      <button type="button" onClick={toggle} aria-label={on ? "Silenciar a apresentação" : "Ativar o som da apresentação"} aria-pressed={on}
        className={`relative z-20 -mt-2 grid h-[46px] w-[46px] place-items-center rounded-full bg-[var(--ink)] text-[var(--on-ink)] ${blocked ? "ping" : ""}`}>
        {on ? <span aria-hidden className="flex gap-[3px]"><i className="h-3.5 w-[3px] bg-[var(--on-ink)]" /><i className="h-3.5 w-[3px] bg-[var(--on-ink)]" /></span>
            : <span aria-hidden className="ml-0.5 border-y-[7px] border-l-[11px] border-y-transparent border-l-[var(--on-ink)]" />}
      </button>
      <div className="wrap relative z-20 mt-8 text-center">
        <h1 className="text-[clamp(40px,7vw,104px)]">Engenheiro de Software <span className="serif">Full Stack.</span></h1>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <a className="btn pri" href="#projetos">Ver projetos</a>
          <a className="btn" href="#contato">Vamos conversar</a>
          <a className="btn" href="#curriculo">Currículo ↓</a>
        </div>
      </div>
    </section>
  );
}

/* ───────── About + ID card ───────── */
function IdCard() {
  const [flip, setFlip] = useState(false);
  const r = useMotionValue(0);
  const rot = useSpring(r, { stiffness: 70, damping: 6 });
  return (
    <div className="relative mx-auto h-[540px] w-[300px]" onPointerMove={(e) => r.set(Math.max(-16, Math.min(16, e.movementX * 1.4)))} onPointerLeave={() => r.set(0)}>
      <div className="sway absolute inset-x-0 top-[-60px]">
        <motion.div style={{ rotate: rot, transformOrigin: "50% 0" }} className="flex flex-col items-center">
          <div aria-hidden className="grid h-[116px] w-[30px] place-items-center overflow-hidden bg-[var(--ink)] text-[9px] font-semibold uppercase tracking-widest text-[var(--on-ink)] [writing-mode:vertical-rl]">Warley Coutinho · Full Stack</div>
          <div aria-hidden className="-mt-px h-5 w-8 rounded-b-lg bg-gradient-to-b from-[#bbb] to-[#777]" />
          <button type="button" aria-pressed={flip} aria-label="Virar o crachá" onClick={() => setFlip((f) => !f)} className="mt-[-6px] h-[404px] w-[300px] cursor-pointer text-left [perspective:1200px]">
            <motion.div animate={{ rotateY: flip ? 180 : 0 }} transition={{ duration: 0.8, ease: EASE }} className="relative h-full w-full [transform-style:preserve-3d] hover:[transform:rotateY(8deg)]">
              <div className="face card absolute inset-0 overflow-hidden shadow-[0_30px_60px_-20px_rgba(0,0,0,.25)]">
                <p className="bg-[var(--ink)] py-3 text-center text-xs font-bold tracking-[.3em] text-[var(--on-ink)]">ID DE DESENVOLVEDOR</p>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/portrait-bust.webp" alt="Retrato de Warley Coutinho" width={128} height={156} className="mx-auto mt-5 h-[156px] w-[128px] rounded-2xl object-cover ring-4 ring-[var(--soft)]" />
                <p className="mt-4 text-center text-xl font-bold tracking-tight">{profile.name}</p>
                <p className="text-center text-xs text-[var(--mute)]">Engenheiro de Software Full Stack</p>
                <dl className="mx-6 mt-4 space-y-1.5 text-xs">
                  {([["Foco", "Full Stack · Node.js · TypeScript"], ["Local", "Anápolis, GO"], ["Formação", "Eng. de Software · 2022"]] as const).map(([k, v]) => (
                    <div key={k} className="flex justify-between gap-3 border-b border-[var(--line)] pb-1"><dt className="mono !text-[10px]">{k}</dt><dd className="font-medium">{v}</dd></div>
                  ))}
                </dl>
                <div aria-hidden className="absolute inset-x-6 bottom-4 flex items-end justify-between">
                  <div className="h-8 w-28" style={{ background: "repeating-linear-gradient(90deg,var(--ink) 0 2px,transparent 2px 4px,var(--ink) 4px 5px,transparent 5px 8px)" }} />
                  <div className="h-9 w-9 rounded-full" style={{ background: "conic-gradient(#ddd,#888,#eee,#aaa,#ddd)" }} />
                </div>
              </div>
              <div className="face card absolute inset-0 p-7 [transform:rotateY(180deg)]">
                <p className="mono mb-4">O que eu sou</p>
                <ul className="space-y-2.5 text-sm leading-snug">
                  <li>Engenheiro de Software Full Stack</li>
                  <li>5+ anos de experiência em software</li>
                  <li>Bacharel em Engenharia de Software (UniEVANGÉLICA)</li>
                  <li>Servix em produção em 5 negócios</li>
                  <li>~90% menos faltas com lembretes via WhatsApp</li>
                </ul>
                <p className="absolute inset-x-7 bottom-6 text-xs text-[var(--mute)]">Se me encontrou, diga olá · {profile.email}</p>
              </div>
            </motion.div>
          </button>
        </motion.div>
      </div>
    </div>
  );
}

function About() {
  const shown = facts.filter((f) => SHOW_PHONE || f.k !== "telefone");
  return (
    <section id="sobre">
      <div className="wrap grid items-start gap-12 lg:grid-cols-[minmax(0,1fr)_320px_minmax(0,1fr)]">
        <Reveal>
          <p className="mono mb-5">01 — Sobre</p>
          <h2>Olá, eu sou o <span className="serif">Warley.</span></h2>
          <div className="mt-8 space-y-4 text-[17px] leading-relaxed text-[var(--ink2)]">
            <p>{aboutParagraphs[0]}</p><p>{aboutParagraphs[1]}</p>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <a className="btn pri" href="/curriculo/Warley_Coutinho_Curriculo_ATS.pdf" download><Ico n="download" />Currículo</a>
            <a className="btn" href={profile.github} target="_blank" rel="noreferrer"><Ico n="github" />GitHub</a>
            <a className="btn" href={profile.linkedin} target="_blank" rel="noreferrer"><Ico n="linkedin" />LinkedIn</a>
          </div>
        </Reveal>
        <div className="order-first lg:order-none"><IdCard /></div>
        <Reveal i={1}>
          <p className="mono mb-5">Fatos rápidos</p>
          <dl className="card divide-y divide-[var(--line)] !rounded-[20px]">
            {shown.map((f) => (<div key={f.k} className="flex justify-between gap-4 px-5 py-3 text-sm"><dt className="mono !text-[11px]">{f.k}</dt><dd className="text-right font-medium">{f.v}</dd></div>))}
          </dl>
          <p className="serif mt-8 text-2xl leading-snug">Do chão de fábrica a SaaS próprio e sistemas de Indústria 4.0.</p>
        </Reveal>
      </div>
    </section>
  );
}

/* ───────── Stack: periodic table ───────── */
const seen = new Set<string>();
const HIDDEN = new Set(["iOS", "Android"]); // used inside React Native, not listed on their own
const sym = (n: string) => { const s = n.replace(/[^A-Za-z0-9]/g, ""); return s[0].toUpperCase() + (s[1] ?? "").toLowerCase(); };
const TILES = stackGroups
  .flatMap((g) => g.items.filter((i) => !HIDDEN.has(i) && !seen.has(i) && !!seen.add(i)).map((name) => ({ name, fam: g.title })))
  .map((t, i) => ({ ...t, n: i + 1, sym: sym(t.name), hasLogo: true }));

function Stack() {
  const [fam, setFam] = useState<string | null>(null);
  const [sel, setSel] = useState(TILES[0]);
  const used = useMemo(() => projects.filter((p) => p.stack.some((s) => sel.name.toLowerCase().startsWith(s.toLowerCase()))).map((p) => p.title), [sel]);
  return (
    <section id="stack">
      <div className="wrap">
        <Head n="02" tag="Stack">A tabela periódica <span className="serif">da minha stack.</span></Head>
        <div className="mb-6 flex flex-wrap gap-2" role="group" aria-label="Filtrar por família">
          {[null, ...stackGroups.map((g) => g.title)].map((f) => (
            <button key={f ?? "all"} type="button" aria-pressed={fam === f} onClick={() => setFam(f)} className={`btn !min-h-[40px] !px-4 !text-sm ${fam === f ? "pri" : ""}`}>{f ?? "todos"}</button>
          ))}
        </div>
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="grid grid-cols-4 gap-2 md:grid-cols-8">
            {TILES.map((t, i) => (
              <motion.button key={t.name} type="button" onMouseEnter={() => setSel(t)} onFocus={() => setSel(t)} onClick={() => setSel(t)}
                initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: fam && fam !== t.fam ? 0.25 : 1, scale: 1 }} animate={{ opacity: fam && fam !== t.fam ? 0.25 : 1 }}
                viewport={{ once: true }} transition={{ duration: 0.6, ease: EASE, delay: ((i % 8) + Math.floor(i / 8)) * 0.04 }}
                aria-label={`${t.name}, ${t.fam}`} className={`card relative flex aspect-square flex-col items-center justify-center gap-1.5 p-2 text-center transition-shadow hover:shadow-[0_12px_30px_-12px_rgba(0,0,0,.3)] ${sel.name === t.name ? "!bg-[var(--ink)] text-[var(--on-ink)]" : ""}`}>
                <span className="mono absolute left-2.5 top-2 !text-[9px] !text-inherit opacity-60">{t.n}</span>
                <span aria-hidden className="mt-2 grid h-8 place-items-center [&_svg]:!size-8">{t.hasLogo ? <TechIcon name={t.name} /> : <b className="text-2xl tracking-tight">{t.sym}</b>}</span>
                <span className="block w-full truncate text-[11px] leading-tight">{t.name}</span>
              </motion.button>
            ))}
          </div>
          <aside aria-live="polite" className="card h-fit p-6 lg:sticky lg:top-28">
            <motion.div key={sel.name} initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5, ease: EASE }}
              className="mb-5 grid h-44 place-items-center rounded-2xl bg-[var(--paper)] text-7xl font-bold tracking-tighter [&_svg]:!size-[120px]" aria-hidden><TechIcon name={sel.name} /></motion.div>
            <p className="text-2xl font-bold tracking-tight">{sel.name}</p>
            <p className="mono mt-1">{sel.fam}</p>
            <p className="mt-4 text-sm text-[var(--ink2)]">{used.length ? `Usado em: ${used.join(", ")}` : "Presente na minha experiência profissional."}</p>
          </aside>
        </div>
      </div>
    </section>
  );
}

/* ───────── Projects accordion ───────── */
function Mock({ i }: { i: number }) {
  const bar = "rounded-full bg-[var(--soft)]";
  return (
    <div aria-hidden className="relative h-full min-h-[220px] rounded-2xl bg-[var(--paper)] p-5">
      {i === 0 && (<div className="grid h-full place-items-center">{/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/servix-logo.png" alt="Logotipo do Servix — gestão profissional, negócios de beleza" width={684} height={192} className="tv-logo h-auto w-full max-w-[420px] mix-blend-multiply" /></div>)}
      {i === 1 && (<div className="space-y-2.5">{[0, 1, 2, 3].map((k) => <div key={k} className="flex items-center gap-3 rounded-xl bg-[var(--card)] p-3"><div className="h-9 w-9 rounded-lg bg-[var(--soft)]" /><div className="flex-1 space-y-1.5"><div className={`h-2.5 w-2/3 ${bar}`} /><div className={`h-2 w-1/3 ${bar}`} /></div></div>)}</div>)}
      {i === 2 && (<div className="flex h-full flex-col justify-center gap-3 font-mono text-xs">{["Route", "Use Case", "Prisma"].map((l) => <div key={l} className="rounded-xl bg-[var(--card)] px-4 py-3 text-center shadow-[inset_0_0_0_1px_var(--line)]">{l}</div>)}</div>)}
      {i !== 0 && <span className="mono absolute left-4 top-3 !text-[10px]">UI ilustrativa</span>}
    </div>
  );
}

function Projects() {
  const [open, setOpen] = useState(0);
  return (
    <section id="projetos">
      <div className="wrap">
        <Head n="03" tag="Projetos">Coisas que <span className="serif">construí.</span></Head>
        <div className="flex flex-col gap-3 lg:h-[min(78svh,600px)] lg:flex-row">
          {projects.map((p, i) => {
            const o = open === i;
            return (
              <div key={p.title} onMouseEnter={() => setOpen(i)} className={`card relative overflow-hidden transition-[flex] duration-700 ease-[cubic-bezier(.16,1,.3,1)] ${o ? "lg:flex-[8]" : "lg:flex-[1]"}`}>
                <button type="button" aria-expanded={o} onClick={() => setOpen(i)} className={`flex w-full items-center justify-between p-5 text-left ${o ? "lg:hidden" : "lg:absolute lg:inset-0 lg:flex-col lg:justify-between"}`}>
                  <span className="mono">0{i + 1}</span>
                  <span className="text-xl font-bold tracking-tight lg:[writing-mode:vertical-rl]">{p.title}</span>
                  <span aria-hidden className="text-2xl">+</span>
                </button>
                {o && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.25 }} className="grid h-full gap-6 p-6 lg:grid-cols-[1.2fr_1fr] lg:overflow-y-auto">
                    <div>
                      <p className="mono">0{i + 1} · {p.kicker}</p>
                      <h3 className="mt-3 text-4xl font-bold tracking-tighter">{p.title}</h3>
                      <p className="mt-3 text-[15px] leading-relaxed text-[var(--ink2)]">{p.description}</p>
                      <ul className="mt-5 grid gap-3 sm:grid-cols-2">{p.features.map((f) => <li key={f.title} className="text-sm"><b>{f.title}</b> — <span className="text-[var(--mute)]">{f.description}</span></li>)}</ul>
                      <ul className="mt-5 flex flex-wrap gap-1.5">{p.stack.map((s) => <li key={s} className="mono rounded-full px-3 py-1 !text-[11px] shadow-[inset_0_0_0_1px_var(--line)]">{s}</li>)}</ul>
                      <div className="mt-6 flex flex-wrap gap-3">
                        {p.liveUrl && <a className="btn pri" href={p.liveUrl} target="_blank" rel="noreferrer">{p.liveLabel ?? "Ver ao vivo ↗"}</a>}
                        <a className="btn" href={p.repoUrl} target="_blank" rel="noreferrer">Ver no GitHub ↗</a>
                      </div>
                    </div>
                    <Mock i={i} />
                  </motion.div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ───────── Certifications ───────── */
function Certs() {
  return (
    <section id="certificacoes" className="border-y border-[var(--line)] bg-[var(--card)]">
      <div className="wrap grid gap-10 lg:grid-cols-[1fr_1.4fr]">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <p className="mono mb-5">04 — Certificações</p>
          <h2>Sempre <span className="serif">aprendendo.</span></h2>
          <p className="mono mt-6">{String(CERTIFICATIONS.length).padStart(2, "0")} certificações</p>
        </div>
        <ul>
          {CERTIFICATIONS.map((c, i) => (
            <li key={c}><div tabIndex={0} className="row flex items-center gap-6 border-b border-[var(--line)] px-3 py-6">
              <span className="mono">{String(i + 1).padStart(2, "0")}</span><span className="text-2xl font-semibold tracking-tight">{c}</span>
            </div></li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ───────── Experience timeline ───────── */
// Newest first, like LinkedIn. `experience` is already newest-first; the degree (ends 2022) slots in before the 2021 entries.
const asStop = (e: (typeof experience)[number]) => ({ when: e.period, title: e.company, place: e.role, text: e.description });
const STOPS = [
  ...experience.slice(0, -1).map(asStop),
  TIMELINE[1], // Engenharia de Software · 2018 — 2022
  asStop(experience[experience.length - 1]),
  TIMELINE[0], // earlier career · 2008 — 2021
];

function Stop({ s }: { s: (typeof STOPS)[number] }) {
  const ref = useRef<HTMLLIElement>(null);
  const lit = useInView(ref, { margin: "-45% 0px -45% 0px", once: true });
  const [more, setMore] = useState(false);
  return (
    <li ref={ref} className="relative pb-14 pl-10">
      <span aria-hidden className={`absolute left-0 top-2 h-3 w-3 -translate-x-[5px] rounded-full transition-all duration-700 ${lit ? "scale-125 bg-[var(--ink)]" : "bg-[var(--faint)]"}`} />
      <div className={`transition-opacity duration-700 ${lit ? "opacity-100" : "opacity-45"}`}>
        <p className="mono">{s.when}</p>
        <h3 className="mt-2 text-3xl font-bold tracking-tight">{s.title}</h3>
        <p className="text-[var(--mute)]">{s.place}</p>
        <p className={`mt-3 max-w-2xl text-[15px] leading-relaxed text-[var(--ink2)] ${more ? "" : "line-clamp-3"}`}>{s.text}</p>
        {s.text.length > 200 && <button type="button" aria-expanded={more} onClick={() => setMore((m) => !m)} className="mono mt-2 underline underline-offset-4">{more ? "ler menos" : "ler mais"}</button>}
      </div>
    </li>
  );
}

function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 60%"] });
  return (
    <section id="experiencia">
      <div className="wrap">
        <Head n="05" tag="Experiência">Formação e <span className="serif">trabalho.</span></Head>
        <div ref={ref} className="relative ml-1">
          <div aria-hidden className="absolute bottom-0 left-0 top-0 w-px bg-[var(--line)]" />
          <motion.div aria-hidden style={{ scaleY: scrollYProgress }} className="absolute bottom-0 left-0 top-0 w-px origin-top bg-[var(--ink)]" />
          <a href="#contato" className="mb-10 ml-10 block rounded-[26px] border border-dashed border-[var(--faint)] p-8 text-2xl font-semibold tracking-tight transition-colors hover:bg-[var(--card)]">Próximo — <span className="serif">seu time?</span></a>
          <ol>{STOPS.map((s) => <Stop key={s.when + s.title} s={s} />)}</ol>
        </div>
      </div>
    </section>
  );
}

/* ───────── Results: pinned horizontal gallery ───────── */
function Count({ to, from = 0, pre, suf }: { to: number; from?: number; pre: string; suf: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const [v, setV] = useState(from);
  useEffect(() => {
    if (!inView) return;
    if (reduced()) { setV(to); return; }
    const c = animate(from, to, { duration: 1.4, ease: [0.165, 0.84, 0.44, 1], onUpdate: (x) => setV(Math.round(x)) });
    return () => c.stop();
  }, [inView, from, to]);
  return <span ref={ref}>{pre}{v}{suf}</span>;
}

function Results() {
  const box = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [travel, setTravel] = useState(0);
  const { scrollYProgress } = useScroll({ target: box, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], [0, -travel]);
  const [lift, setLift] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (p) => setLift(Math.round(p * (RESULTS.length - 1))));
  useEffect(() => {
    const m = () => setTravel(window.innerWidth >= 768 && !reduced() && track.current ? Math.max(0, track.current.scrollWidth - window.innerWidth + 48) : 0);
    m(); window.addEventListener("resize", m); return () => window.removeEventListener("resize", m);
  }, []);
  const pinned = travel > 0;
  return (
    <section id="resultados" className="!p-0">
      <div ref={box} style={pinned ? { height: `calc(100svh + ${travel}px)` } : undefined}>
        <div className={pinned ? "sticky top-0 flex h-svh flex-col justify-center overflow-hidden" : "py-24"}>
          <div className="wrap mb-10 w-full">
            <p className="mono mb-5">06 — Resultados</p>
            <h2>Números <span className="serif">que importam.</span></h2>
            {pinned && <div aria-hidden className="mt-6 h-px bg-[var(--line)]"><motion.div style={{ scaleX: scrollYProgress }} className="h-px origin-left bg-[var(--ink)]" /></div>}
          </div>
          <motion.div ref={track} style={pinned ? { x } : undefined} className={`flex gap-6 px-[var(--gutter)] ${pinned ? "" : "snap-x overflow-x-auto pb-4"}`}>
            {RESULTS.map((r, i) => (
              <article key={r.label} className={`card relative flex shrink-0 snap-start flex-col justify-between p-7 transition-all duration-700 ${pinned && lift === i ? "-translate-y-3 shadow-[0_44px_80px_-30px_rgba(0,0,0,.4)]" : "shadow-[0_24px_50px_-28px_rgba(0,0,0,.25)]"}`} style={{ width: "clamp(300px,40vw,540px)", height: "clamp(260px,36vh,310px)" }}>
                <div className="flex items-start justify-between"><span className="mono grid h-[72px] w-[72px] place-items-center rounded-2xl bg-[var(--paper)] !text-base !text-[var(--ink)]">{r.tag}</span><span className="mono">0{i + 1} / 0{RESULTS.length}</span></div>
                <div className="flex items-end justify-between gap-4">
                  <div><p className="font-semibold">{r.label}</p><p className="max-w-[200px] text-sm text-[var(--mute)]">{r.cap}</p></div>
                  <p className="text-[clamp(48px,7vw,92px)] font-bold leading-none tracking-tighter"><Count to={r.n} from={"from" in r ? r.from : 0} pre={r.pre} suf={r.suf} /></p>
                </div>
              </article>
            ))}
            <a href="#contato" className="flex shrink-0 items-center px-8 text-2xl font-semibold tracking-tight">e continuo →</a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ───────── Résumé downloads (same four options as the /curriculo page) ───────── */
type Variant = "dark" | "light";
const ATS = [
  { href: "/curriculo/Warley_Coutinho_Curriculo_ATS.pdf", file: "Warley_Coutinho_Curriculo_ATS.pdf", label: "Versão ATS — PDF" },
  { href: "/curriculo/Warley_Coutinho_Curriculo_ATS.docx", file: "Warley_Coutinho_Curriculo_ATS.docx", label: "Versão ATS — Word (.docx)" },
] as const;

async function toDataUrl(path: string): Promise<string> {
  const blob = await (await fetch(path)).blob();
  return new Promise((resolve, reject) => {
    const fr = new FileReader();
    fr.onload = () => resolve(String(fr.result));
    fr.onerror = () => reject(fr.error);
    fr.readAsDataURL(blob);
  });
}

function Resume() {
  const [busy, setBusy] = useState<Variant | null>(null);
  const [failed, setFailed] = useState(false);

  const generate = async (v: Variant) => {
    setBusy(v); setFailed(false);
    try {
      // heavy libs are loaded only when someone clicks, keeping the first load light
      const [{ pdf }, qr, { ResumeDocument }, photo] = await Promise.all([
        import("@react-pdf/renderer"),
        import("qrcode"),
        import("@/components/resume/resume-document"),
        toDataUrl("/images/warley-avatar.jpg"),
      ]);
      const qrDataUrl = await qr.default.toDataURL(SITE_URL, { width: 512, margin: 1, errorCorrectionLevel: "H", color: { dark: v === "dark" ? "#ece9e2" : "#14171c", light: "#00000000" } });
      const blob = await pdf(<ResumeDocument theme={v} qrDataUrl={qrDataUrl} photoDataUrl={photo} />).toBlob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url; a.download = `Warley_Coutinho_Curriculo${v === "dark" ? "" : "_Light"}.pdf`; a.click();
      URL.revokeObjectURL(url);
    } catch { setFailed(true); } finally { setBusy(null); }
  };

  const spin = (v: Variant) => (busy === v ? <Loader2 aria-hidden className="spin h-[18px] w-[18px]" /> : <Download aria-hidden className="h-[18px] w-[18px]" />);
  return (
    <section id="curriculo">
      <div className="wrap">
        <Head n="07" tag="Currículo">Baixe o <span className="serif">currículo.</span></Head>
        <Reveal>
          <p className="max-w-2xl text-[17px] leading-relaxed text-[var(--ink2)]">As versões com design (escuro e claro) são montadas na hora do download, com foto e um QR code que leva direto para este site. A versão ATS é um arquivo pronto, em PDF ou Word.</p>
          <p className="mt-3 max-w-2xl text-sm text-[var(--mute)]">Escuro/claro: com foto, para enviar direto a uma pessoa ou anexar no LinkedIn. ATS: coluna única, sem foto e sem elementos gráficos — use em formulários de candidatura e sistemas de recrutamento automatizados.</p>
          <div className="mt-10 grid max-w-3xl gap-3 sm:grid-cols-2">
            <button type="button" className="btn pri !min-h-[56px] !justify-center" disabled={busy !== null} onClick={() => generate("dark")}>{spin("dark")}Currículo — tema escuro</button>
            <button type="button" className="btn !min-h-[56px] !justify-center" disabled={busy !== null} onClick={() => generate("light")}>{spin("light")}Currículo — tema claro</button>
            {ATS.map((f) => (<a key={f.href} href={f.href} download={f.file} className="btn !min-h-[56px] !justify-center"><Download aria-hidden className="h-[18px] w-[18px]" />{f.label}</a>))}
          </div>
          <p aria-live="polite" className="mono mt-4 !normal-case">{failed ? "Não foi possível gerar o PDF agora. Tente a versão ATS ou recarregue a página." : ""}</p>
        </Reveal>
      </div>
    </section>
  );
}

/* ───────── Contact + footer ───────── */
function Hop({ text }: { text: string }) {
  return <>{text.split("").map((c, i) => <span key={i} aria-hidden className="hop">{c === " " ? "\u00A0" : c}</span>)}</>;
}

function Contact() {
  const [copied, setCopied] = useState(false);
  const copy = async () => { try { await navigator.clipboard.writeText(profile.email); setCopied(true); setTimeout(() => setCopied(false), 2000); } catch { setCopied(false); } };
  return (
    <section id="contato">
      <div className="wrap">
        <p className="mono mb-5">08 — Contato</p>
        <h2 className="text-[clamp(44px,9vw,140px)]" aria-label="Vamos construir algo juntos."><Hop text="Vamos construir" /><br /><span className="serif"><Hop text="algo juntos." /></span></h2>
        <div className="mt-12 flex flex-wrap items-center gap-4">
          <a href={`mailto:${profile.email}`} className="text-[clamp(22px,4vw,48px)] font-semibold tracking-tight underline decoration-[var(--faint)] underline-offset-8">{profile.email}</a>
          <button type="button" className="btn" onClick={copy}>Copiar</button>
          <span aria-live="polite" className="mono">{copied ? "Copiado ✓" : ""}</span>
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          {SHOW_PHONE && <a className="btn" href={`tel:${profile.phoneHref}`}>{profile.phone}</a>}
          <a className="btn" href={profile.github} target="_blank" rel="noreferrer"><Ico n="github" />GitHub</a>
          <a className="btn" href={profile.linkedin} target="_blank" rel="noreferrer"><Ico n="linkedin" />LinkedIn</a>
          <a className="btn" href={profile.instagram} target="_blank" rel="noreferrer"><Ico n="instagram" />Instagram</a>
          <a className="btn" href={profile.studio} target="_blank" rel="noreferrer"><AdapticodeIcon size={26} />{profile.studioLabel}</a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-[var(--line)] py-8">
      <div className="wrap mono flex flex-wrap items-center justify-between gap-3">
        <span>© {new Date().getFullYear()} {profile.name}</span>
        <a href="#hero">Voltar ao topo ↑</a>
        <span>Feito com Next.js</span>
      </div>
    </footer>
  );
}

export function TvHome() {
  return (
    <div className="tv">
      <Nav />
      <main>
        <Hero /><About /><Stack /><Projects /><Certs /><Experience /><Results /><Resume /><Contact />
      </main>
      <Footer />
    </div>
  );
}
