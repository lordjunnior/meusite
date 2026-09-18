import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  ArrowLeft, Play, Pause, Headphones, Lock, Volume2, 
  FastForward, Rewind, Radio
} from 'lucide-react';

import coverPaiRico from '@/assets/cover-pai-rico.jpg';
import coverPadraoBitcoin from '@/assets/cover-padrao-bitcoin.jpg';
import coverEticaLiberdade from '@/assets/cover-etica-liberdade.jpg';
import coverAnatomiaEstado from '@/assets/cover-anatomia-estado.jpg';
import coverRiquezaNacoes from '@/assets/cover-riqueza-nacoes.jpg';
import BackToHome from '@/components/BackToHome';
import { supabase } from '@/integrations/supabase/client';
import { canonicalUrl } from '@/lib/site';

const APPLE_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const AUDIOBOOKS_DB = [
  {
    id: 'pai-rico',
    title: 'Pai Rico, Pai Pobre',
    author: 'Robert T. Kiyosaki',
    duration: '16:31:00',
    category: 'Educação Financeira',
    coverImage: coverPaiRico,
    audioPath: 'pai-rico-pai-pobre.mp3'
  },
  {
    id: 'padrao-bitcoin',
    title: 'O Padrão Bitcoin',
    author: 'Saifedean Ammous',
    duration: '10:45:00',
    category: 'Soberania Monetária',
    coverImage: coverPadraoBitcoin
  },
  {
    id: 'etica-liberdade',
    title: 'A Ética da Liberdade',
    author: 'Murray N. Rothbard',
    duration: '14:20:00',
    category: 'Fundamentos',
    coverImage: coverEticaLiberdade
  },
  {
    id: 'anatomia-estado',
    title: 'A Anatomia do Estado',
    author: 'Murray N. Rothbard',
    duration: '02:15:00',
    category: 'Fundamentos',
    coverImage: coverAnatomiaEstado
  },
  {
    id: 'riqueza-nacoes',
    title: 'A Riqueza das Nações',
    author: 'Adam Smith',
    duration: '18:45:00',
    category: 'Economia Clássica',
    coverImage: coverRiquezaNacoes
  }
];

// Visual Equalizer Animation
const VisualEqualizer = ({ active }: { active: boolean }) => (
  <div className="flex items-end gap-0.5 h-4">
    {[0, 150, 300, 450].map((delay, i) => (
      <motion.div
        key={i}
        className="w-1 bg-destructive rounded-t-sm"
        animate={active ? { height: [4, 16, 8, 12, 4] } : { height: 4 }}
        transition={{ duration: 0.8, repeat: active ? Infinity : 0, delay: delay / 1000 }}
      />
    ))}
  </div>
);

// Film Grain Overlay
const FilmGrain = () => (
  <div className="pointer-events-none fixed inset-0 z-50 opacity-[0.035]">
    <svg className="w-full h-full">
      <filter id="grain-audio">
        <feTurbulence baseFrequency="0.9" numOctaves="4" stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#grain-audio)" />
    </svg>
  </div>
);

// Sound Wave Particles
const SoundWaveParticles = () => (
  <>
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-40">
      <div className="sound-particle-layer" />
      <div className="sound-particle-layer sound-layer-2" />
    </div>
    <style>{`
      @keyframes soundDrift {
        0% { transform: translateY(0) translateX(0); opacity: 0.3; }
        50% { transform: translateY(-600px) translateX(80px); opacity: 0.6; }
        100% { transform: translateY(-1200px) translateX(160px); opacity: 0.2; }
      }
      .sound-particle-layer {
        position: absolute; width: 100%; height: 200%;
        background-image:
          radial-gradient(2px 2px at 15% 20%, hsl(var(--destructive) / 0.4) 100%, transparent),
          radial-gradient(1.5px 1.5px at 35% 50%, hsl(var(--destructive) / 0.3) 100%, transparent),
          radial-gradient(1px 1px at 55% 70%, hsl(var(--foreground) / 0.2) 100%, transparent),
          radial-gradient(2px 2px at 75% 30%, hsl(var(--destructive) / 0.35) 100%, transparent),
          radial-gradient(1px 1px at 90% 80%, hsl(var(--foreground) / 0.15) 100%, transparent);
        background-size: 250px 250px;
        animation: soundDrift 70s linear infinite;
      }
      .sound-layer-2 {
        background-size: 320px 320px;
        animation: soundDrift 100s linear infinite reverse;
        opacity: 0.5;
      }
    `}</style>
  </>
);

