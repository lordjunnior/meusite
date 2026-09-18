import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView, useScroll } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ArrowLeft, Shield, Cpu, WifiOff, QrCode, HardDrive, Eye, Lock,
  ChevronDown, Wrench, AlertTriangle, CheckCircle2, ArrowRight, Layers,
  Camera, Monitor, Fingerprint, ShieldCheck, KeyRound, Package, Database,
  XCircle, ShieldOff, Search, Globe, Zap, Target, Bug, Store
} from 'lucide-react';

import CinematicHero from '@/components/CinematicHero';
import ScrollToTop from '@/components/ScrollToTop';

import imgCadeia from '@/assets/hw-diy-cadeia-confianca.webp';
import imgAirgapped from '@/assets/hw-diy-airgapped.webp';
import imgComponentes from '@/assets/hw-diy-componentes.webp';
import imgSeguranca from '@/assets/hw-diy-seguranca.webp';
import BackToHome from '@/components/BackToHome';

gsap.registerPlugin(ScrollTrigger);

const APPLE_EASE = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 30, filter: 'blur(6px)' },
  visible: (i: number) => ({
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: 0.7, ease: APPLE_EASE, delay: i * 0.12 },
  }),
};

/* ── Nobel Section with GSAP ScrollTrigger ── */
const NobelSection = ({ children, className = '', id, delay = 0 }: {
  children: React.ReactNode; className?: string; id?: string; delay?: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    gsap.fromTo(ref.current,
      { opacity: 0, y: 60, filter: 'blur(10px)' },
      {
        opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.2, delay,
        ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 85%', toggleActions: 'play none none none' },
      }
    );
    return () => { ScrollTrigger.getAll().forEach(t => { if (t.trigger === ref.current) t.kill(); }); };
  }, [delay]);
  return <div ref={ref} id={id} className={className} style={{ opacity: 0 }}>
      <div className="relative z-20 px-6 md:px-12 lg:px-20 pt-[52px]">
        <BackToHome />
      </div>
{children}</div>;
};

/* ── Cinematic Break ── */
const CinematicBreak: React.FC<{ src: string; alt: string; caption: string }> = ({ src, alt, caption }) => (
  <section className="relative z-10 py-8 md:py-14">
    <div className="max-w-6xl mx-auto px-4 md:px-10">
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.97 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.9, ease: APPLE_EASE }}
        className="relative rounded-2xl overflow-hidden border border-border/20 group"
      >
        <img src={src} alt={alt} className="w-full h-56 md:h-[420px] object-cover transition-transform duration-[1.5s] group-hover:scale-[1.03]" style={{ filter: 'brightness(0.7) saturate(0.85)' }} loading="lazy" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, transparent 20%, rgba(5,8,8,0.7) 70%, rgba(5,8,8,0.95) 100%)' }} />
        <div className="absolute bottom-5 left-6 right-6 flex items-end justify-between">
          <p className="text-muted-foreground text-[11px] font-mono uppercase tracking-[0.2em] leading-relaxed max-w-lg">{caption}</p>
          <div className="hidden md:block w-12 h-px bg-gradient-to-r from-primary/40 to-transparent" />
        </div>
      </motion.div>
    </div>
  </section>
);

/* ── Animated Divider (Nobel standard) ── */
const AnimatedDivider = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  return (
    <div ref={ref} className="relative z-10 h-px max-w-5xl mx-auto my-4">
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={isInView ? { scaleX: 1, opacity: 1 } : {}}
        transition={{ duration: 1.2, ease: APPLE_EASE }}
        className="absolute inset-0 origin-left"
        style={{ background: 'linear-gradient(to right, transparent, hsl(var(--gold) / 0.2), transparent)' }}
      />
    </div>
  );
};

/* ── Alert Box ── */
const AlertBox: React.FC<{ icon: React.ElementType; title: string; children: React.ReactNode; variant?: 'danger' | 'warning' | 'info' }> = ({ icon: Icon, title, children, variant = 'danger' }) => {
  const colors = {
    danger: { border: 'border-destructive/20', bg: 'rgba(239,68,68,0.06)', icon: 'text-destructive', title: 'text-destructive' },
    warning: { border: 'border-primary/20', bg: 'rgba(245,158,11,0.06)', icon: 'text-primary', title: 'text-primary' },
    info: { border: 'border-sky-500/20', bg: 'rgba(56,189,248,0.06)', icon: 'text-sky-400', title: 'text-sky-400' },
  };
  const c = colors[variant];
  return (
    <div className={`p-6 rounded-xl border ${c.border}`} style={{ background: c.bg }}>
      <div className="flex items-center gap-3 mb-3">
        <Icon className={`w-5 h-5 ${c.icon}`} />
        <h4 className={`font-bold text-sm ${c.title}`}>{title}</h4>
      </div>
      <div className="text-muted-foreground text-sm leading-relaxed">{children}</div>
    </div>
  );
};

/* ══════════════════════════════════════════════════════════════
   DATA
   ══════════════════════════════════════════════════════════════ */

