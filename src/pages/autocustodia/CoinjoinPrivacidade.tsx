import { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  ShieldCheck, ChevronDown, AlertTriangle, Shuffle, Calendar, EyeOff,
} from 'lucide-react';
import SeoHead from '@/components/SeoHead';
import BackToHome from '@/components/BackToHome';
import heroImg from '@/assets/autocustodia/coinjoin-hero.jpg';
import imgAnalogia from '@/assets/autocustodia/coinjoin-analogia.jpg';
import imgInterface from '@/assets/autocustodia/coinjoin-interface.jpg';
import imgMistura from '@/assets/autocustodia/coinjoin-mistura.jpg';
import imgOpsec from '@/assets/autocustodia/coinjoin-opsec.jpg';
import imgPlanejamento from '@/assets/autocustodia/coinjoin-planejamento.jpg';
import imgPrivacidade from '@/assets/autocustodia/coinjoin-privacidade.jpg';

const APPLE_EASE = [0.22, 1, 0.36, 1] as const;
const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.8, ease: APPLE_EASE, delay },
});

const COLORS = {
  page: 'hsl(38 28% 94%)',
  ink: 'hsl(153 24% 18%)',
  body: 'hsl(153 13% 24%)',
  muted: 'hsl(153 9% 42%)',
  accent: 'hsl(39 62% 53%)',
  accentSoft: 'hsl(39 62% 88%)',
  sage: 'hsl(146 20% 87%)',
  sageDeep: 'hsl(153 24% 18%)',
  line: 'hsl(153 18% 79%)',
  white: 'hsl(44 33% 97%)',
};

const sectionBg = {
  warmPaper: {
    backgroundColor: COLORS.page,
    backgroundImage: [
      'radial-gradient(circle at 12% 18%, hsl(39 62% 88% / 0.75), transparent 34%)',
      'radial-gradient(circle at 88% 22%, hsl(146 20% 87% / 0.55), transparent 30%)',
      'linear-gradient(180deg, hsl(38 28% 95%), hsl(38 26% 93%))',
    ].join(','),
  },
  privacyWash: {
    backgroundColor: 'hsl(44 33% 97%)',
    backgroundImage: [
      'radial-gradient(circle at 16% 20%, hsl(146 20% 87% / 0.7), transparent 30%)',
      'radial-gradient(circle at 80% 70%, hsl(39 62% 88% / 0.7), transparent 28%)',
      'linear-gradient(180deg, hsl(44 33% 97%), hsl(38 28% 95%))',
    ].join(','),
  },
  darkSection: {
    backgroundColor: COLORS.sageDeep,
    backgroundImage: [
      'radial-gradient(circle at 16% 22%, hsl(39 62% 53% / 0.14), transparent 24%)',
      'radial-gradient(circle at 82% 70%, hsl(146 20% 87% / 0.12), transparent 26%)',
      'linear-gradient(180deg, hsl(153 24% 18%), hsl(153 24% 16%))',
    ].join(','),
  },
  stripeLight: {
    backgroundColor: COLORS.page,
    backgroundImage: [
      'linear-gradient(135deg, hsl(146 20% 87% / 0.22) 0%, transparent 28%)',
      'linear-gradient(0deg, hsl(39 62% 88% / 0.34), hsl(39 62% 88% / 0.34))',
      'repeating-linear-gradient(90deg, transparent 0, transparent 78px, hsl(153 18% 79% / 0.13) 79px, transparent 80px)',
    ].join(','),
  },
};

interface Pilar {
  num: string;
  titulo: string;
  subtitulo: string;
  imagem: string;
  paragrafos: string[];
  praticas: string[];
  tempo: string;
}

