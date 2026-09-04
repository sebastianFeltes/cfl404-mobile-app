/**
 * Tokens de color y tipografía del CFL 404
 * Alineados con docs/producto.md y specs-iniciales.txt
 */

import { Platform } from 'react-native';

export const Palette = {
  // Paleta institucional oficial
  azul: '#166193',
  celeste: '#37A6DE',
  amarillo: '#FDEA14',
  grisOscuro: '#1D1E1C',
  grisClaro: '#585856',
  blanco: '#FFFFFF',

  // Colores funcionales y de superficie
  background: '#F8FAFC',
  surface: '#FFFFFF',
  surfaceSubtle: '#F1F5F9',
  border: '#E2E8F0',
  borderDark: '#CBD5E1',

  // Estados semánticos
  success: '#15803D',
  successLight: '#DCFCE7',
  warning: '#D97706',
  warningLight: '#FEF3C7',
  danger: '#DC2626',
  dangerLight: '#FEE2E2',
  info: '#0284C7',
  infoLight: '#E0F2FE',
};

export const Colors = {
  light: {
    text: Palette.grisOscuro,
    textMuted: Palette.grisClaro,
    background: Palette.background,
    card: Palette.surface,
    tint: Palette.azul,
    tabActive: Palette.azul,
    tabInactive: Palette.grisClaro,
    icon: Palette.grisClaro,
    tabIconDefault: Palette.grisClaro,
    tabIconSelected: Palette.azul,
    border: Palette.border,
  },
  dark: {
    text: '#F8FAFC',
    textMuted: '#94A3B8',
    background: '#0F172A',
    card: '#1E293B',
    tint: Palette.celeste,
    tabActive: Palette.celeste,
    tabInactive: '#94A3B8',
    icon: '#94A3B8',
    tabIconDefault: '#94A3B8',
    tabIconSelected: Palette.celeste,
    border: '#334155',
  },
};

export const Typography = {
  fontFamily: {
    regular: Platform.select({
      web: "'Nunito Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      default: 'NunitoSans_400Regular',
    }),
    semiBold: Platform.select({
      web: "'Nunito Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      default: 'NunitoSans_600SemiBold',
    }),
    bold: Platform.select({
      web: "'Nunito Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      default: 'NunitoSans_700Bold',
    }),
    extraBold: Platform.select({
      web: "'Nunito Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      default: 'NunitoSans_800ExtraBold',
    }),
  },
};

export const Fonts = Platform.select({
  ios: {
    sans: 'NunitoSans_400Regular',
    serif: 'ui-serif',
    rounded: 'ui-rounded',
    mono: 'ui-monospace',
  },
  default: {
    sans: 'NunitoSans_400Regular',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "'Nunito Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'Nunito Sans', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
