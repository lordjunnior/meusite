import { useEffect, useId, useRef, useState, type ElementType, type ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ChevronDown, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { EASE } from '@/components/seguranca-mobile/EditorialKit';
const REF_WEBM_URL = '/heroes/dolar-virtual-reference.webm';
const REF_MP4_URL = '/heroes/dolar-virtual-reference.mp4';
import wallet from '@/assets/dolar-virtual/carteira-fisica.jpg';
import backup from '@/assets/dolar-virtual/backup-ptbr.jpg';
import payment from '@/assets/dolar-virtual/conferencia-ptbr.jpg';
import reserves from '@/assets/dolar-virtual/estudo-reservas.jpg';
import fiat from '@/assets/dolar-virtual/moedas-fiat.jpg';

const rise = { initial: { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: '-40px' }, transition: { duration: .65, ease: EASE } };

export function ReferenceVideo({ hero = false }: { hero?: boolean }) {
  const ref = useRef<HTMLVideoElement>(null);
  const reduce = useReducedMotion();
  const [visible, setVisible] = useState(hero);
  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { rootMargin: '100px' });
    observer.observe(video);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    if (reduce || !visible) video.pause();
    else video.play().catch(() => undefined);
  }, [reduce, visible]);
  return <div className={`dv-video ${hero ? 'dv-video-hero' : ''}`}>
    <video ref={ref} muted loop playsInline preload={hero ? 'auto' : 'metadata'} aria-label="Animação de moedas no fundo da referência" onLoadedData={() => { if (!reduce && visible) ref.current?.play().catch(() => undefined); }}><source src={REF_WEBM_URL} type="video/webm"/><source src={REF_MP4_URL} type="video/mp4"/></video>
  </div>;
}

export function DollarHero() {
  return <header className="dv-hero">
    <ReferenceVideo hero/>
    <div className="dv-hero-wash"/>
    <div className="dv-container dv-hero-content">
      <div className="dv-hero-top"><Link to="/bitcoin" className="dv-back" aria-label="Voltar para Bitcoin"><ArrowLeft size={15}/> VOLTAR PARA BITCOIN</Link><span>MANUAL DE ESTUDO / 01</span></div>
      <motion.div {...rise}>
        <span className="dv-kicker">Jade Wallet · Liquid · AlfredP2P</span>
        <h1>Como comprar<br/><span className="smx-editorial">Dólar Virtual</span><small>(USDT)</small></h1>
        <p className="dv-hero-hook">Trocar a moeda não elimina o risco.</p>
        <p className="dv-hero-lede">O procedimento completo para estudar USDT na Liquid com hardware wallet. Sem endosso ao ativo, sem esconder o emissor e sem confundir PIX com privacidade.</p>
        <div className="dv-actions"><Button asChild size="lg"><a href="#jade-wallet">Começar o setup <ArrowRight/></a></Button><Button asChild variant="link"><a href="#posicionamento">Antes, entenda os riscos <ArrowRight/></a></Button></div>
      </motion.div>
      <div className="dv-hero-bottom"><span><ShieldCheck size={17}/> Bitcoin e autocustódia continuam sendo a tese.</span><a href="#posicionamento" aria-label="Ler posicionamento"><ChevronDown/></a></div>
    </div>
  </header>;
}

export function Infrastructure({ secondary = false }: { secondary?: boolean }) {
  const items = secondary ? ['Hardware open-source', 'Assinatura física', 'Backup offline', 'Transações confidenciais', 'Liquidação P2P'] : ['Blockstream', 'Liquid Network', 'Tether USDT', 'Jade Wallet', 'AlfredP2P'];
  return <div className="dv-infrastructure" aria-label="Infraestrutura do roteiro"><div className="dv-ticker">{[0,1,2,3].map(copy=><div key={copy} aria-hidden={copy > 0}>{items.map(item=><span key={item}>{item}<span className="dv-ticker-dot">·</span></span>)}</div>)}</div></div>;
}

