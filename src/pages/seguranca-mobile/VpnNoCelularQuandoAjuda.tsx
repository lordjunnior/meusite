import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { AlertTriangle, ArrowRight, CheckCircle2, Eye, Globe2, LockKeyhole, Network, ShieldCheck, Smartphone, Wifi } from 'lucide-react';
import SeoHead from '@/components/SeoHead';
import BackToHome from '@/components/BackToHome';
import { Button } from '@/components/ui/button';
import heroAsset from '@/assets/seguranca-mobile/vpn-celular/vpn-hero.jpg';
import appAsset from '@/assets/seguranca-mobile/vpn-celular/vpn-app-conectada.jpg';
import wifiAsset from '@/assets/seguranca-mobile/vpn-celular/vpn-wifi-publico.jpg';
import infraAsset from '@/assets/seguranca-mobile/vpn-celular/vpn-infraestrutura.jpg';
import permissoesAsset from '@/assets/seguranca-mobile/vpn-celular/vpn-permissoes.jpg';
import configuracaoAsset from '@/assets/seguranca-mobile/vpn-celular/vpn-configuracao.jpg';

const EASE = [0.22, 1, 0.36, 1] as const;
const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-70px' },
  transition: { duration: 0.78, delay, ease: EASE },
});

type Asset = { url: string };

const HELPS = [
  'Em Wi-Fi público, cafeteria, aeroporto, hotel, hall de evento. Essas redes são o cenário clássico de interceptação de tráfego, e aqui a VPN cumpre exatamente o papel que promete.',
  'Pra evitar que sua operadora identifique e limite tipo específico de tráfego, prática conhecida como throttling, algumas operadoras reduzem velocidade de streaming ou torrent especificamente, e VPN escapa dessa identificação.',
  'Pra acessar conteúdo bloqueado geograficamente, entendendo que isso pode esbarrar em termo de uso do serviço acessado, então é uma decisão sua avaliar o risco.',
  'Como camada adicional ao acessar informação sensível, escondendo da operadora o destino do seu acesso, mesmo que o conteúdo em si já seja criptografado pelo próprio site (HTTPS).',
];

const THEATER = [
  'VPN não te torna anônimo. A empresa da VPN passa a ver exatamente o que sua operadora via antes, você só trocou de quem observa, não eliminou a observação. Se a VPN guarda log e é obrigada a entregar por ordem judicial, sua suposta anonimização desaparece.',
  'VPN grátis frequentemente vende seu dado. Manter servidor, banda e infraestrutura custa dinheiro. Se você não está pagando pelo produto, alguém está pagando por você, geralmente através da venda do seu histórico de navegação pra empresa de dado.',
  'VPN não protege contra app malicioso já instalado no seu aparelho. Se o problema está dentro do celular, o túnel de rede não resolve isso.',
  'VPN não protege contra phishing. Um link malicioso continua malicioso independente da rede por onde ele trafega.',
  'VPN não esconde você de app que você usa logado. Se você abre o Instagram ou o Gmail com sua conta pessoal enquanto a VPN está ligada, a plataforma sabe exatamente quem você é, o login te identifica, o IP escondido não muda isso.',
  'VPN não impede fingerprinting de navegador, técnica que identifica você pela combinação única de configuração do seu aparelho e navegador, sem precisar do seu IP real.',
];

const WARNINGS = [
  'Política de logs não auditada por terceiro independente é sinal de alerta, qualquer provedor pode alegar "não guardamos log", a auditoria independente é o que dá credibilidade a essa afirmação.',
  'Jurisdição do país onde a empresa está sediada importa, alguns países têm acordo de compartilhamento de dado entre governos que enfraquece qualquer promessa de privacidade.',
  'Aplicativo "grátis" de loja de aplicativo genérica, sem transparência sobre o modelo de negócio, deve ser tratado com desconfiança.',
  'Extensão de navegador vendida por preço muito abaixo do mercado, sem histórico de auditoria de segurança, é outro sinal de alerta recorrente.',
];

