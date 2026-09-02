import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ClickableMap } from "@/components/atlas/clickable-map";
import { PointLink } from "@/components/atlas/point-link";
import { BackLink } from "@/components/ui/back-link";
import { earMap } from "@/lib/tcm/maps";
import { protocols } from "@/lib/tcm/protocols";
import { EAR_ANATOMY, EAR_REGIONS } from "@/lib/tcm/exame";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/orelha")({
  validateSearch: (s: Record<string, unknown>) => ({
    p: typeof s.p === "string" ? s.p : undefined,
  }),
  component: OrelhaPage,
});

function OrelhaPage() {
  const q = Route.useSearch();
  const [region, setRegion] = useState<(typeof EAR_REGIONS)[number]["id"]>("todos");
  const [step, setStep] = useState(0);
  const anatomy = EAR_ANATOMY[step];

  const pts = useMemo(() => {
    if (region === "todos") return earMap;
    return earMap.filter((p) => p.group === region);
  }, [region]);

  return (
    <>
      <BackLink to="/inicio" label="Menu" />
      <h1 className="font-display text-3xl">Auriculoterapia</h1>
      <p className="mt-1 text-sm text-muted">
        Feto invertido no pavilhão. Toque no ponto; a ficha diz para que serve. Placa sem rótulo para
        usar com o dedo. O app não examina.
      </p>

      <section className="mt-6">
        <p className="text-xs uppercase tracking-widest text-muted">Como ler o pavilhão</p>
        <div className="mt-2 flex gap-1.5 overflow-x-auto pb-1">
          {EAR_ANATOMY.map((s, i) => (
            <button
              key={s.t}
              type="button"
              onClick={() => setStep(i)}
              className={cn(
                "chip shrink-0 px-3 text-xs",
                step === i ? "bg-ear text-primary-fg" : "bg-border text-fg",
              )}
            >
              {i + 1}. {s.t}
            </button>
          ))}
        </div>
        <article className="surface-card mt-3 p-4">
          <h2 className="font-display text-xl">{anatomy.t}</h2>
          <p className="mt-1 text-sm">{anatomy.d}</p>
        </article>
      </section>

      <p className="mt-6 text-xs uppercase tracking-widest text-muted">Região</p>
      <div className="mt-2 flex gap-1.5 overflow-x-auto pb-1">
        {EAR_REGIONS.map((r) => (
          <button
            key={r.id}
            type="button"
            onClick={() => setRegion(r.id)}
            className={cn(
              "chip shrink-0 px-3 text-xs",
              region === r.id ? "bg-ear text-primary-fg" : "bg-border text-fg",
            )}
          >
            {r.t}
          </button>
        ))}
      </div>

      <div className="mt-4">
        {pts.length > 0 ? (
          <ClickableMap
            src="/images/maps/ear.jpg"
            alt="Mapa de auriculoterapia, orelha direita"
            points={pts}
            tone="ear"
            labeled={false}
            initialId={q.p}
            linked={(label) =>
              protocols
                .filter((p) => p.ss.some((s) => s.ear.includes(label)))
                .map((p) => ({ slug: p.slug, t: p.t }))
            }
          />
        ) : (
          <div className="surface-card p-4">
            <p className="font-display text-xl">Nenhum ponto nesta região</p>
            <p className="mt-1 text-sm text-muted">Escolha outra região ou volte a Todos.</p>
          </div>
        )}
      </div>

      <article className="surface-card mt-6 p-4">
        <p className="text-xs uppercase tracking-widest text-muted">NADA · ordem de estudo</p>
        <h2 className="font-display text-xl">Cinco pontos clássicos</h2>
        <p className="mt-1 text-sm">
          <PointLink code="Shenmen" hint="ear" /> · <PointLink code="Simpático" hint="ear" /> ·{" "}
          <PointLink code="Pulmão" hint="ear" /> · <PointLink code="Fígado" hint="ear" /> ·{" "}
          <PointLink code="Rim" hint="ear" />. Abre a sessão, depois a queixa.
        </p>
        <p className="mt-2 text-sm text-muted">
          Escola chinesa: Fígado privilegia a orelha direita, Baço a esquerda. Escola brasileira: os dois
          lados pelo achado. Palpe e compare.
        </p>
      </article>

      <Link to="/consulta" className="chip mt-8 flex w-full bg-fg text-primary-fg">
        Usar orelha na Consulta
      </Link>
    </>
  );
}
