import { useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, useScroll, useTransform } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import {
  AlertTriangle, ArrowRight, Shield, Lock, Eye,
  Server, Code, QrCode, Terminal,
  CheckCircle2, XCircle, Fingerprint, Globe,
  ChevronRight, ShieldAlert, Zap, ExternalLink,
  Ban, FileCode2, HardDrive, KeyRound, Clock,
  Rocket, Gift, MousePointerClick, Sparkles,
} from 'lucide-react';
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from '@/components/ui/accordion';
import ScrollToTop from '@/components/ScrollToTop';
import FooterSection from '@/components/FooterSection';
import BackToHome from '@/components/BackToHome';
import MicroCtaResistencia from '@/components/MicroCtaResistencia';

import imgHero from '@/assets/pix-anonimo-hero.jpg';
import imgCodigo from '@/assets/pix-anonimo-codigo.jpg';
import imgQrcode from '@/assets/pix-anonimo-qrcode.jpg';
import imgServidor from '@/assets/pix-anonimo-servidor.jpg';
import imgPronto from '@/assets/pix-anonimo-pronto.jpg';
import imgPost from '@/assets/pix-anonimo-post.jpg';

gsap.registerPlugin(ScrollTrigger);

const APPLE_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const BG = '#050808';
const LIVE_URL = 'https://receba-pix.vercel.app/';

/* ── GSAP Section ── */
const GS = ({ children, className = '', id }: { children: React.ReactNode; className?: string; id?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    gsap.fromTo(ref.current,
      { opacity: 0, y: 50, filter: 'blur(8px)' },
      { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 85%', toggleActions: 'play none none none' } }
    );
    return () => { ScrollTrigger.getAll().forEach(t => { if (t.trigger === ref.current) t.kill(); }); };
  }, []);
  return <div ref={ref} id={id} className={className}>{children}</div>;
};

/* ── FAQ Data ── */
const FAQ = [
  {
    q: 'Receber PIX sem mostrar meus dados pessoais e CPF e legal?',
    a: 'Sim. Utilizar gateways de pagamento que geram QR Codes dinamicos e uma pratica comum no comercio eletronico. A diferenca e que, ao inves de vincular o pagamento diretamente a sua conta bancaria pessoal, voce utiliza uma API intermediaria. O pagador ve apenas as informacoes do gateway, nao as suas. Isso nao configura evasao fiscal ou fraude — e apenas uma camada de privacidade na transacao, similar ao que grandes empresas fazem com seus proprios gateways.',
  },
  {
    q: 'Qual a diferenca entre este metodo e o PIX comum?',
    a: 'No PIX comum, quando alguem te paga, ele ve seu nome completo, CPF parcial e banco. Com este metodo, o pagador escaneia um QR Code gerado por uma API de pagamento. Ele ve apenas os dados do gateway (como "Pagamento Processado por [Nome do Gateway]"). Seus dados pessoais ficam completamente ocultos da outra parte. O dinheiro cai na conta vinculada ao gateway, que voce controla.',
  },
  {
    q: 'Por que o site ja esta pronto e nao preciso programar nada?',
    a: 'Porque Lord Junnior desenvolveu toda a infraestrutura de ponta a ponta: o script PHP, a integracao com a API do gateway, a hospedagem, o certificado SSL e a interface do usuario. O site em receba-pix.vercel.app ja esta funcional, com QR Code dinamico e copia-e-cola do PIX. Voce nao precisa tocar em uma unica linha de codigo — so precisa acessar, configurar sua chave de API e comecar a receber.',
  },
  {
    q: 'Nao entendo de programacao. Consigo usar mesmo assim?',
    a: 'Sim, esse e exatamente o ponto. A maioria das pessoas que quer privacidade no PIX nao sabe programar — e nao precisa saber. A plataforma que Lord Junnior construiu e plug-and-play: voce acessa o site, ele gera o QR Code automaticamente. Nao existe terminal, nao existe linha de comando, nao existe configuracao de servidor. Esta tudo pronto.',
  },
  {
    q: 'Por que nao posso hospedar em plataformas como Netlify ou GitHub Pages?',
    a: 'Porque o script que gera o QR Code utiliza PHP com execucao server-side. Plataformas como Netlify e GitHub Pages sao feitas para hospedagem de sites estaticos (HTML, CSS, JavaScript puro). Elas NAO executam PHP. Esse e um dos erros fatais mais comuns — e um dos motivos pelos quais Lord Junnior ja resolveu essa questao hospedando o sistema em infraestrutura compativel.',
  },
  {
    q: 'Quais APIs de pagamento posso usar?',
    a: 'Existem diversas opcoes no mercado brasileiro: Mercado Pago, PagSeguro, Asaas, Pagar.me, entre outras. Cada uma tem seu processo de cadastro e taxas. A logica do script e a mesma para todas: voce faz uma requisicao POST com o valor desejado, recebe um payload PIX (o "copia e cola") e um QR Code.',
  },
  {
    q: 'Como funciona a autenticacao com a API?',
    a: 'Cada gateway fornece uma chave de API (API Key ou Access Token) apos o cadastro. No script PHP, essa chave e enviada no header Authorization de cada requisicao. NUNCA exponha essa chave no frontend (JavaScript do navegador). O script PHP roda no servidor, mantendo a chave invisivel para o usuario final.',
  },
  {
    q: 'Posso usar este metodo para vender produtos online?',
    a: 'Sim. Este e exatamente o uso principal. Voce pode integrar o sistema em uma pagina de vendas com um botao "Pagar com PIX", que gera o QR Code dinamicamente com o valor do produto. O cliente paga, e voce recebe uma notificacao via webhook do gateway confirmando o pagamento. Tudo automatizado.',
  },
  {
    q: 'Preciso declarar os valores recebidos?',
    a: 'Sim. Independente do metodo utilizado para receber pagamentos, a legislacao tributaria brasileira exige declaracao de renda. Este metodo protege sua privacidade perante TERCEIROS (o pagador nao ve seus dados), mas nao substitui obrigacoes fiscais.',
  },
  {
    q: 'Qual o custo para montar esta infraestrutura do zero?',
    a: 'VPS basica: R$15-40/mes. Dominio: R$40-60/ano. Taxa do gateway por transacao: 1% a 3.5%. Certificado SSL: gratuito (Lets Encrypt). Total: menos de R$50/mes. Mas como Lord Junnior ja construiu o sistema funcional, voce pode comecar sem gastar nada com infraestrutura.',
  },
];

