"use client";

import { useSyncExternalStore } from "react";
import { useLocale, useTranslations } from "next-intl";
import { solutionFigure } from "@/app/lib/briler-figures";
import { isLocale, solutionPath, type SolutionId } from "@/app/lib/solutions";
import { Link } from "@/navigation";
import Reveal from "./Reveal";

const FIGS = ["build", "auto", "integrate"] as const;

function subscribeReducedMotion(onChange: () => void) {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

export default function Solutions() {
  const t = useTranslations("briler.solutions");
  const locale = useLocale();
  const pageLocale = isLocale(locale) ? locale : "en";
  const primary = t.raw("primary") as { title: string; items: string[]; family?: SolutionId }[];
  const supporting = t.raw("supporting") as { title: string; body: string; family?: SolutionId }[];
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
            {primary.map((sol, i) => {
              const inner = (
                <>
                  <span className="sol__i">P—0{i + 1}</span>
                  <div className="sol__fig" dangerouslySetInnerHTML={{ __html: html[i] }} />
                  <h3>{sol.title}</h3>
                  <ul className="sol__items">
                    {sol.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </>
              );

              return sol.family ? (
                <Link
                  className="sol"
                  key={sol.title}
                  href={solutionPath(sol.family, pageLocale)}
                  data-surface="home-solution"
                  data-solution={sol.family}
                >
                  {inner}
                </Link>
              ) : (
                <article className="sol" key={sol.title}>
                  {inner}
                </article>
              );
            })}
          </div>
        </Reveal>

        <Reveal delay={150}>
          <div className="sol__supporting">
            {supporting.map((s, i) => {
              const inner = (
                <>
                  <span className="sup__i">S—0{i + 1}</span>
                  <span className="sup__t">{s.title}</span>
                  <span className="sup__d">{s.body}</span>
                </>
              );

              return s.family ? (
                <Link
                  className="sup"
                  key={s.title}
                  href={solutionPath(s.family, pageLocale)}
                  data-surface="home-solution"
                  data-solution={s.family}
                >
                  {inner}
                </Link>
              ) : (
                <div className="sup" key={s.title}>
                  {inner}
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
