import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ShieldCheck, Cpu, Eye, Lock, Cable, KeyRound, Wallet, Scale,
  ChevronDown, ArrowRight, CheckCircle2, XCircle, AlertTriangle,
  Fingerprint, Boxes, DollarSign,
} from 'lucide-react';
import SeoHead from '@/components/SeoHead';
import BackToHome from '@/components/BackToHome';
import heroImg from '@/assets/btc-hardware-wallets.jpg';
import criteriosImg from '@/assets/infra-hardware-wallet.jpg';
import diyImg from '@/assets/krux-seed-backup.jpg';
import multisigImg from '@/assets/multisig-vault.jpg';

/**
 * /comparativos/melhores-hardware-wallets
 * Hub pilar de comparativos de hardware wallets Bitcoin.
 * Paleta: Sand #f4ede4 / Deep Teal #0e3b3a / cobre-âmbar #c97a3d.
 */

const APPLE_EASE = [0.22, 1, 0.36, 1] as const;
const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.8, ease: APPLE_EASE, delay },
});

type Dispositivo = {
  nome: string;
  categoria: string;
  codigoAberto: boolean;
  airGap: 'total' | 'parcial' | 'nao';
  psbt: boolean;
  passphrase: boolean;
  supplyChain: string;
  precoBRL: string;
  soBitcoin: boolean;
  resumo: string;
  link?: string;
};

const DISPOSITIVOS: Dispositivo[] = [
  {
    nome: 'Coldcard Mk4 / Q',
    categoria: 'Referência air-gap',
    codigoAberto: true,
    airGap: 'total',
    psbt: true,
    passphrase: true,
    supplyChain: 'Elemento seguro duplo + lacre físico + verificação de firmware por hash',
    precoBRL: 'R$ 1.200 a R$ 2.400',
    soBitcoin: true,
    resumo:
      'A régua de segurança da indústria. Só Bitcoin, transferência de transações inteiramente via cartão microSD, sem depender de cabo USB ou Bluetooth. Curva de aprendizado mais dura, recompensa maior.',
    link: '/comparativos/coldcard-review',
  },
  {
    nome: 'Trezor Safe 3 / Safe 5',
    categoria: 'Equilíbrio open source',
    codigoAberto: true,
    airGap: 'nao',
    psbt: true,
    passphrase: true,
    supplyChain: 'Selo holográfico + secure element (a partir do Safe 3) + firmware assinado',
    precoBRL: 'R$ 550 a R$ 1.500',
    soBitcoin: false,
    resumo:
      'A carteira mais antiga do mercado, com histórico público de vulnerabilidades corrigidas e um vazamento de dados de clientes em 2017 que marcou a marca. Suporta multi-moedas, o que não agrada ao purista bitcoiner.',
    link: '/comparativos/trezor-review',
  },
  {
    nome: 'Jade / Jade Core (Blockstream)',
    categoria: 'Melhor custo-benefício',
    codigoAberto: true,
    airGap: 'parcial',
    psbt: true,
    passphrase: true,
    supplyChain: 'Sem secure element dedicado, mas com Blind Oracle e verificação de código aberto auditável',
    precoBRL: 'R$ 350 a R$ 700',
    soBitcoin: true,
    resumo:
      'Foco só em Bitcoin e Liquid, com curva de entrada mais suave que a Coldcard. Sem chip de segurança dedicado, o que puristas apontam como calcanhar de Aquiles, mas com camadas alternativas de proteção via Blind Oracle.',
    link: '/autocustodia/jade-core-review',
  },
  {
    nome: 'Krux (DIY, open hardware)',
    categoria: 'Faça você mesmo',
    codigoAberto: true,
    airGap: 'total',
    psbt: true,
    passphrase: true,
    supplyChain: 'Você mesmo compra o hardware genérico (ESP32) e compila o firmware. Supply chain nas suas mãos.',
    precoBRL: 'R$ 150 a R$ 400',
    soBitcoin: true,
    resumo:
      'Não é produto, é receita. Você monta com uma placa ESP32 comprada avulsa, roda firmware open source auditável, e assina transações por QR Code sem nenhum cabo. Exige disposição técnica, mas elimina o risco de comprar de terceiro malicioso.',
    link: '/autocustodia/hardware-wallet-diy-bitcoin',
  },
  {
    nome: 'Foundation Passport',
    categoria: 'Design + air-gap',
    codigoAberto: true,
    airGap: 'total',
    psbt: true,
    passphrase: true,
    supplyChain: 'Secure element + verificação de integridade por foto do dispositivo (SafeGaze)',
    precoBRL: 'R$ 1.700 a R$ 2.900',
    soBitcoin: true,
    resumo:
      'Concorrente direto da Coldcard em filosofia: só Bitcoin, air-gap total via QR Code e microSD, tela grande e bateria interna. Preço elevado e disponibilidade de importação limitada no Brasil.',
  },
];

