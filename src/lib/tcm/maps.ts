import { earPoints, ynsaPoints } from "./protocols";

export type AtlasMapPoint = {
  id: string;
  label: string;
  x: number;
  y: number;
  use: string;
  loc?: string;
  view?: "ynsa-front" | "ynsa-lateral" | "ynsa-occiput";
  group?: string;
};

/** Alias usado no repositório original. */
export type MapPoint = AtlasMapPoint;

const earMeta = Object.fromEntries(earPoints.map(([label, loc, use]) => [label, { loc, use }]));
const ynMeta = Object.fromEntries(ynsaPoints.map(([label, loc, use]) => [label, { loc, use }]));

const EAR_GROUP: Record<string, string> = {
  Shenmen: "fossa",
  Útero: "fossa",
  Simpático: "antihelice",
  Pulmão: "concha",
  Fígado: "concha",
  Rim: "concha",
  Baço: "concha",
  Coração: "concha",
  Estômago: "concha",
  IG: "concha",
  "Intestino Grosso": "concha",
  "San Jiao": "concha",
  Pele: "concha",
  Cardia: "concha",
  Lombar: "antihelice",
  Cervical: "antihelice",
  Joelho: "antihelice",
  Ciático: "antihelice",
  Hipertensão: "antihelice",
  "Sulco hipotensor": "antihelice",
  Calcanhar: "antihelice",
  Punho: "escafa",
  Cotovelo: "escafa",
  Ombro: "escafa",
  Adrenal: "trago",
  Pingchuan: "trago",
  Nariz: "trago",
  Endócrino: "trago",
  Occipício: "trago",
  Têmpora: "trago",
  Cérebro: "trago",
  Ouvido: "trago",
  Face: "lobulo",
  Bochecha: "lobulo",
};

const YNSA_GROUP: Record<string, string> = {
  A: "basico",
  B1: "basico",
  C1: "basico",
  C2: "basico",
  D: "basico",
  E: "basico",
  F: "basico",
  G: "basico",
  H: "basico",
  I: "basico",
  S1: "sensorial",
  S2: "sensorial",
  S3: "sensorial",
  S4: "sensorial",
  M1: "cerebro",
  "Y-P": "ypsilon",
  "Y-IG": "ypsilon",
  "Y-E": "ypsilon",
  "Y-BP": "ypsilon",
  "Y-C": "ypsilon",
  "Y-ID": "ypsilon",
  "Y-B": "ypsilon",
  "Y-R": "ypsilon",
  "Y-F": "ypsilon",
  "Y-VB": "ypsilon",
  "Y-TA": "ypsilon",
};

function E(label: string, x: number, y: number, loc?: string, use?: string): AtlasMapPoint {
  const meta = earMeta[label];
  return {
    id: label,
    label,
    x,
    y,
    loc: loc ?? meta?.loc,
    use: use ?? meta?.use ?? "Ponto de orelha usado nos protocolos.",
    group: EAR_GROUP[label],
  };
}

function Y(
  id: string,
  label: string,
  view: NonNullable<AtlasMapPoint["view"]>,
  x: number,
  y: number,
  loc?: string,
  use?: string,
): AtlasMapPoint {
  const meta = ynMeta[label];
  return {
    id,
    label,
    view,
    x,
    y,
    loc: loc ?? meta?.loc,
    use: use ?? meta?.use ?? "Ponto YNSA usado nos protocolos.",
    group: YNSA_GROUP[label],
  };
}

