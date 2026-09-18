import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  MessageSquareLock,
  Radio,
  Smartphone,
  KeyRound,
  Network,
  ShieldAlert,
  ChevronDown,
  ArrowRight,
  AlertTriangle,
  CheckCircle2,
  Antenna,
} from 'lucide-react';
import SeoHead from '@/components/SeoHead';
import BackToHome from '@/components/BackToHome';
import FixedThematicBackground from '@/components/backgrounds/FixedThematicBackground';
import CinematicHero from '@/components/CinematicHero';
import heroImg from '@/assets/saida/comunicacao-segura-hero.webp';
import meshImg from '@/assets/saida/comunicacao-segura-mesh.webp';
import burnerImg from '@/assets/saida/comunicacao-segura-burner.webp';

const APPLE_EASE = [0.22, 1, 0.36, 1] as const;
const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.7, ease: APPLE_EASE, delay },
});

interface Pilar {
  num: string;
  nome: string;
  contexto: string;
  passos: string[];
  falhas: string;
  icon: typeof KeyRound;
}

const PILARES: Pilar[] = [
  {
    num: '01',
    nome: 'Signal vs SimpleX: escolha por nível de exposição',
    icon: MessageSquareLock,
    contexto: 'Signal é a referência consolidada de mensageria criptografada: protocolo Signal (Double Ratchet + X3DH) é estado da arte, auditado, código aberto, end-to-end por padrão. Limitação: exige número de telefone como identificador, o que cria âncora de identidade. SimpleX Chat resolve isso eliminando identificador permanente: cada conversa usa par de chaves único, sem número, sem usuário, sem servidor central com lista de contatos. Para conversas de família e trabalho, Signal basta. Para tópicos sensíveis, denúncias, jornalismo investigativo ou opsec real, SimpleX é o padrão. WhatsApp lê metadados completos (quem fala com quem, quando, frequência, geolocalização do envio) e entrega para Meta e governo brasileiro sob ordem judicial em 24 horas. Banir WhatsApp para qualquer conversa que importe é o passo zero da defesa.',
    passos: [
      'Instale Signal direto da signal.org (Android via APK oficial ou Play Store, iOS via App Store). Cadastre com número de chip pré-pago descartável (não use seu número principal). Ative PIN de registro de 6+ dígitos para evitar SIM swap clonar a conta.',
      'Configure mensagens efêmeras por padrão (24 horas para conversas comuns, 1 hora para tópicos sensíveis). Desative backup em nuvem (iCloud, Google Drive). Ative trava por biometria ou PIN no app.',
      'Para SimpleX: instale via simplex.chat, gere identidade local sem cadastro, compartilhe link de conexão único com cada contato (QR code presencial ou link via canal seguro). Não há lista de contatos centralizada, cada conexão é par a par.',
      'Verificação fora-de-banda: confira número de segurança (Signal) ou impressão digital (SimpleX) com cada contato em encontro presencial. Sem essa verificação, MITM é possível em teoria. Refresque verificação a cada 6 meses ou quando contato trocar de aparelho.',
      'Banimento progressivo de WhatsApp: migre família por convite presencial, justifique com privacidade ("WhatsApp lê metadados, Signal não"), aceite que 30% vão resistir e use Signal apenas com quem aceita. Os outros viram contato de baixa confiança.',
    ],
    falhas: 'Cadastrar Signal com número principal e ainda mandar conversa sensível ("se vazar, ao menos não tem conteúdo, só metadado de número"). Aceitar backup do Signal em iCloud "para não perder histórico". Compartilhar link SimpleX em canal não seguro (Telegram, Instagram DM).',
  },
  {
    num: '02',
    nome: 'PGP prático: assinatura, cifragem e identidade duradoura',
    icon: KeyRound,
    contexto: 'PGP (Pretty Good Privacy, hoje GPG/OpenPGP) é a tecnologia que cifra email, assina arquivos e cria identidade criptográfica duradoura há 30 anos. Continua sendo padrão para jornalismo investigativo, denúncia anônima, comunicação com fontes, distribuição de software (assinatura de releases). Crítica comum (UX ruim, confusão de gestão de chaves) é real, mas para casos de uso específicos não tem substituto. Par de chaves: pública (compartilhada livremente, usada para cifrar mensagens para você ou verificar sua assinatura) e privada (mantida em sigilo absoluto, usada para decifrar mensagens recebidas e assinar conteúdo). Identidade PGP bem gerida é prova criptográfica de autoria e continuidade de presença ao longo de décadas.',
    passos: [
      'Instale GnuPG: gpg no Linux/macOS via gestor de pacotes, Gpg4win no Windows. Para uso em mobile, OpenKeychain no Android é a referência open source.',
      'Gere par de chaves com algoritmo moderno: gpg --full-generate-key, escolha ECC Curve 25519 (mais rápido e moderno que RSA), validade de 2 anos com renovação manual. Senha-passe da chave privada é frase de 6 palavras BIP39 + 4 dígitos, decorada e nunca anotada digital.',
      'Subchaves separadas para assinatura, cifragem e autenticação. Master key fica offline em hardware separado (YubiKey 5 com OpenPGP applet, ou pendrive criptografado guardado em cofre). Subchaves diárias ficam no laptop. Comprometimento da subchave não compromete a master.',
      'Publique chave pública em keyserver (keys.openpgp.org) e em domínio próprio via WKD (Web Key Directory). Imprima fingerprint em cartão e distribua presencialmente para validação cruzada.',
      'Use para 4 casos: 1) Cifrar email crítico via Thunderbird + Enigmail ou Mailvelope, 2) Assinar arquivos importantes (contratos, releases, declarações públicas) com gpg --sign, 3) Verificar autenticidade de software baixado (gpg --verify do checksum), 4) Comunicação com fontes em jornalismo ou denúncia.',
    ],
    falhas: 'Gerar chave RSA 2048 em 2025 (use ECC). Salvar senha-passe da chave privada no gestor que está no mesmo laptop da chave (compromisso simultâneo). Esquecer de revogar chave antiga publicamente ao migrar de algoritmo. Confiar em chave pública recebida por email sem verificar fingerprint por canal independente.',
  },
  {
    num: '03',
    nome: 'Mesh networks: Briar e Meshtastic para zero internet',
    icon: Network,
    contexto: 'Mesh é comunicação par a par sem servidor central, sem ISP, sem operadora. Briar usa Bluetooth, Wi-Fi local e Tor para sincronizar mensagens entre celulares vizinhos, criando rede malha que continua funcionando mesmo com internet cortada (apagão, censura, manifestação com torre desligada, área rural sem cobertura). Meshtastic usa rádios LoRa de baixa potência (915 MHz no Brasil) com alcance de 2 a 15 km dependendo do terreno, formando rede de longa distância sem qualquer infraestrutura. Ambos são open source, testados em campo (manifestações em Hong Kong, Bielorrússia, Cuba) e devem fazer parte do kit de comunicação de qualquer pessoa que leve autonomia a sério. Custo: Briar é gratuito (só precisa do celular). Meshtastic exige rádio LoRa (R$ 200 a R$ 800 por nó) e antena (R$ 50 a R$ 300).',
    passos: [
      'Briar: instale via F-Droid (não exige Google Play). Crie identidade local sem número de telefone. Pareie contatos por QR code presencial ou link via canal seguro. Mensagens sincronizam por Bluetooth quando contato fica a até 10 metros, por Wi-Fi local quando na mesma rede, por Tor quando há internet.',
      'Meshtastic: compre 2 a 4 nós LoRa (Heltec V3, RAK Wireless, LilyGo T-Beam) com antena externa de 3 a 8 dBi. Flash firmware Meshtastic (instalação via web em meshtastic.org), configure canal cifrado AES-256 com pre-shared key e nicknames de operação (não use nome real).',
      'Topologia: distribua nós em casa, no carro, na mochila e com 1 a 3 contatos próximos. Cada nó retransmite mensagens dos vizinhos, criando rede com alcance de 5 a 30 km dependendo da densidade de nós. Em terreno aberto, single hop chega a 15 km com antena adequada.',
      'Treinamento: pratique troca de mensagens cifradas em cenário simulado (família em casas diferentes do bairro, exercício mensal). Meça alcance real do seu setup, ajuste antena, documente pontos cegos.',
      'Casos de uso: comunicação familiar em apagão prolongado, coordenação em manifestação com internet cortada, área rural sem celular, expedição de longa distância, situação de crise civil onde redes comerciais ficam congestionadas ou desligadas por ordem governamental.',
    ],
    falhas: 'Achar que Meshtastic substitui WhatsApp (não substitui, é complementar para situação de exceção). Comprar nó sem antena externa (alcance cai 80%). Configurar canal Meshtastic em modo público sem cifragem (qualquer pessoa com rádio LoRa lê tudo). Esquecer de atualizar firmware (vulnerabilidades corrigidas a cada release).',
  },
  {
    num: '04',
    nome: 'Telefone descartável: chip pré-pago, aparelho dedicado, opsec',
    icon: Smartphone,
    contexto: 'Telefone descartável (burner phone) é aparelho usado para finalidade específica e curta, sem vínculo com identidade real, descartado ao fim da operação. Casos: comunicação anônima com fonte jornalística, viagem para jurisdição hostil, recebimento de SMS de 2FA sem expor número principal, coordenação em situação de crise sem deixar rastro vinculável. No Brasil, chip pré-pago exige CPF desde 2014 (Resolução Anatel 632), o que limita anonimato real. Estratégias: chip de terceiro com consentimento (cônjuge, sócio confiável), chip internacional comprado em viagem (eSIM de operadora estrangeira como Truphone ou Airalo, raramente vinculado a CPF brasileiro), número virtual via MySudo, Hushed ou Phoner (custa R$ 5 a R$ 30 por mês, aceita SMS na maioria dos serviços). Aparelho deve ser básico (Nokia 110, feature phone candy bar, R$ 200), nunca smartphone com app que vincula identidade.',
    passos: [
      'Compre aparelho básico em loja física pagando em dinheiro: Nokia 110, Multilaser ou similar, R$ 150 a R$ 300. Sem câmera, sem Android, sem conta Google. Bateria removível é vantagem para opsec em situação de risco.',
      'Chip: pré-pago de operadora pequena (Algar, Surf Telecom) cadastrado com CPF de pessoa de confiança que não é alvo, ou eSIM internacional via Airalo se viagem internacional. Recarga sempre em dinheiro, nunca cartão vinculado ao seu CPF.',
      'Faraday bag obrigatório quando o burner não está em uso: bloqueia sinal celular, GPS, Bluetooth e Wi-Fi simultaneamente. Custa R$ 100 a R$ 250. Sem Faraday, o aparelho desligado ainda pode ser triangulado se houver bateria conectada.',
      'Opsec de uso: nunca ligue burner no mesmo local do celular principal (correlação de torre vincula identidades). Nunca discague para contato salvo no celular principal. Use apenas em local público com câmera mínima. Desligue e remova bateria fora do uso.',
      'Descarte: ao fim da operação, formate aparelho, remova chip, destrua chip fisicamente (corte com tesoura, queime), descarte aparelho longe da residência (lixeira pública distante). Recompra para próxima operação, sem reaproveitamento.',
    ],
    falhas: 'Cadastrar burner com seu próprio CPF (anonimato zero). Carregar burner e celular principal no mesmo bolso por dias (correlação garantida). Tirar foto com burner e enviar para Whatsapp do celular principal. Reusar burner por mais de 30 dias em operações distintas (correlação acumulada).',
  },
  {
    num: '05',
    nome: 'Email seguro com PGP integrado',
    icon: ShieldAlert,
    contexto: 'Email tradicional (Gmail, Outlook, Yahoo) é texto plano nos servidores, lido por algoritmos de propaganda, vinculado à identidade real, entregue sob ordem judicial sem notificação. ProtonMail e Tutanota oferecem cifragem zero-access no servidor (mesmo invadidos, não conseguem ler), suportam PGP nativo entre usuários, hospedagem em jurisdição amigável (Suíça e Alemanha respectivamente). Para casos de máxima sensibilidade, combine ProtonMail com PGP manual via Thunderbird ou Mailvelope, garantindo cifragem ponta a ponta mesmo se o destinatário usar Gmail. Email é canal lento por design: nunca espere confidencialidade total, apenas redução de superfície de coleta.',
    passos: [
      'Crie conta ProtonMail Plus paga em bitcoin (5 EUR/mês), com domínio próprio para parecer profissional. Conta gratuita serve para teste, mas paga remove watermarks e libera aliasing por domínio.',
      'Ative 2FA com YubiKey hardware. Senha de 24 caracteres aleatórios salva apenas no gestor offline. Recovery codes impressos e guardados em cofre físico.',
      'PGP: ProtonMail integra PGP nativamente entre usuários ProtonMail. Para destinatários externos (Gmail), exporte sua chave pública em proton.me/account/encryption-keys e instrua o contato a usar Mailvelope (extensão de browser) ou Thunderbird + Enigmail.',
      'Aliasing: use SimpleLogin (mesmo dono do ProtonMail) para criar aliases descartáveis (netflix-x9k@simplelogin.io) que encaminham para sua conta principal. Se um alias começar a receber spam, descarte sem afetar outros.',
      'Disciplina de uso: email crítico apenas para banco, exchange, governo e correspondência confidencial. Cadastros marketing usam aliases. Newsletters usam conta separada. Conta principal nunca aparece em formulário público.',
    ],
    falhas: 'Sincronizar ProtonMail com Outlook ou Apple Mail nativo (decifragem local quebra zero-access). Compartilhar chave PGP por canal não verificado. Manter conta antiga do Gmail ativa apontando para todos os 500 serviços herdados. Confiar em "modo confidencial" do Gmail (é teatro, não cifragem real).',
  },
  {
    num: '06',
    nome: 'Protocolo de comunicação em crise',
    icon: Radio,
    contexto: 'Em situação de crise (apagão prolongado, censura ativa, agitação civil, evento climático extremo, emergência médica em área isolada) o canal de comunicação habitual desaparece: torre desligada, internet bloqueada, energia cortada, app específico capturado. Família precisa de protocolo treinado e redundante, não de improviso. Protocolo é hierarquia de canais com gatilhos claros, ponto de encontro físico fixo e mensagens-código memorizadas. Treinamento mínimo: 1 simulação semestral com toda a família, incluindo crianças e idosos. Redundância: 4 canais distintos (celular, mesh, rádio amador, presencial) com fallback automático.',
    passos: [
      'Hierarquia de canais: 1) Signal (cotidiano), 2) Briar via Bluetooth/Wi-Fi se internet cair, 3) Meshtastic LoRa para distância média sem internet, 4) Rádio amador (HT VHF/UHF) ou PMR446 para alcance regional, 5) Encontro físico em ponto fixo se nada funcionar.',
      'Mensagens-código memorizadas: 3 a 5 frases curtas que comunicam estado sem revelar contexto. Exemplo: "Vovó está bem" = situação normal. "Vovó precisa de remédio" = abandone o local agora. "Vovó vai viajar" = vamos para o ponto de encontro alternativo. Códigos rotacionados a cada 6 meses.',
      'Ponto de encontro físico: 2 locais predefinidos, um próximo (raio de 5 km) e um remoto (raio de 50 a 200 km). Ambos com cache de suprimentos básicos enterrado ou guardado em local de confiança. Coordenadas memorizadas, nunca apenas no celular.',
      'Janela de check-in: cada membro da família tem horário fixo diário para confirmar status (ex: 8h, 13h, 19h). Falha em 2 check-ins consecutivos aciona protocolo de busca: tentar canais alternativos em sequência, depois ir ao ponto de encontro próximo.',
      'Simulação semestral: 1 fim de semana por semestre dedicado a exercitar protocolo completo. Desligue celular principal por 24h, force uso de Signal + Briar + Meshtastic + ponto de encontro. Documente falhas, ajuste protocolo, treine de novo.',
    ],
    falhas: 'Confiar 100% no WhatsApp como canal único de família (cai junto com a internet ou o app). Não treinar crianças e idosos no protocolo (eles esquecem em situação de stress real). Anotar mensagens-código no celular (vazamento via apreensão ou roubo). Não ter ponto de encontro físico definido por escrito em local seguro fora do celular.',
  },
  {
    num: '07',
    nome: 'Faraday: blindagem física de aparelhos',
    icon: Antenna,
    contexto: 'Toda emissão eletromagnética de celular, smartwatch, chave-cartão de carro e tracker pessoal pode ser interceptada ou triangulada. Gaiola de Faraday é tecido condutor (cobre, prata ou alumínio) que envolve o dispositivo e bloqueia 100% do sinal de saída e entrada (celular, GPS, Bluetooth, Wi-Fi, NFC, UWB). Saco Faraday qualificado custa R$ 100 a R$ 250 e cabe celular + chave-cartão. Sala Faraday completa custa R$ 5 mil a R$ 30 mil dependendo da metragem. Em qualquer reunião sensível, conversa familiar de tópico patrimonial ou negociação confidencial, todos os aparelhos vão para o saco Faraday antes de começar. Sem Faraday, o microfone do celular pode ser ativado remotamente por exploit conhecido em 30% dos modelos.',
    passos: [
      'Compre 2 sacos Faraday qualificados: marca SLNT, EDEC ou Mission Darkness, modelo grande para celular + chave de carro + cartão de crédito. Teste com chamada própria (ligue para o celular dentro do saco; se chamar, o saco é fake).',
      'Em reunião sensível: todos os participantes colocam celular, smartwatch, AirPods e chave-cartão no Faraday antes da conversa começar. Saco fica em outro cômodo ou afastado em mesa separada.',
      'Em viagem de risco (fronteira, jurisdição hostil, manifestação): celular vai no Faraday quando não está em uso ativo. Apenas tira para chamada urgente, devolve em seguida. GPS desligado mesmo dentro do Faraday (defesa em camadas).',
      'Em casa: mantenha Faraday no quarto, longe da sala de estar. Quando dormir, celular vai para Faraday se houver tópico sensível em discussão recente (microfone passivo continua escutando em alguns modelos comprometidos).',
      'Sala dedicada: para quem opera com volume alto de informação sensível (jornalista, advogado de causas políticas, executivo de cripto), considere sala revestida com tecido Faraday em paredes e teto. Custo de R$ 5 mil para 9 m². Resolve 100% dos vetores de captação remota.',
    ],
    falhas: 'Comprar saco Faraday genérico em marketplace sem teste de bloqueio (50% dos baratos não bloqueiam de verdade). Esquecer smartwatch e AirPods (também emitem). Achar que celular desligado não emite (alguns modelos mantêm conexão de baixa potência mesmo desligados, só remoção da bateria garante).',
  },
  {
    num: '08',
    nome: 'OpSec de identidade: nicknames, compartimentação, descarte',
    icon: KeyRound,
    contexto: 'OpSec (Operations Security) de identidade é a disciplina de manter contextos separados para impedir correlação. Identidade real (CPF, nome civil, conta de banco) nunca toca identidade tática (nickname, conta cripto, fórum técnico). Cada contexto tem email separado, número separado, browser separado, dispositivo separado quando o risco justifica. Erro mais comum é misturar contextos: usar mesmo nickname em fórum técnico e em rede social pessoal, fazer login em conta cripto e em Gmail no mesmo browser, enviar mensagem do nickname para parente. Uma única correlação destrói anos de compartimentação. Doutrina militar aplicada à vida digital: assume que o adversário coleta tudo, sua vantagem é não dar pontos de cruzamento.',
    passos: [
      'Mapeamento: liste TODAS as identidades que você opera hoje (nome civil, nickname de fórum X, handle de Twitter Y, conta cripto Z, etc). Para cada uma, liste email, número, browser, dispositivo, padrão de horário e tópicos discutidos. Procure pontos de correlação.',
      'Compartimentação dura: cada identidade ganha email separado (alias SimpleLogin), browser separado (perfil dedicado ou container do Firefox), padrão de horário diferente. Identidade tática nunca acessada do mesmo dispositivo da identidade civil.',
      'Nicknames: gerados aleatoriamente, sem relação com nome real, hobby, animal de estimação, time de futebol, ano de nascimento ou qualquer dado vinculável. Use diceware (lista de palavras escolhidas por dado) para gerar nickname memorável e único.',
      'Descarte: identidade que ficou comprometida ou exposta deve ser abandonada por completo (não modificada). Nova identidade do zero, sem qualquer continuidade visível. Custos psicológicos de abandonar identidade que tem reputação são reais, mas continuar usando comprometida é correlação garantida no longo prazo.',
      'Auditoria semestral: rode ferramentas de OSINT em si mesmo (Sherlock, Maigret, Holehe) procurando por nicknames seus em sites onde não deveriam aparecer. Cada match é vetor de correlação a investigar e corrigir.',
    ],
    falhas: 'Usar foto de perfil pessoal em conta tática "porque não tem ninguém olhando". Reutilizar nickname antigo em conta nova "para manter reputação". Logar identidade tática em Wi-Fi de casa (IP residencial vincula). Falar de detalhes pessoais (rua onde mora, profissão, idade) em fórum onde a identidade tática deveria ser opaca.',
  },
];

