"use client";

import { useCallback, useEffect, useState } from "react";

/**
 * チュートリアル進捗（docs/spec.md SCR-04 / FR-04）。
 * MVPでは localStorage に「完了したステップ番号」を保存（DB化は後続）。
 */
const KEY = (tutorialId: string) => `ai-koryaku:progress:${tutorialId}`;

export function useProgress(tutorialId: string, totalSteps: number) {
  const [done, setDone] = useState<number[]>([]);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(KEY(tutorialId));
      if (raw) setDone(JSON.parse(raw) as number[]);
    } catch {
      // 壊れた値は無視
    }
  }, [tutorialId]);

  const persist = useCallback(
    (next: number[]) => {
      setDone(next);
      try {
        window.localStorage.setItem(KEY(tutorialId), JSON.stringify(next));
      } catch {
        // 保存失敗は致命的でないため無視
      }
    },
    [tutorialId],
  );

  const toggle = useCallback(
    (stepIndex: number) => {
      persist(
        done.includes(stepIndex)
          ? done.filter((i) => i !== stepIndex)
          : [...done, stepIndex],
      );
    },
    [done, persist],
  );

  const completedCount = done.filter((i) => i < totalSteps).length;
  return { done, toggle, completedCount, totalSteps };
}
