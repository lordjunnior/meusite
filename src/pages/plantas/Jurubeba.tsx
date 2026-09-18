import PlantaIndividualLayout, { PlantaIndividualData } from '@/components/plantas/PlantaIndividualLayout';
import heroImg from '@/assets/plantas-individuais/jurubeba-hero.webp';
import comparativoImg from '@/assets/plantas-individuais/jurubeba-comparativo.webp';

const data: PlantaIndividualData = {
  slug: 'jurubeba',
  nome: 'Jurubeba',
  cientifico: 'Solanum paniculatum L.',
  familia: 'Solanaceae',
  sistema: 'Hepático e digestivo',
  capituloLabel: 'Plantas Subutilizadas, Ficha 01',
  heroImage: heroImg,
  comparativoImage: comparativoImg,
  metaTitle: 'Jurubeba (Solanum paniculatum): Limpeza Hepática Real | Ficha Técnica',
  metaDescription: 'Jurubeba descongestiona fígado, ativa bile e mobiliza digestão de gorduras. Fitoquímica, dose, janela, contraindicações e como identificar a planta certa.',
  keywords: 'jurubeba, Solanum paniculatum, planta para o fígado, limpeza hepática, descongestionar fígado, fitoterapia brasileira, jurubidina, solamargina, chá de jurubeba, fígado congestionado',
  heroTitle: <>A planta que <span className="text-emerald-400">descongestiona</span> o fígado de quem come pesado.</>,
  heroLead: 'Solanum paniculatum não é folclore de avó. É um colerético-colagogo documentado, com saponinas e alcaloides esteroidais que ativam a vesícula e mobilizam bile. Aqui você recebe a ficha técnica completa, sem misticismo e sem simplificação.',
  reframing: {
    paragrafos: [
      'Quase todo brasileiro acima de 35 anos já ouviu falar da Jurubeba. Quase nenhum sabe usar. Esta planta é uma das mais estudadas no Brasil para função hepática e digestiva, com registro na <em class="text-emerald-300" style="font-family: \'Instrument Serif\', serif;">Farmacopeia Brasileira</em> e na Relação Nacional de Plantas Medicinais de Interesse ao SUS (RENISUS).',
      'O que a indústria farmacêutica fez não foi esconder. Foi reposicionar. Trocou a infusão barata por hepatoprotetor patenteado, vendido a preço de bula. A planta continua no quintal, na feira, no fundo da farmácia popular. Apenas saiu da rotina de quem confunde modernidade com terceirização do próprio fígado.',
      'Esta ficha devolve precisão operacional. Princípio ativo, dose, janela, sinergia e erro real. Fitoterapia funciona quando respeita farmacologia. Não funciona quando vira religião.',
    ],
  },
  fitoquimica: {
    intro: 'A Jurubeba concentra dois grupos de compostos que respondem pela ação hepática e digestiva. A maior parte do efeito vem da combinação entre alcaloides esteroidais e saponinas que ativam a contração da vesícula biliar.',
    compostos: [
      { nome: 'Jurubidina', acao: 'Alcaloide esteroidal com ação colerética, estimula a produção de bile pelos hepatócitos e melhora a digestão de gorduras complexas.' },
      { nome: 'Solamargina e Solasonina', acao: 'Glicoalcaloides com efeito colagogo, contraem a vesícula biliar e liberam bile estocada para o duodeno.' },
      { nome: 'Saponinas esteroidais', acao: 'Aumentam a solubilidade de lipídios no intestino e auxiliam o transporte intestinal de gorduras emulsificadas.' },
      { nome: 'Flavonoides (kaempferol, quercetina)', acao: 'Antioxidantes que protegem o hepatócito contra estresse oxidativo gerado pela metabolização de álcool e fármacos.' },
    ],
    farmacocinetica: 'A absorção dos alcaloides ocorre na mucosa intestinal alta com pico plasmático entre 30 e 90 minutos. Por isso o uso é estratégico antes das refeições, não depois. A meia-vida curta justifica a frequência de duas a três tomadas ao dia, e não dose única concentrada.',
  },
  funcaoBiologica: [
    { titulo: 'Ativa produção de bile', descricao: 'Estimula hepatócitos a sintetizar bile, melhorando a digestão de gorduras e a absorção de vitaminas lipossolúveis (A, D, E, K).' },
    { titulo: 'Descongestiona fígado', descricao: 'Reduz acúmulo metabólico em fígados sobrecarregados por álcool, fritura, açúcar refinado e medicação contínua.' },
    { titulo: 'Mobiliza vesícula', descricao: 'Estimula contração leve da vesícula biliar, evitando estase biliar e formação inicial de barro biliar.' },
    { titulo: 'Reduz estufamento pós-refeição', descricao: 'Acelera o esvaziamento gástrico e diminui sensação de empachamento em refeições pesadas.' },
  ],
  posologia: {
    parteUsada: 'Folhas e raízes secas (a raiz é mais potente, a folha é mais segura para uso prolongado).',
    preparo: 'Decocção: 1 colher de sopa rasa em 250 ml de água, ferver por 5 minutos, abafar 10 minutos, coar.',
    dose: '1 xícara (200 a 250 ml) por tomada.',
    frequencia: '2 a 3 vezes ao dia, sempre 20 a 30 minutos antes das refeições principais.',
    janela: '15 dias seguidos no máximo.',
    pausa: '7 dias de pausa antes de retomar. Nunca usar continuamente por mais de 30 dias seguidos sem orientação.',
  },
  identificacao: {
    autentica: {
      titulo: 'Jurubeba autêntica',
      marcadores: [
        'Folhas verdes lobadas, nervuras profundas e pequenas espinhas no caule e em algumas folhas.',
        'Frutos pequenos, redondos, verdes quando jovens e amarelo-claros quando maduros (nunca vermelhos).',
        'Caule fino com presença discreta de espinhos curvos.',
        'Aroma vegetal levemente amargo ao amassar a folha.',
      ],
    },
    falsa: {
      titulo: 'Risco de confusão',
      alerta: 'Outras espécies de Solanum com frutos vermelhos brilhantes (como Solanum capsicoides) NÃO são Jurubeba. São tóxicas para uso interno e podem causar intoxicação por glicoalcaloides em concentração descontrolada. Frutos vermelhos brilhantes são sinal de afastar.',
    },
  },
  contraindicacoes: [
    'Gestação em qualquer trimestre (efeito uterotônico relatado).',
    'Lactação sem orientação profissional.',
    'Úlcera péptica ativa, gastrite erosiva ou hemorragia digestiva recente.',
    'Obstrução biliar, cálculo biliar sintomático e cirrose descompensada.',
    'Crianças abaixo de 12 anos.',
  ],
  interacoes: [
    'Anti-hipertensivos: pode potencializar redução pressórica.',
    'Hipoglicemiantes orais: pode somar efeito redutor de glicemia.',
    'Anticoagulantes: monitorar sinais de sangramento.',
    'Diuréticos: pode aumentar perda hídrica em uso simultâneo.',
  ],
  errosComuns: [
    'Tomar depois das refeições, quando o efeito colerético-colagogo já é menos útil.',
    'Usar por mais de 30 dias seguidos sem pausa, irritando mucosa gástrica.',
    'Comprar planta sem origem conhecida, com risco de troca por outra Solanum tóxica.',
    'Combinar com outras coleréticas potentes (Boldo, Carqueja) sem reduzir doses.',
    'Esperar efeito mágico em uma única dose. O efeito é cumulativo em ciclos.',
  ],
  faq: [
    { question: 'Jurubeba serve para esteatose (gordura no fígado)?', answer: 'Auxilia como coadjuvante por ativar bile e mobilizar gorduras, mas esteatose é condição clínica que exige diagnóstico, ajuste alimentar profundo e acompanhamento. A planta sozinha não reverte um fígado gorduroso. Combinada com restrição de açúcar refinado, álcool e ultraprocessados, soma efeito real ao tratamento de base.' },
    { question: 'Posso tomar Jurubeba todos os dias?', answer: 'Não. O protocolo operacional é de 15 dias seguidos com pausa de 7. Uso contínuo prolongado irrita a mucosa gástrica, sobrecarrega a vesícula e gera tolerância ao efeito colerético. Consistência cíclica vence intensidade contínua.' },
    { question: 'Jurubeba pode ser usada em jejum?', answer: 'Sim, e é justamente nesse momento que o efeito colerético é mais aproveitado. Tomar 20 a 30 minutos antes das refeições principais é a janela ideal. Em jejum total prolongado, reduzir para uma única tomada matinal.' },
    { question: 'Qual a diferença entre folha e raiz?', answer: 'A raiz concentra mais alcaloides esteroidais e tem ação mais intensa, sendo mais indicada para crises digestivas pontuais. A folha tem ação mais branda e segura, sendo mais adequada para protocolos de 15 dias. Para uso doméstico, a folha é a escolha racional.' },
    { question: 'Existe interação com medicação para colesterol?', answer: 'Estatinas e fibratos são metabolizados pelo fígado. A Jurubeba pode modular essa metabolização. Não combinar sem orientação de médico ou farmacêutico clínico. O risco não é alto, mas exige avaliação individual.' },
    { question: 'Como saber se estou comprando Jurubeba real?', answer: 'Compre em farmácias com manipulação séria, herbanários com certificação ou direto de produtor com nome científico declarado (Solanum paniculatum). Folha solta de feira sem identificação tem alta taxa de troca por espécies similares. Na dúvida, exija o nome científico no rótulo.' },
  ],
};

export default function Jurubeba() {
  return <PlantaIndividualLayout data={data} />;
}