const PILARES: Pilar[] = [
  {
    num: '01',
    titulo: 'Entenda a ideia sem travar no termo',
    subtitulo: 'CoinJoin é um embaralhamento coletivo',
    imagem: imgAnalogia,
    paragrafos: [
      'CoinJoin parece complicado pelo nome, mas a lógica é simples. Imagine cinco pessoas entrando em uma sala com notas do mesmo valor. Todas colocam as notas em uma mesa, embaralham juntas e saem com a mesma quantidade de notas de antes. Cada pessoa continua com o próprio dinheiro, mas fica muito mais difícil dizer qual nota era de quem no início.',
      'No Bitcoin, em vez de notas, existem pedaços de saldo chamados UTXOs. Você não precisa decorar a sigla agora. Pense neles como “moedinhas separadas” dentro da sua carteira. O CoinJoin pega várias dessas moedinhas de várias pessoas, mistura tudo em uma transação coletiva e devolve saídas iguais. É essa igualdade que bagunça a trilha de vigilância.',
      'O objetivo não é esconder crime. O objetivo é recuperar privacidade básica. Da mesma forma que você fecha a porta do banheiro não porque é criminoso, mas porque intimidade é normal, CoinJoin existe para que sua vida financeira não vire vidro transparente para empresa de análise, exchange curiosa ou terceiro bisbilhoteiro.',
    ],
    praticas: [
      'Se um termo travar seu entendimento, troque mentalmente por uma analogia simples antes de continuar',
      'Pense em UTXO como “pedaço separado de saldo”',
      'Pense em CoinJoin como “lavadora coletiva de rastros”, não de dinheiro',
      'Só avance para a prática quando a lógica geral fizer sentido sem decorar siglas',
    ],
    tempo: 'Compreensão base: 20 minutos',
  },
  {
    num: '02',
    titulo: 'O que ele melhora de fato',
    subtitulo: 'Não torna você invisível; torna a leitura mais difícil',
    imagem: imgInterface,
    paragrafos: [
      'CoinJoin não é capa de invisibilidade. É neblina. Ele não apaga a blockchain, não some com a transação, não transforma você em fantasma digital. O que ele faz é reduzir a clareza da trilha entre a origem e o destino. Para quem observa de fora, fica muito mais caro e trabalhoso afirmar qual saída pertence a qual entrada.',
      'Essa distinção é importante porque evita fantasia. Privacidade boa nasce de expectativa correta. Em vez de pensar “ninguém jamais verá nada”, pense “agora ficou muito mais difícil me mapear com confiança”. Em segurança, aumentar o custo de análise já é uma vitória enorme.',
      'Analogia simples: se antes você andava numa rua vazia usando uma camisa neon com seu nome escrito, depois do CoinJoin você passa a caminhar numa multidão de pessoas vestidas de forma parecida. Você não desaparece. Só deixa de estar destacado como alvo fácil.',
    ],
    praticas: [
      'Use CoinJoin para reduzir rastreabilidade, não para se sentir invencível',
      'Evite misturar expectativa de privacidade com fantasia de anonimato total',
      'Lembre que comportamento depois da mistura também importa',
      'Privacidade é camadas, não botão mágico',
    ],
    tempo: 'Ajuste mental: 1 leitura atenta',
  },
  {
    num: '03',
    titulo: 'O erro que desfaz tudo depois',
    subtitulo: 'Misturar bem e revelar logo em seguida',
    imagem: imgMistura,
    paragrafos: [
      'Muita gente faz CoinJoin e depois estraga o próprio trabalho por pressa. Exemplo clássico: mistura as moedas e logo em seguida junta tudo de novo numa única compra, envia para uma exchange KYC ou combina moedas misturadas com moedas antigas na mesma transação. Isso é como lavar um carro e, cinco minutos depois, jogá-lo num lamaçal.',
      'A privacidade não termina na ferramenta. Ela continua no comportamento. Depois da mistura, você precisa tratar aquelas moedas com disciplina: evitar unir pedaços diferentes sem necessidade, evitar reaparecer imediatamente em ambientes onde sua identidade já é conhecida e evitar padrões previsíveis que remontem a sua carteira original.',
      'Analogia simples: CoinJoin é como trocar de roupa antes de sair por outra porta. Se você troca de roupa, mas sai pela porta da frente, no mesmo horário, no mesmo carro e acena para a câmera, a troca serviu pouco. O processo precisa ser coerente do começo ao fim.',
    ],
    praticas: [
      'Separe moedas misturadas das não misturadas com disciplina absoluta',
      'Não recombine UTXOs por comodidade se puder evitar',
      'Evite enviar logo depois para lugares que conhecem sua identidade',
      'Tenha paciência operacional: privacidade odeia pressa',
    ],
    tempo: 'Disciplina contínua após a mistura',
  },
  {
    num: '04',
    titulo: 'OpSec simples para gente normal',
    subtitulo: 'Menos espetáculo, mais rotina limpa',
    imagem: imgOpsec,
    paragrafos: [
      'OpSec parece palavra de filme, mas aqui significa só “jeito inteligente de operar”. No contexto de CoinJoin, isso quer dizer usar máquina limpa, ambiente calmo, não ficar fotografando tela, não comentar valores em grupo, não misturar pressa com execução e não transformar sua rotina financeira em conversa social.',
      'Privacidade raramente quebra por falta de tecnologia. Normalmente quebra por vaidade, preguiça ou improviso. A pessoa faz metade certo e metade no automático. Por isso o melhor OpSec para a maioria é o mais simples: menos exposição, menos ruído, menos conversa, menos atalhos.',
      'Pense como cozinha limpa. Não adianta usar ingrediente excelente se a bancada está suja e a faca contaminada. CoinJoin pode ser a boa ferramenta; seu ambiente e seus hábitos precisam estar minimamente limpos para o resultado valer a pena.',
    ],
    praticas: [
      'Faça operações em ambiente tranquilo, sem interrupções',
      'Não fotografe telas, anotações ou fluxos operacionais',
      'Evite contar para amigos como, quando e quanto você mistura',
      'Mantenha caderno de processo mínimo e discreto, sem detalhes sensíveis desnecessários',
    ],
    tempo: 'Rotina operacional: permanente',
  },
  {
    num: '05',
    titulo: 'Taxa, tempo e expectativa realista',
    subtitulo: 'Privacidade custa paciência, não desespero',
    imagem: imgPlanejamento,
    paragrafos: [
      'CoinJoin tem custo. Você pode pagar taxa de rede maior em alguns momentos, esperar rodada, revisar passos e aceitar que privacidade bem feita é mais lenta do que clicar correndo numa exchange. Isso não é defeito. É o preço de sair da esteira cômoda da vigilância financeira total.',
      'A cabeça certa aqui é a seguinte: privacidade não é para quando você está com pressa extrema. É para quando você está pensando direito. Quem tenta fazer tudo correndo tende a aceitar qualquer saída, qualquer fee e qualquer erro de recombinação depois. Resultado: paga mais e protege menos.',
      'Analogia simples: viajar com segurança custa mais tempo do que atravessar uma rua correndo fora da faixa. Pode parecer mais lento na hora, mas reduz o risco de um erro caro. No Bitcoin, tempo bem usado quase sempre é proteção comprada barato.',
    ],
    praticas: [
      'Escolha momentos de rede menos congestionada quando possível',
      'Não execute privacidade em cima da hora por ansiedade',
      'Planeje antes o destino das moedas misturadas',
      'Aceite que privacidade bem feita é processo, não impulso',
    ],
    tempo: 'Planejamento prévio: 15 a 30 min',
  },
];

