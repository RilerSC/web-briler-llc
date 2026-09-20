# 12 — Project State

**Proyecto:** Web corporativa internacional BRILER  
**Actualizado:** 2026-09-20  
**Fase:** Home D2 productiva; conjunto principal de cuatro casos publicado; i18n/autodetección vigentes

---

## Completed

- Discovery técnico, brief, arquitectura y dirección visual D2.
- **Fase 1 productiva:** Home D2 en Next.js; shell BRILER; formulario Graph; agenda Koalendar; metadata mínima `briler.net`.
- **Autodetección ES/EN:** `localeDetection: true`; familia `es` → `/es`; resto → `/en`; URL y `NEXT_LOCALE` prevalecen.
- **Cleanup DEVIT506 (2026-09-20):** retirados componentes de Home legacy, rutas `/proyectos/*`, assets DEVIT506, copy i18n huérfano, utilidades glass, docs operativas históricas, placeholders create-next-app, dependencia `framer-motion` y nombre de paquete `web-devit506` → `briler-web`. Capacidades productivas preservadas. Prototipo D2, `design/brand/`, `.superdesign/` y notas de casos (`Observatorio_Doc.md`, `Hubpot_Proy.md`, `market_Doc.md`) se conservaron.
- **Case Studies (2026-09-20):** primer caso real publicado — ERP-WEB / COOPEBANACIO R.L. Evidence de Home deja de ser solo un marco temporal.
- **Case Studies (2026-09-20):** segundo caso real publicado — AUTOGESTIÓN / Portal Asociados de COOPEBANACIO R.L.
- **Case Studies (2026-09-20):** tercer caso real publicado — COOPEMERCADITO / Marketplace de COOPEBANACIO R.L.
- **Case Studies (2026-09-20):** cuarto caso real publicado — HubSpot ↔ Core financiero / COOPEBANACIO R.L. Conjunto principal de cuatro casos completado.

---

## Current phase

El repositorio representa el producto BRILER actual.

Home `/es` y `/en` sirven D2. Formulario y agenda operan. Autodetección inicial está implementada.

Case Studies inició. El conjunto principal de cuatro casos está publicado: ERP-WEB, AUTOGESTIÓN, COOPEMERCADITO y HubSpot ↔ Core financiero.

---

## Pending

- Casos adicionales fuera del conjunto principal: PENDING — autorización de Dirección
- Verificar evidencia/métricas antes de publicar cualquier otro caso
- Cerrar canales visibles (email, teléfono/WhatsApp, LinkedIn)
- SEO internacional (requisito aprobado)
- GA4 y medición de funnel (requisito aprobado)
- Información legal y de entidades
- Permanencia o reemplazo de calendarios Koalendar
- Buzón Graph BRILER (hoy `OFFICE365_SENDER_EMAIL` de entorno)
- Retiro futuro del prototipo `public/lab/briler-d/` y de `.superdesign/` cuando Dirección lo autorice
- Deployment / dominio `briler.net`

---

## Known facts

- `/es` y `/en` muestran la Home BRILER D2 (`app/components/briler/`).
- Stack: Next.js 16.1.5, React 19.2.3, TypeScript, Tailwind CSS v4, next-intl, Zod, Microsoft Graph.
- Paquete: `briler-web@0.1.0`.
- Tipografía: Sora + Inter + JetBrains Mono. MADE Outer Sans no se usa en runtime.
- i18n: `localePrefix: "always"`, `localeDetection: true`, fallback `en`. Precedencia URL → cookie → `Accept-Language`.
- Superficies productivas: home, cuatro casos COOPEBANACIO, agendar, 404, `POST /api/contact`.
- Casos: `erp-web-coopebanacio`, `autogestion-coopebanacio`, `coopemercadito-coopebanacio`, `hubspot-core-coopebanacio`. Sin CMS.
- Prototipo D2 permanece en `public/lab/briler-d/` como referencia visual.
- No hay CMS, blog, auth, ecommerce, portal ni analytics.

---

## Approved decisions

- Dominio canónico: `briler.net`.
- CEO-first / pain-first.
- Dirección visual D2.
- Casos: estructura `Problem → Intervention → Result`; conjunto principal de cuatro casos publicado.
- SEO y GA4 son requisitos; implementación pendiente.
- Idiomas de primera clase: ES y EN, con la regla de autodetección ya implementada.

---

## Pending verification

- Deployment y dominio vivo
- Buzones Graph BRILER
- Envío end-to-end de correo
- Redes y LinkedIn definitivos
- Measurement ID de GA4
- Consentimiento / privacidad
- Requisitos legales por jurisdicción
- Qué proyectos adicionales pueden publicarse como casos BRILER
- Permanencia de Koalendar y slugs actuales

---

## Next action

> Dirección autoriza SEO, GA4, legal o canales. El conjunto principal de cuatro casos está cerrado.
