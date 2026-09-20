import Reveal from "../Reveal";

type TwoSystemsProps = {
  eyebrow: string;
  title: string;
  lede: string;
  core: string;
  coreLede: string;
  coreItems: string[];
  crm: string;
  crmLede: string;
  crmItems: string[];
};

export default function TwoSystems({
  eyebrow,
  title,
  lede,
  core,
  coreLede,
  coreItems,
  crm,
  crmLede,
  crmItems,
}: TwoSystemsProps) {
  return (
    <section className="study-ch study-ch--problem" id="systems" aria-labelledby="systems-h">
      <div className="wrap">
        <Reveal>
          <p className="eyebrow">{eyebrow}</p>
          <h2 className="study-ch__title" id="systems-h">
            {title}
          </h2>
          <p className="study-hero__lede">{lede}</p>
        </Reveal>
        <Reveal delay={80}>
          <div className="twoworlds">
            <div className="twoworlds__pane twoworlds__pane--core">
              <p>{core}</p>
              <span>{coreLede}</span>
              <ul>
                {coreItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="twoworlds__pane twoworlds__pane--crm">
              <p>{crm}</p>
              <span>{crmLede}</span>
              <ul>
                {crmItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
