import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { ArrowRight, Shield, AlertTriangle, Lock, Key, ExternalLink } from 'lucide-react';
import BackToHome from '@/components/BackToHome';
import ScrollToTop from '@/components/ScrollToTop';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

import heroImg from '@/assets/multisig-hero.jpg';
import keysImg from '@/assets/multisig-keys.jpg';
import vaultImg from '@/assets/multisig-vault.jpg';
import disasterImg from '@/assets/multisig-disaster.jpg';
import casaImg from '@/assets/multisig-casa.jpg';
import casaAppImg from '@/assets/multisig-casa-app.png';

const APPLE_EASE = [0.22, 1, 0.36, 1] as const;
const fadeUp = (i: number) => ({
  hidden: { opacity: 0, y: 30, filter: 'blur(6px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.7, ease: APPLE_EASE, delay: i * 0.12 } },
});
const scaleIn = (i: number) => ({
  hidden: { opacity: 0, scale: 0.92, filter: 'blur(8px)' },
  visible: { opacity: 1, scale: 1, filter: 'blur(0px)', transition: { duration: 0.8, ease: APPLE_EASE, delay: i * 0.15 } },
});

const CASA_URL = 'https://casa.io';

const faqItems = [
  {
    question: 'Multisig funciona com qualquer carteira Bitcoin?',
    answer: 'Nem todas as carteiras suportam Multisig nativamente. Carteiras como Sparrow Wallet, Electrum, BlueWallet (parcial) e serviços como Casa e Unchained oferecem suporte completo. Hardware wallets como Ledger, Trezor, Coldcard, Keystone e Passport podem participar como signatários individuais dentro de um esquema Multisig.',
  },
  {
    question: 'Posso usar a mesma seed phrase da minha hardware wallet single-sig na Multisig?',
    answer: 'Sim. Você pode reutilizar uma seed existente como uma das chaves do quórum Multisig. Porém, ao criar o endereço Multisig, será gerado um novo caminho de derivação. Isso significa que você precisará transferir os fundos da sua carteira single-sig para o novo endereço Multisig.',
  },
  {
    question: 'E se eu perder uma das chaves da minha Multisig 2-de-3?',
    answer: 'Se você perder uma das três chaves em um esquema 2-de-3, você ainda mantém acesso total ao seu saldo usando as duas chaves restantes. Por isso a Multisig existe: para que a perda de um ponto não signifique a perda total. Após recuperar o acesso, é recomendável migrar os fundos para um novo endereço Multisig com três chaves novas.',
  },
  {
    question: 'A empresa que guarda uma das chaves pode roubar meu Bitcoin?',
    answer: 'Não. Em um esquema 2-de-3 onde a empresa detém apenas uma das chaves, ela não possui o quórum necessário para movimentar os fundos. Ela precisa da sua autorização (segunda chave) para qualquer transação. Serviços como a Casa foram projetados exatamente para essa finalidade: servir como um ponto de recuperação sem custódia.',
  },
  {
    question: 'Multisig protege contra ataques de chave inglesa ($5 wrench attack)?',
    answer: 'Parcialmente. Se as chaves estiverem geograficamente separadas, um atacante que te ameaça fisicamente só terá acesso à chave que está com você naquele momento. As demais chaves estarão em localizações diferentes ou com terceiros de confiança. Além disso, serviços como a Casa exigem perguntas de segurança e aplicam um delay de dias antes de co-assinar, o que inviabiliza ataques sob coerção.',
  },
  {
    question: 'Multisig é a mesma coisa que Shamir Backup?',
    answer: 'Não. Shamir Backup (SLIP-39) divide uma única seed em fragmentos, enquanto Multisig usa chaves completamente independentes. A diferença é crucial: no Shamir, quando você reconstrói os fragmentos, volta a ter uma chave única (ponto único de falha). Na Multisig, as chaves nunca se encontram no mesmo lugar ao mesmo tempo, eliminando permanentemente o ponto único de falha.',
  },
  {
    question: 'Qual a diferença entre Multisig e Passphrase (BIP-39)?',
    answer: 'A Passphrase cria uma carteira oculta derivada da mesma seed, funcionando como uma segunda camada de segurança. A Multisig cria um endereço que exige múltiplas chaves independentes. São estratégias complementares: você pode usar uma Passphrase em cada uma das chaves do seu Multisig para segurança máxima.',
  },
  {
    question: 'Posso configurar herança com Multisig?',
    answer: 'Sim, e esse é um dos casos de uso mais poderosos. Em um esquema 2-de-3, você pode distribuir as chaves entre você, um herdeiro e um serviço de recuperação. Se algo acontecer com você, o herdeiro usa a chave dele mais a chave do serviço para acessar os fundos. Serviços como a Casa oferecem planos específicos de herança Bitcoin com protocolo documentado.',
  },
  {
    question: 'Quanto custa configurar uma Multisig?',
    answer: 'Você pode configurar uma Multisig gratuitamente usando softwares como Sparrow Wallet com suas próprias hardware wallets. Serviços assistidos como a Casa cobram uma assinatura anual (a partir de US$250/ano) e oferecem custódia de uma das chaves, suporte técnico e protocolo de herança. A Casa oferece 1 mês grátis para teste.',
  },
  {
    question: 'A Multisig funciona com Lightning Network?',
    answer: 'Não diretamente. A Lightning Network opera com canais de pagamento que utilizam esquemas de assinatura diferentes (2-de-2 específico). A Multisig é ideal para cold storage de grandes quantias on-chain, enquanto a Lightning é para transações rápidas do dia a dia. Recomenda-se usar ambas: Multisig para reserva de valor e Lightning para gastos correntes.',
  },
];

const MultisigBitcoin = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => { window.scrollTo(0, 0); }, []);
  useEffect(() => {
    const handleScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(total > 0 ? Math.min((window.scrollY / total) * 100, 100) : 0);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: 'Multisig Bitcoin: O Que E, Como Funciona e Como Proteger Seu BTC',
    description: 'Guia completo sobre carteiras Multisig (multi assinatura) para Bitcoin. Entenda como eliminar o ponto unico de falha, configuracoes 2-de-3 e 3-de-5, e como servicos como Casa aumentam sua seguranca sem custodia.',
    author: { '@type': 'Person', name: 'Lord Junnior' },
    publisher: { '@type': 'Organization', name: 'Arsenal de Soberania', url: 'https://lordjunnior.com.br' },
    datePublished: '2026-04-14',
    url: 'https://lordjunnior.com.br/multisig-bitcoin',
    image: 'https://lordjunnior.com.br/og-multisig.jpg',
    mainEntityOfPage: 'https://lordjunnior.com.br/multisig-bitcoin',
    articleSection: 'Autocustodia Bitcoin',
    keywords: 'multisig, multi assinatura, bitcoin seguranca, autocustodia, 2-de-3, hardware wallet, Casa app, heranca bitcoin, seed phrase, cold storage',
  };

  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'Como Configurar Multisig Bitcoin com Casa',
    description: 'Passo a passo para criar sua primeira carteira Multisig 2-de-3 usando o servico Casa.',
    step: [
      { '@type': 'HowToStep', name: 'Baixar o app Casa', text: 'Baixe o aplicativo Casa no seu smartphone e crie uma conta.' },
      { '@type': 'HowToStep', name: 'Conectar Mobile Key', text: 'Configure a chave mobile que fica armazenada no seu celular.' },
      { '@type': 'HowToStep', name: 'Conectar Hardware Wallet', text: 'Conecte sua hardware wallet (Ledger, Trezor, Coldcard etc.) ao setup.' },
      { '@type': 'HowToStep', name: 'Configurar Recovery Key', text: 'Configure a chave de recuperacao com perguntas de seguranca. A Casa guarda esta chave.' },
      { '@type': 'HowToStep', name: 'Transferir fundos', text: 'Envie seus Bitcoin para o novo endereco Multisig e guarde bem suas chaves.' },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map(item => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  };

  return (
    <div className="min-h-screen text-stone-100 font-sans selection:bg-amber-300/50 relative overflow-hidden" style={{ background: '#050808' }}>
      <Helmet>
        <title>Multisig Bitcoin: Elimine o Ponto Unico de Falha | Lord Junnior</title>
        <meta name="description" content="Guia definitivo sobre Multisig (multi assinatura) para Bitcoin. Aprenda a proteger seu BTC com redundancia, resiliencia e configuracoes 2-de-3. Passo a passo com Casa." />
        <meta name="keywords" content="multisig bitcoin, multi assinatura, carteira multisig, 2-de-3, 3-de-5, autocustodia bitcoin, seed phrase seguranca, hardware wallet multisig, casa app bitcoin, heranca bitcoin, cold storage, bitcoin security, multisignature wallet, self custody, bitcoin vault, wrench attack protection, key management, bitcoin inheritance, shamir backup vs multisig" />
        <link rel="canonical" href="https://lordjunnior.com.br/multisig-bitcoin" />
        <meta property="og:title" content="Multisig Bitcoin: A Forma Mais Segura de Proteger Seu BTC" />
        <meta property="og:description" content="Se voce depende de uma unica seed phrase, esta a um desastre de perder tudo. Multisig elimina o ponto unico de falha." />
        <meta property="og:url" content="https://lordjunnior.com.br/multisig-bitcoin" />
        <meta property="og:type" content="article" />
        <meta property="article:section" content="Autocustodia" />
        <meta property="article:author" content="Lord Junnior" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large" />
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(howToSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>
      <ScrollToTop />

      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-[3px]">
        <div className="h-full transition-all duration-150 ease-out" style={{ width: `${scrollProgress}%`, background: 'linear-gradient(90deg, #f59e0b, #eab308)' }} />
      </div>

      {/* Film Grain */}
      <div className="fixed inset-0 pointer-events-none z-[1]">
        <div className="absolute inset-0 opacity-[0.035]" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=\"0 0 256 256\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cfilter id=\"n\"%3E%3CfeTurbulence type=\"fractalNoise\" baseFrequency=\"0.9\" numOctaves=\"4\" stitchTiles=\"stitch\"/%3E%3C/filter%3E%3Crect width=\"100%25\" height=\"100%25\" filter=\"url(%23n)\"/%3E%3C/svg%3E')", backgroundSize: '128px 128px' }} />
      </div>

      {/* HERO — Full Bleed */}
      <div className="relative w-full h-[90vh] min-h-[600px] overflow-hidden">
        <img src={heroImg} alt="Hardware wallets em formacao de seguranca Multisig Bitcoin" className="absolute inset-0 w-full h-full object-cover" width={1920} height={1080} loading="eager" fetchPriority="high" decoding="async" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050808] via-[#050808]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050808]/40 to-transparent" />

        <div className="absolute top-6 left-6 md:left-12 z-20">
          <BackToHome />
        </div>

        <div className="absolute bottom-0 left-0 right-0 px-6 md:px-12 lg:px-20 pb-16 md:pb-24 z-10">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: APPLE_EASE }}>
            <p className="font-mono text-[10px] tracking-[0.5em] text-amber-500/80 uppercase mb-4">Autocustodia Avancada</p>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white tracking-tight leading-[1.05] max-w-4xl" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
              MULTISIG: NUNCA MAIS DEPENDA<br />
              <span className="text-amber-400">DE UMA UNICA CHAVE</span>
            </h1>
            <p className="text-stone-400 text-lg md:text-xl leading-relaxed mt-6 max-w-2xl">
              Se toda a sua riqueza em Bitcoin depende de uma lista de 12 ou 24 palavras guardada em um unico lugar, voce esta apostando sua liberdade financeira na sorte.
            </p>
          </motion.div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 lg:px-16 pt-16 pb-32">

        {/* ══════════════════ CAPITULO 01 — O Problema ══════════════════ */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} className="mb-28">
          <motion.div variants={fadeUp(0)} className="mb-10">
            <span className="text-[10px] font-bold tracking-[0.5em] uppercase text-amber-500/60">Capitulo 01</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white mt-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              O Problema Que Ninguem Te Conta
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <motion.div variants={scaleIn(1)} className="space-y-6 text-stone-400 leading-relaxed text-base">
              <p>
                Bitcoin te deu algo que nenhum banco jamais ofereceu: a capacidade de ser o seu proprio banco. Sem intermediarios, sem horario de funcionamento, sem fronteiras. Mas essa liberdade veio com uma responsabilidade que a maioria subestima.
              </p>
              <p>
                Pense assim: <span className="text-white font-semibold">voce acabou de construir um cofre indestruticel</span>. Nenhum exercito do mundo consegue arromba-lo. Nenhum hacker consegue invadi-lo. Mas a chave desse cofre? E um pedaco de papel com 24 palavras. Um unico pedaco de papel.
              </p>
              <p>
                Se a sua casa pega fogo, o papel queima. Se alguem invade sua casa e te ameaca, voce entrega. Se uma inundacao atinge seu bairro, o papel desaparece. O cofre continua intacto. O Bitcoin continua la. Mas voce perdeu o acesso para sempre.
              </p>
              <div className="bg-red-500/[0.06] border border-red-500/20 rounded-xl p-6">
                <p className="text-red-400 font-semibold text-sm mb-2">A verdade desconfortavel:</p>
                <p className="text-stone-300 text-sm leading-relaxed">
                  A maior causa de perda de Bitcoin no mundo nao e hacker, nao e virus e nao e desastre natural. E o proprio usuario supervalorizar sua capacidade de guardar uma unica lista de palavras. Backup inexistente, telefone que morreu, senha que "eu lembro" mas nao lembra.
                </p>
              </div>
            </motion.div>

            <motion.div variants={scaleIn(2)} className="relative rounded-2xl overflow-hidden">
              <img src={disasterImg} alt="Cofre resistente ao fogo protegendo Bitcoin de desastres" className="w-full h-auto rounded-2xl" loading="lazy" width={1024} height={1024} />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050808]/60 to-transparent rounded-2xl" />
              <div className="absolute bottom-4 left-4 right-4">
                <p className="text-stone-500 text-[10px] font-mono tracking-wider uppercase">Cenario real: incendio destruiu tudo, mas o cofre resistiu. E se o papel com sua seed estivesse dentro?</p>
              </div>
            </motion.div>
          </div>
        </motion.section>

        <div className="w-full h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent mb-28" />

        {/* ══════════════════ CAPITULO 02 — A Analogia do Cofre ══════════════════ */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} className="mb-28">
          <motion.div variants={fadeUp(0)} className="mb-10">
            <span className="text-[10px] font-bold tracking-[0.5em] uppercase text-amber-500/60">Capitulo 02</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white mt-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              O Cofre Com Tres Fechaduras
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <motion.div variants={scaleIn(1)} className="relative rounded-2xl overflow-hidden order-1 lg:order-none">
              <img src={vaultImg} alt="Cofre industrial com tres fechaduras independentes representando Multisig 2-de-3" className="w-full h-auto rounded-2xl" loading="lazy" width={1024} height={1024} />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050808]/50 to-transparent rounded-2xl" />
            </motion.div>

            <motion.div variants={scaleIn(2)} className="space-y-6 text-stone-400 leading-relaxed text-base">
              <p>
                Imagine um cofre que nao tem uma fechadura, mas <span className="text-amber-400 font-semibold">tres</span>. Para abri-lo, voce nao precisa de todas as tres chaves, apenas de <span className="text-white font-semibold">duas quaisquer</span>. Isso e Multisig.
              </p>
              <p>
                Multisig e a abreviacao de <span className="text-white font-semibold">multi-signature</span> (multiplas assinaturas). Em vez de um unico conjunto de 24 palavras controlando todo o seu saldo, voce cria um endereco que exige a assinatura de pelo menos duas chaves privadas para autorizar qualquer movimentacao.
              </p>
              <div className="bg-amber-500/[0.04] border border-amber-500/15 rounded-xl p-6 space-y-4">
                <h4 className="text-white font-bold text-sm" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Como funciona na pratica:</h4>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-amber-400 font-bold text-xs">N</span>
                    </div>
                    <p className="text-stone-300 text-sm"><span className="text-white font-semibold">N = total de chaves.</span> Voce define quantas chaves existem no seu setup.</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-amber-400 font-bold text-xs">M</span>
                    </div>
                    <p className="text-stone-300 text-sm"><span className="text-white font-semibold">M = assinaturas necessarias.</span> Quantas dessas chaves precisam assinar para gastar.</p>
                  </div>
                </div>
              </div>

              {/* Configurations Grid */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { config: '2-de-3', desc: 'Mais popular. Equilibra seguranca e praticidade.', highlight: true },
                  { config: '3-de-5', desc: 'Alta redundancia para grandes valores.' },
                  { config: '2-de-2', desc: 'Duas assinaturas obrigatorias. Zero margem.' },
                ].map((item) => (
                  <div key={item.config} className={`rounded-xl p-4 text-center ${item.highlight ? 'bg-amber-500/[0.08] border border-amber-500/25' : 'bg-white/[0.03] border border-white/[0.06]'}`}>
                    <p className={`font-bold text-lg ${item.highlight ? 'text-amber-400' : 'text-white'}`} style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{item.config}</p>
                    <p className="text-stone-500 text-[11px] mt-1 leading-snug">{item.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.section>

        <div className="w-full h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent mb-28" />

        {/* ══════════════════ CAPITULO 03 — Redundancia e Resiliencia ══════════════════ */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} className="mb-28">
          <motion.div variants={fadeUp(0)} className="mb-10">
            <span className="text-[10px] font-bold tracking-[0.5em] uppercase text-amber-500/60">Capitulo 03</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white mt-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              As Duas Superpotencias da Multisig
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <motion.div variants={scaleIn(1)} className="space-y-6">
              <div className="relative rounded-2xl overflow-hidden">
                <img src={keysImg} alt="Tres chaves douradas representando redundancia e resiliencia Multisig" className="w-full h-auto rounded-2xl" loading="lazy" width={1024} height={1024} />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050808]/50 to-transparent rounded-2xl" />
              </div>
            </motion.div>

            <motion.div variants={scaleIn(2)} className="space-y-8">
              <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-8 hover:border-amber-500/20 transition-all duration-500">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20">
                    <Shield size={20} className="text-amber-400" />
                  </div>
                  <h4 className="text-white font-bold text-lg" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Redundancia</h4>
                </div>
                <p className="text-stone-400 text-sm leading-relaxed">
                  Pense em um aviao. Ele tem dois motores. Se um falhar, o outro sustenta o voo. Voce nao depende mais de uma unica chave. Se perder uma, as outras ainda te dao acesso ao seu saldo. E como ter copias de seguranca que funcionam de verdade, porque cada uma e independente.
                </p>
              </div>

              <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-8 hover:border-amber-500/20 transition-all duration-500">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20">
                    <Lock size={20} className="text-amber-400" />
                  </div>
                  <h4 className="text-white font-bold text-lg" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Resiliencia</h4>
                </div>
                <p className="text-stone-400 text-sm leading-relaxed">
                  Mesmo sob ataque, voce preserva a capacidade de movimentar seus Bitcoin. Um assaltante invade sua casa e pega uma das chaves? Com uma unica chave, ele nao consegue gastar um satoshi do seu saldo. Voce usa as outras duas chaves de locais separados para recuperar tudo. O sistema sobrevive ao caos.
                </p>
              </div>

              <div className="bg-red-500/[0.04] border border-red-500/15 rounded-xl p-6">
                <div className="flex items-start gap-3">
                  <AlertTriangle size={18} className="text-red-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-red-400 font-semibold text-sm mb-1">Atencao: nao basta criar chaves</p>
                    <p className="text-stone-400 text-sm leading-relaxed">
                      Criar uma Multisig 5-de-10 e guardar todas as chaves na mesma gaveta nao muda nada. Na verdade, <span className="text-white font-semibold">aumenta o risco</span>. A forca da Multisig esta na <span className="text-white font-semibold">distribuicao geografica</span> das chaves, nao apenas na quantidade delas.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.section>

        <div className="w-full h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent mb-28" />

        {/* ══════════════════ CAPITULO 04 — Single Sig vs Multisig ══════════════════ */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} className="mb-28">
          <motion.div variants={fadeUp(0)} className="mb-10">
            <span className="text-[10px] font-bold tracking-[0.5em] uppercase text-amber-500/60">Capitulo 04</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white mt-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              De "Eu Juro Que Guardei" Para "Posso Perder E Ainda Recupero"
            </h2>
          </motion.div>

          <motion.div variants={scaleIn(1)} className="bg-white/[0.03] border border-white/[0.06] rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/[0.06]">
                    <th className="text-left p-6 text-stone-500 font-mono text-[10px] tracking-[0.3em] uppercase">Cenario</th>
                    <th className="text-center p-6 text-red-400 font-mono text-[10px] tracking-[0.3em] uppercase">Single-Sig</th>
                    <th className="text-center p-6 text-amber-400 font-mono text-[10px] tracking-[0.3em] uppercase">Multisig 2-de-3</th>
                  </tr>
                </thead>
                <tbody className="text-stone-300">
                  {[
                    ['Incendio destroi sua casa', 'Perde tudo', 'Usa 2 chaves de outros locais'],
                    ['Assaltante pega sua seed', 'Perde tudo', 'Atacante precisa de mais 1 chave'],
                    ['Voce esquece onde guardou', 'Perde tudo', 'Restam 2 chaves ativas'],
                    ['Inundacao na sua regiao', 'Perde tudo', 'Chaves distribuidas sobrevivem'],
                    ['Hardware wallet quebra', 'Depende de backup unico', 'Outras chaves cobrem'],
                    ['Voce morre inesperadamente', 'Familia sem acesso', 'Herdeiro + servico = acesso'],
                  ].map(([cenario, single, multi], i) => (
                    <tr key={i} className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors">
                      <td className="p-5 text-white font-medium text-sm">{cenario}</td>
                      <td className="p-5 text-center text-red-400/80 text-sm">{single}</td>
                      <td className="p-5 text-center text-amber-400/80 text-sm">{multi}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          <motion.div variants={fadeUp(2)} className="mt-8 text-center">
            <p className="text-stone-500 text-sm max-w-2xl mx-auto leading-relaxed">
              Em um setup Single-Sig, <span className="text-white font-semibold">basta uma coisa dar errado</span> para voce perder tudo. Na Multisig, <span className="text-amber-400 font-semibold">varias coisas precisam dar errado ao mesmo tempo</span>, o que reduz drasticamente as chances de perda permanente.
            </p>
          </motion.div>
        </motion.section>

        <div className="w-full h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent mb-28" />

        {/* ══════════════════ CAPITULO 05 — Servico de Recuperacao ══════════════════ */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} className="mb-28">
          <motion.div variants={fadeUp(0)} className="mb-10">
            <span className="text-[10px] font-bold tracking-[0.5em] uppercase text-amber-500/60">Capitulo 05</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white mt-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              O Terceiro Ponto: Voce Nao Precisa Carregar Tudo Sozinho
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <motion.div variants={scaleIn(1)} className="space-y-6 text-stone-400 leading-relaxed text-base">
              <p>
                Imagine que voce tem um amigo de extrema confianca. Voce entrega uma das tres chaves para ele. Se voce perder uma das suas, liga para esse amigo e juntos voces abrem o cofre. <span className="text-white font-semibold">O amigo sozinho nao consegue abrir nada.</span> Ele so funciona como ponto de apoio.
              </p>
              <p>
                Servicos como a <span className="text-amber-400 font-semibold">Casa</span> fazem exatamente isso de forma profissional. Voce cria uma Multisig 2-de-3 onde:
              </p>
              <div className="space-y-3">
                {[
                  { key: 'Chave 1', label: 'Mobile Key', desc: 'Fica no seu celular, dentro do app Casa.' },
                  { key: 'Chave 2', label: 'Hardware Wallet', desc: 'Sua Ledger, Trezor, Coldcard ou Keystone.' },
                  { key: 'Chave 3', label: 'Recovery Key', desc: 'Fica com a Casa. Ela so co-assina com suas perguntas de seguranca.' },
                ].map(item => (
                  <div key={item.key} className="flex items-start gap-3 bg-white/[0.03] border border-white/[0.06] rounded-xl p-4">
                    <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/20 flex-shrink-0">
                      <Key size={16} className="text-amber-400" />
                    </div>
                    <div>
                      <p className="text-white font-semibold text-sm">{item.label}</p>
                      <p className="text-stone-500 text-xs mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="bg-amber-500/[0.04] border border-amber-500/15 rounded-xl p-6">
                <p className="text-amber-400 font-semibold text-sm mb-2">Privacidade real:</p>
                <p className="text-stone-300 text-sm leading-relaxed">
                  A Casa nao e custodiante. Nao coleta seus dados. Voce pode usar um e-mail anonimo como Proton Mail. Se ninguem sabe que voce e cliente, ninguem pode te escolher como alvo para extorsao ou engenharia social. O banco de dados que vincula "essa pessoa tem Bitcoin" simplesmente nao existe.
                </p>
              </div>
            </motion.div>

            <motion.div variants={scaleIn(2)} className="space-y-6">
              <div className="relative rounded-2xl overflow-hidden">
                <img src={casaImg} alt="App Casa com hardware wallet Ledger configurando Multisig Bitcoin" className="w-full h-auto rounded-2xl" loading="lazy" width={1024} height={1024} />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050808]/40 to-transparent rounded-2xl" />
              </div>
              <div className="relative rounded-2xl overflow-hidden border border-white/[0.06]">
                <img src={casaAppImg} alt="Interface do app Casa mostrando BTC Vault com saldo e keys healthy" className="w-full h-auto rounded-2xl" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050808]/30 to-transparent rounded-2xl" />
              </div>
            </motion.div>
          </div>
        </motion.section>

        <div className="w-full h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent mb-28" />

        {/* ══════════════════ CAPITULO 06 — Passo a Passo ══════════════════ */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} className="mb-28">
          <motion.div variants={fadeUp(0)} className="mb-10">
            <span className="text-[10px] font-bold tracking-[0.5em] uppercase text-amber-500/60">Capitulo 06</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white mt-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Configure Sua Multisig em 5 Passos
            </h2>
          </motion.div>

          <div className="space-y-6">
            {[
              { step: '01', title: 'Baixe o app Casa e crie sua conta', desc: 'Abra o aplicativo, selecione o plano (1 mes gratis para teste) e acesse a area de Vaults. Voce so precisa de um e-mail. Recomendamos Proton Mail para anonimato.' },
              { step: '02', title: 'Conecte a Mobile Key', desc: 'A primeira chave e gerada e armazenada no proprio app Casa, no seu celular. E a chave mais acessivel do seu setup. A conexao e automatica.' },
              { step: '03', title: 'Conecte sua Hardware Wallet', desc: 'Plugue sua Ledger, Trezor, Coldcard, Keystone, Passport ou Bitbox no computador. O Casa detecta o app Bitcoin instalado e registra a chave publica do dispositivo no quorum Multisig. Voce confirma a operacao diretamente na tela da hardware.' },
              { step: '04', title: 'Configure a Recovery Key', desc: 'Defina tres perguntas de seguranca com respostas que so voce sabe. A Casa armazena a chave de recuperacao. Se voce perder uma das suas, a Casa co-assina usando suas respostas. Se estiver sob ameaca, a co-assinatura leva dias para ser processada, inviabilizando coercao.' },
              { step: '05', title: 'Transfira seus fundos para o novo endereco Multisig', desc: 'O novo endereco Multisig e gerado automaticamente. Envie seus Bitcoin da carteira Single-Sig para esse endereco. A partir de agora, qualquer movimentacao exige o quorum de duas chaves.' },
            ].map((item, i) => (
              <motion.div key={item.step} variants={scaleIn(i)} className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-8 hover:border-amber-500/20 transition-all duration-500 group">
                <div className="flex items-start gap-6">
                  <div className="w-14 h-14 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center flex-shrink-0 group-hover:bg-amber-500/15 transition-colors">
                    <span className="text-amber-400 font-bold text-lg" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{item.step}</span>
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-lg mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{item.title}</h4>
                    <p className="text-stone-400 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA Casa */}
          <motion.div variants={fadeUp(3)} className="mt-12">
            <a href={CASA_URL} target="_blank" rel="noopener noreferrer"
              className="group relative block rounded-2xl overflow-hidden">
              <div className="absolute -inset-[1px] rounded-2xl z-0 opacity-60 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: 'conic-gradient(from 0deg, #f59e0b, #eab308, #f59e0b)', animation: 'spin 4s linear infinite' }} />
              <div className="relative z-10 rounded-2xl bg-[#0a0a0a] p-8 md:p-12 text-center">
                <p className="text-amber-400 font-bold text-2xl md:text-3xl tracking-tight mb-3" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                  CONFIGURE SUA MULTISIG AGORA
                </p>
                <p className="text-stone-400 text-sm mb-6 max-w-lg mx-auto">
                  1 mes gratis para testar. Sem KYC. Sem dados pessoais. Voce controla 2 das 3 chaves.
                </p>
                <span className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-400 font-bold text-sm tracking-wider uppercase group-hover:bg-amber-500/25 transition-all duration-500">
                  Acessar casa.io <ExternalLink size={16} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </a>
          </motion.div>
        </motion.section>

        <div className="w-full h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent mb-28" />

        {/* ══════════════════ CAPITULO 07 — Casos de Uso ══════════════════ */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} className="mb-28">
          <motion.div variants={fadeUp(0)} className="mb-10">
            <span className="text-[10px] font-bold tracking-[0.5em] uppercase text-amber-500/60">Capitulo 07</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white mt-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Alem da Seguranca Pessoal
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'Heranca Digital', desc: 'Distribua chaves entre herdeiros e um servico de recuperacao. Se algo acontecer com voce, seus Bitcoin continuam acessiveis para sua familia sem depender de cartorios ou advogados.' },
              { title: 'Custodia Familiar', desc: 'Casal que gerencia patrimonio conjunto pode usar Multisig 2-de-3 onde cada um tem uma chave e a terceira fica em local seguro. Nenhum dos dois move sozinho.' },
              { title: 'Tesouraria Empresarial', desc: 'Empresas e DAOs usam Multisig para exigir que multiplos diretores aprovem cada transacao. E a governanca corporativa aplicada ao Bitcoin.' },
              { title: 'Distribuicao Geografica', desc: 'Chaves em paises diferentes. Mesmo que um governo confisque o que esta no seu territorio, as chaves em outras jurisdicoes permanecem intactas.' },
              { title: 'Protecao Anti-Coercao', desc: 'Com delay temporal na co-assinatura, mesmo sob ameaca fisica, o atacante nao consegue acesso imediato. O tempo joga a seu favor.' },
              { title: 'Sociedades e Fundos', desc: 'Socios que compartilham um fundo em Bitcoin podem exigir assinatura conjunta, impedindo que um unico membro fuja com os recursos.' },
            ].map((item, i) => (
              <motion.div key={item.title} variants={scaleIn(i)} className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-8 hover:border-amber-500/20 transition-all duration-500">
                <h4 className="text-white font-bold text-lg mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{item.title}</h4>
                <p className="text-stone-500 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <div className="w-full h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent mb-28" />

        {/* ══════════════════ CAPITULO 08 — FAQ ══════════════════ */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} className="mb-28">
          <motion.div variants={fadeUp(0)} className="mb-10">
            <span className="text-[10px] font-bold tracking-[0.5em] uppercase text-amber-500/60">Capitulo 08</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white mt-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Perguntas Frequentes
            </h2>
          </motion.div>

          <motion.div variants={scaleIn(1)} className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6 md:p-10">
            <Accordion type="single" collapsible className="space-y-2">
              {faqItems.map((item, i) => (
                <AccordionItem key={i} value={`faq-${i}`} className="border-white/[0.06]">
                  <AccordionTrigger className="text-white text-sm font-semibold hover:no-underline hover:text-amber-400 transition-colors py-5">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-stone-400 text-sm leading-relaxed pb-5">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </motion.section>

        {/* ══════════════════ CTA FINAL ══════════════════ */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-20">
          <motion.div variants={fadeUp(0)}
            className="bg-white/[0.02] border border-amber-500/10 rounded-3xl p-10 md:p-16 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(245,158,11,0.04),_transparent_70%)]" />
            <div className="relative z-10 space-y-6">
              <p className="text-stone-600 font-bold text-xs tracking-[0.5em] uppercase">Autocustodia de Elite</p>
              <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Voce nao precisa depender da sorte.<br />
                Precisa depender da <span className="text-amber-400">estrutura.</span>
              </h2>
              <p className="text-stone-500 text-sm max-w-xl mx-auto">
                Multisig nao promete um mundo onde nada da errado. Cria um sistema onde, quando der errado, voce ainda recupera tudo.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <a href={CASA_URL} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-amber-500/10 border border-amber-500/25 rounded-xl px-8 py-4 text-amber-400 text-sm font-bold uppercase tracking-wider hover:bg-amber-500/20 hover:border-amber-500/40 transition-all duration-500 group">
                  Configurar Multisig <ExternalLink size={16} className="group-hover:translate-x-1 transition-transform" />
                </a>
                <Link to="/autocustodia"
                  className="inline-flex items-center gap-3 bg-white/[0.05] border border-white/[0.1] rounded-xl px-8 py-4 text-stone-300 text-sm font-bold uppercase tracking-wider hover:bg-white/[0.08] transition-all duration-500 group">
                  Ver Guia de Autocustodia <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.section>

        <footer className="border-t border-white/[0.05] pt-12 text-center">
          <p className="text-stone-700 text-[9px] font-bold tracking-[0.5em] uppercase">Lord Junnior &copy; 2026</p>
        </footer>
      </div>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
};

export default MultisigBitcoin;
