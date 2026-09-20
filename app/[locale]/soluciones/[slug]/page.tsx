import type { Metadata } from "next";
import SolutionLanding, {
  solutionMetadata,
  solutionStaticParams,
} from "../../../components/briler/solutions/SolutionLanding";

export function generateStaticParams() {
  return solutionStaticParams("soluciones");
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  return solutionMetadata(params, "soluciones");
}

export default function SolucionesPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  return <SolutionLanding params={params} segment="soluciones" />;
}
