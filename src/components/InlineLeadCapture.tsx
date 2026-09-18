import { useState } from "react";
import { motion } from "framer-motion";
import { Zap, Loader2, CheckCircle, Shield } from "lucide-react";
import { submitLead } from "@/lib/leadSubmission";
import LeadConsentFields from "@/components/LeadConsentFields";
import { z } from "zod";
import BitcoinCoinRain from "@/components/BitcoinCoinRain";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const schema = z.object({
  nome: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(255),
});

interface InlineLeadCaptureProps {
  heading?: string;
  subtext?: string;
  interesse?: string;
  className?: string;
}

const InlineLeadCapture = ({
  heading = "Quer receber o próximo módulo?",
  subtext = "Entre na lista de transmissão da soberania. Sem spam, sem algoritmo — direto na caixa.",
  interesse = "inline-artigo",
  className = "",
}: InlineLeadCaptureProps) => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [consent, setConsent] = useState(false);
  const [honeypot, setHoneypot] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const result = schema.safeParse({ nome, email });
    if (!result.success) {
      setError("Preencha nome e e-mail válidos.");
      return;
    }

    if (!consent) {
      setError("Marque a autorização para entrar na lista.");
      return;
    }

    setLoading(true);
    const outcome = await submitLead({
      nome: result.data.nome,
      email: result.data.email,
      interesse,
      consentimento: consent,
      honeypot,
    });
    setLoading(false);

    if (outcome.ok) {
      setSuccess(true);
    } else {
      setError(outcome.message);
    }
  };

  if (success) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: EASE }}
        className={`my-10 p-6 rounded-xl border border-emerald-500/20 bg-emerald-500/[0.04] text-center relative overflow-hidden ${className}`}
      >
        <BitcoinCoinRain active={success} />
        <CheckCircle className="w-8 h-8 text-emerald-400 mx-auto mb-3" />
        <p className="text-foreground font-semibold text-sm">Você está na lista.</p>
        <p className="text-muted-foreground text-xs mt-1">Alertas de soberania serão enviados para {email}.</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: EASE }}
      className={`my-10 relative overflow-hidden rounded-xl border border-primary/15 bg-card/50 backdrop-blur-sm ${className}`}
    >
      {/* Top shine */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <div className="p-6 md:p-8">
        <div className="flex items-center gap-2.5 mb-3">
          <div className="p-1.5 rounded-lg bg-primary/10 border border-primary/20">
            <Shield className="w-4 h-4 text-primary" />
          </div>
          <h3 className="text-base font-bold text-foreground font-display">{heading}</h3>
        </div>

        <p className="text-sm text-muted-foreground leading-relaxed mb-5 max-w-md">{subtext}</p>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Seu nome"
            maxLength={100}
            className="flex-1 px-4 py-2.5 rounded-lg bg-secondary/50 border border-border/50 text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary/40 transition-colors"
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="seu@email.com"
            maxLength={255}
            className="flex-1 px-4 py-2.5 rounded-lg bg-secondary/50 border border-border/50 text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary/40 transition-colors"
          />
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2.5 rounded-lg bg-primary/15 border border-primary/30 text-primary text-sm font-bold flex items-center justify-center gap-2 hover:bg-primary/20 transition-all disabled:opacity-50 shrink-0"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Zap className="w-4 h-4" />}
            {loading ? "Enviando..." : "Entrar"}
          </button>
        </form>

        <div className="relative mt-4">
          <LeadConsentFields
            id="inline"
            consent={consent}
            onConsentChange={setConsent}
            honeypot={honeypot}
            onHoneypotChange={setHoneypot}
            finalidade="Usamos seu nome e e-mail apenas para enviar os materiais desta lista. Sem repasse a terceiros e com cancelamento em um clique."
          />
        </div>

        {error && <p className="text-destructive text-xs mt-2">{error}</p>}

        <p className="text-muted-foreground/50 text-[9px] font-mono tracking-widest uppercase mt-4">
          Dados protegidos · Cancele quando quiser
        </p>
      </div>
    </motion.div>
  );
};

export default InlineLeadCapture;
