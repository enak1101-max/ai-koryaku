import type { Metadata } from "next";
import { ChatClient } from "@/components/chat/ChatClient";

export const metadata: Metadata = {
  title: "AIにきいてみよう — ４0代からできるAI攻略",
  description: "登録なしで、その場でAIに話しかけて体験できます。",
};

export default function ChatPage() {
  return <ChatClient />;
}
