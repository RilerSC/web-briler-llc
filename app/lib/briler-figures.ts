import { prefersReducedMotion, prng, svgEl } from "./briler-geom";

export function drawProcessTrack(svg: SVGSVGElement) {
  const REDUCED = prefersReducedMotion();
  const rect = svg.getBoundingClientRect();
  const W = rect.width;
  const H = rect.height;
  if (!W || !H) return;
  svg.setAttribute("viewBox", `0 0 ${W} ${H}`);
  svg.replaceChildren();

  const r = prng(90210);
  const mid = H / 2;
  const zA = 0.23 * W;
  const zB = 0.5 * W;
  const zC = 0.77 * W;
  const g = svgEl("g", {});
  svg.appendChild(g);

  const line = (d: string, stroke: string, w: number, extra: Record<string, string> = {}) =>
    g.appendChild(svgEl("path", { d, fill: "none", stroke, "stroke-width": String(w), ...extra }));
  const dia = (x: number, y: number, s: number, fill: string, op: number) =>
    g.appendChild(
      svgEl("rect", {
        x: String(x - s / 2),
        y: String(y - s / 2),
        width: String(s),
        height: String(s),
        transform: `rotate(45 ${x} ${y})`,
        fill,
        "fill-opacity": String(op),
      })
    );

  for (let i = 0; i < 26; i++) {
    dia(0.02 * W + r() * (zA - 0.04 * W), 0.12 * H + r() * 0.76 * H, 3.4, "#ffffff", 0.16 + r() * 0.2);
  }

  const rows = 4;
  const cols = 5;
  const latX = (c: number) => zA + 0.03 * W + (c * (zB - zA - 0.06 * W)) / (cols - 1);
  const latY = (row: number) => 0.16 * H + (row * 0.68 * H) / (rows - 1);
  for (let c = 0; c < cols - 1; c++) {
    for (let row = 0; row < rows; row++) {
      const step = latY(1) - latY(0);
      const dx = latX(c + 1) - latX(c);
      const run = Math.max(dx - step, 2);
      if (row < rows - 1 && r() > 0.45) {
        line(`M${latX(c)} ${latY(row)}h${run}L${latX(c + 1)} ${latY(row + 1)}`, "#0071F6", 1, { "stroke-opacity": "0.42" });
      } else {
        line(`M${latX(c)} ${latY(row)}H${latX(c + 1)}`, "#0071F6", 1, { "stroke-opacity": "0.3" });
      }
    }
  }
  for (let c = 0; c < cols; c++) for (let row = 0; row < rows; row++) dia(latX(c), latY(row), 4.2, "#0071F6", 0.8);

  const bars = 3;
  for (let i = 0; i < bars; i++) {
    const y = mid + (i - (bars - 1) / 2) * 0.2 * H;
    const x0 = zB + 0.03 * W;
    const x1 = zC - 0.02 * W;
    const t = 0.055 * H;
    line(`M${x0} ${y - t}H${x1 - t}L${x1} ${y}L${x1 - t} ${y + t}H${x0}L${x0 - t} ${y}Z`, "#0ECEF8", 1, {
      "stroke-opacity": "0.5",
      fill: "#0071F6",
      "fill-opacity": "0.1",
    });
  }

  const mergeX = zC + 0.03 * W;
  const endX = W - 0.03 * W;
  for (let i = 0; i < bars; i++) {
    const y = mid + (i - (bars - 1) / 2) * 0.2 * H;
    const dy = mid - y;
    line(`M${zC - 0.02 * W} ${y}H${mergeX - Math.abs(dy)}L${mergeX} ${mid}`, "#0ECEF8", 1.2, { "stroke-opacity": "0.65" });
  }
  line(`M${mergeX} ${mid}H${endX}`, "#0ECEF8", 1.6, { "stroke-opacity": "0.9" });
  dia(endX, mid, 12, "#A049FB", 0.95);
  dia(endX, mid, 22, "#A049FB", 0.14);

  if (!REDUCED) {
    const pk = svgEl("rect", {
      x: String(mergeX - 3),
      y: String(mid - 3),
      width: "6",
      height: "6",
      fill: "#ffffff",
      transform: `rotate(45 ${mergeX} ${mid})`,
    });
    g.appendChild(pk);
    pk.appendChild(svgEl("animate", { attributeName: "x", values: `${mergeX - 3};${endX - 3}`, dur: "2.6s", repeatCount: "indefinite" }));
    pk.appendChild(svgEl("animate", { attributeName: "opacity", values: "0;1;1;0", dur: "2.6s", repeatCount: "indefinite" }));
  }
}

