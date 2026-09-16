/**
 * Datos mock — CFL 404 Mobile
 * Datos hardcodeados de prueba para desarrollo sin backend.
 */

export interface Usuario {
  id: string;
  nombre: string;
  legajo: string;
  email: string;
  cursos: string[];
}

export interface Curso {
  id: string;
  nombre: string;
}

export const MOCK_USER: Usuario = {
  id: 'usr-404-001-cfl',
  nombre: 'Juan Manuel Pérez',
  legajo: 'CFL-2026-0042',
  email: 'juan.perez@alumnos.cfl404.edu.ar',
  cursos: ['cfl-curso-01', 'cfl-curso-02', 'cfl-curso-03'],
};

export const MOCK_CURSOS: Curso[] = [
  { id: 'cfl-curso-01', nombre: 'Programación de Apps Móviles' },
  { id: 'cfl-curso-02', nombre: 'Diseño UX/UI para Aplicaciones' },
  { id: 'cfl-curso-03', nombre: 'Electricidad Industrial y Automatización' },
];

/**
 * Genera un JWT simulado para el código QR de la credencial.
 * En producción esto vendría firmado desde el backend.
 */
export function generarJWT(alumnoId: string): string {
  const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const payload = btoa(
    JSON.stringify({
      sub: alumnoId,
      iat: Math.floor(Date.now() / 1000),
      iss: 'cfl404-mobile',
    })
  );
  const signature = btoa('mock-signature-cfl404');
  return `${header}.${payload}.${signature}`;
}
