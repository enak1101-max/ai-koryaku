import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { FontSizeProvider } from "@/lib/font-size";
import { FontSizeToggle } from "@/components/ui/FontSizeToggle";

describe("FontSizeToggle（シニア向け文字サイズ切替）", () => {
  beforeEach(() => {
    window.localStorage.clear();
    document.documentElement.removeAttribute("data-font-scale");
  });

  it("3段階（標準/大/特大）のボタンが表示される", () => {
    render(
      <FontSizeProvider>
        <FontSizeToggle />
      </FontSizeProvider>,
    );
    expect(screen.getByRole("button", { name: "標準" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "大" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "特大" })).toBeInTheDocument();
  });

  it("「大」を押すと html に data-font-scale=large が付く", () => {
    render(
      <FontSizeProvider>
        <FontSizeToggle />
      </FontSizeProvider>,
    );
    fireEvent.click(screen.getByRole("button", { name: "大" }));
    expect(document.documentElement.getAttribute("data-font-scale")).toBe(
      "large",
    );
  });

  it("選択状態が aria-pressed で示される（色のみに依存しない）", () => {
    render(
      <FontSizeProvider>
        <FontSizeToggle />
      </FontSizeProvider>,
    );
    fireEvent.click(screen.getByRole("button", { name: "特大" }));
    expect(
      screen.getByRole("button", { name: "特大" }),
    ).toHaveAttribute("aria-pressed", "true");
    expect(
      screen.getByRole("button", { name: "標準" }),
    ).toHaveAttribute("aria-pressed", "false");
  });
});
