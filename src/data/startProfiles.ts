import { EyeOff, Landmark, RadioTower, type LucideIcon } from "lucide-react";

export interface StartProfileStep {
  title: string;
  description: string;
  path: string;
  tag: string;
}

export interface StartProfile {
  id: "confisco" | "mobile" | "no-kyc";
  eyebrow: string;
  title: string;
  description: string;
  outcome: string;
  icon: LucideIcon;
  steps: StartProfileStep[];
}

export const START_PROFILES: StartProfile[] = [
  {
    id: "confisco",
    eyebrow: "Perfil 01",
    title: "Tenho medo de confisco",
    description: "Quero entender o risco e proteger meu patrimônio sem agir por impulso.",
    outcome: "Do contexto histórico à posse real das suas chaves.",
    icon: Landmark,
    steps: [
      { title: "Confisco de 1990", description: "Entenda o precedente brasileiro e o que ele realmente ensina.", path: "/confisco-1990", tag: "CONTEXTO" },
      { title: "O governo pode tomar seus bitcoins?", description: "Separe ameaça concreta, custódia e exagero retórico.", path: "/alertas/governo-tomar-bitcoins", tag: "RISCO REAL" },
      { title: "Autocustódia", description: "Comece a retirar o controle das mãos de intermediários.", path: "/autocustodia", tag: "AÇÃO" },
    ],
  },
  {
    id: "mobile",
    eyebrow: "Perfil 02",
    title: "Quero privacidade no celular",
    description: "Quero reduzir rastreamento, permissões excessivas e dependência de grandes plataformas.",
    outcome: "Primeiro corte de exposição com mudanças executáveis.",
    icon: RadioTower,
    steps: [
      { title: "Checklist de permissões", description: "Revogue os acessos mais invasivos no aparelho que você já usa.", path: "/seguranca-mobile/checklist-permissoes-celular", tag: "AGORA" },
      { title: "Sair do Google sem trocar de aparelho", description: "Reduza dependências por etapas, sem ruptura impraticável.", path: "/seguranca-mobile/sair-do-google-sem-trocar-aparelho", tag: "PRÓXIMO PASSO" },
      { title: "VPN no celular", description: "Saiba quando ajuda, onde falha e quando vira teatro de segurança.", path: "/seguranca-mobile/vpn-no-celular", tag: "MODELO DE AMEAÇA" },
    ],
  },
  {
    id: "no-kyc",
    eyebrow: "Perfil 03",
    title: "Transaciono Bitcoin sem KYC",
    description: "Quero comprar, movimentar e organizar UTXOs sem entregar mais dados do que o necessário.",
    outcome: "Da aquisição privada à higiene on-chain.",
    icon: EyeOff,
    steps: [
      { title: "Comprar Bitcoin com privacidade", description: "Conheça as rotas de aquisição sem cadastro obrigatório.", path: "/comprar-bitcoin-com-privacidade", tag: "ENTRADA" },
      { title: "Bisq: guia completo", description: "Opere uma alternativa P2P descentralizada com método.", path: "/p2p/bisq-guia-completo", tag: "OPERAÇÃO" },
      { title: "CoinJoin e privacidade", description: "Entenda rastreabilidade, UTXOs e os limites da técnica.", path: "/autocustodia/coinjoin-privacidade", tag: "ON-CHAIN" },
    ],
  },
];

export function getStartProfile(id: StartProfile["id"]) {
  return START_PROFILES.find((profile) => profile.id === id);
}