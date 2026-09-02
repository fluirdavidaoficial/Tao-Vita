add("B1","Jingming","—","0,1 cun medial e superior ao canto interno do olho.","Olho.","Órbita: raso, sem retroversão.")
add("B2","Zanzhu","—","Extremidade medial da sobrancelha, no supraorbitário.","Olho, cefaleia frontal, sinusite.")
add("B3","Meichong","—","Diretamente acima de B2, 0,5 cun dentro do cabelo.","Cefaleia, olho, nariz.")
add("B4","Quchai","—","1,5 cun lat. a VG24, 0,5 cun dentro do cabelo.","Cefaleia, olho, nariz.")
add("B5","Wuchu","—","0,5 cun posterior a B4.","Cefaleia, epilepsia (apoio).")
add("B6","Chengguang","—","1,5 cun posterior a B5.","Cefaleia, vista.")
add("B7","Tongtian","—","1,5 cun posterior a B6.","Nariz, vértice.")
add("B8","Luoque","—","1,5 cun posterior a B7.","Tontura, vista.")
add("B9","Yuzhen","—","1,3 cun lat. a VG17, na borda superior da protuberância occipital.","Nuca, olho.")
add("B10","Tianzhu","—","1,3 cun lat. a VG15, na inserção do trapézio, linha capilar posterior.","Nuca, cefaleia, olho.")
shu = [
(11,"Dazhu","Hui dos ossos","T1","Ossos, articulações, vento."),
(12,"Fengmen","—","T2","Vento, resfriado, asma."),
(13,"Feishu","Shu do Pulmão","T3","Tosse, asma, pele."),
(14,"Jueyinshu","Shu do Pericárdio","T4","Peito, palpitação."),
(15,"Xinshu","Shu do Coração","T5","Shen, palpitação, insônia."),
(16,"Dushu","Shu do Du","T6","Peito, Qi rebelde."),
(17,"Geshu","Hui do Sangue","T7","Sangue, diafragma, pele."),
(18,"Ganshu","Shu do Fígado","T9","Fígado, olhos, tendão."),
(19,"Danshu","Shu da VB","T10","VB, flanco, amargor."),
(20,"Pishu","Shu do Baço","T11","Baço, umidade, digestão."),
(21,"Weishu","Shu do Estômago","T12","Estômago, náusea."),
(22,"Sanjiaoshu","Shu do San Jiao","L1","Água, edema, San Jiao."),
(23,"Shenshu","Shu do Rim","L2","Rim, lombar, Jing, ouvido."),
(24,"Qihaishu","—","L3","Qi do jiao inferior, lombar."),
(25,"Dachangshu","Shu do IG","L4","Lombar, intestino grosso."),
(26,"Guanyuanshu","—","L5","Lombar baixa, jiao inferior."),
(27,"Xiaochangshu","Shu do ID","S1","Intestino delgado, urina."),
(28,"Pangguangshu","Shu da Bexiga","S2","Bexiga, urina."),
(29,"Zhonglushu","—","S3","Lombar, hérnia."),
(30,"Baihuanshu","—","S4","Lombar, ânus, leucorreia."),
]
for n,py,cat,vert,use in shu:
    add(f"B{n}", py, cat, f"1,5 cun lat. ao processo espinhoso de {vert}.", use)
