import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Smartphone, Bell, Eye, Lock, Clock, Wifi, Shield, BellOff, Timer, Monitor } from 'lucide-react';
import CinematicHero from '@/components/CinematicHero';
import BackToHome from '@/components/BackToHome';

import bgDependencia from '@/assets/toxicos/bg-dependencia.webp';
import imgDopamina from '@/assets/toxicos/dep-dopamina.webp';
import imgAtencao from '@/assets/toxicos/dep-atencao.webp';
import imgDados from '@/assets/toxicos/dep-dados.webp';
import imgObsolescencia from '@/assets/toxicos/dep-obsolescencia.webp';
import imgEcosistema from '@/assets/toxicos/dep-ecosistema.webp';

const APPLE_EASE = [0.22, 1, 0.36, 1] as const;
const fadeUp = {
  hidden: { opacity: 0, y: 30, filter: 'blur(6px)' },
  visible: (i) => ({
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: 0.7, ease: APPLE_EASE, delay: i * 0.1 },
  }),
};

const MECANISMOS = [
  {
    icon: Bell,
    titulo: 'Ciclos de Dopamina por Design',
    desc: 'Cada notificação, cada "like", cada scroll infinito foi projetado por equipes de psicólogos comportamentais para criar loops de recompensa variável. É o mesmo mecanismo usado em caça-níqueis. Nir Eyal documentou isso no livro Hooked: Trigger, Action, Variable Reward, Investment. O objetivo declarado é criar hábito, não oferecer valor real ao usuário.',
    dado: 'O usuário médio verifica o celular 150 vezes por dia, a maioria sem motivo consciente.',
    img: imgDopamina,
  },
  {
    icon: Eye,
    titulo: 'Economia da Atenção',
    desc: 'Sua atenção é o produto sendo vendido. Cada segundo que você passa em uma plataforma é monetizado através de publicidade direcionada. O modelo de negócio não é oferecer informação útil. É maximizar tempo na tela. Conteúdo que gera indignação ou ansiedade mantém usuários engajados por mais tempo que conteúdo neutro ou positivo.',
    dado: 'O mercado global de publicidade digital ultrapassou US$ 700 bilhões em 2024.',
    img: imgAtencao,
  },
  {
    icon: Lock,
    titulo: 'Coleta Massiva de Dados',
    desc: 'Cada toque, pausa, scroll e hesitação é registrado. Plataformas constroem "sombras digitais" com mais de 5.000 pontos de dados por usuário, incluindo localização, contatos, hábitos de compra, ciclo de sono e até padrões de digitação. Essas informações alimentam algoritmos de predição comportamental vendidos para anunciantes e governos.',
    dado: 'O Facebook (Meta) coleta dados mesmo de pessoas que nunca criaram uma conta na plataforma, via pixels e SDKs em sites parceiros.',
    img: imgDados,
  },
  {
    icon: Clock,
    titulo: 'Obsolescência Programada',
    desc: 'Dispositivos são deliberadamente projetados para se tornarem obsoletos em 2 a 3 anos através de atualizações de software que degradam performance, baterias não substituíveis e ecossistemas fechados que forçam upgrades. O objetivo é garantir ciclos de consumo perpétuos e impedir que o usuário escape do ecossistema do fabricante.',
    dado: 'A Apple pagou US$ 113 milhões em acordo judicial por degradar intencionalmente iPhones antigos via atualizações de iOS sem informar usuários.',
    img: imgObsolescencia,
  },
  {
    icon: Wifi,
    titulo: 'Aprisionamento de Ecossistema',
    desc: 'Serviços digitais criam dependência cruzada. Seu e-mail, fotos, documentos, contatos e pagamentos ficam presos em um único ecossistema. O custo de saída (switching cost) torna-se tão alto que o usuário permanece mesmo insatisfeito. Esta é uma forma de dependência arquitetada, não escolhida conscientemente pelo consumidor final.',
    dado: 'O Google processa mais de 8,5 bilhões de buscas por dia e é a porta de entrada para a maioria da informação consumida globalmente.',
    img: imgEcosistema,
  },
];

