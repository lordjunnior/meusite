import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ShieldCheck, Lock, Wifi, Wallet, Scale, AlertTriangle,
  ChevronDown, ArrowRight, Layers, Settings, Zap, CheckCircle2,
} from 'lucide-react';
import SeoHead from '@/components/SeoHead';
import BackToHome from '@/components/BackToHome';
import heroImg from '@/assets/p2p/bisq-hero.webp';
import contaImg from '@/assets/exchanges/hub-command-panel.webp';
import mediacaoImg from '@/assets/p2p/bisq-mediacao.webp';

const APPLE_EASE = [0.22, 1, 0.36, 1] as const;
const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.8, ease: APPLE_EASE, delay },
});

const PASSOS_INSTALACAO = [
  { n: '01', titulo: 'Baixe do site oficial bisq.network', texto: 'Sempre confira a assinatura PGP do instalador. Bisq é código aberto e o binário oficial nunca pede dados pessoais para ser baixado.' },
  { n: '02', titulo: 'Instale e deixe o Tor inicializar', texto: 'O Bisq roda inteiramente sobre a rede Tor. Na primeira abertura, o app constrói o circuito Tor sozinho; isso pode levar alguns minutos, é normal.' },
  { n: '03', titulo: 'Crie sua carteira Bitcoin interna', texto: 'O Bisq gera uma seed própria (12 palavras) na primeira execução. Anote em papel offline, nunca em print de tela ou nuvem.' },
  { n: '04', titulo: 'Financie o depósito de segurança', texto: 'Antes de negociar, é preciso ter BTC na carteira interna para cobrir o security deposit exigido em cada oferta.' },
  { n: '05', titulo: 'Configure as contas de pagamento aceitas', texto: 'Cadastre os métodos de pagamento (TED, transferência internacional, etc.) que você aceita usar como comprador ou vendedor.' },
];

const CONTAS_BR = [
  { metodo: 'Transferência bancária nacional (TED)', obs: 'Mais usada por brasileiros no Bisq. Exige que nome da conta bata com o nome do usuário na negociação.' },
  { metodo: 'Zelle / transferência internacional', obs: 'Útil para quem tem conta em banco americano; menor familiaridade entre usuários brasileiros.' },
  { metodo: 'SEPA / transferência europeia', obs: 'Relevante apenas para quem tem conta bancária na zona do euro.' },
  { metodo: 'Cartão-presente e outros métodos de risco elevado', obs: 'O Bisq categoriza cada método por nível de risco de estorno; métodos de alto risco pedem depósito de segurança maior.' },
];

const TAXAS = [
  { item: 'Taxa de negociação (trading fee)', valor: 'Paga em BTC, proporcional ao valor negociado, entre 0,1% e 0,7%' },
  { item: 'Taxa de mineração (on-chain)', valor: 'Cobrada nas transações de abertura, depósito e liquidação do escrow' },
  { item: 'Depósito de segurança (security deposit)', valor: 'Geralmente entre 5% e 20% do valor da negociação, devolvido ao final' },
  { item: 'Custo de manter node/relay ativo', valor: 'Opcional, apenas para quem roda infraestrutura própria de suporte à rede' },
];

const ERROS_BISQ = [
  'Fechar o Bisq no meio de uma negociação ativa. O aplicativo precisa ficar aberto e conectado à rede Tor até a confirmação final do escrow.',
  'Não anotar a seed da carteira interna do Bisq, tratando-a como se fosse apenas login de app comum.',
  'Escolher oferta com depósito de segurança muito abaixo da média do mercado sem entender por que ela é tão barata.',
  'Enviar comprovante de pagamento fora do chat criptografado da própria negociação, quebrando a cadeia de evidência em caso de disputa.',
  'Ignorar o prazo máximo de confirmação de pagamento e deixar a negociação expirar, o que pode acionar arbitragem automática contra você.',
  'Migrar direto para tickets altos sem antes entender o fluxo completo com uma negociação pequena de teste.',
];

