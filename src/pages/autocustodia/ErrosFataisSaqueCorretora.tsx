import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  AlertTriangle, Zap, Network, Coins, ChevronDown, ArrowRight,
  Clipboard, TimerReset, ShieldAlert, Layers,
} from 'lucide-react';
import SeoHead from '@/components/SeoHead';
import BackToHome from '@/components/BackToHome';
import heroImg from '@/assets/migracao/erros-hero.webp';
import redeImg from '@/assets/migracao/erros-rede.webp';
import taxasImg from '@/assets/migracao/erros-taxas.webp';

/**
 * /autocustodia/erros-fatais-saque-corretora
 * Página de quebra de objeções do Hub de Migração Soberana.
 */

const APPLE_EASE = [0.22, 1, 0.36, 1] as const;
const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.8, ease: APPLE_EASE, delay },
});

const ERROS = [
  {
    n: '01',
    titulo: 'Sacar Bitcoin por uma rede que não é a rede Bitcoin',
    icon: Network,
    gravidade: 'Irreversível',
    texto:
      'A corretora oferece "sacar com taxa menor" por redes alternativas de outros protocolos. O que chega do outro lado não é Bitcoin: é uma representação emitida por terceiros dentro de outra rede. Se a sua carteira só entende Bitcoin, o valor fica preso em um sistema que você não controla, dependendo da boa vontade de quem o emitiu. Economizar alguns reais de taxa custa a propriedade real do ativo.',
  },
  {
    n: '02',
    titulo: 'Colar o endereço sem conferir na tela do dispositivo',
    icon: Clipboard,
    gravidade: 'Irreversível',
    texto:
      'Malware de área de transferência troca o endereço no instante em que você cola. O formato é parecido, o começo às vezes é igual, e o dinheiro vai para o atacante. A conferência dos primeiros e últimos caracteres na tela da hardware wallet resolve isso em cinco segundos.',
  },
  {
    n: '03',
    titulo: 'Pular o saque de teste porque "vai dar certo"',
    icon: ShieldAlert,
    gravidade: 'Evitável',
    texto:
      'Transação confirmada não volta. Não existe estorno, ouvidoria ou chamado de suporte que reverta. O teste com valor simbólico transforma um risco irreversível em um custo de poucos reais, e ainda revela limites de saque e exigências de verificação da corretora antes do lote principal.',
  },
  {
    n: '04',
    titulo: 'Escolher taxa mínima em rede congestionada',
    icon: TimerReset,
    gravidade: 'Recuperável',
    texto:
      'Taxa baixa demais deixa a transação pendente por horas ou dias, e em cenários extremos ela é descartada da fila. Não é perda de dinheiro, é perda de sono e de janela de oportunidade. Consulte o estado da rede antes de definir a taxa e considere a possibilidade de acelerar a transação depois.',
  },
  {
    n: '05',
    titulo: 'Fragmentar a migração em dezenas de saques minúsculos',
    icon: Coins,
    gravidade: 'Custoso',
    texto:
      'Cada saque gera uma moeda separada na sua carteira, e cada uma delas precisará ser gasta com taxa própria no futuro. Quando as taxas subirem, mover essa poeira pode custar mais do que ela vale. Migre em poucos lotes bem dimensionados, não em migalhas.',
  },
  {
    n: '06',
    titulo: 'Enviar para um endereço já usado antes',
    icon: Layers,
    gravidade: 'Privacidade',
    texto:
      'Reutilizar endereço amarra publicamente todos os recebimentos ao mesmo destino, permitindo que qualquer pessoa monte o seu histórico patrimonial no explorador de blocos. Sua carteira gera um endereço novo a cada recebimento por um motivo. Use.',
  },
  {
    n: '07',
    titulo: 'Confundir Lightning com a rede principal',
    icon: Zap,
    gravidade: 'Contextual',
    texto:
      'Lightning é excelente para valores pequenos e pagamentos rápidos, mas endereço Lightning e endereço on-chain não são intercambiáveis. Além disso, saldo em Lightning fica em canais que exigem conectividade e manutenção: não é o lugar da sua poupança de longo prazo.',
  },
  {
    n: '08',
    titulo: 'Anunciar a migração para o mundo',
    icon: AlertTriangle,
    gravidade: 'Segurança física',
    texto:
      'Comentar em grupo, contar na roda de amigos ou postar print do saldo transforma um problema técnico em um problema físico. Quanto menos pessoas souberem que existe patrimônio guardado com você, menor a superfície de risco que nenhuma criptografia resolve.',
  },
];

