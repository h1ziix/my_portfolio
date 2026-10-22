import { portfolio } from "@/data/portfolio";
import { Ribbon } from "@/components/ui/ribbon";
import { RevealInView } from "@/components/ui/reveal-in-view";

const listFormat = new Intl.ListFormat("en-GB", {
  style: "long",
  type: "conjunction",
});
export function HowIWork() {
  return (
    <section
      id="process"
      className="process-section section"
      aria-labelledby="process-title"
    >
      <div className="shell">
        <span className="section-index meta" aria-hidden="true">
          04 /
        </span>
        <h2 id="process-title" className="display text-section">
          How I work
        </h2>
        <div className="process-statement grid-12">
          <blockquote className="display process-quote">
            AI assists the implementation. I own the architecture, review the
            code and verify the result.
          </blockquote>
          {portfolio.assistants.length ? (
            <p className="process-assistants">
              Day to day I use {listFormat.format(portfolio.assistants)}.
            </p>
          ) : null}
        </div>
        <div className="process-sequence">
          <Ribbon
            variant="rail"
            gradient="ember"
            className="process-connector"
            steps={3}
          />
          <ol className="process-list">
            {portfolio.process.map((step, index) => (
              <li key={step.title} className="process-step">
                <RevealInView order={index}>
                  <span className="meta process-step-number" aria-hidden="true">
                    0{index + 1}
                  </span>
                  <h3 className="display">{step.title}</h3>
                  <p>{step.description}</p>
                </RevealInView>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
