import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Brain, Eye, Radio, Filter, MessageSquare, Shield, AlertTriangle, Search, BookOpen, CheckCircle } from 'lucide-react';
import CinematicHero from '@/components/CinematicHero';
import BackToHome from '@/components/BackToHome';

import bgManipulacao from '@/assets/toxicos/bg-manipulacao.webp';
import imgFraming from '@/assets/toxicos/manip-framing.webp';
import imgNovilingua from '@/assets/toxicos/manip-novilingua.webp';
import imgBolha from '@/assets/toxicos/manip-bolha.webp';
import imgBernays from '@/assets/toxicos/manip-bernays.webp';
import imgMedo from '@/assets/toxicos/manip-medo.webp';
import imgAstroturfing from '@/assets/toxicos/manip-astroturfing.webp';

const APPLE_EASE = [0.22, 1, 0.36, 1] as const;
const fadeUp = {
  hidden: { opacity: 0, y: 30, filter: 'blur(6px)' },
  visible: (i) => ({
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: 0.7, ease: APPLE_EASE, delay: i * 0.1 },
  }),
};

const TECNICAS = [
  {
    icon: Radio,
    titulo: 'Enquadramento Narrativo (Framing)',
    desc: 'A mesma informação é percebida de forma completamente diferente dependendo de como é apresentada. "95% de chance de sobreviver" soa melhor que "5% de chance de morrer", embora sejam idênticas. Governos e mídia selecionam cuidadosamente qual enquadramento usar para direcionar opinião pública.',
    exemplo: '"Medida de proteção ao consumidor" versus "Controle estatal sobre transações financeiras". Mesma lei, percepções opostas.',
    img: imgFraming,
  },
  {
    icon: MessageSquare,
    titulo: 'Novilíngua e Manipulação Semântica',
    desc: 'Redefinir palavras é redefinir pensamento. Quando "vigilância" vira "proteção" e "censura" vira "moderação de conteúdo", o público perde a capacidade de nomear o que acontece. George Orwell documentou esse mecanismo em 1984. Hoje ele opera em escala algorítmica em redes sociais e legislações.',
    exemplo: '"Desinformação" é o termo que transfere ao Estado o poder de definir o que é verdade e o que não é.',
    img: imgNovilingua,
  },
  {
    icon: Filter,
    titulo: 'Filtro Algorítmico (Bolha)',
    desc: 'Plataformas digitais criam câmaras de eco personalizadas. Você não vê "a internet". Vê uma versão curada para maximizar seu tempo de tela. O algoritmo reforça suas crenças existentes e esconde informações desconfortáveis, eliminando pensamento crítico por atrito zero.',
    exemplo: 'Dois usuários pesquisando a mesma palavra recebem resultados radicalmente diferentes baseados em histórico de navegação e perfil comportamental.',
    img: imgBolha,
  },
  {
    icon: Eye,
    titulo: 'Engenharia de Consentimento',
    desc: 'Conceito criado por Edward Bernays, sobrinho de Freud. Fabricar opinião pública através de técnicas psicológicas aplicadas em massa. Propaganda moderna não precisa mentir. Basta selecionar quais verdades mostrar e em qual sequência, criando uma narrativa que parece orgânica mas é projetada em laboratório.',
    exemplo: 'Pesquisas de opinião publicadas antes de eleições influenciam a intenção de voto pelo efeito manada de conformidade social.',
    img: imgBernays,
  },
  {
    icon: AlertTriangle,
    titulo: 'Apelo ao Medo e Urgência',
    desc: 'Medo desliga pensamento analítico e ativa reação emocional. Quando uma população está assustada, aceita medidas que rejeitaria em condições normais. Crises reais são amplificadas e crises artificiais são fabricadas para justificar expansão de controle estatal e corporativo.',
    exemplo: '"Se não aprovarmos esta lei agora, milhões estarão em risco". A pressão temporal elimina debate público qualificado.',
    img: imgMedo,
  },
  {
    icon: Search,
    titulo: 'Astroturfing e Falso Consenso',
    desc: 'Criação de movimentos populares artificiais usando perfis falsos, bots e influenciadores pagos. O objetivo é fabricar a impressão de que "todo mundo pensa assim", ativando o instinto de conformidade social. Redes sociais amplificam isso exponencialmente em ciclos de poucas horas.',
    exemplo: 'Hashtags que parecem orgânicas mas são coordenadas por agências de comunicação com centenas de contas automatizadas.',
    img: imgAstroturfing,
  },
];

