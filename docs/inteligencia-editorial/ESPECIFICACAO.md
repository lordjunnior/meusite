# Sistema de Inteligência Editorial da Biblioteca

Especificação funcional e técnica. Versão 1.0. Nenhuma linha de produto deve ser
codificada antes desta especificação ser aprovada.

Princípio fundador: o sistema não responde "qual palavra-chave usar". Ele responde
"o que as pessoas tentam aprender, resolver ou descobrir que a biblioteca ainda não
responde adequadamente".

O OpenSEO é uma fonte de sinal dentro do sistema, não o sistema.

---

## 0. Escopo e não escopo

Escopo:
- Coletar demanda real (Search Console, busca interna, perguntas humanas, tendências públicas).
- Interpretar intenção por trás de cada consulta.
- Comparar a intenção contra o acervo real de páginas.
- Classificar o tipo de lacuna, ou declarar que não existe lacuna.
- Aplicar guardrails editoriais e de risco antes de sugerir qualquer coisa.
- Priorizar com um Índice de Oportunidade explicável.
- Entregar um briefing editorial pronto para produção.
- Medir o resultado em 30, 60 e 90 dias e aprender com ele.

Não escopo (v1):
- Geração automática de página publicada. O sistema propõe, o humano aprova e escreve.
- Julgamento de qualidade editorial subjetiva. O sistema mede cobertura de intenção, não mérito.
- Substituir o Método Pentágono. O motor detecta; o Pentágono transforma.

---

## 1. Arquitetura em sete motores

```text
FONTES            01 DEMAND ENGINE      coleta e normaliza a demanda bruta
   |
   v
SEMÂNTICA         02 INTENT ENGINE      decompõe query em intenção estruturada
   |
   v
ACERVO            03 COVERAGE ENGINE    compara intenção contra as páginas reais
   |
   v
DIAGNÓSTICO       04 GAP ENGINE         classifica: coberto, disfarçada, profundidade,
   |                                     ponte, anti-lacuna
   v
FREIO             05 EDITORIAL GUARD    regras, posicionamento, risco semântico, YMYL
   |
   v
FILA              06 OPPORTUNITY ENGINE score, confiança, urgência, ordenação
   |
   v
MEMÓRIA           07 LEARNING LOOP      mede 30/60/90 dias e recalibra pesos
```

Cada motor é uma função pura sobre dados persistidos. Nenhum motor chama o próximo
diretamente: o pipeline é orquestrado, o que permite reprocessar qualquer etapa sem
recoletar nada e auditar o estado intermediário.

---

## 2. Modelo de dados

Banco: Lovable Cloud (Postgres). Todas as tabelas em `public`, com RLS e GRANT
explícitos, leitura restrita a administradores (`has_role(auth.uid(),'admin')`),
escrita apenas por edge functions com service role.

### 2.1 Entidades TypeScript canônicas

