import Reveal from "../Reveal";

type RailItem = { k: string; v: string };

type NetworkArchProps = {
  eyebrow: string;
  title: string;
  lede: string;
  app: string;
  appName: string;
  data: string;
  dataName: string;
  identity: string;
  identityName: string;
  rail: RailItem[];
};

export default function NetworkArch({
  eyebrow,
  title,
  lede,
  app,
  appName,
  data,
  dataName,
  identity,
  identityName,
  rail,
}: NetworkArchProps) {
  return (
    <section className="study-ch study-ch--field" id="network-depth" aria-labelledby="network-depth-h">
      <div className="wrap">
        <Reveal>
          <p className="eyebrow">{eyebrow}</p>
          <h2 className="study-ch__title" id="network-depth-h">
            {title}
          </h2>
          <p className="study-hero__lede">{lede}</p>
        </Reveal>
        <Reveal delay={80}>
          <div className="netarch" aria-hidden="true">
            <div className="netarch__row">
              <div className="netarch__node">
                <span>{app}</span>
                <strong>{appName}</strong>
              </div>
              <div className="netarch__node netarch__node--geo">
                <span>{data}</span>
                <strong>{dataName}</strong>
              </div>
              <div className="netarch__node">
                <span>{identity}</span>
                <strong>{identityName}</strong>
              </div>
            </div>
            <ul className="netarch__rail">
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
