import {
  Compass, ShieldAlert, Shield, Globe, BookOpen, Headphones, Library,
  Wrench, QrCode, Zap, LayoutGrid, Bitcoin, Lock, TrendingUp,
  AlertTriangle, Leaf, FlaskConical, Skull, Map, GraduationCap,
  Landmark, CreditCard, ArrowRightLeft, Building2, Wallet,
  Fingerprint, Radio, Droplets, Sun, Heart, Bug, Sprout,
  Package, Beef, Mountain, Scroll, Brain, Flame, FileWarning,
  Smartphone, Factory, BookOpenCheck, User
} from "lucide-react";

export interface NavItem {
  label: string;
  route?: string;
  targetId?: string;
  icon?: any;
  badge?: string;
  alert?: boolean;
  section?: string;
  /** Data de publicação (AAAA-MM-DD). O selo "Novo" aparece por 7 dias a partir dela. */
  addedAt?: string;
}

export const NEW_BADGE_DAYS = 7;

export function isRecentlyAdded(addedAt?: string, now: Date = new Date()): boolean {
  if (!addedAt) return false;
  const start = new Date(`${addedAt}T00:00:00-03:00`).getTime();
  if (Number.isNaN(start)) return false;
  const diff = now.getTime() - start;
  return diff >= 0 && diff < NEW_BADGE_DAYS * 24 * 60 * 60 * 1000;
}

export function resolveBadge(item: NavItem): string | undefined {
  if (item.badge) return item.badge;
  return isRecentlyAdded(item.addedAt) ? "Novo" : undefined;
}

export interface NavGroup {
  label: string;
  icon: any;
  color?: string;
  items: NavItem[];
}

export const topNavItems: NavItem[] = [
  { label: "Por onde começar?", route: "/por-onde-comecar", icon: Compass },
  { label: "Mapa da Soberania", route: "/mapa-da-soberania", icon: Map },
  { label: "Protocolo Inicial", route: "/protocolo-inicial", icon: ShieldAlert, alert: true },
  { label: "Manifesto", targetId: "manifesto", icon: LayoutGrid },
  { label: "Sobre Mim", route: "/sobre-mim", icon: User },
];


