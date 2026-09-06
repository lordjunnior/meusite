import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Crosshair, ArrowRight } from 'lucide-react';

const EASE = [0.22, 1, 0.36, 1] as const;

export interface ContraAtaqueLink {
  to: string;
  kicker: string;
  label: string;
}

const DEFAULT_LINKS: ContraAtaqueLink[] = [
  {
    to: '/autocustodia/guia-migracao-corretora',
    kicker: 'Para proteger o dinheiro agora',
    label: 'Guia da migração: tirar o Bitcoin da corretora',
  },
  {
    to: '/pix-cripto',
    kicker: 'Para operar no dia a dia fora do radar',
    label: 'PIX para Bitcoin e exchanges sem KYC',
  },
  {
    to: '/soberania-organica/farmacia-caseira-essencial',
    kicker: 'Para ter redundância se o cerco virar apagão',
    label: 'Farmácia caseira essencial',
  },
];

interface Props {
  theme?: 'dark' | 'light';
  title?: string;
  intro?: string;
  links?: ContraAtaqueLink[];
}

export default function ContraAtaquePratico({
  theme = 'dark',
  title = 'O Contra-Ataque Prático',
  intro = 'Indignação sem rota de saída vira impotência. Você acabou de entender a ameaça. Agora escolha por onde começa a defesa, hoje, ainda nesta semana.',
  links = DEFAULT_LINKS,
}: Props) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const dark = theme === 'dark';

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: EASE }}
      className="relative mx-auto max-w-5xl my-14 md:my-20 px-1"
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
          <Crosshair className="w-5 h-5" style={{ color: dark ? '#f59e0b' : '#0e3b3a' }} />
          <span
            className="font-mono text-[10px] tracking-[0.3em] uppercase font-bold"
            style={{ color: dark ? '#f59e0b' : '#0e3b3a' }}
          >
            Rota de fuga
          </span>
        </div>

        <h2
          className="text-2xl md:text-4xl font-black tracking-tight mb-4 leading-[1.05]"
          style={{ color: dark ? '#f5f1ea' : '#1c2624' }}
        >
          {title}
        </h2>

        <p
          className="text-sm md:text-base leading-relaxed mb-8 max-w-2xl"
          style={{ color: dark ? 'rgba(245,241,234,0.72)' : 'rgba(28,38,36,0.78)' }}
        >
          {intro}
        </p>

        <div className="grid gap-4 md:grid-cols-3">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="group flex flex-col gap-2 p-5 rounded-sm border transition-all duration-300 hover:-translate-y-0.5"
              style={
                dark
                  ? { borderColor: 'rgba(245,158,11,0.22)', backgroundColor: 'rgba(255,255,255,0.03)' }
                  : { borderColor: 'rgba(14,59,58,0.18)', backgroundColor: '#f4ede4' }
              }
            >
              <span
                className="font-mono text-[9px] tracking-[0.25em] uppercase"
                style={{ color: dark ? '#f59e0b' : '#b06a2c' }}
              >
                {l.kicker}
              </span>
              <span
                className="text-[15px] font-bold leading-snug"
                style={{ color: dark ? '#f5f1ea' : '#1c2624' }}
              >
                {l.label}
              </span>
              <ArrowRight
                className="w-4 h-4 mt-1 transition-transform group-hover:translate-x-1.5"
                style={{ color: dark ? '#f59e0b' : '#0e3b3a' }}
              />
            </Link>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
