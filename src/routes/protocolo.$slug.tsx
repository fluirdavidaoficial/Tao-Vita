import { createFileRoute, Link } from "@tanstack/react-router";
import { BookOpen } from "lucide-react";
import { BackLink } from "@/components/ui/back-link";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { getPoint } from "@/lib/acupuncture/points";
import { getProtocol } from "@/lib/tcm/protocols";

export const Route = createFileRoute("/protocolo/$slug")({ component: ProtocoloPage });

function ProtocoloPage() {
  const { slug } = Route.useParams();
  const p = getProtocol(slug);
  if (!p) {
    return (
      <EmptyState
        icon={BookOpen}
        title="Protocolo não encontrado"
        description="Essa queixa não está na lista. Abra os protocolos e escolha outra."
        action={
          <Button asChild>
            <Link to="/protocolos">Ver protocolos</Link>
          </Button>
        }
      />
    );
  }
  const top = p.ss[0];
  return (
    <>
      <BackLink to="/protocolos" label="Protocolos" />
      <p className="text-xs uppercase tracking-widest text-muted">{p.g}</p>
      <p className="text-primary">{p.zh}</p>
      <h1 className="font-display text-3xl">{p.t}</h1>
      <p className="mt-1 text-sm text-muted">
        Selo {top.selo} · {p.ss.length} síndromes
      </p>

      {p.ss.map((s, i) => (
        <section key={s.nome} className="surface-card mt-5 p-4">
          <h2 className="font-display text-xl">
            {i + 1}. {s.nome}
          </h2>
          <p className="mt-1 text-sm text-muted">{s.mec}</p>
          <h3 className="mt-3 text-xs uppercase tracking-widest text-muted">Língua · pulso</h3>
          <p className="text-sm">
            {s.lin} · {s.pul}
          </p>
          <h3 className="mt-3 text-xs uppercase tracking-widest text-muted">Perguntas</h3>
          <ul className="list-disc pl-4 text-sm">
            {s.qs.map((q) => (
              <li key={q}>{q}</li>
            ))}
          </ul>
          <h3 className="mt-3 text-xs uppercase tracking-widest text-muted">Corpo</h3>
          <div className="mt-1 flex flex-wrap gap-2">
            {s.corpo.map(([code, name, why]) => {
              const pt = getPoint(code);
              const inner = (
                <span className="inline-flex flex-col rounded-lg bg-fg px-3 py-2 text-primary-fg">
                  <span className="text-sm font-medium">
                    {code} {name}
                  </span>
                  <span className="text-xs text-primary-fg/70">{why}</span>
                </span>
              );
              return pt ? (
                <Link key={code} to="/ponto/$code" params={{ code: pt.code }}>
                  {inner}
                </Link>
              ) : (
                <span key={code}>{inner}</span>
              );
            })}
          </div>
          <h3 className="mt-3 text-xs uppercase tracking-widest text-muted">Orelha</h3>
          <p className="text-sm">{s.ear.join(" · ")}</p>
          <h3 className="mt-3 text-xs uppercase tracking-widest text-muted">YNSA</h3>
          <p className="text-sm">{s.yn.join(" · ")}</p>
          {s.ex.filter(Boolean).length > 0 ? (
            <>
              <h3 className="mt-3 text-xs uppercase tracking-widest text-muted">Extras</h3>
              <p className="text-sm">{s.ex.filter(Boolean).join(" · ")}</p>
            </>
          ) : null}
          <p className="mt-3 text-sm text-primary">{s.caut}</p>
          <p className="mt-1 text-xs text-ok">
            {s.tec} · Fontes: {s.fontes.join(", ")}
          </p>
        </section>
      ))}
    </>
  );
}
