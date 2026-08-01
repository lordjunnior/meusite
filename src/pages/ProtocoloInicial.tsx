import PageFloatingToc from "@/components/PageFloatingToc";
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, Download, ShieldCheck, ArrowRight, Zap, Lock, Globe, Coins, ShieldAlert, AlertTriangle, Key, Pickaxe, Scale, Database, HelpCircle, BookOpen, Shield, Send, Hourglass, Activity, TrendingUp } from 'lucide-react';
import coverSilencioQueda from '@/assets/cover-silencio-queda.jpg';
import BackToHome from '@/components/BackToHome';
import FixedThematicBackground from '@/components/backgrounds/FixedThematicBackground';
import bgProtocoloInicial from '@/assets/backgrounds/bg-protocolo-inicial.jpg';
import imgFimIlusao from '@/assets/proto-fim-ilusao.jpg';
import imgEscassez from '@/assets/proto-escassez.jpg';
import imgMecanica from '@/assets/proto-mecanica.jpg';
import imgFortaleza from '@/assets/proto-fortaleza.jpg';
import imgBlindagemMental from '@/assets/proto-blindagem-mental.jpg';

const NAV_ITEMS = [
  { id: 'estagio-01', label: 'Estágio 01: O Fim da Ilusão' },
  { id: 'estagio-02', label: 'Estágio 02: A Escassez Absoluta' },
  { id: 'estagio-03', label: 'Estágio 03: A Mecânica da Liberdade' },
  { id: 'estagio-04', label: 'Estágio 04: A Fortaleza' },
  { id: 'estagio-05', label: 'Estágio 05: Blindagem Mental' },
];


const TOC_ITEMS = [
  { id: "estagio-01", label: "Fim da Ilusão" },
  { id: "estagio-02", label: "Escassez Absoluta" },
  { id: "estagio-03", label: "Mecânica da Liberdade" },
  { id: "estagio-04", label: "A Fortaleza" },
  { id: "estagio-05", label: "Blindagem Mental" },
];

