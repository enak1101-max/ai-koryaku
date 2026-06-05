import { describe, it, expect } from "vitest";
import { FAQS } from "@/lib/faq";

describe("よくある質問 (FR-09)", () => {
  it("不安解消のため複数のQ&Aがある", () => {
    expect(FAQS.length).toBeGreaterThanOrEqual(4);
  });

  it("各項目に質問と答えがある", () => {
    for (const f of FAQS) {
      expect(f.q.length).toBeGreaterThan(0);
      expect(f.a.length).toBeGreaterThan(0);
    }
  });

  it("お金・個人情報の不安に答える項目がある", () => {
    const text = FAQS.map((f) => f.q + f.a).join();
    expect(text).toMatch(/無料|お金/);
    expect(text).toMatch(/個人情報|パスワード/);
  });
});
