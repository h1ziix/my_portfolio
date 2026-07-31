import { portfolio } from "@/data/portfolio";
import { Reveal } from "@/components/ui/reveal";
import { SectionLabel } from "@/components/ui/section-label";
import { ActionLink } from "@/components/ui/action-link";
import { ProjectPreview } from "@/components/sections/project-preview";

export function Projects() {
  return (
    <section id="work" className="py-24 md:py-32" aria-labelledby="work-title">
      <div className="shell">
        <Reveal>
          <SectionLabel
            id="work-title"
            eyebrow="Selected work"
            title="Systems built around real workflows, measurable operations and production delivery."
            kicker="Selected projects with clear ownership, technical scope and outcomes — from internal automation to public product interfaces."
          />
        </Reveal>
      </div>

      <div className="shell mt-16 grid gap-20">
        {portfolio.projects.map((project, index) => (
          <Reveal
            as="article"
            key={project.name}
            className={`grid items-center gap-10 ${
              index % 2 === 1 ? "lg:grid-cols-[1fr_0.74fr]" : "lg:grid-cols-[0.74fr_1fr]"
            }`}
          >
            <div className={index % 2 === 1 ? "lg:order-2" : ""}>
              <p className="font-mono text-xs uppercase tracking-caps text-signal-violet">
                0{index + 1} / {project.category}
              </p>
              <h3 className="mt-5 text-5xl font-semibold uppercase leading-none text-white md:text-7xl">
                {project.name}
              </h3>
              <p className="mt-6 max-w-xl text-pretty text-lg leading-8 text-zinc-300">
                {project.description}
              </p>
              {"impact" in project ? (
                <p className="mt-6 max-w-xl border-l border-signal-violet pl-5 text-pretty text-base leading-7 text-zinc-200">
                  {project.impact}
                </p>
              ) : null}
              <p className="mt-6 max-w-xl font-mono text-xs uppercase leading-6 tracking-caps text-zinc-500">
                Role: {project.role}
              </p>

              <div className="mt-8 grid grid-cols-2 border-t hairline">
                {project.focus.map((item) => (
                  <div
                    key={item}
                    className="border-b hairline py-4 pr-4 font-mono text-[0.7rem] uppercase tracking-caps text-zinc-400"
                  >
                    {item}
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                {project.stack.map((item) => (
                  <span
                    key={item}
                    className="border border-white/12 px-3 py-2 font-mono text-[0.68rem] uppercase tracking-caps text-zinc-400"
                  >
                    {item}
                  </span>
                ))}
              </div>

              <ActionLink
                href={project.url}
                target={project.url.startsWith("http") ? "_blank" : undefined}
                rel={project.url.startsWith("http") ? "noreferrer" : undefined}
                className="mt-9"
              >
                {project.linkLabel}
              </ActionLink>
            </div>

            <div className={index % 2 === 1 ? "lg:order-1" : ""}>
              <ProjectPreview project={project} />
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