```ts
// ---------- 01 Demanda ----------
export type DemandSource =
  | "gsc"            // Google Search Console
  | "internal"       // GlobalSearch.tsx
  | "human"          // pergunta real recebida
  | "trend";         // autocomplete, People Also Ask, tendências

export interface DemandSignal {
  id: string;
  source: DemandSource;
  query: string;              // texto cru, como digitado
  normalizedQuery: string;    // lowercase, sem acento, sem stopword
  locale: "pt-BR";
  capturedAt: string;         // ISO
  periodStart: string;
  periodEnd: string;
  metrics: {
    impressions?: number;     // gsc
    clicks?: number;          // gsc
    ctr?: number;             // gsc
    position?: number;        // gsc
    internalSearches?: number;// busca interna
    zeroResult?: boolean;     // busca interna sem resultado clicado
    occurrences?: number;     // perguntas humanas repetidas
    trendIndex?: number;      // 0..100
  };
  landingPath?: string;       // página que recebeu o clique, quando houver
  raw: unknown;               // payload original, para auditoria
}

// ---------- 02 Intenção ----------
export type IntentStage = "Despertar" | "Entender" | "Blindar" | "Operar" | "Transmitir";
export type IntentKind =
  | "definicao" | "diagnostico" | "procedimento" | "comparacao"
  | "decisao" | "risco" | "legal" | "ferramenta" | "navegacional";

export interface IntentNode {
  id: string;                 // "recuperar-bitcoin.perdi-a-seed"
  parentId?: string;          // permite o mapa em árvore
  label: string;              // "Perdi a seed"
  question: string;           // pergunta na voz do usuário
  entity: string[];           // ["Bitcoin", "seed phrase"]
  problem: string;            // "perda de acesso"
  kind: IntentKind;
  stage: IntentStage;
  silo: string;               // rótulo do silo em sidebarNavigation.ts
  riskLevel: "baixo" | "medio" | "alto";
  embedding: number[];        // 1536 dims, pgvector
  signalIds: string[];        // demanda que alimentou este nó
  createdAt: string;
  reviewedBy?: string;        // humano que validou a decomposição
}

// ---------- 03 Cobertura ----------
export interface PageFingerprint {
  path: string;
  title: string;
  silo: string;
  stage?: IntentStage;
  wordCount: number;
  headings: string[];         // H2/H3 extraídos no build
  primaryKeyword?: string;    // seoData.ts
  lsi: string[];
  tags: string[];             // searchData.ts
  embedding: number[];        // do conjunto título + headings + resumo
  updatedAt: string;
  publishedAt: string;
}

export interface CoverageMatch {
  intentId: string;
  path: string;
  semanticScore: number;      // 0..1 cosseno
  focusScore: number;         // 0..1 quanto a intenção é o ASSUNTO da página
  answerScore: number;        // 0..1 a página resolve, não só cita
  verdict: "responde" | "menciona" | "tangencia" | "irrelevante";
  evidence: string[];         // headings ou trechos que sustentam o veredito
}

// ---------- 04 Lacuna ----------
export type GapType =
  | "coberto"
  | "lacuna_disfarcada"
  | "lacuna_profundidade"
  | "lacuna_ponte"
  | "anti_lacuna";

export interface GapDiagnosis {
  id: string;
  rootIntentId: string;
  childIntentIds: string[];
  type: GapType;
  coveredIntentIds: string[];
  uncoveredIntentIds: string[];
  coverageRatio: number;            // 0..1
  cannibalizationPaths?: string[];  // anti-lacuna
  bridgeSilos?: string[];           // lacuna de ponte
  expandTargetPath?: string;        // lacuna de profundidade
  explanation: string[];            // frases auditáveis, uma por critério
}

// ---------- 05 Guardrail ----------
export interface GuardVerdict {
  gapId: string;
  passed: boolean;
  blockedBy?: string[];             // ids de regra
  semanticRisk: "nenhum" | "medio" | "alto";
  requiredAngle?: string;           // ângulo editorial obrigatório
  mandatoryDisclaimers: string[];
  notes: string[];
}

// ---------- 06 Oportunidade ----------
export interface OpportunityScore {
  total: number;                    // 0..100
  components: Record<string, { value: number; weight: number; reason: string }>;
  confidence: "alta" | "media" | "baixa";
  confidenceReasons: string[];
  urgency: "agora" | "trimestre" | "observar";
}

export interface EditorialBriefing {
  id: string;
  gapId: string;
  status: "proposta" | "aprovada" | "recusada" | "em_producao" | "publicada" | "medindo" | "fechada" | "reaberta";
  score: OpportunityScore;
  suggestedTitle: string;
  suggestedPath: string;
  angle: string;
  problemStatement: string;
  intentChecklist: { intentId: string; label: string; covered: boolean }[];
  seo: {
    primaryKeyword: string;
    variations: string[];
    schemaType: string;
    canonical: string;
  };
  internalLinks: { path: string; reason: string }[];
  cta: { text: string; targetPath: string; rationale: string };
  pentagon: {
    ctr: string;      // por que o título gera clique legítimo
    pnl: string;      // percepção trabalhada, sem fabricar medo
    da: string;       // direção de arte, 6 imagens, hero 88vh
  };
  createdAt: string;
  decidedBy?: string;
  decidedAt?: string;
}

// ---------- 07 Aprendizado ----------
export interface OutcomeMeasurement {
  briefingId: string;
  publishedPath: string;
  publishedAt: string;
  checkpoint: 30 | 60 | 90;
  before: { impressions: number; clicks: number; position: number; internalZeroResults: number };
  after: { impressions: number; clicks: number; position: number; internalZeroResults: number };
  intentSatisfied: boolean;
  diagnosisIfFailed?:
    | "arquitetura" | "link_interno" | "titulo" | "intencao_incorreta"
    | "concorrencia" | "autoridade" | "indexacao" | "qualidade_resposta";
  weightAdjustments?: Record<string, number>;
}
```

