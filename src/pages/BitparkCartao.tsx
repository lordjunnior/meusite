import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ArrowLeft, ArrowRight, Bitcoin, CreditCard, TrendingUp, Snowflake,
  Zap, Shield, CheckCircle2, XCircle, HelpCircle, ChevronDown,
  DollarSign, Percent, Clock, Wallet, ExternalLink, AlertTriangle,
  Gift, Flame, Target, BarChart3,
} from 'lucide-react';
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from '@/components/ui/accordion';
import SeoHead from '@/components/SeoHead';
import ScrollToTop from '@/components/ScrollToTop';
import FooterSection from '@/components/FooterSection';
import BackToHome from '@/components/BackToHome';

import imgHero from '@/assets/bitpark-card-hero.jpg';
import imgCuboGelo from '@/assets/bitpark-cubo-gelo.jpg';
import imgRecompensa from '@/assets/bitpark-recompensa-diaria.jpg';
import imgBancoVsBtc from '@/assets/bitpark-banco-vs-bitcoin.jpg';

gsap.registerPlugin(ScrollTrigger);

/* ═══════════════════════════════════════════════════════
   CONSTANTES & DADOS
   ═══════════════════════════════════════════════════════ */

const APPLE_EASE = [0.22, 1, 0.36, 1] as const;
const fadeUp = {
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.7, ease: APPLE_EASE },
};
const fadeUpDelay = (d: number) => ({ ...fadeUp, transition: { ...fadeUp.transition, delay: d } });

const SIMULACAO = [
  { colateral: 'R$ 1.000', diario: 'R$ 0,58', mensal: 'R$ 12,73', anual: 'R$ 146,50', satsDia: '~58 sats' },
  { colateral: 'R$ 5.000', diario: 'R$ 2,90', mensal: 'R$ 63,67', anual: 'R$ 732,50', satsDia: '~290 sats' },
  { colateral: 'R$ 10.000', diario: 'R$ 5,81', mensal: 'R$ 127,33', anual: 'R$ 1.465', satsDia: '~581 sats' },
  { colateral: 'R$ 25.000', diario: 'R$ 14,52', mensal: 'R$ 318,33', anual: 'R$ 3.662', satsDia: '~1.452 sats' },
  { colateral: 'R$ 50.000', diario: 'R$ 29,04', mensal: 'R$ 636,67', anual: 'R$ 7.325', satsDia: '~2.904 sats' },
  { colateral: 'R$ 100.000', diario: 'R$ 58,08', mensal: 'R$ 1.273', anual: 'R$ 14.650', satsDia: '~5.808 sats' },
];

const COMPARACAO = [
  { criterio: 'Rendimento', banco: 'CDI − IR (≈11%)', bitpark: '100% CDI em BTC', vencedor: 'bitpark' },
  { criterio: 'Ativo recebido', banco: 'Real (inflação -6%/ano)', bitpark: 'Bitcoin (escassez absoluta)', vencedor: 'bitpark' },
  { criterio: 'Taxa de conversão', banco: 'N/A (continua em Real)', bitpark: '0% — sem taxa', vencedor: 'bitpark' },
  { criterio: 'Liquidez do colateral', banco: 'Parcial (carência CDB)', bitpark: '100% líquido sempre', vencedor: 'bitpark' },
  { criterio: 'Uso do saldo', banco: 'Bloqueado ou penalizado', bitpark: 'Limite do cartão', vencedor: 'bitpark' },
  { criterio: 'Imposto de Renda', banco: 'IOF + IR regressivo', bitpark: 'Recompensa, não investimento', vencedor: 'bitpark' },
  { criterio: 'Cashback', banco: '0,5-1% em pontos inúteis', bitpark: 'Cashback + sats diários', vencedor: 'bitpark' },
  { criterio: 'Proteção inflação', banco: '❌ Perde poder de compra', bitpark: '✅ Acumula ativo deflacionário', vencedor: 'bitpark' },
];

