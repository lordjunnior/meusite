import { useMemo, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence, useScroll, useMotionValueEvent, useReducedMotion } from "framer-motion";
import { ChevronRight, ArrowLeft, ArrowRight, Home } from "lucide-react";
import { getTrail } from "@/lib/trail";

const EASE = [0.22, 1, 0.36, 1] as const;
const HIDDEN_ON = ["/soberania-organica", "/soberania-organica/comece-aqui", "/dolar-virtual"];

/**
 * Espinha de navegação global.
 *
 * 1. Breadcrumb (Início / Silo / Página), centralizado na área útil.
 * 2. Posição na trilha (5 / 7) com barra de progresso.
 * 3. Anterior e próximo dentro do mesmo silo.
 *
 * Os dois docks se centralizam na área de leitura e só descontam a barra
 * lateral quando ela existe na página, para nunca ficarem tortos.
 * O dock inferior aparece ao rolar para cima ou no fim da página, para não
 * cobrir o conteúdo durante a leitura.
 */
const TrailNav = () => {
  const location = useLocation();
  const trail = useMemo(() => getTrail(location.pathname), [location.pathname]);
  const { scrollY, scrollYProgress } = useScroll();
  const reduce = useReducedMotion();
  const lastY = useRef(0);
  const [showCrumb, setShowCrumb] = useState(false);
  const [showTrail, setShowTrail] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    const progress = scrollYProgress.get();
    const goingUp = y < lastY.current - 4;
    const goingDown = y > lastY.current + 4;
    setShowCrumb(progress > 0.04);
    if (progress < 0.3) setShowTrail(false);
    else if (progress > 0.96 || goingUp) setShowTrail(true);
    else if (goingDown) setShowTrail(false);
    lastY.current = y;
  });

  if (!trail || HIDDEN_ON.includes(location.pathname.replace(/\/+$/, ""))) return null;

  const pct = trail.total > 1 ? (trail.index / trail.total) * 100 : 100;
  const hasSiblings = Boolean(trail.prev || trail.next);
  const offset = reduce ? 0 : 12;

  return (
    <>
      <div className="trail-dock pointer-events-none fixed inset-x-0 top-[48px] z-[54] flex justify-center">
        <AnimatePresence>
          {showCrumb && (
            <motion.nav
              aria-label="Você está aqui"
              initial={{ opacity: 0, y: -offset }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -offset }}
              transition={{ duration: 0.35, ease: EASE }}
              className="pointer-events-auto max-w-full"
            >
              <ol className="flex h-9 items-center gap-2 rounded-full border border-border/50 bg-background/90 px-4 shadow-lg backdrop-blur-xl">
                <li className="flex shrink-0 items-center">
                  <Link
                    to="/"
                    className="inline-flex items-center gap-1.5 rounded-full text-[10px] font-semibold uppercase leading-none tracking-[0.18em] text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <Home className="h-3.5 w-3.5" aria-hidden />
                    <span className="hidden sm:inline">Início</span>
                  </Link>
                </li>
                <li aria-hidden className="hidden shrink-0 items-center sm:flex">
                  <ChevronRight className="h-3 w-3 text-muted-foreground/50" />
                </li>
                <li className="hidden min-w-0 items-center sm:flex">
                  <span className="truncate text-[10px] font-semibold uppercase leading-none tracking-[0.18em] text-muted-foreground">
                    {trail.groupLabel}
                  </span>
                </li>
                <li aria-hidden className="flex shrink-0 items-center">
                  <ChevronRight className="h-3 w-3 text-muted-foreground/50" />
                </li>
                <li className="flex min-w-0 items-center">
                  <span
                    aria-current="page"
                    className="truncate text-[10px] font-semibold uppercase leading-none tracking-[0.18em] text-foreground"
                  >
                    {trail.currentLabel}
                  </span>
                </li>
              </ol>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>

      <div className="trail-dock trail-dock--bottom pointer-events-none fixed inset-x-0 bottom-4 z-[54] flex justify-center">
        <AnimatePresence>
          {showTrail && hasSiblings && (
            <motion.nav
              aria-label="Trilha do silo"
              initial={{ opacity: 0, y: offset * 2 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: offset * 2 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="pointer-events-auto w-full max-w-[44rem]"
            >
              <div className="overflow-hidden rounded-2xl border border-border/50 bg-background/90 shadow-2xl backdrop-blur-xl">
                <div className="h-[3px] w-full bg-border/40">
                  <div className="h-full bg-gold/70 transition-[width] duration-500" style={{ width: `${pct}%` }} />
                </div>

                <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 px-4 py-2.5">
                  {trail.prev ? (
                    <Link
                      to={trail.prev.route}
                      className="group flex min-w-0 items-center gap-2 rounded-lg text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      <ArrowLeft className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:-translate-x-1 group-hover:text-foreground motion-reduce:transition-none" aria-hidden />
                      <span className="min-w-0">
                        <span className="block font-mono text-[9px] uppercase leading-tight tracking-[0.22em] text-muted-foreground/70">Anterior</span>
                        <span className="block truncate text-xs font-semibold leading-tight text-muted-foreground transition-colors group-hover:text-foreground">
                          {trail.prev.label}
                        </span>
                      </span>
                    </Link>
                  ) : (
                    <span />
                  )}

                  <span className="flex flex-col items-center justify-center px-1 text-center">
                    <span className="font-mono text-[10px] uppercase leading-tight tracking-[0.2em] text-gold/90">
                      {trail.index} / {trail.total}
                    </span>
                    <span className="hidden max-w-[10rem] truncate text-[9px] uppercase leading-tight tracking-[0.18em] text-muted-foreground/70 sm:block">
                      {trail.groupLabel}
                    </span>
                  </span>

                  {trail.next ? (
                    <Link
                      to={trail.next.route}
                      className="group flex min-w-0 items-center justify-end gap-2 rounded-lg text-right focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      <span className="min-w-0">
                        <span className="block font-mono text-[9px] uppercase leading-tight tracking-[0.22em] text-muted-foreground/70">Próximo</span>
                        <span className="block truncate text-xs font-semibold leading-tight text-muted-foreground transition-colors group-hover:text-foreground">
                          {trail.next.label}
                        </span>
                      </span>
                      <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-foreground motion-reduce:transition-none" aria-hidden />
                    </Link>
                  ) : (
                    <span />
                  )}
                </div>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default TrailNav;