### 2.2 Tabelas

| Tabela | Conteúdo | Chave |
| --- | --- | --- |
| `demand_signals` | DemandSignal | `id` |
| `intent_nodes` | IntentNode, com `embedding vector(1536)` | `id` |
| `page_fingerprints` | PageFingerprint, regenerada a cada build | `path` |
| `coverage_matches` | CoverageMatch | `(intent_id, path)` |
| `gap_diagnoses` | GapDiagnosis | `id` |
| `guard_verdicts` | GuardVerdict | `gap_id` |
| `editorial_briefings` | EditorialBriefing | `id` |
| `outcome_measurements` | OutcomeMeasurement | `(briefing_id, checkpoint)` |
| `engine_runs` | log de cada execução de motor, entrada, saída, duração, versão | `id` |
| `scoring_weights` | pesos vigentes e histórico de calibração | `version` |

Índices: `ivfflat` em `intent_nodes.embedding` e `page_fingerprints.embedding`;
índice único em `demand_signals (source, normalized_query, period_start)` para
idempotência de coleta.

---

## 3. Motor 01, Demand Engine

Função: transformar quatro fontes heterogêneas em `DemandSignal` comparável.

| Fonte | Como entra | Frequência | Peso bruto |
| --- | --- | --- | --- |
| Search Console | API oficial, dimensões query + page + date | diária, janela de 28 dias | alto |
| Busca interna | `GlobalSearch.tsx` passa a registrar termo, se houve clique e em qual resultado | tempo real | altíssimo quando há zero resultado |
| Perguntas humanas | formulário, comentários, mensagens, colados manualmente no painel | contínua | altíssimo por unidade |
| Tendências | autocomplete e People Also Ask coletados por edge function | semanal | baixo, só confirma |

Regras:
- Normalização: minúsculas, remoção de acento, stopwords PT-BR, deduplicação por raiz.
- Consultas de marca ("lord junnior") são marcadas como `navegacional` e não geram lacuna.
- Nenhum dado pessoal é armazenado. A busca interna grava apenas o termo, o carimbo de
  tempo e o resultado clicado, sem identificador de usuário.
- Sinal só entra no pipeline se `impressions >= 20` ou `internalSearches >= 3` ou
  `occurrences >= 1` para perguntas humanas.

### 3.1 Instrumentação da busca interna

Alteração mínima em `GlobalSearch.tsx`: ao fechar a busca, enviar
`{ term, resultCount, clickedPath | null }` para uma edge function. Esse é o sinal mais
valioso do sistema porque vem de quem já está dentro da biblioteca e não encontrou
o que queria.

---

## 4. Motor 02, Intent Engine

Função: decompor uma consulta curta em uma árvore de intenções distintas.

