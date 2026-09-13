import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { KeyRound } from 'lucide-react';
import { Fingerprint } from 'lucide-react';
import { ShieldCheck } from 'lucide-react';
import { Lock } from 'lucide-react';
import { Globe } from 'lucide-react';
import { Mail } from 'lucide-react';
import { Smartphone } from 'lucide-react';
import { HardDrive } from 'lucide-react';
import { ChevronDown } from 'lucide-react';
import { ArrowRight } from 'lucide-react';
import { AlertTriangle } from 'lucide-react';
import { CheckCircle2 } from 'lucide-react';
import SeoHead from '@/components/SeoHead';
import BackToHome from '@/components/BackToHome';
import FixedThematicBackground from '@/components/backgrounds/FixedThematicBackground';
import CinematicHero from '@/components/CinematicHero';
import heroImg from '@/assets/saida/defesa-digital-hero.jpg';
import img2fa from '@/assets/saida/defesa-digital-2fa.jpg';
import imgCripto from '@/assets/saida/defesa-digital-criptografia.jpg';

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
    nome: 'Senhas robustas com gestor offline',
    icon: KeyRound,
    contexto: 'Senha forte não é frase difícil de digitar. É string aleatória de 20+ caracteres, única por serviço, gerada e guardada por gestor criptografado AES-256 com cofre local. Reuso de senha é o vetor número um de invasão de conta no Brasil: vazamento em fórum random vira invasão de banco em 48 horas via credential stuffing automatizado. Bitwarden self-hosted, KeePassXC e 1Password (este último custodial, mas auditado) são as referências práticas. NUNCA salvar senhas no Chrome, Firefox ou iCloud sem cifragem adicional.',
    passos: [
      'Instale KeePassXC (gratuito, open source, offline) ou Bitwarden self-hosted em VPS própria. Cofre fica em arquivo .kdbx criptografado com senha-mestra de 6 palavras BIP39 + 4 dígitos numéricos.',
      'Gere senha aleatória de 24 caracteres (letras maiúsculas, minúsculas, números, símbolos) para cada serviço. Use a função geradora do próprio gestor, nunca invente.',
      'Backup do .kdbx em 3 locais físicos: pendrive criptografado em casa, segundo pendrive em cofre offsite, terceira cópia impressa em QR code laminado para reconstrução manual.',
      'Senha-mestra MEMORIZADA, nunca anotada em texto plano. Treine digitação cega 5x por dia durante 2 semanas até virar muscle memory.',
      'Auditoria trimestral: roda HaveIBeenPwned no email principal, troca senhas de qualquer serviço com vazamento documentado, revoga sessões antigas em todos os serviços críticos.',
    ],
    falhas: 'Salvar senha-mestra no celular para "não esquecer". Usar a mesma senha-mestra do gestor em outro serviço. Sincronizar .kdbx em Google Drive sem cifragem adicional. Anotar senha-mestra em papel guardado na carteira ou gaveta da mesa.',
  },
  {
    num: '02',
    nome: '2FA por hardware, nunca por SMS',
    icon: Fingerprint,
    contexto: 'SMS é o pior segundo fator existente: SIM swap (clonagem de chip) é trivial no Brasil, custa entre R$ 200 e R$ 2 mil em fórum criminoso, leva 4 a 12 horas. Hardware key (YubiKey 5, Nitrokey, OnlyKey) usa protocolo FIDO2/WebAuthn, é resistente a phishing por design (a chave verifica o domínio antes de assinar) e custa R$ 350 a R$ 600 unidade. App TOTP (Aegis, Raivo, 2FAS) é segundo melhor: roda offline, gera código baseado em tempo, mas pode ser phishado. Nunca, sob nenhuma circunstância, deixar 2FA por SMS ou email ativado em conta financeira, exchange ou email principal.',
    passos: [
      'Compre 2 YubiKeys 5 (uma uso diário, uma backup em local seguro). Importe diretamente do site oficial yubico.com, nunca em marketplace genérico.',
      'Cadastre as DUAS chaves em todos os serviços críticos: Gmail/ProtonMail, GitHub, exchange, banco, gestor de senha. Backup é obrigatório, sem ele perder a chave principal vira lockout permanente.',
      'Para serviços que não suportam FIDO2, use app TOTP offline (Aegis no Android, Raivo no iOS). Backup criptografado dos seeds TOTP em pendrive offline.',
      'Desative SMS, email e perguntas de segurança como métodos de recuperação em todos os serviços. Se o serviço exigir SMS como fallback, use número virtual descartável (MySudo, Hushed) que você controla.',
      'Treine resposta a SIM swap: senha imediata de ligação para a operadora bloqueando troca de chip sem CPF presencial, monitoramento de inatividade súbita do número (sinal de chip clonado), procedimento documentado para recuperação de email em caso de comprometimento.',
    ],
    falhas: 'Cadastrar apenas uma YubiKey (perda = lockout permanente). Aceitar 2FA por SMS "porque é mais cômodo". Tirar foto do QR code do TOTP e guardar no celular. Compartilhar 2FA via WhatsApp.',
  },
  {
    num: '03',
    nome: 'VPN confiável e DNS criptografado',
    icon: Globe,
    contexto: 'Toda navegação sem VPN expõe IP, ISP, geolocalização e padrão de uso para provedor (Vivo, Claro, Tim) que vende dados para mercado de marketing e atende ordem judicial em 24 horas sem notificar usuário. VPN comercial confiável (Mullvad, IVPN, ProtonVPN) cifra tráfego, oculta IP real e bloqueia coleta passiva. Nunca use VPN gratuita: é monetização por venda de dados ou injeção de malware. DNS criptografado (DoH, DoT) impede que ISP veja quais sites você acessa mesmo com VPN ativa em alguns cenários. Combinação ideal: Mullvad VPN + Mullvad DNS + browser hardenizado.',
    passos: [
      'Mullvad é referência absoluta: pagamento em monero ou cash por correio, conta sem cadastro (apenas número de 16 dígitos), kill switch nativo, suporte a WireGuard, sem logs comprovados em auditoria. Custa 5 EUR/mês fixo.',
      'Configure kill switch obrigatório (bloqueia tráfego se VPN cair) e DNS leak protection. Teste em ipleak.net e dnsleaktest.com após instalação.',
      'Para tráfego doméstico inteiro: configure VPN no roteador (OpenWrt + WireGuard) ou use AdGuard Home + DNS-over-HTTPS apontando para Mullvad DNS (194.242.2.2).',
      'Multi-hop para tarefas sensíveis: VPN > Tor para máximo anonimato, ou VPN > segunda VPN diferente para distribuição de jurisdição. Performance cai, mas correlação de tráfego fica inviável.',
      'Ative VPN automaticamente em wifi público, cafés, aeroportos. Treine reflexo: se ver HotelGuest, AeroportoFree, ShoppingWifi, ativa VPN ANTES de qualquer ação. Sem VPN em rede pública é vazamento de credencial garantido.',
    ],
    falhas: 'Usar VPN gratuita (Hola, Betternet, Turbo VPN são malware comprovado). Confiar em VPN de marketing tipo NordVPN/ExpressVPN sem auditoria de logs independente. Esquecer kill switch e ter VPN caindo em background sem perceber. Usar VPN só "quando lembrar".',
  },
  {
    num: '04',
    nome: 'Criptografia integral de dispositivos',
    icon: Lock,
    contexto: 'Notebook roubado sem criptografia é livro aberto: ladrão remove o SSD, monta em outra máquina e lê tudo (senhas salvas, fotos, documentos, sessões web ativas, seed phrase do bitcoin se você foi descuidado). FileVault (macOS), BitLocker (Windows Pro/Enterprise) e LUKS (Linux) usam AES-256 e tornam o dispositivo inútil sem senha. Celular: criptografia ativada por padrão no Android 10+ e iOS 8+, mas exige PIN forte (mínimo 8 dígitos, idealmente alfanumérico). Pendrive: VeraCrypt para container portátil, ou pendrive com criptografia hardware (Kingston IronKey).',
    passos: [
      'Notebook: ative FileVault (Mac), BitLocker (Win Pro) ou LUKS na instalação (Linux). Senha de boot diferente da senha de login do usuário, mínimo 16 caracteres aleatórios.',
      'Celular: PIN alfanumérico mínimo 12 caracteres (não use só dígitos). Desative biometria em situação de risco (operação policial, fronteira, manifestação): polícia pode forçar dedo no sensor, não pode forçar senha numérica/alfa contra a 5ª Emenda equivalente.',
      'Pendrive: nunca grave seed phrase em pendrive comum. Use VeraCrypt para container .hc cifrado com senha de 20+ caracteres, ou hardware Kingston IronKey D300S com PIN de 8+ dígitos e auto-destruição após 10 tentativas.',
      'Backup criptografado: Restic ou Borg para backup incremental cifrado em servidor remoto (Hetzner Storage Box, rsync.net). Senha-chave do backup guardada offline em local diferente do dispositivo.',
      'Antes de viajar para fronteira sensível (EUA, China, Rússia, Israel), faça wipe completo do notebook e reinstale sistema mínimo limpo. Acessos críticos via cloud com 2FA hardware. Devolve dispositivo limpo ao retornar e restaura backup.',
    ],
    falhas: 'Achar que senha de login do Windows criptografa disco (não criptografa). Usar BitLocker no Windows Home (não suporta). Salvar senha de FileVault no iCloud Keychain. Esquecer que pendrive antigo na gaveta tem foto da seed phrase de 2017.',
  },
  {
    num: '05',
    nome: 'Navegação anônima e fingerprint mínimo',
    icon: Globe,
    contexto: 'Browser moderno é máquina de coleta: cookies, fingerprint de canvas, fontes instaladas, resolução de tela, plugins, timezone, language, behavior tracking. Google sabe quem você é mesmo sem você logar. Solução: separar contextos (browser para banco, browser para trabalho, browser para anonimato), hardenizar configuração e usar Tor Browser para tarefas críticas. Brave Browser com Shields agressivos, Firefox com user.js do arkenfox e Tor Browser cobrem 95% dos casos. Chrome é máquina de vigilância pura, deve ser banido de uso pessoal.',
    passos: [
      'Browser principal: Brave (chromium hardenizado, Shields ativos por padrão, suporte nativo a Tor) ou Firefox + user.js do projeto arkenfox (configuração endurecida). Bloqueie cookies de terceiros, desabilite WebRTC, force HTTPS-only.',
      'Browser para anonimato real: Tor Browser oficial (torproject.org). Use SOMENTE para tarefas anônimas, NUNCA logue em conta pessoal dentro do Tor (correlação destrói anonimato). Use bridges obfs4 se Tor for bloqueado pelo ISP.',
      'Containers de identidade: Firefox Multi-Account Containers separa cookies por contexto (banco em um container, redes sociais em outro, trabalho em terceiro). Mesmo browser, sessões isoladas, fingerprint dividido.',
      'Search engine: Kagi (paga, sem rastreamento, resultados independentes) ou SearXNG self-hosted. Banir Google e Bing como buscadores padrão. DuckDuckGo é aceitável mas tem comprometimentos documentados com Microsoft.',
      'Email: ProtonMail ou Tutanota (criptografia end-to-end, jurisdição amigável, pagamento em bitcoin). Email descartável (SimpleLogin, addy.io) para cadastros não-críticos. Banir Gmail e Outlook para qualquer comunicação que importe.',
    ],
    falhas: 'Logar no Gmail dentro do Tor Browser (correlação imediata, anonimato zero). Instalar 30 extensões no browser (cada extensão é vetor de fingerprint e potencial spyware). Achar que aba anônima do Chrome é privada (não é, só apaga histórico local). Usar mesmo browser para banco e para fórum random.',
  },
  {
    num: '06',
    nome: 'Antiphishing brasileiro: PIX, boleto, WhatsApp',
    icon: AlertTriangle,
    contexto: 'O brasileiro é alvo número um de phishing financeiro no mundo: SMS de "PIX devolvido", WhatsApp de falso parente "novo número", boleto adulterado com QR code falso, ligação de "central do banco" pedindo confirmação. Engenharia social brasileira é sofisticada: cibercrime usa nome real do parente (raspado de Facebook), valor crível (R$ 1.700, R$ 3.500, valores que fluem em PIX comum), urgência fabricada ("é pra pagar até as 18h ou cancela"). Defesa não é técnica: é protocolo mental treinado. Nenhum banco, exchange ou pessoa séria pede confirmação por SMS, WhatsApp ou ligação espontânea.',
    passos: [
      'Regra absoluta: NENHUM banco, exchange, Receita Federal ou empresa séria liga, manda SMS ou WhatsApp pedindo dado, código, senha ou confirmação. Se ligaram, é golpe. Sem exceção. Desligue, ligue de volta no número oficial impresso no cartão ou no site oficial.',
      'PIX: confira CHAVE COMPLETA antes de confirmar (não só nome). Banco do destinatário, agência, valor, beneficiário. Em PIX acima de R$ 200, ligue confirmando voz da pessoa antes de enviar. Configure limite diário e noturno baixo (R$ 500 noturno, R$ 5 mil diurno).',
      'WhatsApp: parente mandando "novo número" ou pedindo PIX urgente é golpe em 95% dos casos. SEMPRE ligue para o número antigo confirmando. Ative verificação em duas etapas no WhatsApp (PIN de 6 dígitos) para evitar clonagem de conta.',
      'Boleto: confira sempre os 3 primeiros dígitos (banco emissor) e o valor. Use sempre app oficial do banco para escanear, NUNCA câmera nativa do celular. Boleto acima de R$ 5 mil, ligue para o emissor confirmando dados antes de pagar.',
      'Treine família inteira (pais, avós, filhos) com simulação trimestral. Mande um SMS falso simulado, observe quem cai, treine de novo. 70% dos golpes de PIX no Brasil acontecem com idosos e adolescentes da família.',
    ],
    falhas: 'Confiar em link recebido por SMS ou WhatsApp "do banco". Aceitar PIX urgente sem ligar confirmando voz. Compartilhar código de ativação do WhatsApp ("é pra confirmar sua conta"). Pagar boleto sem conferir banco emissor.',
  },
  {
    num: '07',
    nome: 'Email tático com aliasing e descarte',
    icon: Mail,
    contexto: 'Email principal é a chave-mestra de toda identidade digital: reset de senha, 2FA fallback, recuperação de conta. Comprometer o email é comprometer tudo. Estratégia tática: email principal isolado (ProtonMail, Tutanota) usado APENAS para serviços críticos (banco, exchange, governo), nunca compartilhado publicamente. Email de descarte (SimpleLogin, addy.io) para cadastros não-críticos, com aliasing único por serviço. Se um alias vazar, descarte e crie novo, sem afetar identidade real.',
    passos: [
      'Crie 3 contas de email distintas: 1) Crítica (ProtonMail), usada apenas para banco, exchange, governo, e nunca aparece em formulário público. 2) Profissional (ProtonMail ou Fastmail), usada para trabalho. 3) Pública/marketing (SimpleLogin com aliasing infinito), usada para qualquer cadastro descartável.',
      'Para a conta crítica: domínio próprio (custom@seudominio.com) hospedado em ProtonMail Business com 2FA hardware obrigatório. Senha de 24 caracteres aleatórios, salva apenas no gestor offline.',
      'Aliasing: cada serviço recebe alias único (netflix-2024@yourdomain, amazon-2024@yourdomain). Se receber spam ou phishing em um alias, você sabe exatamente qual serviço vazou e descarta o alias sem impactar outros.',
      'Auditoria mensal: rode HaveIBeenPwned em todos os 3 emails. Qualquer vazamento documentado, troque senha do serviço comprometido em 24h e revogue sessões.',
      'Sucessão digital: documento criptografado com instruções de acesso aos emails críticos para herdeiro de confiança, guardado em cofre físico ou advogado. Sem isso, morte súbita = perda total de patrimônio digital.',
    ],
    falhas: 'Usar mesmo email para cadastrar Netflix e logar no banco. Manter conta antiga do Gmail de 2008 ativa com 500 serviços ainda apontando pra ela. Não revogar sessões antigas em todos os serviços ao trocar senha.',
  },
  {
    num: '08',
    nome: 'Smartphone hardenizado e compartimentado',
    icon: Smartphone,
    contexto: 'Celular moderno é o dispositivo mais comprometido da vida digital: 200+ apps, cada um pedindo permissão de localização, microfone, contatos, fotos. Google e Apple coletam tudo, mesmo com configuração restrita. Solução em camadas: GrapheneOS (Android desgooglado) em Pixel para máximo controle, ou iOS com configuração paranoica e separação de contextos via perfis. Compartimentação: celular pessoal NUNCA é o mesmo do celular de trabalho. Celular para PIX/banco NUNCA é o mesmo do celular para redes sociais e games.',
    passos: [
      'Tier máximo: Google Pixel 8 ou superior com GrapheneOS instalado (sistema desgooglado, sandbox restrito, anti-exploit avançado). Sem Google Play Services, sem coleta passiva. Use Aurora Store para baixar apps via proxy.',
      'Tier intermediário: iPhone com Lockdown Mode ativado, App Privacy Report monitorado semanalmente, Siri desabilitada, fotos sem geotag, microfone bloqueado para todos os apps exceto chamadas.',
      'Compartimentação dura: celular de PIX/banco/exchange separado do celular de uso geral. Linha telefônica do celular crítico nunca compartilhada publicamente, usada APENAS para 2FA bancário. Dois aparelhos, duas linhas, dois mundos.',
      'Apps de comunicação: Signal (mensagens, chamadas), SimpleX Chat (anonimato máximo, sem identificador), Briar (mesh local sem internet). Banir WhatsApp para conversas sensíveis (Meta lê metadados completos).',
      'Antes de manifestação, fronteira ou operação policial: backup criptografado completo, wipe do aparelho, sistema mínimo limpo. Restaure backup após o evento. NUNCA leve celular principal para situação de risco direto.',
    ],
    falhas: 'Instalar app pirata fora da loja oficial (vetor de spyware). Usar celular do trabalho fornecido pela empresa para PIX pessoal (MDM corporativo lê tudo). Compartilhar wifi do celular crítico com visitantes. Aceitar todas as permissões na primeira tela do app sem ler.',
  },
];

