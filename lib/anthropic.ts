import Anthropic from "@anthropic-ai/sdk";

/**
 * Anthropic Claude クライアント。
 * APIキーはサーバー側でのみ参照（クライアントに出さない）。docs/spec.md §5.4 準拠。
 */
export const anthropic = new Anthropic();

/**
 * 使用モデル。
 * 運用方針（コスト最小化）により既定は最も安い claude-haiku-4-5。
 * 高性能で動かしたい場合は環境変数 CLAUDE_MODEL=claude-opus-4-8 等で上書き可能。
 */
export const CLAUDE_MODEL = process.env.CLAUDE_MODEL ?? "claude-haiku-4-5";

/** 1回の応答の最大トークン（シニア向けに簡潔・コスト配慮） */
export const MAX_TOKENS = Number(process.env.CLAUDE_MAX_TOKENS ?? 2048);
