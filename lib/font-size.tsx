"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

/** 文字サイズ段階 — docs/design.md §2.2（標準/大/特大） */
export type FontScale = "normal" | "large" | "xlarge";

const STORAGE_KEY = "ai-koryaku:font-scale";

type FontSizeContextValue = {
  scale: FontScale;
  setScale: (scale: FontScale) => void;
};

const FontSizeContext = createContext<FontSizeContextValue | null>(null);

/** <html data-font-scale> を更新（normal は属性を消して :root 既定値を使う） */
function applyToDocument(scale: FontScale) {
  if (typeof document === "undefined") return;
  if (scale === "normal") {
    document.documentElement.removeAttribute("data-font-scale");
  } else {
    document.documentElement.setAttribute("data-font-scale", scale);
  }
}

export function FontSizeProvider({ children }: { children: ReactNode }) {
  const [scale, setScaleState] = useState<FontScale>("normal");

  // 初回マウント時に保存値を復元
  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY) as FontScale | null;
    if (saved === "normal" || saved === "large" || saved === "xlarge") {
      setScaleState(saved);
      applyToDocument(saved);
    }
  }, []);

  const setScale = useCallback((next: FontScale) => {
    setScaleState(next);
    applyToDocument(next);
    window.localStorage.setItem(STORAGE_KEY, next);
  }, []);

  return (
    <FontSizeContext.Provider value={{ scale, setScale }}>
      {children}
    </FontSizeContext.Provider>
  );
}

export function useFontSize(): FontSizeContextValue {
  const ctx = useContext(FontSizeContext);
  if (!ctx) {
    throw new Error("useFontSize は FontSizeProvider 内で使用してください");
  }
  return ctx;
}
