import { createFileRoute } from "@tanstack/react-router";
import { Download, FileArchive, FileText, Images } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/documentos")({ component: DocumentosPage });

const FILES = [
  {
    href: "/docs/Tao-Vita-pacote-completo.zip",
    name: "Pacote completo",
    file: "Tao-Vita-pacote-completo.zip",
    desc: "PDFs, HTML e os 26 prints das telas.",
    size: "31 MB",
    icon: FileArchive,
    primary: true,
  },
  {
    href: "/docs/Tao-Vita-documentacao.pdf",
    name: "Documentação do produto",
    file: "Tao-Vita-documentacao.pdf",
    desc: "Escopo, rotas, protocolos, arquitetura e limites.",
    size: "324 KB",
    icon: FileText,
    primary: false,
  },
  {
    href: "/docs/Tao-Vita-homologacao.pdf",
    name: "Documento de homologação",
    file: "Tao-Vita-homologacao.pdf",
    desc: "Critérios de aceite, casos de teste e evidências.",
    size: "11 MB",
    icon: FileText,
    primary: false,
  },
  {
    href: "/docs/Tao-Vita-galeria-telas.pdf",
    name: "Galeria de telas",
    file: "Tao-Vita-galeria-telas.pdf",
    desc: "Todas as capturas em sequência, desktop e telefone.",
    size: "11 MB",
    icon: Images,
    primary: false,
  },
] as const;

function DocumentosPage() {
  return (
    <>
      <h1 className="font-display text-3xl">Documentos</h1>
      <p className="mt-1 text-sm text-muted">
        Download direto da documentação, da homologação e dos prints da v1.1 (29/08/2026).
      </p>

      <ul className="mt-5 space-y-3">
        {FILES.map((f) => (
          <li key={f.href} className="surface-card p-4">
            <div className="flex items-start gap-3">
              <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-bg text-primary">
                <f.icon className="size-5" strokeWidth={1.5} />
              </span>
              <div className="min-w-0 flex-1">
                <h2 className="font-display text-xl leading-tight">{f.name}</h2>
                <p className="mt-1 text-sm text-muted">{f.desc}</p>
                <p className="mt-1 text-xs tabular-nums text-subtle">{f.size}</p>
                <Button asChild className="mt-3 w-full" variant={f.primary ? "primary" : "outline"}>
                  <a href={f.href} download={f.file}>
                    <Download className="size-4" />
                    Baixar
                  </a>
                </Button>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <h2 className="mt-8 font-display text-2xl">Abrir no navegador</h2>
      <p className="mt-1 text-sm text-muted">Versões HTML, sem baixar.</p>
      <ul className="mt-3 space-y-2 text-sm">
        <li>
          <a className="text-primary underline-offset-2 hover:underline" href="/docs/Tao-Vita-documentacao.html">
            Documentação
          </a>
        </li>
        <li>
          <a className="text-primary underline-offset-2 hover:underline" href="/docs/Tao-Vita-homologacao.html">
            Homologação
          </a>
        </li>
        <li>
          <a className="text-primary underline-offset-2 hover:underline" href="/docs/Tao-Vita-galeria-telas.html">
            Galeria de telas
          </a>
        </li>
      </ul>
    </>
  );
}
