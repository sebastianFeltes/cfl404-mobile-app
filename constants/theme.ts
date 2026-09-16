/**
 * Tokens de diseño — CFL 404 Mobile
 * Paleta y tipografía institucional (solo light mode).
 */

export const Colors = {
  azul: '#166193',       // Primario, header, botones principales
  celeste: '#37A6DE',    // Acentos, links, tab/estado activo
  amarillo: '#FDEA14',   // Destacados, CTAs secundarios, badges
  grisOscuro: '#1D1E1C', // Texto principal
  grisClaro: '#585856',  // Texto secundario, bordes, captions
  blanco: '#FFFFFF',     // Fondos, texto sobre azul
  fondo: '#F8FAFC',      // Fondo de pantallas
  superficie: '#FFFFFF', // Superficie de tarjetas
  borde: '#E2E8F0',      // Bordes y separadores
  exito: '#16A34A',      // Estados positivos / presente
  peligro: '#DC2626',    // Inasistencias críticas / errores
  alerta: '#D97706',     // Advertencias
} as const;

/** Alias usado por las pantallas de perfil, beneficios y mis cursos (jua-tiz). */
export const CflColors = Colors;

export const Fonts = {
  body: 'RobotoFlex_400Regular',
  title: 'Nunito_700Bold',
} as const;

/** Alias de paleta usado por detalle de curso, ayuda y contacto (gas-tiz). */
export const Palette = {
  azul: Colors.azul,
  celeste: Colors.celeste,
  amarillo: Colors.amarillo,
  grisOscuro: Colors.grisOscuro,
  grisClaro: Colors.grisClaro,
  blanco: Colors.blanco,
  background: Colors.fondo,
  surface: Colors.superficie,
  surfaceSubtle: '#F1F5F9',
  border: Colors.borde,
  borderDark: '#CBD5E1',
  success: '#15803D',
  successLight: '#DCFCE7',
  warning: Colors.alerta,
  warningLight: '#FEF3C7',
  danger: Colors.peligro,
  dangerLight: '#FEE2E2',
  info: '#0284C7',
  infoLight: '#E0F2FE',
} as const;

export const Typography = {
  fontFamily: {
    regular: Fonts.body,
    semiBold: Fonts.title,
    bold: Fonts.title,
    extraBold: Fonts.title,
  },
} as const;

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
} as const;

export const BorderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
} as const;
