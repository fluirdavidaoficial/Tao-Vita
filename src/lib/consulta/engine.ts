import type { Protocol, ProtocolSyndrome } from "@/lib/tcm/protocols";

export const FATORES = [
  { id: "frio", label: "Frio" },
  { id: "umidade", label: "Umidade" },
  { id: "estresse", label: "Estresse" },
  { id: "ciclo", label: "Ciclo" },
  { id: "sono", label: "Sono" },
] as const;

export type ConsultaInput = {
  lingua: string;
  saburra: string;
  pulso: string;
  fatores: string[];
};

export function rankSyndromes(protocol: Protocol, input: ConsultaInput) {
  return protocol.ss
    .map((s) => ({ s, pct: score(s, input) }))
    .sort((a, b) => b.pct - a.pct);
}

function score(s: ProtocolSyndrome, input: ConsultaInput) {
  let n = 22;
  const blob = `${s.nome} ${s.mec} ${s.lin} ${s.pul}`.toLowerCase();
  if (input.lingua && blob.includes(input.lingua)) n += 22;
  if (input.pulso && blob.includes(input.pulso)) n += 22;
  if (input.saburra === "gordurosa" && /tan|umidade|gorduros/.test(blob)) n += 12;
  if (input.saburra === "amarela" && /calor|fogo|amarela/.test(blob)) n += 10;
  if (input.saburra === "ausente" && /yin xu|espelho|ausente/.test(blob)) n += 10;
  if (input.fatores.includes("estresse") && /fígado|qi/.test(blob)) n += 10;
  if (input.fatores.includes("ciclo") && /fígado|xue|útero|rim/.test(blob)) n += 10;
  if (input.fatores.includes("frio") && /frio/.test(blob)) n += 12;
  if (input.fatores.includes("umidade") && /umidade|tan/.test(blob)) n += 12;
  if (input.fatores.includes("sono") && /shen|coração|insôn/.test(blob)) n += 8;
  return Math.min(92, n);
}
