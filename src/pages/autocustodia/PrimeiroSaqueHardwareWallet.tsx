import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ShieldCheck, Package, ScanLine, Hammer, ChevronDown, ArrowRight,
  AlertTriangle, Fingerprint, Eye, Lock,
} from 'lucide-react';
import SeoHead from '@/components/SeoHead';
import BackToHome from '@/components/BackToHome';
import heroImg from '@/assets/migracao/opsec-hero.webp';
import entregaImg from '@/assets/migracao/opsec-entrega.webp';
import telaImg from '@/assets/migracao/opsec-tela.webp';
import metalImg from '@/assets/migracao/opsec-metal.webp';

/**
 * /autocustodia/primeiro-saque-hardware-wallet
 * Página de OpSec do Hub de Migração Soberana.
 */

const APPLE_EASE = [0.22, 1, 0.36, 1] as const;
const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.8, ease: APPLE_EASE, delay },
});

const SUPPLY_CHAIN = [
  {
    titulo: 'Compre sempre direto do fabricante',
    icon: Package,
    texto:
      'Dispositivo vendido em marketplace genérico, por revendedor não autorizado ou usado é a porta de entrada clássica do ataque de cadeia de suprimento. O agressor gera a seed antes, embala de novo e espera você depositar. O desconto nunca compensa.',
  },
  {
    titulo: 'Não use endereço de entrega que exponha patrimônio',
    icon: Eye,
    texto:
      'Um pacote identificado com o nome do fabricante entregue na sua casa sinaliza, para quem estiver observando, que ali dentro existe Bitcoin. Prefira ponto de retirada, endereço comercial ou embalagem neutra quando o fabricante oferecer essa opção.',
  },
  {
    titulo: 'Inspecione o lacre antes de abrir, e fotografe',
    icon: ScanLine,
    texto:
      'Lacre rasgado e recolado, cola irregular, caixa com sinais de reabertura ou número de série que não bate com o site do fabricante são motivos suficientes para não usar o aparelho. Registre a inspeção antes de romper qualquer selo.',
  },
  {
    titulo: 'Nunca aceite uma seed que já veio pronta',
    icon: AlertTriangle,
    texto:
      'Se a embalagem contém um cartão com palavras já escritas, ou o dispositivo pede para você "confirmar" uma seed existente na primeira inicialização, você está diante de uma fraude. A seed legítima é gerada por você, no aparelho, na primeira vez que ele liga.',
  },
];

const CONFIGURACAO = [
  {
    n: '01',
    titulo: 'Ligue o dispositivo isolado e atualize o firmware pelo canal oficial',
    texto:
      'Use o aplicativo oficial do fabricante, baixado do site oficial digitado à mão no navegador. Nunca por link de e-mail, anúncio patrocinado ou resultado de busca pago. Quando o fabricante disponibilizar verificação de assinatura, confira antes de instalar.',
  },
  {
    n: '02',
    titulo: 'Gere a seed no próprio aparelho e anote à mão',
    texto:
      'A geração acontece offline, dentro do dispositivo. Anote as palavras em papel, à mão, em ambiente sem câmera, sem celular apontado para a mesa e sem ninguém por perto. Confira a ortografia palavra por palavra antes de prosseguir.',
  },
  {
    n: '03',
    titulo: 'Defina PIN forte e considere uma passphrase',
    texto:
      'PIN curto derruba boa parte da proteção física. Use o maior comprimento que o dispositivo permitir e que você consiga memorizar sem anotar junto da seed. A passphrase é opcional, poderosa e implacável: esquecê-la equivale a perder o saldo.',
  },
  {
    n: '04',
    titulo: 'Faça o teste de restauração antes de receber qualquer valor',
    texto:
      'Apague o dispositivo, restaure com as palavras anotadas e confirme que o primeiro endereço gerado é idêntico ao anterior. Esse é o único jeito de saber que o seu backup funciona. Fazer isso depois de depositar é apostar com o patrimônio na mesa.',
  },
  {
    n: '05',
    titulo: 'Gere o endereço e confirme na tela do dispositivo',
    texto:
      'O aplicativo do computador pode estar comprometido; a telinha do dispositivo, isolada, não. Compare os primeiros e os últimos caracteres do endereço nas duas telas antes de colar no campo de saque da corretora.',
  },
  {
    n: '06',
    titulo: 'Envie o saque de teste e confirme na rede',
    texto:
      'Valor simbólico, aguarde a confirmação, verifique em um explorador de blocos e confirme o saldo dentro da sua carteira. Só depois disso migre o lote principal, preferencialmente dividido.',
  },
  {
    n: '07',
    titulo: 'Grave o backup definitivo em metal e separe os locais',
    texto:
      'Transfira as palavras para uma placa de aço, confira letra por letra, e guarde a placa em local diferente do dispositivo. Papel é temporário; depois da gravação em metal, destrua o rascunho por completo.',
  },
];

