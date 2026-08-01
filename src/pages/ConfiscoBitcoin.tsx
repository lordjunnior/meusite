import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  ShieldAlert, AlertTriangle, Lock, Eye, ArrowRight, Shield,
  Smartphone, Globe, Fingerprint, Skull, Radio, ExternalLink,
  ChevronRight, Scale, Zap, Bitcoin
} from "lucide-react";
import BackToHome from "@/components/BackToHome";
import FixedThematicBackground from "@/components/backgrounds/FixedThematicBackground";
import bgConfisco from "@/assets/backgrounds/bg-confisco.jpg";
import AppSidebar from "@/components/AppSidebar";
import MobileNav from "@/components/MobileNav";
import FooterSection from "@/components/FooterSection";
import ScrollToTop from "@/components/ScrollToTop";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";
import cardConfisco from "@/assets/card-confisco-bitcoin.jpg";

const APPLE_EASE = [0.22, 1, 0.36, 1] as const;
const fadeUp = {
  hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
  visible: (i: number) => ({
    opacity: 1, y: 0, filter: "blur(0px)",
    transition: { duration: 0.8, ease: APPLE_EASE, delay: i * 0.1 },
  }),
};

const riscos = [
  {
    icon: Scale,
    title: "Hong Kong: Seeds = Crime",
    desc: "Emenda à lei de segurança nacional transforma em crime a recusa em entregar senhas, chaves privadas ou acesso a carteiras de Bitcoin. Pena: 1 ano de prisão + multa de HK$100.000 (R$67.000).",
  },
  {
    icon: Eye,
    title: "Vigilância Total no Brasil",
    desc: "Exchanges brasileiras e internacionais agora reportam saldos diariamente ao Banco Central. IOF sobre stablecoins. O cerco apertou em 2026 como prometido.",
  },
  {
    icon: Fingerprint,
    title: "Fim do Limite de R$36.000",
    desc: "O governo já coletou os dados de quem tem Bitcoin. O próximo passo é eliminar a isenção e criar um novo imposto sobre criptoativos — é questão de tempo.",
  },
  {
    icon: Skull,
    title: "Sequestros em Alta",
    desc: "Os dados de quem tem cripto estão expostos. Os sequestros relacionados a criptomoedas aumentam mesmo em mercados de baixa. Privacidade é sobrevivência.",
  },
];

const passos = [
  {
    num: "01",
    title: "Crie uma Carteira Descentralizada",
    desc: "Baixe a Blockstream Wallet. Crie sua conta em minutos. Guarde suas chaves privadas com segurança máxima. Sem banco, sem gerente, sem bloqueio arbitrário.",
    detail: "Acesse a aba de segurança para encontrar suas chaves privadas. Anote-as em papel e guarde em local seguro — nunca digitalmente.",
    color: "primary",
  },
  {
    num: "02",
    title: "Acesse o SpikeTuSpike",
    desc: "Plataforma P2P que permite comprar Bitcoin de forma privada, sem expor dados sensíveis. Login por chave privada — sem e-mail, sem CPF, sem KYC.",
    detail: "Primeira ordem: R$10 a R$500 via DPIX automático. Após 24h, até R$6.000. Com 3 ordens de R$2.000+, desbloqueie boleto e TED no desktop.",
    color: "chart-green",
  },
  {
    num: "03",
    title: "Receba Bitcoin na Rede Liquid",
    desc: "Copie seu endereço Liquid da Blockstream Wallet e cole no chat do SpikeBorg. Transações confidenciais: ninguém vê o ativo nem o valor.",
    detail: "O Bitcoin chega em segundos. Taxas mínimas. Transações mais baratas que on-chain e com privacidade total — ativo e valor invisíveis.",
    color: "gold",
  },
  {
    num: "04",
    title: "Converta para Bitcoin On-Chain",
    desc: "Quando acumular o mínimo (≈0,0025 BTC / ~R$100), faça swap de Liquid para on-chain diretamente na Blockstream Wallet. Soberania completa.",
    detail: "Clique no seu saldo Liquid → Swap → Selecione a quantia → Confirme. Seus sats estarão na camada principal do Bitcoin, sob seu controle total.",
    color: "primary",
  },
];

