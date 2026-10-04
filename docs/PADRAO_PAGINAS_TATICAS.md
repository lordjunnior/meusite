# Padrao de Pagina Editorial Tatica

Molde de codigo: `src/components/editorial/PadraoPaginaTatica.tsx` (nao roteado, invisivel ao visitante).

## Objetivo
Combater a "rolagem zumbi": o leitor que rola ate o fim e so ve texto vai embora. Cada trecho de ate 1,5 tela de texto precisa de um elemento de ruptura visual ou interativo (Cadencia 400px).

## Modulos, em ordem
1. **HeroTatica**: 88vh+, fundo #07080c, malha milimetrica, pulso radial lento, imagem real.
2. **DiagramaTriagem (SVG)**: duas trilhas, "Rota do Panico" (ambar) e "Barreira Tatica" (teal); nos clicaveis acendem o detalhe.
3. **CartoesEmpilhados**: position sticky, topo progressivo, o cartao de baixo reduz escala e escurece. Ideal para metodos em etapas (Metodo O-C-R).
4. **RaioXEvidencia**: imagem com hotspots pulsantes; ao passar o mouse, tocar ou focar, a evidencia abre. Sem perguntas.
5. **PaineisExpansiveis**: flex 1 em repouso, flex 3 ao abrir; horizontal no desktop, vertical no celular. Ideal para vieses e ferramentas.
6. **AlternadorRealidade**: abas "Narrativa viral" x "Registro primario".
7. **ChecklistOperacional**: barra 0 a 100%, botao limpar.

## Regras inegociaveis
- Nunca remover, resumir ou encurtar texto existente; modulos so adicionam camadas.
- Zero quizzes ou perguntas ao leitor. Aprendizado por observacao e exploracao.
- Zero emojis, zero travessoes longos, sem vicios de linguagem de IA.
- Minimo seis imagens reais por pagina; imagens geradas por IA marcadas como ilustrativas.
- Paleta: fundo #07080c, paineis #0e111a e #131826, ambar #e0a64a, teal #4fb3a9.
- Acessibilidade: alvos de toque 44px, foco visivel, prefers-reduced-motion, contraste 4,5:1.
- SEO: todo o texto permanece no HTML; SeoHead, JSON-LD e FAQ intactos.
- Paginas publicas novas: `src/pages/`, rota em `src/App.tsx`, menu, busca e sitemap; badge NOVO por 7 dias.

## Como pedir a um agente
"Leia `docs/PADRAO_PAGINAS_TATICAS.md` e `src/components/editorial/PadraoPaginaTatica.tsx` e aplique esse padrao na pagina X, preservando todo o texto."

## Paginas candidatas
Como checar fontes, IMSI Catcher, SIM Swap, Stalkerware, Confisco 1990, CBDC Brasil, Inflacao, Coldcard, Gerador de Entropia, Toxicos Ocultos.
