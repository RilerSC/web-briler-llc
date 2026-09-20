import Reveal from "../Reveal";

type RailItem = { k: string; v: string };

type BridgeArchProps = {
  eyebrow: string;
  title: string;
  lede: string;
  hubspot: string;
  engine: string;
  engineName: string;
  sql: string;
  rail: RailItem[];
};

export default function BridgeArch({
  eyebrow,
  title,
  lede,
  hubspot,
  engine,
  engineName,
  sql,
  rail,
}: BridgeArchProps) {
  return (
    <section className="study-ch study-ch--field" id="bridge-depth" aria-labelledby="bridge-depth-h">
      <div className="wrap">
        <Reveal>
          <p className="eyebrow">{eyebrow}</p>
          <h2 className="study-ch__title" id="bridge-depth-h">
            {title}
          </h2>
          <p className="study-hero__lede">{lede}</p>
        </Reveal>
        <Reveal delay={80}>
          <div className="barch" aria-hidden="true">
            <div className="barch__node">{hubspot}</div>
            <div className="barch__node barch__node--engine">
              <span>{engine}</span>
              <strong>{engineName}</strong>
            </div>
            <div className="barch__node">{sql}</div>
            <ul className="barch__rail">
              {rail.map((item) => (
                <li key={item.v}>
                  <span>{item.k}</span>
                  {item.v}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
