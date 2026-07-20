import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AlertTriangle, Camera, ChevronDown, ChevronUp, Crown, Flame, Truck, UsersRound, X } from 'lucide-react';

const Liderazgo = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [openGalleryCargo, setOpenGalleryCargo] = useState<'Emergentes' | 'Adjuntos' | 'Presidentes' | null>(null);
  const [isCrisisOpen, setIsCrisisOpen] = useState(false);
  const [isLogisticaOpen, setIsLogisticaOpen] = useState(false);
  const [isPrensaOpen, setIsPrensaOpen] = useState(false);
  const [crisisOpenSection, setCrisisOpenSection] = useState<'group1' | 'group2' | 'leaders' | null>(null);
  const [crisisPanels, setCrisisPanels] = useState({
    group1Members: false,
    group1Lines: false,
    group2Members: false,
    group2Lines: false
  });
  const [logisticaPanels, setLogisticaPanels] = useState({
    members: false,
    leaders: false
  });
  const [prensaPanels, setPrensaPanels] = useState({
    members: false,
    leaders: false
  });
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

  type CrisisLine = {
    label: string;
    colorClass: string;
    categoria: string;
    comision?: string;
  };

  const normalizeText = (value: string) =>
    value
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .trim()
      .toLowerCase();

  useEffect(() => {
    if (!openGalleryCargo && !isCrisisOpen && !isLogisticaOpen && !isPrensaOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [openGalleryCargo, isCrisisOpen, isLogisticaOpen, isPrensaOpen]);

  const galleryMembersByCargo: Record<'Emergentes' | 'Adjuntos' | 'Presidentes', GalleryMember[]> = {
    Emergentes: [
      { fileName: 'Jeronimo y Zaidiza.JPG', name: 'Jerónimo Ramírez y Alejandro Zaidiza', curso: '10A', cargo: 'Emergentes', comision: 'Línea Transversal', comisionColorClass: 'text-pink-400', comisionCategoria: 'Transversales' },
      { fileName: 'Catalina y Valentina.JPG', name: 'Catalina García y Valentina Fandiño', curso: '10A', cargo: 'Emergentes', comision: 'Línea Especial', comisionColorClass: 'text-violet-400', comisionCategoria: 'Especiales' },
      { fileName: 'Dana Sofia Díaz.JPG', name: 'Dana Sofia Díaz', curso: '9A', cargo: 'Emergente', comision: 'Línea Ambiental', comisionColorClass: 'text-emerald-400', comisionCategoria: 'Ambientales' },
      { fileName: 'Bustos y Mariana.JPG', name: 'Valeria Bustos y Mariana Castañeda', curso: '10A', cargo: 'Emergentes', comision: 'Línea Económica', comisionColorClass: 'text-amber-400', comisionCategoria: 'Económicas' },
      { fileName: 'Paula Andrea Corredor Duarte.JPG', name: 'Paula Andrea Corredor Duarte', curso: '11A', cargo: 'Emergente', comision: 'Línea Humanitaria', comisionColorClass: 'text-sky-400', comisionCategoria: 'Humanitarias' },
      { fileName: 'Samuel y Sara.JPG', name: 'Samuel Peña y Sara Sofía Niño', curso: '9A', cargo: 'Emergentes', comision: 'Línea Política', comisionColorClass: 'text-rose-400', comisionCategoria: 'Políticas' },
      { fileName: 'Juliana y Antonia.JPG', name: 'Juliana Meléndez y Sarith Antonia Urquijo', curso: '10B', cargo: 'Emergentes', comision: 'Línea Histórica', comisionColorClass: 'text-orange-400', comisionCategoria: 'Históricas' }
    ],
    Adjuntos: [
      { fileName: 'Gabriel Valencia.JPG', name: 'Gabriel Valencia', curso: '10B', cargo: 'Adjunto', comision: 'Línea Política', comisionColorClass: 'text-rose-400', comisionCategoria: 'Políticas' },
      { fileName: 'Isabella Sánchez López.JPG', name: 'Isabella Sánchez López', curso: '11B', cargo: 'Adjunta', comision: 'Línea Transversal', comisionColorClass: 'text-pink-400', comisionCategoria: 'Transversales' },
      { fileName: 'Luciana Medina.JPG', name: 'Luciana Medina', curso: '10B', cargo: 'Adjunta', comision: 'Línea Especial', comisionColorClass: 'text-violet-400', comisionCategoria: 'Especiales' },
      { fileName: 'Mariana Acuña.JPG', name: 'Mariana Acuña Castaño', curso: '10A', cargo: 'Adjunta', comision: 'Línea Ambiental', comisionColorClass: 'text-emerald-400', comisionCategoria: 'Ambientales' },
      { fileName: 'Sara Juliana Rico.JPG', name: 'Sara Juliana Rico', curso: '10B', cargo: 'Adjunta', comision: 'Línea Humanitaria', comisionColorClass: 'text-sky-400', comisionCategoria: 'Humanitarias' },
      { fileName: 'Sofia Suárez.JPG', name: 'Sofía Suárez', curso: '10A', cargo: 'Adjunta', comision: 'Línea Económica', comisionColorClass: 'text-amber-400', comisionCategoria: 'Económicas' },
      { fileName: 'Manuela Castellanos.JPG', name: 'Manuela Castellanos', curso: '10A', cargo: 'Adjunta', comision: 'Línea Histórica', comisionColorClass: 'text-orange-400', comisionCategoria: 'Históricas' }
    ],
    Presidentes: [
      { fileName: 'Daniel Cortes.JPG', name: 'Daniel Cortés Martínez', curso: '8C', cargo: 'Presidente', comision: 'UNCCP', comisionColorClass: 'text-sky-400', comisionCategoria: 'Humanitarias' },
      { fileName: 'Mariana Vanegas.JPG', name: 'Mariana Vanegas Portela', curso: '7B', cargo: 'Presidente', comision: 'PUPR', comisionQuery: 'Políticas del Uso de Plásticos y Residuos', comisionColorClass: 'text-emerald-400', comisionCategoria: 'Ambientales' },
      { fileName: 'DSC02266.JPG', name: 'Julietha Rodríguez Mogollón', curso: '7A', cargo: 'Presidenta', comision: 'WHO', comisionColorClass: 'text-pink-400', comisionCategoria: 'Transversales' },
      { fileName: 'DSC02269.JPG', name: 'María Alejandra Benavides', curso: '8C', cargo: 'Presidenta', comision: 'CCA', comisionQuery: 'Comercio, Consumo y Ambiente.', comisionColorClass: 'text-emerald-400', comisionCategoria: 'Ambientales' },
      { fileName: 'DSC02270.JPG', name: 'Gabriela Zabaleta Manjarrés', curso: '8C', cargo: 'Presidenta', comision: 'CCPCJ', comisionColorClass: 'text-rose-400', comisionCategoria: 'Políticas' },
      { fileName: 'DSC02272.JPG', name: 'Isabella Otálora', curso: '8C', cargo: 'Presidenta', comision: 'CESPAO', comisionColorClass: 'text-amber-400', comisionCategoria: 'Económicas' },
      { fileName: 'Luisa Mariño.JPG', name: 'Luisa Fernanda Mariño', curso: '9A', cargo: 'Presidenta', comision: 'Juicio 1948', comisionQuery: 'Juicio Histórico de 1948.', comisionColorClass: 'text-orange-400', comisionCategoria: 'Históricas' },
      { fileName: 'Miranda Núñez.JPG', name: 'Miranda Anastasia Núñez', curso: '8B', cargo: 'Presidenta', comision: '9/11', comisionQuery: 'September 11, 2001 and the war in Afghanistan.', comisionColorClass: 'text-orange-400', comisionCategoria: 'Históricas' },
      { fileName: 'Paula Pinzón.JPG', name: 'Paula Pinzón', curso: '10A', cargo: 'Presidenta', comision: 'Drugs and Crime', comisionQuery: 'Drugs and Crime.', comisionColorClass: 'text-pink-400', comisionCategoria: 'Transversales' },
      { fileName: 'Isabella Montufar.JPG', name: 'Isabella Montúfar', curso: '10A', cargo: 'Presidenta', comision: 'CCDF', comisionQuery: 'Comité contra la Desaparición Forzada de la ONU.', comisionColorClass: 'text-sky-400', comisionCategoria: 'Humanitarias' },
      { fileName: 'Emily Martínez.JPG', name: 'Emily Valeria Martínez Reyes', curso: '11B', cargo: 'Presidente', comision: 'Superintendencia Financiera', comisionColorClass: 'text-violet-400', comisionCategoria: 'Especiales' },
      { fileName: 'Luciana Clavijo.JPG', name: 'Luciana Clavijo Riccio', curso: '11B', cargo: 'Presidente', comision: 'Batman vs Joker', comisionColorClass: 'text-violet-400', comisionCategoria: 'Especiales' },
      { fileName: 'Luis Gerónimo Lievano.JPG', name: 'Luis Jerónimo Liévano', curso: '7B', cargo: 'Presidente', comision: 'ECOSOC', comisionColorClass: 'text-amber-400', comisionCategoria: 'Económicas' },
      { fileName: 'Mariana Medina.JPG', name: 'Mariana Medina', curso: '11A', cargo: 'Presidente', comision: 'CDH', comisionColorClass: 'text-sky-400', comisionCategoria: 'Humanitarias' },
      { fileName: 'María José Berbesí.JPG', name: 'María José Berbesí', curso: '8C', cargo: 'Presidente', comision: 'Security council', comisionColorClass: 'text-rose-400', comisionCategoria: 'Políticas' },
      { fileName: 'Santiago Rey.JPG', name: 'Santiago Rey', curso: '11B', cargo: 'Presidente', comision: 'FIFA GATE', comisionColorClass: 'text-violet-400', comisionCategoria: 'Especiales' },
      { fileName: 'Juanita Reyes.JPG', name: 'Juanita Reyes', curso: '10B', cargo: 'Presidenta', comision: 'Senado de la república', comisionColorClass: 'text-rose-400', comisionCategoria: 'Políticas' },
      { fileName: 'DSC02252.JPG', name: 'María José Restrepo', curso: '5B', cargo: 'Presidente', comision: 'COPUOS', comisionColorClass: 'text-orange-400', comisionCategoria: 'Históricas' },
      { fileName: 'DSC02253.JPG', name: 'María José Briñez', curso: '5B', cargo: 'Presidente', comision: 'CDA', comisionQuery: 'Crisis del Agua.', comisionColorClass: 'text-emerald-400', comisionCategoria: 'Ambientales' },
      { fileName: 'DSC02257.JPG', name: 'María Victoria Galindo', curso: '5B', cargo: 'Presidente', comision: 'Zootopia', comisionColorClass: 'text-pink-400', comisionCategoria: 'Transversales' },
      { fileName: 'DSC02258.JPG', name: 'David Esteban García Beltrán', curso: '6', cargo: 'Presidente', comision: 'CEPAL', comisionColorClass: 'text-amber-400', comisionCategoria: 'Económicas' },
      { fileName: 'DSC02254.JPG', name: 'Valentina Guevara', curso: '5B', cargo: 'Presidenta' }
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
    setIsCrisisOpen(false);
    setIsLogisticaOpen(false);
    setIsPrensaOpen(false);
    setCrisisOpenSection(null);
    setLogisticaPanels({ members: false, leaders: false });
    setPrensaPanels({ members: false, leaders: false });
    clearAutoFocusTarget();
  };

  const isInteractiveCargo = (title: string) =>
    isGalleryCargo(title) || title === 'Crisis' || title === 'Logística' || title === 'Prensa';

  const crisisAccordionButtonClass = 'w-full cursor-pointer px-4 py-4 flex items-center justify-between rounded-xl bg-transparent transition-colors duration-200 hover:bg-teremun-dark/5 active:bg-teremun-dark/10';
  const crisisNestedButtonClass = 'w-full cursor-pointer px-4 py-3 flex items-center justify-between rounded-lg bg-transparent transition-colors duration-200 hover:bg-teremun-dark/5 active:bg-teremun-dark/10';
  const crisisSectionContentClass = 'overflow-hidden transition-[max-height,opacity,transform] duration-500 ease-in-out';
  const crisisPanelContentClass = 'overflow-hidden transition-[max-height,opacity,transform] duration-500 ease-in-out';

  const toggleCrisisSection = (section: 'group1' | 'group2' | 'leaders') => {
    setCrisisOpenSection((current) => (current === section ? null : section));
    setCrisisPanels({
      group1Members: false,
      group1Lines: false,
      group2Members: false,
      group2Lines: false
    });
  };

  const toggleCrisisPanel = (panel: 'group1Members' | 'group1Lines' | 'group2Members' | 'group2Lines') => {
    setCrisisPanels((prev) => ({
      ...prev,
      [panel]: !prev[panel]
    }));
  };

  const toggleLogisticaPanel = (panel: 'members' | 'leaders') => {
    setLogisticaPanels((prev) => ({
      ...prev,
      [panel]: !prev[panel]
    }));
  };

  const togglePrensaPanel = (panel: 'members' | 'leaders') => {
    setPrensaPanels((prev) => ({
      ...prev,
      [panel]: !prev[panel]
    }));
  };

  const crisisGroups = {
    group1: {
      title: 'Grupo I',
      image: 'Grupo 1 Crisis.JPG',
      integrantes: [
        'Luciana Ramírez García',
        'Claudia Elena Andrade Mendoza',
        'Matías Contreras',
        'Aura Sofía Gómez Tautiva',
        'Isabella Cortés Morales'
      ],
      lineas: [
        { label: 'Políticas', colorClass: 'text-rose-400', categoria: 'Políticas' },
        { label: 'Económicas', colorClass: 'text-amber-400', categoria: 'Económicas' },
        { label: 'Humanitarias', colorClass: 'text-sky-400', categoria: 'Humanitarias' },
        { label: '+ Superintendencia Financiera', colorClass: 'text-violet-400', categoria: 'Especiales', comision: 'Superintendencia Financiera' },
        { label: '+ FIFA GATE', colorClass: 'text-violet-400', categoria: 'Especiales', comision: 'FIFA GATE' }
      ] as CrisisLine[]
    },
    group2: {
      title: 'Grupo II',
      image: 'Grupo 2 Crisis.JPG',
      integrantes: [
        'María Camila Mercado Haydar',
        'Silvina Mella',
        'Valentina Macías Cediel',
        'María Carolina Marín',
        'Michelle Campos'
      ],
      lineas: [
        { label: 'Ambiental', colorClass: 'text-emerald-400', categoria: 'Ambientales' },
        { label: 'Transversal', colorClass: 'text-pink-400', categoria: 'Transversales' },
        { label: 'Histórica', colorClass: 'text-orange-400', categoria: 'Históricas' },
        { label: '+ Batman vs Joker', colorClass: 'text-violet-400', categoria: 'Especiales', comision: 'Batman vs Joker' }
      ] as CrisisLine[]
    }
  };

  const logisticaMembers = [
    'Rihanna Olivia Carrillo',
    'Antonia Grijalba Chávez',
    'Mariana Rivas Gutiérrez',
    'Isabella Sánchez Hernández',
    'Luciana Güiza Cáceres',
    'Isabella Rojas Hernández',
    'Santiago Ortiz'
  ];

  const prensaMembers = [
    'Sara Quevedo Ruiz',
    'Daniela Julio Valderrama',
    'Isabella Ramírez Rincón',
    'María Alejandra Acosta Parra',
    'Juanita Higuera Parra',
    'Paula Natalia Guataquirá',
    'Daniel Jerónimo López',
    'Samuel Lozano Salgado',
    'Gabriela Morales',
    'Nicolás Vargas',
    'Leticia',
    'María Alejandra Lozano'
  ];

  const navigateToCommission = (categoria: string, comision?: string) => {
    const params = new URLSearchParams({ categoria });
    if (comision) {
      params.set('comision', comision);
    }
    closeGallery();
    navigate(`/comisiones?${params.toString()}`);
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

    // Consume deep-link params once so revisiting the route doesn't auto-open again.
    const cleanedParams = new URLSearchParams(location.search);
    cleanedParams.delete('cargo');
    cleanedParams.delete('miembro');
    cleanedParams.delete('miembroArchivo');
    const nextSearch = cleanedParams.toString();
    navigate(`${location.pathname}${nextSearch ? `?${nextSearch}` : ''}`, { replace: true });

    requestAnimationFrame(() => {
      const liderazgoSection = document.getElementById('liderazgo');
      liderazgoSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }, [location.search, location.pathname, navigate]);

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
      description: 'Apoyan diferentes comisiones representando la postura de varios países.'
    },
    {
      icon: Crown,
      title: 'Presidentes',
      description: 'Moderan las comisiones y garantizan el cumplimiento del protocolo.'
    },
    {
      icon: Truck,
      title: 'Logística',
      description: 'Asesoran a las comisiones con datos económicos y financieros.'
    },
    {
      icon: UsersRound,
      title: 'Adjuntos',
      description: 'Supervisan las comisiones y brindan apoyo durante el modelo.'
    },
    {
      icon: Flame,
      title: 'Crisis',
      description: 'Presentan escenarios que desafían a las comisiones a encontrar soluciones.'
    },
    {
      icon: Camera,
      title: 'Prensa',
      description: 'Documentan el evento y difunden el modelo en redes sociales.'
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
                  setIsCrisisOpen(false);
                  setIsLogisticaOpen(false);
                  setIsPrensaOpen(false);
                  setOpenGalleryCargo(cargo.title);
                  return;
                }

                if (cargo.title === 'Crisis') {
                  clearAutoFocusTarget();
                  setOpenGalleryCargo(null);
                  setIsLogisticaOpen(false);
                  setIsPrensaOpen(false);
                  setIsCrisisOpen(true);
                  return;
                }

                if (cargo.title === 'Logística') {
                  clearAutoFocusTarget();
                  setOpenGalleryCargo(null);
                  setIsCrisisOpen(false);
                  setIsPrensaOpen(false);
                  setLogisticaPanels({ members: false, leaders: false });
                  setIsLogisticaOpen(true);
                  return;
                }

                if (cargo.title === 'Prensa') {
                  clearAutoFocusTarget();
                  setOpenGalleryCargo(null);
                  setIsCrisisOpen(false);
                  setIsLogisticaOpen(false);
                  setPrensaPanels({ members: false, leaders: false });
                  setIsPrensaOpen(true);
                }
              }}
              className={`bg-white rounded-xl p-8 shadow-md transition-all duration-300 text-left ${
                isInteractiveCargo(cargo.title)
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

        {(openGalleryCargo || isCrisisOpen || isLogisticaOpen || isPrensaOpen) && (
          <div
            className="fixed inset-0 z-50 bg-teremun-dark/45 flex items-center justify-center px-4 animate-overlay-soft-in"
            onClick={closeGallery}
          >
            <div
              ref={modalScrollRef}
              className="w-full max-w-2xl max-h-[94vh] bg-white rounded-2xl shadow-2xl border border-teremun-burgundy/20 p-5 sm:p-7 overflow-y-auto overscroll-y-contain animate-modal-soft-pop"
              onClick={(e) => e.stopPropagation()}
            >
              {isCrisisOpen ? (
                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-dm-serif-display text-2xl sm:text-3xl text-teremun-dark">Crisis</h3>
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

                  <img
                    src={`/Crisis/${encodeURIComponent('Grupal Crisis.JPG')}`}
                    alt="Grupal Crisis"
                    className="w-full h-[19rem] sm:h-[22rem] object-cover object-[center_68%] rounded-lg"
                  />

                  <button
                    type="button"
                    onClick={() => toggleCrisisSection('group1')}
                    className={crisisAccordionButtonClass}
                  >
                    <span className="font-semibold text-lg sm:text-xl">Grupo I</span>
                    {crisisOpenSection === 'group1' ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </button>
                  <div
                    className={crisisSectionContentClass}
                    style={{
                      maxHeight: crisisOpenSection === 'group1' ? '1400px' : '0px',
                      opacity: crisisOpenSection === 'group1' ? 1 : 0,
                      transform: crisisOpenSection === 'group1' ? 'translateY(0)' : 'translateY(-6px)'
                    }}
                  >
                    <div className="space-y-4 pl-1 sm:pl-3 pt-4">
                      <img
                        src={`/Crisis/${encodeURIComponent(crisisGroups.group1.image)}`}
                        alt={crisisGroups.group1.title}
                        className="w-full h-auto object-contain rounded-lg"
                      />
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <button type="button" onClick={() => toggleCrisisPanel('group1Members')} className={crisisNestedButtonClass}>
                            <span className="font-semibold">Miembros</span>
                            {crisisPanels.group1Members ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                          </button>
                          <div
                            className={crisisPanelContentClass}
                            style={{
                              maxHeight: crisisPanels.group1Members ? '420px' : '0px',
                              opacity: crisisPanels.group1Members ? 1 : 0,
                              transform: crisisPanels.group1Members ? 'translateY(0)' : 'translateY(-4px)'
                            }}
                          >
                            <div className="pt-2 px-1 text-sm text-teremun-mahogany space-y-1">
                              {crisisGroups.group1.integrantes.map((member) => (
                                <div key={member}>{member}</div>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div>
                          <button type="button" onClick={() => toggleCrisisPanel('group1Lines')} className={crisisNestedButtonClass}>
                            <span className="font-semibold">Líneas</span>
                            {crisisPanels.group1Lines ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                          </button>
                          <div
                            className={crisisPanelContentClass}
                            style={{
                              maxHeight: crisisPanels.group1Lines ? '420px' : '0px',
                              opacity: crisisPanels.group1Lines ? 1 : 0,
                              transform: crisisPanels.group1Lines ? 'translateY(0)' : 'translateY(-4px)'
                            }}
                          >
                            <div className="pt-2 px-1 text-sm space-y-1">
                              {crisisGroups.group1.lineas.map((linea) => (
                                <button
                                  key={linea.label}
                                  type="button"
                                  onClick={() => navigateToCommission(linea.categoria, linea.comision)}
                                  className={`block w-full text-left font-semibold underline decoration-current/60 underline-offset-2 hover:opacity-85 transition-opacity ${linea.colorClass}`}
                                >
                                  {linea.label}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => toggleCrisisSection('group2')}
                    className={crisisAccordionButtonClass}
                  >
                    <span className="font-semibold text-lg sm:text-xl">Grupo II</span>
                    {crisisOpenSection === 'group2' ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </button>
                  <div
                    className={crisisSectionContentClass}
                    style={{
                      maxHeight: crisisOpenSection === 'group2' ? '1400px' : '0px',
                      opacity: crisisOpenSection === 'group2' ? 1 : 0,
                      transform: crisisOpenSection === 'group2' ? 'translateY(0)' : 'translateY(-6px)'
                    }}
                  >
                    <div className="space-y-4 pl-1 sm:pl-3 pt-4">
                      <img
                        src={`/Crisis/${encodeURIComponent(crisisGroups.group2.image)}`}
                        alt={crisisGroups.group2.title}
                        className="w-full h-auto object-contain rounded-lg"
                      />
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <button type="button" onClick={() => toggleCrisisPanel('group2Members')} className={crisisNestedButtonClass}>
                            <span className="font-semibold">Miembros</span>
                            {crisisPanels.group2Members ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                          </button>
                          <div
                            className={crisisPanelContentClass}
                            style={{
                              maxHeight: crisisPanels.group2Members ? '420px' : '0px',
                              opacity: crisisPanels.group2Members ? 1 : 0,
                              transform: crisisPanels.group2Members ? 'translateY(0)' : 'translateY(-4px)'
                            }}
                          >
                            <div className="pt-2 px-1 text-sm text-teremun-mahogany space-y-1">
                              {crisisGroups.group2.integrantes.map((member) => (
                                <div key={member}>{member}</div>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div>
                          <button type="button" onClick={() => toggleCrisisPanel('group2Lines')} className={crisisNestedButtonClass}>
                            <span className="font-semibold">Líneas</span>
                            {crisisPanels.group2Lines ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                          </button>
                          <div
                            className={crisisPanelContentClass}
                            style={{
                              maxHeight: crisisPanels.group2Lines ? '420px' : '0px',
                              opacity: crisisPanels.group2Lines ? 1 : 0,
                              transform: crisisPanels.group2Lines ? 'translateY(0)' : 'translateY(-4px)'
                            }}
                          >
                            <div className="pt-2 px-1 text-sm space-y-1">
                              {crisisGroups.group2.lineas.map((linea) => (
                                <button
                                  key={linea.label}
                                  type="button"
                                  onClick={() => navigateToCommission(linea.categoria, linea.comision)}
                                  className={`block w-full text-left font-semibold underline decoration-current/60 underline-offset-2 hover:opacity-85 transition-opacity ${linea.colorClass}`}
                                >
                                  {linea.label}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => toggleCrisisSection('leaders')}
                    className={crisisAccordionButtonClass}
                  >
                    <span className="font-semibold text-lg sm:text-xl">Líderes</span>
                    {crisisOpenSection === 'leaders' ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </button>
                  <div
                    className={crisisSectionContentClass}
                    style={{
                      maxHeight: crisisOpenSection === 'leaders' ? '900px' : '0px',
                      opacity: crisisOpenSection === 'leaders' ? 1 : 0,
                      transform: crisisOpenSection === 'leaders' ? 'translateY(0)' : 'translateY(-6px)'
                    }}
                  >
                    <div className="space-y-4 pl-1 sm:pl-3 pt-4 text-center">
                      <img
                        src={`/Crisis/${encodeURIComponent('líderes crisis.JPG')}`}
                        alt="Líderes Crisis"
                        className="mx-auto h-auto object-contain rounded-lg w-[72%]"
                      />
                      <div className="pt-2">
                        <div className="text-sm font-medium text-teremun-dark">Isabella Cortes y Michelle Campos</div>
                        <div className="text-sm font-semibold text-teremun-gold mt-0.5">Líderes Crisis</div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : isLogisticaOpen ? (
                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-dm-serif-display text-2xl sm:text-3xl text-teremun-dark">Logística</h3>
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

                  <img
                    src={`/Logística/${encodeURIComponent('Grupal Logística.JPG')}`}
                    alt="Grupal Logística"
                    className="w-full h-auto object-contain rounded-lg"
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <button type="button" onClick={() => toggleLogisticaPanel('leaders')} className={crisisNestedButtonClass}>
                        <span className="font-semibold">Líderes</span>
                        {logisticaPanels.leaders ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </button>
                      <div
                        className={crisisPanelContentClass}
                        style={{
                          maxHeight: logisticaPanels.leaders ? '700px' : '0px',
                          opacity: logisticaPanels.leaders ? 1 : 0,
                          transform: logisticaPanels.leaders ? 'translateY(0)' : 'translateY(-4px)'
                        }}
                      >
                        <div className="pt-2">
                          <img
                            src={`/Logística/${encodeURIComponent('Líderes Logística.JPG')}`}
                            alt="Líderes Logística"
                            className="w-full h-auto object-contain rounded-lg"
                          />
                          <div className="pt-2 text-sm text-center">
                            <div className="font-medium text-teremun-dark">Santiago Ortiz e Isabella Rojas</div>
                            <div className="font-semibold text-teremun-gold mt-0.5">Líderes Logística</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <button type="button" onClick={() => toggleLogisticaPanel('members')} className={crisisNestedButtonClass}>
                        <span className="font-semibold">Miembros</span>
                        {logisticaPanels.members ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </button>
                      <div
                        className={crisisPanelContentClass}
                        style={{
                          maxHeight: logisticaPanels.members ? '420px' : '0px',
                          opacity: logisticaPanels.members ? 1 : 0,
                          transform: logisticaPanels.members ? 'translateY(0)' : 'translateY(-4px)'
                        }}
                      >
                        <div className="pt-2 px-1 text-sm text-teremun-mahogany space-y-1">
                          {logisticaMembers.map((member) => (
                            <div key={member}>{member}</div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : isPrensaOpen ? (
                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-dm-serif-display text-2xl sm:text-3xl text-teremun-dark">Prensa</h3>
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

                  <img
                    src={`/Prensa/${encodeURIComponent('Grupal Prensa.JPG')}`}
                    alt="Grupal Prensa"
                    className="w-full h-auto object-contain rounded-lg"
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <button type="button" onClick={() => togglePrensaPanel('leaders')} className={crisisNestedButtonClass}>
                        <span className="font-semibold">Líder</span>
                        {prensaPanels.leaders ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </button>
                      <div
                        className={crisisPanelContentClass}
                        style={{
                          maxHeight: prensaPanels.leaders ? '700px' : '0px',
                          opacity: prensaPanels.leaders ? 1 : 0,
                          transform: prensaPanels.leaders ? 'translateY(0)' : 'translateY(-4px)'
                        }}
                      >
                        <div className="pt-2">
                          <img
                            src={`/Prensa/${encodeURIComponent('Líder prensa.png')}`}
                            alt="Líder Prensa"
                            className="w-full h-auto object-contain rounded-lg"
                          />
                          <div className="pt-2 text-sm text-center">
                            <div className="font-medium text-teremun-dark">María Alejandra Lozano</div>
                            <div className="font-semibold text-teremun-gold mt-0.5">Líder de Prensa</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <button type="button" onClick={() => togglePrensaPanel('members')} className={crisisNestedButtonClass}>
                        <span className="font-semibold">Miembros</span>
                        {prensaPanels.members ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </button>
                      <div
                        className={crisisPanelContentClass}
                        style={{
                          maxHeight: prensaPanels.members ? '420px' : '0px',
                          opacity: prensaPanels.members ? 1 : 0,
                          transform: prensaPanels.members ? 'translateY(0)' : 'translateY(-4px)'
                        }}
                      >
                        <div className="pt-2 px-1 text-sm text-teremun-mahogany space-y-1">
                          {prensaMembers.map((member) => (
                            <div key={member}>{member}</div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <>
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
                    {openGalleryCargo && galleryMembersByCargo[openGalleryCargo].map((member) => (
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
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Liderazgo;
