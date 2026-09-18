import imgCamomila from '@/assets/planta-camomila.webp';
import imgBoldo from '@/assets/planta-boldo.webp';
import imgArnica from '@/assets/planta-arnica.webp';
import imgBabosa from '@/assets/planta-babosa.webp';
import imgHortela from '@/assets/planta-hortela.webp';
import imgGengibre from '@/assets/planta-gengibre.webp';
import imgErvaDoce from '@/assets/planta-erva-doce.webp';
import imgAlecrim from '@/assets/planta-alecrim.webp';
import imgCalendula from '@/assets/planta-calendula.webp';
import imgCapimLimao from '@/assets/planta-capim-limao.webp';
import imgGuaco from '@/assets/planta-guaco.webp';
import imgTanchagem from '@/assets/planta-tanchagem.webp';
import imgBabosaCard from '@/assets/planta-babosa-card.webp';
import imgOleoRicino from '@/assets/planta-oleo-ricino.webp';
import imgPropolis from '@/assets/propolis-colmeia.webp';

export interface PlantaData {
  slug: string;
  nome: string;
  cientifico: string;
  sistema: string;
  resumo: string;
  melhora: string[];
  ativos: { nome: string; funcao: string }[];
  mecanismo: string;
  preparo: { metodo: string; instrucao: string }[];
  dose: string;
  limiteUso: string;
  contra: string[];
  interacoes: string[];
  imagem: string;
  accent: string;
  accentBg: string;
  accentBorder: string;
}

