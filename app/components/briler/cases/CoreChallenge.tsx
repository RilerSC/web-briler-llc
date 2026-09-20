import Reveal from "../Reveal";

type CoreChallengeProps = {
  eyebrow: string;
  title: string;
  body: string[];
  domains: string[];
  core: string;
};

export default function CoreChallenge({ eyebrow, title, body, domains, core }: CoreChallengeProps) {
  return (
    <section className="study-ch study-ch--problem" id="challenge" aria-labelledby="challenge-h">
      <div className="wrap study-split">
        <Reveal>
          <p className="eyebrow">{eyebrow}</p>
          <h2 className="study-ch__title" id="challenge-h">
            {title}
          </h2>
          <div className="study__copy">
            {body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </Reveal>
        <Reveal delay={80}>
          <div className="coregrid" aria-hidden="true">
            <p className="coregrid__hub">{core}</p>
            <ul>
              {domains.map((domain) => (
                <li key={domain}>{domain}</li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
