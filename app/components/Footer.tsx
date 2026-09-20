"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/navigation";
import { SOLUTION_IDS, isLocale, solutionPath } from "@/app/lib/solutions";

export default function Footer() {
  const t = useTranslations("footer");
  const catalog = useTranslations("solutionPages.catalog");
  const locale = useLocale();
  const year = new Date().getFullYear();
  const company = t.raw("company.items") as { href: string; label: string }[];
  const pageLocale = isLocale(locale) ? locale : "en";

  return (
    <footer className="foot">
      <div className="wrap">
        <div className="foot__grid">
          <div>
            <div className="foot__logo">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/brand/briler-lockup-white.png" alt="BRILER" width={343} height={120} />
            </div>
            <p className="foot__tag">{t("tagline")}</p>
            <ul className="presence">
              <li>{t("presence.cr")}</li>
              <li>{t("presence.us")}</li>
              <li>{t("presence.es")}</li>
            </ul>
          </div>

          <div className="foot__col">
            <h4>{t("solutions.title")}</h4>
            <ul>
              {SOLUTION_IDS.map((id) => (
                <li key={id}>
                  <Link href={solutionPath(id, pageLocale)} data-solution={id}>
                    {catalog(id)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="foot__col">
            <h4>{t("company.title")}</h4>
            <ul>
              {company.map((item) => (
                <li key={item.label}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="foot__col">
            <h4>{t("contact.title")}</h4>
            <ul>
              <li>
                <a href="https://briler.net">briler.net</a>
              </li>
              <li>
                <Link href="/agendar">{t("contact.schedule")}</Link>
              </li>
              <li>
                <span className="slot">{t("contact.email")}</span>
              </li>
              <li>
                <span className="slot">{t("contact.phone")}</span>
              </li>
            </ul>
            <p className="foot__pending">{t("contact.pending")}</p>
          </div>
        </div>

        <div className="foot__bar">
          <span>{t("legal.copyright", { year })}</span>
          <nav aria-label={t("legal.nav")}>
            <span>{t("legal.privacy")}</span>
            <span>{t("legal.cookies")}</span>
            <span>{t("legal.notice")}</span>
          </nav>
        </div>
      </div>
    </footer>
  );
}
