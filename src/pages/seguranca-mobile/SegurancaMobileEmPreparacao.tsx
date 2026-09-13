import { ArrowLeft, ShieldCheck, Smartphone } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import BackToHome from "@/components/BackToHome";
import SeoHead from "@/components/SeoHead";
import { Button } from "@/components/ui/button";

type PlannedPage = {
  title: string;
  category: string;
  description: string;
};

const PLANNED_PAGES: Record<string, PlannedPage> = {
  "/seguranca-mobile/graphene-vs-calyx": {
    title: "GrapheneOS vs CalyxOS",
    category: "Sistemas Operacionais",
    description: "Comparação técnica para decidir qual sistema atende melhor cada modelo de ameaça e rotina de uso.",
  },
  "/seguranca-mobile/android-mais-inseguro-que-iphone": {
    title: "Android é mais inseguro que iPhone, ou é mito?",
    category: "Curiosidades / Mitos",
    description: "Uma comparação sem torcida entre arquitetura, atualizações, aplicativos, fabricante e comportamento do usuário.",
  },
  "/seguranca-mobile/modo-aviao-desliga-rastreamento": {
    title: "Modo avião realmente desliga o rastreamento?",
    category: "Curiosidades / Mitos",
    description: "O que é desligado, o que pode continuar ativo e quais rastros permanecem no aparelho.",
  },
  "/seguranca-mobile/apagar-app-rastreamento-continua": {
    title: "Apagar o app resolve ou o rastreamento continua?",
    category: "Curiosidades / Mitos",
    description: "Dados locais, identificadores, backups, contas e perfis que podem sobreviver à desinstalação.",
  },
  "/seguranca-mobile/celular-escuta-conversa-anuncio": {
    title: "Celular escuta conversa para mostrar anúncio?",
    category: "Curiosidades / Mitos",
    description: "Microfone, permissões, correlação de dados e por que anúncios parecem saber o que foi dito.",
  },
  "/seguranca-mobile/imei-rastreia-sem-chip": {
    title: "Número de IMEI pode te rastrear mesmo sem chip?",
    category: "Curiosidades / Mitos",
    description: "Como IMEI, rede celular, Wi-Fi e outros identificadores se relacionam com rastreamento.",
  },
  "/seguranca-mobile/imsi-catcher-como-funciona": {
    title: "O que é IMSI Catcher e como funciona",
    category: "Ameaças Específicas",
    description: "Falsas antenas, identificação de aparelhos, limites do ataque e sinais que merecem atenção.",
  },
  "/seguranca-mobile/sim-swap-como-funciona": {
    title: "SIM Swap: como te roubam o número e a conta",
    category: "Ameaças Específicas",
    description: "Engenharia social, portabilidade fraudulenta, recuperação de contas e defesa prática.",
  },
  "/seguranca-mobile/stalkerware-apps-espioes": {
    title: "Stalkerware: apps espiões",
    category: "Ameaças Específicas",
    description: "Como aplicativos espiões entram no celular, quais sinais deixam e como responder com segurança.",
  },
  "/seguranca-mobile/operadora-vende-dados-localizacao": {
    title: "Como sua operadora vende seus dados de localização",
    category: "Ameaças Específicas",
    description: "Registros de antena, intermediários de dados, consentimento opaco e limites de proteção.",
  },
  "/seguranca-mobile/bluetooth-wifi-rastreamento": {
    title: "Bluetooth e Wi-Fi: o rastreamento que você não percebe",
    category: "Ameaças Específicas",
    description: "Sondas, endereços MAC, beacons, redes conhecidas e rastreamento em ambientes físicos.",
  },
  "/seguranca-mobile/checklist-permissoes-celular": {
    title: "Checklist de permissões: o que revogar agora",
    category: "Guias Práticos de Hardening",
    description: "Revisão objetiva de câmera, microfone, localização, contatos, notificações e acesso em segundo plano.",
  },
  "/seguranca-mobile/sair-do-google-sem-trocar-aparelho": {
    title: "Como sair do ecossistema Google sem trocar de aparelho",
    category: "Guias Práticos de Hardening",
    description: "Reduza a dependência de serviços Google por etapas, sem exigir um celular novo no primeiro dia.",
  },
  "/seguranca-mobile/signal-vs-whatsapp-vs-telegram": {
    title: "Apps de mensagem: Signal vs WhatsApp vs Telegram",
    category: "Guias Práticos de Hardening",
    description: "Comparação de criptografia, metadados, backups, identidade, grupos e modelo de confiança.",
  },
  "/seguranca-mobile/2fa-authenticator-vs-sms": {
    title: "2FA: app authenticator vs SMS",
    category: "Guias Práticos de Hardening",
    description: "Diferenças de segurança, risco de SIM Swap, recuperação de acesso e escolha adequada para cada conta.",
  },
};

export default function SegurancaMobileEmPreparacao() {
  const { pathname } = useLocation();
  const page = PLANNED_PAGES[pathname];

  if (!page) return null;

  return (
    <>
      <SeoHead custom={{
        title: `${page.title} | Segurança Mobile`,
        description: page.description,
        canonical: `https://lordjunnior.lovable.app${pathname}`,
        primaryKeyword: page.title,
        lsiKeywords: ["segurança mobile", "privacidade no celular", page.category],
        longTailKeywords: [page.title],
        breadcrumbs: [
          { name: "Início", url: "/" },
          { name: "Segurança Mobile", url: "/seguranca-mobile" },
          { name: page.category, url: pathname },
          { name: page.title, url: pathname },
        ],
        schemaType: "WebPage",
      }} />

      <main className="relative min-h-screen overflow-hidden bg-background px-6 py-24 text-foreground md:px-12 lg:px-20">
        <div className="absolute inset-x-0 top-0 z-10 px-6 pt-[52px] md:px-12 lg:px-20">
          <BackToHome />
        </div>
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_75%_20%,hsl(var(--primary)/0.12),transparent_32%)]" />
        <div className="relative mx-auto flex min-h-[72vh] max-w-5xl items-center">
          <section className="w-full border-y border-border/50 py-14 md:py-20">
            <div className="mb-8 flex items-center gap-4 text-primary">
              <div className="flex h-12 w-12 items-center justify-center rounded-md border border-primary/30 bg-primary/10">
                <Smartphone className="h-6 w-6" aria-hidden="true" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.24em]">Segurança Mobile</p>
                <p className="mt-1 text-sm text-muted-foreground">{page.category}</p>
              </div>
            </div>

            <h1 className="max-w-4xl font-display text-5xl font-black uppercase leading-[0.95] tracking-normal md:text-7xl">
              {page.title}
            </h1>
            <p className="mt-8 max-w-3xl text-lg leading-relaxed text-muted-foreground md:text-xl">
              {page.description}
            </p>

            <div className="mt-10 flex items-center gap-3 border-l-2 border-primary pl-5">
              <ShieldCheck className="h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
              <p className="font-semibold">Conteúdo completo em preparação.</p>
            </div>

            <Button asChild variant="outline" size="lg" className="mt-12">
              <Link to="/seguranca-mobile">
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                Voltar para Segurança Mobile
              </Link>
            </Button>
          </section>
        </div>
      </main>
    </>
  );
}