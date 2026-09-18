/* ═══════════════════════════════════════════════════════════
   DADOS DAS 12 PLANTAS — PADRÃO TÉCNICO DEFINITIVO (9 SEÇÕES)
   
   1. Identificação botânica
   2. Parte utilizada (com justificativa bioquímica)
   3. Principais compostos bioativos
   4. Mecanismo de ação fisiológico
   5. Indicações tradicionais documentadas
   6. Forma correta de preparo
   7. Dose segura
   8. Contraindicações
   9. Limite de uso
═══════════════════════════════════════════════════════════ */

export interface PlantaFicha {
  /* ─── 1. Identificação Botânica ─── */
  nome: string;
  variacoesRegionais: string[];
  cientifico: string;
  familia: string;
  morfologia: string;
  riscoConfusao: string;
  imagem: string;

  /* ─── 2. Parte Utilizada ─── */
  parteUsada: string;
  justificativaParte: string;

  /* ─── 3. Compostos Bioativos ─── */
  classesQuimicas: string[];
  moleculasEspecificas: string;

  /* ─── 4. Mecanismo de Ação ─── */
  sistemaModulado: string;
  viaBioquimica: string;
  respostaFisiologica: string;

  /* ─── 5. Indicações Tradicionais ─── */
  indicacoes: { sistema: string; sintomas: string[] }[];

  /* ─── 6. Forma de Preparo ─── */
  metodo: string;
  proporcao: string;
  tempoInfusao: string;
  frequencia: string;

  /* ─── 7. Dose Segura ─── */
  doseAdulto: string;
  doseIdoso: string;
  doseCrianca: string;

  /* ─── 8. Contraindicações ─── */
  contraindicacoes: string[];
  interacoesMedicamentosas: string[];

  /* ─── 9. Limite de Uso ─── */
  tipoUso: string;
  maxDias: string;
  sinaisSuspensao: string[];

  /* ─── Visual ─── */
  accent: string;
  border: string;
  impactoTermico: 'aquecedora' | 'refrescante' | 'neutra';
  sinergias: string;
}

/* ─── Imports das imagens (referências) ─── */
import imgBoldo from '@/assets/planta-boldo.webp';
import imgHortela from '@/assets/planta-hortela.webp';
import imgEspinheiraSanta from '@/assets/planta-espinheira-santa.webp';
import imgGuaco from '@/assets/planta-guaco.webp';
import imgEucalipto from '@/assets/planta-eucalipto.webp';
import imgCapimLimao from '@/assets/planta-capim-limao.webp';
import imgCamomila from '@/assets/planta-camomila.webp';
import imgMulungu from '@/assets/planta-mulungu.webp';
import imgAlho from '@/assets/planta-alho.webp';
import imgGengibre from '@/assets/planta-gengibre.webp';
import imgArnica from '@/assets/planta-arnica.webp';
import imgBabosa from '@/assets/planta-babosa.webp';

