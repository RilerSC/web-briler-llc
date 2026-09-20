# Shared layouts

Shell: `app/[locale]/layout.tsx` wraps every locale page with Navbar + Footer. No root `app/layout.tsx`.

## Locale layout

- File: `app/[locale]/layout.tsx`
- Renders: `html[lang]` + Geist fonts + Navbar + `<main class="min-h-screen pt-16">` + Footer

```tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import "../globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { locales } from "../../i18n";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export function generateStaticParams() {
  return [
    { locale: "es" },
    { locale: "en" }
  ];
}

export const metadata: Metadata = {
  title: "DEVIT506 | Socios Tecnológicos Estratégicos desde 2012",
  description: "Servicios de CTO Externo y consultoría estratégica tecnológica desde 2012.",
  openGraph: {
    url: "https://devit506.com",
    siteName: "DEVIT506",
  },
  alternates: {
    canonical: "https://devit506.com",
  },
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages({ locale });

  return (
    <html lang={locale} className="scroll-smooth">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Navbar />
          <main className="min-h-screen pt-16">
            {children}
          </main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
```

## Navbar

- File: `app/components/Navbar.tsx`
- Renders: fixed glass nav, DEVIT506 logo, 4 links, LanguageSwitcher, CTA, mobile drawer

```tsx
"use client";

import { useState, useEffect, useTransition } from "react";
import { Link, usePathname, useRouter } from "@/navigation";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Navbar() {
  const t = useTranslations("navbar");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (mobileMenuOpen) setMobileMenuOpen(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [mobileMenuOpen]);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  const handleLinkClick = () => setMobileMenuOpen(false);

  const handleMobileLanguageChange = (newLocale: string) => {
    if (newLocale === locale) return;
    setMobileMenuOpen(false);
    startTransition(() => {
      router.replace(pathname, { locale: newLocale });
    });
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/70 backdrop-blur-xl border-b border-white/20 shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center">
            <Image
              src="/Logotipo-DEVIT-506-NG.png"
              alt="DEVIT506"
              width={140}
              height={40}
              priority
              className="h-8 w-auto"
            />
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link href="/#capabilities" className="text-lg font-medium text-gray-700 hover:text-brand-blue transition-colors duration-200">
              {t("capabilities")}
            </Link>
            <Link href="/#projects" className="text-lg font-medium text-gray-700 hover:text-brand-blue transition-colors duration-200">
              {t("projects")}
            </Link>
            <Link href="/agendar" className="text-lg font-medium text-gray-700 hover:text-brand-blue transition-colors duration-200">
              {t("schedule")}
            </Link>
            <Link href="/#contact" className="text-lg font-medium text-gray-700 hover:text-brand-blue transition-colors duration-200">
              {t("contact")}
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <LanguageSwitcher />
            <Link
              href="/agendar"
              className="bg-brand-blue text-white px-6 py-2 rounded-md text-lg font-medium hover:bg-brand-blue/90 transition-colors duration-200"
            >
              {t("cta")}
            </Link>
          </div>

          <button
            className="md:hidden p-2 rounded-md text-gray-700 hover:text-brand-blue hover:bg-gray-100 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      <div
        className={`
          fixed top-0 right-0 h-full w-80 max-w-[85vw] z-50 md:hidden
          transform transition-transform duration-300 ease-in-out shadow-2xl
          ${mobileMenuOpen ? "translate-x-0" : "translate-x-full"}
        `}
        style={{ backgroundColor: "#1a1a1a" }}
      >
        <div className="flex flex-col h-full" style={{ backgroundColor: "#1a1a1a" }}>
          <div className="flex items-center justify-between p-6 border-b border-gray-600">
            <Image
              src="/Logotipo-DEVIT-506-BL.png"
              alt="DEVIT506"
              width={120}
              height={35}
              className="h-7 w-auto"
            />
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-lg text-white hover:bg-gray-700 transition-colors"
              aria-label="Close menu"
            >
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <nav className="flex-1 px-6 py-8 space-y-2" style={{ backgroundColor: "#1a1a1a" }}>
            <Link href="/#capabilities" onClick={handleLinkClick} className="block px-4 py-4 text-white text-lg hover:text-brand-blue hover:bg-black/30 rounded-lg transition-colors duration-200 font-medium">
              {t("capabilities")}
            </Link>
            <Link href="/#projects" onClick={handleLinkClick} className="block px-4 py-4 text-white text-lg hover:text-brand-blue hover:bg-black/30 rounded-lg transition-colors duration-200 font-medium">
              {t("projects")}
            </Link>
            <Link href="/agendar" onClick={handleLinkClick} className="block px-4 py-4 text-white text-lg hover:text-brand-blue hover:bg-black/30 rounded-lg transition-colors duration-200 font-medium">
              {t("schedule")}
            </Link>
            <Link href="/#contact" onClick={handleLinkClick} className="block px-4 py-4 text-white text-lg hover:text-brand-blue hover:bg-black/30 rounded-lg transition-colors duration-200 font-medium">
              {t("contact")}
            </Link>

            <div className="pt-6 border-t border-gray-600 mt-6">
              <div className="flex gap-3">
                <button
                  onClick={() => handleMobileLanguageChange("es")}
                  disabled={isPending}
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-semibold text-base transition-all duration-200 disabled:opacity-50 ${
                    locale === "es" ? "bg-brand-blue text-white shadow-lg" : "text-gray-300 hover:text-white border-2 border-gray-600"
                  }`}
                  style={locale === "es" ? {} : { backgroundColor: "#2a2a2a" }}
                >
                  <span className="text-xl">🇪🇸</span>
                  <span>ES</span>
                </button>
                <button
                  onClick={() => handleMobileLanguageChange("en")}
                  disabled={isPending}
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-semibold text-base transition-all duration-200 disabled:opacity-50 ${
                    locale === "en" ? "bg-brand-blue text-white shadow-lg" : "text-gray-300 hover:text-white border-2 border-gray-600"
                  }`}
                  style={locale === "en" ? {} : { backgroundColor: "#2a2a2a" }}
                >
                  <span className="text-xl">🇺🇸</span>
                  <span>EN</span>
                </button>
              </div>
            </div>
          </nav>

          <div className="p-6 border-t border-gray-600" style={{ backgroundColor: "#222222" }}>
            <Link
              href="/agendar"
              onClick={handleLinkClick}
              className="block w-full bg-brand-blue text-white text-center px-6 py-4 rounded-lg text-lg font-semibold hover:bg-brand-blue/90 transition-colors duration-200 shadow-lg"
            >
              {t("cta")}
            </Link>
            <p className="mt-4 text-sm text-gray-400 text-center">{t("email")}</p>
          </div>
        </div>
      </div>
    </nav>
  );
}
```

