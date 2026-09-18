import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  ArrowRight, Shield, Lock, Key,  WifiOff,
  QrCode, Nfc, Globe, AlertTriangle, CheckCircle, Eye, BookOpen,
  ChevronDown, Download, Fingerprint, HardDrive, ScanLine, Tag, Cpu,
  CircleDot, Package, Wrench, Terminal, Copy, FileCheck, Layers, Zap
} from 'lucide-react';
import CinematicHero from '@/components/CinematicHero';
import FixedThematicBackground from '@/components/backgrounds/FixedThematicBackground';
import bgMobilidade from '@/assets/backgrounds/bg-mobilidade-chaves.webp';
import DonationCTA from '@/components/DonationCTA';
import BackToHome from '@/components/BackToHome';

const APPLE_EASE = [0.22, 1, 0.36, 1] as const;
const fadeUp = {
  hidden: { opacity: 0, y: 30, filter: 'blur(6px)' },
  visible: (i: number) => ({
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: 0.7, ease: APPLE_EASE, delay: i * 0.12 },
  }),
};

/* ─── FERRAMENTAS NECESSÁRIAS ─── */
const FERRAMENTAS = [
  {
    icon: Cpu,
    titulo: 'Krux Hardwallet',
    desc: 'Hardwallet open-source, open-hardware, air-gapped. Projeto RISC-V brasileiro liderado por ODudex com comunidade ativa de desenvolvedores. O instalador oficial (Krux Installer) simplifica a gravação do firmware no dispositivo.',
    link: 'github.com/selfcustody/krux',
    url: 'https://github.com/selfcustody/krux',
    badge: 'Obrigatório',
    badgeColor: 'amber',
  },
  {
    icon: Download,
    titulo: 'Krux Installer',
    desc: 'Instalador oficial para gravar o firmware da Krux no seu dispositivo. Interface gráfica simples — sem linha de comando. Disponível para Windows, Mac e Linux.',
    link: 'github.com/selfcustody/krux-installer',
    url: 'https://github.com/selfcustody/krux-installer',
    badge: 'Instalador',
    badgeColor: 'amber',
  },
  {
    icon: Tag,
    titulo: 'NFC Tools (Wakdev)',
    desc: 'Aplicativo para ler, escrever e bloquear tags NFC. Disponível na Play Store, App Store e como APK standalone (sem Google Play). A versão gratuita é suficiente; a licença paga (€3,29) desbloqueia recursos avançados.',
    link: 'wakdev.com/nfc-tools',
    url: 'https://www.wakdev.com/en/apps/nfc-tools.html',
    badge: 'Android/iOS',
    badgeColor: 'sky',
  },
  {
    icon: ScanLine,
    titulo: 'BinaryEye (Leitor QR)',
    desc: 'Leitor e gerador de QR codes open-source. Disponível no F-Droid e Google Play. Leve, sem rastreamento, sem necessidade de acesso à rede. No iOS, a própria câmera nativa funciona como leitor.',
    link: 'github.com/markusfisch/BinaryEye',
    url: 'https://github.com/markusfisch/BinaryEye',
    badge: 'Open Source',
    badgeColor: 'emerald',
  },
  {
    icon: CircleDot,
    titulo: 'Tags NFC (NTAG 215/216)',
    desc: 'Tags passivas sem bateria, sem emissão de sinal. Disponíveis como cartão, moeda, adesivo, anel ou chaveiro. NTAG 215: 504 bytes. NTAG 216: 888 bytes. Uma seed criptografada de 12 palavras ocupa apenas ~54 bytes.',
    link: 'Qualquer loja de eletrônicos',
    badge: 'Centavos',
    badgeColor: 'violet',
  },
];

/* ─── PASSO A PASSO ─── */
const TUTORIAL_STEPS = [
  {
    step: '01',
    titulo: 'Carregar a seed na Krux',
    desc: 'Ligue a Krux e carregue seu mnemônico. Você pode digitá-lo manualmente (entrada por palavras), escanear um SeedQR existente ou usar outro método suportado. A Krux é amnésica: ao desligar, a seed é apagada da memória.',
    detalhe: 'Se digitar manualmente, basta acertar as 4 primeiras letras de cada palavra BIP39. A última palavra serve como checksum — se alguma palavra anterior estiver errada, a última não será aceita. Confira também o fingerprint da carteira para confirmar que a seed está correta.',
    icon: Key,
  },
  {
    step: '02',
    titulo: 'Criptografar o backup da seed',
    desc: 'No menu, acesse Backup de Mnemônico → Criptografado → QR Code Criptografado. A Krux pedirá uma chave (senha). Use uma senha forte — mínimo 20+ caracteres, com mistura de tipos. A Krux mostrará a força da senha e o comprimento.',
    detalhe: 'O modo de criptografia padrão é AES-ECB. Para alterar: Configurações → Criptografia → Modo de criptografia. Para uso único de seed privada, AES-ECB é adequado. Para múltiplos usos (Datum, passphrase), use AES-GCM. O número de iterações padrão (100.000 PBKDF2) é suficiente para qualquer modo.',
    icon: Lock,
  },
  {
    step: '03',
    titulo: 'Escanear o QR com BinaryEye',
    desc: 'A Krux exibirá um QR Code contendo a seed criptografada. Abra o BinaryEye no celular e escaneie. Os novos QR codes criptografados da Krux são codificados em texto puro — qualquer leitor consegue ler. O resultado será um blob de ~47-54 caracteres totalmente ilegível sem a senha.',
    detalhe: 'Importante: sem a senha, esses caracteres são indistinguíveis de ruído aleatório. Ninguém que leia esse texto saberá que se trata de uma chave de Bitcoin. Uma seed de 12 palavras criptografada ocupa apenas ~54 bytes — muito menos do que a capacidade de qualquer tag NFC.',
    icon: QrCode,
  },
  {
    step: '04',
    titulo: 'Gravar no tag NFC',
    desc: 'Abra o NFC Tools → Escrever → Adicionar Registro → Texto simples. Cole o texto copiado do BinaryEye. Aproxime o tag NFC (cartão, moeda, adesivo ou anel) do celular. Gravação concluída. Repita para criar backups redundantes em múltiplos tags.',
    detalhe: 'O processo leva segundos. Um NTAG 216 tem 924 bytes — sobra espaço para mais de 15 seeds criptografadas. Após gravar e verificar, você pode bloquear o tag (NFC Tools → Outros → Bloquear Tag). Atenção: o bloqueio é irreversível — o tag nunca mais poderá ser reescrito.',
    icon: Nfc,
  },
  {
    step: '05',
    titulo: 'Verificar a recuperação',
    desc: 'ANTES de confiar no backup: desligue e reinicie a Krux (limpa a memória). Leia o tag NFC com NFC Tools → copie o texto. No BinaryEye, converta o texto de volta em QR Code (formato QR Code, correção baixa). Escaneie com a Krux → ela detectará "KF Criptografado" → digite a senha → seed recuperada.',
    detalhe: 'Se o fingerprint corresponder ao que você anotou, a recuperação foi perfeita. Nunca confie em um backup sem testá-lo. Faça o ciclo completo: criptografar → gravar → desligar → recuperar. Só então destrua o backup anterior (se aplicável).',
    icon: FileCheck,
  },
];

