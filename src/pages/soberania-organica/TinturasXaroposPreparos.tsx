import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Beaker, Droplet, Thermometer, Scale, Timer, ShieldAlert,
  ChevronDown, ArrowRight, FlaskConical, Leaf, Sparkles,
  BookOpen, AlertTriangle, CheckCircle2, Tag,
} from 'lucide-react';
import SeoHead from '@/components/SeoHead';
import BackToHome from '@/components/BackToHome';
import heroImg from '@/assets/preparos-caseiros/tinturas-hero.jpg';
import calenduaImg from '@/assets/preparos-caseiros/oleo-calendula.jpg';
import propolisImg from '@/assets/preparos-caseiros/tintura-propolis.jpg';
import xaropeImg from '@/assets/preparos-caseiros/xarope-gengibre.jpg';

/**
 * /soberania-organica/tinturas-xaropes-preparos
 * Palavra-chave: "como fazer tintura de plantas em casa"
 * Paleta tutorial de saúde: claro #f4ede4 / #ece2d3 alternando com escuro #0e3b3a.
 */

const APPLE_EASE = [0.22, 1, 0.36, 1] as const;
const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.8, ease: APPLE_EASE, delay },
});

const METODOS = [
  {
    n: '01',
    titulo: 'Infusão',
    icon: Droplet,
    resumo: 'Água quente sobre partes moles (folhas, flores).',
    detalhe:
      'Despeje água a 90-95°C (nunca fervendo) sobre a planta, tampe e deixe descansar de 8 a 15 minutos. Proporção padrão: 1 colher de sopa (cerca de 3g) de planta seca por 250ml de água, ou 2 colheres de sopa de planta fresca picada para o mesmo volume. Serve para camomila, hortelã, erva-cidreira, capim-limão. Validade: consumir em até 12 horas, guardado sob refrigeração.',
  },
  {
    n: '02',
    titulo: 'Decocção',
    icon: Thermometer,
    resumo: 'Fervura prolongada para partes duras (cascas, raízes).',
    detalhe:
      'Coloque a planta em água fria, leve ao fogo e deixe ferver por 10 a 20 minutos com a panela semiaberta. Proporção: 1 colher de sopa rasa (cerca de 5g) de planta seca dura por 300ml de água. Ideal para gengibre, canela, casca de barbatimão, raiz de valeriana. Depois de fria, coar duas vezes. Validade: 24 horas na geladeira, em recipiente de vidro fechado.',
  },
  {
    n: '03',
    titulo: 'Tintura alcoólica',
    icon: FlaskConical,
    resumo: 'Extração em álcool, dura anos, dose por gota.',
    detalhe:
      'Planta seca: proporção 1:5 (20g de planta para 100ml de álcool). Planta fresca: proporção 1:2 (50g de planta para 100ml de álcool), porque a própria planta já carrega água. Graduação do álcool varia pelo tipo de planta: resinas e própolis pedem álcool de cereais 70-96 GL; folhas e flores aquosas funcionam melhor entre 40-50 GL (cachaça pura ou vodka); raízes fibrosas exigem entre 60-70 GL. Maceração de 21 a 30 dias em vidro âmbar, agitando o pote diariamente nos primeiros 10 dias, longe de luz direta. Validade: 2 a 5 anos.',
  },
  {
    n: '04',
    titulo: 'Glicerite (sem álcool)',
    icon: Sparkles,
    resumo: 'Extração em glicerina vegetal, segura para crianças.',
    detalhe:
      'Proporção: glicerina vegetal e água destilada misturadas 75%/25%, cobrindo a planta seca na proporção 1:5 (20g de planta para 100ml da mistura). Para planta fresca, use glicerina pura sem diluir, proporção 1:2. Maceração de 14 a 21 dias, agitando diariamente. Sabor adocicado, ótima para crianças e gestantes que evitam álcool. Validade: 1 a 2 anos, guardada ao abrigo de luz.',
  },
  {
    n: '05',
    titulo: 'Óleo infundido',
    icon: Leaf,
    resumo: 'Extração lipossolúvel para uso tópico.',
    detalhe:
      'Método a frio: planta seca completamente coberta por óleo vegetal (oliva, girassol ou coco fracionado) em pote de vidro, proporção 1:5, descansando em local ensolarado por 2 a 4 semanas, agitando a cada 2 dias. Método a quente: banho-maria a 60-70°C por 2 a 3 horas, proporção 1:4, mais rápido e indicado para calêndula, arnica e erva-baleeira. Coar em pano fino, espremendo bem. Validade: 6 a 12 meses guardado em local escuro e fresco.',
  },
  {
    n: '06',
    titulo: 'Xarope',
    icon: Beaker,
    resumo: 'Base de mel ou açúcar para uso respiratório e infantil.',
    detalhe:
      'Prepare uma decocção ou infusão concentrada (dobre a quantidade de planta) e, ainda morna (nunca fervendo, para não destruir enzimas do mel), misture com mel ou xarope de açúcar na proporção 1:1 em volume. Para açúcar, dissolva em fogo baixo até obter consistência de calda. Validade: 15 a 30 dias na geladeira com mel; 10 dias com base de açúcar puro.',
  },
];

