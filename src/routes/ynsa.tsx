import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { ClickableMap } from "@/components/atlas/clickable-map";
import { BackLink } from "@/components/ui/back-link";
import { ynsaMap } from "@/lib/tcm/maps";
import { protocols } from "@/lib/tcm/protocols";
import { YNSA_GROUPS, YNSA_METHOD, YNSA_SOMA, YNSA_UNPLOTTED } from "@/lib/tcm/exame";
import { cn } from "@/lib/utils";

type Search = { p?: string; view?: "ynsa-front" | "ynsa-lateral" | "ynsa-occiput" };

export const Route = createFileRoute("/ynsa")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    p: typeof s.p === "string" ? s.p : undefined,
    view:
      s.view === "ynsa-front" || s.view === "ynsa-lateral" || s.view === "ynsa-occiput"
        ? s.view
        : undefined,
  }),
  component: YnsaPage,
});

const VIEWS = [
  { id: "ynsa-front" as const, label: "Frente · Yin" },
  { id: "ynsa-lateral" as const, label: "Lateral" },
  { id: "ynsa-occiput" as const, label: "Nuca · Yang" },
];

const GROUPS = [
  { id: "todos", t: "Todos" },
  { id: "basico", t: "Básicos" },
  { id: "sensorial", t: "Sensoriais" },
  { id: "cerebro", t: "Cérebro" },
  { id: "ypsilon", t: "Ypsilon" },
] as const;

const VIEW_SRC: Record<(typeof VIEWS)[number]["id"], string> = {
  "ynsa-front": "/images/maps/ynsa-front.jpg",
  "ynsa-lateral": "/images/maps/ynsa-lateral.jpg",
  "ynsa-occiput": "/images/maps/ynsa-occiput.jpg",
};

