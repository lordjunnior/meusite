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
  XCircle, ShieldOff, Search, Globe, Zap, Target, Bug, Store,
  Smartphone, Download, RefreshCw, BookOpen, ExternalLink, Key,
  ScanLine, FileKey, Hash, Binary, RotateCcw, Unlock, ShieldAlert
} from 'lucide-react';
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from '@/components/ui/accordion';

import CinematicHero from '@/components/CinematicHero';
import ScrollToTop from '@/components/ScrollToTop';
import FooterSection from '@/components/FooterSection';

import imgDispositivo from '@/assets/krux-dispositivo-airgap.webp';
import imgSeedBackup from '@/assets/krux-seed-backup.webp';
import imgBluewallet from '@/assets/krux-bluewallet-observacao.webp';
import imgPassphrase from '@/assets/krux-passphrase-seguranca.webp';
import imgQrcode from '@/assets/krux-qrcode-airgap.webp';
import imgAssinatura from '@/assets/krux-assinatura-transacao.webp';
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
        <img src={src} alt={alt} className="w-full h-56 md:h-[420px] object-cover transition-transform duration-[1.5s] group-hover:scale-[1.03]" style={{ filter: 'brightness(0.7) saturate(0.85)' }} loading="lazy" width={1280} height={720} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, transparent 20%, rgba(5,8,8,0.7) 70%, rgba(5,8,8,0.95) 100%)' }} />
        <div className="absolute bottom-5 left-6 right-6 flex items-end justify-between">
          <p className="text-muted-foreground text-[11px] font-mono uppercase tracking-[0.2em] leading-relaxed max-w-lg">{caption}</p>
          <div className="hidden md:block w-12 h-px bg-gradient-to-r from-primary/40 to-transparent" />
        </div>
      </motion.div>
    </div>
  </section>
);

/* ── Animated Divider ── */
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

/* ── Progress Bar ── */
const ProgressBar = () => {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] z-[9999] origin-left"
      style={{
        scaleX: scrollYProgress,
        background: 'linear-gradient(90deg, hsl(var(--primary)), hsl(var(--gold)), hsl(var(--primary)))',
      }}
    />
  );
};

/* ══════════════════════════════════════════════════════════════
   DATA
   ══════════════════════════════════════════════════════════════ */

const CONCEITOS_CHAVE = [
  {
    icon: WifiOff,
    title: 'Air-Gapped (Isolado da Internet)',
    desc: 'A Krux jamais se conecta à internet, ao seu PC ou a qualquer rede. A comunicação acontece exclusivamente via QR code — a câmera do dispositivo lê códigos e a tela exibe códigos. Nenhum dado sai por fio, WiFi, Bluetooth ou USB após a instalação inicial do firmware.',
    accent: 'hsl(var(--primary))',
  },
  {
    icon: RotateCcw,
    title: 'Amnésico (Stateless)',
    desc: 'Quando você desliga a Krux, tudo desaparece. Não há memória persistente guardando sua seed ou passphrase. Cada sessão começa do zero: você carrega sua seed, usa, desliga — e o dispositivo esquece tudo. Se alguém confiscar o dispositivo desligado, encontra literalmente zero informação sobre suas chaves.',
    accent: '#38bdf8',
  },
  {
    icon: Key,
    title: 'Passphrase BIP-39 (25ª Palavra)',
    desc: 'Uma senha adicional que, combinada com suas 12 ou 24 palavras, gera uma carteira completamente diferente. A mesma seed com passphrases diferentes produz carteiras diferentes, cada uma com seu próprio saldo e endereços. Sem a passphrase correta, é impossível acessar os fundos — mesmo tendo todas as seed words.',
    accent: '#34d399',
  },
  {
    icon: Eye,
    title: 'Watch-Only (Carteira de Observação)',
    desc: 'A BlueWallet no seu celular recebe apenas a chave pública estendida (XPUB) — nunca a chave privada. Você consegue ver saldos, histórico de transações e gerar endereços de recebimento. Mas para gastar, precisa assinar na Krux. Se roubarem seu celular, veem o saldo, mas não movem um satoshi.',
    accent: 'hsl(var(--gold))',
  },
];

