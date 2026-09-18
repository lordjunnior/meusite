import React, { useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { ArrowRight, PieChart, AlertTriangle, TrendingDown, ShieldCheck, Flame, ChevronDown, Scale, Target, Skull, Crown, Shield, Layers, Clock, Crosshair, TrendingUp, DollarSign, Building, Gem, Banknote, Bird, BookOpen } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import CinematicHero from '@/components/CinematicHero';
import ScrollToTop from '@/components/ScrollToTop';
import diversificacaoFalaciaImg from '@/assets/diversificacao-falacia.webp';
import diversificacaoBalancaImg from '@/assets/diversificacao-balanca.webp';
import diversificacaoCisneImg from '@/assets/diversificacao-cisne-negro.webp';
import diversificacaoPortfolioImg from '@/assets/diversificacao-portfolio.webp';
import BackToHome from '@/components/BackToHome';
import { canonicalUrl } from '@/lib/site';

const APPLE_EASE = [0.22, 1, 0.36, 1] as const;
const fadeUp = {
  hidden: { opacity: 0, y: 30, filter: 'blur(6px)' },
  visible: (i: number) => ({ opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.7, ease: APPLE_EASE, delay: i * 0.12 } }),
};

function useMouseParallax(s = 15) {
  const mx = useMotionValue(0), my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 50, damping: 20 }), sy = useSpring(my, { stiffness: 50, damping: 20 });
  const h = useCallback((e: MouseEvent) => { mx.set(((e.clientX - window.innerWidth / 2) / (window.innerWidth / 2)) * s); my.set(((e.clientY - window.innerHeight / 2) / (window.innerHeight / 2)) * s); }, [mx, my, s]);
  useEffect(() => { window.addEventListener('mousemove', h); return () => window.removeEventListener('mousemove', h); }, [h]);
  return { sx, sy };
}

/* ══ Cinematic Image Break ══ */
const CinematicBreak: React.FC<{ src: string; alt: string; caption: string }> = ({ src, alt, caption }) => (
  <section className="relative z-10 py-8 md:py-14">
    <div className="max-w-6xl mx-auto px-4 md:px-10">
      <motion.div initial={{ opacity: 0, y: 40, scale: 0.97 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.9, ease: APPLE_EASE }}
        className="relative rounded-2xl overflow-hidden border border-white/[0.06] group"
      >
        <img src={src} alt={alt} className="w-full h-56 md:h-[420px] object-cover transition-transform duration-[1.5s] group-hover:scale-[1.03]" style={{ filter: 'brightness(0.7) saturate(0.85)' }} loading="lazy" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, transparent 20%, rgba(5,8,8,0.7) 70%, rgba(5,8,8,0.95) 100%)' }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(212,175,55,0.05), transparent 50%)' }} />
        <div className="absolute bottom-5 left-6 right-6 flex items-end justify-between">
          <p className="text-stone-400 text-[11px] font-mono uppercase tracking-[0.2em] leading-relaxed max-w-lg">{caption}</p>
          <div className="hidden md:block w-12 h-px bg-gradient-to-r from-yellow-500/40 to-transparent" />
        </div>
      </motion.div>
    </div>
  </section>
);

const SectionGlow = () => (
  <div className="relative z-10 h-px max-w-5xl mx-auto">
    <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, transparent, rgba(212,175,55,0.15), transparent)' }} />
  </div>
);

const CLASSES_ATIVOS = [
  { icon: Banknote, label: 'Renda Fixa', detail: 'Tesouro, CDB, LCI/LCA', accent: '#38bdf8' },
  { icon: TrendingUp, label: 'Ações', detail: 'Bovespa, NYSE, Nasdaq', accent: '#34d399' },
  { icon: Layers, label: 'Fundos Diversos', detail: 'Multimercado, Hedge', accent: '#c084fc' },
  { icon: Gem, label: 'Commodities', detail: 'Ouro, prata, petróleo', accent: '#d4af37' },
  { icon: DollarSign, label: 'Moedas Fiat', detail: 'Dólar, euro, libra', accent: '#f59e0b' },
  { icon: Building, label: 'Fundos Imobiliários', detail: 'FIIs, REITs', accent: '#f43f5e' },
];

