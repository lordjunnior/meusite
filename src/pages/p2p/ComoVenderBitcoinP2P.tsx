import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ShieldAlert, ShieldCheck, Users, Handshake, Scale, Lock,
  AlertTriangle, ChevronDown, ArrowRight, Eye, Landmark,
  Fingerprint, Banknote, MapPin, Repeat, ExternalLink,
} from 'lucide-react';
import SeoHead from '@/components/SeoHead';
import BackToHome from '@/components/BackToHome';
import heroImg from '@/assets/p2p/p2p-hero.webp';
import handshakeImg from '@/assets/p2p/p2p-handshake.webp';
import trocaImg from '@/assets/exchanges/p2p-troca.webp';
import kycImg from '@/assets/kycnot-hero.webp';

/**
 * /p2p/como-vender-bitcoin-p2p
 * Hub sobre venda P2P de Bitcoin: riscos, boas práticas de OpSec, plataformas.
 * Paleta: Sand #f4ede4 / #ece2d3, Deep Teal #0e3b3a, cobre/âmbar #d98a4a.
 */

const APPLE_EASE = [0.22, 1, 0.36, 1] as const;
const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.8, ease: APPLE_EASE, delay },
});

const TIPOS_CONTRAPARTE = [
  {
    nome: 'Pessoa física comum',
    icon: Users,
    descricao:
      'Alguém querendo comprar sats fora do circuito das exchanges regulamentadas, geralmente por privacidade, por estar bloqueado de bancos, ou por não querer deixar rastro de acumulação. É a contraparte mais comum e, com boas práticas, a mais segura.',
  },
  {
    nome: 'Trader profissional / mesa de câmbio informal',
    icon: Landmark,
    descricao:
      'Opera volume alto, tem reputação construída ao longo de anos, geralmente já tem processo de compliance próprio. Cobra spread menor mas exige negociação mais fria e objetiva.',
  },
  {
    nome: 'Golpista disfarçado de comprador',
    icon: ShieldAlert,
    descricao:
      'Usa conta bancária de terceiro, dinheiro de origem criminosa, ou aplica estorno depois de receber os sats. É a razão pela qual escrow e reputação existem. Trate toda negociação como se essa fosse a hipótese até prova em contrário.',
  },
  {
    nome: 'Comprador institucional / OTC',
    icon: Scale,
    descricao:
      'Empresas e fundos que compram lotes grandes fora do book de exchanges para não mover o preço. Normalmente exigem KYC próprio e contrato assinado, mas pagam com liquidação garantida.',
  },
];

const RISCOS = [
  {
    titulo: 'Golpe do estorno (chargeback)',
    icon: Repeat,
    texto:
      'O comprador paga via TED, PIX ou cartão, você libera o Bitcoin, e horas ou dias depois ele contesta a transação junto ao banco alegando fraude. O banco estorna o dinheiro para ele, e você fica sem o fiat e sem o Bitcoin. É o golpe mais comum contra vendedores desavisados, e cresce justamente com PIX por causa da velocidade de contestação no aplicativo bancário.',
  },
  {
    titulo: 'Dinheiro de origem ilícita (dinheiro sujo)',
    icon: Banknote,
    texto:
      'Você recebe um PIX ou TED que na verdade é produto de golpe aplicado contra terceiro (falso frete, golpe do WhatsApp, phishing bancário). A vítima registra boletim de ocorrência, o banco identifica o fluxo e sua conta é apontada como destino final do dinheiro, mesmo você sendo apenas o vendedor de Bitcoin que recebeu o pagamento.',
  },
  {
    titulo: 'Bloqueio judicial ou cautelar da conta bancária',
    icon: Lock,
    texto:
      'Movimentação atípica somada a reclamação de terceiro é motivo suficiente para o banco bloquear preventivamente sua conta e reportar ao COAF. Reverter um bloqueio leva semanas e exige provar a legitimidade de cada transação, uma por uma.',
  },
  {
    titulo: 'Encontro presencial mal planejado',
    icon: MapPin,
    texto:
      'Negociar em dinheiro vivo presencialmente expõe a assalto, extorsão ou emboscada, principalmente quando o valor é combinado publicamente em grupo de Telegram ou fórum aberto. Local errado, horário errado e falta de acompanhante transformam uma troca simples em risco físico real.',
  },
  {
    titulo: 'Exposição de identidade e padrão de vida',
    icon: Fingerprint,
    texto:
      'Repetir sempre a mesma conta bancária, o mesmo horário, o mesmo ponto de encontro ou vender sempre para o mesmo grupo de contrapartes cria um padrão fácil de mapear. Quem estuda seu histórico de vendas sabe quanto Bitcoin você tem, quando você costuma vender e onde te encontrar.',
  },
  {
    titulo: 'Confusão entre P2P sem escrow e golpe puro',
    icon: Eye,
    texto:
      'Negociar fora de plataforma com escrow, apenas na conversa direta, tirando a segurança do depósito de garantia por "confiança" ou pressa, é a porta de entrada mais comum para perder Bitcoin sem nenhum recurso possível depois.',
  },
];

