import Reveal from "../Reveal";

type TransitionFieldProps = {
  eyebrow: string;
  title: string;
  body: string[];
  caption: string;
  legacy: string;
  legacyLabel: string;
  coexist: string;
  coexistLabel: string;
  modern: string;
  modernLabel: string;
  lanes: {
    legacy: string[];
    transition: string[];
    modern: string[];
  };
};

export default function TransitionField({
  eyebrow,
  title,
  body,
  caption,
  legacy,
  legacyLabel,
  coexist,
  coexistLabel,
  modern,
  modernLabel,
  lanes,
}: TransitionFieldProps) {
  const columns = [
    { key: "legacy", name: legacy, label: legacyLabel, items: lanes.legacy, tone: "legacy" },
    { key: "coexist", name: coexist, label: coexistLabel, items: lanes.transition, tone: "mid" },
    { key: "modern", name: modern, label: modernLabel, items: lanes.modern, tone: "modern" },
  ];

  return (
    <section className="study-ch study-ch--deck" id="intervention" aria-labelledby="intervention-h">
      <div className="wrap">
        <Reveal>
          <p className="eyebrow">{eyebrow}</p>
          <h2 className="study-ch__title" id="intervention-h">
            {title}
          </h2>
          <div className="study__copy study__copy--brief">
            {body.slice(0, 2).map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </Reveal>
        <Reveal delay={80}>
          <figure className="xfer" aria-label={caption}>
            <svg className="xfer__svg" viewBox="0 0 1100 90" aria-hidden="true">
              <path className="hsys__run" d="M80 45H1020" fill="none" stroke="url(#hsys-run)" strokeWidth="1.4" />
              <rect x="74" y="39" width="12" height="12" fill="#0ECEF8" transform="rotate(45 80 45)" />
              <rect x="1014" y="39" width="12" height="12" fill="#A049FB" transform="rotate(45 1020 45)" />
            </svg>
            <div className="xfer__cols">
              {columns.map((col) => (
                <div key={col.key} className={`xfer__col xfer__col--${col.tone}`}>
                  <p className="xfer__k">{col.label}</p>
                  <p className="xfer__v">{col.name}</p>
                  <ul>
                    {col.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </figure>
        </Reveal>
        {body[2] ? (
          <Reveal delay={120}>
            <p className="study__note">{body[2]}</p>
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}