const FAQ = [
  { q: 'O Bisq exige KYC?', a: 'Não. O Bisq não pede documento, selfie nem comprovante de identidade em nenhuma etapa. A única exigência é o depósito de segurança em Bitcoin, que serve como garantia comportamental, não como identificação.' },
  { q: 'O que é o depósito de segurança do Bisq?', a: 'É uma quantia em Bitcoin que tanto comprador quanto vendedor travam antes da negociação começar. Se alguém tentar fraudar a operação, esse depósito pode ser usado para compensar a parte prejudicada após arbitragem. Ele é devolvido integralmente quando a negociação é concluída de forma legítima.' },
  { q: 'Preciso rodar meu próprio node Bitcoin para usar o Bisq?', a: 'Não é obrigatório. O Bisq pode se conectar a nodes públicos da rede, mas usuários mais avançados preferem apontar para o próprio node por privacidade e verificação independente das transações.' },
  { q: 'O que acontece se a contraparte não pagar dentro do prazo?', a: 'O Bisq abre uma janela de espera definida na oferta. Se o prazo expirar sem confirmação, a negociação pode ser escalada para mediação humana e, em último caso, para arbitragem, que decide o destino dos fundos travados no escrow com base nas evidências apresentadas por ambos os lados.' },
  { q: 'Qual a diferença entre Bisq clássico e Bisq Easy?', a: 'O Bisq 2, versão mais recente do projeto, introduziu o Bisq Easy: um fluxo simplificado para negociações de valor menor, com curva de aprendizado reduzida e liquidação mais rápida, pensado para trazer iniciantes ao ecossistema sem exigir o domínio completo da interface clássica.' },
  { q: 'É seguro negociar valores altos logo na primeira vez no Bisq?', a: 'Não é recomendado. A prática correta é começar com tickets pequenos, entender o fluxo completo de depósito, chat e liberação do escrow, e só depois aumentar o valor das negociações conforme ganha confiança na própria operação da ferramenta.' },
  { q: 'O Bisq funcina sem internet rápida ou em rede instável?', a: 'Como o Bisq depende de conexão constante com a rede Tor, conexões muito instáveis podem atrasar a sincronização de ofertas e mensagens. Uma internet estável, mesmo que não seja de alta velocidade, é suficiente para operar normalmente.' },
];

function Hero() {
  return (
    <section className="relative w-full" style={{ height: '92vh', minHeight: 720 }}>
      <img
        src={heroImg}
        alt="Interface escura de negociação peer-to-peer de Bitcoin sobre rede criptografada, representando o Bisq"
        width={1344}
        height={768}
        className="absolute inset-0 w-full h-full object-cover"
        loading="eager"
        fetchPriority="high"
        decoding="async"
      />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(14,59,58,0.55) 0%, rgba(14,59,58,0.35) 40%, rgba(14,59,58,0.9) 100%)' }} />
      <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.1, ease: APPLE_EASE }} className="relative z-10 h-full flex flex-col justify-end px-6 md:px-12 lg:px-20 pb-20 md:pb-28 max-w-[1600px] mx-auto">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.2 }} className="inline-flex items-center gap-3 mb-8">
          <span className="px-4 py-1.5 rounded-full text-xs font-bold tracking-[0.3em] uppercase backdrop-blur-md" style={{ backgroundColor: 'rgba(244,237,228,0.15)', color: '#f4ede4', border: '1px solid rgba(244,237,228,0.3)' }}>
            <Lock size={11} className="inline mr-2" /> P2P & Privacidade · Bisq
          </span>
        </motion.div>
        <motion.h1 initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} transition={{ duration: 1, delay: 0.15, ease: APPLE_EASE }} className="text-[clamp(2.75rem,8.5vw,7.5rem)] font-black leading-[0.95] tracking-tight max-w-[18ch]" style={{ fontFamily: "'Inter Tight', sans-serif", color: '#f4ede4' }}>
          Bisq: guia completo{' '}
          <span style={{ color: '#d98a4a', fontStyle: 'italic', fontWeight: 400, fontFamily: "'Playfair Display', serif", textShadow: '0 0 40px rgba(217,138,74,0.45), 0 0 80px rgba(217,138,74,0.25)' }}>
            sem servidor, sem KYC.
          </span>
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.5, ease: APPLE_EASE }} className="mt-8 max-w-2xl text-lg md:text-2xl leading-relaxed font-light" style={{ color: 'rgba(244,237,228,0.85)', fontFamily: "'Inter Tight', sans-serif" }}>
          Instalação, rede Tor, depósito de segurança, contas de pagamento no Brasil, taxas, mediação, Bisq 2 com Bisq Easy, e o passo a passo real da primeira compra sem sair de casa.
        </motion.p>
      </motion.div>
    </section>
  );
}

