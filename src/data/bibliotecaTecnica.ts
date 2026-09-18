/**
 * Biblioteca Técnica Lord Junnior.
 * Curadoria própria, organizada por problema antes de ferramenta.
 * Política completa em docs/biblioteca-tecnica/CURADORIA.md
 */

export type StatusEditorial = 'verificado' | 'monitorado' | 'arquivado' | 'retirado';
export type ConfiancaFonte = 'primaria' | 'secundaria' | 'terciaria';
export type NivelLeitura = 'entender' | 'proteger' | 'investigar' | 'aprofundar';
export type TipoRecurso = 'aplicativo' | 'sistema operacional' | 'serviço' | 'documentação' | 'metodologia' | 'utilitário';

export interface Recurso {
  id: string;
  nome: string;
  capacidade: string;
  tipo: TipoRecurso;
  paraQueServe: string;
  quandoUsar: string;
  nivel: NivelLeitura;
  plataformas: string[];
  codigoAberto: 'sim' | 'não' | 'parcialmente';
  licenca: string;
  documentacao: string;
  fonte: string;
  confianca: ConfiancaFonte;
  ultimaVerificacao: string;
  status: StatusEditorial;
  motivoStatus: string;
  porQueEstaAqui: string;
  paginasRelacionadas: { label: string; route: string }[];
}

export interface Capacidade {
  id: string;
  pergunta: string;
  titulo: string;
  descricao: string;
  recursos: Recurso[];
}

export interface Dimensao {
  id: string;
  titulo: string;
  subtitulo: string;
  descricao: string;
  capacidades: Capacidade[];
}

export const ULTIMA_REVISAO = '18/09/2026';

export const STATUS_INFO: Record<StatusEditorial, { label: string; explicacao: string }> = {
  verificado: { label: 'Verificado', explicacao: 'Fonte primária conferida e projeto em manutenção ativa.' },
  monitorado: { label: 'Monitorado', explicacao: 'Recurso válido, sujeito a mudança relevante de licença, governança ou manutenção.' },
  arquivado: { label: 'Arquivado', explicacao: 'Historicamente útil, não recomendado para uso atual.' },
  retirado: { label: 'Retirado', explicacao: 'Retirado por problema de segurança, abandono ou mudança de licença.' },
};

export const CONFIANCA_INFO: Record<ConfiancaFonte, { label: string; explicacao: string }> = {
  primaria: { label: 'Fonte primária', explicacao: 'Site, documentação ou repositório oficial do projeto.' },
  secundaria: { label: 'Fonte secundária', explicacao: 'Projeto reconhecido, documentação comunitária ou auditoria publicada.' },
  terciaria: { label: 'Fonte terciária', explicacao: 'Lista, blog ou agregador. Serve para descoberta, nunca para validação.' },
};

export const NIVEL_INFO: Record<NivelLeitura, { label: string; ordem: number }> = {
  entender: { label: 'Nível 1, entender', ordem: 1 },
  proteger: { label: 'Nível 2, proteger', ordem: 2 },
  investigar: { label: 'Nível 3, investigar', ordem: 3 },
  aprofundar: { label: 'Nível 4, aprofundar', ordem: 4 },
};

