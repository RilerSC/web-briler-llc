"use client";

import { useTranslations } from "next-intl";
import Reveal from "./Reveal";

export default function About() {
  const t = useTranslations("briler.about");

  return (
    <section className="sec sec--air about" id="about" data-ch="08" aria-labelledby="about-h">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="about__mark" src="/brand/briler-isotype.png" alt="" aria-hidden="true" />
      <div className="wrap about__in">
        <Reveal>
          <p className="eyebrow">{t("eyebrow")}</p>
          <h2 id="about-h">{t("title")}</h2>
          <p className="lede">{t("lede")}</p>
        </Reveal>
      </div>
    </section>
  );
}
