import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, CheckCircle, Loader2, X } from 'lucide-react';
import { z } from 'zod';
import { submitLead } from '@/lib/leadSubmission';
import LeadConsentFields from '@/components/LeadConsentFields';
import { getSiloOffer } from '@/lib/siloOffers';

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const schema = z.object({
  nome: z.string().trim().min(2, 'Informe seu nome').max(100),
  email: z.string().trim().email('E-mail inválido').max(255),
});

const DISMISS_PREFIX = 'oferta-dispensada:';

/**
 * Captura contextual, não modal.
 *
 * Aparece depois que a pessoa leu a maior parte da página, ancorada no terço
 * inferior da tela no celular, onde o polegar alcança. Não bloqueia a leitura,
 * não intercepta a saída e oferece o material do silo que está sendo lido.
 */
const ContextualLeadCapture = () => {
  const { pathname } = useLocation();
  const offer = getSiloOffer(pathname);
  const reduceMotion = useReducedMotion();

  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);
  const [honeypot, setHoneypot] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const dismissedRef = useRef(false);

  // Reinicia a cada troca de página
  useEffect(() => {
    setVisible(false);
    setExpanded(false);
    setSuccess(false);
    setError('');
    dismissedRef.current = false;
  }, [pathname]);

  useEffect(() => {
    let dismissed = false;
    try {
      dismissed = sessionStorage.getItem(`${DISMISS_PREFIX}${offer.id}`) === '1';
    } catch {
      // armazenamento bloqueado, segue exibindo
    }
    if (dismissed) return;

    const onScroll = () => {
      if (dismissedRef.current) return;
      const scrollable = document.body.scrollHeight - window.innerHeight;
      if (scrollable < 600) return;
      const progress = window.scrollY / scrollable;
      if (progress > 0.6) setVisible(true);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [offer.id, pathname]);

  const handleDismiss = () => {
    dismissedRef.current = true;
    setVisible(false);
    try {
      sessionStorage.setItem(`${DISMISS_PREFIX}${offer.id}`, '1');
    } catch {
      // ignorado
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const parsed = schema.safeParse({ nome, email });
    if (!parsed.success) {
      setError(parsed.error.errors[0]?.message ?? 'Preencha nome e e-mail válidos.');
      return;
    }
    if (!consent) {
      setError('Marque a autorização para receber o material.');
      return;
    }

    setLoading(true);
    const outcome = await submitLead({
      nome: parsed.data.nome,
      email: parsed.data.email,
      interesse: offer.interesse,
      consentimento: consent,
      honeypot,
    });
    setLoading(false);

    if (!outcome.ok) {
      setError(outcome.message ?? 'Erro ao enviar. Tente novamente.');
      return;
    }
    setSuccess(true);
  };

  const motionProps = reduceMotion
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, transition: { duration: 0.2 } }
    : {
        initial: { opacity: 0, y: 24 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: 16 },
        transition: { duration: 0.5, ease: EASE },
      };

  return (
    <AnimatePresence>
      {visible && (
        <motion.aside
          key={offer.id}
          {...motionProps}
          aria-label={`Material sugerido: ${offer.titulo}`}
          className="fixed z-40 bottom-[18vh] left-3 right-3 sm:bottom-6 sm:left-auto sm:right-6 sm:w-[24rem] lg:bottom-24"
        >
          <div className="relative rounded-2xl border border-editorial-teal/25 bg-editorial-sand shadow-[0_24px_60px_-28px_rgba(0,0,0,0.55)]">
            <button
              type="button"
              onClick={handleDismiss}
              aria-label="Dispensar sugestão de material"
              className="absolute right-1.5 top-1.5 inline-flex h-11 w-11 items-center justify-center rounded-xl text-editorial-ink/60 transition-colors hover:text-editorial-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-editorial-terracotta"
            >
              <X size={18} aria-hidden="true" />
            </button>

            <div className="p-5 pr-12 sm:p-6 sm:pr-12">
              {success ? (
                <div className="flex items-start gap-3 py-1">
                  <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-editorial-teal" aria-hidden="true" />
                  <div>
                    <p className="text-sm font-semibold text-editorial-ink">Material a caminho.</p>
                    <p className="mt-1 text-xs leading-relaxed text-editorial-ink/70">
                      Enviamos {offer.titulo} para {email}.
                    </p>
                  </div>
                </div>
              ) : (
                <>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-editorial-teal">
                    {offer.eyebrow}
                  </p>
                  <h2 className="mt-2 font-display text-lg font-bold leading-tight text-editorial-ink">
                    {offer.titulo}
                  </h2>
                  <p className="mt-2 text-xs leading-relaxed text-editorial-ink/75">{offer.descricao}</p>

                  {!expanded ? (
                    <button
                      type="button"
                      onClick={() => setExpanded(true)}
                      className="mt-4 inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-xl bg-editorial-teal px-5 text-sm font-bold text-editorial-sand transition-colors hover:bg-editorial-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-editorial-terracotta focus-visible:ring-offset-2"
                    >
                      {offer.cta}
                      <ArrowRight size={16} aria-hidden="true" />
                    </button>
                  ) : (
                    <form onSubmit={handleSubmit} className="mt-4 space-y-3">
                      <label className="sr-only" htmlFor="oferta-nome">
                        Seu nome
                      </label>
                      <input
                        id="oferta-nome"
                        type="text"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        placeholder="Seu nome"
                        maxLength={100}
                        className="min-h-[44px] w-full rounded-xl border border-editorial-teal/25 bg-white px-4 text-sm text-editorial-ink placeholder:text-editorial-ink/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-editorial-terracotta"
                      />
                      <label className="sr-only" htmlFor="oferta-email">
                        Seu e-mail
                      </label>
                      <input
                        id="oferta-email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="seu@email.com"
                        maxLength={255}
                        className="min-h-[44px] w-full rounded-xl border border-editorial-teal/25 bg-white px-4 text-sm text-editorial-ink placeholder:text-editorial-ink/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-editorial-terracotta"
                      />

                      <LeadConsentFields
                        id={`oferta-${offer.id}`}
                        consent={consent}
                        onConsentChange={setConsent}
                        honeypot={honeypot}
                        onHoneypotChange={setHoneypot}
                        finalidade="Usamos seu nome e e-mail apenas para enviar este material. Sem repasse a terceiros, com cancelamento em um clique."
                      />

                      {error && <p className="text-xs text-editorial-terracotta">{error}</p>}

                      <button
                        type="submit"
                        disabled={loading}
                        className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-xl bg-editorial-teal px-5 text-sm font-bold text-editorial-sand transition-colors hover:bg-editorial-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-editorial-terracotta focus-visible:ring-offset-2 disabled:opacity-60"
                      >
                        {loading ? (
                          <>
                            <Loader2 size={16} className="animate-spin" aria-hidden="true" /> Enviando
                          </>
                        ) : (
                          <>
                            {offer.cta}
                            <ArrowRight size={16} aria-hidden="true" />
                          </>
                        )}
                      </button>
                    </form>
                  )}
                </>
              )}
            </div>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
};

export default ContextualLeadCapture;
