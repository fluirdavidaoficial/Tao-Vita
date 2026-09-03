import { Link, useRouterState } from "@tanstack/react-router";
import { Bookmark, LayoutGrid } from "lucide-react";
import { type ReactNode } from "react";

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const welcome = pathname === "/";
  const hub = pathname === "/inicio";

  if (welcome) {
    return <div className="min-h-dvh bg-bg text-fg">{children}</div>;
  }

  return (
    <div className="min-h-dvh bg-bg text-fg">
      <header className="sticky top-0 z-30 border-b border-border bg-bg/95 pt-[env(safe-area-inset-top)] backdrop-blur">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-3 py-2 sm:px-5">
          <Link
            to="/inicio"
            className="font-display text-2xl font-semibold tracking-tight transition-opacity duration-150 hover:opacity-80"
          >
            Tao Vita
          </Link>
          <div className="flex text-muted">
            {!hub ? (
              <Link
                to="/inicio"
                aria-label="Menu"
                className="grid size-11 place-items-center rounded-xl transition-colors duration-150 ease-out hover:bg-surface hover:text-fg"
              >
                <LayoutGrid className="size-5" />
              </Link>
            ) : null}
            <Link
              to="/ficha"
              aria-label="Ficha"
              className="grid size-11 place-items-center rounded-xl transition-colors duration-150 ease-out hover:bg-surface hover:text-fg"
            >
              <Bookmark className="size-5" />
            </Link>
          </div>
        </div>
      </header>
      <main
        key={pathname}
        className="page-enter mx-auto w-full max-w-3xl px-3 py-5 pb-[max(5rem,env(safe-area-inset-bottom))] sm:px-5"
      >
        {children}
      </main>
      <p className="px-4 pb-[max(2rem,env(safe-area-inset-bottom))] text-center text-xs text-subtle">
        Apoio ao estudo e à prática. Não substitui exame presencial.
      </p>
    </div>
  );
}
