import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, Clipboard, ClipboardCopy, Download, FileText, Printer } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { BackLink } from "@/components/ui/back-link";
import { EmptyState } from "@/components/ui/empty-state";
import { Skeleton } from "@/components/ui/skeleton";
import { downloadSessionPdf, printSession } from "@/lib/session/pdf";
import { loadPatientName, sheetToText, todayPt, type SessionSheet } from "@/lib/session/sheet";
import { cn } from "@/lib/utils";

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

function fromSearch(search: FichaSearch, patient: string): SessionSheet {
  return {
    patient: patient || "—",
    date: todayPt(),
    queixa: search.q ?? "—",
    syndrome: search.s ?? "—",
    corpo: search.corpo ?? "—",
    ear: search.ear ?? "—",
    yn: search.yn ?? "—",
    caut: search.caut ?? "—",
  };
}

function FichaPage() {
  const search = Route.useSearch();
  const [text, setText] = useState("");
  const [ready, setReady] = useState(false);
  const [copied, setCopied] = useState(false);
  const [manual, setManual] = useState(false);

  useEffect(() => {
    if (search.q) {
      const next = sheetToText(fromSearch(search, loadPatientName()));
      setText(next);
      localStorage.setItem("tv-ficha", next);
    } else {
      setText(localStorage.getItem("tv-ficha") ?? "");
    }
    setReady(true);
  }, [search]);

  const empty = !text.trim();
  const showEditor = !empty || manual || Boolean(search.q);

  async function copy() {
    if (empty) return;
    await navigator.clipboard.writeText(text);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  function asSheet(): SessionSheet {
    const lines = Object.fromEntries(
      text.split("\n").map((line) => {
        const i = line.indexOf(": ");
        if (i < 0) return [line, ""];
        return [line.slice(0, i), line.slice(i + 2)];
      }),
    );
    return {
      patient: lines.Paciente || loadPatientName() || "—",
      date: lines.Data || todayPt(),
      queixa: lines.Queixa || search.q || "—",
      syndrome: lines["Síndrome mais compatível (dados informados)"] || search.s || "—",
      corpo: lines.Corpo || search.corpo || "—",
      ear: lines.Orelha || search.ear || "—",
      yn: lines.YNSA || search.yn || "—",
      caut: lines.Cautelas || search.caut || "—",
      notes: lines.Notas,
    };
  }

  if (!ready) {
    return (
      <>
        <BackLink to="/atlas" label="Atlas" />
        <h1 className="font-display text-3xl">Ficha da sessão</h1>
        <p className="mt-1 text-sm text-muted">Copie ou exporte em PDF. Fica só neste aparelho.</p>
        <Skeleton className="mt-4 h-64 w-full rounded-xl" />
        <Skeleton className="mt-3 h-11 w-full rounded-xl" />
      </>
    );
  }

  return (
    <>
      <BackLink to="/atlas" label="Atlas" />
      <h1 className="font-display text-3xl">Ficha da sessão</h1>
      <p className="mt-1 text-sm text-muted">Copie, imprima ou baixe em PDF. Fica só neste aparelho.</p>

      {!showEditor ? (
        <EmptyState
          icon={FileText}
          title="Nenhuma ficha ainda"
          description="Gere pelo protocolo (nome do paciente + queixa) ou pela Consulta."
          action={
            <div className="flex flex-col items-center gap-2 sm:flex-row">
              <Button asChild>
                <Link to="/protocolos">Abrir protocolos</Link>
              </Button>
              <Button variant="outline" onClick={() => setManual(true)}>
                Escrever à mão
              </Button>
            </div>
          }
        />
      ) : (
        <>
          <textarea
            value={text}
            onChange={(e) => {
              setText(e.target.value);
              setCopied(false);
            }}
            rows={14}
            className="field mt-4 min-h-64 text-sm"
            placeholder="Gere pelo protocolo ou escreva a ficha aqui…"
          />
          <Button className="relative mt-3 w-full" onClick={() => void copy()} disabled={empty}>
            <span
              className={cn(
                "absolute inset-0 flex items-center justify-center gap-2 transition-[opacity,filter,transform] duration-300 ease-[cubic-bezier(0.2,0,0,1)]",
                copied ? "scale-100 opacity-100 blur-none" : "scale-[0.25] opacity-0 blur-[4px]",
              )}
            >
              <Check className="size-4" />
              Copiado
            </span>
            <span
              className={cn(
                "inline-flex items-center gap-2 transition-[opacity,filter,transform] duration-300 ease-[cubic-bezier(0.2,0,0,1)]",
                copied ? "scale-[0.25] opacity-0 blur-[4px]" : "scale-100 opacity-100 blur-none",
              )}
            >
              {empty ? <Clipboard className="size-4" /> : <ClipboardCopy className="size-4" />}
              Copiar ficha
            </span>
          </Button>
          <Button className="mt-2 w-full" variant="outline" onClick={() => downloadSessionPdf(asSheet())} disabled={empty}>
            <Download className="size-4" />
            Exportar PDF
          </Button>
          <Button className="mt-2 w-full" variant="outline" onClick={() => printSession(asSheet())} disabled={empty}>
            <Printer className="size-4" />
            Imprimir
          </Button>
        </>
      )}
    </>
  );
}
