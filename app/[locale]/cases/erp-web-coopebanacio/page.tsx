import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Link } from "@/navigation";
import Arrow from "../../../components/briler/Arrow";
import ArchitectureField from "../../../components/briler/cases/ArchitectureField";
import CapabilityField from "../../../components/briler/cases/CapabilityField";
import CaseCTA from "../../../components/briler/cases/CaseCTA";
import CaseHero from "../../../components/briler/cases/CaseHero";
import CaseSnapshot from "../../../components/briler/cases/CaseSnapshot";
import CaseVizDefs from "../../../components/briler/cases/CaseVizDefs";
import ProblemField from "../../../components/briler/cases/ProblemField";
import TransitionField from "../../../components/briler/cases/TransitionField";
import Reveal from "../../../components/briler/Reveal";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "cases.erpWeb" });
  const canonical = `https://briler.net/${locale}/cases/erp-web-coopebanacio`;

  return {
    title: t("meta.title"),
    description: t("meta.description"),
    openGraph: {
      title: t("meta.title"),
      description: t("meta.description"),
      url: canonical,
      siteName: "BRILER",
      locale: locale === "en" ? "en_US" : "es_CR",
      type: "article",
    },
    alternates: {
      canonical,
      languages: {
        es: "https://briler.net/es/cases/erp-web-coopebanacio",
        en: "https://briler.net/en/cases/erp-web-coopebanacio",
      },
    },
  };
}

export default async function ErpWebCasePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "cases.erpWeb" });
  const capabilities = t.raw("hero.capabilities") as string[];
  const problem = t.raw("problem.body") as string[];
  const intervention = t.raw("intervention.body") as string[];
  const result = t.raw("result.body") as string[];
  const depth = t.raw("depth.items") as { title: string; body: string }[];
  const demonstrated = t.raw("capabilities.items") as string[];
  const snapshot = t.raw("snapshot") as Record<string, { k: string; v: string }>;
  const lanes = t.raw("lanes") as { legacy: string[]; transition: string[]; modern: string[] };
  const arch = t.raw("arch") as { layer: string; name: string }[];
  const [resultLead, resultRest] = t("result.title").split(/(?<=\.)\s/);

  return (
    <article className="study">
      <CaseVizDefs />
      <div className="wrap study__back">
        <Link href="/#evidence" className="tlink">
          {t("back")}
          <Arrow />
        </Link>
      </div>

      <CaseHero
        eyebrow={t("hero.eyebrow")}
        client={t("hero.client")}
        project={t("hero.project")}
        title={t("hero.title")}
        lede={t("hero.lede")}
        status={t("hero.status")}
        capabilities={capabilities}
        diagram={{
          caption: t("diagram.caption"),
          legacy: t("diagram.legacy"),
          legacyCore: t("diagram.legacyCore"),
          transitionLayer: t("diagram.transitionLayer"),
          coexist: t("diagram.coexist"),
          modern: t("diagram.modern"),
          modernLabel: t("diagram.modernLabel"),
        }}
      />

      <CaseSnapshot items={[snapshot.client, snapshot.engagement, snapshot.strategy, snapshot.platform, snapshot.status]} />

      <ProblemField
        eyebrow={t("problem.eyebrow")}
        title={t("problem.title")}
        body={problem}
        caption={t("diagram.caption")}
        core={t("diagram.legacyCore")}
        legacy={t("diagram.legacy")}
      />

      <TransitionField
        eyebrow={t("intervention.eyebrow")}
        title={t("intervention.title")}
        body={intervention}
        caption={t("diagram.caption")}
        legacy={t("diagram.legacy")}
        legacyLabel={t("diagram.legacyLabel")}
        coexist={t("diagram.coexist")}
        coexistLabel={t("diagram.coexistLabel")}
        modern={t("diagram.modern")}
        modernLabel={t("diagram.modernLabel")}
        lanes={lanes}
      />

      <section className="study-ch study-ch--result" id="result" aria-labelledby="result-h">
        <div className="wrap">
          <Reveal>
            <p className="eyebrow">{t("result.eyebrow")}</p>
            <p className="study__status">{t("result.status")}</p>
            <h2 className="study-statement" id="result-h">
              <span>{resultLead}</span>
              {resultRest ? <span>{resultRest}</span> : null}
            </h2>
            <p className="study-pull">{t("resultHighlight")}</p>
            <div className="study__copy">
              {result.slice(0, 2).map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </Reveal>
          <Reveal delay={80}>
            <figure className="shift" aria-hidden="true">
              <svg viewBox="0 0 1100 160">
                <path className="hsys__run" d="M80 110H300L420 50H620" fill="none" stroke="url(#hsys-run)" strokeWidth="1.4" />
                <path className="hsys__run" d="M80 110H340L480 110H700" fill="none" stroke="url(#hsys-run)" strokeWidth="1.5" />
                <path className="hsys__run hsys__run--hold" d="M80 110H260L300 150" fill="none" stroke="#0ECEF8" strokeWidth="1.1" strokeOpacity="0.45" />
                <rect x="48" y="78" width="64" height="64" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.12)" />
                <rect x="700" y="28" width="72" height="44" fill="rgba(0,113,246,0.1)" stroke="rgba(0,113,246,0.45)" />
                <rect x="790" y="88" width="72" height="44" fill="rgba(160,73,251,0.1)" stroke="rgba(160,73,251,0.5)" />
              </svg>
            </figure>
          </Reveal>
        </div>
      </section>

      <ArchitectureField
        eyebrow={t("depth.eyebrow")}
        title={t("depth.title")}
        lede={t("depth.lede")}
        nodes={arch}
        notes={depth}
      />

      <CapabilityField
        eyebrow={t("capabilities.eyebrow")}
        title={t("capabilities.title")}
        lede={t("capabilities.lede")}
        items={demonstrated}
      />

      <CaseCTA
        eyebrow={t("cta.eyebrow")}
        title={t("cta.title")}
        lede={t("cta.lede")}
        contact={t("cta.contact")}
        schedule={t("cta.schedule")}
        caption={t("diagram.caption")}
        legacy={t("diagram.legacy")}
        modern={t("diagram.modern")}
      />
    </article>
  );
}
