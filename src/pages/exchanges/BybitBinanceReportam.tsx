import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  AlertTriangle, ShieldAlert, Eye, EyeOff, ArrowRight, ChevronDown,
  Compass, Bitcoin, Layers, Scale, Globe, Banknote, KeyRound,
} from 'lucide-react';
import SeoHead from '@/components/SeoHead';
import BackToHome from '@/components/BackToHome';
import heroImg from '@/assets/exchanges/bybit-binance-hero.jpg';
import imgCofre from '@/assets/exchanges/regulacao-cofre.jpg';
import imgHyperliquid from '@/assets/exchanges/hyperliquid-mesa.jpg';
import imgP2P from '@/assets/exchanges/p2p-troca.jpg';
import imgBlindagem from '@/assets/exchanges/blindagem-camadas.jpg';
import imgPassaporte from '@/assets/exchanges/passaporte-plano-b.jpg';

/**
 * /soberania-financeira/exchanges-privacidade-e-kyc/bybit-binance-reportam-brasileiros
 * Padrão editorial Apple/Atlas: sand (#f4ede4) + teal (#0e3b3a) + copper (#c4632a).
 */

const APPLE_EASE = [0.22, 1, 0.36, 1] as const;
const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.8, ease: APPLE_EASE, delay },
});

/* ─── DADOS ─── */
const COMPARATIVO = [
  { criterio: 'Reporte automático ao Brasil', binance: 'Sim, via nova regulação 2026', bybit: 'Sim, via nova regulação 2026', alternativa: 'Não, operação fora do escopo da DREX' },
  { criterio: 'Derivativos para residentes BR', binance: 'Bloqueado ou restrito', bybit: 'Bloqueado ou restrito', alternativa: 'Liberado em Hyperliquid' },
  { criterio: 'Compra de Bitcoin com Pix', binance: 'Pix tokenizado, com KYC pesado', bybit: 'Pix com KYC obrigatório', alternativa: 'Spike to Spike, Pix direto P2P' },
  { criterio: 'Verificação facial obrigatória', binance: 'Sim, biometria 360 graus', bybit: 'Sim, biometria 360 graus', alternativa: 'Não, login por chave Nostr ou e-mail' },
  { criterio: 'Custódia dos seus ativos', binance: 'Custodial (a corretora segura)', bybit: 'Custodial', alternativa: 'Você na sua carteira (não custodial)' },
];

const ALTERNATIVAS = [
  {
    nome: 'Hyperliquid',
    foco: 'Especulação, futuros e spot',
    perfil: 'Trader, operador de bot, quem busca alavancagem sem KYC obrigatório',
    como: 'Acesse o painel, conecte por e-mail novo ou carteira on-chain, deposite em USDC ou BTC. Para preservar privacidade, deposite em cripto, nunca via cartão ou transferência bancária.',
    cuidado: 'Se depositar em fiat ou comprar via on-ramp, vai deixar rastro bancário. O ganho de privacidade está no depósito em cripto puro.',
    imagem: imgHyperliquid,
  },
  {
    nome: 'Spike to Spike',
    foco: 'Comprar Bitcoin ou USDT com Pix de forma privada',
    perfil: 'Quem só quer acumular BTC ou stablecoin em pequenos lotes, sem girar a câmera para um robô',
    como: 'Rede social descentralizada via Nostr. Login por e-mail descartável ou chave privada. Compras a partir de R$ 10 em BTC, R$ 500 em USDT. Quantias até R$ 500 são automáticas, na rede Liquid.',
    cuidado: 'O Pix em si não é privado para o seu banco. A vantagem está em não enviar documento, selfie ou prova de vida para a plataforma.',
    imagem: imgP2P,
  },
];