const PROJECTS = [
  {
    icon: Cpu,
    name: 'SeedSigner',
    accent: 'hsl(var(--gold))',
    accentRaw: '#d4af37',
    ethos: 'Usuário Maker',
    difficulty: 'Intermediário — requer montagem e solda',
    desc: 'Projeto baseado em Raspberry Pi Zero sem conexão à internet. Focado em simplicidade absoluta e assinatura via QR code. É 100% stateless: a seed nunca é armazenada na memória persistente. Após desligar, nenhum dado permanece no dispositivo. Você precisa montar fisicamente: soldar os pinos GPIO no Raspberry Pi Zero, conectar o display WaveShare LCD HAT, acoplar o módulo de câmera e instalar o firmware via cartão microSD.',
    features: ['QR code signing', 'Stateless', 'Raspberry Pi Zero', 'BIP39 / BIP85', 'Dice rolls entropy'],
    components: 'Raspberry Pi Zero (sem WiFi), WaveShare 1.3" LCD HAT, módulo de câmera para Pi Zero, cartão microSD, botões GPIO',
    sourcing: 'Compre cada componente separadamente: Pi Zero na Frutoroni/PiCore, LCD e câmera no AliExpress buscando diretamente pelo nome do componente — nunca pelo link do site do SeedSigner',
  },
  {
    icon: Lock,
    name: 'Krux',
    accent: '#38bdf8',
    accentRaw: '#38bdf8',
    ethos: 'Plug & Play',
    difficulty: 'Iniciante — zero montagem necessária',
    desc: 'Firmware open source que roda em dispositivos com chip K210 (Sipeed Yahboom MV e Maix Amigo). A grande vantagem: você não precisa montar absolutamente nada, não precisa soldar nada, não precisa lidar com componentes separados. Compra o dispositivo pronto no AliExpress, baixa o Krux Installer no GitHub (Windows, macOS ou Linux), instala o firmware e pronto. O fornecedor (Sipeed/Yahboom) fabrica o dispositivo para uso geral em projetos de IA e detecção de imagens — ele não sabe que você vai usar para Bitcoin.',
    features: ['SeedQR', 'Multisig nativo', 'K210 SoC', 'Krux Installer', 'Air-gapped', 'Criptografia AES'],
    components: 'Yahboom MV (recomendado — mais barato) ou Maix Amigo (esgotado em muitos mercados) + cartão microSD',
    sourcing: 'Busque "K210 Yahboom" ou "Yahboom MV" diretamente no AliExpress. Frete grátis, parcelamento disponível, chega em 2-3 semanas. Não diga ao vendedor que é para Bitcoin.',
  },
  {
    icon: Monitor,
    name: 'Specter DIY',
    accent: '#34d399',
    accentRaw: '#34d399',
    ethos: 'Técnico Avançado',
    difficulty: 'Avançado — menos indicado atualmente',
    desc: 'Projeto baseado em ESP32 com tela touchscreen que integra com o Specter Desktop. Apesar de funcional, tem menos olhos atentos no desenvolvimento comparado ao SeedSigner e Krux. A comunidade de desenvolvimento é menor e as atualizações menos frequentes. Suporta PSBT (Partially Signed Bitcoin Transactions) e é uma opção válida para quem já opera dentro do ecossistema Specter.',
    features: ['ESP32', 'Touchscreen', 'PSBT', 'Specter Desktop'],
    components: 'ESP32-S3, display touchscreen ILI9341, câmera OV2640',
    sourcing: 'Componentes genéricos disponíveis no AliExpress',
  },
];

const RISCOS_CADEIA = [
  { icon: Package, label: 'Fabricante dedicado', desc: 'Ao comprar de uma Ledger, Trezor ou BitBox, o fabricante sabe que você vai usar para Bitcoin. Existe um incentivo econômico teórico para um "ataque de aposentadoria" — um golpe final onde o fabricante compromete todos os dispositivos vendidos e desaparece com os fundos.' },
  { icon: HardDrive, label: 'Transporte rastreável', desc: 'O envio é registrado como "hardware wallet Bitcoin". Interceptação postal, adulteração física (evil maid attack) e substituição de firmware são riscos reais. O pacote grita para qualquer observador: "aqui dentro tem acesso a Bitcoin".' },
  { icon: Store, label: 'Revendedores e kits', desc: 'Lojas que vendem "kits faça você mesmo" destroem o principal benefício do DIY: a negação plausível. O fornecedor sabe que aquele lote específico será usado para Bitcoin. Mesmo que o revendedor seja honesto, o fornecedor dele pode não ser.' },
  { icon: Eye, label: 'Associação de compra', desc: 'Ao comprar um kit rotulado como "SeedSigner" ou "Krux", sua identidade fica vinculada à compra de um dispositivo Bitcoin. Seu nome, endereço e CPF ficam associados a um produto cuja única função é proteger chaves privadas.' },
];

const RISCOS_KITS = [
  { icon: Bug, label: 'Chip espião soldado na placa', desc: 'Um microcontrolador adicional pode ser soldado na placa-mãe para interceptar a geração de entropia. Em vez de usar a câmera para gerar aleatoriedade verdadeira, o chip redireciona para uma entropia viciada pré-determinada — o atacante já conhece todas as seeds que serão geradas.' },
  { icon: ShieldOff, label: 'Firmware persistente', desc: 'Mesmo que você instale um firmware limpo, um chip malicioso no hardware pode sobrescrevê-lo silenciosamente. O dispositivo exibe a interface normal, mas por baixo executa código adulterado que exfiltra sua seed ou gera entropia previsível.' },
  { icon: Target, label: 'Incentivo econômico máximo', desc: 'O atacante sabe com 100% de certeza que aquele dispositivo será usado para armazenar Bitcoin. Diferente de um microcontrolador genérico vendido para projetos infantis, aqui o retorno sobre o investimento do ataque é garantido e potencialmente milionário.' },
  { icon: Database, label: 'Cartão microSD envenenado', desc: 'O cartão microSD incluído no kit pode conter código persistente que, ao ser conectado a um PC com internet, exfiltra automaticamente qualquer seed que tenha sido exibida na tela do dispositivo. Nunca use cartões SD fornecidos por terceiros.' },
];

const COMPONENTES_SEEDSIGNER = [
  { icon: Cpu, label: 'Raspberry Pi Zero', desc: 'Versão sem WiFi (importante). Microcomputador de propósito geral criado para projetos educacionais e infantis — nenhum incentivo para adulteração.' },
  { icon: Monitor, label: 'WaveShare 1.3" LCD HAT', desc: 'Display compacto que encaixa diretamente nos pinos GPIO. Compre no AliExpress buscando "WaveShare LCD HAT" — nunca pelo link do site SeedSigner.' },
  { icon: Camera, label: 'Módulo de câmera Pi Zero', desc: 'Qualquer módulo de câmera compatível com Raspberry Pi Zero serve. Usado para ler QR codes e gerar entropia visual verdadeira.' },
  { icon: Database, label: 'Cartão microSD', desc: 'Compre novo e virgem. Grave o firmware diretamente do repositório oficial. O cartão é o único canal de comunicação com o mundo exterior.' },
  { icon: Wrench, label: 'Pinos GPIO + solda', desc: 'O Pi Zero geralmente vem sem os pinos soldados. Você precisará de um ferro de solda para fixar os pinos de I/O — é o "trabalho maker" do projeto.' },
  { icon: Package, label: 'Case impresso em 3D', desc: 'Opcional. Os arquivos STL estão disponíveis no repositório do projeto. Se não tem impressora 3D, compre apenas o case de lojas como a StackBit — nunca o dispositivo inteiro.' },
];

