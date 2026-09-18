# Roadmap

## Otimização de performance (concluída)
- [x] Converter imagens editoriais JPG, JPEG e PNG para WebP e atualizar suas referências locais.
- [x] Reduzir `src/assets` de aproximadamente 193 MB para 104 MB sem alterar a composição visual.
- [x] Converter os três PNGs críticos: retrato Sobre, capa VerificaBR e hero Nostr.
- [x] Separar React, animações, gráficos, vídeo e Radix em chunks estáveis e cacheáveis.
- [x] Restaurar o alerta de chunks para 800 KB.
- [x] Adicionar cache PWA `CacheFirst` com expiração para imagens locais.

## Auditoria de identidade e páginas órfãs (concluída)
- [x] Confirmar e publicar a página de cobre em rota própria, com entrada de navegação, busca, mapa e sitemap.
- [x] Manter o gerador BIP-39 em `/ferramentas/entropy`, documentando que ele já é servido pela rota dinâmica de Ferramentas.
- [x] Promover sand, deep teal e terracota a tokens sem alterar involuntariamente a home e o shell escuro.
- [x] Consolidar os quatro papéis tipográficos: impacto, editorial, corpo e dados.
- [x] Remover Poppins após substituir seus usos restantes por Inter Tight.
- [x] Migrar os layouts editoriais compartilhados de plantas e protocolo respiratório para tokens e Inter Tight/Playfair.
- [x] Restringir monoespaçada a números, endereços, hashes, dados e rótulos curtos no primeiro grupo auditado.
- [x] Adicionar à home um fechamento de estado futuro desejado antes do manifesto final.
- [x] Validar rotas, sitemap, desktop, mobile, carregamento de fontes e movimento reduzido.

## Segurança Mobile (em andamento)

### 1. Sistemas Operacionais (pilares técnicos)
- [x] **CalyxOS: Guia Completo**
  - Chamada: instalação, compatibilidade, recursos, limitações e falhas reais vistas em bancada.
  - URL: `/seguranca-mobile/calyxos`
  - Página: `src/pages/seguranca-mobile/CalyXOS.tsx`
  - Imagens: `src/assets/seguranca-mobile/calyxos/`
- [x] **GrapheneOS: Segurança Mobile**
  - Chamada: arquitetura de segurança, Pixels compatíveis, instalação, uso diário e limitações reais.
  - URL: `/seguranca-mobile/grapheneos`
  - Página: `src/pages/seguranca-mobile/GrapheneOS.tsx`
  - Imagens: `src/assets/seguranca-mobile/grapheneos/`
- [ ] **GrapheneOS vs CalyxOS**
  - Chamada: comparação técnica para decidir qual sistema atende melhor cada modelo de ameaça e rotina de uso.
  - URL: `/seguranca-mobile/graphene-vs-calyx`
  - Página: `src/pages/seguranca-mobile/GrapheneVsCalyx.tsx`
  - Imagens: `src/assets/seguranca-mobile/graphene-vs-calyx/`

### 2. Curiosidades / Mitos (topo de funil)
- [x] **iPhone é seguro mesmo?**
  - Chamada: o que a Apple realmente protege, quais dados ainda coleta e onde termina a segurança do iPhone.
  - URL: `/seguranca-mobile/iPhone-e-seguro-mesmo`
  - Página: `src/pages/seguranca-mobile/IPhoneESeguroMesmo.tsx`
  - Imagens: `src/assets/seguranca-mobile/iphone-seguro/`
- [ ] **Android é mais inseguro que iPhone, ou é mito?**
  - Chamada: uma comparação sem torcida entre arquitetura, atualizações, aplicativos, fabricante e comportamento do usuário.
  - URL: `/seguranca-mobile/android-mais-inseguro-que-iphone`
  - Página: `src/pages/seguranca-mobile/AndroidMaisInseguroQueIPhone.tsx`
  - Imagens: `src/assets/seguranca-mobile/android-vs-iphone/`
