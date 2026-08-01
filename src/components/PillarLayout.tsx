import { motion } from "framer-motion";
import { useEffect } from "react";
import { ArrowLeft, BookOpen, Headphones, Wrench, Download, Play, ArrowRight, Target } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import NoiseBackground from "@/components/NoiseBackground";
import AppSidebar from "@/components/AppSidebar";
import MobileNav from "@/components/MobileNav";
import RightSidebar from "@/components/RightSidebar";
import NetworkTicker from "@/components/NetworkTicker";
import type { Pillar } from "@/lib/pillars";
import SimboloOculto from '@/components/SimboloOculto';

const resourceIcons = {
  ebook: BookOpen,
  audio: Headphones,
  tool: Wrench,
};

const resourceAccent = {
  ebook: { bg: "bg-gold/10", text: "text-gold", border: "border-gold/20" },
  audio: { bg: "bg-emerald-500/10", text: "text-emerald-400", border: "border-emerald-500/20" },
  tool: { bg: "bg-sky-500/10", text: "text-sky-400", border: "border-sky-500/20" },
};

const resourceLabel = {
  ebook: "EBOOK",
  audio: "AUDIOBOOK",
  tool: "FERRAMENTA",
};

const PillarLayout = ({ pillar }: { pillar: Pillar }) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      setTimeout(() => {
        const el = document.getElementById(location.hash.slice(1));
        el?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 600);
    } else {
      window.scrollTo(0, 0);
    }
  }, [location.hash]);

  return (
    <div className="min-h-screen text-foreground">
      <NoiseBackground />
      <AppSidebar />
      <MobileNav />
      <RightSidebar />

      <div className="relative z-10 lg:ml-[280px] 2xl:mr-[340px] pb-10">
        {/* Back button */}
        <div className="section-padding pt-6 pb-0">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-gold transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="font-mono tracking-wider text-xs">VOLTAR AO COMANDO</span>
          </motion.button>
        </div>

        {/* Hero */}
        <section className="section-padding pt-8">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center mb-16">
              {/* Text */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="font-mono text-[10px] tracking-widest text-gold bg-gold/10 px-2.5 py-1 rounded">
                    {pillar.level}
                  </span>
                  <span className="font-mono text-[10px] tracking-widest text-muted-foreground bg-secondary px-2.5 py-1 rounded">
                    {pillar.badge}
                  </span>
                </div>

                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4 leading-tight">
                  {pillar.title.split(" ").slice(0, -1).join(" ")}{" "}
                  <span className="text-gradient-gold">
                    {pillar.title.split(" ").slice(-1)}
                  </span>
                </h1>

                <p className="text-muted-foreground text-lg mb-6">
                  {pillar.subtitle}
                </p>

                <div className="border-l-2 border-gold/40 pl-5 py-2">
                  <p className="text-foreground font-medium leading-relaxed text-sm md:text-base italic">
                    "{pillar.impactText}"
                  </p>
                </div>

                <p className="text-muted-foreground text-sm mt-6 leading-relaxed">
                  {pillar.impactSub}
                </p>
              </motion.div>

              {/* Cover image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="relative"
              >
                <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-border/50">
                  <img
                    src={pillar.cover}
                    alt={pillar.title}
                    className="w-full h-full object-cover" loading="lazy" decoding="async" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                </div>
                {/* Glow effect */}
                <div className="absolute -inset-4 bg-gold/5 rounded-3xl blur-3xl -z-10" />
              </motion.div>
            </div>

            {/* Divider */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex items-center gap-4 mb-12"
            >
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
              <span className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground">
                RECURSOS DISPONÍVEIS
              </span>
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
            </motion.div>

            {/* Resources */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {pillar.resources.map((resource, i) => {
                const Icon = resourceIcons[resource.type];
                const accent = resourceAccent[resource.type];
                const label = resourceLabel[resource.type];

                return (
                  <motion.div
                    key={i}
                    id={resource.anchorId}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 + i * 0.15 }}
                    whileHover={{ y: -8, scale: 1.03 }}
                    onClick={() => resource.route && navigate(resource.route)}
                    className="relative card-wealth flex flex-col group cursor-pointer overflow-hidden"
                  >
                    {/* Animated glow border */}
                    <div className={`absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`}>
                      <div className={`absolute inset-0 rounded-xl border ${accent.border}`} />
                      <div className={`absolute -inset-1 rounded-2xl ${accent.bg} blur-xl`} />
                    </div>

                    {/* Shimmer line on hover */}
                    <div className="absolute inset-0 overflow-hidden rounded-xl pointer-events-none">
                      <div className="absolute top-0 -left-full w-full h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent group-hover:left-full transition-all duration-1000 ease-in-out" />
                    </div>

                    <div className="relative z-10">
                      {/* Top bar */}
                      <div className="flex items-center justify-between mb-5">
                        <motion.div
                          animate={{ boxShadow: ["0 0 0px rgba(212,175,55,0)", "0 0 12px rgba(212,175,55,0.15)", "0 0 0px rgba(212,175,55,0)"] }}
                          transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
                          className={`w-12 h-12 rounded-xl ${accent.bg} flex items-center justify-center`}
                        >
                          <Icon className={`w-6 h-6 ${accent.text}`} />
                        </motion.div>
                        <span className={`font-mono text-[9px] tracking-widest ${accent.text} ${accent.bg} px-2.5 py-1 rounded border ${accent.border}`}>
                          {label}
                        </span>
                      </div>

                      {/* Content */}
                      <h3 className="text-lg font-bold mb-2 group-hover:text-gold transition-colors duration-500">
                        {resource.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed flex-1 mb-6">
                        {resource.description}
                      </p>

                      {/* Action button */}
                      <button
                        className={`w-full py-3.5 rounded-lg border ${accent.border} ${accent.text} font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-500 group-hover:gap-3 group-hover:bg-gold/10 group-hover:border-gold/40 group-hover:text-gold group-hover:shadow-[0_0_20px_rgba(212,175,55,0.1)]`}
                      >
                        {resource.type === "ebook" && <Download className="w-4 h-4" />}
                        {resource.type === "audio" && <Play className="w-4 h-4" />}
                        {resource.type === "tool" && <ArrowRight className="w-4 h-4" />}
                        {resource.action}
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Objectives */}
            {pillar.objectives && pillar.objectives.length > 0 && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                  className="flex items-center gap-4 mt-16 mb-10"
                >
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
                  <span className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground">
                    O QUE VOCÊ VAI EXECUTAR AQUI
                  </span>
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {pillar.objectives.map((obj, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 1.1 + i * 0.15 }}
                      className="relative pl-6 border-l-2 border-gold/30 group"
                    >
                      <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-background border-2 border-gold flex items-center justify-center">
                        <Target className="w-2.5 h-2.5 text-gold" />
                      </div>
                      <h4 className="font-bold text-sm mb-1.5 group-hover:text-gold transition-colors">
                        {obj.title}
                      </h4>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {obj.description}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </>
            )}

            {/* Bottom CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5 }}
              className="mt-16 text-center"
            >
              <p className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground/50 mb-4">
                SISTEMA OPERACIONAL DE SOBERANIA <SimboloOculto id="escudo" className="ml-1.5 align-middle" />
              </p>
              <div className="h-px w-32 mx-auto bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
            </motion.div>
          </div>
        </section>
      </div>

      <NetworkTicker />
    </div>
  );
};

export default PillarLayout;
