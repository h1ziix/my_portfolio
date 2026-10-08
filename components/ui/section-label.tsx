type SectionLabelProps = {
  eyebrow: string;
  title: string;
  kicker?: string;
  id?: string;
};

export function SectionLabel({ eyebrow, title, kicker, id }: SectionLabelProps) {
  return (
    <div className="min-w-0 border-t border-border pt-6">
      <p className="font-mono text-xs uppercase tracking-caps text-accent-text">{eyebrow}</p>
      <h2 id={id} className="mt-3 max-w-3xl text-balance text-section font-semibold leading-tight tracking-tight text-text-primary">{title}</h2>
      {kicker ? <p className="text-width mt-3 text-pretty text-base leading-7 text-text-secondary md:text-lg">{kicker}</p> : null}
    </div>
  );
}
