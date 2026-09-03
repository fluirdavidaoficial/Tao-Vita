/** Material de estudo original (paráfrase didática). Não reproduz texto de livro. */

export function tonguePlate(img: string) {
  return `/images/tongue/${img}.jpg`;
}

export const TONGUE_FACTORS = [
  {
    t: "Cor do corpo",
    d: "Vermelho-clara é o esperado. Pálida, vermelha, vermelho-escura ou roxo-azulada mudam o quadro. A cor fala de Qi, Xue, calor, frio e estase.",
  },
  {
    t: "Forma",
    d: "Tamanho, marcas de dente, magreza, fissuras, papilas em espinho, manchas. Viçosa (mole, corpulenta) tende a vazio/frio; envelhecida (rígida, opaca) tende a plenitude/calor.",
  },
  {
    t: "Aspecto / movimento",
    d: "Ágil e viva. Rígida, mole, retraída, desviada, trêmula ou parética mudam a leitura — sobretudo de vento interno.",
  },
  {
    t: "Cor da saburra",
    d: "Branca (exterior/frio), amarela (interior/calor), cinza ou negra (interior mais grave). Amarelo-clara, escura ou queimada marcam a intensidade do calor.",
  },
  {
    t: "Qualidade da saburra",
    d: "Fina (vê-se o corpo) vs espessa; úmida vs seca/áspera; pegajosa vs deteriorada (queijo de soja); geográfica, espelho, desigual, verdadeira (com raiz) vs falsa (solta).",
  },
] as const;

export const TONGUE_ZONES = [
  {
    id: "ponta",
    label: "Ponta",
    x: 50,
    y: 24,
    organ: "Coração / Shen",
    jiao: "Jiao superior",
    use: "Ponta vermelha: Fogo do Coração ou calor no Shen. Pálida: Xue ou Qi em vazio. Pontos vermelhos: calor no Xue. Fala, sono e inquietação leem-se aqui.",
  },
  {
    id: "pulmao",
    label: "Pulmão",
    x: 50,
    y: 36,
    organ: "Pulmão",
    jiao: "Jiao superior",
    use: "Faixa entre a ponta e o centro. Saburra e cor falam de exterior, Qi do Pulmão e Wei. Branca fina no início de ataque externo; amarela quando o calor entra.",
  },
  {
    id: "centro",
    label: "Centro",
    x: 50,
    y: 50,
    organ: "Estômago / Baço",
    jiao: "Jiao médio",
    use: "A saburra nasce da evaporação do Qi do Estômago. Gordurosa: umidade-Tan. Amarela seca: calor no Yangming. Espelho / ausente: Yin do Estômago lesado. A língua é o broto do Coração e o reflexo do Baço.",
  },
  {
    id: "lados",
    label: "Lado E",
    x: 30,
    y: 48,
    organ: "Fígado / Vesícula",
    jiao: "Jiao médio",
    use: "Bordos vermelhos ou tensos: Qi do Fígado estagnado ou Fogo. Roxo: estase de Xue. Inchados: umidade no Jueyin. Compare os dois lados — assimetria também conta.",
  },
  {
    id: "lados2",
    label: "Lado D",
    x: 70,
    y: 48,
    organ: "Fígado / Vesícula",
    jiao: "Jiao médio",
    use: "Mesmo campo do lado esquerdo. Compare cor, marcas e saburra entre esquerda e direita.",
  },
  {
    id: "raiz",
    label: "Raiz",
    x: 50,
    y: 66,
    organ: "Rim / jiao inferior",
    jiao: "Jiao inferior",
    use: "Saburra suja ou amarela na raiz: umidade-calor no inferior (Bexiga, intestinos, útero). Sem saburra e seca: Yin do Rim. Veias sublinguais inchadas e escuras: estase.",
  },
] as const;

