import { Helmet } from "react-helmet-async";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, Database, Eye, Fingerprint, Radio, ServerCrash, ShieldOff, Wifi } from "lucide-react";
import { fadeUp, stagger, staggerChild, viewportOnce, ease } from "@/lib/motion";
import BackToHome from "@/components/BackToHome";

import vigilanciaHero from "@/assets/vigilancia-hero.jpg";
import dadosVazadosPhone from "@/assets/dados-vazados-phone.jpg";
import servidoresBreach from "@/assets/servidores-breach.jpg";
import biometriaControle from "@/assets/biometria-controle.jpg";
import pixMonitoramento from "@/assets/pix-monitoramento.jpg";

const INCIDENTS = [
  { year: "2024", title: "Credink — 220 milhões de CPFs", desc: "Base completa de dados financeiros de praticamente todo brasileiro economicamente ativo foi sequestrada pelo grupo Blastois e oferecida no mercado negro." },
  { year: "2024", title: "BTG Pactual — R$ 100M+ via PIX", desc: "Hackers exploraram vulnerabilidades no sistema de pagamentos instantâneos e desviaram mais de cem milhões em transações fraudulentas." },
  { year: "2023", title: "INSS — Bilhões desviados", desc: "Esquema interno desviou bilhões em benefícios previdenciários utilizando dados cadastrais de aposentados e pensionistas." },
  { year: "2021", title: "Serasa Experian — 223 milhões", desc: "O maior vazamento da história brasileira expôs nome, CPF, renda, score de crédito e fotos de rosto de mais de 223 milhões de pessoas." },
  { year: "2020", title: "Ministério da Saúde — 243 milhões", desc: "Credenciais do sistema e-SUS ficaram expostas no código-fonte, permitindo acesso a dados de saúde de toda a população." },
];

const THREAT_VECTORS = [
  {
    icon: Fingerprint,
    title: "Biometria Centralizada",
    desc: "Seu rosto, suas digitais e seu DNA estão sendo coletados e armazenados em servidores que já provaram ser vulneráveis. Uma vez vazados, não há como trocar suas digitais.",
    image: biometriaControle,
  },
  {
    icon: Eye,
    title: "Vigilância Transacional",
    desc: "Cada PIX, cada transferência, cada compra no cartão é rastreada, catalogada e cruzada. O Estado sabe o que você come, onde dorme e quanto gasta por minuto.",
    image: pixMonitoramento,
  },
  {
    icon: ServerCrash,
    title: "Infraestrutura Frágil",
    desc: "Os mesmos servidores que guardam seus dados mais sensíveis rodam software desatualizado, administrado por funcionários públicos sem qualificação em segurança.",
    image: servidoresBreach,
  },
  {
    icon: ShieldOff,
    title: "Engenharia Social em Escala",
    desc: "Com seus dados cruzados — CPF, endereço, renda, familiares — qualquer atacante pode simular ser seu banco, seu médico ou seu advogado. Sua avó não vai saber a diferença.",
    image: dadosVazadosPhone,
  },
];

