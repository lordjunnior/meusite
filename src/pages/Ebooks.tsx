import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowLeft, BookOpen, Download, ShieldCheck, Lock, ExternalLink, Sparkles } from 'lucide-react';

import coverWhitepaper from '@/assets/cover-whitepaper-btc.jpg';
import coverRedpill from '@/assets/cover-redpill-btc.jpg';
import coverProgramadores from '@/assets/cover-btc-programadores.jpg';
import coverMoedaDigital from '@/assets/cover-moeda-digital.jpg';
import coverSeisLicoes from '@/assets/cover-seis-licoes.jpg';
import coverFimBc from '@/assets/cover-fim-banco-central.jpg';
import coverDeusFalhou from '@/assets/cover-deus-falhou.jpg';
import coverEconomiaIndividuo from '@/assets/cover-economia-individuo.jpg';
import coverEconomiaHistoria from '@/assets/cover-economia-historia.jpg';
import coverPaiRico from '@/assets/cover-pai-rico-pobre.jpg';
import coverSilencioQueda from '@/assets/cover-silencio-queda.jpg';
import coverAutocustodia from '@/assets/autocustodiadeelite.jpg';
import coverMercadoParalelo from '@/assets/omercado-paralelo.jpg';
import coverValorBitcoin from '@/assets/cover-valor-bitcoin.jpg';
import coverGracasDeus from '@/assets/cover-gracas-deus-bitcoin.jpg';
import coverEconomia3 from '@/assets/cover-economia-3.jpg';
import coverEstadoNao from '@/assets/cover-estado-nao.jpg';
import coverCiclos from '@/assets/cover-ciclos.jpg';
import coverMisesEscola from '@/assets/cover-mises-escola.jpg';
import coverMasteringBtc from '@/assets/cover-mastering-bitcoin.jpg';
import coverInternetDinheiro from '@/assets/cover-internet-dinheiro.jpg';
import coverPadraoBtc from '@/assets/cover-padrao-bitcoin.jpg';
import coverMicroeconomia from '@/assets/cover-microeconomia.jpg';
import BackToHome from '@/components/BackToHome';

