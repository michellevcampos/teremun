import { useEffect, useState, type ComponentType } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Building2, ExternalLink, Globe, Heart, Landmark, Leaf, Scale, Sparkles, X } from 'lucide-react';

type CommissionCard = {
  icon: ComponentType<{ className?: string; size?: number }>;
  name: string;
  topic: string;
  description: string;
  problematica?: string;
  documentUrl?: string;
  categoryIconPath?: string;
  categoryName?: string;
  members?: {
    grupo: string;
    presidente: string;
    secretarioPiso?: string;
    delegaciones: Array<{
      delegacion: string;
      delegado?: string;
      curso?: string;
    }>;
  };
};

const Comisiones = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [openCategoria, setOpenCategoria] = useState('');
  const [selectedCard, setSelectedCard] = useState<CommissionCard | null>(null);
  const [cardView, setCardView] = useState<'informacion' | 'miembros'>('informacion');

  const normalizeText = (value: string) =>
    value
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .trim()
      .toLowerCase();

  const categoryAnchorId = (value: string) => `categoria-${normalizeText(value).replace(/\s+/g, '-')}`;
  const categoryTriggerId = (value: string) => `categoria-trigger-${normalizeText(value).replace(/\s+/g, '-')}`;

  const englishCommissionNames = new Set([
    'ecosoc',
    'copuos',
    'security council'
  ]);

  const isEnglishCommission = (card: CommissionCard) => englishCommissionNames.has(normalizeText(card.name));

  const leadershipPresidentFileByName: Record<string, string> = {
    'daniel cortes': 'Daniel Cortes.JPG',
    'emily valeria martinez': 'Emily Martínez.JPG',
    'emily martinez': 'Emily Martínez.JPG',
    'luciana clavijo riccio': 'Luciana Clavijo.JPG',
    'luciana clavijo': 'Luciana Clavijo.JPG',
    'luis geronimo lievano': 'Luis Gerónimo Lievano.JPG',
    'mariana medina': 'Mariana Medina.JPG',
    'maria jose berbesi': 'María José Berbesí.JPG',
    'santiago rey': 'Santiago Rey.JPG'
  };

  const getPresidentNameWithoutCourse = (presidente: string) =>
    presidente
      .replace(/\s*\(?\d+[A-Za-z]?\)?\s*$/, '')
      .trim();

  const handlePresidentNavigation = (presidente: string) => {
    const presidentName = getPresidentNameWithoutCourse(presidente);
    const presidentFile = leadershipPresidentFileByName[normalizeText(presidentName)];
    const params = new URLSearchParams({
      cargo: 'Presidentes',
      miembro: presidentName
    });

    if (presidentFile) {
      params.set('miembroArchivo', presidentFile);
    }

    setSelectedCard(null);
    navigate(`/liderazgo?${params.toString()}`);
  };

  const cardIconBgByCategory: Record<string, string> = {
    Ambientales: 'bg-emerald-400',
    'Económicas': 'bg-amber-400',
    Especiales: 'bg-violet-400',
    'Históricas': 'bg-orange-400',
    Humanitarias: 'bg-blue-400',
    'Políticas': 'bg-rose-400',
    Transversales: 'bg-pink-400'
  };

  const getCardIconBgClass = (categoryName: string | undefined) =>
    (categoryName && cardIconBgByCategory[categoryName]) || 'bg-teremun-burgundy';

  useEffect(() => {
    if (!selectedCard) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [selectedCard]);

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
      categoryIcon: '/Ambientales.PNG',
      cardGradient: 'from-white via-white to-emerald-100/55 border-emerald-200/60',
      cards: [
        {
          icon: Leaf,
          name: 'Asamblea General de Naciones Unidas',
          topic: 'Comisión Ambiental',
          description: 'Comercio, Consumo y Ambiente.',
          problematica: 'Afectaciones por la implantación de aranceles en la productividad y la explotación de recursos naturales.',
          documentUrl: 'https://docs.google.com/document/d/1RL3rZPZ8AbjFKQq5JafKLnofzmN_p5v1/edit?usp=sharing&ouid=117366139924779115759&rtpof=true&sd=true',
          members: {
            grupo: 'Octavo y Noveno',
            presidente: 'María Alejandra Benavides 8C',
            secretarioPiso: '',
            delegaciones: [
              { delegacion: 'República de Costa Rica', delegado: 'Martina Cuervo Quintero', curso: '9A' },
              { delegacion: 'República de Indonesia', delegado: 'Sofía Valentina Enciso Figeroa', curso: '9B' },
              { delegacion: 'António Costa (Presidente del Consejo Europeo)' },
              { delegacion: 'República de la India', delegado: 'Santiago Rodríguez', curso: '9A' },
              { delegacion: 'República Popular China', delegado: 'Danna García', curso: '8A' },
              { delegacion: 'República Federativa de Brasil', delegado: 'Salome Ojeda', curso: '8A' },
              { delegacion: 'Estados Unidos de América', delegado: 'Mariana Hernandez', curso: '9A' },
              { delegacion: 'Unilever' },
              { delegacion: 'Nestlé', delegado: 'Isabella Colmenares', curso: '8A' },
              { delegacion: 'INDITEX', delegado: 'Luciana Guzmán Álvarez', curso: '8B' },
              { delegacion: 'Apple Inc.' },
              { delegacion: 'República Socialista de Vietnam', delegado: 'Daniel Mendoza Árias', curso: '8B' }
            ]
          }
        },
        {
          icon: Leaf,
          name: 'Asamblea General de Naciones Unidas',
          topic: 'Comisión Ambiental',
          description: 'Crisis del Agua.',
          problematica: 'Privatización a nivel mundial de los recursos hídricos (Cuarto y Quinto).',
          documentUrl: 'https://docs.google.com/document/d/1R4BaD1Z_cyy3BMPtKcomIssxqj41Ootj/edit?usp=sharing&ouid=117366139924779115759&rtpof=true&sd=true',
          members: {
            grupo: 'Cuarto y Quinto',
            presidente: 'María José Briñez 5B',
            secretarioPiso: '',
            delegaciones: [
              { delegacion: 'República Popular China', delegado: 'Maria Luciana Ortiz Orozco', curso: '4A' },
              { delegacion: 'Reino de España', delegado: 'Matias Ojeda', curso: '5B' },
              { delegacion: 'Estado de Israel', delegado: 'Camila Amanda Hernández Strauss', curso: '4A' },
              { delegacion: 'República de Chile', delegado: 'Mariana Velasquez', curso: '5B' },
              { delegacion: 'Reino de Baréin', delegado: 'Juan Sebastián Delgado Rodríguez', curso: '4B' },
              { delegacion: 'República de Singapur', delegado: 'Sarah Colmenares Silva', curso: '4A' },
              { delegacion: 'Emiratos Árabes Unidos', delegado: 'Camila Morales', curso: '5B' },
              { delegacion: 'República de Senegal', delegado: 'Isabella Martínez Silva', curso: '4B' },
              { delegacion: 'Estados Unidos Mexicanos', delegado: 'Emiliano García Castañedo', curso: '4A' },
              { delegacion: 'República de Panamá', delegado: 'Valentina Mogollón Fernández', curso: '4A' },
              { delegacion: 'República de Tayikistán', delegado: 'Victoria Zabaleta Manjarres', curso: '4B' },
              { delegacion: 'República Árabe de Egipto', delegado: 'Luciana Muñóz Ángel', curso: '4A' },
              { delegacion: 'Confederación Suiza', delegado: 'Antonella Gómez Hermida', curso: '4A' },
              { delegacion: 'República de Guatemala', delegado: 'Juana Diaz Villa', curso: '4B' },
              { delegacion: 'El Salvador', delegado: 'Abraham Mateo García', curso: '4A' },
              { delegacion: 'Estados Unidos de América', delegado: 'Emilia Rincón Suárez', curso: '4B' },
              { delegacion: 'República de Brasil', delegado: 'Ana Sofía Vargas Herrera', curso: '4B' },
              { delegacion: 'Arabia Saudita', delegado: 'Sara Cardenas', curso: '5A' },
              { delegacion: 'India', delegado: 'Miguel Ángel Ruiz', curso: '5A' },
              { delegacion: 'Sudáfrica', delegado: 'Violeta Rincón', curso: '5A' },
              { delegacion: 'Argentina', delegado: 'Martin Cantor', curso: '5A' },
              { delegacion: 'República de Colombia', delegado: 'Gabriela Alvarado', curso: '5A' }
            ]
          }
        },
        {
          icon: Leaf,
          name: 'Asamblea General de Naciones Unidas',
          topic: 'Comisión Ambiental',
          description: 'Políticas del Uso de Plásticos y Residuos.',
          problematica: 'Islas de basura y microplásticos.',
          documentUrl: 'https://docs.google.com/document/d/13-R_EmtPUT4H-MArLxrEUYbA0Tyz1EiB/edit?usp=sharing&ouid=117366139924779115759&rtpof=true&sd=true',
          members: {
            grupo: 'Sexto y Séptimo',
            presidente: 'Mariana Vanegas Portela 7B',
            secretarioPiso: '',
            delegaciones: [
              { delegacion: 'Reino de Noruega', delegado: 'Roxanne Romero Florez', curso: '7A' },
              { delegacion: 'República de Rwanda', delegado: 'Gabriela Suspes Suarez', curso: '7A' },
              { delegacion: 'República Popular China', delegado: 'Valeria Hurtado Sandoval', curso: '7B' },
              { delegacion: 'The Coca-Cola Company', delegado: 'Julián Jiménez Hoyos', curso: '7B' },
              { delegacion: 'Canadá', delegado: 'Ivanna Grimaldo Romero', curso: '7A' },
              { delegacion: 'República de Corea (Corea del Sur)', delegado: 'Juan Sebastián Gómez Farias', curso: '7A' },
              { delegacion: 'PepsiCo', delegado: 'Victoria Isabella Moreno Santa', curso: '7B' },
              { delegacion: 'ExxonMobil', delegado: 'Mariana Huertas', curso: '6' },
              { delegacion: 'Dow Chemical Company', delegado: 'Luciana Ortiz', curso: '6' },
              { delegacion: 'Sinopec', delegado: 'María Alejandra Sierra Calderón', curso: '7B' },
              { delegacion: 'República Federal de Alemania', delegado: 'Valeria Leguizamon Fonseca', curso: '7A' },
              { delegacion: 'República Francesa', delegado: 'Amy Sofía Árias Muñoz', curso: '7B' },
              { delegacion: 'Estados Unidos de América', delegado: 'Gabriela Velásquez Perdomo', curso: '7B' },
              { delegacion: 'República de la India', delegado: 'Camila Victoria Córdoba Sánchez', curso: '6' },
              { delegacion: 'Indonesia', delegado: 'Jhonatan Santiago Cárdenas', curso: '6' },
              { delegacion: 'Vietnam', delegado: 'Sofía Gantiva Montenegro', curso: '6' },
              { delegacion: 'Chile', delegado: 'Aini Miechelle Colorado Medina', curso: '6' }
            ]
          }
        }
      ]
    },
    {
      categoria: 'Económicas',
      categoryIcon: '/Económicas.PNG',
      cardGradient: 'from-white via-white to-amber-100/55 border-amber-200/60',
      cards: [
        {
          icon: Scale,
          name: 'CEPAL',
          topic: 'Comisión Económica',
          description: 'Comisión Económica para América Latina y el Caribe.',
          problematica: 'América Latina entre la crisis y la esperanza: sequías en Bolivia, inflación en Argentina, minería en Chile, violencia en México y reformas en Colombia. ¿Cómo pueden los países de CEPAL cooperar para que la economía no destruya el ambiente ni la paz social?',
          documentUrl: 'https://docs.google.com/document/d/17ieKQMGvmJmlpXh85rtBXwXkTYvZ2Zui/edit?usp=sharing&ouid=117366139924779115759&rtpof=true&sd=true',
          members: {
            grupo: 'Sexto y Séptimo',
            presidente: 'David García Beltrán 6',
            secretarioPiso: '',
            delegaciones: [
              { delegacion: 'Costa Rica', delegado: 'Federico Cabrera Becerra', curso: '6' },
              { delegacion: 'Argentina', delegado: 'Kimberly Andrea Delgado Beltrán', curso: '7A' },
              { delegacion: 'Brasil', delegado: 'Isabella Olmos Alfonso', curso: '6' },
              { delegacion: 'Chile', delegado: 'Bruno Eduardo Mella González', curso: '6' },
              { delegacion: 'Colombia', delegado: 'María Camila Pulgarín Castro', curso: '7A' },
              { delegacion: 'Cuba', delegado: 'María Paz García Guzmán', curso: '6' },
              { delegacion: 'Salvador', delegado: 'Miguel Angel Trujillo Garzón', curso: '6' },
              { delegacion: 'Panama', delegado: 'Valeria Lozano Barreto', curso: '7A' },
              { delegacion: 'Nicaragua', delegado: 'Julian David Chávez Sanabria', curso: '7A' },
              { delegacion: 'Canada', delegado: 'Juanita Gutierrez Medina', curso: '6' },
              { delegacion: 'Estados Unidos', delegado: 'María José Sánchez Tellez', curso: '6' },
              { delegacion: 'Jamaica', delegado: 'Denisse Nathalia Acevedo Mejía', curso: '7A' },
              { delegacion: 'Paises Bajos', delegado: 'Alejandro Máximo Gaitán Rocha', curso: '6' },
              { delegacion: 'Haiti', delegado: 'Gabriel Bernal', curso: '6' },
              { delegacion: 'Honduras', delegado: 'Juan Ángel Alvarado Barragán', curso: '7B' },
              { delegacion: 'Republica Dominicana', delegado: 'Ramirez Herrera', curso: '7A' },
              { delegacion: 'Surinam', delegado: 'Emma Cadena', curso: '6' },
              { delegacion: 'Venezuela', delegado: 'Isabella Barrera Siabato', curso: '7B' },
              { delegacion: 'Bolivia', delegado: 'Mateo Ariza Ariza', curso: '7B' },
              { delegacion: 'Guatemala', delegado: 'Isabella Mejía Salcedo', curso: '7B' },
              { delegacion: 'Mexico', delegado: 'Sofía Paiva', curso: '6' }
            ]
          }
        },
        {
          icon: Scale,
          name: 'CESPAO',
          topic: 'Comisión Económica',
          description: 'Comisión Económica y Social para Asia Occidental.',
          problematica: 'Reconstrucción económica post-guerra en Asia Occidental: Irán después del conflicto armado con Estados Unidos (2026), la crisis humanitaria en Palestina y el rol de CESPAO en el financiamiento para el desarrollo sostenible en una región devastada por dos guerras.',
          documentUrl: 'https://docs.google.com/document/d/1rZvU2guKnnyYQ10YuQnFF9dNl4NZs0-y/edit?usp=sharing&ouid=117366139924779115759&rtpof=true&sd=true',
          members: {
            grupo: 'Octavo y Noveno',
            presidente: 'Isabella Otálora Gordillo 8C',
            secretarioPiso: '',
            delegaciones: [
              { delegacion: 'Palestina' },
              { delegacion: 'China', delegado: 'José David Estrada Torres', curso: '8B' },
              { delegacion: 'Alemania', delegado: 'Salomé Ladino Ávila', curso: '8C' },
              { delegacion: 'Egipto', delegado: 'Cabrera Becerra Mariana', curso: '9B' },
              { delegacion: 'Irak', delegado: 'Paula Cuesta Calderón', curso: '8C' },
              { delegacion: 'Catar' },
              { delegacion: 'Emiratos Árabes Unidos', delegado: 'María Camila Santofimio', curso: '9B' },
              { delegacion: 'Bahrein', delegado: 'Salomé Muñoz Ángel' },
              { delegacion: 'Jordania' },
              { delegacion: 'Japon', delegado: 'Laura León Quintero', curso: '9A' },
              { delegacion: 'Líbano' },
              { delegacion: 'Yemen' },
              { delegacion: 'Libia' },
              { delegacion: 'Arabia Saudita', delegado: 'Paula Gabriela Rios', curso: '9A' },
              { delegacion: 'Sudán' },
              { delegacion: 'Turquía' },
              { delegacion: 'Irán' },
              { delegacion: 'Israel' },
              { delegacion: 'Turquia', delegado: 'Manuel Alejandro Tovar Duarte', curso: '9B' },
              { delegacion: 'Pakistán', delegado: 'Salomé Muñoz Ángel', curso: '8B' }
            ]
          }
        },
        {
          icon: Scale,
          name: 'ECOSOC',
          topic: 'Comisión Económica',
          description: 'Economic and Social Council of the United Nations.',
          problematica: 'Financing for sustainable development, external debt crisis, and international cooperation against post-pandemic global inequality.',
          documentUrl: 'https://docs.google.com/document/d/1vxmd1UavL5CWsjpOUStwJAvlXm8BXlQV/edit?usp=sharing&ouid=117366139924779115759&rtpof=true&sd=true',
          members: {
            grupo: 'Sexto y Séptimo',
            presidente: 'Luis Gerónimo Lievano 7B',
            secretarioPiso: '',
            delegaciones: [
              { delegacion: 'Estados Unidos de America', delegado: 'Tomas Serrano Neira', curso: '7A' },
              { delegacion: 'China', delegado: 'Sebastian Hurtado Sandoval', curso: '7A' },
              { delegacion: 'Alemania', delegado: 'Camila Buitrago Passo', curso: '6' },
              { delegacion: 'Egipto' },
              { delegacion: 'Francia', delegado: 'Sergio Enrique Larez Acosta', curso: '7A' },
              { delegacion: 'Sudafrica' },
              { delegacion: 'Bangladesh' },
              { delegacion: 'Ecuador', delegado: 'Alan Tomás Alvarez Ortiz', curso: '6' },
              { delegacion: 'Finlandia', delegado: 'Victoria Hernández Gaona', curso: '7B' },
              { delegacion: 'Japon', delegado: 'Sara Lucía Lazaro Santana', curso: '7A' },
              { delegacion: 'Mexico', delegado: 'Gabriel Santiago Umaña García', curso: '6' },
              { delegacion: 'Rusia', delegado: 'Liseth Sofía Carvajal Mendoza', curso: '7B' },
              { delegacion: 'Uruguay', delegado: 'Juan Felipe Diaz Ballesteros', curso: '7A' },
              { delegacion: 'Arabia Saudita' },
              { delegacion: 'Haiti' },
              { delegacion: 'Australia', delegado: 'Mariana Alzate Brito', curso: '7A' },
              { delegacion: 'Peru', delegado: 'Juan Miguel Ávila', curso: '6' },
              { delegacion: 'Senegal' },
              { delegacion: 'Turquia', delegado: 'Juliana Soto Rincón', curso: '7B' },
              { delegacion: 'Zambia' }
            ]
          }
        }
      ]
    },
    {
      categoria: 'Especiales',
      categoryIcon: '/Especiales.PNG',
      cardGradient: 'from-white via-white to-fuchsia-100/65 border-fuchsia-200/70',
      cards: [
        {
          icon: Sparkles,
          name: 'Betty la fea',
          topic: 'Comisión Especial',
          description: 'Ecomoda y Superintendencia.',
          documentUrl: 'https://docs.google.com/document/d/1KUBAmDN_Q_mfbiKB8fhJ910TKNLVwoMS/edit?usp=sharing&ouid=117366139924779115759&rtpof=true&sd=true',
          members: {
            grupo: 'Decimo y Undecimo',
            presidente: 'Emily Valeria Martinez 11B',
            secretarioPiso: '',
            delegaciones: [
              { delegacion: 'Beatriz Pinzón Betty – Gerente financiera / analista contable', delegado: 'Ángelamaria López', curso: '11B' },
              { delegacion: 'Armando Mendoza – Presidente de Ecomoda', delegado: 'Diego Martín Velásquez', curso: '10A' },
              { delegacion: 'Marcela Valencia – Gerente administrativa', delegado: 'Mariana Garcia', curso: '11B' },
              { delegacion: 'Mario Calderón – Vicepresidente comercial' },
              { delegacion: 'Daniel Valencia – Accionista principal', delegado: 'Samuel Sabogal', curso: '10B' },
              { delegacion: 'Patricia Fernández – Secretaría de presidencia' },
              { delegacion: 'Nicolás Mora – Asesor financiero externo' },
              { delegacion: 'Gutiérrez – Abogado corporativo' },
              { delegacion: 'Hugo Lombardi – Director creativo', delegado: 'Gabriela Suarez', curso: '10B' },
              { delegacion: 'Catalina Ángel – Directora de imagen corporativa', delegado: 'Daniela Beltran', curso: '11B' },
              { delegacion: 'Jenny García – Representante comercial/modelaje' },
              { delegacion: 'Aura María Fuentes – Representante de empleados', delegado: 'Victoria Saray', curso: '10B' },
              { delegacion: 'Bertha Muñoz – Supervisora de confecciones' },
              { delegacion: 'Sandra Patiño – Asistente administrativa' },
              { delegacion: 'Freddy Contreras – Coordinador logístico/mensajería' },
              { delegacion: 'Superintendente de Sociedades – Autoridad principal de control' },
              { delegacion: 'Auditor financiero externo – Revisión de balances' },
              { delegacion: 'Revisor fiscal – Control legal y tributario', delegado: 'Daniel Calderón Pérez', curso: '10A' },
              { delegacion: 'Delegado de control interno – Supervisión administrativa' },
              { delegacion: 'Comité de ética empresarial – Vigilancia de conducta corporativa', delegado: 'Gabriela Ruiz', curso: '10B' }
            ]
          }
        },
        {
          icon: Sparkles,
          name: 'Batman vs Joker',
          topic: 'Comisión Especial',
          description: 'Crisis de gobernabilidad en Ciudad Gótica.',
          problematica: 'Crisis de gobernabilidad en Ciudad Gótica: El Joker ha desatado una ola de ataques simultáneos contra el sistema de justicia, la policía y los símbolos de autoridad. Batman actúa por fuera de la ley para detenerlo. La ciudad está dividida: unos ven a Batman como el único salvador posible; otros lo ven como un vigilante que empeora las cosas. ¿Debe Ciudad Gótica legalizar la acción de los vigilantes, rendirse ante el caos del Joker, o encontrar un tercer camino?',
          documentUrl: 'https://docs.google.com/document/d/1PAKb1P-jbbNX1rXezv3rzRZ_Se9CsDQN/edit?usp=sharing&ouid=117366139924779115759&rtpof=true&sd=true',
          members: {
            grupo: 'Décimo y Undecimo',
            presidente: 'Luciana Clavijo Riccio 11B',
            secretarioPiso: '',
            delegaciones: [
              { delegacion: 'Batman – Vigilante de Gotham', delegado: 'Lucas Gómez', curso: '10A' },
              { delegacion: 'Joker – Criminal y terrorista' },
              { delegacion: 'Harvey Dent – Fiscal de Distrito', delegado: 'María José Jiménez', curso: '11A' },
              { delegacion: 'James Gordon – Departamento de Policía de Gotham', delegado: 'Alejandro Guzman', curso: '11B' },
              { delegacion: 'Alfred Pennyworth – Asesor de Bruce Wayne', delegado: 'Sebastian Ortiz', curso: '11B' },
              { delegacion: 'Lucius Fox – Director de tecnología Wayne Enterprises', delegado: 'Oscar Salazar', curso: '10B' },
              { delegacion: 'Rachel Dawes – Fiscalía de Gotham', delegado: 'Sara Plazas Cháves', curso: '10A' },
              { delegacion: 'Sal Maroni – Mafia de Gotham' },
              { delegacion: 'Gambol – Crimen organizado' },
              { delegacion: 'Policía de Gotham' },
              { delegacion: 'SWAT de Gotham' },
              { delegacion: 'Fiscalía General de Gotham' },
              { delegacion: 'Tribunal Supremo de Gotham' },
              { delegacion: 'Arkham Asylum – Institución psiquiátrica', delegado: 'Isabella Durán', curso: '10B' },
              { delegacion: 'Ciudadanos de Gotham' },
              { delegacion: 'Medios de comunicación de Gotham' },
              { delegacion: 'Hospital General de Gotham' },
              { delegacion: 'Wayne Enterprises' },
              { delegacion: 'Mafia organizada de Gotham' }
            ]
          }
        },
        {
          icon: Sparkles,
          name: 'FIFA GATE',
          topic: 'Comisión Especial',
          description: 'Corrupción y delitos dentro de la FIFA.',
          documentUrl: 'https://docs.google.com/document/d/1P1riXvDPsUVA15q6OcL77n6besWDCW5L/edit?usp=sharing&ouid=117366139924779115759&rtpof=true&sd=true',
          members: {
            grupo: 'Octavo y Noveno',
            presidente: 'Santiago Rey 11A',
            secretarioPiso: '',
            delegaciones: [
              { delegacion: 'Federación Argentina', delegado: 'Thomas Santiago Cuadrado', curso: '9B' },
              { delegacion: 'Federación Brasileña', delegado: 'Jose Manuel Prada', curso: '9A' },
              { delegacion: 'Federación Francesa', delegado: 'Daniel Dorantes', curso: '9B' },
              { delegacion: 'Federación Inglesa', delegado: 'Juan Esteban Paiva', curso: '9B' },
              { delegacion: 'Federación Alemana', delegado: 'Juan Mario Pardo Ballesteros', curso: '8C' },
              { delegacion: 'Federación Italiana' },
              { delegacion: 'Qatar' },
              { delegacion: 'Rusia', delegado: 'Esteban López Hoyos', curso: '8C' },
              { delegacion: 'Confederación Sudamericana – CONMEBOL', delegado: 'Jeronimo Silva', curso: '9A' },
              { delegacion: 'UEFA', delegado: 'Lucas Salazar Silva', curso: '9B' },
              { delegacion: 'Comité de Ética FIFA', delegado: 'Daniel Santiago Varón Barragán', curso: '8B' },
              { delegacion: 'Departamento de Justicia de EE.UU.' },
              { delegacion: 'Patrocinadores deportivos', delegado: 'Juan David Amado Castillo', curso: '8C' },
              { delegacion: 'Medios de comunicación deportivos' },
              { delegacion: 'FIFA', delegado: 'Juan José Forero', curso: '9A' }
            ]
          }
        }
      ]
    },
    {
      categoria: 'Históricas',
      categoryIcon: '/Históricas.PNG',
      cardGradient: 'from-white via-white to-orange-100/50 border-orange-200/60',
      cards: [
        {
          icon: Landmark,
          name: '9 de Abril',
          topic: 'Comisión Histórica',
          description: 'Juicio Histórico de 1948.',
          documentUrl: 'https://docs.google.com/document/d/1xCU_HI8G_oaJ1r7nfjUbdQqP2wBh6kj4/edit?usp=sharing&ouid=117366139924779115759&rtpof=true&sd=true',
          members: {
            grupo: 'Octavo y Noveno',
            presidente: 'Luisa Marino 9A',
            secretarioPiso: '',
            delegaciones: [
              { delegacion: 'Juan Roa Sierra — Principal acusado del asesinato (Sospechoso)', delegado: 'Anna Sophia Yazo Maecha', curso: '9B' },
              { delegacion: 'Mariano Ospina Perez — Presidente de la Republica', delegado: 'Nicolas Ramirez', curso: '9A' },
              { delegacion: 'Laureano Gomez — Lider conservador', delegado: 'Maria Jose Palomo', curso: '9A' },
              { delegacion: 'Dario Echandia — Figura liberal moderada' },
              { delegacion: 'Carlos Lleras Restrepo — Representante liberal' },
              { delegacion: 'Gabriel Turbay — Lider liberal opositor a Gaitan' },
              { delegacion: 'Eduardo Santos — Expresidente liberal', delegado: 'Maria Jose Martinez Tamayo', curso: '9B' },
              { delegacion: 'Alberto Lleras Camargo - Primer mandatario del Frente Nacional' },
              { delegacion: 'Gloria Gaitan — Representante de la familia Gaitan', delegado: 'Camila Carreno', curso: '9A' },
              { delegacion: 'Jose Maria Velasco Ibarra — Observador regional de la crisis politica', delegado: 'Isabel Sofia Rivera', curso: '8A' },
              { delegacion: 'Willard L. Beaulac. - Embajador de Estados Unidos' },
              { delegacion: 'Fiscalia del caso Gaitan — Encargada de recopilar pruebas', delegado: 'Maria Jose Garcia Ramirez', curso: '8C' },
              { delegacion: 'Gilberto Alzate Avendano — lider conservador' },
              { delegacion: 'Gustavo Rojas Pinilla — Militar' },
              { delegacion: 'Belisario Betancur — Figura joven conservadora' },
              { delegacion: 'Plinio Mendoza Neira — Vocero liberal (Testigo)' },
              { delegacion: 'Pedro Eliseo Cruz - Testigo del Asesinato', delegado: 'Isabella Manjarres', curso: '8A' },
              { delegacion: 'Alejandro Vallejo - Testigo del asesinao' },
              { delegacion: 'Jorge Padilla - Testigo del Asesinato' },
              { delegacion: 'Fidel Castro - Congresista Latinoamericano de Estudiantes.' }
            ]
          }
        },
        {
          icon: Landmark,
          name: 'Security Council',
          topic: 'Comisión Histórica',
          description: 'September 11, 2001 and the war in Afghanistan.',
          problematica: 'On September 11, 2001, the United States was attacked by the terrorist group Al Qaeda. 2,977 people died. The UN Security Council had to decide how to respond. Should it authorize an invasion of Afghanistan, where Al Qaeda was hiding? Should it impose sanctions? Should it seek justice through courts? What was legal and what was fair?',
          documentUrl: 'https://docs.google.com/document/d/1JkXYTDJ8THYGCteFDZqlTlPK32i2J5af/edit?usp=sharing&ouid=117366139924779115759&rtpof=true&sd=true',
          members: {
            grupo: 'Octavo y Noveno',
            presidente: 'Miranda Anastasia Nunez 8B',
            secretarioPiso: '',
            delegaciones: [
              { delegacion: 'Estados Unidos de America — Pais directamente afectado por los ataques.', delegado: 'Mateo Frezic Lopez', curso: '9B' },
              { delegacion: 'Reino Unido de Gran Bretana e Irlanda del Norte — Principal aliado de EE. UU. en la guerra contra el terrorismo.', delegado: 'Felipe Mogollon Fernandes', curso: '9B' },
              { delegacion: 'Republica Francesa — Participacion diplomatica y militar posterior.', delegado: 'Maria Camila Ramos', curso: '9A' },
              { delegacion: 'Federacion de Rusia — Cooperacion internacional antiterrorista.', delegado: 'Maria Jose Cuervo Popayan', curso: '8A' },
              { delegacion: 'Republica Popular China — Postura sobre seguridad global y soberania.', delegado: 'Mariana Almanza Ortiz', curso: '8A' },
              { delegacion: 'Republica Islamica de Afganistan — Centro del conflicto tras los ataques.', delegado: 'Miranda Estrada Torres', curso: '8A' },
              { delegacion: 'Republica Islamica de Pakistan — Actor clave por su relacion con Afganistan y la region.', delegado: 'Mariana Garcia Maldonado', curso: '8A' },
              { delegacion: 'Reino de Arabia Saudita — Tema sensible por la nacionalidad de varios atacantes.', delegado: 'Valeria Ascanio Gualdron', curso: '8B' },
              { delegacion: 'Republica Islamica de Iran — Importante actor regional en Medio Oriente.', delegado: 'Mariana Hoyos Carrillo', curso: '8B' },
              { delegacion: 'Estado de Israel — Experiencia en seguridad y antiterrorismo.', delegado: 'Jose David Ponce Clavijo', curso: '9B' },
              { delegacion: 'Republica Federal de Alemania — Lugar donde operaron algunos implicados.', delegado: 'Maria Gabriela Vargas Pelarez', curso: '8C' },
              { delegacion: 'Canada — Cooperacion fronteriza y de inteligencia.', delegado: 'Mariana Patino', curso: '8A' },
              { delegacion: 'Republica de Turquia — Miembro estrategico de la OTAN.', delegado: 'Santiago Larez', curso: '8A' },
              { delegacion: 'Republica Arabe de Egipto — Influencia politica en el mundo arabe.', delegado: 'Sara Juliana Gacharna Beltran', curso: '8C' },
              { delegacion: 'Republica de la India — Debate internacional sobre terrorismo.', delegado: 'Jeronimo Tello Murillo', curso: '8A' },
              { delegacion: 'Republica Italiana — Participacion en operaciones internacionales.', delegado: 'Martin Guarin Ortiz', curso: '8A' },
              { delegacion: 'Reino de Espana — Experiencia en ataques terroristas y cooperacion europea.', delegado: 'Juan Andres Lozano Valderrama', curso: '9B' },
              { delegacion: 'Organizacion del Tratado del Atlantico Norte — Activo defensa colectiva tras el 11-S.', delegado: 'Juan David Rivera', curso: '8A' },
              { delegacion: 'Consejo de Seguridad de las Naciones Unidas — Aprobo resoluciones contra el terrorismo.', delegado: 'Maria Fernanda Ruiz', curso: '9A' },
              { delegacion: 'Federal Bureau of Investigation — Investigacion interna de los ataques.', delegado: 'Mariana Gracia Rico', curso: '8C' },
              { delegacion: 'Central Intelligence Agency — Inteligencia internacional y operaciones posteriores.', delegado: 'Mariana Vanegas Cortes', curso: '8C' }
            ]
          }
        },
        {
          icon: Landmark,
          name: 'COPUOS',
          topic: 'Comisión Histórica',
          description: 'Commission on the Peaceful Uses of Outer Space.',
          problematica: 'The 21st century space race: Delegations like the United States, China, Russia and India are sending rockets to the Moon, Mars and beyond. They also want to extract resources like water, minerals and precious metals from the Moon and asteroids. But who has the right to exploit these resources? Should they be for all humanity or only for the delegations that get there first? How do we avoid wars in space?',
          documentUrl: 'https://docs.google.com/document/d/1r5PdUOu3EruEkbUnrgpRRoBrGdrB0s0N/edit?usp=sharing&ouid=117366139924779115759&rtpof=true&sd=true',
          members: {
            grupo: 'Cuarto y Quinto',
            presidente: 'Maria Jose Restrepo (5B)',
            secretarioPiso: '',
            delegaciones: [
              { delegacion: 'Estados Unidos de America — Lidera exploracion espacial, satelites y cooperacion internacional.', delegado: 'Luciana Duarte', curso: '5B' },
              { delegacion: 'Republica Popular China — Gran crecimiento espacial y competencia tecnologica.', delegado: 'Joshua Ramirez', curso: '5B' },
              { delegacion: 'Federacion de Rusia — Potencia historica con gran experiencia orbital.', delegado: 'Juan Martin Moreno', curso: '5B' },
              { delegacion: 'Republica de la India — Referente emergente por sus misiones economicas y exitosas.', delegado: 'Juliana Melo Inger', curso: '4B' },
              { delegacion: 'Japon — Innovacion cientifica y tecnologica espacial.', delegado: 'Ambar Alana Rondon', curso: '4B' },
              { delegacion: 'Republica Francesa — Actor clave de la politica espacial europea.', delegado: 'Mathias Duran Lyons', curso: '4B' },
              { delegacion: 'Republica Federal de Alemania — Investigacion aeroespacial avanzada.', delegado: 'Emma Martinez Bonilla', curso: '4A' },
              { delegacion: 'Reino Unido de Gran Bretana e Irlanda del Norte — Desarrollo satelital y regulacion espacial.', delegado: 'Ignacio Atoche', curso: '5B' },
              { delegacion: 'Agencia Espacial Europea — Coordinacion espacial multinacional.', delegado: 'Maria Jose Gallo Alvarez', curso: '4A' },
              { delegacion: 'Republica Italiana — Importante participacion en tecnologia espacial.', delegado: 'Juan Jose Rojas', curso: '5A' },
              { delegacion: 'Republica Federativa del Brasil — Principal programa espacial latinoamericano.', delegado: 'Luciana Gil Rivera', curso: '4A' },
              { delegacion: 'Republica Argentina — Desarrollo satelital cientifico destacado.', delegado: 'Simon Albornoz', curso: '4B' },
              { delegacion: 'Estados Unidos Mexicanos — Telecomunicaciones y cooperacion espacial.', delegado: 'Juan Esteban Vaquero', curso: '5A' },
              { delegacion: 'Republica de Corea — Rapido crecimiento tecnologico espacial.', delegado: 'Luna Garcia', curso: '5A' },
              { delegacion: 'Emiratos Arabes Unidos — Programa moderno con misiones interplanetarias.', delegado: 'Esteban Jimenez', curso: '5A' },
              { delegacion: 'Canada — Cooperacion cientifica y robotica espacial.', delegado: 'Ana Cadena Sanchez', curso: '4B' },
              { delegacion: 'Commonwealth de Australia — Expansion reciente de su industria espacial', delegado: 'Belen Barajas', curso: '4B' },
              { delegacion: 'Republica Popular Democratica de Corea — Controversias sobre lanzamientos espaciales.', delegado: 'Luis David Pizarro', curso: '5B' },
              { delegacion: 'Reino de Espana — Investigacion y cooperacion espacial europea.', delegado: 'Esteban Quintero Caicedo', curso: '4A' },
              { delegacion: 'Reino de Noruega — Desarrollo de satelites climaticos y maritimos.', delegado: 'Antonia Rios', curso: '5A' },
              { delegacion: 'Confederacion Suiza — Innovacion tecnologica y diplomacia cientifica.', delegado: 'Sarah Jordan', curso: '5A' }
            ]
          }
        }
      ]
    },
    {
      categoria: 'Humanitarias',
      categoryIcon: '/Humanitarias.PNG',
      cardGradient: 'from-white via-white to-blue-100/55 border-blue-200/60',
      cards: [
        {
          icon: Heart,
          name: 'UNCCP',
          topic: 'Comisión Humanitaria',
          description: 'Comisión de Conciliación para Palestina.',
          problematica: 'Después de la guerra entre Estados Unidos e Irán (2026) y la escalada del conflicto Israel-Palestina: ¿Cómo garantizar el derecho al retorno de los refugiados palestinos, la reconstrucción de Gaza y la soberanía de ambos pueblos, cuando la comunidad internacional está dividida y la crisis humanitaria se agrava?',
          documentUrl: 'https://docs.google.com/document/d/1cSnbMw3j5UmwIirgIkJzLXpeFsbvSC25/edit?usp=sharing&ouid=117366139924779115759&rtpof=true&sd=true',
          members: {
            grupo: 'Octavo y Noveno',
            presidente: 'Daniel Cortes 8C',
            secretarioPiso: '',
            delegaciones: [
              { delegacion: 'Estados Unidos', delegado: 'José Manuel Marulanda', curso: '9B' },
              { delegacion: 'Israel' },
              { delegacion: 'Alemania' },
              { delegacion: 'Palestina', delegado: 'María Paula Montañez González', curso: '8B' },
              { delegacion: 'Reino Unido', delegado: 'Juanita Lastra', curso: '9A' },
              { delegacion: 'Hungría', delegado: 'Luciana Romero Mendoza', curso: '8B' },
              { delegacion: 'Austria', delegado: 'Alicia Maria Ortiz Izaquita', curso: '9B' },
              { delegacion: 'Canadá', delegado: 'Hugo Lara Blanco', curso: '8B' },
              { delegacion: 'China' },
              { delegacion: 'Rusia' },
              { delegacion: 'Irán' },
              { delegacion: 'Arabia Saudita', curso: '9A' },
              { delegacion: 'Egipto' },
              { delegacion: 'Jordania' },
              { delegacion: 'Qatar' },
              { delegacion: 'Emiratos Árabes Unidos', curso: '9B' },
              { delegacion: 'Sudáfrica' },
              { delegacion: 'Turquía', curso: '9B' },
              { delegacion: 'Brasil', delegado: 'Lucciana Salazar Caipa', curso: '9B' },
              { delegacion: 'Francia', delegado: 'Federico Ibañez Rueda', curso: '9B' },
              { delegacion: 'España', delegado: 'Nicolle Mariana Rojas Oliveros', curso: '8C' },
              { delegacion: 'Irlanda', delegado: 'Samuel Mathias Rodríguez Rodríguez', curso: '8C' },
              { delegacion: 'Bélgica' },
              { delegacion: 'Noruega', delegado: 'Hector Fonegra', curso: '9A' },
              { delegacion: 'Eslovenia' }
            ]
          }
        },
        {
          icon: Heart,
          name: 'CDH',
          topic: 'Comisión Humanitaria',
          description: 'Comisión de Derechos Humanos de las Naciones Unidas.',
          problematica: 'Protección de civiles en contextos de guerra y represión: Desplazamiento forzado, acceso a ayuda humanitaria y responsabilidad internacional frente a las violaciones de derechos humanos en la guerra EE.UU.-Irán (2026), el conflicto Israel-Palestina y las crisis internas en Sudán y Eritrea.',
          documentUrl: 'https://docs.google.com/document/d/1UdbUP5fLtPqNoKRSXcBrRu0BYuCyiqDH/edit?usp=sharing&ouid=117366139924779115759&rtpof=true&sd=true',
          members: {
            grupo: 'Octavo y Noveno',
            presidente: 'Mariana Medina 11A',
            secretarioPiso: '',
            delegaciones: [
              { delegacion: 'Estados Unidos', delegado: 'Sofia Maria Vargas', curso: '8A' },
              { delegacion: 'Reino Unido', delegado: 'Valery Salomé López Isaza', curso: '8C' },
              { delegacion: 'Francia', delegado: 'Isabella Cortes', curso: '8A' },
              { delegacion: 'Alemania', delegado: 'Ana Lucia Rojas Palacio', curso: '9B' },
              { delegacion: 'España', delegado: 'Martin Salazar', curso: '9A' },
              { delegacion: 'Italia', delegado: 'Maria Alejandra Dueñas', curso: '9A' },
              { delegacion: 'Paises Bajos', delegado: 'Juliana Villada Segura', curso: '8B' },
              { delegacion: 'República Checa' },
              { delegacion: 'Albania' },
              { delegacion: 'Japón', delegado: 'Niño de Noveno' },
              { delegacion: 'Islandia' },
              { delegacion: 'Corea del Sur', delegado: 'Valeria Colmenares Fonseca', curso: '8B' },
              { delegacion: 'China' },
              { delegacion: 'Rusia' },
              { delegacion: 'Irán' },
              { delegacion: 'Sudán' },
              { delegacion: 'Egipto' },
              { delegacion: 'Argelia' },
              { delegacion: 'Qatar' },
              { delegacion: 'Pakistán' },
              { delegacion: 'Cuba' },
              { delegacion: 'Sudáfrica' },
              { delegacion: 'Eritrea' },
              { delegacion: 'Vietnam' },
              { delegacion: 'India' }
            ]
          }
        },
        {
          icon: Heart,
          name: 'CED',
          topic: 'Comisión Humanitaria',
          description: 'Comité contra la Desaparición Forzada de la ONU.',
          problematica: 'Crisis global de desapariciones forzadas: Violencia institucional en México, militarización en Ecuador, crisis migratoria en Europa y la persistencia de fosas clandestinas. ¿Cómo puede la comunidad internacional garantizar el derecho a la verdad, la justicia y la reparación para las víctimas y sus familias cuando los Estados niegan, ocultan o minimizan la magnitud del problema?',
          documentUrl: 'https://docs.google.com/document/d/1fvOOAfSaRLINhWLlvBOiimgRHuk1ICyV/edit?usp=sharing&ouid=117366139924779115759&rtpof=true&sd=true',
          members: {
            grupo: 'Decimo - Once - Invitados',
            presidente: 'Isabella Montufar 10A',
            secretarioPiso: '',
            delegaciones: [
              { delegacion: 'Colombia' },
              { delegacion: 'Ecuador' },
              { delegacion: 'Sudán' },
              { delegacion: 'México', delegado: 'Juliana Mengual Roa', curso: '10A' },
              { delegacion: 'Argentina' },
              { delegacion: 'Uruguay' },
              { delegacion: 'España' },
              { delegacion: 'Francia' },
              { delegacion: 'Bélgica' },
              { delegacion: 'Chile' },
              { delegacion: 'Palestina' },
              { delegacion: 'Perú' },
              { delegacion: 'Panamá' },
              { delegacion: 'China', delegado: 'Gabriela Ortiz', curso: '11B' },
              { delegacion: 'Estados Unidos', delegado: 'María Fernanda Oyuela', curso: '11B' },
              { delegacion: 'Rusia', delegado: 'Gabriela Ortega', curso: '11A' },
              { delegacion: 'Irán' },
              { delegacion: 'Cuba' },
              { delegacion: 'Venezuela' },
              { delegacion: 'Nicaragua' },
              { delegacion: 'Irak' },
              { delegacion: 'Eritrea' },
              { delegacion: 'Siria' },
              { delegacion: 'Egipto' },
              { delegacion: 'Turquía' }
            ]
          }
        }
      ]
    },
    {
      categoria: 'Políticas',
      categoryIcon: '/Políticas.PNG',
      cardGradient: 'from-white via-white to-rose-100/55 border-rose-200/60',
      cards: [
        {
          icon: Building2,
          name: 'CCPCJ',
          topic: 'Comisión Política',
          description: 'Comisión de las Naciones Unidas sobre prevención del delito y justicia penal.',
          problematica: 'Centros de estafa que esclavizan personas (scam centres), tráfico de drogas y ciberdelitos. ¿Cómo puede la comunidad internacional cooperar para proteger a las víctimas, perseguir a los criminales y prevenir que más personas caigan en estas redes?',
          documentUrl: 'https://docs.google.com/document/d/1cGze_M2dU9VY6VHCGsqY9GmuYaY7d73R/edit?usp=sharing&ouid=117366139924779115759&rtpof=true&sd=true',
          members: {
            grupo: 'Octavo y Noveno',
            presidente: 'Gabriela Zabaleta 8C',
            secretarioPiso: '',
            delegaciones: [
              { delegacion: 'Colombia', delegado: 'Isabella Restrepo', curso: '9B' },
              { delegacion: 'Rusia', delegado: 'Manuela Díaz', curso: '8B' },
              { delegacion: 'Estados Unidos', delegado: 'José Manuel Marulanda', curso: '9B' },
              { delegacion: 'México', delegado: 'Juan Manuel Barón', curso: '8A' },
              { delegacion: 'Argentina', delegado: 'Martina Duque', curso: '8A' },
              { delegacion: 'Brasil', delegado: 'Luciana Ramirez Garzon', curso: '8A' },
              { delegacion: 'Irán' },
              { delegacion: 'China', delegado: 'María José Hernández Rocha', curso: '8C' },
              { delegacion: 'Ucrania', delegado: 'Daniela García Gutiérrez', curso: '8C' },
              { delegacion: 'Palestina' },
              { delegacion: 'Israel' },
              { delegacion: 'Venezuela', delegado: 'Gabriela More Sánchez', curso: '8C' },
              { delegacion: 'El Salvador', delegado: 'Isabella Cáceres Martínez' },
              { delegacion: 'Cuba', delegado: 'David Santiago Penagos', curso: '8A' },
              { delegacion: 'Arabia Saudita', delegado: 'Gabriela Fandiño', curso: '9A' }
            ]
          }
        },
        {
          icon: Building2,
          name: 'Security council',
          topic: 'Comisión Política',
          description: 'Commission responsible for maintaining international peace and security.',
          problematica: 'Gaza under fire: The Security Council has not achieved a permanent ceasefire for three years. Hospitals are collapsing, water is scarce, and children are dying of hunger. What can the Council do when permanent members (USA and UK vs. China and Russia) block each other with the veto?',
          documentUrl: 'https://docs.google.com/document/d/1-I1pisH-O_rrf3GIJ-sW4u_OH7sYF0PQ/edit?usp=sharing&ouid=117366139924779115759&rtpof=true&sd=true',
          members: {
            grupo: 'Octavo y Noveno',
            presidente: 'María José Berbesí 8C',
            secretarioPiso: '',
            delegaciones: [
              { delegacion: 'China', delegado: 'Daniela Almanza Ortiz', curso: '8B' },
              { delegacion: 'Francia', delegado: 'Manuela Paniagua', curso: '8B' },
              { delegacion: 'Rusia', delegado: 'Gabriela Murcia', curso: '8A' },
              { delegacion: 'Reino Unido de Gran Bretaña e Irlanda del Norte', delegado: 'Juan Esteban Atoche', curso: '8B' },
              { delegacion: 'Estados Unidos', delegado: 'Brihanna Hernández', curso: '8A' },
              { delegacion: 'Colombia' },
              { delegacion: 'Bahréin' },
              { delegacion: 'Letonia' },
              { delegacion: 'Liberia' },
              { delegacion: 'Congo' },
              { delegacion: 'Dinamarca', delegado: 'Martin García Chiriví', curso: '9A' },
              { delegacion: 'República Helenica', delegado: 'Alejandro Beleño Suárez', curso: '8B' },
              { delegacion: 'Pakistán', delegado: 'Paloma Inés Vargas Fernández', curso: '8B' },
              { delegacion: 'Panamá', delegado: 'María Isabella Mantilla Yunda', curso: '8B' },
              { delegacion: 'Somalia' }
            ]
          }
        },
        {
          icon: Building2,
          name: 'Senado de la república',
          topic: 'Comisión Política',
          description: 'Descarbonización vs. Estabilidad Fiscal.',
          problematica: 'Descarbonización vs. Estabilidad Fiscal: Definir el ritmo de la transición energética sin asfixiar los ingresos fiscales del país que dependen del petróleo y el carbón.',
          documentUrl: 'https://docs.google.com/document/d/1ran_soBWqIu9HgeoLl3M0HDJ3aCjFIvj/edit?usp=sharing&ouid=117366139924779115759&rtpof=true&sd=true',
          members: {
            grupo: 'Decimo y Undecimo',
            presidente: 'Juanita Reyes 10B',
            secretarioPiso: '',
            delegaciones: [
              { delegacion: 'Aida Yolanda Avella Esquivel (Pacto Histórico)' },
              { delegacion: 'Carlos Alberto Benavides Mora (Pacto Histórico)', delegado: 'Andres Felipe Castro', curso: '10B' },
              { delegacion: 'María José Pizarro (Pacto Histórico)', delegado: 'Violeta Montoya', curso: '11A' },
              { delegacion: 'Sandra Claudia Chindoy Jamioy (Pacto Histórico)' },
              { delegacion: 'Claudia Margarita Zuleta (Centro Democratico)', delegado: 'Luciana López Cifuentes', curso: '10A' },
              { delegacion: 'Andrés Eduardo Forero Molina (Centro Democrático)', delegado: 'Miguel Ángel Díaz Suárez', curso: '10A' },
              { delegacion: 'Claudia Margarita Zuleta (Centro Democrático)' },
              { delegacion: 'Enrique Cabrales Baquero (Centro Democrático)' },
              { delegacion: 'Rafael Nieto (centro democratico)' },
              { delegacion: 'Edgardo Miguel Espitia Cabrales(Cambio Radical)', delegado: 'Sarah Pardo', curso: '11A' },
              { delegacion: 'Nadya Georgette Blel Scaff (Partido Conservador)' },
              { delegacion: 'José Nicolás Gómez Medina(Cambio Radical)' },
              { delegacion: 'Jonathan Ferney Pulido Hernández (Alianza Verde)' },
              { delegacion: 'Carlos Alberto Benavides Mora (Pacto Histórico)', delegado: 'Thomas Morales', curso: '11b' },
              { delegacion: 'Ariel Ávila (Alianza Verde)' },
              { delegacion: 'Enrique Gómez (Salvación Nacional)', delegado: 'Jeronimo Ramirez', curso: '10B' },
              { delegacion: 'Ana Paola Agudelo (Partido Mira)' },
              { delegacion: 'Edgardo Miguel Espitia Cabrales (Cambio Radical)' },
              { delegacion: 'Lidio Arturo García Turbay (Partido Liberal)', curso: '11A' },
              { delegacion: 'Andrea Padilla Villarraga (Alianza Verde)' },
              { delegacion: 'Lidio Arturo García Turbay (Partido Liberal)' },
              { delegacion: 'Fabio Raúl Amín Saleme(Partido Liberal)' },
              { delegacion: 'Wadith Alberto Manzur Imbett (Partido Conservador)', delegado: 'Andres Felipe Pachón', curso: '10B' },
              { delegacion: 'David Alejandro Barguil Assis (Partido Conservador)' }
            ]
          }
        }
      ]
    },
    {
      categoria: 'Transversales',
      categoryIcon: '/Transversales.PNG',
      cardGradient: 'from-white via-white to-pink-100/70 border-pink-200/70',
      cards: [
        {
          icon: Globe,
          name: 'UNODC',
          topic: 'Comisión Transversal',
          description: 'Drugs and Crime.',
          problematica: 'Drug trafficking in the Americas: Record cocaine production in the Andean region, stable demand in North America and Europe, and transit routes through Central and South America. How can the international community balance the fight against drug cartels with human rights, public health, and the livelihoods of farming and indigenous communities? Should the international community prioritize forced eradication of crops, voluntary substitution with alternative development, criminal prosecution of cartels, or reducing demand in consumer countries? What works and what does not?',
          documentUrl: 'https://docs.google.com/document/d/1JE6VlqiBB06OdG3VrLPvBkO3oEnC1ImG/edit?usp=sharing&ouid=117366139924779115759&rtpof=true&sd=true',
          members: {
            grupo: 'Noveno, Décimo y Once',
            presidente: 'Paula Alejandra Pinzón 10A',
            secretarioPiso: '',
            delegaciones: [
              { delegacion: 'Republic of Colombia', delegado: 'Federico García Castañeda', curso: '9B' },
              { delegacion: 'United Mexican States', delegado: 'Carla Grimaldo', curso: '9A' },
              { delegacion: 'United States of America', delegado: 'Santiago Andres Castro', curso: '9A' },
              { delegacion: 'Drug Enforcement Administration (DEA)', delegado: 'Mariana Rey', curso: '9A' },
              { delegacion: 'Canada' },
              { delegacion: 'Plurinational State of Bolivia' },
              { delegacion: 'Bolivarian Republic of Venezuela' },
              { delegacion: 'Republic of Ecuador' },
              { delegacion: 'Monica Juma (Director of the UNODC)', delegado: 'Ana Maria Ramirez', curso: '10B' },
              { delegacion: 'Republic of Peru' },
              { delegacion: 'Argentine Republic', delegado: 'Paula Sierra', curso: '11A' },
              { delegacion: 'Federative Republic of Brasil' },
              { delegacion: 'INTERPOL', delegado: 'Juan Esteban Murcia', curso: '9A' }
            ]
          }
        },
        {
          icon: Globe,
          name: 'WHO',
          topic: 'Comisión Transversal',
          description: 'World Health Organization.',
          problematica: 'Health in the age of misinformation: In May 2026, the World Health Assembly declared that misinformation is a global public health emergency. Platforms like TikTok, X, Google and Meta are the main channels for spreading medical falsehoods. Should these companies be regulated as actors in the health system, with legal and ethical responsibilities similar to those of the pharmaceutical industry?',
          documentUrl: 'https://docs.google.com/document/d/1QdueCSLXVpR4dzye6M_IkZjP9niN8qxM/edit?usp=sharing&ouid=117366139924779115759&rtpof=true&sd=true',
          members: {
            grupo: 'Sexto y Séptimo',
            presidente: 'Julieta Rodríguez Mogollón 7A',
            secretarioPiso: '',
            delegaciones: [
              { delegacion: 'SHEIN', delegado: 'Valentina Hernández Moreno', curso: '7B' },
              { delegacion: 'ByteDance (TikTok)', delegado: 'Sara Laguna Rojas', curso: '7A' },
              { delegacion: 'Google LLC', delegado: 'Maria José Gómez Guzmán', curso: '7A' },
              { delegacion: 'Meta', delegado: 'Maria José López Varón', curso: '7A' },
              { delegacion: 'X Corp.', delegado: 'Juan Felpe Cano Álvarez', curso: '7A' },
              { delegacion: "People's Republic of China", delegado: 'Sarah Escamilla Velásquez', curso: '7B' },
              { delegacion: 'United States of America', delegado: 'Isabel Lucía Vargas de la Hoz', curso: '6' },
              { delegacion: 'Donald Trump', delegado: 'Diana Sofía Salcedo', curso: '7B' },
              { delegacion: 'Republic of India', delegado: 'Maria Valentina Saenz Osorio', curso: '7A' },
              { delegacion: 'Kuaishou Technology', delegado: 'Amelia Isabel Morales Calcurian', curso: '7B' },
              { delegacion: 'United Mexican States', delegado: 'Valerie Torres Forero', curso: '6' },
              { delegacion: 'Republic of Brasil', delegado: 'Natalia García Reina', curso: '7B' },
              { delegacion: 'Xingyin Information Technology (RedNote)', delegado: 'Carolina Salcedo Illidge', curso: '7A' },
              { delegacion: 'António Costa (Presidente del Consejo Europeo)', delegado: 'Mariana Huertas Nieto', curso: '6' }
            ]
          }
        },
        {
          icon: Globe,
          name: 'Zootopia',
          topic: 'Comisión Transversal',
          description: 'Comisión para la Protección y el Buen Trato de los Animales.',
          problematica: 'Comisión relacionada con el maltrato animal.',
          documentUrl: 'https://docs.google.com/document/d/13cuR-FYmKLnkuA9huz0PGWE3W9GMGEgH/edit?usp=sharing&ouid=117366139924779115759&rtpof=true&sd=true',
          members: {
            grupo: 'Cuarto y Quinto',
            presidente: 'María Víctoria Galindo 5B',
            secretarioPiso: '',
            delegaciones: [
              { delegacion: 'Judy Hopps', delegado: 'Ana Lucía Martínez Triana', curso: '4B' },
              { delegacion: 'Nick Wilde', delegado: 'Silvana Gonzales', curso: '5B' },
              { delegacion: 'Jefe Bogo', delegado: 'Maria Gabriela Gonzales', curso: '5B' },
              { delegacion: 'Policía de Zootopia', delegado: 'Ana María Alzate', curso: '5B' },
              { delegacion: 'Bellwether', delegado: 'Luciana Isabel Chaparro', curso: '5B' },
              { delegacion: 'Alcalde Leónzales', delegado: 'Luis Felipe Andrade Mendoza', curso: '4A' },
              { delegacion: 'Mr. Big', delegado: 'Daniel Matías Lozano Chaves', curso: '4A' },
              { delegacion: 'Pawbert Linxley', delegado: 'David Santiago Ávila', curso: '4B' },
              { delegacion: 'Milton Linxley', delegado: 'Juan José Alayan Varela', curso: '4B' },
              { delegacion: "Gary De'Snake", delegado: 'María Antonia Gonzalez', curso: '4B' },
              { delegacion: 'Flash Slothmore', delegado: 'Ana Victoria Perez', curso: '5B' },
              { delegacion: 'Gazelle', delegado: 'Ana Valentina Gómez Vargas', curso: '4A' },
              { delegacion: 'Señor Garraza', delegado: 'Charlotte Lizarazo', curso: '4B' },
              { delegacion: 'Nibbles Maplestick', delegado: 'Gabriela Vargas Cano', curso: '4A' },
              { delegacion: 'Clawhauser' },
              { delegacion: 'Duke weaselton', delegado: 'Lucciana Carrillo', curso: '5A' },
              { delegacion: 'Gideon Grey', delegado: 'Emilia Nieto', curso: '5A' },
              { delegacion: 'Mrs. Otterton', delegado: 'Maria Paula Rojas', curso: '5A' },
              { delegacion: 'Fru Fru', delegado: 'Juliana Velasquez', curso: '5A' }
            ]
          }
        }
      ]
    }
  ];

  useEffect(() => {
    const categoriaFromQuery = new URLSearchParams(location.search).get('categoria');
    const comisionFromQuery = new URLSearchParams(location.search).get('comision');
    if (!categoriaFromQuery && !comisionFromQuery) return;

    const matchesComisionQuery = (card: CommissionCard, query: string) => {
      const normalizedQuery = normalizeText(query);
      const normalizedName = normalizeText(card.name);
      const normalizedDescription = normalizeText(card.description);

      return (
        normalizedName === normalizedQuery ||
        normalizedDescription === normalizedQuery ||
        normalizedName.includes(normalizedQuery) ||
        normalizedDescription.includes(normalizedQuery)
      );
    };

    const match = categoriaFromQuery
      ? categorias.find((item) => normalizeText(item.categoria) === normalizeText(categoriaFromQuery))
      : categorias.find((item) => item.cards.some((card) => matchesComisionQuery(card, comisionFromQuery || '')));
    if (!match) return;

    const cardFromQuery = comisionFromQuery
      ? match.cards.find((card) => matchesComisionQuery(card, comisionFromQuery))
      : null;

    setOpenCategoria(match.categoria);
    setSelectedCard(cardFromQuery ? { ...cardFromQuery, categoryIconPath: match.categoryIcon, categoryName: match.categoria } : null);
    setCardView('informacion');

    requestAnimationFrame(() => {
      const triggerElement = document.getElementById(categoryTriggerId(match.categoria));
      if (!triggerElement) return;

      const navOffset = 88;
      const top = triggerElement.getBoundingClientRect().top + window.scrollY - navOffset;
      window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
    });
  }, [location.search]);

  return (
    <section id="comisiones" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-dm-serif-display text-5xl sm:text-6xl font-bold text-teremun-dark mb-4">
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
              id={categoryAnchorId(item.categoria)}
              className="rounded-xl bg-transparent"
            >
              <button
                id={categoryTriggerId(item.categoria)}
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
                  <div className="w-14 h-14 flex items-center justify-center">
                    <img
                      src={item.categoryIcon}
                      alt={item.categoria}
                      className="w-full h-full object-contain"
                    />
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
                          onClick={() => {
                            setSelectedCard({ ...card, categoryIconPath: item.categoryIcon, categoryName: item.categoria });
                            setCardView('informacion');
                          }}
                          className={`w-full text-left bg-gradient-to-br ${item.cardGradient} rounded-xl border p-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-1`}
                        >
                          <div className="flex items-start gap-4">
                            <div className={`w-14 h-14 rounded-lg flex items-center justify-center flex-shrink-0 p-1 ${getCardIconBgClass(item.categoria)}`}>
                              <img
                                src={item.categoryIcon}
                                alt={item.categoria}
                                className="w-[88%] h-[88%] object-contain brightness-0 invert"
                              />
                            </div>
                            <div className="flex-1">
                              <h4 className="text-2xl font-bold text-teremun-dark mb-2">
                                {card.name}
                              </h4>
                              <p className="text-teremun-gold font-semibold mb-3">
                                {card.topic}
                              </p>
                              {isEnglishCommission(card) && (
                                <div className="mb-3">
                                  <span className="inline-flex items-center rounded-full border border-sky-200 bg-sky-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-sky-700">
                                    English Comission
                                  </span>
                                </div>
                              )}
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
            className="fixed inset-0 z-50 bg-teremun-dark/45 flex items-center justify-center px-4 animate-overlay-soft-in"
            onClick={() => setSelectedCard(null)}
          >
            <div
              className="w-full max-w-2xl max-h-[85vh] bg-white rounded-2xl shadow-2xl border border-teremun-burgundy/20 p-6 sm:p-8 overflow-y-auto overscroll-y-contain animate-modal-soft-pop"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex items-start gap-4">
                  {selectedCard.categoryIconPath ? (
                    <div className={`w-14 h-14 rounded-lg flex items-center justify-center flex-shrink-0 p-2 ${getCardIconBgClass(selectedCard.categoryName)}`}>
                      <img
                        src={selectedCard.categoryIconPath}
                        alt={selectedCard.topic}
                        className="w-full h-full object-contain brightness-0 invert"
                      />
                    </div>
                  ) : (
                    <div className="w-14 h-14 bg-teremun-burgundy rounded-lg flex items-center justify-center flex-shrink-0">
                      <selectedCard.icon className="text-white" size={28} />
                    </div>
                  )}
                  <div>
                    <h3 className="text-2xl font-bold text-teremun-dark">{selectedCard.name}</h3>
                    <p className="text-teremun-gold font-semibold">{selectedCard.topic}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {isEnglishCommission(selectedCard) && (
                    <span className="inline-flex items-center rounded-full border border-sky-200 bg-sky-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-sky-700">
                      English Comission
                    </span>
                  )}
                  <button
                    onClick={() => setSelectedCard(null)}
                    className="p-2 rounded-lg text-teremun-mahogany hover:bg-teremun-blush/40 transition-colors"
                    aria-label="Cerrar ficha"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>

              <div className="space-y-3 text-teremun-mahogany">
                <div className="inline-flex rounded-xl p-1 bg-teremun-blush/40 border border-teremun-burgundy/15 mb-2">
                  <button
                    type="button"
                    onClick={() => setCardView('informacion')}
                    className={`px-4 py-2 text-sm font-semibold rounded-lg transition-colors ${cardView === 'informacion' ? 'bg-white text-teremun-burgundy shadow-sm' : 'text-teremun-mahogany hover:text-teremun-dark'}`}
                  >
                    Información
                  </button>
                  <button
                    type="button"
                    onClick={() => setCardView('miembros')}
                    className={`px-4 py-2 text-sm font-semibold rounded-lg transition-colors ${cardView === 'miembros' ? 'bg-white text-teremun-burgundy shadow-sm' : 'text-teremun-mahogany hover:text-teremun-dark'}`}
                  >
                    Miembros
                  </button>
                </div>

                {cardView === 'informacion' ? (
                  <>
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
                  </>
                ) : selectedCard.members ? (
                  <div className="rounded-xl border border-teremun-burgundy/20 overflow-hidden">
                    <div className="bg-teremun-blush/40 px-4 py-2 font-semibold text-teremun-dark">
                      {selectedCard.members.grupo}
                    </div>
                    <div className="px-4 py-2 border-t border-teremun-burgundy/20 text-sm">
                      <span className="font-semibold text-teremun-dark">Presidente:</span>{' '}
                      <button
                        type="button"
                        onClick={() => handlePresidentNavigation(selectedCard.members.presidente)}
                        className="font-medium text-teremun-burgundy underline decoration-teremun-burgundy/50 underline-offset-2 hover:text-teremun-dark hover:decoration-teremun-dark transition-colors"
                      >
                        {selectedCard.members.presidente}
                      </button>
                    </div>
                    <div className="px-4 py-2 border-t border-teremun-burgundy/20 text-sm">
                      <span className="font-semibold text-teremun-dark">Secretario de piso:</span> {selectedCard.members.secretarioPiso ? ` ${selectedCard.members.secretarioPiso}` : ' -'}
                    </div>

                    <div className="border-t border-teremun-burgundy/20">
                      <table className="min-w-full text-sm">
                        <thead className="bg-teremun-blush/30 text-teremun-dark">
                          <tr>
                            <th className="px-4 py-2 text-left font-semibold">Delegación</th>
                            <th className="px-4 py-2 text-left font-semibold">Delegado</th>
                            <th className="px-4 py-2 text-left font-semibold">Curso</th>
                          </tr>
                        </thead>
                        <tbody>
                          {selectedCard.members.delegaciones.map((fila, index) => (
                            <tr key={`${fila.delegacion}-${index}`} className="border-t border-teremun-burgundy/15">
                              <td className="px-4 py-2">{fila.delegacion}</td>
                              <td className="px-4 py-2">{fila.delegado || '-'}</td>
                              <td className="px-4 py-2">{fila.curso || '-'}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ) : (
                  <p className="text-teremun-mahogany">Aún no hay información de miembros para esta comisión.</p>
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
