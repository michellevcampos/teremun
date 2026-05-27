import { useState, type ComponentType } from 'react';
import { Building2, ExternalLink, Globe, Heart, Landmark, Leaf, Scale, Sparkles, X } from 'lucide-react';

type CommissionCard = {
  icon: ComponentType<{ className?: string; size?: number }>;
  name: string;
  topic: string;
  description: string;
  problematica?: string;
  documentUrl?: string;
};

const Comisiones = () => {
  const [openCategoria, setOpenCategoria] = useState('Ambientales');
  const [selectedCard, setSelectedCard] = useState<CommissionCard | null>(null);

  const getGoogleDocPreviewUrl = (url: string) => {
    const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
    if (!match) return null;
    return `https://docs.google.com/document/d/${match[1]}/preview`;
  };

  const docPreviewUrl = selectedCard?.documentUrl
    ? getGoogleDocPreviewUrl(selectedCard.documentUrl)
    : null;

  const categorias = [
    {
      categoria: 'Ambientales',
      categoryIcon: Leaf,
      cards: [
        {
          icon: Leaf,
          name: 'Asamblea General de Naciones Unidas',
          topic: 'Comisión Ambiental',
          description: 'Comercio, Consumo y Ambiente.',
          problematica: 'Afectaciones por la implantación de aranceles en la productividad y la explotación de recursos naturales.',
          documentUrl: 'https://docs.google.com/document/d/1YHQLR799d4go5VLUdWiDv6H0cO2Uxbs7/edit'
        },
        {
          icon: Leaf,
          name: 'Asamblea General de Naciones Unidas',
          topic: 'Comisión Ambiental',
          description: 'Crisis del Agua.',
          problematica: 'Privatización a nivel mundial de los recursos hídricos (Cuarto y Quinto).',
          documentUrl: 'https://docs.google.com/document/d/1DQJ6thX_Bn82SKs3Fm8CmWb4BEYK793f/edit'
        },
        {
          icon: Leaf,
          name: 'Asamblea General de Naciones Unidas',
          topic: 'Comisión Ambiental',
          description: 'Políticas del Uso de Plásticos y Residuos.',
          problematica: 'Islas de basura y microplásticos.',
          documentUrl: 'https://docs.google.com/document/d/12o1Mf37AMCvihI4fUGWcSphbSs_t4sZN/edit'
        }
      ]
    },
    {
      categoria: 'Económicas',
      categoryIcon: Scale,
      cards: [
        {
          icon: Scale,
          name: 'CEPAL',
          topic: 'Comisión Económica',
          description: 'Comisión Económica para América Latina y el Caribe.',
          problematica: 'América Latina entre la crisis y la esperanza: sequías en Bolivia, inflación en Argentina, minería en Chile, violencia en México y reformas en Colombia. ¿Cómo pueden los países de CEPAL cooperar para que la economía no destruya el ambiente ni la paz social?',
          documentUrl: 'https://docs.google.com/document/d/1Gi1w0AwGP3j3hSNEwt6SZI6nZkhykPfq/edit#heading=h.qj71xwedfghh'
        },
        {
          icon: Scale,
          name: 'CESPAO',
          topic: 'Comisión Económica',
          description: 'Comisión Económica y Social para Asia Occidental.',
          problematica: 'Reconstrucción económica post-guerra en Asia Occidental: Irán después del conflicto armado con Estados Unidos (2026), la crisis humanitaria en Palestina y el rol de CESPAO en el financiamiento para el desarrollo sostenible en una región devastada por dos guerras.',
          documentUrl: 'https://docs.google.com/document/d/1keFyl2HGTQtU5rd11SQjHhbz5xYy8Rk_/edit#heading=h.qj71xwedfghh'
        },
        {
          icon: Scale,
          name: 'ECOSOC',
          topic: 'Comisión Económica',
          description: 'Economic and Social Council of the United Nations.',
          problematica: 'Financing for sustainable development, external debt crisis, and international cooperation against post-pandemic global inequality.',
          documentUrl: 'https://docs.google.com/document/d/1yR7JpxswYjOeTG9P_s5GlUs6gAxpnwcX/edit'
        }
      ]
    },
    {
      categoria: 'Especiales',
      categoryIcon: Sparkles,
      cards: [
        {
          icon: Sparkles,
          name: 'Betty la fea',
          topic: 'Comisión Especial',
          description: 'Ecomoda y Superintendencia.',
          documentUrl: 'https://docs.google.com/document/d/1X74ZZvsw2SjETlIaTy0-C3JPqGFgP5ez/edit'
        },
        {
          icon: Sparkles,
          name: 'Batman vs Joker',
          topic: 'Comisión Especial',
          description: 'Crisis de gobernabilidad en Ciudad Gótica.',
          problematica: 'Crisis de gobernabilidad en Ciudad Gótica: El Joker ha desatado una ola de ataques simultáneos contra el sistema de justicia, la policía y los símbolos de autoridad. Batman actúa por fuera de la ley para detenerlo. La ciudad está dividida: unos ven a Batman como el único salvador posible; otros lo ven como un vigilante que empeora las cosas. ¿Debe Ciudad Gótica legalizar la acción de los vigilantes, rendirse ante el caos del Joker, o encontrar un tercer camino?',
          documentUrl: 'https://docs.google.com/document/d/1JEqBijTL5X6StajgWu7uhXEOBnYloh4p/edit'
        },
        {
          icon: Sparkles,
          name: 'FIFA GATE',
          topic: 'Comisión Especial',
          description: 'Corrupción y delitos dentro de la FIFA.',
          documentUrl: 'https://docs.google.com/document/d/1sHeVhgLhbynip-_E0vGrX7JP_yxrOKz9/edit'
        }
      ]
    },
    {
      categoria: 'Históricas',
      categoryIcon: Landmark,
      cards: [
        {
          icon: Landmark,
          name: '9 de Abril',
          topic: 'Comisión Histórica',
          description: 'Juicio Histórico de 1948.',
          documentUrl: 'https://docs.google.com/document/d/1nty6-xFg4JYq4uDHhtnhU_LnuXAIES3d/edit'
        },
        {
          icon: Landmark,
          name: 'Security Council',
          topic: 'Comisión Histórica',
          description: 'September 11, 2001 and the war in Afghanistan.',
          problematica: 'On September 11, 2001, the United States was attacked by the terrorist group Al Qaeda. 2,977 people died. The UN Security Council had to decide how to respond. Should it authorize an invasion of Afghanistan, where Al Qaeda was hiding? Should it impose sanctions? Should it seek justice through courts? What was legal and what was fair?',
          documentUrl: 'https://docs.google.com/document/d/1rXVVn_7gDWC9-pYCtyT2L08XCIIUGS6y/edit'
        },
        {
          icon: Landmark,
          name: 'COPUOS',
          topic: 'Comisión Histórica',
          description: 'Commission on the Peaceful Uses of Outer Space.',
          problematica: 'The 21st century space race: Delegations like the United States, China, Russia and India are sending rockets to the Moon, Mars and beyond. They also want to extract resources like water, minerals and precious metals from the Moon and asteroids. But who has the right to exploit these resources? Should they be for all humanity or only for the delegations that get there first? How do we avoid wars in space?',
          documentUrl: 'https://docs.google.com/document/d/12sRCur25zFgbfm8v_eiCnU5zG5mjFzoX/edit'
        }
      ]
    },
    {
      categoria: 'Humanitarias',
      categoryIcon: Heart,
      cards: [
        {
          icon: Heart,
          name: 'UNCCP',
          topic: 'Comisión Humanitaria',
          description: 'Comisión de Conciliación para Palestina.',
          problematica: 'Después de la guerra entre Estados Unidos e Irán (2026) y la escalada del conflicto Israel-Palestina: ¿Cómo garantizar el derecho al retorno de los refugiados palestinos, la reconstrucción de Gaza y la soberanía de ambos pueblos, cuando la comunidad internacional está dividida y la crisis humanitaria se agrava?',
          documentUrl: 'https://docs.google.com/document/d/1V6mmHWrPK9Ac5FY2J9Ruw8m4srCjmK8h/edit'
        },
        {
          icon: Heart,
          name: 'CDH',
          topic: 'Comisión Humanitaria',
          description: 'Comisión de Derechos Humanos de las Naciones Unidas.',
          problematica: 'Protección de civiles en contextos de guerra y represión: Desplazamiento forzado, acceso a ayuda humanitaria y responsabilidad internacional frente a las violaciones de derechos humanos en la guerra EE.UU.-Irán (2026), el conflicto Israel-Palestina y las crisis internas en Sudán y Eritrea.',
          documentUrl: 'https://docs.google.com/document/d/1XrqsOhJuY_j1uilIQ6-NBG0o7ZeBPe0W/edit'
        },
        {
          icon: Heart,
          name: 'CED',
          topic: 'Comisión Humanitaria',
          description: 'Comité contra la Desaparición Forzada de la ONU.',
          problematica: 'Crisis global de desapariciones forzadas: Violencia institucional en México, militarización en Ecuador, crisis migratoria en Europa y la persistencia de fosas clandestinas. ¿Cómo puede la comunidad internacional garantizar el derecho a la verdad, la justicia y la reparación para las víctimas y sus familias cuando los Estados niegan, ocultan o minimizan la magnitud del problema?',
          documentUrl: 'https://docs.google.com/document/d/1mVQsxi9620srnoL7BkN6GMDmy-o5mEB2/edit'
        }
      ]
    },
    {
      categoria: 'Políticas',
      categoryIcon: Building2,
      cards: [
        {
          icon: Building2,
          name: 'CCPCJ',
          topic: 'Comisión Política',
          description: 'Comisión de las Naciones Unidas sobre prevención del delito y justicia penal.',
          problematica: 'Centros de estafa que esclavizan personas (scam centres), tráfico de drogas y ciberdelitos. ¿Cómo puede la comunidad internacional cooperar para proteger a las víctimas, perseguir a los criminales y prevenir que más personas caigan en estas redes?',
          documentUrl: 'https://docs.google.com/document/d/1gaSVtD1W4fwPLX4Z6kSQimFTmveeN32u/edit'
        },
        {
          icon: Building2,
          name: 'Security council',
          topic: 'Comisión Política',
          description: 'Commission responsible for maintaining international peace and security.',
          problematica: 'Gaza under fire: The Security Council has not achieved a permanent ceasefire for three years. Hospitals are collapsing, water is scarce, and children are dying of hunger. What can the Council do when permanent members (USA and UK vs. China and Russia) block each other with the veto?',
          documentUrl: 'https://docs.google.com/document/d/1TYipmw50rCkh00SBhiWVeOq-LJFRffua/edit'
        },
        {
          icon: Building2,
          name: 'Senado de la república',
          topic: 'Comisión Política',
          description: 'Descarbonización vs. Estabilidad Fiscal.',
          problematica: 'Descarbonización vs. Estabilidad Fiscal: Definir el ritmo de la transición energética sin asfixiar los ingresos fiscales del país que dependen del petróleo y el carbón.',
          documentUrl: 'https://docs.google.com/document/d/1gZ2W_aEOX69m6Oxl1ctmkNgS8zkcj47q/edit'
        }
      ]
    },
    {
      categoria: 'Transversales',
      categoryIcon: Globe,
      cards: [
        {
          icon: Globe,
          name: 'UNODC',
          topic: 'Comisión Transversal',
          description: 'Drugs and Crime.',
          problematica: 'Drug trafficking in the Americas: Record cocaine production in the Andean region, stable demand in North America and Europe, and transit routes through Central and South America. How can the international community balance the fight against drug cartels with human rights, public health, and the livelihoods of farming and indigenous communities? Should the international community prioritize forced eradication of crops, voluntary substitution with alternative development, criminal prosecution of cartels, or reducing demand in consumer countries? What works and what does not?',
          documentUrl: 'https://docs.google.com/document/d/14KnrtfUPnec_X4wvw_PA00qVUtLnF4zK/edit'
        },
        {
          icon: Globe,
          name: 'WHO',
          topic: 'Comisión Transversal',
          description: 'World Health Organization.',
          problematica: 'Health in the age of misinformation: In May 2026, the World Health Assembly declared that misinformation is a global public health emergency. Platforms like TikTok, X, Google and Meta are the main channels for spreading medical falsehoods. Should these companies be regulated as actors in the health system, with legal and ethical responsibilities similar to those of the pharmaceutical industry?',
          documentUrl: 'https://docs.google.com/document/d/1UWJvgUebqLHE-WVphnEJ1-7dYuVPKnst/edit'
        },
        {
          icon: Globe,
          name: 'Zootopia',
          topic: 'Comisión Transversal',
          description: 'Comisión para la Protección y el Buen Trato de los Animales.',
          problematica: 'Comisión relacionada con el maltrato animal.',
          documentUrl: 'https://docs.google.com/document/d/1gObgl6gqWDia77g5Q02ZZH--pshb28MX/edit'
        }
      ]
    }
  ];

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

        <div className="space-y-4">
          {categorias.map((item) => {
            const isOpen = openCategoria === item.categoria;

            return (
            <div
              key={item.categoria}
              className="rounded-xl bg-transparent"
            >
              <button
                type="button"
                onClick={() => {
                  setOpenCategoria((current) => (current === item.categoria ? '' : item.categoria));
                  setSelectedCard(null);
                }}
                className="w-full cursor-pointer px-6 py-4 flex items-center justify-between rounded-xl bg-transparent transition-colors duration-200 hover:bg-teremun-dark/5 active:bg-teremun-dark/10"
                aria-expanded={isOpen}
                aria-controls={`panel-${item.categoria}`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-teremun-burgundy/12 text-teremun-burgundy flex items-center justify-center">
                    <item.categoryIcon size={18} />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-teremun-dark">
                    {item.categoria}
                  </h3>
                </div>
                <span className={`text-teremun-burgundy text-sm font-semibold transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                  ▼
                </span>
              </button>

              <div
                id={`panel-${item.categoria}`}
                className={`grid transition-[grid-template-rows,opacity] duration-500 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
              >
                <div className="overflow-hidden">
                  <div className="px-6 pb-6 pt-2">
                    <div className="grid md:grid-cols-2 gap-6">
                      {item.cards.map((card, cardIndex) => (
                        <button
                          type="button"
                          key={`${card.name}-${cardIndex}`}
                          onClick={() => setSelectedCard(card)}
                          className="w-full text-left bg-gradient-to-br from-white to-teremun-blush/45 rounded-xl border border-teremun-burgundy/15 p-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                        >
                          <div className="flex items-start gap-4">
                            <div className="w-14 h-14 bg-teremun-burgundy rounded-lg flex items-center justify-center flex-shrink-0">
                              <card.icon className="text-white" size={28} />
                            </div>
                            <div className="flex-1">
                              <h4 className="text-2xl font-bold text-teremun-dark mb-2">
                                {card.name}
                              </h4>
                              <p className="text-teremun-gold font-semibold mb-3">
                                {card.topic}
                              </p>
                              <p className="text-teremun-mahogany leading-relaxed">
                                {card.description}
                              </p>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            );
          })}
        </div>

        {selectedCard && (
          <div
            className="fixed inset-0 z-50 bg-teremun-dark/45 flex items-center justify-center px-4"
            onClick={() => setSelectedCard(null)}
          >
            <div
              className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-teremun-burgundy/20 p-6 sm:p-8"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-teremun-burgundy rounded-lg flex items-center justify-center flex-shrink-0">
                    <selectedCard.icon className="text-white" size={28} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-teremun-dark">{selectedCard.name}</h3>
                    <p className="text-teremun-gold font-semibold">{selectedCard.topic}</p>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedCard(null)}
                  className="p-2 rounded-lg text-teremun-mahogany hover:bg-teremun-blush/40 transition-colors"
                  aria-label="Cerrar ficha"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-3 text-teremun-mahogany">
                <p>
                  <span className="font-semibold text-teremun-dark">Descripción:</span> {selectedCard.description}
                </p>
                {selectedCard.problematica && (
                  <p>
                    <span className="font-semibold text-teremun-dark">Problemática:</span> {selectedCard.problematica}
                  </p>
                )}
                {selectedCard.documentUrl && (
                  <div className="block mt-4 rounded-xl border border-teremun-burgundy/20 p-3 bg-teremun-blush/10">
                    {docPreviewUrl && (
                      <div>
                        <div className="rounded-lg overflow-hidden border border-teremun-burgundy/15 bg-white">
                          <iframe
                            src={docPreviewUrl}
                            title="Vista previa del documento"
                            className="w-full h-44"
                            loading="lazy"
                          />
                        </div>
                      </div>
                    )}

                    <div className="mt-3 flex items-center justify-end">
                      <a
                        href={selectedCard.documentUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 text-teremun-burgundy font-semibold hover:text-teremun-dark transition-colors"
                      >
                        <span>Abrir documento</span>
                        <ExternalLink size={18} />
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Comisiones;
