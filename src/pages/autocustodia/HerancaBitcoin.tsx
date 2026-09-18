import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import { ChevronDown, Key, Users, FileText, AlertTriangle, ShieldCheck, Clock } from 'lucide-react';
import SeoHead from '@/components/SeoHead';
import BackToHome from '@/components/BackToHome';
import heroImg from '@/assets/autocustodia/heranca-hero.jpg';
import imgSucessao from '@/assets/autocustodia/heranca-sucessao.jpg';
import imgMultisig from '@/assets/autocustodia/heranca-multisig.jpg';
import imgCarta from '@/assets/autocustodia/heranca-carta.jpg';
import imgConfianca from '@/assets/autocustodia/heranca-confianca.jpg';
import imgCofre from '@/assets/autocustodia/heranca-cofre.jpg';
import imgArquivo from '@/assets/autocustodia/heranca-arquivo.jpg';

const APPLE_EASE = [0.22, 1, 0.36, 1] as const;
const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.8, ease: APPLE_EASE, delay },
});

// Paleta — pergaminho/brass/amber/sage profundo
const C = {
  page: 'hsl(36 34% 92%)',
  pageDeep: 'hsl(34 30% 88%)',
  ink: 'hsl(28 30% 14%)',
  body: 'hsl(28 18% 24%)',
  muted: 'hsl(28 10% 42%)',
  brass: 'hsl(35 58% 46%)',
  brassSoft: 'hsl(38 70% 84%)',
  ember: 'hsl(18 62% 44%)',
  sageDeep: 'hsl(150 18% 16%)',
  line: 'hsl(34 14% 72%)',
};

// FUNDOS DENSOS E PERCEPTÍVEIS — agora com mais saturação e textura
const noiseSvg = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0.15  0 0 0 0 0.10  0 0 0 0 0.05  0 0 0 0.55 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