const GRADUACAO = [
  { tipo: 'Resinas e própolis', gl: '70 a 96 GL', obs: 'Precisa de álcool forte para dissolver resinas e ceras.' },
  { tipo: 'Folhas e flores aquosas', gl: '40 a 50 GL', obs: 'Cachaça pura ou vodka comum já extraem bem os princípios ativos.' },
  { tipo: 'Raízes e cascas fibrosas', gl: '60 a 70 GL', obs: 'Fibra dura exige álcool mais forte para romper a parede celular.' },
  { tipo: 'Plantas ricas em óleo essencial', gl: '50 a 60 GL', obs: 'Excesso de álcool volatiliza o óleo antes da hora de usar.' },
];

const RENDIMENTO = [
  { preparo: 'Tintura alcoólica (100ml)', rendimento: '90 a 95ml úteis', custo: 'R$ 12 a R$ 25', doses: '60 a 190 doses de 15 a 30 gotas' },
  { preparo: 'Glicerite (100ml)', rendimento: '85 a 90ml úteis', custo: 'R$ 15 a R$ 30', doses: '60 a 170 doses' },
  { preparo: 'Óleo infundido (200ml)', rendimento: '160 a 180ml úteis', custo: 'R$ 10 a R$ 22', doses: 'uso tópico, 30 a 60 aplicações' },
  { preparo: 'Xarope caseiro (250ml)', rendimento: '220 a 240ml úteis', custo: 'R$ 14 a R$ 28', doses: '20 a 45 colheres de chá' },
];

const ERROS = [
  'Usar planta úmida ou com resíduo de água na tintura alcoólica: cria ponto de mofo e estraga o lote inteiro em poucos dias.',
  'Guardar em vidro claro exposto à luz solar direta: degrada compostos ativos e reduz a potência do extrato antes da metade da validade.',
  'Fechar o pote sem esterilizar antes: contamina o preparo com fungo, mesmo com álcool de alta graduação.',
  'Não etiquetar com data de fabricação e proporção usada: depois de meses, ninguém lembra a concentração real e a dosagem vira chute perigoso.',
  'Ferver planta fresca demais em decocção: destrói compostos termolábeis e deixa o preparo com gosto amargo inutilizável.',
  'Misturar mel fervendo com plantas ativas no xarope: o calor excessivo destrói enzimas do mel e parte dos princípios ativos da planta.',
  'Coar apenas uma vez: partículas residuais aceleram fermentação indesejada, principalmente em glicerites e xaropes.',
];

const RECEITAS = [
  {
    nome: 'Xarope de gengibre e mel',
    imagem: xaropeImg,
    ingredientes: '80g de gengibre fresco ralado, 300ml de água, 200ml de mel puro.',
    modo: 'Ferva o gengibre na água por 15 minutos em fogo baixo, com a panela semiaberta. Coe duas vezes em pano fino, deixe amornar até por volta de 40°C e misture o mel mexendo bem. Envase em vidro esterilizado e etiquete com a data.',
    dose: 'Adultos: 1 colher de sopa a cada 6 horas. Crianças acima de 2 anos: 1 colher de chá a cada 8 horas. Não usar em menores de 1 ano por causa do mel.',
    validade: '15 a 20 dias na geladeira.',
  },
  {
    nome: 'Tintura de própolis',
    imagem: propolisImg,
    ingredientes: '30g de própolis bruto em pedaços pequenos, 100ml de álcool de cereais 70-80 GL.',
    modo: 'Congele o própolis por 2 horas antes de picar, isso facilita quebrar a resina. Coloque no vidro âmbar, cubra com o álcool, feche e agite. Macere por 21 dias, agitando diariamente. Coe em pano fino apertando bem para extrair o máximo de resina.',
    dose: '15 a 20 gotas diluídas em água ou mel, até 3 vezes ao dia. Sempre diluída, nunca pura na boca, pois pode queimar a mucosa.',
    validade: '3 a 5 anos em vidro âmbar bem fechado, ao abrigo de luz.',
  },
  {
    nome: 'Óleo de calêndula',
    imagem: calenduaImg,
    ingredientes: '40g de flores de calêndula secas, 200ml de óleo de oliva ou girassol.',
    modo: 'Coloque as flores completamente secas em vidro limpo, cubra com o óleo garantindo que nenhuma parte fique exposta ao ar. Deixe em local ensolarado (dentro de casa, atrás do vidro de uma janela) por 3 semanas, agitando a cada 2 dias. Coe espremendo bem o resíduo vegetal.',
    dose: 'Uso tópico, aplicar 2 a 3 vezes ao dia sobre a pele limpa em pequenas fissuras, queimaduras leves e irritações.',
    validade: '6 a 12 meses guardado em local fresco e escuro.',
  },
  {
    nome: 'Glicerite para crianças',
    imagem: calenduaImg,
    ingredientes: '20g de planta seca suave (camomila, erva-cidreira ou hortelã), 75ml de glicerina vegetal, 25ml de água destilada.',
    modo: 'Misture a glicerina e a água, cubra a planta completamente no vidro, feche e macere por 14 dias, agitando diariamente. Coe em pano fino e envase em frasco conta-gotas esterilizado, etiquetando com o nome da planta e a data.',
    dose: 'Calcule por peso corporal: 1 gota por kg de peso, até 3 vezes ao dia, diluída em um pouco de água ou suco.',
    validade: '12 a 18 meses ao abrigo de luz.',
  },
];

