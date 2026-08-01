import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Scale, Banknote, Lock, Gem, AlertTriangle, Zap, Globe, ShieldAlert, CheckCircle2, XCircle, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import CinematicHero from '@/components/CinematicHero';
import ScrollToTop from '@/components/ScrollToTop';
import BackToHome from '@/components/BackToHome';
import SeoHead from '@/components/SeoHead';

const APPLE_EASE = [0.22, 1, 0.36, 1] as const;
const fadeUp = {
  hidden: { opacity: 0, y: 30, filter: 'blur(6px)' },
  visible: (i: number) => ({
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: 0.7, ease: APPLE_EASE, delay: i * 0.1 },
  }),
};

const HALVING_DATA = [
  { year: '2009', reward: '50 BTC', supply: '0%', pct: 100 },
  { year: '2012', reward: '25 BTC', supply: '50%', pct: 50 },
  { year: '2016', reward: '12.5 BTC', supply: '75%', pct: 25 },
  { year: '2020', reward: '6.25 BTC', supply: '87.5%', pct: 12.5 },
  { year: '2024', reward: '3.125 BTC', supply: '93.75%', pct: 6.25 },
  { year: '2028', reward: '1.5625 BTC', supply: '96.88%', pct: 3.125 },
];

const GOLD_VS_BTC = [
  { prop: 'Escassez', gold: 'Limitada (geológica)', btc: 'Absoluta (21M)', btcWins: true },
  { prop: 'Portabilidade', gold: 'Difícil (pesado)', btc: 'Invisível (digital)', btcWins: true },
  { prop: 'Auditoria', gold: 'Complexa (assays)', btc: 'Instantânea (blockchain)', btcWins: true },
  { prop: 'Divisibilidade', gold: 'Limitada', btc: '100M satoshis/BTC', btcWins: true },
  { prop: 'Confiscável', gold: 'Sim (Ordem 6102)', btc: 'Não (autocustódia)', btcWins: true },
  { prop: 'Histórico', gold: '5.000+ anos', btc: '15 anos', btcWins: false },
];

const TIMELINE = [
  { year: '1944', event: 'Bretton Woods: Dólar lastreado em ouro', color: 'emerald' },
  { year: '1971', event: 'Nixon encerra a conversibilidade ouro-dólar', color: 'red' },
  { year: '1994', event: 'Plano Real: nasce sem lastro real', color: 'red' },
  { year: '2008', event: 'Crise financeira: impressão em massa (QE)', color: 'red' },
  { year: '2009', event: 'Bitcoin: nasce com escassez matemática', color: 'amber' },
  { year: '2024', event: '~19.6M BTC minerados de 21M possíveis', color: 'amber' },
];

