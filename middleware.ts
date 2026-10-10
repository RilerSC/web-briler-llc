import createMiddleware from "next-intl/middleware";
import { locales, defaultLocale } from "./i18n";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,

  // Precedence implemented by next-intl resolveLocale:
  // 1. explicit URL prefix (/es, /en)
  // 2. NEXT_LOCALE cookie (LanguageSwitcher / prior explicit visit)
  // 3. Accept-Language: familia `es` → es; cualquier otro → defaultLocale (en)
  localeDetection: true,
  localePrefix: "always",
});

export default function middleware(request: NextRequest) {
  const hostname = request.headers.get("host") || "";
  const isProduction = hostname === "www.briler.net";

  if (!isProduction) {
    const response = intlMiddleware(request);
    response.headers.set("X-Robots-Tag", "noindex, nofollow");
    return response;
  }

  return intlMiddleware(request);
}

export const config = {
  // Matcher simplificado: todas las rutas excepto archivos estáticos, API y assets
  matcher: [
    "/",                                          // Raíz para detección de idioma
    "/(es|en)/:path*",                           // Rutas con locale explícito
    "/((?!api|_next|_vercel|.*\\..*).*)",       // Todo lo demás excepto archivos
  ],
};
