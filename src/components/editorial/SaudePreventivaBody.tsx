import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Plus, Sun, Moon, Activity, Leaf, Wind, Droplets } from 'lucide-react';
import imgSol from '@/assets/saude/hero-sol.webp';
import imgSono from '@/assets/saude/hero-sono.webp';
import imgMov from '@/assets/saude/hero-movimento.webp';
import imgAli from '@/assets/saude/hero-alimentacao.webp';
import imgCort from '@/assets/saude/hero-cortisol.webp';
import imgAgua from '@/assets/saude/proto-hidratacao.jpg';
import imgRape from '@/assets/cards/card-rape-hook.webp';

export interface Pilar {
  numero: string; titulo: string; destaque: string; imagem: string; legenda: string;
  abertura: string; beneficios: string[]; riscos: string[]; fechamento?: string;
}

const ICONS = [Sun, Moon, Activity, Leaf, Wind];
const TONES = ['sp-ic-4', 'sp-ic-1', 'sp-ic-2', 'sp-ic-2', 'sp-ic-3'];

export function Inflamacao({ folhas }: { folhas: string }) {
  const [mode, setMode] = useState<'m' | 'c'>('m');
  const marc = ['IL-6 elevada', 'TNF-alfa em ascenção', 'PCR ultrasensível alta', 'Cortisol cronicamente elevado'];
  const cons = ['Danos vasculares', 'Rigidez arterial', 'Disfunção metabólica', 'Alteração de humor e fadiga'];
  const list = mode === 'm' ? marc : cons;
  return (
    <section id="inflamacao" className="sp-sec sp-sec-grey scroll-mt-16">
      <div className="sp-wrap sp-split">
        <div>
          <p className="sp-kick">Base</p>
          <h2 className="sp-h2">Inflamação <span className="sp-dim-dark">crônica</span></h2>
          <p className="sp-lead">Inflamação aguda é protetora. Inflamação crônica é destrutiva. Ela ocorre quando o sistema imune permanece ativado de forma leve e constante, sem janela de descanso.</p>
          <p className="sp-lead">O objetivo preventivo é reduzir a inflamação basal sem bloquear o sistema imune.</p>
        </div>
        <div className="sp-panel-black">
          <img src={folhas} alt="" className="sp-panel-leaf" loading="lazy" />
          <div className="sp-switch" role="tablist" aria-label="Leitura da inflamação">
            <button role="tab" aria-selected={mode === 'm'} className={mode === 'm' ? 'is-on' : ''} onClick={() => setMode('m')}>Marcadores envolvidos</button>
            <button role="tab" aria-selected={mode === 'c'} className={mode === 'c' ? 'is-on' : ''} onClick={() => setMode('c')}>Consequências sistêmicas</button>
          </div>
          <ol key={mode} className="sp-mlist">
            {list.map((t, i) => <li key={t} style={{ animationDelay: `${i * 70}ms` }}><span>{String(i + 1).padStart(2, '0')}</span>{t}</li>)}
          </ol>
        </div>
      </div>
    </section>
  );
}

