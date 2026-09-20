"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/navigation";
import { useTransition } from "react";

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const change = (next: string) => {
    if (next === locale) return;
    startTransition(() => {
      router.replace(pathname, { locale: next });
    });
  };

  return (
    <div className="lang" role="group" aria-label="Language">
      <button type="button" aria-pressed={locale === "es"} disabled={isPending} onClick={() => change("es")}>
        ES
      </button>
      <button type="button" aria-pressed={locale === "en"} disabled={isPending} onClick={() => change("en")}>
        EN
      </button>
    </div>
  );
}