const OPSEC = [
  'Nunca negocie fora do escrow da plataforma. O depósito de garantia (security deposit) é o que impede o comprador de sumir depois de receber os sats sem pagar, e impede você de sumir depois de receber o pagamento sem liberar.',
  'Exija que o nome do titular da conta pagadora seja o mesmo nome do usuário verificado na plataforma. Pagamento de terceiro é a bandeira vermelha número um de golpe ou lavagem.',
  'Prefira TED com comprovante bancário oficial a PIX sempre que o valor for alto. TED tem rastro bancário mais lento para reverter de forma fraudulenta; PIX é instantâneo em ambas as direções, inclusive para o golpe.',
  'Jamais combine encontro presencial em local público exposto ou combinado abertamente em grupo online. Prefira agência bancária, com o próprio banco como testemunha da transação em espécie.',
  'Construa reputação aos poucos. Comece com valores pequenos em plataformas que registram histórico de negociação, e só suba o ticket depois de dezenas de trocas sem disputa.',
  'Use conta bancária dedicada exclusivamente a operações P2P, separada da sua conta de salário e de gastos do dia a dia, para não misturar padrão de consumo com padrão de negociação.',
  'Documente tudo: prints da conversa, comprovante de pagamento, extrato da plataforma. Em caso de disputa, quem tem documentação organizada vence a mediação.',
  'Nunca revele saldo total em custódia, quantidade de negociações feitas no mês, ou dados que permitam a um comprador malicioso estimar seu patrimônio em Bitcoin.',
];

const PLATAFORMAS = [
  {
    nome: 'Bisq',
    tipo: 'Descentralizado, sem KYC',
    destaque: 'Rede Tor nativa, depósito de segurança on-chain, sem servidor central para derrubar ou subpoenar.',
  },
  {
    nome: 'RoboSats',
    tipo: 'Descentralizado, Lightning',
    destaque: 'Escrow em Lightning Network, liquidação rápida, ideal para tickets menores e alta rotatividade.',
  },
  {
    nome: 'Hodl Hodl',
    tipo: 'Não custodial, multisig 2-de-3',
    destaque: 'Bitcoin fica em multisig durante a negociação, a plataforma nunca detém a chave sozinha.',
  },
  {
    nome: 'Peach',
    tipo: 'Descentralizado, mobile-first',
    destaque: 'App simples com escrow via Lightning, boa curva de aprendizado para iniciante em P2P.',
  },
  {
    nome: 'Encontro presencial (LocalCoinSwap / grupos locais)',
    tipo: 'Sem plataforma de escrow formal',
    destaque: 'Maior risco físico e de golpe, exige protocolo próprio de segurança e testemunhas.',
  },
];

const ERROS = [
  'Aceitar pagamento de conta com nome diferente do cadastro na plataforma "porque o comprador jurou que ia dar tudo certo".',
  'Liberar Bitcoin antes da confirmação bancária completa, apenas com print de comprovante que pode ser forjado.',
  'Divulgar número de WhatsApp pessoal em grupo aberto de compra e venda, misturando identidade real com atividade financeira sensível.',
  'Negociar valores altos na primeira transação com contraparte sem histórico nenhum de reputação.',
  'Ignorar o aviso de segurança da própria plataforma sobre contas recém-criadas ou sem verificação alguma.',
  'Tratar PIX como método privado ou anônimo. PIX deixa rastro completo entre bancos, Banco Central e Receita Federal.',
];

