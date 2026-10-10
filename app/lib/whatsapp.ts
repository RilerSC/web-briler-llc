/**
 * WhatsApp contact configuration for BRILER
 * Costa Rica official number
 */

export const WHATSAPP_CONFIG = {
  number: "+50688953149",
  waLink: "https://wa.me/50688953149",
  formatted: "(506) 8895-3149",
} as const;

export function getWhatsAppLink(message: string): string {
  return `${WHATSAPP_CONFIG.waLink}?text=${encodeURIComponent(message)}`;
}