Pipeline por consulta:
1. Agrupamento semântico das consultas próximas (cosseno acima de 0,86) em um cluster.
2. Chamada ao modelo com saída estruturada estrita, produzindo o nó raiz e os filhos.
3. Enriquecimento com embedding de cada nó.
4. Fila de revisão humana: toda árvore nova entra como `reviewedBy: null` e só é usada
   em diagnóstico depois de aprovada no painel. Isso impede que alucinação vire pauta.

Exemplo canônico, "recuperar bitcoin perdido":

```text
RECUPERAR BITCOIN PERDIDO            diagnostico | Blindar | Autocustódia | risco alto
├── perdi a seed                      irrecuperável na maioria dos casos
├── esqueci a passphrase              parcialmente atacável, com limites
├── a carteira não abre               software, não perda de chave
├── backup existe mas não funciona    derivation path, formato, versão
├── enviei para o endereço errado     definitivo, salvo se destinatário conhecido
├── perdi acesso a exchange           custódia de terceiro, caminho jurídico
├── fui vítima de golpe               caminho legal e forense, não técnico
├── encontrei uma seed antiga         varredura de derivation paths
└── contratar serviço de recuperação  vetor de golpe secundário, risco alto
```

O prompt do modelo é versionado em repositório e o `engine_runs` guarda a versão usada
em cada nó, para que uma mudança de prompt seja rastreável.

---

## 5. Motor 03, Coverage Engine

Função: para cada `IntentNode`, decidir se o acervo responde.

Fonte do acervo: `page_fingerprints`, gerada em build por um script que percorre
`src/pages/**`, extrai H1/H2/H3, contagem de palavras e cruza com `seoData.ts`,
`searchData.ts` e `sidebarNavigation.ts`. Essa etapa é determinística e não usa IA.

Três notas independentes:
- `semanticScore`: cosseno entre embedding da intenção e da página.
- `focusScore`: a intenção aparece no H1, no título SEO ou na `primaryKeyword`? Se
  aparece só em parágrafo interno, a nota cai. É o que distingue "menciona" de "responde".
- `answerScore`: o modelo recebe apenas os headings e o trecho relevante e responde se a
  página resolve a pergunta como assunto principal, com citação de evidência obrigatória.

Veredito:

| Condição | Veredito |
| --- | --- |
| focus >= 0,7 e answer >= 0,7 | responde |
| semantic >= 0,75 e focus < 0,7 | menciona |
| semantic entre 0,6 e 0,75 | tangencia |
| abaixo disso | irrelevante |

---

## 6. Motor 04, Gap Engine

Classificação determinística a partir dos vereditos de cobertura da árvore inteira.

| Tipo | Condição | Ação recomendada |
| --- | --- | --- |
| Coberto | todos os nós com "responde" | nenhuma |
| Lacuna disfarçada | raiz "menciona" em N páginas, nenhuma "responde" | nova página ou reformulação |
| Lacuna de profundidade | raiz "responde", mas `coverageRatio` dos filhos abaixo de 0,6 | expandir a página existente |
| Lacuna de ponte | filhos cobertos, mas em silos diferentes e sem link entre eles | página central de conexão e links |
| Anti-lacuna | duas ou mais páginas com "responde" para a mesma intenção | consolidar, redirecionar ou separar intenções |

A anti-lacuna tem precedência sobre todas as outras. Se o sistema detecta canibalização,
ele nunca sugere criar. Ele sugere consertar.

Toda classificação carrega `explanation`, uma lista de frases auditáveis do tipo
"o termo recuperação aparece em 12 páginas, nenhuma com foco em perda de acesso".

### 6.1 Content Gap contra Knowledge Gap

- Content Gap: falta uma página. Saída: criar.
- Knowledge Gap: a página existe, mas a arquitetura interna dela não cobre as sub-intenções.
  Saída: expandir a estrutura da página, não criar outra.

Exemplo de Knowledge Gap: "como deixar Bitcoin para meus filhos". Existe página de herança,
mas faltam seed, multisig, documentação, instruções, sucessão, exposição, recuperação.
O sistema propõe um sumário novo para a página existente, não uma página nova.

