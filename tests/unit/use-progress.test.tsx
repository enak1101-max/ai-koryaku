import { describe, it, expect, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useProgress } from "@/lib/use-progress";

describe("useProgress（チュートリアル進捗 FR-04）", () => {
  beforeEach(() => window.localStorage.clear());

  it("初期は0、トグルで完了数が増える", () => {
    const { result } = renderHook(() => useProgress("t1", 3));
    expect(result.current.completedCount).toBe(0);
    act(() => result.current.toggle(0));
    expect(result.current.completedCount).toBe(1);
    act(() => result.current.toggle(1));
    expect(result.current.completedCount).toBe(2);
  });

  it("もう一度トグルすると解除される", () => {
    const { result } = renderHook(() => useProgress("t2", 3));
    act(() => result.current.toggle(0));
    expect(result.current.completedCount).toBe(1);
    act(() => result.current.toggle(0));
    expect(result.current.completedCount).toBe(0);
  });

  it("localStorage に保存され、再マウントで復元される", () => {
    const first = renderHook(() => useProgress("t3", 3));
    act(() => first.result.current.toggle(2));
    const second = renderHook(() => useProgress("t3", 3));
    expect(second.result.current.done).toContain(2);
  });
});
