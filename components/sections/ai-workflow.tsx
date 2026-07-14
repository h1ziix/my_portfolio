import { portfolio } from "@/data/portfolio";
import { Reveal } from "@/components/ui/reveal";
import { SectionLabel } from "@/components/ui/section-label";

export function AiWorkflow() {
  return (
    <section
      id="ai-workflow"
      className="shell py-24 md:py-32"
      aria-labelledby="ai-workflow-title"
    >
      <Reveal>
        <SectionLabel
          id="ai-workflow-title"
          eyebrow="AI-native development"
          title={"AI is not my replacement. It's part of my engineering system."}
          kicker="Codex, Claude Code, ChatGPT and LLM APIs are useful only when the engineer still owns context, architecture, review, edge cases, integration and delivery quality."
        />
      </Reveal>

      <div className="mt-16 grid gap-10 lg:grid-cols-[1fr_0.82fr]">
        <div className="grid border-t hairline">
          {portfolio.aiWorkflow.map((step, index) => (
            <Reveal
              as="article"
              key={step.label}
              delay={index * 0.04}
              className="grid gap-4 border-b hairline py-6 sm:grid-cols-[120px_160px_1fr]"
            >
              <p className="font-mono text-xs uppercase tracking-caps text-signal-violet">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="font-mono text-xs uppercase tracking-caps text-zinc-200">
                {step.label}
              </h3>
              <p className="text-lg leading-8 text-zinc-400">{step.body}</p>
            </Reveal>
          ))}
        </div>

        <Reveal className="border hairline bg-black/35 p-5">
          <div className="border-b hairline pb-4 font-mono text-xs uppercase tracking-caps text-zinc-500">
            $ agent
          </div>
          <div className="grid gap-4 pt-5 font-mono text-sm text-zinc-300">
            {portfolio.agentLines.map((line, index) => (
              <p key={line} className="flex gap-3">
                <span className="text-signal-violet">&gt;</span>
                <span>{line}</span>
                <span className="ml-auto text-zinc-600">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </p>
            ))}
          </div>
          <div className="mt-10 border-t hairline pt-5">
            <p className="text-pretty text-lg leading-8 text-zinc-300">
              The workflow is practical: AI-assisted debugging, refactoring,
              codebase exploration, prompt engineering, rapid prototyping and
              integrations, all reviewed against the actual system.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