export function OperationalPosition() {
  return <section id="posicionamento" className="dv-band dv-position"><div className="dv-container dv-position-grid">
    <motion.div {...rise}><span className="dv-kicker">Aviso operacional</span><h2>Conhecer não<br/>é <span className="smx-editorial">aprovar.</span></h2><p className="dv-position-rule">Critério e finalidade deste roteiro</p>
      <dl className="dv-dossier" aria-label="Ficha técnica do ativo">
        {[['Emissor','Tether, empresa privada'],['Rede','Liquid, sidechain federada'],['Custódia','Jade, chave no dispositivo'],['Pagamento','PIX, rastreável'],['Classificação','Liquidez de curto prazo, não reserva']].map(([k,v])=><div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}
      </dl>
      <blockquote className="dv-quote">"Soberania definitiva exige Bitcoin e autocustódia física rigorosa."</blockquote></motion.div>
    <motion.div {...rise} className="dv-prose"><p><strong>Minha postura sobre soberania financeira é clara: eu não recomendo stablecoins nem moedas estatais como reserva de valor.</strong> Soberania definitiva exige Bitcoin e autocustódia física rigorosa.</p><p>No entanto, a comunidade solicitou com frequência um método direto para dolarizar liquidez de curto prazo sem deixar custódia em bancos ou corretoras nacionais. Eu não aprovo a ferramenta como destino final, mas se você decidiu utilizá-la, deve saber como operá-la no mais alto padrão técnico de segurança possível.</p><p>Este material é estritamente educacional para estudo da infraestrutura. A seguir está o passo a passo completo, com cada detalhe de configuração da Jade Wallet e da rede Liquid, expondo com precisão onde estão as vantagens e onde residem os riscos reais.</p><div className="dv-inline-warning"><ShieldCheck/><p><strong>Chaves próprias não tornam o emissor independente.</strong> USDT depende da Tether e de suas reservas. A Liquid depende de uma federação. A hardware wallet não elimina esses riscos.</p></div></motion.div>
  </div></section>;
}

export function DollarPanels() {
  const [active, setActive] = useState<number | null>(null);
  const items = [
    { title: 'Paridade e lastro', desc: 'A meta é acompanhar o dólar. Reservas, emissor e perda de paridade continuam no risco.', image: reserves, alt: 'Análise de documentos financeiros e reservas', to: '#regulamentacao', label: '01 / EMISSOR' },
    { title: 'Rede Liquid', desc: 'Valores e ativos confidenciais não tornam PIX anônimo nem eliminam a federação.', image: payment, alt: 'Conferência de endereço na rede Liquid em português', to: '#comprando-usdt', label: '02 / INFRAESTRUTURA' },
    { title: 'Autocustódia física', desc: 'Assine no dispositivo. Proteja a seed. PIN e palavras de recuperação têm funções diferentes.', image: wallet, alt: 'Carteira física e celular sobre mesa de estudo', to: '#jade-wallet', label: '03 / CHAVES' },
    { title: 'Fora da custódia bancária', desc: 'Trocar quem guarda as chaves não transforma uma moeda estatal em reserva soberana.', image: fiat, alt: 'Cédulas de real e dólar para comparação monetária', to: '#por-que-usar', label: '04 / LIMITE' },
  ];
  return <section className="dv-band dv-overview"><div className="dv-container"><span className="dv-kicker">Antes da primeira transação</span><h2>Quatro pontos.<br/><span className="smx-editorial">Nenhum ponto cego.</span></h2><div className="dv-panels" onMouseLeave={() => setActive(null)}>{items.map((item,i)=><a href={item.to} key={item.title} onMouseEnter={()=>setActive(i)} onFocus={()=>setActive(i)} className={`dv-panel ${active === i ? 'is-active' : ''}`}><img src={item.image} alt={item.alt} width={1536} height={1024} loading="lazy"/><div className="dv-panel-copy"><span className="dv-kicker">{item.label}</span><h3>{item.title}</h3><p>{item.desc}</p><span className="dv-panel-cta">Examinar <ArrowRight size={16}/></span></div></a>)}</div></div></section>;
}

export function ChapterBlock({ id, phase, title, icon: Icon, image, imageAlt, children, index }: { id: string; phase: string; title: string; icon: ElementType; image: string; imageAlt: string; children: ReactNode; index: number }) {
  return <>
    {index === 3 && <><Infrastructure secondary/><section className="dv-band dv-procedure"><div className="dv-container dv-procedure-grid"><div><span className="dv-kicker">Roteiro operacional</span><h2>Configurar.<br/>Conferir.<br/><span className="smx-editorial">Só então operar.</span></h2><nav aria-label="Etapas práticas">{[['jade-wallet','01','Preparar a Jade'],['comprando-usdt','02','Estudar a compra P2P'],['seguranca','03','Validar as camadas']].map(([to,n,title])=><a href={`#${to}`} key={to}><span>{n}</span>{title}<ArrowRight/></a>)}</nav></div><ReferenceVideo/></div></section></>}
    <section id={id} className={`dv-band dv-chapter ${index % 2 ? 'dv-chapter-deep' : ''}`}>
      <div className="dv-container">
        <motion.div {...rise} className="dv-chapter-heading"><span className="dv-kicker"><Icon size={18}/>{phase}</span><h2>{title}</h2></motion.div>
        <div className={`dv-chapter-grid ${index % 2 ? 'dv-reverse' : ''}`}>
          <motion.figure {...rise} className="dv-figure"><img src={image} alt={imageAlt} width={1536} height={1024} loading="lazy"/><figcaption>{index >= 3 ? 'Estudo operacional / confira cada etapa' : 'Estudo de infraestrutura / conheça os limites'}</figcaption></motion.figure>
          <motion.div {...rise} className="dv-prose dv-chapter-copy">{children}</motion.div>
        </div>
      </div>
    </section>
  </>;
}

export function MacroStep({ number, title, summary, icon: Icon, children, defaultOpen = false }: { number: number; title: string; summary: string; icon: ElementType; children: ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  const id = useId();
  return <article className="dv-step"><Button variant="ghost" className="dv-step-trigger" aria-expanded={open} aria-controls={id} onClick={()=>setOpen(!open)}><span className="dv-step-number">{String(number).padStart(2,'0')}</span><span><strong>{title}</strong><span>{summary}</span></span><Icon className="dv-step-icon"/><ChevronDown className={open ? 'rotate-180' : ''}/></Button><div id={id} hidden={!open} className="dv-step-content">{children}</div></article>;
}

export const dollarFaq = [
  { q: 'O que é uma stablecoin como USDT?', a: 'USDT (Tether) é um token que busca acompanhar o dólar americano na proporção de 1:1. Cada unidade emitida deve ter reservas equivalentes. A meta de paridade não é garantia: existem riscos de emissor, composição das reservas, liquidez e perda de paridade. Não é Bitcoin nem reserva soberana.' },
  { q: 'Preciso de corretora para comprar USDT?', a: 'Uma operação P2P pode permitir recebimento direto na sua carteira, sem deixar saldo em uma corretora. Verifique os requisitos atuais do serviço, a contraparte, a cotação, as taxas e a rede disponível. Ausência de KYC na plataforma não torna o pagamento via PIX anônimo nem elimina obrigações legais.' },
  { q: 'O que é a rede Liquid e por que usá-la?', a: 'Liquid é uma sidechain federada do Bitcoin. Usa blocos de aproximadamente um minuto e transações confidenciais para ocultar valores e tipos de ativos na cadeia. Não oculta todos os metadados nem registros bancários. A federação, o emissor do token e a disponibilidade de liquidez continuam sendo dependências.' },
  { q: 'A Jade Wallet é segura? O PIN é uma 13ª palavra?', a: 'A Jade é open-source e assina mantendo as chaves isoladas do celular no uso normal. Confira os dados no dispositivo e use software oficial. O PIN protege o acesso à Jade, não é uma 13ª palavra nem uma passphrase BIP39. Quem obtiver a seed pode restaurar e movimentar a carteira sem o PIN do dispositivo original.' },
  { q: 'Comprar USDT via PIX é anônimo?', a: 'Não. PIX é vinculado à identidade bancária e deixa registros rastreáveis. Transações confidenciais na Liquid não apagam o pagamento bancário. Dinheiro físico também não garante anonimato por si só. Consulte o guia de RoboSats e Tor para entender modelos de privacidade, limites e obrigações.' },
  { q: 'Por que as taxas são altas em plataformas P2P?', a: 'Compare o spread da cotação, tarifas do serviço, custo da rede e liquidez disponível. Um preço maior não comprova mais privacidade ou segurança. Na Liquid, taxas de rede são pagas em L-BTC; confirme como o aplicativo ou o serviço fornece esse saldo e confira o custo total antes de autorizar.' },
];

export function DollarFaq() {
  return <section id="faq" className="dv-band dv-faq"><div className="dv-container dv-faq-grid"><div><span className="dv-kicker">Perguntas frequentes</span><h2>A dúvida certa<br/><span className="smx-editorial">evita a perda.</span></h2><img src={backup} alt="Cópia de segurança manuscrita com título em português" width={1536} height={1024} loading="lazy"/></div><div>{dollarFaq.map((item,i)=><details key={item.q}><summary><span className="dv-faq-number">0{i+1}</span><h3>{item.q}</h3><ChevronDown size={20}/></summary><p>{item.a}</p></details>)}</div></div></section>;
}