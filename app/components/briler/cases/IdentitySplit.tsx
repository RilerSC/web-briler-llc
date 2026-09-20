import Reveal from "../Reveal";

type IdentitySplitProps = {
  eyebrow: string;
  title: string;
  lede: string;
  channel: string;
  channelItems: string[];
  core: string;
  coreItems: string[];
};

export default function IdentitySplit({
  eyebrow,
  title,
  lede,
  channel,
  channelItems,
  core,
  coreItems,
}: IdentitySplitProps) {
  return (
    <section className="study-ch study-ch--deck" id="identity" aria-labelledby="identity-h">
      <div className="wrap">
        <Reveal>
          <p className="eyebrow">{eyebrow}</p>
          <h2 className="study-ch__title" id="identity-h">
            {title}
          </h2>
          <p className="study-hero__lede">{lede}</p>
        </Reveal>
        <Reveal delay={80}>
          <div className="idsplit">
            <div className="idsplit__pane idsplit__pane--channel">
              <p>{channel}</p>
              <ul>
                {channelItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="idsplit__pane idsplit__pane--core">
              <p>{core}</p>
              <ul>
                {coreItems.map((item) => (
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
