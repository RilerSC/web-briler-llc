"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { countries } from "@/app/lib/countries";
import Arrow from "./Arrow";

const empty = {
  name: "",
  company: "",
  email: "",
  countryCode: "CR",
  phone: "",
  contactPreference: "email",
  language: "es",
  challenge: "",
  website_url: "",
};

export default function ContactForm() {
  const t = useTranslations("contact");
  const locale = useLocale();
  const [formData, setFormData] = useState({ ...empty, language: locale === "en" ? "en" : "es" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [ccOpen, setCcOpen] = useState(false);
  const [ccSearch, setCcSearch] = useState("");

  const selected = countries.find((c) => c.code === formData.countryCode) || countries[0];
  const filtered = ccSearch
    ? countries.filter(
        (c) => c.name.toLowerCase().includes(ccSearch.toLowerCase()) || c.dialCode.includes(ccSearch)
      )
    : countries;

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setMessage("");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        setStatus("success");
        setMessage(data.message || t("form.submit"));
        setFormData({ ...empty, language: locale === "en" ? "en" : "es" });
      } else {
        setStatus("error");
        setMessage(data.error || "Error");
      }
    } catch {
      setStatus("error");
      setMessage(t("form.submitting"));
    }
  };

  return (
    <form className="form" onSubmit={onSubmit} noValidate={false}>
      <div className="form__row form__row--2">
        <div>
          <label htmlFor="name">{t("form.name.label")} *</label>
          <input id="name" name="name" required value={formData.name} onChange={onChange} placeholder={t("form.name.placeholder")} />
        </div>
        <div>
          <label htmlFor="company">{t("form.company.label")} *</label>
          <input id="company" name="company" required value={formData.company} onChange={onChange} placeholder={t("form.company.placeholder")} />
        </div>
      </div>

      <div>
        <label htmlFor="email">{t("form.email.label")} *</label>
        <input id="email" name="email" type="email" required value={formData.email} onChange={onChange} placeholder={t("form.email.placeholder")} />
      </div>

      <div>
        <label htmlFor="phone">{t("form.phone.label")}</label>
        <div className="form__phone">
          <div className="form__cc">
            <button type="button" className="form__cc-btn" onClick={() => setCcOpen((v) => !v)} aria-expanded={ccOpen}>
              <span>{selected.flag}</span>
              <span>{selected.dialCode}</span>
            </button>
            {ccOpen && (
              <div className="form__cc-list">
                <input
                  value={ccSearch}
                  onChange={(e) => setCcSearch(e.target.value)}
                  placeholder={t("form.countrySearch.placeholder")}
                />
                {filtered.map((c) => (
                  <button
                    key={c.code}
                    type="button"
                    aria-current={c.code === formData.countryCode}
                    onClick={() => {
                      setFormData({ ...formData, countryCode: c.code });
                      setCcOpen(false);
                      setCcSearch("");
                    }}
                  >
                    <span>{c.flag}</span>
                    <span>{c.name}</span>
                    <span>{c.dialCode}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
          <input id="phone" name="phone" type="tel" value={formData.phone} onChange={onChange} placeholder={t("form.phone.placeholder")} />
        </div>
        <p className="form__hint">{t("form.phone.hint")}</p>
      </div>

      <div className="form__row form__row--2">
        <div>
          <span className="form__label">{t("form.contactPreference.label")}</span>
          <div className="form__choice">
            <button type="button" aria-pressed={formData.contactPreference === "email"} onClick={() => setFormData({ ...formData, contactPreference: "email" })}>
              {t("form.contactPreference.email")}
            </button>
            <button type="button" aria-pressed={formData.contactPreference === "phone"} onClick={() => setFormData({ ...formData, contactPreference: "phone" })}>
              {t("form.contactPreference.phone")}
            </button>
          </div>
        </div>
        <div>
          <span className="form__label">{t("form.language.label")}</span>
          <div className="form__choice">
            <button type="button" aria-pressed={formData.language === "es"} onClick={() => setFormData({ ...formData, language: "es" })}>
              {t("form.language.spanish")}
            </button>
            <button type="button" aria-pressed={formData.language === "en"} onClick={() => setFormData({ ...formData, language: "en" })}>
              {t("form.language.english")}
            </button>
          </div>
        </div>
      </div>

      <div className="hp" aria-hidden="true">
        <label htmlFor="website_url">Website</label>
        <input id="website_url" name="website_url" tabIndex={-1} autoComplete="off" value={formData.website_url} onChange={onChange} />
      </div>

      <div>
        <label htmlFor="challenge">{t("form.challenge.label")} *</label>
        <textarea id="challenge" name="challenge" required rows={4} value={formData.challenge} onChange={onChange} placeholder={t("form.challenge.placeholder")} />
      </div>

      {status === "success" && <p className="form__status form__status--ok">{message}</p>}
      {status === "error" && <p className="form__status form__status--err">{message}</p>}

      <button type="submit" className="btn btn--primary" disabled={status === "loading"}>
        {status === "loading" ? t("form.submitting") : t("form.submit")}
        {status !== "loading" && <Arrow />}
      </button>
      <p className="form__privacy">{t("form.privacyNotice")}</p>
    </form>
  );
}