const sectionBg = {
  parchment: {
    backgroundColor: C.page,
    backgroundImage: [
      'radial-gradient(ellipse 60% 50% at 8% 12%, hsl(38 70% 84% / 0.95), transparent 55%)',
      'radial-gradient(ellipse 55% 45% at 92% 88%, hsl(35 58% 46% / 0.32), transparent 55%)',
      'radial-gradient(ellipse 40% 35% at 80% 18%, hsl(18 62% 44% / 0.18), transparent 60%)',
      noiseSvg,
      'linear-gradient(165deg, hsl(36 34% 93%), hsl(34 28% 86%))',
    ].join(','),
    backgroundSize: 'auto, auto, auto, 200px 200px, auto',
  },
  brass: {
    backgroundColor: C.pageDeep,
    backgroundImage: [
      'radial-gradient(ellipse 70% 55% at 18% 22%, hsl(38 70% 84% / 0.9), transparent 50%)',
      'radial-gradient(ellipse 60% 50% at 85% 75%, hsl(35 58% 46% / 0.28), transparent 55%)',
      'repeating-linear-gradient(115deg, transparent 0, transparent 96px, hsl(35 58% 46% / 0.10) 97px, transparent 98px)',
      noiseSvg,
      'linear-gradient(180deg, hsl(34 30% 89%), hsl(32 26% 84%))',
    ].join(','),
    backgroundSize: 'auto, auto, auto, 200px 200px, auto',
  },
  dark: {
    backgroundColor: C.sageDeep,
    backgroundImage: [
      'radial-gradient(ellipse 60% 50% at 12% 18%, hsl(35 58% 46% / 0.28), transparent 50%)',
      'radial-gradient(ellipse 55% 45% at 88% 82%, hsl(18 62% 44% / 0.22), transparent 55%)',
      'radial-gradient(circle at 50% 50%, hsl(150 18% 22% / 0.6), transparent 70%)',
      noiseSvg,
      'linear-gradient(165deg, hsl(150 18% 16%), hsl(150 22% 12%))',
    ].join(','),
    backgroundSize: 'auto, auto, auto, 220px 220px, auto',
  },
  emberWash: {
    backgroundColor: C.page,
    backgroundImage: [
      'radial-gradient(ellipse 65% 50% at 50% 0%, hsl(18 62% 44% / 0.25), transparent 55%)',
      'radial-gradient(ellipse 55% 45% at 10% 90%, hsl(35 58% 46% / 0.30), transparent 55%)',
      'radial-gradient(ellipse 50% 40% at 90% 60%, hsl(38 70% 84% / 0.7), transparent 55%)',
      noiseSvg,
      'linear-gradient(180deg, hsl(36 34% 92%), hsl(34 28% 87%))',
    ].join(','),
    backgroundSize: 'auto, auto, auto, 200px 200px, auto',
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

const pilares: Pilar[] = [
  {
    num: '01',
    titulo: 'O problema sem volta',
    subtitulo: 'Bitcoin sem plano de sucessão é dinheiro perdido para sempre',
    imagem: imgCofre,
    paragrafos: [
      'Quando alguém morre com bitcoin em autocustódia e sem plano, as moedas ficam congeladas na rede para sempre. Não existe banco para ligar, não existe juiz que destrave, não existe formulário a preencher.',
      'Pense num cofre soldado dentro de uma montanha. A combinação morreu com o dono. O cofre continua lá, intacto, mas inacessível. É exatamente isso que acontece com sua seed phrase quando ninguém da família sabe onde ela está nem como usar.',
      'A herança bitcoin não é um detalhe técnico, é o ato final de responsabilidade. Sem ela, todo o esforço de acumulação vira pó digital.',
    ],
    praticas: [
      'Mapeie quanto bitcoin você tem hoje, em qual carteira, em qual dispositivo.',
      'Liste quem precisa receber, em que proporção, em que ordem de prioridade.',
      'Aceite que o plano precisa existir antes do imprevisto, nunca depois.',
    ],
    tempo: '20 min de honestidade',
  },
  {
    num: '02',
    titulo: 'A carta selada',
    subtitulo: 'O documento físico que conduz o herdeiro pela mão',
    imagem: imgCarta,
    paragrafos: [
      'A carta selada é o coração do plano. É um documento físico, escrito à mão, guardado em local conhecido por uma única pessoa de confiança absoluta, geralmente o cônjuge ou um filho adulto.',
      'Ela não contém a seed phrase. Contém o mapa: onde está a seed, como acessar, quem ajuda tecnicamente, em qual ordem agir. Funciona como o testamento de um navegador antigo, indica onde está o tesouro sem entregar a chave junto.',
      'A separação entre carta (instrução) e seed (chave) é o que garante segurança. Se um vazar, o outro continua protegendo o cofre.',
    ],
    praticas: [
      'Escreva à mão, com caneta de tinta permanente, em papel de gramatura alta.',
      'Inclua: nome do dispositivo, marca, onde está fisicamente, contato técnico de apoio.',
      'NÃO inclua: a seed phrase, a senha do dispositivo, nenhum dado que destrave sozinho.',
      'Selo de cera ou envelope lacrado revela tentativa de leitura prévia.',
    ],
    tempo: '40 min para redigir',
  },
  {
    num: '03',
    titulo: 'Multisig 2 de 3 familiar',
    subtitulo: 'Três chaves, três pessoas, nenhuma sozinha tem poder',
    imagem: imgMultisig,
    paragrafos: [
      'Multisig é uma carteira que exige assinaturas de várias chaves para mover fundos. O modelo 2 de 3 é o mais elegante para herança, três pessoas têm chaves, mas é preciso pelo menos duas para gastar.',
      'Pense numa caixa-forte de banco antigo com três fechaduras. Você guarda uma chave, seu cônjuge guarda outra, um terceiro de confiança (irmão, advogado, amigo de décadas) guarda a terceira. Ninguém sozinho destranca, mas qualquer dupla consegue.',
      'O resultado é resiliência total. Se você morre, cônjuge mais terceiro abrem. Se um dispositivo se perde, os outros dois resolvem. Se alguém é coagido, a coação isolada não basta.',
    ],
    praticas: [
      'Use Sparrow Wallet ou Nunchuk para coordenar o multisig de forma livre.',
      'Cada chave deve ficar em hardware diferente e em local geográfico distinto.',
      'Documente o descritor (xpub) da carteira em cópia física com cada signatário.',
      'Faça simulado anual de recuperação com a família, sem mover fundos reais.',
    ],
    tempo: '2 horas para configurar',
  },
  {
    num: '04',
    titulo: 'O timelock e o herdeiro frio',
    subtitulo: 'Programe o tempo para trabalhar a favor da sua família',
    imagem: imgArquivo,
    paragrafos: [
      'Timelock é um trecho de programação que diz: estes fundos só podem ser movidos depois de uma data ou após X blocos. É um cofre que destrava sozinho no futuro.',
      'Um uso clássico é deixar uma chave de emergência num cofre de banco com instrução de só ser aberta seis meses após sua morte comprovada. Se você ficou em coma e voltou, há tempo de cancelar. Se não voltou, a família destrava.',
      'Combinado com multisig, o timelock vira um seguro adicional contra erros, fraudes e impulsos. O bitcoin literalmente espera o tempo certo para mudar de mãos.',
    ],
    praticas: [
      'Estude o tipo CSV (CheckSequenceVerify) e CLTV (CheckLockTimeVerify) antes de usar.',
      'Comece com timelock curto (30 dias) para testar antes de configurar para anos.',
      'Documente exatamente quem destrava, quando, e como o relógio é contado.',
    ],
    tempo: '3 horas + estudo prévio',
  },
  {
    num: '05',
    titulo: 'O guardião técnico',
    subtitulo: 'A pessoa que sabe operar quando você não estiver mais',
    imagem: imgConfianca,
    paragrafos: [
      'Sua família ama você, mas pode não saber o que é uma seed phrase, um xpub ou um PSBT. O guardião técnico é alguém de confiança absoluta que entende a mecânica e pode conduzir os herdeiros pelo processo.',
      'Não precisa ser parente. Pode ser um amigo da comunidade bitcoin, um advogado especializado em ativos digitais, um profissional contratado para essa única função. O importante é que saiba operar e tenha vínculo de honra com você.',
      'Esse guardião nunca tem acesso aos fundos sozinho. Ele tem o conhecimento, a família tem as chaves. A combinação dos dois é o que destrava.',
    ],
    praticas: [
      'Escolha alguém com pelo menos cinco anos de experiência prática em autocustódia.',
      'Formalize o papel em documento simples, mesmo sem valor jurídico, cria compromisso.',
      'Atualize o nome do guardião sempre que sua vida muda (mudança, separação, novo filho).',
    ],
    tempo: '1 hora para definir',
  },
  {
    num: '06',
    titulo: 'O ensaio anual',
    subtitulo: 'Plano que nunca foi testado é plano que não existe',
    imagem: imgSucessao,
    paragrafos: [
      'Uma vez por ano, reúna as pessoas envolvidas no plano e faça um ensaio completo. Sem mover fundos reais, sem expor nada a risco, simulando o cenário de sua ausência total.',
      'O ensaio revela falhas que ninguém imaginava. A senha do gestor de senhas que mudou. O endereço do cofre que ninguém lembra. O guardião técnico que mudou de cidade. Pequenas falhas que, no momento real, viram desastre.',
      'Pense como um piloto comercial. Ninguém aceita voar com pilotos que nunca treinaram pouso de emergência. Sua família não deveria depender de um plano nunca testado.',
    ],
    praticas: [
      'Marque data fixa no calendário, mesmo dia todo ano (aniversário do plano).',
      'Simule recuperação completa numa carteira de teste com fundos simbólicos.',
      'Documente o que deu errado e ajuste o plano antes do próximo aniversário.',
    ],
    tempo: '3 horas por ano',
  },
];

const armadilhas = [
  { titulo: 'Seed na nuvem', desc: 'Foto da seed no Google Drive ou iCloud é sentença de morte do plano. Qualquer invasão da conta executa o roubo.' },
  { titulo: 'Confiar num único humano', desc: 'Entregar a seed inteira para uma pessoa só, mesmo cônjuge, transforma o plano de herança em ponto único de falha.' },
  { titulo: 'Esconder demais', desc: 'Esquemas tão criativos que ninguém vai descobrir. Você morre, o tesouro morre junto. Esconder não é o objetivo.' },
  { titulo: 'Não documentar a marca', desc: 'A família encontra a seed mas não sabe que é Bitcoin, em qual carteira restaurar, qual derivação usar.' },
  { titulo: 'Plano feito uma vez', desc: 'Plano de cinco anos atrás com cônjuge que não está mais junto, num apartamento que não é mais seu.' },
  { titulo: 'Misturar com inventário formal', desc: 'Declarar bitcoin no inventário expõe os herdeiros a tributação agressiva, fiscalização e risco de bloqueio.' },
];

const faq = [
  { q: 'Posso simplesmente colocar a seed no testamento?', a: 'Não. Testamento é documento público após o falecimento, qualquer pessoa do cartório pode ler. A seed precisa estar fora de qualquer documento oficial e ser entregue por um caminho privado, físico, controlado.' },
  { q: 'E se meu cônjuge não entende nada de Bitcoin?', a: 'Por isso existe o guardião técnico e a carta selada com instruções passo a passo. O cônjuge não precisa ser técnico, precisa apenas saber acionar o guardião e seguir o roteiro escrito.' },
  { q: 'Multisig 2 de 3 não é complexo demais para minha família?', a: 'A complexidade está na configuração inicial, não no uso. Uma vez montado e documentado, a operação real é simples. O ensaio anual garante que todos saibam executar.' },
  { q: 'Onde guardo a carta selada com segurança?', a: 'Cofre de papel à prova de fogo dentro de casa, cofre de banco em nome de pessoa de confiança, ou divisão da carta em duas partes guardadas em locais distintos. Nunca em apenas um lugar.' },
  { q: 'Preciso de advogado para fazer plano de herança bitcoin?', a: 'Não obrigatoriamente, mas advogado especializado em ativos digitais ajuda a alinhar o plano técnico com a legislação sucessória. Use advogado para a parte legal, nunca para guardar a seed.' },
  { q: 'Quanto bitcoin justifica esse trabalho todo?', a: 'Qualquer quantidade que faça falta para sua família perder. Para muitos, isso começa em valores baixos. O custo do plano é o mesmo, o risco de não ter cresce com cada satoshi acumulado.' },
  { q: 'E se eu mudar de carteira ou de hardware?', a: 'Toda mudança técnica exige atualização imediata da carta selada e aviso ao guardião. Plano desatualizado é plano falso, dá segurança emocional sem segurança real.' },
  { q: 'Posso usar serviços de custódia para resolver isso?', a: 'Custódia transfere o problema, não resolve. A empresa custodiante pode falir, ser hackeada, ser bloqueada por governo ou simplesmente recusar a liberação por exigências documentais impossíveis.' },
];

export default function HerancaBitcoin() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div style={{ backgroundColor: C.page, color: C.body }}>
      <SeoHead
        custom={{
          title: 'Herança Bitcoin: Plano de Sucessão Soberano | Manual Completo',
          description:
            'Manual definitivo de herança bitcoin: carta selada, multisig 2 de 3, timelock, guardião técnico e ensaio anual. Garanta que sua família receba o que você acumulou.',
          canonical: 'https://lordjunnior.com.br/autocustodia/heranca-bitcoin',
        }}
        faqItems={faq.map((f) => ({ question: f.q, answer: f.a }))}
      />
      <BackToHome />

      {/* HERO 88vh full-bleed */}
      <section ref={heroRef} className="relative w-full overflow-hidden" style={{ height: '88vh', minHeight: 720 }}>
        <motion.div
          style={{
            y: heroY,
            scale: heroScale,
            backgroundImage: `url(${heroImg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
          className="absolute inset-0 will-change-transform"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, hsl(28 30% 8% / 0.55) 0%, hsl(28 30% 8% / 0.30) 35%, hsl(28 30% 8% / 0.65) 100%)',
          }}
        />
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 60% 40% at 30% 70%, hsl(35 58% 46% / 0.30), transparent 60%)' }} />

        <div className="relative h-full flex flex-col justify-end pb-20 md:pb-28 px-6 md:px-16 max-w-[1700px] mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: APPLE_EASE }}
            className="font-mono text-xs md:text-sm tracking-[0.4em] uppercase mb-6"
            style={{ color: C.brassSoft, textShadow: '0 2px 8px rgba(0,0,0,0.6)' }}
          >
            Autocustódia · Capítulo Final
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.1, ease: APPLE_EASE, delay: 0.15 }}
            className="font-black leading-[0.92] tracking-tight mb-8"
            style={{
              fontFamily: '"Inter Tight", sans-serif',
              fontWeight: 900,
              fontSize: 'clamp(2.75rem, 8.5vw, 7.5rem)',
              color: '#f4ede0',
              textShadow: '0 4px 24px rgba(0,0,0,0.7)',
            }}
          >
            Herança<br />
            <em style={{ fontFamily: '"Playfair Display", serif', fontStyle: 'italic', fontWeight: 700, color: C.brassSoft, textShadow: '0 0 40px hsl(35 58% 46% / 0.6), 0 4px 24px rgba(0,0,0,0.8)' }}>
              que sobrevive
            </em><br />
            ao silêncio.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: APPLE_EASE, delay: 0.4 }}
            className="text-lg md:text-2xl max-w-3xl leading-relaxed"
            style={{ color: '#e8dcc6', textShadow: '0 2px 12px rgba(0,0,0,0.6)' }}
          >
            O bitcoin que você guardou só vira herança real se houver um plano físico,
            testado e impossível de quebrar por uma única falha humana.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.2, delay: 1 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            style={{ color: C.brassSoft }}
          >
            <span className="font-mono text-[10px] tracking-[0.3em] uppercase">Role para começar</span>
            <ChevronDown className="w-5 h-5 animate-bounce" />
          </motion.div>
        </div>
      </section>

      {/* PROVOCAÇÃO INICIAL — fundo pergaminho com textura visível */}
      <section className="relative py-28 md:py-40 px-6 md:px-16 overflow-hidden" style={sectionBg.parchment}>
        <div className="max-w-[1400px] mx-auto relative">
          <motion.div {...fade()} className="grid md:grid-cols-12 gap-12 items-center">
            <div className="md:col-span-7">
              <p className="font-mono text-xs tracking-[0.4em] uppercase mb-8" style={{ color: C.brass }}>
                A pergunta que ninguém quer fazer
              </p>
              <h2
                className="font-black leading-[0.95] mb-10"
                style={{
                  fontFamily: '"Inter Tight", sans-serif',
                  fontWeight: 900,
                  fontSize: 'clamp(2rem, 5.5vw, 4.75rem)',
                  color: C.ink,
                }}
              >
                Se você morresse{' '}
                <em style={{ fontFamily: '"Playfair Display", serif', fontWeight: 700, fontStyle: 'italic', color: C.ember }}>
                  esta noite
                </em>
                , sua família conseguiria acessar seu bitcoin amanhã?
              </h2>
              <p className="text-xl md:text-2xl leading-relaxed" style={{ color: C.body }}>
                Para a maioria absoluta dos investidores em autocustódia, a resposta honesta é não.
                A seed está num lugar que ninguém conhece, no formato que ninguém entende, com instruções
                que nunca foram escritas. O bitcoin acumulado morre na rede com você.
              </p>
            </div>
            <div className="md:col-span-5">
              <motion.img
                {...fade(0.15)}
                src={imgArquivo}
                alt="Caixa de madeira com plano de sucessão e plate de aço"
                width={1920} height={1200}
                loading="lazy"
                className="w-full h-auto rounded-sm shadow-2xl"
                style={{ boxShadow: '0 40px 80px -20px hsl(28 30% 14% / 0.5)' }}
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* PILARES — alternando fundos densos */}
      {pilares.map((p, i) => {
        const bgs = [sectionBg.brass, sectionBg.dark, sectionBg.emberWash, sectionBg.parchment, sectionBg.brass, sectionBg.dark];
        const isDark = i === 1 || i === 5;
        const reverse = i % 2 === 1;
        const textColor = isDark ? '#f0e6d4' : C.ink;
        const bodyColor = isDark ? '#d8cdb6' : C.body;
        const accentColor = isDark ? C.brassSoft : C.ember;
        const labelColor = isDark ? C.brassSoft : C.brass;

        return (
          <section key={p.num} className="relative py-28 md:py-40 px-6 md:px-16 overflow-hidden" style={bgs[i]}>
            <div className="max-w-[1500px] mx-auto relative">
              <div className={`grid md:grid-cols-12 gap-12 md:gap-20 items-center ${reverse ? 'md:[direction:rtl]' : ''}`}>
                <motion.div {...fade()} className="md:col-span-6 md:[direction:ltr]">
                  <img
                    src={p.imagem}
                    alt={p.titulo}
                    width={1920} height={1200}
                    loading="lazy"
                    className="w-full h-auto rounded-sm"
                    style={{ boxShadow: isDark ? '0 40px 80px -20px rgba(0,0,0,0.7)' : '0 40px 80px -20px hsl(28 30% 14% / 0.45)' }}
                  />
                </motion.div>
                <motion.div {...fade(0.15)} className="md:col-span-6 md:[direction:ltr]">
                  <div className="flex items-baseline gap-6 mb-8">
                    <span className="font-mono text-7xl md:text-8xl font-black leading-none" style={{ color: accentColor, opacity: 0.85 }}>
                      {p.num}
                    </span>
                    <span className="font-mono text-xs tracking-[0.4em] uppercase" style={{ color: labelColor }}>
                      {p.tempo}
                    </span>
                  </div>
                  <h3
                    className="font-black leading-[0.95] mb-6"
                    style={{
                      fontFamily: '"Inter Tight", sans-serif',
                      fontWeight: 900,
                      fontSize: 'clamp(1.875rem, 4.5vw, 3.75rem)',
                      color: textColor,
                    }}
                  >
                    {p.titulo}
                  </h3>
                  <p
                    className="mb-10 italic"
                    style={{
                      fontFamily: '"Playfair Display", serif',
                      fontWeight: 700,
                      fontSize: 'clamp(1.25rem, 2vw, 1.625rem)',
                      color: accentColor,
                      textShadow: isDark ? '0 0 24px hsl(35 58% 46% / 0.4)' : 'none',
                    }}
                  >
                    {p.subtitulo}
                  </p>
                  <div className="space-y-6 mb-10">
                    {p.paragrafos.map((par, idx) => (
                      <p key={idx} className="text-lg md:text-xl leading-relaxed" style={{ color: bodyColor }}>
                        {par}
                      </p>
                    ))}
                  </div>
                  <div className="border-l-2 pl-6" style={{ borderColor: accentColor }}>
                    <p className="font-mono text-[11px] tracking-[0.3em] uppercase mb-4" style={{ color: labelColor }}>
                      Práticas concretas
                    </p>
                    <ul className="space-y-3">
                      {p.praticas.map((pr, idx) => (
                        <li key={idx} className="flex gap-4 text-base md:text-lg leading-relaxed" style={{ color: bodyColor }}>
                          <span style={{ color: accentColor }} className="font-bold mt-1">·</span>
                          <span>{pr}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>
        );
      })}

      {/* ARMADILHAS — fundo brass com textura forte */}
      <section className="relative py-28 md:py-40 px-6 md:px-16 overflow-hidden" style={sectionBg.brass}>
        <div className="max-w-[1500px] mx-auto relative">
          <motion.div {...fade()} className="text-center max-w-4xl mx-auto mb-20">
            <p className="font-mono text-xs tracking-[0.4em] uppercase mb-6" style={{ color: C.ember }}>
              <AlertTriangle className="inline w-4 h-4 mr-2 -mt-1" />
              Erros que destroem o plano inteiro
            </p>
            <h2
              className="font-black leading-[0.95]"
              style={{
                fontFamily: '"Inter Tight", sans-serif',
                fontWeight: 900,
                fontSize: 'clamp(2.25rem, 6vw, 5rem)',
                color: C.ink,
              }}
            >
              Seis armadilhas que{' '}
              <em style={{ fontFamily: '"Playfair Display", serif', fontWeight: 700, fontStyle: 'italic', color: C.ember }}>
                anulam
              </em>{' '}
              tudo.
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {armadilhas.map((a, i) => (
              <motion.div
                key={i}
                {...fade(i * 0.05)}
                className="p-10 rounded-sm transition-all duration-500 hover:-translate-y-2"
                style={{
                  backgroundColor: 'hsl(36 34% 96% / 0.92)',
                  border: '1px solid hsl(34 14% 72% / 0.6)',
                  boxShadow: '0 20px 50px -20px hsl(28 30% 14% / 0.35)',
                  backdropFilter: 'blur(8px)',
                }}
              >
                <span className="font-mono text-sm font-bold" style={{ color: C.ember }}>0{i + 1}</span>
                <h3
                  className="text-2xl md:text-3xl font-black mt-3 mb-5 leading-tight"
                  style={{ fontFamily: '"Inter Tight", sans-serif', fontWeight: 900, color: C.ink }}
                >
                  {a.titulo}
                </h3>
                <p className="text-base leading-relaxed" style={{ color: C.body }}>
                  {a.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ — fundo escuro denso */}
      <section className="relative py-28 md:py-40 px-6 md:px-16 overflow-hidden" style={sectionBg.dark}>
        <div className="max-w-5xl mx-auto relative">
          <motion.div {...fade()} className="text-center mb-20">
            <p className="font-mono text-xs tracking-[0.4em] uppercase mb-6" style={{ color: C.brassSoft }}>
              Perguntas honestas, respostas diretas
            </p>
            <h2
              className="font-black leading-[0.95]"
              style={{
                fontFamily: '"Inter Tight", sans-serif',
                fontWeight: 900,
                fontSize: 'clamp(2.25rem, 6vw, 5rem)',
                color: '#f4ede0',
              }}
            >
              O que sua família{' '}
              <em style={{ fontFamily: '"Playfair Display", serif', fontWeight: 700, fontStyle: 'italic', color: C.brassSoft, textShadow: '0 0 32px hsl(35 58% 46% / 0.6)' }}>
                vai perguntar
              </em>.
            </h2>
          </motion.div>

          <div className="space-y-4">
            {faq.map((item, i) => (
              <motion.div
                key={i}
                {...fade(i * 0.04)}
                className="rounded-sm overflow-hidden"
                style={{
                  border: '1px solid hsl(35 58% 46% / 0.2)',
                  backgroundColor: 'hsl(150 18% 20% / 0.7)',
                  backdropFilter: 'blur(6px)',
                }}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full text-left p-7 md:p-9 flex justify-between items-start gap-6 transition-colors hover:bg-white/5"
                >
                  <span
                    className="text-lg md:text-xl font-bold leading-snug"
                    style={{ fontFamily: '"Inter Tight", sans-serif', color: '#f4ede0' }}
                  >
                    {item.q}
                  </span>
                  <ChevronDown
                    className="w-6 h-6 flex-shrink-0 mt-1 transition-transform duration-500"
                    style={{
                      color: C.brassSoft,
                      transform: openFaq === i ? 'rotate(180deg)' : 'rotate(0)',
                    }}
                  />
                </button>
                {openFaq === i && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ duration: 0.5, ease: APPLE_EASE }}
                    className="px-7 md:px-9 pb-7 md:pb-9"
                  >
                    <p className="text-base md:text-lg leading-relaxed" style={{ color: '#d8cdb6' }}>
                      {item.a}
                    </p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FECHO MANIFESTO — fundo ember intenso */}
      <section className="relative py-32 md:py-44 px-6 md:px-16 overflow-hidden" style={sectionBg.emberWash}>
        <div className="max-w-5xl mx-auto text-center relative">
          <motion.div {...fade()}>
            <ShieldCheck className="w-12 h-12 mx-auto mb-10" style={{ color: C.ember }} />
            <p className="font-mono text-xs tracking-[0.4em] uppercase mb-8" style={{ color: C.brass }}>
              O ato final de responsabilidade
            </p>
            <h2
              className="font-black leading-[0.95] mb-12"
              style={{
                fontFamily: '"Inter Tight", sans-serif',
                fontWeight: 900,
                fontSize: 'clamp(2.5rem, 7vw, 6rem)',
                color: C.ink,
              }}
            >
              Acumular bitcoin é o começo.<br />
              <em style={{ fontFamily: '"Playfair Display", serif', fontWeight: 700, fontStyle: 'italic', color: C.ember }}>
                Garantir que ele atravesse gerações
              </em>
              <br />é o que separa um especulador de um patriarca.
            </h2>
            <p className="text-xl md:text-2xl leading-relaxed max-w-3xl mx-auto" style={{ color: C.body }}>
              Faça o plano. Escreva a carta. Configure o multisig. Ensaie com a família.
              Não deixe que sua disciplina de uma década vire pó por causa de um erro de uma noite.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}