const REGRAS_OURO = [
  'A seed nasce no dispositivo, nunca no computador, nunca no celular, nunca em site gerador de palavras.',
  'O endereço válido é o que aparece na tela do dispositivo, não o que aparece no navegador.',
  'Nenhuma atualização, suporte ou verificação legítima pede as suas palavras. Nenhuma. Nunca.',
  'Backup em metal, em local diferente do aparelho, e testado com uma restauração real ao menos uma vez.',
  'PIN e passphrase nunca ficam guardados junto do backup da seed. Separar é o ponto inteiro.',
  'Quem sabe que você tem Bitcoin é uma variável de risco. Reduza esse número ao mínimo indispensável.',
  'Deixe instruções de acesso para quem precisaria recuperar o patrimônio se algo acontecer com você.',
];

const FAQ = [
  {
    q: 'Onde comprar hardware wallet com segurança?',
    a: 'Direto no site oficial do fabricante ou em revendedor listado oficialmente por ele. Evite marketplaces genéricos, dispositivos usados e ofertas com desconto agressivo. O ataque de cadeia de suprimento, em que alguém abre a caixa antes de você e prepara uma seed conhecida, é real e barato de executar.',
  },
  {
    q: 'Como saber se a hardware wallet foi adulterada?',
    a: 'Confira o lacre e a embalagem antes de abrir, verifique o número de série no site do fabricante quando disponível, e observe a primeira inicialização: o dispositivo legítimo gera uma seed nova na sua frente. Se ele apresentar palavras prontas ou pedir para você inserir uma seed que veio na caixa, descarte o aparelho.',
  },
  {
    q: 'Preciso conferir o endereço na tela do dispositivo mesmo copiando e colando?',
    a: 'Sim, e esse é o passo que mais evita prejuízo. Existe malware barato que troca o endereço no momento em que você cola. O dispositivo é isolado do computador e mostra o endereço real de destino: conferir os primeiros e últimos caracteres nas duas telas leva cinco segundos.',
  },
  {
    q: 'Devo usar passphrase logo no começo?',
    a: 'Só depois de dominar o básico. A passphrase cria uma carteira completamente separada e protege contra quem encontrar o backup físico, mas esquecê-la torna o saldo inacessível para sempre. Comece sem, aprenda a restaurar, e só então avalie adicionar essa camada.',
  },
  {
    q: 'Qual valor devo enviar no saque de teste?',
    a: 'Um valor que você aceitaria perder sem alterar seu mês. O objetivo não é economizar taxa, é validar todo o caminho: endereço correto, carteira restaurável, rede certa, recebimento confirmado. Depois disso, o lote principal segue com segurança.',
  },
  {
    q: 'Posso guardar a seed em um cofre de banco?',
    a: 'Pode, e para muita gente é uma boa opção contra incêndio e roubo doméstico. Considere que o acesso depende de horário comercial, do próprio banco e de eventual bloqueio judicial. Muitos usuários combinam: uma via em cofre bancário, outra em local pessoal seguro e distinto.',
  },
];

