import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { ClickableMap } from "@/components/atlas/clickable-map";
import { PointLink } from "@/components/atlas/point-link";
import { BackLink } from "@/components/ui/back-link";
import {
  getVetRow,
  VET_PLATES,
  VET_SPECIES,
  VET_VIEWS,
  vetMap,
  type VetSpecies,
  type VetView,
} from "@/lib/tcm/vet";
import { cn } from "@/lib/utils";

type Search = { sp?: VetSpecies; p?: string; v?: VetView };

export const Route = createFileRoute("/vet")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    sp: s.sp === "cat" || s.sp === "horse" || s.sp === "dog" ? s.sp : undefined,
    p: typeof s.p === "string" ? s.p : undefined,
    v: s.v === "dorsal" || s.v === "head" || s.v === "lateral" ? s.v : undefined,
  }),
  component: VetPage,
});

function VetPage() {
  const q = Route.useSearch();
  const fromRow = q.p ? getVetRow(q.p) : undefined;
  const [sp, setSp] = useState<VetSpecies>(q.sp ?? "dog");
  const [view, setView] = useState<VetView>(q.v ?? fromRow?.view ?? "lateral");

  useEffect(() => {
    if (q.v) setView(q.v);
    else if (fromRow?.view) setView(fromRow.view);
  }, [q.v, fromRow?.view]);

  const pts = useMemo(() => vetMap(sp, view), [sp, view]);
  const src = VET_PLATES[sp][view];

  return (
    <>
      <BackLink to="/inicio" label="Menu" />
      <h1 className="font-display text-3xl">Acupuntura veterinária</h1>
      <p className="mt-1 text-sm text-muted">
        Fotos de estudo em três ângulos. Palpação é guia — o app não examina. Não substitui veterinário.
      </p>

      <div className="mt-4 flex gap-2">
        {VET_SPECIES.map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => setSp(s.id)}
            className={cn("chip flex-1", sp === s.id ? "bg-ok text-primary-fg" : "bg-border text-fg")}
          >
            {s.t}
          </button>
        ))}
      </div>

      <div className="mt-3 flex gap-2">
        {VET_VIEWS.map((v) => (
          <button
            key={v.id}
            type="button"
            onClick={() => setView(v.id)}
            className={cn("chip flex-1", view === v.id ? "bg-ok text-primary-fg" : "bg-border text-fg")}
          >
            {v.t}
          </button>
        ))}
      </div>

      <div className="mt-4">
        <ClickableMap
          key={`${sp}-${view}`}
          src={src}
          alt={`Mapa ${VET_SPECIES.find((s) => s.id === sp)?.t} · ${VET_VIEWS.find((v) => v.id === view)?.t}`}
          points={pts}
          tone="vet"
          aspect="3/2"
          labeled={false}
          initialId={fromRow?.id}
          extra={(p) => {
            const r = getVetRow(p.id);
            if (!r) return null;
            return (
              <p className="mt-2 text-sm">
                Equivalente humano: <PointLink code={r.body} />
              </p>
            );
          }}
        />
      </div>

      <article className="surface-card mt-6 p-4">
        <h2 className="font-display text-xl">Como ler os ângulos</h2>
        <p className="mt-1 text-sm">
          <span className="font-medium">Cabeça</span> — poll (VG20), Yintang, Shan-gen, Er-jian, VB20.{" "}
          <span className="font-medium">Dorso</span> — shu da Bexiga, VG14, Bai-hui lombo-sacro.{" "}
          <span className="font-medium">Corpo</span> — membros, flanco, cauda. Prenhez: não IG4, BP6, B60, B67,
          VB21.
        </p>
      </article>

      <Link to="/inicio" className="chip mt-8 flex w-full bg-fg text-primary-fg">
        Voltar ao menu
      </Link>
    </>
  );
}
