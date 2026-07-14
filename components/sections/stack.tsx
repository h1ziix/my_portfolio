import { portfolio } from "@/data/portfolio";
import { Reveal } from "@/components/ui/reveal";
import { SectionLabel } from "@/components/ui/section-label";

export function Stack() {
  return (
    <section id="stack" className="shell py-24 md:py-32" aria-labelledby="stack-title">
      <Reveal>
        <SectionLabel
          id="stack-title"
          eyebrow="Engineering stack"
          title="A capability matrix for product, backend, data and AI delivery."
        />
      </Reveal>

      <div className="mt-16 grid border-l border-t hairline md:grid-cols-2 xl:grid-cols-5">
        {portfolio.stack.map((group, index) => {
          const Icon = group.icon;
          return (
            <Reveal
              key={group.area}
              delay={index * 0.04}
              className="min-h-[360px] border-b border-r hairline p-6"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-mono text-xs uppercase tracking-caps text-signal-violet">
                  {group.area}
                </h3>
                <Icon aria-hidden="true" className="h-5 w-5 text-zinc-500" />
              </div>
              <ul className="mt-12 grid gap-4">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="border-b border-white/10 pb-3 text-xl font-medium text-zinc-100"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
