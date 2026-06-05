/**
 * 無料枠の残量表示（docs/design.md §3 / FR-02）。
 * 「今日あと N回」をやさしく表示。残0で導線（プラン/登録）を促す。
 */
export function UsageMeter({
  remaining,
  limit,
}: {
  remaining: number | null;
  limit: number | null;
}) {
  if (remaining === null || limit === null) {
    return <span className="text-caption text-text-sub">　</span>;
  }
  if (remaining <= 0) {
    return (
      <span className="text-caption font-bold text-warn">
        今日の無料体験は終わりです
      </span>
    );
  }
  return (
    <span className="text-caption text-text-sub">
      今日あと <span className="font-bold text-text">{remaining}</span> 回
    </span>
  );
}
