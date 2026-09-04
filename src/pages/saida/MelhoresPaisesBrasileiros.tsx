import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Globe, ShieldCheck, AlertTriangle, ChevronDown, ArrowRight, Plane,
  Banknote, Landmark, Coins, Fingerprint,
} from 'lucide-react';
import SeoHead from '@/components/SeoHead';
import BackToHome from '@/components/BackToHome';
import heroImg from '@/assets/saida/melhores-paises-hero.jpg';
import chileImg from '@/assets/chile/chile-hero.jpg';
import paraguaiImg from '@/assets/saida/pais-paraguai.jpg';
import uruguaiImg from '@/assets/saida/pais-uruguai.jpg';
import georgiaImg from '@/assets/saida/pais-georgia.jpg';

/**
 * /saida/melhores-paises-brasileiros
 * Hub pilar. Compara Chile, Paraguai, Uruguai, Geórgia, Palau, Panamá, Portugal, El Salvador.
 * Segue arquitetura de CedulaResidenciaChile.tsx.
 */

const APPLE_EASE = [0.22, 1, 0.36, 1] as const;
const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.8, ease: APPLE_EASE, delay },
});

type Pais = {
  nome: string;
  custoVida: string;
  facilidade: string;
  tributacao: string;
  estabilidade: string;
  banking: string;
  cidadania: string;
  link?: string;
};

const PAISES: Pais[] = [
  {
    nome: 'Chile',
    custoVida: 'Médio-alto (Santiago custa quase como capital europeia)',
    facilidade: 'Alta. Processo iniciado 100% online, sem despachante',
    tributacao: 'Renda mundial após período, com isenção de até 6 anos para algumas categorias',
    estabilidade: 'A mais sólida da região, moeda respeitada e banco central independente',
    banking: 'Excelente com RUN. Bancos locais operam em pesos e dólar',
    cidadania: 'Possível após residência permanente e tempo de domicílio',
    link: '/saida/cedula-residencia-chile',
  },
  {
    nome: 'Paraguai',
    custoVida: 'Baixo. Um dos mais baratos da América do Sul',
    facilidade: 'Média. Exige representante legal, mas processo é objetivo',
    tributacao: 'Territorial pura. Renda de fora do país fica fora da base tributável',
    estabilidade: 'Moderada, câmbio mais volátil, mas regras migratórias estáveis há anos',
    banking: 'Funcional com cédula, compliance mais rigoroso nos últimos anos',
    cidadania: 'Possível após permanente e domicílio efetivo comprovado',
    link: '/saida/residencia-paraguai',
  },
  {
    nome: 'Uruguai',
    custoVida: 'Alto para padrão latino-americano, próximo do europeu',
    facilidade: 'Média-alta. Processo consolidado, com regras claras para rentistas',
    tributacao: 'Isenção total sobre renda estrangeira e cripto por até 10 anos',
    estabilidade: 'Uma das mais altas da América Latina, democracia consolidada',
    banking: 'Bom, embora bancos privados exijam depósito mínimo relevante',
    cidadania: 'Naturalização possível após período de residência legal contínua',
  },
  {
    nome: 'Geórgia',
    custoVida: 'Muito baixo para padrão de vida entregue',
    facilidade: 'Altíssima. Residência por compra de imóvel de baixo valor ou depósito bancário',
    tributacao: 'Territorial, com regime de pequeno empresário com alíquota de 1%',
    estabilidade: 'Boa, embora geopolítica regional exija atenção constante',
    banking: 'Um dos sistemas mais abertos a não residentes do mundo (Bank of Georgia, TBC)',
    cidadania: 'Difícil. Naturalização exige renúncia à outra cidadania na maioria dos casos',
    link: '/soberania-financeira/contas-internacionais/bank-of-georgia',
  },
  {
    nome: 'Palau',
    custoVida: 'Alto, ilha pequena e isolada, logística cara',
    facilidade: 'Residência digital sem exigir presença física, mas não gera domicílio fiscal',
    tributacao: 'Não tributa renda de fonte estrangeira para não residentes',
    estabilidade: 'Estável politicamente, mas de relevância geopolítica limitada',
    banking: 'Muito limitado, não é rota de banking, é rota de identidade digital',
    cidadania: 'Não aplicável via este programa',
    link: '/palau-digital-residency',
  },
  {
    nome: 'Panamá',
    custoVida: 'Médio, Cidade do Panamá com custo de capital regional',
    facilidade: 'Alta com o visto de rentista ou o histórico programa de amigos do Panamá',
    tributacao: 'Territorial. Renda gerada fora do Panamá não é tributada',
    estabilidade: 'Boa, dolarização de fato e forte tradição bancária internacional',
    banking: 'Robusto, embora compliance para brasileiro tenha aumentado nos últimos anos',
    cidadania: 'Possível após período de residência permanente prolongado',
  },
  {
    nome: 'Portugal',
    custoVida: 'Alto e crescente, especialmente em Lisboa e Porto',
    facilidade: 'Baixa atualmente, filas consulares longas e mudanças frequentes de regra',
    tributacao: 'Renda mundial, com fim do regime de residente não habitual clássico',
    estabilidade: 'Alta, país da União Europeia com moeda forte',
    banking: 'Bom, mas exige NIF e comprovação robusta de origem de fundos',
    cidadania: 'Um dos caminhos mais rápidos para passaporte europeu (5 anos)',
  },
  {
    nome: 'El Salvador',
    custoVida: 'Baixo a médio, dolarizado desde 2001',
    facilidade: 'Alta para quem investe em Bitcoin, com programa de residência cripto',
    tributacao: 'Sem imposto sobre ganho de capital em Bitcoin, moeda de curso legal',
    estabilidade: 'Em transformação, segurança pública melhorou muito, instituições ainda jovens',
    banking: 'Em desenvolvimento, ecossistema Bitcoin mais maduro que banking tradicional',
    cidadania: 'Naturalização possível após período de residência legal',
  },
];

