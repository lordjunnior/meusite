import PlantaIndividualLayout, { PlantaIndividualData } from '@/components/plantas/PlantaIndividualLayout';
import heroImg from '@/assets/plantas-individuais/tanchagem-hero.webp';
import comparativoImg from '@/assets/plantas-individuais/tanchagem-comparativo.webp';

const data: PlantaIndividualData = {
  slug: 'tanchagem',
  nome: 'Tanchagem',
  cientifico: 'Plantago major L.',
  familia: 'Plantaginaceae',
  sistema: 'Mucosas, intestinal e respiratório',
  capituloLabel: 'Plantas Subutilizadas, Ficha 05',
  heroImage: heroImg,
  comparativoImage: comparativoImg,
  metaTitle: 'Tanchagem (Plantago major): Limpeza de Mucosas | Ficha Técnica',
  metaDescription: 'Tanchagem reduz inflamação de mucosas, mobiliza muco respiratório e protege epitélio intestinal. Fitoquímica, dose, janela e identificação botânica precisa.',
  keywords: 'tanchagem, Plantago major, planta para mucosa, anti-inflamatório natural, planta para tosse, planta para intestino inflamado, aucubina, alantoína, mucilagem, chá de tanchagem',
  heroTitle: <>A planta que <span className="text-emerald-400">acalma</span> mucosa irritada de dentro pra fora.</>,
  heroLead: 'Plantago major é cicatrizante de mucosas com base farmacológica reconhecida. Aucubina, alantoína e mucilagem agem juntas em epitélio respiratório e intestinal. Aqui está a ficha técnica completa, com dose operacional e contraindicações reais.',
  reframing: {
    paragrafos: [
      'A Tanchagem virou erva esquecida no canto da farmácia popular, mas é uma das plantas mais bem documentadas em mucosa irritada. Aparece em monografias da <em class="text-emerald-300" style="font-family: \'Instrument Serif\', serif;">Comissão E alemã</em>, na ESCOP europeia e na RENISUS brasileira para uso interno em vias aéreas e digestivas.',
      'Não foi escondida. Foi reposicionada como xarope industrializado, anti-inflamatório de balcão e bochecho farmacêutico, vendidos por valor 30 a 50 vezes maior que a planta seca. A folha continua nascendo em quintal, calçada e canteiro urbano, indiferente a marketing.',
      'Esta ficha entrega o que importa: mecanismo de ação, dose adulta, sinergia para tosse produtiva e contraindicação real. Tanchagem não é planta mística. É reparadora de epitélio com farmacologia clara.',
    ],
  },
  fitoquimica: {
    intro: 'A ação reparadora da Tanchagem vem de três grupos de compostos que agem em paralelo: iridoides anti-inflamatórios, alantoína cicatrizante e mucilagem que cria película protetora sobre a mucosa.',
    compostos: [
      { nome: 'Aucubina', acao: 'Iridoide com ação anti-inflamatória local em epitélio respiratório e digestivo, modula resposta imune da mucosa.' },
      { nome: 'Alantoína', acao: 'Cicatrizante celular que estimula proliferação de queratinócitos e fibroblastos, acelerando reparo de mucosa lesionada.' },
      { nome: 'Mucilagem (polissacarídeos)', acao: 'Forma película protetora sobre o epitélio, reduzindo atrito mecânico e isolando a mucosa de irritantes locais.' },
      { nome: 'Flavonoides (apigenina, luteolina)', acao: 'Antioxidantes que protegem a mucosa contra estresse oxidativo gerado por inflamação crônica de baixo grau.' },
    ],
    farmacocinetica: 'A ação da mucilagem é tópica imediata, formando película protetora ao contato com a mucosa. Aucubina e alantoína têm absorção intestinal rápida com pico plasmático entre 30 e 60 minutos. Por isso o chá morno tem efeito superior ao frio: a temperatura potencializa a liberação dos compostos ativos.',
  },
  funcaoBiologica: [
    { titulo: 'Reduz inflamação de mucosa', descricao: 'Aucubina age diretamente em epitélio respiratório e digestivo, baixando marcadores inflamatórios locais.' },
    { titulo: 'Mobiliza muco produtivo', descricao: 'Facilita expulsão de muco em tosse produtiva e descongestiona vias aéreas baixas sem secar a mucosa.' },
    { titulo: 'Protege epitélio intestinal', descricao: 'Mucilagem forma camada protetora em mucosa irritada por gastrite leve, refluxo ou intestino sensível.' },
    { titulo: 'Acelera cicatrização local', descricao: 'Alantoína estimula reparo celular em pequenas lesões de mucosa oral e gengival quando usada como bochecho.' },
  ],
  posologia: {
    parteUsada: 'Folhas frescas ou secas (a folha jovem é mais rica em mucilagem).',
    preparo: 'Infusão: 1 colher de sopa de folhas secas em 250 ml de água fervente, abafar 10 minutos, coar.',
    dose: '1 xícara (200 a 250 ml) por tomada, sempre morna.',
    frequencia: '2 a 3 vezes ao dia, longe das refeições principais.',
    janela: '14 a 21 dias seguidos.',
    pausa: '7 dias de pausa antes de retomar. Para uso tópico (bochecho), pode ser usada por períodos curtos sem pausa.',
  },
  identificacao: {
    autentica: {
      titulo: 'Tanchagem autêntica',
      marcadores: [
        'Folhas largas, ovais, com 5 a 7 nervuras paralelas longitudinais bem visíveis (marcador definitivo).',
        'Roseta basal de folhas saindo do mesmo ponto, rente ao solo.',
        'Espiga floral cilíndrica fina, alta, saindo do centro da roseta.',
        'Sabor neutro a levemente adstringente, sem aroma forte.',
      ],
    },
    falsa: {
      titulo: 'Risco de confusão',
      alerta: 'Várias daninhas de jardim têm folhas largas semelhantes mas SEM as nervuras paralelas longitudinais clássicas. Plantago lanceolata (Tanchagem-menor) é da mesma família e funciona, porém tem folhas estreitas e lanceoladas. Espécies de Rumex e ervas com seiva leitosa NÃO são Tanchagem e podem irritar a mucosa.',
    },
  },
  contraindicacoes: [
    'Obstrução intestinal ou suspeita de obstrução.',
    'Alergia conhecida a Plantaginaceae.',
    'Crianças abaixo de 6 anos sem orientação.',
    'Uso simultâneo com medicação oral (a mucilagem reduz absorção, separar 2 horas).',
  ],
  interacoes: [
    'Carbamazepina, lítio, digoxina: a mucilagem reduz absorção. Espaçar 2 horas no mínimo.',
    'Anticoagulantes: monitorar por leve interação relatada com vitamina K presente nas folhas.',
    'Hipoglicemiantes: pode somar leve efeito redutor de glicemia em uso prolongado.',
    'Suplementos de ferro: a mucilagem reduz absorção, separar 2 horas.',
  ],
  errosComuns: [
    'Tomar gelada, anulando a liberação ideal dos princípios ativos.',
    'Usar junto com medicação oral, comprometendo a absorção do remédio.',
    'Confundir com plantas similares de jardim sem as nervuras paralelas características.',
    'Esperar efeito antibiótico em infecções respiratórias, quando a ação é anti-inflamatória e mucolítica.',
    'Combinar com xaropes industriais sem entender a sinergia, gerando excesso de mucolítico.',
  ],
  faq: [
    { question: 'Tanchagem ajuda em tosse com catarro?', answer: 'Sim, e é uma das aplicações mais consistentes. A combinação de mucilagem (que hidrata a mucosa) com aucubina (anti-inflamatória) facilita a expulsão de muco em tosse produtiva. Para tosse seca irritativa, o efeito hidratante de mucosa também alivia, mas o ganho é menor. Em tosse persistente acima de 7 dias, exige avaliação médica.' },
    { question: 'Posso usar Tanchagem em criança?', answer: 'A partir de 6 anos, em dose reduzida (meia xícara, 1 a 2 vezes ao dia, morna), com orientação de pediatra ou farmacêutico clínico. Abaixo de 6 anos, evitar uso interno sem prescrição. O uso tópico (bochecho diluído em adolescentes) é considerado seguro para mucosa oral irritada.' },
    { question: 'Tanchagem trata gastrite?', answer: 'Auxilia como protetora de mucosa em gastrite leve por irritação alimentar, refluxo intermitente ou pós-uso de anti-inflamatório. Não substitui tratamento de gastrite por H. pylori, úlcera ativa ou lesão erosiva. Em queixa persistente, exige endoscopia e diagnóstico antes de protocolo fitoterápico.' },
    { question: 'Pode ser usada em bochecho?', answer: 'Sim, e é uma das melhores aplicações tópicas. Infusão concentrada (1 colher de sopa em 150 ml), morna, usada como bochecho 2 a 3 vezes ao dia, ajuda em aftas, gengivite leve e mucosa oral irritada. Não engolir nesse uso, e fazer apenas em janelas de 5 a 7 dias.' },
    { question: 'Tanchagem faz mal para o estômago?', answer: 'Em uso correto, não. Mucilagem é justamente protetora gástrica. O risco aparece em uso excessivo (acima de 4 xícaras ao dia), continuado por mais de 30 dias, ou em pessoas com obstrução intestinal não diagnosticada. Respeitando dose e janela, é uma das plantas com perfil de segurança mais alto em fitoterapia.' },
    { question: 'Posso fazer xarope caseiro de Tanchagem?', answer: 'Sim, com cuidado. Xarope com mel e infusão concentrada de Tanchagem é uso tradicional consolidado. Não dar mel para crianças abaixo de 1 ano (risco de botulismo). Xarope caseiro tem validade curta (5 a 7 dias em geladeira). Para uso prolongado, prefira a infusão fresca.' },
  ],
};

export default function Tanchagem() {
  return <PlantaIndividualLayout data={data} />;
}