const ERROS_FATAIS = [
  { titulo: 'Senha "forte" decorada usada em vários serviços', desc: 'Reuso é o vetor número 1 de invasão de conta. Vazamento em fórum random = invasão de banco em 48h via credential stuffing automatizado.' },
  { titulo: '2FA por SMS ativo em conta financeira', desc: 'SIM swap custa R$ 200 a R$ 2 mil em fórum criminoso e leva 4 a 12 horas. SMS é o pior segundo fator existente, abaixo de email.' },
  { titulo: 'Backup do gestor de senha em Google Drive sem cifragem extra', desc: 'Google é alvo permanente. Backup do .kdbx no Drive sem segunda camada cifrada é seed phrase pública para quem invadir sua conta Google.' },
  { titulo: 'WhatsApp sem PIN de duas etapas', desc: 'Conta clonada em 30 minutos via SIM swap. Cibercrime começa a pedir PIX para todos os contatos, parentes caem em 70% dos casos.' },
  { titulo: 'Celular de trabalho usado para PIX pessoal', desc: 'MDM corporativo (Mobile Device Management) lê tudo: mensagens, GPS, apps instalados. Empresa demitir e wipear remoto = perda total de dados pessoais.' },
  { titulo: 'Tor Browser usado para logar no Gmail', desc: 'Correlação destruída em primeiro login. O ato de logar amarra a identidade real à atividade Tor, anonimato vai a zero permanentemente.' },
];

