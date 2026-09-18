import PageFloatingToc from "@/components/PageFloatingToc";
import React, { useState, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, useMotionValue, useSpring, useInView, AnimatePresence } from 'framer-motion';
import {
  ArrowRight, ArrowLeft, Zap, Smartphone, ShieldCheck,
  QrCode, RefreshCcw, ChevronDown, Copy, Check, X
} from 'lucide-react';
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";
import CinematicHero from '@/components/CinematicHero';
import ScrollToTop from '@/components/ScrollToTop';
import SovereignDisclaimer from '@/components/SovereignDisclaimer';
import qrCodeLightning from '@/assets/qrcode-lightning.webp';
import pixCritoHero from '@/assets/pix-cripto-hero.webp';
import pixCritoTutorial from '@/assets/pix-cripto-tutorial.webp';
import BackToHome from '@/components/BackToHome';
import { canonicalUrl } from '@/lib/site';

/* ─── CONSTANTS ─── */
const APPLE_EASE = [0.22, 1, 0.36, 1] as const;
const BG_DARK = '#050808';
const BG_ALT = '#070b0b';

/* ─── ANIMATIONS ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 30, filter: 'blur(6px)' },
  visible: (i: number) => ({
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: 0.7, ease: APPLE_EASE, delay: i * 0.12 },
  }),
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.92, filter: 'blur(8px)' },
  visible: (i: number) => ({
    opacity: 1, scale: 1, filter: 'blur(0px)',
    transition: { duration: 0.8, ease: APPLE_EASE, delay: i * 0.15 },
  }),
};

/* ─── MOUSE PARALLAX ─── */
function useMouseParallax(strength = 15) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });
  const handleMouse = useCallback((e: MouseEvent) => {
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    mouseX.set(((e.clientX - cx) / cx) * strength);
    mouseY.set(((e.clientY - cy) / cy) * strength);
  }, [mouseX, mouseY, strength]);
  useEffect(() => {
    window.addEventListener('mousemove', handleMouse);
    return () => window.removeEventListener('mousemove', handleMouse);
  }, [handleMouse]);
  return { springX, springY };
}

