import PlantaIndividualLayout, { PlantaIndividualData } from '@/components/plantas/PlantaIndividualLayout';
import heroImg from '@/assets/plantas-individuais/guaco-hero.webp';
import comparativoImg from '@/assets/plantas-individuais/guaco-comparativo.webp';

const data: PlantaIndividualData = {
  slug: 'guaco',
  nome: 'Guaco',
  cientifico: 'Mikania glomerata Spreng.',
  familia: 'Asteraceae',
  sistema: 'Respiratório',
  capituloLabel: 'Plantas Subutilizadas, Ficha 04',
  heroImage: heroImg,
  comparativoImage: comparativoImg,
  metaTitle: 'Guaco (Mikania glomerata): Broncodilatador Natural | Ficha Técnica',
  metaDescription: 'Guaco abre brônquios, dilui muco e modula tosse. Cumarina, dose, janela, contraindicações e identificação botânica precisa entre M. glomerata e M. laevigata.',
  keywords: 'guaco, Mikania glomerata, broncodilatador natural, tosse, asma, bronquite, cumarina, fitoterapia respiratória, xarope de guaco, Anvisa',
  heroTitle: <>O <span className="text-emerald-400">broncodilatador</span> brasileiro com fitomedicamento registrado.</>,
  heroLead: 'Mikania glomerata é uma das plantas com maior tradição respiratória no Brasil e tem fitomedicamento aprovado pela Anvisa para tosse e bronquite. Cumarina, ácido caurenoico e flavonoides que abrem brônquios, diluem secreção e modulam reflexo da tosse. Ficha técnica abaixo.',
  reframing: {
    paragrafos: [
      'O Guaco é uma das plantas brasileiras com fitomedicamento formal aprovado pela Anvisa para uso respiratório. A indicação está em bula, em farmácia, com posologia detalhada e contraindicação documentada. Não é folclore: é farmacologia consolidada.',
      'O que aconteceu foi a habitual: o xarope industrial caro virou produto e a planta in natura saiu da rotina. Ainda assim, qualquer feira de bairro vende folha seca de Guaco a preço simbólico. A diferença operacional entre o xarope industrial e o caseiro bem feito não é tão grande quanto o preço sugere.',
      'Esta ficha devolve precisão técnica: cumarina (princípio ativo central), dose adequada, janela de uso, sinergia respiratória e o erro mais comum, que é confundir M. glomerata com M. laevigata, espécie similar mas com perfil ligeiramente diferente.',
    ],
  },
  fitoquimica: {
    intro: 'A ação respiratória do Guaco vem principalmente da cumarina, um composto aromático com efeito broncodilatador, expectorante e moduladora da tosse, somada a triterpenos com ação anti-inflamatória pulmonar.',
    compostos: [
      { nome: 'Cumarina', acao: 'Princípio ativo central. Promove broncodilatação por relaxamento da musculatura lisa brônquica, fluidifica muco e modula reflexo da tosse no centro tussígeno.' },
      { nome: 'Ácido caurenoico', acao: 'Diterpeno com ação anti-inflamatória pulmonar e leve efeito antimicrobiano sobre bactérias respiratórias.' },
      { nome: 'Flavonoides (rutina, kaempferol)', acao: 'Antioxidantes que protegem o epitélio respiratório contra dano oxidativo gerado por infecção e poluição.' },
      { nome: 'Saponinas triterpênicas', acao: 'Ação expectorante leve, facilitam a eliminação de muco espesso por estímulo da motilidade ciliar.' },
    ],
    farmacocinetica: 'A cumarina tem absorção rápida pela mucosa oral e gástrica, com pico plasmático entre 30 e 60 minutos. Meia-vida intermediária permite duas a três tomadas ao dia. Metabolização hepática, com cuidado em hepatopatas e em uso de fármacos com metabolização CYP450.',
  },
  funcaoBiologica: [
    { titulo: 'Broncodilatação', descricao: 'Relaxa musculatura lisa dos brônquios, abrindo vias aéreas e melhorando o fluxo de ar em quadros leves a moderados.' },
    { titulo: 'Fluidifica muco', descricao: 'Reduz a viscosidade do muco respiratório, facilitando a eliminação produtiva da secreção em casos de tosse com catarro.' },
    { titulo: 'Modula tosse', descricao: 'Atua sobre o centro tussígeno, reduzindo episódios de tosse irritativa sem suprimir totalmente o reflexo protetor.' },
    { titulo: 'Anti-inflamatório pulmonar', descricao: 'Modula resposta inflamatória brônquica em quadros recorrentes de bronquite e processos respiratórios crônicos.' },
  ],
  posologia: {
    parteUsada: 'Folhas secas (a folha fresca tem concentração mais variável de cumarina).',
    preparo: 'Infusão: 3 g (uma colher de sopa) em 250 ml de água fervente, abafar 10 minutos, coar. Alternativa: xarope caseiro com folha seca, água, açúcar mascavo ou mel.',
    dose: 'Adulto: 1 xícara de chá ou 1 colher de sopa de xarope, 3 a 4 vezes ao dia.',
    frequencia: '3 a 4 vezes ao dia em quadros agudos, 2 vezes ao dia em manutenção leve.',
    janela: '7 a 14 dias para quadros agudos. 21 dias máximo em quadros crônicos.',
    pausa: '14 dias de pausa antes de retomar. Uso contínuo prolongado pode sobrecarregar o fígado pela cumarina.',
  },
  identificacao: {
    autentica: {
      titulo: 'Guaco autêntico (M. glomerata)',
      marcadores: [
        'Folhas opostas (em pares), com formato de coração alongado.',
        'Caule trepador, lenhoso na base e herbáceo nos ramos jovens.',
        'Aroma característico de baunilha-cumarina ao amassar a folha (marcador definitivo).',
        'Pequenas flores brancas em inflorescências terminais durante a floração.',
      ],
    },
    falsa: {
      titulo: 'Risco de confusão',
      alerta: 'A Mikania laevigata é vendida frequentemente como Guaco e tem composição similar, mas concentração de cumarina pode ser diferente. M. micrantha é uma trepadeira invasora COMUM e parecida, sem ação respiratória comprovada. Sem aroma de baunilha-cumarina ao amassar a folha, NÃO é Guaco verdadeiro. Compre de fonte com identificação botânica científica (Mikania glomerata declarado no rótulo).',
    },
  },
  contraindicacoes: [
    'Gestação (cumarina pode atravessar placenta e tem ação anticoagulante leve).',
    'Lactação sem orientação profissional.',
    'Distúrbios de coagulação ou uso de anticoagulantes (varfarina, rivaroxabana, etc.).',
    'Hepatopatia grave (sobrecarga hepática pela cumarina).',
    'Crianças abaixo de 1 ano. Entre 1 e 12 anos, dose pediátrica reduzida.',
    'Pré-cirúrgico (suspender 14 dias antes por risco hemorrágico).',
  ],
  interacoes: [
    'Anticoagulantes (varfarina, AAS, rivaroxabana): potencializa efeito anticoagulante, alto risco hemorrágico.',
    'Anti-inflamatórios não esteroidais: pode aumentar tempo de sangramento.',
    'Hepatotóxicos (paracetamol em alta dose, isoniazida): cuidado com sobrecarga hepática.',
    'Broncodilatadores convencionais: efeito aditivo, ajuste de dose pode ser necessário.',
  ],
  errosComuns: [
    'Usar em criança abaixo de 1 ano (risco de hemorragia digestiva).',
    'Combinar com aspirina ou anticoagulante sem orientação médica.',
    'Usar continuamente por mais de 21 dias seguidos sem pausa.',
    'Não diferenciar M. glomerata de M. micrantha (planta invasora sem ação).',
    'Esperar efeito broncodilatador imediato em crise de asma grave (NÃO substitui inalador de resgate).',
  ],
  faq: [
    { question: 'Guaco substitui inalador para asma?', answer: 'NÃO. Em crise asmática moderada ou grave, o inalador broncodilatador (salbutamol, formoterol) é insubstituível. O Guaco atua em quadros leves a moderados, em manutenção e como coadjuvante para reduzir a frequência de crises ao longo do tempo. Quem tem asma diagnosticada deve sempre ter o inalador disponível.' },
    { question: 'Posso dar Guaco para criança?', answer: 'Acima de 1 ano, em dose pediátrica reduzida (cerca de um terço da dose adulta) e por períodos curtos (até 7 dias). Abaixo de 1 ano, NÃO usar. A cumarina tem ação anticoagulante leve que em criança muito pequena pode causar sangramento digestivo. Preferir xarope caseiro bem feito a infusões muito concentradas.' },
    { question: 'Faz mal para o fígado?', answer: 'Em uso correto, com janela respeitada e pausa entre ciclos, NÃO faz mal. A cumarina é metabolizada pelo fígado e o uso prolongado contínuo (meses sem pausa) pode sobrecarregar a função hepática. Quem tem hepatopatia diagnosticada deve evitar ou usar apenas com orientação. Ciclos de 14 dias com pausa de 14 são seguros.' },
    { question: 'Combina com xarope de farmácia?', answer: 'Não combinar com outros xaropes que contêm cumarina ou derivados (alguns expectorantes). Pode somar com mucolíticos como acetilcisteína em casos de muco muito espesso, mas sob orientação. Nunca combinar com supressores de tosse à base de codeína em quadros com catarro: a tosse precisa eliminar a secreção.' },
    { question: 'Pode usar antes de cirurgia?', answer: 'NÃO. Suspender o Guaco pelo menos 14 dias antes de qualquer procedimento cirúrgico. A ação anticoagulante leve da cumarina pode aumentar o risco de sangramento durante e após a cirurgia. Avisar sempre o anestesista e o cirurgião sobre uso de fitoterápicos.' },
    { question: 'Diferença entre Guaco em chá e em xarope?', answer: 'O xarope (caseiro ou industrial) tem maior estabilidade da cumarina e palatabilidade superior, especialmente para crianças e idosos. O chá é mais econômico mas tem variação maior na concentração final. Para uso terapêutico consistente em quadros respiratórios, o xarope bem feito é a forma operacional preferida.' },
  ],
};

export default function Guaco() {
  return <PlantaIndividualLayout data={data} />;
}