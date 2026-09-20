export default function CaseVizDefs() {
  return (
    <svg className="study-defs" aria-hidden="true">
      <defs>
        <linearGradient id="hsys-run" x1="0" y1="0" x2="1" y2="0">
          <stop stopColor="#0ECEF8" />
          <stop offset="0.55" stopColor="#0071F6" />
          <stop offset="1" stopColor="#A049FB" />
        </linearGradient>
        <pattern id="hsys-hatch" width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <path d="M0 0H10" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
        </pattern>
      </defs>
    </svg>
  );
}
