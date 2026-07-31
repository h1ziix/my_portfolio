import { Navigation } from "@/components/layout/navigation";
import { AmbientBackground } from "@/components/layout/ambient-background";
import { About } from "@/components/sections/about";
import { AiWorkflow } from "@/components/sections/ai-workflow";
import { Contact } from "@/components/sections/contact";
import { Experience } from "@/components/sections/experience";
import { Hero } from "@/components/sections/hero";
import { Projects } from "@/components/sections/projects";
import { Stack } from "@/components/sections/stack";
import { Toolkit } from "@/components/sections/toolkit";

export default function Home() {
  return (
    <>
      <AmbientBackground />
      <Navigation />
      <main className="relative z-10">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Stack />
        <AiWorkflow />
        <Toolkit />
        <Contact />
      </main>
    </>
  );
}