/* ── ERROS FATAIS ── */
const ERROS_FATAIS = [
  {
    icon: Server,
    titulo: 'Hospedar em plataforma estatica',
    desc: 'Netlify, GitHub Pages e plataformas estaticas NAO executam PHP. O QR Code nunca sera gerado. Voce ve uma pagina em branco ou um erro 500 sem explicacao.',
    solucao: 'O sistema pronto ja esta hospedado em infraestrutura compativel. Voce nao precisa se preocupar com isso.',
  },
  {
    icon: KeyRound,
    titulo: 'Expor a API Key no frontend',
    desc: 'Se a chave da API ficar no JavaScript do navegador, qualquer pessoa pode inspecionar o codigo e usar sua chave para gerar cobrancas em seu nome.',
    solucao: 'A arquitetura pronta mantem a API Key exclusivamente no backend PHP, invisivel para o usuario final.',
  },
  {
    icon: Lock,
    titulo: 'Nao usar HTTPS',
    desc: 'Sem SSL, os dados trafegam em texto puro. Qualquer intermediario na rede pode interceptar tokens de autenticacao.',
    solucao: 'O sistema ja opera com certificado SSL ativo. Todas as conexoes sao criptografadas por padrao.',
  },
  {
    icon: FileCode2,
    titulo: 'Content-Type incorreto na requisicao',
    desc: 'Se o header Content-Type nao estiver como application/json, a API rejeita a requisicao silenciosamente. Voce recebe erro generico sem entender o motivo.',
    solucao: 'Os headers ja estao configurados corretamente no script. Nenhuma intervencao necessaria.',
  },
];

/* ── O QUE FOI CONSTRUIDO ── */
const CONSTRUIDO = [
  { icon: Code, titulo: 'Script PHP Completo', desc: 'Backend server-side com cURL, autenticacao via Bearer Token, tratamento de erros e logging. Pronto para producao.' },
  { icon: QrCode, titulo: 'Geracao Automatica de QR Code', desc: 'O sistema gera QR Codes dinamicos com valores personalizados em tempo real. Inclui funcao copia-e-cola do payload PIX.' },
  { icon: Lock, titulo: 'Certificado SSL Ativo', desc: 'Todas as conexoes sao criptografadas via HTTPS. Dados de autenticacao trafegam em canal seguro.' },
  { icon: Shield, titulo: 'API Key Protegida', desc: 'A chave de acesso ao gateway fica exclusivamente no backend. Nenhum visitante do site consegue acessa-la.' },
  { icon: Globe, titulo: 'Hospedagem Compativel', desc: 'Servidor com suporte a PHP 7.4+ e extensao cURL. Nada de Netlify, nada de GitHub Pages, nada de erro 500.' },
  { icon: Fingerprint, titulo: 'Dados do Recebedor Ocultos', desc: 'O pagador ve apenas as informacoes do gateway de pagamento. Seu nome, CPF e banco nunca aparecem na tela do pagador.' },
];

