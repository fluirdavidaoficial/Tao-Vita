import { createFileRoute, Link } from "@tanstack/react-router";
import { Loader2, Stethoscope } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { PointLink } from "@/components/atlas/point-link";
import { BackLink } from "@/components/ui/back-link";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { rankSyndromes, FATORES } from "@/lib/consulta/engine";
import { protocols, type ProtocolSyndrome } from "@/lib/tcm/protocols";
import { cn } from "@/lib/utils";


export const Route = createFileRoute("/consulta")({ component: ConsultaPage });

function ConsultaPage() {
  const [slug, setSlug] = useState(protocols[0]?.slug ?? "lombalgia");
  const [lingua, setLingua] = useState("");
  const [saburra, setSaburra] = useState("");
  const [pulso, setPulso] = useState("");
  const [fatores, setFatores] = useState<string[]>([]);
  const [ranked, setRanked] = useState<{ s: ProtocolSyndrome; pct: number }[] | null>(null);
  const [phase, setPhase] = useState<"idle" | "loading" | "done">("idle");
  const protocol = protocols.find((p) => p.slug === slug);
  const resultsRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<number>(0);

  useEffect(() => {
    if (phase !== "done") return;
    resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [phase]);

  useEffect(() => () => window.clearTimeout(timerRef.current), []);

  function run() {
    if (!protocol) return;
    setPhase("loading");
    setRanked(null);
    window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => {
      setRanked(rankSyndromes(protocol, { lingua, saburra, pulso, fatores }));
      setPhase("done");
    }, 380);
  }

  function toggle(f: string) {
    setFatores((prev) => (prev.includes(f) ? prev.filter((x) => x !== f) : [...prev, f]));
  }

  function resetReading() {
    setLingua("");
    setSaburra("");
    setPulso("");
    setFatores([]);
    setRanked(null);
    setPhase("idle");
  }

  return (
    <>
      <BackLink to="/atlas" label="Atlas" />
      <h1 className="font-display text-3xl">Consulta</h1>
      <p className="mt-1 text-sm text-muted">
        Síndrome mais compatível com os dados informados. O app não examina — cruze com língua e pulso.
      </p>
      <Link to="/diagnostico" className="mt-2 inline-flex text-sm text-primary">
        Como olhar a língua e tomar o pulso
      </Link>

      <label className="mt-4 block text-xs uppercase tracking-widest text-muted" htmlFor="queixa">
        Queixa
      </label>
      <select
        id="queixa"
        value={slug}
        onChange={(e) => {
          setSlug(e.target.value);
          setRanked(null);
          setPhase("idle");
        }}
        className="field select-field mt-1"
      >
        {protocols.map((p) => (
          <option key={p.slug} value={p.slug}>
            {p.t}
          </option>
        ))}
      </select>

      <label className="mt-3 block text-xs uppercase tracking-widest text-muted" htmlFor="lingua">
        Língua
      </label>
      <select
        id="lingua"
        value={lingua}
        onChange={(e) => setLingua(e.target.value)}
        className="field select-field mt-1"
      >
        <option value="">Não informado</option>
        <option value="pálida">Pálida</option>
        <option value="vermelha">Vermelha</option>
        <option value="arroxe">Arroxeada</option>
        <option value="normal">Rosada</option>
      </select>

      <label className="mt-3 block text-xs uppercase tracking-widest text-muted" htmlFor="saburra">
        Saburra
      </label>
      <select
        id="saburra"
        value={saburra}
        onChange={(e) => setSaburra(e.target.value)}
        className="field select-field mt-1"
      >
        <option value="">Não informado</option>
        <option value="branca">Branca fina</option>
        <option value="gordurosa">Gordurosa</option>
        <option value="amarela">Amarela</option>
        <option value="ausente">Ausente / espelho</option>
      </select>

      <label className="mt-3 block text-xs uppercase tracking-widest text-muted" htmlFor="pulso">
        Pulso
      </label>
      <select
        id="pulso"
        value={pulso}
        onChange={(e) => setPulso(e.target.value)}
        className="field select-field mt-1"
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
            key={f.id}
            type="button"
            onClick={() => toggle(f.id)}
            className={cn("chip", fatores.includes(f.id) ? "bg-primary text-primary-fg" : "bg-border text-fg")}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="mt-4 flex gap-2">
        <Button className="flex-1" onClick={run} disabled={phase === "loading" || !protocol}>
          {phase === "loading" ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              Diferenciando…
            </>
          ) : (
            "Diferenciar"
          )}
        </Button>
        {phase !== "idle" ? (
          <Button variant="outline" onClick={resetReading} disabled={phase === "loading"}>
            Limpar
          </Button>
        ) : null}
      </div>

      {phase === "idle" ? (
        <div className="mt-6 flex items-start gap-3 rounded-2xl bg-surface px-4 py-4 shadow-[var(--shadow-border)]">
          <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-bg text-primary">
            <Stethoscope className="size-5" strokeWidth={1.5} />
          </span>
          <p className="pt-2 text-sm text-muted">
            Informe língua, pulso e fatores — ou só a queixa — e toque em Diferenciar.
          </p>
        </div>
      ) : null}

      {phase === "loading" ? (
        <div className="mt-6 space-y-3" aria-busy="true" aria-live="polite">
          <span className="sr-only">Diferenciando síndromes</span>
          {[0, 1, 2].map((i) => (
            <div key={i} className="surface-card space-y-2 p-4">
              <Skeleton className="h-8 w-16" />
              <Skeleton className="h-5 w-48 max-w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          ))}
        </div>
      ) : null}

      {phase === "done" && ranked && protocol ? (
        <div ref={resultsRef} className="stagger-list mt-6 scroll-mt-28 space-y-3" aria-live="polite">
          {ranked.slice(0, 3).map((r, i) => (
            <article key={r.s.nome} className="surface-card p-4">
              <p className="font-display text-3xl tabular-nums text-primary">{r.pct}%</p>
              <h2 className="font-display text-xl">{r.s.nome}</h2>
              <p className="text-sm text-muted">Por quê: {r.s.mec}</p>
              {i === 0 ? (
                <>
                  <p className="mt-2 text-xs uppercase tracking-widest text-muted">Perguntas que faltam</p>
                  <p className="text-sm">{r.s.qs.slice(0, 3).join(" · ")}</p>
                  <p className="mt-2 text-xs uppercase tracking-widest text-muted">Pontos</p>
                  <div className="mt-1 flex flex-wrap gap-2">
                    {r.s.corpo.map((c) => (
                      <PointLink key={c[0]} code={c[0]} />
                    ))}
                    {r.s.ear.map((e) => (
                      <PointLink key={e} code={e} hint="ear" />
                    ))}
                    {r.s.yn.map((y) => (
                      <PointLink key={y} code={y} hint="ynsa" />
                    ))}
                  </div>

                  <p className="mt-2 text-sm text-primary">{r.s.caut}</p>
                  <Button asChild className="mt-3 w-full">
                    <Link to="/protocolo/$slug" params={{ slug: protocol.slug }}>
                      Abrir protocolo completo
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="mt-2 w-full">
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
                    >
                      Gerar ficha da sessão
                    </Link>
                  </Button>
                </>
              ) : null}
            </article>
          ))}
        </div>
      ) : null}
    </>
  );
}