---

## 7. Motor 05, Editorial Guard

Veto antes de qualquer sugestão chegar ao painel. Regras versionadas em código, cada uma
com id estável e teste unitário.

| Id | Regra | Efeito |
| --- | --- | --- |
| `GUARD-POSITION-01` | nada que exija promover altcoin | bloqueio total |
| `GUARD-POSITION-02` | nada que dilua a tese de soberania para ganhar alcance | bloqueio |
| `GUARD-YMYL-01` | tema de saúde ou finanças exige disclaimers e fontes | exige, não bloqueia |
| `GUARD-RISK-01` | consulta com promessa implícita de resultado, como "recuperar bitcoin perdido" | força ângulo de limite real |
| `GUARD-RISK-02` | consulta que induz o leitor a um vetor de golpe, como "serviço de recuperação" | ângulo obrigatório de alerta |
| `GUARD-CANNIBAL-01` | anti-lacuna detectada | proíbe sugestão de criação |
| `GUARD-VOLUME-01` | mais de 4 propostas abertas no mesmo silo | enfileira, não propõe |
| `GUARD-FREEZE-01` | congelamento editorial ativo, por exemplo período de indexação | tudo vira "observar" |
| `GUARD-STYLE-01` | título proposto com sensacionalismo enganoso | reescreve o ângulo |

Sobre sensacionalismo: o sistema busca tensão real, nunca promessa falsa. A tensão legítima
do caso exemplo é "o que ainda pode ser recuperado e o que já é definitivo". Isso gera CTR
sem enganar, e é exatamente o que o `GUARD-RISK-01` força.

---

## 8. Motor 06, Opportunity Engine

### 8.1 Índice de Oportunidade, 0 a 100

Métrica operacional, não nota de qualidade. Soma ponderada normalizada:

| Componente | Peso inicial | Origem |
| --- | --- | --- |
| Demanda externa | 18 | impressões e consultas distintas no GSC |
| Demanda interna | 16 | buscas internas, com bônus para zero resultado |
| Perguntas humanas | 12 | ocorrências reais |
| Ausência de cobertura | 15 | 1 menos `coverageRatio` |
| Relevância para o silo | 10 | proximidade ao pilar do silo |
| Relevância para a jornada | 8 | estágio do funil de soberania |
| Posição atual | 7 | ganho potencial entre posições 5 e 20 |
| Urgência contextual | 6 | mudança regulatória, evento, sazonalidade |
| Dificuldade | menos 10 | concorrência e autoridade exigida |
| Risco de canibalização | menos 12 | proximidade com páginas existentes |

Cada componente é persistido com `value`, `weight` e `reason`. O painel exibe a conta,
nunca só o número. Um score sem explicação é proibido.

### 8.2 Nível de confiança

Calculado separadamente do score, porque demanda alta com evidência fraca é ruído.

Confiança ALTA exige, no mínimo: 6 consultas distintas, 1.500 impressões no período,
ao menos 1 sinal interno ou humano, e intenção consistente entre as fontes.
Confiança BAIXA: fonte única, interpretação ambígua, nenhum sinal interno.
O painel ordena por score, mas nunca mostra uma proposta de confiança baixa acima
de uma de confiança alta.

### 8.3 Critérios para não recomendar nada

O sistema deve ser capaz de dizer "não faça nada". Ele não recomenda quando:
- a cobertura já responde a todas as sub-intenções;
- a confiança é baixa e o risco editorial é alto;
- existe anti-lacuna não resolvida no mesmo cluster;
- há congelamento editorial ativo;
- o custo de produção estimado supera o ganho projetado de tráfego qualificado.

Um painel que sempre tem sugestão é um painel que inventa trabalho.

---

## 9. Motor 07, Learning Loop

Ao publicar a página vinculada a um briefing, o sistema registra a linha de base e agenda
medições em 30, 60 e 90 dias.

