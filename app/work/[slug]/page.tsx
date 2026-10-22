import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Footer } from "@/components/layout/footer";
import { Navigation } from "@/components/layout/navigation";
import { ProjectLinks } from "@/components/projects/project-links";
import { ProjectVideo } from "@/components/projects/project-video";
import { ActionLink } from "@/components/ui/action-link";
import { SectionLabel } from "@/components/ui/section-label";
import { portfolio } from "@/data/portfolio";
import { projectStories, projectStorySlugs } from "@/data/project-stories";
import { siteUrl } from "@/lib/site";
import { Ribbon } from "@/components/ui/ribbon";
import { projectRibbon } from "@/lib/ribbon";

type PageProps = { params: { slug: string } };

export const dynamicParams = false;

export function generateStaticParams() {
  return projectStorySlugs.map((slug) => ({ slug }));
}

function getCaseStudy(slug: string) {
  const storySlug = projectStorySlugs.find((candidate) => candidate === slug);
  const project = portfolio.projects.find((candidate) => candidate.slug === storySlug);

  if (!storySlug || !project) notFound();

  return { project, story: projectStories[storySlug], storySlug };
}

export function generateMetadata({ params }: PageProps): Metadata {
  const { project } = getCaseStudy(params.slug);
  const poster = project.media.find((media) => media.type === "video")?.poster;
  const canonical = new URL(`/work/${project.slug}`, siteUrl).href;
  const image = new URL(poster ?? "/og.png", siteUrl).href;
  const title = `${project.name} — ${project.subtitle}`;

  return {
    metadataBase: siteUrl,
    title,
    description: project.summary,
    alternates: { canonical },
    openGraph: {
      title,
      description: project.summary,
      url: canonical,
      siteName: portfolio.person.name,
      type: "website",
      images: [{ url: image, alt: `${project.name} product presentation` }]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: project.summary,
      images: [image]
    }
  };
}