const CRITERIOS = [
  {
    icon: Eye,
    titulo: 'Código aberto',
    texto:
      'Firmware que qualquer pessoa pode ler, auditar e recompilar. Sem isso, você confia cegamente em uma caixa preta com sua chave privada dentro. Todas as cinco opções deste comparativo são open source, mas o grau de auditoria pública varia muito.',
  },
  {
    icon: Cable,
    titulo: 'Air-gap real',
    texto:
      'Air-gap total significa que o dispositivo nunca encosta em cabo USB ligado a um computador conectado à internet. A troca de dados acontece por cartão microSD ou QR Code. Air-gap parcial ainda depende de alguma conexão física ou Bluetooth em certos fluxos.',
  },
  {
    icon: KeyRound,
    titulo: 'Suporte a PSBT',
    texto:
      'Partially Signed Bitcoin Transaction é o padrão que permite assinar uma transação offline e levá-la depois para transmissão em outro dispositivo online. Sem PSBT, não existe air-gap de verdade nem multisig funcional entre marcas diferentes.',
  },
  {
    icon: Fingerprint,
    titulo: 'Passphrase (13ª ou 25ª palavra)',
    texto:
      'Camada extra de senha que cria uma carteira oculta a partir da mesma seed. Quem rouba seu papel com as palavras não acessa o saldo real sem saber a passphrase. Recurso essencial para quem já tem patrimônio relevante em Bitcoin.',
  },
  {
    icon: Boxes,
    titulo: 'Supply chain (cadeia de suprimento)',
    texto:
      'Como o dispositivo prova que não foi adulterado entre a fábrica e sua casa. Lacres físicos, hashes de firmware, verificação por celular e a opção de montar você mesmo o hardware são as defesas usadas hoje.',
  },
  {
    icon: DollarSign,
    titulo: 'Preço em reais',
    texto:
      'Convertido com IOF de importação, frete e variação cambial embutidos. O preço real na sua mão brasileira costuma ficar 30% a 60% acima do valor anunciado em dólar no site do fabricante.',
  },
  {
    icon: ShieldCheck,
    titulo: 'Suporte só-Bitcoin',
    texto:
      'Dispositivos multi-moeda (Trezor, Ledger) carregam mais superfície de ataque no firmware, mais dependências e mais motivo para adicionar funcionalidades desnecessárias. Dispositivos só-Bitcoin tendem a ter firmware mais enxuto e auditável.',
  },
];

const ERROS_COMUNS = [
  'Comprar hardware wallet usada ou de vendedor não oficial, mesmo com preço tentador. Supply chain comprometida é o vetor de ataque mais caro de detectar depois do fato.',
  'Gerar a seed phrase em um dispositivo já configurado por terceiro, achando que está economizando tempo. Sempre gere a seed você mesmo, no primeiro boot, dentro de casa.',
  'Guardar a seed phrase digitada em nota do celular, e-mail ou foto na nuvem. Isso anula 100% da segurança do hardware, não importa a marca escolhida.',
  'Escolher hardware wallet baseado só no preço, ignorando se o firmware é auditável e se existe air-gap real disponível para quem pretende movimentar valores relevantes.',
  'Não testar um pequeno valor de recuperação da seed antes de mandar o grosso do patrimônio para o endereço. Todo backup deveria ser testado igual a um paraquedas.',
  'Usar passphrase sem escrever em local separado da seed original. Esquecer a passphrase é matematicamente equivalente a perder o Bitcoin para sempre.',
];

