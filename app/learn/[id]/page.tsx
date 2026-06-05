import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TutorialDetail } from "@/components/learn/TutorialDetail";
import { TUTORIALS, getTutorial } from "@/lib/tutorials";

export function generateStaticParams() {
  return TUTORIALS.map((t) => ({ id: t.id }));
}

export function generateMetadata({
  params,
}: {
  params: { id: string };
}): Metadata {
  const t = getTutorial(params.id);
  return {
    title: t
      ? `${t.title} — ４0代からできるAI攻略`
      : "チュートリアル — ４0代からできるAI攻略",
    description: t?.summary,
  };
}

/** チュートリアル詳細ページ（SCR-04）。 */
export default function TutorialPage({ params }: { params: { id: string } }) {
  const tutorial = getTutorial(params.id);
  if (!tutorial) notFound();
  return <TutorialDetail tutorial={tutorial} />;
}
