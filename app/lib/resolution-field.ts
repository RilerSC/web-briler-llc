import { C, clamp, measure, mix, pointAt, prefersReducedMotion, prng, rgba } from "./briler-geom";

type Node = { x: number; y: number; flash: number };
type Path = { pts: number[][]; full: number[][]; acc: number[]; vertAcc: number[]; nodes: Node[] };
type Packet = { p: Path; d: number; v: number; total: number };

/**
 * Resolution Field. Composition is the D2 signature with the approved
 * focal correction: the arc sits ~12% closer to the copy than the lab prototype.
 */
export function mountResolutionField(canvas: HTMLCanvasElement) {
  const context = canvas.getContext("2d");
  if (!context) return () => {};
  const ctx: CanvasRenderingContext2D = context;

  const REDUCED = prefersReducedMotion();
  let W = 0;
  let H = 0;
  let dpr = 1;
  let paths: Path[] = [];
  let packets: Packet[] = [];
  let statics: {
    trunks: number[];
    joinX: number;
    termX: number;
    spineY: number;
    trunkTail: (ty: number) => number[][];
  } | null = null;
  let arc: { x: number; y: number; r: number; a0: number; a1: number } | null = null;
  let layer: HTMLCanvasElement | null = null;
  let raf = 0;
  let last = 0;
  let timer: ReturnType<typeof setTimeout> | undefined;

  function build() {
    const r = prng(20260919);
    const narrow = W < 780;
    const entryX = narrow ? 0.03 * W : 0.06 * W;
    const entrySpread = narrow ? 0.07 * W : 0.07 * W;
    const joinX = narrow ? 0.5 * W : 0.5 * W;
    const spineY = 0.5 * H;
    const convX = narrow ? 0.63 * W : 0.6 * W;
    const termX = narrow ? 0.7 * W : 0.645 * W;
    const trunkOff = narrow ? 0.2 * H : 0.245 * H;
    const trunks = [spineY - trunkOff, spineY, spineY + trunkOff];
    const R = narrow ? Math.min(0.2 * H, 0.16 * W) : Math.min(0.33 * H, 0.15 * W);
    const minRun = 0.022 * W;

    arc = { x: termX + R * 0.16, y: spineY, r: R, a0: -1.46, a1: 1.46 };

    function trunkTail(ty: number) {
      const dy = spineY - ty;
      const pts = [[joinX, ty]];
      if (Math.abs(dy) > 0.5) {
        pts.push([convX - Math.abs(dy), ty]);
        pts.push([convX, spineY]);
      }
      pts.push([termX, spineY]);
      return pts;
    }

    const tail: number[][] = [];
    for (let i = 0; i <= 46; i++) {
      const a = arc.a0 + ((arc.a1 - arc.a0) * i) / 46;
      tail.push([arc.x + Math.cos(a) * arc.r, arc.y + Math.sin(a) * arc.r]);
    }

    const count = narrow ? 11 : 34;
    paths = [];
    for (let i = 0; i < count; i++) {
      let y0 = (0.06 + (0.88 * (i + 0.5)) / count + (r() - 0.5) * 0.05) * H;
      y0 = clamp(y0, 0.04 * H, 0.96 * H);
      const x0 = entryX + r() * entrySpread;
      const budget = joinX - x0 - minRun * 2;
      let ti = 0;
      let best = Infinity;
      trunks.forEach((ty, k) => {
        const d = Math.abs(ty - y0);
        if (d < best) {
          best = d;
          ti = k;
        }
      });
      if (r() > 0.62) {
        const alt = (ti + (r() > 0.5 ? 1 : 2)) % 3;
        if (Math.abs(trunks[alt] - y0) <= budget) ti = alt;
      }
      const ty = trunks[ti];
      let dy = ty - y0;
      if (Math.abs(dy) > budget) {
        dy = Math.sign(dy) * Math.max(budget, 0);
        y0 = ty - dy;
      }
      const ady = Math.abs(dy);
      const slack = Math.max(joinX - x0 - ady - minRun * 2, 0);
      const x1 = x0 + minRun + r() * slack;
      const pts = [[x0, y0], [x1, y0]];
      if (ady > 0.5) pts.push([x1 + ady, ty]);
      pts.push([joinX, ty]);
      const full = pts.concat(trunkTail(ty).slice(1), tail);
      paths.push({
        pts,
        full,
        acc: measure(full),
        vertAcc: measure(pts),
        nodes: pts.map((p) => ({ x: p[0], y: p[1], flash: 0 })),
      });
    }

    statics = { trunks, joinX, termX, spineY, trunkTail };
    packets = [];
    paths.forEach((p, i) => {
      const total = p.acc[p.acc.length - 1];
      const n = 1 + (i % 2);
      for (let k = 0; k < n; k++) {
        packets.push({
          p,
          d: total * ((i * 0.37 + k * 0.5 + r() * 0.3) % 1),
          v: (narrow ? 62 : 82) + r() * 46,
          total,
        });
      }
    });
    drawStatic();
  }

  function drawStatic() {
    if (!arc || !statics) return;
    layer = document.createElement("canvas");
    layer.width = canvas.width;
    layer.height = canvas.height;
    const g = layer.getContext("2d");
    if (!g) return;
    g.scale(dpr, dpr);
    const { trunks, joinX, termX, spineY, trunkTail } = statics;

    const glow = g.createRadialGradient(arc.x, arc.y, 0, arc.x, arc.y, arc.r * 2.7);
    glow.addColorStop(0, rgba(C.accent, 0.3));
    glow.addColorStop(0.4, rgba(C.accent, 0.085));
    glow.addColorStop(1, "rgba(0,0,0,0)");
    g.fillStyle = glow;
    g.fillRect(0, 0, W, H);

    const poly = (pts: number[][], stroke: string, width: number) => {
      g.beginPath();
      g.moveTo(pts[0][0], pts[0][1]);
      for (let i = 1; i < pts.length; i++) g.lineTo(pts[i][0], pts[i][1]);
      g.strokeStyle = stroke;
      g.lineWidth = width;
      g.stroke();
    };

    paths.forEach((p) => poly(p.pts, "rgba(255,255,255,0.14)", 1));
    trunks.forEach((ty) => poly(trunkTail(ty), rgba(C.accent, 0.55), 1.2));
    poly([[joinX, spineY], [termX, spineY]], rgba(C.signal, 0.45), 1.4);

    g.beginPath();
    g.arc(arc.x, arc.y, arc.r * 1.32, arc.a0 * 0.74, arc.a1 * 0.74);
    g.strokeStyle = rgba(C.accent, 0.16);
    g.lineWidth = 1;
    g.stroke();

    const grad = g.createLinearGradient(arc.x - arc.r, arc.y, arc.x + arc.r, arc.y);
    grad.addColorStop(0, rgba(C.signal, 0.95));
    grad.addColorStop(0.45, rgba(C.accent, 1));
    grad.addColorStop(1, rgba(C.terminal, 0.9));
    g.save();
    g.shadowColor = rgba(C.accent, 0.95);
    g.shadowBlur = 34;
    g.beginPath();
    g.arc(arc.x, arc.y, arc.r, arc.a0, arc.a1);
    g.strokeStyle = grad;
    g.lineWidth = 2.1;
    g.stroke();
    g.stroke();
    g.restore();

    const dia = (x: number, y: number, s: number, fill: string) => {
      g.save();
      g.translate(x, y);
      g.rotate(Math.PI / 4);
      g.fillStyle = fill;
      g.fillRect(-s / 2, -s / 2, s, s);
      g.restore();
    };
    paths.forEach((p) => p.nodes.forEach((n) => dia(n.x, n.y, 3.2, "rgba(255,255,255,0.26)")));
    trunks.forEach((ty) => dia(joinX, ty, 6, rgba(C.accent, 0.9)));
    g.save();
    g.shadowColor = rgba(C.signal, 0.9);
    g.shadowBlur = 18;
    dia(termX, spineY, 10, rgba(C.signal, 1));
    g.restore();
  }

  function frame(dt: number) {
    if (!layer) return;
    ctx.clearRect(0, 0, W, H);
    ctx.drawImage(layer, 0, 0, W, H);
    ctx.save();
    ctx.globalCompositeOperation = "lighter";
    for (const k of packets) {
      if (dt) {
        const prev = k.d;
        k.d += k.v * dt;
        if (k.d > k.total) k.d -= k.total;
        if (k.d > prev) {
          const va = k.p.vertAcc;
          for (let i = 0; i < va.length; i++) {
            if (va[i] > prev && va[i] <= k.d) k.p.nodes[i].flash = 1;
          }
        }
      }
      const t = k.d / k.total;
      const col =
        t < 0.42
          ? mix(C.signal, C.accent, t / 0.42)
          : t < 0.78
            ? mix(C.accent, [110, 170, 255], (t - 0.42) / 0.36)
            : mix([110, 170, 255], C.terminal, (t - 0.78) / 0.22);
      for (let i = 7; i >= 0; i--) {
        const d = k.d - i * 4.4;
        if (d < 0) continue;
        const [x, y] = pointAt(k.p.full, k.p.acc, d);
        const f = 1 - i / 7;
        ctx.fillStyle = rgba(col, 0.5 * f * f);
        ctx.fillRect(x - 0.9, y - 0.9, 1.8, 1.8);
      }
      const [hx, hy] = pointAt(k.p.full, k.p.acc, k.d);
      ctx.fillStyle = rgba(col, 0.95);
      ctx.beginPath();
      ctx.arc(hx, hy, 1.7, 0, 6.2832);
      ctx.fill();
    }
    for (const p of paths) {
      for (const n of p.nodes) {
        if (n.flash <= 0) continue;
        ctx.save();
        ctx.translate(n.x, n.y);
        ctx.rotate(Math.PI / 4);
        ctx.fillStyle = rgba(C.signal, 0.7 * n.flash);
        const s = 3 + 3.5 * n.flash;
        ctx.fillRect(-s / 2, -s / 2, s, s);
        ctx.restore();
        if (dt) n.flash = Math.max(0, n.flash - dt * 1.7);
      }
    }
    ctx.restore();
  }

  function loop(ts: number) {
    const dt = last ? Math.min((ts - last) / 1000, 0.05) : 0;
    last = ts;
    frame(dt);
    raf = requestAnimationFrame(loop);
  }

  function resize() {
    const rect = canvas.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = rect.width;
    H = rect.height;
    canvas.width = Math.round(W * dpr);
    canvas.height = Math.round(H * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    build();
    if (REDUCED) frame(0);
  }

  resize();
  if (!REDUCED) raf = requestAnimationFrame(loop);

  const ro = new ResizeObserver(() => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      cancelAnimationFrame(raf);
      last = 0;
      resize();
      if (!REDUCED) raf = requestAnimationFrame(loop);
    }, 180);
  });
  ro.observe(canvas);

  return () => {
    cancelAnimationFrame(raf);
    ro.disconnect();
    clearTimeout(timer);
  };
}
