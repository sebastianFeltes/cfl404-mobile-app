/**
 * Mocks de datos oficiales para el CFL 404.
 * Fuente de verdad del modelo: docs/api-campos-lectura.md
 */

export interface UserDetail {
  id?: string;
  userId?: string;
  address: string | null;
  phone: string | null;
  dob: string | null; // ISO 8601 string
  extraPhone: string | null; // Contacto de emergencia
  extraEmail: string | null; // Email alternativo
  academicLevel: string | null;
  gender: string | null;
  nacionality: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface StudentUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  dni: string | null;
  role: string;
  roleId: number;
  statusId: number;
  status: string;
  emailVerified: boolean;
  profilePhotoUrl: string | null;
  locale?: string | null;
  lastLoginAt?: string | null;
  acceptedTerms?: boolean;
  type: string;
  detail: UserDetail;
}

export interface CourseItem {
  userCourseId: string;
  enrollmentDate: string;
  course: {
    id: string;
    name: string;
    statusId: number;
    status: {
      name: string;
    };
    startDate: string | null;
    endDate: string | null;
    startTime: string | null;
    endTime: string | null;
    isAnnual: boolean;
    maxAbsences: number;
    instructorId: string;
    instructor: {
      firstName: string;
      lastName: string;
    };
    courseDetail: {
      description: string | null;
      hourQuantity: number;
      classesQuantity: number;
      sponsorName: string | null;
      sponsorLogo: string | null;
    };
  };
  absenceCount: number;
  absenceLimit: number;
  attendanceSummary: {
    present: number;
    absent: number;
    late: number;
  };
  days: string[];
  classroom: string;
  notification: string | null;
}

export interface CourseNotification {
  id: string;
  courseId: string;
  courseName: string;
  title: string;
  message: string;
  date: string;
  type: 'operativo' | 'academico' | 'informativo';
}

export interface BenefitItem {
  id: string | number;
  nombre: string;
  rubro: string;
  direccion: string;
  descuento: string;
  descuentoDetalle: string;
  telefono: string; // WhatsApp sin +
  descripcion: string;
  catalogo?: string[];
  horario?: string;
}

/** Mock de usuario alumno basado en GET /api/auth/me */
export const MOCK_USER: StudentUser = {
  id: 'usr-404-001-cfl',
  firstName: 'Juan Manuel',
  lastName: 'Pérez',
  email: 'juan.perez@alumnos.cfl404.edu.ar',
  dni: '38.452.190',
  role: 'ALUMNO',
  roleId: 8,
  statusId: 1,
  status: 'Activo',
  emailVerified: true,
  profilePhotoUrl: null, // null renderiza avatar con iniciales 'JP'
  locale: 'es-AR',
  lastLoginAt: '2026-09-02T12:30:00.000Z',
  acceptedTerms: true,
  type: 'STUDENT',
  detail: {
    id: 'dtl-404-001',
    userId: 'usr-404-001-cfl',
    address: 'Calle 45 N° 820 e/ 11 y 12, La Plata',
    phone: '221-555-0192',
    dob: '1994-06-15T00:00:00.000Z',
    extraPhone: '221-555-0341 (María Gómez - Madre)',
    extraEmail: 'juanmperez94@gmail.com',
    academicLevel: 'Secundario completo',
    gender: 'Masculino',
    nacionality: 'Argentina',
    createdAt: '2026-03-01T10:00:00.000Z',
    updatedAt: '2026-08-20T15:45:00.000Z',
  },
};

