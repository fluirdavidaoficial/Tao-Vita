import { Link, useRouterState } from "@tanstack/react-router";
import { Bookmark, Search } from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/", label: "Atlas" },
  { to: "/protocolos", label: "Protocolos" },
  { to: "/consulta", label: "Consulta" },
  { to: "/diagnostico", label: "Diagnóstico" },
  { to: "/orelha", label: "Orelha" },
  { to: "/ynsa", label: "Yamamoto" },
  { to: "/vasos", label: "Vasos" },
  { to: "/metodo", label: "Método" },
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const scroller = useRef<HTMLDivElement>(null);
  const [pill, setPill] = useState({ x: 0, w: 0, ready: false });

  useEffect(() => {
    const root = scroller.current;
    if (!root) return;
    const active = root.querySelector<HTMLElement>("[data-active='true']");
    if (!active) {
      setPill((p) => ({ ...p, ready: false }));
      return;
    }
    setPill({ x: active.offsetLeft, w: active.offsetWidth, ready: true });
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    active.scrollIntoView({
      inline: "center",
      block: "nearest",
      behavior: reduce ? "auto" : "smooth",
    });
  }, [pathname]);

  return (
    <div className="min-h-dvh bg-bg text-fg">
      <header className="sticky top-0 z-30 border-b border-border bg-bg/95 pt-[env(safe-area-inset-top)] backdrop-blur">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-2">
          <Link
            to="/"
            className="font-display text-2xl font-semibold tracking-tight transition-opacity duration-150 hover:opacity-80"
          >
            Tao Vita
          </Link>
          <div className="flex text-muted">
            <Link
              to="/consulta"
              aria-label="Consulta"
              className="grid size-11 place-items-center rounded-xl transition-colors duration-150 ease-out hover:bg-surface hover:text-fg"
            >
              <Search className="size-5" />
            </Link>
            <Link
              to="/ficha"
              aria-label="Ficha"
              className="grid size-11 place-items-center rounded-xl transition-colors duration-150 ease-out hover:bg-surface hover:text-fg"
            >
              <Bookmark className="size-5" />
            </Link>
          </div>
        </div>
        <nav className="nav-scroll mx-auto max-w-3xl overflow-x-auto px-3 pb-2">
          <div ref={scroller} className="relative flex w-max gap-1">
            <span
              aria-hidden
              className="nav-pill pointer-events-none absolute top-0 h-11 rounded-full bg-primary"
              style={{
                width: pill.w,
                transform: `translateX(${pill.x}px)`,
                opacity: pill.ready ? 1 : 0,
              }}
            />
            {NAV.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                className={cn(
                  "relative z-10 flex min-h-11 shrink-0 items-center rounded-full px-3.5 text-sm",
                  "text-muted transition-colors duration-200 ease-out",
                  "[&[data-active=true]]:text-primary-fg",
                  !pill.ready && "[&[data-active=true]]:bg-primary",
                )}
                activeOptions={{ exact: n.to === "/" }}
                activeProps={{ "data-active": "true" }}
              >
                {n.label}
              </Link>
            ))}
          </div>
        </nav>
      </header>
      <main
        key={pathname}
        className="page-enter mx-auto max-w-3xl px-4 py-5 pb-[max(5rem,env(safe-area-inset-bottom))]"
      >
        {children}
      </main>
      <p className="px-4 pb-[max(2rem,env(safe-area-inset-bottom))] text-center text-xs text-subtle">
        Apoio ao estudo e à prática. Não substitui exame presencial.
      </p>
    </div>
  );
}
