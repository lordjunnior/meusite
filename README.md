<div align="center">

# Soberania Individual

**Uma plataforma web para autonomia financeira, segurança digital e preparação prática.**

[**Acessar o site**](https://lordjunnior.com.br/) · [**Explorar o código**](https://github.com/lordjunnior/meusite)

</div>

---

## O produto

Soberania Individual organiza conhecimento e ferramentas práticas em uma experiência web orientada à autonomia. O conteúdo conecta autocustódia de Bitcoin, privacidade digital, preparação para emergências e autonomia cotidiana.

O desafio do produto não é apenas publicar artigos: é transformar uma grande biblioteca temática em caminhos compreensíveis, navegáveis e úteis para pessoas com diferentes níveis de experiência.

## Principais recursos

- **Navegação por trilhas:** conteúdo organizado por áreas e caminhos de aprofundamento.
- **Painéis interativos:** seções expansíveis que permitem explorar informações sem sobrecarregar a página.
- **Experiências orientadas por perfil:** caminhos iniciais adaptados a diferentes necessidades.
- **Recursos editoriais:** conteúdo aprofundado, exemplos, procedimentos e referências.
- **Experiência responsiva e acessível:** interações planejadas para mouse, teclado e toque, com atenção à preferência por movimento reduzido.
- **Otimização de ativos:** conversão de imagens para WebP e redução do volume dos recursos visuais.
- **Base técnica para publicação:** geração de sitemap, verificação de URLs canônicas e checagens de consistência editorial.

## Ferramentas autorais

A plataforma também reúne uma suíte de aplicações interativas desenvolvidas para resolver tarefas específicas, com experiências próprias em vez de páginas estáticas.

- **Gerador de Entropia BIP-39:** gera e valida mnemônicos localmente no navegador, usando `crypto.getRandomValues`, a wordlist oficial e checksum.
- **Bitcoin vs. Imóveis:** simulador de comparação de valorização.
- **O Último Bloco:** visualização de cenários de oferta de Bitcoin.
- **Calculadora Taxa de Fuga:** estimativa de custos associados à mudança internacional.
- **Tradutor de Novilíngua:** dicionário satírico interativo.
- **HoraJusta:** ferramenta de registro de jornada e cálculo de horas.
- **SaveSat:** comparação de taxas e spreads de saque.
- **Lucro do Bitcoin:** simulador de preço médio, retorno e projeções patrimoniais.

Alguns itens do catálogo estão em teste ou no roadmap; a página de ferramentas indica o estado de cada um.

**[Explorar as ferramentas no site →](https://lordjunnior.com.br/ferramentas)**

## Decisões de implementação

- **Conteúdo e interface trabalham juntos.** Os componentes interativos ajudam a revelar informação no contexto, sem exigir que tudo seja exibido de uma vez.
- **Desempenho faz parte do produto.** O fluxo de build inclui geração de metadados e verificações antes da publicação.
- **Acessibilidade é funcionalidade.** As interações consideram teclado, toque e preferência por movimento reduzido.
- **A estrutura precisa evoluir.** Conteúdo, navegação e componentes são refinados de forma incremental.

## Stack técnica

- **Interface:** React, TypeScript e Vite
- **Componentes:** Radix UI e shadcn/ui
- **Estilização:** Tailwind CSS
- **Interações:** Framer Motion e GSAP
- **Formulários e validação:** React Hook Form e Zod
- **Dados e serviços:** Supabase, conforme os recursos utilizados
- **Qualidade:** ESLint e Vitest

## Executar localmente

### Requisitos

- Node.js
- Bun disponível para os scripts auxiliares chamados pelo ciclo de desenvolvimento e build
- npm

### Instalação

```bash
git clone https://github.com/lordjunnior/meusite.git
cd meusite
npm install
npm run dev
```

### Verificações

```bash
npm run lint
npm test
npm run build
```

O build executa verificações adicionais de metadados, URLs canônicas e tokens editoriais antes de gerar os arquivos de produção.

## Objetivo técnico

Construir uma plataforma de conteúdo que seja mais do que uma coleção de páginas: uma experiência organizada, responsiva e progressivamente aprimorada, com atenção à navegação, acessibilidade, desempenho e manutenção.

---

<p align="center"><sub>Projeto de Junnior · Software, conteúdo e experiência digital</sub></p>
