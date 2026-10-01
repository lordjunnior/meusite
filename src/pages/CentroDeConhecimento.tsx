import { useEffect } from 'react';
import { Library, BookOpen, Compass, Wrench, Search, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SeoHead from '@/components/SeoHead';
import BackToHome from '@/components/BackToHome';
import { Button } from '@/components/ui/button';
import { Hero, Heading, Backdrop, Figure, Veredito, FaqSection, TrailSection, reveal } from '@/components/seguranca-mobile/EditorialKit';
import heroAsset from '@/assets/biblioteca-tecnica/hero-biblioteca-tecnica.jpg';
import livrosAsset from '@/assets/book-seis-licoes.webp';
import whitepaperAsset from '@/assets/book-whitepaper.webp';
import curadoriaAsset from '@/assets/biblioteca-tecnica/curadoria-fonte-primaria.jpg';
import pesquisaAsset from '@/assets/biblioteca-tecnica/pesquisa-verificacao.jpg';
import kitsAsset from '@/assets/biblioteca-tecnica/kits-autonomia.jpg';

type Area = {
  icon: typeof BookOpen;
  label: string;
  title: string;
  desc: string;
  asset: string;
  alt: string;
  links: { to: string; label: string }[];
};

const AREAS: Area[] = [
  {
    icon: BookOpen, label: '01 / Conhecimento', title: 'Livros, PDFs e audiobooks',
    desc: 'O acervo de leitura longa. Obras que formaram a tese do site, do white paper de Satoshi às lições de economia austríaca, para ler no seu ritmo ou ouvir no deslocamento.',
    asset: livrosAsset, alt: 'Livro de economia aberto sobre uma mesa de madeira com luz lateral',
    links: [{ to: '/ebooks', label: 'E-books e PDFs' }, { to: '/audiobooks', label: 'Audiobooks' }, { to: '/dicionario-cripto', label: 'Alfabeto Cripto' }],
  },
  {
    icon: Compass, label: '02 / Guias', title: 'Trilhas escritas para agir',
    desc: 'Os textos do site organizados como caminho, não como pilha. Cada guia diz por onde começar, o que fazer agora e qual é o passo seguinte.',
    asset: whitepaperAsset, alt: 'Documento impresso do white paper do Bitcoin com anotações à margem',
    links: [{ to: '/educacao', label: 'Hub Educação' }, { to: '/por-onde-comecar', label: 'Por Onde Começar' }, { to: '/mapa-da-soberania', label: 'Mapa da Soberania' }],
  },
  {
    icon: Wrench, label: '03 / Recursos', title: 'Ferramentas conferidas',
    desc: 'Softwares e utilitários testados ou checados na fonte oficial, com status editorial e data da última conferência. Nada entra porque está na moda.',
    asset: kitsAsset, alt: 'Ferramentas de hardware e cabos organizados sobre bancada de trabalho',
    links: [{ to: '/biblioteca-tecnica', label: 'Biblioteca Técnica' }, { to: '/ferramentas', label: 'Ferramentas' }, { to: '/recursos-e-ferramentas', label: 'Arsenal' }],
  },
  {
    icon: Search, label: '04 / Pesquisa', title: 'Fontes e método de checagem',
    desc: 'Como verificar uma informação antes de agir sobre ela: fonte primária, data, quem publicou e com qual interesse. A habilidade que protege todas as outras.',
    asset: pesquisaAsset, alt: 'Pessoa conferindo documentos e anotações com lupa sobre a mesa',
    links: [{ to: '/biblioteca-tecnica', label: 'Curadoria por fonte primária' }, { to: '/indice-da-soberania', label: 'Índice do Despertar' }],
  },
];

const FAQ = [
  { q: 'O que é o Centro de Conhecimento?', a: 'É a porta de entrada para todo o acervo do site, dividido em quatro áreas: Conhecimento (livros, PDFs e audiobooks), Guias (os textos organizados em trilhas), Recursos (ferramentas conferidas) e Pesquisa (fontes e método de checagem).' },
  { q: 'Por onde eu começo se nunca li nada sobre o assunto?', a: 'Comece pela área Guias, na página Por Onde Começar. Ela ordena a leitura por nível, para você não cair em um texto avançado antes da base.' },
  { q: 'As ferramentas indicadas são patrocinadas?', a: 'A Biblioteca Técnica não aceita pagamento para listar ferramentas. Cada recurso entra após conferência na fonte oficial do projeto e recebe status e data da última revisão. Quando existe link de parceria em outra parte do site, ele é sinalizado.' },
  { q: 'Os livros e PDFs são gratuitos?', a: 'Parte do acervo é de livre distribuição, como o white paper do Bitcoin. Cada obra indica o formato e a origem na própria página de e-books ou audiobooks.' },
];

export default function CentroDeConhecimento() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <>
      <SeoHead custom={{
        title: 'Centro de Conhecimento: guias, livros e ferramentas de soberania',
        description: 'O acervo organizado do site em quatro áreas: livros e audiobooks, guias em trilha, ferramentas conferidas na fonte e método de pesquisa para checar o que você lê.',
        canonical: 'https://lordjunnior.com.br/centro-de-conhecimento',
        primaryKeyword: 'centro de conhecimento soberania',
        lsiKeywords: ['biblioteca bitcoin', 'livros sobre bitcoin', 'guias de privacidade', 'ferramentas de segurança digital', 'educação financeira soberana'],
        longTailKeywords: ['onde aprender sobre bitcoin e privacidade', 'livros para entender bitcoin', 'como checar fontes de informação'],
        breadcrumbs: [{ name: 'Início', url: '/' }, { name: 'Centro de Conhecimento', url: '/centro-de-conhecimento' }],
        schemaType: 'Article', articleSection: 'Centro de Conhecimento', relatedPages: ['/biblioteca-tecnica', '/educacao', '/ebooks', '/audiobooks'],
      }} faqItems={FAQ.map(({ q, a }) => ({ question: q, answer: a }))} />

      <main className="smx-page min-h-screen">
        <div className="absolute inset-x-0 top-0 z-30 px-6 pt-[52px] md:px-12 lg:px-20"><BackToHome /></div>
        <Hero asset={heroAsset} heroAlt="Estantes de biblioteca com livros e documentos sob luz quente" eyebrow="Acervo" category="Centro de Conhecimento" icon={Library} title="Tudo que Você Precisa Saber, num Só Lugar" lede="Quem entende não depende. Quatro áreas para ler, agir, equipar e checar, na ordem certa." />

        <section className="relative isolate overflow-hidden px-6 py-24 md:px-12 md:py-32 lg:px-20">
          <Backdrop asset={curadoriaAsset} alt="Mesa com documentos de fonte primária" light />
          <div className="mx-auto grid max-w-[1600px] gap-12 lg:grid-cols-12 lg:gap-20">
            <motion.aside {...reveal()} className="min-w-0 lg:col-span-3">
              <div className="sticky top-24"><span className="smx-copper text-xs font-bold uppercase tracking-[0.3em]">00 / Por que existe</span><div className="smx-rule mt-5 h-0.5 w-16" /></div>
            </motion.aside>
            <motion.div {...reveal(.08)} className="min-w-0 text-lg leading-[1.75] md:text-xl lg:col-span-9">
              <p>Um site com mais de duzentas páginas vira labirinto quando cresce sem mapa. Este centro existe para você saber, em segundos, onde está cada tipo de material e o que ler primeiro.</p>
              <p className="mt-7">Cada área tem uma função clara. Conhecimento forma a base. Guias transformam a base em ação. Recursos dão as ferramentas. Pesquisa ensina a desconfiar do que não tem fonte, inclusive deste site.</p>
            </motion.div>
          </div>
        </section>

        {AREAS.map((area, i) => {
          const Icon = area.icon;
          return (
            <section key={area.label} className="relative isolate overflow-hidden px-6 py-20 md:px-12 md:py-28 lg:px-20">
              <div className={`mx-auto grid max-w-[1600px] items-center gap-10 lg:grid-cols-2 lg:gap-16 ${i % 2 ? 'lg:[&>*:first-child]:order-2' : ''}`}>
                <Figure asset={area.asset} alt={area.alt} caption={area.title} />
                <motion.div {...reveal(.06)} className="min-w-0">
                  <Heading chapter={area.label}>{area.title}</Heading>
                  <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full border border-current/20"><Icon className="h-6 w-6" aria-hidden /></div>
                  <p className="text-lg leading-[1.75]">{area.desc}</p>
                  <ul className="mt-8 flex flex-wrap gap-3">
                    {area.links.map((l) => (
                      <li key={l.to + l.label}>
                        <Link to={l.to} className="smx-card smx-focus inline-flex min-h-[44px] items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold transition-transform hover:-translate-y-0.5">
                          {l.label} <ArrowRight className="h-4 w-4" aria-hidden />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </div>
            </section>
          );
        })}

        <FaqSection asset={curadoriaAsset} alt="Documentos de fonte primária organizados" faq={FAQ} />
        <Veredito headline={<>Leia na ordem. <span className="smx-editorial">Aja com fonte.</span></>} paragraphs={['Conhecimento sem método vira opinião. Ferramenta sem base vira risco. O centro existe para você não pular etapas.', 'Se está chegando agora, comece pelo guia de entrada e volte aqui sempre que precisar do próximo passo.']} />
        <TrailSection chapter="Próximo passo" cards={[
          { to: '/por-onde-comecar', title: 'Por Onde Começar', desc: 'A leitura de entrada, ordenada por nível.', icon: Compass },
          { to: '/biblioteca-tecnica', title: 'Biblioteca Técnica', desc: 'Ferramentas conferidas na fonte oficial.', icon: Wrench },
          { to: '/ebooks', title: 'E-books e PDFs', desc: 'O acervo de leitura longa.', icon: BookOpen },
        ]} />
        <div className="px-6 pb-24 text-center">
          <Button asChild className="smx-btn min-h-[44px]"><Link to="/por-onde-comecar">Começar pela base</Link></Button>
        </div>
      </main>
    </>
  );
}
