import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AppShell } from "@/components/layout/app-shell";
import { Button } from "@/components/ui/button";

type FichaSearch = {
  q?: string;
  s?: string;
  corpo?: string;
  ear?: string;
  yn?: string;
  caut?: string;
};

export const Route = createFileRoute("/ficha")({
  validateSearch: (s: Record<string, unknown>): FichaSearch => ({
    q: typeof s.q === "string" ? s.q : undefined,
    s: typeof s.s === "string" ? s.s : undefined,
    corpo: typeof s.corpo === "string" ? s.corpo : undefined,
    ear: typeof s.ear === "string" ? s.ear : undefined,
    yn: typeof s.yn === "string" ? s.yn : undefined,
    caut: typeof s.caut === "string" ? s.caut : undefined,
  }),
  component: FichaPage,
});

function FichaPage() {
  const search = Route.useSearch();
  const [text, setText] = useState("");

  useEffect(() => {
    if (!search.q) return;
    const today = new Date().toLocaleDateString("pt-BR");
    const next = `TAO VITA — ficha de sessão
Data: ${today}
Queixa: ${search.q}
Síndrome mais compatível (dados informados): ${search.s ?? "—"}
Corpo: ${search.corpo ?? "—"}
Orelha: ${search.ear ?? "—"}
YNSA: ${search.yn ?? "—"}
Cautelas: ${search.caut ?? "—"}
Orientação: hidratação, evitar frio local se Bi-frio, retorno conforme evolução.
Apoio educacional — não substitui avaliação presencial.`;
    setText(next);
    localStorage.setItem("tv-ficha", next);
  }, [search]);

  useEffect(() => {
    if (!search.q) {
      setText(localStorage.getItem("tv-ficha") ?? "");
    }
  }, [search.q]);

  return (
    <AppShell>
      <h1 className="font-display text-3xl">Ficha da sessão</h1>
      <p className="mt-1 text-sm text-muted">Copie para WhatsApp. Fica só neste aparelho.</p>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={14}
        className="mt-4 w-full rounded-xl border border-border bg-surface p-3 text-sm"
        placeholder="Gere pela Consulta…"
      />
      <Button
        className="mt-3 w-full"
        onClick={() => {
          void navigator.clipboard.writeText(text);
        }}
      >
        Copiar
      </Button>
    </AppShell>
  );
}