/* ── COMPARATIVO ── */
const COMPARATIVO = [
  { feature: 'Dados pessoais visiveis ao pagador', pix: true, metodo: false },
  { feature: 'CPF/CNPJ aparece na transacao', pix: true, metodo: false },
  { feature: 'Nome completo exposto', pix: true, metodo: false },
  { feature: 'Banco identificado', pix: true, metodo: false },
  { feature: 'QR Code dinamico automatico', pix: false, metodo: true },
  { feature: 'Webhook de confirmacao', pix: false, metodo: true },
  { feature: 'Integravel com e-commerce', pix: false, metodo: true },
  { feature: 'Funciona sem conta bancaria pessoal', pix: false, metodo: true },
  { feature: 'Sistema pronto para usar', pix: false, metodo: true },
  { feature: 'Zero conhecimento tecnico exigido', pix: true, metodo: true },
];

/* ── TEMPO COMPARATIVO ── */
const TEMPO = [
  { caminho: 'Fazer sozinho', tempo: '8-40 horas', itens: ['Aprender PHP', 'Configurar VPS', 'Instalar Apache/Nginx', 'Configurar SSL', 'Integrar API', 'Debugar erros', 'Testar em producao'] },
  { caminho: 'Com o sistema pronto', tempo: '2 minutos', itens: ['Acessar o site', 'Usar'] },
];

