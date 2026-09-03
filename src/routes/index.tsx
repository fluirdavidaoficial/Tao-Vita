import { createFileRoute, Link } from "@tanstack/react-router";
import { BookOpen, Ear, Hand, PawPrint, Scan } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({ component: Welcome });

const HIGHLIGHTS = [
  {
    t: "Atlas · diagnóstico",
    d: "361 pontos, ficha, língua e pulso.",
    icon: BookOpen,
  },
  {
    t: "Yamamoto",
    d: "Craniopuntura em fotos: frente, têmpora e nuca.",
    icon: Scan,
  },
  {
    t: "Auriculoterapia",
    d: "Pavilhão clicável, regiões e pontos da sessão.",
    icon: Ear,
  },
  {
    t: "Veterinária",
    d: "Cão, gato e cavalo em três ângulos.",
    icon: PawPrint,
  },
  {
    t: "Massagem e gatilho",
    d: "Mapa muscular, dor referida e vídeo do local.",
    icon: Hand,
  },
] as const;

function Welcome() {
  return (
    <div className="mx-auto flex min-h-dvh max-w-3xl flex-col px-4">
      <header className="shrink-0 pt-[max(1.25rem,env(safe-area-inset-top))]">
        <p className="text-xs uppercase tracking-widest text-muted">Atlas de estudo</p>
        <h1 className="font-display mt-1 text-[clamp(2.75rem,14vw,4.5rem)] font-semibold leading-[0.9] tracking-tight">
          Tao Vita
        </h1>
        <p className="mt-3 text-base text-muted">
          Acupuntura para estudar no aparelho: corpo, crânio, orelha e animal. O app não examina.
        </p>
      </header>

      <ul className="mt-5 flex min-h-0 flex-1 flex-col gap-2">
        {HIGHLIGHTS.map((h) => (
          <li
            key={h.t}
            className="surface-card flex min-h-16 flex-1 items-center gap-3 px-4 py-3"
          >
            <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-bg text-primary">
              <h.icon className="size-6" strokeWidth={1.5} />
            </span>
            <span className="min-w-0">
              <p className="font-display text-2xl leading-tight">{h.t}</p>
              <p className="mt-0.5 text-sm text-muted">{h.d}</p>
            </span>
          </li>
        ))}
      </ul>

      <div className="shrink-0 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-4">
        <Button asChild className="h-14 w-full text-base">
          <Link to="/inicio">Entrar</Link>
        </Button>
        <p className="mt-2 text-center text-xs text-subtle">
          Apoio ao estudo. Não substitui exame presencial.
        </p>
      </div>
    </div>
  );
}