export const DIMENSOES: Dimensao[] = [
  {
    id: 'dispositivo',
    titulo: 'Dispositivo',
    subtitulo: 'Sistema operacional, atualização, permissão, hardening',
    descricao: 'O aparelho é a primeira camada. Nenhuma ferramenta de comunicação ou de custódia resolve nada em cima de um sistema comprometido, desatualizado ou cheio de aplicativo com permissão aberta.',
    capacidades: [
      {
        id: 'sistema-operacional-movel',
        pergunta: 'Quero reduzir a superfície de ataque do meu celular.',
        titulo: 'Sistema operacional móvel endurecido',
        descricao: 'Trocar o sistema é a mudança mais profunda e também a que exige mais disciplina de manutenção. Só faz sentido com hardware compatível e com clareza sobre o que vai deixar de funcionar.',
        recursos: [
          {
            id: 'grapheneos',
            nome: 'GrapheneOS',
            capacidade: 'Sistema operacional móvel endurecido',
            tipo: 'sistema operacional',
            paraQueServe: 'Sistema baseado em Android com reforço de memória, sandbox de aplicativos e controle granular de permissão, incluindo acesso à rede e a sensores.',
            quandoUsar: 'Quando você tem um Pixel compatível, aceita revisar compatibilidade de aplicativos e quer reduzir a coleta de dado feita pelo próprio sistema.',
            nivel: 'proteger',
            plataformas: ['Google Pixel'],
            codigoAberto: 'sim',
            licenca: 'MIT e Apache 2.0, conforme o componente',
            documentacao: 'https://grapheneos.org/faq',
            fonte: 'https://grapheneos.org',
            confianca: 'primaria',
            ultimaVerificacao: ULTIMA_REVISAO,
            status: 'verificado',
            motivoStatus: 'Documentação oficial conferida, ciclo de atualização público e ativo.',
            porQueEstaAqui: 'Segurança móvel é uma das camadas de autonomia digital tratadas aqui. O projeto ajuda a entender a superfície de ataque do próprio aparelho, sem prometer invulnerabilidade: hardened_malloc não elimina zero-day e o sistema não substitui gestão corporativa de dispositivo.',
            paginasRelacionadas: [{ label: 'GrapheneOS, guia completo', route: '/seguranca-mobile/grapheneos' }],
          },
          {
            id: 'calyxos',
            nome: 'CalyxOS',
            capacidade: 'Sistema operacional móvel endurecido',
            tipo: 'sistema operacional',
            paraQueServe: 'Sistema baseado em Android com foco em privacidade cotidiana, incluindo camada de compatibilidade para aplicativos que dependem de serviços do Google.',
            quandoUsar: 'Quando a prioridade é reduzir dependência de serviços de terceiros mantendo compatibilidade ampla de aplicativos do dia a dia.',
            nivel: 'proteger',
            plataformas: ['Google Pixel', 'alguns modelos adicionais'],
            codigoAberto: 'sim',
            licenca: 'Apache 2.0 e GPL, conforme o componente',
            documentacao: 'https://calyxos.org/docs/',
            fonte: 'https://calyxos.org',
            confianca: 'primaria',
            ultimaVerificacao: ULTIMA_REVISAO,
            status: 'verificado',
            motivoStatus: 'Documentação oficial conferida, releases publicadas com regularidade.',
            porQueEstaAqui: 'Serve de contraponto prático: nem todo mundo aceita perder compatibilidade, e essa escolha precisa ser feita com informação, não por moda.',
            paginasRelacionadas: [{ label: 'CalyxOS, guia completo', route: '/seguranca-mobile/calyxos' }],
          },
          {
            id: 'fdroid',
            nome: 'F-Droid',
            capacidade: 'Distribuição de aplicativos auditáveis',
            tipo: 'serviço',
            paraQueServe: 'Repositório de aplicativos de código aberto para Android, com política de compilação a partir do código-fonte e avisos sobre rastreadores e funcionalidades sensíveis.',
            quandoUsar: 'Quando você quer instalar aplicativo livre sem depender de loja atrelada a conta pessoal.',
            nivel: 'proteger',
            plataformas: ['Android'],
            codigoAberto: 'sim',
            licenca: 'GPL-3.0',
            documentacao: 'https://f-droid.org/docs/',
            fonte: 'https://f-droid.org',
            confianca: 'primaria',
            ultimaVerificacao: ULTIMA_REVISAO,
            status: 'monitorado',
            motivoStatus: 'Projeto ativo, porém o atraso de empacotamento em relação ao autor original exige atenção em aplicativo de segurança.',
            porQueEstaAqui: 'Permite auditar a origem do que entra no aparelho, tema central do silo de segurança móvel.',
            paginasRelacionadas: [{ label: 'Segurança mobile', route: '/seguranca-mobile' }],
          },
        ],
      },
    ],
  },
  {
    id: 'identidade',
    titulo: 'Identidade',
    subtitulo: 'Senha, segundo fator, passkey, recuperação',
    descricao: 'A maior parte das perdas não começa com invasão sofisticada. Começa com senha reaproveitada, segundo fator por SMS e ausência de plano de recuperação.',
    capacidades: [
      {
        id: 'gerenciar-senhas',
        pergunta: 'Quero parar de reaproveitar senha.',
        titulo: 'Gerenciamento de credenciais',
        descricao: 'Gerenciador de senha transforma dezenas de segredos fracos em um segredo forte, protegido por senha-mestra e segundo fator.',
        recursos: [
          {
            id: 'keepassxc',
            nome: 'KeePassXC',
            capacidade: 'Gerenciamento de credenciais local',
            tipo: 'aplicativo',
            paraQueServe: 'Cofre de senhas em arquivo local criptografado, sem servidor e sem conta.',
            quandoUsar: 'Quando você prefere manter o cofre sob custódia própria e controlar você mesmo o backup dele.',
            nivel: 'proteger',
            plataformas: ['Windows', 'macOS', 'Linux'],
            codigoAberto: 'sim',
            licenca: 'GPL-2.0 ou posterior',
            documentacao: 'https://keepassxc.org/docs/',
            fonte: 'https://keepassxc.org',
            confianca: 'primaria',
            ultimaVerificacao: ULTIMA_REVISAO,
            status: 'verificado',
            motivoStatus: 'Projeto ativo, formato de arquivo documentado e independente de fornecedor.',
            porQueEstaAqui: 'Custódia de segredo é o mesmo princípio aplicado às chaves de Bitcoin. Quem entende cofre local entende melhor por que a seed não mora em nuvem.',
            paginasRelacionadas: [{ label: 'Chaves privadas', route: '/chaves' }],
          },
          {
            id: 'bitwarden',
            nome: 'Bitwarden',
            capacidade: 'Gerenciamento de credenciais sincronizado',
            tipo: 'serviço',
            paraQueServe: 'Cofre de senhas com sincronização entre aparelhos, criptografia de ponta a ponta e opção de servidor próprio.',
            quandoUsar: 'Quando a família ou a equipe precisa de sincronização e você aceita depender de um servidor, próprio ou do fornecedor.',
            nivel: 'proteger',
            plataformas: ['Web', 'Android', 'iOS', 'Desktop', 'Extensão'],
            codigoAberto: 'sim',
            licenca: 'AGPL-3.0 no servidor, GPL-3.0 nos clientes',
            documentacao: 'https://bitwarden.com/help/',
            fonte: 'https://bitwarden.com',
            confianca: 'primaria',
            ultimaVerificacao: ULTIMA_REVISAO,
            status: 'monitorado',
            motivoStatus: 'Empresa com produto comercial, portanto licença e limites do plano gratuito precisam ser reconferidos periodicamente.',
            porQueEstaAqui: 'Resolve o problema real de quem tem dezenas de contas e nenhuma disciplina de senha, sem exigir migração radical.',
            paginasRelacionadas: [{ label: 'Blindagem contra golpes', route: '/blindagem-golpes' }],
          },
          {
            id: 'aegis',
            nome: 'Aegis Authenticator',
            capacidade: 'Segundo fator fora do SMS',
            tipo: 'aplicativo',
            paraQueServe: 'Gerador de códigos temporários no padrão TOTP, com cofre criptografado e exportação de backup.',
            quandoUsar: 'Quando você quer sair do segundo fator por SMS, vulnerável a troca de chip, sem ficar preso a um aplicativo sem backup.',
            nivel: 'proteger',
            plataformas: ['Android'],
            codigoAberto: 'sim',
            licenca: 'GPL-3.0',
            documentacao: 'https://getaegis.app/',
            fonte: 'https://github.com/beemdevelopment/Aegis',
            confianca: 'primaria',
            ultimaVerificacao: ULTIMA_REVISAO,
            status: 'verificado',
            motivoStatus: 'Repositório oficial ativo, backup exportável documentado.',
            porQueEstaAqui: 'Troca de chip é vetor de ataque frequente no Brasil e atinge diretamente contas de corretora.',
            paginasRelacionadas: [{ label: 'Blindagem contra golpes', route: '/blindagem-golpes' }],
          },
          {
            id: 'yubikey',
            nome: 'YubiKey',
            capacidade: 'Segundo fator em hardware',
            tipo: 'utilitário',
            paraQueServe: 'Chave física de autenticação nos padrões FIDO2, WebAuthn e OTP, resistente a phishing porque valida o domínio antes de responder.',
            quandoUsar: 'Em contas críticas, corretora, email principal e provedor de domínio, onde um phishing bem-feito causaria dano irreversível.',
            nivel: 'proteger',
            plataformas: ['USB-A', 'USB-C', 'NFC'],
            codigoAberto: 'parcialmente',
            licenca: 'Firmware proprietário, bibliotecas e padrões abertos',
            documentacao: 'https://docs.yubico.com',
            fonte: 'https://www.yubico.com',
            confianca: 'primaria',
            ultimaVerificacao: ULTIMA_REVISAO,
            status: 'monitorado',
            motivoStatus: 'Firmware fechado e compra dependente de importação, dois pontos que exigem checagem antes de indicar como único fator.',
            porQueEstaAqui: 'É o único segundo fator que resiste bem a phishing, e phishing é o ataque que mais custa dinheiro ao público brasileiro.',
            paginasRelacionadas: [{ label: 'Blindagem contra golpes', route: '/blindagem-golpes' }],
          },
        ],
      },
    ],
  },
  {
    id: 'comunicacao',
    titulo: 'Comunicação',
    subtitulo: 'Mensagem, email, voz',
    descricao: 'Criptografia de conteúdo resolve uma parte do problema. Metadado, quem falou com quem e quando, costuma ser o que mais expõe alguém.',
    capacidades: [
      {
        id: 'mensagens',
        pergunta: 'Quero conversar sem deixar o conteúdo aberto.',
        titulo: 'Mensagem com criptografia de ponta a ponta',
        descricao: 'Aqui o critério não é só criptografia. É também quanto metadado o serviço guarda e o que ele entrega sob ordem judicial.',
        recursos: [
          {
            id: 'signal',
            nome: 'Signal',
            capacidade: 'Mensagem com criptografia de ponta a ponta',
            tipo: 'aplicativo',
            paraQueServe: 'Mensagem, chamada e vídeo com criptografia de ponta a ponta por padrão, com protocolo aberto e revisado por terceiros.',
            quandoUsar: 'Quando o conteúdo da conversa tem valor e você quer reduzir o metadado retido pelo serviço.',
            nivel: 'entender',
            plataformas: ['Android', 'iOS', 'Desktop'],
            codigoAberto: 'sim',
            licenca: 'AGPL-3.0',
            documentacao: 'https://support.signal.org',
            fonte: 'https://signal.org',
            confianca: 'primaria',
            ultimaVerificacao: ULTIMA_REVISAO,
            status: 'verificado',
            motivoStatus: 'Protocolo público, código publicado e histórico de respostas judiciais divulgado pela própria organização.',
            porQueEstaAqui: 'Comunicação é camada de autonomia. O cadastro por número de telefone continua sendo a limitação honesta do projeto, e isso precisa ser dito junto com a recomendação.',
            paginasRelacionadas: [{ label: 'Comunicação offline', route: '/comunicacao-offline' }],
          },
          {
            id: 'proton-mail',
            nome: 'Proton Mail',
            capacidade: 'Email com criptografia em repouso',
            tipo: 'serviço',
            paraQueServe: 'Provedor de email com criptografia de ponta a ponta entre usuários do serviço e armazenamento criptografado.',
            quandoUsar: 'Para separar o email sério do email descartável, principalmente em cadastro financeiro.',
            nivel: 'entender',
            plataformas: ['Web', 'Android', 'iOS', 'Desktop'],
            codigoAberto: 'parcialmente',
            licenca: 'Clientes em GPL-3.0, servidor proprietário',
            documentacao: 'https://proton.me/support/mail',
            fonte: 'https://proton.me',
            confianca: 'primaria',
            ultimaVerificacao: ULTIMA_REVISAO,
            status: 'monitorado',
            motivoStatus: 'Servidor fechado e obrigações legais da jurisdição exigem revisão periódica da promessa de privacidade.',
            porQueEstaAqui: 'Email é a chave-mestra de recuperação de quase toda conta. Tratar email como infraestrutura crítica é parte da blindagem.',
            paginasRelacionadas: [{ label: 'Blindagem contra golpes', route: '/blindagem-golpes' }],
          },
          {
            id: 'simplelogin',
            nome: 'SimpleLogin',
            capacidade: 'Separação de identidade por alias',
            tipo: 'serviço',
            paraQueServe: 'Criação de endereços de email descartáveis que encaminham para a caixa real, isolando vazamento por serviço.',
            quandoUsar: 'Em cadastro de loja, newsletter e serviço de baixa confiança, para descobrir quem vazou seu dado e cortar apenas aquele alias.',
            nivel: 'proteger',
            plataformas: ['Web', 'Extensão', 'Android', 'iOS'],
            codigoAberto: 'sim',
            licenca: 'MIT',
            documentacao: 'https://simplelogin.io/docs/',
            fonte: 'https://github.com/simple-login/app',
            confianca: 'primaria',
            ultimaVerificacao: ULTIMA_REVISAO,
            status: 'monitorado',
            motivoStatus: 'Projeto aberto, porém operado por empresa, o que mantém dependência de fornecedor no encaminhamento.',
            porQueEstaAqui: 'Compartimentar identidade é prática de risco, não de paranoia. Um vazamento deixa de contaminar todas as contas.',
            paginasRelacionadas: [{ label: 'Segurança mobile', route: '/seguranca-mobile' }],
          },
        ],
      },
    ],
  },
  {
    id: 'navegacao',
    titulo: 'Navegação',
    subtitulo: 'DNS, navegador, VPN, Tor',
    descricao: 'Trocar de IP não é anonimato. Cada camada aqui resolve um problema específico e falha em todos os outros, e essa distinção é o que separa proteção de teatro.',
    capacidades: [
      {
        id: 'resolucao-dns',
        pergunta: 'Quero reduzir rastreamento no caminho da rede.',
        titulo: 'Resolução de nomes e filtragem',
        descricao: 'O DNS entrega ao provedor a lista de tudo que você acessa. Trocar o resolvedor muda quem recebe essa lista, e filtrar reduz o alcance de rastreador e de domínio malicioso.',
        recursos: [
          {
            id: 'quad9',
            nome: 'Quad9',
            capacidade: 'DNS com bloqueio de domínio malicioso',
            tipo: 'serviço',
            paraQueServe: 'Resolvedor público que bloqueia domínios associados a phishing e distribuição de código malicioso, com suporte a DNS criptografado.',
            quandoUsar: 'Como ajuste inicial no roteador de casa ou no celular, com efeito imediato e baixo risco.',
            nivel: 'entender',
            plataformas: ['Roteador', 'Android', 'iOS', 'Desktop'],
            codigoAberto: 'parcialmente',
            licenca: 'Serviço operado por fundação sem fins lucrativos',
            documentacao: 'https://www.quad9.net/support/faq',
            fonte: 'https://www.quad9.net',
            confianca: 'primaria',
            ultimaVerificacao: ULTIMA_REVISAO,
            status: 'verificado',
            motivoStatus: 'Política de privacidade e operação documentadas pela própria fundação.',
            porQueEstaAqui: 'É a mudança de maior efeito por menor esforço na camada de rede doméstica.',
            paginasRelacionadas: [{ label: 'VPN no celular, quando ajuda', route: '/seguranca-mobile/vpn-no-celular' }],
          },
          {
            id: 'tor-browser',
            nome: 'Tor Browser',
            capacidade: 'Navegação com dissociação de origem',
            tipo: 'aplicativo',
            paraQueServe: 'Navegador que roteia o tráfego por três saltos e padroniza a impressão digital do navegador para dificultar identificação.',
            quandoUsar: 'Em pesquisa sensível, quando a origem da consulta não deve ser associada a você. Não serve para acessar conta pessoal, o login identifica quem você é.',
            nivel: 'investigar',
            plataformas: ['Windows', 'macOS', 'Linux', 'Android'],
            codigoAberto: 'sim',
            licenca: 'BSD de três cláusulas e MPL, conforme o componente',
            documentacao: 'https://tb-manual.torproject.org',
            fonte: 'https://www.torproject.org',
            confianca: 'primaria',
            ultimaVerificacao: ULTIMA_REVISAO,
            status: 'verificado',
            motivoStatus: 'Manual oficial e releases públicas conferidos.',
            porQueEstaAqui: 'Fecha a lacuna deixada pela VPN, que troca o observador sem eliminar a observação.',
            paginasRelacionadas: [{ label: 'VPN no celular, quando ajuda', route: '/seguranca-mobile/vpn-no-celular' }],
          },
          {
            id: 'mullvad-browser',
            nome: 'Mullvad Browser',
            capacidade: 'Navegação com impressão digital padronizada',
            tipo: 'aplicativo',
            paraQueServe: 'Navegador desenvolvido junto ao Tor Project que aplica a mesma padronização de impressão digital sem usar a rede Tor.',
            quandoUsar: 'Quando o objetivo é reduzir rastreamento por impressão digital no uso diário, sem a lentidão da rede Tor.',
            nivel: 'proteger',
            plataformas: ['Windows', 'macOS', 'Linux'],
            codigoAberto: 'sim',
            licenca: 'MPL-2.0',
            documentacao: 'https://mullvad.net/help/tag/mullvad-browser',
            fonte: 'https://mullvad.net/browser',
            confianca: 'primaria',
            ultimaVerificacao: ULTIMA_REVISAO,
            status: 'verificado',
            motivoStatus: 'Origem do projeto e ciclo de atualização documentados nas duas organizações envolvidas.',
            porQueEstaAqui: 'Impressão digital de navegador é o rastreamento que sobrevive à VPN e à janela anônima.',
            paginasRelacionadas: [{ label: 'iPhone é seguro mesmo?', route: '/seguranca-mobile/iPhone-e-seguro-mesmo' }],
          },
        ],
      },
    ],
  },
  {
    id: 'dados',
    titulo: 'Dados',
    subtitulo: 'Backup, criptografia, armazenamento, sincronização',
    descricao: 'Backup que nunca foi testado não é backup. Criptografia sem plano de recuperação é perda de dado com etapa extra.',
    capacidades: [
      {
        id: 'backup-criptografado',
        pergunta: 'Quero um backup que sobreviva a perda, roubo e incêndio.',
        titulo: 'Backup criptografado e verificável',
        descricao: 'A regra prática continua a mesma: três cópias, dois meios diferentes, uma fora de casa, e um teste de restauração com data marcada.',
        recursos: [
          {
            id: 'cryptomator',
            nome: 'Cryptomator',
            capacidade: 'Criptografia de arquivos em nuvem',
            tipo: 'aplicativo',
            paraQueServe: 'Cria um cofre criptografado dentro de qualquer pasta sincronizada em nuvem, arquivo por arquivo.',
            quandoUsar: 'Quando você já usa nuvem e não pretende sair dela, mas quer que o provedor não leia o conteúdo.',
            nivel: 'proteger',
            plataformas: ['Windows', 'macOS', 'Linux', 'Android', 'iOS'],
            codigoAberto: 'sim',
            licenca: 'GPL-3.0',
            documentacao: 'https://docs.cryptomator.org',
            fonte: 'https://cryptomator.org',
            confianca: 'primaria',
            ultimaVerificacao: ULTIMA_REVISAO,
            status: 'verificado',
            motivoStatus: 'Documentação oficial e auditorias publicadas pelo projeto.',
            porQueEstaAqui: 'Resolve o caso mais comum, a pessoa que não vai abandonar a nuvem, mas pode deixar de entregar o conteúdo em claro.',
            paginasRelacionadas: [{ label: 'Backup de seed phrase', route: '/autocustodia/backup-seed-phrase-guia' }],
          },
          {
            id: 'veracrypt',
            nome: 'VeraCrypt',
            capacidade: 'Criptografia de volume local',
            tipo: 'aplicativo',
            paraQueServe: 'Cria volumes e discos criptografados em disco local ou removível.',
            quandoUsar: 'Para proteger arquivo sensível em disco externo que pode ser perdido ou levado por terceiro.',
            nivel: 'proteger',
            plataformas: ['Windows', 'macOS', 'Linux'],
            codigoAberto: 'sim',
            licenca: 'Apache 2.0 e licença TrueCrypt 3.0',
            documentacao: 'https://veracrypt.io/en/Documentation.html',
            fonte: 'https://veracrypt.io',
            confianca: 'primaria',
            ultimaVerificacao: ULTIMA_REVISAO,
            status: 'monitorado',
            motivoStatus: 'Projeto ativo, porém herda base de código do TrueCrypt e exige atenção à versão e à origem do instalador.',
            porQueEstaAqui: 'Sucessor direto da ferramenta que a maioria ainda procura pelo nome antigo, e a distinção precisa estar registrada.',
            paginasRelacionadas: [{ label: 'Seed phrase em aço', route: '/autocustodia/seed-phrase-em-aco' }],
          },
          {
            id: 'truecrypt',
            nome: 'TrueCrypt',
            capacidade: 'Criptografia de volume local',
            tipo: 'aplicativo',
            paraQueServe: 'Ferramenta histórica de criptografia de volume, descontinuada pelos próprios autores em 2014.',
            quandoUsar: 'Não usar. Consta aqui apenas para fechar a dúvida de quem encontra o nome em tutorial antigo.',
            nivel: 'entender',
            plataformas: ['Histórico'],
            codigoAberto: 'parcialmente',
            licenca: 'Licença TrueCrypt 3.0',
            documentacao: 'https://veracrypt.io/en/Documentation.html',
            fonte: 'https://veracrypt.io',
            confianca: 'secundaria',
            ultimaVerificacao: ULTIMA_REVISAO,
            status: 'retirado',
            motivoStatus: 'Descontinuado pelos autores, sem correção de segurança desde 2014. Substituído pelo VeraCrypt.',
            porQueEstaAqui: 'Tutorial desatualizado continua circulando. Registrar o que saiu de circulação é parte da curadoria.',
            paginasRelacionadas: [{ label: 'Backup de seed phrase', route: '/autocustodia/backup-seed-phrase-guia' }],
          },
          {
            id: 'syncthing',
            nome: 'Syncthing',
            capacidade: 'Sincronização sem servidor central',
            tipo: 'aplicativo',
            paraQueServe: 'Sincroniza pastas diretamente entre aparelhos, com tráfego criptografado e sem armazenar nada em nuvem de terceiro.',
            quandoUsar: 'Para manter cópia viva de documento entre computador e celular sem depender de provedor.',
            nivel: 'investigar',
            plataformas: ['Windows', 'macOS', 'Linux', 'Android'],
            codigoAberto: 'sim',
            licenca: 'MPL-2.0',
            documentacao: 'https://docs.syncthing.net',
            fonte: 'https://syncthing.net',
            confianca: 'primaria',
            ultimaVerificacao: ULTIMA_REVISAO,
            status: 'verificado',
            motivoStatus: 'Documentação oficial completa e releases regulares.',
            porQueEstaAqui: 'Sincronização própria é infraestrutura autônoma aplicada a arquivo, o mesmo princípio do node próprio aplicado a dado.',
            paginasRelacionadas: [{ label: 'Infraestrutura autônoma', route: '/mapa-da-soberania' }],
          },
        ],
      },
    ],
  },
  {
    id: 'pesquisa',
    titulo: 'Pesquisa e verificação',
    subtitulo: 'Fonte aberta, verificação, arquivamento, metadado',
    descricao: 'Pesquisa legítima sobre informação pública, com foco em verificar antes de acreditar. Nada aqui existe para coletar dado pessoal de terceiro.',
    capacidades: [
      {
        id: 'verificar-conteudo',
        pergunta: 'Quero verificar se aquilo que recebi é verdade.',
        titulo: 'Verificação e arquivamento de evidência',
        descricao: 'Antes de compartilhar, três perguntas: qual é a fonte primária, quando aquilo foi publicado, e o que restou registrado quando a página mudou.',
        recursos: [
          {
            id: 'wayback-machine',
            nome: 'Wayback Machine',
            capacidade: 'Arquivamento e recuperação de página',
            tipo: 'serviço',
            paraQueServe: 'Consulta versões antigas de páginas e permite salvar o estado atual de um endereço como registro datado.',
            quandoUsar: 'Quando um site muda ou apaga conteúdo e você precisa provar o que estava publicado.',
            nivel: 'investigar',
            plataformas: ['Web'],
            codigoAberto: 'parcialmente',
            licenca: 'Serviço de organização sem fins lucrativos',
            documentacao: 'https://help.archive.org/help/wayback-machine-general-information/',
            fonte: 'https://web.archive.org',
            confianca: 'primaria',
            ultimaVerificacao: ULTIMA_REVISAO,
            status: 'verificado',
            motivoStatus: 'Serviço público da Internet Archive, documentação oficial conferida.',
            porQueEstaAqui: 'Boa parte das teses do site depende de documento público que pode sumir. Arquivar é parte do método.',
            paginasRelacionadas: [{ label: 'Confisco de 1990', route: '/confisco-1990' }],
          },
          {
            id: 'exiftool',
            nome: 'ExifTool',
            capacidade: 'Leitura e remoção de metadado',
            tipo: 'utilitário',
            paraQueServe: 'Lê, edita e remove metadado de imagem, vídeo e documento, incluindo coordenadas, aparelho e data.',
            quandoUsar: 'Para limpar metadado antes de publicar uma foto sua, e para verificar a procedência de um arquivo recebido.',
            nivel: 'investigar',
            plataformas: ['Windows', 'macOS', 'Linux'],
            codigoAberto: 'sim',
            licenca: 'Perl Artistic License e GPL',
            documentacao: 'https://exiftool.org/exiftool_pod.html',
            fonte: 'https://exiftool.org',
            confianca: 'primaria',
            ultimaVerificacao: ULTIMA_REVISAO,
            status: 'verificado',
            motivoStatus: 'Projeto mantido pelo autor original, documentação de referência publicada.',
            porQueEstaAqui: 'A foto que você publica costuma revelar mais do que o texto que você escreve, e isso vale dos dois lados da verificação.',
            paginasRelacionadas: [{ label: 'iPhone é seguro mesmo?', route: '/seguranca-mobile/iPhone-e-seguro-mesmo' }],
          },
          {
            id: 'crtsh',
            nome: 'crt.sh',
            capacidade: 'Consulta de certificados públicos',
            tipo: 'serviço',
            paraQueServe: 'Consulta registros públicos de transparência de certificados, mostrando quais certificados foram emitidos para um domínio.',
            quandoUsar: 'Para conferir se um site que se apresenta como oficial tem histórico de certificado compatível com o domínio real.',
            nivel: 'investigar',
            plataformas: ['Web'],
            codigoAberto: 'sim',
            licenca: 'Serviço público sobre dados de Certificate Transparency',
            documentacao: 'https://certificate.transparency.dev/howctworks/',
            fonte: 'https://crt.sh',
            confianca: 'secundaria',
            ultimaVerificacao: ULTIMA_REVISAO,
            status: 'monitorado',
            motivoStatus: 'Interface mantida por uma autoridade certificadora, com disponibilidade variável.',
            porQueEstaAqui: 'Clone de corretora e de banco é o golpe mais caro do público brasileiro, e transparência de certificado é dado público de verificação.',
            paginasRelacionadas: [{ label: 'Blindagem contra golpes', route: '/blindagem-golpes' }],
          },
        ],
      },
    ],
  },
];