export const TONGUE_STEPS = [
  {
    t: "Luz",
    d: "Luz natural de frente. Evite parede colorida e reflexo. À noite, luz branca fria e, se possível, confira de novo de dia — a cor muda com o ambiente.",
  },
  {
    t: "Postura",
    d: "Boca aberta, língua relaxada, ponta caindo à frente. Forçar, enrolar ou deixar muito tempo lá fora congestiona e falseia a cor. Se ficar tensa, peça para treinar e repita em segundos.",
  },
  {
    t: "Ordem",
    d: "Primeiro a saburra (há? espessa? pegajosa? cor? úmida ou seca?). Depois o corpo (cor, manchas, tamanho, marcas, movimento). Percorra da ponta à raiz. Por fim, com cuidado, as veias debaixo da língua.",
  },
  {
    t: "Alimentação",
    d: "Comida, chá, ferro e alguns fármacos tingem a saburra — falsa imagem. Raspar a língua a afina. Gelado, picante ou respirar pela boca alteram umidade. Anote o que veio antes do exame.",
  },
  {
    t: "Estações",
    d: "Mesmo em quem está bem, a saburra muda com o ano. Verão: mais espessa, às vezes amarelo-clara. Outono: fina e mais seca. Inverno: mais úmida. Não leia a estação como quadro.",
  },
  {
    t: "Quatro exames",
    d: "Língua sozinha enviesa. Cruze com pulso, queixa e fatores. Corpo vermelho com saburra branca úmida, por exemplo, pede leitura conjunta — calor num plano e umidade noutro.",
  },
] as const;

export const TONGUE_SIGN_GROUPS = ["Cor", "Forma", "Mobilidade", "Saburra", "Qualidade"] as const;

