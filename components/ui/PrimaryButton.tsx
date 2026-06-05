import { type ButtonHTMLAttributes } from "react";

/**
 * 主要CTAボタン — docs/design.md §3
 * 高さ56px・塗り(primary)・18px・角丸12・押下で明確な反応。
 */
export function PrimaryButton({
  className = "",
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={
        "min-h-btn min-w-tap w-full rounded bg-primary px-5 text-button " +
        "font-bold text-primary-text transition-transform " +
        "active:scale-[0.98] disabled:opacity-50 disabled:active:scale-100 " +
        className
      }
      {...props}
    >
      {children}
    </button>
  );
}
