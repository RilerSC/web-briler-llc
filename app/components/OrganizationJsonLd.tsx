import { getTranslations } from "next-intl/server";
import { SITE_ORIGIN } from "@/app/lib/site";
import JsonLd from "./JsonLd";

export default async function OrganizationJsonLd({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "meta" });
  const isSpanish = locale === "es";

  const organizationData = {
    "@context": "https://schema.org",
    "@type": ["Organization", "ProfessionalService"],
    name: "BRILER",
    legalName: "3102943574 S.R.L.",
    url: SITE_ORIGIN,
    logo: `${SITE_ORIGIN}/brand/briler-isotype.png`,
    description: t("description"),
    foundingDate: "2012-05-01",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Calle Matasanos, contiguo a Taller Rojas, San Josecito",
      addressLocality: "San Rafael",
      addressRegion: "Heredia",
      postalCode: "40502",
      addressCountry: "CR",
    },
    telephone: "+506 8895 3149",
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+506 8895 3149",
        contactType: "customer service",
        availableLanguage: ["es", "en"],
      },
      {
        "@type": "ContactPoint",
        telephone: "+1 214 230 2791",
        contactType: "customer service",
        availableLanguage: "en",
      },
    ],
    sameAs: [
      "https://www.linkedin.com/company/brilerllc",
      "https://www.facebook.com/profile.php?id=61595230021073",
    ],
    areaServed: [
      { "@type": "Country", name: "Costa Rica" },
      { "@type": "Country", name: "United States" },
      { "@type": "Country", name: "Spain" },
    ],
  };

  const websiteData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "BRILER",
    url: SITE_ORIGIN,
    inLanguage: [isSpanish ? "es-CR" : "en-US"],
    description: t("description"),
    publisher: {
      "@type": "Organization",
      name: "BRILER",
    },
  };

  return (
    <>
      <JsonLd data={organizationData} />
      <JsonLd data={websiteData} />
    </>
  );
}
