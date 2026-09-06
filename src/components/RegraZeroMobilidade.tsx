import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Lock, ArrowRight, Globe2 } from 'lucide-react';

const EASE = [0.22, 1, 0.36, 1] as const;

const ROTAS = [
  { to: '/autocustodia/guia-migracao-corretora', label: 'Autocustódia de elite: sair da corretora' },
  { to: '/pix-cripto', label: 'PIX para Bitcoin sem exposição' },
  { to: '/p2p/bisq-guia-completo', label: 'P2P e Bisq: comprar sem intermediário' },
];

interface Props {
  /** Palette of the host page */
  theme?: 'light' | 'dark';
}

export default function RegraZeroMobilidade({ theme = 'light' }: Props) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const dark = theme === 'dark';

  return (
    <motion.aside
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: EASE }}
      className="relative mx-auto max-w-4xl my-12 md:my-16"
    >
      <div
        className="relative overflow-hidden rounded-sm border p-6 md:p-10"
        style={
          dark
            ? { borderColor: 'rgba(245,158,11,0.28)', backgroundColor: 'rgba(245,158,11,0.05)' }
            : { borderColor: 'rgba(14,59,58,0.22)', backgroundColor: '#ece2d3' }
        }
      >
        <div className="flex items-center gap-3 mb-4">
          <Lock className="w-5 h-5" style={{ color: dark ? '#f59e0b' : '#0e3b3a' }} />
          <span
            className="font-mono text-[10px] tracking-[0.3em] uppercase font-bold"
            style={{ color: dark ? '#f59e0b' : '#0e3b3a' }}
          >
            Regra Zero da Mobilidade Física
          </span>
        </div>

        <h3
          className="text-xl md:text-2xl font-black tracking-tight mb-4 leading-tight"
          style={{ color: dark ? '#f5f1ea' : '#1c2624' }}
        >
          Não existe liberdade geográfica com patrimônio rastreável ou preso em terceiros.
        </h3>

        <p
          className="text-sm md:text-base leading-relaxed mb-6"
          style={{ color: dark ? 'rgba(245,241,234,0.72)' : 'rgba(28,38,36,0.78)' }}
        >
          Trocar de país sem trocar de sistema é mudar a paisagem e manter a coleira. Antes de arrumar as
          malas, seu capital precisa estar sob custódia própria e ter transitado por rotas que não dependem de
          autorização bancária. Passaporte novo com dinheiro preso em corretora é mobilidade de fachada.
        </p>

        <div className="grid gap-3 sm:grid-cols-3">
          {ROTAS.map((r) => (
            <Link
              key={r.to}
              to={r.to}
              className="group flex items-start gap-2 p-4 rounded-sm border transition-all duration-300"
              style={
                dark
                  ? { borderColor: 'rgba(245,158,11,0.22)', backgroundColor: 'rgba(255,255,255,0.03)' }
                  : { borderColor: 'rgba(14,59,58,0.18)', backgroundColor: '#f4ede4' }
              }
            >
              <Globe2 className="w-4 h-4 mt-0.5 shrink-0" style={{ color: dark ? '#f59e0b' : '#b06a2c' }} />
              <span
                className="text-[13px] font-semibold leading-snug"
                style={{ color: dark ? '#f5f1ea' : '#1c2624' }}
              >
                {r.label}
                <ArrowRight className="inline w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </motion.aside>
  );
}
