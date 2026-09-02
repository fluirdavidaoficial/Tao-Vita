import { createFileRoute, Link } from "@tanstack/react-router";
import { BackLink } from "@/components/ui/back-link";
import { Button } from "@/components/ui/button";
import { SOURCES } from "@/lib/tcm/exame";

export const Route = createFileRoute("/metodo")({ component: MetodoPage });

function MetodoPage() {
  return (
    <>
      <BackLink to="/inicio" label="Menu" />
      <h1 className="font-display text-3xl">Método</h1>
      <p className="mt-3">
        O Tao Vita é atlas de estudo: 14 canais, 361 pontos com localização e uso, 38 protocolos
        ramificados, orelha e YNSA clicáveis, acupuntura veterinária, língua, pulso e os oito vasos
        extraordinários. Ranking da Consulta é determinístico — síndrome mais compatível com os dados
        informados. O app não examina.
      </p>

      <h2 className="mt-8 font-display text-2xl">Fontes de estudo</h2>
      <p className="mt-1 text-sm text-muted">
        Material original, em paráfrase. Não reproduz páginas de livro. Dietoterapia, moxa, atlas de
        corpo e transposição veterinária entram no produto; textos metafísicos ficam de fora.
      </p>
      <ul className="mt-3 space-y-2">
        {SOURCES.map((s) => (
          <li key={s.t} className="surface-card px-4 py-3">
            <p className="font-medium">{s.t}</p>
            <p className="text-sm text-muted">{s.d}</p>
          </li>
        ))}
      </ul>

      <h2 className="mt-8 font-display text-2xl">O que não cobre</h2>
      <p className="text-sm text-muted">
        Exame médico, prescrição, emergência, agenda, prontuário em nuvem. Palpação de pescoço, abdômen e
        Cun Kou é guia de estudo. Ficha de sessão fica só neste aparelho.
      </p>

      <h2 className="mt-8 font-display text-2xl">Revisão</h2>
      <p className="text-sm text-muted">
        Nomenclatura WHO nos 14 canais. Onde a fonte não está fechada, o protocolo marca{" "}
        <span className="text-fg">a revisar</span>. YNSA: A–C e S na frente, Ypsilon na têmpora, D–I na
        costeleta; J/K só no texto. Todo código de ponto no app abre a ficha.
      </p>

      <div className="mt-6 grid grid-cols-2 gap-2">
        <Link to="/diagnostico" className="link-card px-4 py-3">
          <p className="text-xs text-primary">Estudo</p>
          <p className="font-display text-lg leading-tight">Língua e pulso</p>
        </Link>
        <Link to="/ynsa" search={{}} className="link-card px-4 py-3">
          <p className="text-xs text-primary">Crânio</p>
          <p className="font-display text-lg leading-tight">Yamamoto</p>
        </Link>
        <Link to="/vet" search={{}} className="link-card px-4 py-3">
          <p className="text-xs text-primary">Animal</p>
          <p className="font-display text-lg leading-tight">Veterinária</p>
        </Link>
        <Link to="/orelha" search={{ p: undefined }} className="link-card px-4 py-3">
          <p className="text-xs text-primary">Pavilhão</p>
          <p className="font-display text-lg leading-tight">Auriculoterapia</p>
        </Link>
        <Link to="/consulta" className="link-card px-4 py-3">
          <p className="text-xs text-primary">Queixa</p>
          <p className="font-display text-lg leading-tight">Consulta</p>
        </Link>
      </div>

      <h2 className="mt-8 font-display text-2xl">Documentos</h2>
      <p className="text-sm text-muted">Documentação e homologação em HTML, mais o PDF curto do produto.</p>
      <Button asChild className="mt-3 w-full">
        <Link to="/documentos">Abrir downloads</Link>
      </Button>
    </>
  );
}
