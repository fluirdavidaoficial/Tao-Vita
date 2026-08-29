export type MeridianGroup = "zang" | "fu" | "qi";

export type Meridian = {
  id: string;
  code: string;
  who: string;
  namePt: string;
  nameZh: string;
  element: string;
  group: MeridianGroup;
  count: number;
};

export const meridians: Meridian[] = [
  { id: "pulmao", code: "P", who: "LU", namePt: "Pulmão", nameZh: "手太阴肺经", element: "Metal", group: "zang", count: 11 },
  { id: "baco", code: "BP", who: "SP", namePt: "Baço-Pâncreas", nameZh: "足太阴脾经", element: "Terra", group: "zang", count: 21 },
  { id: "coracao", code: "C", who: "HT", namePt: "Coração", nameZh: "手少阴心经", element: "Fogo", group: "zang", count: 9 },
  { id: "rim", code: "R", who: "KI", namePt: "Rim", nameZh: "足少阴肾经", element: "Água", group: "zang", count: 27 },
  { id: "pericardio", code: "CS", who: "PC", namePt: "Pericárdio", nameZh: "手厥阴心包经", element: "Fogo", group: "zang", count: 9 },
  { id: "figado", code: "F", who: "LR", namePt: "Fígado", nameZh: "足厥阴肝经", element: "Madeira", group: "zang", count: 14 },
  { id: "intestino-grosso", code: "IG", who: "LI", namePt: "Intestino Grosso", nameZh: "手阳明大肠经", element: "Metal", group: "fu", count: 20 },
  { id: "estomago", code: "E", who: "ST", namePt: "Estômago", nameZh: "足阳明胃经", element: "Terra", group: "fu", count: 45 },
  { id: "intestino-delgado", code: "ID", who: "SI", namePt: "Intestino Delgado", nameZh: "手太阳小肠经", element: "Fogo", group: "fu", count: 19 },
  { id: "bexiga", code: "B", who: "BL", namePt: "Bexiga", nameZh: "足太阳膀胱经", element: "Água", group: "fu", count: 67 },
  { id: "sanjiao", code: "TA", who: "TE", namePt: "Triplo Aquecedor", nameZh: "手少阳三焦经", element: "Fogo", group: "fu", count: 23 },
  { id: "vesicula", code: "VB", who: "GB", namePt: "Vesícula Biliar", nameZh: "足少阳胆经", element: "Madeira", group: "fu", count: 44 },
  { id: "du", code: "VG", who: "GV", namePt: "Vaso Governador", nameZh: "督脉", element: "Yang", group: "qi", count: 28 },
  { id: "ren", code: "VC", who: "CV", namePt: "Vaso Conceição", nameZh: "任脉", element: "Yin", group: "qi", count: 24 },
];

export const zangMeridians = meridians.filter((m) => m.group === "zang");
export const fuMeridians = meridians.filter((m) => m.group === "fu");
export const qiMeridians = meridians.filter((m) => m.group === "qi");

export function getMeridian(id: string) {
  return meridians.find((m) => m.id === id || m.code === id);
}
