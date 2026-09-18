import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ShieldCheck, Lock, KeyRound, Cable, ChevronDown, ArrowRight,
  CheckCircle2, XCircle, AlertTriangle, Eye, Scale, Cpu, DollarSign, Boxes,
} from 'lucide-react';
import SeoHead from '@/components/SeoHead';
import BackToHome from '@/components/BackToHome';
import heroImg from '@/assets/trezor/trezor-hero.jpg';
import setupImg from '@/assets/infra-hardware-wallet.jpg';
import seedImg from '@/assets/trezor/trezor-seguranca.jpg';

const APPLE_EASE = [0.22, 1, 0.36, 1] as const;
const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.8, ease: APPLE_EASE, delay },
});

type Modelo = {
  nome: string;
  ano: string;
  secureElement: boolean;
  resumo: string;
};

const MODELOS: Modelo[] = [
  {
    nome: 'Trezor One',
    ano: '2014',
    secureElement: false,
    resumo:
      'O primeiro hardware wallet comercial do mundo. Histórico e simbolismo à parte, é o modelo mais vulnerável da linha hoje: sem elemento seguro dedicado, chave privada guardada em microcontrolador de propósito geral, vulnerável a ataques físicos de extração com equipamento de laboratório.',
  },
  {
    nome: 'Trezor Model T',
    ano: '2018',
    secureElement: false,
    resumo:
      'Trouxe tela touchscreen colorida e entrada de PIN e passphrase diretamente no dispositivo, mas manteve a mesma arquitetura sem elemento seguro dedicado do Model One. Continua vulnerável ao mesmo tipo de ataque físico de extração de chave, hoje documentado publicamente por laboratórios de segurança.',
  },
  {
    nome: 'Trezor Safe 3',
    ano: '2023',
    secureElement: true,
    resumo:
      'Primeira linha da marca a incorporar um secure element certificado (EAL6+), reduzindo drasticamente a superfície de ataque físico presente nos modelos anteriores. Preço mais acessível, corpo plástico, tela pequena monocromática.',
  },
  {
    nome: 'Trezor Safe 5',
    ano: '2024',
    secureElement: true,
    resumo:
      'Topo de linha atual, com secure element, tela colorida maior, corpo revestido e bateria opcional para conexão sem fio via NFC em alguns fluxos. Mantém o código aberto como diferencial frente à concorrente Ledger.',
  },
];

const PROS = [
  'Firmware e bootloader inteiramente open source, auditável por qualquer pessoa com conhecimento técnico, sem caixa preta.',
  'Suporte nativo e maduro a passphrase (13ª ou 25ª palavra), criando carteiras ocultas a partir da mesma seed.',
  'Suporte robusto a PSBT e a arranjos multisig, inclusive combinando com outras marcas como Coldcard e Jade.',
  'Secure element certificado nos modelos Safe 3 e Safe 5, corrigindo a principal fraqueza histórica da marca.',
  'Trezor Suite funciona também via navegador e é relativamente simples de usar no dia a dia, mesmo para quem não é técnico.',
  'Marca com mais de dez anos de mercado, ampla documentação, comunidade grande e compatibilidade testada com praticamente toda carteira coordenadora relevante.',
  'Preço de entrada mais baixo que concorrentes focados só em Bitcoin, facilitando o primeiro passo para quem está começando.',
  'Compatibilidade extensa com carteiras de terceiros como Sparrow, Electrum e BlueWallet, dando liberdade para trocar de coordenador sem perder o hardware.',
  'Verificação de autenticidade integrada ao Trezor Suite, reduzindo o risco de usar um clone sem perceber.',
  'Atualizações de firmware frequentes e bem documentadas, com changelog público auditável por qualquer pessoa.',
];

const CONTRAS = [
  'Model One e Model T seguem à venda sem elemento seguro dedicado, com vulnerabilidade física de extração de chave já demonstrada publicamente por pesquisadores.',
  'Vazamento de dados de clientes em 2017, incluindo e-mails e endereços físicos de quem comprou pela loja oficial, usado depois em campanhas de phishing direcionado.',
  'Suporte a múltiplas criptomoedas amplia a superfície de firmware e não interessa a quem quer um dispositivo dedicado só a Bitcoin.',
  'Sem air-gap nativo: a comunicação padrão depende de cabo USB conectado a computador, ainda que a assinatura em si aconteça dentro do chip seguro.',
  'Tela dos modelos Safe 3 ainda é pequena e monocromática, dificultando conferência cuidadosa de endereços longos.',
  'Reputação da marca carrega o peso do vazamento de 2017 mesmo anos depois, o que pesa psicologicamente para quem pesquisa antes de comprar.',
  'Curva de confiança mais difícil de reconstruir para quem pesquisou o histórico da marca antes de decidir comprar.',
  'Bateria e conectividade sem fio do Safe 5 aumentam levemente a superfície de ataque em comparação com um dispositivo totalmente cabeado.',
];

