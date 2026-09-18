/**
 * Oferta contextual por silo.
 *
 * Substitui o modal de saída global: cada silo tem um material específico,
 * coerente com o que a pessoa está lendo naquele momento.
 */

export interface SiloOffer {
  /** Identificador do silo, usado como chave de dispensa e de origem do lead */
  id: string;
  /** Rótulo curto acima do título */
  eyebrow: string;
  /** Nome do material entregue */
  titulo: string;
  /** Uma frase explicando o que a pessoa recebe */
  descricao: string;
  /** Texto do botão. Uma ação, sempre no infinitivo direto */
  cta: string;
  /** Valor gravado no campo interesse do lead */
  interesse: string;
}

const OFFERS: Array<{ prefixes: string[]; offer: SiloOffer }> = [
  {
    prefixes: ['/autocustodia', '/chaves', '/bitcoin-seguro', '/comparativos'],
    offer: {
      id: 'autocustodia',
      eyebrow: 'Material do silo de autocustódia',
      titulo: 'Checklist de Autocustódia',
      descricao:
        'Os 21 pontos de verificação antes, durante e depois de tirar suas chaves da corretora. Em PDF, para imprimir e riscar à caneta.',
      cta: 'Receber o checklist',
      interesse: 'checklist-autocustodia',
    },
  },
  {
    prefixes: ['/soberania-organica', '/plantas', '/alimentar', '/conhecimento-perdido', '/horta-urbana'],
    offer: {
      id: 'organica',
      eyebrow: 'Material do silo de soberania orgânica',
      titulo: 'Calendário de Plantio',
      descricao:
        'O que semear em cada mês, por região do Brasil, com as espécies que sustentam uma casa e não apenas uma salada.',
      cta: 'Receber o calendário',
      interesse: 'calendario-plantio',
    },
  },
  {
    prefixes: ['/seguranca-mobile'],
    offer: {
      id: 'mobile',
      eyebrow: 'Material do silo de segurança mobile',
      titulo: 'Checklist de Blindagem do Celular',
      descricao:
        'A sequência de ajustes de permissão, rede e conta que reduz a superfície de rastreamento do aparelho que você já tem.',
      cta: 'Receber o checklist',
      interesse: 'checklist-blindagem-mobile',
    },
  },
  {
    prefixes: ['/saida', '/jurisdicoes'],
    offer: {
      id: 'saida',
      eyebrow: 'Material do silo de saída',
      titulo: 'Mapa de Jurisdições',
      descricao:
        'Comparação objetiva de residência, custo e tributação nos destinos mais usados por brasileiros, sem promessa de paraíso.',
      cta: 'Receber o mapa',
      interesse: 'mapa-jurisdicoes',
    },
  },
  {
    prefixes: ['/economia', '/bitcoin', '/inflacao', '/confisco', '/alertas', '/mercado-tradicional', '/imposto-renda'],
    offer: {
      id: 'economia',
      eyebrow: 'Material do silo de economia',
      titulo: 'Radar da Soberania',
      descricao:
        'Uma leitura semanal da movimentação regulatória que afeta o seu dinheiro, com a tradução do que muda na prática.',
      cta: 'Receber o radar',
      interesse: 'radar-soberania',
    },
  },
];

const FALLBACK: SiloOffer = {
  id: 'geral',
  eyebrow: 'Material da Universidade da Soberania',
  titulo: 'Radar da Soberania',
  descricao:
    'Uma leitura semanal sobre dinheiro, comida, saúde e jurisdição tratados como um sistema só. Sem disparo em massa.',
  cta: 'Receber o radar',
  interesse: 'radar-soberania',
};

export function getSiloOffer(pathname: string): SiloOffer {
  const path = pathname.toLowerCase();
  for (const entry of OFFERS) {
    if (entry.prefixes.some((prefix) => path === prefix || path.startsWith(`${prefix}/`))) {
      return entry.offer;
    }
  }
  return FALLBACK;
}
