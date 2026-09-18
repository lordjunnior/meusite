import ProtocoloItemLayout, { ProtocoloItemData } from '@/components/protocolo-respiratorio/ProtocoloItemLayout';
import heroCobre from '@/assets/cobre-protocolo/cobre-hero-v2.jpg';
import imgVaso from '@/assets/cobre-protocolo/cobre-vaso-agua.jpg';
import imgSino from '@/assets/cobre-protocolo/cobre-sino-bronze.jpg';
import imgSolo from '@/assets/cobre-protocolo/cobre-solo-plantas.jpg';
import imgCofator from '@/assets/cobre-protocolo/cobre-cofator-imunologico.jpg';
import imgEquilibrio from '@/assets/cobre-protocolo/cobre-equilibrio-mineral.jpg';

const data: ProtocoloItemData = {
  slug: 'cobre',
  pillarColor: 'amber',
  badgeTopo: 'Elemento 01 — Cobre (Cu)',
  hero: {
    titulo: (
      <>
        O cobre tem 2 poderes <br />que quase ninguém conhece
      </>
    ),
    lead: 'Você foi ensinado a ver o cobre como um metal comum. Isso está incompleto. Ele é cofator de pelo menos 12 enzimas humanas e foi infraestrutura sanitária por milênios, antes de ser substituído por soluções patenteáveis.',
    imagem: heroCobre,
    metaA: '12 enzimas humanas',
    metaB: 'Uso milenar documentado',
    metaC: 'Mobile first',
  },
  metaTitle: 'Cobre: Os 2 Poderes Que Quase Ninguém Conhece (Imunidade, Antimicrobiano e Solo)',
  metaDescription: 'Guia técnico completo sobre o cobre como cofator imunológico, agente antimicrobiano de contato e micronutriente do solo. Aplicação prática, história e cuidados.',
  keywords: 'benefícios do cobre imunidade, cobre antimicrobiano, água em vaso de cobre, cobre no solo, ceruloplasmina, deficiência de cobre, cobre para imunidade',
  reframing: {
    titulo: 'Por que o cobre importa, sem misticismo.',
    paragrafos: [
      'O cobre não é apenas fio elétrico. Ele é elemento bioquímico essencial: integra a superóxido dismutase Cu/Zn, a ceruloplasmina, a citocromo c oxidase e a lisil oxidase. Sem cobre funcional, a respiração celular falha, o ferro não vira hemoglobina utilizável e o tecido conjuntivo não se forma corretamente.',
      'Civilizações antigas armazenavam água em vasos de cobre, forjavam instrumentos cirúrgicos em ligas de cobre e revestiam superfícies de contato hospitalar. Não era estética. Era estratégia sanitária empírica, hoje confirmada por estudos modernos que mostram redução de até 83% da carga bacteriana em superfícies de cobre versus aço inox.',
      'O ponto crítico: hoje o problema raramente é deficiência absoluta. É <strong>desequilíbrio funcional</strong>. Você pode ter cobre sérico normal e ainda assim ter cobre biologicamente indisponível por excesso de zinco isolado, solo empobrecido ou disbiose intestinal.',
    ],
  },
  capitulos: [
    {
      numero: 'Capítulo 01',
      badge: 'Poder 01 — Antimicrobiano de contato',
      titulo: 'O cobre que mata o que nem se vê.',
      paragrafos: [
        'Íons Cu²⁺ rompem a membrana de bactérias e vírus por reação redox direta com proteínas de superfície. Em segundos a minutos, ocorre vazamento citoplasmático, oxidação de DNA viral e interrupção da replicação. Esse mecanismo é chamado de <em>contact killing</em> e é o que justifica o uso milenar do cobre em superfícies sanitárias.',
        'Estudos hospitalares modernos (Salgado et al., 2013; Schmidt et al., 2012) mostram redução consistente de carga bacteriana em UTIs equipadas com superfícies de contato em cobre, incluindo grades de cama, maçanetas e suportes de soro. A diferença em relação ao aço inox é mensurável e clinicamente significativa.',
        'Em casa, o princípio se aplica em recipientes de armazenamento de água, utensílios de cozinha de cobre puro alimentar (sem revestimento interno cromado) e vasos do tipo <em>tamra jal</em> da tradição ayurvédica. Tempo de contato mínimo de 6 a 8 horas para efeito apreciável.',
      ],
      imagem: imgVaso,
      imagemAlt: 'Vaso de cobre martelado tradicional sendo enchido com água, ervas secas ao redor',
      imagemCaption: 'Vaso de cobre puro alimentar: tempo de contato mínimo de 6 a 8 horas para ação antimicrobiana apreciável.',
    },
    {
      numero: 'Capítulo 02',
      badge: 'Poder 02 — Cofator imunológico',
      titulo: 'Sem cobre, sua defesa enzimática trava.',
      paragrafos: [
        'A <strong>superóxido dismutase Cu/Zn</strong> é uma das principais enzimas antioxidantes do corpo, neutralizando radicais superóxido em peróxido de hidrogênio antes que danifiquem mitocôndrias. Sem cobre disponível, essa enzima perde função e o estresse oxidativo sistêmico aumenta.',
        'A <strong>ceruloplasmina</strong>, principal proteína transportadora de cobre no plasma, também é ferroxidase: converte ferro ferroso (Fe²⁺) em férrico (Fe³⁺), forma necessária para ligação à transferrina. Cobre baixo significa anemia funcional resistente à suplementação de ferro isolada.',
        'A <strong>citocromo c oxidase</strong> é a enzima terminal da cadeia respiratória mitocondrial. Sem cobre, a produção de ATP cai. Fadiga inexplicada, recuperação lenta de exercício e maior vulnerabilidade respiratória são sinais clínicos clássicos de cobre funcional baixo.',
      ],
      imagem: imgCofator,
      imagemAlt: 'Bancada de laboratório com modelo molecular em cobre, microscópio e lâmina de células sanguíneas',
      imagemCaption: 'O cobre participa da defesa antioxidante, do transporte de ferro e da produção mitocondrial de energia.',
    },
    {
      numero: 'Capítulo 03',
      badge: 'O erro moderno',
      titulo: 'Como você está perdendo cobre sem saber.',
      paragrafos: [
        '<strong>Excesso de zinco isolado:</strong> suplementação contínua de zinco acima de 40 mg/dia sem cobre derruba ceruloplasmina e cria deficiência funcional silenciosa em 3 a 6 meses. Razão zinco:cobre ideal na dieta é 8:1 a 12:1. Acima disso, problema.',
        '<strong>Solo empobrecido:</strong> agricultura intensiva com NPK sem mineralização micronutriente entrega vegetais e cereais com 40% a 60% menos cobre que registros agronômicos de 1950. Você come o mesmo vegetal e absorve metade do mineral.',
        '<strong>Absorção comprometida:</strong> uso crônico de inibidores de bomba de prótons (omeprazol, pantoprazol) reduz acidez gástrica necessária para liberação do cobre dos alimentos. Disbiose intestinal e dietas ricas em fitatos completam o estrago.',
        '<strong>Frutose alta:</strong> consumo elevado de frutose isolada (xarope de milho, refrigerante) acelera depleção hepática de cobre, conforme mostrado em estudos de Klevay e Saari.',
      ],
      imagem: imgEquilibrio,
      imagemAlt: 'Amostras minerais de cobre e zinco entre folhas verdes, cacau e utensílios de cobre',
      imagemCaption: 'Equilíbrio mineral exige contexto alimentar: cobre e zinco competem, e o excesso isolado de um altera a disponibilidade do outro.',
    },
    {
      numero: 'Capítulo 04',
      badge: 'Cobre no solo',
      titulo: 'Por que plantas crescem mais perto de cobre.',
      paragrafos: [
        'Cobre é micronutriente essencial vegetal. Participa da fotossíntese (plastocianina), da formação de lignina (estrutura da planta), de enzimas antioxidantes e da defesa contra fungos patogênicos. Solo deficiente em cobre produz folhas deformadas, crescimento fraco e baixa frutificação.',
        'Quando suplementado em equilíbrio (sulfato de cobre, óxido de cobre ou cobre quelatado), o solo responde com crescimento mais estável, maior resistência a doenças fúngicas e produção mais eficiente. Videiras, oliveiras e cítricos são particularmente responsivos.',
        'Atenção: <strong>colocar cobre perto da planta não é magia direta</strong>. Depende do pH do solo, da forma química do cobre e da quantidade. Excesso é tóxico, mata raízes e contamina lençol freático. Bordeaux mixture (calda bordalesa) é exemplo histórico de uso agrícola controlado contra fungos foliares.',
      ],
      imagem: imgSolo,
      imagemAlt: 'Raízes de planta de tomate em solo escuro com fios e grânulos de cobre visíveis',
      imagemCaption: 'Cobre como micronutriente do solo: crescimento estável, resistência fúngica e ligninificação adequada.',
    },
  ],
  protocolo: {
    titulo: 'Janela diária e equilíbrio mineral.',
    intro: 'Aplicação prática para reposição funcional de cobre em ciclos de 21 dias com pausa de 7 dias, respeitando o equilíbrio com zinco e ferro.',
    blocos: [
      {
        hora: 'Manhã',
        titulo: 'Água armazenada',
        itens: [
          'Beber 200 a 300 ml de água que ficou em vaso de cobre puro alimentar por 8 a 12 horas',
          'Recipiente sem revestimento interno cromado, polido apenas externamente',
          'Não armazenar líquidos ácidos como suco de limão, café ou kombucha no vaso',
          'Pausar 1 dia por semana para não sobrecarregar homeostase',
        ],
      },
      {
        hora: 'Refeições principais',
        titulo: 'Fontes alimentares densas',
        itens: [
          'Fígado bovino orgânico (1 a 2x por semana, fonte mais densa em cobre biodisponível)',
          'Castanha de caju, sementes de gergelim, cacau cru sem açúcar',
          'Frutos do mar: ostras, polvo, lula',
          'Cogumelos shiitake e shimeji desidratados',
        ],
      },
      {
        hora: 'Estilo de vida',
        titulo: 'Equilíbrio mineral consciente',
        itens: [
          'Manter razão zinco:cobre na dieta entre 8:1 e 12:1',
          'Não suplementar zinco isolado por mais de 4 semanas seguidas',
          'Reduzir frutose adicionada e refrigerante (depleta cobre hepático)',
          'Pedir ceruloplasmina sérica ao avaliar cobre, não apenas cobre total',
        ],
      },
    ],
  },
  historia: {
    titulo: 'O que foi abandonado, e por que isso importa.',
    paragrafos: [
      'O <em>Edwin Smith Papyrus</em>, datado de cerca de 2.400 a.C., já registrava o uso de cobre para esterilizar feridas e tratar água potável. Civilizações mediterrâneas e indianas forjavam instrumentos cirúrgicos em ligas de cobre, intuitivamente conscientes do efeito antisséptico de contato.',
      'Os sinos de igreja eram feitos de bronze (cobre + estanho) por durabilidade e ressonância acústica capaz de viajar quilômetros. O som não cura no sentido antimicrobiano, mas a frequência sonora interfere no estado emocional e na ancoragem temporal de comunidades inteiras. Era infraestrutura sensorial coletiva, perdida com a urbanização sonora moderna.',
      'Hospitais do século XIX usavam corrimãos, maçanetas e bacias de cobre como protocolo padrão de redução de infecção cruzada. A substituição em massa por aço inox e plástico no século XX foi por custo e padronização industrial, não por superioridade sanitária. Hoje, programas hospitalares de retorno ao cobre estão sendo reintroduzidos em UTIs nos EUA, Reino Unido e Chile.',
    ],
    imagem: imgSino,
    imagemAlt: 'Sino de bronze antigo com pátina verde pendurado em viga de madeira em torre de pedra com raios de luz',
    citacao: 'O cobre não foi escondido. Foi abandonado em troca de soluções patenteáveis. A diferença está na forma, não no elemento.',
  },
  erros: [
    'Suplementar zinco em altas doses sem repor cobre por mais de 4 semanas',
    'Usar vaso de cobre com revestimento interno (anula contato direto com a água)',
    'Armazenar líquidos ácidos no recipiente de cobre (libera cobre em excesso)',
    'Ignorar ceruloplasmina ao avaliar cobre, olhando só cobre total',
    'Esperar resposta em 48 horas, abandonar antes de 21 dias de protocolo',
    'Confundir excesso pontual com toxicidade crônica e parar de vez',
  ],
  faq: [
    {
      question: 'Beber água em vaso de cobre é seguro?',
      answer: 'Sim, dentro do limite. Cobre puro alimentar, tempo de contato de 8 a 12 horas, sem líquidos ácidos. Adultos toleram bem 1 a 2 copos por dia. Pausar 1 dia por semana evita acúmulo.',
    },
    {
      question: 'Qual o sinal clínico mais comum de cobre baixo?',
      answer: 'Anemia que não melhora com ferro isolado, fadiga persistente, recuperação lenta de exercício, infecções respiratórias recorrentes e despigmentação precoce de cabelos.',
    },
    {
      question: 'Suplemento de cobre oral funciona?',
      answer: 'Funciona, mas raramente é a primeira escolha. Cobre quelatado (bisglicinato) é melhor absorvido que sulfato. Idealmente combinado com avaliação de ceruloplasmina sérica antes e durante.',
    },
    {
      question: 'Excesso de cobre faz mal?',
      answer: 'Sim. Toxicidade crônica causa náusea, dor abdominal, hepatite e, em casos genéticos como doença de Wilson, dano neurológico. Por isso protocolo é em ciclos, não contínuo.',
    },
    {
      question: 'O som do sino tem efeito biológico?',
      answer: 'Tem efeito neurológico documentado sobre estado emocional e ancoragem temporal coletiva. Não tem ação antimicrobiana. É importante separar tradição simbólica de mecanismo bioquímico.',
    },
  ],
  crossLinks: [
    {
      titulo: 'Guaco — o expansor respiratório',
      descricao: 'Mikania glomerata, broncodilatador natural por cumarina. Capítulo 02 do protocolo respiratório.',
      href: '/soberania-organica/plantas-subutilizadas/guaco',
    },
    {
      titulo: 'Mel cru — o carreador biológico',
      descricao: 'Por que mel cru é veículo funcional e mel industrial é xarope. Capítulo 03 do protocolo respiratório.',
      href: '/soberania-organica/farmacia-caseira-essencial',
    },
    {
      titulo: 'Própolis — guerra invisível e 3 tipos',
      descricao: 'Com álcool, sem álcool e diluído. Como identificar potência real. Capítulo 04 do protocolo respiratório.',
      href: '/soberania-organica/propolis',
    },
  ],
};

export default function CobrePage() {
  return <ProtocoloItemLayout data={data} />;
}