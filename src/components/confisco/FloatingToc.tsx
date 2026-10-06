import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { List } from "lucide-react";

interface TocItem {
  id: string;
  label: string;
}

const items: TocItem[] = [
  { id: "cap-1", label: "O Cenário" },
  { id: "cap-2", label: "A Noite Antes" },
  { id: "cap-3", label: "O Dia D" },
  { id: "cap-4", label: "Consequências" },
  { id: "cap-5", label: "Dinheiro Perdido" },
  { id: "cap-6", label: "Mecanismo Legal" },
  { id: "cap-7", label: "A Lição" },
  { id: "transicao", label: "Alternativa" },
  { id: "faq", label: "FAQ" },
];

const FloatingToc = () => {
  const [activeId, setActiveId] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 600);

      const sections = items.map((item) => ({
        id: item.id,
        el: document.getElementById(item.id),
      }));

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = sections[i].el;
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200) {
            setActiveId(sections[i].id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setIsOpen(false);
    }
  };

  return (
    <><span data-page-toc hidden /><AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.3 }}
          className="fixed right-4 top-1/2 -translate-y-1/2 z-40 hidden lg:block"
        >
          {/* Desktop: always visible */}
          <nav
            className="bg-card/80 backdrop-blur-md border border-border/50 rounded-xl p-3 space-y-1 shadow-2xl"
            aria-label="Sumário"
          >
            <p className="font-mono text-[8px] tracking-[0.3em] uppercase text-muted-foreground/60 px-2 pb-1">
              SUMÁRIO
            </p>
            {items.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`block w-full text-left text-xs px-3 py-1.5 rounded-lg transition-all duration-200 ${
                  activeId === item.id
                    ? "bg-destructive/10 text-destructive font-semibold"
                    : "text-muted-foreground hover:text-foreground hover:bg-card"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </motion.div>
      )}

      {/* Mobile: toggle button */}
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="fixed right-4 bottom-4 z-40 lg:hidden"
        >
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-12 h-12 rounded-full bg-card border border-border shadow-xl flex items-center justify-center"
            aria-label="Abrir sumário"
          >
            <List className="w-5 h-5 text-foreground" />
          </button>
          <AnimatePresence>
            {isOpen && (
              <motion.nav
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute bottom-14 right-0 bg-card/95 backdrop-blur-md border border-border rounded-xl p-3 space-y-1 shadow-2xl min-w-[180px]"
                aria-label="Sumário"
              >
                {items.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollTo(item.id)}
                    className={`block w-full text-left text-xs px-3 py-2 rounded-lg transition-all duration-200 ${
                      activeId === item.id
                        ? "bg-destructive/10 text-destructive font-semibold"
                        : "text-muted-foreground hover:text-foreground hover:bg-card"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </motion.nav>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence></>
  );
};

export default FloatingToc;