const TAXAS = [
  {
    titulo: 'Taxa da corretora',
    texto:
      'Valor fixo ou percentual cobrado pela empresa para processar o saque. Varia muito entre plataformas e é onde mora a diferença de custo mais fácil de comparar antes de escolher onde comprar.',
  },
  {
    titulo: 'Taxa de rede (mineração)',
    texto:
      'Paga aos mineradores para incluir a sua transação em um bloco. Não depende do valor enviado, e sim do tamanho da transação em bytes e da concorrência do momento. Enviar muito ou pouco custa quase o mesmo.',
  },
  {
    titulo: 'Custo futuro de gasto',
    texto:
      'Cada recebimento vira uma moeda separada na sua carteira. Muitos recebimentos pequenos significam uma transação futura maior e mais cara. O custo do saque de hoje inclui o custo de gastar aquilo amanhã.',
  },
  {
    titulo: 'Custo de oportunidade da pressa',
    texto:
      'Fins de semana e madrugadas costumam ter rede menos congestionada. Programar a migração para um momento de baixa demanda reduz a taxa sem nenhum risco adicional.',
  },
];

const FAQ = [
  {
    q: 'O que acontece se eu enviar Bitcoin pela rede errada?',
    a: 'Se o destino não reconhece aquela rede, o valor fica inacessível na prática. Em alguns casos a corretora consegue recuperar mediante solicitação e cobrança de taxa, em outros não existe recuperação possível. Por isso a regra é simples: saque Bitcoin pela rede Bitcoin, sempre, mesmo que a taxa seja maior.',
  },
  {
    q: 'Como saber qual taxa de rede escolher?',
    a: 'Consulte um monitor de taxas antes de enviar. Se não há pressa, escolha uma taxa compatível com confirmação em algumas horas. Se precisa de rapidez, escolha a faixa de próximo bloco. Enviar com taxa muito abaixo da faixa atual deixa a transação parada até a rede desafogar.',
  },
  {
    q: 'Minha transação está travada há horas. Perdi o Bitcoin?',
    a: 'Não. Uma transação não confirmada continua sua, e só se torna definitiva quando entra em um bloco. Em geral basta esperar a rede desafogar. Algumas carteiras permitem acelerar substituindo a transação por uma versão com taxa maior, e algumas corretoras oferecem esse recurso no próprio saque.',
  },
  {
    q: 'É melhor fazer um saque grande ou vários pequenos?',
    a: 'Poucos lotes bem dimensionados costumam sair mais barato do que muitos saques pequenos, porque cada recebimento gera uma moeda que precisará ser gasta com taxa própria no futuro. Dois ou três lotes equilibram custo e segurança operacional melhor do que qualquer extremo.',
  },
  {
    q: 'Posso reutilizar o mesmo endereço de recebimento?',
    a: 'Tecnicamente funciona, mas prejudica sua privacidade: todos os recebimentos ficam publicamente ligados no mesmo endereço, permitindo que qualquer pessoa reconstrua seu histórico. Use um endereço novo a cada recebimento, como a carteira já sugere por padrão.',
  },
  {
    q: 'Sacar da corretora deixa rastro para a Receita Federal?',
    a: 'A corretora nacional reporta as operações realizadas na plataforma às autoridades. A transferência para carteira própria não é venda e não gera imposto, mas mantém a exigência de declarar corretamente a posição e de guardar registro das movimentações. Organização evita malha fina.',
  },
];

