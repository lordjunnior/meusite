import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, CheckCircle2, Cloud, Eye, LockKeyhole, Radar, ShieldCheck, Smartphone } from 'lucide-react';
import SeoHead from '@/components/SeoHead';
import BackToHome from '@/components/BackToHome';
import { Button } from '@/components/ui/button';
import heroAsset from '@/assets/seguranca-mobile/iphone-seguro/iphone-hero.jpg';
import trackingAsset from '@/assets/seguranca-mobile/iphone-seguro/iphone-tracking-pt.jpg';
import datacenterAsset from '@/assets/seguranca-mobile/iphone-seguro/iphone-datacenter.jpg';
import publicoAsset from '@/assets/seguranca-mobile/iphone-seguro/iphone-publico-pt.jpg';
import comparacaoAsset from '@/assets/seguranca-mobile/iphone-seguro/iphone-vs-graphene-clean.jpg';
import privacidadeAsset from '@/assets/seguranca-mobile/iphone-seguro/iphone-privacidade-pt.jpg';
import vereditoAsset from '@/assets/seguranca-mobile/iphone-seguro/iphone-veredito-pt.jpg';
import appleLogoAsset from '@/assets/seguranca-mobile/iphone-seguro/apple-logo.svg';

const EASE = [0.22, 1, 0.36, 1] as const;
const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-70px' },
  transition: { duration: 0.78, delay, ease: EASE },
});

const APPLE_STRENGTHS = [
  'Criptografia de disco ligada por padrão. Desde que você configura o aparelho, os dados no armazenamento já vêm protegidos. A maioria dos fabricantes Android deixava isso como opção, não como padrão, por anos.',
  'Janela de atualização mais longa que qualquer concorrente. Um iPhone de 5, 6 anos ainda recebe patch de segurança. Isso sozinho já resolve um dos maiores buracos de segurança do mercado mobile, aparelho velho sem atualização.',
  'Controle de app mais restrito. A revisão da App Store, com todos os problemas que tem, ainda filtra mais malware bruto do que a média das lojas alternativas de Android.',
  'App Tracking Transparency. Desde 2021, todo app precisa pedir permissão explícita antes de rastrear você entre outros aplicativos e sites. Isso quebrou o modelo de negócio de empresa inteira de rastreamento publicitário, e foi uma decisão que pegou mal pra indústria de ads, o que já diz alguma coisa sobre o tamanho do impacto.',
];

const APPLE_LIMITS = [
  'Backup do iCloud não é criptografado de ponta a ponta por padrão. Isso significa que, se a Apple receber uma ordem judicial, ela consegue acessar seu backup na nuvem, mensagem, foto, tudo. Existe uma opção chamada Proteção Avançada de Dados que resolve isso, mas ela vem desligada de fábrica. Quase ninguém liga.',
  'A Apple sabe muito sobre você, só não vende esse dado pra terceiro do mesmo jeito que o modelo Google faz. É uma diferença de modelo de negócio, não de ausência de coleta. Apple lucra vendendo hardware caro e serviço de assinatura, não anúncio, então o incentivo de coletar seu dado pra vender é menor, mas o dado ainda existe, ainda é usado internamente, e ainda pode ser requisitado por autoridade.',
  'Siri e o histórico de Apple Intelligence. Com a chegada de recursos de inteligência artificial no sistema, parte do processamento passou a rodar em servidor da Apple, não só no aparelho. A empresa promete anonimização e não retenção, mas isso depende de confiança na palavra deles, não de verificação independente que você mesmo pode fazer.',
  'Metadados de comunicação continuam expostos. Mesmo com iMessage criptografado ponta a ponta no conteúdo, quem trocou mensagem com quem, quando, e com que frequência, isso é metadado, e metadado não é protegido pela mesma criptografia. Esse tipo de informação já foi usado historicamente em investigação e vigilância, com ou sem o conteúdo da mensagem em si.',
  'Você não pode auditar o sistema. iOS é fechado, você não consegue abrir o código e conferir o que está rodando de verdade. Isso é diferente de um sistema como GrapheneOS, onde o código é aberto e qualquer pessoa pode revisar. Confiar na Apple significa confiar sem verificar, e isso pesa dependendo do seu modelo de ameaça.',
];

