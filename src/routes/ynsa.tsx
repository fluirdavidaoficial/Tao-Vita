import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "@/components/layout/app-shell";
import { ClickableMap } from "@/components/atlas/clickable-map";
import { ynsaMap } from "@/lib/tcm/maps";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/ynsa")({ component: YnsaPage });

const VIEWS = [
  { id: "ynsa-front" as const, label: "Frente", src: "/images/maps/ynsa-front.jpg" },
  { id: "ynsa-lateral" as const, label: "Lateral", src: "/images/maps/ynsa-lateral.jpg" },
  { id: "ynsa-occiput" as const, label: "Nuca", src: "/images/maps/ynsa-occiput.jpg" },
];

function YnsaPage() {
  const [view, setView] = useState<(typeof VIEWS)[number]["id"]>("ynsa-front");
  const plate = VIEWS.find((v) => v.id === view)!;
  const pts = ynsaMap.filter((p) => p.view === view);

  return (
    <AppShell>
      <h1 className="font-display text-3xl">Yamamoto · YNSA</h1>
      <p className="mt-1 text-sm text-muted">
        Toque no ponto. Palpação de pescoço, abdômen e cotovelo é guia de estudo — o app não examina.
        Lado: em geral ipsilateral à queixa motora.
      </p>
      <div className="mt-3 flex gap-2">
        {VIEWS.map((v) => (
          <button
            key={v.id}
            type="button"
            onClick={() => setView(v.id)}
            className={cn(
              "min-h-11 flex-1 rounded-full text-sm",
              view === v.id ? "bg-ynsa text-primary-fg" : "border border-border bg-surface",
            )}
          >
            {v.label}
          </button>
        ))}
      </div>
      <div className="mt-4">
        <ClickableMap src={plate.src} alt={`YNSA ${plate.label}`} points={pts} tone="ynsa" />
      </div>
    </AppShell>
  );
}
