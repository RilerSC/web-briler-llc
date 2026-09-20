import Reveal from "../Reveal";

type BridgeLayerProps = {
  eyebrow: string;
  title: string;
  lede: string;
  verbs: string[];
  from: string;
  to: string;
};

export default function BridgeLayer({ eyebrow, title, lede, verbs, from, to }: BridgeLayerProps) {
  return (
    <section className="study-ch study-ch--deck" id="bridge" aria-labelledby="bridge-h">
      <div className="wrap">
        <Reveal>
          <p className="eyebrow">{eyebrow}</p>
          <h2 className="study-ch__title" id="bridge-h">
            {title}
          </h2>
          <p className="study-hero__lede">{lede}</p>
        </Reveal>
        <Reveal delay={80}>
          <div className="spanfield">
            <p className="spanfield__from">{from}</p>
            <ol>
              {verbs.map((verb) => (
                <li key={verb}>{verb}</li>
              ))}
            </ol>
            <p className="spanfield__to">{to}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
