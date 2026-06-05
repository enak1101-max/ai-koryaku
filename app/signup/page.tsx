import type { Metadata } from "next";
import { AuthForm } from "@/components/auth/AuthForm";

export const metadata: Metadata = {
  title: "無料会員登録 — ４0代からできるAI攻略",
};

export default function SignupPage() {
  return <AuthForm mode="signup" />;
}
