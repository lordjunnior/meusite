import { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  ShieldCheck, ChevronDown, AlertTriangle, Hammer, Calendar, Vault,
} from 'lucide-react';
import SeoHead from '@/components/SeoHead';
import BackToHome from '@/components/BackToHome';
import heroImg from '@/assets/autocustodia/seed-aco-hero.jpg';
import imgFogo from '@/assets/autocustodia/seed-aco-fogo.jpg';
import imgComparativo from '@/assets/autocustodia/seed-aco-comparativo.jpg';
import imgGravacao from '@/assets/autocustodia/seed-aco-gravacao.jpg';
import imgResistencia from '@/assets/autocustodia/seed-aco-resistencia.jpg';
import imgArmazenamento from '@/assets/autocustodia/seed-aco-armazenamento.jpg';

const APPLE_EASE = [0.22, 1, 0.36, 1] as const;
const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.8, ease: APPLE_EASE, delay },
});

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
    titulo: 'Por que papel falha',
    subtitulo: 'Fogo, água, mofo, pressa e erro humano',
    imagem: imgFogo,
    paragrafos: [
      'Seed phrase em papel funciona enquanto nada dá errado. O problema é que a vida real é exatamente o lugar onde as coisas dão errado. Incêndio, infiltração, mofo, cupim, tinta apagando com o tempo, papel dobrado e rasgado, alguém jogando fora por achar que é um rabisco velho. O papel não foi feito para herdar patrimônio por décadas.',
      'Pense assim: sua seed é a chave mestra do seu cofre. Escrever essa chave em papel é como guardar a escritura da sua casa em guardanapo de bar. Até pode funcionar por um tempo. Mas se você está protegendo um ativo que pretende carregar por 10, 20 ou 30 anos, o material do backup precisa ser mais forte que o risco que ele enfrenta.',
      'O aço resolve exatamente isso. A palavra fica gravada fisicamente no metal. Não depende de tinta, não depende de bateria, não depende de memória digital. O aço aguenta calor muito acima do que o papel suporta, não dissolve em uma enchente doméstica e sobrevive ao tempo sem virar pó.',
    ],
    praticas: [
      'Se sua seed ainda está só no papel, trate isso como urgência real',
      'Nunca use foto, print ou nota no celular como backup principal',
      'Considere o aço obrigatório acima de qualquer valor que faria você passar mal ao perder',
      'Mantenha papel apenas como rascunho temporário durante a gravação, depois destrua',
    ],
    tempo: 'Migração inicial: 1 a 2 horas',
  },
  {
    num: '02',
    titulo: 'Qual sistema escolher',
    subtitulo: 'Placa gravada, cápsula com letras ou pontos',
    imagem: imgComparativo,
    paragrafos: [
      'Existem três famílias principais. A primeira é a placa gravada ou estampada: você escreve as palavras diretamente em uma chapa de aço ou titânio usando punção de letras. É simples, barato e extremamente robusto. A segunda é o sistema modular com pecinhas de letras, como Cryptosteel ou Billfodl: você encaixa letras pré-fabricadas dentro de um suporte metálico. É limpo, organizado e reduz erro de alinhamento. A terceira é o método por pontos, em que você marca as primeiras quatro letras usando furos ou coordenadas — mais compacto, mas menos intuitivo para iniciantes.',
      'Para a maioria das pessoas, a melhor escolha é a mais simples que realmente será feita. Não adianta comprar um kit sofisticado e deixar na gaveta por seis meses. Uma placa de inox 304 com punção manual já resolve o problema principal. O inimigo não é a falta de sofisticação. O inimigo é o atraso e a preguiça operacional.',
      'Se você quer analogia simples: placa gravada é o fusca — robusto e consertável; cápsula modular é o Corolla — mais caro, mas confortável; método por pontos é a moto de trilha — eficiente, porém exige mais prática. Para iniciante, vá de fusca ou Corolla. Deixe a trilha para depois.',
    ],
    praticas: [
      'Escolha um sistema que você consiga montar neste fim de semana, sem depender de importação futura',
      'Para BIP39, lembrar: as 4 primeiras letras já distinguem cada palavra da lista',
      'Evite soluções muito proprietárias sem clareza de leitura manual futura',
      'Teste legibilidade com outra pessoa antes de considerar o backup pronto',
    ],
    tempo: 'Escolha e compra: 1 tarde',
  },
  {
    num: '03',
    titulo: 'Como gravar sem erro',
    subtitulo: 'Devagar, conferindo palavra por palavra',
    imagem: imgGravacao,
    paragrafos: [
      'O maior risco do backup em aço não é o material. É o ser humano gravar errado. Uma única letra errada em uma palavra pode travar a recuperação inteira. Por isso a gravação precisa ser tratada como cirurgia, não como artesanato apressado. Ambiente calmo, mesa estável, sem telefone tocando, sem criança correndo, sem pressa de terminar logo.',
      'O protocolo mais seguro é: escreva a lista correta em papel temporário, confira duas vezes com a carteira, grave apenas uma palavra por vez, volte e confira a palavra no metal antes de seguir para a próxima. No fim, faça leitura completa do metal apontando com o dedo e comparando com a seed original. Só depois descarte o rascunho.',
      'Muita gente complica demais. Não precisa. Se você já consegue copiar corretamente um número de documento sem errar, consegue gravar seed em aço. O segredo é reduzir distração. Pense nisso como preencher um cheque alto: você não faz no escuro, falando no telefone e andando pela casa.',
    ],
    praticas: [
      'Grave as 4 primeiras letras ou a palavra inteira, mas padronize do começo ao fim',
      'Use iluminação forte e posição confortável de trabalho',
      'Após cada palavra, marque um check manual no rascunho temporário',
      'Faça uma leitura final completa antes de encerrar e destruir o papel',
    ],
    tempo: '12 palavras: 30 a 60 min · 24 palavras: 60 a 120 min',
  },
  {
    num: '04',
    titulo: 'Onde esconder e como dividir',
    subtitulo: 'Não basta resistir ao fogo. Precisa resistir ao mundo.',
    imagem: imgArmazenamento,
    paragrafos: [
      'Backup forte em material fraco é burrice. Mas backup forte em material forte, guardado em lugar óbvio, também é. O objetivo não é só sobreviver ao incêndio. É sobreviver a roubo, visita curiosa, mudança forçada, divórcio conturbado, prestador de serviço dentro da casa, e até ao seu próprio esquecimento futuro.',
      'O mínimo aceitável é ter duas cópias em aço em locais diferentes. Uma em casa, escondida de forma inteligente. Outra fora de casa, em local controlado e de confiança. Pode ser um cofre discreto embutido, um compartimento estrutural não óbvio, ou um cofre externo. Uma única cópia é ponto único de falha. Patrimônio sério não aceita ponto único de falha.',
      'Analogia simples: ter só uma cópia da seed é como andar de carro sem estepe. Você pode ficar anos achando que está tudo bem. Até o dia em que precisa — e descobre tarde demais que montou um sistema frágil. O segundo backup não é exagero. É o mínimo para dormir direito.',
    ],
    praticas: [
      'Tenha sempre duas cópias físicas em endereços diferentes',
      'Nunca rotule externamente como seed, bitcoin, carteira ou backup',
      'Evite guardar junto com hardware wallet, passphrase e instruções completas',
      'Se houver passphrase separada, mantenha distância física real entre os elementos',
    ],
    tempo: 'Setup de redundância: 1 fim de semana',
  },
  {
    num: '05',
    titulo: 'Teste de recuperação e herança',
    subtitulo: 'Backup bom é backup que já foi testado',
    imagem: imgResistencia,
    paragrafos: [
      'Muita gente grava a seed em aço e considera missão cumprida. Ainda não. Backup que nunca foi testado é fé, não segurança. O certo é fazer uma recuperação completa com um dispositivo limpo ou carteira separada, usando exatamente o que está gravado no metal. Se a carteira abrir corretamente, o backup está validado. Se não abrir, você descobriu o erro no momento certo.',
      'O segundo ponto é sucessão. Se você morrer amanhã, alguém de confiança conseguiria entender que existe um patrimônio, encontrar as peças certas e seguir instruções mínimas? Não precisa entregar tudo mastigado. Mas precisa existir um caminho de recuperação para a família, com clareza suficiente para não transformar herança em cinza tecnológica.',
      'A melhor imagem mental é esta: o backup em aço é o casco do navio. O teste de recuperação é colocar o navio na água. E o plano de herança é garantir que outra pessoa saiba pilotar caso você não esteja mais no leme. Segurança real é sistema completo, não peça isolada.',
    ],
    praticas: [
      'Faça ao menos 1 teste completo de restauração após gravar',
      'Revise anualmente se os locais de guarda continuam seguros e acessíveis',
      'Crie instruções mínimas para herdeiros sem revelar tudo em um único documento',
      'Se o patrimônio crescer, evolua depois para arranjo com passphrase ou multisig',
    ],
    tempo: 'Teste inicial: 30 min · revisão anual: 15 min',
  },
];

