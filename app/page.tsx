import { Navigation } from "@/components/layout/navigation";
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
      <Navigation />
      <main>
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
