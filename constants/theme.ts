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
} as const;

export const Fonts = {
  body: 'RobotoFlex_400Regular',
  title: 'Nunito_700Bold',
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
