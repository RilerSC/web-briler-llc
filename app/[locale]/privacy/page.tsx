"use client";

import { Link } from "@/navigation";
import { useTranslations } from "next-intl";

export default function PrivacyPage() {
  const t = useTranslations("privacy");

  return (
    <div className="privacy">
      <div className="wrap">
        <p>
          <Link href="/" className="tlink">
            {t("back")}
          </Link>
        </p>

        <div className="privacy__hero">
          <h1 className="h2">{t("hero.title")}</h1>
          <p className="privacy__date">{t("hero.lastUpdated")}</p>
        </div>

        <div className="privacy__content">
          <section className="privacy__section">
            <h2>{t("sections.responsible.title")}</h2>
            <p>{t("sections.responsible.content")}</p>
          </section>

          <section className="privacy__section">
            <h2>{t("sections.dataCollection.title")}</h2>
            <p>{t("sections.dataCollection.intro")}</p>

            <div className="privacy__subsection">
              <h3>{t("sections.dataCollection.contactForm.title")}</h3>
              <ul className="privacy__list">
                {(t.raw("sections.dataCollection.contactForm.items") as string[]).map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="privacy__subsection">
              <h3>{t("sections.dataCollection.scheduling.title")}</h3>
              <p>{t("sections.dataCollection.scheduling.content")}</p>
            </div>

            <div className="privacy__subsection">
              <h3>{t("sections.dataCollection.socialMedia.title")}</h3>
              <p>{t("sections.dataCollection.socialMedia.content")}</p>
            </div>
          </section>

          <section className="privacy__section">
            <h2>{t("sections.dataUse.title")}</h2>
            <p>{t("sections.dataUse.intro")}</p>
            <ul className="privacy__list">
              {(t.raw("sections.dataUse.items") as string[]).map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
            <p className="privacy__highlight">{t("sections.dataUse.noSale")}</p>
          </section>

          <section className="privacy__section">
            <h2>{t("sections.dataSharing.title")}</h2>
            <p>{t("sections.dataSharing.intro")}</p>
            <ul className="privacy__providers">
              {(
                t.raw("sections.dataSharing.providers") as Array<{
                  name: string;
                  purpose: string;
                }>
              ).map((provider, idx) => (
                <li key={idx}>
                  <strong>{provider.name}</strong>: {provider.purpose}
                </li>
              ))}
            </ul>
            <p className="privacy__highlight">{t("sections.dataSharing.noCommercial")}</p>
          </section>

          <section className="privacy__section">
            <h2>{t("sections.dataRetention.title")}</h2>
            <p>{t("sections.dataRetention.content")}</p>
          </section>

          <section className="privacy__section">
            <h2>{t("sections.userRights.title")}</h2>
            <p>{t("sections.userRights.intro")}</p>
            <ul className="privacy__list">
              {(t.raw("sections.userRights.rights") as string[]).map((right, idx) => (
                <li key={idx}>{right}</li>
              ))}
            </ul>
            <p>{t("sections.userRights.exercise")}</p>
          </section>

          <section className="privacy__section">
            <h2>{t("sections.facebookDeletion.title")}</h2>
            <p>{t("sections.facebookDeletion.intro")}</p>
            <ul className="privacy__list">
              {(t.raw("sections.facebookDeletion.options") as string[]).map((option, idx) => (
                <li key={idx}>{option}</li>
              ))}
            </ul>
            <p>{t("sections.facebookDeletion.action")}</p>
          </section>

          <section className="privacy__section">
            <h2>{t("sections.changes.title")}</h2>
            <p>{t("sections.changes.content")}</p>
          </section>
        </div>
      </div>
    </div>
  );
}
