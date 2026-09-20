/* ============================================================================
   BRILER — Visual Direction D: Intelligent Systems
   Isolated visual exploration. Not wired to the production site.

   Every generated figure on this page is routed with the same grammar the
   BRILER isotype is built from: horizontal runs and exact 45deg diagonals,
   resolving into a single curve. Nothing here uses arbitrary angles.
   ========================================================================= */
(() => {
  "use strict";

  const REDUCED = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const C = {
    signal: [14, 206, 248], // logo leading edge
    accent: [0, 113, 246], // dominant mass of the isotype
    terminal: [160, 73, 251], // logo terminal — reserved for resolution points
  };

  const rgba = (c, a) => `rgba(${c[0]},${c[1]},${c[2]},${a})`;
  const mix = (a, b, t) => a.map((v, i) => Math.round(v + (b[i] - v) * t));
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));

  /** Deterministic PRNG so generated geometry is stable across resizes. */
  function prng(seed) {
    let s = seed >>> 0;
    return () => {
      s = (s * 1664525 + 1013904223) >>> 0;
      return s / 4294967296;
    };
  }

  const SVGNS = "http://www.w3.org/2000/svg";
  const el = (n, attrs) => {
    const e = document.createElementNS(SVGNS, n);
    for (const k in attrs) e.setAttribute(k, attrs[k]);
    return e;
  };

  /* Polyline helpers ------------------------------------------------------ */
  function measure(pts) {
    const acc = [0];
    for (let i = 1; i < pts.length; i++) {
      acc.push(acc[i - 1] + Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]));
    }
    return acc;
  }

  function pointAt(pts, acc, d) {
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

  /* ==========================================================================
     1. HERO SIGNATURE — "The Resolution Field"
     --------------------------------------------------------------------------
     Scattered business signals enter on the left, get routed through an
     engineered lattice of horizontals and 45deg diagonals, converge onto three
     trunks, merge into one spine, and resolve into a single closed arc — the
     bowl of the BRILER "B" — which is the system running in production.
     ======================================================================== */
  function heroField() {
    const canvas = document.getElementById("field");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let W = 0, H = 0, dpr = 1;
    let paths = [], packets = [], statics = null, arc = null, raf = 0;

    function build() {
      const r = prng(20260919);
      const narrow = W < 780;

      // Composition anchors. On narrow screens the whole field is compressed
      // into its own band so it keeps the same shape instead of being cropped.
      const entryX = narrow ? 0.03 * W : 0.1 * W;
      const entrySpread = narrow ? 0.07 * W : 0.08 * W;
      const joinX = narrow ? 0.5 * W : 0.575 * W;
      const spineY = 0.5 * H;
      const convX = narrow ? 0.63 * W : 0.685 * W;
      const termX = narrow ? 0.7 * W : 0.735 * W;
      const trunkOff = narrow ? 0.2 * H : 0.245 * H;
      const trunks = [spineY - trunkOff, spineY, spineY + trunkOff];
      // D2: the resolution arc carries the composition, so it is scaled up
      // until it reads as the subject of the hero rather than its backdrop.
      const R = narrow ? Math.min(0.2 * H, 0.16 * W) : Math.min(0.33 * H, 0.15 * W);
      const minRun = 0.022 * W;

      // The resolution arc: the only curve in the system, opening left, in the
      // proportion of the isotype's bowl.
      arc = { x: termX + R * 0.16, y: spineY, r: R, a0: -1.46, a1: 1.46 };

      /* Trunk tails: horizontal, then a 45deg merge onto the spine. */
      function trunkTail(ty) {
        const dy = spineY - ty;
        const pts = [[joinX, ty]];
        if (Math.abs(dy) > 0.5) {
          pts.push([convX - Math.abs(dy), ty]);
          pts.push([convX, spineY]);
        }
        pts.push([termX, spineY]);
        return pts;
      }

      /* The arc, flattened so packets can travel it as one continuous path. */
      function arcPts() {
        const out = [];
        const steps = 46;
        for (let i = 0; i <= steps; i++) {
          const a = arc.a0 + ((arc.a1 - arc.a0) * i) / steps;
          out.push([arc.x + Math.cos(a) * arc.r, arc.y + Math.sin(a) * arc.r]);
        }
        return out;
      }
      const tail = arcPts();

      const count = narrow ? 11 : 34;
      paths = [];

      for (let i = 0; i < count; i++) {
        // Entry points spread across the full height, jittered off the grid.
        let y0 = (0.06 + (0.88 * (i + 0.5)) / count + (r() - 0.5) * 0.05) * H;
        y0 = clamp(y0, 0.04 * H, 0.96 * H);
        const x0 = entryX + r() * entrySpread;

        // Pick the trunk this signal can actually reach at exactly 45deg.
        const budget = joinX - x0 - minRun * 2;
        let ti = 0, best = Infinity;
        trunks.forEach((ty, k) => {
          const d = Math.abs(ty - y0);
          if (d < best) { best = d; ti = k; }
        });
        // Prefer a farther trunk when there is room, so the bus looks routed
        // rather than merely nearest-neighbour.
        if (r() > 0.62) {
          const alt = (ti + (r() > 0.5 ? 1 : 2)) % 3;
          if (Math.abs(trunks[alt] - y0) <= budget) ti = alt;
        }
        const ty = trunks[ti];

        // If the diagonal does not fit, move the entry instead of breaking 45deg.
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
          // Arc length of each route vertex, precomputed so the per-frame loop
          // can flash nodes without re-measuring the polyline.
          vertAcc: measure(pts),
          ti,
          nodes: pts.map((p) => ({ x: p[0], y: p[1], flash: 0 })),
        });
      }

      // One shared tail geometry for the static layer.
      statics = { trunks, joinX, convX, termX, spineY, tail, trunkTail, narrow };

      // Packets: staggered so the field always reads as in motion.
      packets = [];
      paths.forEach((p, i) => {
        const total = p.acc[p.acc.length - 1];
        const n = 1 + (i % 2);
        for (let k = 0; k < n; k++) {
          packets.push({
            p,
            d: (total * ((i * 0.37 + k * 0.5 + r() * 0.3) % 1)),
            v: (narrow ? 62 : 82) + r() * 46,
            total,
          });
        }
      });

      drawStatic();
    }

    /* Static architecture, rendered once per layout. ---------------------- */
    let layer = null;
    function drawStatic() {
      layer = document.createElement("canvas");
      layer.width = canvas.width;
      layer.height = canvas.height;
      const g = layer.getContext("2d");
      g.scale(dpr, dpr);

      const { trunks, joinX, termX, spineY, trunkTail } = statics;

      // Depth glow behind the resolution point.
      const glow = g.createRadialGradient(arc.x, arc.y, 0, arc.x, arc.y, arc.r * 2.7);
      glow.addColorStop(0, rgba(C.accent, 0.3));
      glow.addColorStop(0.4, rgba(C.accent, 0.085));
      glow.addColorStop(1, "rgba(0,0,0,0)");
      g.fillStyle = glow;
      g.fillRect(0, 0, W, H);

      const poly = (pts, stroke, width) => {
        g.beginPath();
        g.moveTo(pts[0][0], pts[0][1]);
        for (let i = 1; i < pts.length; i++) g.lineTo(pts[i][0], pts[i][1]);
        g.strokeStyle = stroke;
        g.lineWidth = width;
        g.stroke();
      };

      // Routes (the many) — faint.
      paths.forEach((p) => poly(p.pts, "rgba(255,255,255,0.14)", 1));

      // Trunks (the few) — brand blue.
      trunks.forEach((ty) => poly(trunkTail(ty), rgba(C.accent, 0.55), 1.2));

      // Spine (the one).
      poly([[joinX, spineY], [termX, spineY]], rgba(C.signal, 0.45), 1.4);

      // A concentric echo places the resolution in space instead of flat on
      // the canvas, and lets the arc read large without extra brightness.
      g.beginPath();
      g.arc(arc.x, arc.y, arc.r * 1.32, arc.a0 * 0.74, arc.a1 * 0.74);
      g.strokeStyle = rgba(C.accent, 0.16);
      g.lineWidth = 1;
      g.stroke();

      // The resolution arc, carrying the brand ramp into violet at its ends.
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

      // Route vertices as diamonds — the chevron reduced to a point.
      const dia = (x, y, s, fill) => {
        g.save();
        g.translate(x, y);
        g.rotate(Math.PI / 4);
        g.fillStyle = fill;
        g.fillRect(-s / 2, -s / 2, s, s);
        g.restore();
      };
      paths.forEach((p) => p.nodes.forEach((n) => dia(n.x, n.y, 3.2, "rgba(255,255,255,0.26)")));
      trunks.forEach((ty) => dia(joinX, ty, 6, rgba(C.accent, 0.9)));

      // Production terminal.
      g.save();
      g.shadowColor = rgba(C.signal, 0.9);
      g.shadowBlur = 18;
      dia(termX, spineY, 10, rgba(C.signal, 1));
      g.restore();
    }

    /* Animated layer ------------------------------------------------------- */
    function frame(dt) {
      ctx.clearRect(0, 0, W, H);
      ctx.drawImage(layer, 0, 0, W, H);

      ctx.save();
      ctx.globalCompositeOperation = "lighter";

      for (const k of packets) {
        if (dt) {
          const prev = k.d;
          k.d += k.v * dt;
          if (k.d > k.total) k.d -= k.total;
          // Light a vertex as the packet crosses it.
          if (k.d > prev) {
            const va = k.p.vertAcc;
            for (let i = 0; i < va.length; i++) {
              if (va[i] > prev && va[i] <= k.d) k.p.nodes[i].flash = 1;
            }
          }
        }

        const t = k.d / k.total;
        // Colour tells you where in the system the signal is.
        const col =
          t < 0.42 ? mix(C.signal, C.accent, t / 0.42)
          : t < 0.78 ? mix(C.accent, [110, 170, 255], (t - 0.42) / 0.36)
          : mix([110, 170, 255], C.terminal, (t - 0.78) / 0.22);

        // Tapered trail: the packet is a moving length of data, not a dot.
        const TRAIL = 7;
        for (let i = TRAIL; i >= 0; i--) {
          const d = k.d - i * 4.4;
          if (d < 0) continue;
          const [x, y] = pointAt(k.p.full, k.p.acc, d);
          const f = 1 - i / TRAIL;
          ctx.fillStyle = rgba(col, 0.5 * f * f);
          ctx.fillRect(x - 0.9, y - 0.9, 1.8, 1.8);
        }
        const [hx, hy] = pointAt(k.p.full, k.p.acc, k.d);
        ctx.fillStyle = rgba(col, 0.95);
        ctx.beginPath();
        ctx.arc(hx, hy, 1.7, 0, 6.2832);
        ctx.fill();
      }

      // Vertex flashes decay.
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

    let last = 0;
    function loop(ts) {
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

    let t;
    const ro = new ResizeObserver(() => {
      clearTimeout(t);
      t = setTimeout(() => {
        cancelAnimationFrame(raf);
        last = 0;
        resize();
        if (!REDUCED) raf = requestAnimationFrame(loop);
      }, 180);
    });
    ro.observe(canvas);
  }

  /* ==========================================================================
     2. BUSINESS PROBLEMS — routed selector
     ======================================================================== */
  const PROBLEMS = [
    {
      q: "We need to build something new.",
      k: "Route — Custom software",
      t: "From an idea to a product in production",
      b: "We turn the intent into a defined scope, a technical architecture and a system that actually ships. Web, mobile or an internal platform, engineered to be maintained after launch.",
      tags: ["Product architecture", "Web", "Mobile", "Platforms"],
    },
    {
      q: "We need to automate processes.",
      k: "Route — Automation",
      t: "Manual operations turned into workflows",
      b: "We map how the work is done today, find the steps that cost the most, and replace them with automated workflows across the systems your teams already use.",
      tags: ["Process automation", "Workflows", "Documents", "Data"],
    },
    {
      q: "Our systems don't communicate.",
      k: "Route — Integration",
      t: "One ecosystem instead of separate tools",
      b: "We connect ERP, CRM, databases and third-party services so information moves once and stays consistent, removing double entry and the reporting gaps that come with it.",
      tags: ["ERP", "CRM", "APIs", "Databases"],
    },
    {
      q: "Our technology needs to evolve.",
      k: "Route — Modernization",
      t: "Legacy systems brought forward safely",
      b: "We assess what must be preserved and what should be rebuilt, then modernize or migrate in stages so the business keeps operating while the platform changes underneath it.",
      tags: ["Legacy", "Migration", "Re-architecture", "Cloud"],
    },
    {
      q: "We want to apply AI where it actually creates value.",
      k: "Route — Applied AI",
      t: "AI applied to a specific business problem",
      b: "We start from the process, not the model. Where AI genuinely helps, we build it into the workflow — document and data automation, assistants and agents — and where it does not, we say so.",
      tags: ["Applied AI", "Assistants", "Agents", "Document automation"],
    },
    {
      q: "Our infrastructure needs to improve.",
      k: "Route — Infrastructure",
      t: "A foundation that holds under real load",
      b: "Cloud environments, databases, deployment pipelines and monitoring, set up so releases are routine and the cost of running the platform is understood.",
      tags: ["Cloud", "DevOps", "Databases", "Monitoring"],
    },
    {
      q: "We need technology direction.",
      k: "Route — Consulting",
      t: "Decisions made before anything is built",
      b: "Architecture, stack evaluation and a technology roadmap tied to business priorities, so the next investment is a decision rather than a guess.",
      tags: ["Architecture", "Roadmap", "Stack evaluation", "Governance"],
    },
  ];

  function problems() {
    const list = document.getElementById("probList");
    const panel = document.getElementById("probPanel");
    const wire = document.getElementById("probWire");
    if (!list || !panel) return;

    let active = 0;

    PROBLEMS.forEach((p, i) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "prob__item";
      b.setAttribute("role", "tab");
      b.setAttribute("aria-selected", i === 0 ? "true" : "false");
      b.innerHTML =
        `<span class="prob__idx">${String(i + 1).padStart(2, "0")}</span>` +
        `<span class="prob__text">${p.q}</span>`;
      b.addEventListener("click", () => select(i));
      b.addEventListener("mouseenter", () => select(i));
      b.addEventListener("focus", () => select(i));
      list.appendChild(b);
    });

    function render(i) {
      const p = PROBLEMS[i];
      panel.innerHTML =
        `<p class="prob__kicker">${p.k}</p>` +
        `<h3 class="prob__title">${p.t}</h3>` +
        `<p class="prob__body">${p.b}</p>` +
        `<ul class="prob__tags">${p.tags.map((t) => `<li>${t}</li>`).join("")}</ul>`;
      panel.classList.remove("prob__swap");
      void panel.offsetWidth;
      panel.classList.add("prob__swap");
    }

    /* The connector: a real routed trace — horizontal, 45deg, vertical, 45deg,
       horizontal — exactly how the isotype's chevrons change direction. */
    function drawWire() {
      if (!wire || !wire.clientWidth) return;
      const items = list.querySelectorAll(".prob__item");
      const item = items[active];
      if (!item) return;

      const base = wire.getBoundingClientRect();
      const ir = item.getBoundingClientRect();
      const pr = panel.getBoundingClientRect();

      const W = base.width;
      const H = base.height;
      const y1 = ir.top + ir.height / 2 - base.top;
      const y2 = pr.top + 58 - base.top;

      wire.setAttribute("viewBox", `0 0 ${W} ${H}`);

      const dy = y2 - y1;
      const d = Math.min(18, Math.abs(dy) / 2);
      const s = Math.sign(dy) || 1;
      const m = Math.max((W - 2 * d) / 2, 8);

      const path =
        Math.abs(dy) < 1.5
          ? `M0 ${y1} H${W}`
          : `M0 ${y1} H${m} L${m + d} ${y1 + s * d} V${y2 - s * d} L${m + 2 * d} ${y2} H${W}`;

      wire.innerHTML = "";
      const grad = el("linearGradient", { id: "wg", x1: "0", x2: "1" });
      grad.appendChild(el("stop", { offset: "0", "stop-color": "#0ECEF8" }));
      grad.appendChild(el("stop", { offset: "1", "stop-color": "#0071F6" }));
      const defs = el("defs");
      defs.appendChild(grad);
      wire.appendChild(defs);

      wire.appendChild(el("path", { d: path, fill: "none", stroke: "url(#wg)", "stroke-width": "1.2" }));
      [[0, y1], [W, y2]].forEach(([x, y]) => {
        wire.appendChild(
          el("rect", {
            x: x - 3, y: y - 3, width: 6, height: 6,
            fill: "#0ECEF8", transform: `rotate(45 ${x} ${y})`,
          })
        );
      });

      if (!REDUCED) {
        const p = wire.querySelector("path");
        const len = p.getTotalLength();
        p.style.strokeDasharray = len;
        p.style.strokeDashoffset = len;
        p.animate([{ strokeDashoffset: len }, { strokeDashoffset: 0 }], {
          duration: 520,
          easing: "cubic-bezier(.16,1,.3,1)",
          fill: "forwards",
        });
      }
    }

    const layout = list.parentElement;

    /* Below the two-column breakpoint the panel becomes an accordion body,
       docked under the row the user just tapped, instead of sitting in a
       column they would have to scroll to. */
    function placePanel() {
      const stacked = window.matchMedia("(max-width: 999px)").matches;
      const item = list.querySelectorAll(".prob__item")[active];
      if (stacked) {
        if (item && item.nextElementSibling !== panel) item.after(panel);
      } else if (panel.parentElement !== layout) {
        layout.appendChild(panel);
      }
    }

    function select(i) {
      if (i === active) return;
      active = i;
      list.querySelectorAll(".prob__item").forEach((b, k) =>
        b.setAttribute("aria-selected", k === i ? "true" : "false")
      );
      render(i);
      placePanel();
      requestAnimationFrame(drawWire);
    }

    /* Roving keyboard navigation across the problem list. */
    list.addEventListener("keydown", (e) => {
      const map = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 };
      if (!(e.key in map)) return;
      e.preventDefault();
      const next = (active + map[e.key] + PROBLEMS.length) % PROBLEMS.length;
      list.querySelectorAll(".prob__item")[next].focus();
    });

    render(0);
    placePanel();
    requestAnimationFrame(drawWire);
    let t;
    window.addEventListener("resize", () => {
      clearTimeout(t);
      t = setTimeout(() => {
        placePanel();
        drawWire();
      }, 150);
    });
  }

  /* ==========================================================================
     3. SOLUTION FIGURES — same grammar, three different ideas
     ======================================================================== */
  function solutionFigures() {
    const dash = REDUCED ? "" : `<animate attributeName="stroke-dashoffset" values="120;0" dur="4.5s" repeatCount="indefinite"/>`;

    const FIGS = {
      /* Modules stacking into one assembled product. */
      build: `
        <svg viewBox="0 0 220 116" fill="none">
          <g stroke="#0071F6" stroke-opacity=".55">
            <path d="M18 92h120l16-16H34z"/>
            <path d="M30 68h120l16-16H46z"/>
            <path d="M42 44h120l16-16H58z"/>
          </g>
          <g fill="#0ECEF8">
            <rect x="15" y="89" width="6" height="6" transform="rotate(45 18 92)"/>
            <rect x="27" y="65" width="6" height="6" transform="rotate(45 30 68)"/>
            <rect x="39" y="41" width="6" height="6" transform="rotate(45 42 44)"/>
          </g>
          <path d="M186 28v64" stroke="#ffffff" stroke-opacity=".16"/>
          <path d="M178 28h16M178 92h16" stroke="#ffffff" stroke-opacity=".16"/>
          <path d="M42 44h120l16-16H58" stroke="#0ECEF8" stroke-width="1.4" stroke-dasharray="26 94">${dash}</path>
        </svg>`,

      /* A closed loop that keeps running without a person in it. */
      auto: `
        <svg viewBox="0 0 220 116" fill="none">
          <path d="M46 26h108l18 18v40l-18 18H64L46 84z" stroke="#0071F6" stroke-opacity=".55"/>
          <path d="M46 26h108l18 18v40l-18 18H64L46 84z" stroke="#0ECEF8" stroke-width="1.5" stroke-dasharray="34 286">${dash}</path>
          <path d="M100 58h48M100 58l-18-18M100 58l-18 18" stroke="#ffffff" stroke-opacity=".2"/>
          <g fill="#0ECEF8">
            <rect x="97" y="55" width="6" height="6" transform="rotate(45 100 58)"/>
          </g>
          <g fill="#0071F6">
            <rect x="79" y="37" width="5" height="5" transform="rotate(45 81.5 39.5)"/>
            <rect x="79" y="73" width="5" height="5" transform="rotate(45 81.5 75.5)"/>
            <rect x="145" y="55" width="5" height="5" transform="rotate(45 147.5 57.5)"/>
          </g>
        </svg>`,

      /* Two separate estates bridged by one engineered trunk. */
      integrate: `
        <svg viewBox="0 0 220 116" fill="none">
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
        </svg>`,
    };

    document.querySelectorAll("[data-fig]").forEach((n) => {
      n.innerHTML = FIGS[n.dataset.fig] || "";
    });
  }

  /* ==========================================================================
     4. PROCESS TRACK — one continuous transformation
     --------------------------------------------------------------------------
     Scatter -> lattice -> engineered stack -> single spine into production.
     Drawn at real pixel size so the 45deg angles are never distorted.
     ======================================================================== */
  function processTrack() {
    const svg = document.getElementById("track");
    if (!svg) return;

    function draw() {
      const rect = svg.getBoundingClientRect();
      const W = rect.width, H = rect.height;
      if (!W || !H) return;
      svg.setAttribute("viewBox", `0 0 ${W} ${H}`);
      svg.innerHTML = "";

      const r = prng(90210);
      const mid = H / 2;
      const zA = 0.23 * W, zB = 0.5 * W, zC = 0.77 * W;
      const g = el("g");
      svg.appendChild(g);

      const line = (d, stroke, w, extra) =>
        g.appendChild(el("path", Object.assign({ d, fill: "none", stroke, "stroke-width": w || 1 }, extra || {})));
      const dia = (x, y, s, fill, op) =>
        g.appendChild(el("rect", { x: x - s / 2, y: y - s / 2, width: s, height: s, transform: `rotate(45 ${x} ${y})`, fill, "fill-opacity": op == null ? 1 : op }));

      /* 01 Understand — unordered signals, no relationships yet. */
      for (let i = 0; i < 26; i++) {
        const x = 0.02 * W + r() * (zA - 0.04 * W);
        const y = 0.12 * H + r() * 0.76 * H;
        dia(x, y, 3.4, "#ffffff", 0.16 + r() * 0.2);
      }

      /* 02 Design — the same signals snapped onto a 45deg lattice. */
      const rows = 4;
      const cols = 5;
      const latX = (c) => zA + 0.03 * W + (c * (zB - zA - 0.06 * W)) / (cols - 1);
      const latY = (row) => 0.16 * H + (row * 0.68 * H) / (rows - 1);
      for (let c = 0; c < cols - 1; c++) {
        for (let row = 0; row < rows; row++) {
          const step = (latY(1) - latY(0));
          const dx = latX(c + 1) - latX(c);
          const run = Math.max(dx - step, 2);
          if (row < rows - 1 && r() > 0.45) {
            line(`M${latX(c)} ${latY(row)}h${run}L${latX(c + 1)} ${latY(row + 1)}`, "#0071F6", 1, { "stroke-opacity": 0.42 });
          } else {
            line(`M${latX(c)} ${latY(row)}H${latX(c + 1)}`, "#0071F6", 1, { "stroke-opacity": 0.3 });
          }
        }
      }
      for (let c = 0; c < cols; c++) for (let row = 0; row < rows; row++) dia(latX(c), latY(row), 4.2, "#0071F6", 0.8);

      /* 03 Build — the lattice condenses into engineered, notched bars. */
      const bars = 3;
      for (let i = 0; i < bars; i++) {
        const y = mid + (i - (bars - 1) / 2) * 0.2 * H;
        const x0 = zB + 0.03 * W;
        const x1 = zC - 0.02 * W;
        const t = 0.055 * H;
        line(`M${x0} ${y - t}H${x1 - t}L${x1} ${y}L${x1 - t} ${y + t}H${x0}L${x0 - t} ${y}Z`, "#0ECEF8", 1, {
          "stroke-opacity": 0.5,
          fill: "#0071F6",
          "fill-opacity": 0.1,
        });
      }

      /* 04 Take to production — three bars merge into one spine and ship. */
      const mergeX = zC + 0.03 * W;
      const endX = W - 0.03 * W;
      for (let i = 0; i < bars; i++) {
        const y = mid + (i - (bars - 1) / 2) * 0.2 * H;
        const dy = mid - y;
        line(`M${zC - 0.02 * W} ${y}H${mergeX - Math.abs(dy)}L${mergeX} ${mid}`, "#0ECEF8", 1.2, { "stroke-opacity": 0.65 });
      }
      line(`M${mergeX} ${mid}H${endX}`, "#0ECEF8", 1.6, { "stroke-opacity": 0.9 });
      dia(endX, mid, 12, "#A049FB", 0.95);
      dia(endX, mid, 22, "#A049FB", 0.14);

      if (!REDUCED) {
        const pk = el("rect", { x: -3, y: mid - 3, width: 6, height: 6, fill: "#ffffff", transform: `rotate(45 0 ${mid})` });
        g.appendChild(pk);
        pk.appendChild(
          el("animate", {
            attributeName: "x",
            values: `${mergeX - 3};${endX - 3}`,
            dur: "2.6s",
            repeatCount: "indefinite",
          })
        );
        pk.appendChild(
          el("animate", { attributeName: "opacity", values: "0;1;1;0", dur: "2.6s", repeatCount: "indefinite" })
        );
      }
    }

    draw();
    let t;
    window.addEventListener("resize", () => {
      clearTimeout(t);
      t = setTimeout(draw, 160);
    });
  }

  /* ==========================================================================
     5. FINAL CTA — everything in the page converges to one point
     ======================================================================== */
  function convergeField() {
    const svg = document.getElementById("converge");
    if (!svg) return;

    function draw() {
      const rect = svg.getBoundingClientRect();
      const W = rect.width, H = rect.height;
      if (!W || !H) return;
      svg.setAttribute("viewBox", `0 0 ${W} ${H}`);
      svg.innerHTML = "";
      const r = prng(31415);
      // The convergence point sits inside the frame (not off the bottom edge)
      // so the closing arc can be drawn around it — the hero's thesis stated
      // once more, calmly, as the conclusion of the page.
      const cx = W / 2, cy = H * 0.78;

      for (let i = 0; i < 26; i++) {
        const x = (i / 25) * W;
        const dx = Math.abs(cx - x);
        const startY = H * (0.05 + r() * 0.3);
        const run = Math.max(cy - startY - dx, 0);
        const d = `M${x} ${startY}V${startY + run}L${cx} ${cy}`;
        svg.appendChild(
          el("path", {
            d,
            fill: "none",
            stroke: dx < W * 0.1 ? "#0ECEF8" : "#0071F6",
            "stroke-opacity": String(0.09 + 0.28 * (1 - dx / (W / 2))),
            "stroke-width": "1",
          })
        );
        svg.appendChild(
          el("rect", { x: x - 2, y: startY - 2, width: 4, height: 4, transform: `rotate(45 ${x} ${startY})`, fill: "#0071F6", "fill-opacity": "0.45" })
        );
      }

      // Resolution arc — the same bowl that terminates the hero field.
      const R = Math.min(W * 0.1, H * 0.16);
      svg.appendChild(
        el("path", {
          d: `M${cx - R} ${cy}A${R} ${R} 0 0 0 ${cx + R} ${cy}`,
          fill: "none",
          stroke: "url(#cvg)",
          "stroke-width": "1.8",
          "stroke-opacity": "0.9",
        })
      );
      const defs = el("defs", {});
      const lg = el("linearGradient", { id: "cvg", x1: "0", y1: "0", x2: "1", y2: "0" });
      [["0", "#0ECEF8"], ["0.5", "#0071F6"], ["1", "#A049FB"]].forEach(([o, c]) =>
        lg.appendChild(el("stop", { offset: o, "stop-color": c }))
      );
      defs.appendChild(lg);
      svg.insertBefore(defs, svg.firstChild);

      svg.appendChild(
        el("rect", { x: cx - 5, y: cy - 5, width: 10, height: 10, transform: `rotate(45 ${cx} ${cy})`, fill: "#0ECEF8" })
      );
    }

    draw();
    let t;
    window.addEventListener("resize", () => {
      clearTimeout(t);
      t = setTimeout(draw, 160);
    });
  }

  /* ==========================================================================
     6. Page chrome
     ======================================================================== */
  function chrome() {
    const nav = document.getElementById("nav");
    const onScroll = () => nav && nav.classList.toggle("stuck", window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const yr = document.getElementById("yr");
    if (yr) yr.textContent = String(new Date().getFullYear());

    const burger = document.getElementById("burger");
    const mnav = document.getElementById("mobileNav");
    if (burger && mnav) {
      const setOpen = (open) => {
        burger.setAttribute("aria-expanded", String(open));
        burger.setAttribute("aria-label", open ? "Close menu" : "Open menu");
        mnav.hidden = !open;
        document.body.style.overflow = open ? "hidden" : "";
      };
      burger.addEventListener("click", () =>
        setOpen(burger.getAttribute("aria-expanded") !== "true")
      );
      mnav.addEventListener("click", (e) => {
        if (e.target.closest("a")) setOpen(false);
      });
      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && !mnav.hidden) setOpen(false);
      });
      // A resize past the desktop breakpoint must not leave the body locked.
      window.addEventListener("resize", () => {
        if (window.innerWidth >= 1040 && !mnav.hidden) setOpen(false);
      });
    }

    document.querySelectorAll(".lang button").forEach((b, _, all) => {
      b.addEventListener("click", () => {
        all.forEach((o) => o.setAttribute("aria-pressed", String(o === b)));
      });
    });

    const rv = document.querySelectorAll(".rv");
    if (REDUCED || !("IntersectionObserver" in window)) {
      rv.forEach((n) => n.classList.add("in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.08 }
    );
    rv.forEach((n) => io.observe(n));
  }

  /* ---------------------------------------------------------------------- */
  function init() {
    chrome();
    heroField();
    problems();
    solutionFigures();
    processTrack();
    convergeField();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
