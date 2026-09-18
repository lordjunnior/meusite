import { Helmet } from "react-helmet-async";
import { useEffect } from "react";
import { motion } from "framer-motion";
import {
  Shield,
  Droplets,
  FlaskConical,
  Leaf,
  AlertTriangle,
  Activity,
  Sparkles,
  ChevronRight,
  CheckCircle2,
  XCircle,
  Beaker,
  Heart,
  Wind,
  Zap,
} from "lucide-react";
import BackToHome from "@/components/BackToHome";
import PageFloatingToc from "@/components/PageFloatingToc";
import bgPropolis from "@/assets/bg-propolis.webp";
import imgColmeia from "@/assets/propolis-colmeia.webp";

const EASE = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: EASE, delay: i * 0.08 },
  }),
};

const TOC = [
  { id: "essencia", label: "Essência" },
  { id: "ciencia", label: "Ciência" },
  { id: "variacoes", label: "Variações" },
  { id: "indicacoes", label: "Indicações" },
  { id: "protocolos", label: "Protocolos" },
  { id: "preparo", label: "Preparo Caseiro" },
  { id: "limites", label: "Contraindicações" },
  { id: "faq", label: "FAQ" },
];

const VARIACOES = [
  {
    nome: "Própolis Verde",
    origem: "Brasil, Minas Gerais e Sudeste",
    fonte: "Resina de Baccharis dracunculifolia (alecrim do campo)",
    composto: "Artepilin C, alto teor",
    cor: "from-emerald-500 to-lime-400",
    badge: "#10b981",
    para:
      "Imunidade, antitumoral em pesquisa, gripes, infecções respiratórias, úlceras gástricas (Helicobacter pylori).",
    forte:
      "É o própolis com maior concentração de Artepilin C do mundo. Padrão ouro para protocolos imunológicos sérios.",
  },
  {
    nome: "Própolis Vermelho",
    origem: "Nordeste brasileiro, manguezais de Alagoas e Sergipe",
    fonte: "Resina de Dalbergia ecastophyllum (rabo de bugio)",
    composto: "Isoflavonoides, formononetina, biochanina A",
    cor: "from-rose-500 to-red-400",
    badge: "#ef4444",
    para:
      "Saúde feminina, equilíbrio hormonal, antimicrobiano vaginal, próstata, antioxidante potente, ação antitumoral em estudo.",
    forte:
      "Único própolis do mundo com perfil isoflavônico. Modulador hormonal natural sem fitoestrógenos da soja.",
  },
  {
    nome: "Própolis Marrom",
    origem: "Sul e Sudeste do Brasil, Europa, Argentina",
    fonte: "Resina de álamos (Populus) e diversas árvores",
    composto: "Flavonoides clássicos (pinocembrina, galangina, CAPE)",
    cor: "from-amber-600 to-yellow-500",
    badge: "#f59e0b",
    para:
      "Resfriados, dor de garganta, higiene bucal, cicatrização, uso geral cotidiano. O mais acessível e estudado.",
    forte:
      "Espectro antibacteriano amplo, principalmente Gram positivos. Versão clássica europeia, base da maioria dos extratos comerciais.",
  },
  {
    nome: "Própolis Preto",
    origem: "Nordeste, regiões secas e caatinga",
    fonte: "Mistura de jurema, angico e outras resinas nativas",
    composto: "Polifenóis escuros, alta concentração resínica",
    cor: "from-stone-500 to-stone-300",
    badge: "#78716c",
    para:
      "Feridas crônicas, micoses, problemas de pele, limpeza de pele oleosa e acne resistente.",
    forte:
      "Densidade resínica extrema. Tradicionalmente reservado para uso tópico em lesões persistentes.",
  },
  {
    nome: "Própolis Amarelo",
    origem: "Cerrado e Centro Oeste brasileiro",
    fonte: "Resinas de plantas como Schinus terebinthifolius (aroeira) e ipês",
    composto: "Triterpenos, baixa em flavonoides",
    cor: "from-yellow-400 to-amber-300",
    badge: "#eab308",
    para:
      "Anti inflamatório suave, peles sensíveis, mucosa oral delicada, crianças (sob orientação), uso cosmético.",
    forte:
      "Perfil mais brando. Indicado quando as variações verde, vermelha ou marrom causam ardência ou irritação.",
  },
];

