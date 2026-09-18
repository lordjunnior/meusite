import PlantaIndividualLayout, { PlantaIndividualData } from '@/components/plantas/PlantaIndividualLayout';
import heroImg from '@/assets/plantas-individuais/artemisia-hero.webp';
import comparativoImg from '@/assets/plantas-individuais/artemisia-comparativo.webp';

const data: PlantaIndividualData = {
  slug: 'artemisia',
  nome: 'Artemísia',
  cientifico: 'Artemisia vulgaris L.',
  familia: 'Asteraceae',
  sistema: 'Digestivo, parasitário e ciclo feminino',
  capituloLabel: 'Plantas Subutilizadas, Ficha 09',
  heroImage: heroImg,
  comparativoImage: comparativoImg,
  metaTitle: 'Artemísia (Artemisia vulgaris): Antiparasitária e Reguladora Digestiva | Ficha Técnica',
  metaDescription: 'Artemísia regula digestão, atua sobre parasitas intestinais e modula ciclo feminino. Fitoquímica, dose controlada, janela curta e contraindicações reais.',
  keywords: 'artemísia, Artemisia vulgaris, planta antiparasitária, planta para verme, regulador menstrual natural, tujona, artemisinina, fitoterapia digestiva, chá de artemísia, planta amarga',
  heroTitle: <>A planta amarga que <span className="text-emerald-400">regula</span> digestão e mobiliza parasitas.</>,
  heroLead: 'Artemisia vulgaris é uma das plantas mais respeitadas em fitoterapia mundial, com tradição em digestão difícil, parasitose intestinal e ciclo feminino irregular. Tujona, lactonas sesquiterpênicas e óleo essencial com ação documentada. Aqui está a ficha técnica completa, com dose controlada e janela curta obrigatória.',
  reframing: {
    paragrafos: [
      'A Artemísia é planta de respeito. Está em farmacopeias da Europa, da China e do Brasil, com séculos de uso documentado em digestão lenta, parasitose intestinal e regulação do ciclo feminino. Não é planta de chá diário, é planta de protocolo curto e dirigido.',
      'Não foi escondida. Foi reduzida a chá amargo de avó, deslocada por antiparasitários sintéticos (mebendazol, albendazol) e por anticoncepcionais que zeram qualquer reflexão sobre o ciclo natural. A planta continua na farmácia popular, com indicação técnica clara para quem sabe usar.',
      'Esta ficha não romantiza Artemísia. Entrega protocolo. Princípio ativo, dose adulta, janela curta obrigatória, contraindicação absoluta em gestação e interação real com medicação. Quem usa Artemísia errado tem efeito colateral, quem usa certo tem ferramenta digestiva e antiparasitária precisa.',
    ],
  },
  fitoquimica: {
    intro: 'A potência da Artemísia vem de uma combinação rara de sesquiterpenos lactônicos com óleo essencial rico em tujona, composto neurotóxico em alta dose mas com ação digestiva e antiparasitária precisa em dose terapêutica.',
    compostos: [
      { nome: 'Tujona (alfa e beta)', acao: 'Monoterpeno do óleo essencial, com ação amarga digestiva, estimula secreção gástrica e biliar. Em alta dose é neurotóxica, exigindo controle estrito de janela.' },
      { nome: 'Lactonas sesquiterpênicas (vulgarina, psilostaquina)', acao: 'Princípios amargos com ação antiparasitária leve sobre helmintos intestinais e moduladora de motilidade digestiva.' },
      { nome: 'Flavonoides (eupatilina, jaceosidina)', acao: 'Antioxidantes com ação anti-inflamatória gastrointestinal e moduladora hepática, equilibrando o efeito amargo.' },
      { nome: 'Cumarinas e cineol', acao: 'Componentes voláteis adicionais que reforçam ação digestiva e dão à Artemísia o aroma característico de absinto suave.' },
    ],
    farmacocinetica: 'A absorção da tujona e dos sesquiterpenos ocorre em intestino alto com pico plasmático entre 60 e 120 minutos. Metabolização hepática rápida via CYP450, o que explica tanto a meia-vida curta quanto o risco de interação com medicação metabolizada pelo mesmo sistema. Janela curta obrigatória (máximo 7 dias seguidos) decorre do acúmulo lento de tujona em uso prolongado.',
  },
  funcaoBiologica: [
    { titulo: 'Regula digestão amarga', descricao: 'Os princípios amargos estimulam secreção gástrica e biliar, melhorando digestão lenta, eructação e empachamento pós-refeição.' },
    { titulo: 'Atua em parasitas intestinais', descricao: 'Lactonas sesquiterpênicas atuam em helmintos leves (giárdia, áscaris em manejo coadjuvante), nunca como tratamento isolado em parasitose grave.' },
    { titulo: 'Modula ciclo feminino', descricao: 'Ação emenagoga leve em ciclo irregular por estresse e em TPM, com janela controlada e fora da gestação.' },
    { titulo: 'Apoia drenagem hepática', descricao: 'Princípios amargos estimulam fluxo biliar leve, complementando manejo de fígado lento em uso curto.' },
  ],
  posologia: {
    parteUsada: 'Folhas e sumidades floridas secas (a folha jovem é mais segura, a sumidade florida é mais potente).',
    preparo: 'Infusão: 1 colher de chá rasa (não de sopa) em 250 ml de água fervente, abafar 10 minutos, coar.',
    dose: '1 xícara (200 ml) por tomada.',
    frequencia: '1 a 2 vezes ao dia, no máximo, sempre antes das refeições.',
    janela: '5 a 7 dias seguidos no MÁXIMO.',
    pausa: '14 a 21 dias de pausa antes de retomar. NUNCA usar continuamente. Acúmulo de tujona é o risco real desta planta.',
  },
  identificacao: {
    autentica: {
      titulo: 'Artemísia autêntica',
      marcadores: [
        'Folhas profundamente recortadas (pinatífidas), face superior verde-acinzentada e face inferior branco-prateada com tomento (felpa) característica. Marcador definitivo.',
        'Caule arroxeado em direção à base, ereto, com ramificação alta.',
        'Flores pequenas amarelo-esverdeadas em panícula alta, no fim do verão.',
        'Aroma forte amargo-herbáceo, parecido com absinto suave, ao amassar a folha.',
      ],
    },
    falsa: {
      titulo: 'Risco de confusão',
      alerta: 'Tanacetum vulgare (catinga-de-mulata) tem folhas pinatífidas similares mas SEM o tomento prateado na face inferior. Algumas Asteraceae ornamentais têm folhas parecidas mas SEM o aroma característico. Artemisia absinthium (absinto) é parente próximo, mais potente e mais tóxica, NÃO substituir uma pela outra. A felpa branca na face inferior da folha é o teste de campo mais confiável.',
    },
  },
  contraindicacoes: [
    'GESTAÇÃO em qualquer trimestre (efeito uterotônico documentado, risco de aborto).',
    'Lactação em qualquer fase.',
    'Crianças abaixo de 12 anos.',
    'Epilepsia ou histórico de convulsão (tujona é pró-convulsivante em alta dose).',
    'Hepatopatia significativa.',
    'Alergia a Asteraceae (camomila, arnica, calêndula).',
  ],
  interacoes: [
    'Anticonvulsivantes: pode reduzir limiar convulsivo, monitorar.',
    'Anticoagulantes (varfarina): potencializa anticoagulação por interação com cumarinas.',
    'Hipoglicemiantes orais: pode somar efeito redutor de glicemia.',
    'Indutores e inibidores do CYP450: alteração de metabolização hepática.',
    'Antiparasitários sintéticos: NÃO usar em paralelo sem orientação.',
  ],
  errosComuns: [
    'Usar como chá diário ou cotidiano, ignorando o acúmulo de tujona.',
    'Preparar com colher de sopa ao invés de colher de chá, gerando dose tóxica.',
    'Usar em gestação achando que regula ciclo (ABORTIVO comprovado).',
    'Combinar com absinto, losna ou catinga-de-mulata, multiplicando efeito da tujona.',
    'Esperar efeito antiparasitário isolado em parasitose confirmada (precisa de antiparasitário sintético).',
  ],
  faq: [
    { question: 'Artemísia substitui antiparasitário sintético?', answer: 'NÃO em parasitose confirmada por exame. Em parasitose intestinal documentada (giárdia, áscaris, ancilostomíase), o tratamento de base é o antiparasitário sintético prescrito. A Artemísia tem papel COADJUVANTE em manejo de carga parasitária leve e em prevenção sazonal em quem viaja para área endêmica. Usar como tratamento isolado em parasitose grave é negligência.' },
    { question: 'Pode ser usada para regular menstruação?', answer: 'Sim, em ciclo irregular por estresse, alimentação ou peso, e fora da gestação. NÃO usar como contraceptivo nem como abortivo (risco real e ético sério). Em ciclo irregular crônico, exige avaliação ginecológica antes de qualquer protocolo fitoterápico para descartar causas hormonais ou estruturais.' },
    { question: 'Por que a janela é tão curta (5 a 7 dias)?', answer: 'Por causa da tujona. Em dose terapêutica e janela curta, o efeito digestivo e antiparasitário aparece sem toxicidade. Em uso prolongado, a tujona se acumula e pode gerar efeitos neurológicos (irritabilidade, insônia, em casos extremos convulsão em pessoas suscetíveis). Respeitar janela é o que diferencia uso terapêutico de intoxicação crônica.' },
    { question: 'Artemisia vulgaris é a mesma planta da artemisinina contra malária?', answer: 'NÃO. A artemisinina vem de Artemisia annua, espécie diferente, com perfil fitoquímico próprio e indicação clínica para malária por Plasmodium. A confusão entre as duas espécies levou a tentativas equivocadas de usar A. vulgaris contra COVID, sem qualquer base. São plantas diferentes com indicações diferentes.' },
    { question: 'Pode ser usada em moxabustão (medicina chinesa)?', answer: 'Sim, e é uso tradicional consolidado. Na moxabustão, a Artemísia (mugwort) seca é queimada próximo a pontos de acupuntura, sem contato com a pele, com efeito local reconhecido. O uso por via oral exige protocolo separado e não se confunde com o uso externo da moxa. Quem usa moxa não está fazendo fitoterapia interna.' },
  ],
};

export default function Artemisia() {
  return <PlantaIndividualLayout data={data} />;
}