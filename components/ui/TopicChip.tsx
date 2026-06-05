/**
 * お題チップ（docs/design.md §3 / FR-03）。
 * タップで入力欄に例文を投入し、空欄で悩ませない。
 */
export function TopicChip({
  label,
  onSelect,
}: {
  label: string;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className="min-h-tap shrink-0 rounded border-2 border-primary bg-bg px-4 text-button font-bold text-primary"
    >
      {label}
    </button>
  );
}
