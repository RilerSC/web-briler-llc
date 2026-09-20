type CoexistenceDiagramProps = {
  caption: string;
  legacy: string;
  legacyLabel: string;
  coexist: string;
  coexistLabel: string;
  modern: string;
  modernLabel: string;
};

export default function CoexistenceDiagram({
  caption,
  legacy,
  legacyLabel,
  coexist,
  coexistLabel,
  modern,
  modernLabel,
}: CoexistenceDiagramProps) {
  return (
    <figure className="flow" aria-label={caption}>
      <div className="flow__node">
        <span className="flow__k">{legacyLabel}</span>
        <span className="flow__v">{legacy}</span>
      </div>
      <span className="flow__join" aria-hidden="true" />
      <div className="flow__node flow__node--mid">
        <span className="flow__k">{coexistLabel}</span>
        <span className="flow__v">{coexist}</span>
      </div>
      <span className="flow__join" aria-hidden="true" />
      <div className="flow__node flow__node--end">
        <span className="flow__k">{modernLabel}</span>
        <span className="flow__v">{modern}</span>
      </div>
    </figure>
  );
}
