import { useEffect, useState } from 'react';
import RegraZeroMobilidade from '@/components/RegraZeroMobilidade';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Globe2, Plane, Scale, Banknote, Clock, ShieldCheck, AlertTriangle,
  ArrowRight, ChevronDown, FileSignature, Compass, MapPin
} from 'lucide-react';
import SeoHead from '@/components/SeoHead';
import BackToHome from '@/components/BackToHome';
import FixedThematicBackground from '@/components/backgrounds/FixedThematicBackground';
import CinematicHero from '@/components/CinematicHero';
import heroImg from '@/assets/saida/passaporte-hero.webp';
import imgNaturalizacao from '@/assets/saida/passaporte-naturalizacao.webp';
import imgInvestimento from '@/assets/saida/passaporte-investimento.webp';

const APPLE_EASE = [0.22, 1, 0.36, 1] as const;
const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.7, ease: APPLE_EASE, delay },
});

// ────────── DADOS ──────────

interface Rota {
  nome: string;
  via: string;
  prazoMin: string;
  custoMin: string;
  custoMax: string;
  passaporte: string;
  forca: string;
  observacao: string;
}

const ROTAS: Rota[] = [
  {
    nome: 'Itália',
    via: 'Jus Sanguinis (descendência)',
    prazoMin: '24 a 60 meses',
    custoMin: 'R$ 8 mil',
    custoMax: 'R$ 60 mil',
    passaporte: 'Italiano (UE)',
    forca: '189 países (top 3)',
    observacao: 'Reconhecimento por bisavô ou trisavô. Filas judiciais longas, mas sem renúncia ao Brasil.',
  },
  {
    nome: 'Portugal',
    via: 'Residência por 5 anos + naturalização',
    prazoMin: '60 a 84 meses',
    custoMin: 'R$ 25 mil',
    custoMax: 'R$ 200 mil',
    passaporte: 'Português (UE)',
    forca: '188 países',
    observacao: 'Visto D7 (renda passiva), D8 (nômade digital) ou D2 (empreendedor). CPLP acelera para 3 anos.',
  },
  {
    nome: 'Paraguai',
    via: 'Residência permanente + naturalização',
    prazoMin: '36 meses',
    custoMin: 'R$ 35 mil',
    custoMax: 'R$ 80 mil',
    passaporte: 'Paraguaio',
    forca: '147 países',
    observacao: 'Mais barato da América do Sul. Permite dupla nacionalidade com Brasil. Imposto territorial.',
  },
  {
    nome: 'Uruguai',
    via: 'Residência fiscal + naturalização',
    prazoMin: '36 a 60 meses',
    custoMin: 'R$ 60 mil',
    custoMax: 'R$ 250 mil',
    passaporte: 'Uruguaio',
    forca: '156 países',
    observacao: 'Estabilidade política, regime fiscal favorável a estrangeiros, sem CFC.',
  },
  {
    nome: 'Granada',
    via: 'Cidadania por investimento (CBI)',
    prazoMin: '4 a 8 meses',
    custoMin: 'USD 235 mil',
    custoMax: 'USD 350 mil+',
    passaporte: 'Granadino',
    forca: '146 países + visto E-2 EUA',
    observacao: 'Único CBI do Caribe com tratado E-2 com os EUA. Doação não reembolsável ou imóvel aprovado.',
  },
  {
    nome: 'Saint Kitts & Nevis',
    via: 'Cidadania por investimento (CBI)',
    prazoMin: '4 a 6 meses',
    custoMin: 'USD 250 mil',
    custoMax: 'USD 400 mil+',
    passaporte: 'Kittitiano',
    forca: '157 países',
    observacao: 'O programa CBI mais antigo do mundo (1984). Sem imposto sobre renda mundial.',
  },
  {
    nome: 'Vanuatu',
    via: 'Cidadania por investimento expressa',
    prazoMin: '1 a 4 meses',
    custoMin: 'USD 130 mil',
    custoMax: 'USD 180 mil',
    passaporte: 'Vanuatuense',
    forca: '94 países',
    observacao: 'A naturalização mais rápida do planeta. Acesso reduzido após pressão UE/Schengen, ainda útil como segundo documento.',
  },
  {
    nome: 'Argentina',
    via: 'Residência permanente + 2 anos',
    prazoMin: '24 a 36 meses',
    custoMin: 'R$ 5 mil',
    custoMax: 'R$ 30 mil',
    passaporte: 'Argentino',
    forca: '171 países',
    observacao: 'Naturalização rápida via vínculo de moradia. Inflação alta, mas excelente passaporte de saída.',
  },
];

