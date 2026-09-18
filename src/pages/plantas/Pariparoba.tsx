import PlantaIndividualLayout, { PlantaIndividualData } from '@/components/plantas/PlantaIndividualLayout';
import heroImg from '@/assets/plantas-individuais/pariparoba-hero.webp';
import comparativoImg from '@/assets/plantas-individuais/pariparoba-comparativo.webp';

const data: PlantaIndividualData = {
  slug: 'pariparoba',
  nome: 'Pariparoba',
  cientifico: 'Pothomorphe umbellata (L.) Miq.',
  familia: 'Piperaceae',
  sistema: 'Hepático e linfático',
  capituloLabel: 'Plantas Subutilizadas, Ficha 06',
  heroImage: heroImg,
  comparativoImage: comparativoImg,
  metaTitle: 'Pariparoba (Pothomorphe umbellata): Drenagem Hepática e Linfática | Ficha Técnica',
  metaDescription: 'Pariparoba estimula fígado, drena sistema linfático e mobiliza toxinas profundas. Fitoquímica, posologia, identificação botânica e contraindicações.',
  keywords: 'pariparoba, Pothomorphe umbellata, drenagem linfática natural, planta para fígado, 4-nerolidilcatecol, fitoterapia hepática, caapeba, malvarisco, planta desintoxicante, chá de pariparoba',
  heroTitle: <>A planta que <span className="text-emerald-400">drena</span> o que outras só prometem mover.</>,
  heroLead: 'Pothomorphe umbellata é uma das plantas mais subestimadas do Brasil. Atua simultaneamente em fígado e sistema linfático, com 4-nerolidilcatecol antioxidante e ação imunomoduladora documentada. Aqui está a ficha técnica completa.',
  reframing: {
    paragrafos: [
      'A Pariparoba aparece em quintal, beira de mata, terreno baldio. E continua sendo confundida com erva daninha por quem nunca leu uma monografia botânica. É uma das poucas plantas brasileiras com ação simultânea em fígado e sistema linfático, documentada em estudos da <em class="text-emerald-300" style="font-family: \'Instrument Serif\', serif;">USP, UNICAMP e da Fiocruz</em>.',
      'Não foi escondida. Foi excluída do imaginário urbano. Quem tem grama no jardim arranca pariparoba achando que é mato. Quem tem fígado congestionado paga caro por hepatoprotetor sintético, sem saber que a folha que ele jogou fora tinha 4-nerolidilcatecol, princípio ativo com ação antioxidante hepática reconhecida.',
      'Esta ficha entrega o que falta: mecanismo molecular, dose adulta, janela operacional e contraindicação. Pariparoba não é mística. É drenagem hepático-linfática com base farmacológica.',
    ],
  },
  fitoquimica: {
    intro: 'A potência da Pariparoba vem de uma classe rara de fenilpropanoides, especialmente o 4-nerolidilcatecol (4-NRC), considerado o composto-marcador da espécie e responsável pela maior parte da ação hepatoprotetora.',
    compostos: [
      { nome: '4-Nerolidilcatecol (4-NRC)', acao: 'Fenilpropanoide marcador, com ação antioxidante hepática, neutraliza radicais livres em hepatócitos sob estresse oxidativo.' },
      { nome: 'Óleo essencial (safrol, dilapiol)', acao: 'Componentes voláteis com ação digestiva e leve estimulação de motilidade biliar e linfática.' },
      { nome: 'Flavonoides (rutina, quercetina)', acao: 'Antioxidantes que reforçam a parede de capilares linfáticos, melhorando drenagem em estase linfática leve.' },
      { nome: 'Lignanas', acao: 'Moduladoras imunológicas que auxiliam o sistema linfático a processar toxinas e resíduos metabólicos profundos.' },
    ],
    farmacocinetica: 'O 4-NRC tem absorção intestinal moderada com pico plasmático em 60 a 120 minutos. Distribuição preferencial para tecido hepático, o que justifica o efeito direto em fígado. Meia-vida intermediária permite duas tomadas diárias com cobertura terapêutica contínua. A ação linfática é cumulativa e exige protocolo mínimo de 14 dias para resultado mensurável.',
  },
  funcaoBiologica: [
    { titulo: 'Estimula fígado', descricao: '4-NRC protege hepatócitos contra estresse oxidativo gerado por álcool, fármacos e dieta inflamatória contínua.' },
    { titulo: 'Drena linfático', descricao: 'Modula motilidade linfática e ajuda a mobilizar líquido em pontos de estase leve, especialmente em região abdominal.' },
    { titulo: 'Mobiliza toxinas profundas', descricao: 'Combinação hepática e linfática acelera processamento e excreção de metabólitos retidos em uso crônico de fármacos.' },
    { titulo: 'Atua na pele', descricao: 'Efeito sistêmico se reflete em pele com excesso de oleosidade reativa e inflamação leve relacionada à sobrecarga hepática.' },
  ],
  posologia: {
    parteUsada: 'Folhas e raízes (a folha é mais segura para uso prolongado, a raiz é mais potente para uso pontual).',
    preparo: 'Decocção: 1 colher de sopa de folhas secas em 300 ml de água, ferver 5 minutos, abafar 10 minutos, coar.',
    dose: '1 xícara (200 a 250 ml) por tomada.',
    frequencia: '2 vezes ao dia, 30 minutos antes do almoço e do jantar.',
    janela: '14 a 21 dias seguidos.',
    pausa: '10 dias de pausa antes de retomar. Em protocolo de drenagem, alternar com Jurubeba a cada 3 dias potencializa o efeito.',
  },
  identificacao: {
    autentica: {
      titulo: 'Pariparoba autêntica',
      marcadores: [
        'Folhas grandes, peltadas (pecíolo inserido no centro da folha), em formato de coração com nervação palmada bem marcada.',
        'Inflorescência em umbela (várias espigas saindo do mesmo ponto, formato de guarda-chuva). Marcador definitivo.',
        'Caule articulado (com nós evidentes), típico de Piperaceae.',
        'Aroma vegetal levemente apimentado ao amassar a folha (família da pimenta-do-reino).',
      ],
    },
    falsa: {
      titulo: 'Risco de confusão',
      alerta: 'Outras Piperaceae como Piper umbellatum têm aspecto similar mas inflorescência diferente (espiga única, não umbela). Algumas Araceae (família do antúrio) têm folha em formato de coração mas SÃO TÓXICAS para uso interno (cristais de oxalato). Sem a inflorescência em umbela e o caule articulado, não é Pariparoba.',
    },
  },
  contraindicacoes: [
    'Gestação em qualquer trimestre (efeito uterotônico relatado).',
    'Lactação sem orientação profissional.',
    'Hepatopatias graves descompensadas.',
    'Crianças abaixo de 12 anos.',
    'Uso simultâneo com hepatoprotetores sintéticos sem avaliação clínica.',
  ],
  interacoes: [
    'Anticoagulantes (varfarina): monitorar INR por interação leve relatada.',
    'Indutores enzimáticos hepáticos (rifampicina, fenitoína): pode reduzir eficácia.',
    'Anti-hipertensivos: pode somar leve redução pressórica.',
    'Quimioterápicos: NÃO usar sem aval do oncologista (interfere em metabolização hepática).',
  ],
  errosComuns: [
    'Confundir com plantas tóxicas em formato de coração (Araceae).',
    'Usar continuamente acima de 30 dias, irritando vesícula biliar.',
    'Esperar efeito imediato em pele: o reflexo cutâneo aparece após o ciclo completo.',
    'Combinar com outras drenadoras potentes (Carqueja, Boldo) sem reduzir doses.',
    'Comprar folha solta em feira sem identificação botânica clara.',
  ],
  faq: [
    { question: 'Pariparoba realmente drena o sistema linfático?', answer: 'Sim, com base documentada. Estudos farmacológicos mostram modulação de motilidade linfática e melhora de drenagem em modelos de estase leve. O efeito não é igual a uma drenagem manual, mas atua em nível bioquímico, melhorando o processamento de resíduos metabólicos pelo sistema linfático profundo. O resultado é cumulativo, exige ciclo completo de 14 a 21 dias.' },
    { question: 'Posso combinar Pariparoba com Jurubeba?', answer: 'Sim, e é uma combinação clássica em fitoterapia brasileira. Jurubeba mobiliza bile e digestão, Pariparoba drena hepático-linfático. Alternar a cada 3 dias dentro do mesmo ciclo de 21 dias potencializa o efeito sem sobrecarga. Não usar as duas no mesmo horário, espaçar pelo menos 4 horas.' },
    { question: 'Pariparoba ajuda em retenção de líquido?', answer: 'Auxilia indiretamente. O efeito principal é em drenagem linfática profunda, não em diurese. Para retenção hídrica clássica, Cavalinha e Quebra-Pedra são mais diretas. Pariparoba atua em retenção de natureza linfática, geralmente associada a sobrecarga hepática crônica e processamento lento de resíduos metabólicos.' },
    { question: 'Tem efeito real em pele oleosa?', answer: 'Sim, indiretamente. Pele oleosa reativa frequentemente reflete sobrecarga hepática e processamento lento de toxinas lipossolúveis. Ao melhorar a função hepática e a drenagem linfática, a Pariparoba pode reduzir essa carga. O efeito aparece após o ciclo completo de 21 dias e exige consistência. Não substitui cuidado dermatológico em acne grave.' },
  ],
};

export default function Pariparoba() {
  return <PlantaIndividualLayout data={data} />;
}