const Section = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, viewportOnce);
  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const VazamentoDados = () => {
  return (
    <>
      <Helmet>
        <title>Seus Dados Já Foram Vazados — A Distopia Digital Brasileira | Lord Junnior</title>
        <meta name="description" content="220 milhões de CPFs expostos. R$100M desviados via PIX. Bilhões roubados do INSS. Entenda por que o sistema que promete proteger seus dados é o mesmo que os entrega." />
        <link rel="canonical" href="https://lordjunnior.com.br/vazamento-dados" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "TechArticle",
          "headline": "Seus Dados Já Foram Vazados — A Distopia Digital Brasileira",
          "author": { "@type": "Person", "name": "Lord Junnior", "url": "https://lordjunnior.com.br" },
          "publisher": { "@type": "Organization", "name": "Lord Junnior", "url": "https://lordjunnior.com.br" },
          "datePublished": "2026-03-24",
          "description": "Análise técnica sobre vazamentos de dados em massa no Brasil e estratégias de proteção digital."
        })}</script>
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* ── HERO CINEMATOGRÁFICO ── */}
        <section className="relative min-h-[85vh] flex items-end overflow-hidden">
          <div className="absolute inset-0">
            <img
              src={vigilanciaHero}
              alt="Câmera de vigilância refletindo dados binários"
              className="w-full h-full object-cover"
              style={{ filter: "brightness(0.35) saturate(0.7)" }}
              fetchPriority="high" loading="eager" fetchPriority="high" decoding="async" />
            <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 0%, rgba(5,8,8,0.7) 50%, hsl(var(--background)) 100%)" }} />
          </div>

          <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 pb-20 pt-32">
            <BackToHome />
            
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8"
            >
              <div className="inline-flex items-center gap-3 border border-destructive/30 px-4 py-2 rounded-sm bg-destructive/5 backdrop-blur-sm mb-6">
                <Radio className="w-4 h-4 text-destructive animate-pulse" />
                <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-destructive/80 font-bold">ALERTA DE SEGURANÇA CRÍTICO</span>
              </div>

              <h1
                className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter leading-[1.05] mb-6"
                style={{ fontFamily: "'Inter Tight', sans-serif", color: "#FFFFFF", textShadow: "0 0 60px rgba(239,68,68,0.2)" }}
              >
                SEUS DADOS<br />
                <span className="text-destructive">JÁ FORAM VAZADOS.</span>
              </h1>
              <p className="text-xl md:text-2xl text-white/60 max-w-2xl leading-relaxed" style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 600 }}>
                Você só ainda não sabe o tamanho do estrago.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ── MANIFESTO DE ABERTURA ── */}
        <section className="py-20 md:py-28">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <Section className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <div>
                <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-4">[ DOSSIÊ DE REALIDADE ]</p>
                <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight mb-8 text-foreground">
                  O Estado que promete <span className="text-destructive">proteger</span> seus dados é o mesmo que os <span className="text-destructive">entrega</span>.
                </h2>
                <div className="space-y-5 text-muted-foreground text-base md:text-lg leading-8">
                  <p>
                    Não é teoria. Não é paranoia. É o registro documentado de um sistema que coleta compulsoriamente as informações mais íntimas de 220 milhões de pessoas e as armazena em infraestrutura que um adolescente com Kali Linux consegue penetrar.
                  </p>
                  <p>
                    Cada vez que você fornece seu CPF numa farmácia, sua digital num caixa eletrônico ou seu rosto num aplicativo de banco, você está depositando dados irrevogáveis num cofre que <span className="text-foreground font-semibold">não tem tranca</span>.
                  </p>
                  <p className="text-foreground font-semibold border-l-2 border-primary/40 pl-4">
                    A diferença entre uma senha e uma digital? A senha você troca. A digital é para sempre.
                  </p>
                </div>
              </div>
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-border">
                <img src={dadosVazadosPhone} alt="Smartphone quebrado com dados pessoais expostos" className="w-full h-full object-cover" style={{ filter: "brightness(0.7) saturate(0.85)" }} loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-white/50">EVIDÊNCIA FORENSE</p>
                  <p className="text-sm text-white/70 mt-1">Dados pessoais expostos após ataque de sequestro digital</p>
                </div>
              </div>
            </Section>
          </div>
        </section>

        {/* ── TIMELINE DE INCIDENTES ── */}
        <section className="py-20 md:py-28 bg-card/50">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <Section>
              <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-destructive/70 mb-4">[ REGISTRO DE INCIDENTES ]</p>
              <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight mb-4 text-foreground">
                O Histórico que Ninguém Quer que Você Memorize
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mb-14 leading-relaxed">
                Cada linha abaixo representa milhões de vidas expostas. E estes são apenas os casos que vieram a público.
              </p>
            </Section>

            <div className="space-y-0">
              {INCIDENTS.map((inc, i) => {
                const ref = useRef(null);
                const isInView = useInView(ref, viewportOnce);
                return (
                  <motion.div
                    key={i}
                    ref={ref}
                    initial={{ opacity: 0, x: -30 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: i * 0.1, ease: ease.sovereign }}
                    className="group relative border-l-2 border-border hover:border-destructive/50 pl-8 py-8 transition-colors duration-300"
                  >
                    <div className="absolute left-[-7px] top-10 w-3 h-3 rounded-full bg-border group-hover:bg-destructive transition-colors" />
                    <div className="flex flex-col md:flex-row md:items-start gap-4">
                      <span className="font-mono text-sm text-destructive font-bold shrink-0 w-16">{inc.year}</span>
                      <div>
                        <h3 className="font-display text-lg md:text-xl font-bold text-foreground mb-2">{inc.title}</h3>
                        <p className="text-muted-foreground leading-relaxed max-w-2xl">{inc.desc}</p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── VETORES DE AMEAÇA — Grid 50/50 com Imagens ── */}
        <section className="py-20 md:py-28">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <Section>
              <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-primary/70 mb-4">[ ANÁLISE DE VETORES ]</p>
              <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight mb-4 text-foreground">
                As 4 Frentes de Ataque Contra Sua Soberania Digital
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mb-16 leading-relaxed">
                Cada vetor opera simultaneamente. O resultado é uma triangulação que transforma você de cidadão em produto rastreável.
              </p>
            </Section>

            <div className="space-y-20">
              {THREAT_VECTORS.map((vector, i) => {
                const ref = useRef(null);
                const isInView = useInView(ref, viewportOnce);
                const Icon = vector.icon;
                const isReversed = i % 2 !== 0;

                return (
                  <motion.div
                    key={i}
                    ref={ref}
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, ease: ease.sovereign }}
                    className={`grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center ${isReversed ? "lg:[direction:rtl]" : ""}`}
                  >
                    <div className={isReversed ? "lg:[direction:ltr]" : ""}>
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-lg bg-destructive/10 border border-destructive/20 flex items-center justify-center">
                          <Icon className="w-5 h-5 text-destructive" />
                        </div>
                        <span className="font-mono text-xs tracking-[0.2em] uppercase text-muted-foreground">VETOR {String(i + 1).padStart(2, "0")}</span>
                      </div>
                      <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4 tracking-tight">{vector.title}</h3>
                      <p className="text-muted-foreground text-base md:text-lg leading-8">{vector.desc}</p>
                    </div>
                    <div className={`relative aspect-[16/10] rounded-2xl overflow-hidden border border-border group ${isReversed ? "lg:[direction:ltr]" : ""}`}>
                      <img
                        src={vector.image}
                        alt={vector.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        style={{ filter: "brightness(0.65) saturate(0.8)" }}
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── LEI FAKE / REGULAÇÃO — Bloco de Impacto ── */}
        <section className="py-20 md:py-28 bg-card/50">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <Section className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-border">
                <img src={pixMonitoramento} alt="Sala de monitoramento com dashboards PIX" className="w-full h-full object-cover" style={{ filter: "brightness(0.6) saturate(0.75)" }} loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-r from-background/70 via-transparent to-transparent" />
              </div>
              <div>
                <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-primary/70 mb-4">[ ANATOMIA DA FALÁCIA ]</p>
                <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight mb-8 text-foreground">
                  A Regulação que Protege o Estado, Não Você
                </h2>
                <div className="space-y-5 text-muted-foreground text-base md:text-lg leading-8">
                  <p>
                    Quando o legislador exige que você forneça biometria facial para acessar uma rede social, ele não está protegendo crianças. Ele está construindo o maior banco de dados de vigilância biométrica da América Latina.
                  </p>
                  <p>
                    A informação que você entrega voluntariamente hoje será a arma que usarão contra você amanhã. Não porque são malvados — porque o sistema é <span className="text-foreground font-semibold">estruturalmente incompetente</span> para proteger o que coleta.
                  </p>
                  <p className="border-l-2 border-primary/40 pl-4 text-foreground font-semibold">
                    Enquanto famílias trabalham 6 meses do ano para sustentar a máquina, o Estado gasta tempo e dinheiro infinito maquinando formas de extrair ainda mais dados. Você não vai correr mais rápido que essa máquina. Você precisa sair da pista.
                  </p>
                </div>
              </div>
            </Section>
          </div>
        </section>

        {/* ── PROTOCOLO DE DEFESA ── */}
        <section className="py-20 md:py-28">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <Section>
              <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-chart-green mb-4">[ PROTOCOLO DE EXTRAÇÃO ]</p>
              <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight mb-4 text-foreground">
                A Saída Não É Lutar. É Arquitetar.
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mb-14 leading-relaxed">
                Nenhum lugar é perfeito. Mas a Teoria das Bandeiras permite que você colha os benefícios de múltiplas jurisdições enquanto elimina os riscos de depender de uma única.
              </p>
            </Section>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: Database,
                  title: "Minimize a Superfície de Ataque",
                  desc: "Reduza radicalmente os dados que você fornece. Cada CPF num cadastro é uma bomba-relógio. Use aliases, e-mails descartáveis e nunca vincule dados reais a serviços desnecessários.",
                  link: "/blindagem-golpes",
                  cta: "Blindagem →"
                },
                {
                  icon: Wifi,
                  title: "Descentralize Suas Finanças",
                  desc: "Autocustódia em Bitcoin elimina o intermediário que pode ser hackeado, sequestrado ou coagido pelo Estado. Sua chave privada é o único cofre que nunca foi violado.",
                  link: "/autocustodia",
                  cta: "Autocustódia →"
                },
                {
                  icon: ShieldOff,
                  title: "Aplique a Teoria das Bandeiras",
                  desc: "Distribua residência fiscal, ativos e presença digital entre jurisdições que competem pela sua atenção — em vez de uma que exige sua submissão.",
                  link: "/teoria-das-bandeiras",
                  cta: "Teoria das Bandeiras →"
                },
              ].map((item, i) => {
                const ref = useRef(null);
                const isInView = useInView(ref, viewportOnce);
                const Icon = item.icon;
                return (
                  <motion.div
                    key={i}
                    ref={ref}
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: i * 0.15, ease: ease.sovereign }}
                    className="group relative bg-card border border-border rounded-2xl p-8 hover:border-primary/30 transition-all duration-500"
                  >
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="relative z-10">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-6">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="font-display text-xl font-bold text-foreground mb-3">{item.title}</h3>
                      <p className="text-muted-foreground leading-relaxed mb-6">{item.desc}</p>
                      <Link to={item.link} className="inline-flex items-center gap-2 text-primary font-semibold text-sm hover:gap-3 transition-all">
                        {item.cta} <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── CTA FINAL ── */}
        <section className="py-20 md:py-28 bg-card/50 border-t border-border">
          <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
            <Section>
              <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-6">[ VEREDICTO ]</p>
              <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight mb-8 text-foreground leading-tight">
                O Brasil não vai virar a China.<br />
                <span className="text-destructive">A China tem inveja do Brasil.</span>
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
                Um país com recursos infinitos, portos estratégicos e a maior floresta do planeta — governado por uma máquina de vigilância fiscal que transforma cada cidadão em fonte de receita rastreável. Isso não é distopia futurista. É o seu extrato bancário de hoje.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  to="/por-onde-comecar"
                  className="inline-flex items-center gap-3 px-8 py-4 rounded-lg font-display font-bold text-sm tracking-wide uppercase bg-primary text-primary-foreground hover:brightness-110 transition-all"
                >
                  Comece Sua Extração <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  to="/teoria-das-bandeiras"
                  className="inline-flex items-center gap-3 px-8 py-4 rounded-lg font-display font-bold text-sm tracking-wide uppercase border border-border text-foreground hover:border-primary/40 transition-all"
                >
                  Teoria das Bandeiras <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </Section>
          </div>
        </section>
      </div>
    </>
  );
};

export default VazamentoDados;
