import { getTranslations } from "next-intl/server";
import { SITE_ORIGIN } from "@/app/lib/site";
import JsonLd from "./JsonLd";

export default async function OrganizationJsonLd({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "meta" });

  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "BRILER",
        url: SITE_ORIGIN,
        logo: `${SITE_ORIGIN}/brand/briler-isotype.png`,
        description: t("description"),
      }}
    />
  );
}