const PASSOS_SEEDSIGNER = [
  { num: '01', title: 'Compre cada componente separadamente', desc: 'Raspberry Pi Zero na Frutoroni ou PiCore. LCD e câmera no AliExpress buscando diretamente pelo nome do componente. Nunca use links do site do projeto — seu histórico de navegação ficaria associado ao SeedSigner. O vendedor chinês deve achar que você vai montar um projetinho caseiro qualquer.' },
  { num: '02', title: 'Solde os pinos GPIO', desc: 'O Raspberry Pi Zero geralmente vem sem os pinos GPIO soldados. Use um ferro de solda comum para fixar os 40 pinos na placa. Se nunca soldou, assista a tutoriais genéricos de solda eletrônica — não tutoriais específicos de SeedSigner.' },
  { num: '03', title: 'Monte o hardware', desc: 'Conecte o display WaveShare LCD HAT nos pinos GPIO, acople o módulo de câmera via flat cable e posicione tudo dentro do case 3D (se tiver). O processo leva menos de 15 minutos para quem já soldou os pinos.' },
  { num: '04', title: 'Baixe e verifique o firmware', desc: 'Acesse o repositório oficial no GitHub (SeedSigner/seedsigner). Baixe a imagem mais recente dos "Releases". Verifique a assinatura GPG do arquivo antes de gravar — isso garante que ninguém adulterou o código entre o desenvolvedor e você.' },
  { num: '05', title: 'Grave o firmware no microSD', desc: 'Use Balena Etcher (interface gráfica) ou o comando dd (Linux) para gravar a imagem no cartão microSD virgem. Insira o cartão no Pi Zero e ligue o dispositivo. Ele inicializa direto no SeedSigner — sem sistema operacional intermediário.' },
  { num: '06', title: 'Gere sua seed com entropia real', desc: 'Use dice rolls (dados físicos) ou a câmera do dispositivo para gerar entropia verdadeira. O SeedSigner é stateless: após desligar, nenhum dado permanece. Sua seed existe apenas enquanto o dispositivo está ligado — anote as 12 ou 24 palavras em backup físico imediatamente.' },
];

const PASSOS_KRUX = [
  { num: '01', title: 'Compre o Yahboom MV no AliExpress', desc: 'Busque "K210 Yahboom" ou "Yahboom MV" diretamente. Frete grátis para o Brasil, parcelamento disponível, entrega em 2-3 semanas. O vendedor fabrica o dispositivo para projetos genéricos de IA e detecção de imagens — se perguntarem, é para um "projetinho de reconhecimento facial caseiro".' },
  { num: '02', title: 'Baixe o Krux Installer', desc: 'Acesse o repositório selfcustody/krux-installer no GitHub. Baixe o instalador para seu sistema (Windows, macOS ou Linux). Verifique a assinatura do release. O Krux Installer tem interface gráfica que simplifica todo o processo de instalação do firmware.' },
  { num: '03', title: 'Instale o firmware', desc: 'Conecte o Yahboom MV via USB ao computador. Execute o Krux Installer e siga as instruções na tela. O firmware é gravado diretamente na memória flash do dispositivo. Após a instalação, desconecte o USB — o dispositivo nunca mais precisará de conexão com computador.' },
  { num: '04', title: 'Gere ou importe sua seed', desc: 'Ligue o dispositivo. Use dados físicos, a câmera ou o gerador interno para criar uma nova seed com entropia forte. O Krux suporta BIP39, SeedQR, criptografia AES para transporte seguro de seeds e multisig nativo. Sua carteira soberana está pronta.' },
];

/* ══════════════════════════════════════════════════════════════ */

