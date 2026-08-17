# Auditoria da página Nostr (/o-que-e-nostr) e plano de elevação

A base está boa: paleta clara sand + teal + violeta, alternância de blocos, hero 88vh, 7 capítulos, FAQ com 8 perguntas e schema, "Continue sua trilha" com 3 links. Ou seja, passa no padrão editorial. Mas existem falhas graves e oportunidades perdidas.

## 1. Correção urgente (está no ar agora)

No bloco de fechamento existe um texto de rascunho visível ao público:
"[Espaço reservado para sua frase de impacto de fechamento, no seu estilo autoral]".

Substituir por uma frase autoral forte de fechamento, no tom de operador, sem travessão.

## 2. O que falta (criar)

1. **Seu perfil no Nostr.** A página inteira ensina o protocolo e não oferece o passo mais óbvio: seguir você lá. Criar um bloco dedicado com seu npub, botão copiar, QR code e link direto para Primal. Esse é o CTA de maior conversão da página e hoje ele não existe.
2. **Capítulo de limitações honestas.** Hoje a página só vende o Nostr. Faltam: relays também podem filtrar conteúdo, spam e golpe são reais, descoberta de perfis ainda é fraca, e perder a nsec é irreversível. Isso aumenta autoridade e evita frustração.
3. **Glossário rápido npub / nsec / relay / zap / NIP.** Cartões curtos, antes do checklist. Também serve como isca de snippet no Google.
4. **Bloco de segurança da chave.** Regras diretas: nsec nunca em site, uso de extensão de assinatura (Amber no Android, nos2x no desktop), papel físico. Encaixa como alerta visual dentro do Capítulo 03.
5. **Índice flutuante (TOC)** com progresso de leitura e barra de scroll, padrão já usado em outras páginas pesadas.
6. **Tempo de leitura + botões de compartilhar** no topo do conteúdo.
7. **Captura de lead inline** após o Capítulo 06, no ponto de maior interesse.
8. **Tabela comparativa em mobile.** Hoje ela vira rolagem horizontal, que é ruim. Virar cartões empilhados abaixo de md.

## 3. O que mudaria

- **Imagens genéricas.** Todas as imagens são reaproveitadas de outras páginas (blockchain, comunicação mesh, lightning). Gerar de 4 a 5 imagens cinematográficas próprias da página: malha de relays iluminada, chave física sobre papel, celular com zap saindo em brasa, servidor doméstico, tela apagada de rede desligada.
- **Hero.** A frase de gancho está em três blocos de texto seguidos, o que dilui. Reduzir para título + um parágrafo + linha de promessa, e adicionar 3 selos de dado rápido (2020, milhares de relays, sem dono).
- **Capítulo 02 (Problema).** Trocar "Quatro dores" por uma abertura mais concreta ancorada no bloqueio de 2024 no Brasil, com números.
- **Checklist.** Transformar em passo a passo numerado com tempo estimado por etapa e nomes de app clicáveis.
- **Título SEO.** Alinhar o H1 e o title com a palavra-chave forte "Nostr" no início, mantendo o gancho "que ninguém desliga".

## 4. O que tiraria

- O parágrafo violeta em caixa alta do hero (linha de promessa em uppercase) fica pesado. Vira texto normal com destaque leve.
- A curiosidade do latim "noster" no Capítulo 01 pode sair do corpo principal e virar nota lateral, para não quebrar o ritmo do argumento.
- Repetição da analogia torneira/encanamento em três lugares (capítulo 1, pilar 01 e FAQ). Manter apenas no capítulo 1 e na FAQ.

## 5. Detalhes técnicos

- Arquivo: `src/pages/NostrRedeSocialSemCensura.tsx`, rota `/o-que-e-nostr` já registrada na sidebar em "Saída & Infraestrutura".
- Reusar componentes existentes: `PageFloatingToc`, `ReadingTime`, `ShareButtons`, `InlineLeadCapture`, `RiskBlock`, `AlertBox`.
- Novas imagens em `src/assets/nostr/`, importadas como ES6, com alt descritivo, `loading="lazy"` e `decoding="async"`.
- Manter schema Article + FAQPage já presente e acrescentar HowTo no checklist.
- Sem emojis, sem travessão longo, paleta mantida (sand #f4ede4 / #ece2d3, teal #0e3b3a, violeta #8b5cf6).

## 6. Ordem de execução

1. Corrigir o placeholder do fechamento.
2. Blocos novos: perfil Nostr com npub, limitações, glossário, segurança da chave.
3. TOC, tempo de leitura, compartilhar, captura de lead.
4. Geração e troca das imagens próprias.
5. Ajustes de hero, tabela mobile e checklist.

Para o bloco do seu perfil eu preciso do seu npub. Se preferir, deixo o bloco pronto com espaço marcado e você me passa depois.
