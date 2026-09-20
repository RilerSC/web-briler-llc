"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/navigation";
import Arrow from "./Arrow";
import ResolutionField from "./ResolutionField";

export default function Hero() {
  const t = useTranslations("briler.hero");
  const caps = t.raw("caps") as string[];

  return (
    <section className="hero" id="top">
      <div className="hero__field" aria-hidden="true">
        <ResolutionField />
      </div>
      <div className="hero__veil" aria-hidden="true" />

      <div className="wrap hero__in">
        <div className="hero__copy">
          <p className="eyebrow">{t("eyebrow")}</p>
          <h1>
            {t("titleBefore")} <em>{t("titleAccent")}</em>
            {t("titleAfter")}
          </h1>
          <p className="hero__sub">{t("sub")}</p>
          <div className="hero__actions">
            <Link className="btn btn--primary" href="/#contact">
              {t("ctaPrimary")}
              <Arrow />
            </Link>
            <Link className="btn btn--ghost" href="/#solutions">
              {t("ctaSecondary")}
            </Link>
          </div>
        </div>
      </div>

      <div className="wrap hero__foot">
        <ul className="hero__caps">
          {caps.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
