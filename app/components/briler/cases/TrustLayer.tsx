import Reveal from "../Reveal";

type TrustLayerProps = {
  eyebrow: string;
  title: string;
  lede: string;
  member: string;
  verify: string;
  seller: string;
  listing: string;
  review: string;
  visible: string;
  who: string;
  what: string;
};

export default function TrustLayer({
  eyebrow,
  title,
  lede,
  member,
  verify,
  seller,
  listing,
  review,
  visible,
  who,
  what,
}: TrustLayerProps) {
  return (
    <section className="study-ch study-ch--deck" id="trust" aria-labelledby="trust-h">
      <div className="wrap">
        <Reveal>
          <p className="eyebrow">{eyebrow}</p>
          <h2 className="study-ch__title" id="trust-h">
            {title}
          </h2>
          <p className="study-hero__lede">{lede}</p>
        </Reveal>
        <Reveal delay={80}>
          <div className="trustgates">
            <div className="trustgate">
              <p>{member}</p>
              <strong>{verify}</strong>
              <em aria-hidden="true" />
              <p>{seller}</p>
              <small>{who}</small>
            </div>
            <div className="trustgate">
              <p>{listing}</p>
              <strong>{review}</strong>
              <em aria-hidden="true" />
              <p>{visible}</p>
              <small>{what}</small>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
