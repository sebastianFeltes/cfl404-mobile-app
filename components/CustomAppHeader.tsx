/**
 * Header Custom Compartido para las pantallas de la app.
 * - Izquierda: Logo CFL 404 (touchable -> redirige al Dashboard index)
 * - Centro: Fecha y hora en tiempo real
 * - Derecha: Botón menú hamburguesa (abre el drawer)
 */

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { Colors, Fonts, Spacing } from '@/constants/theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

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
        {/* Izquierda: Logo CFL 404 (interactivo) */}
        <TouchableOpacity
          onPress={handleLogoPress}
          activeOpacity={0.7}
          style={styles.logoBadge}
          accessibilityLabel="Ir al Dashboard"
          accessibilityRole="button"
        >
          <Text style={styles.logoBadgeText}>CFL 404</Text>
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
          <Ionicons name="menu" size={28} color={Colors.azul} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: Colors.blanco,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
    paddingBottom: Spacing.sm,
    paddingHorizontal: Spacing.md,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 48,
  },
  logoBadge: {
    backgroundColor: Colors.azul,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  logoBadgeText: {
    color: Colors.blanco,
    fontFamily: Fonts.title,
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  centerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  timeText: {
    fontFamily: Fonts.title,
    fontSize: 17,
    fontWeight: '700',
    color: Colors.grisOscuro,
  },
  dateText: {
    fontFamily: Fonts.body,
    fontSize: 12,
    color: Colors.grisClaro,
  },
  iconButton: {
    padding: 6,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