- [ ] **Modo avião realmente desliga o rastreamento?**
  - Chamada: o que é desligado, o que pode continuar ativo e quais rastros permanecem no aparelho.
  - URL: `/seguranca-mobile/modo-aviao-desliga-rastreamento`
  - Página: `src/pages/seguranca-mobile/ModoAviaoDesligaRastreamento.tsx`
  - Imagens: `src/assets/seguranca-mobile/modo-aviao-rastreamento/`
- [ ] **Apagar o app resolve ou o rastreamento continua?**
  - Chamada: dados locais, identificadores, backups, contas e perfis que podem sobreviver à desinstalação.
  - URL: `/seguranca-mobile/apagar-app-rastreamento-continua`
  - Página: `src/pages/seguranca-mobile/ApagarAppRastreamentoContinua.tsx`
  - Imagens: `src/assets/seguranca-mobile/apagar-app-rastreamento/`
- [ ] **Celular escuta conversa para mostrar anúncio?**
  - Chamada: microfone, permissões, correlação de dados e por que anúncios parecem saber o que foi dito.
  - URL: `/seguranca-mobile/celular-escuta-conversa-anuncio`
  - Página: `src/pages/seguranca-mobile/CelularEscutaConversaAnuncio.tsx`
  - Imagens: `src/assets/seguranca-mobile/celular-escuta-conversa/`
- [ ] **Número de IMEI pode te rastrear mesmo sem chip?**
  - Chamada: como IMEI, rede celular, Wi-Fi e outros identificadores se relacionam com rastreamento.
  - URL: `/seguranca-mobile/imei-rastreia-sem-chip`
  - Página: `src/pages/seguranca-mobile/ImeiRastreiaSemChip.tsx`
  - Imagens: `src/assets/seguranca-mobile/imei-sem-chip/`

### 3. Ameaças Específicas
- [ ] **O que é IMSI Catcher e como funciona**
  - Chamada: falsas antenas, identificação de aparelhos, limites do ataque e sinais que merecem atenção.
  - URL: `/seguranca-mobile/imsi-catcher-como-funciona`
  - Página: `src/pages/seguranca-mobile/ImsiCatcherComoFunciona.tsx`
  - Imagens: `src/assets/seguranca-mobile/imsi-catcher/`
- [ ] **SIM Swap: como te roubam o número e a conta**
  - Chamada: engenharia social, portabilidade fraudulenta, recuperação de contas e defesa prática.
  - URL: `/seguranca-mobile/sim-swap-como-funciona`
  - Página: `src/pages/seguranca-mobile/SimSwapComoFunciona.tsx`
  - Imagens: `src/assets/seguranca-mobile/sim-swap/`
- [ ] **Stalkerware: apps espiões**
  - Chamada: como aplicativos espiões entram no celular, quais sinais deixam e como responder com segurança.
  - URL: `/seguranca-mobile/stalkerware-apps-espioes`
  - Página: `src/pages/seguranca-mobile/StalkerwareAppsEspioes.tsx`
  - Imagens: `src/assets/seguranca-mobile/stalkerware/`
- [ ] **Como sua operadora vende seus dados de localização**
  - Chamada: registros de antena, intermediários de dados, consentimento opaco e limites de proteção.
  - URL: `/seguranca-mobile/operadora-vende-dados-localizacao`
  - Página: `src/pages/seguranca-mobile/OperadoraVendeDadosLocalizacao.tsx`
  - Imagens: `src/assets/seguranca-mobile/operadora-localizacao/`
- [ ] **Bluetooth e Wi-Fi: o rastreamento que você não percebe**
  - Chamada: sondas, endereços MAC, beacons, redes conhecidas e rastreamento em ambientes físicos.
  - URL: `/seguranca-mobile/bluetooth-wifi-rastreamento`
  - Página: `src/pages/seguranca-mobile/BluetoothWifiRastreamento.tsx`
  - Imagens: `src/assets/seguranca-mobile/bluetooth-wifi-rastreamento/`

