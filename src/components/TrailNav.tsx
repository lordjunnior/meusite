import { useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { ChevronRight, ArrowLeft, ArrowRight, Home } from "lucide-react";
import { useState } from "react";
import { getTrail } from "@/lib/trail";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Espinha de navegação global.
 *
 * Aparece em qualquer página que exista na barra lateral, sem precisar
 * editar a página. Entrega três coisas:
 * 1. Breadcrumb visível (Início / Silo / Página).
 * 2. Indicador de posição na trilha (Passo 3 de 9) com barra de progresso.
 * 3. Anterior e próximo dentro do mesmo silo.
 */
const TrailNav = () => {
  const location = useLocation();
  const trail = useMemo(() => getTrail(location.pathname), [location.pathname]);
  const { scrollYProgress } = useScroll();
  const [showCrumb, setShowCrumb] = useState(false);
  const [showTrail, setShowTrail] = useState(false);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setShowCrumb(v > 0.04);
    setShowTrail(v > 0.55);
  });

  if (!trail) return null;

  const pct = trail.total > 1 ? (trail.index / trail.total) * 100 : 100;
  const hasSiblings = Boolean(trail.prev || trail.next);

  return (
    <>
      {/* Breadcrumb fixo */}
      <AnimatePresence>
        {showCrumb && (
          <motion.nav
            aria-label="Você está aqui"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="fixed top-[44px] left-3 lg:left-[296px] z-[54] max-w-[calc(100vw-1.5rem)] lg:max-w-[min(52rem,calc(100vw-320px))]"
          >
            <div className="flex items-center gap-1.5 rounded-full border border-border/40 bg-background/85 backdrop-blur-xl px-3 py-1.5 shadow-lg overflow-hidden">
              <Link
                to="/"
                className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground hover:text-foreground transition-colors shrink-0"
              >
                <Home className="w-3 h-3" />
                <span className="hidden sm:inline">Início</span>
              </Link>
              <ChevronRight className="w-3 h-3 text-muted-foreground/40 shrink-0" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground/80 truncate max-w-[9rem] sm:max-w-none">
                {trail.groupLabel}
              </span>
              <ChevronRight className="w-3 h-3 text-muted-foreground/40 shrink-0" />
              <span
                aria-current="page"
                className="text-[10px] font-semibold uppercase tracking-[0.18em] text-foreground truncate"
              >
                {trail.currentLabel}
              </span>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Trilha: posição, anterior e próximo */}
      <AnimatePresence>
        {showTrail && hasSiblings && (
          <motion.nav
            aria-label="Trilha do silo"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.45, ease: EASE }}
            className="fixed bottom-4 left-3 right-3 lg:left-[296px] lg:right-auto lg:w-[min(46rem,calc(100vw-340px))] z-[54]"
          >
            <div className="rounded-2xl border border-border/40 bg-background/90 backdrop-blur-xl shadow-2xl overflow-hidden">
              <div className="h-[3px] w-full bg-white/5">
                <div
                  className="h-full bg-gradient-to-r from-amber-400/70 to-amber-200/70 transition-all duration-500"
                  style={{ width: `${pct}%` }}
                />
              </div>

              <div className="flex items-center gap-3 px-3 py-2.5">
                {trail.prev ? (
                  <Link
                    to={trail.prev.route}
                    className="group flex min-w-0 flex-1 items-center gap-2 text-left"
                  >
                    <ArrowLeft className="w-4 h-4 shrink-0 text-muted-foreground group-hover:-translate-x-1 group-hover:text-foreground transition-all" />
                    <span className="min-w-0">
                      <span className="block font-mono text-[8px] uppercase tracking-[0.25em] text-muted-foreground/60">
                        Anterior
                      </span>
                      <span className="block truncate text-xs font-semibold text-muted-foreground group-hover:text-foreground transition-colors">
                        {trail.prev.label}
                      </span>
                    </span>
                  </Link>
                ) : (
                  <span className="flex-1" />
                )}

                <span className="shrink-0 px-2 text-center">
                  <span className="block font-mono text-[9px] uppercase tracking-[0.2em] text-amber-300/80">
                    {trail.index} / {trail.total}
                  </span>
                  <span className="hidden sm:block max-w-[11rem] truncate text-[9px] uppercase tracking-[0.18em] text-muted-foreground/60">
                    {trail.groupLabel}
                  </span>
                </span>

                {trail.next ? (
                  <Link
                    to={trail.next.route}
                    className="group flex min-w-0 flex-1 items-center justify-end gap-2 text-right"
                  >
                    <span className="min-w-0">
                      <span className="block font-mono text-[8px] uppercase tracking-[0.25em] text-muted-foreground/60">
                        Próximo
                      </span>
                      <span className="block truncate text-xs font-semibold text-muted-foreground group-hover:text-foreground transition-colors">
                        {trail.next.label}
                      </span>
                    </span>
                    <ArrowRight className="w-4 h-4 shrink-0 text-muted-foreground group-hover:translate-x-1 group-hover:text-foreground transition-all" />
                  </Link>
                ) : (
                  <span className="flex-1" />
                )}
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
};

export default TrailNav;