const FAQ = [
  {
    q: 'Vender Bitcoin P2P é ilegal no Brasil?',
    a: 'Não. A venda peer-to-peer de Bitcoin é legal no Brasil. O que pode gerar problema não é o ato de vender, mas receber dinheiro de origem ilícita sem saber, ou ter a conta apontada por movimentação atípica sem documentação de suporte. A operação em si é lícita e crescente.',
  },
  {
    q: 'PIX é seguro para vender Bitcoin P2P?',
    a: 'PIX é rápido, mas não é privado e é o método mais usado em golpes de estorno por causa da velocidade de contestação. Todo PIX é rastreável entre CPF pagador e recebedor, registrado no Banco Central e disponível à Receita Federal. Para valores relevantes, TED com comprovante formal costuma reduzir a chance de fraude por estorno.',
  },
  {
    q: 'O que é escrow e por que ele é obrigatório em qualquer negociação séria?',
    a: 'Escrow é o mecanismo em que o Bitcoin do vendedor fica retido (em multisig, contrato Lightning ou depósito de segurança) até que ambas as partes confirmem que a transação foi cumprida. Sem escrow, qualquer um dos dois lados pode simplesmente sumir depois de receber sua parte, sem nenhum recurso possível para a vítima.',
  },
  {
    q: 'Como funciona a reputação nas plataformas P2P?',
    a: 'Cada negociação concluída sem disputa soma histórico ao perfil do usuário. Perfis com centenas de trocas concluídas, sem reclamação, tendem a ser mais confiáveis. Perfis novos, sem histórico, exigem cautela redobrada e tickets menores até construir confiança mútua.',
  },
  {
    q: 'O que fazer se o comprador tentar aplicar chargeback depois da negociação?',
    a: 'Reúna toda a documentação da negociação (prints, comprovante bancário, histórico da plataforma) e acione a mediação da própria plataforma imediatamente. Em paralelo, registre boletim de ocorrência para deixar registro formal de que a transação foi legítima, caso o banco tente reverter o crédito.',
  },
  {
    q: 'É mais seguro vender presencialmente ou por plataforma online?',
    a: 'Plataformas com escrow reduzem drasticamente o risco financeiro por terem mecanismo de garantia e mediação. Encontros presenciais eliminam o risco de estorno bancário, mas introduzem risco físico de assalto. Cada modalidade tem seu próprio conjunto de riscos, e a escolha depende do perfil de risco que você está disposto a assumir.',
  },
  {
    q: 'Preciso declarar imposto de renda sobre venda de Bitcoin P2P?',
    a: 'Sim. Vendas de Bitcoin acima de R$ 35 mil no mês são tributáveis e devem ser declaradas à Receita Federal, independentemente do canal usado (exchange centralizada ou P2P). Manter registro organizado das operações facilita a apuração de imposto e protege em caso de fiscalização.',
  },
  {
    q: 'Qual a diferença entre P2P e uma exchange centralizada comum?',
    a: 'Na exchange centralizada, a própria empresa é a contraparte de todas as negociações e custodia os fundos durante o processo, exigindo KYC completo. No P2P, comprador e vendedor negociam diretamente, a plataforma apenas viabiliza o encontro e o escrow, geralmente com exigência de identificação bem menor ou nenhuma.',
  },
];

function Hero() {
  return (
    <section className="relative w-full" style={{ height: '92vh', minHeight: 720 }}>
      <img
        src={heroImg}
        alt="Duas pessoas fechando negociação de Bitcoin de forma direta, representando a troca peer-to-peer sem intermediário"
        width={1024}
        height={1024}
        className="absolute inset-0 w-full h-full object-cover"
        loading="eager"
        fetchPriority="high"
        decoding="async"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, rgba(14,59,58,0.55) 0%, rgba(14,59,58,0.35) 40%, rgba(14,59,58,0.9) 100%)',
        }}
      />
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, ease: APPLE_EASE }}
        className="relative z-10 h-full flex flex-col justify-end px-6 md:px-12 lg:px-20 pb-20 md:pb-28 max-w-[1600px] mx-auto"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-3 mb-8"
        >
          <span
            className="px-4 py-1.5 rounded-full text-xs font-bold tracking-[0.3em] uppercase backdrop-blur-md"
            style={{
              backgroundColor: 'rgba(244,237,228,0.15)',
              color: '#f4ede4',
              border: '1px solid rgba(244,237,228,0.3)',
            }}
          >
            <Handshake size={11} className="inline mr-2" /> P2P & Privacidade
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1, delay: 0.15, ease: APPLE_EASE }}
          className="text-[clamp(2.75rem,8.5vw,7.5rem)] font-black leading-[0.95] tracking-tight max-w-[20ch]"
          style={{ fontFamily: "'Inter Tight', sans-serif", color: '#f4ede4' }}
        >
          Como vender Bitcoin P2P{' '}
          <span
            style={{
              color: '#d98a4a',
              fontStyle: 'italic',
              fontWeight: 400,
              fontFamily: "'Playfair Display', serif",
              textShadow: '0 0 40px rgba(217,138,74,0.45), 0 0 80px rgba(217,138,74,0.25)',
            }}
          >
            sem virar estatística.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: APPLE_EASE }}
          className="mt-8 max-w-2xl text-lg md:text-2xl leading-relaxed font-light"
          style={{ color: 'rgba(244,237,228,0.85)', fontFamily: "'Inter Tight', sans-serif" }}
        >
          O guia completo de negociação peer-to-peer: escrow, reputação, riscos reais de golpe e bloqueio de conta, boas práticas de OpSec e visão geral das plataformas que dispensam KYC. Sem intermediário custodiando seu Bitcoin, sem exchange decidindo se você pode sacar.
        </motion.p>
      </motion.div>
    </section>
  );
}