/** Percent coordinates on the 3:4 right-ear plate (`/images/maps/ear.jpg`). */
export const earMap: AtlasMapPoint[] = [
  E("Punho", 38, 19, "Escafa alta", "Punho / De Quervain."),
  E("Cotovelo", 33, 27, "Escafa", "Epicondilite, cotovelo."),
  E("Joelho", 41, 29),
  E("Shenmen", 45, 32),
  E("Calcanhar", 30, 31, "Cruz superior, perto da hélice", "Fascite, calcanhar."),
  E("Útero", 41, 36),
  E("Ombro", 36, 38),
  E("Hipertensão", 39, 37, "Sulco da anti-hélice", "Apoio PA. Não substitui medicação."),
  E("Ciático", 36, 41),
  E("Simpático", 32, 42),
  E("Lombar", 45, 43),
  E("Sulco hipotensor", 34, 46, "Sulco inferior da anti-hélice", "Apoio PA."),
  E("Fígado", 49, 46),
  E("Rim", 42, 48),
  E("Estômago", 57, 49),
  E("Intestino Grosso", 41, 51),
  E("IG", 47, 52, "Cymba / IG", "Intestino grosso (sigla nos protocolos)."),
  E("Cardia", 65, 50, "Cruz da hélice", "Cárdia, refluxo, náusea."),
  E("Cervical", 58, 53),
  E("San Jiao", 61, 56, "Cavum, acima do intertragus", "Edema, San Jiao."),
  E("Coração", 55, 59),
  E("Ouvido", 70, 57, "Perto do meato / antitragus", "Zumbido, ouvido."),
  E("Baço", 45, 60),
  E("Pingchuan", 74, 47),
  E("Adrenal", 80, 50),
  E("Nariz", 78, 55),
  E("Têmpora", 68, 61),
  E("Occipício", 64, 65),
  E("Pulmão", 51, 64),
  E("Endócrino", 73, 66),
  E("Cérebro", 61, 68),
  E("Pele", 46, 68, "Cavum, com Pulmão", "Eczema, urticária — apoio."),
  E("Bochecha", 58, 77, "Lóbulo alto", "Paralisia facial, bochecha."),
  E("Face", 64, 83),
];

/** Percent on the unlabeled photo plates (hairline / temple / occiput — Yamamoto). */
export const ynsaMap: AtlasMapPoint[] = [
  Y("M1", "M1", "ynsa-front", 49, 26),
  Y("A", "A", "ynsa-front", 46, 33),
  Y("B1", "B1", "ynsa-front", 36, 34),
  Y("C1", "C1", "ynsa-front", 26, 38),
  Y("C2", "C2", "ynsa-front", 18, 43),
  Y("S1", "S1", "ynsa-front", 47, 38),
  Y("S2", "S2", "ynsa-front", 48, 43),
  Y("S3", "S3", "ynsa-front", 49, 48),

  Y("Y-C", "Y-C", "ynsa-lateral", 46, 30),
  Y("Y-P", "Y-P", "ynsa-lateral", 42, 34),
  Y("Y-ID", "Y-ID", "ynsa-lateral", 54, 30),
  Y("Y-B", "Y-B", "ynsa-lateral", 57, 34),
  Y("Y-TA", "Y-TA", "ynsa-lateral", 49, 35),
  Y("Y-IG", "Y-IG", "ynsa-lateral", 41, 38),
  Y("Y-E", "Y-E", "ynsa-lateral", 44, 41),
  Y("Y-R", "Y-R", "ynsa-lateral", 55, 38),
  Y("Y-VB", "Y-VB", "ynsa-lateral", 52, 41),
  Y("Y-BP", "Y-BP", "ynsa-lateral", 46, 44),
  Y("Y-F", "Y-F", "ynsa-lateral", 50, 44),
  Y("E", "E", "ynsa-lateral", 52, 48),
  Y("D", "D", "ynsa-lateral", 56, 52),
  Y("H", "H", "ynsa-lateral", 51, 55),
  Y("F", "F", "ynsa-lateral", 59, 55),
  Y("G", "G", "ynsa-lateral", 54, 59),
  Y("I", "I", "ynsa-lateral", 58, 59),
  Y("S4", "S4", "ynsa-lateral", 64, 38),

  Y(
    "M1-post",
    "M1",
    "ynsa-occiput",
    50,
    16,
    "Cérebro Yang · vértice",
    "Cérebro / Shen. Palpação da nuca só como guia de estudo.",
  ),
  Y(
    "A-yang",
    "A",
    "ynsa-occiput",
    47,
    44,
    "Básico Yang · lambdóide",
    "Cervical e cabeça, acima da lambdóide. Homolateral à queixa motora.",
  ),
  Y("B1-yang", "B1", "ynsa-occiput", 36, 42, "Básico Yang", "Ombro / torácico, face posterior."),
  Y("C1-yang", "C1", "ynsa-occiput", 26, 44, "Básico Yang", "Membro superior, somatotopia posterior."),
  Y("C2-yang", "C2", "ynsa-occiput", 20, 50, "Básico Yang", "Continuação de C na nuca (cotovelo / mão)."),
];