export default function ProjectCaseStudy({ params }: PageProps) {
  const { project, story, storySlug } = getCaseStudy(params.slug);
  const video = project.media.find((media) => media.type === "video");
  const nextSlug = projectStorySlugs[(projectStorySlugs.indexOf(storySlug) + 1) % projectStorySlugs.length];
  const nextProject = portfolio.projects.find((candidate) => candidate.slug === nextSlug);
  const projectWithoutSelfLink = { ...project, links: { ...project.links, caseStudy: undefined } };
  const hasProjectLinks = Object.values(projectWithoutSelfLink.links).some(Boolean);

  return (
    <>
      <Navigation innerPage />
      <main id="main-content" tabIndex={-1} className="focus-ring case-study" data-ribbon={projectRibbon(project.slug)}>
        <section id="top" aria-labelledby="project-title" className="shell section pt-8 sm:pt-10 lg:pt-12">
          <a href="/#work" className="text-link focus-ring inline-flex min-h-11 items-center gap-2 text-sm font-medium">
            All work
          </a>

          <div className="mt-7 grid min-w-0 gap-6 lg:mt-10 lg:grid-cols-12 lg:gap-12">
            <div className="min-w-0 lg:col-span-5">
              <div className="case-title-wrap"><Ribbon variant="edge" gradient={projectRibbon(project.slug)} /><h1 id="project-title" className="display text-hero">{project.name}</h1></div>
              <p className="mt-4 text-lg leading-8 text-slate">{project.subtitle}</p>
            </div>
            <div className="min-w-0 lg:col-span-7 lg:self-end">
              <p className="max-w-[48ch] text-pretty text-xl leading-9 sm:text-2xl sm:leading-10">{project.summary}</p>
              <p className="mt-5"><span className="chip" data-tone={project.state.tone}>{project.state.label}</span></p>
              {project.state.note ? <p className="mt-2 max-w-[65ch] text-sm leading-6 text-slate">{project.state.note}</p> : null}
            </div>
          </div>

          {video ? <div className="mt-8 sm:mt-10 lg:mt-12"><ProjectVideo media={video} name={project.name} id={`${project.slug}-film`} ribbon={projectRibbon(project.slug)} /></div> : null}
          {hasProjectLinks ? <div className="mt-2"><ProjectLinks project={projectWithoutSelfLink} /></div> : null}
        </section>

        <section aria-labelledby="built-title" className="shell section grid min-w-0 gap-7 border-t border-rule pt-9 lg:grid-cols-12 lg:gap-12 lg:pt-12">
          <div className="min-w-0 lg:col-span-5"><SectionLabel id="built-title" title="What I built" /></div>
          <div className="min-w-0 lg:col-span-7">
            <p className="max-w-[62ch] text-pretty text-lg leading-8">{story.problem}</p>
            <p className="mt-5 text-base leading-7 text-slate"><span className="font-medium text-ink">My part.</span> {project.role}.</p>
            <ul className="mt-5 grid list-disc gap-3 pl-5 text-base leading-7 marker:text-slate">
              {project.features.map((feature) => <li key={feature} className="pl-1">{feature}</li>)}
            </ul>
            <ul aria-label={`${project.name} technologies`} className="mt-7 flex flex-wrap gap-2">
              {project.technologies.map((technology) => <li key={technology} className="rounded-control border border-rule bg-surface px-3 py-1.5 text-sm font-medium leading-5 text-slate">{technology}</li>)}
            </ul>
          </div>
        </section>

        <section aria-labelledby="workflow-title" className="shell section grid min-w-0 gap-7 border-t border-rule pt-9 lg:grid-cols-12 lg:gap-12 lg:pt-12">
          <div className="min-w-0 lg:col-span-5"><SectionLabel id="workflow-title" title="How it works" kicker="From the interface to the systems behind it." /></div>
          <dl className="min-w-0 lg:col-span-7">
            {story.architecture.map((step, index) => (
              <div key={step.title} className="grid min-w-0 grid-cols-[2rem_minmax(0,1fr)] gap-x-4 border-t border-rule py-6 first:border-t-0 first:pt-0 sm:grid-cols-[2.5rem_minmax(0,1fr)] sm:gap-x-5">
                <dt className="col-span-2 grid grid-cols-subgrid items-baseline">
                  <span aria-hidden="true" className="display text-2xl text-slate">{String(index + 1).padStart(2, "0")}</span>
                  <span className="text-lg font-semibold leading-7">{step.title}</span>
                </dt>
                <dd className="col-start-2 mt-2 max-w-[62ch] text-base leading-7 text-slate">{step.description}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section aria-labelledby="decisions-title" className="shell section grid min-w-0 gap-7 border-t border-rule pt-9 lg:grid-cols-12 lg:gap-12 lg:pt-12">
          <div className="min-w-0 lg:col-span-5"><SectionLabel id="decisions-title" title="Engineering decisions" kicker="The choices that shape how the product behaves." /></div>
          <div className="min-w-0 lg:col-span-7">
            {story.decisions.map((decision) => (
              <div key={decision.title} className="border-t border-rule py-6 first:border-t-0 first:pt-0">
                <h3 className="text-lg font-semibold leading-7">{decision.title}</h3>
                <p className="mt-2 max-w-[62ch] text-base leading-7 text-slate">{decision.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section aria-labelledby="status-title" className="shell section grid min-w-0 gap-7 border-t border-rule pt-9 lg:grid-cols-12 lg:gap-12 lg:pt-12">
          <div className="min-w-0 lg:col-span-5"><SectionLabel id="status-title" title="Current status" /></div>
          <div className="min-w-0 lg:col-span-7">
            <p><span className="chip" data-tone={project.state.tone}>{project.state.label}</span></p>
            {project.state.note ? <p className="mt-4 max-w-[62ch] text-lg leading-8">{project.state.note}</p> : null}
            {project.limitations?.length ? (
              <ul className="mt-4 grid list-disc gap-3 pl-5 text-base leading-7 text-slate">
                {project.limitations.map((limitation) => <li key={limitation} className="pl-1">{limitation}</li>)}
              </ul>
            ) : null}
          </div>
        </section>

        <nav aria-label="More work" className="shell section grid min-w-0 gap-7 border-t border-rule pt-9 lg:grid-cols-12 lg:gap-12 lg:pt-12">
          <div className="min-w-0 lg:col-span-5"><ActionLink href="/#work">Back to all work</ActionLink></div>
          {nextProject ? (
            <a href={`/work/${nextProject.slug}`} className="group focus-ring block min-w-0 rounded-control lg:col-span-7">
              <p className="text-sm font-medium text-slate">Next project</p>
              <p className="display mt-3 flex min-w-0 items-center justify-between gap-5 text-name text-action transition-colors group-hover:text-action-hover">
                <span>{nextProject.name}</span>
              </p>
              <p className="mt-2 text-base leading-7 text-slate">{nextProject.subtitle}</p>
            </a>
          ) : null}
        </nav>
      </main>
      <Footer />
    </>
  );
}
