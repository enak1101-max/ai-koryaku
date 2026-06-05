import { cookies } from "next/headers";

/**
 * フリーミアム無料枠カウント（docs/spec.md §4）。
 * MVPでは httpOnly cookie に当日の利用回数を保存し、サーバー側で減算する。
 * （DBは後続Issueで導入予定。厳密さよりUX優先 — 要件 §3.4 / spec §4 のとおり）。
 */
const COOKIE_NAME = "ai-koryaku-usage";

/** 無料枠の1日あたり回数。環境変数で調整可能（既定5回/日）。 */
export const FREE_DAILY_LIMIT = Number(process.env.FREE_DAILY_LIMIT ?? 5);

type UsageState = { date: string; count: number };

/** サーバー基準の「今日」（YYYY-MM-DD, UTC） */
function today(): string {
  return new Date().toISOString().slice(0, 10);
}

function parse(raw: string | undefined): UsageState {
  if (!raw) return { date: today(), count: 0 };
  try {
    const parsed = JSON.parse(raw) as Partial<UsageState>;
    if (parsed.date === today() && typeof parsed.count === "number") {
      return { date: parsed.date, count: parsed.count };
    }
  } catch {
    // 壊れた値はリセット扱い
  }
  return { date: today(), count: 0 };
}

/** 現在の利用状況（読み取りのみ） */
export function readUsage(): { count: number; remaining: number; limit: number } {
  const state = parse(cookies().get(COOKIE_NAME)?.value);
  return {
    count: state.count,
    remaining: Math.max(0, FREE_DAILY_LIMIT - state.count),
    limit: FREE_DAILY_LIMIT,
  };
}

/**
 * 1回分を消費する。上限超過なら allowed:false を返す。
 * Set-Cookie 文字列を返すので、呼び出し側がレスポンスヘッダに付与する。
 */
export function consumeUsage(): {
  allowed: boolean;
  remaining: number;
  limit: number;
  setCookie: string;
} {
  const state = parse(cookies().get(COOKIE_NAME)?.value);

  if (state.count >= FREE_DAILY_LIMIT) {
    return {
      allowed: false,
      remaining: 0,
      limit: FREE_DAILY_LIMIT,
      setCookie: serialize(state),
    };
  }

  const next: UsageState = { date: state.date, count: state.count + 1 };
  return {
    allowed: true,
    remaining: Math.max(0, FREE_DAILY_LIMIT - next.count),
    limit: FREE_DAILY_LIMIT,
    setCookie: serialize(next),
  };
}

function serialize(state: UsageState): string {
  const value = encodeURIComponent(JSON.stringify(state));
  // 当日いっぱい有効。httpOnly でクライアントJSからは読めない（改ざん耐性はMVP相当）。
  return `${COOKIE_NAME}=${value}; Path=/; HttpOnly; SameSite=Lax; Max-Age=86400`;
}
