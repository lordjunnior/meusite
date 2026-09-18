import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import {
  Server, ArrowRight, ShieldCheck, Lock, Network, EyeOff,
  AlertTriangle, Cpu, HardDrive, Wifi, Terminal, CheckCircle2
} from 'lucide-react';
import CinematicHero from '@/components/CinematicHero';
import ScrollToTop from '@/components/ScrollToTop';
import BackToHome from '@/components/BackToHome';

import infraHardwareWallet from '@/assets/infra-hardware-wallet.webp';
import infraRaspberryNode from '@/assets/infra-raspberry-node.webp';
import infraSsdStorage from '@/assets/infra-ssd-storage.webp';
import infraTorNetwork from '@/assets/infra-tor-network.webp';
import { canonicalUrl } from '@/lib/site';

const APPLE_EASE = [0.22, 1, 0.36, 1] as const;
const fadeUp = {
  hidden: { opacity: 0, y: 30, filter: 'blur(6px)' },
  visible: (i: number) => ({
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: 0.7, ease: APPLE_EASE, delay: i * 0.12 },
  }),
};

export default function Infraestrutura() {
  const [scrollProgress, setScrollProgress] = useState(0);
  useEffect(() => { window.scrollTo(0, 0); }, []);
  useEffect(() => {
    const h = () => {
      const t = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(t > 0 ? Math.min((window.scrollY / t) * 100, 100) : 0);
    };
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);

  return (
    <div className="min-h-screen text-stone-100 font-sans selection:bg-purple-300/50 relative overflow-hidden" style={{ background: '#050808' }}>
      <Helmet>
        <link rel="canonical" href={canonicalUrl('/infraestrutura')} />
        <meta property="og:url" content={canonicalUrl('/infraestrutura')} />
        <title>Infraestrutura — Rode seu Próprio Node Bitcoin | Lord Junnior</title>
        <meta name="description" content="Aprenda a montar seu próprio Node Bitcoin: hardware, software, validação soberana. Se você não roda seu próprio node, está confiando no computador de outra pessoa." />
      </Helmet>
      <ScrollToTop />
      <div className="relative z-20 px-6 md:px-12 lg:px-20 pt-[52px]">
        <BackToHome />
      </div>

      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-[3px]">
        <div className="h-full transition-all duration-150 ease-out" style={{ width: `${scrollProgress}%`, background: 'linear-gradient(90deg, #a855f7, #7c3aed)' }} />
      </div>

      {/* Noise */}
      <div className="fixed inset-0 pointer-events-none z-[1]">
        <div className="absolute inset-0 opacity-[0.035]" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=\"0 0 256 256\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cfilter id=\"n\"%3E%3CfeTurbulence type=\"fractalNoise\" baseFrequency=\"0.9\" numOctaves=\"4\" stitchTiles=\"stitch\"/%3E%3C/filter%3E%3Crect width=\"100%25\" height=\"100%25\" filter=\"url(%23n)\"/%3E%3C/svg%3E')", backgroundSize: '128px 128px' }} />
      </div>

      <CinematicHero
        image="/heroes/infraestrutura-node.webp"
        phase="Don't Trust. Verify."
        title="Rodando com o Urso Dov"
        subtitle="Se você não roda seu próprio node, você está confiando no computador de outra pessoa para dizer quanto dinheiro você tem. Isso não é soberania. É terceirização da verdade."
        icon={Server}
        accentColor="purple"
        backLink="/educacao"
        backLabel="Arsenal Técnico"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 lg:px-16 pt-16 pb-32">

        {/* ═══ CAP 01 — A Ilusão da Privacidade ═══ */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} className="mb-28">
          <motion.div variants={fadeUp} custom={0} className="mb-10">
            <span className="text-[9px] font-bold tracking-[0.3em] uppercase text-red-400/60 font-mono">[ Alerta Tático ]</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mt-2" style={{ fontFamily: "'Bebas Neue', sans-serif", lineHeight: '1.3' }}>
              A Ilusão da Privacidade
            </h2>
          </motion.div>

          {/* Grid alternado: Texto | Imagem */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div variants={fadeUp} custom={1} className="space-y-6">
              <p className="text-stone-400 text-base leading-8">
                Muitos compram uma Hardware Wallet (Ledger, Trezor) e acham que estão 100% protegidos.
                O problema é o <strong className="text-white">software</strong> (Ledger Live, Trezor Suite).
                Ao usá-los sem um Node próprio, sua carteira consulta os servidores da fabricante para checar seu saldo.
              </p>
              <p className="text-stone-400 text-base leading-8">
                Isso significa que uma empresa privada, sujeita a ordens judiciais e vazamentos de dados,
                possui um mapa completo da sua vida financeira em Bitcoin. Sua "carteira fria" está,
                na prática, <strong className="text-red-400">quente nos servidores de outra pessoa</strong>.
              </p>

              <div className="bg-red-950/15 border border-red-500/15 rounded-xl p-6 mt-4">
                <span className="text-[9px] font-bold tracking-[0.3em] uppercase text-red-400/60 font-mono block mb-4">[ O que eles descobrem ]</span>
                <ul className="space-y-3 text-stone-300 text-sm leading-7">
                  <li className="flex items-start gap-3"><div className="w-1.5 h-1.5 bg-red-500 rounded-full shrink-0 mt-2" /> Seu endereço IP — sua localização física real.</li>
                  <li className="flex items-start gap-3"><div className="w-1.5 h-1.5 bg-red-500 rounded-full shrink-0 mt-2" /> Todos os seus endereços de Bitcoin (XPUBs).</li>
                  <li className="flex items-start gap-3"><div className="w-1.5 h-1.5 bg-red-500 rounded-full shrink-0 mt-2" /> Seu saldo total e histórico completo de transações.</li>
                  <li className="flex items-start gap-3"><div className="w-1.5 h-1.5 bg-red-500 rounded-full shrink-0 mt-2" /> Padrões de gasto que revelam hábitos e patrimônio.</li>
                </ul>
              </div>
            </motion.div>

            <motion.div variants={fadeUp} custom={2} className="relative">
              <div className="rounded-2xl overflow-hidden border border-white/[0.06]">
                <img src={infraHardwareWallet} alt="Hardware wallet conectada a laptop" className="w-full h-[400px] lg:h-[500px] object-cover" loading="lazy" decoding="async" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050808] via-transparent to-transparent rounded-2xl" />
              </div>
              <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-black/60 backdrop-blur-md border border-red-500/20 rounded-xl px-5 py-3">
                  <div className="flex items-center gap-2">
                    <EyeOff size={14} className="text-red-400" />
                    <span className="text-[9px] font-bold tracking-[0.3em] uppercase text-red-400 font-mono">Ledger Live → Servidor Ledger → Seu IP + Saldo</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.section>

        <div className="w-full h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent mb-28" />

        {/* ═══ CAP 02 — O Banco Central Pessoal ═══ */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} className="mb-28">
          <motion.div variants={fadeUp} custom={0} className="mb-10">
            <span className="text-[9px] font-bold tracking-[0.3em] uppercase text-purple-400/60 font-mono">[ Capítulo 02 ]</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mt-2" style={{ fontFamily: "'Bebas Neue', sans-serif", lineHeight: '1.3' }}>
              O seu Banco Central Pessoal
            </h2>
          </motion.div>

          {/* Grid alternado: Imagem | Texto */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div variants={fadeUp} custom={1} className="relative order-2 lg:order-1">
              <div className="rounded-2xl overflow-hidden border border-white/[0.06]">
                <img src={infraRaspberryNode} alt="Raspberry Pi rodando node Bitcoin" className="w-full h-[400px] lg:h-[500px] object-cover" loading="lazy" decoding="async" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050808] via-transparent to-transparent rounded-2xl" />
              </div>
              <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-black/60 backdrop-blur-md border border-purple-500/20 rounded-xl px-5 py-3">
                  <div className="flex items-center gap-2">
                    <Terminal size={14} className="text-purple-400" />
                    <span className="text-[9px] font-bold tracking-[0.3em] uppercase text-purple-400 font-mono">Raspberry Pi 5 + Umbrel OS = Soberania</span>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div variants={fadeUp} custom={2} className="space-y-6 order-1 lg:order-2">
              <p className="text-stone-400 text-base leading-8">
                Um Node é um computador que baixa e valida de forma independente <strong className="text-white">toda a blockchain do Bitcoin</strong>,
                desde o bloco gênesis em 3 de janeiro de 2009. Ele garante matematicamente que as regras do consenso estão
                sendo seguidas e que ninguém está imprimindo dinheiro falso.
              </p>
              <p className="text-stone-400 text-base leading-8">
                Quando você roda seu próprio node, você não precisa confiar em nenhuma exchange, nenhum governo,
                nenhum servidor de terceiros. <strong className="text-purple-400">Você se torna seu próprio banco central</strong> —
                verificando cada transação, cada bloco, cada satoshi.
              </p>

              <div className="bg-purple-500/[0.06] border border-purple-500/15 rounded-xl p-6 space-y-3">
                <span className="text-[9px] font-bold tracking-[0.3em] uppercase text-purple-400/60 font-mono block mb-3">[ O que seu Node faz ]</span>
                {[
                  'Valida cada bloco contra as regras de consenso',
                  'Confirma que nenhuma moeda foi gasta duas vezes',
                  'Verifica que o supply nunca exceda 21 milhões',
                  'Transmite suas transações sem intermediários',
                  'Garante privacidade total dos seus saldos',
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 size={14} className="text-purple-400 shrink-0 mt-1" />
                    <span className="text-stone-300 text-sm leading-7">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.section>

        <div className="w-full h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent mb-28" />

        {/* ═══ CAP 03 — Hardware & Setup ═══ */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} className="mb-28">
          <motion.div variants={fadeUp} custom={0} className="mb-10">
            <span className="text-[9px] font-bold tracking-[0.3em] uppercase text-purple-400/60 font-mono">[ Capítulo 03 ]</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mt-2" style={{ fontFamily: "'Bebas Neue', sans-serif", lineHeight: '1.3' }}>
              Hardware & Setup
            </h2>
            <p className="text-stone-500 text-sm mt-3 leading-8">A Máquina de Validação — cada componente tem um propósito tático.</p>
          </motion.div>

          {/* Grid alternado: Texto | Imagem */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-16">
            <motion.div variants={fadeUp} custom={1} className="space-y-8">
              {/* O Cérebro */}
              <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-8 hover:border-purple-500/20 transition-all duration-500">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-purple-500/10 border border-purple-500/15">
                    <Cpu size={18} className="text-purple-400" />
                  </div>
                  <h4 className="text-lg font-bold text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>O Cérebro (Mini PC / Pi)</h4>
                </div>
                <p className="text-stone-400 text-sm leading-7 mb-3">
                  Você não precisa de um supercomputador. Uma máquina dedicada que rode 24/7 com baixo consumo de energia é tudo que precisa.
                </p>
                <span className="text-[9px] font-bold text-purple-400 bg-purple-500/10 px-3 py-1.5 rounded-lg border border-purple-500/15 font-mono tracking-wider">
                  Raspberry Pi 4/5 ou Mini PC Intel N100
                </span>
              </div>

              {/* O Cofre */}
              <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-8 hover:border-purple-500/20 transition-all duration-500">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-purple-500/10 border border-purple-500/15">
                    <HardDrive size={18} className="text-purple-400" />
                  </div>
                  <h4 className="text-lg font-bold text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>O Cofre (SSD 1TB+)</h4>
                </div>
                <p className="text-stone-400 text-sm leading-7 mb-3">
                  O histórico completo do Bitcoin pesa mais de 500GB e cresce diariamente. HDDs mecânicos são proibidos — causam lentidão severa na sincronização inicial.
                </p>
                <span className="text-[9px] font-bold text-purple-400 bg-purple-500/10 px-3 py-1.5 rounded-lg border border-purple-500/15 font-mono tracking-wider">
                  SSD NVMe ou SATA de 1TB (Mínimo)
                </span>
              </div>

              {/* O Sistema */}
              <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-8 hover:border-purple-500/20 transition-all duration-500">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-purple-500/10 border border-purple-500/15">
                    <Server size={18} className="text-purple-400" />
                  </div>
                  <h4 className="text-lg font-bold text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>O Sistema Operacional</h4>
                </div>
                <p className="text-stone-400 text-sm leading-7 mb-3">
                  Softwares modernos transformaram a configuração em uma experiência "Plug and Play", instalável em poucos cliques via interface web.
                </p>
                <span className="text-[9px] font-bold text-purple-400 bg-purple-500/10 px-3 py-1.5 rounded-lg border border-purple-500/15 font-mono tracking-wider">
                  Umbrel · Start9 · RoninDojo
                </span>
              </div>
            </motion.div>

            <motion.div variants={fadeUp} custom={2} className="relative">
              <div className="rounded-2xl overflow-hidden border border-white/[0.06]">
                <img src={infraSsdStorage} alt="SSD NVMe sendo instalado em servidor" className="w-full h-[500px] lg:h-[650px] object-cover" loading="lazy" decoding="async" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050808] via-transparent to-transparent rounded-2xl" />
              </div>
              <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-black/60 backdrop-blur-md border border-purple-500/20 rounded-xl px-5 py-3">
                  <div className="flex items-center gap-2">
                    <HardDrive size={14} className="text-purple-400" />
                    <span className="text-[9px] font-bold tracking-[0.3em] uppercase text-purple-400 font-mono">NVMe SSD — Armazenamento da Blockchain Completa</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.section>

        <div className="w-full h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent mb-28" />

        {/* ═══ CAP 04 — Validação Soberana ═══ */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} className="mb-28">
          <motion.div variants={fadeUp} custom={0} className="mb-10">
            <span className="text-[9px] font-bold tracking-[0.3em] uppercase text-purple-400/60 font-mono">[ Capítulo 04 ]</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mt-2" style={{ fontFamily: "'Bebas Neue', sans-serif", lineHeight: '1.3' }}>
              Validação Soberana
            </h2>
          </motion.div>

          {/* Grid alternado: Imagem | Texto */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div variants={fadeUp} custom={1} className="relative order-2 lg:order-1">
              <div className="rounded-2xl overflow-hidden border border-white/[0.06]">
                <img src={infraTorNetwork} alt="Servidor com rede Tor ativa" className="w-full h-[400px] lg:h-[500px] object-cover" loading="lazy" decoding="async" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050808] via-transparent to-transparent rounded-2xl" />
              </div>
              <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-black/60 backdrop-blur-md border border-purple-500/20 rounded-xl px-5 py-3">
                  <div className="flex items-center gap-2">
                    <Wifi size={14} className="text-purple-400" />
                    <span className="text-[9px] font-bold tracking-[0.3em] uppercase text-purple-400 font-mono">Conexão via Tor — Privacidade de Rede</span>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div variants={fadeUp} custom={2} className="space-y-6 order-1 lg:order-2">
              <p className="text-stone-400 text-base leading-8">
                O objetivo final de construir o Urso Dov é <strong className="text-white">conectar sua Hardware Wallet
                exclusivamente ao seu próprio Node</strong> via rede Tor ou rede local.
              </p>
              <p className="text-stone-400 text-base leading-8">
                Isso impede que os servidores dos fabricantes da carteira saibam seus endereços e saldos,
                garantindo <strong className="text-purple-400">privacidade total</strong> nas suas operações.
              </p>

              {/* Diagrama de conexão */}
              <div className="bg-white/[0.02] border border-white/[0.05] rounded-2xl p-8">
                <span className="text-[9px] font-bold tracking-[0.3em] uppercase text-purple-400/60 font-mono block mb-6">[ Fluxo de Validação ]</span>
                <div className="space-y-4">
                  {[
                    { icon: Lock, label: 'Sua Hardware Wallet', color: 'text-stone-400', desc: 'Assina transações offline' },
                    { icon: ShieldCheck, label: 'Rede Local / Tor', color: 'text-purple-400', desc: 'Conexão criptografada e anônima' },
                    { icon: Server, label: 'Seu Node (Urso Dov)', color: 'text-purple-400', desc: 'Valida blocos e transmite TX' },
                    { icon: Network, label: 'Rede Bitcoin P2P', color: 'text-stone-500', desc: '~60.000 nodes distribuídos globalmente' },
                  ].map((step, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <div className="p-2 rounded-lg bg-white/[0.03] border border-white/[0.06]">
                        <step.icon size={16} className={step.color} />
                      </div>
                      <div className="flex-1">
                        <span className="text-white text-sm font-semibold block">{step.label}</span>
                        <span className="text-stone-500 text-xs">{step.desc}</span>
                      </div>
                      {i < 3 && <ArrowRight size={14} className="text-purple-500/30" />}
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-purple-500/[0.06] border-l-2 border-purple-500/50 rounded-r-xl p-6">
                <p className="text-white font-medium leading-8 text-sm">
                  "Se você não está rodando seu próprio node, você está confiando na honestidade de um estranho.
                  E na era digital, confiar é um luxo que custa patrimônio."
                </p>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* ═══ CTA Final ═══ */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-20">
          <motion.div variants={fadeUp} custom={0} className="bg-white/[0.02] border border-purple-500/10 rounded-3xl p-10 md:p-16 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-radial from-purple-500/[0.03] via-transparent to-transparent" />
            <div className="relative z-10 space-y-6">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white" style={{ fontFamily: "'Bebas Neue', sans-serif", lineHeight: '1.3' }}>
                Not your node, not your <span className="text-purple-400">rules.</span>
              </h2>
              <p className="text-stone-500 text-base leading-8 max-w-2xl mx-auto">
                Construa sua infraestrutura soberana. Valide cada satoshi com suas próprias regras.
                O próximo passo é proteger suas chaves.
              </p>
              <div className="pt-4">
                <Link to="/autocustodia" className="inline-flex items-center gap-3 bg-purple-500/10 border border-purple-500/25 rounded-xl px-8 py-4 text-purple-400 text-sm font-bold uppercase tracking-wider hover:bg-purple-500/20 hover:border-purple-500/40 hover:shadow-[0_0_30px_rgba(168,85,247,0.1)] transition-all duration-500 group">
                  Autocustódia <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.section>

        <footer className="border-t border-white/[0.05] pt-12 text-center">
          <p className="text-stone-700 text-[9px] font-bold tracking-[0.5em] uppercase">Lord Junnior © 2026</p>
        </footer>
      </div>
    </div>
  );
}