const FALHAS = [
  { icon: TrendingDown, title: 'Correlação em Crise', accent: '#f43f5e', desc: 'Em momentos de pânico sistêmico (2008, 2020), TODOS os ativos tradicionais caem juntos. Ações, imóveis, commodities — tudo correlaciona para 1.0. A diversificação que deveria proteger falha exatamente quando você mais precisa dela. O motivo: todos esses ativos estão denominados na mesma moeda fiat e sujeitos às mesmas políticas monetárias.' },
  { icon: Flame, title: 'Inflação Devora Rendimentos', accent: '#f59e0b', desc: 'Com inflação real de 8-15% ao ano no Brasil (não o IPCA maquiado), um portfólio "diversificado" rendendo 12% ao ano está simplesmente empatando — ou perdendo poder de compra. Você diversifica entre 10 ativos diferentes e todos perdem para a impressão de dinheiro. Não é diversificação, é diluição organizada.' },
  { icon: Scale, title: 'Custos Ocultos Multiplicados', accent: '#38bdf8', desc: 'Cada ativo na carteira tem sua própria camada de custos: taxa de administração, performance, custódia, corretagem, imposto sobre ganho de capital. Multiplicar ativos multiplica taxas. Estudos mostram que, após custos, a maioria dos fundos "diversificados" perde para o CDI — e todos perdem para o Bitcoin no longo prazo.' },
  { icon: Skull, title: 'Risco de Contraparte Sistêmico', accent: '#c084fc', desc: 'Ações dependem de empresas que podem falir. Títulos dependem de governos que podem dar calote. Fundos dependem de gestores que podem fraudar. Imóveis dependem de regulação que pode mudar. Cada ativo "diversificado" carrega um risco de contraparte. O Bitcoin, em autocustódia, tem risco de contraparte ZERO — você é o banco, o custodiante e o auditor.' },
];

const COMPARATIVO = [
  { ativo: 'Poupança', retorno10a: '+70%', vsInflacao: '-40%', risco: 'Confisco, congelamento', confiscavel: true },
  { ativo: 'CDI', retorno10a: '+130%', vsInflacao: '-15%', risco: 'Tributação progressiva', confiscavel: true },
  { ativo: 'Ibovespa', retorno10a: '+90%', vsInflacao: '-30%', risco: 'Risco sistêmico, político', confiscavel: true },
  { ativo: 'Imóveis', retorno10a: '+80%', vsInflacao: '-35%', risco: 'Iliquidez, regulação, IPTU', confiscavel: true },
  { ativo: 'Ouro', retorno10a: '+120%', vsInflacao: '-10%', risco: 'Confisco (já aconteceu)', confiscavel: true },
  { ativo: 'Bitcoin', retorno10a: '+26.000%', vsInflacao: '+25.800%', risco: 'Volatilidade de curto prazo', confiscavel: false },
];

const ARGUMENTOS = [
  { contra: '"Não coloque todos os ovos na mesma cesta"', resposta: 'Quando todas as cestas estão no mesmo barco furado (sistema fiat), diversificar entre cestas é inútil. O Bitcoin é outro barco — com motor próprio, sem capitão e sem destino pré-definido por políticos.' },
  { contra: '"Bitcoin é muito volátil para concentrar"', resposta: 'Volatilidade é o preço da assimetria. Um ativo que pode cair 50% mas subir 1.000% não é arriscado — é oportunidade mal compreendida. A volatilidade do Bitcoin diminui a cada ciclo enquanto a adoção cresce exponencialmente.' },
  { contra: '"Profissionais sempre diversificam"', resposta: 'Warren Buffett: "Diversificação é proteção contra a ignorância. Faz pouco sentido se você sabe o que está fazendo." Michael Saylor: "Concentre em Bitcoin. Diversificar em ativos inferiores é diluir sua vantagem."' },
  { contra: '"E se o Bitcoin cair para zero?"', resposta: 'Para o Bitcoin ir a zero, seria necessário desligar a internet global, destruir milhares de nós em dezenas de países e convencer bilhões de pessoas a abandonar o ativo de melhor performance da história. O Real já perdeu 99.7% contra o dólar desde 1994. Qual está mais perto de zero?' },
];

const CISNE_NEGRO = [
  { cenario: 'Dólar avança para R$ 8', impacto: 'Portfólio 100% Brasil perde poder de compra global. Quem tem Bitcoin e contas internacionais: protegido.', cor: '#f43f5e' },
  { cenario: 'Imóveis desvalorizam 30%', impacto: 'FIIs e imóveis diretos em queda livre. Sem liquidez para sair. Bitcoin: vende em 5 minutos, 24/7.', cor: '#f59e0b' },
  { cenario: 'Ações cedem 50%', impacto: 'Ibovespa em colapso. Fundos fechados para resgate. Circuit breakers. Bitcoin: sem horário de fechamento, sem circuit breaker, sem gestores decidindo por você.', cor: '#c084fc' },
];

