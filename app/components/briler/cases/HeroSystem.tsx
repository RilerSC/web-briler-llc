type HeroSystemProps = {
  caption: string;
  legacy: string;
  legacyCore: string;
  transitionLayer: string;
  coexist: string;
  modern: string;
  modernLabel: string;
};

export default function HeroSystem({
  caption,
  legacy,
  legacyCore,
  transitionLayer,
  coexist,
  modern,
  modernLabel,
}: HeroSystemProps) {
  return (
    <figure className="hsys" aria-label={caption}>
      <svg className="hsys__svg" viewBox="0 0 720 520" role="img" aria-hidden="true">
        <rect x="36" y="70" width="196" height="380" fill="url(#hsys-hatch)" stroke="rgba(255,255,255,0.1)" />
        <rect x="52" y="98" width="164" height="18" fill="rgba(255,255,255,0.05)" />
        <rect x="52" y="128" width="132" height="10" fill="rgba(255,255,255,0.04)" />
        <rect x="52" y="150" width="148" height="10" fill="rgba(255,255,255,0.035)" />
        <rect x="52" y="172" width="118" height="10" fill="rgba(255,255,255,0.03)" />
        <rect x="52" y="206" width="164" height="148" fill="rgba(0,0,18,0.45)" stroke="rgba(255,255,255,0.08)" />
        {[0, 1, 2, 3, 4].map((i) => (
          <rect key={i} x="68" y={226 + i * 22} width={i % 2 ? 96 : 128} height="8" fill="rgba(14,206,248,0.16)" />
        ))}

        <path
          className="hsys__run"
          d="M232 168H300L356 224H420"
          fill="none"
          stroke="url(#hsys-run)"
          strokeWidth="1.4"
        />
        <path
          className="hsys__run"
          d="M232 260H340L388 260H456"
          fill="none"
          stroke="url(#hsys-run)"
          strokeWidth="1.6"
        />
        <path
          className="hsys__run"
          d="M232 352H292L348 296H420"
          fill="none"
          stroke="url(#hsys-run)"
          strokeWidth="1.4"
        />
        <path
          className="hsys__run hsys__run--hold"
          d="M232 400H300L320 420"
          fill="none"
          stroke="#0ECEF8"
          strokeWidth="1.1"
          strokeOpacity="0.45"
        />

        <rect x="356" y="196" width="88" height="128" fill="rgba(5,9,26,0.88)" stroke="rgba(14,206,248,0.45)" />
        <path d="M400 196V324" stroke="rgba(14,206,248,0.25)" />

        <rect x="500" y="88" width="184" height="92" fill="rgba(0,113,246,0.08)" stroke="rgba(0,113,246,0.5)" />
        <rect x="520" y="208" width="164" height="84" fill="rgba(0,113,246,0.06)" stroke="rgba(61,141,255,0.4)" />
        <rect x="508" y="320" width="176" height="100" fill="rgba(160,73,251,0.08)" stroke="rgba(160,73,251,0.5)" />
        <path className="hsys__run" d="M444 224H500" fill="none" stroke="url(#hsys-run)" strokeWidth="1.3" />
        <path className="hsys__run" d="M444 260H520" fill="none" stroke="url(#hsys-run)" strokeWidth="1.3" />
        <path className="hsys__run" d="M444 296H508L508 320" fill="none" stroke="url(#hsys-run)" strokeWidth="1.3" />

        <rect x="668" y="252" width="14" height="14" fill="#A049FB" transform="rotate(45 675 259)" />
      </svg>
      <figcaption className="hsys__labels">
        <span>
          <em>{legacyCore}</em>
          {legacy}
        </span>
        <span>
          <em>{transitionLayer}</em>
          {coexist}
        </span>
        <span>
          <em>{modernLabel}</em>
          {modern}
        </span>
      </figcaption>
    </figure>
  );
}
