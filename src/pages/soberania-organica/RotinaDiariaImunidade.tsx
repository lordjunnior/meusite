import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Sun, Wind, Dumbbell, Snowflake, Moon, BedDouble,
  ChevronDown, ArrowRight, AlertTriangle, CheckCircle2, Activity,
  Utensils, Thermometer, ShieldCheck, FlaskConical, Leaf, Scroll,
} from 'lucide-react';
import SeoHead from '@/components/SeoHead';
import BackToHome from '@/components/BackToHome';
import heroImg from '@/assets/rotina-imunidade/boticario-manha.jpg';
import solImg from '@/assets/rotina-imunidade/hero-sol-manha.jpg';
import hidroImg from '@/assets/rotina-imunidade/hidroterapia-kneipp.jpg';
import caldoImg from '@/assets/rotina-imunidade/caldo-fermentados.jpg';
import trevasImg from '@/assets/rotina-imunidade/protocolo-trevas.jpg';

/**
 * /soberania-organica/rotina-diaria-imunidade
 * Manual de Higienismo e Vitalidade Biológica.
 * Palavra-chave: "rotina diária para aumentar a imunidade"
 * Paleta clara: #f4ede4 / #ece2d3 alternando com #0e3b3a (teal profundo).
 * Conteúdo educativo, não substitui avaliação médica.
 */

const APPLE_EASE = [0.22, 1, 0.36, 1] as const;
const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.8, ease: APPLE_EASE, delay },
});

const DESPERTAR = [
  {
    icon: Sun,
    titulo: 'O jejum de luz: abrir as janelas antes de abrir o telefone',
    descricao:
      'O manual clássico de higienismo abria o dia com um gesto só: escancarar as janelas e receber a luz crua da manhã na pele e nos olhos. Faça de 5 a 15 minutos ao ar livre, sem óculos escuros, antes de qualquer tela. Essa luz de espectro completo ancora o relógio biológico, ordena a curva do cortisol no horário em que ele serve à vitalidade e programa, com doze a dezesseis horas de antecedência, a liberação de melatonina que vai comandar o reparo noturno. Mesmo em dia encoberto a claridade do céu aberto supera em muitas vezes qualquer lâmpada de teto. Enquanto a manhã moderna começa no brilho azul de uma tela a vinte centímetros do rosto, o corpo interpreta esse sinal como meio-dia perpétuo e nunca fecha o ciclo.',
  },
  {
    icon: Wind,
    titulo: 'O purgo da mucosa: a raspagem da língua antes do primeiro gole',
    descricao:
      'Enquanto você dorme, o sistema linfático trabalha em turno integral e deposita na superfície da língua uma película esbranquiçada de resíduo metabólico e biofilme bacteriano. Os tratados de higiene doméstica prescreviam raspar essa camada ao acordar, do fundo para a ponta, com uma lâmina fina de cobre ou aço, de cinco a sete passadas, enxaguando a cada uma, antes de ingerir qualquer líquido. Beber água sem raspar é reengolir aquilo que o corpo passou a noite empurrando para fora. É a higiene mais barata e mais esquecida do arsenal, e ela também devolve sensibilidade real ao paladar em poucos dias.',
  },
  {
    icon: FlaskConical,
    titulo: 'O shot do boticário: eletrólito vivo no lugar do polivitamínico',
    descricao:
      'Trezentos a quinhentos mililitros de água morna, o suco de meio limão cravo, uma colher de chá de vinagre de maçã não filtrado com a mãe viva e uma pitada generosa de sal marinho integral. Isso repõe sódio, cloreto, magnésio e minerais traço depois de sete a nove horas de perda insensível de água, acorda a secreção biliar e prepara o estômago para a primeira refeição. Em dia de tempo úmido ou de garganta arranhando, acrescente cinco a dez gotas de própolis verde bruto. Enquanto a farmácia vende um comprimido efervescente com corante, adoçante e uma dose isolada de ácido ascórbico sintético, o boticário resolvia o mesmo problema com quatro ingredientes que existem na sua cozinha.',
  },
];

const TERMICO = [
  {
    icon: Snowflake,
    titulo: 'O banho de contraste: o método Kneipp em três ciclos',
    descricao:
      'O padre Sebastian Kneipp construiu uma escola inteira de cura em cima de uma única variável: temperatura. Termine o banho quente com trinta a sessenta segundos de água fria nas pernas, na nuca e no peito, volte ao quente por um minuto e repita três vezes, encerrando sempre no frio. A alternância força vasoconstrição e vasodilatação sucessivas, bombeia sangue pela periferia, estimula a medula e eleva a norepinefrina de forma natural. É hormese: estresse curto, controlado e dosado, que deixa o organismo mais resistente em vez de mais frágil. Comece por dez segundos e suba com o passar das semanas. Quem tem doença cardiovascular, pressão descontrolada, epilepsia ou está grávida não faz isso sem falar com um médico antes.',
  },
  {
    icon: Leaf,
    titulo: 'A fricção seca da pele: mover a linfa com as próprias mãos',
    descricao:
      'A linfa não tem bomba própria. Ela depende de movimento muscular e de pressão externa para circular, e é dentro dela que trafegam as células que reconhecem e destroem patógenos. As enciclopédias médicas do século XIX prescreviam a fricção seca com escova de cerdas naturais, feita antes do banho, sempre em direção ao coração: dos pés para a virilha, das mãos para a axila, em movimentos longos e firmes, dois a três minutos no corpo inteiro. A pele fica rosada, a circulação superficial dispara e os gânglios recebem um volume maior de linfa para filtrar. Custa o preço de uma escova e dura anos.',
  },
  {
    icon: Dumbbell,
    titulo: 'O trabalho corporal matinal: a bomba muscular como órgão de defesa',
    descricao:
      'Vinte a quarenta minutos de caminhada em ritmo firme, carregamento de peso ou mobilidade articular antes das dez da manhã fazem pela imunidade o que nenhuma cápsula faz: acionam a contração muscular que empurra a linfa pelo corpo inteiro. Não é sobre estética nem sobre desempenho. É sobre manter o líquido de defesa em movimento. A tonificação diária moderada supera de longe o treino exaustivo esporádico, porque excesso de esforço sem recuperação suprime temporariamente a resposta imune em vez de fortalecê-la.',
  },
];

