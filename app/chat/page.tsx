import type { Metadata } from "next";
import Link from "next/link";
import { ChatClient } from "@/components/chat/ChatClient";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { AI_ENABLED } from "@/lib/features";

export const metadata: Metadata = {
  title: "AIにきいてみよう — シニアからのAI入門編",
  description: "登録なしで、その場でAIに話しかけて体験できます。",
};

export default function ChatPage() {
  // AIが無効（近日公開）のときは、料金が発生しないよう案内のみ表示する。
  if (!AI_ENABLED) {
    return (
      <main className="mx-auto flex min-h-[80dvh] max-w-[720px] flex-col items-center justify-center px-4 text-center">
        <div className="text-display" aria-hidden>
          💬
        </div>
        <h1 className="mt-3 text-h1 font-bold">AIとのおしゃべり（近日公開）</h1>
        <p className="mt-2 text-body-lg text-text-sub">
          ただいま準備中です。
          <br />
          まずは「学ぶ」や「見本文」で、使い方を見てみましょう。
        </p>
        <div className="mt-6 w-full max-w-[320px] grid gap-3">
          <Link href="/learn" aria-label="学ぶページへ">
            <PrimaryButton>使い方を 学んでみる</PrimaryButton>
          </Link>
          <Link
            href="/prompts"
            className="text-button font-bold text-primary underline"
          >
            見本文を見る
          </Link>
          <Link href="/" className="text-button font-bold text-primary underline">
            トップにもどる
          </Link>
        </div>
      </main>
    );
  }

  return <ChatClient />;
}