const DOSE = [
  { faixa: 'Adulto (60 a 80kg)', gotas: '20 a 40 gotas por dose', obs: 'Referência padrão de fitoterapia para tinturas de concentração 1:5.' },
  { faixa: 'Adolescente (12 a 17 anos)', gotas: '10 a 20 gotas por dose', obs: 'Metade da dose adulta como ponto de partida seguro.' },
  { faixa: 'Criança (peso corporal)', gotas: '1 gota por kg de peso', obs: 'Fórmula mais confiável para crianças, sempre em glicerite, nunca em tintura alcoólica.' },
  { faixa: 'Idoso ou fígado sensível', gotas: '10 a 15 gotas por dose', obs: 'Reduzir dose e frequência, observando resposta por 3 dias antes de aumentar.' },
];

const FAQ = [
  {
    q: 'Qual a diferença real entre tintura, glicerite e óleo infundido?',
    a: 'A tintura usa álcool como solvente e extrai o espectro mais amplo de compostos, inclusive os que não se dissolvem em água. A glicerite usa glicerina vegetal no lugar do álcool, extrai um pouco menos de compostos mas é segura para crianças, gestantes e pessoas que evitam álcool. O óleo infundido usa gordura como solvente e serve principalmente para compostos lipossolúveis usados topicamente, não para ingestão em gotas.',
  },
  {
    q: 'Posso usar cachaça comum em vez de álcool de cereais para tintura?',
    a: 'Sim, para plantas que pedem graduação entre 40 e 50 GL, cachaça pura de boa qualidade funciona bem e é mais barata. Para resinas como própolis, que exigem 70 GL ou mais, é melhor usar álcool de cereais específico para uso alimentício, encontrado em farmácias e lojas de produtos naturais.',
  },
  {
    q: 'Como sei que minha tintura estragou?',
    a: 'Sinais de alerta: cheiro azedo ou de mofo, formação de película na superfície, mudança brusca de cor para tons esverdeados escuros ou turvos incomuns, e presença de bolhas de gás ao abrir o vidro. Qualquer um desses sinais indica descarte imediato do lote inteiro.',
  },
  {
    q: 'Por que preciso esterilizar os vidros antes de qualquer preparo?',
    a: 'Vidro sem esterilização carrega microrganismos residuais que fermentam o preparo, mesmo em soluções com álcool. Ferva os vidros e tampas por 10 minutos, seque de cabeça para baixo sobre pano limpo e só use quando estiverem completamente secos, sem gotas de água residual, especialmente para tinturas alcoólicas.',
  },
  {
    q: 'Dá para calcular dose por gota de forma confiável para qualquer planta?',
    a: 'A regra de 1 gota por kg de peso corporal é um ponto de partida seguro para a maioria das plantas suaves usadas em glicerite infantil, mas não serve como regra universal para todas as plantas. Plantas com margem terapêutica estreita, como as que interagem com medicamentos controlados, exigem orientação de fitoterapeuta ou médico antes de qualquer cálculo de dose.',
  },
  {
    q: 'Quanto tempo realmente dura uma tintura alcoólica bem feita?',
    a: 'Com graduação alcoólica correta, vidro âmbar bem vedado e armazenamento ao abrigo de luz e calor, uma tintura alcoólica dura de 2 a 5 anos sem perda relevante de potência. Já glicerites e óleos infundidos têm vida útil mais curta, entre 6 meses e 2 anos, porque os solventes usados oferecem menos proteção antimicrobiana que o álcool.',
  },
  {
    q: 'Posso fazer tintura com planta comprada em supermercado ou precisa ser planta colhida por mim?',
    a: 'Pode ser planta comprada, desde que seja de procedência confiável, sem agrotóxico e idealmente orgânica. O ponto crítico não é a origem, é a identificação correta da espécie e o estado de conservação da planta seca ou fresca no momento do preparo.',
  },
];

