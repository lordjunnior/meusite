import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Shield, Zap, ArrowRight, Loader2, CheckCircle } from 'lucide-react';
import { submitLead } from '@/lib/leadSubmission';
import LeadConsentFields from '@/components/LeadConsentFields';
import { z } from 'zod';
import BitcoinCoinRain from '@/components/BitcoinCoinRain';

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const leadSchema = z.object({
  nome: z.string().trim().min(2, 'Nome obrigatório').max(100),
  email: z.string().trim().email('E-mail inválido').max(255),
});

const ExitIntentLeadMagnet = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [consent, setConsent] = useState(false);
  const [honeypot, setHoneypot] = useState('');

  const handleShow = useCallback(() => {
    const dismissed = sessionStorage.getItem('exit-intent-dismissed');
    if (dismissed) return;
    setIsOpen(true);
  }, []);

  // Exit intent detection (desktop: mouseleave top, mobile: scroll-up + time)
  useEffect(() => {
    const dismissed = sessionStorage.getItem('exit-intent-dismissed');
    if (dismissed) return;

    let timeout: ReturnType<typeof setTimeout>;

    // Desktop: mouse leaves viewport top
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 5) {
        handleShow();
      }
    };

    // Mobile: show after 60s if scrolled past 50%
    const startMobileTimer = () => {
      timeout = setTimeout(() => {
        const scrolled = window.scrollY / (document.body.scrollHeight - window.innerHeight);
        if (scrolled > 0.5) {
          handleShow();
        }
      }, 60000);
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    startMobileTimer();

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
      clearTimeout(timeout);
    };
  }, [handleShow]);

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem('exit-intent-dismissed', 'true');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = leadSchema.safeParse({ nome, email });
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach(err => {
        if (err.path[0]) fieldErrors[err.path[0] as string] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    if (!consent) {
      setErrors({ consent: 'Marque a autorização para entrar na lista.' });
      return;
    }

    setLoading(true);
    try {
      const outcome = await submitLead({
        nome: result.data.nome,
        email: result.data.email,
        interesse: 'lista-transmissao-soberania',
        consentimento: consent,
        honeypot,
      });

      if (!outcome.ok) {
        setErrors({ form: outcome.message ?? 'Erro ao enviar. Tente novamente.' });
        return;
      }
      setSuccess(true);

      // Track conversion
      if (typeof window !== 'undefined' && (window as any).dataLayer) {
        (window as any).dataLayer.push({
          event: 'lead_capture',
          lead_source: 'exit_intent',
          lead_type: 'lista-transmissao',
        });
      }
    } catch (err) {
      console.error('Lead error:', err);
      setErrors({ form: 'Erro ao enviar. Tente novamente.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] flex items-center justify-center px-4"
          onClick={handleClose}
        >
          <div className="absolute inset-0 bg-black/85 backdrop-blur-sm" />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.5, ease: EASE }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md"
          >
            {/* Glow border */}
            <motion.div
              animate={{ opacity: [0.2, 0.5, 0.2] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -inset-[2px] rounded-3xl"
              style={{ background: 'linear-gradient(135deg, rgba(234,179,8,0.5), rgba(245,158,11,0.2) 40%, transparent 60%, rgba(234,179,8,0.4))' }}
            />

            <div className="relative rounded-3xl border border-amber-500/25 bg-[#0a0e0e] overflow-hidden">
              <BitcoinCoinRain active={success} />
              <button onClick={handleClose} className="absolute top-4 right-4 z-10 p-2 rounded-xl hover:bg-white/[0.05] transition-colors">
                <X size={18} className="text-stone-500" />
              </button>

              <div className="p-7 md:p-8">
                {!success ? (
                  <>
                    <div className="flex items-center gap-3 mb-5">
                      <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20">
                        <Shield className="text-amber-400" size={20} />
                      </div>
                      <div>
                        <h2 className="text-lg font-bold text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                          Lista de Transmissão
                        </h2>
                        <p className="text-stone-500 text-[10px] tracking-[0.1em] uppercase">da Soberania</p>
                      </div>
                    </div>

                    <p className="text-stone-400 text-sm leading-relaxed mb-6">
                      Alertas de confisco, atualizações de soberania financeira e conteúdo exclusivo que
                      <strong className="text-stone-200"> não será publicado no site</strong>.
                      Sem spam. Sem algoritmo. Direto na sua caixa.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <input
                          type="text"
                          value={nome}
                          onChange={(e) => setNome(e.target.value)}
                          placeholder="Seu nome"
                          className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-stone-200 text-sm placeholder:text-stone-600 focus:outline-none focus:border-amber-500/40 transition-colors"
                          maxLength={100}
                        />
                        {errors.nome && <p className="text-rose-400 text-xs mt-1">{errors.nome}</p>}
                      </div>
                      <div>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="seu@email.com"
                          className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-stone-200 text-sm placeholder:text-stone-600 focus:outline-none focus:border-amber-500/40 transition-colors"
                          maxLength={255}
                        />
                        {errors.email && <p className="text-rose-400 text-xs mt-1">{errors.email}</p>}
                      </div>

                      <LeadConsentFields
                        id="exit-intent"
                        consent={consent}
                        onConsentChange={setConsent}
                        honeypot={honeypot}
                        onHoneypotChange={setHoneypot}
                        finalidade="Usamos seu nome e e-mail apenas para enviar os materiais desta lista. Sem repasse a terceiros e com cancelamento em um clique."
                        error={errors.consent}
                      />

                      {errors.form && (
                        <div className="rounded-xl bg-rose-500/10 border border-rose-500/20 px-4 py-2.5">
                          <p className="text-rose-400 text-sm">{errors.form}</p>
                        </div>
                      )}

                      <motion.button
                        type="submit"
                        disabled={loading}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="group relative w-full flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl text-sm font-bold overflow-hidden disabled:opacity-50"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 via-amber-400/25 to-yellow-500/20 border border-amber-500/40 rounded-xl" />
                        <span className="relative z-10 flex items-center gap-2 text-amber-200">
                          {loading ? (
                            <><Loader2 size={16} className="animate-spin" /> Enviando...</>
                          ) : (
                            <><Zap size={16} /> Entrar na Lista</>
                          )}
                        </span>
                      </motion.button>
                    </form>

                    <p className="text-stone-600 text-[9px] mt-4 text-center tracking-[0.15em] uppercase">
                      Dados protegidos · Sem spam · Cancele quando quiser
                    </p>
                  </>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: EASE }}
                    className="text-center py-6"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.2, type: 'spring', stiffness: 200 }}
                      className="inline-flex p-4 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-5"
                    >
                      <CheckCircle className="text-emerald-400" size={32} />
                    </motion.div>

                    <h3 className="text-xl font-bold text-white mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                      Você está na lista.
                    </h3>
                    <p className="text-stone-400 text-sm leading-relaxed max-w-sm mx-auto mb-6">
                      Alertas de soberania serão enviados diretamente para <strong className="text-stone-200">{email}</strong>.
                    </p>

                    <button
                      onClick={handleClose}
                      className="px-6 py-2.5 rounded-xl bg-white/[0.05] border border-white/[0.08] text-stone-300 text-sm font-medium hover:bg-white/[0.08] transition-colors"
                    >
                      Fechar
                    </button>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ExitIntentLeadMagnet;
