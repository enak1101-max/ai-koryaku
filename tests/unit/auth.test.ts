import { describe, it, expect } from "vitest";
import { isValidEmail, serializeSession, clearSessionCookie } from "@/lib/auth";

describe("認証ユーティリティ (FR-07/08)", () => {
  it("メール形式を検証できる", () => {
    expect(isValidEmail("yamada@example.com")).toBe(true);
    expect(isValidEmail("わるい")).toBe(false);
    expect(isValidEmail("a@b")).toBe(false);
  });

  it("セッションcookieは HttpOnly で発行される", () => {
    const c = serializeSession({ email: "a@example.com", plan: "free" });
    expect(c).toContain("ai-koryaku-session=");
    expect(c).toContain("HttpOnly");
    expect(c).toContain("SameSite=Lax");
  });

  it("ログアウトcookieは Max-Age=0 で失効させる", () => {
    expect(clearSessionCookie()).toContain("Max-Age=0");
  });
});
