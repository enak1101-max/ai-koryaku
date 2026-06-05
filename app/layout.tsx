import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Providers } from "./providers";
import { AccessibilityBar } from "@/components/ui/AccessibilityBar";

export const metadata: Metadata = {
  title: "４0代からできるAI攻略",
  description:
    "30〜60代が、むずかしくない、話すだけ。誰でも簡単にAIに触れて実践できるサイト。",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>
        <a href="#main-content" className="skip-link">
          本文へスキップ
        </a>
        <Providers>
          <AccessibilityBar />
          <div id="main-content">{children}</div>
        </Providers>
      </body>
    </html>
  );
}
