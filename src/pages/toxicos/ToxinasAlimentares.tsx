import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Apple, AlertTriangle, Search, CheckCircle, ArrowRight, FlaskConical, ShieldAlert, Eye, Beaker, Skull, ShoppingCart, ChefHat, Microscope } from 'lucide-react';
import CinematicHero from '@/components/CinematicHero';
import BackToHome from '@/components/BackToHome';
import SmokeBackground from '@/components/toxicos/SmokeBackground';

import heroRotulo from '@/assets/toxinas-alimentares/hero-rotulo.webp';
import imgCorante from '@/assets/toxinas-alimentares/aditivo-corante.webp';
import imgAcucar from '@/assets/toxinas-alimentares/acucar-oculto.webp';
import imgAgrotoxicos from '@/assets/toxinas-alimentares/agrotoxicos.webp';
import imgUltraprocessados from '@/assets/toxinas-alimentares/ultraprocessados.webp';
import imgComidaReal from '@/assets/toxinas-alimentares/comida-real.webp';

const APPLE_EASE = [0.22, 1, 0.36, 1] as const;
const fadeUp = {
  hidden: { opacity: 0, y: 30, filter: 'blur(6px)' },
  visible: (i: number) => ({
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: 0.7, ease: APPLE_EASE, delay: i * 0.1 },
  }),
};

const ADITIVOS = [
  {
    nome: 'Glutamato Monossódico (MSG)',
    codigo: 'E621',
    risco: 'Excitotoxina que superestimula neurônios. Associada a dores de cabeça, alterações de apetite e resistência à leptina (hormônio da saciedade).',
    onde: 'Salgadinhos, temperos prontos, sopas instantâneas, molhos industriais, caldos em tablete.',
    sinais: ['Aumenta consumo em 40%', 'Mascara qualidade ruim', 'Dispara fome falsa em 90 minutos'],
    img: imgUltraprocessados,
  },
  {
    nome: 'Xarope de Milho de Alta Frutose (HFCS)',
    codigo: 'sem código',
    risco: 'Metabolizado diretamente pelo fígado, contribui para esteatose hepática (gordura no fígado), resistência insulínica e obesidade visceral.',
    onde: 'Refrigerantes, sucos industriais, pães, cereais matinais, barras de cereal, iogurtes saborizados.',
    sinais: ['Mais barato que açúcar', 'Não dispara saciedade', 'Vicia mais que cocaína em ratos (Princeton, 2010)'],
    img: imgAcucar,
  },
  {
    nome: 'Nitrito de Sódio',
    codigo: 'E250',
    risco: 'Forma nitrosaminas (cancerígenas) quando aquecido. Carnes processadas estão classificadas como Grupo 1 pela IARC/OMS, mesma categoria do tabaco.',
    onde: 'Presunto, salsicha, bacon, linguiça, mortadela, peito de peru defumado.',
    sinais: ['50g/dia aumenta câncer colorretal em 18%', 'Cor rosa artificial é o sinal', 'Mascara putrefação'],
    img: imgUltraprocessados,
  },
  {
    nome: 'Tartrazina (Amarelo nº5)',
    codigo: 'E102',
    risco: 'Corante azoico associado a hiperatividade infantil, reações alérgicas e urticária. Restrito ou proibido em vários países europeus.',
    onde: 'Gelatinas, balas, refrigerantes amarelos, macarrão instantâneo, biscoitos recheados.',
    sinais: ['Cor amarela vibrante artificial', 'Comum em alimentos infantis', 'Estudo Southampton 2007 confirmou efeito comportamental'],
    img: imgCorante,
  },
  {
    nome: 'BHT e BHA',
    codigo: 'E320 / E321',
    risco: 'Antioxidantes sintéticos com potencial carcinogênico demonstrado em estudos animais. Disruptores endócrinos suspeitos.',
    onde: 'Cereais matinais, batatas chips, óleos vegetais, margarinas, gomas de mascar.',
    sinais: ['Estabiliza gorduras industriais', 'Acumula em tecido adiposo', 'Atravessa placenta'],
    img: imgUltraprocessados,
  },
  {
    nome: 'Aspartame',
    codigo: 'E951',
    risco: 'Classificado como possivelmente cancerígeno (Grupo 2B) pela IARC em 2023. Metabolizado em formaldeído e ácido aspártico no organismo.',
    onde: 'Refrigerantes diet, adoçantes de mesa, iogurtes light, chicletes sem açúcar, gelatinas zero.',
    sinais: ['200x mais doce que açúcar', 'Engana o pâncreas', 'Mantém dependência ao paladar doce'],
    img: imgAcucar,
  },
  {
    nome: 'Glifosato (resíduo)',
    codigo: 'agrotóxico',
    risco: 'Herbicida sistêmico classificado como provável cancerígeno (Grupo 2A) pela IARC. Encontrado em 70% das amostras de cereais brasileiros pela ANVISA.',
    onde: 'Soja, milho, trigo, aveia convencional. Persiste no grão mesmo após processamento.',
    sinais: ['Brasil é maior consumidor global', 'Limite legal brasileiro é 200x maior que o europeu', 'Detectado em leite materno'],
    img: imgAgrotoxicos,
  },
];

