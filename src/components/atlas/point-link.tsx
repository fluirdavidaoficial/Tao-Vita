import { Link } from "@tanstack/react-router";
import { resolveRef, tokenizePoints, type PointRef, type RefKind } from "@/lib/acupuncture/resolve";
import { cn } from "@/lib/utils";

function href(r: PointRef) {
  if (r.kind === "ear") return { to: "/orelha" as const, search: { p: r.code } };
  if (r.kind === "ynsa") {
    return { to: "/ynsa" as const, search: { p: r.code, view: r.view } };
  }
  return { to: "/ponto/$code" as const, params: { code: r.code } };
}

export function PointLink({
  code,
  note,
  hint,
  className,
}: {
  code: string;
  note?: string;
  hint?: RefKind;
  className?: string;
}) {
  const r = resolveRef(code, hint);
  if (!r) {
    return (
      <span className={cn("chip bg-border text-fg", className)}>
        {code}
        {note ? <span className="ml-1 text-xs text-muted">{note}</span> : null}
      </span>
    );
  }
  const h = href(r);
  const inner = (
    <span className={cn("chip bg-fg text-primary-fg", className)}>
      <span className="font-medium">{r.label}{r.pinyin && r.pinyin !== r.label ? ` · ${r.pinyin}` : ""}</span>
      {note ? <span className="ml-1 text-xs text-primary-fg/70">{note}</span> : null}
    </span>
  );
  if ("params" in h) {
    return (
      <Link to={h.to} params={h.params}>
        {inner}
      </Link>
    );
  }
  return (
    <Link to={h.to} search={h.search}>
      {inner}
    </Link>
  );
}

export function PointText({ text, className }: { text: string; className?: string }) {
  const parts = tokenizePoints(text);
  return (
    <span className={className}>
      {parts.map((p, i) => {
        if (!p.ref) return <span key={i}>{p.t}</span>;
        const h = href(p.ref);
        const cls = "text-primary underline decoration-primary/40 underline-offset-2";
        if ("params" in h) {
          return (
            <Link key={i} to={h.to} params={h.params} className={cls}>
              {p.t}
            </Link>
          );
        }
        return (
          <Link key={i} to={h.to} search={h.search} className={cls}>
            {p.t}
          </Link>
        );
      })}
    </span>
  );
}
