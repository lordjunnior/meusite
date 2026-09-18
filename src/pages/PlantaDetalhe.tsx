import React, { useEffect, useRef } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, Heart, FlaskConical, Clock, AlertTriangle, XCircle, Pill, Brain, ChevronRight, ChevronLeft, Leaf, Shield } from 'lucide-react';
import gsap from 'gsap';
import MicroCtaResistencia from '@/components/MicroCtaResistencia';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PLANTAS, getPlantaBySlug } from '@/lib/plantData';
import BackToHome from '@/components/BackToHome';

gsap.registerPlugin(ScrollTrigger);

export default function PlantaDetalhe() {
  const { slug } = useParams<{ slug: string }>();
  const planta = getPlantaBySlug(slug || '');
  const containerRef = useRef<HTMLDivElement>(null);
  const heroImgRef = useRef<HTMLImageElement>(null);
  const sectionsRef = useRef<(HTMLElement | null)[]>([]);

  const currentIndex = PLANTAS.findIndex(p => p.slug === slug);
  const prevPlanta = currentIndex > 0 ? PLANTAS[currentIndex - 1] : null;
  const nextPlanta = currentIndex < PLANTAS.length - 1 ? PLANTAS[currentIndex + 1] : null;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  useEffect(() => {
    if (!planta || !containerRef.current) return;

    const ctx = gsap.context(() => {
      // Hero parallax
      if (heroImgRef.current) {
        gsap.to(heroImgRef.current, {
          yPercent: 25,
          ease: 'none',
          scrollTrigger: {
            trigger: heroImgRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
          },
        });
      }

      // Section reveals with blur
      sectionsRef.current.forEach((el) => {
        if (!el) return;
        gsap.fromTo(el,
          { opacity: 0, y: 60, filter: 'blur(8px)' },
          {
            opacity: 1, y: 0, filter: 'blur(0px)',
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              end: 'top 50%',
              toggleActions: 'play none none none',
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, [planta, slug]);

  if (!planta) return <Navigate to="/soberania-organica/autonomia-biologica" replace />;

  // Plantas com ficha dedicada: a URL canonica e a do silo tematico.
  const paginaDedicada = slug ? PLANTA_PAGINA_DEDICADA[slug] : undefined;
  if (paginaDedicada) return <Navigate to={paginaDedicada} replace />;

  const setRef = (i: number) => (el: HTMLElement | null) => {
    sectionsRef.current[i] = el;
  };

  return (
    <>
      <div className="relative z-20 px-6 md:px-12 lg:px-20 pt-[52px]">
        <BackToHome />
      </div>

      <Helmet>
        <title>{`${planta.nome} (${planta.cientifico}): Ficha Técnica Completa — Dosagem, Preparo e Contraindicações | Lord Junnior`}</title>
        <meta name="description" content={`Ficha técnica completa de ${planta.nome} (${planta.cientifico}). ${planta.resumo} Dosagem segura, métodos de preparo, contraindicações e mecanismo de ação documentados.`} />
        <link rel="canonical" href={`https://lordjunnior.com.br/soberania-organica/planta/${planta.slug}`} />
        <meta property="og:title" content={`${planta.nome}: Guia Completo de Fitoterapia`} />
        <meta property="og:description" content={`${planta.resumo} Ficha técnica com dosagem, preparo e segurança.`} />
        <meta property="og:url" content={`https://lordjunnior.com.br/soberania-organica/planta/${planta.slug}`} />
      </Helmet>
    <div ref={containerRef} className="min-h-screen text-stone-100 font-sans selection:bg-emerald-300/30"
      style={{ background: 'linear-gradient(180deg, #060806 0%, #0a0f0a 6%, #0d150d 15%, #101a10 30%, #0d150d 60%, #0a0f0a 85%, #060806 100%)' }}>

      {/* ═══ HEADER STICKY ═══ */}
      <header className="sticky top-0 z-50 backdrop-blur-xl border-b border-white/5"
        style={{ background: 'rgba(6,8,6,0.85)' }}>
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-3 flex items-center justify-between">
          <Link to="/soberania-organica/autonomia-biologica"
            className="flex items-center gap-2 text-stone-500 hover:text-emerald-400 transition-colors text-sm">
            <ArrowLeft size={16} />
            <span className="hidden sm:inline">Suporte Fitoterápico</span>
            <span className="sm:hidden">Voltar</span>
          </Link>
          <div className="flex items-center gap-3">
            <span className={`text-[10px] font-bold tracking-[0.3em] uppercase ${planta.accent}`}>
              {planta.sistema}
            </span>
          </div>
        </div>
      </header>

      {/* ═══ HERO — IMAGEM PARALLAX ═══ */}
      <section className="relative w-full h-[70vh] md:h-[80vh] overflow-hidden">
        <img ref={heroImgRef} src={planta.imagem} alt={`${planta.nome} — ${planta.cientifico}`}
          className="absolute inset-0 w-full h-[120%] object-cover will-change-transform" loading="eager" fetchPriority="high" decoding="async" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#060806] via-[#060806]/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#060806]/60 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 lg:p-16">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-2 mb-3">
              <div className={`p-2 rounded-lg ${planta.accentBg} border ${planta.accentBorder}`}>
                <Leaf size={16} className={planta.accent} />
              </div>
              <span className="text-stone-500 text-[10px] font-bold tracking-[0.4em] uppercase">
                {String(currentIndex + 1).padStart(2, '0')} / {String(PLANTAS.length).padStart(2, '0')}
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-wide uppercase leading-[0.9] text-white mb-2"
              style={{ fontFamily: "'Space Grotesk', sans-serif", letterSpacing: '0.04em' }}>
              {planta.nome}
            </h1>
            <p className="text-stone-400 text-lg md:text-xl italic font-light">{planta.cientifico}</p>
            <p className={`text-sm font-bold mt-3 ${planta.accent} tracking-wide uppercase`}>{planta.sistema}</p>
          </div>
        </div>
      </section>

      <main className="max-w-5xl mx-auto px-4 md:px-8 lg:px-10 pb-32">

        {/* ═══ RESUMO ═══ */}
        <section ref={setRef(0)} className="py-16 md:py-20">
          <div className={`border-l-4 ${planta.accentBorder} pl-6 md:pl-8`}>
            <p className="text-stone-300 text-lg md:text-xl leading-relaxed font-light">
              {planta.resumo}
            </p>
          </div>
        </section>

        {/* ═══ PARA QUE SERVE ═══ */}
        <section ref={setRef(1)} className="pb-20">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
              <Heart size={18} className="text-emerald-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white uppercase tracking-wide"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Para que serve
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {planta.melhora.map((item) => (
              <div key={item} className={`flex items-center gap-3 ${planta.accentBg} border ${planta.accentBorder} px-5 py-4 rounded-xl group hover:scale-[1.02] transition-all duration-500`}>
                <Heart size={14} className={`${planta.accent} shrink-0`} />
                <span className="text-stone-200 text-sm font-medium">{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ═══ PRINCÍPIOS ATIVOS ═══ */}
        <section ref={setRef(2)} className="pb-20">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2.5 rounded-xl bg-blue-500/10 border border-blue-500/20">
              <Pill size={18} className="text-blue-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white uppercase tracking-wide"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Princípios Ativos
            </h2>
          </div>
          <div className="space-y-3">
            {planta.ativos.map((a) => (
              <div key={a.nome} className="bg-blue-500/5 border border-blue-500/15 rounded-xl p-5 hover:bg-blue-500/10 transition-colors duration-500">
                <h4 className="text-blue-300 font-bold text-base mb-1">{a.nome}</h4>
                <p className="text-stone-400 text-sm leading-relaxed">{a.funcao}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ═══ MECANISMO DE AÇÃO ═══ */}
        <section ref={setRef(3)} className="pb-20">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/20">
              <Brain size={18} className="text-purple-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white uppercase tracking-wide"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Como age no corpo
            </h2>
          </div>
          <div className="bg-purple-500/5 border border-purple-500/15 rounded-2xl p-6 md:p-8">
            <p className="text-stone-300 text-base leading-relaxed">{planta.mecanismo}</p>
          </div>
        </section>

        {/* ═══ PREPARO ═══ */}
        <section ref={setRef(4)} className="pb-20">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
              <FlaskConical size={18} className="text-emerald-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white uppercase tracking-wide"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Preparo
            </h2>
          </div>
          <div className="space-y-4">
            {planta.preparo.map((p) => (
              <div key={p.metodo} className="bg-emerald-500/5 border border-emerald-500/15 rounded-xl p-5 md:p-6 hover:bg-emerald-500/10 transition-colors duration-500">
                <h4 className="text-emerald-300 font-bold text-base mb-2 uppercase tracking-wider text-sm">{p.metodo}</h4>
                <p className="text-stone-300 text-sm leading-relaxed">{p.instrucao}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ═══ DOSAGEM E LIMITE ═══ */}
        <section ref={setRef(5)} className="pb-20">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20">
              <Clock size={18} className="text-amber-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white uppercase tracking-wide"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Dosagem e Limite de Uso
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-amber-500/5 border border-amber-500/15 rounded-xl p-6">
              <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-amber-500/60 block mb-3">Dosagem Recomendada</span>
              <p className="text-stone-200 text-base leading-relaxed">{planta.dose}</p>
            </div>
            <div className="bg-amber-500/5 border border-amber-500/15 rounded-xl p-6">
              <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-amber-500/60 block mb-3">Limite de Uso Contínuo</span>
              <p className="text-stone-200 text-base leading-relaxed">{planta.limiteUso}</p>
            </div>
          </div>
        </section>

        {/* ═══ CONTRAINDICAÇÕES ═══ */}
        <section ref={setRef(6)} className="pb-20">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2.5 rounded-xl bg-red-500/10 border border-red-500/20">
              <XCircle size={18} className="text-red-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white uppercase tracking-wide"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Quem NÃO deve usar
            </h2>
          </div>
          <div className="space-y-3">
            {planta.contra.map((c) => (
              <div key={c} className="flex items-start gap-3 bg-red-500/8 border border-red-500/20 rounded-xl px-5 py-4">
                <XCircle size={16} className="text-red-400 shrink-0 mt-0.5" />
                <span className="text-stone-300 text-sm leading-relaxed">{c}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ═══ INTERAÇÕES MEDICAMENTOSAS ═══ */}
        {planta.interacoes.length > 0 && (
          <section ref={setRef(7)} className="pb-20">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20">
                <AlertTriangle size={18} className="text-amber-400" />
              </div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-white uppercase tracking-wide"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Interações Medicamentosas
              </h2>
            </div>
            <div className="space-y-3">
              {planta.interacoes.map((i) => (
                <div key={i} className="flex items-start gap-3 bg-amber-500/8 border border-amber-500/20 rounded-xl px-5 py-4">
                  <AlertTriangle size={16} className="text-amber-400 shrink-0 mt-0.5" />
                  <span className="text-stone-300 text-sm leading-relaxed">{i}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ═══ DISCLAIMER ═══ */}
        <section ref={setRef(8)} className="pb-20">
          <div className="bg-stone-900/50 border border-stone-700/30 rounded-2xl p-6 md:p-8">
            <div className="flex items-start gap-3">
              <Shield size={20} className="text-amber-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-bold text-amber-300 mb-2">Aviso Legal</p>
                <p className="text-xs text-stone-500 leading-relaxed">
                  Este conteúdo é de caráter educativo e informativo, baseado em uso tradicional documentado e farmacopeias reconhecidas. Não substitui consulta médica, diagnóstico ou tratamento profissional. Consulte sempre um profissional de saúde antes de iniciar qualquer prática fitoterápica.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ NAVEGAÇÃO ENTRE PLANTAS ═══ */}
        <nav className="flex flex-col sm:flex-row gap-4 pt-8 border-t border-white/5">
          {prevPlanta ? (
            <Link to={`/soberania-organica/planta/${prevPlanta.slug}`}
              className="flex-1 flex items-center gap-3 bg-white/3 border border-white/8 rounded-xl px-5 py-4 hover:bg-white/5 hover:border-white/15 transition-all duration-500 group">
              <ChevronLeft size={18} className="text-stone-600 group-hover:text-emerald-400 transition-colors" />
              <div>
                <span className="text-[10px] text-stone-600 uppercase tracking-widest block">Anterior</span>
                <span className="text-stone-300 font-bold text-sm">{prevPlanta.nome}</span>
              </div>
            </Link>
          ) : <div className="flex-1" />}

          <Link to="/soberania-organica/autonomia-biologica"
            className="flex items-center justify-center gap-2 bg-emerald-500/8 border border-emerald-500/20 rounded-xl px-6 py-4 text-emerald-400 text-sm font-bold hover:bg-emerald-500/15 transition-all duration-500">
            <Leaf size={16} />
            Catálogo
          </Link>

          {nextPlanta ? (
            <Link to={`/soberania-organica/planta/${nextPlanta.slug}`}
              className="flex-1 flex items-center justify-end gap-3 bg-white/3 border border-white/8 rounded-xl px-5 py-4 hover:bg-white/5 hover:border-white/15 transition-all duration-500 group">
              <div className="text-right">
                <span className="text-[10px] text-stone-600 uppercase tracking-widest block">Próxima</span>
                <span className="text-stone-300 font-bold text-sm">{nextPlanta.nome}</span>
              </div>
              <ChevronRight size={18} className="text-stone-600 group-hover:text-emerald-400 transition-colors" />
            </Link>
          ) : <div className="flex-1" />}
        </nav>
        <MicroCtaResistencia variant="saude" />
      </main>
    </div>
    </>
  );
}