export function drawConverge(svg: SVGSVGElement) {
  const rect = svg.getBoundingClientRect();
  const W = rect.width;
  const H = rect.height;
  if (!W || !H) return;
  svg.setAttribute("viewBox", `0 0 ${W} ${H}`);
  svg.replaceChildren();
  const r = prng(31415);
  const cx = W / 2;
  /* Resolve below the form panel so the arc stays in the periphery. */
  const cy = H * 0.93;

  for (let i = 0; i < 26; i++) {
    const x = (i / 25) * W;
    const dx = Math.abs(cx - x);
    const startY = H * (0.05 + r() * 0.3);
    const run = Math.max(cy - startY - dx, 0);
    svg.appendChild(
      svgEl("path", {
        d: `M${x} ${startY}V${startY + run}L${cx} ${cy}`,
        fill: "none",
        stroke: dx < W * 0.1 ? "#0ECEF8" : "#0071F6",
        "stroke-opacity": String(0.09 + 0.28 * (1 - dx / (W / 2))),
        "stroke-width": "1",
      })
    );
    svg.appendChild(
      svgEl("rect", {
        x: String(x - 2),
        y: String(startY - 2),
        width: "4",
        height: "4",
        transform: `rotate(45 ${x} ${startY})`,
        fill: "#0071F6",
        "fill-opacity": "0.45",
      })
    );
  }

  const R = Math.min(W * 0.1, H * 0.16);
  const defs = svgEl("defs", {});
  const lg = svgEl("linearGradient", { id: "cvg", x1: "0", y1: "0", x2: "1", y2: "0" });
  [
    ["0", "#0ECEF8"],
    ["0.5", "#0071F6"],
    ["1", "#A049FB"],
  ].forEach(([o, c]) => lg.appendChild(svgEl("stop", { offset: o, "stop-color": c })));
  defs.appendChild(lg);
  svg.appendChild(defs);
  svg.appendChild(
    svgEl("path", {
      d: `M${cx - R} ${cy}A${R} ${R} 0 0 0 ${cx + R} ${cy}`,
      fill: "none",
      stroke: "url(#cvg)",
      "stroke-width": "1.8",
      "stroke-opacity": "0.9",
    })
  );
  svg.appendChild(
    svgEl("rect", {
      x: String(cx - 5),
      y: String(cy - 5),
      width: "10",
      height: "10",
      transform: `rotate(45 ${cx} ${cy})`,
      fill: "#0ECEF8",
    })
  );
}

export function drawProblemWire(svg: SVGSVGElement, from: DOMRect, to: DOMRect, reduced: boolean) {
  const base = svg.getBoundingClientRect();
  const W = base.width;
  const H = base.height;
  if (!W || !H) return;
  const y1 = from.top + from.height / 2 - base.top;
  const y2 = to.top + 58 - base.top;
  svg.setAttribute("viewBox", `0 0 ${W} ${H}`);
  svg.replaceChildren();
  const dy = y2 - y1;
  const d = Math.min(18, Math.abs(dy) / 2);
  const s = Math.sign(dy) || 1;
  const m = Math.max((W - 2 * d) / 2, 8);
  const path = Math.abs(dy) < 1.5 ? `M0 ${y1} H${W}` : `M0 ${y1} H${m} L${m + d} ${y1 + s * d} V${y2 - s * d} L${m + 2 * d} ${y2} H${W}`;
  const grad = svgEl("linearGradient", { id: "wg", x1: "0", x2: "1" });
  grad.appendChild(svgEl("stop", { offset: "0", "stop-color": "#0ECEF8" }));
  grad.appendChild(svgEl("stop", { offset: "1", "stop-color": "#0071F6" }));
  const defs = svgEl("defs", {});
  defs.appendChild(grad);
  svg.appendChild(defs);
  const p = svgEl("path", { d: path, fill: "none", stroke: "url(#wg)", "stroke-width": "1.2" });
  svg.appendChild(p);
  [
    [0, y1],
    [W, y2],
  ].forEach(([x, y]) => {
    svg.appendChild(
      svgEl("rect", {
        x: String(x - 3),
        y: String(y - 3),
        width: "6",
        height: "6",
        fill: "#0ECEF8",
        transform: `rotate(45 ${x} ${y})`,
      })
    );
  });
  if (!reduced) {
    const len = p.getTotalLength();
    p.style.strokeDasharray = String(len);
    p.style.strokeDashoffset = String(len);
    p.animate([{ strokeDashoffset: len }, { strokeDashoffset: 0 }], {
      duration: 520,
      easing: "cubic-bezier(.16,1,.3,1)",
      fill: "forwards",
    });
  }
}