function Hero() {
  return (
    <section className="relative w-full" style={{ height: '90vh', minHeight: 700 }}>
      <img
        src={heroImg}
        alt="Vidro escuro trincado refletindo uma luz âmbar, representando o erro irreversível em um saque de Bitcoin"
        width={1600}
        height={1000}
        className="absolute inset-0 w-full h-full object-cover"
        loading="eager"
        fetchPriority="high"
        decoding="async"
      />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(14,59,58,0.5) 0%, rgba(14,59,58,0.32) 40%, rgba(14,59,58,0.93) 100%)' }} />
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
          <AlertTriangle size={11} className="inline mr-2" /> Erros irreversíveis
        </span>

        <motion.h1
          initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1, delay: 0.15, ease: APPLE_EASE }}
          className="text-[clamp(2.75rem,8.5vw,7.5rem)] font-black leading-[0.95] tracking-tight max-w-[20ch]"
          style={{ fontFamily: "'Inter Tight', sans-serif", color: '#f4ede4' }}
        >
          8 erros fatais no saque de corretoras{' '}
          <span
            style={{
              color: '#d98a4a',
              fontStyle: 'italic',
              fontWeight: 400,
              fontFamily: "'Playfair Display', serif",
              textShadow: '0 0 40px rgba(217,138,74,0.45), 0 0 80px rgba(217,138,74,0.25)',
            }}
          >
            e como não cometer nenhum.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: APPLE_EASE }}
          className="mt-8 max-w-3xl text-lg md:text-2xl leading-relaxed font-light"
          style={{ color: 'rgba(244,237,228,0.85)', fontFamily: "'Inter Tight', sans-serif" }}
        >
          Rede errada, endereço trocado, taxa mal calculada, saque fatiado em migalhas. Cada um desses erros tem nome, causa e antídoto. Leia antes de clicar em sacar, porque na rede Bitcoin não existe botão de desfazer.
        </motion.p>
      </motion.div>
    </section>
  );
}

