import { isValidEmail, serializeSession } from "@/lib/auth";

export const runtime = "nodejs";

/**
 * POST /api/auth/signup — 無料会員登録（FR-07）。
 * MVPモック: メールのみで登録（CC-Auth導入時に本実装へ差し替え）。
 */
export async function POST(req: Request) {
  let email = "";
  try {
    const data = (await req.json()) as { email?: string };
    email = data.email ?? "";
  } catch {
    return Response.json({ error: "invalid_json" }, { status: 400 });
  }
  if (!email || !isValidEmail(email)) {
    return Response.json({ error: "invalid_email" }, { status: 400 });
  }
  return Response.json(
    { email, plan: "free" },
    { status: 200, headers: { "Set-Cookie": serializeSession({ email, plan: "free" }) } },
  );
}
