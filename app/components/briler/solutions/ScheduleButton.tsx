"use client";

import { Link } from "@/navigation";
import { trackLead } from "@/app/components/MetaPixel";

type ScheduleButtonProps = {
  locale: string;
  solutionId: string;
  label: string;
};

export function ScheduleButton({ locale, solutionId, label }: ScheduleButtonProps) {
  return (
    <Link
      className="btn btn--ghost"
      href="/agendar"
      locale={locale}
      data-cta="schedule"
      data-solution={solutionId}
      onClick={() => trackLead()}
    >
      {label}
    </Link>
  );
}