/** Mock de cursos del alumno basado en GET /api/mobile/me/courses */
export const MOCK_CURSOS: CourseItem[] = [
  {
    userCourseId: 'uc-001',
    enrollmentDate: '2026-03-10T08:00:00.000Z',
    course: {
      id: 'cfl-curso-01',
      name: 'Programación de Apps Móviles',
      statusId: 1,
      status: { name: 'ACTIVO' },
      startDate: '2026-03-30',
      endDate: '2026-11-20',
      startTime: '14:00',
      endTime: '17:00',
      isAnnual: true,
      maxAbsences: 10,
      instructorId: 'inst-01',
      instructor: {
        firstName: 'Sebastián',
        lastName: 'Feltes',
      },
      courseDetail: {
        description: 'Desarrollo de aplicaciones nativas y multiplataforma con React Native y Expo SDK 54.',
        hourQuantity: 280,
        classesQuantity: 64,
        sponsorName: 'DGCyE Provincia de Buenos Aires',
        sponsorLogo: null,
      },
    },
    absenceCount: 2,
    absenceLimit: 10,
    attendanceSummary: {
      present: 22,
      absent: 2,
      late: 1,
    },
    days: ['Miércoles', 'Viernes'],
    classroom: 'Laboratorio de Informática 1',
    notification: 'Próxima entrega de proyecto final el 15/10',
  },
  {
    userCourseId: 'uc-002',
    enrollmentDate: '2026-03-12T09:00:00.000Z',
    course: {
      id: 'cfl-curso-02',
      name: 'Diseño UX/UI para Aplicaciones',
      statusId: 1,
      status: { name: 'ACTIVO' },
      startDate: '2026-04-07',
      endDate: '2026-10-30',
      startTime: '18:00',
      endTime: '21:00',
      isAnnual: false,
      maxAbsences: 8,
      instructorId: 'inst-02',
      instructor: {
        firstName: 'Mariana',
        lastName: 'López',
      },
      courseDetail: {
        description: 'Fundamentos de diseño centrado en el usuario, prototipado interactivo y sistemas de diseño.',
        hourQuantity: 160,
        classesQuantity: 36,
        sponsorName: 'CFL 404 Berisso',
        sponsorLogo: null,
      },
    },
    absenceCount: 1,
    absenceLimit: 8,
    attendanceSummary: {
      present: 18,
      absent: 1,
      late: 0,
    },
    days: ['Martes', 'Jueves'],
    classroom: 'Aula Taller 3',
    notification: null,
  },
  {
    userCourseId: 'uc-003',
    enrollmentDate: '2026-03-15T11:00:00.000Z',
    course: {
      id: 'cfl-curso-03',
      name: 'Electricidad Industrial y Automatización',
      statusId: 1,
      status: { name: 'ACTIVO' },
      startDate: '2026-03-25',
      endDate: '2026-11-28',
      startTime: '08:30',
      endTime: '12:30',
      isAnnual: true,
      maxAbsences: 12,
      instructorId: 'inst-03',
      instructor: {
        firstName: 'Carlos',
        lastName: 'Rodríguez',
      },
      courseDetail: {
        description: 'Instalaciones eléctricas trifásicas, tableros industriales y normas de seguridad laboral.',
        hourQuantity: 320,
        classesQuantity: 72,
        sponsorName: 'UOCRA / CFL 404',
        sponsorLogo: null,
      },
    },
    absenceCount: 3,
    absenceLimit: 12,
    attendanceSummary: {
      present: 26,
      absent: 3,
      late: 2,
    },
    days: ['Lunes', 'Miércoles'],
    classroom: 'Taller de Electricidad',
    notification: 'Traer elementos de protección personal (EPP)',
  },
];

/** Mock de notificaciones y avisos de cursada */
export const MOCK_NOTIFICACIONES: CourseNotification[] = [
  {
    id: 'notif-001',
    courseId: 'cfl-curso-01',
    courseName: 'Programación de Apps Móviles',
    title: 'Entrega de avance — Proyecto Final',
    message: 'Recuerden subir el repositorio con el flujo de navegación completo antes del viernes 23:59hs.',
    date: '2026-09-03T14:30:00.000Z',
    type: 'academico',
  },
  {
    id: 'notif-002',
    courseId: 'cfl-curso-01',
    courseName: 'Programación de Apps Móviles',
    title: 'Jornada Institucional Docente',
    message: 'El próximo viernes 11/09 no habrá actividades académicas presenciales por jornada pedagógica.',
    date: '2026-09-01T10:00:00.000Z',
    type: 'operativo',
  },
  {
    id: 'notif-003',
    courseId: 'cfl-curso-02',
    courseName: 'Diseño UX/UI para Aplicaciones',
    title: 'Material de lectura disponible',
    message: 'Se cargaron los lineamientos de accesibilidad móvil y heurísticas de Nielsen en la carpeta compartida.',
    date: '2026-08-28T16:15:00.000Z',
    type: 'academico',
  },
  {
    id: 'notif-004',
    courseId: 'cfl-curso-03',
    courseName: 'Electricidad Industrial y Automatización',
    title: 'Uso obligatorio de EPP',
    message: 'Para la práctica de cableado en tableros es indispensable ingresar con calzado dieléctrico y guantes.',
    date: '2026-08-25T09:20:00.000Z',
    type: 'operativo',
  },
];

