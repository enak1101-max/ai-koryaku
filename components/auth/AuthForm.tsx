"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { PrimaryButton } from "@/components/ui/PrimaryButton";

/**
 * 会員登録／ログインフォーム（docs/spec.md SCR-06 / FR-07）。
 * ⚠️ MVPモック: メールのみ（パスワード/OAuthはCC-Auth導入時）。
 */
export function AuthForm({ mode }: { mode: "signup" | "login" }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isSignup = mode === "signup";

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setBusy(true);
    try {
      const res = await fetch(`/api/auth/${mode}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) {
        setError("メールアドレスを正しく入力してください。");
        return;
      }
      router.push("/mypage");
      router.refresh();
    } catch {
      setError("うまく送れませんでした。もう一度お試しください。");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="mx-auto max-w-[480px] px-4 py-8">
      <div className="mb-4">
        <Link href="/" className="text-button font-bold text-primary">
          ← もどる
        </Link>
      </div>

      <h1 className="text-h1 font-bold">
        {isSignup ? "無料会員になる" : "ログイン"}
      </h1>
      <p className="mt-2 text-body text-text-sub">
        メールアドレスを入れるだけ。むずかしい設定はありません。
      </p>

      <form onSubmit={submit} className="mt-6 grid gap-4">
        <label className="grid gap-1">
          <span className="text-body font-bold">メールアドレス</span>
          <input
            type="email"
            inputMode="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="例）yamada@example.com"
            className="min-h-btn rounded border-2 border-border px-3 text-body"
          />
        </label>

        {error && (
          <p className="text-body text-danger" role="alert">
            {error}
          </p>
        )}

        <PrimaryButton type="submit" disabled={busy || !email}>
          {busy ? "送信中…" : isSignup ? "登録する（無料）" : "ログインする"}
        </PrimaryButton>
      </form>

      <p className="mt-6 text-center text-body text-text-sub">
        {isSignup ? (
          <>
            すでに登録ずみの方は{" "}
            <Link href="/login" className="font-bold text-primary underline">
              ログイン
            </Link>
          </>
        ) : (
          <>
            はじめての方は{" "}
            <Link href="/signup" className="font-bold text-primary underline">
              無料会員になる
            </Link>
          </>
        )}
      </p>

      <p className="mt-6 text-caption text-text-sub">
        ※ パスワードは現在のお試し版では不要です（今後、より安全な方法に対応予定）。
      </p>
    </main>
  );
}