const PASSOS_SETUP_KRUX = [
  {
    num: '01',
    title: 'Compre o Dispositivo K210',
    desc: 'Adquira um Yahboom MV (recomendado) ou Maix Amigo no AliExpress, Amazon ou loja Yahboom. Busque "K210 Yahboom" ou "Yahboom MV" — o vendedor fabrica para projetos genéricos de IA e reconhecimento de imagem. Ele não sabe, não precisa saber e não vai saber que você usará para Bitcoin.',
    detail: 'Frete grátis para o Brasil, parcelamento disponível, entrega em 2-3 semanas. Se perguntarem, é para um "projetinho de reconhecimento facial caseiro". A negação plausível é absoluta.',
    icon: Package,
    color: 'primary',
  },
  {
    num: '02',
    title: 'Instale o Firmware Krux',
    desc: 'Baixe o Krux Installer do repositório oficial selfcustody/krux-installer no GitHub. Disponível para Windows, macOS e Linux. Conecte o dispositivo via USB — esta será a única vez que ele toca um computador.',
    detail: 'Verifique sempre a assinatura GPG do release antes de instalar. Os desenvolvedores QualquerDev e Joãozinho assinam cada versão. Após instalar o firmware, desconecte o USB para sempre.',
    icon: Download,
    color: 'chart-green',
    links: [
      { label: 'Krux Installer (GitHub)', url: 'https://github.com/selfcustody/krux-installer/releases' },
      { label: 'Documentação Oficial', url: 'https://selfcustody.github.io/krux/' },
    ],
  },
  {
    num: '03',
    title: 'Configure o Dispositivo',
    desc: 'Na primeira inicialização, a Krux apresenta opções de configuração: idioma (Português disponível), rede (Mainnet para Bitcoin real, Testnet para testes), política de script (Native Segwit recomendado — mais eficiente em taxas) e tipo de conta.',
    detail: 'Selecione: Idioma → Português | Rede → Mainnet | Tipo de Script → Native Segwit (bc1...) | Conta → Primeira conta. Estas configurações definem como sua carteira opera e quais endereços ela gera.',
    icon: Wrench,
    color: 'gold',
  },
  {
    num: '04',
    title: 'Gere Sua Seed com Entropia Forte',
    desc: 'A Krux oferece múltiplos métodos para gerar entropia verdadeira: câmera do dispositivo (captura ruído visual), dados físicos (dice rolls) ou gerador interno. Para 12 palavras, selecione "Novo mnemônico" → "12 palavras" → método de entropia preferido.',
    detail: 'A câmera é o método mais prático: ela captura ruído visual real do ambiente. Dice rolls são matematicamente verificáveis. Nunca use geradores online. Sua entropia determina a segurança de toda a sua vida financeira soberana.',
    icon: Binary,
    color: 'primary',
  },
  {
    num: '05',
    title: 'Faça Backup da Seed — SeedQR',
    desc: 'A Krux exibe suas 12 (ou 24) palavras na tela. Anote cada uma em ordem. Depois, a Krux oferece gerar um SeedQR — um QR code que codifica sua seed de forma compacta. Você pode imprimir ou gravar em metal este QR code como backup secundário.',
    detail: 'O SeedQR é exclusivo da Krux: você escaneia o QR code na próxima vez em vez de digitar 12 palavras. Mais rápido, sem erros de digitação. Guarde o papel/metal em local seguro, separado da passphrase. Quem tem o QR tem as palavras.',
    icon: QrCode,
    color: 'chart-green',
  },
  {
    num: '06',
    title: 'Verifique o Backup ANTES de Depositar',
    desc: 'Reinicie a Krux. Carregue o mnemônico pelo SeedQR ou digitando as palavras. Confira o fingerprint — deve ser idêntico ao que você anotou na criação. Só deposite Bitcoin após confirmar que consegue recuperar a carteira com sucesso.',
    detail: 'O fingerprint é o identificador único da sua carteira (ex: 19C0 34E2). Se bater, sua seed está correta. Se não bater, você errou algo. Repita o processo. Nunca deposite fundos sem ter certeza absoluta de que o backup funciona.',
    icon: ShieldCheck,
    color: 'gold',
  },
];

const PASSOS_PASSPHRASE = [
  {
    num: '01',
    title: 'Carregue Sua Seed na Krux',
    desc: 'Ligue o dispositivo. Selecione "Carregar mnemônico" → Câmera/QR code ou digite manualmente. Confirme o fingerprint da seed base (sem passphrase). Este é o ponto de partida.',
    icon: ScanLine,
  },
  {
    num: '02',
    title: 'Adicione a Passphrase BIP-39',
    desc: 'Antes de carregar a carteira, selecione "Digitar senha BIP-39". A Krux exibe um teclado na tela. Digite sua passphrase. Não precisa de caracteres especiais — o mais importante é que seja longa (40+ caracteres), pessoal, única e absurda o suficiente para você lembrar.',
    icon: KeyRound,
  },
  {
    num: '03',
    title: 'Anote o Novo Fingerprint',
    desc: 'Após confirmar a passphrase, a Krux exibe um novo fingerprint — diferente do fingerprint da seed base. Este é o identificador da sua carteira com passphrase. Anote: é a ÚNICA forma de confirmar que você digitou a passphrase correta nas próximas vezes.',
    icon: Fingerprint,
  },
  {
    num: '04',
    title: 'Entenda: Qualquer Passphrase é "Correta"',
    desc: 'A Krux aceita qualquer passphrase sem dar erro. Se você digitar "estaéumasenhadourso" ou "abcdef123", ambas geram carteiras válidas — mas com fundos diferentes. Se errar um único caractere, cai em outra carteira vazia. O fingerprint é seu único verificador.',
    icon: AlertTriangle,
  },
];

const PASSOS_BLUEWALLET = [
  {
    num: '01',
    title: 'Instale a BlueWallet',
    desc: 'Baixe a BlueWallet (v7.2.6 ou superior) na App Store ou Google Play. É open source, gratuita, sem registro, sem e-mail, sem KYC. Configure: Idioma → Português, Moeda → BRL, Biometria → Ativada, Analítica → Desativada, Captura de Tela → Desativada.',
    icon: Smartphone,
  },
  {
    num: '02',
    title: 'Exporte a XPUB da Krux',
    desc: 'Na Krux, com a carteira carregada (seed + passphrase + fingerprint confirmado), selecione "Chave Pública Estendida" → "XPUB em formato QR code". A Krux exibe na tela um QR code contendo APENAS a chave pública — nunca a chave privada.',
    icon: FileKey,
  },
  {
    num: '03',
    title: 'Importe na BlueWallet',
    desc: 'Na BlueWallet, toque "Adicionar carteira" → "Importar carteira" → "Escanear ou importar arquivo". Escaneie o QR code da Krux. A BlueWallet detecta automaticamente que é uma XPUB e cria uma carteira watch-only. Ela avisa: "Cuidado, só observação — você não pode gastar".',
    icon: ScanLine,
  },
  {
    num: '04',
    title: 'Monitore Sem Expor Chaves',
    desc: 'Pronto. Sua BlueWallet mostra saldos, transações e gera endereços de recebimento — tudo sem jamais tocar na chave privada. A chave fica isolada na Krux (desligada e amnésica). Para gastar, você precisará ligar a Krux, carregar a seed + passphrase e assinar via QR code.',
    icon: Eye,
  },
];