const MYTHS = [
  '"iPhone não pega vírus." Verdade parcial. É muito mais difícil pegar malware comum no iPhone. Mas spyware direcionado e sofisticado, como o caso conhecido do Pegasus, já infectou iPhone sem o usuário nem clicar em nada, usando falha de dia zero. Ninguém está 100% imune, o que muda é o custo e a raridade do ataque.',
  '"A Apple não espiona ninguém." A Apple não vende seu dado pra empresa de publicidade do jeito que outras big techs fazem, isso é real. Mas não vender não é o mesmo que não coletar. A empresa sabe sua localização, seu histórico de compra, seu padrão de uso, isso fica registrado.',
  '"Modo avião me deixa invisível." Não deixa. Modo avião desliga rádio de celular e Wi-Fi, mas não apaga o que já foi coletado antes, nem impede que o aparelho retome exatamente de onde parou assim que você religa.',
  '"Se eu não tenho nada a esconder, não preciso me preocupar." Esse não é bem um mito técnico, é uma armadilha de raciocínio. Privacidade não é sobre esconder crime, é sobre controle. Você fecha a porta do banheiro mesmo não estando fazendo nada ilegal lá dentro.',
];

const ACTIONS = [
  'Ativa a Proteção Avançada de Dados nas configurações do iCloud, isso sozinho resolve o ponto mais fraco do backup.',
  'Ativa o Modo Bloqueio (Lockdown Mode) se você se encaixa em algum perfil de risco elevado, ele reduz drasticamente a superfície de ataque, com custo de algumas funcionalidades.',
  'Revisa as permissões de rastreamento entre apps, em Configurações, Privacidade, Rastreamento.',
  'Desativa o histórico de localização de Lugares Significativos, que fica escondido dentro de Privacidade e Segurança, Serviços de Localização, Serviços do Sistema.',
  'Usa autenticação de dois fatores baseada em app, não SMS, pra sua conta Apple.',
];

const FAQ = [
  { q: 'O iPhone é mais seguro que o Android?', a: 'Em média, sim, principalmente comparado a Android de fábrica sem nenhuma customização de privacidade. Mas sistemas Android hardened como GrapheneOS superam o iPhone em transparência e auditabilidade, porque o código é aberto.' },
  { q: 'A Apple vende meus dados pra outras empresas?', a: 'Não do jeito que empresas de publicidade fazem. O modelo de negócio da Apple é venda de hardware e assinatura, não anúncio direcionado. Mas isso não significa ausência total de coleta de dado, significa um incentivo comercial diferente.' },
  { q: 'iMessage é realmente criptografado?', a: 'O conteúdo da mensagem sim, ponta a ponta, entre dois usuários de iPhone. O metadado, quem falou com quem e quando, não tem o mesmo nível de proteção.' },
  { q: 'Vale a pena ativar o Modo Bloqueio no iPhone comum, sem ser alvo de risco?', a: 'Geralmente não é necessário pro uso do dia a dia, porque ele desativa recursos como pré-visualização de link e alguns tipos de anexo. Vale mais pra quem tem motivo real de estar num grupo de risco elevado.' },
  { q: 'Backup no iCloud é seguro?', a: 'Depende da configuração. Por padrão, não é criptografado de ponta a ponta, o que significa que a Apple consegue acessar em caso de ordem judicial. Ativando a Proteção Avançada de Dados, esse cenário muda.' },
];

type Asset = string;