const VIAS = [
  {
    icon: Globe2,
    titulo: 'Por descendência',
    subtitulo: 'Jus Sanguinis',
    descricao: 'Você não pede, você reivindica. Itália, Portugal, Espanha, Alemanha, Polônia e Israel reconhecem o sangue. Documente bisavós, traduza certidões juramentadas, monte processo administrativo ou judicial. Custo baixo, prazo médio, sem renúncia.',
    quando: 'Quando há antepassado europeu documentável até 4 gerações.',
  },
  {
    icon: MapPin,
    titulo: 'Por residência',
    subtitulo: 'Naturalização ordinária',
    descricao: 'Você muda fisicamente, declara residência, paga impostos locais e cumpre o prazo de carência (3 a 10 anos). É o caminho da maioria. Exige presença real, não apenas papel. Países latinos (Paraguai, Uruguai, Argentina) e CPLP (Portugal) são os mais acessíveis.',
    quando: 'Quando você quer construir vida nova e o passaporte vem como consequência.',
  },
  {
    icon: Banknote,
    titulo: 'Por investimento',
    subtitulo: 'Citizenship by Investment',
    descricao: 'Programas oficiais que trocam capital por nacionalidade. Caribe (Granada, St. Kitts, Dominica) opera por doação ou imóvel aprovado. Malta exige doação alta + residência simulada. Turquia aceita imóvel a partir de USD 400 mil. Rápido, caro, e sob escrutínio crescente.',
    quando: 'Quando você precisa de velocidade e tem capital alocável (USD 130k a 1M).',
  },
  {
    icon: FileSignature,
    titulo: 'Por casamento',
    subtitulo: 'Vínculo conjugal',
    descricao: 'Casamento legal com cidadão local reduz o prazo de naturalização em quase todos os países (1 a 5 anos). Não é atalho mágico: governos investigam fraudes. Funciona quando há relacionamento real e residência conjunta documentada.',
    quando: 'Quando o vínculo já existe e a estratégia é otimizar prazo, não criá-lo do zero.',
  },
];

const ARMADILHAS = [
  {
    titulo: 'Achar que cidadania = residência fiscal',
    detalhe: 'Ter passaporte português não tira você do fisco brasileiro. Continua devendo IR mundial. A blindagem fiscal exige Declaração de Saída Definitiva e mudança de domicílio fiscal, processo separado.',
  },
  {
    titulo: 'Comprar imóvel achando que dá cidadania',
    detalhe: 'Em programas CBI, só imóveis aprovados pelo governo (lista oficial) contam. Comprar apartamento qualquer em Lisboa, Atenas ou Istambul não te dá nacionalidade automática.',
  },
  {
    titulo: 'Despachantes que prometem 6 meses por R$ 5 mil',
    detalhe: 'Naturalização decente custa caro porque envolve advogado, traduções juramentadas, apostilamento, viagens e taxas governamentais. Quem promete barato e rápido está mentindo ou cometendo fraude.',
  },
  {
    titulo: 'Não checar o tratado de bitributação',
    detalhe: 'Sem tratado, você pode pagar imposto duas vezes, no Brasil e no novo país. Brasil tem tratados com Portugal, Espanha, Argentina, Itália, mas não com vários paraísos fiscais.',
  },
  {
    titulo: 'Acreditar em ranking de "passaporte mais forte"',
    detalhe: 'Henley Index mede acesso visa-free, não soberania. Um passaporte caribenho com visto E-2 para os EUA pode valer mais que um passaporte europeu para sua estratégia específica.',
  },
  {
    titulo: 'Renunciar à cidadania brasileira sem necessidade',
    detalhe: 'Brasil aceita dupla nacionalidade na maioria dos casos. Renunciar voluntariamente é processo irreversível e raramente necessário. Estude antes.',
  },
];

