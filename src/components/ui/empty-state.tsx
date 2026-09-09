import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  titleAs: Title = "h2",
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: ReactNode;
  titleAs?: "h1" | "h2";
}) {
  return (
    <div className="mt-6 flex flex-col items-center rounded-2xl bg-surface px-6 py-12 text-center shadow-[var(--shadow-border)]">
      <div className="grid size-14 place-items-center rounded-xl bg-bg text-primary">
        <Icon className="size-6" strokeWidth={1.5} />
      </div>
      <Title className="mt-4 font-display text-2xl leading-tight">{title}</Title>
      <p className="mt-1 max-w-sm text-sm text-muted">{description}</p>
      {action ? <div className="mt-5">{action}</div> : null}
    </div>
  );
}
