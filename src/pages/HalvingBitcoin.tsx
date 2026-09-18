import PageFloatingToc from "@/components/PageFloatingToc";
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowLeft, Clock, TrendingUp, Shield, Coins, Target, Eye, ChevronDown } from 'lucide-react';
import CinematicHero from '@/components/CinematicHero';
import halvingHero from '@/assets/halving-hero.webp';
import halvingImpacto from '@/assets/halving-impacto.webp';
import BackToHome from '@/components/BackToHome';

const APPLE_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 30, filter: 'blur(6px)' },
  visible: (i: number) => ({
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: 0.7, ease: APPLE_EASE, delay: i * 0.12 },
  }),
};

const FAQ_ITEMS = [
  { q: "O que acontece no halving do Bitcoin?", a: "A recompensa dos mineradores por bloco é reduzida pela metade, diminuindo a taxa de emissão de novos bitcoins e aumentando a escassez programada do ativo." },
  { q: "Quando será o próximo halving?", a: "O próximo halving do Bitcoin está previsto para abril de 2028, quando a recompensa cairá de 3,125 para 1,5625 BTC por bloco." },
  { q: "O halving sempre faz o preço subir?", a: "Historicamente, os halvings precederam movimentos de alta significativos, mas o mercado é influenciado por múltiplos fatores e resultados passados não garantem resultados futuros." },
];


const TOC_ITEMS = [
  { id: "o-que-e", label: "O Que É Halving" },
  { id: "proximo-halving", label: "Próximo Halving" },
  { id: "impacto-valor", label: "Impacto no Valor" },
  { id: "todos-minerados", label: "Todos Minerados?" },
  { id: "como-investir", label: "Como Investir" },
  { id: "conclusao", label: "Conclusão" },
];

