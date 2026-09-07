import { motion, useMotionTemplate, useMotionValue, useSpring, type HTMLMotionProps } from "framer-motion";
import { useRef } from "react";

type GlassTiltCardProps = HTMLMotionProps<"div"> & {
  /** intensidade máxima da inclinação em graus */
  tilt?: number;
  /** raio do brilho que segue o mouse */
  spotlightSize?: number;
  className?: string;
};

/**
 * Cartão glassmorphism premium:
 * - fundo translúcido + backdrop blur (deixa o vídeo de fundo aparecer borrado)
 * - borda 1px com gradiente iluminado
 * - inclinação 3D em direção ao ponteiro
 * - spotlight radial acompanhando o cursor
 */
const GlassTiltCard = ({
  children,
  className = "",
  tilt = 6,
  spotlightSize = 320,
  ...props
}: GlassTiltCardProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const mx = useMotionValue(-9999);
  const my = useMotionValue(-9999);
  const rx = useSpring(useMotionValue(0), { stiffness: 220, damping: 20, mass: 0.4 });
  const ry = useSpring(useMotionValue(0), { stiffness: 220, damping: 20, mass: 0.4 });

  const spotlight = useMotionTemplate`radial-gradient(${spotlightSize}px circle at ${mx}px ${my}px, hsl(var(--gold) / 0.16), transparent 70%)`;

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    mx.set(x);
    my.set(y);
    ry.set(((x / rect.width) - 0.5) * tilt * 2);
    rx.set(-((y / rect.height) - 0.5) * tilt * 2);
  };

  const handleLeave = () => {
    mx.set(-9999);
    my.set(-9999);
    rx.set(0);
    ry.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 900, transformStyle: "preserve-3d" }}
      className={`group relative rounded-xl p-[1px] transition-shadow duration-500 hover:shadow-[0_24px_60px_-24px_hsl(var(--gold)/0.35)] ${className}`}
      {...props}
    >
      {/* borda com gradiente iluminado */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-xl opacity-70 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "linear-gradient(135deg, hsl(0 0% 100% / 0.28), hsl(0 0% 100% / 0.04) 35%, transparent 55%, hsl(var(--gold) / 0.35))",
          WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          padding: 1,
        }}
      />

      <div className="relative h-full w-full overflow-hidden rounded-[11px] bg-white/[0.03] backdrop-blur-xl">
        {/* spotlight seguindo o mouse */}
        <motion.span
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ background: spotlight }}
        />
        {/* reflexo superior */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent"
        />
        <div className="relative p-6" style={{ transform: "translateZ(20px)" }}>
          {children}
        </div>
      </div>
    </motion.div>
  );
};

export default GlassTiltCard;
