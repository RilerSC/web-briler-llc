export const C = {
  signal: [14, 206, 248] as const,
  accent: [0, 113, 246] as const,
  terminal: [160, 73, 251] as const,
};

export type RGB = readonly [number, number, number];

export const rgba = (c: RGB, a: number) => `rgba(${c[0]},${c[1]},${c[2]},${a})`;
export const mix = (a: RGB, b: RGB, t: number): [number, number, number] =>
  a.map((v, i) => Math.round(v + (b[i] - v) * t)) as [number, number, number];
export const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));

export function prng(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (Math.imul(s, 1664525) + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

export const SVGNS = "http://www.w3.org/2000/svg";

export function svgEl<K extends keyof SVGElementTagNameMap>(name: K, attrs: Record<string, string>) {
  const e = document.createElementNS(SVGNS, name);
  for (const k in attrs) e.setAttribute(k, attrs[k]);
  return e as SVGElementTagNameMap[K];
}

export function measure(pts: number[][]) {
  const acc = [0];
  for (let i = 1; i < pts.length; i++) {
    acc.push(acc[i - 1] + Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]));
  }
  return acc;
}

export function pointAt(pts: number[][], acc: number[], d: number) {
  const total = acc[acc.length - 1];
  d = clamp(d, 0, total);
  let i = 1;
  while (i < acc.length - 1 && acc[i] < d) i++;
  const seg = acc[i] - acc[i - 1] || 1;
  const t = (d - acc[i - 1]) / seg;
  return [
    pts[i - 1][0] + (pts[i][0] - pts[i - 1][0]) * t,
    pts[i - 1][1] + (pts[i][1] - pts[i - 1][1]) * t,
  ];
}

export function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