const ALIMENTO = [
  {
    icon: FlaskConical,
    titulo: 'Caldo de ossos de longo cozimento: o elixir da barreira intestinal',
    descricao:
      'Ossos com tutano, pés e cartilagem, água fria, uma colher de vinagre para extrair os minerais da matriz óssea, e doze a vinte e quatro horas de fogo baixíssimo. O que sai é um caldo denso em colágeno, glicina, prolina, glutamina e minerais numa forma que o corpo reconhece sem esforço. A imunidade nasce na parede intestinal, e é essa parede que o caldo alimenta e sela. Uma caneca por dia, de preferência antes do almoço, faz mais pelo intestino do que qualquer pó de colágeno hidrolisado com sabor de baunilha vendido em pote plástico por um valor absurdo.',
  },
  {
    icon: Leaf,
    titulo: 'Fermentação selvagem: chucrute, conserva e bactéria adaptada ao seu ambiente',
    descricao:
      'Repolho picado, dois por cento do peso em sal, socado dentro de um vidro até a salmoura cobrir tudo, tampado sem vedar, esquecido por sete a quatorze dias em lugar fresco. É assim que se preservava alimento antes da refrigeração e é assim que se povoa o intestino com colônias vivas. Duas colheres por dia bastam. Enquanto a indústria vende cápsulas com poucas cepas isoladas, liofilizadas e mortas na metade do caminho, o vidro na sua bancada carrega bilhões de organismos vivos, diversos, e adaptados ao ambiente exato em que você vive.',
  },
  {
    icon: Utensils,
    titulo: 'Matéria médica à mesa: proteína completa e gordura animal íntegra',
    descricao:
      'Vinte e cinco a quarenta gramas de proteína completa na primeira refeição sólida, com gordura animal íntegra junto: ovos com a gema mole, fígado uma vez por semana, peixe pequeno de água fria, manteiga de pasto. São os aminoácidos dessa refeição que viram anticorpos, enzimas e neurotransmissores, e é a gordura que carrega as vitaminas A, D, E e K até onde elas trabalham. Café da manhã de carboidrato refinado e suco de caixinha é o sabotador silencioso mais universal da imunidade brasileira.',
  },
];

const RECOLHIMENTO = [
  {
    icon: Moon,
    titulo: 'O protocolo das trevas: escuridão absoluta depois do pôr do sol',
    descricao:
      'Ao anoitecer, apague as luzes brancas e frias e deixe apenas lâmpada âmbar de baixa altura, chama de vela ou nada. Se precisar de tela, use óculos bloqueadores de luz azul. No quarto, escuridão de caverna: nenhum LED de tomada, nenhum ponto vermelho de aparelho, cortina que não deixe passar poste de rua. A melatonina endógena é o antioxidante mais potente que o organismo fabrica, de graça, todas as noites, e ela só é liberada em volume na ausência real de luz. Nenhum frasco de melatonina sintética reproduz o pulso fisiológico que a escuridão produz.',
  },
  {
    icon: Leaf,
    titulo: 'O chá de raízes e a unção corporal',
    descricao:
      'Uma hora antes de deitar, uma infusão longa de raízes calmantes: mulungu, valeriana, camomila-romana ou ashwagandha em decocção de dez minutos. Em seguida, a unção: óleo de gergelim ou de coco infundido com lavanda ou alecrim, aquecido nas mãos e massageado nos pés, na nuca e nos antebraços. É prática de tratado antigo e continua funcionando pelo motivo mais simples: toque firme e calor periférico desligam o sistema nervoso simpático e derrubam a temperatura central, que é exatamente o gatilho fisiológico do sono profundo.',
  },
  {
    icon: Thermometer,
    titulo: 'Quarto frio, jantar cedo, quietude',
    descricao:
      'Termine o jantar pelo menos três horas antes de deitar e mantenha o quarto entre dezoito e vinte graus. O corpo precisa baixar cerca de um grau de temperatura interna para entrar e permanecer em sono profundo, e digestão pesada faz o oposto disso. Quarto quente e ceia tardia são as duas causas mais banais e mais ignoradas de sono raso, e sono raso é imunidade em déficit crônico.',
  },
  {
    icon: ShieldCheck,
    titulo: 'Magnésio: o mineral que o estresse crônico rouba primeiro',
    descricao:
      'Magnésio na forma glicinato ou treonato, em dose orientada por profissional, relaxa a musculatura, reduz a excitabilidade nervosa e facilita a transição para o sono. É o primeiro mineral a se esgotar sob estresse contínuo, café em excesso e alimentação ultraprocessada, e sua falta aparece como cãibra noturna, tensão no pescoço, sono leve e despertar às três da manhã. Fontes alimentares: folha verde-escura, castanha, cacau amargo, abacate.',
  },
];

const SONO = [
  'Manter horário fixo de dormir e acordar, inclusive nos fins de semana, vale mais para a imunidade do que uma hora extra de sono de vez em quando.',
  'Álcool à noite, mesmo em pouca quantidade, fragmenta o sono profundo e corta a fase REM, ainda que o número de horas pareça normal.',
  'Qualquer luz residual no quarto, mesmo um LED fraco de aparelho, reduz a produção de melatonina pela noite inteira.',
  'Cafeína depois das 14h continua agindo mesmo sem você sentir: a meia-vida passa de seis horas e ela já está corroendo a arquitetura do sono profundo.',
  'Treino intenso nas três horas antes de deitar eleva temperatura corporal e adrenalina e atrasa a entrada no sono profundo.',
  'Discussão e notícia estressante à noite ativam o simpático e mantêm o corpo em estado de alerta mesmo depois que a luz apaga.',
];

