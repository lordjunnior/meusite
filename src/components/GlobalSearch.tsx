import { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Search, X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { SEARCH_ENTRIES, fuzzySearch, type SearchEntry } from "@/lib/searchData";
import { trackQuerySettled, trackResultClick, trackSearchClosed } from "@/lib/intelligence/searchTelemetry";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const categoryColors: Record<string, string> = {
  Bitcoin: "text-amber-400",
  Autocustódia: "text-emerald-400",
  Economia: "text-sky-400",
  "Soberania Financeira": "text-violet-400",
  Saída: "text-rose-400",
  Infraestrutura: "text-cyan-400",
  Alertas: "text-red-400",
  Educação: "text-amber-300",
  Ferramentas: "text-teal-400",
  Filosofia: "text-indigo-400",
  "Soberania Orgânica": "text-green-400",
  "Tóxicos Ocultos": "text-orange-400",
};

const GlobalSearch = () => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchEntry[]>([]);
  const [selectedIdx, setSelectedIdx] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const settleTimer = useRef<ReturnType<typeof setTimeout>>();
  const navigate = useNavigate();

  // Keyboard shortcut
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      trackSearchClosed();
      setQuery("");
      setResults([]);
      setSelectedIdx(0);
    }
  }, [open]);

  useEffect(() => () => clearTimeout(settleTimer.current), []);

  const handleSearch = useCallback((q: string) => {
    setQuery(q);
    setSelectedIdx(0);
    const found = fuzzySearch(q, SEARCH_ENTRIES);
    setResults(found);

    // Sinal de demanda: só registra quando a digitação para, nunca fragmento por fragmento.
    clearTimeout(settleTimer.current);
    settleTimer.current = setTimeout(() => trackQuerySettled(q, found.length), 900);
  }, []);

  const handleSelect = (entry: SearchEntry) => {
    clearTimeout(settleTimer.current);
    trackQuerySettled(query, results.length);
    trackResultClick(entry.path);
    setOpen(false);
    navigate(entry.path);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIdx((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIdx((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && results[selectedIdx]) {
      handleSelect(results[selectedIdx]);
    }
  };

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setOpen(true)}
        aria-label="Buscar em todo o site"
        className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-white/[0.04] border border-amber-300/25 text-muted-foreground hover:text-foreground hover:border-amber-300/50 hover:bg-white/[0.07] transition-all text-sm group shadow-[0_0_0_1px_rgba(255,255,255,0.02)]"
      >
        <Search className="w-4 h-4 text-amber-300/80 group-hover:text-amber-300 transition-colors" />
        <span className="flex-1 text-left text-xs font-semibold tracking-wide">
          Buscar em 220 páginas
        </span>
        <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-secondary text-[9px] font-mono text-muted-foreground border border-border/50">
          ⌘K
        </kbd>
      </button>


      {/* Search Modal */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] px-4"
            onClick={() => setOpen(false)}
          >
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.3, ease: EASE }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-lg"
            >
              <div className="rounded-xl border border-border/50 bg-card/95 backdrop-blur-xl shadow-2xl overflow-hidden">
                {/* Input */}
                <div className="flex items-center gap-3 px-4 py-3 border-b border-border/50">
                  <Search className="w-4 h-4 text-muted-foreground shrink-0" />
                  <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={(e) => handleSearch(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Buscar conteúdo, ferramentas, artigos..."
                    className="flex-1 bg-transparent text-foreground text-sm placeholder:text-muted-foreground focus:outline-none"
                  />
                  <button onClick={() => setOpen(false)} className="p-1 rounded hover:bg-secondary/50 text-muted-foreground">
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Results */}
                <div className="max-h-[50vh] overflow-y-auto">
                  {query && results.length === 0 && (
                    <div className="px-4 py-8 text-center">
                      <p className="text-muted-foreground text-sm">Nenhum resultado para "<span className="text-foreground">{query}</span>"</p>
                    </div>
                  )}

                  {results.map((entry, i) => (
                    <button
                      key={entry.path}
                      onClick={() => handleSelect(entry)}
                      onMouseEnter={() => setSelectedIdx(i)}
                      className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${
                        i === selectedIdx ? "bg-primary/10" : "hover:bg-secondary/30"
                      }`}
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className={`text-[9px] font-mono tracking-wider uppercase ${categoryColors[entry.category] || "text-muted-foreground"}`}>
                            {entry.category}
                          </span>
                        </div>
                        <p className="text-sm font-medium text-foreground truncate">{entry.title}</p>
                        <p className="text-xs text-muted-foreground truncate">{entry.description}</p>
                      </div>
                      <ArrowRight className={`w-3.5 h-3.5 shrink-0 transition-opacity ${i === selectedIdx ? "text-primary opacity-100" : "opacity-0"}`} />
                    </button>
                  ))}

                  {!query && (
                    <div className="px-4 py-6 text-center">
                      <p className="text-muted-foreground text-xs">Digite para buscar em {SEARCH_ENTRIES.length}+ páginas</p>
                      <p className="text-muted-foreground/50 text-[10px] mt-1 font-mono">ESC para fechar · ↑↓ para navegar · ENTER para abrir</p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default GlobalSearch;
