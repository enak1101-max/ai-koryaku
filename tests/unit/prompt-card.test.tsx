import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { PromptCard } from "@/components/prompts/PromptCard";
import type { PromptTemplate } from "@/lib/prompts";

const free: PromptTemplate = {
  id: "f",
  category: "暮らし",
  title: "無料テンプレ",
  prompt: "テスト用の例文",
  tier: "free",
};
const premium: PromptTemplate = {
  id: "p",
  category: "仕事",
  title: "有料テンプレ",
  prompt: "テスト用の例文(有料)",
  tier: "premium",
};

describe("PromptCard の tier 出し分け (FR-06)", () => {
  it("無料はコピー/試すボタンを表示", () => {
    render(<PromptCard item={free} />);
    expect(screen.getByRole("button", { name: "この文をコピーする" })).toBeInTheDocument();
    expect(screen.getByText("この文で試す")).toBeInTheDocument();
  });

  it("有料はロック表示とプラン導線を表示し、コピーは出さない", () => {
    render(<PromptCard item={premium} />);
    expect(screen.getByText(/有料プランで使えます/)).toBeInTheDocument();
    expect(screen.getByText("プランを見る")).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "この文をコピーする" })).toBeNull();
  });
});
