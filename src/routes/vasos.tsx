import { createFileRoute } from "@tanstack/react-router";
import { extraPoints, vessels } from "@/lib/tcm/protocols";

export const Route = createFileRoute("/vasos")({ component: VasosPage });

function VasosPage() {
  return (
    <>
      <h1 className="font-display text-3xl">Vasos extraordinários</h1>
      <p className="mt-1 text-sm text-muted">Du, Ren, Chong, Dai, Qiao e Wei — quando abrir o vaso.</p>
      <ul className="stagger-list mt-4 space-y-3">
        {vessels.map((v) => (
          <li key={v.t} className="surface-card p-4">
            <p className="text-xs text-primary">{v.zh}</p>
            <h2 className="font-display text-xl">{v.t}</h2>
            <p className="text-sm">{v.uso}</p>
            <p className="mt-2 text-sm text-muted">{v.pts}</p>
            <p className="mt-1 text-sm text-muted">Quando: {v.quando}</p>
          </li>
        ))}
      </ul>
      <h2 className="mt-8 font-display text-2xl">Pontos extras</h2>
      <ul className="mt-2 space-y-2">
        {extraPoints.map(([c, loc, use]) => (
          <li key={c} className="surface-card p-4">
            <p className="font-display text-xl">{c}</p>
            <p className="text-sm">{loc}</p>
            <p className="text-sm text-muted">{use}</p>
          </li>
        ))}
      </ul>
    </>
  );
}