Critério de lacuna fechada: as consultas do cluster entram nas posições 1 a 10, o CTR
melhora contra a linha de base e as buscas internas com zero resultado para o tema caem
a zero. Os três precisam ocorrer.

Se não fechar, o painel obriga a escolha de um diagnóstico entre arquitetura, link interno,
título, intenção incorreta, concorrência, autoridade, indexação e qualidade da resposta.
Esse diagnóstico alimenta `scoring_weights`: por exemplo, se "intenção incorreta" se repete,
o peso da revisão humana no Intent Engine sobe e o limiar de confiança aumenta.

Calibração dos pesos ocorre no máximo uma vez por trimestre, com registro de versão e
possibilidade de reversão.

---

## 10. Integração com o que já existe

| Arquivo | Papel no sistema |
| --- | --- |
| `src/lib/sidebarNavigation.ts` | fonte da verdade dos silos e da ordem das páginas |
| `src/lib/trail.ts` | posição da página na trilha, alimenta relevância de jornada |
| `src/lib/searchData.ts` | tags e categoria por página, entra no fingerprint |
| `src/lib/seoData.ts` | keyword primária, LSI, cluster e links relacionados |
| `src/components/GlobalSearch.tsx` | instrumentação da busca interna, sinal de maior valor |
| `src/lib/site.ts` | domínio canônico único usado na integração com o GSC |
| `scripts/build-sitemap` | mesmo inventário de rotas usado pelo fingerprint |

Nada disso é substituído. O sistema lê esses arquivos e não escreve neles. Quando um
briefing é aprovado e a página nasce, a atualização de `searchData.ts`, `seoData.ts`,
`sidebarNavigation.ts` e sitemap continua sendo parte do checklist de publicação.

---

## 11. Integração com o Search Console

- Autenticação por conta de serviço, credencial guardada como segredo do backend.
- Coleta diária das dimensões `query`, `page` e `date`, janela móvel de 28 dias.
- Guardar sempre o período, porque o GSC reprocessa dados por até 3 dias.
- Nenhuma chamada ao GSC a partir do navegador.
- Pré-requisito operacional: propriedade verificada para `lordjunnior.com.br` e sitemap
  enviado. Enquanto isso não existir, o Demand Engine opera apenas com busca interna,
  perguntas humanas e tendências, e o painel exibe esse estado com clareza.

---

## 12. Painel

Rota administrativa protegida, `/admin/inteligencia`, invisível na navegação pública,
fora do sitemap, com `noindex`.

Estrutura, sem gráfico decorativo:

```text
INTELIGÊNCIA DA BIBLIOTECA
217 páginas   14 silos   X intenções monitoradas
X lacunas abertas   X em revisão   X fechadas

OPORTUNIDADES
01  Recuperação de Bitcoin        lacuna disfarçada    87    confiança alta
02  Herança e multisig            lacuna profundidade  71    confiança alta
03  Bitcoin perdido e imposto     lacuna de ponte      64    confiança média

ATENÇÃO
3 possíveis canibalizações

MAPA DE COBERTURA, AUTOCUSTÓDIA
Autocustódia          ██████████████████░░
Hardware wallets      ████████████████░░░░
Seed                  ██████████████░░░░░░
Herança               ██████████░░░░░░░░░░
Recuperação após perda █████░░░░░░░░░░░░░░░

FECHADAS
7 lacunas resolvidas nos últimos 90 dias
```

Cada linha abre o briefing completo com a conta do score, as evidências e os botões
aprovar, recusar e adiar. Recusar exige motivo, que também alimenta o Learning Loop.

Direção de arte do painel segue a paleta sand, teal e copper do site, hierarquia
tipográfica editorial, sem gráfico colorido decorativo e sem ícone colorido.

---

## 13. Exemplo completo, o caso canônico

