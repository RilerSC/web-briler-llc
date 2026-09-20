import type { Locale } from "@/i18n";
import { SITE_ORIGIN } from "./site";

export const SOLUTION_IDS = [
  "software",
  "integration",
  "legacy",
  "automation",
  "infrastructure",
] as const;

export type SolutionId = (typeof SOLUTION_IDS)[number];

type LocalizedRoute = {
  prefix: "soluciones" | "solutions";
  slug: string;
};

export const SOLUTION_ROUTES: Record<SolutionId, Record<Locale, LocalizedRoute>> = {
  software: {
    es: { prefix: "soluciones", slug: "software-a-medida" },
    en: { prefix: "solutions", slug: "custom-software-development" },
  },
  integration: {
    es: { prefix: "soluciones", slug: "integracion-de-sistemas" },
    en: { prefix: "solutions", slug: "systems-integration" },
  },
  legacy: {
    es: { prefix: "soluciones", slug: "modernizacion-sistemas-legacy" },
    en: { prefix: "solutions", slug: "legacy-system-modernization" },
  },
  automation: {
    es: { prefix: "soluciones", slug: "automatizacion-ia" },
    en: { prefix: "solutions", slug: "ai-automation" },
  },
  infrastructure: {
    es: { prefix: "soluciones", slug: "infraestructura-arquitectura" },
    en: { prefix: "solutions", slug: "cloud-infrastructure-architecture" },
  },
};

export const CASE_SLUGS = {
  erpWeb: "erp-web-coopebanacio",
  autogestion: "autogestion-coopebanacio",
  coopemercadito: "coopemercadito-coopebanacio",
  hubspot: "hubspot-core-coopebanacio",
} as const;

export const CASE_RELATED_SOLUTIONS: Record<string, SolutionId[]> = {
  [CASE_SLUGS.erpWeb]: ["software", "legacy"],
  [CASE_SLUGS.autogestion]: ["software", "integration"],
  [CASE_SLUGS.coopemercadito]: ["software"],
  [CASE_SLUGS.hubspot]: ["integration", "automation"],
};

export function isLocale(value: string): value is Locale {
  return value === "es" || value === "en";
}

export function solutionPath(id: SolutionId, locale: Locale): `/${string}` {
  const route = SOLUTION_ROUTES[id][locale];
  return `/${route.prefix}/${route.slug}`;
}

export function solutionUrl(id: SolutionId, locale: Locale): string {
  return `${SITE_ORIGIN}/${locale}${solutionPath(id, locale)}`;
}

export function casePath(slug: string): `/${string}` {
  return `/cases/${slug}`;
}

export function resolveSolution(
  locale: string,
  prefix: LocalizedRoute["prefix"],
  slug: string
): SolutionId | null {
  if (!isLocale(locale)) return null;
  for (const id of SOLUTION_IDS) {
    const route = SOLUTION_ROUTES[id][locale];
    if (route.prefix === prefix && route.slug === slug) return id;
  }
  return null;
}

export function findSolutionBySlug(slug: string): SolutionId | null {
  for (const id of SOLUTION_IDS) {
    for (const locale of ["es", "en"] as const) {
      if (SOLUTION_ROUTES[id][locale].slug === slug) return id;
    }
  }
  return null;
}

export function familyFromPublicPath(pathname: string): SolutionId | null {
  const path = pathname.split("#")[0].replace(/\/$/, "") || "/";
  for (const id of SOLUTION_IDS) {
    for (const locale of ["es", "en"] as const) {
      if (solutionPath(id, locale) === path) return id;
    }
  }
  return null;
}

export function localizePathname(pathname: string, locale: Locale): string {
  const hashIndex = pathname.indexOf("#");
  const path = hashIndex >= 0 ? pathname.slice(0, hashIndex) : pathname;
  const hash = hashIndex >= 0 ? pathname.slice(hashIndex) : "";
  const family = familyFromPublicPath(path);
  if (!family) return pathname;
  return `${solutionPath(family, locale)}${hash}`;
}

export function slugsForPrefix(prefix: LocalizedRoute["prefix"]): string[] {
  const locale = prefix === "soluciones" ? "es" : "en";
  return SOLUTION_IDS.map((id) => SOLUTION_ROUTES[id][locale].slug);
}
