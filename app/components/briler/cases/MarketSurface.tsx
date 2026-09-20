import Reveal from "../Reveal";

type MarketSurfaceProps = {
  eyebrow: string;
  title: string;
  lede: string;
  surfaces: string[];
};

export default function MarketSurface({ eyebrow, title, lede, surfaces }: MarketSurfaceProps) {
  return (
    <section className="study-ch study-ch--deck" id="experience" aria-labelledby="experience-h">
      <div className="wrap">
        <Reveal>
          <p className="eyebrow">{eyebrow}</p>
          <h2 className="study-ch__title" id="experience-h">
            {title}
          </h2>
          <p className="study-hero__lede">{lede}</p>
        </Reveal>
        <Reveal delay={80}>
          <ul className="netsurf">
            {surfaces.map((surface) => (
              <li key={surface}>{surface}</li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