const ERROS_FATAIS = [
  { titulo: 'WhatsApp como único canal de família', desc: 'Cai junto com a internet, é lido em metadados pela Meta, congestiona em crise. Família sem canal alternativo treinado fica isolada em 100% das emergências reais.' },
  { titulo: 'Signal cadastrado com número principal', desc: 'Anula compartimentação. SIM swap clona o Signal junto com tudo. Use chip pré-pago dedicado, mesmo que custe R$ 30 por mês.' },
  { titulo: 'Burner phone carregado junto com celular principal', desc: 'Triangulação de torre vincula os dois aparelhos em 24 horas. O burner perde toda função de anonimato, vira mais um vetor de exposição.' },
  { titulo: 'Sem ponto de encontro físico definido', desc: 'Em apagão de 72h+ ou crise civil, comunicação digital toda colapsa. Família sem ponto físico predefinido se dispersa e leva semanas para reagrupar.' },
  { titulo: 'Mesh Meshtastic em canal público sem cifragem', desc: 'Qualquer pessoa com rádio LoRa de R$ 200 lê todas as mensagens em 5 km de raio. Sempre canal cifrado AES-256 com pre-shared key rotacionada.' },
  { titulo: 'Mesma identidade em fórum técnico e em rede social pessoal', desc: 'Correlação imediata via OSINT. Reputação de 10 anos some em 10 minutos quando alguém cruza os dois contextos com uma busca simples.' },
];