const FAQ = [
  {
    q: 'Qual é a melhor hardware wallet Bitcoin em 2026?',
    a: 'Não existe "a melhor" universal. Para quem prioriza air-gap absoluto e histórico de segurança comprovado, Coldcard lidera. Para custo-benefício com foco só em Bitcoin, Jade Core é referência. Para quem quer montar o próprio hardware e eliminar risco de supply chain, Krux é a rota. A escolha certa depende do seu volume em Bitcoin e do seu nível técnico.',
  },
  {
    q: 'Vale a pena usar Trezor em 2026 mesmo depois do vazamento de dados?',
    a: 'O vazamento de 2017 expôs dados de contato de clientes, não chaves privadas. A engenharia de assinatura da Trezor nunca foi comprometida naquele incidente. Ainda assim, é um ponto que pesa contra a marca em reputação e reforça por que a etapa de cadastro com dados pessoais deveria ser sempre evitada ao comprar hardware wallet, de qualquer marca.',
  },
  {
    q: 'Hardware wallet DIY como o Krux é segura o suficiente para guardar Bitcoin de verdade?',
    a: 'Sim, desde que você siga o processo de compilação do firmware a partir do código-fonte público e compre o hardware genérico (ESP32) de um fornecedor confiável, sem componentes adulterados. A vantagem do Krux é justamente remover a dependência de confiar cegamente em uma fabricante única.',
  },
  {
    q: 'Preciso de multisig ou uma única hardware wallet já resolve?',
    a: 'Para valores que mudariam sua vida se fossem perdidos, multisig (2 de 3 ou 3 de 5 chaves espalhadas em dispositivos e locais diferentes) reduz o ponto único de falha. Uma única hardware wallet, mesmo excelente, ainda é um ponto único de falha física.',
  },
  {
    q: 'O que é air-gap e por que ele importa tanto?',
    a: 'Air-gap é a ausência de qualquer conexão elétrica direta entre o dispositivo que guarda sua chave privada e um computador ligado à internet. A troca de informação acontece por cartão microSD ou QR Code. Isso elimina classes inteiras de ataque que dependem de malware em USB ou firmware de computador comprometido.',
  },
  {
    q: 'Hardware wallet cara é sempre mais segura que uma barata?',
    a: 'Não necessariamente. O Krux, DIY e barato, oferece air-gap total, o que a Trezor Safe 5, mais cara, não oferece nativamente. Preço reflete design, suporte e acabamento, não necessariamente o nível de segurança criptográfica do dispositivo.',
  },
  {
    q: 'Onde guardo a seed phrase depois de configurar a hardware wallet?',
    a: 'Em backup físico resistente a fogo e água, como placas de aço, nunca em papel simples e nunca digitalizado. É a etapa mais negligenciada de toda a cadeia de autocustódia.',
  },
];

function Selo({ ok }: { ok: boolean }) {
  return ok ? (
    <CheckCircle2 size={20} style={{ color: '#0e3b3a' }} className="shrink-0" />
  ) : (
    <XCircle size={20} style={{ color: '#b45836' }} className="shrink-0" />
  );
}

function AirGapBadge({ v }: { v: Dispositivo['airGap'] }) {
  const map = {
    total: { label: 'Total', color: '#0e3b3a', bg: 'rgba(14,59,58,0.1)' },
    parcial: { label: 'Parcial', color: '#c97a3d', bg: 'rgba(201,122,61,0.12)' },
    nao: { label: 'Não possui', color: '#9a3d3d', bg: 'rgba(154,61,61,0.1)' },
  } as const;
  const cfg = map[v];
  return (
    <span
      className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider"
      style={{ color: cfg.color, backgroundColor: cfg.bg }}
    >
      {cfg.label}
    </span>
  );
}

function Hero() {
  return (
    <section className="relative w-full" style={{ height: '92vh', minHeight: 720 }}>
      <img
        src={heroImg}
        alt="Conjunto de hardware wallets Bitcoin lado a lado sobre superfície escura, representando o comparativo entre Coldcard, Trezor, Jade e Krux"
        width={1920}
        height={1080}
        className="absolute inset-0 w-full h-full object-cover"
        loading="eager"
        fetchPriority="high"
        decoding="async"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, rgba(14,59,58,0.6) 0%, rgba(14,59,58,0.4) 40%, rgba(14,59,58,0.92) 100%)',
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
            <Scale size={11} className="inline mr-2" /> Comparativos · Hardware Wallets
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1, delay: 0.15, ease: APPLE_EASE }}
          className="text-[clamp(2.5rem,8vw,7rem)] font-black leading-[0.95] tracking-tight max-w-[20ch]"
          style={{ fontFamily: "'Inter Tight', sans-serif", color: '#f4ede4' }}
        >
          Melhor hardware wallet Bitcoin.{' '}
          <span
            style={{
              color: '#e8a36b',
              fontStyle: 'italic',
              fontWeight: 400,
              fontFamily: "'Playfair Display', serif",
              textShadow: '0 0 40px rgba(232,163,107,0.45), 0 0 80px rgba(232,163,107,0.25)',
            }}
          >
            Comparativo sem patrocínio.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: APPLE_EASE }}
          className="mt-8 max-w-2xl text-lg md:text-2xl leading-relaxed font-light"
          style={{ color: 'rgba(244,237,228,0.85)', fontFamily: "'Inter Tight', sans-serif" }}
        >
          Coldcard, Trezor, Jade Core, Krux e Foundation Passport lado a lado: código aberto, air-gap, PSBT, passphrase, supply chain e preço real em reais. Sem link de afiliado disfarçado de review.
        </motion.p>
      </motion.div>
    </section>
  );
}