```text
LACUNA DE CONTEÚDO

Consulta principal     como recuperar bitcoin perdido
Intenção               diagnóstico e possibilidade de recuperação
Silo                   Autocustódia e Segurança
Fase                   Blindar
Tipo                   lacuna disfarçada
Cobertura atual        parcial, 4 de 9 sub-intenções
Oportunidade           87 de 100
Confiança              alta
Risco editorial        alto

O PROBLEMA
O termo recuperação aparece em 12 páginas, nenhuma com foco na situação de perda de acesso.

COBERTO
backup da seed, recuperação de carteira, passphrase, golpes

NÃO COBERTO
bitcoin enviado para endereço errado, diagnóstico de perda de acesso,
limites reais de recuperação, serviços de recuperação como vetor de golpe, seed antiga

ÂNGULO OBRIGATÓRIO (GUARD-RISK-01)
Diferenciar o que ainda é recuperável do que é definitivo. Proibido sugerir que uma
chave perdida pode ser recuperada.

TÍTULO SUGERIDO
Recuperação de Bitcoin: o que é possível e o que não é

SEO
primária      como recuperar bitcoin perdido
variações     bitcoin perdido tem recuperação, perdi minha seed bitcoin,
              esqueci a senha da carteira bitcoin, recuperação de carteira bitcoin
schema        FAQPage mais TechArticle

LINKS OBRIGATÓRIOS
BlindagemGolpes, BackupSeedPhraseGuia, HerancaBitcoin

CTA
Antes de tentar recuperar qualquer coisa, descubra primeiro se você realmente perdeu o
acesso ou apenas perdeu o caminho até a sua carteira.
Destino: diagnóstico de perda de acesso, dentro da própria página.

PENTÁGONO
CTR   a tensão é real, entre o recuperável e o definitivo, sem promessa
PNL   reconhecimento do estado emocional de quem perdeu acesso, depois ordem e método
DA    hero 88vh, seis imagens contextuais, diagrama do fluxo de diagnóstico
```

---

## 14. Permissões, logs e explicabilidade

- Leitura do painel e das tabelas: apenas `admin`, via `has_role`.
- Escrita: apenas edge functions com service role. O navegador nunca escreve diagnóstico.
- `engine_runs` guarda entrada, saída, versão do motor, versão do prompt, duração e custo.
- Toda recomendação carrega a lista de critérios que a produziram. Uma recomendação sem
  rastro é tratada como defeito, não como resultado.
- Retenção: sinais brutos por 24 meses, diagnósticos por tempo indeterminado.
- LGPD: nenhum identificador pessoal em `demand_signals`. Perguntas humanas entram
  anonimizadas, sem nome, e-mail ou telefone.

---

## 15. Fases de entrega

| Fase | Entrega | Depende de |
| --- | --- | --- |
| 0 | esta especificação aprovada | decisão do usuário |
| 1 | `page_fingerprints` gerado no build, sem IA, mais o Mapa de Cobertura estático | nada |
| 2 | instrumentação da busca interna e primeiras lacunas por sinal interno | fase 1 |
| 3 | Intent Engine com revisão humana obrigatória | fase 2 |
| 4 | integração Search Console | propriedade verificada |
| 5 | Editorial Guard, Opportunity Engine e painel completo | fase 3 |
| 6 | Learning Loop 30/60/90 | primeira página publicada pelo fluxo |

A fase 1 já entrega valor sozinha: mostra onde a biblioteca está forte e onde está oca,
sem depender de nenhuma integração externa.

---

## 16. Decisões pendentes do usuário

1. Aprovar ou ajustar os cinco tipos de lacuna e a precedência da anti-lacuna.
2. Aprovar os pesos iniciais do Índice de Oportunidade.
3. Confirmar que toda árvore de intenção passa por revisão humana antes de virar pauta.
4. Confirmar o registro de termos de busca interna, sem identificador de usuário.
5. Definir se começamos pela fase 1 ou se esperamos o Search Console verificado.