const APPLE_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const EBOOKS_DATA = [
  {
    category: "Engenharia Bitcoin",
    description: "Protocolos técnicos e a matemática da soberania digital.",
    books: [
      { title: "White Paper", author: "Satoshi Nakamoto", pdf: "/pdfs/bitcoin-whitepaper.pdf", cover: coverWhitepaper },
      { title: "Bitcoin Red Pill", author: "Renato Amoedo", pdf: "/pdfs/bitcoin-redpill.pdf", cover: coverRedpill },
      { title: "Bitcoin p/ Programadores", author: "Marco Agner", pdf: "/pdfs/bitcoin-programadores.pdf", cover: coverProgramadores },
      { title: "Moeda na Era Digital", author: "Fernando Ulrich", pdf: "/pdfs/bitcoin-moeda-digital.pdf", cover: coverMoedaDigital },
      { title: "O Valor do Bitcoin", author: "Diversos", pdf: "/pdfs/O_valor_do_Bitcoin.pdf", cover: coverValorBitcoin },
      { title: "Mastering Bitcoin", author: "Andreas Antonopoulos", pdf: "/pdfs/Mastering Bitcoin.pdf", cover: coverMasteringBtc },
      { title: "O Padrão Bitcoin", author: "Saifedean Ammous", pdf: "/pdfs/o_padrao_bitcoin_ediao_brasileira_a_alternativa_descentralizada.pdf", cover: coverPadraoBtc },
      { title: "A Internet do Dinheiro", author: "Andreas Antonopoulos", pdf: "/pdfs/a internet do dinheiro 2020 andreas antonopoulos.pdf", cover: coverInternetDinheiro },
      { title: "Graças a Deus pelo Bitcoin", author: "Derek Waltchack", pdf: "/pdfs/Graças a Deus pelo Bitcoin - Derek Waltchack.pdf", cover: coverGracasDeus },
    ]
  },
  {
    category: "Economia Austríaca",
    description: "A base teórica da liberdade econômica e do livre mercado.",
    books: [
      { title: "As Seis Lições", author: "Ludwig von Mises", pdf: "/pdfs/seis-licoes.pdf", cover: coverSeisLicoes },
      { title: "Fim do Banco Central", author: "Murray Rothbard", pdf: "/pdfs/fim-banco-central.pdf", cover: coverFimBc },
      { title: "Economia do Indivíduo", author: "Rodrigo Constantino", pdf: "/pdfs/economia-individuo.pdf", cover: coverEconomiaIndividuo },
      { title: "Economia e História", author: "Hans-Hermann Hoppe", pdf: "/pdfs/economia-historia.pdf", cover: coverEconomiaHistoria },
      { title: "Microeconomia", author: "Diversos", pdf: "/pdfs/microeconomia-compress.pdf", cover: coverMicroeconomia },
      { title: "Mises e a Escola Austríaca", author: "Ludwig von Mises", pdf: "/pdfs/Mises-e-a-Escola-Austriaca-–-uma-visao-pessoal.pdf", cover: coverMisesEscola },
      { title: "Moeda, Crédito e Ciclos", author: "Jesús Huerta de Soto", pdf: "/pdfs/Moeda-Credito-Bancario-e-Ciclos-Economicos.pdf", cover: coverCiclos },
    ]
  },
  {
    category: "Filosofia & Estado",
    description: "A crítica moral e filosófica ao poder estatal.",
    books: [
      { title: "Deus que Falhou", author: "Hans-Hermann Hoppe", pdf: "/pdfs/democracia-deus-falhou.pdf", cover: coverDeusFalhou },
      { title: "Estado? Não, Obrigado!", author: "Marcelo Werlang", pdf: "/pdfs/Estado-Nao-Obrigado-n45ol7.pdf", cover: coverEstadoNao },
      { title: "Educação Livre e Obrigatória", author: "Murray Rothbard", pdf: "/pdfs/Educacao-Livre-e-Obrigatoria-sypcgb.pdf" },
    ]
  },
  {
    category: "Inteligência Financeira",
    description: "Estratégias práticas para prosperar fora do sistema.",
    books: [
      { title: "Pai Rico, Pai Pobre", author: "Robert Kiyosaki", pdf: "/pdfs/pai-rico-pai-pobre.pdf", cover: coverPaiRico },
      { title: "Economia 3.0", author: "Diversos", pdf: "/pdfs/Economia-3.0-Do-escambo-ate-as-financas-descentralizadas-iznesy.pdf", cover: coverEconomia3 },
    ]
  }
];

const VITRINE_EBOOKS = [
  {
    title: "O SILÊNCIO DA QUEDA",
    description: "Descubra o que é o Bitcoin, por que ele é valioso e como a matemática garante a sua liberdade contra a inflação estatal.",
    cover: coverSilencioQueda,
    tags: ["E-book", "Gratuito"],
    available: true,
    btnText: "Resgatar E-book",
    route: "/silencio-queda",
  },
  {
    title: "Autocustódia de Elite",
    description: "Aprenda a ser seu próprio banco. Geração de chaves, cold storage e blindagem contra ataques de engenharia social.",
    cover: coverAutocustodia,
    tags: ["E-book", "Em Breve"],
    available: false,
    btnText: "Indisponível",
  },
  {
    title: "O Mercado Paralelo",
    description: "Como comprar e vender de forma privada, fugindo da vigilância corporativa e estatal usando as ferramentas corretas.",
    cover: coverMercadoParalelo,
    tags: ["E-book", "Em Breve"],
    available: false,
    btnText: "Indisponível",
  },
];

// Film Grain Overlay
const FilmGrain = () => (
  <div className="pointer-events-none fixed inset-0 z-50 opacity-[0.035]">
    <svg className="w-full h-full">
      <filter id="grain-ebooks">
        <feTurbulence baseFrequency="0.9" numOctaves="4" stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#grain-ebooks)" />
    </svg>
  </div>
);

