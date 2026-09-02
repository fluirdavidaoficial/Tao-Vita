import { EXTRA_SPECS, POINT_SPECS } from "./specs";
import { allPoints, type Point } from "./points";
import { ynsaMap } from "@/lib/tcm/maps";
import { earPoints, ynsaPoints } from "@/lib/tcm/protocols";

const WHO: Record<string, string> = {
  LU: "P",
  LI: "IG",
  ST: "E",
  SP: "BP",
  HT: "C",
  SI: "ID",
  BL: "B",
  KI: "R",
  PC: "CS",
  TE: "TA",
  SJ: "TA",
  TB: "TA",
  GB: "VB",
  LR: "F",
  LV: "F",
  GV: "VG",
  CV: "VC",
  DU: "VG",
  REN: "VC",
};

export type RefKind = "body" | "extra" | "ear" | "ynsa";

export type PointRef = {
  code: string;
  label: string;
  kind: RefKind;
  pinyin?: string;
  loc?: string;
  use?: string;
  cat?: string;
  caut?: string;
  photo?: string;
  meridianId?: string;
  view?: "ynsa-front" | "ynsa-lateral" | "ynsa-occiput";
};

const EXTRA_KEYS = Object.keys(EXTRA_SPECS).sort((a, b) => b.length - a.length);
const EAR_KEYS = earPoints.map(([l]) => l).sort((a, b) => b.length - a.length);
const YN_KEYS = [...new Set(ynsaPoints.map(([l]) => l))].sort((a, b) => b.length - a.length);

function compact(raw: string) {
  return raw.trim().toUpperCase().replace(/[\s\-_.]/g, "");
}

export function atlasCode(raw: string): string | undefined {
  const c = compact(raw);
  const direct = allPoints.find((p) => p.code.toUpperCase() === c || p.who.toUpperCase() === c);
  if (direct) return direct.code;
  const m = c.match(/^([A-Z]+)(\d{1,2})$/);
  if (!m) return;
  const pref = WHO[m[1]];
  if (!pref) return;
  const code = `${pref}${Number(m[2])}`;
  return allPoints.some((p) => p.code === code) ? code : undefined;
}

export function hydrateBody(code: string): Point | undefined {
  const p = allPoints.find((x) => x.code === code);
  if (!p) return;
  const spec = POINT_SPECS[p.code];
  if (!spec) return p;
  return { ...p, pinyin: spec.py, loc: spec.loc, use: spec.use, cat: spec.cat, caut: spec.caut };
}

export function resolveRef(raw: string, hint?: RefKind): PointRef | undefined {
  const t = raw.trim();
  if (!t) return;

  if (hint === "ear" || !hint) {
    const ear = EAR_KEYS.find((k) => k.toLowerCase() === t.toLowerCase());
    if (ear) {
      const row = earPoints.find(([l]) => l === ear);
      return { code: ear, label: ear, kind: "ear", loc: row?.[1], use: row?.[2] };
    }
  }

  if (hint === "ynsa" || !hint) {
    const yn = YN_KEYS.find((k) => k.toLowerCase() === t.toLowerCase());
    if (yn) {
      const row = ynsaPoints.find(([l]) => l === yn);
      const hit = ynsaMap.find((p) => p.label === yn);
      return {
        code: yn,
        label: yn,
        kind: "ynsa",
        loc: row?.[1],
        use: row?.[2],
        view: hit?.view,
      };
    }
  }

  const extra = EXTRA_KEYS.find((k) => k.toLowerCase() === t.toLowerCase());
  if (extra) {
    const spec = EXTRA_SPECS[extra];
    return {
      code: extra,
      label: extra,
      kind: "extra",
      pinyin: spec.py,
      loc: spec.loc,
      use: spec.use,
      cat: spec.cat,
      caut: spec.caut,
      meridianId: "extra",
    };
  }

  const code = atlasCode(t);
  if (code) {
    const p = hydrateBody(code);
    if (p) {
      return {
        code: p.code,
        label: p.code,
        kind: "body",
        pinyin: p.pinyin,
        loc: p.loc,
        use: p.use,
        cat: p.cat,
        caut: p.caut,
        photo: p.photo,
        meridianId: p.meridianId,
      };
    }
  }

  return;
}

const BODY_RE =
  /\b(?:(?:VG|VC|IG|ID|CS|TA|VB|BP|LU|LI|ST|SP|HT|SI|BL|KI|PC|TE|SJ|TB|GB|LR|LV|GV|CV|DU|REN)[- ]?\d{1,2}|[PECBRF]\d{1,2}|Y-[A-Z]{1,3}|S[1-4]|M1)\b/gi;

export function tokenizePoints(text: string): Array<{ t: string; ref?: PointRef }> {
  const extras = EXTRA_KEYS.join("|").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const re = new RegExp(`(${extras})|${BODY_RE.source}`, "gi");
  const out: Array<{ t: string; ref?: PointRef }> = [];
  let last = 0;
  let m: RegExpExecArray | null;
  const src = text;
  while ((m = re.exec(src))) {
    if (m.index > last) out.push({ t: src.slice(last, m.index) });
    const raw = m[0];
    const hint = /^Y-|^S[1-4]$|^M1$/i.test(raw) ? "ynsa" : undefined;
    const ref = resolveRef(raw, hint);
    out.push(ref ? { t: raw, ref } : { t: raw });
    last = m.index + m[0].length;
  }
  if (last < src.length) out.push({ t: src.slice(last) });
  return out.length ? out : [{ t: text }];
}
