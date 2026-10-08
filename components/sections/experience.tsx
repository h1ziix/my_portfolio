import { portfolio } from "@/data/portfolio";
import { Reveal } from "@/components/ui/reveal";
import { SectionLabel } from "@/components/ui/section-label";

export function Experience() {
  return (
    <section
      id="experience"
      className="content-shell section-space"
      aria-labelledby="experience-title"
    >
      <Reveal>
        <SectionLabel
          id="experience-title"
          eyebrow="02 / Experience"
          title="Commercial experience"
        />
      </Reveal>

      <div className="mt-8 grid gap-8 md:mt-10">
        {portfolio.experience.map((experience) => (
          <Reveal
            as="article"
            key={`${experience.company}-${experience.role}`}
            className="grid min-w-0 gap-6 border-b border-border pb-8 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.4fr)] md:gap-12"
          >
            <div className="min-w-0">
              <h3 className="break-words text-2xl font-semibold tracking-tight text-text-primary md:text-[1.75rem]">
                {experience.company}
              </h3>
              <p className="mt-2 max-w-sm text-base leading-7 text-text-secondary">
                {experience.role}
              </p>
              {experience.period || experience.format ? (
                <p className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs leading-6 text-text-muted">
                  {experience.period ? <span>{experience.period}</span> : null}
                  {experience.period && experience.format ? (
                    <span aria-hidden="true">/</span>
                  ) : null}
                  {experience.format ? <span>{experience.format}</span> : null}
                </p>
              ) : null}
            </div>

            <ul className="grid min-w-0 content-start gap-4">
              {experience.responsibilities.map((responsibility) => (
                <li
                  key={responsibility}
                  className="grid grid-cols-[8px_minmax(0,1fr)] gap-3 text-base leading-7 text-text-secondary"
                >
                  <span
                    aria-hidden="true"
                    className="mt-3 h-1 w-1 rounded-full bg-accent"
                  />
                  <span className="min-w-0 break-words">{responsibility}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