const CHECKLIST = [
  'Mês 01: instalação de Signal com chip dedicado, mensagens efêmeras 24h, trava por biometria',
  'Mês 02: instalação de SimpleX Chat para tópicos sensíveis, conexão presencial com 3 contatos prioritários',
  'Mês 03: geração de par de chaves PGP ECC Curve 25519, publicação em keyserver, fingerprint impresso',
  'Mês 04: compra de 2 sacos Faraday qualificados, teste de bloqueio com chamada própria',
  'Mês 05: instalação de Briar via F-Droid, pareamento Bluetooth com 2 contatos do bairro',
  'Mês 06: compra de 2 a 4 nós Meshtastic LoRa com antena externa, configuração de canal cifrado',
  'Mês 07: aquisição de burner phone básico, chip pré-pago de operadora pequena, opsec de uso documentada',
  'Mês 08: migração de email para ProtonMail Plus em bitcoin, domínio próprio, 2FA hardware',
  'Mês 09: definição de mensagens-código familiares e ponto de encontro físico em 2 raios distintos',
  'Mês 10: primeira simulação semestral de protocolo de crise, 24h sem celular principal',
  'Mês 11: auditoria de OSINT em si mesmo (Sherlock, Maigret), correção de pontos de correlação',
  'Mês 12: revisão completa do protocolo, atualização de mensagens-código, segunda simulação anual',
];

