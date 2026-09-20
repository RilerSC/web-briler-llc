# 11 — Architecture

**Proyecto:** Web corporativa internacional BRILER  
**Actualizado:** 2026-09-20  
**Alcance:** registrar la arquitectura **realmente existente** en el repositorio y separar requisitos target aún no implementados.  
**No autoriza** implementación.

Toda afirmación CURRENT fue contrastada con el repositorio tras la migración D2 y el cleanup DEVIT506 autorizado.

---

## CURRENT — Arquitectura existente (BRILER)

### Stack

| Capa | Implementado |
|---|---|
| Framework | Next.js 16.1.5, App Router |
| UI | React 19.2.3, React DOM 19.2.3 |
| Lenguaje | TypeScript 5, `strict: true` |
| Estilos | Tailwind CSS v4 + `app/briler.css` (D2) + tokens mínimos en `app/globals.css` |
| i18n | next-intl ^4.8.0 |
| Validación | zod ^4.3.6 |
| Email | `@azure/identity` + `@microsoft/microsoft-graph-client` |
| Fuentes | Sora, Inter, JetBrains Mono (`next/font/google`) |
| Lint | ESLint 9 + eslint-config-next 16.1.5 |
| Paquete | `briler-web@0.1.0`, private |

No hay test runner, CMS, autenticación, base de datos de aplicación ni `vercel.json`. No hay GA4.

### Runtime shape

Sitio de marketing + una API Route.

- UI bajo `app/[locale]/`
- Home y secciones D2 en `app/components/briler/`
- Shell: `Navbar.tsx`, `Footer.tsx`, `LanguageSwitcher.tsx`
- Única API: `POST /api/contact`
- Copy productivo en `messages/es.json` y `messages/en.json` (`navbar`, `contact`, `footer`, `schedule`, `briler`, `cases`, `meta`) más `messages/solutionPages.{es,en}.json`
- Assets de marca runtime en `public/brand/`
- Prototipo de referencia D2 en `public/lab/briler-d/`
- Fuente de diseño en `design/brand/`
- El middleware resuelve el locale; no existe `app/layout.tsx` ni `app/page.tsx` en raíz

### i18n

- Locales: `es`, `en`
- `localePrefix: "always"`
- `localeDetection: true`
- Fallback `defaultLocale: "en"`
- Precedencia: URL explícita → cookie `NEXT_LOCALE` → `Accept-Language` (familia `es` → ES; cualquier otro → EN)
- Navegación locale-aware: `navigation.ts`

### Rutas actuales

Prefijo obligatorio `/es` o `/en`.

| Ruta | Superficie |
|---|---|
| `/` → `/{locale}` | Home BRILER D2 |
| `/{locale}/cases/erp-web-coopebanacio` | Caso ERP-WEB / COOPEBANACIO R.L. |
| `/{locale}/cases/autogestion-coopebanacio` | Caso AUTOGESTIÓN / COOPEBANACIO R.L. |
| `/{locale}/cases/coopemercadito-coopebanacio` | Caso COOPEMERCADITO / COOPEBANACIO R.L. |
| `/{locale}/cases/hubspot-core-coopebanacio` | Caso HubSpot ↔ Core financiero / COOPEBANACIO R.L. |
| `/{locale}/soluciones/{slug}` | Landings de solución en ES |
| `/{locale}/solutions/{slug}` | Landings de solución en EN |
| `/{locale}/agendar` | Agendamiento (Koalendar) |
| `/{locale}` 404 | `not-found.tsx` |
| `/api/contact` | Envío de lead |

Anclas de home: `#solutions`, `#about`, `#contact`, `#problems`, `#process`, `#evidence`.

Las URLs de solución son distintas por idioma. El catálogo canónico vive en `app/lib/solutions.ts`. Un slug ES bajo `/en/...` redirige a su equivalente EN, y viceversa.

| Familia | ES | EN |
|---|---|---|
| Software a medida | `/es/soluciones/software-a-medida` | `/en/solutions/custom-software-development` |
| Integración de sistemas | `/es/soluciones/integracion-de-sistemas` | `/en/solutions/systems-integration` |
| Modernización legacy | `/es/soluciones/modernizacion-sistemas-legacy` | `/en/solutions/legacy-system-modernization` |
| Automatización e IA | `/es/soluciones/automatizacion-ia` | `/en/solutions/ai-automation` |
| Infraestructura y arquitectura | `/es/soluciones/infraestructura-arquitectura` | `/en/solutions/cloud-infrastructure-architecture` |

Consultoría tecnológica no tiene URL SEO propia en V1.

Los casos viven bajo `/{locale}/cases/{slug}`. No se reutilizan las rutas legacy `/proyectos/*`. No hay CMS: copy en `messages/*.json` y componentes en `app/components/briler/cases/`.

### Componentes principales

