import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { notFound, redirect } from "next/navigation";
import { Link } from "@/navigation";
import { SITE_ORIGIN } from "@/app/lib/site";
import {
  casePath,
  findSolutionBySlug,
  isLocale,
  resolveSolution,
  solutionPath,
  solutionUrl,
  slugsForPrefix,
  type SolutionId,
} from "@/app/lib/solutions";
import JsonLd from "../../JsonLd";
import Arrow from "../Arrow";
import Reveal from "../Reveal";
import SolutionMark from "./SolutionMark";

type Segment = "soluciones" | "solutions";

type PageParams = Promise<{ locale: string; slug: string }>;

type EvidenceItem = {
  slug: string;
  title: string;
  reason: string;
};

type CopyBlock = {
  title: string;
  body: string[];
};

type ApproachStep = {
  label: string;
  body: string;
};

type DepthItem = {
  title: string;
  body: string;
};

export function solutionStaticParams(segment: Segment) {
  return slugsForPrefix(segment).map((slug) => ({ slug }));
}

export async function solutionMetadata(
  params: PageParams,
  segment: Segment
): Promise<Metadata> {
  const { locale, slug } = await params;
  const id = resolveOrRedirect(locale, segment, slug);
  const t = await getTranslations({ locale, namespace: `solutionPages.${id}` });
  const canonical = solutionUrl(id, isLocale(locale) ? locale : "en");

  return {
    title: t("meta.title"),
    description: t("meta.description"),
    robots: { index: true, follow: true },
    openGraph: {
      type: "website",
      locale: locale === "en" ? "en_US" : "es_CR",
      url: canonical,
      siteName: "BRILER",
      title: t("meta.title"),
      description: t("meta.description"),
    },
    twitter: {
      card: "summary_large_image",
      title: t("meta.title"),
      description: t("meta.description"),
    },
    alternates: {
      canonical,
      languages: {
        es: solutionUrl(id, "es"),
        en: solutionUrl(id, "en"),
      },
    },
  };
}

function resolveOrRedirect(locale: string, segment: Segment, slug: string): SolutionId {
  const exact = resolveSolution(locale, segment, slug);
  if (exact) return exact;

  const family = findSolutionBySlug(slug);
  if (family && isLocale(locale)) {
    redirect(`/${locale}${solutionPath(family, locale)}`);
  }

  notFound();
}

