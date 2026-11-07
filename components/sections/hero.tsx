import type { CSSProperties } from "react";
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

type FloatingGlyph = {
  char: string;
  x: string;
  y: string;
  size: string;
  duration: string;
  delay: string;
  dx: string;
  dy: string;
  rot: string;
  opacity: number;
  mono?: boolean;
  tone?: "ember" | "cobalt" | "gold" | "rose";
};

const floatingGlyphs: FloatingGlyph[] = [
  { char: "F", x: "-4%", y: "6%", size: "38px", duration: "6.4s", delay: "-0.5s", dx: "18px", dy: "-22px", rot: "14deg", opacity: 0.44, tone: "ember" },
  { char: "TS", x: "18%", y: "1%", size: "15px", duration: "5.6s", delay: "-1.8s", dx: "-16px", dy: "18px", rot: "-12deg", opacity: 0.54, mono: true, tone: "cobalt" },
  { char: "I", x: "44%", y: "3%", size: "30px", duration: "7.2s", delay: "-3.1s", dx: "18px", dy: "-16px", rot: "18deg", opacity: 0.4, tone: "gold" },
  { char: "AI", x: "68%", y: "0%", size: "16px", duration: "5.9s", delay: "-2.4s", dx: "-20px", dy: "16px", rot: "10deg", opacity: 0.56, mono: true, tone: "rose" },
  { char: "{ }", x: "88%", y: "6%", size: "18px", duration: "6.9s", delay: "-4.2s", dx: "16px", dy: "20px", rot: "-15deg", opacity: 0.5, mono: true, tone: "gold" },
  { char: "D", x: "93%", y: "20%", size: "42px", duration: "7.6s", delay: "-1.1s", dx: "-18px", dy: "-22px", rot: "20deg", opacity: 0.4, tone: "ember" },
  { char: "λ", x: "76%", y: "15%", size: "25px", duration: "5.5s", delay: "-2.9s", dx: "15px", dy: "-18px", rot: "-18deg", opacity: 0.5, mono: true, tone: "rose" },
  { char: "E", x: "-5%", y: "26%", size: "34px", duration: "6.7s", delay: "-3.7s", dx: "20px", dy: "16px", rot: "-14deg", opacity: 0.42, tone: "gold" },
  { char: "A", x: "60%", y: "26%", size: "38px", duration: "6.2s", delay: "-0.9s", dx: "-16px", dy: "-20px", rot: "16deg", opacity: 0.42, tone: "ember" },
  { char: "/>", x: "84%", y: "33%", size: "17px", duration: "5.9s", delay: "-4.8s", dx: "18px", dy: "-14px", rot: "12deg", opacity: 0.52, mono: true, tone: "cobalt" },
  { char: "W", x: "-6%", y: "45%", size: "46px", duration: "7.8s", delay: "-2.2s", dx: "22px", dy: "-18px", rot: "-16deg", opacity: 0.38, tone: "ember" },
  { char: "O", x: "52%", y: "42%", size: "34px", duration: "6.3s", delay: "-1.5s", dx: "-18px", dy: "20px", rot: "22deg", opacity: 0.42, tone: "rose" },
  { char: "R", x: "73%", y: "45%", size: "40px", duration: "7.1s", delay: "-3.4s", dx: "16px", dy: "-22px", rot: "-19deg", opacity: 0.42, tone: "gold" },
  { char: "K", x: "91%", y: "48%", size: "32px", duration: "6.5s", delay: "-0.4s", dx: "-15px", dy: "18px", rot: "15deg", opacity: 0.44, tone: "cobalt" },
  { char: "P", x: "-4%", y: "64%", size: "40px", duration: "7.0s", delay: "-4.1s", dx: "18px", dy: "20px", rot: "17deg", opacity: 0.4, tone: "cobalt" },
  { char: "U", x: "64%", y: "60%", size: "36px", duration: "6.6s", delay: "-1.9s", dx: "-20px", dy: "-16px", rot: "-20deg", opacity: 0.42, tone: "ember" },
  { char: "C", x: "81%", y: "64%", size: "34px", duration: "6.0s", delay: "-3.2s", dx: "16px", dy: "18px", rot: "14deg", opacity: 0.42, tone: "rose" },
  { char: "T", x: "94%", y: "68%", size: "42px", duration: "7.4s", delay: "-0.8s", dx: "-16px", dy: "-20px", rot: "-16deg", opacity: 0.38, tone: "gold" },
  { char: "SQL", x: "46%", y: "73%", size: "14px", duration: "5.7s", delay: "-2.5s", dx: "15px", dy: "-16px", rot: "9deg", opacity: 0.5, mono: true, tone: "cobalt" },
  { char: "API", x: "74%", y: "76%", size: "15px", duration: "6.2s", delay: "-4.5s", dx: "-18px", dy: "16px", rot: "-11deg", opacity: 0.5, mono: true, tone: "ember" },
  { char: "✦", x: "27%", y: "14%", size: "22px", duration: "5.2s", delay: "-1.3s", dx: "14px", dy: "-20px", rot: "45deg", opacity: 0.58, tone: "gold" },
  { char: "∞", x: "86%", y: "84%", size: "26px", duration: "6.8s", delay: "-2.1s", dx: "18px", dy: "-14px", rot: "18deg", opacity: 0.48, mono: true, tone: "rose" },
];

