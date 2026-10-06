export interface StalkerwareHotspot {
  id: "accessibility" | "certificates" | "background";
  number: string;
  label: string;
  title: string;
  signal: string;
  path: string;
  why: string;
  position: { x: number; y: number };
}

export const STALKERWARE_HOTSPOTS: StalkerwareHotspot[] = [
  {
    id: "accessibility",
    number: "01",
    label: "Acessibilidade",
    title: "Serviço mascarado como recurso do sistema",
    signal: "Um nome genérico, sem ícone reconhecível, aparece com permissão para ler a tela, observar toques e agir por você.",
    path: "Configurações > Acessibilidade > Serviços instalados ou Apps transferidos por download.",
    why: "A acessibilidade entrega ao aplicativo uma visão ampla da interface. É uma das permissões preferidas por stalkerware porque permite ler conteúdo e automatizar ações sem abrir o app.",
    position: { x: 72, y: 24 },
  },
  {
    id: "certificates",
    number: "02",
    label: "Certificados",
    title: "Autoridade de rede que você não instalou",
    signal: "A lista de credenciais do usuário contém um certificado adicional, com nome desconhecido ou ligado a uma organização que você não reconhece.",
    path: "Configurações > Segurança e privacidade > Mais configurações de segurança > Certificados do usuário.",
    why: "Um certificado instalado manualmente pode ampliar a confiança do aparelho em redes ou serviços controlados por terceiros. Ele não prova espionagem sozinho, mas exige origem e finalidade verificáveis.",
    position: { x: 30, y: 50 },
  },
  {
    id: "background",
    number: "03",
    label: "Segundo plano",
    title: "Consumo persistente quando a tela está apagada",
    signal: "Um aplicativo desconhecido aparece entre os maiores consumidores de bateria ou dados móveis durante horas de repouso.",
    path: "Configurações > Bateria > Uso da bateria e Configurações > Rede e internet > Uso de dados por aplicativo.",
    why: "Capturar localização, áudio e conteúdo e depois transmitir esses registros produz atividade. O consumo isolado não condena um app, mas o padrão recorrente orienta a próxima inspeção.",
    position: { x: 68, y: 76 },
  },
];

export const STALKERWARE_SCAN_STEPS = [
  "Antes de tocar nas configurações, avalie a segurança pessoal. Se a remoção puder alertar um agressor ou aumentar o risco de violência, use outro aparelho para buscar apoio e planeje a resposta primeiro.",
  "Abra Acessibilidade e revise Serviços instalados ou Apps transferidos por download. Anote o nome de todo serviço ativo que você não reconhece antes de desativá-lo.",
  "Revise Apps de administrador do dispositivo, Acesso a notificações, Exibir sobre outros apps, Instalar apps desconhecidos e Acesso de uso. Nenhum app desconhecido deveria controlar essas permissões especiais.",
  "Abra a área de certificados e credenciais do usuário. Registre nome e emissor de certificados adicionais antes de remover qualquer item cuja origem você não consiga confirmar.",
  "Compare o uso de bateria e de dados móveis por aplicativo, incluindo o período em que o aparelho ficou parado. Investigue nomes desconhecidos com atividade persistente em segundo plano.",
  "Revise a lista completa de aplicativos, inclusive os sem ícone ou instalados fora da loja oficial. Cruze cada suspeito com as permissões e os consumos anotados nas etapas anteriores.",
];