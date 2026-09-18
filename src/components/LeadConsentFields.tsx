import { Link } from 'react-router-dom';

interface LeadConsentFieldsProps {
  consent: boolean;
  onConsentChange: (value: boolean) => void;
  honeypot: string;
  onHoneypotChange: (value: string) => void;
  /** Texto curto explicando a finalidade do contato */
  finalidade?: string;
  error?: string;
  id?: string;
}

/**
 * Campos obrigatórios de base legal (LGPD) e armadilha antispam.
 * O campo honeypot é invisível para pessoas e preenchido por robôs.
 */
const LeadConsentFields = ({
  consent,
  onConsentChange,
  honeypot,
  onHoneypotChange,
  finalidade = 'Usamos seu nome, e-mail e, se informado, o WhatsApp apenas para responder este pedido e enviar o material solicitado. Sem lista de disparo em massa, sem repasse a terceiros.',
  error,
  id = 'lead',
}: LeadConsentFieldsProps) => (
  <div className="space-y-3">
    {/* Honeypot: invisível para humanos, atrativo para robôs */}
    <div aria-hidden="true" className="absolute left-[-9999px] top-auto w-px h-px overflow-hidden">
      <label htmlFor={`${id}-site`}>Não preencha este campo</label>
      <input
        id={`${id}-site`}
        name="site"
        type="text"
        tabIndex={-1}
        autoComplete="off"
        value={honeypot}
        onChange={(e) => onHoneypotChange(e.target.value)}
      />
    </div>

    <label htmlFor={`${id}-consent`} className="flex items-start gap-3 cursor-pointer group">
      <input
        id={`${id}-consent`}
        type="checkbox"
        checked={consent}
        onChange={(e) => onConsentChange(e.target.checked)}
        className="mt-0.5 h-4 w-4 shrink-0 rounded border-white/20 bg-white/[0.04] accent-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
      />
      <span className="text-xs leading-relaxed text-stone-400 group-hover:text-stone-300 transition-colors">
        Autorizo o contato e o tratamento dos meus dados conforme a{' '}
        <Link to="/privacidade" className="text-amber-400 hover:text-amber-300 underline underline-offset-2" onClick={(e) => e.stopPropagation()}>
          Política de Privacidade
        </Link>
        . Posso pedir a exclusão a qualquer momento.
      </span>
    </label>

    <p className="text-[11px] leading-relaxed text-stone-600">{finalidade}</p>

    {error && <p className="text-rose-400 text-xs">{error}</p>}
  </div>
);

export default LeadConsentFields;