const NAO_SERVE = [
  'Quem exige air-gap absoluto sem exceção e não aceita nenhuma comunicação via cabo USB com computador online.',
  'Quem quer comprar Model One ou Model T hoje pensando em guardar valores altos por décadas, dado o histórico de vulnerabilidade física desses modelos.',
  'Quem já sofreu ou teme especificamente phishing e teria seus dados cadastrais expostos de novo, ainda que o risco seja de engenharia social e não de chave comprometida.',
  'Quem só usa Bitcoin e não quer pagar por firmware que também suporta dezenas de outras moedas.',
];

const PASSOS = [
  { n: '01', titulo: 'Compre só do canal oficial', texto: 'Compre diretamente do site da Trezor ou de revendedor oficial listado por ela. Nunca compre unidade usada, de marketplace genérico ou com lacre visivelmente rompido.' },
  { n: '02', titulo: 'Confira o selo de autenticidade', texto: 'Os modelos Safe 3 e Safe 5 trazem selo holográfico e verificação criptográfica de autenticidade dentro do próprio Trezor Suite. Rode essa checagem antes de qualquer outra coisa.' },
  { n: '03', titulo: 'Instale o Trezor Suite oficial', texto: 'Baixe o aplicativo apenas pelo site oficial trezor.io, nunca por link recebido em rede social, anúncio pago ou e-mail. É o vetor mais comum de phishing contra donos de Trezor.' },
  { n: '04', titulo: 'Gere a seed dentro do dispositivo', texto: 'A seed de 12, 18 ou 24 palavras é gerada internamente pelo próprio hardware, nunca aceite uma seed pronta enviada por terceiros ou já impressa de fábrica.' },
  { n: '05', titulo: 'Anote em papel e depois migre para aço', texto: 'O papel é só o rascunho inicial. Para resistência real a fogo, água e tempo, transfira as palavras para uma placa de backup em aço inoxidável assim que possível.' },
  { n: '06', titulo: 'Configure PIN forte e ative a passphrase', texto: 'Defina um PIN que não seja sequência óbvia e configure uma passphrase adicional para criar uma carteira oculta, guardando a frase em local totalmente separado da seed.' },
  { n: '07', titulo: 'Teste a recuperação com valor pequeno', texto: 'Simule a restauração da seed em outro dispositivo compatível com BIP39 antes de mover qualquer valor relevante para o endereço gerado pela Trezor.' },
  { n: '08', titulo: 'Nunca digite a seed em nenhum site ou app', texto: 'A Trezor jamais pede a seed completa fora da tela do próprio dispositivo. Qualquer site, e-mail ou suporte pedindo suas 24 palavras é phishing, sem exceção.' },
];

const FAQ = [
  { q: 'A Trezor é segura mesmo depois do vazamento de dados de 2017?', a: 'O incidente de 2017 expôs dados de contato de clientes que se cadastraram na loja oficial, como e-mails e endereços de entrega, não chaves privadas nem seeds. Não houve comprometimento criptográfico do dispositivo. Ainda assim, esses dados foram usados depois em campanhas de phishing direcionado, então quem comprou uma Trezor naquele período deve redobrar o ceticismo com e-mails e mensagens não solicitadas sobre o produto.' },
  { q: 'Model One e Model T ainda são seguros para guardar Bitcoin?', a: 'Existe vulnerabilidade física documentada publicamente nesses dois modelos, que não possuem elemento seguro dedicado. Um atacante com acesso físico prolongado ao dispositivo e equipamento de laboratório consegue, em cenários específicos, extrair a chave privada. Para valores baixos e ameaça de roubo remoto o risco é irrelevante, mas para patrimônio relevante o recomendado é migrar para Safe 3 ou Safe 5.' },
  { q: 'Qual a diferença real entre Safe 3 e Safe 5?', a: 'Ambos têm secure element certificado e firmware open source. O Safe 5 traz tela colorida maior, corpo com acabamento diferente e suporte a conexão sem fio via NFC em alguns fluxos, além de bateria interna. O Safe 3 é mais simples, mais barato e igualmente seguro na parte criptográfica essencial.' },
  { q: 'A Trezor tem air-gap como a Coldcard?', a: 'Não nativamente. A comunicação padrão da Trezor com o computador acontece via cabo USB, mesmo que a chave privada nunca saia do chip seguro durante esse processo. Quem exige air-gap absoluto sem qualquer conexão física deve considerar Coldcard, Jade Core ou Foundation Passport.' },
  { q: 'Dá para usar Trezor em arranjo multisig com outras marcas?', a: 'Sim. A Trezor segue o padrão PSBT e é amplamente testada em combinação com Coldcard, Jade e outras carteiras compatíveis, formando arranjos como 2 de 3 entre marcas diferentes através de coordenadores como Sparrow Wallet.' },
  { q: 'O que é a passphrase da Trezor e por que devo usar?', a: 'É uma palavra ou frase adicional que, somada à sua seed de 12 a 24 palavras, gera uma carteira completamente diferente e oculta. Quem só tem acesso à seed escrita não acessa essa carteira sem saber a passphrase. É a defesa mais eficaz contra roubo físico do backup em papel ou aço.' },
  { q: 'Vale a pena comprar Trezor usada para economizar?', a: 'Não. Supply chain comprometida é o risco mais caro de detectar depois do fato, especialmente em dispositivo que guarda chave privada. Compre sempre novo, direto do canal oficial, com selo de autenticidade intacto.' },
  { q: 'Trezor Suite funciona no Brasil sem restrição?', a: 'Sim, o aplicativo funciona normalmente no Brasil, tanto na versão desktop quanto via navegador. A cobrança em BRL na compra do dispositivo costuma incluir IOF de importação, frete e variação cambial, elevando o preço final bem acima do valor anunciado em dólar.' },
];

