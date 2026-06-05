import { getSession, serializeSession } from "@/lib/auth";

export const runtime = "nodejs";

/**
 * POST /api/billing/checkout — 有料プラン申し込み（FR-08）。
 * MVPモック: その場で plan=premium に更新（即時解放）。
 * 実運用では CC-Auth の課金フロー → 決済成功Webhook受領後に plan を更新する。
 */
export async function POST() {
  const session = getSession();
  if (!session) {
    return Response.json({ error: "login_required" }, { status: 401 });
  }
  const upgraded = { email: session.email, plan: "premium" as const };
  return Response.json(
    upgraded,
    { status: 200, headers: { "Set-Cookie": serializeSession(upgraded) } },
  );
}
