import React, { useRef, useCallback } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";

const ORANGE = "#FF6600";

const GRAIN_URL =
  "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

/** Technical corner bracket */
const Corner: React.FC<{ pos: "tl" | "tr" | "bl" | "br" }> = ({ pos }) => {
  const base = "pointer-events-none absolute w-5 h-5 z-20 transition-all duration-500";
  const map: Record<string, string> = {
    tl: "top-0 left-0 border-t border-l",
    tr: "top-0 right-0 border-t border-r",
    bl: "bottom-0 left-0 border-b border-l",
    br: "bottom-0 right-0 border-b border-r",
  };
  return (
    <span
      className={`${base} ${map[pos]} border-white/25 group-hover/glass:border-[color:var(--glass-accent)] group-hover/glass:w-7 group-hover/glass:h-7`}
    />
  );
};

interface GlassPanelProps {
  children: React.ReactNode;
  className?: string;
  /** inner padding class */
  padding?: string;
  accent?: string;
  /** show hairline rules along top/bottom */
  filete?: boolean;
  as?: "div" | "article" | "li";
}

/**
 * Frosted glass frame: grain, hairline filetes, technical corners,
 * mouse-tracked specular sheen and accent glow on hover.
 */
const GlassPanel: React.FC<GlassPanelProps> = ({
  children,
  className = "",
  padding = "p-8 md:p-10",
  accent = ORANGE,
  filete = true,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(50);
  const my = useMotionValue(50);
  const sx = useSpring(mx, { stiffness: 120, damping: 20 });
  const sy = useSpring(my, { stiffness: 120, damping: 20 });

  const onMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const r = ref.current?.getBoundingClientRect();
      if (!r) return;
      mx.set(((e.clientX - r.left) / r.width) * 100);
      my.set(((e.clientY - r.top) / r.height) * 100);
    },
    [mx, my]
  );

  const sheen = useTransform(
    [sx, sy],
    ([x, y]: number[]) =>
      `radial-gradient(420px circle at ${x}% ${y}%, ${accent}22, transparent 65%)`
  );
  const rim = useTransform(
    [sx, sy],
    ([x, y]: number[]) =>
      `radial-gradient(300px circle at ${x}% ${y}%, ${accent}66, transparent 70%)`
  );

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      style={{ ["--glass-accent" as string]: accent }}
      className={`group/glass relative isolate overflow-hidden rounded-[2px] border border-white/10 bg-white/[0.025] backdrop-blur-xl transition-[border-color,box-shadow,transform] duration-500 hover:border-white/20 hover:shadow-[0_30px_80px_-40px_rgba(0,0,0,0.9)] ${className}`}
    >
      {/* glass base tint */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(150deg, rgba(255,255,255,0.055) 0%, rgba(255,255,255,0.012) 38%, rgba(0,0,0,0.30) 100%)",
        }}
      />
      {/* grain */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.16] mix-blend-overlay"
        style={{ backgroundImage: GRAIN_URL, backgroundSize: "180px 180px" }}
      />
      {/* mouse sheen */}
      <motion.div
        className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover/glass:opacity-100"
        style={{ background: sheen }}
      />
      {/* rim light following mouse */}
      <motion.div
        className="pointer-events-none absolute -inset-px -z-10 opacity-0 transition-opacity duration-500 group-hover/glass:opacity-60"
        style={{ background: rim, mixBlendMode: "screen", filter: "blur(18px)" }}
      />
      {/* filetes */}
      {filete && (
        <>
          <span className="pointer-events-none absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />
          <span className="pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          <span className="pointer-events-none absolute inset-2 rounded-[1px] border border-white/[0.05]" />
        </>
      )}
      <Corner pos="tl" />
      <Corner pos="tr" />
      <Corner pos="bl" />
      <Corner pos="br" />

      <div className={`relative z-10 h-full ${padding}`}>{children}</div>
    </div>
  );
};

/** Vertical scroll parallax wrapper */
export const Parallax: React.FC<{
  children: React.ReactNode;
  distance?: number;
  className?: string;
}> = ({ children, distance = 60, className = "" }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useSpring(useTransform(scrollYProgress, [0, 1], [distance, -distance]), {
    stiffness: 80,
    damping: 24,
    mass: 0.4,
  });
  return (
    <div ref={ref} className={className}>
      <motion.div className="h-full w-full" style={{ y }}>
        {children}
      </motion.div>
    </div>
  );
};

/** Slim reading progress rail (top) */
export const ScrollRail: React.FC<{ accent?: string }> = ({ accent = ORANGE }) => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });
  return (
    <motion.div
      aria-hidden
      className="fixed left-0 right-0 top-0 z-[60] h-[2px] origin-left"
      style={{
        scaleX,
        background: `linear-gradient(90deg, transparent, #F59E0B, ${accent})`,
        boxShadow: `0 0 14px ${accent}88`,
      }}
    />
  );
};

export default GlassPanel;