/* ═══════════════════════════════════════════
   SISTEMA DIGESTIVO
═══════════════════════════════════════════ */
export const DIGESTIVO: PlantaFicha[] = [
  {
    nome: 'Boldo',
    variacoesRegionais: ['Boldo-do-chile', 'Boldo-verdadeiro', 'Boldo-amargo'],
    cientifico: 'Peumus boldus Molina',
    familia: 'Monimiaceae',
    morfologia: 'Árvore perene de 5-6m. Folhas ovais, coriáceas, verde-acinzentadas, aromáticas ao esmagar, com superfície áspera. Flores pequenas, amarelo-esverdeadas, agrupadas em cachos. Fruto drupa pequena. Habitat: Chile, cultivado no sul do Brasil.',
    riscoConfusao: 'Confundido frequentemente com Plectranthus barbatus (boldo-brasileiro/boldo-da-terra), que pertence à família Lamiaceae e possui perfil bioquímico completamente diferente. O boldo-brasileiro tem folhas aveludadas e carnosas; o boldo-do-chile tem folhas rígidas e ásperas.',
    imagem: imgBoldo,
    parteUsada: 'Folha',
    justificativaParte: 'As folhas concentram o maior teor de boldina (alcaloide isoquinolínico) e 1,8-cineol. A casca contém alcaloides mas em concentrações hepatotóxicas. A folha permite faixa terapêutica mais segura e controlável.',
    classesQuimicas: ['Alcaloides isoquinolínicos', 'Monoterpenos', 'Flavonoides', 'Óleos essenciais'],
    moleculasEspecificas: 'Boldina (0,1-0,5%), 1,8-cineol (eucaliptol), ascaridol (tóxico em dose alta), catequina, isoramnetina. A boldina é o marcador farmacognóstico com maior evidência colerética.',
    sistemaModulado: 'Sistema digestivo — eixo hepatobiliar',
    viaBioquimica: 'A boldina estimula colangiócitos hepáticos, aumentando a síntese e fluxo de bile. Relaxa o esfíncter de Oddi (via bloqueio colinérgico muscarínico), permitindo escoamento biliar para o duodeno. O 1,8-cineol contribui com efeito carminativo leve.',
    respostaFisiologica: 'Digestão acelerada de gorduras, redução da sensação de peso pós-prandial, estímulo à motilidade do trato biliar. Efeito perceptível em 15-30 minutos.',
    indicacoes: [
      { sistema: 'Digestivo', sintomas: ['Sensação de estômago pesado', 'Digestão lenta de gorduras', 'Desconforto após excesso alimentar'] },
      { sistema: 'Hepático', sintomas: ['Empachamento', 'Má digestão crônica leve'] },
    ],
    metodo: 'Infusão',
    proporcao: '1 folha pequena (≈1g) para 150ml de água quente (80-90°C). Nunca ferver — compostos voláteis degradam acima de 90°C.',
    tempoInfusao: '5 a 10 minutos, abafado.',
    frequencia: 'Até 2 vezes ao dia, preferencialmente após refeições pesadas.',
    doseAdulto: '1 a 2 xícaras ao dia, por no máximo 5 dias consecutivos.',
    doseIdoso: '1 xícara ao dia. Monitorar função hepática se uso repetido.',
    doseCrianca: 'NÃO recomendado para crianças menores de 12 anos. Ascaridol é neurotóxico em doses pediátricas.',
    contraindicacoes: ['Gestantes (efeito embriotóxico em modelos animais)', 'Obstrução biliar diagnosticada', 'Hepatites agudas ou crônicas', 'Cálculos biliares sem avaliação médica', 'Lactantes'],
    interacoesMedicamentosas: ['Paracetamol (hepatotoxicidade aditiva)', 'Estatinas (sobrecarga hepática)', 'Anticoagulantes (potencializa efeito via inibição plaquetária leve)', 'Metformina (alteração de metabolismo hepático)'],
    tipoUso: 'Exclusivamente pontual',
    maxDias: '5 dias consecutivos. Intervalo obrigatório de 10 dias antes de repetir.',
    sinaisSuspensao: ['Amarelamento da pele ou esclera (icterícia)', 'Urina escurecida', 'Dor abdominal intensa no hipocôndrio direito', 'Náusea persistente após ingestão'],
    accent: 'text-green-400', border: 'border-green-500/30',
    impactoTermico: 'aquecedora',
    sinergias: 'Boldo + Espinheira-santa: proteção gástrica sinérgica (bile + mucosa). Boldo + Hortelã: alívio digestivo completo (bile + espasmo intestinal).',
  },
  {
    nome: 'Hortelã',
    variacoesRegionais: ['Hortelã-pimenta', 'Menta', 'Hortelã-verdadeira', 'Piperita'],
    cientifico: 'Mentha × piperita L.',
    familia: 'Lamiaceae',
    morfologia: 'Herbácea perene, 30-60cm. Caule quadrangular arroxeado. Folhas opostas, serrilhadas, verde-escuro com nervuras proeminentes. Aroma forte mentolado ao esmagar. Flores lilases em espigas terminais. Habitat: cosmopolita, adapta-se a solos úmidos.',
    riscoConfusao: 'Existem dezenas de espécies de Mentha. A hortelã-pimenta (M. piperita) é híbrida e se distingue pelo aroma intensamente mentolado e caule arroxeado. Mentha spicata (hortelã-verde) tem aroma mais suave e folhas mais arredondadas. Para uso terapêutico gastrointestinal, preferir M. piperita.',
    imagem: imgHortela,
    parteUsada: 'Folha',
    justificativaParte: 'As folhas possuem glândulas oleíferas que concentram 1-3% de óleo essencial rico em mentol. O caule contém teor insignificante. As flores concentram compostos aromáticos, mas em menor relevância terapêutica.',
    classesQuimicas: ['Monoterpenos', 'Compostos fenólicos', 'Flavonoides', 'Óleos essenciais'],
    moleculasEspecificas: 'Mentol (40-50% do óleo essencial), mentona (15-25%), acetato de mentila, ácido rosmarínico, luteolina, apigenina, eriocitrina.',
    sistemaModulado: 'Sistema digestivo — musculatura lisa intestinal',
    viaBioquimica: 'O mentol bloqueia canais de cálcio voltagem-dependentes nos miócitos do trato gastrointestinal, impedindo contração espástica. Isso gera relaxamento da musculatura lisa intestinal. O ácido rosmarínico contribui com efeito anti-inflamatório via inibição de LOX.',
    respostaFisiologica: 'Redução de espasmos intestinais, alívio de cólicas e gases, sensação de frescor no trato digestivo. Efeito em 10-20 minutos.',
    indicacoes: [
      { sistema: 'Digestivo', sintomas: ['Gases e distensão abdominal', 'Cólicas intestinais leves', 'Desconforto pós-prandial', 'Síndrome do intestino irritável (adjuvante)'] },
      { sistema: 'Oral', sintomas: ['Halitose', 'Desconforto gengival leve'] },
    ],
    metodo: 'Infusão',
    proporcao: '6 a 8 folhas frescas (≈2g) ou 1 colher de chá da folha seca para 200ml de água quente. Esmagar levemente antes de infundir para liberar mentol.',
    tempoInfusao: '5 a 10 minutos, abafado.',
    frequencia: 'Até 3 xícaras ao dia. Separar por 2 horas de medicamentos orais.',
    doseAdulto: '2 a 3 xícaras ao dia. Uso contínuo moderado é aceitável por até 2 semanas.',
    doseIdoso: '1 a 2 xícaras ao dia. Monitorar se há refluxo.',
    doseCrianca: 'Acima de 6 anos: ½ xícara, 1 a 2 vezes ao dia. Abaixo de 3 anos: NÃO usar (mentol pode causar laringoespasmo reflexo em lactentes).',
    contraindicacoes: ['Refluxo gastroesofágico severo (DRGE) — mentol relaxa esfíncter esofágico inferior', 'Úlcera esofágica ativa', 'Crianças menores de 3 anos', 'Hérnia de hiato diagnosticada'],
    interacoesMedicamentosas: ['Pode reduzir absorção de medicamentos orais (separar por 2h)', 'Ciclosporina (altera metabolismo CYP3A4)', 'Antiácidos (efeito competitivo no pH gástrico)'],
    tipoUso: 'Pontual a moderado',
    maxDias: 'Até 14 dias contínuos. Alternar com erva-cidreira após 2 semanas.',
    sinaisSuspensao: ['Piora do refluxo ou azia', 'Sensação de queimação esofágica', 'Irritação oral persistente', 'Broncoespasmo em crianças'],
    accent: 'text-teal-400', border: 'border-teal-500/30',
    impactoTermico: 'refrescante',
    sinergias: 'Hortelã + Erva-doce: efeito carminativo potencializado. Hortelã + Gengibre: náusea pós-prandial. Hortelã + Camomila: cólica com componente ansioso.',
  },
  {
    nome: 'Espinheira-santa',
    variacoesRegionais: ['Cancerosa', 'Cancorosa', 'Espinha-de-deus', 'Sombra-de-touro'],
    cientifico: 'Maytenus ilicifolia Mart. ex Reissek',
    familia: 'Celastraceae',
    morfologia: 'Arbusto perene, 2-5m. Folhas coriáceas, verde-escuro brilhante, com bordas espinhosas semelhantes ao azevinho. Flores pequenas, branco-esverdeadas, axilares. Fruto cápsula vermelha. Habitat: Mata Atlântica, sul e sudeste do Brasil.',
    riscoConfusao: 'Pode ser confundida com Sorocea bonplandii (falsa-espinheira-santa), que pertence à família Moraceae. A diferença morfológica principal: M. ilicifolia tem espinhos nas bordas das folhas e nervuras pouco marcadas; S. bonplandii tem folhas mais lisas e exsuda látex quando cortada.',
    imagem: imgEspinheiraSanta,
    parteUsada: 'Folha',
    justificativaParte: 'As folhas concentram taninos condensados (proantocianidinas, 7-14% na matéria seca) que formam película protetora sobre a mucosa gástrica. Triterpenos pentacíclicos (friedelin) estão presentes em maior concentração na folha madura.',
    classesQuimicas: ['Taninos condensados', 'Triterpenos pentacíclicos', 'Flavonoides', 'Compostos fenólicos'],
    moleculasEspecificas: 'Friedelin, friedelanol, proantocianidinas (taninos), kaempferol, quercetina. Os taninos são os compostos com maior evidência gastroprotetora. Friedelin possui atividade antiulcerogênica demonstrada em modelos experimentais.',
    sistemaModulado: 'Sistema digestivo — mucosa gástrica',
    viaBioquimica: 'Taninos condensados adsorvem-se à mucosa gástrica, formando barreira física contra ácido clorídrico (HCl). Friedelin e friedelanol inibem a secreção de HCl por ação sobre células parietais. O efeito combinado é antiulcerogênico e citoprotetor.',
    respostaFisiologica: 'Redução da acidez gástrica, proteção da mucosa, alívio da sensação de queimação epigástrica. Efeito perceptível em 20-40 minutos.',
    indicacoes: [
      { sistema: 'Digestivo', sintomas: ['Azia leve e moderada', 'Queimação epigástrica', 'Desconforto gástrico pós-prandial', 'Gastrite leve (adjuvante)'] },
    ],
    metodo: 'Infusão',
    proporcao: '1 colher de sopa rasa (≈3g) da folha seca para 200ml de água quente.',
    tempoInfusao: '10 minutos, abafado.',
    frequencia: '30 minutos antes das refeições principais. Até 3 vezes ao dia.',
    doseAdulto: '2 a 3 xícaras ao dia, por até 7 dias consecutivos.',
    doseIdoso: '1 a 2 xícaras ao dia. Monitorar absorção de ferro e cálcio.',
    doseCrianca: 'NÃO recomendado para crianças menores de 12 anos. Estudos insuficientes.',
    contraindicacoes: ['Gestantes (ação embriotóxica documentada em modelos animais)', 'Lactantes', 'Anemia ferropriva (taninos quelam ferro)', 'Osteoporose em tratamento (taninos reduzem absorção de cálcio)'],
    interacoesMedicamentosas: ['Antiácidos e IBP — efeito aditivo, pode mascarar progressão de úlcera', 'Suplementos de ferro — redução significativa de absorção', 'Suplementos de cálcio — redução de absorção por taninos'],
    tipoUso: 'Pontual a curto prazo',
    maxDias: '7 dias consecutivos. Intervalo de 7 dias antes de repetir.',
    sinaisSuspensao: ['Dor epigástrica que irradia para costas', 'Vômito com sangue (hematêmese)', 'Fezes escurecidas (melena)', 'Perda de peso inexplicada', 'Sem melhora após 5 dias de uso'],
    accent: 'text-lime-400', border: 'border-lime-500/30',
    impactoTermico: 'refrescante',
    sinergias: 'Espinheira-santa + Boldo: proteção gástrica + estímulo biliar. Espinheira-santa + Camomila: azia com componente ansioso/emocional.',
  },
];

