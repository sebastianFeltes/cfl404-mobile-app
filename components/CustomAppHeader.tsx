/**
 * Header Custom Compartido para las pantallas de la app.
 * - Fondo azul institucional (#166193).
 * - Izquierda: Logo CFL 404 (assets/logo_texto_hero.svg) en contenedor con borde/fondo blanco, touchable -> navega a Dashboard.
 * - Derecha: Botón menú hamburguesa en color blanco.
 */

import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, useRouter } from 'expo-router';
import { DrawerNavigationProp } from 'expo-router/drawer';
import { Ionicons } from '@expo/vector-icons';
import { SvgXml } from 'react-native-svg';
import { Colors, Spacing } from '@/constants/theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CFL_LOGO_HERO_SVG } from '@/components/CflLogoHeroSvg';

export function CustomAppHeader() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<DrawerNavigationProp<any>>();

  const handleLogoPress = () => {
    router.replace('/(app)/(tabs)');
  };

  const handleMenuPress = () => {
    try {
      navigation.openDrawer();
    } catch {
      // Por si drawer no está disponible en stack
    }
  };

  return (
    <View style={[styles.headerContainer, { paddingTop: Math.max(insets.top, 12) }]}>
      <View style={styles.headerContent}>
        {/* Izquierda: Logo CFL 404 SVG (interactivo) */}
        <TouchableOpacity
          onPress={handleLogoPress}
          activeOpacity={0.7}
          style={styles.logoButton}
          accessibilityLabel="Ir al Dashboard"
          accessibilityRole="button"
        >
          <View style={styles.logoBadge}>
            <SvgXml xml={CFL_LOGO_HERO_SVG} width={38} height={38} />
          </View>
        </TouchableOpacity>

        {/* Derecha: Menú Hamburguesa */}
        <TouchableOpacity
          onPress={handleMenuPress}
          activeOpacity={0.7}
          style={styles.iconButton}
          accessibilityLabel="Abrir menú"
          accessibilityRole="button"
        >
          <Ionicons name="menu" size={28} color={Colors.blanco} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: Colors.azul,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.15)',
    paddingBottom: Spacing.sm,
    paddingHorizontal: Spacing.md,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 52,
  },
  logoButton: {
    padding: 2,
  },
  logoBadge: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.blanco,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
    overflow: 'hidden',
  },
  iconButton: {
    padding: 6,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
