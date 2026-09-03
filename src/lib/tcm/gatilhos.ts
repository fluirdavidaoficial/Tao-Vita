/** Pontos gatilho para estudo. Paráfrase didática — não reproduz o folheto. */

export type TriggerView =
  | "back-upper"
  | "back-lower"
  | "front"
  | "neck"
  | "leg-front"
  | "leg-back"
  | "foot"
  | "arm"
  | "arm-dorsal";

export type TriggerRegion = "lombar" | "torax" | "cervical" | "coxa" | "perna" | "ombro" | "mao";

export type TriggerPoint = {
  id: string;
  label: string;
  muscle: string;
  region: TriggerRegion;
  view: TriggerView;
  x: number;
  y: number;
  loc: string;
  referral: string;
  use: string;
};

export const TRIGGER_VIEWS: { id: TriggerView; t: string; src: string; aspect: "2/3" | "3/4" | "1/1" }[] = [
  { id: "back-upper", t: "Costas · alto", src: "/images/trigger/back-upper.jpg", aspect: "2/3" },
  { id: "back-lower", t: "Costas · baixo", src: "/images/trigger/back-lower.jpg", aspect: "2/3" },
  { id: "front", t: "Frente", src: "/images/trigger/front.jpg", aspect: "2/3" },
  { id: "neck", t: "Cabeça e pescoço", src: "/images/trigger/neck.jpg", aspect: "3/4" },
  { id: "leg-front", t: "Perna · frente", src: "/images/trigger/leg-front.jpg", aspect: "2/3" },
  { id: "leg-back", t: "Perna · trás", src: "/images/trigger/leg-back.jpg", aspect: "2/3" },
  { id: "foot", t: "Planta do pé", src: "/images/trigger/foot.jpg", aspect: "1/1" },
  { id: "arm", t: "Braço · frente", src: "/images/trigger/arm.jpg", aspect: "2/3" },
  { id: "arm-dorsal", t: "Braço · dorso", src: "/images/trigger/arm-dorsal.jpg", aspect: "2/3" },
];

export const TRIGGER_REGIONS: { id: TriggerRegion | "todos"; t: string }[] = [
  { id: "todos", t: "Todos" },
  { id: "lombar", t: "Lombar e ciática" },
  { id: "torax", t: "Tórax" },
  { id: "cervical", t: "Cervical e cabeça" },
  { id: "coxa", t: "Coxa e joelho" },
  { id: "perna", t: "Perna e pé" },
  { id: "ombro", t: "Ombro e braço" },
  { id: "mao", t: "Antebraço e mão" },
];

export const TRIGGER_STEPS = [
  { t: "O que é", d: "Nódulo em faixa tensa do músculo. À palpação, a dor local pode disparar um mapa conhecido — a dor referida. O X no atlas é o gatilho; a zona pintada nos livros clássicos é para onde ela costuma ir." },
  { t: "Como palpar", d: "Faixa tensa, nódulo, salto ou queixa que o estudioso reproduz. Pressão firme e breve. Se a pessoa prender a respiração ou se afastar, alivie. Não force sobre nervo, pulso ou osso fino." },
  { t: "Lado e profundidade", d: "Compare os dois lados. Superficial e fundo no mesmo músculo (quadrado lombar, multífido) mudam o mapa. O desenho é guia — o dedo confirma." },
  { t: "Vídeo", d: "Abaixo do mapa fica um espaço reservado para o filme da palpação daquele músculo. Enquanto o arquivo não entra, leia localização e mapa referido." },
  { t: "Limite", d: "O app não examina. Dor que desce a perna, perda de força, febre ou trauma pedem avaliação presencial. Gatilho não substitui canal, pulso nem língua." },
] as const;

function P(
  id: string,
  label: string,
  muscle: string,
  region: TriggerRegion,
  view: TriggerView,
  x: number,
  y: number,
  loc: string,
  referral: string,
): TriggerPoint {
  return { id, label, muscle, region, view, x, y, loc, referral, use: loc };
}

