import { About } from "@/components/about";
import { Contact } from "@/components/contact";
import { Experience } from "@/components/experience";
import { Hero } from "@/components/hero";
import { Projects } from "@/components/projects";
import { SiteFooter, BlueprintBackground } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Stack } from "@/components/stack";

export default function Home() {
  return (
    <>
      <BlueprintBackground />
      <SiteHeader />
      <main className="relative z-10 mx-auto max-w-[1040px] px-6 sm:px-8">
        <Hero />
        <About />
        <Stack />
        <Experience />
        <Projects />
        <Contact />
      </main>
      <SiteFooter />
    </>
  );
}
