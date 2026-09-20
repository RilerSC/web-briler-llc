import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Link } from "@/navigation";
import Arrow from "../../../components/briler/Arrow";
import AsymmetricFlow from "../../../components/briler/cases/AsymmetricFlow";
import BridgeArch from "../../../components/briler/cases/BridgeArch";
import BridgeHero from "../../../components/briler/cases/BridgeHero";
import BridgeLayer from "../../../components/briler/cases/BridgeLayer";
import CapabilityField from "../../../components/briler/cases/CapabilityField";
import CaseCTA from "../../../components/briler/cases/CaseCTA";
import CaseVizDefs from "../../../components/briler/cases/CaseVizDefs";
import ControlledAuto from "../../../components/briler/cases/ControlledAuto";
import DomainMapping from "../../../components/briler/cases/DomainMapping";
import IdentityMatch from "../../../components/briler/cases/IdentityMatch";
import TwoSystems from "../../../components/briler/cases/TwoSystems";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "cases.hubspotCore" });
  const canonical = `https://briler.net/${locale}/cases/hubspot-core-coopebanacio`;

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
        es: "https://briler.net/es/cases/hubspot-core-coopebanacio",
        en: "https://briler.net/en/cases/hubspot-core-coopebanacio",
      },
    },
  };
}

export default async function HubspotCoreCasePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "cases.hubspotCore" });
  const coreItems = t.raw("systems.coreItems") as string[];
  const crmItems = t.raw("systems.crmItems") as string[];
  const verbs = t.raw("bridge.verbs") as string[];
  const inboundItems = t.raw("flow.inboundItems") as string[];
  const outboundItems = t.raw("flow.outboundItems") as string[];
  const sourceItems = t.raw("mapping.sourceItems") as string[];
  const targetItems = t.raw("mapping.targetItems") as string[];
  const controlItems = t.raw("control.items") as string[];
  const rail = t.raw("depth.rail") as { k: string; v: string }[];
  const demonstrated = t.raw("capabilities.items") as string[];

  return (
    <article className="study study--bridge">
      <CaseVizDefs />
      <div className="wrap study__back">
        <Link href="/#evidence" className="tlink">
          {t("back")}
          <Arrow />
        </Link>
      </div>

      <BridgeHero
        eyebrow={t("hero.eyebrow")}
        client={t("hero.client")}
        project={t("hero.project")}
        title={t("hero.title")}
        titleLine={t("hero.titleLine")}
        lede={t("hero.lede")}
        caption={t("diagram.caption")}
        core={t("diagram.core")}
        bridge={t("diagram.bridge")}
        crm={t("diagram.crm")}
      />

      <TwoSystems
        eyebrow={t("systems.eyebrow")}
        title={t("systems.title")}
        lede={t("systems.lede")}
        core={t("systems.core")}
        coreLede={t("systems.coreLede")}
        coreItems={coreItems}
        crm={t("systems.crm")}
        crmLede={t("systems.crmLede")}
        crmItems={crmItems}
      />

      <BridgeLayer
        eyebrow={t("bridge.eyebrow")}
        title={t("bridge.title")}
        lede={t("bridge.lede")}
        verbs={verbs}
        from={t("bridge.from")}
        to={t("bridge.to")}
      />

      <AsymmetricFlow
        eyebrow={t("flow.eyebrow")}
        title={t("flow.title")}
        lede={t("flow.lede")}
        inbound={t("flow.inbound")}
        inboundItems={inboundItems}
        outbound={t("flow.outbound")}
        outboundItems={outboundItems}
      />

      <DomainMapping
        eyebrow={t("mapping.eyebrow")}
        title={t("mapping.title")}
        lede={t("mapping.lede")}
        source={t("mapping.source")}
        sourceItems={sourceItems}
        layer={t("mapping.layer")}
        target={t("mapping.target")}
        targetItems={targetItems}
      />

      <IdentityMatch
        eyebrow={t("identity.eyebrow")}
        title={t("identity.title")}
        lede={t("identity.lede")}
        from={t("identity.from")}
        match={t("identity.match")}
        to={t("identity.to")}
      />

      <ControlledAuto
        eyebrow={t("control.eyebrow")}
        title={t("control.title")}
        lede={t("control.lede")}
        items={controlItems}
      />

      <BridgeArch
        eyebrow={t("depth.eyebrow")}
        title={t("depth.title")}
        lede={t("depth.lede")}
        hubspot={t("depth.hubspot")}
        engine={t("depth.engine")}
        engineName={t("depth.engineName")}
        sql={t("depth.sql")}
        rail={rail}
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
        legacy={t("diagram.core")}
        modern={t("diagram.crm")}
      />
    </article>
  );
}