export const TONGUE_SIGNS = [
  {
    id: "normal",
    grupo: "Cor",
    t: "Vermelho-clara",
    img: "normal",
    d: "Cor viva, úmida, forma harmônica, movimento ágil. Saburra branca, fina e úmida — nem escorregadia nem seca. Também aparece no início de ataque externo leve. É o padrão contra o qual se lê o resto.",
  },
  {
    id: "palida",
    grupo: "Cor",
    t: "Pálida",
    img: "pale-teeth",
    d: "Mais clara que o esperado. Yang, Qi ou Xue em vazio; frio. Com marcas de dente e umidade: Qi do Baço que não transforma. Magra e pálida: Xue em vazio.",
  },
  {
    id: "vermelha",
    grupo: "Cor",
    t: "Vermelha",
    img: "red",
    d: "Mais escura que o normal: calor. Pleno (com saburra) ou vazio de Yin (pouca saburra, seca). Ponta vermelha: Coração; lados: Fígado. Cruze com sede, pulso e o resto do exame.",
  },
  {
    id: "carmesim",
    grupo: "Cor",
    t: "Vermelho-escura",
    img: "deep-red",
    d: "Calor no Ying/Xue ou Yin muito lesado. Quadro mais interior. Pouca saburra e seca reforçam consumo de fluidos. Cruze com febre, sede e pulso — a língua sozinha não fecha o caso.",
  },
  {
    id: "roxa",
    grupo: "Cor",
    t: "Roxo-azulada",
    img: "purple",
    d: "Estase de Xue. Roxo úmido e claro: frio que coagula. Roxo seco e escuro: calor que estagna Qi e Xue. Manchas e veias sublinguais escuras somam o mesmo eixo.",
  },
  {
    id: "inchada",
    grupo: "Forma",
    t: "Inchada / dentes",
    img: "pale-teeth",
    d: "Corpo largo que marca os dentes (roda dentada): umidade, Tan ou Qi do Baço fraco. Pálida inchada e muito úmida: Yang xu com água. Vermelho-escura inchada: calor no Coração/Baço.",
  },
  {
    id: "magra",
    grupo: "Forma",
    t: "Magra",
    img: "pale-thin",
    d: "Corpo pequeno e fino. Pálida: Qi e Xue em vazio. Vermelho-escura: Yin xu com fogo. Seca e atrofiada: fluidos e Yin no limite. Distinga da fissurada — aqui o volume some.",
  },
  {
    id: "fissurada",
    grupo: "Forma",
    t: "Fissurada",
    img: "cracked",
    d: "Sulcos na superfície. Centro: Estômago. Por toda a língua: Yin dos Rins e fluidos. Vermelho-escura: calor que consome Yin. Pálida e fina: Xue em vazio. Fissura antiga sem outros sinais pode ser variação.",
  },
  {
    id: "espinhosa",
    grupo: "Forma",
    t: "Espinhosa / morango",
    img: "prickles",
    d: "Papilas hipertrofiadas, ásperas ao toque: calor perverso em hiperatividade. Pontos estrelados na metade anterior (língua de morango): calor no Xue. Ponta vermelha com pontinhos: Fogo do Coração.",
  },
  {
    id: "veias",
    grupo: "Forma",
    t: "Veias sublinguais",
    img: "sublingual",
    d: "Vire a língua só o suficiente. Veias inchadas, azul-violeta e tortuosas: estase de Xue. Finas e claras: leitura mais vazia. Não force se a pessoa engasgar.",
  },
  {
    id: "desvio",
    grupo: "Mobilidade",
    t: "Desvio / rígida / tremor",
    img: "deviation",
    d: "Desvio para um lado: vento interno. Rígida, difícil de falar: calor no Pericárdio, Tan que obstrui ou prenúncio de vento. Mole e atrofiada: Qi/Xue ou Yin no fundo. Trêmula: vento por calor ou por vazio. Retração é sinal grave.",
  },
  {
    id: "branca",
    grupo: "Saburra",
    t: "Branca",
    img: "white-greasy",
    d: "Em geral exterior ou frio. Fina e úmida é esperada. Espessa e pegajosa (como na placa): umidade-frio ou Tan. Branca que vira amarela: o xie interioriza e gera calor.",
  },
  {
    id: "amarela",
    grupo: "Saburra",
    t: "Amarela",
    img: "yellow-greasy",
    d: "Interior e calor (Yangming / Qi). Clara: calor leve. Escura ou queimada: calor mais forte. Amarela gordurosa: umidade-calor. Seca: fluidos lesionados. Também pode aparecer quando o Yang não transforma a umidade.",
  },
  {
    id: "negra",
    grupo: "Saburra",
    t: "Cinza / negra",
    img: "black",
    d: "Em geral evolução de amarela queimada ou cinza. Seca e negra: calor extremo que seca os fluidos. Úmida e negra: frio por Yang xu. Verde ou marrom-escuro leem-se no mesmo eixo. Cruze sempre com o pulso — a mesma cor serve a calor ou a frio.",
  },
  {
    id: "gordurosa",
    grupo: "Qualidade",
    t: "Pegajosa / deteriorada",
    img: "white-greasy",
    d: "Pegajosa: grânulos miúdos, suja, difícil de limpar — umidade-Tan, alimento parado, Qi do Estômago que evapora mal. Deteriorada (queijo de soja, solta): calor Yang com turvação. Distinga: pegajosa adere; deteriorada desprende.",
  },
  {
    id: "geografica",
    grupo: "Qualidade",
    t: "Geográfica",
    img: "geographic",
    d: "Ilhas de saburra que somem, com borda em mapa. Qi e Yin do Estômago instáveis, ou Qi/Xue em vazio. A 'flor' (clareiras brilhantes sem mapa) também fala de Qi do Estômago. Não é o espelho — ainda há saburra ao redor.",
  },
  {
    id: "espelho",
    grupo: "Qualidade",
    t: "Espelho / lisa",
    img: "mirror",
    d: "Saburra sumiu por completo: superfície lisa, brilhante, escorregadia. Yin e Qi do Baço-Estômago no limite; fluidos secos. Semi-descamada (granulação nova no claro) é um passo antes. Leitura reservada — cruze com pulso e queixa.",
  },
  {
    id: "desigual",
    grupo: "Qualidade",
    t: "Desigual (ponta / raiz)",
    img: "root-yellow",
    d: "Saburra que não cobre por igual. Branca na ponta e amarela na raiz: xie que interioriza, ou Tan ainda no jiao inferior. Só na raiz: interior residual. Nos dois lados: Fígado/VB. Em toda a língua: umidade no jiao médio. Verdadeira adere (tem raiz); falsa solta ao limpar.",
  },
] as const;

