import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Sun, Droplet, Wind, Dumbbell, Snowflake, Clock, Moon, BedDouble,
  ChevronDown, ArrowRight, AlertTriangle, CheckCircle2, Activity,
  Utensils, Thermometer, ShieldCheck,
} from 'lucide-react';
import SeoHead from '@/components/SeoHead';
import BackToHome from '@/components/BackToHome';
import heroImg from '@/assets/rotina-imunidade/hero-sol-manha.jpg';
import frioImg from '@/assets/rotina-imunidade/frio-exposicao.jpg';
import alimentosImg from '@/assets/rotina-imunidade/alimentos-nutrientes.jpg';
import sonoImg from '@/assets/rotina-imunidade/sono-quarto.jpg';

/**
 * /soberania-organica/rotina-diaria-imunidade
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

const AO_ACORDAR = [
  {
    icon: Sun,
    titulo: 'Luz solar nos olhos nos primeiros 30 minutos',
    descricao:
      'Assim que levantar, vá até uma janela aberta ou, melhor ainda, para fora de casa, sem óculos escuros, e deixe a luz da manhã entrar pelos olhos por 5 a 10 minutos. Essa exposição precoce ancora o ritmo circadiano, sincroniza a liberação de cortisol no horário certo e, horas depois, prepara a queda de melatonina que vai facilitar o sono à noite. Não precisa olhar direto para o sol, basta estar exposto à claridade externa, mesmo em dia nublado, porque a intensidade de luz do céu aberto é muito maior do que qualquer lâmpada de ambiente interno.',
  },
  {
    icon: Droplet,
    titulo: 'Hidratação com sal marinho e limão',
    descricao:
      'Depois de 7 a 9 horas sem ingerir líquidos, o corpo acorda com déficit de água e eletrólitos. Um copo de 300 a 500 ml de água em temperatura ambiente com uma pitada de sal marinho não refinado e o suco de meio limão repõe sódio, cloro e minerais traço, melhora a absorção de água nas células e reduz aquela sensação de cansaço matinal que muita gente confunde com falta de sono. Beba antes do café, porque cafeína em jejum sobre desidratação eleva cortisol de forma desnecessária.',
  },
  {
    icon: Wind,
    titulo: 'Respiração nasal consciente',
    descricao:
      'Antes de qualquer tela, faça de 2 a 5 minutos de respiração exclusivamente pelo nariz, inspirando em 4 tempos e expirando em 6 a 8 tempos. A respiração nasal filtra o ar, produz óxido nítrico que auxilia a oxigenação e ativa o sistema nervoso parassimpático, o que reduz o pico de cortisol reativo que normalmente empurra o corpo para o estado de alerta antes mesmo de qualquer estímulo externo. Quem já acorda respirando pela boca tende a carregar esse padrão de estresse o dia inteiro.',
  },
];

const MANHA = [
  {
    icon: Utensils,
    titulo: 'Proteína de qualidade na primeira refeição',
    descricao:
      'A primeira refeição do dia deve conter de 25 a 40 gramas de proteína completa: ovos, carne, peixe, iogurte integral ou uma combinação vegetal bem calculada. Proteína pela manhã estabiliza a glicemia, fornece os aminoácidos que sustentam a produção de anticorpos e neurotransmissores, e reduz a fissura por açúcar que normalmente aparece no meio da manhã. Pular a proteína e comer só carboidrato refinado no café é um dos maiores saboteurs silenciosos da imunidade.',
  },
  {
    icon: Snowflake,
    titulo: 'Exposição ao frio controlada',
    descricao:
      'Banho frio de 30 a 90 segundos ao final do banho quente, ou uma caminhada leve com poucas roupas em dia frio, ativa a produção de proteínas de choque térmico e aumenta a atividade de células imunes circulantes, além de elevar a norepinefrina de forma natural, o que melhora foco e disposição sem precisar de estimulante externo. Comece com poucos segundos e aumente gradualmente. Gestantes, cardiopatas e pessoas com pressão descontrolada devem evitar exposição ao frio sem orientação médica.',
  },
  {
    icon: Dumbbell,
    titulo: 'Movimento antes das 10h',
    descricao:
      'Não precisa ser treino pesado. Uma caminhada de 20 a 30 minutos, mobilidade articular ou um treino de força moderado logo pela manhã aumenta a circulação linfática, que é o sistema que transporta células de defesa pelo corpo e depende quase inteiramente do movimento muscular para funcionar, já que não tem bomba própria como o sistema cardiovascular. Treinar de manhã também reforça o pico de cortisol saudável e evita competir com a queda de energia que naturalmente ocorre à noite.',
  },
];

const TARDE = [
  {
    icon: Clock,
    titulo: 'Janela alimentar concentrada',
    descricao:
      'Concentrar as refeições em uma janela de 8 a 10 horas, por exemplo entre 8h e 18h, dá ao sistema digestivo e ao sistema imune um período real de descanso metabólico. Comer o tempo todo, do café da manhã até a meia-noite, mantém insulina cronicamente elevada, o que atrapalha processos de reparo celular e reduz a eficiência das células de defesa, que competem por energia com a digestão contínua.',
  },
  {
    icon: Sun,
    titulo: 'Sol do meio-dia em pele exposta',
    descricao:
      'Entre 11h e 14h, expor braços, pernas ou costas ao sol por 10 a 20 minutos, sem protetor solar nesse período curto, é a forma mais eficiente de sintetizar vitamina D, um dos nutrientes com relação mais direta e mais estudada com função imunológica robusta. Pessoas de pele mais escura precisam de mais tempo de exposição para produzir a mesma quantidade. Ajuste o tempo conforme sua tolerância e evite queimadura.',
  },
  {
    icon: Activity,
    titulo: 'Pausa real de tela',
    descricao:
      'Um intervalo de 10 a 15 minutos longe de qualquer tela no meio da tarde, de preferência ao ar livre ou olhando para um horizonte distante, reduz a fadiga ocular, dá um respiro ao sistema nervoso simpático hiperestimulado por notificações e evita o pico de cortisol tardio que muita gente sente como ansiedade no fim do expediente. Esse pequeno reset facilita a transição para a noite sem precisar de estimulante para aguentar o resto do dia.',
  },
];

const NOITE = [
  {
    icon: Utensils,
    titulo: 'Jantar cedo, pelo menos 3 horas antes de deitar',
    descricao:
      'Terminar de jantar 3 horas antes de ir para a cama dá tempo para a digestão avançar antes que o corpo precise entrar em modo de reparo profundo durante o sono. Comer tarde e pesado eleva a temperatura corporal central e mantém o sistema digestivo ativo justamente na hora em que ele deveria estar em segundo plano, o que fragmenta o sono profundo, a fase em que boa parte da regeneração imunológica acontece.',
  },
  {
    icon: Moon,
    titulo: 'Corte de luz azul e óculos bloqueadores',
    descricao:
      'A partir do pôr do sol, reduza luzes brancas e frias em casa, troque por luz âmbar ou vela, e use óculos bloqueadores de luz azul se precisar usar telas. A luz azul à noite engana o cérebro fazendo-o pensar que ainda é dia, atrasando a liberação de melatonina, hormônio que também tem papel antioxidante e regulador da resposta imune noturna.',
  },
  {
    icon: Thermometer,
    titulo: 'Temperatura do quarto entre 18 e 20 graus',
    descricao:
      'O corpo precisa reduzir a temperatura interna em cerca de 1 grau para entrar e se manter em sono profundo. Quarto quente demais é uma das causas mais comuns e mais ignoradas de sono superficial e fragmentado. Ventilador, ar-condicionado programado ou simplesmente uma janela entreaberta já fazem diferença perceptível na qualidade do descanso.',
  },
  {
    icon: ShieldCheck,
    titulo: 'Magnésio antes de deitar',
    descricao:
      'Magnésio glicinato ou treonato, em dose orientada por profissional de saúde, ajuda a relaxar o sistema nervoso, reduzir a tensão muscular acumulada e favorecer a transição para o sono. É um dos minerais mais depletados por estresse crônico, café em excesso e alimentação ultraprocessada, e sua falta está associada a sono leve e despertar noturno frequente.',
  },
];

const SONO = [
  'Manter horário fixo de dormir e acordar, inclusive nos fins de semana, é mais importante para a imunidade do que dormir uma hora extra de vez em quando.',
  'Evitar álcool à noite: mesmo em pequena quantidade, o álcool fragmenta o sono profundo e reduz a fase REM, mesmo que a pessoa durma o número normal de horas.',
  'Escurecer totalmente o quarto. Qualquer luz residual, mesmo fraca, de LED de aparelho eletrônico, reduz a produção de melatonina durante a noite inteira.',
  'Evitar cafeína depois das 14h. A meia-vida da cafeína pode passar de 6 horas, e mesmo sem sentir o efeito estimulante, ela já está interferindo na arquitetura do sono profundo.',
  'Não treinar intensamente nas 3 horas antes de dormir. Isso eleva temperatura corporal e adrenalina, atrasando o início do sono profundo.',
  'Evitar discussões e notícias estressantes à noite. O sistema nervoso simpático ativado antes de deitar atrasa a transição para o sono e reduz sua qualidade mesmo que o tempo total pareça normal.',
];

const NUTRIENTES = [
  { nutriente: 'Vitamina D', fonte: 'Sol do meio-dia, gema de ovo, peixes gordurosos, fígado', carencia: 'Cansaço persistente, infecções respiratórias frequentes, dor óssea e muscular difusa' },
  { nutriente: 'Zinco', fonte: 'Carne vermelha, ostras, sementes de abóbora, grão-de-bico', carencia: 'Cicatrização lenta, perda de olfato e paladar, unhas fracas com manchas brancas' },
  { nutriente: 'Vitamina C', fonte: 'Acerola, goiaba, laranja, pimentão, kiwi', carencia: 'Gengiva sangrando, hematomas fáceis, resfriados que se arrastam por semanas' },
  { nutriente: 'Magnésio', fonte: 'Folhas verde-escuras, castanhas, cacau amargo, abacate', carencia: 'Cãibras noturnas, ansiedade, sono leve, tensão muscular no pescoço e ombros' },
  { nutriente: 'Ômega 3', fonte: 'Sardinha, salmão selvagem, linhaça, chia', carencia: 'Pele seca, inflamação articular persistente, dificuldade de concentração' },
  { nutriente: 'Selênio', fonte: 'Castanha-do-pará (1 a 2 unidades por dia), peixe, ovo', carencia: 'Fadiga, unhas quebradiças, função tireoidiana comprometida' },
  { nutriente: 'Ferro', fonte: 'Carne vermelha, fígado, lentilha combinada com vitamina C', carencia: 'Palidez, falta de ar leve ao esforço, cansaço que não melhora com sono' },
];

const O_QUE_MEDIR = [
  'Frequência cardíaca de repouso ao acordar: tendência de queda ao longo de semanas indica melhora de condicionamento e recuperação.',
  'Variabilidade da frequência cardíaca (HRV), se tiver acesso a relógio ou anel que meça: valores subindo de forma consistente indicam sistema nervoso mais equilibrado.',
  'Tempo para adormecer: menos de 20 minutos deitado até dormir é sinal de bom ritmo circadiano funcionando.',
  'Número de despertares noturnos: redução progressiva indica sono mais profundo e reparador.',
  'Disposição ao acordar sem alarme, ou nos primeiros minutos depois dele, sem sensação de atordoamento prolongado.',
  'Frequência de resfriados e infecções leves ao longo dos meses: redução perceptível é o indicador mais direto de que a rotina está funcionando.',
];

const ERROS = [
  'Fazer tudo certo de dia e arruinar à noite com tela até tarde, jantar pesado e horário de dormir instável. A rotina só funciona como conjunto, não como itens avulsos.',
  'Suplementar vitaminas isoladas sem corrigir sono e luz solar. Suplemento nunca substitui os fundamentos de ritmo circadiano, ele apenas complementa uma base já funcional.',
  'Treinar muito forte todos os dias sem descanso. Excesso de treino sem recuperação suprime temporariamente a imunidade em vez de fortalecê-la.',
  'Fazer jejum prolongado e treino intenso ao mesmo tempo, gerando estresse metabólico acumulado que o corpo interpreta como ameaça constante.',
  'Depender de café para compensar sono ruim em vez de corrigir a causa. Isso mascara o problema e adia a correção real por meses ou anos.',
  'Abandonar a rotina no primeiro fim de semana social. Consistência de 80 a 90% ao longo do tempo importa muito mais do que perfeição em poucos dias isolados.',
];

const CHECKLIST_7_DIAS = [
  { dia: 'Dia 1', foco: 'Estabelecer luz solar matinal e hidratação com sal ao acordar, sem mexer em mais nada ainda.' },
  { dia: 'Dia 2', foco: 'Adicionar proteína de 25 a 40g na primeira refeição e observar saciedade até o almoço.' },
  { dia: 'Dia 3', foco: 'Introduzir banho frio de 30 segundos ao final do banho normal.' },
  { dia: 'Dia 4', foco: 'Definir janela alimentar de 8 a 10 horas e respeitar o horário de término do jantar.' },
  { dia: 'Dia 5', foco: 'Cortar telas e luz branca 90 minutos antes de dormir, trocar por luz âmbar.' },
  { dia: 'Dia 6', foco: 'Ajustar temperatura do quarto para 18 a 20 graus e testar magnésio antes de deitar.' },
  { dia: 'Dia 7', foco: 'Revisar a semana inteira: horário de sono, número de despertares e disposição ao acordar.' },
];

const FAQ = [
  {
    q: 'Quanto tempo leva para sentir os efeitos de uma rotina diária de imunidade?',
    a: 'As primeiras melhoras percebidas, como mais disposição ao acordar e menos oscilação de energia à tarde, costumam aparecer entre 7 e 14 dias de consistência. Mudanças mais profundas, como menor frequência de resfriados e infecções, geralmente exigem de 6 a 12 semanas de rotina sustentada, porque o sistema imune responde a padrões repetidos, não a ações isoladas.',
  },
  {
    q: 'Preciso fazer todos os itens da rotina desde o primeiro dia?',
    a: 'Não. O checklist de 7 dias existe exatamente para introduzir um hábito por vez. Tentar implementar tudo de uma vez costuma gerar abandono na primeira semana. Comece pela luz solar matinal e pela hidratação, que são os dois hábitos de menor esforço e maior efeito imediato sobre o ritmo circadiano.',
  },
  {
    q: 'Banho frio todos os dias é seguro para qualquer pessoa?',
    a: 'Não. Pessoas com problemas cardiovasculares, pressão alta descontrolada, gestantes e pessoas com condições respiratórias crônicas devem conversar com um médico antes de iniciar exposição ao frio. Para a maioria das pessoas saudáveis, começar com poucos segundos e aumentar de forma gradual é seguro, mas a orientação individual sempre prevalece sobre qualquer conteúdo genérico.',
  },
  {
    q: 'Vitamina D em suplemento substitui o sol do meio-dia?',
    a: 'Suplementação pode ser necessária em determinadas épocas do ano ou para quem não tem acesso regular ao sol, mas a exposição solar direta também traz benefícios que vão além da vitamina D, como regulação do ritmo circadiano e produção de óxido nítrico na pele. O ideal é combinar exposição solar responsável com suplementação avaliada por exame de sangue e orientação médica, nunca suplementar às cegas em dose alta sem acompanhamento.',
  },
  {
    q: 'Por que o horário do jantar importa tanto para a imunidade?',
    a: 'Durante o sono profundo, o corpo direciona uma parte importante da energia disponível para reparo celular e regulação imunológica. Se o sistema digestivo ainda está processando uma refeição pesada nesse horário, essa energia é desviada para a digestão, competindo diretamente com os processos de recuperação que sustentam a imunidade.',
  },
  {
    q: 'Essa rotina substitui acompanhamento médico ou exames de sangue?',
    a: 'Não. Esta rotina é um conjunto de práticas educativas baseadas em fisiologia geral e não substitui avaliação médica individualizada, exames laboratoriais nem prescrição profissional. Antes de suplementar nutrientes específicos ou alterar drasticamente rotina alimentar e de exercício, principalmente em caso de condição de saúde preexistente, procure orientação de um profissional qualificado.',
  },
  {
    q: 'É normal sentir mais cansaço nos primeiros dias da rotina?',
    a: 'Sim, especialmente ao ajustar horário de sono e cortar cafeína tardia, o corpo pode passar por um período de reajuste de 3 a 5 dias em que a energia parece instável. Isso costuma ser temporário e faz parte da recalibração do ritmo circadiano. Se o cansaço persistir além de duas semanas ou vier acompanhado de outros sintomas, vale investigar com exames.',
  },
];

function Hero() {
  return (
    <section className="relative w-full" style={{ height: '92vh', minHeight: 720 }}>
      <img
        src={heroImg}
        alt="Luz solar entrando pela manhã, simbolizando o primeiro hábito da rotina diária para aumentar a imunidade"
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
            'linear-gradient(180deg, rgba(14,59,58,0.5) 0%, rgba(14,59,58,0.3) 40%, rgba(14,59,58,0.9) 100%)',
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
            <Sun size={11} className="inline mr-2" /> Soberania Orgânica · Imunidade
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1, delay: 0.15, ease: APPLE_EASE }}
          className="text-[clamp(2.5rem,8vw,7rem)] font-black leading-[0.95] tracking-tight max-w-[20ch]"
          style={{ fontFamily: "'Inter Tight', sans-serif", color: '#f4ede4' }}
        >
          Rotina diária para{' '}
          <span
            style={{
              color: '#ffb37a',
              fontStyle: 'italic',
              fontWeight: 400,
              fontFamily: "'Playfair Display', serif",
              textShadow: '0 0 40px rgba(255,179,122,0.45), 0 0 80px rgba(255,179,122,0.25)',
            }}
          >
            aumentar a imunidade.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: APPLE_EASE }}
          className="mt-8 max-w-2xl text-lg md:text-2xl leading-relaxed font-light"
          style={{ color: 'rgba(244,237,228,0.85)', fontFamily: "'Inter Tight', sans-serif" }}
        >
          Um protocolo prático hora a hora, das 24 horas do dia, para quem quer construir imunidade real através de luz, movimento, alimentação e sono, sem depender de suplemento milagroso.
        </motion.p>
      </motion.div>
    </section>
  );
}

function AvisoMedico() {
  return (
    <div
      className="max-w-[1600px] mx-auto mx-6 md:mx-12 lg:mx-20 rounded-2xl px-6 py-5 md:px-8 md:py-6 flex items-start gap-4"
      style={{ backgroundColor: '#ece2d3', border: '1px solid rgba(14,59,58,0.15)' }}
    >
      <AlertTriangle size={22} className="shrink-0 mt-0.5" style={{ color: '#b45836' }} />
      <p className="text-sm md:text-base leading-relaxed font-light" style={{ color: '#2d3a37' }}>
        Este conteúdo é educativo e não substitui avaliação médica individualizada. Antes de alterar rotina de sono, alimentação, suplementação ou exposição ao frio, principalmente em caso de condição de saúde preexistente, gravidez ou uso de medicação contínua, procure orientação de um profissional de saúde qualificado.
      </p>
    </div>
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
}: {
  numero: string;
  titulo: string;
  subtitulo: string;
  itens: { icon: any; titulo: string; descricao: string }[];
  imagem: string;
  imagemAlt: string;
  claro: boolean;
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
                className="w-full h-[280px] md:h-[420px] object-cover"
              />
            </div>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
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
          title: 'Rotina Diária para Aumentar a Imunidade: Protocolo Hora a Hora',
          description:
            'Rotina diária para aumentar a imunidade organizada em 24 horas: luz solar, hidratação, proteína, frio, sono e nutrientes-chave. Checklist de 7 dias e o que medir para saber que está funcionando.',
          canonical: 'https://sovereign-arsenal.lovable.app/soberania-organica/rotina-diaria-imunidade',
          primaryKeyword: 'rotina diária para aumentar a imunidade',
          lsiKeywords: [
            'como fortalecer o sistema imunológico',
            'hábitos diários de imunidade',
            'protocolo de saúde diário',
            'nutrientes para imunidade',
            'higiene do sono e imunidade',
            'exposição solar e vitamina D',
          ],
          longTailKeywords: [
            'rotina diária hora a hora para aumentar a imunidade',
            'o que fazer todos os dias para não ficar doente',
            'checklist de 7 dias para melhorar a imunidade',
            'alimentos e nutrientes que fortalecem o sistema imunológico',
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

        {/* CAPÍTULO 1 — Por que pensar em 24 horas */}
        <section className="relative px-6 md:px-12 lg:px-20 py-20 md:py-28" style={{ backgroundColor: '#f4ede4' }}>
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 max-w-[1600px] mx-auto">
            <motion.aside {...fade(0)} className="lg:col-span-4">
              <div className="sticky top-24">
                <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#b45836' }}>
                  Capítulo 01
                </span>
                <div className="h-[2px] w-16 mb-6" style={{ backgroundColor: '#b45836' }} />
                <p className="text-sm uppercase tracking-[0.2em] font-semibold" style={{ color: '#5a6664' }}>
                  Imunidade é ritmo, não evento isolado
                </p>
              </div>
            </motion.aside>
            <motion.div {...fade(0.1)} className="lg:col-span-8">
              <h2 className="text-[clamp(2.25rem,5.5vw,5rem)] font-black leading-[1] tracking-tight mb-10" style={{ color: '#0e3b3a' }}>
                Sistema imunológico{' '}
                <span style={{ color: '#b45836', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>
                  não liga e desliga.
                </span>
              </h2>
              <div className="space-y-7 text-lg md:text-xl leading-[1.7] font-light" style={{ color: '#2d3a37' }}>
                <p>
                  A ideia de tomar uma vitamina C isolada quando já se está gripado é a versão mais fraca possível de cuidar da imunidade. O sistema imunológico responde a padrões repetidos ao longo de semanas e meses: horário de luz, temperatura do ambiente, tipo de alimento, qualidade do sono e nível de estresse crônico. Cada um desses fatores manda um sinal químico contínuo para o corpo, e é a soma desses sinais, dia após dia, que determina se as defesas estão funcionando em capacidade plena ou operando no limite.
                </p>
                <p>
                  Por isso esta rotina está organizada como um dia completo de 24 horas, do momento em que você abre os olhos até o momento em que entra em sono profundo. Não é uma lista de suplementos. É uma sequência de decisões pequenas, repetidas todos os dias, que juntas constroem uma base biológica sólida. O objetivo aqui não é nunca mais ficar doente, isso é impossível e não é promessa séria. O objetivo é reduzir a frequência, a duração e a intensidade das infecções comuns através de hábitos que você controla inteiramente.
                </p>
                <blockquote
                  className="pl-8 py-2 my-10 text-2xl md:text-3xl leading-[1.4] font-light"
                  style={{ borderLeft: '3px solid #b45836', color: '#0e3b3a', fontFamily: "'Playfair Display', serif", fontStyle: 'italic' }}
                >
                  Soberania biológica é não terceirizar sua saúde para o próximo remédio de prateleira.
                </blockquote>
                <p>
                  Nos próximos capítulos você vai encontrar cada bloco do dia detalhado, com o porquê fisiológico de cada hábito, uma tabela de nutrientes com fontes alimentares reais, um checklist de implementação de 7 dias, os indicadores que mostram que a rotina está funcionando, e os erros mais comuns que anulam todo o esforço.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* CAPÍTULO 2 — Ao acordar */}
        <BlocoPeriodo
          numero="02"
          titulo="Ao acordar: os primeiros 30 minutos definem o dia inteiro"
          subtitulo="00h00 às 07h00"
          itens={AO_ACORDAR}
          imagem={heroImg}
          imagemAlt="Luz do sol entrando pela janela pela manhã, primeiro hábito da rotina de imunidade"
          claro={true}
        />

        {/* CAPÍTULO 3 — Manhã */}
        <BlocoPeriodo
          numero="03"
          titulo="Manhã: proteína, frio e movimento constroem a base do dia"
          subtitulo="07h00 às 12h00"
          itens={MANHA}
          imagem={frioImg}
          imagemAlt="Exposição ao frio pela manhã como parte da rotina de fortalecimento imunológico"
          claro={false}
        />

        {/* CAPÍTULO 4 — Tarde */}
        <BlocoPeriodo
          numero="04"
          titulo="Tarde: janela alimentar, sol do meio-dia e pausa de tela"
          subtitulo="12h00 às 18h00"
          itens={TARDE}
          imagem={alimentosImg}
          imagemAlt="Alimentos naturais ricos em nutrientes para sustentar a imunidade durante a tarde"
          claro={true}
        />

        {/* CAPÍTULO 5 — Noite */}
        <BlocoPeriodo
          numero="05"
          titulo="Noite: preparar o corpo para o sono profundo"
          subtitulo="18h00 às 22h00"
          itens={NOITE}
          imagem={sonoImg}
          imagemAlt="Quarto escuro e fresco preparado para uma noite de sono profundo e reparador"
          claro={false}
        />

        {/* CAPÍTULO 6 — Sono: o que arruína o sono profundo */}
        <section className="relative px-6 md:px-12 lg:px-20 py-24 md:py-32" style={{ backgroundColor: '#f4ede4' }}>
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 max-w-[1600px] mx-auto">
            <motion.aside {...fade(0)} className="lg:col-span-4">
              <div className="sticky top-24">
                <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#b45836' }}>
                  Capítulo 06
                </span>
                <div className="h-[2px] w-16 mb-6" style={{ backgroundColor: '#b45836' }} />
                <p className="text-sm uppercase tracking-[0.2em] font-semibold" style={{ color: '#5a6664' }}>
                  22h00 às 06h00
                </p>
              </div>
            </motion.aside>
            <motion.div {...fade(0.1)} className="lg:col-span-8">
              <h2 className="text-[clamp(2rem,5vw,4.5rem)] font-black leading-[1.05] tracking-tight mb-10" style={{ color: '#0e3b3a' }}>
                Sono profundo: o que{' '}
                <span style={{ color: '#b45836', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>
                  arruína tudo silenciosamente.
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

        {/* CAPÍTULO 7 — Tabela de nutrientes-chave */}
        <section className="relative px-6 md:px-12 lg:px-20 py-24 md:py-32" style={{ backgroundColor: '#0e3b3a', color: '#f4ede4' }}>
          <div className="max-w-[1600px] mx-auto">
            <motion.div {...fade(0)} className="mb-14 max-w-3xl">
              <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#ffb37a' }}>
                Capítulo 07
              </span>
              <h2 className="text-[clamp(2rem,4.5vw,4rem)] font-black leading-[1.05] tracking-tight">
                Nutrientes-chave,{' '}
                <span style={{ color: '#ffb37a', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>
                  fonte real e sinais de carência.
                </span>
              </h2>
              <p className="mt-6 text-lg leading-relaxed font-light" style={{ color: 'rgba(244,237,228,0.8)' }}>
                Antes de comprar qualquer suplemento, verifique se sua alimentação já cobre esses nutrientes através de comida de verdade. Sinais de carência isolados não fecham diagnóstico, apenas indicam onde investigar com exame de sangue.
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

        {/* CAPÍTULO 8 — Checklist 7 dias */}
        <section className="relative px-6 md:px-12 lg:px-20 py-24 md:py-32" style={{ backgroundColor: '#f4ede4' }}>
          <div className="max-w-[1600px] mx-auto">
            <motion.div {...fade(0)} className="mb-14 max-w-3xl">
              <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#b45836' }}>
                Capítulo 08
              </span>
              <h2 className="text-[clamp(2rem,4.5vw,4rem)] font-black leading-[1.05] tracking-tight" style={{ color: '#0e3b3a' }}>
                Checklist de implementação{' '}
                <span style={{ color: '#b45836', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>
                  em 7 dias.
                </span>
              </h2>
              <p className="mt-6 text-lg leading-relaxed font-light" style={{ color: '#2d3a37' }}>
                Um hábito novo por dia, empilhado sobre o anterior, é o método mais realista de fazer essa rotina durar meses em vez de desmoronar na primeira semana.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
              {CHECKLIST_7_DIAS.map((c, i) => (
                <motion.div
                  key={i}
                  {...fade(i * 0.06)}
                  className="p-7 rounded-2xl"
                  style={{ backgroundColor: '#ece2d3', border: '1px solid rgba(14,59,58,0.1)' }}
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

        {/* CAPÍTULO 9 — O que medir */}
        <section className="relative px-6 md:px-12 lg:px-20 py-24 md:py-32" style={{ backgroundColor: '#0e3b3a', color: '#f4ede4' }}>
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 max-w-[1600px] mx-auto">
            <motion.aside {...fade(0)} className="lg:col-span-4">
              <div className="sticky top-24">
                <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#ffb37a' }}>
                  Capítulo 09
                </span>
                <div className="h-[2px] w-16 mb-6" style={{ backgroundColor: '#ffb37a' }} />
                <p className="text-sm uppercase tracking-[0.2em] font-semibold" style={{ color: 'rgba(244,237,228,0.75)' }}>
                  Indicadores de progresso
                </p>
              </div>
            </motion.aside>
            <motion.div {...fade(0.1)} className="lg:col-span-8">
              <h2 className="text-[clamp(2rem,5vw,4.5rem)] font-black leading-[1.05] tracking-tight mb-10">
                O que medir para saber que{' '}
                <span style={{ color: '#ffb37a', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>
                  está funcionando.
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

        {/* CAPÍTULO 10 — Erros que anulam tudo */}
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
                  anulam tudo.
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
                Uma rotina{' '}
                <span style={{ color: '#ffb37a', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>
                  não substitui autonomia completa.
                </span>
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  to: '/soberania-organica/saude-preventiva',
                  titulo: 'Saúde preventiva: o framework completo',
                  texto: 'Como estruturar prevenção real em vez de reagir a doença já instalada.',
                },
                {
                  to: '/soberania-organica/autonomia-biologica',
                  titulo: 'Autonomia biológica',
                  texto: 'O próximo nível: reduzir dependência de sistema de saúde reativo no dia a dia.',
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
