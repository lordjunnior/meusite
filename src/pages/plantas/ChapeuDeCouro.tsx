import PlantaIndividualLayout, { PlantaIndividualData } from '@/components/plantas/PlantaIndividualLayout';
import heroImg from '@/assets/plantas-individuais/chapeu-de-couro-hero.webp';
import comparativoImg from '@/assets/plantas-individuais/chapeu-de-couro-comparativo.webp';

const data: PlantaIndividualData = {
  slug: 'chapeu-de-couro',
  nome: 'Chapéu-de-Couro',
  cientifico: 'Echinodorus grandiflorus (Cham. & Schltdl.) Micheli',
  familia: 'Alismataceae',
  sistema: 'Renal e articular',
  capituloLabel: 'Plantas Subutilizadas, Ficha 07',
  heroImage: heroImg,
  comparativoImage: comparativoImg,
  metaTitle: 'Chapéu-de-Couro (Echinodorus grandiflorus): Anti-inflamatório Sistêmico | Ficha Técnica',
  metaDescription: 'Chapéu-de-Couro reduz inflamação sistêmica, atua em rins e articulações com ação diurética leve. Fitoquímica, dose, janela e identificação botânica.',
  keywords: 'chapéu de couro, Echinodorus grandiflorus, anti-inflamatório natural, planta para articulação, planta para rim, fitoterapia anti-inflamatória, equisetonina, planta diurética, chá de chapéu-de-couro',
  heroTitle: <>A planta que <span className="text-emerald-400">desinflama</span> sistema inteiro, sem agredir o estômago.</>,
  heroLead: 'Echinodorus grandiflorus age em duas frentes silenciosas: inflamação sistêmica de baixo grau e sobrecarga renal por retenção. Saponinas triterpênicas e flavonoides com ação anti-inflamatória documentada. Aqui está a ficha técnica completa.',
  reframing: {
    paragrafos: [
      'Chapéu-de-Couro é planta de margem de rio, brejo e várzea brasileira, com longa tradição de uso interno em quadros articulares e renais. Aparece na <em class="text-emerald-300" style="font-family: \'Instrument Serif\', serif;">Farmacopeia Brasileira</em> e em estudos da Embrapa e da UFMG sobre ação anti-inflamatória sistêmica.',
      'Não foi escondida. Foi simplesmente substituída por anti-inflamatórios não esteroidais (AINEs) sintéticos, que tratam o sintoma com custo gástrico alto. A planta age mais devagar, mas sem lesão de mucosa, sem nefrotoxicidade direta e sem o ciclo de dependência típico do uso prolongado de AINEs.',
      'Esta ficha entrega protocolo operacional. Princípio ativo, dose, janela, sinergia e contraindicação. Chapéu-de-Couro não substitui anti-inflamatório em crise aguda, mas é base de manejo crônico de inflamação articular leve a moderada.',
    ],
  },
  fitoquimica: {
    intro: 'A ação anti-inflamatória sistêmica do Chapéu-de-Couro vem da combinação entre saponinas triterpênicas, flavonoides e alcaloides leves que modulam resposta inflamatória sem bloquear ciclo-oxigenase como os AINEs sintéticos.',
    compostos: [
      { nome: 'Saponinas triterpênicas', acao: 'Modulam mediadores inflamatórios sistêmicos e atuam em quadros articulares de baixo grau e em retenção renal leve.' },
      { nome: 'Flavonoides (kaempferol, isoquercitrina)', acao: 'Antioxidantes com ação capilar protetora, reduzem permeabilidade vascular em inflamação crônica.' },
      { nome: 'Equisetonina', acao: 'Saponina específica com ação diurética leve, aumenta volume urinário sem perda eletrolítica significativa.' },
      { nome: 'Taninos suaves', acao: 'Adstringência leve que protege mucosas e modula trânsito intestinal sem causar prisão de ventre.' },
    ],
    farmacocinetica: 'A absorção das saponinas ocorre principalmente em intestino delgado com pico plasmático entre 90 e 180 minutos. Excreção renal predominante, justificando o efeito diurético associado. Meia-vida intermediária permite duas tomadas diárias com cobertura contínua. Efeito anti-inflamatório sistêmico é cumulativo, exige mínimo de 14 dias para impacto mensurável.',
  },
  funcaoBiologica: [
    { titulo: 'Anti-inflamatório sistêmico', descricao: 'Reduz marcadores inflamatórios de baixo grau associados a desconforto articular leve a moderado.' },
    { titulo: 'Diurético leve', descricao: 'Aumenta volume urinário sem perda eletrolítica significativa, ajudando a reduzir retenção hídrica leve.' },
    { titulo: 'Suporte renal', descricao: 'Protege epitélio tubular renal contra estresse oxidativo gerado por carga proteica alta ou medicação contínua.' },
    { titulo: 'Modulação articular', descricao: 'Atua em desconforto articular crônico leve por inflamação de baixo grau, especialmente em joelhos e mãos.' },
  ],
  posologia: {
    parteUsada: 'Folhas e rizoma (a folha é a parte mais usada e mais segura).',
    preparo: 'Infusão: 1 colher de sopa de folhas secas em 250 ml de água fervente, abafar 15 minutos, coar.',
    dose: '1 xícara (200 a 250 ml) por tomada.',
    frequencia: '2 a 3 vezes ao dia, longe das refeições.',
    janela: '21 dias seguidos.',
    pausa: '10 dias de pausa antes de retomar. Em quadro articular crônico, fazer 4 ciclos por ano com acompanhamento.',
  },
  identificacao: {
    autentica: {
      titulo: 'Chapéu-de-Couro autêntico',
      marcadores: [
        'Folhas grandes, lanceoladas, com nervuras paralelas longitudinais bem marcadas (típico de Alismataceae).',
        'Hábito de planta semi-aquática, encontrada em margem de brejo ou várzea úmida.',
        'Pecíolo longo e robusto, levemente esponjoso.',
        'Inflorescência em panícula alta com flores brancas pequenas (3 pétalas).',
      ],
    },
    falsa: {
      titulo: 'Risco de confusão',
      alerta: 'Echinodorus macrophyllus tem aspecto muito similar e composição parecida, mas concentração variável. Algumas Araceae aquáticas têm folhas semelhantes mas SÃO TÓXICAS para uso interno (cristais de oxalato e calcio). Folha de aguapé (Eichhornia crassipes) NÃO é Chapéu-de-Couro. Para uso terapêutico consistente, exija a identificação botânica de E. grandiflorus.',
    },
  },
  contraindicacoes: [
    'Insuficiência renal moderada a grave sem acompanhamento nefrológico.',
    'Hipotensão arterial significativa.',
    'Gestação e lactação sem orientação.',
    'Crianças abaixo de 12 anos.',
    'Distúrbios eletrolíticos não compensados (hipocalemia, hiponatremia).',
  ],
  interacoes: [
    'Diuréticos farmacêuticos (furosemida, hidroclorotiazida): pode somar efeito, risco de desidratação.',
    'Anti-hipertensivos: monitorar pressão por leve potencialização.',
    'Lítio: reduz excreção de lítio, eleva risco de toxicidade.',
    'Digitálicos: potencial interação eletrolítica, monitorar potássio.',
    'Anticoagulantes: monitoramento por leve interação capilar.',
  ],
  errosComuns: [
    'Esperar efeito de AINE em crise aguda: o efeito é gradual e cumulativo.',
    'Combinar com diurético sintético sem reduzir dose, gerando desidratação.',
    'Usar em quadro renal grave sem acompanhamento médico.',
    'Confundir com aguapé ou outras Alismataceae aquáticas tóxicas.',
    'Não aumentar ingestão de água: o uso exige hidratação compensatória.',
  ],
  faq: [
    { question: 'Chapéu-de-Couro substitui anti-inflamatório?', answer: 'Não em crise aguda. Em dor articular intensa, traumática ou pós-cirúrgica, o AINE sintético ainda é a base do manejo agudo. Chapéu-de-Couro tem papel central no MANEJO CRÔNICO de inflamação articular de baixo grau, reduzindo a necessidade de AINE contínuo. Quem usa anti-inflamatório todos os dias deve avaliar com médico a transição para protocolo combinado.' },
    { question: 'Tem ação real em ácido úrico e gota?', answer: 'Auxilia como coadjuvante por aumentar fluxo urinário e reduzir inflamação leve, mas NÃO substitui medicação específica em gota ativa (alopurinol, colchicina). Em quadro crônico controlado, o uso em ciclos pode reduzir frequência de crises leves quando combinado com restrição alimentar adequada (purinas, frutose, álcool).' },
    { question: 'Pode ser usado por quem tem hipertensão?', answer: 'Sim, com cuidado e monitoramento. O efeito diurético leve pode somar-se ao anti-hipertensivo, exigindo ajuste de dose pelo médico. Quem usa medicação contínua para pressão NÃO deve iniciar protocolo sem avaliação. Em hipertensão controlada e estável, o uso supervisionado é seguro e pode ser benéfico.' },
    { question: 'Quanto tempo para sentir efeito articular?', answer: 'Sensação de leveza e redução de retenção aparecem em 5 a 7 dias. Efeito anti-inflamatório articular mensurável exige ciclo completo de 21 dias. Para quadro crônico estabelecido, o resultado consistente aparece após 2 a 3 ciclos completos com pausa entre eles. Consistência cíclica vence intensidade pontual.' },
    { question: 'Pode ser usado em pet ou criança?', answer: 'Em pet, NÃO sem orientação de médico veterinário. A dose para humanos não se traduz para animais. Em criança abaixo de 12 anos, evitar uso interno. Acima de 12 anos, em dose reduzida e janela curta (7 dias), pode ser usado para retenção leve com orientação pediátrica.' },
  ],
};

export default function ChapeuDeCouro() {
  return <PlantaIndividualLayout data={data} />;
}