const INDICACOES = [
  {
    titulo: "Garganta Inflamada e Amigdalite",
    desc:
      "Spray ou extrato glicólico aplicado direto na orofaringe. Ação antibacteriana, antiviral e analgésica local em minutos.",
    icone: Wind,
  },
  {
    titulo: "Gripes, Resfriados e Sinusite",
    desc:
      "Uso oral de 20 a 40 gotas, três vezes ao dia, durante o quadro agudo. Reduz duração e intensidade da infecção viral.",
    icone: Activity,
  },
  {
    titulo: "Imunidade e Profilaxia",
    desc:
      "Ciclos de 30 dias com pausas de 10. Modulador imunológico, eleva atividade de macrófagos e células NK.",
    icone: Shield,
  },
  {
    titulo: "Saúde Bucal: Aftas, Gengivite, Pós Extração",
    desc:
      "Bochecho com extrato diluído em água. Cicatriza, descontamina e reduz inflamação periodontal.",
    icone: Sparkles,
  },
  {
    titulo: "Úlcera Gástrica e H. pylori",
    desc:
      "Estudos clínicos mostram redução de carga bacteriana com própolis verde em jejum, dose de 30 gotas duas vezes ao dia.",
    icone: Beaker,
  },
  {
    titulo: "Infecções Urinárias Recorrentes",
    desc:
      "Coadjuvante em quadros recidivantes. Ação antimicrobiana sistêmica, melhor combinada a hidratação alta e D mannose.",
    icone: Droplets,
  },
  {
    titulo: "Cicatrização de Feridas e Queimaduras",
    desc:
      "Pomada ou extrato glicólico aplicado direto. Acelera epitelização, reduz infecção secundária e dor local.",
    icone: Heart,
  },
  {
    titulo: "Acne, Furúnculos e Micoses",
    desc:
      "Aplicação tópica concentrada, duas a três vezes ao dia. Especialmente eficaz em acne inflamatória bacteriana.",
    icone: Leaf,
  },
  {
    titulo: "Otite Externa Leve",
    desc:
      "Gotas auriculares específicas (extrato glicólico), uma a duas gotas, duas vezes ao dia, sob supervisão.",
    icone: Zap,
  },
  {
    titulo: "Herpes Labial",
    desc:
      "Aplicação tópica nas primeiras 12 horas dos sintomas reduz intensidade e tempo total da lesão.",
    icone: AlertTriangle,
  },
  {
    titulo: "Apoio em Tratamentos Oncológicos (coadjuvante)",
    desc:
      "Própolis verde brasileiro estudado como adjuvante. Sempre sob acompanhamento médico e oncológico, nunca substituto.",
    icone: FlaskConical,
  },
  {
    titulo: "Saúde Hormonal Feminina",
    desc:
      "Própolis vermelho com isoflavonoides ajuda em quadros de TPM, sintomas menopausais leves e candidíase recorrente.",
    icone: Activity,
  },
];

const PROTOCOLOS = [
  {
    titulo: "Profilaxia Imunológica",
    duracao: "30 dias com pausa de 10",
    dose: "20 gotas, duas vezes ao dia, em água ou sublingual",
    via: "Oral",
    obs: "Indicado em outono e inverno, ou em períodos de exposição alta a aglomeração e estresse.",
  },
  {
    titulo: "Quadro Agudo Respiratório",
    duracao: "7 a 10 dias",
    dose: "30 a 40 gotas, três vezes ao dia",
    via: "Oral e spray na garganta",
    obs: "Iniciar nas primeiras 24 horas dos sintomas. Combinar com hidratação, repouso e zinco se disponível.",
  },
  {
    titulo: "Gastrite e H. pylori",
    duracao: "60 dias",
    dose: "30 gotas, duas vezes ao dia, em jejum",
    via: "Oral, preferir própolis verde",
    obs: "Evitar com refluxo grave. Sempre integrar ao acompanhamento gastroenterológico.",
  },
  {
    titulo: "Saúde Bucal Diária",
    duracao: "Uso contínuo, conforme necessidade",
    dose: "10 gotas em meio copo de água, bochecho de 30 segundos",
    via: "Tópico bucal",
    obs: "Após escovação, duas vezes ao dia. Reduz placa, gengivite e mau hálito persistente.",
  },
  {
    titulo: "Cicatrização Tópica",
    duracao: "Até fechamento da lesão",
    dose: "Aplicar extrato glicólico ou pomada, duas a três vezes ao dia",
    via: "Tópico cutâneo",
    obs: "Limpar a ferida antes. Cobrir com curativo se necessário. Evitar em mucosa oral concentrado.",
  },
  {
    titulo: "Apoio Hormonal Feminino",
    duracao: "90 dias",
    dose: "Própolis vermelho, 20 gotas duas vezes ao dia",
    via: "Oral",
    obs: "Acompanhar com profissional. Monitorar ciclo, humor e sintomas. Suspender se houver alterações relevantes.",
  },
];