export const PULSE_POSITIONS = [
  { id: "cun-e", label: "Cun E", x: 22, y: 38, side: "Esquerdo", level: "Cun · polegar", organ: "Coração / Intestino delgado", use: "Distal, um Cun à frente da apófise estiloide. Jiao superior esquerdo. Superficial: Fu; profundo: Zang do Coração." },
  { id: "guan-e", label: "Guan E", x: 22, y: 52, side: "Esquerdo", level: "Guan · barreira", organ: "Fígado / Vesícula", use: "Dedo médio sobre a estiloide do rádio — a barreira. Jiao médio. Corda aqui é leitura clássica de Fígado." },
  { id: "chi-e", label: "Chi E", x: 22, y: 66, side: "Esquerdo", level: "Chi · pé", organ: "Rim Yin / Bexiga", use: "Proximal, em direção ao cotovelo. Jiao inferior. A raiz do pulso mora no Chi: se sumir em profundidade, o Jing está fraco." },
  { id: "cun-d", label: "Cun D", x: 78, y: 38, side: "Direito", level: "Cun · polegar", organ: "Pulmão / Intestino grosso", use: "Jiao superior direito. Exterior, Wei e Qi do Pulmão. Flutuante e tenso: ataque de Frio na superfície." },
  { id: "guan-d", label: "Guan D", x: 78, y: 52, side: "Direito", level: "Guan · barreira", organ: "Baço / Estômago", use: "Jiao médio direito. Qi do Estômago (Wei Qi do pulso) sente-se aqui: calmo, com força, não áspero." },
  { id: "chi-d", label: "Chi D", x: 78, y: 66, side: "Direito", level: "Chi · pé", organ: "Rim Yang / Mingmen", use: "Jiao inferior direito. Yang do Rim e fogo do Mingmen. Chi direito vazio e profundo: Yang que não aquece." },
] as const;

export const PULSE_STEPS = [
  { t: "Onde", d: "Cun Kou (Qi Kou) na artéria radial, no punho. Guan na extremidade inferior do rádio (estiloide). Cun é distal, rumo à mão. Chi é proximal, rumo ao cotovelo. Os dois punhos dão seis postos." },
  { t: "Posição", d: "Pessoa sentada ou reclinada. Dorso da mão à altura do peito, palma em supinação, punho solto. Ambiente calmo. Se houve esforço, espere. Quem toma o pulso respira regular e concentra a atenção nos dedos." },
  { t: "Dedos", d: "Mão direita do estudioso no pulso esquerdo da pessoa; mão esquerda no pulso direito. Adulto: três dedos em arco, polpa sobre a artéria. Médio acha o Guan na estiloide; indicador vai ao Cun; anelar ao Chi. Afaste os dedos se a pessoa for alta; junte se for baixa. Criança: um só dedo no Guan — o Cun Kou é curto demais para três postos." },
  { t: "Três pressões", d: "Elevar (举): leve, pele — superfície. Procurar (寻): média, músculo. Apoiar (按): forte, até tendão e osso — profundidade. As três existem em Cun, Guan e Chi. Tome completo (três dedos) e, se um posto pedir, parcial (um dedo)." },
  { t: "Tempo", d: "Não menos que 50 batidas — na prática, um minuto ou mais. Note frequência, ritmo, força, nível, fluidez, amplitude e em qual posto isso aparece. Pulso isolado é raro: o que se sente costuma ser composto." },
] as const;

export const PULSE_NORMAL = {
  freq: "4 batidas por ciclo respiratório (cerca de 60–70/min no adulto em repouso).",
  ritmo: "Regular, calmo — tem Qi do Estômago (Wei).",
  raiz: "Mesma tranquilidade em superfície e profundidade, sobretudo no Chi (tem raiz, Gen).",
  varia: "Criança mais rápido; idoso mais fino; magro um pouco superficial; após esforço ou refeição, mais cheio. Primavera levemente em corda; inverno mais profundo. Artéria que bate no dorso da mão (pulso invertido) é variação anatômica, não quadro.",
};

