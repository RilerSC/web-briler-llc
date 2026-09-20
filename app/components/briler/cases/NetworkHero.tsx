import Reveal from "../Reveal";
import NetworkField from "./NetworkField";

type NetworkHeroProps = {
  eyebrow: string;
  client: string;
  project: string;
  title: string;
  titleLine: string;
  lede: string;
  caption: string;
  community: string;
  trust: string;
  discovery: string;
  connection: string;
};

export default function NetworkHero({
  eyebrow,
  client,
  project,
  title,
  titleLine,
  lede,
  caption,
  community,
  trust,
  discovery,
  connection,
}: NetworkHeroProps) {
  return (
    <header className="study-hero study-hero--network">
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
          <NetworkField
            caption={caption}
            community={community}
            trust={trust}
            discovery={discovery}
            connection={connection}
          />
        </Reveal>
      </div>
    </header>
  );
}
