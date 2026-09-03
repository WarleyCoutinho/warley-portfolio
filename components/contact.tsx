import { SectionHead } from "@/components/section-head";
import { SectionReveal } from "@/components/section-reveal";
import { profile } from "@/lib/data";

export function Contact() {
  return (
    <section id="contato" className="border-t border-border py-24">
      <SectionReveal>
        <SectionHead num="05" title="Contato" />
        <div className="relative flex flex-wrap items-end justify-between gap-8 border border-border p-10 sm:p-14">
          <span className="tick left-0 top-0" />
          <span className="tick right-0 top-0" />
          <span className="tick bottom-0 left-0" />
          <span className="tick bottom-0 right-0" />

          <div>
            <h2 className="mb-3.5 max-w-[520px] font-display text-[32px] font-semibold">
              Vamos construir o próximo sistema juntos.
            </h2>
            <p className="max-w-[480px] text-[15px] text-text-dim">
              Aberto a oportunidades CLT, PJ e projetos freelance de desenvolvimento web e mobile
              sob medida — atendimento 100% remoto.
            </p>
          </div>

          <div className="flex flex-col gap-3 font-mono-brand text-sm">
            <a href={`mailto:${profile.email}`} className="flex items-center gap-2.5 text-text-dim transition-colors hover:text-amber">
              <span className="inline-block w-20 text-[11px] text-text-faint">e-mail</span>
              {profile.email}
            </a>
            <a href={`tel:${profile.phoneHref}`} className="flex items-center gap-2.5 text-text-dim transition-colors hover:text-amber">
              <span className="inline-block w-20 text-[11px] text-text-faint">telefone</span>
              {profile.phone}
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 text-text-dim transition-colors hover:text-amber"
            >
              <span className="inline-block w-20 text-[11px] text-text-faint">linkedin</span>
              {profile.linkedinLabel} ↗
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 text-text-dim transition-colors hover:text-amber"
            >
              <span className="inline-block w-20 text-[11px] text-text-faint">github</span>
              {profile.githubLabel} ↗
            </a>
            <a
              href={profile.githubOrg}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 text-text-dim transition-colors hover:text-amber"
            >
              <span className="inline-block w-20 text-[11px] text-text-faint">adapti code</span>
              {profile.githubOrgLabel} ↗
            </a>
            <a
              href={profile.studio}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 text-text-dim transition-colors hover:text-amber"
            >
              <span className="inline-block w-20 text-[11px] text-text-faint">estúdio</span>
              {profile.studioLabel} ↗
            </a>
            <div className="flex items-center gap-2.5 text-text-dim">
              <span className="inline-block w-20 text-[11px] text-text-faint">local</span>
              {profile.location}
            </div>
          </div>
        </div>
      </SectionReveal>
    </section>
  );
}