const NUTRIENTES = [
  { nutriente: 'Vitamina D', fonte: 'Sol do meio-dia na pele, gema de ovo, fígado, peixes gordurosos', carencia: 'Cansaço persistente, infecções respiratórias de repetição, dor óssea e muscular difusa' },
  { nutriente: 'Zinco', fonte: 'Ostra, carne vermelha, semente de abóbora, fígado', carencia: 'Cicatrização lenta, perda de olfato e paladar, manchas brancas nas unhas' },
  { nutriente: 'Vitamina C', fonte: 'Acerola, goiaba, camu-camu, pimentão cru, salsa', carencia: 'Gengiva sangrando, hematoma fácil, resfriado que se arrasta por semanas' },
  { nutriente: 'Magnésio', fonte: 'Folha verde-escura, castanha, cacau amargo, abacate', carencia: 'Cãibra noturna, ansiedade, sono leve, tensão em pescoço e ombros' },
  { nutriente: 'Ômega 3', fonte: 'Sardinha, cavala, salmão selvagem, linhaça moída na hora', carencia: 'Pele seca, inflamação articular persistente, névoa mental' },
  { nutriente: 'Selênio', fonte: 'Castanha-do-pará, uma a duas unidades por dia, peixe, ovo', carencia: 'Fadiga, unha quebradiça, função tireoidiana comprometida' },
  { nutriente: 'Ferro', fonte: 'Fígado, carne vermelha, lentilha com fonte de vitamina C junto', carencia: 'Palidez, falta de ar leve ao esforço, cansaço que não cede com sono' },
  { nutriente: 'Glicina e colágeno', fonte: 'Caldo de ossos de longo cozimento, pele, cartilagem, mocotó', carencia: 'Intestino permeável, articulação dolorida, sono superficial' },
];

const O_QUE_MEDIR = [
  'Frequência cardíaca de repouso ao acordar: queda gradual ao longo de semanas indica melhor recuperação e mais reserva de vitalidade.',
  'Variabilidade da frequência cardíaca, se tiver aparelho que meça: valores subindo de forma consistente apontam sistema nervoso mais equilibrado.',
  'Tempo até adormecer: menos de vinte minutos deitado é sinal de ritmo circadiano ancorado no lugar certo.',
  'Número de despertares na madrugada: redução progressiva indica reparo noturno acontecendo sem interrupção.',
  'Disposição ao acordar sem alarme, sem aquela névoa arrastada dos primeiros quarenta minutos.',
  'Aspecto da língua ao raspar pela manhã: camada mais fina e mais clara ao longo das semanas acompanha a melhora digestiva.',
  'Frequência e duração de resfriados ao longo dos meses: é o indicador mais direto de que a rotina está sustentando as defesas.',
];

const ERROS = [
  'Cumprir tudo de dia e destruir à noite com tela até tarde, ceia pesada e horário instável. O tratado funciona como conjunto, não como itens avulsos.',
  'Comprar vitamina isolada antes de corrigir luz, sono e comida de verdade. Suplemento é complemento de uma base que já funciona, nunca substituto dela.',
  'Treinar pesado todos os dias sem descanso. Estresse sem recuperação suprime a imunidade em vez de tonificá-la.',
  'Empilhar jejum prolongado com treino intenso e frio no mesmo dia. Três estresses somados deixam de ser hormese e viram desgaste.',
  'Usar café para compensar sono ruim em vez de corrigir a causa. Isso mascara o problema e adia a correção por anos.',
  'Abandonar tudo no primeiro fim de semana social. Consistência de oitenta a noventa por cento ao longo dos meses vence perfeição de três dias.',
];

const CODICE_7_DIAS = [
  { dia: 'Dia 1', foco: 'Jejum de luz: abrir as janelas ao acordar e ficar de 5 a 15 minutos na claridade externa, antes de qualquer tela.' },
  { dia: 'Dia 2', foco: 'Purgo da mucosa e shot do boticário: raspar a língua e beber a água com sal, limão e vinagre antes do café.' },
  { dia: 'Dia 3', foco: 'Estímulo térmico: encerrar o banho com 30 segundos de água fria e passar a escova seca antes de entrar.' },
  { dia: 'Dia 4', foco: 'Alimento tônico: pôr o caldo de ossos no fogo e montar o primeiro vidro de chucrute selvagem.' },
  { dia: 'Dia 5', foco: 'Jejum de industrializados: nenhum ultraprocessado, nenhum óleo de semente refinado, nenhum açúcar isolado.' },
  { dia: 'Dia 6', foco: 'Protocolo das trevas: luz âmbar após o pôr do sol e quarto em escuridão absoluta, sem nenhum LED aceso.' },
  { dia: 'Dia 7', foco: 'Chá de raízes, unção corporal e revisão do códice: o que foi cumprido, o que falhou e onde estava a resistência.' },
];