const NOMES_DO_ACUCAR = [
  'Sacarose', 'Dextrose', 'Maltose', 'Frutose', 'Lactose', 'Galactose',
  'Xarope de milho', 'Xarope de glicose', 'Xarope de malte', 'Xarope de agave',
  'Maltodextrina', 'Dextrina', 'Açúcar invertido', 'Açúcar mascavo',
  'Melaço', 'Mel de milho', 'Suco de cana evaporado', 'Caldo de cana',
  'Concentrado de frutas', 'Sólidos de glicose', 'Néctar', 'Demerara',
];

const ESTRATEGIAS = [
  {
    titulo: 'Leia a lista de ingredientes, ignore a embalagem',
    desc: 'A frente da embalagem é marketing pago. A lista de ingredientes é o documento legal real. Se o primeiro ingrediente listado é açúcar, farinha refinada ou óleo vegetal, o produto é basicamente isso disfarçado.',
    icon: Search,
  },
  {
    titulo: 'Regra dos 5 ingredientes',
    desc: 'Se um produto tem mais de 5 ingredientes que você não reconheceria como comida na natureza, ele foi engenheirado para vício palatável, não para nutrição. Quanto mais curta a lista, mais real o alimento.',
    icon: CheckCircle,
  },
  {
    titulo: 'Evite o corredor central do supermercado',
    desc: 'Os ultraprocessados ocupam as prateleiras centrais. Os alimentos reais ficam nas laterais: hortifruti, açougue, peixaria, padaria artesanal. Sua rota de compra define sua dieta.',
    icon: ShoppingCart,
  },
  {
    titulo: 'Substitua de forma progressiva',
    desc: 'Não tente mudar tudo de uma vez. Substitua um ultraprocessado por semana por uma versão caseira ou in natura. Consistência por 12 meses vence radicalismo de 30 dias.',
    icon: ChefHat,
  },
  {
    titulo: 'Cozinhe mais, compre menos pronto',
    desc: 'Cada refeição caseira é uma decisão de soberania alimentar. Você controla sal, gordura, açúcar e a qualidade real dos ingredientes. Não existe rótulo melhor que o que você mesmo escreveria.',
    icon: ChefHat,
  },
  {
    titulo: 'Priorize orgânicos nos itens críticos',
    desc: 'Lista suja da EWG (morango, espinafre, couve, uva, maçã) concentra resíduos de pesticidas. Para esses, vale o investimento em orgânico certificado. Para casca grossa (banana, abacate, abacaxi) o convencional é aceitável.',
    icon: ShieldAlert,
  },
];

