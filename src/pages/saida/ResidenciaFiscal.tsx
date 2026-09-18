import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Scale, Banknote, Globe2, Plane, ShieldCheck, AlertTriangle,
  ArrowRight, ChevronDown, FileSignature, Compass, MapPin, Calendar
} from 'lucide-react';
import SeoHead from '@/components/SeoHead';
import BackToHome from '@/components/BackToHome';
import FixedThematicBackground from '@/components/backgrounds/FixedThematicBackground';
import CinematicHero from '@/components/CinematicHero';
import heroImg from '@/assets/saida/residencia-fiscal-hero.webp';
import imgSaida from '@/assets/saida/residencia-fiscal-saida.webp';
import imgDomicilio from '@/assets/saida/residencia-fiscal-domicilio.webp';

const APPLE_EASE = [0.22, 1, 0.36, 1] as const;
const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.7, ease: APPLE_EASE, delay },
});

interface Jurisdicao {
  nome: string;
  regime: string;
  imposto: string;
  diasMin: string;
  custoVida: string;
  observacao: string;
}

const JURISDICOES: Jurisdicao[] = [
  {
    nome: 'Paraguai',
    regime: 'Territorial puro',
    imposto: '0% sobre renda externa',
    diasMin: '120 dias/ano (recomendado)',
    custoVida: 'USD 1.200 a 2.500/mês',
    observacao: 'Residência permanente em 90 dias, sem CFC, sem imposto sobre Bitcoin externo. Cédula em 6 meses.',
  },
  {
    nome: 'Uruguai',
    regime: 'Territorial com 11 anos de holiday',
    imposto: '0% por 11 anos sobre renda externa',
    diasMin: '183 dias/ano',
    custoVida: 'USD 2.500 a 4.500/mês',
    observacao: 'Estabilidade institucional, regime tax holiday para novos residentes, sem CFC, banco local sólido.',
  },
  {
    nome: 'Panamá',
    regime: 'Territorial',
    imposto: '0% sobre renda externa',
    diasMin: 'Sem mínimo formal',
    custoVida: 'USD 1.800 a 3.500/mês',
    observacao: 'Friendly Nations Visa exige depósito bancário e atividade econômica local. Ótimo para banking offshore.',
  },
  {
    nome: 'Emirados Árabes (Dubai)',
    regime: 'Sem imposto de renda pessoal',
    imposto: '0% sobre qualquer renda',
    diasMin: '90 dias/ano',
    custoVida: 'USD 3.500 a 8.000/mês',
    observacao: 'Golden Visa por investimento ou empresa. Regulação cripto clara via VARA. Custo alto, mobilidade premium.',
  },
  {
    nome: 'Portugal',
    regime: 'NHR encerrado em 2024, IFICI ativo',
    imposto: '20% sobre renda local, isenções parciais externas',
    diasMin: '183 dias/ano',
    custoVida: 'USD 2.500 a 5.000/mês',
    observacao: 'Regime perdeu atratividade após reforma. Bitcoin holding longo (1+ ano) ainda isento. Útil para acesso UE.',
  },
  {
    nome: 'El Salvador',
    regime: 'Bitcoin como moeda legal',
    imposto: '0% sobre Bitcoin, 10% sobre renda externa',
    diasMin: '183 dias/ano',
    custoVida: 'USD 1.500 a 3.000/mês',
    observacao: 'Único país do mundo com Bitcoin como curso legal. Residência por investimento de 3 BTC. Ambiente pró-soberania.',
  },
  {
    nome: 'Geórgia',
    regime: 'Territorial high-net-worth',
    imposto: '0% sobre renda externa',
    diasMin: '183 dias/ano',
    custoVida: 'USD 1.000 a 2.500/mês',
    observacao: 'Programa HNWI por patrimônio comprovado. Banco local aceita estrangeiro com facilidade. Baixa burocracia.',
  },
  {
    nome: 'Malásia (MM2H)',
    regime: 'Territorial',
    imposto: '0% sobre renda externa',
    diasMin: '90 dias/ano',
    custoVida: 'USD 1.500 a 3.500/mês',
    observacao: 'Programa My Second Home com depósito bancário. Inglês falado, infraestrutura asiática moderna.',
  },
];

