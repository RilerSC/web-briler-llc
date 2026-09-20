import Reveal from "../Reveal";

type MemberSurfaceProps = {
  eyebrow: string;
  title: string;
  lede: string;
  surfaces: string[];
};

export default function MemberSurface({ eyebrow, title, lede, surfaces }: MemberSurfaceProps) {
  const [primary, ...rest] = surfaces;

  return (
    <section className="study-ch study-ch--result" id="member" aria-labelledby="member-h">
      <div className="wrap">
        <Reveal>
          <p className="eyebrow">{eyebrow}</p>
          <h2 className="study-ch__title" id="member-h">
            {title}
          </h2>
          <p className="study-hero__lede">{lede}</p>
        </Reveal>
        <Reveal delay={80}>
          <div className="msurf" aria-hidden="true">
            <div className="msurf__hero">{primary}</div>
            <ul>
              {rest.map((surface) => (
                <li key={surface}>{surface}</li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
