import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { ClickableMap } from "@/components/atlas/clickable-map";
import { BackLink } from "@/components/ui/back-link";
import { VideoSlot } from "@/components/ui/video-slot";
import {
  TRIGGER_POINTS,
  TRIGGER_REGIONS,
  TRIGGER_STEPS,
  TRIGGER_VIEWS,
  toAtlasPoint,
  type TriggerRegion,
  type TriggerView,
} from "@/lib/tcm/gatilhos";
import { cn } from "@/lib/utils";

type Search = { p?: string; v?: TriggerView };

const VIEWS = new Set(TRIGGER_VIEWS.map((v) => v.id));

export const Route = createFileRoute("/massagem")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    p: typeof s.p === "string" ? s.p : undefined,
    v: typeof s.v === "string" && VIEWS.has(s.v as TriggerView) ? (s.v as TriggerView) : undefined,
  }),
  component: MassagemPage,
});

function MassagemPage() {
  const q = Route.useSearch();
  const fromP = q.p ? TRIGGER_POINTS.find((p) => p.id === q.p || p.label === q.p) : undefined;
  const [region, setRegion] = useState<TriggerRegion | "todos">("lombar");
  const [view, setView] = useState<TriggerView>(q.v ?? fromP?.view ?? "back-lower");
  const [selId, setSelId] = useState(fromP?.id);
  const [step, setStep] = useState(0);
  const method = TRIGGER_STEPS[step];

  useEffect(() => {
    if (q.v) setView(q.v);
    else if (fromP?.view) setView(fromP.view);
  }, [q.v, fromP?.view]);

  const viewsForRegion = useMemo(() => {
    const ids = new Set(
      TRIGGER_POINTS.filter((p) => region === "todos" || p.region === region).map((p) => p.view),
    );
    return TRIGGER_VIEWS.filter((v) => ids.has(v.id));
  }, [region]);

  useEffect(() => {
    if (!viewsForRegion.some((v) => v.id === view) && viewsForRegion[0]) {
      setView(viewsForRegion[0].id);
    }
  }, [viewsForRegion, view]);

  const pts = useMemo(() => {
    return TRIGGER_POINTS.filter((p) => {
      if (p.view !== view) return false;
      if (region === "todos") return true;
      return p.region === region;
    }).map(toAtlasPoint);
  }, [view, region]);

  const current = TRIGGER_VIEWS.find((v) => v.id === view) ?? TRIGGER_VIEWS[0];
  const activeId = selId && pts.some((p) => p.id === selId) ? selId : pts[0]?.id;
  const meta = TRIGGER_POINTS.find((p) => p.id === activeId);

  function pickRegion(id: TriggerRegion | "todos") {
    setRegion(id);
  }

  return (
    <>
      <BackLink to="/inicio" label="Menu" />
      <h1 className="font-display text-3xl">Massagem e pontos-gatilho</h1>
      <p className="mt-1 text-sm text-muted">
        Mapa de estudo pelos músculos do folheto de gatilhos. Placas originais, pontos desenhados no
        corpo. O app não examina.
      </p>

      <section className="mt-6">
        <p className="text-xs uppercase tracking-widest text-muted">Como estudar</p>
        <div className="mt-2 flex gap-1.5 overflow-x-auto pb-1">
          {TRIGGER_STEPS.map((s, i) => (
            <button
              key={s.t}
              type="button"
              onClick={() => setStep(i)}
              className={cn(
                "chip shrink-0 px-3 text-xs",
                step === i ? "bg-fg text-primary-fg" : "bg-border text-fg",
              )}
            >
              {i + 1}. {s.t}
            </button>
          ))}
        </div>
        <article className="surface-card mt-3 p-4">
          <h2 className="font-display text-xl">{method.t}</h2>
          <p className="mt-1 text-sm">{method.d}</p>
        </article>
      </section>

      <p className="mt-6 text-xs uppercase tracking-widest text-muted">Queixa</p>
      <div className="mt-2 flex gap-1.5 overflow-x-auto pb-1">
        {TRIGGER_REGIONS.map((r) => (
          <button
            key={r.id}
            type="button"
            onClick={() => pickRegion(r.id)}
            className={cn(
              "chip shrink-0 px-3 text-xs",
              region === r.id ? "bg-primary text-primary-fg" : "bg-border text-fg",
            )}
          >
            {r.t}
          </button>
        ))}
      </div>

      <p className="mt-4 text-xs uppercase tracking-widest text-muted">Vista</p>
      <div className="mt-2 flex gap-1.5 overflow-x-auto pb-1">
        {viewsForRegion.map((v) => (
          <button
            key={v.id}
            type="button"
            onClick={() => setView(v.id)}
            className={cn(
              "chip shrink-0 px-3 text-xs",
              view === v.id ? "bg-primary text-primary-fg" : "bg-border text-fg",
            )}
          >
            {v.t}
          </button>
        ))}
      </div>

      <div className="mt-4 w-full">
        {pts.length > 0 ? (
          <ClickableMap
            key={`${view}-${region}`}
            src={current.src}
            alt={current.t}
            points={pts}
            tone="trigger"
            initialId={selId ?? fromP?.id}
            labeled={false}
            aspect={current.aspect}
            onSelect={(p) => setSelId(p.id)}
            extra={(sel) => {
              const m = TRIGGER_POINTS.find((p) => p.id === sel.id);
              return m ? (
                <p className="mt-3 text-sm">
                  <span className="text-xs uppercase tracking-widest text-muted">Dor referida</span>
                  <span className="mt-1 block">{m.referral}</span>
                </p>
              ) : null;
            }}
          />
        ) : (
          <article className="surface-card p-4">
            <p className="font-display text-xl">Nada nesta vista</p>
            <p className="mt-1 text-sm text-muted">Troque a queixa ou a vista.</p>
          </article>
        )}
      </div>

      {meta ? <VideoSlot title={meta.muscle} /> : null}

      <h2 className="mt-8 font-display text-2xl">Músculos deste recorte</h2>
      <p className="mt-1 text-sm text-muted">
        {region === "todos"
          ? `${TRIGGER_POINTS.length} gatilhos no atlas.`
          : `${TRIGGER_POINTS.filter((p) => p.region === region).length} neste grupo. Toque no mapa.`}
      </p>
      <ul className="mt-3 divide-y divide-border overflow-hidden rounded-2xl bg-surface shadow-[var(--shadow-border)]">
        {(region === "todos" ? TRIGGER_POINTS : TRIGGER_POINTS.filter((p) => p.region === region)).map(
          (p) => (
            <li key={p.id}>
              <button
                type="button"
                onClick={() => {
                  setView(p.view);
                  setSelId(p.id);
                }}
                className={cn(
                  "flex w-full min-h-11 items-start gap-3 px-4 py-3 text-left",
                  p.id === activeId ? "bg-border/60" : "",
                )}
              >
                <span className="w-28 shrink-0 text-sm font-medium text-primary">{p.label}</span>
                <span className="min-w-0">
                  <span className="block text-sm">{p.muscle}</span>
                  <span className="block text-xs text-muted">{p.loc}</span>
                </span>
              </button>
            </li>
          ),
        )}
      </ul>
    </>
  );
}