const CAMADAS = [
  { titulo: 'Camada 1, autocustódia',
    descricao: 'Tirar o Bitcoin da corretora assim que comprar. Hardware wallet, multisig ou pelo menos uma carteira mobile soberana. Sem isso, qualquer plataforma pode congelar tudo.' },
  { titulo: 'Camada 2, compra privada',
    descricao: 'Comprar pequenos lotes em P2P sem KYC pesado. Spike to Spike, Bisq, KYCNot.me como diretório. O objetivo é não ligar todo o seu patrimônio ao seu CPF dentro de uma corretora regulada.' },
  { titulo: 'Camada 3, jurisdição',
    descricao: 'Plano B fora do Brasil. Residência fiscal no Paraguai, Uruguai ou Emirados. Conta bancária internacional. Segundo passaporte. Sem isso, exit tax e tributação global encurralam você dentro do país.' },
  { titulo: 'Camada 4, comunicação',
    descricao: 'Sair do Telegram, do WhatsApp e dos e-mails ligados ao CPF. Nostr, Signal, e-mails descartáveis. Sua identidade digital é o vetor mais explorado por quem te quer mapear.' },
];

const PERSONAS = [
  { titulo: 'O acumulador silencioso',
    real: 'Compra R$ 200 a R$ 1.000 por semana, não opera futuros, quer dormir tranquilo.',
    rota: 'Spike to Spike para compra, hardware wallet própria, conta na Bitpark ou similar para Pix de saída quando precisar.' },
  { titulo: 'O trader de derivativos',
    real: 'Vive de operar alavancagem, não aceita ficar parado por restrição da Bybit ou Binance.',
    rota: 'Hyperliquid como motor principal, depósito em cripto, gestão de risco rígida. Usa Spike to Spike para acumular o caixa de longo prazo.' },
  { titulo: 'O empresário com patrimônio',
    real: 'Tem PJ, CNPJ ativo, recebe via banco, não pode sumir do sistema. Mas quer blindar o que sobra.',
    rota: 'Camadas combinadas: parte do patrimônio em corretora regulada para compliance, parte em autocustódia comprada via P2P. Em paralelo, residência fiscal alternativa no radar.' },
];

const FAQ = [
  { q: 'A Binance e a Bybit estão proibidas no Brasil?',
    a: 'Não estão proibidas. O que mudou é o nível de reporte. Após as novas regulações brasileiras de 2026, as duas passaram a reportar transações de residentes ao fisco e a restringir produtos como derivativos para CPFs locais. Continuam operando, só que de forma menos privada e com menos liberdade de produto do que antes.' },
  { q: 'Hyperliquid é seguro? É regulado?',
    a: 'Hyperliquid é uma plataforma on-chain de derivativos e spot, sem KYC obrigatório, com liquidez relevante. Segurança operacional vem de dois pontos: o protocolo em si e o usuário. Use depósitos em cripto, nunca em cartão, gerencie risco como em qualquer corretora alavancada e nunca trate como cofre de longo prazo. É motor de operação, não custódia.' },
  { q: 'Spike to Spike é confiável para comprar Bitcoin?',
    a: 'Spike to Spike é uma rede P2P descentralizada via Nostr. A confiança não vem da empresa, vem do desenho: você não envia documento, recebe direto na sua carteira e ordens pequenas (até R$ 500) são automatizadas na rede Liquid. O risco está em phishing, endereços errados e operadores mal avaliados. Comece com valores pequenos para entender o fluxo.' },
  { q: 'O Pix é privado quando uso para comprar Bitcoin sem KYC?',
    a: 'Não. O Pix sempre passa pelo seu banco e fica registrado no Bacen. O ganho de privacidade ao usar uma plataforma sem KYC está em não entregar selfie, RG, comprovante de endereço e dados biométricos para a corretora. Para quem quer privacidade total, o caminho é dinheiro vivo P2P presencial, não Pix.' },
  { q: 'Vale a pena migrar tudo agora ou esperar para ver?',
    a: 'Esperar é a estratégia mais cara da última década no Brasil. Cada nova regulação fechou uma janela que estava aberta. Quem tirou Bitcoin da corretora antes do confisco do Plano Collor não viveu o trauma. Quem migrou patrimônio para fora antes da exit tax economizou dezenas de milhares. A janela atual ainda existe, mas se estreita a cada trimestre.' },
  { q: 'Posso ser punido por usar plataformas sem KYC?',
    a: 'A obrigação de declarar criptoativos é sua, não da corretora. Não é a plataforma sem KYC que te coloca em risco, é a omissão na declaração. Quem opera fora de corretoras reguladas precisa ser ainda mais rigoroso na própria contabilidade, justamente porque não terá relatório pronto enviado pela plataforma.' },
  { q: 'E quem mora fora do Brasil, ainda precisa se preocupar?',
    a: 'Sim, dependendo da residência fiscal. Países que cobram tributação mundial sobre seus residentes (caso dos EUA, Portugal e vários da OCDE) seguem alcançando você. Países territoriais como Paraguai, Uruguai (com tax holiday) ou Emirados deixam suas operações externas em paz. A escolha de jurisdição é parte do mesmo jogo.' },
];

