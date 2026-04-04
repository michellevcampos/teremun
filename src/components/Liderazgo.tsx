import { AlertTriangle, Camera, Crown, Flame, Truck, UsersRound } from 'lucide-react';

const Liderazgo = () => {
  const cargos = [
    {
      icon: AlertTriangle,
      title: 'Emergentes',
      description: 'Pendiente añadir descripción sobre el cargo.'
    },
    {
      icon: Flame,
      title: 'Crisis',
      description: 'Presentan escenarios donde se requieren soluciones rápidas y efectivas.'
    },
    {
      icon: Truck,
      title: 'Logística',
      description: 'Coordina recursos y tiempos para el buen desarrollo del modelo.'
    },
    {
      icon: UsersRound,
      title: 'Adjuntos',
      description: 'Brinda apoyo académico y operativo a las diferentes comisiones.'
    },
    {
      icon: Camera,
      title: 'Prensa',
      description: 'Comunica y documenta los momentos más importantes del evento.'
    },
    {
      icon: Crown,
      title: 'Presidentes',
      description: 'Guía el debate y asegura el cumplimiento del protocolo en comisión.'
    }
  ];

  return (
    <section id="liderazgo" className="py-20 bg-teremun-blush/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-teremun-dark mb-4">
            Cargos de Liderazgo
          </h2>
          <div className="w-24 h-1 bg-teremun-gold mx-auto mb-6"></div>
          <p className="text-xl text-teremun-mahogany max-w-3xl mx-auto">
            Múltiples oportunidades para desarrollar habilidades de liderazgo
            y contribuir al éxito del evento.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cargos.map((cargo, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-8 shadow-md hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-teremun-burgundy rounded-lg flex items-center justify-center flex-shrink-0">
                  <cargo.icon className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-teremun-dark">
                    {cargo.title}
                  </h3>
                </div>
              </div>
              <p className="text-teremun-mahogany leading-relaxed">
                {cargo.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Liderazgo;
