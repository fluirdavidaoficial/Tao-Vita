import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({ component: Welcome });

const HIGHLIGHTS = [
  { t: "Atlas · diagnóstico", d: "361 pontos com localização e para que servem. Ficha, língua e pulso." },
  { t: "Yamamoto", d: "Craniopuntura em fotos: frente, têmpora e nuca." },
  { t: "Auriculoterapia", d: "Pavilhão clicável, regiões e NADA de estudo." },
  { t: "Veterinária", d: "Cão, gato e cavalo em três ângulos." },
  { t: "Massagem e gatilho", d: "Seção aberta — entra no próximo ciclo." },
] as const;

function Welcome() {
  return (
    <div className="mx-auto flex min-h-dvh max-w-3xl flex-col px-5">
      <div className="flex-1 pt-[max(3.5rem,env(safe-area-inset-top))]">
        <p className="text-xs uppercase tracking-widest text-muted">Atlas de estudo</p>
        <h1 className="font-display mt-2 text-5xl font-semibold leading-none tracking-tight">Tao Vita</h1>
        <p className="mt-4 max-w-prose text-sm text-muted">
          Acupuntura para estudar no aparelho: corpo, crânio, orelha e animal. O app não examina.
        </p>
        <ul className="stagger-list mt-8 space-y-3">
          {HIGHLIGHTS.map((h) => (
            <li key={h.t} className="surface-card px-4 py-3">
              <p className="font-medium">{h.t}</p>
              <p className="text-sm text-muted">{h.d}</p>
            </li>
          ))}
        </ul>
      </div>
      <div className="pb-[max(1.75rem,env(safe-area-inset-bottom))] pt-8">
        <Button asChild className="w-full">
          <Link to="/inicio">Entrar</Link>
        </Button>
        <p className="mt-3 text-center text-xs text-subtle">Apoio ao estudo. Não substitui exame presencial.</p>
      </div>
    </div>
  );
}
