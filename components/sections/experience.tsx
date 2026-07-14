import { portfolio } from "@/data/portfolio";
import { Reveal } from "@/components/ui/reveal";
import { SectionLabel } from "@/components/ui/section-label";

export function Experience() {
  const [experience] = portfolio.experience;

  return (
    <section
      id="experience"
      className="shell py-24 md:py-32"
      aria-labelledby="experience-title"
    >
      <Reveal>
        <SectionLabel
          id="experience-title"
          eyebrow="Experience"
          title="Operational problems, mapped into tools, APIs and repeatable systems."
        />
      </Reveal>

      <Reveal className="mt-16 grid gap-10 border-y hairline py-10 lg:grid-cols-[0.42fr_1fr]">
        <div>
          <p className="font-mono text-xs uppercase tracking-caps text-zinc-500">
            {experience.period}
          </p>
          <h3 className="mt-4 text-4xl font-semibold text-white">
            {experience.company}
          </h3>
          <p className="mt-2 font-mono text-xs uppercase tracking-caps text-signal-violet">
            {experience.role}
          </p>
        </div>

        <div>
          <p className="max-w-3xl text-pretty text-xl leading-9 text-zinc-300">
            {experience.description}
          </p>

          <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_0.74fr]">
            <ul className="grid gap-4">
              {experience.facts.map((fact) => (
                <li
                  key={fact}
                  className="grid grid-cols-[16px_1fr] gap-4 text-zinc-300"
                >
                  <span className="mt-2 h-1.5 w-1.5 bg-signal-violet" />
                  <span>{fact}</span>
                </li>
              ))}
            </ul>

            <div className="grid grid-cols-2 border-l hairline pl-6">
              {experience.capabilities.map((capability) => (
                <div
                  key={capability}
                  className="border-b hairline py-4 font-mono text-[0.7rem] uppercase tracking-caps text-zinc-400"
                >
                  {capability}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
