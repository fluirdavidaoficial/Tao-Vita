import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { AppShell } from "@/components/layout/app-shell";
import { protocols } from "@/lib/tcm/protocols";

export const Route = createFileRoute("/protocolos")({ component: Protocolos });

function Protocolos() {
  const [q, setQ] = useState("");
  const groups = useMemo(() => [...new Set(protocols.map((p) => p.g))], []);
  const list = protocols.filter((p) => {
    const blob = `${p.t} ${p.g} ${p.ss.map((s) => s.nome).join(" ")}`.toLowerCase();
    return !q || blob.includes(q.toLowerCase());
  });

  return (
    <AppShell>
      <h1 className="font-display text-3xl">Protocolos</h1>
      <p className="mt-1 text-sm text-muted">Queixa → 2 a 4 síndromes, não uma receita única.</p>
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="lombalgia, joelho, Fogo do Coração…"
        className="mt-4 w-full rounded-xl border border-border bg-surface px-4 py-3"
      />
      <div className="mt-3 flex flex-wrap gap-2">
        {groups.map((g) => (
          <button
            key={g}
            type="button"
            onClick={() => setQ(g)}
            className="rounded-full bg-border px-3 py-1 text-xs uppercase tracking-wide text-muted"
          >
            {g}
          </button>
        ))}
      </div>
      <ul className="mt-4 space-y-2">
        {list.map((p) => (
          <li key={p.slug}>
            <Link
              to="/protocolo/$slug"
              params={{ slug: p.slug }}
              className="block rounded-xl border border-border bg-surface px-4 py-3"
            >
              <p className="text-xs text-primary">{p.zh}</p>
              <p className="font-display text-xl leading-tight">{p.t}</p>
              <p className="text-sm text-muted">{p.ss.map((s) => s.nome).join(" · ")}</p>
            </Link>
          </li>
        ))}
      </ul>
    </AppShell>
  );
}