const ARMADILHAS = [
  { titulo: 'Achar que CoinJoin resolve tudo sozinho', detalhe: 'Ele melhora muito a situação, mas não corrige comportamento ruim depois. Se você mistura e logo reaparece em ambiente identificado, entrega parte da vantagem conquistada.' },
  { titulo: 'Confundir privacidade com anonimato absoluto', detalhe: 'Isso gera falsa sensação de invulnerabilidade. O mais saudável é pensar em redução forte de rastreabilidade, não em desaparecimento mágico.' },
  { titulo: 'Fazer e depois recombinar tudo por preguiça', detalhe: 'Esse é o tropeço mais comum. A pessoa mistura bonito e desfaz a proteção ao juntar moedas antigas com novas em uma transação seguinte.' },
  { titulo: 'Operar sob pressa ou ansiedade', detalhe: 'Privacidade pede cabeça fria. Pressa faz você aceitar taxa ruim, erro bobo e destino mal pensado.' },
  { titulo: 'Mostrar demais o próprio processo', detalhe: 'Privacidade performada em rede social deixa de ser privacidade. Ferramenta boa com boca frouxa vira meia proteção.' },
  { titulo: 'Tratar a ferramenta como ritual místico', detalhe: 'Não precisa virar religião. Basta entender a lógica, aplicar com disciplina e manter expectativas corretas. Simples é melhor.' },
];

