/**
 * WhatsApp contact configuration for BRILER
 * Locale-specific phone numbers
 */

export const WHATSAPP_CONFIG = {
  es: {
    number: "+50688953149",
    waLink: "https://wa.me/50688953149",
    formatted: "(506) 8895-3149",
    country: "Costa Rica",
  },
  en: {
    number: "+12142302791",
    waLink: "https://wa.me/12142302791",
    formatted: "(214) 230-2791",
    country: "United States",
  },
} as const;

export function getWhatsAppLink(locale: string, message: string): string {
  const config = WHATSAPP_CONFIG[locale as keyof typeof WHATSAPP_CONFIG] || WHATSAPP_CONFIG.en;
  return `${config.waLink}?text=${encodeURIComponent(message)}`;
}

export function getWhatsAppConfig(locale: string) {
  return WHATSAPP_CONFIG[locale as keyof typeof WHATSAPP_CONFIG] || WHATSAPP_CONFIG.en;
}
