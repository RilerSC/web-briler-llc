import Reveal from "../Reveal";

type ControlledAutoProps = {
  eyebrow: string;
  title: string;
  lede: string;
  items: string[];
};

export default function ControlledAuto({ eyebrow, title, lede, items }: ControlledAutoProps) {
  return (
    <section className="study-ch" id="control" aria-labelledby="control-h">
      <div className="wrap">
        <Reveal>
          <p className="eyebrow">{eyebrow}</p>
          <h2 className="study-ch__title" id="control-h">
            {title}
          </h2>
          <p className="study-hero__lede">{lede}</p>
        </Reveal>
        <Reveal delay={80}>
          <ul className="ctrlauto">
            {items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
