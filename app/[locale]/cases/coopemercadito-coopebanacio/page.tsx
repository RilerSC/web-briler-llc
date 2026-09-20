import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Link } from "@/navigation";
import Arrow from "../../../components/briler/Arrow";
import CapabilityField from "../../../components/briler/cases/CapabilityField";
import CaseCTA from "../../../components/briler/cases/CaseCTA";
import CaseVizDefs from "../../../components/briler/cases/CaseVizDefs";
import ConnectionPath from "../../../components/briler/cases/ConnectionPath";
import DiscoveryField from "../../../components/briler/cases/DiscoveryField";
import MarketSurface from "../../../components/briler/cases/MarketSurface";
import NetworkArch from "../../../components/briler/cases/NetworkArch";
import NetworkChallenge from "../../../components/briler/cases/NetworkChallenge";
import NetworkHero from "../../../components/briler/cases/NetworkHero";
import PlatformOps from "../../../components/briler/cases/PlatformOps";
import TrustLayer from "../../../components/briler/cases/TrustLayer";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "cases.coopemercadito" });
  const canonical = `https://briler.net/${locale}/cases/coopemercadito-coopebanacio`;

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
        es: "https://briler.net/es/cases/coopemercadito-coopebanacio",
        en: "https://briler.net/en/cases/coopemercadito-coopebanacio",
      },
    },
  };
}

export default async function CoopemercaditoCasePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "cases.coopemercadito" });
  const steps = t.raw("connection.steps") as string[];
  const surfaces = t.raw("experience.surfaces") as string[];
  const ops = t.raw("operations.items") as string[];
  const rail = t.raw("depth.rail") as { k: string; v: string }[];
  const demonstrated = t.raw("capabilities.items") as string[];

  return (
    <article className="study study--network">
      <CaseVizDefs />
      <div className="wrap study__back">
        <Link href="/#evidence" className="tlink">
          {t("back")}
          <Arrow />
        </Link>
      </div>

      <NetworkHero
        eyebrow={t("hero.eyebrow")}
        client={t("hero.client")}
        project={t("hero.project")}
        title={t("hero.title")}
        titleLine={t("hero.titleLine")}
        lede={t("hero.lede")}
        caption={t("diagram.caption")}
        community={t("diagram.community")}
        trust={t("diagram.trust")}
        discovery={t("diagram.discovery")}
        connection={t("diagram.connection")}
      />

      <NetworkChallenge
        eyebrow={t("challenge.eyebrow")}
        title={t("challenge.title")}
        lede={t("challenge.lede")}
        from={t("challenge.from")}
        to={t("challenge.to")}
      />

      <TrustLayer
        eyebrow={t("trust.eyebrow")}
        title={t("trust.title")}
        lede={t("trust.lede")}
        member={t("trust.member")}
        verify={t("trust.verify")}
        seller={t("trust.seller")}
        listing={t("trust.listing")}
        review={t("trust.review")}
        visible={t("trust.visible")}
        who={t("trust.who")}
        what={t("trust.what")}
      />

      <DiscoveryField
        eyebrow={t("discovery.eyebrow")}
        title={t("discovery.title")}
        lede={t("discovery.lede")}
        nearby={t("discovery.nearby")}
        products={t("discovery.products")}
        services={t("discovery.services")}
        sellers={t("discovery.sellers")}
      />

      <ConnectionPath
        eyebrow={t("connection.eyebrow")}
        title={t("connection.title")}
        lede={t("connection.lede")}
        steps={steps}
      />

      <MarketSurface
        eyebrow={t("experience.eyebrow")}
        title={t("experience.title")}
        lede={t("experience.lede")}
        surfaces={surfaces}
      />

      <PlatformOps
        eyebrow={t("operations.eyebrow")}
        title={t("operations.title")}
        lede={t("operations.lede")}
        items={ops}
      />

      <NetworkArch
        eyebrow={t("depth.eyebrow")}
        title={t("depth.title")}
        lede={t("depth.lede")}
        app={t("depth.app")}
        appName={t("depth.appName")}
        data={t("depth.data")}
        dataName={t("depth.dataName")}
        identity={t("depth.identity")}
        identityName={t("depth.identityName")}
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
        legacy={t("diagram.community")}
        modern={t("diagram.connection")}
      />
    </article>
  );
}