const CRITERIOS = [
  {
    titulo: 'Custo de vida real',
    icon: Banknote,
    texto: 'O número que decide se o plano B dura seis meses ou vira vida definitiva. Custo de vida baixo sem infraestrutura decente não é vantagem, é armadilha disfarçada.',
  },
  {
    titulo: 'Facilidade de residência',
    icon: Fingerprint,
    texto: 'Quantos documentos, quantos meses, quanto despachante você precisa para ter um papel válido na mão. Processo simples é ativo, processo obscuro é passivo escondido.',
  },
  {
    titulo: 'Tributação sobre renda estrangeira e cripto',
    icon: Coins,
    texto: 'A diferença entre sistema territorial e sistema de renda mundial pode valer mais que qualquer isenção pontual. É o critério que mais brasileiro ignora até já ter mudado.',
  },
  {
    titulo: 'Estabilidade institucional',
    icon: ShieldCheck,
    texto: 'Regra que muda por decreto noturno destrói qualquer planejamento de longo prazo. País estável é o que trata contrato como contrato, não como sugestão.',
  },
  {
    titulo: 'Banking para estrangeiro',
    icon: Landmark,
    texto: 'De nada adianta residência se o banco local trata você como suspeito permanente. Acesso bancário funcional é o que transforma residência em vida operacional.',
  },
  {
    titulo: 'Caminho para cidadania',
    icon: Globe,
    texto: 'Residência é aluguel. Cidadania é patrimônio de mobilidade. Nem todo país que dá residência fácil entrega caminho real de naturalização depois.',
  },
];

