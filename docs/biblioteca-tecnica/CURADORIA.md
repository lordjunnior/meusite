# Biblioteca Técnica Lord Junnior, política de curadoria

Versão 1.0, 18/09/2026.

## 1. Missão

Encontrar, entender e utilizar conhecimento técnico gratuito para aumentar a autonomia digital.

A Biblioteca Técnica não é espelho de lista de terceiros. Repositórios abertos como o The Book of Secret Knowledge, Free Programming Books, Public APIs e agregadores de GitHub ocupam um único papel no fluxo: descoberta de candidatos. A ficha publicada aqui sempre nasce da fonte primária.

## 2. Organização, problema antes de ferramenta

A entrada da biblioteca é a árvore de autonomia digital, não o nome do produto. Quem chega dizendo "quero proteger meu celular" não precisa saber o nome de nenhuma ferramenta.

```text
AUTONOMIA DIGITAL
├── DISPOSITIVO     sistema operacional, atualizações, permissões, hardening
├── IDENTIDADE      senhas, 2FA, passkeys, recuperação
├── COMUNICAÇÃO     mensagens, email, voz
├── NAVEGAÇÃO       DNS, navegadores, VPN, Tor
├── DADOS           backup, criptografia, armazenamento, sincronização
└── PESQUISA        fontes abertas, verificação, arquivamento, metadados
```

Cada nó percorre a mesma sequência: conceito, guia interno, recursos, documentação oficial, material avançado.

## 3. Ficha de recurso

Campos obrigatórios de todo recurso publicado:

nome, categoria, tipo, para que serve, quando usar, nível, plataformas, código aberto, licença, documentação oficial, fonte, nível de confiança da fonte, última verificação, status editorial, por que está nesta biblioteca, capacidade que atende, páginas internas relacionadas.

Nenhum campo pode ficar vazio. Recurso sem licença conhecida ou sem documentação pública não entra.

## 4. Nível de confiança da fonte

| Nível | O que é | Uso |
| --- | --- | --- |
| Primária | Site oficial, documentação oficial, repositório oficial | Base da ficha |
| Secundária | Projeto reconhecido, documentação comunitária, auditoria publicada | Complemento |
| Terciária | Lista, blog, fórum, agregador | Descoberta, nunca validação |

## 5. Status editorial

| Status | Significado |
| --- | --- |
| Verificado | Fonte primária conferida, projeto em manutenção ativa |
| Monitorado | Recurso válido, porém sujeito a mudança relevante de licença, governança ou manutenção |
| Arquivado | Historicamente útil, não recomendado para uso atual |
| Retirado | Problema de segurança, abandono, mudança de licença ou outro motivo documentado |

Status nunca aparece sem motivo escrito. Não existe estrela, nota ou ranking.

## 6. Critérios de entrada

1. Fonte identificável.
2. Finalidade clara.
3. Documentação disponível.
4. Licença conhecida quando aplicável.
5. Estado de manutenção verificável.
6. Segurança avaliada.
7. Relevância para um silo existente do site.
8. Utilidade concreta para o leitor brasileiro.
9. Sem duplicação desnecessária dentro da própria biblioteca.
10. Sem cópia de conteúdo de terceiros.

Popularidade não é critério de entrada.

## 7. Limites de conteúdo ofensivo

A biblioteca cobre defesa, diagnóstico e pesquisa legítima sobre informação pública. Não publica procedimento ofensivo, ferramenta de intrusão, coleta abusiva de dado pessoal nem qualquer material cujo uso principal seja atacar sistema de terceiro. O fato de constar em uma lista pública não transforma nada em recomendação operacional.

## 8. Níveis de leitura em segurança

1. Entender, conceito.
2. Proteger, hardening e boas práticas.
3. Investigar, diagnóstico e análise defensiva.
4. Aprofundar, documentação técnica.

Iniciante nunca cai direto no nível 4.

## 9. Ciclo de revisão

```text
FERRAMENTA -> FONTE OFICIAL -> MONITORAMENTO -> MUDANÇA DETECTADA -> REVISÃO EDITORIAL -> STATUS ATUALIZADO
```

Toda ficha carrega data de última verificação. Ficha com mais de 180 dias sem verificação entra em revisão obrigatória e pode cair para Monitorado até nova conferência. O monitoramento automático de página oficial, repositório, changelog, licença e aviso de vulnerabilidade é a fase seguinte do projeto.

## 10. Ligação com os demais sistemas

- Inteligência Editorial responde o que falta na biblioteca.
- Biblioteca Técnica responde quais recursos existem para resolver aquilo.
- Busca responde onde está o conhecimento.
- Monitoramento responde o que mudou.
- Documentos e livros respondem quais fontes primárias sustentam a tese.

Recurso que não fortalece esse conjunto fica de fora.

## 11. Direção de arte

Biblioteca técnica premium com linguagem de documentação editorial. Fotografia real, interface limpa, paleta sand, teal e copper. Proibido terminal verde, neon, estética Matrix, encapuzado e qualquer referência a fórum clandestino.