const PROTOCOLO = [
  {
    icon: BellOff,
    titulo: 'Auditoria de Notificações',
    desc: 'Desative todas as notificações que não são de pessoas reais. Apps, promoções e sugestões algorítmicas devem ser silenciadas. Cada notificação é uma interrupção projetada para sequestrar atenção. Mantenha apenas chamadas, mensagens diretas de contatos próximos e alertas críticos de segurança.',
  },
  {
    icon: Timer,
    titulo: 'Blocos de Tempo Offline',
    desc: 'Reserve 2 horas diárias completamente offline. Sem celular, sem e-mail, sem redes. Use esse tempo para leitura, trabalho profundo ou convívio presencial. Comece com 30 minutos e aumente progressivamente até atingir 2 horas contínuas. A primeira semana é desconfortável, depois vira liberdade.',
  },
  {
    icon: Monitor,
    titulo: 'Ferramentas Conscientes',
    desc: 'Substitua serviços que monetizam dados por alternativas que respeitam privacidade. Signal para mensagens, Brave para navegador, ProtonMail para e-mail, DuckDuckGo para busca. Cada substituição reduz um vetor de vigilância e aumenta sua margem de manobra digital.',
  },
  {
    icon: Lock,
    titulo: 'Descentralize seus dados',
    desc: 'Não mantenha tudo em um único ecossistema. Distribua fotos, documentos, contatos e backups entre serviços diferentes. Se um for comprometido ou desativado, você não perde tudo. Tenha sempre uma cópia local em hardware próprio (HD externo ou NAS) que não depende de internet.',
  },
];

const FAQ_ITEMS = [
  {
    q: 'Redes sociais são realmente viciantes?',
    a: 'Sim. Ex-funcionários do Facebook, Google e Apple confirmaram publicamente que recursos como scroll infinito, pull-to-refresh e notificações push foram deliberadamente projetados para criar hábitos compulsivos. Tristan Harris, ex-Google, fundou o Center for Humane Technology especificamente para alertar sobre design persuasivo em plataformas digitais e seu impacto em saúde mental coletiva.',
  },
  {
    q: 'Preciso abandonar toda tecnologia para ter autonomia?',
    a: 'Não. O objetivo é autonomia tecnológica, não rejeição total. Use tecnologia como ferramenta, não como ambiente. A diferença está em quem controla quem. Se você decide quando e como usar, é ferramenta. Se o app decide por você através de notificações e algoritmos, é dependência. A linha é cruzada quando você sente ansiedade ao ficar sem o dispositivo.',
  },
  {
    q: 'VPN e navegação privada protegem minha privacidade?',
    a: 'Parcialmente. VPNs protegem contra monitoramento de rede mas não contra rastreamento de plataformas. Navegação privada não salva histórico local mas o provedor ainda vê tudo. Privacidade real exige uma abordagem em camadas: navegador (Brave ou Tor), buscador (DuckDuckGo), DNS (Cloudflare 1.1.1.1), VPN e compartimentalização de identidades digitais por contexto de uso.',
  },
  {
    q: 'Como reduzir tempo de tela sem perder produtividade?',
    a: 'Defina horários fixos para checar e-mail e mensagens (3 vezes ao dia, por exemplo). Use modo concentração no celular durante trabalho profundo. Mantenha o celular fora do quarto durante o sono. Substitua scroll passivo em redes por leitura ativa de livros ou artigos longos. A produtividade aumenta quando a atenção volta a ser sua.',
  },
  {
    q: 'Vale a pena migrar para Linux ou hardware aberto?',
    a: 'Para usuários técnicos, sim. Linux oferece controle muito maior sobre o sistema, sem telemetria forçada e com transparência de código. Hardware aberto como o Framework Laptop ou dispositivos PinePhone reduz dependência de Apple e Google. Para usuários não técnicos, comece com substituições graduais de aplicativos antes de mudar o sistema operacional inteiro.',
  },
];

