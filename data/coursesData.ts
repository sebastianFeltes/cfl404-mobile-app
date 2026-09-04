/**
 * Datos y tipos de cursos para el alumno - CFL 404
 * Alineados con docs/api-campos-lectura.md y docs/producto.md
 */

export interface AttendanceRecord {
  id: string;
  date: string; // ISO o formato DD/MM/AAAA
  codeId?: number;
  codeName: 'presente' | 'ausente' | 'tarde' | 'media falta' | 'justificado' | 'feriado';
  countsAsAbsence: boolean;
  note?: string;
}

export interface CourseNotification {
  id: string;
  title: string;
  message: string;
  date: string;
  type: 'info' | 'alerta' | 'recordatorio';
}

export interface Course {
  id: string;
  name: string;
  statusId: number;
  statusName: 'ACTIVO' | 'FINALIZADO' | 'PENDIENTE';
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  days: string[];
  classroom: string;
  instructor: {
    firstName: string;
    lastName: string;
    email: string;
    profilePhotoUrl?: string;
  };
  hourQuantity: number;
  classesQuantity: number;
  sponsorName?: string;
  sponsorLogo?: string;
  quota: number;
  endorsementBy?: string;
  description: string;
  whatsappGroupUrl: string;
  resourcesUrl: string;
  maxAbsences: number;
  absenceCount: number;
  attendanceHistory: AttendanceRecord[];
  notifications: CourseNotification[];
}

export interface StudentProfile {
  id: string;
  firstName: string;
  lastName: string;
  dni: string;
  email: string;
  role: 'ALUMNO';
  status: 'Activo';
  profilePhotoUrl: string | null;
  cycleLabel: string;
  institution: string;
}

export const currentStudent: StudentProfile = {
  id: 'usr-alu-404-001',
  firstName: 'Juan',
  lastName: 'Pérez',
  dni: '40.123.456',
  email: 'juan.perez@alumnos.cfl404.edu.ar',
  role: 'ALUMNO',
  status: 'Activo',
  profilePhotoUrl: null,
  cycleLabel: 'Ciclo Lectivo 2026',
  institution: 'Centro de Formación Laboral N.º 404 Berisso',
};