const FAQ = [
  {
    q: 'Quanto tempo leva para sentir efeito nessa rotina diária de imunidade?',
    a: 'As primeiras mudanças percebidas, como disposição maior ao acordar e menos oscilação de energia à tarde, aparecem entre sete e quatorze dias de constância. O efeito mais profundo, menos resfriados e infecções mais curtas, costuma exigir de seis a doze semanas, porque o sistema imune responde a padrões repetidos ao longo do tempo, nunca a gestos isolados.',
  },
  {
    q: 'Preciso fazer todos os rituais desde o primeiro dia?',
    a: 'Não. O códice de sete dias existe exatamente para introduzir uma prática por vez, empilhada sobre a anterior. Quem tenta implantar tudo de uma vez abandona na primeira semana. Comece pelo jejum de luz e pelo shot do boticário, que são os de menor esforço e maior efeito imediato sobre o ritmo biológico.',
  },
  {
    q: 'O banho de contraste é seguro para qualquer pessoa?',
    a: 'Não. Quem tem doença cardiovascular, pressão descontrolada, epilepsia, condição respiratória crônica ou está grávida deve falar com um médico antes de qualquer exposição ao frio. Para a maioria das pessoas saudáveis, começar com dez segundos e aumentar de forma gradual é seguro, mas a orientação individual sempre prevalece sobre qualquer conteúdo geral.',
  },
  {
    q: 'Raspar a língua realmente faz diferença ou é folclore?',
    a: 'A camada esbranquiçada da manhã é biofilme bacteriano e resíduo depositado durante a noite. Removê-la reduz carga bacteriana oral, melhora o hálito e devolve sensibilidade ao paladar em poucos dias. Não é cura de doença nenhuma, é higiene básica que a odontologia moderna também reconhece e que os manuais domésticos antigos já prescreviam.',
  },
  {
    q: 'Chucrute caseiro substitui probiótico de farmácia?',
    a: 'Para a maioria das pessoas saudáveis, a fermentação caseira oferece diversidade e quantidade de organismos vivos que a cápsula não alcança, e a um custo quase nulo. Em situações clínicas específicas, como pós-antibiótico prolongado ou doença intestinal diagnosticada, cepas isoladas prescritas por um profissional têm papel próprio. Quem tem histamina alta ou doença intestinal ativa deve introduzir fermentado devagar e com orientação.',
  },
  {
    q: 'Suplemento de vitamina D substitui o sol do meio-dia?',
    a: 'Suplementar pode ser necessário no inverno ou para quem não tem acesso regular ao sol, mas a exposição direta traz efeitos que a cápsula não reproduz, como regulação do relógio biológico e produção de óxido nítrico na pele. O caminho correto é combinar sol responsável com suplementação decidida por exame de sangue e orientação médica, nunca dose alta às cegas.',
  },
  {
    q: 'Este tratado substitui médico e exame de sangue?',
    a: 'Não. É material educativo baseado em fisiologia geral e em práticas tradicionais de higienismo, e não substitui avaliação individualizada, exame laboratorial nem prescrição. Antes de suplementar, mudar drasticamente a alimentação ou iniciar exposição ao frio, principalmente com condição de saúde preexistente, procure um profissional qualificado.',
  },
];

function Hero() {
  return (
    <section className="relative w-full" style={{ height: '92vh', minHeight: 720 }}>
      <img
        src={heroImg}
        alt="Bancada de boticário antigo ao amanhecer com almofariz de cobre, tinturas em vidro âmbar e tratado botânico aberto"
        width={1920}
        height={1280}
        className="absolute inset-0 w-full h-full object-cover"
        loading="eager"
        fetchPriority="high"
        decoding="async"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, rgba(14,59,58,0.55) 0%, rgba(14,59,58,0.35) 40%, rgba(14,59,58,0.92) 100%)',
        }}
      />
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, ease: APPLE_EASE }}
        className="relative z-10 h-full flex flex-col justify-end px-6 md:px-12 lg:px-20 pb-20 md:pb-28 max-w-[1600px] mx-auto"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-3 mb-8"
        >
          <span
            className="px-4 py-1.5 rounded-full text-xs font-bold tracking-[0.3em] uppercase backdrop-blur-md"
            style={{
              backgroundColor: 'rgba(244,237,228,0.15)',
              color: '#f4ede4',
              border: '1px solid rgba(244,237,228,0.3)',
            }}
          >
            <Scroll size={11} className="inline mr-2" /> Manual de higienismo e vitalidade biológica
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1, delay: 0.15, ease: APPLE_EASE }}
          className="text-[clamp(2.4rem,7.2vw,6.4rem)] font-black leading-[0.95] tracking-tight max-w-[22ch]"
          style={{ fontFamily: "'Inter Tight', sans-serif", color: '#f4ede4' }}
        >
          Tratado de imunidade natural: a rotina diária da{' '}
          <span
            style={{
              color: '#ffb37a',
              fontStyle: 'italic',
              fontWeight: 400,
              fontFamily: "'Playfair Display', serif",
              textShadow: '0 0 40px rgba(255,179,122,0.45), 0 0 80px rgba(255,179,122,0.25)',
            }}
          >
            vitalidade antifrágil.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: APPLE_EASE }}
          className="mt-8 max-w-2xl text-lg md:text-2xl leading-relaxed font-light"
          style={{ color: 'rgba(244,237,228,0.85)', fontFamily: "'Inter Tight', sans-serif" }}
        >
          O dia inteiro reconstruído a partir dos manuais de medicina doméstica anteriores à industrialização da saúde: luz, água fria, fricção, caldo, fermento e trevas. Nenhum frasco de prateleira envolvido.
        </motion.p>
      </motion.div>
    </section>
  );
}

function AvisoMedico() {
  return (
    <div
      className="max-w-[1600px] mx-6 md:mx-12 lg:mx-20 rounded-2xl px-6 py-5 md:px-8 md:py-6 flex items-start gap-4"
      style={{ backgroundColor: '#ece2d3', border: '1px solid rgba(14,59,58,0.15)' }}
    >
      <AlertTriangle size={22} className="shrink-0 mt-0.5" style={{ color: '#b45836' }} />
      <p className="text-sm md:text-base leading-relaxed font-light" style={{ color: '#2d3a37' }}>
        Este conteúdo é educativo, resgata práticas tradicionais de higiene e vitalidade e não substitui avaliação médica individualizada. Antes de alterar rotina de sono, alimentação, suplementação ou iniciar exposição ao frio, principalmente em caso de condição de saúde preexistente, gravidez ou uso de medicação contínua, procure orientação de um profissional de saúde qualificado.
      </p>
    </div>
  );
}

function Contraste({ texto, claro }: { texto: string; claro: boolean }) {
  return (
    <motion.div
      {...fade(0.15)}
      className="mt-10 rounded-2xl p-8 md:p-10"
      style={{
        backgroundColor: claro ? 'rgba(180,88,54,0.07)' : 'rgba(255,179,122,0.08)',
        borderLeft: `3px solid ${claro ? '#b45836' : '#ffb37a'}`,
      }}
    >
      <span className="text-xs font-bold tracking-[0.35em] uppercase block mb-4" style={{ color: claro ? '#b45836' : '#ffb37a' }}>
        O contraste crítico
      </span>
      <p
        className="text-xl md:text-2xl leading-[1.5] font-light"
        style={{ color: claro ? '#0e3b3a' : '#f4ede4', fontFamily: "'Playfair Display', serif", fontStyle: 'italic' }}
      >
        {texto}
      </p>
    </motion.div>
  );
}

