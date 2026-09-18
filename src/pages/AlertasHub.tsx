import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ArrowLeft, AlertTriangle, Shield, ChevronRight, Zap,
  Eye, Lock, Landmark, TrendingDown, HelpCircle,
  ExternalLink, Skull, Fingerprint, Ban, Scale,
  ShieldAlert, Radio, Target, Crosshair, Banknote,
  KeyRound, Globe, CreditCard, MapPin,
} from 'lucide-react';
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from '@/components/ui/accordion';
import ScrollToTop from '@/components/ScrollToTop';
import FooterSection from '@/components/FooterSection';

import imgVigilancia from '@/assets/alertas-vigilancia-estatal.webp';
import imgConfisco from '@/assets/alertas-confisco-digital.webp';
import imgSaida from '@/assets/alertas-saida-soberana.webp';
import imgHipocrisia from '@/assets/alertas-hipocrisia-estado.webp';
import imgMorteDinheiro from '@/assets/alertas-morte-dinheiro.webp';
import imgTimeline from '@/assets/alertas-timeline-confisco.webp';
import BackToHome from '@/components/BackToHome';

gsap.registerPlugin(ScrollTrigger);

/* ══════════════════════════════════════════════════════════
   DATA — HIPOCRISIA DO ESTADO
══════════════════════════════════════════════════════════ */
const HIPOCRISIA = [
  {
    crime: 'Cassino',
    lei: 'Loteria',
    frase: 'Cassino é proibido. Mas se o dono for o governo e chamar de loteria, pode.',
    icon: Ban,
  },
  {
    crime: 'Pirâmide',
    lei: 'INSS',
    frase: 'Pirâmide é crime. Mas se o nome for INSS, é previdência.',
    icon: TrendingDown,
  },
  {
    crime: 'Agiotagem',
    lei: 'FGTS',
    frase: 'Agiotagem é proibida. Mas se o governo te emprestar o seu próprio FGTS a juros absurdos, é programa social.',
    icon: Banknote,
  },
  {
    crime: 'Extorsão',
    lei: 'Imposto',
    frase: 'Extorsão é crime. Mas se for via imposto, é cidadania.',
    icon: Scale,
  },
];

/* ══════════════════════════════════════════════════════════
   DATA — ALERTAS ATIVOS
══════════════════════════════════════════════════════════ */
const ALERTAS = [
  {
    slug: 'fim-do-dinheiro-vivo',
    titulo: 'O Governo Vai Abolir o Dinheiro Vivo',
    subtitulo: 'PL 3.951/2019 · CCJ · Confisco Legalizado',
    descricao: 'O PL 3.951 cria o mecanismo legal para que o CMN defina limites ao dinheiro em espécie. Hoje R$10.000. Amanhã R$1.000. Depois? R$0. A Europa já está neste caminho.',
    tag: 'LEGISLATIVO',
    status: 'ATIVO',
    icon: Landmark,
    accent: 'border-destructive/30',
    gradient: 'from-red-900/30 via-red-950/20 to-transparent',
  },
  {
    slug: 'cbdc-brasil',
    titulo: 'DREX: Seu Dinheiro Com Prazo de Validade',
    subtitulo: 'CBDC · Real Digital · Controle Programável',
    descricao: 'O DREX não é "inovação". É uma coleira digital. O governo define onde, quando e como você gasta. Seu dinheiro pode expirar. Pode ser bloqueado. Pode simplesmente desaparecer.',
    tag: 'MONETÁRIO',
    status: 'ATIVO',
    icon: Eye,
    accent: 'border-amber-600/30',
    gradient: 'from-amber-900/20 via-amber-950/10 to-transparent',
  },
  {
    slug: 'depix-reporte-2026',
    titulo: 'DePix Será Vigiado a Partir de 2026',
    subtitulo: 'Banco Central · Reporte Obrigatório · IOF Aprovado',
    descricao: 'Toda plataforma DePix será obrigada a reportar transações. O IOF sobre cripto já foi aprovado. O cerco está fechando. Quem não se moveu, vai ficar preso dentro.',
    tag: 'REGULATÓRIO',
    status: 'ATIVO',
    icon: Fingerprint,
    accent: 'border-rose-600/30',
    gradient: 'from-rose-900/20 via-rose-950/10 to-transparent',
  },
  {
    slug: 'governo-tomar-bitcoins',
    titulo: 'Nova Lei Permite Governo TOMAR Seus Bitcoins',
    subtitulo: 'Hong Kong · Segurança Nacional · Apreensão de Seeds',
    descricao: 'Hong Kong criminalizou a recusa de entregar senhas e chaves. O Brasil monitora transações cripto diariamente via IOF. Se você acha que Bitcoin é confisco-proof sem OpSec, está enganado.',
    tag: 'CONFISCO',
    status: 'ATIVO',
    icon: Skull,
    accent: 'border-red-500/40',
    gradient: 'from-red-800/30 via-red-950/20 to-transparent',
  },
];