const CHECKLIST = [
  'Mês 01: instalação de KeePassXC ou Bitwarden self-hosted, troca de 5 senhas críticas para 24 caracteres aleatórios',
  'Mês 02: compra de 2 YubiKeys 5, cadastro em Gmail/ProtonMail, exchange e gestor de senha',
  'Mês 03: assinatura Mullvad VPN, configuração de kill switch e DNS leak test',
  'Mês 04: ativação de FileVault/BitLocker/LUKS no notebook, troca de senha de boot para 16+ caracteres',
  'Mês 05: migração de email principal para ProtonMail com domínio próprio e 2FA hardware',
  'Mês 06: instalação de Brave ou Firefox + arkenfox, banimento total de Chrome em uso pessoal',
  'Mês 07: PIN alfanumérico no celular (12+ caracteres), desativação de biometria em contextos de risco',
  'Mês 08: aliasing de email com SimpleLogin, troca de cadastros públicos para aliases',
  'Mês 09: treinamento de família inteira com simulação trimestral de phishing PIX',
  'Mês 10: configuração de backup criptografado com Restic ou Borg para servidor remoto',
  'Mês 11: hardenização do roteador doméstico, OpenWrt + Mullvad WireGuard como gateway padrão',
  'Mês 12: auditoria completa, HaveIBeenPwned em todos os emails, revisão de todas as sessões ativas',
];