export default function BisqGuiaCompleto() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <>
      <SeoHead
        path="/p2p/bisq-guia-completo"
        custom={{
          title: 'Bisq: Guia Completo 2026 — Instalação, Tor e Primeira Compra',
          description:
            'Guia completo do Bisq: instalação, rede Tor, depósito de segurança, contas de pagamento no Brasil, taxas, mediação e arbitragem, Bisq 2 com Bisq Easy e passo a passo da primeira compra.',
          canonical: 'https://lordjunnior.com.br/p2p/bisq-guia-completo',
          primaryKeyword: 'bisq guia completo',
          lsiKeywords: ['como usar bisq', 'bisq tor', 'bisq depósito de segurança', 'bisq easy', 'comprar bitcoin sem kyc bisq', 'mediação arbitragem bisq'],
          longTailKeywords: ['como instalar o bisq passo a passo', 'como funciona o depósito de segurança do bisq', 'diferença entre bisq e bisq easy', 'como comprar bitcoin no bisq pela primeira vez'],
          breadcrumbs: [
            { name: 'Início', url: '/' },
            { name: 'P2P', url: '/p2p' },
            { name: 'Bisq: guia completo', url: '/p2p/bisq-guia-completo' },
          ],
          schemaType: 'Article',
          articleSection: 'P2P & Privacidade',
          relatedPages: ['/p2p/como-vender-bitcoin-p2p', '/soberania-financeira/exchanges-privacidade-e-kyc', '/comprar-bitcoin-com-privacidade', '/autocustodia'],
        }}
        faqItems={FAQ.map((f) => ({ question: f.q, answer: f.a }))}
      />

      <div className="relative min-h-screen" style={{ backgroundColor: '#f4ede4', color: '#1c2624', fontFamily: "'Inter Tight', sans-serif" }}>
        <div className="absolute top-0 left-0 right-0 z-30 px-6 md:px-12 lg:px-20 pt-[52px]">
          <BackToHome />
        </div>

        <Hero />

        {/* CAPÍTULO 1 — O que é o Bisq */}
        <section className="relative px-6 md:px-12 lg:px-20 py-24 md:py-36">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 max-w-[1600px] mx-auto">
            <motion.aside {...fade(0)} className="lg:col-span-4">
              <div className="sticky top-24">
                <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#d98a4a' }}>Capítulo 01</span>
                <div className="h-[2px] w-16 mb-6" style={{ backgroundColor: '#d98a4a' }} />
                <p className="text-sm uppercase tracking-[0.2em] font-semibold" style={{ color: '#5a6664' }}>O que é o Bisq</p>
              </div>
            </motion.aside>
            <motion.div {...fade(0.1)} className="lg:col-span-8">
              <h2 className="text-[clamp(2.25rem,5.5vw,5rem)] font-black leading-[1] tracking-tight mb-10" style={{ color: '#0e3b3a' }}>
                Sem empresa, sem servidor,{' '}
                <span style={{ color: '#d98a4a', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>sem ponto único de falha.</span>
              </h2>
              <div className="space-y-7 text-lg md:text-xl leading-[1.7] font-light" style={{ color: '#2d3a37' }}>
                <p>
                  Bisq é um software de código aberto que conecta compradores e vendedores de Bitcoin diretamente, através de uma rede descentralizada rodando sobre Tor. Não existe empresa dona da plataforma, não existe servidor central para derrubar, subpoenar ou hackear, e nenhum usuário passa por verificação de identidade em nenhuma etapa.
                </p>
                <p>
                  Cada negociação é protegida por um contrato de depósito de segurança em Bitcoin, e disputas são resolvidas por mediadores e árbitros da própria comunidade, escolhidos por reputação dentro do protocolo. É a arquitetura mais próxima do ideal cypherpunk original de troca de valor sem intermediário confiável obrigatório.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* CAPÍTULO 2 — Instalação e Tor */}
        <section className="relative px-6 md:px-12 lg:px-20 py-24 md:py-36" style={{ backgroundColor: '#0e3b3a' }}>
          <div className="max-w-[1600px] mx-auto">
            <motion.div {...fade(0)} className="mb-14 max-w-3xl">
              <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#ffb37a' }}>Capítulo 02 · Instalação</span>
              <h2 className="text-[clamp(2.25rem,5vw,4.5rem)] font-black leading-[1.05] tracking-tight" style={{ color: '#f4ede4' }}>
                <Wifi size={40} className="inline mr-4 mb-2" style={{ color: '#ffb37a' }} />
                Cinco passos até sua primeira oferta.
              </h2>
            </motion.div>
            <div className="space-y-5">
              {PASSOS_INSTALACAO.map((p, i) => (
                <motion.div key={p.n} {...fade(i * 0.05)} className="flex flex-col md:flex-row gap-6 p-7 rounded-2xl" style={{ backgroundColor: 'rgba(244,237,228,0.06)', border: '1px solid rgba(255,179,122,0.18)' }}>
                  <span className="text-3xl font-black shrink-0" style={{ color: '#ffb37a', fontFamily: "'Playfair Display', serif" }}>{p.n}</span>
                  <div>
                    <h3 className="text-xl font-bold mb-2" style={{ color: '#f4ede4' }}>{p.titulo}</h3>
                    <p className="text-base leading-relaxed font-light" style={{ color: 'rgba(244,237,228,0.75)' }}>{p.texto}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CAPÍTULO 3 — Depósito de segurança */}
        <section className="relative px-6 md:px-12 lg:px-20 py-24 md:py-36">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 max-w-[1600px] mx-auto items-center">
            <motion.div {...fade(0)} className="lg:col-span-6">
              <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#d98a4a' }}>Capítulo 03 · Depósito de segurança</span>
              <h2 className="text-[clamp(2rem,4.5vw,3.75rem)] font-black leading-[1.05] tracking-tight mb-8" style={{ color: '#0e3b3a' }}>
                O incentivo econômico que substitui a confiança cega.
              </h2>
              <div className="space-y-6 text-lg leading-[1.7] font-light" style={{ color: '#2d3a37' }}>
                <p>
                  Antes de qualquer negociação começar, tanto comprador quanto vendedor travam uma quantia em Bitcoin como depósito de segurança, geralmente entre 5% e 20% do valor negociado. Esse valor fica bloqueado junto com o principal da transação em um endereço multisig controlado pelo protocolo.
                </p>
                <p>
                  Se alguém tentar fraudar a negociação, sumir sem pagar ou sem liberar os fundos, o depósito de segurança dessa parte pode ser usado para compensar a vítima após decisão do mediador ou árbitro. Isso torna economicamente irracional tentar aplicar golpe dentro do Bisq: o custo potencial de perder o depósito supera o ganho de tentar fraudar uma negociação pequena.
                </p>
              </div>
            </motion.div>
            <motion.div {...fade(0.15)} className="lg:col-span-6">
              <div className="relative h-[420px] md:h-[520px] overflow-hidden rounded-3xl">
                <img src={contaImg} alt="Painel de controle escuro representando o gerenciamento de fundos e depósito de segurança no Bisq" loading="lazy" width={1600} height={1000} className="absolute inset-0 w-full h-full object-cover" />
              </div>
            </motion.div>
          </div>
        </section>

        {/* CAPÍTULO 4 — Criação de oferta e contas no Brasil */}
        <section className="relative px-6 md:px-12 lg:px-20 py-24 md:py-36" style={{ backgroundColor: '#ece2d3' }}>
          <div className="max-w-[1600px] mx-auto">
            <motion.div {...fade(0)} className="mb-14 max-w-3xl">
              <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#d98a4a' }}>Capítulo 04 · Contas de pagamento</span>
              <h2 className="text-[clamp(2.25rem,5vw,4.5rem)] font-black leading-[1.05] tracking-tight" style={{ color: '#0e3b3a' }}>
                Criar oferta é simples. Escolher o método certo é o que importa.
              </h2>
            </motion.div>
            <p className="text-lg leading-relaxed font-light max-w-3xl mb-10" style={{ color: '#2d3a37' }}>
              Para criar uma oferta, defina se você quer comprar ou vender, o valor em BTC ou em fiat, o método de pagamento aceito e a margem sobre o preço de mercado. O Bisq calcula automaticamente o depósito de segurança exigido conforme o risco do método escolhido.
            </p>
            <div className="overflow-x-auto rounded-2xl" style={{ border: '1px solid rgba(14,59,58,0.12)' }}>
              <table className="w-full min-w-[760px] text-left" style={{ backgroundColor: '#f4ede4' }}>
                <thead>
                  <tr style={{ backgroundColor: '#0e3b3a' }}>
                    <th className="p-5 text-sm font-bold uppercase tracking-wider" style={{ color: '#f4ede4' }}>Método</th>
                    <th className="p-5 text-sm font-bold uppercase tracking-wider" style={{ color: '#f4ede4' }}>Observação</th>
                  </tr>
                </thead>
                <tbody>
                  {CONTAS_BR.map((c, i) => (
                    <tr key={c.metodo} style={{ backgroundColor: i % 2 === 0 ? '#f4ede4' : '#ece2d3' }}>
                      <td className="p-5 font-bold" style={{ color: '#0e3b3a' }}>{c.metodo}</td>
                      <td className="p-5 text-sm leading-relaxed" style={{ color: '#2d3a37' }}>{c.obs}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-8 rounded-2xl p-6 md:p-8 flex items-start gap-5" style={{ backgroundColor: '#3a1414', border: '1px solid rgba(255,120,90,0.35)' }}>
              <AlertTriangle size={28} className="shrink-0 mt-1" style={{ color: '#ff9d7a' }} />
              <div>
                <p className="text-xl md:text-2xl font-black tracking-tight mb-2" style={{ color: '#ffb37a' }}>PIX NÃO É PRIVADO</p>
                <p className="text-base md:text-lg leading-relaxed font-light" style={{ color: 'rgba(244,237,228,0.85)' }}>
                  O Bisq não lista PIX como método padrão de pagamento, mas nada impede negociação combinada informalmente fora do protocolo. Não faça isso. Se optar por transferência nacional, o Bisq trata como método de risco elevado exatamente pela mesma razão do PIX: liquidação instantânea sem privacidade nenhuma e alto potencial de estorno fraudulento.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CAPÍTULO 5 — Taxas */}
        <section className="relative px-6 md:px-12 lg:px-20 py-24 md:py-36">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 max-w-[1600px] mx-auto">
            <motion.aside {...fade(0)} className="lg:col-span-4">
              <div className="sticky top-24">
                <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#d98a4a' }}>Capítulo 05</span>
                <div className="h-[2px] w-16 mb-6" style={{ backgroundColor: '#d98a4a' }} />
                <p className="text-sm uppercase tracking-[0.2em] font-semibold" style={{ color: '#5a6664' }}>Estrutura de taxas</p>
              </div>
            </motion.aside>
            <motion.div {...fade(0.1)} className="lg:col-span-8">
              <div className="space-y-4">
                {TAXAS.map((t) => (
                  <div key={t.item} className="flex flex-col md:flex-row md:items-center justify-between gap-2 p-6 rounded-xl" style={{ backgroundColor: '#ece2d3' }}>
                    <span className="font-bold" style={{ color: '#0e3b3a' }}>{t.item}</span>
                    <span className="text-sm md:text-base font-light" style={{ color: '#2d3a37' }}>{t.valor}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* CAPÍTULO 6 — Mediação e arbitragem */}
        <section className="relative px-6 md:px-12 lg:px-20 py-24 md:py-36" style={{ backgroundColor: '#0e3b3a' }}>
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 max-w-[1600px] mx-auto items-center">
            <motion.div {...fade(0)} className="lg:col-span-6 order-2 lg:order-1">
              <div className="relative h-[380px] md:h-[480px] overflow-hidden rounded-3xl">
                <img src={mediacaoImg} alt="Camadas de defesa em ambiente escuro representando o processo de mediação e arbitragem do Bisq" loading="lazy" width={1600} height={1000} className="absolute inset-0 w-full h-full object-cover" />
              </div>
            </motion.div>
            <motion.div {...fade(0.1)} className="lg:col-span-6 order-1 lg:order-2">
              <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#ffb37a' }}>Capítulo 06 · Mediação e arbitragem</span>
              <h2 className="text-[clamp(2rem,4.5vw,3.75rem)] font-black leading-[1.05] tracking-tight mb-8" style={{ color: '#f4ede4' }}>
                <Scale size={36} className="inline mr-3 mb-2" style={{ color: '#ffb37a' }} />
                Quando algo dá errado, alguém decide com evidência.
              </h2>
              <div className="space-y-6 text-lg leading-[1.7] font-light" style={{ color: 'rgba(244,237,228,0.8)' }}>
                <p>
                  Se uma das partes não cumprir o combinado, a negociação é escalada primeiro para mediação: um voluntário da comunidade analisa o chat criptografado da transação, os comprovantes enviados e propõe uma solução amigável entre as partes.
                </p>
                <p>
                  Se a mediação não resolver, o caso vai para arbitragem, etapa final em que um árbitro decide unilateralmente o destino dos fundos travados no escrow, com base nas evidências apresentadas. É por isso que documentar tudo dentro do próprio chat da negociação, e nunca fora dele, é regra inegociável.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* CAPÍTULO 7 — Bisq 2 e Bisq Easy */}
        <section className="relative px-6 md:px-12 lg:px-20 py-24 md:py-36" style={{ backgroundColor: '#ece2d3' }}>
          <div className="max-w-[1600px] mx-auto">
            <motion.div {...fade(0)} className="mb-14 max-w-3xl">
              <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#d98a4a' }}>Capítulo 07 · Bisq 2 e Bisq Easy</span>
              <h2 className="text-[clamp(2.25rem,5vw,4.5rem)] font-black leading-[1.05] tracking-tight" style={{ color: '#0e3b3a' }}>
                A versão nova nasceu para quem tem medo de interface complicada.
              </h2>
            </motion.div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-8 rounded-2xl" style={{ backgroundColor: '#f4ede4', border: '1px solid rgba(14,59,58,0.08)' }}>
                <Layers size={28} style={{ color: '#d98a4a' }} className="mb-4" />
                <h3 className="text-xl font-bold mb-3" style={{ color: '#0e3b3a' }}>Bisq clássico</h3>
                <p className="text-base leading-relaxed font-light" style={{ color: '#2d3a37' }}>
                  Interface completa, com todos os métodos de pagamento, controle fino sobre margem, taxa e depósito de segurança. Curva de aprendizado maior, indicado para quem já negocia P2P com frequência.
                </p>
              </div>
              <div className="p-8 rounded-2xl" style={{ backgroundColor: '#f4ede4', border: '1px solid rgba(14,59,58,0.08)' }}>
                <Zap size={28} style={{ color: '#d98a4a' }} className="mb-4" />
                <h3 className="text-xl font-bold mb-3" style={{ color: '#0e3b3a' }}>Bisq Easy (Bisq 2)</h3>
                <p className="text-base leading-relaxed font-light" style={{ color: '#2d3a37' }}>
                  Fluxo simplificado para tickets menores, pensado para trazer iniciantes à rede sem exigir domínio total da interface clássica. Reduz fricção na primeira negociação, mantendo o mesmo princípio de descentralização e ausência de KYC.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CAPÍTULO 8 — Limites, erros comuns e primeira compra */}
        <section className="relative px-6 md:px-12 lg:px-20 py-24 md:py-36">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 max-w-[1600px] mx-auto">
            <motion.aside {...fade(0)} className="lg:col-span-4">
              <div className="sticky top-24">
                <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#d98a4a' }}>Capítulo 08</span>
                <div className="h-[2px] w-16 mb-6" style={{ backgroundColor: '#d98a4a' }} />
                <p className="text-sm uppercase tracking-[0.2em] font-semibold" style={{ color: '#5a6664' }}>Erros comuns e primeira compra</p>
              </div>
            </motion.aside>
            <motion.div {...fade(0.1)} className="lg:col-span-8">
              <h3 className="text-2xl md:text-3xl font-black mb-6" style={{ color: '#0e3b3a' }}>Erros que custam caro</h3>
              <ul className="space-y-4 mb-14">
                {ERROS_BISQ.map((e, i) => (
                  <li key={i} className="flex items-start gap-3 text-base md:text-lg leading-relaxed font-light" style={{ color: '#2d3a37' }}>
                    <AlertTriangle size={20} className="shrink-0 mt-1" style={{ color: '#d98a4a' }} />
                    {e}
                  </li>
                ))}
              </ul>

              <h3 className="text-2xl md:text-3xl font-black mb-6" style={{ color: '#0e3b3a' }}>Passo a passo da primeira compra</h3>
              <div className="space-y-4">
                {[
                  'Instale o Bisq, deixe o Tor sincronizar completamente e anote a seed da carteira interna em papel.',
                  'Financie a carteira com um valor pequeno de Bitcoin, apenas o suficiente para cobrir o depósito de segurança de uma negociação de teste.',
                  'Navegue pelas ofertas de venda disponíveis, filtrando por método de pagamento que você já usa no dia a dia.',
                  'Escolha uma oferta de vendedor com boa reputação e ticket baixo para sua primeira negociação.',
                  'Confirme os termos, trave o depósito de segurança e realize o pagamento fiat exatamente como combinado no chat da negociação.',
                  'Envie o comprovante dentro do próprio chat criptografado da negociação, nunca por outro canal.',
                  'Aguarde a confirmação do vendedor e a liberação do Bitcoin do escrow para sua carteira interna.',
                  'Depois de concluída, retire o Bitcoin da carteira do Bisq para sua carteira de autocustódia pessoal.',
                ].map((step, i) => (
                  <div key={i} className="flex items-start gap-4 p-5 rounded-xl" style={{ backgroundColor: '#ece2d3' }}>
                    <CheckCircle2 size={22} className="shrink-0 mt-0.5" style={{ color: '#0e3b3a' }} />
                    <p className="text-base md:text-lg leading-relaxed font-light" style={{ color: '#2d3a37' }}>{step}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* CAPÍTULO 9 — FAQ */}
        <section className="relative px-6 md:px-12 lg:px-20 py-24 md:py-36" style={{ backgroundColor: '#ece2d3' }}>
          <div className="max-w-[1100px] mx-auto">
            <motion.div {...fade(0)} className="mb-14">
              <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#d98a4a' }}>Capítulo 09 · Perguntas que importam</span>
              <h2 className="text-[clamp(2.25rem,5vw,4.5rem)] font-black leading-[1] tracking-tight" style={{ color: '#0e3b3a' }}>
                Antes de instalar,{' '}
                <span style={{ color: '#d98a4a', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>a dúvida certa.</span>
              </h2>
            </motion.div>
            <div className="space-y-3">
              {FAQ.map((f, i) => {
                const open = openFaq === i;
                return (
                  <motion.div key={i} {...fade(i * 0.03)} className="rounded-2xl overflow-hidden" style={{ backgroundColor: '#f4ede4', boxShadow: open ? '0 8px 24px rgba(14,59,58,0.1)' : '0 1px 3px rgba(14,59,58,0.05)' }}>
                    <button onClick={() => setOpenFaq(open ? null : i)} className="w-full flex items-center justify-between gap-6 p-6 md:p-8 text-left">
                      <span className="text-lg md:text-xl font-bold leading-snug" style={{ color: '#0e3b3a' }}>{f.q}</span>
                      <ChevronDown size={22} className="shrink-0 transition-transform duration-500" style={{ color: '#d98a4a', transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }} />
                    </button>
                    {open && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} transition={{ duration: 0.5, ease: APPLE_EASE }} className="px-6 md:px-8 pb-8">
                        <p className="text-base md:text-lg leading-relaxed font-light" style={{ color: '#2d3a37' }}>{f.a}</p>
                      </motion.div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CAPÍTULO 10 — Continue sua trilha */}
        <section className="relative py-24 md:py-32 px-6 md:px-12 lg:px-20" style={{ backgroundColor: '#0e3b3a', color: '#f4ede4' }}>
          <div className="max-w-[1400px] mx-auto">
            <motion.div {...fade(0)} className="mb-12 max-w-2xl">
              <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#ffb37a' }}>Continue sua trilha</span>
              <h2 className="text-[clamp(2rem,4.5vw,4rem)] font-black leading-[1] tracking-tight">
                O Bisq é uma ferramenta.{' '}
                <span style={{ color: '#ffb37a', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>A estratégia é sua.</span>
              </h2>
            </motion.div>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { to: '/p2p/como-vender-bitcoin-p2p', titulo: 'Como vender Bitcoin P2P', texto: 'Volte ao hub: riscos, OpSec e visão geral de todas as plataformas P2P.' },
                { to: '/soberania-financeira/exchanges-privacidade-e-kyc', titulo: 'Exchanges sem KYC', texto: 'Outras opções para operar Bitcoin sem expor identidade.' },
                { to: '/autocustodia', titulo: 'Autocustódia', texto: 'Depois de comprar no Bisq, retire e seja seu próprio banco.' },
                { to: '/dicionario-cripto', titulo: 'Glossario de soberania', texto: 'Do UTXO ao domicilio fiscal: todos os termos tecnicos deste site explicados em uma pagina.' },
              ].map((c) => (
                <Link key={c.to} to={c.to} className="group p-8 rounded-2xl transition-all hover:-translate-y-1" style={{ backgroundColor: 'rgba(244,237,228,0.06)', border: '1px solid rgba(255,179,122,0.18)' }}>
                  <h3 className="text-xl font-black leading-tight mb-3" style={{ color: '#f4ede4' }}>{c.titulo}</h3>
                  <p className="text-base leading-relaxed font-light mb-5" style={{ color: 'rgba(244,237,228,0.75)' }}>{c.texto}</p>
                  <span className="inline-flex items-center gap-2 text-sm font-bold tracking-wider uppercase transition-transform group-hover:translate-x-1" style={{ color: '#ffb37a' }}>
                    Acessar <ArrowRight size={16} />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
