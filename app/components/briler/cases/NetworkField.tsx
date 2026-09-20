type NetworkFieldProps = {
  caption: string;
  community: string;
  trust: string;
  discovery: string;
  connection: string;
};

const NODES: { x: number; y: number; kind: "dim" | "live" | "link" }[] = [
  { x: 90, y: 70, kind: "dim" },
  { x: 160, y: 140, kind: "live" },
  { x: 80, y: 230, kind: "dim" },
  { x: 210, y: 80, kind: "dim" },
  { x: 250, y: 200, kind: "live" },
  { x: 180, y: 290, kind: "dim" },
  { x: 340, y: 120, kind: "live" },
  { x: 390, y: 250, kind: "live" },
  { x: 320, y: 330, kind: "dim" },
  { x: 480, y: 90, kind: "dim" },
  { x: 520, y: 210, kind: "link" },
  { x: 470, y: 310, kind: "live" },
  { x: 610, y: 150, kind: "live" },
  { x: 680, y: 80, kind: "dim" },
  { x: 700, y: 260, kind: "live" },
  { x: 620, y: 340, kind: "dim" },
  { x: 800, y: 140, kind: "dim" },
  { x: 840, y: 230, kind: "link" },
  { x: 780, y: 330, kind: "live" },
  { x: 920, y: 180, kind: "dim" },
  { x: 980, y: 280, kind: "dim" },
  { x: 900, y: 80, kind: "live" },
];

export default function NetworkField({
  caption,
  community,
  trust,
  discovery,
  connection,
}: NetworkFieldProps) {
  return (
    <figure className="netfield" aria-label={caption}>
      <svg className="netfield__svg" viewBox="0 0 1100 420" aria-hidden="true">
        <circle className="netfield__radius" cx="520" cy="210" r="168" fill="rgba(0,113,246,0.05)" stroke="rgba(0,113,246,0.45)" />
        <circle cx="520" cy="210" r="6" fill="#0071F6" />
        <path className="xlate__run" d="M250 200L340 120L390 250L470 310L520 210L610 150L700 260" fill="none" stroke="rgba(14,206,248,0.55)" strokeWidth="1.2" />
        <path className="xlate__run" d="M520 210L840 230" fill="none" stroke="#A049FB" strokeWidth="1.4" />
        {NODES.map((node) => (
          <rect
            key={`${node.x}-${node.y}`}
            x={node.x - 5}
            y={node.y - 5}
            width="10"
            height="10"
            transform={`rotate(45 ${node.x} ${node.y})`}
            fill={node.kind === "link" ? "#A049FB" : node.kind === "live" ? "#0ECEF8" : "rgba(255,255,255,0.22)"}
          />
        ))}
      </svg>
      <div className="netfield__stack" aria-hidden="true">
        <span>{community}</span>
        <span>{trust}</span>
        <span>{discovery}</span>
        <span>{connection}</span>
      </div>
      <figcaption className="netfield__labels">
        <span>{community}</span>
        <span>{trust}</span>
        <span>{discovery}</span>
        <span>{connection}</span>
      </figcaption>
    </figure>
  );
}
