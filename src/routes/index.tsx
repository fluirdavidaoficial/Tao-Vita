import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/app-shell";
import { fuMeridians, qiMeridians, zangMeridians } from "@/lib/acupuncture/meridians";
import { combos, protocols } from "@/lib/tcm/protocols";

export const Route = createFileRoute("/")({ component: Home });

const FREQ = ["lombalgia", "insonia", "ansiedade", "joelho", "enxaqueca", "dismenorreia", "gastrite", "ombro"];

function Home() {
  return (
    <AppShell>
      <section className="overflow-hidden rounded-xl border border-border bg-surface">
        <div className="bg-ink px-5 py-8 text-primary-fg">
          <p className="text-xs uppercase tracking-widest text-primary-fg/70">Atlas de acupuntura</p>
          <h1 className="font-display text-4xl font-semibold leading-none">Tao Vita</h1>
          <p className="mt-3 max-w-prose text-sm text-primary-fg/80">
            Queixa em 15 segundos: síndrome ramificada, corpo, orelha e YNSA. 361 pontos com foto.
          </p>
        </div>
        <div className="px-5 py-4">
          <p className="text-xs uppercase tracking-widest text-muted">Queixas mais usadas</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {FREQ.map((slug) => {
              const p = protocols.find((x) => x.slug === slug);
              if (!p) return null;
              return (
                <Link
                  key={slug}
                  to="/protocolo/$slug"
                  params={{ slug }}
                  className="rounded-full bg-fg px-3 py-2 text-sm text-primary-fg"
                >
                  {p.t}
                </Link>
              );
            })}
          </div>
          <Link
            to="/consulta"
            className="mt-4 flex min-h-11 items-center justify-center rounded-xl bg-primary text-sm font-medium text-primary-fg"
          >
            Abrir consulta
          </Link>
        </div>
      </section>

      <h2 className="mt-8 font-display text-2xl">Zang · órgãos</h2>
      <MeridianGrid items={zangMeridians} />
      <h2 className="mt-6 font-display text-2xl">Fu · vísceras</h2>
      <MeridianGrid items={fuMeridians} />
      <h2 className="mt-6 font-display text-2xl">Vasos</h2>
      <MeridianGrid items={qiMeridians} />

      <h2 className="mt-8 font-display text-2xl">Combinações</h2>
      <ul className="mt-2 space-y-2">
        {combos.map((c) => (
          <li key={c[0]} className="rounded-xl border border-border bg-surface px-4 py-3">
            <p className="font-medium">{c[0]}</p>
            <p className="text-sm text-muted">
              {c[1]} · {c[2]}
            </p>
          </li>
        ))}
      </ul>
    </AppShell>
  );
}

function MeridianGrid({
  items,
}: {
  items: { id: string; code: string; namePt: string; nameZh: string; count: number }[];
}) {
  return (
    <div className="mt-2 grid grid-cols-2 gap-2">
      {items.map((m) => (
        <Link
          key={m.id}
          to="/meridiano/$id"
          params={{ id: m.id }}
          className="rounded-xl border border-border bg-surface px-4 py-3"
        >
          <p className="text-xs text-primary">{m.code}</p>
          <p className="font-display text-lg leading-tight">{m.namePt}</p>
          <p className="text-xs text-subtle">
            {m.nameZh} · {m.count} pts
          </p>
        </Link>
      ))}
    </div>
  );
}
