import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { ArrowRight, Shield, AlertTriangle, Lock, Eye, Scale, FileWarning, TrendingDown } from 'lucide-react';
import BackToHome from '@/components/BackToHome';
import ScrollToTop from '@/components/ScrollToTop';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

import heroImg from '@/assets/lei-conta-hero.jpg';
import sequestroImg from '@/assets/lei-conta-sequestro.jpg';
import openFinanceImg from '@/assets/lei-conta-openfinance.jpg';
import armadilhaImg from '@/assets/lei-conta-armadilha.jpg';
import escudoImg from '@/assets/lei-conta-escudo.jpg';

const APPLE_EASE = [0.22, 1, 0.36, 1] as const;
const fadeUp = (i: number) => ({
  hidden: { opacity: 0, y: 30, filter: 'blur(6px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.7, ease: APPLE_EASE, delay: i * 0.1 } },
});
const scaleIn = (i: number) => ({
  hidden: { opacity: 0, scale: 0.94, filter: 'blur(8px)' },
  visible: { opacity: 1, scale: 1, filter: 'blur(0px)', transition: { duration: 0.8, ease: APPLE_EASE, delay: i * 0.12 } },
});

const faqItems = [
  {
    question: 'Quando a nova lei da conta corrente comeca a valer oficialmente?',
    answer: 'A Resolucao Conjunta n. 8/2024 do Conselho Monetario Nacional foi publicada em 2024 e os bancos tem prazo ate 4 de maio de 2026 para se adequar integralmente. Porem, na pratica, a maioria das instituicoes financeiras ja antecipou a implementacao. Contratos assinados desde dezembro de 2025 ja podem conter as novas clausulas de autorizacoes ampliadas e renuncia de garantias legais.',
  },
  {
    question: 'O que e Open Finance e por que ele e perigoso nesse novo cenario?',
    answer: 'Open Finance e um sistema de compartilhamento padronizado de dados financeiros entre instituicoes. Quando voce autoriza, todos os bancos passam a ver seu historico, dividas, salario, gastos e investimentos em tempo real. O perigo: se voce inadimplir em um banco, todos os outros saberao instantaneamente. Antes, voce perdia limite e cartao apenas no banco em problema. Agora, voce pode perder em todos simultaneamente.',
  },
  {
    question: 'Posso recusar a aderir ao Open Finance e ainda assim usar minha conta?',
    answer: 'Sim. O Open Finance e juridicamente opcional. Porem, a nova lei condiciona acesso a beneficios (portabilidade simplificada, juros menores, debito unificado) ao consentimento. Voce pode usar sua conta normalmente sem aderir, mas perde os incentivos. A recomendacao tecnica e: se sua situacao financeira nao e perfeita, mantenha o Open Finance desativado.',
  },
  {
    question: 'O que significa renunciar a protecao de poupanca de 40 salarios minimos?',
    answer: 'Pelo Codigo de Processo Civil (Art. 833, X), valores ate 40 salarios minimos guardados em poupanca, CDB ou aplicacoes de renda fixa sao impenhoraveis. Aproximadamente R$ 60.480 em 2026. A nova clausula de "juros reduzidos" exige que voce renuncie a metade dessa protecao, reduzindo para 20 salarios minimos. Pior: voce autoriza sequestro liminar dos valores antes de qualquer julgamento.',
  },
  {
    question: 'Como cancelar debito em conta apos contratar um emprestimo?',
    answer: 'O cancelamento de debito em conta e direito do consumidor previsto no CDC. Basta solicitar formalmente ao banco (preferencialmente por escrito ou via canal oficial com protocolo). O banco e obrigado a manter o contrato sem o debito automatico, podendo apenas alterar a forma de cobranca para boleto. Esta e uma estrategia defensiva critica em momentos de aperto financeiro.',
  },
  {
    question: 'A penhora de salario via Open Finance e legal?',
    answer: 'Salario tradicionalmente e impenhoravel pelo Art. 833, IV do CPC. Porem, jurisprudencia recente do STJ permite penhora de ate 30% quando comprovada capacidade de pagamento. Com Open Finance ativo, o banco fornece ao Judiciario provas detalhadas de gastos, padrao de vida e sobras, facilitando a autorizacao da penhora. Sem Open Finance, essa prova e muito mais dificil de obter.',
  },
  {
    question: 'Bitcoin protege contra esse tipo de sequestro patrimonial?',
    answer: 'Sim. Bitcoin em autocustodia (chaves sob seu controle, nao em exchanges KYC) esta fora do sistema bancario tradicional e do Open Finance. Nenhum juiz pode determinar bloqueio direto de uma carteira de hardware. A unica forma de execucao seria voce voluntariamente entregar as chaves. Por isso, diversificacao patrimonial entre fiat e Bitcoin tornou-se estrategia essencial de soberania.',
  },
  {
    question: 'A Lei do Superendividamento pode anular essas novas clausulas?',
    answer: 'Sim. A Lei 14.181/2021 (Lei do Superendividamento) determina que bancos devem oferecer credito de forma responsavel. Se a instituicao concede valor superior ao solicitado em troca de autorizacoes amplas, configura-se oferta irresponsavel. As clausulas podem ser anuladas judicialmente, com possivel indenizacao por danos morais ao consumidor.',
  },
  {
    question: 'Como saber se meu contrato ja contem as novas clausulas?',
    answer: 'Procure no contrato pelas seguintes expressoes-gatilho: "autorizacao para compartilhamento de dados via Open Finance", "renuncia a impenhorabilidade", "constituicao de mora por meio digital", "autorizacao de debito em conta multibancario", "reducao de protecao patrimonial". Se qualquer uma dessas aparecer, voce ja esta sob o novo regime.',
  },
  {
    question: 'Qual a melhor estrategia defensiva para 2026?',
    answer: 'Tres camadas: 1) Antes de assinar qualquer contrato bancario, exija a versao em PDF e leia todas as clausulas de autorizacao. 2) Mantenha reserva de emergencia parcialmente em Bitcoin sob autocustodia, fora do alcance do sistema bancario. 3) Centralize relacionamento em um unico banco principal e mantenha o Open Finance desativado em todos os outros. Diversifique riscos, nao dados.',
  },
];

const NovaLeiContaCorrente = () => {
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
    '@type': 'NewsArticle',
    headline: 'Nova Lei da Conta Corrente 2026: Como o Banco Pode Sequestrar Seu Dinheiro',
    description: 'Analise tecnica completa da Resolucao Conjunta 8/2024 que entra em vigor em maio de 2026. Entenda as quatro mudancas, riscos do Open Finance, renuncia de impenhorabilidade e estrategias defensivas.',
    author: { '@type': 'Person', name: 'Lord Junnior' },
    publisher: { '@type': 'Organization', name: 'Arsenal de Soberania', url: 'https://lordjunnior.com.br' },
    datePublished: '2026-04-16',
    dateModified: '2026-04-16',
    url: 'https://lordjunnior.com.br/nova-lei-conta-corrente',
    image: 'https://lordjunnior.com.br/og-lei-conta.jpg',
    mainEntityOfPage: 'https://lordjunnior.com.br/nova-lei-conta-corrente',
    articleSection: 'Alertas de Soberania',
    keywords: 'nova lei conta corrente 2026, resolucao 8 2024, open finance brasil, penhora poupanca, impenhorabilidade 40 salarios minimos, debito em conta multibancario, juros reduzidos contrato, lei superendividamento, bancos brasil 2026, defesa endividado, antonio galvao, conta corrente bancos centralizacao',
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
    <div className="min-h-screen text-stone-100 font-sans selection:bg-amber-300/50 relative overflow-hidden" style={{ background: '#050606' }}>
      <Helmet>
        <title>Nova Lei da Conta Corrente 2026: Banco Pode Sequestrar Seu Dinheiro | Lord Junnior</title>
        <meta name="description" content="Resolucao 8/2024 entra em vigor em maio 2026. Analise tecnica das 4 mudancas, riscos do Open Finance, perda da impenhorabilidade de 40 salarios minimos e estrategias de defesa patrimonial." />
        <meta name="keywords" content="nova lei conta corrente, resolucao conjunta 8 2024, open finance brasil 2026, penhora poupanca, impenhorabilidade 40 salarios minimos, debito em conta multibancario, juros reduzidos bancos, lei superendividamento, defesa do endividado, antonio galvao, bcb 4753, banco central, sequestro patrimonial, bloqueio judicial conta, sigilo bancario brasil, soberania financeira, bitcoin protecao patrimonial, autocustodia bitcoin defesa" />
        <link rel="canonical" href="https://lordjunnior.com.br/nova-lei-conta-corrente" />
        <meta property="og:title" content="ALERTA: Nova Lei da Conta Corrente Permite Banco Tomar Seu Dinheiro" />
        <meta property="og:description" content="A maior mudanca bancaria da decada entra em vigor em maio. Entenda o que voce esta perdendo sem saber e como se proteger." />
        <meta property="og:url" content="https://lordjunnior.com.br/nova-lei-conta-corrente" />
        <meta property="og:type" content="article" />
        <meta property="article:section" content="Alertas" />
        <meta property="article:author" content="Lord Junnior" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large" />
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>
      <ScrollToTop />

      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-[3px]">
        <div className="h-full transition-all duration-150 ease-out" style={{ width: `${scrollProgress}%`, background: 'linear-gradient(90deg, #dc2626, #f59e0b)' }} />
      </div>

      {/* Film Grain */}
      <div className="fixed inset-0 pointer-events-none z-[1]">
        <div className="absolute inset-0 opacity-[0.035]" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=\"0 0 256 256\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cfilter id=\"n\"%3E%3CfeTurbulence type=\"fractalNoise\" baseFrequency=\"0.9\" numOctaves=\"4\" stitchTiles=\"stitch\"/%3E%3C/filter%3E%3Crect width=\"100%25\" height=\"100%25\" filter=\"url(%23n)\"/%3E%3C/svg%3E')", backgroundSize: '128px 128px' }} />
      </div>

      {/* HERO Full Bleed */}
      <div className="relative w-full h-[92vh] min-h-[640px] overflow-hidden">
        <img src={heroImg} alt="Cofre bancario marmore com banknotes brasileiras sob luz dramatica" className="absolute inset-0 w-full h-full object-cover" width={1920} height={1080} loading="eager" fetchPriority="high" decoding="async" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050606] via-[#050606]/70 to-[#050606]/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050606]/60 via-transparent to-[#050606]/40" />

        <div className="absolute top-6 left-6 md:left-12 z-20">
          <BackToHome />
        </div>

        <div className="absolute bottom-0 left-0 right-0 px-6 md:px-12 lg:px-20 pb-16 md:pb-24 z-10">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: APPLE_EASE }}>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-500/15 border border-red-500/30 mb-6">
              <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
              <p className="font-mono text-[10px] tracking-[0.4em] text-red-400 uppercase font-bold">Alerta Patrimonial &middot; Maio 2026</p>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white tracking-tight leading-[1.05] max-w-5xl" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
              NOVA LEI DA CONTA CORRENTE:<br />
              <span className="text-amber-400">SEU DINHEIRO ESTA EM RISCO</span>
            </h1>
            <p className="text-stone-400 text-lg md:text-xl leading-relaxed mt-6 max-w-3xl">
              Em 4 de maio de 2026, todos os bancos brasileiros estarao adequados a uma resolucao silenciosa que reescreve as regras de credito, penhora e privacidade. A midia nao falou. Voce precisa saber.
            </p>
          </motion.div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 lg:px-16 pt-16 pb-32">

        {/* CAPITULO 01 — A Resolucao Que Ninguem Falou */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} className="mb-28">
          <motion.div variants={fadeUp(0)} className="mb-10">
            <span className="text-[10px] font-bold tracking-[0.5em] uppercase text-red-500/60">Capitulo 01</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white mt-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              A Resolucao Que A Midia Esqueceu
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <motion.div variants={scaleIn(1)} className="space-y-6 text-stone-400 leading-relaxed text-base">
              <p>
                Em 2024, o Conselho Monetario Nacional publicou a <span className="text-white font-semibold">Resolucao Conjunta n. 8</span>. Os bancos receberam 180 dias para se adequar. Esse prazo expira em <span className="text-amber-400 font-semibold">4 de maio de 2026</span>.
              </p>
              <p>
                Pense em uma cidade onde anunciaram que todas as fechaduras das casas serao trocadas por novas, "mais modernas". Ninguem te explicou que essas novas fechaduras tem uma chave-mestra que fica com a prefeitura. Voce so descobre quando alguem entra na sua casa sem voce autorizar.
              </p>
              <p>
                Essa e a essencia da nova lei. Ela vem embalada como modernizacao, transparencia e juros menores. Mas dentro do pacote, ha quatro mudancas estruturais que reorganizam quem controla o seu dinheiro.
              </p>
              <div className="bg-red-500/[0.06] border border-red-500/20 rounded-xl p-6">
                <p className="text-red-400 font-semibold text-sm mb-2">O silencio nao e coincidencia:</p>
                <p className="text-stone-300 text-sm leading-relaxed">
                  Quando uma lei beneficia o consumidor, a midia inunda com manchetes. Quando reduz protecoes patrimoniais, o silencio e estrategico. As proximas semanas serao de propaganda tentando pintar essa resolucao como vantajosa. Leia o contrato antes de assinar.
                </p>
              </div>
            </motion.div>

            <motion.div variants={scaleIn(2)} className="relative rounded-2xl overflow-hidden">
              <img src={escudoImg} alt="Escudo de protecao patrimonial quebrado proximo a banknotes brasileiras" className="w-full h-auto rounded-2xl" loading="lazy" width={1600} height={1067} />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050606]/70 to-transparent rounded-2xl" />
              <div className="absolute bottom-4 left-4 right-4">
                <p className="text-stone-500 text-[10px] font-mono tracking-wider uppercase">A protecao legal que voce tinha por padrao agora exige clausula expressa de manutencao.</p>
              </div>
            </motion.div>
          </div>
        </motion.section>

        <div className="w-full h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent mb-28" />

        {/* CAPITULO 02 — As 4 Mudancas */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} className="mb-28">
          <motion.div variants={fadeUp(0)} className="mb-10">
            <span className="text-[10px] font-bold tracking-[0.5em] uppercase text-amber-500/60">Capitulo 02</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white mt-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              As Quatro Mudancas Que Reorganizam Tudo
            </h2>
            <p className="text-stone-400 text-base leading-8 mt-6 max-w-3xl">
              Cada mudanca tem um beneficio aparente e um custo oculto. Abaixo, a anatomia tecnica de cada uma.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                num: '01',
                title: 'Portabilidade de Salario',
                icon: ArrowRight,
                benefit: 'Migracao via app sem burocracia. Bancos nao podem recusar nem fazer descontos previos.',
                cost: 'Adesao ao Open Finance vira pre-requisito pratico para acessar o beneficio.',
              },
              {
                num: '02',
                title: 'Debito em Conta Multibancario',
                icon: Lock,
                benefit: 'Centraliza todos os boletos em uma unica conta principal de sua escolha.',
                cost: 'Aumenta superficie de fraude. Boletos falsos passam despercebidos no volume.',
              },
              {
                num: '03',
                title: 'Transparencia Obrigatoria',
                icon: Eye,
                benefit: 'Saldo separado de limite. Aviso previo de mudanca de juros. Linguagem simples.',
                cost: 'Cumprimento depende de fiscalizacao. Historicamente, bancos descumprem regras de transparencia.',
              },
              {
                num: '04',
                title: 'Juros Reduzidos em Contratos',
                icon: TrendingDown,
                benefit: 'Possibilidade de reducao das taxas de juros em contratos novos.',
                cost: 'Exige renuncia a impenhorabilidade de 40 salarios minimos e notificacao digital de mora.',
              },
            ].map((item, i) => (
              <motion.div key={item.num} variants={fadeUp(i)}
                className="bg-white/[0.025] border border-white/[0.06] rounded-2xl p-7 hover:border-amber-500/20 transition-all duration-500">
                <div className="flex items-center gap-4 mb-5">
                  <span className="text-amber-500/40 font-mono text-2xl font-bold">{item.num}</span>
                  <item.icon className="w-5 h-5 text-amber-400" />
                  <h3 className="text-white font-bold text-lg" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{item.title}</h3>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-emerald-400/80 text-[10px] font-bold tracking-[0.3em] uppercase mb-1">Beneficio aparente</p>
                    <p className="text-stone-300 text-sm leading-relaxed">{item.benefit}</p>
                  </div>
                  <div className="border-t border-white/[0.05] pt-4">
                    <p className="text-red-400/80 text-[10px] font-bold tracking-[0.3em] uppercase mb-1">Custo oculto</p>
                    <p className="text-stone-400 text-sm leading-relaxed">{item.cost}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <div className="w-full h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent mb-28" />

        {/* CAPITULO 03 — Open Finance */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} className="mb-28">
          <motion.div variants={fadeUp(0)} className="mb-10">
            <span className="text-[10px] font-bold tracking-[0.5em] uppercase text-amber-500/60">Capitulo 03</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white mt-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Open Finance: A Vigilancia Cruzada
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <motion.div variants={scaleIn(1)} className="relative rounded-2xl overflow-hidden order-1 lg:order-none">
              <img src={openFinanceImg} alt="Rede de fios opticos conectando torres bancarias representando vigilancia financeira cruzada" className="w-full h-auto rounded-2xl" loading="lazy" width={1600} height={1067} />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050606]/60 to-transparent rounded-2xl" />
            </motion.div>

            <motion.div variants={scaleIn(2)} className="space-y-6 text-stone-400 leading-relaxed text-base">
              <p>
                Imagine que voce trabalha com um colega novo num escritorio. Ele te ve trabalhando, conhece seu jeito, suas habilidades. Ate ai, normal. Agora imagine que esse colega tem um aplicativo que mostra em tempo real o que voce conversou com seu chefe anterior, o que voce comprou na ultima viagem, com quem voce sai aos finais de semana e quanto voce gastou no aniversario do seu filho.
              </p>
              <p>
                Voce continuaria sendo o mesmo profissional. Mas a relacao mudou. Ele agora <span className="text-white font-semibold">decide se confia em voce baseado em dados que nao deveriam estar na mesa</span>.
              </p>
              <p>
                Open Finance funciona assim entre bancos. Quando voce autoriza, todas as instituicoes passam a ver seu historico cruzado: extratos, dividas, gastos, padroes de consumo, salario, investimentos. A vantagem comercial que tinhamos de "esconder" um problema em um banco para abrir conta em outro acabou.
              </p>
              <div className="bg-amber-500/[0.04] border border-amber-500/15 rounded-xl p-6 space-y-3">
                <h4 className="text-white font-bold text-sm" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>O efeito cascata:</h4>
                <ul className="space-y-2 text-stone-300 text-sm">
                  <li className="flex gap-3"><span className="text-amber-400 font-bold">&rsaquo;</span> Inadimplencia em um banco vira historico negativo em todos os outros</li>
                  <li className="flex gap-3"><span className="text-amber-400 font-bold">&rsaquo;</span> Limite de cartao reduzido simultaneamente em multiplas instituicoes</li>
                  <li className="flex gap-3"><span className="text-amber-400 font-bold">&rsaquo;</span> Taxas de juros ajustadas para cima baseado em risco cruzado</li>
                  <li className="flex gap-3"><span className="text-amber-400 font-bold">&rsaquo;</span> Negativa de credito automatica em qualquer banco da rede</li>
                </ul>
              </div>
            </motion.div>
          </div>
        </motion.section>

        <div className="w-full h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent mb-28" />

        {/* CAPITULO 04 — A Armadilha dos Juros */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} className="mb-28">
          <motion.div variants={fadeUp(0)} className="mb-10">
            <span className="text-[10px] font-bold tracking-[0.5em] uppercase text-amber-500/60">Capitulo 04</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white mt-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              A Armadilha dos Juros Reduzidos
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <motion.div variants={scaleIn(1)} className="space-y-6 text-stone-400 leading-relaxed text-base">
              <p>
                Existe uma cena classica em filmes: o personagem encontra uma maleta cheia de dinheiro abandonada no meio do caminho. Parece presente. Quem deixou? Por que esta ali? Toda pessoa minimamente experiente sabe: <span className="text-white font-semibold">presentes gratuitos no meio da estrada existem por um motivo</span>.
              </p>
              <p>
                A nova lei oferece reducao de juros em contratos. Em troca, voce assina tres autorizacoes que parecem tecnicas e inofensivas:
              </p>
              <div className="space-y-4">
                <div className="bg-white/[0.025] border border-white/[0.06] rounded-xl p-5">
                  <p className="text-amber-400 font-bold text-sm mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>1. Aceitacao de debito em conta automatico</p>
                  <p className="text-stone-400 text-sm leading-relaxed">Se voce nao tiver saldo, o limite cobre. Limite cobra ate <span className="text-red-400 font-semibold">8% ao mes</span>. O emprestimo cobrava 3%. Voce trocou de divida sem perceber.</p>
                </div>
                <div className="bg-white/[0.025] border border-white/[0.06] rounded-xl p-5">
                  <p className="text-amber-400 font-bold text-sm mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>2. Constituicao de mora por meio digital</p>
                  <p className="text-stone-400 text-sm leading-relaxed">Antes, o banco precisava enviar carta com AR para te processar. Agora, um SMS basta. Tempo entre atraso e processo judicial: <span className="text-red-400 font-semibold">dias, nao meses</span>.</p>
                </div>
                <div className="bg-white/[0.025] border border-white/[0.06] rounded-xl p-5">
                  <p className="text-amber-400 font-bold text-sm mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>3. Renuncia a impenhorabilidade</p>
                  <p className="text-stone-400 text-sm leading-relaxed">A protecao de 40 salarios minimos em poupanca cai para 20. E o banco pode <span className="text-red-400 font-semibold">sequestrar liminarmente</span> antes do julgamento.</p>
                </div>
              </div>
            </motion.div>

            <motion.div variants={scaleIn(2)} className="relative rounded-2xl overflow-hidden">
              <img src={armadilhaImg} alt="Armadilha de madeira com moeda dourada simbolizando juros baixos como isca" className="w-full h-auto rounded-2xl" loading="lazy" width={1600} height={1067} />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050606]/60 to-transparent rounded-2xl" />
              <div className="absolute bottom-4 left-4 right-4">
                <p className="text-stone-500 text-[10px] font-mono tracking-wider uppercase">Reducao de 1,5% para 1,3% ao mes nao compensa renuncia de garantias legais.</p>
              </div>
            </motion.div>
          </div>
        </motion.section>

        <div className="w-full h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent mb-28" />

        {/* CAPITULO 05 — O Sequestro Patrimonial */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} className="mb-28">
          <motion.div variants={fadeUp(0)} className="mb-10">
            <span className="text-[10px] font-bold tracking-[0.5em] uppercase text-red-500/60">Capitulo 05</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white mt-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              O Sequestro Antes Do Julgamento
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <motion.div variants={scaleIn(1)} className="relative rounded-2xl overflow-hidden order-1 lg:order-none">
              <img src={sequestroImg} alt="Mao digital feita de codigo binario alcancando cofrinho com moedas brasileiras" className="w-full h-auto rounded-2xl" loading="lazy" width={1600} height={1067} />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050606]/60 to-transparent rounded-2xl" />
            </motion.div>

            <motion.div variants={scaleIn(2)} className="space-y-6 text-stone-400 leading-relaxed text-base">
              <p>
                O modelo antigo funcionava como um cerco lento e visivel. O banco entrava com processo. O juiz determinava bloqueio. O dinheiro ficava indisponivel mas dentro da sua conta. Voce ia ao processo, comprovava que era poupanca dentro do limite legal, e o juiz liberava. <span className="text-white font-semibold">Voce sempre teve a chance de defesa antes da execucao.</span>
              </p>
              <p>
                O modelo novo inverte a sequencia. Voce ja autorizou previamente. O banco sequestra liminarmente, transfere o dinheiro para a conta dele, e <span className="text-amber-400 font-semibold">depois</span> voce pode reclamar. So que nao pode mais alegar impenhorabilidade do que renunciou.
              </p>
              <div className="bg-red-500/[0.06] border border-red-500/20 rounded-xl p-6">
                <p className="text-red-400 font-bold text-sm mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Comparativo de processo:</p>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <span className="text-stone-500 font-mono text-[10px] mt-1">ANTES</span>
                    <p className="text-stone-300">Processo &rarr; Bloqueio &rarr; Defesa &rarr; Liberacao do impenhoravel</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-red-400 font-mono text-[10px] mt-1">AGORA</span>
                    <p className="text-stone-300">Sequestro liminar &rarr; Dinheiro ja perdido &rarr; Defesa limitada &rarr; Voce renunciou</p>
                  </div>
                </div>
              </div>
              <p>
                Some-se a isso o Open Finance ativo: o banco apresenta ao juiz prova detalhada do seu padrao de gastos versus salario, justificando penhora de ate <span className="text-white font-semibold">30% do salario</span> mesmo com a regra geral de impenhorabilidade salarial.
              </p>
            </motion.div>
          </div>
        </motion.section>

        <div className="w-full h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent mb-28" />

        {/* CAPITULO 06 — Estrategia Defensiva */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} className="mb-28">
          <motion.div variants={fadeUp(0)} className="mb-10">
            <span className="text-[10px] font-bold tracking-[0.5em] uppercase text-emerald-500/60">Capitulo 06</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white mt-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Arsenal de Defesa Patrimonial
            </h2>
            <p className="text-stone-400 text-base leading-8 mt-6 max-w-3xl">
              Cinco movimentos taticos para neutralizar os efeitos da nova legislacao.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                num: '01',
                title: 'Leia Antes de Assinar',
                desc: 'Exija a versao em PDF do contrato. Procure por "Open Finance", "renuncia a impenhorabilidade", "constituicao de mora digital". Se aparecer, recuse ou negocie remocao.',
              },
              {
                num: '02',
                title: 'Cancele Debito em Conta',
                desc: 'O cancelamento e direito previsto no CDC. Solicite formalmente com protocolo. O banco mantem o contrato sem o debito automatico. Em apertos, isso evita migrar divida barata para cara.',
              },
              {
                num: '03',
                title: 'Centralize, Nao Compartilhe',
                desc: 'Mantenha um banco principal e desative Open Finance nos demais. Voce ainda usa todos os bancos, mas eles nao se comunicam sobre voce.',
              },
              {
                num: '04',
                title: 'Use a Lei do Superendividamento',
                desc: 'A Lei 14.181/2021 protege contra ofertas irresponsaveis. Se o banco te aprovou valor superior ao solicitado em troca de autorizacoes amplas, as clausulas sao questionaveis com indenizacao possivel.',
              },
              {
                num: '05',
                title: 'Diversifique Para Bitcoin',
                desc: 'Reserva de emergencia em Bitcoin sob autocustodia esta fora do sistema bancario. Nenhum juiz pode determinar bloqueio direto de uma carteira de hardware. Soberania financeira de verdade.',
                highlight: true,
              },
              {
                num: '06',
                title: 'Portabilidade de Consignado',
                desc: 'Use a nova facilidade para migrar consignados caros para taxas menores. Apos a migracao, cancele autorizacoes que nao sejam essenciais ao novo contrato.',
              },
            ].map((item, i) => (
              <motion.div key={item.num} variants={fadeUp(i)}
                className={`rounded-2xl p-7 transition-all duration-500 ${item.highlight ? 'bg-amber-500/[0.05] border border-amber-500/25 hover:border-amber-500/40' : 'bg-white/[0.025] border border-white/[0.06] hover:border-white/[0.12]'}`}>
                <div className="flex items-center gap-4 mb-4">
                  <span className={`font-mono text-2xl font-bold ${item.highlight ? 'text-amber-400' : 'text-stone-600'}`}>{item.num}</span>
                  <h3 className="text-white font-bold text-lg" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{item.title}</h3>
                </div>
                <p className="text-stone-400 text-sm leading-relaxed">{item.desc}</p>
                {item.highlight && (
                  <Link to="/autocustodia" className="inline-flex items-center gap-2 mt-4 text-amber-400 text-xs font-bold uppercase tracking-wider hover:gap-3 transition-all">
                    Ver Guia de Autocustodia <ArrowRight size={12} />
                  </Link>
                )}
              </motion.div>
            ))}
          </div>
        </motion.section>

        <div className="w-full h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent mb-28" />

        {/* FAQ */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} className="mb-28">
          <motion.div variants={fadeUp(0)} className="mb-10">
            <span className="text-[10px] font-bold tracking-[0.5em] uppercase text-amber-500/60">Perguntas Tecnicas</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white mt-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Duvidas Frequentes
            </h2>
          </motion.div>

          <motion.div variants={fadeUp(1)}>
            <Accordion type="single" collapsible className="space-y-3">
              {faqItems.map((item, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="bg-white/[0.025] border border-white/[0.06] rounded-xl px-6 hover:border-amber-500/15 transition-colors">
                  <AccordionTrigger className="text-white text-sm font-semibold hover:no-underline hover:text-amber-400 transition-colors py-5 text-left">
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

        {/* CTA FINAL */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-20">
          <motion.div variants={fadeUp(0)}
            className="bg-white/[0.02] border border-amber-500/10 rounded-3xl p-10 md:p-16 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(245,158,11,0.05),_transparent_70%)]" />
            <div className="relative z-10 space-y-6">
              <p className="text-stone-600 font-bold text-xs tracking-[0.5em] uppercase">Soberania Financeira</p>
              <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-white max-w-3xl mx-auto" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Quem nao controla as proprias chaves<br />
                <span className="text-amber-400">nao controla o proprio dinheiro.</span>
              </h2>
              <p className="text-stone-500 text-sm max-w-xl mx-auto">
                A nova lei e apenas mais um movimento na centralizacao do sistema. A resposta nao esta em escolher um banco melhor. Esta em construir uma camada paralela de patrimonio fora do alcance estatal.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Link to="/autocustodia"
                  className="inline-flex items-center gap-3 bg-amber-500/10 border border-amber-500/25 rounded-xl px-8 py-4 text-amber-400 text-sm font-bold uppercase tracking-wider hover:bg-amber-500/20 hover:border-amber-500/40 transition-all duration-500 group">
                  Iniciar Autocustodia <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link to="/alertas"
                  className="inline-flex items-center gap-3 bg-white/[0.05] border border-white/[0.1] rounded-xl px-8 py-4 text-stone-300 text-sm font-bold uppercase tracking-wider hover:bg-white/[0.08] transition-all duration-500 group">
                  Mais Alertas Patrimoniais <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
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

export default NovaLeiContaCorrente;