function Hero() {
  return (
    <section className="relative w-full" style={{ height: '90vh', minHeight: 700 }}>
      <img
        src={heroImg}
        alt="Mãos com luvas inspecionando uma embalagem lacrada sob luminária de bancada, representando a verificação de origem da hardware wallet"
        width={1600}
        height={1000}
        className="absolute inset-0 w-full h-full object-cover"
        loading="eager"
        fetchPriority="high"
        decoding="async"
      />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(14,59,58,0.5) 0%, rgba(14,59,58,0.3) 40%, rgba(14,59,58,0.93) 100%)' }} />
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, ease: APPLE_EASE }}
        className="relative z-10 h-full flex flex-col justify-end px-6 md:px-12 lg:px-20 pb-20 md:pb-28 max-w-[1600px] mx-auto"
      >
        <span
          className="w-fit px-4 py-1.5 rounded-full text-xs font-bold tracking-[0.3em] uppercase backdrop-blur-md mb-8"
          style={{ backgroundColor: 'rgba(244,237,228,0.15)', color: '#f4ede4', border: '1px solid rgba(244,237,228,0.3)' }}
        >
          <ShieldCheck size={11} className="inline mr-2" /> Blindagem digital
        </span>

        <motion.h1
          initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1, delay: 0.15, ease: APPLE_EASE }}
          className="text-[clamp(2.75rem,8.5vw,7.5rem)] font-black leading-[0.95] tracking-tight max-w-[20ch]"
          style={{ fontFamily: "'Inter Tight', sans-serif", color: '#f4ede4' }}
        >
          Configurar a hardware wallet e receber o primeiro saque{' '}
          <span
            style={{
              color: '#d98a4a',
              fontStyle: 'italic',
              fontWeight: 400,
              fontFamily: "'Playfair Display', serif",
              textShadow: '0 0 40px rgba(217,138,74,0.45), 0 0 80px rgba(217,138,74,0.25)',
            }}
          >
            sem um único erro.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: APPLE_EASE }}
          className="mt-8 max-w-3xl text-lg md:text-2xl leading-relaxed font-light"
          style={{ color: 'rgba(244,237,228,0.85)', fontFamily: "'Inter Tight', sans-serif" }}
        >
          Da compra do dispositivo à gravação do backup em metal: segurança de cadeia de suprimento, geração offline da seed, verificação do endereço na tela do aparelho e o saque de teste que valida tudo antes do valor de verdade.
        </motion.p>
      </motion.div>
    </section>
  );
}