export default function ProtocoloInicial() {
  const [activeSection, setActiveSection] = useState('estagio-01');
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(totalHeight > 0 ? Math.min((window.scrollY / totalHeight) * 100, 100) : 0);

      const sections = NAV_ITEMS.map(item => ({ id: item.id, el: document.getElementById(item.id) }));
      for (let i = sections.length - 1; i >= 0; i--) {
        if (sections[i].el && sections[i].el!.getBoundingClientRect().top <= 200) {
          setActiveSection(sections[i].id);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  return (
    <>
      <div className="relative z-20 px-6 md:px-12 lg:px-20 pt-[52px]">
        <BackToHome />
      </div>

      <Helmet>
        <title>Protocolo Inicial · Guia Bitcoin do Zero ao Avançado | Lord Junnior</title>
        <meta name="description" content="Trilha completa de aprendizado Bitcoin: do conceito à autocustódia. 6 estágios progressivos para dominar o protocolo e proteger seu patrimônio." />
        <link rel="canonical" href="https://lordjunnior.com.br/protocolo-inicial" />
      </Helmet>

      <PageFloatingToc items={TOC_ITEMS} accentColor="orange" />
    <div className="min-h-screen text-white font-sans selection:bg-red-600 overflow-x-hidden">
      <FixedThematicBackground image={bgProtocoloInicial} intensity="heavy" />
      {/* Particles */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-30">
        <div className="dust-layer-home"></div>
        <div className="dust-layer-home dust-layer-home-2"></div>
        <div className="dust-layer-home dust-layer-home-3"></div>
      </div>

      <style>{`
        @keyframes driftHome { from{transform:translateY(0) translateX(0)} to{transform:translateY(-1000px) translateX(100px)} }
        .dust-layer-home { position:absolute;width:100%;height:200%;background-image:radial-gradient(1px 1px at 10% 10%,rgba(255,255,255,0.4) 100%,transparent),radial-gradient(1.5px 1.5px at 20% 30%,rgba(255,255,255,0.5) 100%,transparent),radial-gradient(2px 2px at 40% 70%,rgba(16,185,129,0.3) 100%,transparent),radial-gradient(1px 1px at 60% 20%,rgba(255,255,255,0.4) 100%,transparent),radial-gradient(1.5px 1.5px at 80% 80%,rgba(255,255,255,0.3) 100%,transparent);background-size:200px 200px;animation:driftHome 50s linear infinite }
        .dust-layer-home-2 { background-size:300px 300px;animation:driftHome 70s linear infinite;opacity:0.7 }
        .dust-layer-home-3 { background-size:400px 400px;animation:driftHome 100s linear infinite;opacity:0.4 }
        .proto-shimmer { background:linear-gradient(90deg,#dc2626 0%,#ff6b6b 40%,#fff 50%,#ff6b6b 60%,#dc2626 100%);background-size:250% 100%;-webkit-background-clip:text;-webkit-text-fill-color:transparent;animation:pShim 3s linear infinite }
        @keyframes pShim { 0%{background-position:200% center} 100%{background-position:-200% center} }
        @keyframes borderGlow { 0%,100%{border-color:rgba(220,38,38,0.2);box-shadow:0 0 15px rgba(220,38,38,0.03)} 50%{border-color:rgba(220,38,38,0.7);box-shadow:0 0 30px rgba(220,38,38,0.1)} }
        .border-glow-pulse { animation:borderGlow 3s ease-in-out infinite }
        @keyframes barScale { from{transform:scaleY(0)} to{transform:scaleY(1)} }
        .glass-sidebar { background:rgba(11,15,25,0.8);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,0.06);box-shadow:0 0 40px rgba(0,0,0,0.6) }
        @keyframes goldGlow { 0%,100%{box-shadow:0 0 0 rgba(245,158,11,0)} 50%{box-shadow:0 0 12px rgba(245,158,11,0.15)} }
        .nav-active { background:rgba(245,158,11,0.08);border-left:2px solid rgba(245,158,11,0.8);color:#f5f5f5;box-shadow:0 0 15px rgba(245,158,11,0.05);animation:goldGlow 3s ease-in-out infinite }
      `}</style>

      {/* === BÚSSOLA DO SOBERANO (Desktop) === */}
      <nav className="hidden lg:flex fixed left-0 top-0 h-screen w-[270px] z-50 flex-col">
        <div className="glass-sidebar m-3 rounded-sm flex-1 flex flex-col overflow-hidden transition-all duration-500">
          <div className="p-5 border-b border-white/5">
            <div className="flex items-center gap-2 mb-3">
              <ShieldAlert className="text-red-600" size={16} />
              <span className="text-red-600 font-black uppercase text-[9px] tracking-[0.3em] font-mono">Protocolo Inicial</span>
            </div>
            <Link to="/" className="inline-flex items-center gap-2 text-slate-600 hover:text-white text-[8px] font-black uppercase tracking-[0.25em] transition-all font-mono">
              <ArrowLeft size={10} /> Retornar
            </Link>
          </div>

          {/* Energy Bar */}
          <div className="px-5 pt-3 pb-1">
            <div className="flex justify-between items-center mb-1">
              <span className="text-[7px] font-black uppercase tracking-[0.3em] text-slate-600 font-mono">Leitura</span>
              <span className="text-[7px] font-black text-amber-500 font-mono">{Math.round(scrollProgress)}%</span>
            </div>
            <div className="w-full h-[3px] bg-white/5 rounded-full overflow-hidden">
              <div className="h-full rounded-full transition-all duration-300 ease-out" style={{ width: `${scrollProgress}%`, background: 'linear-gradient(90deg, #dc2626, #f59e0b)' }} />
            </div>
          </div>

          {/* Nav Items */}
          <div className="flex-1 overflow-y-auto px-3 py-4 space-y-[2px]">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`w-full text-left px-3 py-3 rounded-sm text-[10px] font-bold uppercase tracking-wider transition-all duration-300 font-mono border-l-2 ${
                  activeSection === item.id ? 'nav-active' : 'text-slate-600 hover:text-slate-300 hover:bg-white/[0.02] border-transparent'
                }`}
              >
                {item.label}
              </button>
            ))}

            {/* Módulos de Aprofundamento */}
            <div className="pt-3 mt-3 border-t border-white/5">
              {/* FUNDAMENTOS */}
              <span className="text-[7px] font-black uppercase tracking-[0.3em] text-slate-700 font-mono px-3 block mb-2">Fundamentos</span>
              {[
                { to: '/bitcoin/o-que-e', label: 'O que é Bitcoin?', Icon: Coins },
                { to: '/bitcoin/nocoes-basicas', label: 'Noções Básicas', Icon: BookOpen },
                { to: '/bitcoin-seguro', label: 'Bitcoin é Seguro?', Icon: Shield },
              ].map((mod) => (
                <Link key={mod.to} to={mod.to} className="w-full flex items-center gap-2 px-3 py-2.5 rounded-sm text-[10px] font-bold uppercase tracking-wider transition-all duration-300 font-mono text-slate-500 hover:text-amber-400 hover:bg-amber-500/[0.05] border-l-2 border-transparent hover:border-amber-500/40">
                  <mod.Icon size={12} />
                  {mod.label}
                </Link>
              ))}

              {/* MECÂNICA */}
              <span className="text-[7px] font-black uppercase tracking-[0.3em] text-slate-700 font-mono px-3 block mb-2 mt-3">Mecânica</span>
              {[
                { to: '/chaves', label: 'Chaves Púb. & Priv.', Icon: Key },
                { to: '/transacoes', label: 'Transações Bitcoin', Icon: Send },
                { to: '/mineracao', label: 'Mineração Bitcoin', Icon: Pickaxe },
              ].map((mod) => (
                <Link key={mod.to} to={mod.to} className="w-full flex items-center gap-2 px-3 py-2.5 rounded-sm text-[10px] font-bold uppercase tracking-wider transition-all duration-300 font-mono text-slate-500 hover:text-amber-400 hover:bg-amber-500/[0.05] border-l-2 border-transparent hover:border-amber-500/40">
                  <mod.Icon size={12} />
                  {mod.label}
                </Link>
              ))}

              {/* ECONOMIA */}
              <span className="text-[7px] font-black uppercase tracking-[0.3em] text-slate-700 font-mono px-3 block mb-2 mt-3">Economia</span>
              {[
                { to: '/21-milhoes', label: 'Hard Cap: 21M', Icon: Lock },
                { to: '/lastro', label: 'O Mito do Lastro', Icon: Scale },
                { to: '/supply-shock', label: 'O Último Bloco', Icon: TrendingUp },
                { to: '/volatilidade', label: 'Volatilidade', Icon: Activity },
              ].map((mod) => (
                <Link key={mod.to} to={mod.to} className="w-full flex items-center gap-2 px-3 py-2.5 rounded-sm text-[10px] font-bold uppercase tracking-wider transition-all duration-300 font-mono text-slate-500 hover:text-amber-400 hover:bg-amber-500/[0.05] border-l-2 border-transparent hover:border-amber-500/40">
                  <mod.Icon size={12} />
                  {mod.label}
                </Link>
              ))}

              {/* DEFESA */}
              <span className="text-[7px] font-black uppercase tracking-[0.3em] text-slate-700 font-mono px-3 block mb-2 mt-3">Defesa</span>
              {[
                { to: '/blindagem-golpes', label: 'Blindagem vs Golpes', Icon: AlertTriangle },
                { to: '/futuro-bitcoin', label: 'Futuro do Bitcoin', Icon: Hourglass },
              ].map((mod) => (
                <Link key={mod.to} to={mod.to} className="w-full flex items-center gap-2 px-3 py-2.5 rounded-sm text-[10px] font-bold uppercase tracking-wider transition-all duration-300 font-mono text-slate-500 hover:text-red-400 hover:bg-red-500/[0.05] border-l-2 border-transparent hover:border-red-500/40">
                  <mod.Icon size={12} />
                  {mod.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* === MOBILE NAV === */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 glass-sidebar border-b border-white/5 px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="inline-flex items-center gap-1 text-slate-500 hover:text-white text-[8px] font-black uppercase tracking-[0.2em] font-mono">
            <ArrowLeft size={10} /> Início
          </Link>
          <div className="flex items-center gap-1">
            <ShieldAlert className="text-red-600" size={12} />
            <span className="text-red-600 font-black uppercase text-[8px] tracking-[0.2em] font-mono">Protocolo</span>
          </div>
          <span className="text-[8px] font-black text-amber-500 font-mono">{Math.round(scrollProgress)}%</span>
        </div>
        <div className="w-full h-[2px] bg-white/5 rounded-full overflow-hidden mt-2">
          <div className="h-full rounded-full transition-all duration-300" style={{ width: `${scrollProgress}%`, background: 'linear-gradient(90deg, #dc2626, #f59e0b)' }} />
        </div>
      </div>

      {/* === MAIN CONTENT === */}
      <div className="relative z-10 lg:ml-[270px] pb-32">
        <div className="max-w-5xl mx-auto px-6 pt-20 lg:pt-24">

          {/* BLOCO DE IMPACTO */}
          <header className="mb-28 relative overflow-hidden rounded-sm p-10 md:p-16" style={{ background: 'linear-gradient(135deg, rgba(11,15,25,0.95) 0%, rgba(30,10,5,0.6) 100%)' }}>
            <div className="absolute inset-0 opacity-15 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 70% 30%, rgba(245,158,11,0.4) 0%, transparent 50%), radial-gradient(circle at 20% 80%, rgba(220,38,38,0.2) 0%, transparent 50%)' }} />
            <div className="absolute top-4 right-4 md:top-8 md:right-8 text-amber-500/[0.07] font-black text-[180px] md:text-[280px] leading-none select-none pointer-events-none" style={{ fontFamily: 'Arial' }}>₿</div>
            <div className="relative z-10">
              <span className="text-red-600 font-black uppercase tracking-[0.5em] text-[9px] mb-6 block font-mono">A Fraude Fiduciária vs. A Verdade Digital</span>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.85] uppercase text-white mb-8">
                A Fraude Fiduciária<br />
                <span className="text-slate-700 italic lowercase text-3xl md:text-4xl">vs.</span>{' '}
                <span className="proto-shimmer italic">A Verdade Digital</span>
              </h1>
              <p className="text-slate-400 text-base md:text-lg leading-relaxed max-w-2xl font-medium">
                O dinheiro que você conhece é uma dívida que nunca será paga. O Bitcoin é o único ativo no universo com escassez matemática absoluta. Enquanto o Estado imprime inflação, a matemática grava liberdade.
              </p>
            </div>
          </header>

          {/* GRID DE PROPRIEDADES · 3 Cards */}
          <section className="mb-28">
            <h3 className="text-slate-600 font-black uppercase tracking-[0.4em] text-[9px] mb-6 font-mono">Conceito</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="rounded-sm p-8 group transition-all hover:-translate-y-1" style={{ background: 'linear-gradient(135deg, rgba(245,158,11,0.12) 0%, rgba(180,83,9,0.06) 100%)', border: '1px solid rgba(245,158,11,0.2)' }}>
                <h4 className="text-orange-400 font-black uppercase text-sm mb-3 tracking-tighter italic">Conceito</h4>
                <p className="text-slate-400 text-xs leading-relaxed font-medium">O que é Bitcoin? Não é moeda digital para especular. É a descoberta da escassez absoluta. Ponto a Ponto. Sem permissão.</p>
              </div>
              <div className="rounded-sm p-8 group transition-all hover:-translate-y-1" style={{ background: 'linear-gradient(135deg, rgba(34,197,94,0.08) 0%, rgba(22,101,52,0.05) 100%)', border: '1px solid rgba(34,197,94,0.12)' }}>
                <h4 className="text-green-400 font-black uppercase text-sm mb-3 tracking-tighter italic">Valor</h4>
                <p className="text-slate-400 text-xs leading-relaxed font-medium">Por que é Valioso? Não é opinião. É imutabilidade. 21 Milhões. O primeiro dinheiro sem dono para destruí-lo.</p>
              </div>
              <div className="rounded-sm p-8 group transition-all hover:-translate-y-1" style={{ background: 'linear-gradient(135deg, rgba(180,83,9,0.1) 0%, rgba(120,53,15,0.06) 100%)', border: '1px solid rgba(180,83,9,0.18)' }}>
                <h4 className="text-amber-500 font-black uppercase text-sm mb-3 tracking-tighter italic">Como Comprar?</h4>
                <p className="text-slate-400 text-xs leading-relaxed font-medium">Troque papel podre por propriedade real. Mas entenda: se as chaves não são suas, o Bitcoin também não é.</p>
              </div>
            </div>
          </section>

          {/* === ESTÁGIO 01: O FIM DA ILUSÃO === */}
          <section id="estagio-01" className="mb-28 scroll-mt-24">
            <div className="flex items-center gap-3 text-red-600 mb-10">
              <Coins size={20} />
              <h2 className="text-xl font-black uppercase tracking-[0.15em] font-mono">Estágio 01: O Fim da Ilusão</h2>
            </div>
            <div className="relative w-full h-[280px] md:h-[380px] rounded-sm overflow-hidden mb-10 group">
              <img src={imgFimIlusao} alt="Notas de papel-moeda em chamas representando o fim da ilusão fiduciária" loading="lazy" width={1600} height={900} className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1500ms] group-hover:scale-105" />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, transparent 0%, rgba(7,10,18,0.4) 60%, rgba(7,10,18,0.95) 100%)' }} />
              <div className="absolute bottom-0 left-0 p-8 md:p-10">
                <p className="text-red-500 font-mono font-black text-[9px] uppercase tracking-[0.4em] mb-2">Capítulo 01</p>
                <p className="text-white font-black text-2xl md:text-3xl uppercase italic tracking-tight max-w-xl leading-tight">O dinheiro que você usa morre todos os dias.</p>
              </div>
            </div>
            <div className="bg-[#0B0F19]/60 border border-white/5 rounded-sm p-10 md:p-14 space-y-6 text-slate-400 text-base leading-relaxed">
              <p>
                O Bitcoin não é apenas um "ativo digital". É a primeira vez na história que a humanidade descobriu a <strong className="text-white">escassez absoluta</strong>. Enquanto governos imprimem papel para roubar seu tempo, o Bitcoin garante que seu esforço será preservado em 21 milhões de unidades imutáveis.
              </p>
              <p>
                É dinheiro ponto a ponto (P2P): sem bancos, sem censura, sem permissão.
              </p>
              <div className="bg-slate-900/40 p-8 border border-white/5 rounded-sm mt-8">
                <h4 className="text-white font-black uppercase mb-4 italic text-xs tracking-widest font-mono">Leis da Moeda Forte:</h4>
                <ul className="space-y-3 text-sm font-bold uppercase tracking-tight">
                  <li className="flex gap-3 text-red-500"><Zap size={16}/> Escassez: Ouro é finito. Impressora é infinita.</li>
                  <li className="flex gap-3 text-slate-300"><Lock size={16}/> Imutabilidade: Ninguém altera o código.</li>
                  <li className="flex gap-3 text-slate-300"><Globe size={16}/> Soberania: Sem bancos, sem permissão.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* === ESTÁGIO 02: A ESCASSEZ ABSOLUTA === */}
          <section id="estagio-02" className="mb-28 scroll-mt-24">
            <div className="flex items-center gap-3 text-red-600 mb-10">
              <Lock size={20} />
              <h2 className="text-xl font-black uppercase tracking-[0.15em] font-mono">Estágio 02: A Escassez Absoluta</h2>
            </div>
            <div className="relative w-full h-[280px] md:h-[380px] rounded-sm overflow-hidden mb-10 group">
              <img src={imgEscassez} alt="Bitcoin físico isolado sob feixe de luz, simbolizando escassez absoluta" loading="lazy" width={1600} height={900} className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1500ms] group-hover:scale-105" />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, transparent 0%, rgba(7,10,18,0.4) 60%, rgba(7,10,18,0.95) 100%)' }} />
              <div className="absolute bottom-0 left-0 p-8 md:p-10">
                <p className="text-amber-500 font-mono font-black text-[9px] uppercase tracking-[0.4em] mb-2">Capítulo 02</p>
                <p className="text-white font-black text-2xl md:text-3xl uppercase italic tracking-tight max-w-xl leading-tight">21 milhões. Para sempre. Sem exceção.</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* O Mito do Lastro */}
              <div className="bg-[#0B0F19]/60 border border-white/5 rounded-sm p-10 space-y-5 text-slate-400 leading-relaxed">
                <h3 className="text-white font-black uppercase text-sm tracking-wider font-mono italic">O Mito do Lastro</h3>
                <p>O sistema fiduciário (Real/Dólar) é lastreado em promessas de políticos insolventes. O Bitcoin é lastreado na <strong className="text-white">Matemática, na Criptografia e na Termodinâmica</strong>.</p>
                <p>Ele é valioso porque é o único bem no universo que possui escassez matemática e portabilidade absoluta. É o "Ouro Digital" que você pode carregar na sua mente.</p>
              </div>
              {/* A Lei dos 21 Milhões */}
              <div className="rounded-sm p-10 space-y-5 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, rgba(245,158,11,0.08) 0%, rgba(120,53,15,0.06) 100%)', border: '1px solid rgba(245,158,11,0.2)' }}>
                <div className="absolute top-0 right-0 w-40 h-40 rounded-full opacity-10" style={{ background: 'radial-gradient(circle, rgba(245,158,11,0.6), transparent 70%)' }} />
                <p className="text-[9px] text-amber-500/70 uppercase font-black tracking-[0.3em] font-mono">Escassez Absoluta</p>
                <h3 className="text-white font-black uppercase text-xl tracking-wider font-mono italic" style={{ textShadow: '0 0 20px rgba(245,158,11,0.3)' }}>A Lei dos 21 Milhões</h3>
                <p className="text-slate-300 leading-relaxed text-sm">O <strong className="text-amber-400">Hard Cap</strong> que nenhum governo pode alterar. Protegido por dezenas de milhares de nós e pelo custo energético da mineração. Aumentar esse limite seria um <strong className="text-red-400">suicídio econômico</strong> para os mineradores.</p>
                <div className="flex gap-10 mt-4">
                  <div>
                    <p className="text-[8px] text-amber-500/60 uppercase font-black tracking-widest font-mono mb-1">Limite Total</p>
                    <p className="text-3xl font-black italic text-amber-400" style={{ textShadow: '0 0 15px rgba(245,158,11,0.4)' }}>21M</p>
                  </div>
                  <div>
                    <p className="text-[8px] text-amber-500/60 uppercase font-black tracking-widest font-mono mb-1">Último BTC</p>
                    <p className="text-3xl font-black italic text-white">2140</p>
                  </div>
                  <div>
                    <p className="text-[8px] text-amber-500/60 uppercase font-black tracking-widest font-mono mb-1">Já Minerados</p>
                    <p className="text-3xl font-black italic text-green-400">93%</p>
                  </div>
                </div>
                {/* Mini Halving Chart */}
                <div className="mt-6">
                  <p className="text-[8px] text-amber-500/50 uppercase font-black tracking-[0.2em] font-mono mb-3">Recompensa por Bloco (BTC) · Halvings</p>
                  <div className="h-36 flex items-end justify-between gap-3 border-b border-l border-amber-500/20 p-2">
                    {[
                      { h: 100, label: '50', year: '2009' },
                      { h: 50, label: '25', year: '2012' },
                      { h: 25, label: '12.5', year: '2016' },
                      { h: 12, label: '6.25', year: '2020' },
                      { h: 6, label: '3.125', year: '2024' },
                      { h: 3, label: '1.56', year: '2028' },
                    ].map((bar, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center gap-1 group">
                        <span className="text-[9px] font-mono font-bold text-amber-400 opacity-0 group-hover:opacity-100 transition-opacity">{bar.label}</span>
                        <div className="w-full flex justify-center">
                          <div
                            style={{ height: `${bar.h}%`, animation: `barScale 1.5s ease-out ${i * 0.15}s both`, transformOrigin: 'bottom', maxHeight: '120px' }}
                            className="w-full rounded-t-sm bg-gradient-to-t from-amber-600/40 to-amber-400/20 border-t-2 border-amber-500 group-hover:from-amber-600/70 group-hover:to-amber-400/40 transition-colors"
                          />
                        </div>
                        <span className="text-[8px] font-mono text-slate-500 group-hover:text-amber-400 transition-colors">{bar.year}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            {/* Anatomia do Satoshi */}
            <div className="mt-6 bg-[#0B0F19]/60 border border-white/5 rounded-sm p-10 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
              <div>
                <h3 className="text-white font-black uppercase text-sm tracking-wider font-mono italic mb-4">A Anatomia do Satoshi</h3>
                <p className="text-slate-400 leading-relaxed">Pare de olhar para a unidade inteira. Um Bitcoin é divisível em <strong className="text-white">100 milhões de Satoshis</strong>. Você não precisa de milhares de dólares para ser livre; comece a "empilhar sats" hoje.</p>
              </div>
              <div className="text-center">
                <div className="text-5xl md:text-6xl font-black text-white italic">100.000.000</div>
                <p className="text-red-600 font-black uppercase tracking-[0.4em] text-[9px] mt-2 font-mono">Satoshis por Bitcoin</p>
              </div>
            </div>
          </section>

          {/* === ESTÁGIO 03: A MECÂNICA DA LIBERDADE === */}
          <section id="estagio-03" className="mb-28 scroll-mt-24">
            <div className="flex items-center gap-3 text-red-600 mb-4">
              <Key size={20} />
              <h2 className="text-xl font-black uppercase tracking-[0.15em] font-mono">Estágio 03: A Mecânica da Liberdade</h2>
            </div>
            <p className="text-slate-500 text-sm mb-10 max-w-2xl">Entenda como o Bitcoin se move: de onde sai, para onde vai, e por que suas chaves são a única coisa que importa.</p>

            <div className="relative w-full h-[280px] md:h-[380px] rounded-sm overflow-hidden mb-10 group">
              <img src={imgMecanica} alt="Placa metálica de backup de seed phrase ao lado de hardware wallet em superfície escura" loading="lazy" width={1600} height={900} className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1500ms] group-hover:scale-105" />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, transparent 0%, rgba(7,10,18,0.4) 60%, rgba(7,10,18,0.95) 100%)' }} />
              <div className="absolute bottom-0 left-0 p-8 md:p-10">
                <p className="text-cyan-400 font-mono font-black text-[9px] uppercase tracking-[0.4em] mb-2">Capítulo 03</p>
                <p className="text-white font-black text-2xl md:text-3xl uppercase italic tracking-tight max-w-xl leading-tight">Suas chaves são suas moedas.</p>
              </div>
            </div>

            {/* Fluxo visual: Input → Output → Taxa */}
            <div className="relative mb-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
                {[
                  { step: '01', title: 'Inputs', desc: 'O endereço de onde o Bitcoin sai. Prova de que você recebeu valor anteriormente.', color: 'cyan', Icon: ArrowRight },
                  { step: '02', title: 'Outputs', desc: 'O endereço de destino. A chave pública que controlará o valor.', color: 'emerald', Icon: Send },
                  { step: '03', title: 'Taxas', desc: 'Incentivo para mineradores. Maior taxa = confirmação mais rápida.', color: 'amber', Icon: Zap },
                ].map((item, i) => (
                  <div key={i} className="relative group">
                    {i < 2 && <div className="hidden md:block absolute top-1/2 -right-[1px] w-[2px] h-8 -translate-y-1/2 z-10" style={{ background: 'linear-gradient(180deg, transparent, rgba(255,255,255,0.1), transparent)' }} />}
                    <div className={`p-8 border border-white/5 ${i === 0 ? 'rounded-t-sm md:rounded-l-sm md:rounded-tr-none' : i === 2 ? 'rounded-b-sm md:rounded-r-sm md:rounded-bl-none' : ''} transition-all duration-300 hover:border-white/10`}
                      style={{ background: `linear-gradient(135deg, rgba(${item.color === 'cyan' ? '6,182,212' : item.color === 'emerald' ? '16,185,129' : '245,158,11'},0.06) 0%, rgba(11,15,25,0.8) 100%)` }}>
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-[10px] font-mono font-black tracking-widest" style={{ color: item.color === 'cyan' ? '#22d3ee' : item.color === 'emerald' ? '#34d399' : '#fbbf24' }}>{item.step}</span>
                        <div className="h-[1px] flex-1" style={{ background: `linear-gradient(90deg, rgba(${item.color === 'cyan' ? '6,182,212' : item.color === 'emerald' ? '16,185,129' : '245,158,11'},0.3), transparent)` }} />
                        <item.Icon size={14} style={{ color: item.color === 'cyan' ? '#22d3ee' : item.color === 'emerald' ? '#34d399' : '#fbbf24' }} />
                      </div>
                      <h4 className="text-white font-black uppercase mb-3 tracking-tighter italic text-lg">{item.title}</h4>
                      <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Chaves · layout assimétrico */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div className="md:col-span-3 rounded-sm p-10 space-y-4 relative overflow-hidden" style={{ background: 'linear-gradient(160deg, rgba(6,182,212,0.05) 0%, rgba(11,15,25,0.9) 40%)', border: '1px solid rgba(6,182,212,0.12)' }}>
                <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full opacity-[0.04]" style={{ background: 'radial-gradient(circle, #22d3ee, transparent 70%)' }} />
                <div className="flex items-center gap-2 mb-2">
                  <Lock size={14} className="text-cyan-400" />
                  <p className="text-[9px] text-cyan-400/60 uppercase font-black tracking-[0.3em] font-mono">Segredo Mestre</p>
                </div>
                <h4 className="text-white font-black uppercase text-lg tracking-wider font-mono italic">Chave Privada</h4>
                <p className="text-slate-300 leading-relaxed text-sm">Prova a propriedade e assina transações. Se você perde a chave e o backup (seed), perde o acesso <strong className="text-red-400">para sempre</strong>.</p>
                <div className="flex items-center gap-2 text-[9px] font-black uppercase text-red-500 font-mono mt-2 px-3 py-2 rounded bg-red-500/5 border border-red-500/10 w-fit"><ShieldAlert size={12}/> Not your keys, not your money</div>
              </div>
              <div className="md:col-span-2 border-2 border-red-600/20 rounded-sm p-10 flex flex-col justify-center relative overflow-hidden" style={{ background: 'linear-gradient(135deg, rgba(220,38,38,0.08) 0%, rgba(11,15,25,0.95) 100%)' }}>
                <div className="absolute top-0 left-0 w-full h-[2px]" style={{ background: 'linear-gradient(90deg, transparent, rgba(220,38,38,0.5), transparent)' }} />
                <p className="text-red-500/60 font-black uppercase tracking-widest text-[9px] italic font-mono mb-4">⚠ Aviso Operacional</p>
                <p className="text-white font-black text-base leading-snug uppercase italic">
                  "Wallets não guardam bitcoins. Elas guardam as <span className="text-red-400">CHAVES</span> que dão acesso às suas moedas na blockchain."
                </p>
              </div>
            </div>
          </section>

          {/* === ESTÁGIO 04: A FORTALEZA === */}
          <section id="estagio-04" className="mb-28 scroll-mt-24">
            <div className="flex items-center gap-3 text-red-600 mb-4">
              <ShieldCheck size={20} />
              <h2 className="text-xl font-black uppercase tracking-[0.15em] font-mono">Estágio 04: A Fortaleza</h2>
            </div>

            <div className="relative w-full h-[280px] md:h-[380px] rounded-sm overflow-hidden mb-10 group">
              <img src={imgFortaleza} alt="Cofre blindado entreaberto revelando luz dourada, simbolizando autocustódia" loading="lazy" width={1600} height={900} className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1500ms] group-hover:scale-105" />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, transparent 0%, rgba(7,10,18,0.4) 60%, rgba(7,10,18,0.95) 100%)' }} />
              <div className="absolute bottom-0 left-0 p-8 md:p-10">
                <p className="text-amber-500 font-mono font-black text-[9px] uppercase tracking-[0.4em] mb-2">Capítulo 04</p>
                <p className="text-white font-black text-2xl md:text-3xl uppercase italic tracking-tight max-w-xl leading-tight">Você é o banco. O cofre é o seu.</p>
              </div>
            </div>

            {/* Intro com borda lateral */}
            <div className="border-l-2 border-amber-500/40 pl-8 mb-10 py-2">
              <p className="text-slate-300 leading-relaxed">A blockchain nunca foi hackeada. O risco não está no código, mas no <strong className="text-white">fator humano</strong>. Sua soberania depende de um único segredo: suas <strong className="text-amber-400">Chaves Privadas</strong>.</p>
              <p className="text-slate-500 text-sm mt-3">Se você possui as chaves, você é o banco. Se não, você é um cliente à mercê de terceiros.</p>
            </div>

            {/* 4 pilares em grid compacto */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
              {[
                { Icon: Database, label: 'Armazenamento', value: 'Cold Storage', desc: 'Hardware wallets offline', color: '#fbbf24' },
                { Icon: Scale, label: 'Impostos', value: 'Conheça', desc: 'Proteja sua privacidade', color: '#fbbf24' },
                { Icon: Pickaxe, label: 'Mineração', value: 'Energia Real', desc: 'Lastro na física', color: '#34d399' },
                { Icon: HelpCircle, label: 'Pseudônimo', value: 'Não Anônimo', desc: 'DB mais resiliente', color: '#34d399' },
              ].map((item, i) => (
                <div key={i} className="group relative rounded-sm p-6 text-center transition-all duration-300 hover:-translate-y-1" style={{ background: 'rgba(11,15,25,0.6)', border: `1px solid ${item.color}15` }}>
                  <div className="absolute inset-0 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: `radial-gradient(circle at 50% 0%, ${item.color}08, transparent 70%)` }} />
                  <div className="relative z-10">
                    <div className="w-10 h-10 rounded-full mx-auto mb-3 flex items-center justify-center" style={{ background: `${item.color}10`, border: `1px solid ${item.color}20` }}>
                      <item.Icon size={16} style={{ color: item.color }} />
                    </div>
                    <p className="text-[8px] font-black uppercase tracking-[0.2em] font-mono mb-1" style={{ color: `${item.color}90` }}>{item.label}</p>
                    <p className="text-white font-black text-sm uppercase italic">{item.value}</p>
                    <p className="text-slate-600 text-[10px] mt-1 font-medium">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Stat bar */}
            <div className="rounded-sm p-6 flex flex-wrap items-center justify-between gap-4" style={{ background: 'linear-gradient(90deg, rgba(16,185,129,0.05), rgba(245,158,11,0.05))', border: '1px solid rgba(255,255,255,0.04)' }}>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[10px] font-mono font-black uppercase tracking-wider text-slate-500">Rede ativa desde</span>
                <span className="text-white font-black font-mono">2009</span>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <p className="text-[8px] text-slate-600 font-mono uppercase tracking-wider">Uptime</p>
                  <p className="text-green-400 font-black text-sm font-mono">99.98%</p>
                </div>
                <div className="text-center">
                  <p className="text-[8px] text-slate-600 font-mono uppercase tracking-wider">Hacks</p>
                  <p className="text-amber-400 font-black text-sm font-mono">0</p>
                </div>
                <div className="text-center">
                  <p className="text-[8px] text-slate-600 font-mono uppercase tracking-wider">Nós</p>
                  <p className="text-white font-black text-sm font-mono">~60.000</p>
                </div>
              </div>
            </div>
          </section>

          {/* === ESTÁGIO 05: BLINDAGEM MENTAL === */}
          <section id="estagio-05" className="mb-28 scroll-mt-24">
            <div className="flex items-center gap-3 text-red-600 mb-10">
              <AlertTriangle size={20} />
              <h2 className="text-xl font-black uppercase tracking-[0.15em] font-mono">Estágio 05: Blindagem Mental</h2>
            </div>
            <div className="relative w-full h-[280px] md:h-[380px] rounded-sm overflow-hidden mb-10 group">
              <img src={imgBlindagemMental} alt="Peça de xadrez sob luz vermelha em tabuleiro escuro, simbolizando blindagem estratégica" loading="lazy" width={1600} height={900} className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1500ms] group-hover:scale-105" />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, transparent 0%, rgba(7,10,18,0.4) 60%, rgba(7,10,18,0.95) 100%)' }} />
              <div className="absolute bottom-0 left-0 p-8 md:p-10">
                <p className="text-red-500 font-mono font-black text-[9px] uppercase tracking-[0.4em] mb-2">Capítulo 05</p>
                <p className="text-white font-black text-2xl md:text-3xl uppercase italic tracking-tight max-w-xl leading-tight">A última camada é mental.</p>
              </div>
            </div>
            {/* Mitos com Shimmer */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
              {[
                { m: "Bitcoin é anônimo", v: "Pseudônimo e o sistema financeiro mais transparente e auditável do mundo." },
                { m: "Não tem valor intrínseco", v: "Escassez matemática + portabilidade absoluta = valor real." },
                { m: "Bitcoin é difícil de usar", v: "É o único dinheiro onde você é 100% dono." },
                { m: "Vai ser banido", v: "Impossível banir um código que vive em satélites, rádios e mentes." }
              ].map((item, i) => (
                <div key={i} className="p-7 bg-[#0B0F19]/60 border border-white/5 group hover:border-red-600/40 transition-all rounded-sm">
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-[8px] font-black text-red-600 uppercase tracking-widest italic font-mono">Mito {i+1}</span>
                    <AlertTriangle size={12} className="text-slate-800 group-hover:text-red-600 transition-colors" />
                  </div>
                  <p className="text-lg font-black uppercase line-through text-slate-700 group-hover:text-red-900 transition-colors mb-3">{item.m}</p>
                  <p className="text-white text-sm font-bold leading-tight opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0 italic">→ {item.v}</p>
                </div>
              ))}
            </div>

            {/* Blindagem contra Golpes · Terminal */}
            <div className="border-2 border-red-600 bg-[#0a0a0a] p-10 md:p-12 relative overflow-hidden rounded-sm border-glow-pulse">
              <ShieldAlert className="absolute top-0 right-0 text-red-600/5 -mr-14 -mt-14" size={280} />
              <div className="relative z-10">
                <h3 className="text-sm md:text-base font-black uppercase tracking-wider mb-1 flex items-center gap-3 font-mono">
                  <AlertTriangle className="text-red-600 animate-pulse" size={20} />
                  <span className="text-slate-500">Blindagem contra Golpes:</span>
                  <span className="text-red-600 italic">O Código do Soberano</span>
                </h3>
                <div className="mt-6 font-mono text-sm md:text-base leading-relaxed space-y-3">
                  <p className="text-red-500 font-bold">Ninguém legítimo pedirá sua Seed Phrase.</p>
                  <p className="text-red-400">Se prometerem lucro, é golpe. Se pedirem urgência, é roubo.</p>
                  <p className="text-white font-black text-lg md:text-xl italic mt-4">No Bitcoin, você é o responsável final.</p>
                </div>
              </div>
            </div>
          </section>

          {/* === MÓDULOS DE APROFUNDAMENTO === */}
          <section className="mb-28">
            <h3 className="text-slate-600 font-black uppercase tracking-[0.4em] text-[9px] mb-6 font-mono">Módulos de Aprofundamento</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { to: '/bitcoin/o-que-e', title: 'O que é Bitcoin?', desc: 'Definição, propriedades, como funciona, Satoshi Nakamoto e por que tem valor. O fundamento zero.', color: 'orange', icon: '₿' },
                { to: '/bitcoin/nocoes-basicas', title: 'Noções Básicas sobre Bitcoin', desc: 'Aprenda o básico: o que é, como comprar, como funciona. 14 tópicos essenciais para iniciantes.', color: 'amber', icon: '📖' },
                { to: '/bitcoin-seguro', title: 'Bitcoin é Seguro?', desc: 'A blockchain nunca foi hackeada. Mas você pode ser o elo fraco. Entenda os riscos reais.', color: 'green', icon: '🛡' },
                { to: '/chaves', title: 'Chaves Públicas & Privadas', desc: 'Criptografia de chave pública: como funciona a propriedade real no Bitcoin.', color: 'orange', icon: '🔑' },
                { to: '/transacoes', title: 'Transações Bitcoin', desc: 'Inputs, outputs, taxas e mempool. A mecânica completa de como valor é transferido.', color: 'cyan', icon: '📡' },
                { to: '/mineracao', title: 'Mineração Bitcoin', desc: 'Hardware, energia, pools e estratégia Bull vs Bear. A soberania energética convertida em liberdade.', color: 'amber', icon: '⛏' },
                { to: '/futuro-bitcoin', title: 'O Futuro do Bitcoin', desc: 'O ano de 2140, fortaleza da mineração, deflação, Lightning Network. O sistema mais honesto da história.', color: 'blue', icon: '⏳' },
                { to: '/blindagem-golpes', title: 'Blindagem contra Golpes', desc: 'Engenharia social, phishing, malware. Aprenda a identificar e neutralizar cada vetor.', color: 'red', icon: '⚠' },
                { to: '/21-milhoes', title: 'Hard Cap: 21 Milhões', desc: 'A escassez absoluta que nenhum governo pode alterar. A lei matemática suprema.', color: 'amber', icon: '₿' },
              ].map((mod) => (
                <Link
                  key={mod.to}
                  to={mod.to}
                  className={`group bg-[#0B0F19]/60 border border-white/5 rounded-sm p-8 hover:border-${mod.color}-500/30 transition-all hover:-translate-y-1`}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-2xl">{mod.icon}</span>
                    <h4 className="text-white font-black uppercase text-sm tracking-tighter italic group-hover:text-amber-400 transition-colors">{mod.title}</h4>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed font-medium">{mod.desc}</p>
                  <div className="flex items-center gap-2 mt-4 text-[9px] font-black uppercase tracking-widest text-slate-700 group-hover:text-amber-500 transition-colors font-mono">
                    Acessar Módulo <ArrowRight size={12} />
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* === CARD PDF === */}
          <div className="bg-[#0B0F19] rounded-sm border border-white/5 overflow-hidden mb-28 group">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="p-10 md:p-14 flex flex-col justify-center">
                <h3 className="text-2xl font-black uppercase mb-6 tracking-tighter italic">Por que este site existe?</h3>
                <p className="text-slate-300 font-medium mb-4 text-sm leading-relaxed">
                  O sistema monetário é uma fraude. A educação formal é propaganda. A mídia tradicional é manipulação sistemática da realidade. Isso não é teoria da conspiração, é <strong className="text-white uppercase">MATEMÁTICA, HISTÓRIA E ECONOMIA DOCUMENTADA</strong>.
                </p>
                <p className="text-slate-400 font-medium mb-4 text-sm leading-relaxed">
                  Bancos centrais criam dinheiro do nada e transferem riqueza de quem trabalha para quem controla a emissão. Universidades produzem conformidade intelectual, não pensamento crítico.
                </p>
                <p className="text-slate-400 font-medium mb-6 text-sm leading-relaxed">
                  Este arsenal existe para compartilhar conhecimento que deveria ser óbvio, mas é sistematicamente escondido. Não por dinheiro. Não por fama. <strong className="text-white uppercase">POR RESPONSABILIDADE COM QUEM AINDA CONSEGUE PENSAR.</strong>
                </p>

                {/* O Que Você Encontra Aqui */}
                <div className="mb-8">
                  <h4 className="text-white font-black uppercase text-xs tracking-widest mb-4 font-mono">O Que Você Encontra Aqui</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex items-center gap-2 text-sm"><span className="text-lg">📚</span><span className="text-slate-300 font-bold text-xs">Economia que Faz Sentido</span></div>
                    <div className="flex items-center gap-2 text-sm"><span className="text-lg">₿</span><span className="text-slate-300 font-bold text-xs">Bitcoin sem Enrolação</span></div>
                    <div className="flex items-center gap-2 text-sm"><span className="text-lg">⚖️</span><span className="text-slate-300 font-bold text-xs">Filosofia da Liberdade</span></div>
                    <div className="flex items-center gap-2 text-sm"><span className="text-lg">🔐</span><span className="text-slate-300 font-bold text-xs">Estratégias de Saída</span></div>
                  </div>
                </div>

                <Link
                  to="/silencio-queda"
                  className="bg-red-600 text-white font-black py-5 px-8 rounded-sm text-[10px] uppercase tracking-[0.3em] hover:bg-white hover:text-black transition-all flex items-center justify-center gap-3 shadow-[0_0_30px_rgba(220,38,38,0.3)] hover:shadow-[0_0_40px_rgba(220,38,38,0.5)] border-glow-pulse"
                >
                  <Download size={16} /> Baixar PDF Gratuito
                </Link>
              </div>
              <div className="bg-[#0E131F] p-10 flex items-center justify-center border-l border-white/5">
                <div className="w-full max-w-[240px] aspect-[2/3] rounded-sm shadow-2xl relative overflow-hidden border border-white/10 group-hover:scale-[1.03] transition-transform duration-700">
                  <img src={coverSilencioQueda} alt="O Silêncio da Queda" className="w-full h-full object-cover" loading="lazy" decoding="async" />
                </div>
              </div>
            </div>
          </div>

          {/* PRÓXIMO NÍVEL */}
          <div className="border-2 border-white p-10 flex flex-col md:flex-row items-center justify-between gap-6 mb-32 rounded-sm">
            <div className="text-center md:text-left">
              <h3 className="font-black uppercase tracking-[0.4em] text-xs text-white mb-1 font-mono">Próximo Nível</h3>
              <p className="text-slate-400 font-bold uppercase text-xs">Estará pronto para a prática.</p>
            </div>
            <Link to="/recursos-e-ferramentas" className="bg-white text-black px-10 py-4 font-black uppercase text-[10px] tracking-widest hover:bg-red-600 hover:text-white transition-all flex items-center gap-3 rounded-sm">
              Arsenal Técnico <ArrowRight size={16} />
            </Link>
          </div>

          {/* FOOTER */}
          <footer className="pt-16 border-t border-white/5">
            <div className="text-center space-y-10">
              <p className="text-slate-700 font-black uppercase tracking-[1em] text-[9px] font-mono">Not your keys, not your money.</p>
              <div className="space-y-3">
                <p className="text-2xl md:text-4xl font-black uppercase tracking-tighter leading-none text-white italic">Sempre foi projeto.</p>
                <p className="text-red-600 font-black uppercase text-lg md:text-xl tracking-tighter italic">Autocustódia exige responsabilidade.</p>
              </div>
              <p className="text-slate-800 text-[9px] font-black tracking-[0.5em] uppercase pt-16 font-mono">Lord Junnior © 2026</p>
            </div>
          </footer>
        </div>
      </div>
    </div>
    </>
  );
}
