"use client";

import { useLocale } from "next-intl";
import { getWhatsAppLink } from "@/app/lib/whatsapp";
import { trackContact } from "./MetaPixel";

const MESSAGES = {
  es: "Hola Briler, quiero conversar sobre un proyecto.",
  en: "Hi Briler, I'd like to talk about a project.",
} as const;

export default function WhatsAppButton() {
  const locale = useLocale();
  const message = MESSAGES[locale as keyof typeof MESSAGES] || MESSAGES.en;
  const waLink = getWhatsAppLink(message);

  const handleClick = () => {
    trackContact();
  };

  return (
    <a
      href={waLink}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className="whatsapp-float"
      aria-label={locale === "es" ? "Contactar por WhatsApp" : "Contact via WhatsApp"}
    >
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M16 0C7.164 0 0 7.164 0 16c0 2.828.738 5.484 2.028 7.784L0 32l8.384-2.196A15.934 15.934 0 0 0 16 32c8.836 0 16-7.164 16-16S24.836 0 16 0z"
          fill="currentColor"
        />
        <path
          d="M25.132 22.596c-.352.996-1.748 1.82-2.856 2.06-.756.164-1.744.296-5.068-.964-4.26-1.616-7.02-5.876-7.232-6.148-.212-.272-1.732-2.308-1.732-4.404s1.096-3.124 1.484-3.548c.388-.424.848-.532 1.132-.532.284 0 .568.004.816.016.264.008.616-.1.964.736.352.848 1.196 2.92 1.3 3.132.104.212.172.46.036.732-.136.272-.204.44-.416.676-.212.236-.444.528-.636.708-.212.2-.432.416-.188.82.244.404 1.088 1.796 2.336 2.908 1.608 1.432 2.96 1.88 3.38 2.088.424.212.672.176.92-.104.244-.28 1.052-1.228 1.332-1.652.28-.424.564-.352.948-.212.388.14 2.46 1.16 2.884 1.372.424.212.708.316.812.488.104.172.104.996-.248 1.992z"
          fill="#000012"
        />
      </svg>
    </a>
  );
}