### 4. Guias Práticos de Hardening
- [ ] **Checklist de permissões: o que revogar agora**
  - Chamada: revisão objetiva de câmera, microfone, localização, contatos, notificações e acesso em segundo plano.
  - URL: `/seguranca-mobile/checklist-permissoes-celular`
  - Página: `src/pages/seguranca-mobile/ChecklistPermissoesCelular.tsx`
  - Imagens: `src/assets/seguranca-mobile/checklist-permissoes/`
- [ ] **Como sair do ecossistema Google sem trocar de aparelho**
  - Chamada: reduzir dependência de serviços Google por etapas, sem exigir um celular novo no primeiro dia.
  - URL: `/seguranca-mobile/sair-do-google-sem-trocar-aparelho`
  - Página: `src/pages/seguranca-mobile/SairDoGoogleSemTrocarAparelho.tsx`
  - Imagens: `src/assets/seguranca-mobile/sair-do-google/`
- [ ] **Apps de mensagem: Signal vs WhatsApp vs Telegram**
  - Chamada: comparação de criptografia, metadados, backups, identidade, grupos e modelo de confiança.
  - URL: `/seguranca-mobile/signal-vs-whatsapp-vs-telegram`
  - Página: `src/pages/seguranca-mobile/SignalVsWhatsAppVsTelegram.tsx`
  - Imagens: `src/assets/seguranca-mobile/apps-mensagem/`
- [x] **VPN no Celular, Quando Ajuda e Quando é Teatro**
  - Chamada: o que uma VPN realmente protege, quando vale a pena e onde vira teatro de segurança.
  - URL: `/seguranca-mobile/vpn-no-celular`
  - Página: `src/pages/seguranca-mobile/VpnNoCelularQuandoAjuda.tsx`
  - Imagens: `src/assets/seguranca-mobile/vpn-celular/`
- [ ] **2FA: app authenticator vs SMS**
  - Chamada: diferenças de segurança, risco de SIM Swap, recuperação de acesso e escolha adequada para cada conta.
  - URL: `/seguranca-mobile/2fa-authenticator-vs-sms`
  - Página: `src/pages/seguranca-mobile/DoisFatoresAuthenticatorVsSms.tsx`
  - Imagens: `src/assets/seguranca-mobile/2fa-authenticator-vs-sms/`

### Integração obrigatória ao concluir cada página
- [ ] Adicionar rota em `src/App.tsx`.
- [ ] Adicionar chamada na categoria correta do hub `/seguranca-mobile`.
- [ ] Adicionar entrada na sidebar sem alterar contadores existentes.
- [ ] Adicionar título, descrição, palavras-chave e categoria à busca.
- [ ] Adicionar URL canônica ao sitemap.
- [ ] Conectar páginas relacionadas por links internos.
- [ ] Validar desktop, mobile, imagens, movimento reduzido, SEO e Schema Markup.

## Tier 1 SEO (concluído)
- [x] Hub /comparativos/melhores-hardware-wallets + /comparativos/coldcard-review + /comparativos/trezor-review
- [x] /imposto-renda/declarar-bitcoin-2026 + /imposto-renda/isencao-35-mil
- [x] Hub /saida/melhores-paises-brasileiros + /saida/residencia-paraguai
- [x] /p2p/como-vender-bitcoin-p2p + /p2p/bisq-guia-completo
- [x] Rotas em App.tsx, sidebar, searchData, sitemap

## Custódia fria (concluído)
- [x] /autocustodia/o-que-e-custodia-fria (pilar)
- [x] /autocustodia/tirar-da-exchange-para-hardware-wallet
- [x] /autocustodia/verificar-firmware-origem
- [x] /comparativos/foundation-passport-review
- [x] registrar rotas, sidebar e busca

## Saúde Autônoma, guias práticos (concluído)
- [x] /soberania-organica/farmacia-caseira-essencial
- [x] /soberania-organica/tinturas-xaropes-preparos
- [x] /soberania-organica/protocolos-gripe-resfriado
- [x] /soberania-organica/rotina-diaria-imunidade
- [x] registrar rotas, sidebar e busca