function PixAlert() {
  return (
    <div
      className="my-10 rounded-2xl p-6 md:p-8 flex items-start gap-5"
      style={{ backgroundColor: '#3a1414', border: '1px solid rgba(255,120,90,0.35)' }}
    >
      <AlertTriangle size={28} className="shrink-0 mt-1" style={{ color: '#ff9d7a' }} />
      <div>
        <p className="text-xl md:text-2xl font-black tracking-tight mb-2" style={{ color: '#ffb37a' }}>
          PIX NÃO É PRIVADO
        </p>
        <p className="text-base md:text-lg leading-relaxed font-light" style={{ color: 'rgba(244,237,228,0.85)' }}>
          Todo PIX registra CPF de origem, CPF de destino, valor, horário e instituição em base compartilhada entre bancos, Banco Central e Receita Federal. Usar PIX em negociação P2P não te dá anonimato nenhum, apenas velocidade, e essa mesma velocidade é o que torna o PIX o método preferido para golpe de estorno.
        </p>
      </div>
    </div>
  );
}

export default function ComoVenderBitcoinP2P() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <>
      <SeoHead
        path="/p2p/como-vender-bitcoin-p2p"
        custom={{
          title: 'Como Vender Bitcoin P2P com Segurança: Guia Completo 2026',
          description:
            'Como vender Bitcoin P2P sem cair em golpe: escrow, reputação, riscos reais de estorno e bloqueio de conta, boas práticas de OpSec e comparativo de plataformas Bisq, RoboSats, Hodl Hodl e Peach.',
          canonical: 'https://lordjunnior.com.br/p2p/como-vender-bitcoin-p2p',
          primaryKeyword: 'como vender bitcoin p2p',
          lsiKeywords: [
            'venda peer to peer bitcoin',
            'escrow bitcoin',
            'golpe pix bitcoin',
            'reputação p2p bitcoin',
            'bisq robosats hodl hodl',
            'bitcoin sem kyc brasil',
          ],
          longTailKeywords: [
            'como vender bitcoin p2p sem cair em golpe',
            'é seguro vender bitcoin por pix',
            'o que é escrow em negociação de bitcoin',
            'quais plataformas p2p de bitcoin sem kyc',
          ],
          breadcrumbs: [
            { name: 'Início', url: '/' },
            { name: 'P2P', url: '/p2p' },
            { name: 'Como vender Bitcoin P2P', url: '/p2p/como-vender-bitcoin-p2p' },
          ],
          schemaType: 'Article',
          articleSection: 'P2P & Privacidade',
          relatedPages: [
            '/soberania-financeira/exchanges-privacidade-e-kyc',
            '/comprar-bitcoin-com-privacidade',
            '/autocustodia',
            '/p2p/bisq-guia-completo',
          ],
        }}
        faqItems={FAQ.map((f) => ({ question: f.q, answer: f.a }))}
      />

      <div
        className="relative min-h-screen"
        style={{ backgroundColor: '#f4ede4', color: '#1c2624', fontFamily: "'Inter Tight', sans-serif" }}
      >
        <div className="absolute top-0 left-0 right-0 z-30 px-6 md:px-12 lg:px-20 pt-[52px]">
          <BackToHome />
        </div>

        <Hero />

        {/* CAPÍTULO 1 — O que é P2P e por que existe */}
        <section className="relative px-6 md:px-12 lg:px-20 py-24 md:py-36">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 max-w-[1600px] mx-auto">
            <motion.aside {...fade(0)} className="lg:col-span-4">
              <div className="sticky top-24">
                <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#d98a4a' }}>
                  Capítulo 01
                </span>
                <div className="h-[2px] w-16 mb-6" style={{ backgroundColor: '#d98a4a' }} />
                <p className="text-sm uppercase tracking-[0.2em] font-semibold" style={{ color: '#5a6664' }}>
                  O que é P2P e por que existe
                </p>
              </div>
            </motion.aside>
            <motion.div {...fade(0.1)} className="lg:col-span-8">
              <h2 className="text-[clamp(2.25rem,5.5vw,5rem)] font-black leading-[1] tracking-tight mb-10" style={{ color: '#0e3b3a' }}>
                Ninguém deveria precisar de{' '}
                <span style={{ color: '#d98a4a', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>
                  permissão para trocar valor.
                </span>
              </h2>
              <div className="space-y-7 text-lg md:text-xl leading-[1.7] font-light" style={{ color: '#2d3a37' }}>
                <p>
                  P2P significa peer-to-peer, ponto a ponto: duas pessoas negociando Bitcoin diretamente entre si, sem uma corretora no meio decidindo se a operação é permitida, sem fila de aprovação de saque, sem congelamento arbitrário de conta por "análise de compliance". A plataforma P2P, quando existe, só facilita o encontro e garante a segurança da troca. Quem decide o preço, o método de pagamento e os termos são as próprias partes.
                </p>
                <p>
                  O P2P nasceu como resposta direta ao modelo das exchanges centralizadas: empresas que exigem documento, selfie, comprovante de residência e renda, guardam seu histórico completo de compra e venda, e podem barrar ou reportar seu saque por qualquer motivo interno. Para quem valoriza privacidade financeira, mora em país com controle de capital, ou simplesmente não quer todo o seu histórico de acumulação de Bitcoin disponível em uma planilha de compliance, o P2P é a alternativa natural.
                </p>
                <blockquote
                  className="pl-8 py-2 my-10 text-2xl md:text-3xl leading-[1.4] font-light"
                  style={{ borderLeft: '3px solid #d98a4a', color: '#0e3b3a', fontFamily: "'Playfair Display', serif", fontStyle: 'italic' }}
                >
                  Trocar valor entre duas pessoas não deveria exigir autorização de uma terceira.
                </blockquote>
                <p>
                  Mas liberdade de negociar diretamente não elimina risco, apenas transfere a responsabilidade da segurança para você. Sem o filtro automático de uma exchange, cabe ao próprio usuário escolher plataformas com escrow confiável, avaliar reputação da contraparte e seguir protocolo de segurança consistente. É exatamente isso que este guia cobre.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* CAPÍTULO 2 — Tipos de contraparte */}
        <section className="relative px-6 md:px-12 lg:px-20 py-24 md:py-36" style={{ backgroundColor: '#0e3b3a' }}>
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 max-w-[1600px] mx-auto">
            <motion.aside {...fade(0)} className="lg:col-span-4">
              <div className="sticky top-24">
                <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#ffb37a' }}>
                  Capítulo 02
                </span>
                <div className="h-[2px] w-16 mb-6" style={{ backgroundColor: '#ffb37a' }} />
                <p className="text-sm uppercase tracking-[0.2em] font-semibold" style={{ color: 'rgba(244,237,228,0.6)' }}>
                  Com quem você está negociando
                </p>
              </div>
            </motion.aside>
            <motion.div {...fade(0.1)} className="lg:col-span-8">
              <h2 className="text-[clamp(2.25rem,5vw,4.5rem)] font-black leading-[1.05] tracking-tight mb-10" style={{ color: '#f4ede4' }}>
                Quatro perfis de contraparte, quatro níveis de risco.
              </h2>
              <div className="grid md:grid-cols-2 gap-5">
                {TIPOS_CONTRAPARTE.map((t) => (
                  <div key={t.nome} className="p-7 rounded-2xl" style={{ backgroundColor: 'rgba(244,237,228,0.06)', border: '1px solid rgba(255,179,122,0.18)' }}>
                    <t.icon size={26} style={{ color: '#ffb37a' }} className="mb-4" />
                    <h3 className="text-xl font-bold mb-3" style={{ color: '#f4ede4' }}>{t.nome}</h3>
                    <p className="text-base leading-relaxed font-light" style={{ color: 'rgba(244,237,228,0.75)' }}>{t.descricao}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* CAPÍTULO 3 — Escrow e reputação */}
        <section className="relative px-6 md:px-12 lg:px-20 py-24 md:py-36">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 max-w-[1600px] mx-auto items-center">
            <motion.div {...fade(0)} className="lg:col-span-6">
              <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#d98a4a' }}>
                Capítulo 03 · Os dois pilares
              </span>
              <h2 className="text-[clamp(2.25rem,5vw,4.5rem)] font-black leading-[1.05] tracking-tight mb-8" style={{ color: '#0e3b3a' }}>
                Escrow trava o dinheiro.{' '}
                <span style={{ color: '#d98a4a', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>
                  Reputação trava a confiança.
                </span>
              </h2>
              <div className="space-y-6 text-lg leading-[1.7] font-light" style={{ color: '#2d3a37' }}>
                <p>
                  Escrow é o Bitcoin do vendedor ficando bloqueado, geralmente em endereço multisig ou contrato Lightning, até que o pagamento em fiat seja confirmado por ambas as partes. Nenhum dos dois lados pode sumir com o valor do outro enquanto o escrow estiver ativo. É a peça técnica que substitui a confiança cega por garantia criptográfica.
                </p>
                <p>
                  Reputação é o histórico acumulado de negociações concluídas sem disputa. Plataformas sérias mostram quantas trocas o usuário já fechou, há quanto tempo está ativo e se algum caso foi escalado para mediação. Antes de fechar negócio com ticket alto, sempre verifique esse histórico: perfil novo e sem histórico é sinal para reduzir valor e redobrar cautela.
                </p>
              </div>
            </motion.div>
            <motion.div {...fade(0.15)} className="lg:col-span-6">
              <div className="relative h-[420px] md:h-[520px] overflow-hidden rounded-3xl">
                <img
                  src={handshakeImg}
                  alt="Aperto de mãos simbolizando confiança verificada em negociação P2P de Bitcoin com escrow"
                  loading="lazy"
                  width={1600}
                  height={1000}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* CAPÍTULO 4 — Riscos reais */}
        <section className="relative px-6 md:px-12 lg:px-20 py-24 md:py-36" style={{ backgroundColor: '#ece2d3' }}>
          <div className="max-w-[1600px] mx-auto">
            <motion.div {...fade(0)} className="mb-14 max-w-3xl">
              <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#d98a4a' }}>
                Capítulo 04 · Riscos reais
              </span>
              <h2 className="text-[clamp(2.25rem,5vw,4.5rem)] font-black leading-[1.05] tracking-tight" style={{ color: '#0e3b3a' }}>
                Seis formas concretas de perder dinheiro, patrimônio ou liberdade de movimento.
              </h2>
            </motion.div>

            <PixAlert />

            <div className="grid md:grid-cols-2 gap-6 mt-10">
              {RISCOS.map((r, i) => (
                <motion.div key={r.titulo} {...fade(i * 0.05)} className="p-7 rounded-2xl" style={{ backgroundColor: '#f4ede4', border: '1px solid rgba(14,59,58,0.08)' }}>
                  <r.icon size={26} style={{ color: '#d98a4a' }} className="mb-4" />
                  <h3 className="text-xl font-bold mb-3" style={{ color: '#0e3b3a' }}>{r.titulo}</h3>
                  <p className="text-base leading-relaxed font-light" style={{ color: '#2d3a37' }}>{r.texto}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CAPÍTULO 5 — Boas práticas de OpSec */}
        <section className="relative px-6 md:px-12 lg:px-20 py-24 md:py-36">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 max-w-[1600px] mx-auto">
            <motion.aside {...fade(0)} className="lg:col-span-4">
              <div className="sticky top-24">
                <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#d98a4a' }}>
                  Capítulo 05
                </span>
                <div className="h-[2px] w-16 mb-6" style={{ backgroundColor: '#d98a4a' }} />
                <p className="text-sm uppercase tracking-[0.2em] font-semibold" style={{ color: '#5a6664' }}>
                  Protocolo de OpSec
                </p>
                <p className="mt-6 text-base leading-relaxed font-light" style={{ color: '#2d3a37' }}>
                  Nenhuma regra sozinha resolve. É a soma delas, aplicada sempre, que separa quem negocia P2P por anos sem incidente de quem vira estatística na primeira transação de valor alto.
                </p>
              </div>
            </motion.aside>
            <motion.div {...fade(0.1)} className="lg:col-span-8">
              <div className="space-y-4">
                {OPSEC.map((item, i) => (
                  <div key={i} className="flex items-start gap-4 p-5 rounded-xl" style={{ backgroundColor: '#ece2d3' }}>
                    <span className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold" style={{ backgroundColor: '#0e3b3a', color: '#f4ede4' }}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <p className="text-base md:text-lg leading-relaxed font-light" style={{ color: '#2d3a37' }}>{item}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* CAPÍTULO 6 — Precificação com ágio */}
        <section className="relative px-6 md:px-12 lg:px-20 py-24 md:py-36" style={{ backgroundColor: '#0e3b3a' }}>
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 max-w-[1600px] mx-auto items-center">
            <motion.div {...fade(0)} className="lg:col-span-6 order-2 lg:order-1">
              <div className="relative h-[380px] md:h-[480px] overflow-hidden rounded-3xl">
                <img
                  src={trocaImg}
                  alt="Representação abstrata de fluxo de valor em troca peer-to-peer de Bitcoin"
                  loading="lazy"
                  width={1600}
                  height={1000}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            </motion.div>
            <motion.div {...fade(0.1)} className="lg:col-span-6 order-1 lg:order-2">
              <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#ffb37a' }}>
                Capítulo 06 · Precificação
              </span>
              <h2 className="text-[clamp(2rem,4.5vw,3.75rem)] font-black leading-[1.05] tracking-tight mb-8" style={{ color: '#f4ede4' }}>
                O ágio existe porque privacidade e conveniência custam.
              </h2>
              <div className="space-y-6 text-lg leading-[1.7] font-light" style={{ color: 'rgba(244,237,228,0.8)' }}>
                <p>
                  Negociação P2P quase sempre embute um ágio (prêmio) sobre o preço da cotação de mercado das exchanges centralizadas. Esse ágio remunera o risco assumido pelo vendedor (chargeback, bloqueio de conta, tempo de negociação) e a conveniência de método de pagamento e ausência de KYC para o comprador.
                </p>
                <p>
                  Ágios típicos giram entre 1% e 8% acima da cotação de mercado, variando com liquidez da plataforma, método de pagamento e volume negociado. Ágios acima de 10% costumam sinalizar mercado com pouca liquidez, urgência do comprador, ou risco elevado embutido no método de pagamento exigido.
                </p>
                <p>
                  Antes de fixar seu preço de venda, confira a cotação de referência de pelo menos duas exchanges, calcule seu ágio de forma transparente e explique ao comprador o porquê do valor, quando perguntado. Transparência de precificação reduz atrito e constrói reputação de longo prazo.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* CAPÍTULO 7 — Plataformas */}
        <section className="relative px-6 md:px-12 lg:px-20 py-24 md:py-36" style={{ backgroundColor: '#ece2d3' }}>
          <div className="max-w-[1600px] mx-auto">
            <motion.div {...fade(0)} className="mb-14 max-w-3xl">
              <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#d98a4a' }}>
                Capítulo 07 · Panorama das plataformas
              </span>
              <h2 className="text-[clamp(2.25rem,5vw,4.5rem)] font-black leading-[1.05] tracking-tight" style={{ color: '#0e3b3a' }}>
                Cinco caminhos, cada um com seu perfil de risco.
              </h2>
            </motion.div>

            <div className="overflow-x-auto rounded-2xl" style={{ border: '1px solid rgba(14,59,58,0.12)' }}>
              <table className="w-full min-w-[760px] text-left" style={{ backgroundColor: '#f4ede4' }}>
                <thead>
                  <tr style={{ backgroundColor: '#0e3b3a' }}>
                    <th className="p-5 text-sm font-bold uppercase tracking-wider" style={{ color: '#f4ede4' }}>Plataforma</th>
                    <th className="p-5 text-sm font-bold uppercase tracking-wider" style={{ color: '#f4ede4' }}>Modelo</th>
                    <th className="p-5 text-sm font-bold uppercase tracking-wider" style={{ color: '#f4ede4' }}>Destaque</th>
                  </tr>
                </thead>
                <tbody>
                  {PLATAFORMAS.map((p, i) => (
                    <tr key={p.nome} style={{ backgroundColor: i % 2 === 0 ? '#f4ede4' : '#ece2d3' }}>
                      <td className="p-5 font-bold" style={{ color: '#0e3b3a' }}>{p.nome}</td>
                      <td className="p-5 text-sm" style={{ color: '#5a6664' }}>{p.tipo}</td>
                      <td className="p-5 text-sm leading-relaxed" style={{ color: '#2d3a37' }}>{p.destaque}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-10 p-8 rounded-2xl" style={{ backgroundColor: '#0e3b3a' }}>
              <p className="text-lg leading-relaxed font-light mb-4" style={{ color: 'rgba(244,237,228,0.85)' }}>
                O Bisq merece capítulo próprio: é a plataforma descentralizada mais madura do ecossistema P2P, roda sobre rede Tor, não tem servidor central para derrubar e usa depósito de segurança para desincentivar má-fé de qualquer lado da negociação.
              </p>
              <Link to="/p2p/bisq-guia-completo" className="inline-flex items-center gap-2 text-sm font-bold tracking-wider uppercase" style={{ color: '#ffb37a' }}>
                Ver guia completo do Bisq <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>

        {/* CAPÍTULO 8 — Erros comuns */}
        <section className="relative px-6 md:px-12 lg:px-20 py-24 md:py-36">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 max-w-[1600px] mx-auto items-center">
            <motion.div {...fade(0)} className="lg:col-span-6">
              <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#d98a4a' }}>
                Capítulo 08 · Erros comuns
              </span>
              <h2 className="text-[clamp(2rem,4.5vw,3.75rem)] font-black leading-[1.05] tracking-tight mb-8" style={{ color: '#0e3b3a' }}>
                O mesmo erro se repete em quase todo golpe reportado.
              </h2>
              <ul className="space-y-4">
                {ERROS.map((e, i) => (
                  <li key={i} className="flex items-start gap-3 text-base md:text-lg leading-relaxed font-light" style={{ color: '#2d3a37' }}>
                    <AlertTriangle size={20} className="shrink-0 mt-1" style={{ color: '#d98a4a' }} />
                    {e}
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div {...fade(0.15)} className="lg:col-span-6">
              <div className="relative h-[420px] md:h-[520px] overflow-hidden rounded-3xl">
                <img
                  src={kycImg}
                  alt="Interface escura de diretório de serviços financeiros sem verificação de identidade"
                  loading="lazy"
                  width={1600}
                  height={1000}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* CAPÍTULO 9 — FAQ */}
        <section className="relative px-6 md:px-12 lg:px-20 py-24 md:py-36" style={{ backgroundColor: '#ece2d3' }}>
          <div className="max-w-[1100px] mx-auto">
            <motion.div {...fade(0)} className="mb-14">
              <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#d98a4a' }}>
                Capítulo 09 · Perguntas que importam
              </span>
              <h2 className="text-[clamp(2.25rem,5vw,4.5rem)] font-black leading-[1] tracking-tight" style={{ color: '#0e3b3a' }}>
                Antes de negociar,{' '}
                <span style={{ color: '#d98a4a', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>
                  tire a dúvida.
                </span>
              </h2>
            </motion.div>

            <div className="space-y-3">
              {FAQ.map((f, i) => {
                const open = openFaq === i;
                return (
                  <motion.div
                    key={i}
                    {...fade(i * 0.03)}
                    className="rounded-2xl overflow-hidden"
                    style={{ backgroundColor: '#f4ede4', boxShadow: open ? '0 8px 24px rgba(14,59,58,0.1)' : '0 1px 3px rgba(14,59,58,0.05)' }}
                  >
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
              <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#ffb37a' }}>
                Continue sua trilha
              </span>
              <h2 className="text-[clamp(2rem,4.5vw,4rem)] font-black leading-[1] tracking-tight">
                Vender é só metade da{' '}
                <span style={{ color: '#ffb37a', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>
                  equação de soberania.
                </span>
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { to: '/p2p/bisq-guia-completo', titulo: 'Bisq: guia completo', texto: 'Instalação, Tor, depósito de segurança e primeira compra passo a passo.' },
                { to: '/soberania-financeira/exchanges-privacidade-e-kyc', titulo: 'Exchanges sem KYC', texto: 'Panorama de exchanges que preservam sua privacidade financeira.' },
                { to: '/comprar-bitcoin-com-privacidade', titulo: 'Comprar Bitcoin com privacidade', texto: 'Métodos de aquisição fora do circuito de identificação obrigatória.' },
                { to: '/autocustodia', titulo: 'Autocustódia', texto: 'Depois de comprar ou vender, seja seu próprio banco de verdade.' },
                { to: '/autocustodia/guia-migracao-corretora', titulo: 'Guia de migração da corretora', texto: 'Comprou? Agora tire do ecossistema deles antes que seja tarde: a travessia completa para a custódia própria.' },
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