## Footer

- File: `app/components/Footer.tsx`
- Renders: dark brand footer, logo, services, contact, non-functional legal spans

```tsx
"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/navigation";

export default function Footer() {
  const t = useTranslations("footer");
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-black text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Image
              src="/Logotipo-DEVIT-506-BL.png"
              alt="DEVIT506"
              width={140}
              height={40}
              className="h-8 w-auto mb-4"
            />
            <p className="text-sm text-gray-400 max-w-md">{t("tagline")}</p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">{t("services.title")}</h3>
            <ul className="space-y-2 text-sm">
              {["items.0", "items.1", "items.2", "items.3"].map((key, index) => (
                <li key={index}>
                  <Link href="/#capabilities" className="hover:text-brand-blue transition-colors duration-200">
                    {t(`services.${key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">{t("contact.title")}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="mailto:jrsolorzano@devit506.com" className="hover:text-brand-blue transition-colors duration-200">
                  jrsolorzano@devit506.com
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/company/devit506" target="_blank" rel="noopener noreferrer" className="hover:text-brand-blue transition-colors duration-200">
                  {t("contact.linkedin")}
                </a>
              </li>
              <li>
                <span className="text-gray-500">{t("contact.location")}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
            <p>{t("legal.copyright", { year: currentYear })}</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <span className="hover:text-brand-blue transition-colors duration-200 cursor-pointer">
                {t("legal.privacy")}
              </span>
              <span className="hover:text-brand-blue transition-colors duration-200 cursor-pointer">
                {t("legal.terms")}
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
```
