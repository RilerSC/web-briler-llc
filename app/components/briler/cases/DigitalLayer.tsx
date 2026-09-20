import Reveal from "../Reveal";

type LayerPoint = { k: string; v: string };

type DigitalLayerProps = {
  eyebrow: string;
  title: string;
  lede: string;
  nodes: {
    member: string;
    experience: string;
    service: string;
    identity: string;
    core: string;
  };
  points: LayerPoint[];
};

export default function DigitalLayer({ eyebrow, title, lede, nodes, points }: DigitalLayerProps) {
  return (
    <section className="study-ch study-ch--deck" id="layer" aria-labelledby="layer-h">
      <div className="wrap">
        <Reveal>
          <p className="eyebrow">{eyebrow}</p>
          <h2 className="study-ch__title" id="layer-h">
            {title}
          </h2>
          <p className="study-hero__lede">{lede}</p>
        </Reveal>
        <Reveal delay={80}>
          <div className="membrane" aria-hidden="true">
            <p className="membrane__node membrane__node--member">{nodes.member}</p>
            <p className="membrane__node">{nodes.experience}</p>
            <p className="membrane__band">{nodes.service}</p>
            <div className="membrane__fork">
              <p className="membrane__node membrane__node--id">{nodes.identity}</p>
              <p className="membrane__node membrane__node--core">{nodes.core}</p>
            </div>
          </div>
        </Reveal>
        <Reveal delay={120}>
          <ul className="membrane__points">
            {points.map((point) => (
              <li key={point.k}>
                <strong>{point.k}</strong>
                <span>{point.v}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
