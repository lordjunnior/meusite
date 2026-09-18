import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Index from "./pages/Index";
const SobreMim = lazy(() => import("./pages/SobreMim"));
const BitcoinVsImovel = lazy(() => import("./pages/BitcoinVsImovel"));
const TaxaDeFuga = lazy(() => import("./pages/TaxaDeFuga"));
const Economia = lazy(() => import("./pages/Economia"));
const Bitcoin = lazy(() => import("./pages/Bitcoin"));
const Filosofia = lazy(() => import("./pages/Filosofia"));
const Saida = lazy(() => import("./pages/Saida"));
const Ferramentas = lazy(() => import("./pages/Ferramentas"));
const Educacao = lazy(() => import("./pages/Educacao"));

const Autocustodia = lazy(() => import("./pages/Autocustodia"));
const EconomiaParalela = lazy(() => import("./pages/EconomiaParalela"));
const Infraestrutura = lazy(() => import("./pages/Infraestrutura"));
const LightningPage = lazy(() => import("./pages/Lightning"));
const Gateway = lazy(() => import("./pages/Gateway"));
const PixCripto = lazy(() => import("./pages/PixCripto"));
const Audiobooks = lazy(() => import("./pages/Audiobooks"));
const Ebooks = lazy(() => import("./pages/Ebooks"));
const SilencioQueda = lazy(() => import("./pages/SilencioQueda"));
const ProtocoloInicial = lazy(() => import("./pages/ProtocoloInicial"));
const Arsenal = lazy(() => import("./pages/Arsenal"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Privacidade = lazy(() => import("./pages/Privacidade"));
const Termos = lazy(() => import("./pages/Termos"));
const BlindagemGolpes = lazy(() => import("./pages/BlindagemGolpes"));
const ProibicaoDinheiro = lazy(() => import("./pages/ProibicaoDinheiro"));
const AlertasHub = lazy(() => import("./pages/AlertasHub"));
const CbdcBrasil = lazy(() => import("./pages/CbdcBrasil"));
const HistoriaDoDinheiro = lazy(() => import("./pages/HistoriaDoDinheiro"));
const InflacaoImpostoOculto = lazy(() => import("./pages/InflacaoImpostoOculto"));
const BitcoinVsFiat = lazy(() => import("./pages/BitcoinVsFiat"));
const TeoriaDasBandeiras = lazy(() => import("./pages/TeoriaDasBandeiras"));
const PalauDigitalResidency = lazy(() => import("./pages/PalauDigitalResidency"));
const IndiceDoDesespertar = lazy(() => import("./pages/IndiceDoDesespertar"));
const HardCap21 = lazy(() => import("./pages/HardCap21"));
const BitcoinSeguro = lazy(() => import("./pages/BitcoinSeguro"));
const ChavesPage = lazy(() => import("./pages/ChavesPage"));
const TransacoesBitcoin = lazy(() => import("./pages/TransacoesBitcoin"));
const NocoesBitcoin = lazy(() => import("./pages/NocoesBitcoin"));
const OQueEBitcoin = lazy(() => import("./pages/OQueEBitcoin"));
const MineracaoBitcoin = lazy(() => import("./pages/MineracaoBitcoin"));
const FuturoBitcoin = lazy(() => import("./pages/FuturoBitcoin"));
const SupplyShock = lazy(() => import("./pages/SupplyShock"));
const HalvingBitcoin = lazy(() => import("./pages/HalvingBitcoin"));
const VolatilidadeBitcoin = lazy(() => import("./pages/VolatilidadeBitcoin"));
const LastroBitcoin = lazy(() => import("./pages/LastroBitcoin"));
const ProjetoAutonomo = lazy(() => import("./pages/ProjetoAutonomo"));
const ModuloAutonomo = lazy(() => import("./pages/ModuloAutonomo"));
const ConservacaoArmazenamento = lazy(() => import("./pages/ConservacaoArmazenamento"));
const ProducaoPequenosEspacos = lazy(() => import("./pages/ProducaoPequenosEspacos"));
const ProteinaSustentavel = lazy(() => import("./pages/ProteinaSustentavel"));
const SoloFertilidade = lazy(() => import("./pages/SoloFertilidade"));
const HortaUrbana = lazy(() => import("./pages/HortaUrbana"));
const AutonomiaBiologica = lazy(() => import("./pages/AutonomiaBiologica"));
const PlantaDetalhe = lazy(() => import("./pages/PlantaDetalhe"));
const PrimeirosSocorros = lazy(() => import("./pages/PrimeirosSocorros"));
const AvaliacaoSinais = lazy(() => import("./pages/AvaliacaoSinais"));
const SaudePreventiva = lazy(() => import("./pages/SaudePreventiva"));
const FitoterapiaAplicada = lazy(() => import("./pages/FitoterapiaAplicada"));
const ControleVetores = lazy(() => import("./pages/ControleVetores"));
const SabedoriaAncestral = lazy(() => import("./pages/SabedoriaAncestral"));
const Kit72h = lazy(() => import("./pages/Kit72h"));
const PurificacaoAgua = lazy(() => import("./pages/PurificacaoAgua"));
const ProtocolosApagao = lazy(() => import("./pages/ProtocolosApagao"));
const AbrigoEmergencia = lazy(() => import("./pages/AbrigoEmergencia"));
const ComunicacaoOffline = lazy(() => import("./pages/ComunicacaoOffline"));
const NavegacaoPrimaria = lazy(() => import("./pages/NavegacaoPrimaria"));
const ConhecimentoPerdido = lazy(() => import("./pages/ConhecimentoPerdido"));
const Confisco1990 = lazy(() => import("./pages/Confisco1990"));
const Neobankless = lazy(() => import("./pages/Neobankless"));
const SoberaniaFinanceira = lazy(() => import("./pages/SoberaniaFinanceira"));
const BankOfGeorgia = lazy(() => import("./pages/BankOfGeorgia"));
const WisePage = lazy(() => import("./pages/Wise"));
const PayoneerPage = lazy(() => import("./pages/Payoneer"));
const ContasOffshore = lazy(() => import("./pages/ContasOffshore"));
const AberturaRemota = lazy(() => import("./pages/AberturaRemota"));
const IndiceSoberaniaFinanceira = lazy(() => import("./pages/IndiceSoberaniaFinanceira"));
const KycNotMe = lazy(() => import("./pages/KycNotMe"));
const BricsPay = lazy(() => import("./pages/BricsPay"));
const DepixReporte = lazy(() => import("./pages/DepixReporte"));
const OptimaExchange = lazy(() => import("./pages/OptimaExchange"));
const PegasusSwap = lazy(() => import("./pages/PegasusSwap"));
const BybitBinanceReportam = lazy(() => import("./pages/exchanges/BybitBinanceReportam"));
const RicosNaoInvestemFiis = lazy(() => import("./pages/mercado-tradicional/RicosNaoInvestemFiis"));
const GrabrFi = lazy(() => import("./pages/GrabrFi"));
const ExchangesSemKyc = lazy(() => import("./pages/ExchangesSemKyc"));
const KucoinPayPix = lazy(() => import("./pages/KucoinPayPix"));
const BlockchainPage = lazy(() => import("./pages/Blockchain"));
const CandlestickPage = lazy(() => import("./pages/Candlestick"));
const DiversificacaoPage = lazy(() => import("./pages/Diversificacao"));
const BitcoinVsAltcoinsPage = lazy(() => import("./pages/BitcoinVsAltcoins"));
const DicionarioCripto = lazy(() => import("./pages/DicionarioCripto"));
const ComprarBitcoinAnonimo = lazy(() => import("./pages/ComprarBitcoinAnonimo"));
const DolarVirtual = lazy(() => import("./pages/DolarVirtual"));
const Bip110 = lazy(() => import("./pages/Bip110"));
const MobilidadeDeChaves = lazy(() => import("./pages/MobilidadeDeChaves"));
const HardwareWalletDiy = lazy(() => import("./pages/HardwareWalletDiy"));
const KruxPassphraseBluewallet = lazy(() => import("./pages/KruxPassphraseBluewallet"));
const CpContextoHistorico = lazy(() => import("./pages/cp/ContextoHistorico"));
const CpBaseFisiologica = lazy(() => import("./pages/cp/BaseFisiologica"));
const CpSegurancaLimites = lazy(() => import("./pages/cp/SegurancaLimites"));
const CpAplicacaoPratica = lazy(() => import("./pages/cp/AplicacaoPratica"));
const CpContinuidadeFamiliar = lazy(() => import("./pages/cp/ContinuidadeFamiliar"));
const ToxicosOcultos = lazy(() => import("./pages/ToxicosOcultos"));
const ToxinasAlimentares = lazy(() => import("./pages/toxicos/ToxinasAlimentares"));
const ManipulacaoInformacional = lazy(() => import("./pages/toxicos/ManipulacaoInformacional"));
const DependenciaTecnologica = lazy(() => import("./pages/toxicos/DependenciaTecnologica"));
const ToxinasAmbientais = lazy(() => import("./pages/toxicos/ToxinasAmbientais"));
const RapeDossie = lazy(() => import("./pages/rape/RapeDossie"));
const ProtocoloQuelantes = lazy(() => import("./pages/rape/ProtocoloQuelantes"));
const PlantasSubutilizadas = lazy(() => import("./pages/PlantasSubutilizadas"));
const Jurubeba = lazy(() => import("./pages/plantas/Jurubeba"));
const QuebraPedra = lazy(() => import("./pages/plantas/QuebraPedra"));
const EspinheiraSanta = lazy(() => import("./pages/plantas/EspinheiraSanta"));
const Guaco = lazy(() => import("./pages/plantas/Guaco"));
const Tanchagem = lazy(() => import("./pages/plantas/Tanchagem"));
const Pariparoba = lazy(() => import("./pages/plantas/Pariparoba"));
const ChapeuDeCouro = lazy(() => import("./pages/plantas/ChapeuDeCouro"));
const Umburana = lazy(() => import("./pages/plantas/Umburana"));
const Artemisia = lazy(() => import("./pages/plantas/Artemisia"));
const AristolochiaAlerta = lazy(() => import("./pages/plantas/AristolochiaAlerta"));
import CodigoAutonomiaModal from "./components/CodigoAutonomiaModal";
import ScrollToTop from "./components/ScrollToTop";
import TrailNav from "./components/TrailNav";

const MapaDaSoberania = lazy(() => import("./pages/MapaDaSoberania"));
const BabosaAcemannan = lazy(() => import("./pages/BabosaAcemannan"));
const PorOndeComecar = lazy(() => import("./pages/PorOndeComecar"));
const OleoRicinoBiohacker = lazy(() => import("./pages/OleoRicinoBiohacker"));
const VazamentoDados = lazy(() => import("./pages/VazamentoDados"));
const PixSemBanco = lazy(() => import("./pages/PixSemBanco"));
const ConfiscoBitcoin = lazy(() => import("./pages/ConfiscoBitcoin"));
const BitparkCartao = lazy(() => import("./pages/BitparkCartao"));
const PolymarketRedeNeural = lazy(() => import("./pages/PolymarketRedeNeural"));
const PixAnonimo = lazy(() => import("./pages/PixAnonimo"));
const MultisigBitcoin = lazy(() => import("./pages/MultisigBitcoin"));
const NovaLeiContaCorrente = lazy(() => import("./pages/NovaLeiContaCorrente"));
import ExitIntentLeadMagnet from "./components/ExitIntentLeadMagnet";
import LegacyRedirect from "./components/LegacyRedirect";
const Novilingua = lazy(() => import("./pages/Novilingua"));
const Propolis = lazy(() => import("./pages/Propolis"));
const SegundoPassaporte = lazy(() => import("./pages/saida/SegundoPassaporte"));
const ResidenciaFiscal = lazy(() => import("./pages/saida/ResidenciaFiscal"));
const JurisdicoesAmigaveis = lazy(() => import("./pages/saida/JurisdicoesAmigaveis"));
const CalyxOS = lazy(() => import("./pages/seguranca-mobile/CalyxOS"));
const GrapheneOS = lazy(() => import("./pages/seguranca-mobile/GrapheneOS"));
const IPhoneESeguroMesmo = lazy(() => import("./pages/seguranca-mobile/IPhoneESeguroMesmo"));
const VpnNoCelularQuandoAjuda = lazy(() => import("./pages/seguranca-mobile/VpnNoCelularQuandoAjuda"));
const SegurancaMobileEmPreparacao = lazy(() => import("./pages/seguranca-mobile/SegurancaMobileEmPreparacao"));
const CedulaResidenciaChile = lazy(() => import("./pages/saida/CedulaResidenciaChile"));
const CartoesCriptoSemReporte = lazy(() => import("./pages/CartoesCriptoSemReporte"));
const JadeCoreReview = lazy(() => import("./pages/JadeCoreReview"));
const MelhoresHardwareWallets = lazy(() => import("./pages/comparativos/MelhoresHardwareWallets"));
const ColdcardReview = lazy(() => import("./pages/comparativos/ColdcardReview"));
const TrezorReview = lazy(() => import("./pages/comparativos/TrezorReview"));
const BackupSeedPhraseGuia = lazy(() => import("./pages/autocustodia/BackupSeedPhraseGuia"));
const UtxoConsolidacao = lazy(() => import("./pages/autocustodia/UtxoConsolidacao"));
const OrganicaComeceAqui = lazy(() => import("./pages/soberania-organica/ComeceAqui"));
const OQueECustodiaFria = lazy(() => import("./pages/autocustodia/OQueECustodiaFria"));
const TirarDaExchange = lazy(() => import("./pages/autocustodia/TirarDaExchange"));
const VerificarFirmwareOrigem = lazy(() => import("./pages/autocustodia/VerificarFirmwareOrigem"));
const GuiaMigracaoCorretora = lazy(() => import("./pages/autocustodia/GuiaMigracaoCorretora"));
const HotWalletVsColdWallet = lazy(() => import("./pages/autocustodia/HotWalletVsColdWallet"));
const PrimeiroSaqueHardwareWallet = lazy(() => import("./pages/autocustodia/PrimeiroSaqueHardwareWallet"));
const ErrosFataisSaqueCorretora = lazy(() => import("./pages/autocustodia/ErrosFataisSaqueCorretora"));
const FoundationPassportReview = lazy(() => import("./pages/comparativos/FoundationPassportReview"));
const FarmaciaCaseiraEssencial = lazy(() => import("./pages/soberania-organica/FarmaciaCaseiraEssencial"));
const TinturasXaroposPreparos = lazy(() => import("./pages/soberania-organica/TinturasXaroposPreparos"));
const ProtocolosGripeResfriado = lazy(() => import("./pages/soberania-organica/ProtocolosGripeResfriado"));
const RotinaDiariaImunidade = lazy(() => import("./pages/soberania-organica/RotinaDiariaImunidade"));
const DeclararBitcoin2026 = lazy(() => import("./pages/imposto-renda/DeclararBitcoin2026"));
const Isencao35Mil = lazy(() => import("./pages/imposto-renda/Isencao35Mil"));
const MelhoresPaisesBrasileiros = lazy(() => import("./pages/saida/MelhoresPaisesBrasileiros"));
const ResidenciaParaguai = lazy(() => import("./pages/saida/ResidenciaParaguai"));
const ComoVenderBitcoinP2P = lazy(() => import("./pages/p2p/ComoVenderBitcoinP2P"));
const BisqGuiaCompleto = lazy(() => import("./pages/p2p/BisqGuiaCompleto"));
const SementesCrioulas = lazy(() => import("./pages/alimentar/SementesCrioulas"));
const ConservasFermentadas = lazy(() => import("./pages/alimentar/ConservasFermentadas"));
const AquaponiaResidencial = lazy(() => import("./pages/alimentar/AquaponiaResidencial"));
const PreservacaoAncestral = lazy(() => import("./pages/alimentar/PreservacaoAncestral"));
const EngenhariaVicioAlimentar = lazy(() => import("./pages/alimentar/EngenhariaVicioAlimentar"));
const GestaoAguaMicro = lazy(() => import("./pages/alimentar/GestaoAguaMicro"));
const ReceitasFuncionais = lazy(() => import("./pages/ReceitasFuncionais"));
const SobremesaSubstituiRivotril = lazy(() => import("./pages/receitas/SobremesaSubstituiRivotril"));
const GelatinaAntiparasitaria = lazy(() => import("./pages/receitas/GelatinaAntiparasitaria"));
const GarrafadaDigestivaAncestral = lazy(() => import("./pages/receitas/GarrafadaDigestivaAncestral"));
const ChaPressaoHibisco = lazy(() => import("./pages/receitas/ChaPressaoHibisco"));
const InfusaoDorInflamacao = lazy(() => import("./pages/receitas/InfusaoDorInflamacao"));
const SucoRefluxoEspinheiraSanta = lazy(() => import("./pages/receitas/SucoRefluxoEspinheiraSanta"));
const SeedPhraseAco = lazy(() => import("./pages/autocustodia/SeedPhraseAco"));
const CoinjoinPrivacidade = lazy(() => import("./pages/autocustodia/CoinjoinPrivacidade"));
const HerancaBitcoin = lazy(() => import("./pages/autocustodia/HerancaBitcoin"));
const PrimeirosSocorrosTaticos = lazy(() => import("./pages/soberania-organica/PrimeirosSocorrosTaticos"));
const EDC = lazy(() => import("./pages/soberania-organica/EDC"));
const ProtocoloFogo = lazy(() => import("./pages/soberania-organica/ProtocoloFogo"));
const ConservacaoAlimentos = lazy(() => import("./pages/soberania-organica/ConservacaoAlimentos"));
const DefesaPessoal = lazy(() => import("./pages/soberania-organica/DefesaPessoal"));
const DefesaDomiciliar = lazy(() => import("./pages/soberania-organica/DefesaDomiciliar"));
const HigieneMental = lazy(() => import("./pages/soberania-organica/HigieneMental"));
const AutonomiaVeicular = lazy(() => import("./pages/soberania-organica/AutonomiaVeicular"));
const DefesaDigital = lazy(() => import("./pages/soberania-organica/DefesaDigital"));
const ComunicacaoSegura = lazy(() => import("./pages/soberania-organica/ComunicacaoSegura"));
const NostrRedeSemCensura = lazy(() => import("./pages/NostrRedeSocialSemCensura"));
const AutonomiaEnergetica = lazy(() => import("./pages/soberania-organica/AutonomiaEnergetica"));
const RefugioRural = lazy(() => import("./pages/soberania-organica/RefugioRural"));
const Cobre = lazy(() => import("./pages/protocolo-respiratorio/Cobre"));
const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <CodigoAutonomiaModal />
        <ExitIntentLeadMagnet />
        <ScrollToTop />
        <Suspense fallback={<div className="min-h-screen" aria-busy="true" />}>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/sobre-mim" element={<SobreMim />} />
          <Route path="/bitcoin-vs-imovel" element={<BitcoinVsImovel />} />
          <Route path="/taxa-de-fuga" element={<TaxaDeFuga />} />
          <Route path="/economia" element={<Economia />} />
          <Route path="/bitcoin" element={<Bitcoin />} />
          <Route path="/filosofia" element={<Filosofia />} />
          <Route path="/saida" element={<Saida />} />
          <Route path="/saida/gateway" element={<Gateway />} />
          <Route path="/ferramentas" element={<Ferramentas />} />
          <Route path="/ferramentas/:toolId" element={<Ferramentas />} />
          <Route path="/educacao" element={<Educacao />} />
          <Route path="/entenda-bitcoin" element={<LegacyRedirect to="/bitcoin/o-que-e" />} />
          <Route path="/autocustodia" element={<Autocustodia />} />
          <Route path="/autocustodia/hardware-wallet-diy-bitcoin" element={<HardwareWalletDiy />} />
          <Route path="/autocustodia/seed-phrase-em-aco" element={<SeedPhraseAco />} />
          <Route path="/autocustodia/coinjoin-privacidade" element={<CoinjoinPrivacidade />} />
          <Route path="/autocustodia/heranca-bitcoin" element={<HerancaBitcoin />} />
          <Route path="/autocustodia/krux-passphrase-bluewallet" element={<KruxPassphraseBluewallet />} />
          <Route path="/autocustodia/guia-migracao-corretora" element={<GuiaMigracaoCorretora />} />
          <Route path="/autocustodia/hot-wallet-vs-cold-wallet" element={<HotWalletVsColdWallet />} />
          <Route path="/autocustodia/primeiro-saque-hardware-wallet" element={<PrimeiroSaqueHardwareWallet />} />
          <Route path="/autocustodia/erros-fatais-saque-corretora" element={<ErrosFataisSaqueCorretora />} />
          <Route path="/economia-paralela" element={<EconomiaParalela />} />
          <Route path="/infraestrutura" element={<Infraestrutura />} />
          <Route path="/lightning" element={<LightningPage />} />
          <Route path="/pix-cripto" element={<PixCripto />} />
          <Route path="/audiobooks" element={<Audiobooks />} />
          <Route path="/ebooks" element={<Ebooks />} />
          <Route path="/silencio-queda" element={<SilencioQueda />} />
          <Route path="/protocolo-inicial" element={<ProtocoloInicial />} />
          <Route path="/recursos-e-ferramentas" element={<Arsenal />} />
          <Route path="/arsenal" element={<LegacyRedirect to="/recursos-e-ferramentas" />} />
          <Route path="/blindagem-golpes" element={<BlindagemGolpes />} />
          <Route path="/proibicao-dinheiro" element={<LegacyRedirect to="/alertas/fim-do-dinheiro-vivo" />} />
          <Route path="/alertas" element={<AlertasHub />} />
          <Route path="/alertas/cbdc-brasil" element={<CbdcBrasil />} />
          <Route path="/alertas/fim-do-dinheiro-vivo" element={<ProibicaoDinheiro />} />
          <Route path="/alertas/depix-reporte-2026" element={<DepixReporte />} />
          <Route path="/alertas/protecao-patrimonial-bitcoin" element={<ConfiscoBitcoin />} />
          <Route path="/alertas/governo-tomar-bitcoins" element={<LegacyRedirect to="/alertas/protecao-patrimonial-bitcoin" />} />
          <Route path="/historia-do-dinheiro" element={<HistoriaDoDinheiro />} />
          <Route path="/inflacao-imposto-oculto" element={<InflacaoImpostoOculto />} />
          <Route path="/bitcoin-vs-fiat" element={<BitcoinVsFiat />} />
          <Route path="/teoria-das-bandeiras" element={<TeoriaDasBandeiras />} />
          <Route path="/palau-digital-residency" element={<PalauDigitalResidency />} />
          <Route path="/indice-da-soberania" element={<IndiceDoDesespertar />} />
          <Route path="/indice-do-despertar" element={<LegacyRedirect to="/indice-da-soberania" />} />
          <Route path="/confisco-1990" element={<Confisco1990 />} />
          <Route path="/soberania-financeira" element={<SoberaniaFinanceira />} />
          <Route path="/soberania-financeira/contas-internacionais/neobankless" element={<Neobankless />} />
          <Route path="/neobankless" element={<Navigate to="/soberania-financeira/contas-internacionais/neobankless" replace />} />
          <Route path="/soberania-financeira/contas-internacionais/bank-of-georgia" element={<BankOfGeorgia />} />
          <Route path="/soberania-financeira/contas-internacionais/wise" element={<WisePage />} />
          <Route path="/soberania-financeira/contas-internacionais/payoneer" element={<PayoneerPage />} />
          <Route path="/soberania-financeira/contas-internacionais/grabrfi" element={<GrabrFi />} />
          <Route path="/soberania-financeira/contas-offshore/top-10" element={<ContasOffshore />} />
          <Route path="/soberania-financeira/contas-offshore/abertura-remota" element={<AberturaRemota />} />
          <Route path="/indice-de-soberania-financeira" element={<IndiceSoberaniaFinanceira />} />
          <Route path="/soberania-financeira/exchanges-privacidade-e-kyc" element={<ExchangesSemKyc />} />
          <Route path="/soberania-financeira/exchanges-privacidade-e-kyc/kycnot-me" element={<KycNotMe />} />
          <Route path="/soberania-financeira/exchanges-privacidade-e-kyc/optima-exchange" element={<OptimaExchange />} />
          <Route path="/soberania-financeira/exchanges-privacidade-e-kyc/pegasus-swap" element={<PegasusSwap />} />
          <Route path="/soberania-financeira/exchanges-privacidade-e-kyc/bybit-binance-reportam-brasileiros" element={<BybitBinanceReportam />} />
          <Route path="/mercado-tradicional/ricos-nao-investem-fiis" element={<RicosNaoInvestemFiis />} />
          <Route path="/soberania-financeira/exchanges-sem-kyc" element={<LegacyRedirect to="/soberania-financeira/exchanges-privacidade-e-kyc" />} />
          <Route path="/soberania-financeira/exchanges-sem-kyc/kycnot-me" element={<LegacyRedirect to="/soberania-financeira/exchanges-privacidade-e-kyc/kycnot-me" />} />
          <Route path="/soberania-financeira/exchanges-sem-kyc/optima-exchange" element={<LegacyRedirect to="/soberania-financeira/exchanges-privacidade-e-kyc/optima-exchange" />} />
          <Route path="/soberania-financeira/exchanges-sem-kyc/pegasus-swap" element={<LegacyRedirect to="/soberania-financeira/exchanges-privacidade-e-kyc/pegasus-swap" />} />
          <Route path="/soberania-financeira/brics-pay" element={<BricsPay />} />
          <Route path="/soberania-financeira/kucoin-pay-pix" element={<KucoinPayPix />} />
          <Route path="/soberania-financeira/pix-sem-banco" element={<PixSemBanco />} />
          <Route path="/bitpark-cartao-bitcoin" element={<BitparkCartao />} />
          <Route path="/21-milhoes" element={<HardCap21 />} />
          <Route path="/bitcoin-seguro" element={<BitcoinSeguro />} />
          <Route path="/chaves" element={<ChavesPage />} />
          <Route path="/transacoes" element={<TransacoesBitcoin />} />
          <Route path="/bitcoin/nocoes-basicas" element={<NocoesBitcoin />} />
          <Route path="/bitcoin/o-que-e" element={<OQueEBitcoin />} />
          <Route path="/nocoes-bitcoin" element={<LegacyRedirect to="/bitcoin/nocoes-basicas" />} />
          <Route path="/o-que-e-bitcoin" element={<LegacyRedirect to="/bitcoin/o-que-e" />} />
          <Route path="/mineracao" element={<MineracaoBitcoin />} />
          <Route path="/futuro-bitcoin" element={<FuturoBitcoin />} />
          <Route path="/supply-shock" element={<SupplyShock />} />
          <Route path="/halving-bitcoin" element={<HalvingBitcoin />} />
          <Route path="/volatilidade" element={<VolatilidadeBitcoin />} />
          <Route path="/lastro" element={<LastroBitcoin />} />
          <Route path="/blockchain" element={<BlockchainPage />} />
          <Route path="/candlestick" element={<CandlestickPage />} />
          <Route path="/diversificacao" element={<DiversificacaoPage />} />
          <Route path="/bitcoin-vs-altcoins" element={<BitcoinVsAltcoinsPage />} />
          <Route path="/dicionario-cripto" element={<DicionarioCripto />} />
          <Route path="/comprar-bitcoin-com-privacidade" element={<ComprarBitcoinAnonimo />} />
          <Route path="/comprar-bitcoin-anonimo" element={<LegacyRedirect to="/comprar-bitcoin-com-privacidade" />} />
          <Route path="/dolar-virtual" element={<DolarVirtual />} />
          <Route path="/bitcoin/bip-110-guerra-espaco-bloco" element={<Bip110 />} />
          <Route path="/protocolo-bitcoin/bip-110" element={<Navigate to="/bitcoin/bip-110-guerra-espaco-bloco" replace />} />
          <Route path="/bip-110" element={<Navigate to="/bitcoin/bip-110-guerra-espaco-bloco" replace />} />
          <Route path="/mobilidade-de-chaves" element={<MobilidadeDeChaves />} />
          <Route path="/soberania-organica" element={<ProjetoAutonomo />} />
          <Route path="/soberania-organica/armazenamento-longo-prazo" element={<ConservacaoArmazenamento />} />
          <Route path="/soberania-organica/conservacao-armazenamento" element={<LegacyRedirect to="/soberania-organica/armazenamento-longo-prazo" />} />
          <Route path="/soberania-organica/producao-pequenos-espacos" element={<ProducaoPequenosEspacos />} />
          <Route path="/soberania-organica/proteina-sustentavel" element={<ProteinaSustentavel />} />
          <Route path="/soberania-organica/solo-fertilidade" element={<SoloFertilidade />} />
          <Route path="/soberania-organica/horta-urbana" element={<HortaUrbana />} />
          <Route path="/soberania-organica/autonomia-biologica" element={<AutonomiaBiologica />} />
          <Route path="/soberania-organica/planta/:slug" element={<PlantaDetalhe />} />
          <Route path="/soberania-organica/primeiros-socorros" element={<PrimeirosSocorros />} />
          <Route path="/soberania-organica/avaliacao-sinais" element={<AvaliacaoSinais />} />
          <Route path="/soberania-organica/saude-preventiva" element={<SaudePreventiva />} />
          <Route path="/soberania-organica/fitoterapia-aplicada" element={<FitoterapiaAplicada />} />
          <Route path="/soberania-organica/controle-vetores" element={<ControleVetores />} />
          <Route path="/soberania-organica/sabedoria-ancestral" element={<SabedoriaAncestral />} />
          <Route path="/soberania-organica/babosa-acemannan" element={<BabosaAcemannan />} />
          <Route path="/soberania-organica/kit-72h" element={<Kit72h />} />
          <Route path="/soberania-organica/purificacao-agua" element={<PurificacaoAgua />} />
          <Route path="/soberania-organica/protocolos-apagao" element={<ProtocolosApagao />} />
          <Route path="/soberania-organica/abrigo-emergencia" element={<AbrigoEmergencia />} />
          <Route path="/soberania-organica/comunicacao-offline" element={<ComunicacaoOffline />} />
          <Route path="/soberania-organica/navegacao-primaria" element={<NavegacaoPrimaria />} />
          <Route path="/soberania-organica/conhecimento-perdido" element={<ConhecimentoPerdido />} />
          <Route path="/soberania-organica/conhecimento-perdido/rape" element={<RapeDossie />} />
          <Route path="/soberania-organica/conhecimento-perdido/quelantes-orientacao-segura" element={<ProtocoloQuelantes />} />
          <Route path="/soberania-organica/conhecimento-perdido/protocolo-quelantes-brasileiros" element={<LegacyRedirect to="/soberania-organica/conhecimento-perdido/quelantes-orientacao-segura" />} />
          <Route path="/soberania-organica/conhecimento-perdido/protocolo-quelantes" element={<LegacyRedirect to="/soberania-organica/conhecimento-perdido/quelantes-orientacao-segura" />} />
          <Route path="/soberania-organica/plantas-subutilizadas" element={<PlantasSubutilizadas />} />
          <Route path="/soberania-organica/plantas-subutilizadas/jurubeba" element={<Jurubeba />} />
          <Route path="/soberania-organica/plantas-subutilizadas/quebra-pedra" element={<QuebraPedra />} />
          <Route path="/soberania-organica/plantas-subutilizadas/espinheira-santa" element={<EspinheiraSanta />} />
          <Route path="/soberania-organica/plantas-subutilizadas/guaco" element={<Guaco />} />
          <Route path="/soberania-organica/plantas-subutilizadas/tanchagem" element={<Tanchagem />} />
          <Route path="/soberania-organica/plantas-subutilizadas/pariparoba" element={<Pariparoba />} />
          <Route path="/soberania-organica/plantas-subutilizadas/chapeu-de-couro" element={<ChapeuDeCouro />} />
          <Route path="/soberania-organica/plantas-subutilizadas/umburana" element={<Umburana />} />
          <Route path="/soberania-organica/plantas-subutilizadas/artemisia" element={<Artemisia />} />
          <Route path="/soberania-organica/plantas-subutilizadas/aristolochia-alerta" element={<AristolochiaAlerta />} />
          <Route path="/conhecimento-perdido/contexto-historico" element={<CpContextoHistorico />} />
          <Route path="/conhecimento-perdido/base-fisiologica" element={<CpBaseFisiologica />} />
          <Route path="/conhecimento-perdido/seguranca-e-limites" element={<CpSegurancaLimites />} />
          <Route path="/conhecimento-perdido/aplicacao-pratica" element={<CpAplicacaoPratica />} />
          <Route path="/conhecimento-perdido/continuidade-familiar" element={<CpContinuidadeFamiliar />} />
          <Route path="/soberania-organica/toxicos-ocultos" element={<ToxicosOcultos />} />
          <Route path="/soberania-organica/toxicos-ocultos/toxinas-alimentares" element={<ToxinasAlimentares />} />
          <Route path="/soberania-organica/toxicos-ocultos/manipulacao-informacional" element={<ManipulacaoInformacional />} />
          <Route path="/soberania-organica/toxicos-ocultos/dependencia-tecnologica" element={<DependenciaTecnologica />} />
          <Route path="/soberania-organica/toxicos-ocultos/toxinas-ambientais" element={<ToxinasAmbientais />} />
          <Route path="/soberania-organica/oleo-ricino-biohacker" element={<OleoRicinoBiohacker />} />
          <Route path="/soberania-organica/:slug" element={<ModuloAutonomo />} />
          {/* Redirects from old projeto-autonomo URLs */}
          <Route path="/projeto-autonomo" element={<Navigate to="/soberania-organica" replace />} />
          <Route path="/projeto-autonomo/*" element={<Navigate to="/soberania-organica" replace />} />
          <Route path="/mapa-da-soberania" element={<MapaDaSoberania />} />
          <Route path="/por-onde-comecar" element={<PorOndeComecar />} />
          <Route path="/vazamento-dados" element={<VazamentoDados />} />
          <Route path="/polymarket-rede-neural-btc" element={<PolymarketRedeNeural />} />
          <Route path="/pix-privacidade" element={<PixAnonimo />} />
            <Route path="/pix-anonimo" element={<LegacyRedirect to="/pix-privacidade" />} />
            <Route path="/multisig-bitcoin" element={<MultisigBitcoin />} />
            <Route path="/nova-lei-conta-corrente" element={<LegacyRedirect to="/alertas/nova-lei-conta-corrente" />} />
            <Route path="/alertas/nova-lei-conta-corrente" element={<NovaLeiContaCorrente />} />
            <Route path="/novilingua" element={<Novilingua />} />
            <Route path="/soberania-organica/propolis" element={<Propolis />} />
            <Route path="/propolis" element={<LegacyRedirect to="/soberania-organica/propolis" />} />
            <Route path="/saida/segundo-passaporte" element={<SegundoPassaporte />} />
            <Route path="/saida/residencia-fiscal" element={<ResidenciaFiscal />} />
            <Route path="/saida/jurisdicoes-amigaveis" element={<JurisdicoesAmigaveis />} />
            <Route path="/seguranca-mobile/calyxos" element={<CalyxOS />} />
            <Route path="/seguranca-mobile/grapheneos" element={<GrapheneOS />} />
            <Route path="/seguranca-mobile/iPhone-e-seguro-mesmo" element={<IPhoneESeguroMesmo />} />
            <Route path="/seguranca-mobile/vpn-no-celular" element={<VpnNoCelularQuandoAjuda />} />
            <Route path="/seguranca-mobile/graphene-vs-calyx" element={<SegurancaMobileEmPreparacao />} />
            <Route path="/seguranca-mobile/android-mais-inseguro-que-iphone" element={<SegurancaMobileEmPreparacao />} />
            <Route path="/seguranca-mobile/modo-aviao-desliga-rastreamento" element={<SegurancaMobileEmPreparacao />} />
            <Route path="/seguranca-mobile/apagar-app-rastreamento-continua" element={<SegurancaMobileEmPreparacao />} />
            <Route path="/seguranca-mobile/celular-escuta-conversa-anuncio" element={<SegurancaMobileEmPreparacao />} />
            <Route path="/seguranca-mobile/imei-rastreia-sem-chip" element={<SegurancaMobileEmPreparacao />} />
            <Route path="/seguranca-mobile/imsi-catcher-como-funciona" element={<SegurancaMobileEmPreparacao />} />
            <Route path="/seguranca-mobile/sim-swap-como-funciona" element={<SegurancaMobileEmPreparacao />} />
            <Route path="/seguranca-mobile/stalkerware-apps-espioes" element={<SegurancaMobileEmPreparacao />} />
            <Route path="/seguranca-mobile/operadora-vende-dados-localizacao" element={<SegurancaMobileEmPreparacao />} />
            <Route path="/seguranca-mobile/bluetooth-wifi-rastreamento" element={<SegurancaMobileEmPreparacao />} />
            <Route path="/seguranca-mobile/checklist-permissoes-celular" element={<SegurancaMobileEmPreparacao />} />
            <Route path="/seguranca-mobile/sair-do-google-sem-trocar-aparelho" element={<SegurancaMobileEmPreparacao />} />
            <Route path="/seguranca-mobile/signal-vs-whatsapp-vs-telegram" element={<SegurancaMobileEmPreparacao />} />
            <Route path="/seguranca-mobile/2fa-authenticator-vs-sms" element={<SegurancaMobileEmPreparacao />} />
            <Route path="/seguranca-mobile" element={<Navigate to="/seguranca-mobile/calyxos" replace />} />
            <Route path="/saida/cedula-residencia-chile" element={<CedulaResidenciaChile />} />
            <Route path="/soberania-financeira/cartoes-cripto-sem-reporte" element={<CartoesCriptoSemReporte />} />
            <Route path="/autocustodia/jade-core-review" element={<JadeCoreReview />} />
            <Route path="/comparativos/melhores-hardware-wallets" element={<MelhoresHardwareWallets />} />
            <Route path="/comparativos/coldcard-review" element={<ColdcardReview />} />
            <Route path="/comparativos/trezor-review" element={<TrezorReview />} />
            <Route path="/autocustodia/backup-seed-phrase-guia" element={<BackupSeedPhraseGuia />} />
            <Route path="/autocustodia/utxo-consolidacao" element={<UtxoConsolidacao />} />
            <Route path="/soberania-organica/comece-aqui" element={<OrganicaComeceAqui />} />
            <Route path="/autocustodia/o-que-e-custodia-fria" element={<OQueECustodiaFria />} />
            <Route path="/autocustodia/tirar-da-exchange-para-hardware-wallet" element={<TirarDaExchange />} />
            <Route path="/autocustodia/verificar-firmware-origem" element={<VerificarFirmwareOrigem />} />
            <Route path="/comparativos/foundation-passport-review" element={<FoundationPassportReview />} />
            <Route path="/soberania-organica/farmacia-caseira-essencial" element={<FarmaciaCaseiraEssencial />} />
            <Route path="/soberania-organica/tinturas-xaropes-preparos" element={<TinturasXaroposPreparos />} />
            <Route path="/soberania-organica/protocolos-gripe-resfriado" element={<ProtocolosGripeResfriado />} />
            <Route path="/soberania-organica/rotina-diaria-imunidade" element={<RotinaDiariaImunidade />} />
            <Route path="/imposto-renda/declarar-bitcoin-2026" element={<DeclararBitcoin2026 />} />
            <Route path="/imposto-renda/isencao-35-mil" element={<Isencao35Mil />} />
            <Route path="/saida/melhores-paises-brasileiros" element={<MelhoresPaisesBrasileiros />} />
            <Route path="/saida/residencia-paraguai" element={<ResidenciaParaguai />} />
            <Route path="/p2p/como-vender-bitcoin-p2p" element={<ComoVenderBitcoinP2P />} />
            <Route path="/p2p/bisq-guia-completo" element={<BisqGuiaCompleto />} />
            <Route path="/jade-core" element={<Navigate to="/autocustodia/jade-core-review" replace />} />
            <Route path="/soberania-organica/sementes-crioulas" element={<SementesCrioulas />} />
            <Route path="/soberania-organica/conservas-fermentadas" element={<ConservasFermentadas />} />
            <Route path="/soberania-organica/aquaponia-residencial" element={<AquaponiaResidencial />} />
            <Route path="/soberania-organica/preservacao-ancestral" element={<PreservacaoAncestral />} />
            <Route path="/soberania-organica/engenharia-vicio-alimentar" element={<EngenhariaVicioAlimentar />} />
            {/* Cozinha Funcional — 7ª frente da Soberania Orgânica */}
            <Route path="/soberania-organica/cozinha-funcional" element={<ReceitasFuncionais />} />
            <Route path="/soberania-organica/cozinha-funcional/sobremesa-substitui-rivotril" element={<SobremesaSubstituiRivotril />} />
            <Route path="/soberania-organica/cozinha-funcional/gelatina-antiparasitaria" element={<GelatinaAntiparasitaria />} />
            <Route path="/soberania-organica/cozinha-funcional/garrafada-digestiva-ancestral" element={<GarrafadaDigestivaAncestral />} />
            <Route path="/soberania-organica/cozinha-funcional/cha-pressao-hibisco" element={<ChaPressaoHibisco />} />
            <Route path="/soberania-organica/cozinha-funcional/infusao-dor-inflamacao" element={<InfusaoDorInflamacao />} />
            <Route path="/soberania-organica/cozinha-funcional/suco-refluxo-espinheira-santa" element={<SucoRefluxoEspinheiraSanta />} />
            {/* Redirects das URLs antigas (preserva SEO e bookmarks) */}
            <Route path="/receitas-funcionais" element={<LegacyRedirect to="/soberania-organica/cozinha-funcional" />} />
            <Route path="/receitas-funcionais/sobremesa-substitui-rivotril" element={<LegacyRedirect to="/soberania-organica/cozinha-funcional/sobremesa-substitui-rivotril" />} />
            <Route path="/receitas-funcionais/gelatina-antiparasitaria" element={<LegacyRedirect to="/soberania-organica/cozinha-funcional/gelatina-antiparasitaria" />} />
            <Route path="/receitas-funcionais/garrafada-digestiva-ancestral" element={<LegacyRedirect to="/soberania-organica/cozinha-funcional/garrafada-digestiva-ancestral" />} />
            <Route path="/soberania-organica/gestao-agua-micro" element={<GestaoAguaMicro />} />
            <Route path="/soberania-organica/primeiros-socorros-taticos" element={<PrimeirosSocorrosTaticos />} />
            <Route path="/soberania-organica/edc" element={<EDC />} />
            <Route path="/soberania-organica/protocolo-fogo" element={<ProtocoloFogo />} />
            <Route path="/soberania-organica/conservacao" element={<ConservacaoAlimentos />} />
            <Route path="/soberania-organica/conservacao-alimentos" element={<LegacyRedirect to="/soberania-organica/conservacao" />} />
            <Route path="/soberania-organica/defesa-pessoal" element={<DefesaPessoal />} />
            <Route path="/soberania-organica/defesa-domiciliar" element={<DefesaDomiciliar />} />
            <Route path="/soberania-organica/higiene-mental" element={<HigieneMental />} />
            <Route path="/soberania-organica/autonomia-veicular" element={<AutonomiaVeicular />} />
            <Route path="/soberania-organica/soberania-veicular" element={<Navigate to="/soberania-organica/autonomia-veicular" replace />} />
            <Route path="/soberania-organica/defesa-digital-pessoal" element={<DefesaDigital />} />
            <Route path="/soberania-organica/defesa-digital" element={<Navigate to="/soberania-organica/defesa-digital-pessoal" replace />} />
            <Route path="/soberania-organica/comunicacao-segura" element={<ComunicacaoSegura />} />
            <Route path="/o-que-e-nostr" element={<NostrRedeSemCensura />} />
            <Route path="/nostr-rede-social-sem-censura" element={<LegacyRedirect to="/o-que-e-nostr" />} />
            <Route path="/soberania-organica/nostr-rede-social-sem-censura" element={<LegacyRedirect to="/o-que-e-nostr" />} />
            <Route path="/soberania-organica/autonomia-energetica" element={<AutonomiaEnergetica />} />
            <Route path="/soberania-organica/refugio-rural" element={<RefugioRural />} />
            <Route path="/protocolo-respiratorio/cobre" element={<Cobre />} />
            <Route path="/privacidade" element={<Privacidade />} />
            <Route path="/termos" element={<Termos />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
  </HelmetProvider>
);

export default App;
