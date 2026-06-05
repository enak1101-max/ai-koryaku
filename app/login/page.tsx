import type { Metadata } from "next";
import { AuthForm } from "@/components/auth/AuthForm";

export const metadata: Metadata = {
  title: "ログイン — ４0代からできるAI攻略",
};

export default function LoginPage() {
  return <AuthForm mode="login" />;
}
