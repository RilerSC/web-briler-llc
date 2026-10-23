"use client";

import { Suspense, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Script from "next/script";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "G-EFS54TWDMY";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

function PageViewTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (typeof window.gtag === "function") {
      window.gtag("event", "page_view", {
        page_path: pathname + (searchParams.toString() ? `?${searchParams.toString()}` : ""),
      });
    }
  }, [pathname, searchParams]);

  return null;
}

export function GoogleAnalytics() {
  return (
    <>
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
      />
      <Script
        id="google-analytics-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}');
          `,
        }}
      />
      <Suspense fallback={null}>
        <PageViewTracker />
      </Suspense>
    </>
  );
}

export function trackAgendarClick() {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", "agendar_click");
  }
}

export function trackAgendarSubmit() {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", "agendar_submit");
  }
}

export function trackWhatsAppClick(language: string, placement: string) {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", "whatsapp_click", {
      language,
      placement,
    });
  }
}

export function trackContactClick(type: "email" | "phone") {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", "contact_click", {
      contact_type: type,
    });
  }
}
