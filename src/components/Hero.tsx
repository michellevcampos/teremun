import { useEffect, useRef, useState } from 'react';
import { ArrowRight, BookOpenText, Building2, Crown, Instagram, Pause, Play, Sparkles, UserRoundCheck, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

type Countdown = {
  dias: number;
  horas: number;
  minutos: number;
  segundos: number;
};

const targetDate = new Date('2026-09-17T00:00:00');

const getCountdown = (): Countdown => {
  const difference = targetDate.getTime() - new Date().getTime();
  if (difference <= 0) {
    return { dias: 0, horas: 0, minutos: 0, segundos: 0 };
  }

  const totalSeconds = Math.floor(difference / 1000);
  const dias = Math.floor(totalSeconds / (60 * 60 * 24));
  const horas = Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60));
  const minutos = Math.floor((totalSeconds % (60 * 60)) / 60);
  const segundos = totalSeconds % 60;

  return { dias, horas, minutos, segundos };
};

const pad = (value: number) => value.toString().padStart(2, '0');
const Hero = () => {
  const [countdown, setCountdown] = useState<Countdown>(() => getCountdown());
  const trailerVideoRef = useRef<HTMLVideoElement | null>(null);
  const trailerContainerRef = useRef<HTMLDivElement | null>(null);
  const [isVideoPaused, setIsVideoPaused] = useState(true);
  const [isVideoHovered, setIsVideoHovered] = useState(false);
  const [isUserPaused, setIsUserPaused] = useState(false);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCountdown(getCountdown());
    }, 1000);

    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const video = trailerVideoRef.current;
    if (!video) return;

    video.volume = 0.45;
  }, []);

  useEffect(() => {
    const video = trailerVideoRef.current;
    const container = trailerContainerRef.current;
    if (!video || !container) return;

    // Approximation of "~10 cm visible": require meaningful section visibility before autoplay.
    const observer = new IntersectionObserver(
      ([entry]) => {
        const visibleRatio = entry.intersectionRatio;

        if (visibleRatio >= 0.35) {
          if (isUserPaused) return;

          void video.play().catch(() => {
            // Browser may block autoplay with sound until user interaction.
          });
          return;
        }

        if (!video.paused) {
          video.pause();
        }
      },
      {
        threshold: [0, 0.35, 0.6, 1],
      }
    );

    observer.observe(container);

    return () => observer.disconnect();
  }, [isUserPaused]);

  const toggleTrailerPlayback = () => {
    const video = trailerVideoRef.current;
    if (!video) return;

    if (video.paused) {
      setIsUserPaused(false);
      void video.play().catch(() => {
        // Playback can be blocked by browser policies until user interaction.
      });
      return;
    }

    setIsUserPaused(true);
    video.pause();
  };

  const scrollToTrailer = () => {
    const trailer = trailerContainerRef.current;
    if (!trailer) return;

    const rect = trailer.getBoundingClientRect();
    const centeredOffset = (window.innerHeight - rect.height) / 2;
    const targetTop = window.scrollY + rect.top - Math.max(0, centeredOffset);

    window.scrollTo({ top: Math.max(0, targetTop), behavior: 'smooth' });
  };

  const quickLinks = [
    { label: 'Quiénes Somos', to: '/quienes-somos', icon: Users },
    { label: 'Encargados', to: '/encargados', icon: UserRoundCheck },
    { label: 'Comisiones', to: '/comisiones', icon: Building2 },
    { label: 'Liderazgo', to: '/liderazgo', icon: Crown },
    { label: 'Teremun Kids', to: '/teremun-kids', icon: Sparkles },
    { label: 'Material de Apoyo', to: '/material-apoyo', icon: BookOpenText },
  ];

  return (
    <div className="bg-gradient-to-br from-teremun-blush via-white/70 to-teremun-blush">
      <section className="relative min-h-screen flex items-center justify-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center w-full">
          <div className="animate-fade-in">
            <h1 className="font-dm-serif-display text-[3.4rem] sm:text-[4.1rem] lg:text-[4.8rem] text-teremun-dark mb-6 leading-tight">
              Bienvenidos a <span className="text-teremun-burgundy">TEREMUN</span>
            </h1>
            <p className="text-xl sm:text-2xl text-teremun-mahogany mb-10 max-w-3xl mx-auto leading-relaxed">
              Un espacio de debate, diplomacia y liderazgo donde los estudiantes
              construyen el futuro a través del diálogo internacional
            </p>
            <button
              type="button"
              onClick={scrollToTrailer}
              className="inline-flex items-center gap-2 bg-teremun-burgundy text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-teremun-wine transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1"
            >
              Descubre Más
              <ArrowRight size={20} />
            </button>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-teremun-burgundy/50 rounded-full flex justify-center">
            <div className="w-1.5 h-3 bg-teremun-burgundy/50 rounded-full mt-2"></div>
          </div>
        </div>
      </section>

          <section id="trailer-teremun" className="w-full px-4 sm:px-6 lg:px-8 pt-5 sm:pt-6 pb-6 sm:pb-8">
            <div className="max-w-6xl mx-auto">
              <div
                ref={trailerContainerRef}
                className="group relative h-[56vh] sm:h-[64vh] lg:h-[72vh] overflow-hidden rounded-2xl shadow-xl bg-transparent"
                onMouseEnter={() => setIsVideoHovered(true)}
                onMouseLeave={() => setIsVideoHovered(false)}
              >
                <video
                  ref={trailerVideoRef}
                  className="w-full h-full object-cover scale-[1.01]"
                  style={{ objectPosition: '50% 53%', clipPath: 'inset(0 0 2px 0)' }}
                  src="/Trailer Teremun.mov"
                  loop
                  playsInline
                  preload="metadata"
                  aria-label="Trailer TEREMUN"
                  onPlay={() => setIsVideoPaused(false)}
                  onPause={() => setIsVideoPaused(true)}
                />

                <div
                  className={`pointer-events-none absolute inset-0 transition-opacity duration-300 ${
                    isVideoPaused || isVideoHovered ? 'opacity-100' : 'opacity-0'
                  } ${isVideoPaused ? 'bg-teremun-dark/45' : 'bg-teremun-dark/25'}`}
                />

                <button
                  type="button"
                  onClick={toggleTrailerPlayback}
                  className={`absolute inset-0 m-auto h-20 w-20 sm:h-24 sm:w-24 rounded-full border border-white/50 bg-white/15 backdrop-blur-sm text-white flex items-center justify-center transition-all duration-300 hover:bg-white/25 ${
                    isVideoPaused || isVideoHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
                  }`}
                  aria-label={isVideoPaused ? 'Reproducir trailer' : 'Pausar trailer'}
                >
                  {isVideoPaused ? <Play size={34} className="ml-1" /> : <Pause size={34} />}
                </button>
              </div>
            </div>
          </section>

      <section className="pb-14 sm:pb-18 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-5xl mx-auto pt-8 sm:pt-10">
          <div className="relative rounded-[2rem] border border-teremun-burgundy/25 bg-gradient-to-b from-teremun-blush/60 via-teremun-blush/50 to-teremun-blush/60 shadow-[0_18px_55px_-28px_rgba(63,1,2,0.45)] px-5 sm:px-10 py-8 sm:py-10">
            <div className="pointer-events-none absolute -top-2 left-1/2 -translate-x-1/2 h-4 w-24 rounded-full border border-teremun-burgundy/25 bg-white/80" />

            <h2 className="font-serif text-3xl sm:text-4xl text-teremun-dark mb-6">
              Faltan
            </h2>

            <div className="rounded-2xl border border-teremun-burgundy/20 bg-white/70 px-3 sm:px-6 py-5 sm:py-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-y-7 sm:gap-y-8 gap-x-2 sm:gap-x-6 items-end">
                <div className="relative">
                  <div className="font-serif tabular-nums text-6xl sm:text-7xl lg:text-8xl font-bold text-teremun-burgundy leading-none">
                    {countdown.dias}
                  </div>
                  <div className="mt-2 text-xs sm:text-sm uppercase tracking-[0.22em] text-teremun-mahogany">Días</div>
                </div>

                <div className="relative">
                  <span className="hidden md:block absolute -left-4 top-1/2 -translate-y-1/2 text-4xl text-teremun-burgundy/45">:</span>
                  <div className="font-serif tabular-nums text-6xl sm:text-7xl lg:text-8xl font-bold text-teremun-burgundy leading-none">
                    {pad(countdown.horas)}
                  </div>
                  <div className="mt-2 text-xs sm:text-sm uppercase tracking-[0.22em] text-teremun-mahogany">Horas</div>
                </div>

                <div className="relative">
                  <span className="hidden md:block absolute -left-4 top-1/2 -translate-y-1/2 text-4xl text-teremun-burgundy/45">:</span>
                  <div className="font-serif tabular-nums text-6xl sm:text-7xl lg:text-8xl font-bold text-teremun-burgundy leading-none">
                    {pad(countdown.minutos)}
                  </div>
                  <div className="mt-2 text-xs sm:text-sm uppercase tracking-[0.22em] text-teremun-mahogany">Minutos</div>
                </div>

                <div className="relative">
                  <span className="hidden md:block absolute -left-4 top-1/2 -translate-y-1/2 text-4xl text-teremun-burgundy/45">:</span>
                  <div className="font-serif tabular-nums text-6xl sm:text-7xl lg:text-8xl font-bold text-teremun-burgundy leading-none">
                    {pad(countdown.segundos)}
                  </div>
                  <div className="mt-2 text-xs sm:text-sm uppercase tracking-[0.22em] text-teremun-mahogany">Segundos</div>
                </div>
              </div>
            </div>

            <p className="font-serif text-2xl sm:text-3xl text-teremun-dark mt-7">
              17 y 18 de septiembre
            </p>
          </div>
        </div>
      </section>

      <section id="explorar-secciones" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-teremun-dark text-center mb-10">
            Explorar
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {quickLinks.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="h-44 rounded-2xl border border-teremun-burgundy/25 bg-white/70 hover:bg-white flex flex-col items-center justify-center text-center p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                <item.icon size={36} className="text-teremun-burgundy mb-4" />
                <span className="text-xl font-semibold text-teremun-dark">{item.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-white/50 border-t border-teremun-burgundy/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-12">
            <a
              href="https://www.teresianobogota.edu.co/"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 p-4 rounded-lg hover:bg-teremun-blush/40 transition-colors"
              title="Sitio web del Colegio Teresiano"
            >
              <img src="/logo-teresiano.jpg" alt="Logo Colegio Teresiano" className="h-8 w-8 object-contain" />
              <span className="text-sm font-semibold text-teremun-dark">Colegio Teresiano</span>
            </a>

            <a
              href="https://www.instagram.com/teremun2026/"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 p-4 rounded-lg hover:bg-teremun-blush/40 transition-colors"
              title="Instagram del Colegio Teresiano"
            >
              <Instagram size={24} className="text-teremun-burgundy" />
              <span className="text-sm font-semibold text-teremun-dark">@teremun2026</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
