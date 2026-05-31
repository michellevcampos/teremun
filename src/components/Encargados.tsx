import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

type Encargada = {
  name: string;
  role: string;
  line: string;
  category: string;
  photo: string;
  bio: string;
  modalPhotoPosition?: string;
};

const Encargados = () => {
  const navigate = useNavigate();
  const [selectedEncargada, setSelectedEncargada] = useState<Encargada | null>(null);

  useEffect(() => {
    if (!selectedEncargada) return;

    const previousOverflow = document.body.style.overflow;
    const previousBodyOverscroll = document.body.style.overscrollBehavior;
    const previousHtmlOverscroll = document.documentElement.style.overscrollBehavior;

    document.body.style.overflow = 'hidden';
    document.body.style.overscrollBehavior = 'none';
    document.documentElement.style.overscrollBehavior = 'none';

    return () => {
      document.body.style.overflow = previousOverflow;
      document.body.style.overscrollBehavior = previousBodyOverscroll;
      document.documentElement.style.overscrollBehavior = previousHtmlOverscroll;
    };
  }, [selectedEncargada]);

  const encargados = [
    {
      name: 'Daniela Moya',
      role: 'Secretaria General',
      line: 'Línea Ambiental',
      category: 'Ambientales',
      photo: '/Daniela.JPG',
      modalPhotoPosition: '50% 24%',
      bio: `Soy Daniela Moya y soy muy feliz de ser Secretaria General para el modelo TEREMUN del año 2026, participando como líder de la línea ambiental. Llevo 11 años en la institución, por lo que puedo decir que mi colegio es parte fundamental de mi vida, la cual me ha visto crecer como estudiante y persona, creativa, amorosa y auténtica.

Gracias a las experiencias que he vivido durante mis años formativos aprendí sobre mi amor por debatir, cooperar y dialogar con los demás, lo cual pude consolidar con mi participación en el modelo TEREMUN desde 2019, donde aprendí el arte de delegar hasta grado sexto, en el cual asumí primer rol como presidente de comisión.

Igualmente participé en las primera comisiones en inglés para grado séptimo y octavo, y a partir de noveno hice parte de cargos de liderazgo como emergentes y Secretaria Adjunta para el año 2025.

Para mí TEREMUN es hermoso y ejemplar de lo que podemos lograr como estudiantes y comunidad, y una prueba de nuestras habilidades de no solo defendernos, sino de ser conscientes y generar un cambio en el mundo como jóvenes activos.

Mis expectativas para TEREMUN son poder transformar paso a paso de ese evento en algo en el que cada estudiante, nuevo o antiguo desee envolverse y del cual adopten muchas cosas valiosas para su vida, desde dar el primer paso a la seguridad en sí mismos hasta enfrentar grandes públicos o desafiar al mundo con sus ideas. Que TEREMUN sea un espacio de disfrute, enriquecimiento, aprendizaje y colaboración para todos, testamento de que somos capaces de volvernos las personas que algún día soñamos ser.`
    },
    {
      name: 'Estefania López',
      role: 'Secretaria General',
      line: 'Línea Humanitaria',
      category: 'Humanitarias',
      photo: '/Estefania.JPG',
      modalPhotoPosition: '50% 35%',
      bio: `Soy Estefanía López, Secretaria General de la Línea Humanitaria en TEREMUN 2026. Llevo 11 años en la institución, por lo que puedo decir que mi colegio es parte fundamental de mi vida, la cual ha visto crecer como estudiante y persona. Desde 2019, TEREMUN se ha convertido en una experiencia muy importante donde he podido desarrollar nuevas habilidades.

Siempre me he caracterizado por ser una persona muy organizada, empática, líder, servicial y auténtica. Durante los últimos cuatro años, he tenido el privilegio de participar en el modelo con cargos de liderazgo como Presidenta, Lawyer y Secretaria Adjunta, además de participar en otros modelos externos. Estas experiencias no solo han pulido mis habilidades académicas, sino que me han ayudado entender el liderazgo desde la práctica real, la empatía y la resiliencia.

Para mí, el debate no es solo defender una postura con determinación, sino tener la apertura de escuchar e integrar todos los puntos de vista para construir soluciones conjuntas que ayuden a todos, aportando con soluciones que puedan tener un impacto real, TEREMUN me ha enseñado a confiar más en mí, a no rendirme ante la adversidad, a esforzarme con disciplina por lo que quiero cumplir y a entender que el verdadero liderazgo está en el servicio.

Para TEREMUN 2026, espero que se cree una verdadera conciencia, que se pueda transformar el miedo en seguridad, que este sea un espacio de aprendizaje colectivo y amor, donde los delegados no tengan miedo a equivocarse, sino que se sientan seguros de participar y demostrar todo su potencial. Quiero demostrar que TEREMUN no es solo debatir por debatir; aspiro a que cada persona logre comprender el impacto de las problemáticas humanitarias de forma real y consciente, y se involucre de manera crítica para ser parte de la solución, y que seamos el cambio que queremos ver en el mundo.`
    },
    {
      name: 'Zara Padilla',
      role: 'Secretaria General',
      line: 'Línea Especial',
      category: 'Especiales',
      photo: '/Padilla.JPG',
      modalPhotoPosition: '50% 40%',
      bio: `Soy Zara Padilla y actualmente soy Secretaria General de la Línea Especial en TEREMUN. Llevo aproximadamente más de 7 años haciendo parte de este espacio que se convirtió en una de las experiencias más importantes de mi vida. Durante este tiempo descubrí mi amor por el debate, la oratoria y, sobre todo, por conectar con las personas.

También he participado en modelos como EDMUN, GLPMUN y VMUN, experiencias que fortalecieron aún más mi pasión por este tipo de espacios. Siempre me he caracterizado por ser alguien muy carismática, cercana y apasionada por todo lo que hace; disfruto muchísimo escuchar, compartir ideas y crear ambientes donde las personas puedan sentirse cómodas siendo ellas mismas. TEREMUN me enseñó a confiar más en mí, a defender mis ideales y a entender que el liderazgo también nace de la empatía y de la forma en la que impactamos a los demás.

Hoy asumo este cargo con muchísimo amor, compromiso y emoción, porque más allá de construir un gran modelo, quiero que cada persona que haga parte de esta experiencia se sienta escuchada, valorada y capaz de encontrar su voz.

Mis expectativas para TEREMUN XIV son crear, junto a mi equipo, un espacio auténtico, dinámico y lleno de aprendizaje, donde cada delegado pueda crecer no solo académicamente, sino también personalmente, llevándose recuerdos, amistades y experiencias que permanezcan mucho más allá de los debates.

Quiero que este modelo sea un lugar en el que las personas se sientan seguras de participar, de equivocarse, de aprender y de demostrar todo su potencial, entendiendo que cada idea puede generar un impacto. Espero que TEREMUN XIV no solo forme mejores delegados, sino también personas más críticas, empáticas y seguras de sí mismas.`
    },
    {
      name: 'Laura Pantoja',
      role: 'Secretaria General',
      line: 'Línea Histórica',
      category: 'Históricas',
      photo: '/Laura.JPG',
      modalPhotoPosition: '50% 38%',
      bio: `Soy Laura Pantoja, soy Secretaria General de la línea histórica del modelo Teremun 2026, demostrando la historia y la pasión por ella a comisiones que marcaron la memoria de delegaciones y el mundo.

Llegar hasta acá no fue un proceso fácil, mi trayectoria empezó siendo delegada de comisiones difíciles de tratar y con países con dificultades graves. Continué siendo adjunta del año 2024, implementé un nuevo cargo en el 2025 en compañía de otra general y por último cumplí mi sueño de ser general de las Naciones Unidas, pero también le cumplí a mi padre que desde el cielo sé que está muy orgulloso de mí.

He participado en modelos exteriores trayendo a este colegio nuevas dinámicas de debate y oratoria buscando que el modelo Teremun 2026 sea fructífero y lleno de amor por solucionar problemas que no son ajenos a nosotros.

En la línea histórica yo como general me comprometo a solucionar la historia que le costó tener un final, o que más aún no lo ha tenido, ejemplificar la violencia en Colombia, el terrorismo en el mundo y la carrera a Marte que se inundó en críticas por la contaminación. Con esto acabo de decir que mis expectativas es que todos los delegados se disfruten este modelo tanto como el amor que nosotras seis y todo un equipo de trabajo le ha puesto corazón. Y que esto les enseñe para la vida tanto como lo ha hecho a mí.

¡Bienvenidos a Teremun 2026!`
    },
    {
      name: 'Sofia Chaparro',
      role: 'Secretaria General',
      line: 'Línea Política',
      category: 'Políticas',
      photo: '/chaparro.JPG',
      modalPhotoPosition: '50% 33%',
      bio: `Soy Sofía Chaparro Castro, tengo 16 años de edad y llevo aproximadamente tres años y medio en la institución. A lo largo de este tiempo, he participado activamente en Modelos de Naciones Unidas, formando parte de tres ediciones de TEREMUN y de otros modelos como PILMUN, CRBMUN y MUNUS. Me destaco por mi liderazgo, mi interés por la política y mi gusto por el debate, cualidades que he fortalecido en estos espacios.

Disfruto especialmente los modelos de Naciones Unidas, ya que me permiten desarrollar mis habilidades argumentativas.

En las tres ediciones de TEREMUN en las que participé dos de ellas fueron desarrollando el cargo de delegada emergente, considero que es uno de los cargo más especiales y ha fomentado mi pasión por el modelo.

En mis expectativas está que para TEREMUN 2026, espero, junto con el apoyo de mi equipo, construir un modelo en el que no solo se dialogue entre naciones para llegar a acuerdos, sino en el que cada delegado logre comprender y desarrollar de manera auténtica el rol de su delegación. Aspiro a que los participantes entiendan a profundidad las problemáticas planteadas, reconozcan su impacto en el contexto global y se involucren de forma crítica y consciente en las discusiones. Asimismo, busco que este sea un espacio de aprendizaje colectivo, donde cada persona pueda fortalecer sus habilidades de debate, análisis y liderazgo, y salir con una visión más amplia y comprometida frente a las problemáticas del mundo.`
    },
    {
      name: 'Mariana Dueñas',
      role: 'Secretaria General',
      line: 'Línea Económica',
      category: 'Económicas',
      photo: '/Mariana.JPG',
      modalPhotoPosition: '50% 39%',
      bio: `Soy Mariana Dueñas, mi trayectoria en TEREMUN es de alrededor de 8 años. He participado en diferentes cargos de liderazgo, y estimo que aprendí a no rendirme gracias al modelo, aunque muchas veces se cerraron las puertas, se abrieron otras. Desde siempre me caractericé por ser muy extrovertida, nunca he tenido miedo de ser auténtica y de expresar mis pasiones.

Con el tiempo TEREMUN se convirtió en una afición, demostrando mi entusiasmo por los debates y la habilidad que tenía para desenvolverme en este tipo de actividades. Uno de los cargos que más disfruté y me dio a destacar en el modelo fue ser emergente. Aparte de TEREMUN siempre he soñado grandes cosas y me gusta darle un toque de sentido a mis proyectos.

Hoy en día me conocen por ser una persona risueña, afable, comprometida, y creo que es por eso que tengo el privilegio de ser Secretaria General 2026.

Mis expectativas para TEREMUN XIV hacen parte de un propósito, siempre he querido que todos los estudiantes se sientan motivados a desarrollar su seguridad cada día más, pienso que todos son capaces y tienen demasiadas destrezas para brindarle al mundo.

Todos merecemos vivir en una sociedad donde seamos escuchados y favorecidos; por eso debemos alzar la voz por todos aquellos que son vulnerados. Porque una gran sociedad solo se crea con valor y compromiso y justamente son este tipo de actividades las que nos llevan a forjar ese camino.

Sé que con mis compañeras vamos a trabajar todos los días para que ese objetivo sea más que cumplido.`
    }
  ];

  const lineColorByCategory: Record<string, string> = {
    Ambientales: 'text-emerald-400',
    Humanitarias: 'text-sky-400',
    Especiales: 'text-violet-400',
    'Históricas': 'text-orange-400',
    'Políticas': 'text-rose-400',
    'Económicas': 'text-amber-400'
  };

  const lineDecorationByCategory: Record<string, string> = {
    Ambientales: 'decoration-emerald-400',
    Humanitarias: 'decoration-sky-400',
    Especiales: 'decoration-violet-400',
    'Históricas': 'decoration-orange-400',
    'Políticas': 'decoration-rose-400',
    'Económicas': 'decoration-amber-400'
  };

  const lineHoverColorByCategory: Record<string, string> = {
    Ambientales: 'hover:text-emerald-600',
    Humanitarias: 'hover:text-sky-600',
    Especiales: 'hover:text-violet-600',
    'Históricas': 'hover:text-orange-600',
    'Políticas': 'hover:text-rose-600',
    'Económicas': 'hover:text-amber-600'
  };

  const selectedLineColor = selectedEncargada
    ? lineColorByCategory[selectedEncargada.category] ?? 'text-teremun-burgundy'
    : 'text-teremun-burgundy';

  const selectedLineDecoration = selectedEncargada
    ? lineDecorationByCategory[selectedEncargada.category] ?? 'decoration-teremun-burgundy'
    : 'decoration-teremun-burgundy';

  const selectedLineHoverColor = selectedEncargada
    ? lineHoverColorByCategory[selectedEncargada.category] ?? 'hover:text-teremun-mahogany'
    : 'hover:text-teremun-mahogany';

  return (
    <section id="encargados" className="py-20 bg-teremun-blush/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-dm-serif-display text-5xl sm:text-6xl font-bold text-teremun-dark mb-4">
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
            <button
              type="button"
              key={index}
              onClick={() => setSelectedEncargada(encargado)}
              className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <img
                src={encargado.photo}
                alt={encargado.name}
                className="w-full h-80 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-teremun-dark text-center mb-2">
                  {encargado.name}
                </h3>
                <p className="text-teremun-gold font-semibold text-center mb-3">
                  {encargado.role}
                </p>
                <p className="text-teremun-mahogany text-center text-sm leading-relaxed">
                  {encargado.line}
                </p>
              </div>
            </button>
          ))}
        </div>

        {selectedEncargada && (
          <div
            className="fixed inset-0 z-50 bg-teremun-dark/45 flex items-center justify-center px-4 animate-overlay-soft-in"
            onClick={() => setSelectedEncargada(null)}
          >
            <div
              className="relative w-full max-w-5xl max-h-[88vh] bg-white rounded-2xl shadow-2xl border border-teremun-burgundy/20 p-4 sm:px-8 sm:pb-8 sm:pt-4 overflow-y-auto lg:overflow-hidden overscroll-none animate-modal-soft-pop"
              style={{ WebkitOverflowScrolling: 'auto' }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setSelectedEncargada(null)}
                className="absolute top-0.5 right-0.5 sm:top-1 sm:right-1 p-2 rounded-lg text-teremun-mahogany hover:bg-teremun-blush/40 transition-colors z-10"
                aria-label="Cerrar ficha"
              >
                <X size={20} />
              </button>

              <div className="mt-2 sm:mt-1 grid lg:grid-cols-[360px,1fr] gap-6 sm:gap-8 items-start lg:h-[calc(88vh-5.25rem)]">
                <div className="lg:sticky lg:top-0 self-start transition-all duration-300 ease-out">
                  <div className="rounded-xl overflow-hidden border border-teremun-burgundy/20 bg-teremun-blush/10">
                    <img
                      src={selectedEncargada.photo}
                      alt={selectedEncargada.name}
                      className="w-full h-[420px] object-cover object-center"
                      style={{ objectPosition: selectedEncargada.modalPhotoPosition ?? '50% 34%' }}
                    />
                  </div>

                  <div className="mt-5 text-center">
                    <h4 className="text-xl font-bold text-teremun-dark">{selectedEncargada.name}</h4>
                    <p className="text-teremun-gold font-semibold mt-1">{selectedEncargada.role}</p>

                    <button
                      type="button"
                      onClick={() => {
                        setSelectedEncargada(null);
                        navigate(`/comisiones?categoria=${encodeURIComponent(selectedEncargada.category)}`);
                      }}
                      className={`mt-3 ${selectedLineColor} ${selectedLineDecoration} ${selectedLineHoverColor} font-semibold underline underline-offset-4 transition-colors`}
                    >
                      {selectedEncargada.line}
                    </button>
                  </div>
                </div>

                <div className="rounded-xl border border-teremun-burgundy/20 bg-teremun-blush/10 p-5 sm:p-6 lg:h-full lg:overflow-y-auto overscroll-none">
                  <h4 className="text-xl font-bold text-teremun-dark mb-3">Biografía</h4>
                  <p className="text-teremun-mahogany leading-relaxed whitespace-pre-line">
                    {selectedEncargada.bio}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Encargados;
