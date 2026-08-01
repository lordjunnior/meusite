import React, { useState, useEffect, useMemo } from 'react';
import { PlaneTakeoff, Globe, ShieldAlert, Landmark, Zap, Activity, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import BackToHome from '@/components/BackToHome';
import SeoHead from '@/components/SeoHead';

const DESTINATIONS = [
  { id: 'us', name: 'Estados Unidos', flight: 4000, visa: 25000, rent: 12000, tax: '10-37%' },
  { id: 'ar', name: 'Argentina (Milei)', flight: 1200, visa: 500, rent: 2800, tax: 'Varia (em queda)' },
  { id: 'py', name: 'Paraguai', flight: 1200, visa: 5000, rent: 2500, tax: '10%' },
  { id: 'ae', name: 'Dubai', flight: 6500, visa: 15000, rent: 15000, tax: '0%' },
  { id: 'uy', name: 'Uruguai', flight: 1500, visa: 800, rent: 4000, tax: '12%' },
  { id: 'pt', name: 'Portugal', flight: 5500, visa: 1200, rent: 6000, tax: '28%' },
  { id: 'uk', name: 'Reino Unido', flight: 6000, visa: 3000, rent: 9000, tax: '20-45%' },
  { id: 'es', name: 'Espanha', flight: 5200, visa: 1500, rent: 5500, tax: '19-47%' },
  { id: 'it', name: 'Itália', flight: 5400, visa: 1400, rent: 5000, tax: '23-43%' },
  { id: 'ge', name: 'Geórgia', flight: 5800, visa: 0, rent: 3000, tax: '1% (Small Biz)' },
];

const TaxaDeFuga: React.FC = () => {
  const [destinationId, setDestinationId] = useState('py');
  const [familySize, setFamilySize] = useState(1);
  const [hasPassport, setHasPassport] = useState(true);
  const [btcPrice, setBtcPrice] = useState(540000);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=brl')
      .then(res => res.json())
      .then(data => setBtcPrice(data.bitcoin.brl))
      .catch(() => console.log("Usando fallback de segurança"));
  }, []);

  const result = useMemo(() => {
    const dest = DESTINATIONS.find(d => d.id === destinationId) || DESTINATIONS[0];
    const flights = dest.flight * familySize;
    const visaTotal = dest.visa + (dest.visa * 0.2 * (familySize - 1));
    const emergencyFund = dest.rent * 3;
    const passportFees = hasPassport ? 0 : 750 * familySize;
    const totalBRL = flights + visaTotal + emergencyFund + passportFees;
    const totalBTC = totalBRL / btcPrice;
    return { totalBRL, totalBTC, dest };
  }, [destinationId, familySize, hasPassport, btcPrice]);

  return (
    <div className="min-h-screen bg-background text-foreground font-mono">
      <SeoHead
        custom={{
          title: 'Taxa de Fuga: calcule o custo de sair do Brasil',
          description: 'Calculadora de custo de saida do Brasil: passagens, vistos, reserva de emergencia e o valor equivalente em Bitcoin para 10 jurisdicoes.',
          canonical: 'https://lordjunnior.com.br/taxa-de-fuga',
          primaryKeyword: 'custo para sair do brasil',
          lsiKeywords: ['residencia no exterior', 'segundo passaporte', 'expatriacao', 'jurisdicao fiscal', 'bitcoin no exterior'],
          longTailKeywords: ['quanto custa sair do brasil com a familia', 'calculadora de custo de expatriacao', 'quanto custa morar no paraguai'],
          breadcrumbs: [
            { name: 'Inicio', url: '/' },
            { name: 'Saida', url: '/saida' },
            { name: 'Taxa de Fuga', url: '/taxa-de-fuga' },
          ],
          schemaType: 'WebPage',
        }}
      />
      <div className="relative z-20 px-6 md:px-12 lg:px-20 pt-[52px]">
        <BackToHome />
      </div>

      {/* Scanlines effect */}
      <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.03]"
        style={{ backgroundImage: 'repeating-linear-gradient(0deg, #fff, #fff 1px, transparent 1px, transparent 2px)', backgroundSize: '100% 3px' }} />

      <div className="max-w-6xl mx-auto px-4 py-12 relative z-10">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm font-sans">Voltar</span>
        </button>

        {/* Header */}
        <header className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center justify-center p-4 border border-gold-dim/30 rounded-full glow-gold mb-6">
            <Globe className="text-gold animate-pulse" size={56} />
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase italic font-sans">
            TAXA DE FUGA
          </h1>
          <p className="text-gold text-[10px] md:text-xs tracking-[0.5em] font-black uppercase opacity-80">
            CALCULADORA DE CUSTO DE SAÍDA DO BRASIL. PLANEJE SUA LIBERDADE GEOGRÁFICA.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Config Panel */}
          <section className="card-wealth p-8 space-y-8 relative">
            <div className="absolute top-0 left-0 w-1 h-full rounded-l-lg" style={{ background: 'hsl(var(--gold))' }} />

            <div className="space-y-6">
              <div className="space-y-3">
                <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest flex items-center gap-2 italic">
                  <Activity size={14} className="text-gold" /> Selecionar Nova Jurisdição
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {DESTINATIONS.map(d => (
                    <button key={d.id} onClick={() => setDestinationId(d.id)}
                      className={`p-3 border font-bold text-[10px] uppercase tracking-widest transition-all rounded ${
                        destinationId === d.id
                          ? 'bg-gold/10 border-gold-dim text-gold glow-gold'
                          : 'bg-background border-border text-muted-foreground hover:border-gold-dim/50'
                      }`}>
                      {d.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest italic">Unidades Familiares</label>
                  <span className="text-gold font-black text-xs">{familySize.toString().padStart(2, '0')}</span>
                </div>
                <input type="range" min="1" max="8" value={familySize}
                  onChange={(e) => setFamilySize(Number(e.target.value))}
                  className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-[hsl(var(--gold))]" />
              </div>

              <div className="p-4 bg-background border border-border rounded flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Landmark size={18} className="text-muted-foreground" />
                  <span className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Passaporte Ativo?</span>
                </div>
                <button onClick={() => setHasPassport(!hasPassport)}
                  className={`px-5 py-2 font-black text-[10px] uppercase border rounded transition-all ${
                    hasPassport
                      ? 'bg-gold/10 border-gold-dim text-gold'
                      : 'border-destructive/50 text-destructive bg-destructive/10'
                  }`}>
                  {hasPassport ? 'POSITIVO' : 'NEGATIVO'}
                </button>
              </div>
            </div>
          </section>

          {/* Results Panel */}
          <section className="space-y-6">
            <div className="card-wealth p-8 relative overflow-hidden border-gold-dim/30">
              <div className="absolute top-4 right-6 text-gold/10"><PlaneTakeoff size={140} /></div>

              <div className="relative z-10 space-y-1 mb-10">
                <span className="text-[10px] text-gold/60 font-black uppercase tracking-[0.3em]">Capital de Evasão (BRL)</span>
                <p className="text-5xl md:text-6xl font-black tracking-tighter italic font-sans">
                  R$ {result.totalBRL.toLocaleString()}
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between text-[10px] font-black text-gold uppercase tracking-widest">
                  <div className="flex items-center gap-2"><Zap size={14} className="fill-current" /> Custo em Bitcoin</div>
                  <span>{result.totalBTC.toFixed(4)} BTC</span>
                </div>
                <div className="h-12 bg-background border border-gold-dim/20 p-1 rounded">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 1.5 }}
                    className="h-full rounded relative overflow-hidden gradient-gold"
                    style={{
                      boxShadow: '0 0 30px hsl(var(--gold) / 0.3)',
                      backgroundImage: 'repeating-linear-gradient(-45deg, transparent, transparent 15px, rgba(0,0,0,0.1) 15px, rgba(0,0,0,0.2) 30px)',
                    }}
                  >
                    <div className="absolute right-0 top-0 bottom-0 w-3 bg-white/30 blur-md" />
                  </motion.div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="card-wealth p-6 text-center hover:border-gold-dim transition-all">
                <span className="text-[9px] text-muted-foreground uppercase font-black block mb-2 tracking-widest">Imposto Jurisdição</span>
                <p className="text-2xl font-black text-gold italic uppercase">{result.dest.tax}</p>
              </div>
              <div className="card-wealth p-6 text-center hover:border-gold-dim transition-all">
                <span className="text-[9px] text-muted-foreground uppercase font-black block mb-2 tracking-widest">Custódia Recomendada</span>
                <p className="text-2xl font-black italic uppercase">COLD STORAGE</p>
              </div>
            </div>

            <div className="bg-destructive/5 border border-destructive/30 p-6 flex gap-5 items-center rounded-lg">
              <ShieldAlert className="text-destructive shrink-0" size={28} />
              <p className="text-[10px] text-destructive font-bold uppercase tracking-widest leading-relaxed">
                ALERTA: O Brasil não é um país para amadores. A fuga de capital é o último recurso de defesa do indivíduo soberano perante a tirania burocrática.
              </p>
            </div>
          </section>
        </div>

        <footer className="mt-24 text-center font-mono text-[9px] text-muted-foreground/30 tracking-[0.4em] font-black uppercase border-t border-border pt-12">
          EXIT_BRAZIL // PROTOCOLO_ÊXODO // LORD_JUNNIOR // SOBERANIA_OU_MORTE
        </footer>
      </div>
    </div>
  );
};

export default TaxaDeFuga;
