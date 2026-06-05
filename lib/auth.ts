import { cookies } from "next/headers";

/**
 * 認証・プラン管理（docs/spec.md SCR-06/07/08 / FR-07/08）。
 *
 * ⚠️ MVPモック実装:
 *   実運用では CC-Auth Platform SDK に置き換える（パスワード/OAuth・本物の課金）。
 *   ここでは「メールだけで会員になれる」簡易セッションをcookieで保持する。
 *   署名なしcookieのため改ざん耐性はなく、本番用ではない（差し込み口の確認用）。
 *
 * 実SDK差し替えポイント（seam）:
 *   - signIn() / register() → CC-Auth のログイン/登録
 *   - upgradeToPremium()   → CC-Auth の課金完了Webhook結果でplan更新
 *   - getSession()         → CC-Auth のセッション検証
 */
const COOKIE_NAME = "ai-koryaku-session";

export type Plan = "free" | "premium";
export type Session = { email: string; plan: Plan };

export function getSession(): Session | null {
  const raw = cookies().get(COOKIE_NAME)?.value;
  if (!raw) return null;
  try {
    const s = JSON.parse(decodeURIComponent(raw)) as Partial<Session>;
    if (typeof s.email === "string" && (s.plan === "free" || s.plan === "premium")) {
      return { email: s.email, plan: s.plan };
    }
  } catch {
    // 壊れた値は未ログイン扱い
  }
  return null;
}

/** Set-Cookie 文字列を返す（呼び出し側がレスポンスヘッダに付与） */
export function serializeSession(session: Session): string {
  const value = encodeURIComponent(JSON.stringify(session));
  return `${COOKIE_NAME}=${value}; Path=/; HttpOnly; SameSite=Lax; Max-Age=2592000`;
}

/** ログアウト用（cookie失効） */
export function clearSessionCookie(): string {
  return `${COOKIE_NAME}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0`;
}

/** メール形式の最小バリデーション */
export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
