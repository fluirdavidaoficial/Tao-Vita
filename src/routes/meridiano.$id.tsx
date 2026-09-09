import { createFileRoute, Link } from "@tanstack/react-router";
import { MapPin } from "lucide-react";
import { AtlasImage } from "@/components/ui/atlas-image";
import { BackLink } from "@/components/ui/back-link";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { getMeridian } from "@/lib/acupuncture/meridians";
import { getPointsByMeridian } from "@/lib/acupuncture/points";

export const Route = createFileRoute("/meridiano/$id")({ component: MeridianPage });

function MeridianPage() {
  const { id } = Route.useParams();
  const m = getMeridian(id);
  const pts = getPointsByMeridian(id);
  if (!m) {
    return (
      <EmptyState
        icon={MapPin}
        titleAs="h1"
        title="Meridiano não encontrado"
        description="Esse canal não está no atlas. Volte à lista dos 14 meridianos."
        action={
          <Button asChild>
            <Link to="/atlas">Ir ao atlas</Link>
          </Button>
        }
      />
    );
  }
  return (
    <>
      <BackLink to="/atlas" label="Atlas" />
      <p className="text-xs uppercase tracking-widest text-muted">
        {m.who} · {m.element}
      </p>
      <h1 className="font-display text-3xl">{m.namePt}</h1>
      <p className="text-sm text-muted">
        {m.nameZh} · {m.count} pontos
      </p>
      {pts.length === 0 ? (
        <EmptyState
          icon={MapPin}
          title="Sem pontos neste canal"
          description="Ainda não há fotos cadastradas para este meridiano."
        />
      ) : (
        <ul className="mt-4 divide-y divide-border overflow-hidden rounded-2xl bg-surface shadow-[var(--shadow-border)]">
          {pts.map((p) => (
            <li key={p.code}>
              <Link
                to="/ponto/$code"
                params={{ code: p.code }}
                className="flex min-h-16 items-center gap-3 px-3 py-2 transition-colors duration-150 hover:bg-bg/60"
              >
                <AtlasImage src={p.photo ?? ""} alt="" className="size-14 shrink-0 rounded-lg" />
                <div>
                  <p className="font-medium">
                    {p.code} · {p.pinyin}
                  </p>
                  <p className="text-xs text-subtle">{p.who}{p.loc ? ` · ${p.loc}` : ""}</p>
                  {p.use ? <p className="text-xs text-muted">{p.use}</p> : null}
                </div>

              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