/* ══════════════════════════════════════════════════════════
   DATA — LINHA DO TEMPO DA OPRESSÃO
══════════════════════════════════════════════════════════ */
const TIMELINE_OPRESSAO = [
  { ano: '1933', evento: 'EUA confiscam ouro', desc: 'Roosevelt assina Executive Order 6102. Posse de ouro acima de 5oz vira crime. Cidadãos são obrigados a entregar ouro ao governo a US$20.67/oz. Logo depois, o governo reprecia para US$35/oz. Roubo legalizado.' },
  { ano: '1990', evento: 'Brasil congela poupanças', desc: 'Plano Collor confisca 80% de todos os depósitos bancários. Famílias inteiras perdem economias de uma vida. Alguns morrem sem recuperar. Zero consequências para os responsáveis.' },
  { ano: '2013', evento: 'Chipre confisca depósitos', desc: 'Bail-in sem precedentes. Depósitos acima de €100.000 são confiscados para "salvar" bancos falidos. O modelo vira referência para futuros confiscos globais.' },
  { ano: '2016', evento: 'Índia elimina 86% das cédulas', desc: 'Modi anuncia desmonetização de notas de 500 e 1000 rupias. 86% do dinheiro em circulação vira papel sem valor em 4 horas. Filas quilométricas, mortes, caos.' },
  { ano: '2020', evento: 'PIX lançado no Brasil', desc: 'Infraestrutura de pagamentos instantâneos "gratuita" e totalmente rastreável. O primeiro passo para eliminar o dinheiro físico. Adoção massiva = vigilância massiva.' },
  { ano: '2022', evento: 'DREX anunciado', desc: 'Real Digital programável. O governo pode definir prazo de validade, restrições de uso e bloqueio remoto do SEU dinheiro. Não é inovação. É controle total.' },
  { ano: '2025', evento: 'PL 3.951 aprovado na CCJ', desc: 'O mecanismo legal para limitar transações em dinheiro vivo é aprovado. O CMN agora pode definir limites a qualquer momento. Sem nova votação. Sem consulta pública.' },
  { ano: '2025', evento: 'Hong Kong criminaliza recusa de entregar senhas', desc: 'Emenda à Lei de Segurança Nacional transforma em crime a recusa em entregar chaves de criptografia. Seeds, senhas e acesso a wallets viram alvo legal.' },
  { ano: '2026+', evento: 'O cerco se fecha', desc: 'DePix reportado. IOF sobre cripto. Limites ao dinheiro vivo. DREX operacional. Quem não construiu sua soberania financeira antes, estará preso dentro do sistema.' },
];

/* ══════════════════════════════════════════════════════════
   DATA — ARSENAL DE SAÍDA
══════════════════════════════════════════════════════════ */
const ARSENAL_SAIDA = [
  {
    icon: KeyRound,
    titulo: 'Autocustódia de Bitcoin',
    desc: 'Seus bitcoins numa wallet que só você controla. Sem exchange. Sem banco. Sem intermediários. Não há governo no planeta que possa acessar uma seed bem guardada.',
    link: '/autocustodia',
    cta: 'PROTOCOLO DE AUTOCUSTÓDIA',
  },
  {
    icon: Shield,
    titulo: 'Compra P2P Sem KYC',
    desc: 'Plataformas como Bisq, SpikeTuSpike e RoboSats permitem comprar Bitcoin sem entregar documentos. Sem KYC = sem registro permanente vinculado à sua identidade.',
    link: '/soberania-financeira/comprar-bitcoin-com-privacidade',
    cta: 'COMPRAR SEM RASTRO',
  },
  {
    icon: MapPin,
    titulo: 'Teoria das Bandeiras',
    desc: 'Distribua sua existência financeira entre múltiplas jurisdições. Quanto mais bandeiras, menor o risco de um único governo destruir tudo.',
    link: '/soberania-financeira/teoria-das-bandeiras',
    cta: 'DIVERSIFICAR JURISDIÇÕES',
  },
  {
    icon: Globe,
    titulo: 'Contas Internacionais',
    desc: 'Com documentação estrangeira, você abre contas em 10+ jurisdições. Cada conta é uma camada de proteção contra bloqueios e confiscos arbitrários.',
    link: '/soberania-financeira/contas-offshore',
    cta: 'ABRIR CONTAS FORA',
  },
  {
    icon: CreditCard,
    titulo: 'PIX Sem Banco',
    desc: 'Receba PIX usando Bitcoin como base, sem conta bancária, sem CPF vinculado a um banco centralizado. O ciclo completo de privacidade.',
    link: '/soberania-financeira/pix-sem-banco',
    cta: 'PIX PRIVADO',
  },
  {
    icon: Radio,
    titulo: 'Krux + Passphrase + BlueWallet',
    desc: 'Monte um setup air-gapped completo. Hardware DIY. Passphrase BIP-39. Wallet de observação. Assinatura por QR Code. Zero conexão com a internet.',
    link: '/autocustodia/krux-passphrase-bluewallet',
    cta: 'MONTAR SETUP AIR-GAP',
  },
];

