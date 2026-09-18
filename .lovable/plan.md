# Consolidação editorial e correção das páginas órfãs

## Objetivo
Resolver os achados sem uma troca visual brusca no site inteiro. A paleta editorial aprovada passa a ser oficial, as fontes recebem funções claras, a página de cobre entra na navegação e a home fecha o ciclo entre ameaça e vida desejada.

## Entregas

### 1. Páginas órfãs e descoberta
- Manter o Gerador de Entropia: ele já é carregado em `/ferramentas/entropy` pela rota dinâmica de Ferramentas e não está órfão.
- Publicar `Cobre.tsx` em `/protocolo-respiratorio/cobre`.
- Criar a entrada necessária para o protocolo respiratório sem inventar páginas vazias: rota, menu lateral, busca, Mapa da Soberania, sitemap e links internos coerentes.
- Corrigir o retorno do layout de protocolo para um endereço que realmente exista.

### 2. Tokens editoriais oficiais
- Preservar os tokens escuros atuais usados pela home e pelo shell para evitar regressão em massa.
- Adicionar tokens semânticos para sand, sand profundo, deep teal, teal claro, terracota e copper claro.
- Expor esses tokens no Tailwind e substituir os hexadecimais do primeiro grupo migrado.
- Adicionar uma trava de auditoria para que páginas editoriais novas não introduzam novamente as cores-base aprovadas como hex literal.

### 3. Tipografia com quatro papéis
- **Impacto:** Inter Tight, pesos 800 e 900.
- **Editorial:** Playfair Display em itálico, pesos estritamente necessários.
- **Corpo:** Inter, pesos 400, 500, 600 e 700.
- **Dados:** JetBrains Mono, pesos 400, 500 e 600.
- Remover Poppins e substituir seus nove usos por Inter Tight.
- Retirar Space Grotesk e Unbounded do carregamento inicial; seus usos existentes passam a cair no papel de impacto antes da remoção definitiva.
- Manter Bebas Neue apenas onde ainda pertence ao shell/home nesta etapa; removê-la dos layouts editoriais compartilhados de plantas e protocolo respiratório.

### 4. Primeira migração visual por silo
- Migrar `PlantaIndividualLayout` e `ProtocoloItemLayout`, que hoje propagam preto absoluto e Bebas Neue para várias páginas.
- Aplicar alternância sand/deep teal/terracota, Inter Tight nos títulos, Playfair nos destaques e Inter no texto longo.
- Preservar conteúdo, SEO, schemas, imagens, interações, responsividade e avisos médicos.
- Revisar `font-mono` apenas nesse grupo e em componentes globais próximos, mantendo mono somente em dados, números, hashes, horários e rótulos curtos.

### 5. Estado futuro na home
- Inserir antes do manifesto final uma seção curta que mostre a resolução concreta: chaves sob controle, rotina sem dependência bancária e alimento produzido em casa.
- Usar contraste editorial e fotografia já existente quando adequada, sem transformar a seção em slogan genérico.
- Conectar a seção a autocustódia, soberania orgânica e ao roteiro inicial.

## Validação
- Gerar o sitemap e confirmar que `/protocolo-respiratorio/cobre` aparece uma única vez.
- Conferir `/ferramentas/entropy`, `/protocolo-respiratorio/cobre`, uma ficha de planta e a home no navegador.
- Validar desktop e mobile, links, imagens, foco, contraste, fontes, animações e `prefers-reduced-motion`.
- Executar testes relevantes e aceitar somente o build sem erros.

## Limite desta etapa
Não substituir os milhares de hexadecimais dos 186 arquivos de uma vez. Esta etapa cria a fundação oficial, corrige os layouts compartilhados de maior alcance e impede que páginas novas aumentem a dívida; os demais silos serão migrados em ondas verificáveis.