/* ─── HERO ─── */
function Hero() {
  const { scrollY } = useScroll();
  const yBg = useTransform(scrollY, [0, 800], [0, 200]);
  const opacityContent = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    <section className="relative h-[88vh] min-h-[640px] w-full overflow-hidden" style={{ backgroundColor: '#0e3b3a' }}>
      <motion.div className="absolute inset-0" style={{ y: yBg }}>
        <img src={heroImg} alt="Globo terrestre representando o Brasil envolto por uma malha de vigilância digital" fetchPriority="high" className="w-full h-full object-cover scale-110"
          style={{ filter: 'saturate(1.05) contrast(1.02)' }} loading="lazy" decoding="async" />
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(180deg, rgba(14,59,58,0.55) 0%, rgba(14,59,58,0.4) 40%, rgba(244,237,228,0.05) 70%, #f4ede4 100%)',
        }} />
      </motion.div>

      <motion.div className="relative z-10 h-full flex flex-col justify-end px-6 md:px-12 lg:px-20 pb-20 md:pb-28"
        style={{ opacity: opacityContent }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: APPLE_EASE }}
          className="inline-flex items-center gap-3 mb-6 self-start px-4 py-2 rounded-full backdrop-blur-md"
          style={{ backgroundColor: 'rgba(244,237,228,0.15)', border: '1px solid rgba(244,237,228,0.25)' }}>
          <ShieldAlert size={16} style={{ color: '#ffb37a' }} />
          <span className="text-[11px] md:text-xs font-bold tracking-[0.3em] uppercase" style={{ color: '#f4ede4' }}>
            Inteligência tática · 2026
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1, delay: 0.15, ease: APPLE_EASE }}
          className="text-[clamp(2.5rem,8vw,7rem)] font-black leading-[0.95] tracking-tight max-w-[20ch]"
          style={{ fontFamily: "'Inter Tight', sans-serif", color: '#f4ede4' }}>
          Bybit e Binance{' '}
          <span style={{ color: '#ffb37a', fontStyle: 'italic', fontWeight: 400, fontFamily: "'Playfair Display', serif", textShadow: '0 0 40px rgba(255,179,122,0.45)' }}>
            entregaram o jogo.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: APPLE_EASE }}
          className="mt-8 max-w-2xl text-lg md:text-2xl leading-relaxed font-light"
          style={{ color: 'rgba(244,237,228,0.85)', fontFamily: "'Inter Tight', sans-serif" }}>
          As duas maiores corretoras passaram a reportar oficialmente brasileiros e a restringir produtos. Veja, com nome e link, as alternativas que ainda estão de pé em 2026 e como blindar seu patrimônio antes da próxima janela fechar.
        </motion.p>
      </motion.div>
    </section>
  );
}

