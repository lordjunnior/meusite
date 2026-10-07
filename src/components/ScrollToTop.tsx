import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { ArrowUp, ArrowDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const ScrollToTop = () => {
  const location = useLocation();
  const [visible, setVisible] = useState(false);
  const [atBottom, setAtBottom] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 600);
      const scrollBottom = window.innerHeight + window.scrollY;
      setAtBottom(scrollBottom >= document.body.scrollHeight - 100);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollDown = () => {
    window.scrollBy({ top: window.innerHeight * 0.85, behavior: "smooth" });
  };

  if (location.pathname.replace(/\/+$/, "") === "/dolar-virtual") return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-6 right-6 z-50 flex flex-col gap-2"
        >
          {/* Scroll Down */}
          {!atBottom && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={scrollDown}
              className="w-12 h-12 rounded-full bg-card/90 backdrop-blur-md border border-border hover:border-primary/50 flex items-center justify-center text-muted-foreground hover:text-primary transition-colors duration-300 shadow-lg hover:shadow-primary/20"
              aria-label="Descer a página"
            >
              <ArrowDown className="w-5 h-5" />
            </motion.button>
          )}

          {/* Scroll to Top */}
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="w-12 h-12 rounded-full bg-card/90 backdrop-blur-md border border-border hover:border-primary/50 flex items-center justify-center text-muted-foreground hover:text-primary transition-colors duration-300 shadow-lg hover:shadow-primary/20"
            aria-label="Voltar ao topo"
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTop;