// Dust Particles
const DustParticles = () => (
  <>
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-30">
      <div className="dust-layer" />
      <div className="dust-layer dust-layer-2" />
    </div>
    <style>{`
      @keyframes dustFloat {
        0% { transform: translateY(0) translateX(0) rotate(0deg); opacity: 0.2; }
        50% { transform: translateY(-400px) translateX(60px) rotate(180deg); opacity: 0.5; }
        100% { transform: translateY(-800px) translateX(120px) rotate(360deg); opacity: 0.1; }
      }
      .dust-layer {
        position: absolute; width: 100%; height: 200%;
        background-image:
          radial-gradient(1px 1px at 20% 30%, hsl(var(--foreground) / 0.3) 100%, transparent),
          radial-gradient(1px 1px at 40% 60%, hsl(var(--foreground) / 0.2) 100%, transparent),
          radial-gradient(1px 1px at 60% 20%, hsl(var(--destructive) / 0.25) 100%, transparent),
          radial-gradient(1px 1px at 80% 70%, hsl(var(--foreground) / 0.2) 100%, transparent);
        background-size: 200px 200px;
        animation: dustFloat 80s linear infinite;
      }
      .dust-layer-2 {
        background-size: 280px 280px;
        animation: dustFloat 110s linear infinite reverse;
        opacity: 0.4;
      }
    `}</style>
  </>
);

// Light Beams
const LightBeams = () => (
  <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
    <div 
      className="absolute -top-1/2 -right-1/4 w-full h-[200%] opacity-[0.02]"
      style={{ background: 'linear-gradient(125deg, transparent 40%, hsl(var(--destructive)) 50%, transparent 60%)' }}
    />
  </div>
);