const ARMADILHAS = [
  { titulo: 'Gravar palavras que não pertencem ao BIP39', detalhe: 'As imagens podem sugerir palavras bonitas, mas a carteira só entende as palavras oficiais da lista BIP39. Se a palavra gravada não está na lista, o backup é lixo metálico bonito. Sempre confira contra a carteira real.' },
  { titulo: 'Guardar uma única cópia', detalhe: 'Aço não quebra fácil, mas pode sumir junto com a casa, o carro, a mochila ou a sua memória do esconderijo. Uma cópia só continua sendo um ponto único de falha. O aço aumenta a resistência do material, não elimina risco operacional.' },
  { titulo: 'Guardar tudo no mesmo lugar', detalhe: 'Seed em aço, hardware wallet, PIN, passphrase e instruções no mesmo cofre é convite ao desastre. Quem encontra um, leva tudo. Separe funções. Segurança não é só fortalecer. É também fragmentar o acesso.' },
  { titulo: 'Fazer sem teste de restauração', detalhe: 'Muita gente grava, esconde e nunca testa. Descobre o erro só anos depois, quando precisa. Testar não é opcional. É a única forma de saber se a gravação ficou legível e correta.' },
  { titulo: 'Mostrar o backup para impressionar amigo', detalhe: 'O melhor backup é o que ninguém sabe que existe. Segurança performática destrói segurança real. Não fotografe, não poste, não mostre em grupo, não exiba em vídeo. Discrição é camada de proteção.' },
  { titulo: 'Achar que aço substitui todo o resto', detalhe: 'Aço resolve resistência física. Não resolve phishing, golpe, seed digitada em site falso, hardware adulterado, ou passphrase esquecida. O metal é uma camada. Não é o sistema inteiro.' },
];

