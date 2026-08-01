import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Brain, AlertTriangle, Shield, TrendingUp, Zap, Eye, 
  Skull, Lock, BarChart3, Activity, Cpu, Target, 
  ArrowRight, ChevronRight, ExternalLink, BookOpen,
  Network, Dices, Timer, DollarSign, ShieldAlert,
  Layers, GitBranch, Sparkles, Ban, Clock
} from 'lucide-react';
import SeoHead from '@/components/SeoHead';
import BackToHome from '@/components/BackToHome';
import heroImg from '@/assets/polymarket-neural-hero.jpg';
import moedaImg from '@/assets/polymarket-moeda-probabilidade.jpg';
import alertaImg from '@/assets/polymarket-alerta-risco.jpg';
import custodiaImg from '@/assets/polymarket-autocustodia-saida.jpg';
import tokensImg from '@/assets/polymarket-blockchain-tokens.jpg';

/* ─── GSAP ScrollTrigger ─── */
let gsapLoaded = false;
const loadGsap = async () => {
  if (gsapLoaded) return;
  const { default: gsap } = await import('gsap');
  const { ScrollTrigger } = await import('gsap/ScrollTrigger');
  gsap.registerPlugin(ScrollTrigger);
  gsapLoaded = true;
  return gsap;
};

/* ─── Animated Counter ─── */
function AnimatedCounter({ end, suffix = '', prefix = '' }: { end: number; suffix?: string; prefix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        let start = 0;
        const duration = 2000;
        const step = (timestamp: number) => {
          if (!start) start = timestamp;
          const progress = Math.min((timestamp - start) / duration, 1);
          setCount(Math.floor(progress * end));
          if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
        observer.disconnect();
      }
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end]);

  return <span ref={ref}>{prefix}{count.toLocaleString('pt-BR')}{suffix}</span>;
}

/* ─── FAQ Data ─── */
const faqItems = [
  { question: 'O que é a Polymarket?', answer: 'A Polymarket é um mercado de previsão descentralizado baseado em blockchain (Polygon). Você compra tokens que representam a probabilidade de um evento acontecer. Se o evento se concretiza, cada token vale $1. Se não, vale $0. O preço do token reflete a probabilidade em tempo real conforme o consenso do mercado.' },
  { question: 'Polymarket é aposta ou investimento?', answer: 'Tecnicamente é um mercado de previsão, não uma casa de apostas tradicional. Porém, tem o mesmo potencial de vício e perda financeira. A diferença principal: você pode comprar e vender tokens ANTES da resolução do evento, criando oportunidades de trading. Mas o risco é real e significativo.' },
  { question: 'O que a rede neural conseguiu provar?', answer: 'A rede neural analisou 2.015 mercados BTC-5m e provou matematicamente que o mercado é extremamente eficiente — a acurácia ficou em 50,2%, equivalente a jogar uma moeda. Isso demonstra que a arbitragem é quase instantânea e que dados internos da Polymarket sozinhos não bastam para bater o mercado.' },
  { question: 'Como melhorar a previsão para 58%+?', answer: 'A rede neural sugere integrar dados externos: preço spot e book de ordens da Binance, open interest e liquidações da Hyperliquid, e o feed oficial do Chainlink BTC que a Polymarket usa como oráculo. Com essas features adicionais, a estimativa conservadora é atingir 58% de acurácia — suficiente para ser lucrativo com gestão de risco.' },
  { question: 'Posso ganhar dinheiro sem prever o futuro?', answer: 'Sim. A segunda estratégia é trading de tokens: comprar UP a $0.20 e vender a $0.40 = 100% de lucro, independente da resolução. Mas exige liquidez, timing e compreensão do spread. Bots profissionais exploram micro-arbitragens de 1-3 segundos — competir com eles manualmente é extremamente difícil.' },
  { question: 'Por que a autocustódia é essencial neste contexto?', answer: 'A Polymarket opera em blockchain (Polygon). Seus fundos estão em USDC custodiados em smart contracts. Se você não entende custódia, risco de smart contract e seed phrases, está exposto a perda total. Antes de operar qualquer DEX ou mercado descentralizado, domine a autocustódia do seu Bitcoin principal.' },
  { question: 'Qual é o risco real de operar no mercado BTC-5m?', answer: 'O spread pode ser alto em horários de baixa liquidez (finais de semana), uma única whale pode mover o mercado em 2 segundos (de 99% UP para DOWN), e a sazonalidade temporal (dia/noite, feriados) altera completamente o comportamento. Sem dados externos e sem bot, suas chances são literalmente de cara ou coroa.' },
  { question: 'Como a série Web3 do Lord Junnior vai evoluir?', answer: 'Os próximos vídeos incluirão: integração com API da Binance (spot + futuros), dados de liquidação da Hyperliquid, retreino contínuo da rede neural com Walk-Forward Validation, e demonstração do dashboard Streamlit em tempo real. O objetivo é alcançar uma edge estatística que transforme previsão em lucro consistente.' },
];

