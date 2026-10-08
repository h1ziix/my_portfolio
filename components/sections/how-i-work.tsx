import { portfolio } from "@/data/portfolio";
import { Reveal } from "@/components/ui/reveal";
import { SectionLabel } from "@/components/ui/section-label";

export function HowIWork() {
  return (
    <section
      id="process"
      className="content-shell section-space"
      aria-labelledby="process-title"
    >
      <Reveal>
        <SectionLabel
          id="process-title"
          eyebrow="04 / How I work"
          title="From context to delivery"
          kicker="AI assists the implementation. I own the architecture, review the code and verify the result."
        />
      </Reveal>

      <Reveal className="mt-8 md:mt-10">
        <ol className="grid min-w-0 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {portfolio.process.map((step, index) => (
            <li
              key={step.title}
              className="min-w-0 border-t border-border-strong pt-4"
            >
              <span className="font-mono text-xs text-accent-text">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 break-words text-2xl font-medium tracking-tight text-text-primary">
                {step.title}
              </h3>
              <p className="mt-3 text-pretty text-base leading-7 text-text-secondary">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </Reveal>
    </section>
  );
}
