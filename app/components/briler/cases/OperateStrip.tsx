import Reveal from "../Reveal";

type OperateStripProps = {
  eyebrow: string;
  title: string;
  lede: string;
  verbs: string[];
};

export default function OperateStrip({ eyebrow, title, lede, verbs }: OperateStripProps) {
  return (
    <section className="study-ch" id="operate" aria-labelledby="operate-h">
      <div className="wrap">
        <Reveal>
          <p className="eyebrow">{eyebrow}</p>
          <h2 className="study-ch__title" id="operate-h">
            {title}
          </h2>
          <p className="study-hero__lede">{lede}</p>
        </Reveal>
        <Reveal delay={80}>
          <ol className="operate">
            {verbs.map((verb, i) => (
              <li key={verb}>
                <span>{String(i + 1).padStart(2, "0")}</span>
                {verb}
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}