const FAQ_ITEMS = [
  {
    q: 'Ultraprocessados são realmente perigosos para a saúde?',
    a: 'Estudos epidemiológicos como o NOVA da USP e o NutriNet-Santé da França demonstram correlação clara entre consumo de ultraprocessados e aumento de obesidade, diabetes tipo 2, doenças cardiovasculares e certos tipos de câncer. O risco não está em um ingrediente isolado, mas na combinação de aditivos, baixa densidade nutricional e design hiperpalatável que sequestra os centros de recompensa do cérebro.',
  },
  {
    q: 'Alimentos orgânicos fazem diferença real no organismo?',
    a: 'Sim, com nuances importantes. Orgânicos certificados possuem limites significativamente mais baixos de resíduos de pesticidas e proibição de transgênicos. A diferença em micronutrientes é modesta (5 a 15% maior em alguns minerais), mas a redução na exposição a agroquímicos é substancial, especialmente para crianças, gestantes e pessoas em tratamento de doenças crônicas.',
  },
  {
    q: 'Qual é a diferença prática entre aditivo e contaminante?',
    a: 'Aditivo é adicionado intencionalmente pela indústria (corantes, conservantes, emulsificantes, aromatizantes). Contaminante é acidental ou ambiental (resíduos de pesticidas, metais pesados como chumbo e arsênio, microplásticos, micotoxinas). Ambos exigem atenção, mas a estratégia de evitação é diferente: aditivos você controla escolhendo o que compra, contaminantes você reduz priorizando alimentos in natura e fontes confiáveis.',
  },
  {
    q: 'Adoçantes artificiais são alternativa segura ao açúcar?',
    a: 'Não exatamente. O aspartame foi reclassificado como possivelmente cancerígeno pela IARC em 2023. Sucralose altera a microbiota intestinal de acordo com estudos publicados na Nature. Stevia natural é a opção menos arriscada, mas o ideal é educar o paladar para tolerar menos doce, em vez de substituir um vício por outro.',
  },
  {
    q: 'É possível comer fora de casa sem consumir aditivos?',
    a: 'Difícil zerar, mas possível reduzir drasticamente. Restaurantes que mencionam ingredientes frescos, comida de raiz, padarias artesanais e mercados de produtor são caminhos seguros. Evite redes industriais de fast food, lanchonetes com cardápio padronizado nacional e qualquer estabelecimento que use molhos industrializados em garrafa.',
  },
];

