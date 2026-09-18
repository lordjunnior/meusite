import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ArrowLeft, Building2, TrendingUp, Wallet, Scale, AlertTriangle, Quote } from "lucide-react";
import heroImg from "@/assets/mercado-tradicional/hero-fiis-ricos.webp";
import baleiaImg from "@/assets/mercado-tradicional/baleia-cardume.webp";
import torresImg from "@/assets/mercado-tradicional/torres-comerciais.webp";
import banheiraImg from "@/assets/mercado-tradicional/banheira-oceano.webp";
import rendaImg from "@/assets/mercado-tradicional/renda-mensal-casal.webp";
import trocaImg from "@/assets/mercado-tradicional/troca-cota-imovel.webp";

const SAND = "#faf6f0";
const SAND_DEEP = "#ece2d3";
const TEAL = "#0e3b3a";
const TEAL_SOFT = "#1a4a48";
const COPPER = "#c4632a";
const COPPER_LIGHT = "#ffb37a";
const INK = "#171612";

const APPLE_EASE = [0.22, 1, 0.36, 1] as const;

const SectionTitle: React.FC<{ kicker: string; children: React.ReactNode; light?: boolean }> = ({ kicker, children, light }) => (
  <div className="mb-10">
    <div className="text-[10px] font-bold tracking-[0.4em] uppercase mb-4" style={{ color: light ? COPPER_LIGHT : COPPER }}>
      {kicker}
    </div>
    <h2
      className="text-4xl md:text-6xl lg:text-7xl leading-[0.95]"
      style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 900, color: light ? SAND : INK, letterSpacing: "-0.02em" }}
    >
      {children}
    </h2>
  </div>
);

const Analogy: React.FC<{ children: React.ReactNode; light?: boolean }> = ({ children, light }) => (
  <div
    className="border-l-4 pl-6 md:pl-8 py-2 my-8"
    style={{ borderColor: COPPER }}
  >
    <div className="text-[10px] font-bold tracking-[0.3em] uppercase mb-3" style={{ color: COPPER }}>
      Analogia
    </div>
    <p
      className="text-xl md:text-2xl leading-relaxed"
      style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", color: light ? SAND : INK }}
    >
      {children}
    </p>
  </div>
);

