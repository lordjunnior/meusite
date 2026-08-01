import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Lock, Gem, Eye, Scale, Zap, ShieldOff, Globe, CheckCircle2, XCircle, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import CinematicHero from '@/components/CinematicHero';
import ScrollToTop from '@/components/ScrollToTop';
import SatCounter from '@/components/SatCounter';
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

const COMPARISON = [
  { prop: 'Oferta', gov: 'Infinita / Arbitrária', gold: 'Desconhecida', btc: '21 Milhões (Fixo)', btcWins: true },
  { prop: 'Portabilidade', gov: 'Alta (Digital)', gold: 'Baixa (Pesado)', btc: 'Absoluta (Qualquer Fronteira)', btcWins: true },
  { prop: 'Divisibilidade', gov: 'Baixa', gold: 'Difícil', btc: '100M de Sats/BTC', btcWins: true },
  { prop: 'Auditoria', gov: 'Impossível', gold: 'Lenta / Cara', btc: 'Instantânea / Pública', btcWins: true },
  { prop: 'Confisco', gov: 'Fácil (decreto)', gold: 'Possível (Ordem 6102)', btc: 'Impossível (autocustódia)', btcWins: true },
  { prop: 'Emissor', gov: 'Banco Central', gold: 'Natureza', btc: 'Algoritmo (código aberto)', btcWins: true },
];

const FAKE_TXS = [
  'tx 3a7f...c91d → 0.05420000 BTC confirmada bloco #887,241',
  'tx 8b2e...f430 → 1.00000000 BTC confirmada bloco #887,241',
  'tx d1c4...a8e7 → 0.00150000 BTC confirmada bloco #887,240',
  'tx 72fa...3b19 → 0.21000000 BTC confirmada bloco #887,240',
  'tx 9e01...d5c8 → 0.00003400 BTC confirmada bloco #887,239',
  'tx a4b3...7f22 → 2.50000000 BTC confirmada bloco #887,239',
  'tx 1d8c...e901 → 0.00780000 BTC confirmada bloco #887,238',
  'tx f6a2...b4d3 → 0.10000000 BTC confirmada bloco #887,238',
];

