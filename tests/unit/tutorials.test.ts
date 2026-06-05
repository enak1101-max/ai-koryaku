import { describe, it, expect } from "vitest";
import { TUTORIALS, getTutorial } from "@/lib/tutorials";

describe("チュートリアル (FR-04/05)", () => {
  it("基礎コースが5〜10本ある", () => {
    expect(TUTORIALS.length).toBeGreaterThanOrEqual(5);
    expect(TUTORIALS.length).toBeLessThanOrEqual(10);
  });

  it("各チュートリアルにステップがあり、id が一意", () => {
    const ids = new Set<string>();
    for (const t of TUTORIALS) {
      expect(t.steps.length).toBeGreaterThan(0);
      expect(ids.has(t.id)).toBe(false);
      ids.add(t.id);
    }
  });

  it("体験連動のため、例文(example)を持つステップが存在する (FR-05)", () => {
    const hasExample = TUTORIALS.some((t) => t.steps.some((s) => s.example));
    expect(hasExample).toBe(true);
  });

  it("getTutorial で取得でき、存在しないidは undefined", () => {
    expect(getTutorial(TUTORIALS[0].id)?.id).toBe(TUTORIALS[0].id);
    expect(getTutorial("no-such-id")).toBeUndefined();
  });
});
