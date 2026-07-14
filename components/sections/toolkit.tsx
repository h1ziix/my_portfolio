import { portfolio } from "@/data/portfolio";
import { Reveal } from "@/components/ui/reveal";

export function Toolkit() {
  return (
    <section className="shell py-20 md:py-28" aria-label="Current toolkit">
      <Reveal className="grid border-l border-t hairline md:grid-cols-5">
        {portfolio.toolkit.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.label}
              className="min-h-44 border-b border-r hairline p-5"
            >
              <Icon aria-hidden="true" className="h-5 w-5 text-signal-violet" />
              <p className="mt-8 font-mono text-[0.68rem] uppercase tracking-caps text-zinc-500">
                {item.label}
              </p>
              <p className="mt-3 text-lg font-medium leading-7 text-white">
                {item.value}
              </p>
            </div>
          );
        })}
      </Reveal>
    </section>
  );
}
