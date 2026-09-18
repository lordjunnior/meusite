import PlantaIndividualLayout, { PlantaIndividualData } from '@/components/plantas/PlantaIndividualLayout';
import heroImg from '@/assets/plantas-individuais/quebra-pedra-hero.webp';
import comparativoImg from '@/assets/plantas-individuais/quebra-pedra-comparativo.webp';

const data: PlantaIndividualData = {
  slug: 'quebra-pedra',
  nome: 'Quebra-Pedra',
  cientifico: 'Phyllanthus niruri L.',
  familia: 'Phyllanthaceae',
  sistema: 'Renal e urinário',
  capituloLabel: 'Plantas Subutilizadas, Ficha 02',
  heroImage: heroImg,
  comparativoImage: comparativoImg,
  metaTitle: 'Quebra-Pedra (Phyllanthus niruri): Limpeza Renal | Ficha Técnica',
  metaDescription: 'Quebra-Pedra dissolve cristais, aumenta fluxo urinário e modula inflamação renal. Fitoquímica, dose, janela, contraindicações e identificação botânica precisa.',
  keywords: 'quebra-pedra, Phyllanthus niruri, planta para os rins, cálculo renal, pedra nos rins, filantina, hipofilantina, fitoterapia renal, chá de quebra-pedra, limpeza renal',
  heroTitle: <>A planta que <span className="text-emerald-400">dissolve</span> o que o rim acumulou em silêncio.</>,
  heroLead: 'Phyllanthus niruri é uma das plantas mais estudadas do mundo em nefrologia natural. Lignanas com ação antilitiásica documentada, capacidade de modular formação de cristais de oxalato e efeito diurético leve. Aqui está a ficha técnica completa, com dose operacional e contraindicações reais.',
  reframing: {
    paragrafos: [
      'Cálculo renal é uma das condições com maior taxa de recorrência: até 50% dos pacientes que formam uma pedra formam outra em 5 anos. A Quebra-Pedra tem mais de 100 estudos publicados em revistas indexadas mostrando ação sobre formação, agregação e crescimento de cristais de oxalato de cálcio.',
      'Não foi escondida. Foi traduzida em medicamento patenteado, deixada de fora da rotina preventiva e relegada a chá de avó. A planta inteira, fresca ou seca, custa quase nada e tem ação documentada em órgão regulador (RENISUS, Anvisa).',
      'Esta ficha entrega o que importa: princípio ativo, dose adulta, janela de uso, sinergia e contraindicação. Sem misticismo, sem promessa mágica. Quem já formou cálculo precisa de protocolo, não de fé.',
    ],
  },
  fitoquimica: {
    intro: 'A ação antilitiásica da Quebra-Pedra vem principalmente de uma classe rara de compostos chamada lignanas, que atuam diretamente na agregação de cristais e no relaxamento da musculatura ureteral.',
    compostos: [
      { nome: 'Filantina', acao: 'Lignana principal, inibe a agregação de cristais de oxalato de cálcio e reduz o tamanho médio dos cristais formados.' },
      { nome: 'Hipofilantina', acao: 'Lignana complementar, atua como hepatoprotetor e moduladora do metabolismo do oxalato.' },
      { nome: 'Niruri-flavonoides', acao: 'Antioxidantes que protegem células tubulares renais contra estresse oxidativo gerado pela passagem de cristais.' },
      { nome: 'Alcaloides (filantosídeo)', acao: 'Promovem leve relaxamento da musculatura lisa do ureter, facilitando a passagem espontânea de cristais pequenos.' },
    ],
    farmacocinetica: 'A absorção das lignanas ocorre principalmente em intestino delgado, com pico plasmático entre 60 e 120 minutos. Excreção renal predominante, o que justifica o efeito local nos túbulos. A meia-vida moderada permite duas a três tomadas diárias com cobertura terapêutica contínua.',
  },
  funcaoBiologica: [
    { titulo: 'Modula formação de cristais', descricao: 'Reduz a velocidade de cristalização do oxalato de cálcio nos túbulos renais, dificultando a formação de cálculos novos.' },
    { titulo: 'Aumenta fluxo urinário', descricao: 'Efeito diurético leve que aumenta o volume de urina sem perda eletrolítica significativa, ajudando a varrer cristais pequenos.' },
    { titulo: 'Reduz inflamação renal', descricao: 'Modula resposta inflamatória local em rins sobrecarregados, reduzindo dor lombar leve associada à passagem de cristais.' },
    { titulo: 'Relaxa ureter', descricao: 'Promove relaxamento leve da musculatura ureteral, facilitando a passagem de cristais pequenos sem cólica intensa.' },
  ],
  posologia: {
    parteUsada: 'Planta inteira (folhas, caule e frutos), fresca ou seca.',
    preparo: 'Infusão: 2 a 3 g (uma colher de sopa) em 250 ml de água fervente, abafar 10 minutos, coar.',
    dose: '1 xícara (200 a 250 ml) por tomada.',
    frequencia: '2 a 3 vezes ao dia, longe das refeições principais (mínimo 1 hora de distância).',
    janela: '21 dias seguidos.',
    pausa: '10 a 14 dias de pausa antes de retomar. Em quem já tem histórico de cálculo, fazer 4 ciclos por ano.',
  },
  identificacao: {
    autentica: {
      titulo: 'Quebra-Pedra autêntica',
      marcadores: [
        'Folhas pequenas, ovais, dispostas em pares ao longo do caule fino, parecendo uma pena vegetal.',
        'Pequenas cápsulas verdes (frutos) presentes na face inferior do caule, sob as folhas (marcador definitivo).',
        'Altura entre 20 e 60 cm, porte herbáceo.',
        'Sem aroma forte, sabor neutro a levemente amargo.',
      ],
    },
    falsa: {
      titulo: 'Risco de confusão',
      alerta: 'Várias plantas daninhas têm aspecto semelhante mas NÃO possuem as cápsulas embaixo das folhas. Sem essas cápsulas, não é Quebra-Pedra. Outras espécies do gênero Phyllanthus (P. tenellus, P. amarus) têm composição parecida mas concentração variável de filantina. Para uso terapêutico consistente, exija a identificação botânica de P. niruri.',
    },
  },
  contraindicacoes: [
    'Gestação (efeito uterotônico relatado em estudos animais).',
    'Lactação sem orientação profissional.',
    'Hipotensão arterial (pode reduzir ainda mais a pressão).',
    'Crianças abaixo de 12 anos.',
    'Insuficiência renal terminal sem acompanhamento nefrológico.',
  ],
  interacoes: [
    'Anti-hipertensivos: potencializa redução pressórica, monitorar.',
    'Diuréticos (furosemida, hidroclorotiazida): pode somar efeito diurético, risco de desidratação.',
    'Hipoglicemiantes orais: relato de redução adicional de glicemia.',
    'Lítio: reduz excreção de lítio, eleva risco de toxicidade.',
    'Anticoagulantes: monitoramento por interação leve relatada.',
  ],
  errosComuns: [
    'Tomar junto com refeição (reduz absorção das lignanas).',
    'Usar como tratamento de cálculo grande (acima de 6 mm geralmente exige intervenção).',
    'Não aumentar ingestão de água: o protocolo só funciona com mínimo de 2,5 litros de água ao dia.',
    'Combinar com diurético farmacêutico sem orientação, gerando desidratação.',
    'Acreditar que substitui acompanhamento urológico em quem já formou pedra.',
  ],
  faq: [
    { question: 'Quebra-Pedra dissolve pedra grande?', answer: 'Não. A ação documentada é sobre cristais e cálculos pequenos (até 4 a 5 mm). Cálculos maiores geralmente exigem intervenção urológica (litotripsia, ureteroscopia). A planta tem papel central na PREVENÇÃO de novas pedras e no manejo de cristais menores. Quem já formou pedra precisa de avaliação urológica antes de qualquer protocolo.' },
    { question: 'Posso tomar Quebra-Pedra preventivamente?', answer: 'Sim, e é justamente onde ela mais brilha. Para quem já formou cálculo uma vez, o uso preventivo em ciclos de 21 dias com pausa de 14, repetidos 4 vezes ao ano, reduz significativamente o risco de recorrência segundo estudos clínicos. Acompanhar com hidratação adequada (2,5 a 3 litros de água ao dia) e ajuste alimentar.' },
    { question: 'Quebra-Pedra ajuda em infecção urinária?', answer: 'Tem ação coadjuvante por aumentar fluxo urinário e modular inflamação local, mas NÃO substitui antibiótico em ITU bacteriana confirmada. Pode ser usada em conjunto com tratamento médico para acelerar a melhora dos sintomas e dar suporte renal. Sozinha, não trata infecção ativa.' },
    { question: 'Tem contraindicação para quem toma remédio para pressão?', answer: 'Sim, exige cuidado. A planta tem efeito hipotensor leve e somado a anti-hipertensivos pode causar tontura, fraqueza e queda. Quem usa medicação contínua para pressão deve avaliar com médico antes de iniciar protocolo, e monitorar a pressão nas primeiras semanas.' },
    { question: 'Existe diferença entre Phyllanthus niruri e P. amarus?', answer: 'Sim, e é importante. P. niruri é a espécie mais estudada e com maior concentração documentada de filantina. P. amarus tem composição parecida mas perfil ligeiramente diferente. Em fitoterapia séria, exija o nome científico no rótulo. Plantas vendidas como Quebra-Pedra genérica em feira frequentemente são misturas de espécies diferentes.' },
    { question: 'Quanto tempo para sentir efeito?', answer: 'Aumento de fluxo urinário e leve sensação de leveza renal aparecem nos primeiros 3 a 5 dias. Efeito sobre formação de cristais é cumulativo e exige ciclos completos de 21 dias para impacto mensurável. Para prevenção sustentada, o resultado se consolida ao longo de meses, com ciclos repetidos.' },
  ],
};

export default function QuebraPedra() {
  return <PlantaIndividualLayout data={data} />;
}