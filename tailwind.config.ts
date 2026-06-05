import type { Config } from "tailwindcss";

/**
 * デザイントークン — docs/design.md §2 準拠
 * シニア配慮: 本文18px基準・高コントラスト・タップ領域48px・角丸12px。
 * フォントサイズは rem ベース。ルート font-size を切替えることで
 * 標準/大/特大 を全画面に一括反映する（lib/font-size.tsx）。
 */
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // §2.1 カラー（高コントラスト / WCAG AA以上）
        bg: "#FFFFFF",
        text: "#1A1A1A",
        "text-sub": "#444444",
        primary: "#0B6BCB",
        "primary-text": "#FFFFFF",
        accent: "#1B8A5A",
        warn: "#B45309",
        danger: "#B00020",
        border: "#CBD5E1",
        "mic-active": "#B00020",
      },
      fontSize: {
        // §2.2 タイポ（rem基準。ルート18px時の実寸をコメント）
        caption: ["0.833rem", { lineHeight: "1.5" }], // ~15px
        body: ["1rem", { lineHeight: "1.7" }], // 18px
        button: ["1rem", { lineHeight: "1.2" }], // 18px
        "body-lg": ["1.111rem", { lineHeight: "1.7" }], // ~20px
        h2: ["1.222rem", { lineHeight: "1.4" }], // ~22px
        h1: ["1.556rem", { lineHeight: "1.35" }], // ~28px
        display: ["2.222rem", { lineHeight: "1.3" }], // ~40px
      },
      borderRadius: {
        DEFAULT: "12px", // §2.3 やわらかい角丸
        lg: "16px",
      },
      minHeight: {
        tap: "48px", // §2.3 タップ最小
        btn: "56px", // 主要ボタン高さ
      },
      minWidth: {
        tap: "48px",
      },
      spacing: {
        // §2.3 余白スケール（1〜6）
        1: "4px",
        2: "8px",
        3: "12px",
        4: "16px",
        5: "24px",
        6: "32px",
      },
    },
  },
  plugins: [],
};

export default config;
