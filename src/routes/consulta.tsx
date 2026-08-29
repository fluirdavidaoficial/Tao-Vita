import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "@/components/layout/app-shell";
import { Button } from "@/components/ui/button";
import { rankSyndromes } from "@/lib/consulta/engine";
import { protocols, type ProtocolSyndrome } from "@/lib/tcm/protocols";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/consulta")({ component: ConsultaPage });

const FATORES = ["frio", "umidade", "estresse", "ciclo", "sono"];

function ConsultaPage() {
  const [slug, setSlug] = useState(protocols[0]?.slug ?? "lombalgia");
  const [lingua, setLingua] = useState("");
  const [saburra, setSaburra] = useState("");
  const [pulso, setPulso] = useState("");
  const [fatores, setFatores] = useState<string[]>([]);
  const [ranked, setRanked] = useState<{ s: ProtocolSyndrome; pct: number }[] | null>(null);
  const protocol = protocols.find((p) => p.slug === slug);

  function run() {
    if (!protocol) return;
    setRanked(rankSyndromes(protocol, { lingua, saburra, pulso, fatores }));
  }

  function toggle(f: string) {
    setFatores((prev) => (prev.includes(f) ? prev.filter((x) => x !== f) : [...prev, f]));
  }

  return (
    <AppShell>
      <h1 className="font-display text-3xl">Consulta</h1>
      <p className="mt-1 text-sm text-muted">
        Síndrome mais compatível com os dados informados — não é diagnóstico automático.
      </p>

      <label className="mt-4 block text-xs uppercase tracking-widest text-muted">Queixa</label>
      <select
        value={slug}
        onChange={(e) => {
          setSlug(e.target.value);
          setRanked(null);
        }}
        className="mt-1 w-full rounded-xl border border-border bg-surface px-3 py-3"
      >
        {protocols.map((p) => (
          <option key={p.slug} value={p.slug}>
            {p.t}
          </option>
        ))}
      </select>

      <label className="mt-3 block text-xs uppercase tracking-widest text-muted">Língua</label>
      <select
        value={lingua}
        onChange={(e) => setLingua(e.target.value)}
        className="mt-1 w-full rounded-xl border border-border bg-surface px-3 py-3"
      >
        <option value="">Não informado</option>
        <option value="pálida">Pálida</option>
        <option value="vermelha">Vermelha</option>
        <option value="arroxe">Arroxeada</option>
        <option value="normal">Rosada</option>
      </select>

      <label className="mt-3 block text-xs uppercase tracking-widest text-muted">Saburra</label>
      <select
        value={saburra}
        onChange={(e) => setSaburra(e.target.value)}
        className="mt-1 w-full rounded-xl border border-border bg-surface px-3 py-3"
      >
        <option value="">Não informado</option>
        <option value="branca">Branca fina</option>
        <option value="gordurosa">Gordurosa</option>
        <option value="amarela">Amarela</option>
        <option value="ausente">Ausente / espelho</option>
      </select>

      <label className="mt-3 block text-xs uppercase tracking-widest text-muted">Pulso</label>
      <select
        value={pulso}
        onChange={(e) => setPulso(e.target.value)}
        className="mt-1 w-full rounded-xl border border-border bg-surface px-3 py-3"
      >
        <option value="">Não informado</option>
        <option value="corda">Corda</option>
        <option value="vazio">Vazio / fraco</option>
        <option value="escorregadio">Escorregadio</option>
        <option value="rápido">Rápido</option>
        <option value="fino">Fino</option>
        <option value="tenso">Tenso</option>
        <option value="profundo">Profundo</option>
      </select>

      <p className="mt-3 text-xs uppercase tracking-widest text-muted">Fatores</p>
      <div className="mt-2 flex flex-wrap gap-2">
        {FATORES.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => toggle(f)}
            className={cn(
              "rounded-full px-3 py-2 text-sm",
              fatores.includes(f) ? "bg-primary text-primary-fg" : "bg-border text-fg",
            )}
          >
            {f}
          </button>
        ))}
      </div>

      <Button className="mt-4 w-full" onClick={run}>
        Diferenciar
      </Button>

      {ranked && protocol && (
        <div className="mt-6 space-y-3">
          {ranked.slice(0, 3).map((r, i) => (
            <article key={r.s.nome} className="rounded-xl border border-border bg-surface p-4">
              <p className="font-display text-3xl text-primary">{r.pct}%</p>
              <h2 className="font-display text-xl">{r.s.nome}</h2>
              <p className="text-sm text-muted">Por quê: {r.s.mec}</p>
              {i === 0 && (
                <>
                  <p className="mt-2 text-xs uppercase tracking-widest text-muted">Perguntas que faltam</p>
                  <p className="text-sm">{r.s.qs.slice(0, 3).join(" · ")}</p>
                  <p className="mt-2 text-sm">
                    Corpo: {r.s.corpo.map((c) => c[0]).join(", ")} · Orelha: {r.s.ear.join(", ")} · YNSA:{" "}
                    {r.s.yn.join(", ")}
                  </p>
                  <p className="mt-2 text-sm text-primary">{r.s.caut}</p>
                  <Link
                    to="/protocolo/$slug"
                    params={{ slug: protocol.slug }}
                    className="mt-3 flex min-h-11 items-center justify-center rounded-xl bg-primary text-sm text-primary-fg"
                  >
                    Abrir protocolo completo
                  </Link>
                  <Link
                    to="/ficha"
                    search={{
                      q: protocol.t,
                      s: r.s.nome,
                      corpo: r.s.corpo.map((c) => c[0]).join(","),
                      ear: r.s.ear.join(","),
                      yn: r.s.yn.join(","),
                      caut: r.s.caut,
                    }}
                    className="mt-2 flex min-h-11 items-center justify-center rounded-xl border border-border text-sm"
                  >
                    Gerar ficha da sessão
                  </Link>
                </>
              )}
            </article>
          ))}
        </div>
      )}
    </AppShell>
  );
}
