import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/app-shell";
import { getMeridian } from "@/lib/acupuncture/meridians";
import { getPoint } from "@/lib/acupuncture/points";
import { getSheet } from "@/lib/acupuncture/sheets";
import { protocols } from "@/lib/tcm/protocols";

export const Route = createFileRoute("/ponto/$code")({ component: PontoPage });

function PontoPage() {
  const { code } = Route.useParams();
  const p = getPoint(code);
  if (!p) {
    return (
      <AppShell>
        <p>Ponto não encontrado.</p>
      </AppShell>
    );
  }
  const m = getMeridian(p.meridianId);
  const sh = getSheet(p.code);
  const used = protocols.filter((pr) => pr.ss.some((s) => s.corpo.some((c) => c[0] === p.code)));
  return (
    <AppShell>
      <p className="text-xs uppercase tracking-widest text-muted">
        {m?.namePt} · {p.who}
        {sh?.cat ? ` · ${sh.cat}` : ""}
      </p>
      <h1 className="font-display text-3xl">
        {p.code} · {sh?.pinyin ?? p.pinyin}
      </h1>
      {sh && <p className="text-muted">{sh.namePt}</p>}
      <figure className="mt-4 overflow-hidden rounded-xl border border-border bg-surface">
        <img src={p.photo} alt={`${p.code} ${sh?.pinyin ?? p.pinyin}`} className="atlas-plate w-full" />
      </figure>
      {sh && (
        <section className="mt-4 space-y-3 rounded-xl border border-border bg-surface p-4">
          <div>
            <h2 className="text-xs uppercase tracking-widest text-muted">Localização</h2>
            <p>{sh.loc}</p>
          </div>
          <div>
            <h2 className="text-xs uppercase tracking-widest text-muted">Para que serve</h2>
            <p>{sh.para}</p>
          </div>
          <div>
            <h2 className="text-xs uppercase tracking-widest text-muted">Indicações</h2>
            <p>{sh.ind}</p>
          </div>
          {sh.caut && (
            <p className="text-sm text-primary">
              Cautela: {sh.caut}
            </p>
          )}
        </section>
      )}
      {m && (
        <Link to="/meridiano/$id" params={{ id: m.id }} className="mt-3 inline-block text-sm text-primary">
          Ver canal {m.namePt}
        </Link>
      )}
      {used.length > 0 && (
        <>
          <h2 className="mt-6 font-display text-xl">Protocolos</h2>
          <div className="mt-2 flex flex-wrap gap-2">
            {used.map((pr) => (
              <Link
                key={pr.slug}
                to="/protocolo/$slug"
                params={{ slug: pr.slug }}
                className="rounded-full bg-fg px-3 py-1 text-sm text-primary-fg"
              >
                {pr.t}
              </Link>
            ))}
          </div>
        </>
      )}
      <div className="mt-6 rounded-xl border border-dashed border-border p-4 text-sm text-muted">
        Área reservada para vídeo da localização e da punção.
      </div>
    </AppShell>
  );
}
