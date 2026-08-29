import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/app-shell";
import { getMeridian } from "@/lib/acupuncture/meridians";
import { getPointsByMeridian } from "@/lib/acupuncture/points";
import { getSheet } from "@/lib/acupuncture/sheets";

export const Route = createFileRoute("/meridiano/$id")({ component: MeridianPage });

function MeridianPage() {
  const { id } = Route.useParams();
  const m = getMeridian(id);
  const pts = getPointsByMeridian(id);
  if (!m) {
    return (
      <AppShell>
        <p>Meridiano não encontrado.</p>
      </AppShell>
    );
  }
  return (
    <AppShell>
      <p className="text-xs uppercase tracking-widest text-muted">
        {m.who} · {m.element}
      </p>
      <h1 className="font-display text-3xl">{m.namePt}</h1>
      <p className="text-sm text-muted">
        {m.nameZh} · {m.count} pontos · toque no ponto para foto e função
      </p>
      <ul className="mt-4 divide-y divide-border overflow-hidden rounded-xl border border-border bg-surface">
        {pts.map((p) => {
          const sh = getSheet(p.code);
          return (
            <li key={p.code}>
              <Link to="/ponto/$code" params={{ code: p.code }} className="flex items-center gap-3 px-3 py-2">
                <img src={p.photo} alt="" className="size-14 rounded-lg object-cover" />
                <div className="min-w-0">
                  <p className="font-medium">
                    {p.code} · {sh?.pinyin ?? p.pinyin}
                  </p>
                  <p className="truncate text-xs text-muted">{sh?.para ?? sh?.namePt}</p>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </AppShell>
  );
}
