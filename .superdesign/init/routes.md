# Routes

i18n: next-intl. Locales `es` (default), `en`. `localePrefix: "always"`. `localeDetection: false`.
No root `app/layout.tsx` or `app/page.tsx`. Middleware redirects `/` → `/{locale}`.

## App routes

| URL path | File | Layout | Summary |
|---|---|---|---|
| `/{locale}` | `app/[locale]/page.tsx` | `app/[locale]/layout.tsx` | DEVIT506 marketing home: Hero, TrustBar, Capabilities, Projects, Contact |
| `/{locale}/agendar` | `app/[locale]/agendar/page.tsx` | same | Koalendar booking (ES/EN widgets) |
| `/{locale}/proyectos/marketplace-coopebanacio` | `app/[locale]/proyectos/marketplace-coopebanacio/page.tsx` | same | Case study |
| `/{locale}/proyectos/observatorio-sostenibilidad` | `app/[locale]/proyectos/observatorio-sostenibilidad/page.tsx` | same | Case study |
| `/{locale}/proyectos/integracion-hubspot-codeas` | `app/[locale]/proyectos/integracion-hubspot-codeas/page.tsx` | same | Case study |
| `/{locale}` 404 | `app/[locale]/not-found.tsx` | same | Hardcoded bilingual 404 |
| `POST /api/contact` | `app/api/contact/route.ts` | none | Lead email via Microsoft Graph |

Home anchors: `#capabilities`, `#projects`, `#contact`.

BRILER homepage IA (Solutions, Problems, How we work, About, etc.) is **not implemented**. Current home is DEVIT506.

## Router config

`navigation.ts`:

```ts
import { createNavigation } from "next-intl/navigation";
import { locales } from "./i18n";

export const { Link, redirect, usePathname, useRouter } = createNavigation({ locales });
```

`middleware.ts`:

```ts
import createMiddleware from "next-intl/middleware";
import { locales, defaultLocale } from "./i18n";

export default createMiddleware({
  locales,
  defaultLocale,
  localeDetection: false,
  localePrefix: "always",
});

export const config = {
  matcher: [
    "/",
    "/(es|en)/:path*",
    "/((?!api|_next|_vercel|.*\\..*).*)",
  ],
};
```