const ARMADILHAS = [
  'Escolher país só pelo custo de vida baixo e ignorar tributação sobre renda estrangeira, pagando depois imposto sobre patrimônio que já era seu antes de imigrar.',
  'Confundir residência fácil com estabilidade institucional. País que dá visto em uma semana pode mudar a regra do jogo na semana seguinte.',
  'Pagar despachante caro por processo que o próprio governo disponibiliza de graça ou por fração do valor cobrado.',
  'Mudar para país com sistema de renda mundial sem planejar a saída fiscal formal do Brasil antes, pagando imposto duplicado.',
  'Escolher só pela cidadania rápida e ignorar se o banking local realmente funciona para quem fatura em dólar ou em Bitcoin.',
  'Achar que residência automaticamente resolve domicílio fiscal. São processos distintos que exigem formalização separada em cada jurisdição.',
];

const FAQ = [
  {
    q: 'Qual é o melhor país para brasileiro morar em 2026?',
    a: 'Não existe resposta única. Chile lidera em estabilidade institucional e processo online. Paraguai e Uruguai lideram em tributação territorial. Geórgia lidera em banking aberto e custo baixo. Panamá equilibra dolarização com tradição bancária internacional. A escolha certa depende do seu perfil de renda, tolerância a burocracia e prioridade entre custo, tributação e cidadania.',
  },
  {
    q: 'Qual país tributa menos renda estrangeira e cripto?',
    a: 'Uruguai isenta renda estrangeira e ganho de capital por até 10 anos para novos residentes. Paraguai e Panamá adotam sistema territorial permanente, tributando só renda de fonte local. El Salvador não cobra imposto sobre ganho de capital em Bitcoin. Geórgia soma territorialidade a um regime de pequeno empresário com alíquota de 1% sobre faturamento.',
  },
  {
    q: 'Qual é o processo de residência mais barato para brasileiro?',
    a: 'Paraguai e Geórgia disputam essa posição, com custos totais de residência entre US$ 1.000 e US$ 3.500 dependendo da via escolhida. O Chile também tem taxas oficiais baixas, mas a viagem obrigatória para coleta biométrica soma ao custo total.',
  },
  {
    q: 'Qual desses países tem o caminho mais rápido para cidadania?',
    a: 'Portugal historicamente foi o mais rápido dentro da União Europeia, com prazo de 5 anos de residência legal. Fora da Europa, Chile e Panamá oferecem caminho de naturalização após residência permanente prolongada e vínculo comprovado com o país.',
  },
  {
    q: 'Preciso escolher só um país ou posso combinar mais de um?',
    a: 'A lógica da teoria das bandeiras é justamente não depender de um único ponto. Muita gente combina residência fiscal em um país com sistema territorial, segundo passaporte em outro e banking numa terceira jurisdição, distribuindo risco em vez de concentrar tudo numa só bandeira.',
  },
  {
    q: 'Palau serve para morar de verdade?',
    a: 'Não. O programa de residência digital de Palau não exige presença física e não gera domicílio fiscal nem direito de moradia efetiva. É uma ferramenta de identidade digital e KYC alternativo, não uma rota migratória tradicional. Deve ser tratado como peça específica, não como plano de mudança de vida.',
  },
  {
    q: 'El Salvador é seguro para morar hoje?',
    a: 'A segurança pública melhorou de forma expressiva na última década, mas as instituições do país ainda são jovens e concentradas. Para quem já vive de Bitcoin e quer testar um regime fiscal favorável a cripto, é rota relevante, desde que a decisão considere volatilidade institucional, não só o discurso otimista.',
  },
];

