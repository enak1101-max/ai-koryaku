"use client";

import Link from "next/link";
import { ReadAloudButton } from "@/components/ui/ReadAloudButton";
import { useProgress } from "@/lib/use-progress";
import type { Tutorial } from "@/lib/tutorials";

/**
 * チュートリアル詳細（docs/spec.md SCR-04 / FR-04, FR-05）。
 * ステップを縦に並べ、各ステップに「できた」チェック・🔊読み上げ・
 * 「この例文で試す」（体験チャットへ例文付きで遷移）を備える。
 */
export function TutorialDetail({ tutorial }: { tutorial: Tutorial }) {
  const { done, toggle, completedCount, totalSteps } = useProgress(
    tutorial.id,
    tutorial.steps.length,
  );
  const allDone = completedCount >= totalSteps;

  return (
    <main className="mx-auto max-w-[720px] px-4 py-6">
      <div className="mb-4">
        <Link href="/learn" className="text-button font-bold text-primary">
          ← 一覧にもどる
        </Link>
      </div>

      <div className="flex items-center gap-3">
        <span className="text-display" aria-hidden>
          {tutorial.emoji}
        </span>
        <h1 className="text-h1 font-bold">{tutorial.title}</h1>
      </div>

      {/* 進捗 */}
      <p className="mt-3 text-body-lg">
        進捗：<span className="font-bold text-accent">{completedCount}</span> /{" "}
        {totalSteps}
        {allDone && <span className="ml-2 text-accent">🎉 ぜんぶできました！</span>}
      </p>
      <div
        className="mt-2 h-3 w-full overflow-hidden rounded bg-border"
        role="progressbar"
        aria-valuenow={completedCount}
        aria-valuemin={0}
        aria-valuemax={totalSteps}
        aria-label="チュートリアルの進捗"
      >
        <div
          className="h-full bg-accent transition-all"
          style={{ width: `${(completedCount / totalSteps) * 100}%` }}
        />
      </div>

      {/* ステップ */}
      <ol className="mt-6 grid gap-4">
        {tutorial.steps.map((step, i) => {
          const isDone = done.includes(i);
          return (
            <li key={i} className="rounded border-2 border-border p-4">
              <div className="flex items-start justify-between gap-3">
                <h2 className="text-body-lg font-bold">
                  ステップ {i + 1}：{step.title}
                </h2>
                <ReadAloudButton
                  id={`${tutorial.id}-${i}`}
                  text={`${step.title}。${step.body}`}
                />
              </div>

              {/* 画面キャプチャの代わりのプレースホルダ（実画像は後続で差し替え） */}
              <div
                className="mt-3 flex h-28 items-center justify-center rounded bg-[#F1F5F9] text-caption text-text-sub"
                role="img"
                aria-label={`${step.title}の操作イメージ`}
              >
                操作イメージ
              </div>

              <p className="mt-3 whitespace-pre-wrap text-body text-text-sub">
                {step.body}
              </p>

              <div className="mt-4 flex flex-wrap items-center gap-3">
                {step.example && (
                  <Link
                    href={`/chat?prompt=${encodeURIComponent(step.example)}`}
                    className="inline-flex min-h-btn items-center rounded bg-primary px-5 text-button font-bold text-primary-text"
                  >
                    この例文で試す
                  </Link>
                )}
                <button
                  type="button"
                  onClick={() => toggle(i)}
                  aria-pressed={isDone}
                  className={
                    "inline-flex min-h-tap items-center gap-1 rounded border-2 px-4 text-button font-bold " +
                    (isDone
                      ? "border-accent bg-accent text-primary-text"
                      : "border-border bg-bg text-text")
                  }
                >
                  <span aria-hidden>{isDone ? "✓" : "○"}</span>
                  {isDone ? "できた" : "できたら押す"}
                </button>
              </div>
            </li>
          );
        })}
      </ol>
    </main>
  );
}