/* ═══════════════════════════════════════════
   SISTEMA RESPIRATÓRIO
═══════════════════════════════════════════ */
export const RESPIRATORIO: PlantaFicha[] = [
  {
    nome: 'Guaco',
    variacoesRegionais: ['Guaco-de-cheiro', 'Cipó-catinga', 'Erva-de-serpente', 'Coração-de-jesus'],
    cientifico: 'Mikania glomerata Spreng.',
    familia: 'Asteraceae (Compositae)',
    morfologia: 'Trepadeira lenhosa perene. Folhas opostas, cordiformes (formato de coração), verde-escuro, com aroma de baunilha/feno ao esmagar (cumarina). Flores brancas, tubulares, em capítulos. Caule volúvel que se enrosca em suportes. Habitat: Mata Atlântica, comum em bordas de mata.',
    riscoConfusao: 'Existem várias espécies de Mikania no Brasil. M. glomerata se diferencia de M. laevigata pela pilosidade: M. glomerata tem folhas glabras (lisas), enquanto M. laevigata tem pubescência. Ambas são medicinais, mas M. glomerata é a espécie oficializada na Farmacopeia Brasileira.',
    imagem: imgGuaco,
    parteUsada: 'Folha',
    justificativaParte: 'As folhas concentram cumarina (0,2-1,0%) e ácido caurenóico (diterpeno), os dois marcadores terapêuticos principais. A cumarina está presente em glândulas oleíferas foliares. O caule possui teor residual.',
    classesQuimicas: ['Cumarinas', 'Diterpenos', 'Ácidos fenólicos', 'Esteroides'],
    moleculasEspecificas: 'Cumarina (1,2-benzopirona, 0,2-1,0%), ácido caurenóico, ácidos cinâmico e clorogênico, estigmasterol, lupeol. A cumarina é o marcador farmacognóstico oficial.',
    sistemaModulado: 'Sistema respiratório — musculatura brônquica e epitélio secretor',
    viaBioquimica: 'A cumarina inibe fosfodiesterase (PDE), aumentando AMPc intracelular no músculo liso brônquico — mecanismo similar ao da aminofilina (broncodilatador farmacológico). O ácido caurenóico possui ação anti-inflamatória via inibição de NF-κB.',
    respostaFisiologica: 'Broncodilatação leve a moderada, facilitação da expectoração por fluidificação do muco, redução da inflamação local do epitélio brônquico.',
    indicacoes: [
      { sistema: 'Respiratório', sintomas: ['Tosse produtiva', 'Congestão brônquica leve', 'Broncoespasmo moderado', 'Gripe com tosse'] },
    ],
    metodo: 'Infusão ou xarope caseiro',
    proporcao: 'Infusão: 3-4 folhas (≈3g) para 200ml. Xarope: decocção concentrada de 30g de folhas em 500ml + 200g de mel.',
    tempoInfusao: '10 minutos, abafado.',
    frequencia: '1 a 2 xícaras ao dia. Xarope: 1 colher de sopa, 3x/dia.',
    doseAdulto: '2 xícaras ao dia por até 5 dias.',
    doseIdoso: '1 xícara ao dia. Monitorar INR se em uso de anticoagulantes.',
    doseCrianca: 'Acima de 6 anos: ½ dose do xarope. Abaixo de 6 anos: NÃO usar sem orientação profissional.',
    contraindicacoes: ['Distúrbios de coagulação', 'Doença hepática grave', 'Gestantes (cumarina tem efeito anticoagulante)', 'Pré-operatório (suspender 7 dias antes)'],
    interacoesMedicamentosas: ['Warfarina, heparina, AAS, clopidogrel — potencializa efeito anticoagulante significativamente', 'Anticonvulsivantes — cumarina altera metabolismo hepático'],
    tipoUso: 'Pontual — apenas durante quadro respiratório ativo',
    maxDias: '5 dias consecutivos. Uso prolongado de cumarina causa hepatotoxicidade.',
    sinaisSuspensao: ['Tosse que piora progressivamente', 'Hemoptise (sangue no escarro)', 'Dispneia que não melhora', 'Febre persistente >38,5°C por >48h', 'Sangramento gengival ou nasal'],
    accent: 'text-green-300', border: 'border-green-400/30',
    impactoTermico: 'neutra',
    sinergias: 'Guaco + Eucalipto (inalação): broncodilatação + fluidificação sinérgica. Guaco + Gengibre: tosse com componente inflamatório. Guaco + Mel: xarope expectorante tradicional.',
  },
  {
    nome: 'Eucalipto',
    variacoesRegionais: ['Eucalipto-glóbulo', 'Eucalipto-comum', 'Eucalipto-medicinal'],
    cientifico: 'Eucalyptus globulus Labill.',
    familia: 'Myrtaceae',
    morfologia: 'Árvore de grande porte, 30-55m. Casca que se descasca em tiras. Folhas juvenis ovais, verde-acinzentadas; folhas adultas lanceoladas, falciformes, pendentes, verde-escuro. Aroma canforado intenso. Flores brancas com estames numerosos. Habitat: originário da Austrália, amplamente cultivado no Brasil.',
    riscoConfusao: 'E. globulus é a espécie medicinal de referência, mas frequentemente confundida com E. citriodora (aroma de citronela) e E. grandis (madeireiro). Para uso respiratório, confirmar pelo aroma: E. globulus tem cheiro canforado forte e folhas adultas em formato de foice.',
    imagem: imgEucalipto,
    parteUsada: 'Folha (uso exclusivamente por inalação)',
    justificativaParte: 'As folhas adultas contêm glândulas oleíferas com 60-80% de 1,8-cineol (eucaliptol) no óleo essencial. A concentração é máxima em folhas maduras. A casca e frutos contêm teor insignificante para fins terapêuticos respiratórios.',
    classesQuimicas: ['Monoterpenos', 'Sesquiterpenos', 'Óleos essenciais', 'Compostos fenólicos'],
    moleculasEspecificas: '1,8-cineol/eucaliptol (60-80% do óleo), α-pineno (10-15%), limoneno, globulol, aromadendrem. O cineol é o composto com maior evidência para ação mucolítica e antimicrobiana leve.',
    sistemaModulado: 'Sistema respiratório — mucosa nasal e epitélio brônquico',
    viaBioquimica: '1,8-cineol ativa receptores TRPM8 (termorreceptores de frio) na mucosa respiratória, gerando sensação de desobstrução. Inibe mediadores inflamatórios (TNF-α, IL-1β). In vitro, demonstra ação antimicrobiana contra S. aureus e S. pneumoniae.',
    respostaFisiologica: 'Sensação imediata de desobstrução nasal, fluidificação de secreções espessas, redução de inflamação local. Ação antimicrobiana leve complementar.',
    indicacoes: [
      { sistema: 'Respiratório', sintomas: ['Congestão nasal', 'Muco espesso', 'Sinusite leve', 'Gripe com obstrução'] },
    ],
    metodo: 'Inalação com vapor',
    proporcao: '3 a 5 folhas frescas (≈5g) em 1 litro de água quente. Cobrir cabeça com toalha. Distância mínima de 30cm do vapor.',
    tempoInfusao: '10 minutos de inalação por sessão.',
    frequencia: 'Até 3 sessões ao dia.',
    doseAdulto: '3 inalações/dia por até 5 dias.',
    doseIdoso: '2 inalações/dia. Cuidado com pele facial sensível ao vapor.',
    doseCrianca: 'Acima de 6 anos: 1-2 inalações/dia com supervisão. NUNCA em menores de 2 anos (risco de laringoespasmo e broncoespasmo paradoxal).',
    contraindicacoes: ['NUNCA ingerir óleo essencial puro (neurotóxico e nefrotóxico)', 'Crianças menores de 2 anos', 'Asmáticos severos (broncoespasmo paradoxal)', 'Aplicação direta de óleo em narinas de lactentes'],
    interacoesMedicamentosas: ['Pode acelerar metabolismo hepático de fármacos via indução CYP3A4 e CYP1A2', 'Medicamentos com margem terapêutica estreita (ciclosporina, tacrolimus)'],
    tipoUso: 'Pontual — apenas durante quadro congestivo ativo',
    maxDias: '5 dias consecutivos de inalação.',
    sinaisSuspensao: ['Dificuldade respiratória que piora', 'Broncoespasmo ou chiado', 'Irritação mucosa intensa (ardor)', 'Tosse seca que se agrava', 'Febre que não cede'],
    accent: 'text-cyan-400', border: 'border-cyan-500/30',
    impactoTermico: 'refrescante',
    sinergias: 'Eucalipto (inalação) + Guaco (oral): desobstrução em dois níveis. Eucalipto + Capim-limão (inalação): congestão + relaxamento corporal.',
  },
  {
    nome: 'Capim-limão',
    variacoesRegionais: ['Capim-santo', 'Capim-cidreira', 'Erva-príncipe', 'Capim-cidrão'],
    cientifico: 'Cymbopogon citratus (DC.) Stapf',
    familia: 'Poaceae (Gramineae)',
    morfologia: 'Gramínea perene, forma touceiras densas de 1-1,5m. Folhas longas, lineares, verde-claro, com bordas cortantes e aroma cítrico forte ao esmagar. Não floresce frequentemente em climas tropicais. Base da folha é esbranquiçada. Habitat: tropical, amplamente cultivado em quintais brasileiros.',
    riscoConfusao: 'Confundido frequentemente com Melissa officinalis (erva-cidreira), que é uma herbácea da família Lamiaceae com folhas ovaladas e serrilhadas. Capim-limão é uma gramínea com folhas longas e lineares — visualmente são completamente diferentes. Também diferente de Cymbopogon nardus (citronela), que tem aroma mais cânfora e menos cítrico.',
    imagem: imgCapimLimao,
    parteUsada: 'Folha',
    justificativaParte: 'As folhas contêm glândulas oleíferas com 65-85% de citral (geranial + neral) no óleo essencial. A base do colmo contém teor menor. O citral degrada rapidamente na secagem, tornando o uso de folha fresca preferível.',
    classesQuimicas: ['Monoterpenos (citral)', 'Sesquiterpenos', 'Compostos fenólicos', 'Óleos essenciais'],
    moleculasEspecificas: 'Citral (geranial + neral, 65-85% do óleo essencial), mirceno (12-25%), geraniol, linalol, citronelal. O citral é o marcador farmacognóstico com ação documentada ansiolítica e antimicrobiana.',
    sistemaModulado: 'Sistema nervoso central e sistema respiratório superior',
    viaBioquimica: 'O mirceno possui ação ansiolítica e sedativa leve por potencialização GABAérgica (mecanismo parcialmente elucidado). O citral apresenta ação antimicrobiana por desestabilização de membranas celulares bacterianas e ação analgésica leve.',
    respostaFisiologica: 'Relaxamento muscular e mental leve, redução de tensão, conforto em quadros gripais leves. Ação suave e progressiva.',
    indicacoes: [
      { sistema: 'Nervoso', sintomas: ['Ansiedade situacional leve', 'Tensão corporal', 'Dificuldade para relaxar'] },
      { sistema: 'Respiratório', sintomas: ['Sintomas leves de resfriado', 'Desconforto geral em gripes'] },
    ],
    metodo: 'Infusão',
    proporcao: '3 a 4 folhas frescas (≈5g) para 200ml de água quente. Macerar/esmagar levemente antes de infundir.',
    tempoInfusao: '5 a 10 minutos, abafado.',
    frequencia: '1 a 2 xícaras ao dia.',
    doseAdulto: '2 xícaras ao dia. Uso prolongado aceitável em doses baixas.',
    doseIdoso: '1 a 2 xícaras ao dia. Monitorar pressão arterial.',
    doseCrianca: 'Acima de 6 anos: ½ xícara ao dia. É uma das plantas mais seguras para uso infantil moderado.',
    contraindicacoes: ['Gestantes em doses altas (mirceno possui ação uterotônica em estudos animais — limitar a 1 xícara/dia)', 'Hipotensão severa'],
    interacoesMedicamentosas: ['Pode potencializar levemente sedativos e ansiolíticos', 'Anti-hipertensivos (efeito aditivo leve)'],
    tipoUso: 'Moderado a contínuo (baixa toxicidade)',
    maxDias: 'Uso em doses baixas aceitável por períodos prolongados. Em dose terapêutica, ciclar a cada 3 semanas com 1 semana de intervalo.',
    sinaisSuspensao: ['Sonolência excessiva diurna', 'Queda de pressão arterial', 'Irritação gástrica (citral em excesso)', 'Reação alérgica cutânea'],
    accent: 'text-yellow-300', border: 'border-yellow-400/30',
    impactoTermico: 'neutra',
    sinergias: 'Capim-limão + Camomila: relaxamento profundo noturno. Capim-limão + Gengibre: gripe leve com dor corporal. Capim-limão + Eucalipto (inalação): congestão + relaxamento.',
  },
];