export default async function SolutionLanding({
  params,
  segment,
}: {
  params: PageParams;
  segment: Segment;
}) {
  const { locale, slug } = await params;
  const id = resolveOrRedirect(locale, segment, slug);
  const pageLocale = isLocale(locale) ? locale : "en";
  const t = await getTranslations({ locale, namespace: `solutionPages.${id}` });
  const shared = await getTranslations({ locale, namespace: "solutionPages.shared" });
  const catalog = await getTranslations({ locale, namespace: "solutionPages.catalog" });

  const matter = t.raw("matter") as CopyBlock;
  const does = t.raw("does") as CopyBlock;
  const capabilities = t.raw("capabilities") as string[];
  const approach = t.raw("approach") as { title: string; steps: ApproachStep[] };
  const evidence = t.raw("evidence") as { title: string; empty?: string; items?: EvidenceItem[] };
  const evidenceItems = evidence.items ?? [];
  const depth = t.raw("depth") as { title: string; items: DepthItem[] };
  const canonical = solutionUrl(id, pageLocale);

  return (
    <article className="solpage" data-surface="solution" data-solution={id} data-family={id}>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: t("schema.name"),
          serviceType: t("schema.serviceType"),
          description: t("meta.description"),
          url: canonical,
          provider: {
            "@type": "Organization",
            name: "BRILER",
            url: SITE_ORIGIN,
          },
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: shared("home"),
              item: `${SITE_ORIGIN}/${pageLocale}`,
            },
            {
              "@type": "ListItem",
              position: 2,
              name: shared("solutions"),
              item: `${SITE_ORIGIN}/${pageLocale}#solutions`,
            },
            {
              "@type": "ListItem",
              position: 3,
              name: catalog(id),
              item: canonical,
            },
          ],
        }}
      />

      <header className="solpage__hero">
        <div className="wrap solpage__hero-in">
          <Reveal>
            <nav className="solpage__bc" aria-label="Breadcrumb">
              <ol>
                <li>
                  <Link href="/" locale={pageLocale}>
                    {shared("home")}
                  </Link>
                </li>
                <li>
                  <Link href="/#solutions" locale={pageLocale}>
                    {shared("solutions")}
                  </Link>
                </li>
                <li>
                  <span aria-current="page">{catalog(id)}</span>
                </li>
              </ol>
            </nav>
            <p className="eyebrow">{t("hero.eyebrow")}</p>
            <h1 className="solpage__h1">{t("hero.title")}</h1>
            <p className="solpage__lede">{t("hero.lede")}</p>
          </Reveal>
          <Reveal delay={80}>
            <SolutionMark family={id} />
          </Reveal>
        </div>
      </header>

      <section className="solpage__sec" aria-labelledby="sol-matter">
        <div className="wrap solpage__grid">
          <Reveal>
            <p className="eyebrow">{t("matter.eyebrow")}</p>
            <h2 className="solpage__h2" id="sol-matter">
              {matter.title}
            </h2>
          </Reveal>
          <Reveal delay={70}>
            <div className="solpage__copy">
              {matter.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="solpage__sec solpage__sec--deck" aria-labelledby="sol-does">
        <div className="wrap">
          <Reveal>
            <p className="eyebrow">{t("does.eyebrow")}</p>
            <h2 className="solpage__h2" id="sol-does">
              {does.title}
            </h2>
            <div className="solpage__copy solpage__copy--wide">
              {does.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </Reveal>
          <Reveal delay={80}>
            <ul className="solpage__caps">
              {capabilities.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Reveal>
          <p className="solpage__note">{shared("consulting")}</p>
        </div>
      </section>

      <section className="solpage__sec" aria-labelledby="sol-approach">
        <div className="wrap">
          <Reveal>
            <p className="eyebrow">{shared("approachEyebrow")}</p>
            <h2 className="solpage__h2" id="sol-approach">
              {approach.title}
            </h2>
          </Reveal>
          <ol className="solpage__steps">
            {approach.steps.map((step, index) => (
              <Reveal key={step.label} delay={index * 40}>
                <li>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <h3>{step.label}</h3>
                  <p>{step.body}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="solpage__sec solpage__sec--deck" aria-labelledby="sol-evidence">
        <div className="wrap">
          <Reveal>
            <p className="eyebrow">{shared("evidenceEyebrow")}</p>
            <h2 className="solpage__h2" id="sol-evidence">
              {evidence.title}
            </h2>
          </Reveal>
          {evidenceItems.length ? (
            <div className="solpage__cases">
              {evidenceItems.map((item) => (
                <Reveal key={item.slug}>
                  <article className="solpage__case">
                    <h3>{item.title}</h3>
                    <p>{item.reason}</p>
                    <Link href={casePath(item.slug)} locale={pageLocale} className="tlink" data-case={item.slug}>
                      {shared("readCase")}
                      <Arrow />
                    </Link>
                  </article>
                </Reveal>
              ))}
            </div>
          ) : (
            <p className="solpage__empty">{evidence.empty}</p>
          )}
        </div>
      </section>

      <section className="solpage__sec" aria-labelledby="sol-depth">
        <div className="wrap solpage__grid">
          <Reveal>
            <p className="eyebrow">{shared("depthEyebrow")}</p>
            <h2 className="solpage__h2" id="sol-depth">
              {depth.title}
            </h2>
          </Reveal>
          <ol className="solpage__depth">
            {depth.items.map((item) => (
              <li key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="solpage__cta" aria-labelledby="sol-cta">
        <div className="wrap">
          <Reveal>
            <p className="eyebrow">{t("cta.eyebrow")}</p>
            <h2 className="solpage__h2" id="sol-cta">
              {t("cta.title")}
            </h2>
            <p className="solpage__lede">{t("cta.lede")}</p>
            <div className="study-cta__actions">
              <Link className="btn btn--primary" href="/#contact" locale={pageLocale} data-cta="contact" data-solution={id}>
                {shared("ctaContact")}
                <Arrow />
              </Link>
              <Link className="btn btn--ghost" href="/agendar" locale={pageLocale} data-cta="schedule" data-solution={id}>
                {shared("ctaSchedule")}
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </article>
  );
}