export function PilarSection({ p, i }: { p: Pilar; i: number }) {
  const [tab, setTab] = useState<'b' | 'r'>('b');
  const Icon = ICONS[i];
  return (
    <section id={`pilar-${p.numero}`} className={`sp-sec scroll-mt-16 ${i % 2 ? 'sp-sec-grey' : 'sp-sec-cream'}`}>
      <div className={`sp-wrap sp-pilar ${i % 2 ? 'is-rev' : ''}`}>
        <figure className="sp-pilar-fig">
          <img src={p.imagem} alt={p.legenda} loading={i === 0 ? 'eager' : 'lazy'} width={1920} height={1080} />
          <figcaption><span className={`sp-ref-ic ${TONES[i]}`}><Icon size={20} /></span>{p.legenda}</figcaption>
          <b className="sp-pilar-num">{p.numero}</b>
        </figure>
        <div className="sp-pilar-body">
          <p className="sp-kick">Pilar {p.numero} de 05</p>
          <h2 className="sp-h2">{p.titulo} <span className="sp-dim-dark">como {p.destaque}</span></h2>
          <p className="sp-lead">{p.abertura}</p>
          <div className="sp-switch sp-switch-light" role="tablist" aria-label={`Leitura do pilar ${p.numero}`}>
            <button role="tab" aria-selected={tab === 'b'} className={tab === 'b' ? 'is-on' : ''} onClick={() => setTab('b')}>Benefícios documentados</button>
            <button role="tab" aria-selected={tab === 'r'} className={tab === 'r' ? 'is-on' : ''} onClick={() => setTab('r')}>Sinais de falha do pilar</button>
          </div>
          <ul key={tab} className={`sp-chips ${tab === 'r' ? 'is-risk' : ''}`}>
            {(tab === 'b' ? p.beneficios : p.riscos).map((t, k) => <li key={t} style={{ animationDelay: `${k * 60}ms` }}>{t}</li>)}
          </ul>
          {p.fechamento && (
            <div className="sp-apply">
              <p className="sp-kick sp-kick-light">Aplicação prática</p>
              <p>{p.fechamento}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

const PROTO = [
  { h: '06h', f: 'Despertar', l: 'Sol direto', v: '15 a 30 minutos pela manhã sem filtro', I: Sun, t: 'sp-ic-4', img: imgSol },
  { h: '07h', f: 'Ativação', l: 'Movimento', v: '20 a 30 minutos diários, força duas vezes na semana', I: Activity, t: 'sp-ic-2', img: imgMov },
  { h: '12h', f: 'Combustível', l: 'Alimentação', v: 'Proteína antes do carboidrato, fibras, fermentados', I: Leaf, t: 'sp-ic-2', img: imgAli },
  { h: 'Dia todo', f: 'Fluxo', l: 'Hidratação', v: '30ml por kg de peso, com sais minerais', I: Droplets, t: 'sp-ic-3', img: imgAgua },
  { h: '18h', f: 'Desaceleração', l: 'Regulação vagal', v: 'Dois blocos de 5 minutos de respiração lenta', I: Wind, t: 'sp-ic-3', img: imgCort },
  { h: '22h', f: 'Reparo', l: 'Sono', v: '7 a 9 horas, quarto escuro a 18 a 20 graus', I: Moon, t: 'sp-ic-1', img: imgSono },
];

export function Protocolo() {
  const [on, setOn] = useState(0);
  return (
    <section id="protocolo" className="sp-sec sp-sec-black scroll-mt-16">
      <div className="sp-wrap">
        <div className="sp-proto-head">
          <div>
            <p className="sp-kick sp-kick-light">Protocolo diário</p>
            <h2 className="sp-h2 sp-h2-light">Base operacional <span className="sp-dim">diária</span></h2>
          </div>
          <p className="sp-proto-hook">Seis gestos. Um relógio biológico. Passe o mouse ou toque para abrir cada janela do dia.</p>
        </div>
        <ol className="sp-clock" aria-hidden="true">
          {PROTO.map((p, i) => <li key={p.l} className={on === i ? 'is-on' : ''}><span>{p.h}</span></li>)}
        </ol>
        <div className="sp-proto2">
          {PROTO.map(({ h, f, l, v, I, t, img }, i) => (
            <button key={l} type="button" className={`sp-pp ${on === i ? 'is-on' : ''}`} aria-expanded={on === i}
              onMouseEnter={() => setOn(i)} onFocus={() => setOn(i)} onClick={() => setOn(i)}>
              <img src={img} alt="" loading="lazy" width={1024} height={1280} />
              <span className="sp-pp-shade" />
              <span className="sp-pp-top"><span className={`sp-ref-ic ${t}`}><I size={18} /></span><em>{String(i + 1).padStart(2, '0')}</em></span>
              <span className="sp-pp-body">
                <small>{h} · {f}</small>
                <strong>{l}</strong>
                <span className="sp-pp-v">{v}</span>
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

export function RapeBloco() {
  return (
    <section className="sp-sec sp-sec-grey">
      <div className="sp-wrap">
        <Link to="/soberania-organica/conhecimento-perdido/rape" className="sp-rape">
          <figure><img src={imgRape} alt="Kuripe ancestral sobre couro envelhecido" loading="lazy" width={1280} height={800} /></figure>
          <div className="sp-rape-txt">
            <p className="sp-kick">Modulação biológica · Dossiê</p>
            <h2 className="sp-h2">Rapé: modulação vagal <span className="sp-dim-dark">ancestral</span></h2>
            <p className="sp-lead">Antes da meditação virar app, povos amazônicos já regulavam o eixo HPA com um pó cerimonial. Não é misticismo, é bioquímica do nervo vago documentada em literatura técnica. O dossiê está aqui.</p>
            <ul className="sp-rape-tags"><li>Nervo vago</li><li>Eixo HPA</li><li>Uso tradicional</li></ul>
            <span className="sp-ref-btn sp-rape-btn">Abrir o dossiê <ArrowUpRight size={20} /></span>
          </div>
        </Link>
      </div>
    </section>
  );
}

export function Faq({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState(0);
  return (
    <section id="faq" className="sp-sec sp-sec-cream scroll-mt-16">
      <div className="sp-wrap sp-split">
        <div>
          <p className="sp-kick">Dúvidas legítimas</p>
          <h2 className="sp-h2">Perguntas que blindam <span className="sp-dim-dark">rotinas</span></h2>
        </div>
        <div className="sp-faq">
          {items.map((f, i) => (
            <div key={f.q} className={`sp-faq-item ${open === i ? 'is-open' : ''}`}>
              <h3>
                <button aria-expanded={open === i} onClick={() => setOpen(open === i ? -1 : i)}>
                  <span>{String(i + 1).padStart(2, '0')}</span>{f.q}<Plus size={20} />
                </button>
              </h3>
              <div className="sp-faq-a"><div><p>{f.a}</p></div></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FooterNav() {
  return (
    <div className="sp-wrap sp-foot">
      <Link to="/soberania-organica" className="sp-foot-link">Voltar para Soberania Orgânica</Link>
      <Link to="/soberania-organica/avaliacao-sinais" className="sp-ref-btn sp-foot-btn">Avaliação de Sinais <ArrowUpRight /></Link>
    </div>
  );
}