const FAQ = [
  { q: 'Vale a pena fazer backup em aço mesmo com pouco Bitcoin?', a: 'Se a perda desse valor faria falta real, sim. Não é questão de status. É questão de proporcionalidade. O custo de uma solução simples em aço é pequeno perto do custo emocional e financeiro de perder tudo por incêndio, água ou papel degradado.' },
  { q: 'Preciso gravar as 24 palavras completas?', a: 'Não necessariamente. No padrão BIP39, as 4 primeiras letras já identificam cada palavra da lista. Muita gente grava apenas 4 letras por eficiência. Iniciante pode preferir a palavra inteira por clareza visual. O importante é padronizar e conferir.' },
  { q: 'Inox comum serve ou precisa titânio?', a: 'Inox 304 ou 316 já resolve muito bem para a maioria dos cenários domésticos. Titânio é excelente, mais leve e muito resistente, mas mais caro. O salto real de segurança está em sair do papel e ir para o metal. Depois você otimiza o tipo de metal.' },
  { q: 'Posso mandar gravar em loja?', a: 'Não deve. Quem grava vê a seed. Seed vista por terceiro deixa de ser sua. A gravação precisa ser feita por você, sozinho, em ambiente controlado. Terceirizar esse passo é como entregar a chave do cofre para alguém e pedir que devolva depois.' },
  { q: 'É melhor punção manual ou sistema de letras prontas?', a: 'Para quem quer baixo custo, punção manual. Para quem quer montagem mais limpa e menos esforço físico, sistema de letras prontas. Os dois funcionam. Escolha o que você realmente vai executar sem procrastinar.' },
  { q: 'Posso guardar seed e passphrase em duas placas diferentes?', a: 'Sim, e muitas vezes esse é o arranjo ideal. A seed fica em um local. A passphrase, em outro. Separadas, elas reduzem o risco de um único achado comprometer tudo. Mas isso só funciona se você tiver processo claro para não perder nenhuma das duas.' },
  { q: 'E se um herdeiro não entender Bitcoin?', a: 'Você precisa deixar um trilho simples, não um tratado técnico. Algo como: existe patrimônio digital, existe uma pessoa de confiança ou instrução complementar, e estes objetos não podem ser descartados. A página de herança que faremos depois aprofunda isso.' },
  { q: 'Qual o erro mais comum?', a: 'Erro de gravação seguido por ausência de teste. A pessoa acha que gravou certo, esconde, nunca restaura e anos depois descobre que faltava letra, sobrou palavra ou a ordem ficou errada. O teste de recuperação elimina o erro mais caro.' },
];

