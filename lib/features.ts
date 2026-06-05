/**
 * 機能フラグ。
 * AIのおしゃべり（有料API）は既定で「オフ（近日公開）」。
 * → これにより、公開しても料金が発生しない。
 * 後でAIを有効化するときは、環境変数 NEXT_PUBLIC_AI_ENABLED=true を設定する。
 */
export const AI_ENABLED = process.env.NEXT_PUBLIC_AI_ENABLED === "true";
