import { supabase } from '@/integrations/supabase/client';

/**
 * Camada única de envio de leads.
 *
 * Responsabilidades:
 * - Honeypot (campo invisível que apenas robôs preenchem)
 * - Limite de frequência no cliente (complementa o limite aplicado no banco)
 * - Registro explícito do consentimento LGPD
 */

const THROTTLE_KEY = 'lead-last-submit';
const THROTTLE_MS = 60_000;

export interface SubmitLeadInput {
  nome: string;
  email: string;
  whatsapp?: string | null;
  interesse: string;
  consentimento: boolean;
  honeypot?: string;
}

export type SubmitLeadResult =
  | { ok: true; skipped?: boolean }
  | { ok: false; message: string };

export async function submitLead(input: SubmitLeadInput): Promise<SubmitLeadResult> {
  // Robôs preenchem todos os campos do formulário, inclusive o invisível.
  if (input.honeypot && input.honeypot.trim().length > 0) {
    return { ok: true, skipped: true };
  }

  if (!input.consentimento) {
    return { ok: false, message: 'É necessário autorizar o contato para enviar.' };
  }

  try {
    const last = Number(localStorage.getItem(THROTTLE_KEY) || 0);
    if (last && Date.now() - last < THROTTLE_MS) {
      return { ok: false, message: 'Aguarde um minuto antes de enviar novamente.' };
    }
  } catch {
    // localStorage bloqueado: o limite do banco continua valendo.
  }

  const { error } = await supabase.from('leads' as any).insert({
    nome: input.nome,
    email: input.email,
    whatsapp: input.whatsapp || null,
    interesse: input.interesse,
    consentimento_lgpd: true,
    consentimento_em: new Date().toISOString(),
  } as any);

  if (error) {
    const raw = `${error.message || ''}`.toLowerCase();
    if (raw.includes('rate_limit_exceeded')) {
      return { ok: false, message: 'Muitos envios em pouco tempo. Tente novamente mais tarde.' };
    }
    if (raw.includes('consentimento')) {
      return { ok: false, message: 'É necessário autorizar o contato para enviar.' };
    }
    return { ok: false, message: 'Erro ao enviar. Tente novamente.' };
  }

  try {
    localStorage.setItem(THROTTLE_KEY, String(Date.now()));
  } catch {
    // ignorado
  }

  return { ok: true };
}