const FAQ_ITEMS = [
  {
    q: 'A Bipa é regulamentada? É segura?',
    a: 'Sim. A Bipa é uma empresa brasileira registrada e regulamentada. Seus reais ficam como colateral (garantia), não são emprestados ou reaplicados. É uma das plataformas mais transparentes do ecossistema Bitcoin no Brasil.',
  },
  {
    q: 'Preciso declarar os sats recebidos?',
    a: 'Os satoshis recebidos como recompensa devem ser declarados como bens (criptoativos) na Declaração de IR caso o total de cripto exceda R$ 5.000. Porém, a natureza de "recompensa" difere de um rendimento de investimento tradicional — consulte seu contador para detalhes.',
  },
  {
    q: 'Posso sacar os reais do colateral a qualquer momento?',
    a: 'Sim. O colateral é 100% líquido. Você pode sacar a qualquer momento, sem carência, sem multa. É seu dinheiro, disponível para uso imediato como limite do cartão ou saque.',
  },
  {
    q: 'Quanto preciso para começar?',
    a: 'Não há valor mínimo oficial. Qualquer valor depositado como colateral já começa a gerar recompensas em sats no próximo dia útil. Com R$ 1.000 você já recebe cerca de 58 sats por dia.',
  },
  {
    q: 'O que são sats/CETS?',
    a: 'Sats (satoshis) são a menor unidade do Bitcoin — 1 BTC = 100.000.000 sats. CETS é a forma como a Bipa credita essas frações na sua carteira. É como centavos para o Real, mas para o Bitcoin.',
  },
  {
    q: 'Posso usar o cartão para pagar contas normais?',
    a: 'Sim. O cartão da Bipa funciona como um cartão pré-pago Visa/Mastercard. Você usa para compras, contas, assinaturas — tudo normal. Seu colateral define o limite, e cada compra ainda pode gerar cashback adicional.',
  },
  {
    q: 'E se o Bitcoin cair?',
    a: 'Seus reais continuam intactos como colateral. Os sats recebidos são recompensas — se o preço do BTC cair no curto prazo, você acumula MAIS satoshis pelo mesmo valor. Pense como DCA (Dollar Cost Averaging) automático.',
  },
  {
    q: 'Qual a diferença para um CDB que paga 100% CDI?',
    a: 'O CDB paga em Real (que perde 6%+ ao ano com inflação), cobra IOF nos primeiros 30 dias e IR regressivo de 22,5% a 15%. A Bipa paga em Bitcoin (ativo deflacionário), sem taxa de conversão, sem IOF, sem carência. Você recebe o ativo mais escasso do planeta em vez de um cubo de gelo derretendo.',
  },
];

const VANTAGENS = [
  { icon: Bitcoin, title: 'Sats Todo Dia Útil', desc: '100% do CDI convertido automaticamente em Bitcoin. Sem taxa, sem esforço.' },
  { icon: CreditCard, title: 'Cartão Funcional', desc: 'Visa/Mastercard para compras reais. Seu colateral é o limite.' },
  { icon: Shield, title: 'Colateral 100% Líquido', desc: 'Seu dinheiro nunca fica preso. Saque a qualquer momento.' },
  { icon: Gift, title: 'Cashback Extra', desc: 'Além dos sats diários, ganhe cashback em cada compra no cartão.' },
  { icon: TrendingUp, title: 'DCA Automático', desc: 'Acumulação constante de Bitcoin sem precisar fazer nada.' },
  { icon: Zap, title: 'Zero Burocracia', desc: 'Sem IOF, sem IR regressivo, sem carência. Simples como deveria ser.' },
];

/* ═══════════════════════════════════════════════════════
   COMPONENTE PRINCIPAL
   ═══════════════════════════════════════════════════════ */

