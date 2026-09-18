/**
 * ENGENHARIA DE DOMINAÇÃO SEMÂNTICA
 * Master SEO Keyword Clusters, LSI Terms & Topic Authority Map
 * 
 * Estrutura: Cada cluster representa um "Pilar de Conteúdo" (Skyscraper)
 * com palavras-chave primárias, LSI (Latent Semantic Indexing),
 * long-tail de conversão e entidades semânticas para JSON-LD.
 */

export interface SeoPageData {
  /** Título CTR otimizado com PNL (max 60 chars para SERP) */
  title: string;
  /** Meta description com gatilho emocional (max 155 chars) */
  description: string;
  /** Canonical URL */
  canonical: string;
  /** Keyword primária (focus keyword) */
  primaryKeyword: string;
  /** LSI keywords (semânticas relacionadas) */
  lsiKeywords: string[];
  /** Long-tail de conversão */
  longTailKeywords: string[];
  /** Breadcrumb trail */
  breadcrumbs: { name: string; url: string }[];
  /** JSON-LD schema type */
  schemaType: 'Article' | 'HowTo' | 'FAQPage' | 'CollectionPage' | 'WebPage' | 'TechArticle' | 'MedicalWebPage';
  /** OG Image */
  ogImage?: string;
  /** Article section for schema */
  articleSection?: string;
  /** Cluster parent (for topic cluster linking) */
  clusterParent?: string;
  /** Related pages (internal linking graph) */
  relatedPages?: string[];
}

const BASE = 'https://lordjunnior.com.br';

// ═══════════════════════════════════════════════════════
// TOPIC CLUSTER 1: BITCOIN & CRIPTOECONOMIA
// Pilar: /bitcoin | /bitcoin/o-que-e
// ═══════════════════════════════════════════════════════

