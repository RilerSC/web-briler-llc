import type { SolutionId } from "@/app/lib/solutions";

export default function SolutionMark({ family }: { family: SolutionId }) {
  return (
    <svg className="solpage__mark" viewBox="0 0 420 180" aria-hidden="true">
      {family === "software" ? (
        <>
          <rect x="36" y="86" width="220" height="52" fill="rgba(0,113,246,0.08)" stroke="rgba(0,113,246,0.45)" />
          <rect x="86" y="48" width="220" height="52" fill="rgba(14,206,248,0.06)" stroke="rgba(14,206,248,0.4)" />
          <rect x="136" y="12" width="220" height="52" fill="rgba(160,73,251,0.08)" stroke="rgba(160,73,251,0.45)" />
        </>
      ) : null}
      {family === "integration" ? (
        <>
          <rect x="24" y="48" width="118" height="84" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.16)" />
          <rect x="278" y="48" width="118" height="84" fill="rgba(0,113,246,0.08)" stroke="rgba(0,113,246,0.45)" />
          <path d="M142 90H278" fill="none" stroke="url(#sol-run)" strokeWidth="1.6" />
          <rect x="204" y="78" width="12" height="12" fill="#0ECEF8" transform="rotate(45 210 84)" />
        </>
      ) : null}
      {family === "legacy" ? (
        <>
          <path d="M28 128H140L196 52H392" fill="none" stroke="url(#sol-run)" strokeWidth="1.5" />
          <path d="M28 128H168L220 128H360" fill="none" stroke="rgba(14,206,248,0.45)" strokeWidth="1.2" />
          <rect x="20" y="100" width="56" height="56" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.14)" />
          <rect x="332" y="28" width="68" height="44" fill="rgba(0,113,246,0.1)" stroke="rgba(0,113,246,0.5)" />
        </>
      ) : null}
      {family === "automation" ? (
        <>
          <path d="M28 90H132L168 50H252L288 90H392" fill="none" stroke="url(#sol-run)" strokeWidth="1.6" />
          <circle cx="132" cy="90" r="4" fill="#0071F6" />
          <circle cx="252" cy="50" r="4" fill="#0ECEF8" />
          <circle cx="392" cy="90" r="4" fill="#A049FB" />
        </>
      ) : null}
      {family === "infrastructure" ? (
        <>
          <rect x="48" y="118" width="324" height="36" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.12)" />
          <rect x="80" y="70" width="260" height="36" fill="rgba(0,113,246,0.08)" stroke="rgba(0,113,246,0.4)" />
          <rect x="112" y="22" width="196" height="36" fill="rgba(160,73,251,0.08)" stroke="rgba(160,73,251,0.45)" />
        </>
      ) : null}
      <defs>
        <linearGradient id="sol-run" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#0071F6" />
          <stop offset="1" stopColor="#A049FB" />
        </linearGradient>
      </defs>
    </svg>
  );
}