| Componente | Rol |
|---|---|
| `Navbar.tsx` | Chrome D2, skip link, LanguageSwitcher, CTA agenda, acceso a cinco soluciones |
| `briler/solutions/SolutionLanding.tsx` | Landings de solución ES/EN, metadata, Service/Breadcrumb JSON-LD |
| `LanguageSwitcher.tsx` | Cambio ES/EN (persiste `NEXT_LOCALE`) |
| `briler/Hero.tsx` + `ResolutionField` | Apertura D2 |
| `briler/Trust.tsx` | Logos de clientes reales, sin KPIs |
| `briler/BusinessProblems.tsx` | Entrada pain-first |
| `briler/Solutions.tsx` | PRIMARY / SUPPORTING |
| `briler/Evidence.tsx` | Cuatro casos reales (ERP-WEB, AUTOGESTIÓN, COOPEMERCADITO, HubSpot ↔ Core) |
| `briler/cases/*` | Piezas compartidas de ficha (CTA, capacidades) y visuales específicas por caso |
| `briler/Process.tsx` / `TechnicalDepth.tsx` / `About.tsx` | Capítulos D2 |
| `briler/FinalContact.tsx` + `ContactForm.tsx` | CTA + formulario |
| `Footer.tsx` | Marca BRILER, presencia CR/US/ES, slots de canal reservados |

### Conversiones e integraciones

**Contacto**

- Frontend: `ContactForm.tsx` → `POST /api/contact`
- Backend: validación Zod, honeypot `website_url`, Microsoft Graph (`Mail.Send`)
- Flujo: email interno circular (`OFFICE365_SENDER_EMAIL` emisor y receptor) + auto-responder
- Env requeridas: `ID_APPLICATION`, `ID_DIRECTORY`, `SECRET_KEY`, `OFFICE365_SENDER_EMAIL`
- Plantillas HTML de presentación BRILER; el buzón sigue siendo el configurado en entorno

**Agenda**

- `app/[locale]/agendar/page.tsx`
- Widget Koalendar: `reunirse-con-riler` (ES), `coffee-with-riler` (EN)
- Permanencia del proveedor: PENDING

No hay analytics en código.

### SEO actual

Metadata BRILER en `app/[locale]/layout.tsx` y por superficie: title, description, robots, Open Graph, Twitter, canonical `https://briler.net/...`, alternates ES/EN.

Infraestructura V1:

- `app/sitemap.ts` — home, agenda, cuatro casos y diez URLs de solución, con alternates ES/EN
- `app/robots.ts` — `allow: /`, sitemap `https://briler.net/sitemap.xml`
- Organization JSON-LD global
- Service + BreadcrumbList en landings de solución (sin ratings, precios ni oficinas inventadas)

No implementado:

- OG image
- Search Console
- GA4

### Sistema visual y assets

Tokens D2 en `app/briler.css`: canvas `#000012`, accent `#0071F6`, signal `#0ECEF8`, terminal `#A049FB`.

Assets runtime:

- `public/brand/briler-lockup-gradient.png`
- `public/brand/briler-lockup-white.png`
- `public/brand/briler-isotype.png`
- `app/favicon.ico`, `app/icon.png` y `app/apple-icon.png` (isotipo BRILER; Next.js los sirve por convención de archivo)

Logos de clientes en `public/clientes/` y normalizados del lab.  
MADE Outer Sans permanece en `design/brand/` con licencia PERSONAL USE; no se carga en runtime.

### Deployment previsto

Documentado como Vercel-ready. No hay `vercel.json`.  
Estado real de deployment, dominio vivo y variables de producción: no verificado.

---

## TARGET / APPROVED — Requisitos aprobados, parcialmente pendientes

Decisiones de Dirección ya tomadas. Lo siguiente **sigue pendiente** de implementación:

- OG image y Search Console
- GA4 y medición de funnel
- Casos BRILER adicionales: ninguno pendiente en el conjunto principal de cuatro
- Superficies legales
- Canales y buzones BRILER definitivos
- Permanencia o reemplazo de Koalendar

Ya implementado respecto al target original:

- Home D2 en App Router
- Autodetección ES/EN con precedencia URL → cookie → navegador
- Metadata mínima BRILER / `briler.net`
- Cleanup DEVIT506 de superficies productivas y residuos confirmados
- SEO comercial V1: cinco soluciones ES/EN, sitemap, robots, schema conservador

### Experiencia comercial vigente

- **CEO-first:** problema → solución → capacidad → evidencia → profundidad técnica
- **Pain-first / híbrido:** entrada por Business Problems; soluciones también directas

### Casos

- Estructura conceptual aprobada: **Problem → Intervention → Result**
- Casos publicados (conjunto principal de cuatro): **ERP-WEB**, **AUTOGESTIÓN**, **COOPEMERCADITO** y **HubSpot ↔ Core financiero** (`/{locale}/cases/{slug}-coopebanacio`), todos COOPEBANACIO R.L.
- Home Evidence enlaza los cuatro. El título público del cuarto caso es HubSpot ↔ Core financiero; no se usa CODEAS en superficie pública.