const HardwareWalletDiy = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Hardware Wallet DIY Bitcoin — Como Construir Seu Próprio Dispositivo de Assinatura",
    "author": { "@type": "Person", "name": "Lord Junnior" },
    "publisher": { "@type": "Organization", "name": "Lord Junnior" },
    "datePublished": "2026-03-10",
    "description": "Guia completo de hardware wallets DIY para autocustódia Bitcoin: SeedSigner, Krux e Specter. Aprenda os riscos dos kits pré-montados, como fazer sourcing seguro e eliminar a cadeia de confiança.",
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      { "@type": "Question", "name": "Qual a diferença entre SeedSigner e Krux?", "acceptedAnswer": { "@type": "Answer", "text": "SeedSigner usa Raspberry Pi Zero e exige montagem e solda (perfil maker). Krux roda em dispositivos K210 prontos como Yahboom MV — zero montagem, basta instalar o firmware. Ambos são air-gapped e open source." } },
      { "@type": "Question", "name": "Posso comprar um kit pronto de hardware wallet DIY?", "acceptedAnswer": { "@type": "Answer", "text": "Não é recomendado. Ao comprar um kit rotulado como Bitcoin, você perde a principal vantagem do DIY: o fornecedor não saber para que serve. O kit pode conter hardware adulterado, entropia viciada ou chips espiões." } },
      { "@type": "Question", "name": "Onde comprar os componentes para SeedSigner no Brasil?", "acceptedAnswer": { "@type": "Answer", "text": "Raspberry Pi Zero na Frutoroni ou PiCore. LCD WaveShare e câmera no AliExpress buscando pelo nome genérico do componente — nunca pelo link do site SeedSigner." } },
      { "@type": "Question", "name": "O que é um dispositivo air-gapped?", "acceptedAnswer": { "@type": "Answer", "text": "Um dispositivo que nunca se conecta à internet. Assina transações offline via QR code ou cartão SD. A chave privada nunca toca a rede — impossível hackear remotamente." } },
      { "@type": "Question", "name": "O Krux é seguro para guardar muito Bitcoin?", "acceptedAnswer": { "@type": "Answer", "text": "Sim, desde que você compre o dispositivo K210 diretamente do fabricante genérico (Sipeed/Yahboom) e instale o firmware do repositório oficial selfcustody/krux no GitHub. Nunca confie em firmware fornecido por terceiros." } },
    ],
  };

  return (
    <>
      <Helmet>
        <title>Hardware Wallet DIY Bitcoin | Como Construir Seu Próprio Dispositivo de Assinatura</title>
        <meta name="description" content="Aprenda como construir hardware wallets DIY como SeedSigner, Krux e Specter. Guia completo: riscos dos kits pré-montados, sourcing seguro de componentes, dispositivos air-gapped e autocustódia Bitcoin soberana." />
        <link rel="canonical" href="https://lordjunnior.com.br/autocustodia/hardware-wallet-diy-bitcoin" />
        <meta property="og:title" content="Hardware Wallet DIY Bitcoin | Construa Seu Dispositivo de Assinatura" />
        <meta property="og:description" content="Guia completo de hardware wallets DIY para autocustódia Bitcoin soberana. SeedSigner, Krux, riscos dos kits e sourcing seguro." />
        <meta property="og:image" content="/heroes/hardware-wallet-diy.webp" />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      <ScrollToTop />

      {/* ═══ Reading Progress Bar ═══ */}
      <ProgressBar />

      <div className="min-h-screen text-foreground selection:bg-primary/30" style={{ background: '#050808' }}>

        {/* ═══ VFX LAYER: Film Grain + Breathing Orbs + Light Beams ═══ */}
        <div className="fixed inset-0 pointer-events-none z-[1]">
          {/* Film Grain */}
          <div className="absolute inset-0 opacity-[0.035]" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.5'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat',
            mixBlendMode: 'overlay',
          }} />
          {/* Breathing Orbs */}
          <div className="absolute top-[20%] left-[10%] w-[500px] h-[500px] rounded-full animate-pulse" style={{
            background: 'radial-gradient(circle, hsl(var(--gold) / 0.04) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }} />
          <div className="absolute top-[60%] right-[5%] w-[400px] h-[400px] rounded-full animate-pulse" style={{
            background: 'radial-gradient(circle, rgba(56,189,248,0.03) 0%, transparent 70%)',
            filter: 'blur(80px)',
            animationDelay: '2s',
            animationDuration: '6s',
          }} />
          {/* Light Beams */}
          <div className="absolute top-0 left-1/4 w-px h-full" style={{
            background: 'linear-gradient(180deg, transparent 0%, hsl(var(--gold) / 0.03) 30%, transparent 70%)',
          }} />
          <div className="absolute top-0 right-1/3 w-px h-full" style={{
            background: 'linear-gradient(180deg, transparent 10%, hsl(var(--gold) / 0.02) 50%, transparent 90%)',
          }} />
        </div>

        {/* ═══ CINEMATIC HERO (Nobel Standard) ═══ */}
        <CinematicHero
          image="/heroes/hardware-wallet-diy.webp"
          phase="Autocustódia Avançada — Nível Maker"
          title="Dispositivo de Assinatura"
          subtitle="Sua chave é o que lhe dá acesso aos seus satoshis na rede Bitcoin. Sem ela, você não tem nada. Criar essa chave com segurança é a decisão mais importante da sua vida financeira."
          icon={Cpu}
          accentColor="amber"
          backLink="/autocustodia"
          backLabel="Autocustódia"
        />

        {/* ══════════════════════════════════════════════════════
            CAP 01 — A CADEIA DE CONFIANÇA
        ══════════════════════════════════════════════════════ */}
        <section id="cadeia" className="relative z-10 py-20 md:py-32">
          <div className="max-w-5xl mx-auto px-6">
            <NobelSection>
              <p className="pre-title text-primary/70">Capítulo 01 — O problema</p>
              <h2 className="text-3xl md:text-5xl font-black mb-8 font-display">
                A cadeia de confiança que você não enxerga
              </h2>
              
              <div className="space-y-6 max-w-3xl mb-16">
                <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
                  Você compra uma BitBox 02, Trezor Safe 5, ColdCard Q ou Keystone. Dispositivos excelentes, empresas com reputação alta. Mas existe um problema estrutural que nenhum marketing resolve: <strong className="text-foreground">o fabricante sabe que você vai usar para Bitcoin.</strong>
                </p>
                <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
                  Quando você faz essa compra, seu nome, endereço e CPF ficam vinculados a um produto cuja única função é proteger chaves privadas. O entregador sabe. A transportadora sabe. A alfândega sabe. Seu banco sabe (pela transação). E o fabricante tem o registro completo.
                </p>
                <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
                  Projetos DIY surgiram para <strong className="text-primary">eliminar completamente essa cadeia</strong>. Você compra componentes eletrônicos genéricos — microcontroladores vendidos para projetos infantis e educacionais — e instala firmware open source auditável. O fornecedor chinês no AliExpress acha que você vai montar um robozinho caseiro. <strong className="text-foreground">E esse é exatamente o ponto.</strong>
                </p>
              </div>

              {/* Risk Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {RISCOS_CADEIA.map((r, i) => (
                  <motion.div
                    key={r.label}
                    initial="hidden" whileInView="visible" viewport={{ once: true }}
                    variants={fadeUp} custom={i}
                    className="p-5 rounded-xl border border-destructive/10 hover:border-destructive/25 transition-all duration-500"
                    style={{ background: 'rgba(239,68,68,0.04)' }}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <r.icon className="w-5 h-5 text-destructive" />
                      <h4 className="font-bold text-foreground text-sm">{r.label}</h4>
                    </div>
                    <p className="text-muted-foreground text-xs leading-relaxed">{r.desc}</p>
                  </motion.div>
                ))}
              </div>
            </NobelSection>
          </div>
        </section>

        <CinematicBreak src={imgCadeia} alt="Cadeia de confiança quebrada" caption="Cada elo na cadeia de confiança é um ponto de vulnerabilidade — o maker elimina todos" />
        <AnimatedDivider />

        {/* ══════════════════════════════════════════════════════
            CAP 02 — ALERTA: KITS PRÉ-MONTADOS
        ══════════════════════════════════════════════════════ */}
        <section className="relative z-10 py-20 md:py-32">
          <div className="max-w-5xl mx-auto px-6">
            <NobelSection>
              <p className="pre-title text-destructive/70">Capítulo 02 — Alerta crítico</p>
              <h2 className="text-3xl md:text-5xl font-black mb-8 font-display">
                Por que nunca comprar kits "Faça Você Mesmo"
              </h2>

              <div className="space-y-6 max-w-3xl mb-16">
                <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
                  Existem lojas — na África do Sul, Europa, e inclusive no Brasil — vendendo "kits faça você mesmo" com todas as peças necessárias para montar uma SeedSigner ou Krux. <strong className="text-destructive">Isso derrota completamente o propósito do DIY.</strong>
                </p>
                <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
                  O etos do projeto é que <strong className="text-foreground">você é o usuário maker</strong>. Você coloca o chapéu de maker. Você mesmo compra cada componente de fornecedores que vendem para uso geral. O momento em que você compra de alguém que sabe que é para Bitcoin, você reintroduziu a cadeia de confiança que estava tentando eliminar.
                </p>
                <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
                  Pior: mesmo que o revendedor brasileiro seja 100% honesto, ele pode estar comprando os componentes de um fornecedor que ele próprio informou que o uso final é Bitcoin. O fornecedor agora sabe que aquele lote específico vai armazenar chaves privadas. <strong className="text-primary">O incentivo para adulterar aquele lote acaba de se tornar milionário.</strong>
                </p>
              </div>

              <AlertBox icon={AlertTriangle} title="Ataque de aposentadoria" variant="danger">
                <p>Existe um cenário chamado "exit scam" ou "ataque de aposentadoria": um vendedor com boa reputação constrói confiança durante anos, vendendo dispositivos legítimos. Num dia, decide que é hora de "se aposentar" — compromete silenciosamente o próximo lote, extrai os fundos de todos os compradores e desaparece. Quanto mais reputação construiu, mais devastador é o golpe final. Isso vale para qualquer fornecedor, inclusive os mais respeitados do ecossistema.</p>
              </AlertBox>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-10">
                {RISCOS_KITS.map((r, i) => (
                  <motion.div
                    key={r.label}
                    initial="hidden" whileInView="visible" viewport={{ once: true }}
                    variants={fadeUp} custom={i}
                    className="p-5 rounded-xl border border-destructive/10 hover:border-destructive/25 transition-all duration-500"
                    style={{ background: 'rgba(239,68,68,0.04)' }}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <r.icon className="w-5 h-5 text-destructive" />
                      <h4 className="font-bold text-foreground text-sm">{r.label}</h4>
                    </div>
                    <p className="text-muted-foreground text-xs leading-relaxed">{r.desc}</p>
                  </motion.div>
                ))}
              </div>

              <div className="mt-10 p-6 rounded-xl border border-primary/15" style={{ background: 'hsl(var(--gold) / 0.04)' }}>
                <p className="font-mono text-[10px] tracking-[0.3em] text-primary/60 uppercase mb-3">Regra de ouro do maker</p>
                <p className="text-foreground text-base font-semibold mb-2">Se o fornecedor sabe que é para Bitcoin, você já perdeu a vantagem.</p>
                <p className="text-muted-foreground text-sm leading-relaxed">Compre cada componente separadamente de fornecedores genéricos. Nunca use links diretos do site do projeto. Nunca compre kits rotulados. Se perguntarem, é para um projetinho de robótica caseira. Ponto.</p>
              </div>
            </NobelSection>
          </div>
        </section>

        <AnimatedDivider />

        {/* ══════════════════════════════════════════════════════
            CAP 03 — DISPOSITIVOS AIR-GAPPED
        ══════════════════════════════════════════════════════ */}
        <section className="relative z-10 py-20 md:py-32">
          <div className="max-w-5xl mx-auto px-6">
            <NobelSection>
              <p className="pre-title text-primary/70">Capítulo 03 — Fundamento técnico</p>
              <h2 className="text-3xl md:text-5xl font-black mb-8 font-display">
                O conceito air-gapped: zero conexão, zero risco remoto
              </h2>
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-3xl mb-12">
                Dispositivos air-gapped <strong className="text-foreground">nunca se conectam à internet</strong>. Sem WiFi, sem Bluetooth, sem USB data, sem NFC, sem absolutamente nenhum canal de comunicação digital. Eles assinam transações offline e transmitem o resultado via QR code (canal visual unidirecional) ou cartão SD removível. A chave privada nunca toca a rede — é <strong className="text-primary">matematicamente impossível</strong> hackear remotamente o que não está conectado.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {[
                  { icon: WifiOff, label: 'Zero conexão digital', desc: 'Sem WiFi, Bluetooth, USB data ou qualquer canal de comunicação. O dispositivo é uma ilha isolada. Hackear remotamente é impossível por definição — não existe caminho de ataque.' },
                  { icon: QrCode, label: 'Assinatura via QR Code', desc: 'A transação entra como QR code (PSBT), é assinada offline e sai como outro QR code. Canal visual unidirecional — o dispositivo nunca recebe dados digitais, apenas luz.' },
                  { icon: Database, label: 'Cartão SD removível', desc: 'Alternativa ao QR: PSBTs exportados via cartão microSD. O cartão funciona como um "mensageiro físico" entre o computador online e o dispositivo offline. Inspecionável e substituível.' },
                ].map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial="hidden" whileInView="visible" viewport={{ once: true }}
                    variants={fadeUp} custom={i}
                    className="p-6 rounded-xl border border-primary/10 hover:border-primary/25 transition-all duration-500"
                    style={{ background: 'hsl(var(--gold) / 0.04)' }}
                  >
                    <item.icon className="w-8 h-8 text-primary mb-3" />
                    <h4 className="font-bold text-foreground text-sm mb-2">{item.label}</h4>
                    <p className="text-muted-foreground text-xs leading-relaxed">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </NobelSection>
          </div>
        </section>

        <CinematicBreak src={imgAirgapped} alt="Dispositivo air-gapped exibindo QR code" caption="A assinatura acontece offline — a chave privada nunca toca a internet" />
        <AnimatedDivider />

        {/* ══════════════════════════════════════════════════════
            CAP 04 — PROJETOS DIY: SEEDSIGNER vs KRUX vs SPECTER
        ══════════════════════════════════════════════════════ */}
        <section className="relative z-10 py-20 md:py-32">
          <div className="max-w-5xl mx-auto px-6">
            <NobelSection>
              <p className="pre-title text-primary/70">Capítulo 04 — Os projetos</p>
              <h2 className="text-3xl md:text-5xl font-black mb-8 font-display">
                SeedSigner, Krux e Specter: qual escolher
              </h2>
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-3xl mb-6">
                Hoje, <strong className="text-foreground">SeedSigner e Krux</strong> são as duas opções mais indicadas — têm mais desenvolvimento ativo, mais olhos atentos no código e comunidades mais robustas. A Specter DIY é funcional mas tem desenvolvimento menos frequente. Cada projeto atende um perfil diferente de usuário.
              </p>

              <AlertBox icon={Zap} title="Recomendação direta" variant="info">
                <p><strong>Se você não quer soldar nada</strong> e quer o caminho mais simples: Krux + Yahboom MV. Compre no AliExpress, instale o firmware, pronto. <strong>Se você é maker</strong> e quer o máximo controle sobre cada componente: SeedSigner + Raspberry Pi Zero. Vai dar trabalho, mas a segurança é máxima.</p>
              </AlertBox>

              <div className="grid grid-cols-1 gap-8 mt-12">
                {PROJECTS.map((p, i) => (
                  <motion.div
                    key={p.name}
                    initial="hidden" whileInView="visible" viewport={{ once: true }}
                    variants={fadeUp} custom={i}
                    className="relative p-8 rounded-2xl border border-border/30 hover:border-border/60 transition-all duration-500 group"
                    style={{ background: `linear-gradient(135deg, ${p.accentRaw}08, transparent 60%)` }}
                  >
                    <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: `${p.accentRaw}15`, border: `1px solid ${p.accentRaw}30` }}>
                          <p.icon className="w-6 h-6" style={{ color: p.accentRaw }} />
                        </div>
                        <div>
                          <h3 className="text-2xl font-black font-display" style={{ color: p.accentRaw }}>{p.name}</h3>
                          <p className="text-muted-foreground text-xs">{p.difficulty}</p>
                        </div>
                      </div>
                      <span className="px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider border self-start md:ml-auto" style={{ borderColor: `${p.accentRaw}30`, color: p.accentRaw, background: `${p.accentRaw}08` }}>
                        {p.ethos}
                      </span>
                    </div>

                    <p className="text-muted-foreground text-sm leading-relaxed mb-4 max-w-3xl">{p.desc}</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <div className="p-4 rounded-lg border border-border/20" style={{ background: `${p.accentRaw}04` }}>
                        <p className="font-mono text-[9px] tracking-[0.2em] text-muted-foreground/60 uppercase mb-2">Componentes</p>
                        <p className="text-foreground text-xs leading-relaxed">{p.components}</p>
                      </div>
                      <div className="p-4 rounded-lg border border-border/20" style={{ background: `${p.accentRaw}04` }}>
                        <p className="font-mono text-[9px] tracking-[0.2em] text-muted-foreground/60 uppercase mb-2">Sourcing seguro</p>
                        <p className="text-foreground text-xs leading-relaxed">{p.sourcing}</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {p.features.map(f => (
                        <span key={f} className="px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider border" style={{ borderColor: `${p.accentRaw}30`, color: p.accentRaw, background: `${p.accentRaw}08` }}>
                          {f}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </NobelSection>
          </div>
        </section>

        <AnimatedDivider />

        {/* ══════════════════════════════════════════════════════
            CAP 05 — COMPONENTES SEEDSIGNER
        ══════════════════════════════════════════════════════ */}
        <section className="relative z-10 py-20 md:py-32">
          <div className="max-w-5xl mx-auto px-6">
            <NobelSection>
              <p className="pre-title text-primary/70">Capítulo 05 — Componentes</p>
              <h2 className="text-3xl md:text-5xl font-black mb-8 font-display">
                O que comprar e onde comprar
              </h2>
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-3xl mb-6">
                Para a <strong className="text-foreground">SeedSigner</strong>, você precisa de componentes separados. Para a <strong className="text-foreground">Krux</strong>, basta um único dispositivo. Em ambos os casos, a regra é a mesma: <strong className="text-primary">compre de fornecedores genéricos que não sabem para que serve.</strong>
              </p>

              <AlertBox icon={Search} title="Regra de sourcing" variant="warning">
                <p>Nunca use links diretos do site do SeedSigner ou Krux para comprar componentes. Seu navegador registra a origem da navegação (referrer). O vendedor saberia que você chegou através de um site de Bitcoin. Vá diretamente ao AliExpress e busque pelo nome técnico do componente.</p>
              </AlertBox>

              <h3 className="text-xl font-bold mt-12 mb-6 font-display">Kit SeedSigner — componentes individuais</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {COMPONENTES_SEEDSIGNER.map((c, i) => (
                  <motion.div
                    key={c.label}
                    initial="hidden" whileInView="visible" viewport={{ once: true }}
                    variants={fadeUp} custom={i}
                    className="p-5 rounded-xl border border-border/20 hover:border-primary/20 transition-all duration-500 group"
                    style={{ background: 'hsl(var(--gold) / 0.03)' }}
                  >
                    <c.icon className="w-6 h-6 text-primary/70 mb-3 group-hover:text-primary transition-colors" />
                    <h4 className="font-bold text-foreground text-sm mb-1">{c.label}</h4>
                    <p className="text-muted-foreground text-xs leading-relaxed">{c.desc}</p>
                  </motion.div>
                ))}
              </div>

              <div className="mt-10 p-6 rounded-xl border border-sky-500/15" style={{ background: 'rgba(56,189,248,0.04)' }}>
                <div className="flex items-center gap-3 mb-3">
                  <Lock className="w-5 h-5 text-sky-400" />
                  <h4 className="font-bold text-sm text-sky-400">Kit Krux — apenas um dispositivo</h4>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">Para a Krux, você precisa apenas do <strong className="text-foreground">Yahboom MV</strong> (recomendado) e um cartão microSD virgem. Busque "K210 Yahboom" no AliExpress. Frete grátis para o Brasil, parcelamento disponível, entrega em 2-3 semanas. O dispositivo já vem montado — zero soldas, zero montagem. Se perguntarem, é para um projeto de detecção de imagens por IA offline.</p>
              </div>
            </NobelSection>
          </div>
        </section>

        <CinematicBreak src={imgComponentes} alt="Componentes de hardware wallet DIY" caption="Componentes genéricos para uso geral — o vendedor chinês nunca saberá o verdadeiro propósito" />
        <AnimatedDivider />

        {/* ══════════════════════════════════════════════════════
            CAP 06 — PASSO A PASSO
        ══════════════════════════════════════════════════════ */}
        <section className="relative z-10 py-20 md:py-32">
          <div className="max-w-5xl mx-auto px-6">
            <NobelSection>
              <p className="pre-title text-primary/70">Capítulo 06 — Montagem</p>
              <h2 className="text-3xl md:text-5xl font-black mb-8 font-display">
                Passo a passo: do componente à carteira soberana
              </h2>

              {/* SeedSigner Steps */}
              <div className="mb-16">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: 'hsl(var(--gold) / 0.1)', border: '1px solid hsl(var(--gold) / 0.2)' }}>
                    <Cpu className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold font-display">Montando a SeedSigner</h3>
                </div>
                <div className="space-y-4">
                  {PASSOS_SEEDSIGNER.map((p, i) => (
                    <motion.div
                      key={p.num}
                      initial="hidden" whileInView="visible" viewport={{ once: true }}
                      variants={fadeUp} custom={i}
                      className="flex gap-5 p-5 rounded-xl border border-border/20 hover:border-primary/15 transition-all duration-500"
                      style={{ background: 'hsl(var(--gold) / 0.03)' }}
                    >
                      <div className="flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center border border-primary/20" style={{ background: 'hsl(var(--gold) / 0.08)' }}>
                        <span className="text-primary font-black text-sm font-display">{p.num}</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-foreground text-sm mb-1">{p.title}</h4>
                        <p className="text-muted-foreground text-xs leading-relaxed">{p.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Krux Steps */}
              <div>
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: 'rgba(56,189,248,0.1)', border: '1px solid rgba(56,189,248,0.2)' }}>
                    <Lock className="w-5 h-5 text-sky-400" />
                  </div>
                  <h3 className="text-xl font-bold font-display">Instalando a Krux</h3>
                  <span className="px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider border border-sky-500/30 text-sky-400" style={{ background: 'rgba(56,189,248,0.08)' }}>
                    Mais simples
                  </span>
                </div>
                <div className="space-y-4">
                  {PASSOS_KRUX.map((p, i) => (
                    <motion.div
                      key={p.num}
                      initial="hidden" whileInView="visible" viewport={{ once: true }}
                      variants={fadeUp} custom={i}
                      className="flex gap-5 p-5 rounded-xl border border-border/20 hover:border-sky-500/15 transition-all duration-500"
                      style={{ background: 'rgba(56,189,248,0.03)' }}
                    >
                      <div className="flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center border border-sky-500/20" style={{ background: 'rgba(56,189,248,0.08)' }}>
                        <span className="text-sky-400 font-black text-sm font-display">{p.num}</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-foreground text-sm mb-1">{p.title}</h4>
                        <p className="text-muted-foreground text-xs leading-relaxed">{p.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </NobelSection>
          </div>
        </section>

        <AnimatedDivider />

        {/* ══════════════════════════════════════════════════════
            CAP 07 — FIRMWARE
        ══════════════════════════════════════════════════════ */}
        <section className="relative z-10 py-20 md:py-32">
          <div className="max-w-5xl mx-auto px-6">
            <NobelSection>
              <p className="pre-title text-destructive/70">Capítulo 07 — Software</p>
              <h2 className="text-3xl md:text-5xl font-black mb-8 font-display">
                Firmware: a parte que você nunca terceiriza
              </h2>

              <div className="space-y-6 max-w-3xl mb-12">
                <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
                  Mesmo que você resolva confiar no hardware de um kit, <strong className="text-destructive">nunca confie no software fornecido por terceiros</strong>. Nunca. Sob nenhuma circunstância. O firmware é a alma do dispositivo — é ele que gera entropia, cria sua seed e assina suas transações.
                </p>
                <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
                  Um firmware adulterado pode exibir a interface normal do SeedSigner ou Krux, mas por trás gerar entropia viciada — seeds que o atacante já conhece antes de você. Você vê 24 palavras aparentemente aleatórias na tela, mas o atacante já tem a mesma lista. Seus fundos estão comprometidos desde o primeiro segundo.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                <div className="p-6 rounded-xl border border-emerald-500/15" style={{ background: 'rgba(52,211,153,0.04)' }}>
                  <div className="flex items-center gap-3 mb-4">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    <h4 className="font-bold text-sm text-emerald-400">Fontes legítimas</h4>
                  </div>
                  <ul className="space-y-3 text-muted-foreground text-sm">
                    <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500/60 mt-0.5 shrink-0" /><span><strong className="text-foreground">SeedSigner:</strong> github.com/SeedSigner/seedsigner → Releases</span></li>
                    <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500/60 mt-0.5 shrink-0" /><span><strong className="text-foreground">Krux:</strong> github.com/selfcustody/krux → Releases</span></li>
                    <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500/60 mt-0.5 shrink-0" /><span><strong className="text-foreground">Krux Installer:</strong> github.com/selfcustody/krux-installer → Releases</span></li>
                    <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500/60 mt-0.5 shrink-0" /><span>Sempre verifique a <strong className="text-foreground">assinatura GPG</strong> do release antes de instalar</span></li>
                  </ul>
                </div>
                <div className="p-6 rounded-xl border border-destructive/15" style={{ background: 'rgba(239,68,68,0.04)' }}>
                  <div className="flex items-center gap-3 mb-4">
                    <XCircle className="w-5 h-5 text-destructive" />
                    <h4 className="font-bold text-sm text-destructive">Nunca aceitar</h4>
                  </div>
                  <ul className="space-y-3 text-muted-foreground text-sm">
                    <li className="flex items-start gap-2"><XCircle className="w-4 h-4 text-destructive/60 mt-0.5 shrink-0" /><span>Firmware pré-instalado em cartão SD de kits</span></li>
                    <li className="flex items-start gap-2"><XCircle className="w-4 h-4 text-destructive/60 mt-0.5 shrink-0" /><span>Downloads de sites de terceiros ou revendedores</span></li>
                    <li className="flex items-start gap-2"><XCircle className="w-4 h-4 text-destructive/60 mt-0.5 shrink-0" /><span>Links de grupos de Telegram ou WhatsApp</span></li>
                    <li className="flex items-start gap-2"><XCircle className="w-4 h-4 text-destructive/60 mt-0.5 shrink-0" /><span>Qualquer firmware sem assinatura verificável</span></li>
                  </ul>
                </div>
              </div>
            </NobelSection>
          </div>
        </section>

        <AnimatedDivider />

        {/* ══════════════════════════════════════════════════════
            CAP 08 — SEGURANÇA ALÉM DO DISPOSITIVO
        ══════════════════════════════════════════════════════ */}
        <section className="relative z-10 py-20 md:py-32">
          <div className="max-w-5xl mx-auto px-6">
            <NobelSection>
              <p className="pre-title text-primary/70">Capítulo 08 — Blindagem completa</p>
              <h2 className="text-3xl md:text-5xl font-black mb-8 font-display">
                O dispositivo assina. O backup protege.
              </h2>
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-3xl mb-12">
                Montar seu próprio dispositivo de assinatura é apenas uma camada da blindagem. Segurança real é um sistema completo: dispositivo seguro + backup resistente + redundância geográfica + operational security impecável. Uma falha em qualquer camada compromete todas as outras.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { icon: KeyRound, title: 'Backup em metal, nunca em papel', desc: 'Grave suas 12 ou 24 palavras em placa de aço ou titânio. Papel é vulnerável a fogo, água e tempo. Metal sobrevive a incêndios de até 1.500°C. Use punção manual ou placa de gravação — a seed nunca deve tocar um dispositivo digital durante o backup.' },
                  { icon: Layers, title: 'Redundância geográfica obrigatória', desc: 'Mantenha cópias do backup em pelo menos dois locais fisicamente separados. Um incêndio, enchente ou invasão domiciliar não devem comprometer todos os seus acessos. Pense em cofres bancários, casas de familiares de confiança ou enterrados.' },
                  { icon: ShieldCheck, title: 'Passphrase como segunda linha', desc: 'A 25ª palavra (passphrase) cria uma carteira derivada invisível. Mesmo que alguém encontre suas 24 palavras e monte um dispositivo idêntico ao seu, não consegue acessar os fundos sem a passphrase. É a diferença entre ser roubado e ser imune ao roubo.' },
                  { icon: Globe, title: 'OpSec: silêncio é blindagem', desc: 'Nunca fale publicamente que possui Bitcoin ou hardware wallets. Nunca poste fotos do seu setup. Nunca mencione valores. A melhor segurança do mundo é inútil se o atacante sabe que você é um alvo. Negação plausível é a última linha de defesa.' },
                ].map((item, i) => (
                  <motion.div
                    key={item.title}
                    initial="hidden" whileInView="visible" viewport={{ once: true }}
                    variants={fadeUp} custom={i}
                    className="p-6 rounded-xl border border-border/20 hover:border-primary/20 transition-all duration-500"
                    style={{ background: 'hsl(var(--gold) / 0.04)' }}
                  >
                    <item.icon className="w-6 h-6 text-primary mb-3" />
                    <h4 className="font-bold text-foreground text-sm mb-2">{item.title}</h4>
                    <p className="text-muted-foreground text-xs leading-relaxed">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </NobelSection>
          </div>
        </section>

        <CinematicBreak src={imgSeguranca} alt="Segurança em autocustódia Bitcoin" caption="Dispositivo de assinatura + backup em metal + redundância geográfica + silêncio absoluto" />
        <AnimatedDivider />

        {/* ══════════════════════════════════════════════════════
            CAP 09 — PREGUIÇOSO DEMAIS?
        ══════════════════════════════════════════════════════ */}
        <section className="relative z-10 py-20 md:py-32">
          <div className="max-w-5xl mx-auto px-6">
            <NobelSection>
              <p className="pre-title text-primary/70">Capítulo 09 — Alternativa honesta</p>
              <h2 className="text-3xl md:text-5xl font-black mb-8 font-display">
                Não é maker? Compre de fabricante reputado.
              </h2>
              <div className="space-y-6 max-w-3xl mb-12">
                <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
                  Se você não está preparado para colocar a mão na massa — para soldar pinos, verificar assinaturas GPG, buscar componentes no AliExpress e instalar firmware pelo terminal — <strong className="text-foreground">então hardware wallet DIY não é para você. E tudo bem.</strong>
                </p>
                <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
                  Comprar uma <strong className="text-primary">BitBox 02, Trezor Safe 5 ou ColdCard Q</strong> de um fabricante com alta reputação é infinitamente mais seguro do que comprar um "kit faça você mesmo" de um revendedor amador. Essas empresas têm reputação pública a perder, código auditado por terceiros e processos de segurança de nível industrial.
                </p>
                <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
                  O que <strong className="text-destructive">nunca faz sentido</strong> é o meio-termo: comprar um kit de alguém que monta hardware wallets no fundo de casa e vende como "DIY". Isso tem o pior dos dois mundos — a cadeia de confiança de um fabricante desconhecido, sem a auditoria e a reputação de uma empresa estabelecida.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { label: 'Maker genuíno', status: 'Máxima segurança', color: 'emerald', desc: 'Compra cada componente genérico, monta, solda, instala firmware do GitHub. Ninguém sabe que é para Bitcoin.' },
                  { label: 'Fabricante reputado', status: 'Segurança alta', color: 'amber', desc: 'BitBox, Trezor, ColdCard. Cadeia de confiança existe, mas é mitigada por reputação, auditoria e código aberto.' },
                  { label: 'Kit de revendedor', status: 'Risco inaceitável', color: 'red', desc: 'Pior dos dois mundos. Cadeia de confiança de desconhecido + zero auditoria + incentivo econômico máximo para ataque.' },
                ].map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial="hidden" whileInView="visible" viewport={{ once: true }}
                    variants={fadeUp} custom={i}
                    className="p-6 rounded-xl border transition-all duration-500 text-center"
                    style={{
                      borderColor: item.color === 'emerald' ? 'rgba(52,211,153,0.2)' : item.color === 'amber' ? 'rgba(245,158,11,0.2)' : 'rgba(239,68,68,0.2)',
                      background: item.color === 'emerald' ? 'rgba(52,211,153,0.04)' : item.color === 'amber' ? 'rgba(245,158,11,0.04)' : 'rgba(239,68,68,0.04)',
                    }}
                  >
                    <p className="font-bold text-foreground text-sm mb-1">{item.label}</p>
                    <p className="text-xs font-mono uppercase tracking-wider mb-3" style={{ color: item.color === 'emerald' ? '#34d399' : item.color === 'amber' ? '#f59e0b' : '#ef4444' }}>{item.status}</p>
                    <p className="text-muted-foreground text-xs leading-relaxed">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </NobelSection>
          </div>
        </section>

        <AnimatedDivider />

        {/* ══════════════════════════════════════════════════════
            CONCLUSÃO
        ══════════════════════════════════════════════════════ */}
        <section className="relative z-10 py-20 md:py-32">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <NobelSection>
              <p className="pre-title text-primary/70">Conclusão</p>
              <h2 className="text-3xl md:text-5xl font-black mb-8 font-display">
                Faça você mesmo. De verdade.
              </h2>
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-6">
                Bitcoin permite riqueza protegida por <strong className="text-foreground">matemática</strong> em vez de instituições. Construir seu próprio dispositivo de assinatura representa o nível mais profundo de soberania financeira — você não confia em nenhum fabricante, nenhum intermediário, nenhuma entidade.
              </p>
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-6">
                Mas "faça você mesmo" significa exatamente isso. Não é comprar um kit de um amador e chamar de DIY. É você, pessoalmente, comprando componentes genéricos de fornecedores que vendem para uso geral. É você verificando a assinatura do firmware. É você soldando os pinos. É você gerando entropia com seus próprios dados.
              </p>
              <p className="text-foreground text-xl md:text-2xl font-black mb-12 font-display">
                Sua seed, seu dispositivo, suas regras. <span className="text-primary">Sem exceções.</span>
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/autocustodia" className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-primary/30 text-primary hover:bg-primary/10 transition-all text-sm font-semibold">
                  <ArrowLeft className="w-4 h-4" /> Voltar à Autocustódia
                </Link>
                <Link to="/mobilidade-de-chaves" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary/10 border border-primary/30 text-primary hover:bg-primary/20 transition-all text-sm font-semibold">
                  Mobilidade de Chaves <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </NobelSection>
          </div>
        </section>

        {/* ══ FAQ ══ */}
        <section className="relative z-10 py-20 md:py-32 border-t border-border/10">
          <div className="max-w-3xl mx-auto px-6">
            <NobelSection>
              <p className="pre-title text-primary/70 text-center">Perguntas frequentes</p>
              <h2 className="text-2xl md:text-4xl font-black mb-12 text-center font-display">
                FAQ — Hardware Wallets DIY
              </h2>
              <div className="space-y-6">
                {(faqSchema.mainEntity as Array<{name: string; acceptedAnswer: {text: string}}>).map((faq, i) => (
                  <motion.div
                    key={i}
                    initial="hidden" whileInView="visible" viewport={{ once: true }}
                    variants={fadeUp} custom={i}
                    className="p-6 rounded-xl border border-border/20"
                    style={{ background: 'hsl(var(--gold) / 0.03)' }}
                  >
                    <h4 className="font-bold text-foreground text-sm mb-3">{faq.name}</h4>
                    <p className="text-muted-foreground text-xs leading-relaxed">{faq.acceptedAnswer.text}</p>
                  </motion.div>
                ))}
              </div>
            </NobelSection>
          </div>
        </section>

        <div className="h-24" />
      </div>
    </>
  );
};

/* ── Progress Bar ── */
const ProgressBar = () => {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] z-[60] origin-left"
      style={{ scaleX: scrollYProgress, background: 'linear-gradient(to right, hsl(var(--gold)), hsl(var(--amber)))' }}
    />
  );
};

export default HardwareWalletDiy;