function CountryCard({ p, i }: { p: Pais; i: number }) {
  const rows: { label: string; value: string }[] = [
    { label: 'Custo de vida', value: p.custoVida },
    { label: 'Facilidade de residência', value: p.facilidade },
    { label: 'Tributação estrangeira/cripto', value: p.tributacao },
    { label: 'Estabilidade institucional', value: p.estabilidade },
    { label: 'Banking para estrangeiro', value: p.banking },
    { label: 'Caminho para cidadania', value: p.cidadania },
  ];
  return (
    <motion.div {...fade(i * 0.04)} className="rounded-2xl overflow-hidden" style={{ backgroundColor: '#ffffff', boxShadow: '0 1px 3px rgba(14,59,58,0.08)' }}>
      <div className="p-6 md:p-8 flex items-center justify-between" style={{ backgroundColor: '#0e3b3a' }}>
        <h3 className="text-2xl md:text-3xl font-black" style={{ color: '#f4ede4' }}>{p.nome}</h3>
        {p.link && (
          <Link to={p.link} className="inline-flex items-center gap-2 text-xs font-bold tracking-wider uppercase" style={{ color: '#e8a86b' }}>
            Guia completo <ArrowRight size={14} />
          </Link>
        )}
      </div>
      <div className="divide-y" style={{ borderColor: 'rgba(14,59,58,0.08)' }}>
        {rows.map((r) => (
          <div key={r.label} className="grid md:grid-cols-[220px_1fr] gap-1 md:gap-6 p-5 md:p-6">
            <span className="text-xs uppercase tracking-[0.15em] font-bold" style={{ color: '#b5622f' }}>{r.label}</span>
            <span className="text-base font-light leading-relaxed" style={{ color: '#2d3a37' }}>{r.value}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function Hero() {
  return (
    <section className="relative w-full" style={{ height: '92vh', minHeight: 720 }}>
      <img
        src={heroImg}
        alt="Mapa mundi estilizado com rotas de migração destacadas, representando as jurisdições mais amigáveis para brasileiros"
        width={1920}
        height={1080}
        className="absolute inset-0 w-full h-full object-cover" loading="eager" fetchPriority="high" decoding="async" />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(14,59,58,0.55) 0%, rgba(14,59,58,0.35) 40%, rgba(14,59,58,0.9) 100%)' }} />
      <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.1, ease: APPLE_EASE }} className="relative z-10 h-full flex flex-col justify-end px-6 md:px-12 lg:px-20 pb-20 md:pb-28 max-w-[1600px] mx-auto">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.2 }} className="inline-flex items-center gap-3 mb-8">
          <span className="px-4 py-1.5 rounded-full text-xs font-bold tracking-[0.3em] uppercase backdrop-blur-md" style={{ backgroundColor: 'rgba(244,237,228,0.15)', color: '#f4ede4', border: '1px solid rgba(244,237,228,0.3)' }}>
            <Plane size={11} className="inline mr-2" /> Saída & Infraestrutura · Hub de países
          </span>
        </motion.div>

        <motion.h1 initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} transition={{ duration: 1, delay: 0.15, ease: APPLE_EASE }} className="text-[clamp(2.75rem,8.5vw,7.5rem)] font-black leading-[0.95] tracking-tight max-w-[20ch]" style={{ fontFamily: "'Inter Tight', sans-serif", color: '#f4ede4' }}>
          Melhores países para{' '}
          <span style={{ color: '#e8a86b', fontStyle: 'italic', fontWeight: 400, fontFamily: "'Playfair Display', serif", textShadow: '0 0 40px rgba(232,168,107,0.45), 0 0 80px rgba(232,168,107,0.25)' }}>
            brasileiros morarem.
          </span>
        </motion.h1>

        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.5, ease: APPLE_EASE }} className="mt-8 max-w-2xl text-lg md:text-2xl leading-relaxed font-light" style={{ color: 'rgba(244,237,228,0.85)', fontFamily: "'Inter Tight', sans-serif" }}>
          Chile, Paraguai, Uruguai, Geórgia, Palau, Panamá, Portugal e El Salvador comparados por critérios objetivos: custo de vida, facilidade de residência, tributação, estabilidade, banking e caminho para cidadania.
        </motion.p>
      </motion.div>
    </section>
  );
}