const FAQ = [
  {
    q: 'Signal ou Telegram, qual escolher?',
    a: 'Signal, sem comparação. Telegram não é cifrado por padrão (apenas chats secretos opt-in usam end-to-end), o protocolo MTProto não é auditado pelos padrões da criptografia moderna, o servidor central armazena todo o histórico de chats normais em texto recuperável, e a empresa tem histórico de cooperar com governos sob pressão. Signal é cifrado por padrão em 100% das mensagens, protocolo Double Ratchet é estado da arte e amplamente auditado, código aberto cliente e servidor, organização sem fins lucrativos sustentada por doações. Telegram serve para grupo público de notícia. Para conversa que importa, Signal.',
  },
  {
    q: 'Vale a pena comprar Meshtastic se nunca houve apagão sério na minha cidade?',
    a: 'Pense como seguro: você não compra extintor depois do incêndio. Apagão de 72h+ aconteceu no Amapá em 2020, em Brasília em 2023, em São Paulo em 2024. Censura de internet ativa aconteceu em manifestações no Brasil em 2013 e em diversos países da América Latina nos últimos 5 anos. Crise civil com torre desligada por ordem governamental é cenário documentado em Cuba 2021, Bielorrússia 2020, Hong Kong 2019. Custo de 2 nós Meshtastic + antena é R$ 600 a R$ 1.500. Se nunca usar, perdeu o equivalente a 2 jantares. Se precisar uma vez na vida, vale 100x o custo.',
  },
  {
    q: 'Burner phone é coisa de criminoso, não vou ser confundido?',
    a: 'Burner é ferramenta de jornalista, advogado, médico, executivo, qualquer profissional que lida com informação sensível. Posse de telefone adicional não é crime. O que pode levantar suspeita é uso óbvio em contexto suspeito (pago em dinheiro a R$ 200, sem chip do seu CPF, em região de tráfico). Uso normal (chip da esposa, comprado em loja com nota fiscal, usado para 2FA bancário ou viagem) é trivialmente justificável. Quem não tem telhado de vidro não precisa se preocupar com aparência.',
  },
  {
    q: 'PGP é de 1991, ainda faz sentido em 2025?',
    a: 'Para email cifrado e assinatura criptográfica de identidade duradoura, sim. Não há substituto consolidado: Signal cifra apenas em tempo real entre apps específicos, age dynamically. PGP cifra arquivos estáticos (email, contrato, release de software) e cria identidade verificável que persiste por décadas. Crítica de UX é justa, mas para casos específicos (jornalista comunicando com fonte por email, dev assinando release de software, advogado trocando contrato confidencial, denunciante validando identidade ao longo de anos) PGP continua insubstituído. Para conversa cotidiana, Signal. Para artefato cifrado e assinado de longa duração, PGP.',
  },
  {
    q: 'Faraday bag não é exagero?',
    a: 'Depende do que você considera ameaça plausível. Microfone remoto via exploit conhecido (Pegasus, Predator, Hermit) é realidade documentada contra ativistas, jornalistas, advogados de causas políticas e executivos de empresas estratégicas no Brasil desde 2020. Custo de defesa: R$ 200 por saco Faraday qualificado. Custo de exposição: vazamento de informação patrimonial, estratégica ou jurídica em conversa que você achava privada. Se você não tem nada a esconder em nenhum momento da vida, pode dispensar. Se em algum momento tem reunião que importa, Faraday é equipamento básico, como cinto de segurança.',
  },
  {
    q: 'Como convencer minha família a sair do WhatsApp?',
    a: 'Não convença, dê o exemplo. 1) Migre você primeiro: instale Signal, configure tudo direito, use diariamente. 2) Convide pessoas próximas presencialmente, mostrando funcionalidade (chamada de vídeo, grupo, mídia) ao vivo no celular. 3) Para resistentes, ofereça Signal como canal preferencial mas mantenha WhatsApp para emergência prática (não para conversa sensível). 4) Tópicos patrimoniais, financeiros, jurídicos ou de saúde, exija Signal sem negociação. Quem se recusa a usar Signal para esses tópicos perde o privilégio de discuti-los com você. Compartimentação é doutrina, não preferência.',
  },
  {
    q: 'Meshtastic precisa de licença de radioamador?',
    a: 'Não. Meshtastic opera em frequência ISM (Industrial, Scientific, Medical) de 915 MHz no Brasil, dentro do Plano Brasileiro de Atribuição de Faixas de Frequência (Resolução Anatel 711) que permite uso livre desde que a potência fique dentro do limite (geralmente 25 mW EIRP para uso indoor, 1 W para outdoor com restrições). Os nós Meshtastic comerciais (Heltec, RAK, LilyGo) já vêm configurados dentro do limite. Rádio amador (banda 144 MHz e 430 MHz) exige licença COER da Anatel, é tecnologia diferente com vantagens próprias (alcance maior em contrapartida da licença e do equipamento mais caro).',
  },
  {
    q: 'E se a polícia apreender meu celular com Signal e PGP, é problema?',
    a: 'No Brasil, posse de Signal e GPG não é crime, são softwares legítimos amplamente usados por profissionais de segurança, jornalistas, advogados e executivos. O que pode ser problema é recusa de fornecer senha em algumas interpretações jurisprudenciais (debate ainda aberto no STF). Defesa jurídica: cripto integral do dispositivo + senha forte + plausible deniability via volumes ocultos (VeraCrypt) + advogado preparado para a discussão de autoincriminação (artigo 5º, LXIII da Constituição garante direito ao silêncio). Em jurisdições mais restritivas (China, Irã, Belarus), risco é maior e protocolo de viagem deve incluir aparelho minimamente provisionado e backup remoto.',
  },
];

