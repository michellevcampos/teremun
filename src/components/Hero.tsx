import { ArrowRight, BookOpenText, Building2, Crown, Instagram, Sparkles, UserRoundCheck, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  const quickLinks = [
    { label: 'Quiénes Somos', to: '/quienes-somos', icon: Users },
    { label: 'Encargados', to: '/encargados', icon: UserRoundCheck },
    { label: 'Comisiones', to: '/comisiones', icon: Building2 },
    { label: 'Liderazgo', to: '/liderazgo', icon: Crown },
    { label: 'Teremun Kids', to: '/teremun-kids', icon: Sparkles },
    { label: 'Material de Apoyo', to: '/material-apoyo', icon: BookOpenText },
  ];

  return (
    <div className="bg-gradient-to-br from-teremun-blush via-white to-teremun-blush/60">
      <section className="relative min-h-screen flex items-center justify-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
          <div className="animate-fade-in">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-teremun-dark mb-6 leading-tight">
              Bienvenidos a <span className="text-teremun-burgundy">TEREMUN</span>
            </h1>
            <p className="text-xl sm:text-2xl text-teremun-mahogany mb-10 max-w-3xl mx-auto leading-relaxed">
              Un espacio de debate, diplomacia y liderazgo donde los estudiantes
              construyen el futuro a través del diálogo internacional
            </p>
            <a
              href="#explorar-secciones"
              className="inline-flex items-center gap-2 bg-teremun-burgundy text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-teremun-wine transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1"
            >
              Descubre Más
              <ArrowRight size={20} />
            </a>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-teremun-burgundy/50 rounded-full flex justify-center">
            <div className="w-1.5 h-3 bg-teremun-burgundy/50 rounded-full mt-2"></div>
          </div>
        </div>
      </section>

      <section id="explorar-secciones" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
              href="https://www.instagram.com/teresianobogota/"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 p-4 rounded-lg hover:bg-teremun-blush/40 transition-colors"
              title="Instagram del Colegio Teresiano"
            >
              <Instagram size={24} className="text-teremun-burgundy" />
              <span className="text-sm font-semibold text-teremun-dark">@teresianobogota</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
