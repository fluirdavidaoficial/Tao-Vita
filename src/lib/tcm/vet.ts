import type { AtlasMapPoint } from "./maps";

export type VetSpecies = "dog" | "cat" | "horse";
export type VetView = "lateral" | "dorsal" | "head";

type VetRow = {
  id: string;
  label: string;
  body: string;
  name: string;
  loc: string;
  use: string;
  view: VetView;
  dog: [number, number];
  cat: [number, number];
  horse: [number, number];
};

/** Transposição clássica (Schoen / Xie), paráfrase didática. O app não examina. */
export const VET_ROWS: VetRow[] = [
  { id: "GV20", label: "VG20", body: "VG20", name: "Baihui / poll", loc: "Ponto mais alto do crânio, linha média.", use: "Shen, vento, cérebro.", view: "head", dog: [48, 20], cat: [42, 22], horse: [50, 18] },
  { id: "Yintang", label: "Yintang", body: "Yintang", name: "Yintang", loc: "Entre os olhos, linha média.", use: "Shen, face, calma.", view: "head", dog: [20, 48], cat: [18, 50], horse: [24, 44] },
  { id: "Shangen", label: "Shan-gen", body: "VG25", name: "Shan-gen", loc: "Dorso do nariz, linha média.", use: "Alarme, choque, Shen.", view: "head", dog: [12, 54], cat: [12, 56], horse: [12, 58] },
  { id: "Erjian", label: "Er-jian", body: "IG1", name: "Ponta da orelha", loc: "Ápice do pavilhão.", use: "Calor, sangria, alarme.", view: "head", dog: [62, 14], cat: [58, 12], horse: [62, 10] },
  { id: "GB20", label: "VB20", body: "VB20", name: "Fengchi", loc: "Caudal ao occipital, entre as nucais.", use: "Vento, nuca, olho.", view: "head", dog: [52, 42], cat: [48, 40], horse: [52, 32] },
  { id: "GV14", label: "VG14", body: "VG14", name: "Dazhui", loc: "Entre C7 e T1, linha média.", use: "Yang, vento, imunidade, tosse.", view: "dorsal", dog: [36, 30], cat: [34, 32], horse: [34, 28] },
  { id: "BL13", label: "B13", body: "B13", name: "Feishu", loc: "Shu do Pulmão, caudal a T3.", use: "Tosse, asma, pele.", view: "dorsal", dog: [42, 32], cat: [42, 34], horse: [42, 30] },
  { id: "BL18", label: "B18", body: "B18", name: "Ganshu", loc: "Shu do Fígado, caudal a T13/L1 (cão) ou T15 (cavalo).", use: "Fígado, olhos, tendão.", view: "dorsal", dog: [54, 36], cat: [54, 38], horse: [54, 32] },
  { id: "BL20", label: "B20", body: "B20", name: "Pishu", loc: "Shu do Baço, último torácico / primeiro lombar.", use: "Baço, umidade, digestão.", view: "dorsal", dog: [58, 38], cat: [58, 40], horse: [60, 34] },
  { id: "BL23", label: "B23", body: "B23", name: "Shenshu", loc: "Shu do Rim, caudal a L2–L3.", use: "Rim, lombar, Jing.", view: "dorsal", dog: [64, 40], cat: [64, 42], horse: [66, 36] },
  { id: "Baihui", label: "Bai-hui", body: "VG3", name: "Bai-hui lombar", loc: "Espaço lombo-sacro, linha média.", use: "Yang, lombar, pelve, Shen.", view: "dorsal", dog: [70, 42], cat: [70, 44], horse: [72, 36] },
  { id: "Weijian", label: "Wei-jian", body: "VG1", name: "Ponta da cauda", loc: "Ápice da cauda.", use: "Yang, calor, alarme.", view: "lateral", dog: [90, 38], cat: [90, 42], horse: [86, 38] },
  { id: "LU1", label: "P1", body: "P1", name: "Zhongfu", loc: "Espaço intercostal no ombro, craniolateral ao peito.", use: "Tosse, asma, peito. Raso.", view: "lateral", dog: [36, 48], cat: [34, 50], horse: [36, 48] },
  { id: "LI11", label: "IG11", body: "IG11", name: "Quchi", loc: "Depressão lateral do cotovelo, fletido.", use: "Calor, pele, imunidade, cotovelo.", view: "lateral", dog: [34, 62], cat: [32, 62], horse: [34, 56] },
  { id: "LI4", label: "IG4", body: "IG4", name: "Hegu", loc: "Cão/gato: dewclaw / Mc2–Mc3. Cavalo: depressão do carpo.", use: "Dor, face, exterior. Não na prenhez.", view: "lateral", dog: [32, 92], cat: [30, 90], horse: [32, 72] },
  { id: "PC6", label: "CS6", body: "CS6", name: "Neiguan", loc: "Face medial do antebraço, proximal ao carpo, entre tendões.", use: "Náusea, peito, Shen.", view: "lateral", dog: [33, 76], cat: [31, 74], horse: [33, 64] },
  { id: "ST25", label: "E25", body: "E25", name: "Tianshu", loc: "Lateral ao umbigo, flanco.", use: "Intestino. Não na prenhez.", view: "lateral", dog: [52, 52], cat: [50, 52], horse: [54, 46] },
  { id: "GB30", label: "VB30", body: "VB30", name: "Huantiao", loc: "Caudal ao trocânter maior.", use: "Quadril, ciático.", view: "lateral", dog: [70, 42], cat: [68, 44], horse: [70, 36] },
  { id: "BL54", label: "B54", body: "B54", name: "Zhibian / hip", loc: "Fossa glútea, caudal ao quadril.", use: "Nádega, ciático, pelve.", view: "lateral", dog: [72, 48], cat: [70, 50], horse: [72, 42] },
  { id: "BL40", label: "B40", body: "B40", name: "Weizhong", loc: "Meio da prega poplítea.", use: "Lombar, joelho caudal, pele.", view: "lateral", dog: [68, 58], cat: [64, 58], horse: [68, 52] },
  { id: "ST36", label: "E36", body: "E36", name: "Zusanli", loc: "Cranial à tíbia, distal à tuberosidade tibial.", use: "Qi, digestão, imunidade, joelho.", view: "lateral", dog: [64, 68], cat: [62, 66], horse: [66, 58] },
  { id: "GB34", label: "VB34", body: "VB34", name: "Yanglingquan", loc: "Caudodistal à cabeça da fíbula.", use: "Tendão, Shaoyang, joelho.", view: "lateral", dog: [66, 72], cat: [64, 70], horse: [68, 62] },
  { id: "SP6", label: "BP6", body: "BP6", name: "Sanyinjiao", loc: "3 cun proximal ao maléolo medial, caudal à tíbia.", use: "Yin, gineco, edema. Não na prenhez.", view: "lateral", dog: [74, 80], cat: [72, 78], horse: [76, 70] },
  { id: "KI3", label: "R3", body: "R3", name: "Taixi", loc: "Entre maléolo medial e tendão do gastrocnêmio.", use: "Rim, Jing, lombar.", view: "lateral", dog: [76, 82], cat: [74, 80], horse: [78, 72] },
  { id: "BL60", label: "B60", body: "B60", name: "Kunlun", loc: "Entre maléolo lateral e tendão de Aquiles.", use: "Nuca, lombar, parto. Não na prenhez.", view: "lateral", dog: [78, 82], cat: [76, 80], horse: [80, 72] },
  { id: "LR3", label: "F3", body: "F3", name: "Taichong", loc: "Entre Mt2–Mt3, no dorso do pé.", use: "Qi do Fígado, dor, vento.", view: "lateral", dog: [68, 92], cat: [66, 90], horse: [78, 92] },
];

