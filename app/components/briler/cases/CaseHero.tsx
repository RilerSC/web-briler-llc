import Reveal from "../Reveal";
import HeroSystem from "./HeroSystem";

type CaseHeroProps = {
  eyebrow: string;
  client: string;
  project: string;
  title: string;
  lede: string;
  status: string;
  capabilities: string[];
  diagram: {
    caption: string;
    legacy: string;
    legacyCore: string;
    transitionLayer: string;
    coexist: string;
    modern: string;
    modernLabel: string;
  };
};

export default function CaseHero({
  eyebrow,
  client,
  project,
  title,
  lede,
  status,
  capabilities,
  diagram,
}: CaseHeroProps) {
  return (
    <header className="study-hero">
      <div className="wrap study-hero__grid">
        <Reveal>
          <div className="study-hero__copy">
            <p className="eyebrow">{eyebrow}</p>
            <p className="study-hero__who">
              {client}
              <span>{project}</span>
            </p>
            <h1 className="study-hero__title">{title}</h1>
            <p className="study-hero__lede">{lede}</p>
            <p className="study__status">{status}</p>
            <ul className="study__caps">
              {capabilities.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </Reveal>
        <Reveal delay={90}>
          <HeroSystem
            caption={diagram.caption}
            legacy={diagram.legacy}
            legacyCore={diagram.legacyCore}
            transitionLayer={diagram.transitionLayer}
            coexist={diagram.coexist}
            modern={diagram.modern}
            modernLabel={diagram.modernLabel}
          />
        </Reveal>
      </div>
    </header>
  );
}
