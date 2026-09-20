import Reveal from "../Reveal";

type ConnectionPathProps = {
  eyebrow: string;
  title: string;
  lede: string;
  steps: string[];
};

export default function ConnectionPath({ eyebrow, title, lede, steps }: ConnectionPathProps) {
  return (
    <section className="study-ch" id="connection" aria-labelledby="connection-h">
      <div className="wrap">
        <Reveal>
          <p className="eyebrow">{eyebrow}</p>
          <h2 className="study-ch__title" id="connection-h">
            {title}
          </h2>
          <p className="study-hero__lede">{lede}</p>
        </Reveal>
        <Reveal delay={80}>
          <ol className="netpath">
            {steps.map((step, i) => (
              <li key={step}>
                <span>{String(i + 1).padStart(2, "0")}</span>
                {step}
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}
