import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import { About } from "@/components/sections/about";
import { Certifications } from "@/components/sections/certifications";
import { Contact } from "@/components/sections/contact";
import { Experience } from "@/components/sections/experience";
import { Hero } from "@/components/sections/hero";
import { Projects } from "@/components/sections/projects";
import { Results } from "@/components/sections/results";
import { Stack } from "@/components/sections/stack";

export default function Home() {
  return (
    <>
      <SiteNav />
      <main>
        <Hero />
        <About />
        <Stack />
        <Projects />
        <Certifications />
        <Experience />
        <Results />
        <Contact />
      </main>
      <SiteFooter />
    </>
  );
}
