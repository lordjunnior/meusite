/**
 * Plantas que possuem ficha dedicada no silo temático.
 * A rota dinâmica /soberania-organica/planta/:slug redireciona para a URL
 * canônica abaixo, evitando conteúdo duplicado servindo 200 em duas URLs.
 * O gerador de sitemap lê este mesmo mapa para não listar a versão duplicada.
 */
export const PLANTA_PAGINA_DEDICADA: Record<string, string> = {
  guaco: '/soberania-organica/plantas-subutilizadas/guaco',
  tanchagem: '/soberania-organica/plantas-subutilizadas/tanchagem',
  'babosa-acemannan': '/soberania-organica/babosa-acemannan',
  'oleo-ricino-biohacker': '/soberania-organica/oleo-ricino-biohacker',
  propolis: '/soberania-organica/propolis',
};