export const mockCourses: Course[] = [
  {
    id: 'desarrollo-apps-moviles',
    name: 'Desarrollo de Aplicaciones Móviles',
    statusId: 1,
    statusName: 'ACTIVO',
    startDate: '09/03/2026',
    endDate: '27/11/2026',
    startTime: '18:00',
    endTime: '21:30',
    days: ['Martes', 'Jueves'],
    classroom: 'Aula Taller 3 — Laboratorio Informática',
    instructor: {
      firstName: 'Sebastián',
      lastName: 'Feltes',
      email: 'docente.feltes@cfl404.edu.ar',
    },
    hourQuantity: 180,
    classesQuantity: 60,
    sponsorName: 'Dirección General de Cultura y Educación (DGCyE)',
    quota: 25,
    endorsementBy: 'Ministerio de Trabajo PBA — IPFL',
    description:
      'Diseño, maquetación y desarrollo de aplicaciones móviles multiplataforma nativas utilizando React Native, Expo SDK 54 y TypeScript para el entorno laboral profesional.',
    whatsappGroupUrl: 'https://chat.whatsapp.com/CFL404DevApps2026',
    resourcesUrl: 'https://drive.google.com/drive/folders/cfl404-mobile-apps',
    maxAbsences: 8,
    absenceCount: 2,
    attendanceHistory: [
      {
        id: 'att-01',
        date: '01/09/2026',
        codeName: 'presente',
        countsAsAbsence: false,
        note: 'Clase presencial — Expo Router',
      },
      {
        id: 'att-02',
        date: '27/08/2026',
        codeName: 'media falta',
        countsAsAbsence: true,
        note: 'Retiro anticipado justificado por motivos laborales',
      },
      {
        id: 'att-03',
        date: '25/08/2026',
        codeName: 'presente',
        countsAsAbsence: false,
      },
      {
        id: 'att-04',
        date: '20/08/2026',
        codeName: 'justificado',
        countsAsAbsence: false,
        note: 'Certificado médico presentado ante preceptoría',
      },
      {
        id: 'att-05',
        date: '18/08/2026',
        codeName: 'presente',
        countsAsAbsence: false,
      },
      {
        id: 'att-06',
        date: '13/08/2026',
        codeName: 'ausente',
        countsAsAbsence: true,
        note: 'Inasistencia sin aviso',
      },
      {
        id: 'att-07',
        date: '11/08/2026',
        codeName: 'tarde',
        countsAsAbsence: false,
        note: 'Ingreso 18:25 con aviso previo',
      },
      {
        id: 'att-08',
        date: '06/08/2026',
        codeName: 'presente',
        countsAsAbsence: false,
      },
      {
        id: 'att-09',
        date: '04/08/2026',
        codeName: 'presente',
        countsAsAbsence: false,
      },
    ],
    notifications: [
      {
        id: 'notif-1',
        title: 'Presentación de Proyecto Final',
        message: 'La primera pre-entrega del proyecto integrador se realizará el jueves 10 de septiembre.',
        date: '02/09/2026',
        type: 'recordatorio',
      },
      {
        id: 'notif-2',
        title: 'Práctica en Dispositivos Físicos',
        message: 'Traer cable USB y celular con modo depuración habilitado para pruebas en Expo.',
        date: '28/08/2026',
        type: 'info',
      },
    ],
  },
  {
    id: 'programacion-web-fullstack',
    name: 'Programación Web Full Stack',
    statusId: 1,
    statusName: 'ACTIVO',
    startDate: '11/03/2026',
    endDate: '25/11/2026',
    startTime: '14:00',
    endTime: '17:30',
    days: ['Lunes', 'Miércoles'],
    classroom: 'Aula 2 (Sector Talleres)',
    instructor: {
      firstName: 'Mariana',
      lastName: 'Gómez',
      email: 'mgomez@cfl404.edu.ar',
    },
    hourQuantity: 220,
    classesQuantity: 65,
    sponsorName: 'DGCyE — Dirección de Formación Profesional',
    quota: 30,
    endorsementBy: 'IPFL Provincia de Buenos Aires',
    description:
      'Desarrollo de aplicaciones web dinámicas de extremo a extremo: Node.js, Express, PostgreSQL y bibliotecas modernas de interfaz de usuario.',
    whatsappGroupUrl: 'https://chat.whatsapp.com/CFL404FullStack2026',
    resourcesUrl: 'https://drive.google.com/drive/folders/cfl404-fullstack',
    maxAbsences: 10,
    absenceCount: 1,
    attendanceHistory: [
      {
        id: 'att-w01',
        date: '31/08/2026',
        codeName: 'presente',
        countsAsAbsence: false,
      },
      {
        id: 'att-w02',
        date: '26/08/2026',
        codeName: 'presente',
        countsAsAbsence: false,
      },
      {
        id: 'att-w03',
        date: '24/08/2026',
        codeName: 'ausente',
        countsAsAbsence: true,
      },
      {
        id: 'att-w04',
        date: '19/08/2026',
        codeName: 'presente',
        countsAsAbsence: false,
      },
      {
        id: 'att-w05',
        date: '17/08/2026',
        codeName: 'feriado',
        countsAsAbsence: false,
        note: 'Paso a la Inmortalidad del Gral. José de San Martín',
      },
    ],
    notifications: [
      {
        id: 'notif-w1',
        title: 'Módulo de Base de Datos',
        message: 'Comenzamos el módulo de PostgreSQL y Prisma ORM. Repasar scripts de SQL dados en clase.',
        date: '01/09/2026',
        type: 'info',
      },
    ],
  },
];

export interface ContactInfo {
  phone: string;
  phoneRaw: string;
  email: string;
  address: string;
  city: string;
  schedule: string;
  social: {
    instagram: string;
    youtube: string;
    facebook: string;
    twitterX: string;
    email: string;
    whatsapp: string;
    whatsappRaw: string;
    phone: string;
  };
}

export const cflContactData: ContactInfo = {
  phone: '0800-348-0111',
  phoneRaw: 'tel:08003480111',
  email: 'cfp404berisso@abc.gob.ar',
  address: 'Calle La Portada N.º 4120 (Acceso 4 al Puerto)',
  city: 'Berisso, Buenos Aires, Argentina',
  schedule: 'Lunes a Viernes de 08:00 a 21:00 hs',
  social: {
    instagram: 'https://instagram.com/cfl404berisso',
    youtube: 'https://youtube.com/@cfl404berisso',
    facebook: 'https://facebook.com/cfl404berisso',
    twitterX: 'https://x.com/cfl404berisso',
    email: 'mailto:cfp404berisso@abc.gob.ar',
    whatsapp: 'https://wa.me/5492213192360',
    whatsappRaw: '5492213192360',
    phone: 'tel:08003480111',
  },
};