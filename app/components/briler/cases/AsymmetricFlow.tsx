import Reveal from "../Reveal";

type AsymmetricFlowProps = {
  eyebrow: string;
  title: string;
  lede: string;
  inbound: string;
  inboundItems: string[];
  outbound: string;
  outboundItems: string[];
};

export default function AsymmetricFlow({
  eyebrow,
  title,
  lede,
  inbound,
  inboundItems,
  outbound,
  outboundItems,
}: AsymmetricFlowProps) {
  return (
    <section className="study-ch" id="flow" aria-labelledby="flow-h">
      <div className="wrap">
        <Reveal>
          <p className="eyebrow">{eyebrow}</p>
          <h2 className="study-ch__title" id="flow-h">
            {title}
          </h2>
          <p className="study-hero__lede">{lede}</p>
        </Reveal>
        <Reveal delay={80}>
          <div className="asymm">
            <div className="asymm__lane asymm__lane--wide">
              <p>{inbound}</p>
              <ul>
                {inboundItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="asymm__lane asymm__lane--narrow">
              <p>{outbound}</p>
              <ul>
                {outboundItems.map((item) => (
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
