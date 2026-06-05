"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PrimaryButton } from "@/components/ui/PrimaryButton";

/**
 * 有料プラン申し込みボタン（docs/spec.md SCR-07 / FR-08）。
 * ⚠️ MVPモック: その場で premium 化（実際の決済は CC-Auth 導入時）。
 */
export function UpgradeButton() {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function upgrade() {
    setError(null);
    setBusy(true);
    try {
      const res = await fetch("/api/billing/checkout", { method: "POST" });
      if (res.status === 401) {
        router.push("/login");
        return;
      }
      if (!res.ok) {
        setError("お申し込みに失敗しました。もう一度お試しください。");
        return;
      }
      router.push("/mypage");
      router.refresh();
    } catch {
      setError("うまく送れませんでした。もう一度お試しください。");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div>
      <PrimaryButton onClick={upgrade} disabled={busy}>
        {busy ? "お手続き中…" : "プレミアムに申し込む"}
      </PrimaryButton>
      {error && (
        <p className="mt-2 text-body text-danger" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
