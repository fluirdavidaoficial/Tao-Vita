import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, Clipboard, ClipboardCopy, FileText } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { Skeleton } from "@/components/ui/skeleton";
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

function buildFicha(search: FichaSearch) {
  const today = new Date().toLocaleDateString("pt-BR");
  return `TAO VITA — ficha de sessão
Data: ${today}
Queixa: ${search.q}
Síndrome mais compatível (dados informados): ${search.s ?? "—"}
Corpo: ${search.corpo ?? "—"}
Orelha: ${search.ear ?? "—"}
YNSA: ${search.yn ?? "—"}
Cautelas: ${search.caut ?? "—"}
Orientação: hidratação, evitar frio local se Bi-frio, retorno conforme evolução.
Apoio educacional — não substitui avaliação presencial.`;
}

function FichaPage() {
  const search = Route.useSearch();
  const [text, setText] = useState("");
  const [ready, setReady] = useState(false);
  const [copied, setCopied] = useState(false);
  const [manual, setManual] = useState(false);

  useEffect(() => {
    if (search.q) {
      const next = buildFicha(search);
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

  if (!ready) {
    return (
      <>
        <h1 className="font-display text-3xl">Ficha da sessão</h1>
        <p className="mt-1 text-sm text-muted">Copie para WhatsApp. Fica só neste aparelho.</p>
        <Skeleton className="mt-4 h-64 w-full rounded-xl" />
        <Skeleton className="mt-3 h-11 w-full rounded-xl" />
      </>
    );
  }

  return (
    <>
      <h1 className="font-display text-3xl">Ficha da sessão</h1>
      <p className="mt-1 text-sm text-muted">Copie para WhatsApp. Fica só neste aparelho.</p>

      {!showEditor ? (
        <EmptyState
          icon={FileText}
          title="Nenhuma ficha ainda"
          description="Gere pela Consulta a partir de uma queixa, ou escreva à mão neste aparelho."
          action={
            <div className="flex flex-col items-center gap-2 sm:flex-row">
              <Button asChild>
                <Link to="/consulta">Abrir consulta</Link>
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
            placeholder="Gere pela Consulta ou escreva a ficha aqui…"
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
        </>
      )}
    </>
  );
}
