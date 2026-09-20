import createMiddleware from "next-intl/middleware";
import { locales, defaultLocale } from "./i18n";

export default createMiddleware({
  locales,
  defaultLocale,

  // Precedence implemented by next-intl resolveLocale:
  // 1. explicit URL prefix (/es, /en)
  // 2. NEXT_LOCALE cookie (LanguageSwitcher / prior explicit visit)
  // 3. Accept-Language: familia `es` → es; cualquier otro → defaultLocale (en)
  localeDetection: true,
  localePrefix: "always",
});

export const config = {
  // Matcher simplificado: todas las rutas excepto archivos estáticos, API y assets
  matcher: [
    "/",                                          // Raíz para detección de idioma
    "/(es|en)/:path*",                           // Rutas con locale explícito
    "/((?!api|_next|_vercel|.*\\..*).*)",       // Todo lo demás excepto archivos
  ],
};