export default function PrimeiroSaqueHardwareWallet() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <>
      <SeoHead
        path="/autocustodia/primeiro-saque-hardware-wallet"
        custom={{
          title: 'Como Configurar Hardware Wallet e Receber o Primeiro Saque',
          description:
            'Passo a passo de OpSec para configurar a hardware wallet: compra segura, lacre, geração offline da seed, PIN, teste de restauração, verificação do endereço e backup em metal.',
          canonical: 'https://lordjunnior.com.br/autocustodia/primeiro-saque-hardware-wallet',
          primaryKeyword: 'como configurar hardware wallet',
          lsiKeywords: [
            'primeiro saque hardware wallet',
            'opsec bitcoin',
            'ataque de cadeia de suprimento',
            'backup seed em aço',
            'verificar endereço bitcoin',
            'pin e passphrase',
          ],
          longTailKeywords: [
            'como configurar hardware wallet passo a passo',
            'onde comprar hardware wallet com segurança',
            'como saber se a hardware wallet foi adulterada',
            'como receber bitcoin na carteira fria',
          ],
          breadcrumbs: [
            { name: 'Início', url: '/' },
            { name: 'Autocustódia', url: '/autocustodia' },
            { name: 'Primeiro saque na hardware wallet', url: '/autocustodia/primeiro-saque-hardware-wallet' },
          ],
          schemaType: 'Article',
          articleSection: 'Autocustódia',
          relatedPages: [
            '/autocustodia/guia-migracao-corretora',
            '/autocustodia/hot-wallet-vs-cold-wallet',
            '/autocustodia/erros-fatais-saque-corretora',
            '/autocustodia/verificar-firmware-origem',
          ],
        }}
        faqItems={FAQ.map((f) => ({ question: f.q, answer: f.a }))}
      />

      <div className="relative min-h-screen" style={{ backgroundColor: '#f4ede4', color: '#1c2624', fontFamily: "'Inter Tight', sans-serif" }}>
        <div className="absolute top-0 left-0 right-0 z-30 px-6 md:px-12 lg:px-20 pt-[52px]">
          <BackToHome />
        </div>

        <Hero />

        {/* 01 — Cadeia de suprimento */}
        <section className="relative px-6 md:px-12 lg:px-20 py-24 md:py-36">
          <div className="max-w-[1600px] mx-auto">
            <motion.div {...fade(0)} className="mb-14 max-w-3xl">
              <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#d98a4a' }}>
                Capítulo 01 · Antes de ligar o aparelho
              </span>
              <h2 className="text-[clamp(2.25rem,5vw,4.5rem)] font-black leading-[1.05] tracking-tight" style={{ color: '#0e3b3a' }}>
                O ataque começa na entrega,{' '}
                <span style={{ color: '#d98a4a', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>
                  não no computador.
                </span>
              </h2>
              <p className="mt-8 text-lg md:text-xl leading-[1.75] font-light" style={{ color: '#2d3a37' }}>
                A maior parte do material sobre segurança fala de vírus e de senhas. O ataque mais eficiente contra um iniciante é bem mais simples: alguém entrega um dispositivo cuja seed já é conhecida, espera o depósito e leva tudo. Nenhuma linha de código é necessária.
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
              <motion.div {...fade(0.05)} className="lg:col-span-7 grid gap-6">
                {SUPPLY_CHAIN.map((c) => (
                  <div key={c.titulo} className="p-7 rounded-2xl" style={{ backgroundColor: '#ece2d3' }}>
                    <c.icon size={26} style={{ color: '#d98a4a' }} className="mb-4" />
                    <h3 className="text-xl font-bold mb-3" style={{ color: '#0e3b3a' }}>{c.titulo}</h3>
                    <p className="text-base leading-relaxed font-light" style={{ color: '#2d3a37' }}>{c.texto}</p>
                  </div>
                ))}
              </motion.div>
              <motion.div {...fade(0.15)} className="lg:col-span-5">
                <div className="relative h-[420px] md:h-[620px] overflow-hidden rounded-3xl sticky top-24">
                  <img
                    src={entregaImg}
                    alt="Pacote de papelão sem identificação deixado em uma soleira ao anoitecer, ilustrando o risco de exposição na entrega"
                    loading="lazy"
                    width={1600}
                    height={1000}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* 02 — Configuração passo a passo */}
        <section className="relative px-6 md:px-12 lg:px-20 py-24 md:py-36" style={{ backgroundColor: '#ece2d3' }}>
          <div className="max-w-[1600px] mx-auto">
            <motion.div {...fade(0)} className="mb-14 max-w-3xl">
              <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#d98a4a' }}>
                Capítulo 02 · Execução
              </span>
              <h2 className="text-[clamp(2.25rem,5vw,4.5rem)] font-black leading-[1.05] tracking-tight" style={{ color: '#0e3b3a' }}>
                Sete etapas de configuração, na ordem.
              </h2>
            </motion.div>

            <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
              <motion.div {...fade(0.05)} className="lg:col-span-7 space-y-4">
                {CONFIGURACAO.map((p) => (
                  <div key={p.n} className="flex items-start gap-5 p-6 rounded-2xl" style={{ backgroundColor: '#f4ede4', border: '1px solid rgba(14,59,58,0.08)' }}>
                    <span className="shrink-0 w-11 h-11 rounded-full flex items-center justify-center text-sm font-black" style={{ backgroundColor: '#0e3b3a', color: '#ffb37a' }}>
                      {p.n}
                    </span>
                    <div>
                      <h3 className="text-lg md:text-xl font-bold mb-2 leading-snug" style={{ color: '#0e3b3a' }}>{p.titulo}</h3>
                      <p className="text-base leading-relaxed font-light" style={{ color: '#2d3a37' }}>{p.texto}</p>
                    </div>
                  </div>
                ))}
              </motion.div>
              <motion.div {...fade(0.15)} className="lg:col-span-5">
                <div className="relative h-[420px] md:h-[640px] overflow-hidden rounded-3xl sticky top-24">
                  <img
                    src={telaImg}
                    alt="Tela minúscula de dispositivo de assinatura iluminada no escuro, sendo comparada com o monitor desfocado ao fundo"
                    loading="lazy"
                    width={1600}
                    height={1000}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* 03 — A tela do dispositivo */}
        <section className="relative px-6 md:px-12 lg:px-20 py-24 md:py-36" style={{ backgroundColor: '#0e3b3a' }}>
          <div className="max-w-[1400px] mx-auto">
            <motion.div {...fade(0)} className="max-w-4xl">
              <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#ffb37a' }}>
                Capítulo 03 · A regra que mais salva
              </span>
              <h2 className="text-[clamp(2rem,5vw,4.25rem)] font-black leading-[1.05] tracking-tight mb-8" style={{ color: '#f4ede4' }}>
                A tela do computador mente. A tela do dispositivo, não.
              </h2>
              <div className="space-y-6 text-lg md:text-xl leading-[1.75] font-light" style={{ color: 'rgba(244,237,228,0.82)' }}>
                <p>
                  Existe uma família inteira de malware cujo único trabalho é vigiar a área de transferência e substituir endereços de Bitcoin por endereços do atacante no instante em que você cola. O texto muda em silêncio, com formato parecido, e o olho passa batido.
                </p>
                <p>
                  A hardware wallet foi desenhada exatamente para isso: ela é um computador separado, sem sistema operacional de propósito geral, cuja tela não pode ser manipulada pelo software da sua máquina. Quando você confere o endereço de recebimento ali, você está lendo a verdade.
                </p>
                <p className="font-medium" style={{ color: '#ffb37a' }}>
                  Cinco segundos de conferência nas duas telas eliminam o golpe mais comum contra quem está fazendo o primeiro saque.
                </p>
              </div>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6 mt-14">
              {[
                { icon: Fingerprint, t: 'Confira início e fim', d: 'Compare os primeiros e os últimos caracteres do endereço nas duas telas. Endereços forjados costumam imitar apenas o começo.' },
                { icon: Lock, t: 'Assine olhando o dispositivo', d: 'Ao enviar, confirme valor e destino na tela do aparelho antes de aprovar. É a última chance de perceber uma substituição.' },
              ].map((c) => (
                <motion.div key={c.t} {...fade(0.05)} className="p-8 rounded-2xl" style={{ backgroundColor: 'rgba(244,237,228,0.06)', border: '1px solid rgba(255,179,122,0.18)' }}>
                  <c.icon size={26} style={{ color: '#ffb37a' }} className="mb-4" />
                  <h3 className="text-xl font-black mb-3" style={{ color: '#f4ede4' }}>{c.t}</h3>
                  <p className="text-base leading-relaxed font-light" style={{ color: 'rgba(244,237,228,0.78)' }}>{c.d}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 04 — Backup em metal */}
        <section className="relative px-6 md:px-12 lg:px-20 py-24 md:py-36">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 max-w-[1600px] mx-auto items-center">
            <motion.div {...fade(0)} className="lg:col-span-6">
              <div className="relative h-[400px] md:h-[540px] overflow-hidden rounded-3xl">
                <img
                  src={metalImg}
                  alt="Placa de aço inoxidável sendo gravada com punção e martelo em uma bancada, representando o backup físico da seed phrase"
                  loading="lazy"
                  width={1600}
                  height={1000}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            </motion.div>
            <motion.div {...fade(0.1)} className="lg:col-span-6">
              <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#d98a4a' }}>
                Capítulo 04 · Backup físico
              </span>
              <h2 className="text-[clamp(2rem,4.5vw,3.75rem)] font-black leading-[1.05] tracking-tight mb-8" style={{ color: '#0e3b3a' }}>
                Papel queima, molha e desbota. Aço não.
              </h2>
              <div className="space-y-6 text-lg leading-[1.7] font-light" style={{ color: '#2d3a37' }}>
                <p>
                  O papel serve para o rascunho da primeira semana, enquanto você testa a restauração e ganha confiança. Ele não serve como backup definitivo: incêndio, vazamento, mudança de casa e simples esquecimento já destruíram mais Bitcoin do que hacker nenhum.
                </p>
                <p>
                  Grave as palavras em uma placa de aço, confira letra por letra, e guarde a placa em local diferente de onde fica o dispositivo. Se um endereço concentra as duas coisas, um único evento (roubo, incêndio, alagamento) leva tudo junto.
                </p>
                <p>
                  Existe uma última etapa que quase todo mundo pula: deixar instruções para quem precisaria recuperar esse patrimônio se algo acontecesse com você. Soberania sem plano de sucessão é patrimônio programado para desaparecer.
                </p>
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/autocustodia/seed-phrase-em-aco" className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold uppercase tracking-wider" style={{ backgroundColor: '#0e3b3a', color: '#ffb37a' }}>
                  Seed em aço <ArrowRight size={16} />
                </Link>
                <Link to="/autocustodia/heranca-bitcoin" className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold uppercase tracking-wider" style={{ border: '1px solid rgba(14,59,58,0.25)', color: '#0e3b3a' }}>
                  Herança Bitcoin <ArrowRight size={16} />
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* 05 — Regras de ouro */}
        <section className="relative px-6 md:px-12 lg:px-20 py-24 md:py-36" style={{ backgroundColor: '#ece2d3' }}>
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 max-w-[1600px] mx-auto">
            <motion.aside {...fade(0)} className="lg:col-span-4">
              <div className="sticky top-24">
                <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#d98a4a' }}>
                  Capítulo 05
                </span>
                <div className="h-[2px] w-16 mb-6" style={{ backgroundColor: '#d98a4a' }} />
                <p className="text-sm uppercase tracking-[0.2em] font-semibold" style={{ color: '#5a6664' }}>
                  Regras de ouro
                </p>
                <p className="mt-6 text-base leading-relaxed font-light" style={{ color: '#2d3a37' }}>
                  Imprima, cole na parede, releia antes de cada movimentação relevante. Disciplina repetida vale mais do que qualquer dispositivo caro.
                </p>
              </div>
            </motion.aside>
            <motion.div {...fade(0.1)} className="lg:col-span-8 space-y-4">
              {REGRAS_OURO.map((r, i) => (
                <div key={i} className="flex items-start gap-4 p-5 rounded-xl" style={{ backgroundColor: '#f4ede4' }}>
                  <Hammer size={20} className="shrink-0 mt-1" style={{ color: '#d98a4a' }} />
                  <p className="text-base md:text-lg leading-relaxed font-light" style={{ color: '#2d3a37' }}>{r}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* 06 — FAQ */}
        <section className="relative px-6 md:px-12 lg:px-20 py-24 md:py-36">
          <div className="max-w-[1100px] mx-auto">
            <motion.div {...fade(0)} className="mb-14">
              <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#d98a4a' }}>
                Capítulo 06 · Perguntas frequentes
              </span>
              <h2 className="text-[clamp(2.25rem,5vw,4.5rem)] font-black leading-[1] tracking-tight" style={{ color: '#0e3b3a' }}>
                Dúvidas de quem está{' '}
                <span style={{ color: '#d98a4a', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>
                  com o aparelho na mão.
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

        {/* 07 — Continue */}
        <section className="relative py-24 md:py-32 px-6 md:px-12 lg:px-20" style={{ backgroundColor: '#0e3b3a', color: '#f4ede4' }}>
          <div className="max-w-[1400px] mx-auto">
            <motion.div {...fade(0)} className="mb-12 max-w-2xl">
              <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#ffb37a' }}>
                Continue sua trilha
              </span>
              <h2 className="text-[clamp(2rem,4.5vw,4rem)] font-black leading-[1] tracking-tight">
                Dispositivo configurado.{' '}
                <span style={{ color: '#ffb37a', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>
                  Falta blindar o processo.
                </span>
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { to: '/autocustodia/erros-fatais-saque-corretora', titulo: 'Erros fatais no saque', texto: 'Taxas, redes erradas e as armadilhas irreversíveis do primeiro envio.' },
                { to: '/autocustodia/verificar-firmware-origem', titulo: 'Verificar firmware e origem', texto: 'Como confirmar que o aparelho é original e não foi adulterado.' },
                { to: '/comparativos/melhores-hardware-wallets', titulo: 'Melhores hardware wallets', texto: 'Comparativo entre Coldcard, Trezor, Jade, Krux e Passport.' },
                { to: '/autocustodia/guia-migracao-corretora', titulo: 'Guia de migração', texto: 'Volte ao mapa completo da travessia da corretora para a soberania.' },
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