export default function HardCap21() {
  const [terminalLines, setTerminalLines] = useState<string[]>([]);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  useEffect(() => {
    let idx = 0;
    const interval = setInterval(() => {
      setTerminalLines(prev => {
        const next = [...prev, FAKE_TXS[idx % FAKE_TXS.length]];
        if (next.length > 8) next.shift();
        return next;
      });
      idx++;
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen text-stone-100 font-sans selection:bg-amber-300/50 relative overflow-hidden"
      style={{ background: '#050808' }}
    >
      <SeoHead path="/21-milhoes" />
      <div className="relative z-20 px-6 md:px-12 lg:px-20 pt-[52px]">
        <BackToHome />
      </div>

      <ScrollToTop />

      {/* ─── VFX STACK ─── */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 opacity-[0.035]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")', backgroundSize: '128px 128px' }} />
        <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] rounded-full opacity-[0.06] animate-pulse" style={{ background: 'radial-gradient(circle, rgba(245,158,11,0.4) 0%, transparent 70%)', animationDuration: '10s' }} />
        <div className="absolute bottom-1/4 left-1/3 w-[500px] h-[500px] rounded-full opacity-[0.04] animate-pulse" style={{ background: 'radial-gradient(circle, rgba(180,83,9,0.4) 0%, transparent 70%)', animationDuration: '14s' }} />
      </div>

      <CinematicHero
        image="/heroes/hard-cap-21.webp"
        phase="Escassez Matemática Absoluta"
        title={<>O Único Ativo<br /><span className="text-amber-400">Escasso no Universo</span></>}
        subtitle="Ouro é escasso na Terra, mas abundante no cosmos. Moedas estatais têm oferta infinita. O Bitcoin é o único ativo com escassez matemática absoluta — 21 milhões, cravados em código imutável."
        icon={Lock}
        accentColor="amber"
        backLink="/protocolo-inicial"
        backLabel="Protocolo"
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-10 pt-12 pb-32">

        {/* ═══ BLOCO 1: O ÚNICO ATIVO ESCASSO ═══ */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="mb-28">
          <div className="flex items-center gap-3 mb-10">
            <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20">
              <Gem className="text-amber-400" size={20} />
            </div>
            <h2 className="text-xl font-bold text-stone-200 uppercase tracking-wider" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>O Único Ativo Escasso no Universo</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
            {[
              { title: 'A Falha do Sistema', color: 'red', text: 'Ouro é escasso na Terra, mas abundante no universo — trilhões em asteroides que um dia inundarão o mercado. Moedas governamentais têm oferta infinita, impressas conforme o humor de burocratas.' },
              { title: 'A Verdade Blindada', color: 'amber', text: 'O Bitcoin é o único ativo com escassez matemática absoluta. Satoshi Nakamoto cravou o limite de 21 milhões no algoritmo, tornando-o imune à vontade humana.' },
              { title: 'O Estalo Mental', color: 'emerald', text: 'Você não compra Bitcoin para "ganhar dinheiro"; você compra para não ser diluído pela impressão infinita de quem detém o poder.' },
            ].map((card, i) => (
              <motion.div key={card.title} variants={fadeUp} custom={i + 1}
                className={`bg-white/[0.02] border border-${card.color}-500/15 rounded-2xl p-7 hover:-translate-y-1 transition-transform duration-300`}>
                <h4 className={`text-${card.color}-400 font-bold uppercase text-xs mb-3 tracking-wider`}>{card.title}</h4>
                <p className="text-stone-400 text-sm leading-relaxed">{card.text}</p>
              </motion.div>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6 text-center">
              <p className="text-[8px] text-stone-600 uppercase font-bold tracking-widest">Limite</p>
              <p className="text-3xl font-black text-amber-400 italic mt-1">21M</p>
              <p className="text-[9px] text-amber-500/50 font-mono mt-1">imutável</p>
            </div>
            <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6 text-center">
              <p className="text-[8px] text-stone-600 uppercase font-bold tracking-widest">Minerados</p>
              <p className="text-3xl font-black text-stone-100 italic mt-1">~19.8M</p>
              <p className="text-[9px] text-stone-500 font-mono mt-1">94.3%</p>
            </div>
            <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6 text-center">
              <p className="text-[8px] text-stone-600 uppercase font-bold tracking-widest">Último BTC</p>
              <p className="text-3xl font-black text-stone-500 italic mt-1">2140</p>
              <p className="text-[9px] text-stone-600 font-mono mt-1">~116 anos</p>
            </div>
          </div>
        </motion.section>

        {/* ═══ BLOCO 2: A MORTE DOS LÍDERES ═══ */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="mb-28">
          <div className="flex items-center gap-3 mb-10">
            <div className="p-2.5 rounded-xl bg-red-500/10 border border-red-500/20">
              <ShieldOff className="text-red-400" size={20} />
            </div>
            <h2 className="text-xl font-bold text-stone-200 uppercase tracking-wider" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>A Morte dos Líderes</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white/[0.02] border border-red-500/10 rounded-2xl p-8 space-y-4">
              <h3 className="text-red-400 font-bold uppercase text-sm tracking-wider italic">Ponto de Falha Zero</h3>
              <p className="text-stone-400 text-sm leading-relaxed">
                O criador do Bitcoin <strong className="text-stone-100">desapareceu</strong>, deixando o sistema nas mãos dos usuários. Sem um líder para ser preso, corrompido ou pressionado, o Bitcoin é <strong className="text-stone-100">resistente à captura</strong> regulatória ou corporativa.
              </p>
              <div className="font-mono text-[10px] space-y-1.5 pt-3 border-t border-white/5">
                <div className="flex justify-between text-stone-500"><span>CEO</span><span className="text-red-400 font-bold">INEXISTENTE</span></div>
                <div className="flex justify-between text-stone-500"><span>Sede</span><span className="text-red-400 font-bold">INEXISTENTE</span></div>
                <div className="flex justify-between text-stone-500"><span>Conselho</span><span className="text-red-400 font-bold">INEXISTENTE</span></div>
                <div className="flex justify-between text-stone-500"><span>Ponto de Falha</span><span className="text-emerald-400 font-bold">ZERO</span></div>
              </div>
            </div>
            <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-8 space-y-4">
              <h3 className="text-amber-400 font-bold uppercase text-sm tracking-wider italic">Imutabilidade Tática</h3>
              <p className="text-stone-400 text-sm leading-relaxed">
                A descentralização garante que as regras do jogo — como a <strong className="text-stone-100">oferta finita</strong> — jamais sejam alteradas por votações ou reuniões trimestrais.
              </p>
              <p className="text-stone-400 text-sm leading-relaxed">
                É o dinheiro que <strong className="text-stone-100">não tem dono</strong>, portanto, não tem ponto fraco. Dezenas de milhares de nós independentes ao redor do mundo garantem a imutabilidade do protocolo.
              </p>
              <div className="p-4 border border-amber-500/10 rounded-xl bg-amber-500/5 text-center mt-3">
                <p className="text-amber-400 font-mono font-bold text-xs">
                  Sem líder = Sem alvo<br />
                  Sem alvo = <span className="text-stone-100">Indestrutível</span>
                </p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* ═══ BLOCO 3: A AUDITORIA TOTAL ═══ */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="mb-28">
          <div className="flex items-center gap-3 mb-10">
            <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
              <Eye className="text-emerald-400" size={20} />
            </div>
            <h2 className="text-xl font-bold text-stone-200 uppercase tracking-wider" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>A Auditoria Total</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Terminal */}
            <div className="bg-[#040806] border border-emerald-500/20 rounded-2xl overflow-hidden font-mono">
              <div className="bg-emerald-500/10 border-b border-emerald-500/20 px-4 py-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-red-500" />
                  <span className="w-2 h-2 rounded-full bg-amber-500" />
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                </div>
                <span className="text-[9px] text-emerald-500/60 uppercase tracking-widest">bitcoin_node --audit</span>
                <span className="text-emerald-500 text-xs animate-pulse">█</span>
              </div>
              <div className="p-4 min-h-[240px] flex flex-col justify-end">
                <p className="text-[10px] text-emerald-500/40 mb-2">{'>'} Conectado à rede Bitcoin. Auditando blockchain...</p>
                <p className="text-[10px] text-emerald-500/40 mb-3">{'>'} Supply total verificada: 19.843.750 / 21.000.000 BTC</p>
                {terminalLines.map((line, i) => (
                  <p key={i} className="text-[10px] text-emerald-400/70 leading-relaxed">
                    <span className="text-emerald-500/40">{'>'} </span>{line}
                  </p>
                ))}
              </div>
            </div>

            {/* Text */}
            <div className="space-y-6">
              <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-8 space-y-4">
                <h3 className="text-stone-200 font-bold uppercase text-sm tracking-wider italic">Transparência vs. Segredo</h3>
                <p className="text-stone-400 text-sm leading-relaxed">
                  Enquanto os bancos centrais decidem o seu futuro <strong className="text-stone-100">a portas fechadas</strong>, o livro-razão do Bitcoin é <strong className="text-emerald-400">público e permanente</strong>. Cada transação, cada bloco, cada satoshi — visível para qualquer um.
                </p>
              </div>
              <div className="bg-white/[0.02] border border-emerald-500/10 rounded-2xl p-8 space-y-4">
                <h3 className="text-emerald-400 font-bold uppercase text-sm tracking-wider italic">Seu Próprio Auditor</h3>
                <p className="text-stone-400 text-sm leading-relaxed">
                  Qualquer pessoa, em qualquer lugar, pode auditar a rede inteira executando um nó. Sem essa transparência total, a escassez poderia ser manipulada nos bastidores. Aqui, a <strong className="text-stone-100">confiança foi substituída pela verificação matemática</strong>.
                </p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* ═══ BLOCO 4: COMPARAÇÃO ═══ */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="mb-28">
          <div className="flex items-center gap-3 mb-10">
            <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20">
              <Scale className="text-amber-400" size={20} />
            </div>
            <h2 className="text-xl font-bold text-stone-200 uppercase tracking-wider" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Ouro Digital vs. Papel Moeda</h2>
          </div>

          <div className="bg-white/[0.02] border border-amber-500/10 rounded-2xl overflow-hidden">
            <div className="grid grid-cols-4 text-[9px] font-bold uppercase tracking-widest border-b border-white/5">
              <div className="p-4 text-stone-600">Propriedade</div>
              <div className="p-4 text-red-400 text-center">Moeda Gov.</div>
              <div className="p-4 text-amber-500 text-center">Ouro</div>
              <div className="p-4 text-amber-400 text-center">Bitcoin</div>
            </div>
            {COMPARISON.map((row, i) => (
              <div key={i} className="grid grid-cols-4 border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors">
                <div className="p-4 text-stone-200 text-xs font-bold">{row.prop}</div>
                <div className="p-4 text-stone-500 text-[11px] text-center flex items-center justify-center gap-1">
                  <XCircle size={10} className="text-red-500/50 flex-shrink-0" />
                  <span>{row.gov}</span>
                </div>
                <div className="p-4 text-stone-400 text-[11px] text-center">{row.gold}</div>
                <div className="p-4 text-[11px] text-center flex items-center justify-center gap-1">
                  {row.btcWins && <CheckCircle2 size={10} className="text-emerald-400 flex-shrink-0" />}
                  <span className={row.btcWins ? 'text-amber-400 font-bold' : 'text-stone-400'}>{row.btc}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-8 space-y-4">
              <Globe className="text-amber-400" size={22} />
              <h3 className="text-stone-200 font-bold uppercase text-sm tracking-wider">Transporte Invisível</h3>
              <p className="text-stone-400 text-sm leading-relaxed">
                Você não pode cruzar fronteiras com quilos de ouro sem ser notado. Você pode atravessar qualquer fronteira com <strong className="text-stone-100">bilhões em Bitcoin na sua mente</strong> ou em um dispositivo menor que um pen drive.
              </p>
            </div>
            <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-8 space-y-4">
              <Eye className="text-emerald-400" size={22} />
              <h3 className="text-stone-200 font-bold uppercase text-sm tracking-wider">Auditoria Instantânea</h3>
              <p className="text-stone-400 text-sm leading-relaxed">
                Qualquer pessoa com um celular pode auditar a rede inteira <strong className="text-stone-100">em segundos</strong> para garantir que ninguém está trapaceando ou imprimindo moedas "por baixo do pano".
              </p>
            </div>
          </div>
        </motion.section>

        {/* ═══ BLOCO 5: CONCEITO DE SATOSHI ═══ */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="mb-20">
          <div className="bg-amber-950/20 border border-amber-500/20 rounded-2xl p-10 md:p-14 relative overflow-hidden">
            <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(245,158,11,0.5) 0%, transparent 60%)' }} />
            <div className="relative z-10 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl md:text-3xl font-extrabold uppercase tracking-tight text-stone-100 mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    Pare de Pensar em<br /><span className="text-amber-400">Moedas Inteiras</span>
                  </h3>
                  <p className="text-stone-400 text-sm leading-relaxed mb-4">
                    O Bitcoin é divisível em <strong className="text-stone-100">100 milhões de Satoshis</strong> (1 sat = 0,00000001 BTC). Isso permite que qualquer pessoa comece com qualquer quantia, protegendo-se da inflação que corrói o dólar e o real há décadas.
                  </p>
                  <p className="text-stone-400 text-sm leading-relaxed">
                    Você não precisa de milhares de dólares para ser livre. Comece a <strong className="text-amber-400">empilhar sats</strong> hoje.
                  </p>
                </div>
                <div className="text-center">
                  <div className="text-4xl md:text-5xl font-black text-stone-100 italic">1 BTC</div>
                  <div className="text-amber-400 font-black text-lg my-2">=</div>
                  <div className="text-4xl md:text-5xl font-black text-amber-400 italic">100.000.000</div>
                  <p className="text-amber-400 font-bold uppercase tracking-[0.4em] text-[9px] mt-2">Satoshis</p>
                </div>
              </div>

              <div className="pt-6 border-t border-white/5">
                <SatCounter />
              </div>

              <div className="pt-6 border-t border-white/5">
                <h3 className="text-xl font-bold uppercase tracking-tight text-stone-100 mb-6 text-center" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Conclusão Tática</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    { t: 'Sem Intermediários', d: 'Transações ponto a ponto, sem censura e sem fronteiras.' },
                    { t: 'Independência', d: 'Valor da demanda global e segurança criptográfica, não de decretos.' },
                    { t: 'Soberania', d: 'Resolve a fragilidade do ouro e a fraude do papel moeda.' },
                  ].map((item) => (
                    <div key={item.t} className="space-y-2 text-center">
                      <p className="text-amber-400 font-bold uppercase text-sm">{item.t}</p>
                      <p className="text-stone-400 text-xs leading-relaxed">{item.d}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* ─── NAVEGAÇÃO ─── */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link to="/lastro"
            className="flex-1 group flex items-center justify-center gap-2 bg-white/[0.03] border border-white/[0.08] rounded-2xl px-6 py-5 text-stone-400 text-sm font-bold hover:bg-amber-500/10 hover:border-amber-500/20 hover:text-amber-400 transition-all duration-300">
            <ChevronRight size={16} className="rotate-180 group-hover:-translate-x-1 transition-transform" />
            O Mito do Lastro
          </Link>
          <Link to="/protocolo-inicial"
            className="flex-1 group flex items-center justify-center gap-2 bg-amber-500/10 border border-amber-500/20 rounded-2xl px-6 py-5 text-amber-400 text-sm font-bold hover:bg-amber-500/15 hover:border-amber-400/30 transition-all duration-300">
            Voltar ao Protocolo
            <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}
