import type { Metadata } from "next";
import Link from "next/link";
import { TUTORIALS } from "@/lib/tutorials";

export const metadata: Metadata = {
  title: "学ぶ（チュートリアル） — ４0代からできるAI攻略",
  description: "手順を見ながら、AIの使い方をひとつずつ練習できます。",
};

/** チュートリアル一覧（SCR-03 / FR-04）。 */
export default function LearnPage() {
  return (
    <main className="mx-auto max-w-[720px] px-4 py-6">
      <div className="mb-4">
        <Link href="/" className="text-button font-bold text-primary">
          ← もどる
        </Link>
      </div>

      <h1 className="text-h1 font-bold">学ぶ</h1>
      <p className="mt-2 text-body-lg text-text-sub">
        手順を見ながら、ひとつずつ練習しましょう。例文をその場で試せます。
      </p>

      <ul className="mt-6 grid gap-3">
        {TUTORIALS.map((t) => (
          <li key={t.id}>
            <Link
              href={`/learn/${t.id}`}
              className="flex items-center gap-4 rounded border-2 border-border p-4"
            >
              <span className="text-display" aria-hidden>
                {t.emoji}
              </span>
              <span className="flex-1">
                <span className="block text-body-lg font-bold">{t.title}</span>
                <span className="mt-1 block text-caption text-text-sub">
                  {t.summary}
                </span>
              </span>
              <span className="text-h2 text-primary" aria-hidden>
                →
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
