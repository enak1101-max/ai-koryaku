import { type ButtonHTMLAttributes } from "react";

/**
 * 補助ボタン — docs/design.md §3
 * 枠線スタイル。補助操作に使う。
 */
export function SecondaryButton({
  className = "",
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={
        "min-h-tap min-w-tap rounded border-2 border-border bg-bg px-5 " +
        "text-button font-bold text-text transition-transform " +
        "active:scale-[0.98] disabled:opacity-50 disabled:active:scale-100 " +
        className
      }
      {...props}
    >
      {children}
    </button>
  );
}