function BlocoPeriodo({
  numero,
  titulo,
  subtitulo,
  itens,
  imagem,
  imagemAlt,
  claro,
  contraste,
}: {
  numero: string;
  titulo: string;
  subtitulo: string;
  itens: { icon: any; titulo: string; descricao: string }[];
  imagem: string;
  imagemAlt: string;
  claro: boolean;
  contraste: string;
}) {
  const bg = claro ? '#f4ede4' : '#0e3b3a';
  const textColor = claro ? '#1c2624' : '#f4ede4';
  const mutedColor = claro ? '#2d3a37' : 'rgba(244,237,228,0.8)';
  const accent = claro ? '#b45836' : '#ffb37a';

  return (
    <section className="relative px-6 md:px-12 lg:px-20 py-24 md:py-32" style={{ backgroundColor: bg, color: textColor }}>
      <div className="max-w-[1600px] mx-auto">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 mb-14">
          <motion.aside {...fade(0)} className="lg:col-span-4">
            <div className="sticky top-24">
              <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: accent }}>
                Capítulo {numero}
              </span>
              <div className="h-[2px] w-16 mb-6" style={{ backgroundColor: accent }} />
              <p className="text-sm uppercase tracking-[0.2em] font-semibold" style={{ color: mutedColor }}>
                {subtitulo}
              </p>
            </div>
          </motion.aside>
          <motion.div {...fade(0.1)} className="lg:col-span-8">
            <h2 className="text-[clamp(2rem,5vw,4.5rem)] font-black leading-[1.05] tracking-tight mb-8" style={{ color: claro ? '#0e3b3a' : '#f4ede4' }}>
              {titulo}
            </h2>
            <div className="rounded-2xl overflow-hidden mb-10">
              <img
                src={imagem}
                alt={imagemAlt}
                width={1600}
                height={1067}
                loading="lazy"
                decoding="async"
                className="w-full h-[280px] md:h-[460px] object-cover"
              />
            </div>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
          {itens.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={i}
                {...fade(i * 0.1)}
                className="p-8 rounded-2xl"
                style={{
                  backgroundColor: claro ? '#ece2d3' : 'rgba(244,237,228,0.06)',
                  border: claro ? '1px solid rgba(14,59,58,0.1)' : '1px solid rgba(255,179,122,0.18)',
                }}
              >
                <Icon size={28} style={{ color: accent }} className="mb-5" />
                <h3 className="text-lg md:text-xl font-black leading-tight mb-3" style={{ color: claro ? '#0e3b3a' : '#f4ede4' }}>
                  {item.titulo}
                </h3>
                <p className="text-base leading-relaxed font-light" style={{ color: mutedColor }}>
                  {item.descricao}
                </p>
              </motion.div>
            );
          })}
        </div>

        <Contraste texto={contraste} claro={claro} />
      </div>
    </section>
  );
}

