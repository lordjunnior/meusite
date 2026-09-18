import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ShieldCheck, Lock, KeyRound, QrCode, ChevronDown, ArrowRight,
  CheckCircle2, XCircle, AlertTriangle, Scale, Fingerprint, Smartphone, Truck,
} from 'lucide-react';
import SeoHead from '@/components/SeoHead';
import BackToHome from '@/components/BackToHome';
import heroImg from '@/assets/passport/passport-hero.webp';
import setupImg from '@/assets/passport/passport-airgap.webp';
import seedImg from '@/assets/passport/passport-microsd.webp';

const APPLE_EASE = [0.22, 1, 0.36, 1] as const;
const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.8, ease: APPLE_EASE, delay },
});

const PROS = [
  'Air-gap por QR Code: transações não assinadas e assinadas trafegam pela câmera do dispositivo, sem cabo USB e sem cartão microSD obrigatório.',
  'Teclado numérico físico e tela integrada, permitindo digitar PIN e conferir endereços sem depender de toque em vidro compartilhado com qualquer computador.',
  'Montagem final e testes de qualidade feitos nos Estados Unidos, com rastreabilidade declarada de componentes críticos, algo raro na categoria.',
  'Firmware de código aberto, auditável publicamente, com verificação de assinatura antes de qualquer atualização instalada no dispositivo.',
  'Elemento seguro dedicado para proteger a seed contra extração física, mesmo com o dispositivo em mãos de terceiros.',
  'MicroSD como caminho alternativo de transferência de dados, útil quando a leitura de QR Code não é prática ou o coordenador ainda não suporta o formato.',
  'Suporte nativo a multisig e compatibilidade testada com Sparrow, Nunchuk e BlueWallet, sem prender o usuário ao aplicativo próprio.',
  'Foco só em Bitcoin, sem firmware inchado por suporte a dezenas de moedas que nunca serão usadas.',
];

const CONTRAS = [
  'Preço elevado mesmo dentro da categoria de hardware wallets premium, o que pesa para quem está começando com pouco capital.',
  'Bateria interna recarregável, um componente a mais que desgasta com o tempo e não existe nos modelos totalmente passivos da concorrência.',
  'Envio internacional a partir dos Estados Unidos, com prazos que variam e risco real de retenção alfandegária.',
  'Impostos de importação no Brasil que podem encarecer o produto de forma significativa, dependendo da via de envio escolhida.',
  'Curva de aprendizado real para quem nunca configurou multisig ou nunca leu sobre PSBT antes.',
  'Ecossistema de acessórios e comunidade em português ainda menor do que o de concorrentes mais populares.',
];

const NAO_SERVE = [
  'Quem quer o preço mais baixo possível para dar o primeiro passo em autocustódia.',
  'Quem pretende comprar uma carteira multi-moeda para usar o mesmo dispositivo em ativos além de Bitcoin.',
  'Quem não tolera esperar semanas por um envio internacional e não quer lidar com eventual retenção na alfândega brasileira.',
  'Quem tem pavor de qualquer processo técnico e quer usar o aplicativo do fabricante como única opção, sem nunca migrar de coordenador.',
];

const PASSOS = [
  { n: '01', titulo: 'Confira a embalagem e o lacre antes de ligar', texto: 'Compare o lacre físico da caixa com as instruções do site oficial da Foundation. Qualquer indício de violação, interrompa a configuração e contate o vendedor antes de prosseguir.' },
  { n: '02', titulo: 'Gere a seed dentro do próprio Passport', texto: 'Nunca aceite uma seed pronta vinda de fora do dispositivo. O Passport gera as 12 ou 24 palavras usando sua própria fonte de aleatoriedade, sem depender do celular ou computador usado depois.' },
  { n: '03', titulo: 'Registre a seed em papel e depois em metal', texto: 'A anotação em papel é apenas o primeiro rascunho. Para resistência real contra fogo e água, transfira a seed para uma placa de backup em aço inoxidável assim que possível.' },
  { n: '04', titulo: 'Configure o PIN pelo teclado numérico físico', texto: 'Defina um PIN forte digitado no teclado físico do próprio dispositivo, sem exposição em tela de celular ou computador conectado à internet.' },
  { n: '05', titulo: 'Instale o aplicativo Envoy como coordenador inicial', texto: 'O Envoy é o aplicativo próprio da Foundation, pensado para acompanhar saldo, gerenciar múltiplas carteiras e iniciar transações que depois são assinadas via QR Code pelo Passport.' },
  { n: '06', titulo: 'Teste a leitura de QR Code com valor pequeno', texto: 'Antes de mover qualquer quantia relevante, simule uma transação de teste, gere o QR Code no coordenador, leia com a câmera do Passport, confira o endereço na tela e assine.' },
  { n: '07', titulo: 'Migre para Sparrow ou Nunchuk se for montar multisig', texto: 'Para arranjos multisig entre marcas diferentes, use um coordenador compatível com PSBT como Sparrow ou Nunchuk, combinando o Passport com Coldcard, Trezor ou Jade num mesmo cofre.' },
];