const RicosNaoInvestemFiis: React.FC = () => {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -160]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.18]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Por que os ricos não investem em FIIs? A verdade que a manchete não conta",
    description:
      "A análise completa do dado que viralizou: 74% dos cotistas de fundos imobiliários são pessoa física. Por que os bilionários ficam de fora, o que isso significa de verdade e para quem o FII faz sentido.",
    image: typeof window !== "undefined" ? window.location.origin + heroImg : heroImg,
    datePublished: "2026-05-29",
    author: { "@type": "Person", name: "Lord Junnior" },
    publisher: { "@type": "Organization", name: "Lord Junnior" },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Os ricos realmente não investem em FIIs?",
        acceptedAnswer: { "@type": "Answer", text: "Investem, mas em proporção menor. 21% da base de cotistas é institucional. O ponto é que o produto foi desenhado para renda recorrente, não para ganho de capital explosivo, que é o que mais atrai gestores bilionários." },
      },
      {
        "@type": "Question",
        name: "FIIs são um investimento ruim por isso?",
        acceptedAnswer: { "@type": "Answer", text: "Não. Significa apenas que o objetivo é diferente. Para pessoa física buscando renda mensal previsível e exposição a imóveis sem ter que gerir inquilino, vacância e reforma, o FII é um dos veículos mais eficientes do Brasil." },
      },
      {
        "@type": "Question",
        name: "Por que falta liquidez nos FIIs para investidor institucional?",
        acceptedAnswer: { "@type": "Answer", text: "O volume diário do mercado de FIIs gira em torno de R$ 519 milhões. O mercado de ações negocia cerca de R$ 25,8 bilhões por dia. Uma gestora que precisa entrar com R$ 200 milhões em um único FII pressiona o preço para cima. Para entrar e sair rápido, simplesmente não cabe." },
      },
      {
        "@type": "Question",
        name: "Comparar 74% de cotistas com 14% de estoque em ações faz sentido?",
        acceptedAnswer: { "@type": "Answer", text: "Não, são unidades de medida diferentes. Uma fala de pessoas, a outra de patrimônio. A matéria original misturou as duas, o que confunde. Quando se compara patrimônio com patrimônio, a diferença existe, mas é menor do que parece." },
      },
      {
        "@type": "Question",
        name: "O que é troca de cota por imóvel e por que pode derrubar o preço?",
        acceptedAnswer: { "@type": "Answer", text: "O fundo compra um imóvel e paga ao vendedor em cotas do próprio fundo, em vez de dinheiro. O vendedor que não queria cotas, queria dinheiro, vai ao mercado vender, gerando pressão vendedora. O TRXF11 é o caso citado pelo Santander como exemplo." },
      },
      {
        "@type": "Question",
        name: "FII protege contra inflação?",
        acceptedAnswer: { "@type": "Answer", text: "Em parte. Os contratos de aluguel costumam ser indexados a IPCA ou IGP-M, então a renda acompanha a inflação. Mas o capital nominal segue exposto à moeda fiat, ou seja, perde poder de compra de longo prazo na mesma medida em que o real perde valor. É renda, não reserva de valor." },
      },
    ],
  };

  return (
    <div style={{ backgroundColor: SAND, color: INK, fontFamily: "'Inter Tight', sans-serif" }}>
      <Helmet>
        <title>Por que os ricos não investem em FIIs? A verdade por trás do dado</title>
        <meta
          name="description"
          content="74% dos cotistas de fundos imobiliários são pessoa física. Por que os bilionários ficam de fora, o que isso de fato significa e para quem o FII faz sentido. Análise completa."
        />
        <link rel="canonical" href="https://lordjunnior.com.br/mercado-tradicional/ricos-nao-investem-fiis" />
        <meta property="og:title" content="Por que os ricos não investem em FIIs?" />
        <meta property="og:description" content="A verdade por trás do dado que viralizou. Liquidez, escala e o motivo real de o institucional ficar fora." />
        <meta property="og:image" content={heroImg} />
        <meta property="og:type" content="article" />
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      {/* ── HERO full-bleed 88vh+ parallax ── */}
      <section ref={heroRef} className="relative w-full overflow-hidden" style={{ height: "92vh", minHeight: 720, backgroundColor: TEAL }}>
        <motion.div className="absolute inset-0" style={{ y: heroY, scale: heroScale }}>
          <img
            src={heroImg}
            alt="Investidor solitário em corredor de mármore com luz dourada do entardecer, metáfora do investidor pessoa física diante do sistema financeiro"
           
            className="absolute inset-0 w-full h-full object-cover"
            style={{ filter: "brightness(0.78) saturate(1.05)" }} loading="eager" fetchPriority="high" decoding="async" />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(14,59,58,0.25) 0%, rgba(14,59,58,0.35) 50%, rgba(14,59,58,0.85) 100%)",
            }}
          />
        </motion.div>

        <motion.div className="relative z-10 h-full w-full flex flex-col justify-end px-6 md:px-14 lg:px-20 pb-16 md:pb-24 max-w-[1600px] mx-auto" style={{ opacity: heroOpacity }}>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.3em] mb-10 transition-opacity hover:opacity-70"
            style={{ color: COPPER_LIGHT }}
          >
            <ArrowLeft size={14} /> Lord Junnior
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: APPLE_EASE }}
            className="text-[10px] font-bold tracking-[0.5em] uppercase mb-6"
            style={{ color: COPPER_LIGHT }}
          >
            Mercado Tradicional · Análise
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0)" }}
            transition={{ duration: 1, delay: 0.15, ease: APPLE_EASE }}
            className="max-w-6xl"
            style={{
              fontFamily: "'Inter Tight', sans-serif",
              fontWeight: 900,
              color: SAND,
              fontSize: "clamp(2.75rem, 8.5vw, 7.5rem)",
              lineHeight: 0.92,
              letterSpacing: "-0.025em",
            }}
          >
            Por que os ricos{" "}
            <span
              style={{
                fontFamily: "'Playfair Display', serif",
                fontStyle: "italic",
                fontWeight: 400,
                color: COPPER_LIGHT,
              }}
            >
              não investem
            </span>{" "}
            em FIIs?
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: APPLE_EASE }}
            className="mt-8 max-w-3xl text-lg md:text-2xl leading-relaxed"
            style={{ color: "rgba(244,237,228,0.88)", fontWeight: 300 }}
          >
            74% dos cotistas de fundos imobiliários são pessoa física. A manchete que viralizou em abril sugere que a "baleia" sabe de algo que você não sabe. Spoiler: a verdade é mais simples e bem menos sinistra.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="mt-12 flex flex-wrap gap-4 text-xs font-semibold tracking-[0.2em] uppercase"
            style={{ color: "rgba(244,237,228,0.6)" }}
          >
            <span>Leitura: 14 min</span>
            <span>·</span>
            <span>Fonte: Money Times · Santander</span>
            <span>·</span>
            <span>Atualizado em maio de 2026</span>
          </motion.div>
        </motion.div>
      </section>

      {/* ── CAPÍTULO 01 — A pergunta que viralizou ── */}
      <section className="relative py-24 md:py-36 px-6 md:px-14 lg:px-20" style={{ backgroundColor: SAND }}>
        <div className="max-w-[1400px] mx-auto grid md:grid-cols-[1fr,1.1fr] gap-14 lg:gap-20 items-start">
          <div>
            <SectionTitle kicker="Capítulo 01 · A manchete">
              A pergunta que <span style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontWeight: 400, color: COPPER }}>incendiou</span> o X.
            </SectionTitle>
            <div className="space-y-6 text-lg md:text-xl leading-[1.8]" style={{ color: "#2a2a2a" }}>
              <p>
                No dia 10 de abril, uma matéria do Money Times caiu como granada no feed dos investidores brasileiros. O título cutucava o ego do mercado: por que os fundos imobiliários ainda não caíram no gosto do investidor institucional?
              </p>
              <p>
                A leitura preguiçosa transformou aquilo em manchete de rede social: "os ricos não investem em FIIs". Logo veio o coro previsível: se baleia não compra, sardinha que compra é trouxa. É a velha lógica de quem confunde estratégia com religião.
              </p>
              <p>
                Antes de comprar o pânico, é preciso desmontar a frase peça por peça. Porque a pergunta certa nunca foi por que eles não compram. A pergunta certa é para quem o produto foi desenhado.
              </p>
            </div>
          </div>

          <figure className="relative">
            <div className="aspect-[4/5] w-full overflow-hidden rounded-sm shadow-2xl">
              <img
                src={torresImg}
                alt="Torres comerciais do centro financeiro de São Paulo banhadas em luz dourada do pôr do sol, representando o lastro real dos fundos imobiliários"
                className="w-full h-full object-cover"
                loading="lazy"
                width={1600}
                height={2000}
              />
            </div>
            <figcaption className="mt-4 text-sm font-medium tracking-wide" style={{ color: "#6b6b6b", fontFamily: "'Playfair Display', serif", fontStyle: "italic" }}>
              O lastro físico dos FIIs: lajes corporativas, shoppings, galpões logísticos, hospitais. Tijolo, não promessa.
            </figcaption>
          </figure>
        </div>
      </section>

      {/* ── CAPÍTULO 02 — Baleia x cardume (TEAL block) ── */}
      <section className="relative py-24 md:py-36 px-6 md:px-14 lg:px-20" style={{ backgroundColor: TEAL, color: SAND }}>
        <div className="max-w-[1400px] mx-auto">
          <div className="grid md:grid-cols-[1.1fr,1fr] gap-14 lg:gap-20 items-center">
            <figure className="relative order-2 md:order-1">
              <div className="aspect-[3/2] w-full overflow-hidden rounded-sm shadow-2xl">
                <img
                  src={baleiaImg}
                  alt="Baleia jubarte nadando entre um cardume de sardinhas em águas iluminadas pelo sol, analogia para investidor institucional e investidor pessoa física"
                  className="w-full h-full object-cover"
                  loading="lazy"
                  width={1600}
                  height={1066}
                />
              </div>
              <figcaption className="mt-4 text-sm tracking-wide" style={{ color: "rgba(244,237,228,0.6)", fontFamily: "'Playfair Display', serif", fontStyle: "italic" }}>
                Baleia e sardinha nadam no mesmo mar. Comem coisas diferentes.
              </figcaption>
            </figure>

            <div className="order-1 md:order-2">
              <SectionTitle kicker="Capítulo 02 · Definições" light>
                Quem é, afinal, o <span style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontWeight: 400, color: COPPER_LIGHT }}>investidor institucional</span>?
              </SectionTitle>

              <div className="space-y-6 text-lg md:text-xl leading-[1.8]" style={{ color: "rgba(244,237,228,0.88)" }}>
                <p>
                  Quando o jornal diz "institucional", está falando das baleias: bancos, fundos de pensão, gestoras com bilhões sob administração e pessoas físicas que a CVM classifica como investidor profissional, que são aquelas com mais de R$ 10 milhões aplicados.
                </p>
                <p>
                  É outro animal. Outra dieta. Outra fisiologia.
                </p>
              </div>

              <Analogy light>
                A baleia jubarte come krill, milhões de bichinhos minúsculos por vez. A sardinha come plâncton. Os dois nadam no mesmo oceano sem nunca disputar a mesma comida. Quando você vê uma baleia ignorando um cardume de sardinhas, isso não diz nada sobre a qualidade da sardinha. Diz tudo sobre o tamanho da boca da baleia.
              </Analogy>

              <p className="text-lg md:text-xl leading-[1.8]" style={{ color: "rgba(244,237,228,0.88)" }}>
                Esse é o ponto que ninguém quer admitir: a ausência relativa do institucional em FIIs não é um veredito sobre o produto. É uma constatação sobre a fisiologia dele.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CAPÍTULO 03 — Os números reais (SAND) ── */}
      <section className="relative py-24 md:py-36 px-6 md:px-14 lg:px-20" style={{ backgroundColor: SAND }}>
        <div className="max-w-[1400px] mx-auto">
          <SectionTitle kicker="Capítulo 03 · Os números crus">
            O dado que importa é a <span style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontWeight: 400, color: COPPER }}>diferença de escala</span>.
          </SectionTitle>

          <p className="max-w-4xl text-lg md:text-xl leading-[1.8] mb-16" style={{ color: "#2a2a2a" }}>
            Antes de discutir narrativa, é preciso olhar o tamanho dos dois mercados lado a lado. O Santander joga os números na mesa, mas a maioria não percebe a implicação prática.
          </p>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {[
              { stat: "R$ 519 mi", label: "Volume diário médio de FIIs em 2026", ctx: "Alta de 60% sobre 2025, mas ainda pequeno em escala absoluta." },
              { stat: "R$ 25,8 bi", label: "Volume diário do mercado de ações à vista", ctx: "Maior da série histórica desde 2021. Liquidez profunda." },
              { stat: "50 vezes", label: "Quanto a indústria de ações é maior que a de FIIs em giro", ctx: "Para uma gestora bilionária, isso é a diferença entre entrar e ficar preso." },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.7, delay: i * 0.12, ease: APPLE_EASE }}
                className="p-8 md:p-10 border-t-4 transition-all duration-500 hover:-translate-y-1"
                style={{ borderColor: COPPER, backgroundColor: SAND_DEEP }}
              >
                <div
                  className="text-5xl md:text-6xl mb-4"
                  style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 900, color: INK, letterSpacing: "-0.03em" }}
                >
                  {item.stat}
                </div>
                <div className="text-xs font-bold tracking-[0.2em] uppercase mb-4" style={{ color: COPPER }}>
                  {item.label}
                </div>
                <p className="text-base leading-relaxed" style={{ color: "#3a3a3a" }}>
                  {item.ctx}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CAPÍTULO 04 — A confusão da matéria (TEAL) ── */}
      <section className="relative py-24 md:py-36 px-6 md:px-14 lg:px-20" style={{ backgroundColor: TEAL, color: SAND }}>
        <div className="max-w-[1200px] mx-auto">
          <SectionTitle kicker="Capítulo 04 · O detalhe traiçoeiro" light>
            Quando o jornal mistura <span style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontWeight: 400, color: COPPER_LIGHT }}>pessoa</span> com <span style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontWeight: 400, color: COPPER_LIGHT }}>patrimônio</span>.
          </SectionTitle>

          <div className="space-y-8 text-lg md:text-xl leading-[1.8]" style={{ color: "rgba(244,237,228,0.88)" }}>
            <p>
              A matéria diz que 74% dos cotistas de FIIs são pessoa física, em seguida cita que apenas 14% do estoque de ações está na mão de pessoa física. Parece comparação. Não é.
            </p>
            <p>
              Uma porcentagem fala de gente: 74 em cada 100 cotistas. A outra fala de dinheiro: 14% do patrimônio total. Misturar as duas no mesmo parágrafo gera a sensação de que os FIIs estão muito mais distantes do institucional do que de fato estão. É comparar cabeça com tijolo.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mt-14">
            <div className="p-8 md:p-10 border border-white/10" style={{ backgroundColor: TEAL_SOFT }}>
              <div className="text-xs font-bold tracking-[0.3em] uppercase mb-4" style={{ color: COPPER_LIGHT }}>
                Como a manchete leu
              </div>
              <p className="text-2xl leading-snug" style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", color: SAND }}>
                "74% dos cotistas é PF, então pessoa física está sozinha e os ricos abandonaram."
              </p>
            </div>
            <div className="p-8 md:p-10" style={{ backgroundColor: COPPER, color: INK }}>
              <div className="text-xs font-bold tracking-[0.3em] uppercase mb-4" style={{ color: TEAL }}>
                Como a estatística é
              </div>
              <p className="text-2xl leading-snug" style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", color: INK }}>
                "74% do número de cotistas é PF. 21% é institucional. A fatia em dinheiro é outra história, e maior do que parece."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CAPÍTULO 05 — Por DESIGN ── */}
      <section className="relative py-24 md:py-36 px-6 md:px-14 lg:px-20" style={{ backgroundColor: SAND }}>
        <div className="max-w-[1400px] mx-auto grid md:grid-cols-[1fr,1.1fr] gap-14 lg:gap-20 items-center">
          <figure className="relative">
            <div className="aspect-[4/5] w-full overflow-hidden rounded-sm shadow-2xl">
              <img
                src={rendaImg}
                alt="Casal idoso brasileiro tomando café em uma varanda ensolarada com vista para a cidade, retrato sereno do investidor que vive de renda mensal"
                className="w-full h-full object-cover"
                loading="lazy"
                width={1600}
                height={2000}
              />
            </div>
            <figcaption className="mt-4 text-sm tracking-wide" style={{ color: "#6b6b6b", fontFamily: "'Playfair Display', serif", fontStyle: "italic" }}>
              O cliente real do FII: alguém que quer um boleto pingando todo dia 10, não fogos de artifício.
            </figcaption>
          </figure>

          <div>
            <SectionTitle kicker="Capítulo 05 · Diagnóstico">
              O FII foi feito de propósito para <span style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontWeight: 400, color: COPPER }}>não explodir</span>.
            </SectionTitle>

            <div className="space-y-6 text-lg md:text-xl leading-[1.8]" style={{ color: "#2a2a2a" }}>
              <p>
                Investidor institucional caça ganho de capital. Ele precisa entregar performance, bater índice, justificar taxa de administração. O carro de corrida dele é volatilidade. Ele compra coisa que pode triplicar.
              </p>
              <p>
                FII não triplica. Não é para isso. Ele paga aluguel todo mês, corrige a cota pela inflação dos contratos e devolve isso em dividendos isentos para pessoa física. O motor é estável por construção.
              </p>
            </div>

            <Analogy>
              Comparar FII com ação é comparar um pé de jabuticaba plantado no quintal com um campo de soja para exportação. O pé de jabuticaba não vai te enriquecer, mas todo ano enche a cesta. O campo de soja pode dobrar de valor com a próxima safra ou virar prejuízo com a próxima geada. São culturas diferentes, com riscos diferentes, para pessoas em momentos de vida diferentes.
            </Analogy>

            <p className="text-lg md:text-xl leading-[1.8]" style={{ color: "#2a2a2a" }}>
              Querer que o FII seja explosivo é querer que a jabuticaba vire commodity. Quando isso acontece, o ativo deixa de servir ao propósito original: renda recorrente para quem não quer mais depender de salário.
            </p>
          </div>
        </div>
      </section>

      {/* ── CAPÍTULO 06 — Liquidez (TEAL) ── */}
      <section className="relative py-24 md:py-36 px-6 md:px-14 lg:px-20" style={{ backgroundColor: TEAL, color: SAND }}>
        <div className="max-w-[1400px] mx-auto grid md:grid-cols-[1.1fr,1fr] gap-14 lg:gap-20 items-center">
          <div>
            <SectionTitle kicker="Capítulo 06 · Liquidez" light>
              Por que a baleia <span style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontWeight: 400, color: COPPER_LIGHT }}>não cabe</span> na piscina.
            </SectionTitle>

            <div className="space-y-6 text-lg md:text-xl leading-[1.8]" style={{ color: "rgba(244,237,228,0.88)" }}>
              <p>
                Liquidez é a facilidade de entrar e sair de um investimento sem mover o preço. Para você comprando R$ 5 mil em um FII, liquidez não é problema. Para uma gestora comprando R$ 200 milhões, é o problema central.
              </p>
              <p>
                Se o fundo gira R$ 519 milhões por dia entre todos os papéis do mercado, e uma única gestora quer entrar com R$ 200 milhões num FII específico, ela vai pressionar o preço de compra para cima sozinha e, no dia que precisar sair, vai pressionar para baixo. O custo de entrada e saída come a tese inteira.
              </p>
            </div>

            <Analogy light>
              Imagine encher uma piscina infantil com a mangueira de incêndio. Quando você abre, a água transborda antes de molhar a criança. Não é defeito da água nem da criança. É escala incompatível. A baleia precisa de oceano para nadar. A piscina é maravilhosa para o cachorro da casa.
            </Analogy>
          </div>

          <figure className="relative">
            <div className="aspect-[3/2] w-full overflow-hidden rounded-sm shadow-2xl">
              <img
                src={banheiraImg}
                alt="Pequena banheira de cerâmica transbordando na areia da praia diante de um oceano vasto ao entardecer, metáfora visual da escala incompatível entre baleia institucional e mercado de FIIs"
                className="w-full h-full object-cover"
                loading="lazy"
                width={1600}
                height={1000}
              />
            </div>
            <figcaption className="mt-4 text-sm tracking-wide" style={{ color: "rgba(244,237,228,0.6)", fontFamily: "'Playfair Display', serif", fontStyle: "italic" }}>
              Banheira na beira do oceano: a piscina é boa, mas é piscina.
            </figcaption>
          </figure>
        </div>
      </section>

      {/* ── CAPÍTULO 07 — Troca de cota ── */}
      <section className="relative py-24 md:py-36 px-6 md:px-14 lg:px-20" style={{ backgroundColor: SAND }}>
        <div className="max-w-[1400px] mx-auto grid md:grid-cols-[1fr,1.1fr] gap-14 lg:gap-20 items-center">
          <figure className="relative order-2 md:order-1">
            <div className="aspect-[3/2] w-full overflow-hidden rounded-sm shadow-2xl">
              <img
                src={trocaImg}
                alt="Mãos de dois investidores trocando chaves de imóvel por certificados de cota sobre uma mesa de mogno com luminária de latão, representando a aquisição de imóveis pagos com cotas pelo próprio fundo"
                className="w-full h-full object-cover"
                loading="lazy"
                width={1600}
                height={1000}
              />
            </div>
            <figcaption className="mt-4 text-sm tracking-wide" style={{ color: "#6b6b6b", fontFamily: "'Playfair Display', serif", fontStyle: "italic" }}>
              Troca de cota por imóvel: cresce o patrimônio do fundo, mas pode pesar no preço de mercado.
            </figcaption>
          </figure>

          <div className="order-1 md:order-2">
            <SectionTitle kicker="Capítulo 07 · Engenharia financeira">
              Crescer pagando com o <span style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontWeight: 400, color: COPPER }}>próprio papel</span>.
            </SectionTitle>

            <div className="space-y-6 text-lg md:text-xl leading-[1.8]" style={{ color: "#2a2a2a" }}>
              <p>
                Na falta de dinheiro novo entrando, gestores de FII inventaram uma jogada: compram um imóvel e pagam o vendedor em cotas do próprio fundo. O patrimônio cresce. O caixa do fundo não é tocado. No papel, é elegante.
              </p>
              <p>
                O problema é que o vendedor do imóvel geralmente queria dinheiro, não cotas. Ele recebe os papéis, vai ao mercado e vende. Essa venda extra empurra o preço para baixo. O caso citado pelo Santander é o TRXF11, que multiplicou volume de negociação justamente nos meses em que mais comprou imóveis com cotas.
              </p>
            </div>

            <div className="mt-10 p-7 md:p-9 border-l-4" style={{ borderColor: COPPER, backgroundColor: SAND_DEEP }}>
              <div className="flex items-start gap-4">
                <AlertTriangle size={24} style={{ color: COPPER }} className="shrink-0 mt-1" />
                <div>
                  <div className="text-xs font-bold tracking-[0.3em] uppercase mb-3" style={{ color: COPPER }}>
                    Sinal de alerta na carteira
                  </div>
                  <p className="text-base md:text-lg leading-relaxed" style={{ color: "#2a2a2a" }}>
                    Antes de comprar qualquer FII que esteja muito barato em relação aos pares, verifique se houve aquisição recente via troca de cota. Se sim, parte do desconto é estrutural, não oportunidade.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CAPÍTULO 08 — Para quem faz sentido ── */}
      <section className="relative py-24 md:py-36 px-6 md:px-14 lg:px-20" style={{ backgroundColor: TEAL, color: SAND }}>
        <div className="max-w-[1200px] mx-auto">
          <SectionTitle kicker="Capítulo 08 · O cliente certo" light>
            A pergunta correta não é "por que os ricos não compram". É <span style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontWeight: 400, color: COPPER_LIGHT }}>para quem o FII faz sentido</span>.
          </SectionTitle>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              { titulo: "Vive de renda ou quer viver", txt: "Recebe rendimento mensal isento de IR para pessoa física, em valores previsíveis. Funciona como aluguel sem inquilino que liga reclamando do chuveiro." },
              { titulo: "Quer exposição imobiliária sem dor", txt: "Compra um pedaço de shopping, laje corporativa, hospital, galpão logístico, com R$ 100. Sem ITBI, sem escritura, sem cartório, sem vacância pessoal." },
              { titulo: "Tem horizonte longo", txt: "A cota corrige pela inflação dos contratos. Em 10, 20, 30 anos, o capital nominal sobe e a renda sobe junto. Para acumulação de patrimônio em vida, faz o trabalho." },
              { titulo: "Quer liquidez maior que imóvel físico", txt: "Vender sua sala comercial pode levar 18 meses. Vender cota de FII leva um clique. Não é tão líquido quanto ação, mas é radicalmente mais líquido que tijolo." },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: APPLE_EASE }}
                className="p-8 md:p-10 border border-white/10 transition-all duration-500 hover:-translate-y-1 hover:border-white/30"
                style={{ backgroundColor: TEAL_SOFT }}
              >
                <div className="text-3xl mb-4" style={{ color: COPPER_LIGHT, fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontWeight: 400 }}>
                  0{i + 1}
                </div>
                <h3 className="text-2xl md:text-3xl mb-4 leading-tight" style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 800, color: SAND }}>
                  {item.titulo}
                </h3>
                <p className="text-base md:text-lg leading-relaxed" style={{ color: "rgba(244,237,228,0.82)" }}>
                  {item.txt}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CAPÍTULO 09 — O ponto cego (SAND + soberano) ── */}
      <section className="relative py-24 md:py-36 px-6 md:px-14 lg:px-20" style={{ backgroundColor: SAND_DEEP }}>
        <div className="max-w-[1100px] mx-auto">
          <SectionTitle kicker="Capítulo 09 · O ponto cego que ninguém comenta">
            Tudo isso, lembre, acontece <span style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontWeight: 400, color: COPPER }}>dentro do mesmo sistema</span>.
          </SectionTitle>

          <div className="space-y-6 text-lg md:text-xl leading-[1.8]" style={{ color: "#2a2a2a" }}>
            <p>
              FII é um produto interessante para gerar renda em reais. Mas a renda continua sendo paga em reais, depositada em conta bancária reportada à Receita, sujeita às mesmas mudanças de regra de qualquer outro ativo do sistema financeiro brasileiro.
            </p>
            <p>
              A isenção de IR sobre dividendos pode mudar, e a discussão já está em pauta no Congresso. A cota pode ser tributada de forma diferente amanhã. O banco pode reportar seu rendimento sob nova regra. Nada disso é catastrofismo. É leitura honesta do terreno em que o produto vive.
            </p>
            <p>
              Por isso a tese aqui sempre será a mesma: use FII como ferramenta de renda dentro da sua carteira, com a consciência de que ele é uma ferramenta do sistema. A reserva de valor que protege o que você acumulou da mudança de regras é outra conversa.
            </p>
          </div>

          <div className="mt-12 p-8 md:p-10 border-l-4" style={{ borderColor: TEAL, backgroundColor: SAND }}>
            <Quote size={28} style={{ color: COPPER }} className="mb-4" />
            <p className="text-2xl md:text-3xl leading-snug" style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", color: INK }}>
              "Não existe ativo perfeito. Existe ativo certo para o objetivo certo. FII gera renda. Bitcoin guarda valor. Dólar dá fôlego. Cada um na sua função, sem confundir o papel de cada um."
            </p>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="relative py-24 md:py-32 px-6 md:px-14 lg:px-20" style={{ backgroundColor: SAND }}>
        <div className="max-w-[1100px] mx-auto">
          <SectionTitle kicker="Perguntas frequentes">
            Dúvidas que <span style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontWeight: 400, color: COPPER }}>aparecem sempre</span>.
          </SectionTitle>

          <div className="divide-y" style={{ borderColor: "#d4c8b3" }}>
            {faqSchema.mainEntity.map((q, i) => (
              <details key={i} className="group py-6 cursor-pointer" style={{ borderColor: "#d4c8b3" }}>
                <summary className="flex items-start justify-between gap-4 list-none">
                  <h3 className="text-xl md:text-2xl leading-snug" style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 700, color: INK }}>
                    {q.name}
                  </h3>
                  <span className="shrink-0 text-2xl transition-transform group-open:rotate-45" style={{ color: COPPER, fontWeight: 300 }}>
                    +
                  </span>
                </summary>
                <p className="mt-4 text-base md:text-lg leading-relaxed" style={{ color: "#3a3a3a" }}>
                  {q.acceptedAnswer.text}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── Continue sua trilha ── */}
      <section className="relative py-24 md:py-32 px-6 md:px-14 lg:px-20" style={{ backgroundColor: TEAL, color: SAND }}>
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-12">
            <div className="text-[10px] font-bold tracking-[0.4em] uppercase mb-4" style={{ color: COPPER_LIGHT }}>
              Continue sua trilha
            </div>
            <h2 className="text-3xl md:text-5xl" style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 900, color: SAND, letterSpacing: "-0.02em" }}>
              Renda hoje, reserva de valor <span style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontWeight: 400, color: COPPER_LIGHT }}>para sempre</span>.
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { to: "/inflacao-imposto-oculto", titulo: "Inflação: o imposto que ninguém vota", txt: "Por que renda em reais sem proteção contra inflação é renda corroída.", icon: TrendingUp },
              { to: "/bitcoin-vs-imovel", titulo: "Bitcoin vs Imóvel: comparação honesta", txt: "Lastro físico contra lastro matemático. Onde cada um ganha e onde perde.", icon: Building2 },
              { to: "/alertas/protecao-patrimonial-bitcoin", titulo: "Proteção patrimonial além do sistema", txt: "Como proteger o que você acumulou de mudanças de regra do jogo.", icon: Scale },
            ].map((item, i) => (
              <Link
                key={i}
                to={item.to}
                className="group block p-8 md:p-10 border border-white/10 transition-all duration-500 hover:-translate-y-1 hover:border-white/40"
                style={{ backgroundColor: TEAL_SOFT }}
              >
                <item.icon size={28} style={{ color: COPPER_LIGHT }} className="mb-6" />
                <h3 className="text-xl md:text-2xl mb-4 leading-tight" style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 800, color: SAND }}>
                  {item.titulo}
                </h3>
                <p className="text-base leading-relaxed mb-6" style={{ color: "rgba(244,237,228,0.78)" }}>
                  {item.txt}
                </p>
                <span className="inline-flex items-center gap-2 text-sm font-bold transition-transform group-hover:translate-x-1" style={{ color: COPPER_LIGHT }}>
                  Ler análise <ArrowRight size={16} />
                </span>
              </Link>
            ))}
          </div>

          <div className="mt-20 pt-12 border-t border-white/10 text-center">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.3em] uppercase transition-opacity hover:opacity-70"
              style={{ color: COPPER_LIGHT }}
            >
              <ArrowLeft size={14} /> Voltar para a home
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RicosNaoInvestemFiis;