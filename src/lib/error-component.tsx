import type { ErrorComponentProps } from "@tanstack/react-router";
import { TriangleAlert } from "lucide-react";

export function AppErrorComponent({ error }: ErrorComponentProps) {
  return (
    <div className="flex min-h-[50dvh] flex-col items-center justify-center gap-3 px-2 text-center">
      <span
        className="grid size-14 place-items-center rounded-xl bg-surface text-primary shadow-[var(--shadow-border)]"
        aria-hidden="true"
      >
        <TriangleAlert className="size-6" strokeWidth={1.5} />
      </span>
      <h1 className="font-display text-2xl">Algo deu errado</h1>
      <p className="max-w-md text-sm break-words text-muted">
        {error.message || "Tente recarregar a página."}
      </p>
    </div>
  );
}