export const SEO_DATA: Record<string, SeoPageData> = {
  '/': {
    title: 'Lord Junnior — Soberania Individual: Bitcoin, Saúde e Liberdade',
    description: 'Pare de terceirizar sua vida. Do Bitcoin à medicina natural, ferramentas práticas para viver fora do cabresto do sistema. 97+ guias gratuitos.',
    canonical: `${BASE}/`,
    primaryKeyword: 'soberania individual',
    lsiKeywords: ['liberdade financeira', 'autonomia pessoal', 'independência do estado', 'autossuficiência', 'sobrevivencialismo', 'bitcoin brasil', 'medicina natural', 'autocustódia'],
    longTailKeywords: ['como sair do sistema financeiro', 'como viver sem depender do governo', 'guia completo soberania individual'],
    breadcrumbs: [{ name: 'Início', url: '/' }],
    schemaType: 'WebPage',
    articleSection: 'Soberania Individual',
  },

  // ── Bitcoin Core ──
  '/bitcoin/o-que-e': {
    title: 'O Que é Bitcoin? Guia Definitivo 2026 — Sem Enrolação',
    description: 'Bitcoin explicado com clareza brutal: como funciona, por que é escasso e como proteger seu patrimônio contra a inflação do estado. Guia técnico completo.',
    canonical: `${BASE}/bitcoin/o-que-e`,
    primaryKeyword: 'o que é bitcoin',
    lsiKeywords: ['bitcoin como funciona', 'criptomoeda descentralizada', 'moeda digital', 'satoshi nakamoto', 'blockchain bitcoin', 'dinheiro digital', 'bitcoin para iniciantes', 'bitcoin é seguro'],
    longTailKeywords: ['o que é bitcoin e como funciona', 'bitcoin explicado para leigos', 'vale a pena investir em bitcoin 2026', 'bitcoin é seguro para investir'],
    breadcrumbs: [{ name: 'Início', url: '/' }, { name: 'Bitcoin', url: '/bitcoin' }, { name: 'O Que é Bitcoin', url: '/bitcoin/o-que-e' }],
    schemaType: 'Article',
    articleSection: 'Bitcoin',
    clusterParent: '/bitcoin',
    relatedPages: ['/blockchain', '/bitcoin/nocoes-basicas', '/bitcoin-seguro', '/chaves', '/21-milhoes'],
  },
  '/bitcoin': {
    title: 'Bitcoin: O Pilar da Soberania Financeira | Hub Completo',
    description: 'Centro de conhecimento Bitcoin: da teoria à prática. Autocustódia, mineração, Lightning Network, halving e estratégias de proteção patrimonial.',
    canonical: `${BASE}/bitcoin`,
    primaryKeyword: 'bitcoin',
    lsiKeywords: ['criptomoeda', 'moeda digital', 'descentralização', 'blockchain', 'satoshi', 'proof of work', 'mineração bitcoin', 'carteira bitcoin'],
    longTailKeywords: ['tudo sobre bitcoin', 'guia completo bitcoin brasil', 'como começar com bitcoin'],
    breadcrumbs: [{ name: 'Início', url: '/' }, { name: 'Bitcoin', url: '/bitcoin' }],
    schemaType: 'CollectionPage',
    articleSection: 'Bitcoin',
    relatedPages: ['/bitcoin/o-que-e', '/blockchain', '/autocustodia', '/lightning'],
  },
  '/blockchain': {
    title: 'Blockchain: Como Funciona a Tecnologia Por Trás do Bitcoin',
    description: 'Entenda blockchain sem jargão: blocos, hashes, mineração e por que nenhum governo pode alterar o registro. Explicação visual e técnica.',
    canonical: `${BASE}/blockchain`,
    primaryKeyword: 'blockchain como funciona',
    lsiKeywords: ['tecnologia blockchain', 'ledger distribuído', 'hash criptográfico', 'blocos encadeados', 'proof of work', 'nó bitcoin', 'rede descentralizada', 'imutabilidade'],
    longTailKeywords: ['como funciona a blockchain do bitcoin', 'blockchain explicada', 'o que é blockchain de forma simples'],
    breadcrumbs: [{ name: 'Início', url: '/' }, { name: 'Bitcoin', url: '/bitcoin' }, { name: 'Blockchain', url: '/blockchain' }],
    schemaType: 'TechArticle',
    articleSection: 'Bitcoin',
    clusterParent: '/bitcoin',
    relatedPages: ['/bitcoin/o-que-e', '/mineracao', '/bitcoin/nocoes-basicas'],
  },
  '/bitcoin/nocoes-basicas': {
    title: 'Noções Fundamentais de Bitcoin — O Mínimo que Você PRECISA Saber',
    description: 'As bases técnicas do Bitcoin: UTXO, fees, mempool, confirmações e segurança. Conhecimento que separa o investidor do apostador.',
    canonical: `${BASE}/bitcoin/nocoes-basicas`,
    primaryKeyword: 'noções bitcoin',
    lsiKeywords: ['UTXO', 'mempool', 'taxa bitcoin', 'confirmação transação', 'bloco bitcoin', 'fee rate', 'satoshi', 'nó completo'],
    longTailKeywords: ['como funcionam transações bitcoin', 'o que é UTXO bitcoin', 'como funciona a mempool'],
    breadcrumbs: [{ name: 'Início', url: '/' }, { name: 'Bitcoin', url: '/bitcoin' }, { name: 'Noções Fundamentais', url: '/bitcoin/nocoes-basicas' }],
    schemaType: 'TechArticle',
    articleSection: 'Bitcoin',
    clusterParent: '/bitcoin',
    relatedPages: ['/bitcoin/o-que-e', '/transacoes', '/blockchain'],
  },
  '/bitcoin-seguro': {
    title: 'Bitcoin é Seguro? A Verdade Que Bancos Não Querem Que Você Saiba',
    description: 'Análise técnica da segurança do Bitcoin: criptografia SHA-256, rede distribuída e por que é mais seguro que seu banco. Dados e provas.',
    canonical: `${BASE}/bitcoin-seguro`,
    primaryKeyword: 'bitcoin é seguro',
    lsiKeywords: ['segurança bitcoin', 'criptografia SHA-256', 'rede distribuída', 'ataque 51%', 'bitcoin hackeado', 'proteção criptográfica', 'hash rate'],
    longTailKeywords: ['bitcoin é seguro para investir', 'bitcoin pode ser hackeado', 'quão seguro é o bitcoin'],
    breadcrumbs: [{ name: 'Início', url: '/' }, { name: 'Bitcoin', url: '/bitcoin' }, { name: 'Bitcoin é Seguro', url: '/bitcoin-seguro' }],
    schemaType: 'Article',
    articleSection: 'Bitcoin',
    clusterParent: '/bitcoin',
    relatedPages: ['/bitcoin/o-que-e', '/chaves', '/autocustodia'],
  },
  '/chaves': {
    title: 'Chaves Privadas Bitcoin: Seu Dinheiro Só Existe Se Você Tiver Elas',
    description: 'Entenda chaves privadas, públicas e seed phrases. Se não são suas chaves, não é seu Bitcoin. Guia técnico com exemplos práticos.',
    canonical: `${BASE}/chaves`,
    primaryKeyword: 'chaves privadas bitcoin',
    lsiKeywords: ['seed phrase', 'chave pública', 'carteira bitcoin', 'backup bitcoin', 'BIP39', 'mnemônico', 'entropia', 'derivação de chaves'],
    longTailKeywords: ['o que são chaves privadas bitcoin', 'como guardar seed phrase', 'not your keys not your coins'],
    breadcrumbs: [{ name: 'Início', url: '/' }, { name: 'Bitcoin', url: '/bitcoin' }, { name: 'Chaves Privadas', url: '/chaves' }],
    schemaType: 'TechArticle',
    articleSection: 'Bitcoin',
    clusterParent: '/bitcoin',
    relatedPages: ['/autocustodia', '/bitcoin-seguro', '/mobilidade-de-chaves'],
  },
  '/transacoes': {
    title: 'Transações Bitcoin: Como Funciona Cada Envio na Blockchain',
    description: 'Anatomia de uma transação Bitcoin: inputs, outputs, fees e confirmações. Entenda o que acontece quando você clica "enviar".',
    canonical: `${BASE}/transacoes`,
    primaryKeyword: 'transações bitcoin',
    lsiKeywords: ['enviar bitcoin', 'taxa transação', 'confirmação blockchain', 'input output', 'UTXO', 'mempool', 'fee rate', 'RBF'],
    longTailKeywords: ['como enviar bitcoin', 'quanto tempo demora transação bitcoin', 'como funciona transação bitcoin'],
    breadcrumbs: [{ name: 'Início', url: '/' }, { name: 'Bitcoin', url: '/bitcoin' }, { name: 'Transações', url: '/transacoes' }],
    schemaType: 'TechArticle',
    articleSection: 'Bitcoin',
    clusterParent: '/bitcoin',
    relatedPages: ['/bitcoin/nocoes-basicas', '/lightning', '/blockchain'],
  },
  '/mineracao': {
    title: 'Mineração de Bitcoin: Como Funciona e Por Que é Essencial',
    description: 'Proof of Work, hash rate, dificuldade e recompensa de bloco. Entenda por que mineradores são os guardiões da rede Bitcoin.',
    canonical: `${BASE}/mineracao`,
    primaryKeyword: 'mineração de bitcoin',
    lsiKeywords: ['proof of work', 'hash rate', 'ASIC', 'pool de mineração', 'dificuldade mineração', 'recompensa bloco', 'consumo energia bitcoin', 'nonce'],
    longTailKeywords: ['como funciona mineração de bitcoin', 'vale a pena minerar bitcoin 2026', 'mineração bitcoin é lucrativa'],
    breadcrumbs: [{ name: 'Início', url: '/' }, { name: 'Bitcoin', url: '/bitcoin' }, { name: 'Mineração', url: '/mineracao' }],
    schemaType: 'TechArticle',
    articleSection: 'Bitcoin',
    clusterParent: '/bitcoin',
    relatedPages: ['/blockchain', '/21-milhoes', '/halving-bitcoin'],
  },
  '/lightning': {
    title: 'Lightning Network: Bitcoin Instantâneo e Quase Gratuito',
    description: 'Layer 2 do Bitcoin: pagamentos instantâneos, micropagamentos e canais de pagamento. O futuro das transações descentralizadas.',
    canonical: `${BASE}/lightning`,
    primaryKeyword: 'lightning network',
    lsiKeywords: ['layer 2 bitcoin', 'canal de pagamento', 'micropagamento', 'pagamento instantâneo', 'BOLT11', 'invoice lightning', 'roteamento', 'liquidez'],
    longTailKeywords: ['o que é lightning network bitcoin', 'como usar lightning network', 'lightning network brasil'],
    breadcrumbs: [{ name: 'Início', url: '/' }, { name: 'Bitcoin', url: '/bitcoin' }, { name: 'Lightning Network', url: '/lightning' }],
    schemaType: 'TechArticle',
    articleSection: 'Bitcoin',
    clusterParent: '/bitcoin',
    relatedPages: ['/transacoes', '/pix-cripto', '/bitcoin/nocoes-basicas'],
  },
  '/21-milhoes': {
    title: '21 Milhões: Por Que o Bitcoin é o Ativo Mais Escasso da História',
    description: 'Hard cap de 21 milhões: a política monetária imutável do Bitcoin. Entenda por que escassez programada destrói a inflação.',
    canonical: `${BASE}/21-milhoes`,
    primaryKeyword: '21 milhões bitcoin',
    lsiKeywords: ['escassez bitcoin', 'hard cap', 'supply limitado', 'deflação', 'política monetária', 'último bitcoin', 'subsídio de bloco', 'modelo stock-to-flow'],
    longTailKeywords: ['por que bitcoin tem 21 milhões', 'quando será minerado o último bitcoin', 'bitcoin escassez digital'],
    breadcrumbs: [{ name: 'Início', url: '/' }, { name: 'Bitcoin', url: '/bitcoin' }, { name: '21 Milhões', url: '/21-milhoes' }],
    schemaType: 'Article',
    articleSection: 'Bitcoin',
    clusterParent: '/bitcoin',
    relatedPages: ['/halving-bitcoin', '/supply-shock', '/mineracao'],
  },
  '/supply-shock': {
    title: 'Supply Shock Bitcoin: O Choque de Oferta Que Vai Explodir o Preço',
    description: 'Dados em tempo real do supply shock: moedas perdidas, HODLers e ETFs drenando o mercado. Visualize a escassez acontecendo.',
    canonical: `${BASE}/supply-shock`,
    primaryKeyword: 'supply shock bitcoin',
    lsiKeywords: ['choque de oferta', 'bitcoin perdido', 'HODLer', 'ETF bitcoin', 'oferta circulante', 'moedas ilíquidas', 'acumulação institucional'],
    longTailKeywords: ['supply shock bitcoin 2026', 'quantos bitcoins foram perdidos', 'choque de oferta cripto'],
    breadcrumbs: [{ name: 'Início', url: '/' }, { name: 'Bitcoin', url: '/bitcoin' }, { name: 'Supply Shock', url: '/supply-shock' }],
    schemaType: 'Article',
    articleSection: 'Bitcoin',
    clusterParent: '/bitcoin',
    relatedPages: ['/21-milhoes', '/halving-bitcoin', '/futuro-bitcoin'],
  },
  '/halving-bitcoin': {
    title: 'Halving Bitcoin 2028: O Evento Que Muda Tudo — Prepare-se Agora',
    description: 'Entenda o halving: redução de 50% na emissão de novos bitcoins. Histórico, impacto no preço e por que 2028 será diferente.',
    canonical: `${BASE}/halving-bitcoin`,
    primaryKeyword: 'halving bitcoin',
    lsiKeywords: ['redução recompensa', 'ciclo bitcoin', 'emissão bitcoin', 'subsídio de bloco', 'halvening', 'ciclo de mercado', 'bull run'],
    longTailKeywords: ['quando é o próximo halving bitcoin', 'halving bitcoin 2028 previsão', 'o que acontece no halving'],
    breadcrumbs: [{ name: 'Início', url: '/' }, { name: 'Bitcoin', url: '/bitcoin' }, { name: 'Halving', url: '/halving-bitcoin' }],
    schemaType: 'Article',
    articleSection: 'Bitcoin',
    clusterParent: '/bitcoin',
    relatedPages: ['/21-milhoes', '/supply-shock', '/mineracao'],
  },
  '/volatilidade': {
    title: 'Volatilidade do Bitcoin: Por Que as Quedas São Oportunidades',
    description: 'Análise técnica da volatilidade: por que 80% de queda é normal em um ativo que subiu 10.000.000%. Dados históricos e psicologia.',
    canonical: `${BASE}/volatilidade`,
    primaryKeyword: 'volatilidade bitcoin',
    lsiKeywords: ['queda bitcoin', 'bear market', 'correção mercado', 'drawdown', 'risco retorno', 'DCA bitcoin', 'dollar cost averaging'],
    longTailKeywords: ['bitcoin vai cair mais', 'por que bitcoin cai tanto', 'como lidar com volatilidade bitcoin'],
    breadcrumbs: [{ name: 'Início', url: '/' }, { name: 'Bitcoin', url: '/bitcoin' }, { name: 'Volatilidade', url: '/volatilidade' }],
    schemaType: 'Article',
    articleSection: 'Bitcoin',
    clusterParent: '/bitcoin',
    relatedPages: ['/bitcoin-seguro', '/diversificacao', '/futuro-bitcoin'],
  },
  '/lastro': {
    title: 'Lastro do Bitcoin: O Que Dá Valor ao BTC (Não é Ouro)',
    description: 'O lastro do Bitcoin é matemática, energia e consenso global. Entenda por que isso é superior ao "lastro" do Real ou do Dólar.',
    canonical: `${BASE}/lastro`,
    primaryKeyword: 'lastro do bitcoin',
    lsiKeywords: ['valor intrínseco', 'proof of work', 'energia bitcoin', 'consenso nakamoto', 'escassez digital', 'bitcoin sem lastro'],
    longTailKeywords: ['bitcoin tem lastro', 'o que dá valor ao bitcoin', 'lastro bitcoin vs dólar'],
    breadcrumbs: [{ name: 'Início', url: '/' }, { name: 'Bitcoin', url: '/bitcoin' }, { name: 'Lastro', url: '/lastro' }],
    schemaType: 'Article',
    articleSection: 'Bitcoin',
    clusterParent: '/bitcoin',
    relatedPages: ['/bitcoin/o-que-e', '/21-milhoes', '/bitcoin-vs-fiat'],
  },
  '/candlestick': {
    title: 'Candlestick Bitcoin: Leitura de Gráficos Para Soberanos',
    description: 'Aprenda a ler candles: doji, martelo, engolfo e padrões de reversão. Análise técnica aplicada ao Bitcoin sem enrolação.',
    canonical: `${BASE}/candlestick`,
    primaryKeyword: 'candlestick bitcoin',
    lsiKeywords: ['análise técnica', 'gráfico bitcoin', 'padrão vela', 'doji', 'martelo', 'engolfo', 'suporte resistência', 'volume'],
    longTailKeywords: ['como ler gráfico candlestick bitcoin', 'padrões candlestick mais importantes', 'análise técnica bitcoin para iniciantes'],
    breadcrumbs: [{ name: 'Início', url: '/' }, { name: 'Bitcoin', url: '/bitcoin' }, { name: 'Candlestick', url: '/candlestick' }],
    schemaType: 'TechArticle',
    articleSection: 'Bitcoin',
    clusterParent: '/bitcoin',
    relatedPages: ['/bitcoin/nocoes-basicas', '/volatilidade', '/supply-shock'],
  },
  '/diversificacao': {
    title: 'Diversificação: A Grande Falácia Que Protege os Bancos, Não Você',
    description: 'Por que "diversificar" é o conselho de quem lucra com suas taxas. Análise matemática: concentração em Bitcoin vs. diluição em fundos.',
    canonical: `${BASE}/diversificacao`,
    primaryKeyword: 'diversificação investimentos',
    lsiKeywords: ['concentração bitcoin', 'portfólio', 'risco retorno', 'alocação de ativos', 'fundo de investimento', 'taxa administração', 'buy and hold'],
    longTailKeywords: ['diversificação vale a pena', 'por que não diversificar', 'concentrar em bitcoin'],
    breadcrumbs: [{ name: 'Início', url: '/' }, { name: 'Bitcoin', url: '/bitcoin' }, { name: 'Diversificação', url: '/diversificacao' }],
    schemaType: 'Article',
    articleSection: 'Bitcoin',
    clusterParent: '/bitcoin',
    relatedPages: ['/bitcoin-vs-fiat', '/bitcoin-vs-imovel', '/bitcoin-vs-altcoins'],
  },
  '/bitcoin-vs-altcoins': {
    title: 'Bitcoin vs Altcoins: Por Que 99% das Criptos Vão Morrer',
    description: 'Comparativo brutal: Bitcoin é dinheiro, altcoins são apostas. Dados de mortalidade de projetos e por que maximalism funciona.',
    canonical: `${BASE}/bitcoin-vs-altcoins`,
    primaryKeyword: 'bitcoin vs altcoins',
    lsiKeywords: ['maximalismo bitcoin', 'shitcoins', 'ethereum vs bitcoin', 'dominância bitcoin', 'criptomoeda alternativa', 'token scam'],
    longTailKeywords: ['bitcoin ou altcoins qual é melhor', 'por que só bitcoin', 'altcoins vão morrer'],
    breadcrumbs: [{ name: 'Início', url: '/' }, { name: 'Bitcoin', url: '/bitcoin' }, { name: 'Bitcoin vs Altcoins', url: '/bitcoin-vs-altcoins' }],
    schemaType: 'Article',
    articleSection: 'Bitcoin',
    clusterParent: '/bitcoin',
    relatedPages: ['/diversificacao', '/bitcoin/o-que-e', '/blindagem-golpes'],
  },
  '/bitcoin-vs-fiat': {
    title: 'Bitcoin vs Dinheiro Fiat: O Real Já Perdeu 99,7% do Valor',
    description: 'Dados históricos: como moedas fiduciárias são destruídas por governos. Compare o Real com o Bitcoin em poder de compra desde 1994.',
    canonical: `${BASE}/bitcoin-vs-fiat`,
    primaryKeyword: 'bitcoin vs fiat',
    lsiKeywords: ['moeda fiduciária', 'inflação real', 'desvalorização moeda', 'poder de compra', 'impressão de dinheiro', 'banco central', 'política monetária'],
    longTailKeywords: ['bitcoin melhor que real', 'moeda fiat perde valor', 'bitcoin vs real brasileiro comparação'],
    breadcrumbs: [{ name: 'Início', url: '/' }, { name: 'Bitcoin', url: '/bitcoin' }, { name: 'Bitcoin vs Fiat', url: '/bitcoin-vs-fiat' }],
    schemaType: 'Article',
    articleSection: 'Bitcoin',
    clusterParent: '/bitcoin',
    relatedPages: ['/inflacao-imposto-oculto', '/historia-do-dinheiro', '/lastro'],
  },
  '/bitcoin-vs-imovel': {
    title: 'Bitcoin vs Imóvel: Qual Protege Mais Seu Patrimônio em 2026?',
    description: 'Comparativo completo: liquidez, rentabilidade, impostos e confisco. Por que imóvel é a armadilha favorita do governo.',
    canonical: `${BASE}/bitcoin-vs-imovel`,
    primaryKeyword: 'bitcoin vs imóvel',
    lsiKeywords: ['investimento imobiliário', 'liquidez', 'imposto propriedade', 'IPTU', 'confisco imóvel', 'rentabilidade bitcoin', 'patrimônio digital'],
    longTailKeywords: ['bitcoin ou imóvel qual é melhor investimento', 'por que não comprar imóvel', 'bitcoin vs casa própria'],
    breadcrumbs: [{ name: 'Início', url: '/' }, { name: 'Bitcoin', url: '/bitcoin' }, { name: 'Bitcoin vs Imóvel', url: '/bitcoin-vs-imovel' }],
    schemaType: 'Article',
    articleSection: 'Bitcoin',
    clusterParent: '/bitcoin',
    relatedPages: ['/diversificacao', '/bitcoin-vs-fiat', '/confisco-1990'],
  },
  '/futuro-bitcoin': {
    title: 'O Futuro do Bitcoin: Previsões 2026-2030 Com Base em Dados',
    description: 'Adoção institucional, ETFs, regulação e cenários de preço. O que esperar do Bitcoin na próxima década com análise técnica.',
    canonical: `${BASE}/futuro-bitcoin`,
    primaryKeyword: 'futuro do bitcoin',
    lsiKeywords: ['previsão bitcoin', 'adoção institucional', 'ETF bitcoin', 'regulação cripto', 'preço bitcoin 2030', 'hyperbitcoinization'],
    longTailKeywords: ['bitcoin vai subir até quanto', 'futuro do bitcoin 2026', 'previsão preço bitcoin 2030'],
    breadcrumbs: [{ name: 'Início', url: '/' }, { name: 'Bitcoin', url: '/bitcoin' }, { name: 'Futuro', url: '/futuro-bitcoin' }],
    schemaType: 'Article',
    articleSection: 'Bitcoin',
    clusterParent: '/bitcoin',
    relatedPages: ['/halving-bitcoin', '/supply-shock', '/21-milhoes'],
  },
  '/dicionario-cripto': {
    title: 'Dicionário Cripto: 200+ Termos de Bitcoin e Blockchain Explicados',
    description: 'Glossário completo de A a Z: UTXO, halving, cold storage, DeFi e mais. A referência definitiva em português para criptomoedas.',
    canonical: `${BASE}/dicionario-cripto`,
    primaryKeyword: 'dicionário cripto',
    lsiKeywords: ['glossário bitcoin', 'termos blockchain', 'vocabulário cripto', 'significado UTXO', 'o que é DeFi', 'termos criptomoeda'],
    longTailKeywords: ['dicionário de criptomoedas em português', 'glossário bitcoin completo', 'termos técnicos bitcoin'],
    breadcrumbs: [{ name: 'Início', url: '/' }, { name: 'Bitcoin', url: '/bitcoin' }, { name: 'Dicionário Cripto', url: '/dicionario-cripto' }],
    schemaType: 'WebPage',
    articleSection: 'Bitcoin',
    clusterParent: '/bitcoin',
    relatedPages: ['/bitcoin/o-que-e', '/bitcoin/nocoes-basicas', '/blockchain'],
  },
  '/bitcoin/bip-110-guerra-espaco-bloco': {
    title: 'BIP-110: A Guerra Pelo Espaço de Bloco do Bitcoin',
    description: 'Análise técnica do BIP-110: como a competição pelo espaço de bloco molda o futuro das taxas e segurança da rede Bitcoin.',
    canonical: `${BASE}/bitcoin/bip-110-guerra-espaco-bloco`,
    primaryKeyword: 'BIP-110 bitcoin',
    lsiKeywords: ['espaço de bloco', 'fee market', 'tamanho bloco', 'segwit', 'taproot', 'ordinals', 'inscriptions', 'taxa mineração'],
    longTailKeywords: ['BIP-110 explicado', 'guerra espaço bloco bitcoin', 'taxas bitcoin futuro'],
    breadcrumbs: [{ name: 'Início', url: '/' }, { name: 'Bitcoin', url: '/bitcoin' }, { name: 'BIP-110', url: '/bitcoin/bip-110-guerra-espaco-bloco' }],
    schemaType: 'TechArticle',
    articleSection: 'Bitcoin',
    clusterParent: '/bitcoin',
    relatedPages: ['/mineracao', '/transacoes', '/bitcoin/nocoes-basicas'],
  },

  // ═══════════════════════════════════════════════════════
  // TOPIC CLUSTER 2: AUTOCUSTÓDIA & SEGURANÇA
  // Pilar: /autocustodia
  // ═══════════════════════════════════════════════════════
  '/autocustodia': {
    title: 'Autocustódia Bitcoin: Seja Seu Próprio Banco — Guia de Elite',
    description: 'Guia definitivo de autocustódia: hardware wallets, cold storage, passphrase e multisig. Proteja seus bitcoins como um profissional.',
    canonical: `${BASE}/autocustodia`,
    primaryKeyword: 'autocustódia bitcoin',
    lsiKeywords: ['cold storage', 'hardware wallet', 'carteira fria', 'self custody', 'chave privada', 'seed phrase', 'multisig', 'air-gapped'],
    longTailKeywords: ['como fazer autocustódia de bitcoin', 'melhor hardware wallet bitcoin', 'autocustódia bitcoin para iniciantes'],
    breadcrumbs: [{ name: 'Início', url: '/' }, { name: 'Autocustódia', url: '/autocustodia' }],
    schemaType: 'HowTo',
    articleSection: 'Autocustódia',
    relatedPages: ['/chaves', '/bitcoin-seguro', '/blindagem-golpes', '/mobilidade-de-chaves'],
  },
  '/autocustodia/hardware-wallet-diy-bitcoin': {
    title: 'Hardware Wallet DIY: Construa Sua Carteira Bitcoin do Zero',
    description: 'Tutorial passo a passo para construir sua própria hardware wallet com componentes acessíveis. Air-gapped, open-source e soberana.',
    canonical: `${BASE}/autocustodia/hardware-wallet-diy-bitcoin`,
    primaryKeyword: 'hardware wallet DIY',
    lsiKeywords: ['carteira bitcoin caseira', 'air-gapped wallet', 'SeedSigner', 'Krux', 'ESP32 bitcoin', 'carteira offline', 'open source wallet'],
    longTailKeywords: ['como fazer hardware wallet bitcoin caseira', 'hardware wallet DIY tutorial', 'construir carteira bitcoin offline'],
    breadcrumbs: [{ name: 'Início', url: '/' }, { name: 'Autocustódia', url: '/autocustodia' }, { name: 'Hardware Wallet DIY', url: '/autocustodia/hardware-wallet-diy-bitcoin' }],
    schemaType: 'HowTo',
    articleSection: 'Autocustódia',
    clusterParent: '/autocustodia',
    relatedPages: ['/autocustodia/krux-passphrase-bluewallet', '/chaves', '/mobilidade-de-chaves'],
  },
  '/autocustodia/krux-passphrase-bluewallet': {
    title: 'Krux + Passphrase + BlueWallet: Autocustódia Blindada Passo a Passo',
    description: 'Tutorial completo: configure Krux com passphrase BIP-39 e BlueWallet watch-only. Carteira-isca, PSBT air-gapped e máxima segurança.',
    canonical: `${BASE}/autocustodia/krux-passphrase-bluewallet`,
    primaryKeyword: 'krux passphrase bluewallet',
    lsiKeywords: ['krux tutorial', 'passphrase BIP39', 'BlueWallet observação', 'PSBT air-gapped', 'carteira isca', 'watch-only wallet', 'QR code bitcoin'],
    longTailKeywords: ['como configurar krux com passphrase', 'tutorial krux bluewallet passo a passo', 'carteira bitcoin air-gapped krux'],
    breadcrumbs: [{ name: 'Início', url: '/' }, { name: 'Autocustódia', url: '/autocustodia' }, { name: 'Krux + Passphrase + BlueWallet', url: '/autocustodia/krux-passphrase-bluewallet' }],
    schemaType: 'HowTo',
    articleSection: 'Autocustódia',
    clusterParent: '/autocustodia',
    relatedPages: ['/autocustodia/hardware-wallet-diy-bitcoin', '/chaves', '/mobilidade-de-chaves'],
  },
  '/mobilidade-de-chaves': {
    title: 'Mobilidade de Chaves Bitcoin: Leve Seu Patrimônio Para Qualquer Lugar',
    description: 'Como transportar bilhões em Bitcoin na sua cabeça. Técnicas de memorização, steel plates e protocolos de fuga com seus fundos.',
    canonical: `${BASE}/mobilidade-de-chaves`,
    primaryKeyword: 'mobilidade chaves bitcoin',
    lsiKeywords: ['brain wallet', 'memorizar seed', 'steel plate', 'backup bitcoin', 'migrar carteira', 'transportar bitcoin', 'border crossing bitcoin'],
    longTailKeywords: ['como memorizar seed phrase bitcoin', 'como transportar bitcoin entre países', 'backup seed phrase seguro'],
    breadcrumbs: [{ name: 'Início', url: '/' }, { name: 'Autocustódia', url: '/autocustodia' }, { name: 'Mobilidade de Chaves', url: '/mobilidade-de-chaves' }],
    schemaType: 'HowTo',
    articleSection: 'Autocustódia',
    clusterParent: '/autocustodia',
    relatedPages: ['/chaves', '/teoria-das-bandeiras', '/taxa-de-fuga'],
  },
  '/blindagem-golpes': {
    title: 'Blindagem Contra Golpes Cripto: Proteja-se de 99% das Fraudes',
    description: 'Engenharia social, phishing, rug pulls e golpes PIX. Identifique e neutralize ameaças antes que elas cheguem ao seu bitcoin.',
    canonical: `${BASE}/blindagem-golpes`,
    primaryKeyword: 'golpes bitcoin',
    lsiKeywords: ['phishing cripto', 'engenharia social', 'rug pull', 'scam bitcoin', 'golpe PIX', 'fake exchange', 'proteção digital', 'segurança online'],
    longTailKeywords: ['como não cair em golpes de bitcoin', 'golpes mais comuns com criptomoedas', 'como identificar golpe cripto'],
    breadcrumbs: [{ name: 'Início', url: '/' }, { name: 'Autocustódia', url: '/autocustodia' }, { name: 'Blindagem Golpes', url: '/blindagem-golpes' }],
    schemaType: 'Article',
    articleSection: 'Autocustódia',
    clusterParent: '/autocustodia',
    relatedPages: ['/bitcoin-seguro', '/autocustodia', '/vazamento-dados'],
  },

  // ═══════════════════════════════════════════════════════
  // TOPIC CLUSTER 3: SOBERANIA FINANCEIRA
  // Pilar: /soberania-financeira
  // ═══════════════════════════════════════════════════════
  '/soberania-financeira': {
    title: 'Soberania Financeira: Escape do Sistema Bancário — Guia Completo',
    description: 'Contas internacionais, exchanges sem KYC, PIX descentralizado e teoria das bandeiras. Seu mapa de fuga do controle financeiro.',
    canonical: `${BASE}/soberania-financeira`,
    primaryKeyword: 'soberania financeira',
    lsiKeywords: ['liberdade financeira', 'conta internacional', 'exchange sem KYC', 'privacidade financeira', 'offshore', 'diversificação jurisdicional', 'flag theory'],
    longTailKeywords: ['como ter soberania financeira', 'como sair do sistema bancário brasileiro', 'conta no exterior sem sair do brasil'],
    breadcrumbs: [{ name: 'Início', url: '/' }, { name: 'Soberania Financeira', url: '/soberania-financeira' }],
    schemaType: 'CollectionPage',
    articleSection: 'Soberania Financeira',
    relatedPages: ['/teoria-das-bandeiras', '/taxa-de-fuga', '/economia-paralela'],
  },
  '/teoria-das-bandeiras': {
    title: 'Teoria das Bandeiras: Como Diversificar Sua Vida Entre Países',
    description: 'Flag Theory aplicada: residência, negócios, banking e cidadania em jurisdições diferentes. O manual do cidadão global soberano.',
    canonical: `${BASE}/teoria-das-bandeiras`,
    primaryKeyword: 'teoria das bandeiras',
    lsiKeywords: ['flag theory', 'diversificação jurisdicional', 'cidadania dupla', 'residência fiscal', 'nomad digital', 'perpetual traveler', 'offshore legal'],
    longTailKeywords: ['teoria das bandeiras explicada', 'como diversificar entre países', 'flag theory para brasileiros'],
    breadcrumbs: [{ name: 'Início', url: '/' }, { name: 'Soberania Financeira', url: '/soberania-financeira' }, { name: 'Teoria das Bandeiras', url: '/teoria-das-bandeiras' }],
    schemaType: 'Article',
    articleSection: 'Soberania Financeira',
    clusterParent: '/soberania-financeira',
    relatedPages: ['/taxa-de-fuga', '/soberania-financeira', '/economia-paralela', '/palau-digital-residency'],
  },
  '/palau-digital-residency': {
    title: 'Palau ID: Residência Digital, KYC e Soberania Documental',
    description: 'Guia completo do Palau Digital Residency: o que é, quanto custa, neobanks e exchanges que aceitam, limitações reais e como usar para soberania documental.',
    canonical: `${BASE}/palau-digital-residency`,
    primaryKeyword: 'palau id',
    lsiKeywords: ['palau digital residency', 'rns id', 'kyc palau', 'neobank palau', 'soulbound token', 'identidade soberana', 'web3 id'],
    longTailKeywords: ['como obter id de palau', 'quais bancos aceitam palau id', 'palau id vs cedula paraguaia', 'exchanges que aceitam palau id'],
    breadcrumbs: [{ name: 'Início', url: '/' }, { name: 'Soberania Financeira', url: '/soberania-financeira' }, { name: 'Palau Digital Residency', url: '/palau-digital-residency' }],
    schemaType: 'Article',
    articleSection: 'Soberania Financeira',
    clusterParent: '/teoria-das-bandeiras',
    relatedPages: ['/teoria-das-bandeiras', '/soberania-financeira', '/soberania-financeira/exchanges-privacidade-e-kyc'],
  },
  '/taxa-de-fuga': {
    title: 'Taxa de Fuga: Quanto Custa Sair do Brasil (Cálculo Real)',
    description: 'Planilha real: custos de saída fiscal, remessa, abertura de conta e residência no exterior. Dados atualizados para 2026.',
    canonical: `${BASE}/taxa-de-fuga`,
    primaryKeyword: 'taxa de fuga brasil',
    lsiKeywords: ['sair do brasil custo', 'saída fiscal', 'remessa exterior', 'expatriação', 'visto residência', 'custo de vida exterior'],
    longTailKeywords: ['quanto custa sair do brasil', 'como sair do brasil ganhando pouco', 'custo expatriação brasileira'],
    breadcrumbs: [{ name: 'Início', url: '/' }, { name: 'Soberania Financeira', url: '/soberania-financeira' }, { name: 'Taxa de Fuga', url: '/taxa-de-fuga' }],
    schemaType: 'Article',
    articleSection: 'Soberania Financeira',
    clusterParent: '/soberania-financeira',
    relatedPages: ['/teoria-das-bandeiras', '/soberania-financeira'],
  },
  '/pix-cripto': {
    title: 'PIX para Cripto: Converta Reais em Bitcoin Sem Intermediários',
    description: 'Métodos práticos para converter PIX em Bitcoin e stablecoins com privacidade. P2P, DEX e pontes fiat-cripto atualizadas.',
    canonical: `${BASE}/pix-cripto`,
    primaryKeyword: 'pix para cripto',
    lsiKeywords: ['comprar bitcoin com pix', 'P2P bitcoin', 'converter real para bitcoin', 'exchange descentralizada', 'USDT via pix'],
    longTailKeywords: ['como comprar bitcoin com pix', 'pix para bitcoin sem KYC', 'converter pix em criptomoeda'],
    breadcrumbs: [{ name: 'Início', url: '/' }, { name: 'Soberania Financeira', url: '/soberania-financeira' }, { name: 'PIX → Cripto', url: '/pix-cripto' }],
    schemaType: 'HowTo',
    articleSection: 'Soberania Financeira',
    clusterParent: '/soberania-financeira',
    relatedPages: ['/comprar-bitcoin-com-privacidade', '/soberania-financeira/exchanges-privacidade-e-kyc', '/lightning'],
  },
  '/comprar-bitcoin-com-privacidade': {
    title: 'Comprar Bitcoin Anônimo: Guia Definitivo Sem KYC em 2026',
    description: 'Métodos testados para adquirir Bitcoin sem entregar seus dados: P2P, ATMs, vouchers e exchanges descentralizadas. Privacidade é um direito.',
    canonical: `${BASE}/comprar-bitcoin-com-privacidade`,
    primaryKeyword: 'comprar bitcoin anônimo',
    lsiKeywords: ['bitcoin sem KYC', 'P2P bitcoin', 'privacidade bitcoin', 'RoboSats', 'Bisq', 'HodlHodl', 'bitcoin ATM', 'voucher bitcoin'],
    longTailKeywords: ['como comprar bitcoin sem documento', 'comprar bitcoin anonimamente 2026', 'exchange bitcoin sem KYC'],
    breadcrumbs: [{ name: 'Início', url: '/' }, { name: 'Soberania Financeira', url: '/soberania-financeira' }, { name: 'Comprar Bitcoin Anônimo', url: '/comprar-bitcoin-com-privacidade' }],
    schemaType: 'HowTo',
    articleSection: 'Soberania Financeira',
    clusterParent: '/soberania-financeira',
    relatedPages: ['/soberania-financeira/exchanges-privacidade-e-kyc', '/pix-cripto', '/blindagem-golpes'],
  },
  '/economia-paralela': {
    title: 'Economia Paralela: Alternativas ao Sistema Controlado',
    description: 'Escambo, moedas locais, Bitcoin P2P e economia circular. Como construir redes de troca fora do radar do estado.',
    canonical: `${BASE}/economia-paralela`,
    primaryKeyword: 'economia paralela',
    lsiKeywords: ['economia informal', 'escambo', 'moeda local', 'bitcoin P2P', 'economia circular', 'agorismo', 'contra-economia'],
    longTailKeywords: ['como viver na economia paralela', 'alternativas ao sistema financeiro', 'economia descentralizada'],
    breadcrumbs: [{ name: 'Início', url: '/' }, { name: 'Soberania Financeira', url: '/soberania-financeira' }, { name: 'Economia Paralela', url: '/economia-paralela' }],
    schemaType: 'Article',
    articleSection: 'Soberania Financeira',
    clusterParent: '/soberania-financeira',
    relatedPages: ['/soberania-financeira', '/pix-cripto', '/teoria-das-bandeiras'],
  },

  // ═══════════════════════════════════════════════════════
  // TOPIC CLUSTER 4: ALERTAS & CONFISCO
  // Pilar: /alertas
  // ═══════════════════════════════════════════════════════
  '/alertas': {
    title: 'Alertas de Soberania: Ameaças Ativas ao Seu Patrimônio em 2026',
    description: 'CBDC, confisco digital, proibição de dinheiro vivo e vigilância financeira. Dossiê completo das ameaças e como se proteger.',
    canonical: `${BASE}/alertas`,
    primaryKeyword: 'alertas soberania financeira',
    lsiKeywords: ['CBDC brasil', 'confisco digital', 'DREX', 'vigilância financeira', 'controle estatal', 'dinheiro digital governo', 'moeda programável'],
    longTailKeywords: ['governo vai tomar meu dinheiro', 'DREX é perigoso', 'como proteger patrimônio do governo'],
    breadcrumbs: [{ name: 'Início', url: '/' }, { name: 'Alertas', url: '/alertas' }],
    schemaType: 'CollectionPage',
    articleSection: 'Alertas',
    relatedPages: ['/alertas/cbdc-brasil', '/confisco-1990', '/alertas/fim-do-dinheiro-vivo'],
  },
  '/alertas/cbdc-brasil': {
    title: 'CBDC Brasil (DREX): O Dinheiro Programável Que Controla Sua Vida',
    description: 'Análise técnica do DREX: dinheiro que expira, gasto controlado e vigilância total. O que o Banco Central não te conta.',
    canonical: `${BASE}/alertas/cbdc-brasil`,
    primaryKeyword: 'CBDC Brasil DREX',
    lsiKeywords: ['DREX', 'real digital', 'moeda digital banco central', 'dinheiro programável', 'smart contract governo', 'vigilância financeira'],
    longTailKeywords: ['o que é DREX real digital', 'CBDC brasil perigos', 'dinheiro programável governo controle'],
    breadcrumbs: [{ name: 'Início', url: '/' }, { name: 'Alertas', url: '/alertas' }, { name: 'CBDC Brasil', url: '/alertas/cbdc-brasil' }],
    schemaType: 'Article',
    articleSection: 'Alertas',
    clusterParent: '/alertas',
    relatedPages: ['/alertas/fim-do-dinheiro-vivo', '/confisco-1990', '/alertas/depix-reporte-2026'],
  },
  '/alertas/depix-reporte-2026': {
    title: 'DePIX Reporte 2026: A Descentralização do PIX',
    description: 'Relatório técnico sobre alternativas descentralizadas ao PIX. Como transacionar sem depender do Banco Central.',
    canonical: `${BASE}/alertas/depix-reporte-2026`,
    primaryKeyword: 'DePIX 2026',
    lsiKeywords: ['PIX descentralizado', 'alternativa PIX', 'pagamento P2P', 'lightning network PIX', 'bitcoin pagamento'],
    longTailKeywords: ['alternativa ao pix 2026', 'pix descentralizado como funciona', 'depix reporte'],
    breadcrumbs: [{ name: 'Início', url: '/' }, { name: 'Alertas', url: '/alertas' }, { name: 'DePIX 2026', url: '/alertas/depix-reporte-2026' }],
    schemaType: 'Article',
    articleSection: 'Alertas',
    clusterParent: '/alertas',
    relatedPages: ['/alertas/cbdc-brasil', '/pix-cripto', '/lightning'],
  },
  '/alertas/protecao-patrimonial-bitcoin': {
    title: 'Governo Pode Tomar Seus Bitcoins? Nova Lei e Como Se Proteger',
    description: 'Hong Kong criminaliza recusa de entregar chaves. Análise das leis globais de confisco cripto e protocolo de proteção soberana.',
    canonical: `${BASE}/alertas/protecao-patrimonial-bitcoin`,
    primaryKeyword: 'governo tomar bitcoin',
    lsiKeywords: ['confisco bitcoin', 'lei anti-cripto', 'segurança nacional bitcoin', 'entrega de chaves', 'proteção bitcoin governo', 'jurisdição cripto'],
    longTailKeywords: ['governo pode confiscar bitcoin', 'como proteger bitcoin do governo', 'lei confisco criptomoeda'],
    breadcrumbs: [{ name: 'Início', url: '/' }, { name: 'Alertas', url: '/alertas' }, { name: 'Confisco de Bitcoin', url: '/alertas/protecao-patrimonial-bitcoin' }],
    schemaType: 'Article',
    articleSection: 'Alertas',
    clusterParent: '/alertas',
    relatedPages: ['/confisco-1990', '/autocustodia', '/mobilidade-de-chaves'],
  },
  '/confisco-1990': {
    title: 'Confisco de 1990: O Dia Que o Governo Roubou Sua Poupança',
    description: 'Plano Collor documentado: como o estado confiscou poupanças de 80 milhões de brasileiros. E por que pode acontecer de novo.',
    canonical: `${BASE}/confisco-1990`,
    primaryKeyword: 'confisco 1990 plano collor',
    lsiKeywords: ['plano collor', 'confisco poupança', 'bloqueio poupança', 'congelamento de ativos', 'crise econômica brasil', 'calote governo'],
    longTailKeywords: ['confisco da poupança 1990 como aconteceu', 'plano collor o que foi', 'governo pode confiscar poupança novamente'],
    breadcrumbs: [{ name: 'Início', url: '/' }, { name: 'Alertas', url: '/alertas' }, { name: 'Confisco 1990', url: '/confisco-1990' }],
    schemaType: 'Article',
    articleSection: 'Alertas',
    clusterParent: '/alertas',
    relatedPages: ['/alertas/cbdc-brasil', '/bitcoin-vs-fiat', '/autocustodia'],
  },
  '/inflacao-imposto-oculto': {
    title: 'Inflação: O Imposto Oculto Que Destrói Seu Poder de Compra',
    description: 'Dados reais de como a inflação brasileira destruiu 99% do valor do Real desde 1994. O roubo silencioso que ninguém explica.',
    canonical: `${BASE}/inflacao-imposto-oculto`,
    primaryKeyword: 'inflação imposto oculto',
    lsiKeywords: ['perda poder de compra', 'inflação real', 'impressão de dinheiro', 'senhoriagem', 'IPCA real', 'cesta básica preço', 'erosão monetária'],
    longTailKeywords: ['inflação é um imposto disfarçado', 'quanto a inflação tirou do seu dinheiro', 'como a inflação destrói poupança'],
    breadcrumbs: [{ name: 'Início', url: '/' }, { name: 'Alertas', url: '/alertas' }, { name: 'Inflação', url: '/inflacao-imposto-oculto' }],
    schemaType: 'Article',
    articleSection: 'Alertas',
    clusterParent: '/alertas',
    relatedPages: ['/bitcoin-vs-fiat', '/historia-do-dinheiro', '/confisco-1990'],
  },
  '/historia-do-dinheiro': {
    title: 'História do Dinheiro: De Conchas ao Bitcoin — A Verdade Proibida',
    description: '5.000 anos de manipulação monetária: escambo, ouro, papel-moeda, Nixon Shock e o nascimento do Bitcoin. A história que escolas não ensinam.',
    canonical: `${BASE}/historia-do-dinheiro`,
    primaryKeyword: 'história do dinheiro',
    lsiKeywords: ['evolução moeda', 'padrão ouro', 'Nixon Shock', 'dinheiro fiduciário', 'escambo', 'papel moeda', 'banco central história'],
    longTailKeywords: ['história completa do dinheiro', 'como surgiu o dinheiro', 'por que abandonaram o padrão ouro'],
    breadcrumbs: [{ name: 'Início', url: '/' }, { name: 'Alertas', url: '/alertas' }, { name: 'História do Dinheiro', url: '/historia-do-dinheiro' }],
    schemaType: 'Article',
    articleSection: 'Alertas',
    clusterParent: '/alertas',
    relatedPages: ['/inflacao-imposto-oculto', '/bitcoin-vs-fiat', '/lastro'],
  },
  '/alertas/fim-do-dinheiro-vivo': {
    title: 'Proibição do Dinheiro Vivo: O Plano Para Eliminar Sua Privacidade',
    description: 'Agenda global de eliminação do dinheiro físico: controle total de gastos, rastreamento e punição automatizada. O que vem por aí.',
    canonical: `${BASE}/proibicao-dinheiro`,
    primaryKeyword: 'proibição dinheiro vivo',
    lsiKeywords: ['fim do dinheiro físico', 'cashless society', 'sociedade sem dinheiro', 'controle digital', 'rastreamento financeiro', 'privacidade financeira'],
    longTailKeywords: ['vão proibir dinheiro vivo no brasil', 'fim do dinheiro de papel', 'sociedade sem dinheiro é perigoso'],
    breadcrumbs: [{ name: 'Início', url: '/' }, { name: 'Alertas', url: '/alertas' }, { name: 'Proibição do Dinheiro', url: '/alertas/fim-do-dinheiro-vivo' }],
    schemaType: 'Article',
    articleSection: 'Alertas',
    clusterParent: '/alertas',
    relatedPages: ['/alertas/cbdc-brasil', '/economia-paralela', '/confisco-1990'],
  },

  // ═══════════════════════════════════════════════════════
  // TOPIC CLUSTER 5: SOBERANIA ORGÂNICA
  // Pilar: /soberania-organica
  // ═══════════════════════════════════════════════════════
  '/soberania-organica': {
    title: 'Soberania Orgânica: Autonomia Biológica, Alimentar e de Sobrevivência',
    description: 'Kit 72h, purificação de água, horta urbana, primeiros socorros e fitoterapia. O manual completo de autossuficiência para quando o sistema cair.',
    canonical: `${BASE}/soberania-organica`,
    primaryKeyword: 'soberania orgânica',
    lsiKeywords: ['autossuficiência', 'sobrevivencialismo', 'preparação emergência', 'off-grid', 'autonomia alimentar', 'medicina natural', 'resiliência'],
    longTailKeywords: ['como ser autossuficiente', 'guia sobrevivencialismo brasil', 'preparação para emergências'],
    breadcrumbs: [{ name: 'Início', url: '/' }, { name: 'Soberania Orgânica', url: '/soberania-organica' }],
    schemaType: 'CollectionPage',
    articleSection: 'Soberania Orgânica',
    relatedPages: ['/soberania-organica/kit-72h', '/soberania-organica/autonomia-biologica', '/soberania-organica/horta-urbana'],
  },
  '/soberania-organica/kit-72h': {
    title: 'Kit Tático 72h: O que Levar Quando Tudo Desmoronar',
    description: 'Lista completa e testada do kit de sobrevivência 72 horas: água, comida, comunicação, documentos e ferramentas essenciais.',
    canonical: `${BASE}/soberania-organica/kit-72h`,
    primaryKeyword: 'kit 72 horas sobrevivência',
    lsiKeywords: ['bug out bag', 'mochila emergência', 'kit sobrevivência', 'preparação desastre', 'evacuação', 'EDC', 'equipamento emergência'],
    longTailKeywords: ['o que colocar no kit 72 horas', 'kit sobrevivência essencial', 'mochila de emergência lista completa'],
    breadcrumbs: [{ name: 'Início', url: '/' }, { name: 'Soberania Orgânica', url: '/soberania-organica' }, { name: 'Kit 72h', url: '/soberania-organica/kit-72h' }],
    schemaType: 'HowTo',
    articleSection: 'Soberania Orgânica',
    clusterParent: '/soberania-organica',
    relatedPages: ['/soberania-organica/purificacao-agua', '/soberania-organica/protocolos-apagao', '/soberania-organica/abrigo-emergencia'],
  },
  '/soberania-organica/purificacao-agua': {
    title: 'Purificação de Água: 7 Métodos Para Ter Água Potável Sem Governo',
    description: 'Fervura, filtração, cloração, destilação e UV. Técnicas testadas para purificar água em situação de emergência ou colapso.',
    canonical: `${BASE}/soberania-organica/purificacao-agua`,
    primaryKeyword: 'purificação de água emergência',
    lsiKeywords: ['filtrar água', 'água potável', 'tratamento água', 'cloração', 'destilação', 'filtro cerâmico', 'pasteurização solar'],
    longTailKeywords: ['como purificar água em emergência', 'métodos purificação água caseiro', 'filtro de água para sobrevivência'],
    breadcrumbs: [{ name: 'Início', url: '/' }, { name: 'Soberania Orgânica', url: '/soberania-organica' }, { name: 'Sobrevivência & Resposta', url: '/soberania-organica/kit-72h' }, { name: 'Purificação de Água', url: '/soberania-organica/purificacao-agua' }],
    schemaType: 'HowTo',
    articleSection: 'Soberania Orgânica',
    clusterParent: '/soberania-organica',
    relatedPages: ['/soberania-organica/kit-72h', '/soberania-organica/protocolos-apagao'],
  },
  '/soberania-organica/horta-urbana': {
    title: 'Horta Urbana: Produza Comida em Casa Mesmo em Apartamento',
    description: 'Guia prático de horta urbana: vasos, substratos, sementes e técnicas para produzir alimentos em qualquer espaço urbano.',
    canonical: `${BASE}/soberania-organica/horta-urbana`,
    primaryKeyword: 'horta urbana apartamento',
    lsiKeywords: ['horta em vaso', 'cultivo indoor', 'substrato orgânico', 'sementes crioulas', 'compostagem', 'hidroponia caseira', 'agricultura urbana'],
    longTailKeywords: ['como fazer horta em apartamento', 'horta urbana para iniciantes', 'plantar em espaço pequeno'],
    breadcrumbs: [{ name: 'Início', url: '/' }, { name: 'Soberania Orgânica', url: '/soberania-organica' }, { name: 'Horta Urbana', url: '/soberania-organica/horta-urbana' }],
    schemaType: 'HowTo',
    articleSection: 'Soberania Orgânica',
    clusterParent: '/soberania-organica',
    relatedPages: ['/soberania-organica/solo-fertilidade', '/soberania-organica/producao-pequenos-espacos'],
  },
  '/soberania-organica/autonomia-biologica': {
    title: 'Autonomia Biológica: Saúde Sem Depender do Sistema',
    description: 'Primeiros socorros, fitoterapia, sinais vitais e prevenção. O manual de saúde para quem não confia na indústria farmacêutica.',
    canonical: `${BASE}/soberania-organica/autonomia-biologica`,
    primaryKeyword: 'autonomia biológica saúde',
    lsiKeywords: ['medicina natural', 'fitoterapia', 'primeiros socorros', 'saúde preventiva', 'plantas medicinais', 'autossuficiência saúde'],
    longTailKeywords: ['como cuidar da saúde sem médico', 'medicina natural em casa', 'autonomia saúde e bem-estar'],
    breadcrumbs: [{ name: 'Início', url: '/' }, { name: 'Soberania Orgânica', url: '/soberania-organica' }, { name: 'Saúde & Biologia', url: '/soberania-organica/saude-preventiva' }, { name: 'Autonomia Biológica', url: '/soberania-organica/autonomia-biologica' }],
    schemaType: 'MedicalWebPage',
    articleSection: 'Soberania Orgânica',
    clusterParent: '/soberania-organica',
    relatedPages: ['/soberania-organica/primeiros-socorros', '/soberania-organica/fitoterapia-aplicada', '/soberania-organica/saude-preventiva'],
  },
  '/soberania-organica/toxicos-ocultos': {
    title: 'Tóxicos Ocultos: O Que Estão Colocando Na Sua Comida e Ambiente',
    description: 'Dossiê investigativo: agrotóxicos, aditivos alimentares, poluentes ambientais e manipulação informacional. O que você consome sem saber.',
    canonical: `${BASE}/soberania-organica/toxicos-ocultos`,
    primaryKeyword: 'tóxicos ocultos alimentos',
    lsiKeywords: ['agrotóxicos brasil', 'aditivos alimentares perigosos', 'desreguladores endócrinos', 'flúor na água', 'glifosato', 'BPA', 'microplásticos'],
    longTailKeywords: ['substâncias tóxicas nos alimentos', 'venenos ocultos na comida', 'o que a indústria esconde nos alimentos'],
    breadcrumbs: [{ name: 'Início', url: '/' }, { name: 'Soberania Orgânica', url: '/soberania-organica' }, { name: 'Tóxicos Ocultos', url: '/soberania-organica/toxicos-ocultos' }],
    schemaType: 'Article',
    articleSection: 'Soberania Orgânica',
    clusterParent: '/soberania-organica',
    relatedPages: ['/soberania-organica/autonomia-biologica', '/soberania-organica/horta-urbana'],
  },
  '/soberania-organica/engenharia-vicio-alimentar': {
    title: 'Por Que Você Não Consegue Comer Só Um: A Engenharia do Vício',
    description: 'Investigação editorial sobre engenharia alimentar: colorimetria, bliss point, crocância acústica e variabilidade randomizada nos ultraprocessados.',
    canonical: `${BASE}/soberania-organica/engenharia-vicio-alimentar`,
    primaryKeyword: 'engenharia do vício alimentar',
    lsiKeywords: ['ultraprocessados vício', 'bliss point', 'hand to mouth', 'doritos engenharia', 'comida industrial', 'food engineering', 'vanishing caloric density', 'dopamina alimentar', 'robb wolf', 'mark schatzker', 'howard moskowitz'],
    longTailKeywords: ['por que não consigo parar de comer salgadinho', 'como ultraprocessados viciam o cérebro', 'engenharia alimentar industrial bliss point', 'doritos roleta distribuição estatística vício'],
    breadcrumbs: [{ name: 'Início', url: '/' }, { name: 'Soberania Orgânica', url: '/soberania-organica' }, { name: 'Alimentar & Cultivo', url: '/soberania-organica' }, { name: 'Engenharia do Vício Alimentar', url: '/soberania-organica/engenharia-vicio-alimentar' }],
    schemaType: 'Article',
    articleSection: 'Soberania Orgânica',
    clusterParent: '/soberania-organica',
    relatedPages: ['/soberania-organica/preservacao-ancestral', '/soberania-organica/toxicos-ocultos/toxinas-alimentares', '/soberania-organica/horta-urbana'],
  },

  // ═══════════════════════════════════════════════════════
  // PAGES AVULSAS / EDUCAÇÃO / FERRAMENTAS
  // ═══════════════════════════════════════════════════════
  '/mapa-da-soberania': {
    title: 'Mapa da Soberania: 97+ Páginas de Conhecimento Proibido',
    description: 'Índice mestre de todo o ecossistema soberanista: Bitcoin, autocustódia, autonomia biológica, soberania alimentar e sabedoria ancestral.',
    canonical: `${BASE}/mapa-da-soberania`,
    primaryKeyword: 'mapa soberania',
    lsiKeywords: ['índice soberania', 'guia completo bitcoin', 'arsenal conhecimento', 'mapa site bitcoin'],
    longTailKeywords: ['site completo sobre bitcoin e soberania', 'maior guia de soberania em português'],
    breadcrumbs: [{ name: 'Início', url: '/' }, { name: 'Mapa da Soberania', url: '/mapa-da-soberania' }],
    schemaType: 'CollectionPage',
    articleSection: 'Navegação',
  },
  '/ferramentas': {
    title: 'Ferramentas de Soberania: Gerador de Entropia e Calculadoras',
    description: 'Ferramentas gratuitas: gerador de entropia para seeds, calculadoras de fees e verificadores de segurança. Arsenal digital soberano.',
    canonical: `${BASE}/ferramentas`,
    primaryKeyword: 'ferramentas bitcoin',
    lsiKeywords: ['gerador entropia', 'calculadora bitcoin', 'verificador segurança', 'ferramenta cripto', 'gerador seed phrase'],
    longTailKeywords: ['ferramentas gratuitas bitcoin', 'gerador de seed phrase seguro', 'calculadora taxa bitcoin'],
    breadcrumbs: [{ name: 'Início', url: '/' }, { name: 'Ferramentas', url: '/ferramentas' }],
    schemaType: 'WebPage',
    articleSection: 'Ferramentas',
    relatedPages: ['/autocustodia', '/chaves'],
  },
  '/audiobooks': {
    title: 'Audiobooks Soberanos: Ouça e Aprenda Sobre Bitcoin e Liberdade',
    description: 'Biblioteca de audiobooks gratuitos sobre Bitcoin, economia austríaca, soberania individual e filosofia da liberdade.',
    canonical: `${BASE}/audiobooks`,
    primaryKeyword: 'audiobooks bitcoin',
    lsiKeywords: ['audiobook soberania', 'podcast bitcoin', 'livro bitcoin áudio', 'economia austríaca áudio', 'liberdade financeira áudio'],
    longTailKeywords: ['audiobooks sobre bitcoin grátis', 'livros áudio soberania financeira', 'ouvir sobre bitcoin'],
    breadcrumbs: [{ name: 'Início', url: '/' }, { name: 'Educação', url: '/educacao' }, { name: 'Audiobooks', url: '/audiobooks' }],
    schemaType: 'CollectionPage',
    articleSection: 'Educação',
    relatedPages: ['/ebooks', '/protocolo-inicial'],
  },
  '/ebooks': {
    title: 'E-books e PDFs Gratuitos: Biblioteca Soberana Completa',
    description: 'Baixe e-books sobre Bitcoin, economia, autocustódia e liberdade individual. Conhecimento blindado em formato PDF.',
    canonical: `${BASE}/ebooks`,
    primaryKeyword: 'ebooks bitcoin grátis',
    lsiKeywords: ['PDF bitcoin', 'livro bitcoin gratuito', 'material estudo bitcoin', 'download ebook cripto'],
    longTailKeywords: ['ebooks sobre bitcoin para download', 'livros grátis bitcoin PDF', 'material de estudo bitcoin'],
    breadcrumbs: [{ name: 'Início', url: '/' }, { name: 'Educação', url: '/educacao' }, { name: 'E-books', url: '/ebooks' }],
    schemaType: 'CollectionPage',
    articleSection: 'Educação',
    relatedPages: ['/audiobooks', '/protocolo-inicial'],
  },
  '/protocolo-inicial': {
    title: 'Protocolo Inicial: Seu Primeiro Passo Para a Soberania',
    description: 'O guia para iniciantes que querem sair da Matrix financeira. Por onde começar, o que estudar e como se proteger.',
    canonical: `${BASE}/protocolo-inicial`,
    primaryKeyword: 'protocolo inicial soberania',
    lsiKeywords: ['começar bitcoin', 'guia iniciante', 'primeiro passo soberania', 'roteiro liberdade'],
    longTailKeywords: ['por onde começar com bitcoin', 'primeiro passo soberania financeira', 'guia iniciante bitcoin'],
    breadcrumbs: [{ name: 'Início', url: '/' }, { name: 'Protocolo Inicial', url: '/protocolo-inicial' }],
    schemaType: 'HowTo',
    articleSection: 'Educação',
    relatedPages: ['/bitcoin/o-que-e', '/autocustodia', '/por-onde-comecar'],
  },
  '/vazamento-dados': {
    title: 'Vazamento de Dados: Seu CPF Já Foi Exposto — Verifique Agora',
    description: 'Ferramenta de verificação e guia de proteção contra vazamentos de dados pessoais. Saiba se seus dados foram comprometidos.',
    canonical: `${BASE}/vazamento-dados`,
    primaryKeyword: 'vazamento de dados',
    lsiKeywords: ['dados vazados', 'CPF vazado', 'proteção dados pessoais', 'LGPD', 'dark web dados', 'verificar vazamento'],
    longTailKeywords: ['como saber se meus dados foram vazados', 'verificar vazamento CPF', 'proteção contra vazamento de dados'],
    breadcrumbs: [{ name: 'Início', url: '/' }, { name: 'Alertas', url: '/alertas' }, { name: 'Vazamento de Dados', url: '/vazamento-dados' }],
    schemaType: 'WebPage',
    articleSection: 'Alertas',
    clusterParent: '/alertas',
    relatedPages: ['/blindagem-golpes', '/alertas'],
  },
  '/indice-da-soberania': {
    title: 'Índice do Despertar: Meça Seu Nível de Soberania',
    description: 'Questionário interativo para medir seu nível de independência do sistema. Descubra onde você está na jornada soberana.',
    canonical: `${BASE}/indice-da-soberania`,
    primaryKeyword: 'índice do despertar',
    lsiKeywords: ['nível soberania', 'teste liberdade', 'questionário bitcoin', 'medidor autonomia'],
    longTailKeywords: ['teste nível soberania financeira', 'quão independente eu sou', 'medir minha liberdade financeira'],
    breadcrumbs: [{ name: 'Início', url: '/' }, { name: 'Educação', url: '/educacao' }, { name: 'Índice do Despertar', url: '/indice-da-soberania' }],
    schemaType: 'WebPage',
    articleSection: 'Educação',
    relatedPages: ['/protocolo-inicial', '/por-onde-comecar'],
  },
  '/indice-de-soberania-financeira': {
    title: 'Índice de Soberania Financeira: Compare Plataformas e Jurisdições',
    description: 'Ranking técnico de bancos, exchanges e jurisdições por privacidade, KYC e segurança. A ferramenta de decisão soberana.',
    canonical: `${BASE}/indice-de-soberania-financeira`,
    primaryKeyword: 'índice soberania financeira',
    lsiKeywords: ['ranking exchanges', 'comparar bancos internacionais', 'privacidade financeira ranking', 'melhor jurisdição'],
    longTailKeywords: ['melhor exchange privacidade', 'comparar plataformas cripto privacidade', 'ranking bancos internacionais'],
    breadcrumbs: [{ name: 'Início', url: '/' }, { name: 'Soberania Financeira', url: '/soberania-financeira' }, { name: 'Índice', url: '/indice-de-soberania-financeira' }],
    schemaType: 'WebPage',
    articleSection: 'Soberania Financeira',
    clusterParent: '/soberania-financeira',
    relatedPages: ['/soberania-financeira', '/soberania-financeira/exchanges-privacidade-e-kyc'],
  },
  '/recursos-e-ferramentas': {
    title: 'Arsenal Completo: Todas as Ferramentas de Soberania em Um Lugar',
    description: 'Diretório categorizado de todas as ferramentas, guias e recursos para construir sua soberania individual completa.',
    canonical: `${BASE}/recursos-e-ferramentas`,
    primaryKeyword: 'arsenal soberania',
    lsiKeywords: ['ferramentas bitcoin', 'recursos soberania', 'guias completos', 'diretório ferramentas'],
    longTailKeywords: ['todas ferramentas soberania individual', 'arsenal completo bitcoin e liberdade'],
    breadcrumbs: [{ name: 'Início', url: '/' }, { name: 'Arsenal', url: '/recursos-e-ferramentas' }],
    schemaType: 'CollectionPage',
    articleSection: 'Educação',
    relatedPages: ['/mapa-da-soberania', '/ferramentas'],
  },
  '/silencio-queda': {
    title: 'O Silêncio Antes da Queda: Sinais de Colapso Financeiro',
    description: 'Os sinais que precedem todo colapso econômico: inversão de curva, corrida bancária silenciosa e o que fazer antes que seja tarde.',
    canonical: `${BASE}/silencio-queda`,
    primaryKeyword: 'colapso financeiro sinais',
    lsiKeywords: ['crise econômica', 'crash financeiro', 'corrida bancária', 'inversão curva juros', 'preparação crise', 'proteção colapso'],
    longTailKeywords: ['sinais de colapso econômico', 'como se preparar para crise financeira', 'vai ter crise econômica no brasil'],
    breadcrumbs: [{ name: 'Início', url: '/' }, { name: 'Alertas', url: '/alertas' }, { name: 'Silêncio e Queda', url: '/silencio-queda' }],
    schemaType: 'Article',
    articleSection: 'Alertas',
    clusterParent: '/alertas',
    relatedPages: ['/confisco-1990', '/alertas', '/inflacao-imposto-oculto'],
  },
  '/novilingua': {
    title: 'Novilíngua: Como o Estado Manipula a Linguagem Para Controlar Você',
    description: 'O glossário da manipulação: termos que o estado usa para disfarçar roubo, censura e controle como "proteção" e "segurança".',
    canonical: `${BASE}/novilingua`,
    primaryKeyword: 'novilíngua estado',
    lsiKeywords: ['manipulação linguística', 'propaganda estatal', 'newspeak', 'controle narrativa', 'Orwell 1984'],
    longTailKeywords: ['como o governo manipula a linguagem', 'termos que disfarçam controle estatal', 'novilíngua explicada'],
    breadcrumbs: [{ name: 'Início', url: '/' }, { name: 'Educação', url: '/educacao' }, { name: 'Novilíngua', url: '/novilingua' }],
    schemaType: 'Article',
    articleSection: 'Educação',
    relatedPages: ['/alertas', '/alertas/fim-do-dinheiro-vivo'],
  },
};

