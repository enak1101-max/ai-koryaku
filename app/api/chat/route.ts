import Anthropic from "@anthropic-ai/sdk";
import { anthropic, CLAUDE_MODEL, MAX_TOKENS } from "@/lib/anthropic";
import { SYSTEM_PROMPT } from "@/lib/system-prompt";
import { consumeUsage } from "@/lib/usage";
import { AI_ENABLED } from "@/lib/features";

// SDK + cookie を使うため Node ランタイムで動かす。
export const runtime = "nodejs";

type ChatMessage = { role: "user" | "assistant"; content: string };

/**
 * POST /api/chat — AIチャット中継（ストリーミング）。docs/spec.md §7。
 * 無料枠を消費 → Claude にストリーム要求 → テキストを逐次返す。
 * 上限超過は 429、AI障害は 503 を返す（やさしいメッセージはクライアント側で表示）。
 */
export async function POST(req: Request) {
  // AIが無効（近日公開）のときは、有料APIを呼ばずに返す（料金発生を防ぐ）。
  if (!AI_ENABLED) {
    return Response.json({ error: "ai_disabled" }, { status: 503 });
  }

  let body: { messages?: ChatMessage[] };
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "invalid_json" }, { status: 400 });
  }

  const messages = (body.messages ?? []).filter(
    (m) => (m.role === "user" || m.role === "assistant") && typeof m.content === "string",
  );
  if (messages.length === 0) {
    return Response.json({ error: "empty_messages" }, { status: 400 });
  }

  // 無料枠カウント（サーバー側で減算）
  const usage = consumeUsage();
  if (!usage.allowed) {
    return Response.json(
      { error: "rate_limited", limit: usage.limit },
      { status: 429, headers: { "Set-Cookie": usage.setCookie } },
    );
  }

  const encoder = new TextEncoder();

  try {
    const stream = anthropic.messages.stream({
      model: CLAUDE_MODEL,
      max_tokens: MAX_TOKENS,
      system: SYSTEM_PROMPT,
      messages: messages.map((m) => ({ role: m.role, content: m.content })),
    });

    const readable = new ReadableStream<Uint8Array>({
      async start(controller) {
        try {
          for await (const event of stream) {
            if (
              event.type === "content_block_delta" &&
              event.delta.type === "text_delta"
            ) {
              controller.enqueue(encoder.encode(event.delta.text));
            }
          }
          controller.close();
        } catch (err) {
          // ストリーム途中の障害。クライアントは切断として扱う。
          controller.error(err);
        }
      },
    });

    return new Response(readable, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-store",
        "X-Usage-Remaining": String(usage.remaining),
        "Set-Cookie": usage.setCookie,
      },
    });
  } catch (err) {
    const status = err instanceof Anthropic.APIError ? err.status ?? 503 : 503;
    return Response.json(
      { error: "ai_unavailable" },
      { status, headers: { "Set-Cookie": usage.setCookie } },
    );
  }
}