/* ══════════════════════════════════════════════════════════
   DATA — FAQ (SEO de alto volume)
══════════════════════════════════════════════════════════ */
const FAQ_DATA = [
  {
    q: 'O governo pode proibir o dinheiro em espécie no Brasil?',
    a: 'Sim. O PL 3.951/2019 já foi aprovado na CCJ e cria o mecanismo legal para que o Conselho Monetário Nacional defina limites a qualquer momento, sem nova votação. Na Europa, países como França (€1.000) e Grécia (€500) já têm limites extremamente baixos. A tendência é global e irreversível.',
  },
  {
    q: 'O que é o DREX e por que ele é perigoso?',
    a: 'O DREX é a moeda digital programável do Banco Central. Diferente do PIX, o DREX substitui o próprio Real por uma moeda que o governo controla diretamente. Pode ter prazo de validade, restrições de uso, bloqueio remoto e rastreamento total de cada centavo. É a ferramenta definitiva de controle financeiro.',
  },
  {
    q: 'Bitcoin pode ser confiscado pelo governo?',
    a: 'Se pratica autocustódia correta (hardware wallet + seed + passphrase BIP-39), nenhum governo pode confiscar seus bitcoins. Porém, se estão em exchange ou se o governo obriga a entrega de chaves (como Hong Kong fez), estão vulneráveis. A proteção depende da SUA infraestrutura, não do protocolo.',
  },
  {
    q: 'Qual a diferença entre PIX e DREX?',
    a: 'O PIX é um sistema de transferência que move reais entre contas bancárias existentes. O DREX substitui o próprio Real por uma moeda digital controlada diretamente pelo Banco Central. Com DREX, o governo pode programar restrições no SEU dinheiro: onde gastar, quando gastar, e se pode gastar.',
  },
  {
    q: 'Como proteger meu patrimônio de confisco?',
    a: 'Autocustódia de Bitcoin (hardware wallet com passphrase), diversificação jurisdicional (Teoria das Bandeiras), contas internacionais, e eliminação de dependência do sistema bancário centralizado. O primeiro passo é entender que dinheiro no banco NÃO é seu: é um crédito que o banco te deve — e pode decidir não pagar.',
  },
  {
    q: 'O que aconteceu no confisco de 1990 no Brasil?',
    a: 'Em março de 1990, o governo Collor congelou 80% de TODOS os depósitos bancários e aplicações financeiras do país. De um dia para o outro, milhões de brasileiros perderam acesso ao próprio dinheiro. Pessoas morreram sem recuperar os valores. Zero responsáveis foram punidos. E o mecanismo legal para fazer isso de novo NUNCA foi revogado.',
  },
  {
    q: 'É legal comprar Bitcoin sem KYC no Brasil?',
    a: 'Comprar Bitcoin P2P (pessoa a pessoa) é completamente legal no Brasil. O Marco Legal das Criptomoedas (Lei 14.478/2022) não proíbe transações diretas. A diferença é que plataformas P2P como Bisq e RoboSats não exigem verificação de identidade (KYC), o que preserva sua privacidade financeira.',
  },
  {
    q: 'Privacidade financeira é crime?',
    a: 'Não. Privacidade é um direito fundamental garantido pela Constituição (Art. 5º, X e XII). Utilizar ferramentas legais para proteger sua privacidade financeira — como exchanges P2P, cartões sem KYC ou contas internacionais — é completamente legal. O que muda é o nível de informação que você VOLUNTARIAMENTE entrega ao Estado.',
  },
  {
    q: 'O que é autocustódia e por que ela é essencial?',
    a: '"Not your keys, not your coins." Se outra pessoa guarda seu Bitcoin — exchange, banco, custodiante — ela decide se você pode acessá-lo. Autocustódia significa que VOCÊ controla as chaves privadas. Nenhum governo, banco ou plataforma pode congelar, confiscar ou bloquear seus fundos. É a soberania financeira real.',
  },
  {
    q: 'O governo pode rastrear minhas transações de Bitcoin?',
    a: 'Transações em exchanges centralizadas (com KYC) são 100% rastreáveis. O governo sabe quem comprou, quanto e quando. Porém, Bitcoin adquirido via P2P sem KYC, usando técnicas de privacidade (CoinJoin, Liquid Network), torna o rastreamento exponencialmente mais difícil. A privacidade não é automática — precisa ser construída.',
  },
];

/* ══════════════════════════════════════════════════════════
   DATA — PRÓXIMOS ALERTAS
══════════════════════════════════════════════════════════ */
const ALERTAS_PROXIMOS = [
  { titulo: 'Imposto Global Sobre Patrimônio', subtitulo: 'OCDE · Tributação Internacional · Confisco Legalizado', tag: 'TRIBUTÁRIO', icon: TrendingDown },
  { titulo: 'Rastreamento Financeiro Total', subtitulo: 'COAF · Open Banking · Vigilância Patrimonial', tag: 'VIGILÂNCIA', icon: Lock },
  { titulo: 'Identidade Digital Obrigatória', subtitulo: 'Gov.br · Biometria · Score Social', tag: 'BIOMÉTRICO', icon: Fingerprint },
];

/* ══════════════════════════════════════════════════════════
   GSAP SECTION WRAPPER
══════════════════════════════════════════════════════════ */
const GsapSection = ({ children, className = '', id }: { children: React.ReactNode; className?: string; id?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    gsap.fromTo(ref.current,
      { opacity: 0, y: 50, filter: 'blur(8px)' },
      { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 85%', toggleActions: 'play none none none' } }
    );
    return () => { ScrollTrigger.getAll().forEach(t => { if (t.trigger === ref.current) t.kill(); }); };
  }, []);
  return <div ref={ref} id={id} className={className}>
      <div className="relative z-20 px-6 md:px-12 lg:px-20 pt-[52px]">
        <BackToHome />
      </div>
{children}</div>;
};

