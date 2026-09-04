// Central registry of all pages for search functionality
export interface SearchEntry {
  title: string;
  description: string;
  path: string;
  tags: string[];
  category: string;
}

export const SEARCH_ENTRIES: SearchEntry[] = [
  // Bitcoin fundamentals
  { title: "O que é Bitcoin?", description: "Fundamento zero — entenda o protocolo descentralizado", path: "/bitcoin/o-que-e", tags: ["bitcoin", "iniciante", "protocolo", "blockchain"], category: "Bitcoin" },
  // Autonomia Alimentar
  { title: "Sementes Crioulas", description: "Banco de sementes caseiro: extração, secagem, armazenamento e troca", path: "/soberania-organica/sementes-crioulas", tags: ["sementes", "crioulas", "alimentar", "autonomia", "horta", "banco de sementes", "germinação"], category: "Autonomia Alimentar" },
  { title: "Conservas Fermentadas", description: "Preservação ancestral sem eletricidade: fermentação, salga e cura", path: "/soberania-organica/conservas-fermentadas", tags: ["conservas", "fermentação", "alimentar", "chucrute", "kimchi", "preservação", "salga"], category: "Autonomia Alimentar" },
  { title: "Aquaponia Residencial", description: "Produção de proteína e vegetais em ciclo fechado em casa", path: "/soberania-organica/aquaponia-residencial", tags: ["aquaponia", "alimentar", "tilápia", "peixes", "vegetais", "ciclo fechado", "autonomia", "proteína"], category: "Autonomia Alimentar" },
  { title: "Preservação Ancestral", description: "8 métodos para conservar comida sem eletricidade: desidratação, salga, fermentação, defumação, confit, cera, adega de raízes e doces", path: "/soberania-organica/preservacao-ancestral", tags: ["preservação", "conservação", "desidratação", "salga", "fermentação", "defumação", "confit", "ancestral", "alimentar", "autonomia", "sem geladeira"], category: "Autonomia Alimentar" },
  { title: "Engenharia do Vício Alimentar", description: "Por que você não consegue comer só um: colorimetria, bliss point, crocância acústica e variabilidade randomizada que sequestram seu cérebro nos ultraprocessados", path: "/soberania-organica/engenharia-vicio-alimentar", tags: ["ultraprocessados", "vício alimentar", "doritos", "bliss point", "hand to mouth", "engenharia alimentar", "dopamina", "robb wolf", "comida industrial", "alimentar", "autonomia"], category: "Autonomia Alimentar" },
  { title: "Gestão de Água em Escala Micro", description: "Captação de chuva, filtro biológico, reuso de águas cinzas, SODIS, swales e irrigação por gravidade — sistema doméstico autônomo de água", path: "/soberania-organica/gestao-agua-micro", tags: ["água", "captação chuva", "filtro biológico", "águas cinzas", "SODIS", "swale", "irrigação", "cisterna", "soberania hídrica", "autonomia", "sobrevivência"], category: "Sobrevivência & Resiliência" },
  { title: "Noções de Bitcoin", description: "Conceitos essenciais para começar", path: "/bitcoin/nocoes-basicas", tags: ["bitcoin", "iniciante", "conceitos"], category: "Bitcoin" },
  { title: "Chaves Privadas", description: "Entenda chaves, endereços e propriedade digital", path: "/chaves", tags: ["chaves", "privadas", "segurança", "endereço"], category: "Bitcoin" },
  { title: "Transações Bitcoin", description: "Como funcionam as transações na rede", path: "/transacoes", tags: ["transações", "bitcoin", "rede", "confirmação"], category: "Bitcoin" },
  { title: "Mineração Bitcoin", description: "Proof of Work e a segurança da rede", path: "/mineracao", tags: ["mineração", "proof of work", "hash", "energia"], category: "Bitcoin" },
  { title: "Blockchain", description: "A tecnologia por trás do Bitcoin", path: "/blockchain", tags: ["blockchain", "blocos", "cadeia", "tecnologia"], category: "Bitcoin" },
  { title: "21 Milhões — Hard Cap", description: "A escassez absoluta do Bitcoin", path: "/21-milhoes", tags: ["21 milhões", "escassez", "hard cap", "supply"], category: "Bitcoin" },
  { title: "Halving Bitcoin", description: "O evento que corta a emissão pela metade", path: "/halving-bitcoin", tags: ["halving", "emissão", "ciclo", "redução"], category: "Bitcoin" },
  { title: "Supply Shock", description: "Choque de oferta e impacto no preço", path: "/supply-shock", tags: ["supply", "shock", "oferta", "demanda"], category: "Bitcoin" },
  { title: "Volatilidade Bitcoin", description: "Por que o Bitcoin oscila e por que isso importa", path: "/volatilidade", tags: ["volatilidade", "preço", "oscilação", "risco"], category: "Bitcoin" },
  { title: "Lastro do Bitcoin", description: "O que dá valor ao Bitcoin?", path: "/lastro", tags: ["lastro", "valor", "fundamento", "energia"], category: "Bitcoin" },
  { title: "Futuro do Bitcoin", description: "Cenários e projeções para o BTC", path: "/futuro-bitcoin", tags: ["futuro", "projeção", "cenários", "adoção"], category: "Bitcoin" },
  { title: "Bitcoin Seguro", description: "Segurança e práticas de proteção", path: "/bitcoin-seguro", tags: ["seguro", "segurança", "proteção", "opsec"], category: "Bitcoin" },
  { title: "Bitcoin vs Fiat", description: "Comparação entre Bitcoin e moedas estatais", path: "/bitcoin-vs-fiat", tags: ["fiat", "comparação", "real", "dólar", "inflação"], category: "Bitcoin" },
  { title: "Bitcoin vs Imóvel", description: "Comparação de investimento: BTC vs imóveis", path: "/bitcoin-vs-imovel", tags: ["imóvel", "investimento", "comparação", "patrimônio"], category: "Bitcoin" },
  { title: "Bitcoin vs Altcoins", description: "Por que focar no Bitcoin e não em shitcoins", path: "/bitcoin-vs-altcoins", tags: ["altcoins", "shitcoins", "ethereum", "comparação"], category: "Bitcoin" },
  { title: "BIP-110", description: "A guerra pelo espaço de bloco", path: "/bitcoin/bip-110-guerra-espaco-bloco", tags: ["bip", "bloco", "protocolo", "governança"], category: "Bitcoin" },
  { title: "Candlestick", description: "Leitura de gráficos e padrões de velas", path: "/candlestick", tags: ["candlestick", "gráfico", "velas", "análise técnica"], category: "Bitcoin" },
  { title: "Diversificação", description: "Estratégias de alocação com Bitcoin", path: "/diversificacao", tags: ["diversificação", "alocação", "portfólio", "estratégia"], category: "Bitcoin" },

  // Autocustódia
  { title: "Autocustódia", description: "Seja seu próprio banco — guia completo", path: "/autocustodia", tags: ["autocustódia", "carteira", "wallet", "segurança"], category: "Autocustódia" },
  { title: "Hardware Wallet DIY", description: "Construa sua própria hardware wallet", path: "/autocustodia/hardware-wallet-diy-bitcoin", tags: ["hardware", "wallet", "diy", "construir"], category: "Autocustódia" },
  { title: "Mobilidade de Chaves", description: "Portabilidade e backup seguro de chaves", path: "/mobilidade-de-chaves", tags: ["mobilidade", "backup", "seed", "migração"], category: "Autocustódia" },
  { title: "Blindagem contra Golpes", description: "Proteja-se contra fraudes e engenharia social", path: "/blindagem-golpes", tags: ["golpes", "fraude", "engenharia social", "phishing"], category: "Autocustódia" },
  { title: "Comprar Bitcoin Anônimo", description: "Métodos P2P sem KYC", path: "/comprar-bitcoin-com-privacidade", tags: ["anônimo", "p2p", "kyc", "privacidade"], category: "Autocustódia" },
  { title: "Dólar Virtual (USDT)", description: "Comprar stablecoins com Jade Wallet e AlfredP2P", path: "/dolar-virtual", tags: ["usdt", "stablecoin", "dólar", "jade", "alfredp2p", "liquid", "tether"], category: "Autocustódia" },

  // Economia
  { title: "Economia", description: "Educação econômica para soberania", path: "/economia", tags: ["economia", "macro", "monetária", "política"], category: "Economia" },
  { title: "História do Dinheiro", description: "Da troca direta ao Bitcoin", path: "/historia-do-dinheiro", tags: ["história", "dinheiro", "moeda", "evolução"], category: "Economia" },
  { title: "Inflação: Imposto Oculto", description: "Como a inflação rouba seu poder de compra", path: "/inflacao-imposto-oculto", tags: ["inflação", "imposto", "poder de compra", "desvalorização"], category: "Economia" },
  { title: "Confisco de 1990", description: "O dia em que o governo roubou a poupança", path: "/confisco-1990", tags: ["confisco", "collor", "poupança", "1990"], category: "Economia" },
  { title: "Taxa de Fuga", description: "Indicadores de saída do sistema", path: "/taxa-de-fuga", tags: ["fuga", "taxa", "indicador", "saída"], category: "Economia" },

  // Soberania Financeira
  { title: "Soberania Financeira", description: "Hub de estratégias de independência financeira", path: "/soberania-financeira", tags: ["soberania", "financeira", "independência", "offshore"], category: "Soberania Financeira" },
  { title: "Teoria das Bandeiras", description: "Diversificação geopolítica de ativos", path: "/teoria-das-bandeiras", tags: ["bandeiras", "flag theory", "offshore", "jurisdição"], category: "Soberania Financeira" },
  { title: "Contas Offshore — Top 10", description: "Melhores contas internacionais", path: "/soberania-financeira/contas-offshore/top-10", tags: ["offshore", "contas", "internacional", "banco"], category: "Soberania Financeira" },
  { title: "Abertura Remota", description: "Como abrir contas no exterior remotamente", path: "/soberania-financeira/contas-offshore/abertura-remota", tags: ["abertura", "remota", "offshore", "conta"], category: "Soberania Financeira" },
  { title: "Neobankless", description: "Banking sem fronteiras", path: "/soberania-financeira/contas-internacionais/neobankless", tags: ["neobankless", "neobank", "digital", "internacional"], category: "Soberania Financeira" },
  { title: "Bank of Georgia", description: "Conta bancária na Geórgia", path: "/soberania-financeira/contas-internacionais/bank-of-georgia", tags: ["geórgia", "bank", "internacional", "conta"], category: "Soberania Financeira" },
  { title: "Wise", description: "Transferências internacionais com Wise", path: "/soberania-financeira/contas-internacionais/wise", tags: ["wise", "transferência", "câmbio", "internacional"], category: "Soberania Financeira" },
  { title: "Payoneer", description: "Receba em dólar com Payoneer", path: "/soberania-financeira/contas-internacionais/payoneer", tags: ["payoneer", "dólar", "receber", "freelancer"], category: "Soberania Financeira" },
  { title: "GrabrFi", description: "Plataforma de banking cripto", path: "/soberania-financeira/contas-internacionais/grabrfi", tags: ["grabrfi", "cripto", "banking", "digital"], category: "Soberania Financeira" },
  { title: "Exchanges sem KYC", description: "Trocas de cripto sem verificação de identidade", path: "/soberania-financeira/exchanges-privacidade-e-kyc", tags: ["exchange", "kyc", "privacidade", "troca"], category: "Soberania Financeira" },
  { title: "KYCnot.me", description: "Diretório de serviços sem KYC", path: "/soberania-financeira/exchanges-privacidade-e-kyc/kycnot-me", tags: ["kycnot", "privacidade", "sem kyc", "diretório"], category: "Soberania Financeira" },
  { title: "Optima Exchange", description: "Exchange descentralizada", path: "/soberania-financeira/exchanges-privacidade-e-kyc/optima-exchange", tags: ["optima", "exchange", "descentralizada", "dex"], category: "Soberania Financeira" },
  { title: "Pegasus Swap", description: "Swap de criptomoedas", path: "/soberania-financeira/exchanges-privacidade-e-kyc/pegasus-swap", tags: ["pegasus", "swap", "cripto", "troca"], category: "Soberania Financeira" },
  { title: "BRICS Pay", description: "Sistema de pagamento alternativo", path: "/soberania-financeira/brics-pay", tags: ["brics", "pagamento", "alternativo", "desdolarização"], category: "Soberania Financeira" },
  { title: "KuCoin Pay + Pix", description: "Pagamento cripto via Pix", path: "/soberania-financeira/kucoin-pay-pix", tags: ["kucoin", "pix", "pagamento", "cripto"], category: "Soberania Financeira" },
  { title: "Índice de Soberania Financeira", description: "Meça seu nível de independência", path: "/indice-de-soberania-financeira", tags: ["índice", "soberania", "teste", "avaliação"], category: "Soberania Financeira" },

  // Saída & Infraestrutura
  { title: "Estratégias de Saída", description: "Como sair do sistema fiat com segurança", path: "/saida", tags: ["saída", "fiat", "estratégia", "plano"], category: "Saída" },
  { title: "Gateway", description: "Portais de saída do sistema financeiro", path: "/saida/gateway", tags: ["gateway", "portal", "saída", "sistema"], category: "Saída" },
  { title: "Lightning Network", description: "Pagamentos instantâneos com Bitcoin", path: "/lightning", tags: ["lightning", "pagamento", "instantâneo", "rede"], category: "Infraestrutura" },
  { title: "PIX Cripto", description: "Receba via Pix, converta em cripto", path: "/pix-cripto", tags: ["pix", "cripto", "conversão", "receber"], category: "Infraestrutura" },
  { title: "Economia Paralela", description: "Construindo uma economia fora do sistema", path: "/economia-paralela", tags: ["paralela", "economia", "alternativa", "p2p"], category: "Infraestrutura" },
  { title: "Infraestrutura", description: "Stack técnico de soberania", path: "/infraestrutura", tags: ["infraestrutura", "stack", "técnico", "ferramentas"], category: "Infraestrutura" },
  { title: "DePix", description: "Reporte sobre o futuro do Pix e vigilância", path: "/alertas/depix-reporte-2026", tags: ["depix", "pix", "vigilância", "reporte"], category: "Alertas" },

  // Alertas
  { title: "Central de Alertas", description: "Ameaças à soberania individual", path: "/alertas", tags: ["alertas", "ameaças", "vigilância", "governo"], category: "Alertas" },
  { title: "CBDC Brasil", description: "A moeda digital do banco central", path: "/alertas/cbdc-brasil", tags: ["cbdc", "drex", "banco central", "digital"], category: "Alertas" },
  { title: "Proibição do Dinheiro", description: "O fim do dinheiro físico", path: "/proibicao-dinheiro", tags: ["proibição", "dinheiro", "físico", "cash"], category: "Alertas" },

  // Educação & Conteúdo
  { title: "Educação", description: "Trilha de formação soberanista", path: "/educacao", tags: ["educação", "formação", "trilha", "estudo"], category: "Educação" },
  { title: "Protocolo Inicial", description: "Por onde começar na soberania", path: "/protocolo-inicial", tags: ["protocolo", "início", "começo", "primeiro"], category: "Educação" },
  { title: "Audiobooks", description: "Biblioteca de áudio sobre soberania", path: "/audiobooks", tags: ["audiobook", "áudio", "livro", "podcast"], category: "Educação" },
  { title: "E-books", description: "Biblioteca digital de textos", path: "/ebooks", tags: ["ebook", "livro", "digital", "pdf"], category: "Educação" },
  { title: "Dicionário Cripto", description: "Glossário de termos do ecossistema", path: "/dicionario-cripto", tags: ["dicionário", "glossário", "termos", "definições"], category: "Educação" },
  { title: "Ferramentas", description: "Arsenal de ferramentas práticas", path: "/ferramentas", tags: ["ferramentas", "calculadora", "tools", "prática"], category: "Ferramentas" },
  { title: "Arsenal", description: "Kit completo de soberania", path: "/recursos-e-ferramentas", tags: ["arsenal", "kit", "completo", "recursos"], category: "Ferramentas" },
  { title: "Mapa da Soberania", description: "Visualize sua jornada completa", path: "/mapa-da-soberania", tags: ["mapa", "jornada", "progresso", "trilha"], category: "Ferramentas" },

  // Filosofia
  { title: "Filosofia", description: "Fundamentos filosóficos da soberania", path: "/filosofia", tags: ["filosofia", "liberdade", "indivíduo", "ética"], category: "Filosofia" },
  { title: "Índice do Despertar", description: "Meça seu nível de consciência soberana", path: "/indice-da-soberania", tags: ["despertar", "consciência", "índice", "teste"], category: "Filosofia" },
  { title: "O Silêncio da Queda", description: "Reflexão sobre o colapso silencioso", path: "/silencio-queda", tags: ["silêncio", "queda", "colapso", "reflexão"], category: "Filosofia" },

  // Soberania Orgânica
  { title: "Soberania Orgânica", description: "Autonomia prática: alimento, saúde e sobrevivência", path: "/soberania-organica", tags: ["autônomo", "autonomia", "sobrevivência", "prática"], category: "Soberania Orgânica" },
  { title: "Kit 72h", description: "Kit de emergência para 72 horas", path: "/soberania-organica/kit-72h", tags: ["kit", "72h", "emergência", "sobrevivência"], category: "Soberania Orgânica" },
  { title: "Purificação de Água", description: "Técnicas para purificar água", path: "/soberania-organica/purificacao-agua", tags: ["água", "purificação", "filtro", "sobrevivência"], category: "Soberania Orgânica" },
  { title: "Protocolos de Apagão", description: "O que fazer em um blackout", path: "/soberania-organica/protocolos-apagao", tags: ["apagão", "blackout", "protocolo", "energia"], category: "Soberania Orgânica" },
  { title: "Abrigo de Emergência", description: "Construção de abrigos temporários", path: "/soberania-organica/abrigo-emergencia", tags: ["abrigo", "emergência", "construção", "temporário"], category: "Soberania Orgânica" },
  { title: "Comunicação Offline", description: "Rádio e comunicação sem internet", path: "/soberania-organica/comunicacao-offline", tags: ["comunicação", "offline", "rádio", "mesh"], category: "Soberania Orgânica" },
  { title: "Navegação Primária", description: "Orientação sem GPS", path: "/soberania-organica/navegacao-primaria", tags: ["navegação", "bússola", "estrelas", "orientação"], category: "Soberania Orgânica" },
  { title: "Horta Urbana", description: "Produção de alimentos em espaços urbanos", path: "/soberania-organica/horta-urbana", tags: ["horta", "urbana", "alimento", "cultivo"], category: "Soberania Orgânica" },
  { title: "Autonomia Biológica", description: "Plantas medicinais e ervas", path: "/soberania-organica/autonomia-biologica", tags: ["biológica", "plantas", "ervas", "medicinal"], category: "Soberania Orgânica" },
  { title: "Primeiros Socorros", description: "Técnicas básicas de socorro", path: "/soberania-organica/primeiros-socorros", tags: ["primeiros socorros", "saúde", "emergência", "medicina"], category: "Soberania Orgânica" },
  { title: "Saúde Preventiva", description: "Prevenção e auto-cuidado", path: "/soberania-organica/saude-preventiva", tags: ["saúde", "preventiva", "prevenção", "cuidado"], category: "Soberania Orgânica" },
  { title: "Fitoterapia Aplicada", description: "Uso prático de plantas medicinais", path: "/soberania-organica/fitoterapia-aplicada", tags: ["fitoterapia", "plantas", "medicinal", "natural"], category: "Soberania Orgânica" },
  { title: "Conservação & Armazenamento", description: "Técnicas de conservação de alimentos", path: "/soberania-organica/armazenamento-longo-prazo", tags: ["conservação", "armazenamento", "alimento", "estoque"], category: "Soberania Orgânica" },
  { title: "Produção em Pequenos Espaços", description: "Cultivo em apartamentos e varandas", path: "/soberania-organica/producao-pequenos-espacos", tags: ["pequenos espaços", "apartamento", "varanda", "cultivo"], category: "Soberania Orgânica" },
  { title: "Proteína Sustentável", description: "Fontes alternativas de proteína", path: "/soberania-organica/proteina-sustentavel", tags: ["proteína", "sustentável", "alimento", "alternativa"], category: "Soberania Orgânica" },
  { title: "Solo e Fertilidade", description: "Preparação e manutenção do solo", path: "/soberania-organica/solo-fertilidade", tags: ["solo", "fertilidade", "compostagem", "terra"], category: "Soberania Orgânica" },
  { title: "Sabedoria Ancestral", description: "Conhecimentos tradicionais de sobrevivência", path: "/soberania-organica/sabedoria-ancestral", tags: ["ancestral", "tradicional", "sabedoria", "conhecimento"], category: "Soberania Orgânica" },
  { title: "Conhecimento Perdido", description: "Habilidades esquecidas pela modernidade", path: "/soberania-organica/conhecimento-perdido", tags: ["conhecimento", "perdido", "habilidade", "esquecido"], category: "Soberania Orgânica" },
  { title: "Controle de Vetores", description: "Controle de pragas e vetores de doenças", path: "/soberania-organica/controle-vetores", tags: ["vetores", "pragas", "controle", "doenças"], category: "Soberania Orgânica" },

  // Tóxicos Ocultos
  { title: "Tóxicos Ocultos", description: "Ameaças invisíveis à sua autonomia", path: "/soberania-organica/toxicos-ocultos", tags: ["tóxicos", "ocultos", "ameaças", "veneno"], category: "Tóxicos Ocultos" },
  { title: "Toxinas Alimentares", description: "Venenos escondidos na sua comida", path: "/soberania-organica/toxicos-ocultos/toxinas-alimentares", tags: ["toxinas", "alimentar", "veneno", "comida"], category: "Tóxicos Ocultos" },
  { title: "Manipulação Informacional", description: "Propaganda e controle narrativo", path: "/soberania-organica/toxicos-ocultos/manipulacao-informacional", tags: ["manipulação", "informação", "propaganda", "narrativa"], category: "Tóxicos Ocultos" },
  { title: "Dependência Tecnológica", description: "O vício em tecnologia como ferramenta de controle", path: "/soberania-organica/toxicos-ocultos/dependencia-tecnologica", tags: ["dependência", "tecnologia", "vício", "controle"], category: "Tóxicos Ocultos" },
  { title: "Toxinas Ambientais", description: "Poluentes e contaminantes no ambiente", path: "/soberania-organica/toxicos-ocultos/toxinas-ambientais", tags: ["toxinas", "ambiental", "poluição", "contaminante"], category: "Tóxicos Ocultos" },

  // Rede & Comunicação Soberana
  { title: "O que é Nostr?", description: "O protocolo de rede social que ninguém consegue desligar: chaves, relays, NIP-05 e censura zero", path: "/o-que-e-nostr", tags: ["nostr", "rede social", "censura", "relay", "npub", "nip-05", "protocolo", "descentralizado", "damus", "amethyst", "primal", "zaps", "lightning"], category: "Infraestrutura" },
  { title: "Comunicação Segura", description: "Mensageria criptografada e comunicação fora do controle estatal", path: "/soberania-organica/comunicacao-segura", tags: ["comunicação", "criptografia", "signal", "privacidade", "mensagem"], category: "Infraestrutura" },
  { title: "Defesa Digital", description: "Higiene digital, OPSEC e blindagem de dispositivos", path: "/soberania-organica/defesa-digital", tags: ["defesa digital", "opsec", "privacidade", "segurança", "dados"], category: "Infraestrutura" },
  { title: "Vazamento de Dados", description: "Como seus dados vazam e o que fazer sobre isso", path: "/vazamento-dados", tags: ["vazamento", "dados", "privacidade", "leak"], category: "Alertas" },

  // Bitcoin & Autocustódia (novos)
  { title: "Jade Core — Review", description: "A hardware wallet que te tira da gaiola fiat em menos de 5 minutos", path: "/autocustodia/jade-core-review", tags: ["jade", "jade core", "hardware wallet", "blockstream", "review", "ledger", "trezor", "coldcard", "autocustódia"], category: "Autocustódia" },
  { title: "Seed Phrase em Aço", description: "Backup indestrutível da sua seed contra fogo, água e tempo", path: "/autocustodia/seed-phrase-em-aco", tags: ["seed", "aço", "backup", "steel", "24 palavras"], category: "Autocustódia" },
  { title: "Melhores Hardware Wallets 2026", description: "Comparativo honesto: Coldcard, Trezor, Jade, Krux e Passport", path: "/comparativos/melhores-hardware-wallets", tags: ["hardware wallet", "melhor carteira bitcoin", "coldcard", "trezor", "jade", "krux", "passport", "comparativo", "air gap", "psbt"], category: "Autocustódia" },
  { title: "Coldcard Review", description: "Air-gap real, PSBT via microSD, duress PIN e brick me", path: "/comparativos/coldcard-review", tags: ["coldcard", "review", "hardware wallet", "air gap", "microsd", "psbt", "duress pin", "só bitcoin"], category: "Autocustódia" },
  { title: "Trezor Review", description: "Safe 3, Safe 5 e modelos legados: código aberto, secure element e riscos", path: "/comparativos/trezor-review", tags: ["trezor", "review", "safe 3", "safe 5", "model t", "hardware wallet", "passphrase", "secure element", "multisig"], category: "Autocustódia" },
  { title: "Backup da Seed Phrase", description: "Guia pilar: aço, esquema 3-2-1, passphrase, teste de restauração e herança", path: "/autocustodia/backup-seed-phrase-guia", tags: ["seed phrase", "backup", "bip39", "24 palavras", "aço", "shamir", "slip39", "passphrase", "restauração", "herança", "frase de recuperação"], category: "Autocustódia" },
  { title: "UTXO e Consolidação", description: "O que é UTXO, dust, taxas em vbytes, coin control e quando consolidar", path: "/autocustodia/utxo-consolidacao", tags: ["utxo", "consolidação", "dust", "taxa", "vbyte", "coin control", "sparrow", "electrum", "coinjoin", "privacidade", "dca"], category: "Autocustódia" },
  { title: "Soberania Orgânica: Comece Aqui", description: "Roteiro em 7 fases para água, horta, preservação e farmácia viva", path: "/soberania-organica/comece-aqui", tags: ["comece aqui", "horta", "autonomia alimentar", "água", "conservas", "plantas medicinais", "soberania orgânica", "iniciante", "roteiro"], category: "Autonomia Alimentar" },
  { title: "Declarar Bitcoin no IR 2026", description: "Ficha de bens, código 81, ganho de capital e malha fina", path: "/imposto-renda/declarar-bitcoin-2026", tags: ["imposto de renda", "declarar bitcoin", "ir 2026", "código 81", "ganho de capital", "receita federal", "cripto", "darf"], category: "Soberania Financeira" },
  { title: "Isenção de 35 Mil em Cripto", description: "Como funciona o limite mensal de venda isenta de imposto", path: "/imposto-renda/isencao-35-mil", tags: ["isenção", "35 mil", "imposto", "venda", "alienação", "cripto", "ir", "darf"], category: "Soberania Financeira" },
  { title: "Melhores Países para Brasileiros", description: "Comparativo de jurisdições por custo, tributação e facilidade", path: "/saida/melhores-paises-brasileiros", tags: ["países", "morar fora", "expatriação", "chile", "paraguai", "uruguai", "geórgia", "palau", "residência"], category: "Saída & Infraestrutura" },
  { title: "Residência no Paraguai", description: "Passo a passo, custos reais e tributação territorial", path: "/saida/residencia-paraguai", tags: ["paraguai", "residência", "cédula", "ruc", "tributação territorial", "morar fora", "asunción"], category: "Saída & Infraestrutura" },
  { title: "Como Vender Bitcoin P2P", description: "Escrow, reputação, OpSec, ágio e riscos reais da venda direta", path: "/p2p/como-vender-bitcoin-p2p", tags: ["p2p", "vender bitcoin", "escrow", "bisq", "robosats", "hodl hodl", "peach", "pix", "dinheiro vivo"], category: "Soberania Financeira" },
  { title: "Bisq: Guia Completo", description: "Instalação, Tor, depósito de segurança e primeira compra", path: "/p2p/bisq-guia-completo", tags: ["bisq", "p2p", "tor", "descentralizado", "sem kyc", "bisq easy", "arbitragem", "guia"], category: "Soberania Financeira" },
  { title: "Herança Bitcoin", description: "Plano de sucessão para seus sats sem expor chaves", path: "/autocustodia/heranca-bitcoin", tags: ["herança", "sucessão", "morte", "família", "multisig"], category: "Autocustódia" },
  { title: "CoinJoin e Privacidade", description: "Quebra de rastreabilidade on-chain na prática", path: "/autocustodia/coinjoin-privacidade", tags: ["coinjoin", "privacidade", "utxo", "rastreio", "chain analysis"], category: "Autocustódia" },
  { title: "Multisig Bitcoin", description: "Custódia distribuída com múltiplas assinaturas", path: "/multisig-bitcoin", tags: ["multisig", "2 de 3", "custódia", "segurança"], category: "Autocustódia" },
  { title: "Krux, Passphrase e BlueWallet", description: "Setup avançado de autocustódia com airgap", path: "/autocustodia/krux-passphrase-bluewallet", tags: ["krux", "passphrase", "bluewallet", "airgap", "diy"], category: "Autocustódia" },
  { title: "Comprar Bitcoin Anônimo", description: "Rotas P2P e não-KYC para acumular sem rastro", path: "/comprar-bitcoin-anonimo", tags: ["anônimo", "sem kyc", "p2p", "privacidade", "comprar bitcoin"], category: "Autocustódia" },

  // Soberania Financeira (novos)
  { title: "Cartões Cripto sem Reporte", description: "Sacar dinheiro vivo com cartões cripto e mínima exposição", path: "/soberania-financeira/cartoes-cripto-sem-reporte", tags: ["cartão cripto", "sem reporte", "redotpay", "saque", "atm", "privacidade", "kyc"], category: "Soberania Financeira" },
  { title: "Exchanges sem KYC", description: "Hub de corretoras que não pedem identidade", path: "/soberania-financeira/exchanges-sem-kyc", tags: ["exchange", "sem kyc", "anônimo", "corretora"], category: "Soberania Financeira" },
  { title: "KYCnot.me", description: "Diretório de serviços sem verificação de identidade", path: "/soberania-financeira/exchanges-sem-kyc/kycnot-me", tags: ["kycnotme", "sem kyc", "diretório", "privacidade"], category: "Soberania Financeira" },
  { title: "Optima Exchange", description: "Análise da corretora sem KYC", path: "/soberania-financeira/exchanges-sem-kyc/optima-exchange", tags: ["optima", "exchange", "sem kyc"], category: "Soberania Financeira" },
  { title: "Pegasus Swap", description: "Swap sem cadastro e sem rastro", path: "/soberania-financeira/exchanges-sem-kyc/pegasus-swap", tags: ["pegasus", "swap", "sem kyc"], category: "Soberania Financeira" },
  { title: "Bybit e Binance Reportam Brasileiros", description: "O fim do sigilo nas exchanges centralizadas", path: "/soberania-financeira/exchanges-privacidade-e-kyc/bybit-binance-reportam-brasileiros", tags: ["bybit", "binance", "reporte", "receita federal", "kyc"], category: "Alertas" },
  { title: "PIX sem Banco", description: "Receber e pagar PIX fora do sistema bancário tradicional", path: "/soberania-financeira/pix-sem-banco", tags: ["pix", "sem banco", "depix", "lightning"], category: "Soberania Financeira" },
  { title: "PIX Anônimo", description: "Limites e riscos reais de privacidade no PIX", path: "/pix-anonimo", tags: ["pix", "anônimo", "privacidade", "banco central"], category: "Soberania Financeira" },
  { title: "BitPark — Cartão Bitcoin", description: "Cartão lastreado em Bitcoin para gasto diário", path: "/bitpark-cartao-bitcoin", tags: ["bitpark", "cartão", "bitcoin", "gasto"], category: "Soberania Financeira" },
  { title: "Polymarket e Rede Neural BTC", description: "Mercados de previsão como termômetro do Bitcoin", path: "/polymarket-rede-neural-btc", tags: ["polymarket", "previsão", "mercado", "btc"], category: "Soberania Financeira" },

  // Saída & Jurisdições
  { title: "Cédula e Residência no Chile", description: "Como iniciar residência chilena 100% online: documentos, custos e cidadania", path: "/saida/cedula-residencia-chile", tags: ["chile", "residência", "cédula", "imigração", "segundo passaporte", "plano b", "saída"], category: "Saída" },
  { title: "Jurisdições Amigáveis", description: "Países que respeitam capital e privacidade", path: "/saida/jurisdicoes-amigaveis", tags: ["jurisdição", "país", "offshore", "residência"], category: "Saída" },
  { title: "Residência Fiscal", description: "Como mudar sua residência fiscal legalmente", path: "/saida/residencia-fiscal", tags: ["residência fiscal", "imposto", "saída fiscal", "domicílio"], category: "Saída" },
  { title: "Segundo Passaporte", description: "Rotas realistas para a segunda cidadania", path: "/saida/segundo-passaporte", tags: ["passaporte", "cidadania", "plano b", "imigração"], category: "Saída" },
  { title: "Palau Digital Residency", description: "Residência digital e ID internacional", path: "/palau-digital-residency", tags: ["palau", "residência digital", "id", "identidade"], category: "Saída" },

  // Alertas
  { title: "Nova Lei da Conta Corrente", description: "O que muda no monitoramento das suas movimentações", path: "/alertas/nova-lei-conta-corrente", tags: ["lei", "conta corrente", "receita", "monitoramento", "alerta"], category: "Alertas" },
  { title: "O Governo Pode Tomar Seus Bitcoins?", description: "Vetores reais de confisco e como blindar", path: "/alertas/governo-tomar-bitcoins", tags: ["confisco", "governo", "bitcoin", "apreensão"], category: "Alertas" },
  { title: "Fim do Dinheiro Vivo", description: "A guerra contra o papel-moeda e o avanço do controle", path: "/alertas/fim-do-dinheiro-vivo", tags: ["dinheiro vivo", "cash", "cbdc", "controle"], category: "Alertas" },
  { title: "Proteção Patrimonial com Bitcoin", description: "Estruturas de blindagem do patrimônio", path: "/alertas/protecao-patrimonial-bitcoin", tags: ["patrimônio", "proteção", "blindagem", "bitcoin"], category: "Alertas" },
  { title: "Novilíngua", description: "A linguagem como ferramenta de controle", path: "/novilingua", tags: ["novilíngua", "linguagem", "orwell", "controle"], category: "Filosofia" },

  // Entrada / Institucional
  { title: "Por Onde Começar", description: "Trilha inicial para sair do zero na soberania", path: "/por-onde-comecar", tags: ["começar", "iniciante", "trilha", "primeiros passos", "guia"], category: "Educação" },
  { title: "Sobre Mim", description: "Dossiê do operador: trajetória, capacidades e diretrizes", path: "/sobre-mim", tags: ["sobre", "lord junnior", "quem sou", "dossiê", "autor", "contato"], category: "Educação" },
  { title: "Arsenal", description: "Coleção de ferramentas e recursos operacionais", path: "/arsenal", tags: ["arsenal", "ferramentas", "recursos", "kit"], category: "Ferramentas" },
  { title: "Índice do Despertar", description: "Medidor de progresso na saída do sistema", path: "/indice-do-despertar", tags: ["índice", "despertar", "progresso", "nível"], category: "Ferramentas" },

  // Soberania Orgânica (novos)
  { title: "EDC — Every Day Carry", description: "O que carregar todo dia para autonomia real", path: "/soberania-organica/edc", tags: ["edc", "kit", "carregar", "sobrevivência"], category: "Soberania Orgânica" },
  { title: "Defesa Pessoal", description: "Princípios de defesa e consciência situacional", path: "/soberania-organica/defesa-pessoal", tags: ["defesa pessoal", "segurança", "autodefesa"], category: "Soberania Orgânica" },
  { title: "Defesa Domiciliar", description: "Camadas de proteção da sua casa", path: "/soberania-organica/defesa-domiciliar", tags: ["defesa", "casa", "domicílio", "perímetro"], category: "Soberania Orgânica" },
  { title: "Primeiros Socorros Táticos", description: "Protocolos de trauma e estabilização", path: "/soberania-organica/primeiros-socorros-taticos", tags: ["primeiros socorros", "trauma", "tático", "emergência"], category: "Soberania Orgânica" },
  { title: "Protocolo do Fogo", description: "Ignição confiável em qualquer condição", path: "/soberania-organica/protocolo-fogo", tags: ["fogo", "ignição", "sobrevivência", "calor"], category: "Soberania Orgânica" },
  { title: "Autonomia Veicular", description: "Manutenção e independência sobre rodas", path: "/soberania-organica/autonomia-veicular", tags: ["veículo", "carro", "manutenção", "mobilidade"], category: "Soberania Orgânica" },
  { title: "Higiene Mental", description: "Blindagem cognitiva contra ruído e manipulação", path: "/soberania-organica/higiene-mental", tags: ["mental", "foco", "dopamina", "atenção"], category: "Soberania Orgânica" },
  { title: "Conservação de Alimentos", description: "Estoque estratégico e conservação prática", path: "/soberania-organica/conservacao-alimentos", tags: ["conservação", "alimentos", "estoque", "despensa"], category: "Soberania Orgânica" },
  { title: "Plantas Subutilizadas", description: "Farmacopeia brasileira esquecida", path: "/soberania-organica/plantas-subutilizadas", tags: ["plantas", "pancs", "fitoterapia", "medicinal"], category: "Soberania Orgânica" },
  { title: "Própolis", description: "Uso terapêutico e critérios de qualidade", path: "/soberania-organica/propolis", tags: ["própolis", "abelha", "imunidade", "natural"], category: "Soberania Orgânica" },
  { title: "Óleo de Rícino Biohacker", description: "Aplicações práticas e limites de segurança", path: "/soberania-organica/oleo-ricino-biohacker", tags: ["rícino", "óleo", "biohacker", "protocolo"], category: "Soberania Orgânica" },
  { title: "Avaliação de Sinais", description: "Leitura de sinais fisiológicos do corpo", path: "/soberania-organica/avaliacao-sinais", tags: ["sinais", "fisiologia", "saúde", "diagnóstico"], category: "Soberania Orgânica" },
  { title: "Receitas Funcionais", description: "Cozinha funcional com propósito terapêutico", path: "/receitas-funcionais", tags: ["receitas", "funcional", "cozinha", "chá", "garrafada"], category: "Soberania Orgânica" },
  { title: "Ricos Não Investem em FIIs", description: "Por que o dinheiro grande ignora fundos imobiliários", path: "/mercado-tradicional/ricos-nao-investem-fiis", tags: ["fii", "fundos imobiliários", "investimento", "mercado tradicional"], category: "Economia" },
];


// Simple fuzzy match
export function fuzzySearch(query: string, entries: SearchEntry[]): SearchEntry[] {
  const q = query.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  if (!q) return [];

  return entries
    .map((entry) => {
      const haystack = [entry.title, entry.description, ...entry.tags, entry.category]
        .join(" ")
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");

      // Check for direct substring match
      if (haystack.includes(q)) return { entry, score: 3 };

      // Check individual words
      const words = q.split(/\s+/);
      const matches = words.filter((w) => haystack.includes(w)).length;
      if (matches > 0) return { entry, score: matches / words.length };

      return { entry, score: 0 };
    })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 12)
    .map((r) => r.entry);
}
