import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Wind } from "lucide-react";
import cardImg from "@/assets/cards/card-rape-hook.webp";

const APPLE_EASE = [0.22, 1, 0.36, 1] as const;

interface Props {
  /** Override do gancho de curiosidade (PNL) */
  hook?: string;
  /** Override do título */
  title?: string;
  /** Variante de tag por contexto da página de origem */
  variant?: "ancestral" | "perdido" | "saude" | "toxicos" | "home";
}

const VARIANT_TAG: Record<NonNullable<Props["variant"]>, string> = {
  ancestral: "[SABEDORIA SUPRIMIDA]",
  perdido: "[ARQUIVO CLASSIFICADO]",
  saude: "[MODULAÇÃO BIOLÓGICA]",
  toxicos: "[O ANTÍDOTO SEQUESTRADO]",
  home: "[FERRAMENTA ANCESTRAL]",
};

const RapeHookCard = ({
  hook = "Os xamãs amazônicos guardam um pó que regula o nervo vago em 90 segundos. A indústria do bem-estar transformou em moda. O Estado finge que não existe.",
  title = "RAPÉ: A Ferramenta Biológica que Foi Sequestrada",
  variant = "perdido",
}: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.9, ease: APPLE_EASE }}
      className="my-12 md:my-16"
    >
      <Link
        to="/soberania-organica/conhecimento-perdido/rape"
        className="group relative block rounded-2xl border border-emerald-900/30 bg-card/40 backdrop-blur-md overflow-hidden hover:border-emerald-500/40 transition-all duration-700"
      >
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent z-10" />

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* TEXT */}
          <div className="relative p-8 md:p-10 lg:p-14 flex flex-col justify-center">
            <div className="absolute -top-16 -left-16 w-56 h-56 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
            <div className="relative space-y-5">
              <div className="flex items-center gap-2.5">
                <Wind size={14} className="text-emerald-400/80" />
                <p className="font-mono text-[9px] tracking-[0.32em] text-emerald-400/80 uppercase">
                  {VARIANT_TAG[variant]}
                </p>
              </div>
              <h3
                className="text-foreground font-bold text-2xl md:text-3xl lg:text-[2.1rem] tracking-tight leading-[1.15]"
                style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.02em" }}
              >
                {title}
              </h3>
              <p className="text-base text-muted-foreground leading-8">
                {hook}
              </p>
              <span className="inline-flex items-center gap-2.5 px-6 py-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-bold tracking-[0.18em] uppercase transition-all duration-500 group-hover:bg-emerald-500/20 group-hover:border-emerald-400/50">
                Abrir o Dossiê
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </div>
          </div>

          {/* IMAGE */}
          <div className="relative min-h-[260px] md:min-h-[340px]">
            <img
              src={cardImg}
              alt="Kuripe ancestral em superfície de couro envelhecido"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              loading="lazy"
              width={1280}
              height={800}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-card/85 via-card/30 to-transparent hidden md:block" />
            <div className="absolute inset-0 bg-gradient-to-b from-card/70 via-transparent to-transparent md:hidden" />
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-emerald-500/25 to-transparent z-10" />
      </Link>
    </motion.div>
  );
};

export default RapeHookCard;