const FAQ = [
  { q: 'CoinJoin é ilegal?', a: 'Em geral, não. É uma ferramenta de privacidade. O ponto é semelhante a usar cortina em casa: proteger sua intimidade não é crime. O que pode variar é a forma como certas empresas ou serviços encaram moedas com histórico de mistura, então é importante entender o ambiente em que você vai usar depois.' },
  { q: 'Preciso entender tudo de blockchain para usar?', a: 'Não. Precisa entender o bastante para não agir no automático. Se você compreender a analogia da mistura coletiva, a ideia de separar moedas misturadas das não misturadas e a importância do comportamento depois, já saiu da zona leiga perigosa.' },
  { q: 'CoinJoin apaga meu histórico?', a: 'Não apaga. Ele embaralha a leitura e enfraquece a confiança de quem tenta ligar origem e destino. Pense em neblina, não em borracha.' },
  { q: 'Qual o maior erro do iniciante?', a: 'Fazer a mistura e depois recombinar tudo por comodidade. É o equivalente a trancar a porta da frente e deixar a dos fundos aberta.' },
  { q: 'É caro usar?', a: 'Pode custar mais do que uma transação simples, mas o custo real costuma ser mais de paciência do que de dinheiro. O erro caro é usar mal e depois perder a privacidade por pressa.' },
  { q: 'Isso serve para quem não é técnico?', a: 'Sim, desde que a pessoa aceite estudar o básico com calma. Não precisa virar engenheiro. Precisa parar de tratar a própria vida financeira como algo que qualquer observador pode mapear.' },
  { q: 'Depois do CoinJoin posso mandar para qualquer lugar?', a: 'Pode, mas deve pensar antes. Se mandar imediatamente para um ambiente totalmente identificado, você reduz parte da vantagem. O destino importa.' },
  { q: 'Qual a melhor mentalidade?', a: 'Disciplina silenciosa. Menos euforia, menos pressa, menos exibicionismo. Privacidade boa tem mais de rotina madura do que de glamour técnico.' },
];

