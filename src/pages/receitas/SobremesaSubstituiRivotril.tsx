import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  ArrowRight, ChevronDown, Clock, Users, BookOpen, Beaker,
  Brain, Leaf, Sparkles, AlertTriangle, CheckCircle2,
  ScrollText, Activity, ExternalLink, ChefHat, Compass,
} from 'lucide-react';
import BackNav from '@/components/BackNav';
import ScrollToTop from '@/components/ScrollToTop';

import imgHero from '@/assets/receitas/hero-sobremesa-light.jpg';
import imgGlicina from '@/assets/receitas/ativo-glicina-gelatina.jpg';
import imgPassiflora from '@/assets/receitas/ativo-passiflora-maracuja.jpg';
import imgCamomila from '@/assets/receitas/ativo-camomila-cha.jpg';
import imgChia from '@/assets/receitas/ativo-chia-hidratada.jpg';

/**
 * /soberania-organica/cozinha-funcional/sobremesa-substitui-rivotril
 * Padrão editorial CLARO obrigatório (cream + sage + terracotta).
 */

const APPLE_EASE = [0.22, 1, 0.36, 1] as const;
const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.8, ease: APPLE_EASE, delay },
});

const C = {
  cream: '#faf6f0',
  sand: '#f1e9dd',
  sandDeep: '#e8dcc8',
  sage: '#3d4a36',
  sageDark: '#2a3324',
  terracotta: '#c4632a',
  terraSoft: '#e09a6a',
  ink: '#1c2418',
  inkSoft: '#3d4a36',
  borderLight: '#dccfb6',
};

