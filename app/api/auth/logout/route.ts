import { clearSessionCookie } from "@/lib/auth";

export const runtime = "nodejs";

/** POST /api/auth/logout — ログアウト（FR-07）。 */
export async function POST() {
  return Response.json(
    { ok: true },
    { status: 200, headers: { "Set-Cookie": clearSessionCookie() } },
  );
}
