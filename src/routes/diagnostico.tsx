import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "@/components/layout/app-shell";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/diagnostico")({ component: DiagnosticoPage });

const TONGUE = [
  { id: "ponta", label: "Ponta", x: 50, y: 18, use: "Coração / Shen. Vermelha: Fogo; pálida: Xue xu." },
  { id: "pulmao", label: "Pulmão", x: 50, y: 32, use: "Entre ponta e centro. Saburra e cor falam de exterior e Qi do Pulmão." },
  { id: "centro", label: "Centro", x: 50, y: 50, use: "Estômago / Baço. Saburra gordurosa: umidade-Tan; espelho: Yin xu." },
  { id: "lados", label: "Lados", x: 22, y: 48, use: "Fígado / VB. Bordos vermelhos ou tensos: Qi estagnado ou Fogo." },
  { id: "lados2", label: "Lados", x: 78, y: 48, use: "Fígado / VB (lado oposto)." },
  { id: "raiz", label: "Raiz", x: 50, y: 78, use: "Rim / jiao inferior. Saburra na raiz: umidade-calor inferior." },
];

const PULSE = [
  { id: "cun-e", label: "Cun E", x: 22, y: 38, use: "Esquerdo distal: Coração / intestino delgado." },
  { id: "guan-e", label: "Guan E", x: 22, y: 52, use: "Esquerdo médio: Fígado / vesícula." },
  { id: "chi-e", label: "Chi E", x: 22, y: 66, use: "Esquerdo proximal: Rim Yin / bexiga." },
  { id: "cun-d", label: "Cun D", x: 78, y: 38, use: "Direito distal: Pulmão / intestino grosso." },
  { id: "guan-d", label: "Guan D", x: 78, y: 52, use: "Direito médio: Baço / estômago." },
  { id: "chi-d", label: "Chi D", x: 78, y: 66, use: "Direito proximal: Rim Yang / Mingmen." },
];

function DiagnosticoPage() {
  const [t, setT] = useState(TONGUE[0]);
  const [p, setP] = useState(PULSE[0]);
  return (
    <AppShell>
      <h1 className="font-display text-3xl">Diagnóstico</h1>
      <p className="mt-1 text-sm text-muted">Toque na região. Apoio de estudo — não é diagnóstico automático.</p>

      <h2 className="mt-6 font-display text-2xl">Língua</h2>
      <div className="relative mx-auto mt-3 max-w-xs">
        <svg viewBox="0 0 100 110" className="w-full">
          <ellipse cx="50" cy="52" rx="32" ry="46" className="fill-surface stroke-border" strokeWidth="2" />
          {TONGUE.map((z) => (
            <g key={z.id} onClick={() => setT(z)} className="cursor-pointer">
              <circle cx={z.x} cy={z.y} r={t.id === z.id ? 8 : 6} className={t.id === z.id ? "fill-primary" : "fill-ear"} />
            </g>
          ))}
        </svg>
      </div>
      <article className="mt-2 rounded-xl border border-border bg-surface p-4">
        <h3 className="font-display text-xl">{t.label}</h3>
        <p className="text-sm">{t.use}</p>
      </article>
      <div className="mt-2 flex flex-wrap gap-1">
        {TONGUE.filter((z, i, a) => a.findIndex((x) => x.label === z.label) === i).map((z) => (
          <button
            key={z.label}
            type="button"
            onClick={() => setT(z)}
            className={cn("min-h-11 rounded-full px-3 text-sm", t.label === z.label ? "bg-primary text-primary-fg" : "border border-border")}
          >
            {z.label}
          </button>
        ))}
      </div>

      <h2 className="mt-8 font-display text-2xl">Pulso</h2>
      <div className="relative mx-auto mt-3 max-w-sm">
        <svg viewBox="0 0 100 100" className="w-full">
          <rect x="8" y="20" width="28" height="64" rx="10" className="fill-surface stroke-border" strokeWidth="2" />
          <rect x="64" y="20" width="28" height="64" rx="10" className="fill-surface stroke-border" strokeWidth="2" />
          <text x="22" y="16" textAnchor="middle" className="fill-muted" fontSize="6">
            Esq.
          </text>
          <text x="78" y="16" textAnchor="middle" className="fill-muted" fontSize="6">
            Dir.
          </text>
          {PULSE.map((z) => (
            <circle
              key={z.id}
              cx={z.x}
              cy={z.y}
              r={p.id === z.id ? 8 : 6}
              className={p.id === z.id ? "fill-primary cursor-pointer" : "fill-ynsa cursor-pointer"}
              onClick={() => setP(z)}
            />
          ))}
        </svg>
      </div>
      <article className="mt-2 rounded-xl border border-border bg-surface p-4">
        <h3 className="font-display text-xl">{p.label}</h3>
        <p className="text-sm">{p.use}</p>
      </article>
    </AppShell>
  );
}
