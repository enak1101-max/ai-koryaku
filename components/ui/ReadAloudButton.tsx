"use client";

import { useReadAloud } from "@/lib/use-speech";

/**
 * 読み上げボタン（docs/design.md §3 / FR-10）。
 * 再生中は停止に切り替わる。非対応ブラウザでは表示しない（フォールバック）。
 */
export function ReadAloudButton({ id, text }: { id: string; text: string }) {
  const { supported, speakingId, speak, stop } = useReadAloud();
  if (!supported) return null;

  const active = speakingId === id;
  return (
    <button
      type="button"
      onClick={() => (active ? stop() : speak(id, text))}
      aria-label={active ? "読み上げを止める" : "声で聞く"}
      className="inline-flex min-h-tap items-center gap-1 rounded border-2 border-border bg-bg px-3 text-caption font-bold text-text"
    >
      <span aria-hidden>{active ? "■" : "🔊"}</span>
      {active ? "止める" : "聞く"}
    </button>
  );
}
