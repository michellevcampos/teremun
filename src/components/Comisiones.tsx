import { useState } from 'react';
import { Building2, Scale, Heart, Leaf, X } from 'lucide-react';

const Comisiones = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const comisiones = [
    {
      icon: Building2,
      name: 'ACNUR',
      topic: 'Comisión Política',
      description: 'Análisis político del desplazamiento forzado.',
      tema: 'Transformaciones políticas que afectan a personas desplazadas y apátridas de su nación.',
      problematica: 'Consecuencias de cambios gubernamentales que llevan al desplazamiento hacia fronteras de países cercanos.',
      enfoque: 'Alianzas y pactos con países presentes en la comisión que tengan mayor capacidad para recibir esta población.'
    },
    {
      icon: Heart,
      name: 'UNICEF',
      topic: 'Comisión Humanitaria',
      description: 'Protección integral de menores en riesgo.',
      tema: 'Los menores de edad en entornos violentos.',
      problematica: 'Inseguridad en entornos cotidianos de adolescentes por el flagelo de la violencia en el mundo.',
      enfoque: 'Repercusión en la salud mental adolescente y en sus conductas futuras frente a la violencia en distintos países.'
    },
    {
      icon: Scale,
      name: 'ONUDI',
      topic: 'Comisión Económica',
      description: 'Impulso industrial y desarrollo regional.',
      tema: 'Desarrollo en maquinaria en América Latina.',
      problematica: 'Contrabando, baja rentabilidad, mala infraestructura y altos costos logísticos como barreras al desarrollo industrial.',
      enfoque: 'Impacto económico en países latinoamericanos a partir del fortalecimiento del desarrollo industrial con maquinaria.'
    },
    {
      icon: Leaf,
      name: 'OIEA',
      topic: 'Comisión Ambiental',
      description: 'Control de riesgos radiológicos en ecosistemas.',
      tema: 'Contaminación de mares y costas por radiación.',
      problematica: 'Muerte de la vida marítima y deterioro de sus ecosistemas por la radiación.',
      enfoque: 'Incumplimiento de regulaciones por empresas que usan energías atómicas sin considerar el ecosistema marítimo.'
    }
  ];

  const selectedComision = selectedIndex !== null ? comisiones[selectedIndex] : null;

  return (
    <section id="comisiones" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-teremun-dark mb-4">
            Comisiones
          </h2>
          <div className="w-24 h-1 bg-teremun-gold mx-auto mb-6"></div>
          <p className="text-xl text-teremun-mahogany max-w-3xl mx-auto">
            Participa en nuestras comisiones y contribuye a la discusión
            de temas cruciales para el mundo actual.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {comisiones.map((comision, index) => (
            <div
              key={index}
              onClick={() => setSelectedIndex(index)}
              className="bg-gradient-to-br from-white to-teremun-blush/45 rounded-xl p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-teremun-burgundy/15 cursor-pointer"
            >
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-teremun-burgundy rounded-lg flex items-center justify-center flex-shrink-0">
                  <comision.icon className="text-white" size={28} />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-teremun-dark mb-2">
                    {comision.name}
                  </h3>
                  <p className="text-teremun-gold font-semibold mb-3">
                    {comision.topic}
                  </p>
                  <p className="text-teremun-mahogany leading-relaxed">
                    {comision.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {selectedComision && (
          <div
            className="fixed inset-0 z-50 bg-teremun-dark/45 flex items-center justify-center px-4"
            onClick={() => setSelectedIndex(null)}
          >
            <div
              className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-teremun-burgundy/20 p-6 sm:p-8"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-teremun-burgundy rounded-lg flex items-center justify-center flex-shrink-0">
                    <selectedComision.icon className="text-white" size={28} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-teremun-dark">{selectedComision.name}</h3>
                    <p className="text-teremun-gold font-semibold">{selectedComision.topic}</p>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedIndex(null)}
                  className="p-2 rounded-lg text-teremun-mahogany hover:bg-teremun-blush/40 transition-colors"
                  aria-label="Cerrar detalle"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-3 text-teremun-mahogany">
                <p>
                  <span className="font-semibold text-teremun-dark">Tema:</span> {selectedComision.tema}
                </p>
                <p>
                  <span className="font-semibold text-teremun-dark">Problemática:</span> {selectedComision.problematica}
                </p>
                <p>
                  <span className="font-semibold text-teremun-dark">Enfoque:</span> {selectedComision.enfoque}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Comisiones;
