import { getRequestConfig } from "next-intl/server";

// Idiomas soportados
export const locales = ["es", "en"] as const;
export type Locale = (typeof locales)[number];

// Fallback: cualquier idioma que no sea familia `es` → inglés.
export const defaultLocale: Locale = "en";

export default getRequestConfig(async ({ locale }) => {
  // 🔍 DEBUG: Verificar qué locale está recibiendo el servidor
  console.log(">>> SERVER: getRequestConfig recibió locale:", locale);
  
  // ✅ URL-FIRST: Si locale es válido, usarlo. Si no, usar defaultLocale.
  // NO hardcodear fallback a "en" - siempre respetar defaultLocale configurado
  const validLocale: Locale = 
    locale && locales.includes(locale as Locale) 
      ? (locale as Locale)
      : defaultLocale;

  console.log(">>> SERVER: Cargando mensajes para locale:", validLocale);
  console.log(">>> SERVER: Archivo:", `./messages/${validLocale}.json`);

  // Cargar mensajes del locale validado
  const messages = (await import(`./messages/${validLocale}.json`)).default;
  
  console.log(">>> SERVER: Mensajes cargados exitosamente de", `${validLocale}.json`);

  return {
    locale: validLocale,
    messages,
  };
});
