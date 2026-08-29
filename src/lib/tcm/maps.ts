export type MapPoint = {
  id: string;
  label: string;
  zone: string;
  use: string;
  x: number;
  y: number;
  view: "ear" | "ynsa-front" | "ynsa-occiput" | "ynsa-lateral";
};

/** % sobre a foto da orelha direita (hélice à esquerda da imagem). */
export const earMap: MapPoint[] = [
  { id: "shenmen", label: "Shenmen", zone: "Fossa triangular", use: "Calma o Shen, dor, insônia, NADA.", x: 52, y: 29, view: "ear" },
  { id: "utero", label: "Útero", zone: "Fossa triangular", use: "Ciclo, cólica, gineco (não na gravidez).", x: 48, y: 25, view: "ear" },
  { id: "ciatico", label: "Ciático", zone: "Anti-hélice superior", use: "Dor que desce a perna.", x: 46, y: 31, view: "ear" },
  { id: "lombar", label: "Lombar", zone: "Anti-hélice", use: "Lombalgia, Rim.", x: 49, y: 35, view: "ear" },
  { id: "rim", label: "Rim", zone: "Cymba (concha superior)", use: "Lombar, zumbido, Jing, asma de fundo.", x: 50, y: 39, view: "ear" },
  { id: "figado", label: "Fígado", zone: "Cymba posterior", use: "Qi do Fígado, TPM, olhos, irritação.", x: 43, y: 41, view: "ear" },
  { id: "simpatico", label: "Simpático", zone: "Cruz inferior da anti-hélice", use: "SNA, cólica, asma, transpiração.", x: 38, y: 40, view: "ear" },
  { id: "estomago", label: "Estômago", zone: "Cruz da hélice", use: "Gastrite, náusea, refluxo.", x: 47, y: 47, view: "ear" },
  { id: "baco", label: "Baço", zone: "Cavum posterior", use: "Digestão, edema, joelho, umidade.", x: 42, y: 51, view: "ear" },
  { id: "pulmao", label: "Pulmão", zone: "Cavum", use: "Asma, pele, NADA, rinite.", x: 47, y: 55, view: "ear" },
  { id: "coracao", label: "Coração", zone: "Centro do cavum", use: "Shen, palpitação, ansiedade.", x: 52, y: 54, view: "ear" },
  { id: "ombro", label: "Ombro", zone: "Escafa", use: "Dor e travamento do ombro.", x: 34, y: 46, view: "ear" },
  { id: "joelho", label: "Joelho", zone: "Anti-hélice", use: "Dor no joelho.", x: 54, y: 42, view: "ear" },
  { id: "cervical", label: "Cervical", zone: "Anti-hélice inferior", use: "Pescoço, torcicolo, irradiação.", x: 56, y: 58, view: "ear" },
  { id: "adrenal", label: "Adrenal", zone: "Tragus", use: "Asma, rinite, fadiga (apoio).", x: 68, y: 52, view: "ear" },
  { id: "pingchuan", label: "Pingchuan", zone: "Tragus", use: "Chiado, crise asmática (apoio).", x: 66, y: 48, view: "ear" },
  { id: "endocrino", label: "Endócrino", zone: "Entalhe intertrágico", use: "Ciclo, menopausa, tireoide (apoio).", x: 66, y: 62, view: "ear" },
  { id: "occipicio", label: "Occipício", zone: "Antitragus", use: "Cefaleia posterior, tontura.", x: 55, y: 66, view: "ear" },
  { id: "tempora", label: "Têmpora", zone: "Antitragus", use: "Enxaqueca temporal.", x: 50, y: 70, view: "ear" },
  { id: "nariz", label: "Nariz", zone: "Tragus / lóbulo alto", use: "Rinite, sinusite.", x: 62, y: 74, view: "ear" },
  { id: "face", label: "Face", zone: "Lóbulo", use: "Paralisia facial, ATM.", x: 52, y: 84, view: "ear" },
  { id: "ouvido", label: "Ouvido", zone: "Escafa / fossa", use: "Zumbido, otalgia.", x: 33, y: 58, view: "ear" },
  { id: "has", label: "Hipertensão", zone: "Sulco posterior da hélice", use: "Apoio à pressão. Não substitui medicação.", x: 28, y: 68, view: "ear" },
];

