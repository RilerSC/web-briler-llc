"use client";

import { useTranslations } from "next-intl";
import Reveal from "./Reveal";

const SPANS = [true, false, false, true, false, true, true, false, true, false, false, true];

export default function TechnicalDepth() {
  const t = useTranslations("briler.depth");
  const domains = t.raw("domains") as string[];

  return (
    <section className="sec sec--tight sec--plinth" id="depth" data-ch="07" aria-labelledby="depth-h">
      <div className="wrap">
        <div className="sec__head sec__head--split">
          <Reveal>
            <p className="eyebrow">{t("eyebrow")}</p>
            <h2 className="h2" id="depth-h" style={{ marginTop: 22 }}>
              {t("title")}
            </h2>
          </Reveal>
          <Reveal delay={90}>
            <p className="lede">{t("lede")}</p>
          </Reveal>
        </div>
        <Reveal delay={110}>
          <div className="depth__wrap">
            <div className="depth">
              {domains.map((name, i) => (
                <div className={SPANS[i] ? "cap cap--2" : "cap"} key={name}>
                  <span className="cap__i">{String(i + 1).padStart(2, "0")}</span>
                  <span className="cap__n">{name}</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