/* ══════════════════════════════════════════════════════════
   PAGE COMPONENT
══════════════════════════════════════════════════════════ */
export default function AlertasHub() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const { scrollYProgress } = useScroll();
  const progressWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <div className="min-h-screen bg-[#050808] text-foreground font-sans overflow-x-hidden">
      <ScrollToTop />
      <Helmet>
        <title>Alertas de Soberania: O Estado Está Vindo Pelo Seu Dinheiro | Lord Junnior</title>
        <meta name="description" content="Central de monitoramento de ameaças à sua liberdade financeira: confisco, DREX, fim do dinheiro vivo, vigilância total. Entenda a hipocrisia do Estado e proteja seu patrimônio antes que seja tarde." />
        <link rel="canonical" href="https://lordjunnior.com.br/alertas" />
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org', '@type': 'FAQPage',
          mainEntity: FAQ_DATA.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org', '@type': 'Article',
          headline: 'Alertas de Soberania: O Estado Está Vindo Pelo Seu Dinheiro',
          author: { '@type': 'Person', name: 'Lord Junnior' },
          publisher: { '@type': 'Organization', name: 'Universidade Satoshi' },
          url: 'https://lordjunnior.com.br/alertas',
          datePublished: '2025-01-15', dateModified: '2026-04-07',
        })}</script>
      </Helmet>

      {/* ── Progress Bar ── */}
      <motion.div className="fixed top-0 left-0 right-0 h-[2px] bg-destructive z-50 origin-left" style={{ width: progressWidth }} />

      {/* ── Atmospheric Layers ── */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[#050808]" />
        <div className="absolute inset-0 opacity-20" style={{ background: 'radial-gradient(ellipse 80% 50% at 30% 20%, hsl(0 60% 10%) 0%, transparent 70%), radial-gradient(ellipse 60% 40% at 80% 70%, hsl(38 60% 8%) 0%, transparent 60%)' }} />
        <div className="absolute inset-0 opacity-[0.035]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")', backgroundRepeat: 'repeat' }} />
      </div>

      <div className="relative z-10">

        {/* ══════════════════════════════════════════════════════
            SEÇÃO 1: HERO CINEMATOGRÁFICO
        ══════════════════════════════════════════════════════ */}
        <section className="relative min-h-[90vh] flex items-center overflow-hidden">
          <div className="absolute inset-0">
            <img src={imgVigilancia} alt="Sala de vigilância estatal monitorando contas bancárias" className="w-full h-full object-cover" width={1344} height={768} loading="eager" fetchPriority="high" decoding="async" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#050808] via-[#050808]/90 to-[#050808]/60" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050808] via-transparent to-[#050808]/40" />
          </div>

          <div className="relative max-w-7xl mx-auto px-6 py-28">
            <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-16 text-[10px] font-bold uppercase tracking-[0.4em] font-mono transition-colors">
              <ArrowLeft size={14} /> Voltar ao Início
            </Link>

            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-sm border border-destructive/30 bg-destructive/10 flex items-center justify-center">
                  <Skull className="w-5 h-5 text-destructive" />
                </div>
                <span className="text-destructive font-black uppercase tracking-[0.4em] text-[9px] font-mono">Central de Alertas · Nível Crítico</span>
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="font-['Inter_Tight'] font-black text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight leading-[0.9] mb-8 max-w-4xl"
            >
              O Estado Está Vindo<br />
              Pelo Seu{' '}
              <span className="text-destructive relative">
                Dinheiro
                <motion.span
                  className="absolute bottom-0 left-0 h-[3px] bg-destructive"
                  initial={{ width: 0 }} animate={{ width: '100%' }}
                  transition={{ duration: 1.2, delay: 1, ease: [0.22, 1, 0.36, 1] }}
                />
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl font-['Inter_Tight'] font-medium mb-10"
            >
              Confisco, vigilância, moeda programável, fim do dinheiro vivo.
              Não é teoria da conspiração. É legislação aprovada, infraestrutura construída
              e precedente histórico repetido.{' '}
              <span className="text-foreground font-bold">Esta página é o seu mapa de ameaças — e o caminho de saída.</span>
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-wrap gap-8 pt-8 border-t border-border/20"
            >
              {[
                { label: 'Alertas ativos', value: '04' },
                { label: 'Confiscos documentados', value: '09+' },
                { label: 'Países monitorados', value: '15+' },
                { label: 'Ferramentas de saída', value: '06' },
              ].map((s, i) => (
                <div key={i}>
                  <p className="font-['Bebas_Neue'] text-4xl text-foreground">{s.value}</p>
                  <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-muted-foreground">{s.label}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            SEÇÃO 2: A HIPOCRISIA DO ESTADO — PNL AVANÇADA
        ══════════════════════════════════════════════════════ */}
        <GsapSection id="hipocrisia" className="max-w-7xl mx-auto px-6 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Imagem */}
            <div className="relative rounded-sm overflow-hidden group">
              <img src={imgHipocrisia} alt="Hipocrisia do Estado: roleta de cassino em frente ao governo" className="w-full h-full object-cover aspect-[16/10]" loading="lazy" width={1344} height={768} />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050808] via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <p className="font-mono text-[9px] tracking-[0.3em] uppercase text-destructive/80 mb-2">Contradição documentada</p>
                <p className="text-foreground/90 text-sm font-['Inter_Tight'] font-semibold italic leading-relaxed">
                  "Quando o Estado faz, é 'lei'. Quando você faz, é 'crime'."
                </p>
              </div>
            </div>

            {/* Copy PNL */}
            <div>
              <p className="font-mono text-[9px] tracking-[0.3em] uppercase text-destructive/70 mb-4">Desaprendizagem obrigatória</p>
              <h2 className="font-['Bebas_Neue'] text-4xl md:text-5xl tracking-tight uppercase mb-6 leading-[1.05]">
                O Crime Que Só É Crime<br />
                <span className="text-destructive">Quando Você Comete</span>
              </h2>

              <div className="space-y-4 mb-8">
                {HIPOCRISIA.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: i * 0.1 }}
                      className="relative bg-white/[0.02] border border-border/30 rounded-sm p-5 hover:border-destructive/30 transition-colors group/card"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-sm bg-destructive/10 flex items-center justify-center shrink-0">
                          <Icon className="w-4 h-4 text-destructive" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="text-[8px] font-black uppercase tracking-[0.3em] text-destructive/60 font-mono bg-destructive/5 px-2 py-0.5 rounded-sm">
                              {item.crime} → {item.lei}
                            </span>
                          </div>
                          <p className="text-foreground/90 text-sm font-['Inter_Tight'] font-medium leading-relaxed">
                            {item.frase}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              <div className="bg-white/[0.03] border border-primary/20 rounded-sm p-6">
                <p className="text-foreground font-['Inter_Tight'] font-bold text-base leading-relaxed mb-2">
                  Engraçado, não é?
                </p>
                <p className="text-muted-foreground text-sm leading-relaxed font-['Inter_Tight']">
                  Quando o Estado faz, é "lei". Quando você faz, é "crime". E o pior: você foi treinado desde criança para achar isso <span className="text-primary font-bold">normal</span>.
                  Esta página existe para quebrar esse condicionamento.
                </p>
              </div>
            </div>
          </div>
        </GsapSection>

        {/* ── Separator: Cinematic Break ── */}
        <div className="relative h-64 overflow-hidden">
          <img src={imgMorteDinheiro} alt="Cédula de Real em chamas — morte do dinheiro físico" className="w-full h-full object-cover" loading="lazy" width={1344} height={768} />
          <div className="absolute inset-0 bg-gradient-to-b from-[#050808] via-[#050808]/40 to-[#050808]" />
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="font-['Bebas_Neue'] text-3xl md:text-5xl tracking-tight uppercase text-foreground/80 text-center px-6">
              Seu dinheiro está <span className="text-destructive">queimando</span>. Você só não vê as chamas.
            </p>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════
            SEÇÃO 3: ALERTAS ATIVOS — MEDO RACIONAL
        ══════════════════════════════════════════════════════ */}
        <GsapSection id="alertas" className="max-w-7xl mx-auto px-6 py-20">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-3 h-3 relative">
              <span className="absolute inset-0 rounded-full bg-destructive animate-ping opacity-40" />
              <span className="relative block w-3 h-3 rounded-full bg-destructive" />
            </div>
            <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-destructive/80">Ameaças ativas · Monitoramento em tempo real</p>
          </div>
          <h2 className="font-['Bebas_Neue'] text-4xl md:text-6xl tracking-tight uppercase mb-3 leading-[0.95]">
            Dossiê de <span className="text-destructive">Ameaças</span>
          </h2>
          <p className="text-muted-foreground text-base leading-relaxed max-w-2xl font-['Inter_Tight'] mb-12">
            Cada alerta é uma página dedicada com contexto histórico, dados internacionais, análise jurídica
            e ferramentas práticas de proteção. Não é opinião — é documentação.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {ALERTAS.map((alerta, i) => {
              const Icon = alerta.icon;
              return (
                <motion.div
                  key={alerta.slug}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                >
                  <Link
                    to={`/alertas/${alerta.slug}`}
                    className={`block h-full bg-white/[0.02] border ${alerta.accent} rounded-sm overflow-hidden hover:bg-white/[0.04] transition-all duration-300 group relative`}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${alerta.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                    <div className="relative p-7 md:p-8">
                      <div className="flex items-center gap-3 mb-5">
                        <span className="text-[8px] font-black uppercase tracking-[0.3em] text-destructive font-mono bg-destructive/10 px-2.5 py-1 rounded-sm">{alerta.tag}</span>
                        <span className="inline-flex items-center gap-1.5 text-[8px] font-black uppercase tracking-[0.3em] text-amber-500 font-mono">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                          {alerta.status}
                        </span>
                      </div>
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-sm border border-border/40 bg-white/[0.03] flex items-center justify-center shrink-0">
                          <Icon className="w-5 h-5 text-muted-foreground group-hover:text-destructive transition-colors" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-foreground font-bold text-lg md:text-xl tracking-tight mb-2 group-hover:text-destructive transition-colors font-['Inter_Tight']">
                            {alerta.titulo}
                          </h3>
                          <p className="text-muted-foreground/50 text-[10px] font-bold uppercase tracking-wider font-mono mb-3">{alerta.subtitulo}</p>
                          <p className="text-muted-foreground text-sm leading-relaxed font-['Inter_Tight']">{alerta.descricao}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 mt-5 text-primary text-xs font-bold uppercase tracking-wider font-mono group-hover:gap-3 transition-all">
                        <span>Acessar dossiê completo</span>
                        <ChevronRight size={14} />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </GsapSection>

        {/* ══════════════════════════════════════════════════════
            SEÇÃO 4: CONFISCO DIGITAL — IMAGEM + COPY
        ══════════════════════════════════════════════════════ */}
        <GsapSection className="max-w-7xl mx-auto px-6 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="font-mono text-[9px] tracking-[0.3em] uppercase text-destructive/70 mb-4">Precedente histórico</p>
              <h2 className="font-['Bebas_Neue'] text-4xl md:text-5xl tracking-tight uppercase mb-6 leading-[1.05]">
                Eles Já Fizeram Isso<br />
                <span className="text-destructive">Antes</span>
              </h2>
              <p className="text-muted-foreground text-base leading-8 font-['Inter_Tight'] mb-6">
                Em 1990, o governo brasileiro <span className="text-foreground font-bold">congelou 80% de todos os depósitos bancários</span> do país.
                De um dia para o outro. Sem aviso. Sem consulta.
                Famílias inteiras perderam as economias de uma vida.
                Pessoas morreram sem recuperar seus valores.
              </p>
              <p className="text-muted-foreground text-base leading-8 font-['Inter_Tight'] mb-6">
                Em 2013, Chipre fez a mesma coisa. Em 2016, a Índia eliminou 86% das cédulas em circulação.
                Em 2025, Hong Kong criminalizou a recusa de entregar senhas e chaves de criptografia.
              </p>
              <p className="text-foreground text-base leading-8 font-['Inter_Tight'] font-bold mb-8">
                Isto não é história antiga. É o manual de operações que está sendo executado agora, neste momento, contra você.
              </p>

              <Link
                to="/confisco-1990"
                className="inline-flex items-center gap-2 bg-destructive/10 border border-destructive/30 text-destructive font-bold text-sm uppercase tracking-wider px-6 py-3 rounded-sm hover:bg-destructive/20 transition-colors"
              >
                <Skull size={16} />
                <span>Ver dossiê completo do confisco de 1990</span>
              </Link>
            </div>

            <div className="relative rounded-sm overflow-hidden">
              <img src={imgConfisco} alt="Mãos acorrentadas segurando celular com conta bancária bloqueada" className="w-full h-full object-cover aspect-[16/10]" loading="lazy" width={1344} height={768} />
              <div className="absolute inset-0 bg-gradient-to-l from-transparent to-[#050808]/30" />
            </div>
          </div>
        </GsapSection>

        {/* ══════════════════════════════════════════════════════
            SEÇÃO 5: LINHA DO TEMPO DA OPRESSÃO FINANCEIRA
        ══════════════════════════════════════════════════════ */}
        <GsapSection id="timeline" className="py-20 relative">
          {/* Background image */}
          <div className="absolute inset-0 opacity-10">
            <img src={imgTimeline} alt="" className="w-full h-full object-cover" loading="lazy" width={1344} height={768} />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-[#050808] via-[#050808]/95 to-[#050808]" />

          <div className="relative max-w-5xl mx-auto px-6">
            <p className="font-mono text-[9px] tracking-[0.3em] uppercase text-destructive/70 mb-4">Cronologia da opressão</p>
            <h2 className="font-['Bebas_Neue'] text-4xl md:text-6xl tracking-tight uppercase mb-4 leading-[0.95]">
              Linha do Tempo:<br />
              <span className="text-destructive">O Cerco Se Fecha</span>
            </h2>
            <p className="text-muted-foreground text-base font-['Inter_Tight'] leading-relaxed max-w-2xl mb-14">
              Cada evento não é isolado. É um degrau calculado numa escada de controle que começou há quase 100 anos
              e está acelerando exponencialmente.
            </p>

            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-4 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-destructive/50 via-destructive/20 to-transparent" />

              <div className="space-y-8">
                {TIMELINE_OPRESSAO.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.5, delay: i * 0.06 }}
                    className="relative pl-12 md:pl-20"
                  >
                    {/* Dot */}
                    <div className="absolute left-2.5 md:left-6.5 top-2 w-3 h-3 rounded-full bg-destructive/60 border-2 border-[#050808]" />

                    <div className="bg-white/[0.02] border border-border/30 rounded-sm p-6 hover:border-destructive/20 transition-colors">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="font-['Bebas_Neue'] text-2xl text-destructive">{item.ano}</span>
                        <span className="text-foreground font-['Inter_Tight'] font-bold text-sm">{item.evento}</span>
                      </div>
                      <p className="text-muted-foreground text-sm leading-relaxed font-['Inter_Tight']">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </GsapSection>

        {/* ══════════════════════════════════════════════════════
            SEÇÃO 6: O ANTÍDOTO — ARSENAL DE SAÍDA
        ══════════════════════════════════════════════════════ */}
        <GsapSection id="arsenal" className="max-w-7xl mx-auto px-6 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-14">
            <div>
              <p className="font-mono text-[9px] tracking-[0.3em] uppercase text-primary/70 mb-4">O antídoto</p>
              <h2 className="font-['Bebas_Neue'] text-4xl md:text-6xl tracking-tight uppercase mb-6 leading-[0.95]">
                Arsenal de<br />
                <span className="text-primary">Saída Soberana</span>
              </h2>
              <p className="text-muted-foreground text-base leading-8 font-['Inter_Tight'] mb-6">
                O medo sem ação é paralisante. O medo com <span className="text-foreground font-bold">ferramentas</span> é libertador.
                Cada item abaixo é uma rota de escape testada, documentada e implementável hoje.
              </p>
              <p className="text-foreground text-sm leading-relaxed font-['Inter_Tight'] font-bold italic border-l-2 border-primary/50 pl-4">
                "Não espere o confisco para construir sua fortaleza. O melhor momento foi ontem. O segundo melhor é agora."
              </p>
            </div>
            <div className="relative rounded-sm overflow-hidden">
              <img src={imgSaida} alt="Pessoa caminhando em direção ao Bitcoin — saída soberana" className="w-full h-full object-cover aspect-[16/10]" loading="lazy" width={1344} height={768} />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050808] via-transparent to-transparent" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {ARSENAL_SAIDA.map((tool, i) => {
              const Icon = tool.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                >
                  <Link
                    to={tool.link}
                    className="block h-full bg-white/[0.02] border border-border/30 rounded-sm p-7 hover:border-primary/30 hover:bg-white/[0.04] transition-all duration-300 group"
                  >
                    <div className="w-11 h-11 rounded-sm bg-primary/10 border border-primary/20 flex items-center justify-center mb-5">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="text-foreground font-bold text-lg tracking-tight mb-3 font-['Inter_Tight'] group-hover:text-primary transition-colors">
                      {tool.titulo}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed font-['Inter_Tight'] mb-5">{tool.desc}</p>
                    <span className="inline-flex items-center gap-2 text-primary text-[10px] font-black uppercase tracking-[0.2em] font-mono group-hover:gap-3 transition-all">
                      {tool.cta} <ChevronRight size={12} />
                    </span>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </GsapSection>

        {/* ══════════════════════════════════════════════════════
            SEÇÃO 7: CTA PREMIUM — CONVERSÃO
        ══════════════════════════════════════════════════════ */}
        <GsapSection className="max-w-7xl mx-auto px-6 py-20">
          <div className="relative overflow-hidden rounded-sm border border-primary/20 bg-gradient-to-br from-primary/[0.08] via-white/[0.02] to-transparent">
            {/* Animated border */}
            <div className="absolute inset-0 rounded-sm" style={{ background: 'conic-gradient(from var(--angle, 0deg), transparent, hsl(var(--primary) / 0.15), transparent)', animation: 'spin 8s linear infinite' }} />

            <div className="relative p-10 md:p-16">
              <div className="absolute top-8 right-8 w-4 h-4">
                <span className="absolute inset-0 rounded-full bg-primary animate-ping opacity-30" />
                <span className="relative block w-4 h-4 rounded-full bg-primary" />
              </div>

              <div className="max-w-3xl">
                <div className="flex items-center gap-3 mb-6">
                  <Shield className="w-6 h-6 text-primary" />
                  <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-primary/80">Protocolo de blindagem patrimonial</span>
                </div>

                <h2 className="font-['Bebas_Neue'] text-4xl md:text-6xl tracking-tight uppercase mb-6 leading-[0.95]">
                  O Confisco Não Avisa.<br />
                  <span className="text-primary">A Preparação Sim.</span>
                </h2>

                <p className="text-muted-foreground text-base md:text-lg leading-relaxed font-['Inter_Tight'] mb-4">
                  Em 1990, ninguém foi avisado. Os que sobreviveram financeiramente foram os que tinham ouro, dólar e ativos fora do sistema.
                  Hoje, o equivalente é <span className="text-foreground font-bold">Bitcoin em autocustódia</span>,
                  <span className="text-foreground font-bold"> contas em múltiplas jurisdições</span> e
                  <span className="text-foreground font-bold"> infraestrutura de privacidade</span>.
                </p>
                <p className="text-foreground font-bold text-base md:text-lg font-['Inter_Tight'] mb-10">
                  O erro que quase todos cometem: acreditar que "comigo não vai acontecer".
                </p>

                <div className="flex flex-wrap gap-4">
                  <Link
                    to="/bitcoin"
                    className="group relative inline-flex items-center gap-2 bg-primary text-primary-foreground font-bold text-sm uppercase tracking-wider px-8 py-4 rounded-sm overflow-hidden transition-all hover:shadow-[0_0_40px_hsl(var(--primary)/0.3)]"
                  >
                    <span className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                    <span className="relative">BLINDAR MEU PATRIMÔNIO</span>
                    <ExternalLink size={14} className="relative" />
                  </Link>
                  <Link
                    to="/autocustodia"
                    className="inline-flex items-center gap-2 border border-primary/30 text-primary font-bold text-sm uppercase tracking-wider px-8 py-4 rounded-sm hover:bg-primary/10 transition-colors"
                  >
                    PROTOCOLO DE AUTOCUSTÓDIA
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </GsapSection>

        {/* ══════════════════════════════════════════════════════
            SEÇÃO 8: PRÓXIMOS ALERTAS — EM PRODUÇÃO
        ══════════════════════════════════════════════════════ */}
        <GsapSection className="max-w-7xl mx-auto px-6 pb-20">
          <div className="flex items-center gap-3 mb-8">
            <Zap className="text-amber-500" size={16} />
            <span className="text-amber-500 font-black uppercase tracking-[0.3em] text-[9px] font-mono">Próximos alertas · Em produção</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {ALERTAS_PROXIMOS.map((alerta, i) => {
              const Icon = alerta.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="border border-dashed border-border/30 rounded-sm p-7 hover:border-border/60 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-sm border border-border/30 bg-white/[0.02] flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4 text-muted-foreground/50" />
                    </div>
                    <div>
                      <span className="text-[8px] font-black uppercase tracking-[0.3em] text-muted-foreground/40 font-mono">{alerta.tag}</span>
                      <h3 className="text-foreground/60 font-bold uppercase text-sm tracking-tight mt-2 mb-1 font-['Inter_Tight']">{alerta.titulo}</h3>
                      <p className="text-muted-foreground/30 text-[10px] font-bold uppercase tracking-wider font-mono">{alerta.subtitulo}</p>
                      <div className="flex items-center gap-1.5 mt-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500/50 animate-pulse" />
                        <span className="text-amber-500/50 text-[8px] font-black uppercase tracking-[0.3em] font-mono">Em produção</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </GsapSection>

        {/* ══════════════════════════════════════════════════════
            SEÇÃO 9: FAQ — SEO + CONVERSÃO
        ══════════════════════════════════════════════════════ */}
        <GsapSection id="faq" className="max-w-5xl mx-auto px-6 pb-20">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-sm border border-primary/20 bg-primary/5 flex items-center justify-center">
              <HelpCircle className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-primary/60">Perguntas frequentes</p>
              <h2 className="font-['Bebas_Neue'] text-3xl md:text-4xl tracking-tight uppercase">
                O Que Você Precisa Saber
              </h2>
            </div>
          </div>
          <div className="h-px bg-gradient-to-r from-primary/30 via-border/50 to-transparent mb-8" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3">
            {FAQ_DATA.map((faq, i) => (
              <Accordion key={i} type="single" collapsible>
                <AccordionItem
                  value={`faq-${i}`}
                  className="border border-border/30 rounded-sm bg-white/[0.02] px-5 data-[state=open]:border-primary/20 transition-colors"
                >
                  <AccordionTrigger className="text-left text-sm font-semibold hover:no-underline py-4 text-foreground/90 font-['Inter_Tight']">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-sm leading-relaxed pb-5 font-['Inter_Tight']">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            ))}
          </div>
        </GsapSection>

        {/* ══════════════════════════════════════════════════════
            SEÇÃO 10: MANIFESTO DE ENCERRAMENTO
        ══════════════════════════════════════════════════════ */}
        <GsapSection className="max-w-4xl mx-auto px-6 pb-20 text-center">
          <div className="h-px bg-gradient-to-r from-transparent via-destructive/30 to-transparent mb-16" />

          <p className="font-mono text-[9px] tracking-[0.4em] uppercase text-destructive/60 mb-6">Manifesto final</p>
          <h2 className="font-['Bebas_Neue'] text-3xl md:text-5xl tracking-tight uppercase mb-8 leading-[1.05]">
            O Sistema Não Está Quebrado.<br />
            <span className="text-destructive">Está Funcionando Exatamente Como Planejado.</span>
          </h2>
          <p className="text-muted-foreground text-base md:text-lg leading-relaxed font-['Inter_Tight'] max-w-2xl mx-auto mb-6">
            Cada imposto, cada restrição, cada lei de "segurança" é um degrau numa escada de controle
            construída ao longo de décadas. O objetivo nunca foi te proteger.
            Foi te domesticar financeiramente.
          </p>
          <p className="text-foreground text-base md:text-lg leading-relaxed font-['Inter_Tight'] font-bold max-w-2xl mx-auto mb-12">
            A única pergunta que importa: você vai continuar pedindo permissão para usar o seu próprio dinheiro?
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-16">
            <Link
              to="/bitcoin"
              className="group relative inline-flex items-center gap-2 bg-foreground text-background font-bold text-sm uppercase tracking-wider px-8 py-4 rounded-sm overflow-hidden"
            >
              <span className="absolute inset-0 bg-primary/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              <span className="relative">REIVINDICAR MINHA SOBERANIA</span>
              <ExternalLink size={14} className="relative" />
            </Link>
          </div>

          <p className="text-muted-foreground/30 text-[9px] font-black tracking-[0.5em] uppercase font-mono">
            EXIT_BRAZIL // PROTOCOLO_LIBERDADE // LORD_JUNNIOR
          </p>
        </GsapSection>

        {/* ── Footer ── */}
        <FooterSection />
      </div>
    </div>
  );
}
