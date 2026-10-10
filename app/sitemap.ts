import type { MetadataRoute } from "next";
import { locales } from "@/i18n";
import { SITE_ORIGIN } from "@/app/lib/site";
import { CASE_SLUGS, SOLUTION_IDS, solutionPath } from "@/app/lib/solutions";

const caseSlugs = Object.values(CASE_SLUGS);

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];
  const lastModified = new Date();

  for (const locale of locales) {
    entries.push({
      url: `${SITE_ORIGIN}/${locale}`,
      lastModified,
      alternates: {
        languages: {
          es: `${SITE_ORIGIN}/es`,
          en: `${SITE_ORIGIN}/en`,
          "x-default": `${SITE_ORIGIN}/es`,
        },
      },
    });

    entries.push({
      url: `${SITE_ORIGIN}/${locale}/agendar`,
      lastModified,
      alternates: {
        languages: {
          es: `${SITE_ORIGIN}/es/agendar`,
          en: `${SITE_ORIGIN}/en/agendar`,
          "x-default": `${SITE_ORIGIN}/es/agendar`,
        },
      },
    });

    entries.push({
      url: `${SITE_ORIGIN}/${locale}/${locale === "es" ? "privacidad" : "privacy"}`,
      lastModified,
      alternates: {
        languages: {
          es: `${SITE_ORIGIN}/es/privacidad`,
          en: `${SITE_ORIGIN}/en/privacy`,
          "x-default": `${SITE_ORIGIN}/es/privacidad`,
        },
      },
    });

    for (const slug of caseSlugs) {
      entries.push({
        url: `${SITE_ORIGIN}/${locale}/cases/${slug}`,
        lastModified,
        alternates: {
          languages: {
            es: `${SITE_ORIGIN}/es/cases/${slug}`,
            en: `${SITE_ORIGIN}/en/cases/${slug}`,
            "x-default": `${SITE_ORIGIN}/es/cases/${slug}`,
          },
        },
      });
    }

    for (const id of SOLUTION_IDS) {
      entries.push({
        url: `${SITE_ORIGIN}/${locale}${solutionPath(id, locale)}`,
        lastModified,
        alternates: {
          languages: {
            es: `${SITE_ORIGIN}/es${solutionPath(id, "es")}`,
            en: `${SITE_ORIGIN}/en${solutionPath(id, "en")}`,
            "x-default": `${SITE_ORIGIN}/es${solutionPath(id, "es")}`,
          },
        },
      });
    }
  }

  return entries;
}
