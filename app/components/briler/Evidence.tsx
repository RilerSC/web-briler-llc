"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/navigation";
import Arrow from "./Arrow";
import Reveal from "./Reveal";

type EvidenceItem = {
  n: string;
  client: string;
  project: string;
  title: string;
  href: string;
  status: string;
  tags: string[];
  steps: { label: string; body: string }[];
};

export default function Evidence() {
  const t = useTranslations("briler.evidence");
  const items = t.raw("items") as EvidenceItem[];

  return (
    <section className="sec sec--air rule" id="evidence" data-ch="05" aria-labelledby="case-h">
      <div className="wrap">
        <div className="sec__head sec__head--split">
          <Reveal>
            <p className="eyebrow">{t("eyebrow")}</p>
            <h2 className="h2" id="case-h" style={{ marginTop: 22 }}>
              {t("title")}
            </h2>
          </Reveal>
          <Reveal delay={90}>
            <p className="lede">{t("lede")}</p>
          </Reveal>
        </div>

        <div className="cases">
          {items.map((item) => (
            <Reveal key={item.href}>
              <article className="case">
                <div className="case__top">
                  <span className="case__n">{item.n}</span>
                  <div>
                    <p className="case__client">
                      {item.client}
                      <span
                        style={{
                          display: "block",
                          marginTop: 6,
                          color: "var(--signal)",
                          fontSize: 13,
                          letterSpacing: "0.08em",
                          textTransform: "uppercase",
                          fontFamily: "var(--mono)",
                        }}
                      >
                        {item.project}
                      </span>
                    </p>
                    <h3>{item.title}</h3>
                  </div>
                  <p className="case__tags">
                    {item.status ? <span>{item.status}</span> : null}
                    {item.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </p>
                </div>
                <div className="case__body">
                  {item.steps.map((step) => (
                    <div className="case__step" key={step.label}>
                      <h4>{step.label}</h4>
                      <p>{step.body}</p>
                    </div>
                  ))}
                </div>
                <p className="case__read">
                  <Link href={item.href} className="tlink">
                    {t("read")}
                    <Arrow />
                  </Link>
                </p>
              </article>
            </Reveal>
          ))}
        </div>
        {t("more") ? <p className="case__more">{t("more")}</p> : null}
      </div>
    </section>
  );
}