/* ═══════════════════════════════════════════
   SISTEMA NERVOSO
═══════════════════════════════════════════ */
export const NERVOSO: PlantaFicha[] = [
  {
    nome: 'Camomila',
    variacoesRegionais: ['Camomila-alemã', 'Camomila-verdadeira', 'Matricária', 'Maçanilha'],
    cientifico: 'Matricaria chamomilla L. (sin. Matricaria recutita)',
    familia: 'Asteraceae (Compositae)',
    morfologia: 'Herbácea anual, 20-50cm. Caule ereto, ramificado. Folhas finamente divididas (bipinadas), filiformes, verde-claro. Flores em capítulos com lígulas brancas e disco central amarelo cônico e oco (diagnóstico). Aroma doce, frutado, de maçã. Habitat: Europa, amplamente cultivada no Brasil.',
    riscoConfusao: 'Diferençar de Anthemis cotula (falsa-camomila), que tem receptáculo floral cheio (não oco) e aroma desagradável. A camomila-verdadeira tem receptáculo floral oco quando cortado ao meio — este é o teste definitivo de identificação.',
    imagem: imgCamomila,
    parteUsada: 'Flor (capítulo floral)',
    justificativaParte: 'Os capítulos florais concentram apigenina (1-2% da matéria seca) e α-bisabolol (10-25% do óleo essencial destilado). A apigenina está presente como glicosídeo (apigenina-7-O-glucosídeo) e é liberada na infusão. Folhas e caules possuem teor insignificante.',
    classesQuimicas: ['Flavonoides', 'Sesquiterpenos', 'Cumarinas', 'Óleos essenciais'],
    moleculasEspecificas: 'Apigenina (1-2%, principal ansiolítico), α-bisabolol (anti-inflamatório), camazuleno (formado na destilação, anti-alérgico), matricina (precursor do camazuleno), ácido angélico, herniarina (cumarina).',
    sistemaModulado: 'Sistema nervoso central — circuito GABAérgico',
    viaBioquimica: 'A apigenina atua como agonista parcial da subunidade benzodiazepínica do receptor GABA-A, promovendo influxo de cloreto e hiperpolarização neuronal. O efeito é ansiolítico SEM depressão respiratória (diferente de benzodiazepínicos farmacológicos). O bisabolol possui ação anti-inflamatória e antiespasmódica via inibição de COX-2.',
    respostaFisiologica: 'Relaxamento do SNC sem sedação profunda, redução de irritabilidade, facilitação do início do sono, relaxamento da musculatura lisa (cólica).',
    indicacoes: [
      { sistema: 'Nervoso', sintomas: ['Ansiedade leve a moderada', 'Insônia de início (dificuldade de adormecer)', 'Irritabilidade', 'Agitação em crianças'] },
      { sistema: 'Digestivo', sintomas: ['Cólica leve', 'Desconforto digestivo por estresse'] },
    ],
    metodo: 'Infusão',
    proporcao: '1 a 2g de flores secas (≈1 colher de sopa) para 200ml de água quente (85-90°C). NÃO ferver — apigenina é termossensível em ebulição prolongada.',
    tempoInfusao: '10 minutos, abafado (essencial para preservar bisabolol volátil).',
    frequencia: '1 a 3 xícaras ao dia. Para insônia: 1 xícara 30-40 minutos antes de dormir.',
    doseAdulto: '2 a 3 xícaras ao dia. Ciclos de até 14 dias com 7 dias de intervalo.',
    doseIdoso: '1 a 2 xícaras ao dia. Planta segura para idosos.',
    doseCrianca: 'Acima de 1 ano: ½ xícara (100ml), 1 a 2 vezes ao dia. Uma das plantas mais seguras para uso pediátrico.',
    contraindicacoes: ['Alergia a Asteraceae (margarida, crisântemo, girassol — família botânica)', 'Gestantes no 1º trimestre (cautela)', 'Alergia conhecida à camomila'],
    interacoesMedicamentosas: ['Sedativos e benzodiazepínicos (efeito aditivo — reduzir dose de ambos)', 'Anti-histamínicos sedativos', 'Ciclosporina (altera metabolismo CYP3A4)', 'Anticoagulantes (herniarina tem efeito cumarínico leve)'],
    tipoUso: 'Pontual a moderado',
    maxDias: '14 dias contínuos. Intervalo de 7 dias. Uso crônico >30 dias pode causar leve quelação de ferro.',
    sinaisSuspensao: ['Reação alérgica (urticária, edema facial, prurido)', 'Sonolência excessiva diurna', 'Dermatite de contato (uso tópico)', 'Piora paradoxal da ansiedade (raro)'],
    accent: 'text-yellow-400', border: 'border-yellow-500/30',
    impactoTermico: 'neutra',
    sinergias: 'Camomila + Capim-limão: relaxamento profundo. Camomila + Mulungu (dose reduzida de ambas): ansiedade moderada. Camomila + Espinheira-santa: azia com componente emocional.',
  },
  {
    nome: 'Mulungu',
    variacoesRegionais: ['Mulungu-coral', 'Eritrina', 'Canivete', 'Corticeira', 'Bico-de-papagaio'],
    cientifico: 'Erythrina mulungu Mart. ex Benth.',
    familia: 'Fabaceae (Leguminosae)',
    morfologia: 'Árvore decídua, 8-12m. Tronco com espinhos cônicos. Casca acinzentada, corticosa, que se solta em placas. Flores vermelho-alaranjadas, tubulares, vistosas, em cachos. Folhas trifoliadas. Habitat: cerrado e mata atlântica, nativa do Brasil.',
    riscoConfusao: 'Existem várias espécies de Erythrina no Brasil. E. mulungu se distingue pelas flores vermelhas tubulares e casca corticosa com espinhos. Não confundir com E. speciosa (mulungu-ornamental), que tem flores maiores e não é utilizada medicinalmente com a mesma segurança.',
    imagem: imgMulungu,
    parteUsada: 'Casca do caule',
    justificativaParte: 'A casca concentra alcaloides eritrínicos (eritravina, erisopina, erisotrina) em teor significativamente maior que folhas ou flores. Esses alcaloides são estruturalmente relacionados ao curare, o que explica a ação miorrelaxante. A casca é a parte com uso tradicional documentado.',
    classesQuimicas: ['Alcaloides eritrínicos', 'Flavonoides', 'Isoflavonoides', 'Terpenos'],
    moleculasEspecificas: 'Eritravina, erisopina, erisotrina, erisodina (alcaloides tetracíclicos), formononetina (isoflavonoide). Os alcaloides eritrínicos atuam no SNC e na junção neuromuscular.',
    sistemaModulado: 'Sistema nervoso central e junção neuromuscular',
    viaBioquimica: 'Alcaloides eritrínicos possuem ação sedativa central por potencialização GABAérgica e bloqueio parcial de receptores colinérgicos nicotínicos. Na periferia, causam relaxamento muscular por ação curare-like na placa motora (bloqueio competitivo de acetilcolina).',
    respostaFisiologica: 'Sedação moderada, relaxamento muscular significativo, redução de agitação. O efeito é mais potente que camomila — classificação: planta de ação forte.',
    indicacoes: [
      { sistema: 'Nervoso', sintomas: ['Agitação moderada', 'Dificuldade de relaxamento resistente a plantas leves', 'Tensão muscular por estresse crônico'] },
    ],
    metodo: 'Decocção (fervura curta)',
    proporcao: '1 colher de chá rasa (≈2g) de casca seca para 200ml de água.',
    tempoInfusao: 'Ferver por 5 minutos, repousar por 10 minutos. Filtrar bem.',
    frequencia: '1 xícara ao dia, preferencialmente à noite.',
    doseAdulto: '1 xícara ao dia. Máximo 3 dias consecutivos.',
    doseIdoso: 'NÃO recomendado sem supervisão. Risco de hipotensão postural.',
    doseCrianca: 'NÃO usar em crianças. Alcaloides eritrínicos são potentes e a margem terapêutica é estreita.',
    contraindicacoes: ['Hipotensão arterial', 'Gestantes', 'Lactantes', 'Crianças', 'Depressão diagnosticada', 'Arritmia cardíaca', 'Miastenia gravis'],
    interacoesMedicamentosas: ['Anti-hipertensivos — hipotensão severa (efeito aditivo grave)', 'ISRS e ISRN (antidepressivos) — interação grave potencial', 'Benzodiazepínicos — sedação excessiva', 'Anestésicos — potencialização perigosa', 'Bloqueadores neuromusculares — efeito aditivo'],
    tipoUso: 'Estritamente pontual — planta de ação FORTE',
    maxDias: '3 dias consecutivos. Intervalo obrigatório de pelo menos 10 dias.',
    sinaisSuspensao: ['Tontura ou sensação de desmaio', 'Queda de pressão arterial', 'Fraqueza muscular significativa', 'Sonolência que persiste no dia seguinte', 'Bradicardia (coração lento)', 'Confusão mental'],
    accent: 'text-purple-400', border: 'border-purple-500/30',
    impactoTermico: 'neutra',
    sinergias: 'Mulungu + Camomila (dose reduzida de ambas): relaxamento sem sedação profunda. NÃO combinar com outras plantas sedativas. NÃO combinar com álcool.',
  },
];