function Hero() {
  const reduceMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 900], [0, reduceMotion ? 0 : 180]);
  const opacity = useTransform(scrollY, [0, 650], [1, 0.22]);

  return (
    <section className="iphone-hero relative min-h-[88vh] overflow-hidden">
      <motion.img style={{ y }} src={heroAsset} alt="iPhone com Face ID ativo em ambiente escuro, simbolizando segurança e privacidade" width={1920} height={1088} fetchPriority="high" decoding="async" className="absolute inset-0 h-[110%] w-full object-cover" />
      <div className="iphone-hero-shade absolute inset-0" />
      <motion.div style={{ opacity }} className="relative z-10 flex min-h-[88vh] max-w-[1600px] flex-col justify-end px-6 pb-16 pt-36 md:px-12 md:pb-24 lg:px-20">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7, ease: EASE }} className="mb-7 flex items-center gap-4">
          <div className="iphone-brand-mark flex h-14 w-14 items-center justify-center rounded-md border border-background/25 bg-background/10 p-3 backdrop-blur-xl"><img src={appleLogoAsset} alt="Logo oficial da Apple" width={28} height={34} className="h-8 w-auto brightness-0 invert" /></div>
          <div><p className="text-xs font-bold uppercase tracking-[0.3em] text-background/70">Segurança Mobile</p><p className="text-xl font-black uppercase tracking-normal text-background">Curiosidades / Mitos</p></div>
        </motion.div>
        <motion.h1 initial={{ opacity: 0, y: 42, filter: 'blur(10px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} transition={{ duration: 1, delay: .1, ease: EASE }} className="max-w-[17ch] text-[clamp(2.75rem,7.3vw,7rem)] font-black uppercase leading-[.92] tracking-normal text-background">
          iPhone, o Celular Mais Seguro do Mundo... Será?
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .8, delay: .35, ease: EASE }} className="mt-7 max-w-3xl text-lg leading-relaxed text-background/85 md:text-2xl">
          A resposta curta, mais que a maioria, a resposta completa você não vai gostar de ouvir.
        </motion.p>
      </motion.div>
    </section>
  );
}

function Heading({ chapter, children, dark = false }: { chapter: string; children: React.ReactNode; dark?: boolean }) {
  return <motion.div {...reveal()} className="mb-12 max-w-5xl"><span className={dark ? 'iphone-copper-soft text-xs font-bold uppercase tracking-[0.3em]' : 'iphone-copper text-xs font-bold uppercase tracking-[0.3em]'}>{chapter}</span><h2 className={dark ? 'mt-5 text-[clamp(2.25rem,5.5vw,5.4rem)] font-black leading-none tracking-normal text-background' : 'iphone-ink mt-5 text-[clamp(2.25rem,5.5vw,5.4rem)] font-black leading-none tracking-normal'}>{children}</h2></motion.div>;
}

function EditorialFigure({ asset, alt, caption }: { asset: Asset; alt: string; caption: string }) {
  return <motion.figure {...reveal(.08)} className="iphone-figure group relative my-12 h-[58vh] min-h-[390px] max-h-[720px] overflow-hidden rounded-lg"><img src={asset} alt={alt} loading="lazy" decoding="async" width={1536} height={1024} className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.045]"/><div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-transparent to-transparent"/><figcaption className="absolute inset-x-0 bottom-0 px-6 pb-6 pt-24 text-base font-semibold leading-relaxed text-background md:px-9 md:pb-9 md:text-lg">{caption}</figcaption></motion.figure>;
}

function KenBurnsBackground({ asset, alt, light = false }: { asset: Asset; alt: string; light?: boolean }) {
  const reduceMotion = useReducedMotion();
  return <><motion.img src={asset} alt={alt} loading="lazy" decoding="async" width={1920} height={1088} animate={reduceMotion ? undefined : { scale: [1, 1.06, 1], x: ['0%', '-0.7%', '0%'] }} transition={reduceMotion ? undefined : { duration: 18, repeat: Infinity, ease: 'easeInOut' }} className="absolute inset-0 -z-30 h-full w-full object-cover"/><div className={light ? 'iphone-light-shade absolute inset-0 -z-20' : 'iphone-dark-shade absolute inset-0 -z-20'}/><div className="iphone-grid absolute inset-0 -z-10"/></>;
}