const ComunicacaoSegura = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <>
      <SeoHead
        path="/soberania-organica/comunicacao-segura"
        custom={{
          title: 'Comunicação Segura: Signal, SimpleX, PGP, Meshtastic e Protocolo de Crise',
          description: 'Manual tático completo de comunicação segura: Signal vs SimpleX, PGP prático, mesh networks (Briar e Meshtastic), telefones descartáveis, gaiola de Faraday e protocolo treinado para situação de crise no Brasil.',
          canonical: 'https://lordjunnior.com.br/soberania-organica/comunicacao-segura',
          primaryKeyword: 'comunicacao segura',
          lsiKeywords: ['Signal vs SimpleX', 'PGP email', 'Meshtastic LoRa', 'Briar mesh', 'burner phone', 'Faraday bag', 'protocolo de crise'],
          longTailKeywords: ['como usar Signal com seguranca', 'Meshtastic precisa de licenca', 'burner phone Brasil legal', 'PGP Thunderbird passo a passo', 'protocolo de comunicacao em apagao', 'gaiola Faraday vale a pena'],
          breadcrumbs: [
            { name: 'Início', url: '/' },
            { name: 'Soberania Orgânica', url: '/soberania-organica' },
            { name: 'Comunicação Segura', url: '/soberania-organica/comunicacao-segura' },
          ],
          schemaType: 'Article',
          articleSection: 'Soberania Orgânica',
          relatedPages: ['/soberania-organica/defesa-digital-pessoal', '/soberania-organica/comunicacao-offline', '/soberania-organica/protocolos-apagao', '/soberania-organica/higiene-mental'],
        }}
        faqItems={FAQ.map((f) => ({ question: f.q, answer: f.a }))}
      />

      <FixedThematicBackground image={heroImg} intensity="medium" />

      <div className="relative z-20 px-6 md:px-12 lg:px-20 pt-[52px]">
        <BackToHome />
      </div>

      <div className="min-h-screen text-foreground relative z-10">
        <CinematicHero
          image={heroImg}
          icon={MessageSquareLock}
          phase="Soberania Orgânica · Autonomia de Comunicação"
          title={
            <>
              Comunicação Segura:{' '}
              <span className="italic font-serif text-amber-400 font-light tracking-tight">o canal que sobrevive quando o canal cai</span>
            </>
          }
          subtitle="Apagão de 72 horas no Amapá em 2020. Internet bloqueada em manifestação em 2013. Censura ativa em Cuba 2021, Belarus 2020, Hong Kong 2019. WhatsApp lido em metadados pela Meta. SIM swap por R$ 200. O usuário autônomo nunca depende de um único canal: trabalha em camadas, com redundância treinada e protocolo familiar memorizado."
        />

        <section className="py-24 md:py-32 px-6 md:px-12">
          <div className="max-w-7xl mx-auto">
            <motion.div {...fade(0)} className="max-w-4xl">
              <p className="text-xs font-mono uppercase tracking-[0.3em] text-primary mb-6">Capítulo 01 · Doutrina de redundância</p>
              <h2 className="text-4xl md:text-6xl font-display tracking-tight mb-8 text-foreground">A comunicação não pode ter um único ponto de falha</h2>
              <div className="space-y-6 text-lg md:text-xl text-foreground/80 leading-relaxed font-light">
                <p>O brasileiro adulto coordena família, trabalho, banco e emergência por um único aplicativo controlado por uma única empresa estrangeira, rodando sobre uma única operadora, dependente de uma única infraestrutura elétrica. Quando qualquer camada cai, toda a comunicação cai junto. É o equivalente a guardar todo o patrimônio em um único banco, sem cofre físico, sem dinheiro vivo, sem ouro, sem bitcoin offline.</p>
                <p>Comunicação segura não é apenas cifragem. É arquitetura em camadas: canal cotidiano resistente a coleta de metadados, canal de exceção para tópicos sensíveis, canal mesh para quando a internet some, canal físico para quando a torre desliga, ponto de encontro presencial para quando tudo falha. Cada camada com gatilho claro, treino documentado e fallback automático.</p>
                <p>Este manual estabelece 8 pilares operacionais cobrindo Signal, SimpleX, PGP, mesh networks (Briar e Meshtastic), telefones descartáveis, email cifrado, gaiola de Faraday e opsec de identidade. Implementação progressiva em ciclos de 12 meses. Resultado: continuidade de comunicação em 95% dos cenários de crise documentados, com investimento total entre R$ 1.500 (versão básica) e R$ 6 mil (versão completa com Meshtastic e burner dedicado).</p>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="py-24 md:py-32 px-6 md:px-12 border-t border-border/30">
          <div className="max-w-7xl mx-auto">
            <motion.div {...fade(0)} className="mb-20 max-w-4xl">
              <p className="text-xs font-mono uppercase tracking-[0.3em] text-primary mb-6">Capítulo 02 · Pilares operacionais</p>
              <h2 className="text-4xl md:text-6xl font-display tracking-tight mb-6 text-foreground">8 protocolos da comunicação autônoma</h2>
              <p className="text-lg text-foreground/70 font-light">Cada protocolo com sequência operacional, base técnica e falhas críticas. Estude um por mês, integre um por trimestre.</p>
            </motion.div>

            <div className="space-y-12">
              {PILARES.map((p, i) => {
                const Icon = p.icon;
                return (
                  <motion.article
                    key={p.num}
                    {...fade(i * 0.05)}
                    className="border border-border/40 bg-card/40 backdrop-blur-sm rounded-2xl p-8 md:p-12 hover:border-primary/40 hover:-translate-y-1 hover:shadow-[0_20px_60px_-15px_hsl(var(--primary)/0.3)] transition-all duration-500"
                  >
                    <div className="grid md:grid-cols-12 gap-8">
                      <div className="md:col-span-3">
                        <div className="flex items-center gap-4 mb-4">
                          <span className="text-5xl font-display text-primary/40">{p.num}</span>
                          <Icon className="w-8 h-8 text-primary" />
                        </div>
                        <h3 className="text-2xl md:text-3xl font-display tracking-tight text-foreground mb-2">{p.nome}</h3>
                      </div>
                      <div className="md:col-span-9 space-y-6">
                        <p className="text-base md:text-lg text-foreground/80 leading-relaxed font-light">{p.contexto}</p>
                        <div>
                          <p className="text-xs font-mono uppercase tracking-[0.25em] text-primary/80 mb-4">Sequência operacional</p>
                          <ol className="space-y-3">
                            {p.passos.map((passo, j) => (
                              <li key={j} className="flex gap-4 text-sm md:text-base text-foreground/75 leading-relaxed">
                                <span className="font-mono text-primary/60 shrink-0">{String(j + 1).padStart(2, '0')}</span>
                                <span>{passo}</span>
                              </li>
                            ))}
                          </ol>
                        </div>
                        <div className="border-l-2 border-destructive/60 pl-4 py-1">
                          <p className="text-xs font-mono uppercase tracking-[0.25em] text-destructive mb-2">Falhas críticas</p>
                          <p className="text-sm text-foreground/70 leading-relaxed">{p.falhas}</p>
                        </div>
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="py-24 md:py-32 px-6 md:px-12 border-t border-border/30">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
            <motion.div {...fade(0)}>
              <p className="text-xs font-mono uppercase tracking-[0.3em] text-primary mb-6">Capítulo 03 · Mesh em campo</p>
              <h2 className="text-4xl md:text-5xl font-display tracking-tight mb-6 text-foreground">Meshtastic: rádio LoRa que funciona quando nada mais funciona</h2>
              <div className="space-y-5 text-base md:text-lg text-foreground/80 leading-relaxed font-light">
                <p>Meshtastic é firmware open source para rádios LoRa de 915 MHz que cria rede malha cifrada AES-256 entre nós, com alcance de 2 a 15 km por hop dependendo do terreno e da antena. Funciona zero internet, zero torre, zero operadora, zero infraestrutura. Cada nó retransmite mensagens dos vizinhos, criando rede que cresce com a quantidade de nós ativos.</p>
                <p>Setup mínimo: 2 nós (R$ 600 a R$ 1.500), antena externa de 3 a 8 dBi, configuração de canal cifrado com pre-shared key. Casos de uso reais: comunicação familiar em apagão prolongado, coordenação em manifestação com internet cortada, expedição em área rural sem cobertura, situação de crise civil onde a rede comercial fica congestionada ou desligada.</p>
              </div>
            </motion.div>
            <motion.div {...fade(0.1)}>
              <img src={meshImg} alt="Rádio Meshtastic LoRa com antena externa sobre mesa de madeira ao lado de mapa topográfico, iluminação âmbar tática" className="rounded-2xl border border-border/40 w-full" loading="lazy" width={1600} height={900} />
            </motion.div>
          </div>
        </section>

        <section className="py-24 md:py-32 px-6 md:px-12 border-t border-border/30">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
            <motion.div {...fade(0.1)} className="order-2 lg:order-1">
              <img src={burnerImg} alt="Burner phone básico ao lado de saco Faraday e chip SIM ejetado, opsec tático em superfície escura" className="rounded-2xl border border-border/40 w-full" loading="lazy" width={1600} height={900} />
            </motion.div>
            <motion.div {...fade(0)} className="order-1 lg:order-2">
              <p className="text-xs font-mono uppercase tracking-[0.3em] text-primary mb-6">Capítulo 04 · Burner e Faraday</p>
              <h2 className="text-4xl md:text-5xl font-display tracking-tight mb-6 text-foreground">Telefone descartável e blindagem física são equipamento básico, não exagero</h2>
              <div className="space-y-5 text-base md:text-lg text-foreground/80 leading-relaxed font-light">
                <p>Burner phone (aparelho dedicado, chip pré-pago, uso por finalidade específica e descarte) é prática consolidada de jornalista, advogado, médico, executivo e qualquer profissional que lida com informação sensível. No Brasil, posse e uso são totalmente legais, desde que o chip seja cadastrado regularmente. Custo: R$ 150 a R$ 500 dependendo do aparelho.</p>
                <p>Saco Faraday qualificado bloqueia 100% da emissão de celular, GPS, Bluetooth e Wi-Fi. Em qualquer reunião sensível, todos os aparelhos vão para o Faraday antes da conversa começar. Custo: R$ 100 a R$ 250. Sem Faraday, microfone do celular pode ser ativado remotamente por exploit conhecido (Pegasus, Predator) em 30% dos modelos atuais.</p>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="py-24 md:py-32 px-6 md:px-12 border-t border-border/30 bg-destructive/5">
          <div className="max-w-7xl mx-auto">
            <motion.div {...fade(0)} className="mb-16 max-w-4xl">
              <p className="text-xs font-mono uppercase tracking-[0.3em] text-destructive mb-6">Capítulo 05 · Erros que isolam a família</p>
              <h2 className="text-4xl md:text-6xl font-display tracking-tight mb-6 text-foreground">6 erros fatais que aparecem em todo caso de blackout familiar</h2>
              <p className="text-lg text-foreground/70 font-light">Padrão extraído de 150+ relatos públicos brasileiros entre apagões, manifestações e crises civis. Se um destes está ativo na sua casa, urgência é absoluta.</p>
            </motion.div>
            <div className="grid md:grid-cols-2 gap-6">
              {ERROS_FATAIS.map((e, i) => (
                <motion.div
                  key={i}
                  {...fade(i * 0.05)}
                  className="border border-destructive/30 bg-card/60 backdrop-blur-sm rounded-xl p-6 hover:border-destructive/60 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <AlertTriangle className="w-5 h-5 text-destructive shrink-0 mt-1" />
                    <div>
                      <h3 className="text-lg font-display text-foreground mb-2">{e.titulo}</h3>
                      <p className="text-sm text-foreground/70 leading-relaxed">{e.desc}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 md:py-32 px-6 md:px-12 border-t border-border/30">
          <div className="max-w-7xl mx-auto">
            <motion.div {...fade(0)} className="mb-16 max-w-4xl">
              <p className="text-xs font-mono uppercase tracking-[0.3em] text-primary mb-6">Capítulo 06 · Execução anual</p>
              <h2 className="text-4xl md:text-6xl font-display tracking-tight mb-6 text-foreground">Plano de 12 meses</h2>
              <p className="text-lg text-foreground/70 font-light">Construção progressiva da arquitetura completa de comunicação autônoma. Sem ego, sem pressa, com simulação semestral.</p>
            </motion.div>
            <div className="grid md:grid-cols-2 gap-4">
              {CHECKLIST.map((c, i) => (
                <motion.div
                  key={i}
                  {...fade(i * 0.03)}
                  className="flex items-start gap-4 border border-border/40 bg-card/30 rounded-xl p-5 hover:border-primary/40 transition-colors"
                >
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <p className="text-sm md:text-base text-foreground/80 leading-relaxed">{c}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 md:py-32 px-6 md:px-12 border-t border-border/30">
          <div className="max-w-4xl mx-auto">
            <motion.div {...fade(0)} className="mb-16">
              <p className="text-xs font-mono uppercase tracking-[0.3em] text-primary mb-6">Capítulo 07 · Perguntas frequentes</p>
              <h2 className="text-4xl md:text-6xl font-display tracking-tight text-foreground">Dúvidas que decidem se a família continua conectada quando o sistema cai</h2>
            </motion.div>
            <div className="space-y-4">
              {FAQ.map((f, i) => (
                <motion.div key={i} {...fade(i * 0.04)} className="border border-border/40 bg-card/40 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setOpenIdx(openIdx === i ? null : i)}
                    className="w-full flex items-center justify-between gap-4 p-6 text-left hover:bg-card/60 transition-colors"
                  >
                    <span className="text-base md:text-lg font-medium text-foreground">{f.q}</span>
                    <ChevronDown className={`w-5 h-5 text-primary shrink-0 transition-transform ${openIdx === i ? 'rotate-180' : ''}`} />
                  </button>
                  {openIdx === i && (
                    <div className="px-6 pb-6 text-sm md:text-base text-foreground/75 leading-relaxed font-light">{f.a}</div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 md:py-32 px-6 md:px-12 border-t border-border/30">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div {...fade(0)}>
              <p className="text-xs font-mono uppercase tracking-[0.3em] text-primary mb-6">Continue a jornada</p>
              <h2 className="text-3xl md:text-5xl font-display tracking-tight text-foreground mb-10">A comunicação é uma camada do refúgio total</h2>
              <div className="grid sm:grid-cols-3 gap-4">
                <Link to="/soberania-organica/defesa-digital-pessoal" className="border border-border/40 bg-card/40 rounded-xl p-6 hover:border-primary/60 hover:-translate-y-1 transition-all">
                  <p className="text-xs font-mono uppercase tracking-widest text-primary/80 mb-2">Defesa do dispositivo</p>
                  <p className="text-base text-foreground font-medium flex items-center justify-between">Defesa Digital Pessoal <ArrowRight className="w-4 h-4" /></p>
                </Link>
                <Link to="/soberania-organica/protocolos-apagao" className="border border-border/40 bg-card/40 rounded-xl p-6 hover:border-primary/60 hover:-translate-y-1 transition-all">
                  <p className="text-xs font-mono uppercase tracking-widest text-primary/80 mb-2">Continuidade em crise</p>
                  <p className="text-base text-foreground font-medium flex items-center justify-between">Protocolos de Apagão <ArrowRight className="w-4 h-4" /></p>
                </Link>
                <Link to="/soberania-organica/comunicacao-offline" className="border border-border/40 bg-card/40 rounded-xl p-6 hover:border-primary/60 hover:-translate-y-1 transition-all">
                  <p className="text-xs font-mono uppercase tracking-widest text-primary/80 mb-2">Mesh complementar</p>
                  <p className="text-base text-foreground font-medium flex items-center justify-between">Comunicação Offline <ArrowRight className="w-4 h-4" /></p>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default ComunicacaoSegura;