const PILARES = [
  {
    icon: MapPin,
    titulo: 'Domicílio físico',
    descricao: 'Onde você efetivamente dorme. A Receita Federal mede via cartões, deslocamento, escola dos filhos, conta de luz. Mudar endereço no papel sem mudar vida real é fraude documental e gera autuação retroativa.',
  },
  {
    icon: Calendar,
    titulo: 'Centro de interesses vitais',
    descricao: 'Onde estão sua família, seu trabalho, suas relações sociais e seus bens principais. O Brasil aplica o critério mesmo quando você cumpre 183 dias fora. Romper vínculo exige movimentação real.',
  },
  {
    icon: Scale,
    titulo: 'Dias de presença física',
    descricao: 'A regra geral é menos de 183 dias no Brasil em qualquer período de 12 meses corridos. Mas o critério não é mecânico, contar dias sem mover patrimônio e família não convence o fisco em fiscalização.',
  },
  {
    icon: FileSignature,
    titulo: 'Declaração de Saída Definitiva (DSD)',
    descricao: 'O ato formal de comunicação à Receita Federal. Sem ela, você continua sendo residente fiscal brasileiro mesmo morando há anos fora, e continua pagando IR mundial. É o documento que rompe juridicamente o vínculo.',
  },
];

const ARMADILHAS = [
  {
    titulo: 'Achar que mudar país é mudar residência fiscal',
    detalhe: 'São coisas diferentes. Cidadania é vínculo de soberania. Residência fiscal é vínculo tributário. Você pode ser brasileiro vivendo em Lisboa há 8 anos e continuar devendo IR ao Brasil se não fez DSD.',
  },
  {
    titulo: 'Não fazer Comunicação de Saída + Declaração de Saída',
    detalhe: 'São dois atos distintos. A Comunicação avisa que você vai sair (até o último dia útil de fevereiro do ano-calendário seguinte). A Declaração formaliza com balanço patrimonial. Faltar uma já invalida o processo.',
  },
  {
    titulo: 'Manter conta bancária ativa no Brasil sem reclassificar',
    detalhe: 'Após DSD, contas no Brasil precisam ser reclassificadas como contas de não residente. Banco recolhe IR na fonte sobre rendimentos. Manter como residente após sair é fraude tributária.',
  },
  {
    titulo: 'Continuar pagando carnê-leão ou DARF mensal',
    detalhe: 'Não residente não tem obrigação de carnê-leão. Continuar gerando DARF é prova documental de que você nunca rompeu o vínculo. Auditoria futura usa contra você.',
  },
  {
    titulo: 'Voltar ao Brasil e morar mais de 183 dias',
    detalhe: 'Reaquisição automática de residência fiscal. Você volta a dever IR mundial sem precisar declarar nada. É a armadilha clássica de quem sai e volta sem planejamento.',
  },
  {
    titulo: 'Escolher jurisdição sem tratado de bitributação',
    detalhe: 'Sem tratado, você pode pagar imposto duas vezes durante a transição. Brasil tem tratados com Portugal, Argentina, Itália, Espanha, Emirados, mas não com Paraguai, Panamá, Caribe.',
  },
];