/* ═══════════════════════════════════════════
   SISTEMA IMUNE
═══════════════════════════════════════════ */
export const IMUNE: PlantaFicha[] = [
  {
    nome: 'Alho',
    variacoesRegionais: ['Alho-branco', 'Alho-roxo', 'Alho-nacional', 'Alho-poró (espécie diferente)'],
    cientifico: 'Allium sativum L.',
    familia: 'Amaryllidaceae (anteriormente Liliaceae)',
    morfologia: 'Herbácea bulbosa perene, 30-60cm. Bulbo (cabeça) composto por 8-20 bulbilhos (dentes) envolvidos por túnicas papiráceas brancas ou roxas. Folhas longas, planas, verde-escuro. Escapo floral com umbela de flores branco-rosadas. Aroma sulfuroso forte ao esmagar. Habitat: originário da Ásia Central, cultivado mundialmente.',
    riscoConfusao: 'Não confundir bulbo de alho com cebola-de-flor (Ornithogalum) ou lírio-do-vale (Convallaria majalis), ambos tóxicos e com bulbos superficialmente semelhantes. O aroma sulfuroso inconfundível do alho é o diagnóstico. Alho-poró (Allium porrum) é espécie diferente com perfil bioquímico distinto.',
    imagem: imgAlho,
    parteUsada: 'Bulbo (dente)',
    justificativaParte: 'O bulbo contém aliina (precursor sulfurado) e a enzima alinase, que estão compartimentalizados em células diferentes. Quando o dente é esmagado, aliina e alinase se encontram e formam allicina (composto bioativo principal). Este mecanismo é exclusivo do bulbo fresco.',
    classesQuimicas: ['Compostos organossulfurados', 'Saponinas', 'Flavonoides', 'Selênio orgânico'],
    moleculasEspecificas: 'Aliina (precursor), allicina (composto bioativo principal, meia-vida ≈16h), ajoeno (antiplaquetário), dialil dissulfeto (DAS), dialil trissulfeto (DATS), S-alilcisteína (SAC, estável, presente em alho envelhecido).',
    sistemaModulado: 'Sistema imunológico e cardiovascular',
    viaBioquimica: 'Allicina inibe enzimas tiol-dependentes em bactérias, fungos e vírus — ação antimicrobiana de amplo espectro. No sistema imune, estimula macrófagos e células NK. No sistema cardiovascular, ajoeno inibe agregação plaquetária via bloqueio de tromboxano A2. Efeito hipotensor por vasodilatação mediada por H₂S.',
    respostaFisiologica: 'Reforço da resposta imune inata, ação antimicrobiana direta, melhora da circulação periférica, redução leve da pressão arterial e colesterol LDL.',
    indicacoes: [
      { sistema: 'Imune', sintomas: ['Reforço imunológico preventivo', 'Início de infecções respiratórias', 'Defesa antimicrobiana geral'] },
      { sistema: 'Cardiovascular', sintomas: ['Hipertensão leve (adjuvante)', 'Circulação periférica comprometida'] },
    ],
    metodo: 'Uso cru, triturado',
    proporcao: '1 a 2 dentes médios (≈4g) ao dia, esmagados. AGUARDAR 10 MINUTOS após esmagar para que a alinase converta aliina em allicina. O cozimento DESTRÓI a alinase — para uso terapêutico, SEMPRE cru.',
    tempoInfusao: '10 minutos de espera após trituração (ativação enzimática).',
    frequencia: '1 a 2 dentes ao dia, preferencialmente com alimento para reduzir irritação.',
    doseAdulto: '1 a 2 dentes crus ao dia. Dose equivalente em extrato: 2-5mg de allicina.',
    doseIdoso: '1 dente ao dia. Monitorar coagulação se em uso de anticoagulantes.',
    doseCrianca: 'Acima de 6 anos: ½ dente ao dia, misturado em alimento. Uso em excesso pode causar irritação gástrica significativa.',
    contraindicacoes: ['Pré-operatório — suspender 7 dias antes de cirurgias', 'Coagulopatias diagnosticadas', 'Gastrite erosiva ativa', 'Deficiência de G6PD (risco de hemólise em dose alta)', 'Uso de anticoagulantes de margem estreita'],
    interacoesMedicamentosas: ['Warfarina, heparina, AAS, clopidogrel — potencialização anticoagulante significativa', 'Saquinavir e ritonavir (HIV) — redução da eficácia do antirretroviral', 'Hipoglicemiantes — efeito aditivo leve', 'Anti-hipertensivos — efeito aditivo'],
    tipoUso: 'Moderado a contínuo em dose baixa',
    maxDias: 'Uso preventivo (1 dente/dia) aceitável por períodos longos. Dose terapêutica (2 dentes/dia): máximo 2 semanas, 1 semana de intervalo.',
    sinaisSuspensao: ['Sangramento incomum (gengival, nasal, hematomas)', 'Irritação gástrica persistente', 'Odor corporal excessivo socialmente limitante', 'Palpitações'],
    accent: 'text-amber-300', border: 'border-amber-400/30',
    impactoTermico: 'aquecedora',
    sinergias: 'Alho + Gengibre: anti-inflamatório sistêmico potente (base de caldos terapêuticos). Alho + Mel: ação antimicrobiana potencializada. Alho + Limão: protocolo preventivo imunológico.',
  },
  {
    nome: 'Gengibre',
    variacoesRegionais: ['Gengibre-comum', 'Mangarataia', 'Mangaratiá', 'Gingibre'],
    cientifico: 'Zingiber officinale Roscoe',
    familia: 'Zingiberaceae',
    morfologia: 'Herbácea perene, 60-120cm. Rizoma (caule subterrâneo) horizontal, nodoso, bege externamente, amarelo-pálido internamente, aroma picante. Folhas longas, lineares, alternas, verde-escuro. Flores amarelo-esverdeadas com labelo roxo. Habitat: tropical, originário do sudeste asiático.',
    riscoConfusao: 'Não confundir com cúrcuma (Curcuma longa), que tem rizoma intensamente amarelo/alaranjado por dentro (curcumina). O gengibre é amarelo-pálido por dentro. Alpinia galanga (galanga) é parente próxima mas com aroma mais cânfora e uso culinário diferente.',
    imagem: imgGengibre,
    parteUsada: 'Rizoma (raiz)',
    justificativaParte: 'O rizoma é órgão de reserva da planta, concentrando gingerol (1-3% do peso seco) e shogaol. Gingerol é termolábil — se converte em shogaol durante a desidratação. Ambos são bioativos, mas com perfis diferentes. Folhas e flores possuem teor insignificante dos compostos terapêuticos.',
    classesQuimicas: ['Compostos fenólicos (gingerois)', 'Sesquiterpenos', 'Monoterpenos', 'Diarilheptanoides'],
    moleculasEspecificas: '6-gingerol (principal composto bioativo fresco), 6-shogaol (principal na raiz seca, 2x mais picante), zingerona (formada no cozimento), zingibereno (sesquiterpeno aromático), paradol.',
    sistemaModulado: 'Sistema imune, gastrointestinal e musculoesquelético',
    viaBioquimica: '6-gingerol e 6-shogaol inibem cicloxigenase-2 (COX-2) e lipoxigenase-5 (LOX-5), reduzindo síntese de prostaglandinas PGE2 e leucotrienos LTB4. Ação antiemética via antagonismo serotoninérgico (receptor 5-HT3) no centro do vômito bulbar. Efeito termogênico por ativação de TRPV1.',
    respostaFisiologica: 'Redução de náusea, diminuição de inflamação sistêmica, alívio de dor muscular, melhora da circulação periférica, aumento da termogênese.',
    indicacoes: [
      { sistema: 'Digestivo', sintomas: ['Náusea leve a moderada', 'Enjoo de movimento (cinetose)', 'Náusea gestacional (sob orientação)'] },
      { sistema: 'Imune/Inflamatório', sintomas: ['Inflamação sistêmica leve', 'Dor muscular pós-exercício', 'Início de gripe'] },
    ],
    metodo: 'Decocção curta ou uso cru',
    proporcao: 'Decocção: 1-2g de raiz fresca ralada para 200ml de água. Uso cru: mascar 1 fatia fina para náusea aguda.',
    tempoInfusao: 'Ferver por 5 minutos, repousar 5 minutos.',
    frequencia: '1 a 2 xícaras ao dia.',
    doseAdulto: '2 xícaras ao dia ou até 4g de raiz fresca/dia.',
    doseIdoso: '1 xícara ao dia. Monitorar pressão e coagulação.',
    doseCrianca: 'Acima de 6 anos: ½ xícara ao dia. Para náusea infantil, gengibre cristalizado (1-2 pedaços pequenos) é alternativa.',
    contraindicacoes: ['Úlcera gástrica ativa', 'Gastrite erosiva', 'Coagulopatias', 'Doença de Crohn em crise', 'Pré-operatório (suspender 7 dias antes)'],
    interacoesMedicamentosas: ['Anticoagulantes — potencialização aditiva', 'Anti-hipertensivos — efeito hipotensor aditivo', 'Hipoglicemiantes — monitorar glicemia', 'AINEs — aumento de risco de sangramento GI'],
    tipoUso: 'Pontual a moderado',
    maxDias: '14 dias em dose terapêutica. Intervalo de 7 dias. Uso culinário diário em dose baixa é seguro.',
    sinaisSuspensao: ['Queimação gástrica persistente', 'Sangramento incomum', 'Palpitações', 'Diarreia', 'Azia que piora com gengibre'],
    accent: 'text-amber-400', border: 'border-amber-500/30',
    impactoTermico: 'aquecedora',
    sinergias: 'Gengibre + Alho: anti-inflamatório sistêmico potente. Gengibre + Capim-limão: gripe leve com dor corporal. Gengibre + Mel + Limão: protocolo clássico para início de infecção.',
  },
];