export interface Kit {
  id: string;
  titulo: string;
  objetivo: string;
  etapas: { passo: string; detalhe: string }[];
}

export const KITS: Kit[] = [
  {
    id: 'kit-privacidade-mobile',
    titulo: 'Kit Privacidade Mobile',
    objetivo: 'Reduzir a coleta de dado feita pelo aparelho que você carrega o dia inteiro.',
    etapas: [
      { passo: 'Entenda a ameaça', detalhe: 'Perfilamento acontece por permissão concedida e identificador de anúncio, não por microfone secreto.' },
      { passo: 'Revise permissões', detalhe: 'Localização, microfone, câmera e arquivos, um aplicativo por vez, começando pelos que você não abre há meses.' },
      { passo: 'Escolha a camada de rede', detalhe: 'DNS filtrado primeiro, VPN só onde ela realmente resolve, com clareza sobre o que ela não faz.' },
      { passo: 'Considere trocar o sistema', detalhe: 'Só com hardware compatível e disposição para manter o aparelho atualizado por conta própria.' },
      { passo: 'Leia a fonte oficial', detalhe: 'Documentação do projeto antes de qualquer tutorial de rede social.' },
    ],
  },
  {
    id: 'kit-seguranca-contas',
    titulo: 'Kit Segurança de Contas',
    objetivo: 'Tirar sua vida financeira digital do alcance de phishing e de troca de chip.',
    etapas: [
      { passo: 'Cofre de senha', detalhe: 'Um cofre, uma senha-mestra forte, senhas únicas geradas para cada serviço.' },
      { passo: 'Segundo fator fora do SMS', detalhe: 'Aplicativo de código temporário com backup exportável, chave física nas contas críticas.' },
      { passo: 'Email como infraestrutura', detalhe: 'Email principal separado, protegido por chave física, nunca usado em cadastro comum.' },
      { passo: 'Alias por serviço', detalhe: 'Endereço descartável por cadastro, para isolar vazamento e identificar a origem.' },
      { passo: 'Plano de recuperação', detalhe: 'Códigos de recuperação impressos e guardados fora do aparelho, testados uma vez.' },
    ],
  },
  {
    id: 'kit-pesquisa',
    titulo: 'Kit Pesquisa e Verificação',
    objetivo: 'Checar informação antes de repassar, com registro do que foi visto.',
    etapas: [
      { passo: 'Localize a fonte primária', detalhe: 'Documento oficial, publicação original, repositório do projeto. Lista e blog servem para descobrir, não para provar.' },
      { passo: 'Datar', detalhe: 'Quando aquilo foi publicado e o que mudou desde então.' },
      { passo: 'Arquivar', detalhe: 'Salvar o estado da página no momento da consulta, para o caso de o conteúdo sair do ar.' },
      { passo: 'Conferir o arquivo', detalhe: 'Metadado de imagem e documento revela aparelho, data e às vezes local.' },
      { passo: 'Cruzar', detalhe: 'Duas fontes independentes antes de tratar qualquer coisa como fato.' },
    ],
  },
];

export const FONTES_DESCOBERTA = [
  { nome: 'The Book of Secret Knowledge', papel: 'Coleção aberta de listas, manuais e utilitários, licença MIT. Usada aqui apenas como ponto de partida para encontrar candidatos.', url: 'https://github.com/trimstray/the-book-of-secret-knowledge' },
  { nome: 'Documentação oficial dos projetos', papel: 'Base de toda ficha publicada. Nenhum recurso entra sem documentação pública conferida.', url: '' },
  { nome: 'Auditorias independentes publicadas', papel: 'Complemento para avaliar promessa de segurança que o próprio projeto faz.', url: '' },
];

export const TOTAL_RECURSOS = DIMENSOES.reduce(
  (acc, d) => acc + d.capacidades.reduce((a, c) => a + c.recursos.length, 0),
  0,
);
