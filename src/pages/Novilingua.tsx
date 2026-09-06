import React, { useState, useEffect, useCallback } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Search, BookOpen, ArrowRight, Brain, Eye, ShieldAlert } from 'lucide-react';
import { Link } from 'react-router-dom';
import ScrollToTop from '@/components/ScrollToTop';
import BackToHome from '@/components/BackToHome';
import bgNovilingua from '@/assets/bg-novilingua.jpg';

const TERMS = [
  { term: "Justiça Social", real: "Redistribuição forçada de riqueza produzida por terceiros, sem consentimento, sob ameaça de violência estatal." },
  { term: "Regulação", real: "Barreiras burocráticas que protegem monopólios existentes e impedem a concorrência de novos entrantes." },
  { term: "Investimento Público", real: "Gasto político com dinheiro alheio, sem prestação de contas real ou incentivo de eficiência." },
  { term: "Política Monetária", real: "Manipulação da oferta de dinheiro que dilui o poder de compra de quem poupa e trabalha." },
  { term: "Função Social da Propriedade", real: "Pretexto jurídico para o Estado confiscar propriedade privada quando julgar conveniente." },
  { term: "Progressividade Fiscal", real: "Punição crescente para quem produz mais. Quanto mais você trabalha, maior a fatia que o Estado toma." },
  { term: "Contribuição Social", real: "Imposto com nome bonito. Você não contribui, é obrigado sob ameaça de prisão." },
  { term: "Bem Comum", real: "Conceito abstrato usado para justificar qualquer medida autoritária que beneficie o grupo no poder." },
  { term: "Estímulo Econômico", real: "Impressão de dinheiro ou aumento de gastos que gera inflação futura e dívida para a próxima geração." },
  { term: "Direito Adquirido", real: "Privilégio permanente concedido a grupos conectados ao Estado, pago pelos que não têm acesso ao poder." },
  { term: "Soberania Nacional", real: "Monopólio territorial de violência que impede cidadãos de escolher livremente sob qual jurisdição viver." },
  { term: "Segurança Jurídica", real: "Previsibilidade das regras, que o Estado altera retroativamente quando lhe convém." },
  { term: "Democracia", real: "Sistema onde 51 por cento da população decide o que fazer com a propriedade e a liberdade dos outros 49 por cento." },
  { term: "Estado de Direito", real: "Monopólio legislativo onde o próprio Estado cria, interpreta e aplica as regras, e se isenta delas." },
  { term: "Servidor Público", real: "Funcionário do Estado com estabilidade vitalícia, sem vínculo real com produtividade ou resultado." },
  { term: "Imposto", real: "Extração compulsória de riqueza sob ameaça de multa, penhora ou prisão. Não é voluntário." },
  { term: "Programa Social", real: "Transferência de renda dos que produzem para os que votam. Mecanismo de dependência eleitoral." },
  { term: "Saúde Pública", real: "Serviço monopolizado pelo Estado com filas de meses, falta de insumos e hospitais sucateados." },
  { term: "Educação Pública", real: "Sistema de doutrinação estatal onde o conteúdo é definido por burocratas, não por pais ou alunos." },
  { term: "Segurança Pública", real: "Promessa estatal de proteção que nunca se materializa, enquanto o cidadão é proibido de se defender." },
  { term: "Reforma Tributária", real: "Rearranjo da forma de cobrar impostos, nunca uma redução real. O bolo é redistribuído, mas nunca diminui." },
  { term: "Transparência", real: "Publicação obrigatória de dados que ninguém lê, em portais que ninguém entende, sobre gastos que ninguém aprova." },
  { term: "Responsabilidade Fiscal", real: "Lei que o próprio governo descumpre com créditos extraordinários, pedaladas e mudanças de meta." },
  { term: "Desenvolvimento Sustentável", real: "Slogan vago usado para justificar regulações que encarecem tudo e beneficiam ONGs e consultorias." },
  { term: "Inclusão Social", real: "Criação de dependência estatal que mantém populações vulneráveis como base eleitoral cativa." },
  { term: "Banco Central Independente", real: "Instituição que controla o dinheiro sem responder a ninguém. Independente do povo, submisso ao sistema financeiro." },
  { term: "Taxa de Juros", real: "Preço do dinheiro manipulado artificialmente por burocratas que nunca empreenderam." },
  { term: "Inflação", real: "Roubo silencioso do poder de compra, causado pela expansão monetária e chamado de aumento de preços." },
  { term: "Meta de Inflação", real: "Admissão oficial de que o governo planeja roubar entre 3 e 4,5 por cento do seu dinheiro por ano." },
  { term: "Superávit Primário", real: "O governo arrecadou mais do que gastou, ignorando trilhões em juros da dívida que ele mesmo criou." },
  { term: "Dívida Pública", real: "Promessa de pagamento feita por políticos usando o dinheiro das gerações futuras que não votaram." },
  { term: "Privatização", real: "Devolução ao setor privado do que nunca deveria ter sido estatizado. Tratada como escândalo pela mídia estatal." },
  { term: "Estatização", real: "Quando o governo toma controle de uma empresa funcional e a transforma em cabide de empregos." },
  { term: "Reserva Fracionária", real: "Sistema onde bancos emprestam dinheiro que não possuem, multiplicando risco com proteção estatal." },
  { term: "Seguro Depósito FGC", real: "Garantia de que o contribuinte vai pagar a conta quando o banco quebrar por irresponsabilidade." },
  { term: "Moeda Fiduciária", real: "Dinheiro que vale porque o governo manda, até o dia em que não vale mais nada." },
  { term: "Câmbio Administrado", real: "Manipulação estatal do preço do dólar para esconder a desvalorização real da moeda local." },
  { term: "Compliance", real: "Burocracia regulatória que impede cidadãos honestos de usar seu dinheiro livremente." },
  { term: "KYC e AML", real: "Vigilância financeira total sobre cidadãos comuns, enquanto o crime organizado opera livremente." },
  { term: "Proteção ao Consumidor", real: "Regulamentação que encarece produtos, elimina opções baratas e protege grandes empresas da concorrência." },
  { term: "Salário Mínimo", real: "Proibição legal de trabalhar abaixo de um valor arbitrário, que exclui os mais vulneráveis do mercado." },
  { term: "CLT", real: "Conjunto de leis trabalhistas que reduz o salário real do trabalhador em até 70 por cento em encargos ocultos." },
  { term: "Previdência Social", real: "Esquema Ponzi estatal onde você paga a aposentadoria de hoje e torce para alguém pagar a sua amanhã." },
  { term: "FGTS", real: "Poupança forçada com rendimento abaixo da inflação. O governo te obriga a perder dinheiro lentamente." },
  { term: "Concurso Público", real: "Processo seletivo para cargos vitalícios sem avaliação de desempenho, financiado por quem produz." },
  { term: "Desigualdade", real: "Diferença natural de resultado usada como pretexto para confisco e controle social." },
  { term: "Carga Tributária", real: "Percentual da riqueza nacional tomado à força pelo Estado. No Brasil, ultrapassa 33 por cento do PIB." },
  { term: "Nota Fiscal", real: "Recibo de imposto embutido. O cidadão paga sem perceber e o Estado arrecada sem resistência." },
  { term: "Guerra às Drogas", real: "Política proibicionista que financia o tráfico, superlota presídios e nunca reduziu o consumo." },
  { term: "Ordem Pública", real: "Pretexto para restringir liberdades individuais em nome da convivência harmônica definida pelo Estado." },
  { term: "Desinformação", real: "Qualquer informação que contradiga a narrativa oficial, independente de ser verdadeira." },
  { term: "Fact Checking", real: "Verificação seletiva de fatos que protege narrativas oficiais e censura opiniões dissidentes." },
  { term: "Fake News", real: "Termo genérico usado para deslegitimar qualquer informação inconveniente para o poder estabelecido." },
  { term: "Regulação de Plataformas", real: "Censura estatal da internet disfarçada de proteção ao usuário." },
  { term: "Concessão Pública", real: "O Estado te aluga o direito de usar algo que deveria ser livre, e cobra por isso." },
  { term: "Licenciamento Ambiental", real: "Burocracia que paralisa obras por anos, encarece projetos e alimenta uma indústria de consultorias." },
  { term: "Zona Franca", real: "Área onde o Estado rouba menos, provando que a solução é roubar menos em todo lugar." },
  { term: "Subsídio", real: "Dinheiro dos impostos direcionado para empresas escolhidas por políticos. Capitalismo de compadres." },
  { term: "BNDES", real: "Banco estatal que empresta dinheiro barato para grandes empresários com conexões políticas." },
  { term: "Fundo Eleitoral", real: "Bilhões de reais dos impostos usados para financiar campanhas de políticos que você não escolheu." },
  { term: "Imunidade Parlamentar", real: "Privilégio que protege políticos de serem julgados como qualquer cidadão comum." },
  { term: "Foro Privilegiado", real: "Tribunal especial para políticos, onde processos demoram décadas e prescrevem convenientemente." },
  { term: "Auxílio Moradia", real: "Benefício milionário para juízes e parlamentares que já possuem imóveis próprios." },
  { term: "Teto de Gastos", real: "Limite de gastos públicos que é furado sistematicamente com exceções e créditos extraordinários." },
  { term: "Pacto Federativo", real: "Acordo entre esferas de governo sobre como dividir o dinheiro tomado dos cidadãos." },
  { term: "Política de Cotas", real: "Discriminação institucionalizada que trata indivíduos como membros de grupos, não como pessoas." },
  { term: "Renda Básica Universal", real: "Dependência estatal massificada. O governo te dá migalhas do que antes tomou em impostos." },
  { term: "Lockdown", real: "Prisão domiciliar coletiva imposta sem julgamento, destruindo negócios e saúde mental." },
  { term: "Estado de Emergência", real: "Suspensão legal de direitos individuais com prazo indefinido e fiscalização nula." },
  { term: "Vacinação Obrigatória", real: "Violação da autonomia corporal individual em nome de uma saúde coletiva definida pelo Estado." },
  { term: "PIB", real: "Indicador que soma gastos do governo como produção, inflando artificialmente a economia no papel." },
  { term: "Pleno Emprego", real: "Meta utópica que ignora que o Estado não cria riqueza, apenas redistribui e destrói." },
  { term: "Déficit Público", real: "Quando o governo gasta mais do que rouba, e cobre a diferença com dívida ou impressão de dinheiro." },
  { term: "Acordo de Paris", real: "Tratado global onde países ricos ditam regras ambientais que travam o desenvolvimento dos pobres." },
  { term: "ESG", real: "Critérios subjetivos impostos por fundos bilionários para controlar empresas e narrativas sociais." },
  { term: "Agenda 2030", real: "Plano centralizado da ONU para definir como 8 bilhões de pessoas devem viver, sem serem consultadas." },
  { term: "Tribunal de Contas", real: "Órgão que fiscaliza o governo e é composto por indicados do próprio governo." },
  { term: "Orçamento Secreto", real: "Destinação bilionária de recursos públicos sem transparência, negociada em troca de apoio político." },
  { term: "Emenda Parlamentar", real: "Dinheiro dos impostos direcionado pelo político para sua base eleitoral em troca de votos futuros." },
  { term: "Sigilo de 100 Anos", real: "Classificação que impede o povo de saber o que o governo fez com o dinheiro do povo." },
];