export default function ErrosFataisSaqueCorretora() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <>
      <SeoHead
        path="/autocustodia/erros-fatais-saque-corretora"
        custom={{
          title: '8 Erros Fatais ao Sacar Bitcoin da Corretora (e Como Evitar)',
          description:
            'Rede errada, endereço trocado, taxa mal calculada e saques fatiados: os erros mais caros ao tirar Bitcoin da corretora, por que acontecem e como evitar cada um deles.',
          canonical: 'https://lordjunnior.com.br/autocustodia/erros-fatais-saque-corretora',
          primaryKeyword: 'erros ao sacar bitcoin da corretora',
          lsiKeywords: [
            'taxa de rede bitcoin',
            'rede errada saque bitcoin',
            'transação bitcoin travada',
            'endereço bitcoin trocado malware',
            'lightning x on-chain',
            'reutilizar endereço bitcoin',
          ],
          longTailKeywords: [
            'enviei bitcoin pela rede errada o que fazer',
            'transação de bitcoin travada sem confirmar',
            'qual taxa escolher para sacar bitcoin',
            'melhor forma de tirar bitcoin da corretora sem perder dinheiro',
          ],
          breadcrumbs: [
            { name: 'Início', url: '/' },
            { name: 'Autocustódia', url: '/autocustodia' },
            { name: 'Erros fatais no saque', url: '/autocustodia/erros-fatais-saque-corretora' },
          ],
          schemaType: 'Article',
          articleSection: 'Autocustódia',
          relatedPages: [
            '/autocustodia/guia-migracao-corretora',
            '/autocustodia/primeiro-saque-hardware-wallet',
            '/autocustodia/utxo-consolidacao',
            '/lightning',
          ],
        }}
        faqItems={FAQ.map((f) => ({ question: f.q, answer: f.a }))}
      />

      <div className="relative min-h-screen" style={{ backgroundColor: '#f4ede4', color: '#1c2624', fontFamily: "'Inter Tight', sans-serif" }}>
        <div className="absolute top-0 left-0 right-0 z-30 px-6 md:px-12 lg:px-20 pt-[52px]">
          <BackToHome />
        </div>

        <Hero />

        {/* 01 — Por que não tem volta */}
        <section className="relative px-6 md:px-12 lg:px-20 py-24 md:py-36">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 max-w-[1600px] mx-auto">
            <motion.aside {...fade(0)} className="lg:col-span-4">
              <div className="sticky top-24">
                <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#d98a4a' }}>
                  Capítulo 01
                </span>
                <div className="h-[2px] w-16 mb-6" style={{ backgroundColor: '#d98a4a' }} />
                <p className="text-sm uppercase tracking-[0.2em] font-semibold" style={{ color: '#5a6664' }}>
                  Sem botão de desfazer
                </p>
              </div>
            </motion.aside>
            <motion.div {...fade(0.1)} className="lg:col-span-8">
              <h2 className="text-[clamp(2.25rem,5vw,4.5rem)] font-black leading-[1.05] tracking-tight mb-10" style={{ color: '#0e3b3a' }}>
                A mesma característica que te protege{' '}
                <span style={{ color: '#d98a4a', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>
                  é a que te pune.
                </span>
              </h2>
              <div className="space-y-6 text-lg md:text-xl leading-[1.75] font-light" style={{ color: '#2d3a37' }}>
                <p>
                  Uma transação confirmada em Bitcoin é definitiva. Nenhum banco central reverte, nenhum suporte cancela, nenhuma ordem judicial desfaz o que já entrou no bloco. É por isso que o seu saldo não pode ser confiscado por decreto, e é exatamente por isso que um erro de digitação não tem apelação.
                </p>
                <p>
                  Quem trata o primeiro saque como se fosse um PIX comete os erros desta lista. Quem trata como um procedimento, com etapas verificadas e um teste antes do valor real, atravessa a ponte sem sustos e nunca mais precisa pensar nisso.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* 02 — Os oito erros */}
        <section className="relative px-6 md:px-12 lg:px-20 py-24 md:py-36" style={{ backgroundColor: '#ece2d3' }}>
          <div className="max-w-[1600px] mx-auto">
            <motion.div {...fade(0)} className="mb-14 max-w-3xl">
              <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#d98a4a' }}>
                Capítulo 02 · O catálogo
              </span>
              <h2 className="text-[clamp(2.25rem,5vw,4.5rem)] font-black leading-[1.05] tracking-tight" style={{ color: '#0e3b3a' }}>
                Oito erros, do irreversível ao apenas caro.
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6">
              {ERROS.map((e) => (
                <motion.div key={e.n} {...fade(0.04)} className="p-8 rounded-2xl h-full" style={{ backgroundColor: '#f4ede4', border: '1px solid rgba(14,59,58,0.08)' }}>
                  <div className="flex items-center justify-between mb-5">
                    <e.icon size={26} style={{ color: '#d98a4a' }} />
                    <span
                      className="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-[0.15em]"
                      style={{ backgroundColor: 'rgba(14,59,58,0.08)', color: '#0e3b3a' }}
                    >
                      {e.gravidade}
                    </span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-black leading-snug mb-4" style={{ color: '#0e3b3a' }}>
                    {e.n} · {e.titulo}
                  </h3>
                  <p className="text-base leading-relaxed font-light" style={{ color: '#2d3a37' }}>{e.texto}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 03 — Rede errada */}
        <section className="relative px-6 md:px-12 lg:px-20 py-24 md:py-36" style={{ backgroundColor: '#0e3b3a' }}>
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 max-w-[1600px] mx-auto items-center">
            <motion.div {...fade(0)} className="lg:col-span-6">
              <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#ffb37a' }}>
                Capítulo 03 · Rede errada
              </span>
              <h2 className="text-[clamp(2rem,4.5vw,3.75rem)] font-black leading-[1.05] tracking-tight mb-8" style={{ color: '#f4ede4' }}>
                Taxa barata em rede alheia não é Bitcoin barato. É outro ativo.
              </h2>
              <div className="space-y-6 text-lg leading-[1.7] font-light" style={{ color: 'rgba(244,237,228,0.82)' }}>
                <p>
                  Quando a corretora oferece sacar "Bitcoin" por uma rede de terceiros com taxa irrisória, o que você recebe do outro lado é um recibo emitido por alguém, circulando dentro de uma rede que aquele alguém controla. O Bitcoin de verdade continua parado no cofre do emissor.
                </p>
                <p>
                  Isso reintroduz exatamente o problema que você estava tentando eliminar ao sair da corretora: dependência de um terceiro que pode congelar, sumir ou simplesmente decidir que você não resgata. Você trocou um risco de contraparte por outro, e pagou taxa para isso.
                </p>
                <p className="font-medium" style={{ color: '#ffb37a' }}>
                  Regra permanente: Bitcoin sai pela rede Bitcoin. A economia de taxa não compra soberania de volta.
                </p>
              </div>
            </motion.div>
            <motion.div {...fade(0.15)} className="lg:col-span-6">
              <div className="relative h-[400px] md:h-[540px] overflow-hidden rounded-3xl">
                <img
                  src={redeImg}
                  alt="Dois trilhos de trem divergindo na neblina noturna, um iluminado em âmbar e outro se perdendo no escuro"
                  loading="lazy"
                  width={1600}
                  height={1000}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* 04 — Anatomia das taxas */}
        <section className="relative px-6 md:px-12 lg:px-20 py-24 md:py-36">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 max-w-[1600px] mx-auto items-start">
            <motion.div {...fade(0)} className="lg:col-span-5">
              <div className="relative h-[400px] md:h-[560px] overflow-hidden rounded-3xl sticky top-24">
                <img
                  src={taxasImg}
                  alt="Balança de bronze antiga sobre mesa escura, representando o cálculo entre custo e urgência nas taxas de rede"
                  loading="lazy"
                  width={1600}
                  height={1000}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            </motion.div>
            <motion.div {...fade(0.1)} className="lg:col-span-7">
              <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#d98a4a' }}>
                Capítulo 04 · Anatomia do custo
              </span>
              <h2 className="text-[clamp(2rem,4.5vw,3.75rem)] font-black leading-[1.05] tracking-tight mb-10" style={{ color: '#0e3b3a' }}>
                O saque tem quatro custos. Você provavelmente só enxerga um.
              </h2>
              <div className="space-y-4">
                {TAXAS.map((t, i) => (
                  <div key={t.titulo} className="flex items-start gap-5 p-6 rounded-2xl" style={{ backgroundColor: '#ece2d3' }}>
                    <span className="shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-sm font-black" style={{ backgroundColor: '#0e3b3a', color: '#ffb37a' }}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <h3 className="text-lg md:text-xl font-bold mb-2" style={{ color: '#0e3b3a' }}>{t.titulo}</h3>
                      <p className="text-base leading-relaxed font-light" style={{ color: '#2d3a37' }}>{t.texto}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-7 rounded-2xl" style={{ backgroundColor: '#3a1414', border: '1px solid rgba(255,120,90,0.35)' }}>
                <p className="text-lg md:text-xl font-black mb-2" style={{ color: '#ffb37a' }}>
                  Taxa de rede não depende do valor enviado.
                </p>
                <p className="text-base leading-relaxed font-light" style={{ color: 'rgba(244,237,228,0.85)' }}>
                  Mover um valor pequeno ou um valor grande custa praticamente o mesmo, porque o que a rede cobra é pelo espaço ocupado no bloco. É por isso que dezenas de saques minúsculos saem muito mais caro do que dois ou três lotes bem planejados.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* 05 — Protocolo à prova de erro */}
        <section className="relative px-6 md:px-12 lg:px-20 py-24 md:py-36" style={{ backgroundColor: '#ece2d3' }}>
          <div className="max-w-[1200px] mx-auto">
            <motion.div {...fade(0)} className="mb-12">
              <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#d98a4a' }}>
                Capítulo 05 · Antídoto
              </span>
              <h2 className="text-[clamp(2.25rem,5vw,4.5rem)] font-black leading-[1.05] tracking-tight" style={{ color: '#0e3b3a' }}>
                O protocolo de cinco verificações antes de confirmar.
              </h2>
            </motion.div>

            <div className="space-y-4">
              {[
                'A rede selecionada no saque é a rede Bitcoin, e nenhuma outra.',
                'O endereço na tela da corretora bate com o endereço na tela do meu dispositivo, início e fim.',
                'Este é um endereço novo, gerado agora, e não um endereço reaproveitado.',
                'A taxa escolhida é compatível com o estado atual da rede e com a minha pressa real.',
                'Este é um saque de teste, ou eu já fiz o teste e confirmei o recebimento anteriormente.',
              ].map((t, i) => (
                <motion.div key={i} {...fade(i * 0.04)} className="flex items-start gap-5 p-6 rounded-2xl" style={{ backgroundColor: '#f4ede4', border: '1px solid rgba(14,59,58,0.08)' }}>
                  <span className="shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-sm font-black" style={{ backgroundColor: '#d98a4a', color: '#0e3b3a' }}>
                    {i + 1}
                  </span>
                  <p className="text-base md:text-lg leading-relaxed font-medium" style={{ color: '#0e3b3a' }}>{t}</p>
                </motion.div>
              ))}
            </div>
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
                O que fazer{' '}
                <span style={{ color: '#d98a4a', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>
                  quando algo dá errado.
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
                Errar é opcional.{' '}
                <span style={{ color: '#ffb37a', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>
                  Estudar é barato.
                </span>
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { to: '/autocustodia/guia-migracao-corretora', titulo: 'Guia de migração', texto: 'O mapa completo da travessia da corretora para a custódia própria.' },
                { to: '/autocustodia/primeiro-saque-hardware-wallet', titulo: 'Blindagem digital', texto: 'Configuração da hardware wallet e recebimento do primeiro saque.' },
                { to: '/autocustodia/utxo-consolidacao', titulo: 'UTXO e consolidação', texto: 'Por que saques fatiados encarecem o futuro e como consolidar.' },
                { to: '/lightning', titulo: 'Lightning Network', texto: 'Quando usar a segunda camada e quando ficar na rede principal.' },
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
