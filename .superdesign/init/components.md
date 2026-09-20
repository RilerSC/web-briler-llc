# Shared UI Components

Framework: Next.js 16 App Router + React 19 + Tailwind CSS v4.
Component library: none (no shadcn/ui, Radix, MUI, or other primitive kit).
Shared marketing components live in `app/components/`. There are no reusable Button/Input/Card primitives — forms and CTAs are inline Tailwind.

## LanguageSwitcher

- File: `app/components/LanguageSwitcher.tsx`
- Description: Desktop ES/EN dropdown using next-intl navigation
- Props: none (reads locale from next-intl)

```tsx
"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "../../navigation";
import { motion } from "framer-motion";
import { useState, useTransition } from "react";

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: "es", label: "ES", flag: "🇪🇸", name: "Español" },
    { code: "en", label: "EN", flag: "🇺🇸", name: "English" },
  ];

  const currentLanguage = languages.find((lang) => lang.code === locale) || languages[0];

  const handleLanguageChange = (newLocale: string) => {
    if (newLocale === locale) {
      setIsOpen(false);
      return;
    }

    setIsOpen(false);

    startTransition(() => {
      router.replace(pathname, { locale: newLocale });
    });
  };

  return (
    <div className="relative">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        disabled={isPending}
        className="group relative flex items-center gap-2 px-3 py-2 rounded-lg
          bg-white/60 backdrop-blur-sm border-[0.5px] border-white/20
          hover:bg-white/80 hover:border-brand-blue/30
          transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]
          shadow-[0_1px_3px_rgba(0,0,0,0.05)] hover:shadow-[0_2px_8px_rgba(0,156,222,0.1)]
          disabled:opacity-50 disabled:cursor-not-allowed"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
      >
        <span className="text-lg">{currentLanguage.flag}</span>
        <span className="text-sm font-medium text-gray-700 group-hover:text-brand-blue transition-colors">
          {currentLanguage.label}
        </span>
        <svg
          className={`w-4 h-4 text-gray-500 group-hover:text-brand-blue transition-all duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </motion.button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
            className="absolute top-full right-0 mt-2 w-48 z-50
              bg-white/80 backdrop-blur-xl rounded-xl
              border-[0.5px] border-white/20
              shadow-[0_8px_24px_rgba(0,0,0,0.12)]
              overflow-hidden"
          >
            {languages.map((lang) => (
              <motion.button
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                disabled={isPending}
                className={`w-full flex items-center gap-3 px-4 py-3
                  transition-all duration-200
                  disabled:opacity-50 disabled:cursor-not-allowed
                  ${
                    lang.code === locale
                      ? "bg-brand-blue/10 text-brand-blue"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                whileHover={{ scale: lang.code === locale ? 1 : 1.02, x: 2 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
              >
                <span className="text-xl">{lang.flag}</span>
                <div className="flex-1 text-left">
                  <div className="font-medium text-sm">{lang.name}</div>
                  <div className="text-xs opacity-60">{lang.label}</div>
                </div>
                {lang.code === locale && (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </motion.button>
            ))}
          </motion.div>
        </>
      )}
    </div>
  );
}
```

## Page-section components (not primitives)

These are homepage/case-study sections, not shared UI primitives. Source lives in `app/components/`:

- `Hero.tsx` — DEVIT506 hero (uses `next/link`, not locale-aware Link)
- `TrustBar.tsx` — KPI counters + client logos
- `CapabilitiesBento.tsx` — 6 capability cards
- `FeaturedProjects.tsx` — 3 case teaser cards
- `ContactSection.tsx` — lead form (honeypot + country picker hardcoded in Spanish)
