import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, Calendar, AlertTriangle, Vault, Lock, Users, Scale, TrendingDown, BookOpen, ShieldAlert, DollarSign, Clock, UserX } from "lucide-react";
import ConfiscoFaq from "@/components/confisco/ConfiscoFaq";
import ConfiscoCitations from "@/components/confisco/ConfiscoCitations";
import ScrollProgressBar from "@/components/confisco/ScrollProgressBar";
import FloatingToc from "@/components/confisco/FloatingToc";
import ScrollToTop from "@/components/ScrollToTop";
import BackToHome from "@/components/BackToHome";
import SnippetBait from "@/components/SnippetBait";
import { confiscoArticleSchema, confiscoFaqSchema, confiscoBreadcrumbSchema } from "@/lib/confiscoData";
import presidenteImg from "@/assets/presidente-confisco-1990.jpg";
import hiperinflacaoImg from "@/assets/confisco-hiperinflacao-1989.jpg";
import decretoImg from "@/assets/confisco-decreto-noite.jpg";
import filasImg from "@/assets/confisco-filas-banco.jpg";
import consequenciasImg from "@/assets/confisco-consequencias.jpg";
import dinheiroImg from "@/assets/confisco-dinheiro-perdido.jpg";
import constituicaoImg from "@/assets/confisco-constituicao.jpg";
import bitcoinImg from "@/assets/confisco-bitcoin-solucao.jpg";