const FAQ = [
  {
    q: 'Vale a pena pagar VPN se eu uso só para Netflix?',
    a: 'Para uso casual de streaming, qualquer VPN comercial básica resolve. Mas se a discussão é segurança digital real, Mullvad ou IVPN são as únicas escolhas defensáveis: pagamento em bitcoin/monero/cash, conta sem cadastro, sem logs comprovado em auditoria, kill switch nativo, suporte a WireGuard. NordVPN, ExpressVPN, Surfshark e similares são produtos de marketing com histórico de comprometimento e logs entregues a autoridades. Custo de Mullvad é 5 EUR/mês fixo, sem upsell.',
  },
  {
    q: 'YubiKey custa R$ 600. Não dá pra usar só app TOTP?',
    a: 'App TOTP (Aegis, Raivo, 2FAS) é segundo melhor: roda offline, baseado em tempo, sem dependência de SMS. Hardware key (YubiKey, Nitrokey) é superior por dois motivos: 1) Resistente a phishing por design (a chave verifica o domínio antes de assinar, app TOTP não verifica), 2) Imune a malware no celular (TOTP fica armazenado no celular, malware pode exfiltrar). Para conta financeira ou exchange com bitcoin, YubiKey é investimento obrigatório. Para Netflix e Spotify, TOTP basta.',
  },
  {
    q: 'GrapheneOS dá pra usar no dia a dia ou é coisa de paranoico?',
    a: 'GrapheneOS é totalmente funcional para uso diário, mas exige adaptação: muitos apps brasileiros (banco, governo, alguns delivery) usam SafetyNet/Play Integrity e podem se recusar a rodar fora do Google Play stock. Solução é sandbox do Google Play Services dentro do GrapheneOS (suportado nativamente desde 2022, isola privilégios). Ganho de privacidade é massivo: zero coleta passiva do Google, sandbox por app, anti-exploit avançado, atualizações de segurança ágeis. Recomendado para quem quer real controle, exige curva de aprendizado de 1 a 2 semanas.',
  },
  {
    q: 'Se meu celular for roubado com gestor de senha aberto, perdi tudo?',
    a: 'Depende da configuração. Bitwarden e KeePassXC fecham automaticamente após período de inatividade configurável (5 a 15 minutos recomendado). Após bloqueio, exigem senha-mestra novamente. Se PIN do celular for forte (12+ caracteres alfanuméricos) e criptografia integral estiver ativa, ladrão comum não consegue extrair nada. Risco real é apenas com adversário sofisticado (forense, ataque direcionado), aí entra discussão de plausible deniability e cofre oculto. Para 99% dos cenários, configuração padrão com auto-lock + cripto integral resolve.',
  },
  {
    q: 'ProtonMail é realmente seguro? Estão sediados na Suíça mas atendem ordem judicial.',
    a: 'ProtonMail é seguro no que prometem: criptografia end-to-end entre usuários ProtonMail, zero-access encryption no servidor (mesmo que sejam invadidos, não conseguem ler conteúdo). MAS: metadados (quem enviou, para quem, quando, IP de origem) são acessíveis e podem ser entregues sob ordem judicial suíça. Para confidencialidade de conteúdo, ProtonMail é excelente. Para anonimato total de identidade, combine com Tor Browser e conta paga em bitcoin sem dados pessoais. Tutanota tem perfil similar com algumas diferenças técnicas. Para anonimato extremo, considere SimpleX Chat ou comunicação fora do email tradicional.',
  },
  {
    q: 'Como proteger meus pais idosos que caem em todo golpe de WhatsApp?',
    a: 'Estratégia em 4 camadas: 1) Treinamento: simulação trimestral, mande SMS falso "do banco" e mostre como caíram. Repita até criar reflexo. 2) Limite técnico: configure PIX deles com limite diário baixo (R$ 200 a R$ 500) e ative confirmação por biometria/senha em toda transação. 3) Verificação: combine senha familiar secreta usada em qualquer pedido de dinheiro por mensagem ("Para confirmar, qual era o nome do nosso primeiro cachorro?"). 4) Controle parental reverso: instale app de gestão remota com permissão deles (Family Link, Screen Time) para você intervir em casos suspeitos. Idoso precisa de estrutura, não de palestra.',
  },
  {
    q: 'Vale a pena ter celular separado só para PIX e banco?',
    a: 'Sim, é a melhor relação custo-benefício de toda a estratégia de defesa digital. Celular básico (Pixel 4a usado, R$ 800, ou iPhone SE de geração 2, R$ 1.200) dedicado APENAS para banco, exchange e 2FA crítico. Sem WhatsApp, sem redes sociais, sem games, sem app aleatório. Linha telefônica nunca compartilhada publicamente, usada apenas para 2FA bancário. Vetor de comprometimento cai 95%: se o celular pessoal for hackeado por malware via app pirata ou link de phishing, o celular crítico permanece intocado. Investimento de R$ 800 a R$ 1.200 protege patrimônio de R$ 100 mil ou mais.',
  },
  {
    q: 'Existe algum gestor de senha brasileiro confiável?',
    a: 'Não. Dirceu, Senha Segura e similares brasileiros são produtos comerciais sem auditoria pública independente, sem código aberto, sem histórico de transparência sobre vulnerabilidades. KeePassXC (open source, auditado, gratuito) e Bitwarden (open source, auditado, gratuito ou self-hosted) são as únicas escolhas defensáveis tecnicamente. 1Password é fechado mas auditado e tem histórico longo de transparência. Evite produtos brasileiros sem auditoria pública: o ecossistema cripto e segurança digital nacional ainda é imaturo, melhor importar referências testadas em escala global.',
  },
];

