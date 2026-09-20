"use client";

import { useTranslations } from "next-intl";
import Reveal from "./Reveal";

const CLIENTS = [
  { src: "/lab/briler-d/assets/clients/coopebanacio.png", alt: "Coopebanacio R.L.", opt: 1 },
  { src: "/lab/briler-d/assets/clients/fundepos.png", alt: "Universidad FUNDEPOS", opt: 0.88 },
  { src: "/lab/briler-d/assets/clients/cenecoop.png", alt: "CENECOOP", opt: 1.28 },
  { src: "/lab/briler-d/assets/clients/coopecobana.png", alt: "COOPECOBANA", opt: 0.72 },
  { src: "/clientes/Observatorio de Sostenibilidad.svg", alt: "Observatorio de Sostenibilidad", opt: 1.45 },
  { src: "/lab/briler-d/assets/clients/creative-hut.png", alt: "Creative Hut", opt: 1.22 },
  { src: "/lab/briler-d/assets/clients/guanaco.png", alt: "Guanaco", opt: 0.78 },
  { src: "/lab/briler-d/assets/clients/rey-velas.png", alt: "Rey Velas", opt: 1.45 },
  { src: "/lab/briler-d/assets/clients/pasitos-de-bebe.png", alt: "Pasitos de Bebé", opt: 1.38 },
];

export default function Trust() {
  const t = useTranslations("briler.trust");

  return (
    <section className="sec sec--tight sec--plinth" data-ch="02" aria-labelledby="trust-h">
      <div className="wrap trust">
        <div className="trust__layout">
          <Reveal>
            <p className="eyebrow">{t("eyebrow")}</p>
            <h2 className="trust__h" id="trust-h">
              {t("title")}
            </h2>
          </Reveal>
          <Reveal className="" delay={100}>
            <ul className="trust__grid">
              {CLIENTS.map((c) => (
                <li key={c.alt} className="trust__cell">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img style={{ ["--opt" as string]: c.opt }} src={c.src} alt={c.alt} loading="lazy" />
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