const PASSOS_ASSINAR = [
  {
    num: '01',
    title: 'Crie a Transação na BlueWallet',
    desc: 'Na BlueWallet, vá na carteira watch-only → "Enviar" → preencha endereço de destino e valor. A BlueWallet vai gerar uma PSBT (Partially Signed Bitcoin Transaction) — uma transação ainda não assinada. Ela exibe o PSBT como QR code animado na tela do celular.',
    icon: Smartphone,
  },
  {
    num: '02',
    title: 'Ligue a Krux e Carregue a Carteira',
    desc: 'Ligue o dispositivo. Carregue o mnemônico (SeedQR ou manual). Adicione a passphrase. Confirme o fingerprint. Selecione "Assinar" → "PSBT" → "Câmera/QR code".',
    icon: Key,
  },
  {
    num: '03',
    title: 'Escaneie e Assine na Krux',
    desc: 'A Krux escaneie o QR code animado da BlueWallet com sua câmera. Revise os detalhes na tela do dispositivo: endereço de destino, valor, taxas. Se tudo estiver correto, confirme. A Krux assina a transação offline e exibe um novo QR code com a transação assinada.',
    icon: ShieldCheck,
  },
  {
    num: '04',
    title: 'Transmita pela BlueWallet',
    desc: 'Volte à BlueWallet → "Escanear transação assinada" → escaneie o QR code que a Krux está exibindo. A BlueWallet recebe a transação assinada e transmite para a rede Bitcoin. Pronto — a transação foi assinada offline e transmitida online sem que a chave privada tocasse a internet em nenhum momento.',
    icon: Globe,
  },
];

const REGRAS_PASSPHRASE = [
  { icon: CheckCircle2, text: 'Mínimo 27 caracteres — ideal 40+ caracteres para força máxima', color: 'text-green-400' },
  { icon: CheckCircle2, text: 'Pode ser tudo minúsculo — não precisa de caracteres especiais ou números', color: 'text-green-400' },
  { icon: CheckCircle2, text: 'Deve ser pessoal, única e absurda — algo que só você consegue lembrar', color: 'text-green-400' },
  { icon: CheckCircle2, text: 'NÃO pode ter acentuação — apenas caracteres ASCII', color: 'text-green-400' },
  { icon: XCircle, text: 'NUNCA use passagens de livros, Bíblia, músicas ou frases conhecidas', color: 'text-destructive' },
  { icon: XCircle, text: 'NUNCA armazene a passphrase junto com a seed — separação é a regra de ouro', color: 'text-destructive' },
  { icon: XCircle, text: 'NUNCA armazene digitalmente — nem em notas do celular, nem em cloud, nem em e-mail', color: 'text-destructive' },
  { icon: AlertTriangle, text: 'Se esquecer a passphrase, perde o acesso aos fundos PARA SEMPRE — não existe "esqueci minha senha"', color: 'text-primary' },
];

const BACKUP_STRATEGY = [
  {
    title: 'Seed (12/24 palavras) + SeedQR',
    desc: 'Backup primário em papel/metal. Guarde em cofre, local seguro, resistente a fogo e água. O SeedQR pode ser gravado em placa de aço inox. Quem tem as palavras ou o QR tem acesso à carteira BASE (sem passphrase).',
    icon: Database,
    importance: 'Crítico',
  },
  {
    title: 'Passphrase (separada)',
    desc: 'NUNCA no mesmo local da seed. Pode ser memorizada (ideal) ou anotada em local separado. A passphrase é a segunda camada de defesa: mesmo que encontrem sua seed, sem a passphrase os fundos na carteira com passphrase estão inacessíveis.',
    icon: Lock,
    importance: 'Crítico',
  },
  {
    title: 'Fingerprints (seed base + com passphrase)',
    desc: 'Anote ambos os fingerprints. O fingerprint da seed base (ex: 19C0 34E2) e o fingerprint com passphrase (ex: 9B8A 0B3A). São a única forma de verificar se carregou a carteira correta. Sem eles, você não sabe se digitou a passphrase certa.',
    icon: Fingerprint,
    importance: 'Essencial',
  },
  {
    title: 'Carteira Isca (Honeypot)',
    desc: 'Sua seed sem passphrase gera uma carteira separada. Deixe um pequeno saldo nela (ex: R$50 em BTC). Se forçado a entregar a seed sob coerção, entregue as 12 palavras sem mencionar a passphrase. O agressor encontra o saldo da isca e acredita que é tudo.',
    icon: Target,
    importance: 'Estratégico',
  },
];

