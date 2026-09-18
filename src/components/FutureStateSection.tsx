import { ArrowRight, KeyRound, Landmark, Sprout } from "lucide-react";
import { Link } from "react-router-dom";
import hardwareImage from "@/assets/bitcoin-hardware-wallet.webp";
import foodImage from "@/assets/alimentar/aquaponia-colheita.webp";
import autonomyImage from "@/assets/bitpark-banco-vs-bitcoin.webp";

const outcomes = [
  {
    title: "Chaves sob seu controle",
    description: "Você dorme sabendo que nenhuma corretora pode congelar o que está protegido em casa.",
    href: "/autocustodia",
    image: hardwareImage,
    alt: "Hardware wallet usada para manter chaves de Bitcoin sob controle próprio",
    icon: KeyRound,
  },
  {
    title: "Dinheiro sem ponto único de falha",
    description: "Sua rotina continua mesmo quando um banco limita, bloqueia ou simplesmente deixa de funcionar.",
    href: "/soberania-financeira",
    image: autonomyImage,
    alt: "Contraste entre a dependência bancária e uma rota financeira soberana com Bitcoin",
    icon: Landmark,
  },
  {
    title: "Alimento que começa em casa",
    description: "Parte da mesa deixa de depender de uma cadeia distante que você não controla.",
    href: "/soberania-organica/comece-aqui",
    image: foodImage,
    alt: "Colheita doméstica de vegetais produzidos em sistema de aquaponia",
    icon: Sprout,
  },
];

export default function FutureStateSection() {
  return (
    <section className="theme-editorial bg-editorial-sand text-editorial-ink px-5 py-20 md:px-10 md:py-28 lg:px-14">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 border-b border-editorial-teal/20 pb-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <p className="font-impact text-xs font-extrabold uppercase text-editorial-terracotta">
              O estado desejado
            </p>
            <h2 className="mt-4 max-w-4xl font-impact text-4xl font-black leading-[0.95] text-editorial-teal md:text-6xl lg:text-7xl">
              A tranquilidade de não depender de uma única porta.
            </h2>
          </div>
          <p className="max-w-2xl text-lg leading-relaxed text-editorial-ink/80 md:text-xl">
            Soberania não é viver em alerta permanente. É reduzir dependências até o caos externo virar ruído de fundo. Suas chaves ficam em casa, seu dinheiro encontra rotas alternativas e parte do alimento nasce onde sua família vive.
          </p>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {outcomes.map(({ title, description, href, image, alt, icon: Icon }) => (
            <Link
              key={title}
              to={href}
              className="group overflow-hidden border border-editorial-teal/20 bg-editorial-sand-deep transition duration-500 hover:-translate-y-1 hover:border-editorial-terracotta focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-editorial-terracotta"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={image}
                  alt={alt}
                  loading="lazy"
                  width={1280}
                  height={960}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04] motion-reduce:transition-none"
                />
              </div>
              <div className="p-6 md:p-7">
                <Icon className="h-5 w-5 text-editorial-terracotta" aria-hidden="true" />
                <h3 className="mt-5 font-impact text-2xl font-black text-editorial-teal">{title}</h3>
                <p className="mt-3 leading-relaxed text-editorial-ink/75">{description}</p>
                <span className="mt-6 inline-flex items-center gap-2 font-semibold text-editorial-terracotta">
                  Construir esta camada
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 motion-reduce:transition-none" aria-hidden="true" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}