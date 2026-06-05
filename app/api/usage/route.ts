import { readUsage } from "@/lib/usage";

export const runtime = "nodejs";

/** GET /api/usage — 当日の残り無料回数（docs/spec.md §7）。 */
export async function GET() {
  const usage = readUsage();
  return Response.json(usage, { headers: { "Cache-Control": "no-store" } });
}
