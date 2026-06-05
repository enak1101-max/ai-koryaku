import { getSession, isValidEmail, serializeSession } from "@/lib/auth";

export const runtime = "nodejs";

/**
 * POST /api/auth/login — ログイン（FR-07）。
 * MVPモック: メールのみでログイン（パスワード/OAuthはCC-Auth導入時）。
 * すでに同じメールで premium になっていれば、その plan を引き継ぐ。
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
  const existing = getSession();
  const plan = existing?.email === email ? existing.plan : "free";
  return Response.json(
    { email, plan },
    { status: 200, headers: { "Set-Cookie": serializeSession({ email, plan }) } },
  );
}