export const ynsaMap: MapPoint[] = [
  { id: "A", label: "A", zone: "Básico Yin · fronte", use: "Cervical e cabeça. Implantação capilar, ~0,5 cun lat. à linha média. Palpar o mais doloroso.", x: 46, y: 34, view: "ynsa-front" },
  { id: "A2", label: "A", zone: "Básico Yin · fronte", use: "Par contralateral do ponto A.", x: 54, y: 34, view: "ynsa-front" },
  { id: "M1", label: "M1", zone: "Cérebro", use: "Cérebro / Shen: sequela, agitação, insônia (estudo).", x: 50, y: 28, view: "ynsa-front" },
  { id: "B1", label: "B1", zone: "Básico Yin", use: "Ombro e cintura escapular.", x: 38, y: 36, view: "ynsa-front" },
  { id: "C1f", label: "C1", zone: "Básico Yin", use: "Membro superior em linha (frente).", x: 30, y: 40, view: "ynsa-front" },
  { id: "S1", label: "S1", zone: "Sensorial", use: "Olho e cabeça anterior.", x: 42, y: 44, view: "ynsa-front" },
  { id: "S2", label: "S2", zone: "Sensorial", use: "Nariz e seios da face.", x: 50, y: 48, view: "ynsa-front" },
  { id: "S3", label: "S3", zone: "Sensorial", use: "Boca, ATM, face.", x: 50, y: 56, view: "ynsa-front" },
  { id: "D", label: "D", zone: "Básico · costeleta", use: "Lombar e membro inferior. Região da costeleta, anterior à orelha.", x: 48, y: 52, view: "ynsa-lateral" },
  { id: "C1L", label: "C1", zone: "Básico Yin", use: "Braço / membro superior em linha.", x: 46, y: 42, view: "ynsa-lateral" },
  { id: "C2", label: "C2", zone: "Básico Yin", use: "Perna / membro inferior em linha.", x: 50, y: 58, view: "ynsa-lateral" },
  { id: "S4", label: "S4", zone: "Sensorial", use: "Ouvido, zumbido.", x: 62, y: 48, view: "ynsa-lateral" },
  { id: "Y-P", label: "Y-P", zone: "Ypsilon", use: "Canal Pulmão: tosse, asma, pele.", x: 44, y: 36, view: "ynsa-lateral" },
  { id: "Y-IG", label: "Y-IG", zone: "Ypsilon", use: "Intestino Grosso: ombro, face, dentes.", x: 48, y: 32, view: "ynsa-lateral" },
  { id: "Y-C", label: "Y-C", zone: "Ypsilon", use: "Coração: Shen, palpitação.", x: 40, y: 32, view: "ynsa-lateral" },
  { id: "Y-E", label: "Y-E", zone: "Ypsilon", use: "Estômago: náusea, dor abdominal.", x: 50, y: 38, view: "ynsa-lateral" },
  { id: "Y-BP", label: "Y-BP", zone: "Ypsilon", use: "Baço: umidade, fadiga, joelho.", x: 48, y: 44, view: "ynsa-lateral" },
  { id: "Y-F", label: "Y-F", zone: "Ypsilon", use: "Fígado: Qi, TPM, irritação.", x: 52, y: 42, view: "ynsa-lateral" },
  { id: "Y-VB", label: "Y-VB", zone: "Ypsilon", use: "Vesícula: têmpora, flanco, tendão.", x: 54, y: 36, view: "ynsa-lateral" },
  { id: "Y-R", label: "Y-R", zone: "Ypsilon", use: "Rim: lombar, zumbido, Yin.", x: 46, y: 48, view: "ynsa-lateral" },
  { id: "Y-B", label: "Y-B", zone: "Ypsilon", use: "Bexiga: lombar, ciática.", x: 50, y: 50, view: "ynsa-lateral" },
  { id: "Y-TA", label: "Y-TA", zone: "Ypsilon", use: "Sanjiao: têmpora, ouvido, costela.", x: 42, y: 28, view: "ynsa-lateral" },
  { id: "Ayang", label: "A Yang", zone: "Básico Yang · nuca", use: "Cervical posterior e nuca. Palpar o mais tenso.", x: 46, y: 44, view: "ynsa-occiput" },
  { id: "Ayang2", label: "A Yang", zone: "Básico Yang · nuca", use: "Par contralateral.", x: 54, y: 44, view: "ynsa-occiput" },
  { id: "M-oc", label: "M1", zone: "Cérebro", use: "Occipício / cérebro, tontura, vento interno (estudo).", x: 50, y: 36, view: "ynsa-occiput" },
];
