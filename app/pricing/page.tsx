import type { Metadata } from "next";
import Link from "next/link";
import { getSession } from "@/lib/auth";
import { FREE_DAILY_LIMIT, PREMIUM_DAILY_LIMIT } from "@/lib/usage";
import { UpgradeButton } from "@/components/billing/UpgradeButton";
import { PrimaryButton } from "@/components/ui/PrimaryButton";

export const metadata: Metadata = {
  title: "料金プラン — ４0代からできるAI攻略",
  description: "無料プランと、もっと使えるプレミアムプランのご案内。",
};

export const dynamic = "force-dynamic"; // セッションに応じて表示を変える

const FREE_POINTS = [
  `AIチャット 1日 ${FREE_DAILY_LIMIT} 回まで`,
  "基礎チュートリアル",
  "基本のプロンプト集",
  "音声入力・読み上げ",
];
const PREMIUM_POINTS = [
  `AIチャット 1日 ${PREMIUM_DAILY_LIMIT} 回まで`,
  "すべてのチュートリアル",
  "すべてのプロンプト集",
  "音声入力・読み上げ",
];

/** 料金プラン（SCR-07 / FR-08）。 */
export default function PricingPage() {
  const session = getSession();
  const isPremium = session?.plan === "premium";

  return (
    <main className="mx-auto max-w-[720px] px-4 py-6">
      <div className="mb-4">
        <Link href="/" className="text-button font-bold text-primary">
          ← もどる
        </Link>
      </div>

      <h1 className="text-h1 font-bold">料金プラン</h1>
      <p className="mt-2 text-body-lg text-text-sub">
        まずは無料で。もっと使いたくなったらプレミアムへ。
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {/* 無料 */}
        <div className="rounded border-2 border-border p-5">
          <h2 className="text-h2 font-bold">無料</h2>
          <p className="mt-1 text-body text-text-sub">いつでも0円</p>
          <ul className="mt-4 grid gap-2">
            {FREE_POINTS.map((p) => (
              <li key={p} className="flex items-center gap-2 text-body">
                <span className="text-accent" aria-hidden>✓</span>
                {p}
              </li>
            ))}
          </ul>
          {!session && (
            <div className="mt-5">
              <Link href="/signup">
                <PrimaryButton>無料で はじめる</PrimaryButton>
              </Link>
            </div>
          )}
        </div>

        {/* プレミアム */}
        <div className="rounded border-2 border-primary p-5">
          <h2 className="text-h2 font-bold text-primary">プレミアム</h2>
          <p className="mt-1 text-body text-text-sub">たっぷり使える</p>
          <ul className="mt-4 grid gap-2">
            {PREMIUM_POINTS.map((p) => (
              <li key={p} className="flex items-center gap-2 text-body">
                <span className="text-accent" aria-hidden>✓</span>
                {p}
              </li>
            ))}
          </ul>
          <div className="mt-5">
            {isPremium ? (
              <p className="text-body-lg font-bold text-accent">
                ✓ ご利用中です。ありがとうございます！
              </p>
            ) : session ? (
              <UpgradeButton />
            ) : (
              <Link href="/signup">
                <PrimaryButton>まず無料登録して申し込む</PrimaryButton>
              </Link>
            )}
          </div>
        </div>
      </div>

      <p className="mt-6 text-caption text-text-sub">
        ※ 現在はお試し版のため、お申し込みは実際の課金を行わないデモ動作です（決済は今後対応）。
      </p>
    </main>
  );
}