function Hero() {
  return (
    <section className="relative w-full" style={{ height: '92vh', minHeight: 720 }}>
      <img
        src={heroImg}
        alt="Frascos âmbar de tintura de plantas medicinais artesanal sobre mesa de madeira, preparo caseiro de fitoterápicos"
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
            'linear-gradient(180deg, rgba(14,59,58,0.55) 0%, rgba(14,59,58,0.35) 40%, rgba(14,59,58,0.9) 100%)',
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
            <FlaskConical size={11} className="inline mr-2" /> Soberania Orgânica · Preparos Caseiros
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1, delay: 0.15, ease: APPLE_EASE }}
          className="text-[clamp(2.75rem,8.5vw,7.5rem)] font-black leading-[0.95] tracking-tight max-w-[20ch]"
          style={{ fontFamily: "'Inter Tight', sans-serif", color: '#f4ede4' }}
        >
          Como fazer tintura de plantas em casa.{' '}
          <span
            style={{
              color: '#e8a36b',
              fontStyle: 'italic',
              fontWeight: 400,
              fontFamily: "'Playfair Display', serif",
              textShadow: '0 0 40px rgba(232,163,107,0.45), 0 0 80px rgba(232,163,107,0.25)',
            }}
          >
            Da planta ao frasco, com precisão.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: APPLE_EASE }}
          className="mt-8 max-w-2xl text-lg md:text-2xl leading-relaxed font-light"
          style={{ color: 'rgba(244,237,228,0.85)', fontFamily: "'Inter Tight', sans-serif" }}
        >
          Os seis métodos de extração caseira, proporção exata de planta seca e fresca, graduação alcoólica correta por tipo de planta, cálculo de dose por gota e por peso corporal, e as receitas passo a passo que realmente funcionam.
        </motion.p>
      </motion.div>
    </section>
  );
}