export default function DependenciaTecnologica() {
  const { scrollYProgress } = useScroll();
  const progressWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": FAQ_ITEMS.map(item => ({
      "@type": "Question",
      "name": item.q,
      "acceptedAnswer": { "@type": "Answer", "text": item.a },
    })),
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Dependência Tecnológica: Design Comportamental e Autonomia Digital",
    "description": "Investigação sobre design persuasivo, ciclos de dopamina, coleta massiva de dados, obsolescência programada e aprisionamento de ecossistema.",
    "author": { "@type": "Person", "name": "Lord Junnior", "url": "https://lordjunnior.com.br" },
    "datePublished": "2026-04-20",
    "image": "https://lordjunnior.com.br/heroes/dependencia-tecnologica.webp",
    "publisher": { "@type": "Organization", "name": "Lord Junnior", "url": "https://lordjunnior.com.br" },
    "mainEntityOfPage": "https://lordjunnior.com.br/soberania-organica/toxicos-ocultos/dependencia-tecnologica",
  };

  return (
    <div className="min-h-screen text-stone-100 font-sans selection:bg-cyan-400/30 relative text-[17px] md:text-[18px] lg:text-[19px] leading-relaxed [&_p]:leading-[1.75]" style={{ background: '#040810' }}>
      <div
        aria-hidden
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(4,8,16,0.88), rgba(4,8,16,0.95)), url(${bgDependencia})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      />

      <div className="relative z-20 px-6 md:px-12 lg:px-20 pt-[52px]">
        <BackToHome />
      </div>

      <Helmet>
        <title>Dependência Tecnológica: Design Comportamental e Autonomia Digital | Lord Junnior</title>
        <meta name="description" content="Design comportamental, ciclos de dopamina digital, coleta massiva de dados, obsolescência programada e aprisionamento de ecossistema. Recupere controle sobre seu tempo." />
        <meta name="keywords" content="dependência tecnológica, design persuasivo, dopamina digital, vigilância de dados, obsolescência programada, soberania digital, Tristan Harris, autonomia tecnológica" />
        <meta property="og:title" content="Dependência Tecnológica: Recupere o Controle do Seu Tempo" />
        <meta property="og:description" content="Cinco mecanismos de captura projetados para transformar tempo e atenção em receita corporativa." />
        <meta property="og:image" content="https://lordjunnior.com.br/heroes/dependencia-tecnologica.webp" />
        <meta property="og:type" content="article" />
        <link rel="canonical" href="https://lordjunnior.com.br/soberania-organica/toxicos-ocultos/dependencia-tecnologica" />
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
      </Helmet>

      <motion.div className="fixed top-0 left-0 right-0 h-[2px] z-50 origin-left"
        style={{ width: progressWidth, background: 'linear-gradient(90deg, #06b6d4, #0ea5e9)' }} />

      <CinematicHero
        image="/heroes/dependencia-tecnologica.webp"
        phase="Vetor 03 · Comportamento"
        title="Dependência Tecnológica"
        subtitle="Ferramentas digitais construídas para capturar atenção e moldar decisões. Ciclos de dopamina, coleta de dados e obsolescência programada. Reconquiste o controle do seu tempo e da sua mente."
        icon={Smartphone}
        accentColor="cyan"
        backLink="/soberania-organica/toxicos-ocultos"
        backLabel="Tóxicos Ocultos"
      />

      {/* Capítulo 01: Diagnóstico */}
      <section className="relative z-10 py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="mb-16 max-w-4xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-[2px] bg-cyan-500 rounded-full" />
              <span className="text-cyan-400 text-[10px] font-bold tracking-[0.5em] uppercase">Capítulo 01 · O Diagnóstico</span>
            </div>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tight text-white mb-6 leading-[1.05]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              VOCÊ NÃO USA O <span className="text-cyan-400">CELULAR</span>
            </h2>
            <p className="text-stone-300 text-base md:text-lg leading-relaxed max-w-3xl mb-4">
              O brasileiro médio passa mais de 9 horas por dia diante de telas. Verifica o celular 150 vezes ao dia, a maioria sem motivo consciente. Não é falta de força de vontade. É design comportamental industrial aplicado em escala global por equipes de psicólogos.
            </p>
            <p className="text-stone-400 text-base md:text-lg leading-relaxed max-w-3xl">
              Cada notificação, cada feed infinito, cada autoplay foi projetado para sequestrar sua atenção e converter tempo de vida em receita publicitária. O objetivo não é informar. É manter você na tela mais um minuto, mais uma hora, mais um dia.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {[
              { value: '9h+', label: 'Tempo médio diário do brasileiro diante de telas em 2024', alt: 180 },
              { value: '150', label: 'Vezes que o usuário médio verifica o celular por dia', alt: 200 },
              { value: '5.000+', label: 'Pontos de dados coletados por usuário por plataforma', alt: 190 },
              { value: 'US$ 700bi', label: 'Mercado global de publicidade digital em 2024', alt: 210 },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}
                whileHover={{ y: -6 }}
                className="group relative overflow-hidden rounded-2xl border border-cyan-500/10 bg-gradient-to-br from-cyan-500/[0.04] to-transparent p-6 md:p-8 hover:border-cyan-500/30 hover:shadow-[0_20px_60px_-15px_rgba(6,182,212,0.3)] transition-all duration-500 cursor-default"
                style={{ minHeight: `${stat.alt}px` }}
              >
                <div className="absolute top-0 left-0 right-0 h-[2px] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-700 bg-gradient-to-r from-cyan-500 to-transparent" />
                <p className="text-4xl md:text-5xl font-black text-cyan-400 mb-3 tabular-nums" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{stat.value}</p>
                <p className="text-stone-400 text-xs md:text-sm leading-relaxed group-hover:text-stone-200 transition-colors">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Capítulo 02: Mecanismos com imagens cinematográficas */}
      <section className="relative z-10 py-20 md:py-32 border-t border-white/[0.04]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="mb-16 max-w-4xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-[2px] bg-cyan-500 rounded-full" />
              <span className="text-cyan-400 text-[10px] font-bold tracking-[0.5em] uppercase">Capítulo 02 · Os Mecanismos</span>
            </div>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tight text-white mb-6 leading-[1.05]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              MECANISMOS DE <span className="text-cyan-400">CAPTURA</span>
            </h2>
            <p className="text-stone-400 text-base leading-relaxed">
              Cinco sistemas projetados para transformar tempo e atenção humana em receita corporativa. Nenhum deles é acidental. Todos foram deliberadamente engenheirados por equipes multidisciplinares com orçamentos bilionários.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {MECANISMOS.map((mec, i) => (
              <motion.article
                key={mec.titulo}
                initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }} variants={fadeUp} custom={i % 2}
                whileHover={{ y: -4 }}
                className={`group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] hover:border-cyan-500/30 transition-all duration-500 ${i === 4 ? 'lg:col-span-2' : ''}`}
                style={{ minHeight: i % 3 === 0 ? '660px' : i % 3 === 1 ? '700px' : '640px' }}
              >
                <div className="relative h-56 md:h-64 overflow-hidden">
                  <img
                    src={mec.img}
                    alt={mec.titulo}
                    loading="lazy"
                    width={1280}
                    height={800}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1500ms] ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#040810] via-[#040810]/40 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <div className="w-12 h-12 rounded-xl bg-cyan-500/20 backdrop-blur-md border border-cyan-500/30 flex items-center justify-center">
                      <mec.icon size={20} className="text-cyan-300" />
                    </div>
                  </div>
                </div>

                <div className="p-6 md:p-8">
                  <h4 className="text-xl md:text-2xl font-black text-white mb-4 leading-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    {mec.titulo}
                  </h4>
                  <p className="text-stone-400 text-sm md:text-base leading-relaxed mb-5">{mec.desc}</p>
                  <div className="border-l-2 border-cyan-500/40 pl-4 bg-cyan-500/[0.03] py-3 rounded-r">
                    <p className="text-[10px] text-cyan-400/70 font-bold uppercase tracking-wider mb-1">Dado de impacto</p>
                    <p className="text-cyan-200/80 text-sm italic leading-relaxed">{mec.dado}</p>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Capítulo 03: Protocolo */}
      <section className="relative z-10 py-20 md:py-32 border-t border-white/[0.04]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="mb-16 max-w-4xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-[2px] bg-cyan-500 rounded-full" />
              <span className="text-cyan-400 text-[10px] font-bold tracking-[0.5em] uppercase">Capítulo 03 · A Defesa</span>
            </div>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tight text-white mb-6 leading-[1.05]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              PROTOCOLO DE <span className="text-cyan-400">AUTONOMIA DIGITAL</span>
            </h2>
            <p className="text-stone-400 text-base leading-relaxed">
              Quatro práticas que retomam controle sobre seu tempo e seus dados. Não exigem isolamento, exigem método e consistência diária.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PROTOCOLO.map((item, i) => (
              <motion.div
                key={item.titulo}
                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i * 0.1}
                whileHover={{ y: -4 }}
                className="group p-8 md:p-10 rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] hover:border-cyan-500/30 transition-all duration-500"
                style={{ minHeight: i % 2 === 0 ? '280px' : '300px' }}
              >
                <div className="flex items-center gap-4 mb-5">
                  <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20 group-hover:bg-cyan-500/20 transition-colors">
                    <item.icon size={20} className="text-cyan-400" />
                  </div>
                  <span className="text-3xl font-black text-cyan-400/30 tabular-nums" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>0{i + 1}</span>
                  <div className="h-[1px] flex-1 bg-gradient-to-r from-cyan-500/30 to-transparent" />
                </div>
                <h4 className="text-lg md:text-xl font-bold text-stone-100 mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{item.titulo}</h4>
                <p className="text-stone-400 text-sm md:text-base leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="relative z-10 py-20 md:py-32 border-t border-white/[0.04]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="mb-12 max-w-4xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-[2px] bg-cyan-500 rounded-full" />
              <span className="text-cyan-400 text-[10px] font-bold tracking-[0.5em] uppercase">Capítulo 04 · O Debate</span>
            </div>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.05]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              PERGUNTAS <span className="text-cyan-400">FREQUENTES</span>
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {FAQ_ITEMS.map((item, i) => (
              <motion.div
                key={item.q}
                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i * 0.1}
                whileHover={{ y: -2 }}
                className="p-6 md:p-8 rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:border-cyan-500/20 transition-all duration-500"
              >
                <h4 className="text-base md:text-lg font-bold text-stone-100 mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{item.q}</h4>
                <p className="text-stone-400 text-sm md:text-base leading-relaxed">{item.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 py-20 md:py-24 border-t border-white/[0.04]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
            <p className="text-stone-600 text-xs font-medium uppercase tracking-[0.4em] mb-6">Próximo vetor</p>
            <h3 className="text-2xl md:text-4xl font-black text-white mb-8" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Do comportamento para o <span className="text-green-400">ambiente</span>
            </h3>
            <Link
              to="/soberania-organica/toxicos-ocultos/toxinas-ambientais"
              className="inline-flex items-center gap-3 bg-green-500 text-white px-10 py-5 font-bold text-sm tracking-wide rounded-xl hover:bg-green-400 hover:shadow-2xl hover:shadow-green-500/20 hover:scale-[1.03] transition-all duration-500 group"
            >
              Toxinas Ambientais
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-8 border-t border-white/[0.04] text-right">
        <p className="text-stone-700 font-medium text-base tracking-tight italic">Quem controla suas notificações, controla seus pensamentos.</p>
      </div>
    </div>
  );
}
