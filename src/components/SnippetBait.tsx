import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import snippetImage from '@/assets/card-snippet-bait.webp';

const APPLE_EASE = [0.22, 1, 0.36, 1] as const;

interface SnippetBaitProps {
  text: string;
  cta?: string;
  href?: string;
}

const SnippetBait = ({ text, cta = 'Entenda a blindagem →', href = '/autocustodia' }: SnippetBaitProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, ease: APPLE_EASE }}
      className="relative my-10 md:my-16"
    >
      <div className="relative rounded-2xl border border-amber-500/20 overflow-hidden bg-card/40 backdrop-blur-md">
        {/* Top accent line */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-amber-400/50 to-transparent z-10" />

        {/* Balanced 50/50 grid with gap for breathing */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          {/* TEXT COLUMN — generous padding, relaxed leading */}
          <div className="relative p-8 md:p-10 lg:p-14 flex flex-col justify-center">
            {/* Atmospheric glow */}
            <div className="absolute -top-16 -left-16 w-48 h-48 rounded-full bg-amber-500/8 blur-3xl pointer-events-none" />

            <div className="relative space-y-5">
              {/* Tactical tag — mono, aggressive tracking */}
              <p className="font-mono text-[9px] tracking-[0.3em] text-amber-500/70 uppercase">
                [ALERTA PATRIMONIAL]
              </p>

              {/* Body text — geometric font, relaxed leading, proper size */}
              <p className="text-foreground/90 text-base leading-8">
                {text}
              </p>

              {cta && href && (
                <Link
                  to={href}
                  className="inline-flex items-center gap-2.5 mt-2 px-6 py-3 rounded-lg 
                    bg-amber-500/10 border border-amber-500/25 
                    hover:bg-amber-500/20 hover:border-amber-400/40 
                    text-amber-400 text-xs font-bold tracking-[0.15em] uppercase 
                    transition-all duration-500 group"
                >
                  {cta}
                  <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                </Link>
              )}
            </div>
          </div>

          {/* IMAGE COLUMN — real photography, full bleed */}
          <div className="relative min-h-[240px] md:min-h-[320px]">
            <img
              src={snippetImage}
              alt="Cédulas brasileiras em chamas — metáfora da inflação"
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
            />
            {/* Desktop: fade from left for seamless blend */}
            <div className="absolute inset-0 bg-gradient-to-r from-card/80 via-card/30 to-transparent md:block hidden" />
            {/* Mobile: fade from top */}
            <div className="absolute inset-0 bg-gradient-to-b from-card/60 via-transparent to-transparent md:hidden" />
          </div>
        </div>

        {/* Bottom accent line */}
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-amber-500/20 to-transparent z-10" />
      </div>
    </motion.div>
  );
};

export default SnippetBait;