export default function IPhoneESeguroMesmo() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return <>
    <SeoHead custom={{
      title: 'iPhone, o Celular Mais Seguro do Mundo... Será?',
      description: 'Você acha que iPhone é sinônimo de privacidade? Descubra o que a Apple realmente protege, o que ela ainda coleta, e se isso é suficiente pra você em 2026.',
      canonical: 'https://lordjunnior.com.br/seguranca-mobile/iPhone-e-seguro-mesmo',
      primaryKeyword: 'iPhone é seguro',
      lsiKeywords: ['iPhone protege privacidade', 'Apple espiona usuário', 'iPhone rastreamento', 'privacidade no iPhone', 'iPhone vs Android segurança', 'Apple coleta dados', 'iPhone é realmente privado', 'criptografia iPhone', 'Lockdown Mode iPhone', 'iCloud é seguro'],
      longTailKeywords: ['iPhone é realmente seguro e privado', 'o que a Apple coleta do iPhone', 'como ativar privacidade no iPhone em 2026', 'iPhone ou GrapheneOS para segurança'],
      breadcrumbs: [{ name: 'Início', url: '/' }, { name: 'Segurança Mobile', url: '/seguranca-mobile' }, { name: 'Curiosidades / Mitos', url: '/seguranca-mobile/iPhone-e-seguro-mesmo' }, { name: 'iPhone é seguro mesmo?', url: '/seguranca-mobile/iPhone-e-seguro-mesmo' }],
      schemaType: 'Article', articleSection: 'Curiosidades / Mitos',
      relatedPages: ['/seguranca-mobile', '/seguranca-mobile/grapheneos'],
    }} faqItems={FAQ.map(({ q, a }) => ({ question: q, answer: a }))}/>

    <main className="iphone-page min-h-screen">
      <div className="absolute inset-x-0 top-0 z-30 px-6 pt-[52px] md:px-12 lg:px-20"><BackToHome /></div>
      <Hero />

      <section className="relative isolate overflow-hidden px-6 py-24 md:px-12 md:py-36 lg:px-20">
        <KenBurnsBackground asset={heroAsset} alt="Detalhe de iPhone protegido por Face ID" light />
        <div className="mx-auto grid max-w-[1600px] gap-12 lg:grid-cols-12 lg:gap-20">
          <motion.aside {...reveal()} className="min-w-0 lg:col-span-3"><div className="sticky top-24"><span className="iphone-copper text-xs font-bold uppercase tracking-[0.3em]">01 / Resposta direta</span><div className="iphone-rule mt-5 h-0.5 w-16"/></div></motion.aside>
          <motion.div {...reveal(.08)} className="min-w-0 space-y-7 text-lg leading-[1.75] md:text-xl lg:col-span-9">
            <p>Vou responder antes de você ter que ler o texto inteiro pra chegar na resposta, porque isso é exatamente o tipo de prática que eu odeio em conteúdo, prender você até o final só pra vender clique.</p>
            <p className="iphone-ink text-2xl font-black leading-relaxed md:text-4xl">Sim, o iPhone é mais seguro que a maioria dos Android que saem de fábrica. Isso é fato, não opinião. Criptografia forte por padrão, atualização de segurança consistente, controle de app mais rígido que a média do mercado.</p>
            <p>Mas mais seguro que a média não é a mesma coisa que seguro o suficiente pra você. E é aqui que a conversa fica interessante.</p>
          </motion.div>
        </div>
      </section>

      <section className="iphone-deep relative isolate overflow-hidden px-6 py-24 md:px-12 md:py-36 lg:px-20">
        <KenBurnsBackground asset={trackingAsset} alt="Permissão de rastreamento no iPhone em português" />
        <div className="mx-auto max-w-[1600px]">
          <Heading chapter="02 / O que a Apple realmente faz bem" dark>Crédito técnico, <span className="iphone-copper-soft font-editorial font-normal italic">onde ele é devido.</span></Heading>
          <motion.p {...reveal(.06)} className="max-w-3xl text-lg leading-relaxed text-background/80 md:text-xl">Vamos dar crédito onde é devido, porque conteúdo de segurança digital vira propaganda barata quando trata tudo como inimigo.</motion.p>
          <div className="mt-12 grid gap-5 md:grid-cols-2">{APPLE_STRENGTHS.map((text, i) => <motion.article key={text} {...reveal(i * .06)} className="iphone-card-dark group rounded-lg border p-8 transition-all duration-500 hover:-translate-y-1 md:p-10"><div className="mb-6 flex items-center justify-between"><span className="iphone-copper-soft text-xs font-black tracking-[0.25em]">0{i + 1}</span>{i === 3 ? <img src={appleLogoAsset} alt="Logo oficial da Apple" loading="lazy" width={28} height={34} className="h-8 w-auto opacity-90"/> : <ShieldCheck className="iphone-copper-soft h-6 w-6 transition-transform duration-500 group-hover:scale-110"/>}</div><p className="text-lg leading-[1.75] text-background/78">{text}</p></motion.article>)}</div>
          <EditorialFigure asset={trackingAsset} alt={'Tela de permissão de rastreamento entre apps no iOS, recurso de App Tracking Transparency'} caption="App Tracking Transparency transforma rastreamento entre aplicativos em uma decisão visível."/>
        </div>
      </section>

      <section className="relative isolate overflow-hidden px-6 py-24 md:px-12 md:py-36 lg:px-20">
        <KenBurnsBackground asset={datacenterAsset} alt="Servidores de data center representando onde dados de usuários são processados e armazenados"/>
        <div className="mx-auto max-w-[1600px]">
          <Heading chapter="03 / O que a Apple não te conta" dark>Aqui a conversa <span className="iphone-copper-soft font-editorial font-normal italic">muda de tom.</span></Heading>
          <div className="grid gap-5 md:grid-cols-2">{APPLE_LIMITS.map((text, i) => <motion.article key={text} {...reveal((i % 2) * .07)} className={`iphone-glass group rounded-lg border p-8 backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 md:p-10 ${i === 4 ? 'md:col-span-2' : ''}`}><div className="mb-5 flex items-center gap-3"><Cloud className="iphone-copper-soft h-6 w-6"/><span className="iphone-copper-soft text-xs font-black tracking-[0.25em]">0{i + 1}</span></div><p className="text-lg leading-[1.75] text-background/90">{text}</p></motion.article>)}</div>
        </div>
      </section>

      <section className="relative isolate overflow-hidden px-6 py-24 md:px-12 md:py-36 lg:px-20">
        <KenBurnsBackground asset={publicoAsset} alt="Uso de iPhone em ambiente público" light />
        <div className="mx-auto max-w-[1600px]">
          <Heading chapter="04 / Mitos que precisam morrer">Familiar não significa <span className="iphone-editorial">verdadeiro.</span></Heading>
          <div className="grid gap-5 lg:grid-cols-2">{MYTHS.map((text, i) => <motion.article key={text} {...reveal(i * .06)} className="iphone-card group rounded-lg border p-8 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl md:p-10"><div className="mb-6 flex items-center justify-between"><Radar className="iphone-copper h-7 w-7 transition-transform duration-500 group-hover:rotate-6"/><span className="iphone-muted text-xs font-black tracking-[0.25em]">MITO {String(i + 1).padStart(2, '0')}</span></div><p className="text-lg leading-[1.75]">{text}</p></motion.article>)}</div>
          <EditorialFigure asset={publicoAsset} alt="Pessoa usando iPhone em ambiente público, ilustrando exposição a rastreamento e vigilância" caption="Segurança do aparelho e exposição no ambiente são problemas diferentes."/>
        </div>
      </section>

      <section className="iphone-deep relative isolate overflow-hidden px-6 py-24 md:px-12 md:py-36 lg:px-20">
        <KenBurnsBackground asset={comparacaoAsset} alt="iPhone e smartphone Pixel lado a lado" />
        <div className="mx-auto max-w-[1600px]">
          <Heading chapter="05 / Então, pra quem o iPhone é seguro o suficiente" dark>O risco muda. <span className="iphone-copper-soft font-editorial font-normal italic">A resposta também.</span></Heading>
          <motion.p {...reveal(.06)} className="max-w-3xl text-xl font-black leading-relaxed text-background md:text-3xl">Sejamos honestos sobre pra quem isso serve.</motion.p>
          <div className="mt-10 grid gap-6 lg:grid-cols-2"><motion.article {...reveal(.08)} className="iphone-card-dark rounded-lg border p-8 md:p-10"><span className="iphone-copper-soft text-xs font-black uppercase tracking-[0.25em]">Uso cotidiano</span><p className="mt-5 text-lg leading-[1.75] text-background/80">Se você é usuário comum, quer manter foto de família, conversa pessoal e conta bancária longe de ladrão oportunista e malware genérico, o iPhone, com as configurações certas, cumpre isso bem. Melhor que a maioria dos Android de fábrica, sem sombra de dúvida.</p></motion.article><motion.article {...reveal(.14)} className="iphone-card-dark rounded-lg border p-8 md:p-10"><span className="iphone-copper-soft text-xs font-black uppercase tracking-[0.25em]">Risco elevado</span><p className="mt-5 text-lg leading-[1.75] text-background/80">Se você é jornalista investigativo, ativista, alvo potencial de vigilância estatal, advogado com sigilo de cliente sensível, ou simplesmente alguém que trata privacidade como princípio inegociável, o iPhone é um ponto de partida razoável, mas não é o teto. Nesse caso, vale olhar pra sistemas como GrapheneOS, que é auditável e não depende de confiança cega numa empresa.</p></motion.article></div>
          <motion.div {...reveal(.1)} className="group relative mt-12 overflow-hidden rounded-lg border border-background/20"><img src={comparacaoAsset} alt="Comparação visual entre iPhone e smartphone Pixel rodando GrapheneOS" loading="lazy" decoding="async" width={1536} height={1024} className="h-[52vh] min-h-[380px] w-full object-cover transition-transform duration-1000 group-hover:scale-[1.035]"/><div className="absolute inset-0 bg-gradient-to-t from-foreground/95 via-foreground/15 to-transparent"/><div className="absolute inset-x-0 bottom-0 flex flex-col gap-5 p-6 md:flex-row md:items-end md:justify-between md:p-10"><p className="max-w-xl text-lg font-semibold leading-relaxed text-background">Comparação visual entre iPhone e smartphone Pixel rodando GrapheneOS.</p><Button asChild size="lg" className="iphone-btn h-13 px-7 font-bold"><Link to="/seguranca-mobile/grapheneos">Analisar o GrapheneOS <ArrowRight/></Link></Button></div></motion.div>
        </div>
      </section>

      <section className="relative isolate overflow-hidden px-6 py-24 md:px-12 md:py-36 lg:px-20">
        <KenBurnsBackground asset={privacidadeAsset} alt="Ajustes de privacidade do iPhone em português" light />
        <div className="mx-auto max-w-[1600px]">
          <Heading chapter="06 / O que fazer agora, se você vai continuar com iPhone">Melhore o que você <span className="iphone-editorial">já usa.</span></Heading>
          <motion.p {...reveal(.05)} className="max-w-3xl text-lg leading-relaxed md:text-xl">Não precisa trocar de aparelho pra melhorar isso hoje mesmo:</motion.p>
          <div className="mt-10 grid gap-4">{ACTIONS.map((text, i) => <motion.article key={text} {...reveal(i * .05)} className="iphone-card group grid gap-5 rounded-lg border p-6 transition-all duration-500 hover:translate-x-1 md:grid-cols-[64px_1fr] md:p-8"><div className="iphone-step flex h-12 w-12 items-center justify-center rounded-full text-sm font-black transition-transform duration-500 group-hover:scale-110">{String(i + 1).padStart(2, '0')}</div><p className="self-center text-lg leading-[1.75]">{text}</p></motion.article>)}</div>
          <EditorialFigure asset={privacidadeAsset} alt="Menu de configurações de privacidade e segurança do iOS, com opção de Proteção Avançada de Dados" caption="A proteção muda quando as configurações deixam de permanecer no padrão de fábrica."/>
        </div>
      </section>

      <section id="faq" className="relative isolate scroll-mt-16 overflow-hidden px-6 py-24 md:px-12 md:py-36 lg:px-20">
        <KenBurnsBackground asset={vereditoAsset} alt="iPhone em mesa de trabalho com checklist de privacidade e segurança"/>
        <div className="mx-auto max-w-[1600px]">
          <Heading chapter="07 / FAQ estratégico" dark>Perguntas diretas, <span className="iphone-copper-soft font-editorial font-normal italic">respostas abertas.</span></Heading>
          <div className="grid items-start gap-5 md:grid-cols-2 xl:grid-cols-3">{FAQ.map((item, i) => <motion.article key={item.q} {...reveal((i % 3) * .06)} className={`iphone-glass group rounded-lg border p-7 backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 md:p-8 ${i === 0 || i === 4 ? 'md:col-span-2' : ''}`}><div className="mb-5 flex items-center justify-between"><span className="iphone-copper-soft text-xs font-black tracking-[0.25em]">FAQ {String(i + 1).padStart(2, '0')}</span><Eye className="iphone-copper-soft h-5 w-5 transition-transform duration-500 group-hover:scale-110"/></div><h3 className="text-xl font-black leading-tight tracking-normal text-background md:text-2xl">{item.q}</h3><p className="mt-5 text-base font-medium leading-[1.75] text-background/90 md:text-lg">{item.a}</p></motion.article>)}</div>
        </div>
      </section>

      <section className="iphone-deep relative isolate overflow-hidden px-6 py-24 md:px-12 md:py-32 lg:px-20">
        <KenBurnsBackground asset={vereditoAsset} alt="Checklist de privacidade do iPhone em português" />
        <div className="mx-auto grid max-w-[1600px] gap-12 lg:grid-cols-2">
          <motion.div {...reveal()}><span className="iphone-copper-soft text-xs font-bold uppercase tracking-[0.3em]">Veredito</span><h2 className="mt-5 text-[clamp(2.5rem,5vw,5rem)] font-black leading-none tracking-normal text-background">Seguro o suficiente <span className="iphone-copper-soft font-editorial font-normal italic">pra quê?</span></h2></motion.div>
          <motion.div {...reveal(.12)} className="space-y-6 text-lg leading-[1.75] text-background/82 md:text-xl"><p>O iPhone não é uma fortaleza impenetrável, e também não é um Android disfarçado de seguro só porque tem preço mais alto. É um sistema bem construído, com decisão de engenharia acertada em vários pontos, rodando dentro de uma empresa que ainda depende da sua confiança, não da sua verificação.</p><p>Pra maioria das pessoas, com as configurações certas, é suficiente. Pra quem lida com informação que pode custar liberdade, emprego, ou segurança física se vazar, suficiente não é o padrão que você deveria aceitar.</p><p className="font-black text-background">A pergunta certa não é iPhone é seguro. A pergunta certa é seguro o suficiente pra quê, e pra proteger você de quem.</p></motion.div>
        </div>
      </section>

      <section className="relative isolate overflow-hidden px-6 py-20 md:px-12 md:py-28 lg:px-20"><KenBurnsBackground asset={heroAsset} alt="iPhone protegido por Face ID" light /><div className="mx-auto max-w-[1600px]"><Heading chapter="Curiosidades / Mitos">Continue sua <span className="iphone-editorial">trilha.</span></Heading><div className="grid gap-5 md:grid-cols-3"><motion.div {...reveal()}><Link to="/seguranca-mobile" className="iphone-card iphone-focus group block h-full rounded-lg border p-8 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl"><Smartphone className="iphone-copper h-7 w-7"/><h3 className="iphone-ink mt-6 text-2xl font-black">Segurança Mobile</h3><p className="mt-3 text-lg leading-relaxed">Volte ao hub e escolha a próxima frente de proteção móvel.</p><span className="iphone-copper mt-6 inline-flex items-center gap-2 font-bold">Acessar o hub <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1"/></span></Link></motion.div><motion.div {...reveal(.07)}><Link to="/seguranca-mobile/grapheneos" className="iphone-card iphone-focus group block h-full rounded-lg border p-8 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl"><LockKeyhole className="iphone-copper h-7 w-7"/><h3 className="iphone-ink mt-6 text-2xl font-black">GrapheneOS</h3><p className="mt-3 text-lg leading-relaxed">Compare confiança institucional com transparência e auditabilidade.</p><span className="iphone-copper mt-6 inline-flex items-center gap-2 font-bold">Analisar o sistema <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1"/></span></Link></motion.div><motion.article {...reveal(.14)} className="iphone-card-future h-full rounded-lg border border-dashed p-8"><CheckCircle2 className="iphone-muted h-7 w-7"/><h3 className="iphone-ink mt-6 text-2xl font-black">Próximo mito</h3><p className="mt-3 text-lg leading-relaxed">Este espaço receberá a próxima investigação da categoria Curiosidades / Mitos.</p><span className="iphone-muted mt-6 inline-flex font-bold">Em preparação</span></motion.article></div></div></section>
    </main>
  </>;
}