function Hero() {
  const { scrollY } = useScroll();
  const yBg = useTransform(scrollY, [0, 800], [0, 200]);
  const opacityContent = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    <section className="relative h-[88vh] min-h-[640px] w-full overflow-hidden" style={sectionBg.privacyWash}>
      <motion.div className="absolute inset-0" style={{ y: yBg }}>
        <img src={heroImg} alt="" fetchPriority="high" className="w-full h-full object-cover scale-110" style={{ filter: 'saturate(1.02) contrast(1.02)' }} loading="lazy" decoding="async" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, hsl(44 33% 97% / 0.18) 0%, hsl(44 33% 97% / 0.10) 28%, hsl(38 28% 94% / 0.18) 55%, hsl(38 28% 94%) 100%)' }} />
      </motion.div>

      <motion.div className="relative z-10 h-full flex flex-col justify-end px-6 md:px-12 lg:px-20 pb-20 md:pb-28" style={{ opacity: opacityContent }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: APPLE_EASE }} className="inline-flex items-center gap-3 mb-6 self-start px-4 py-2 rounded-full backdrop-blur-md" style={{ backgroundColor: 'hsl(44 33% 97% / 0.66)', border: `1px solid ${COLORS.line}` }}>
          <Shuffle size={16} style={{ color: COLORS.ink }} />
          <span className="text-[11px] md:text-xs font-bold tracking-[0.3em] uppercase" style={{ color: COLORS.ink }}>
            Privacidade Prática · Manual Definitivo
          </span>
        </motion.div>

        <motion.h1 initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} transition={{ duration: 1, delay: 0.15, ease: APPLE_EASE }} className="text-[clamp(2.75rem,8.5vw,7.3rem)] font-black leading-[0.95] tracking-tight max-w-[16ch]" style={{ fontFamily: "'Inter Tight', sans-serif", color: COLORS.ink }}>
          Nem tudo precisa ser<br/>
          <span style={{ color: COLORS.accent, fontStyle: 'italic', fontWeight: 400, fontFamily: "'Playfair Display', serif", textShadow: '0 0 36px hsl(39 62% 53% / 0.18)' }}>
            transparente para o mundo.
          </span>
        </motion.h1>

        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.5, ease: APPLE_EASE }} className="mt-8 max-w-2xl text-lg md:text-2xl leading-relaxed font-light" style={{ color: 'hsl(153 13% 24% / 0.92)', fontFamily: "'Inter Tight', sans-serif" }}>
          CoinJoin explicado sem enrolação: o que é, o que melhora, onde as pessoas estragam tudo e como pensar privacidade on-chain com cabeça adulta e linguagem simples.
        </motion.p>
      </motion.div>
    </section>
  );
}