export default function TinturasXaroposPreparos() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <>
      <SeoHead
        path="/soberania-organica/tinturas-xaropes-preparos"
        custom={{
          title: 'Como Fazer Tintura de Plantas em Casa: Guia Completo 2026',
          description:
            'Guia prático dos 6 métodos de extração caseira: tintura alcoólica, glicerite, óleo infundido e xarope. Proporções exatas, graduação alcoólica, dose por gota e receitas passo a passo.',
          canonical: 'https://lordjunnior.com.br/soberania-organica/tinturas-xaropes-preparos',
          primaryKeyword: 'como fazer tintura de plantas em casa',
          lsiKeywords: [
            'tintura alcoólica caseira',
            'glicerite de plantas medicinais',
            'óleo infundido caseiro',
            'xarope de gengibre e mel',
            'tintura de própolis',
            'dose de tintura por gota',
            'esterilização de vidros para preparos',
          ],
          longTailKeywords: [
            'proporção de planta seca e fresca para tintura',
            'graduação alcoólica correta para cada planta',
            'como calcular dose de tintura por peso corporal',
            'quanto tempo dura tintura alcoólica caseira',
            'receita de glicerite para crianças',
          ],
          breadcrumbs: [
            { name: 'Início', url: '/' },
            { name: 'Soberania Orgânica', url: '/soberania-organica' },
            { name: 'Tinturas, Xaropes e Preparos', url: '/soberania-organica/tinturas-xaropes-preparos' },
          ],
          schemaType: 'HowTo',
          articleSection: 'Soberania Orgânica',
          relatedPages: [
            '/soberania-organica',
            '/soberania-organica/fitoterapia-aplicada',
            '/soberania-organica/propolis',
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

        {/* AVISO YMYL */}
        <section className="px-6 md:px-12 lg:px-20 pt-14">
          <div className="max-w-[1600px] mx-auto">
            <div
              className="flex gap-4 p-6 rounded-2xl items-start"
              style={{ backgroundColor: 'rgba(180,88,54,0.08)', border: '1px solid rgba(180,88,54,0.25)' }}
            >
              <ShieldAlert size={24} className="shrink-0 mt-1" style={{ color: '#b45836' }} />
              <p className="text-sm md:text-base leading-relaxed font-light" style={{ color: '#2d3a37' }}>
                Este conteúdo é educativo e não substitui avaliação médica ou orientação de fitoterapeuta habilitado. Plantas medicinais interagem com medicamentos, condições crônicas, gestação e amamentação. Antes de usar qualquer preparo de forma recorrente, principalmente em crianças, gestantes ou pessoas com doenças pré-existentes, procure orientação profissional individualizada.
              </p>
            </div>
          </div>
        </section>

        {/* CAPÍTULO 1 — Por que preparar em casa */}
        <section className="relative px-6 md:px-12 lg:px-20 py-24 md:py-36">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 max-w-[1600px] mx-auto">
            <motion.aside {...fade(0)} className="lg:col-span-4">
              <div className="sticky top-24">
                <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#b45836' }}>
                  Capítulo 01
                </span>
                <div className="h-[2px] w-16 mb-6" style={{ backgroundColor: '#b45836' }} />
                <p className="text-sm uppercase tracking-[0.2em] font-semibold" style={{ color: '#5a6664' }}>
                  Por que fazer você mesmo
                </p>
              </div>
            </motion.aside>
            <motion.div {...fade(0.1)} className="lg:col-span-8">
              <h2 className="text-[clamp(2.25rem,5.5vw,5rem)] font-black leading-[1] tracking-tight mb-10" style={{ color: '#0e3b3a' }}>
                Farmácia industrial vende dose.{' '}
                <span style={{ color: '#b45836', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>
                  Você pode dominar o processo inteiro.
                </span>
              </h2>
              <div className="space-y-7 text-lg md:text-xl leading-[1.7] font-light" style={{ color: '#2d3a37' }}>
                <p>
                  Fazer sua própria tintura, glicerite, óleo infundido ou xarope não é sobre economizar alguns reais no mercado. É sobre entender exatamente o que entra no seu corpo: qual planta, de qual origem, em qual concentração, extraída por qual método. Produto industrial embala padronização; preparo caseiro bem feito entrega controle.
                </p>
                <p>
                  O problema é que a maior parte do conteúdo disponível trata isso como arte mística, sem proporção, sem graduação alcoólica correta, sem tempo de maceração definido. Resultado: lotes fracos, lotes contaminados, dose no chute. Este guia trata o preparo caseiro como o que ele é, um processo técnico com margem de erro pequena e resultado replicável.
                </p>
                <blockquote
                  className="pl-8 py-2 my-10 text-2xl md:text-3xl leading-[1.4] font-light"
                  style={{ borderLeft: '3px solid #b45836', color: '#0e3b3a', fontFamily: "'Playfair Display', serif", fontStyle: 'italic' }}
                >
                  Planta certa, proporção certa, tempo certo. O resto é decoração de rótulo.
                </blockquote>
                <p>
                  Nos capítulos seguintes você vai encontrar os seis métodos de extração usados em fitoterapia caseira, a tabela de graduação alcoólica por tipo de planta, o cálculo de dose por gota e por peso corporal, quatro receitas completas passo a passo e os erros mais comuns que estragam um lote inteiro antes mesmo de você perceber.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* CAPÍTULO 2 — OS 6 MÉTODOS (faixa escura) */}
        <section className="relative py-24 md:py-32 px-6 md:px-12 lg:px-20" style={{ backgroundColor: '#0e3b3a', color: '#f4ede4' }}>
          <div className="max-w-[1600px] mx-auto">
            <motion.div {...fade(0)} className="mb-16 max-w-3xl">
              <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#e8a36b' }}>
                Capítulo 02 · Os seis métodos
              </span>
              <h2 className="text-[clamp(2.25rem,5.5vw,5rem)] font-black leading-[1] tracking-tight">
                Cada planta pede{' '}
                <span style={{ color: '#e8a36b', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>
                  um solvente diferente.
                </span>
              </h2>
              <p className="mt-6 text-lg md:text-xl font-light leading-[1.6]" style={{ color: 'rgba(244,237,228,0.75)' }}>
                Água, álcool, glicerina, óleo ou mel. Entender qual método extrai o que sua planta oferece é a diferença entre preparo eficaz e chá aguado.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {METODOS.map((m, i) => (
                <motion.div
                  key={m.n}
                  {...fade(i * 0.06)}
                  className="p-8 rounded-2xl transition-all duration-500"
                  style={{ backgroundColor: 'rgba(244,237,228,0.06)', border: '1px solid rgba(232,163,107,0.18)' }}
                >
                  <div className="flex items-center justify-between mb-6">
                    <div className="p-3 rounded-xl" style={{ backgroundColor: 'rgba(232,163,107,0.15)', border: '1px solid rgba(232,163,107,0.3)' }}>
                      <m.icon size={22} style={{ color: '#e8a36b' }} />
                    </div>
                    <span className="text-2xl font-black" style={{ color: '#e8a36b' }}>{m.n}</span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-black leading-tight mb-2" style={{ color: '#f4ede4' }}>{m.titulo}</h3>
                  <p className="text-sm uppercase tracking-wider font-bold mb-4" style={{ color: 'rgba(232,163,107,0.9)' }}>{m.resumo}</p>
                  <p className="text-base leading-relaxed font-light" style={{ color: 'rgba(244,237,228,0.82)' }}>{m.detalhe}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CAPÍTULO 3 — GRADUAÇÃO ALCOÓLICA + imagem própolis */}
        <section className="relative px-6 md:px-12 lg:px-20 py-24 md:py-36">
          <div className="max-w-[1600px] mx-auto grid lg:grid-cols-12 gap-12 items-center">
            <motion.div {...fade(0)} className="lg:col-span-6">
              <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#b45836' }}>
                Capítulo 03 · Graduação alcoólica
              </span>
              <h2 className="text-[clamp(2.25rem,5vw,4.5rem)] font-black leading-[1] tracking-tight mb-8" style={{ color: '#0e3b3a' }}>
                Álcool errado{' '}
                <span style={{ color: '#b45836', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>
                  extrai errado.
                </span>
              </h2>
              <p className="text-lg md:text-xl font-light leading-[1.7] mb-8" style={{ color: '#2d3a37' }}>
                Cada estrutura vegetal precisa de uma graduação diferente para liberar seus princípios ativos sem desperdício e sem contaminação.
              </p>
              <div className="space-y-3">
                {GRADUACAO.map((g) => (
                  <div key={g.tipo} className="p-5 rounded-xl" style={{ backgroundColor: '#ece2d3' }}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-base md:text-lg font-bold" style={{ color: '#0e3b3a' }}>{g.tipo}</span>
                      <span className="text-base md:text-lg font-black" style={{ color: '#b45836' }}>{g.gl}</span>
                    </div>
                    <p className="text-sm font-light" style={{ color: '#5a6664' }}>{g.obs}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div {...fade(0.1)} className="lg:col-span-6">
              <div className="relative h-[420px] md:h-[520px] lg:h-[620px] overflow-hidden rounded-3xl">
                <img
                  src={propolisImg}
                  alt="Colmeia e própolis bruto, matéria-prima usada em tintura alcoólica de própolis caseira"
                  loading="lazy"
                  width={1600}
                  height={1100}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* CAPÍTULO 4 — MACERAÇÃO, FILTRAGEM, ESTERILIZAÇÃO */}
        <section className="relative px-6 md:px-12 lg:px-20 py-24 md:py-36" style={{ backgroundColor: '#ece2d3' }}>
          <div className="max-w-[1600px] mx-auto">
            <motion.div {...fade(0)} className="mb-16 max-w-3xl">
              <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#b45836' }}>
                Capítulo 04 · Processo e higiene
              </span>
              <h2 className="text-[clamp(2.25rem,5.5vw,5rem)] font-black leading-[1] tracking-tight" style={{ color: '#0e3b3a' }}>
                O detalhe que decide{' '}
                <span style={{ color: '#b45836', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>
                  se o lote sobrevive.
                </span>
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: Timer, titulo: 'Tempo de maceração', texto: 'Tinturas alcoólicas: 21 a 30 dias. Glicerites: 14 a 21 dias. Óleos a frio: 14 a 28 dias. Óleos a quente (banho-maria): 2 a 3 horas. Agite o pote diariamente nos primeiros 10 dias para evitar sedimentação e mofo na superfície.' },
                { icon: Beaker, titulo: 'Filtragem', texto: 'Coe sempre em duas etapas: primeiro em peneira fina, depois em pano de algodão limpo ou filtro de papel, espremendo bem o resíduo vegetal para extrair o máximo de líquido ativo sem passar partículas sólidas.' },
                { icon: Tag, titulo: 'Rotulagem', texto: 'Toda etiqueta precisa ter: nome da planta e parte usada, método de extração, proporção usada, graduação alcoólica (se aplicável), data de fabricação e data de validade estimada. Sem isso, o preparo perde rastreabilidade.' },
                { icon: CheckCircle2, titulo: 'Esterilização de vidros', texto: 'Ferva vidros e tampas por 10 minutos em água limpa. Retire com pinça, nunca com a mão, e seque de cabeça para baixo sobre pano limpo até secagem total antes de qualquer envase.' },
              ].map((c, i) => (
                <motion.div key={c.titulo} {...fade(i * 0.06)} className="p-8 rounded-2xl" style={{ backgroundColor: '#ffffff', boxShadow: '0 1px 3px rgba(14,59,58,0.08)' }}>
                  <div className="inline-flex p-3 rounded-xl mb-5" style={{ backgroundColor: 'rgba(180,88,54,0.12)' }}>
                    <c.icon size={22} style={{ color: '#b45836' }} />
                  </div>
                  <h3 className="text-xl font-black mb-3" style={{ color: '#0e3b3a' }}>{c.titulo}</h3>
                  <p className="text-base leading-relaxed font-light" style={{ color: '#2d3a37' }}>{c.texto}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CAPÍTULO 5 — DOSE POR GOTA E PESO CORPORAL */}
        <section className="relative py-24 md:py-32 px-6 md:px-12 lg:px-20" style={{ backgroundColor: '#0e3b3a', color: '#f4ede4' }}>
          <div className="max-w-[1600px] mx-auto">
            <motion.div {...fade(0)} className="mb-14 max-w-3xl">
              <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#e8a36b' }}>
                Capítulo 05 · Dose real
              </span>
              <h2 className="text-[clamp(2.25rem,5.5vw,5rem)] font-black leading-[1] tracking-tight">
                Gota não é{' '}
                <span style={{ color: '#e8a36b', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>
                  medida universal.
                </span>
              </h2>
              <p className="mt-6 text-lg md:text-xl font-light leading-[1.6]" style={{ color: 'rgba(244,237,228,0.75)' }}>
                Dose de tintura depende de peso corporal, idade e concentração real do preparo. Use estas faixas como ponto de partida seguro, nunca como regra fixa para plantas de margem terapêutica estreita.
              </p>
            </motion.div>

            <div className="overflow-x-auto rounded-2xl" style={{ border: '1px solid rgba(232,163,107,0.2)' }}>
              <table className="w-full text-left" style={{ minWidth: 640 }}>
                <thead>
                  <tr style={{ backgroundColor: 'rgba(232,163,107,0.12)' }}>
                    <th className="p-5 text-sm uppercase tracking-wider font-bold" style={{ color: '#e8a36b' }}>Faixa</th>
                    <th className="p-5 text-sm uppercase tracking-wider font-bold" style={{ color: '#e8a36b' }}>Dose de referência</th>
                    <th className="p-5 text-sm uppercase tracking-wider font-bold" style={{ color: '#e8a36b' }}>Observação</th>
                  </tr>
                </thead>
                <tbody>
                  {DOSE.map((d, i) => (
                    <tr key={d.faixa} style={{ backgroundColor: i % 2 === 0 ? 'rgba(244,237,228,0.04)' : 'transparent' }}>
                      <td className="p-5 font-bold" style={{ color: '#f4ede4' }}>{d.faixa}</td>
                      <td className="p-5 font-light" style={{ color: 'rgba(244,237,228,0.9)' }}>{d.gotas}</td>
                      <td className="p-5 font-light text-sm" style={{ color: 'rgba(244,237,228,0.7)' }}>{d.obs}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* CAPÍTULO 6 — RECEITAS PASSO A PASSO */}
        <section className="relative px-6 md:px-12 lg:px-20 py-24 md:py-36">
          <div className="max-w-[1600px] mx-auto">
            <motion.div {...fade(0)} className="mb-16 max-w-3xl">
              <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#b45836' }}>
                Capítulo 06 · Receitas completas
              </span>
              <h2 className="text-[clamp(2.25rem,5.5vw,5rem)] font-black leading-[1] tracking-tight" style={{ color: '#0e3b3a' }}>
                Quatro preparos,{' '}
                <span style={{ color: '#b45836', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>
                  passo a passo real.
                </span>
              </h2>
            </motion.div>

            <div className="space-y-14">
              {RECEITAS.map((r, i) => (
                <motion.div key={r.nome} {...fade(i * 0.06)} className="grid lg:grid-cols-12 gap-8 items-center">
                  <div className={`lg:col-span-5 ${i % 2 === 1 ? 'lg:order-2' : ''}`}>
                    <div className="relative h-[300px] md:h-[380px] overflow-hidden rounded-3xl">
                      <img
                        src={r.imagem}
                        alt={`Preparo caseiro de ${r.nome}, receita fitoterápica passo a passo`}
                        loading="lazy"
                        width={1200}
                        height={900}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className={`lg:col-span-7 ${i % 2 === 1 ? 'lg:order-1' : ''}`}>
                    <h3 className="text-2xl md:text-3xl font-black mb-4" style={{ color: '#0e3b3a' }}>{r.nome}</h3>
                    <div className="space-y-4 text-base md:text-lg leading-relaxed font-light" style={{ color: '#2d3a37' }}>
                      <p><strong style={{ color: '#b45836' }}>Ingredientes: </strong>{r.ingredientes}</p>
                      <p><strong style={{ color: '#b45836' }}>Modo de preparo: </strong>{r.modo}</p>
                      <p><strong style={{ color: '#b45836' }}>Dose: </strong>{r.dose}</p>
                      <p><strong style={{ color: '#b45836' }}>Validade: </strong>{r.validade}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CAPÍTULO 7 — RENDIMENTO E CUSTO */}
        <section className="relative px-6 md:px-12 lg:px-20 py-24 md:py-36" style={{ backgroundColor: '#ece2d3' }}>
          <div className="max-w-[1600px] mx-auto">
            <motion.div {...fade(0)} className="mb-16 max-w-3xl">
              <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#b45836' }}>
                Capítulo 07 · Rendimento e custo
              </span>
              <h2 className="text-[clamp(2.25rem,5.5vw,5rem)] font-black leading-[1] tracking-tight" style={{ color: '#0e3b3a' }}>
                Quanto custa,{' '}
                <span style={{ color: '#b45836', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>
                  quanto rende.
                </span>
              </h2>
            </motion.div>

            <div className="overflow-x-auto rounded-2xl" style={{ backgroundColor: '#ffffff', boxShadow: '0 1px 3px rgba(14,59,58,0.08)' }}>
              <table className="w-full text-left" style={{ minWidth: 720 }}>
                <thead>
                  <tr style={{ backgroundColor: 'rgba(180,88,54,0.08)' }}>
                    <th className="p-5 text-sm uppercase tracking-wider font-bold" style={{ color: '#b45836' }}>Preparo</th>
                    <th className="p-5 text-sm uppercase tracking-wider font-bold" style={{ color: '#b45836' }}>Rendimento útil</th>
                    <th className="p-5 text-sm uppercase tracking-wider font-bold" style={{ color: '#b45836' }}>Custo estimado</th>
                    <th className="p-5 text-sm uppercase tracking-wider font-bold" style={{ color: '#b45836' }}>Doses aproximadas</th>
                  </tr>
                </thead>
                <tbody>
                  {RENDIMENTO.map((r, i) => (
                    <tr key={r.preparo} style={{ backgroundColor: i % 2 === 0 ? '#f4ede4' : 'transparent' }}>
                      <td className="p-5 font-bold" style={{ color: '#0e3b3a' }}>{r.preparo}</td>
                      <td className="p-5 font-light" style={{ color: '#2d3a37' }}>{r.rendimento}</td>
                      <td className="p-5 font-light" style={{ color: '#2d3a37' }}>{r.custo}</td>
                      <td className="p-5 font-light text-sm" style={{ color: '#5a6664' }}>{r.doses}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* CAPÍTULO 8 — ERROS QUE ESTRAGAM O LOTE */}
        <section className="relative py-24 md:py-32 px-6 md:px-12 lg:px-20" style={{ backgroundColor: '#0e3b3a', color: '#f4ede4' }}>
          <div className="max-w-[1400px] mx-auto">
            <motion.div {...fade(0)} className="mb-14 max-w-3xl">
              <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full" style={{ backgroundColor: 'rgba(232,163,107,0.12)', color: '#e8a36b' }}>
                <AlertTriangle size={14} />
                <span className="text-xs font-bold tracking-[0.3em] uppercase">Capítulo 08 · Erros que estragam o lote</span>
              </div>
              <h2 className="text-[clamp(2.25rem,5.5vw,5rem)] font-black leading-[1] tracking-tight">
                Sete erros que{' '}
                <span style={{ color: '#e8a36b', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>
                  jogam o preparo no lixo.
                </span>
              </h2>
            </motion.div>

            <div className="space-y-4">
              {ERROS.map((a, i) => (
                <motion.div key={i} {...fade(i * 0.05)} className="flex gap-6 p-6 md:p-8 rounded-2xl" style={{ backgroundColor: 'rgba(244,237,228,0.06)', border: '1px solid rgba(232,163,107,0.15)' }}>
                  <div className="shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-black" style={{ backgroundColor: 'rgba(232,163,107,0.2)', color: '#e8a36b' }}>
                    {i + 1}
                  </div>
                  <p className="text-base md:text-lg leading-relaxed font-light" style={{ color: 'rgba(244,237,228,0.92)' }}>{a}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CAPÍTULO 9 — FAQ */}
        <section className="relative px-6 md:px-12 lg:px-20 py-24 md:py-36">
          <div className="max-w-[1200px] mx-auto">
            <motion.div {...fade(0)} className="mb-14">
              <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#b45836' }}>
                Capítulo 09 · Perguntas que importam
              </span>
              <h2 className="text-[clamp(2.25rem,5vw,4.5rem)] font-black leading-[1] tracking-tight" style={{ color: '#0e3b3a' }}>
                Antes de macerar,{' '}
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
                    style={{ backgroundColor: '#f4ede4', boxShadow: open ? '0 8px 24px rgba(14,59,58,0.1)' : '0 1px 3px rgba(14,59,58,0.05)' }}
                  >
                    <button
                      onClick={() => setOpenFaq(open ? null : i)}
                      className="w-full flex items-center justify-between gap-6 p-6 md:p-8 text-left"
                    >
                      <span className="text-lg md:text-xl font-bold leading-snug" style={{ color: '#0e3b3a' }}>{f.q}</span>
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
                        <p className="text-base md:text-lg leading-relaxed font-light" style={{ color: '#2d3a37' }}>{f.a}</p>
                      </motion.div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CAPÍTULO 10 — Continue sua trilha */}
        <section className="relative py-24 md:py-32 px-6 md:px-12 lg:px-20" style={{ backgroundColor: '#0e3b3a', color: '#f4ede4' }}>
          <div className="max-w-[1400px] mx-auto">
            <motion.div {...fade(0)} className="mb-12 max-w-2xl">
              <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#e8a36b' }}>
                Continue sua trilha
              </span>
              <h2 className="text-[clamp(2rem,4.5vw,4rem)] font-black leading-[1] tracking-tight">
                Um frasco{' '}
                <span style={{ color: '#e8a36b', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>
                  não constrói uma farmácia caseira sozinho.
                </span>
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  to: '/soberania-organica/fitoterapia-aplicada',
                  titulo: 'Fitoterapia Aplicada',
                  texto: 'Protocolos por sistema do corpo, com plantas, ciclo de uso e critério de interrupção.',
                },
                {
                  to: '/soberania-organica/propolis',
                  titulo: 'Própolis: do enxame ao frasco',
                  texto: 'Como identificar, extrair e usar própolis bruto com segurança e potência real.',
                },
              ].map((c) => (
                <Link
                  key={c.to}
                  to={c.to}
                  className="group p-8 rounded-2xl transition-all hover:-translate-y-1"
                  style={{ backgroundColor: 'rgba(244,237,228,0.06)', border: '1px solid rgba(232,163,107,0.18)' }}
                >
                  <h3 className="text-xl md:text-2xl font-black leading-tight mb-3" style={{ color: '#f4ede4' }}>{c.titulo}</h3>
                  <p className="text-base leading-relaxed font-light mb-5" style={{ color: 'rgba(244,237,228,0.75)' }}>{c.texto}</p>
                  <span className="inline-flex items-center gap-2 text-sm font-bold tracking-wider uppercase transition-transform group-hover:translate-x-1" style={{ color: '#e8a36b' }}>
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
