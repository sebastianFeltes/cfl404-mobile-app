/**
 * Header Custom Compartido para las pantallas de la app.
 * - Fondo azul institucional (#166193).
 * - Izquierda: Logo CFL 404 (assets/logo_texto_hero.svg) en contenedor con borde/fondo blanco, touchable -> navega a Dashboard.
 * - Centro: Fecha y hora en tiempo real en color blanco.
 * - Derecha: Botón menú hamburguesa en color blanco.
 */

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { SvgXml } from 'react-native-svg';
import { Colors, Fonts, Spacing } from '@/constants/theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CFL_LOGO_HERO_SVG } from '@/components/CflLogoHeroSvg';

export function CustomAppHeader() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<DrawerNavigationProp<any>>();

  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('es-AR', {
      day: '2-digit',
      month: '2-digit',
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('es-AR', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
  };

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

        {/* Centro: Fecha y hora actual */}
        <View style={styles.centerContainer}>
          <Text style={styles.timeText}>{formatTime(currentDateTime)}</Text>
          <Text style={styles.dateText}>{formatDate(currentDateTime)}</Text>
        </View>

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
  centerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  timeText: {
    fontFamily: Fonts.title,
    fontSize: 18,
    fontWeight: '700',
    color: Colors.blanco,
  },
  dateText: {
    fontFamily: Fonts.body,
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.85)',
    marginTop: 1,
  },
  iconButton: {
    padding: 6,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
