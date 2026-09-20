import Reveal from "../Reveal";

type NetworkChallengeProps = {
  eyebrow: string;
  title: string;
  lede: string;
  from: string;
  to: string;
};

export default function NetworkChallenge({ eyebrow, title, lede, from, to }: NetworkChallengeProps) {
  return (
    <section className="study-ch study-ch--problem" id="challenge" aria-labelledby="net-challenge-h">
      <div className="wrap">
        <Reveal>
          <p className="eyebrow">{eyebrow}</p>
          <h2 className="study-ch__title" id="net-challenge-h">
            {title}
          </h2>
          <p className="study-hero__lede">{lede}</p>
        </Reveal>
        <Reveal delay={80}>
          <div className="netpair" aria-hidden="true">
            <div className="netpair__pane netpair__pane--loose">
              <p>{from}</p>
              <i />
              <i />
              <i />
              <i />
              <i />
              <i />
            </div>
            <div className="netpair__pane netpair__pane--bound">
              <p>{to}</p>
              <b />
              <b />
              <b />
              <b />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
