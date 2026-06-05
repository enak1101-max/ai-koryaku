import { FontSizeToggle } from "@/components/ui/FontSizeToggle";

/**
 * 全ページ共通のアクセシビリティバー（docs/design.md §6 / NFR）。
 * 文字サイズ切替をどのページからでも使えるようにする（シニア配慮）。
 */
export function AccessibilityBar() {
  return (
    <div className="border-b border-border bg-bg">
      <div className="mx-auto flex max-w-[720px] justify-end px-4 py-2">
        <FontSizeToggle />
      </div>
    </div>
  );
}