export default function BitparkCartao() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const progressWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  // GSAP reveals
  useEffect(() => {
    window.scrollTo(0, 0);
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.gsap-reveal').forEach((el) => {
        gsap.fromTo(el,
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 85%', once: true } }
        );
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  // Live sats counter animation
  const [satsCount, setSatsCount] = useState(0);
  useEffect(() => {
    const target = 581; // sats per day for 10k colateral
    const duration = 2500;
    const start = Date.now();
    const timer = setInterval(() => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setSatsCount(Math.floor(eased * target));
      if (progress >= 1) clearInterval(timer);
    }, 16);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <SeoHead
        path="/bitpark-cartao-bitcoin"
        custom={{
          title: 'Cartão Bipa: Dinheiro Parado Gera Bitcoin Todo Dia — Como Funciona',
          description: 'Seu dinheiro parado no banco rende cubos de gelo. Com o cartão da Bipa, ele gera Bitcoin diário: 100% CDI em sats, colateral líquido, zero taxa. Simulador + guia completo.',
          canonical: 'https://lordjunnior.com.br/bitpark-cartao-bitcoin',
          primaryKeyword: 'cartão bipa bitcoin',
          lsiKeywords: ['cashback bitcoin', 'cartão cripto brasil', 'bipa card', 'CDI em bitcoin', 'recompensa satoshis', 'cartão bitcoin brasil', 'dinheiro parado gera bitcoin', 'sats diários'],
          longTailKeywords: ['como ganhar bitcoin com dinheiro parado', 'cartão que paga em bitcoin', 'bipa card vale a pena', 'cashback em bitcoin brasil'],
          breadcrumbs: [
            { name: 'Início', url: '/' },
            { name: 'Soberania Financeira', url: '/soberania-financeira' },
            { name: 'Cartão Bipa', url: '/bitpark-cartao-bitcoin' },
          ],
          schemaType: 'Article',
          articleSection: 'Soberania Financeira',
        }}
        faqItems={FAQ_ITEMS.map(f => ({ question: f.q, answer: f.a }))}
      />

      <div ref={containerRef} className="min-h-screen" style={{ background: '#050808' }}>
        {/* Progress Bar */}
        <motion.div className="fixed top-0 left-0 right-0 h-[2px] z-50 origin-left bg-amber-500" style={{ width: progressWidth }} />

        {/* VFX Layer */}
        <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.035]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`, backgroundRepeat: 'repeat', backgroundSize: '128px 128px' }} />
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute w-[600px] h-[600px] rounded-full bg-amber-500/[0.04] blur-[160px] top-[5%] left-[10%] animate-pulse" style={{ animationDuration: '8s' }} />
          <div className="absolute w-[400px] h-[400px] rounded-full bg-orange-500/[0.03] blur-[120px] bottom-[20%] right-[5%] animate-pulse" style={{ animationDuration: '12s' }} />
        </div>

        {/* BackToHome */}
        <div className="relative z-20 px-6 md:px-12 lg:px-20 pt-[52px]">
          <BackToHome />
        </div>

        {/* ═══ HERO — FULL BLEED ═══ */}
        <section className="relative z-10">
          {/* Full-width cinematic image */}
          <div className="relative w-full h-[60vh] md:h-[75vh] lg:h-[85vh] overflow-hidden">
            <img
              src={imgHero}
              alt="Cartão Bipa Bitcoin — cartão premium com símbolo Bitcoin em dourado flutuando sobre grade tecnológica"
              className="absolute inset-0 w-full h-full object-cover"
              loading="eager" fetchPriority="high" decoding="async" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050808] via-[#050808]/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#050808]/60 via-transparent to-transparent" />

            {/* Content overlay */}
            <div className="absolute inset-0 flex items-end pb-12 md:pb-20">
              <div className="max-w-7xl mx-auto px-5 md:px-8 w-full">
                <motion.div {...fadeUp}>
                  <Link to="/soberania-financeira" className="inline-flex items-center gap-2 text-stone-400 hover:text-amber-400 text-xs font-semibold uppercase tracking-[0.2em] transition-colors mb-6">
                    <ArrowLeft size={14} /> Soberania Financeira
                  </Link>

                  <div className="flex items-center gap-3 mb-5">
                    <span className="px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/25 text-amber-400 font-mono text-[10px] tracking-[0.3em] uppercase font-bold backdrop-blur-sm">
                      NOVO — EXCLUSIVO
                    </span>
                    <span className="px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/25 text-emerald-400 font-mono text-[10px] tracking-[0.3em] uppercase font-bold backdrop-blur-sm">
                      VIRAL NO YOUTUBE
                    </span>
                  </div>

                  <h1 className="text-5xl md:text-6xl lg:text-8xl font-black text-white mb-4" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '0.03em', lineHeight: 1.05 }}>
                    DINHEIRO PARADO<br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500">
                      GERA BITCOIN.
                    </span>
                  </h1>

                  <p className="text-lg md:text-xl text-stone-300 leading-relaxed max-w-2xl" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
                    Enquanto o banco te paga em <strong className="text-blue-300">cubos de gelo</strong> que derretem com a inflação, o cartão da Bipa converte <strong className="text-amber-300">100% do CDI em Bitcoin</strong> — todo dia útil, sem taxa.
                  </p>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Stats + CTA strip below hero */}
          <div className="max-w-7xl mx-auto px-5 md:px-8 -mt-6 relative z-20">
            <motion.div {...fadeUpDelay(0.2)} className="flex flex-col md:flex-row items-center gap-6 py-8">
              <div className="flex items-center gap-6">
                <div className="flex flex-col items-center px-6 py-4 rounded-xl bg-amber-500/5 border border-amber-500/15 backdrop-blur-sm">
                  <span className="font-mono text-3xl md:text-4xl font-black text-amber-400">{satsCount.toLocaleString()}</span>
                  <span className="text-[10px] tracking-[0.2em] uppercase text-stone-500 mt-1">sats/dia (R$ 10k)</span>
                </div>
                <div className="flex flex-col items-center px-6 py-4 rounded-xl bg-emerald-500/5 border border-emerald-500/15 backdrop-blur-sm">
                  <span className="font-mono text-3xl md:text-4xl font-black text-emerald-400">0%</span>
                  <span className="text-[10px] tracking-[0.2em] uppercase text-stone-500 mt-1">taxa conversão</span>
                </div>
              </div>

              <p className="text-sm text-stone-500 max-w-sm">
                R$ 10.000 parados = <strong className="text-stone-200">R$ 5,81/dia</strong> → <strong className="text-amber-400">R$ 1.465/ano em Bitcoin</strong>
              </p>

              <a
                href="https://bfrens.bipa.app/lordjunnior"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-bold text-base tracking-wide overflow-hidden transition-all duration-500 hover:scale-[1.02] ml-auto"
                style={{ background: 'linear-gradient(135deg, #f59e0b, #d97706)' }}
              >
                <span className="relative z-10 text-black flex items-center gap-2">
                  <Bitcoin size={18} />
                  ATIVAR MEU CARTÃO BIPA
                  <ExternalLink size={14} />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-amber-300 to-orange-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </a>
            </motion.div>
          </div>
        </section>

        {/* ═══ SEÇÃO: CUBOS DE GELO ═══ */}
        <section className="relative z-10 py-24">
          <div className="max-w-7xl mx-auto px-5 md:px-8">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <motion.div {...fadeUp} className="order-2 lg:order-1">
                <div className="rounded-2xl overflow-hidden">
                  <img src={imgCuboGelo} alt="Cubos de gelo derretendo ao redor de moedas Bitcoin douradas — metáfora visual do dinheiro fiat perdendo valor" className="w-full h-auto" loading="lazy" width={768} height={768} />
                </div>
              </motion.div>
              <motion.div {...fadeUpDelay(0.15)} className="order-1 lg:order-2">
                <span className="text-amber-500 font-mono text-[10px] font-bold tracking-[0.3em] uppercase block mb-3">[ O PROBLEMA ]</span>
                <h2 className="text-3xl md:text-4xl font-black text-stone-100 mb-6" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '0.03em' }}>
                  SEU BANCO TE PAGA EM CUBOS DE GELO
                </h2>
                <div className="space-y-4 text-stone-300 leading-relaxed" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
                  <p>
                    Abra o app do seu banco agora. Veja o <strong className="text-stone-100">"rendimento"</strong> da sua poupança. Parece bonito, né? Agora desconte a <strong className="text-red-400">inflação real</strong> (não a oficial) e o <strong className="text-red-400">imposto de renda</strong>.
                  </p>
                  <p>
                    O que sobra? <strong className="text-red-300">Nada.</strong> Ou pior: negativo. Seu dinheiro "rendeu" em números, mas <em>compra menos</em> do que comprava antes. É como encher um balde com um furo no fundo.
                  </p>
                  <p>
                    O CDI brasileiro é de ~14,65% bruto. Mas após IR regressivo (22,5% a 15%), IOF e inflação real de 6-8%, o <strong className="text-white">rendimento líquido real é próximo de zero</strong>. Em muitos anos, é <strong className="text-red-400">negativo</strong>.
                  </p>
                  <div className="mt-6 p-4 rounded-xl bg-red-500/5 border border-red-500/15">
                    <div className="flex items-start gap-3">
                      <Snowflake className="text-blue-400 mt-1 shrink-0" size={18} />
                      <p className="text-sm text-stone-400">
                        <strong className="text-stone-200">A metáfora perfeita:</strong> Seu banco te paga em cubos de gelo. Parece sólido quando você olha, mas derrete no calor da inflação antes de você poder usar.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ═══ SEÇÃO: A SOLUÇÃO ═══ */}
        <section className="relative z-10 py-24" style={{ background: 'linear-gradient(180deg, transparent, rgba(245,158,11,0.02), transparent)' }}>
          <div className="max-w-7xl mx-auto px-5 md:px-8">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <motion.div {...fadeUp}>
                <span className="text-emerald-400 font-mono text-[10px] font-bold tracking-[0.3em] uppercase block mb-3">[ A SOLUÇÃO ]</span>
                <h2 className="text-3xl md:text-4xl font-black text-stone-100 mb-6" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '0.03em' }}>
                  TRANSFORME REAIS PARADOS EM SATOSHIS DIÁRIOS
                </h2>
                <div className="space-y-4 text-stone-300 leading-relaxed" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
                  <p>
                    A Bipa criou algo que deveria ser ilegal de tão bom: você deposita reais como <strong className="text-stone-100">colateral</strong> (garantia), usa como limite do cartão, e todo dia útil recebe <strong className="text-amber-300">100% do CDI convertido em Bitcoin</strong> — sem taxa de conversão.
                  </p>
                  <p>
                    Não é investimento. Não é CDB. Não é fundo. É uma <strong className="text-amber-400">recompensa</strong> por usar o cartão e manter seus reais como garantia. E essa diferença importa — porque muda completamente a tributação.
                  </p>

                  <div className="mt-6 grid grid-cols-2 gap-3">
                    {[
                      { label: '100% CDI', sub: 'em Bitcoin', icon: Percent },
                      { label: '0% Taxa', sub: 'conversão', icon: DollarSign },
                      { label: 'Liquidez', sub: 'total', icon: Wallet },
                      { label: 'Todo Dia', sub: 'útil', icon: Clock },
                    ].map((item) => (
                      <div key={item.label} className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/10 text-center">
                        <item.icon className="mx-auto text-amber-400 mb-2" size={20} />
                        <div className="text-sm font-bold text-stone-200">{item.label}</div>
                        <div className="text-[10px] text-stone-500 uppercase tracking-wider">{item.sub}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
              <motion.div {...fadeUpDelay(0.15)}>
                <div className="rounded-2xl overflow-hidden">
                  <img src={imgRecompensa} alt="Dashboard de recompensas diárias em Bitcoin — satoshis acumulando automaticamente" className="w-full h-auto" loading="lazy" width={768} height={768} />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ═══ SEÇÃO: COMO FUNCIONA — 4 PASSOS ═══ */}
        <section className="relative z-10 py-24">
          <div className="max-w-7xl mx-auto px-5 md:px-8">
            <motion.div {...fadeUp} className="text-center mb-16">
              <span className="text-amber-500 font-mono text-[10px] font-bold tracking-[0.3em] uppercase block mb-3">[ PROTOCOLO ]</span>
              <h2 className="text-3xl md:text-5xl font-black text-stone-100" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '0.03em' }}>
                COMO FUNCIONA EM 4 PASSOS
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
              {[
                { step: '01', title: 'Solicite o Cartão', desc: 'Cadastre-se na Bipa pelo link exclusivo. Processo 100% digital, sem burocracia bancária.', icon: CreditCard, color: 'amber' },
                { step: '02', title: 'Deposite Colateral', desc: 'Transfira reais via PIX. Esse valor vira seu limite E gera recompensas. 100% líquido.', icon: Wallet, color: 'emerald' },
                { step: '03', title: 'Receba Sats Diários', desc: '100% do CDI é convertido em satoshis todo dia útil, sem taxa, creditado automaticamente.', icon: Bitcoin, color: 'orange' },
                { step: '04', title: 'Use o Cartão', desc: 'Pague contas, compras e assinaturas. Ganhe cashback extra em cada transação.', icon: Zap, color: 'sky' },
              ].map((item, i) => (
                <motion.div key={item.step} {...fadeUpDelay(i * 0.1)} className="gsap-reveal">
                  <div className={`relative p-6 rounded-2xl border bg-${item.color}-500/[0.04] border-${item.color}-500/[0.12] h-full`} style={{ background: `rgba(${item.color === 'amber' ? '245,158,11' : item.color === 'emerald' ? '16,185,129' : item.color === 'orange' ? '249,115,22' : '14,165,233'}, 0.04)`, borderColor: `rgba(${item.color === 'amber' ? '245,158,11' : item.color === 'emerald' ? '16,185,129' : item.color === 'orange' ? '249,115,22' : '14,165,233'}, 0.12)` }}>
                    <span className="font-mono text-[10px] tracking-[0.3em] text-stone-600 block mb-4">{item.step}</span>
                    <item.icon className={`mb-3 ${item.color === 'amber' ? 'text-amber-400' : item.color === 'emerald' ? 'text-emerald-400' : item.color === 'orange' ? 'text-orange-400' : 'text-sky-400'}`} size={24} />
                    <h3 className="text-lg font-bold text-stone-200 mb-2">{item.title}</h3>
                    <p className="text-sm text-stone-500 leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ SEÇÃO: SIMULADOR ═══ */}
        <section className="relative z-10 py-24" style={{ background: 'linear-gradient(180deg, transparent, rgba(245,158,11,0.03), transparent)' }}>
          <div className="max-w-7xl mx-auto px-5 md:px-8">
            <motion.div {...fadeUp} className="text-center mb-12">
              <span className="text-amber-500 font-mono text-[10px] font-bold tracking-[0.3em] uppercase block mb-3">[ SIMULADOR DE SATS ]</span>
              <h2 className="text-3xl md:text-5xl font-black text-stone-100 mb-4" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '0.03em' }}>
                QUANTO VOCÊ GANHARIA?
              </h2>
              <p className="text-stone-500 max-w-2xl mx-auto">
                Simulação baseada em CDI de 14,65% a.a. (abril 2026) convertido em BTC sem taxa. Valores aproximados para dias úteis.
              </p>
            </motion.div>

            <motion.div {...fadeUpDelay(0.1)} className="gsap-reveal">
              <div className="overflow-x-auto rounded-2xl border border-amber-500/10 bg-amber-500/[0.02]">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-amber-500/10">
                      <th className="p-4 text-[10px] tracking-[0.2em] uppercase text-stone-500 font-bold">Colateral</th>
                      <th className="p-4 text-[10px] tracking-[0.2em] uppercase text-stone-500 font-bold">Sats/Dia</th>
                      <th className="p-4 text-[10px] tracking-[0.2em] uppercase text-stone-500 font-bold">R$/Dia</th>
                      <th className="p-4 text-[10px] tracking-[0.2em] uppercase text-stone-500 font-bold">R$/Mês</th>
                      <th className="p-4 text-[10px] tracking-[0.2em] uppercase text-amber-400 font-bold">R$/Ano em BTC</th>
                    </tr>
                  </thead>
                  <tbody>
                    {SIMULACAO.map((row, i) => (
                      <tr key={i} className="border-b border-white/[0.03] hover:bg-amber-500/[0.03] transition-colors">
                        <td className="p-4 text-sm font-bold text-stone-200">{row.colateral}</td>
                        <td className="p-4 text-sm text-amber-400 font-mono">{row.satsDia}</td>
                        <td className="p-4 text-sm text-stone-400 font-mono">{row.diario}</td>
                        <td className="p-4 text-sm text-stone-400 font-mono">{row.mensal}</td>
                        <td className="p-4 text-sm font-bold text-amber-300 font-mono">{row.anual}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-center text-[10px] text-stone-600 mt-4 tracking-wider">
                * Base: CDI 14,65% a.a. / ~252 dias úteis / cotação BTC ilustrativa. Recompensa real pode variar.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ═══ SEÇÃO: COMPARATIVO ═══ */}
        <section className="relative z-10 py-24">
          <div className="max-w-7xl mx-auto px-5 md:px-8">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
              <motion.div {...fadeUp}>
                <span className="text-red-400 font-mono text-[10px] font-bold tracking-[0.3em] uppercase block mb-3">[ CONFRONTO BRUTAL ]</span>
                <h2 className="text-3xl md:text-4xl font-black text-stone-100 mb-6" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '0.03em' }}>
                  BANCO TRADICIONAL<br />
                  <span className="text-amber-400">VS. CARTÃO BIPA</span>
                </h2>
                <div className="rounded-2xl overflow-hidden mb-6">
                  <img src={imgBancoVsBtc} alt="Confronto visual: cofre bancário congelado vs rede Bitcoin dourada e vibrante" className="w-full h-auto" loading="lazy" width={1344} height={768} />
                </div>
              </motion.div>

              <motion.div {...fadeUpDelay(0.1)} className="gsap-reveal">
                <div className="space-y-2">
                  {COMPARACAO.map((row, i) => (
                    <div key={i} className="grid grid-cols-[1fr_1fr_1fr] gap-2 items-center p-3 rounded-lg hover:bg-white/[0.02] transition-colors">
                      <div className="text-xs font-bold text-stone-400 uppercase tracking-wider">{row.criterio}</div>
                      <div className="text-xs text-stone-500 flex items-center gap-1.5">
                        <XCircle size={12} className="text-red-500/60 shrink-0" />
                        <span>{row.banco}</span>
                      </div>
                      <div className="text-xs text-stone-200 flex items-center gap-1.5">
                        <CheckCircle2 size={12} className="text-emerald-400 shrink-0" />
                        <span>{row.bitpark}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 p-5 rounded-xl bg-amber-500/5 border border-amber-500/15">
                  <p className="text-sm text-stone-300 leading-relaxed">
                    <strong className="text-amber-400">Veredito:</strong> O banco te paga em moeda que perde 6% ao ano. A Bipa te paga no ativo mais escasso da história humana. Não é uma questão de opinião — é matemática.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ═══ SEÇÃO: 6 VANTAGENS ═══ */}
        <section className="relative z-10 py-24" style={{ background: 'linear-gradient(180deg, transparent, rgba(16,185,129,0.02), transparent)' }}>
          <div className="max-w-7xl mx-auto px-5 md:px-8">
            <motion.div {...fadeUp} className="text-center mb-14">
              <span className="text-emerald-400 font-mono text-[10px] font-bold tracking-[0.3em] uppercase block mb-3">[ ARSENAL DE VANTAGENS ]</span>
              <h2 className="text-3xl md:text-5xl font-black text-stone-100" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '0.03em' }}>
                POR QUE O CARTÃO BIPA MUDA O JOGO
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {VANTAGENS.map((v, i) => (
                <motion.div key={v.title} {...fadeUpDelay(i * 0.08)} className="gsap-reveal p-6 rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:border-amber-500/20 hover:bg-amber-500/[0.03] transition-all duration-500 group">
                  <v.icon className="text-amber-400 mb-4 group-hover:scale-110 transition-transform" size={24} />
                  <h3 className="text-base font-bold text-stone-200 mb-2">{v.title}</h3>
                  <p className="text-sm text-stone-500 leading-relaxed">{v.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ SEÇÃO: CTA PREMIUM ═══ */}
        <section className="relative z-10 py-24">
          <div className="max-w-4xl mx-auto px-5 md:px-8">
            <motion.div {...fadeUp}>
              <div className="relative rounded-3xl overflow-hidden p-[1px]" style={{ background: 'conic-gradient(from 0deg, #f59e0b, #d97706, #f59e0b, #92400e, #f59e0b)', animation: 'spin 4s linear infinite' }}>
                <div className="relative rounded-3xl p-10 md:p-16 text-center" style={{ background: '#0a0c0f' }}>
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-amber-500/10 border border-amber-500/20 mb-6">
                    <Bitcoin size={28} className="text-amber-400" />
                  </div>

                  <h2 className="text-3xl md:text-5xl font-black text-stone-100 mb-6" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '0.03em' }}>
                    PARE DE ALIMENTAR O SISTEMA.<br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">COMECE A ACUMULAR BITCOIN.</span>
                  </h2>

                  <p className="text-stone-400 text-base md:text-lg leading-relaxed max-w-2xl mx-auto mb-8">
                    Cada dia que passa com dinheiro parado no banco é um dia que você <strong className="text-stone-200">paga para ser roubado pela inflação</strong>. O cartão da Bipa transforma esse dinheiro morto em <strong className="text-amber-300">satoshis vivos</strong> — automaticamente, sem esforço.
                  </p>

                  <a
                    href="https://bfrens.bipa.app/lordjunnior"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative inline-flex items-center justify-center gap-3 px-10 py-5 rounded-xl font-bold text-lg tracking-wide overflow-hidden transition-all duration-500 hover:scale-[1.03]"
                    style={{ background: 'linear-gradient(135deg, #f59e0b, #d97706)' }}
                  >
                    <span className="relative z-10 text-black flex items-center gap-2">
                      ATIVAR MEU CARTÃO AGORA
                      <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-amber-300 to-orange-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </a>

                  <p className="mt-4 text-[10px] text-stone-600 tracking-wider uppercase">
                    Link exclusivo com benefícios · Sem compromisso · 100% reversível
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ═══ SEÇÃO: FAQ ═══ */}
        <section className="relative z-10 py-24">
          <div className="max-w-4xl mx-auto px-5 md:px-8">
            <motion.div {...fadeUp} className="text-center mb-12">
              <span className="text-stone-600 font-mono text-[10px] font-bold tracking-[0.3em] uppercase block mb-3">PERGUNTAS FREQUENTES</span>
              <h2 className="text-3xl md:text-4xl font-black text-stone-100" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '0.03em' }}>
                DÚVIDAS <span className="text-amber-400">RESOLVIDAS</span>
              </h2>
            </motion.div>

            <motion.div {...fadeUpDelay(0.1)}>
              <Accordion type="single" collapsible className="space-y-2">
                {FAQ_ITEMS.map((item, i) => (
                  <AccordionItem key={i} value={`faq-${i}`} className="border border-white/[0.06] rounded-xl bg-white/[0.01] overflow-hidden">
                    <AccordionTrigger className="px-6 py-4 text-left text-sm font-semibold text-stone-200 hover:text-amber-400 hover:no-underline [&[data-state=open]]:text-amber-400">
                      <div className="flex items-center gap-3">
                        <HelpCircle size={16} className="text-amber-500/50 shrink-0" />
                        {item.q}
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-5 text-sm text-stone-400 leading-relaxed pl-[52px]">
                      {item.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </motion.div>
          </div>
        </section>

        {/* ═══ SEÇÃO: LINKS INTERNOS (Topic Cluster) ═══ */}
        <section className="relative z-10 py-16">
          <div className="max-w-7xl mx-auto px-5 md:px-8">
            <motion.div {...fadeUp}>
              <div className="grid md:grid-cols-3 gap-4">
                {[
                  { title: 'Bitcoin vs Fiat: A Verdade', desc: 'O Real já perdeu 99,7% do valor. Veja os dados.', href: '/bitcoin-vs-fiat', icon: BarChart3 },
                  { title: 'Autocustódia de Elite', desc: 'Proteja seus sats com hardware wallets e passphrase.', href: '/autocustodia', icon: Shield },
                  { title: 'Inflação: Imposto Oculto', desc: 'Como o estado rouba 6%+ do seu dinheiro todo ano.', href: '/inflacao-imposto-oculto', icon: AlertTriangle },
                ].map((link) => (
                  <Link key={link.href} to={link.href} className="group p-5 rounded-xl border border-white/[0.06] bg-white/[0.01] hover:border-amber-500/20 hover:bg-amber-500/[0.03] transition-all duration-300">
                    <link.icon className="text-amber-500/50 mb-3 group-hover:text-amber-400 transition-colors" size={18} />
                    <h3 className="text-sm font-bold text-stone-300 group-hover:text-stone-100 mb-1">{link.title}</h3>
                    <p className="text-xs text-stone-600">{link.desc}</p>
                  </Link>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        <ScrollToTop />
        <FooterSection />
      </div>

      {/* CSS for rotating border */}
      <style>{`
        @keyframes spin { to { --angle: 360deg; } }
      `}</style>
    </>
  );
}
