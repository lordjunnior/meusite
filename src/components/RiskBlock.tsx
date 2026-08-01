import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { AlertTriangle } from "lucide-react";
import imgRisco from "@/assets/risco-vulnerabilidade.jpg";

interface RiskBlockProps {
  title: string;
  consequences: string[];
  className?: string;
  /** Use "dark" for dark-themed pages, "light" for organic/light pages */
  theme?: "dark" | "light";
  showImage?: boolean;
}

const RiskBlock = ({ title, consequences, className = "", theme = "dark", showImage = false }: RiskBlockProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const isDark = theme === "dark";

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`relative overflow-hidden rounded-sm ${className}`}
    >
      {/* Optional image */}
      {showImage && (
        <div className="relative w-full h-48 md:h-56 overflow-hidden">
          <img
            src={imgRisco}
            alt="Vulnerabilidade sem preparação — pessoa em encruzilhada na névoa"
            className="w-full h-full object-cover" loading="lazy" decoding="async" />
          <div className={`absolute inset-0 ${isDark ? 'bg-gradient-to-b from-transparent to-card' : 'bg-gradient-to-b from-transparent to-stone-100'}`} />
        </div>
      )}

      <div className={`p-8 md:p-10 border ${isDark
        ? 'bg-card/80 border-destructive/20'
        : 'bg-red-50/60 border-red-200/50'
      } ${showImage ? '' : 'rounded-sm'}`}>
        <div className="flex items-start gap-4 mb-6">
          <div className={`p-2.5 rounded-sm shrink-0 ${isDark ? 'bg-destructive/10' : 'bg-red-100/80'}`}>
            <AlertTriangle className={`w-5 h-5 ${isDark ? 'text-destructive' : 'text-red-600'}`} />
          </div>
          <div>
            <p className={`font-mono text-[9px] tracking-[0.3em] uppercase mb-2 ${isDark ? 'text-destructive/70' : 'text-red-500'}`}>
              Avaliação de risco
            </p>
            <h4 className={`text-lg font-bold tracking-tight ${isDark ? 'text-foreground' : 'text-stone-800'}`}>
              {title}
            </h4>
          </div>
        </div>

        <ul className="space-y-3">
          {consequences.map((item, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.1 + i * 0.08 }}
              className={`flex items-start gap-3 text-sm leading-relaxed ${isDark ? 'text-muted-foreground' : 'text-stone-600'}`}
            >
              <span className={`mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 ${isDark ? 'bg-destructive/50' : 'bg-red-400/60'}`} />
              {item}
            </motion.li>
          ))}
        </ul>

        <p className={`mt-6 text-xs font-medium italic ${isDark ? 'text-muted-foreground/60' : 'text-stone-400'}`}>
          Autonomia não é só benefício. É prevenção de vulnerabilidade.
        </p>
      </div>
    </motion.div>
  );
};

export default RiskBlock;