// ═══════════════════════════════════════════════════════
// ORGANIZATION SCHEMA (site-wide)
// ═══════════════════════════════════════════════════════
export const ORGANIZATION_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Lord Junnior',
  url: 'https://lordjunnior.com.br',
  logo: 'https://lordjunnior.com.br/favicon.svg',
  description: 'Ecossistema de soberania individual: Bitcoin, autocustódia, autonomia biológica e liberdade financeira.',
  sameAs: [
    'https://www.youtube.com/@LordJunnior',
    'https://www.instagram.com/lordjunnior',
  ],
  founder: {
    '@type': 'Person',
    name: 'Lord Junnior',
    url: 'https://lordjunnior.com.br',
  },
};

// ═══════════════════════════════════════════════════════
// WEBSITE SCHEMA (for sitelinks search box)
// ═══════════════════════════════════════════════════════
export const WEBSITE_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Lord Junnior — Soberania Individual',
  url: 'https://lordjunnior.com.br',
  description: 'A maior base de conhecimento sobre soberania individual, Bitcoin e autonomia em português.',
  publisher: {
    '@type': 'Organization',
    name: 'Lord Junnior',
  },
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: 'https://lordjunnior.com.br/mapa-da-soberania?q={search_term_string}',
    },
    'query-input': 'required name=search_term_string',
  },
};