const FAQ = [
  {
    q: 'Quanto custa um segundo passaporte de verdade?',
    a: 'Depende da via. Por descendência italiana via consulado, R$ 8 mil a R$ 20 mil incluindo traduções e taxas. Por residência em Portugal, somando 5 anos de visto D7, custos de vida e advogado, entre R$ 80 mil e R$ 250 mil. Por investimento no Caribe, USD 235 mil de doação não reembolsável (Granada) até USD 1 milhão (Malta). Quem promete menos está vendendo ilusão.',
  },
  {
    q: 'Em quanto tempo eu consigo o segundo passaporte?',
    a: 'Vanuatu entrega em 1 a 4 meses, Granada e St. Kitts em 4 a 8 meses, Paraguai em 36 meses, Itália via judicial entre 24 e 60 meses, Portugal pelo caminho clássico 60 a 84 meses. Não existe naturalização ordinária honesta abaixo de 24 meses.',
  },
  {
    q: 'Preciso renunciar à cidadania brasileira?',
    a: 'Não. A Constituição Federal de 1988, art. 12, §4º, permite dupla cidadania brasileira em casos como reconhecimento de outra nacionalidade originária ou imposição estrangeira como condição de permanência. Quase todos os países da lista aceitam dupla nacionalidade. Renúncia só é cogitada em casos extremos de planejamento patrimonial.',
  },
  {
    q: 'Cidadania por investimento (CBI) ainda funciona em 2026?',
    a: 'Funciona, mas com pressão crescente da União Europeia. Malta perdeu o programa em 2025, Bulgária encerrou, Chipre suspendeu. O Caribe (Granada, St. Kitts, Antígua, Dominica, Santa Lúcia) segue ativo, com due diligence reforçada. Vanuatu sofreu corte parcial do acesso Schengen. Tendência: ficar mais caro, mais lento e mais escrutinado.',
  },
  {
    q: 'Qual passaporte combina melhor com Bitcoin?',
    a: 'Nenhum passaporte protege Bitcoin diretamente. Bitcoin é protegido por chave privada e jurisdição operacional. O que o passaporte faz é dar mobilidade física para você acessar exchanges, abrir contas e residir em países com regras claras (El Salvador, Suíça, Singapura, Portugal pré-2024). Caribe + Paraguai é combinação clássica para Bitcoiner: rápido e fiscalmente neutro.',
  },
  {
    q: 'O Estado pode tomar meu segundo passaporte?',
    a: 'Pode, em três cenários: fraude documental comprovada, condenação criminal com pena de extradição, ou alteração legislativa retroativa (raro, mas Malta fez em 2025). Por isso o princípio da diversificação: dois ou três passaportes diferentes, em jurisdições não correlacionadas, são mais resilientes que um só.',
  },
  {
    q: 'Vale a pena começar pelo Paraguai?',
    a: 'Sim, para perfis com baixo capital e urgência relativa. Paraguai exige residência permanente (R$ 35 mil aproximados) e 3 anos de presença efetiva para naturalização. O passaporte paraguaio acessa 147 países sem visto, a tributação é territorial e a vizinhança facilita visitas ao Brasil. É o melhor custo-benefício do hemisfério sul.',
  },
  {
    q: 'Como começar agora sem cair em fraude?',
    a: 'Três passos: (1) Levante sua árvore genealógica nos próximos 30 dias para checar descendência elegível. (2) Abra conta internacional para registrar capital fora do Brasil legalmente, ver hub de Soberania Financeira. (3) Contrate apenas advogado credenciado na ordem do país-alvo (OAB Itália, OA Portugal, etc.), nunca despachante intermediário sem registro.',
  },
];

