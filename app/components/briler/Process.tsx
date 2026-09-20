"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { drawProcessTrack } from "@/app/lib/briler-figures";
import Reveal from "./Reveal";

export default function Process() {
  const t = useTranslations("briler.process");
  const steps = t.raw("steps") as { title: string; body: string }[];
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const draw = () => drawProcessTrack(svg);
    draw();
    const ro = new ResizeObserver(() => draw());
    ro.observe(svg);
    return () => ro.disconnect();
  }, []);

  return (
    <section className="sec sec--deck rule" id="process" data-ch="06" aria-labelledby="proc-h">
      <div className="wrap">
        <div className="sec__head sec__head--split">
          <Reveal>
            <p className="eyebrow">{t("eyebrow")}</p>
            <h2 className="h2" id="proc-h" style={{ marginTop: 22 }}>
              {t("title")}
            </h2>
          </Reveal>
          <Reveal delay={90}>
            <p className="lede">{t("lede")}</p>
          </Reveal>
        </div>

        <Reveal delay={110}>
          <div className="track">
            <svg className="track__svg" ref={svgRef} preserveAspectRatio="none" aria-hidden="true" />
            <ol className="track__labels">
              {steps.map((s, i) => (
                <li key={s.title}>
                  <span className="track__n">{String(i + 1).padStart(2, "0")}</span>
                  <span className="track__t">{s.title}</span>
                  <p className="track__d">{s.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
