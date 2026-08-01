import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  ArrowRight, ChevronDown, Clock, Users, BookOpen, Beaker,
  Leaf, Sparkles, AlertTriangle, CheckCircle2,
  ScrollText, Activity, ExternalLink, ChefHat, Compass, Bug,
} from 'lucide-react';
import BackNav from '@/components/BackNav';
import ScrollToTop from '@/components/ScrollToTop';

import imgHero from '@/assets/receitas/hero-gelatina-antiparasitaria-light.jpg';
import imgMamao from '@/assets/receitas/ativo-sementes-mamao.jpg';
import imgAbobora from '@/assets/receitas/ativo-sementes-abobora.jpg';
import imgCravo from '@/assets/receitas/ativo-cravo-cha.jpg';
import imgGlicina from '@/assets/receitas/ativo-glicina-gelatina.jpg';

/**
 * /soberania-organica/cozinha-funcional/gelatina-antiparasitaria
 * Padrão editorial CLARO obrigatório (cream + sage + terracotta).
 * Quarteto do Poder: SEO + UX + Conteúdo + Conversão.
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
  { qtd: '40 g', nome: 'Sementes de mamão secas', detalhe: 'Carica papaya. Seque em airfryer ou forno baixo (60 a 80 °C) por 30 a 40 min, até ficarem quebradiças.' },
  { qtd: '40 g', nome: 'Sementes de abóbora cruas', detalhe: 'Cucurbita spp. Sem sal, sem torra industrial. As verdes (pepitas) descascadas funcionam.' },
  { qtd: '200 a 250 ml', nome: 'Chá forte de cravo-da-índia', detalhe: '8 a 10 cravos inteiros em água fervente, infusão tampada por 10 min, coar. Reservar 60 ml em temperatura ambiente e 60 ml fervente.' },
  { qtd: '40 g', nome: 'Gelatina sem sabor', detalhe: 'Cerca de 3 a 4 sachês. Veículo palatável e fonte adicional de glicina e colágeno.' },
  { qtd: 'opcional', nome: 'Pitada de canela ou raspa de limão', detalhe: 'Apenas para suavizar amargor. Evite mel ou açúcar (alimentam o parasita).' },
];

const PREPARO = [
  { n: '01', titulo: 'Faça o chá de cravo', desc: 'Ferva 250 ml de água, adicione 8 a 10 cravos inteiros, abafe e deixe infusionar por 10 minutos. Coe. Separe 60 ml em temperatura ambiente e 60 ml ainda quente.' },
  { n: '02', titulo: 'Triture as sementes', desc: 'Leve as 40 g de sementes secas de mamão e as 40 g de sementes de abóbora cruas ao liquidificador ou processador. Bata até virar uma farinha fina e homogênea.' },
  { n: '03', titulo: 'Hidrate a gelatina', desc: 'Coloque os 40 g de gelatina sem sabor nos 60 ml de chá em temperatura ambiente. Mexa e deixe inchar por 3 a 5 minutos.' },
  { n: '04', titulo: 'Dissolva no quente', desc: 'Adicione os 60 ml de chá fervente sobre a gelatina hidratada. Mexa vigorosamente até dissolver completamente. Não ferva depois de pronta.' },
  { n: '05', titulo: 'Incorpore a farinha de sementes', desc: 'Acrescente a farinha de sementes na mistura de gelatina e mexa até ficar homogêneo. Vai ficar levemente granulado: é normal.' },
  { n: '06', titulo: 'Despeje e refrigere', desc: 'Transfira para uma forma rasa ou pote de vidro vedado. Leve à geladeira por 2 a 4 horas, até firmar. Corte em quadradinhos pequenos.' },
];

const ATIVOS = [
  {
    n: '01', img: imgMamao, nome: 'Sementes de mamão', fonte: 'Carica papaya · 40 g secas',
    icon: Leaf,
    alt: 'Sementes secas de mamão dispostas em pequena tigela de cerâmica clara sobre toalha de linho creme',
    dose: '4 a 8 g por dia',
    doseEstudada: '4 a 10 g (estudos clínicos)',
    mecanismo: 'Carpaína e benzilisotiocianato (BITC) têm ação documentada contra Ascaris lumbricoides e Strongyloides. A semente seca concentra os bioativos. Estudos mostram clearance parasitária de 71 a 100% em alguns helmintos com doses pequenas.',
    estudoAncora: 'Okeniyi et al. (2007), Journal of Medicinal Food',
    achado: 'Estudo piloto com 60 crianças nigerianas: 71 a 100% de clearance de Ascaris e Strongyloides com 4 g de sementes secas mais mel, contra placebo de baixa eficácia. Sem efeitos colaterais graves relatados.',
  },
  {
    n: '02', img: imgAbobora, nome: 'Sementes de abóbora', fonte: 'Cucurbita spp. · 40 g cruas',
    icon: Sparkles,
    alt: 'Sementes verdes de abóbora cruas (pepitas) sobre colher de madeira em toalha de linho clara',
    dose: 'Cerca de 40 g na receita',
    doseEstudada: 'Adjuvante (uso histórico em doses altas)',
    mecanismo: 'A cucurbitacina tem ação paralisante sobre vermes (especialmente tênias e nematoides). Em humanos, age como adjuvante: imobiliza o parasita, facilitando sua expulsão pelo intestino, sobretudo quando combinada com fibras e bom trânsito intestinal.',
    estudoAncora: 'Estudos animais (Trichinella, ovinos e caprinos)',
    achado: 'Decocções concentradas reduziram carga parasitária em 69 a 83% em modelos animais. Em humanos a evidência clínica é menor, mas o uso histórico como vermífugo natural é amplamente documentado.',
  },
  {
    n: '03', img: imgCravo, nome: 'Cravo-da-índia', fonte: 'Syzygium aromaticum · chá forte',
    icon: Beaker,
    alt: 'Cravos da índia inteiros espalhados ao lado de xícara de cerâmica branca com chá quente sobre toalha de linho',
    dose: '8 a 10 cravos no chá',
    doseEstudada: 'Atividade in vitro confirmada',
    mecanismo: 'O eugenol (princípio ativo do cravo) tem atividade antiparasitária e antimicrobiana documentada in vitro e em modelos animais. Reduz larvas, viabilidade de ovos e inflamação intestinal causada por parasitas como Trichinella e Schistosoma.',
    estudoAncora: 'Estudos in vitro e em animais com eugenol',
    achado: 'Eugenol mata ovos e larvas em laboratório. Em humanos é usado tradicionalmente há séculos. Pouca evidência clínica direta isolada, mas excelente perfil de segurança em doses culinárias.',
  },
  {
    n: '04', img: imgGlicina, nome: 'Gelatina (veículo)', fonte: 'Glicina · proteína de colágeno',
    icon: Activity,
    alt: 'Folhas de gelatina sem sabor hidratadas em prato branco com colher de madeira sobre linho creme',
    dose: '40 g (3 a 4 sachês)',
    doseEstudada: 'Veículo palatável',
    mecanismo: 'A gelatina cumpre duas funções: torna a receita palatável (mascarando o sabor amargo das sementes e do cravo) e controla a dose por porção. Cada quadradinho entrega cerca de 5 g de farinha de sementes em formato fácil de engolir, sem mastigar.',
    estudoAncora: 'Estratégia de adesão (não estudo de eficácia)',
    achado: 'Sementes puras são intragáveis, o que faz a maioria das pessoas abandonar o protocolo. A gelatina resolve o problema de adesão, que é o real motivo do fracasso dessas estratégias naturais no dia a dia.',
  },
];

const FONTES = [
  { autor: 'Okeniyi, J. A. O. et al.', ano: '2007', titulo: 'Effectiveness of dried Carica papaya seeds against human intestinal parasitosis: a pilot study', revista: 'Journal of Medicinal Food, 10(1), 194 a 196', tipo: 'Estudo piloto controlado em crianças', link: 'https://pubmed.ncbi.nlm.nih.gov/17472487/' },
  { autor: 'Kugo, M. et al.', ano: '2018', titulo: 'Fortification of Carica papaya fruit seeds to school meal snacks may aid Africa mass deworming programs', revista: 'BMC Complementary and Alternative Medicine', tipo: 'Ensaio comparativo com albendazol', link: 'https://pubmed.ncbi.nlm.nih.gov/30348131/' },
  { autor: 'Kermanshai, R. et al.', ano: '2001', titulo: 'Benzyl isothiocyanate is the chief or sole anthelmintic in papaya seed extracts', revista: 'Phytochemistry, 57(3)', tipo: 'Estudo bioquímico do composto ativo', link: 'https://pubmed.ncbi.nlm.nih.gov/11393524/' },
  { autor: 'Grzybek, M. et al.', ano: '2016', titulo: 'Evaluation of Anthelmintic Activity and Composition of Pumpkin (Cucurbita pepo L.) Seed Extracts', revista: 'International Journal of Molecular Sciences, 17(9)', tipo: 'Estudo in vivo (modelo animal)', link: 'https://pubmed.ncbi.nlm.nih.gov/27598133/' },
  { autor: 'Pradhan, P. et al.', ano: '2013', titulo: 'Clove (Syzygium aromaticum): A precious spice', revista: 'Asian Pacific Journal of Tropical Biomedicine, 4(2)', tipo: 'Revisão de bioatividade', link: 'https://pubmed.ncbi.nlm.nih.gov/25182278/' },
  { autor: 'Marya, B. et al.', ano: '2012', titulo: 'In vitro anthelmintic activity of eugenol against Haemonchus contortus', revista: 'Journal of Helminthology', tipo: 'Estudo in vitro', link: 'https://pubmed.ncbi.nlm.nih.gov/?term=eugenol+anthelmintic' },
  { autor: 'WHO', ano: '2023', titulo: 'Soil-transmitted helminth infections, Fact sheet', revista: 'Organização Mundial da Saúde', tipo: 'Diretriz oficial de saúde pública', link: 'https://www.who.int/news-room/fact-sheets/detail/soil-transmitted-helminth-infections' },
];

const FAQ = [
  { q: 'Esta receita realmente elimina vermes?',
    a: 'Tem evidência preliminar boa para alguns parasitas específicos, principalmente Ascaris lumbricoides e Strongyloides. Não é universal nem substitui exame e tratamento médico. Funciona como apoio nutricional e adjuvante, especialmente em prevenção e em quadros leves. Para infecções confirmadas, faça parasitológico de fezes e siga prescrição (albendazol, mebendazol ou ivermectina).' },
  { q: 'Como eu sei se realmente tenho vermes?',
    a: 'Sintomas atribuídos a parasitas (queda de cabelo, sonolência, manchas na pele) raramente são causados por vermes em adultos no Brasil. A causa costuma ser outra: deficiência de ferro ou B12, tireoide, estresse crônico, alergias, fungos ou desequilíbrio hormonal. O único modo confiável é parasitológico de fezes (3 amostras em dias diferentes). Faça o exame antes de presumir.' },
  { q: 'Qual a dose correta?',
    a: 'A receita rende cerca de 8 a 10 quadradinhos. Tome 2 quadradinhos por dia, junto com a refeição principal, durante 7 a 10 dias. Isso entrega de 4 a 8 g de sementes de mamão por dia, dose próxima da usada nos estudos positivos. Se quiser repetir o ciclo, faça uma pausa de 15 dias entre eles.' },
  { q: 'Tem efeito colateral?',
    a: 'Em doses normais, é segura. Excesso de sementes de mamão (mais de 10 g por dia) pode causar náusea, cólica e diarreia. Sementes contêm traços de cianeto em quantidades grandes. Cravo em excesso irrita estômago. Mantenha a dose recomendada e não ultrapasse o ciclo de 10 dias sem orientação.' },
  { q: 'Quem não deve consumir?',
    a: 'Gestantes (sementes de mamão podem induzir contrações), lactantes, crianças menores de 2 anos sem orientação pediátrica, pessoas em uso de anticoagulantes (cravo potencializa) e quem tem úlcera gástrica ativa. Em qualquer condição clínica relevante, fale com seu médico antes.' },
  { q: 'Por que gelatinar em vez de tomar in natura?',
    a: 'Sementes puras são extremamente amargas. A maioria das pessoas abandona o protocolo no segundo dia por causa do sabor. A gelatina resolve isso: você engole quadradinhos pequenos com água, sem mastigar, sem sentir o gosto. É a diferença entre completar o ciclo e desistir.' },
];

const TRILHA = [
  { to: '/soberania-organica/cozinha-funcional', titulo: 'Hub Cozinha Funcional', desc: 'Volte para a coleção completa de receitas com base científica que substituem soluções leves da farmácia.', label: 'Ver coleção' },
  { to: '/soberania-organica/saude-preventiva', titulo: 'Saúde Preventiva', desc: 'Os pilares fisiológicos da saúde intestinal: microbiota, enzimas, motilidade, barreira intestinal.', label: 'Estudar fisiologia' },
  { to: '/soberania-organica/fitoterapia-aplicada', titulo: 'Fitoterapia Aplicada', desc: 'Aprofunde o uso clínico de plantas vermífugas e digestivas: artemísia, hortelã, alho, orégano.', label: 'Aprofundar' },
];

function Hero() {
  const { scrollY } = useScroll();
  const yBg = useTransform(scrollY, [0, 800], [0, 200]);
  const opacityContent = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    <section className="relative h-[92vh] min-h-[640px] w-full overflow-hidden" style={{ backgroundColor: C.sage }}>
      <motion.div className="absolute inset-0" style={{ y: yBg }}>
        <img src={imgHero}
          alt="Pote de vidro com gelatina translúcida cor âmbar contendo sementes de mamão e abóbora visíveis ao lado de cravos da índia espalhados e xícara de chá quente sobre toalha de linho creme"
          className="w-full h-full object-cover scale-110"
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
          <Bug size={14} style={{ color: C.cream }} />
          <span className="text-[11px] md:text-xs font-bold" style={{ ...monoStyle, color: C.cream }}>
            Protocolo · 7 estudos primários
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1, delay: 0.15, ease: APPLE_EASE }}
          className="text-[clamp(2.75rem,8vw,7rem)] max-w-[18ch]"
          style={{ ...display, color: C.cream, textShadow: '0 2px 24px rgba(0,0,0,0.55)' }}>
          A gelatina que expulsa{' '}
          <span style={{ ...editorial, color: C.terraSoft, textShadow: '0 2px 28px rgba(0,0,0,0.6)' }}>
            os parasitas.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: APPLE_EASE }}
          className="mt-8 max-w-2xl text-lg md:text-2xl leading-relaxed font-light"
          style={{ color: 'rgba(250,246,240,0.95)', fontFamily: "'Inter Tight', sans-serif", textShadow: '0 1px 12px rgba(0,0,0,0.55)' }}>
          Três bioativos com evidência clínica em parasitas intestinais: sementes de mamão, sementes de abóbora e cravo-da-índia. Engolido em quadradinhos sem sentir o sabor. Ciclo de 7 a 10 dias.
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.7, ease: APPLE_EASE }}
          className="mt-10 flex flex-wrap gap-x-8 gap-y-3">
          <span className="flex items-center gap-2 text-xs font-bold" style={{ ...monoStyle, color: 'rgba(250,246,240,0.85)' }}>
            <Clock size={14} style={{ color: C.terraSoft }} /> 20 min preparo
          </span>
          <span className="flex items-center gap-2 text-xs font-bold" style={{ ...monoStyle, color: 'rgba(250,246,240,0.85)' }}>
            <Users size={14} style={{ color: C.terraSoft }} /> 8 a 10 doses
          </span>
          <span className="flex items-center gap-2 text-xs font-bold" style={{ ...monoStyle, color: 'rgba(250,246,240,0.85)' }}>
            <BookOpen size={14} style={{ color: C.terraSoft }} /> 7 estudos PubMed
          </span>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default function GelatinaAntiparasitaria() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <>
      <Helmet>
        <title>Gelatina Antiparasitária: Receita com 3 Bioativos | Lord Junnior</title>
        <meta name="description" content="Receita funcional com sementes de mamão, abóbora e cravo. Evidência clínica contra Ascaris e Strongyloides. Protocolo de 7 a 10 dias, palatável e seguro." />
        <link rel="canonical" href="https://www.lordjunnior.com.br/soberania-organica/cozinha-funcional/gelatina-antiparasitaria" />
        <meta property="og:title" content="A Gelatina que Expulsa os Parasitas" />
        <meta property="og:description" content="Sementes de mamão, abóbora e cravo. Três bioativos. Sete estudos PubMed. Uma receita." />
        <meta property="og:image" content="https://www.lordjunnior.com.br/og/gelatina-antiparasitaria.jpg" />
        <meta property="og:type" content="article" />
        <meta property="og:locale" content="pt_BR" />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <html lang="pt-BR" />
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Recipe',
            name: 'Gelatina Antiparasitária com Sementes de Mamão e Abóbora',
            author: { '@type': 'Person', name: 'Lord Junnior' },
            description: 'Receita funcional com sementes de mamão, sementes de abóbora e chá de cravo, em formato de gelatina palatável, baseada em literatura científica indexada.',
            recipeYield: '8 a 10 porções',
            prepTime: 'PT20M', cookTime: 'PT0M', totalTime: 'PT4H20M',
            recipeCategory: 'Alimento funcional',
            recipeCuisine: 'Funcional brasileira',
            keywords: 'antiparasitária, vermífugo natural, sementes de mamão, sementes de abóbora, cravo, Ascaris, Strongyloides',
            recipeIngredient: INGREDIENTES.map((i) => `${i.qtd} ${i.nome}`),
            recipeInstructions: PREPARO.map((p) => ({ '@type': 'HowToStep', name: p.titulo, text: p.desc })),
            nutrition: {
              '@type': 'NutritionInformation',
              calories: 'Baixo (cerca de 25 kcal por quadradinho)',
              proteinContent: 'cerca de 3 g por quadradinho',
              fiberContent: 'rico em fibra',
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

        {/* CAPÍTULO 1, Manifesto / contexto científico */}
        <section className="relative px-6 md:px-12 lg:px-20 py-24 md:py-36">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 max-w-[1600px] mx-auto">
            <motion.aside {...fade(0)} className="lg:col-span-4">
              <div className="sticky top-24">
                <span className="text-xs font-bold block mb-4" style={{ ...monoStyle, color: C.terracotta }}>Capítulo 01</span>
                <div className="h-[2px] w-16 mb-6" style={{ backgroundColor: C.terracotta }} />
                <p className="text-sm font-semibold" style={{ ...monoStyle, color: C.inkSoft }}>O que a ciência mostra</p>
              </div>
            </motion.aside>
            <motion.div {...fade(0.1)} className="lg:col-span-8">
              <h2 className="text-[clamp(2.25rem,5.5vw,5rem)] leading-[1] tracking-tight mb-10" style={{ ...display, color: C.sage }}>
                Tradição da vovó,{' '}
                <span style={{ ...editorial, color: C.terracotta }}>com PubMed do lado.</span>
              </h2>
              <div className="space-y-7 text-lg md:text-xl leading-[1.7] font-light" style={{ color: C.inkSoft }}>
                <p>
                  Sementes de mamão são usadas há séculos como vermífugo no Brasil, na Nigéria e na Índia. A diferença é que agora há ensaio clínico controlado mostrando o quê e o quanto.
                </p>
                <p>
                  O <strong style={{ color: C.sage }}>estudo piloto de Okeniyi (2007)</strong> deu 4 g de sementes secas de mamão a 60 crianças com parasitas. O resultado foi clearance de 71 a 100% para Ascaris lumbricoides e Strongyloides, contra placebo de baixa eficácia. <strong style={{ color: C.terracotta }}>O ensaio de Kugo (2018)</strong> repetiu em escala maior: 326 crianças, redução de 64% nos ovos de Ascaris contra 79% do albendazol. Não substitui o medicamento, mas chega perto.
                </p>
                <p>
                  Some isso à <strong style={{ color: C.sage }}>cucurbitacina</strong> da abóbora (paralisa o verme) e ao <strong style={{ color: C.sage }}>eugenol</strong> do cravo (mata ovos e larvas em laboratório), e você tem três frentes simultâneas atacando o ciclo do parasita. A gelatina entra como veículo: faz a pessoa de fato completar o ciclo de 7 a 10 dias, em vez de desistir no segundo por causa do sabor.
                </p>
                <blockquote className="pl-8 py-2 my-10 text-2xl md:text-3xl leading-[1.4] font-light"
                  style={{ borderLeft: `3px solid ${C.terracotta}`, color: C.sage, ...editorial }}>
                  Não é mágica, não é cura universal. É um adjuvante nutricional barato, seguro e com base científica real.
                </blockquote>
              </div>
            </motion.div>
          </div>
        </section>

        {/* CAPÍTULO 2, RECEITA */}
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
              <motion.div {...fade(0)} className="lg:col-span-5">
                <div className="sticky top-8 rounded-3xl p-8 md:p-10" style={{ backgroundColor: C.cream, border: `1px solid ${C.borderLight}` }}>
                  <h3 className="text-2xl mb-2" style={{ ...editorial, color: C.terracotta }}>
                    Ingredientes
                  </h3>
                  <p className="text-sm mb-8" style={{ color: C.inkSoft }}>Rende 8 a 10 quadradinhos · 1 ciclo de 5 dias</p>
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

              <motion.div {...fade(0.1)} className="lg:col-span-7">
                <h3 className="text-2xl mb-2" style={{ ...editorial, color: C.terracotta }}>
                  Modo de preparo
                </h3>
                <p className="text-sm mb-10" style={{ color: C.inkSoft }}>20 min mais 2 a 4 h de geladeira</p>

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
                    Dose por dia
                  </p>
                  <p className="leading-relaxed font-light text-lg" style={{ color: C.inkSoft }}>
                    2 quadradinhos junto com a refeição principal · ciclo de 7 a 10 dias · pausa de 15 dias antes de repetir · beba bastante água e mantenha fibras na dieta para auxiliar a eliminação intestinal
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CAPÍTULO 3, DOSSIÊ DOS ATIVOS */}
        <section className="relative py-24 md:py-36 px-6 md:px-12 lg:px-20" style={{ backgroundColor: C.sage, color: C.cream }}>
          <div className="max-w-[1600px] mx-auto">
            <motion.div {...fade(0)} className="mb-20 max-w-3xl">
              <span className="text-xs font-bold block mb-4" style={{ ...monoStyle, color: C.terraSoft }}>Capítulo 03 · Por que funciona</span>
              <h2 className="text-[clamp(2.25rem,5.5vw,5rem)] leading-[1] tracking-tight" style={display}>
                Os ativos,{' '}
                <span style={{ ...editorial, color: C.terraSoft }}>um por um.</span>
              </h2>
              <p className="mt-6 text-lg md:text-xl font-light leading-[1.6]" style={{ color: 'rgba(250,246,240,0.78)' }}>
                Cada ingrediente foi escolhido por evidência clínica ou bioquímica documentada, não por viralização de redes sociais.
              </p>
            </motion.div>

            <div className="space-y-16 md:space-y-24">
              {ATIVOS.map((a, i) => {
                const reversed = i % 2 === 1;
                return (
                  <motion.article key={a.n} {...fade(0)} className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                    <div className={`lg:col-span-6 ${reversed ? 'lg:order-2' : ''}`}>
                      <div className="relative h-[360px] md:h-[480px] lg:h-[560px] overflow-hidden rounded-3xl group">
                        <img src={a.img} alt={a.alt} loading="lazy" width={1280} height={1280}
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
                  <li className="flex gap-3"><span style={{ color: C.terracotta }}>·</span> Tomar 2 quadradinhos por dia com a refeição principal</li>
                  <li className="flex gap-3"><span style={{ color: C.terracotta }}>·</span> Engolir com água, sem mastigar (preserva os bioativos no intestino)</li>
                  <li className="flex gap-3"><span style={{ color: C.terracotta }}>·</span> Manter o ciclo por 7 a 10 dias consecutivos</li>
                  <li className="flex gap-3"><span style={{ color: C.terracotta }}>·</span> Beber pelo menos 2 L de água ao dia para auxiliar trânsito</li>
                  <li className="flex gap-3"><span style={{ color: C.terracotta }}>·</span> Pausar 15 dias antes de eventual repetição (pega larvas que viraram adulto)</li>
                </ul>
              </motion.div>

              <motion.div {...fade(0.1)} className="p-8 md:p-10 rounded-3xl"
                style={{ backgroundColor: C.sand, border: `1px solid ${C.borderLight}` }}>
                <AlertTriangle size={32} style={{ color: '#a64a1f' }} className="mb-6" />
                <h3 className="text-2xl md:text-3xl mb-6 font-semibold" style={{ ...display, color: C.sage }}>O que não esperar</h3>
                <ul className="space-y-4 text-lg leading-relaxed font-light" style={{ color: C.inkSoft }}>
                  <li className="flex gap-3"><span style={{ color: '#a64a1f' }}>·</span> Substituir albendazol ou mebendazol em infecção confirmada</li>
                  <li className="flex gap-3"><span style={{ color: '#a64a1f' }}>·</span> Eliminar tênia ou outros parasitas mais resistentes sem medicação</li>
                  <li className="flex gap-3"><span style={{ color: '#a64a1f' }}>·</span> Diagnosticar verme só pelos sintomas (faça parasitológico)</li>
                  <li className="flex gap-3"><span style={{ color: '#a64a1f' }}>·</span> Curar queda de cabelo, manchas na pele ou cansaço (causas costumam ser outras)</li>
                  <li className="flex gap-3"><span style={{ color: '#a64a1f' }}>·</span> Funcionar tomado por 1 ou 2 dias: o protocolo é cumulativo</li>
                </ul>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CAPÍTULO 5, BIBLIOTECA DE FONTES */}
        <section className="relative py-24 md:py-36 px-6 md:px-12 lg:px-20" style={{ backgroundColor: C.sand }}>
          <div className="max-w-[1600px] mx-auto">
            <motion.div {...fade(0)} className="mb-16 max-w-3xl">
              <span className="text-xs font-bold block mb-4" style={{ ...monoStyle, color: C.terracotta }}>Capítulo 05 · Biblioteca de evidências</span>
              <h2 className="text-[clamp(2.25rem,5.5vw,5rem)] leading-[1] tracking-tight" style={{ ...display, color: C.sage }}>
                As{' '}
                <span style={{ ...editorial, color: C.terracotta }}>fontes.</span>
              </h2>
              <p className="mt-6 text-lg md:text-xl font-light leading-[1.6]" style={{ color: C.inkSoft }}>
                Sete referências indexadas, incluindo o estudo piloto original com sementes de mamão, ensaio comparativo com albendazol e a ficha técnica da OMS sobre helmintíases.
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
                A receita resolve uma camada.{' '}
                <span style={{ ...editorial, color: C.terracotta }}>Existem outras.</span>
              </h2>
              <p className="mt-6 text-lg md:text-xl leading-[1.6] font-light" style={{ color: C.inkSoft }}>
                Saúde intestinal sustentável depende de microbiota, motilidade, qualidade da água, alimento vivo. A receita ataca um ponto. As trilhas abaixo cuidam do resto.
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
              Vovó já sabia. A ciência só veio confirmar.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link to="/soberania-organica/cozinha-funcional"
                className="inline-flex items-center gap-3 px-8 py-5 rounded-full font-bold text-base uppercase tracking-[0.18em] transition-all hover:scale-[1.02]"
                style={{ backgroundColor: C.terracotta, color: C.cream }}>
                Outras receitas <ArrowRight size={18} />
              </Link>
              <Link to="/soberania-organica"
                className="inline-flex items-center gap-3 px-8 py-5 rounded-full font-bold text-base uppercase tracking-[0.18em] transition-all hover:scale-[1.02]"
                style={{ backgroundColor: 'transparent', color: C.cream, border: `2px solid ${C.cream}` }}>
                Ver as 7 frentes
              </Link>
            </div>
          </motion.div>

          <div className="max-w-[1100px] mx-auto">
            <div className="flex items-start gap-5 p-8 rounded-2xl" style={{ backgroundColor: 'rgba(250,246,240,0.06)', border: '1px solid rgba(250,246,240,0.15)' }}>
              <AlertTriangle size={24} style={{ color: C.terraSoft }} className="shrink-0 mt-1" />
              <div>
                <p className="text-xs font-bold mb-3" style={{ ...monoStyle, color: C.terraSoft }}>Disclaimer · Saúde</p>
                <p className="text-base md:text-lg leading-relaxed font-light" style={{ color: 'rgba(250,246,240,0.85)' }}>
                  Este conteúdo é educativo, baseado em literatura científica indexada. Não substitui parasitológico de fezes, diagnóstico ou prescrição médica. Em caso de suspeita real de parasitose, infecções confirmadas, gestação, lactação, uso de anticoagulantes ou doenças crônicas, procure orientação profissional antes de seguir o protocolo.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
