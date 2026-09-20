type ChannelPlateProps = {
  caption: string;
  core: string;
  layer: string;
  member: string;
};

const CORE_CELLS = [
  [8, 14],
  [28, 8],
  [46, 18],
  [16, 36],
  [38, 42],
  [10, 58],
  [32, 64],
  [50, 54],
  [22, 78],
  [44, 80],
];

export default function ChannelPlate({ caption, core, layer, member }: ChannelPlateProps) {
  return (
    <figure className="channel" aria-label={caption}>
      <svg className="channel__svg" viewBox="0 0 1100 420" aria-hidden="true">
        <defs>
          <pattern id="xlate-hatch" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <path d="M0 0H8" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
          </pattern>
          <linearGradient id="xlate-signal" x1="0" y1="0" x2="1" y2="0">
            <stop stopColor="rgba(255,255,255,0.18)" />
            <stop offset="0.42" stopColor="#0ECEF8" />
            <stop offset="1" stopColor="#0071F6" />
          </linearGradient>
        </defs>

        <rect x="36" y="36" width="300" height="348" fill="url(#xlate-hatch)" stroke="rgba(255,255,255,0.1)" />
        {CORE_CELLS.map(([x, y], i) => (
          <rect
            key={`${x}-${y}`}
            x={56 + x * 4.2}
            y={56 + y * 3.2}
            width={i % 3 === 0 ? 54 : 42}
            height={i % 4 === 0 ? 36 : 28}
            fill="rgba(255,255,255,0.03)"
            stroke="rgba(255,255,255,0.12)"
          />
        ))}

        <rect x="500" y="28" width="88" height="364" fill="rgba(14,206,248,0.06)" stroke="rgba(14,206,248,0.55)" />
        <path d="M544 28V392" fill="none" stroke="#0ECEF8" strokeWidth="1.4" className="xlate__run" />
        <rect x="538" y="204" width="12" height="12" fill="#0ECEF8" transform="rotate(45 544 210)" />

        <rect x="760" y="78" width="280" height="264" fill="rgba(0,113,246,0.06)" stroke="rgba(0,113,246,0.42)" />
        <rect x="788" y="108" width="96" height="64" fill="rgba(0,113,246,0.08)" stroke="rgba(0,113,246,0.4)" />
        <rect x="904" y="108" width="108" height="64" fill="rgba(0,113,246,0.05)" stroke="rgba(0,113,246,0.32)" />
        <rect x="788" y="192" width="224" height="72" fill="rgba(0,113,246,0.07)" stroke="rgba(0,113,246,0.38)" />
        <rect x="788" y="284" width="132" height="32" fill="rgba(160,73,251,0.08)" stroke="rgba(160,73,251,0.45)" />
        <rect x="1028" y="204" width="12" height="12" fill="#A049FB" transform="rotate(45 1034 210)" />

        <path className="xlate__run" d="M336 96H500L544 210" fill="none" stroke="url(#xlate-signal)" strokeWidth="1.3" />
        <path className="xlate__run" d="M336 168H500" fill="none" stroke="url(#xlate-signal)" strokeWidth="1.5" />
        <path className="xlate__run" d="M336 248H500L544 210H760" fill="none" stroke="url(#xlate-signal)" strokeWidth="1.6" />
        <path className="xlate__run" d="M336 320H480" fill="none" stroke="rgba(255,255,255,0.16)" strokeWidth="1.1" />
      </svg>
      <div className="channel__stack" aria-hidden="true">
        <div className="channel__band channel__band--core">
          <span>{core}</span>
          <i />
          <i />
          <i />
          <i />
        </div>
        <div className="channel__band channel__band--layer">{layer}</div>
        <div className="channel__band channel__band--member">
          <span>{member}</span>
          <b />
          <b />
        </div>
      </div>
      <figcaption className="channel__labels">
        <span>{core}</span>
        <span>{layer}</span>
        <span>{member}</span>
      </figcaption>
    </figure>
  );
}
