import { Check, Download, FileText, Loader2, Printer, UserRound } from "lucide-react";
import { useEffect, useState } from "react";
import { PointLink } from "@/components/atlas/point-link";
import { Button } from "@/components/ui/button";
import { FATORES, rankSyndromes } from "@/lib/consulta/engine";
import { downloadSessionPdf, printSession } from "@/lib/session/pdf";
import { buildSheet, loadPatientName, saveSheet } from "@/lib/session/sheet";
import type { Protocol } from "@/lib/tcm/protocols";
import { cn } from "@/lib/utils";

type Props = {
  protocol: Protocol;
  selected: number;
  onSelect: (index: number) => void;
};

export function SessionCard({ protocol, selected, onSelect }: Props) {
  const [patient, setPatient] = useState("");
  const [queixa, setQueixa] = useState(protocol.t);
  const [notes, setNotes] = useState("");
  const [lingua, setLingua] = useState("");
  const [saburra, setSaburra] = useState("");
  const [pulso, setPulso] = useState("");
  const [fatores, setFatores] = useState<string[]>([]);
  const [pct, setPct] = useState<number | undefined>();
  const [phase, setPhase] = useState<"idle" | "loading" | "done">("idle");
  const [saved, setSaved] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setPatient(loadPatientName());
    setQueixa(protocol.t);
    setNotes("");
    setLingua("");
    setSaburra("");
    setPulso("");
    setFatores([]);
    setPct(undefined);
    setPhase("idle");
    setSaved(false);
    setReady(true);
  }, [protocol.slug, protocol.t]);

  const syndrome = protocol.ss[selected] ?? protocol.ss[0];
  const canExport = patient.trim().length > 0 && Boolean(syndrome);

  function toggle(id: string) {
    setFatores((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
    setPct(undefined);
  }

  function sheet() {
    return buildSheet({
      patient,
      queixa,
      protocol,
      syndrome,
      lingua,
      saburra,
      pulso,
      fatores: fatores.map((id) => FATORES.find((f) => f.id === id)?.label ?? id),
      notes,
      pct,
    });
  }

  function differentiate() {
    setPhase("loading");
    window.setTimeout(() => {
      const ranked = rankSyndromes(protocol, { lingua, saburra, pulso, fatores });
      const top = ranked[0];
      if (top) {
        const idx = protocol.ss.findIndex((s) => s.nome === top.s.nome);
        onSelect(idx >= 0 ? idx : 0);
        setPct(top.pct);
      }
      setPhase("done");
    }, 320);
  }

  function persist() {
    const next = sheet();
    saveSheet(next);
    setSaved(true);
    window.setTimeout(() => setSaved(false), 1800);
    return next;
  }

  function exportPdf() {
    if (!canExport) return;
    downloadSessionPdf(persist());
  }

  function doPrint() {
    if (!canExport) return;
    printSession(persist());
  }

  if (!ready) return null;

  return (
    <section id="sessao" className="surface-card mt-6 scroll-mt-28 p-4">
      <div className="flex items-start gap-3">
        <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-bg text-primary">
          <UserRound className="size-5" strokeWidth={1.5} />
        </span>
        <div>
          <h2 className="font-display text-2xl leading-tight">Ficha da sessão</h2>
          <p className="mt-1 text-sm text-muted">
            Nome, queixa e síndrome deste protocolo. Exporta em PDF — fica só neste aparelho.
          </p>
        </div>
      </div>

      <label className="mt-4 block text-xs uppercase tracking-widest text-muted" htmlFor="paciente">
        Paciente
      </label>
      <input
        id="paciente"
        value={patient}
        onChange={(e) => setPatient(e.target.value)}
        className="field mt-1"
        autoComplete="name"
        placeholder="Nome completo"
      />

      <label className="mt-3 block text-xs uppercase tracking-widest text-muted" htmlFor="queixa-sessao">
        Queixa
      </label>
      <input
        id="queixa-sessao"
        value={queixa}
        onChange={(e) => setQueixa(e.target.value)}
        className="field mt-1"
        placeholder={protocol.t}
      />

      <p className="mt-4 text-xs uppercase tracking-widest text-muted">Síndrome desta ficha</p>
      <div className="mt-2 flex flex-col gap-2">
        {protocol.ss.map((s, i) => (
          <button
            key={s.nome}
            type="button"
            onClick={() => {
              onSelect(i);
              setPct(undefined);
            }}
            className={cn(
              "rounded-xl px-3 py-3 text-left transition-colors duration-150",
              i === selected ? "bg-primary text-primary-fg" : "bg-bg text-fg",
            )}
          >
            <span className="text-sm font-medium">{s.nome}</span>
            <span className={cn("mt-0.5 block text-xs", i === selected ? "text-primary-fg/80" : "text-muted")}>
              {s.mec}
            </span>
          </button>
        ))}
      </div>

      <p className="mt-4 text-xs uppercase tracking-widest text-muted">Diferenciar (opcional)</p>
      <p className="mt-1 text-sm text-muted">
        Língua, pulso e fatores usam o mesmo motor da Consulta — o app não examina.
      </p>

      <label className="mt-3 block text-xs uppercase tracking-widest text-muted" htmlFor="lingua-sessao">
        Língua
      </label>
      <select id="lingua-sessao" value={lingua} onChange={(e) => setLingua(e.target.value)} className="field select-field mt-1">
        <option value="">Não informado</option>
        <option value="pálida">Pálida</option>
        <option value="vermelha">Vermelha</option>
        <option value="arroxe">Arroxeada</option>
        <option value="normal">Rosada</option>
      </select>

      <label className="mt-3 block text-xs uppercase tracking-widest text-muted" htmlFor="saburra-sessao">
        Saburra
      </label>
      <select
        id="saburra-sessao"
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

      <label className="mt-3 block text-xs uppercase tracking-widest text-muted" htmlFor="pulso-sessao">
        Pulso
      </label>
      <select id="pulso-sessao" value={pulso} onChange={(e) => setPulso(e.target.value)} className="field select-field mt-1">
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

      <Button className="mt-3 w-full" variant="outline" onClick={differentiate} disabled={phase === "loading"}>
        {phase === "loading" ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            Diferenciando…
          </>
        ) : (
          "Diferenciar neste protocolo"
        )}
      </Button>
      {phase === "done" && pct != null ? (
        <p className="mt-2 text-sm text-ok">
          Mais compatível com os dados: {syndrome.nome} ({pct}%).
        </p>
      ) : null}

      <p className="mt-4 text-xs uppercase tracking-widest text-muted">Pontos desta ficha</p>
      <div className="mt-2 flex flex-wrap gap-2">
        {syndrome.corpo.map(([code]) => (
          <PointLink key={code} code={code} />
        ))}
        {syndrome.ear.map((e) => (
          <PointLink key={e} code={e} hint="ear" />
        ))}
        {syndrome.yn.map((y) => (
          <PointLink key={y} code={y} hint="ynsa" />
        ))}
        {syndrome.ex.filter(Boolean).map((e) => (
          <PointLink key={e} code={e.split(" ")[0]} />
        ))}
      </div>

      <label className="mt-4 block text-xs uppercase tracking-widest text-muted" htmlFor="notas-sessao">
        Notas da sessão
      </label>
      <textarea
        id="notas-sessao"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        rows={3}
        className="field mt-1 min-h-24 text-sm"
        placeholder="Observações, palpação, reação ao tratamento…"
      />

      {!patient.trim() ? (
        <p className="mt-3 text-sm text-primary">Informe o nome do paciente para exportar.</p>
      ) : null}

      <div className="mt-3 flex flex-col gap-2">
        <Button className="w-full" onClick={exportPdf} disabled={!canExport}>
          <Download className="size-4" />
          Exportar PDF
        </Button>
        <Button className="w-full" variant="outline" onClick={doPrint} disabled={!canExport}>
          <Printer className="size-4" />
          Imprimir
        </Button>
        <Button
          className="relative w-full"
          variant="outline"
          onClick={() => {
            if (!canExport) return;
            persist();
          }}
          disabled={!canExport}
        >
          <span
            className={cn(
              "absolute inset-0 flex items-center justify-center gap-2 transition-opacity duration-200",
              saved ? "opacity-100" : "opacity-0",
            )}
          >
            <Check className="size-4" />
            Salvo neste aparelho
          </span>
          <span className={cn("inline-flex items-center gap-2", saved && "opacity-0")}>
            <FileText className="size-4" />
            Salvar ficha
          </span>
        </Button>
      </div>
    </section>
  );
}