const FAQ_DATA = [
  {
    q: 'O que acontece se eu errar a passphrase?',
    a: 'A Krux não avisa que você errou. Ela simplesmente abre outra carteira — válida, mas vazia. O fingerprint será diferente do que você anotou. Por isso o fingerprint é crucial: ele é seu único verificador de que está na carteira correta. Se os fingerprints não batem, você digitou a passphrase errada.',
  },
  {
    q: 'Posso usar a mesma seed com múltiplas passphrases?',
    a: 'Sim. Cada passphrase diferente gera uma carteira independente com seu próprio saldo e endereços. Você pode ter: Carteira base (sem passphrase) → Isca com saldo pequeno. Carteira A (passphrase A) → Poupança principal. Carteira B (passphrase B) → Emergência. Todas derivam da mesma seed, mas são completamente isoladas entre si.',
  },
  {
    q: 'A BlueWallet pode ser hackeada e roubar meu Bitcoin?',
    a: 'Não. A BlueWallet no modo watch-only possui apenas a chave pública estendida (XPUB). Ela permite ver saldos e gerar endereços, mas não pode gastar. Para mover Bitcoin, é necessário assinar na Krux — que está offline, desligada e amnésica. Mesmo que comprometam seu celular inteiro, não movem um satoshi.',
  },
  {
    q: 'Qual a diferença entre a Krux e uma Ledger/Trezor?',
    a: 'A Krux é open source, air-gapped (sem conexão USB para operar) e amnésica (não armazena seeds). Ledger e Trezor armazenam sua seed no chip, conectam via USB ao PC e você precisa confiar no fabricante. Com a Krux, o dispositivo é genérico (Yahboom MV) — o vendedor não sabe que é para Bitcoin. Com Ledger/Trezor, seu nome fica vinculado a um dispositivo cuja única função é proteger Bitcoin.',
  },
  {
    q: 'Preciso da Krux ligada para receber Bitcoin?',
    a: 'Não. Para receber, basta usar um endereço gerado pela BlueWallet (que tem a XPUB). Você só precisa ligar a Krux quando quiser GASTAR — para assinar transações. No dia a dia, a Krux fica desligada, guardada, amnésica. A BlueWallet cuida da parte online sozinha.',
  },
  {
    q: 'O QR code criptografado da Krux é seguro?',
    a: 'Sim. A Krux oferece a opção de criptografar o SeedQR com AES. O QR code gerado é inútil sem a chave de descriptografia. Um QR code criptografado da Krux ficou publicado online por 3 anos e ninguém conseguiu extrair os fundos — a criptografia funciona.',
  },
  {
    q: 'Quanto de Bitcoin posso proteger com este setup?',
    a: 'Este setup (Krux + Passphrase + BlueWallet) é adequado para single-sig com valores significativos. Para patrimônios maiores (acima de 1 BTC), considere multisig — onde você precisa de 2 ou 3 dispositivos para assinar. A Krux suporta multisig nativo, mas isso é um nível avançado além deste tutorial.',
  },
  {
    q: 'Posso usar outra carteira em vez da BlueWallet?',
    a: 'Sim. Qualquer carteira que suporte importação de XPUB funciona: Sparrow Wallet (desktop, mais avançada), Nunchuk (mobile, suporta multisig), Specter Desktop. A BlueWallet é recomendada para iniciantes pela simplicidade e por ser mobile. Para uso avançado no desktop, a Sparrow é imbatível.',
  },
];

/* ══════════════════════════════════════════════════════════════ */