const Ebooks: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, 150]);
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0.3]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className="relative z-20 px-6 md:px-12 lg:px-20 pt-[52px]">
        <BackToHome />
      </div>

      <Helmet>
        <title>Biblioteca Soberana | E-books e PDFs sobre Liberdade Financeira</title>
        <meta name="description" content="Acervo de e-books sobre Bitcoin, economia austríaca, filosofia libertária e inteligência financeira. Downloads gratuitos." />
      </Helmet>

      <div className="min-h-screen bg-[#050808] font-sans selection:bg-destructive selection:text-destructive-foreground relative overflow-hidden">
        <FilmGrain />
        <DustParticles />
        <LightBeams />

        {/* Cinematic Hero */}
        <motion.section 
          ref={heroRef}
          className="relative h-[70vh] min-h-[500px] flex items-end overflow-hidden"
          style={{ y: heroY, opacity: heroOpacity }}
        >
          <div className="absolute inset-0">
            <img 
              src="/heroes/biblioteca-soberana.webp" 
              alt="Biblioteca Soberana"
              className="w-full h-full object-cover brightness-[0.4] saturate-[0.85] scale-105" loading="lazy" decoding="async" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050808] via-[#050808]/60 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#050808]/80 via-transparent to-[#050808]/40" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pb-16 w-full">
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground text-xs uppercase tracking-[0.2em] mb-8 transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Retornar ao Comando
            </Link>

            <motion.div
              initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 1, ease: APPLE_EASE }}
            >
              <div className="flex items-center gap-3 mb-4">
                <BookOpen className="w-5 h-5 text-destructive" />
                <span className="text-destructive font-black text-[10px] uppercase tracking-[0.3em]">
                  Acervo Digital
                </span>
              </div>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-foreground tracking-tighter leading-[0.9] mb-4">
                BIBLIOTECA<br />
                <span className="text-destructive italic font-light">SOBERANA</span>
              </h1>
              <p className="text-muted-foreground text-lg md:text-xl max-w-xl font-medium">
                Conhecimento que liberta. E-books e PDFs sobre Bitcoin, economia e filosofia da liberdade.
              </p>
            </motion.div>
          </div>
        </motion.section>

        {/* Vitrine - E-books Exclusivos */}
        <section className="relative z-10 py-20 border-b border-border/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: APPLE_EASE }}
              className="mb-12"
            >
              <div className="flex items-center gap-3 mb-4">
                <Sparkles className="w-5 h-5 text-destructive" />
                <span className="text-destructive font-black text-[10px] uppercase tracking-[0.3em]">
                  Produção Própria
                </span>
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-foreground tracking-tight mb-2">
                E-books Exclusivos
              </h2>
              <p className="text-muted-foreground text-lg">
                Conteúdo original desenvolvido para a comunidade soberana.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {VITRINE_EBOOKS.map((ebook, index) => (
                <motion.div
                  key={ebook.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.15, ease: APPLE_EASE }}
                  className="group relative bg-card/30 backdrop-blur-sm border border-border/30 rounded-2xl overflow-hidden"
                >
                  <div className="aspect-[3/4] relative overflow-hidden">
                    <img 
                      src={ebook.cover} 
                      alt={ebook.title}
                      className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 group-hover:brightness-110" loading="lazy" decoding="async" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                    <div className="absolute top-4 left-4 flex gap-2">
                      {ebook.tags.map(tag => (
                        <span key={tag} className={`px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full ${tag === 'Gratuito' ? 'bg-destructive text-destructive-foreground' : 'bg-muted text-muted-foreground'}`}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-black text-foreground mb-2 tracking-tight group-hover:text-destructive transition-colors">
                      {ebook.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-6 line-clamp-3">
                      {ebook.description}
                    </p>
                    {ebook.available && ebook.route ? (
                      <Link 
                        to={ebook.route}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-destructive text-destructive-foreground font-bold text-sm uppercase tracking-wider rounded-lg hover:bg-destructive/90 transition-all"
                      >
                        {ebook.btnText} <ExternalLink className="w-4 h-4" />
                      </Link>
                    ) : (
                      <button 
                        disabled 
                        className="inline-flex items-center gap-2 px-6 py-3 bg-muted text-muted-foreground font-bold text-sm uppercase tracking-wider rounded-lg cursor-not-allowed"
                      >
                        <Lock className="w-4 h-4" /> {ebook.btnText}
                      </button>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Acervo por Categoria */}
        <section className="relative z-10 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: APPLE_EASE }}
              className="mb-16"
            >
              <div className="flex items-center gap-3 mb-4">
                <ShieldCheck className="w-5 h-5 text-destructive" />
                <span className="text-destructive font-black text-[10px] uppercase tracking-[0.3em]">
                  Downloads Gratuitos
                </span>
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-foreground tracking-tight mb-2">
                Acervo Curado
              </h2>
              <p className="text-muted-foreground text-lg">
                PDFs selecionados para construir sua base de conhecimento soberano.
              </p>
            </motion.div>

            {EBOOKS_DATA.map((category, catIndex) => (
              <motion.div 
                key={category.category}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: catIndex * 0.1, ease: APPLE_EASE }}
                className="mb-16 last:mb-0"
              >
                <div className="mb-8 pb-4 border-b border-border/30">
                  <h3 className="text-2xl font-black text-foreground tracking-tight">{category.category}</h3>
                  <p className="text-muted-foreground text-sm mt-1">{category.description}</p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {category.books.map((book, bookIndex) => (
                    <motion.a
                      key={book.title}
                      href={book.pdf}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative aspect-[2/3] rounded-xl overflow-hidden border border-border/20 bg-card/20"
                      whileHover={{ y: -8, scale: 1.02 }}
                      transition={{ duration: 0.3, ease: APPLE_EASE }}
                    >
                      {book.cover ? (
                        <img 
                          src={book.cover} 
                          alt={book.title}
                          className="w-full h-full object-cover transition-all duration-500 group-hover:brightness-110" loading="lazy" decoding="async" />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center">
                          <BookOpen className="w-12 h-12 text-muted-foreground/50" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                        <h4 className="text-sm font-bold text-foreground truncate">{book.title}</h4>
                        <p className="text-xs text-muted-foreground truncate">{book.author}</p>
                        <div className="flex items-center gap-1 mt-2 text-destructive">
                          <Download className="w-3 h-3" />
                          <span className="text-[10px] uppercase tracking-wider font-bold">Download</span>
                        </div>
                      </div>
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="relative z-10 py-12 border-t border-border/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-[10px] text-muted-foreground uppercase tracking-widest">
              Lord Junnior © 2026 — Conhecimento é a única riqueza que não pode ser confiscada.
            </p>
            <div className="flex items-center gap-6">
              <Link to="/audiobooks" className="text-[10px] text-muted-foreground hover:text-foreground uppercase tracking-wider transition-colors">
                Audioteca
              </Link>
              <Link to="#" className="text-[10px] text-muted-foreground hover:text-foreground uppercase tracking-wider transition-colors flex items-center gap-1">
                <Lock className="w-3 h-3" /> PGP
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Ebooks;
