import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Coin {
  id: number;
  left: number;
  drift: number;
  size: number;
  duration: number;
  rotate: number;
}

/**
 * Chuva de moedas de Bitcoin: uma moeda por segundo, com som de "cha-ching"
 * sintetizado via WebAudio (sem asset externo).
 */
const BitcoinCoinRain = ({
  active,
  intervalMs = 1000,
  maxCoins = 12,
  sound = true,
}: {
  active: boolean;
  intervalMs?: number;
  maxCoins?: number;
  sound?: boolean;
}) => {
  const [coins, setCoins] = useState<Coin[]>([]);
  const audioRef = useRef<AudioContext | null>(null);
  const spawnedRef = useRef(0);

  const playCoinSound = () => {
    if (!sound) return;
    try {
      if (!audioRef.current) {
        const Ctx = window.AudioContext || (window as any).webkitAudioContext;
        if (!Ctx) return;
        audioRef.current = new Ctx();
      }
      const ctx = audioRef.current;
      if (ctx.state === "suspended") ctx.resume();
      const now = ctx.currentTime;

      // Duas parciais metálicas = "cha-ching" de caixa registradora
      [1318.5, 1975.5].forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(freq, now + i * 0.07);
        gain.gain.setValueAtTime(0.0001, now + i * 0.07);
        gain.gain.exponentialRampToValueAtTime(0.18, now + i * 0.07 + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.07 + 0.45);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + i * 0.07);
        osc.stop(now + i * 0.07 + 0.5);
      });
    } catch {
      /* áudio bloqueado pelo navegador: segue sem som */
    }
  };

  useEffect(() => {
    if (!active) {
      setCoins([]);
      spawnedRef.current = 0;
      return;
    }

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const spawn = () => {
      if (spawnedRef.current >= maxCoins) return;
      spawnedRef.current += 1;
      const coin: Coin = {
        id: Date.now() + Math.random(),
        left: 8 + Math.random() * 84,
        drift: (Math.random() - 0.5) * 80,
        size: 26 + Math.random() * 20,
        duration: 2.2 + Math.random() * 1.1,
        rotate: (Math.random() > 0.5 ? 1 : -1) * (180 + Math.random() * 360),
      };
      setCoins((prev) => [...prev, coin]);
      playCoinSound();
      window.setTimeout(() => {
        setCoins((prev) => prev.filter((c) => c.id !== coin.id));
      }, coin.duration * 1000 + 200);
    };

    spawn();
    const interval = window.setInterval(spawn, intervalMs);
    return () => window.clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, intervalMs, maxCoins]);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden z-20">
      <AnimatePresence>
        {coins.map((coin) => (
          <motion.div
            key={coin.id}
            initial={{ y: "-15%", x: 0, opacity: 0, rotate: 0, scale: 0.6 }}
            animate={{
              y: "115%",
              x: coin.drift,
              opacity: [0, 1, 1, 0],
              rotate: coin.rotate,
              scale: 1,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: coin.duration, ease: "easeIn" }}
            style={{ left: `${coin.left}%`, width: coin.size, height: coin.size }}
            className="absolute top-0"
          >
            <div
              className="w-full h-full rounded-full flex items-center justify-center font-bold"
              style={{
                background: "radial-gradient(circle at 32% 28%, #fde68a 0%, #f59e0b 45%, #b45309 100%)",
                boxShadow: "0 0 14px rgba(245,158,11,0.55), inset 0 -2px 4px rgba(120,53,15,0.6)",
                color: "#4a2703",
                fontSize: coin.size * 0.58,
                lineHeight: 1,
              }}
            >
              ₿
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default BitcoinCoinRain;
