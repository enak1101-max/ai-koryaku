"use client";

import { useRouter } from "next/navigation";
import { SecondaryButton } from "@/components/ui/SecondaryButton";

/** ログアウトボタン（FR-07）。 */
export function LogoutButton() {
  const router = useRouter();
  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/");
    router.refresh();
  }
  return <SecondaryButton onClick={logout}>ログアウト</SecondaryButton>;
}
