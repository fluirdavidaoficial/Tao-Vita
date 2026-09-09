import { createFileRoute } from "@tanstack/react-router";
import { Download, FileText } from "lucide-react";
import { BackLink } from "@/components/ui/back-link";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/documentos")({ component: DocumentosPage });

function DocumentosPage() {
  return (
    <>
      <BackLink to="/inicio" label="Menu" />
      <h1 className="font-display text-3xl">Documentos</h1>
      <p className="mt-1 text-sm text-muted">
        Manual completo do que o app faz, com prints de cada tela. Galeria e homologação abrem no
        navegador.
      </p>

      <div className="surface-card mt-5 p-4">
        <div className="flex items-start gap-3">
          <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-bg text-primary">
            <FileText className="size-5" strokeWidth={1.5} />
          </span>
          <div className="min-w-0 flex-1">
            <h2 className="font-display text-xl leading-tight">Manual do produto · v2.1</h2>
            <p className="mt-1 text-sm text-muted">
              Cinco módulos, 38 protocolos, mapas clicáveis e capturas de 9/09/2026.
            </p>
            <Button asChild className="mt-3 w-full">
              <a href="/docs/Tao-Vita-documentacao.pdf" download="Tao-Vita-documentacao.pdf">
                <Download className="size-4" />
                Baixar PDF
              </a>
            </Button>
          </div>
        </div>
      </div>

      <h2 className="mt-8 font-display text-2xl">Abrir no navegador</h2>
      <ul className="mt-3 space-y-2 text-sm">
        <li>
          <a className="text-primary underline-offset-2 hover:underline" href="/docs/Tao-Vita-documentacao.html">
            Documentação completa (com prints)
          </a>
        </li>
        <li>
          <a className="text-primary underline-offset-2 hover:underline" href="/docs/Tao-Vita-galeria-telas.html">
            Galeria de telas
          </a>
        </li>
        <li>
          <a className="text-primary underline-offset-2 hover:underline" href="/docs/Tao-Vita-homologacao.html">
            Homologação
          </a>
        </li>
      </ul>
    </>
  );
}