export const navGroups: NavGroup[] = [
  {
    label: "Bitcoin — Fundamentos",
    icon: Bitcoin,
    color: undefined,
    items: [
      { label: "O que é Bitcoin?", route: "/bitcoin/o-que-e" },
      { label: "Noções Essenciais", route: "/bitcoin/nocoes-basicas" },
      { label: "Chaves Privadas", route: "/chaves" },
      { label: "Transações", route: "/transacoes" },
      { label: "Mineração", route: "/mineracao" },
      { label: "Blockchain", route: "/blockchain" },
      { label: "21 Milhões", route: "/21-milhoes" },
      { label: "Halving", route: "/halving-bitcoin" },
      { label: "Supply Shock", route: "/supply-shock" },
      { label: "Volatilidade", route: "/volatilidade" },
      { label: "Lastro", route: "/lastro" },
      { label: "Futuro do Bitcoin", route: "/futuro-bitcoin" },
      { label: "BIP-110", route: "/bitcoin/bip-110-guerra-espaco-bloco" },
      { label: "Polymarket IA + BTC", route: "/polymarket-rede-neural-btc" },
    ],
  },
  {
    label: "Segurança & Autocustódia",
    icon: Lock,
    color: undefined,
    items: [
      { label: "Bitcoin Seguro", route: "/bitcoin-seguro" },
      { label: "Autocustódia", route: "/autocustodia" },
      { label: "Guia de Migração da Corretora", route: "/autocustodia/guia-migracao-corretora" },
      { label: "Carteira Quente x Fria", route: "/autocustodia/hot-wallet-vs-cold-wallet" },
      { label: "Primeiro Saque na Hardware Wallet", route: "/autocustodia/primeiro-saque-hardware-wallet" },
      { label: "Erros Fatais no Saque", route: "/autocustodia/erros-fatais-saque-corretora" },
      { label: "Blindagem Golpes", route: "/blindagem-golpes" },
      { label: "Lightning Network", route: "/lightning" },
      { label: "Mobilidade de Chaves", route: "/mobilidade-de-chaves" },
      { label: "Hardware Wallet DIY", route: "/autocustodia/hardware-wallet-diy-bitcoin" },
      { label: "Seed Phrase em Aço", route: "/autocustodia/seed-phrase-em-aco" },
      { label: "CoinJoin & Privacidade", route: "/autocustodia/coinjoin-privacidade" },
      { label: "Herança Bitcoin", route: "/autocustodia/heranca-bitcoin" },
      { label: "Jade Core Review", route: "/autocustodia/jade-core-review" },
      { label: "Melhores Hardware Wallets", route: "/comparativos/melhores-hardware-wallets" },
      { label: "Coldcard Review", route: "/comparativos/coldcard-review" },
      { label: "Trezor Review", route: "/comparativos/trezor-review" },
      { label: "O que é Custódia Fria", route: "/autocustodia/o-que-e-custodia-fria" },
      { label: "Tirar da Corretora", route: "/autocustodia/tirar-da-exchange-para-hardware-wallet" },
      { label: "Verificar Firmware e Origem", route: "/autocustodia/verificar-firmware-origem" },
      { label: "Foundation Passport Review", route: "/comparativos/foundation-passport-review" },
      { label: "Backup da Seed Phrase", route: "/autocustodia/backup-seed-phrase-guia" },
      { label: "UTXO e Consolidação", route: "/autocustodia/utxo-consolidacao" },
      { label: "Krux + Passphrase", route: "/autocustodia/krux-passphrase-bluewallet" },
      { label: "Multisig Bitcoin", route: "/multisig-bitcoin" },
      { label: "Comprar BTC Anônimo", route: "/comprar-bitcoin-com-privacidade" },
    ],
  },
  {
    label: "Segurança Mobile",
    icon: Smartphone,
    color: undefined,
    items: [
      { label: "CalyxOS", route: "/seguranca-mobile/calyxos", section: "Sistemas Operacionais" },
      { label: "GrapheneOS", route: "/seguranca-mobile/grapheneos" },
      { label: "GrapheneOS vs CalyxOS", route: "/seguranca-mobile/graphene-vs-calyx", addedAt: "2026-09-29" },
      { label: "iPhone é seguro mesmo?", route: "/seguranca-mobile/iPhone-e-seguro-mesmo", section: "Curiosidades / Mitos" },
      { label: "Android é mais inseguro que iPhone?", route: "/seguranca-mobile/android-mais-inseguro-que-iphone", addedAt: "2026-09-29" },
      { label: "Modo avião desliga o rastreamento?", route: "/seguranca-mobile/modo-aviao-desliga-rastreamento", addedAt: "2026-09-29" },
      { label: "Apagar o app encerra o rastreamento?", route: "/seguranca-mobile/apagar-app-rastreamento-continua", addedAt: "2026-09-29" },
      { label: "Celular escuta conversas?", route: "/seguranca-mobile/celular-escuta-conversa-anuncio", addedAt: "2026-09-29" },
      { label: "IMEI rastreia sem chip?", route: "/seguranca-mobile/imei-rastreia-sem-chip", addedAt: "2026-09-29" },
      { label: "O que é IMSI Catcher", route: "/seguranca-mobile/imsi-catcher-como-funciona", addedAt: "2026-09-29", section: "Ameaças Específicas" },
      { label: "SIM Swap", route: "/seguranca-mobile/sim-swap-como-funciona", addedAt: "2026-09-29" },
      { label: "Stalkerware: apps espiões", route: "/seguranca-mobile/stalkerware-apps-espioes", addedAt: "2026-09-29" },
      { label: "Operadora e dados de localização", route: "/seguranca-mobile/operadora-vende-dados-localizacao", addedAt: "2026-09-29" },
      { label: "Rastreamento por Bluetooth e Wi-Fi", route: "/seguranca-mobile/bluetooth-wifi-rastreamento", addedAt: "2026-09-29" },
      { label: "Checklist de permissões", route: "/seguranca-mobile/checklist-permissoes-celular", addedAt: "2026-09-29", section: "Guias Práticos de Hardening" },
      { label: "Sair do Google sem trocar aparelho", route: "/seguranca-mobile/sair-do-google-sem-trocar-aparelho", addedAt: "2026-09-29" },
      { label: "Signal vs WhatsApp vs Telegram", route: "/seguranca-mobile/signal-vs-whatsapp-vs-telegram", addedAt: "2026-09-29" },
      { label: "VPN no celular", route: "/seguranca-mobile/vpn-no-celular" },
      { label: "2FA: authenticator vs SMS", route: "/seguranca-mobile/2fa-authenticator-vs-sms", addedAt: "2026-09-29" },
    ],
  },
  {
    label: "Economia & Filosofia",
    icon: TrendingUp,
    color: undefined,
    items: [
      { label: "Economia", route: "/economia" },
      { label: "Bitcoin vs Fiat", route: "/bitcoin-vs-fiat" },
      { label: "Bitcoin vs Imóvel", route: "/bitcoin-vs-imovel" },
      { label: "Bitcoin vs Altcoins", route: "/bitcoin-vs-altcoins" },
      { label: "Taxa de Fuga", route: "/taxa-de-fuga" },
      { label: "Filosofia", route: "/filosofia" },
      { label: "Candlestick", route: "/candlestick" },
      { label: "Diversificação", route: "/diversificacao" },
      { label: "Inflação: Imposto Oculto", route: "/inflacao-imposto-oculto" },
      { label: "História do Dinheiro", route: "/historia-do-dinheiro" },
      { label: "Confisco 1990", route: "/confisco-1990" },
    ],
  },
  {
    label: "Soberania Financeira",
    icon: Globe,
    color: undefined,
    items: [
      { label: "Hub Financeiro", route: "/soberania-financeira" },
      { label: "Exchanges sem KYC", route: "/soberania-financeira/exchanges-privacidade-e-kyc" },
      { label: "KYCnot.me", route: "/soberania-financeira/exchanges-privacidade-e-kyc/kycnot-me" },
      { label: "Optima Exchange", route: "/soberania-financeira/exchanges-privacidade-e-kyc/optima-exchange" },
      { label: "Pegasus Swap", route: "/soberania-financeira/exchanges-privacidade-e-kyc/pegasus-swap" },
      { label: "Neobankless", route: "/soberania-financeira/contas-internacionais/neobankless" },
      { label: "Bank of Georgia", route: "/soberania-financeira/contas-internacionais/bank-of-georgia" },
      { label: "Wise", route: "/soberania-financeira/contas-internacionais/wise" },
      { label: "Payoneer", route: "/soberania-financeira/contas-internacionais/payoneer" },
      { label: "GrabrFi", route: "/soberania-financeira/contas-internacionais/grabrfi" },
      { label: "Contas Offshore Top 10", route: "/soberania-financeira/contas-offshore/top-10" },
      { label: "Abertura Remota", route: "/soberania-financeira/contas-offshore/abertura-remota" },
      { label: "BRICS Pay", route: "/soberania-financeira/brics-pay" },
      { label: "KuCoin Pay PIX", route: "/soberania-financeira/kucoin-pay-pix" },
      { label: "Dólar Virtual", route: "/dolar-virtual" },
      { label: "Cartão Bipa Bitcoin", route: "/bitpark-cartao-bitcoin" },
      { label: "Cartões Cripto Sem Reporte", route: "/soberania-financeira/cartoes-cripto-sem-reporte" },
      { label: "PIX Sem Expor Dados", route: "/pix-privacidade" },
      { label: "Teoria das Bandeiras", route: "/teoria-das-bandeiras" },
      { label: "Palau Digital Residency", route: "/palau-digital-residency" },
      { label: "Vender Bitcoin P2P", route: "/p2p/como-vender-bitcoin-p2p" },
      { label: "Bisq: Guia Completo", route: "/p2p/bisq-guia-completo" },
      { label: "Declarar Bitcoin no IR 2026", route: "/imposto-renda/declarar-bitcoin-2026" },
      { label: "Isenção de 35 Mil", route: "/imposto-renda/isencao-35-mil" },
    ],
  },
  {
    label: "Soberania Orgânica",
    icon: Leaf,
    color: undefined,
    items: [
      { label: "Hub Soberania Orgânica", route: "/soberania-organica" },
      { label: "Comece Aqui", route: "/soberania-organica/comece-aqui" },
    ],
  },
  {
    label: "Saúde & Biologia",
    icon: Heart,
    color: undefined,
    items: [
      { label: "Farmácia Caseira Essencial", route: "/soberania-organica/farmacia-caseira-essencial" },
      { label: "Tinturas, Xaropes e Preparos", route: "/soberania-organica/tinturas-xaropes-preparos" },
      { label: "Protocolos Gripe e Resfriado", route: "/soberania-organica/protocolos-gripe-resfriado" },
      { label: "Rotina Diária de Imunidade", route: "/soberania-organica/rotina-diaria-imunidade" },
      { label: "Cobre: imunidade e uso seguro", route: "/protocolo-respiratorio/cobre" },
      { label: "Saúde Preventiva", route: "/soberania-organica/saude-preventiva" },
      { label: "Autonomia Biológica", route: "/soberania-organica/autonomia-biologica" },
      { label: "Fitoterapia Aplicada", route: "/soberania-organica/fitoterapia-aplicada" },
      { label: "Plantas Subutilizadas", route: "/soberania-organica/plantas-subutilizadas" },
      { label: "Babosa & Acemannan", route: "/soberania-organica/babosa-acemannan", badge: "Dossiê" },
      { label: "Óleo de Rícino", route: "/soberania-organica/oleo-ricino-biohacker", badge: "Dossiê" },
      { label: "Própolis", route: "/soberania-organica/propolis", badge: "Dossiê" },
      { label: "Primeiros Socorros", route: "/soberania-organica/primeiros-socorros" },
      { label: "Primeiros Socorros Táticos", route: "/soberania-organica/primeiros-socorros-taticos" },
      { label: "Avaliação de Sinais", route: "/soberania-organica/avaliacao-sinais" },
      { label: "Controle de Vetores", route: "/soberania-organica/controle-vetores" },
    ],
  },
  {
    label: "Alimentar & Cultivo",
    icon: Sprout,
    color: undefined,
    items: [
      { label: "Horta Urbana", route: "/soberania-organica/horta-urbana" },
      { label: "Solo & Fertilidade", route: "/soberania-organica/solo-fertilidade" },
      { label: "Produção Pequenos Espaços", route: "/soberania-organica/producao-pequenos-espacos" },
      { label: "Proteína Sustentável", route: "/soberania-organica/proteina-sustentavel" },
      { label: "Sementes Crioulas", route: "/soberania-organica/sementes-crioulas" },
      { label: "Conservas Fermentadas", route: "/soberania-organica/conservas-fermentadas" },
      { label: "Aquaponia Residencial", route: "/soberania-organica/aquaponia-residencial" },
      { label: "Conservação Longo Prazo", route: "/soberania-organica/armazenamento-longo-prazo" },
      { label: "Conservação de Alimentos", route: "/soberania-organica/conservacao" },
      { label: "Preservação Ancestral", route: "/soberania-organica/preservacao-ancestral" },
      { label: "Engenharia do Vício Alimentar", route: "/soberania-organica/engenharia-vicio-alimentar" },
    ],
  },
  {
    label: "Sobrevivência & Resposta",
    icon: Shield,
    color: undefined,
    items: [
      { label: "Kit 72h", route: "/soberania-organica/kit-72h" },
      { label: "EDC: O Que Carregar", route: "/soberania-organica/edc" },
      { label: "Purificação de Água", route: "/soberania-organica/purificacao-agua" },
      { label: "Gestão de Água Micro", route: "/soberania-organica/gestao-agua-micro" },
      { label: "Protocolo de Fogo", route: "/soberania-organica/protocolo-fogo" },
      { label: "Abrigo Emergência", route: "/soberania-organica/abrigo-emergencia" },
      { label: "Navegação Primária", route: "/soberania-organica/navegacao-primaria" },
      { label: "Protocolos de Apagão", route: "/soberania-organica/protocolos-apagao" },
    ],
  },
  {
    label: "Defesa & Segurança",
    icon: ShieldAlert,
    color: undefined,
    items: [
      { label: "Defesa Pessoal Básica", route: "/soberania-organica/defesa-pessoal" },
      { label: "Defesa Domiciliar", route: "/soberania-organica/defesa-domiciliar" },
      { label: "Defesa Digital Pessoal", route: "/soberania-organica/defesa-digital-pessoal" },
      { label: "Comunicação Segura", route: "/soberania-organica/comunicacao-segura" },
      { label: "Comunicação Offline", route: "/soberania-organica/comunicacao-offline" },
      { label: "Autonomia Veicular", route: "/soberania-organica/autonomia-veicular" },
      { label: "Higiene Mental", route: "/soberania-organica/higiene-mental" },
    ],
  },
  {
    label: "Infraestrutura Autônoma",
    icon: Factory,
    color: undefined,
    items: [
      { label: "Autonomia Energética", route: "/soberania-organica/autonomia-energetica" },
      { label: "Refúgio Rural Tático", route: "/soberania-organica/refugio-rural" },
    ],
  },
  {
    label: "Conhecimento Ancestral",
    icon: Scroll,
    color: undefined,
    items: [
      { label: "Sabedoria Ancestral", route: "/soberania-organica/sabedoria-ancestral" },
      { label: "Conhecimento Perdido", route: "/soberania-organica/conhecimento-perdido" },
      { label: "Rapé (Dossiê)", route: "/soberania-organica/conhecimento-perdido/rape" },
      { label: "Quelantes Brasileiros", route: "/soberania-organica/conhecimento-perdido/quelantes-orientacao-segura" },
    ],
  },
  {
    label: "Alertas & Dossiês",
    icon: AlertTriangle,
    color: undefined,
    items: [
      { label: "Hub de Alertas", route: "/alertas" },
      { label: "Nova Lei Conta Corrente", route: "/nova-lei-conta-corrente", alert: true },
      { label: "CBDC Brasil", route: "/alertas/cbdc-brasil" },
      { label: "Fim do Dinheiro Vivo", route: "/alertas/fim-do-dinheiro-vivo" },
      { label: "DEPIX Reporte 2026", route: "/alertas/depix-reporte-2026" },
      { label: "Confisco de Bitcoin", route: "/alertas/protecao-patrimonial-bitcoin", alert: true },
      { label: "Tóxicos Ocultos", route: "/soberania-organica/toxicos-ocultos" },
      { label: "Toxinas Alimentares", route: "/soberania-organica/toxicos-ocultos/toxinas-alimentares" },
      { label: "Toxinas Ambientais", route: "/soberania-organica/toxicos-ocultos/toxinas-ambientais" },
      { label: "Manipulação Informacional", route: "/soberania-organica/toxicos-ocultos/manipulacao-informacional" },
      { label: "Dependência Tecnológica", route: "/soberania-organica/toxicos-ocultos/dependencia-tecnologica" },
      { label: "Índice do Despertar", route: "/indice-da-soberania" },
    ],
  },
  {
    label: "Saída & Infraestrutura",
    icon: ArrowRightLeft,
    color: undefined,
    items: [
      { label: "Estratégias de Saída", route: "/saida" },
      { label: "Gateway", route: "/saida/gateway" },
      { label: "Segundo Passaporte", route: "/saida/segundo-passaporte" },
      { label: "Residência Fiscal", route: "/saida/residencia-fiscal" },
      { label: "Jurisdições Amigáveis", route: "/saida/jurisdicoes-amigaveis" },
      { label: "Cédula & Residência Chile", route: "/saida/cedula-residencia-chile" },
      { label: "Melhores Países p/ Brasileiros", route: "/saida/melhores-paises-brasileiros" },
      { label: "Residência no Paraguai", route: "/saida/residencia-paraguai" },
      { label: "PIX Cripto", route: "/pix-cripto" },
      { label: "Infraestrutura", route: "/infraestrutura" },
      { label: "Economia Paralela", route: "/economia-paralela" },
      { label: "Silêncio e Queda", route: "/silencio-queda" },
      { label: "Nostr: Rede Sem Censura", route: "/o-que-e-nostr" },
    ],
  },
  {
    label: "Centro de Conhecimento",
    icon: GraduationCap,
    color: undefined,
    items: [
      { label: "Visão geral", route: "/centro-de-conhecimento", addedAt: "2026-09-29" },
      { label: "Educação", route: "/educacao" },
      { label: "Biblioteca Técnica", route: "/biblioteca-tecnica" },
      { label: "Como checar fontes", route: "/centro-de-conhecimento/como-checar-fontes", addedAt: "2026-10-02" },
      { label: "Audiobooks", route: "/audiobooks" },
      { label: "E-books", route: "/ebooks" },
      { label: "Alfabeto Cripto", route: "/dicionario-cripto" },
      { label: "Ferramentas", route: "/ferramentas" },
      { label: "Arsenal", route: "/recursos-e-ferramentas" },

    ],
  },
];

export const bottomNavItems: NavItem[] = [
  { label: "Mapa da Jornada", icon: Map },
  { label: "Apoio Lightning", icon: Zap, targetId: "apoio" },
];
