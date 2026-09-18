import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Compass } from "lucide-react";
import imgManifesto from "@/assets/manifesto-assinatura.webp";

const StrategicSignature = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="section-padding relative overflow-hidden">
      <div className="max-w-5xl mx-auto">
        {/* Full-width image with overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1 }}
          className="relative w-full h-64 md:h-80 rounded-sm overflow-hidden mb-12"
        >
          <img
            src={imgManifesto}
            alt="Bússola e mapa antigo — símbolo de navegação autônoma e soberania pessoal"
            className="w-full h-full object-cover" loading="lazy" decoding="async" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
          <div className="absolute bottom-8 left-8 md:left-12">
            <p className="font-mono text-[9px] tracking-[0.4em] text-gold/80 uppercase">Princípio fundador</p>
          </div>
        </motion.div>

        {/* Core principle */}
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-start gap-5 mb-10"
          >
            <div className="p-3 bg-gold/5 border border-gold/10 rounded-sm shrink-0 mt-1">
              <Compass className="w-6 h-6 text-gold" />
            </div>
            <div>
              <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight mb-2">
                Princípio <span className="text-gradient-gold">Fundador</span>
              </h2>
              <p className="font-mono text-[9px] tracking-[0.3em] text-muted-foreground uppercase">
                O eixo moral deste projeto
              </p>
            </div>
          </motion.div>

          {/* The immovable principle */}
          <motion.blockquote
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="border-l-2 border-gold/40 pl-8 mb-10"
          >
            <p className="font-display text-2xl md:text-3xl font-bold leading-snug tracking-tight text-foreground mb-3">
              Autonomia não é isolamento.
            </p>
            <p className="font-display text-2xl md:text-3xl font-bold leading-snug tracking-tight text-gold">
              É redução inteligente de dependência.
            </p>
          </motion.blockquote>

          {/* Three pillars of the manifesto */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10"
          >
            {[
              {
                num: "01",
                title: "Conhecimento é blindagem",
                desc: "Quem compreende o sistema não depende de quem o controla. Educação monetária, nutricional e operacional reduz exposição a riscos sistêmicos.",
              },
              {
                num: "02",
                title: "Preparação é responsabilidade",
                desc: "Não existe terceirização de sobrevivência. Cada habilidade adquirida é uma camada a menos de vulnerabilidade.",
              },
              {
                num: "03",
                title: "Transmissão é dever",
                desc: "O conhecimento retido morre. O conhecimento transmitido multiplica a resiliência de quem está ao seu redor.",
              },
            ].map((p, i) => (
              <div key={i} className="card-wealth p-6">
                <span className="font-mono text-2xl font-bold text-gold/30">{p.num}</span>
                <h4 className="text-sm font-bold mt-3 mb-2 text-foreground">{p.title}</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </motion.div>

          {/* Signature line */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex items-center gap-4 pt-6 border-t border-border/50"
          >
            <div className="w-8 h-[1px] gradient-gold" />
            <p className="font-mono text-[9px] tracking-[0.4em] text-muted-foreground/60 uppercase">
              Este é o eixo moral permanente deste projeto
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default StrategicSignature;
