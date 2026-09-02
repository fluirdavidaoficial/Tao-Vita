import { createFileRoute, Link } from "@tanstack/react-router";
import { MapPin } from "lucide-react";
import { PointLink } from "@/components/atlas/point-link";
import { AtlasImage } from "@/components/ui/atlas-image";
import { BackLink } from "@/components/ui/back-link";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { getMeridian } from "@/lib/acupuncture/meridians";
import { getPoint } from "@/lib/acupuncture/points";
import { protocols } from "@/lib/tcm/protocols";
import { getVetRow } from "@/lib/tcm/vet";

export const Route = createFileRoute("/ponto/$code")({ component: PontoPage });

function PontoPage() {
  const { code } = Route.useParams();
  const p = getPoint(code);
  if (!p) {
    return (
      <EmptyState
        icon={MapPin}
        title="Ponto não encontrado"
        description="Esse código não está no atlas de 361 pontos nem nos extras."
        action={
          <Button asChild>
            <Link to="/atlas">Ir ao atlas</Link>
          </Button>
        }
      />
    );
  }
  const m = p.extra ? undefined : getMeridian(p.meridianId);
  const used = protocols.filter((pr) =>
    pr.ss.some(
      (s) =>
        s.corpo.some((c) => c[0] === p.code) ||
        s.ex.some((e) => e.toLowerCase().includes(p.code.toLowerCase())),
    ),
  );
  const vet = getVetRow(p.code);

  return (
    <>
      {m ? (
        <BackLink to="/meridiano/$id" params={{ id: m.id }} label={m.namePt} />
      ) : (
        <BackLink to="/atlas" label="Atlas" />
      )}
      <p className="text-xs uppercase tracking-widest text-muted">
        {m?.namePt ?? "Ponto extra"} · {p.who}
        {p.cat ? ` · ${p.cat}` : ""}
      </p>
      <h1 className="font-display text-3xl">
        {p.code} · {p.pinyin}
      </h1>

      {p.photo ? (
        <figure className="mt-4 overflow-hidden rounded-2xl bg-surface shadow-[var(--shadow-border)]">
          <AtlasImage
            src={p.photo}
            alt={`${p.code} ${p.pinyin}`}
            className="aspect-[4/3] w-full"
            imgClassName="object-cover"
          />
          <figcaption className="px-4 py-3 text-sm text-muted">
            Close-up do atlas (padrão chinês / WHO).
          </figcaption>
        </figure>
      ) : (
        <div className="surface-card mt-4 p-4">
          <p className="text-sm text-muted">Ponto extra — sem foto de canal. Leia a localização.</p>
        </div>
      )}

      {p.loc ? (
        <article className="surface-card mt-4 p-4">
          <p className="text-xs uppercase tracking-widest text-muted">Localização</p>
          <p className="mt-1 text-sm">{p.loc}</p>
        </article>
      ) : null}

      {p.use ? (
        <article className="surface-card mt-3 p-4">
          <p className="text-xs uppercase tracking-widest text-muted">Para que serve</p>
          <p className="mt-1 text-sm">{p.use}</p>
        </article>
      ) : null}

      {p.caut ? <p className="mt-3 text-sm text-primary">{p.caut}</p> : null}

      {vet ? (
        <Link to="/vet" search={{ p: vet.id, v: vet.view }} className="chip mt-4 bg-ok text-primary-fg">
          Ver no mapa veterinário
        </Link>
      ) : null}

      {used.length > 0 ? (
        <>
          <h2 className="mt-6 font-display text-xl">Protocolos que usam este ponto</h2>
          <div className="mt-2 flex flex-wrap gap-2">
            {used.map((pr) => (
              <Link
                key={pr.slug}
                to="/protocolo/$slug"
                params={{ slug: pr.slug }}
                className="chip bg-fg text-sm text-primary-fg"
              >
                {pr.t}
              </Link>
            ))}
          </div>
        </>
      ) : (
        <p className="mt-6 text-sm text-muted">Nenhum protocolo do atlas cita este ponto ainda.</p>
      )}

      <p className="mt-6 text-xs text-muted">Outro ponto: toque no código em qualquer tela.</p>
      <div className="mt-2 flex flex-wrap gap-2">
        {["IG4", "E36", "BP6", "F3", "C7", "VG20"].map((c) => (
          <PointLink key={c} code={c} />
        ))}
      </div>
    </>
  );
}