/* ─── MEIOS NFC CRIATIVOS ─── */
const NFC_MEIOS = [
  {
    titulo: 'Anel NFC',
    desc: 'Usado pelo desenvolvedor ODudex na demonstração oficial. Discreto, sempre com você, difícil de associar a criptomoedas. "Recheia seu anel de Bitcoin" — na verdade, a chave criptografada.',
    bytes: '~500-900 bytes',
    lucideIcon: CircleDot,
  },
  {
    titulo: 'Cartão NFC (NTAG 216)',
    desc: 'Formato cartão de crédito. 924 bytes de armazenamento. O plástico protege o chip contra dobras. Pode ir na carteira comum, gaveta ou cofre.',
    bytes: '924 bytes',
    lucideIcon: HardDrive,
  },
  {
    titulo: 'Moeda NFC (NTAG 215)',
    desc: 'Forma de moeda plástica. Menos armazenamento (540 bytes), mas suficiente para uma seed criptografada. Compacta e discreta.',
    bytes: '540 bytes',
    lucideIcon: CircleDot,
  },
  {
    titulo: 'Adesivo NFC',
    desc: 'O mais versátil. Cole dentro de um livro, atrás de um quadro, na caixa de um produto qualquer. Um adesivo NFC num frasco de perfume parece um tag de loja — passa completamente despercebido.',
    bytes: '~500+ bytes',
    lucideIcon: Tag,
  },
];

/* ─── MODOS AES ─── */
const MODOS_AES = [
  {
    modo: 'AES-ECB',
    nome: 'Electronic Codebook',
    seguranca: 'Adequado',
    desc: 'Modo mais simples. Cada bloco de 16 bytes é criptografado independentemente. Para dados aleatórios como uma seed phrase BIP39 (alta entropia), oferece segurança adequada. Não recomendado para textos ou dados com padrões repetitivos.',
    quando: 'Criptografia única de uma seed phrase que ficará armazenada de forma privada.',
    cor: 'amber',
  },
  {
    modo: 'AES-GCM',
    nome: 'Galois/Counter Mode',
    seguranca: 'Recomendado',
    desc: 'Modo autenticado que combina criptografia e verificação de integridade. Adiciona nonce e tag de autenticação, detectando qualquer alteração nos dados. O mais robusto e versátil disponível na Krux.',
    quando: 'Uso geral, especialmente para múltiplos contextos (Ferramentas → Datum, passphrase, etc.).',
    cor: 'emerald',
  },
  {
    modo: 'AES-CTR',
    nome: 'Counter Mode',
    seguranca: 'Bom',
    desc: 'Transforma AES em cifrador de fluxo usando contador incremental. Cada bloco recebe nonce único. Não possui autenticação nativa — alterações no criptograma geram dados corrompidos sem aviso.',
    quando: 'Quando performance é prioridade e a integridade é verificada por outros meios.',
    cor: 'sky',
  },
  {
    modo: 'AES-CBC',
    nome: 'Cipher Block Chaining',
    seguranca: 'Bom',
    desc: 'Cada bloco é combinado (XOR) com o bloco criptografado anterior antes de ser cifrado. Blocos idênticos geram criptogramas diferentes. Requer vetor de inicialização (IV) aleatório.',
    quando: 'Segurança superior ao ECB com complexidade moderada.',
    cor: 'violet',
  },
];

/* ─── FAQ ─── */
const FAQ_ITEMS = [
  {
    q: 'Como levar Bitcoin para outro país com segurança?',
    a: 'Bitcoin existe na blockchain — não precisa ser transportado fisicamente. O que você transporta é a chave privada (seed phrase). Usando a Krux, você criptografa a seed com AES e armazena em um tag NFC (anel, adesivo, cartão). Nenhum scanner de aeroporto detecta uma tag NFC passiva com dados criptografados. Você pode inclusive viajar sem a Krux: no destino, consiga o dispositivo, instale o firmware e recupere a seed do NFC.',
  },
  {
    q: 'Os QR codes criptografados da Krux funcionam em qualquer leitor?',
    a: 'Sim, desde julho de 2025. Os novos QR codes criptografados da Krux são codificados em texto puro (antes eram binários). Qualquer leitor de QR code (BinaryEye, câmera do celular) consegue ler — mas verá apenas um blob de caracteres sem sentido. Só a Krux com a senha correta consegue decifrar o conteúdo.',
  },
  {
    q: 'A seed criptografada exposta há 3 anos foi quebrada?',
    a: 'Não. O desenvolvedor ODudex publicou um QR code criptografado de uma seed real de Bitcoin em vídeo público há mais de 3 anos. A seed permanece segura até hoje — ninguém conseguiu quebrar a criptografia. Isso demonstra que, com senha forte, a criptografia AES da Krux é computacionalmente inquebrável com a tecnologia atual.',
  },
  {
    q: 'Qual a diferença entre NTAG 215 e NTAG 216?',
    a: 'NTAG 215: 504 bytes de memória. NTAG 216: 888 bytes (924 bytes brutos). Ambos são tags passivas sem bateria. Uma seed criptografada de 12 palavras ocupa apenas ~54 bytes — ambos são mais que suficientes. A diferença prática é que o NTAG 216 comporta dados adicionais ou múltiplos backups.',
  },
  {
    q: 'Tags NFC são afetadas por scanners de aeroporto?',
    a: 'Não. Tags NFC passivas não são afetadas por magnetismo, raio-X ou scanners de segurança de aeroporto. Elas não possuem bateria e não emitem sinais — funcionam apenas quando aproximadas a um leitor NFC (< 4cm). Podem ser transportadas livremente em qualquer lugar.',
  },
  {
    q: 'Posso usar outra seed como senha de criptografia?',
    a: 'Sim. Uma seed BIP39 de 12 ou 24 palavras é essencialmente uma senha extremamente forte e impossível de quebrar por força bruta. Você pode levar essa "seed-senha" exposta (ela não protege nenhum Bitcoin diretamente) e usá-la para descriptografar a seed real que está no NFC. A seed-senha pode ir anotada; a seed real viaja criptografada.',
  },
  {
    q: 'AES-ECB é inseguro para proteger minha seed?',
    a: 'Depende do contexto. AES-ECB é fraco para dados com padrões repetitivos (texto, imagens). Para uma seed BIP39 (dados essencialmente aleatórios), o problema não se aplica. Para uso único de backup privado, é adequado. Para múltiplos usos ou dados estruturados, AES-GCM é recomendado.',
  },
  {
    q: 'Posso bloquear o tag NFC após gravar?',
    a: 'Sim. No NFC Tools: Outros → Bloquear Tag. Isso torna o tag somente leitura permanentemente — ninguém poderá sobrescrever ou apagar os dados. ATENÇÃO: este processo é irreversível. Sempre verifique que a recuperação funciona ANTES de bloquear.',
  },
  {
    q: 'O que acontece se eu perder a senha?',
    a: 'Sem recuperação possível. AES com 100.000 iterações PBKDF2 torna força bruta inviável para senhas fortes. Nunca armazene a senha junto com o NFC criptografado. Memorize-a, ou guarde em local separado. Tenha sempre pelo menos um backup não-criptografado da seed em local seguro (metal, cofre).',
  },
  {
    q: 'Isso substitui o Border Wallets?',
    a: 'Na prática, sim. O Border Wallets era um esquema para criptografia de seed em papel usando uma grade de padrões. O NFC criptografado da Krux oferece o mesmo propósito (transportar seeds por fronteiras) com implementação mais robusta, menor complexidade e maior discrição.',
  },
];

