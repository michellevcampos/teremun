import { useEffect } from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import QuienesSomos from './components/QuienesSomos';
import Encargados from './components/Encargados';
import Comisiones from './components/Comisiones';
import Liderazgo from './components/Liderazgo';
import TeremunKids from './components/TeremunKids';
import Footer from './components/Footer';
import MaterialApoyo from './components/MaterialApoyo';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  return null;
}

function App() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/quienes-somos" element={<div className="pt-16"><QuienesSomos /></div>} />
          <Route path="/encargados" element={<div className="pt-16"><Encargados /></div>} />
          <Route path="/comisiones" element={<div className="pt-16"><Comisiones /></div>} />
          <Route path="/liderazgo" element={<div className="pt-16"><Liderazgo /></div>} />
          <Route path="/teremun-kids" element={<div className="pt-16"><TeremunKids /></div>} />
          <Route path="/material-apoyo" element={<div className="pt-16"><MaterialApoyo /></div>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
