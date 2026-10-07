import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, CornerUpLeft, Menu, X, Shield, Moon, Droplets, Sun, Search } from 'lucide-react';
import bg from '@/assets/saude/sp-ref-bg.jpg';
import produto from '@/assets/saude/sp-ref-produto.png';
import folhas from '@/assets/saude/sp-ref-folhas.png';
import '@/pages/saude-preventiva.css';

const ROTATE_MS = 3500;

const NAV = [
  ['#inflamacao', 'Inflamação'],
  ['#pilar-01', 'Pilares'],
  ['#protocolo', 'Protocolo'],
  ['#faq', 'Dúvidas'],
] as const;

const CARDS = [
  { icon: Shield, tone: 'sp-ic-1', text: 'Imunidade celular: 70% da defesa reside no intestino' },
  { icon: Moon, tone: 'sp-ic-2', text: 'Sono profundo limpa resíduos neurotóxicos do cérebro' },
  { icon: Droplets, tone: 'sp-ic-3', text: 'Respiração lenta regula o eixo do cortisol em semanas' },
  { icon: Sun, tone: 'sp-ic-4', text: 'Luz solar regula mais de mil genes e o ritmo circadiano' },
];

const LINES: [string, boolean][][] = [
  [['A', false], ['Força', false], ['da', true]],
  [['Biologia', true], ['em', true], ['Cada', false]],
  [['Protocolo', false]],
];

export default function SaudePreventivaHero() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const [hold, setHold] = useState(false);

  useEffect(() => {
    if (hold || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const t = window.setTimeout(() => setActive(a => (a + 1) % CARDS.length), ROTATE_MS);
    return () => window.clearTimeout(t);
  }, [active, hold]);

  let w = 0;
  return (
    <header className="sp-ref" style={{ backgroundImage: `url(${bg})` }}>
      <nav className="sp-ref-nav sp-a-fade" aria-label="Navegação da página" data-page-toc>
        <Link to="/soberania-organica" className="sp-ref-brand sp-a-left sp-d2">Saúde Preventiva</Link>
        <ul className="sp-ref-links sp-a-fade sp-d4">
          {NAV.map(([h, l]) => <li key={h}><a href={h}>{l}</a></li>)}
        </ul>
        <div className="sp-ref-icons sp-a-right sp-d3">
          <a href="#inflamacao" aria-label="Ir para o conteúdo"><Search size={20} strokeWidth={1.5} /></a>
          <Link to="/soberania-organica" aria-label="Voltar para Soberania Orgânica" className="sp-ref-back"><CornerUpLeft size={20} strokeWidth={1.5} /><span>Voltar</span></Link>
          <button type="button" className="sp-ref-menu" aria-label={open ? 'Fechar menu' : 'Abrir menu'} aria-expanded={open} onClick={() => setOpen(!open)}>
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="sp-ref-overlay" role="dialog" aria-label="Menu">
          <button type="button" aria-label="Fechar menu" className="sp-ref-close" onClick={() => setOpen(false)}><X size={26} /></button>
          {NAV.map(([h, l]) => <a key={h} href={h} onClick={() => setOpen(false)}>{l}</a>)}
          <Link to="/soberania-organica">Voltar para Soberania Orgânica</Link>
        </div>
      )}

      <section className="sp-ref-hero">
        <h1 className="sp-ref-h1">
          <span className="sr-only">Saúde Preventiva: a força da biologia em cada protocolo</span>
          {LINES.map((line, li) => (
            <span key={li} className="sp-ref-line" aria-hidden="true">
              {line.map(([word, dim]) => {
                const d = 0.3 + 0.1 * w++;
                return <span key={word} className="sp-ref-word"><span className={dim ? 'sp-dim' : ''} style={{ animationDelay: `${d}s` }}>{word}</span></span>;
              })}
              {li === 2 && <img src={folhas} alt="" className="sp-ref-inline sp-a-scale sp-d10" width={768} height={1024} />}
            </span>
          ))}
        </h1>
        <div className="sp-ref-cta sp-a-up sp-d6">
          <a href="#inflamacao" className="sp-ref-btn">Iniciar protocolo <ArrowUpRight /></a>
          <p>Ritmo circadiano, cortisol e imunidade: o corpo se defende quando você para de sabotar a própria biologia.</p>
        </div>
      </section>

      <div className="sp-ref-mobile-prod sp-a-scale sp-d8"><img src={produto} alt="Frasco de tintura herbal com alecrim, camomila e gengibre" width={1280} height={1024} /></div>

      <div className="sp-ref-grid">
        <div className="sp-ref-p1 sp-a-up sp-d9">
          <p>Inicie seu diagnóstico de autonomia biológica</p>
          <a href="#pilar-01">Avaliar os 5 pilares</a>
          <img src={folhas} alt="" width={768} height={1024} loading="lazy" />
        </div>
        <div className="sp-ref-p2 sp-a-up sp-d10" onMouseEnter={() => setHold(true)} onMouseLeave={() => setHold(false)} aria-roledescription="carrossel" aria-label="Eixos biológicos">
          <div className="sp-ref-cards" aria-live="polite">
            {CARDS.map((c, i) => { const I = c.icon; return (
              <div key={c.text} className={`sp-ref-card ${i === active ? 'is-on' : ''}`} aria-hidden={i !== active}>
                <span className={`sp-ref-ic ${c.tone}`}><I size={20} /></span><p>{c.text}</p>
              </div>
            ); })}
          </div>
          <div className="sp-ref-dots">
            {CARDS.map((c, i) => <button type="button" key={c.text} aria-label={`Eixo ${i + 1}`} aria-current={i === active} className={i === active ? 'is-on' : ''} onClick={() => setActive(i)} />)}
          </div>
        </div>
        <div className="sp-ref-p3 sp-a-up sp-d11">
          <img src={produto} alt="" width={1280} height={1024} loading="lazy" />
          <div><strong>70%</strong><p>do sistema imune reside no intestino</p></div>
        </div>
      </div>

      <img src={produto} alt="" aria-hidden="true" className="sp-ref-float sp-a-scale sp-d7" width={1280} height={1024} />
    </header>
  );
}