export const PULSE_IMAGES = [
  { id: "fu", pinyin: "Fú", t: "Superficial", d: "Claro na pele, some ao apoiar. Exterior. Com força: plenitude de superfície. Sem força: Yang que não se ancora." },
  { id: "chen", pinyin: "Chén", t: "Profundo", d: "Só aparece ao apoiar. Interior. Com força: plenitude interna. Sem força: vazio interno." },
  { id: "chi", pinyin: "Chí", t: "Retardado", d: "Menos de 4 batidas por ciclo (<60/min). Frio. Forte: frio em plenitude. Fraco: Yang xu." },
  { id: "shuo", pinyin: "Shuò", t: "Rápido", d: "5 ou mais por ciclo (~90/min). Calor. Forte: calor pleno. Fraco: calor vazio ou Yin xu." },
  { id: "ji", pinyin: "Jí", t: "Apressado", d: "7 ou mais por ciclo. Yang em excesso, Yin a pique. Distinguir do rápido simples." },
  { id: "xu", pinyin: "Xū", t: "Vazio", d: "Sem força nos três postos, pele e osso. Qi e Xue em vazio — o vaso não enche." },
  { id: "shi", pinyin: "Shí", t: "Cheio", d: "Forte em todos os níveis. Xie e Zheng em luta; plenitude." },
  { id: "hua", pinyin: "Huá", t: "Deslizante", d: "Escorrega como contas. Tan, alimento parado, calor pleno. Também pode ser pulso de gravidez ou de Qi/Xue exuberantes." },
  { id: "se", pinyin: "Sè", t: "Áspero", d: "Raspa, não flui. Estase de Qi/Xue, Jing ou Xue em vazio. Forte: estase; fraco: consumo." },
  { id: "xi", pinyin: "Xì", t: "Fino", d: "Fio nítido, sem volume. Qi/Xue vazios ou umidade que estreita o vaso." },
  { id: "ruo", pinyin: "Ruò", t: "Fraco", d: "Fino, profundo, sem força. Qi e Xue juntos em vazio." },
  { id: "wei", pinyin: "Wēi", t: "Tênue", d: "Quase some ao pressionar. Yang de Coração/Rim muito fraco." },
  { id: "hong", pinyin: "Hóng", t: "Vasto", d: "Onda larga que chega forte e parte fraca. Calor exuberante no Qi. Em doença crônica com vazio, é sinal grave." },
  { id: "da", pinyin: "Dà", t: "Grande", d: "Mais largo que o normal, sem a onda do vasto. Forte: calor pleno. Fraco: Qi que não contém." },
  { id: "xian", pinyin: "Xián", t: "Corda", d: "Reto, tenso como corda. Fígado/VB, dor, Tan-Yin. Fino e cortante: leitura reservada." },
  { id: "jin", pinyin: "Jǐn", t: "Tenso", d: "Corda torcida, elástica. Frio, dor, alimento parado. Superficial: frio no exterior; profundo: frio interno." },
  { id: "huan", pinyin: "Huǎn", t: "Lento / moderado", d: "4 batidas com impressão de lentidão. Calmo: pulso normal. Mole: umidade ou Baço-Estômago vazios." },
  { id: "ru", pinyin: "Rú", t: "Mole", d: "Superficial, fino, some ao apoiar. Vazio ou umidade." },
  { id: "kong", pinyin: "Kōu", t: "Cavo", d: "Largo na pele, oco no meio — haste de cebola. Grande perda de sangue ou suor." },
  { id: "san", pinyin: "Sàn", t: "Disperso", d: "Grande, sem raiz, some à menor pressão. Qi correto esgotado." },
  { id: "fu-hidden", pinyin: "Fú", t: "Escondido", d: "Mais fundo que o profundo; empurra tendão até o osso. Frio Yin oculto, Jue." },
  { id: "lao", pinyin: "Láo", t: "Resistente", d: "Cheio, em corda, só no fundo, estável. Acúmulo de frio Yin (massas)." },
  { id: "ge", pinyin: "Gé", t: "Pele de tambor", d: "Corda e cavo, tenso por fora. Perda de Xue ou Jing; Yang flutua." },
  { id: "chang", pinyin: "Cháng", t: "Longo", d: "Ultrapassa Cun e Chi. Yang em excesso ou calor, se rígido. Longo e suave pode ser vigor." },
  { id: "duan", pinyin: "Duǎn", t: "Curto", d: "Não preenche os três postos. Qi deficiente ou Qi estagnado que não chega." },
  { id: "dong", pinyin: "Dòng", t: "Agitado", d: "Deslizante, rápido, num ponto — ervilha. Medo, dor, choque de Qi/Xue." },
  { id: "cu", pinyin: "Cù", t: "Acelerado", d: "Rápido com pausas irregulares. Calor de Yang, estase, Tan. Fino e sem força: colapso." },
  { id: "jie", pinyin: "Jié", t: "Atado", d: "Lento com pausas irregulares. Yin em excesso, Tan-frio, Xue acumulado." },
  { id: "dai", pinyin: "Dài", t: "Periódico", d: "Fraco, lento, pausas regulares e longas. Qi dos órgãos falhando. Distinguir de atado e acelerado." },
] as const;

