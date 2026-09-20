"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { drawProblemWire } from "@/app/lib/briler-figures";
import { prefersReducedMotion } from "@/app/lib/briler-geom";
import Reveal from "./Reveal";

type Problem = { q: string; k: string; t: string; b: string; tags: string[] };

export default function BusinessProblems() {
  const t = useTranslations("briler.problems");
  const items = t.raw("items") as Problem[];
  const [active, setActive] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const wireRef = useRef<SVGSVGElement>(null);
  const layoutRef = useRef<HTMLDivElement>(null);

  const placeAndDraw = useCallback(() => {
    const list = listRef.current;
    const panel = panelRef.current;
    const layout = layoutRef.current;
    const wire = wireRef.current;
    if (!list || !panel || !layout) return;
    const stacked = window.matchMedia("(max-width: 999px)").matches;
    const item = list.querySelectorAll<HTMLButtonElement>(".prob__item")[active];
    if (stacked) {
      if (item && item.nextElementSibling !== panel) item.after(panel);
    } else if (panel.parentElement !== layout) {
      layout.appendChild(panel);
    }
    requestAnimationFrame(() => {
      if (!wire || !item) return;
      const pr = panel.getBoundingClientRect();
      drawProblemWire(wire, item.getBoundingClientRect(), pr, prefersReducedMotion());
    });
  }, [active]);

  useEffect(() => {
    placeAndDraw();
    const onResize = () => placeAndDraw();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [placeAndDraw]);

  const select = (i: number) => {
    if (i === active) return;
    setActive(i);
  };

  const onKey = (e: React.KeyboardEvent) => {
    const map: Record<string, number> = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 };
    if (!(e.key in map)) return;
    e.preventDefault();
    const next = (active + map[e.key] + items.length) % items.length;
    select(next);
    listRef.current?.querySelectorAll<HTMLButtonElement>(".prob__item")[next]?.focus();
  };

  const p = items[active];

  return (
    <section className="sec sec--air" id="problems" data-ch="03" aria-labelledby="prob-h">
      <div className="wrap">
        <div className="sec__head sec__head--split">
          <Reveal>
            <p className="eyebrow">{t("eyebrow")}</p>
            <h2 className="h2" id="prob-h" style={{ marginTop: 22 }}>
              {t("title")}
            </h2>
          </Reveal>
          <Reveal delay={90}>
            <p className="lede">{t("lede")}</p>
          </Reveal>
        </div>

        <Reveal delay={120}>
          <div className="prob__layout" ref={layoutRef}>
            <div className="prob__list" ref={listRef} role="tablist" aria-label={t("listLabel")} onKeyDown={onKey}>
              {items.map((item, i) => (
                <button
                  key={item.q}
                  type="button"
                  className="prob__item"
                  role="tab"
                  aria-selected={i === active}
                  onClick={() => select(i)}
                  onMouseEnter={() => {
                    if (window.matchMedia("(min-width: 1000px)").matches) select(i);
                  }}
                  onFocus={() => select(i)}
                >
                  <span className="prob__idx">{String(i + 1).padStart(2, "0")}</span>
                  <span className="prob__text">{item.q}</span>
                </button>
              ))}
            </div>
            <div className="prob__wire" aria-hidden="true">
              <svg ref={wireRef} preserveAspectRatio="none" />
            </div>
            <div className="prob__panel" ref={panelRef} role="tabpanel" aria-live="polite">
              <p className="prob__kicker">{p.k}</p>
              <h3 className="prob__title">{p.t}</h3>
              <p className="prob__body">{p.b}</p>
              <ul className="prob__tags">
                {p.tags.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
