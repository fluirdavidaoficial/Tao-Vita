import { Link } from "@tanstack/react-router";
import { Bookmark, Search } from "lucide-react";
import type { ReactNode } from "react";

const NAV = [
  { to: "/", label: "Atlas" },
  { to: "/protocolos", label: "Protocolos" },
  { to: "/consulta", label: "Consulta" },
  { to: "/diagnostico", label: "Diagnóstico" },
  { to: "/orelha", label: "Orelha" },
  { to: "/ynsa", label: "Yamamoto" },
  { to: "/vasos", label: "Vasos" },
  { to: "/metodo", label: "Método" },
];

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-dvh bg-bg text-fg">
      <header className="sticky top-0 z-30 border-b border-border bg-bg/95 backdrop-blur">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-3">
          <Link to="/" className="font-display text-2xl font-semibold tracking-tight">
            Tao Vita
          </Link>
          <div className="flex gap-3 text-muted">
            <Link to="/consulta" aria-label="Busca / consulta">
              <Search className="size-5" />
            </Link>
            <Link to="/ficha" aria-label="Ficha">
              <Bookmark className="size-5" />
            </Link>
          </div>
        </div>
        <nav className="mx-auto flex max-w-3xl gap-1 overflow-x-auto px-3 pb-2">
          {NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="shrink-0 rounded-full px-3 py-2 text-sm text-muted [&.active]:bg-primary [&.active]:text-primary-fg"
              activeOptions={{ exact: n.to === "/" }}
              activeProps={{ className: "active" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>
      </header>
      <main className="mx-auto max-w-3xl px-4 py-5 pb-20">{children}</main>
      <p className="px-4 pb-8 text-center text-xs text-subtle">
        Apoio ao estudo e à prática. Não substitui exame presencial.
      </p>
    </div>
  );
}
