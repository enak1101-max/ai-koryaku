import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Providers } from "./providers";
import { AccessibilityBar } from "@/components/ui/AccessibilityBar";

export const metadata: Metadata = {
  title: "言葉で話して、らくらくメール作成｜シニアからのAI入門編",
  description:
    "声で話すだけで、メールや文章がらくらく作れる。シニアのためのやさしいAI入門サイト。",
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
