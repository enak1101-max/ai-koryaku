import Link from "next/link";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { getSession } from "@/lib/auth";
import { AI_ENABLED } from "@/lib/features";

export const dynamic = "force-dynamic"; // ログイン状態でアカウント表示を変える

/**
 * トップ／オンボーディング — docs/spec.md SCR-01 / docs/design.md §5（FR-01）
 */
const STEPS = [
  { icon: "🗣️", title: "話す / 打つ", desc: "聞きたいことを伝えるだけ" },
  { icon: "🤖", title: "AIが答える", desc: "わかりやすく返事します" },
  { icon: "🔊", title: "聞ける", desc: "答えを読み上げできます" },
];

const REASSURE = [
  "登録なしで すぐ試せる",
  "むずかしい言葉は使いません",
  "声で話しかけてもOK",
];

const CARDS = [
  { href: "/chat", label: "体験する", desc: "今すぐAIに話しかけてみる" },
  { href: "/learn", label: "学ぶ", desc: "手順を見ながら練習する" },
  { href: "/prompts", label: "プロンプト集", desc: "コピーで使える見本文" },
  { href: "/safety", label: "安全ガイド", desc: "安心して使うために" },
];

export default function HomePage() {
  const session = getSession();
  return (
    <main className="mx-auto max-w-[720px] px-4 py-6">
      <div className="mb-2 flex justify-end">
        {session ? (
          <Link href="/mypage" className="text-button font-bold text-primary">
            マイページ
          </Link>
        ) : (
          <Link href="/login" className="text-button font-bold text-primary">
            ログイン
          </Link>
        )}
      </div>

      <p className="inline-block rounded bg-[#E8F1FB] px-3 py-1 text-button font-bold text-primary">
        シニアからのAI入門編
      </p>
      <h1 className="mt-3 text-display font-bold leading-tight">
        言葉で話して、
        <br />
        らくらくメール作成
      </h1>
      <p className="mt-3 text-body-lg text-text-sub">
        むずかしくありません。声で話すだけ。
      </p>

      <div className="mt-6">
        <Link
          href={AI_ENABLED ? "/chat" : "/learn"}
          aria-label={AI_ENABLED ? "今すぐ無料で試す" : "無料で使い方を学ぶ"}
        >
          <PrimaryButton>
            {AI_ENABLED ? "今すぐ 無料で試す" : "無料で 使ってみる"}
          </PrimaryButton>
        </Link>
        {!AI_ENABLED && (
          <p className="mt-2 text-caption text-text-sub">
            ※ AIとのおしゃべりは近日公開。まずは使い方をやさしくご案内します。
          </p>
        )}
      </div>

      {/* 安心ポイント（はじめての方へ） */}
      <ul className="mt-4 grid gap-2">
        {REASSURE.map((r) => (
          <li key={r} className="flex items-center gap-2 text-body text-text-sub">
            <span className="text-accent" aria-hidden>
              ✓
            </span>
            {r}
          </li>
        ))}
      </ul>

      <ol className="mt-8 grid grid-cols-3 gap-3">
        {STEPS.map((s, i) => (
          <li
            key={s.title}
            className="rounded border-2 border-border p-3 text-center"
          >
            <div className="text-display" aria-hidden>
              {s.icon}
            </div>
            <div className="mt-1 text-button font-bold">
              {i + 1}. {s.title}
            </div>
            <div className="mt-1 text-caption text-text-sub">{s.desc}</div>
          </li>
        ))}
      </ol>

      <nav className="mt-8 grid gap-3" aria-label="主要メニュー">
        {CARDS.map((c) => (
          <Link
            key={c.href}
            href={c.href}
            className="flex min-h-tap items-center justify-between rounded border-2 border-border px-4 py-3"
          >
            <span className="text-body-lg font-bold">{c.label}</span>
            <span className="text-caption text-text-sub">{c.desc}</span>
          </Link>
        ))}
      </nav>
    </main>
  );
}
