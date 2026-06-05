"use client";

import { useFontSize, type FontScale } from "@/lib/font-size";

const OPTIONS: { value: FontScale; label: string }[] = [
  { value: "normal", label: "標準" },
  { value: "large", label: "大" },
  { value: "xlarge", label: "特大" },
];

/**
 * 文字サイズ切替 — docs/design.md §2.2 / §6
 * シニア配慮の必須機能。選択状態は色だけに依存せず aria-pressed でも示す。
 */
export function FontSizeToggle() {
  const { scale, setScale } = useFontSize();

  return (
    <div
      className="flex items-center gap-2"
      role="group"
      aria-label="文字サイズの変更"
    >
      <span className="text-caption text-text-sub">文字サイズ</span>
      {OPTIONS.map((opt) => {
        const selected = scale === opt.value;
        return (
          <button
            key={opt.value}
            type="button"
            aria-pressed={selected}
            onClick={() => setScale(opt.value)}
            className={
              "min-h-tap min-w-tap rounded border-2 px-3 text-button font-bold " +
              (selected
                ? "border-primary bg-primary text-primary-text"
                : "border-border bg-bg text-text")
            }
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