// Light Beams
const LightBeams = () => (
  <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
    <div 
      className="absolute -top-1/2 -left-1/4 w-full h-[200%] opacity-[0.025]"
      style={{ background: 'linear-gradient(115deg, transparent 40%, hsl(var(--destructive)) 50%, transparent 60%)' }}
    />
  </div>
);

interface AudiobooksProps {
  onPlay?: (track: any) => void;
}

const Audiobooks: React.FC<AudiobooksProps> = ({ onPlay }) => {
  const [activeTrack, setActiveTrack] = useState(AUDIOBOOKS_DB[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [signedUrl, setSignedUrl] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, 150]);
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0.3]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Mint short-lived signed URL whenever a track with audio becomes active.
  useEffect(() => {
    let cancelled = false;
    const path = (activeTrack as any).audioPath as string | undefined;
    if (!path) {
      setSignedUrl(null);
      return;
    }
    supabase.storage
      .from('audiobooks')
      .createSignedUrl(path, 60 * 60)
      .then(({ data, error }) => {
        if (cancelled) return;
        if (error || !data?.signedUrl) {
          setSignedUrl(null);
          return;
        }
        setSignedUrl(data.signedUrl);
      });
    return () => {
      cancelled = true;
    };
  }, [activeTrack]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onTime = () => setCurrentTime(audio.currentTime);
    const onDur = () => setDuration(audio.duration);
    const onEnded = () => setIsPlaying(false);
    audio.addEventListener('timeupdate', onTime);
    audio.addEventListener('loadedmetadata', onDur);
    audio.addEventListener('ended', onEnded);
    return () => {
      audio.removeEventListener('timeupdate', onTime);
      audio.removeEventListener('loadedmetadata', onDur);
      audio.removeEventListener('ended', onEnded);
    };
  }, [activeTrack]);

  const handleTrackClick = (book: any) => {
    setActiveTrack(book);
    setCurrentTime(0);
    if (book.audioPath) {
      setTimeout(() => {
        audioRef.current?.play();
        setIsPlaying(true);
      }, 400);
    } else {
      setIsPlaying(false);
    }
    onPlay?.({ id: book.id, title: book.title, author: book.author, url: '#' });
  };

  const togglePlayState = () => {
    const audio = audioRef.current;
    if (!audio || !(activeTrack as any).audioPath) return;
    if (isPlaying) audio.pause();
    else audio.play();
    setIsPlaying(!isPlaying);
  };

  const seekAudio = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    if (!audio || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = (e.clientX - rect.left) / rect.width;
    audio.currentTime = pct * duration;
  };

  const skipTime = (seconds: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = Math.max(0, Math.min(audio.currentTime + seconds, duration));
  };

  const formatTime = (s: number) => {
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = Math.floor(s % 60);
    return h > 0 ? `${h}:${m.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}` : `${m}:${sec.toString().padStart(2, '0')}`;
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <>
      <div className="relative z-20 px-6 md:px-12 lg:px-20 pt-[52px]">
        <BackToHome />
      </div>

      <Helmet>
        <link rel="canonical" href={canonicalUrl('/audiobooks')} />
        <meta property="og:url" content={canonicalUrl('/audiobooks')} />
        <title>Audioteca Soberana | Audiobooks para Mentes Livres</title>
        <meta name="description" content="Acervo de audiobooks sobre Bitcoin, economia austríaca e filosofia da liberdade. Conhecimento enquanto você vive." />
      </Helmet>

      <div className="min-h-screen bg-[#050808] font-sans selection:bg-destructive selection:text-destructive-foreground relative overflow-hidden">
        <FilmGrain />
        <SoundWaveParticles />
        <LightBeams />
        <audio ref={audioRef} src={signedUrl || ''} preload="metadata" />

        {/* Cinematic Hero */}
        <motion.section 
          ref={heroRef}
          className="relative h-[70vh] min-h-[500px] flex items-end overflow-hidden"
          style={{ y: heroY, opacity: heroOpacity }}
        >
          <div className="absolute inset-0">
            <img 
              src="/heroes/audioteca-soberana.webp" 
              alt="Audioteca Soberana"
              className="w-full h-full object-cover brightness-[0.4] saturate-[0.85] scale-105" loading="eager" fetchPriority="high" decoding="async" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050808] via-[#050808]/60 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#050808]/80 via-transparent to-[#050808]/40" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pb-16 w-full">
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground text-xs uppercase tracking-[0.2em] mb-8 transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Retornar ao Comando
            </Link>

            <motion.div
              initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 1, ease: APPLE_EASE }}
            >
              <div className="flex items-center gap-3 mb-4">
                <Radio className="w-5 h-5 text-destructive" />
                <span className="text-destructive font-black text-[10px] uppercase tracking-[0.3em]">
                  Streaming Exclusivo
                </span>
              </div>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-foreground tracking-tighter leading-[0.9] mb-4">
                AUDIOTECA<br />
                <span className="text-destructive italic font-light">SOBERANA</span>
              </h1>
              <p className="text-muted-foreground text-lg md:text-xl max-w-xl font-medium">
                Conhecimento que entra pelos ouvidos enquanto você vive. Sem distrações. Sem algoritmos.
              </p>
            </motion.div>
          </div>
        </motion.section>

        {/* Main Content */}
        <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
            
            {/* Player Principal */}
            <motion.div 
              className="lg:col-span-5"
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: APPLE_EASE }}
            >
              <div className="sticky top-32">
                <div className="text-foreground text-[10px] font-bold uppercase tracking-[0.2em] flex items-center gap-2 mb-6 opacity-60">
                  <Headphones className="w-4 h-4" /> Em Destaque
                </div>
                
                {/* Album Art */}
                <motion.div 
                  className="w-full aspect-square rounded-2xl mb-8 relative overflow-hidden border border-border/30 group cursor-pointer"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.4, ease: APPLE_EASE }}
                  onClick={togglePlayState}
                >
                  <img 
                    src={activeTrack.coverImage} 
                    alt={activeTrack.title} 
                    className="absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-105 group-hover:brightness-75" loading="lazy" decoding="async" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <motion.button 
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-black/50 backdrop-blur-md border border-border/50 rounded-full flex items-center justify-center text-foreground opacity-0 group-hover:opacity-100 transition-all duration-300"
                    whileHover={{ scale: 1.1, backgroundColor: 'hsl(var(--destructive))' }}
                  >
                    {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 translate-x-0.5" />}
                  </motion.button>
                </motion.div>

                {/* Track Info */}
                <div>
                  <h2 className="text-3xl md:text-4xl font-black text-foreground mb-2 tracking-tight">
                    {activeTrack.title}
                  </h2>
                  <p className="text-xl text-muted-foreground font-light mb-6">
                    {activeTrack.author}
                  </p>
                  
                  {/* Progress Bar */}
                  <div className="mb-6">
                    <div 
                      className="w-full h-1.5 bg-border/30 rounded-full cursor-pointer group/bar overflow-hidden"
                      onClick={seekAudio}
                    >
                      <motion.div 
                        className="h-full bg-gradient-to-r from-destructive to-destructive/70 rounded-full relative"
                        style={{ width: `${progress}%` }}
                        layoutId="progress"
                      />
                    </div>
                    <div className="flex justify-between mt-2 text-[10px] font-mono text-muted-foreground">
                      <span>{formatTime(currentTime)}</span>
                      <span>{duration > 0 ? formatTime(duration) : activeTrack.duration}</span>
                    </div>
                  </div>

                  {/* Controls */}
                  <div className="flex items-center justify-between p-4 bg-card/50 backdrop-blur-sm border border-border/30 rounded-xl">
                    <div className="flex items-center gap-4">
                      <button onClick={() => skipTime(-30)} className="text-muted-foreground hover:text-foreground transition-colors" title="-30s">
                        <Rewind className="w-5 h-5" />
                      </button>
                      <motion.button 
                        onClick={togglePlayState}
                        className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${(activeTrack as any).audioPath ? 'bg-foreground text-background hover:bg-destructive' : 'bg-muted text-muted-foreground cursor-not-allowed'}`}
                        whileHover={(activeTrack as any).audioPath ? { scale: 1.05 } : {}}
                        whileTap={(activeTrack as any).audioPath ? { scale: 0.95 } : {}}
                      >
                        {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 translate-x-0.5" />}
                      </motion.button>
                      <button onClick={() => skipTime(30)} className="text-muted-foreground hover:text-foreground transition-colors" title="+30s">
                        <FastForward className="w-5 h-5" />
                      </button>
                    </div>
                    <div className="flex items-center gap-2">
                      <Volume2 className="w-4 h-4 text-muted-foreground" />
                      <div className="w-16 h-1 bg-border/30 rounded-full overflow-hidden">
                        <div className="w-2/3 h-full bg-muted-foreground rounded-full" />
                      </div>
                    </div>
                  </div>
                  
                  {!(activeTrack as any).audioPath && (
                    <p className="text-[10px] text-muted-foreground uppercase tracking-widest mt-4 text-center">
                      Em breve disponível
                    </p>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Tracklist */}
            <motion.div 
              className="lg:col-span-7 pt-4 lg:pt-14"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: APPLE_EASE }}
            >
              <div className="flex items-center justify-between mb-8 border-b border-border/30 pb-4">
                <h3 className="text-2xl font-black text-foreground tracking-tight">Acervo Sonoro</h3>
                <span className="text-xs text-muted-foreground font-mono">{AUDIOBOOKS_DB.length} Obras</span>
              </div>

              <div className="space-y-3">
                {AUDIOBOOKS_DB.map((book, index) => {
                  const isActive = activeTrack.id === book.id;
                  return (
                    <motion.div 
                      key={book.id} 
                      onClick={() => handleTrackClick(book)}
                      className={`group flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all duration-300 border ${
                        isActive 
                          ? 'bg-card/50 border-border/50 shadow-lg' 
                          : 'bg-transparent border-transparent hover:bg-card/30 hover:border-border/30'
                      }`}
                      whileHover={{ x: 4 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="w-8 flex justify-center shrink-0">
                        {isActive && isPlaying ? (
                          <VisualEqualizer active={true} />
                        ) : (
                          <span className={`text-sm font-mono font-bold ${isActive ? 'text-destructive' : 'text-muted-foreground group-hover:text-foreground'}`}>
                            {(index + 1).toString().padStart(2, '0')}
                          </span>
                        )}
                      </div>

                      <div className="w-12 h-12 rounded-lg shrink-0 overflow-hidden border border-border/20">
                        <img src={book.coverImage} alt={book.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" decoding="async" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h4 className={`text-base font-bold truncate transition-colors ${isActive ? 'text-destructive' : 'text-foreground group-hover:text-destructive'}`}>
                          {book.title}
                        </h4>
                        <div className="flex items-center gap-3 text-sm mt-0.5">
                          <span className="text-muted-foreground truncate">{book.author}</span>
                          <span className="w-1 h-1 bg-border rounded-full" />
                          <span className="text-muted-foreground/60 text-xs uppercase tracking-widest truncate">{book.category}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-6 shrink-0 pl-4">
                        <span className="text-muted-foreground font-mono text-xs hidden sm:block">
                          {book.duration}
                        </span>
                        <motion.button 
                          className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all ${
                            isActive
                              ? 'border-destructive text-destructive bg-destructive/10'
                              : 'border-border/30 text-foreground opacity-0 group-hover:opacity-100 group-hover:bg-foreground group-hover:text-background group-hover:border-foreground'
                          }`}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          {isActive && isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 translate-x-0.5" />}
                        </motion.button>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Footer */}
              <div className="mt-20 pt-8 border-t border-border/30 flex flex-col md:flex-row items-center justify-between gap-4">
                <p className="text-[10px] text-muted-foreground uppercase tracking-widest">
                  Lord Junnior © 2026
                </p>
                <div className="flex items-center gap-6">
                  <Link to="#" className="text-[10px] text-muted-foreground hover:text-foreground uppercase tracking-wider transition-colors">Termos</Link>
                  <Link to="#" className="text-[10px] text-muted-foreground hover:text-foreground uppercase tracking-wider transition-colors flex items-center gap-1">
                    <Lock className="w-3 h-3" /> PGP
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Audiobooks;
