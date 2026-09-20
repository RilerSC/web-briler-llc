import { Link } from "@/navigation";
import Arrow from "../Arrow";
import Reveal from "../Reveal";

type CaseCTAProps = {
  eyebrow: string;
  title: string;
  lede: string;
  contact: string;
  schedule: string;
  caption: string;
  legacy: string;
  modern: string;
};

export default function CaseCTA({
  eyebrow,
  title,
  lede,
  contact,
  schedule,
  caption,
  legacy,
  modern,
}: CaseCTAProps) {
  return (
    <section className="study-ch study-ch--resolve" aria-labelledby="case-cta-h">
      <div className="wrap study-resolve">
        <Reveal>
          <div>
            <p className="eyebrow">{eyebrow}</p>
            <h2 className="study-ch__title" id="case-cta-h">
              {title}
            </h2>
            <p className="study-hero__lede">{lede}</p>
            <div className="study-cta__actions">
              <Link className="btn btn--primary" href="/#contact">
                {contact}
                <Arrow />
              </Link>
              <Link className="btn btn--ghost" href="/agendar">
                {schedule}
              </Link>
            </div>
          </div>
        </Reveal>
        <Reveal delay={80}>
          <figure className="resolve" aria-label={caption}>
            <svg viewBox="0 0 420 160" aria-hidden="true">
              <path className="hsys__run" d="M28 80H160L210 80H392" fill="none" stroke="url(#hsys-run)" strokeWidth="1.6" />
              <rect x="20" y="48" width="88" height="64" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.12)" />
              <rect x="312" y="40" width="88" height="80" fill="rgba(160,73,251,0.08)" stroke="rgba(160,73,251,0.55)" />
              <rect x="386" y="74" width="12" height="12" fill="#A049FB" transform="rotate(45 392 80)" />
            </svg>
            <figcaption>
              <span>{legacy}</span>
              <span>{modern}</span>
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
