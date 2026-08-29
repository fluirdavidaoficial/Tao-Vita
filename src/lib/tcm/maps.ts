import { earPoints, ynsaPoints } from "./protocols";

export type AtlasMapPoint = {
  id: string;
  label: string;
  x: number;
  y: number;
  use: string;
  loc?: string;
  view?: "ynsa-front" | "ynsa-lateral" | "ynsa-occiput";
};

/** Alias usado no repositório original. */
export type MapPoint = AtlasMapPoint;


const earMeta = Object.fromEntries(earPoints.map(([label, loc, use]) => [label, { loc, use }]));
const ynMeta = Object.fromEntries(ynsaPoints.map(([label, loc, use]) => [label, { loc, use }]));

function E(label: string, x: number, y: number, loc?: string, use?: string): AtlasMapPoint {
  const meta = earMeta[label];
  return {
    id: label,
    label,
    x,
    y,
    loc: loc ?? meta?.loc,
    use: use ?? meta?.use ?? "Ponto de orelha usado nos protocolos.",
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

/** Percent coordinates on the 3:4 YNSA plates. */
export const ynsaMap: AtlasMapPoint[] = [
  Y("A", "A", "ynsa-front", 45, 40),
  Y("B1", "B1", "ynsa-front", 34, 43),
  Y("C1", "C1", "ynsa-front", 26, 49),
  Y("C2", "C2", "ynsa-front", 23, 57),
  Y("M1", "M1", "ynsa-front", 50, 33),
  Y("S1", "S1", "ynsa-front", 42, 63),
  Y("S2", "S2", "ynsa-front", 50, 67),
  Y("S3", "S3", "ynsa-front", 49, 82),

  Y("D", "D", "ynsa-lateral", 50, 53),
  Y("S4", "S4", "ynsa-lateral", 62, 58),
  Y("Y-C", "Y-C", "ynsa-lateral", 42, 37),
  Y("Y-P", "Y-P", "ynsa-lateral", 37, 42),
  Y("Y-IG", "Y-IG", "ynsa-lateral", 35, 48),
  Y("Y-TA", "Y-TA", "ynsa-lateral", 47, 47),
  Y("Y-ID", "Y-ID", "ynsa-lateral", 55, 41),
  Y("Y-B", "Y-B", "ynsa-lateral", 61, 40),
  Y("Y-E", "Y-E", "ynsa-lateral", 36, 54),
  Y("Y-VB", "Y-VB", "ynsa-lateral", 53, 56),
  Y("Y-BP", "Y-BP", "ynsa-lateral", 40, 59),
  Y("Y-R", "Y-R", "ynsa-lateral", 58, 50),
  Y("Y-F", "Y-F", "ynsa-lateral", 47, 61),

  Y("A-yang", "A", "ynsa-occiput", 45, 64, "Básico Yang · nuca", "Cervical e cabeça. Ipsilateral à queixa motora."),
  Y("B1-yang", "B1", "ynsa-occiput", 37, 58, "Básico Yang", "Ombro / torácico, face posterior."),
  Y("C1-yang", "C1", "ynsa-occiput", 29, 55, "Básico Yang", "Membro superior, somatotopia posterior."),
  Y("C2-yang", "C2", "ynsa-occiput", 31, 68, "Básico Yang", "Membro inferior, somatotopia posterior."),
  Y("M1-post", "M1", "ynsa-occiput", 50, 40, "Cérebro posterior", "Cérebro / Shen. Palpação da nuca só como guia de estudo."),
];