const DASH = `<animate attributeName="stroke-dashoffset" values="120;0" dur="4.5s" repeatCount="indefinite"/>`;

export function solutionFigure(kind: "build" | "auto" | "integrate", reduced: boolean) {
  const dash = reduced ? "" : DASH;
  if (kind === "build") {
    return `<svg viewBox="0 0 220 116" fill="none" aria-hidden="true">
      <g stroke="#0071F6" stroke-opacity=".55">
        <path d="M18 92h120l16-16H34z"/><path d="M30 68h120l16-16H46z"/><path d="M42 44h120l16-16H58z"/>
      </g>
      <g fill="#0ECEF8">
        <rect x="15" y="89" width="6" height="6" transform="rotate(45 18 92)"/>
        <rect x="27" y="65" width="6" height="6" transform="rotate(45 30 68)"/>
        <rect x="39" y="41" width="6" height="6" transform="rotate(45 42 44)"/>
      </g>
      <path d="M186 28v64" stroke="#ffffff" stroke-opacity=".16"/>
      <path d="M178 28h16M178 92h16" stroke="#ffffff" stroke-opacity=".16"/>
      <path d="M42 44h120l16-16H58" stroke="#0ECEF8" stroke-width="1.4" stroke-dasharray="26 94">${dash}</path>
    </svg>`;
  }
  if (kind === "auto") {
    return `<svg viewBox="0 0 220 116" fill="none" aria-hidden="true">
      <path d="M46 26h108l18 18v40l-18 18H64L46 84z" stroke="#0071F6" stroke-opacity=".55"/>
      <path d="M46 26h108l18 18v40l-18 18H64L46 84z" stroke="#0ECEF8" stroke-width="1.5" stroke-dasharray="34 286">${dash}</path>
      <path d="M100 58h48M100 58l-18-18M100 58l-18 18" stroke="#ffffff" stroke-opacity=".2"/>
      <g fill="#0ECEF8"><rect x="97" y="55" width="6" height="6" transform="rotate(45 100 58)"/></g>
      <g fill="#0071F6">
        <rect x="79" y="37" width="5" height="5" transform="rotate(45 81.5 39.5)"/>
        <rect x="79" y="73" width="5" height="5" transform="rotate(45 81.5 75.5)"/>
        <rect x="145" y="55" width="5" height="5" transform="rotate(45 147.5 57.5)"/>
      </g>
    </svg>`;
  }
  return `<svg viewBox="0 0 220 116" fill="none" aria-hidden="true">
    <g stroke="#ffffff" stroke-opacity=".28">
      <path d="M20 30h36l8 8v48H20zM164 30h36v56h-44V38z"/>
    </g>
    <g fill="#0071F6" fill-opacity=".85">
      <rect x="30" y="41" width="7" height="7" transform="rotate(45 33.5 44.5)"/>
      <rect x="48" y="41" width="7" height="7" transform="rotate(45 51.5 44.5)"/>
      <rect x="30" y="68" width="7" height="7" transform="rotate(45 33.5 71.5)"/>
      <rect x="48" y="68" width="7" height="7" transform="rotate(45 51.5 71.5)"/>
      <rect x="166" y="41" width="7" height="7" transform="rotate(45 169.5 44.5)"/>
      <rect x="184" y="41" width="7" height="7" transform="rotate(45 187.5 44.5)"/>
      <rect x="166" y="68" width="7" height="7" transform="rotate(45 169.5 71.5)"/>
      <rect x="184" y="68" width="7" height="7" transform="rotate(45 187.5 71.5)"/>
    </g>
    <path d="M64 44h14l14 14h36l14-14h14M64 72h14l14-14" stroke="#0071F6" stroke-opacity=".6"/>
    <path d="M64 44h14l14 14h36l14-14h14" stroke="#0ECEF8" stroke-width="1.5" stroke-dasharray="24 108">${dash}</path>
    <rect x="107" y="55" width="7" height="7" transform="rotate(45 110.5 58.5)" fill="#0ECEF8"/>
  </svg>`;
}
