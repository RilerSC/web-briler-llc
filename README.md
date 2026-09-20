# BRILER

Sitio corporativo de BRILER. Next.js 16, React 19, TypeScript, Tailwind CSS v4 y next-intl.

Dirección visual productiva: **D2 — Intelligent Systems**.

## Desarrollo

```bash
npm install
npm run dev
```

- Español: http://localhost:3000/es
- Inglés: http://localhost:3000/en
- Agenda: http://localhost:3000/es/agendar

La entrada `/` resuelve idioma por `Accept-Language` (`es-*` → ES; cualquier otro → EN). Una URL explícita o el LanguageSwitcher prevalecen.

## Stack

- Next.js 16 App Router
- next-intl (`es`, `en`)
- Formulario: `POST /api/contact` → Microsoft Graph
- Agenda: Koalendar

Ver `10_PROJECT_BRIEF.md`, `11_ARCHITECTURE.md` y `12_PROJECT_STATE.md`.