function YnsaPage() {
  const q = Route.useSearch();
  const fromP = q.p ? ynsaMap.find((p) => p.label === q.p || p.id === q.p) : undefined;
  const [view, setView] = useState<(typeof VIEWS)[number]["id"]>(
    q.view ?? fromP?.view ?? "ynsa-front",
  );
  const [group, setGroup] = useState<(typeof GROUPS)[number]["id"]>("todos");
  const [step, setStep] = useState(0);
  const method = YNSA_METHOD[step];

  useEffect(() => {
    if (q.view) setView(q.view);
    else if (fromP?.view) setView(fromP.view);
  }, [q.view, fromP?.view]);

  function pickGroup(id: (typeof GROUPS)[number]["id"]) {
    setGroup(id);
    if (id === "todos") return;
    const here = ynsaMap.some((p) => p.view === view && p.group === id);
    if (here) return;
    const hit = ynsaMap.find((p) => p.group === id);
    if (hit?.view) setView(hit.view);
  }

  const pts = useMemo(() => {
    return ynsaMap.filter((p) => {
      if (p.view !== view) return false;
      if (group === "todos") return true;
      return p.group === group;
    });
  }, [view, group]);

  const otherView = useMemo(() => {
    if (pts.length > 0 || group === "todos") return null;
    const hit = ynsaMap.find((p) => p.group === group);
    return VIEWS.find((v) => v.id === hit?.view) ?? null;
  }, [pts.length, group]);

  const teach = YNSA_GROUPS.find((g) => g.id === group);

  return (
    <>
      <BackLink to="/inicio" label="Menu" />
      <h1 className="font-display text-3xl">Yamamoto · YNSA</h1>
      <p className="mt-1 text-sm text-muted">
        Foto de estudo com cabelo curto para ver a linha do cabelo, a têmpora e a nuca. Palpação confirma o
        very-point — o app não examina.
      </p>

      <section className="mt-6">
        <p className="text-xs uppercase tracking-widest text-muted">Como estudar</p>
        <div className="mt-2 flex gap-1.5 overflow-x-auto pb-1">
          {YNSA_METHOD.map((s, i) => (
            <button
              key={s.t}
              type="button"
              onClick={() => setStep(i)}
              className={cn(
                "chip shrink-0 px-3 text-xs",
                step === i ? "bg-ynsa text-primary-fg" : "bg-border text-fg",
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

      <p className="mt-6 text-xs uppercase tracking-widest text-muted">Grupo</p>
      <div className="mt-2 flex gap-1.5 overflow-x-auto pb-1">
        {GROUPS.map((g) => (
          <button
            key={g.id}
            type="button"
            onClick={() => pickGroup(g.id)}
            className={cn(
              "chip shrink-0 px-3 text-xs",
              group === g.id ? "bg-ynsa text-primary-fg" : "bg-border text-fg",
            )}
          >
            {g.t}
          </button>
        ))}
      </div>
      {teach ? (
        <article className="surface-card mt-3 p-4">
          <h2 className="font-display text-xl">{teach.t}</h2>
          <p className="mt-1 text-sm">{teach.d}</p>
        </article>
      ) : (
        <article className="surface-card mt-3 p-4">
          <p className="text-sm">
            Toque num grupo para ler. Frente = Yin (A–C e S na fronte). Lateral = Ypsilon na têmpora e
            D–I na costeleta. Nuca = Yang, acima da lambdóide.
          </p>
        </article>
      )}

      <div className="mt-4 flex gap-2">
        {VIEWS.map((v) => (
          <button
            key={v.id}
            type="button"
            onClick={() => setView(v.id)}
            className={cn("chip flex-1 px-2 text-xs", view === v.id ? "bg-ynsa text-primary-fg" : "bg-border text-fg")}
          >
            {v.label}
          </button>
        ))}
      </div>

      <div className="mt-4">
        {pts.length > 0 ? (
          <ClickableMap
            key={view}
            src={VIEW_SRC[view]}
            alt={`YNSA ${VIEWS.find((v) => v.id === view)?.label}`}
            points={pts}
            tone="ynsa"
            initialId={fromP?.id}
            labeled={false}
            aspect={view === "ynsa-front" ? "3/4" : "2/3"}
            linked={(label) =>
              protocols
                .filter((p) => p.ss.some((s) => s.yn.includes(label)))
                .map((p) => ({ slug: p.slug, t: p.t }))
            }
          />
        ) : (
          <div className="surface-card p-4">
            <p className="font-display text-xl">Nada nesta vista</p>
            <p className="mt-1 text-sm text-muted">
              {otherView
                ? `O grupo ${GROUPS.find((g) => g.id === group)?.t} está em ${otherView.label}.`
                : "Este filtro não tem ponto plotado nesta placa."}
            </p>
            {otherView ? (
              <button
                type="button"
                onClick={() => setView(otherView.id)}
                className="chip mt-3 bg-ynsa text-primary-fg"
              >
                Abrir {otherView.label}
              </button>
            ) : null}
          </div>
        )}
      </div>

      <h2 className="mt-8 font-display text-2xl">Somatotopia</h2>
      <p className="mt-1 text-sm text-muted">O que cada letra serve, e onde palpar. Toque no mapa para ver o ponto.</p>
      <ul className="mt-3 divide-y divide-border overflow-hidden rounded-2xl bg-surface shadow-[var(--shadow-border)]">
        {YNSA_SOMA.map((row) => (
          <li key={row.id} className="flex gap-3 px-4 py-3">
            <span className="w-10 shrink-0 font-medium text-primary">{row.id}</span>
            <span>
              <span className="block text-sm font-medium">{row.t}</span>
              <span className="block text-xs text-muted">{row.where}</span>
            </span>
          </li>
        ))}
      </ul>

      <h2 className="mt-8 font-display text-2xl">Pé (J / K)</h2>
      <p className="mt-1 text-sm text-muted">
        J e K são a somatotopia do pé nos básicos. Sem placa calibrada — palpe, não chute no desenho.
      </p>
      <ul className="mt-3 space-y-2">
        {YNSA_UNPLOTTED.map((p) => (
          <li key={p.id} className="surface-card px-4 py-3">
            <p className="font-medium">{p.t}</p>
            <p className="text-sm text-muted">{p.d}</p>
          </li>
        ))}
      </ul>

      <Link to="/consulta" className="chip mt-8 flex w-full bg-fg text-primary-fg">
        Usar YNSA na Consulta
      </Link>
    </>
  );
}
