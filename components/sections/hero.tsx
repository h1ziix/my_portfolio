import Image, { getImageProps } from "next/image";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { portfolio } from "@/data/portfolio";
import { ActionLink } from "@/components/ui/action-link";
import { HeroEntrance } from "@/components/sections/hero-entrance";

export function Hero() {
  const github = portfolio.socials.find((social) => social.label === "GitHub");
  const mobilePreview = getImageProps({
    src: "/agentic-ops/hero-approvals-mobile.webp",
    alt: "",
    width: 840,
    height: 650,
    sizes: "calc(100vw - 32px)",
    quality: 90
  }).props;

  return (
    <section id="top" className="hero" aria-labelledby="hero-title">
      <div className="shell hero-grid">
        <div className="min-w-0">
          <div data-hero-reveal="role">
            <p className="hero-role">{portfolio.person.positioning}</p>
            <p className="hero-specializations">{portfolio.heroMeta.join(" · ")}</p>
          </div>
          <h1 id="hero-title" data-hero-reveal="headline" className="hero-headline text-balance">I build AI products, agentic workflows and automation.</h1>
          <p data-hero-reveal="description" className="hero-description text-pretty">{portfolio.person.summary}</p>
          <div data-hero-reveal="actions" className="hero-actions">
            <ActionLink href="#work" variant="primary">View selected work</ActionLink>
            <ActionLink href={portfolio.person.resumeHref} download>Resume</ActionLink>
          </div>
          <div className="hero-support">
            <p className="inline-flex min-w-0 items-center gap-2">
              <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full bg-success" />
              {portfolio.person.availability}
            </p>
            {github ? <a href={github.href} target="_blank" rel="noreferrer" className="focus-ring inline-flex min-h-8 items-center gap-1.5 text-text-secondary transition-colors hover:text-accent-text">GitHub<ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" /><span className="sr-only"> (opens in a new tab)</span></a> : null}
          </div>
        </div>
        <figure data-hero-reveal="preview" className="hero-preview min-w-0">
          <a href="#agentic-ops" className="hero-preview-link focus-ring group" aria-label="Explore Agentic Ops in selected work">
            <div className="hero-preview-heading">
              <div className="min-w-0">
                <p className="font-medium text-text-primary">Agentic Ops</p>
                <p className="mt-0.5 text-[11px] leading-5 text-text-secondary">Public sample demo · Fictional records</p>
              </div>
              <ArrowDown aria-hidden="true" className="h-4 w-4 shrink-0 text-accent-text" />
            </div>
            <div className="hero-preview-image">
              <picture>
                <source media="(max-width: 639px)" srcSet={mobilePreview.srcSet} sizes={mobilePreview.sizes} width={840} height={650} />
                <Image
                  src="/agentic-ops/hero-approvals.webp"
                  alt="Agentic Ops approval inbox showing two sample outreach drafts held for human review. The interface is labelled DEMO / SAMPLE with fictional records."
                  width={1208}
                  height={900}
                  sizes="(min-width: 1376px) 636px, (min-width: 1200px) 46vw, (min-width: 864px) 800px, (min-width: 640px) calc(100vw - 64px), calc(100vw - 32px)"
                  quality={90}
                  loading="eager"
                  fetchPriority="high"
                  className="h-auto w-full"
                />
              </picture>
            </div>
            <div className="hero-preview-footer">
              <span>Human approval first</span>
              <span className="hero-preview-intent">Explore project<ArrowDown aria-hidden="true" className="h-3 w-3" /></span>
            </div>
          </a>
          <figcaption className="sr-only">Actual product interface. The public demo makes no AI calls, sends no email and performs no CRM writes.</figcaption>
        </figure>
      </div>
      <HeroEntrance />
    </section>
  );
}
