"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChatBubble } from "@/components/ui/ChatBubble";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { MicButton } from "@/components/ui/MicButton";
import { ReadAloudButton } from "@/components/ui/ReadAloudButton";
import { TopicChip } from "@/components/ui/TopicChip";
import { UsageMeter } from "@/components/ui/UsageMeter";
import { TOPICS } from "@/lib/topics";

type Msg = { id: string; role: "user" | "assistant"; content: string };

/**
 * AIチャット体験のメイン（docs/spec.md SCR-02）。
 * 音声入力(🎤)→確認→送信→AI回答(ストリーミング)→読み上げ(🔊)。無料枠管理つき。
 */
export function ChatClient() {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [remaining, setRemaining] = useState<number | null>(null);
  const [limit, setLimit] = useState<number | null>(null);
  const [limitReached, setLimitReached] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const listEndRef = useRef<HTMLDivElement>(null);

  // チュートリアルからの「この例文で試す」(?prompt=)を入力欄へ反映（FR-05）
  useEffect(() => {
    const p = new URLSearchParams(window.location.search).get("prompt");
    if (p) setInput(p);
  }, []);

  // 残り回数の取得
  useEffect(() => {
    fetch("/api/usage")
      .then((r) => r.json())
      .then((d: { remaining: number; limit: number }) => {
        setRemaining(d.remaining);
        setLimit(d.limit);
        setLimitReached(d.remaining <= 0);
      })
      .catch(() => {});
  }, []);

  // 新着までスクロール
  useEffect(() => {
    listEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = useCallback(async () => {
    const text = input.trim();
    if (!text || sending) return;

    setError(null);
    const userMsg: Msg = { id: `u-${messages.length}`, role: "user", content: text };
    const aiId = `a-${messages.length}`;
    const history = [...messages, userMsg];
    setMessages([...history, { id: aiId, role: "assistant", content: "" }]);
    setInput("");
    setSending(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: history.map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      if (res.status === 429) {
        setLimitReached(true);
        setRemaining(0);
        setMessages((prev) => prev.filter((m) => m.id !== aiId));
        return;
      }
      if (!res.ok || !res.body) {
        throw new Error("ai_error");
      }

      const headerRemaining = res.headers.get("X-Usage-Remaining");
      if (headerRemaining !== null) setRemaining(Number(headerRemaining));

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let acc = "";
      for (;;) {
        const { value, done } = await reader.read();
        if (done) break;
        acc += decoder.decode(value, { stream: true });
        setMessages((prev) =>
          prev.map((m) => (m.id === aiId ? { ...m, content: acc } : m)),
        );
      }
      if (remaining !== null && remaining - 1 <= 0) setLimitReached(true);
    } catch {
      setError("うまく送れませんでした。もう一度お試しください。");
      setMessages((prev) => prev.filter((m) => m.id !== aiId));
    } finally {
      setSending(false);
    }
  }, [input, sending, messages, remaining]);

  return (
    <div className="mx-auto flex min-h-[100dvh] max-w-[720px] flex-col px-4">
      {/* ヘッダー */}
      <div className="flex items-center justify-between py-3">
        <Link href="/" className="text-button font-bold text-primary">
          ← もどる
        </Link>
        <UsageMeter remaining={remaining} limit={limit} />
      </div>

      {/* 会話表示 */}
      <div className="flex-1 space-y-3 overflow-y-auto pb-4">
        {messages.length === 0 && (
          <p className="mt-6 text-center text-body-lg text-text-sub">
            下のボタンから、きいてみたいことを選べます。
            <br />
            🎤マイクで話しかけてもOKです。
          </p>
        )}
        {messages.map((m) => (
          <ChatBubble
            key={m.id}
            role={m.role === "assistant" ? "ai" : "user"}
            action={
              m.role === "assistant" && m.content ? (
                <ReadAloudButton id={m.id} text={m.content} />
              ) : undefined
            }
          >
            {m.content || (m.role === "assistant" ? "…" : "")}
          </ChatBubble>
        ))}
        {error && (
          <p className="text-center text-body text-danger" role="alert">
            {error}
          </p>
        )}
        <div ref={listEndRef} />
      </div>

      {/* 上限到達の導線 */}
      {limitReached ? (
        <div className="mb-4 rounded border-2 border-border p-4 text-center">
          <p className="text-body-lg font-bold">今日の無料体験は終わりです</p>
          <p className="mt-1 text-caption text-text-sub">
            もっと使うには、無料会員登録かプランをご覧ください。
          </p>
          <div className="mt-3 grid gap-2">
            <Link href="/signup">
              <PrimaryButton>無料会員になる</PrimaryButton>
            </Link>
            <Link
              href="/pricing"
              className="text-button font-bold text-primary underline"
            >
              プランを見る
            </Link>
          </div>
        </div>
      ) : (
        <>
          {/* お題ボタン */}
          <div className="-mx-4 mb-2 flex gap-2 overflow-x-auto px-4 pb-1">
            {TOPICS.map((t) => (
              <TopicChip
                key={t.label}
                label={t.label}
                onSelect={() => setInput(t.prompt)}
              />
            ))}
          </div>

          {/* 入力バー（ボトムアクションバー） */}
          <div className="sticky bottom-0 -mx-4 flex items-end gap-2 border-t-2 border-border bg-bg px-4 py-3">
            <MicButton onTranscript={setInput} />
            <label htmlFor="chat-input" className="sr-only">
              メッセージを入力
            </label>
            <textarea
              id="chat-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              rows={2}
              placeholder="ここに入力、または🎤で話す"
              className="min-h-btn flex-1 resize-none rounded border-2 border-border px-3 py-2 text-body"
            />
            <PrimaryButton
              onClick={send}
              disabled={sending || !input.trim()}
              className="w-auto px-5"
            >
              {sending ? "送信中…" : "送る"}
            </PrimaryButton>
          </div>
        </>
      )}
    </div>
  );
}
