import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { BackLink } from "@/components/ui/back-link";
import { cn } from "@/lib/utils";
import {
  PULSE_IMAGES,
  PULSE_NORMAL,
  PULSE_POSITIONS,
  PULSE_STEPS,
  TONGUE_SIGNS,
  TONGUE_STEPS,
  TONGUE_ZONES,
} from "@/lib/tcm/exame";

export const Route = createFileRoute("/diagnostico")({ component: DiagnosticoPage });

const TABS = [
  { id: "lingua" as const, label: "Língua" },
  { id: "pulso" as const, label: "Pulso" },
];

function DiagnosticoPage() {
  const [tab, setTab] = useState<(typeof TABS)[number]["id"]>("lingua");
  const [zone, setZone] = useState<(typeof TONGUE_ZONES)[number]>(TONGUE_ZONES[0]);
  const [pulse, setPulse] = useState<(typeof PULSE_POSITIONS)[number]>(PULSE_POSITIONS[0]);
  const [sign, setSign] = useState<(typeof TONGUE_SIGNS)[number]>(TONGUE_SIGNS[0]);
  const [image, setImage] = useState<(typeof PULSE_IMAGES)[number]>(PULSE_IMAGES[0]);
  const [step, setStep] = useState(0);

  const pulseStepsOn = tab === "pulso";
  const method = pulseStepsOn ? PULSE_STEPS : TONGUE_STEPS;
  const methodStep = method[Math.min(step, method.length - 1)];

  return (
    <>
      <BackLink to="/atlas" label="Atlas" />
      <h1 className="font-display text-3xl">Diagnóstico</h1>
      <p className="mt-1 text-sm text-muted">
        Método de exame da língua e do pulso para estudo. O app não examina — cruze com a queixa na
        Consulta.
      </p>

      <div className="mt-4 flex gap-2">
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => {
              setTab(t.id);
              setStep(0);
            }}
            className={cn("chip flex-1", tab === t.id ? "bg-primary text-primary-fg" : "bg-border text-fg")}
          >
            {t.label}
          </button>
        ))}
      </div>

      <section className="mt-6">
        <p className="text-xs uppercase tracking-widest text-muted">Como examinar</p>
        <div className="mt-2 flex gap-1.5 overflow-x-auto pb-1">
          {method.map((s, i) => (
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
          <h2 className="font-display text-xl">{methodStep.t}</h2>
          <p className="mt-1 text-sm">{methodStep.d}</p>
        </article>
      </section>

      {tab === "lingua" ? (
        <>
          <h2 className="mt-8 font-display text-2xl">Regiões</h2>
          <p className="mt-1 text-sm text-muted">
            Ponta = jiao superior (Coração). Centro = Baço/Estômago. Lados = Fígado/VB. Raiz = Rim.
          </p>
          <div className="relative mx-auto mt-3 max-w-xs">
            <svg viewBox="0 0 100 110" className="w-full" aria-label="Mapa de regiões da língua">
              <ellipse cx="50" cy="52" rx="32" ry="46" className="fill-surface stroke-border" strokeWidth="2" />
              <path d="M32 28 Q50 8 68 28" className="fill-none stroke-border" strokeWidth="1.2" />
              {TONGUE_ZONES.map((z) => (
                <g key={z.id} onClick={() => setZone(z)} className="cursor-pointer">
                  <circle
                    cx={z.x}
                    cy={z.y}
                    r={zone.id === z.id ? 8 : 6}
                    className={zone.id === z.id ? "fill-primary" : "fill-ear"}
                  />
                </g>
              ))}
            </svg>
          </div>
          <article className="surface-card mt-2 p-4">
            <p className="text-xs uppercase tracking-widest text-muted">
              {zone.jiao} · {zone.organ}
            </p>
            <h3 className="font-display text-xl">{zone.label}</h3>
            <p className="mt-1 text-sm">{zone.use}</p>
          </article>
          <div className="mt-2 flex flex-wrap gap-1">
            {TONGUE_ZONES.filter((z, i, a) => a.findIndex((x) => x.label === z.label) === i).map((z) => (
              <button
                key={z.label}
                type="button"
                onClick={() => setZone(z)}
                className={cn("chip", zone.label === z.label ? "bg-primary text-primary-fg" : "bg-border text-fg")}
              >
                {z.label}
              </button>
            ))}
          </div>

          <h2 className="mt-8 font-display text-2xl">Sinais</h2>
          <p className="mt-1 text-sm text-muted">Cor, forma, mobilidade e saburra. Toque para ler.</p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {TONGUE_SIGNS.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setSign(s)}
                className={cn("chip px-3 text-xs", sign.id === s.id ? "bg-primary text-primary-fg" : "bg-border text-fg")}
              >
                {s.t}
              </button>
            ))}
          </div>
          <article className="surface-card mt-3 p-4">
            <p className="text-xs uppercase tracking-widest text-muted">{sign.grupo}</p>
            <h3 className="font-display text-xl">{sign.t}</h3>
            <p className="mt-1 text-sm">{sign.d}</p>
          </article>
        </>
      ) : (
        <>
          <h2 className="mt-8 font-display text-2xl">Cun · Guan · Chi</h2>
          <p className="mt-1 text-sm text-muted">
            Correspondência do Mai Jing (Wang Shu-he): Cun = alto, Guan = meio, Chi = baixo. Toque no
            posto.
          </p>
          <div className="relative mx-auto mt-3 max-w-sm">
            <svg viewBox="0 0 100 100" className="w-full" aria-label="Postos do pulso radial">
              <rect x="8" y="20" width="28" height="64" rx="10" className="fill-surface stroke-border" strokeWidth="2" />
              <rect x="64" y="20" width="28" height="64" rx="10" className="fill-surface stroke-border" strokeWidth="2" />
              <text x="22" y="16" textAnchor="middle" className="fill-muted" fontSize="6">
                Esq.
              </text>
              <text x="78" y="16" textAnchor="middle" className="fill-muted" fontSize="6">
                Dir.
              </text>
              {PULSE_POSITIONS.map((z) => (
                <circle
                  key={z.id}
                  cx={z.x}
                  cy={z.y}
                  r={pulse.id === z.id ? 8 : 6}
                  className={pulse.id === z.id ? "fill-primary cursor-pointer" : "fill-ynsa cursor-pointer"}
                  onClick={() => setPulse(z)}
                />
              ))}
            </svg>
          </div>
          <article className="surface-card mt-2 p-4">
            <p className="text-xs uppercase tracking-widest text-muted">
              {pulse.side} · {pulse.level}
            </p>
            <h3 className="font-display text-xl">{pulse.organ}</h3>
            <p className="mt-1 text-sm">{pulse.use}</p>
          </article>
          <div className="mt-2 grid grid-cols-3 gap-1">
            {PULSE_POSITIONS.map((z) => (
              <button
                key={z.id}
                type="button"
                onClick={() => setPulse(z)}
                className={cn("chip px-2 text-xs", pulse.id === z.id ? "bg-primary text-primary-fg" : "bg-border text-fg")}
              >
                {z.label}
              </button>
            ))}
          </div>

          <div className="mt-6 grid grid-cols-3 gap-2 text-center">
            {[
              ["Elevar", "Pele", "Superfície"],
              ["Procurar", "Músculo", "Meio"],
              ["Apoiar", "Osso", "Profundidade"],
            ].map(([a, b, c]) => (
              <div key={a} className="surface-card px-2 py-3">
                <p className="font-display text-lg leading-none">{a}</p>
                <p className="mt-1 text-xs text-muted">
                  {b}
                  <br />
                  {c}
                </p>
              </div>
            ))}
          </div>

          <article className="surface-card mt-4 p-4">
            <p className="text-xs uppercase tracking-widest text-muted">Pulso normal</p>
            <p className="mt-1 text-sm">{PULSE_NORMAL.freq}</p>
            <p className="mt-1 text-sm">{PULSE_NORMAL.ritmo}</p>
            <p className="mt-1 text-sm">{PULSE_NORMAL.raiz}</p>
            <p className="mt-2 text-sm text-muted">{PULSE_NORMAL.varia}</p>
          </article>

          <h2 className="mt-8 font-display text-2xl">Vinte e oito imagens</h2>
          <p className="mt-1 text-sm text-muted">
            Mai Jing descreveu 24; a lista de 28 (Li Zhongzi) é a de estudo. Raro aparecer só uma —
            o pulso costuma ser composto.
          </p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {PULSE_IMAGES.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => setImage(p)}
                className={cn(
                  "chip px-3 text-xs",
                  image.id === p.id ? "bg-primary text-primary-fg" : "bg-border text-fg",
                )}
              >
                {p.t}
              </button>
            ))}
          </div>
          <article className="surface-card mt-3 p-4">
            <p className="text-xs uppercase tracking-widest text-muted">{image.pinyin}</p>
            <h3 className="font-display text-xl">{image.t}</h3>
            <p className="mt-1 text-sm">{image.d}</p>
          </article>
        </>
      )}

      <Link
        to="/consulta"
        className="chip mt-8 flex w-full bg-fg text-primary-fg"
      >
        Usar língua e pulso na Consulta
      </Link>
    </>
  );
}
