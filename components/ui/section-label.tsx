type SectionLabelProps = {
  title: string;
  kicker?: string;
  id?: string;
  index?: string;
};

export function SectionLabel({ title, kicker, id, index }: SectionLabelProps) {
  return (
    <div className="section-heading">
      <div className="section-heading-title">{index ? <span className="section-index meta" aria-hidden="true">{index} /</span> : null}<h2 id={id} className="display text-section">{title}</h2></div>
      {kicker ? <p className="section-kicker">{kicker}</p> : null}
    </div>
  );
}