export const YNSA_GROUPS = [
  { id: "basico", t: "Básicos A–K", d: "Aparelho locomotor. A cervical/cabeça, B ombro, C membro superior, D lombar e membro inferior. E tórax, F ciático, G joelho; H/I acessórios lombares. J/K são somatotopias do pé. Yin na implantação do cabelo; Yang acima da lambdóide." },
  { id: "sensorial", t: "Sensoriais S1–S4", d: "Órgãos dos sentidos, também Yin (fronte) e Yang (nuca). S1 olho, S2 nariz, S3 boca, S4 ouvido. Homolaterais à queixa, salvo exceção." },
  { id: "cerebro", t: "Cérebro M1", d: "Cérebro, cerebelo e gânglios da base numa área pequena acima de A. Imagine o encéfalo em miniatura e palpe o very-point. Muitas vezes contralateral. Shen, motor, enxaqueca." },
  { id: "ypsilon", t: "Ypsilon (Y)", d: "Órgãos internos. Pedem zona diagnóstica abdominal ou cervical antes de escolher o ponto. Rim e Fígado primeiro se várias zonas doem — o restante pode silenciar. Mais complexos: estude os básicos antes." },
] as const;

export const YNSA_METHOD = [
  { t: "Yin e Yang", d: "Frente (Yin) é a somatotopia mais usada. Nuca (Yang) é o espelho, um pouco menor e mais profundo. Pode-se usar as duas no mesmo caso, em sessões diferentes, conforme a palpação." },
  { t: "Sem cun fixo", d: "A cabeça varia. A região é conhecida; o ponto se confirma na palpação — depressão, nódulo, cordão, ponto mais sensível (very-point). O mapa do app é guia de estudo, não substitui o dedo." },
  { t: "Lado", d: "Básicos e sensoriais: em geral homolaterais à queixa motora. Hemiplegia: muitas vezes o lado oposto. Cérebro: tende ao contralateral. Queixa acima do diafragma: compare IG4 dos dois lados e comece pelo mais tenso." },
  { t: "Agulha (estudo)", d: "Polegar fixa o ponto; a agulha entra ~15° um pouco à frente e avança sob o dedo, na gálea — não no periósteo. Sem reação, milímetros mudam o quadro. Não insira agulha extra se a zona diagnóstica já silenciou." },
] as const;

export const YNSA_SOMA = [
  { id: "A", t: "Cabeça / cervical", where: "Linha do cabelo, ao lado da metópica." },
  { id: "B", t: "Ombro / escápula", where: "1 cm lateral a A, ainda no cabelo." },
  { id: "C", t: "Braço / cotovelo / mão", where: "Segue a linha do cabelo rumo à têmpora." },
  { id: "D", t: "Lombar / pelve / perna", where: "Costeleta, à frente da orelha." },
  { id: "E", t: "Tórax / costela", where: "Costeleta, vizinho de D." },
  { id: "F", t: "Ciático", where: "Costeleta, mais posterior." },
  { id: "G", t: "Joelho", where: "Costeleta, um pouco abaixo." },
  { id: "H / I", t: "Acessórios de D", where: "Mesma faixa da costeleta." },
  { id: "S1", t: "Olho", where: "1 cm abaixo de A, na fronte — não no globo." },
  { id: "S2", t: "Nariz", where: "1 cm abaixo de S1." },
  { id: "S3", t: "Boca / dente", where: "1 cm abaixo de S2, ainda acima da sobrancelha." },
  { id: "S4", t: "Ouvido", where: "Perto da orelha, vista lateral." },
  { id: "M1", t: "Cérebro / Shen", where: "1 cm acima de A, rumo ao vértice." },
  { id: "Y", t: "12 canais (órgãos)", where: "Ninho compacto na têmpora." },
] as const;

