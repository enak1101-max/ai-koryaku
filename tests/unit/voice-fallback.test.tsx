import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { ReadAloudButton } from "@/components/ui/ReadAloudButton";
import { MicButton } from "@/components/ui/MicButton";

/**
 * 非対応環境（jsdom には speechSynthesis / SpeechRecognition が無い）では
 * 音声UIを表示せず、キーボード操作にフォールバックすること（FR-10/11）。
 */
describe("音声UIのフォールバック", () => {
  it("読み上げ非対応では🔊ボタンを表示しない", () => {
    const { container } = render(<ReadAloudButton id="x" text="こんにちは" />);
    expect(container.querySelector("button")).toBeNull();
  });

  it("音声入力非対応では🎤ボタンを表示しない", () => {
    const { container } = render(<MicButton onTranscript={() => {}} />);
    expect(container.querySelector("button")).toBeNull();
  });
});
