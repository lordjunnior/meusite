import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Shield, Star, ExternalLink, CheckCircle, Loader2 } from 'lucide-react';
import { submitLead } from '@/lib/leadSubmission';
import LeadConsentFields from '@/components/LeadConsentFields';
import { z } from 'zod';
import BitcoinCoinRain from '@/components/BitcoinCoinRain';

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const leadSchema = z.object({
  nome: z.string().trim().min(2, 'Nome deve ter pelo menos 2 caracteres').max(100),
  email: z.string().trim().email('E-mail inválido').max(255),
  whatsapp: z.string().trim().max(20).optional().or(z.literal('')),
});

interface LeadCaptureModalProps {
  isOpen: boolean;
  onClose: () => void;
  interesse?: string;
}

const LeadCaptureModal = ({ isOpen, onClose, interesse = 'assessoria-offshore' }: LeadCaptureModalProps) => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [consent, setConsent] = useState(false);
  const [honeypot, setHoneypot] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = leadSchema.safeParse({ nome, email, whatsapp });
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach(err => {
        if (err.path[0]) fieldErrors[err.path[0] as string] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    if (!consent) {
      setErrors({ consent: 'Marque a autorização para enviar seus dados.' });
      return;
    }

    setLoading(true);
    const outcome = await submitLead({
      nome: result.data.nome,
      email: result.data.email,
      whatsapp: result.data.whatsapp,
      interesse,
      consentimento: consent,
      honeypot,
    });
    setLoading(false);

    if (outcome.ok) {
      setSuccess(true);
    } else {
      setErrors({ form: outcome.message });
    }
  };

  const handleClose = () => {
    if (!loading) {
      setNome('');
      setEmail('');
      setWhatsapp('');
      setConsent(false);
      setHoneypot('');
      setErrors({});
      setSuccess(false);
      onClose();
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
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.5, ease: EASE }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg"
          >
            {/* Glow border */}
            <motion.div
              animate={{ opacity: [0.2, 0.4, 0.2] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -inset-[2px] rounded-3xl"
              style={{ background: 'linear-gradient(135deg, rgba(245,158,11,0.5), rgba(234,179,8,0.3) 30%, transparent 50%, rgba(245,158,11,0.4) 80%, rgba(234,179,8,0.3))' }}
            />

            <div className="relative rounded-3xl border border-amber-500/25 bg-[#0a0e0e] overflow-hidden">
              <BitcoinCoinRain active={success} />
              {/* Close */}
              <button onClick={handleClose} className="absolute top-4 right-4 z-10 p-2 rounded-xl hover:bg-white/[0.05] transition-colors">
                <X size={18} className="text-stone-500" />
              </button>

              <div className="p-8 md:p-10">
                {!success ? (
                  <>
                    {/* Header */}
                    <div className="flex items-center gap-4 mb-6">
                      <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20">
                        <Shield className="text-amber-400" size={24} />
                      </div>
                      <div>
                        <h2 className="text-xl md:text-2xl font-bold text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                          Solicitar Assessoria
                        </h2>
                        <p className="text-stone-500 text-xs mt-1">Seus dados são protegidos e não serão compartilhados</p>
                      </div>
                    </div>

                    <p className="text-stone-400 text-sm leading-relaxed mb-8">
                      Preencha o formulário abaixo e entraremos em contato com os detalhes da assessoria completa: 
                      <strong className="text-stone-200"> cédula paraguaia + abertura de contas + suporte 1-a-1</strong>.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-5">
                      {/* Nome */}
                      <div>
                        <label className="text-[10px] font-bold tracking-[0.2em] uppercase text-stone-500 mb-2 block">Nome</label>
                        <input
                          type="text"
                          value={nome}
                          onChange={(e) => setNome(e.target.value)}
                          placeholder="Seu nome"
                          className="w-full px-4 py-3.5 rounded-xl bg-white/[0.03] border border-white/[0.08] text-stone-200 text-sm placeholder:text-stone-600 focus:outline-none focus:border-amber-500/40 transition-colors"
                          maxLength={100}
                        />
                        {errors.nome && <p className="text-rose-400 text-xs mt-1.5">{errors.nome}</p>}
                      </div>

                      {/* Email */}
                      <div>
                        <label className="text-[10px] font-bold tracking-[0.2em] uppercase text-stone-500 mb-2 block">E-mail</label>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="seu@email.com"
                          className="w-full px-4 py-3.5 rounded-xl bg-white/[0.03] border border-white/[0.08] text-stone-200 text-sm placeholder:text-stone-600 focus:outline-none focus:border-amber-500/40 transition-colors"
                          maxLength={255}
                        />
                        {errors.email && <p className="text-rose-400 text-xs mt-1.5">{errors.email}</p>}
                      </div>

                      {/* WhatsApp */}
                      <div>
                        <label className="text-[10px] font-bold tracking-[0.2em] uppercase text-stone-500 mb-2 block">WhatsApp <span className="text-stone-600 normal-case tracking-normal">(opcional)</span></label>
                        <input
                          type="tel"
                          value={whatsapp}
                          onChange={(e) => setWhatsapp(e.target.value)}
                          placeholder="+55 11 99999-9999"
                          className="w-full px-4 py-3.5 rounded-xl bg-white/[0.03] border border-white/[0.08] text-stone-200 text-sm placeholder:text-stone-600 focus:outline-none focus:border-amber-500/40 transition-colors"
                          maxLength={20}
                        />
                      </div>

                      <LeadConsentFields
                        id="assessoria"
                        consent={consent}
                        onConsentChange={setConsent}
                        honeypot={honeypot}
                        onHoneypotChange={setHoneypot}
                        error={errors.consent}
                      />

                      {errors.form && (
                        <div className="rounded-xl bg-rose-500/10 border border-rose-500/20 px-4 py-3">
                          <p className="text-rose-400 text-sm">{errors.form}</p>
                        </div>
                      )}

                      {/* Submit */}
                      <motion.button
                        type="submit"
                        disabled={loading}
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        className="group relative w-full flex items-center justify-center gap-3 px-8 py-4 rounded-xl text-base font-bold overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 via-amber-400/25 to-yellow-500/20 border border-amber-500/40 rounded-xl" />
                        <motion.div
                          animate={{ opacity: [0.3, 0.6, 0.3] }}
                          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                          className="absolute inset-0 bg-gradient-to-r from-amber-500/10 via-amber-400/20 to-amber-500/10 rounded-xl"
                        />
                        <span className="relative z-10 flex items-center gap-3 text-amber-200">
                          {loading ? (
                            <><Loader2 size={18} className="animate-spin" /> Enviando...</>
                          ) : (
                            <><Star size={18} className="group-hover:rotate-12 transition-transform" /> Solicitar Assessoria</>
                          )}
                        </span>
                      </motion.button>
                    </form>

                    <p className="text-stone-600 text-[9px] mt-5 text-center tracking-[0.15em] uppercase">
                      Resposta em até 24h · Dados protegidos · Sem spam
                    </p>
                  </>
                ) : (
                  /* Success State */
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: EASE }}
                    className="text-center py-8"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.2, type: 'spring', stiffness: 200 }}
                      className="inline-flex p-5 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-6"
                    >
                      <CheckCircle className="text-emerald-400" size={40} />
                    </motion.div>

                    <h3 className="text-2xl font-bold text-white mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                      Solicitação Recebida
                    </h3>
                    <p className="text-stone-400 text-sm leading-relaxed max-w-sm mx-auto mb-8">
                      Entraremos em contato em até <strong className="text-stone-200">24 horas</strong> com todos os detalhes da assessoria. Verifique seu e-mail e WhatsApp.
                    </p>

                    <button
                      onClick={handleClose}
                      className="px-8 py-3 rounded-xl bg-white/[0.05] border border-white/[0.08] text-stone-300 text-sm font-medium hover:bg-white/[0.08] transition-colors"
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

export default LeadCaptureModal;
