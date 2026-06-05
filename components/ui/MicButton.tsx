"use client";

import { useSpeechInput } from "@/lib/use-speech";

/**
 * マイク（音声入力）ボタン（docs/design.md §3 / FR-11）。
 * 認識テキストは onTranscript で入力欄へ反映 → 送信前にユーザーが確認・修正できる。
 * 非対応/権限拒否時はキーボード入力にフォールバック（ボタン非表示）。
 */
export function MicButton({
  onTranscript,
}: {
  onTranscript: (text: string) => void;
}) {
  const { supported, listening, start, stop } = useSpeechInput(onTranscript);
  if (!supported) return null;

  return (
    <button
      type="button"
      onClick={() => (listening ? stop() : start())}
      aria-label={listening ? "聞き取りを止める" : "話して入力する"}
      aria-pressed={listening}
      className={
        "flex min-h-btn min-w-tap items-center justify-center rounded border-2 px-3 text-button font-bold " +
        (listening
          ? "animate-pulse border-mic-active bg-mic-active text-primary-text"
          : "border-border bg-bg text-text")
      }
    >
      <span aria-hidden>🎤</span>
    </button>
  );
}
