import { portfolio } from "@/data/portfolio";
import { SectionLabel } from "@/components/ui/section-label";
import { Ribbon } from "@/components/ui/ribbon";

export function Experience() {
  return (
    <section
      id="experience"
      className="shell section experience-section"
      aria-labelledby="experience-title"
    >
      <SectionLabel index="03" id="experience-title" title="Experience" />
      <div className="experience-timeline">
        <Ribbon variant="rail" gradient="ember" />
        {portfolio.experience.map((experience) => (
          <article
            key={`${experience.company}-${experience.role}`}
            className="experience-node grid-12"
          >
            <div className="experience-company">
              <span className="timeline-node" aria-hidden="true" />
              <p className="meta">{experience.period}</p>
              <p className="display">{experience.company}</p>
              {experience.format ? (
                <p className="text-slate">{experience.format}</p>
              ) : null}
            </div>
            <div className="experience-role">
              <h3 className="display">{experience.role}</h3>
              <ul>
                {experience.responsibilities.map((responsibility) => (
                  <li key={responsibility}>{responsibility}</li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