function Hero() {
  const { scrollY } = useScroll();
  const yBg = useTransform(scrollY, [0, 800], [0, 200]);
  const opacityContent = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    <section className="relative h-[88vh] min-h-[640px] w-full overflow-hidden" style={{ backgroundColor: '#1a1c1f' }}>
      <motion.div className="absolute inset-0" style={{ y: yBg }}>
        <img src={heroImg} alt="" fetchPriority="high" className="w-full h-full object-cover scale-110" style={{ filter: 'saturate(1.02) contrast(1.05)' }} loading="eager" fetchPriority="high" decoding="async" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(26,28,31,0.45) 0%, rgba(26,28,31,0.28) 35%, rgba(236,228,211,0.05) 70%, #ece4d3 100%)' }} />
      </motion.div>

      <motion.div className="relative z-10 h-full flex flex-col justify-end px-6 md:px-12 lg:px-20 pb-20 md:pb-28" style={{ opacity: opacityContent }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: APPLE_EASE }} className="inline-flex items-center gap-3 mb-6 self-start px-4 py-2 rounded-full backdrop-blur-md" style={{ backgroundColor: 'rgba(236,228,211,0.16)', border: '1px solid rgba(236,228,211,0.28)' }}>
          <Hammer size={16} style={{ color: '#ece4d3' }} />
          <span className="text-[11px] md:text-xs font-bold tracking-[0.3em] uppercase" style={{ color: '#ece4d3' }}>
            Backup Metálico · Manual Definitivo
          </span>
        </motion.div>

        <motion.h1 initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} transition={{ duration: 1, delay: 0.15, ease: APPLE_EASE }} className="text-[clamp(2.75rem,8.5vw,7.5rem)] font-black leading-[0.95] tracking-tight max-w-[18ch]" style={{ fontFamily: "'Inter Tight', sans-serif", color: '#ece4d3' }}>
          O papel esquece.<br/>
          <span style={{ color: '#f7931a', fontStyle: 'italic', fontWeight: 400, fontFamily: "'Playfair Display', serif", textShadow: '0 0 40px rgba(247,147,26,0.45), 0 0 80px rgba(247,147,26,0.25)' }}>
            o aço lembra.
          </span>
        </motion.h1>

        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.5, ease: APPLE_EASE }} className="mt-8 max-w-2xl text-lg md:text-2xl leading-relaxed font-light" style={{ color: 'rgba(236,228,211,0.92)', fontFamily: "'Inter Tight', sans-serif" }}>
          O manual definitivo para transformar sua seed phrase em um backup que sobrevive a fogo, água, tempo e descuido. Segurança física simples, séria e executável.
        </motion.p>
      </motion.div>
    </section>
  );
}