const KruxPassphraseBluewallet = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Krux com Passphrase + BlueWallet: Setup Completo de Autocustódia Bitcoin Air-Gapped",
    "author": { "@type": "Person", "name": "Lord Junnior" },
    "publisher": { "@type": "Organization", "name": "Lord Junnior" },
    "datePublished": "2026-04-05",
    "description": "Tutorial completo: como usar Krux com Passphrase BIP-39 e BlueWallet como carteira de observação. Setup air-gapped, amnésico e soberano para proteger seu Bitcoin.",
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "Como configurar Krux com Passphrase e BlueWallet de observação",
    "description": "Guia passo a passo para criar uma carteira Bitcoin air-gapped com Krux, adicionar Passphrase BIP-39 e conectar a BlueWallet como carteira watch-only.",
    "step": [
      ...PASSOS_SETUP_KRUX.map((p, i) => ({
        "@type": "HowToStep",
        "position": i + 1,
        "name": p.title,
        "text": p.desc,
      })),
      ...PASSOS_PASSPHRASE.map((p, i) => ({
        "@type": "HowToStep",
        "position": PASSOS_SETUP_KRUX.length + i + 1,
        "name": p.title,
        "text": p.desc,
      })),
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": FAQ_DATA.map(f => ({
      "@type": "Question",
      "name": f.q,
      "acceptedAnswer": { "@type": "Answer", "text": f.a },
    })),
  };

  return (
    <>
      <Helmet>
        <title>Krux com Passphrase + BlueWallet | Tutorial Completo Autocustódia Air-Gapped</title>
        <meta name="description" content="Tutorial completo: Krux com Passphrase BIP-39 e BlueWallet como carteira de observação. Setup air-gapped, amnésico e soberano. Versão Krux 26.03.0 + BlueWallet v7.2.6." />
        <link rel="canonical" href="https://lordjunnior.com.br/autocustodia/krux-passphrase-bluewallet" />
        <meta property="og:title" content="Krux + Passphrase + BlueWallet | Autocustódia Bitcoin Air-Gapped" />
        <meta property="og:description" content="Setup completo de carteira Bitcoin fria com Krux air-gapped, Passphrase BIP-39 e BlueWallet de observação. Guia definitivo." />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(howToSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      <ScrollToTop />
      <ProgressBar />

      <div className="min-h-screen text-foreground selection:bg-primary/30" style={{ background: '#050808' }}>

        {/* ═══ VFX LAYER ═══ */}
        <div className="fixed inset-0 pointer-events-none z-[1]">
          <div className="absolute inset-0 opacity-[0.035]" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.5'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat',
            mixBlendMode: 'overlay',
          }} />
        </div>

        {/* ═══ HERO ═══ */}
        <CinematicHero
          title="Krux + Passphrase + BlueWallet"
          subtitle="Setup completo de autocustódia air-gapped: carteira fria amnésica com senha BIP-39 e observação mobile. Versão Krux 26.03.0 | BlueWallet v7.2.6"
          image={imgDispositivo}
          phase="Autocustódia Avançada"
          icon={Shield}
          backLink="/autocustodia/hardware-wallet-diy-bitcoin"
          backLabel="Hardware Wallet DIY"
        />




        {/* ═══ INTRO: O QUE VOCÊ VAI APRENDER ═══ */}
        <NobelSection className="relative z-10 py-16 md:py-24" id="intro">
          <div className="max-w-7xl mx-auto px-4 md:px-10">
            <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
              <div>
                <span className="inline-block text-primary font-mono text-xs tracking-[0.3em] uppercase mb-4">Protocolo de Autocustódia Soberana</span>
                <h2 className="font-['Bebas_Neue',sans-serif] text-3xl md:text-5xl leading-[1.3] text-foreground mb-6">
                  Sua chave privada nunca toca a internet.<br />
                  <span className="text-primary">Nunca.</span>
                </h2>
                <p className="text-muted-foreground leading-8 text-base mb-6">
                  Este tutorial documenta um setup onde a <strong className="text-foreground">Krux</strong> opera como dispositivo de assinatura completamente isolado da internet (air-gapped), <strong className="text-foreground">amnésico</strong> (nenhum dado persiste após desligar) e protegido por uma <strong className="text-foreground">Passphrase BIP-39</strong> que funciona como 25ª palavra da sua seed.
                </p>
                <p className="text-muted-foreground leading-8 text-base mb-6">
                  A <strong className="text-foreground">BlueWallet</strong> no seu celular atua exclusivamente como carteira de observação (watch-only) — ela vê saldos e gera endereços, mas <strong className="text-foreground">não pode gastar um satoshi</strong>. Para assinar transações, você precisa da Krux offline, do SeedQR e da sua passphrase na memória.
                </p>
                <p className="text-muted-foreground leading-8 text-base">
                  Este é o padrão mínimo de segurança que qualquer pessoa com Bitcoin significativo deveria implementar. Se você está guardando R$1.000 ou R$1.000.000 em Bitcoin, o setup é o mesmo — muda apenas a complexidade do backup.
                </p>
              </div>
              <div className="relative">
                <img src={imgQrcode} alt="Comunicação air-gapped via QR code entre Krux e smartphone" className="rounded-2xl border border-border/20 w-full object-cover" width={1280} height={720} loading="lazy" decoding="async" />
                <div className="absolute inset-0 rounded-2xl" style={{ background: 'linear-gradient(180deg, transparent 50%, rgba(5,8,8,0.6) 100%)' }} />
                <div className="absolute bottom-4 left-5 right-5">
                  <p className="text-muted-foreground text-[10px] font-mono uppercase tracking-[0.2em]">QR code: única ponte entre a Krux e o mundo exterior</p>
                </div>
              </div>
            </div>
          </div>
        </NobelSection>

        <AnimatedDivider />

        {/* ═══ CONCEITOS FUNDAMENTAIS ═══ */}
        <NobelSection className="relative z-10 py-16 md:py-24" id="conceitos">
          <div className="max-w-7xl mx-auto px-4 md:px-10">
            <span className="inline-block text-primary font-mono text-xs tracking-[0.3em] uppercase mb-4">Fundamentos</span>
            <h2 className="font-['Bebas_Neue',sans-serif] text-3xl md:text-5xl leading-[1.3] text-foreground mb-12">
              4 Conceitos que você precisa dominar antes de começar
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {CONCEITOS_CHAVE.map((c, i) => (
                <motion.div
                  key={c.title}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  className="p-6 rounded-2xl border border-border/10 group hover:border-border/30 transition-colors"
                  style={{ background: 'rgba(255,255,255,0.02)' }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${c.accent}15` }}>
                      <c.icon className="w-5 h-5" style={{ color: c.accent }} />
                    </div>
                    <h3 className="font-bold text-foreground text-sm">{c.title}</h3>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">{c.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </NobelSection>

        <CinematicBreak src={imgDispositivo} alt="Dispositivo Krux K210 com QR code na tela — air-gapped e amnésico" caption="O dispositivo que esquece tudo. Nenhum dado persiste. Nenhuma conexão. Apenas você, sua seed e a matemática." />

        {/* ═══ SETUP KRUX — 6 PASSOS ═══ */}
        <NobelSection className="relative z-10 py-16 md:py-24" id="setup-krux">
          <div className="max-w-7xl mx-auto px-4 md:px-10">
            <span className="inline-block text-primary font-mono text-xs tracking-[0.3em] uppercase mb-4">Parte 1 — Dispositivo Offline</span>
            <h2 className="font-['Bebas_Neue',sans-serif] text-3xl md:text-5xl leading-[1.3] text-foreground mb-4">
              Configurando a Krux do Zero
            </h2>
            <p className="text-muted-foreground leading-8 text-base max-w-3xl mb-12">
              Da compra do dispositivo genérico à geração da sua seed com entropia forte. Cada passo foi projetado para garantir que nenhum terceiro — vendedor, fabricante, correios, governo — saiba que você usa o dispositivo para Bitcoin.
            </p>

            <div className="space-y-8">
              {PASSOS_SETUP_KRUX.map((p, i) => (
                <motion.div
                  key={p.num}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  className="grid md:grid-cols-[80px_1fr] gap-6"
                >
                  <div className="flex md:flex-col items-center md:items-start gap-3">
                    <span className={`text-3xl font-['Bebas_Neue',sans-serif] text-${p.color}`}>{p.num}</span>
                    <p.icon className={`w-6 h-6 text-${p.color}`} />
                  </div>
                  <div className="p-6 rounded-2xl border border-border/10" style={{ background: 'rgba(255,255,255,0.02)' }}>
                    <h3 className="font-bold text-foreground text-lg mb-3">{p.title}</h3>
                    <p className="text-muted-foreground leading-8 text-sm mb-4">{p.desc}</p>
                    <p className="text-muted-foreground/70 leading-7 text-xs border-t border-border/10 pt-4">{p.detail}</p>
                    {p.links && (
                      <div className="flex flex-wrap gap-3 mt-4">
                        {p.links.map(l => (
                          <a key={l.url} href={l.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs text-primary hover:text-primary/80 transition-colors font-mono">
                            <ExternalLink className="w-3 h-3" /> {l.label}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </NobelSection>

        <CinematicBreak src={imgSeedBackup} alt="Backup de seed words em papel ao lado de dispositivo hardware wallet" caption="Backup offline em papel. Sem cloud, sem app de notas, sem drive compartilhado. Analógico, resiliente, soberano." />

        {/* ═══ PASSPHRASE — PROTOCOLO ═══ */}
        <NobelSection className="relative z-10 py-16 md:py-24" id="passphrase">
          <div className="max-w-7xl mx-auto px-4 md:px-10">
            <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-start">
              <div>
                <span className="inline-block text-primary font-mono text-xs tracking-[0.3em] uppercase mb-4">Parte 2 — Camada de Proteção</span>
                <h2 className="font-['Bebas_Neue',sans-serif] text-3xl md:text-5xl leading-[1.3] text-foreground mb-6">
                  Passphrase BIP-39:<br />
                  A 25ª Palavra que Ninguém Vê
                </h2>
                <p className="text-muted-foreground leading-8 text-base mb-8">
                  A passphrase transforma suas 12 palavras em uma carteira completamente diferente. É a sua segunda linha de defesa: mesmo que alguém encontre sua seed, sem a passphrase os fundos são inacessíveis. Sob coerção, entregue a seed base — o agressor encontra a carteira isca. A passphrase fica na sua cabeça.
                </p>

                <div className="space-y-6">
                  {PASSOS_PASSPHRASE.map((p, i) => (
                    <motion.div
                      key={p.num}
                      custom={i}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      variants={fadeUp}
                      className="flex gap-4"
                    >
                      <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                        <p.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-bold text-foreground text-sm mb-1">{p.num}. {p.title}</h4>
                        <p className="text-muted-foreground text-sm leading-relaxed">{p.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <img src={imgPassphrase} alt="Conceito de passphrase — cadeado e letras representando segurança de senha" className="rounded-2xl border border-border/20 w-full object-cover" loading="lazy" width={1280} height={720} />

                <AlertBox icon={AlertTriangle} title="Regras de Ouro da Passphrase" variant="warning">
                  <div className="space-y-3 mt-3">
                    {REGRAS_PASSPHRASE.map((r, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <r.icon className={`w-4 h-4 mt-0.5 flex-shrink-0 ${r.color}`} />
                        <span className="text-xs leading-relaxed">{r.text}</span>
                      </div>
                    ))}
                  </div>
                </AlertBox>

                <AlertBox icon={Target} title="Estratégia de Negação Plausível" variant="info">
                  <p className="text-xs leading-relaxed mt-2">
                    <strong>Carteira isca:</strong> deixe R$50-100 em BTC na carteira base (sem passphrase). Se interrogado ou coagido, entregue apenas as 12 palavras. O agressor encontra o saldo da isca e acredita que é tudo. Seus fundos reais estão protegidos pela passphrase que só existe na sua memória.
                  </p>
                </AlertBox>
              </div>
            </div>
          </div>
        </NobelSection>

        <AnimatedDivider />

        {/* ═══ BLUEWALLET — OBSERVAÇÃO ═══ */}
        <NobelSection className="relative z-10 py-16 md:py-24" id="bluewallet">
          <div className="max-w-7xl mx-auto px-4 md:px-10">
            <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
              <div className="order-2 md:order-1">
                <img src={imgBluewallet} alt="BlueWallet como carteira de observação watch-only ao lado de dispositivo Krux" className="rounded-2xl border border-border/20 w-full object-cover" loading="lazy" width={1280} height={720} />
                <div className="mt-4 p-4 rounded-xl border border-border/10" style={{ background: 'rgba(255,255,255,0.02)' }}>
                  <p className="text-muted-foreground text-xs leading-relaxed">
                    <strong className="text-foreground">Configurações recomendadas da BlueWallet:</strong> Idioma → Português BR | Moeda → BRL | Captura de tela → Desativada | Analítica → Desativada | Biometria/PIN → Ativada | Saldo Total → Desativado (se tem múltiplas carteiras)
                  </p>
                </div>
              </div>
              <div className="order-1 md:order-2">
                <span className="inline-block text-primary font-mono text-xs tracking-[0.3em] uppercase mb-4">Parte 3 — Observação Online</span>
                <h2 className="font-['Bebas_Neue',sans-serif] text-3xl md:text-5xl leading-[1.3] text-foreground mb-6">
                  BlueWallet: Olhos Sem Mãos
                </h2>
                <p className="text-muted-foreground leading-8 text-base mb-8">
                  A BlueWallet opera como uma janela de vidro blindado: você vê tudo lá dentro, mas não consegue tocar. Ela recebe apenas a XPUB (chave pública estendida) da Krux — nunca a chave privada. Mesmo que seu celular seja roubado, clonado ou confiscado, o atacante vê saldos mas não move fundos.
                </p>

                <div className="space-y-5">
                  {PASSOS_BLUEWALLET.map((p, i) => (
                    <motion.div
                      key={p.num}
                      custom={i}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      variants={fadeUp}
                      className="flex gap-4"
                    >
                      <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-mono text-xs font-bold">{p.num}</span>
                      <div>
                        <h4 className="font-bold text-foreground text-sm mb-1">{p.title}</h4>
                        <p className="text-muted-foreground text-sm leading-relaxed">{p.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </NobelSection>

        <CinematicBreak src={imgAssinatura} alt="Processo de assinatura de transação Bitcoin em dispositivo hardware wallet" caption="A chave privada existe apenas neste instante. Depois, o dispositivo esquece. A transação assinada viaja por QR code." />

        {/* ═══ ASSINATURA DE TRANSAÇÃO ═══ */}
        <NobelSection className="relative z-10 py-16 md:py-24" id="assinatura">
          <div className="max-w-7xl mx-auto px-4 md:px-10">
            <span className="inline-block text-primary font-mono text-xs tracking-[0.3em] uppercase mb-4">Parte 4 — Gastando Bitcoin</span>
            <h2 className="font-['Bebas_Neue',sans-serif] text-3xl md:text-5xl leading-[1.3] text-foreground mb-4">
              Como Assinar Transações: O Fluxo Completo
            </h2>
            <p className="text-muted-foreground leading-8 text-base max-w-3xl mb-12">
              A chave privada toca o dispositivo apenas no momento da assinatura. A transação viaja entre Krux e BlueWallet exclusivamente via QR code. Em nenhum momento a chave privada é transmitida por cabo, WiFi, Bluetooth ou qualquer rede. Este é o fluxo air-gapped em ação.
            </p>

            {/* Visual flow */}
            <div className="grid md:grid-cols-4 gap-4 mb-12">
              {PASSOS_ASSINAR.map((p, i) => (
                <motion.div
                  key={p.num}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  className="relative p-5 rounded-2xl border border-border/10 text-center"
                  style={{ background: 'rgba(255,255,255,0.02)' }}
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <p.icon className="w-6 h-6 text-primary" />
                  </div>
                  <span className="text-primary font-mono text-xs font-bold">{p.num}</span>
                  <h4 className="font-bold text-foreground text-sm mt-2 mb-2">{p.title}</h4>
                  <p className="text-muted-foreground text-xs leading-relaxed">{p.desc}</p>
                  {i < 3 && (
                    <div className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 z-10">
                      <ArrowRight className="w-5 h-5 text-primary/30" />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>

            <AlertBox icon={ShieldAlert} title="Atenção: Verifique SEMPRE o Endereço de Destino na Krux" variant="danger">
              <p className="text-xs leading-relaxed mt-2">
                Nunca confie apenas na BlueWallet para validar o endereço de destino. Malwares de clipboard podem alterar endereços copiados no celular. A Krux exibe o endereço de destino na sua tela durante a assinatura — <strong>confira os primeiros e últimos 8 caracteres visualmente</strong>. Se não baterem, aborte a transação imediatamente.
              </p>
            </AlertBox>
          </div>
        </NobelSection>

        <AnimatedDivider />

        {/* ═══ ESTRATÉGIA DE BACKUP ═══ */}
        <NobelSection className="relative z-10 py-16 md:py-24" id="backup">
          <div className="max-w-7xl mx-auto px-4 md:px-10">
            <span className="inline-block text-primary font-mono text-xs tracking-[0.3em] uppercase mb-4">Parte 5 — Resiliência</span>
            <h2 className="font-['Bebas_Neue',sans-serif] text-3xl md:text-5xl leading-[1.3] text-foreground mb-4">
              Estratégia de Backup Multicamada
            </h2>
            <p className="text-muted-foreground leading-8 text-base max-w-3xl mb-12">
              Sua segurança é tão forte quanto o seu backup mais fraco. Aqui está a arquitetura de backup recomendada para o setup Krux + Passphrase — projetada para sobreviver a incêndios, inundações, confisco e coerção.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              {BACKUP_STRATEGY.map((b, i) => (
                <motion.div
                  key={b.title}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  className="p-6 rounded-2xl border border-border/10"
                  style={{ background: 'rgba(255,255,255,0.02)' }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <b.icon className="w-5 h-5 text-primary" />
                      <h3 className="font-bold text-foreground text-sm">{b.title}</h3>
                    </div>
                    <span className={`text-[10px] font-mono uppercase tracking-wider px-2 py-1 rounded ${
                      b.importance === 'Crítico' ? 'bg-destructive/10 text-destructive' :
                      b.importance === 'Essencial' ? 'bg-primary/10 text-primary' :
                      'bg-sky-500/10 text-sky-400'
                    }`}>{b.importance}</span>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">{b.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </NobelSection>

        <AnimatedDivider />

        {/* ═══ COMPARAÇÃO: SETUP CUSTODIAL vs SOBERANO ═══ */}
        <NobelSection className="relative z-10 py-16 md:py-24" id="comparacao">
          <div className="max-w-7xl mx-auto px-4 md:px-10">
            <span className="inline-block text-primary font-mono text-xs tracking-[0.3em] uppercase mb-4">Análise Comparativa</span>
            <h2 className="font-['Bebas_Neue',sans-serif] text-3xl md:text-5xl leading-[1.3] text-foreground mb-12">
              Exchange vs. Krux + BlueWallet
            </h2>

            <div className="overflow-x-auto rounded-2xl border border-border/10">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border/10" style={{ background: 'rgba(255,255,255,0.03)' }}>
                    <th className="text-left p-4 text-muted-foreground font-mono text-xs uppercase tracking-wider">Critério</th>
                    <th className="text-center p-4 text-destructive font-mono text-xs uppercase tracking-wider">Exchange (Custodial)</th>
                    <th className="text-center p-4 text-primary font-mono text-xs uppercase tracking-wider">Krux + BlueWallet</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/5">
                  {[
                    ['Quem controla as chaves?', 'A exchange', 'Você — e somente você'],
                    ['Pode ser confiscado?', 'Sim — ordem judicial basta', 'Não — a seed está no papel, a passphrase na sua cabeça'],
                    ['Risco de hack?', 'Alto — alvo de milhões em ataques', 'Zero — dispositivo offline e amnésico'],
                    ['Privacidade', 'Zero — KYC total, CPF vinculado', 'Total — dispositivo genérico, sem registro'],
                    ['Requer internet?', 'Sim — para tudo', 'Só para transmitir (BlueWallet). Assinatura é offline'],
                    ['Pode ser bloqueado?', 'Sim — compliance, suspeita de fraude, ordem judicial', 'Não — ninguém pode bloquear suas chaves'],
                    ['Custo', 'Taxas de trading, saque, spread', 'Dispositivo K210 (~R$150) + app gratuito'],
                    ['Negação plausível', 'Impossível — seus dados estão na base', 'Sim — carteira isca + passphrase oculta'],
                  ].map(([criterio, exchange, krux], i) => (
                    <tr key={i} className="hover:bg-white/[0.01] transition-colors">
                      <td className="p-4 text-foreground font-medium text-xs">{criterio}</td>
                      <td className="p-4 text-center text-muted-foreground text-xs">{exchange}</td>
                      <td className="p-4 text-center text-foreground text-xs">{krux}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </NobelSection>

        <CinematicBreak src={imgBluewallet} alt="BlueWallet watch-only com dispositivo hardware ao lado — monitoramento seguro" caption="A BlueWallet vê tudo, mas não toca nada. Olhos sem mãos. Monitoramento soberano." />

        {/* ═══ LINKS OFICIAIS ═══ */}
        <NobelSection className="relative z-10 py-16 md:py-24" id="recursos">
          <div className="max-w-7xl mx-auto px-4 md:px-10">
            <span className="inline-block text-primary font-mono text-xs tracking-[0.3em] uppercase mb-4">Recursos Oficiais</span>
            <h2 className="font-['Bebas_Neue',sans-serif] text-3xl md:text-5xl leading-[1.3] text-foreground mb-12">
              Downloads e Documentação
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  title: 'Krux — Firmware',
                  desc: 'Código-fonte, releases, verificação GPG e documentação completa do firmware para dispositivos K210.',
                  links: [
                    { label: 'Documentação', url: 'https://selfcustody.github.io/krux/' },
                    { label: 'Lista de Peças', url: 'https://selfcustody.github.io/krux/parts/' },
                    { label: 'GitHub Releases', url: 'https://github.com/selfcustody/krux/releases' },
                  ],
                  icon: Cpu,
                },
                {
                  title: 'Krux Installer',
                  desc: 'Instalador gráfico para Windows, macOS e Linux. Simplifica a gravação do firmware no dispositivo K210.',
                  links: [
                    { label: 'GitHub Releases', url: 'https://github.com/selfcustody/krux-installer/releases' },
                  ],
                  icon: Download,
                },
                {
                  title: 'BlueWallet',
                  desc: 'Carteira Bitcoin open source para iOS e Android. Suporta watch-only, PSBT, Lightning e múltiplas carteiras.',
                  links: [
                    { label: 'Site Oficial', url: 'https://bluewallet.io' },
                    { label: 'GitHub', url: 'https://github.com/BlueWallet/BlueWallet' },
                  ],
                  icon: Smartphone,
                },
              ].map((r, i) => (
                <motion.div
                  key={r.title}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  className="p-6 rounded-2xl border border-border/10"
                  style={{ background: 'rgba(255,255,255,0.02)' }}
                >
                  <r.icon className="w-8 h-8 text-primary mb-4" />
                  <h3 className="font-bold text-foreground mb-2">{r.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">{r.desc}</p>
                  <div className="space-y-2">
                    {r.links.map(l => (
                      <a key={l.url} href={l.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors text-xs font-mono">
                        <ExternalLink className="w-3 h-3" /> {l.label}
                      </a>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </NobelSection>

        <AnimatedDivider />

        {/* ═══ FAQ ═══ */}
        <NobelSection className="relative z-10 py-16 md:py-24" id="faq">
          <div className="max-w-7xl mx-auto px-4 md:px-10">
            <span className="inline-block text-primary font-mono text-xs tracking-[0.3em] uppercase mb-4">Perguntas Frequentes</span>
            <h2 className="font-['Bebas_Neue',sans-serif] text-3xl md:text-5xl leading-[1.3] text-foreground mb-12">
              Dúvidas que Todo Iniciante Tem
            </h2>

            <div className="max-w-4xl">
              <Accordion type="single" collapsible className="space-y-3">
                {FAQ_DATA.map((f, i) => (
                  <AccordionItem key={i} value={`faq-${i}`} className="border border-border/10 rounded-xl px-6 overflow-hidden" style={{ background: 'rgba(255,255,255,0.02)' }}>
                    <AccordionTrigger className="text-foreground text-sm font-medium hover:no-underline py-5">
                      {f.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground text-sm leading-relaxed pb-5">
                      {f.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </NobelSection>

        <AnimatedDivider />

        {/* ═══ CTA FINAL ═══ */}
        <NobelSection className="relative z-10 py-16 md:py-24" id="cta">
          <div className="max-w-7xl mx-auto px-4 md:px-10">
            <div className="relative rounded-3xl overflow-hidden p-8 md:p-16 text-center" style={{ background: 'linear-gradient(135deg, rgba(245,158,11,0.08), rgba(56,189,248,0.05))' }}>
              <div className="absolute inset-0 border border-primary/10 rounded-3xl" />
              <h2 className="font-['Bebas_Neue',sans-serif] text-3xl md:text-5xl leading-[1.3] text-foreground mb-6">
                Sua soberania financeira começa aqui.
              </h2>
              <p className="text-muted-foreground leading-8 text-base max-w-2xl mx-auto mb-10">
                Cada dia que seu Bitcoin fica em uma exchange é um dia que outra pessoa controla o seu patrimônio. A Krux custa menos que uma pizza. A BlueWallet é gratuita. A passphrase está na sua cabeça. O que falta é a decisão de começar.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/autocustodia/hardware-wallet-diy-bitcoin" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-bold text-sm hover:bg-primary/90 transition-colors">
                  <Shield className="w-4 h-4" /> Hardware Wallet DIY
                </Link>
                <Link to="/autocustodia" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-border/20 text-foreground font-bold text-sm hover:bg-white/5 transition-colors">
                  <Lock className="w-4 h-4" /> Hub de Autocustódia
                </Link>
                <Link to="/comprar-bitcoin-com-privacidade" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-border/20 text-foreground font-bold text-sm hover:bg-white/5 transition-colors">
                  <ShieldCheck className="w-4 h-4" /> Comprar BTC Anônimo
                </Link>
              </div>
            </div>
          </div>
        </NobelSection>

        {/* ═══ FOOTER ═══ */}
        <FooterSection />
      </div>
    </>
  );
};

export default KruxPassphraseBluewallet;