const HalvingBitcoin = () => {
  const { scrollYProgress } = useScroll();
  const progressWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen text-stone-100 font-sans selection:bg-amber-400/30 relative overflow-hidden" style={{ background: '#050808' }}>
      <div className="relative z-20 px-6 md:px-12 lg:px-20 pt-[52px]">
        <BackToHome />
      </div>

      <Helmet>
        <title>Halving do Bitcoin | O Que É, Quando Será e Como Impacta o Preço</title>
        <meta name="description" content="Entenda o halving do Bitcoin: o que é, quando será o próximo em 2028, como afeta o preço e o que acontece quando todos os 21 milhões forem minerados." />
        <meta name="keywords" content="halving bitcoin, halving 2028, bitcoin halving preço, quando é o halving, mineração bitcoin, escassez bitcoin, 21 milhões bitcoin" />
        <meta property="og:title" content="Halving do Bitcoin | Guia Completo 2026" />
        <meta property="og:description" content="Entenda o halving: o evento que reduz pela metade a emissão de novos bitcoins a cada 4 anos." />
        <meta property="og:type" content="article" />
        <link rel="canonical" href="https://lordjunnior.com.br/halving-bitcoin" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": FAQ_ITEMS.map(f => ({
            "@type": "Question",
            "name": f.q,
            "acceptedAnswer": { "@type": "Answer", "text": f.a }
          }))
        })}</script>
      </Helmet>

      <PageFloatingToc items={TOC_ITEMS} accentColor="orange" />

      {/* Scroll Progress */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] z-50 origin-left"
        style={{ width: progressWidth, background: 'linear-gradient(90deg, #f59e0b, #f97316)' }}
      />

      {/* Film grain */}
      <div className="pointer-events-none fixed inset-0 z-50 opacity-[0.035]">
        <svg className="w-full h-full">
          <filter id="grain-halving"><feTurbulence baseFrequency="0.85" numOctaves="4" stitchTiles="stitch" /><feColorMatrix type="saturate" values="0" /></filter>
          <rect width="100%" height="100%" filter="url(#grain-halving)" />
        </svg>
      </div>

      {/* Light beams */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent_40%,hsl(0_0%_100%/0.012)_50%,transparent_60%)]" />
      </div>

      {/* CinematicHero */}
      <CinematicHero
        image={halvingHero}
        phase="Ciclo Monetário"
        title="Halving do Bitcoin"
        subtitle="O evento programado que reduz pela metade a emissão de novos bitcoins — aumentando a escassez e reescrevendo as regras da oferta e demanda."
        icon={Coins}
        accentColor="amber"
        backLink="/bitcoin"
        backLabel="Bitcoin"
      />

      {/* ═══ CONTENT ═══ */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-16 py-16 md:py-24 space-y-20">

        {/* § O que é */}
        <motion.section id="o-que-e" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20">
              <Coins className="text-amber-400" size={20} />
            </div>
            <h2 className="text-2xl md:text-3xl font-black tracking-tight text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              O que é halving do Bitcoin?
            </h2>
          </div>
          <div className="space-y-5 text-stone-400 text-sm md:text-base leading-relaxed">
            <p>O halving é um evento programado que acontece a cada 210 mil blocos minerados, o que corresponde, aproximadamente, a um intervalo de quatro anos. A cada halving, a recompensa concedida aos mineradores pela validação e adição de novos blocos à blockchain do Bitcoin é reduzida pela metade, impactando diretamente a taxa de emissão de novos bitcoins.</p>
            <p>Quando o Bitcoin foi lançado, em 2009, a recompensa inicial era de 50 bitcoins por bloco. Até hoje, o processo de halvings foi o seguinte:</p>

            {/* Timeline */}
            <div className="space-y-4 pl-6 border-l-2 border-amber-500/30">
              {[
                { year: '2012', reward: '25 bitcoins', desc: 'Primeiro halving — A recompensa caiu para 25 BTC por bloco' },
                { year: '2016', reward: '12,5 bitcoins', desc: 'Segundo halving — Reduzida para 12,5 BTC' },
                { year: '2020', reward: '6,25 bitcoins', desc: 'Terceiro halving — Reduziu para 6,25 BTC' },
                { year: '2024', reward: '3,125 bitcoins', desc: 'Quarto halving — A recompensa atual: 3,125 BTC por bloco' },
              ].map((h, i) => (
                <motion.div key={h.year} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i * 0.2} className="relative">
                  <div className="absolute -left-[calc(1.5rem+5px)] top-1.5 w-3 h-3 rounded-full bg-amber-500 border-2 border-amber-400/50" />
                  <p className="text-stone-300"><strong className="text-amber-400 font-mono">{h.year}</strong> — {h.desc}</p>
                </motion.div>
              ))}
            </div>

            <p>O objetivo do halving é controlar a oferta de novos Bitcoins, limitando a quantidade total que será colocada em circulação. Esse mecanismo de emissão previsível é uma característica fundamental do protocolo do Bitcoin que foi desenvolvido por Satoshi Nakamoto.</p>
            <p>Na prática, ele é projetado para fornecer uma certa escassez da moeda ao longo do tempo. A ideia por trás disso é influenciar a oferta e a demanda, o que pode afetar potencialmente o valor do Bitcoin no mercado.</p>
          </div>
        </motion.section>

        {/* § Próximo Halving */}
        <motion.section id="proximo-halving" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20">
              <Clock className="text-amber-400" size={20} />
            </div>
            <h2 className="text-2xl md:text-3xl font-black tracking-tight text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Quando será o próximo halving?
            </h2>
          </div>
          <div className="space-y-5 text-stone-400 text-sm md:text-base leading-relaxed">
            <p>O próximo halving do Bitcoin deve acontecer em <strong className="text-amber-400 font-semibold">abril de 2028</strong>. Com o novo corte, a recompensa para os mineradores será reduzida de 3,125 bitcoins para <strong className="text-white">1,5625</strong> para cada bloco minerado.</p>
            <p>Para aqueles que investem ou pensam em investir no Bitcoin, é muito importante ficar atento ao halving e as variações que ele pode gerar na cotação da moeda digital.</p>
          </div>
        </motion.section>

        {/* § Impacto no valor */}
        <motion.section id="impacto-valor" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20">
              <TrendingUp className="text-amber-400" size={20} />
            </div>
            <h2 className="text-2xl md:text-3xl font-black tracking-tight text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Como o halving afeta o valor da moeda?
            </h2>
          </div>

          {/* Imagem */}
          <div className="w-full rounded-2xl overflow-hidden border border-white/[0.06] mb-8">
            <img src={halvingImpacto} alt="Impacto do halving no valor do Bitcoin" className="w-full h-auto object-cover" style={{ filter: 'brightness(0.85) saturate(0.9)' }} loading="lazy" decoding="async" />
          </div>

          <div className="space-y-5 text-stone-400 text-sm md:text-base leading-relaxed">
            <p>O halving do Bitcoin pode afetar o valor da moeda de diversas maneiras, embora o mercado seja complexo e influenciado por uma variedade de fatores.</p>

            <div className="grid grid-cols-1 gap-4">
              {[
                { title: 'Aumento da escassez', desc: 'O halving reduz pela metade a recompensa para os mineradores, limitando a quantidade de novos Bitcoins que entram em circulação, o que cria escassez e pode contribuir para aumentar o valor da moeda.', accent: '#10b981' },
                { title: 'Aumento da demanda', desc: 'O halving pode atrair novos investidores interessados em aproveitar o evento para obter ganhos, aumentando a demanda enquanto a oferta diminui.', accent: '#3b82f6' },
                { title: 'Impacto psicológico', desc: 'O halving pode ter um impacto psicológico no mercado, levando a sentimentos de otimismo entre os investidores, especialmente aqueles que olham para o evento como um sinal de que o Bitcoin está se tornando cada vez mais valioso.', accent: '#f59e0b' },
              ].map((card, i) => (
                <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i * 0.15}
                  className="rounded-2xl border border-white/[0.06] p-6 relative overflow-hidden"
                  style={{ background: `linear-gradient(135deg, ${card.accent}08, transparent 60%)`, borderLeftWidth: '3px', borderLeftColor: card.accent }}
                >
                  <h3 className="text-base font-bold text-white mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{card.title}</h3>
                  <p className="text-stone-500 text-sm leading-relaxed">{card.desc}</p>
                </motion.div>
              ))}
            </div>

            <p>Historicamente, sempre que houve um halving, o preço do Bitcoin decolou logo em seguida. No entanto, isso não deve ser visto como uma garantia. O mercado é altamente volátil e imprevisível.</p>
          </div>
        </motion.section>

        {/* § Todos minerados */}
        <motion.section id="todos-minerados" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20">
              <Target className="text-amber-400" size={20} />
            </div>
            <h2 className="text-2xl md:text-3xl font-black tracking-tight text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              E quando todos os Bitcoins forem minerados?
            </h2>
          </div>
          <div className="space-y-5 text-stone-400 text-sm md:text-base leading-relaxed">
            <p>Quando todas as 21 milhões de unidades forem minerados, várias mudanças podem ocorrer no ecossistema:</p>

            <div className="grid grid-cols-1 gap-4">
              {[
                { title: 'Redução do número de mineradores', desc: 'Com o halving periódico, a recompensa dos mineradores diminui gradualmente, o que afeta a rentabilidade da mineração e pode levar alguns mineradores a saírem da rede.', accent: '#ef4444' },
                { title: 'Dependência das taxas de transação', desc: 'À medida que a recompensa por bloco diminui, a importância das taxas de transação vai aumentar. Os mineradores dependerão mais das taxas pagas pelos usuários.', accent: '#f59e0b' },
                { title: 'Valorização da moeda', desc: 'Se a criptomoeda for amplamente adotada como reserva de valor, a escassez programada pode contribuir para a valorização do Bitcoin, com base na oferta e demanda.', accent: '#10b981' },
              ].map((card, i) => (
                <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i * 0.15}
                  className="rounded-2xl border border-white/[0.06] p-6 relative overflow-hidden"
                  style={{ background: `linear-gradient(135deg, ${card.accent}08, transparent 60%)`, borderLeftWidth: '3px', borderLeftColor: card.accent }}
                >
                  <h3 className="text-base font-bold text-white mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{card.title}</h3>
                  <p className="text-stone-500 text-sm leading-relaxed">{card.desc}</p>
                </motion.div>
              ))}
            </div>

            <p>A rede Bitcoin continuará exigindo poder computacional, mesmo após a mineração de todos os Bitcoins, devido à necessidade de validar transações e manter a segurança da rede.</p>

            {/* Quote */}
            <blockquote className="rounded-2xl border border-amber-500/20 p-6" style={{ background: 'rgba(245,158,11,0.04)' }}>
              <p className="text-stone-300 text-sm italic leading-relaxed mb-3">
                "O impacto do halving na oferta e no preço é menor do que no passado, pois o mercado já é muito maior e a diminuição diária de bitcoins novo é pequena em relação ao total em circulação. Porém, no atual cenário de déficits fiscais e impressão de moeda global, essa redução de oferta reforça a narrativa de escassez do Bitcoin, o que pode aumentar a demanda, inclusive para ETFs."
              </p>
              <cite className="text-xs text-stone-600 font-mono not-italic">— André Portilho, head de digital assets do BTG Pactual</cite>
            </blockquote>
          </div>
        </motion.section>

        {/* § Como investir */}
        <motion.section id="como-investir" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20">
              <Shield className="text-amber-400" size={20} />
            </div>
            <h2 className="text-2xl md:text-3xl font-black tracking-tight text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Como investir em Bitcoin?
            </h2>
          </div>
          <div className="space-y-5 text-stone-400 text-sm md:text-base leading-relaxed">
            <p>Se você deseja começar a investir nessa criptomoeda, siga as orientações abaixo:</p>

            <div className="space-y-4">
              {[
                { num: '01', title: 'Escolha de plataforma de negociação', desc: 'Selecione uma plataforma de negociação confiável e segura para comprar e vender Bitcoins.' },
                { num: '02', title: 'Escolha do tipo de carteira', desc: 'Escolha um modelo de carteira para armazenar seus Bitcoins. Existem carteiras online (hot wallets) e offline (cold wallets), cada uma com suas próprias vantagens em termos de segurança.' },
                { num: '03', title: 'Compra do Bitcoin', desc: 'Após criar uma conta na plataforma e configurar sua carteira, você pode comprar Bitcoins usando dinheiro fiat ou outras criptomoedas.' },
              ].map((step) => (
                <motion.div key={step.num} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}
                  className="rounded-2xl border border-white/[0.06] p-6" style={{ background: 'rgba(255,255,255,0.02)' }}
                >
                  <div className="flex items-start gap-4">
                    <span className="text-amber-400 font-black font-mono text-lg">{step.num}</span>
                    <div>
                      <h3 className="text-base font-bold text-white mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{step.title}</h3>
                      <p className="text-stone-500 text-sm leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="rounded-2xl border border-red-500/20 p-6" style={{ background: 'rgba(239,68,68,0.04)' }}>
              <ul className="space-y-3">
                {[
                  'Considere a alocação de seus investimentos de forma equilibrada e evite colocar todo o seu capital em criptomoedas.',
                  'Esteja ciente da volatilidade do mercado e preparado para flutuações de preço.',
                  'Reforce a segurança de suas contas usando autenticação de dois fatores (2FA).',
                  'Fique por dentro das regulamentações do seu país em relação às criptomoedas.',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-stone-500">
                    <span className="text-red-400 mt-0.5 font-bold">-</span> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.section>

        {/* § Conclusão */}
        <motion.section id="conclusao" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20">
              <Eye className="text-amber-400" size={20} />
            </div>
            <h2 className="text-2xl md:text-3xl font-black tracking-tight text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Conclusão: atente-se às oportunidades
            </h2>
          </div>
          <div className="space-y-5 text-stone-400 text-sm md:text-base leading-relaxed">
            <p>Agora que você já sabe o que é halving, certamente está mais preparado para investir e acompanhar esse mercado que atrai cada vez mais interessados ao redor do mundo.</p>
            <p>Portanto, vale a pena acompanhar essa dinâmica, incluindo o próximo halving, previsto para <strong className="text-amber-400">abril de 2028</strong>. Para saber mais sobre o assunto e sobre oportunidades de investimento, acompanhe os conteúdos disponíveis neste ecossistema.</p>
          </div>
        </motion.section>

        {/* ═══ FAQ ═══ */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight text-white mb-8" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Perguntas Frequentes
          </h2>
          <div className="space-y-4">
            {FAQ_ITEMS.map((faq, i) => (
              <details key={i} className="group rounded-2xl border border-white/[0.06] overflow-hidden" style={{ background: 'rgba(255,255,255,0.02)' }}>
                <summary className="cursor-pointer p-6 flex items-center justify-between text-white font-semibold text-base hover:text-amber-400 transition-colors list-none">
                  {faq.q}
                  <ChevronDown size={16} className="text-stone-600 group-open:rotate-180 transition-transform" />
                </summary>
                <div className="px-6 pb-6 text-stone-500 text-sm leading-relaxed">{faq.a}</div>
              </details>
            ))}
          </div>
        </motion.section>
      </div>

      {/* Bottom signature */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-10 py-16">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center space-y-4">
          <div className="h-px w-32 mx-auto mb-6" style={{ background: 'linear-gradient(to right, transparent, rgba(245,158,11,0.2), transparent)' }} />
          <p className="text-stone-600 font-mono text-xs uppercase tracking-widest">Dependência financeira nunca foi acidente. Sempre foi projeto.</p>
          <p className="text-stone-800 font-mono text-[10px] tracking-widest">Lord Junnior © 2026</p>
        </motion.div>
      </div>
    </div>
  );
};

export default HalvingBitcoin;