/** Mock de comercios adheridos (Beneficios) basado en docs/api-campos-lectura.md */
export const MOCK_BENEFICIOS: BenefitItem[] = [
  {
    id: 1,
    nombre: 'MG Hogar y Electrodomésticos',
    rubro: 'Hogar y Tecnología',
    direccion: 'Av. Montevideo 1245, Berisso',
    descuento: '15% OFF',
    descuentoDetalle: '15% de descuento en electrodomésticos y tecnología abonando en efectivo o débito.',
    telefono: '5492215984123',
    descripcion: 'Venta de artículos para el hogar, informática, herramientas eléctricas y accesorios con garantía oficial.',
    catalogo: ['Electrodomésticos', 'Computación', 'Herramientas', 'Audio y TV'],
    horario: 'Lunes a Sábado de 9:00 a 19:30 hs',
  },
  {
    id: 2,
    nombre: 'Librería & Papelería Central',
    rubro: 'Librería y Fotocopias',
    direccion: 'Calle 8 e/ 166 y 167 N° 4520, Berisso',
    descuento: '20% OFF',
    descuentoDetalle: '20% en útiles escolares, cuadernos técnicos y 15% en impresiones/fotocopias.',
    telefono: '5492214432109',
    descripcion: 'Artículos escolares, universitarios, fotocopiadora y plastificados. Especialistas en material técnico para cursos del CFL.',
    catalogo: ['Útiles técnicos', 'Papelería', 'Fotocopias', 'Anillados'],
    horario: 'Lunes a Viernes de 8:00 a 18:00 hs',
  },
  {
    id: 3,
    nombre: 'Ferretería & Seguridad El Progreso',
    rubro: 'Ferretería y Herramientas',
    direccion: 'Av. Río de Janeiro 312, Berisso',
    descuento: '10% OFF',
    descuentoDetalle: '10% de descuento en herramientas manuales, eléctricas y elementos de protección personal (EPP).',
    telefono: '5492216789012',
    descripcion: 'Todo en ferretería industrial, electricidad, indumentaria de trabajo y calzados de seguridad homologados.',
    catalogo: ['Herramientas', 'Calzado de seguridad', 'Electricidad', 'Pinturas'],
    horario: 'Lunes a Viernes de 8:00 a 17:30 hs | Sábados de 8:00 a 13:00 hs',
  },
  {
    id: 4,
    nombre: 'Café & Pastelería Punto Encuentro',
    rubro: 'Gastronomía',
    direccion: 'Calle 11 N° 980, Berisso',
    descuento: '2x1',
    descuentoDetalle: '2x1 en café take-away y 15% de descuento en meriendas y almuerzos para alumnos.',
    telefono: '5492215123456',
    descripcion: 'Cafetería de especialidad, opciones para llevar, sándwiches artesanales y pastelería fresca todos los días.',
    catalogo: ['Café', 'Pastelería', 'Sándwiches', 'Menú del día'],
    horario: 'Lunes a Sábado de 7:30 a 20:00 hs',
  },
  {
    id: 5,
    nombre: 'Óptica y Centro Visual Berisso',
    rubro: 'Salud y Óptica',
    direccion: 'Av. Génova 1520, Berisso',
    descuento: '25% OFF',
    descuentoDetalle: '25% en cristales graduados y 15% en armazones recetados presentando credencial regular.',
    telefono: '5492214890987',
    descripcion: 'Atención personalizada, control visual, armazones de diseño y lentes de seguridad para trabajos técnicos.',
    catalogo: ['Lentes recetados', 'Lentes de sol', 'Lentes de seguridad', 'Líquidos de contacto'],
    horario: 'Lunes a Viernes de 9:00 a 18:00 hs',
  },
];
