import type { Metadata } from "next";
import Link from "next/link";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { FAQS } from "@/lib/faq";

export const metadata: Metadata = {
  title: "安全に使うために・よくある質問 — ４0代からできるAI攻略",
  description: "AIを安心して使うためのやさしいガイドと、よくある質問。",
};

const SAFETY_POINTS = [
  {
    icon: "🔒",
    title: "大切な個人情報は入力しない",
    body: "パスワード、クレジットカード番号、マイナンバーなどは入力しないでください。AIに教える必要はありません。",
  },
  {
    icon: "🤔",
    title: "答えは自分でも確かめる",
    body: "AIの答えは、ときどきまちがいます。大事なことは、本やお店、家族にも確認しましょう。",
  },
  {
    icon: "🎤",
    title: "声でも使えます",
    body: "文字を打つのが苦手でも大丈夫。マイク（🎤）で話しかけ、答えはスピーカー（🔊）で聞けます。",
  },
  {
    icon: "💸",
    title: "まずは無料でOK",
    body: "登録なしで体験できます。お金がかかるのは、あとから有料プランを選んだときだけです。",
  },
];

/** 安全ガイド/FAQ（SCR-09 / FR-09）。 */
export default function SafetyPage() {
  return (
    <main className="mx-auto max-w-[720px] px-4 py-6">
      <div className="mb-4">
        <Link href="/" className="text-button font-bold text-primary">
          ← もどる
        </Link>
      </div>

      <h1 className="text-h1 font-bold">安心して使うために</h1>
      <p className="mt-2 text-body-lg text-text-sub">
        はじめてでも大丈夫。これだけ知っておけば安心です。
      </p>

      {/* 安全ポイント */}
      <ul className="mt-6 grid gap-3">
        {SAFETY_POINTS.map((p) => (
          <li key={p.title} className="rounded border-2 border-border p-4">
            <div className="flex items-start gap-3">
              <span className="text-h1" aria-hidden>
                {p.icon}
              </span>
              <div>
                <h2 className="text-body-lg font-bold">{p.title}</h2>
                <p className="mt-1 text-body text-text-sub">{p.body}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>

      {/* FAQ */}
      <h2 className="mt-10 text-h2 font-bold">よくある質問</h2>
      <div className="mt-3 grid gap-2">
        {FAQS.map((f) => (
          <details
            key={f.q}
            className="rounded border-2 border-border p-4"
          >
            <summary className="cursor-pointer text-body-lg font-bold">
              {f.q}
            </summary>
            <p className="mt-2 text-body text-text-sub">{f.a}</p>
          </details>
        ))}
      </div>

      {/* CTA */}
      <div className="mt-10">
        <Link href="/chat" aria-label="AIをためしてみる">
          <PrimaryButton>さっそく ためしてみる</PrimaryButton>
        </Link>
      </div>
    </main>
  );
}
