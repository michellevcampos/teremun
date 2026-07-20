const TeremunKids = () => {
  return (
    <section id="teremun-kids" className="py-20 bg-gradient-to-br from-teremun-blush to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-dm-serif-display text-5xl sm:text-6xl font-bold text-teremun-dark mb-4">
            Teremun Kids
          </h2>
          <div className="w-24 h-1 bg-teremun-gold mx-auto mb-6"></div>
          <p className="text-xl text-teremun-mahogany max-w-5xl mx-auto leading-relaxed">
            Es un programa especial diseñado con el fin de articular de manera clara y pertinente valores, actividades y competencias útiles de manera individual y colectiva, dándole vía libre a los estudiantes más pequeños para convertirse en agentes activos con la oportunidad de ser actores influyentes dentro de la sociedad en donde puedan expresarse de acuerdo a los valores teresianos.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-8 sm:p-12 shadow-lg">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-3xl font-bold text-teremun-dark mb-4">
                ¿Por qué Teremun Kids?
              </h3>
              <p className="text-teremun-mahogany leading-relaxed mb-4">
                Creemos que nunca es demasiado pronto para formar líderes globales.
                Teremun Kids introduce a los estudiantes más jóvenes al fascinante
                mundo de las relaciones internacionales de manera lúdica y educativa.
              </p>
              <p className="text-teremun-mahogany leading-relaxed">
                A través de estas actividades, los niños desarrollan confianza, habilidades de comunicación y
                comprensión de la importancia del diálogo para resolver conflictos.
              </p>
            </div>
            <div className="bg-gradient-to-br from-teremun-burgundy to-teremun-wine rounded-xl p-8 text-white">
              <h4 className="text-2xl font-bold mb-4">Requisitos</h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-sm">✓</span>
                  </div>
                  <span>Estudiantes de preescolar hasta 3ro grado de primaria</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-sm">✓</span>
                  </div>
                  <span>Interés en aprender sobre otros países y culturas</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-sm">✓</span>
                  </div>
                  <span>Ganas de participar y expresar ideas</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeremunKids;