const FAQ = [
  {
    q: 'Qual a diferença entre cidadania, residência e residência fiscal?',
    a: 'Cidadania é o vínculo permanente com um Estado, dá passaporte. Residência é a permissão legal de morar num país, dá visto. Residência fiscal é onde você paga imposto sobre sua renda mundial. Você pode ter cidadania brasileira, residência em Portugal e residência fiscal no Paraguai, três coisas diferentes administradas em paralelo.',
  },
  {
    q: 'Quando preciso fazer a Declaração de Saída Definitiva (DSD)?',
    a: 'Quando você sair do Brasil em caráter permanente, ou ficar fora por mais de 12 meses consecutivos. A Comunicação de Saída deve ser entregue a partir da data da saída até o último dia útil de fevereiro do ano-calendário seguinte. A Declaração propriamente dita segue o calendário normal do IR (abril). Sem DSD, você continua sendo residente fiscal brasileiro independente do tempo fora.',
  },
  {
    q: 'Posso virar residente fiscal de outro país sem sair do Brasil?',
    a: 'Não. Residência fiscal exige presença física real no país-alvo (geralmente 183 dias por ano) ou que ele seja seu centro de interesses vitais. Esquemas de residência fiscal "no papel" sem mudança de vida geram problema dos dois lados, fraude no Brasil e nulidade no exterior.',
  },
  {
    q: 'Bitcoin é tributado se eu virar residente fiscal de outro país?',
    a: 'Depende da jurisdição. Paraguai, Panamá, Emirados, El Salvador, Geórgia e Malásia não tributam ganho de capital sobre Bitcoin externo. Portugal isenta holding longo (mais de 365 dias). Uruguai tem tax holiday de 11 anos. Mas atenção, no momento da DSD você precisa fazer balanço patrimonial completo no Brasil, declarando todos os ativos, inclusive Bitcoin, ao valor de aquisição.',
  },
  {
    q: 'Qual a melhor jurisdição para residência fiscal de Bitcoiner?',
    a: 'Paraguai pelo custo-benefício extremo (residência permanente em 90 dias, sem CFC, sem imposto), Emirados pela infraestrutura premium (Dubai com VARA regulando cripto profissionalmente), e El Salvador pela posição ideológica (Bitcoin como curso legal). Portugal perdeu atratividade após o fim do NHR em 2024.',
  },
  {
    q: 'Preciso vender meus bens no Brasil para fazer DSD?',
    a: 'Não. Você pode manter imóveis, contas e investimentos. Mas precisa reclassificar contas para "não residente", e a tributação sobre aluguéis e rendimentos passa a ser na fonte (15% a 25% conforme o caso). Imóvel mantido pode ser alugado, mas a renda é tributada como não residente.',
  },
  {
    q: 'O Brasil tem CFC (Controlled Foreign Corporation)?',
    a: 'Sim, desde 2014 (Lei 12.973). Empresas offshore controladas por residentes fiscais brasileiros têm os lucros tributados anualmente no Brasil, mesmo sem distribuição. Por isso a residência fiscal é o gatilho central, sem mudar residência fiscal, montar offshore só aumenta complexidade tributária.',
  },
  {
    q: 'Posso voltar ao Brasil depois da DSD?',
    a: 'Pode. Mas se permanecer mais de 183 dias em qualquer período de 12 meses, ou demonstrar intenção de fixação permanente (compra de imóvel, escola dos filhos, etc.), readquire automaticamente a residência fiscal. A partir desse momento, volta a dever IR mundial. Visitas curtas (até 60 dias por ano) são seguras.',
  },
];

