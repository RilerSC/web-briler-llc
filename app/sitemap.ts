import type { MetadataRoute } from "next";
import { locales } from "@/i18n";
import { SITE_ORIGIN } from "@/app/lib/site";
import { CASE_SLUGS, SOLUTION_IDS, solutionPath } from "@/app/lib/solutions";

const caseSlugs = Object.values(CASE_SLUGS);

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    entries.push({
      url: `${SITE_ORIGIN}/${locale}`,
      alternates: {
        languages: {
          es: `${SITE_ORIGIN}/es`,
          en: `${SITE_ORIGIN}/en`,
        },
      },
    });

    entries.push({
      url: `${SITE_ORIGIN}/${locale}/agendar`,
      alternates: {
        languages: {
          es: `${SITE_ORIGIN}/es/agendar`,
          en: `${SITE_ORIGIN}/en/agendar`,
        },
      },
    });

    for (const slug of caseSlugs) {
      entries.push({
        url: `${SITE_ORIGIN}/${locale}/cases/${slug}`,
        alternates: {
          languages: {
            es: `${SITE_ORIGIN}/es/cases/${slug}`,
            en: `${SITE_ORIGIN}/en/cases/${slug}`,
          },
        },
      });
    }

    for (const id of SOLUTION_IDS) {
      entries.push({
        url: `${SITE_ORIGIN}/${locale}${solutionPath(id, locale)}`,
        alternates: {
          languages: {
            es: `${SITE_ORIGIN}/es${solutionPath(id, "es")}`,
            en: `${SITE_ORIGIN}/en${solutionPath(id, "en")}`,
          },
        },
      });
    }
  }

  return entries;
}