/**
 * Gera JSON-LD schema baseado nos dados SEO da página
 */
export function generateSchemas(pageData: SeoPageData): object[] {
  const schemas: object[] = [];

  // Breadcrumb Schema (SEMPRE)
  if (pageData.breadcrumbs.length > 1) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: pageData.breadcrumbs.map((crumb, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: crumb.name,
        item: `https://lordjunnior.com.br${crumb.url}`,
      })),
    });
  }

  // Article / TechArticle / MedicalWebPage Schema
  if (['Article', 'TechArticle', 'MedicalWebPage'].includes(pageData.schemaType)) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': pageData.schemaType,
      headline: pageData.title,
      description: pageData.description,
      url: pageData.canonical,
      author: { '@type': 'Person', name: 'Lord Junnior' },
      publisher: ORGANIZATION_SCHEMA,
      mainEntityOfPage: { '@type': 'WebPage', '@id': pageData.canonical },
      datePublished: '2024-01-01',
      dateModified: new Date().toISOString().split('T')[0],
      keywords: [...pageData.lsiKeywords, ...pageData.longTailKeywords].join(', '),
      articleSection: pageData.articleSection,
      inLanguage: 'pt-BR',
    });
  }

  // CollectionPage Schema
  if (pageData.schemaType === 'CollectionPage') {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: pageData.title,
      description: pageData.description,
      url: pageData.canonical,
      publisher: { '@type': 'Organization', name: 'Lord Junnior' },
      inLanguage: 'pt-BR',
    });
  }

  // HowTo Schema
  if (pageData.schemaType === 'HowTo') {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      name: pageData.title,
      description: pageData.description,
      url: pageData.canonical,
      author: { '@type': 'Person', name: 'Lord Junnior' },
      inLanguage: 'pt-BR',
    });
  }

  // SiteNavigationElement (para páginas hub)
  if (['CollectionPage'].includes(pageData.schemaType) && pageData.relatedPages) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'SiteNavigationElement',
      name: pageData.title,
      url: pageData.canonical,
    });
  }

  return schemas;
}

/**
 * Gera meta keywords LSI para a tag <meta name="keywords">
 */
export function getLsiMetaKeywords(pageData: SeoPageData): string {
  return [...pageData.lsiKeywords, ...pageData.longTailKeywords, pageData.primaryKeyword].join(', ');
}