export const TRIGGER_POINTS: TriggerPoint[] = [
  /* —— Lombar e ciática —— */
  P("ql", "Q. lombar", "Quadrado lombar", "lombar", "back-lower", 40, 30,
    "Entre a 12ª costela e a crista ilíaca, lateral aos eretores. Superficial perto da crista; fundo junto aos processos transversos.",
    "Crista ilíaca, sacro, trocânter maior; às vezes virilha. Costuma mimetizar lombalgia e dor sacroilíaca."),
  P("mult-l2", "Multífido L2", "Multífido lombar", "lombar", "back-lower", 47, 26,
    "Paravertebral em L2, fundo, junto à lâmina.",
    "Faixa local e, à frente, baixo-ventre (o mapa clássico abre no abdome)."),
  P("mult-s", "Multífido sacro", "Multífido sacral", "lombar", "back-lower", 47, 42,
    "S1–S4, ao lado da crista sacral média.",
    "Nádega e face posterior da coxa — não confundir com ciático verdadeiro."),
  P("gmed1", "Glúteo méd. 1", "Glúteo médio TrP1", "lombar", "back-lower", 28, 42,
    "Fibras anteriores, logo abaixo da crista ilíaca no flanco.",
    "Sacro, crista posterior e região sacroilíaca."),
  P("gmed2", "Glúteo méd. 2", "Glúteo médio TrP2", "lombar", "back-lower", 32, 50,
    "Meio do músculo, na face lateral da nádega.",
    "Nádega e face posterior da coxa."),
  P("gmed3", "Glúteo méd. 3", "Glúteo médio TrP3", "lombar", "back-lower", 40, 44,
    "Fibras posteriores, perto da EIPS.",
    "Ao longo da crista ilíaca rumo ao sacro."),
  P("pir1", "Piriforme 1", "Piriforme TrP1", "lombar", "back-lower", 34, 54,
    "Meio da nádega, na linha EIPS–trocânter, porção lateral.",
    "Sacro, nádega e posterior da coxa (padrão em ciática)."),
  P("pir2", "Piriforme 2", "Piriforme TrP2", "lombar", "back-lower", 42, 52,
    "Mais medial, perto do bordo lateral do sacro.",
    "Nádega profunda; pode somar-se ao mapa do TrP1."),
  P("psoas", "Psoas", "Psoas-ilíaco", "lombar", "front", 54, 50,
    "Lateral ao umbigo, fundo (parede abdominal relaxada). Também na virilha, no ilíaco.",
    "Lombar, sacroilíaca, virilha e face anterior da coxa."),

  /* —— Tórax —— */
  P("mult-t4", "Multífido T4", "Multífido torácico", "torax", "back-upper", 47, 34,
    "Paravertebral em T4–T5, fundo.",
    "Faixa local no dorso médio; o mapa clássico também abre à frente no tórax."),
  P("trap-mid", "Trapézio médio", "Trapézio (fibras médias)", "torax", "back-upper", 40, 38,
    "Entre a coluna torácica alta e o bordo medial da escápula.",
    "Acrômio e espaço interescapular."),
  P("romb", "Romboides", "Romboides maior/menor", "torax", "back-upper", 42, 42,
    "Bordo medial da escápula, entre C7 e T5.",
    "Faixa ao longo do bordo medial da escápula."),
  P("elev", "Elev. escápula", "Elevador da escápula", "torax", "back-upper", 36, 28,
    "Ângulo superior da escápula e, acima, no pescoço posterolateral (C1–C4).",
    "Pescoço posterolateral e ombro posterior. Limitação à rotação."),
  P("sps", "Serrato post. sup.", "Serrato posterior superior", "torax", "back-upper", 42, 34,
    "Sob a escápula alta, costelas 2–5, fundo.",
    "Escápula, ombro posterior e bordo ulnar do membro (até o 5º dedo)."),

  /* —— Cervical e cabeça —— */
  P("trap-up", "Trapézio alto", "Trapézio (fibras superiores)", "cervical", "neck", 60, 70,
    "Meio da cinta do trapézio, entre C7 e o acrômio.",
    "Têmpora, mandíbula, atrás da orelha e face lateral da cabeça — clássico de cefaleia tensional."),
  P("semi", "Semiespinhal", "Semiespinhal da cabeça", "cervical", "neck", 58, 34,
    "Nuca, entre o occipital e C2–C4, superficial (capitis) ou um pouco abaixo.",
    "Vértice, testa e faixa em capacete."),
  P("mult-c", "Multífido cervical", "Multífido cervical", "cervical", "neck", 56, 40,
    "Fundo na nuca, junto às lâminas cervicais baixas.",
    "Occipital e pescoço posterior."),
  P("suboc", "Suboccipitais", "Suboccipitais", "cervical", "neck", 52, 36,
    "Entre a linha nucal e C1–C2, fundo, atrás da orelha.",
    "Têmpora, órbita e “dor atrás do olho”."),
  P("ecm", "ECM", "Esternocleidomastoideo", "cervical", "neck", 46, 54,
    "Ventre esternal e clavicular, da mastoide ao manúbrio/clavícula. Palpe com a cabeça levemente virada.",
    "Vértice, testa, olho, orelha, garganta e seio. Mapa largo — leia os dois ventres."),
  P("masseter", "Masseter", "Masseter", "cervical", "neck", 36, 48,
    "Ramo e ângulo da mandíbula, superfícial e fundo. Boca entreaberta.",
    "Dentes, ATM, orelha e sobrancelha. Travamento da boca entra neste músculo."),

  /* —— Coxa e joelho —— */
  P("gmin", "Glúteo mín.", "Glúteo mínimo", "coxa", "back-lower", 30, 50,
    "Fundo no flanco da nádega, anterior ou posterior ao médium. Palpe fundo rumo ao ilíaco.",
    "Face lateral da coxa e da perna até o tornozelo — a “ciática” do glúteo mínimo."),
  P("vl1", "Vasto lat. alto", "Vasto lateral (alto)", "coxa", "leg-front", 70, 26,
    "Terço proximal da face lateral da coxa, sob o TFL/banda iliotibial.",
    "Face lateral da coxa rumo ao joelho. (No folheto de estudo a placa da coxa às vezes vem com rótulo trocado; o desenho é o vasto lateral.)"),
  P("vl2", "Vasto lat. médio", "Vasto lateral (médio)", "coxa", "leg-front", 70, 36,
    "Meio da face lateral da coxa.",
    "Faixa lateral até o joelho."),
  P("vl3", "Vasto lat. baixo", "Vasto lateral (baixo)", "coxa", "leg-front", 68, 44,
    "Acima do côndilo lateral, ainda na coxa.",
    "Joelho lateral."),
  P("tfl", "TFL", "Tensor da fáscia lata", "coxa", "leg-front", 68, 16,
    "Anterior e um pouco distal ao trocânter maior.",
    "Face lateral da coxa até o joelho (junto da banda iliotibial)."),
  P("rf", "Reto femoral", "Reto femoral", "coxa", "leg-front", 62, 22,
    "Proximal, abaixo da EIAS / origem no ilíaco.",
    "Joelho anterior. Quadríceps que “puxa” a patela."),
  P("sart", "Sartório", "Sartório", "coxa", "leg-front", 58, 30,
    "Três sítios ao longo da cinta: alto (EIAS), meio da coxa e distal medial. O ponto no mapa é o médio.",
    "Faixa superficial no trajeto do músculo — pouco irradiada."),
  P("vm", "Vasto medial", "Vasto medial", "coxa", "leg-front", 56, 44,
    "Acima do côndilo medial, o “lágrima” do quadríceps.",
    "Joelho medial e, às vezes, a patela."),
  P("adut", "Adutores", "Adutor longo e magno", "coxa", "leg-front", 54, 32,
    "Meio da face medial da coxa. O magno é mais fundo e distal.",
    "Virilha, face medial da coxa e joelho medial."),
  P("popl", "Poplíteo", "Poplíteo", "coxa", "leg-back", 38, 48,
    "Fundo na fossa poplítea, distal à linha articular, com o joelho semi-fletido.",
    "Joelho posterior."),
  P("isq-m", "Isquios. medial", "Semitendíneo / semimembranáceo", "coxa", "leg-back", 38, 30,
    "Meio da face posterior da coxa, porção medial.",
    "Ísquio, posterior da coxa e, às vezes, panturrilha alta."),
  P("isq-l", "Isquios. lateral", "Bíceps femoral", "coxa", "leg-back", 32, 32,
    "Meio da face posterior da coxa, porção lateral (as duas cabeças).",
    "Posterior da coxa e joelho lateral."),

  /* —— Perna e pé —— */
  P("ta", "Tibial ant.", "Tibial anterior", "perna", "leg-front", 64, 58,
    "Terço proximal da face anterolateral da perna, lateral à crista da tíbia.",
    "Dorso do pé e hálux."),
  P("per", "Perônios", "Fibular longo e curto", "perna", "leg-front", 70, 65,
    "Face lateral da fíbula: longo mais alto, curto mais baixo; o terceiro perto do tornozelo anterior.",
    "Maléolo lateral e bordo lateral do pé."),
  P("edl", "Ext. longo dedos", "Extensor longo dos dedos e do hálux", "perna", "leg-front", 64, 70,
    "Terço médio-distal da face anterior da perna, lateral ao tibial anterior.",
    "Dorso dos dedos e do hálux."),
  P("edb", "Ext. curto pé", "Extensor curto dos dedos e do hálux", "perna", "leg-front", 66, 84,
    "Dorso do pé, logo à frente do maléolo lateral / ventre carnoso no dorso.",
    "Dorso do pé, perto do gatilho."),
  P("gc-m", "Gastroc. medial", "Gastrocnêmio cabeça medial", "perna", "leg-back", 40, 58,
    "Ventre medial da panturrilha, terço proximal-médio.",
    "Panturrilha, oco do joelho e planta / arco medial."),
  P("gc-l", "Gastroc. lateral", "Gastrocnêmio cabeça lateral", "perna", "leg-back", 32, 58,
    "Ventre lateral da panturrilha, terço proximal-médio.",
    "Panturrilha lateral e, às vezes, dorso do pé."),
  P("soleo", "Sóleo", "Sóleo", "perna", "leg-back", 36, 74,
    "Distal na panturrilha, à frente do tendão calcâneo (TrP1) ou mais alto na borda (TrP2–3).",
    "Calcanhar — o mapa clássico mimetiza fasciíte. Também a panturrilha."),
  P("tp", "Tibial post.", "Tibial posterior", "perna", "leg-back", 38, 66,
    "Fundo, terço médio da face posterior, entre a tíbia e a fíbula.",
    "Tendão calcâneo e planta do pé."),
  P("fdl", "Flex. longo dedos", "Flexor longo dos dedos e do hálux", "perna", "leg-back", 36, 70,
    "Terço médio-distal da face posterior da perna, profundo.",
    "Planta e dedos, sobretudo o hálux."),
  P("qp", "Q. plantar", "Quadrado plantar", "perna", "foot", 48, 74,
    "Planta, à frente do calcanhar, fundo na abóbada.",
    "Calcanhar e arco."),
  P("abh", "Abd. hálux", "Abdutor do hálux", "perna", "foot", 32, 68,
    "Bordo medial da planta, do calcanhar rumo ao hálux.",
    "Arco medial e hálux."),
  P("adh", "Flex./adut. hálux", "Flexor curto e adutor do hálux", "perna", "foot", 34, 40,
    "Planta medial, no ventre da bola do pé junto ao 1º metatarso.",
    "Hálux e bola medial."),
  P("ab5", "Abd. 5º / flex. curto", "Abdutor do 5º e flexor curto dos dedos", "perna", "foot", 68, 58,
    "Bordo lateral da planta e ventre central da abóbada (flexor curto).",
    "Bordo lateral e planta média."),

  /* —— Ombro e braço —— */
  P("esc", "Escaleno", "Escalenos", "ombro", "front", 60, 16,
    "Face lateral do pescoço, acima da clavícula, anterior e médio. Palpe com cuidado — plexo e pulmão estão perto.",
    "Peito, bordo medial da escápula, face radial do braço e polegar."),
  P("delt", "Deltoide", "Deltoide", "ombro", "arm", 58, 18,
    "Ventre anterior, médio ou posterior. O ponto no mapa é o anterior/médio, abaixo do acrômio.",
    "Dor local no ombro — pouco irradiada."),
  P("supra", "Supraespinhal", "Supraespinhal", "ombro", "back-upper", 34, 30,
    "Fossa supraespinhal, fundo sob o trapézio.",
    "Deltoide médio e face lateral do braço."),
  P("infra", "Infraespinhal", "Infraespinhal", "ombro", "back-upper", 32, 40,
    "Fossa infraespinhal, corpo da escápula.",
    "Ombro anterior, braço e face radial da mão."),
  P("subesc", "Subescapular", "Subescapular", "ombro", "arm", 48, 16,
    "Face anterior da escápula, alcançada pela axila com o braço em leve abdução.",
    "Ombro posterior e punho (como um relógio)."),
  P("tmaj", "Redondo maior", "Redondo maior", "ombro", "back-upper", 30, 48,
    "Bordo lateral baixo da escápula.",
    "Ombro posterior e braço."),
  P("tmin", "Redondo menor", "Redondo menor", "ombro", "back-upper", 28, 42,
    "Bordo lateral da escápula, acima do redondo maior.",
    "Deltoide posterior."),
  P("subcl", "Subclávio", "Subclávio", "ombro", "front", 62, 22,
    "Sob o terço médio da clavícula.",
    "Braço anterior, antebraço radial e polegar."),
  P("pecmin", "Peitoral menor", "Peitoral menor", "ombro", "front", 64, 28,
    "Sob o peitoral maior, rumo ao coracoide / costelas 3–5.",
    "Ombro anterior e braço."),
  P("pecmaj", "Peitoral maior", "Peitoral maior", "ombro", "front", 58, 30,
    "Fibras claviculares e esternais, no ventre do peito. Há também ponto na prega axilar anterior.",
    "Peito, mama e face ulnar do braço."),
  P("biceps", "Bíceps", "Bíceps braquial", "ombro", "arm", 58, 34,
    "Ventre distal das duas cabeças, acima da prega do cotovelo.",
    "Ombro anterior e prega do cotovelo."),
  P("braq", "Braquial", "Braquial", "ombro", "arm", 62, 42,
    "Sob o bíceps, na face anterior do úmero, terço distal.",
    "Base do polegar e punho radial."),
  P("coraco", "Coracobraquial", "Coracobraquial", "ombro", "arm", 52, 22,
    "Alto na face medial do braço, perto do coracoide.",
    "Tríceps, dorso do braço e dorso da mão."),
  P("triceps", "Tríceps", "Tríceps braquial", "ombro", "arm-dorsal", 52, 22,
    "Cabeça longa (axila posterior), lateral e medial. O ponto no mapa é a longa/lateral no dorso do braço.",
    "Ombro posterior, olécrano e antebraço posterior."),

  /* —— Antebraço, pulso e mão —— */
  P("brr", "Braquiorradial", "Braquiorradial", "mao", "arm-dorsal", 58, 38,
    "Terço proximal da face radial do antebraço, ventre carnoso.",
    "Epicôndilo lateral, dorso da primeira comissura."),
  P("supin", "Supinador", "Supinador", "mao", "arm-dorsal", 54, 34,
    "Fundo, distal à cabeça do rádio, sob os extensores.",
    "Epicôndilo lateral e comissura do polegar."),
  P("fds", "Flex. dedos", "Flexor superficial e profundo dos dedos", "mao", "arm", 58, 62,
    "Meio da face anterior do antebraço. Cabeça umeral mais medial; radial mais lateral.",
    "Dedos correspondentes na palma."),
  P("pl", "Palmar longo", "Palmar longo", "mao", "arm", 54, 60,
    "Meio da face anterior do antebraço, no trajeto do tendão palmar.",
    "Palma da mão."),
  P("fpl", "Flex. longo polegar", "Flexor longo do polegar", "mao", "arm", 62, 66,
    "Face anterior radial do antebraço, terço médio.",
    "Polegar, palma radial."),
  P("pron", "Pronador", "Pronador redondo", "mao", "arm", 52, 52,
    "Face anteromedial proximal do antebraço, distal à epitróclea.",
    "Punho radial e polegar."),
  P("ecu", "Ext. ulnar carpo", "Extensor ulnar do carpo", "mao", "arm-dorsal", 48, 48,
    "Face ulnar do dorso do antebraço, terço médio.",
    "Punho ulnar e dorso da mão ulnar."),
  P("ecr", "Ext. radial carpo", "Extensor radial longo/curto do carpo", "mao", "arm-dorsal", 60, 44,
    "Face radial do dorso do antebraço, terço proximal-médio.",
    "Epicôndilo lateral e dorso da mão radial."),
  P("edc", "Ext. dos dedos", "Extensor dos dedos / indicador", "mao", "arm-dorsal", 54, 50,
    "Meio do dorso do antebraço (dedo médio e anular) e distal (indicador — extensor próprio).",
    "Dorso do dedo correspondente."),
  P("inter", "Interósseos", "Interósseos dorsais", "mao", "arm-dorsal", 52, 78,
    "Dorso da mão, entre os metacarpos — sobretudo o 1º (comissura) e o 2º.",
    "Dedos adjacentes e dorso da mão."),
  P("abd5m", "Abd. 5º mão", "Abdutor do 5º dedo", "mao", "arm-dorsal", 40, 80,
    "Bordo ulnar da mão, hipotenar.",
    "5º dedo."),
  P("adp", "Adut. polegar", "Adutor do polegar", "mao", "arm", 50, 82,
    "Comissura palmar, entre o 1º e o 2º metacarpo (o “tesoura” da palma).",
    "Polegar e eminência tenar."),
];

export function triggerPlate(view: TriggerView) {
  return TRIGGER_VIEWS.find((v) => v.id === view)?.src ?? "";
}

export function triggersOn(view: TriggerView, region: TriggerRegion | "todos") {
  return TRIGGER_POINTS.filter((p) => p.view === view && (region === "todos" || p.region === region));
}

export function toAtlasPoint(p: TriggerPoint) {
  return {
    id: p.id,
    label: p.label,
    x: p.x,
    y: p.y,
    use: p.use,
    loc: p.muscle,
    group: p.region,
  };
}
