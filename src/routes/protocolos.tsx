import { createFileRoute, Link } from "@tanstack/react-router";
import { Search, SearchX, X } from "lucide-react";
import { useMemo, useState } from "react";
import { BackLink } from "@/components/ui/back-link";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { protocols } from "@/lib/tcm/protocols";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/protocolos")({ component: Protocolos });

function Protocolos() {
  const [q, setQ] = useState("");
  const groups = useMemo(() => [...new Set(protocols.map((p) => p.g))], []);
  const list = protocols.filter((p) => {
    const blob = `${p.t} ${p.g} ${p.ss.map((s) => s.nome).join(" ")}`.toLowerCase();
    return !q || blob.includes(q.toLowerCase());
  });

  return (
    <>
      <BackLink to="/atlas" label="Atlas" />
      <h1 className="font-display text-3xl">Protocolos</h1>
      <p className="mt-1 text-sm text-muted">Queixa → síndromes ramificadas, não uma receita única.</p>
      <div className="relative mt-4">
        <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-subtle" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="lombalgia, joelho, Fogo do Coração…"
          className="field pr-12 pl-10"
          autoComplete="off"
          autoCorrect="off"
          spellCheck={false}
          aria-label="Buscar protocolos"
        />
        {q ? (
          <button
            type="button"
            onClick={() => setQ("")}
            className="absolute top-1/2 right-1 grid size-11 -translate-y-1/2 place-items-center rounded-xl text-muted transition-colors duration-150 hover:text-fg"
            aria-label="Limpar busca"
          >
            <X className="size-4" />
          </button>
        ) : null}
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {groups.map((g) => (
          <button
            key={g}
            type="button"
            onClick={() => setQ((prev) => (prev === g ? "" : g))}
            className={cn("chip text-xs uppercase tracking-wide", q === g ? "bg-primary text-primary-fg" : "bg-border text-muted")}
          >
            {g}
          </button>
        ))}
      </div>
      <p className="mt-4 text-xs tabular-nums text-subtle">
        {list.length} {list.length === 1 ? "protocolo" : "protocolos"}
      </p>
      {list.length === 0 ? (
        <EmptyState
          icon={SearchX}
          title="Nada encontrado"
          description={`Nenhum protocolo combina com “${q}”. Tente outra queixa ou limpe a busca.`}
          action={
            <Button variant="outline" onClick={() => setQ("")}>
              Limpar busca
            </Button>
          }
        />
      ) : (
        <ul className="mt-2 space-y-2">
          {list.map((p) => (
            <li key={p.slug}>
              <Link to="/protocolo/$slug" params={{ slug: p.slug }} className="link-card px-4 py-3">
                <p className="text-xs text-primary">{p.zh}</p>
                <p className="font-display text-xl leading-tight">{p.t}</p>
                <p className="text-sm text-muted">{p.ss.map((s) => s.nome).join(" · ")}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
