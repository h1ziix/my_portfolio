import Image from "next/image";
import { ProjectLinks } from "@/components/projects/project-links";
import { ProjectVideo } from "@/components/projects/project-video";
import { Ribbon } from "@/components/ui/ribbon";
import { projectRibbon } from "@/lib/ribbon";
import type { Project } from "@/types/portfolio";

function ProjectState({ project }: { project: Project }) {
  return (
    <div className="project-state">
      <span className="chip" data-tone={project.state.tone}>
        {project.state.label}
      </span>
      {project.state.note ? <p>{project.state.note}</p> : null}
    </div>
  );
}
function ProjectTechnologies({ project }: { project: Project }) {
  return (
    <ul
      aria-label={`${project.name} technologies`}
      className="project-technologies"
    >
      {project.technologies.map((technology) => (
        <li key={technology}>{technology}</li>
      ))}
    </ul>
  );
}
function ProjectBoundaries({ project }: { project: Project }) {
  return (
    <>
      {project.limitations?.map((limitation) => (
        <p key={limitation} className="project-limitation">
          {limitation}
        </p>
      ))}
      {project.evidence?.map((evidence) => (
        <a
          key={evidence.source}
          href={evidence.source}
          target="_blank"
          rel="noopener noreferrer"
          className="text-link focus-ring evidence-link"
        >
          {evidence.label}
          <span aria-hidden="true" className="link-arrow">
            ↗
          </span>
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      ))}
    </>
  );
}
function ProjectPoints({ project }: { project: Project }) {
  return (
    <div className="chapter-points">
      <h4 className="meta">What I built</h4>
      <ul className="project-feature-list">
        {project.features.map((feature, index) => (
          <li key={feature}>
            <span className="meta" aria-hidden="true">
              0{index + 1}
            </span>
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <ProjectBoundaries project={project} />
    </div>
  );
}

function ProjectMetrics({ project }: { project: Project }) {
  if (!project.outcomes?.length) return null;
  return (
    <dl
      aria-label={`${project.name} in numbers`}
      className="production-metrics"
    >
      {project.outcomes.map((outcome, index) => (
        <div
          key={outcome.label}
          className={`production-metric ${index === 0 ? "production-metric--lead" : ""}`}
        >
          <dt className="meta">{outcome.label}</dt>
          <dd>
            {index === 0 && project.slug === "kazecofood" ? (
              <div className="before-after">
                <span className="sr-only">{outcome.value}</span>
                <span className="display before-number" aria-hidden="true">
                  20–25
                </span>
                <span className="metric-arrow" aria-hidden="true">
                  <Ribbon variant="edge" gradient="ember" />
                  <span>→</span>
                </span>
                <span className="display after-number" aria-hidden="true">
                  100–200<span className="meta metric-unit">docs/day</span>
                </span>
              </div>
            ) : (
              <p className="production-stat display">{outcome.value}</p>
            )}
            {outcome.basis ? (
              <p className="production-basis">{outcome.basis}</p>
            ) : null}
          </dd>
        </div>
      ))}
    </dl>
  );
}

function SupportingProject({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const href =
    project.links.site ??
    project.links.source ??
    project.links.access ??
    project.links.demo ??
    "#contact";
  const external = href.startsWith("http");
  return (
    <article
      id={project.slug}
      className="project index-project"
      data-project-tier="supporting"
      data-ribbon={projectRibbon(project.slug)}
      aria-labelledby={`${project.slug}-title`}
    >
      <div className="index-row">
        <Ribbon variant="edge" gradient={projectRibbon(project.slug)} />
        <a
          className="index-primary focus-ring"
          href={href}
          target={external ? "_blank" : undefined}
          rel={external ? "noopener noreferrer" : undefined}
        >
          <span className="meta index-number">
            {String(index).padStart(2, "0")}
          </span>
          <h3 id={`${project.slug}-title`} className="display index-name">
            {project.name}
          </h3>
          <span className="index-context">
            <span className="index-type">{project.subtitle}</span>
            <span className="meta index-stack">
              {project.technologies.join(" / ")}
            </span>
            <span className="chip" data-tone={project.state.tone}>
              {project.state.label}
            </span>
          </span>
          <span className="index-arrow" aria-hidden="true">
            ↗
          </span>
          {external ? (
            <span className="sr-only"> (opens in a new tab)</span>
          ) : null}
        </a>
      </div>
      <details className="index-details">
        <summary className="meta focus-ring">
          What I built<span aria-hidden="true">+</span>
        </summary>
        <div className="index-details-content grid-12">
          <div className="index-description">
            <p className="project-summary">{project.summary}</p>
            <p className="project-role">
              <span>My part.</span> {project.role}.
            </p>
            <ProjectState project={project} />
            <ProjectPoints project={project} />
            <ProjectLinks project={project} />
          </div>
          <div className="index-media">
            {project.media
              .filter((media) => media.type === "video")
              .map((media) => (
                <ProjectVideo
                  key={media.src}
                  media={media}
                  name={project.name}
                  id={`${project.slug}-film`}
                  ribbon={projectRibbon(project.slug)}
                />
              ))}
          </div>
        </div>
      </details>
    </article>
  );
}

export function ProjectOverview({
  project,
  index = 1,
}: {
  project: Project;
  index?: number;
}) {
  if (project.hierarchy === "supporting")
    return <SupportingProject project={project} index={index} />;
  const image = project.media.find((media) => media.type === "image");
  const video = project.media.find((media) => media.type === "video");
  return (
    <article
      id={project.slug}
      className="project project--selected grid-12"
      aria-labelledby={`${project.slug}-title`}
      data-project-tier={project.hierarchy}
      data-ribbon={projectRibbon(project.slug)}
    >
      <div className="chapter-aside">
        <span className="chapter-number display" aria-hidden="true">
          {String(index).padStart(2, "0")}
        </span>
        <h3 id={`${project.slug}-title`} className="project-title display">
          {project.name}
        </h3>
        <p className="project-subtitle">{project.subtitle}</p>
        <ProjectState project={project} />
        <p className="project-summary">{project.summary}</p>
        <p className="project-role">
          <span>My part.</span> {project.role}.
        </p>
        <ProjectTechnologies project={project} />
        <ProjectLinks project={project} />
      </div>
      <div className="chapter-content">
        {video ? (
          <ProjectVideo
            media={video}
            name={project.name}
            id={`${project.slug}-film`}
            ribbon={projectRibbon(project.slug)}
          />
        ) : image ? (
          <figure className="project-image">
            <Image
              src={image.src}
              alt={image.alt}
              width={image.width ?? 1440}
              height={image.height ?? 1000}
              sizes="(min-width: 1024px) 56vw, calc(100vw - 32px)"
            />
            <figcaption className="film-caption">
              {image.caption ?? project.state.note}
            </figcaption>
          </figure>
        ) : null}
        <ProjectMetrics project={project} />
        <ProjectPoints project={project} />
      </div>
    </article>
  );
}
