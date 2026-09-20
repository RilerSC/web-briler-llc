import { getTranslations } from "next-intl/server";
import { Link } from "@/navigation";
import { CASE_RELATED_SOLUTIONS, isLocale, solutionPath } from "@/app/lib/solutions";

export default async function CaseRelatedSolutions({
  caseSlug,
  locale,
}: {
  caseSlug: string;
  locale: string;
}) {
  const ids = CASE_RELATED_SOLUTIONS[caseSlug];
  if (!ids?.length || !isLocale(locale)) return null;

  const t = await getTranslations({ locale, namespace: "solutionPages.shared" });
  const catalog = await getTranslations({ locale, namespace: "solutionPages.catalog" });

  return (
    <aside className="study-related" aria-label={t("relatedLabel")}>
      <div className="wrap study-related__in">
        <p className="study-related__k">{t("relatedLabel")}</p>
        <ul>
          {ids.map((id) => (
            <li key={id}>
              <Link href={solutionPath(id, locale)} locale={locale} className="tlink" data-solution={id}>
                {catalog(id)}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
