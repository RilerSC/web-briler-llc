import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Link } from "@/navigation";
import Arrow from "../../../components/briler/Arrow";
import CapabilityField from "../../../components/briler/cases/CapabilityField";
import CaseCTA from "../../../components/briler/cases/CaseCTA";
import CaseVizDefs from "../../../components/briler/cases/CaseVizDefs";
import ChannelArch from "../../../components/briler/cases/ChannelArch";
import ChannelHero from "../../../components/briler/cases/ChannelHero";
import CoreChallenge from "../../../components/briler/cases/CoreChallenge";
import DigitalLayer from "../../../components/briler/cases/DigitalLayer";
import IdentitySplit from "../../../components/briler/cases/IdentitySplit";
import MemberSurface from "../../../components/briler/cases/MemberSurface";
import OperateStrip from "../../../components/briler/cases/OperateStrip";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "cases.autogestion" });
  const canonical = `https://briler.net/${locale}/cases/autogestion-coopebanacio`;

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
        es: "https://briler.net/es/cases/autogestion-coopebanacio",
        en: "https://briler.net/en/cases/autogestion-coopebanacio",
      },
    },
  };
}

export default async function AutogestionCasePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "cases.autogestion" });
  const challenge = t.raw("challenge.body") as string[];
  const domains = t.raw("challenge.domains") as string[];
  const layerNodes = t.raw("layer.nodes") as {
    member: string;
    experience: string;
    service: string;
    identity: string;
    core: string;
  };
  const layerPoints = t.raw("layer.points") as { k: string; v: string }[];
  const surfaces = t.raw("member.surfaces") as string[];
  const verbs = t.raw("operate.verbs") as string[];
  const channelItems = t.raw("identity.channelItems") as string[];
  const coreItems = t.raw("identity.coreItems") as string[];
  const rail = t.raw("depth.rail") as { k: string; v: string }[];
  const demonstrated = t.raw("capabilities.items") as string[];

  return (
    <article className="study study--channel">
      <CaseVizDefs />
      <div className="wrap study__back">
        <Link href="/#evidence" className="tlink">
          {t("back")}
          <Arrow />
        </Link>
      </div>

      <ChannelHero
        eyebrow={t("hero.eyebrow")}
        client={t("hero.client")}
        project={t("hero.project")}
        title={t("hero.title")}
        titleLine={t("hero.titleLine")}
        lede={t("hero.lede")}
        caption={t("diagram.caption")}
        core={t("diagram.core")}
        layer={t("diagram.layer")}
        member={t("diagram.member")}
      />

      <CoreChallenge
        eyebrow={t("challenge.eyebrow")}
        title={t("challenge.title")}
        body={challenge}
        domains={domains}
        core={t("diagram.core")}
      />

      <DigitalLayer
        eyebrow={t("layer.eyebrow")}
        title={t("layer.title")}
        lede={t("layer.lede")}
        nodes={layerNodes}
        points={layerPoints}
      />

      <MemberSurface
        eyebrow={t("member.eyebrow")}
        title={t("member.title")}
        lede={t("member.lede")}
        surfaces={surfaces}
      />

      <OperateStrip
        eyebrow={t("operate.eyebrow")}
        title={t("operate.title")}
        lede={t("operate.lede")}
        verbs={verbs}
      />

      <IdentitySplit
        eyebrow={t("identity.eyebrow")}
        title={t("identity.title")}
        lede={t("identity.lede")}
        channel={t("identity.channel")}
        channelItems={channelItems}
        core={t("identity.core")}
        coreItems={coreItems}
      />

      <ChannelArch
        eyebrow={t("depth.eyebrow")}
        title={t("depth.title")}
        lede={t("depth.lede")}
        experience={t("depth.experience")}
        experienceName={t("depth.experienceName")}
        api={t("depth.api")}
        apiName={t("depth.apiName")}
        channelData={t("depth.channelData")}
        channelDataName={t("depth.channelDataName")}
        core={t("depth.core")}
        coreName={t("depth.coreName")}
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
        modern={t("diagram.member")}
      />
    </article>
  );
}