const FAQ = [
  { q: 'O Foundation Passport é realmente air-gap?', a: 'Sim, na configuração recomendada. A transferência de transações não assinadas e assinadas acontece por QR Code lido pela câmera do dispositivo, ou alternativamente por cartão microSD. O Passport não precisa de cabo USB conectado a um computador online para assinar.' },
  { q: 'Preciso usar o aplicativo Envoy obrigatoriamente?', a: 'Não. O Envoy é o coordenador próprio da Foundation e funciona bem para uso do dia a dia com carteira única, mas o Passport também é compatível com Sparrow, Nunchuk e BlueWallet, então você não fica preso a um único aplicativo.' },
  { q: 'O Passport funciona em arranjo multisig com Coldcard, Trezor ou Jade?', a: 'Sim. Por seguir o padrão PSBT, o Passport combina com outras hardware wallets compatíveis com o mesmo padrão em arranjos como 2 de 3, misturando marcas diferentes para reduzir o risco de falha de um único fabricante.' },
  { q: 'Por que o Foundation Passport é montado nos Estados Unidos?', a: 'A Foundation Devices declara como diferencial a montagem final e os testes de qualidade em território americano, buscando maior controle sobre a cadeia de suprimentos em comparação com fabricação totalmente terceirizada em outros países. Isso não elimina todo risco de supply chain, mas reduz alguns vetores.' },
  { q: 'Vale a pena importar o Passport para o Brasil?', a: 'Depende do seu orçamento e paciência. O envio parte dos Estados Unidos, o prazo varia e existe risco real de retenção alfandegária com cobrança de imposto de importação, o que pode elevar bastante o custo final em relação ao preço anunciado em dólar.' },
  { q: 'O Passport usa bateria, isso é um risco?', a: 'O dispositivo tem bateria interna recarregável, o que é conveniente no uso diário mas representa um componente a mais que se degrada com o tempo, diferente de modelos totalmente passivos alimentados só via USB no momento do uso.' },
  { q: 'Preciso saber programar para configurar o Passport?', a: 'Não é necessário programar, mas é necessário entender os conceitos básicos de seed, PIN e PSBT antes de mover valores relevantes. A curva de aprendizado é real, especialmente para quem nunca configurou multisig.' },
  { q: 'O firmware do Passport é auditável?', a: 'Sim, o firmware é de código aberto e o dispositivo verifica a assinatura de qualquer atualização antes de instalar, permitindo que qualquer pessoa com conhecimento técnico revise o código publicado pela Foundation Devices.' },
];

function Selo({ ok }: { ok: boolean }) {
  return ok ? <CheckCircle2 size={20} style={{ color: '#0e3b3a' }} /> : <XCircle size={20} style={{ color: '#b45836' }} />;
}

function Hero() {
  return (
    <section className="relative w-full" style={{ height: '92vh', minHeight: 720 }}>
      <img
        src={heroImg}
        alt="Hardware wallet Bitcoin escura em macro fotografia sobre superfície de madeira, representando o Foundation Passport focado em air-gap por QR Code"
        width={1024}
        height={1024}
        className="absolute inset-0 w-full h-full object-cover"
        loading="eager"
        fetchPriority="high"
        decoding="async"
      />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(14,59,58,0.6) 0%, rgba(14,59,58,0.4) 40%, rgba(14,59,58,0.92) 100%)' }} />
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, ease: APPLE_EASE }}
        className="relative z-10 h-full flex flex-col justify-end px-6 md:px-12 lg:px-20 pb-20 md:pb-28 max-w-[1600px] mx-auto"
      >
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.2 }} className="inline-flex items-center gap-3 mb-8">
          <span className="px-4 py-1.5 rounded-full text-xs font-bold tracking-[0.3em] uppercase backdrop-blur-md" style={{ backgroundColor: 'rgba(244,237,228,0.15)', color: '#f4ede4', border: '1px solid rgba(244,237,228,0.3)' }}>
            <Scale size={11} className="inline mr-2" /> Comparativos · Review
          </span>
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1, delay: 0.15, ease: APPLE_EASE }}
          className="text-[clamp(2.5rem,8vw,7rem)] font-black leading-[0.95] tracking-tight max-w-[18ch]"
          style={{ fontFamily: "'Inter Tight', sans-serif", color: '#f4ede4' }}
        >
          Foundation Passport, a review{' '}
          <span style={{ color: '#e8a36b', fontStyle: 'italic', fontWeight: 400, fontFamily: "'Playfair Display', serif", textShadow: '0 0 40px rgba(232,163,107,0.45)' }}>
            sem filtro.
          </span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: APPLE_EASE }}
          className="mt-8 max-w-2xl text-lg md:text-2xl leading-relaxed font-light"
          style={{ color: 'rgba(244,237,228,0.85)', fontFamily: "'Inter Tight', sans-serif" }}
        >
          Air-gap via QR Code, teclado numérico físico, montagem nos Estados Unidos e código aberto. A hardware wallet que aposta tudo em transparência de cadeia de suprimentos, com prós, contras e para quem ela realmente serve.
        </motion.p>
      </motion.div>
    </section>
  );
}