const HIGIENE_INFO = [
  {
    titulo: 'Diversifique fontes deliberadamente',
    desc: 'Leia fontes que discordam entre si. Se toda sua informação vem do mesmo espectro político ou ideológico, você está dentro de uma bolha, não de uma análise. Inclua pelo menos uma fonte estrangeira e uma fonte primária por dia.',
  },
  {
    titulo: 'Aplique a regra "Cui Bono?"',
    desc: 'Diante de qualquer narrativa, pergunte: quem se beneficia se eu acreditar nisso? Quem perde poder se eu duvidar? Essa pergunta simples desarma a maioria das manipulações antes que cheguem ao seu sistema de crenças.',
  },
  {
    titulo: 'Separe fato de interpretação',
    desc: 'Notícias misturam dados concretos com opiniões editoriais sem sinalizar. Treine-se a identificar onde o fato termina e a interpretação começa. Marque mentalmente cada vez que um adjetivo carregado é usado no lugar de um dado verificável.',
  },
  {
    titulo: 'Reduza a dieta informacional',
    desc: 'Assim como ultraprocessados alimentares, existe informação ultraprocessada. Notificações constantes, feed infinito e breaking news criam ansiedade, não conhecimento. Limite consumo a 30 minutos por dia em horários definidos.',
  },
];

const FAQ_ITEMS = [
  {
    q: 'Propaganda é a mesma coisa que publicidade?',
    a: 'Não. Publicidade vende produtos. Propaganda vende ideias, valores e visões de mundo. A propaganda política utiliza técnicas psicológicas para moldar percepções coletivas sobre realidade, moral e estrutura social. Edward Bernays, considerado o pai das relações públicas, documentou explicitamente como técnicas de propaganda podem ser usadas para "engenheirar o consentimento" de populações inteiras em seu livro Propaganda de 1928.',
  },
  {
    q: 'Algoritmos realmente influenciam opinião política?',
    a: 'Sim, e isso é documentado. O estudo de Epstein e Robertson de 2015 demonstrou que a ordem dos resultados de busca pode alterar a preferência de eleitores indecisos em até 20%. Plataformas como YouTube, TikTok e Instagram utilizam sistemas de recomendação que priorizam engajamento emocional, não precisão factual, criando câmaras de eco que radicalizam posições ao longo do tempo.',
  },
  {
    q: 'Como diferenciar informação honesta de manipulação?',
    a: 'Informação honesta apresenta dados, cita fontes verificáveis e admite limitações. Manipulação apela para emoção, cria urgência artificial, usa linguagem carregada e nunca admite incerteza. A presença de uma "solução" imediata e radical para um "problema" recém-apresentado é um sinal clássico de manipulação. Desconfie sempre de qualquer narrativa que exige decisão rápida.',
  },
  {
    q: 'Vale a pena sair completamente das redes sociais?',
    a: 'Não necessariamente. Sair completamente isola e reduz capacidade de alcance. O ideal é usar redes sociais como ferramenta de difusão e pesquisa, nunca como fonte primária de informação ou validação social. Desative notificações, limite tempo diário, siga contas técnicas e pessoas que discordam de você. Use, mas não seja usado.',
  },
  {
    q: 'Verificadores de fato (fact-checkers) são neutros?',
    a: 'Não existe neutralidade absoluta. Verificadores de fato são organizações com financiamento, viés editorial e critérios próprios. Muitos são financiados por governos, fundações ou plataformas que também são objetos de fiscalização. Use verificadores como uma fonte entre várias, nunca como árbitro final da verdade. A pluralidade de fontes é mais confiável que a centralização da verificação.',
  },
];