const DefesaDigital = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <>
      <SeoHead
        path="/soberania-organica/defesa-digital-pessoal"
        custom={{
          title: 'Defesa Digital Pessoal: Senhas, 2FA Hardware, VPN, Criptografia e Antiphishing',
          description: 'Manual tático completo de defesa digital pessoal para o brasileiro: senhas robustas, 2FA por hardware (YubiKey), VPN confiável (Mullvad), criptografia integral, navegação anônima e proteção contra phishing PIX/WhatsApp.',
          canonical: 'https://lordjunnior.com.br/soberania-organica/defesa-digital-pessoal',
          primaryKeyword: 'defesa digital pessoal',
          lsiKeywords: ['gestor de senha offline', 'YubiKey 2FA hardware', 'Mullvad VPN', 'criptografia de dispositivo', 'antiphishing PIX', 'GrapheneOS'],
          longTailKeywords: ['como proteger PIX de golpe', 'qual gestor de senha mais seguro', 'YubiKey vale a pena', 'como configurar Mullvad VPN', 'GrapheneOS no Brasil', 'celular separado para banco'],
          breadcrumbs: [
            { name: 'Início', url: '/' },
            { name: 'Soberania Orgânica', url: '/soberania-organica' },
            { name: 'Defesa Digital Pessoal', url: '/soberania-organica/defesa-digital-pessoal' },
          ],
          schemaType: 'Article',
          articleSection: 'Soberania Orgânica',
          relatedPages: ['/soberania-organica/defesa-pessoal', '/soberania-organica/defesa-domiciliar', '/soberania-organica/higiene-mental', '/vazamento-dados'],
        }}
        faqItems={FAQ.map((f) => ({ question: f.q, answer: f.a }))}
      />

      <FixedThematicBackground image={heroImg} intensity="heavy" />

      <div className="relative z-20 px-6 md:px-12 lg:px-20 pt-[52px]">
        <BackToHome />
      </div>

      <div className="min-h-screen text-foreground relative z-10">
        <CinematicHero
          image={heroImg}
          icon={ShieldCheck}
          phase="Soberania Orgânica · Autonomia Digital"
          title={
            <>
              Defesa Digital Pessoal:{' '}
              <span className="italic font-serif text-amber-400 font-light tracking-tight">o vetor mais barato e mais ignorado de toda a sua infraestrutura</span>
            </>
          }
          subtitle="3,2 milhões de brasileiros perderam dinheiro em golpes digitais em 2024, com prejuízo médio de R$ 5.400 por vítima. SIM swap custa R$ 200 no fórum criminoso. Senha reusada em 5 serviços é invasão garantida em 48h. O usuário autônomo trata o ambiente digital como ambiente físico de combate: zonas, perímetros, redundâncias e protocolos treinados."
        />

        <section className="py-24 md:py-32 px-6 md:px-12">
          <div className="max-w-7xl mx-auto">
            <motion.div {...fade(0)} className="max-w-4xl">
              <p className="text-xs font-mono uppercase tracking-[0.3em] text-primary mb-6">Capítulo 01 · Princípio operacional</p>
              <h2 className="text-4xl md:text-6xl font-display tracking-tight mb-8 text-foreground">A vida moderna virou interface, e a interface virou perímetro</h2>
              <div className="space-y-6 text-lg md:text-xl text-foreground/80 leading-relaxed font-light">
                <p>O brasileiro adulto passa em média 9 horas e 30 minutos diários conectado a algum dispositivo. Toda transação financeira, toda comunicação importante, toda decisão patrimonial passa por tela. Isso significa que a infraestrutura digital deixou de ser ferramenta auxiliar e virou o terreno principal onde se ganha ou se perde patrimônio, identidade, liberdade.</p>
                <p>Tratar segurança digital como tópico de TI é abdicar do segundo maior perímetro de exposição da vida moderna, depois do próprio corpo. Defesa digital é doutrina integrada: gestor de senha offline, 2FA hardware, VPN confiável, criptografia integral, navegação compartimentada, email tático, smartphone hardenizado e protocolo antiphishing treinado em família.</p>
                <p>Este manual estabelece 8 pilares operacionais, cada um com sequência treinada, base técnica documentada e falhas críticas mapeadas. Implementação progressiva em ciclos de 12 meses. Resultado: redução real de 90 a 98% em probabilidade de comprometimento crítico, com investimento total entre R$ 2 mil (versão básica) e R$ 8 mil (versão completa com hardware redundante e celular dedicado).</p>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="py-24 md:py-32 px-6 md:px-12 border-t border-border/30">
          <div className="max-w-7xl mx-auto">
            <motion.div {...fade(0)} className="mb-20 max-w-4xl">
              <p className="text-xs font-mono uppercase tracking-[0.3em] text-primary mb-6">Capítulo 02 · Pilares operacionais</p>
              <h2 className="text-4xl md:text-6xl font-display tracking-tight mb-6 text-foreground">8 protocolos da autonomia digital</h2>
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
              <p className="text-xs font-mono uppercase tracking-[0.3em] text-primary mb-6">Capítulo 03 · Hardware key</p>
              <h2 className="text-4xl md:text-5xl font-display tracking-tight mb-6 text-foreground">YubiKey é o melhor R$ 600 que você gasta na vida digital</h2>
              <div className="space-y-5 text-base md:text-lg text-foreground/80 leading-relaxed font-light">
                <p>Hardware security key é o único segundo fator imune a phishing por design. A chave verifica o domínio antes de assinar a autenticação: se o usuário cair em um site falso (mesmo que visualmente idêntico), a chave se recusa a operar. SMS pode ser interceptado, app TOTP pode ser exfiltrado por malware, biometria pode ser forçada. Hardware key física exige posse fisica e toque deliberado.</p>
                <p>Compre sempre 2 unidades direto do fabricante (yubico.com, nitrokey.com). Cadastre as duas em todos os serviços críticos. Uma fica em uso diário, a outra em cofre offsite ou cofre doméstico. Perda de uma sem backup é lockout permanente em alguns serviços (GitHub, exchanges sem método alternativo).</p>
              </div>
            </motion.div>
            <motion.div {...fade(0.1)}>
              <img src={img2fa} alt="YubiKey 5 hardware security key em close-up macro com iluminação âmbar tática" className="rounded-2xl border border-border/40 w-full" loading="lazy" width={1600} height={1000} />
            </motion.div>
          </div>
        </section>

        <section className="py-24 md:py-32 px-6 md:px-12 border-t border-border/30">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
            <motion.div {...fade(0.1)} className="order-2 lg:order-1">
              <img src={imgCripto} alt="Envelope metálico de segurança com seed phrase escrita à mão e YubiKey, opsec documental" className="rounded-2xl border border-border/40 w-full" loading="lazy" width={1600} height={1000} />
            </motion.div>
            <motion.div {...fade(0)} className="order-1 lg:order-2">
              <p className="text-xs font-mono uppercase tracking-[0.3em] text-primary mb-6">Capítulo 04 · Custódia da senha-mestra</p>
              <h2 className="text-4xl md:text-5xl font-display tracking-tight mb-6 text-foreground">A senha-mestra não vai pro celular, vai pra cabeça</h2>
              <div className="space-y-5 text-base md:text-lg text-foreground/80 leading-relaxed font-light">
                <p>Toda a estrutura de defesa digital se ampara em UMA senha-mestra: a do gestor de senha. Se ela vaza, comprometeu tudo. Se você esquece, perdeu tudo. Estratégia: 6 palavras BIP39 escolhidas aleatoriamente + 4 dígitos numéricos. Resultado: 80 bits de entropia, decoreível em 2 semanas com prática diária.</p>
                <p>Backup da senha-mestra apenas em forma física: papel laminado dentro de envelope tipo Mylar selado, guardado em cofre doméstico ou cofre bancário. NUNCA digital. NUNCA foto. NUNCA nuvem. A regra é simples: se está em algum lugar acessível remotamente, não é mais seu.</p>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="py-24 md:py-32 px-6 md:px-12 border-t border-border/30 bg-destructive/5">
          <div className="max-w-7xl mx-auto">
            <motion.div {...fade(0)} className="mb-16 max-w-4xl">
              <p className="text-xs font-mono uppercase tracking-[0.3em] text-destructive mb-6">Capítulo 05 · Erros que destroem patrimônio</p>
              <h2 className="text-4xl md:text-6xl font-display tracking-tight mb-6 text-foreground">6 erros fatais que aparecem em todo caso de invasão</h2>
              <p className="text-lg text-foreground/70 font-light">Padrão extraído de 200+ casos públicos brasileiros entre 2023 e 2025. Se um destes está ativo na sua vida, urgência é absoluta.</p>
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
              <p className="text-lg text-foreground/70 font-light">Construção progressiva da autonomia digital completa. Sem ego, sem pressa, com auditoria semestral.</p>
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
              <h2 className="text-4xl md:text-6xl font-display tracking-tight text-foreground">Dúvidas que decidem a integridade da vida digital</h2>
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
              <h2 className="text-3xl md:text-5xl font-display tracking-tight text-foreground mb-10">A defesa digital é uma camada do refúgio total</h2>
              <div className="grid sm:grid-cols-3 gap-4">
                <Link to="/soberania-organica/defesa-pessoal" className="border border-border/40 bg-card/40 rounded-xl p-6 hover:border-primary/60 hover:-translate-y-1 transition-all">
                  <p className="text-xs font-mono uppercase tracking-widest text-primary/80 mb-2">Defesa do corpo</p>
                  <p className="text-base text-foreground font-medium flex items-center justify-between">Defesa Pessoal Básica <ArrowRight className="w-4 h-4" /></p>
                </Link>
                <Link to="/soberania-organica/higiene-mental" className="border border-border/40 bg-card/40 rounded-xl p-6 hover:border-primary/60 hover:-translate-y-1 transition-all">
                  <p className="text-xs font-mono uppercase tracking-widest text-primary/80 mb-2">Defesa da mente</p>
                  <p className="text-base text-foreground font-medium flex items-center justify-between">Higiene Mental <ArrowRight className="w-4 h-4" /></p>
                </Link>
                <Link to="/vazamento-dados" className="border border-border/40 bg-card/40 rounded-xl p-6 hover:border-primary/60 hover:-translate-y-1 transition-all">
                  <p className="text-xs font-mono uppercase tracking-widest text-primary/80 mb-2">Histórico de vazamentos</p>
                  <p className="text-base text-foreground font-medium flex items-center justify-between">Vazamento de Dados <ArrowRight className="w-4 h-4" /></p>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default DefesaDigital;
