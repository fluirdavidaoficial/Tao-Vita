import type { Protocol, ProtocolSyndrome } from "@/lib/tcm/protocols";

export const PATIENT_KEY = "tv-paciente";
export const SESSION_KEY = "tv-sessao";

export type SessionSheet = {
  patient: string;
  date: string;
  queixa: string;
  zh?: string;
  group?: string;
  syndrome: string;
  mechanism?: string;
  lingua?: string;
  saburra?: string;
  pulso?: string;
  fatores?: string[];
  corpo: string;
  corpoDetail?: string;
  ear: string;
  yn: string;
  extras?: string;
  caut: string;
  tec?: string;
  notes?: string;
  pct?: number;
};

export function todayPt() {
  return new Date().toLocaleDateString("pt-BR");
}

export function loadPatientName() {
  try {
    return localStorage.getItem(PATIENT_KEY) ?? "";
  } catch {
    return "";
  }
}

export function savePatientName(name: string) {
  try {
    const n = name.trim();
    if (n) localStorage.setItem(PATIENT_KEY, n);
  } catch {
    /* ignore quota */
  }
}

export function buildSheet(opts: {
  patient: string;
  queixa: string;
  protocol: Protocol;
  syndrome: ProtocolSyndrome;
  lingua?: string;
  saburra?: string;
  pulso?: string;
  fatores?: string[];
  notes?: string;
  pct?: number;
}): SessionSheet {
  return {
    patient: opts.patient.trim() || "—",
    date: todayPt(),
    queixa: opts.queixa.trim() || opts.protocol.t,
    zh: opts.protocol.zh,
    group: opts.protocol.g,
    syndrome: opts.syndrome.nome,
    mechanism: opts.syndrome.mec,
    lingua: opts.lingua || undefined,
    saburra: opts.saburra || undefined,
    pulso: opts.pulso || undefined,
    fatores: opts.fatores?.length ? opts.fatores : undefined,
    corpo: opts.syndrome.corpo.map(([c]) => c).join(", "),
    corpoDetail: opts.syndrome.corpo.map(([c, n, w]) => `${c} ${n} (${w})`).join("; "),
    ear: opts.syndrome.ear.join(", "),
    yn: opts.syndrome.yn.join(", "),
    extras: opts.syndrome.ex.filter(Boolean).join(", ") || undefined,
    caut: opts.syndrome.caut,
    tec: opts.syndrome.tec,
    notes: opts.notes?.trim() || undefined,
    pct: opts.pct,
  };
}

export function sheetToText(sheet: SessionSheet) {
  const fatores = sheet.fatores?.length ? sheet.fatores.join(", ") : "—";
  return `TAO VITA — ficha de sessão
Data: ${sheet.date}
Paciente: ${sheet.patient}
Queixa: ${sheet.queixa}
Síndrome mais compatível (dados informados): ${sheet.syndrome}${sheet.pct != null ? ` (${sheet.pct}%)` : ""}
Por quê: ${sheet.mechanism ?? "—"}
Língua / saburra / pulso: ${sheet.lingua || "—"} · ${sheet.saburra || "—"} · ${sheet.pulso || "—"}
Fatores: ${fatores}
Corpo: ${sheet.corpoDetail ?? sheet.corpo}
Orelha: ${sheet.ear}
YNSA: ${sheet.yn}
Extras: ${sheet.extras ?? "—"}
Cautelas: ${sheet.caut}
Técnica: ${sheet.tec ?? "—"}
Notas: ${sheet.notes ?? "—"}
Orientação: hidratação, evitar frio local se Bi-frio, retorno conforme evolução.
Apoio educacional — não substitui avaliação presencial. Dados só neste aparelho.`;
}

export function saveSheet(sheet: SessionSheet) {
  try {
    localStorage.setItem(SESSION_KEY, JSON.stringify(sheet));
    localStorage.setItem("tv-ficha", sheetToText(sheet));
    savePatientName(sheet.patient);
  } catch {
    /* ignore quota */
  }
}

export function fileSlug(name: string) {
  const s = name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 40);
  return s || "sessao";
}
