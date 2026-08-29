import { createFileRoute } from "@tanstack/react-router";
import { ClickableMap } from "@/components/atlas/clickable-map";
import { earMap } from "@/lib/tcm/maps";
import { protocols } from "@/lib/tcm/protocols";

export const Route = createFileRoute("/orelha")({ component: OrelhaPage });

function OrelhaPage() {
  return (
    <>
      <h1 className="font-display text-3xl">Auriculoterapia</h1>
      <p className="mt-1 text-sm text-muted">
        Toque no ponto do mapa. A ficha abaixo diz para que serve. Placa sem rótulo para usar com o dedo.
      </p>
      <div className="mt-4">
        <ClickableMap
          src="/images/maps/ear.jpg"
          alt="Mapa de auriculoterapia, orelha direita"
          points={earMap}
          tone="ear"
          linked={(label) =>
            protocols
              .filter((p) => p.ss.some((s) => s.ear.includes(label)))
              .map((p) => ({ slug: p.slug, t: p.t }))
          }
        />
      </div>
    </>
  );
}
