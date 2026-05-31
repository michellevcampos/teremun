import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, NavLink } from 'react-router-dom';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Inicio', href: '/' },
    { name: 'Quiénes Somos', href: '/quienes-somos' },
    { name: 'Encargados', href: '/encargados' },
    { name: 'Comisiones', href: '/comisiones' },
    { name: 'Cargos de Liderazgo', href: '/liderazgo' },
    { name: 'Teremun Kids', href: '/teremun-kids' },
    { name: 'Material de Apoyo', href: '/material-apoyo' },
  ];

  return (
    <nav
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-teremun-blush shadow-lg' : 'bg-teremun-blush/95 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <img src="/titulologoteremun.PNG" alt="TEREMUN" className="h-14 sm:h-16 w-auto object-contain" />
            </Link>
          </div>

          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                className={({ isActive }) =>
                  `transition-colors duration-200 font-medium ${
                    isActive ? 'text-teremun-burgundy' : 'text-teremun-mahogany hover:text-teremun-burgundy'
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-md text-teremun-mahogany hover:text-teremun-burgundy hover:bg-teremun-blush transition-colors"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-teremun-blush border-t border-teremun-burgundy/20">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-md transition-colors ${
                    isActive
                      ? 'text-teremun-burgundy bg-white/70'
                      : 'text-teremun-mahogany hover:text-teremun-burgundy hover:bg-white/70'
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
