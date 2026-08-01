import React, { useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { ArrowRight, Swords, AlertTriangle, ShieldCheck, Skull, Crown, ChevronDown, Users, Lock, Cpu, Globe, Banknote, Flame, Shield } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import CinematicHero from '@/components/CinematicHero';
import ScrollToTop from '@/components/ScrollToTop';
import bitcoinVsAltcoinsImg from '@/assets/bitcoin-vs-altcoins-xadrez.jpg';
import BackToHome from '@/components/BackToHome';

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

const ALTCOINS = [
  {
    nome: 'Ethereum (ETH)',
    subtitulo: 'O "Computador Mundial" centralizado',
    accent: '#8b5cf6',
    icon: Cpu,
    problemas: [
      'Pré-minerado: 72 milhões de ETH foram criados e distribuídos para insiders antes do lançamento público.',
      'Centralização: A migração para Proof of Stake (PoS) concentrou poder em grandes stakers. Lido DAO controla ~30% do ETH em staking.',
      'Supply infinito: Não existe limite máximo de emissão. A promessa de "ultra sound money" depende de queima de taxas que pode ser revertida por governança.',
      'Governança por fundação: A Ethereum Foundation (liderada por Vitalik Buterin) define o roadmap. Se um indivíduo pode mudar as regras, não é descentralizado.',
      'Precedente perigoso: Em 2016, após o hack da DAO, a comunidade fez um hard fork para reverter transações. A imutabilidade foi sacrificada por conveniência política.',
    ],
  },
  {
    nome: 'XRP (Ripple)',
    subtitulo: 'O token do sistema bancário',
    accent: '#38bdf8',
    icon: Banknote,
    problemas: [
      'Controlado por empresa: Ripple Labs detém a maioria do supply e libera tokens periodicamente, diluindo holders.',
      'Não é minerado: Validadores são selecionados por uma "Unique Node List" que Ripple controla. Qualquer semelhança com um banco central NÃO é coincidência.',
      'Objetivo anti-soberania: XRP foi criado para servir bancos e instituições financeiras — os mesmos intermediários que o Bitcoin foi projetado para eliminar.',
      'Processo da SEC: A Ripple Labs enfrentou processo da SEC por venda de securities não registradas. O fato de existir uma empresa que pode ser processada já demonstra a centralização.',
      'Sem caso de uso popular: Apesar de anos de marketing, a adoção por bancos é mínima. O SWIFT continua dominante.',
    ],
  },
  {
    nome: 'Litecoin (LTC)',
    subtitulo: 'A "prata do Bitcoin" sem propósito',
    accent: '#94a3b8',
    icon: Globe,
    problemas: [
      'Fork sem diferencial: Litecoin é um clone do Bitcoin com tempos de bloco menores (2.5 min vs 10 min) — uma "melhoria" que a Lightning Network tornou completamente irrelevante.',
      'Fundador vendeu tudo: Charlie Lee vendeu todo o seu LTC no topo de 2017 e anunciou publicamente. O criador não acredita na própria criação.',
      'Sem desenvolvimento significativo: O roadmap do Litecoin se resume a copiar features do Bitcoin (SegWit, MimbleWimble) com meses de atraso.',
      'Narrativa morta: "Prata digital" é uma analogia vazia. O ouro digital (Bitcoin) não precisa de prata. A Lightning Network resolveu o problema de velocidade que o Litecoin supostamente endereçava.',
    ],
  },
  {
    nome: 'TrueUSD (TUSD) e Stablecoins',
    subtitulo: 'Dólares digitais com risco de contraparte',
    accent: '#22c55e',
    icon: Banknote,
    problemas: [
      'Não são investimento: Stablecoins são pareadas ao dólar — uma moeda que perde 2-7% de poder de compra ao ano. Manter stablecoins é manter dólares digitais com risco adicional.',
      'Risco de contraparte: Dependem de reservas mantidas por empresas (Tether, Circle, TrueToken). Se a empresa falir, congelar fundos ou mentir sobre reservas, seu saldo pode ir a zero.',
      'Censura ativa: USDC e USDT já congelaram endereços a pedido de governos. Sua "estabilidade" é condicionada à obediência regulatória.',
      'Não são refúgio: Em crises reais, stablecoins pareadas ao dólar perdem poder de compra junto com o próprio dólar. Não protegem contra inflação — replicam o problema.',
      'Ferramenta útil, não destino: Stablecoins servem como ponte de liquidez (on/off ramp), não como reserva de valor. Manter patrimônio em stablecoin é confiar no mesmo sistema que o Bitcoin foi criado para substituir.',
    ],
  },
];

const COMPARATIVO = [
  { criterio: 'Supply máximo fixo', btc: true, eth: false, xrp: false, ltc: true, stable: false },
  { criterio: 'Sem pré-mineração', btc: true, eth: false, xrp: false, ltc: true, stable: false },
  { criterio: 'Proof of Work', btc: true, eth: false, xrp: false, ltc: true, stable: false },
  { criterio: 'Sem fundação/empresa controladora', btc: true, eth: false, xrp: false, ltc: false, stable: false },
  { criterio: 'Imutabilidade comprovada', btc: true, eth: false, xrp: false, ltc: true, stable: false },
  { criterio: 'Resistência à censura', btc: true, eth: false, xrp: false, ltc: true, stable: false },
  { criterio: 'Efeito de rede dominante', btc: true, eth: false, xrp: false, ltc: false, stable: false },
  { criterio: '16+ anos sem downtime', btc: true, eth: false, xrp: false, ltc: true, stable: false },
];

export default function BitcoinVsAltcoins() {
  const { scrollYProgress } = useScroll();
  const { sx, sy } = useMouseParallax(12);
  const pw = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen text-stone-100 font-sans selection:bg-amber-400/30 relative overflow-hidden" style={{ background: '#050808' }}>
      <Helmet>
        <title>Bitcoin vs Altcoins — Por Que Só Existe Um Bitcoin | Arsenal Técnico</title>
        <meta name="description" content="Análise técnica destruindo os argumentos de Ethereum, XRP, Litecoin e stablecoins. Por que o Bitcoin é a única solução para soberania financeira." />
      </Helmet>

      <ScrollToTop />
      <div className="relative z-20 px-6 md:px-12 lg:px-20 pt-[52px]">
        <BackToHome />
      </div>

      <motion.div className="fixed top-0 left-0 right-0 h-[2px] z-50 origin-left" style={{ width: pw, background: 'linear-gradient(90deg, #d4af37, #f59e0b)' }} />

      {/* VFX Stack */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <motion.div className="absolute top-[-10%] right-[-10%] w-[800px] h-[800px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(212,175,55,0.06) 0%, transparent 60%)', x: sx, y: sy }} />
        <motion.div className="absolute bottom-[5%] left-[-5%] w-[600px] h-[600px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(239,68,68,0.04) 0%, transparent 60%)', x: useTransform(sx, v => -v * 0.5), y: useTransform(sy, v => -v * 0.5) }} />
        <div className="absolute inset-0 opacity-[0.035]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`, backgroundSize: '128px 128px' }} />
        <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent_40%,hsl(0_0%_100%/0.015)_50%,transparent_60%)]" />
      </div>

      {/* ─── CINEMATIC HERO ─── */}
      <CinematicHero
        image="/heroes/bitcoin-vs-altcoins.webp"
        phase="Análise Comparativa"
        title={<>BITCOIN VS <span className="text-red-500">ALTCOINS</span></>}
        subtitle="Existem mais de 25.000 criptomoedas. A esmagadora maioria são experimentos, golpes ou soluções em busca de problemas. O Bitcoin resolveu um problema real — e permanece insubstituível."
        icon={Swords}
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
            <motion.div 
              className="absolute inset-0 pointer-events-none rounded-2xl"
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
                  <span className="text-white font-bold">Este site é estritamente Bitcoin-maximalista.</span> Altcoins <span className="text-amber-400 font-semibold">não são recomendadas</span> por este projeto em nenhuma hipótese — nem para trading, nem para "diversificação", nem como investimento de longo prazo.
                </p>
                <p className="text-stone-400 text-sm leading-relaxed mb-3">
                  Este conteúdo existe <span className="text-stone-200 font-semibold">exclusivamente como material de estudo</span>, a pedido recorrente da comunidade no Instagram. O objetivo é que você entenda os argumentos — e entenda por que o Bitcoin permanece insubstituível.
                </p>
                <p className="text-stone-500 text-xs leading-relaxed italic">
                  "Estudar o adversário não é apoiá-lo. É dominar o tabuleiro." — Conheça as altcoins para confirmar sua convicção no Bitcoin.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══ IMAGEM CINEMATOGRÁFICA ══ */}
      <section className="relative z-10 py-12 md:py-16">
        <div className="max-w-5xl mx-auto px-6 md:px-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}
            className="relative rounded-2xl overflow-hidden border border-white/[0.06]"
          >
            <img src={bitcoinVsAltcoinsImg} alt="Rei Bitcoin no tabuleiro com altcoins caídas" className="w-full h-64 md:h-96 object-cover" style={{ filter: 'brightness(0.7) saturate(0.9)' }} loading="lazy" decoding="async" />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, transparent 30%, rgba(5,8,8,0.85) 100%)' }} />
            <div className="absolute bottom-6 left-6 right-6">
              <p className="text-stone-400 text-xs font-mono uppercase tracking-widest">Existe apenas um rei no tabuleiro — o resto é distração</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══ PREMISSA ══ */}
      <section className="relative z-10 py-20 md:py-28 border-y border-white/[0.04]" style={{ background: '#070b0b' }}>
        <div className="max-w-4xl mx-auto px-6 md:px-10 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
            <ShieldCheck className="mx-auto text-yellow-500/40 mb-6" size={28} />
            <p className="text-yellow-400/70 text-[10px] font-bold uppercase tracking-[0.4em] mb-8">Premissa fundamental</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { bold: 'Dinheiro precisa de escassez.', rest: 'Sem supply fixo e imutável, qualquer token é apenas outro experimento inflacionário com marketing melhor.' },
                { bold: 'Descentralização não é negociável.', rest: 'Se uma pessoa, empresa ou fundação pode mudar as regras, não é descentralizado. É uma empresa de tecnologia com um token.' },
                { bold: 'Segurança exige Proof of Work.', rest: 'Apenas o PoW transforma energia real em segurança. Proof of Stake é plutocracia digital: quem tem mais, controla mais.' },
              ].map((item, i) => (
                <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i * 0.3}>
                  <div className="h-px w-10 mx-auto mb-4" style={{ background: 'rgba(212,175,55,0.2)' }} />
                  <p className="text-stone-500 text-sm leading-relaxed"><span className="text-stone-200 font-semibold block mb-1">{item.bold}</span>{item.rest}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══ ANÁLISE POR ALTCOIN ══ */}
      {ALTCOINS.map((alt, idx) => {
        const Icon = alt.icon;
        return (
          <section key={idx} className="relative z-10 py-20 md:py-28" style={{ background: idx % 2 === 0 ? '#050808' : '#070b0b' }}>
            <div className="max-w-5xl mx-auto px-6 md:px-10">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="mb-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2.5 rounded-xl border" style={{ background: `${alt.accent}10`, borderColor: `${alt.accent}25` }}>
                    <Icon size={20} style={{ color: alt.accent }} />
                  </div>
                  <span className="text-[10px] font-bold tracking-[0.4em] uppercase" style={{ color: alt.accent }}>ANÁLISE 0{idx + 1}</span>
                </div>
                <h2 className="text-2xl md:text-4xl font-black tracking-tight text-white mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  {alt.nome}
                </h2>
                <p className="text-stone-600 text-sm font-bold uppercase tracking-wider">{alt.subtitulo}</p>
              </motion.div>

              <div className="space-y-4">
                {alt.problemas.map((prob, i) => (
                  <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i * 0.1}
                    className="flex items-start gap-4 rounded-xl border border-red-500/10 p-5 transition-all duration-500 hover:border-red-500/20"
                    style={{ background: 'linear-gradient(135deg, rgba(239,68,68,0.03), transparent 60%)' }}
                  >
                    <Skull size={16} className="text-red-400/60 mt-0.5 shrink-0" />
                    <p className="text-stone-400 text-sm leading-relaxed">{prob}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        );
      })}

      {/* ══ TABELA COMPARATIVA ══ */}
      <section className="relative z-10 py-20 md:py-28 border-y border-white/[0.04]" style={{ background: '#070b0b' }}>
        <div className="max-w-5xl mx-auto px-6 md:px-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="mb-12">
            <span className="text-stone-600 text-[10px] font-bold uppercase tracking-[0.5em] block mb-3">Veredicto Técnico</span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Comparativo <span className="text-yellow-400">objetivo</span>
            </h2>
          </motion.div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/[0.08]">
                  <th className="text-left py-3 px-3 text-stone-600 font-mono text-[9px] tracking-widest uppercase">Critério</th>
                  <th className="text-center py-3 px-3 text-yellow-400 font-mono text-[9px] tracking-widest uppercase">BTC</th>
                  <th className="text-center py-3 px-3 text-stone-600 font-mono text-[9px] tracking-widest uppercase">ETH</th>
                  <th className="text-center py-3 px-3 text-stone-600 font-mono text-[9px] tracking-widest uppercase">XRP</th>
                  <th className="text-center py-3 px-3 text-stone-600 font-mono text-[9px] tracking-widest uppercase">LTC</th>
                  <th className="text-center py-3 px-3 text-stone-600 font-mono text-[9px] tracking-widest uppercase">Stable</th>
                </tr>
              </thead>
              <tbody>
                {COMPARATIVO.map((c, i) => (
                  <motion.tr key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i * 0.05}
                    className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors"
                  >
                    <td className="py-3 px-3 text-stone-400 text-xs">{c.criterio}</td>
                    <td className="py-3 px-3 text-center">{c.btc ? <span className="text-emerald-400 font-bold">✓</span> : <span className="text-red-400">✗</span>}</td>
                    <td className="py-3 px-3 text-center">{c.eth ? <span className="text-emerald-400 font-bold">✓</span> : <span className="text-red-400">✗</span>}</td>
                    <td className="py-3 px-3 text-center">{c.xrp ? <span className="text-emerald-400 font-bold">✓</span> : <span className="text-red-400">✗</span>}</td>
                    <td className="py-3 px-3 text-center">{c.ltc ? <span className="text-emerald-400 font-bold">✓</span> : <span className="text-red-400">✗</span>}</td>
                    <td className="py-3 px-3 text-center">{c.stable ? <span className="text-emerald-400 font-bold">✓</span> : <span className="text-red-400">✗</span>}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ══ CTA ══ */}
      <section className="relative z-10 py-20 md:py-32">
        <div className="max-w-4xl mx-auto px-6 md:px-10 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
            <Crown className="mx-auto text-yellow-500/40 mb-6" size={32} />
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Existe apenas um <span className="text-yellow-400">Bitcoin</span>
            </h2>
            <p className="text-stone-500 text-base md:text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
              Altcoins vêm e vão. O Bitcoin permanece. A descoberta do dinheiro digitalmente escasso acontece uma única vez na história — e já aconteceu.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/bitcoin/o-que-e" className="inline-flex items-center gap-3 bg-yellow-500 hover:bg-yellow-400 text-black px-8 py-4 rounded-xl font-bold text-xs uppercase tracking-[0.2em] transition-all duration-500 hover:gap-4">
                O Que é Bitcoin <ArrowRight size={16} />
              </Link>
              <Link to="/diversificacao" className="inline-flex items-center gap-3 border border-yellow-500/30 hover:border-yellow-500/60 text-yellow-400 px-8 py-4 rounded-xl font-bold text-xs uppercase tracking-[0.2em] transition-all duration-500">
                A Falácia da Diversificação <ArrowRight size={16} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-10 py-16">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center space-y-4">
          <div className="h-px w-32 mx-auto mb-6" style={{ background: 'linear-gradient(to right, transparent, rgba(212,175,55,0.2), transparent)' }} />
          <p className="text-stone-600 font-mono text-xs uppercase tracking-widest">Tudo que não é Bitcoin é shitcoin — até que prove o contrário.</p>
          <p className="text-stone-800 font-mono text-[10px] tracking-widest">Lord Junnior © 2026</p>
        </motion.div>
      </div>
    </div>
  );
}
