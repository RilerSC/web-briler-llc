"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/navigation";
import { drawConverge } from "@/app/lib/briler-figures";
import ContactForm from "./ContactForm";
import Reveal from "./Reveal";

export default function FinalContact() {
  const t = useTranslations("briler.contact");
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const draw = () => drawConverge(svg);
    draw();
    const ro = new ResizeObserver(() => draw());
    ro.observe(svg);
    return () => ro.disconnect();
  }, []);

  return (
    <section className="sec sec--air final" id="contact" data-ch="09" aria-labelledby="cta-h">
      <svg className="final__svg" ref={svgRef} preserveAspectRatio="none" aria-hidden="true" />
      <div className="wrap">
        <Reveal>
          <div className="final__in">
            <p className="eyebrow">{t("eyebrow")}</p>
            <h2 id="cta-h">{t("title")}</h2>
            <p className="lede">{t("lede")}</p>
            <div className="final__actions">
              <Link className="btn btn--ghost" href="/agendar">
                {t("schedule")}
              </Link>
            </div>
          </div>
        </Reveal>
        <Reveal delay={80}>
          <div className="final__panel">
            <ContactForm />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