function Selo({ ok }: { ok: boolean }) {
  return ok ? <CheckCircle2 size={20} style={{ color: '#0e3b3a' }} /> : <XCircle size={20} style={{ color: '#b45836' }} />;
}

function Hero() {
  return (
    <section className="relative w-full" style={{ height: '92vh', minHeight: 720 }}>
      <img
        src={heroImg}
        alt="Hardware wallets Bitcoin escuras em macro fotografia sobre superfície de madeira, representando a linha Trezor Safe 3 e Safe 5"
        width={1920}
        height={1080}
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
          Trezor, a review{' '}
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
          Código aberto desde o primeiro dia, secure element chegando tarde, um vazamento de dados que virou aula de phishing e a pergunta que ninguém responde direito: vale a pena hoje?
        </motion.p>
      </motion.div>
    </section>
  );
}

export default function TrezorReview() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <>
      <SeoHead
        path="/comparativos/trezor-review"
        custom={{
          title: 'Trezor Review 2026: Safe 3, Safe 5, Vulnerabilidade e o Vazamento de 2017',
          description: 'Review completa e honesta da Trezor: Safe 3, Safe 5, Model T e One, secure element, vulnerabilidade física legada, vazamento de dados, passphrase, multisig, prós e contras.',
          canonical: 'https://lordjunnior.com.br/comparativos/trezor-review',
          primaryKeyword: 'trezor review',
          lsiKeywords: ['trezor safe 3', 'trezor safe 5', 'trezor model t', 'vazamento de dados trezor', 'secure element trezor', 'trezor suite', 'passphrase trezor'],
          longTailKeywords: ['vale a pena comprar trezor em 2026', 'trezor é segura mesmo', 'trezor model one tem vulnerabilidade', 'como configurar trezor pela primeira vez'],
          breadcrumbs: [
            { name: 'Início', url: '/' },
            { name: 'Comparativos', url: '/comparativos' },
            { name: 'Trezor Review', url: '/comparativos/trezor-review' },
          ],
          schemaType: 'Article',
          articleSection: 'Comparativos',
          relatedPages: ['/comparativos/melhores-hardware-wallets', '/comparativos/coldcard-review', '/autocustodia/seed-phrase-em-aco', '/multisig-bitcoin'],
        }}
        faqItems={FAQ.map((f) => ({ question: f.q, answer: f.a }))}
      />

      <div className="relative min-h-screen" style={{ backgroundColor: '#f4ede4', color: '#1c2624', fontFamily: "'Inter Tight', sans-serif" }}>
        <div className="absolute top-0 left-0 right-0 z-30 px-6 md:px-12 lg:px-20 pt-[52px]">
          <BackToHome />
        </div>

        <Hero />

        {/* CAPÍTULO 1 — O que é a Trezor */}
        <section className="relative px-6 md:px-12 lg:px-20 py-24 md:py-36">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 max-w-[1600px] mx-auto">
            <motion.aside {...fade(0)} className="lg:col-span-4">
              <div className="sticky top-24">
                <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#c97a3d' }}>Capítulo 01</span>
                <div className="h-[2px] w-16 mb-6" style={{ backgroundColor: '#c97a3d' }} />
                <p className="text-sm uppercase tracking-[0.2em] font-semibold" style={{ color: '#5a6664' }}>A pioneira do mercado</p>
              </div>
            </motion.aside>
            <motion.div {...fade(0.1)} className="lg:col-span-8">
              <h2 className="text-[clamp(2.25rem,5.5vw,5rem)] font-black leading-[1] tracking-tight mb-10" style={{ color: '#0e3b3a' }}>
                A primeira hardware wallet{' '}
                <span style={{ color: '#c97a3d', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>
                  do mundo, ainda em disputa.
                </span>
              </h2>
              <div className="space-y-7 text-lg md:text-xl leading-[1.7] font-light" style={{ color: '#2d3a37' }}>
                <p>
                  A Trezor foi lançada pela empresa checa SatoshiLabs em 2014 e é, até hoje, reconhecida como a primeira hardware wallet comercial de Bitcoin do mundo. Mais de dez anos depois, a marca segue relevante, mas carrega tanto o peso da experiência acumulada quanto o peso de decisões de arquitetura que só foram corrigidas anos mais tarde.
                </p>
                <p>
                  A linha atual é dividida entre modelos legados, Model One e Model T, e modelos atuais, Safe 3 e Safe 5, que finalmente incorporaram um elemento seguro certificado. Essa divisão importa mais do que qualquer detalhe de design, porque muda de forma concreta o nível de proteção contra ataque físico.
                </p>
                <p>
                  Diferente da Coldcard, a Trezor não é um produto pensado exclusivamente para Bitcoin. O firmware suporta dezenas de outras moedas, o que amplia o público-alvo, mas também amplia a superfície de código a ser mantida e auditada, um ponto que puristas bitcoiner costumam usar contra a marca.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* CAPÍTULO 2 — Os modelos */}
        <section className="relative py-24 md:py-32 px-6 md:px-12 lg:px-20" style={{ backgroundColor: '#0e3b3a', color: '#f4ede4' }}>
          <div className="max-w-[1600px] mx-auto">
            <motion.div {...fade(0)} className="mb-14 max-w-3xl">
              <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#e8a36b' }}>Capítulo 02</span>
              <div className="h-[2px] w-16 mb-6" style={{ backgroundColor: '#e8a36b' }} />
              <h2 className="text-[clamp(2rem,4.5vw,4rem)] font-black leading-[1.05] tracking-tight">
                Quatro modelos,{' '}
                <span style={{ color: '#e8a36b', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>duas gerações de segurança.</span>
              </h2>
            </motion.div>
            <div className="grid md:grid-cols-2 gap-6">
              {MODELOS.map((m) => (
                <motion.div key={m.nome} {...fade(0.05)} className="p-8 rounded-2xl" style={{ backgroundColor: 'rgba(244,237,228,0.06)', border: '1px solid rgba(232,163,107,0.18)' }}>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-black" style={{ color: '#f4ede4' }}>{m.nome}</h3>
                    <span className="text-xs font-bold tracking-wider uppercase" style={{ color: '#e8a36b' }}>{m.ano}</span>
                  </div>
                  <div className="flex items-center gap-2 mb-4">
                    <Selo ok={m.secureElement} />
                    <span className="text-sm font-semibold" style={{ color: 'rgba(244,237,228,0.75)' }}>
                      {m.secureElement ? 'Possui secure element certificado' : 'Sem secure element dedicado'}
                    </span>
                  </div>
                  <p className="text-base leading-relaxed font-light" style={{ color: 'rgba(244,237,228,0.85)' }}>{m.resumo}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CAPÍTULO 3 — Vulnerabilidade física legada */}
        <section className="relative px-6 md:px-12 lg:px-20 py-24 md:py-36">
          <div className="max-w-[1600px] mx-auto grid lg:grid-cols-2 gap-14 items-center">
            <motion.div {...fade(0)}>
              <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#c97a3d' }}>Capítulo 03</span>
              <div className="h-[2px] w-16 mb-6" style={{ backgroundColor: '#c97a3d' }} />
              <h2 className="text-[clamp(2rem,4.5vw,4rem)] font-black leading-[1.05] tracking-tight mb-8" style={{ color: '#0e3b3a' }}>
                A vulnerabilidade física{' '}
                <span style={{ color: '#c97a3d', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>que a marca demorou a resolver.</span>
              </h2>
              <div className="space-y-6 text-lg leading-[1.7] font-light" style={{ color: '#2d3a37' }}>
                <p>
                  Model One e Model T guardam a chave privada em um microcontrolador de propósito geral, sem elemento seguro dedicado. Pesquisadores de segurança já demonstraram publicamente, com equipamento de laboratório e acesso físico prolongado ao dispositivo, que é possível extrair informações sensíveis desse chip em cenários específicos de ataque.
                </p>
                <p>
                  Isso não significa que qualquer pessoa consegue roubar uma Trezor legada com um alicate. O ataque exige acesso físico ao dispositivo, tempo, equipamento especializado e, em muitos casos, glitching de tensão elétrica sincronizado com precisão. Ainda assim, é uma classe de ataque que o elemento seguro certificado dos modelos Safe 3 e Safe 5 elimina quase por completo.
                </p>
                <p>
                  Para quem guarda valores relevantes e mantém o dispositivo fisicamente vulnerável, seja por viagem, mudança ou risco de apreensão, migrar de Model One ou Model T para a linha Safe deixou de ser luxo e passou a ser recomendação de segurança direta.
                </p>
              </div>
            </motion.div>
            <motion.div {...fade(0.15)}>
              <img
                src={setupImg}
                alt="Hardware wallet Bitcoin escura conectada por cabo em ambiente de baixa luz, ilustrando o ponto de conexão físico usado em ataques de extração de chave"
                width={1024}
                height={768}
                className="rounded-2xl w-full object-cover"
                loading="lazy"
                decoding="async"
              />
            </motion.div>
          </div>
        </section>

        {/* CAPÍTULO 4 — O vazamento de dados e phishing */}
        <section className="relative py-24 md:py-32 px-6 md:px-12 lg:px-20" style={{ backgroundColor: '#ece2d3' }}>
          <div className="max-w-[1600px] mx-auto">
            <motion.div {...fade(0)} className="mb-14 max-w-3xl">
              <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#c97a3d' }}>Capítulo 04</span>
              <div className="h-[2px] w-16 mb-6" style={{ backgroundColor: '#c97a3d' }} />
              <h2 className="text-[clamp(2.25rem,5.5vw,5rem)] font-black leading-[1] tracking-tight" style={{ color: '#0e3b3a' }}>
                O vazamento que virou{' '}
                <span style={{ color: '#c97a3d', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>fábrica de phishing.</span>
              </h2>
            </motion.div>
            <div className="grid md:grid-cols-2 gap-10">
              <motion.div {...fade(0.05)} className="p-8 rounded-2xl" style={{ backgroundColor: '#fff' }}>
                <AlertTriangle size={28} style={{ color: '#b45836' }} className="mb-5" />
                <h3 className="text-xl font-black mb-3" style={{ color: '#0e3b3a' }}>O que vazou de fato</h3>
                <p className="text-base leading-relaxed font-light" style={{ color: '#2d3a37' }}>
                  Em 2017, um provedor terceirizado usado pela loja oficial da Trezor sofreu uma violação que expôs dados de contato de clientes: e-mails, nomes e endereços de entrega de quem havia comprado o dispositivo. Nenhuma chave privada, seed ou saldo de carteira foi comprometido nesse incidente. A engenharia de assinatura do hardware em si nunca foi afetada.
                </p>
              </motion.div>
              <motion.div {...fade(0.1)} className="p-8 rounded-2xl" style={{ backgroundColor: '#fff' }}>
                <Eye size={28} style={{ color: '#b45836' }} className="mb-5" />
                <h3 className="text-xl font-black mb-3" style={{ color: '#0e3b3a' }}>O risco real que ficou</h3>
                <p className="text-base leading-relaxed font-light" style={{ color: '#2d3a37' }}>
                  O problema não foi a chave privada, foi a lista de nomes e e-mails confirmadamente donos de Bitcoin em hardware wallet. Esses dados alimentaram, nos anos seguintes, campanhas de phishing direcionado, com e-mails falsos simulando comunicados oficiais da Trezor pedindo para o usuário digitar sua seed em um site clonado. Quem caiu nesse golpe perdeu fundos, não por falha do hardware, mas por engenharia social.
                </p>
              </motion.div>
            </div>
            <motion.div {...fade(0.15)} className="mt-8 p-8 rounded-2xl" style={{ backgroundColor: '#0e3b3a' }}>
              <p className="text-lg md:text-xl leading-relaxed font-light" style={{ color: '#f4ede4' }}>
                A lição prática desse episódio vale para qualquer marca, não só para a Trezor: a Trezor nunca pede sua seed completa fora da tela do próprio dispositivo, nunca por e-mail, nunca por formulário web, nunca por telefone. Qualquer comunicação pedindo isso é fraude, independente de parecer oficial.
              </p>
            </motion.div>
          </div>
        </section>

        {/* CAPÍTULO 5 — Passphrase, hidden wallets e multisig */}
        <section className="relative px-6 md:px-12 lg:px-20 py-24 md:py-36">
          <div className="max-w-[1600px] mx-auto">
            <motion.div {...fade(0)} className="mb-14 max-w-3xl">
              <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#c97a3d' }}>Capítulo 05</span>
              <div className="h-[2px] w-16 mb-6" style={{ backgroundColor: '#c97a3d' }} />
              <h2 className="text-[clamp(2.25rem,5.5vw,5rem)] font-black leading-[1] tracking-tight" style={{ color: '#0e3b3a' }}>
                Passphrase, carteiras ocultas{' '}
                <span style={{ color: '#c97a3d', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>e multisig.</span>
              </h2>
            </motion.div>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { icon: KeyRound, titulo: 'Passphrase (13ª/25ª palavra)', texto: 'A Trezor permite adicionar uma frase extra digitada diretamente no dispositivo, nunca no computador, gerando uma carteira totalmente distinta a partir da mesma seed. Quem só rouba o backup escrito não acessa essa carteira sem saber a passphrase.' },
                { icon: Lock, titulo: 'Hidden wallets múltiplas', texto: 'É possível criar diversas carteiras ocultas diferentes a partir da mesma seed, usando passphrases distintas para cada uma. Útil para separar reservas de valores diferentes ou criar uma carteira de negação plausível com saldo baixo.' },
                { icon: Boxes, titulo: 'Multisig com outras marcas', texto: 'A Trezor segue o padrão PSBT e é testada há anos em arranjos multisig combinando com Coldcard, Jade e outras carteiras via Sparrow Wallet, permitindo diversificar fabricante em vez de depender de um único ponto de falha.' },
              ].map((c) => (
                <motion.div key={c.titulo} {...fade(0.05)} className="p-8 rounded-2xl" style={{ backgroundColor: '#ece2d3' }}>
                  <c.icon size={28} style={{ color: '#c97a3d' }} className="mb-5" />
                  <h3 className="text-xl font-black mb-3" style={{ color: '#0e3b3a' }}>{c.titulo}</h3>
                  <p className="text-base leading-relaxed font-light" style={{ color: '#2d3a37' }}>{c.texto}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CAPÍTULO 6 — Trezor Suite, código aberto e preço */}
        <section className="relative py-24 md:py-32 px-6 md:px-12 lg:px-20" style={{ backgroundColor: '#0e3b3a', color: '#f4ede4' }}>
          <div className="max-w-[1600px] mx-auto grid lg:grid-cols-2 gap-14 items-center">
            <motion.div {...fade(0)}>
              <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#e8a36b' }}>Capítulo 06</span>
              <div className="h-[2px] w-16 mb-6" style={{ backgroundColor: '#e8a36b' }} />
              <h2 className="text-[clamp(2rem,4.5vw,4rem)] font-black leading-[1.05] tracking-tight mb-8">
                Trezor Suite, código aberto{' '}
                <span style={{ color: '#e8a36b', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>e preço em reais.</span>
              </h2>
              <div className="space-y-6 text-lg leading-[1.7] font-light" style={{ color: 'rgba(244,237,228,0.85)' }}>
                <p>
                  O Trezor Suite é o aplicativo oficial, disponível em versão desktop e via navegador, usado para enviar, receber, verificar saldo e configurar o dispositivo. É um dos softwares coordenadores mais polidos do mercado, com interface bem mais amigável ao iniciante do que a Coldcard exige.
                </p>
                <p>
                  Tanto o firmware quanto o Trezor Suite têm código-fonte público, auditável por qualquer desenvolvedor. Esse compromisso com código aberto é mantido desde o lançamento em 2014 e segue sendo o principal argumento da marca contra a concorrente Ledger, que usa firmware fechado em parte do seu processo de segurança.
                </p>
                <p>
                  Em preço, o Safe 3 costuma sair entre R$ 550 e R$ 800 no Brasil, considerando frete e conversão cambial, enquanto o Safe 5 fica entre R$ 1.100 e R$ 1.500. Os modelos legados, Model One e Model T, ainda são vendidos por valor parecido ou até superior em alguns canais, o que reforça a recomendação de priorizar a linha Safe na hora da compra.
                </p>
              </div>
            </motion.div>
            <motion.div {...fade(0.15)}>
              <img
                src={seedImg}
                alt="Seed phrase de Bitcoin anotada em papel ao lado de placa de backup em aço, etapa crítica da configuração de qualquer Trezor"
                width={1024}
                height={1024}
                className="rounded-2xl w-full object-cover"
                loading="lazy"
                decoding="async"
              />
            </motion.div>
          </div>
        </section>


        {/* CAPÍTULO 6B — Trezor vs concorrentes diretos */}
        <section className="relative px-6 md:px-12 lg:px-20 py-24 md:py-36">
          <div className="max-w-[1600px] mx-auto">
            <motion.div {...fade(0)} className="mb-14 max-w-3xl">
              <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#c97a3d' }}>Capítulo 06.1</span>
              <div className="h-[2px] w-16 mb-6" style={{ backgroundColor: '#c97a3d' }} />
              <h2 className="text-[clamp(2.25rem,5.5vw,5rem)] font-black leading-[1] tracking-tight" style={{ color: '#0e3b3a' }}>
                Trezor frente a{' '}
                <span style={{ color: '#c97a3d', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>Ledger e Coldcard.</span>
              </h2>
            </motion.div>
            <div className="grid md:grid-cols-3 gap-6">
              <motion.div {...fade(0.05)} className="p-8 rounded-2xl" style={{ backgroundColor: '#ece2d3' }}>
                <Cpu size={28} style={{ color: '#c97a3d' }} className="mb-5" />
                <h3 className="text-xl font-black mb-3" style={{ color: '#0e3b3a' }}>Frente à Ledger</h3>
                <p className="text-base leading-relaxed font-light" style={{ color: '#2d3a37' }}>
                  A Ledger usa firmware parcialmente fechado no elemento seguro, alegando que isso protege a certificação do chip. A Trezor mantém tudo aberto, inclusive nos modelos Safe com secure element, entregando menos opacidade em troca de uma superfície tecnicamente maior para revisão pública.
                </p>
              </motion.div>
              <motion.div {...fade(0.1)} className="p-8 rounded-2xl" style={{ backgroundColor: '#ece2d3' }}>
                <ShieldCheck size={28} style={{ color: '#c97a3d' }} className="mb-5" />
                <h3 className="text-xl font-black mb-3" style={{ color: '#0e3b3a' }}>Frente à Coldcard</h3>
                <p className="text-base leading-relaxed font-light" style={{ color: '#2d3a37' }}>
                  A Coldcard prioriza air-gap absoluto e é só-Bitcoin, com curva de aprendizado mais dura. A Trezor prioriza usabilidade e suporte multi-moeda, aceitando cabo USB como meio padrão de comunicação em troca de uma experiência de uso mais simples no dia a dia.
                </p>
              </motion.div>
              <motion.div {...fade(0.15)} className="p-8 rounded-2xl" style={{ backgroundColor: '#ece2d3' }}>
                <DollarSign size={28} style={{ color: '#c97a3d' }} className="mb-5" />
                <h3 className="text-xl font-black mb-3" style={{ color: '#0e3b3a' }}>No custo-benefício</h3>
                <p className="text-base leading-relaxed font-light" style={{ color: '#2d3a37' }}>
                  Para quem está começando com capital modesto, o Safe 3 costuma custar menos que uma Coldcard e menos que muitas Ledgers, entregando secure element certificado e código aberto por um preço de entrada competitivo no mercado brasileiro.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CAPÍTULO 7 — Prós e contras */}
        <section className="relative px-6 md:px-12 lg:px-20 py-24 md:py-36">
          <div className="max-w-[1600px] mx-auto">
            <motion.div {...fade(0)} className="mb-14 max-w-3xl">
              <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#c97a3d' }}>Capítulo 07</span>
              <div className="h-[2px] w-16 mb-6" style={{ backgroundColor: '#c97a3d' }} />
              <h2 className="text-[clamp(2.25rem,5.5vw,5rem)] font-black leading-[1] tracking-tight" style={{ color: '#0e3b3a' }}>
                Prós e contras{' '}
                <span style={{ color: '#c97a3d', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>sem meio-termo.</span>
              </h2>
            </motion.div>
            <div className="grid md:grid-cols-2 gap-10">
              <motion.div {...fade(0.05)} className="p-8 rounded-2xl" style={{ backgroundColor: '#0e3b3a' }}>
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
              <motion.div {...fade(0.1)} className="p-8 rounded-2xl" style={{ backgroundColor: '#0e3b3a' }}>
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

        {/* CAPÍTULO 8 — Para quem serve e para quem não serve */}
        <section className="relative py-24 md:py-32 px-6 md:px-12 lg:px-20" style={{ backgroundColor: '#ece2d3' }}>
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 max-w-[1600px] mx-auto">
            <motion.aside {...fade(0)} className="lg:col-span-4">
              <div className="sticky top-24">
                <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#c97a3d' }}>Capítulo 08</span>
                <div className="h-[2px] w-16 mb-6" style={{ backgroundColor: '#c97a3d' }} />
                <p className="text-sm uppercase tracking-[0.2em] font-semibold" style={{ color: '#5a6664' }}>Honestidade antes da venda</p>
              </div>
            </motion.aside>
            <motion.div {...fade(0.1)} className="lg:col-span-8">
              <h2 className="text-[clamp(2rem,5vw,4.5rem)] font-black leading-[1.05] tracking-tight mb-10" style={{ color: '#0e3b3a' }}>
                Para quem a Trezor{' '}
                <span style={{ color: '#c97a3d', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>serve, e para quem não serve.</span>
              </h2>
              <div className="mb-10 p-6 rounded-2xl" style={{ backgroundColor: '#fff' }}>
                <h3 className="text-lg font-black mb-3" style={{ color: '#0e3b3a' }}>Serve bem para</h3>
                <p className="text-base md:text-lg leading-relaxed font-light" style={{ color: '#2d3a37' }}>
                  Quem está começando na autocustódia e quer um dispositivo com interface amigável, documentação abundante e código aberto verificável. Quem já entende o valor de passphrase e multisig, mas não precisa de air-gap absoluto no dia a dia. Quem valoriza um modelo Safe 3 ou Safe 5 com secure element certificado como equilíbrio entre segurança forte e usabilidade real.
                </p>
              </div>
              <div className="space-y-5">
                {NAO_SERVE.map((n, i) => (
                  <div key={i} className="flex gap-4 p-6 rounded-2xl" style={{ backgroundColor: '#fff' }}>
                    <AlertTriangle size={22} className="shrink-0 mt-1" style={{ color: '#b45836' }} />
                    <p className="text-base md:text-lg leading-relaxed font-light" style={{ color: '#2d3a37' }}>{n}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* CAPÍTULO 9 — Passo a passo */}
        <section className="relative py-24 md:py-32 px-6 md:px-12 lg:px-20" style={{ backgroundColor: '#0e3b3a', color: '#f4ede4' }}>
          <div className="max-w-[1600px] mx-auto">
            <motion.div {...fade(0)} className="mb-14 max-w-3xl">
              <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#e8a36b' }}>Capítulo 09</span>
              <div className="h-[2px] w-16 mb-6" style={{ backgroundColor: '#e8a36b' }} />
              <h2 className="text-[clamp(2.25rem,5.5vw,5rem)] font-black leading-[1] tracking-tight">
                Primeiro uso,{' '}
                <span style={{ color: '#e8a36b', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>passo a passo.</span>
              </h2>
            </motion.div>
            <div className="grid md:grid-cols-2 gap-4">
              {PASSOS.map((p, i) => (
                <motion.div key={p.n} {...fade(i * 0.04)} className="p-6 rounded-2xl flex gap-5" style={{ backgroundColor: 'rgba(244,237,228,0.06)', border: '1px solid rgba(232,163,107,0.18)' }}>
                  <span className="text-3xl font-black shrink-0" style={{ color: '#e8a36b', fontFamily: "'Playfair Display', serif" }}>{p.n}</span>
                  <div>
                    <h3 className="text-lg font-black mb-2" style={{ color: '#f4ede4' }}>{p.titulo}</h3>
                    <p className="text-base leading-relaxed font-light" style={{ color: 'rgba(244,237,228,0.85)' }}>{p.texto}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CAPÍTULO 10 — FAQ */}
        <section className="relative px-6 md:px-12 lg:px-20 py-24 md:py-36">
          <div className="max-w-[1100px] mx-auto">
            <motion.div {...fade(0)} className="mb-14">
              <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#c97a3d' }}>Capítulo 10</span>
              <div className="h-[2px] w-16 mb-6" style={{ backgroundColor: '#c97a3d' }} />
              <h2 className="text-[clamp(2rem,5vw,4.5rem)] font-black leading-[1.05] tracking-tight" style={{ color: '#0e3b3a' }}>
                Perguntas frequentes{' '}
                <span style={{ color: '#c97a3d', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>sobre a Trezor.</span>
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

        {/* CAPÍTULO 11 — Continue sua trilha */}
        <section className="relative py-24 md:py-32 px-6 md:px-12 lg:px-20" style={{ backgroundColor: '#0e3b3a', color: '#f4ede4' }}>
          <div className="max-w-[1400px] mx-auto">
            <motion.div {...fade(0)} className="mb-12 max-w-2xl">
              <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#e8a36b' }}>Continue sua trilha</span>
              <h2 className="text-[clamp(2rem,4.5vw,4rem)] font-black leading-[1] tracking-tight">
                Antes de comprar,{' '}
                <span style={{ color: '#e8a36b', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>compare as outras opções.</span>
              </h2>
            </motion.div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { to: '/comparativos/melhores-hardware-wallets', titulo: 'Comparativo completo de hardware wallets', texto: 'Coldcard, Trezor, Jade, Krux e Foundation lado a lado, critério por critério.' },
                { to: '/comparativos/coldcard-review', titulo: 'Review completa: Coldcard', texto: 'Air-gap total, duress PIN, brick me e para quem ela definitivamente não serve.' },
                { to: '/autocustodia/seed-phrase-em-aco', titulo: 'Seed phrase em aço', texto: 'Por que papel não basta e como blindar seu backup contra fogo e água.' },
                { to: '/multisig-bitcoin', titulo: 'Multisig Bitcoin', texto: 'Como combinar uma Trezor com outras marcas num arranjo 2 de 3.' },
                { to: '/dicionario-cripto', titulo: 'Glossario de soberania', texto: 'Do UTXO ao domicilio fiscal: todos os termos tecnicos deste site explicados em uma pagina.' },
              ].map((c) => (
                <Link key={c.to} to={c.to} className="group p-8 rounded-2xl transition-all hover:-translate-y-1" style={{ backgroundColor: 'rgba(244,237,228,0.06)', border: '1px solid rgba(232,163,107,0.18)' }}>
                  <h3 className="text-lg md:text-xl font-black leading-tight mb-3" style={{ color: '#f4ede4' }}>{c.titulo}</h3>
                  <p className="text-sm leading-relaxed font-light mb-5" style={{ color: 'rgba(244,237,228,0.75)' }}>{c.texto}</p>
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