add("B31","Shangliao","—","1º forame sacral, no meio entre o ânus-posterior e a crista.","Gineco, lombar, urina.","Gravidez: não.")
add("B32","Ciliao","—","2º forame sacral.","Dismenorreia, lombar, urina.","Gravidez: não.")
add("B33","Zhongliao","—","3º forame sacral.","Gineco, intestino.","Gravidez: não.")
add("B34","Xialiao","—","4º forame sacral.","Intestino, urina.","Gravidez: não.")
add("B35","Huiyang","—","0,5 cun lat. ao cóccix.","Ânus, hemorroida, leucorreia.")
add("B36","Chengfu","—","Meio da prega glútea.","Ciático, nádega.")
add("B37","Yinmen","—","6 cun abaixo de B36, na linha B36–B40.","Ciático, posterior da coxa.")
add("B38","Fuxi","—","1 cun acima de B39, no lado medial do tendão do bíceps femoral.","Joelho posterior.")
add("B39","Weiyang","He inferior do San Jiao","Lado lateral da prega poplítea, medial ao bíceps femoral.","Urina, edema, San Jiao.")
add("B40","Weizhong","He-mar · comando lombar","Meio da prega poplítea.","Lombar, ciático, calor no Sangue, pele.")
outer = [
(41,"Fufen","T2","Ombro, vento."),
(42,"Pohu","T3","Pulmão, tristeza, tosse."),
(43,"Gaohuang","T4","Doença crônica, deficiência, tosse."),
(44,"Shentang","T5","Shen, peito."),
(45,"Yixi","T6","Peito, asma."),
(46,"Geguan","T7","Diafragma, vômito."),
(47,"Hunmen","T9","Hun, Fígado, flanco."),
(48,"Yanggang","T10","VB, digestão."),
(49,"Yishe","T11","Yi, Baço, pensamento."),
(50,"Weicang","T12","Estômago."),
(51,"Huangmen","L1","Jiao inferior."),
(52,"Zhishi","L2","Jing, vontade, lombar, urina."),
]
for n,py,vert,use in outer:
    add(f"B{n}", py, "—", f"3 cun lat. ao processo espinhoso de {vert}.", use)