export default function CoinjoinPrivacidade() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <>
      <SeoHead
        path="/autocustodia/coinjoin-privacidade"
        custom={{
          title: 'CoinJoin e Privacidade On-Chain Explicados Sem Jargão',
          description: 'Entenda CoinJoin com linguagem simples: como funciona, o que ele realmente melhora, os erros que desfazem a privacidade e como operar com mais inteligência.',
          canonical: 'https://lordjunnior.com.br/autocustodia/coinjoin-privacidade',
          primaryKeyword: 'coinjoin',
          lsiKeywords: ['privacidade bitcoin', 'privacidade on-chain', 'mistura de transações', 'coinjoin explicado', 'UTXO explicado'],
          longTailKeywords: ['o que é coinjoin em linguagem simples', 'como melhorar privacidade no bitcoin', 'coinjoin explicado para iniciantes', 'erros de privacidade on chain'],
          breadcrumbs: [
            { name: 'Início', url: '/' },
            { name: 'Autocustódia', url: '/autocustodia' },
            { name: 'CoinJoin & Privacidade', url: '/autocustodia/coinjoin-privacidade' },
          ],
          schemaType: 'Article',
          articleSection: 'Autocustódia & Segurança',
          relatedPages: ['/autocustodia', '/autocustodia/seed-phrase-em-aco', '/mobilidade-de-chaves', '/multisig-bitcoin'],
        }}
        faqItems={FAQ.map((f) => ({ question: f.q, answer: f.a }))}
      />

      <div className="relative min-h-screen" style={{ backgroundColor: COLORS.page, color: COLORS.ink, fontFamily: "'Inter Tight', sans-serif" }}>
        <div className="absolute top-0 left-0 right-0 z-30 px-6 md:px-12 lg:px-20 pt-[52px]">
          <BackToHome />
        </div>

        <Hero />

        <section className="relative px-6 md:px-12 lg:px-20 py-24 md:py-36" style={sectionBg.warmPaper}>
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 max-w-[1600px] mx-auto">
            <motion.aside {...fade(0)} className="lg:col-span-4">
              <div className="sticky top-24">
                <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: COLORS.accent }}>Capítulo 01</span>
                <div className="h-[2px] w-16 mb-6" style={{ backgroundColor: COLORS.accent }} />
                <p className="text-sm uppercase tracking-[0.2em] font-semibold" style={{ color: COLORS.muted }}>Privacidade sem teatro</p>
              </div>
            </motion.aside>
            <motion.div {...fade(0.1)} className="lg:col-span-8">
              <h2 className="text-[clamp(2.25rem,5.5vw,5rem)] font-black leading-[1] tracking-tight mb-10" style={{ color: COLORS.ink }}>
                Privacidade financeira é{' '}
                <span style={{ color: COLORS.accent, fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>
                  higiene básica.
                </span>
              </h2>
              <div className="space-y-7 text-lg md:text-xl leading-[1.7] font-light" style={{ color: COLORS.body }}>
                <p>
                  Muita gente foi convencida de que só criminoso quer privacidade. Isso é uma inversão absurda. Você fecha a cortina, guarda documentos em gaveta, evita falar saldo bancário em voz alta e não publica o holerite no Instagram. Tudo isso é normal. No Bitcoin, a lógica deveria ser a mesma.
                </p>
                <p>
                  O problema é que a blockchain é pública. Se você não cria camadas de privacidade, sua trilha financeira pode ficar mais exposta do que a da conta bancária comum. CoinJoin surge como resposta prática a esse excesso de transparência. Não para sumir do mapa, mas para parar de caminhar com um holofote na testa.
                </p>
                <blockquote className="pl-8 py-2 my-10 text-2xl md:text-3xl leading-[1.4] font-light" style={{ borderLeft: `3px solid ${COLORS.accent}`, color: COLORS.ink, fontFamily: "'Playfair Display', serif", fontStyle: 'italic' }}>
                  Privacidade não é truque. É reduzir o quanto terceiros conseguem montar sua vida como um quebra-cabeça aberto.
                </blockquote>
                <p>
                  Esta página foi construída para explicar CoinJoin sem jargão desnecessário, e já testa um novo sistema visual: cada grande bloco recebe um fundo claro diferente, respirando mais, para a página não ficar lisa nem monótona. Se essa sensação funcionar bem aqui, eu levo o padrão para as outras novas páginas claras.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="relative py-24 md:py-32 px-6 md:px-12 lg:px-20" style={sectionBg.darkSection}>
          <div className="max-w-[1600px] mx-auto">
            <motion.div {...fade(0)} className="grid lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-7 relative aspect-[4/5] lg:aspect-[5/6] overflow-hidden">
                <img src={imgPrivacidade} alt="Papéis translúcidos e rastros parcialmente ocultos simbolizando privacidade" loading="lazy" className="w-full h-full object-cover" />
              </div>
              <div className="lg:col-span-5">
                <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-6" style={{ color: COLORS.accent }}>Capítulo 02</span>
                <h2 className="text-[clamp(2rem,4.5vw,4rem)] font-black leading-[1.05] tracking-tight mb-8" style={{ color: COLORS.white }}>
                  O melhor resultado não é sumir.<br/>
                  <span style={{ color: COLORS.accent, fontStyle: 'italic', fontWeight: 400, fontFamily: "'Playfair Display', serif" }}>
                    é ficar mais difícil de ler.
                  </span>
                </h2>
                <p className="text-lg md:text-xl leading-[1.7] font-light mb-6" style={{ color: 'hsl(44 33% 97% / 0.84)' }}>
                  Quem busca privacidade madura para Bitcoin precisa abandonar fantasia de filme. A meta realista é aumentar o custo de análise para quem observa. Quanto mais trabalho, mais incerteza e menos clareza o observador tiver, melhor.
                </p>
                <p className="text-lg md:text-xl leading-[1.7] font-light" style={{ color: 'hsl(44 33% 97% / 0.84)' }}>
                  É exatamente isso que o CoinJoin bem usado ajuda a fazer: trocar uma trilha muito nítida por uma trilha embaralhada, menos confiável e mais cara de reconstruir.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="relative py-24 md:py-36 px-6 md:px-12 lg:px-20" style={sectionBg.stripeLight}>
          <div className="max-w-[1600px] mx-auto">
            <motion.div {...fade(0)} className="mb-20 max-w-3xl">
              <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: COLORS.accent }}>Capítulo 03 · O Manual</span>
              <h2 className="text-[clamp(2.5rem,6vw,6rem)] font-black leading-[0.95] tracking-tight" style={{ color: COLORS.ink }}>
                Cinco pilares.<br/>
                <span style={{ color: COLORS.accent, fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>
                  Sem afogar o leitor em jargão.
                </span>
              </h2>
              <p className="mt-8 text-lg md:text-xl leading-[1.6] font-light max-w-2xl" style={{ color: COLORS.body }}>
                A ordem certa para alguém normal entender, não só para quem gosta de falar difícil: ideia, limite real, erro comum, disciplina operacional e custo de paciência.
              </p>
            </motion.div>

            <div className="space-y-32 md:space-y-40">
              {PILARES.map((p, i) => {
                const reverso = i % 2 === 1;
                return (
                  <motion.article key={p.num} {...fade(0.1)} className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
                    <div className={`lg:col-span-6 ${reverso ? 'lg:order-2' : ''}`}>
                      <div className="relative aspect-[4/5] overflow-hidden">
                        <img src={p.imagem} alt={p.titulo} loading="lazy" className="w-full h-full object-cover" />
                        <div className="absolute top-6 left-6 text-7xl md:text-8xl font-black opacity-95" style={{ color: COLORS.white, fontFamily: "'Inter Tight', sans-serif", textShadow: '0 4px 30px hsl(153 24% 18% / 0.45)' }}>
                          {p.num}
                        </div>
                      </div>
                    </div>
                    <div className={`lg:col-span-6 ${reverso ? 'lg:order-1' : ''}`}>
                      <p className="text-xs font-bold tracking-[0.4em] uppercase mb-4" style={{ color: COLORS.accent }}>Pilar {p.num}</p>
                      <h3 className="text-[clamp(1.85rem,3.5vw,3rem)] font-black leading-[1.05] tracking-tight mb-3" style={{ color: COLORS.ink }}>{p.titulo}</h3>
                      <p className="text-lg md:text-xl mb-8 font-light italic" style={{ color: COLORS.muted, fontFamily: "'Playfair Display', serif" }}>{p.subtitulo}</p>
                      <div className="space-y-5 mb-8 text-base md:text-lg leading-[1.7] font-light" style={{ color: COLORS.body }}>
                        {p.paragrafos.map((par, idx) => <p key={idx}>{par}</p>)}
                      </div>
                      <div className="border-t pt-6 mt-6" style={{ borderColor: 'hsl(153 18% 79% / 0.85)' }}>
                        <p className="text-xs font-bold tracking-[0.3em] uppercase mb-4" style={{ color: COLORS.accent }}>Práticas obrigatórias</p>
                        <ul className="space-y-3">
                          {p.praticas.map((pr, idx) => (
                            <li key={idx} className="flex items-start gap-3 text-base md:text-lg leading-[1.6]" style={{ color: COLORS.body }}>
                              <Shuffle size={18} className="shrink-0 mt-1" style={{ color: COLORS.accent }} />
                              <span>{pr}</span>
                            </li>
                          ))}
                        </ul>
                        <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full" style={{ backgroundColor: 'hsl(44 33% 97% / 0.76)', border: `1px solid ${COLORS.line}` }}>
                          <Calendar size={14} style={{ color: COLORS.ink }} />
                          <span className="text-sm font-semibold" style={{ color: COLORS.ink }}>{p.tempo}</span>
                        </div>
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="relative py-24 md:py-32 px-6 md:px-12 lg:px-20" style={sectionBg.darkSection}>
          <div className="max-w-[1600px] mx-auto">
            <motion.div {...fade(0)} className="mb-16 max-w-3xl">
              <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: COLORS.accent }}>Capítulo 04 · Onde quase todos tropeçam</span>
              <h2 className="text-[clamp(2.25rem,5vw,5rem)] font-black leading-[1] tracking-tight" style={{ color: COLORS.white }}>
                Seis armadilhas{' '}
                <span style={{ color: COLORS.accent, fontStyle: 'italic', fontWeight: 400, fontFamily: "'Playfair Display', serif" }}>
                  que desfazem privacidade boa.
                </span>
              </h2>
            </motion.div>
            <div className="grid md:grid-cols-2 gap-6">
              {ARMADILHAS.map((a, i) => (
                <motion.div key={i} {...fade(i * 0.05)} className="p-8 md:p-10" style={{ backgroundColor: 'hsl(44 33% 97% / 0.06)', border: '1px solid hsl(44 33% 97% / 0.12)' }}>
                  <AlertTriangle size={24} className="mb-5" style={{ color: COLORS.accent }} />
                  <h4 className="text-xl md:text-2xl font-bold leading-tight mb-4" style={{ color: COLORS.white }}>{a.titulo}</h4>
                  <p className="text-base md:text-lg leading-[1.65] font-light" style={{ color: 'hsl(44 33% 97% / 0.82)' }}>{a.detalhe}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="relative py-24 md:py-32 px-6 md:px-12 lg:px-20" style={sectionBg.privacyWash}>
          <div className="max-w-4xl mx-auto">
            <motion.div {...fade(0)} className="mb-12">
              <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: COLORS.accent }}>Capítulo 05 · FAQ</span>
              <h2 className="text-[clamp(2.25rem,5vw,4.5rem)] font-black leading-[1] tracking-tight" style={{ color: COLORS.ink }}>
                As oito perguntas{' '}
                <span style={{ color: COLORS.accent, fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>
                  que limpam a névoa inicial.
                </span>
              </h2>
            </motion.div>
            <div className="space-y-3">
              {FAQ.map((f, i) => {
                const open = openFaq === i;
                return (
                  <motion.div key={i} {...fade(i * 0.03)} className="border-b" style={{ borderColor: 'hsl(153 18% 79% / 0.9)' }}>
                    <button onClick={() => setOpenFaq(open ? null : i)} className="w-full flex items-center justify-between gap-4 py-6 text-left">
                      <span className="text-lg md:text-xl font-semibold leading-snug" style={{ color: COLORS.ink }}>{f.q}</span>
                      <ChevronDown size={22} className="shrink-0 transition-transform duration-300" style={{ color: COLORS.accent, transform: open ? 'rotate(180deg)' : 'rotate(0)' }} />
                    </button>
                    {open && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.4, ease: APPLE_EASE }} className="overflow-hidden">
                        <p className="pb-7 text-base md:text-lg leading-[1.7] font-light" style={{ color: COLORS.body }}>{f.a}</p>
                      </motion.div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="py-20 px-6 md:px-12 lg:px-20" style={sectionBg.darkSection}>
          <div className="max-w-[1600px] mx-auto text-center">
            <EyeOff size={32} className="mx-auto mb-6" style={{ color: COLORS.accent }} />
            <p className="text-xl md:text-3xl font-light leading-[1.5] max-w-3xl mx-auto" style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', color: COLORS.white }}>
              "Dinheiro forte sem privacidade suficiente vira patrimônio legível demais para olhos que você nunca convidou."
            </p>
            <p className="mt-6 text-xs font-bold tracking-[0.4em] uppercase" style={{ color: COLORS.accent }}>Lord Junnior · Privacidade em Camadas</p>
          </div>
        </section>
      </div>
    </>
  );
}
