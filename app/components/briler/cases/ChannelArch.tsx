import Reveal from "../Reveal";

type RailItem = { k: string; v: string };

type ChannelArchProps = {
  eyebrow: string;
  title: string;
  lede: string;
  experience: string;
  experienceName: string;
  api: string;
  apiName: string;
  channelData: string;
  channelDataName: string;
  core: string;
  coreName: string;
  rail: RailItem[];
};

export default function ChannelArch({
  eyebrow,
  title,
  lede,
  experience,
  experienceName,
  api,
  apiName,
  channelData,
  channelDataName,
  core,
  coreName,
  rail,
}: ChannelArchProps) {
  return (
    <section className="study-ch study-ch--field" id="channel-depth" aria-labelledby="channel-depth-h">
      <div className="wrap">
        <Reveal>
          <p className="eyebrow">{eyebrow}</p>
          <h2 className="study-ch__title" id="channel-depth-h">
            {title}
          </h2>
          <p className="study-hero__lede">{lede}</p>
        </Reveal>
        <Reveal delay={80}>
          <div className="charch" aria-hidden="true">
            <div className="charch__node">
              <span>{experience}</span>
              <strong>{experienceName}</strong>
            </div>
            <div className="charch__spine" />
            <div className="charch__node charch__node--api">
              <span>{api}</span>
              <strong>{apiName}</strong>
            </div>
            <div className="charch__fork">
              <div className="charch__node charch__node--data">
                <span>{channelData}</span>
                <strong>{channelDataName}</strong>
              </div>
              <div className="charch__node charch__node--core">
                <span>{core}</span>
                <strong>{coreName}</strong>
              </div>
            </div>
            <ul className="charch__rail">
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