const APPLE_EASE = [0.22, 1, 0.36, 1] as const;
const fadeUp = {
  hidden: { opacity: 0, y: 24, filter: 'blur(6px)' },
  visible: (i: number) => ({ opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.6, ease: APPLE_EASE, delay: i * 0.05 } }),
};

function useMouseParallax(strength = 8) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });
  const handleMouse = useCallback((e: MouseEvent) => {
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    mouseX.set(((e.clientX - cx) / cx) * strength);
    mouseY.set(((e.clientY - cy) / cy) * strength);
  }, [mouseX, mouseY, strength]);
  useEffect(() => {
    window.addEventListener('mousemove', handleMouse);
    return () => window.removeEventListener('mousemove', handleMouse);
  }, [handleMouse]);
  return { springX, springY };
}

const Novilingua: React.FC = () => {
  const [search, setSearch] = useState('');
  const [scrollProgress, setScrollProgress] = useState(0);
  const { springX, springY } = useMouseParallax(8);

  useEffect(() => { window.scrollTo(0, 0); }, []);
  useEffect(() => {
    const h = () => { const t = document.documentElement.scrollHeight - window.innerHeight; setScrollProgress(t > 0 ? Math.min((window.scrollY / t) * 100, 100) : 0); };
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);

  const filtered = TERMS.filter(t =>
    t.term.toLowerCase().includes(search.toLowerCase()) ||
    t.real.toLowerCase().includes(search.toLowerCase())
  );

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'DefinedTermSet',
    name: 'Novilíngua, Dicionário de Termos Estatais Decodificados',
    description: 'Dicionário com mais de 80 termos do vocabulário estatal e midiático traduzidos para a realidade objetiva.',
    inLanguage: 'pt-BR',
    publisher: { '@type': 'Person', name: 'Lord Junnior' },
    hasDefinedTerm: TERMS.slice(0, 25).map(t => ({
      '@type': 'DefinedTerm', name: t.term, description: t.real,
    })),
  };

  return (
    <div
      className="min-h-screen text-stone-100 font-sans selection:bg-rose-400/40 relative"
      style={{
        backgroundImage: `linear-gradient(180deg, rgba(5,8,8,0.92) 0%, rgba(5,8,8,0.88) 50%, rgba(5,8,8,0.95) 100%), url(${bgNovilingua})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <Helmet>
        <title>Novilíngua, Dicionário de Termos Estatais Decodificados | Lord Junnior</title>
        <meta name="description" content="Dicionário com mais de 80 termos do Estado e da mídia traduzidos para a realidade objetiva. Justiça social, inflação, regulação, ESG. Leitura crítica de mídia." />
        <meta name="keywords" content="novilingua, dicionario politico, termos estatais, leitura critica midia, manipulacao informacional, soberania cognitiva, lord junnior" />
        <link rel="canonical" href="https://lordjunnior.com.br/novilingua" />
        <meta property="og:title" content="Novilíngua, Dicionário de Termos Estatais Decodificados" />
        <meta property="og:description" content="Mais de 80 termos do Estado traduzidos para a realidade objetiva." />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://lordjunnior.com.br/novilingua" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>

      <ScrollToTop />

      <div className="relative z-20 px-6 md:px-12 lg:px-20 pt-[52px]">
        <BackToHome />
      </div>

      <div className="fixed top-0 left-0 right-0 z-50 h-[3px]">
        <div className="h-full transition-all duration-150" style={{ width: `${scrollProgress}%`, background: 'linear-gradient(90deg, #dc2626, #f59e0b)' }} />
      </div>

      <div className="fixed inset-0 pointer-events-none z-[1]">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=\"0 0 256 256\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cfilter id=\"n\"%3E%3CfeTurbulence type=\"fractalNoise\" baseFrequency=\"0.9\" numOctaves=\"4\" stitchTiles=\"stitch\"/%3E%3C/filter%3E%3Crect width=\"100%25\" height=\"100%25\" filter=\"url(%23n)\"/%3E%3C/svg%3E')", backgroundSize: '128px 128px' }} />
        <motion.div style={{ x: springX, y: springY }} className="absolute top-[10%] left-[5%] w-[600px] h-[600px] rounded-full opacity-[0.05] bg-gradient-radial from-rose-500/40 to-transparent blur-3xl" />
        <motion.div style={{ x: springY, y: springX }} className="absolute bottom-[10%] right-[5%] w-[500px] h-[500px] rounded-full opacity-[0.04] bg-gradient-radial from-amber-500/30 to-transparent blur-3xl" />
      </div>

      {/* HERO CINEMATOGRÁFICO */}
      <section className="relative z-10 min-h-[88vh] flex flex-col justify-center px-6 md:px-12 lg:px-20 py-24">
        <div className="max-w-7xl mx-auto w-full">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: APPLE_EASE }}>
            <div className="inline-flex items-center gap-3 mb-8 px-4 py-2 rounded-full bg-rose-500/10 border border-rose-500/25 backdrop-blur-sm">
              <div className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-pulse" />
              <span className="text-rose-300 text-[10px] md:text-xs font-bold tracking-[0.4em] uppercase">Cosmovisão e Discernimento</span>
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[0.95] text-white mb-8" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Novi<span className="text-rose-400">língua</span>
            </h1>
            <p className="text-lg md:text-2xl text-stone-300 leading-relaxed max-w-3xl mb-10 font-light">
              Mais de 80 termos do Estado e da mídia traduzidos para a realidade objetiva. Quem controla a linguagem, controla o pensamento.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#dicionario" className="group inline-flex items-center gap-3 bg-rose-500 text-white px-8 md:px-10 py-5 font-bold text-sm md:text-base tracking-wide rounded-2xl hover:bg-rose-400 hover:shadow-[0_0_50px_rgba(244,63,94,0.4)] hover:-translate-y-1 transition-all duration-500">
                <BookOpen size={20} /> Abrir o dicionário
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <Link to="/silencio-queda" className="inline-flex items-center gap-3 bg-white/5 border border-white/15 text-white px-8 py-5 font-semibold text-sm tracking-wide rounded-2xl hover:bg-white/10 hover:border-white/30 transition-all duration-500">
                Ler O Silêncio da Queda
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* PILARES DA LEITURA CRÍTICA */}
      <section className="relative z-10 py-20 md:py-28 px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="mb-12 text-center">
            <span className="text-[10px] font-bold tracking-[0.5em] uppercase text-rose-400/70">Por que importa</span>
            <h2 className="text-4xl md:text-6xl font-black tracking-tight text-white mt-3 max-w-4xl mx-auto" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Quem domina a palavra, domina a realidade
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Eye, h: 'tall', title: 'Reconhecer eufemismos', text: 'Toda política autoritária se anuncia com nome bonito. Aprenda a decifrar o disfarce semântico antes que ele decifre você.' },
              { icon: Brain, h: 'short', title: 'Blindar a cognição', text: 'Vocabulário emprestado da mídia molda pensamento. Trocar o léxico é o primeiro passo da soberania mental.' },
              { icon: ShieldAlert, h: 'tall', title: 'Defender o discernimento', text: 'Cada termo aqui é uma vacina contra a engenharia de consentimento praticada diariamente nos noticiários.' },
            ].map((p, i) => (
              <motion.div
                key={p.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i}
                className={`group relative rounded-3xl bg-white/[0.03] border border-white/10 p-8 md:p-10 backdrop-blur-sm hover:border-rose-500/30 hover:bg-white/[0.05] hover:-translate-y-2 hover:shadow-[0_30px_60px_rgba(244,63,94,0.12)] transition-all duration-500 overflow-hidden ${p.h === 'tall' ? 'md:min-h-[360px]' : 'md:min-h-[280px]'}`}
              >
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-rose-500/40 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />
                <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-rose-500/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="relative">
                  <div className="inline-flex p-3 rounded-2xl bg-rose-500/10 border border-rose-500/25 mb-6 group-hover:scale-110 transition-transform duration-500">
                    <p.icon size={24} className="text-rose-300" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{p.title}</h3>
                  <p className="text-stone-400 text-base md:text-lg leading-relaxed">{p.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* DICIONÁRIO */}
      <section id="dicionario" className="relative z-10 py-20 md:py-28 px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="mb-12 text-center">
            <span className="text-[10px] font-bold tracking-[0.5em] uppercase text-rose-400/70">Dicionário</span>
            <h2 className="text-4xl md:text-6xl font-black tracking-tight text-white mt-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              {TERMS.length} termos decodificados
            </h2>
          </motion.div>

          <div className="relative mb-12 max-w-2xl mx-auto">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-stone-500" size={20} />
            <input
              type="text"
              placeholder="Buscar termo, ex: inflação, justiça social..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-14 pr-24 py-5 bg-white/[0.04] border border-white/[0.10] rounded-2xl text-white text-base md:text-lg placeholder:text-stone-600 focus:outline-none focus:border-rose-500/40 focus:bg-white/[0.06] focus:shadow-[0_0_30px_rgba(244,63,94,0.10)] transition-all backdrop-blur-md"
            />
            <span className="absolute right-5 top-1/2 -translate-y-1/2 text-xs text-stone-500 font-bold tabular-nums">{filtered.length}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
            {filtered.map((item, i) => (
              <motion.div
                key={item.term}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
                variants={fadeUp}
                custom={Math.min(i, 8)}
                className="group relative bg-white/[0.03] border border-white/[0.07] rounded-2xl p-6 md:p-8 hover:border-rose-500/25 hover:bg-white/[0.05] hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(244,63,94,0.10)] transition-all duration-500 overflow-hidden"
              >
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-rose-500/40 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />
                <h3 className="text-xl md:text-2xl font-bold text-white mb-3 leading-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  {item.term}
                </h3>
                <p className="text-[9px] font-bold tracking-[0.35em] uppercase text-rose-400/70 mb-3">Tradução real</p>
                <p className="text-stone-300 text-base md:text-lg leading-relaxed">{item.real}</p>
              </motion.div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20 text-stone-500 text-lg">Nenhum termo encontrado. Tente outra busca.</div>
          )}
        </div>
      </section>


      {/* NOVILÍNGUA APLICADA AO DINHEIRO */}
      <section className="relative z-10 py-20 md:py-28 px-6 md:px-12 lg:px-20">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white leading-tight mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            A Novilíngua aplicada ao seu dinheiro, hoje
          </h2>
          <p className="text-stone-300 text-lg leading-relaxed max-w-3xl mb-10">
            Não é teoria de romance. O vocabulário oficial já opera nas suas contas. Repare no padrão: toda palavra
            que descreve controle é substituída por uma palavra que descreve conforto.
          </p>
          <div className="grid gap-4 md:grid-cols-3 mb-10">
            {[
              { termo: 'Moeda digital de banco central (CBDC)', vende: 'modernização e inclusão', significa: 'dinheiro programável, com regra de gasto definida por terceiros' },
              { termo: 'Rastreabilidade do PIX', vende: 'segurança contra fraude', significa: 'registro permanente de com quem, quando e quanto você transaciona' },
              { termo: 'Conformidade regulatória', vende: 'proteção do usuário', significa: 'entrega automática dos seus dados sem que você seja avisado' },
            ].map((t) => (
              <div key={t.termo} className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6">
                <p className="text-white font-bold text-base mb-3 leading-snug">{t.termo}</p>
                <p className="text-stone-400 text-sm leading-relaxed mb-2">
                  <span className="text-rose-400 font-semibold">Vendem como:</span> {t.vende}
                </p>
                <p className="text-stone-300 text-sm leading-relaxed">
                  <span className="text-rose-400 font-semibold">Significa:</span> {t.significa}
                </p>
              </div>
            ))}
          </div>
          <Link to="/alertas/cbdc-brasil" className="group inline-flex items-center gap-3 bg-white/5 border border-rose-500/30 text-white px-8 py-4 font-semibold text-sm tracking-wide rounded-2xl hover:bg-rose-500/10 transition-all duration-500">
            Veja o exemplo prático definitivo: CBDC no Brasil
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="relative z-10 py-20 md:py-32 px-6 md:px-12 lg:px-20">
        <div className="max-w-5xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="text-center rounded-3xl bg-gradient-to-b from-rose-500/[0.06] to-transparent border border-rose-500/20 p-10 md:p-20 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-radial from-rose-500/[0.05] via-transparent to-transparent" />
            <div className="relative space-y-8">
              <div className="inline-flex p-5 rounded-3xl bg-rose-500/10 border border-rose-500/30">
                <Brain size={28} className="text-rose-300" />
              </div>
              <h2 className="text-4xl md:text-6xl font-black tracking-tight text-white leading-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Quem controla a linguagem,<br /><span className="text-rose-400">controla o pensamento.</span>
              </h2>
              <p className="text-stone-300 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                A defesa começa no vocabulário. Continue a blindagem cognitiva no laboratório de discernimento e na filosofia da soberania.
              </p>
              <div className="flex flex-wrap gap-4 justify-center pt-4">
                <Link to="/soberania-organica/toxicos-ocultos/manipulacao-informacional" className="group inline-flex items-center gap-3 bg-rose-500 text-white px-10 py-5 font-bold text-base tracking-wide rounded-2xl hover:bg-rose-400 hover:shadow-[0_0_50px_rgba(244,63,94,0.4)] hover:-translate-y-1 transition-all duration-500">
                  Manipulação informacional <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link to="/filosofia" className="inline-flex items-center gap-3 bg-white/5 border border-white/20 text-white px-10 py-5 font-semibold text-base tracking-wide rounded-2xl hover:bg-white/10 hover:border-white/40 transition-all duration-500">
                  Filosofia e discernimento
                </Link>
              </div>
            </div>
          </motion.div>

          <footer className="border-t border-white/[0.05] pt-12 mt-20 text-center space-y-4">
            <p className="text-white/80 text-lg font-medium" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              A palavra é a primeira fronteira da liberdade.
            </p>
            <p className="text-stone-700 text-[9px] font-bold tracking-[0.5em] uppercase">Lord Junnior &copy; 2026</p>
          </footer>
        </div>
      </section>
    </div>
  );
};

export default Novilingua;
