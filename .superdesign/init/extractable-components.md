# Extractable components

Current layout components are DEVIT506-branded. BRILER visual exploration should NOT extract them as reusable Superdesign components — they would lock the old identity. Listed for inventory only.

## Navbar
- Source: `app/components/Navbar.tsx`
- Category: layout
- Description: Fixed glass top nav with logo, 4 links, language switcher, CTA, mobile drawer
- Extractable props: activeItem (string), locale (es|en)
- Hardcoded: DEVIT506 logos, link targets, brand-blue CTA, drawer colors
- BRILER exploration: skip extraction

## Footer
- Source: `app/components/Footer.tsx`
- Category: layout
- Description: Dark brand footer with logo, services, contact, legal spans
- Extractable props: year (number)
- Hardcoded: DEVIT506 logo, emails, LinkedIn, Costa Rica only
- BRILER exploration: skip extraction

## LanguageSwitcher
- Source: `app/components/LanguageSwitcher.tsx`
- Category: basic
- Description: ES/EN dropdown
- Extractable props: locale (string)
- Hardcoded: flags, labels, glass styles
- BRILER exploration: skip (too brand-coupled; recreate per concept)

## HeroSection
- Source: `app/components/Hero.tsx`
- Category: layout
- Description: DEVIT506 CTO-externo hero
- Extractable props: none useful
- Hardcoded: copy keys, mesh gradients, next/link CTAs
- BRILER exploration: skip — IA and thesis change

## TrustBar
- Source: `app/components/TrustBar.tsx`
- Category: basic
- Description: KPI counters + client logos
- Extractable props: none
- Hardcoded: 50+/30+/12+/99.9% counters (avoid in BRILER concepts)
- BRILER exploration: skip

No shared Button/Input/Card primitives exist to extract.