/* ─── COMPONENTE PRINCIPAL ─── */
export default function MobilidadeDeChaves() {
  const { scrollYProgress } = useScroll();
  const progressWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": FAQ_ITEMS.map(item => ({
      "@type": "Question",
      "name": item.q,
      "acceptedAnswer": { "@type": "Answer", "text": item.a },
    })),
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "Como criptografar e transportar sua seed Bitcoin em NFC com a Krux",
    "description": "Tutorial passo a passo para criptografar uma seed phrase Bitcoin usando a hardwallet Krux e armazená-la em um tag NFC para transporte seguro por fronteiras.",
    "step": TUTORIAL_STEPS.map((s, i) => ({
      "@type": "HowToStep",
      "position": i + 1,
      "name": s.titulo,
      "text": s.desc,
    })),
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Como levar sua chave de Bitcoin para o exterior com segurança",
    "description": "Guia técnico completo sobre transporte de seeds Bitcoin usando Krux, SeedQR, NFC tags e criptografia AES.",
    "author": { "@type": "Person", "name": "Lord Junnior" },
    "publisher": { "@type": "Person", "name": "Lord Junnior" },
    "url": "https://lordjunnior.com.br/mobilidade-de-chaves",
    "image": "https://lordjunnior.com.br/heroes/mobilidade-chaves.webp",
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/30 relative overflow-hidden">

      {/* ─── CINEMATIC FIXED BACKGROUND ─── */}
      <FixedThematicBackground image={bgMobilidade} intensity="medium" />

      {/* ─── ADDITIONAL LIGHT BEAMS ─── */}
      <div className="fixed inset-0 pointer-events-none z-[1]">
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ background: 'linear-gradient(125deg, transparent 20%, rgba(245,158,11,0.1) 45%, transparent 65%)' }} />
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ background: 'linear-gradient(240deg, transparent 30%, rgba(217,119,6,0.08) 55%, transparent 75%)' }} />
      </div>

      {/* ─── BREATHING ORBS (intensified) ─── */}
      <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden">
        <motion.div
          className="absolute top-[10%] left-[5%] w-[700px] h-[700px] rounded-full"
          animate={{ scale: [1, 1.2, 1], opacity: [0.04, 0.09, 0.04] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}>
          <div className="w-full h-full rounded-full blur-3xl" style={{ background: 'radial-gradient(circle, rgba(245,158,11,0.3), transparent)' }} />
        </motion.div>
        <motion.div
          className="absolute top-[45%] right-[3%] w-[600px] h-[600px] rounded-full"
          animate={{ scale: [1, 1.25, 1], opacity: [0.03, 0.07, 0.03] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut', delay: 4 }}>
          <div className="w-full h-full rounded-full blur-3xl" style={{ background: 'radial-gradient(circle, rgba(217,119,6,0.25), transparent)' }} />
        </motion.div>
        <motion.div
          className="absolute bottom-[15%] left-[25%] w-[500px] h-[500px] rounded-full"
          animate={{ scale: [1, 1.15, 1], opacity: [0.03, 0.06, 0.03] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 7 }}>
          <div className="w-full h-full rounded-full blur-3xl" style={{ background: 'radial-gradient(circle, rgba(251,191,36,0.2), transparent)' }} />
        </motion.div>
        <motion.div
          className="absolute top-[75%] right-[25%] w-[450px] h-[450px] rounded-full"
          animate={{ scale: [1, 1.18, 1], opacity: [0.02, 0.05, 0.02] }}
          transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut', delay: 2 }}>
          <div className="w-full h-full rounded-full blur-3xl" style={{ background: 'radial-gradient(circle, rgba(168,85,247,0.15), transparent)' }} />
        </motion.div>
      </div>
      <Helmet>
        <title>Como Levar sua Chave de Bitcoin para o Exterior com Segurança | Lord Junnior</title>
        <meta name="description" content="Tutorial completo: como criptografar e transportar sua seed phrase Bitcoin usando Krux, NFC tags e criptografia AES. Passo a passo com NTAG 215/216, BinaryEye e NFC Tools." />
        <meta name="keywords" content="como levar bitcoin para outro país, como transportar bitcoin, como guardar seed phrase, backup seed bitcoin, krux hardwallet, seedqr, nfc bitcoin, criptografia aes seed, ntag 215, ntag 216, autocustódia bitcoin, air-gapped wallet, border wallets" />
        <meta property="og:title" content="Como Levar sua Chave de Bitcoin para o Exterior com Segurança" />
        <meta property="og:description" content="Riqueza que atravessa fronteiras em poucos bytes criptografados. Tutorial completo com Krux, NFC e AES." />
        <meta property="og:image" content="https://lordjunnior.com.br/heroes/mobilidade-chaves.webp" />
        <meta property="og:type" content="article" />
        <link rel="canonical" href="https://lordjunnior.com.br/mobilidade-de-chaves" />
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(howToSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
      </Helmet>
      <div className="relative z-20 px-6 md:px-12 lg:px-20 pt-[52px]">
        <BackToHome />
      </div>

      {/* Progress bar */}
      <motion.div className="fixed top-0 left-0 right-0 h-[2px] z-50 origin-left"
        style={{ width: progressWidth, background: 'linear-gradient(90deg, #f59e0b, #d97706)' }} />

      {/* CinematicHero */}
      <CinematicHero
        image="/heroes/mobilidade-chaves.webp"
        phase="Bitcoin & Soberania"
        title="Mobilidade de Chaves"
        subtitle="Como transportar sua soberania Bitcoin pelo mundo. Krux, SeedQR, NFC tags e criptografia AES: riqueza que atravessa fronteiras em poucos bytes criptografados."
        icon={Key}
        accentColor="amber"
        backLink="/autocustodia"
        backLabel="Autocustódia"
      />

      {/* ═══════════════════════════════════════════════════════════
         CAPÍTULO 01 — POR QUE TRANSPORTAR CHAVES COM SEGURANÇA IMPORTA
      ═══════════════════════════════════════════════════════════ */}
      <section className="relative z-10 py-20 md:py-32">
        <div className="max-w-5xl mx-auto px-6 md:px-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-[2px] bg-amber-500 rounded-full" />
              <span className="text-amber-400 text-[10px] font-bold tracking-[0.5em] uppercase">Capítulo 01</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              POR QUE TRANSPORTAR <span className="text-amber-400">CHAVES IMPORTA</span>
            </h2>
          </motion.div>

          {/* PNL Opening */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0.2}
            className="relative rounded-2xl border border-amber-500/15 bg-amber-500/[0.03] p-8 md:p-12 mb-16 overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-amber-500 to-transparent" />
            <p className="text-stone-200 text-lg md:text-xl leading-relaxed mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              "Durante séculos, riqueza foi pesada, visível e fácil de confiscar.
            </p>
            <p className="text-amber-400 text-xl md:text-2xl font-bold leading-relaxed mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Bitcoin mudou isso. Hoje, milhões podem atravessar fronteiras em poucos bytes criptografados."
            </p>
            <p className="text-stone-400 text-sm leading-relaxed">
              Ouro precisava de cofres. Propriedade precisava de registro estatal. Fronteiras sempre significaram risco de confisco.
              Bitcoin introduziu algo quase paradoxal: riqueza que pode viajar dentro da cabeça de alguém ou escondida em poucos bytes invisíveis.
              Nenhum scanner de aeroporto detecta uma seed phrase memorizada. Nenhum agente de fronteira identifica uma tag NFC criptografada dentro de um anel.
            </p>
          </motion.div>

          {/* Prova social: 3 anos exposta */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0.3}
            className="rounded-xl border border-emerald-500/15 bg-emerald-500/[0.03] p-6 md:p-8 mb-16"
          >
            <div className="flex items-start gap-4">
              <Shield size={20} className="text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-emerald-300 mb-2">Prova de resistência: 3+ anos na internet</h4>
                <p className="text-stone-400 text-xs leading-relaxed">
                  O desenvolvedor ODudex publicou um QR Code criptografado de uma seed real de Bitcoin em vídeo público há mais de 3 anos.
                  A seed permanece segura até hoje — ninguém conseguiu quebrá-la. Super exposta, super segura.
                  Isso demonstra que, com senha forte, a criptografia AES da Krux é computacionalmente inquebrável com a tecnologia atual.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Context blocks */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { icon: Globe, title: 'Mobilidade Global', desc: 'Sua riqueza não está presa a nenhum banco, país ou jurisdição. A seed phrase é a chave que abre seu cofre em qualquer lugar do mundo. Chegue ao destino, consiga uma Krux, recupere sua seed do NFC.' },
              { icon: Shield, title: 'Resistência a Confisco', desc: 'Governos congelam contas bancárias em segundos. Metal não passa em fronteiras sem chamar atenção. Um anel NFC com 54 bytes criptografados? Invisível.' },
              { icon: Eye, title: 'Privacidade Absoluta', desc: 'Sem declaração de fronteira, sem registros bancários. A criptografia AES transforma sua seed em ruído aleatório indistinguível de qualquer outro dado digital.' },
            ].map((item, i) => (
              <motion.div key={item.title} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i * 0.15}
                className="p-6 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-500"
              >
                <div className="p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/15 w-fit mb-4">
                  <item.icon size={20} className="text-amber-400" />
                </div>
                <h4 className="text-sm font-bold text-stone-200 mb-2">{item.title}</h4>
                <p className="text-stone-500 text-xs leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* AnimatedDivider */}
      <div className="relative z-10 section-divider" />

      {/* ═══════════════════════════════════════════════════════════
         CAPÍTULO 02 — ARSENAL: O QUE VOCÊ VAI PRECISAR
      ═══════════════════════════════════════════════════════════ */}
      <section className="relative z-10 py-20 md:py-32 section-alt">
        <div className="max-w-5xl mx-auto px-6 md:px-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-[2px] bg-amber-500 rounded-full" />
              <span className="text-amber-400 text-[10px] font-bold tracking-[0.5em] uppercase">Capítulo 02</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              ARSENAL — <span className="text-amber-400">O QUE VOCÊ PRECISA</span>
            </h2>
            <p className="text-stone-400 text-sm leading-relaxed max-w-3xl">
              Quatro ferramentas. Nenhuma assinatura, nenhum cadastro, nenhuma dependência de terceiros. Tudo o que você precisa para criptografar e transportar sua chave de Bitcoin.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {FERRAMENTAS.map((tool, i) => (
              <motion.div key={tool.titulo} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i * 0.12}
                className="group relative overflow-hidden rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-500 p-6"
              >
                <div className="absolute top-0 left-0 w-full h-[2px] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-700 bg-gradient-to-r from-amber-500 to-transparent" />
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/15 flex items-center justify-center shrink-0">
                    <tool.icon size={22} className="text-amber-400" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="text-sm font-bold text-stone-200">{tool.titulo}</h4>
                      <span className={`text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded
                        ${tool.badgeColor === 'amber' ? 'text-amber-400 bg-amber-500/10' :
                          tool.badgeColor === 'emerald' ? 'text-emerald-400 bg-emerald-500/10' :
                          tool.badgeColor === 'sky' ? 'text-sky-400 bg-sky-500/10' :
                          'text-violet-400 bg-violet-500/10'}`}>
                        {tool.badge}
                      </span>
                    </div>
                    <p className="text-stone-500 text-xs leading-relaxed mb-2">{tool.desc}</p>
                    {'url' in tool && tool.url ? (
                      <a href={tool.url} target="_blank" rel="noopener noreferrer" className="text-amber-400/60 hover:text-amber-400 text-[10px] font-medium transition-colors inline-flex items-center gap-1">
                        {tool.link} <ArrowRight size={10} />
                      </a>
                    ) : (
                      <p className="text-stone-600 text-[10px] italic">{tool.link}</p>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* AnimatedDivider */}
      <div className="relative z-10 section-divider" />

      {/* ═══════════════════════════════════════════════════════════
         CAPÍTULO 03 — KRUX: COMPANHEIRO CRIPTOGRÁFICO
      ═══════════════════════════════════════════════════════════ */}
      <section className="relative z-10 py-20 md:py-32">
        <div className="max-w-5xl mx-auto px-6 md:px-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-[2px] bg-amber-500 rounded-full" />
              <span className="text-amber-400 text-[10px] font-bold tracking-[0.5em] uppercase">Capítulo 03</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              KRUX — <span className="text-amber-400">COMPANHEIRO CRIPTOGRÁFICO</span>
            </h2>
            <p className="text-stone-400 text-sm md:text-base leading-relaxed max-w-3xl">
              Mais do que uma hardwallet: a Krux é uma ferramenta criptográfica sem substituta. Open-source, open-hardware, RISC-V, projeto brasileiro.
              Mesmo que você já tenha outra hardwallet, vale ter uma Krux — ela faz coisas que nenhuma outra faz.
            </p>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0.2}
            className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-8 mb-8"
          >
            <h3 className="text-lg font-bold text-stone-200 mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Por que Air-Gapped importa
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { icon: WifiOff, title: 'Zero conexão de rede', desc: 'Sem Wi-Fi, Bluetooth, NFC passivo ou USB de dados. Hackers remotos precisam de um vetor de rede — a Krux não oferece nenhum.' },
                { icon: QrCode, title: 'Comunicação verificável', desc: 'Toda informação entra e sai via QR codes — formato auditável visualmente. Você inspeciona cada byte. Sem canal oculto de comunicação.' },
                { icon: BookOpen, title: 'Código 100% aberto', desc: 'Firmware open-source auditável. Compile sua própria versão. Muitos desenvolvedores brasileiros levando o projeto adiante.' },
                { icon: Zap, title: 'Amnésica por design', desc: 'Ao desligar, a seed é apagada. Se quiser certeza absoluta: flasheie o firmware novamente. Nenhum vestígio permanece no dispositivo.' },
              ].map((item, i) => (
                <div key={item.title}>
                  <div className="flex items-center gap-3 mb-3">
                    <item.icon size={18} className="text-amber-400" />
                    <h4 className="text-sm font-bold text-stone-300">{item.title}</h4>
                  </div>
                  <p className="text-stone-500 text-xs leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* NFC na Krux */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0.3}
            className="rounded-xl border border-amber-500/15 bg-amber-500/[0.03] p-6 md:p-8"
          >
            <div className="flex items-start gap-4">
              <Nfc size={20} className="text-amber-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-stone-200 mb-2">Recurso exclusivo: Criptografia de seed em QR e NFC</h4>
                <p className="text-stone-400 text-xs leading-relaxed mb-3">
                  A Krux possui um recurso único que nenhuma outra hardwallet oferece: criptografia da seed diretamente no dispositivo air-gapped, com exportação para QR Code e gravação em tags NFC.
                  Desde julho de 2025, os QR codes criptografados são codificados em texto puro, melhorando compatibilidade com leitores comuns e módulos NFC.
                </p>
                <p className="text-stone-500 text-xs leading-relaxed">
                  O processo completo acontece offline. A seed nunca toca a internet, nunca passa por um celular desbloqueado, nunca é exposta. A criptografia é feita dentro do dispositivo air-gapped e o resultado é um blob de texto indistinguível de ruído.
                </p>
                <div className="flex flex-wrap gap-3 mt-3">
                  <a href="https://selfcustody.github.io/krux/" target="_blank" rel="noopener noreferrer"
                    className="text-[10px] font-bold uppercase tracking-wider text-amber-400/70 hover:text-amber-400 bg-amber-500/10 px-3 py-1.5 rounded transition-colors inline-flex items-center gap-1">
                    Manual da Krux <ArrowRight size={10} />
                  </a>
                  <a href="https://github.com/selfcustody/krux" target="_blank" rel="noopener noreferrer"
                    className="text-[10px] font-bold uppercase tracking-wider text-stone-500 hover:text-stone-300 bg-white/[0.04] px-3 py-1.5 rounded transition-colors inline-flex items-center gap-1">
                    GitHub <ArrowRight size={10} />
                  </a>
                  <a href="https://github.com/selfcustody/krux-installer" target="_blank" rel="noopener noreferrer"
                    className="text-[10px] font-bold uppercase tracking-wider text-stone-500 hover:text-stone-300 bg-white/[0.04] px-3 py-1.5 rounded transition-colors inline-flex items-center gap-1">
                    Installer <ArrowRight size={10} />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Divider */}
      <div className="relative z-10 max-w-5xl mx-auto px-10">
        <div className="h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent" />
      </div>

      {/* AnimatedDivider */}
      <div className="relative z-10 section-divider" />

      {/* ═══════════════════════════════════════════════════════════
         CAPÍTULO 04 — TUTORIAL PASSO A PASSO
      ═══════════════════════════════════════════════════════════ */}
      <section className="relative z-10 py-20 md:py-32 section-alt">
        <div className="max-w-5xl mx-auto px-6 md:px-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-[2px] bg-amber-500 rounded-full" />
              <span className="text-amber-400 text-[10px] font-bold tracking-[0.5em] uppercase">Capítulo 04</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              TUTORIAL — <span className="text-amber-400">PASSO A PASSO</span>
            </h2>
            <p className="text-stone-400 text-sm leading-relaxed max-w-3xl">
              O processo completo: da seed no papel (ou metal) até a chave criptografada no NFC, pronta para atravessar qualquer fronteira.
              Cinco passos. Sem internet. Sem confiança em terceiros.
            </p>
          </motion.div>

          <div className="space-y-6">
            {TUTORIAL_STEPS.map((step, i) => (
              <motion.div key={step.step} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i * 0.1}
                className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-500"
              >
                <div className="absolute top-0 left-0 w-full h-[2px] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-700 bg-gradient-to-r from-amber-500 to-transparent" />
                <div className="p-8 md:p-10">
                  <div className="flex items-start gap-6">
                    {/* Step number */}
                    <div className="shrink-0">
                      <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                        <span className="text-amber-400 font-black text-lg font-mono">{step.step}</span>
                      </div>
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <step.icon size={16} className="text-amber-400/70" />
                        <h3 className="text-lg font-bold text-stone-200">{step.titulo}</h3>
                      </div>
                      <p className="text-stone-300 text-sm leading-relaxed mb-4">{step.desc}</p>

                      {/* Detalhe técnico */}
                      <div className="border-l-2 border-amber-500/20 pl-4">
                        <p className="text-[10px] text-amber-400/60 font-bold uppercase tracking-wider mb-1">Detalhe técnico</p>
                        <p className="text-stone-500 text-xs leading-relaxed">{step.detalhe}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Fluxo resumido */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}
            className="mt-12 p-6 rounded-xl border border-white/[0.06] bg-white/[0.02]"
          >
            <p className="text-[10px] text-stone-600 font-bold uppercase tracking-wider mb-4">Fluxo resumido</p>
            <div className="flex flex-wrap items-center gap-2 text-xs">
              {[
                'Seed (papel/metal)',
                '→ Krux (offline)',
                '→ Criptografia AES',
                '→ QR Code (texto)',
                '→ BinaryEye (copiar)',
                '→ NFC Tools (gravar)',
                '→ Tag NFC',
                '→ 🌍 Fronteira',
                '→ NFC Tools (ler)',
                '→ BinaryEye (QR)',
                '→ Krux (decifrar)',
                '→ Seed recuperada ✓'
              ].map((item, i) => (
                <span key={i} className={`${item.includes('→') && !item.includes('NFC') && !item.includes('Seed') && !item.includes('Krux') && !item.includes('Binary') && !item.includes('QR') && !item.includes('Cript') && !item.includes('Fronteira') ? 'text-stone-600' : item.includes('Fronteira') ? 'text-amber-400 font-bold' : 'text-stone-400 bg-white/[0.04] px-2 py-1 rounded'}`}>
                  {item}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Divider */}
      <div className="relative z-10 section-divider" />

      {/* ═══════════════════════════════════════════════════════════
         CAPÍTULO 05 — MEIOS NFC: ONDE ESCONDER SUA CHAVE
      ═══════════════════════════════════════════════════════════ */}
      <section className="relative z-10 py-20 md:py-32">
        <div className="max-w-5xl mx-auto px-6 md:px-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-[2px] bg-amber-500 rounded-full" />
              <span className="text-amber-400 text-[10px] font-bold tracking-[0.5em] uppercase">Capítulo 05</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              MEIOS NFC — <span className="text-amber-400">ONDE ESCONDER SUA CHAVE</span>
            </h2>
            <p className="text-stone-400 text-sm leading-relaxed max-w-3xl">
              Tags NFC passivas não possuem bateria, não emitem sinais e não são afetadas por scanners de aeroporto ou magnetismo.
              O limite é a criatividade. Uma loja coloca tags NFC em qualquer produto — por que o seu anel, adesivo ou cartão chamaria atenção?
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
            {NFC_MEIOS.map((meio, i) => (
              <motion.div key={meio.titulo} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i * 0.12}
                className="group p-6 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-500"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/15 flex items-center justify-center shrink-0">
                    <meio.lucideIcon size={18} className="text-amber-400" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-sm font-bold text-stone-200">{meio.titulo}</h4>
                      <span className="text-[9px] font-mono text-amber-400/60 bg-amber-500/10 px-2 py-0.5 rounded">{meio.bytes}</span>
                    </div>
                    <p className="text-stone-500 text-xs leading-relaxed">{meio.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Dica criativa */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}
            className="border-l-2 border-amber-500/40 pl-6"
          >
            <p className="text-amber-400/80 text-sm italic leading-relaxed mb-3">
              "É assim que se carrega Bitcoin no anel. Você recheia o anel de Bitcoin."
            </p>
            <p className="text-stone-500 text-xs leading-relaxed">
              Na verdade, Bitcoin está na blockchain — nunca está com você. Você carrega apenas a chave criptografada.
              Ninguém que encontre seu anel, adesivo ou cartão saberá que aqueles bytes são uma chave.
              E mesmo que saiba, sem a senha forte, os dados são computacionalmente inúteis.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="relative z-10 section-divider" />

      {/* ═══════════════════════════════════════════════════════════
         CAPÍTULO 06 — CRIPTOGRAFIA EXPLICADA
      ═══════════════════════════════════════════════════════════ */}
      <section className="relative z-10 py-20 md:py-32 section-alt">
        <div className="max-w-5xl mx-auto px-6 md:px-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-[2px] bg-amber-500 rounded-full" />
              <span className="text-amber-400 text-[10px] font-bold tracking-[0.5em] uppercase">Capítulo 06</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              CRIPTOGRAFIA <span className="text-amber-400">EXPLICADA</span>
            </h2>
            <p className="text-stone-400 text-sm leading-relaxed max-w-3xl">
              A Krux oferece quatro modos de criptografia AES. Para alterar: <span className="font-mono text-amber-400/80">Configurações → Criptografia → Modo de criptografia</span>.
              O número de iterações padrão de 100.000 (PBKDF2) é suficiente independente do modo. Pesquise sobre cada modo e escolha o mais adequado.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
            {MODOS_AES.map((modo, i) => (
              <motion.div key={modo.modo} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i * 0.12}
                className="group relative overflow-hidden rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-500 p-6 md:p-8"
              >
                <div className="absolute top-0 left-0 w-full h-[2px] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-700"
                  style={{ background: `linear-gradient(to right, ${modo.cor === 'amber' ? '#f59e0b' : modo.cor === 'emerald' ? '#10b981' : modo.cor === 'sky' ? '#0ea5e9' : '#8b5cf6'}, transparent)` }} />

                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-base font-bold text-stone-200 font-mono">{modo.modo}</h4>
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded
                    ${modo.cor === 'emerald' ? 'text-emerald-400 bg-emerald-500/10' : modo.cor === 'amber' ? 'text-amber-400 bg-amber-500/10' : modo.cor === 'sky' ? 'text-sky-400 bg-sky-500/10' : 'text-violet-400 bg-violet-500/10'}`}>
                    {modo.seguranca}
                  </span>
                </div>
                <p className="text-stone-600 text-[10px] font-bold uppercase tracking-wider mb-3">{modo.nome}</p>
                <p className="text-stone-400 text-xs leading-relaxed mb-5">{modo.desc}</p>
                <div className="border-l-2 pl-4"
                  style={{ borderColor: modo.cor === 'amber' ? '#f59e0b40' : modo.cor === 'emerald' ? '#10b98140' : modo.cor === 'sky' ? '#0ea5e940' : '#8b5cf640' }}>
                  <p className="text-[10px] font-bold uppercase tracking-wider mb-1"
                    style={{ color: modo.cor === 'amber' ? '#f59e0b90' : modo.cor === 'emerald' ? '#10b98190' : modo.cor === 'sky' ? '#0ea5e990' : '#8b5cf690' }}>Quando usar</p>
                  <p className="text-stone-500 text-xs leading-relaxed">{modo.quando}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Nota importante sobre modos */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}
            className="rounded-xl border border-amber-500/15 bg-amber-500/[0.03] p-6 md:p-8"
          >
            <div className="flex items-start gap-4">
              <AlertTriangle size={20} className="text-amber-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-stone-200 mb-2">Importante sobre os modos</h4>
                <p className="text-stone-400 text-xs leading-relaxed mb-2">
                  Todos os quatro modos são bons apenas para criptografar <strong className="text-stone-300">blocos de dados aleatórios</strong> (como uma seed phrase) — não para dados com padrões claramente definidos como texto comum.
                </p>
                <p className="text-stone-500 text-xs leading-relaxed">
                  Se você pretende usar a criptografia também para outras coisas (Ferramentas → Datum, backup de passphrase), altere para AES-GCM antes de criptografar.
                  Ambos modos funcionam com os mesmos caracteres ASCII disponíveis na Krux — o mesmo conjunto usado para passphrases de Bitcoin.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Divider */}
      <div className="relative z-10 max-w-5xl mx-auto px-10">
        <div className="h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent" />
      </div>

      <div className="relative z-10 section-divider" />

      {/* ═══════════════════════════════════════════════════════════
         CAPÍTULO 07 — SENHA FORTE: A VERDADEIRA PROTEÇÃO
      ═══════════════════════════════════════════════════════════ */}
      <section className="relative z-10 py-20 md:py-32">
        <div className="max-w-5xl mx-auto px-6 md:px-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-[2px] bg-amber-500 rounded-full" />
              <span className="text-amber-400 text-[10px] font-bold tracking-[0.5em] uppercase">Capítulo 07</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              SENHA FORTE — <span className="text-amber-400">A VERDADEIRA PROTEÇÃO</span>
            </h2>
            <p className="text-stone-400 text-sm leading-relaxed max-w-3xl">
              Em todos os casos — independente do modo AES, do tipo de tag NFC ou do número de iterações — <strong className="text-stone-200">só uma senha forte de verdade protege os dados</strong>.
              A criptografia mais sofisticada do mundo é inútil se a senha for fraca. Inclusive contra Google e Apple, que possuem força computacional significativa.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}
              className="p-6 rounded-xl border border-red-500/15 bg-red-500/[0.03]"
            >
              <h4 className="text-sm font-bold text-red-400 mb-4 flex items-center gap-2">
                <AlertTriangle size={16} /> Senhas Fracas — NÃO USE
              </h4>
              <ul className="space-y-2">
                {['123456, bitcoin, senha123', 'Datas de nascimento, nomes de família', 'Palavras isoladas do dicionário', 'Sequências de teclado (qwerty, asdf)', 'Qualquer senha com menos de 16 caracteres'].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="text-red-400/60 text-xs mt-0.5">✕</span>
                    <span className="text-stone-400 text-xs">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0.15}
              className="p-6 rounded-xl border border-emerald-500/15 bg-emerald-500/[0.03]"
            >
              <h4 className="text-sm font-bold text-emerald-400 mb-4 flex items-center gap-2">
                <CheckCircle size={16} /> Senhas Fortes — RECOMENDADO
              </h4>
              <ul className="space-y-2">
                {[
                  'Frases longas (20+ caracteres) fáceis de lembrar',
                  'Mistura de maiúsculas, minúsculas, acentos, números',
                  'Todos os caracteres ASCII disponíveis na Krux',
                  'Outra seed BIP39 como senha (12/24 palavras = impossível de quebrar)',
                  'Nunca armazenada junto com o backup criptografado',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <CheckCircle size={12} className="text-emerald-400/60 mt-0.5 shrink-0" />
                    <span className="text-stone-400 text-xs">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Técnica avançada: seed como senha */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}
            className="rounded-xl border border-violet-500/15 bg-violet-500/[0.03] p-6 md:p-8 mb-8"
          >
            <div className="flex items-start gap-4">
              <Layers size={20} className="text-violet-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-violet-300 mb-2">Técnica avançada: Seed como senha</h4>
                <p className="text-stone-400 text-xs leading-relaxed mb-2">
                  Tem gente que usa outra seed como senha de criptografia. A seed-senha não protege nenhum Bitcoin diretamente — ela protege apenas a criptografia.
                  Você pode levar essa seed-senha anotada ou exposta (não há risco financeiro direto). A seed real viaja criptografada no NFC.
                </p>
                <p className="text-stone-500 text-xs leading-relaxed">
                  Uma seed BIP39 é essencialmente uma senha impossível de quebrar por força bruta. Se fosse possível, o Bitcoin inteiro estaria comprometido.
                  Com a computação atual — e por bastante tempo — essa abordagem permanece segura.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}
            className="border-l-2 border-amber-500/40 pl-6"
          >
            <p className="text-amber-400/80 text-sm italic leading-relaxed">
              "A criptografia mais sofisticada do mundo é inútil se a senha for '12345'. AES-256 com 100.000 iterações PBKDF2 protege contra supercomputadores — mas não protege contra senhas fracas. Sua segurança começa e termina na qualidade da sua senha."
            </p>
          </motion.div>
        </div>
      </section>

      <div className="relative z-10 section-divider" />

      {/* ═══════════════════════════════════════════════════════════
         CAPÍTULO 08 — CENÁRIO: CRUZANDO FRONTEIRAS
      ═══════════════════════════════════════════════════════════ */}
      <section className="relative z-10 py-20 md:py-32 section-alt">
        <div className="max-w-5xl mx-auto px-6 md:px-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-[2px] bg-amber-500 rounded-full" />
              <span className="text-amber-400 text-[10px] font-bold tracking-[0.5em] uppercase">Capítulo 08</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              CENÁRIO — <span className="text-amber-400">CRUZANDO FRONTEIRAS</span>
            </h2>
          </motion.div>

          {/* Timeline de cenário */}
          <div className="relative space-y-8 mb-16">
            <div className="absolute left-[22px] top-4 bottom-4 w-px bg-gradient-to-b from-amber-500/40 via-amber-500/20 to-transparent" />

            {[
              { titulo: 'Antes da viagem', desc: 'Criptografe a seed na Krux. Grave em 2-3 tags NFC (anel, adesivo, cartão). Verifique a recuperação. Distribua os tags em locais diferentes da bagagem ou corpo. Destrua ou guarde o backup original em local seguro.', icon: Lock },
              { titulo: 'Na fronteira', desc: 'Tags NFC não são afetadas por raio-X, magnetismo ou scanners de segurança. Sem bateria, sem emissão de sinal. Um adesivo NFC colado na caixa de um perfume parece um tag de loja. Um anel NFC parece... um anel. Metal na fronteira é complicado — NFC é invisível.', icon: Globe },
              { titulo: 'Cenário extremo', desc: 'Você pode viajar sem Krux, sem celular — só com o tag NFC e a senha na cabeça. No destino: consiga um celular, instale NFC Tools + BinaryEye (apps gratuitos, open source). Consiga uma Krux ou instale o firmware num dispositivo compatível. Leia o NFC, gere o QR, escaneie na Krux, digite a senha. Seed recuperada.', icon: Zap },
              { titulo: 'Uso contínuo', desc: 'O NFC criptografado serve como backup permanente. Pode substituir protocolos mais complexos como Border Wallets. Mantenha sempre pelo menos um backup não-criptografado em local seguro (metal/cofre) como última instância.', icon: Shield },
            ].map((item, i) => (
              <motion.div key={item.titulo} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i * 0.12}
                className="relative pl-14"
              >
                <div className="absolute left-0 top-0 w-11 h-11 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                  <item.icon size={18} className="text-amber-400" />
                </div>
                <h4 className="text-sm font-bold text-stone-200 mb-2">{item.titulo}</h4>
                <p className="text-stone-500 text-xs leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Border Wallets comparison */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}
            className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-6 md:p-8"
          >
            <h4 className="text-sm font-bold text-stone-200 mb-4">NFC Criptografado vs Border Wallets</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-[10px] text-stone-600 font-bold uppercase tracking-wider mb-3">Border Wallets (antigo)</p>
                <ul className="space-y-2">
                  {['Criptografia baseada em padrões visuais no papel', 'Requer grade impressa + padrão memorizado', 'Processo manual complexo e propenso a erros', 'Pode ser detectado como material suspeito'].map(item => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="text-stone-600 text-xs mt-0.5">—</span>
                      <span className="text-stone-500 text-xs">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-[10px] text-amber-400/70 font-bold uppercase tracking-wider mb-3">NFC + Krux (atual)</p>
                <ul className="space-y-2">
                  {['Criptografia AES de nível militar', 'Tag NFC invisível, indistinguível de produtos comuns', 'Processo digital verificável e reproduzível', '3+ anos de prova prática sem quebra'].map(item => (
                    <li key={item} className="flex items-start gap-2">
                      <CheckCircle size={12} className="text-amber-400/60 mt-0.5 shrink-0" />
                      <span className="text-stone-400 text-xs">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </section>


      {/* ═══════════════════════════════════════════════════════════
         CTA — PRÓXIMOS PASSOS
      ═══════════════════════════════════════════════════════════ */}
      <section className="relative z-10 py-20 md:py-32">
        <div className="max-w-5xl mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
              <Link to="/autocustodia"
                className="group block h-full relative overflow-hidden rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.05] hover:border-amber-500/20 transition-all duration-500 hover:-translate-y-1 p-6 md:p-8 text-center"
              >
                <Key size={24} className="text-amber-400 mx-auto mb-4" />
                <h4 className="text-sm font-bold text-stone-200 mb-2">Aprender Autocustódia</h4>
                <p className="text-stone-500 text-xs leading-relaxed mb-4">Guia completo sobre custódia própria de Bitcoin: cold storage, multisig e backup em metal.</p>
                <span className="text-amber-400/60 text-[10px] font-bold uppercase tracking-wider flex items-center justify-center gap-2">
                  Explorar <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0.15}>
              <Link to="/chaves"
                className="group block h-full relative overflow-hidden rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.05] hover:border-amber-500/20 transition-all duration-500 hover:-translate-y-1 p-6 md:p-8 text-center"
              >
                <Shield size={24} className="text-amber-400 mx-auto mb-4" />
                <h4 className="text-sm font-bold text-stone-200 mb-2">Entender Chaves Bitcoin</h4>
                <p className="text-stone-500 text-xs leading-relaxed mb-4">O que são chaves públicas, privadas, seed phrases e como elas protegem seus bitcoins.</p>
                <span className="text-amber-400/60 text-[10px] font-bold uppercase tracking-wider flex items-center justify-center gap-2">
                  Explorar <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="relative z-10 max-w-5xl mx-auto px-10">
        <div className="h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent" />
      </div>

      {/* ═══════════════════════════════════════════════════════════
         FAQ
      ═══════════════════════════════════════════════════════════ */}
      <section className="relative z-10 py-20 md:py-32">
        <div className="max-w-4xl mx-auto px-6 md:px-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="mb-12">
            <h2 className="text-2xl md:text-4xl font-black tracking-tight text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              PERGUNTAS <span className="text-amber-400">FREQUENTES</span>
            </h2>
          </motion.div>
          <div className="space-y-4">
            {FAQ_ITEMS.map((item, i) => (
              <motion.div key={item.q} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i * 0.08}
                className="p-6 rounded-xl border border-white/[0.06] bg-white/[0.02]"
              >
                <h4 className="text-sm font-bold text-stone-200 mb-3">{item.q}</h4>
                <p className="text-stone-500 text-xs leading-relaxed">{item.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Closing */}
      <section className="relative z-10 py-20 border-t border-white/[0.04]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
            <p className="text-stone-700 text-xs font-medium uppercase tracking-[0.4em] mb-8">Conclusão</p>
            <h3 className="text-3xl md:text-5xl font-black tracking-tight text-white mb-4 leading-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Bitcoin permite que soberania
            </h3>
            <p className="text-2xl md:text-4xl font-black tracking-tight text-amber-400 mb-12" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              atravesse fronteiras.
            </p>
            <Link to="/autocustodia"
              className="inline-flex items-center gap-3 bg-amber-500 text-white px-10 py-5 font-bold text-sm tracking-wide rounded-xl hover:bg-amber-400 hover:shadow-2xl hover:shadow-amber-500/20 hover:scale-[1.03] hover:-translate-y-1 transition-all duration-500 group"
            >
              <Key size={18} className="group-hover:rotate-12 transition-transform duration-500" /> Explorar Autocustódia Completa
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Donation CTA */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-10">
        <DonationCTA />
      </div>

      {/* Seal */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-8 border-t border-white/[0.04] text-right">
        <p className="text-stone-700 font-medium text-base tracking-tight italic">Quem carrega a chave, carrega a liberdade.</p>
      </div>
    </div>
  );
}
