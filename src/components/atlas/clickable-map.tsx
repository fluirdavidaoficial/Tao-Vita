import { Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { AtlasImage } from "@/components/ui/atlas-image";
import type { AtlasMapPoint } from "@/lib/tcm/maps";
import { cn } from "@/lib/utils";

export function ClickableMap({
  src,
  alt,
  points,
  tone,
  linked,
}: {
  src: string;
  alt: string;
  points: AtlasMapPoint[];
  tone: "ear" | "ynsa";
  linked?: (label: string) => { slug: string; t: string }[];
}) {
  const sig = useMemo(() => points.map((p) => p.id).join("|"), [points]);
  const firstId = points[0]?.id ?? "";
  const [selId, setSelId] = useState(firstId);

  useEffect(() => {
    setSelId(firstId);
  }, [sig, firstId]);

  const sel = points.find((p) => p.id === selId) ?? points[0];
  const related = sel && linked ? linked(sel.label) : [];
  const active = tone === "ear" ? "bg-ear" : "bg-ynsa";

  return (
    <div>
      <div className="relative overflow-hidden rounded-2xl bg-border/60 shadow-[var(--shadow-border)]">
        <AtlasImage src={src} alt={alt} className="aspect-[3/4] w-full" imgClassName="object-cover" />
        {points.map((p) => {
          const on = p.id === sel?.id;
          return (
            <button
              key={p.id}
              type="button"
              aria-label={p.label}
              aria-pressed={on}
              onClick={() => setSelId(p.id)}
              className="absolute z-10 grid size-9 -translate-x-1/2 -translate-y-1/2 place-items-center"
              style={{ left: `${p.x}%`, top: `${p.y}%` }}
            >
              <span
                className={cn(
                  "block rounded-full ring-2 ring-surface/90 transition-[transform,background-color,box-shadow] duration-150 ease-out",
                  on ? cn("size-3.5 shadow-md", active) : "size-2.5 bg-primary-fg/90",
                )}
              />
            </button>
          );
        })}
      </div>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {points.map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => setSelId(p.id)}
            className={cn(
              "chip min-h-11 px-3 text-xs",
              p.id === sel?.id ? cn(active, "text-primary-fg") : "bg-border text-fg",
            )}
          >
            {p.label}
          </button>
        ))}
      </div>

      {sel ? (
        <article className="surface-card mt-3 p-4">
          <p className="text-xs uppercase tracking-widest text-muted">{sel.loc ?? (tone === "ear" ? "Orelha" : "YNSA")}</p>
          <h2 className="font-display text-2xl">{sel.label}</h2>
          <p className="mt-1 text-sm">{sel.use}</p>
          {related.length > 0 ? (
            <>
              <p className="mt-3 text-xs uppercase tracking-widest text-muted">Protocolos</p>
              <div className="mt-1 flex flex-wrap gap-2">
                {related.map((r) => (
                  <Link
                    key={r.slug}
                    to="/protocolo/$slug"
                    params={{ slug: r.slug }}
                    className="chip bg-fg text-primary-fg"
                  >
                    {r.t}
                  </Link>
                ))}
              </div>
            </>
          ) : null}
        </article>
      ) : null}
    </div>
  );
}
