import { describe, it, expect } from "vitest";
import { PROMPTS, PROMPT_CATEGORIES } from "@/lib/prompts";

describe("プロンプト集 (FR-06)", () => {
  it("テンプレが複数あり、id が一意", () => {
    expect(PROMPTS.length).toBeGreaterThanOrEqual(5);
    const ids = new Set(PROMPTS.map((p) => p.id));
    expect(ids.size).toBe(PROMPTS.length);
  });

  it("無料と有料の両方があり、tier 出し分けが効く", () => {
    expect(PROMPTS.some((p) => p.tier === "free")).toBe(true);
    expect(PROMPTS.some((p) => p.tier === "premium")).toBe(true);
  });

  it("各テンプレのカテゴリは定義済みカテゴリに含まれる", () => {
    for (const p of PROMPTS) {
      expect(PROMPT_CATEGORIES).toContain(p.category);
      expect(p.prompt.length).toBeGreaterThan(0);
    }
  });
});
