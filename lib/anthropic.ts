import Anthropic from "@anthropic-ai/sdk";

/**
 * Anthropic Claude クライアント。
 * APIキーはサーバー側でのみ参照（クライアントに出さない）。docs/spec.md §5.4 準拠。
 */
export const anthropic = new Anthropic();

/**
 * 使用モデル。
 * 既定は最上位の claude-opus-4-8。コスト最適化したい場合は環境変数
 * CLAUDE_MODEL=claude-haiku-4-5 などに変更可能（フリーミアム無料枠のコスト判断は運用側で）。
 */
export const CLAUDE_MODEL = process.env.CLAUDE_MODEL ?? "claude-opus-4-8";

/** 1回の応答の最大トークン（シニア向けに簡潔・コスト配慮） */
export const MAX_TOKENS = Number(process.env.CLAUDE_MAX_TOKENS ?? 2048);