export default function BybitBinanceReportam() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <>
      <SeoHead
        path="/soberania-financeira/exchanges-privacidade-e-kyc/bybit-binance-reportam-brasileiros"
        custom={{
          title: 'Bybit e Binance Reportam Brasileiros: As Alternativas em 2026',
          description: 'Bybit e Binance passaram a reportar transações no Brasil. Veja as alternativas reais em 2026: Hyperliquid, Spike to Spike e como blindar seu patrimônio em camadas.',
          canonical: 'https://lordjunnior.com.br/soberania-financeira/exchanges-privacidade-e-kyc/bybit-binance-reportam-brasileiros',
          primaryKeyword: 'bybit binance reportam brasileiros',
          lsiKeywords: ['binance reporta cpf', 'bybit kyc brasil', 'alternativas binance sem kyc', 'hyperliquid brasil', 'spike to spike bitcoin', 'comprar bitcoin sem kyc 2026'],
          longTailKeywords: ['como comprar bitcoin sem kyc no brasil 2026', 'alternativas a binance e bybit para brasileiros', 'corretora cripto sem reporte brasil'],
          breadcrumbs: [
            { name: 'Início', url: '/' },
            { name: 'Soberania Financeira', url: '/soberania-financeira' },
            { name: 'Exchanges, privacidade e KYC', url: '/soberania-financeira/exchanges-privacidade-e-kyc' },
            { name: 'Bybit e Binance reportam brasileiros', url: '/soberania-financeira/exchanges-privacidade-e-kyc/bybit-binance-reportam-brasileiros' },
          ],
          schemaType: 'Article',
          articleSection: 'Soberania Financeira',
          relatedPages: ['/soberania-financeira/exchanges-privacidade-e-kyc', '/saida/jurisdicoes-amigaveis', '/palau-digital-residency', '/autocustodia', '/pix-anonimo'],
        }}
        faqItems={FAQ.map((f) => ({ question: f.q, answer: f.a }))}
      />

      <div className="relative min-h-screen" style={{ backgroundColor: '#f4ede4', color: '#1c2624', fontFamily: "'Inter Tight', sans-serif" }}>
        <div className="absolute top-0 left-0 right-0 z-30 px-6 md:px-12 lg:px-20 pt-[52px]">
          <BackToHome />
        </div>

        <Hero />

        {/* CAPÍTULO 1 — A notícia */}
        <section className="relative px-6 md:px-12 lg:px-20 py-24 md:py-36">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 max-w-[1600px] mx-auto">
            <motion.aside {...fade(0)} className="lg:col-span-4">
              <div className="sticky top-24">
                <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#c4632a' }}>Capítulo 01</span>
                <div className="h-[2px] w-16 mb-6" style={{ backgroundColor: '#c4632a' }} />
                <p className="text-sm uppercase tracking-[0.2em] font-semibold" style={{ color: '#5a6664' }}>O cofre da corretora abriu uma fresta</p>
              </div>
            </motion.aside>
            <motion.div {...fade(0.1)} className="lg:col-span-8">
              <h2 className="text-[clamp(2rem,5vw,4.5rem)] font-black leading-[1.05] tracking-tight mb-10" style={{ color: '#0e3b3a' }}>
                A notícia em uma frase:{' '}
                <span style={{ color: '#c4632a', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>
                  o cofre da corretora abriu uma fresta para o fisco.
                </span>
              </h2>
              <div className="space-y-7 text-lg md:text-xl leading-[1.7] font-light" style={{ color: '#2d3a37' }}>
                <p>
                  Bybit e Binance passaram a reportar oficialmente transações de residentes brasileiros. Não é boato de fim de semana, é consequência direta do novo arcabouço regulatório de 2026. A licença para operar legalmente exige R$ 10 milhões e, junto com a licença, vem a obrigação de entregar dados.
                </p>
                <p>
                  Quem já tentou abrir uma posição em derivativo nessas corretoras nos últimos meses provavelmente esbarrou em uma restrição educada na tela. Não é bug, é cumprimento de regra. O produto continua existindo lá fora. Para o CPF brasileiro, foi cortado.
                </p>
                <blockquote className="pl-8 py-2 my-10 text-2xl md:text-3xl leading-[1.4] font-light"
                  style={{ borderLeft: '3px solid #c4632a', color: '#0e3b3a', fontFamily: "'Playfair Display', serif", fontStyle: 'italic' }}>
                  Toda janela aberta no Brasil tem prazo de validade. A diferença entre quem se blinda e quem se lamenta é o tempo de reação.
                </blockquote>
                <p>
                  Esta página existe por um motivo: ainda dá tempo. Daqui a um ou dois anos, parte do que descrevo aqui vai ter sumido ou ficado mais difícil. Por isso este conteúdo é tático, não nostálgico.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* CAPÍTULO 2 — Imagem cofre + analogia */}
        <section className="relative" style={{ backgroundColor: '#0e3b3a', color: '#f4ede4' }}>
          <div className="grid lg:grid-cols-2 items-stretch">
            <div className="relative min-h-[420px] lg:min-h-[640px] overflow-hidden">
              <img src={imgCofre} alt="Cofre de banco com a porta levemente entreaberta deixando vazar luz" loading="lazy" width={1400} height={900}
                className="absolute inset-0 w-full h-full object-cover" style={{ filter: 'brightness(0.85)' }} />
            </div>
            <motion.div {...fade(0.1)} className="px-6 md:px-12 lg:px-20 py-20 md:py-28 flex flex-col justify-center">
              <span className="text-xs font-bold tracking-[0.4em] uppercase mb-4" style={{ color: '#e8a36b' }}>Capítulo 02 · Analogia</span>
              <h2 className="text-[clamp(2rem,4.5vw,4rem)] font-black leading-[1.05] tracking-tight mb-8">
                Imagine o cofre de uma agência bancária.
              </h2>
              <div className="space-y-6 text-lg md:text-xl leading-[1.65] font-light" style={{ color: 'rgba(244,237,228,0.85)' }}>
                <p>
                  Por anos, Bybit e Binance funcionaram como um cofre de outro país. Você guardava lá dentro porque o gerente de cá não tinha a chave. Era inconveniente, mas era seu.
                </p>
                <p>
                  Em 2026, a porta desse cofre foi adaptada com uma fresta. A fresta é pequena, a chave foi entregue ao gerente local, e tudo que entra ou sai é fotografado. O cofre continua existindo, só que ele virou uma extensão da agência da esquina.
                </p>
                <p style={{ color: '#ffb37a' }}>
                  Soberania financeira não é entrar em pânico. É reconhecer que aquela peça do tabuleiro mudou de cor e mover as outras peças antes que o relógio bata.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* CAPÍTULO 3 — Comparativo */}
        <section className="px-6 md:px-12 lg:px-20 py-24 md:py-32">
          <div className="max-w-[1600px] mx-auto">
            <motion.div {...fade(0)} className="mb-12 max-w-3xl">
              <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#c4632a' }}>Capítulo 03 · Comparativo</span>
              <h2 className="text-[clamp(2rem,5vw,4.5rem)] font-black leading-[1.05] tracking-tight" style={{ color: '#0e3b3a' }}>
                O que mudou,{' '}
                <span style={{ color: '#c4632a', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>linha por linha.</span>
              </h2>
            </motion.div>

            <div className="overflow-hidden rounded-2xl" style={{ border: '1px solid #d8c9b3' }}>
              <div className="hidden md:grid md:grid-cols-4 px-6 py-4 text-xs font-bold tracking-[0.2em] uppercase" style={{ backgroundColor: '#0e3b3a', color: '#f4ede4' }}>
                <span>Critério</span>
                <span>Binance</span>
                <span>Bybit</span>
                <span style={{ color: '#ffb37a' }}>Alternativa privada</span>
              </div>
              {COMPARATIVO.map((row, i) => (
                <motion.div key={row.criterio} {...fade(i * 0.05)}
                  className="grid grid-cols-1 md:grid-cols-4 gap-2 px-6 py-5 text-sm md:text-base"
                  style={{ backgroundColor: i % 2 === 0 ? '#faf6f0' : '#ece2d3', color: '#1c2624' }}>
                  <span className="font-bold" style={{ color: '#0e3b3a' }}>{row.criterio}</span>
                  <span style={{ color: '#5a6664' }}><span className="md:hidden font-bold text-xs uppercase tracking-wider mr-2" style={{ color: '#0e3b3a' }}>Binance:</span>{row.binance}</span>
                  <span style={{ color: '#5a6664' }}><span className="md:hidden font-bold text-xs uppercase tracking-wider mr-2" style={{ color: '#0e3b3a' }}>Bybit:</span>{row.bybit}</span>
                  <span className="font-semibold" style={{ color: '#c4632a' }}><span className="md:hidden font-bold text-xs uppercase tracking-wider mr-2">Alternativa:</span>{row.alternativa}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CAPÍTULO 4 — Alternativas */}
        <section className="px-6 md:px-12 lg:px-20 pb-24 md:pb-32">
          <div className="max-w-[1600px] mx-auto">
            <motion.div {...fade(0)} className="mb-14 max-w-3xl">
              <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#c4632a' }}>Capítulo 04 · As ferramentas</span>
              <h2 className="text-[clamp(2rem,5vw,4.5rem)] font-black leading-[1.05] tracking-tight" style={{ color: '#0e3b3a' }}>
                Duas plataformas que ainda{' '}
                <span style={{ color: '#c4632a', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>resistem.</span>
              </h2>
              <p className="mt-6 text-lg md:text-xl font-light leading-[1.6]" style={{ color: '#2d3a37' }}>
                Uma para quem quer especular sem entregar selfie. Outra para quem só quer acumular Bitcoin com Pix sem virar peça de catálogo de banco.
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-8">
              {ALTERNATIVAS.map((alt, i) => (
                <motion.article key={alt.nome} {...fade(i * 0.1)}
                  className="rounded-2xl overflow-hidden flex flex-col" style={{ backgroundColor: '#faf6f0', border: '1px solid #d8c9b3' }}>
                  <div className="relative h-64 md:h-80 overflow-hidden">
                    <img src={alt.imagem} alt={`Imagem editorial representando ${alt.nome}`} loading="lazy" width={1400} height={900}
                      className="absolute inset-0 w-full h-full object-cover" />
                  </div>
                  <div className="p-8 md:p-10 flex-1 flex flex-col">
                    <span className="text-xs font-bold tracking-[0.3em] uppercase mb-3" style={{ color: '#c4632a' }}>{alt.foco}</span>
                    <h3 className="text-3xl md:text-4xl font-black mb-4" style={{ color: '#0e3b3a' }}>{alt.nome}</h3>
                    <p className="text-base md:text-lg leading-[1.65] mb-5 font-light" style={{ color: '#2d3a37' }}><span className="font-bold">Para quem é:</span> {alt.perfil}</p>
                    <p className="text-base md:text-lg leading-[1.65] mb-5 font-light" style={{ color: '#2d3a37' }}><span className="font-bold">Como funciona:</span> {alt.como}</p>
                    <div className="mt-auto p-5 rounded-xl flex gap-3 items-start" style={{ backgroundColor: '#f0e2cf', border: '1px solid #d8c9b3' }}>
                      <AlertTriangle size={20} className="shrink-0 mt-0.5" style={{ color: '#c4632a' }} />
                      <p className="text-sm md:text-base leading-relaxed" style={{ color: '#5a3a1f' }}><span className="font-bold">Atenção:</span> {alt.cuidado}</p>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* CAPÍTULO 5 — Camadas (faixa teal escura) */}
        <section className="relative py-24 md:py-32 px-6 md:px-12 lg:px-20" style={{ backgroundColor: '#0e3b3a', color: '#f4ede4' }}>
          <div className="max-w-[1600px] mx-auto">
            <motion.div {...fade(0)} className="grid lg:grid-cols-12 gap-10 mb-16">
              <div className="lg:col-span-5">
                <div className="rounded-2xl overflow-hidden">
                  <img src={imgBlindagem} alt="Tabuleiro de xadrez com peças cobre e teal posicionadas como camadas defensivas" loading="lazy" width={1400} height={900}
                    className="w-full h-full object-cover" />
                </div>
              </div>
              <div className="lg:col-span-7">
                <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#e8a36b' }}>Capítulo 05 · Estratégia</span>
                <h2 className="text-[clamp(2rem,5vw,4.5rem)] font-black leading-[1.05] tracking-tight mb-8">
                  Trocar de corretora{' '}
                  <span style={{ color: '#e8a36b', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>não é blindagem.</span>
                </h2>
                <p className="text-lg md:text-xl font-light leading-[1.65]" style={{ color: 'rgba(244,237,228,0.85)' }}>
                  Quem só pula de Binance para outra plataforma sem KYC, sem mexer em mais nada, ganha alguns meses e perde os próximos. Soberania é construída em quatro camadas que conversam entre si. Tirar uma fragiliza todas as outras.
                </p>
              </div>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-px rounded-2xl overflow-hidden" style={{ backgroundColor: 'rgba(244,237,228,0.15)' }}>
              {CAMADAS.map((c, i) => (
                <motion.div key={c.titulo} {...fade(i * 0.06)}
                  className="p-8 md:p-10" style={{ backgroundColor: '#0e3b3a' }}>
                  <div className="flex items-center gap-4 mb-5">
                    <div className="p-3 rounded-xl" style={{ backgroundColor: 'rgba(232,163,107,0.15)', border: '1px solid rgba(232,163,107,0.3)' }}>
                      <Layers size={20} style={{ color: '#e8a36b' }} />
                    </div>
                    <span className="text-2xl font-black" style={{ color: '#e8a36b' }}>0{i + 1}</span>
                  </div>
                  <h3 className="text-2xl md:text-[1.6rem] font-black leading-tight mb-4">{c.titulo}</h3>
                  <p className="text-base md:text-lg leading-relaxed font-light" style={{ color: 'rgba(244,237,228,0.78)' }}>{c.descricao}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CAPÍTULO 6 — Personas */}
        <section className="px-6 md:px-12 lg:px-20 py-24 md:py-32">
          <div className="max-w-[1600px] mx-auto">
            <motion.div {...fade(0)} className="mb-12 max-w-3xl">
              <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#c4632a' }}>Capítulo 06 · Aplicação</span>
              <h2 className="text-[clamp(2rem,5vw,4.5rem)] font-black leading-[1.05] tracking-tight" style={{ color: '#0e3b3a' }}>
                Três perfis,{' '}
                <span style={{ color: '#c4632a', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>três rotas práticas.</span>
              </h2>
            </motion.div>
            <div className="grid md:grid-cols-3 gap-6">
              {PERSONAS.map((p, i) => (
                <motion.div key={p.titulo} {...fade(i * 0.08)}
                  className="p-8 md:p-10 rounded-2xl flex flex-col h-full" style={{ backgroundColor: '#faf6f0', border: '1px solid #d8c9b3' }}>
                  <span className="text-xs font-bold tracking-[0.3em] uppercase mb-3" style={{ color: '#c4632a' }}>Perfil 0{i + 1}</span>
                  <h3 className="text-2xl md:text-[1.6rem] font-black leading-tight mb-5" style={{ color: '#0e3b3a' }}>{p.titulo}</h3>
                  <p className="text-base leading-relaxed mb-5 font-light" style={{ color: '#2d3a37' }}><span className="font-bold">Realidade:</span> {p.real}</p>
                  <p className="text-base leading-relaxed mt-auto font-light" style={{ color: '#2d3a37' }}><span className="font-bold" style={{ color: '#c4632a' }}>Rota recomendada:</span> {p.rota}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CAPÍTULO 7 — Plano B internacional */}
        <section className="relative" style={{ backgroundColor: '#ece2d3' }}>
          <div className="grid lg:grid-cols-2 items-stretch">
            <motion.div {...fade(0.05)} className="px-6 md:px-12 lg:px-20 py-20 md:py-28 flex flex-col justify-center">
              <span className="text-xs font-bold tracking-[0.4em] uppercase mb-4" style={{ color: '#c4632a' }}>Capítulo 07 · Plano B</span>
              <h2 className="text-[clamp(2rem,4.5vw,4rem)] font-black leading-[1.05] tracking-tight mb-8" style={{ color: '#0e3b3a' }}>
                Bandeiras fora{' '}
                <span style={{ color: '#c4632a', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>do alcance do CPF.</span>
              </h2>
              <div className="space-y-5 text-lg md:text-xl leading-[1.65] font-light" style={{ color: '#2d3a37' }}>
                <p>
                  Plataforma sem KYC é uma camada. Jurisdição alternativa é outra. O Brasil já discute exit tax e tributação sobre ganhos não realizados, padrão que vários países da OCDE estão alinhando entre si.
                </p>
                <p>
                  Países que ficam fora desse pacto se beneficiam: Paraguai, Uruguai (com tax holiday), Emirados, El Salvador, e até programas como a residência digital de Palau, que abre uma camada de identidade soberana sem mudança física imediata.
                </p>
              </div>
              <div className="mt-10 flex flex-wrap gap-3">
                <Link to="/saida/jurisdicoes-amigaveis" className="inline-flex items-center gap-2 px-5 py-3 rounded-full font-semibold text-sm" style={{ backgroundColor: '#0e3b3a', color: '#f4ede4' }}>
                  Ranking de jurisdições <ArrowRight size={16} />
                </Link>
                <Link to="/palau-digital-residency" className="inline-flex items-center gap-2 px-5 py-3 rounded-full font-semibold text-sm" style={{ backgroundColor: '#c4632a', color: '#faf6f0' }}>
                  Palau ID <ArrowRight size={16} />
                </Link>
              </div>
            </motion.div>
            <div className="relative min-h-[420px] lg:min-h-[640px] overflow-hidden">
              <img src={imgPassaporte} alt="Passaporte e chave de bronze representando plano B internacional" loading="lazy" width={1400} height={900}
                className="absolute inset-0 w-full h-full object-cover" />
            </div>
          </div>
        </section>

        {/* CAPÍTULO 8 — FAQ */}
        <section className="px-6 md:px-12 lg:px-20 py-24 md:py-32">
          <div className="max-w-4xl mx-auto">
            <motion.div {...fade(0)} className="mb-12">
              <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#c4632a' }}>Capítulo 08 · Dúvidas</span>
              <h2 className="text-[clamp(2rem,5vw,4.5rem)] font-black leading-[1.05] tracking-tight" style={{ color: '#0e3b3a' }}>
                Perguntas{' '}
                <span style={{ color: '#c4632a', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>diretas.</span>
              </h2>
            </motion.div>
            <div className="space-y-3">
              {FAQ.map((f, i) => {
                const open = openFaq === i;
                return (
                  <motion.div key={f.q} {...fade(i * 0.04)} className="rounded-xl overflow-hidden" style={{ backgroundColor: '#faf6f0', border: '1px solid #d8c9b3' }}>
                    <button onClick={() => setOpenFaq(open ? null : i)}
                      className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left">
                      <span className="text-base md:text-lg font-bold" style={{ color: '#0e3b3a' }}>{f.q}</span>
                      <ChevronDown size={20} style={{ color: '#c4632a', transform: open ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.3s ease' }} />
                    </button>
                    {open && (
                      <div className="px-6 pb-6 text-base md:text-lg leading-[1.7] font-light" style={{ color: '#2d3a37' }}>{f.a}</div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CAPÍTULO 9 — Continue sua trilha */}
        <section className="px-6 md:px-12 lg:px-20 pb-28" style={{ backgroundColor: '#f4ede4' }}>
          <div className="max-w-[1600px] mx-auto">
            <motion.div {...fade(0)} className="mb-10">
              <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#c4632a' }}>Continue sua trilha</span>
              <h2 className="text-[clamp(1.75rem,4vw,3.25rem)] font-black leading-[1.05] tracking-tight" style={{ color: '#0e3b3a' }}>
                Próximos passos do tabuleiro
              </h2>
            </motion.div>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { to: '/soberania-financeira/exchanges-privacidade-e-kyc', icon: Globe, titulo: 'Hub de exchanges sem KYC', desc: 'Veja todas as plataformas analisadas, com score de privacidade e custódia.' },
                { to: '/saida/jurisdicoes-amigaveis', icon: Compass, titulo: 'Jurisdições amigáveis 2026', desc: 'Ranking dos 10 melhores países para residência fiscal e segunda bandeira.' },
                { to: '/autocustodia', icon: KeyRound, titulo: 'Autocustódia de Bitcoin', desc: 'Tirar o BTC da corretora é a primeira camada. Aqui está o passo a passo.' },
              ].map((card, i) => (
                <motion.div key={card.to} {...fade(i * 0.08)}>
                  <Link to={card.to}
                    className="block p-8 rounded-2xl h-full transition-transform hover:-translate-y-1"
                    style={{ backgroundColor: '#0e3b3a', color: '#f4ede4' }}>
                    <card.icon size={28} style={{ color: '#e8a36b' }} className="mb-5" />
                    <h3 className="text-xl md:text-2xl font-black mb-3 leading-tight">{card.titulo}</h3>
                    <p className="text-base font-light leading-relaxed mb-5" style={{ color: 'rgba(244,237,228,0.78)' }}>{card.desc}</p>
                    <span className="inline-flex items-center gap-2 text-sm font-bold" style={{ color: '#e8a36b' }}>Acessar <ArrowRight size={14} /></span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}