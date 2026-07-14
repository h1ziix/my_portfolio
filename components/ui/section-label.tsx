type SectionLabelProps = {
  eyebrow: string;
  title: string;
  kicker?: string;
  id?: string;
};

export function SectionLabel({ eyebrow, title, kicker, id }: SectionLabelProps) {
  return (
    <div className="grid gap-5 border-t hairline pt-5 md:grid-cols-[0.36fr_1fr]">
      <p className="font-mono text-xs uppercase tracking-caps text-signal-violet">
        {eyebrow}
      </p>
      <div>
        <h2
          id={id}
          className="max-w-4xl text-balance text-4xl font-semibold leading-[0.95] text-white md:text-6xl"
        >
          {title}
        </h2>
        {kicker ? (
          <p className="mt-5 max-w-2xl text-pretty text-base leading-7 text-zinc-400 md:text-lg">
            {kicker}
          </p>
        ) : null}
      </div>
    </div>
  );
}
