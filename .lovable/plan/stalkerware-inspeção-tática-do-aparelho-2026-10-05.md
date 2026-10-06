# Stalkerware: inspeção tática do aparelho

## Objetivo
Transformar a página em uma experiência prática de detecção, preservando integralmente o conteúdo editorial já publicado.

## O que será implementado
- Inserir um **Raio-X de um Aparelho Comprometido** após a resposta direta.
- Exibir um telefone visual com três hotspots acionáveis: acessibilidade mascarada, certificados de rede adicionais e consumo oculto em segundo plano.
- Ao selecionar um hotspot, revelar o sinal observado, onde verificar e por que ele importa.
- Substituir a lista visual de detecção e remoção por um **Checklist Operacional** marcável, mantendo todos os seis textos atuais e acrescentando passos específicos de varredura de certificados e permissões especiais.
- Manter o alerta de segurança pessoal em primeiro lugar e preservar os links, imagens, FAQ e demais seções.

## Interação e acessibilidade
- Hotspots utilizáveis por mouse, toque e teclado, com estado selecionado anunciado corretamente.
- Checklist com progresso local, opção de limpar e estados de foco visíveis.
- Layout adaptado para computador e celular, com movimento reduzido respeitado.

## Validação
- Testar os três hotspots e o progresso do checklist no preview.
- Conferir a página em desktop e celular, sem sobreposição ou perda de texto.
- Executar os testes relacionados e confirmar ausência de erros de execução e compilação.

## Detalhes técnicos
- Criar um módulo isolado em `src/components/seguranca-mobile/` e reutilizar os tokens `smx-page` e componentes editoriais existentes.
- Manter os dados dos hotspots e da varredura separados da composição visual para facilitar manutenção e teste.