export default function ResidenciaFiscal() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <>
      <SeoHead
        path="/saida/residencia-fiscal"
        custom={{
          title: 'Residência Fiscal: O Guia Brutal de Saída do Brasil (2026)',
          description: 'Como mudar residência fiscal: Declaração de Saída Definitiva, jurisdições territoriais, Paraguai, Uruguai, Emirados, El Salvador. Custos, prazos e armadilhas.',
          canonical: 'https://lordjunnior.com.br/saida/residencia-fiscal',
          primaryKeyword: 'residência fiscal',
          lsiKeywords: ['declaração de saída definitiva', 'DSD Receita Federal', 'mudança de domicílio fiscal', 'tributação não residente', 'residência fiscal Paraguai', 'NHR Portugal', 'tax holiday Uruguai', 'CFC Brasil'],
          longTailKeywords: ['como mudar residência fiscal do Brasil', 'declaração de saída definitiva 2026', 'paraguai residência fiscal bitcoin', 'melhor país para residência fiscal', 'residência fiscal emirados árabes'],
          breadcrumbs: [
            { name: 'Início', url: '/' },
            { name: 'Saída & Infraestrutura', url: '/saida' },
            { name: 'Residência Fiscal', url: '/saida/residencia-fiscal' },
          ],
          schemaType: 'Article',
          articleSection: 'Saída & Infraestrutura',
          relatedPages: ['/saida', '/saida/segundo-passaporte', '/teoria-das-bandeiras', '/soberania-financeira'],
        }}
        faqItems={FAQ.map((f) => ({ question: f.q, answer: f.a }))}
      />

      <FixedThematicBackground image={heroImg} intensity="heavy" />

      <div className="relative z-20 px-6 md:px-12 lg:px-20 pt-[52px]">
        <BackToHome />
      </div>

      <div className="min-h-screen text-stone-100 relative z-10">
        <CinematicHero
          image={heroImg}
          phase="Saída · Bandeira 02"
          title={
            <>
              Residência fiscal:{' '}
              <span className="italic font-serif text-amber-400 font-light tracking-tight">o corte real do cordão</span>
            </>
          }
          subtitle="Passaporte é mobilidade. Residência fiscal é independência tributária. Sem romper formalmente o vínculo com a Receita Federal, qualquer outra bandeira é teatro. O guia operacional da Declaração de Saída Definitiva, das jurisdições reais e das armadilhas que custam patrimônio."
          icon={Scale}
          accentColor="amber"
          backLink="/saida"
          backLabel="Saída & Infraestrutura"
        />

        {/* CAPÍTULO 1 */}
        <section className="relative max-w-5xl mx-auto px-5 md:px-8 py-24 md:py-32">
          <motion.div {...fade(0)}>
            <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-amber-400 font-bold block mb-5">Capítulo 01</span>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-stone-100 mb-8 leading-[0.92]" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
              Cidadania não tira{' '}
              <span className="italic font-serif text-amber-400 font-light normal-case tracking-tight">você do fisco.</span>
            </h2>
            <div className="space-y-6 text-stone-300 text-lg leading-relaxed font-light max-w-3xl">
              <p>
                A confusão mais cara do brasileiro que tenta sair: achar que ter passaporte português, italiano ou paraguaio resolve o problema fiscal. Não resolve. Enquanto você for residente fiscal brasileiro, deve imposto de renda mundial à Receita Federal, sobre Bitcoin, sobre dividendos, sobre aluguéis no exterior, sobre tudo.
              </p>
              <p>
                Romper esse vínculo exige um ato administrativo formal chamado Declaração de Saída Definitiva (DSD). Sem ele, você é tratado como residente para todos os efeitos tributários, mesmo morando há dez anos fora. E voltar ao Brasil sem cuidado restaura o vínculo automaticamente.
              </p>
              <p className="text-stone-100 italic font-serif text-xl border-l-2 border-amber-500/40 pl-6">
                Cidadania abre a porta. Residência fiscal corta o cabo de aço.
              </p>
            </div>
          </motion.div>
        </section>

        {/* CAPÍTULO 2 — PILARES */}
        <section className="relative max-w-7xl mx-auto px-5 md:px-8 py-24">
          <motion.div {...fade(0)} className="text-center mb-16">
            <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-amber-400 font-bold block mb-4">Capítulo 02</span>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-stone-100 leading-[0.92]" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
              Os quatro pilares{' '}
              <span className="italic font-serif text-amber-400 font-light normal-case tracking-tight">da ruptura.</span>
            </h2>
            <p className="text-stone-400 max-w-2xl mx-auto mt-5 text-base leading-relaxed font-light">
              A Receita Federal aplica os quatro critérios em conjunto. Não basta cumprir um, é preciso construir os quatro de forma documentável.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-5">
            {PILARES.map((p, i) => (
              <motion.div
                key={p.titulo}
                {...fade(i * 0.05)}
                className="group relative overflow-hidden rounded-sm border border-amber-500/15 bg-stone-950/60 p-7 md:p-9 transition-all duration-500 hover:-translate-y-1 hover:border-amber-500/35 hover:shadow-xl hover:shadow-amber-500/10"
              >
                <span aria-hidden className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-amber-400 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-center" />
                <div className="flex items-start gap-4 mb-5">
                  <div className="p-3 rounded bg-amber-500/[0.08] border border-amber-500/20">
                    <p.icon size={22} className="text-amber-400" />
                  </div>
                  <h3 className="text-2xl font-black uppercase tracking-tight text-stone-100 leading-tight pt-1" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                    {p.titulo}
                  </h3>
                </div>
                <p className="text-stone-300 text-sm leading-relaxed font-light">{p.descricao}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* IMAGEM SAÍDA */}
        <section className="relative max-w-7xl mx-auto px-5 md:px-8 py-12">
          <motion.figure {...fade(0)} className="relative rounded-sm overflow-hidden h-[480px] md:h-[620px] border border-stone-900">
            <img
              src={imgSaida}
              alt="Silhueta de viajante atravessando terminal de aeroporto vazio ao amanhecer com malas, luz dourada entrando pelas janelas, representando ato físico de saída do Brasil para nova residência fiscal."
              loading="lazy"
              width={1920}
              height={1080}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, transparent 0%, rgba(5,8,8,0.2) 50%, rgba(5,8,8,0.92) 100%)' }} />
            <figcaption className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
              <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-amber-400 font-bold block mb-2">Ato físico de ruptura</span>
              <p className="text-stone-100 text-2xl md:text-4xl font-black uppercase tracking-tight italic max-w-2xl leading-tight" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                Sair sem DSD é mudar de cidade. Sair com DSD é mudar de jurisdição.
              </p>
            </figcaption>
          </motion.figure>
        </section>

        {/* CAPÍTULO 3 — JURISDIÇÕES */}
        <section className="relative max-w-7xl mx-auto px-5 md:px-8 py-24 md:py-32">
          <motion.div {...fade(0)} className="mb-16">
            <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-amber-400 font-bold block mb-4">Capítulo 03</span>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-stone-100 leading-[0.92] mb-5" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
              Oito jurisdições reais,{' '}
              <span className="italic font-serif text-amber-400 font-light normal-case tracking-tight">sem maquiagem.</span>
            </h2>
            <p className="text-stone-400 max-w-3xl text-base leading-relaxed font-light">
              Comparativo de 2026 considerando regime tributário, dias mínimos de presença, custo de vida real e adequação para perfil Bitcoiner com renda externa. Custo de vida estimado para padrão classe média alta urbana.
            </p>
          </motion.div>

          <div className="space-y-4">
            {JURISDICOES.map((j, i) => (
              <motion.div
                key={j.nome}
                {...fade(i * 0.04)}
                className="group rounded-sm border border-stone-800 bg-stone-950/60 p-6 md:p-8 hover:border-amber-500/30 hover:bg-stone-950/80 transition-all duration-500"
              >
                <div className="grid md:grid-cols-12 gap-5 md:gap-8 items-start">
                  <div className="md:col-span-3">
                    <div className="flex items-center gap-3 mb-2">
                      <Globe2 size={18} className="text-amber-400" />
                      <h3 className="text-3xl font-black uppercase tracking-tight text-stone-100 leading-none" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                        {j.nome}
                      </h3>
                    </div>
                    <p className="text-[11px] font-mono uppercase tracking-[0.25em] text-amber-400/80">{j.regime}</p>
                  </div>
                  <div className="md:col-span-3 grid grid-cols-2 md:block gap-3">
                    <div className="md:mb-3">
                      <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-stone-500 mb-1">Imposto</p>
                      <p className="text-stone-100 text-sm font-semibold">{j.imposto}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-stone-500 mb-1">Dias mínimos</p>
                      <p className="text-stone-100 text-sm font-semibold">{j.diasMin}</p>
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-stone-500 mb-1">Custo de vida</p>
                    <p className="text-stone-100 text-sm font-semibold">{j.custoVida}</p>
                  </div>
                  <div className="md:col-span-4">
                    <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-stone-500 mb-1">Observação tática</p>
                    <p className="text-stone-300 text-sm leading-relaxed font-light">{j.observacao}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* IMAGEM DOMICÍLIO */}
        <section className="relative max-w-7xl mx-auto px-5 md:px-8 py-12">
          <motion.figure {...fade(0)} className="relative rounded-sm overflow-hidden h-[440px] md:h-[560px] border border-stone-900">
            <img
              src={imgDomicilio}
              alt="Interior minimalista de apartamento com vista para palmeiras e oceano em jurisdição tropical, mesa de madeira com laptop, luz da manhã entrando pelas janelas, representando vida real estabelecida em novo domicílio fiscal."
              loading="lazy"
              width={1920}
              height={1080}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, transparent 0%, rgba(5,8,8,0.25) 55%, rgba(5,8,8,0.92) 100%)' }} />
            <figcaption className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
              <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-amber-400 font-bold block mb-2">Domicílio que prova vida</span>
              <p className="text-stone-100 text-2xl md:text-4xl font-black uppercase tracking-tight italic max-w-2xl leading-tight" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                Endereço no papel não engana auditoria. Vida real em outro país, sim.
              </p>
            </figcaption>
          </motion.figure>
        </section>

        {/* CAPÍTULO 4 — TIMELINE DSD */}
        <section className="relative max-w-5xl mx-auto px-5 md:px-8 py-24 md:py-32">
          <motion.div {...fade(0)} className="mb-14">
            <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-amber-400 font-bold block mb-4">Capítulo 04</span>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-stone-100 leading-[0.92]" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
              A linha do tempo{' '}
              <span className="italic font-serif text-amber-400 font-light normal-case tracking-tight">da DSD honesta.</span>
            </h2>
            <p className="text-stone-400 max-w-3xl text-base leading-relaxed font-light mt-4">
              Operação cronológica padrão para quem decide hoje romper o vínculo. Cada etapa tem prazo legal e gera documento que protege em fiscalização futura.
            </p>
          </motion.div>

          <div className="relative pl-10 border-l border-amber-500/25 space-y-10">
            {[
              { mes: 'Mês -6', titulo: 'Decisão e mapeamento patrimonial', desc: 'Levante todos os ativos no Brasil e no exterior: imóveis, contas, investimentos, Bitcoin, empresas. Calcule custo tributário do balanço de saída. Escolha jurisdição-alvo com tratado de bitributação compatível.' },
              { mes: 'Mês -3', titulo: 'Visto e domicílio no país-alvo', desc: 'Solicite visto de residência (Friendly Nations Panamá, Permanente Paraguai, MM2H Malásia, Golden Visa Emirados). Alugue ou compre imóvel. Abra conta bancária local. Comece a constituir o domicílio físico.' },
              { mes: 'Mês 0', titulo: 'Saída física do Brasil', desc: 'Embarque definitivo. A partir desta data começa a contagem para a Comunicação de Saída. Desativar matrícula em escola dos filhos, encerrar contratos de longa duração, formalizar mudança no condomínio.' },
              { mes: 'Mês 1 a 12', titulo: 'Comunicação de Saída Definitiva', desc: 'Entregar a Comunicação de Saída via e-CAC até o último dia útil de fevereiro do ano-calendário seguinte. Reclassifica contas bancárias para "não residente". Banco passa a recolher IR na fonte.' },
              { mes: 'Mês 4 a 16', titulo: 'Declaração de Saída Definitiva (DSD)', desc: 'Entregar a DSD propriamente dita seguindo o calendário do IR (abril). Inclui balanço patrimonial completo de tudo que você possuía na data da saída, em valores de aquisição. Bitcoin entra pelo custo médio.' },
              { mes: 'Mês 6 a 18', titulo: 'Pedido de residência fiscal no novo país', desc: 'Cumpra os 183 dias de presença (ou requisito específico). Solicite Tax Identification Number e certidão de residência fiscal. Esse documento blinda contra alegação de evasão.' },
              { mes: 'Mês 12 a 24', titulo: 'Operação consolidada', desc: 'Banco brasileiro tributa rendimentos como não residente. Renda externa não declarada no Brasil. Visitas ao Brasil controladas (máximo 60 a 90 dias/ano). Sistema rodando, vínculo rompido.' },
            ].map((item, i) => (
              <motion.div key={item.mes} {...fade(i * 0.05)} className="relative">
                <span className="absolute -left-[44px] top-1 w-3 h-3 rounded-full bg-amber-400 ring-4 ring-amber-400/15" />
                <p className="font-mono text-[10px] tracking-[0.35em] uppercase text-amber-400/90 font-bold mb-2">{item.mes}</p>
                <h3 className="text-xl md:text-2xl font-bold text-stone-100 mb-2 tracking-tight">{item.titulo}</h3>
                <p className="text-stone-300 text-base leading-relaxed font-light">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CAPÍTULO 5 — ARMADILHAS */}
        <section className="relative max-w-7xl mx-auto px-5 md:px-8 py-24 md:py-32">
          <motion.div {...fade(0)} className="mb-14">
            <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-red-400 font-bold block mb-4">Capítulo 05</span>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-stone-100 leading-[0.92]" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
              Seis armadilhas{' '}
              <span className="italic font-serif text-red-400 font-light normal-case tracking-tight">que voltam como autuação.</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {ARMADILHAS.map((arm, i) => (
              <motion.div
                key={arm.titulo}
                {...fade(i * 0.04)}
                className="rounded-sm border border-red-500/15 bg-stone-950/60 p-6 hover:border-red-500/35 transition-all duration-500"
              >
                <div className="flex items-start gap-3 mb-3">
                  <AlertTriangle size={18} className="text-red-400 shrink-0 mt-0.5" />
                  <h3 className="text-base font-bold text-stone-100 leading-snug">{arm.titulo}</h3>
                </div>
                <p className="text-stone-400 text-sm leading-relaxed font-light">{arm.detalhe}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CAPÍTULO 6 — CHECKLIST */}
        <section className="relative max-w-4xl mx-auto px-5 md:px-8 py-24 md:py-32">
          <motion.div {...fade(0)}>
            <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-amber-400 font-bold block mb-4">Capítulo 06</span>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-stone-100 leading-[0.92] mb-10" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
              Checklist de{' '}
              <span className="italic font-serif text-amber-400 font-light normal-case tracking-tight">execução em 60 dias.</span>
            </h2>

            <div className="space-y-4">
              {[
                'Inventariar todo patrimônio: imóveis, contas, investimentos, Bitcoin (custo médio), empresas, créditos.',
                'Escolher jurisdição-alvo cruzando regime tributário, dias mínimos, custo de vida e tratado com o Brasil.',
                'Contratar advogado tributarista brasileiro para revisar balanço de saída e calcular custo da DSD.',
                'Solicitar visto de residência no país-alvo e reservar imóvel para domicílio físico real.',
                'Abrir conta bancária no novo país antes de sair, idealmente com cartão internacional ativo.',
                'Comunicar bancos brasileiros sobre intenção de reclassificação para conta de não residente.',
                'Encerrar contratos de prestação contínua (telefone, internet, planos de saúde dependentes de residência).',
                'Marcar a data de embarque como divisor cronológico e arquivar comprovantes (passagem, embarque, locação).',
                'Entregar Comunicação de Saída Definitiva via e-CAC até o prazo legal do ano-calendário seguinte.',
                'Após 12 meses de presença efetiva no novo país, solicitar certidão de residência fiscal local.',
              ].map((item, i) => (
                <motion.div key={i} {...fade(i * 0.03)} className="flex items-start gap-4 p-4 rounded-sm border border-stone-800 bg-stone-950/40 hover:border-amber-500/25 transition-colors">
                  <div className="shrink-0 w-7 h-7 rounded-full border border-amber-500/40 bg-amber-500/[0.06] flex items-center justify-center text-amber-400 font-mono text-xs font-bold">
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <p className="text-stone-200 text-sm md:text-base leading-relaxed font-light pt-0.5">{item}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* FAQ */}
        <section className="relative max-w-4xl mx-auto px-5 md:px-8 py-24 md:py-32">
          <motion.div {...fade(0)} className="text-center mb-14">
            <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-amber-400 font-bold block mb-4">Dúvidas operacionais</span>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-stone-100 leading-[0.92]" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
              Perguntas{' '}
              <span className="italic font-serif text-amber-400 font-light normal-case tracking-tight">que o contador raramente responde.</span>
            </h2>
          </motion.div>

          <div className="space-y-2">
            {FAQ.map((item, i) => (
              <motion.div key={i} {...fade(i * 0.03)}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full text-left rounded-sm border border-stone-800 bg-stone-950/60 hover:border-amber-500/30 transition-all p-5 md:p-6 flex items-start justify-between gap-4 group"
                  aria-expanded={openFaq === i}
                >
                  <span className="text-stone-100 text-base md:text-lg font-semibold leading-snug pr-4">{item.q}</span>
                  <ChevronDown
                    size={20}
                    className={`text-amber-400 shrink-0 mt-1 transition-transform duration-500 ${openFaq === i ? 'rotate-180' : ''}`}
                  />
                </button>
                {openFaq === i && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ duration: 0.4, ease: APPLE_EASE }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 md:px-6 py-5 text-stone-300 text-base leading-relaxed font-light border-l-2 border-amber-500/40 ml-2 mt-2">
                      {item.a}
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA FECHAMENTO */}
        <section className="relative max-w-4xl mx-auto px-5 md:px-8 py-24 md:py-32 text-center">
          <motion.div {...fade(0)}>
            <Compass size={32} className="text-amber-400/70 mx-auto mb-6" />
            <p className="text-stone-200 text-xl md:text-2xl italic font-serif font-light max-w-2xl mx-auto mb-10 leading-relaxed">
              Quem não rompe o vínculo fiscal é cidadão de papel em outro país e contribuinte real no Brasil. Pior dos dois mundos.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link
                to="/saida/segundo-passaporte"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-sm bg-amber-500 text-stone-950 font-bold text-sm uppercase tracking-[0.2em] hover:bg-amber-400 transition-colors"
              >
                Bandeira anterior: Passaporte <ArrowRight size={14} />
              </Link>
              <Link
                to="/teoria-das-bandeiras"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-sm border border-stone-700 text-stone-200 font-bold text-sm uppercase tracking-[0.2em] hover:border-amber-500/40 hover:text-amber-400 transition-colors"
              >
                Teoria das Bandeiras
              </Link>
            </div>
          </motion.div>
        </section>
      </div>
    </>
  );
}
