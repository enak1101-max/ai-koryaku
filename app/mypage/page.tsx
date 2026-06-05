import type { Metadata } from "next";
import Link from "next/link";
import { getSession } from "@/lib/auth";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { LogoutButton } from "@/components/auth/LogoutButton";

export const metadata: Metadata = {
  title: "マイページ — ４0代からできるAI攻略",
};

export const dynamic = "force-dynamic";

/** マイページ（SCR-08）— アカウント・プラン・ログアウト。 */
export default function MyPage() {
  const session = getSession();

  if (!session) {
    return (
      <main className="mx-auto max-w-[480px] px-4 py-10 text-center">
        <h1 className="text-h1 font-bold">マイページ</h1>
        <p className="mt-3 text-body-lg text-text-sub">
          ご利用にはログインが必要です。
        </p>
        <div className="mt-6 grid gap-3">
          <Link href="/login">
            <PrimaryButton>ログイン</PrimaryButton>
          </Link>
          <Link href="/signup" className="text-button font-bold text-primary underline">
            はじめての方は 無料会員になる
          </Link>
        </div>
      </main>
    );
  }

  const isPremium = session.plan === "premium";

  return (
    <main className="mx-auto max-w-[480px] px-4 py-8">
      <div className="mb-4">
        <Link href="/" className="text-button font-bold text-primary">
          ← もどる
        </Link>
      </div>

      <h1 className="text-h1 font-bold">マイページ</h1>

      <dl className="mt-6 grid gap-4">
        <div className="rounded border-2 border-border p-4">
          <dt className="text-caption text-text-sub">メールアドレス</dt>
          <dd className="mt-1 text-body-lg font-bold">{session.email}</dd>
        </div>
        <div className="rounded border-2 border-border p-4">
          <dt className="text-caption text-text-sub">プラン</dt>
          <dd className="mt-1 text-body-lg font-bold">
            {isPremium ? "プレミアム 🌟" : "無料"}
          </dd>
        </div>
      </dl>

      {!isPremium && (
        <div className="mt-6">
          <Link href="/pricing">
            <PrimaryButton>プレミアムにする</PrimaryButton>
          </Link>
        </div>
      )}

      <div className="mt-8">
        <LogoutButton />
      </div>
    </main>
  );
}
