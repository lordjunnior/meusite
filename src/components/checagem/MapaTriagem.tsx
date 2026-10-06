import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

export interface EtapaTriagem { label: string; detail: string }
interface Props { panico: EtapaTriagem[]; barreira: EtapaTriagem[] }

/** Comparador por etapas: cada etapa mostra lado a lado o que acontece no impulso e na verificação. */
export default function MapaTriagem({ panico, barreira }: Props) {
  const [ativa, setAtiva] = useState(0);
  const reduced = useReducedMotion();
  const total = Math.min(panico.length, barreira.length);
  const anim = reduced ? {} : { initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -8 }, transition: { duration: 0.3 } };

  return (
    <div className="triagem">
      <div role="tablist" aria-label="Etapas da triagem" className="triagem-steps">
        <span aria-hidden className="triagem-rail"><span style={{ transform: `scaleX(${total > 1 ? ativa / (total - 1) : 1})` }} /></span>
        {Array.from({ length: total }).map((_, i) => (
          <button key={i} role="tab" type="button" aria-selected={ativa === i} aria-controls="triagem-painel"
            onClick={() => setAtiva(i)} className={`triagem-step smx-focus ${ativa === i ? 'is-on' : ''} ${i < ativa ? 'is-past' : ''}`}>
            <span className="triagem-dot">{String(i + 1).padStart(2, '0')}</span>
            <span className="triagem-step-label">{panico[i].label} <em>ou</em> {barreira[i].label}</span>
          </button>
        ))}
      </div>

      <div id="triagem-painel" role="tabpanel" aria-live="polite" className="triagem-grid">
        <AnimatePresence mode="wait">
          <motion.article key={`p${ativa}`} {...anim} className="triagem-card triagem-panico">
            <p className="triagem-tag">Rota do impulso / etapa {ativa + 1}</p>
            <h3>{panico[ativa].label}</h3>
            <p>{panico[ativa].detail}</p>
          </motion.article>
        </AnimatePresence>
        <AnimatePresence mode="wait">
          <motion.article key={`b${ativa}`} {...anim} className="triagem-card triagem-barreira">
            <p className="triagem-tag">Rota da verificação / etapa {ativa + 1}</p>
            <h3>{barreira[ativa].label}</h3>
            <p>{barreira[ativa].detail}</p>
          </motion.article>
        </AnimatePresence>
      </div>

      <div className="triagem-nav">
        <button type="button" className="triagem-btn smx-focus" disabled={ativa === 0} onClick={() => setAtiva(a => a - 1)}>Etapa anterior</button>
        <button type="button" className="triagem-btn smx-focus" disabled={ativa === total - 1} onClick={() => setAtiva(a => a + 1)}>Próxima etapa</button>
      </div>
    </div>
  );
}
