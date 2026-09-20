import type { ReactNode } from "react";
import Reveal from "../Reveal";

type CaseSectionProps = {
  id?: string;
  eyebrow: string;
  title: string;
  lede?: string;
  children: ReactNode;
};

export default function CaseSection({ id, eyebrow, title, lede, children }: CaseSectionProps) {
  return (
    <section className="sec sec--tight" id={id} aria-labelledby={id ? `${id}-h` : undefined}>
      <Reveal>
        <p className="eyebrow">{eyebrow}</p>
        <h2 className="h3" id={id ? `${id}-h` : undefined} style={{ marginTop: 18 }}>
          {title}
        </h2>
        {lede ? <p className="lede" style={{ marginTop: 16 }}>{lede}</p> : null}
      </Reveal>
      <Reveal delay={80}>
        <div style={{ marginTop: 28 }}>{children}</div>
      </Reveal>
    </section>
  );
}