## Amarração em teia (concluído)
- [x] Card de rejeição virou funil para /autocustodia/guia-migracao-corretora
- [x] Regra Zero da Mobilidade nas páginas de saída (Chile, Paraguai, Segundo Passaporte)
- [x] "O Contra-Ataque Prático" nos alertas (CBDC, DePix, Fim do Dinheiro Vivo)
- [x] Base 72 ligada à farmácia caseira e à despensa viva
- [x] Títulos internos de Wise, Payoneer e GrabrFi no tom de privacidade
- [x] Novilíngua ligada ao CBDC Brasil
- [x] substituir a imagem do Matrix e aplicar título multicamada na comunidade GrapheneOS
- [x] refazer imagem Matrix e título da comunidade em direção editorial minimalista

## Espinha de navegação (concluído)
- [x] `src/lib/trail.ts` deriva silo, posição, anterior e próximo a partir da barra lateral
- [x] `src/components/TrailNav.tsx` com breadcrumb fixo, indicador "X de N" e anterior/próximo
- [x] Montado globalmente em `App.tsx`, vale para todas as páginas da sidebar
- [x] Busca global promovida a campo destacado no topo da barra lateral
- [x] `public/robots.txt` liberando crawlers de IA e `public/llms.txt` com os hubs

## Pendente (decidido com o usuário)
- [ ] Prerender/SSR: descartado pelo usuário
- [ ] Sumário fixo (PageFloatingToc) nas páginas longas que ainda não têm
- [ ] Grupo A: /metodologia e bloco de autor com datas no schema
- [ ] Grupo B: ferramentas (salário derretido, imposto BTC, diagnóstico, comparador, checklist)
- [ ] Grupo C: portas de entrada (comprar Bitcoin, vs Selic, vs ouro, Drex, custo inicial, erros de iniciante)
- [ ] Google Search Console e Bing Webmaster Tools

## Prioridade 3 e 4 (18/09)

Feito:
- Modal de saida removido (ExitIntentLeadMagnet excluido).
- Captura contextual por silo: src/lib/siloOffers.ts + src/components/ContextualLeadCapture.tsx.
  Aparece apos 60% de leitura, ancorada no terco inferior no celular, dispensavel por sessao.
  Ofertas: autocustodia (checklist), soberania organica (calendario de plantio), seguranca mobile
  (checklist de blindagem), saida (mapa de jurisdicoes), economia (radar semanal).
- Acessibilidade global em src/index.css: prefers-reduced-motion, foco de teclado visivel,
  alvo de toque minimo 44px em ponteiro grosso, piso de contraste para texto branco translucido.

Pendente:
- Uma acao por pagina: revisar os finais das paginas silo a silo e deixar um unico proximo passo.
- Entregar de fato os materiais das ofertas (PDFs do checklist, calendario, mapa).
- Fase 1 de distribuicao: Search Console, Bing Webmaster, Grupo A (metodologia + bloco de autor).

## Inteligência Editorial da Biblioteca

Especificação completa em docs/inteligencia-editorial/ESPECIFICACAO.md (versão 1.0, aguardando aprovação).
Sete motores: Demand, Intent, Coverage, Gap, Editorial Guard, Opportunity, Learning Loop.
Nada será codificado antes da aprovação das decisões pendentes da seção 16.

### Fase 1 implementada (18/09)
- scripts/generate-fingerprints.ts: inventário determinístico das 212 páginas, roda no prebuild/predev.
- src/lib/intelligence/: tipos, árvores de intenção curadas, Coverage, Gap, Guard e Opportunity Engine.
- Painel interno em /admin/inteligencia, noindex, fora do sitemap e da navegação pública.
- Testes em src/lib/intelligence/engine.test.ts.

### Próximas fases
- Fase 2: registrar termos da busca interna (GlobalSearch.tsx) sem identificador de usuário.
- Fase 3: decomposição de intenção assistida por modelo, com revisão humana obrigatória.
- Fase 4: integração com o Search Console, substituindo estimativas por demanda real.
- Fase 5: persistência dos briefings e fluxo aprovar/recusar.
- Fase 6: medição 30/60/90 dias e recalibração dos pesos.
