import { useState } from "react";
import { MapDot } from "@/components/atlas/map-dot";
import type { MapPoint } from "@/lib/tcm/maps";
import { cn } from "@/lib/utils";

export function ClickableMap({
  src,
  alt,
  points,
  tone = "ear",
  linked,
}: {
  src: string;
  alt: string;
  points: MapPoint[];
  tone?: "ear" | "ynsa";
  linked?: (label: string) => { slug: string; t: string }[];
}) {
  const [id, setId] = useState(points[0]?.id ?? "");
  const active = points.find((p) => p.id === id) ?? points[0];
  const related = active && linked ? linked(active.label) : [];

  return (
    <div>
      <div className="relative overflow-hidden rounded-xl border border-border bg-surface">
        <img src={src} alt={alt} className="block w-full select-none" />
        {points.map((p) => (
          <MapDot
            key={p.id}
            x={p.x}
            y={p.y}
            label={p.label}
            tone={tone}
            active={p.id === active?.id}
            onClick={() => setId(p.id)}
          />
        ))}
      </div>
      {active && (
        <article className="mt-3 rounded-xl border border-border bg-surface p-4">
          <p className="text-xs uppercase tracking-widest text-muted">{active.zone}</p>
          <h2 className="font-display text-2xl">{active.label}</h2>
          <p className="mt-1 text-sm">Para que serve: {active.use}</p>
          {related.length > 0 && (
            <p className="mt-2 text-sm text-muted">
              Protocolos: {related.map((r) => r.t).join(" · ")}
            </p>
          )}
        </article>
      )}
      <ul className="mt-3 grid grid-cols-2 gap-1.5">
        {points.map((p) => (
          <li key={p.id}>
            <button
              type="button"
              onClick={() => setId(p.id)}
              className={cn(
                "flex min-h-11 w-full items-center rounded-lg border px-3 text-left text-sm",
                p.id === active?.id ? "border-primary bg-primary text-primary-fg" : "border-border bg-surface",
              )}
            >
              {p.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
