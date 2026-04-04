import { Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-teremun-dark text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">TEREMUN</h3>
            <p className="text-teremun-blush/80 leading-relaxed">
              Formando líderes del mañana a través del debate y la diplomacia internacional.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Navegación</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-teremun-blush/80 hover:text-teremun-gold transition-colors">
                  Inicio
                </Link>
              </li>
              <li>
                <Link to="/quienes-somos" className="text-teremun-blush/80 hover:text-teremun-gold transition-colors">
                  Quiénes Somos
                </Link>
              </li>
              <li>
                <Link to="/comisiones" className="text-teremun-blush/80 hover:text-teremun-gold transition-colors">
                  Comisiones
                </Link>
              </li>
              <li>
                <Link to="/teremun-kids" className="text-teremun-blush/80 hover:text-teremun-gold transition-colors">
                  Teremun Kids
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Contacto</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Mail size={20} className="text-teremun-gold flex-shrink-0 mt-0.5" />
                <span className="text-teremun-blush/80">teremun@teresianobogota.edu.co</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone size={20} className="text-teremun-gold flex-shrink-0 mt-0.5" />
                <span className="text-teremun-blush/80">(1) 2580265</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={20} className="text-teremun-gold flex-shrink-0 mt-0.5" />
                <a
                  href="https://www.google.com/maps?q=Calle+152+%23+20-42+Bogot%C3%A1%2C+Colombia"
                  target="_blank"
                  rel="noreferrer"
                  className="text-teremun-blush/80 hover:text-teremun-gold transition-colors"
                >
                  Calle 152 # 20 - 42 Bogotá, Colombia
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-teremun-burgundy/40 pt-8">
          <p className="text-center text-teremun-blush/80">
            © {new Date().getFullYear()} TEREMUN. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
