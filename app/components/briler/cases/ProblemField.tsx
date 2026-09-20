import Reveal from "../Reveal";

type ProblemFieldProps = {
  eyebrow: string;
  title: string;
  body: string[];
  caption: string;
  core: string;
  legacy: string;
};

export default function ProblemField({ eyebrow, title, body, caption, core, legacy }: ProblemFieldProps) {
  const rays = ["01", "02", "03", "04", "05", "06"];

  return (
    <section className="study-ch study-ch--problem" id="problem" aria-labelledby="problem-h">
      <div className="wrap study-split">
        <Reveal>
          <div>
            <p className="eyebrow">{eyebrow}</p>
            <h2 className="study-ch__title" id="problem-h">
              {title}
            </h2>
            <div className="study__copy">
              {body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </Reveal>
        <Reveal delay={80}>
          <figure className="nucleus" aria-label={caption}>
            <svg className="nucleus__svg" viewBox="0 0 420 360" aria-hidden="true">
              <defs>
                <linearGradient id="nuc-line" x1="210" y1="180" x2="380" y2="60" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#0ECEF8" />
                  <stop offset="1" stopColor="#0071F6" />
                </linearGradient>
              </defs>
              {[
                "M210 180L78 64",
                "M210 180L210 36",
                "M210 180L342 64",
                "M210 180L78 296",
                "M210 180L210 324",
                "M210 180L342 296",
              ].map((d) => (
                <path key={d} className="hsys__run" d={d} fill="none" stroke="url(#nuc-line)" strokeWidth="1.15" />
              ))}
              {[
                [78, 64],
                [210, 36],
                [342, 64],
                [78, 296],
                [210, 324],
                [342, 296],
              ].map(([x, y], i) => (
                <g key={rays[i]}>
                  <rect x={x - 6} y={y - 6} width="12" height="12" fill="#0071F6" transform={`rotate(45 ${x} ${y})`} />
                </g>
              ))}
              <rect x="154" y="132" width="112" height="96" fill="#05091a" stroke="rgba(14,206,248,0.5)" />
              <rect x="154" y="132" width="112" height="96" fill="url(#hsys-hatch)" opacity="0.5" />
            </svg>
            <figcaption>
              <em>{core}</em>
              {legacy}
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