export default function Diversificacao() {
  const { scrollYProgress } = useScroll();
  const { sx, sy } = useMouseParallax(12);
  const pw = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen text-stone-100 font-sans selection:bg-amber-400/30 relative overflow-hidden" style={{ background: '#050808' }}>
      <Helmet>
        <link rel="canonical" href={canonicalUrl('/diversificacao')} />
        <meta property="og:url" content={canonicalUrl('/diversificacao')} />
        <title>Diversificação de Portfólio — Guia Completo + Análise Estratégica Bitcoin | Arsenal Técnico</title>
        <meta name="description" content="Aprenda a diversificar seu portfólio de investimentos: classes de ativos, risco vs retorno, cisne negro e por que o Bitcoin muda a equação. Guia educacional completo com análise crítica." />
        <meta name="keywords" content="diversificação, portfólio, investimentos, risco retorno, classes de ativos, renda fixa, ações, bitcoin investimento, cisne negro, perfil de risco" />
      </Helmet>

      <ScrollToTop />
      <div className="relative z-20 px-6 md:px-12 lg:px-20 pt-[52px]">
        <BackToHome />
      </div>

      <motion.div className="fixed top-0 left-0 right-0 h-[2px] z-50 origin-left" style={{ width: pw, background: 'linear-gradient(90deg, #d4af37, #f59e0b)' }} />

      {/* Film grain + Light beams */}
      <div className="fixed inset-0 pointer-events-none z-[1]">
        <div className="absolute inset-0 opacity-[0.035]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`, backgroundSize: '128px 128px' }} />
        <div className="absolute inset-0 opacity-[0.02]" style={{ background: 'linear-gradient(125deg, transparent 30%, rgba(212,175,55,0.06) 50%, transparent 70%)' }} />
      </div>

      {/* Breathing Orbs */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <motion.div className="absolute top-[-10%] right-[-10%] w-[800px] h-[800px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(212,175,55,0.06) 0%, transparent 60%)', x: sx, y: sy }} />
        <motion.div className="absolute bottom-[5%] left-[-5%] w-[600px] h-[600px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(245,158,11,0.04) 0%, transparent 60%)', x: useTransform(sx, v => -v * 0.5), y: useTransform(sy, v => -v * 0.5) }} />
      </div>

      {/* ─── CINEMATIC HERO ─── */}
      <CinematicHero
        image="/heroes/diversificacao.webp"
        phase="Análise Estratégica"
        title={<>DIVERSI<span style={{ color: '#f59e0b' }}>FICAÇÃO</span></>}
        subtitle="Não importa se você está começando com R$ 500 ou se possui investimentos há anos. Venha entender as classes de ativos, o equilíbrio entre risco e retorno — e descobrir por que o Bitcoin muda completamente esta equação."
        icon={PieChart}
        accentColor="amber"
        backLink="/educacao"
        backLabel="Arsenal Técnico"
      />

      {/* ══ DISCLAIMER DE SOBERANIA ══ */}
      <section className="relative z-10 py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-6 md:px-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}
            className="relative rounded-2xl border border-amber-500/20 p-6 md:p-8 overflow-hidden"
            style={{ background: 'linear-gradient(135deg, rgba(245,158,11,0.06), rgba(239,68,68,0.03), transparent 70%)' }}
          >
            <motion.div className="absolute inset-0 pointer-events-none rounded-2xl"
              animate={{ boxShadow: ['inset 0 0 0px rgba(245,158,11,0)', 'inset 0 0 30px rgba(245,158,11,0.05)', 'inset 0 0 0px rgba(245,158,11,0)'] }}
              transition={{ duration: 4, repeat: Infinity }}
            />
            <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(245,158,11,0.4), transparent)' }} />
            <div className="relative z-10 flex items-start gap-4">
              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 shrink-0 mt-0.5">
                <Shield className="text-amber-400" size={22} />
              </div>
              <div>
                <p className="text-amber-400 font-bold text-xs uppercase tracking-[0.3em] mb-3">⚠ Aviso de Posicionamento</p>
                <p className="text-stone-300 text-sm md:text-base leading-relaxed mb-3">
                  <span className="text-white font-bold">Este conteúdo não constitui recomendação financeira.</span> Todo o ecossistema defende a <span className="text-amber-400 font-semibold">autocustódia e Bitcoin como reserva de valor</span>. A análise sobre diversificação tradicional é apresentada como ferramenta educacional — não como recomendação de investimento.
                </p>
                <p className="text-stone-400 text-sm leading-relaxed mb-3">
                  Este material foi criado <span className="text-stone-200 font-semibold">a pedido recorrente da comunidade no Instagram</span>. Apresentamos o conteúdo técnico sobre portfólio para que você entenda o tema — e possa formar sua própria convicção com base em dados, não em opinião alheia.
                </p>
                <p className="text-stone-500 text-xs leading-relaxed italic">
                  "A convicção vem do estudo profundo, não da recomendação de terceiros." — Faça sua própria análise antes de agir.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/* ══ CAP 01 — O Que é Diversificação ══ */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      <section className="relative z-10 py-24 md:py-32" style={{ background: 'linear-gradient(180deg, #050808, #070b0b)' }}>
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
              <BookOpen className="text-yellow-500/40 mb-5" size={28} />
              <p className="text-yellow-400/70 text-[10px] font-bold uppercase tracking-[0.5em] mb-6">Capítulo 01</p>
              <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                O que é <span className="text-yellow-400">diversificação?</span>
              </h2>
              <div className="space-y-5">
                <p className="text-stone-400 text-sm md:text-base leading-relaxed">
                  Ninguém precisa estudar finanças para saber que é muito arriscado colocar todo o investimento em um só lugar. <span className="text-stone-200 font-semibold">Distribuir a aplicação em diferentes tipos de ativos reduz muito o risco</span>, especialmente quando não há correlação — ou seja, os fatores que trazem alta ou queda são muito diferentes entre eles.
                </p>
                <p className="text-stone-400 text-sm md:text-base leading-relaxed">
                  Por exemplo: um fundo de <span className="text-yellow-400 font-bold">renda fixa no Brasil</span> não tem correlação com as ações da Apple. Se um cai, o outro não necessariamente acompanha. Essa é a essência da diversificação — construir uma rede de proteção onde um ativo compensa a queda do outro.
                </p>
                <p className="text-stone-500 text-sm leading-relaxed italic">
                  Mas como veremos adiante, essa teoria tem falhas graves quando todos os ativos estão denominados na mesma moeda em colapso.
                </p>
              </div>
            </motion.div>

            {/* Classes de Ativos */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0.3}>
              <p className="text-stone-600 text-[10px] font-bold uppercase tracking-[0.4em] mb-5">Classes de Ativos</p>
              <div className="grid grid-cols-2 gap-3">
                {CLASSES_ATIVOS.map((c, i) => (
                  <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i * 0.08}
                    className="group p-4 rounded-xl border border-white/[0.06] hover:border-white/[0.15] transition-all duration-500 hover:-translate-y-0.5"
                    style={{ background: `linear-gradient(135deg, ${c.accent}06, transparent 60%)` }}
                  >
                    <c.icon size={18} className="mb-2.5 opacity-70" style={{ color: c.accent }} />
                    <p className="text-white font-bold text-sm mb-0.5">{c.label}</p>
                    <p className="text-stone-600 text-[11px]">{c.detail}</p>
                  </motion.div>
                ))}
              </div>
              <p className="text-stone-700 text-[10px] mt-3 font-mono leading-relaxed">
                * Criptomoedas ficam fora da classificação tradicional — há debate se entrariam como moedas ou commodities digitais.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══ IMAGEM: Portfólio ══ */}
      <CinematicBreak src={diversificacaoPortfolioImg} alt="Mesa de análise financeira com Bitcoin holográfico" caption="Antes de diversificar, entenda o que está comprando" />

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/* ══ CAP 02 — Risco X Retorno ══ */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      <section className="relative z-10 py-24 md:py-32" style={{ background: '#070b0b' }}>
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="mb-16">
            <span className="text-stone-700 text-[10px] font-bold uppercase tracking-[0.5em] block mb-2">Capítulo 02</span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Risco <span className="text-yellow-400">X</span> Retorno
            </h2>
            <p className="text-stone-500 text-sm md:text-base leading-relaxed max-w-3xl">
              Quais as chances de um Título do Tesouro, emitido pelo governo, não cumprir suas obrigações? <span className="text-stone-300 font-semibold">Praticamente zero</span> — portanto o potencial de lucro acima da inflação é bem pequeno. Quanto mais risco adicionarmos, <span className="text-yellow-400 font-bold">maior o potencial de retorno</span>. Mas isso <span className="text-red-400 font-semibold">não é garantia</span> de resultado positivo.
            </p>
          </motion.div>

          {/* Risk spectrum */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0.2}
            className="relative rounded-2xl border border-white/[0.06] p-6 md:p-10 overflow-hidden mb-10"
            style={{ background: 'linear-gradient(135deg, rgba(56,189,248,0.03), rgba(239,68,68,0.03))' }}
          >
            <p className="text-stone-600 text-[10px] font-bold uppercase tracking-[0.4em] mb-8 text-center">Espectro Risco ↔ Retorno</p>
            <div className="flex items-center justify-between gap-2 md:gap-4 overflow-x-auto pb-2">
              {[
                { label: 'Poupança', risco: 'Mínimo', cor: '#38bdf8' },
                { label: 'Tesouro', risco: 'Baixo', cor: '#34d399' },
                { label: 'CDB/LCI', risco: 'Baixo-Médio', cor: '#a3e635' },
                { label: 'FIIs', risco: 'Médio', cor: '#f59e0b' },
                { label: 'Ações', risco: 'Médio-Alto', cor: '#f97316' },
                { label: 'Cripto', risco: 'Alto', cor: '#f43f5e' },
                { label: 'Bitcoin', risco: 'Assimétrico', cor: '#d4af37' },
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center min-w-[70px] md:min-w-[90px]">
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 flex items-center justify-center mb-2 transition-transform hover:scale-110" style={{ borderColor: item.cor, background: `${item.cor}15` }}>
                    <span className="text-[10px] font-bold" style={{ color: item.cor }}>{i + 1}</span>
                  </div>
                  <p className="text-white text-[11px] font-bold text-center">{item.label}</p>
                  <p className="text-stone-600 text-[9px] text-center">{item.risco}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 h-1 rounded-full overflow-hidden" style={{ background: 'linear-gradient(to right, #38bdf8, #34d399, #a3e635, #f59e0b, #f97316, #f43f5e, #d4af37)' }} />
            <div className="flex justify-between mt-2">
              <span className="text-stone-700 text-[9px] uppercase tracking-widest font-bold">← Menor Risco</span>
              <span className="text-stone-700 text-[9px] uppercase tracking-widest font-bold">Maior Retorno →</span>
            </div>
          </motion.div>

          {/* Practical insight */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0.3}
              className="p-6 rounded-2xl border border-white/[0.06] relative overflow-hidden"
              style={{ background: 'linear-gradient(135deg, rgba(56,189,248,0.04), transparent 60%)' }}
            >
              <Clock size={20} className="text-blue-400/60 mb-3" />
              <h3 className="text-base font-bold text-white mb-3">Horizonte Curto (até 12 meses)</h3>
              <p className="text-stone-500 text-sm leading-relaxed">
                Se há grandes chances de precisar resgatar em até 12 meses, provavelmente é melhor manter entre <span className="text-stone-300 font-semibold">80% e 90% em aplicações de baixo risco</span>. Capital de emergência não é para aventura.
              </p>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0.4}
              className="p-6 rounded-2xl border border-white/[0.06] relative overflow-hidden"
              style={{ background: 'linear-gradient(135deg, rgba(212,175,55,0.04), transparent 60%)' }}
            >
              <Target size={20} className="text-yellow-400/60 mb-3" />
              <h3 className="text-base font-bold text-white mb-3">Horizonte Longo (5+ anos)</h3>
              <p className="text-stone-500 text-sm leading-relaxed">
                Para quem possui horizonte longo ou deseja potencial de ganho maior, o risco é <span className="text-yellow-400 font-semibold">desejável</span>. Neste caso, o montante em criptomoedas, ações e fundos multimercados alavancados deve ficar <span className="text-stone-300 font-semibold">acima de 50%</span>.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══ IMAGEM: Balança ══ */}
      <CinematicBreak src={diversificacaoBalancaImg} alt="Balança com ativos tradicionais vs Bitcoin" caption="O peso da assimetria — um ativo que redefine a equação" />

      <SectionGlow />

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/* ══ CAP 03 — Existe uma diversificação ideal? ══ */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      <section className="relative z-10 py-24 md:py-32">
        <div className="max-w-5xl mx-auto px-6 md:px-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="mb-16">
            <span className="text-stone-700 text-[10px] font-bold uppercase tracking-[0.5em] block mb-2">Capítulo 03</span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Existe uma diversificação <span className="text-yellow-400">ideal?</span>
            </h2>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0.2}
            className="relative rounded-2xl border border-yellow-500/15 p-8 md:p-12 overflow-hidden mb-10"
            style={{ background: 'linear-gradient(135deg, rgba(212,175,55,0.04), rgba(245,158,11,0.02))' }}
          >
            <div className="absolute inset-0 opacity-[0.03]" style={{ background: 'radial-gradient(circle at 20% 50%, rgba(212,175,55,0.3), transparent 50%)' }} />
            <div className="relative z-10 space-y-6">
              <p className="text-stone-300 text-sm md:text-base leading-relaxed">
                <span className="text-yellow-400 font-bold text-lg">Simplifique sua vida.</span> Não existe uma fórmula mágica, pois mesmo os melhores modelos econômicos não conseguem prever o futuro. Uma vez que você definiu o percentual que deseja colocar em aplicações de risco, comece dividindo igualmente entre <span className="text-white font-semibold">2 ou 3 investimentos</span>.
              </p>
              <p className="text-stone-300 text-sm md:text-base leading-relaxed">
                Por exemplo: <span className="text-yellow-400 font-bold">Ações, Bitcoin e fundos multimercados alavancados</span>. Quem vai definir o perfil de risco é o percentual que você alocou em renda fixa. Se alocou 80% em renda fixa, seu perfil é conservador. Se alocou 20%, é agressivo.
              </p>
              <div className="h-px w-full" style={{ background: 'linear-gradient(to right, transparent, rgba(212,175,55,0.2), transparent)' }} />
              <p className="text-stone-500 text-sm leading-relaxed italic">
                A beleza está na simplicidade. Complicar o portfólio é uma armadilha do mercado financeiro para cobrar mais taxas.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══ IMAGEM: Falácia ══ */}
      <CinematicBreak src={diversificacaoFalaciaImg} alt="Ativos tradicionais se desintegrando" caption="Quando tudo é denominado na mesma moeda podre, diversificar é ilusão" />

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/* ══ CAP 04 — Cisne Negro ══ */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      <section className="relative z-10 py-24 md:py-32" style={{ background: '#070b0b' }}>
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
              <Bird className="text-yellow-500/40 mb-4" size={28} />
              <span className="text-stone-700 text-[10px] font-bold uppercase tracking-[0.5em] block mb-2">Capítulo 04</span>
              <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                O teste do <span className="text-yellow-400">cisne negro</span>
              </h2>
              <p className="text-stone-400 text-sm md:text-base leading-relaxed mb-5">
                A melhor maneira de descobrir se o seu portfólio está bem diversificado é imaginar os <span className="text-white font-semibold">"cisnes negros"</span> — apelido dado a situações que têm poucas chances de ocorrer, mas ficam dentro de um cenário plausível. Pergunte-se:
              </p>
              <p className="text-stone-500 text-sm leading-relaxed italic">
                O que ocorre com sua carteira se o dólar avançar para R$ 8? E se os imóveis desvalorizarem 30%? Como ficam os retornos se as ações cederem 50%?
              </p>
            </motion.div>

            <div className="space-y-4">
              {CISNE_NEGRO.map((c, i) => (
                <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i * 0.15}
                  className="group rounded-xl border border-white/[0.06] p-5 transition-all duration-500 hover:-translate-y-0.5 hover:border-white/[0.12] overflow-hidden relative"
                  style={{ background: `linear-gradient(135deg, ${c.cor}06, transparent 60%)` }}
                >
                  <p className="text-xs font-bold tracking-[0.3em] uppercase mb-2" style={{ color: `${c.cor}99` }}>Cenário {i + 1}</p>
                  <h3 className="text-base font-bold text-white mb-2">{c.cenario}</h3>
                  <p className="text-stone-500 text-sm leading-relaxed group-hover:text-stone-400 transition-colors">{c.impacto}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ IMAGEM: Cisne Negro ══ */}
      <CinematicBreak src={diversificacaoCisneImg} alt="Cisne negro em águas turbulentas com gráficos financeiros" caption="O cisne negro não avisa quando chega — seu portfólio precisa estar pronto" />

      <SectionGlow />

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/* ══ CAP 05 — Por que a diversificação falha ══ */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      <section className="relative z-10 py-24 md:py-36">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="mb-16">
            <AlertTriangle className="text-red-400/50 mb-4" size={24} />
            <span className="text-stone-700 text-[10px] font-bold uppercase tracking-[0.5em] block mb-2">Capítulo 05 — Diagnóstico</span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              4 razões pelas quais <span className="text-red-400">diversificação falha</span>
            </h2>
            <p className="text-stone-500 text-sm md:text-base leading-relaxed max-w-3xl">
              Entender o conceito de diversificação é importante. Mas igualmente importante é entender <span className="text-stone-300 font-semibold">por que ele falha na prática</span> — especialmente em um país com a moeda em colapso permanente.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {FALHAS.map((f, i) => {
              const Icon = f.icon;
              return (
                <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i * 0.15}
                  className="group rounded-2xl border border-white/[0.06] hover:border-white/[0.12] p-6 md:p-8 transition-all duration-500 hover:-translate-y-1 overflow-hidden relative"
                  style={{ background: `linear-gradient(135deg, ${f.accent}06, transparent 60%)` }}
                >
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" style={{ background: `radial-gradient(ellipse at top left, ${f.accent}10, transparent 60%)` }} />
                  <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
                    <div className="absolute top-0 -left-full w-full h-px group-hover:left-full transition-all duration-[1.5s] ease-in-out" style={{ background: `linear-gradient(to right, transparent, ${f.accent}40, transparent)` }} />
                  </div>
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2.5 rounded-xl border" style={{ background: `${f.accent}10`, borderColor: `${f.accent}25` }}>
                        <Icon size={18} style={{ color: f.accent }} />
                      </div>
                      <span className="text-[10px] font-bold tracking-[0.4em] uppercase opacity-50" style={{ color: f.accent }}>0{i + 1}</span>
                    </div>
                    <h3 className="text-lg font-bold text-white mb-3">{f.title}</h3>
                    <p className="text-stone-500 text-sm leading-relaxed group-hover:text-stone-400 transition-colors">{f.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/* ══ CAP 06 — Tabela Comparativa 10 Anos ══ */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      <section className="relative z-10 py-24 md:py-32" style={{ background: '#070b0b' }}>
        <div className="max-w-5xl mx-auto px-6 md:px-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="mb-12">
            <span className="text-stone-700 text-[10px] font-bold uppercase tracking-[0.5em] block mb-2">Capítulo 06 — Os Números</span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              10 anos em <span className="text-yellow-400">perspectiva</span>
            </h2>
            <p className="text-stone-500 text-sm md:text-base leading-relaxed max-w-3xl">
              Perceba que o Bitcoin possui uma variação mais agressiva — no entanto foi o ativo que conseguiu <span className="text-stone-300 font-semibold">maior ganho ao fim do período</span>. Os números não mentem.
            </p>
          </motion.div>

          <div className="overflow-x-auto rounded-2xl border border-white/[0.06]" style={{ background: 'rgba(212,175,55,0.02)' }}>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/[0.08]">
                  <th className="text-left py-4 px-4 text-stone-600 font-mono text-[10px] tracking-widest uppercase">Ativo</th>
                  <th className="text-right py-4 px-4 text-stone-600 font-mono text-[10px] tracking-widest uppercase">Retorno 10A</th>
                  <th className="text-right py-4 px-4 text-stone-600 font-mono text-[10px] tracking-widest uppercase">vs Inflação Real</th>
                  <th className="text-left py-4 px-4 text-stone-600 font-mono text-[10px] tracking-widest uppercase">Risco Principal</th>
                  <th className="text-center py-4 px-4 text-stone-600 font-mono text-[10px] tracking-widest uppercase">Confiscável?</th>
                </tr>
              </thead>
              <tbody>
                {COMPARATIVO.map((c, i) => (
                  <motion.tr key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i * 0.1}
                    className={`border-b border-white/[0.04] ${c.ativo === 'Bitcoin' ? 'bg-yellow-500/[0.06]' : 'hover:bg-white/[0.02]'} transition-colors`}
                  >
                    <td className={`py-4 px-4 font-bold ${c.ativo === 'Bitcoin' ? 'text-yellow-400' : 'text-white'}`}>{c.ativo}</td>
                    <td className={`py-4 px-4 text-right font-mono font-bold ${c.ativo === 'Bitcoin' ? 'text-emerald-400' : 'text-stone-400'}`}>{c.retorno10a}</td>
                    <td className={`py-4 px-4 text-right font-mono font-bold ${c.vsInflacao.startsWith('+') ? 'text-emerald-400' : 'text-red-400'}`}>{c.vsInflacao}</td>
                    <td className="py-4 px-4 text-stone-500 text-xs">{c.risco}</td>
                    <td className="py-4 px-4 text-center">{c.confiscavel ? <span className="text-red-400 font-bold text-xs">SIM</span> : <span className="text-emerald-400 font-bold text-xs">NÃO*</span>}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-stone-700 text-[10px] mt-4 font-mono">* Em autocustódia. Bitcoins em exchanges são confiscáveis.</p>
        </div>
      </section>

      <SectionGlow />

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/* ══ CAP 07 — Contra-Argumentos ══ */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      <section className="relative z-10 py-24 md:py-36">
        <div className="max-w-5xl mx-auto px-6 md:px-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="mb-16">
            <Crosshair className="text-yellow-500/40 mb-4" size={24} />
            <span className="text-stone-700 text-[10px] font-bold uppercase tracking-[0.5em] block mb-2">Capítulo 07 — Debate Encerrado</span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Respostas que <span className="text-yellow-400">encerram discussões</span>
            </h2>
          </motion.div>

          <div className="space-y-5">
            {ARGUMENTOS.map((a, i) => (
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i * 0.15}
                className="group rounded-2xl border border-white/[0.06] hover:border-yellow-500/20 p-6 md:p-8 transition-all duration-500 hover:-translate-y-1 overflow-hidden relative"
                style={{ background: 'linear-gradient(135deg, rgba(212,175,55,0.03), transparent 60%)' }}
              >
                <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
                  <div className="absolute top-0 -left-full w-full h-px group-hover:left-full transition-all duration-[1.5s] ease-in-out" style={{ background: 'linear-gradient(to right, transparent, rgba(212,175,55,0.3), transparent)' }} />
                </div>
                <div className="relative z-10">
                  <p className="text-stone-400 font-mono text-xs italic mb-3">{a.contra}</p>
                  <div className="w-8 h-px bg-yellow-500/30 mb-3" />
                  <p className="text-stone-500 text-sm leading-relaxed group-hover:text-stone-400 transition-colors">{a.resposta}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/* ══ CTA FINAL ══ */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      <section className="relative z-10 py-24 md:py-36 border-t border-white/[0.04]" style={{ background: '#070b0b' }}>
        <div className="max-w-4xl mx-auto px-6 md:px-10 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
            <Crown className="mx-auto text-yellow-500/40 mb-6" size={32} />
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Concentração não é risco. É <span className="text-yellow-400">convicção.</span>
            </h2>
            <p className="text-stone-500 text-base md:text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
              Quem entende o Bitcoin não diversifica — acumula. A assimetria de retorno não se repete em nenhum outro ativo da história humana. Mas lembre-se: faça sua própria pesquisa.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/bitcoin-vs-imovel" className="inline-flex items-center gap-3 bg-yellow-500 hover:bg-yellow-400 text-black px-8 py-4 rounded-xl font-bold text-xs uppercase tracking-[0.2em] transition-all duration-500 hover:gap-4 hover:shadow-[0_0_30px_rgba(212,175,55,0.3)]">
                Bitcoin vs Imóvel <ArrowRight size={16} />
              </Link>
              <Link to="/volatilidade" className="inline-flex items-center gap-3 border border-yellow-500/30 hover:border-yellow-500/60 text-yellow-400 px-8 py-4 rounded-xl font-bold text-xs uppercase tracking-[0.2em] transition-all duration-500">
                Volatilidade <ArrowRight size={16} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Signature */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-10 py-16">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center space-y-4">
          <div className="h-px w-32 mx-auto mb-6" style={{ background: 'linear-gradient(to right, transparent, rgba(212,175,55,0.2), transparent)' }} />
          <p className="text-stone-600 font-mono text-xs uppercase tracking-widest">Diversificar em fraqueza é multiplicar a perda.</p>
          <p className="text-stone-800 font-mono text-[10px] tracking-widest">Lord Junnior © 2026</p>
        </motion.div>
      </div>
    </div>
  );
}
