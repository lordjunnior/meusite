import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { Copy, Check, Zap, Smartphone, Shield, ArrowRight, X } from "lucide-react";
import { Link } from "react-router-dom";
import qrCodeImage from "@/assets/qrcode-lightning.jpeg";
import SatCounter from "@/components/SatCounter";
import SimboloOculto from '@/components/SimboloOculto';
import HlsVideoBackground from "@/components/HlsVideoBackground";
import GlassTiltCard from "@/components/GlassTiltCard";

const staggerParent = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};

const staggerChild = {
  hidden: { opacity: 0, y: 28, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const LIGHTNING_ADDRESS = "securecorn53@walletofsatoshi.com";

const fundingLevels = [
  { sats: "1.000", label: "Infraestrutura" },
  { sats: "5.000", label: "Ferramentas" },
  { sats: "10.000", label: "Conteúdos" },
  { sats: "Valor Livre", label: "Independência" },
];

const steps = [
  { num: "01", text: "Instale uma carteira compatível com Lightning." },
  { num: "02", text: "Copie o endereço ou escaneie o QR Code do alvo." },
  { num: "03", text: "Envie qualquer valor em sats. Simples, direto e sem bancos." },
];

const FooterSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [copied, setCopied] = useState(false);
  const [copiedModal, setCopiedModal] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState<number | null>(null);
  const [showQrModal, setShowQrModal] = useState(false);

  const trackLightningEvent = (action: string, label: string) => {
    if (typeof window !== 'undefined' && (window as any).dataLayer) {
      (window as any).dataLayer.push({
        event: 'lightning_donation',
        donation_action: action,
        donation_label: label,
      });
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(LIGHTNING_ADDRESS);
    setCopied(true);
    trackLightningEvent('copy_address', 'footer');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyModal = () => {
    navigator.clipboard.writeText(LIGHTNING_ADDRESS);
    setCopiedModal(true);
    trackLightningEvent('copy_address', 'modal');
    setTimeout(() => setCopiedModal(false), 2000);
  };

  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 30 },
    animate: isInView ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.6, delay },
  });

  return (
    <footer ref={ref}>
      <section className="section-padding border-t border-border relative overflow-hidden">
        <HlsVideoBackground
          src="https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8"
          overlayOpacity={0.85}
        />
        <div className="max-w-4xl mx-auto relative z-10">

          {/* 1. CABEÇALHO E CONTEXTO */}
          <motion.div {...fadeUp()} className="text-center mb-16">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-4">
              Apoie Este Projeto <span className="text-gradient-gold">Independente</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Sem anúncios. Sem rastreadores. Sem paywall. Este arsenal é mantido de forma
              aberta, direta e voluntária. Se o conteúdo e as ferramentas geraram valor para
              a sua blindagem patrimonial, forneça o combustível para manter o sistema online.
            </p>
          </motion.div>

          {/* 2. MÓDULO DE EXECUÇÃO */}
          <motion.div {...fadeUp(0.1)} className="flex flex-col items-center mb-16">
            <GlassTiltCard className="inline-block mb-4" tilt={8}>
              <img
                src={qrCodeImage}
                alt="QR Code Lightning"
                className="w-52 h-52 rounded-lg block" loading="lazy" decoding="async" />
            </GlassTiltCard>

            <div
              className="flex items-center justify-center gap-2 mb-3 cursor-pointer group"
              onClick={handleCopy}
            >
              <code className="font-mono text-sm text-muted-foreground group-hover:text-foreground transition-colors select-all break-all text-center">
                {LIGHTNING_ADDRESS}
              </code>
              {copied ? (
                <Check className="w-4 h-4 text-chart-green flex-shrink-0" />
              ) : (
                <Copy className="w-4 h-4 text-muted-foreground group-hover:text-gold flex-shrink-0 transition-colors" />
              )}
            </div>
            {copied && (
              <p className="text-xs text-chart-green mb-2 animate-pulse">Copiado!</p>
            )}

            <SatCounter />
          </motion.div>

          {/* 3. O QUE É LIGHTNING + CARTEIRAS */}
          <motion.div
            variants={staggerParent}
            initial="hidden"
            animate={isInView ? "show" : "hidden"}
            className="grid md:grid-cols-2 gap-6 mb-16"
          >
            <motion.div variants={staggerChild}>
              <GlassTiltCard className="h-full">
                <div className="flex items-center gap-2 mb-3">
                  <Zap className="w-4 h-4 text-gold" />
                  <h3 className="font-semibold text-sm tracking-[0.18em] uppercase text-foreground">
                    O que é?
                  </h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  A camada de pagamentos do Bitcoin. Transferências quase instantâneas, com
                  taxas microscópicas, ideal para apoio direto sem intermediários estatais.
                </p>
              </GlassTiltCard>
            </motion.div>

            <motion.div variants={staggerChild}>
              <GlassTiltCard className="h-full">
                <div className="flex items-center gap-2 mb-3">
                  <Smartphone className="w-4 h-4 text-gold" />
                  <h3 className="font-semibold text-sm tracking-[0.18em] uppercase text-foreground">
                    Equipamento Recomendado
                  </h3>
                </div>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li>
                    <span className="text-foreground font-medium">Wallet of Satoshi (WoS):</span>{" "}
                    Custodial. Ideal para iniciantes operarem liquidez rápida.
                  </li>
                  <li>
                    <span className="text-foreground font-medium">Phoenix Wallet:</span>{" "}
                    Não-custodial. Equilíbrio entre praticidade e soberania real.
                  </li>
                </ul>
              </GlassTiltCard>
            </motion.div>
          </motion.div>

          {/* 4. PROTOCOLO DE EXECUÇÃO */}
          <motion.div {...fadeUp(0.3)} className="mb-16">
            <p className="pre-title text-center mb-6 tracking-[0.32em]">PROTOCOLO DE EXECUÇÃO</p>
            <motion.div
              variants={staggerParent}
              initial="hidden"
              animate={isInView ? "show" : "hidden"}
              className="grid sm:grid-cols-3 gap-4"
            >
              {steps.map((step) => (
                <motion.div key={step.num} variants={staggerChild}>
                  <GlassTiltCard className="h-full text-center">
                    <span className="font-mono text-2xl font-bold tracking-[0.12em] text-muted-foreground/70 block mb-2 transition-colors duration-500 group-hover:text-gold">
                      {step.num}
                    </span>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {step.text}
                    </p>
                  </GlassTiltCard>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* 5. NÍVEIS DE FINANCIAMENTO */}
          <motion.div {...fadeUp(0.4)} className="mb-16 text-center">
            <p className="pre-title mb-6 tracking-[0.32em]">ESCOLHA COMO APOIAR</p>
            <motion.div
              variants={staggerParent}
              initial="hidden"
              animate={isInView ? "show" : "hidden"}
              className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl mx-auto"
            >
              {fundingLevels.map((level, i) => (
                <motion.div key={i} variants={staggerChild}>
                  <GlassTiltCard
                    tilt={8}
                    onClick={() => setSelectedLevel(i === selectedLevel ? null : i)}
                    className={`h-full cursor-pointer ${
                      selectedLevel === i ? "shadow-[0_18px_50px_-20px_hsl(var(--gold)/0.5)]" : ""
                    }`}
                  >
                    <div
                      className={`flex flex-col items-center gap-1 text-sm font-medium transition-colors duration-300 ${
                        selectedLevel === i ? "text-gold" : "text-muted-foreground"
                      }`}
                    >
                      <span className="flex items-center gap-1">
                        <Zap className="w-3 h-3" />
                        {level.sats} Sats
                      </span>
                      <span className="text-xs opacity-70 tracking-[0.12em] uppercase">{level.label}</span>
                    </div>
                  </GlassTiltCard>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>


          {/* 6. BOTÕES DE AÇÃO */}
          <motion.div {...fadeUp(0.5)} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <button
              onClick={() => {
                setShowQrModal(true);
                trackLightningEvent('open_qr_modal', selectedLevel !== null ? fundingLevels[selectedLevel].label : 'none');
              }}
              className="px-8 py-3.5 rounded-lg gradient-gold text-primary-foreground font-semibold text-sm glow-gold hover:glow-gold-strong transition-all duration-300 flex items-center gap-2 cursor-pointer"
            >
              APOIAR AGORA
              <Zap className="w-4 h-4" />
            </button>
            <Link
              to="/lightning"
              className="px-8 py-3.5 rounded-lg border border-border text-muted-foreground font-medium text-sm hover:border-gold-dim hover:text-foreground transition-all duration-300 flex items-center gap-2"
            >
              Aprender sobre Lightning
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 7. FOOTER FINAL */}
      <div className="py-12 px-4 border-t border-border">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <p className="text-sm text-muted-foreground font-medium tracking-wide">
            PENSAR AINDA É PERMITIDO. AGIR TAMBÉM.
          </p>
          <p className="text-xs text-muted-foreground">
            DEPENDÊNCIA FINANCEIRA NUNCA FOI ACIDENTE. SEMPRE FOI PROJETO.
          </p>
          <p className="font-mono text-xs text-gold tracking-widest">
            NOT YOUR KEYS. NOT YOUR MONEY.
          </p>
          <div className="pt-4 border-t border-border/50">
           <p className="font-mono text-xs text-muted-foreground tracking-wider">
              &copy; LORD JUNNIOR &middot; 2026 <SimboloOculto id="raiz" className="ml-1.5 align-middle" />
            </p>
            <div className="mt-3 flex items-center justify-center gap-4 text-xs">
              <Link to="/sobre-mim" className="text-muted-foreground hover:text-gold transition-colors tracking-wider uppercase">
                Sobre Mim
              </Link>
              <span className="text-muted-foreground/30">&middot;</span>
              <Link to="/ferramentas" className="text-muted-foreground hover:text-gold transition-colors tracking-wider uppercase">
                Ferramentas
              </Link>
              <span className="text-muted-foreground/30">&middot;</span>
              <Link to="/ebooks" className="text-muted-foreground hover:text-gold transition-colors tracking-wider uppercase">
                E-books
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* QR CODE MODAL */}
      <AnimatePresence>
        {showQrModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={() => setShowQrModal(false)}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              className="relative bg-card border border-border rounded-xl p-8 max-w-sm w-full text-center shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={() => setShowQrModal(false)}
                className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center justify-center gap-2 mb-4">
                <Zap className="w-5 h-5 text-gold" />
                <h3 className="font-semibold text-lg tracking-tight">Apoiar via Lightning</h3>
              </div>

              {selectedLevel !== null && (
                <p className="text-sm text-gold font-mono mb-4">
                  {fundingLevels[selectedLevel].sats} Sats — {fundingLevels[selectedLevel].label}
                </p>
              )}

              <div className="bg-background rounded-lg p-4 mb-4 inline-block">
                <img
                  src={qrCodeImage}
                  alt="QR Code Lightning"
                  className="w-56 h-56 rounded-lg block mx-auto" loading="lazy" decoding="async" />
              </div>

              <p className="text-xs text-muted-foreground mb-3">
                Escaneie com sua carteira Lightning ou copie o endereço abaixo:
              </p>

              <div
                className="flex items-center justify-center gap-2 cursor-pointer group bg-secondary/50 rounded-lg px-3 py-2"
                onClick={handleCopyModal}
              >
                <code className="font-mono text-xs text-muted-foreground group-hover:text-foreground transition-colors break-all">
                  {LIGHTNING_ADDRESS}
                </code>
                {copiedModal ? (
                  <Check className="w-4 h-4 text-chart-green flex-shrink-0" />
                ) : (
                  <Copy className="w-4 h-4 text-muted-foreground group-hover:text-gold flex-shrink-0 transition-colors" />
                )}
              </div>
              {copiedModal && (
                <p className="text-xs text-chart-green mt-2 animate-pulse">Endereço copiado!</p>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </footer>
  );
};

export default FooterSection;
