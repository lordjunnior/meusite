import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Menu, X, ChevronRight, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useReadingProgress } from "@/hooks/useReadingProgress";
import { useSiloProgress } from "@/hooks/useSiloProgress";
import GlobalSearch from "@/components/GlobalSearch";
import { topNavItems, navGroups, type NavItem } from "@/lib/sidebarNavigation";

const MobileNav = () => {
  const [open, setOpen] = useState(false);
  const [openGroups, setOpenGroups] = useState<Set<string>>(new Set());
  const navigate = useNavigate();
  const location = useLocation();
  const { level, label, percent } = useReadingProgress();
  const siloProgress = useSiloProgress();

  const toggleGroup = (groupLabel: string) => {
    setOpenGroups(prev => {
      const next = new Set(prev);
      if (next.has(groupLabel)) next.delete(groupLabel);
      else next.add(groupLabel);
      return next;
    });
  };

  const handleNav = (item: NavItem) => {
    setOpen(false);
    if (item.route) {
      navigate(item.route);
    } else if (item.targetId) {
      if (location.pathname !== "/") {
        navigate("/");
        setTimeout(() => {
          document.getElementById(item.targetId!)?.scrollIntoView({ behavior: "smooth" });
        }, 300);
      } else {
        document.getElementById(item.targetId!)?.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const isActive = (route?: string) => route && location.pathname === route;

  return (
    <div className="lg:hidden fixed top-[46px] left-4 z-50">
      <button
        onClick={() => setOpen(!open)}
        className="w-10 h-10 rounded-lg bg-card/90 backdrop-blur-md border border-border flex items-center justify-center text-foreground"
      >
        {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      <div className="lg:hidden fixed top-[46px] right-4 z-50">
        <GlobalSearch />
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-12 left-0 w-[300px] bg-card/95 backdrop-blur-xl border border-border rounded-xl p-3 shadow-2xl max-h-[75vh] overflow-y-auto"
          >
            {/* Top items */}
            {topNavItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNav(item)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-sm ${
                  isActive(item.route)
                    ? "bg-primary/10 text-primary font-medium"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                }`}
              >
                {item.icon && (
                  <div className="relative">
                    <item.icon className={`w-4 h-4 ${item.alert ? "text-destructive" : ""}`} />
                    {item.alert && (
                      <span className="absolute -top-1 -right-1 flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-destructive/60 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-destructive" />
                      </span>
                    )}
                  </div>
                )}
                <span>{item.label}</span>
              </button>
            ))}

            <div className="h-px bg-border/30 my-2" />

            {/* Accordion Groups with dot connectors */}
            {navGroups.map((group) => {
              const isGroupOpen = openGroups.has(group.label);
              const progress = siloProgress[group.label];

              return (
                <div key={group.label} className="mb-0.5">
                  <button
                    onClick={() => toggleGroup(group.label)}
                    className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                      isGroupOpen
                        ? "bg-card border border-border/40 text-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary/30 border border-transparent"
                    }`}
                  >
                    <div className={`w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0 ${
                      isGroupOpen ? "bg-primary/10" : "bg-secondary/50"
                    }`}>
                      <group.icon className={`w-3.5 h-3.5 ${group.color || ""} flex-shrink-0`} />
                    </div>
                    <div className="flex-1 min-w-0 text-left">
                      <span className="block truncate">{group.label}</span>
                      {progress && progress.percent > 0 && (
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <div className="flex-1 h-[2px] bg-secondary/60 rounded-full overflow-hidden">
                            <div className="h-full gradient-gold rounded-full" style={{ width: `${progress.percent}%` }} />
                          </div>
                          <span className="font-mono text-[7px] text-gold/70">{progress.percent}%</span>
                        </div>
                      )}
                    </div>
                    <span className="font-mono text-[9px] text-muted-foreground/40">{group.items.length}</span>
                    <ChevronRight className={`w-3.5 h-3.5 text-muted-foreground/40 transition-transform duration-200 ${isGroupOpen ? "rotate-90" : ""}`} />
                  </button>

                  <AnimatePresence initial={false}>
                    {isGroupOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="ml-5 pl-0 py-1 relative">
                          <div className="absolute left-0 top-1 bottom-1 w-px bg-border/30" />
                          {group.items.map((item) => {
                            const active = isActive(item.route);
                            return (
                              <div key={item.label}>
                                {item.section && (
                                  <p className="mb-1 mt-3 px-4 text-[9px] font-bold uppercase tracking-[0.18em] text-muted-foreground/50 first:mt-1">
                                    {item.section}
                                  </p>
                                )}
                                <button
                                  onClick={() => handleNav(item)}
                                  className={`relative flex w-full min-h-11 items-center gap-2 rounded-md py-[6px] pl-4 pr-2 text-[12.5px] transition-all ${
                                    active
                                      ? "text-gold font-semibold"
                                      : "text-muted-foreground/70 hover:text-foreground hover:bg-secondary/30"
                                  }`}
                                >
                                  <div className={`absolute left-[-2px] top-1/2 -translate-y-1/2 w-[5px] h-[5px] rounded-full border ${
                                    active
                                      ? "bg-gold border-gold shadow-[0_0_6px_rgba(255,215,0,0.4)]"
                                      : "bg-card border-border/50"
                                  }`} />
                                  <span className="flex-1 text-left leading-tight">{item.label}</span>
                                  {item.badge && (
                                    <span className={`shrink-0 rounded-full px-1.5 py-0.5 font-mono text-[8px] ${
                                      item.badge === "Dossiê"
                                        ? "bg-amber-500/15 text-amber-400 animate-pulse"
                                        : item.badge === "Em breve"
                                        ? "bg-secondary text-muted-foreground"
                                        : "bg-primary/15 text-primary"
                                    }`}>
                                      {item.badge}
                                    </span>
                                  )}
                                </button>
                              </div>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}

            <div className="h-px bg-border/30 my-2" />

            {/* Reading level + Apoio */}
            <div className="px-3 py-2">
              <div className="flex items-center justify-between mb-1">
                <span className="font-mono text-[8px] tracking-wider text-muted-foreground">NÍVEL {level}</span>
                <span className="font-mono text-[8px] text-gold">{percent}%</span>
              </div>
              <p className="text-[9px] text-foreground font-medium mb-1.5">{label}</p>
              <div className="h-[2px] bg-secondary rounded-full overflow-hidden">
                <div className="h-full gradient-gold rounded-full transition-all duration-700" style={{ width: `${percent}%` }} />
              </div>
            </div>
            <button
              onClick={() => handleNav({ targetId: "apoio", label: "Apoio" })}
              className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl border border-gold-dim/40 text-gold text-sm font-semibold"
            >
              <Zap className="w-4 h-4" />
              Apoio Lightning
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MobileNav;
