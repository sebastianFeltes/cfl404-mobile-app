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
  id: 'alumno-001',
  nombre: 'Florencia García',
  legajo: 'CFL-2026-0042',
  email: 'florencia@example.com',
  cursos: ['curso-1', 'curso-2', 'curso-3'],
};

export const MOCK_CURSOS: Curso[] = [
  { id: 'curso-1', nombre: 'Desarrollo de Apps Móviles' },
  { id: 'curso-2', nombre: 'Diseño UX/UI' },
  { id: 'curso-3', nombre: 'Base de Datos' },
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