const FAQ = [
  {
    q: "Própolis vermelho ou verde, qual escolher?",
    a:
      "Verde é a escolha padrão para imunidade, gripes e infecções respiratórias. Vermelho é específico para questões hormonais femininas, próstata e algumas pesquisas oncológicas. Marrom é o uso geral cotidiano e o mais barato.",
  },
  {
    q: "Posso tomar própolis todos os dias para sempre?",
    a:
      "Não é o ideal. O recomendado são ciclos de 30 dias com pausas de 7 a 10. Uso contínuo sem janela pode reduzir a resposta moduladora e desorganizar o efeito imunológico desejado.",
  },
  {
    q: "Própolis funciona contra Covid e gripes virais?",
    a:
      "Estudos brasileiros durante a pandemia, especialmente com EPP AF (própolis verde padronizado), mostraram redução de tempo de internação e marcadores inflamatórios. Não substitui tratamento médico, é coadjuvante.",
  },
  {
    q: "Crianças podem tomar?",
    a:
      "Sim, em dose ajustada e preferindo formulações sem álcool (extrato aquoso ou glicólico). De 1 a 3 anos: somente com pediatra. Acima de 3 anos: 5 a 10 gotas, sempre diluído. Evitar em alergia a abelhas ou mel.",
  },
  {
    q: "Própolis com álcool é melhor que sem álcool?",
    a:
      "O extrato alcoólico extrai melhor os flavonoides e tem maior potência terapêutica. O glicólico ou aquoso é preferido para crianças, gestantes, mucosa irritada e uso bucal frequente. Cada um tem seu lugar.",
  },
  {
    q: "Quanto tempo leva para sentir efeito?",
    a:
      "Garganta inflamada: minutos. Gripe aguda: 24 a 48 horas. Imunidade modulada: 2 a 4 semanas de uso contínuo. Cicatrização tópica: 3 a 7 dias.",
  },
  {
    q: "Posso usar com antibióticos?",
    a:
      "Sim, e em vários estudos potencializa a ação de antibióticos contra cepas resistentes. Espaçar a tomada em 2 horas para não interferir na absorção. Comunicar o médico sempre.",
  },
  {
    q: "Existe risco de alergia?",
    a:
      "Sim. Pessoas alérgicas a abelhas, mel, pólen ou veneno de vespa devem evitar ou testar com dose mínima sob supervisão. Reações graves são raras, mas possíveis.",
  },
];

