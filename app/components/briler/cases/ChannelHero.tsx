import Reveal from "../Reveal";
import ChannelPlate from "./ChannelPlate";

type ChannelHeroProps = {
  eyebrow: string;
  client: string;
  project: string;
  title: string;
  titleLine: string;
  lede: string;
  caption: string;
  core: string;
  layer: string;
  member: string;
};

export default function ChannelHero({
  eyebrow,
  client,
  project,
  title,
  titleLine,
  lede,
  caption,
  core,
  layer,
  member,
}: ChannelHeroProps) {
  return (
    <header className="study-hero study-hero--channel">
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
          <ChannelPlate caption={caption} core={core} layer={layer} member={member} />
        </Reveal>
      </div>
    </header>
  );
}