export default function PixAnonimo() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const { scrollYProgress } = useScroll();
  const pw = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  const faqSchema = {
    '@context': 'https://schema.org', '@type': 'FAQPage',
    mainEntity: FAQ.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  };
  const howToSchema = {
    '@context': 'https://schema.org', '@type': 'HowTo',
    name: 'Como Receber PIX Sem Mostrar Seus Dados Pessoais',
    description: 'Sistema pronto para receber PIX anonimo com QR Code dinamico. Criado por Lord Junnior — sem necessidade de programacao.',
    totalTime: 'PT2M',
    step: [
      { '@type': 'HowToStep', position: 1, name: 'Acessar o sistema', text: 'Acesse receba-pix.vercel.app — o sistema ja esta funcional e pronto para uso.' },
      { '@type': 'HowToStep', position: 2, name: 'Gerar QR Code', text: 'O site gera automaticamente um QR Code PIX dinamico. O pagador nao ve seus dados pessoais.' },
    ],
  };
  const articleSchema = {
    '@context': 'https://schema.org', '@type': 'TechArticle',
    headline: 'PIX Anonimo: Sistema Pronto Para Receber Pagamentos Sem Expor Dados Pessoais',
    author: { '@type': 'Person', name: 'Lord Junnior' },
    publisher: { '@type': 'Organization', name: 'Universidade Satoshi' },
    url: 'https://lordjunnior.com.br/pix-privacidade',
    datePublished: '2026-04-12', dateModified: '2026-04-12',
    proficiencyLevel: 'Beginner',
    dependencies: 'Nenhuma — sistema ja construido e hospedado.',
  };

  return (
    <div className="min-h-screen text-foreground font-sans overflow-x-hidden" style={{ background: BG }}>
      <ScrollToTop />
      <Helmet>
        <title>PIX Sem Mostrar Dados: Sistema Pronto Para Receber Anonimamente | Lord Junnior</title>
        <meta name="description" content="Sistema pronto para receber PIX sem expor CPF, nome ou banco. Sem programacao, sem configuracao. Lord Junnior ja construiu tudo — acesse e use agora." />
        <link rel="canonical" href="https://lordjunnior.com.br/pix-privacidade" />
        <meta name="keywords" content="pix anonimo, receber pix sem mostrar dados, pix privado, pix sem cpf, qr code pix automatico, gateway pagamento pix, pix php script, pix api, receber pix sem banco, pix sem expor identidade, pagamento privado brasil, pix descentralizado, privacidade financeira pix, como esconder dados pix, pix sem nome aparecendo, anonymous pix brazil, receive pix privately, pix payment gateway, hide personal data pix, pix qr code generator, receber pix anonimo sistema pronto, pix sem programacao, gerar qr code pix automatico gratis, receba pix privado, pix oculto dados, анонимный пикс бразилия, ピクス匿名受取, pago pix anónimo, pix anonymous empfangen" />
        <meta property="og:title" content="PIX Sem Mostrar Dados — Sistema Pronto por Lord Junnior" />
        <meta property="og:description" content="Eu ja construi o sistema inteiro. Voce so precisa acessar e usar. Sem programacao, sem VPS, sem dor de cabeca." />
        <meta property="og:url" content="https://lordjunnior.com.br/pix-privacidade" />
        <meta property="og:type" content="article" />
        <html lang="pt-BR" />
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(howToSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
      </Helmet>

      {/* Progress */}
      <motion.div className="fixed top-0 left-0 right-0 h-[2px] bg-chart-green z-50 origin-left" style={{ width: pw }} />

      {/* ══ HERO FULL-BLEED ══ */}
      <section className="relative h-[90vh] min-h-[600px] flex items-end overflow-hidden">
        <img src={imgHero} alt="Sistema de recebimento PIX anonimo com QR Code dinamico" className="absolute inset-0 w-full h-full object-cover" width={1920} height={1080} loading="lazy" decoding="async" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050808] via-[#050808]/70 to-[#050808]/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050808]/80 via-transparent to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 pb-16 w-full">
          <div className="relative z-20 mb-8">
            <BackToHome />
          </div>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: APPLE_EASE }}>
            <div className="flex items-center gap-3 mb-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm bg-chart-green/10 border border-chart-green/30">
                <span className="w-2 h-2 rounded-full bg-chart-green animate-pulse" />
                <span className="text-chart-green font-black uppercase tracking-[0.4em] text-[8px] font-mono">Sistema Ativo</span>
              </div>
              <span className="px-3 py-1.5 rounded-sm bg-amber-500/10 border border-amber-500/25 text-amber-400 font-mono text-[8px] tracking-[0.3em] uppercase font-bold">
                Pronto Para Usar
              </span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.15, ease: APPLE_EASE }}
            className="font-['Bebas_Neue'] text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight leading-[0.9] mb-6 max-w-5xl"
          >
            Eu Ja Construi o Sistema.{' '}
            <span className="text-chart-green">Voce So Precisa Usar.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl font-['Inter_Tight'] font-medium mb-10"
          >
            Toda vez que alguem te paga via PIX, seu nome completo, CPF e banco ficam expostos.
            Voce precisaria aprender PHP, configurar servidor, integrar API, instalar SSL.
            <span className="text-foreground font-bold"> Eu ja fiz tudo isso por voce. O site esta pronto e funcionando.</span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-wrap gap-4 mb-10"
          >
            <a
              href={LIVE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 bg-chart-green text-[#050808] rounded-sm font-bold text-sm uppercase tracking-wider hover:bg-chart-green/90 transition-all group"
            >
              <Rocket className="w-5 h-5" />
              Acessar o Sistema Agora
              <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap gap-8 pt-8 border-t border-border/20"
          >
            {[
              { label: 'Dados que o PIX expoe', value: '04' },
              { label: 'Horas que voce economiza', value: '40h' },
              { label: 'Linhas de codigo escritas', value: '0' },
              { label: 'Tempo para comecar', value: '2min' },
            ].map((s, i) => (
              <div key={i}>
                <p className="font-['Bebas_Neue'] text-4xl text-foreground">{s.value}</p>
                <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <div className="relative z-10">

        {/* ══ SEÇÃO 1: O PROBLEMA — O QUE O PIX EXPÕE ══ */}
        <GS id="problema" className="max-w-7xl mx-auto px-6 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="font-mono text-[9px] tracking-[0.3em] uppercase text-destructive/70 mb-4">O que o PIX entrega sobre voce</p>
              <h2 className="font-['Bebas_Neue'] text-4xl md:text-5xl tracking-tight uppercase mb-6 leading-[1.05]">
                Cada PIX Que Voce Recebe<br />
                <span className="text-destructive">Expoe Sua Identidade</span>
              </h2>

              <div className="space-y-4 mb-8">
                {[
                  { dado: 'Nome Completo', desc: 'Seu nome civil completo aparece para quem paga. Qualquer pessoa que faz um PIX para voce sabe exatamente quem voce e.' },
                  { dado: 'CPF Parcial', desc: 'Os primeiros e ultimos digitos do seu CPF ficam visiveis. Com tecnicas de OSINT basicas, e possivel reconstruir o CPF completo a partir de bases publicas.' },
                  { dado: 'Instituicao Bancaria', desc: 'O nome do banco ou fintech onde voce tem conta fica exposto. Isso revela informacoes sobre seu perfil financeiro e cria vetores de engenharia social.' },
                  { dado: 'Tipo de Chave PIX', desc: 'Se sua chave for CPF, email ou telefone, o pagador tem um dado pessoal adicional sobre voce. Mesmo chaves aleatorias revelam o banco.' },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="bg-white/[0.02] border border-destructive/20 rounded-sm p-5 hover:border-destructive/40 transition-colors"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-sm bg-destructive/10 flex items-center justify-center shrink-0">
                        <Eye className="w-4 h-4 text-destructive" />
                      </div>
                      <div>
                        <p className="text-foreground font-bold text-sm mb-1 font-['Inter_Tight']">{item.dado}</p>
                        <p className="text-muted-foreground text-sm leading-relaxed font-['Inter_Tight']">{item.desc}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="bg-destructive/5 border border-destructive/20 rounded-sm p-6">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
                  <div>
                    <p className="text-foreground font-bold text-sm mb-1">Risco Real Documentado</p>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      Golpistas usam dados expostos pelo PIX para montar ataques de engenharia social.
                      Com nome + banco + CPF parcial, e possivel ligar para a vitima se passando pelo banco,
                      solicitar "confirmacao de dados" e obter acesso a conta. Isso acontece todos os dias no Brasil.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative rounded-sm overflow-hidden">
              <img src={imgPost} alt="Post original sobre metodo de PIX anonimo por Lord Junnior" className="w-full h-full object-cover aspect-[4/5] object-top" loading="lazy" width={1080} height={1350} />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050808] via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <p className="font-mono text-[9px] tracking-[0.3em] uppercase text-chart-green/80 mb-2">Publicacao original</p>
                <p className="text-foreground/90 text-sm font-['Inter_Tight'] font-semibold italic leading-relaxed">
                  "O que o pagador ve: dados do gateway. O que ele NAO ve: voce."
                </p>
              </div>
            </div>
          </div>
        </GS>

        {/* ── Cinematic Break ── */}
        <div className="relative h-48 overflow-hidden">
          <img src={imgCodigo} alt="Codigo PHP gerando payload PIX via API" className="w-full h-full object-cover" loading="lazy" width={1344} height={768} />
          <div className="absolute inset-0 bg-gradient-to-b from-[#050808] via-[#050808]/40 to-[#050808]" />
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="font-['Bebas_Neue'] text-2xl md:text-4xl tracking-tight uppercase text-foreground/80 text-center px-6">
              40 horas de trabalho. Zero para voce. <span className="text-chart-green">Eu ja fiz.</span>
            </p>
          </div>
        </div>

        {/* ══ SEÇÃO 2: JA ESTA PRONTO ══ */}
        <GS id="pronto" className="max-w-7xl mx-auto px-6 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="font-mono text-[9px] tracking-[0.3em] uppercase text-chart-green/70 mb-4">Infraestrutura entregue</p>
              <h2 className="font-['Bebas_Neue'] text-4xl md:text-6xl tracking-tight uppercase mb-4 leading-[0.95]">
                Voce Nao Precisa Construir <span className="text-chart-green">Nada</span>
              </h2>
              <p className="text-muted-foreground text-base leading-relaxed font-['Inter_Tight'] mb-6">
                A maioria dos guias na internet te ensina a montar o sistema do zero.
                Te mandam aprender PHP, configurar VPS, instalar Apache, obter certificado SSL,
                integrar API e debugar erros por horas. Voce gasta dias para ter algo funcionando.
              </p>
              <p className="text-foreground text-base leading-relaxed font-['Inter_Tight'] font-semibold mb-8">
                Eu ja passei por todo esse processo. Escrevi o script, testei as APIs,
                configurei a hospedagem, ativei o SSL e coloquei tudo no ar.
                O sistema ja esta funcional em producao. Voce so precisa acessar e usar.
              </p>

              {/* Comparacao de tempo */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {TEMPO.map((t, i) => (
                  <div key={i} className={`p-6 rounded-sm border ${i === 0 ? 'bg-destructive/5 border-destructive/20' : 'bg-chart-green/5 border-chart-green/20'}`}>
                    <div className="flex items-center gap-2 mb-3">
                      <Clock className={`w-4 h-4 ${i === 0 ? 'text-destructive' : 'text-chart-green'}`} />
                      <span className={`text-[9px] font-mono uppercase tracking-[0.3em] font-bold ${i === 0 ? 'text-destructive' : 'text-chart-green'}`}>{t.caminho}</span>
                    </div>
                    <p className={`font-['Bebas_Neue'] text-3xl mb-4 ${i === 0 ? 'text-destructive' : 'text-chart-green'}`}>{t.tempo}</p>
                    <ul className="space-y-1.5">
                      {t.itens.map((item, j) => (
                        <li key={j} className="flex items-center gap-2 text-xs text-muted-foreground font-['Inter_Tight']">
                          {i === 0 ? <XCircle className="w-3 h-3 text-destructive/50 shrink-0" /> : <CheckCircle2 className="w-3 h-3 text-chart-green/50 shrink-0" />}
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <a
                href={LIVE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 bg-chart-green text-[#050808] rounded-sm font-bold text-sm uppercase tracking-wider hover:bg-chart-green/90 transition-all group"
              >
                <Rocket className="w-5 h-5" />
                Acessar Agora — Zero Configuracao
                <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            <div className="relative rounded-sm overflow-hidden">
              <img src={imgPronto} alt="Sistema de PIX anonimo ja construido e funcional em producao" className="w-full h-full object-cover aspect-[16/10]" loading="lazy" width={1920} height={1080} />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050808]/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <p className="font-mono text-[9px] tracking-[0.3em] uppercase text-chart-green/80 mb-2">Sistema em producao</p>
                <p className="text-foreground/90 text-sm font-['Inter_Tight'] font-semibold leading-relaxed">
                  Script PHP, API integrada, SSL ativo, QR Code dinamico. Tudo funcionando.
                </p>
              </div>
            </div>
          </div>
        </GS>

        {/* ══ SEÇÃO 3: O QUE FOI CONSTRUIDO ══ */}
        <GS id="construido" className="py-20">
          <div className="max-w-7xl mx-auto px-6">
            <p className="font-mono text-[9px] tracking-[0.3em] uppercase text-primary/70 mb-4">Detalhamento tecnico</p>
            <h2 className="font-['Bebas_Neue'] text-4xl md:text-6xl tracking-tight uppercase mb-4 leading-[0.95]">
              O Que Eu <span className="text-primary">Construi</span> Para Voce
            </h2>
            <p className="text-muted-foreground text-base leading-relaxed max-w-3xl font-['Inter_Tight'] mb-12">
              Cada componente abaixo exigiria horas de trabalho se voce fosse montar sozinho.
              Servidor, script, autenticacao, criptografia — tudo ja esta implementado e testado.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {CONSTRUIDO.map((item, i) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: i * 0.08 }}
                    className="bg-white/[0.02] border border-border/20 rounded-sm p-6 hover:border-chart-green/30 transition-colors group"
                  >
                    <div className="w-12 h-12 rounded-sm bg-chart-green/10 flex items-center justify-center mb-4 group-hover:bg-chart-green/15 transition-colors">
                      <Icon className="w-5 h-5 text-chart-green" />
                    </div>
                    <h3 className="font-['Inter_Tight'] font-bold text-base text-foreground mb-2">{item.titulo}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed font-['Inter_Tight']">{item.desc}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </GS>

        {/* ══ COMO FUNCIONA — FLUXO VISUAL ══ */}
        <GS id="arquitetura" className="max-w-7xl mx-auto px-6 py-20">
          <p className="font-mono text-[9px] tracking-[0.3em] uppercase text-chart-green/70 mb-4">Arquitetura por tras do sistema</p>
          <h2 className="font-['Bebas_Neue'] text-4xl md:text-6xl tracking-tight uppercase mb-4 leading-[0.95]">
            Como o Sistema <span className="text-chart-green">Funciona</span>
          </h2>
          <p className="text-muted-foreground text-base leading-relaxed max-w-3xl font-['Inter_Tight'] mb-12">
            Voce nao precisa entender cada detalhe. Mas para quem quer saber o que esta rodando por baixo,
            aqui esta a arquitetura completa — a mesma que seria necessaria se voce fosse construir do zero.
          </p>

          {/* Fluxo Visual */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-16">
            {[
              { icon: MousePointerClick, label: 'Voce Acessa', desc: 'Entra no sistema pronto e informa o valor que deseja receber' },
              { icon: Code, label: 'Backend PHP', desc: 'O script faz POST automatico para a API do gateway com autenticacao segura' },
              { icon: QrCode, label: 'QR Code Gerado', desc: 'A API retorna o payload PIX e o QR Code dinamico em tempo real' },
              { icon: Shield, label: 'Identidade Oculta', desc: 'Pagador ve dados do GATEWAY. Seus dados pessoais nunca aparecem.' },
            ].map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.12 }}
                  className="relative bg-white/[0.02] border border-border/30 rounded-sm p-6 text-center group hover:border-chart-green/30 transition-colors"
                >
                  <div className="w-12 h-12 rounded-sm bg-chart-green/10 flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-5 h-5 text-chart-green" />
                  </div>
                  <p className="font-['Bebas_Neue'] text-xl mb-2">{step.label}</p>
                  <p className="text-muted-foreground text-xs leading-relaxed font-['Inter_Tight']">{step.desc}</p>
                  {i < 3 && (
                    <ArrowRight className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-chart-green/30 z-20" />
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* Pseudo-codigo — EDUCACIONAL */}
          <div className="bg-[#0a0f0f] border border-chart-green/15 rounded-sm overflow-hidden">
            <div className="flex items-center justify-between px-5 py-3 bg-chart-green/5 border-b border-chart-green/10">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-chart-green" />
                <span className="text-chart-green font-mono text-[11px] font-bold tracking-wider">gerar-pix.php — O que roda no backend (voce NAO precisa escrever isso)</span>
              </div>
              <span className="text-[8px] font-mono uppercase tracking-[0.3em] text-chart-green/50">Ja implementado</span>
            </div>
            <pre className="p-6 text-sm font-mono text-muted-foreground overflow-x-auto leading-7">
{`// 1. Receber valor do formulario
$valor = $_POST['valor'];

// 2. Montar payload da cobranca
$payload = [
    'transaction_amount' => (float) $valor,
    'description' => 'Pagamento via QR Code',
    'payment_method_id' => 'pix',
    'payer' => [
        'email' => 'comprador@email.com'
    ]
];

// 3. Enviar para API do gateway via cURL
$ch = curl_init('https://api.gateway.com/v1/payments');
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Authorization: Bearer SUA_API_KEY_AQUI',
    'Content-Type: application/json'
]);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($payload));
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$response = json_decode(curl_exec($ch));
curl_close($ch);

// 4. Extrair QR Code da resposta
$qr_code = $response->point_of_interaction
    ->transaction_data->qr_code;
$qr_code_base64 = $response->point_of_interaction
    ->transaction_data->qr_code_base64;

// 5. Renderizar para o usuario
echo '<img src="data:image/png;base64,' . $qr_code_base64 . '">';
echo '<p>Copia e Cola: ' . $qr_code . '</p>';`}
            </pre>
            <div className="px-5 py-3 bg-chart-green/5 border-t border-chart-green/10">
              <p className="text-chart-green/60 font-mono text-[10px] tracking-wider">
                Este codigo ja esta rodando no sistema. Voce nao precisa copiar, instalar ou configurar nada.
              </p>
            </div>
          </div>
        </GS>

        {/* ── Cinematic Break 2 ── */}
        <div className="relative h-64 overflow-hidden">
          <img src={imgServidor} alt="Infraestrutura de servidor processando pagamentos PIX anonimos" className="w-full h-full object-cover" loading="lazy" width={1344} height={768} />
          <div className="absolute inset-0 bg-gradient-to-b from-[#050808] via-[#050808]/40 to-[#050808]" />
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="font-['Bebas_Neue'] text-2xl md:text-4xl tracking-tight uppercase text-foreground/80 text-center px-6">
              Nem todo mundo tem tempo. Nem todo mundo sabe programar. <span className="text-chart-green">Por isso eu ja fiz.</span>
            </p>
          </div>
        </div>

        {/* ══ SEÇÃO 4: ERROS FATAIS (que voce evita) ══ */}
        <GS id="erros" className="py-20">
          <div className="max-w-7xl mx-auto px-6">
            <p className="font-mono text-[9px] tracking-[0.3em] uppercase text-destructive/70 mb-4">Armadilhas que voce nunca vai enfrentar</p>
            <h2 className="font-['Bebas_Neue'] text-4xl md:text-6xl tracking-tight uppercase mb-4 leading-[0.95]">
              Erros Que <span className="text-destructive">Destroem</span> Quem Tenta Sozinho
            </h2>
            <p className="text-muted-foreground text-base leading-relaxed max-w-3xl font-['Inter_Tight'] mb-12">
              Estes sao os 4 erros mais comuns que fazem pessoas desistirem de montar o sistema.
              Cada um ja foi resolvido na infraestrutura pronta — voce nao precisa lidar com nenhum deles.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {ERROS_FATAIS.map((erro, i) => {
                const Icon = erro.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: i * 0.1 }}
                    className="bg-white/[0.02] border border-destructive/15 rounded-sm overflow-hidden hover:border-destructive/30 transition-colors"
                  >
                    <div className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-sm bg-destructive/10 flex items-center justify-center">
                          <Icon className="w-4 h-4 text-destructive" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <XCircle className="w-3 h-3 text-destructive" />
                            <span className="text-destructive text-[8px] font-black uppercase tracking-[0.3em] font-mono">Erro Fatal</span>
                          </div>
                          <h4 className="text-foreground font-bold text-sm font-['Inter_Tight']">{erro.titulo}</h4>
                        </div>
                      </div>
                      <p className="text-muted-foreground text-sm leading-relaxed font-['Inter_Tight'] mb-4">{erro.desc}</p>
                      <div className="bg-chart-green/5 border border-chart-green/15 rounded-sm p-4">
                        <div className="flex items-center gap-2 mb-1">
                          <CheckCircle2 className="w-3 h-3 text-chart-green" />
                          <span className="text-chart-green text-[8px] font-black uppercase tracking-[0.3em] font-mono">Ja Resolvido</span>
                        </div>
                        <p className="text-muted-foreground text-xs leading-relaxed font-['Inter_Tight']">{erro.solucao}</p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </GS>

        {/* ══ SEÇÃO 5: COMPARATIVO ══ */}
        <GS id="comparativo" className="max-w-7xl mx-auto px-6 py-20">
          <p className="font-mono text-[9px] tracking-[0.3em] uppercase text-primary/70 mb-4">Analise comparativa</p>
          <h2 className="font-['Bebas_Neue'] text-4xl md:text-5xl tracking-tight uppercase mb-8 leading-[1.05]">
            PIX Comum vs. <span className="text-chart-green">Sistema Pronto</span>
          </h2>

          <div className="bg-white/[0.02] border border-border/30 rounded-sm overflow-hidden">
            <div className="grid grid-cols-3 bg-white/[0.03] border-b border-border/20">
              <div className="p-4 text-[10px] font-mono uppercase tracking-[0.3em] text-muted-foreground">Caracteristica</div>
              <div className="p-4 text-[10px] font-mono uppercase tracking-[0.3em] text-destructive text-center">PIX Comum</div>
              <div className="p-4 text-[10px] font-mono uppercase tracking-[0.3em] text-chart-green text-center">Sistema Pronto</div>
            </div>
            {COMPARATIVO.map((row, i) => (
              <div key={i} className="grid grid-cols-3 border-b border-border/10 hover:bg-white/[0.01] transition-colors">
                <div className="p-4 text-sm text-foreground font-['Inter_Tight']">{row.feature}</div>
                <div className="p-4 flex justify-center">
                  {row.pix ? (
                    <XCircle className="w-5 h-5 text-destructive" />
                  ) : (
                    <CheckCircle2 className="w-5 h-5 text-chart-green" />
                  )}
                </div>
                <div className="p-4 flex justify-center">
                  {row.metodo ? (
                    <CheckCircle2 className="w-5 h-5 text-chart-green" />
                  ) : (
                    <XCircle className="w-5 h-5 text-destructive" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </GS>

        {/* ══ ALERTA PIX NÃO É PRIVADO ══ */}
        <GS className="max-w-5xl mx-auto px-6 py-10">
          <div className="bg-destructive/5 border-2 border-destructive/30 rounded-sm p-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-sm bg-destructive/15 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-6 h-6 text-destructive" />
              </div>
              <div>
                <h3 className="font-['Bebas_Neue'] text-2xl text-destructive mb-3">TRANSPARENCIA OBRIGATORIA</h3>
                <p className="text-foreground text-sm leading-7 font-['Inter_Tight'] mb-4">
                  Este metodo protege sua identidade perante <span className="font-bold">o pagador</span> (terceiros).
                  O gateway de pagamento ainda reporta movimentacoes ao COAF conforme legislacao vigente.
                  PIX, em qualquer formato, passa pelo sistema bancario brasileiro e esta sujeito a regulacao do Banco Central.
                </p>
                <p className="text-muted-foreground text-sm leading-7 font-['Inter_Tight']">
                  Para privacidade financeira TOTAL, o caminho e a autocustodia de Bitcoin via rede Lightning,
                  com aquisicao P2P sem KYC. Este sistema resolve o problema imediato de exposicao de dados em transacoes PIX,
                  mas nao substitui uma infraestrutura soberana completa.
                </p>
                <Link
                  to="/autocustodia"
                  className="inline-flex items-center gap-2 mt-4 text-primary text-xs font-bold uppercase tracking-wider font-mono hover:gap-3 transition-all"
                >
                  Conhecer autocustodia real <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </GS>

        <MicroCtaResistencia variant="default" />

        {/* ══ SEÇÃO 6: FAQ ══ */}
        <GS id="faq" className="max-w-5xl mx-auto px-6 py-20">
          <p className="font-mono text-[9px] tracking-[0.3em] uppercase text-primary/70 mb-4">Perguntas frequentes</p>
          <h2 className="font-['Bebas_Neue'] text-4xl md:text-5xl tracking-tight uppercase mb-8 leading-[1.05]">
            Tudo Que Voce Precisa <span className="text-chart-green">Saber</span>
          </h2>

          <Accordion type="multiple" className="space-y-2">
            {FAQ.map((item, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="border border-border/20 rounded-sm bg-white/[0.01] px-6">
                <AccordionTrigger className="text-left text-sm font-['Inter_Tight'] font-semibold text-foreground hover:text-chart-green transition-colors py-5">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-sm leading-7 font-['Inter_Tight'] pb-5">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </GS>

        {/* ══ CTA FINAL ══ */}
        <GS className="max-w-5xl mx-auto px-6 py-20">
          <div className="relative bg-white/[0.02] border border-chart-green/20 rounded-sm p-10 md:p-14 text-center overflow-hidden">
            <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-chart-green/5 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full bg-primary/5 blur-3xl pointer-events-none" />

            <div className="relative">
              <Shield className="w-12 h-12 text-chart-green mx-auto mb-6" />
              <h2 className="font-['Bebas_Neue'] text-3xl md:text-5xl tracking-tight uppercase mb-4">
                O Sistema Ja Existe.<br /><span className="text-chart-green">Voce So Precisa Acessar.</span>
              </h2>
              <p className="text-muted-foreground text-base leading-relaxed max-w-2xl mx-auto font-['Inter_Tight'] mb-4">
                Enquanto outros gastam semanas tentando montar do zero, voce acessa em 2 minutos
                um sistema que ja resolve o problema. Sem programacao. Sem servidor. Sem dor de cabeca.
              </p>
              <p className="text-foreground/60 text-sm font-['Inter_Tight'] mb-8">
                Lord Junnior construiu. Voce usa. Simples assim.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href={LIVE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-10 py-5 bg-chart-green text-[#050808] rounded-sm font-bold text-sm uppercase tracking-wider hover:bg-chart-green/90 transition-all group"
                >
                  <Rocket className="w-5 h-5" />
                  Acessar o Sistema Agora
                  <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
                <Link
                  to="/autocustodia"
                  className="inline-flex items-center gap-2 px-8 py-5 bg-primary/10 border border-primary/30 rounded-sm text-primary text-xs font-bold uppercase tracking-wider hover:bg-primary/20 transition-all"
                >
                  <KeyRound className="w-4 h-4" />
                  Protocolo de Autocustodia
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </GS>

        <FooterSection />
      </div>
    </div>
  );
}
