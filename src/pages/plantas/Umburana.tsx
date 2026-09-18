import PlantaIndividualLayout, { PlantaIndividualData } from '@/components/plantas/PlantaIndividualLayout';
import heroImg from '@/assets/plantas-individuais/umburana-hero.webp';
import comparativoImg from '@/assets/plantas-individuais/umburana-comparativo.webp';

const data: PlantaIndividualData = {
  slug: 'umburana',
  nome: 'Umburana',
  cientifico: 'Amburana cearensis (Allemão) A.C.Sm.',
  familia: 'Fabaceae',
  sistema: 'Respiratório e brônquico',
  capituloLabel: 'Plantas Subutilizadas, Ficha 08',
  heroImage: heroImg,
  comparativoImage: comparativoImg,
  metaTitle: 'Umburana (Amburana cearensis): Expectorante e Anti-inflamatório Pulmonar | Ficha Técnica',
  metaDescription: 'Umburana atua em vias respiratórias inferiores, expectorante natural com cumarina e amburanina. Fitoquímica, dose, janela e identificação botânica precisa.',
  keywords: 'umburana, Amburana cearensis, planta para pulmão, expectorante natural, anti-inflamatório respiratório, cumarina, amburanina, planta da caatinga, fitoterapia respiratória, chá de umburana',
  heroTitle: <>A árvore da caatinga que <span className="text-emerald-400">descongestiona</span> brônquio inflamado.</>,
  heroLead: 'Amburana cearensis é uma das árvores mais valiosas da caatinga brasileira. Cumarina, amburanina e isoflavonoides com ação expectorante, broncodilatadora leve e anti-inflamatória pulmonar documentada. Aqui está a ficha técnica completa.',
  reframing: {
    paragrafos: [
      'A Umburana é árvore símbolo da caatinga, com casca aromática usada há séculos em manejo de quadros respiratórios persistentes. Aparece em estudos da <em class="text-emerald-300" style="font-family: \'Instrument Serif\', serif;">UFC, UFRN e da Universidade Federal do Vale do São Francisco</em> com isolamento de princípios ativos próprios da espécie.',
      'Não foi escondida. Foi marginalizada por dois fatores: distribuição regional restrita ao bioma caatinga, e substituição por broncodilatadores sintéticos (salbutamol, formoterol) e mucolíticos industrializados. A árvore continua sendo derrubada para artesanato, perdendo função terapêutica que a indústria nunca soube replicar.',
      'Esta ficha entrega o que importa: fitoquímica, dose adulta, janela operacional, sinergia respiratória e contraindicação real. Umburana não substitui medicação em crise asmática. É manejo crônico de via aérea inflamada de baixo grau.',
    ],
  },
  fitoquimica: {
    intro: 'A ação respiratória da Umburana vem da combinação entre cumarinas, isoflavonoides e amburanina, composto bioativo específico da espécie com ação expectorante e moduladora inflamatória pulmonar.',
    compostos: [
      { nome: 'Cumarina', acao: 'Composto aromático com ação expectorante, fluidifica secreção brônquica espessa e facilita eliminação de muco profundo.' },
      { nome: 'Amburanina', acao: 'Isoflavonoide marcador da espécie, com ação anti-inflamatória pulmonar e broncodilatadora leve em via aérea inferior.' },
      { nome: 'Isoflavonoides (afrormosina, isokaempferida)', acao: 'Antioxidantes que protegem epitélio brônquico contra estresse oxidativo gerado por inflamação respiratória crônica.' },
      { nome: 'Óleo essencial', acao: 'Componentes voláteis com ação aromática direta sobre vias aéreas superiores, descongestionante leve por inalação.' },
    ],
    farmacocinetica: 'A absorção das cumarinas e isoflavonoides ocorre em intestino alto com pico plasmático entre 60 e 120 minutos. Distribuição preferencial para tecido pulmonar, justificando o efeito direto em vias aéreas. Meia-vida intermediária permite duas a três tomadas diárias. O óleo essencial tem ação tópica imediata por inalação de vapor.',
  },
  funcaoBiologica: [
    { titulo: 'Expectorante profundo', descricao: 'Cumarina fluidifica secreção brônquica espessa, facilitando eliminação de muco em quadro respiratório arrastado.' },
    { titulo: 'Anti-inflamatório pulmonar', descricao: 'Amburanina modula resposta inflamatória em vias aéreas inferiores, reduzindo edema brônquico de baixo grau.' },
    { titulo: 'Broncodilatador leve', descricao: 'Efeito relaxante moderado sobre musculatura lisa brônquica, melhora fluxo de ar em obstrução leve.' },
    { titulo: 'Descongestionante por inalação', descricao: 'Óleo essencial atua diretamente em vias aéreas superiores quando usado em inalação de vapor.' },
  ],
  posologia: {
    parteUsada: 'Casca seca (parte mais rica em cumarina) ou sementes aromáticas (uso aromático e em inalação).',
    preparo: 'Decocção: 1 colher de sopa de casca picada em 300 ml de água, ferver 10 minutos, abafar 10 minutos, coar.',
    dose: '1 xícara (200 ml) por tomada.',
    frequencia: '2 a 3 vezes ao dia, sempre morno.',
    janela: '10 a 14 dias seguidos no máximo.',
    pausa: '10 dias de pausa antes de retomar. Pela presença de cumarina, NÃO usar continuamente por mais de 21 dias seguidos sem orientação.',
  },
  identificacao: {
    autentica: {
      titulo: 'Umburana autêntica',
      marcadores: [
        'Casca grossa, fissurada, cor cinza-pardacento, com aroma forte e doce ao ser quebrada (marcador definitivo).',
        'Sementes aromáticas grandes, em formato achatado e oblongo, marrom escuro, com perfume penetrante.',
        'Árvore de médio porte (5 a 15 metros), típica de caatinga.',
        'Quando umedecida, a casca libera fragrância intensa de cumarina (semelhante a fava-tonka).',
      ],
    },
    falsa: {
      titulo: 'Risco de confusão',
      alerta: 'Outras Fabaceae da caatinga (jurema, angico, catingueira) têm cascas similares mas SEM o aroma característico de cumarina. Umburana-de-cheiro (Amburana acreana) é parente próximo com composição similar mas distribuição amazônica. Casca sem aroma intenso provavelmente NÃO é Umburana. O aroma é o teste mais simples e confiável.',
    },
  },
  contraindicacoes: [
    'Gestação em qualquer trimestre (cumarina pode atravessar placenta).',
    'Lactação sem orientação profissional.',
    'Uso simultâneo com anticoagulantes (cumarina interage com varfarina).',
    'Crianças abaixo de 6 anos sem orientação pediátrica.',
    'Hepatopatias graves (cumarina é metabolizada no fígado).',
    'Pré e pós-cirúrgico (suspender 7 dias antes por risco de sangramento).',
  ],
  interacoes: [
    'Anticoagulantes (varfarina, rivaroxabana): potencializa anticoagulação, monitorar INR.',
    'AAS e antiplaquetários: pode somar efeito, risco de sangramento.',
    'Hepatotóxicos (paracetamol em altas doses, álcool): sobrecarga hepática.',
    'Anti-inflamatórios não esteroidais: monitorar por interação plaquetária.',
  ],
  errosComuns: [
    'Usar continuamente por mais de 21 dias, sobrecarregando metabolização hepática de cumarina.',
    'Combinar com anticoagulantes sem orientação, gerando risco de sangramento.',
    'Comprar casca sem aroma característico (provavelmente não é Umburana).',
    'Esperar efeito imediato em asma aguda: a ação é gradual e crônica.',
    'Usar dose alta achando que potencializa efeito (cumarina em excesso é hepatotóxica).',
  ],
  faq: [
    { question: 'Umburana trata bronquite?', answer: 'Auxilia em bronquite crônica e em fase de resolução de bronquite aguda, especialmente quando há secreção espessa difícil de eliminar. NÃO substitui antibiótico em bronquite bacteriana confirmada nem broncodilatador em crise. Em quadro arrastado pós-virose, é uma das melhores opções fitoterápicas para acelerar a resolução respiratória.' },
    { question: 'Pode ser usada por asmático?', answer: 'Em asma controlada e estável, pode ser usada como coadjuvante de manejo crônico, com aval do pneumologista. NÃO substitui medicação de controle (corticoide inalatório) nem de resgate (salbutamol). Em asma instável ou em crise, evitar até estabilização. Cumarina pode interagir com algumas medicações, sempre informar o médico.' },
    { question: 'Umburana tem efeito por inalação?', answer: 'Sim, e é uma forma muito eficaz para vias aéreas superiores. Inalação de vapor de chá quente de Umburana descongestiona seios da face, fluidifica secreção nasal espessa e atua diretamente em laringe e traqueia. Para vias aéreas inferiores, o uso oral é mais eficaz por absorção sistêmica.' },
    { question: 'Existe risco hepático real?', answer: 'Sim, em uso prolongado ou em alta dose. Cumarina é metabolizada no fígado e em excesso pode gerar hepatotoxicidade dose-dependente. Respeitando dose (2 xícaras ao dia) e janela (10 a 14 dias com pausa), o risco é baixo. Quem tem hepatopatia prévia deve evitar ou usar apenas com orientação especializada.' },
    { question: 'É a mesma Umburana usada em cachaça envelhecida?', answer: 'Sim, é a mesma espécie. A madeira da Umburana é tradicionalmente usada para envelhecer cachaça, conferindo aroma característico de cumarina. O uso terapêutico é da casca da árvore viva, não da madeira do tonel. Não confundir uso enológico com uso fitoterápico, são preparos completamente diferentes.' },
  ],
};

export default function Umburana() {
  return <PlantaIndividualLayout data={data} />;
}