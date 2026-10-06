import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { List } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

export interface TocItem {
  id: string;
  label: string;
  num?: string;
}

interface PageFloatingTocProps {
  items: TocItem[];
  accentColor?: string;
  /** true quando gerado automaticamente; o marcador evita sumário duplicado. */
  auto?: boolean;
}

const PageFloatingToc = ({ items, accentColor = "orange", auto = false }: PageFloatingTocProps) => {
  const [active, setActive] = useState("");
  const [show, setShow] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrollYProgress } = useScroll();

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setShow(v > 0.06 && v < 0.96);
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-30% 0px -60% 0px" }
    );
    items.forEach((c) => {
      const el = document.getElementById(c.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [items]);

  const colorMap: Record<string, { dot: string; text: string; glow: string }> = {
    orange: { dot: "bg-orange-400", text: "text-orange-400", glow: "shadow-[0_0_12px_rgba(249,115,22,0.5)]" },
    emerald: { dot: "bg-emerald-400", text: "text-emerald-400", glow: "shadow-[0_0_12px_rgba(52,211,153,0.5)]" },
    amber: { dot: "bg-amber-400", text: "text-amber-400", glow: "shadow-[0_0_12px_rgba(251,191,36,0.5)]" },
    cyan: { dot: "bg-cyan-400", text: "text-cyan-400", glow: "shadow-[0_0_12px_rgba(34,211,238,0.5)]" },
    red: { dot: "bg-red-400", text: "text-red-400", glow: "shadow-[0_0_12px_rgba(248,113,113,0.5)]" },
    blue: { dot: "bg-blue-400", text: "text-blue-400", glow: "shadow-[0_0_12px_rgba(96,165,250,0.5)]" },
    yellow: { dot: "bg-yellow-400", text: "text-yellow-400", glow: "shadow-[0_0_12px_rgba(250,204,21,0.5)]" },
    stone: { dot: "bg-stone-400", text: "text-stone-400", glow: "shadow-[0_0_12px_rgba(168,162,158,0.5)]" },
  };

  const c = colorMap[accentColor] || colorMap.orange;

  return (
    <>
      {!auto && <span data-page-toc hidden />}
      {/* Desktop */}
      <AnimatePresence>
        {show && (
          <motion.nav
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 24 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="fixed right-6 top-1/2 -translate-y-1/2 z-[55] hidden xl:flex 2xl:hidden flex-col gap-3"
          >
            {items.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
                className={`group flex items-center gap-3 transition-all duration-400 ${
                  active === item.id ? "opacity-100" : "opacity-25 hover:opacity-60"
                }`}
              >
                <span
                  className={`block transition-all duration-400 rounded-full ${
                    active === item.id ? `w-3 h-3 ${c.dot} ${c.glow}` : "w-2 h-2 bg-stone-600"
                  }`}
                />
                <span
                  className={`text-[9px] font-bold tracking-[0.15em] uppercase transition-colors duration-400 ${
                    active === item.id ? c.text : "text-stone-600"
                  }`}
                >
                  {item.num ? `${item.num} · ` : ""}{item.label}
                </span>
              </a>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Mobile toggle */}
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed right-4 bottom-20 z-[55] xl:hidden"
          >
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="w-11 h-11 rounded-full bg-card/90 backdrop-blur-md border border-border/50 shadow-xl flex items-center justify-center"
              aria-label="Sumário"
            >
              <List className="w-5 h-5 text-foreground" />
            </button>
            <AnimatePresence>
              {mobileOpen && (
                <motion.nav
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute bottom-14 right-0 bg-card/95 backdrop-blur-xl border border-border/50 rounded-xl p-3 space-y-1 shadow-2xl min-w-[200px] max-h-[60vh] overflow-y-auto"
                >
                  <p className="font-mono text-[8px] tracking-[0.3em] uppercase text-muted-foreground/60 px-2 pb-1">SUMÁRIO</p>
                  {items.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth", block: "start" });
                        setMobileOpen(false);
                      }}
                      className={`block w-full text-left text-xs px-3 py-2 rounded-lg transition-all duration-200 ${
                        active === item.id
                          ? `bg-white/5 ${c.text} font-semibold`
                          : "text-muted-foreground hover:text-foreground hover:bg-white/[0.03]"
                      }`}
                    >
                      {item.num ? `${item.num} · ` : ""}{item.label}
                    </button>
                  ))}
                </motion.nav>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default PageFloatingToc;
