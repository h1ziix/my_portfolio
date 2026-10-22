import { portfolio } from "@/data/portfolio";
import { RevealInView } from "@/components/ui/reveal-in-view";
import { ProjectOverview } from "@/components/projects/project-overview";

export function Projects() {
  const selected = [
    "kazecofood",
    "agentic-ops",
    "atu-campus",
    "stratweb",
  ].flatMap((slug) =>
    portfolio.projects.filter((project) => project.slug === slug),
  );
  const selectedSlugs = new Set(selected.map((project) => project.slug));
  return (
    <section
      id="work"
      className="shell section work-section"
      aria-labelledby="work-title"
    >
      <div className="section-heading">
        <div className="section-heading-title">
          <span className="section-index meta" aria-hidden="true">
            01 /
          </span>
          <h2 id="work-title" className="display text-section">
            Selected work{" "}
            <span className="meta work-counter">
              ({String(selected.length).padStart(2, "0")})
            </span>
          </h2>
        </div>
        <p className="section-kicker">
          A closer look at the products I design and build. Watch a film, then
          explore the thinking and engineering behind it.
        </p>
      </div>
      <div className="selected-projects">
        {selected.map((project, index) => (
          <RevealInView key={project.slug}>
            <ProjectOverview project={project} index={index + 1} />
          </RevealInView>
        ))}
      </div>
      <div className="more-work-heading">
        <h3 className="display">More work</h3>
        <span className="meta text-slate">05 — 07</span>
      </div>
      <div className="index-table">
        {portfolio.projects
          .filter((project) => !selectedSlugs.has(project.slug))
          .map((project, index) => (
            <RevealInView key={project.slug} order={index}>
              <ProjectOverview project={project} index={index + 5} />
            </RevealInView>
          ))}
      </div>
    </section>
  );
}
