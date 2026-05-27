const Encargados = () => {
  const encargados = [
    {
      name: 'Daniela Moya',
      role: 'Secretaria General',
      description: 'Linea Ambiental',
      photo: '/Daniela.JPG'
    },
    {
      name: 'Estefania López',
      role: 'Secretaria General',
      description: 'Linea Humanitaria',
      photo: '/Estefania.JPG'
    },
    {
      name: 'Zara Padilla',
      role: 'Secretaria General',
      description: 'Linea Especial',
      photo: '/Padilla.JPG'
    },
    {
      name: 'Laura Pantoja',
      role: 'Secretaria General',
      description: 'Linea Historica',
      photo: '/Laura.JPG'
    },
    {
      name: 'Sofia Chaparro',
      role: 'Secretaria General',
      description: 'Linea Política',
      photo: '/chaparro.JPG'
    },
    {
      name: 'Mariana Dueñas',
      role: 'Secretaria General',
      description: 'Línea Económica',
      photo: '/Mariana.JPG'
    }
  ];

  return (
    <section id="encargados" className="py-20 bg-teremun-blush/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-teremun-dark mb-4">
            Secretarias Generales
          </h2>
          <div className="w-24 h-1 bg-teremun-gold mx-auto mb-6"></div>
          <p className="text-xl text-teremun-mahogany max-w-3xl mx-auto">
            Nuestro equipo de Secretarias Generales lidera el modelo con compromiso
            y excelencia académica.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {encargados.map((encargado, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <img
                src={encargado.photo}
                alt={encargado.name}
                className="w-full h-80 object-cover mb-4"
              />
              <h3 className="text-xl font-bold text-teremun-dark text-center mb-2">
                {encargado.name}
              </h3>
              <p className="text-teremun-gold font-semibold text-center mb-3">
                {encargado.role}
              </p>
              <p className="text-teremun-mahogany text-center text-sm leading-relaxed">
                {encargado.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Encargados;
