import { createFileRoute, Link } from "@tanstack/react-router";
import { Clapperboard, MapPin } from "lucide-react";
import { AtlasImage } from "@/components/ui/atlas-image";
import { BackLink } from "@/components/ui/back-link";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { getMeridian } from "@/lib/acupuncture/meridians";
import { getPoint } from "@/lib/acupuncture/points";
import { protocols } from "@/lib/tcm/protocols";

export const Route = createFileRoute("/ponto/$code")({ component: PontoPage });

function PontoPage() {
  const { code } = Route.useParams();
  const p = getPoint(code);
  if (!p) {
    return (
      <EmptyState
        icon={MapPin}
        title="Ponto não encontrado"
        description="Esse código não está no atlas de 361 pontos."
        action={
          <Button asChild>
            <Link to="/">Ir ao atlas</Link>
          </Button>
        }
      />
    );
  }
  const m = getMeridian(p.meridianId);
  const used = protocols.filter((pr) => pr.ss.some((s) => s.corpo.some((c) => c[0] === p.code)));
  return (
    <>
      {m ? (
        <BackLink to="/meridiano/$id" params={{ id: m.id }} label={m.namePt} />
      ) : (
        <BackLink to="/" label="Atlas" />
      )}
      <p className="text-xs uppercase tracking-widest text-muted">
        {m?.namePt} · {p.who}
      </p>
      <h1 className="font-display text-3xl">
        {p.code} · {p.pinyin}
      </h1>
      <figure className="mt-4 overflow-hidden rounded-2xl bg-surface shadow-[var(--shadow-border)]">
        <AtlasImage
          src={p.photo}
          alt={`${p.code} ${p.pinyin}`}
          className="aspect-[4/3] w-full"
          imgClassName="object-cover"
        />
        <figcaption className="px-4 py-3 text-sm text-muted">
          Close-up do atlas (padrão chinês / WHO). Marcação visual a revisar ponto a ponto.
        </figcaption>
      </figure>
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
      <div className="mt-6 flex flex-col items-center rounded-2xl bg-surface px-6 py-8 text-center shadow-[var(--shadow-border)]">
        <div className="grid size-12 place-items-center rounded-xl bg-bg text-muted">
          <Clapperboard className="size-5" strokeWidth={1.5} />
        </div>
        <p className="mt-3 font-display text-xl">Vídeo de localização</p>
        <p className="mt-1 max-w-sm text-sm text-muted">
          Espaço reservado para um vídeo curto da punção e da referência anatômica.
        </p>
      </div>
    </>
  );
}
