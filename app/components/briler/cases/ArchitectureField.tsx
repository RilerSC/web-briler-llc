import Reveal from "../Reveal";

type ArchNode = { layer: string; name: string };

type ArchitectureFieldProps = {
  eyebrow: string;
  title: string;
  lede: string;
  nodes: ArchNode[];
  notes: { title: string; body: string }[];
};

export default function ArchitectureField({ eyebrow, title, lede, nodes, notes }: ArchitectureFieldProps) {
  return (
    <section className="study-ch study-ch--field" id="depth" aria-labelledby="depth-h">
      <div className="wrap">
        <Reveal>
          <p className="eyebrow">{eyebrow}</p>
          <h2 className="study-ch__title" id="depth-h">
            {title}
          </h2>
          <p className="study-hero__lede">{lede}</p>
        </Reveal>
        <Reveal delay={80}>
          <div className="afield">
            <svg className="afield__svg" viewBox="0 0 1100 220" aria-hidden="true">
              <path className="hsys__run" d="M40 110H1060" fill="none" stroke="url(#hsys-run)" strokeWidth="1.2" />
              <path className="hsys__run" d="M160 40V180" fill="none" stroke="#0071F6" strokeOpacity="0.35" />
              <path className="hsys__run" d="M470 40V180" fill="none" stroke="#0071F6" strokeOpacity="0.28" />
              <path className="hsys__run" d="M780 40V180" fill="none" stroke="#0ECEF8" strokeOpacity="0.28" />
            </svg>
            <ol className="afield__nodes">
              {nodes.map((node, i) => (
                <li key={node.name} style={{ ["--i" as string]: String(i) }}>
                  <span>{node.layer}</span>
                  <strong>{node.name}</strong>
                </li>
              ))}
            </ol>
          </div>
        </Reveal>
        <Reveal delay={120}>
          <div className="afield__notes">
            {notes.map((note) => (
              <p key={note.title}>
                <strong>{note.title}.</strong> {note.body}
              </p>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
