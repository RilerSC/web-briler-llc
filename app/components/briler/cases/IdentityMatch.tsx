import Reveal from "../Reveal";

type IdentityMatchProps = {
  eyebrow: string;
  title: string;
  lede: string;
  from: string;
  match: string;
  to: string;
};

export default function IdentityMatch({ eyebrow, title, lede, from, match, to }: IdentityMatchProps) {
  return (
    <section className="study-ch study-ch--deck" id="identity-match" aria-labelledby="idmatch-h">
      <div className="wrap">
        <Reveal>
          <p className="eyebrow">{eyebrow}</p>
          <h2 className="study-ch__title" id="idmatch-h">
            {title}
          </h2>
          <p className="study-hero__lede">{lede}</p>
        </Reveal>
        <Reveal delay={80}>
          <div className="idmatch" aria-hidden="true">
            <p>{from}</p>
            <span>{match}</span>
            <p>{to}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