const faqs = [
  {
    q: "O que aconteceu em Hong Kong com Bitcoin?",
    a: "Hong Kong aprovou uma emenda à lei de segurança nacional que criminaliza a recusa em entregar senhas, chaves de descriptografia ou acesso a dispositivos pessoais, incluindo hardware wallets de Bitcoin. A pena é de até 1 ano de prisão e multa de HK$100.000. A lei se aplica a todos no território, inclusive turistas em trânsito no aeroporto.",
  },
  {
    q: "Isso pode acontecer no Brasil?",
    a: "O Brasil já está apertando o cerco: IOF sobre stablecoins, reporte diário de saldos em exchanges ao Banco Central, e discussões sobre eliminar a isenção de R$36.000 em criptoativos. O padrão é global — primeiro coletam dados, depois tributam.",
  },
  {
    q: "O que é a Rede Liquid do Bitcoin?",
    a: "É uma sidechain (segunda camada) do Bitcoin que oferece transações confidenciais — ninguém consegue ver o ativo transacionado nem o valor. Taxas mais baratas que on-chain, ideal para quem prioriza privacidade.",
  },
  {
    q: "O SpikeTuSpike é seguro?",
    a: "O SpikeTuSpike é uma plataforma P2P que não exige e-mail, nome ou CPF. Você cria conta com chave privada. Ordens pequenas via DPIX são processadas automaticamente por robô. Para valores maiores, atendentes humanos processam via boleto ou TED.",
  },
  {
    q: "Preciso de muito dinheiro para começar?",
    a: "Não. Você pode comprar a partir de R$10 em Bitcoin via DPIX. Para converter de Liquid para on-chain, o mínimo é aproximadamente 0,0025 BTC (cerca de R$100).",
  },
  {
    q: "O que é Blockstream Wallet?",
    a: "É uma carteira de Bitcoin que suporta a rede Liquid. Permite receber, enviar e fazer swap entre Liquid e on-chain. Você controla suas próprias chaves privadas — nenhum terceiro tem acesso ao seu saldo.",
  },
];

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "Como proteger seus Bitcoins contra confisco governamental",
  description: "Tutorial passo a passo para comprar Bitcoin de forma privada usando Blockstream Wallet, SpikeTuSpike e a Rede Liquid.",
  step: passos.map((p, i) => ({
    "@type": "HowToStep",
    position: i + 1,
    name: p.title,
    text: p.desc,
  })),
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Nova lei permite governo TOMAR Bitcoins — como se proteger",
  description: "Hong Kong criminalizou a recusa em entregar chaves privadas. O Brasil aperta o cerco com IOF e reporte diário. Aprenda a comprar Bitcoin de forma privada.",
  author: { "@type": "Person", name: "Lord Junnior" },
  publisher: {
    "@type": "Organization",
    name: "Arsenal de Soberania",
    url: "https://lordjunnior.com.br",
  },
  datePublished: "2026-04-03",
  url: "https://lordjunnior.com.br/alertas/protecao-patrimonial-bitcoin",
  image: "https://lordjunnior.com.br/og-confisco-bitcoin.jpg",
};

