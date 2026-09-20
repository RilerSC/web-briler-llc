import Reveal from "../Reveal";
import BridgePlate from "./BridgePlate";

type BridgeHeroProps = {
  eyebrow: string;
  client: string;
  project: string;
  title: string;
  titleLine: string;
  lede: string;
  caption: string;
  core: string;
  bridge: string;
  crm: string;
};

export default function BridgeHero({
  eyebrow,
  client,
  project,
  title,
  titleLine,
  lede,
  caption,
  core,
  bridge,
  crm,
}: BridgeHeroProps) {
  return (
    <header className="study-hero study-hero--bridge">
      <div className="wrap study-hero__grid">
        <Reveal>
          <div className="study-hero__copy">
            <p className="eyebrow">{eyebrow}</p>
            <p className="study-hero__who">
              {client}
              <span>{project}</span>
            </p>
            <h1 className="study-hero__title">
              {title}
              <span>{titleLine}</span>
            </h1>
            <p className="study-hero__lede">{lede}</p>
          </div>
        </Reveal>
        <Reveal delay={90}>
          <BridgePlate caption={caption} core={core} bridge={bridge} crm={crm} />
        </Reveal>
      </div>
    </header>
  );
}
