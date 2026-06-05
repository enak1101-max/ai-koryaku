import Link from "next/link";
import { PrimaryButton } from "@/components/ui/PrimaryButton";

/**
 * 未実装ルートの「準備中」表示。ナビが404で行き止まらないための暫定ページ。
 * 後続Issue（#4 学ぶ / #5 登録・プラン / #7 プロンプト集）で本実装に置き換える。
 */
export function ComingSoon({ title, note }: { title: string; note?: string }) {
  return (
    <main className="mx-auto flex min-h-[80dvh] max-w-[720px] flex-col items-center justify-center px-4 text-center">
      <div className="text-display" aria-hidden>
        🛠️
      </div>
      <h1 className="mt-3 text-h1 font-bold">{title}</h1>
      <p className="mt-2 text-body-lg text-text-sub">
        ただいま準備中です。もう少しお待ちください。
      </p>
      {note && <p className="mt-1 text-caption text-text-sub">{note}</p>}
      <div className="mt-6 w-full max-w-[320px]">
        <Link href="/chat" aria-label="AIをためしてみる">
          <PrimaryButton>AIをためしてみる</PrimaryButton>
        </Link>
        <Link
          href="/"
          className="mt-3 inline-block text-button font-bold text-primary underline"
        >
          トップにもどる
        </Link>
      </div>
    </main>
  );
}
