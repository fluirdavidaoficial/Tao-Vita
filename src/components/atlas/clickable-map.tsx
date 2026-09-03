import { Link } from "@tanstack/react-router";
import { type ReactNode, useEffect, useMemo, useState } from "react";
import { AtlasImage } from "@/components/ui/atlas-image";
import type { AtlasMapPoint } from "@/lib/tcm/maps";
import { cn } from "@/lib/utils";

function groupFill(tone: "ear" | "ynsa" | "vet" | "tongue" | "trigger", group?: string) {
  if (tone === "trigger") return "bg-primary";
  if (tone === "tongue") return "bg-primary";
  if (tone === "ear") return "bg-ear";
  if (tone === "vet") return "bg-ok";
  if (group === "ypsilon") return "bg-ok";
  if (group === "sensorial") return "bg-ynsa";
  if (group === "cerebro") return "bg-ink";
  return "bg-primary";
}

export function ClickableMap({
  src,
  alt,
  points,
  tone,
  linked,
  initialId,
  aspect = "3/4",
  labeled = true,
  background,
  onSelect,
  extra,
}: {
  src?: string;
  alt: string;
  points: AtlasMapPoint[];
  tone: "ear" | "ynsa" | "vet" | "tongue" | "trigger";
  linked?: (label: string) => { slug: string; t: string }[];
  initialId?: string;
  aspect?: "3/4" | "3/2" | "2/3" | "1/1";
  labeled?: boolean;
  background?: ReactNode;
  onSelect?: (p: AtlasMapPoint) => void;
  extra?: ReactNode | ((sel: AtlasMapPoint) => ReactNode);
}) {
  const sig = useMemo(() => points.map((p) => p.id).join("|"), [points]);
  const firstId =
    (initialId && points.some((p) => p.id === initialId || p.label === initialId)
      ? points.find((p) => p.id === initialId || p.label === initialId)!.id
      : points[0]?.id) ?? "";
  const [selId, setSelId] = useState(firstId);

  useEffect(() => {
    setSelId(firstId);
  }, [sig, firstId]);

  const sel = points.find((p) => p.id === selId) ?? points[0];
  const related = sel && linked ? linked(sel.label) : [];

  function pick(p: AtlasMapPoint) {
    setSelId(p.id);
    onSelect?.(p);
  }

  return (
    <div>
      <div className="relative overflow-hidden rounded-2xl bg-border/60 shadow-[var(--shadow-border)]">
        {background ??
          (src ? (
            <AtlasImage
              src={src}
              alt={alt}
              className={cn(
                "w-full",
                aspect === "1/1"
                  ? "aspect-square"
                  : aspect === "3/2"
                    ? "aspect-[3/2]"
                    : aspect === "2/3"
                      ? "aspect-[2/3]"
                      : "aspect-[3/4]",
              )}
              imgClassName="object-cover"
            />
          ) : null)}
        {points.map((p) => {
          const on = p.id === sel?.id;
          const fill = groupFill(tone, p.group);
          const showLabel = on || (labeled && points.length <= 9);
          const flip = p.x > 70;
          return (
            <button
              key={p.id}
              type="button"
              aria-label={p.label}
              aria-pressed={on}
              onClick={() => pick(p)}
              className="absolute z-10 flex size-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center"
              style={{ left: `${p.x}%`, top: `${p.y}%` }}
            >
              <span
                className={cn(
                  "block rounded-full border border-surface shadow-sm transition-[transform,background-color] duration-150 ease-out",
                  on ? cn("size-3.5 scale-125", fill) : cn("size-2.5", fill, "opacity-80"),
                )}
              />
              {showLabel ? (
                <span
                  className={cn(
                    "absolute top-1/2 whitespace-nowrap rounded-full px-1.5 py-0.5 font-medium leading-none",
                    "map-label",
                    flip ? "right-full mr-1" : "left-full ml-1",
                    "-translate-y-1/2",
                    on ? cn(fill, "text-primary-fg") : "bg-surface/95 text-fg shadow-sm",
                  )}
                >
                  {p.label}
                </span>
              ) : null}
            </button>
          );
        })}
      </div>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {points.map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => pick(p)}
            className={cn(
              "chip min-h-11 px-3 text-xs",
              p.id === sel?.id ? cn(groupFill(tone, p.group), "text-primary-fg") : "bg-border text-fg",
            )}
          >
            {p.label}
          </button>
        ))}
      </div>

      {sel ? (
        <article className="surface-card mt-3 p-4">
          <p className="text-xs uppercase tracking-widest text-muted">
            {sel.loc ??
              (tone === "ear"
                ? "Orelha"
                : tone === "vet"
                  ? "Veterinária"
                  : tone === "tongue"
                    ? "Língua"
                    : tone === "trigger"
                      ? "Gatilho"
                      : "YNSA")}
          </p>
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
          {typeof extra === "function" ? extra(sel) : extra}
        </article>
      ) : null}
    </div>
  );
}

export { groupFill };