add("B53","Baohuang","—","3 cun lat. ao 2º forame sacral.","Urina, lombar.")
add("B54","Zhibian","—","3 cun lat. ao 4º forame sacral (hiato).","Ciático, nádega, urina.")
add("B55","Heyang","—","2 cun abaixo de B40, entre as duas cabeças do gastrocnêmio.","Lombar, útero.")
add("B56","Chengjin","—","Meio da panturrilha, 5 cun abaixo de B40, no ventre do gastrocnêmio.","Panturrilha, hemorroida.")
add("B57","Chengshan","—","8 cun abaixo de B40, no ventre inferior do gastrocnêmio (V invertido).","Panturrilha, hemorroida, fascite.")
add("B58","Feiyang","Luo","7 cun acima de B60, 1 cun lat. e inf. a B57.","Luo da Bexiga, nuca, hemorroida.")
add("B59","Fuyang","Xi do Yang Qiao","3 cun acima de B60.","Yang Qiao, tornozelo, cefaleia.")
add("B60","Kunlun","Jing-rio","Depressão entre o maléolo lateral e o tendão de Aquiles.","Nuca, lombar, tornozelo, parto.","Não na gravidez.")
add("B61","Pucan","—","Posterior e inferior ao maléolo lateral, no calcâneo, 1,5 cun abaixo de B60.","Calcanhar, Yang Qiao.")
add("B62","Shenmai","Abre o Yang Qiao","Diretamente abaixo do maléolo lateral, na depressão.","Yang Qiao, insônia (olho), hemiparesia, nuca.")
add("B63","Jinmen","Xi","Anterior e inferior a B62, distal ao cuboide.","Xi da Bexiga, epilepsia (apoio), tornozelo.")
add("B64","Jinggu","Yuan","Abaixo da tuberosidade do 5º metatarso, na junção pele vermelha/branca.","Yuan da Bexiga, cabeça, pescoço.")
add("B65","Shugu","Shu-arroio","Posterior à cabeça do 5º metatarso, lado lateral.","Cabeça, nuca.")
add("B66","Zutonggu","Ying-manancial","Anterior à 5ª MTF, lado lateral.","Cabeça, nuca, digestão.")
add("B67","Zhiyin","Jing-poço","0,1 cun proximal ao ângulo lateral da unha do 5º artelho.","Parto, apresentação (moxa), olho.","Não na gravidez (exceto virar feto com moxa sob critério).")
add("R1","Yongquan","Jing-poço","Terço anterior da planta, na depressão ao fletir os artelhos.","Yang que sobe, Shen, insônia, reanimação.","Doloroso — avisar.")
add("R2","Rangu","Ying-manancial","Borda inferior do navicular, na junção pele vermelha/branca.","Calor vazio, garganta, dismenorreia.")
add("R3","Taixi","Yuan · Shu-arroio","Meio entre o maléolo medial e o tendão de Aquiles.","Yin e Jing do Rim, lombar, ouvido, asma de fundo.")
add("R4","Dazhong","Luo","0,5 cun abaixo e ligeiramente posterior a R3, no calcâneo.","Luo, calcanhar.")
add("R5","Shuiquan","Xi","1 cun abaixo de R3.","Xi, ciclo, urina.")
add("R6","Zhaohai","Abre o Yin Qiao","1 cun abaixo do maléolo medial, na depressão.","Yin Qiao, garganta, insônia, Yin.")
add("R7","Fuliu","Jing-rio","2 cun acima de R3, borda anterior do Aquiles.","Edema, suor, Jing-rio do Rim.")
add("R8","Jiaoxin","Xi do Yin Qiao","2 cun acima de R3, 0,5 cun anterior a R7, borda posterior da tíbia.","Yin Qiao, ciclo, útero.")
add("R9","Zhubin","Xi do Yin Wei","5 cun acima de R3, na linha R3–R10.","Yin Wei, panturrilha, Shen.")
add("R10","Yingu","He-mar","Lado medial da prega poplítea, entre os tendões do semitendíneo e semimembranoso.","Urina, joelho, jiao inferior.")
add("R11","Henggu","Chong","5 cun abaixo do umbigo, 0,5 cun lat. (nível do púbis).","Chong, urina, genital.","Gravidez: não.")
add("R12","Dahe","Chong","4 cun abaixo do umbigo, 0,5 cun lat.","Jing, útero.","Gravidez: não.")
add("R13","Qixue","Chong","3 cun abaixo do umbigo, 0,5 cun lat.","Chong, ciclo.","Gravidez: não.")
add("R14","Siman","Chong","2 cun abaixo do umbigo, 0,5 cun lat.","Chong, estase no jiao inferior.","Gravidez: não.")
add("R15","Zhongzhu","—","1 cun abaixo do umbigo, 0,5 cun lat.","Intestino, ciclo.")
add("R16","Huangshu","—","0,5 cun lat. ao umbigo.","Jiao médio, Huang.")
add("R17","Shangqu","—","2 cun acima do umbigo, 0,5 cun lat.","Estômago, intestino.")
add("R18","Shiguan","—","3 cun acima do umbigo, 0,5 cun lat.","Estômago, vômito.")
add("R19","Yindu","—","4 cun acima do umbigo, 0,5 cun lat.","Estômago.")
add("R20","Futonggu","—","5 cun acima do umbigo, 0,5 cun lat.","Estômago, tosse.")
add("R21","Youmen","—","6 cun acima do umbigo, 0,5 cun lat.","Estômago, Qi rebelde.","Não fundo.")
add("R22","Bulang","—","5º espaço intercostal, 2 cun lat.","Tosse, peito.","Raso.")
add("R23","Shenfeng","—","4º espaço intercostal, 2 cun lat.","Tosse, mama.","Raso.")
add("R24","Lingxu","—","3º espaço intercostal, 2 cun lat.","Tosse, peito.","Raso.")
add("R25","Shencang","—","2º espaço intercostal, 2 cun lat.","Asma, peito.","Raso.")
add("R26","Yuzhong","—","1º espaço intercostal, 2 cun lat.","Asma, peito.","Raso.")
add("R27","Shufu","—","Borda inferior da clavícula, 2 cun lat.","Asma, tosse.","Raso.")
add("CS1","Tianchi","—","4º espaço intercostal, 1 cun lat. ao mamilo (5 cun lat. à linha média).","Peito, mama.","Raso. Mama.")
add("CS2","Tianquan","—","2 cun abaixo da prega axilar, entre as duas cabeças do bíceps.","Peito, braço.")
add("CS3","Quze","He-mar","Prega cubital, no lado ulnar do tendão do bíceps.","Calor no Sangue, vômito, palpitação.")
add("CS4","Ximen","Xi","5 cun acima da prega do punho, na linha CS3–CS7.","Xi, dor no peito, palpitação.")
add("CS5","Jianshi","Jing-rio","3 cun acima da prega do punho, entre palmar longo e flexor radial.","Shen, náusea.")
add("CS6","Neiguan","Luo · abre o Yin Wei","2 cun acima da prega do punho, entre os dois tendões.","Náusea, peito, palpitação, Shen, Yin Wei.","Cuidado em marca-passo (estudo).")
add("CS7","Daling","Yuan · Shu-arroio","Meio da prega do punho, entre palmar longo e flexor radial.","Yuan, calor no Pericárdio, palma.")
add("CS8","Laogong","Ying-manancial","Palma, entre 2º e 3º metacarpos, onde o 3º dedo toca a palma.","Calor, boca, Shen.")
add("CS9","Zhongchong","Jing-poço","Centro da ponta do 3º dedo (ou 0,1 cun radial à unha).","Reanimação, calor, sangria.")
add("TA1","Guanchong","Jing-poço","0,1 cun proximal ao ângulo ulnar da unha do 4º dedo.","Calor, ouvido, garganta, sangria.")
add("TA2","Yemen","Ying-manancial","Entre 4º e 5º dedos, 0,5 cun proximal à membrana.","Ouvido, cefaleia.")
add("TA3","Zhongzhu","Shu-arroio","Dorso da mão, entre 4º e 5º metacarpos, proximal à MCF.","Ouvido, zumbido, dedos.")
add("TA4","Yangchi","Yuan","Prega dorsal do punho, no lado ulnar do extensor dos dedos.","Yuan do TA, punho.")
add("TA5","Waiguan","Luo · abre o Yang Wei","2 cun acima da prega do punho, entre rádio e ulna.","Yang Wei, Shaoyang, ouvido, exterior, cefaleia.")
add("TA6","Zhigou","Jing-rio","3 cun acima da prega do punho, entre rádio e ulna.","Constipação, flanco, Shaoyang.")
add("TA7","Huizong","Xi","3 cun acima do punho, 1 dedo ulnar a TA6, no lado da ulna.","Xi, ouvido.")
add("TA8","Sanyangluo","—","4 cun acima do punho, entre rádio e ulna.","Afasia, braço, dente.")
add("TA9","Sidu","—","5 cun abaixo do olécrano, entre rádio e ulna.","Ouvido, garganta, braço.")
add("TA10","Tianjing","He-mar","1 cun acima do olécrano, cotovelo fletido.","He, calor, cotovelo.")
add("TA11","Qinglengyuan","—","1 cun acima de TA10.","Ombro, braço.")
add("TA12","Xiaoluo","—","Meio da linha TA11–TA13.","Pescoço, braço.")
add("TA13","Naohui","—","Na inserção posterior do deltoide, na linha TA10–TA14.","Ombro.")
add("TA14","Jianliao","—","Depressão póstero-inferior do acrômio, braço em abdução (fossa posterior).","Ombro posterior.")
add("TA15","Tianliao","—","Meio entre VG14 e a extremidade da espinha da escápula, no ângulo superior.","Ombro, trapézio.")
add("TA16","Tianyou","—","Posterior ao ECM, posterior e inferior a ID17, no nível do ângulo da mandíbula.","Pescoço, ouvido.")
add("TA17","Yifeng","—","Posterior ao lóbulo, na depressão entre a mandíbula e o mastoide.","Ouvido, paralisia facial.","Raso.")
add("TA18","Qimai","—","No centro do mastoide, no meio da linha TA17–TA20.","Ouvido.")
add("TA19","Luxi","—","Superior a TA18, 1/3 da distância TA17–TA20.","Ouvido, cefaleia.")
add("TA20","Jiaosun","—","Diretamente acima do ápice da orelha, na implantação.","Ouvido, dente, gengiva.")
add("TA21","Ermen","—","Anterior ao supratrago, na depressão, boca aberta.","Ouvido.")
add("TA22","Erheliao","—","Anterior e superior a TA21, no nível da raiz da hélice, no cabelo.","Ouvido, cefaleia.")
add("TA23","Sizhukong","—","Na depressão da extremidade lateral da sobrancelha.","Olho, enxaqueca, tic.")