/* ─── Architecture Features ─── */
const neuralFeatures = [
  { icon: Activity, label: 'Opening Price', desc: 'Preço de abertura do mercado (~50.5 USDC). O desvio padrão é mínimo — só 32 de 2.015 mercados saíram do padrão.' },
  { icon: BarChart3, label: 'Histórico de Mercados', desc: 'Últimos N mercados resolvidos via API. Passado tentando prever o futuro — com resultados reveladores.' },
  { icon: TrendingUp, label: 'Streak & Momentum', desc: 'Sequência máxima: 15 consecutivos. Se tem 14 UPs seguidos, a probabilidade de queda é estatisticamente maior.' },
  { icon: Clock, label: 'Sazonalidade Temporal', desc: 'Dia da semana e hora do dia. Volume cai 70% nos finais de semana — uma compra grande move o preço inteiro.' },
  { icon: Layers, label: 'Open Interest', desc: 'Posições não fechadas — ordens de compra/venda pendentes. Revela intenções ocultas do mercado.' },
  { icon: GitBranch, label: 'Spread & Liquidez', desc: 'Diferença entre melhor oferta de compra e venda. Spread alto = mercado caro. Spread baixo = eficiência brutal.' },
];

/* ─── Main Component ─── */
export default function PolymarketRedeNeural() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    loadGsap().then(gsap => {
      if (!gsap || !containerRef.current) return;
      const { ScrollTrigger } = require('gsap/ScrollTrigger');
      const sections = containerRef.current!.querySelectorAll('.gsap-reveal');
      sections.forEach((el: Element) => {
        gsap.fromTo(el,
          { opacity: 0, y: 60 },
          { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' }
          }
        );
      });
      return () => ScrollTrigger.getAll().forEach((t: any) => t.kill());
    });
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-[#050808] text-zinc-100">
      <SeoHead
        custom={{
          title: 'Polymarket Rede Neural BTC-5m — IA Provou: Mercado é Cara ou Coroa | Lord Junnior',
          description: 'Experimento com Claude Code criou rede neural que analisou 2.015 mercados Bitcoin 5 minutos na Polymarket. Acurácia: 50,2%. Entenda por que isso é bom e como chegar a 58%+ com dados da Binance e Hyperliquid.',
          canonical: 'https://lordjunnior.com.br/polymarket-rede-neural-btc',
          primaryKeyword: 'polymarket rede neural bitcoin',
          lsiKeywords: ['mercado de previsão', 'bitcoin 5 minutos', 'machine learning crypto', 'trading bot polymarket', 'web3 descentralizada', 'claude code ia', 'binance api', 'hyperliquid liquidações', 'arbitragem blockchain', 'autocustódia bitcoin'],
          longTailKeywords: ['como criar rede neural para polymarket', 'polymarket btc 5 minutos vale a pena', 'bot para mercado de previsão bitcoin', 'rede neural acurácia mercado crypto'],
          breadcrumbs: [
            { name: 'Início', url: 'https://lordjunnior.com.br/' },
            { name: 'Bitcoin', url: 'https://lordjunnior.com.br/bitcoin' },
            { name: 'Polymarket Rede Neural BTC', url: 'https://lordjunnior.com.br/polymarket-rede-neural-btc' },
          ],
          schemaType: 'TechArticle',
          articleSection: 'Web3 & Trading',
        }}
        faqItems={faqItems}
      />

      {/* ─── Progress Bar ─── */}
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-cyan-500 origin-left z-50" style={{ scaleX }} />

      {/* BackToHome */}
      <div className="relative z-20 px-6 md:px-12 lg:px-20 pt-[52px]">
        <BackToHome />
      </div>

      {/* ─── HERO ─── */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImg} alt="Rede Neural analisando mercados Bitcoin na Polymarket" className="w-full h-full object-cover" fetchPriority="high" loading="eager" fetchPriority="high" decoding="async" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#050808] via-[#050808]/90 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050808] via-transparent to-[#050808]/40" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
            {/* Alert Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-red-500/40 bg-red-500/10 mb-6">
              <AlertTriangle className="w-4 h-4 text-red-400 animate-pulse" />
              <span className="text-[10px] tracking-[0.3em] uppercase font-mono text-red-400">CONTEÚDO EXPERIMENTAL — NÃO É CONSELHO FINANCEIRO</span>
            </div>

            <h1 className="font-['Bebas_Neue'] text-5xl md:text-7xl lg:text-8xl leading-[0.95] tracking-tight text-white mb-6">
              A IA<br />
              <span className="text-cyan-400">FRACASSOU.</span><br />
              <span className="text-zinc-400 text-4xl md:text-5xl lg:text-6xl">E isso é a melhor notícia.</span>
            </h1>

            <p className="text-lg md:text-xl text-zinc-300 leading-8 max-w-xl mb-8 font-['Inter_Tight']">
              Uma rede neural construída pelo <span className="text-cyan-400 font-semibold">Claude Code</span> analisou{' '}
              <span className="text-white font-bold">2.015 mercados</span> de Bitcoin em 5 minutos na Polymarket.
              Acurácia final: <span className="text-amber-400 font-bold">50,2%</span>.
              Mesma coisa que jogar uma moeda.
            </p>

            <p className="text-base text-zinc-400 leading-7 max-w-xl mb-8">
              O mercado é tão eficiente que a arbitragem é <span className="text-white">quase instantânea</span>.
              Mas isso não é um fracasso — é um mapa. Um mapa que mostra exatamente
              onde buscar a <span className="text-cyan-400">edge</span> que separa quem perde de quem lucra.
            </p>

            <div className="flex flex-wrap gap-4">
              <a href="#experimento" className="inline-flex items-center gap-2 px-8 py-4 bg-cyan-500 hover:bg-cyan-400 text-black font-bold rounded-lg transition-all">
                <Brain className="w-5 h-5" /> VER O EXPERIMENTO
              </a>
              <a href="#alertas" className="inline-flex items-center gap-2 px-8 py-4 border border-red-500/50 text-red-400 hover:bg-red-500/10 font-bold rounded-lg transition-all">
                <ShieldAlert className="w-5 h-5" /> ALERTAS DE RISCO
              </a>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4, duration: 0.8 }}
            className="hidden lg:block">
            {/* Stats Terminal */}
            <div className="bg-black/60 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-8 space-y-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="text-[10px] font-mono text-zinc-500 ml-2">neural_btc5m_v1.py — resultados</span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'Mercados Analisados', value: <AnimatedCounter end={2015} />, color: 'text-cyan-400' },
                  { label: 'Acurácia Final', value: '50,2%', color: 'text-amber-400' },
                  { label: 'UP Resolvidos', value: '50,2%', color: 'text-green-400' },
                  { label: 'DOWN Resolvidos', value: '49,8%', color: 'text-red-400' },
                  { label: 'Streak Máximo', value: '15', color: 'text-purple-400' },
                  { label: 'Desvio Padrão', value: '~0.003', color: 'text-zinc-400' },
                ].map((stat, i) => (
                  <div key={i} className="bg-zinc-900/60 rounded-lg p-4 border border-zinc-800">
                    <p className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 mb-1">{stat.label}</p>
                    <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                  </div>
                ))}
              </div>

              <div className="bg-red-500/5 border border-red-500/20 rounded-lg p-4">
                <p className="text-xs font-mono text-red-400">
                  <span className="text-red-500 font-bold">⚠ CONCLUSÃO:</span> Dados internos da Polymarket sozinhos
                  NÃO são suficientes para bater o mercado. A previsão é equivalente a cara ou coroa.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── ALERTA SOBERANO ─── */}
      <section className="gsap-reveal bg-gradient-to-b from-red-950/20 to-[#050808] py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-red-500/5 border-2 border-red-500/30 rounded-2xl p-8 md:p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/5 rounded-full blur-3xl" />
            <div className="flex items-start gap-6">
              <div className="p-4 bg-red-500/10 rounded-xl shrink-0">
                <Skull className="w-10 h-10 text-red-400" />
              </div>
              <div>
                <h2 className="font-['Bebas_Neue'] text-3xl md:text-4xl text-red-400 mb-4">
                  AVISO SOBERANO — LEIA ANTES DE CONTINUAR
                </h2>
                <div className="space-y-4 text-zinc-300 leading-8">
                  <p>
                    <strong className="text-white">Este conteúdo é puramente educacional e experimental.</strong> A Polymarket
                    é um mercado de previsão descentralizado com <span className="text-red-400 font-semibold">risco real de perda total</span>.
                    Não é CDB. Não é poupança. Não é investimento regulado. É um mercado onde{' '}
                    <span className="text-red-400">bots profissionais lucram em milissegundos</span> e humanos desavisados perdem tudo.
                  </p>
                  <p>
                    O mesmo poder viciante de casas de apostas se aplica aqui.
                    Se você não domina <Link to="/autocustodia" className="text-cyan-400 underline hover:text-cyan-300">autocustódia</Link>,
                    se não entende <Link to="/chaves" className="text-cyan-400 underline hover:text-cyan-300">chaves privadas</Link>,
                    se não tem <Link to="/bitcoin-seguro" className="text-cyan-400 underline hover:text-cyan-300">segurança operacional</Link> —
                    <strong className="text-white"> não toque em mercados descentralizados.</strong>
                  </p>
                  <p className="text-amber-400 font-semibold">
                    Primeiro proteja o que já tem. Depois explore o desconhecido.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── O QUE É POLYMARKET ─── */}
      <section id="experimento" className="gsap-reveal py-20">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-[10px] tracking-[0.3em] uppercase font-mono text-cyan-500 mb-4 block">[ CAPÍTULO 01 ]</span>
            <h2 className="font-['Bebas_Neue'] text-4xl md:text-5xl text-white mb-6">
              O QUE É A <span className="text-cyan-400">POLYMARKET</span>?
            </h2>
            <div className="space-y-6 text-zinc-300 leading-8">
              <p>
                A Polymarket é um <strong className="text-white">mercado de previsão descentralizado</strong> rodando na blockchain Polygon.
                Funciona assim: um evento é criado — por exemplo, <em>"O BTC vai subir nos próximos 5 minutos?"</em>.
                Você tem duas escolhas: <span className="text-green-400 font-semibold">UP</span> ou{' '}
                <span className="text-red-400 font-semibold">DOWN</span>.
              </p>
              <p>
                Cada escolha é um <strong className="text-white">token na blockchain</strong>. O preço varia de $0 a $1, refletindo
                a probabilidade do evento. Se UP está a $0.70, o mercado acredita em 70% de chance de subir.
                Se o evento se resolve a seu favor: <span className="text-green-400 font-bold">cada token vale $1</span>.
              </p>

              <div className="bg-zinc-900/60 border border-zinc-700/50 rounded-xl p-6">
                <h3 className="font-bold text-white mb-3 flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-amber-400" /> Duas Formas de Lucrar
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-green-500/5 border border-green-500/20 rounded-lg p-4">
                    <p className="text-green-400 font-bold text-sm mb-2">1. Resolução do Evento</p>
                    <p className="text-sm text-zinc-400">Compra UP a $0.25 → Se BTC sobe → Token vale $1 → <span className="text-green-400">Lucro de $0.75 por share</span></p>
                  </div>
                  <div className="bg-cyan-500/5 border border-cyan-500/20 rounded-lg p-4">
                    <p className="text-cyan-400 font-bold text-sm mb-2">2. Trading de Tokens</p>
                    <p className="text-sm text-zinc-400">Compra UP a $0.20 → Vende a $0.40 → <span className="text-cyan-400">100% de lucro</span> sem esperar resolução</p>
                  </div>
                </div>
              </div>

              <div className="bg-amber-500/5 border border-amber-500/20 rounded-lg p-4">
                <p className="text-sm text-amber-300">
                  <strong>⚡ O mercado BTC-5m:</strong> 12 mercados por hora × 24h = 288 mercados/dia × 7 dias = ~2.015 mercados analisados pela rede neural.
                </p>
              </div>
            </div>
          </div>
          <div className="relative">
            <img src={tokensImg} alt="Tokens de previsão na blockchain Polymarket" loading="lazy" className="rounded-2xl w-full" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050808] via-transparent to-transparent rounded-2xl" />
          </div>
        </div>
      </section>

      {/* ─── REDE NEURAL ─── */}
      <section className="gsap-reveal py-20 bg-gradient-to-b from-[#050808] via-zinc-950 to-[#050808]">
        <div className="max-w-7xl mx-auto px-6">
          <span className="text-[10px] tracking-[0.3em] uppercase font-mono text-cyan-500 mb-4 block text-center">[ CAPÍTULO 02 ]</span>
          <h2 className="font-['Bebas_Neue'] text-4xl md:text-6xl text-white text-center mb-4">
            ANATOMIA DA <span className="text-cyan-400">REDE NEURAL</span>
          </h2>
          <p className="text-zinc-400 text-center max-w-2xl mx-auto mb-16 leading-7">
            Construída pelo Claude Code com Python, 2 camadas escondidas e 21 features.
            Pequena por design — não há variância suficiente para justificar arquiteturas maiores.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {neuralFeatures.map((feat, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 hover:border-cyan-500/30 transition-all group">
                <feat.icon className="w-8 h-8 text-cyan-400 mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="font-bold text-white mb-2">{feat.label}</h3>
                <p className="text-sm text-zinc-400 leading-6">{feat.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Architecture Diagram */}
          <div className="mt-16 bg-black/60 border border-cyan-500/20 rounded-2xl p-8 md:p-12">
            <h3 className="font-['Bebas_Neue'] text-2xl text-cyan-400 mb-6 flex items-center gap-3">
              <Cpu className="w-6 h-6" /> Arquitetura da Rede Neural
            </h3>
            <div className="flex flex-wrap items-center justify-center gap-4 text-center">
              {['21 Features\n(Input Layer)', '→', '64 Neurônios\n(Hidden 1)', '→', '32 Neurônios\n(Hidden 2)', '→', '1 Output\n(UP/DOWN)'].map((block, i) => (
                i % 2 === 1 ? (
                  <ChevronRight key={i} className="w-6 h-6 text-cyan-500 shrink-0" />
                ) : (
                  <div key={i} className="bg-cyan-500/5 border border-cyan-500/20 rounded-xl px-6 py-4 min-w-[140px]">
                    <p className="text-sm font-mono text-cyan-300 whitespace-pre-line">{block}</p>
                  </div>
                )
              ))}
            </div>
            <div className="mt-8 grid md:grid-cols-3 gap-4">
              <div className="bg-zinc-900/60 rounded-lg p-4 text-center">
                <p className="text-zinc-500 text-xs uppercase tracking-wider mb-1">Treino</p>
                <p className="text-xl font-bold text-green-400">Walk-Forward</p>
                <p className="text-xs text-zinc-500">Dia 1 → prevê Dia 2, Dia 1+2 → prevê Dia 3...</p>
              </div>
              <div className="bg-zinc-900/60 rounded-lg p-4 text-center">
                <p className="text-zinc-500 text-xs uppercase tracking-wider mb-1">Calibração</p>
                <p className="text-xl font-bold text-amber-400">Platt Scaling</p>
                <p className="text-xs text-zinc-500">Corrige o modelo: 80% confiança → 55% real</p>
              </div>
              <div className="bg-zinc-900/60 rounded-lg p-4 text-center">
                <p className="text-zinc-500 text-xs uppercase tracking-wider mb-1">Runtime</p>
                <p className="text-xl font-bold text-purple-400">~30 min</p>
                <p className="text-xs text-zinc-500">Processamento total de 7 dias de dados</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── O VEREDITO ─── */}
      <section className="gsap-reveal py-20">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative order-2 lg:order-1">
            <img src={moedaImg} alt="Probabilidade Bitcoin - cara ou coroa" loading="lazy" className="rounded-2xl w-full" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#050808] via-transparent to-transparent rounded-2xl" />
          </div>
          <div className="order-1 lg:order-2">
            <span className="text-[10px] tracking-[0.3em] uppercase font-mono text-amber-500 mb-4 block">[ CAPÍTULO 03 ]</span>
            <h2 className="font-['Bebas_Neue'] text-4xl md:text-5xl text-white mb-6">
              O VEREDITO: <span className="text-amber-400">CARA OU COROA</span>
            </h2>
            <div className="space-y-6 text-zinc-300 leading-8">
              <p>
                Resultado da validação Walk-Forward: <strong className="text-amber-400 text-2xl">50,2% de acurácia</strong>.
                Exatamente o mesmo que lançar uma moeda. A rede neural, com todos os seus neurônios e features,
                <span className="text-white font-semibold"> não conseguiu bater o aleatório</span>.
              </p>
              <p>
                <strong className="text-white">E isso é a melhor notícia possível.</strong> Por quê?
              </p>

              <div className="space-y-3">
                {[
                  'Provou que o mercado BTC-5m é extremamente eficiente',
                  'Confirmou que a arbitragem é quase instantânea',
                  'Demonstrou que dados internos sozinhos são insuficientes',
                  'Mapeou exatamente ONDE buscar a edge que falta',
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3 bg-zinc-900/40 rounded-lg p-3">
                    <Sparkles className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                    <p className="text-sm text-zinc-200">{item}</p>
                  </div>
                ))}
              </div>

              <div className="bg-cyan-500/5 border border-cyan-500/20 rounded-xl p-6">
                <p className="text-cyan-300 font-semibold mb-2">A Solução: O Sinal Vem de Fora</p>
                <p className="text-sm text-zinc-400">
                  A estimativa conservadora com dados da <strong className="text-white">Binance</strong> (spot + book de ordens) +{' '}
                  <strong className="text-white">Hyperliquid</strong> (liquidações + open interest) +{' '}
                  <strong className="text-white">Chainlink BTC</strong> (oráculo oficial) aponta para uma acurácia de{' '}
                  <span className="text-cyan-400 font-bold text-xl">58%+</span> — suficiente para ser lucrativo com gestão de risco.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── ALERTAS DE RISCO ─── */}
      <section id="alertas" className="gsap-reveal py-20 bg-gradient-to-b from-[#050808] via-red-950/10 to-[#050808]">
        <div className="max-w-7xl mx-auto px-6">
          <span className="text-[10px] tracking-[0.3em] uppercase font-mono text-red-500 mb-4 block text-center">[ CAPÍTULO 04 — ZONA VERMELHA ]</span>
          <h2 className="font-['Bebas_Neue'] text-4xl md:text-6xl text-white text-center mb-4">
            ALERTAS DE <span className="text-red-400">RISCO REAL</span>
          </h2>
          <p className="text-zinc-400 text-center max-w-2xl mx-auto mb-16 leading-7">
            Antes de depositar um centavo, entenda os riscos que a maioria dos "gurus" não conta.
          </p>

          <div className="grid lg:grid-cols-2 gap-8 items-start">
            <div className="space-y-6">
              {[
                { icon: Dices, title: 'Potencial Viciante', desc: 'O mesmo mecanismo dopaminérgico de cassinos e apostas esportivas. Mercados de 5 minutos são desenhados para causar FOMO e compulsão. A velocidade dos ciclos cria a ilusão de controle.', color: 'red' },
                { icon: Target, title: 'Whales Movem o Mercado', desc: 'Uma única compra de alto volume pode levar o token de 99% para 0% em 2 segundos. Você não é a baleia. Você é o plâncton. Os bots profissionais operam em milissegundos — você em segundos.', color: 'red' },
                { icon: Ban, title: 'Spread + Baixa Liquidez', desc: 'Nos finais de semana o volume cai 70%. O spread sobe. Você compra mais caro e vende mais barato. Cada operação tem um custo invisível que corrói seus ganhos lentamente.', color: 'amber' },
                { icon: Eye, title: 'Smart Contract Risk', desc: 'Seus fundos estão em contratos inteligentes na Polygon. Bugs, exploits e falhas de oráculo são riscos reais. Se o contrato for comprometido, não existe "ligar pro banco". O código é lei.', color: 'amber' },
              ].map((alert, i) => (
                <div key={i} className={`bg-${alert.color}-500/5 border border-${alert.color}-500/20 rounded-xl p-6 flex items-start gap-4`}
                  style={{ backgroundColor: alert.color === 'red' ? 'rgba(239,68,68,0.05)' : 'rgba(245,158,11,0.05)', borderColor: alert.color === 'red' ? 'rgba(239,68,68,0.2)' : 'rgba(245,158,11,0.2)' }}>
                  <div className={`p-3 rounded-lg shrink-0`} style={{ backgroundColor: alert.color === 'red' ? 'rgba(239,68,68,0.1)' : 'rgba(245,158,11,0.1)' }}>
                    <alert.icon className="w-6 h-6" style={{ color: alert.color === 'red' ? '#f87171' : '#fbbf24' }} />
                  </div>
                  <div>
                    <h3 className="font-bold text-white mb-2">{alert.title}</h3>
                    <p className="text-sm text-zinc-400 leading-6">{alert.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="relative">
              <img src={alertaImg} alt="Terminal de monitoramento de riscos em mercados descentralizados" loading="lazy" className="rounded-2xl w-full" />
              <div className="absolute inset-0 bg-gradient-to-l from-[#050808]/80 via-transparent to-transparent rounded-2xl" />
              <div className="absolute bottom-6 left-6 right-6 bg-black/80 backdrop-blur-lg border border-red-500/30 rounded-xl p-6">
                <p className="text-red-400 font-bold text-sm mb-2">⚠ REGRA DE OURO</p>
                <p className="text-zinc-300 text-sm leading-6">
                  Nunca invista mais do que está disposto a perder 100%. A Polymarket não é poupança.
                  Se você precisa deste dinheiro para viver, <strong className="text-white">não aposte</strong>.
                  Trate como dinheiro de aprendizado — um custo para entender como o mercado funciona.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── PRÓXIMOS PASSOS ─── */}
      <section className="gsap-reveal py-20">
        <div className="max-w-7xl mx-auto px-6">
          <span className="text-[10px] tracking-[0.3em] uppercase font-mono text-cyan-500 mb-4 block text-center">[ CAPÍTULO 05 ]</span>
          <h2 className="font-['Bebas_Neue'] text-4xl md:text-6xl text-white text-center mb-4">
            O CAMINHO PARA <span className="text-cyan-400">58%+</span>
          </h2>
          <p className="text-zinc-400 text-center max-w-2xl mx-auto mb-16 leading-7">
            A rede neural mapeou o fracasso. Agora sabemos exatamente onde buscar a edge.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: '01', icon: BarChart3, title: 'Binance Spot', desc: 'Integrar preço spot, volume de trade e book de ordens em tempo real. O mercado mais líquido do mundo como feature externa.', color: 'cyan' },
              { step: '02', icon: TrendingUp, title: 'Mercado de Futuros', desc: 'Long/short positions, funding rate, liquidações previstas. Se alguém colocou $1M em long a $64k, isso é um suporte real.', color: 'green' },
              { step: '03', icon: Network, title: 'Hyperliquid', desc: 'DEX especializada em futuros perpétuos. Open interest, price-to-liquidation, cascatas de liquidação como sinais preditivos.', color: 'purple' },
              { step: '04', icon: Zap, title: 'Chainlink Oracle', desc: 'Feed oficial do BTC usado pela Polymarket. Diferença entre oráculo e exchanges = janela de arbitragem microscópica.', color: 'amber' },
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.15 }}
                className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 hover:border-cyan-500/30 transition-all relative overflow-hidden group">
                <span className="absolute top-4 right-4 text-6xl font-['Bebas_Neue'] text-zinc-800/50 group-hover:text-zinc-700/50 transition-colors">{item.step}</span>
                <item.icon className="w-8 h-8 mb-4" style={{ color: item.color === 'cyan' ? '#22d3ee' : item.color === 'green' ? '#4ade80' : item.color === 'purple' ? '#a78bfa' : '#fbbf24' }} />
                <h3 className="font-bold text-white mb-2 text-lg">{item.title}</h3>
                <p className="text-sm text-zinc-400 leading-6">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Architectures to Test */}
          <div className="mt-12 bg-zinc-900/40 border border-zinc-800 rounded-xl p-8">
            <h3 className="font-bold text-white mb-6 flex items-center gap-2">
              <Cpu className="w-5 h-5 text-cyan-400" /> Arquiteturas para Testar nos Próximos Vídeos
            </h3>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                { name: 'LSTM', desc: 'Long Short-Term Memory — captura padrões temporais longos. Ideal para séries financeiras.', difficulty: 'Avançado' },
                { name: 'GRU', desc: 'Gated Recurrent Unit — mais leve que LSTM, melhor para real-time. Trade-off velocidade vs precisão.', difficulty: 'Intermediário' },
                { name: 'Random Forest', desc: 'Ensemble de árvores de decisão. Robusto contra overfitting. Baseline clássico de ML financeiro.', difficulty: 'Básico' },
              ].map((arch, i) => (
                <div key={i} className="bg-black/40 border border-zinc-700/50 rounded-lg p-5">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-cyan-400 font-mono font-bold">{arch.name}</p>
                    <span className="text-[9px] px-2 py-1 rounded-full bg-zinc-800 text-zinc-400 font-mono uppercase tracking-wider">{arch.difficulty}</span>
                  </div>
                  <p className="text-xs text-zinc-500 leading-5">{arch.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── ESTRATÉGIAS ─── */}
      <section className="gsap-reveal py-20 bg-gradient-to-b from-[#050808] via-zinc-950 to-[#050808]">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-[10px] tracking-[0.3em] uppercase font-mono text-green-500 mb-4 block">[ CAPÍTULO 06 ]</span>
            <h2 className="font-['Bebas_Neue'] text-4xl md:text-5xl text-white mb-6">
              ESTRATÉGIAS <span className="text-green-400">ALÉM DA PREVISÃO</span>
            </h2>
            <div className="space-y-6 text-zinc-300 leading-8">
              <p>
                O vídeo revelou algo que a maioria ignora: <strong className="text-white">você não precisa prever o futuro para lucrar</strong>.
                Existem estratégias de trading de tokens que exploram ineficiências temporárias.
              </p>

              <div className="space-y-4">
                {[
                  { title: 'Compra em Spread Alto', desc: 'Quando a liquidez cai (finais de semana, madrugadas), o spread aumenta. Compre barato, espere o spread normalizar, venda. Não depende da resolução.' },
                  { title: 'Arbitragem Temporal', desc: 'A Polymarket usa o oráculo Chainlink que tem micro-delay em relação ao preço spot. Se você captura o preço da Binance antes do oráculo atualizar, tem uma janela de 1-3 segundos.' },
                  { title: 'Contra-Streak', desc: 'Com streak de 14 consecutivos (ocorrência raríssima), a probabilidade estatística inverte. Não é garantia — mas é edge baseada em dados, não em emoção.' },
                  { title: 'Volume Spike Detection', desc: 'Grandes compras de whales movem o preço em segundos. Detectar o spike e surfar o momentum antes da correção — requer bot, não mãos humanas.' },
                ].map((strat, i) => (
                  <div key={i} className="bg-green-500/5 border border-green-500/15 rounded-xl p-5">
                    <h3 className="font-bold text-green-400 text-sm mb-2">{strat.title}</h3>
                    <p className="text-sm text-zinc-400 leading-6">{strat.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="relative">
            <img src={custodiaImg} alt="Hardware wallet e autocustódia como fundação antes de operar mercados" loading="lazy" className="rounded-2xl w-full" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050808] via-transparent to-transparent rounded-2xl" />
          </div>
        </div>
      </section>

      {/* ─── AUTOCUSTÓDIA PRIMEIRO ─── */}
      <section className="gsap-reveal py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-gradient-to-br from-cyan-500/5 via-zinc-900/50 to-amber-500/5 border border-cyan-500/20 rounded-2xl p-8 md:p-12">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="text-[10px] tracking-[0.3em] uppercase font-mono text-amber-500 mb-4 block">[ PROTOCOLO DE SEGURANÇA ]</span>
                <h2 className="font-['Bebas_Neue'] text-4xl md:text-5xl text-white mb-6">
                  AUTOCUSTÓDIA <span className="text-amber-400">PRIMEIRO</span>
                </h2>
                <p className="text-zinc-300 leading-8 mb-6">
                  A Polymarket roda em blockchain. Se você não domina custódia, está entregando
                  seu dinheiro para smart contracts que você não auditou. Antes de operar qualquer DEX:
                </p>
                <div className="space-y-3">
                  {[
                    { label: 'Domine suas chaves privadas', route: '/chaves' },
                    { label: 'Configure autocustódia real', route: '/autocustodia' },
                    { label: 'Entenda blindagem contra golpes', route: '/blindagem-golpes' },
                    { label: 'Hardware Wallet: sua primeira defesa', route: '/autocustodia/hardware-wallet-diy-bitcoin' },
                    { label: 'Krux + Passphrase: nível máximo', route: '/autocustodia/krux-passphrase-bluewallet' },
                  ].map((item, i) => (
                    <Link key={i} to={item.route} className="flex items-center gap-3 bg-zinc-900/60 hover:bg-zinc-800/60 border border-zinc-800 hover:border-amber-500/30 rounded-lg p-4 transition-all group">
                      <Shield className="w-5 h-5 text-amber-400 group-hover:scale-110 transition-transform" />
                      <span className="text-zinc-200 group-hover:text-white transition-colors">{item.label}</span>
                      <ArrowRight className="w-4 h-4 text-zinc-600 group-hover:text-amber-400 ml-auto transition-colors" />
                    </Link>
                  ))}
                </div>
              </div>
              <div className="text-center">
                <div className="bg-black/60 backdrop-blur-xl border border-amber-500/20 rounded-2xl p-8 inline-block">
                  <Lock className="w-20 h-20 text-amber-400 mx-auto mb-6" />
                  <p className="font-['Bebas_Neue'] text-3xl text-white mb-2">NOT YOUR KEYS</p>
                  <p className="font-['Bebas_Neue'] text-3xl text-amber-400 mb-4">NOT YOUR COINS</p>
                  <p className="text-sm text-zinc-400 max-w-xs mx-auto leading-6">
                    Se a exchange cai, se o contrato é hackeado, se a Polygon tem um bug —
                    seu Bitcoin principal precisa estar em <strong className="text-white">cold storage</strong>,
                    fora do alcance de qualquer protocolo DeFi.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="gsap-reveal py-20 bg-gradient-to-b from-[#050808] via-zinc-950 to-[#050808]">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="font-['Bebas_Neue'] text-4xl md:text-5xl text-white text-center mb-12">
            PERGUNTAS <span className="text-cyan-400">FREQUENTES</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-4 max-w-5xl mx-auto">
            {faqItems.map((faq, i) => (
              <div key={i} className="bg-zinc-900/40 border border-zinc-800 rounded-xl overflow-hidden">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-zinc-800/30 transition-colors">
                  <span className="text-sm font-semibold text-zinc-200 pr-4">{faq.question}</span>
                  <ChevronRight className={`w-5 h-5 text-cyan-400 shrink-0 transition-transform ${openFaq === i ? 'rotate-90' : ''}`} />
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5">
                    <p className="text-sm text-zinc-400 leading-6">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA FINAL ─── */}
      <section className="gsap-reveal py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-['Bebas_Neue'] text-4xl md:text-6xl text-white mb-6">
            PROTEJA O QUE TEM.<br />
            <span className="text-cyan-400">EXPLORE O QUE VEM.</span>
          </h2>
          <p className="text-zinc-400 text-lg leading-8 max-w-2xl mx-auto mb-10">
            A rede neural provou que o mercado é eficiente. Os próximos vídeos vão adicionar dados externos da Binance
            e Hyperliquid para buscar a edge de 58%+. Mas antes disso — garanta que sua base está sólida.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/autocustodia" className="inline-flex items-center gap-2 px-8 py-4 bg-amber-500 hover:bg-amber-400 text-black font-bold rounded-lg transition-all">
              <Shield className="w-5 h-5" /> BLINDAR MEU BITCOIN
            </Link>
            <Link to="/bitcoin" className="inline-flex items-center gap-2 px-8 py-4 border border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10 font-bold rounded-lg transition-all">
              <BookOpen className="w-5 h-5" /> FUNDAMENTOS BITCOIN
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