export default function ToxinasAlimentares() {
  const { scrollYProgress } = useScroll();
  const progressWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": FAQ_ITEMS.map(item => ({
      "@type": "Question",
      "name": item.q,
      "acceptedAnswer": { "@type": "Answer", "text": item.a },
    })),
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    "headline": "Toxinas Alimentares: Aditivos Ocultos, Ultraprocessados e Pesticidas",
    "description": "Investigação completa sobre aditivos industriais, ultraprocessados, açúcar disfarçado e resíduos de pesticidas no Brasil. Aprenda a ler rótulos e retomar controle sobre sua dieta.",
    "author": { "@type": "Person", "name": "Lord Junnior", "url": "https://lordjunnior.com.br" },
    "datePublished": "2026-04-20",
    "image": "https://lordjunnior.com.br/assets/toxinas-alimentares/hero-rotulo.jpg",
    "publisher": { "@type": "Organization", "name": "Lord Junnior", "url": "https://lordjunnior.com.br" },
    "mainEntityOfPage": "https://lordjunnior.com.br/soberania-organica/toxicos-ocultos/toxinas-alimentares",
  };

  return (
    <div className="min-h-screen text-stone-100 font-sans selection:bg-amber-400/30 relative overflow-hidden text-[17px] md:text-[18px] lg:text-[19px] leading-relaxed [&_p]:leading-[1.75]" style={{ background: '#050808' }}>
      <SmokeBackground />

      <div className="relative z-20 px-6 md:px-12 lg:px-20 pt-[52px]">
        <BackToHome />
      </div>

      <Helmet>
        <title>Toxinas Alimentares: Aditivos, Ultraprocessados e Pesticidas | Lord Junnior</title>
        <meta name="description" content="Guia completo sobre aditivos industriais, ultraprocessados, açúcar oculto e resíduos de pesticidas no Brasil. Aprenda a ler rótulos, identificar 22 nomes do açúcar e retomar controle real sobre sua dieta." />
        <meta name="keywords" content="aditivos alimentares, ultraprocessados, glifosato, aspartame, MSG, nitrito de sódio, açúcar oculto, ler rótulos, soberania alimentar, agrotóxicos Brasil" />
        <meta property="og:title" content="Toxinas Alimentares: O Que a Indústria Esconde no Seu Prato" />
        <meta property="og:description" content="500 aditivos por ano sem você saber. 22 nomes para açúcar. 4,7 kg de agrotóxicos por brasileiro. Investigue o que entra na sua dieta todos os dias." />
        <meta property="og:image" content="https://lordjunnior.com.br/assets/toxinas-alimentares/hero-rotulo.jpg" />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Toxinas Alimentares: O Que a Indústria Esconde" />
        <meta name="twitter:description" content="Investigação completa sobre aditivos, ultraprocessados, açúcar disfarçado e pesticidas." />
        <link rel="canonical" href="https://lordjunnior.com.br/soberania-organica/toxicos-ocultos/toxinas-alimentares" />
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
      </Helmet>

      <motion.div className="fixed top-0 left-0 right-0 h-[2px] z-50 origin-left"
        style={{ width: progressWidth, background: 'linear-gradient(90deg, #f59e0b, #ef4444)' }} />

      <CinematicHero
        image={heroRotulo}
        phase="Vetor 01 · Corpo"
        title="Toxinas Alimentares"
        subtitle="O que a indústria alimentar adiciona silenciosamente à sua dieta. Aditivos, ultraprocessados, açúcar disfarçado e resíduos de pesticidas que entram no seu corpo sem aviso, sem rótulo de alerta, sem permissão consciente."
        icon={Apple}
        accentColor="amber"
        backLink="/soberania-organica/toxicos-ocultos"
        backLabel="Tóxicos Ocultos"
      />

      {/* ═══ CAPÍTULO 01: A DIETA QUE VOCÊ NÃO ESCOLHEU ═══ */}
      <section className="relative z-10 py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="mb-16 max-w-4xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-[2px] bg-amber-500 rounded-full" />
              <span className="text-amber-400 text-[10px] font-bold tracking-[0.5em] uppercase">Capítulo 01 · O Diagnóstico</span>
            </div>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tight text-white mb-6 leading-[1.05]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              A DIETA QUE VOCÊ <span className="text-amber-400">NÃO ESCOLHEU</span>
            </h2>
            <p className="text-stone-300 text-base md:text-lg leading-relaxed max-w-3xl mb-4">
              O brasileiro médio consome mais de 500 aditivos alimentares por ano sem saber. A indústria projeta alimentos para vício palatável, não para nutrição.
            </p>
            <p className="text-stone-400 text-base md:text-lg leading-relaxed max-w-3xl">
              Cada ingrediente listado em código alfanumérico (E621, E102, E320, E951) esconde uma substância que seu corpo precisa metabolizar, muitas vezes sem conseguir. O que entra no seu prato hoje foi engenheirado em laboratórios de pesquisa sensorial, não em cozinhas.
            </p>
          </motion.div>

          {/* Stats grid full-width orgânico */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {[
              { value: '500+', label: 'Aditivos alimentares autorizados pela ANVISA no Brasil', color: 'amber' },
              { value: '70%', label: 'Das calorias do brasileiro vêm de produtos ultraprocessados', color: 'red' },
              { value: '4,7 kg', label: 'Média de agrotóxicos consumidos por brasileiro a cada ano', color: 'orange' },
              { value: '22', label: 'Nomes diferentes para açúcar mascarados nos rótulos', color: 'amber' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}
                whileHover={{ y: -6 }}
                className="group relative overflow-hidden rounded-2xl border border-amber-500/10 bg-gradient-to-br from-amber-500/[0.03] to-transparent p-6 md:p-8 hover:border-amber-500/30 hover:shadow-[0_20px_60px_-15px_rgba(245,158,11,0.3)] transition-all duration-500 cursor-default"
                style={{ minHeight: i % 2 === 0 ? '180px' : '200px' }}
              >
                <div className="absolute top-0 left-0 right-0 h-[2px] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-700 bg-gradient-to-r from-amber-500 to-transparent" />
                <p className="text-4xl md:text-5xl font-black text-amber-400 mb-3 tabular-nums" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{stat.value}</p>
                <p className="text-stone-400 text-xs md:text-sm leading-relaxed group-hover:text-stone-200 transition-colors">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CAPÍTULO 02: DOSSIÊ DE ADITIVOS ═══ */}
      <section className="relative z-10 py-20 md:py-32 border-t border-white/[0.04]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="mb-16 max-w-4xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-[2px] bg-amber-500 rounded-full" />
              <span className="text-amber-400 text-[10px] font-bold tracking-[0.5em] uppercase">Capítulo 02 · Os Suspeitos</span>
            </div>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tight text-white mb-6 leading-[1.05]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              DOSSIÊ DE <span className="text-amber-400">ADITIVOS CRÍTICOS</span>
            </h2>
            <p className="text-stone-400 text-base leading-relaxed">
              Cada ficha abaixo documenta um aditivo com alto impacto na saúde metabólica e neurológica. Não são todos os aditivos existentes, são os que aparecem com maior frequência na dieta brasileira e possuem evidência científica robusta de risco. Estude um por vez, identifique nos rótulos da sua casa e remova de forma progressiva.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {ADITIVOS.map((aditivo, i) => (
              <motion.article
                key={aditivo.nome}
                initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }} variants={fadeUp} custom={i % 2}
                whileHover={{ y: -4 }}
                className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] hover:border-amber-500/30 transition-all duration-500"
              >
                <div className="absolute top-0 left-0 right-0 h-[3px] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-700 bg-gradient-to-r from-amber-500 via-red-500 to-transparent z-10" />

                {/* Imagem topo */}
                <div className="relative h-48 md:h-56 overflow-hidden">
                  <img src={aditivo.img} alt={`Representação visual de ${aditivo.nome}`} loading="lazy" width={1280} height={896}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050808] via-[#050808]/40 to-transparent" />
                  <div className="absolute top-4 right-4 px-3 py-1.5 rounded-lg bg-black/70 backdrop-blur-sm border border-amber-500/30">
                    <span className="text-[10px] font-mono font-bold text-amber-400 tracking-wider">{aditivo.codigo}</span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-xl md:text-2xl font-black text-white tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                      {aditivo.nome}
                    </h3>
                  </div>
                </div>

                {/* Conteúdo */}
                <div className="p-6 md:p-8">
                  <div className="flex items-start gap-3 mb-5">
                    <AlertTriangle size={18} className="text-amber-400 mt-0.5 shrink-0" />
                    <p className="text-stone-300 text-sm md:text-base leading-relaxed">{aditivo.risco}</p>
                  </div>

                  <div className="space-y-2.5 mb-5 pl-6">
                    {aditivo.sinais.map((sinal, j) => (
                      <div key={j} className="flex items-start gap-2.5">
                        <div className="w-1 h-1 rounded-full bg-amber-500 mt-2 shrink-0" />
                        <p className="text-stone-500 text-sm leading-relaxed">{sinal}</p>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-start gap-2.5 pt-5 border-t border-white/[0.05]">
                    <Search size={14} className="text-amber-400/60 mt-0.5 shrink-0" />
                    <p className="text-stone-500 text-xs md:text-sm leading-relaxed">
                      <strong className="text-stone-400 font-semibold">Onde encontrar:</strong> {aditivo.onde}
                    </p>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CAPÍTULO 03: OS 22 NOMES DO AÇÚCAR ═══ */}
      <section className="relative z-10 py-20 md:py-32 border-t border-white/[0.04]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="lg:col-span-5">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-[2px] bg-amber-500 rounded-full" />
                <span className="text-amber-400 text-[10px] font-bold tracking-[0.5em] uppercase">Capítulo 03 · O Disfarce</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white mb-6 leading-[1.05]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                OS <span className="text-amber-400">22 NOMES</span> DO AÇÚCAR
              </h2>
              <p className="text-stone-400 text-base leading-relaxed mb-6">
                A indústria fragmenta o açúcar em múltiplos ingredientes para que ele não apareça em primeiro lugar na lista. Se aparecesse junto, seria o primeiro item de quase todo produto industrializado.
              </p>
              <p className="text-stone-500 text-sm leading-relaxed mb-8">
                Memorize esta lista. Cada nome abaixo é uma forma de açúcar adicionado. Quando você vê três deles em um único rótulo, está olhando para um produto que é basicamente açúcar com sabor.
              </p>

              <div className="relative rounded-2xl overflow-hidden border border-amber-500/20">
                <img src={imgAcucar} alt="Pilhas de açúcar refinado ao lado de produtos industrializados" loading="lazy" width={1280} height={896}
                  className="w-full h-64 md:h-80 object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050808] via-transparent to-transparent" />
              </div>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={1} className="lg:col-span-7">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {NOMES_DO_ACUCAR.map((nome, i) => (
                  <motion.div
                    key={nome}
                    whileHover={{ y: -4, scale: 1.03 }}
                    className="group relative overflow-hidden rounded-xl border border-amber-500/[0.08] bg-amber-500/[0.02] hover:bg-amber-500/[0.08] hover:border-amber-500/30 px-4 py-3.5 transition-all duration-300 cursor-default"
                  >
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{ background: 'radial-gradient(circle at top right, rgba(245,158,11,0.15), transparent 70%)' }} />
                    <p className="relative text-stone-300 text-xs md:text-sm font-semibold group-hover:text-amber-300 transition-colors">{nome}</p>
                    <p className="relative text-stone-600 text-[9px] tabular-nums mt-0.5">#{String(i + 1).padStart(2, '0')}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══ CAPÍTULO 04: PROTOCOLO DE DESCONTAMINAÇÃO ═══ */}
      <section className="relative z-10 py-20 md:py-32 border-t border-white/[0.04]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="mb-16 max-w-4xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-[2px] bg-amber-500 rounded-full" />
              <span className="text-amber-400 text-[10px] font-bold tracking-[0.5em] uppercase">Capítulo 04 · A Prática</span>
            </div>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tight text-white mb-6 leading-[1.05]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              PROTOCOLO DE <span className="text-amber-400">DESCONTAMINAÇÃO</span>
            </h2>
            <p className="text-stone-400 text-base leading-relaxed">
              Ação prática e progressiva. Cada passo abaixo reduz uma camada de dependência industrial sem exigir mudanças radicais. O objetivo não é perfeição, é redução consistente da exposição ao longo de meses.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {ESTRATEGIAS.map((est, i) => (
              <motion.div
                key={est.titulo}
                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}
                whileHover={{ y: -6 }}
                className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.05] hover:border-amber-500/30 hover:shadow-[0_20px_50px_-15px_rgba(245,158,11,0.25)] p-7 md:p-8 transition-all duration-500"
                style={{ minHeight: i % 3 === 1 ? '320px' : '280px' }}
              >
                <div className="absolute top-0 left-0 right-0 h-[2px] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-700 bg-gradient-to-r from-amber-500 to-transparent" />
                <div className="flex items-center gap-3 mb-5">
                  <span className="text-2xl font-black text-stone-700 tabular-nums" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>0{i + 1}</span>
                  <div className="p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/20 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                    <est.icon size={18} className="text-amber-400" />
                  </div>
                </div>
                <h3 className="text-base md:text-lg font-bold text-stone-200 mb-3 group-hover:text-white transition-colors">{est.titulo}</h3>
                <p className="text-stone-500 text-sm leading-relaxed group-hover:text-stone-400 transition-colors">{est.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CAPÍTULO 05: COMIDA REAL ═══ */}
      <section className="relative z-10 py-20 md:py-32 border-t border-white/[0.04]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-[2px] bg-emerald-500 rounded-full" />
                <span className="text-emerald-400 text-[10px] font-bold tracking-[0.5em] uppercase">Capítulo 05 · A Saída</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white mb-6 leading-[1.05]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                COMIDA REAL <span className="text-emerald-400">EXISTE</span>
              </h2>
              <p className="text-stone-300 text-base md:text-lg leading-relaxed mb-5">
                Comida real é tudo aquilo que sua avó reconheceria como alimento. Vegetais, frutas, raízes, ovos, carnes não processadas, peixes, castanhas, sementes e grãos integrais minimamente preparados.
              </p>
              <p className="text-stone-400 text-base leading-relaxed mb-5">
                Comida real estraga em poucos dias. Comida industrializada dura meses. Essa diferença é a maior pista do quanto algo foi quimicamente alterado para sobreviver no varejo.
              </p>
              <p className="text-stone-500 text-base leading-relaxed">
                A volta para comida real não é nostalgia, é estratégia metabólica. O corpo humano evoluiu por 300 mil anos comendo o que vinha da terra e levou 70 anos de indústria alimentar para começar a falhar de forma sistêmica.
              </p>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={1} className="relative">
              <div className="relative rounded-3xl overflow-hidden border border-emerald-500/20">
                <img src={imgComidaReal} alt="Vegetais frescos e ervas orgânicas sobre madeira rústica" loading="lazy" width={1280} height={896}
                  className="w-full h-[400px] md:h-[500px] object-cover" />
                <div className="absolute inset-0 bg-gradient-to-tr from-[#050808]/50 via-transparent to-transparent" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══ FAQ ═══ */}
      <section className="relative z-10 py-20 md:py-32 border-t border-white/[0.04]">
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-[2px] bg-amber-500 rounded-full" />
              <span className="text-amber-400 text-[10px] font-bold tracking-[0.5em] uppercase">Perguntas Frequentes</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white leading-[1.05]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              DÚVIDAS QUE <span className="text-amber-400">DEFINEM ESCOLHAS</span>
            </h2>
          </motion.div>

          <div className="space-y-4">
            {FAQ_ITEMS.map((item, i) => (
              <motion.div
                key={item.q}
                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}
                whileHover={{ x: 4 }}
                className="group p-7 md:p-8 rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] hover:border-amber-500/20 transition-all duration-500"
              >
                <h3 className="text-base md:text-lg font-bold text-stone-100 mb-4 group-hover:text-amber-300 transition-colors">{item.q}</h3>
                <p className="text-stone-400 text-sm md:text-base leading-relaxed">{item.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA: PRÓXIMO VETOR ═══ */}
      <section className="relative z-10 py-20 border-t border-white/[0.04]">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
            <p className="text-stone-700 text-xs font-medium uppercase tracking-[0.4em] mb-8">Próximo vetor de investigação</p>
            <h3 className="text-2xl md:text-4xl font-black tracking-tight text-stone-200 mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Você protegeu o corpo.
            </h3>
            <p className="text-2xl md:text-4xl font-black tracking-tight text-violet-400 mb-10" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Agora proteja a mente.
            </p>
            <Link to="/soberania-organica/toxicos-ocultos/manipulacao-informacional"
              className="inline-flex items-center gap-3 bg-violet-500 text-white px-10 py-5 font-bold text-sm tracking-wide rounded-xl hover:bg-violet-400 hover:shadow-2xl hover:shadow-violet-500/30 hover:scale-[1.03] hover:-translate-y-1 transition-all duration-500 group"
            >
              <Microscope size={18} className="group-hover:rotate-12 transition-transform duration-500" />
              Manipulação Informacional
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-8 border-t border-white/[0.04] text-right">
        <p className="text-stone-700 font-medium text-base tracking-tight italic">Quem lê o rótulo, não é refém da prateleira.</p>
      </div>
    </div>
  );
}
