import { type ReactNode } from "react";

/**
 * チャット吹き出し — docs/design.md §3
 * user: 右・淡色 / ai: 左・白＋枠。ai側には読み上げ等のアクションを差し込める。
 */
export function ChatBubble({
  role,
  children,
  action,
}: {
  role: "user" | "ai";
  children: ReactNode;
  action?: ReactNode;
}) {
  const isUser = role === "user";
  return (
    <div className={"flex " + (isUser ? "justify-end" : "justify-start")}>
      <div
        className={
          "max-w-[85%] rounded px-4 py-3 text-body-lg " +
          (isUser
            ? "bg-[#E8F1FB] text-text"
            : "border-2 border-border bg-bg text-text")
        }
      >
        {!isUser && (
          <span className="sr-only">AIからの返事: </span>
        )}
        <div className="whitespace-pre-wrap break-words">{children}</div>
        {action && <div className="mt-2">{action}</div>}
      </div>
    </div>
  );
}
