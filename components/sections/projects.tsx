import { portfolio } from "@/data/portfolio";
import { Reveal } from "@/components/ui/reveal";
import { SectionLabel } from "@/components/ui/section-label";
import { ProjectOverview } from "@/components/projects/project-overview";

export function Projects() {
  const leading = portfolio.projects.filter((project) => project.hierarchy !== "supporting");
  const supporting = portfolio.projects.filter((project) => project.hierarchy === "supporting");
  return (
    <section id="work" className="shell section-space" aria-labelledby="work-title">
      <SectionLabel id="work-title" eyebrow="01 / Selected work" title="Selected work" kicker="Agentic systems, internal automation and public web products." />
      <div className="mt-8 grid gap-12 md:mt-10">
        {leading.map((project, index) => <Reveal key={project.slug}><ProjectOverview project={project} index={index} /></Reveal>)}
      </div>
      {supporting.length ? (
        <div className="mt-10 md:mt-12">
          <h3 className="mb-5 text-xl font-medium tracking-tight text-text-primary">Other work</h3>
          {supporting.map((project, index) => <Reveal key={project.slug}><ProjectOverview project={project} index={leading.length + index} /></Reveal>)}
        </div>
      ) : null}
    </section>
  );
}