const RECOMMENDATIONS = [
  'Usa VPN sempre que estiver em rede Wi-Fi pública, isso sozinho já justifica ter uma instalada.',
  'Verifica se o provedor tem política comprovada de não guardar log, idealmente com auditoria independente publicada.',
  'Evita app de VPN grátis de loja genérica, prefere provedor pago, estabelecido, com reputação verificável.',
  'Entende que VPN é uma camada, não a solução completa, ela trabalha junto com outras práticas de hardening, não substitui nenhuma delas.',
  'Lembra que Tor é uma ferramenta diferente, com propósito diferente, voltada pra anonimato de navegação, não pra troca simples de IP, e merece conteúdo próprio.',
];

const FAQ = [
  { q: 'VPN me deixa anônimo na internet?', a: 'Não. VPN esconde seu tráfego de quem está na sua rede local e da sua operadora, mas o provedor da VPN passa a enxergar o que antes só sua operadora via. Anonimato real exige camadas adicionais, e login em conta pessoal anula qualquer anonimato de rede.' },
  { q: 'VPN grátis é segura?', a: 'Na maioria dos casos não. Manter infraestrutura de VPN tem custo real, e serviço gratuito geralmente se sustenta vendendo dado de navegação do usuário, o oposto do que a pessoa busca ao instalar uma VPN.' },
  { q: 'Preciso de VPN pra acessar meu banco pelo celular?', a: 'Não necessariamente. A conexão com o banco já é criptografada via HTTPS independente de VPN. A VPN adiciona uma camada extra em rede pública, mas não é pré-requisito de segurança bancária.' },
  { q: 'VPN me esconde do Instagram ou do Google enquanto uso o app logado?', a: 'Não. O login na sua conta pessoal te identifica independente do IP que você está usando, a plataforma sabe quem você é assim que você entra com sua conta.' },
  { q: 'Vale a pena pagar por uma VPN?', a: 'Depende do seu uso. Pra quem usa Wi-Fi público com frequência ou quer evitar throttling de operadora, sim. Pra quem busca anonimato completo, VPN sozinha não é suficiente.' },
];

function Hero() {
  const reduceMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 900], [0, reduceMotion ? 0 : 180]);
  const opacity = useTransform(scrollY, [0, 650], [1, 0.22]);
  return <section className="vpn-hero relative min-h-[88vh] overflow-hidden">
    <motion.img style={{ y }} src={heroAsset} alt="Celular com VPN ativada, ícone de cadeado na tela, simbolizando conexão criptografada" width={1920} height={1088} fetchPriority="high" decoding="async" className="absolute inset-0 h-[110%] w-full object-cover" />
    <div className="vpn-hero-shade absolute inset-0" />
    <motion.div style={{ opacity }} className="relative z-10 flex min-h-[88vh] max-w-[1600px] flex-col justify-end px-6 pb-16 pt-36 md:px-12 md:pb-24 lg:px-20">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7, ease: EASE }} className="mb-7 flex items-center gap-4"><div className="vpn-brand-mark flex h-14 w-14 items-center justify-center rounded-md border border-background/25 bg-background/10 backdrop-blur-xl"><LockKeyhole className="h-7 w-7 text-background" /></div><div><p className="text-xs font-bold uppercase tracking-[0.3em] text-background/70">Segurança Mobile</p><p className="text-xl font-black uppercase tracking-normal text-background">Guias Práticos de Hardening</p></div></motion.div>
      <motion.h1 initial={{ opacity: 0, y: 42, filter: 'blur(10px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} transition={{ duration: 1, delay: .1, ease: EASE }} className="max-w-[17ch] text-[clamp(2.75rem,7.3vw,7rem)] font-black uppercase leading-[.92] tracking-normal text-background">VPN no Celular, Quando Ajuda e Quando é Teatro</motion.h1>
      <motion.p initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .8, delay: .35, ease: EASE }} className="mt-7 max-w-3xl text-lg leading-relaxed text-background/90 md:text-2xl">Todo mundo te vende VPN como escudo mágico. Metade do que prometem nem é tecnicamente possível.</motion.p>
    </motion.div>
  </section>;
}

