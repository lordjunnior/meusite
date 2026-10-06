# Seletor visual por perfil em Por Onde Começar

## Objetivo
Transformar `/por-onde-comecar` em uma entrada orientada por intenção, com três perfis visuais claros antes do diagnóstico atual:

1. Iniciante com medo de confisco
2. Pessoa buscando privacidade no celular
3. Pessoa transacionando Bitcoin sem KYC

## Implementação
- Criar um seletor acessível com três opções grandes, ícones e estados selecionado, foco e interação por teclado.
- Ao escolher um perfil, revelar uma trilha curta e ordenada com os conteúdos já existentes mais relevantes para aquele objetivo.
- Manter o diagnóstico atual de três perguntas como alternativa para quem ainda não sabe qual perfil escolher.
- Preservar os links e recomendações existentes, sem remover conteúdo.
- Usar os tokens visuais, componentes de botão, movimento reduzido e estrutura de navegação já adotados pelo site.
- Ajustar título e descrição da página para refletir a escolha por perfil e o diagnóstico.

## Validação
- Conferir os três perfis e seus destinos no preview.
- Testar troca de perfil, abertura de uma trilha, teclado e retorno ao diagnóstico.
- Verificar desktop e celular, além de erros de execução e compilação.

## Detalhes técnicos
- A mudança ficará concentrada na página e em um componente pequeno reutilizável, sem alterar regras de negócio ou o conteúdo das páginas de destino.
- Os destinos serão escolhidos somente entre rotas já registradas no projeto; nenhuma página fictícia será criada.