// ────────── COMPONENTE ──────────

export default function SegundoPassaporte() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <>
      <SeoHead
        path="/saida/segundo-passaporte"
        custom={{
          title: 'Segundo Passaporte: O Guia Brutal de Cidadania (2026)',
          description: 'Como obter um segundo passaporte: descendência, residência, investimento. Comparação real de Itália, Portugal, Paraguai, Granada e Vanuatu. Custos, prazos, armadilhas.',
          canonical: 'https://lordjunnior.com.br/saida/segundo-passaporte',
          primaryKeyword: 'segundo passaporte',
          lsiKeywords: ['cidadania por investimento', 'naturalização', 'dupla cidadania', 'passaporte português', 'cidadania italiana', 'jus sanguinis', 'CBI Caribe', 'passaporte paraguaio'],
          longTailKeywords: ['como tirar segundo passaporte 2026', 'cidadania por descendência italiana', 'qual passaporte mais barato', 'residência permanente paraguai', 'cidadania por investimento granada'],
          breadcrumbs: [
            { name: 'Início', url: '/' },
            { name: 'Saída & Infraestrutura', url: '/saida' },
            { name: 'Segundo Passaporte', url: '/saida/segundo-passaporte' },
          ],
          schemaType: 'Article',
          articleSection: 'Saída & Infraestrutura',
          relatedPages: ['/saida', '/teoria-das-bandeiras', '/soberania-financeira', '/palau-digital-residency'],
        }}
        faqItems={FAQ.map((f) => ({ question: f.q, answer: f.a }))}
      />

      <FixedThematicBackground image={heroImg} intensity="heavy" />

      <div className="relative z-20 px-6 md:px-12 lg:px-20 pt-[52px]">
        <BackToHome />
      </div>

      <div className="min-h-screen text-stone-100 relative z-10">
        {/* HERO */}
        <CinematicHero
          image={heroImg}
          phase="Saída · Bandeira 01"
          title={
            <>
              Segundo passaporte:{' '}
              <span className="italic font-serif text-amber-400 font-light tracking-tight">a primeira bandeira</span>
            </>
          }
          subtitle="Um passaporte é dependência. Dois é redundância. Três é soberania de mobilidade. O guia brutal de como sair do cabresto de um único Estado, com custos reais, prazos honestos e as armadilhas que ninguém te conta."
          icon={Globe2}
          accentColor="amber"
          backLink="/saida"
          backLabel="Saída & Infraestrutura"
        />

        <div className="px-5 md:px-8">
          <RegraZeroMobilidade theme="dark" />
        </div>

        {/* CAPÍTULO 1 — POR QUE */}
        <section className="relative max-w-5xl mx-auto px-5 md:px-8 py-24 md:py-32">
          <motion.div {...fade(0)}>
            <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-amber-400 font-bold block mb-5">Capítulo 01</span>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-stone-100 mb-8 leading-[0.92]" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
              O passaporte único é{' '}
              <span className="italic font-serif text-amber-400 font-light normal-case tracking-tight">uma coleira.</span>
            </h2>
            <div className="space-y-6 text-stone-300 text-lg leading-relaxed font-light max-w-3xl">
              <p>
                Você nasceu brasileiro. Não escolheu. Foi designado. E enquanto carregar apenas esse documento, o Estado brasileiro tem três alavancas sobre você: pode confiscar seu patrimônio, restringir sua saída e bloquear seu acesso a contas internacionais. Já viu acontecer em 1990. Pode acontecer de novo.
              </p>
              <p>
                Segundo passaporte não é luxo. É a primeira de cinco bandeiras da Teoria das Bandeiras que separa o cidadão soberano do servo administrativo. É o que permite, no momento em que precisar, embarcar em outro voo, abrir outra conta, residir em outro país e responder a outro fisco.
              </p>
              <p className="text-stone-100 italic font-serif text-xl border-l-2 border-amber-500/40 pl-6">
                Quem tem dois passaportes negocia. Quem tem um obedece.
              </p>
            </div>
          </motion.div>
        </section>

        {/* CAPÍTULO 2 — VIAS */}
        <section className="relative max-w-7xl mx-auto px-5 md:px-8 py-24">
          <motion.div {...fade(0)} className="text-center mb-16">
            <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-amber-400 font-bold block mb-4">Capítulo 02</span>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-stone-100 leading-[0.92]" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
              As quatro vias{' '}
              <span className="italic font-serif text-amber-400 font-light normal-case tracking-tight">de entrada.</span>
            </h2>
            <p className="text-stone-400 max-w-2xl mx-auto mt-5 text-base leading-relaxed font-light">
              Não existe atalho fora destas quatro portas. Quem te oferece outro caminho está vendendo crime ou ilusão.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-5">
            {VIAS.map((via, i) => (
              <motion.div
                key={via.titulo}
                {...fade(i * 0.05)}
                className="group relative overflow-hidden rounded-sm border border-amber-500/15 bg-stone-950/60 p-7 md:p-9 transition-all duration-500 hover:-translate-y-1 hover:border-amber-500/35 hover:shadow-xl hover:shadow-amber-500/10"
              >
                <span aria-hidden className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-amber-400 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-center" />
                <div className="flex items-start gap-4 mb-5">
                  <div className="p-3 rounded bg-amber-500/[0.08] border border-amber-500/20">
                    <via.icon size={22} className="text-amber-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-2xl font-black uppercase tracking-tight text-stone-100 leading-tight" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                      {via.titulo}
                    </h3>
                    <span className="text-[10px] font-mono text-amber-400/80 uppercase tracking-[0.25em]">{via.subtitulo}</span>
                  </div>
                </div>
                <p className="text-stone-300 text-sm leading-relaxed font-light mb-5">{via.descricao}</p>
                <div className="pt-4 border-t border-stone-800">
                  <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-stone-500 mb-1.5">Quando faz sentido</p>
                  <p className="text-stone-400 text-xs italic leading-relaxed">{via.quando}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* IMAGEM INTERMEDIÁRIA — naturalização */}
        <section className="relative max-w-7xl mx-auto px-5 md:px-8 py-12">
          <motion.figure {...fade(0)} className="relative rounded-sm overflow-hidden h-[480px] md:h-[620px] border border-stone-900">
            <img
              src={imgNaturalizacao}
              alt="Passaporte português aberto sobre escrivaninha de couro com caneta-tinteiro e árvore genealógica em sépia, representando reconhecimento de cidadania por descendência."
              loading="lazy"
              width={1920}
              height={1080}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, transparent 0%, rgba(5,8,8,0.2) 50%, rgba(5,8,8,0.92) 100%)' }} />
            <figcaption className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
              <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-amber-400 font-bold block mb-2">Reconstrução documental</span>
              <p className="text-stone-100 text-2xl md:text-4xl font-black uppercase tracking-tight italic max-w-2xl leading-tight" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                Antes do passaporte vem a árvore. Documente bisavós antes de sonhar com cidadania europeia.
              </p>
            </figcaption>
          </motion.figure>
        </section>

        {/* CAPÍTULO 3 — ROTAS COMPARADAS */}
        <section className="relative max-w-7xl mx-auto px-5 md:px-8 py-24 md:py-32">
          <motion.div {...fade(0)} className="mb-16">
            <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-amber-400 font-bold block mb-4">Capítulo 03</span>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-stone-100 leading-[0.92] mb-5" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
              Oito rotas reais,{' '}
              <span className="italic font-serif text-amber-400 font-light normal-case tracking-tight">comparadas sem hipocrisia.</span>
            </h2>
            <p className="text-stone-400 max-w-3xl text-base leading-relaxed font-light">
              Custos médios de mercado em 2026 incluindo advogado, traduções, taxas e doação ou investimento mínimo. Não inclui custo de vida durante a residência.
            </p>
          </motion.div>

          <div className="space-y-4">
            {ROTAS.map((rota, i) => (
              <motion.div
                key={rota.nome}
                {...fade(i * 0.04)}
                className="group rounded-sm border border-stone-800 bg-stone-950/60 p-6 md:p-8 hover:border-amber-500/30 hover:bg-stone-950/80 transition-all duration-500"
              >
                <div className="grid md:grid-cols-12 gap-5 md:gap-8 items-start">
                  <div className="md:col-span-3">
                    <div className="flex items-center gap-3 mb-2">
                      <Plane size={18} className="text-amber-400" />
                      <h3 className="text-3xl font-black uppercase tracking-tight text-stone-100 leading-none" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                        {rota.nome}
                      </h3>
                    </div>
                    <p className="text-[11px] font-mono uppercase tracking-[0.25em] text-amber-400/80">{rota.via}</p>
                  </div>
                  <div className="md:col-span-3 grid grid-cols-2 md:block gap-3">
                    <div className="md:mb-3">
                      <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-stone-500 mb-1">Prazo</p>
                      <p className="text-stone-100 text-sm font-semibold">{rota.prazoMin}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-stone-500 mb-1">Custo</p>
                      <p className="text-stone-100 text-sm font-semibold">{rota.custoMin} a {rota.custoMax}</p>
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-stone-500 mb-1">Passaporte</p>
                    <p className="text-stone-100 text-sm font-semibold">{rota.passaporte}</p>
                    <p className="text-stone-500 text-[11px] mt-1">{rota.forca}</p>
                  </div>
                  <div className="md:col-span-4">
                    <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-stone-500 mb-1">Observação tática</p>
                    <p className="text-stone-300 text-sm leading-relaxed font-light">{rota.observacao}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* IMAGEM INTERMEDIÁRIA — investimento */}
        <section className="relative max-w-7xl mx-auto px-5 md:px-8 py-12">
          <motion.figure {...fade(0)} className="relative rounded-sm overflow-hidden h-[440px] md:h-[560px] border border-stone-900">
            <img
              src={imgInvestimento}
              alt="Barras de ouro empilhadas ao lado de passaporte, hardware wallet e maço de notas de cem dólares sobre ardósia escura, representando capital alocado para cidadania por investimento."
              loading="lazy"
              width={1920}
              height={1080}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, transparent 0%, rgba(5,8,8,0.25) 55%, rgba(5,8,8,0.92) 100%)' }} />
            <figcaption className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
              <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-amber-400 font-bold block mb-2">Capital como atalho</span>
              <p className="text-stone-100 text-2xl md:text-4xl font-black uppercase tracking-tight italic max-w-2xl leading-tight" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                CBI compra velocidade, não dignidade. Use só se o tempo vale mais que o capital.
              </p>
            </figcaption>
          </motion.figure>
        </section>

        {/* CAPÍTULO 4 — TIMELINE */}
        <section className="relative max-w-5xl mx-auto px-5 md:px-8 py-24 md:py-32">
          <motion.div {...fade(0)} className="mb-14">
            <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-amber-400 font-bold block mb-4">Capítulo 04</span>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-stone-100 leading-[0.92]" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
              A linha do tempo{' '}
              <span className="italic font-serif text-amber-400 font-light normal-case tracking-tight">honesta.</span>
            </h2>
            <p className="text-stone-400 max-w-3xl text-base leading-relaxed font-light mt-4">
              Operação realista do início ao passaporte na mão, considerando rota mais comum (residência em país latino). Adapte conforme via escolhida.
            </p>
          </motion.div>

          <div className="relative pl-10 border-l border-amber-500/25 space-y-10">
            {[
              { mes: 'Mês 0', titulo: 'Decisão e árvore genealógica', desc: 'Levante certidões de nascimento dos pais, avós e bisavós. Identifique se há descendência elegível em UE ou Israel. Em paralelo, escolha 2 países-alvo plausíveis e estude requisitos oficiais.' },
              { mes: 'Mês 1 a 3', titulo: 'Preparação documental', desc: 'Apostilamento de certidões (Convenção de Haia), tradução juramentada, antecedentes criminais federais e estaduais, comprovante de renda. Custo médio R$ 4 mil a R$ 12 mil só nesta fase.' },
              { mes: 'Mês 3 a 6', titulo: 'Visto de residência', desc: 'Solicitação no consulado do país-alvo. Para Portugal D7 ou D8, comprovação de renda passiva mínima. Para Paraguai, depósito de cortesia em conta local. Para Itália, agendamento consular pode levar 12 a 24 meses só para abrir.' },
              { mes: 'Mês 6 a 12', titulo: 'Mudança e estabelecimento', desc: 'Aluguel, conta bancária local, registro de residência (NIF em Portugal, RUT no Uruguai, cédula de identidad no Paraguai). Comece a contar o tempo de residência efetiva.' },
              { mes: 'Ano 2 a 5', titulo: 'Acúmulo de tempo de residência', desc: 'Renove vistos, mantenha presença física conforme exige cada país (geralmente 183 dias/ano), pague impostos locais. Esta fase não tem atalho. É a prova de vida que o Estado quer ver.' },
              { mes: 'Ano 3 a 7', titulo: 'Pedido de naturalização', desc: 'Quando bater o prazo legal (Paraguai 3 anos, Portugal 5 anos, Uruguai 3 a 5, Itália 10 anos via residência), submete o pedido com prova de integração: idioma, residência, renda, antecedentes limpos.' },
              { mes: 'Ano 4 a 8', titulo: 'Passaporte na mão', desc: 'Após análise (6 a 24 meses dependendo do país), juramento ou cerimônia, emissão do passaporte. Agora você tem dois. Mude para a próxima bandeira (residência fiscal, estrutura empresarial, ativos).' },
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
              <span className="italic font-serif text-red-400 font-light normal-case tracking-tight">que destroem orçamentos.</span>
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
              <span className="italic font-serif text-amber-400 font-light normal-case tracking-tight">execução em 30 dias.</span>
            </h2>

            <div className="space-y-4">
              {[
                'Levantar certidões de nascimento, casamento e óbito de pais, avós e bisavós (cartórios brasileiros).',
                'Mapear se há descendência italiana, portuguesa, espanhola, alemã, polonesa, judaica ou libanesa elegível.',
                'Listar 2 países-alvo plausíveis pela combinação custo-prazo-mobilidade (use a tabela do Capítulo 03).',
                'Solicitar antecedentes criminais federais (Polícia Federal) e estaduais. Validade 90 dias.',
                'Apostilar pelo menos as certidões de nascimento via Convenção de Haia em cartório autorizado.',
                'Orçar com 3 advogados independentes credenciados na ordem do país-alvo. Fugir de despachante intermediário.',
                'Abrir conta internacional para começar a deslocar capital legalmente (ver hub de Soberania Financeira).',
                'Reservar entre R$ 15 mil e R$ 80 mil para a primeira fase, dependendo da via escolhida.',
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
              <span className="italic font-serif text-amber-400 font-light normal-case tracking-tight">que ninguém quer responder.</span>
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
              Um passaporte é destino. Dois é escolha. Três é poder de barganha contra qualquer Estado.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link
                to="/teoria-das-bandeiras"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-sm bg-amber-500 text-stone-950 font-bold text-sm uppercase tracking-[0.2em] hover:bg-amber-400 transition-colors"
              >
                Próxima Bandeira <ArrowRight size={14} />
              </Link>
              <Link
                to="/saida"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-sm border border-stone-700 text-stone-200 font-bold text-sm uppercase tracking-[0.2em] hover:border-amber-500/40 hover:text-amber-400 transition-colors"
              >
                Voltar à Saída
              </Link>
            </div>
          </motion.div>
        </section>
      </div>
    </>
  );
}