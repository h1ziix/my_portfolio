import Image from "next/image";
import { ProjectLinks } from "@/components/projects/project-links";
import type { Project } from "@/types/portfolio";

function ProjectTechnologies({ project }: { project: Project }) {
  return <p className="font-mono text-xs leading-6 text-text-muted">{project.technologies.join(" · ")}</p>;
}

function ProjectHeading({ project, index }: { project: Project; index: number }) {
  return (
    <div className="min-w-0">
      <p className="font-mono text-xs uppercase leading-6 tracking-caps text-accent-text">{String(index + 1).padStart(2, "0")} / {project.subtitle}</p>
      <h3 id={`${project.slug}-title`} className="mt-3 text-card font-semibold leading-tight tracking-tight">{project.name}</h3>
      <p className="mt-4 max-w-xl text-pretty text-base leading-7 text-text-secondary">{project.summary}</p>
    </div>
  );
}

function ProjectDetails({ project }: { project: Project }) {
  return (
    <div className="min-w-0">
      <p className="text-sm leading-6 text-text-secondary"><span className="font-medium text-text-primary">Role:</span> {project.role}</p>
      <ul className="mt-5 grid gap-2 text-sm leading-6 text-text-secondary">
        {project.features.slice(0, 3).map((feature) => <li key={feature} className="flex min-w-0 gap-3"><span aria-hidden="true" className="text-accent-text">↳</span><span className="min-w-0">{feature}</span></li>)}
      </ul>
      <div className="mt-5"><ProjectTechnologies project={project} /></div>
      <div className="mt-4"><ProjectLinks project={project} /></div>
      <p className="mt-2 text-xs leading-6 text-text-muted">{project.releaseStatus.label} · {project.accessStatus.label}</p>
    </div>
  );
}

/** Homepage overview only. Detailed flagship design and case routes belong to later stages. */
export function ProjectOverview({ project, index }: { project: Project; index: number }) {
  if (project.hierarchy === "supporting") {
    return (
      <article aria-labelledby={`${project.slug}-title`} data-project-tier={project.hierarchy} className="grid min-w-0 gap-4 border-t border-border py-6 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)_minmax(0,0.8fr)] md:gap-8">
        <div className="min-w-0">
          <p className="font-mono text-xs text-text-muted">{String(index + 1).padStart(2, "0")} / {project.subtitle}</p>
          <h4 id={`${project.slug}-title`} className="mt-2 text-2xl font-medium tracking-tight">{project.name}</h4>
        </div>
        <div className="min-w-0">
          <p className="text-pretty text-base leading-7 text-text-secondary">{project.summary}</p>
          <p className="mt-2 text-sm leading-6 text-text-muted">{project.role}</p>
        </div>
        <div className="min-w-0">
          <ProjectTechnologies project={project} />
          <p className="mt-2 text-xs leading-6 text-text-muted">{project.accessStatus.label}</p>
          <ProjectLinks project={project} />
        </div>
      </article>
    );
  }

  const featured = project.hierarchy === "featured";
  const image = project.media.find((media) => media.type === "image");
  if (featured) {
    return (
      <article id={project.slug} aria-labelledby={`${project.slug}-title`} data-project-tier={project.hierarchy} className="grid min-w-0 items-start gap-6 rounded-surface border border-border bg-surface p-5 sm:p-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-x-10">
        <ProjectHeading project={project} index={index} />
        {image ? (
          <figure className="min-w-0 lg:col-start-2 lg:row-span-2 lg:row-start-1">
            <div className="overflow-hidden rounded-surface border border-border bg-surface-subtle shadow-media">
              <Image src={image.src} alt={image.alt} width={image.width ?? 1440} height={image.height ?? 1000} sizes="(min-width: 1024px) 650px, (min-width: 640px) 85vw, 90vw" className="h-auto w-full" />
            </div>
            <figcaption className="mt-3 text-xs leading-5 text-text-muted">{image.caption ?? project.accessStatus.description}</figcaption>
          </figure>
        ) : null}
        <ProjectDetails project={project} />
      </article>
    );
  }
  return (
    <article aria-labelledby={`${project.slug}-title`} data-project-tier={project.hierarchy} className="grid min-w-0 gap-8 border-b border-border pb-8 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] md:gap-12">
      <div className="grid min-w-0 content-start gap-4">
        <ProjectHeading project={project} index={index} />
        <ProjectDetails project={project} />
      </div>
      {project.outcomes?.length ? (
        <aside aria-label={`${project.name} system scope`} className="min-w-0 rounded-surface border border-border bg-surface p-5 sm:p-6">
          <p className="font-mono text-xs uppercase tracking-caps text-text-muted">System scope</p>
          <dl className="mt-5 grid gap-5">
            {project.outcomes.map((outcome) => (
              <div key={outcome.label} className="border-t border-border pt-4">
                <dt className="text-sm leading-6 text-text-secondary">{outcome.label}</dt>
                <dd className="mt-1 text-2xl font-medium tracking-tight text-text-primary">{outcome.value}</dd>
                {outcome.basis ? <dd className="mt-1 text-xs leading-5 text-text-muted">{outcome.basis}</dd> : null}
              </div>
            ))}
          </dl>
        </aside>
      ) : null}
    </article>
  );
}