export const VET_SPECIES: { id: VetSpecies; t: string }[] = [
  { id: "dog", t: "Cão" },
  { id: "cat", t: "Gato" },
  { id: "horse", t: "Cavalo" },
];

export const VET_VIEWS: { id: VetView; t: string }[] = [
  { id: "lateral", t: "Corpo" },
  { id: "dorsal", t: "Dorso" },
  { id: "head", t: "Cabeça" },
];

export const VET_PLATES: Record<VetSpecies, Record<VetView, string>> = {
  dog: {
    lateral: "/images/maps/vet-dog.jpg",
    dorsal: "/images/maps/vet-dog-dorsal.jpg",
    head: "/images/maps/vet-dog-head.jpg",
  },
  cat: {
    lateral: "/images/maps/vet-cat.jpg",
    dorsal: "/images/maps/vet-cat-dorsal.jpg",
    head: "/images/maps/vet-cat-head.jpg",
  },
  horse: {
    lateral: "/images/maps/vet-horse.jpg",
    dorsal: "/images/maps/vet-horse-dorsal.jpg",
    head: "/images/maps/vet-horse-head.jpg",
  },
};

export function vetMap(species: VetSpecies, view: VetView): AtlasMapPoint[] {
  return VET_ROWS.filter((r) => r.view === view).map((r) => {
    const [x, y] = r[species];
    return {
      id: r.id,
      label: r.label,
      x,
      y,
      loc: `${r.name} · ${r.loc}`,
      use: r.use,
      group: species,
    };
  });
}

export function getVetRow(id: string) {
  return VET_ROWS.find((r) => r.id === id || r.label === id || r.body === id);
}
