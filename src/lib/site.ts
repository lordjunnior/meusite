/**
 * Fonte única de verdade do domínio oficial.
 *
 * Toda URL canônica, og:url e og:image do site precisa nascer daqui.
 * Nenhuma página deve escrever o domínio à mão. O script
 * scripts/check-canonical.ts roda antes do build e quebra a compilação
 * se algum arquivo voltar a apontar para um domínio que não é este.
 */
export const SITE_HOST = 'lordjunnior.com.br';
export const SITE_URL = `https://${SITE_HOST}`;

/** Domínios legados que já apareceram em canonicals e nunca devem voltar. */
export const LEGACY_HOSTS = [
  'sovereign-arsenal.lovable.app',
  'lordjunnior.lovable.app',
  'id-preview--67ce849d-7296-411b-8ace-75ce21788660.lovable.app',
  'soberania.app',
  'www.soberania.app',
  'despertarsoberano.com',
  'www.despertarsoberano.com',
  'www.lordjunnior.com.br',
  'lordjunnior.com',
] as const;

/** Monta uma URL absoluta no domínio oficial a partir de um caminho. */
export function absoluteUrl(path = '/'): string {
  if (!path) return SITE_URL;
  if (/^https?:\/\//i.test(path)) return canonicalUrl(path);
  return `${SITE_URL}/${path.replace(/^\/+/, '')}`.replace(/\/+$/, '') || SITE_URL;
}

/**
 * Normaliza qualquer URL para o domínio oficial.
 * Aceita caminho relativo, domínio legado ou URL já correta.
 */
export function canonicalUrl(input?: string): string {
  if (!input) return SITE_URL;
  const trimmed = input.trim();
  if (!trimmed) return SITE_URL;
  if (!/^https?:\/\//i.test(trimmed)) return absoluteUrl(trimmed);

  try {
    const url = new URL(trimmed);
    url.protocol = 'https:';
    url.host = SITE_HOST;
    url.hash = '';
    const normalized = url.toString();
    return normalized.endsWith('/') && url.pathname !== '/'
      ? normalized.slice(0, -1)
      : normalized;
  } catch {
    return SITE_URL;
  }
}
