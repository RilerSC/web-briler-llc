import Reveal from "../Reveal";

type PlatformOpsProps = {
  eyebrow: string;
  title: string;
  lede: string;
  items: string[];
};

export default function PlatformOps({ eyebrow, title, lede, items }: PlatformOpsProps) {
  return (
    <section className="study-ch study-ch--problem" id="operations" aria-labelledby="ops-h">
      <div className="wrap">
        <Reveal>
          <p className="eyebrow">{eyebrow}</p>
          <h2 className="study-ch__title" id="ops-h">
            {title}
          </h2>
          <p className="study-hero__lede">{lede}</p>
        </Reveal>
        <Reveal delay={80}>
          <ul className="netops">
            {items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
