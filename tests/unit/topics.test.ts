import { describe, it, expect } from "vitest";
import { TOPICS } from "@/lib/topics";

describe("お題ボタン (FR-03)", () => {
  it("空欄恐怖を防ぐため、複数のお題が用意されている", () => {
    expect(TOPICS.length).toBeGreaterThanOrEqual(3);
  });

  it("各お題は label と prompt（例文）を持つ", () => {
    for (const t of TOPICS) {
      expect(t.label.length).toBeGreaterThan(0);
      expect(t.prompt.length).toBeGreaterThan(0);
    }
  });
});
