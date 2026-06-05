"use client";

import { useState } from "react";
import Link from "next/link";
import type { PromptTemplate } from "@/lib/prompts";

/**
 * プロンプトカード（docs/spec.md SCR-05 / FR-06）。
 * コピー / 体験チャットで試す。有料(premium)は #6 認証導入までロック表示。
 */
export function PromptCard({ item }: { item: PromptTemplate }) {
  const [copied, setCopied] = useState(false);
  const locked = item.tier === "premium";

  async function copy() {
    try {
      await navigator.clipboard.writeText(item.prompt);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      // クリップボード非対応時は何もしない（テキストは表示済み）
    }
  }

  return (
    <div className="rounded border-2 border-border p-4">
      <h3 className="text-body-lg font-bold">{item.title}</h3>
      <pre className="mt-2 whitespace-pre-wrap break-words rounded bg-[#F1F5F9] p-3 text-body text-text">
        {item.prompt}
      </pre>

      {locked ? (
        <div className="mt-3 flex flex-wrap items-center gap-3">
          <span className="text-caption font-bold text-warn">
            🔒 有料プランで使えます
          </span>
          <Link
            href="/pricing"
            className="inline-flex min-h-tap items-center rounded border-2 border-primary px-4 text-button font-bold text-primary"
          >
            プランを見る
          </Link>
        </div>
      ) : (
        <div className="mt-3 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={copy}
            aria-label="この文をコピーする"
            className="inline-flex min-h-tap items-center gap-1 rounded border-2 border-border bg-bg px-4 text-button font-bold text-text"
          >
            <span aria-hidden>{copied ? "✓" : "📋"}</span>
            {copied ? "コピーしました" : "コピー"}
          </button>
          <Link
            href={`/chat?prompt=${encodeURIComponent(item.prompt)}`}
            className="inline-flex min-h-btn items-center rounded bg-primary px-5 text-button font-bold text-primary-text"
          >
            この文で試す
          </Link>
        </div>
      )}
    </div>
  );
}