export default function ConfiscoBitcoin() {
  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true, margin: "-40px" });

  return (
    <div className="min-h-screen text-foreground pt-[62px] overflow-x-hidden">
      <Helmet>
        <title>Nova Lei Permite Governo Tomar Bitcoins — Proteja-se | Lord Junnior</title>
        <meta name="description" content="Hong Kong criminalizou a recusa em entregar chaves privadas. O Brasil aperta o cerco. Aprenda a comprar Bitcoin de forma privada com Blockstream Wallet e SpikeTuSpike." />
        <link rel="canonical" href="https://lordjunnior.com.br/alertas/protecao-patrimonial-bitcoin" />
        <meta property="og:title" content="Nova Lei Permite Governo TOMAR Bitcoins — Como Se Proteger" />
        <meta property="og:description" content="O cerco apertou. Aprenda a comprar Bitcoin sem KYC, sem rastro, com privacidade total." />
        <meta property="og:url" content="https://lordjunnior.com.br/alertas/protecao-patrimonial-bitcoin" />
        <meta property="og:type" content="article" />
        <script type="application/ld+json">{JSON.stringify(howToSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
      </Helmet>

      <FixedThematicBackground image={bgConfisco} intensity="heavy" />
      <AppSidebar />
      <MobileNav />

      <div className="relative z-10 lg:ml-[280px] pb-10">
        <BackToHome />

        {/* ── HERO ── */}
        <section ref={heroRef} className="relative overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img
              src={cardConfisco}
              alt="Hardware wallet sendo confiscada sob vigilância"
              className="absolute inset-0 w-full h-full object-cover"
              style={{ filter: "brightness(0.3) saturate(0.8)" }}
              loading="eager" fetchPriority="high" decoding="async" />
            <div className="absolute inset-0" style={{
              background: "linear-gradient(180deg, rgba(5,8,8,0.3) 0%, rgba(5,8,8,0.6) 40%, rgba(5,8,8,0.95) 80%, rgba(5,8,8,1) 100%)",
            }} />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_center,_rgba(220,38,38,0.15),_transparent_60%)]" />
          </div>

          <div className="relative z-10 py-20 md:py-32 px-6 md:px-12 lg:px-20">
            <div className="max-w-5xl mx-auto">
              <motion.div custom={0} variants={fadeUp} initial="hidden" animate={isHeroInView ? "visible" : "hidden"} className="flex items-center gap-3 mb-6">
                <div className="relative">
                  <div className="absolute inset-0 rounded-full bg-destructive/30 animate-[ping_2s_ease-in-out_infinite]" />
                  <AlertTriangle className="relative w-5 h-5 text-destructive" />
                </div>
                <span className="font-mono text-[10px] tracking-[0.3em] text-destructive uppercase font-bold">
                  Alerta Global · Confisco Digital
                </span>
                <span className="w-2 h-2 rounded-full bg-destructive" style={{ animation: "confiscoBlink 2s ease-in-out infinite" }} />
              </motion.div>

              <motion.h1 custom={1} variants={fadeUp} initial="hidden" animate={isHeroInView ? "visible" : "hidden"}
                className="font-bold text-4xl md:text-6xl lg:text-7xl tracking-tight mb-5 leading-[0.95]"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                Nova lei permite governo{" "}
                <span className="text-destructive">TOMAR</span> Bitcoins
              </motion.h1>

              <motion.p custom={2} variants={fadeUp} initial="hidden" animate={isHeroInView ? "visible" : "hidden"}
                className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-8 leading-relaxed"
              >
                Hong Kong criminalizou a recusa em entregar chaves privadas. O Brasil aperta o cerco com IOF e reporte diário.{" "}
                <span className="text-foreground font-semibold">Enquanto eles querem tomar o seu, vou te mostrar como proteger.</span>
              </motion.p>

              <motion.div custom={3} variants={fadeUp} initial="hidden" animate={isHeroInView ? "visible" : "hidden"} className="flex flex-wrap gap-4">
                <a href="#tutorial" className="group inline-flex items-center gap-3 py-4 px-10 rounded-sm border border-destructive/30 bg-destructive/[0.08] hover:bg-destructive/[0.18] hover:border-destructive/50 text-destructive font-semibold tracking-wide text-sm transition-all duration-300">
                  <Shield className="w-4 h-4" />
                  Ver Protocolo de Proteção
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1.5" />
                </a>
                <a href="#riscos" className="inline-flex items-center gap-2 py-4 px-8 rounded-sm border border-border/30 text-muted-foreground hover:text-foreground text-sm transition-all duration-300">
                  Entender os Riscos
                </a>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── PAINEL DE RISCOS ── */}
        <section id="riscos" className="px-6 md:px-12 lg:px-20 py-16 md:py-24">
          <div className="max-w-6xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease: APPLE_EASE }}>
              <p className="font-mono text-[10px] tracking-[0.3em] text-destructive/70 uppercase mb-3">Mapa de Ameaças 2026</p>
              <h2 className="font-bold text-3xl md:text-5xl tracking-tight mb-4 leading-[1.1]" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                O cerco está <span className="text-destructive">fechando</span>
              </h2>
              <p className="text-muted-foreground text-base max-w-2xl mb-12 leading-8">
                De Hong Kong ao Brasil, governos estão implementando o mesmo playbook: primeiro coletam dados, depois tributam, depois confiscam. Aqui está o panorama atual das ameaças.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {riscos.map((r, i) => {
                const Icon = r.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: i * 0.1, ease: APPLE_EASE }}
                    className="group relative p-6 rounded-lg border border-destructive/15 bg-card/50 backdrop-blur-sm hover:border-destructive/40 transition-all duration-500"
                    style={{ boxShadow: "0 0 20px rgba(220,38,38,0.04)" }}
                  >
                    <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-destructive/30 to-transparent group-hover:via-destructive/60 transition-all duration-500" />
                    <div className="flex gap-4">
                      <div className="relative w-12 h-12 shrink-0 flex items-center justify-center">
                        <div className="absolute inset-0 rounded-full bg-destructive/10 group-hover:bg-destructive/20 transition-colors duration-300" />
                        <Icon className="relative w-5 h-5 text-destructive" />
                      </div>
                      <div>
                        <h3 className="text-foreground font-semibold text-sm mb-1.5 group-hover:text-destructive transition-colors duration-300">{r.title}</h3>
                        <p className="text-xs text-muted-foreground/80 leading-relaxed">{r.desc}</p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── TUTORIAL PASSO A PASSO ── */}
        <section id="tutorial" className="px-6 md:px-12 lg:px-20 py-16 md:py-24 bg-card/30">
          <div className="max-w-6xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease: APPLE_EASE }}>
              <p className="font-mono text-[10px] tracking-[0.3em] text-primary/70 uppercase mb-3">Protocolo de Proteção</p>
              <h2 className="font-bold text-3xl md:text-5xl tracking-tight mb-4 leading-[1.1]" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                Como ter <span className="text-primary">Bitcoins privados</span>
              </h2>
              <p className="text-muted-foreground text-base max-w-2xl mb-14 leading-8">
                Sem exchange, sem KYC, sem rastro. Um protocolo em 4 passos para comprar Bitcoin preservando sua identidade e protegendo sua família.
              </p>
            </motion.div>

            <div className="space-y-6">
              {passos.map((p, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: i * 0.12, ease: APPLE_EASE }}
                  className={`group relative p-6 md:p-8 rounded-lg border border-${p.color}/15 bg-card/60 backdrop-blur-sm hover:border-${p.color}/40 transition-all duration-500`}
                  style={{ boxShadow: `0 0 25px rgba(0,0,0,0.08)` }}
                >
                  <div className={`absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-${p.color}/30 to-transparent`} />
                  <div className="flex gap-5 md:gap-8">
                    <div className="shrink-0">
                      <span className={`font-mono text-4xl md:text-5xl font-black text-${p.color}/20 group-hover:text-${p.color}/40 transition-colors duration-500 select-none`}>
                        {p.num}
                      </span>
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-foreground font-bold text-lg md:text-xl leading-tight">{p.title}</h3>
                      <p className="text-muted-foreground text-sm leading-7">{p.desc}</p>
                      <p className="text-muted-foreground/60 text-xs leading-6 border-t border-border/20 pt-2 mt-2">{p.detail}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA after tutorial */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3, ease: APPLE_EASE }}
              className="mt-12 p-6 md:p-8 rounded-lg border border-primary/20 bg-primary/[0.04] backdrop-blur-sm"
            >
              <div className="flex flex-col md:flex-row items-start md:items-center gap-5 justify-between">
                <div className="space-y-2">
                  <h3 className="text-foreground font-bold text-lg">Quer ir além? Aprenda Autocustódia de Elite</h3>
                  <p className="text-muted-foreground text-sm leading-7">Hardware wallets, multisig, passphrase e protocolos avançados para grandes quantias.</p>
                </div>
                <Link to="/autocustodia" className="group inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary/10 border border-primary/25 text-primary text-xs font-bold tracking-[0.15em] uppercase hover:bg-primary/20 transition-all duration-300 shrink-0">
                  Autocustódia Avançada
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── DIFERENCIAL ── */}
        <section className="px-6 md:px-12 lg:px-20 py-16 md:py-24">
          <div className="max-w-5xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease: APPLE_EASE }}>
              <h2 className="font-bold text-3xl md:text-4xl tracking-tight mb-10 leading-[1.1]" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                Exchange tradicional <span className="text-destructive">vs.</span> Compra privada
              </h2>
            </motion.div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border/30">
                    <th className="text-left py-4 px-4 text-muted-foreground font-mono text-xs uppercase tracking-wider">Critério</th>
                    <th className="text-center py-4 px-4 text-destructive font-mono text-xs uppercase tracking-wider">Exchange KYC</th>
                    <th className="text-center py-4 px-4 text-primary font-mono text-xs uppercase tracking-wider">SpikeTuSpike + Liquid</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  {[
                    ["Dados pessoais", "CPF, e-mail, selfie, comprovante", "Nenhum dado pessoal"],
                    ["Reporte ao governo", "Diário ao Banco Central", "Nenhum reporte"],
                    ["Bloqueio de conta", "A qualquer momento", "Impossível — você é o banco"],
                    ["Privacidade", "Zero — saldo exposto", "Total — transações confidenciais"],
                    ["IOF / Impostos", "Tributado automaticamente", "Sem intermediário fiscal"],
                    ["Risco de sequestro", "Dados expostos em vazamentos", "Sem vínculo identitário"],
                  ].map(([c, trad, priv], i) => (
                    <tr key={i} className="border-b border-border/10 hover:bg-card/40 transition-colors">
                      <td className="py-3.5 px-4 text-foreground/80 font-medium">{c}</td>
                      <td className="py-3.5 px-4 text-center text-destructive/70">{trad}</td>
                      <td className="py-3.5 px-4 text-center text-primary/90 font-medium">{priv}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="px-6 md:px-12 lg:px-20 py-16 md:py-24 bg-card/30">
          <div className="max-w-4xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease: APPLE_EASE }}>
              <h2 className="font-bold text-3xl md:text-4xl tracking-tight mb-8 leading-[1.1]" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                Perguntas Frequentes
              </h2>
            </motion.div>

            <Accordion type="single" collapsible className="space-y-3">
              {faqs.map((f, i) => (
                <AccordionItem key={i} value={`faq-${i}`} className="border border-border/20 rounded-lg px-5 bg-card/40 backdrop-blur-sm">
                  <AccordionTrigger className="text-sm font-semibold text-foreground/90 hover:no-underline">
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-sm leading-7">
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* ── CTA FINAL ── */}
        <section className="px-6 md:px-12 lg:px-20 py-16 md:py-20">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease: APPLE_EASE }}>
              <p className="font-mono text-[10px] tracking-[0.3em] text-destructive/70 uppercase mb-4">O tempo está acabando</p>
              <h2 className="font-bold text-3xl md:text-5xl tracking-tight mb-5 leading-[1.1]" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                Não espere o confisco <span className="text-destructive">chegar</span>
              </h2>
              <p className="text-muted-foreground text-base max-w-xl mx-auto mb-8 leading-8">
                Cada dia que passa, o cerco aperta. Cada exchange que reporta, mais dados expostos. A hora de blindar seu patrimônio é agora.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/autocustodia" className="group inline-flex items-center gap-3 py-4 px-10 rounded-sm bg-primary/10 border border-primary/30 text-primary font-semibold tracking-wide text-sm hover:bg-primary/20 transition-all duration-300">
                  <Lock className="w-4 h-4" />
                  Blindar Meu Patrimônio
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                </Link>
                <Link to="/comprar-bitcoin-com-privacidade" className="inline-flex items-center gap-2 py-4 px-8 rounded-sm border border-border/30 text-muted-foreground hover:text-foreground text-sm transition-all duration-300">
                  <Bitcoin className="w-4 h-4" />
                  Comprar BTC Privado
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        <FooterSection />
      </div>

      <style>{`
        @keyframes confiscoBlink { 0%,100%{opacity:1} 50%{opacity:0.2} }
      `}</style>
    </div>
  );
}
