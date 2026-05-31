import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AlertTriangle, Camera, Crown, Flame, Truck, UsersRound, X } from 'lucide-react';

const Liderazgo = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [openGalleryCargo, setOpenGalleryCargo] = useState<'Emergentes' | 'Adjuntos' | 'Presidentes' | null>(null);
  const [targetMemberName, setTargetMemberName] = useState('');
  const [targetMemberFileName, setTargetMemberFileName] = useState('');
  const memberRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const memberFileRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const modalScrollRef = useRef<HTMLDivElement | null>(null);

  type GalleryMember = {
    fileName: string;
    name: string;
    curso?: string;
    cargo?: string;
    comision?: string;
    comisionQuery?: string;
    comisionColorClass?: string;
    comisionCategoria?: string;
  };

  const normalizeText = (value: string) =>
    value
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .trim()
      .toLowerCase();

  useEffect(() => {
    if (!openGalleryCargo) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [openGalleryCargo]);

  const galleryMembersByCargo: Record<'Emergentes' | 'Adjuntos' | 'Presidentes', GalleryMember[]> = {
    Emergentes: [
      { fileName: 'Alejandro Zaidiza Moreno.JPG', name: 'Alejandro Zaidiza Moreno', curso: '10A', cargo: 'Emergente', comision: 'Línea Transversal', comisionColorClass: 'text-pink-400', comisionCategoria: 'Transversales' },
      { fileName: 'Catalina García.JPG', name: 'Catalina García', curso: '10A', cargo: 'Emergente', comision: 'Línea Especial', comisionColorClass: 'text-violet-400', comisionCategoria: 'Especiales' },
      { fileName: 'Dana Sofia Díaz.JPG', name: 'Dana Sofia Díaz', curso: '9A', cargo: 'Emergente', comision: 'Línea Ambiental', comisionColorClass: 'text-emerald-400', comisionCategoria: 'Ambientales' },
      { fileName: 'Mariana Castañeda.JPG', name: 'Mariana Castañeda', curso: '10A', cargo: 'Emergente', comision: 'Línea Económica', comisionColorClass: 'text-amber-400', comisionCategoria: 'Económicas' },
      { fileName: 'Paula Andrea Corredor Duarte.JPG', name: 'Paula Andrea Corredor Duarte', curso: '11A', cargo: 'Emergente', comision: 'Línea Humanitaria', comisionColorClass: 'text-sky-400', comisionCategoria: 'Humanitarias' },
      { fileName: 'Samuel Peña.JPG', name: 'Samuel Peña', curso: '9A', cargo: 'Emergente', comision: 'Línea Política', comisionColorClass: 'text-rose-400', comisionCategoria: 'Políticas' },
      { fileName: 'Sarith Antonia Urquijo Albornoz.JPG', name: 'Sarith Antonia Urquijo Albornoz', curso: '10B', cargo: 'Emergente', comision: 'Línea Histórica', comisionColorClass: 'text-orange-400', comisionCategoria: 'Históricas' },
      { fileName: 'Valentina Fandiño.JPG', name: 'Valentina Fandiño', curso: '11A', cargo: 'Emergente', comision: 'Línea Especial', comisionColorClass: 'text-violet-400', comisionCategoria: 'Especiales' },
      { fileName: 'Valeria Bustos Torres.JPG', name: 'Valeria Bustos Torres', curso: '10A', cargo: 'Emergente', comision: 'Línea Económica', comisionColorClass: 'text-amber-400', comisionCategoria: 'Económicas' }
    ],
    Adjuntos: [
      { fileName: 'Gabriel Valencia.JPG', name: 'Gabriel Valencia', curso: '10B', cargo: 'Adjunto', comision: 'Línea Política', comisionColorClass: 'text-rose-400', comisionCategoria: 'Políticas' },
      { fileName: 'Isabella Sánchez López.JPG', name: 'Isabella Sánchez López', curso: '11B', cargo: 'Adjunta', comision: 'Línea Transversal', comisionColorClass: 'text-pink-400', comisionCategoria: 'Transversales' },
      { fileName: 'Sara Juliana Rico.JPG', name: 'Sara Juliana Rico', curso: '10B', cargo: 'Adjunta', comision: 'Línea Humanitaria', comisionColorClass: 'text-sky-400', comisionCategoria: 'Humanitarias' },
      { fileName: 'Sofia Suárez.JPG', name: 'Sofia Suárez', curso: '10A', cargo: 'Adjunta', comision: 'Línea Económica', comisionColorClass: 'text-amber-400', comisionCategoria: 'Económicas' },
      { fileName: 'Manuela Castellanos.JPG', name: 'Manuela Castellanos', curso: '10A', cargo: 'Adjunta', comision: 'Línea Histórica', comisionColorClass: 'text-orange-400', comisionCategoria: 'Históricas' }
    ],
    Presidentes: [
      { fileName: 'Daniel Cortes.JPG', name: 'Daniel Cortes', curso: '8C', cargo: 'Presidente', comision: 'UNCCP', comisionColorClass: 'text-sky-400', comisionCategoria: 'Humanitarias' },
      { fileName: 'DSC02252.JPG', name: 'Pendiente', cargo: 'Presidente' },
      { fileName: 'DSC02253.JPG', name: 'Pendiente', cargo: 'Presidente' },
      { fileName: 'DSC02254.JPG', name: 'Pendiente', cargo: 'Presidente' },
      { fileName: 'DSC02257.JPG', name: 'Pendiente', cargo: 'Presidente' },
      { fileName: 'DSC02258.JPG', name: 'Pendiente', cargo: 'Presidente' },
      { fileName: 'Mariana Vanegas.JPG', name: 'Mariana Vanegas Portela', curso: '7B', cargo: 'Presidente', comision: 'PUPR', comisionQuery: 'Políticas del Uso de Plásticos y Residuos', comisionColorClass: 'text-emerald-400', comisionCategoria: 'Ambientales' },
      { fileName: 'DSC02266.JPG', name: 'Pendiente', cargo: 'Presidente' },
      { fileName: 'DSC02269.JPG', name: 'Pendiente', cargo: 'Presidente' },
      { fileName: 'DSC02270.JPG', name: 'Pendiente', cargo: 'Presidente' },
      { fileName: 'DSC02272.JPG', name: 'Pendiente', cargo: 'Presidente' },
      { fileName: 'Emily Martínez.JPG', name: 'Emily Martínez', curso: '11B', cargo: 'Presidente', comision: 'Betty la fea', comisionColorClass: 'text-violet-400', comisionCategoria: 'Especiales' },
      { fileName: 'Luciana Clavijo.JPG', name: 'Luciana Clavijo', curso: '11B', cargo: 'Presidente', comision: 'Batman vs Joker', comisionColorClass: 'text-violet-400', comisionCategoria: 'Especiales' },
      { fileName: 'Luis Gerónimo Lievano.JPG', name: 'Luis Gerónimo Lievano', curso: '7B', cargo: 'Presidente', comision: 'ECOSOC', comisionColorClass: 'text-amber-400', comisionCategoria: 'Económicas' },
      { fileName: 'Mariana Medina.JPG', name: 'Mariana Medina', curso: '11A', cargo: 'Presidente', comision: 'CDH', comisionColorClass: 'text-sky-400', comisionCategoria: 'Humanitarias' },
      { fileName: 'María José Berbesí.JPG', name: 'María José Berbesí', curso: '8C', cargo: 'Presidente', comision: 'Security council', comisionColorClass: 'text-rose-400', comisionCategoria: 'Políticas' },
      { fileName: 'Santiago Rey.JPG', name: 'Santiago Rey', curso: '11B', cargo: 'Presidente', comision: 'FIFA GATE', comisionColorClass: 'text-violet-400', comisionCategoria: 'Especiales' }
    ]
  };

  const handleCommissionNavigation = (member: GalleryMember) => {
    if (!member.comision || !member.comisionCategoria) return;

    const params = new URLSearchParams({
      categoria: member.comisionCategoria,
      comision: member.comisionQuery || member.comision
    });

    closeGallery();
    navigate(`/comisiones?${params.toString()}`);
  };

  const isGalleryCargo = (title: string): title is 'Emergentes' | 'Adjuntos' | 'Presidentes' =>
    title === 'Emergentes' || title === 'Adjuntos' || title === 'Presidentes';

  const clearAutoFocusTarget = () => {
    setTargetMemberName('');
    setTargetMemberFileName('');
  };

  const closeGallery = () => {
    setOpenGalleryCargo(null);
    clearAutoFocusTarget();
  };

  const resolveMemberName = (members: GalleryMember[], rawTargetName: string) => {
    const normalizedTarget = normalizeText(rawTargetName);

    const exactMatch = members.find((member) => normalizeText(member.name) === normalizedTarget);
    if (exactMatch) return exactMatch.name;

    const containsMatch = members.find((member) => {
      const normalizedMemberName = normalizeText(member.name);
      return normalizedMemberName.includes(normalizedTarget) || normalizedTarget.includes(normalizedMemberName);
    });

    return containsMatch?.name || '';
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const cargoFromQuery = params.get('cargo');
    const memberFromQuery = params.get('miembro') || '';
    const memberFileFromQuery = params.get('miembroArchivo') || '';

    if (!cargoFromQuery || !isGalleryCargo(cargoFromQuery)) return;

    setOpenGalleryCargo(cargoFromQuery);
    setTargetMemberName(memberFromQuery);
    setTargetMemberFileName(memberFileFromQuery);

    requestAnimationFrame(() => {
      const liderazgoSection = document.getElementById('liderazgo');
      liderazgoSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }, [location.search]);

  useEffect(() => {
    if (openGalleryCargo !== 'Presidentes' || !targetMemberName) return;

    const targetMember = resolveMemberName(galleryMembersByCargo.Presidentes, targetMemberName);
    const targetKey = targetMember ? normalizeText(targetMember) : '';
    const targetByFile = targetMemberFileName ? memberFileRefs.current[targetMemberFileName] : null;

    const centerMemberInModal = () => {
      const targetElement = targetByFile || (targetKey ? memberRefs.current[targetKey] : null);
      const modalElement = modalScrollRef.current;
      if (!targetElement || !modalElement) return;

      const modalRect = modalElement.getBoundingClientRect();
      const targetRect = targetElement.getBoundingClientRect();
      const offsetInsideModal = targetRect.top - modalRect.top;
      const centeredTop =
        modalElement.scrollTop +
        offsetInsideModal -
        modalElement.clientHeight / 2 +
        targetRect.height / 2;

      const maxTop = Math.max(0, modalElement.scrollHeight - modalElement.clientHeight);
      const nextTop = Math.min(Math.max(0, centeredTop), maxTop);
      modalElement.scrollTo({ top: nextTop, behavior: 'smooth' });
    };

    const firstPass = window.setTimeout(centerMemberInModal, 120);
    const secondPass = window.setTimeout(() => {
      centerMemberInModal();
      // Consume deep-link autofocus so manual reopen doesn't re-scroll.
      clearAutoFocusTarget();
    }, 380);

    return () => {
      window.clearTimeout(firstPass);
      window.clearTimeout(secondPass);
    };
  }, [openGalleryCargo, targetMemberName, targetMemberFileName]);

  const cargos = [
    {
      icon: AlertTriangle,
      title: 'Emergentes',
      description: 'Pendiente añadir descripción sobre el cargo.'
    },
    {
      icon: Crown,
      title: 'Presidentes',
      description: 'Guía el debate y asegura el cumplimiento del protocolo en comisión.'
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
      icon: Flame,
      title: 'Crisis',
      description: 'Presentan escenarios donde se requieren soluciones rápidas y efectivas.'
    },
    {
      icon: Camera,
      title: 'Prensa',
      description: 'Comunica y documenta los momentos más importantes del evento.'
    }
  ];

  return (
    <section id="liderazgo" className="py-20 bg-teremun-blush/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-dm-serif-display text-5xl sm:text-6xl font-bold text-teremun-dark mb-4">
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
            <button
              type="button"
              key={index}
              onClick={() => {
                if (isGalleryCargo(cargo.title)) {
                  clearAutoFocusTarget();
                  setOpenGalleryCargo(cargo.title);
                }
              }}
              className={`bg-white rounded-xl p-8 shadow-md transition-all duration-300 text-left ${
                isGalleryCargo(cargo.title)
                  ? 'hover:shadow-xl hover:-translate-y-1 cursor-pointer'
                  : 'cursor-default'
              }`}
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
            </button>
          ))}
        </div>

        {openGalleryCargo && (
          <div
            className="fixed inset-0 z-50 bg-teremun-dark/45 flex items-center justify-center px-4 animate-overlay-soft-in"
            onClick={closeGallery}
          >
            <div
              ref={modalScrollRef}
              className="w-full max-w-2xl max-h-[94vh] bg-white rounded-2xl shadow-2xl border border-teremun-burgundy/20 p-5 sm:p-7 overflow-y-auto overscroll-y-contain animate-modal-soft-pop"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between gap-4 mb-5">
                <div>
                  <h3 className="font-dm-serif-display text-2xl sm:text-3xl text-teremun-dark">{openGalleryCargo}</h3>
                  <p className="text-teremun-mahogany mt-1">Equipo de liderazgo TEREMUN</p>
                </div>

                <button
                  type="button"
                  onClick={closeGallery}
                  className="p-2 rounded-lg text-teremun-mahogany hover:bg-teremun-blush/40 transition-colors"
                  aria-label="Cerrar ficha"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-5">
                {galleryMembersByCargo[openGalleryCargo].map((member) => (
                  <div
                    key={member.fileName}
                    ref={(node) => {
                      memberRefs.current[normalizeText(member.name)] = node;
                      memberFileRefs.current[member.fileName] = node;
                    }}
                    className="text-center"
                  >
                    <img
                      src={`/${openGalleryCargo}/${encodeURIComponent(member.fileName)}`}
                      alt={member.name}
                      className="mx-auto h-auto object-contain rounded-lg w-[66%]"
                    />
                    <div className="pt-2 text-sm font-medium text-teremun-dark">
                      {member.name}
                    </div>
                    {member.curso && (
                      <div className="text-sm text-teremun-mahogany mt-0.5">{member.curso}</div>
                    )}
                    {member.cargo && (
                      <div className="text-sm font-semibold text-teremun-gold mt-0.5">{member.cargo}</div>
                    )}
                    {member.comision && (
                      <button
                        type="button"
                        onClick={() => handleCommissionNavigation(member)}
                        className={`text-sm font-semibold mt-0.5 underline decoration-current/60 underline-offset-2 hover:opacity-85 transition-opacity ${member.comisionColorClass || 'text-teremun-mahogany'}`}
                      >
                        {member.comision}
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Liderazgo;