export default function MelhoresHardwareWallets() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <>
      <SeoHead
        path="/comparativos/melhores-hardware-wallets"
        custom={{
          title: 'Melhor Hardware Wallet Bitcoin 2026: Coldcard vs Trezor vs Jade vs Krux',
          description:
            'Comparativo honesto entre Coldcard, Trezor, Jade Core, Krux DIY e Foundation Passport: código aberto, air-gap, PSBT, passphrase, supply chain e preço em reais.',
          canonical: 'https://sovereign-arsenal.lovable.app/comparativos/melhores-hardware-wallets',
          primaryKeyword: 'melhor hardware wallet bitcoin',
          lsiKeywords: [
            'coldcard vs trezor',
            'hardware wallet bitcoin brasil',
            'air-gap bitcoin',
            'PSBT hardware wallet',
            'passphrase bitcoin',
            'krux DIY',
            'foundation passport review',
          ],
          longTailKeywords: [
            'qual a melhor hardware wallet para bitcoin em 2026',
            'coldcard ou trezor qual comprar',
            'hardware wallet só bitcoin sem altcoin',
            'como escolher hardware wallet segura',
          ],
          breadcrumbs: [
            { name: 'Início', url: '/' },
            { name: 'Comparativos', url: '/comparativos' },
            { name: 'Melhores Hardware Wallets', url: '/comparativos/melhores-hardware-wallets' },
          ],
          schemaType: 'Article',
          articleSection: 'Comparativos',
          relatedPages: [
            '/comparativos/coldcard-review',
            '/comparativos/trezor-review',
            '/autocustodia/jade-core-review',
            '/autocustodia/hardware-wallet-diy-bitcoin',
            '/autocustodia/seed-phrase-em-aco',
            '/autocustodia/krux-passphrase-bluewallet',
            '/multisig-bitcoin',
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

        {/* CAPÍTULO 1 — Por que comparar de verdade importa */}
        <section className="relative px-6 md:px-12 lg:px-20 py-24 md:py-36">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 max-w-[1600px] mx-auto">
            <motion.aside {...fade(0)} className="lg:col-span-4">
              <div className="sticky top-24">
                <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#c97a3d' }}>
                  Capítulo 01
                </span>
                <div className="h-[2px] w-16 mb-6" style={{ backgroundColor: '#c97a3d' }} />
                <p className="text-sm uppercase tracking-[0.2em] font-semibold" style={{ color: '#5a6664' }}>
                  Por que comparar de verdade importa
                </p>
              </div>
            </motion.aside>
            <motion.div {...fade(0.1)} className="lg:col-span-8">
              <h2 className="text-[clamp(2.25rem,5.5vw,5rem)] font-black leading-[1] tracking-tight mb-10" style={{ color: '#0e3b3a' }}>
                A maioria dos "comparativos"{' '}
                <span style={{ color: '#c97a3d', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>
                  é anúncio disfarçado.
                </span>
              </h2>
              <div className="space-y-7 text-lg md:text-xl leading-[1.7] font-light" style={{ color: '#2d3a37' }}>
                <p>
                  Procure "melhor hardware wallet bitcoin" e você vai encontrar dez vídeos usando o mesmo link de afiliado, elogiando a mesma marca que paga a maior comissão. Ninguém menciona o vazamento de dados, ninguém explica a diferença real entre air-gap total e air-gap de marketing, e quase ninguém fala sobre montar a sua própria hardware wallet por menos de R$ 400.
                </p>
                <p>
                  Este comparativo não recebeu patrocínio de nenhuma das marcas citadas. Os critérios abaixo, código aberto, air-gap, PSBT, passphrase, supply chain e preço real em reais, são os mesmos que qualquer pessoa técnica usaria para decidir onde colocar a chave privada que protege o próprio patrimônio.
                </p>
                <blockquote
                  className="pl-8 py-2 my-10 text-2xl md:text-3xl leading-[1.4] font-light"
                  style={{ borderLeft: '3px solid #c97a3d', color: '#0e3b3a', fontFamily: "'Playfair Display', serif", fontStyle: 'italic' }}
                >
                  A hardware wallet certa é a que você entende, testa e consegue recuperar sozinho, sem depender de suporte técnico de terceiro.
                </blockquote>
                <p>
                  Nenhuma marca é perfeita. Cada uma erra em um ponto diferente da cadeia de confiança. O trabalho de quem decide onde guardar Bitcoin de verdade é entender exatamente onde cada erro mora, e escolher o risco que consegue mitigar sozinho.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* CAPÍTULO 2 — Critérios */}
        <section className="relative py-24 md:py-32 px-6 md:px-12 lg:px-20" style={{ backgroundColor: '#0e3b3a', color: '#f4ede4' }}>
          <div className="max-w-[1600px] mx-auto grid lg:grid-cols-12 gap-10 lg:gap-16">
            <motion.aside {...fade(0)} className="lg:col-span-4">
              <div className="sticky top-24">
                <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#e8a36b' }}>
                  Capítulo 02
                </span>
                <div className="h-[2px] w-16 mb-6" style={{ backgroundColor: '#e8a36b' }} />
                <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-black leading-[1.05] tracking-tight mb-6">
                  Os sete critérios que{' '}
                  <span style={{ color: '#e8a36b', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>
                    realmente importam
                  </span>
                </h2>
                <img
                  src={criteriosImg}
                  alt="Close-up macro escuro de hardware wallet Bitcoin sobre mesa de madeira, ilustrando critérios técnicos de avaliação"
                  width={1024}
                  height={768}
                  className="rounded-xl w-full object-cover hidden lg:block mt-8"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </motion.aside>
            <div className="lg:col-span-8 grid sm:grid-cols-2 gap-6">
              {CRITERIOS.map((c, i) => (
                <motion.div
                  key={c.titulo}
                  {...fade(i * 0.05)}
                  className="p-8 rounded-2xl"
                  style={{ backgroundColor: 'rgba(244,237,228,0.06)', border: '1px solid rgba(232,163,107,0.18)' }}
                >
                  <c.icon size={28} style={{ color: '#e8a36b' }} className="mb-5" />
                  <h3 className="text-xl font-black mb-3">{c.titulo}</h3>
                  <p className="text-base leading-relaxed font-light" style={{ color: 'rgba(244,237,228,0.8)' }}>
                    {c.texto}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CAPÍTULO 3 — Tabela comparativa */}
        <section className="relative px-6 md:px-12 lg:px-20 py-24 md:py-36">
          <div className="max-w-[1600px] mx-auto">
            <motion.div {...fade(0)} className="mb-14 max-w-3xl">
              <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#c97a3d' }}>
                Capítulo 03
              </span>
              <div className="h-[2px] w-16 mb-6" style={{ backgroundColor: '#c97a3d' }} />
              <h2 className="text-[clamp(2.25rem,5.5vw,5rem)] font-black leading-[1] tracking-tight" style={{ color: '#0e3b3a' }}>
                O comparativo,{' '}
                <span style={{ color: '#c97a3d', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>
                  cara a cara.
                </span>
              </h2>
            </motion.div>

            {/* Tabela desktop */}
            <motion.div {...fade(0.1)} className="hidden lg:block overflow-x-auto rounded-2xl" style={{ border: '1px solid rgba(14,59,58,0.15)' }}>
              <table className="w-full text-left" style={{ backgroundColor: '#fff' }}>
                <thead>
                  <tr style={{ backgroundColor: '#0e3b3a', color: '#f4ede4' }}>
                    <th className="p-5 text-sm font-bold uppercase tracking-wider">Dispositivo</th>
                    <th className="p-5 text-sm font-bold uppercase tracking-wider">Código aberto</th>
                    <th className="p-5 text-sm font-bold uppercase tracking-wider">Air-gap</th>
                    <th className="p-5 text-sm font-bold uppercase tracking-wider">PSBT</th>
                    <th className="p-5 text-sm font-bold uppercase tracking-wider">Passphrase</th>
                    <th className="p-5 text-sm font-bold uppercase tracking-wider">Só Bitcoin</th>
                    <th className="p-5 text-sm font-bold uppercase tracking-wider">Preço (BRL)</th>
                  </tr>
                </thead>
                <tbody>
                  {DISPOSITIVOS.map((d, i) => (
                    <tr key={d.nome} style={{ borderTop: '1px solid rgba(14,59,58,0.08)', backgroundColor: i % 2 ? '#f9f5ee' : '#fff' }}>
                      <td className="p-5">
                        <p className="font-black text-lg" style={{ color: '#0e3b3a' }}>{d.nome}</p>
                        <p className="text-sm" style={{ color: '#c97a3d' }}>{d.categoria}</p>
                      </td>
                      <td className="p-5"><Selo ok={d.codigoAberto} /></td>
                      <td className="p-5"><AirGapBadge v={d.airGap} /></td>
                      <td className="p-5"><Selo ok={d.psbt} /></td>
                      <td className="p-5"><Selo ok={d.passphrase} /></td>
                      <td className="p-5"><Selo ok={d.soBitcoin} /></td>
                      <td className="p-5 font-bold" style={{ color: '#1c2624' }}>{d.precoBRL}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </motion.div>

            {/* Cartões mobile */}
            <div className="lg:hidden space-y-5">
              {DISPOSITIVOS.map((d, i) => (
                <motion.div
                  key={d.nome}
                  {...fade(i * 0.05)}
                  className="p-6 rounded-2xl"
                  style={{ backgroundColor: '#fff', border: '1px solid rgba(14,59,58,0.12)' }}
                >
                  <p className="font-black text-xl mb-1" style={{ color: '#0e3b3a' }}>{d.nome}</p>
                  <p className="text-sm font-semibold mb-4" style={{ color: '#c97a3d' }}>{d.categoria}</p>
                  <div className="grid grid-cols-2 gap-y-3 text-sm">
                    <span style={{ color: '#5a6664' }}>Código aberto</span><Selo ok={d.codigoAberto} />
                    <span style={{ color: '#5a6664' }}>Air-gap</span><AirGapBadge v={d.airGap} />
                    <span style={{ color: '#5a6664' }}>PSBT</span><Selo ok={d.psbt} />
                    <span style={{ color: '#5a6664' }}>Passphrase</span><Selo ok={d.passphrase} />
                    <span style={{ color: '#5a6664' }}>Só Bitcoin</span><Selo ok={d.soBitcoin} />
                    <span style={{ color: '#5a6664' }}>Preço</span><span className="font-bold">{d.precoBRL}</span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Resumos + supply chain */}
            <div className="grid md:grid-cols-2 gap-6 mt-14">
              {DISPOSITIVOS.map((d, i) => (
                <motion.div key={d.nome} {...fade(i * 0.04)} className="p-8 rounded-2xl" style={{ backgroundColor: '#ece2d3' }}>
                  <h3 className="text-xl font-black mb-2" style={{ color: '#0e3b3a' }}>{d.nome}</h3>
                  <p className="text-base leading-relaxed font-light mb-4" style={{ color: '#2d3a37' }}>{d.resumo}</p>
                  <p className="text-sm font-semibold mb-1" style={{ color: '#c97a3d' }}>Supply chain</p>
                  <p className="text-sm leading-relaxed font-light mb-4" style={{ color: '#2d3a37' }}>{d.supplyChain}</p>
                  {d.link && (
                    <Link to={d.link} className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider" style={{ color: '#0e3b3a' }}>
                      Ler review completa <ArrowRight size={15} />
                    </Link>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CAPÍTULO 4 — DIY vs comprar pronto */}
        <section className="relative py-24 md:py-32 px-6 md:px-12 lg:px-20" style={{ backgroundColor: '#0e3b3a', color: '#f4ede4' }}>
          <div className="max-w-[1600px] mx-auto grid lg:grid-cols-2 gap-14 items-center">
            <motion.div {...fade(0)}>
              <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#e8a36b' }}>
                Capítulo 04
              </span>
              <div className="h-[2px] w-16 mb-6" style={{ backgroundColor: '#e8a36b' }} />
              <h2 className="text-[clamp(2rem,4.5vw,4rem)] font-black leading-[1.05] tracking-tight mb-8">
                Comprar pronto{' '}
                <span style={{ color: '#e8a36b', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>
                  ou montar você mesmo?
                </span>
              </h2>
              <div className="space-y-6 text-lg leading-[1.7] font-light" style={{ color: 'rgba(244,237,228,0.85)' }}>
                <p>
                  Comprar pronto elimina trabalho manual, mas cria dependência de uma fabricante e de uma transportadora. Montar você mesmo, como no Krux, remove essa dependência, mas exige tempo, atenção e disposição para seguir um tutorial técnico sem pular etapas.
                </p>
                <p>
                  A analogia mais simples é a de um cofre. Comprar um cofre de banco pronto é rápido, mas você confia que o fabricante não deixou uma chave mestra escondida. Construir seu próprio cofre com chapa e solda garante que só você sabe exatamente o que existe ali dentro, mas exige que você saiba soldar.
                </p>
                <p>
                  Para valores pequenos e médios, uma hardware wallet pronta e de marca auditada resolve. Para reservas que mudariam sua vida, vale considerar diversificação: uma chave numa Coldcard, outra numa Krux montada por você, dentro de um arranjo multisig.
                </p>
              </div>
            </motion.div>
            <motion.div {...fade(0.15)}>
              <img
                src={diyImg}
                alt="Placa eletrônica ESP32 e cartão SD sobre superfície escura usados para montar hardware wallet Bitcoin DIY com firmware Krux"
                width={1280}
                height={720}
                className="rounded-2xl w-full object-cover"
                loading="lazy"
                decoding="async"
              />
            </motion.div>
          </div>
        </section>

        {/* CAPÍTULO 5 — Erros comuns */}
        <section className="relative px-6 md:px-12 lg:px-20 py-24 md:py-36">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 max-w-[1600px] mx-auto">
            <motion.aside {...fade(0)} className="lg:col-span-4">
              <div className="sticky top-24">
                <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#c97a3d' }}>
                  Capítulo 05
                </span>
                <div className="h-[2px] w-16 mb-6" style={{ backgroundColor: '#c97a3d' }} />
                <p className="text-sm uppercase tracking-[0.2em] font-semibold" style={{ color: '#5a6664' }}>
                  Erros que custam patrimônio
                </p>
              </div>
            </motion.aside>
            <motion.div {...fade(0.1)} className="lg:col-span-8">
              <h2 className="text-[clamp(2rem,5vw,4.5rem)] font-black leading-[1.05] tracking-tight mb-10" style={{ color: '#0e3b3a' }}>
                Seis erros comuns na hora de{' '}
                <span style={{ color: '#c97a3d', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>
                  escolher e configurar.
                </span>
              </h2>
              <div className="space-y-5">
                {ERROS_COMUNS.map((erro, i) => (
                  <div key={i} className="flex gap-4 p-6 rounded-2xl" style={{ backgroundColor: '#ece2d3' }}>
                    <AlertTriangle size={22} className="shrink-0 mt-1" style={{ color: '#b45836' }} />
                    <p className="text-base md:text-lg leading-relaxed font-light" style={{ color: '#2d3a37' }}>{erro}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* CAPÍTULO 6 — Multisig */}
        <section className="relative py-24 md:py-32 px-6 md:px-12 lg:px-20" style={{ backgroundColor: '#ece2d3' }}>
          <div className="max-w-[1600px] mx-auto grid lg:grid-cols-2 gap-14 items-center">
            <motion.div {...fade(0)} className="order-2 lg:order-1">
              <img
                src={multisigImg}
                alt="Três hardware wallets Bitcoin dispostas em cofre escuro representando arranjo multisig 2 de 3"
                width={1024}
                height={1024}
                className="rounded-2xl w-full object-cover"
                loading="lazy"
                decoding="async"
              />
            </motion.div>
            <motion.div {...fade(0.1)} className="order-1 lg:order-2">
              <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#c97a3d' }}>
                Capítulo 06
              </span>
              <div className="h-[2px] w-16 mb-6" style={{ backgroundColor: '#c97a3d' }} />
              <h2 className="text-[clamp(2rem,4.5vw,4rem)] font-black leading-[1.05] tracking-tight mb-8" style={{ color: '#0e3b3a' }}>
                Uma hardware wallet só{' '}
                <span style={{ color: '#c97a3d', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>
                  ainda é um ponto único de falha.
                </span>
              </h2>
              <div className="space-y-6 text-lg leading-[1.7] font-light" style={{ color: '#2d3a37' }}>
                <p>
                  Comprar a melhor hardware wallet do mercado resolve o problema de assinatura de transação, mas não resolve o problema de concentração de risco. Se a casa pega fogo com a única wallet e o único backup dentro, o patrimônio some independente da marca.
                </p>
                <p>
                  Multisig 2 de 3 combina, por exemplo, uma Coldcard, uma Jade Core e uma Krux montada por você, cada uma guardada em local físico diferente. Para gastar, é preciso assinar em pelo menos duas das três. Ladrão, incêndio ou erro humano em um único ponto não derruba o arranjo inteiro.
                </p>
              </div>
              <Link
                to="/multisig-bitcoin"
                className="inline-flex items-center gap-2 mt-8 text-sm font-bold uppercase tracking-wider px-6 py-3 rounded-full"
                style={{ backgroundColor: '#0e3b3a', color: '#f4ede4' }}
              >
                Entender multisig na prática <ArrowRight size={16} />
              </Link>
            </motion.div>
          </div>
        </section>

        {/* CAPÍTULO 7 — FAQ */}
        <section className="relative px-6 md:px-12 lg:px-20 py-24 md:py-36">
          <div className="max-w-[1100px] mx-auto">
            <motion.div {...fade(0)} className="mb-14">
              <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#c97a3d' }}>
                Capítulo 07
              </span>
              <div className="h-[2px] w-16 mb-6" style={{ backgroundColor: '#c97a3d' }} />
              <h2 className="text-[clamp(2rem,5vw,4.5rem)] font-black leading-[1.05] tracking-tight" style={{ color: '#0e3b3a' }}>
                Perguntas que sempre{' '}
                <span style={{ color: '#c97a3d', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>
                  aparecem.
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
                    style={{ backgroundColor: '#ece2d3', boxShadow: open ? '0 8px 24px rgba(14,59,58,0.1)' : '0 1px 3px rgba(14,59,58,0.05)' }}
                  >
                    <button onClick={() => setOpenFaq(open ? null : i)} className="w-full flex items-center justify-between gap-6 p-6 md:p-8 text-left">
                      <span className="text-lg md:text-xl font-bold leading-snug" style={{ color: '#0e3b3a' }}>{f.q}</span>
                      <ChevronDown
                        size={22}
                        className="shrink-0 transition-transform duration-500"
                        style={{ color: '#c97a3d', transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
                      />
                    </button>
                    {open && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        transition={{ duration: 0.5, ease: APPLE_EASE }}
                        className="px-6 md:px-8 pb-8"
                      >
                        <p className="text-base md:text-lg leading-relaxed font-light" style={{ color: '#2d3a37' }}>{f.a}</p>
                      </motion.div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CAPÍTULO 8 — Continue sua trilha */}
        <section className="relative py-24 md:py-32 px-6 md:px-12 lg:px-20" style={{ backgroundColor: '#0e3b3a', color: '#f4ede4' }}>
          <div className="max-w-[1400px] mx-auto">
            <motion.div {...fade(0)} className="mb-12 max-w-2xl">
              <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#e8a36b' }}>
                Continue sua trilha
              </span>
              <h2 className="text-[clamp(2rem,4.5vw,4rem)] font-black leading-[1] tracking-tight">
                Escolher a caixa{' '}
                <span style={{ color: '#e8a36b', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>
                  é só o começo.
                </span>
              </h2>
            </motion.div>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { to: '/comparativos/coldcard-review', titulo: 'Review completa: Coldcard', texto: 'Air-gap total, duress PIN, brick me e passo a passo do primeiro uso.' },
                { to: '/comparativos/trezor-review', titulo: 'Review completa: Trezor', texto: 'Safe 3, Safe 5, o vazamento de 2017 e para quem ela realmente serve.' },
                { to: '/autocustodia/jade-core-review', titulo: 'Jade Core, a Review', texto: 'A hardware wallet que tira você da gaiola fiat em poucos minutos.' },
                { to: '/autocustodia/hardware-wallet-diy-bitcoin', titulo: 'Hardware Wallet DIY', texto: 'Construa a sua com Krux e elimine risco de supply chain.' },
                { to: '/autocustodia/seed-phrase-em-aco', titulo: 'Seed Phrase em Aço', texto: 'Backup indestrutível contra fogo, água e tempo.' },
                { to: '/autocustodia/krux-passphrase-bluewallet', titulo: 'Krux + Passphrase + BlueWallet', texto: 'Setup avançado de autocustódia com air-gap completo.' },
                { to: '/dicionario-cripto', titulo: 'Glossario de soberania', texto: 'Do UTXO ao domicilio fiscal: todos os termos tecnicos deste site explicados em uma pagina.' },
              ].map((c) => (
                <Link
                  key={c.to}
                  to={c.to}
                  className="group p-8 rounded-2xl transition-all hover:-translate-y-1"
                  style={{ backgroundColor: 'rgba(244,237,228,0.06)', border: '1px solid rgba(232,163,107,0.18)' }}
                >
                  <h3 className="text-xl md:text-2xl font-black leading-tight mb-3" style={{ color: '#f4ede4' }}>{c.titulo}</h3>
                  <p className="text-base leading-relaxed font-light mb-5" style={{ color: 'rgba(244,237,228,0.75)' }}>{c.texto}</p>
                  <span className="inline-flex items-center gap-2 text-sm font-bold tracking-wider uppercase transition-transform group-hover:translate-x-1" style={{ color: '#e8a36b' }}>
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
