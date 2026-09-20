# Theme tokens

## Part 1 — Compact token summary (CURRENT DEVIT506 runtime)

These tokens describe the **existing DEVIT506 site**. They are historical context, not a lock for BRILER visual exploration.

### Color
| Token | Value | Use |
|---|---|---|
| `--background` | `#ffffff` | Page background (light) |
| `--foreground` | `#171717` | Body text |
| `--color-brand-black` | `#222223` | Brand black / footer / headlines |
| `--color-brand-blue` | `#009CDE` | Primary accent, CTAs, links |
| `--glass-bg` | `rgba(255,255,255,0.7)` | Navbar / glass |
| `--glass-border` | `rgba(255,255,255,0.2)` | Glass edges |
| `--glow-blue` | `rgba(0,156,222,0.4)` | Glow utilities |
| `--glow-purple` | `rgba(139,92,246,0.3)` | Mesh orbs (legacy) |
| dark `--background` | `#0a0a0a` | prefers-color-scheme only; UI is not coherent dark |

### Typography
- Families: Geist Sans (`--font-geist-sans`), Geist Mono (`--font-geist-mono`)
- Hero: 4xl / 5xl / 6xl bold, tight tracking
- Section titles: 3xl / 4xl bold
- Body: text-lg gray-600
- Tags/metrics: font-mono, uppercase tracking

### Spacing / layout
- Max width: `max-w-7xl` + `px-4 sm:px-6 lg:px-8`
- Navbar height: `h-16`, content `pt-16`
- Section padding: `py-12 md:py-16` (home); hero `py-14 md:py-20`
- Card padding: `p-5 md:p-6`

### Radius / surfaces
- Buttons: `rounded-md` (nav CTA), `rounded-xl` (hero CTA)
- Cards: `rounded-2xl`
- Badges: `rounded-full`
- Navbar: `bg-white/70 backdrop-blur-xl` + hairline border
- Footer: solid `bg-brand-black`

### Shadows
- Navbar: `0 1px 3px rgba(0,0,0,0.05)`
- Cards: `0 4px 20px -4px rgba(0,0,0,0.1)`
- Hover: blue glow `0 20px 50px -12px rgba(0,156,222,0.25)`
- CTA: `0 4px 14px rgba(0,156,222,0.25)`

### Motion
- Framer Motion fade-up on scroll (`viewport once`)
- Easing: `cubic-bezier(0.4, 0, 0.2, 1)`
- Hover lift: `-translate-y-0.5` to `-8px`

### Breakpoints (Tailwind defaults)
sm 640 / md 768 / lg 1024 / xl 1280 / 2xl 1536

## Part 2 — Raw source

No `tailwind.config.*`. Tokens live in `app/globals.css` via `@theme inline`.

```css
@import "tailwindcss";

:root {
  --background: #ffffff;
  --foreground: #171717;
  --glass-bg: rgba(255, 255, 255, 0.7);
  --glass-border: rgba(255, 255, 255, 0.2);
  --glow-blue: rgba(0, 156, 222, 0.4);
  --glow-purple: rgba(139, 92, 246, 0.3);
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --font-sans: var(--font-geist-sans);
  --font-mono: var(--font-geist-mono);
  --color-brand-black: #222223;
  --color-brand-blue: #009CDE;
}

@media (prefers-color-scheme: dark) {
  :root {
    --background: #0a0a0a;
    --foreground: #ededed;
  }
}

body {
  background: var(--background);
  color: var(--foreground);
  font-family: var(--font-geist-sans), Arial, Helvetica, sans-serif;
}

.glass {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 0.5px solid rgba(255, 255, 255, 0.3);
}

.glass-dark {
  background: rgba(34, 34, 35, 0.8);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 0.5px solid rgba(255, 255, 255, 0.1);
}

.glass-card {
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 0.5px solid rgba(255, 255, 255, 0.4);
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.05),
    0 2px 4px -2px rgba(0, 0, 0, 0.05),
    inset 0 1px 0 rgba(255, 255, 255, 0.6);
}

.glow-blue {
  box-shadow:
    0 0 20px rgba(0, 156, 222, 0.15),
    0 0 40px rgba(0, 156, 222, 0.1),
    0 0 60px rgba(0, 156, 222, 0.05);
}

.glow-blue-intense {
  box-shadow:
    0 0 30px rgba(0, 156, 222, 0.25),
    0 0 60px rgba(0, 156, 222, 0.15),
    0 0 90px rgba(0, 156, 222, 0.1);
}

.text-gradient-metallic {
  background: linear-gradient(135deg, #222223 0%, #4a4a4b 25%, #222223 50%, #4a4a4b 75%, #222223 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.text-gradient-blue {
  background: linear-gradient(135deg, #009CDE 0%, #00c4ff 50%, #009CDE 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.mesh-gradient-hero {
  background:
    radial-gradient(ellipse 80% 50% at 50% -20%, rgba(0, 156, 222, 0.15), transparent),
    radial-gradient(ellipse 60% 40% at 80% 50%, rgba(139, 92, 246, 0.08), transparent),
    radial-gradient(ellipse 50% 30% at 20% 80%, rgba(0, 156, 222, 0.1), transparent),
    linear-gradient(to bottom, #fafafa, #ffffff);
}

.mesh-gradient-section {
  background:
    radial-gradient(ellipse 100% 50% at 50% 0%, rgba(0, 156, 222, 0.06), transparent),
    radial-gradient(ellipse 80% 40% at 100% 50%, rgba(139, 92, 246, 0.04), transparent),
    #f9fafb;
}

.transition-premium {
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}

.transition-luxury {
  transition-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
  transition-duration: 500ms;
}

.card-hover-glow {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.card-hover-glow:hover {
  transform: translateY(-4px);
  box-shadow:
    0 20px 40px -12px rgba(0, 156, 222, 0.15),
    0 0 20px rgba(0, 156, 222, 0.1);
}

.noise-overlay::after {
  content: '';
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%' height='100%' filter='url(%23noise)'/%3E%3C/svg%3E");
  opacity: 0.02;
  pointer-events: none;
  mix-blend-mode: overlay;
}
```
