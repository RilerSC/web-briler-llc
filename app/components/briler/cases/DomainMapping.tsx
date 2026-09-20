import Reveal from "../Reveal";

type DomainMappingProps = {
  eyebrow: string;
  title: string;
  lede: string;
  source: string;
  sourceItems: string[];
  layer: string;
  target: string;
  targetItems: string[];
};

export default function DomainMapping({
  eyebrow,
  title,
  lede,
  source,
  sourceItems,
  layer,
  target,
  targetItems,
}: DomainMappingProps) {
  return (
    <section className="study-ch study-ch--result" id="mapping" aria-labelledby="mapping-h">
      <div className="wrap">
        <Reveal>
          <p className="eyebrow">{eyebrow}</p>
          <h2 className="study-ch__title" id="mapping-h">
            {title}
          </h2>
          <p className="study-hero__lede">{lede}</p>
        </Reveal>
        <Reveal delay={80}>
          <div className="maptree">
            <div className="maptree__col">
              <p>{source}</p>
              <ul>
                {sourceItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <p className="maptree__span">{layer}</p>
            <div className="maptree__col maptree__col--crm">
              <p>{target}</p>
              <ul>
                {targetItems.map((item) => (
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
