# Page dependency trees

## /{locale} (Home — DEVIT506 current)

Entry: `app/[locale]/page.tsx`
Layout: `app/[locale]/layout.tsx`
Dependencies:
- `app/components/Hero.tsx`
- `app/components/TrustBar.tsx`
- `app/components/CapabilitiesBento.tsx`
- `app/components/FeaturedProjects.tsx`
  - `@/navigation` (`Link`)
- `app/components/ContactSection.tsx`
- layout shell:
  - `app/components/Navbar.tsx`
    - `app/components/LanguageSwitcher.tsx`
    - `@/navigation`
  - `app/components/Footer.tsx`
    - `@/navigation`
- `app/globals.css`
- `messages/es.json` / `messages/en.json`

## /{locale}/agendar

Entry: `app/[locale]/agendar/page.tsx`
Dependencies:
- `@/navigation`
- Koalendar widget scripts
- layout shell (Navbar, Footer, LanguageSwitcher)

## /{locale}/proyectos/marketplace-coopebanacio

Entry: `app/[locale]/proyectos/marketplace-coopebanacio/page.tsx`
Dependencies:
- `@/navigation`
- `messages/*/projectDetails.marketplace`
- layout shell

## /{locale}/proyectos/observatorio-sostenibilidad

Entry: `app/[locale]/proyectos/observatorio-sostenibilidad/page.tsx`
Dependencies:
- `@/navigation`
- `messages/*/projectDetails.observatorio`
- layout shell
- hardcoded Spanish “Valor Diferencial DEVIT506” block

## /{locale}/proyectos/integracion-hubspot-codeas

Entry: `app/[locale]/proyectos/integracion-hubspot-codeas/page.tsx`
Dependencies:
- `@/navigation`
- `messages/*/projectDetails.hubspot`
- layout shell
- hardcoded Spanish testimonial

## BRILER homepage (design target — not in codebase)

No entry file. Approved conceptual sequence:

1. Navigation
2. Hero
3. Trust / client evidence
4. Business problems
5. BRILER solutions
6. Case studies
7. How BRILER works
8. Technical depth
9. About BRILER
10. Final conversion CTA
11. Footer
