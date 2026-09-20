"use client";

import { useSyncExternalStore } from "react";
import { useTranslations } from "next-intl";
import { solutionFigure } from "@/app/lib/briler-figures";
import Reveal from "./Reveal";

const FIGS = ["build", "auto", "integrate"] as const;

function subscribeReducedMotion(onChange: () => void) {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

export default function Solutions() {
  const t = useTranslations("briler.solutions");
  const primary = t.raw("primary") as { title: string; items: string[] }[];
  const supporting = t.raw("supporting") as { title: string; body: string }[];
  const reduced = useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false
  );
  const html = FIGS.map((k) => solutionFigure(k, reduced));

  return (
    <section className="sec sec--deck rule" id="solutions" data-ch="04" aria-labelledby="sol-h">
      <div className="wrap">
        <div className="sec__head sec__head--split">
          <Reveal>
            <p className="eyebrow">{t("eyebrow")}</p>
            <h2 className="h2" id="sol-h" style={{ marginTop: 22 }}>
              {t("title")}
            </h2>
          </Reveal>
          <Reveal delay={90}>
            <p className="lede">{t("lede")}</p>
          </Reveal>
        </div>

        <Reveal delay={110}>
          <div className="sol__primary">
            {primary.map((sol, i) => (
              <article className="sol" key={sol.title}>
                <span className="sol__i">P—0{i + 1}</span>
                <div className="sol__fig" dangerouslySetInnerHTML={{ __html: html[i] }} />
                <h3>{sol.title}</h3>
                <ul className="sol__items">
                  {sol.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </Reveal>

        <Reveal delay={150}>
          <div className="sol__supporting">
            {supporting.map((s, i) => (
              <div className="sup" key={s.title}>
                <span className="sup__i">S—0{i + 1}</span>
                <span className="sup__t">{s.title}</span>
                <span className="sup__d">{s.body}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