const chapters = [
  {
    id: "cap-1",
    phase: "CAPÍTULO 1",
    title: "O Cenário: Brasil, 1989",
    icon: Calendar,
    image: hiperinflacaoImg,
    imageAlt: "Supermercado lotado durante hiperinflação brasileira de 1989",
    content: [
      "O Brasil vivia uma hiperinflação que ultrapassava 80% ao mês. Os preços mudavam várias vezes por dia. Supermercados remarcavam produtos enquanto os clientes ainda estavam nas filas. A moeda perdia valor tão rápido que as pessoas corriam para gastar o salário no mesmo dia em que recebiam.",
      "A população estava desesperada. Qualquer político que prometesse acabar com a inflação teria o voto de milhões. Foi exatamente isso que aconteceu.",
      "Fernando Collor de Mello, um político jovem e carismático, venceu as eleições com a promessa de combater a inflação e modernizar o país. Tomou posse em 15 de março de 1990. No dia seguinte, o Brasil nunca mais seria o mesmo.",
    ],
  },
  {
    id: "cap-2",
    phase: "CAPÍTULO 2",
    title: "A Noite Antes do Confisco",
    icon: Vault,
    image: decretoImg,
    imageAlt: "Mesa presidencial com decreto sendo assinado na escuridão",
    content: [
      "Na noite de 15 de março de 1990, enquanto milhões de brasileiros dormiam, a equipe econômica de Collor, liderada pela ministra Zélia Cardoso de Mello, finalizava os detalhes do Plano Collor.",
      "Nenhum cidadão foi avisado. Nenhum jornal antecipou. Nenhum congressista votou. O decreto foi assinado usando o mecanismo de Medida Provisória, que tem força de lei imediata, sem necessidade de aprovação legislativa prévia.",
      "Enquanto você dormia, o presidente da república assinava um papel que confiscava o seu dinheiro.",
    ],
  },
  {
    id: "cap-3",
    phase: "CAPÍTULO 3",
    title: "16 de Março, 1990: O Dia em que o Brasil Acordou Sem Nada",
    icon: Lock,
    image: filasImg,
    imageAlt: "Filas desesperadas em frente a bancos brasileiros em 1990",
    content: [
      "Na manhã de 16 de março, os brasileiros descobriram que não tinham mais acesso ao próprio dinheiro. Contas correntes, poupanças, aplicações financeiras: tudo acima de NCz$ 50.000 (equivalente a cerca de US$ 1.200 na época) foi bloqueado por 18 meses.",
      "Não importava se o dinheiro era para pagar o aluguel, comprar remédios, pagar funcionários ou alimentar a família. O governo decidiu que aquele dinheiro não era mais seu.",
      "Filas enormes se formaram nos bancos. Pessoas choravam. Idosos que tinham guardado uma vida inteira de economia viram tudo desaparecer de uma hora para outra. Empresários não conseguiam pagar salários. Pequenos negócios fecharam em semanas.",
      "O evento ficou conhecido como o confisco da poupança do Plano Collor. Estima-se que o governo confiscou o equivalente a US$ 80 bilhões da população, aproximadamente 80% de toda a liquidez do sistema financeiro brasileiro.",
    ],
  },
  {
    id: "cap-4",
    phase: "CAPÍTULO 4",
    title: "As Consequências Humanas",
    icon: Users,
    image: consequenciasImg,
    imageAlt: "Mãos de idoso segurando carteira vazia sobre extrato bancário",
    content: [
      "O confisco não foi apenas um evento econômico. Foi uma tragédia humana.",
      "Pessoas cometeram suicídio ao descobrir que perderam tudo. Idosos morreram sem conseguir pagar tratamentos médicos. Casamentos se desfizeram pela pressão financeira. Crianças foram tiradas de escolas. Famílias inteiras passaram fome.",
      "O empresário Sérgio Saraiva, dono de uma rede de supermercados em São Paulo, se matou dias após o confisco. Ele não conseguia pagar seus 500 funcionários. Sua história se repetiu milhares de vezes pelo país.",
      "Para quem viveu aquele período, a palavra 'confisco' não é um conceito acadêmico. É uma cicatriz que nunca cicatrizou.",
    ],
  },
  {
    id: "cap-5",
    phase: "CAPÍTULO 5",
    title: "O Dinheiro Nunca Voltou (Como Prometido)",
    icon: TrendingDown,
    image: dinheiroImg,
    imageAlt: "Notas de cruzado se desintegrando em pó sobre mesa de madeira",
    content: [
      "O governo prometeu devolver o dinheiro bloqueado em 18 meses, corrigido monetariamente. Na prática, a devolução foi feita em parcelas, ao longo de anos, com correção abaixo da inflação real.",
      "Quem tinha NCz$ 100.000 bloqueados recebeu de volta o equivalente a uma fração do poder de compra original. O confisco da poupança foi, na prática, uma transferência forçada de riqueza da população para o governo.",
      "A inflação, que o plano prometia eliminar, voltou com força meses depois. O Plano Collor fracassou em todos os seus objetivos declarados, mas cumpriu perfeitamente o objetivo real: confiscar a riqueza da população.",
    ],
  },
  {
    id: "cap-6",
    phase: "CAPÍTULO 6",
    title: "O Mecanismo Legal Ainda Existe",
    icon: Scale,
    image: constituicaoImg,
    imageAlt: "Constituição brasileira aberta no Artigo 62 com martelo de juiz",
    content: [
      "O artigo 62 da Constituição Federal, que permitiu o confisco via Medida Provisória, nunca foi revogado. Ele continua ativo, exatamente como estava em 1990.",
      "Isso significa que, tecnicamente, o mesmo mecanismo jurídico que permitiu o confisco de 80% da liquidez nacional pode ser usado novamente. A qualquer momento. Por qualquer presidente.",
      "O PL 3.951/2019, que cria limites para transações em dinheiro vivo, é apenas o próximo capítulo dessa mesma história. Primeiro eliminam o dinheiro físico. Depois controlam o digital. O padrão é sempre o mesmo: concentração de poder sobre o seu patrimônio.",
    ],
  },
  {
    id: "cap-7",
    phase: "CAPÍTULO 7",
    title: "A Lição que Ninguém Ensina",
    icon: BookOpen,
    image: bitcoinImg,
    imageAlt: "Bitcoin dourado emergindo da escuridão entre correntes quebradas",
    content: [
      "O confisco de 1990 prova três verdades que o sistema educacional brasileiro nunca vai ensinar:",
      "Primeira: o dinheiro no banco não é seu. É uma promessa de devolução que pode ser quebrada a qualquer momento por quem controla o sistema.",
      "Segunda: nenhum governo na história jamais resistiu à tentação de confiscar quando precisa de dinheiro. Se o mecanismo legal existe, ele será usado.",
      "Terceira: a única proteção real contra o confisco é possuir ativos que nenhum governo pode bloquear, congelar ou confiscar. Em 1990, essa tecnologia não existia. Hoje, ela se chama Bitcoin.",
    ],
  },
];

