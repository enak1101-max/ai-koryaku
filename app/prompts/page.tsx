import type { Metadata } from "next";
import Link from "next/link";
import { PromptCard } from "@/components/prompts/PromptCard";
import { PROMPTS, PROMPT_CATEGORIES } from "@/lib/prompts";
import { getSession } from "@/lib/auth";

export const metadata: Metadata = {
  title: "プロンプト集 — ４0代からできるAI攻略",
  description: "コピーしてすぐ使える、AIへのお願い文（プロンプト）の見本集。",
};

export const dynamic = "force-dynamic"; // プランに応じて有料テンプレの解放を切り替える

/** プロンプト集（SCR-05 / FR-06）。 */
export default function PromptsPage() {
  const isPremium = getSession()?.plan === "premium";
  return (
    <main className="mx-auto max-w-[720px] px-4 py-6">
      <div className="mb-4">
        <Link href="/" className="text-button font-bold text-primary">
          ← もどる
        </Link>
      </div>

      <h1 className="text-h1 font-bold">プロンプト集</h1>
      <p className="mt-2 text-body-lg text-text-sub">
        「AIへのお願い文」の見本です。コピーして使うか、その場で試せます。
      </p>

      {PROMPT_CATEGORIES.map((cat) => {
        const items = PROMPTS.filter((p) => p.category === cat);
        if (items.length === 0) return null;
        return (
          <section key={cat} className="mt-8">
            <h2 className="text-h2 font-bold">{cat}</h2>
            <div className="mt-3 grid gap-3">
              {items.map((item) => (
                <PromptCard key={item.id} item={item} unlocked={isPremium} />
              ))}
            </div>
          </section>
        );
      })}
    </main>
  );
}