export default function MelhoresPaisesBrasileiros() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <>
      <SeoHead
        path="/saida/melhores-paises-brasileiros"
        custom={{
          title: 'Melhores Países para Brasileiros Morarem em 2026',
          description:
            'Comparativo objetivo entre Chile, Paraguai, Uruguai, Geórgia, Palau, Panamá, Portugal e El Salvador: custo de vida, residência, tributação sobre renda estrangeira e cripto, estabilidade e banking.',
          canonical: 'https://sovereign-arsenal.lovable.app/saida/melhores-paises-brasileiros',
          primaryKeyword: 'melhores países para brasileiros morarem',
          lsiKeywords: [
            'onde morar fora do Brasil',
            'países com tributação territorial',
            'residência fiscal para brasileiro',
            'segunda residência para brasileiro',
            'países amigáveis para cripto',
            'plano B para brasileiro',
          ],
          longTailKeywords: [
            'qual o melhor país para brasileiro morar em 2026',
            'países que não tributam renda estrangeira',
            'comparativo Chile Paraguai Uruguai Geórgia Panamá',
            'onde tirar residência fiscal fora do Brasil',
          ],
          breadcrumbs: [
            { name: 'Início', url: '/' },
            { name: 'Saída & Infraestrutura', url: '/saida' },
            { name: 'Melhores Países para Brasileiros', url: '/saida/melhores-paises-brasileiros' },
          ],
          schemaType: 'Article',
          articleSection: 'Saída & Infraestrutura',
          relatedPages: [
            '/saida',
            '/saida/cedula-residencia-chile',
            '/saida/residencia-paraguai',
            '/saida/jurisdicoes-amigaveis',
            '/saida/segundo-passaporte',
            '/saida/residencia-fiscal',
            '/palau-digital-residency',
            '/soberania-financeira/contas-internacionais/bank-of-georgia',
            '/teoria-das-bandeiras',
          ],
        }}
        faqItems={FAQ.map((f) => ({ question: f.q, answer: f.a }))}
      />

      <div className="relative min-h-screen" style={{ backgroundColor: '#f4ede4', color: '#1c2624', fontFamily: "'Inter Tight', sans-serif" }}>
        <div className="absolute top-0 left-0 right-0 z-30 px-6 md:px-12 lg:px-20 pt-[52px]">
          <BackToHome />
        </div>

        <Hero />

        {/* CAPÍTULO 1 */}
        <section className="relative px-6 md:px-12 lg:px-20 py-24 md:py-36">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 max-w-[1600px] mx-auto">
            <motion.aside {...fade(0)} className="lg:col-span-4">
              <div className="sticky top-24">
                <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#b5622f' }}>
                  Capítulo 01
                </span>
                <div className="h-[2px] w-16 mb-6" style={{ backgroundColor: '#b5622f' }} />
                <p className="text-sm uppercase tracking-[0.2em] font-semibold" style={{ color: '#5a6664' }}>
                  Por que comparar por critério, não por sentimento
                </p>
              </div>
            </motion.aside>
            <motion.div {...fade(0.1)} className="lg:col-span-8">
              <h2 className="text-[clamp(2.25rem,5.5vw,5rem)] font-black leading-[1] tracking-tight mb-10" style={{ color: '#0e3b3a' }}>
                Todo país vende sonho.{' '}
                <span style={{ color: '#b5622f', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>
                  Poucos entregam número.
                </span>
              </h2>
              <div className="space-y-7 text-lg md:text-xl leading-[1.7] font-light" style={{ color: '#2d3a37' }}>
                <p>
                  Vídeo de influenciador mostra praia, café bom e aluguel barato. Não mostra a alíquota de imposto sobre dividendo estrangeiro, não mostra se o banco local aceita brasileiro sem referência prévia, não mostra o tempo real de fila no consulado. Este guia inverte a ordem: primeiro o número, depois a imagem bonita.
                </p>
                <p>
                  Cada um dos oito países abaixo foi analisado pelos mesmos seis critérios, sem favorecer o país que paga mais comissão de afiliado nem o que tem o marketing mais bonito. A ideia é simples: você decide com dado, não com sentimento de férias.
                </p>
                <blockquote className="pl-8 py-2 my-10 text-2xl md:text-3xl leading-[1.4] font-light" style={{ borderLeft: '3px solid #b5622f', color: '#0e3b3a', fontFamily: "'Playfair Display', serif", fontStyle: 'italic' }}>
                  País bom para morar não é o mais bonito no Instagram. É o que trata seu dinheiro e seu tempo com a mesma seriedade que você trata.
                </blockquote>
              </div>
            </motion.div>
          </div>
        </section>

        {/* CAPÍTULO 2 — CRITÉRIOS */}
        <section className="relative py-24 md:py-32 px-6 md:px-12 lg:px-20" style={{ backgroundColor: '#0e3b3a', color: '#f4ede4' }}>
          <div className="max-w-[1600px] mx-auto">
            <motion.div {...fade(0)} className="mb-16 max-w-3xl">
              <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#e8a86b' }}>
                Capítulo 02 · Os seis critérios
              </span>
              <h2 className="text-[clamp(2.25rem,5.5vw,5rem)] font-black leading-[1] tracking-tight">
                O que realmente{' '}
                <span style={{ color: '#e8a86b', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>
                  decide a mudança.
                </span>
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px rounded-2xl overflow-hidden" style={{ backgroundColor: 'rgba(244,237,228,0.15)' }}>
              {CRITERIOS.map((c, i) => (
                <motion.div key={c.titulo} {...fade(i * 0.05)} className="group relative p-8 md:p-10 transition-all duration-500" style={{ backgroundColor: '#0e3b3a' }}>
                  <div className="p-3 rounded-xl inline-flex mb-6 transition-transform group-hover:scale-110 duration-500" style={{ backgroundColor: 'rgba(232,168,107,0.15)', border: '1px solid rgba(232,168,107,0.3)' }}>
                    <c.icon size={22} style={{ color: '#e8a86b' }} />
                  </div>
                  <h3 className="text-xl md:text-2xl font-black leading-tight mb-4" style={{ color: '#f4ede4' }}>{c.titulo}</h3>
                  <p className="text-base leading-relaxed font-light" style={{ color: 'rgba(244,237,228,0.78)' }}>{c.texto}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CAPÍTULO 3 — TABELA COMPARATIVA POR PAÍS */}
        <section className="relative px-6 md:px-12 lg:px-20 py-24 md:py-36">
          <div className="max-w-[1600px] mx-auto">
            <motion.div {...fade(0)} className="mb-16 max-w-3xl">
              <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#b5622f' }}>
                Capítulo 03 · Comparativo direto
              </span>
              <h2 className="text-[clamp(2.25rem,5.5vw,5rem)] font-black leading-[1] tracking-tight" style={{ color: '#0e3b3a' }}>
                Oito países,{' '}
                <span style={{ color: '#b5622f', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>
                  seis critérios cada.
                </span>
              </h2>
              <p className="mt-6 text-lg md:text-xl font-light leading-[1.6]" style={{ color: '#2d3a37' }}>
                Cartões pensados para leitura em qualquer tela. Clique em "guia completo" para abrir o passo a passo detalhado de quem já publicamos aqui.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              {PAISES.map((p, i) => (
                <CountryCard key={p.nome} p={p} i={i} />
              ))}
            </div>
          </div>
        </section>

        {/* CAPÍTULO 4 — DESTAQUES VISUAIS (CHILE / PARAGUAI / URUGUAI / GEÓRGIA) */}
        <section className="relative px-6 md:px-12 lg:px-20 py-24 md:py-36" style={{ backgroundColor: '#ece2d3' }}>
          <div className="max-w-[1600px] mx-auto">
            <motion.div {...fade(0)} className="mb-16 max-w-3xl">
              <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#b5622f' }}>
                Capítulo 04 · As quatro rotas mais buscadas
              </span>
              <h2 className="text-[clamp(2.25rem,5vw,4.5rem)] font-black leading-[1] tracking-tight" style={{ color: '#0e3b3a' }}>
                Chile, Paraguai, Uruguai e Geórgia{' '}
                <span style={{ color: '#b5622f', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>
                  concentram a maior parte da migração real.
                </span>
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { img: chileImg, nome: 'Chile', to: '/saida/cedula-residencia-chile', desc: 'Processo online, isenção fiscal temporária' },
                { img: paraguaiImg, nome: 'Paraguai', to: '/saida/residencia-paraguai', desc: 'Tributação territorial, custo mais baixo' },
                { img: uruguaiImg, nome: 'Uruguai', to: undefined, desc: 'Isenção de até 10 anos para renda estrangeira' },
                { img: georgiaImg, nome: 'Geórgia', to: '/soberania-financeira/contas-internacionais/bank-of-georgia', desc: 'Banking aberto, custo de vida muito baixo' },
              ].map((d, i) => (
                <motion.div key={d.nome} {...fade(i * 0.06)} className="group relative h-[340px] overflow-hidden rounded-2xl">
                  <img src={d.img} alt={`Paisagem urbana de ${d.nome}, uma das rotas de residência mais buscadas por brasileiros`} loading="lazy" width={900} height={1200} className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105" />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, transparent 30%, rgba(14,59,58,0.9) 100%)' }} />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-2xl font-black mb-1" style={{ color: '#f4ede4' }}>{d.nome}</h3>
                    <p className="text-sm font-light mb-3" style={{ color: 'rgba(244,237,228,0.8)' }}>{d.desc}</p>
                    {d.to && (
                      <Link to={d.to} className="inline-flex items-center gap-2 text-xs font-bold tracking-wider uppercase" style={{ color: '#e8a86b' }}>
                        Ver guia <ArrowRight size={14} />
                      </Link>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CAPÍTULO 5 — ARMADILHAS */}
        <section className="relative py-24 md:py-32 px-6 md:px-12 lg:px-20" style={{ backgroundColor: '#0e3b3a', color: '#f4ede4' }}>
          <div className="max-w-[1400px] mx-auto">
            <motion.div {...fade(0)} className="mb-14 max-w-3xl">
              <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full" style={{ backgroundColor: 'rgba(232,168,107,0.12)', color: '#e8a86b' }}>
                <AlertTriangle size={14} />
                <span className="text-xs font-bold tracking-[0.3em] uppercase">Capítulo 05 · Armadilhas</span>
              </div>
              <h2 className="text-[clamp(2.25rem,5.5vw,5rem)] font-black leading-[1] tracking-tight">
                Seis erros que{' '}
                <span style={{ color: '#e8a86b', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>
                  custam mais do que economizam.
                </span>
              </h2>
            </motion.div>

            <div className="space-y-4">
              {ARMADILHAS.map((a, i) => (
                <motion.div key={i} {...fade(i * 0.05)} className="flex gap-6 p-6 md:p-8 rounded-2xl" style={{ backgroundColor: 'rgba(244,237,228,0.06)', border: '1px solid rgba(232,168,107,0.15)' }}>
                  <div className="shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-black" style={{ backgroundColor: 'rgba(232,168,107,0.2)', color: '#e8a86b' }}>
                    {i + 1}
                  </div>
                  <p className="text-base md:text-lg leading-relaxed font-light" style={{ color: 'rgba(244,237,228,0.92)' }}>{a}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CAPÍTULO 6 — FAQ */}
        <section className="relative px-6 md:px-12 lg:px-20 py-24 md:py-36" style={{ backgroundColor: '#ece2d3' }}>
          <div className="max-w-[1100px] mx-auto">
            <motion.div {...fade(0)} className="mb-14">
              <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#b5622f' }}>
                Capítulo 06 · Perguntas que importam
              </span>
              <h2 className="text-[clamp(2.25rem,5vw,4.5rem)] font-black leading-[1] tracking-tight" style={{ color: '#0e3b3a' }}>
                Antes de escolher{' '}
                <span style={{ color: '#b5622f', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>
                  o próximo endereço.
                </span>
              </h2>
            </motion.div>

            <div className="space-y-3">
              {FAQ.map((f, i) => {
                const open = openFaq === i;
                return (
                  <motion.div key={i} {...fade(i * 0.03)} className="rounded-2xl overflow-hidden" style={{ backgroundColor: '#f4ede4', boxShadow: open ? '0 8px 24px rgba(14,59,58,0.1)' : '0 1px 3px rgba(14,59,58,0.05)' }}>
                    <button onClick={() => setOpenFaq(open ? null : i)} className="w-full flex items-center justify-between gap-6 p-6 md:p-8 text-left">
                      <span className="text-lg md:text-xl font-bold leading-snug" style={{ color: '#0e3b3a' }}>{f.q}</span>
                      <ChevronDown size={22} className="shrink-0 transition-transform duration-500" style={{ color: '#b5622f', transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }} />
                    </button>
                    {open && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} transition={{ duration: 0.5, ease: APPLE_EASE }} className="px-6 md:px-8 pb-8">
                        <p className="text-base md:text-lg leading-relaxed font-light" style={{ color: '#2d3a37' }}>{f.a}</p>
                      </motion.div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CAPÍTULO 7 — Continue sua trilha */}
        <section className="relative py-24 md:py-32 px-6 md:px-12 lg:px-20" style={{ backgroundColor: '#0e3b3a', color: '#f4ede4' }}>
          <div className="max-w-[1400px] mx-auto">
            <motion.div {...fade(0)} className="mb-12 max-w-2xl">
              <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4" style={{ color: '#e8a86b' }}>
                Continue sua trilha
              </span>
              <h2 className="text-[clamp(2rem,4.5vw,4rem)] font-black leading-[1] tracking-tight">
                Escolher país{' '}
                <span style={{ color: '#e8a86b', fontStyle: 'italic', fontWeight: 300, fontFamily: "'Playfair Display', serif" }}>
                  é só a primeira bandeira.
                </span>
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                { to: '/saida/jurisdicoes-amigaveis', titulo: 'Ranking 2026 das jurisdições amigáveis', texto: 'A visão completa de todas as rotas mapeadas, com pontuação por critério.' },
                { to: '/saida/segundo-passaporte', titulo: 'Segundo passaporte: estratégia real', texto: 'Como transformar residência em nacionalidade sem depender de investimento milionário.' },
                { to: '/saida/residencia-fiscal', titulo: 'Residência fiscal: o que muda de verdade', texto: 'A diferença entre morar em outro país e deixar de ser tributado como residente brasileiro.' },
                { to: '/teoria-das-bandeiras', titulo: 'Teoria das Bandeiras', texto: 'O framework que sustenta qualquer plano de soberania com múltiplas jurisdições.' },
              ].map((c) => (
                <Link key={c.to} to={c.to} className="group p-8 rounded-2xl transition-all hover:-translate-y-1" style={{ backgroundColor: 'rgba(244,237,228,0.06)', border: '1px solid rgba(232,168,107,0.18)' }}>
                  <h3 className="text-xl md:text-2xl font-black leading-tight mb-3" style={{ color: '#f4ede4' }}>{c.titulo}</h3>
                  <p className="text-base leading-relaxed font-light mb-5" style={{ color: 'rgba(244,237,228,0.75)' }}>{c.texto}</p>
                  <span className="inline-flex items-center gap-2 text-sm font-bold tracking-wider uppercase transition-transform group-hover:translate-x-1" style={{ color: '#e8a86b' }}>
                    Acessar <ArrowRight size={16} />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
