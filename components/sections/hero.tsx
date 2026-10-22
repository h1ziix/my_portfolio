import { portfolio } from "@/data/portfolio";
import { ActionLink } from "@/components/ui/action-link";
import { Ribbon } from "@/components/ui/ribbon";
import { CountUpNumber } from "@/components/ui/count-up-number";
import { FilmReel } from "@/components/projects/film-reel";

const proof = [
  { value: "100–200", label: "docs/day (was 20–25)" },
  { value: "~2,000", label: "employees covered" },
  { value: "70+", label: "automated tests" },
];

export function Hero() {
  const { person } = portfolio;
  const films = portfolio.projects
    .filter((project) => project.hierarchy === "featured")
    .flatMap((project) => {
      const media = project.media.find(
        (item) => item.type === "video" && item.poster,
      );
      return media
        ? [
            {
              slug: project.slug,
              name: project.name,
              subtitle: project.subtitle,
              media,
            },
          ]
        : [];
    });
  return (
    <section id="top" className="hero tape-clip" aria-labelledby="hero-title">
      <div className="shell hero-composition grid-12">
        <div className="hero-copy">
          <p className="availability-pill meta">
            <span aria-hidden="true" className="availability-dot" />
            Available for work · UTC+5
          </p>
          <p className="hero-eyebrow meta">{person.positioning}</p>
          <h1 id="hero-title" className="hero-title display">
            <span>From idea to </span>
            <span className="hero-accent">
              working product.
              <Ribbon
                variant="underline"
                gradient="ember"
                className="hero-underline"
              />
            </span>
          </h1>
          <p className="hero-intro">
            I’m {person.name}. {person.profile}
          </p>
          <div className="hero-actions">
            <ActionLink href="#work" variant="primary">
              Explore my work
            </ActionLink>
            <ActionLink href="#contact">Let’s talk</ActionLink>
          </div>
          <p className="hero-location meta">
            {person.location}. {person.workFormat}.
          </p>
        </div>
        <FilmReel films={films} />
      </div>
      <div className="shell hero-proof-wrap">
        <ul aria-label="KazEcoFood production results" className="hero-proof">
          {proof.map((item) => (
            <li key={item.value}>
              <strong className="display proof-number">
                <CountUpNumber value={item.value} />
              </strong>
              <span className="meta proof-label">{item.label}</span>
              <span className="meta proof-source">
                KazEcoFood, in production
              </span>
            </li>
          ))}
        </ul>
        <a href="#skills" className="text-link focus-ring meta">
          Where I use it <span aria-hidden="true">↗</span>
        </a>
      </div>
      <div className="hero-tape">
        <Ribbon
          variant="band"
          gradient="ember"
          accessibleText="My core stack: TypeScript, Next.js, React, NestJS, FastAPI, PostgreSQL, Python, Docker."
        >
          TypeScript ✦ Next.js ✦ React ✦ NestJS ✦ FastAPI ✦ PostgreSQL ✦ Python
          ✦ Docker
        </Ribbon>
      </div>
    </section>
  );
}