export const PLANTAS: PlantaData[] = [
  {
    slug: 'camomila',
    nome: 'Camomila',
    cientifico: 'Matricaria chamomilla',
    sistema: 'Nervoso · Digestivo',
    resumo: 'Moduladora do sistema nervoso central com ação ansiolítica leve e anti-inflamatória gastrointestinal. Atua em receptores GABA promovendo relaxamento sem sedação profunda.',
    melhora: ['Ansiedade leve', 'Insônia leve', 'Cólicas abdominais', 'Irritação gastrointestinal', 'Inflamação de mucosas'],
    ativos: [
      { nome: 'Apigenina', funcao: 'Ação ansiolítica leve — liga-se a receptores GABA' },
      { nome: 'Bisabolol', funcao: 'Anti-inflamatório de mucosas' },
      { nome: 'Camazuleno', funcao: 'Ação calmante e antiespasmódica' },
    ],
    mecanismo: 'Atua em receptores GABA no sistema nervoso central, promovendo relaxamento leve sem sedação profunda. Reduz inflamação via modulação de citocinas inflamatórias no trato gastrointestinal. A apigenina cruza a barreira hematoencefálica, exercendo efeito ansiolítico dose-dependente.',
    preparo: [
      { metodo: 'Infusão', instrucao: '1 colher de sopa de flores secas em 200 ml de água a 90°C. Abafar 8–10 minutos. Coar.' },
      { metodo: 'Tintura', instrucao: '20–40 gotas diluídas em água, até 3 vezes ao dia.' },
    ],
    dose: '1 a 3 xícaras ao dia, preferencialmente após as refeições ou antes de dormir.',
    limiteUso: 'Até 14 dias consecutivos sem orientação profissional. Após esse período, fazer pausa de 7 dias.',
    contra: [
      'Alergia a plantas da família Asteraceae (margaridas, crisântemos)',
      'Uso concomitante com sedativos ou benzodiazepínicos — risco de potencialização',
      'Gestantes no primeiro trimestre (precaução)',
    ],
    interacoes: [
      'Benzodiazepínicos — pode potencializar o efeito sedativo',
      'Antidepressivos sedativos — risco de sonolência excessiva',
      'Anticoagulantes — interação leve, monitorar',
    ],
    imagem: imgCamomila,
    accent: 'text-yellow-400',
    accentBg: 'bg-yellow-500/10',
    accentBorder: 'border-yellow-500/25',
  },
  {
    slug: 'boldo',
    nome: 'Boldo',
    cientifico: 'Peumus boldus',
    sistema: 'Digestivo · Hepático',
    resumo: 'Estimulador da produção biliar com ação colerética potente. Uso restrito e de curta duração — hepatotóxico em doses elevadas ou uso prolongado.',
    melhora: ['Má digestão', 'Sensação de peso após refeições', 'Náusea leve', 'Distensão abdominal', 'Sobrecarga hepática leve'],
    ativos: [
      { nome: 'Boldina', funcao: 'Ação colerética — estimula produção e liberação de bile' },
    ],
    mecanismo: 'Estimula a produção de bile pelo fígado e sua liberação pela vesícula biliar, facilitando a digestão de gorduras. A boldina possui ação antioxidante hepática, mas em doses elevadas torna-se hepatotóxica.',
    preparo: [
      { metodo: 'Infusão leve', instrucao: '1 colher de chá de folhas secas em 200 ml de água a 85°C. Abafar 5 minutos. Coar imediatamente — não deixar em excesso.' },
    ],
    dose: 'Máximo 1 xícara ao dia, preferencialmente após o almoço.',
    limiteUso: 'Máximo 5 dias consecutivos. Pausa obrigatória de pelo menos 10 dias antes de repetir.',
    contra: [
      'Gravidez — em qualquer trimestre',
      'Obstrução biliar ou cálculos biliares',
      'Doença hepática grave (hepatite, cirrose)',
      'Crianças menores de 12 anos',
    ],
    interacoes: [
      'Medicamentos hepatotóxicos — risco de sobrecarga hepática',
      'Anticoagulantes — pode alterar o metabolismo',
      'Paracetamol em doses elevadas — risco combinado ao fígado',
    ],
    imagem: imgBoldo,
    accent: 'text-green-400',
    accentBg: 'bg-green-500/10',
    accentBorder: 'border-green-500/25',
  },
  {
    slug: 'arnica',
    nome: 'Arnica',
    cientifico: 'Arnica montana',
    sistema: 'Muscular · Inflamatório',
    resumo: 'Anti-inflamatória tópica potente para hematomas, contusões e dores musculares. USO EXCLUSIVAMENTE EXTERNO — ingestão pode causar parada cardíaca.',
    melhora: ['Hematomas', 'Dor muscular localizada', 'Contusões', 'Inflamação local', 'Edema por trauma'],
    ativos: [
      { nome: 'Helenalina', funcao: 'Anti-inflamatória potente — inibe NF-κB' },
      { nome: 'Lactonas sesquiterpênicas', funcao: 'Analgésica tópica' },
    ],
    mecanismo: 'Reduz resposta inflamatória local pela inibição do fator de transcrição NF-κB. Melhora a microcirculação na área aplicada, acelerando a reabsorção de hematomas. Efeito analgésico por modulação de prostaglandinas na pele.',
    preparo: [
      { metodo: 'Pomada/Gel', instrucao: 'Aplicar na região afetada 2–3 vezes ao dia com massagem suave.' },
      { metodo: 'Compressa', instrucao: 'Infusão para uso externo: 1 colher de sopa em 300 ml. Aplicar com pano limpo.' },
    ],
    dose: 'Uso tópico 2–3 vezes ao dia na área afetada.',
    limiteUso: 'Uso contínuo tópico por até 10 dias. Se não houver melhora, suspender e avaliar.',
    contra: [
      'NUNCA INGERIR — risco de arritmia e parada cardíaca',
      'Não aplicar em feridas abertas ou mucosas',
      'Pele com dermatite ou eczema ativo',
      'Alergia a plantas da família Asteraceae',
    ],
    interacoes: [
      'Anticoagulantes tópicos — pode potencializar sangramento local',
    ],
    imagem: imgArnica,
    accent: 'text-orange-400',
    accentBg: 'bg-orange-500/10',
    accentBorder: 'border-orange-500/25',
  },
  {
    slug: 'babosa',
    nome: 'Babosa',
    cientifico: 'Aloe vera',
    sistema: 'Dermatológico · Intestinal',
    resumo: 'Cicatrizante e hidratante tópico de alta eficácia. O gel fresco possui ação regenerativa comprovada em queimaduras leves e irritações cutâneas.',
    melhora: ['Queimaduras leves', 'Irritação cutânea', 'Hidratação profunda', 'Cicatrização superficial', 'Prisão de ventre (uso oral controlado)'],
    ativos: [
      { nome: 'Aloína', funcao: 'Laxativo estimulante — presente na casca' },
      { nome: 'Polissacarídeos acemananos', funcao: 'Cicatrizantes e imunomoduladores' },
      { nome: 'Vitaminas A, C, E', funcao: 'Antioxidantes e regeneradores' },
    ],
    mecanismo: 'Os polissacarídeos acemananos estimulam fibroblastos e a produção de colágeno, acelerando a cicatrização. O gel forma uma barreira hidratante que mantém o ambiente úmido ideal para regeneração celular. A aloína na casca estimula peristaltismo intestinal.',
    preparo: [
      { metodo: 'Gel fresco (tópico)', instrucao: 'Cortar a folha, remover a casca com cuidado, extrair o gel transparente e aplicar diretamente.' },
      { metodo: 'Cataplasma', instrucao: 'Aplicar o gel sobre gaze e fixar na área afetada por 30–60 minutos.' },
    ],
    dose: 'Tópico: aplicar gel fresco 2–3 vezes ao dia na área afetada.',
    limiteUso: 'Uso tópico sem limite definido. Uso oral não recomendado sem orientação profissional.',
    contra: [
      'Gravidez — a aloína pode estimular contrações uterinas',
      'Doença intestinal inflamatória (Crohn, colite ulcerativa)',
      'Uso interno sem orientação — a aloína é irritante intestinal',
      'Crianças menores de 10 anos (uso oral)',
    ],
    interacoes: [
      'Diuréticos — risco de hipocalemia se uso oral prolongado',
      'Medicamentos cardíacos — alteração de eletrólitos',
    ],
    imagem: imgBabosa,
    accent: 'text-emerald-400',
    accentBg: 'bg-emerald-500/10',
    accentBorder: 'border-emerald-500/25',
  },
  {
    slug: 'hortela',
    nome: 'Hortelã',
    cientifico: 'Mentha x piperita',
    sistema: 'Digestivo · Respiratório',
    resumo: 'Antiespasmódico gastrointestinal com ação rápida. O mentol relaxa a musculatura lisa do estômago e intestino, aliviando gases, náuseas e desconforto.',
    melhora: ['Náusea', 'Gases intestinais', 'Tensão digestiva', 'Halitose', 'Congestão nasal leve'],
    ativos: [
      { nome: 'Mentol', funcao: 'Antiespasmódico e descongestionante' },
      { nome: 'Ácido rosmarínico', funcao: 'Anti-inflamatório' },
    ],
    mecanismo: 'O mentol atua diretamente nos canais de cálcio da musculatura lisa gastrointestinal, promovendo relaxamento e reduzindo espasmos. Na via respiratória, ativa receptores de frio (TRPM8), produzindo sensação de desobstrução nasal.',
    preparo: [
      { metodo: 'Infusão', instrucao: '1 colher de sopa de folhas frescas em 200 ml de água a 90°C. Abafar 5–7 minutos.' },
      { metodo: 'Inalação', instrucao: 'Folhas em água quente para vapor — aspirar por 5 minutos com toalha sobre a cabeça.' },
    ],
    dose: '1–3 xícaras ao dia, preferencialmente após refeições.',
    limiteUso: 'Uso contínuo seguro por até 21 dias. Pausa de 7 dias após.',
    contra: [
      'Refluxo gastroesofágico severo — o mentol relaxa o esfíncter esofágico',
      'Crianças menores de 2 anos — risco de espasmo de glote',
      'Cálculos biliares (pode estimular contração biliar)',
    ],
    interacoes: [
      'Medicamentos para refluxo — pode antagonizar o efeito',
      'Ciclosporina — o mentol pode alterar absorção',
    ],
    imagem: imgHortela,
    accent: 'text-teal-400',
    accentBg: 'bg-teal-500/10',
    accentBorder: 'border-teal-500/25',
  },
  {
    slug: 'gengibre',
    nome: 'Gengibre',
    cientifico: 'Zingiber officinale',
    sistema: 'Digestivo · Imune · Inflamatório',
    resumo: 'Anti-inflamatório sistêmico e antiemético natural. O gingerol possui ação comprovada contra náuseas, dores leves e estados inflamatórios.',
    melhora: ['Náusea e enjoo', 'Resfriado e gripe leve', 'Dor muscular leve', 'Inflamação sistêmica leve', 'Má circulação periférica'],
    ativos: [
      { nome: 'Gingerol', funcao: 'Anti-inflamatório e antiemético' },
      { nome: 'Shogaol', funcao: 'Termogênico e analgésico' },
    ],
    mecanismo: 'Inibe a ciclooxigenase (COX-1 e COX-2), reduzindo a produção de prostaglandinas inflamatórias. Atua nos receptores 5-HT3 do sistema nervoso, bloqueando o reflexo do vômito. Efeito termogênico por ativação de receptores TRPV1.',
    preparo: [
      { metodo: 'Decocção', instrucao: '1–2 g de raiz fresca fatiada em 200 ml de água. Ferver 8–10 minutos em fogo baixo.' },
      { metodo: 'Ralado fresco', instrucao: 'Adicionar 1 colher de chá de gengibre ralado em chás ou alimentos.' },
    ],
    dose: '1–2 g de raiz fresca por dia, dividida em 1–2 xícaras.',
    limiteUso: 'Uso contínuo seguro por até 30 dias em doses moderadas. Reduzir em caso de queimação gástrica.',
    contra: [
      'Uso de anticoagulantes (varfarina, heparina) — risco de sangramento',
      'Pré-operatório (suspender 7 dias antes de cirurgia)',
      'Cálculos biliares ativos',
      'Gestantes: seguro em doses baixas para enjoo, mas consultar obstetra',
    ],
    interacoes: [
      'Anticoagulantes — potencializa efeito antitrombótico',
      'Hipoglicemiantes — pode reduzir glicemia adicionalmente',
      'Anti-hipertensivos — efeito vasodilatador aditivo',
    ],
    imagem: imgGengibre,
    accent: 'text-amber-400',
    accentBg: 'bg-amber-500/10',
    accentBorder: 'border-amber-500/25',
  },
  {
    slug: 'erva-doce',
    nome: 'Erva-doce',
    cientifico: 'Pimpinella anisum',
    sistema: 'Digestivo',
    resumo: 'Carminativo natural que relaxa a musculatura lisa do trato digestivo. Eficaz contra cólicas, gases e desconforto abdominal pós-refeição.',
    melhora: ['Cólicas abdominais', 'Gases intestinais', 'Desconforto pós-refeição', 'Flatulência', 'Espasmos digestivos leves'],
    ativos: [
      { nome: 'Anetol', funcao: 'Carminativo — relaxa musculatura lisa intestinal' },
      { nome: 'Estragol', funcao: 'Antiespasmódico complementar' },
    ],
    mecanismo: 'O anetol bloqueia canais de cálcio na musculatura lisa intestinal, reduzindo contrações espasmódicas e facilitando a eliminação de gases. Efeito suave e seguro mesmo em crianças acima de 2 anos.',
    preparo: [
      { metodo: 'Infusão', instrucao: '1 colher de chá de sementes levemente esmagadas em 200 ml de água a 90°C. Abafar 8 minutos.' },
    ],
    dose: '1–3 xícaras ao dia, entre ou após refeições.',
    limiteUso: 'Uso contínuo seguro por até 30 dias. Planta de perfil suave.',
    contra: [
      'Alergia ao anetol ou plantas da família Apiaceae',
      'Uso excessivo em gestantes (precaução — doses normais são seguras)',
    ],
    interacoes: [
      'Interações medicamentosas relevantes não documentadas em doses tradicionais',
    ],
    imagem: imgErvaDoce,
    accent: 'text-lime-400',
    accentBg: 'bg-lime-500/10',
    accentBorder: 'border-lime-500/25',
  },
  {
    slug: 'alecrim',
    nome: 'Alecrim',
    cientifico: 'Rosmarinus officinalis',
    sistema: 'Circulatório · Nervoso',
    resumo: 'Estimulante circulatório e cognitivo com potente ação antioxidante. Melhora concentração, disposição e circulação periférica.',
    melhora: ['Fadiga mental', 'Baixa circulação periférica', 'Dificuldade de concentração', 'Digestão lenta', 'Falta de disposição'],
    ativos: [
      { nome: 'Ácido rosmarínico', funcao: 'Antioxidante e anti-inflamatório' },
      { nome: 'Carnosol', funcao: 'Neuroprotetor' },
      { nome: '1,8-cineol', funcao: 'Estimulante cognitivo' },
    ],
    mecanismo: 'O ácido rosmarínico inibe a peroxidação lipídica, protegendo membranas celulares. O 1,8-cineol (eucaliptol) estimula a atividade colinérgica no cérebro, melhorando atenção e memória de trabalho. Promove vasodilatação periférica leve.',
    preparo: [
      { metodo: 'Infusão', instrucao: '1 colher de chá de folhas secas em 200 ml de água a 90°C. Abafar 5–7 minutos.' },
      { metodo: 'Banho aromático', instrucao: 'Punhado de ramos frescos em água quente do banho para circulação.' },
    ],
    dose: '1–2 xícaras ao dia, preferencialmente pela manhã ou início da tarde.',
    limiteUso: 'Uso contínuo seguro por até 21 dias. Evitar no período noturno — pode interferir no sono.',
    contra: [
      'Hipertensão arterial descontrolada',
      'Epilepsia — o 1,8-cineol pode reduzir limiar convulsivo',
      'Gestantes — pode estimular contrações uterinas',
    ],
    interacoes: [
      'Anti-hipertensivos — pode antagonizar parcialmente o efeito',
      'Anticoagulantes — interação leve',
      'Medicamentos para epilepsia — risco de interferência',
    ],
    imagem: imgAlecrim,
    accent: 'text-sky-400',
    accentBg: 'bg-sky-500/10',
    accentBorder: 'border-sky-500/25',
  },
  {
    slug: 'calendula',
    nome: 'Calêndula',
    cientifico: 'Calendula officinalis',
    sistema: 'Dermatológico · Imune',
    resumo: 'Cicatrizante tópico de excelência com ação anti-inflamatória e antimicrobiana. Uso preferencial em irritações cutâneas, assaduras e pequenas feridas.',
    melhora: ['Irritações cutâneas', 'Assaduras', 'Pequenas feridas superficiais', 'Dermatite leve', 'Pele ressecada'],
    ativos: [
      { nome: 'Flavonoides', funcao: 'Anti-inflamatórios e antioxidantes' },
      { nome: 'Triterpenoides', funcao: 'Cicatrizantes — estimulam fibroblastos' },
      { nome: 'Carotenoides', funcao: 'Regeneradores celulares' },
    ],
    mecanismo: 'Os triterpenoides estimulam a proliferação de fibroblastos e a síntese de colágeno, acelerando o fechamento de feridas. Os flavonoides reduzem edema e eritema local. Ação antimicrobiana leve contra bactérias gram-positivas.',
    preparo: [
      { metodo: 'Infusão para uso tópico', instrucao: '2 colheres de sopa de flores secas em 300 ml de água a 90°C. Abafar 10 minutos. Usar como compressa.' },
      { metodo: 'Pomada', instrucao: 'Pomadas comerciais com 5–10% de extrato de calêndula. Aplicar 2–3x ao dia.' },
    ],
    dose: 'Uso tópico: 2–3 aplicações ao dia na área afetada.',
    limiteUso: 'Uso tópico contínuo seguro. Suspender se houver irritação ou sensibilização.',
    contra: [
      'Alergia a plantas da família Asteraceae',
      'Feridas profundas ou infectadas — requer avaliação médica',
    ],
    interacoes: [
      'Interações medicamentosas relevantes não documentadas para uso tópico',
    ],
    imagem: imgCalendula,
    accent: 'text-orange-300',
    accentBg: 'bg-orange-500/10',
    accentBorder: 'border-orange-400/25',
  },
  {
    slug: 'capim-limao',
    nome: 'Capim-limão',
    cientifico: 'Cymbopogon citratus',
    sistema: 'Nervoso · Muscular',
    resumo: 'Sedativo leve e ansiolítico natural com ação sobre o sistema nervoso central. Reduz tensão muscular e promove relaxamento sem sedação profunda.',
    melhora: ['Ansiedade leve', 'Insônia inicial', 'Tensão muscular', 'Inquietação', 'Cefaleia tensional'],
    ativos: [
      { nome: 'Citral', funcao: 'Sedativo leve — modula sistema GABAérgico' },
      { nome: 'Mirceno', funcao: 'Relaxante muscular' },
      { nome: 'Geraniol', funcao: 'Ansiolítico complementar' },
    ],
    mecanismo: 'O citral modula a transmissão GABAérgica no sistema nervoso central, promovendo relaxamento sem causar dependência. O mirceno atua como relaxante muscular leve, reduzindo tensão somática associada à ansiedade.',
    preparo: [
      { metodo: 'Infusão', instrucao: '2–3 folhas frescas cortadas em 200 ml de água a 90°C. Abafar 8–10 minutos.' },
    ],
    dose: '1–2 xícaras ao dia, preferencialmente no final da tarde ou à noite.',
    limiteUso: 'Uso contínuo seguro por até 30 dias. Planta de perfil suave.',
    contra: [
      'Hipotensão arterial — pode reduzir pressão adicionalmente',
      'Uso concomitante com sedativos em doses altas',
    ],
    interacoes: [
      'Sedativos e ansiolíticos — pode potencializar efeito',
      'Anti-hipertensivos — efeito hipotensor aditivo',
    ],
    imagem: imgCapimLimao,
    accent: 'text-yellow-300',
    accentBg: 'bg-yellow-500/10',
    accentBorder: 'border-yellow-400/25',
  },
  {
    slug: 'guaco',
    nome: 'Guaco',
    cientifico: 'Mikania glomerata',
    sistema: 'Respiratório',
    resumo: 'Broncodilatador natural com ação expectorante. A cumarina relaxa a musculatura brônquica e facilita a eliminação de muco em quadros respiratórios leves.',
    melhora: ['Tosse produtiva', 'Secreção brônquica', 'Broncoespasmo leve', 'Congestão respiratória', 'Gripe com tosse'],
    ativos: [
      { nome: 'Cumarina', funcao: 'Broncodilatadora e anti-inflamatória' },
      { nome: 'Ácido caurenóico', funcao: 'Antimicrobiano leve' },
    ],
    mecanismo: 'A cumarina relaxa a musculatura lisa brônquica, facilitando a passagem de ar. Estimula as células caliciformes a produzirem muco mais fluido, facilitando a expectoração. Ação anti-inflamatória leve nas vias aéreas.',
    preparo: [
      { metodo: 'Infusão', instrucao: '1 colher de sopa de folhas secas em 200 ml de água a 90°C. Abafar 10 minutos.' },
      { metodo: 'Xarope caseiro', instrucao: 'Decocção concentrada + mel. 1 colher de sopa 3x ao dia.' },
    ],
    dose: '1–2 xícaras ao dia ou 1 colher de sopa de xarope 3x ao dia.',
    limiteUso: 'Máximo 7 dias consecutivos. A cumarina em uso prolongado pode afetar a coagulação.',
    contra: [
      'Uso de anticoagulantes — a cumarina potencializa sangramento',
      'Doença hepática — a cumarina é metabolizada pelo fígado',
      'Gestantes e lactantes',
      'Crianças menores de 6 anos',
    ],
    interacoes: [
      'Varfarina e anticoagulantes — interação grave, evitar uso simultâneo',
      'Medicamentos hepatotóxicos — sobrecarga hepática',
    ],
    imagem: imgGuaco,
    accent: 'text-green-300',
    accentBg: 'bg-green-500/10',
    accentBorder: 'border-green-400/25',
  },
  {
    slug: 'tanchagem',
    nome: 'Tanchagem',
    cientifico: 'Plantago major',
    sistema: 'Respiratório · Dermatológico',
    resumo: 'Protetora de mucosas com ação anti-inflamatória e cicatrizante. As mucilagens formam película protetora sobre tecidos irritados, aliviando dor e inflamação.',
    melhora: ['Irritação de garganta', 'Inflamação de mucosas', 'Pequenas lesões cutâneas', 'Gengivite leve', 'Aftas'],
    ativos: [
      { nome: 'Aucubina', funcao: 'Anti-inflamatória e antimicrobiana' },
      { nome: 'Mucilagens', funcao: 'Protetoras de mucosas — formam película' },
      { nome: 'Taninos', funcao: 'Adstringentes e hemostáticos' },
    ],
    mecanismo: 'As mucilagens formam uma película protetora sobre mucosas inflamadas, reduzindo o contato com agentes irritantes e promovendo cicatrização. A aucubina possui ação antimicrobiana contra bactérias gram-positivas e anti-inflamatória local.',
    preparo: [
      { metodo: 'Gargarejo', instrucao: '2 colheres de sopa de folhas em 300 ml de água a 90°C. Abafar 10 minutos. Gargarejar 3x ao dia.' },
      { metodo: 'Compressa', instrucao: 'Folhas frescas amassadas aplicadas sobre pequenas lesões cutâneas por 20–30 minutos.' },
    ],
    dose: 'Gargarejo ou compressa 2–3 vezes ao dia.',
    limiteUso: 'Uso contínuo seguro por até 14 dias para uso tópico/gargarejo.',
    contra: [
      'Alergia conhecida à planta',
      'Feridas profundas ou infectadas — requer avaliação médica',
    ],
    interacoes: [
      'Interações medicamentosas relevantes não documentadas em uso tópico/gargarejo',
    ],
    imagem: imgTanchagem,
    accent: 'text-emerald-300',
    accentBg: 'bg-emerald-500/10',
    accentBorder: 'border-emerald-400/25',
  },
  {
    slug: 'babosa-acemannan',
    nome: 'Babosa & Acemannan',
    cientifico: 'Aloe barbadensis Miller',
    sistema: 'Multisistêmico · Imunológico',
    resumo: 'A molécula imunomoduladora acemannan recebeu status de medicamento órfão pela FDA em 1995 e desapareceu da pesquisa pública. Investigação completa com relatos reais e evidências científicas.',
    melhora: ['Imunomodulação', 'Regeneração celular', 'Cicatrização', 'Anti-inflamatório', 'Hidratação profunda'],
    ativos: [
      { nome: 'Acemannan', funcao: 'Imunomodulador, ativa macrófagos e células NK' },
      { nome: 'Polissacarídeos', funcao: 'Cicatrizantes e regeneradores celulares' },
      { nome: 'Vitaminas A, C, E, B12', funcao: 'Antioxidantes e nutricionais' },
    ],
    mecanismo: 'O acemannan ativa diretamente os macrófagos e células NK do sistema imunológico, promovendo resposta imune sem superestimulação. Os polissacarídeos estimulam fibroblastos e produção de colágeno.',
    preparo: [
      { metodo: 'Gel fresco', instrucao: 'Cortar folha, remover casca com cuidado, extrair gel transparente interno (sem aloína).' },
      { metodo: 'Suco processado', instrucao: '20ml do gel processado (sem aloína) misturado em água ou suco.' },
    ],
    dose: 'Tópico: gel fresco 2-3x ao dia. Interno: 20ml do gel processado (sem aloína) 1x ao dia.',
    limiteUso: 'Uso tópico sem limite. Uso oral consultar profissional.',
    contra: [
      'Gravidez, a aloína pode estimular contrações uterinas',
      'Doença intestinal inflamatória',
      'Nunca ingerir a casca (contém aloína irritante)',
    ],
    interacoes: [
      'Diuréticos, risco de hipocalemia se uso oral prolongado',
      'Medicamentos cardíacos, alteração de eletrólitos',
    ],
    imagem: imgBabosaCard,
    accent: 'text-emerald-400',
    accentBg: 'bg-emerald-500/10',
    accentBorder: 'border-emerald-500/25',
  },
  {
    slug: 'oleo-ricino-biohacker',
    nome: 'Óleo de Rícino',
    cientifico: 'Ricinus communis',
    sistema: 'Anti-inflamatório · Linfático',
    resumo: 'O ácido ricinoleico possui capacidade única de penetração transdérmica que dissolve inflamações sistêmicas. Uma ferramenta de biohacking de baixo custo que a indústria farmacêutica silencia.',
    melhora: ['Inflamação sistêmica', 'Drenagem linfática', 'Dor articular', 'Regeneração capilar', 'Desintoxicação hepática'],
    ativos: [
      { nome: 'Ácido ricinoleico (90%)', funcao: 'Anti-inflamatório transdérmico, atua nos receptores EP3' },
      { nome: 'Ácido oleico', funcao: 'Emoliente e veículo de penetração cutânea' },
      { nome: 'Ácido linoleico', funcao: 'Regenerador de barreira cutânea' },
    ],
    mecanismo: 'O ácido ricinoleico atua nos receptores EP3 de prostaglandina, drenando o sistema linfático com eficácia superior a cremes sintéticos. A molécula atravessa a barreira cutânea e atinge tecidos profundos.',
    preparo: [
      { metodo: 'Cataplasma hepática', instrucao: 'Saturar flanela com óleo, aplicar sobre o fígado, cobrir com plástico e bolsa térmica por 45-60 min.' },
      { metodo: 'Uso tópico direto', instrucao: 'Aplicar óleo puro na região inflamada com massagem circular por 5 min.' },
    ],
    dose: 'Uso tópico: 1-2 aplicações ao dia. Cataplasma: 3-4x por semana.',
    limiteUso: 'Uso tópico contínuo seguro. Uso oral NÃO recomendado sem orientação.',
    contra: [
      'Gravidez, pode estimular contrações',
      'Uso oral sem orientação (laxante agressivo)',
      'Pele com feridas abertas profundas',
    ],
    interacoes: [
      'Medicamentos tópicos, pode aumentar absorção transdérmica',
    ],
    imagem: imgOleoRicino,
    accent: 'text-amber-400',
    accentBg: 'bg-amber-500/10',
    accentBorder: 'border-amber-500/25',
  },
  {
    slug: 'propolis',
    nome: 'Própolis',
    cientifico: 'Resina apícola (Apis mellifera)',
    sistema: 'Imunidade · Antimicrobiano · Cicatrização',
    resumo: 'Resina coletada e biotransformada pelas abelhas. Antibacteriano, antiviral, antifúngico e imunomodulador natural com Artepilin C, CAPE e flavonoides bioativos.',
    melhora: ['Imunidade', 'Garganta inflamada', 'Gastrite e H. pylori', 'Cicatrização', 'Saúde bucal'],
    ativos: [
      { nome: 'Artepilin C', funcao: 'Marcador exclusivo da própolis verde brasileira, antitumoral e anti inflamatório' },
      { nome: 'CAPE (Éster fenetil do ácido caféico)', funcao: 'Imunomodulador, inibe NF kB' },
      { nome: 'Flavonoides (galangina, pinocembrina)', funcao: 'Antioxidante e antiviral de amplo espectro' },
      { nome: 'Isoflavonoides', funcao: 'Marcadores da própolis vermelha, ação hormonal e antibacteriana' },
    ],
    mecanismo: 'Inibe síntese de RNA bacteriano, bloqueia adesão viral em células e modula resposta imune via NF kB e citocinas. Atravessa biofilmes que antibióticos sintéticos não alcançam.',
    preparo: [
      { metodo: 'Extrato alcoólico 30%', instrucao: '30g de própolis bruta moída em 100ml de álcool de cereais 70%, maceração 14 dias ao abrigo da luz, agitação diária.' },
      { metodo: 'Spray de garganta', instrucao: 'Diluir extrato 30% em água destilada na proporção 1:3 com glicerina vegetal.' },
    ],
    dose: 'Extrato 30%: 20 a 30 gotas em água, 2 a 3x ao dia. Pastilhas: 1 a 2x ao dia em quadros agudos.',
    limiteUso: 'Uso contínuo seguro em ciclos de 30 dias com pausa de 7 dias.',
    contra: [
      'Alergia a produtos apícolas (mel, geleia real)',
      'Crianças menores de 1 ano (risco de botulismo)',
      'Asma alérgica não controlada',
    ],
    interacoes: [
      'Anticoagulantes (potencializa efeito)',
      'Imunossupressores (antagonismo)',
    ],
    imagem: imgPropolis,
    accent: 'text-amber-300',
    accentBg: 'bg-amber-500/10',
    accentBorder: 'border-amber-500/30',
  },
];


export function getPlantaBySlug(slug: string): PlantaData | undefined {
  return PLANTAS.find(p => p.slug === slug);
}