export default function LastroBitcoin() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen text-stone-100 font-sans selection:bg-red-300/50 relative overflow-hidden"
      style={{ background: '#050808' }}
    >
      <SeoHead path="/lastro" />
      <ScrollToTop />
      <div className="relative z-20 px-6 md:px-12 lg:px-20 pt-[52px]">
        <BackToHome />
      </div>

      {/* ─── VFX STACK ─── */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 opacity-[0.035]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")', backgroundSize: '128px 128px' }} />
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full opacity-[0.07] animate-pulse" style={{ background: 'radial-gradient(circle, rgba(239,68,68,0.4) 0%, transparent 70%)', animationDuration: '8s' }} />
        <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] rounded-full opacity-[0.05] animate-pulse" style={{ background: 'radial-gradient(circle, rgba(245,158,11,0.4) 0%, transparent 70%)', animationDuration: '12s' }} />
      </div>

      <CinematicHero
        image="/heroes/lastro-bitcoin.webp"
        phase="Educação Monetária · Lastro & Escassez"
        title={<>O Mito do<br /><span className="text-red-400">Lastro</span></>}
        subtitle="Todas as moedas do mundo hoje são fiduciárias — sem lastro além da 'promessa' de governos insolventes. O Bitcoin é lastreado na Matemática, na Criptografia e na Termodinâmica."
        icon={Scale}
        accentColor="rose"
        backLink="/protocolo-inicial"
        backLabel="Protocolo"
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-10 pt-12 pb-32">

        {/* ═══ BLOCO 1: O MITO DO LASTRO ═══ */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="mb-28">
          <div className="flex items-center gap-3 mb-10">
            <div className="p-2.5 rounded-xl bg-red-500/10 border border-red-500/20">
              <Banknote className="text-red-400" size={20} />
            </div>
            <h2 className="text-xl font-bold text-stone-200 uppercase tracking-wider" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>O Mito do Lastro</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
            {[
              { title: 'A Mentira Fiduciária', color: 'red', text: 'Dólar, Real, Euro — nenhuma possui lastro além da "promessa" de governos insolventes. O valor depende da confiança em políticos que imprimem dinheiro para pagar dívidas que eles mesmos criaram.' },
              { title: 'A Verdade Blindada', color: 'amber', text: 'O Bitcoin não é lastreado por promessas, mas pela Matemática e Criptografia. Escassez absoluta, segurança inquebrável e previsibilidade total — sem garantia externa necessária.' },
              { title: 'O Estalo Mental', color: 'emerald', text: 'Lastro é uma muleta para moedas fracas. O Bitcoin é o próprio ativo final — assim como o ouro. Não precisa representar outro valor; ele é o valor.' },
            ].map((card, i) => (
              <motion.div key={card.title} variants={fadeUp} custom={i + 1}
                className={`bg-white/[0.02] border border-${card.color}-500/15 rounded-2xl p-7 hover:-translate-y-1 transition-transform duration-300`}>
                <h4 className={`text-${card.color}-400 font-bold uppercase text-xs mb-3 tracking-wider`}>{card.title}</h4>
                <p className="text-stone-400 text-sm leading-relaxed">{card.text}</p>
              </motion.div>
            ))}
          </div>

          {/* Timeline */}
          <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-8 md:p-12">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.4em] text-stone-600 mb-8">A Morte do Lastro (Timeline)</h3>
            <div className="space-y-5">
              {TIMELINE.map((item, i) => (
                <div key={i} className="flex items-start gap-4 group">
                  <div className="flex-shrink-0 w-16 text-right">
                    <span className={`font-mono font-bold text-sm text-${item.color}-400`}>{item.year}</span>
                  </div>
                  <div className="flex-shrink-0 flex flex-col items-center">
                    <div className={`w-3 h-3 rounded-full border-2 border-${item.color}-400 bg-${item.color}-400/20`} />
                    {i < TIMELINE.length - 1 && <div className="w-[1px] h-6 bg-white/10 mt-1" />}
                  </div>
                  <p className="text-stone-400 text-sm leading-relaxed group-hover:text-stone-200 transition-colors">{item.event}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* ═══ BLOCO 2: HALVING & ESCASSEZ ═══ */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="mb-28">
          <div className="flex items-center gap-3 mb-10">
            <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20">
              <Lock className="text-amber-400" size={20} />
            </div>
            <h2 className="text-xl font-bold text-stone-200 uppercase tracking-wider" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>O Halving e a Escassez</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Halving Chart */}
            <div className="bg-white/[0.02] border border-amber-500/10 rounded-2xl p-8">
              <h3 className="text-[10px] font-bold uppercase tracking-[0.4em] text-stone-600 mb-6">Emissão por Bloco (BTC)</h3>
              <div className="flex items-end gap-2 h-44 border-b border-l border-white/10 p-2">
                {HALVING_DATA.map((h, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1 group">
                    <span className="text-[8px] text-stone-500 font-mono opacity-0 group-hover:opacity-100 transition-opacity">{h.reward}</span>
                    <div className="w-full bg-amber-500/20 border-t border-amber-500 group-hover:bg-amber-500/40 transition-colors rounded-t"
                      style={{ height: `${h.pct}%`, minHeight: '4px' }} />
                    <span className="text-[9px] text-stone-500 font-mono mt-1">{h.year}</span>
                  </div>
                ))}
              </div>
              <p className="text-stone-500 text-[10px] mt-3 font-mono text-center">Inflação → 0% até 2140</p>
            </div>

            {/* BTC vs Fiat emission */}
            <div className="bg-white/[0.02] border border-red-500/10 rounded-2xl p-8">
              <h3 className="text-[10px] font-bold uppercase tracking-[0.4em] text-stone-600 mb-6">BTC vs. Impressão Estatal</h3>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between text-[10px] font-mono mb-1">
                    <span className="text-amber-400 font-bold uppercase tracking-widest">Bitcoin</span>
                    <span className="text-stone-400">21.000.000 (fixo)</span>
                  </div>
                  <div className="w-full h-3 bg-white/5 rounded overflow-hidden">
                    <div className="h-full bg-amber-500/60 rounded" style={{ width: '93.5%' }} />
                  </div>
                  <p className="text-[9px] text-amber-500/60 font-mono mt-1">93.5% já minerado • previsível até 2140</p>
                </div>
                <div>
                  <div className="flex justify-between text-[10px] font-mono mb-1">
                    <span className="text-red-400 font-bold uppercase tracking-widest">Dólar (M2)</span>
                    <span className="text-stone-400">$21T+ (e subindo)</span>
                  </div>
                  <div className="w-full h-3 bg-white/5 rounded overflow-hidden">
                    <div className="h-full bg-red-500/60 rounded animate-pulse" style={{ width: '100%' }} />
                  </div>
                  <p className="text-[9px] text-red-500/60 font-mono mt-1">∞ impressão • sem limite • sem auditoria</p>
                </div>
                <div>
                  <div className="flex justify-between text-[10px] font-mono mb-1">
                    <span className="text-red-400 font-bold uppercase tracking-widest">Real (M2)</span>
                    <span className="text-stone-400">R$6T+ (e subindo)</span>
                  </div>
                  <div className="w-full h-3 bg-white/5 rounded overflow-hidden">
                    <div className="h-full bg-red-500/40 rounded animate-pulse" style={{ width: '100%' }} />
                  </div>
                  <p className="text-[9px] text-red-500/60 font-mono mt-1">Perdeu 86% desde 1994 • IPCA 5%+</p>
                </div>
              </div>
            </div>
          </div>

          {/* Previsibilidade */}
          <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-stone-200 font-bold uppercase text-sm tracking-wider mb-4">Previsibilidade Tática</h3>
                <p className="text-stone-400 text-sm leading-relaxed mb-4">
                  Você sabe <strong className="text-stone-100">exatamente</strong> quantos bitcoins existirão daqui a 100 anos: <strong className="text-amber-400">21.000.000</strong>.
                </p>
                <p className="text-stone-400 text-sm leading-relaxed">
                  Você consegue dizer quantos Reais existirão daqui a <strong className="text-red-400">10 minutos</strong>? A escassez matemática é o seu escudo contra a diluição do seu tempo de vida.
                </p>
              </div>
              <div className="text-center p-6 border border-amber-500/10 rounded-2xl bg-amber-500/5">
                <div className="text-5xl md:text-6xl font-black text-stone-100 italic">21M</div>
                <p className="text-amber-400 font-bold uppercase tracking-[0.4em] text-[9px] mt-2">para sempre</p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* ═══ BLOCO 3: OURO DIGITAL VS. FRAUDE ═══ */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="mb-28">
          <div className="flex items-center gap-3 mb-10">
            <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20">
              <Gem className="text-amber-400" size={20} />
            </div>
            <h2 className="text-xl font-bold text-stone-200 uppercase tracking-wider" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Ouro Digital vs. Fraude Estatal</h2>
          </div>

          {/* Comparison Table */}
          <div className="bg-white/[0.02] border border-amber-500/10 rounded-2xl overflow-hidden mb-8">
            <div className="grid grid-cols-3 text-[9px] font-bold uppercase tracking-widest border-b border-white/5">
              <div className="p-4 text-stone-600">Propriedade</div>
              <div className="p-4 text-amber-500 text-center">Ouro</div>
              <div className="p-4 text-amber-400 text-center">Bitcoin</div>
            </div>
            {GOLD_VS_BTC.map((row, i) => (
              <div key={i} className="grid grid-cols-3 border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors">
                <div className="p-4 text-stone-200 text-xs font-bold">{row.prop}</div>
                <div className="p-4 text-stone-400 text-xs text-center flex items-center justify-center gap-1.5">
                  {!row.btcWins && <CheckCircle2 size={12} className="text-emerald-400 flex-shrink-0" />}
                  {row.gold}
                </div>
                <div className="p-4 text-xs text-center flex items-center justify-center gap-1.5">
                  {row.btcWins && <CheckCircle2 size={12} className="text-emerald-400 flex-shrink-0" />}
                  <span className={row.btcWins ? 'text-amber-400 font-bold' : 'text-stone-400'}>{row.btc}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-8 space-y-4">
              <Globe className="text-amber-400" size={22} />
              <h3 className="text-stone-200 font-bold uppercase text-sm tracking-wider">Transporte Invisível</h3>
              <p className="text-stone-400 text-sm leading-relaxed">
                Você não pode cruzar fronteiras com quilos de ouro sem ser notado. Mas pode atravessar qualquer fronteira com <strong className="text-stone-100">bilhões em Bitcoin na sua mente</strong> ou em um dispositivo menor que um pen drive.
              </p>
            </div>
            <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-8 space-y-4">
              <ShieldAlert className="text-amber-400" size={22} />
              <h3 className="text-stone-200 font-bold uppercase text-sm tracking-wider">Auditoria Instantânea</h3>
              <p className="text-stone-400 text-sm leading-relaxed">
                Qualquer pessoa com um celular pode auditar a rede inteira <strong className="text-stone-100">em segundos</strong> para garantir que ninguém está trapaceando ou imprimindo mais moedas "por baixo do pano".
              </p>
            </div>
          </div>
        </motion.section>

        {/* ═══ BLOCO 4: ALERTA DE RISCO ═══ */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="mb-28">
          <div className="flex items-center gap-3 mb-10">
            <div className="p-2.5 rounded-xl bg-red-500/10 border border-red-500/20">
              <AlertTriangle className="text-red-400" size={20} />
            </div>
            <h2 className="text-xl font-bold text-stone-200 uppercase tracking-wider" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Alerta de Risco</h2>
          </div>

          <div className="bg-red-950/20 border border-red-500/15 rounded-2xl p-8 md:p-12 relative overflow-hidden">
            <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(220,38,38,0.5) 0%, transparent 60%)' }} />
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-red-400 font-bold uppercase text-sm tracking-wider">A Armadilha do Lastro</h3>
                <p className="text-stone-400 text-sm leading-relaxed">
                  Moedas "atreladas" ou "lastreadas" <strong className="text-stone-100">falham no momento</strong> em que os cidadãos perdem a fé na capacidade do emissor de honrar a troca. Quando a confiança quebra, o colapso é <strong className="text-red-400">instantâneo</strong>.
                </p>
                <div className="space-y-2 font-mono text-[10px] pt-3 border-t border-white/5">
                  {[
                    { name: 'Venezuela (Bolívar)', status: 'COLAPSO', color: 'text-red-400' },
                    { name: 'Argentina (Peso)', status: 'DERRETENDO', color: 'text-red-400' },
                    { name: 'Turquia (Lira)', status: 'DERRETENDO', color: 'text-red-400' },
                    { name: 'Brasil (Real)', status: 'ERODINDO', color: 'text-amber-400' },
                  ].map((c, i) => (
                    <div key={i} className="flex justify-between">
                      <span className="text-stone-500">{c.name}</span>
                      <span className={`${c.color} font-bold`}>{c.status}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-emerald-400 font-bold uppercase text-sm tracking-wider">Sua Defesa</h3>
                <p className="text-stone-400 text-sm leading-relaxed">
                  O Bitcoin <strong className="text-stone-100">não pede sua fé</strong>; ele oferece a <strong className="text-emerald-400">Verificação</strong>.
                </p>
                <div className="p-6 border border-amber-500/10 rounded-2xl bg-amber-500/5 text-center">
                  <p className="text-amber-400 font-bold uppercase text-sm tracking-wider">
                    "Don't Trust,<br /><span className="text-stone-100 text-lg">Verify."</span>
                  </p>
                  <p className="text-stone-500 text-[10px] font-mono mt-2">Não confie em ninguém. Verifique o código.</p>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* ═══ CONCLUSÃO TÁTICA ═══ */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="mb-20">
          <div className="bg-amber-950/20 border border-amber-500/20 rounded-2xl p-10 md:p-14 relative overflow-hidden">
            <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(245,158,11,0.5) 0%, transparent 60%)' }} />
            <div className="relative z-10 space-y-8">
              <h3 className="text-2xl md:text-3xl font-extrabold uppercase tracking-tight text-stone-100" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                A Soberania é <span className="text-amber-400">Matemática</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { t: 'Sem Intermediários', d: 'Transações ponto a ponto, sem censura e sem fronteiras. Nenhum banco, nenhum burocrata no meio.' },
                  { t: 'Independência', d: 'O valor vem da demanda global e da segurança criptográfica, não de decretos de políticos falidos.' },
                  { t: 'Soberania', d: 'O Bitcoin resolve a fragilidade do ouro e a fraude do papel moeda. É o ativo final da humanidade.' },
                ].map((item) => (
                  <div key={item.t} className="space-y-2">
                    <p className="text-amber-400 font-bold uppercase text-sm">{item.t}</p>
                    <p className="text-stone-400 text-sm leading-relaxed">{item.d}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        {/* ─── NAVEGAÇÃO ─── */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link to="/protocolo-inicial"
            className="flex-1 group flex items-center justify-center gap-2 bg-white/[0.03] border border-white/[0.08] rounded-2xl px-6 py-5 text-stone-400 text-sm font-bold hover:bg-red-500/10 hover:border-red-500/20 hover:text-red-400 transition-all duration-300">
            <ChevronRight size={16} className="rotate-180 group-hover:-translate-x-1 transition-transform" />
            Protocolo Inicial
          </Link>
          <Link to="/21-milhoes"
            className="flex-1 group flex items-center justify-center gap-2 bg-amber-500/10 border border-amber-500/20 rounded-2xl px-6 py-5 text-amber-400 text-sm font-bold hover:bg-amber-500/15 hover:border-amber-400/30 transition-all duration-300">
            21 Milhões — Hard Cap
            <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}