/* ═══════════════════════════════════════════
   SISTEMA MUSCULAR & INFLAMATÓRIO
═══════════════════════════════════════════ */
export const MUSCULAR: PlantaFicha[] = [
  {
    nome: 'Arnica',
    variacoesRegionais: ['Arnica-montana', 'Arnica-verdadeira', 'Arnica-europeia', 'Tabaco-de-montanha'],
    cientifico: 'Arnica montana L.',
    familia: 'Asteraceae (Compositae)',
    morfologia: 'Herbácea perene, 20-60cm. Roseta basal de folhas ovaladas, pubescentes. Capítulos florais solitários, grandes, amarelo-alaranjados, com pétalas estreitas (lígulas) e aroma balsâmico. Caule piloso com poucas folhas. Habitat: prados de montanha na Europa. No Brasil, usa-se Arnica montana importada ou substitutos locais (Solidago microglossa).',
    riscoConfusao: 'Frequentemente substituída no Brasil por Solidago microglossa (arnica-brasileira) ou Lychnophora ericoides (arnica-da-serra). Estas são espécies DIFERENTES com perfis bioquímicos distintos. A ficha refere-se exclusivamente à A. montana. Se usando arnica-brasileira, a dosagem e contraindicações podem diferir.',
    imagem: imgArnica,
    parteUsada: 'Flor (capítulo floral) — USO EXCLUSIVAMENTE EXTERNO',
    justificativaParte: 'Os capítulos florais concentram lactonas sesquiterpênicas (helenalina, 0,2-0,8%), os compostos anti-inflamatórios principais. A helenalina é CARDIOTÓXICA por via oral, razão pela qual o uso é estritamente tópico. Raízes e folhas possuem teor menor e não são utilizadas.',
    classesQuimicas: ['Lactonas sesquiterpênicas', 'Flavonoides', 'Carotenoides', 'Ácidos fenólicos', 'Óleos essenciais'],
    moleculasEspecificas: 'Helenalina (0,2-0,8%), dihidrohelenalina, arnifolin, flavonoides (isoquercetina, astragalina, patulitina), ácido cafeico, ácido clorogênico, timol.',
    sistemaModulado: 'Sistema musculoesquelético — resposta inflamatória local',
    viaBioquimica: 'A helenalina inibe o fator de transcrição NF-κB, suprimindo a expressão de citocinas pró-inflamatórias (TNF-α, IL-1β, IL-6) no local de aplicação. Adicionalmente, estimula vasodilatação local, aumentando perfusão sanguínea na região traumatizada, o que acelera reabsorção de hematomas.',
    respostaFisiologica: 'Redução do edema local, aceleração da reabsorção de hematomas, alívio de dor localizada por contusão, melhora da microcirculação no ponto de aplicação.',
    indicacoes: [
      { sistema: 'Musculoesquelético (USO TÓPICO)', sintomas: ['Hematomas por trauma', 'Contusões musculares', 'Dor muscular localizada pós-esforço', 'Edema por trauma superficial', 'Entorses leves'] },
    ],
    metodo: 'Uso tópico — pomada, gel ou compressa',
    proporcao: 'Pomada/gel: aplicar fina camada 2-3x/dia. Compressa: infusão concentrada (5g de flores secas em 100ml), aplicar com gaze na área afetada.',
    tempoInfusao: 'Compressa: preparar infusão por 15 minutos, esfriar e aplicar.',
    frequencia: '2 a 3 aplicações ao dia sobre pele íntegra.',
    doseAdulto: 'Uso tópico limitado à área afetada. Máximo 7 dias contínuos na mesma região.',
    doseIdoso: 'Mesma posologia. Pele frágil pode apresentar irritação mais rapidamente.',
    doseCrianca: 'Acima de 3 anos: uso tópico em pequenas áreas. NUNCA em mucosas. NUNCA permitir ingestão.',
    contraindicacoes: ['NUNCA ingerir — helenalina é cardiotóxica (arritmia, parada cardíaca)', 'Feridas abertas ou pele lesionada', 'Mucosas', 'Grandes áreas corporais', 'Dermatite ativa no local', 'Alergia a Asteraceae'],
    interacoesMedicamentosas: ['Anticoagulantes tópicos (heparinoides) — potencialização local', 'Em geral, uso tópico possui risco baixo de interação sistêmica'],
    tipoUso: 'Pontual — apenas durante trauma ativo',
    maxDias: '7 dias contínuos na mesma região.',
    sinaisSuspensao: ['Dermatite de contato (vermelhidão, prurido, bolhas)', 'Irritação cutânea persistente', 'Piora do edema (raro, possível reação alérgica)', 'Qualquer sinal de absorção sistêmica (náusea, palpitação)'],
    accent: 'text-orange-400', border: 'border-orange-500/30',
    impactoTermico: 'aquecedora',
    sinergias: 'Arnica (tópica) + Gengibre (oral): dor muscular pós-exercício (anti-inflamatório local + sistêmico). Arnica + Babosa: trauma com abrasão superficial.',
  },
  {
    nome: 'Babosa',
    variacoesRegionais: ['Aloe vera', 'Erva-de-azebre', 'Babosa-medicinal', 'Caraguatá'],
    cientifico: 'Aloe vera (L.) Burm.f. (sin. Aloe barbadensis)',
    familia: 'Asphodelaceae (anteriormente Liliaceae)',
    morfologia: 'Suculenta perene, 40-80cm. Folhas grossas, carnosas, lanceoladas, verde-acinzentado, com bordas serrilhadas (espinhos moles). Corte transversal revela gel translúcido interno e camada amarela periférica (látex/aloína). Flores tubulares amarelas em escapo ereto. Habitat: originária da Península Arábica, amplamente cultivada.',
    riscoConfusao: 'Várias espécies de Aloe existem — A. vera tem folhas verde-acinzentadas, manchas claras quando jovem. Aloe arborescens (babosa-de-árvore) é diferente: mais arbustiva, folhas menores. O gel interno é similar em ambas, mas a composição de aloína difere. Para uso tópico, ambas são aceitáveis.',
    imagem: imgBabosa,
    parteUsada: 'Gel interno da folha (mucilagem translúcida)',
    justificativaParte: 'O gel translúcido central concentra acemanana (polissacarídeo, principal bioativo cicatrizante). A camada amarela periférica contém aloína (antraquinona laxante e hepatotóxica) — DEVE SER REMOVIDA antes do uso. A separação gel/látex é essencial para segurança.',
    classesQuimicas: ['Polissacarídeos (acemanana)', 'Antraquinonas (na camada amarela)', 'Ácidos orgânicos', 'Vitaminas', 'Minerais'],
    moleculasEspecificas: 'Acemanana (polissacarídeo principal), aloína A e B (antraquinonas — APENAS na camada amarela), ácido salicílico natural, lignina, saponinas, vitaminas A, C, E, B12, ácido fólico.',
    sistemaModulado: 'Sistema tegumentar (pele) — resposta cicatricial',
    viaBioquimica: 'Acemanana estimula macrófagos e fibroblastos, acelerando deposição de colágeno tipo III na ferida. O ácido salicílico natural possui ação anti-inflamatória leve (inibição de COX). Lignina facilita penetração dos compostos na pele. Conjunto promove cicatrização acelerada e hidratação profunda.',
    respostaFisiologica: 'Hidratação imediata da pele, alívio de dor em queimaduras, aceleração de cicatrização, redução de inflamação cutânea. Sensação de frescor.',
    indicacoes: [
      { sistema: 'Tegumentar (USO TÓPICO)', sintomas: ['Queimaduras de 1º grau (solares)', 'Irritação cutânea leve', 'Prurido (coceira) localizado', 'Hidratação de pele ressecada', 'Pequenas escoriações superficiais'] },
    ],
    metodo: 'Aplicação direta do gel fresco',
    proporcao: 'Cortar folha, abrir ao meio, extrair gel translúcido interno com colher (DESCARTAR camada amarela/aloína). Aplicar diretamente sobre área limpa.',
    tempoInfusao: 'Aplicação imediata após extração. Gel perde atividade em 2 horas após exposição ao ar.',
    frequencia: '2 a 3 aplicações ao dia.',
    doseAdulto: 'Uso tópico — sem limite de área corporal.',
    doseIdoso: 'Mesma posologia. Excelente para pele senil ressecada.',
    doseCrianca: 'Acima de 1 ano: uso tópico livre. NUNCA permitir ingestão.',
    contraindicacoes: ['NÃO ingerir — aloína (camada amarela) é laxante potente e hepatotóxica em uso oral crônico', 'Feridas profundas infectadas (pode selar bactérias)', 'Queimaduras de 2º grau com bolhas extensas (avaliação médica)', 'Queimaduras de 3º grau', 'Gestantes (uso oral)'],
    interacoesMedicamentosas: ['Uso tópico: sem interações significativas', 'Uso oral (NÃO recomendado): diuréticos (desequilíbrio eletrolítico), digitálicos (hipocalemia potencializa toxicidade digitálica)'],
    tipoUso: 'Moderado a contínuo (uso tópico)',
    maxDias: 'Uso tópico: sem restrição temporal significativa. Uso contínuo para hidratação é aceitável.',
    sinaisSuspensao: ['Irritação ou vermelhidão no local de aplicação', 'Prurido que piora após aplicação', 'Reação alérgica (raro)', 'Sinais de infecção na ferida (pus, calor, dor crescente)'],
    accent: 'text-emerald-400', border: 'border-emerald-500/30',
    impactoTermico: 'refrescante',
    sinergias: 'Babosa + Mel: queimaduras leves (hidratação + antimicrobiano). Babosa + Arnica: trauma com abrasão (cicatrização + anti-inflamatório).',
  },
];