export default function SeedPhraseAco() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <>
      <SeoHead
        path="/autocustodia/seed-phrase-em-aco"
        custom={{
          title: 'Seed Phrase em Aço: Backup Metálico para Bitcoin',
          description: 'Manual completo para gravar seed phrase em aço: por que papel falha, quais sistemas escolher, como gravar sem erro e onde esconder com segurança real.',
          canonical: 'https://lordjunnior.com.br/autocustodia/seed-phrase-em-aco',
          primaryKeyword: 'seed phrase em aço',
          lsiKeywords: ['backup metálico bitcoin', 'seed phrase metal', 'placa de aço bitcoin', 'BIP39 em aço', 'backup resistente ao fogo'],
          longTailKeywords: ['como gravar seed phrase em aço', 'backup bitcoin resistente ao fogo', 'placa metálica para seed phrase', 'como guardar seed phrase com segurança'],
          breadcrumbs: [
            { name: 'Início', url: '/' },
            { name: 'Autocustódia', url: '/autocustodia' },
            { name: 'Seed Phrase em Aço', url: '/autocustodia/seed-phrase-em-aco' },
          ],
          schemaType: 'Article',
          articleSection: 'Autocustódia & Segurança',
          relatedPages: ['/autocustodia', '/multisig-bitcoin', '/mobilidade-de-chaves', '/autocustodia/hardware-wallet-diy-bitcoin'],
        }}
        faqItems={FAQ.map((f) => ({ question: f.q, answer: f.a }))}
      />

      <div className="relative min-h-screen" style={{ backgroundColor: '#ece4d3', color: '#191512', fontFamily: "'Inter Tight', sans-serif" }}>
        <div className="absolute top-0 left-0 right-0 z-30 px-6 md:px-12 lg:px-20 pt-[52px]">
          <BackToHome />
        </div>

        <Hero />

        <section className="relative px-6 md:px-12 lg:px-20 py-24 md:py-36">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 max-w-[1600px] mx-auto">
            <motion.aside {...fade(0)} className="lg:col-span-4">
              <div className="sticky top-24">
                <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#f7931a' }}>Capítulo 01</span>
                <div className="h-[2px] w-16 mb-6" style={{ backgroundColor: '#f7931a' }} />
                <p className="text-sm uppercase tracking-[0.2em] font-semibold" style={{ color: '#5a554d' }}>A memória que não pega fogo</p>
              </div>
            </motion.aside>
            <motion.div {...fade(0.1)} className="lg:col-span-8">
              <h2 className="text-[clamp(2.25rem,5.5vw,5rem)] font-black leading-[1] tracking-tight mb-10" style={{ color: '#1a1c1f' }}>
                Uma seed sem backup sério é{' '}
                <span style={{ color: '#f7931a', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>
                  patrimônio em terreno frágil.
                </span>
              </h2>
              <div className="space-y-7 text-lg md:text-xl leading-[1.7] font-light" style={{ color: '#2d2622' }}>
                <p>
                  Autocustódia não termina quando você compra uma hardware wallet. Ela só começa. O ponto mais sensível do sistema é a seed phrase: aquelas 12 ou 24 palavras que reabrem sua carteira inteira. Quem controla isso, controla tudo. Se você perde, ninguém devolve. Se outra pessoa copia, ninguém avisa.
                </p>
                <p>
                  O backup em aço existe porque o papel é frágil demais para uma função tão séria. Não é paranoia. É engenharia básica. Se algo foi feito para durar décadas e carregar valor relevante, precisa ser registrado em material compatível com essa missão. O aço é o degrau mínimo entre improviso e estrutura.
                </p>
                <blockquote className="pl-8 py-2 my-10 text-2xl md:text-3xl leading-[1.4] font-light" style={{ borderLeft: '3px solid #f7931a', color: '#1a1c1f', fontFamily: "'Playfair Display', serif", fontStyle: 'italic' }}>
                  Gravar a seed em aço é transformar memória frágil em infraestrutura física.
                </blockquote>
                <p>
                  Este manual organiza o processo em cinco capítulos: por que o papel falha, como escolher o tipo de backup metálico, como gravar sem erro, como esconder com inteligência e como testar a recuperação. Linguagem simples, prática e sem teatro técnico.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="relative py-24 md:py-32 px-6 md:px-12 lg:px-20" style={{ backgroundColor: '#1a1c1f', color: '#ece4d3' }}>
          <div className="max-w-[1600px] mx-auto">
            <motion.div {...fade(0)} className="grid lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-7 relative aspect-[4/5] lg:aspect-[5/6] overflow-hidden">
                <img src={imgResistencia} alt="Placa metálica sobrevivendo ao fogo com palavras legíveis" loading="lazy" className="w-full h-full object-cover" />
              </div>
              <div className="lg:col-span-5">
                <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-6" style={{ color: '#f7931a' }}>Capítulo 02</span>
                <h2 className="text-[clamp(2rem,4.5vw,4rem)] font-black leading-[1.05] tracking-tight mb-8" style={{ color: '#ece4d3' }}>
                  Seu backup precisa sobreviver{' '}
                  <span style={{ color: '#f7931a', fontStyle: 'italic', fontWeight: 400, fontFamily: "'Playfair Display', serif" }}>
                    ao pior dia da sua vida.
                  </span>
                </h2>
                <p className="text-lg md:text-xl leading-[1.7] font-light mb-6" style={{ color: 'rgba(236,228,211,0.86)' }}>
                  Incêndio doméstico, infiltração pesada, mudança forçada, roubo, perda de memória sob estresse. O backup não é avaliado no dia bonito. Ele é avaliado no dia ruim. Por isso a pergunta correta não é “isso é exagero?”. A pergunta correta é “isso continua funcionando quando a rotina normal acaba?”.
                </p>
                <p className="text-lg md:text-xl leading-[1.7] font-light" style={{ color: 'rgba(236,228,211,0.86)' }}>
                  O aço não é mágico. Mas é robusto o suficiente para tirar o backup da zona infantil e colocá-lo na zona adulta. Ele não resolve tudo, porém remove uma das fragilidades mais óbvias do sistema inteiro.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="relative py-24 md:py-36 px-6 md:px-12 lg:px-20" style={{ backgroundColor: '#ece4d3' }}>
          <div className="max-w-[1600px] mx-auto">
            <motion.div {...fade(0)} className="mb-20 max-w-3xl">
              <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#f7931a' }}>Capítulo 03 · O Manual</span>
              <h2 className="text-[clamp(2.5rem,6vw,6rem)] font-black leading-[0.95] tracking-tight" style={{ color: '#1a1c1f' }}>
                Cinco pilares.<br/>
                <span style={{ color: '#f7931a', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>
                  Do papel frágil ao backup adulto.
                </span>
              </h2>
              <p className="mt-8 text-lg md:text-xl leading-[1.6] font-light max-w-2xl" style={{ color: '#2d2622' }}>
                A ordem certa para executar sem se perder: entender o risco, escolher o sistema, gravar com calma, armazenar com redundância e testar como adulto responsável.
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
                        <div className="absolute top-6 left-6 text-7xl md:text-8xl font-black opacity-95" style={{ color: '#ece4d3', fontFamily: "'Inter Tight', sans-serif", textShadow: '0 4px 30px rgba(0,0,0,0.55)' }}>
                          {p.num}
                        </div>
                      </div>
                    </div>
                    <div className={`lg:col-span-6 ${reverso ? 'lg:order-1' : ''}`}>
                      <p className="text-xs font-bold tracking-[0.4em] uppercase mb-4" style={{ color: '#f7931a' }}>Pilar {p.num}</p>
                      <h3 className="text-[clamp(1.85rem,3.5vw,3rem)] font-black leading-[1.05] tracking-tight mb-3" style={{ color: '#1a1c1f' }}>{p.titulo}</h3>
                      <p className="text-lg md:text-xl mb-8 font-light italic" style={{ color: '#5a554d', fontFamily: "'Playfair Display', serif" }}>{p.subtitulo}</p>
                      <div className="space-y-5 mb-8 text-base md:text-lg leading-[1.7] font-light" style={{ color: '#2d2622' }}>
                        {p.paragrafos.map((par, idx) => <p key={idx}>{par}</p>)}
                      </div>
                      <div className="border-t pt-6 mt-6" style={{ borderColor: 'rgba(247,147,26,0.26)' }}>
                        <p className="text-xs font-bold tracking-[0.3em] uppercase mb-4" style={{ color: '#f7931a' }}>Práticas obrigatórias</p>
                        <ul className="space-y-3">
                          {p.praticas.map((pr, idx) => (
                            <li key={idx} className="flex items-start gap-3 text-base md:text-lg leading-[1.6]" style={{ color: '#2d2622' }}>
                              <Hammer size={18} className="shrink-0 mt-1" style={{ color: '#f7931a' }} />
                              <span>{pr}</span>
                            </li>
                          ))}
                        </ul>
                        <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full" style={{ backgroundColor: 'rgba(26,28,31,0.06)' }}>
                          <Calendar size={14} style={{ color: '#1a1c1f' }} />
                          <span className="text-sm font-semibold" style={{ color: '#1a1c1f' }}>{p.tempo}</span>
                        </div>
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="relative py-24 md:py-32 px-6 md:px-12 lg:px-20" style={{ backgroundColor: '#1a1c1f', color: '#ece4d3' }}>
          <div className="max-w-[1600px] mx-auto">
            <motion.div {...fade(0)} className="mb-16 max-w-3xl">
              <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#f7931a' }}>Capítulo 04 · Erros fatais</span>
              <h2 className="text-[clamp(2.25rem,5vw,5rem)] font-black leading-[1] tracking-tight" style={{ color: '#ece4d3' }}>
                Seis armadilhas{' '}
                <span style={{ color: '#f7931a', fontStyle: 'italic', fontWeight: 400, fontFamily: "'Playfair Display', serif" }}>
                  que arruinam backups sérios.
                </span>
              </h2>
            </motion.div>
            <div className="grid md:grid-cols-2 gap-6">
              {ARMADILHAS.map((a, i) => (
                <motion.div key={i} {...fade(i * 0.05)} className="p-8 md:p-10" style={{ backgroundColor: 'rgba(236,228,211,0.06)', border: '1px solid rgba(236,228,211,0.12)' }}>
                  <AlertTriangle size={24} className="mb-5" style={{ color: '#f7931a' }} />
                  <h4 className="text-xl md:text-2xl font-bold leading-tight mb-4" style={{ color: '#ece4d3' }}>{a.titulo}</h4>
                  <p className="text-base md:text-lg leading-[1.65] font-light" style={{ color: 'rgba(236,228,211,0.82)' }}>{a.detalhe}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="relative py-24 md:py-32 px-6 md:px-12 lg:px-20" style={{ backgroundColor: '#ece4d3' }}>
          <div className="max-w-4xl mx-auto">
            <motion.div {...fade(0)} className="mb-12">
              <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#f7931a' }}>Capítulo 05 · FAQ</span>
              <h2 className="text-[clamp(2.25rem,5vw,4.5rem)] font-black leading-[1] tracking-tight" style={{ color: '#1a1c1f' }}>
                As oito perguntas{' '}
                <span style={{ color: '#f7931a', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>
                  que quase todo bitcoiner faz tarde demais.
                </span>
              </h2>
            </motion.div>
            <div className="space-y-3">
              {FAQ.map((f, i) => {
                const open = openFaq === i;
                return (
                  <motion.div key={i} {...fade(i * 0.03)} className="border-b" style={{ borderColor: 'rgba(26,28,31,0.16)' }}>
                    <button onClick={() => setOpenFaq(open ? null : i)} className="w-full flex items-center justify-between gap-4 py-6 text-left">
                      <span className="text-lg md:text-xl font-semibold leading-snug" style={{ color: '#1a1c1f' }}>{f.q}</span>
                      <ChevronDown size={22} className="shrink-0 transition-transform duration-300" style={{ color: '#f7931a', transform: open ? 'rotate(180deg)' : 'rotate(0)' }} />
                    </button>
                    {open && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.4, ease: APPLE_EASE }} className="overflow-hidden">
                        <p className="pb-7 text-base md:text-lg leading-[1.7] font-light" style={{ color: '#2d2622' }}>{f.a}</p>
                      </motion.div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="py-20 px-6 md:px-12 lg:px-20" style={{ backgroundColor: '#1a1c1f', color: '#ece4d3' }}>
          <div className="max-w-[1600px] mx-auto text-center">
            <Vault size={32} className="mx-auto mb-6" style={{ color: '#f7931a' }} />
            <p className="text-xl md:text-3xl font-light leading-[1.5] max-w-3xl mx-auto" style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', color: '#ece4d3' }}>
              "Se a sua memória financeira cabe em papel frágil, então seu patrimônio ainda não tem a arquitetura que merece."
            </p>
            <p className="mt-6 text-xs font-bold tracking-[0.4em] uppercase" style={{ color: '#f7931a' }}>Lord Junnior · Arquitetura de Autocustódia</p>
          </div>
        </section>
      </div>
    </>
  );
}
