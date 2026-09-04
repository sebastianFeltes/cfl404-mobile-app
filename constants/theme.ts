/**
 * Tokens de color y diseño para la app CFL 404 (ciclo 2026).
 * Fuente de verdad: docs/producto.md y docs/specs-iniciales.txt
 */

import { Platform } from 'react-native';

/** Paleta institucional oficial del CFL 404 */
export const CflColors = {
  azul: '#166193',        // Primario, headers, botones principales
  celeste: '#37A6DE',     // Acentos, links, tab/estado activo
  amarillo: '#FDEA14',    // Destacados, badges, CTAs secundarios
  grisOscuro: '#1D1E1C',  // Texto principal
  grisClaro: '#585856',   // Texto secundario, bordes sutiles, captions
  blanco: '#FFFFFF',      // Fondos de tarjeta, texto sobre azul
  fondo: '#F8FAFC',       // Fondo de pantallas general (limpio y minimalista)
  superficie: '#FFFFFF',  // Superficie de tarjetas y modales
  borde: '#E2E8F0',       // Bordes sutiles de separadores
  bordeActivo: '#37A6DE', // Borde de inputs en foco
  exito: '#16A34A',       // Estados positivos / presente
  peligro: '#DC2626',     // Inasistencias críticas / errores
  alerta: '#D97706',      // Advertencias / tardanzas
} as const;

export const Colors = {
  light: {
    text: CflColors.grisOscuro,
    background: CflColors.fondo,
    tint: CflColors.azul,
    icon: CflColors.grisClaro,
    tabIconDefault: CflColors.grisClaro,
    tabIconSelected: CflColors.azul,
    card: CflColors.blanco,
    border: CflColors.borde,
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: CflColors.celeste,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: CflColors.celeste,
    card: '#1F2428',
    border: '#2D3339',
  },
};

export const Fonts = Platform.select({
  ios: {
    sans: 'system-ui',
    serif: 'ui-serif',
    rounded: 'ui-rounded',
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
