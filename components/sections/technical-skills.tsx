import { portfolio } from "@/data/portfolio";
import { Reveal } from "@/components/ui/reveal";
import { SectionLabel } from "@/components/ui/section-label";

export function TechnicalSkills() {
  return (
    <section
      id="skills"
      className="content-shell section-space"
      aria-labelledby="skills-title"
    >
      <Reveal>
        <SectionLabel
          id="skills-title"
          eyebrow="03 / Technical skills"
          title="The engineering stack"
        />
      </Reveal>

      <Reveal className="mt-8 md:mt-10">
        <dl>
          {portfolio.skills.map((group) => (
            <div
              key={group.area}
              className="grid min-w-0 gap-3 border-b border-border py-5 first:pt-0 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.4fr)] md:gap-12"
            >
              <dt className="text-base font-medium leading-7 text-text-primary">
                {group.area}
              </dt>
              <dd className="min-w-0">
                <ul className="flex min-w-0 flex-wrap gap-x-5 gap-y-2 text-base leading-7 text-text-secondary">
                  {group.items.map((item) => (
                    <li key={item} className="min-w-0 break-words">
                      {item}
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          ))}
        </dl>

        {portfolio.assistants.length > 0 ? (
          <div className="mt-6 flex min-w-0 flex-wrap items-baseline gap-x-5 gap-y-2 text-sm leading-6">
            <h3 className="font-mono text-xs text-text-muted">
              AI-assisted development
            </h3>
            <p className="min-w-0 break-words text-text-muted">
              {portfolio.assistants.join(" · ")}
            </p>
          </div>
        ) : null}
      </Reveal>
    </section>
  );
}
