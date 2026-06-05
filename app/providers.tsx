"use client";

import { type ReactNode } from "react";
import { FontSizeProvider } from "@/lib/font-size";

/** クライアント側のグローバルProvider群をまとめる */
export function Providers({ children }: { children: ReactNode }) {
  return <FontSizeProvider>{children}</FontSizeProvider>;
}
