import { Navigation } from "@/components/layout/navigation";
import { Footer } from "@/components/layout/footer";
import { HowIWork } from "@/components/sections/how-i-work";
import { Contact } from "@/components/sections/contact";
import { Experience } from "@/components/sections/experience";
import { Hero } from "@/components/sections/hero";
import { Projects } from "@/components/sections/projects";
import { TechnicalSkills } from "@/components/sections/technical-skills";

export default function Home() {
  return (
    <>
      <Navigation />
      <main id="main-content" tabIndex={-1} className="focus-ring">
        <Hero />
        <Projects />
        <Experience />
        <TechnicalSkills />
        <HowIWork />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