const display = { fontFamily: "'Inter Tight', sans-serif", fontWeight: 900 as const, letterSpacing: '-0.04em', lineHeight: 0.95 };
const editorial = { fontFamily: "'Playfair Display', serif", fontStyle: 'italic' as const, fontWeight: 400 as const };
const monoStyle = { fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.3em', textTransform: 'uppercase' as const };

const INGREDIENTES = [
  { qtd: '40 g', nome: 'Gelatina sem sabor', detalhe: '3 a 4 sachês de 12 g, entrega cerca de 2 a 2,5 g de glicina por porção' },
  { qtd: '80 ml', nome: 'Chá de camomila forte', detalhe: '2 sachês ou 2 colheres de sopa de camomila seca em 100 ml de água quente, infusão de 5 a 10 min' },
  { qtd: '300 ml', nome: 'Polpa de maracujá natural', detalhe: 'Sem açúcar adicionado, ou suco concentrado coado' },
  { qtd: '3 c.s.', nome: 'Sementes de chia', detalhe: 'Cerca de 30 a 40 g totais, hidratadas em 300 ml de leite vegetal sem açúcar' },
  { qtd: 'opcional', nome: 'Mel cru ou adoçante natural', detalhe: 'Apenas 1 a 2 colheres de chá: evite excesso para não atrapalhar glicemia' },
  { qtd: 'opcional', nome: 'Polpa fresca para decorar', detalhe: 'Meio maracujá extra, pitada de canela e raspas de limão siciliano' },
];

const PREPARO = [
  { n: '01', titulo: 'Prepare o chá forte', desc: 'Ferva água, adicione a camomila, deixe infusionar de 5 a 10 minutos e coe. Use 80 ml ainda quente.' },
  { n: '02', titulo: 'Dissolva a gelatina', desc: 'Coloque os 40 g de gelatina sem sabor no chá quente. Mexa vigorosamente até dissolver completamente. Não ferva depois de dissolvida.' },
  { n: '03', titulo: 'Adicione o maracujá', desc: 'Misture os 300 ml de polpa de maracujá na gelatina dissolvida. Mexa bem, prove e ajuste a doçura se quiser.' },
  { n: '04', titulo: 'Hidrate a chia', desc: 'Enquanto a gelatina esfria, misture as 3 colheres de sopa de chia em 300 ml de leite vegetal. Deixe repousar de 15 a 20 min até formar gel.' },
  { n: '05', titulo: 'Monte os potes', desc: 'Divida a gelatina em 4 potinhos. Cubra com camada generosa de chia hidratada. Decore com polpa fresca de maracujá.' },
  { n: '06', titulo: 'Refrigere', desc: 'Leve à geladeira por pelo menos 2 a 4 horas, ou overnight, até firmar completamente.' },
];

const ATIVOS = [
  {
    n: '01', img: imgGlicina, nome: 'Glicina', fonte: 'da gelatina sem sabor', icon: Brain,
    alt: 'Folhas de gelatina hidratadas em prato branco com colher de madeira sobre toalha de linho cor creme',
    dose: 'Cerca de 2,5 g por porção',
    doseEstudada: '3 g antes de dormir',
    mecanismo: 'Reduz a temperatura corporal central via ação no núcleo supraquiasmático (SCN), o relógio biológico que governa o sono. Diminui a latência (tempo até dormir) e melhora a eficiência do sono.',
    estudoAncora: 'Yamadera et al. (2007), Sleep Biological Rhythms',
    achado: '3 g de glicina antes de dormir reduziu latência do sono e aumentou performance cognitiva no dia seguinte, medido por polissonografia.',
  },
  {
    n: '02', img: imgPassiflora, nome: 'Passiflora', fonte: 'do maracujá (300 ml de polpa)', icon: Leaf,
    alt: 'Maracujás frescos cortados ao meio mostrando as sementes amarelas brilhantes sobre tábua de madeira clara',
    dose: '300 ml de polpa',
    doseEstudada: 'Extrato padronizado',
    mecanismo: 'Os flavonoides (vitexina, isovitexina, crisina) modulam receptores GABA-A, o mesmo alvo dos benzodiazepínicos como o Rivotril, mas sem a sedação forte nem dependência.',
    estudoAncora: 'Harit et al. (2024), Cureus 16:e56530',
    achado: 'Ensaio randomizado duplo-cego placebo-controlado: redução significativa no escore de estresse percebido e melhora na arquitetura do sono. Reduziu marcadores de cortisol.',
  },
  {
    n: '03', img: imgCamomila, nome: 'Camomila', fonte: 'no chá forte (80 ml)', icon: Sparkles,
    alt: 'Flores frescas de camomila ao redor de uma xícara branca de chá quente com vapor sobre mesa de madeira clara',
    dose: '2 sachês concentrados',
    doseEstudada: '270 a 1500 mg por dia',
    mecanismo: 'A apigenina liga-se a receptores benzodiazepínicos com afinidade moderada, gerando efeito ansiolítico sem hipnose pesada. Reduz o número de despertares noturnos.',
    estudoAncora: 'Kazemi et al. (2024), Complementary Therapies in Medicine',
    achado: 'Meta-análise de 10 estudos (772 participantes): redução de 1,88 pontos no PSQI (Pittsburgh Sleep Quality Index). Nenhum evento adverso relatado.',
  },
  {
    n: '04', img: imgChia, nome: 'Chia hidratada', fonte: 'no leite vegetal', icon: Activity,
    alt: 'Sementes de chia hidratadas em leite vegetal dentro de pote de vidro com colher sobre toalha de linho clara',
    dose: 'Cerca de 7 a 10 g por porção',
    doseEstudada: 'Mecanismo bem documentado',
    mecanismo: 'Fibra solúvel mais proteína forma gel no estômago, aumenta saciedade e reduz craving noturno por doce. Ômega-3 (ALA) estabiliza glicemia. Mata a "fome psicológica" das 22h.',
    estudoAncora: 'Khalid et al. (2022), PMC9834868',
    achado: 'Revisão sistemática: chia aumenta saciedade subjetiva, reduz ingestão calórica subsequente e melhora marcadores glicêmicos.',
  },
];

const FONTES = [
  { autor: 'Harit, M. K. et al.', ano: '2024', titulo: 'Effect of Passiflora incarnata on Stress and Sleep Quality', revista: 'Cureus 16:e56530', tipo: 'Ensaio clínico randomizado', link: 'https://pubmed.ncbi.nlm.nih.gov/?term=Harit+Passiflora+2024' },
  { autor: 'Janda, K. et al.', ano: '2020', titulo: 'Passiflora incarnata in Neuropsychiatric Disorders', revista: 'PMC7766837', tipo: 'Revisão sistemática (9 estudos)', link: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC7766837/' },
  { autor: 'Ngan, A.; Conduit, R.', ano: '2011', titulo: 'A double-blind placebo-controlled investigation of the effects of Passiflora incarnata herbal tea on subjective sleep quality', revista: 'Phytotherapy Research', tipo: 'Estudo duplo-cego com polissonografia', link: 'https://pubmed.ncbi.nlm.nih.gov/21294203/' },
  { autor: 'Kazemi, A. et al.', ano: '2024', titulo: 'Effect of chamomile on sleep quality: meta-analysis', revista: 'Complementary Therapies in Medicine', tipo: 'Meta-análise (10 estudos, 772 participantes)', link: 'https://pubmed.ncbi.nlm.nih.gov/?term=Kazemi+chamomile+sleep+meta-analysis' },
  { autor: 'Hieu, T. H. et al.', ano: '2019', titulo: 'Therapeutic efficacy and safety of chamomile for state anxiety', revista: 'Phytotherapy Research', tipo: 'Meta-análise', link: 'https://pubmed.ncbi.nlm.nih.gov/31161669/' },
  { autor: 'Yamadera, W. et al.', ano: '2007', titulo: 'Glycine ingestion improves subjective sleep quality', revista: 'Sleep and Biological Rhythms', tipo: 'Estudo com polissonografia', link: 'https://onlinelibrary.wiley.com/doi/10.1111/j.1479-8425.2007.00262.x' },
  { autor: 'Bannai, M.; Kawai, N.', ano: '2012', titulo: 'New Therapeutic Strategy for Amino Acid Medicine: Glycine Improves the Quality of Sleep', revista: 'Journal of Pharmacological Sciences', tipo: 'Revisão de mecanismo', link: 'https://pubmed.ncbi.nlm.nih.gov/22293292/' },
  { autor: 'Khalid, W. et al.', ano: '2022', titulo: 'Chia Seeds (Salvia hispanica L.): A Comprehensive Review of Nutritional Composition and Health Effects', revista: 'PMC9834868', tipo: 'Revisão sistemática', link: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC9834868/' },
];

const FAQ = [
  { q: 'Substitui mesmo o Rivotril?',
    a: 'Não no sentido clínico. O título é editorial: chama atenção para o fato de que Passiflora e camomila atuam no mesmo receptor (GABA-A) que os benzodiazepínicos, com efeito mais leve, sem dependência e sem tarja preta. Para insônia crônica diagnosticada ou ansiedade clínica, mantenha o tratamento médico. Esta receita é uma intervenção nutricional para apoiar higiene do sono em pessoas saudáveis.' },
  { q: 'Em quanto tempo se sente efeito?',
    a: 'A maioria dos estudos mostra benefício mensurável entre 7 e 14 dias de uso consistente. Coma de 30 a 60 minutos antes de dormir, todas as noites. Resultado de uma noite isolada é variável: o que importa é o protocolo repetido.' },
  { q: 'Comer 30 a 60 minutos antes de dormir não eleva a glicemia e prejudica o GH?',
    a: 'Pergunta legítima e importante. A resposta curta: este protocolo não foi desenhado para gerar pico glicêmico relevante. A porção tem 80 a 120 kcal, 8 a 10 g de fibra solúvel da chia, 8 a 10 g de proteína (glicina) e nenhum açúcar de adição (mantenha sem mel ou com no máximo 1 colher de chá). Fibra solúvel forma gel no estômago, retarda esvaziamento gástrico e achata a curva glicêmica. A resposta hormonal noturna não depende exclusivamente da glicemia: o pico fisiológico de GH ocorre durante o sono profundo de ondas lentas (estágio N3), e o que mais sabota o GH é sono fragmentado, álcool, cortisol elevado e refeições grandes ricas em carboidrato refinado, não 100 kcal de fibra mais proteína. Indivíduos com resistência à insulina, diabetes ou jejum intermitente terapêutico podem antecipar a porção (2 a 3 horas antes de dormir) ou usar só o chá de Passiflora e camomila. Veja o bloco "Observação metabólica" acima para os ajustes.' },
  { q: 'Posso comer no lugar do jantar?',
    a: 'Sim, é uma das estratégias do protocolo. Cada porção tem cerca de 80 a 120 kcal, 8 a 10 g de proteína (glicina) e 8 a 10 g de fibra (chia), saciante o bastante para substituir um jantar pesado, especialmente para reduzir a ingestão calórica noturna ou trocar o lanche doce das 22h.' },
  { q: 'Por quanto tempo posso tomar?',
    a: 'Não há limite documentado para os 4 ingredientes na dose proposta. A camomila e a Passiflora têm perfil de segurança excelente em uso prolongado. A glicina é um aminoácido produzido pelo próprio corpo. A chia é alimento. O risco está em adicionar açúcar: mantenha sem.' },
  { q: 'Quem não deve consumir?',
    a: 'Gestantes (Passiflora não tem segurança bem estabelecida na gravidez), pessoas em uso de benzodiazepínicos ou indutores de sono prescritos (efeito aditivo), alérgicos a Asteraceae (família da camomila, que inclui margarida e crisântemo). Em dúvida, fale com seu médico antes.' },
  { q: 'Por que não cura insônia crônica?',
    a: 'Porque insônia crônica raramente é falta de calmante: costuma ser higiene do sono ruim, exposição a tela com luz azul até tarde, cortisol desregulado por estresse contínuo, apneia, depressão ou desequilíbrio hormonal. Esta receita ataca uma camada (a química do GABA e da glicina). As outras camadas exigem mudança de comportamento e, às vezes, avaliação médica.' },
];

const TRILHA = [
  { to: '/soberania-organica/cozinha-funcional', titulo: 'Hub Cozinha Funcional', desc: 'Volte à coleção completa de receitas com base científica que substituem soluções leves da farmácia.', label: 'Ver coleção' },
  { to: '/soberania-organica/saude-preventiva', titulo: 'Saúde Preventiva', desc: 'Os pilares fisiológicos por trás do sono: cortisol, melatonina, glicemia, microbiota, ritmo circadiano.', label: 'Estudar fisiologia' },
  { to: '/soberania-organica/fitoterapia-aplicada', titulo: 'Fitoterapia Aplicada', desc: 'Aprofunde o uso clínico de plantas: Passiflora, camomila, melissa, valeriana e seus protocolos seguros.', label: 'Aprofundar' },
];

function Hero() {
  const { scrollY } = useScroll();
  const yBg = useTransform(scrollY, [0, 800], [0, 200]);
  const opacityContent = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    <section className="relative h-[92vh] min-h-[640px] w-full overflow-hidden" style={{ backgroundColor: C.sage }}>
      <motion.div className="absolute inset-0" style={{ y: yBg }}>
        <img src={imgHero}
          alt="Quatro potinhos de sobremesa funcional com camadas de gelatina de maracujá e chia hidratada decorados com flores de camomila e folhas de melissa sobre toalha de linho cor creme"
          fetchPriority="high" className="w-full h-full object-cover scale-110"
          style={{ filter: 'saturate(1.05) contrast(1.02)' }} loading="eager" fetchPriority="high" decoding="async" />
        <div className="absolute inset-0" style={{
          background: `linear-gradient(180deg, rgba(28,38,24,0.35) 0%, rgba(28,38,24,0.45) 45%, rgba(28,38,24,0.78) 78%, rgba(20,28,18,0.92) 100%)`,
        }} />
        <div className="absolute inset-x-0 bottom-0 h-2 pointer-events-none" style={{ background: C.cream }} />
      </motion.div>

      <motion.div className="relative z-10 h-full flex flex-col justify-end px-6 md:px-12 lg:px-20 pb-20 md:pb-28" style={{ opacity: opacityContent }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: APPLE_EASE }} className="mb-6">
          <Link to="/soberania-organica/cozinha-funcional" className="text-xs font-bold transition-opacity hover:opacity-80"
            style={{ ...monoStyle, color: 'rgba(250,246,240,0.85)' }}>
            Soberania Orgânica › Cozinha Funcional
          </Link>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: APPLE_EASE }}
          className="inline-flex items-center gap-3 mb-6 self-start px-4 py-2 rounded-full backdrop-blur-md"
          style={{ backgroundColor: 'rgba(250,246,240,0.18)', border: '1px solid rgba(250,246,240,0.28)' }}>
          <Beaker size={14} style={{ color: C.cream }} />
          <span className="text-[11px] md:text-xs font-bold" style={{ ...monoStyle, color: C.cream }}>
            Protocolo · 8 estudos primários
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1, delay: 0.15, ease: APPLE_EASE }}
          className="text-[clamp(2.75rem,8.5vw,7.5rem)] max-w-[16ch]"
          style={{ ...display, color: C.cream, textShadow: '0 2px 24px rgba(0,0,0,0.55)' }}>
          A sobremesa que{' '}
          <span style={{ ...editorial, color: C.terraSoft, textShadow: '0 2px 28px rgba(0,0,0,0.6)' }}>
            substitui o Rivotril.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: APPLE_EASE }}
          className="mt-8 max-w-2xl text-lg md:text-2xl leading-relaxed font-light"
          style={{ color: 'rgba(250,246,240,0.95)', fontFamily: "'Inter Tight', sans-serif", textShadow: '0 1px 12px rgba(0,0,0,0.55)' }}>
          Quatro ativos. Mesmo receptor cerebral dos benzodiazepínicos. Sem tarja preta, sem dependência, sem ressaca matinal. Coma de 30 a 60 minutos antes de dormir.
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.7, ease: APPLE_EASE }}
          className="mt-10 flex flex-wrap gap-x-8 gap-y-3">
          <span className="flex items-center gap-2 text-xs font-bold" style={{ ...monoStyle, color: 'rgba(250,246,240,0.85)' }}>
            <Clock size={14} style={{ color: C.terraSoft }} /> 15 min preparo
          </span>
          <span className="flex items-center gap-2 text-xs font-bold" style={{ ...monoStyle, color: 'rgba(250,246,240,0.85)' }}>
            <Users size={14} style={{ color: C.terraSoft }} /> 4 porções
          </span>
          <span className="flex items-center gap-2 text-xs font-bold" style={{ ...monoStyle, color: 'rgba(250,246,240,0.85)' }}>
            <BookOpen size={14} style={{ color: C.terraSoft }} /> 8 ensaios clínicos
          </span>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default function SobremesaSubstituiRivotril() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <>
      <Helmet>
        <title>A Sobremesa que Substitui o Rivotril: Receita com 8 Estudos</title>
        <meta name="description" content="Receita funcional com 4 ativos clínicos: glicina, Passiflora, camomila e chia. Mesmo receptor GABA-A do Rivotril, sem tarja preta. 8 estudos PubMed." />
        <link rel="canonical" href="https://www.lordjunnior.com.br/soberania-organica/cozinha-funcional/sobremesa-substitui-rivotril" />
        <meta property="og:title" content="A Sobremesa que Substitui o Rivotril" />
        <meta property="og:description" content="Glicina, Passiflora, camomila e chia. Quatro ativos. Oito ensaios clínicos. Uma receita." />
        <meta property="og:image" content="https://www.lordjunnior.com.br/og/sobremesa-rivotril.jpg" />
        <meta property="og:type" content="article" />
        <meta property="og:locale" content="pt_BR" />
        <html lang="pt-BR" />
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Recipe',
            name: 'A Sobremesa que Substitui o Rivotril',
            author: { '@type': 'Person', name: 'Lord Junnior' },
            description: 'Sobremesa funcional com glicina, Passiflora, camomila e chia para apoiar o sono e reduzir cortisol noturno.',
            recipeYield: '4 porções',
            prepTime: 'PT15M', cookTime: 'PT0M', totalTime: 'PT4H15M',
            recipeCategory: 'Sobremesa funcional',
            recipeCuisine: 'Funcional brasileira',
            keywords: 'sono, cortisol, ansiedade, glicina, Passiflora, camomila, chia, receita funcional',
            recipeIngredient: INGREDIENTES.map((i) => `${i.qtd} ${i.nome}`),
            recipeInstructions: PREPARO.map((p) => ({ '@type': 'HowToStep', name: p.titulo, text: p.desc })),
            nutrition: {
              '@type': 'NutritionInformation',
              calories: '80-120 kcal por porção',
              proteinContent: '8-10 g',
              fiberContent: '8-10 g',
            },
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: FAQ.map((f) => ({
              '@type': 'Question', name: f.q,
              acceptedAnswer: { '@type': 'Answer', text: f.a },
            })),
          })}
        </script>
      </Helmet>

      <div className="relative min-h-screen" style={{ backgroundColor: C.cream, color: C.ink, fontFamily: "'Inter Tight', sans-serif" }}>
        <div className="absolute top-0 left-0 right-0 z-30 px-6 md:px-12 lg:px-20 pt-[52px]">
          <BackNav backTo="/soberania-organica/cozinha-funcional" backLabel="Cozinha Funcional" />
        </div>
        <ScrollToTop />

        <Hero />

        {/* CAPÍTULO 1, Manifesto */}
        <section className="relative px-6 md:px-12 lg:px-20 py-24 md:py-36">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 max-w-[1600px] mx-auto">
            <motion.aside {...fade(0)} className="lg:col-span-4">
              <div className="sticky top-24">
                <span className="text-xs font-bold block mb-4" style={{ ...monoStyle, color: C.terracotta }}>Capítulo 01</span>
                <div className="h-[2px] w-16 mb-6" style={{ backgroundColor: C.terracotta }} />
                <p className="text-sm font-semibold" style={{ ...monoStyle, color: C.inkSoft }}>Por que esse título</p>
              </div>
            </motion.aside>
            <motion.div {...fade(0.1)} className="lg:col-span-8">
              <h2 className="text-[clamp(2.25rem,5.5vw,5rem)] leading-[1] tracking-tight mb-10" style={{ ...display, color: C.sage }}>
                Não é metáfora.{' '}
                <span style={{ ...editorial, color: C.terracotta }}>É bioquímica.</span>
              </h2>
              <div className="space-y-7 text-lg md:text-xl leading-[1.7] font-light" style={{ color: C.inkSoft }}>
                <p>
                  Rivotril (clonazepam) age no <strong style={{ color: C.sage }}>receptor GABA-A</strong>, o freio do sistema nervoso central. Quando você ativa esse receptor, o cérebro desacelera: cai a ansiedade, vem o sono.
                </p>
                <p>
                  <strong style={{ color: C.terracotta }}>Passiflora e camomila se ligam no mesmo receptor.</strong> Com afinidade menor, é verdade, por isso não viciam, não derrubam, não causam ressaca. Mas no contexto certo (dose, horário, contínuo por 7 a 14 dias), produzem o suficiente para apoiar o sono em quem não tem insônia clínica.
                </p>
                <p>
                  Some isso à <strong style={{ color: C.sage }}>glicina</strong> da gelatina (3 g antes de dormir reduz latência via SCN), à <strong style={{ color: C.sage }}>chia</strong> que mata o craving doce das 22h, e você tem um protocolo nutricional simples que ataca quatro alavancas do sono ruim ao mesmo tempo.
                </p>
                <blockquote className="pl-8 py-2 my-10 text-2xl md:text-3xl leading-[1.4] font-light"
                  style={{ borderLeft: `3px solid ${C.terracotta}`, color: C.sage, ...editorial }}>
                  Para a maioria das pessoas saudáveis que dorme mal por estresse e hábito, comida bem montada resolve o que tarja preta apenas mascara.
                </blockquote>
              </div>
            </motion.div>
          </div>
        </section>

        {/* CAPÍTULO 2, RECEITA (sand bg) */}
        <section id="receita" className="relative py-24 md:py-32 px-6 md:px-12 lg:px-20 scroll-mt-20" style={{ backgroundColor: C.sand }}>
          <div className="max-w-[1600px] mx-auto">
            <motion.div {...fade(0)} className="mb-16 md:mb-20">
              <span className="text-xs font-bold block mb-4" style={{ ...monoStyle, color: C.terracotta }}>Capítulo 02 · A receita</span>
              <h2 className="text-[clamp(2.25rem,5.5vw,5rem)] leading-[1] tracking-tight" style={{ ...display, color: C.sage }}>
                Como{' '}
                <span style={{ ...editorial, color: C.terracotta }}>fazer.</span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
              {/* INGREDIENTES */}
              <motion.div {...fade(0)} className="lg:col-span-5">
                <div className="sticky top-8 rounded-3xl p-8 md:p-10" style={{ backgroundColor: C.cream, border: `1px solid ${C.borderLight}` }}>
                  <h3 className="text-2xl mb-2" style={{ ...editorial, color: C.terracotta }}>
                    Ingredientes
                  </h3>
                  <p className="text-sm mb-8" style={{ color: C.inkSoft }}>4 porções de cerca de 150 ml</p>
                  <ul className="space-y-6">
                    {INGREDIENTES.map((ing, i) => (
                      <li key={i} className="flex gap-5 pb-6" style={{ borderBottom: i < INGREDIENTES.length - 1 ? `1px solid ${C.borderLight}` : 'none' }}>
                        <span className="font-bold text-sm whitespace-nowrap min-w-[80px]" style={{ ...monoStyle, color: C.terracotta }}>
                          {ing.qtd}
                        </span>
                        <div>
                          <p className="font-semibold mb-1" style={{ color: C.sage }}>{ing.nome}</p>
                          <p className="text-sm leading-relaxed font-light" style={{ color: C.inkSoft }}>{ing.detalhe}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>

              {/* PREPARO */}
              <motion.div {...fade(0.1)} className="lg:col-span-7">
                <h3 className="text-2xl mb-2" style={{ ...editorial, color: C.terracotta }}>
                  Modo de preparo
                </h3>
                <p className="text-sm mb-10" style={{ color: C.inkSoft }}>15 min mais geladeira</p>

                <ol className="space-y-8">
                  {PREPARO.map((p) => (
                    <li key={p.n} className="flex gap-6">
                      <span className="text-5xl md:text-6xl font-black tabular-nums shrink-0" style={{ ...display, color: C.terraSoft }}>
                        {p.n}
                      </span>
                      <div className="pt-2">
                        <h4 className="text-xl mb-2 font-semibold" style={{ color: C.sage }}>{p.titulo}</h4>
                        <p className="leading-relaxed font-light" style={{ color: C.inkSoft }}>{p.desc}</p>
                      </div>
                    </li>
                  ))}
                </ol>

                <div className="mt-12 p-6 md:p-8 rounded-2xl" style={{ backgroundColor: '#fff8ef', border: `1px solid ${C.borderLight}` }}>
                  <p className="text-xs font-bold mb-3" style={{ ...monoStyle, color: C.terracotta }}>
                    Nutrição por porção
                  </p>
                  <p className="leading-relaxed font-light text-lg" style={{ color: C.inkSoft }}>
                    80 a 120 kcal · 8 a 10 g de proteína · 8 a 10 g de fibra · ômega-3 (ALA) · vitamina C · cerca de 2,5 g de glicina bioativa
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CAPÍTULO 3, DOSSIÊ DOS 4 ATIVOS (sage escuro) */}
        <section className="relative py-24 md:py-36 px-6 md:px-12 lg:px-20" style={{ backgroundColor: C.sage, color: C.cream }}>
          <div className="max-w-[1600px] mx-auto">
            <motion.div {...fade(0)} className="mb-20 max-w-3xl">
              <span className="text-xs font-bold block mb-4" style={{ ...monoStyle, color: C.terraSoft }}>Capítulo 03 · Por que funciona</span>
              <h2 className="text-[clamp(2.25rem,5.5vw,5rem)] leading-[1] tracking-tight" style={display}>
                Os quatro{' '}
                <span style={{ ...editorial, color: C.terraSoft }}>ativos.</span>
              </h2>
              <p className="mt-6 text-lg md:text-xl font-light leading-[1.6]" style={{ color: 'rgba(250,246,240,0.78)' }}>
                Cada ingrediente foi escolhido por evidência clínica, não por estética nem viralidade.
              </p>
            </motion.div>

            <div className="space-y-16 md:space-y-24">
              {ATIVOS.map((a, i) => {
                const reversed = i % 2 === 1;
                return (
                  <motion.article key={a.n} {...fade(0)} className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                    <div className={`lg:col-span-6 ${reversed ? 'lg:order-2' : ''}`}>
                      <div className="relative h-[360px] md:h-[480px] lg:h-[560px] overflow-hidden rounded-3xl group">
                        <img src={a.img} alt={a.alt} loading="lazy" width={1280} height={960}
                          className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105" />
                        <div className="absolute top-6 left-6 px-4 py-2 rounded-full text-xs font-bold backdrop-blur-md"
                          style={{ ...monoStyle, backgroundColor: 'rgba(250,246,240,0.85)', color: C.sage }}>
                          <a.icon size={11} className="inline mr-2" /> Ativo {a.n}
                        </div>
                      </div>
                    </div>
                    <div className={`lg:col-span-6 ${reversed ? 'lg:order-1' : ''}`}>
                      <p className="text-xs font-bold mb-4" style={{ ...monoStyle, color: C.terraSoft }}>
                        {a.fonte}
                      </p>
                      <h3 className="text-4xl md:text-6xl mb-8" style={{ ...display, color: C.cream }}>
                        {a.nome}
                      </h3>

                      <div className="grid grid-cols-2 gap-4 mb-8">
                        <div className="p-5 rounded-xl" style={{ backgroundColor: 'rgba(250,246,240,0.06)', border: '1px solid rgba(250,246,240,0.12)' }}>
                          <p className="text-[10px] font-bold mb-2" style={{ ...monoStyle, color: 'rgba(250,246,240,0.6)' }}>Dose na receita</p>
                          <p className="font-semibold" style={{ color: C.terraSoft }}>{a.dose}</p>
                        </div>
                        <div className="p-5 rounded-xl" style={{ backgroundColor: 'rgba(250,246,240,0.06)', border: '1px solid rgba(250,246,240,0.12)' }}>
                          <p className="text-[10px] font-bold mb-2" style={{ ...monoStyle, color: 'rgba(250,246,240,0.6)' }}>Dose estudada</p>
                          <p className="font-semibold" style={{ color: C.cream }}>{a.doseEstudada}</p>
                        </div>
                      </div>

                      <p className="text-base md:text-lg leading-relaxed mb-8 font-light" style={{ color: 'rgba(250,246,240,0.85)' }}>
                        {a.mecanismo}
                      </p>

                      <div className="p-6 rounded-xl" style={{ backgroundColor: 'rgba(224,154,106,0.1)', borderLeft: `3px solid ${C.terraSoft}` }}>
                        <p className="text-[10px] font-bold mb-3" style={{ ...monoStyle, color: C.terraSoft }}>
                          Estudo-âncora
                        </p>
                        <p className="font-semibold mb-3" style={{ color: C.cream }}>{a.estudoAncora}</p>
                        <p className="text-sm leading-relaxed font-light" style={{ color: 'rgba(250,246,240,0.78)' }}>{a.achado}</p>
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </section>

        {/* CAPÍTULO 4, PROTOCOLO DE USO */}
        <section className="relative py-24 md:py-36 px-6 md:px-12 lg:px-20">
          <div className="max-w-[1400px] mx-auto">
            <motion.div {...fade(0)} className="mb-16 max-w-3xl">
              <span className="text-xs font-bold block mb-4" style={{ ...monoStyle, color: C.terracotta }}>Capítulo 04 · Como tomar</span>
              <h2 className="text-[clamp(2.25rem,5.5vw,5rem)] leading-[1] tracking-tight" style={{ ...display, color: C.sage }}>
                O{' '}
                <span style={{ ...editorial, color: C.terracotta }}>protocolo.</span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              <motion.div {...fade(0)} className="p-8 md:p-10 rounded-3xl"
                style={{ backgroundColor: '#fff8ef', border: `1px solid ${C.borderLight}` }}>
                <CheckCircle2 size={32} style={{ color: C.terracotta }} className="mb-6" />
                <h3 className="text-2xl md:text-3xl mb-6 font-semibold" style={{ ...display, color: C.sage }}>O que fazer</h3>
                <ul className="space-y-4 text-lg leading-relaxed font-light" style={{ color: C.inkSoft }}>
                  <li className="flex gap-3"><span style={{ color: C.terracotta }}>·</span> Comer 1 porção de 30 a 60 min antes de dormir</li>
                  <li className="flex gap-3"><span style={{ color: C.terracotta }}>·</span> Substituir o jantar pesado ou o lanche doce noturno</li>
                  <li className="flex gap-3"><span style={{ color: C.terracotta }}>·</span> Manter por 7 a 14 dias consecutivos antes de avaliar</li>
                  <li className="flex gap-3"><span style={{ color: C.terracotta }}>·</span> Reduzir telas e luz azul nas 2h anteriores</li>
                  <li className="flex gap-3"><span style={{ color: C.terracotta }}>·</span> Anotar variação de qualidade do sono e disposição diurna</li>
                </ul>
              </motion.div>

              <motion.div {...fade(0.1)} className="p-8 md:p-10 rounded-3xl"
                style={{ backgroundColor: C.sand, border: `1px solid ${C.borderLight}` }}>
                <AlertTriangle size={32} style={{ color: '#a64a1f' }} className="mb-6" />
                <h3 className="text-2xl md:text-3xl mb-6 font-semibold" style={{ ...display, color: C.sage }}>O que não esperar</h3>
                <ul className="space-y-4 text-lg leading-relaxed font-light" style={{ color: C.inkSoft }}>
                  <li className="flex gap-3"><span style={{ color: '#a64a1f' }}>·</span> Cura de insônia crônica diagnosticada</li>
                  <li className="flex gap-3"><span style={{ color: '#a64a1f' }}>·</span> Substituir benzodiazepínico prescrito sem orientação médica</li>
                  <li className="flex gap-3"><span style={{ color: '#a64a1f' }}>·</span> Resultado em uma única noite, o protocolo é cumulativo</li>
                  <li className="flex gap-3"><span style={{ color: '#a64a1f' }}>·</span> Compensar exposição a tela até 1h antes de dormir</li>
                  <li className="flex gap-3"><span style={{ color: '#a64a1f' }}>·</span> Solução para apneia, depressão ou desequilíbrio hormonal</li>
                </ul>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CAPÍTULO 5, BIBLIOTECA DE FONTES (sand) */}
        <section className="relative py-24 md:py-36 px-6 md:px-12 lg:px-20" style={{ backgroundColor: C.sand }}>
          <div className="max-w-[1600px] mx-auto">
            <motion.div {...fade(0)} className="mb-16 max-w-3xl">
              <span className="text-xs font-bold block mb-4" style={{ ...monoStyle, color: C.terracotta }}>Capítulo 05 · Biblioteca de evidências</span>
              <h2 className="text-[clamp(2.25rem,5.5vw,5rem)] leading-[1] tracking-tight" style={{ ...display, color: C.sage }}>
                As{' '}
                <span style={{ ...editorial, color: C.terracotta }}>fontes.</span>
              </h2>
              <p className="mt-6 text-lg md:text-xl font-light leading-[1.6]" style={{ color: C.inkSoft }}>
                Oito estudos primários, todos publicados em revistas indexadas no PubMed. Sem opinião de influenciador, sem marketing de e-book.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {FONTES.map((f, i) => (
                <motion.a key={i} {...fade(i * 0.05)} href={f.link} target="_blank" rel="noopener noreferrer"
                  className="group p-7 md:p-8 rounded-2xl transition-all duration-500 hover:-translate-y-1 hover:shadow-xl"
                  style={{ backgroundColor: C.cream, border: `1px solid ${C.borderLight}` }}>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <ScrollText size={16} style={{ color: C.terracotta }} />
                      <span className="text-xs font-bold" style={{ ...monoStyle, color: C.terracotta }}>{f.ano}</span>
                    </div>
                    <ExternalLink size={14} style={{ color: C.inkSoft }} className="transition-colors group-hover:translate-x-0.5" />
                  </div>
                  <p className="font-semibold text-lg mb-3 leading-snug" style={{ color: C.sage }}>{f.titulo}</p>
                  <p className="text-sm mb-3" style={{ color: C.inkSoft }}>{f.autor}</p>
                  <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs">
                    <span style={{ ...editorial, color: C.sage }}>{f.revista}</span>
                    <span className="font-bold" style={{ ...monoStyle, color: C.terracotta }}>{f.tipo}</span>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="relative py-24 md:py-36 px-6 md:px-12 lg:px-20">
          <div className="max-w-[1100px] mx-auto">
            {/* OBSERVAÇÃO METABÓLICA, resposta a dúvida sobre glicemia e GH */}
            <motion.div {...fade(0)} className="mb-20 p-8 md:p-12 rounded-3xl"
              style={{ backgroundColor: '#fff8ef', border: `1px solid ${C.terraSoft}` }}>
              <div className="flex items-center gap-3 mb-5">
                <Activity size={20} style={{ color: C.terracotta }} />
                <span className="text-xs font-bold" style={{ ...monoStyle, color: C.terracotta }}>
                  Observação metabólica
                </span>
              </div>
              <h3 className="text-3xl md:text-5xl mb-8 leading-[1.05]" style={{ ...display, color: C.sage }}>
                Glicemia, GH{' '}
                <span style={{ ...editorial, color: C.terracotta }}>e janela noturna.</span>
              </h3>
              <div className="space-y-5 text-lg md:text-xl leading-[1.7] font-light" style={{ color: C.inkSoft }}>
                <p>
                  Este protocolo não tem como objetivo gerar resposta glicêmica elevada. A combinação de
                  fibra solúvel da chia (8 a 10 g por porção), proteína da gelatina (cerca de 2,5 g de glicina bioativa)
                  e ausência de açúcar de adição mantém a curva glicêmica achatada, mesmo consumida 30 a 60 minutos
                  antes de dormir.
                </p>
                <p>
                  A resposta hormonal noturna, incluindo o pico de hormônio do crescimento (GH), depende
                  principalmente da arquitetura do sono profundo (estágio N3), do controle do cortisol e da ausência
                  de álcool, não exclusivamente da glicemia. A literatura indexada no PubMed listada acima
                  documenta o efeito da glicina, da Passiflora e da camomila sobre latência e qualidade do sono,
                  variáveis que sustentam justamente esse pico fisiológico de GH.
                </p>
                <p>
                  Ainda assim, indivíduos com sensibilidade metabólica, resistência à insulina, diabetes
                  diagnosticado ou em protocolo de jejum intermitente terapêutico podem se beneficiar de
                  ajustes simples:
                </p>
                <ul className="space-y-3 pl-1">
                  <li className="flex gap-3"><span style={{ color: C.terracotta }}>·</span>
                    Antecipar a porção para 2 a 3 horas antes de dormir, fora da janela de pico do GH.
                  </li>
                  <li className="flex gap-3"><span style={{ color: C.terracotta }}>·</span>
                    Remover por completo o mel cru e qualquer adoçante calórico, mantendo só a base funcional.
                  </li>
                  <li className="flex gap-3"><span style={{ color: C.terracotta }}>·</span>
                    Usar apenas o chá de Passiflora e camomila à noite, e consumir a gelatina com chia no
                    fim do jantar.
                  </li>
                  <li className="flex gap-3"><span style={{ color: C.terracotta }}>·</span>
                    Monitorar glicemia capilar de jejum por 7 a 14 dias se houver dúvida individual.
                  </li>
                </ul>
                <p className="text-base italic" style={{ color: C.inkSoft }}>
                  O protocolo funciona como base, não como regra rígida. Cada organismo responde de forma
                  diferente, e o objetivo central permanece o mesmo: reduzir a dependência de psicofármacos
                  prescritos sem necessidade clínica real.
                </p>
              </div>

              {/* TABELA, ajustes por perfil metabólico */}
              <div className="mt-12">
                <div className="flex items-center gap-3 mb-5">
                  <Beaker size={18} style={{ color: C.terracotta }} />
                  <span className="text-xs font-bold" style={{ ...monoStyle, color: C.terracotta }}>
                    Ajustes por perfil metabólico
                  </span>
                </div>
                <p className="text-base md:text-lg font-light leading-[1.65] mb-8" style={{ color: C.inkSoft }}>
                  Quatro perfis, quatro versões do mesmo protocolo. Timing, composição e monitoramento
                  calibrados para o estado metabólico real, sem abrir mão dos quatro ativos clínicos.
                </p>

                <div className="overflow-x-auto rounded-2xl" style={{ border: `1px solid ${C.borderLight}` }}>
                  <table className="w-full text-left border-collapse" style={{ backgroundColor: C.cream }}>
                    <thead>
                      <tr style={{ backgroundColor: C.sage }}>
                        {['Perfil', 'Timing ideal', 'Composição da porção', 'Mel cru', 'Monitoramento'].map((h) => (
                          <th key={h}
                            className="px-5 py-4 text-xs font-bold align-bottom"
                            style={{ ...monoStyle, color: C.cream, letterSpacing: '0.18em' }}>
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="text-sm md:text-base" style={{ color: C.inkSoft }}>
                      {[
                        {
                          perfil: 'Saudável, sem disglicemia',
                          subtitulo: 'Linha de base do protocolo',
                          timing: '30 a 60 min antes de dormir',
                          composicao: 'Gelatina + chia + Passiflora + camomila, dose padrão',
                          mel: 'Até 1 colher de chá, opcional',
                          monitoramento: 'Diário de sono por 14 dias',
                        },
                        {
                          perfil: 'Sensibilidade metabólica',
                          subtitulo: 'Sono ruim após carboidrato à noite',
                          timing: '60 a 90 min antes de dormir',
                          composicao: 'Dose padrão, aumentar chia para 12 g, sem adoçante',
                          mel: 'Suspender',
                          monitoramento: 'Glicemia capilar de jejum semanal',
                        },
                        {
                          perfil: 'Resistência à insulina',
                          subtitulo: 'HOMA-IR alto, gordura visceral',
                          timing: '2 h antes de dormir, após jantar leve',
                          composicao: 'Reduzir gelatina para 30 g, manter chia 10 g, dobrar Passiflora no chá',
                          mel: 'Suspender',
                          monitoramento: 'Glicemia capilar de jejum 2x/semana, HOMA-IR a cada 90 dias',
                        },
                        {
                          perfil: 'Diabetes diagnosticado',
                          subtitulo: 'Tipo 2 ou pré-diabetes em tratamento',
                          timing: 'Junto ou logo após o jantar, nunca em jejum prolongado noturno',
                          composicao: 'Gelatina 30 g, chia 8 g, sem mel, sem frutas adicionadas',
                          mel: 'Proibido',
                          monitoramento: 'Glicemia capilar pós-prandial (1h e 2h) na primeira semana, avisar médico',
                        },
                        {
                          perfil: 'Jejum intermitente 16:8 ou maior',
                          subtitulo: 'Janela alimentar fechada antes do sono',
                          timing: 'Dentro da janela alimentar, no fim do jantar',
                          composicao: 'Porção completa no jantar; à noite, só chá de Passiflora e camomila',
                          mel: 'Dentro da janela, opcional',
                          monitoramento: 'Cetonemia ou cetonúria semanal se for protocolo low carb',
                        },
                      ].map((row, i) => (
                        <tr key={i}
                          style={{
                            backgroundColor: i % 2 === 0 ? C.cream : '#f7efe2',
                            borderTop: `1px solid ${C.borderLight}`,
                          }}>
                          <td className="px-5 py-5 align-top">
                            <p className="font-semibold" style={{ color: C.sage }}>{row.perfil}</p>
                            <p className="text-xs mt-1 italic" style={{ color: C.inkSoft, opacity: 0.75 }}>{row.subtitulo}</p>
                          </td>
                          <td className="px-5 py-5 align-top leading-[1.55]">{row.timing}</td>
                          <td className="px-5 py-5 align-top leading-[1.55]">{row.composicao}</td>
                          <td className="px-5 py-5 align-top">
                            <span className="inline-block px-3 py-1 rounded-full text-xs font-bold"
                              style={{
                                backgroundColor: row.mel === 'Proibido' || row.mel === 'Suspender' ? '#f4d5c4' : '#e7e1cf',
                                color: row.mel === 'Proibido' ? '#8a2f12' : (row.mel === 'Suspender' ? C.terracotta : C.sage),
                              }}>
                              {row.mel}
                            </span>
                          </td>
                          <td className="px-5 py-5 align-top leading-[1.55] text-sm">{row.monitoramento}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <p className="mt-6 text-sm italic leading-[1.6]" style={{ color: C.inkSoft, opacity: 0.85 }}>
                  Indivíduos em uso de insulina, sulfonilureia ou qualquer hipoglicemiante oral devem
                  alinhar o ajuste com o médico responsável antes de iniciar o protocolo. A tabela é guia
                  de calibração, não substitui acompanhamento clínico.
                </p>
              </div>
            </motion.div>

            <motion.div {...fade(0)} className="mb-14 max-w-3xl">
              <span className="text-xs font-bold block mb-4" style={{ ...monoStyle, color: C.terracotta }}>Perguntas honestas</span>
              <h2 className="text-[clamp(2.25rem,5.5vw,5rem)] leading-[1] tracking-tight" style={{ ...display, color: C.sage }}>
                O que perguntam{' '}
                <span style={{ ...editorial, color: C.terracotta }}>antes de começar.</span>
              </h2>
            </motion.div>

            <div className="space-y-3">
              {FAQ.map((item, i) => {
                const open = openFaq === i;
                return (
                  <motion.div key={i} {...fade(i * 0.03)}
                    className="rounded-2xl overflow-hidden transition-all"
                    style={{ backgroundColor: open ? '#fff8ef' : C.sand, border: `1px solid ${open ? C.terracotta : C.borderLight}` }}>
                    <button onClick={() => setOpenFaq(open ? null : i)}
                      className="w-full text-left p-6 md:p-8 flex items-start justify-between gap-6"
                      aria-expanded={open}>
                      <span className="text-lg md:text-2xl font-semibold leading-snug pr-4" style={{ color: C.sage }}>{item.q}</span>
                      <ChevronDown size={26} className="shrink-0 mt-1 transition-transform duration-500"
                        style={{ color: C.terracotta, transform: open ? 'rotate(180deg)' : 'rotate(0)' }} />
                    </button>
                    {open && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
                        transition={{ duration: 0.4, ease: APPLE_EASE }} className="overflow-hidden">
                        <div className="px-6 md:px-8 pb-8 text-lg md:text-xl leading-[1.7] font-light" style={{ color: C.inkSoft }}>
                          {item.a}
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CONTINUE SUA TRILHA */}
        <section className="relative py-24 md:py-36 px-6 md:px-12 lg:px-20" style={{ backgroundColor: C.sand }}>
          <div className="max-w-[1600px] mx-auto">
            <motion.div {...fade(0)} className="mb-16 max-w-3xl">
              <Compass size={32} style={{ color: C.terracotta }} className="mb-6" />
              <span className="text-xs font-bold block mb-4" style={{ ...monoStyle, color: C.terracotta }}>Continue sua trilha</span>
              <h2 className="text-[clamp(2.25rem,5.5vw,5rem)] leading-[1] tracking-tight" style={{ ...display, color: C.sage }}>
                Esta é uma camada.{' '}
                <span style={{ ...editorial, color: C.terracotta }}>Existem outras seis.</span>
              </h2>
              <p className="mt-6 text-lg md:text-xl leading-[1.6] font-light" style={{ color: C.inkSoft }}>
                Sono ruim raramente é só falta de calmante. É também solo morto, comida industrial, cortisol crônico e desconhecimento sobre o próprio corpo.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {TRILHA.map((t, i) => (
                <motion.div key={t.to} {...fade(i * 0.08)}>
                  <Link to={t.to} className="group block h-full p-8 md:p-10 rounded-3xl transition-all duration-500 hover:-translate-y-2 hover:shadow-xl"
                    style={{ backgroundColor: C.cream, border: `1px solid ${C.borderLight}` }}>
                    <ChefHat size={24} style={{ color: C.terracotta }} className="mb-6" />
                    <h3 className="text-2xl md:text-3xl mb-4 leading-tight" style={{ ...display, color: C.sage }}>
                      {t.titulo}
                    </h3>
                    <p className="text-base md:text-lg leading-relaxed font-light mb-8" style={{ color: C.inkSoft }}>
                      {t.desc}
                    </p>
                    <span className="inline-flex items-center gap-2 text-xs font-bold transition-all group-hover:gap-4"
                      style={{ ...monoStyle, color: C.terracotta }}>
                      {t.label} <ArrowRight size={14} />
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA + DISCLAIMER */}
        <section className="relative py-24 md:py-32 px-6 md:px-12 lg:px-20" style={{ backgroundColor: C.sage, color: C.cream }}>
          <motion.div {...fade(0)} className="max-w-3xl mx-auto text-center mb-16">
            <p className="text-2xl md:text-4xl leading-[1.4] font-light mb-12"
              style={{ ...editorial, color: C.cream }}>
              Quem domina a própria cozinha, dispensa metade da farmácia.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link to="/soberania-organica"
                className="inline-flex items-center gap-3 px-8 py-5 rounded-full font-bold text-base uppercase tracking-[0.18em] transition-all hover:scale-[1.02]"
                style={{ backgroundColor: C.terracotta, color: C.cream }}>
                Ver as 7 frentes <ArrowRight size={18} />
              </Link>
              <Link to="/soberania-organica/cozinha-funcional"
                className="inline-flex items-center gap-3 px-8 py-5 rounded-full font-bold text-base uppercase tracking-[0.18em] transition-all hover:scale-[1.02]"
                style={{ backgroundColor: 'transparent', color: C.cream, border: `2px solid ${C.cream}` }}>
                Outras receitas
              </Link>
            </div>
          </motion.div>

          <div className="max-w-[1100px] mx-auto">
            <div className="flex items-start gap-5 p-8 rounded-2xl" style={{ backgroundColor: 'rgba(250,246,240,0.06)', border: '1px solid rgba(250,246,240,0.15)' }}>
              <AlertTriangle size={24} style={{ color: C.terraSoft }} className="shrink-0 mt-1" />
              <div>
                <p className="text-xs font-bold mb-3" style={{ ...monoStyle, color: C.terraSoft }}>Disclaimer · Saúde</p>
                <p className="text-base md:text-lg leading-relaxed font-light" style={{ color: 'rgba(250,246,240,0.85)' }}>
                  Este conteúdo é educativo, baseado em literatura científica indexada. Não substitui diagnóstico, prescrição ou acompanhamento médico. Distúrbios persistentes do sono, ansiedade clínica e uso atual de medicação psiquiátrica exigem avaliação profissional. Não interrompa nem altere prescrição médica por conta própria.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
