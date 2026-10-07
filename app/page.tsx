import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import { About } from "@/components/sections/about";
import { Certifications } from "@/components/sections/certifications";
import { Contact } from "@/components/sections/contact";
import { Experience } from "@/components/sections/experience";
import { Hero } from "@/components/sections/hero";
import { Projects } from "@/components/sections/projects";
import { ResumeSection } from "@/components/sections/resume";
import { Results } from "@/components/sections/results";
import { Stack } from "@/components/sections/stack";

export default function Home() {
  return (
    <>
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-100 focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-sm focus:font-medium focus:text-paper"
      >
        Pular para o conteúdo
      </a>
      <SiteNav />
      <main id="conteudo" tabIndex={-1} className="outline-none">
        <Hero />
        <About />
        <Stack />
        <Projects />
        <Certifications />
        <Experience />
        <Results />
        <ResumeSection />
        <Contact />
      </main>
      <SiteFooter />
    </>
  );
}