export default function Propolis() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Própolis: Variações, Protocolos e o Que Realmente Cura | Lord Junnior</title>
        <meta
          name="description"
          content="Manual completo de própolis: verde, vermelho, marrom, preto e amarelo. Composição, indicações, protocolos terapêuticos por dose, contraindicações e preparo caseiro de extrato. Soberania biológica em forma de resina."
        />
        <meta
          name="keywords"
          content="própolis verde, própolis vermelho, própolis brasileiro, artepilin C, isoflavonoide própolis, protocolo própolis, dose própolis, extrato de própolis caseiro, própolis para imunidade, própolis para gastrite, H pylori, soberania biológica"
        />
        <link rel="canonical" href="https://lordjunnior.com.br/soberania-organica/propolis" />
        <meta property="og:title" content="Própolis: Manual Completo de Variações e Protocolos" />
        <meta property="og:description" content="Verde, vermelho, marrom, preto e amarelo. Doses, ciclos, contraindicações e preparo caseiro. Resina ancestral, ciência atual." />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://lordjunnior.com.br/soberania-organica/propolis" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "MedicalWebPage",
          name: "Própolis: Variações, Protocolos e Indicações Terapêuticas",
          url: "https://lordjunnior.com.br/soberania-organica/propolis",
          inLanguage: "pt-BR",
          about: {
            "@type": "Drug",
            name: "Própolis",
            activeIngredient: "Flavonoides, Artepilin C, Isoflavonoides, CAPE",
            mechanismOfAction: "Antibacteriana, antiviral, antifúngica, anti inflamatória, imunomoduladora",
          },
          medicalAudience: "Patient",
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQ.map(f => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        })}</script>
      </Helmet>

      {/* Fundo fixo cinematográfico */}
      <div
        aria-hidden
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(5,8,8,0.88), rgba(5,8,8,0.94)), url(${bgPropolis})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          backgroundRepeat: "no-repeat",
        }}
      />

      <div className="relative z-10 px-6 md:px-12 lg:px-20 pt-[52px]">
        <BackToHome />
      </div>

      <PageFloatingToc items={TOC} accentColor="amber" />

      <main className="relative z-10 text-stone-100 selection:bg-amber-400/30 font-sans">
        {/* HERO ─────────────────────────────────────────── */}
        <section className="relative min-h-[92vh] flex items-end pb-16 md:pb-24 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 w-full">
            <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0}>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-px bg-amber-400/60" />
                <span className="text-amber-400/80 text-[10px] md:text-xs font-bold uppercase tracking-[0.5em]">
                  Manual da Resina, Soberania Biológica
                </span>
              </div>
              <h1
                className="text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-black tracking-tight text-white leading-[0.92]"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                Própolis.
                <br />
                <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-emerald-400 bg-clip-text text-transparent">
                  A farmácia que a colmeia produz.
                </span>
              </h1>
            </motion.div>

            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              custom={1}
              className="mt-10 max-w-3xl"
            >
              <p className="text-stone-300 text-lg md:text-2xl leading-relaxed">
                Cinco variações principais. Mais de 300 compostos bioativos catalogados.
                Antibacteriano, antiviral, antifúngico, anti inflamatório, imunomodulador
                e cicatrizante em uma única resina. Esta é a leitura técnica que
                indústria farmacêutica não vai te entregar.
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              custom={2}
              className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-4xl"
            >
              {[
                { n: "5", l: "Variações principais" },
                { n: "300+", l: "Compostos bioativos" },
                { n: "12", l: "Indicações documentadas" },
                { n: "6", l: "Protocolos práticos" },
              ].map((s, i) => (
                <div
                  key={i}
                  className="border-l-2 border-amber-400/40 pl-4 py-2"
                >
                  <p
                    className="text-3xl md:text-5xl font-black text-amber-300 leading-none"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    {s.n}
                  </p>
                  <p className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-stone-400 mt-2">
                    {s.l}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ESSÊNCIA ─────────────────────────────────────── */}
        <section id="essencia" className="relative py-24 md:py-36 scroll-mt-20">
          <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
            <div className="grid md:grid-cols-12 gap-10 md:gap-16 items-start">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                variants={fadeUp}
                className="md:col-span-5"
              >
                <p className="text-amber-400/80 text-[10px] font-bold uppercase tracking-[0.5em] mb-6">
                  01, Essência
                </p>
                <h2
                  className="text-4xl md:text-6xl font-black tracking-tight leading-[0.95] text-white"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  Resina de defesa,<br />
                  <span className="text-amber-300">refinada por 50 milhões de anos.</span>
                </h2>
              </motion.div>

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                variants={fadeUp}
                custom={1}
                className="md:col-span-7 space-y-6 text-stone-300 text-lg md:text-xl leading-relaxed"
              >
                <p>
                  Própolis é o que as abelhas fazem para selar a colmeia contra
                  fungos, bactérias e vírus. Coletam resina de brotos e cascas,
                  misturam com cera, enzimas salivares e pólen, e produzem um
                  composto vivo, antisséptico, autoadaptável.
                </p>
                <p>
                  Nenhuma molécula sintética isolada copia esse perfil. A
                  combinação de flavonoides, ácidos fenólicos, terpenos e
                  enzimas funciona em sinergia. Tirar uma molécula reduz o
                  efeito do conjunto. Por isso o extrato bruto vence quase
                  sempre o componente isolado em laboratório.
                </p>
                <p className="text-amber-200/90 font-medium pt-2 border-l-2 border-amber-400/40 pl-5">
                  O Brasil produz as variações mais valorizadas do mundo. A
                  exportação para Japão e Europa explica preços altos do
                  produto bruto premium dentro do próprio país.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* IMAGEM CINEMATOGRÁFICA QUEBRA ────────────────── */}
        <section className="relative h-[60vh] md:h-[80vh] overflow-hidden">
          <img
            src={imgColmeia}
            alt="Abelhas trabalhando própolis em colmeia, luz dourada, macro fotografia natural"
            loading="lazy"
            width={1920}
            height={1080}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050808] via-[#050808]/30 to-[#050808]/70" />
          <div className="absolute inset-0 flex items-end pb-12 md:pb-20">
            <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 w-full">
              <p className="text-amber-200/90 text-base md:text-2xl max-w-2xl italic font-light"
                style={{ fontFamily: "'Instrument Serif', serif" }}>
                "A colmeia é o sistema imunológico mais sofisticado da
                natureza. Própolis é a sua arma química."
              </p>
            </div>
          </div>
        </section>

        {/* CIÊNCIA ──────────────────────────────────────── */}
        <section id="ciencia" className="relative py-24 md:py-36 scroll-mt-20">
          <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={fadeUp}
              className="mb-14 max-w-3xl"
            >
              <p className="text-amber-400/80 text-[10px] font-bold uppercase tracking-[0.5em] mb-6">
                02, Ciência
              </p>
              <h2
                className="text-4xl md:text-6xl font-black tracking-tight leading-[0.95] text-white"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                O que age dentro de você.
              </h2>
              <p className="mt-6 text-stone-400 text-lg md:text-xl leading-relaxed">
                Quatro famílias de moléculas explicam o efeito clínico
                consistente em mais de 2.000 estudos publicados.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6 md:gap-8">
              {[
                {
                  t: "Flavonoides",
                  d: "Galangina, pinocembrina, crisina, kaempferol. Antioxidantes potentes. Inibem replicação viral e adesão bacteriana às mucosas.",
                  c: "border-amber-400/40 hover:border-amber-400/80",
                },
                {
                  t: "Ácidos fenólicos",
                  d: "CAPE (éster fenetílico do ácido caféico) e Artepilin C. Modulam NF kB, ação anti inflamatória e antitumoral em estudo.",
                  c: "border-emerald-400/40 hover:border-emerald-400/80",
                },
                {
                  t: "Terpenos e óleos voláteis",
                  d: "Efeito antimicrobiano direto sobre membranas bacterianas e fúngicas. Responsáveis pelo aroma intenso da resina fresca.",
                  c: "border-rose-400/40 hover:border-rose-400/80",
                },
                {
                  t: "Isoflavonoides (vermelho)",
                  d: "Formononetina, biochanina A, vestitol. Exclusivos do própolis vermelho brasileiro. Atuam em receptores hormonais e imunidade.",
                  c: "border-fuchsia-400/40 hover:border-fuchsia-400/80",
                },
              ].map((b, i) => (
                <motion.div
                  key={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-60px" }}
                  variants={fadeUp}
                  custom={i}
                  className={`p-8 md:p-12 rounded-3xl bg-white/[0.03] backdrop-blur-md border ${b.c} transition-all duration-700 hover:-translate-y-1 hover:bg-white/[0.05] hover:shadow-[0_30px_80px_-30px_rgba(251,191,36,0.4)]`}
                >
                  <h3
                    className="text-2xl md:text-4xl font-black text-white mb-4 leading-tight"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    {b.t}
                  </h3>
                  <p className="text-stone-300 text-base md:text-lg leading-relaxed">{b.d}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* VARIAÇÕES ────────────────────────────────────── */}
        <section id="variacoes" className="relative py-24 md:py-36 scroll-mt-20 border-y border-white/[0.05]">
          <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={fadeUp}
              className="mb-16 max-w-3xl"
            >
              <p className="text-amber-400/80 text-[10px] font-bold uppercase tracking-[0.5em] mb-6">
                03, As Cinco Variações
              </p>
              <h2
                className="text-4xl md:text-6xl font-black tracking-tight leading-[0.95] text-white"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                Cada cor,<br />uma farmácia diferente.
              </h2>
              <p className="mt-6 text-stone-400 text-lg md:text-xl leading-relaxed">
                A planta de origem define o composto majoritário. O composto
                define a indicação. Comprar errado é gastar caro em algo que
                não trata o seu caso.
              </p>
            </motion.div>

            <div className="space-y-6 md:space-y-10">
              {VARIACOES.map((v, i) => {
                const isLeft = i % 2 === 0;
                return (
                  <motion.article
                    key={v.nome}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-60px" }}
                    variants={fadeUp}
                    custom={i}
                    className={`grid md:grid-cols-12 gap-6 md:gap-10 rounded-3xl border border-white/[0.07] bg-[#0a0d0c]/60 backdrop-blur-md overflow-hidden p-8 md:p-12 transition-all duration-700 hover:-translate-y-1 hover:border-white/[0.18]`}
                    style={{ boxShadow: `0 20px 60px -30px ${v.badge}40` }}
                  >
                    <div className={`md:col-span-4 flex flex-col justify-between ${isLeft ? "" : "md:order-2"}`}>
                      <div>
                        <span
                          className="inline-block px-3 py-1.5 rounded-full text-[10px] font-bold tracking-[0.3em] uppercase mb-5"
                          style={{ background: `${v.badge}22`, color: v.badge, border: `1px solid ${v.badge}55` }}
                        >
                          Variação 0{i + 1}
                        </span>
                        <h3
                          className={`text-3xl md:text-5xl font-black bg-gradient-to-r ${v.cor} bg-clip-text text-transparent leading-[0.95] mb-4`}
                          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                        >
                          {v.nome}
                        </h3>
                        <p className="text-stone-400 text-sm md:text-base leading-relaxed">{v.fonte}</p>
                      </div>
                      <div className="mt-8 space-y-2 text-xs md:text-sm">
                        <p className="text-stone-500 uppercase tracking-[0.25em]">Origem</p>
                        <p className="text-stone-200">{v.origem}</p>
                        <p className="text-stone-500 uppercase tracking-[0.25em] pt-3">Composto chave</p>
                        <p className="text-stone-200">{v.composto}</p>
                      </div>
                    </div>
                    <div className={`md:col-span-8 ${isLeft ? "" : "md:order-1"} space-y-6`}>
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-[0.35em] mb-3" style={{ color: v.badge }}>
                          Para que serve
                        </p>
                        <p className="text-stone-200 text-lg md:text-xl leading-relaxed">{v.para}</p>
                      </div>
                      <div className="pt-6 border-t border-white/[0.08]">
                        <p className="text-[10px] font-bold uppercase tracking-[0.35em] mb-3 text-amber-300/80">
                          Diferencial técnico
                        </p>
                        <p className="text-stone-300 text-base md:text-lg leading-relaxed italic"
                          style={{ fontFamily: "'Instrument Serif', serif" }}>
                          {v.forte}
                        </p>
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </section>

        {/* INDICAÇÕES ───────────────────────────────────── */}
        <section id="indicacoes" className="relative py-24 md:py-36 scroll-mt-20">
          <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={fadeUp}
              className="mb-16 max-w-3xl"
            >
              <p className="text-amber-400/80 text-[10px] font-bold uppercase tracking-[0.5em] mb-6">
                04, O Que Realmente Cura
              </p>
              <h2
                className="text-4xl md:text-6xl font-black tracking-tight leading-[0.95] text-white"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                Doze indicações com<br />
                <span className="text-amber-300">evidência clínica.</span>
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
              {INDICACOES.map((ind, i) => {
                const Icon = ind.icone;
                return (
                  <motion.div
                    key={i}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-40px" }}
                    variants={fadeUp}
                    custom={i * 0.4}
                    className="group p-7 md:p-8 rounded-2xl bg-white/[0.03] border border-white/[0.07] backdrop-blur-md transition-all duration-500 hover:-translate-y-1 hover:bg-white/[0.06] hover:border-amber-400/30 hover:shadow-[0_20px_60px_-20px_rgba(251,191,36,0.3)]"
                  >
                    <div className="w-12 h-12 rounded-xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center mb-5 group-hover:bg-amber-400/20 transition-colors">
                      <Icon size={20} className="text-amber-300" strokeWidth={2} />
                    </div>
                    <h3
                      className="text-xl md:text-2xl font-bold text-white mb-3 leading-tight"
                      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                      {ind.titulo}
                    </h3>
                    <p className="text-stone-400 text-sm md:text-base leading-relaxed group-hover:text-stone-300 transition-colors">
                      {ind.desc}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* PROTOCOLOS ───────────────────────────────────── */}
        <section id="protocolos" className="relative py-24 md:py-36 scroll-mt-20 border-y border-white/[0.05]">
          <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={fadeUp}
              className="mb-16 max-w-3xl"
            >
              <p className="text-amber-400/80 text-[10px] font-bold uppercase tracking-[0.5em] mb-6">
                05, Protocolos Práticos
              </p>
              <h2
                className="text-4xl md:text-6xl font-black tracking-tight leading-[0.95] text-white"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                Doses, ciclos<br />e janelas reais.
              </h2>
              <p className="mt-6 text-stone-400 text-lg md:text-xl leading-relaxed">
                A maioria das pessoas usa própolis errado, em dose pequena
                demais, sem janela de pausa, e não obtém o efeito esperado.
                Aqui está como se faz de verdade.
              </p>
            </motion.div>

            <div className="space-y-5 md:space-y-6">
              {PROTOCOLOS.map((p, i) => (
                <motion.div
                  key={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-40px" }}
                  variants={fadeUp}
                  custom={i}
                  className="group grid md:grid-cols-12 gap-5 md:gap-8 p-7 md:p-10 rounded-2xl bg-white/[0.03] border border-white/[0.07] backdrop-blur-md hover:bg-white/[0.05] hover:border-amber-400/30 transition-all duration-500"
                >
                  <div className="md:col-span-4 flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-amber-400/10 border border-amber-400/40 flex items-center justify-center font-black text-amber-300 shrink-0"
                      style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                      0{i + 1}
                    </div>
                    <h3
                      className="text-2xl md:text-3xl font-black text-white leading-tight"
                      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                      {p.titulo}
                    </h3>
                  </div>
                  <div className="md:col-span-8 grid sm:grid-cols-2 gap-5 md:gap-6 text-sm md:text-base">
                    <div>
                      <p className="text-amber-300/80 text-[10px] font-bold uppercase tracking-[0.3em] mb-2">Duração</p>
                      <p className="text-stone-200">{p.duracao}</p>
                    </div>
                    <div>
                      <p className="text-amber-300/80 text-[10px] font-bold uppercase tracking-[0.3em] mb-2">Via</p>
                      <p className="text-stone-200">{p.via}</p>
                    </div>
                    <div className="sm:col-span-2">
                      <p className="text-amber-300/80 text-[10px] font-bold uppercase tracking-[0.3em] mb-2">Dose</p>
                      <p className="text-stone-100 font-medium">{p.dose}</p>
                    </div>
                    <div className="sm:col-span-2 pt-3 border-t border-white/[0.07]">
                      <p className="text-amber-300/80 text-[10px] font-bold uppercase tracking-[0.3em] mb-2">Observação tática</p>
                      <p className="text-stone-300">{p.obs}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* PREPARO CASEIRO ──────────────────────────────── */}
        <section id="preparo" className="relative py-24 md:py-36 scroll-mt-20">
          <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
            <div className="grid md:grid-cols-12 gap-10 md:gap-16">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                variants={fadeUp}
                className="md:col-span-5"
              >
                <p className="text-amber-400/80 text-[10px] font-bold uppercase tracking-[0.5em] mb-6">
                  06, Preparo Caseiro
                </p>
                <h2
                  className="text-4xl md:text-6xl font-black tracking-tight leading-[0.95] text-white"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  Extrato próprio,<br /><span className="text-amber-300">independência real.</span>
                </h2>
                <p className="mt-6 text-stone-400 text-lg leading-relaxed">
                  Receita clássica do extrato alcoólico a 30 por cento, padrão de
                  pesquisa. Render, em média, 700 ml de extrato a partir de 300
                  g de própolis bruto.
                </p>
              </motion.div>

              <motion.ol
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                variants={fadeUp}
                custom={1}
                className="md:col-span-7 space-y-5"
              >
                {[
                  { t: "Matéria prima", d: "300 g de própolis bruto, preferir verde ou marrom de produtor confiável. Sem cera em excesso, sem mofo." },
                  { t: "Solvente", d: "1 litro de cachaça de alambique de boa procedência ou álcool de cereais 70 graus, certificado." },
                  { t: "Preparo", d: "Triturar a resina ainda fria. Colocar em frasco âmbar com o álcool. Tampar e agitar bem." },
                  { t: "Maceração", d: "Manter ao abrigo da luz por 14 a 21 dias. Agitar uma vez ao dia. A cor vira marrom escuro intenso." },
                  { t: "Filtragem", d: "Coar em filtro de papel ou tecido fino. Recolher o líquido em frasco âmbar limpo, com conta gotas." },
                  { t: "Validade", d: "Até 24 meses ao abrigo de luz e calor. Cada gota concentra meses de extração viva." },
                ].map((step, i) => (
                  <li
                    key={i}
                    className="group flex gap-5 p-6 rounded-2xl border border-white/[0.07] bg-white/[0.03] backdrop-blur-md hover:border-amber-400/40 hover:bg-white/[0.05] transition-all duration-500 hover:-translate-y-0.5"
                  >
                    <span
                      className="shrink-0 w-12 h-12 rounded-full bg-amber-400/10 border border-amber-400/40 flex items-center justify-center font-black text-amber-300"
                      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                      0{i + 1}
                    </span>
                    <div>
                      <h4 className="text-white font-bold text-lg md:text-xl mb-1.5">{step.t}</h4>
                      <p className="text-stone-300 text-base leading-relaxed">{step.d}</p>
                    </div>
                  </li>
                ))}
              </motion.ol>
            </div>
          </div>
        </section>

        {/* CONTRAINDICAÇÕES ────────────────────────────── */}
        <section id="limites" className="relative py-24 md:py-36 scroll-mt-20 border-y border-white/[0.05]">
          <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={fadeUp}
              className="mb-14 max-w-3xl"
            >
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-rose-500/10 border border-rose-400/30 mb-6">
                <AlertTriangle size={16} className="text-rose-300" />
                <span className="text-rose-300 text-[10px] font-bold uppercase tracking-[0.4em]">
                  Limites e Cuidados
                </span>
              </div>
              <h2
                className="text-4xl md:text-6xl font-black tracking-tight leading-[0.95] text-white"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                O que respeitar<br />antes de começar.
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6 md:gap-8">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                variants={fadeUp}
                className="p-8 md:p-10 rounded-3xl bg-rose-500/[0.04] border border-rose-400/20"
              >
                <h3 className="text-2xl md:text-3xl font-black text-rose-200 mb-6"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  Evitar uso
                </h3>
                <ul className="space-y-4 text-stone-200 text-base md:text-lg">
                  {[
                    "Alergia conhecida a produtos da colmeia: mel, pólen, cera, geleia real.",
                    "Gestantes e lactantes sem orientação médica.",
                    "Crianças menores de 1 ano.",
                    "Uso interno em pessoas com hepatopatia avançada.",
                  ].map((t, i) => (
                    <li key={i} className="flex gap-3">
                      <XCircle size={18} className="text-rose-300 mt-1 shrink-0" />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                variants={fadeUp}
                custom={1}
                className="p-8 md:p-10 rounded-3xl bg-emerald-500/[0.04] border border-emerald-400/20"
              >
                <h3 className="text-2xl md:text-3xl font-black text-emerald-200 mb-6"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  Boas práticas
                </h3>
                <ul className="space-y-4 text-stone-200 text-base md:text-lg">
                  {[
                    "Sempre testar dose mínima nas primeiras 48 horas.",
                    "Respeitar ciclos de 30 dias com pausa de 7 a 10.",
                    "Espaçar 2 horas de qualquer medicamento de uso contínuo.",
                    "Comprar de produtor identificado, com selo SIF ou IF.",
                  ].map((t, i) => (
                    <li key={i} className="flex gap-3">
                      <CheckCircle2 size={18} className="text-emerald-300 mt-1 shrink-0" />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="mt-10 p-8 rounded-2xl bg-amber-400/[0.04] border border-amber-400/20"
            >
              <p className="text-amber-100/90 text-base md:text-lg leading-relaxed">
                <strong className="text-amber-300">Aviso técnico.</strong> Este conteúdo é educacional. Não substitui
                avaliação médica. Quadros agudos, infecções graves, doenças
                crônicas e gestação exigem acompanhamento profissional.
                Própolis é coadjuvante poderoso, não substituto de tratamento.
              </p>
            </motion.div>
          </div>
        </section>

        {/* FAQ ──────────────────────────────────────────── */}
        <section id="faq" className="relative py-24 md:py-36 scroll-mt-20">
          <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={fadeUp}
              className="mb-14 max-w-3xl"
            >
              <p className="text-amber-400/80 text-[10px] font-bold uppercase tracking-[0.5em] mb-6">
                07, Perguntas Reais
              </p>
              <h2
                className="text-4xl md:text-6xl font-black tracking-tight leading-[0.95] text-white"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                Dúvidas que separam<br />curioso de praticante.
              </h2>
            </motion.div>

            <div className="space-y-4 md:space-y-5">
              {FAQ.map((f, i) => (
                <motion.details
                  key={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-40px" }}
                  variants={fadeUp}
                  custom={i * 0.4}
                  className="group rounded-2xl border border-white/[0.07] bg-white/[0.03] backdrop-blur-md hover:border-amber-400/30 transition-colors overflow-hidden"
                >
                  <summary className="cursor-pointer list-none p-6 md:p-8 flex items-center justify-between gap-6">
                    <h3 className="text-lg md:text-2xl font-bold text-white leading-tight"
                      style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                      {f.q}
                    </h3>
                    <ChevronRight size={22} className="text-amber-300 shrink-0 transition-transform duration-300 group-open:rotate-90" />
                  </summary>
                  <div className="px-6 md:px-8 pb-7 md:pb-8 text-stone-300 text-base md:text-lg leading-relaxed">
                    {f.a}
                  </div>
                </motion.details>
              ))}
            </div>
          </div>
        </section>

        {/* CTA FINAL ────────────────────────────────────── */}
        <section className="relative py-28 md:py-40 border-t border-amber-400/10">
          <div className="max-w-5xl mx-auto px-6 md:px-12 text-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
            >
              <p className="text-amber-300 text-xs font-bold uppercase tracking-[0.5em] mb-8">
                Soberania Biológica
              </p>
              <h2
                className="text-4xl md:text-7xl font-black text-white leading-[0.95] tracking-tight mb-8"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                Quem domina a resina,<br />
                <span className="bg-gradient-to-r from-amber-300 to-emerald-400 bg-clip-text text-transparent">
                  reduz a dependência.
                </span>
              </h2>
              <p className="text-stone-300 text-lg md:text-2xl leading-relaxed max-w-3xl mx-auto mb-12">
                A colmeia produz há 50 milhões de anos algo que a indústria
                tenta sintetizar há 80 e ainda não conseguiu copiar.
                O caminho começa com um frasco escuro e uma escolha consciente.
              </p>
              <a
                href="/soberania-organica"
                className="inline-flex items-center gap-3 px-8 md:px-12 py-5 md:py-6 rounded-full border-2 border-amber-400/60 bg-amber-400/10 text-amber-200 font-bold text-base md:text-lg uppercase tracking-[0.25em] transition-all duration-500 hover:bg-amber-400/20 hover:border-amber-400 hover:gap-5 hover:-translate-y-1"
              >
                Voltar ao Manual da Terra
                <ChevronRight size={20} />
              </a>
            </motion.div>
          </div>
        </section>
      </main>
    </>
  );
}