/** Pontos clássicos sem coordenada calibrada nesta placa — só texto. */
export const YNSA_UNPLOTTED = [
  { id: "J-K", t: "J / K · pé", d: "Somatotopia do pé nos básicos. J e K não estão nesta placa — palpe a região, não invente o ponto no mapa." },
] as const;

export const EAR_ANATOMY = [
  { t: "Feto invertido", d: "O pavilhão lê-se como um feto de cabeça para baixo: lóbulo = cabeça e face; anti-hélice = coluna; escafa = membros superiores; fossa triangular = pelve; concha superior (cymba) = abdomen; concha inferior (cavum) = tórax. Nem todo ponto cabe nessa lógica — alguns vêm da clínica." },
  { t: "Regiões", d: "Hélice e raiz, escafa, anti-hélice (e seus braços em Y), fossa triangular, conchas, trago, antitrago, incisura intertragiana, lóbulo. No dorso: sulco e cartilagem — pontos de imunidade e tríades." },
  { t: "Lado", d: "Os dois pavilhões se mapeiam. Na escola chinesa clássica, Fígado privilegia a orelha direita e Baço a esquerda. A escola brasileira neurofisiológica trata os dois lados pelo achado. Palpe e compare; o app não examina." },
  { t: "Ordem de estudo", d: "Shenmen (fossa triangular) abre a sessão. Simpático / SNV no braço inferior do Y. Depois o ponto da queixa. Protocolo NADA: Shenmen, Simpático, Pulmão, Fígado, Rim. Hipertensão no app é apoio — não substitui conduta médica." },
] as const;

export const EAR_REGIONS = [
  { id: "todos", t: "Todos" },
  { id: "fossa", t: "Fossa" },
  { id: "concha", t: "Concha" },
  { id: "antihelice", t: "Anti-hélice" },
  { id: "escafa", t: "Escafa" },
  { id: "trago", t: "Trago" },
  { id: "lobulo", t: "Lóbulo" },
] as const;

export const SOURCES = [
  { t: "Mai Jing · Wang Shu-he", d: "Clássico do pulso: Cun Kou, Cun/Guan/Chi, três pressões e as imagens do pulso. Base da tela Diagnóstico · Pulso." },
  { t: "Auteroche · exame clínico", d: "Ordem prática de olhar a língua e tomar o pulso (luz, postura, mãos, tempo). Paráfrase didática — o app não reproduz o livro." },
  { t: "Son Tian Pin · Atlas de Semiologia da Língua", d: "Instituto de Medicina Tradicional Chinesa da Beijing (Roca, 1994; original 舌苔図譜). Método, cinco fatores (cor, forma, aspecto, cor e qualidade da saburra) e regiões. Placas do app são originais de estudo — o atlas impresso não foi copiado." },
  { t: "Yamamoto · Nova Craniopuntura", d: "Quatro grupos (básicos, sensoriais, cérebro, Ypsilon), Yin na frente e Yang na nuca. A–C na linha do cabelo; S1–S3 descem a fronte; Ypsilon na têmpora; D–I na costeleta; J/K só no texto (pé, sem placa)." },
  { t: "Schoen / Xie · vet", d: "Transposição dos 14 canais no cão, gato e cavalo, mais Shan-gen, Er-jian, Wei-jian e Bai-hui. Prenhez: não IG4, BP6, B60, B67, VB21. O app não examina." },
  { t: "Mapa de pontos gatilho", d: "Padrões musculares de Travell e Simons (material de estudo tipo Salib). Lombar, tórax, cervical, coxa, perna, ombro e mão. Placas originais — o folheto não foi copiado. Vídeo do local fica reservado." },
  { t: "Atlas auricular A–Z", d: "Feto invertido, regiões do pavilhão, Shenmen primeiro, NADA e lado (escola chinesa vs. brasileira). Pontos extra só entram se já tinham coordenada na placa." },
] as const;