function Heading({ chapter, children, dark = false }: { chapter: string; children: React.ReactNode; dark?: boolean }) {
  return <motion.div {...reveal()} className="mb-12 md:mb-16"><span className={`text-xs font-bold uppercase tracking-[0.3em] ${dark ? 'vpn-copper-soft' : 'vpn-copper'}`}>{chapter}</span><h2 className={`mt-5 max-w-5xl text-[clamp(2.35rem,5vw,5rem)] font-black uppercase leading-[.96] tracking-normal ${dark ? 'text-background' : 'vpn-ink'}`}>{children}</h2></motion.div>;
}

function PanoramicBackground({ asset, alt, light = false }: { asset: Asset; alt: string; light?: boolean }) {
  const reduceMotion = useReducedMotion();
  return <><motion.img src={asset} alt={alt} loading="lazy" decoding="async" width={1920} height={1088} animate={reduceMotion ? undefined : { scale: [1, 1.06, 1], x: ['0%', '-0.7%', '0%'] }} transition={reduceMotion ? undefined : { duration: 18, repeat: Infinity, ease: 'easeInOut' }} className="absolute inset-0 -z-30 h-full w-full object-cover"/><div className={light ? 'vpn-light-shade absolute inset-0 -z-20' : 'vpn-dark-shade absolute inset-0 -z-20'}/><div className="vpn-grid absolute inset-0 -z-10"/></>;
}

function EditorialFigure({ asset, alt, caption }: { asset: Asset; alt: string; caption: string }) {
  return <motion.figure {...reveal(.1)} className="vpn-figure group relative mt-12 overflow-hidden rounded-lg"><img src={asset} alt={alt} loading="lazy" decoding="async" width={1536} height={1024} className="h-[50vh] min-h-[360px] w-full object-cover transition-transform duration-1000 group-hover:scale-[1.035]"/><div className="absolute inset-0 bg-gradient-to-t from-foreground/95 via-transparent to-transparent"/><figcaption className="absolute inset-x-0 bottom-0 p-6 text-base font-semibold leading-relaxed text-background md:p-9 md:text-lg">{caption}</figcaption></motion.figure>;
}

