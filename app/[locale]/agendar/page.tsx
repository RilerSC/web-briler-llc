"use client";

import { Link } from "@/navigation";
import { useLocale, useTranslations } from "next-intl";
import Script from "next/script";
import { useEffect, useMemo, useState } from "react";

export default function SchedulePage() {
  const t = useTranslations("schedule");
  const locale = useLocale();
  const [isLoading, setIsLoading] = useState(true);

  const widgetConfig = useMemo(() => {
    if (locale === "en") {
      return {
        url: "https://koalendar.com/e/coffee-with-riler",
        selector: "#inline-widget-coffee-with-riler",
        containerId: "inline-widget-coffee-with-riler",
      };
    }
    return {
      url: "https://koalendar.com/e/reunirse-con-riler",
      selector: "#inline-widget-reunirse-con-riler",
      containerId: "inline-widget-reunirse-con-riler",
    };
  }, [locale]);

  useEffect(() => {
    let mounted = true;
    let attempts = 0;
    const maxAttempts = 50;
    let interval: ReturnType<typeof setInterval> | undefined;

    const initWidget = () => {
      if (!mounted) return true;
      const container = document.getElementById(widgetConfig.containerId);
      if (!container) return false;
      const Koalendar = (window as Window & { Koalendar?: (...args: unknown[]) => void }).Koalendar;
      if (Koalendar) {
        container.innerHTML = "";
        Koalendar("inline", {
          url: widgetConfig.url,
          selector: widgetConfig.selector,
          theme: {
            primaryColor: "#0071F6",
            textColor: "#ccd4e2",
            backgroundColor: "#05091a",
            borderRadius: "0px",
          },
        });
        if (mounted) setIsLoading(false);
        return true;
      }
      return false;
    };

    const initialDelay = setTimeout(() => {
      if (initWidget()) return;
      interval = setInterval(() => {
        attempts += 1;
        if (initWidget() || attempts >= maxAttempts) {
          if (interval) clearInterval(interval);
          if (attempts >= maxAttempts && mounted) setIsLoading(false);
        }
      }, 100);
    }, 50);

    return () => {
      mounted = false;
      clearTimeout(initialDelay);
      if (interval) clearInterval(interval);
    };
  }, [widgetConfig]);

  return (
    <>
      <div className="schedule">
        <div className="wrap">
          <p>
            <Link href="/" className="tlink">
              {t("backToHome")}
            </Link>
          </p>
          <p className="eyebrow" style={{ marginTop: 28 }}>
            {t("hero.badge")}
          </p>
          <h1 className="h2" style={{ marginTop: 18 }}>
            {t("hero.title")} <em style={{ fontStyle: "normal", color: "var(--signal)" }}>{t("hero.titleHighlight")}</em>
          </h1>
          <p className="lede" style={{ marginTop: 22 }}>
            {t("hero.subtitle")}
          </p>
          <ul className="hero__caps" style={{ marginTop: 28 }}>
            {(t.raw("hero.features") as string[]).map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>

          {isLoading && (
            <p className="lede" style={{ marginTop: 40 }}>
              {t("loading")}
            </p>
          )}

          <div className="schedule__widget" style={{ display: isLoading ? "none" : "block" }}>
            <div className="schedule__frame">
              <div key={widgetConfig.containerId} id={widgetConfig.containerId} className="w-full" style={{ minHeight: 550 }} />
            </div>
          </div>
        </div>
      </div>

      <Script
        id="koalendar-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.Koalendar = window.Koalendar || function() {
              (Koalendar.props = Koalendar.props || []).push(arguments);
            };
          `,
        }}
      />
      <Script src="https://koalendar.com/assets/widget.js" strategy="afterInteractive" />
    </>
  );
}
