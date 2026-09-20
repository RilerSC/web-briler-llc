import Reveal from "../Reveal";

type CapabilityFieldProps = {
  eyebrow: string;
  title: string;
  lede: string;
  items: string[];
};

export default function CapabilityField({ eyebrow, title, lede, items }: CapabilityFieldProps) {
  return (
    <section className="study-ch study-ch--type" id="capabilities" aria-labelledby="capabilities-h">
      <div className="wrap">
        <Reveal>
          <p className="eyebrow">{eyebrow}</p>
          <h2 className="study-ch__kicker" id="capabilities-h">
            {title}
          </h2>
          <p className="study-hero__lede">{lede}</p>
        </Reveal>
        <Reveal delay={80}>
          <ol className="typefield">
            {items.map((item, i) => (
              <li key={item}>
                <span>{String(i + 1).padStart(2, "0")}</span>
                {item}
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}