export default function VpnNoCelularQuandoAjuda() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return <>
    <SeoHead custom={{
      title: 'VPN no Celular, Quando Ajuda e Quando é Teatro',
      description: 'VPN promete anonimato total, mas a maior parte disso é marketing. Descubra o que ela realmente protege, quando vale a pena, e onde ela vira só teatro de segurança.',
      canonical: 'https://lordjunnior.lovable.app/seguranca-mobile/vpn-no-celular',
      primaryKeyword: 'vpn no celular',
      lsiKeywords: ['vpn protege privacidade', 'vpn celular vale a pena', 'melhor vpn para celular', 'vpn grátis é segura', 'vpn não protege contra', 'quando usar vpn', 'vpn wifi público', 'vpn não é anônimo', 'política de logs vpn'],
      longTailKeywords: ['quando usar vpn no celular', 'vpn grátis é segura no celular', 'vpn protege privacidade em wifi público', 'o que vpn não protege contra'],
      breadcrumbs: [{ name: 'Início', url: '/' }, { name: 'Segurança Mobile', url: '/seguranca-mobile' }, { name: 'Guias Práticos de Hardening', url: '/seguranca-mobile/vpn-no-celular' }, { name: 'VPN no Celular', url: '/seguranca-mobile/vpn-no-celular' }],
      schemaType: 'Article', articleSection: 'Guias Práticos de Hardening', clusterParent: '/seguranca-mobile', relatedPages: ['/seguranca-mobile', '/seguranca-mobile/grapheneos', '/seguranca-mobile/calyxos'],
    }} faqItems={FAQ.map(({ q, a }) => ({ question: q, answer: a }))}/>

    <main className="vpn-page min-h-screen">
      <div className="absolute inset-x-0 top-0 z-30 px-6 pt-[52px] md:px-12 lg:px-20"><BackToHome /></div>
      <Hero />

      <section className="relative isolate overflow-hidden px-6 py-24 md:px-12 md:py-36 lg:px-20"><PanoramicBackground asset={heroAsset} alt="Celular protegido por conexão VPN" light/><div className="mx-auto grid max-w-[1600px] gap-12 lg:grid-cols-12 lg:gap-20"><motion.aside {...reveal()} className="min-w-0 lg:col-span-3"><div className="sticky top-24"><span className="vpn-copper text-xs font-bold uppercase tracking-[0.3em]">01 / Resposta direta</span><div className="vpn-rule mt-5 h-0.5 w-16"/></div></motion.aside><motion.div {...reveal(.08)} className="min-w-0 text-lg leading-[1.75] md:text-xl lg:col-span-9"><p>Vou ser direto, porque essa é uma das perguntas que mais recebo e a propaganda de VPN nunca é honesta sobre isso. VPN protege uma coisa específica muito bem, esconde o conteúdo do seu tráfego de quem está na mesma rede que você e da sua operadora. Fora isso, boa parte do que anunciam pra vender assinatura é exagero, ou mentira direta.</p></motion.div></div></section>

      <section className="vpn-deep relative isolate overflow-hidden px-6 py-24 md:px-12 md:py-36 lg:px-20"><PanoramicBackground asset={appAsset} alt="Aplicativo de VPN conectado no celular"/><div className="mx-auto max-w-[1600px]"><Heading chapter="02 / O que uma VPN realmente faz" dark>Um túnel criptografado. <span className="vpn-copper-soft font-editorial font-normal italic">Um limite claro.</span></Heading><motion.div {...reveal(.07)} className="max-w-4xl space-y-7 text-lg leading-[1.75] text-background/90 md:text-xl"><p>Tecnicamente, uma VPN cria um túnel criptografado entre o seu aparelho e o servidor da VPN. Isso esconde o conteúdo do seu tráfego de quem está observando a rede local, o dono do Wi-Fi do café, o administrador da rede do aeroporto, e também da sua operadora de internet, que deixa de ver o destino exato do que você acessa. O site que você visita passa a enxergar o IP do servidor da VPN, não o seu IP real.</p><p className="text-2xl font-black text-background md:text-4xl">Isso é útil e real. O problema é o que vendem além disso.</p></motion.div><EditorialFigure asset={appAsset} alt="Aplicativo de VPN no celular mostrando conexão ativa e servidor selecionado" caption="Aplicativo de VPN mostrando status conectado, servidor selecionado e tempo de conexão."/></div></section>

      <section className="relative isolate overflow-hidden px-6 py-24 md:px-12 md:py-36 lg:px-20"><PanoramicBackground asset={wifiAsset} alt="Pessoa usando celular em rede Wi-Fi pública" light/><div className="mx-auto max-w-[1600px]"><Heading chapter="03 / Quando VPN realmente ajuda">Proteção real no <span className="vpn-editorial">cenário certo.</span></Heading><div className="grid gap-5 md:grid-cols-2">{HELPS.map((text, i) => <motion.article key={text} {...reveal(i * .06)} className="vpn-card group rounded-lg border p-8 transition-all duration-500 hover:-translate-y-1 md:p-10"><div className="mb-6 flex items-center justify-between"><Wifi className="vpn-copper h-7 w-7"/><span className="vpn-muted text-xs font-black tracking-[0.25em]">0{i + 1}</span></div><p className="text-lg leading-[1.75]">{text}</p></motion.article>)}</div><EditorialFigure asset={wifiAsset} alt="Pessoa usando celular em rede Wi-Fi pública de aeroporto, cenário onde VPN é mais útil" caption="Rede pública é o cenário clássico em que uma VPN resolve um risco específico."/></div></section>

      <section className="vpn-deep relative isolate overflow-hidden px-6 py-24 md:px-12 md:py-36 lg:px-20"><PanoramicBackground asset={infraAsset} alt="Infraestrutura mundial de servidores VPN"/><div className="mx-auto max-w-[1600px]"><Heading chapter="04 / Quando VPN é teatro" dark>Trocar quem observa <span className="vpn-copper-soft font-editorial font-normal italic">não elimina observação.</span></Heading><div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">{THEATER.map((text, i) => <motion.article key={text} {...reveal((i % 3) * .06)} className="vpn-glass group rounded-lg border p-7 backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 md:p-8"><div className="mb-5 flex items-center justify-between"><Eye className="vpn-copper-soft h-6 w-6"/><span className="vpn-copper-soft text-xs font-black tracking-[0.25em]">0{i + 1}</span></div><p className="text-lg leading-[1.75] text-background/90">{text}</p></motion.article>)}</div><EditorialFigure asset={infraAsset} alt="Mapa mundial representando rede de tráfego de internet e infraestrutura de servidores VPN" caption="O servidor da VPN se torna um novo ponto de confiança dentro da rota do seu tráfego."/></div></section>

      <section className="relative isolate overflow-hidden px-6 py-24 md:px-12 md:py-36 lg:px-20"><PanoramicBackground asset={permissoesAsset} alt="Permissões excessivas solicitadas por aplicativo de VPN" light/><div className="mx-auto max-w-[1600px]"><Heading chapter="05 / Sinais de alerta na hora de escolher uma VPN">Promessa sem prova <span className="vpn-editorial">não é política.</span></Heading><div className="grid gap-5 md:grid-cols-2">{WARNINGS.map((text, i) => <motion.article key={text} {...reveal(i * .06)} className="vpn-card group rounded-lg border p-8 transition-all duration-500 hover:-translate-y-1 md:p-10"><div className="mb-6 flex items-center justify-between"><AlertTriangle className="vpn-copper h-7 w-7"/><span className="vpn-muted text-xs font-black tracking-[0.25em]">ALERTA {String(i + 1).padStart(2, '0')}</span></div><p className="text-lg leading-[1.75]">{text}</p></motion.article>)}</div><EditorialFigure asset={permissoesAsset} alt="Tela de permissões excessivas solicitadas por aplicativo de VPN genérico na loja de aplicativos" caption="Permissões incompatíveis com a função declarada merecem desconfiança imediata."/></div></section>

      <section className="vpn-deep relative isolate overflow-hidden px-6 py-24 md:px-12 md:py-36 lg:px-20"><PanoramicBackground asset={configuracaoAsset} alt="Configuração de VPN no sistema operacional do celular"/><div className="mx-auto max-w-[1600px]"><Heading chapter="06 / Recomendação prática" dark>Uma camada dentro de <span className="vpn-copper-soft font-editorial font-normal italic">uma estratégia.</span></Heading><div className="grid gap-4">{RECOMMENDATIONS.map((text, i) => <motion.article key={text} {...reveal(i * .05)} className="vpn-card-dark group grid gap-5 rounded-lg border p-6 backdrop-blur-xl transition-all duration-500 hover:translate-x-1 md:grid-cols-[64px_1fr] md:p-8"><div className="vpn-step flex h-12 w-12 items-center justify-center rounded-full text-sm font-black">{String(i + 1).padStart(2, '0')}</div><p className="self-center text-lg leading-[1.75] text-background/90">{text}</p></motion.article>)}</div><div className="mt-8 grid gap-4 md:grid-cols-2"><Button asChild size="lg" className="vpn-btn h-14 justify-between px-6 font-bold"><Link to="/seguranca-mobile/grapheneos">GrapheneOS como camada de sistema <ArrowRight/></Link></Button><Button asChild size="lg" className="vpn-btn h-14 justify-between px-6 font-bold"><Link to="/seguranca-mobile/calyxos">CalyxOS como camada de sistema <ArrowRight/></Link></Button></div><EditorialFigure asset={configuracaoAsset} alt="Menu de configuração de VPN nas opções do sistema operacional do celular" caption="Configuração de VPN sempre ativa e bloqueio de conexões fora do túnel no sistema do celular."/></div></section>

      <section id="faq" className="relative isolate scroll-mt-16 overflow-hidden px-6 py-24 md:px-12 md:py-36 lg:px-20"><PanoramicBackground asset={infraAsset} alt="Servidores que processam conexões VPN"/><div className="mx-auto max-w-[1600px]"><Heading chapter="07 / FAQ estratégico" dark>Perguntas diretas, <span className="vpn-copper-soft font-editorial font-normal italic">respostas abertas.</span></Heading><div className="grid items-start gap-5 md:grid-cols-2 xl:grid-cols-3">{FAQ.map((item, i) => <motion.article key={item.q} {...reveal((i % 3) * .06)} className={`vpn-glass group rounded-lg border p-7 backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 md:p-8 ${i === 0 || i === 4 ? 'md:col-span-2' : ''}`}><div className="mb-5 flex items-center justify-between"><span className="vpn-copper-soft text-xs font-black tracking-[0.25em]">FAQ {String(i + 1).padStart(2, '0')}</span><ShieldCheck className="vpn-copper-soft h-5 w-5"/></div><h3 className="text-xl font-black leading-tight tracking-normal text-background md:text-2xl">{item.q}</h3><p className="mt-5 text-base font-medium leading-[1.75] text-background/90 md:text-lg">{item.a}</p></motion.article>)}</div></div></section>

      <section className="vpn-deep relative isolate overflow-hidden px-6 py-24 md:px-12 md:py-32 lg:px-20"><PanoramicBackground asset={heroAsset} alt="Celular com VPN ativa em ambiente escuro"/><div className="mx-auto grid max-w-[1600px] gap-12 lg:grid-cols-2"><motion.div {...reveal()}><span className="vpn-copper-soft text-xs font-bold uppercase tracking-[0.3em]">Veredito</span><h2 className="mt-5 text-[clamp(2.5rem,5vw,5rem)] font-black uppercase leading-none tracking-normal text-background">Ferramenta específica. <span className="vpn-copper-soft font-editorial font-normal italic">Problema específico.</span></h2></motion.div><motion.div {...reveal(.12)} className="space-y-6 text-lg leading-[1.75] text-background/90 md:text-xl"><p>VPN não é escudo mágico, e também não é inútil. É uma ferramenta específica, que resolve um problema específico, esconder seu tráfego de rede de quem está observando localmente ou pela operadora. Tratar isso como sinônimo de anonimato completo é o erro que a indústria de marketing de VPN mais lucra vendendo.</p><p>Use pelo motivo certo, em rede pública, contra throttling, como camada adicional, e não pelo motivo errado, achando que ela sozinha te torna invisível.</p><p className="font-black text-background">A pergunta não é se VPN funciona. A pergunta é pra que exatamente você está usando ela, e se o problema que você quer resolver é realmente esse.</p></motion.div></div></section>

      <section className="relative isolate overflow-hidden px-6 py-20 md:px-12 md:py-28 lg:px-20"><PanoramicBackground asset={configuracaoAsset} alt="Configuração prática de VPN no celular" light/><div className="mx-auto max-w-[1600px]"><Heading chapter="Guias Práticos de Hardening">Continue sua <span className="vpn-editorial">trilha.</span></Heading><div className="grid gap-5 md:grid-cols-3"><motion.div {...reveal()}><Link to="/seguranca-mobile" className="vpn-card vpn-focus group block h-full rounded-lg border p-8 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl"><Smartphone className="vpn-copper h-7 w-7"/><h3 className="vpn-ink mt-6 text-2xl font-black">Segurança Mobile</h3><p className="mt-3 text-lg leading-relaxed">Volte ao hub e escolha a próxima frente de proteção móvel.</p><span className="vpn-copper mt-6 inline-flex items-center gap-2 font-bold">Acessar o hub <ArrowRight className="h-4 w-4"/></span></Link></motion.div><motion.article {...reveal(.07)} className="vpn-card-future h-full rounded-lg border border-dashed p-8"><CheckCircle2 className="vpn-muted h-7 w-7"/><h3 className="vpn-ink mt-6 text-2xl font-black">Checklist de permissões</h3><p className="mt-3 text-lg leading-relaxed">Espaço reservado para o próximo guia prático.</p><span className="vpn-muted mt-6 inline-flex font-bold">Em preparação</span></motion.article><motion.article {...reveal(.14)} className="vpn-card-future h-full rounded-lg border border-dashed p-8"><Network className="vpn-muted h-7 w-7"/><h3 className="vpn-ink mt-6 text-2xl font-black">Comparação de apps de mensagem</h3><p className="mt-3 text-lg leading-relaxed">Espaço reservado para a análise futura da categoria.</p><span className="vpn-muted mt-6 inline-flex font-bold">Em preparação</span></motion.article></div></div></section>
    </main>
  </>;
}