const impactStats = [
  { icon: DollarSign, value: "US$ 80 bi", label: "confiscados da população" },
  { icon: ShieldAlert, value: "80%", label: "da liquidez do sistema bloqueada" },
  { icon: Clock, value: "18 meses", label: "de bloqueio total" },
  { icon: UserX, value: "Milhões", label: "de contas afetadas" },
];

/* ── Parallax Chapter Image ── */
const ChapterImage = ({ src, alt, index }: { src: string; alt: string; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 1.02 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      className="relative w-full h-48 md:h-60 rounded-xl overflow-hidden my-4"
    >
      <motion.img
        src={src}
        alt={alt}
        style={{ y }}
        className="absolute inset-0 w-full h-[120%] object-cover -top-[10%]"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/15 to-transparent" />
      <div className={`absolute inset-0 ${isEven ? 'bg-gradient-to-r' : 'bg-gradient-to-l'} from-background/70 via-transparent to-background/30`} />
      <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,hsl(var(--background)/0.5)_100%)]" />
    </motion.div>
  );
};

const Confisco1990 = () => {
  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      <Helmet>
        <title>Confisco de 1990: A História Real do Plano Collor</title>
        <meta name="description" content="Em 16 de março de 1990, o governo brasileiro confiscou 80% do dinheiro da população com o Plano Collor. O confisco da poupança bloqueou US$ 80 bilhões. Esta é a história completa." />
        <meta name="keywords" content="plano collor confisco, confisco poupança 1990, plano collor dinheiro bloqueado, confisco da poupança brasil, história plano collor, confisco collor" />
        <link rel="canonical" href="https://lordjunnior.com.br/confisco-1990" />
        <meta property="og:title" content="Confisco de 1990: A História Real do Plano Collor" />
        <meta property="og:description" content="80% do dinheiro da população bloqueado por decreto. A história que o sistema educacional brasileiro nunca vai ensinar." />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://lordjunnior.com.br/confisco-1990" />
        <script type="application/ld+json">{JSON.stringify(confiscoArticleSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(confiscoFaqSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(confiscoBreadcrumbSchema)}</script>
      </Helmet>

      <BackToHome />
      <ScrollToTop />

      {/* ── Scroll Progress Bar ── */}
      <ScrollProgressBar />

      {/* ── Floating Table of Contents ── */}
      <FloatingToc />

      {/* ── Global Background Layers ── */}
      {/* Film grain */}
      <div 
        className="fixed inset-0 pointer-events-none z-[1] opacity-[0.035]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '128px 128px',
        }}
      />
      {/* Ambient documentary glows */}
      <div className="fixed inset-0 pointer-events-none z-[1] bg-[radial-gradient(ellipse_at_30%_20%,hsl(0_84%_60%/0.04)_0%,transparent_55%)]" />
      <div className="fixed inset-0 pointer-events-none z-[1] bg-[radial-gradient(ellipse_at_70%_80%,hsl(0_84%_60%/0.03)_0%,transparent_50%)]" />
      {/* Light beam (cinematic) */}
      <div className="fixed inset-0 pointer-events-none z-[1] bg-[linear-gradient(120deg,transparent_40%,hsl(0_0%_100%/0.02)_50%,transparent_60%)]" />
      {/* Vertical depth rhythm */}
      <div className="fixed inset-0 pointer-events-none z-[1] bg-[linear-gradient(180deg,hsl(222_47%_4%/0)_0%,hsl(0_84%_60%/0.02)_25%,hsl(222_47%_4%/0)_50%,hsl(0_84%_60%/0.015)_75%,hsl(222_47%_4%/0)_100%)]" />

      {/* ── Content ── */}
      <div className="relative z-[2]">

        {/* Hero */}
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <img
              src={presidenteImg}
              alt="Presidente com faixa presidencial, 1990"
              className="w-full h-full object-cover object-center opacity-50" loading="eager" fetchPriority="high" decoding="async" />
            <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/70 to-background" />
            <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-background/80" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <p className="font-mono text-[10px] tracking-[0.5em] uppercase text-destructive mb-6">
                16 DE MARÇO DE 1990
              </p>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight leading-[0.9] mb-6">
                ELE ASSINOU.
                <br />
                <span className="text-destructive">VOCÊ PERDEU TUDO.</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-4">
                A história real do maior confisco da história do Brasil.
                80% do dinheiro da população, bloqueado por um decreto assinado enquanto você dormia.
              </p>
              <p className="font-mono text-xs text-muted-foreground/60 tracking-widest">
                O MECANISMO LEGAL AINDA ESTÁ ATIVO
              </p>
            </motion.div>
          </div>

          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <div className="w-px h-12 bg-gradient-to-b from-muted-foreground/40 to-transparent" />
          </motion.div>
        </section>

        {/* SnippetBait */}
        <div className="max-w-7xl mx-auto px-6">
          <SnippetBait
            text="Em 1990, bastou uma assinatura para confiscar 80% do dinheiro da população. O mecanismo legal ainda existe. A diferença é que hoje existe um ativo que nenhum decreto pode bloquear."
            cta="Aprenda autocustódia Bitcoin →"
            href="/autocustodia"
          />
        </div>

        {/* Impact Stats */}
        <section className="max-w-7xl mx-auto px-6 -mt-8 relative z-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="p-6 md:p-8 rounded-2xl border border-destructive/20 bg-gradient-to-b from-destructive/10 via-destructive/5 to-background/80 backdrop-blur-sm"
          >
            <p className="font-mono text-[10px] tracking-[0.5em] uppercase text-destructive/70 text-center mb-6">
              O QUE FOI BLOQUEADO
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {impactStats.map((stat, i) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.8, filter: "blur(8px)" }}
                    whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                    className="relative group border border-destructive/15 bg-destructive/5 rounded-xl p-5 text-center space-y-2 hover:border-destructive/40 transition-all duration-500"
                  >
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-destructive/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <Icon className="w-6 h-6 text-destructive mx-auto relative z-10" />
                    <p className="text-xl md:text-2xl font-black text-foreground relative z-10">{stat.value}</p>
                    <p className="text-xs text-muted-foreground leading-tight relative z-10">{stat.label}</p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </section>

        {/* Connector */}
        <div className="relative max-w-7xl mx-auto">
          <div className="absolute left-1/2 -translate-x-1/2 top-0 w-px h-32 bg-gradient-to-b from-destructive/20 to-transparent" />
        </div>

        {/* Chapters */}
        <div className="max-w-7xl mx-auto px-6 py-16 space-y-24">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar ao início
          </Link>

          {chapters.map((chapter, i) => {
            const Icon = chapter.icon;
            const isEvenChapter = i % 2 !== 0;
            return (
              <motion.article
                key={i}
                id={chapter.id}
                initial={{ opacity: 0, y: 40, filter: "blur(6px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                className={`space-y-4 relative rounded-2xl ${isEvenChapter ? 'bg-[hsl(222_47%_5.5%)]' : ''} ${isEvenChapter ? 'p-6 md:p-8 -mx-2 md:-mx-4' : ''}`}
              >
                {/* Glow lateral */}
                <div className={`absolute ${isEvenChapter ? 'left-2 md:left-4' : '-left-4'} top-0 w-1 h-full bg-gradient-to-b from-destructive/30 via-destructive/10 to-transparent rounded-full`} />
                
                {/* Ambient glow */}
                <div className="absolute -inset-12 bg-[radial-gradient(ellipse_at_center,hsl(0_84%_60%/0.03)_0%,transparent_70%)] pointer-events-none" />

                <div className="flex items-center gap-3 mb-2 relative">
                  <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    className="w-10 h-10 rounded-lg border border-destructive/20 bg-destructive/5 flex items-center justify-center"
                  >
                    <Icon className="w-5 h-5 text-destructive" />
                  </motion.div>
                  <div>
                    <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-destructive/60">
                      {chapter.phase}
                    </p>
                    <h2 className="text-xl md:text-2xl font-bold tracking-tight">
                      {chapter.title}
                    </h2>
                  </div>
                </div>

                <div className="h-px bg-gradient-to-r from-destructive/30 via-border/50 to-transparent" />

                <ChapterImage src={chapter.image} alt={chapter.imageAlt} index={i} />

                <div className="space-y-5">
                  {chapter.content.map((paragraph, j) => (
                    <motion.p
                      key={j}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.15 + j * 0.08, ease: [0.22, 1, 0.36, 1] }}
                      className="text-base md:text-lg text-muted-foreground leading-relaxed relative"
                    >
                      {paragraph}
                    </motion.p>
                  ))}
                </div>

                {i < chapters.length - 1 && !isEvenChapter && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="pt-8 flex items-center justify-center gap-2"
                  >
                    <div className="h-px w-8 bg-destructive/20" />
                    <div className="w-1.5 h-1.5 rounded-full bg-destructive/30" />
                    <div className="h-px w-8 bg-destructive/20" />
                  </motion.div>
                )}
              </motion.article>
            );
          })}

          {/* ══════════════════════════════════════ */}
          {/* TRANSITION: 1990 → HOJE               */}
          {/* ══════════════════════════════════════ */}
          <motion.div
            id="transicao"
            initial={{ opacity: 0, scale: 0.92, filter: "blur(12px)" }}
            whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="relative overflow-hidden rounded-2xl py-20 md:py-28 px-8 md:px-16 text-center -mx-6 md:-mx-12"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-destructive/20 via-destructive/8 to-background rounded-2xl" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(0_84%_60%/0.15)_0%,transparent_60%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(0_84%_60%/0.1)_0%,transparent_50%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,hsl(40_92%_56%/0.05)_0%,transparent_50%)]" />
            
            <div className="absolute inset-0 rounded-2xl border border-destructive/25" />
            
            <motion.div
              className="absolute inset-2 rounded-xl border border-destructive/15"
              animate={{ opacity: [0.3, 0.7, 0.3] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            />

            {/* Corner accents */}
            {[
              "top-0 left-0",
              "top-0 right-0",
              "bottom-0 left-0",
              "bottom-0 right-0",
            ].map((pos, i) => (
              <div key={i} className={`absolute ${pos} w-16 h-16`}>
                <div className={`absolute ${pos.includes("top") ? "top-0" : "bottom-0"} ${pos.includes("left") ? "left-0" : "right-0"} w-full h-px bg-gradient-to-${pos.includes("left") ? "r" : "l"} from-destructive/50 to-transparent`} />
                <div className={`absolute ${pos.includes("top") ? "top-0" : "bottom-0"} ${pos.includes("left") ? "left-0" : "right-0"} h-full w-px bg-gradient-to-${pos.includes("top") ? "b" : "t"} from-destructive/50 to-transparent`} />
              </div>
            ))}

            <div className="relative z-10 space-y-10">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="font-mono text-base md:text-lg tracking-[0.5em] uppercase text-destructive font-bold"
              >
                1990: NÃO EXISTIA ALTERNATIVA
              </motion.p>

              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="h-px w-32 mx-auto bg-gradient-to-r from-transparent via-destructive/40 to-transparent origin-center"
              />
              
              <motion.h3
                initial={{ opacity: 0, scale: 0.7, filter: "blur(10px)" }}
                whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="text-5xl md:text-6xl lg:text-8xl font-black uppercase tracking-tight leading-none text-foreground"
              >
                Hoje existe.
              </motion.h3>
              
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "160px" }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.8 }}
                className="h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto"
              />
              
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.9 }}
                className="text-muted-foreground max-w-xl mx-auto leading-relaxed text-lg md:text-xl"
              >
                Pela primeira vez na história, existe uma tecnologia que permite guardar patrimônio sem depender de bancos, governos ou decretos.
              </motion.p>
              
              <motion.p
                initial={{ opacity: 0, y: 15, filter: "blur(6px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 1.1 }}
                className="text-primary font-black text-3xl md:text-4xl tracking-tight"
              >
                Essa tecnologia se chama Bitcoin.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 1.3 }}
                className="text-muted-foreground max-w-lg mx-auto text-sm leading-relaxed"
              >
                O governo pode programar seu dinheiro, mas não pode programar o que ele não vê.{" "}
                <Link to="/comprar-bitcoin-com-privacidade" className="text-primary font-semibold hover:underline underline-offset-4 transition-colors">
                  Aprenda o Protocolo de Privacidade →
                </Link>
              </motion.p>
            </div>
          </motion.div>

          {/* Final CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative overflow-hidden border border-destructive/30 rounded-2xl bg-gradient-to-b from-destructive/10 to-destructive/5 p-8 md:p-12 text-center space-y-6"
          >
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(var(--destructive)/0.15)_0%,transparent_60%)]" />
            <div className="relative z-10 space-y-6">
              <motion.div
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              >
                <AlertTriangle className="w-12 h-12 text-destructive mx-auto" />
              </motion.div>
              <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight">
                Quanto do seu patrimônio está a uma assinatura de distância de desaparecer?
              </h3>
              <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed">
                Em 1990 não existia alternativa. Hoje existe.
                O Bitcoin é a única tecnologia que garante que nenhum presidente, nenhum decreto e nenhuma medida provisória pode tocar no seu dinheiro.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Link
                  to="/autocustodia"
                  className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-bold px-8 py-3.5 rounded-lg text-sm tracking-wide hover:bg-primary/90 transition-all duration-300 hover:shadow-[0_0_20px_hsl(var(--primary)/0.3)]"
                >
                  Descobrir Como Proteger Meu Patrimônio
                </Link>
                <Link
                  to="/historia-do-dinheiro"
                  className="inline-flex items-center justify-center gap-2 border border-border bg-background font-bold px-8 py-3.5 rounded-lg text-sm tracking-wide hover:bg-card hover:border-foreground/20 transition-all duration-300"
                >
                  Entender a História Completa
                </Link>
              </div>
            </div>
          </motion.div>

          {/* FAQ */}
          <div id="faq">
            <ConfiscoFaq />
          </div>

          {/* Citations */}
          <ConfiscoCitations />

          {/* Internal Linking */}
          <motion.nav
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-4"
            aria-label="Conteúdo relacionado"
          >
            <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-primary/70">
              CONTINUE A JORNADA
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { to: "/autocustodia", label: "Autocustódia Bitcoin", desc: "Proteja seu patrimônio" },
                { to: "/historia-do-dinheiro", label: "História do Dinheiro", desc: "De onde viemos" },
                { to: "/inflacao-imposto-oculto", label: "Inflação: Imposto Oculto", desc: "Como roubam seu poder de compra" },
                { to: "/cbdc-brasil", label: "CBDC Brasil: Drex", desc: "O próximo capítulo do controle" },
                { to: "/fim-do-dinheiro-vivo", label: "Fim do Dinheiro Físico", desc: "A proibição em andamento" },
                { to: "/bitcoin/o-que-e", label: "O que é Bitcoin?", desc: "A alternativa descentralizada" },
              ].map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="group border border-border rounded-xl p-4 bg-card hover:border-primary/40 hover:bg-card/80 transition-all duration-300"
                >
                  <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                    {link.label}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">{link.desc}</p>
                </Link>
              ))}
            </div>
          </motion.nav>

          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="pt-8">
            <ol className="flex items-center gap-2 text-xs text-muted-foreground/50 font-mono">
              <li><Link to="/" className="hover:text-foreground transition-colors">Início</Link></li>
              <li>/</li>
              <li><Link to="/alertas" className="hover:text-foreground transition-colors">Alertas</Link></li>
              <li>/</li>
              <li className="text-muted-foreground">Confisco 1990</li>
            </ol>
          </nav>

          {/* Footer */}
          <footer className="pt-8 border-t border-border/20 text-center space-y-6">
            <p className="text-muted-foreground font-mono text-xs tracking-widest uppercase">
              Quem não conhece a história está condenado a repeti-la.
            </p>
            <p className="text-foreground/40 text-[9px] font-mono tracking-[0.5em] uppercase">
              Lord Junnior © 2026
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Confisco1990;
