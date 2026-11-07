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
  { char: "F", x: "-5%", y: "6%", size: "38px", duration: "6.4s", delay: "-0.5s", dx: "18px", dy: "-24px", rot: "14deg", opacity: 0.42, tone: "ember" },
  { char: "TS", x: "16%", y: "1%", size: "15px", duration: "5.6s", delay: "-1.8s", dx: "-16px", dy: "18px", rot: "-12deg", opacity: 0.52, mono: true, tone: "cobalt" },
  { char: "R", x: "32%", y: "4%", size: "26px", duration: "6.8s", delay: "-0.9s", dx: "14px", dy: "-20px", rot: "16deg", opacity: 0.38, tone: "gold" },
  { char: "I", x: "46%", y: "3%", size: "30px", duration: "7.2s", delay: "-3.1s", dx: "18px", dy: "-16px", rot: "18deg", opacity: 0.38, tone: "ember" },
  { char: "AI", x: "66%", y: "0%", size: "16px", duration: "5.9s", delay: "-2.4s", dx: "-20px", dy: "16px", rot: "10deg", opacity: 0.55, mono: true, tone: "rose" },
  { char: "{ }", x: "86%", y: "5%", size: "18px", duration: "6.9s", delay: "-4.2s", dx: "16px", dy: "22px", rot: "-15deg", opacity: 0.48, mono: true, tone: "gold" },
  { char: "M", x: "96%", y: "11%", size: "34px", duration: "6.3s", delay: "-2.0s", dx: "-22px", dy: "15px", rot: "-18deg", opacity: 0.36, tone: "cobalt" },
  { char: "D", x: "92%", y: "21%", size: "44px", duration: "7.6s", delay: "-1.1s", dx: "-18px", dy: "-24px", rot: "20deg", opacity: 0.38, tone: "ember" },
  { char: "λ", x: "76%", y: "15%", size: "26px", duration: "5.5s", delay: "-2.9s", dx: "15px", dy: "-19px", rot: "-18deg", opacity: 0.5, mono: true, tone: "rose" },
  { char: "E", x: "-6%", y: "24%", size: "34px", duration: "6.7s", delay: "-3.7s", dx: "22px", dy: "16px", rot: "-14deg", opacity: 0.4, tone: "gold" },
  { char: "A", x: "59%", y: "26%", size: "40px", duration: "6.2s", delay: "-0.9s", dx: "-16px", dy: "-22px", rot: "16deg", opacity: 0.4, tone: "ember" },
  { char: "/>", x: "83%", y: "32%", size: "17px", duration: "5.9s", delay: "-4.8s", dx: "18px", dy: "-14px", rot: "12deg", opacity: 0.52, mono: true, tone: "cobalt" },
  { char: "T", x: "98%", y: "36%", size: "36px", duration: "6.6s", delay: "-1.6s", dx: "-20px", dy: "20px", rot: "15deg", opacity: 0.36, tone: "gold" },
  { char: "W", x: "-7%", y: "44%", size: "48px", duration: "7.8s", delay: "-2.2s", dx: "24px", dy: "-18px", rot: "-16deg", opacity: 0.36, tone: "ember" },
  { char: "O", x: "50%", y: "41%", size: "34px", duration: "6.3s", delay: "-1.5s", dx: "-19px", dy: "21px", rot: "22deg", opacity: 0.42, tone: "rose" },
  { char: "R", x: "71%", y: "44%", size: "42px", duration: "7.1s", delay: "-3.4s", dx: "16px", dy: "-24px", rot: "-19deg", opacity: 0.4, tone: "gold" },
  { char: "K", x: "90%", y: "47%", size: "32px", duration: "6.5s", delay: "-0.4s", dx: "-15px", dy: "19px", rot: "15deg", opacity: 0.44, tone: "cobalt" },
  { char: "01", x: "31%", y: "35%", size: "15px", duration: "5.4s", delay: "-2.7s", dx: "14px", dy: "-16px", rot: "-10deg", opacity: 0.48, mono: true, tone: "ember" },
  { char: "I", x: "42%", y: "51%", size: "28px", duration: "6.0s", delay: "-1.2s", dx: "-14px", dy: "-18px", rot: "13deg", opacity: 0.38, tone: "gold" },
  { char: "N", x: "66%", y: "53%", size: "36px", duration: "6.9s", delay: "-3.9s", dx: "20px", dy: "16px", rot: "-17deg", opacity: 0.38, tone: "rose" },
  { char: "G", x: "86%", y: "56%", size: "38px", duration: "7.3s", delay: "-2.3s", dx: "-18px", dy: "-20px", rot: "19deg", opacity: 0.38, tone: "ember" },
  { char: "P", x: "-5%", y: "63%", size: "42px", duration: "7.0s", delay: "-4.1s", dx: "18px", dy: "22px", rot: "17deg", opacity: 0.38, tone: "cobalt" },
  { char: "D", x: "48%", y: "62%", size: "30px", duration: "6.4s", delay: "-0.6s", dx: "15px", dy: "-21px", rot: "-14deg", opacity: 0.36, tone: "gold" },
  { char: "U", x: "63%", y: "61%", size: "36px", duration: "6.6s", delay: "-1.9s", dx: "-21px", dy: "-17px", rot: "-20deg", opacity: 0.4, tone: "ember" },
  { char: "C", x: "80%", y: "64%", size: "34px", duration: "6.0s", delay: "-3.2s", dx: "17px", dy: "20px", rot: "14deg", opacity: 0.42, tone: "rose" },
  { char: "T", x: "94%", y: "68%", size: "44px", duration: "7.4s", delay: "-0.8s", dx: "-16px", dy: "-22px", rot: "-16deg", opacity: 0.36, tone: "gold" },
  { char: "SQL", x: "45%", y: "73%", size: "14px", duration: "5.7s", delay: "-2.5s", dx: "15px", dy: "-18px", rot: "9deg", opacity: 0.5, mono: true, tone: "cobalt" },
  { char: "API", x: "73%", y: "76%", size: "15px", duration: "6.2s", delay: "-4.5s", dx: "-18px", dy: "16px", rot: "-11deg", opacity: 0.5, mono: true, tone: "ember" },
  { char: "✦", x: "26%", y: "13%", size: "22px", duration: "5.2s", delay: "-1.3s", dx: "14px", dy: "-22px", rot: "45deg", opacity: 0.58, tone: "gold" },
  { char: "✦", x: "56%", y: "49%", size: "24px", duration: "5.6s", delay: "-3.8s", dx: "-16px", dy: "18px", rot: "-40deg", opacity: 0.58, tone: "rose" },
  { char: "✦", x: "91%", y: "27%", size: "19px", duration: "4.9s", delay: "-2.1s", dx: "12px", dy: "-16px", rot: "35deg", opacity: 0.54, tone: "cobalt" },
  { char: "∞", x: "88%", y: "83%", size: "26px", duration: "6.8s", delay: "-2.1s", dx: "19px", dy: "-15px", rot: "18deg", opacity: 0.46, mono: true, tone: "gold" },
  { char: "ZOD", x: "10%", y: "78%", size: "14px", duration: "6.1s", delay: "-3.6s", dx: "-14px", dy: "-17px", rot: "-8deg", opacity: 0.46, mono: true, tone: "cobalt" },
  { char: "S", x: "36%", y: "87%", size: "30px", duration: "6.9s", delay: "-1.4s", dx: "16px", dy: "-21px", rot: "19deg", opacity: 0.38, tone: "ember" },
  { char: "N", x: "60%", y: "90%", size: "32px", duration: "7.3s", delay: "-4.0s", dx: "-17px", dy: "19px", rot: "-15deg", opacity: 0.38, tone: "rose" },
  { char: "⚡", x: "79%", y: "92%", size: "19px", duration: "5.3s", delay: "-0.7s", dx: "14px", dy: "-18px", rot: "12deg", opacity: 0.5, tone: "gold" },
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