export default function FoundationPassportReview() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <>
      <SeoHead
        path="/comparativos/foundation-passport-review"
        custom={{
          title: 'Foundation Passport Review 2026: Air-gap por QR Code e Código Aberto',
          description: 'Review completa e honesta do Foundation Passport: air-gap via QR Code, teclado físico, montagem nos EUA, firmware open source, prós, contras e para quem não serve.',
          canonical: 'https://lordjunnior.com.br/comparativos/foundation-passport-review',
          primaryKeyword: 'foundation passport review',
          lsiKeywords: [
            'foundation passport air-gap',
            'foundation passport envoy',
            'foundation passport multisig',
            'hardware wallet código aberto',
            'foundation devices passport',
            'foundation passport batch 2',
          ],
          longTailKeywords: [
            'vale a pena comprar foundation passport',
            'como configurar foundation passport primeira vez',
            'foundation passport ou coldcard qual escolher',
            'foundation passport funciona com sparrow wallet',
          ],
          breadcrumbs: [
            { name: 'Início', url: '/' },
            { name: 'Comparativos', url: '/comparativos' },
            { name: 'Foundation Passport Review', url: '/comparativos/foundation-passport-review' },
          ],
          schemaType: 'Article',
          articleSection: 'Comparativos',
          relatedPages: [
            '/comparativos/melhores-hardware-wallets',
            '/comparativos/coldcard-review',
            '/comparativos/trezor-review',
            '/autocustodia/jade-core-review',
            '/multisig-bitcoin',
          ],
        }}
        faqItems={FAQ.map((f) => ({ question: f.q, answer: f.a }))}
      />

      <div className="relative min-h-screen" style={{ backgroundColor: '#f4ede4', color: '#1c2624', fontFamily: "'Inter Tight', sans-serif" }}>
        <div className="absolute top-0 left-0 right-0 z-30 px-6 md:px-12 lg:px-20 pt-[52px]">
          <BackToHome />
        </div>

        <Hero />

        {/* Nota editorial */}
        <section className="relative px-6 md:px-12 lg:px-20 pt-16">
          <div className="max-w-[1600px] mx-auto">
            <p className="text-sm md:text-base font-light max-w-3xl" style={{ color: '#5a6664' }}>
              Esta review foi escrita a partir de documentação pública, especificações oficiais e experiência de configuração de dispositivos da mesma categoria. Preços e prazos citados variam com o tempo e devem ser confirmados diretamente no canal oficial antes da compra.
            </p>
          </div>
        </section>

        {/* CAPÍTULO 1 — O que é o Passport */}
        <section className="relative px-6 md:px-12 lg:px-20 py-24 md:py-36">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 max-w-[1600px] mx-auto">
            <motion.aside {...fade(0)} className="lg:col-span-4">
              <div className="sticky top-24">
                <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#c97a3d' }}>Capítulo 01</span>
                <div className="h-[2px] w-16 mb-6" style={{ backgroundColor: '#c97a3d' }} />
                <p className="text-sm uppercase tracking-[0.2em] font-semibold" style={{ color: '#5a6664' }}>O que é o Passport</p>
              </div>
            </motion.aside>
            <motion.div {...fade(0.1)} className="lg:col-span-8">
              <h2 className="text-[clamp(2.25rem,5.5vw,5rem)] font-black leading-[1] tracking-tight mb-10" style={{ color: '#0e3b3a' }}>
                A carteira que aposta{' '}
                <span style={{ color: '#c97a3d', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>
                  em transparência de origem.
                </span>
              </h2>
              <div className="space-y-7 text-lg md:text-xl leading-[1.7] font-light" style={{ color: '#2d3a37' }}>
                <p>
                  O Foundation Passport é a hardware wallet dedicada só a Bitcoin fabricada pela Foundation Devices, empresa americana que decidiu competir na categoria de dispositivos air-gap com um argumento diferente do resto do mercado: montagem final e testes de qualidade feitos nos Estados Unidos, com discurso explícito de rastreabilidade da cadeia de suprimentos.
                </p>
                <p>
                  Fisicamente, o Passport chama atenção pelo teclado numérico físico completo e pela tela grande, que juntos permitem digitar PIN, navegar menus e conferir endereços inteiros sem depender de botões minúsculos ou de rolagem incômoda. A câmera embutida lê QR Codes para movimentar transações sem cabo e sem, necessariamente, precisar de cartão microSD.
                </p>
                <p>
                  Não é um produto pensado para ser o mais barato da prateleira. É um produto pensado para quem valoriza saber quem fabricou o dispositivo, onde foi montado, e quer poder auditar o firmware que roda dentro dele antes de confiar nele com patrimônio relevante.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* CAPÍTULO 2 — Air-gap via QR Code */}
        <section className="relative py-24 md:py-32 px-6 md:px-12 lg:px-20" style={{ backgroundColor: '#0e3b3a', color: '#f4ede4' }}>
          <div className="max-w-[1600px] mx-auto grid lg:grid-cols-2 gap-14 items-center">
            <motion.div {...fade(0)}>
              <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#e8a36b' }}>Capítulo 02</span>
              <div className="h-[2px] w-16 mb-6" style={{ backgroundColor: '#e8a36b' }} />
              <h2 className="text-[clamp(2rem,4.5vw,4rem)] font-black leading-[1.05] tracking-tight mb-8">
                Air-gap por QR Code,{' '}
                <span style={{ color: '#e8a36b', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>com microSD de reserva.</span>
              </h2>
              <div className="space-y-6 text-lg leading-[1.7] font-light" style={{ color: 'rgba(244,237,228,0.85)' }}>
                <p>
                  A filosofia central do Passport é simples de descrever e difícil de imitar bem: nenhuma chave privada deve ter caminho elétrico direto até um computador conectado à internet. O coordenador, seja o aplicativo Envoy ou uma alternativa como Sparrow, gera a transação não assinada e a transforma em uma sequência de QR Codes exibida na tela.
                </p>
                <p>
                  A câmera do Passport lê esses códigos, você confere o endereço de destino e o valor diretamente na tela do dispositivo, assina localmente, e o próprio Passport devolve o resultado como um novo QR Code para o coordenador transmitir a transação já assinada. Nenhum malware instalado no seu celular ou computador consegue extrair a chave privada por esse caminho, porque o caminho elétrico simplesmente não existe.
                </p>
                <p>
                  Para cenários em que a leitura de QR Code não é prática, o Passport também aceita cartão microSD como via alternativa de transporte de dados, mantendo a mesma garantia de isolamento sem depender de um único método.
                </p>
              </div>
            </motion.div>
            <motion.div {...fade(0.15)}>
              <img
                src={setupImg}
                alt="Hardware wallet Bitcoin escura exibindo QR Code na tela para transferência de transação assinada offline sem cabo"
                width={1024}
                height={768}
                className="rounded-2xl w-full object-cover"
                loading="lazy"
                decoding="async"
              />
            </motion.div>
          </div>
        </section>

        {/* CAPÍTULO 3 — Teclado físico, secure element e cadeia de suprimentos */}
        <section className="relative px-6 md:px-12 lg:px-20 py-24 md:py-36">
          <div className="max-w-[1600px] mx-auto">
            <motion.div {...fade(0)} className="mb-14 max-w-3xl">
              <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#c97a3d' }}>Capítulo 03</span>
              <div className="h-[2px] w-16 mb-6" style={{ backgroundColor: '#c97a3d' }} />
              <h2 className="text-[clamp(2.25rem,5.5vw,5rem)] font-black leading-[1] tracking-tight" style={{ color: '#0e3b3a' }}>
                Hardware feito para{' '}
                <span style={{ color: '#c97a3d', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>ser auditado, não só usado.</span>
              </h2>
            </motion.div>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { icon: KeyRound, titulo: 'Teclado numérico físico', texto: 'PIN digitado em botões físicos dedicados, não em tela sensível ao toque replicável por câmera escondida ou tela compartilhada com outro aparelho.' },
                { icon: Fingerprint, titulo: 'Secure element dedicado', texto: 'Chip de segurança separado guarda a seed e resiste a tentativas de extração física mesmo com o dispositivo em posse de terceiros.' },
                { icon: Truck, titulo: 'Montagem nos Estados Unidos', texto: 'A Foundation Devices declara montagem final e testes de qualidade em solo americano, um diferencial de rastreabilidade frente a fabricação totalmente terceirizada.' },
              ].map((c) => (
                <motion.div key={c.titulo} {...fade(0.05)} className="p-8 rounded-2xl" style={{ backgroundColor: '#ece2d3' }}>
                  <c.icon size={28} style={{ color: '#c97a3d' }} className="mb-5" />
                  <h3 className="text-xl font-black mb-3" style={{ color: '#0e3b3a' }}>{c.titulo}</h3>
                  <p className="text-base leading-relaxed font-light" style={{ color: '#2d3a37' }}>{c.texto}</p>
                </motion.div>
              ))}
            </div>
            <motion.div {...fade(0.15)} className="mt-10 p-8 md:p-10 rounded-2xl" style={{ backgroundColor: '#0e3b3a', color: '#f4ede4' }}>
              <p className="text-lg md:text-xl leading-relaxed font-light" style={{ color: 'rgba(244,237,228,0.9)' }}>
                O firmware do Passport é de código aberto e publicado para revisão pública. Antes de instalar qualquer atualização, o dispositivo verifica a assinatura criptográfica do arquivo, recusando firmware não assinado corretamente pela Foundation Devices. Isso não elimina todo risco de supply chain, mas amplia o número de olhos capazes de encontrar falhas antes que virem problema em produção.
              </p>
            </motion.div>
          </div>
        </section>

        {/* CAPÍTULO 4 — Envoy e compatibilidade externa */}
        <section className="relative py-24 md:py-32 px-6 md:px-12 lg:px-20" style={{ backgroundColor: '#ece2d3' }}>
          <div className="max-w-[1600px] mx-auto grid lg:grid-cols-2 gap-14 items-center">
            <motion.div {...fade(0)}>
              <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#c97a3d' }}>Capítulo 04</span>
              <div className="h-[2px] w-16 mb-6" style={{ backgroundColor: '#c97a3d' }} />
              <h2 className="text-[clamp(2rem,4.5vw,4rem)] font-black leading-[1.05] tracking-tight mb-8" style={{ color: '#0e3b3a' }}>
                Envoy no dia a dia,{' '}
                <span style={{ color: '#c97a3d', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>Sparrow e Nunchuk quando o cofre cresce.</span>
              </h2>
              <div className="space-y-6 text-lg leading-[1.7] font-light" style={{ color: '#2d3a37' }}>
                <p>
                  O Envoy é o aplicativo próprio da Foundation, pensado para acompanhar saldo, taxas de rede e organizar múltiplas carteiras a partir do celular, sempre com a assinatura final acontecendo fisicamente no Passport. Para uso cotidiano com uma única chave, é uma experiência bem mais amigável do que a média da categoria.
                </p>
                <p>
                  A diferença real aparece quando o usuário decide montar um arranjo multisig ou simplesmente prefere outro coordenador. Como o Passport segue o padrão PSBT, ele funciona também com Sparrow Wallet, Nunchuk e BlueWallet, permitindo compor um cofre de duas de três chaves combinando o Passport com Coldcard, Trezor ou Jade, sem depender de nenhum fabricante isoladamente.
                </p>
              </div>
            </motion.div>
            <motion.div {...fade(0.15)} className="space-y-4">
              {[
                { icon: Smartphone, texto: 'Envoy como coordenador nativo para saldo, histórico e organização de múltiplas carteiras.' },
                { icon: QrCode, texto: 'Sparrow e Nunchuk como coordenadores externos para multisig entre marcas diferentes.' },
                { icon: ShieldCheck, texto: 'BlueWallet como opção leve para quem já usa o app no dia a dia com outras chaves.' },
              ].map((c, i) => (
                <div key={i} className="p-6 rounded-2xl flex gap-5 items-start" style={{ backgroundColor: '#fff' }}>
                  <c.icon size={24} className="shrink-0 mt-1" style={{ color: '#c97a3d' }} />
                  <p className="text-base md:text-lg leading-relaxed font-light" style={{ color: '#2d3a37' }}>{c.texto}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* CAPÍTULO 4.5 — Somente Bitcoin e tabela comparativa rápida */}
        <section className="relative px-6 md:px-12 lg:px-20 py-24 md:py-36">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 max-w-[1600px] mx-auto">
            <motion.aside {...fade(0)} className="lg:col-span-4">
              <div className="sticky top-24">
                <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#c97a3d' }}>Capítulo extra</span>
                <div className="h-[2px] w-16 mb-6" style={{ backgroundColor: '#c97a3d' }} />
                <p className="text-sm uppercase tracking-[0.2em] font-semibold" style={{ color: '#5a6664' }}>Somente Bitcoin, de propósito</p>
              </div>
            </motion.aside>
            <motion.div {...fade(0.1)} className="lg:col-span-8">
              <h2 className="text-[clamp(2rem,5vw,4.5rem)] font-black leading-[1.05] tracking-tight mb-10" style={{ color: '#0e3b3a' }}>
                Nenhum suporte a outras moedas.{' '}
                <span style={{ color: '#c97a3d', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>É decisão, não limitação.</span>
              </h2>
              <div className="space-y-7 text-lg md:text-xl leading-[1.7] font-light mb-12" style={{ color: '#2d3a37' }}>
                <p>
                  O firmware do Passport não reconhece nem processa transações de outras redes além de Bitcoin. Isso reduz drasticamente a superfície de ataque do dispositivo, porque cada moeda adicional suportada por uma hardware wallet multi-ativo é código extra rodando dentro de um ambiente que deveria ser o mais enxuto possível.
                </p>
                <p>
                  Para quem já decidiu que patrimônio de longo prazo em cripto significa Bitcoin e nada além disso, essa limitação intencional é, na prática, uma vantagem de segurança. Para quem ainda especula com dezenas de tokens diferentes, o Passport simplesmente não é a ferramenta certa, e problema nenhum nisso: existe carteira de software e hardware multi-moeda para esse outro perfil de uso.
                </p>
              </div>
              <div className="overflow-x-auto rounded-2xl" style={{ backgroundColor: '#ece2d3' }}>
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr style={{ borderBottom: '2px solid #0e3b3a' }}>
                      <th className="p-5 text-sm font-black uppercase tracking-wider" style={{ color: '#0e3b3a' }}>Critério</th>
                      <th className="p-5 text-sm font-black uppercase tracking-wider" style={{ color: '#0e3b3a' }}>Foundation Passport</th>
                      <th className="p-5 text-sm font-black uppercase tracking-wider" style={{ color: '#0e3b3a' }}>Coldcard</th>
                      <th className="p-5 text-sm font-black uppercase tracking-wider" style={{ color: '#0e3b3a' }}>Trezor</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ['Air-gap principal', 'QR Code + microSD', 'microSD (QR Code no Q)', 'Não é air-gap por padrão'],
                      ['Teclado físico', 'Sim, numérico completo', 'Sim, nos modelos mais recentes', 'Não, tela sensível ao toque'],
                      ['Só Bitcoin', 'Sim', 'Sim', 'Não, multi-moeda'],
                      ['Fabricação declarada', 'Estados Unidos', 'Diversos, terceirizada', 'República Tcheca'],
                      ['Perfil de usuário', 'Intermediário a avançado', 'Avançado', 'Iniciante a intermediário'],
                    ].map((row, i) => (
                      <tr key={i} style={{ borderBottom: i < 4 ? '1px solid rgba(14,59,58,0.12)' : 'none' }}>
                        {row.map((cell, j) => (
                          <td key={j} className="p-5 text-base font-light" style={{ color: j === 0 ? '#0e3b3a' : '#2d3a37', fontWeight: j === 0 ? 700 : 300 }}>{cell}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-6 text-sm font-light" style={{ color: '#5a6664' }}>
                Tabela com posicionamento geral de mercado. Especificações técnicas variam por versão de firmware e por modelo específico de cada fabricante, sempre confira a documentação oficial atualizada antes de decidir.
              </p>
            </motion.div>
          </div>
        </section>

        {/* CAPÍTULO 5 — Prós e contras */}
        <section className="relative py-24 md:py-32 px-6 md:px-12 lg:px-20" style={{ backgroundColor: '#0e3b3a', color: '#f4ede4' }}>
          <div className="max-w-[1600px] mx-auto">
            <motion.div {...fade(0)} className="mb-14 max-w-3xl">
              <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#e8a36b' }}>Capítulo 05</span>
              <div className="h-[2px] w-16 mb-6" style={{ backgroundColor: '#e8a36b' }} />
              <h2 className="text-[clamp(2.25rem,5.5vw,5rem)] font-black leading-[1] tracking-tight">
                Prós e contras{' '}
                <span style={{ color: '#e8a36b', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>sem meio-termo.</span>
              </h2>
            </motion.div>
            <div className="grid md:grid-cols-2 gap-10">
              <motion.div {...fade(0.05)}>
                <h3 className="text-lg font-black uppercase tracking-wider mb-6" style={{ color: '#e8a36b' }}>Pontos fortes</h3>
                <div className="space-y-4">
                  {PROS.map((p, i) => (
                    <div key={i} className="flex gap-3">
                      <CheckCircle2 size={20} className="shrink-0 mt-1" style={{ color: '#e8a36b' }} />
                      <p className="text-base leading-relaxed font-light" style={{ color: 'rgba(244,237,228,0.85)' }}>{p}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
              <motion.div {...fade(0.1)}>
                <h3 className="text-lg font-black uppercase tracking-wider mb-6" style={{ color: '#e0a98a' }}>Pontos fracos</h3>
                <div className="space-y-4">
                  {CONTRAS.map((p, i) => (
                    <div key={i} className="flex gap-3">
                      <XCircle size={20} className="shrink-0 mt-1" style={{ color: '#e0a98a' }} />
                      <p className="text-base leading-relaxed font-light" style={{ color: 'rgba(244,237,228,0.85)' }}>{p}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CAPÍTULO 5.5 — Preço, envio e impostos no Brasil */}
        <section className="relative py-24 md:py-32 px-6 md:px-12 lg:px-20" style={{ backgroundColor: '#ece2d3' }}>
          <div className="max-w-[1600px] mx-auto grid lg:grid-cols-2 gap-14 items-center">
            <motion.div {...fade(0)}>
              <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#c97a3d' }}>Capítulo extra</span>
              <div className="h-[2px] w-16 mb-6" style={{ backgroundColor: '#c97a3d' }} />
              <h2 className="text-[clamp(2rem,4.5vw,4rem)] font-black leading-[1.05] tracking-tight mb-8" style={{ color: '#0e3b3a' }}>
                O preço no site é só{' '}
                <span style={{ color: '#c97a3d', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>metade da conta real.</span>
              </h2>
              <div className="space-y-6 text-lg leading-[1.7] font-light" style={{ color: '#2d3a37' }}>
                <p>
                  O valor anunciado em dólar no site da Foundation Devices não inclui frete internacional nem os tributos que a Receita Federal pode aplicar na chegada do pacote ao Brasil. Dependendo da modalidade de envio, do valor declarado e da sorte na fiscalização alfandegária, o custo final pode ficar bem acima do que aparece na conversão simples de moeda.
                </p>
                <p>
                  Isso não é peculiaridade do Passport, é regra para praticamente qualquer hardware wallet importada diretamente dos Estados Unidos ou da Europa. A diferença é que, por já ser um produto posicionado como premium, o Passport sofre mais no cálculo final do que concorrentes com preço de tabela mais baixo. Antes de comprar, vale simular o custo com frete e impostos, não só o preço de vitrine.
                </p>
                <p>
                  Prazos de envio também variam bastante, e retenção alfandegária de dias ou semanas não é cenário incomum. Quem precisa da hardware wallet com urgência deve considerar essa variável antes de fechar a compra.
                </p>
              </div>
            </motion.div>
            <motion.div {...fade(0.15)} className="space-y-4">
              {[
                'Frete internacional cobrado à parte, com prazo que varia conforme a transportadora e a época do ano.',
                'Imposto de importação e ICMS podem incidir sobre o valor declarado, elevando o custo final de forma relevante.',
                'Retenção alfandegária é um risco real, não uma exceção rara, especialmente em períodos de maior volume de encomendas internacionais.',
                'Revendedores locais, quando existem, podem cobrar ágio, mas eliminam a incerteza do desembaraço aduaneiro.',
              ].map((t, i) => (
                <div key={i} className="p-6 rounded-2xl flex gap-4" style={{ backgroundColor: '#fff' }}>
                  <AlertTriangle size={20} className="shrink-0 mt-1" style={{ color: '#b45836' }} />
                  <p className="text-base leading-relaxed font-light" style={{ color: '#2d3a37' }}>{t}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* CAPÍTULO 6 — Para quem não serve */}
        <section className="relative px-6 md:px-12 lg:px-20 py-24 md:py-36">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 max-w-[1600px] mx-auto">
            <motion.aside {...fade(0)} className="lg:col-span-4">
              <div className="sticky top-24">
                <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#c97a3d' }}>Capítulo 06</span>
                <div className="h-[2px] w-16 mb-6" style={{ backgroundColor: '#c97a3d' }} />
                <p className="text-sm uppercase tracking-[0.2em] font-semibold" style={{ color: '#5a6664' }}>Honestidade antes da venda</p>
              </div>
            </motion.aside>
            <motion.div {...fade(0.1)} className="lg:col-span-8">
              <h2 className="text-[clamp(2rem,5vw,4.5rem)] font-black leading-[1.05] tracking-tight mb-10" style={{ color: '#0e3b3a' }}>
                Para quem o Passport{' '}
                <span style={{ color: '#c97a3d', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>não serve.</span>
              </h2>
              <div className="space-y-5">
                {NAO_SERVE.map((n, i) => (
                  <div key={i} className="flex gap-4 p-6 rounded-2xl" style={{ backgroundColor: '#ece2d3' }}>
                    <AlertTriangle size={22} className="shrink-0 mt-1" style={{ color: '#b45836' }} />
                    <p className="text-base md:text-lg leading-relaxed font-light" style={{ color: '#2d3a37' }}>{n}</p>
                  </div>
                ))}
              </div>
              <div className="mt-10 p-8 rounded-2xl" style={{ backgroundColor: '#0e3b3a', color: '#f4ede4' }}>
                <p className="text-lg leading-relaxed font-light" style={{ color: 'rgba(244,237,228,0.9)' }}>
                  Comparado à Coldcard, o Passport entrega uma experiência de leitura de QR Code mais fluida e um discurso de cadeia de suprimentos mais transparente, mas perde em maturidade de comunidade e em recursos de dissuasão física como duress PIN. Comparado à Trezor, o Passport é mais paranoico e mais caro, sem a facilidade de onboarding que a Trezor entrega para iniciantes. Comparado à Jade, que aposta em custo baixo e código aberto com fabricação em outra escala, o Passport se posiciona um degrau acima em preço e em controle declarado de origem dos componentes.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* CAPÍTULO 7 — Passo a passo */}
        <section className="relative py-24 md:py-32 px-6 md:px-12 lg:px-20" style={{ backgroundColor: '#ece2d3' }}>
          <div className="max-w-[1600px] mx-auto grid lg:grid-cols-2 gap-14 items-start">
            <motion.div {...fade(0)}>
              <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#c97a3d' }}>Capítulo 07</span>
              <div className="h-[2px] w-16 mb-6" style={{ backgroundColor: '#c97a3d' }} />
              <h2 className="text-[clamp(2rem,4.5vw,4rem)] font-black leading-[1.05] tracking-tight mb-8" style={{ color: '#0e3b3a' }}>
                Primeiro uso,{' '}
                <span style={{ color: '#c97a3d', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>passo a passo.</span>
              </h2>
              <img
                src={seedImg}
                alt="Seed phrase de Bitcoin anotada em papel ao lado de placa de backup em aço, etapa crítica da configuração do Foundation Passport"
                width={1024}
                height={1024}
                className="rounded-2xl w-full object-cover"
                loading="lazy"
                decoding="async"
              />
            </motion.div>
            <div className="space-y-4">
              {PASSOS.map((p, i) => (
                <motion.div key={p.n} {...fade(i * 0.04)} className="p-6 rounded-2xl flex gap-5" style={{ backgroundColor: '#fff' }}>
                  <span className="text-3xl font-black shrink-0" style={{ color: '#c97a3d', fontFamily: "'Playfair Display', serif" }}>{p.n}</span>
                  <div>
                    <h3 className="text-lg font-black mb-2" style={{ color: '#0e3b3a' }}>{p.titulo}</h3>
                    <p className="text-base leading-relaxed font-light" style={{ color: '#2d3a37' }}>{p.texto}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CAPÍTULO 8 — FAQ */}
        <section className="relative px-6 md:px-12 lg:px-20 py-24 md:py-36">
          <div className="max-w-[1100px] mx-auto">
            <motion.div {...fade(0)} className="mb-14">
              <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#c97a3d' }}>Capítulo 08</span>
              <div className="h-[2px] w-16 mb-6" style={{ backgroundColor: '#c97a3d' }} />
              <h2 className="text-[clamp(2rem,5vw,4.5rem)] font-black leading-[1.05] tracking-tight" style={{ color: '#0e3b3a' }}>
                Perguntas frequentes{' '}
                <span style={{ color: '#c97a3d', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>sobre o Passport.</span>
              </h2>
            </motion.div>
            <div className="space-y-3">
              {FAQ.map((f, i) => {
                const open = openFaq === i;
                return (
                  <motion.div key={i} {...fade(i * 0.03)} className="rounded-2xl overflow-hidden" style={{ backgroundColor: '#ece2d3', boxShadow: open ? '0 8px 24px rgba(14,59,58,0.1)' : '0 1px 3px rgba(14,59,58,0.05)' }}>
                    <button onClick={() => setOpenFaq(open ? null : i)} className="w-full flex items-center justify-between gap-6 p-6 md:p-8 text-left">
                      <span className="text-lg md:text-xl font-bold leading-snug" style={{ color: '#0e3b3a' }}>{f.q}</span>
                      <ChevronDown size={22} className="shrink-0 transition-transform duration-500" style={{ color: '#c97a3d', transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }} />
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

        {/* CAPÍTULO 9 — Continue sua trilha */}
        <section className="relative py-24 md:py-32 px-6 md:px-12 lg:px-20" style={{ backgroundColor: '#0e3b3a', color: '#f4ede4' }}>
          <div className="max-w-[1400px] mx-auto">
            <motion.div {...fade(0)} className="mb-12 max-w-2xl">
              <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#e8a36b' }}>Continue sua trilha</span>
              <h2 className="text-[clamp(2rem,4.5vw,4rem)] font-black leading-[1] tracking-tight">
                Antes de comprar,{' '}
                <span style={{ color: '#e8a36b', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>compare as outras opções.</span>
              </h2>
            </motion.div>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { to: '/comparativos/melhores-hardware-wallets', titulo: 'Comparativo completo de hardware wallets', texto: 'Passport, Coldcard, Trezor e Jade lado a lado, critério por critério.' },
                { to: '/comparativos/coldcard-review', titulo: 'Review completa: Coldcard', texto: 'Air-gap via microSD, duress PIN, brick me e o que ela faz melhor que o Passport.' },
                { to: '/comparativos/trezor-review', titulo: 'Review completa: Trezor', texto: 'Safe 3, Safe 5, o vazamento de 2017 e para quem ela serve.' },
                { to: '/autocustodia/jade-core-review', titulo: 'Review completa: Jade Core', texto: 'Código aberto e custo baixo como alternativa mais acessível ao Passport.' },
                { to: '/multisig-bitcoin', titulo: 'Multisig Bitcoin', texto: 'Como combinar Passport com outras marcas num arranjo 2 de 3.' },
                { to: '/dicionario-cripto', titulo: 'Glossario de soberania', texto: 'Do UTXO ao domicilio fiscal: todos os termos tecnicos deste site explicados em uma pagina.' },
              ].map((c) => (
                <Link key={c.to} to={c.to} className="group p-8 rounded-2xl transition-all hover:-translate-y-1" style={{ backgroundColor: 'rgba(244,237,228,0.06)', border: '1px solid rgba(232,163,107,0.18)' }}>
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
