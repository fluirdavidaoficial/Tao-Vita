import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { type FormEvent, useState } from "react";
import { PointText } from "@/components/atlas/point-link";
import { BackLink } from "@/components/ui/back-link";
import { Button } from "@/components/ui/button";
import { fuMeridians, qiMeridians, zangMeridians } from "@/lib/acupuncture/meridians";
import { resolveRef } from "@/lib/acupuncture/resolve";
import { combos, protocols } from "@/lib/tcm/protocols";

export const Route = createFileRoute("/atlas")({ component: AtlasPage });

const FREQ = ["lombalgia", "insonia", "ansiedade", "joelho", "enxaqueca", "dismenorreia", "gastrite", "ombro"];

function AtlasPage() {
  return (
    <>
      <BackLink to="/inicio" label="Menu" />
      <h1 className="font-display text-3xl">Atlas · diagnóstico</h1>
      <p className="mt-1 text-sm text-muted">
        Cada ponto traz localização e para que serve. A ficha e a consulta usam o que você informar — o app
        não examina.
      </p>

      <div className="mt-4 grid grid-cols-2 gap-2">
        <Link to="/consulta" className="link-card px-4 py-3">
          <p className="text-xs text-primary">Queixa</p>
          <p className="font-display text-lg leading-tight">Consulta</p>
        </Link>
        <Link to="/ficha" className="link-card px-4 py-3">
          <p className="text-xs text-primary">Paciente</p>
          <p className="font-display text-lg leading-tight">Ficha</p>
        </Link>
        <Link to="/diagnostico" className="link-card px-4 py-3">
          <p className="text-xs text-primary">Exame de estudo</p>
          <p className="font-display text-lg leading-tight">Língua e pulso</p>
        </Link>
        <Link to="/protocolos" className="link-card px-4 py-3">
          <p className="text-xs text-primary">Síndromes</p>
          <p className="font-display text-lg leading-tight">Protocolos</p>
        </Link>
      </div>

      <PointSearch />

      <p className="mt-6 text-xs uppercase tracking-widest text-muted">Queixas mais usadas</p>
      <div className="mt-2 flex flex-wrap gap-2">
        {FREQ.map((slug) => {
          const p = protocols.find((x) => x.slug === slug);
          if (!p) return null;
          return (
            <Link
              key={slug}
              to="/protocolo/$slug"
              params={{ slug }}
              className="chip bg-fg text-primary-fg"
            >
              {p.t}
            </Link>
          );
        })}
      </div>

      <h2 className="mt-8 font-display text-2xl">Zang · órgãos</h2>
      <MeridianGrid items={zangMeridians} />
      <h2 className="mt-6 font-display text-2xl">Fu · vísceras</h2>
      <MeridianGrid items={fuMeridians} />
      <h2 className="mt-6 font-display text-2xl">Vasos</h2>
      <MeridianGrid items={qiMeridians} />
      <Link to="/vasos" className="mt-2 inline-flex text-sm text-primary underline-offset-2 hover:underline">
        Oito extraordinários
      </Link>

      <h2 className="mt-8 font-display text-2xl">Combinações</h2>
      <ul className="mt-2 space-y-2">
        {combos.map((c) => (
          <li key={c[0]} className="surface-card px-4 py-3">
            <p className="font-medium">{c[0]}</p>
            <p className="text-sm text-muted">
              <PointText text={`${c[1]} · ${c[2]}`} />
            </p>
          </li>
        ))}
      </ul>
    </>
  );
}

function MeridianGrid({
  items,
}: {
  items: { id: string; code: string; namePt: string; nameZh: string; count: number }[];
}) {
  return (
    <div className="mt-2 grid grid-cols-2 gap-2">
      {items.map((m) => (
        <Link key={m.id} to="/meridiano/$id" params={{ id: m.id }} className="link-card px-4 py-3">
          <p className="text-xs text-primary">{m.code}</p>
          <p className="font-display text-lg leading-tight">{m.namePt}</p>
          <p className="text-xs text-subtle">
            {m.nameZh} · {m.count} pts
          </p>
        </Link>
      ))}
    </div>
  );
}

function PointSearch() {
  const [q, setQ] = useState("");
  const [miss, setMiss] = useState(false);
  const nav = useNavigate();

  function go(e: FormEvent) {
    e.preventDefault();
    const r = resolveRef(q);
    setMiss(!r);
    if (!r) return;
    if (r.kind === "ear") {
      void nav({ to: "/orelha", search: { p: r.code } });
      return;
    }
    if (r.kind === "ynsa") {
      void nav({ to: "/ynsa", search: { p: r.code, view: r.view } });
      return;
    }
    void nav({ to: "/ponto/$code", params: { code: r.code } });
  }

  return (
    <form onSubmit={go} className="mt-6">
      <label className="text-xs uppercase tracking-widest text-muted" htmlFor="busca-ponto">
        Achar um ponto
      </label>
      <div className="mt-1 flex gap-2">
        <input
          id="busca-ponto"
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
            setMiss(false);
          }}
          placeholder="IG4, Hegu, Shenmen, A…"
          className="field"
        />
        <Button type="submit">Abrir</Button>
      </div>
      {miss ? <p className="mt-1 text-sm text-primary">Esse código não está no atlas.</p> : null}
    </form>
  );
}
