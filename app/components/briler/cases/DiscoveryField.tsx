import Reveal from "../Reveal";

type DiscoveryFieldProps = {
  eyebrow: string;
  title: string;
  lede: string;
  nearby: string;
  products: string;
  services: string;
  sellers: string;
};

export default function DiscoveryField({
  eyebrow,
  title,
  lede,
  nearby,
  products,
  services,
  sellers,
}: DiscoveryFieldProps) {
  return (
    <section className="study-ch study-ch--result" id="discovery" aria-labelledby="discovery-h">
      <div className="wrap">
        <Reveal>
          <p className="eyebrow">{eyebrow}</p>
          <h2 className="study-ch__title" id="discovery-h">
            {title}
          </h2>
          <p className="study-hero__lede">{lede}</p>
        </Reveal>
        <Reveal delay={80}>
          <div className="geofield" aria-hidden="true">
            <div className="geofield__ring">
              <span>{nearby}</span>
            </div>
            <ul>
              <li>{products}</li>
              <li>{services}</li>
              <li>{sellers}</li>
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
