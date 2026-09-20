import type { Metadata } from "next";
import SolutionLanding, {
  solutionMetadata,
  solutionStaticParams,
} from "../../../components/briler/solutions/SolutionLanding";

export function generateStaticParams() {
  return solutionStaticParams("solutions");
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  return solutionMetadata(params, "solutions");
}

export default function SolutionsPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  return <SolutionLanding params={params} segment="solutions" />;
}
