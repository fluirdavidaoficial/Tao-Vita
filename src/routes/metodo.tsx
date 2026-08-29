import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/metodo")({ component: MetodoPage });

function MetodoPage() {
  return (
    <>
      <h1 className="font-display text-3xl">Método</h1>
      <p className="mt-3">
        O Tao Vita cobre atlas dos 14 canais, protocolos ramificados, orelha e YNSA clicáveis, língua, pulso
        e os oito vasos extraordinários.
      </p>
      <h2 className="mt-6 font-display text-xl">O que não cobre</h2>
      <p className="text-sm text-muted">
        Diagnóstico médico, prescrição, emergência, agenda, prontuário em nuvem. YNSA não é exame automático.
      </p>
      <h2 className="mt-6 font-display text-xl">Revisão</h2>
      <p className="text-sm text-muted">
        Nomenclatura WHO. Os PDFs enviados não estão nesta pasta agora — quando voltarem, cruzamos ponto a
        ponto. Onde a fonte não está fechada: a revisar.
      </p>
      <p className="mt-4 text-sm text-primary">
        Não usa as palavras cura, garante ou diagnóstico automático.
      </p>
      <h2 className="mt-6 font-display text-xl">Documentos</h2>
      <p className="text-sm text-muted">Documentação, homologação e prints para download.</p>
      <Button asChild className="mt-3 w-full">
        <Link to="/documentos">Abrir downloads</Link>
      </Button>
    </>
  );
}