export default function ManipulacaoInformacional() {
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
    "headline": "Manipulação Informacional: Propaganda, Novilíngua e Filtros Algorítmicos",
    "description": "Investigação das seis técnicas de propaganda moderna que moldam crenças. Framing, novilíngua, bolha algorítmica, engenharia de consentimento, apelo ao medo e astroturfing.",
    "author": { "@type": "Person", "name": "Lord Junnior", "url": "https://lordjunnior.com.br" },
    "datePublished": "2026-04-20",
    "image": "https://lordjunnior.com.br/heroes/manipulacao-informacional.webp",
    "publisher": { "@type": "Organization", "name": "Lord Junnior", "url": "https://lordjunnior.com.br" },
    "mainEntityOfPage": "https://lordjunnior.com.br/soberania-organica/toxicos-ocultos/manipulacao-informacional",
  };

  return (
    <div className="min-h-screen text-stone-100 font-sans selection:bg-violet-400/30 relative text-[17px] md:text-[18px] lg:text-[19px] leading-relaxed [&_p]:leading-[1.75]" style={{ background: '#050508' }}>
      {/* Fundo cinematográfico fixo */}
      <div
        aria-hidden
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(5,5,12,0.88), rgba(5,5,12,0.95)), url(${bgManipulacao})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      />

      <div className="relative z-20 px-6 md:px-12 lg:px-20 pt-[52px]">
        <BackToHome />
      </div>

      <Helmet>
        <title>Manipulação Informacional: Propaganda, Novilíngua e Algoritmo | Lord Junnior</title>
        <meta name="description" content="Identifique as seis técnicas de propaganda moderna que moldam crenças sem você perceber. Framing, novilíngua, bolha algorítmica, engenharia de consentimento, medo e astroturfing." />
        <meta name="keywords" content="propaganda, manipulação midiática, bolha algorítmica, novilíngua, Edward Bernays, fake news, censura, moderação de conteúdo, higiene informacional, soberania mental" />
        <meta property="og:title" content="Manipulação Informacional: O Que Molda Suas Crenças Sem Você Perceber" />
        <meta property="og:description" content="Seis técnicas documentadas de propaganda moderna. Identifique, neutralize e reconquiste autonomia mental." />
        <meta property="og:image" content="https://lordjunnior.com.br/heroes/manipulacao-informacional.webp" />
        <meta property="og:type" content="article" />
        <link rel="canonical" href="https://lordjunnior.com.br/soberania-organica/toxicos-ocultos/manipulacao-informacional" />
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
      </Helmet>

      <motion.div className="fixed top-0 left-0 right-0 h-[2px] z-50 origin-left"
        style={{ width: progressWidth, background: 'linear-gradient(90deg, #a855f7, #6366f1)' }} />

      <CinematicHero
        image="/heroes/manipulacao-informacional.webp"
        phase="Vetor 02 · Mente"
        title="Manipulação Informacional"
        subtitle="Da propaganda estatal ao filtro algorítmico, camadas de manipulação projetadas para moldar percepções e crenças sem que você perceba. Aprenda a identificar, nomear e neutralizar."
        icon={Brain}
        accentColor="violet"
        backLink="/soberania-organica/toxicos-ocultos"
        backLabel="Tóxicos Ocultos"
      />

      {/* Capítulo 01: Diagnóstico */}
      <section className="relative z-10 py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="mb-16 max-w-4xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-[2px] bg-violet-500 rounded-full" />
              <span className="text-violet-400 text-[10px] font-bold tracking-[0.5em] uppercase">Capítulo 01 · O Diagnóstico</span>
            </div>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tight text-white mb-6 leading-[1.05]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              SUA MENTE É O <span className="text-violet-400">CAMPO DE BATALHA</span>
            </h2>
            <p className="text-stone-300 text-base md:text-lg leading-relaxed max-w-3xl mb-4">
              O brasileiro médio é exposto a mais de 5.000 mensagens persuasivas por dia, segundo a American Marketing Association. Cada uma foi engenheirada por especialistas em comportamento humano, neuromarketing e ciência política.
            </p>
            <p className="text-stone-400 text-base md:text-lg leading-relaxed max-w-3xl">
              O resultado é uma população convencida de que suas opiniões são próprias, quando na verdade foram cuidadosamente fabricadas em laboratórios de comunicação corporativa e estatal. A higiene informacional é o equivalente mental do que a higiene alimentar é ao corpo.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {[
              { value: '5.000+', label: 'Mensagens persuasivas que o brasileiro médio recebe por dia', alt: 180 },
              { value: '20%', label: 'Variação possível em eleitores indecisos pela ordem dos resultados de busca', alt: 200 },
              { value: '2.5h', label: 'Tempo médio diário de uso de redes sociais no Brasil em 2024', alt: 190 },
              { value: '70%', label: 'Das notícias compartilhadas nunca foram lidas pelo compartilhador', alt: 210 },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}
                whileHover={{ y: -6 }}
                className="group relative overflow-hidden rounded-2xl border border-violet-500/10 bg-gradient-to-br from-violet-500/[0.04] to-transparent p-6 md:p-8 hover:border-violet-500/30 hover:shadow-[0_20px_60px_-15px_rgba(168,85,247,0.3)] transition-all duration-500 cursor-default"
                style={{ minHeight: `${stat.alt}px` }}
              >
                <div className="absolute top-0 left-0 right-0 h-[2px] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-700 bg-gradient-to-r from-violet-500 to-transparent" />
                <p className="text-4xl md:text-5xl font-black text-violet-400 mb-3 tabular-nums" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{stat.value}</p>
                <p className="text-stone-400 text-xs md:text-sm leading-relaxed group-hover:text-stone-200 transition-colors">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Capítulo 02: Arsenal de Técnicas com imagens cinematográficas */}
      <section className="relative z-10 py-20 md:py-32 border-t border-white/[0.04]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="mb-16 max-w-4xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-[2px] bg-violet-500 rounded-full" />
              <span className="text-violet-400 text-[10px] font-bold tracking-[0.5em] uppercase">Capítulo 02 · Os Mecanismos</span>
            </div>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tight text-white mb-6 leading-[1.05]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              ARSENAL DE <span className="text-violet-400">MANIPULAÇÃO</span>
            </h2>
            <p className="text-stone-400 text-base leading-relaxed">
              Seis técnicas documentadas que operam em escala industrial. Cada uma explora uma vulnerabilidade psicológica diferente. Reconhecê-las pelo nome é o primeiro passo para neutralizar o efeito sobre você e seus próximos.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {TECNICAS.map((tec, i) => (
              <motion.article
                key={tec.titulo}
                initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }} variants={fadeUp} custom={i % 2}
                whileHover={{ y: -4 }}
                className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] hover:border-violet-500/30 transition-all duration-500"
                style={{ minHeight: i % 3 === 0 ? '620px' : i % 3 === 1 ? '660px' : '600px' }}
              >
                <div className="relative h-56 md:h-64 overflow-hidden">
                  <img
                    src={tec.img}
                    alt={tec.titulo}
                    loading="lazy"
                    width={1280}
                    height={800}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1500ms] ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-[#050508]/40 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <div className="w-12 h-12 rounded-xl bg-violet-500/20 backdrop-blur-md border border-violet-500/30 flex items-center justify-center">
                      <tec.icon size={20} className="text-violet-300" />
                    </div>
                  </div>
                </div>

                <div className="p-6 md:p-8">
                  <h4 className="text-xl md:text-2xl font-black text-white mb-4 leading-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    {tec.titulo}
                  </h4>
                  <p className="text-stone-400 text-sm md:text-base leading-relaxed mb-5">{tec.desc}</p>
                  <div className="border-l-2 border-violet-500/40 pl-4 bg-violet-500/[0.03] py-3 rounded-r">
                    <p className="text-[10px] text-violet-400/60 font-bold uppercase tracking-wider mb-1">Exemplo prático</p>
                    <p className="text-violet-200/80 text-sm italic leading-relaxed">{tec.exemplo}</p>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Capítulo 03: Higiene Informacional */}
      <section className="relative z-10 py-20 md:py-32 border-t border-white/[0.04]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="mb-16 max-w-4xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-[2px] bg-violet-500 rounded-full" />
              <span className="text-violet-400 text-[10px] font-bold tracking-[0.5em] uppercase">Capítulo 03 · A Defesa</span>
            </div>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tight text-white mb-6 leading-[1.05]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              HIGIENE <span className="text-violet-400">INFORMACIONAL</span>
            </h2>
            <p className="text-stone-400 text-base leading-relaxed">
              Quatro práticas diárias que reduzem drasticamente sua vulnerabilidade às técnicas anteriores. Não exigem isolamento, exigem método.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {HIGIENE_INFO.map((item, i) => (
              <motion.div
                key={item.titulo}
                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i * 0.1}
                whileHover={{ y: -4 }}
                className="group p-8 md:p-10 rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] hover:border-violet-500/30 transition-all duration-500"
                style={{ minHeight: i % 2 === 0 ? '260px' : '280px' }}
              >
                <div className="flex items-center gap-4 mb-5">
                  <span className="text-3xl font-black text-violet-400/40 tabular-nums" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>0{i + 1}</span>
                  <div className="h-[1px] flex-1 bg-gradient-to-r from-violet-500/30 to-transparent" />
                  <Shield size={18} className="text-violet-400/50 group-hover:text-violet-400 transition-colors" />
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
              <div className="w-8 h-[2px] bg-violet-500 rounded-full" />
              <span className="text-violet-400 text-[10px] font-bold tracking-[0.5em] uppercase">Capítulo 04 · O Debate</span>
            </div>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.05]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              PERGUNTAS <span className="text-violet-400">FREQUENTES</span>
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {FAQ_ITEMS.map((item, i) => (
              <motion.div
                key={item.q}
                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i * 0.1}
                whileHover={{ y: -2 }}
                className="p-6 md:p-8 rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:border-violet-500/20 transition-all duration-500"
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
              Da mente para o <span className="text-cyan-400">comportamento</span>
            </h3>
            <Link
              to="/soberania-organica/toxicos-ocultos/dependencia-tecnologica"
              className="inline-flex items-center gap-3 bg-cyan-500 text-white px-10 py-5 font-bold text-sm tracking-wide rounded-xl hover:bg-cyan-400 hover:shadow-2xl hover:shadow-cyan-500/20 hover:scale-[1.03] transition-all duration-500 group"
            >
              Dependência Tecnológica
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-8 border-t border-white/[0.04] text-right">
        <p className="text-stone-700 font-medium text-base tracking-tight italic">Quem controla a narrativa, controla o comportamento.</p>
      </div>
    </div>
  );
}
