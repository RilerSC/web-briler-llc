"use client";

import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/navigation";
import { SOLUTION_IDS, isLocale, solutionPath } from "@/app/lib/solutions";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Navbar() {
  const t = useTranslations("navbar");
  const catalog = useTranslations("solutionPages.catalog");
  const locale = useLocale();
  const pageLocale = isLocale(locale) ? locale : "en";
  const [stuck, setStuck] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header className={stuck ? "nav stuck" : "nav"} id="nav">
      <a className="sr" href="#main">
        {t("skip")}
      </a>
      <div className="wrap nav__in">
        <Link className="nav__logo" href="/" aria-label="BRILER">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/briler-lockup-gradient.png" alt="BRILER" width={343} height={120} />
        </Link>

        <nav className="nav__links" aria-label={t("primary")}>
          <div className="nav__group">
            <Link className="nav__link" href="/#solutions">
              {t("solutions")}
            </Link>
            <ul className="nav__sub">
              {SOLUTION_IDS.map((id) => (
                <li key={id}>
                  <Link href={solutionPath(id, pageLocale)} data-solution={id}>
                    {catalog(id)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <Link className="nav__link" href="/#about">
            {t("about")}
          </Link>
          <Link className="nav__link" href="/#contact">
            {t("contact")}
          </Link>
        </nav>

        <div className="nav__right">
          <LanguageSwitcher />
          <Link className="btn btn--ghost btn--sm nav__cta" href="/agendar">
            {t("cta")}
          </Link>
          <button
            className="burger"
            type="button"
            aria-label={open ? t("closeMenu") : t("openMenu")}
            aria-expanded={open}
            aria-controls="mobileNav"
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
          </button>
        </div>
      </div>

      <div className="mnav" id="mobileNav" hidden={!open}>
        <nav className="wrap mnav__in" aria-label={t("mobile")}>
          <Link href="/#solutions" onClick={close}>
            <span className="mnav__i">01</span>
            {t("solutions")}
          </Link>
          <ul className="mnav__sub">
            {SOLUTION_IDS.map((id) => (
              <li key={id}>
                <Link href={solutionPath(id, pageLocale)} onClick={close} data-solution={id}>
                  {catalog(id)}
                </Link>
              </li>
            ))}
          </ul>
          <Link href="/#about" onClick={close}>
            <span className="mnav__i">02</span>
            {t("about")}
          </Link>
          <Link href="/#contact" onClick={close}>
            <span className="mnav__i">03</span>
            {t("contact")}
          </Link>
          <Link href="/agendar" onClick={close} className="btn btn--primary mnav__cta">
            {t("cta")}
          </Link>
        </nav>
      </div>
    </header>
  );
}