/* ═══════════════════════════════════════════
   DADOS DA MATRIZ COMPARATIVA
═══════════════════════════════════════════ */
export interface MatrizEntry {
  planta: string;
  sistema: string;
  compostosPrincipais: string;
  usoPontual: string;
  evitarEm: string;
  termico: 'Aquecedora' | 'Refrescante' | 'Neutra';
}

export const MATRIZ_DADOS: MatrizEntry[] = [
  { planta: 'Boldo', sistema: 'Digestivo', compostosPrincipais: 'Boldina, 1,8-cineol', usoPontual: 'Digestão pesada, pós-excesso', evitarEm: 'Obstrução biliar, gestantes, hepatopatia', termico: 'Aquecedora' },
  { planta: 'Hortelã', sistema: 'Digestivo', compostosPrincipais: 'Mentol, ác. rosmarínico', usoPontual: 'Gases, cólica leve', evitarEm: 'Refluxo (DRGE), crianças <3a', termico: 'Refrescante' },
  { planta: 'Espinheira-santa', sistema: 'Digestivo', compostosPrincipais: 'Taninos, friedelin', usoPontual: 'Azia, queimação gástrica', evitarEm: 'Gestantes, anemia ferropriva', termico: 'Refrescante' },
  { planta: 'Guaco', sistema: 'Respiratório', compostosPrincipais: 'Cumarina, ác. caurenóico', usoPontual: 'Tosse produtiva', evitarEm: 'Anticoagulantes, hepatopatia', termico: 'Neutra' },
  { planta: 'Eucalipto', sistema: 'Respiratório', compostosPrincipais: '1,8-cineol (eucaliptol)', usoPontual: 'Congestão nasal (inalação)', evitarEm: 'Crianças <2a, asma severa', termico: 'Refrescante' },
  { planta: 'Capim-limão', sistema: 'Resp. / Nervoso', compostosPrincipais: 'Citral, mirceno', usoPontual: 'Resfriado leve, tensão', evitarEm: 'Gestantes (dose alta)', termico: 'Neutra' },
  { planta: 'Camomila', sistema: 'Nervoso', compostosPrincipais: 'Apigenina, bisabolol', usoPontual: 'Ansiedade leve, insônia', evitarEm: 'Alergia a Asteraceae', termico: 'Neutra' },
  { planta: 'Mulungu', sistema: 'Nervoso', compostosPrincipais: 'Eritravina, erisopina', usoPontual: 'Agitação moderada', evitarEm: 'Hipotensão, psicotrópicos', termico: 'Neutra' },
  { planta: 'Alho', sistema: 'Imune', compostosPrincipais: 'Allicina, ajoeno', usoPontual: 'Defesa imune, antimicrobiano', evitarEm: 'Anticoagulantes, pré-cirurgia', termico: 'Aquecedora' },
  { planta: 'Gengibre', sistema: 'Imune / Digest.', compostosPrincipais: '6-gingerol, shogaol', usoPontual: 'Náusea, inflamação leve', evitarEm: 'Úlcera ativa, coagulopatia', termico: 'Aquecedora' },
  { planta: 'Arnica', sistema: 'Muscular', compostosPrincipais: 'Helenalina', usoPontual: 'Hematomas, contusões (TÓPICO)', evitarEm: 'USO ORAL, feridas abertas', termico: 'Aquecedora' },
  { planta: 'Babosa', sistema: 'Tegumentar', compostosPrincipais: 'Acemanana', usoPontual: 'Queimaduras leves (TÓPICO)', evitarEm: 'Uso oral, feridas infectadas', termico: 'Refrescante' },
];