export default function RotinaDiariaImunidade() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <>
      <SeoHead
        path="/soberania-organica/rotina-diaria-imunidade"
        custom={{
          title: 'Rotina Diária para Aumentar a Imunidade: Tratado Natural Completo',
          description:
            'Rotina diária para aumentar a imunidade no método dos antigos manuais de medicina doméstica: jejum de luz, raspagem da língua, banho de contraste Kneipp, caldo de ossos, fermentação selvagem e protocolo das trevas. Códice de 7 dias.',
          canonical: 'https://lordjunnior.com.br/soberania-organica/rotina-diaria-imunidade',
          primaryKeyword: 'rotina diária para aumentar a imunidade',
          lsiKeywords: [
            'como fortalecer o sistema imunológico naturalmente',
            'higienismo e vitalidade',
            'banho de contraste Kneipp',
            'caldo de ossos benefícios',
            'chucrute caseiro fermentação',
            'raspador de língua benefícios',
            'exposição solar e vitamina D',
          ],
          longTailKeywords: [
            'rotina diária natural para aumentar a imunidade',
            'o que fazer todos os dias para não ficar doente',
            'checklist de 7 dias para melhorar a imunidade',
            'banho frio e quente para imunidade como fazer',
            'como fazer caldo de ossos para o intestino',
          ],
          breadcrumbs: [
            { name: 'Início', url: '/' },
            { name: 'Soberania Orgânica', url: '/soberania-organica' },
            { name: 'Rotina Diária para Imunidade', url: '/soberania-organica/rotina-diaria-imunidade' },
          ],
          schemaType: 'Article',
          articleSection: 'Soberania Orgânica',
          relatedPages: [
            '/soberania-organica',
            '/soberania-organica/saude-preventiva',
            '/soberania-organica/autonomia-biologica',
            '/soberania-organica/farmacia-caseira-essencial',
            '/soberania-organica/tinturas-xaropes-preparos',
          ],
        }}
        faqItems={FAQ.map((f) => ({ question: f.q, answer: f.a }))}
      />

      <div
        className="relative min-h-screen"
        style={{ backgroundColor: '#f4ede4', color: '#1c2624', fontFamily: "'Inter Tight', sans-serif" }}
      >
        <div className="absolute top-0 left-0 right-0 z-30 px-6 md:px-12 lg:px-20 pt-[52px]">
          <BackToHome />
        </div>

        <Hero />

        <div className="py-8" style={{ backgroundColor: '#f4ede4' }}>
          <AvisoMedico />
        </div>

        {/* CAPÍTULO 1 — Força vital */}
        <section className="relative px-6 md:px-12 lg:px-20 py-20 md:py-28" style={{ backgroundColor: '#f4ede4' }}>
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 max-w-[1600px] mx-auto">
            <motion.aside {...fade(0)} className="lg:col-span-4">
              <div className="sticky top-24">
                <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#b45836' }}>
                  Capítulo 01
                </span>
                <div className="h-[2px] w-16 mb-6" style={{ backgroundColor: '#b45836' }} />
                <p className="text-sm uppercase tracking-[0.2em] font-semibold" style={{ color: '#5a6664' }}>
                  A força vital e o corpo como ecossistema
                </p>
              </div>
            </motion.aside>
            <motion.div {...fade(0.1)} className="lg:col-span-8">
              <h2 className="text-[clamp(2.25rem,5.5vw,5rem)] font-black leading-[1] tracking-tight mb-10" style={{ color: '#0e3b3a' }}>
                Imunidade não é um frasco.{' '}
                <span style={{ color: '#b45836', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>
                  É um regime diário.
                </span>
              </h2>
              <div className="space-y-7 text-lg md:text-xl leading-[1.7] font-light" style={{ color: '#2d3a37' }}>
                <p>
                  Antes de a saúde virar balcão, existiam os manuais de medicina doméstica. Eles não vendiam nada. Ensinavam a família a conduzir o próprio corpo através de luz, água, temperatura, alimento e repouso, e tratavam o organismo como um ecossistema integrado à natureza, e não como cliente recorrente de drogaria. Os higienistas do século XIX chamavam isso de força vital: a capacidade do corpo de resistir, reparar e se reorganizar quando as condições fundamentais estão presentes.
                </p>
                <p>
                  O que este tratado faz é reinstalar essas condições em um dia comum. Nenhuma prática aqui depende de compra, assinatura ou marca. Todas dependem de repetição. O sistema imunológico não liga e desliga por causa de um comprimido efervescente tomado quando a garganta já dói: ele responde a padrões sustentados por semanas, e é a soma desses sinais diários que decide se as defesas operam com folga ou no limite.
                </p>
                <blockquote
                  className="pl-8 py-2 my-10 text-2xl md:text-3xl leading-[1.4] font-light"
                  style={{ borderLeft: '3px solid #b45836', color: '#0e3b3a', fontFamily: "'Playfair Display', serif", fontStyle: 'italic' }}
                >
                  Soberania biológica é não terceirizar sua força vital para o próximo frasco de prateleira.
                </blockquote>
                <p>
                  Os capítulos seguintes percorrem o dia em quatro tempos: o despertar e a alquimia da manhã, o estímulo térmico e físico, o alimento como escudo, e o recolhimento noturno. Ao final você encontra a matéria médica de nutrientes com fontes reais, o códice de sete dias, os sinais objetivos de que o regime está funcionando e os erros que anulam todo o esforço.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* CAPÍTULO 2 — Despertar */}
        <BlocoPeriodo
          numero="02"
          titulo="O despertar e a alquimia da manhã"
          subtitulo="Do abrir dos olhos às 09h00"
          itens={DESPERTAR}
          imagem={solImg}
          imagemAlt="Luz do sol da manhã entrando por uma janela aberta, primeira prática do tratado de imunidade natural"
          claro={true}
          contraste="Enquanto a indústria vende um tubo de efervescente com corante e uma dose isolada de ácido ascórbico sintético, o manual clássico abre o dia com luz gratuita nos olhos, a língua limpa e um copo de água com sal e limão. Um custa mensalidade. O outro custa disciplina."
        />

        {/* CAPÍTULO 3 — Estímulo térmico */}
        <BlocoPeriodo
          numero="03"
          titulo="O estímulo térmico e físico: a escola do hidroterapeuta"
          subtitulo="A tonificação pela água e pela fricção"
          itens={TERMICO}
          imagem={hidroImg}
          imagemAlt="Casa de banhos de pedra com água fria correndo em bacia e escova de cerdas naturais, método Kneipp de hidroterapia"
          claro={false}
          contraste="Enquanto o mercado te oferece uma cápsula de imunoestimulante importado, Kneipp curava vilarejos inteiros com uma torneira de água fria e três minutos de escova seca. O estresse hormético é a única forma conhecida de deixar um corpo mais forte sem comprar nada."
        />

        {/* CAPÍTULO 4 — Alimento */}
        <BlocoPeriodo
          numero="04"
          titulo="O alimento como escudo: a nutrição tônica"
          subtitulo="A barreira intestinal e a microbiota"
          itens={ALIMENTO}
          imagem={caldoImg}
          imagemAlt="Caldo de ossos de longo cozimento em panela de ferro ao lado de potes de chucrute e conservas fermentadas"
          claro={true}
          contraste="Enquanto o mercado te vende um frasco plástico de probióticos isolados e fracos por uma fortuna, o manual clássico ensina que duas colheres de chucrute fermentado na sua cozinha carregam bilhões de colônias vivas, diversas e já adaptadas ao seu ambiente."
        />

        {/* CAPÍTULO 5 — Recolhimento */}
        <BlocoPeriodo
          numero="05"
          titulo="O recolhimento e a blindagem do sono"
          subtitulo="Do pôr do sol ao reparo profundo"
          itens={RECOLHIMENTO}
          imagem={trevasImg}
          imagemAlt="Quarto escuro iluminado apenas por uma vela, com chá de raízes fumegante e óleo de unção sobre a mesa de cabeceira"
          claro={false}
          contraste="Enquanto a farmácia te vende melatonina sintética em dose arbitrária, a escuridão absoluta depois do pôr do sol faz seu corpo produzir a sua, no pulso e na quantidade certa, todas as noites, de graça."
        />

        {/* CAPÍTULO 6 — Sabotadores do reparo noturno */}
        <section className="relative px-6 md:px-12 lg:px-20 py-24 md:py-32" style={{ backgroundColor: '#f4ede4' }}>
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 max-w-[1600px] mx-auto">
            <motion.aside {...fade(0)} className="lg:col-span-4">
              <div className="sticky top-24">
                <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#b45836' }}>
                  Capítulo 06
                </span>
                <div className="h-[2px] w-16 mb-6" style={{ backgroundColor: '#b45836' }} />
                <p className="text-sm uppercase tracking-[0.2em] font-semibold" style={{ color: '#5a6664' }}>
                  O que rouba o reparo noturno
                </p>
              </div>
            </motion.aside>
            <motion.div {...fade(0.1)} className="lg:col-span-8">
              <h2 className="text-[clamp(2rem,5vw,4.5rem)] font-black leading-[1.05] tracking-tight mb-10" style={{ color: '#0e3b3a' }}>
                Sono profundo: o que{' '}
                <span style={{ color: '#b45836', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>
                  arruína tudo em silêncio.
                </span>
              </h2>
              <div className="space-y-4">
                {SONO.map((item, i) => (
                  <motion.div
                    key={i}
                    {...fade(i * 0.05)}
                    className="flex items-start gap-4 p-6 rounded-xl"
                    style={{ backgroundColor: '#ece2d3', border: '1px solid rgba(14,59,58,0.1)' }}
                  >
                    <BedDouble size={20} className="shrink-0 mt-1" style={{ color: '#b45836' }} />
                    <p className="text-base md:text-lg leading-relaxed font-light" style={{ color: '#2d3a37' }}>
                      {item}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* CAPÍTULO 7 — Matéria médica */}
        <section className="relative px-6 md:px-12 lg:px-20 py-24 md:py-32" style={{ backgroundColor: '#0e3b3a', color: '#f4ede4' }}>
          <div className="max-w-[1600px] mx-auto">
            <motion.div {...fade(0)} className="mb-14 max-w-3xl">
              <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#ffb37a' }}>
                Capítulo 07
              </span>
              <h2 className="text-[clamp(2rem,4.5vw,4rem)] font-black leading-[1.05] tracking-tight">
                Matéria médica:{' '}
                <span style={{ color: '#ffb37a', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>
                  fonte real e sinais de carência.
                </span>
              </h2>
              <p className="mt-6 text-lg leading-relaxed font-light" style={{ color: 'rgba(244,237,228,0.8)' }}>
                Antes de comprar qualquer frasco, verifique se a mesa já entrega o nutriente em forma viva. Sinal isolado de carência não fecha diagnóstico: apenas indica onde investigar com exame de sangue.
              </p>
            </motion.div>

            <motion.div {...fade(0.1)} className="overflow-x-auto rounded-2xl" style={{ border: '1px solid rgba(255,179,122,0.18)' }}>
              <table className="w-full text-left border-collapse min-w-[820px]">
                <thead>
                  <tr style={{ backgroundColor: 'rgba(244,237,228,0.06)' }}>
                    <th className="p-5 text-sm font-bold uppercase tracking-wider" style={{ color: '#ffb37a' }}>Nutriente</th>
                    <th className="p-5 text-sm font-bold uppercase tracking-wider" style={{ color: '#ffb37a' }}>Fonte alimentar real</th>
                    <th className="p-5 text-sm font-bold uppercase tracking-wider" style={{ color: '#ffb37a' }}>Sinais de carência</th>
                  </tr>
                </thead>
                <tbody>
                  {NUTRIENTES.map((n, i) => (
                    <tr key={i} style={{ borderTop: '1px solid rgba(255,179,122,0.12)' }}>
                      <td className="p-5 font-bold" style={{ color: '#f4ede4' }}>{n.nutriente}</td>
                      <td className="p-5 font-light" style={{ color: 'rgba(244,237,228,0.85)' }}>{n.fonte}</td>
                      <td className="p-5 font-light" style={{ color: 'rgba(244,237,228,0.75)' }}>{n.carencia}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
          </div>
        </section>

        {/* CAPÍTULO 8 — Códice de 7 dias */}
        <section className="relative px-6 md:px-12 lg:px-20 py-24 md:py-32" style={{ backgroundColor: '#ece2d3' }}>
          <div className="max-w-[1600px] mx-auto">
            <motion.div {...fade(0)} className="mb-14 max-w-3xl">
              <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#b45836' }}>
                Capítulo 08
              </span>
              <h2 className="text-[clamp(2rem,4.5vw,4rem)] font-black leading-[1.05] tracking-tight" style={{ color: '#0e3b3a' }}>
                O códice de 7 dias:{' '}
                <span style={{ color: '#b45836', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>
                  práticas de autonomia.
                </span>
              </h2>
              <p className="mt-6 text-lg leading-relaxed font-light" style={{ color: '#2d3a37' }}>
                Um ritual novo por dia, empilhado sobre o anterior. É o único método que faz um regime durar meses em vez de desmoronar na primeira semana.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-5">
              {CODICE_7_DIAS.map((c, i) => (
                <motion.div
                  key={i}
                  {...fade(i * 0.06)}
                  className="p-7 rounded-2xl"
                  style={{ backgroundColor: '#f4ede4', border: '1px solid rgba(14,59,58,0.12)' }}
                >
                  <CheckCircle2 size={22} style={{ color: '#b45836' }} className="mb-4" />
                  <h3 className="text-base font-black uppercase tracking-wider mb-3" style={{ color: '#0e3b3a' }}>
                    {c.dia}
                  </h3>
                  <p className="text-sm leading-relaxed font-light" style={{ color: '#2d3a37' }}>
                    {c.foco}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CAPÍTULO 9 — Sinais de vitalidade */}
        <section className="relative px-6 md:px-12 lg:px-20 py-24 md:py-32" style={{ backgroundColor: '#0e3b3a', color: '#f4ede4' }}>
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 max-w-[1600px] mx-auto">
            <motion.aside {...fade(0)} className="lg:col-span-4">
              <div className="sticky top-24">
                <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#ffb37a' }}>
                  Capítulo 09
                </span>
                <div className="h-[2px] w-16 mb-6" style={{ backgroundColor: '#ffb37a' }} />
                <p className="text-sm uppercase tracking-[0.2em] font-semibold" style={{ color: 'rgba(244,237,228,0.75)' }}>
                  Sinais objetivos de vitalidade
                </p>
              </div>
            </motion.aside>
            <motion.div {...fade(0.1)} className="lg:col-span-8">
              <h2 className="text-[clamp(2rem,5vw,4.5rem)] font-black leading-[1.05] tracking-tight mb-10">
                Como saber que a força vital{' '}
                <span style={{ color: '#ffb37a', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>
                  está subindo.
                </span>
              </h2>
              <div className="space-y-4">
                {O_QUE_MEDIR.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-4 p-6 rounded-xl"
                    style={{ backgroundColor: 'rgba(244,237,228,0.06)', border: '1px solid rgba(255,179,122,0.18)' }}
                  >
                    <Activity size={20} className="shrink-0 mt-1" style={{ color: '#ffb37a' }} />
                    <p className="text-base md:text-lg leading-relaxed font-light" style={{ color: 'rgba(244,237,228,0.85)' }}>
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* CAPÍTULO 10 — Erros */}
        <section className="relative px-6 md:px-12 lg:px-20 py-24 md:py-32" style={{ backgroundColor: '#f4ede4' }}>
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 max-w-[1600px] mx-auto">
            <motion.aside {...fade(0)} className="lg:col-span-4">
              <div className="sticky top-24">
                <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#b45836' }}>
                  Capítulo 10
                </span>
                <div className="h-[2px] w-16 mb-6" style={{ backgroundColor: '#b45836' }} />
                <p className="text-sm uppercase tracking-[0.2em] font-semibold" style={{ color: '#5a6664' }}>
                  Sabotadores silenciosos
                </p>
              </div>
            </motion.aside>
            <motion.div {...fade(0.1)} className="lg:col-span-8">
              <h2 className="text-[clamp(2rem,5vw,4.5rem)] font-black leading-[1.05] tracking-tight mb-10" style={{ color: '#0e3b3a' }}>
                Os erros que{' '}
                <span style={{ color: '#b45836', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>
                  anulam todo o regime.
                </span>
              </h2>
              <div className="space-y-4">
                {ERROS.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-4 p-6 rounded-xl"
                    style={{ backgroundColor: '#ece2d3', border: '1px solid rgba(180,88,54,0.2)' }}
                  >
                    <AlertTriangle size={20} className="shrink-0 mt-1" style={{ color: '#b45836' }} />
                    <p className="text-base md:text-lg leading-relaxed font-light" style={{ color: '#2d3a37' }}>
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* CAPÍTULO 11 — FAQ */}
        <section className="relative px-6 md:px-12 lg:px-20 py-24 md:py-32" style={{ backgroundColor: '#ece2d3' }}>
          <div className="max-w-[1200px] mx-auto">
            <motion.div {...fade(0)} className="mb-14 text-center">
              <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#b45836' }}>
                Perguntas frequentes
              </span>
              <h2 className="text-[clamp(2rem,4.5vw,4rem)] font-black leading-[1.05] tracking-tight" style={{ color: '#0e3b3a' }}>
                Tudo que ainda falta{' '}
                <span style={{ color: '#b45836', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>
                  a dúvida certa.
                </span>
              </h2>
            </motion.div>

            <div className="space-y-3">
              {FAQ.map((f, i) => {
                const open = openFaq === i;
                return (
                  <motion.div
                    key={i}
                    {...fade(i * 0.03)}
                    className="rounded-2xl overflow-hidden"
                    style={{
                      backgroundColor: '#f4ede4',
                      boxShadow: open ? '0 8px 24px rgba(14,59,58,0.1)' : '0 1px 3px rgba(14,59,58,0.05)',
                    }}
                  >
                    <button
                      onClick={() => setOpenFaq(open ? null : i)}
                      className="w-full flex items-center justify-between gap-6 p-6 md:p-8 text-left"
                    >
                      <span className="text-lg md:text-xl font-bold leading-snug" style={{ color: '#0e3b3a' }}>
                        {f.q}
                      </span>
                      <ChevronDown
                        size={22}
                        className="shrink-0 transition-transform duration-500"
                        style={{ color: '#b45836', transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
                      />
                    </button>
                    {open && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        transition={{ duration: 0.5, ease: APPLE_EASE }}
                        className="px-6 md:px-8 pb-8"
                      >
                        <p className="text-base md:text-lg leading-relaxed font-light" style={{ color: '#2d3a37' }}>
                          {f.a}
                        </p>
                      </motion.div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CAPÍTULO 12 — Continue sua trilha */}
        <section className="relative py-24 md:py-32 px-6 md:px-12 lg:px-20" style={{ backgroundColor: '#0e3b3a', color: '#f4ede4' }}>
          <div className="max-w-[1400px] mx-auto">
            <motion.div {...fade(0)} className="mb-12 max-w-2xl">
              <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#ffb37a' }}>
                Continue sua trilha
              </span>
              <h2 className="text-[clamp(2rem,4.5vw,4rem)] font-black leading-[1] tracking-tight">
                O regime diário é a base.{' '}
                <span style={{ color: '#ffb37a', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>
                  O arsenal vem depois.
                </span>
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
              {[
                {
                  to: '/soberania-organica/farmacia-caseira-essencial',
                  titulo: 'Farmácia caseira essencial',
                  texto: 'Os 15 itens que dão conta da maioria das ocorrências domésticas, com dose, validade e custo.',
                },
                {
                  to: '/soberania-organica/tinturas-xaropes-preparos',
                  titulo: 'Tinturas, xaropes e preparos',
                  texto: 'Os métodos de extração do boticário: alcoólica, glicerinada, oleosa, decocção e xarope.',
                },
                {
                  to: '/soberania-organica/protocolos-gripe-resfriado',
                  titulo: 'Protocolos para gripe e resfriado',
                  texto: 'O que fazer hora a hora quando o corpo já foi atingido, e os sinais que exigem pronto-socorro.',
                },
                {
                  to: '/soberania-organica/saude-preventiva',
                  titulo: 'Saúde preventiva: o framework',
                  texto: 'Como estruturar prevenção real em vez de reagir a doença já instalada.',
                },
              ].map((c) => (
                <Link
                  key={c.to}
                  to={c.to}
                  className="group p-8 rounded-2xl transition-all hover:-translate-y-1"
                  style={{ backgroundColor: 'rgba(244,237,228,0.06)', border: '1px solid rgba(255,179,122,0.18)' }}
                >
                  <h3 className="text-xl md:text-2xl font-black leading-tight mb-3" style={{ color: '#f4ede4' }}>
                    {c.titulo}
                  </h3>
                  <p className="text-base leading-relaxed font-light mb-5" style={{ color: 'rgba(244,237,228,0.75)' }}>
                    {c.texto}
                  </p>
                  <span
                    className="inline-flex items-center gap-2 text-sm font-bold tracking-wider uppercase transition-transform group-hover:translate-x-1"
                    style={{ color: '#ffb37a' }}
                  >
                    Acessar <ArrowRight size={16} />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