function renderKineticWords(
  text: string,
  startOffset = 0,
  variant: "top" | "accent" = "top",
) {
  let charCounter = startOffset;
  const words = text.split(" ");
  return words.map((word, wordIdx) => (
    <span key={`${word}-${wordIdx}`} className="hero-word">
      {Array.from(word).map((ch, idx) => {
        const currentIndex = charCounter++;
        return (
          <span
            key={`${ch}-${idx}`}
            data-char={ch}
            className={`hero-char hero-char--${variant}`}
            style={{ "--char-i": currentIndex } as CSSProperties}
          >
            {ch}
          </span>
        );
      })}
      {wordIdx < words.length - 1 ? (
        <span className="hero-space">&nbsp;</span>
      ) : null}
    </span>
  ));
}

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
          <div className="hero-glyph-cloud" aria-hidden="true">
            <span className="hero-aura hero-aura--one" />
            <span className="hero-aura hero-aura--two" />
            {floatingGlyphs.map((item, idx) => (
              <span
                key={`${item.char}-${idx}`}
                data-tone={item.tone ?? "ember"}
                className={`hero-floating-glyph ${item.mono ? "meta" : "display"}`}
                style={
                  {
                    "--gx": item.x,
                    "--gy": item.y,
                    "--gs": item.size,
                    "--gd": item.duration,
                    "--gdelay": item.delay,
                    "--dx": item.dx,
                    "--dy": item.dy,
                    "--rot": item.rot,
                    "--gop": item.opacity,
                    "--gi": idx,
                  } as CSSProperties
                }
              >
                {item.char}
              </span>
            ))}
          </div>
          <p className="availability-pill meta">
            <span aria-hidden="true" className="availability-dot" />
            Available for work · UTC+5
          </p>
          <p className="hero-eyebrow meta">{person.positioning}</p>
          <h1 id="hero-title" className="hero-title display">
            <span className="sr-only">From idea to working product.</span>
            <span aria-hidden="true" className="hero-line-top">
              {renderKineticWords("From idea to", 0, "top")}
            </span>
            <span aria-hidden="true" className="hero-accent">
              <span className="hero-line-accent">
                {renderKineticWords("working", 12, "accent")}
              </span>
              <span className="hero-line-accent">
                {renderKineticWords("product.", 19, "accent")}
              </span>
              <Ribbon
                variant="underline"
                gradient="ember"
                className="hero-underline"
              />
            </span>
          </h1>
          <p className="hero-intro">
            I’m <span className="hero-intro-highlight">{person.name}</span>.{" "}
            {person.profile}
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
