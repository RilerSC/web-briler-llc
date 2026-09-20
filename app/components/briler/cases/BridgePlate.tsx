type BridgePlateProps = {
  caption: string;
  core: string;
  bridge: string;
  crm: string;
};

export default function BridgePlate({ caption, core, bridge, crm }: BridgePlateProps) {
  return (
    <figure className="bridge" aria-label={caption}>
      <svg className="bridge__svg" viewBox="0 0 1100 400" aria-hidden="true">
        <rect x="40" y="48" width="268" height="304" fill="url(#hsys-hatch)" stroke="rgba(255,255,255,0.12)" />
        <rect x="58" y="68" width="232" height="18" fill="rgba(255,255,255,0.08)" />
        <rect x="58" y="98" width="176" height="12" fill="rgba(255,255,255,0.05)" />
        <rect x="58" y="122" width="210" height="12" fill="rgba(255,255,255,0.05)" />
        <rect x="58" y="146" width="148" height="12" fill="rgba(255,255,255,0.05)" />
        <rect x="58" y="186" width="232" height="18" fill="rgba(255,255,255,0.08)" />
        <rect x="58" y="216" width="196" height="12" fill="rgba(255,255,255,0.05)" />
        <rect x="58" y="240" width="164" height="12" fill="rgba(255,255,255,0.05)" />
        <rect x="58" y="280" width="232" height="40" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.1)" />

        <rect x="430" y="36" width="240" height="328" fill="rgba(14,206,248,0.06)" stroke="rgba(14,206,248,0.5)" />
        <path className="xlate__run" d="M308 200H430" fill="none" stroke="#0ECEF8" strokeWidth="1.5" />
        <path className="xlate__run" d="M670 200H792" fill="none" stroke="#0071F6" strokeWidth="1.5" />
        <path className="xlate__run" d="M792 132H670L550 200L430 268H308" fill="none" stroke="rgba(255,255,255,0.16)" strokeWidth="1.1" />
        <rect x="544" y="194" width="12" height="12" fill="#0ECEF8" transform="rotate(45 550 200)" />

        <circle cx="860" cy="110" r="22" fill="rgba(0,113,246,0.12)" stroke="rgba(0,113,246,0.55)" />
        <rect x="838" y="186" width="44" height="44" fill="rgba(0,113,246,0.08)" stroke="rgba(0,113,246,0.45)" transform="rotate(45 860 208)" />
        <rect x="838" y="278" width="44" height="44" fill="rgba(160,73,251,0.1)" stroke="rgba(160,73,251,0.5)" />
        <rect x="980" y="194" width="12" height="12" fill="#A049FB" transform="rotate(45 986 200)" />
      </svg>
      <div className="bridge__stack" aria-hidden="true">
        <span>{core}</span>
        <span>{bridge}</span>
        <span>{crm}</span>
      </div>
      <figcaption className="bridge__labels">
        <span>{core}</span>
        <span>{bridge}</span>
        <span>{crm}</span>
      </figcaption>
    </figure>
  );
}
