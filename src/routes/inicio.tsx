import { createFileRoute, Link } from "@tanstack/react-router";
import { BookOpen, ChevronRight, Ear, Hand, PawPrint, Scan } from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/inicio")({ component: Inicio });

function Inicio() {
  return (
    <>
      <p className="text-xs uppercase tracking-widest text-muted">Menu</p>
      <h1 className="font-display text-3xl">O que você quer estudar</h1>
      <p className="mt-1 text-sm text-muted">Um caminho por vez. Tudo volta aqui.</p>

      <nav className="stagger-list mt-6 space-y-2">
        <MenuRow
          to="/atlas"
          icon={BookOpen}
          title="Atlas · diagnóstico"
          d="Pontos, ficha do paciente, língua e pulso."
        />
        <MenuRow
          to="/ynsa"
          icon={Scan}
          title="Yamamoto"
          d="Craniopuntura. Frente, lateral e nuca."
          search
        />
        <MenuRow
          to="/orelha"
          icon={Ear}
          title="Auriculoterapia"
          d="Pavilhão, regiões e pontos da sessão."
          search
        />
        <MenuRow
          to="/vet"
          icon={PawPrint}
          title="Veterinária"
          d="Cão, gato e cavalo · três ângulos."
          search
        />
        <MenuRow
          to="/massagem"
          icon={Hand}
          title="Massagem e pontos-gatilho"
          d="Em aberto — ainda sem mapa."
          soon
        />
      </nav>

      <p className="mt-8 flex gap-4 text-sm text-muted">
        <Link to="/metodo" className="underline-offset-2 hover:text-fg hover:underline">
          Método
        </Link>
        <Link to="/documentos" className="underline-offset-2 hover:text-fg hover:underline">
          Documentos
        </Link>
      </p>
    </>
  );
}

function MenuRow({
  to,
  icon: Icon,
  title,
  d,
  soon,
  search,
}: {
  to: "/atlas" | "/ynsa" | "/orelha" | "/vet" | "/massagem";
  icon: typeof BookOpen;
  title: string;
  d: string;
  soon?: boolean;
  search?: boolean;
}) {
  return (
    <Link
      to={to}
      search={search ? { p: undefined } : undefined}
      className={cn(
        "flex min-h-20 items-center gap-4 rounded-2xl bg-surface px-4 py-3 shadow-[var(--shadow-border)]",
        "transition-[transform,box-shadow] duration-150 ease-out",
        "hover:shadow-[var(--shadow-border-hover)] active:scale-[0.99]",
      )}
    >
      <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-bg text-primary">
        <Icon className="size-5" strokeWidth={1.5} />
      </span>
      <span className="min-w-0 flex-1">
        <span className="flex items-center gap-2">
          <span className="font-display text-xl leading-tight">{title}</span>
          {soon ? <span className="text-xs text-subtle">em breve</span> : null}
        </span>
        <span className="mt-0.5 block text-sm text-muted">{d}</span>
      </span>
      <ChevronRight className="size-4 shrink-0 text-subtle" strokeWidth={1.75} />
    </Link>
  );
}
