import { useState, useEffect } from "react";
import { ChevronRight, Zap } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import SovereignHeader from "@/components/Sidebar/SovereignHeader";
import GlobalSearch from "@/components/GlobalSearch";
import { topNavItems, navGroups, type NavItem } from "@/lib/sidebarNavigation";
import { useSiloProgress } from "@/hooks/useSiloProgress";

const SIDEBAR_STATE_KEY = "bp_sidebar_open_groups";

function loadOpenGroups(): string[] {
  try {
    const raw = localStorage.getItem(SIDEBAR_STATE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveOpenGroups(groups: string[]) {
  localStorage.setItem(SIDEBAR_STATE_KEY, JSON.stringify(groups));
}

const AppSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const siloProgress = useSiloProgress();

  const [openGroups, setOpenGroups] = useState<Set<string>>(() => {
    const saved = loadOpenGroups();
    const initial = new Set<string>(saved);
    // Auto-open the group containing the current route
    for (const group of navGroups) {
      if (group.items.some(item => item.route && location.pathname.startsWith(item.route))) {
        initial.add(group.label);
      }
    }
    return initial;
  });

  useEffect(() => {
    saveOpenGroups(Array.from(openGroups));
  }, [openGroups]);

  const toggleGroup = (label: string) => {
    setOpenGroups(prev => {
      const next = new Set(prev);
      if (next.has(label)) next.delete(label);
      else next.add(label);
      return next;
    });
  };

  const handleNav = (item: NavItem) => {
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

  const handleApoio = () => {
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        document.getElementById("apoio")?.scrollIntoView({ behavior: "smooth" });
      }, 300);
    } else {
      document.getElementById("apoio")?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const isActive = (route?: string) => route && location.pathname === route;

  return (
    <aside className="hidden lg:flex fixed left-0 top-[36px] bottom-0 w-[280px] z-50 flex-col border-r border-border/30 bg-[#060810]/95 backdrop-blur-2xl">
      {/* ── Identity Header — Sovereign Presence ── */}
      <SovereignHeader />



      {/* ── Search ── */}
      <div className="px-3 py-2 border-b border-border/30">
        <GlobalSearch />
      </div>




      {/* ── Scrollable Navigation ── */}
      <nav className="flex-1 overflow-y-auto px-2 py-3 space-y-0.5 scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent">
        {/* Priority items */}
        {topNavItems.map((item) => (
          <button
            key={item.label}
            onClick={() => handleNav(item)}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg transition-all duration-200 group text-[13px] ${
              isActive(item.route)
                ? "bg-primary/10 text-primary font-semibold"
                : "text-muted-foreground hover:text-foreground hover:bg-secondary/40"
            }`}
          >
            {item.icon && (
              <div className="relative flex-shrink-0">
                <item.icon className={`w-4 h-4 ${item.alert ? "text-destructive/80" : "group-hover:text-gold"} transition-colors`} />
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

        <div className="h-px bg-border/20 mx-2 my-3" />

        {/* ── Mega-Silo Accordion Groups ── */}
        {navGroups.map((group) => {
          const isOpen = openGroups.has(group.label);
          const hasActiveChild = group.items.some(item => isActive(item.route));
          const progress = siloProgress[group.label];

          return (
            <div key={group.label} className="mb-1">
              {/* Silo Header Card */}
              <button
                onClick={() => toggleGroup(group.label)}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl transition-all duration-300 text-[13px] group ${
                  isOpen
                    ? "bg-card/80 border border-border/40 shadow-sm"
                    : hasActiveChild
                    ? "bg-secondary/20 border border-transparent"
                    : "border border-transparent hover:bg-secondary/20"
                }`}
              >
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                  isOpen ? "bg-primary/10" : "bg-secondary/50 group-hover:bg-secondary/80"
                }`}>
                  <group.icon className={`w-3.5 h-3.5 ${group.color || "text-muted-foreground"} transition-colors`} />
                </div>
                <div className="flex-1 min-w-0 text-left">
                  <span className={`block truncate font-medium transition-colors ${
                    isOpen || hasActiveChild ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"
                  }`}>
                    {group.label}
                  </span>
                  {/* Per-silo progress micro bar */}
                  {progress && progress.percent > 0 && (
                    <div className="flex items-center gap-1.5 mt-1">
                      <div className="flex-1 h-[2px] bg-secondary/60 rounded-full overflow-hidden">
                        <div
                          className="h-full gradient-gold rounded-full transition-all duration-700"
                          style={{ width: `${progress.percent}%` }}
                        />
                      </div>
                      <span className="font-mono text-[8px] text-gold/70">{progress.percent}%</span>
                    </div>
                  )}
                </div>
                <span className="font-mono text-[9px] text-muted-foreground/40 mr-0.5">
                  {group.items.length}
                </span>
                <ChevronRight
                  className={`w-3.5 h-3.5 text-muted-foreground/40 transition-transform duration-300 flex-shrink-0 ${
                    isOpen ? "rotate-90" : ""
                  }`}
                />
              </button>

              {/* Subpages Tree */}
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="ml-[22px] pl-0 py-1.5 relative">
                      {/* Vertical connector line */}
                      <div className="absolute left-0 top-2 bottom-2 w-px bg-border/30" />

                      {group.items.map((item, idx) => {
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
                              className={`w-full flex items-center gap-2 pl-4 pr-2 py-[6px] rounded-md transition-all duration-200 text-[12.5px] relative group/item ${
                                active
                                  ? "text-gold font-semibold"
                                  : "text-muted-foreground/70 hover:text-foreground hover:bg-secondary/30"
                              }`}
                            >
                              <div className={`absolute left-[-2px] top-1/2 -translate-y-1/2 w-[5px] h-[5px] rounded-full border transition-all duration-300 ${
                                active
                                  ? "bg-gold border-gold shadow-[0_0_6px_rgba(255,215,0,0.4)]"
                                  : "bg-card border-border/50 group-hover/item:border-muted-foreground/50"
                              }`} />
                              <span className="flex-1 text-left leading-tight">{item.label}</span>
                              {item.badge && (
                                <span className={`text-[8px] font-mono px-1.5 py-0.5 rounded-full flex-shrink-0 ${
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

        <div className="h-px bg-border/20 mx-2 my-3" />
      </nav>


      {/* ── Lightning Support Footer ── */}
      <div className="px-3 py-3 border-t border-border/30">
        <button
          onClick={handleApoio}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-gold-dim/40 bg-card/50 text-gold font-semibold text-[13px] hover:border-gold/60 hover:bg-gold/5 transition-all duration-300"
        >
          <Zap className="w-4 h-4" />
          Apoio Lightning
        </button>
        <p className="font-mono text-[7px] text-muted-foreground/30 tracking-[0.25em] text-center mt-2">
          AUTOCUSTÓDIA É LIBERDADE
        </p>
      </div>


    </aside>
  );
};

export default AppSidebar;