const PixCripto: React.FC = () => {
  const { springX, springY } = useMouseParallax(8);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [brlValue, setBrlValue] = useState<string>('350.00');
  const [pixKey, setPixKey] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showPlatform, setShowPlatform] = useState(false);

  const BRL_TO_SATS_RATE = 285.71;
  const satsValue = Math.floor(Number(brlValue) * BRL_TO_SATS_RATE);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const TOC_ITEMS = [
    { id: "passo-a-passo", label: "Passo a Passo" },
    { id: "riscos", label: "Riscos" },
    { id: "como-funciona", label: "Como Funciona" },
    { id: "faq", label: "FAQ" },
    { id: "apoiar", label: "Apoiar" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(total > 0 ? Math.min((window.scrollY / total) * 100, 100) : 0);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSimulate = () => {
    if (!brlValue || !pixKey) return;
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 5000);
    }, 2000);
  };

  return (
    <div className="min-h-screen text-stone-100 font-sans selection:bg-amber-400/50 relative overflow-hidden"
      style={{ background: BG_DARK }}>
      <div className="relative z-20 px-6 md:px-12 lg:px-20 pt-[52px]">
        <BackToHome />
      </div>


      <Helmet>
        <link rel="canonical" href={canonicalUrl('/pix-cripto')} />
        <meta property="og:url" content={canonicalUrl('/pix-cripto')} />
        <title>PIX via Bitcoin — Guia Completo de Conversão Cripto→PIX | Lord Junnior</title>
        <meta name="description" content="Aprenda a pagar PIX com Bitcoin, USDT e Ethereum. Guia completo com passo a passo, riscos, segurança e simulador interativo." />
      </Helmet>

      <PageFloatingToc items={TOC_ITEMS} accentColor="emerald" />

      <ScrollToTop />

      {/* ─── READING PROGRESS BAR ─── */}
      <div className="fixed top-0 left-0 right-0 z-50 h-[3px]">
        <div className="h-full transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress}%`, background: 'linear-gradient(90deg, #d4af37, #f59e0b)' }} />
      </div>

      {/* ─── FILM GRAIN + LIGHT BEAMS ─── */}
      <div className="fixed inset-0 pointer-events-none z-[1]">
        <div className="absolute inset-0 opacity-[0.035]"
          style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=\"0 0 256 256\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cfilter id=\"n\"%3E%3CfeTurbulence type=\"fractalNoise\" baseFrequency=\"0.9\" numOctaves=\"4\" stitchTiles=\"stitch\"/%3E%3C/filter%3E%3Crect width=\"100%25\" height=\"100%25\" filter=\"url(%23n)\"/%3E%3C/svg%3E')", backgroundSize: '128px 128px' }} />
        <div className="absolute inset-0 opacity-[0.02]"
          style={{ background: 'linear-gradient(125deg, transparent 30%, rgba(234,179,8,0.06) 50%, transparent 70%)' }} />
      </div>

      {/* ─── REACTIVE ORBS ─── */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <motion.div style={{ x: springX, y: springY }}
          className="absolute top-[15%] left-[10%] w-[500px] h-[500px] rounded-full opacity-[0.04]"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}>
          <div className="w-full h-full rounded-full bg-gradient-radial from-amber-500/30 to-transparent blur-3xl" />
        </motion.div>
        <motion.div style={{ x: springY, y: springX }}
          className="absolute bottom-[20%] right-[10%] w-[400px] h-[400px] rounded-full opacity-[0.03]"
          animate={{ scale: [1.1, 1, 1.1] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}>
          <div className="w-full h-full rounded-full bg-gradient-radial from-yellow-500/20 to-transparent blur-3xl" />
        </motion.div>
      </div>

      {/* ─── CINEMATIC HERO ─── */}
      <CinematicHero
        image={pixCritoHero}
        phase="Estratégia de Saída"
        title="PIX via Bitcoin"
        subtitle="Mantenha seu capital em Bitcoin e converta para PIX apenas no segundo exato do pagamento. Liquidez em qualquer balcão do Brasil, sem pedir permissão."
        icon={Zap}
        accentColor="amber"
        backLink="/ferramentas"
        backLabel="Arsenal"
      />

      {/* ─── SOVEREIGN DISCLAIMER ─── */}
      <div className="relative z-10 px-6 md:px-10 lg:px-16">
        <SovereignDisclaimer variant="payment" />
      </div>

      {/* ─── MAIN CONTENT ─── */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 lg:px-16 pt-16 pb-32">

        {/* ═══════════════════════════════════════════════════════
            CAPÍTULO 01 — COMO FUNCIONA
        ═══════════════════════════════════════════════════════ */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}
          className="mb-28">
          <motion.div variants={fadeUp} custom={0} className="mb-10">
            <span className="text-[10px] font-bold tracking-[0.5em] uppercase text-amber-500/60">Capítulo 01</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white mt-2"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Como Funciona (De Verdade)
            </h2>
          </motion.div>

          <motion.div variants={scaleIn} custom={1}
            className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-8 md:p-12 relative overflow-hidden
                       hover:border-amber-500/15 transition-all duration-500">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />
            <div className="space-y-6 text-stone-400 leading-relaxed">
              <p>A maior mentira que te contaram é que o Bitcoin é "difícil de usar". Essa narrativa serve exclusivamente para te manter dentro do curral bancário.</p>
              <p>O que essas plataformas fazem é simples: usam seu saldo em criptomoedas e, no momento do pagamento, convertem automaticamente para reais. O recebedor recebe um PIX normal.</p>
              <div className="border-l-2 border-amber-500/40 pl-6 py-3 bg-amber-500/[0.03] rounded-r-xl">
                <p className="text-white text-lg font-medium">Cripto → Conversão → Real → PIX. Liquidez instantânea.</p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
              <div className="flex gap-3 bg-white/[0.02] border border-white/[0.05] p-4 rounded-xl">
                <Smartphone size={18} className="text-amber-400 shrink-0 mt-0.5" />
                <span className="text-sm text-stone-400">Pagamento de contas do dia a dia.</span>
              </div>
              <div className="flex gap-3 bg-white/[0.02] border border-white/[0.05] p-4 rounded-xl">
                <ShieldCheck size={18} className="text-amber-400 shrink-0 mt-0.5" />
                <span className="text-sm text-stone-400">Fuga de bloqueios do BacenJud.</span>
              </div>
            </div>
          </motion.div>
        </motion.section>

        <div className="w-full h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent mb-28" />

        {/* ═══════════════════════════════════════════════════════
            CAPÍTULO 02 — PASSO A PASSO
        ═══════════════════════════════════════════════════════ */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}
          className="mb-28" id="passo-a-passo">
          <motion.div variants={fadeUp} custom={0} className="mb-10">
            <span className="text-[10px] font-bold tracking-[0.5em] uppercase text-amber-500/60">Capítulo 02</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white mt-2"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Passo a Passo Objetivo
            </h2>
          </motion.div>

          {/* Tutorial image */}
          <motion.div variants={scaleIn} custom={0}
            className="rounded-2xl overflow-hidden border border-white/[0.06] mb-12">
            <img src={pixCritoTutorial} alt="Tutorial PIX com Cripto" className="w-full h-auto object-cover" loading="lazy" decoding="async" />
          </motion.div>

          <div className="max-w-3xl space-y-0">
            {[
              { step: '01', title: 'Abra o app da plataforma', desc: 'Entre na área de pagamento e procure o ícone/atalho do PIX (geralmente um leitor de QR Code).' },
              { step: '02', title: 'Escaneie o QR Code ou cole o código', desc: 'Você pode ler o QR Code do recebedor ou colar o "copia e cola" do PIX.' },
              { step: '03', title: 'Escolha o "saldo" de pagamento', desc: 'Selecione qual cripto vai usar (BTC, USDT, ETH). A plataforma converte automaticamente para reais.' },
              { step: '04', title: 'Confirme e finalize', desc: 'O recebedor recebe em reais via PIX. Para ele, é um PIX normal. Para você, foi cripto virando reais no ato.' },
            ].map((item, i) => (
              <motion.div key={item.step} variants={fadeUp} custom={i}
                className="flex gap-6 pb-10 relative group">
                {i < 3 && <div className="absolute left-5 top-12 w-px h-[calc(100%-2rem)] bg-white/[0.06]" />}
                <div className="w-10 h-10 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 font-mono font-bold text-sm flex items-center justify-center shrink-0 relative z-10 group-hover:bg-amber-500/20 group-hover:border-amber-500/40 transition-all duration-300">
                  {item.step}
                </div>
                <div className="pt-1">
                  <h5 className="text-white font-bold mb-1 group-hover:text-amber-400 transition-colors">{item.title}</h5>
                  <p className="text-sm text-stone-500 leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Dica estratégica */}
          <motion.div variants={scaleIn} custom={2}
            className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-8 mt-8 hover:border-amber-500/15 transition-all duration-500">
            <h4 className="text-white font-bold mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Dica estratégica</h4>
            <p className="text-stone-400 leading-relaxed mb-3">
              Se quer <strong className="text-white">estabilidade</strong>, stablecoins (USDT) são mais previsíveis.
              Se quer <strong className="text-white">diversificação</strong>, mantém parte em BTC/ETH mas aceita a volatilidade.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <span className="px-4 py-2 bg-white/[0.03] border border-white/[0.06] rounded-lg text-sm text-stone-300">Estabilidade: stablecoins</span>
              <span className="px-4 py-2 bg-white/[0.03] border border-white/[0.06] rounded-lg text-sm text-stone-300">Volatilidade: BTC/ETH</span>
            </div>
          </motion.div>
        </motion.section>

        <div className="w-full h-px bg-gradient-to-r from-transparent via-red-500/20 to-transparent mb-28" />

        {/* ═══════════════════════════════════════════════════════
            CAPÍTULO 03 — RISCOS & SEGURANÇA
        ═══════════════════════════════════════════════════════ */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}
          className="mb-28" id="riscos" style={{ background: BG_ALT, margin: '0 -1.5rem', padding: '4rem 1.5rem' }}>
          <div className="max-w-7xl mx-auto">
            <motion.div variants={fadeUp} custom={0} className="mb-10">
              <span className="text-[10px] font-bold tracking-[0.5em] uppercase text-red-500/60">Capítulo 03</span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white mt-2"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Riscos & Segurança
              </h2>
              <p className="text-stone-500 mt-4 max-w-2xl">O que ninguém te fala. Aqui é onde você ganha autoridade.</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: 'Custódia', color: 'red',
                  desc: 'Para pagar PIX com cripto, quase sempre você precisa manter saldo numa plataforma. Saldo em exchange ≠ autocustódia.',
                  footer: { label: 'Not your keys…', sub: '…not your money' },
                },
                {
                  title: 'KYC / Regras', color: 'red',
                  desc: 'Plataformas costumam exigir verificação e podem impor limites. Regras podem mudar sem aviso.',
                  tags: ['Limites', 'Bloqueios', 'Mudanças de política'],
                },
                {
                  title: 'Risco Regulatório', color: 'red',
                  desc: 'O ambiente regulatório pode mudar. Isso afeta disponibilidade, taxas, limites e operações. Planeje com margem.',
                  tags: ['Sem certezas', 'Tenha plano B'],
                },
              ].map((item, i) => (
                <motion.div key={item.title} variants={scaleIn} custom={i}
                  className="bg-white/[0.03] border border-red-500/15 rounded-2xl p-8 relative overflow-hidden
                             hover:border-red-500/30 hover:bg-red-500/[0.02] transition-all duration-500">
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500/20 to-transparent" />
                  <h4 className="text-white font-bold text-lg mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{item.title}</h4>
                  <p className="text-sm text-stone-500 leading-relaxed mb-4">{item.desc}</p>
                  {item.footer && (
                    <div className="border-t border-red-500/10 pt-4">
                      <p className="text-white font-bold text-sm">{item.footer.label}</p>
                      <p className="text-red-400 text-sm font-medium">{item.footer.sub}</p>
                    </div>
                  )}
                  {item.tags && (
                    <div className="flex flex-wrap gap-2 pt-2">
                      {item.tags.map(tag => (
                        <span key={tag} className="px-3 py-1 bg-red-500/10 border border-red-500/15 rounded-md text-xs text-red-400">{tag}</span>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Conclusão prática */}
            <motion.div variants={scaleIn} custom={3}
              className="bg-white/[0.03] border border-amber-500/15 rounded-2xl p-8 mt-8
                         hover:border-amber-500/30 transition-all duration-500">
              <h4 className="text-white font-bold text-lg mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Conclusão prática</h4>
              <p className="text-stone-400 leading-relaxed text-lg">
                Usar PIX com cripto é uma ponte útil para a realidade brasileira — mas não é substituto de soberania. Use como ferramenta, não como muleta.
              </p>
            </motion.div>
          </div>
        </motion.section>

        {/* ═══════════════════════════════════════════════════════
            CAPÍTULO 04 — CLAREZA TÉCNICA
        ═══════════════════════════════════════════════════════ */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}
          className="mb-28" id="como-funciona">
          <motion.div variants={fadeUp} custom={0} className="mb-10">
            <span className="text-[10px] font-bold tracking-[0.5em] uppercase text-amber-500/60">Capítulo 04</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white mt-2"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Clareza Técnica
            </h2>
          </motion.div>

          <div className="space-y-6 max-w-3xl">
            <motion.div variants={scaleIn} custom={0}
              className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-8 hover:border-amber-500/15 transition-all duration-500">
              <h4 className="text-white font-bold text-lg mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>O que acontece quando você "faz PIX com cripto"?</h4>
              <p className="text-stone-400 leading-relaxed mb-3">A plataforma usa seu saldo em criptomoedas e converte automaticamente para reais no momento do pagamento.</p>
              <p className="text-stone-400 leading-relaxed">O recebedor recebe um PIX normal — e não precisa saber que você pagou com cripto.</p>
              <div className="flex flex-wrap gap-3 pt-4">
                <span className="px-4 py-2 bg-amber-500/10 border border-amber-500/20 rounded-lg text-sm text-amber-400 font-medium">Cripto → Real</span>
                <span className="px-4 py-2 bg-white/[0.03] border border-white/[0.06] rounded-lg text-sm text-stone-300">Liquidação instantânea</span>
              </div>
            </motion.div>

            {/* Plataforma revelável */}
            <motion.div variants={scaleIn} custom={1}>
              <button onClick={() => setShowPlatform(!showPlatform)}
                className="w-full bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6 text-left transition-all flex items-center justify-between hover:border-amber-500/15">
                <span className="text-white font-bold">Qual plataforma faz isso hoje? (clique para revelar)</span>
                <ChevronDown className={`w-5 h-5 text-stone-500 transition-transform duration-300 ${showPlatform ? 'rotate-180' : ''}`} />
              </button>
              {showPlatform && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
                  className="bg-white/[0.02] border border-white/[0.06] border-t-0 rounded-b-2xl p-8 -mt-2">
                  <p className="text-white font-bold text-lg mb-2">Bybit</p>
                  <p className="text-stone-400 leading-relaxed">
                    A Bybit oferece funcionalidade de pagamento via PIX usando saldo em criptomoedas. Verifique sempre as regras, limites e taxas diretamente no app antes de operar.
                  </p>
                  <p className="text-xs text-stone-600 mt-4 font-mono">
                    Isso não é recomendação. Pesquise, teste com valores pequenos, e tire suas próprias conclusões.
                  </p>
                </motion.div>
              )}
            </motion.div>
          </div>
        </motion.section>

        <div className="w-full h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent mb-28" />

        {/* ═══════════════════════════════════════════════════════
            CAPÍTULO 05 — FAQ
        ═══════════════════════════════════════════════════════ */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}
          className="mb-28" id="faq">
          <motion.div variants={fadeUp} custom={0} className="mb-10">
            <span className="text-[10px] font-bold tracking-[0.5em] uppercase text-amber-500/60">Capítulo 05</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white mt-2"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              FAQ (Respostas Diretas)
            </h2>
          </motion.div>

          <div className="max-w-3xl">
            <Accordion type="single" collapsible className="space-y-3">
              {[
                { q: 'Quem recebe o PIX precisa ter conta em cripto?', a: 'Não. O recebedor recebe um PIX normal em reais. Ele não precisa saber que você usou criptomoedas para pagar.' },
                { q: 'Eu pago em BTC/USDT/ETH e a pessoa recebe em reais?', a: 'Sim. A plataforma converte automaticamente o saldo da cripto escolhida para reais no momento do pagamento.' },
                { q: 'Isso substitui autocustódia?', a: 'Não. Para usar esse serviço, você precisa manter saldo na plataforma (exchange). Para soberania real, mantenha a maior parte do seu Bitcoin em carteira própria.' },
                { q: 'Posso ser bloqueado?', a: 'Sim, dependendo da plataforma. Exchanges podem impor limites, exigir verificação adicional ou bloquear operações. Tenha sempre um plano B.' },
                { q: 'Isso é recomendação de investimento?', a: 'Não. Todo conteúdo aqui é estritamente educacional.' },
              ].map((item, i) => (
                <motion.div key={i} variants={fadeUp} custom={i}>
                  <AccordionItem value={`faq-${i}`}
                    className="bg-white/[0.03] border border-white/[0.06] rounded-xl px-6 overflow-hidden hover:border-amber-500/15 transition-colors">
                    <AccordionTrigger className="text-white font-medium text-left hover:no-underline py-5">{item.q}</AccordionTrigger>
                    <AccordionContent className="text-stone-400 leading-relaxed pb-5">{item.a}</AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>
          </div>
        </motion.section>

        <div className="w-full h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent mb-28" />

        {/* ═══════════════════════════════════════════════════════
            CAPÍTULO 06 — SIMULADOR
        ═══════════════════════════════════════════════════════ */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}
          className="mb-28">
          <motion.div variants={fadeUp} custom={0} className="mb-10 text-center">
            <span className="text-[10px] font-bold tracking-[0.5em] uppercase text-amber-500/60">Simulação Interativa</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white mt-2"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Teste Você Mesmo
            </h2>
            <p className="text-stone-500 mt-4 max-w-2xl mx-auto">Simule uma operação de PIX via Bitcoin. Veja como funcionaria na prática.</p>
          </motion.div>

          <motion.div variants={scaleIn} custom={1} className="relative mx-auto w-full max-w-[360px]">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-amber-500/[0.03] blur-[100px] rounded-full pointer-events-none" />
            <div className="relative bg-white/[0.03] border border-white/[0.08] rounded-[2.5rem] p-6 shadow-2xl h-[700px] flex flex-col overflow-hidden">
              <div className="flex justify-between items-center mb-8 text-stone-500 text-xs font-bold font-mono">
                <span>21:47</span>
                <span className="flex items-center gap-1 text-amber-400"><Zap className="w-3 h-3 fill-current" /> Lightning</span>
              </div>
              <div className="mb-10">
                <span className="text-[10px] text-stone-600 uppercase tracking-widest font-bold block mb-2">Saldo Disponível</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-black text-white tracking-tighter">1.247.830</span>
                  <span className="text-amber-400 font-bold text-sm">sats</span>
                </div>
                <span className="text-xs text-stone-600 mt-1 block">≈ R$ 4.367,50</span>
              </div>
              <div className="bg-white/[0.02] border border-white/[0.05] rounded-2xl p-5 mb-auto">
                <span className="text-[10px] text-stone-600 uppercase tracking-widest font-bold block mb-4">Enviar PIX</span>
                <div className="space-y-4">
                  <div className="relative">
                    <QrCode className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-600" />
                    <input type="text" placeholder="Chave PIX" value={pixKey} onChange={(e) => setPixKey(e.target.value)}
                      className="w-full bg-white/[0.03] border border-white/[0.08] rounded-lg py-3 pl-10 pr-4 text-white text-sm focus:outline-none focus:border-amber-500/40 transition-colors placeholder:text-stone-600" />
                  </div>
                  <div className="flex items-center gap-4 pt-2">
                    <div className="flex-1">
                      <span className="text-xs text-stone-600 block mb-1">Valor R$</span>
                      <input type="number" value={brlValue} onChange={(e) => setBrlValue(e.target.value)}
                        className="w-full bg-white/[0.03] border border-white/[0.08] rounded-lg py-3 px-4 text-white font-bold text-lg focus:outline-none focus:border-amber-500/40 transition-colors" />
                    </div>
                    <ArrowRight className="w-5 h-5 text-stone-700 shrink-0 mt-5" />
                    <div className="flex-1 text-right">
                      <span className="text-xs text-stone-600 block mb-1">Débito Estimado</span>
                      <div className="bg-white/[0.02] border border-white/[0.05] rounded-lg py-3 px-4">
                        <span className="text-amber-400 font-bold text-lg">{satsValue.toLocaleString('pt-BR')}</span>
                        <span className="text-xs text-amber-500/70 ml-1">sats</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <button onClick={handleSimulate} disabled={isProcessing || success}
                className={`w-full py-4 rounded-xl font-bold uppercase tracking-wide text-sm flex items-center justify-center gap-2 transition-all ${
                  success ? 'bg-emerald-500/20 border border-emerald-500/30 text-emerald-400'
                  : isProcessing ? 'bg-amber-500/10 border border-amber-500/20 text-amber-400/60 cursor-not-allowed'
                  : 'bg-amber-500/10 border border-amber-500/25 text-amber-400 hover:bg-amber-500/20 hover:border-amber-500/40'
                }`}>
                {success ? (<><ShieldCheck className="w-5 h-5" /> PIX Enviado</>) : isProcessing ? (<><RefreshCcw className="w-5 h-5 animate-spin" /> Roteando...</>) : (<><Zap className="w-5 h-5 fill-current" /> Confirmar via Lightning</>)}
              </button>
              <div className="text-center mt-4">
                <span className="text-[9px] text-stone-700 uppercase tracking-widest font-mono">Gateway Descentralizado · Sem KYC</span>
              </div>
            </div>
          </motion.div>
        </motion.section>

        <div className="w-full h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent mb-28" />

        {/* ═══════════════════════════════════════════════════════
            APOIAR COM LIGHTNING
        ═══════════════════════════════════════════════════════ */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}
          className="mb-20" id="apoiar">
          <motion.div variants={fadeUp} custom={0}
            className="bg-white/[0.02] border border-amber-500/10 rounded-3xl p-10 md:p-16 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-radial from-amber-500/[0.03] via-transparent to-transparent" />
            <div className="relative z-10 space-y-8">
              <span className="text-[10px] font-bold tracking-[0.5em] uppercase text-amber-500/60">Apoie este projeto</span>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white leading-tight"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Apoie com <span className="text-amber-500">Lightning</span>
              </h2>
              <p className="text-stone-500 max-w-xl mx-auto leading-relaxed">
                Tudo aqui é gratuito. Sem paywall. Sem assinatura. Se isso te ajudou, apoie voluntariamente — é assim que projetos soberanos sobrevivem.
              </p>
              <div className="inline-block rounded-2xl overflow-hidden border border-white/[0.08]">
                <img src={qrCodeLightning} alt="QR Code Lightning Network" className="w-48 h-48 object-cover" loading="lazy" decoding="async" />
              </div>
              <p className="text-xs text-stone-700 font-mono">Lightning Network</p>
            </div>
          </motion.div>
        </motion.section>

        {/* ─── FOOTER ─── */}
        <footer className="border-t border-white/[0.05] pt-12 text-center space-y-4">
          <p className="text-white/80 text-lg font-medium" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Soberania não é discurso. É prática.
          </p>
          <p className="text-stone-700 text-[9px] font-bold tracking-[0.5em] uppercase">Lord Junnior © 2026</p>
        </footer>
      </div>
    </div>
  );
};

export default PixCripto;
