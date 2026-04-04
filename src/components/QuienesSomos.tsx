import { Globe, Heart, Award } from 'lucide-react';

const QuienesSomos = () => {
  const features = [
    {
      icon: Globe,
      title: 'Perspectiva Global',
      description: 'Abordamos temas internacionales relevantes desde múltiples perspectivas culturales y políticas.'
    },
    {
      icon: Heart,
      title: 'Valores Teresianos',
      description: 'Construimos el modelo bajo los principios del Colegio Teresiano, articulando valores y actividades que fortalecen el compromiso individual y colectivo.'
    },
    {
      icon: Award,
      title: 'Habilidades del Estudiante',
      description: 'Impulsamos competencias de investigación, argumentación y liderazgo para formar estudiantes activos e influyentes dentro de la sociedad.'
    }
  ];

  return (
    <section id="quienes-somos" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-teremun-dark mb-4">
            ¿Quiénes Somos?
          </h2>
          <div className="w-24 h-1 bg-teremun-gold mx-auto mb-6"></div>
          <p className="text-xl text-teremun-mahogany max-w-5xl mx-auto leading-relaxed text-left sm:text-center lg:text-left px-2 sm:px-4">
            TEREMUN Es un modelo de Naciones Unidas del Colegio Teresiano de Bogotá que simula los comités de las organizaciones internacionales más importantes. En este modelo, los estudiantes de la institución toman el papel de representar diferentes naciones, personas o partidos políticos abordando diferentes temáticas y problemáticas que afectan hoy en día el mundo con el fin buscar soluciones innovadoras.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-12">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-8 rounded-xl bg-teremun-blush/40 hover:bg-teremun-blush/70 transition-all duration-300 hover:shadow-lg transform hover:-translate-y-2"
            >
              <div className="w-16 h-16 bg-teremun-burgundy rounded-lg flex items-center justify-center mb-6 mx-auto">
                <feature.icon className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-bold text-teremun-dark mb-3 text-center">
                {feature.title}
              </h3>
              <p className="text-teremun-mahogany text-center leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-gradient-to-r from-teremun-burgundy to-teremun-wine rounded-2xl p-8 sm:p-12 text-white">
          <h3 className="text-2xl sm:text-3xl font-bold mb-4">Nuestra Misión</h3>
          <p className="text-lg leading-relaxed opacity-90">
            Potenciar habilidades de oralidad, escritura, redacción, argumentación, expresión oral e investigación para que los estudiantes comprendan las problemáticas que impactan al mundo actual. A la vez, buscamos que conozcan cómo opera la ONU y la comunidad internacional, y que vivan de forma práctica sus procedimientos para aprender que la mejor resolución de conflictos se construye mediante la negociación y el diálogo.
          </p>
        </div>
      </div>
    </section>
  );
};

export default QuienesSomos;
