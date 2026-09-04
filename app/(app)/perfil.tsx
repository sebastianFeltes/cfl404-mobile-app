/**
 * Perfil (Placeholder) — CFL 404 Mobile
 * Sección del Drawer a implementar por el subgrupo correspondiente.
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Fonts, Spacing } from '@/constants/theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function PerfilScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: Math.max(insets.top, 16) }]}>
      <View style={styles.topNav}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={Colors.azul} />
        </TouchableOpacity>
        <Text style={styles.navTitle}>Mi Perfil</Text>
        <View style={{ width: 40 }} />
      </View>

      <View style={styles.content}>
        <View style={styles.iconCircle}>
          <Ionicons name="person-outline" size={48} color={Colors.azul} />
        </View>
        <Text style={styles.title}>Perfil de Alumno</Text>
        <Text style={styles.subtitle}>
          Próximamente vas a poder visualizar y actualizar tus datos personales y académicos.
        </Text>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>Próximamente</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  topNav: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.md,
    paddingBottom: Spacing.sm,
    backgroundColor: Colors.blanco,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  backButton: {
    padding: 8,
  },
  navTitle: {
    fontFamily: Fonts.title,
    fontSize: 18,
    fontWeight: '700',
    color: Colors.grisOscuro,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spacing.xl,
  },
  iconCircle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: '#EAF4FA',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  title: {
    fontFamily: Fonts.title,
    fontSize: 22,
    fontWeight: '700',
    color: Colors.grisOscuro,
    textAlign: 'center',
    marginBottom: Spacing.sm,
  },
  subtitle: {
    fontFamily: Fonts.body,
    fontSize: 15,
    color: Colors.grisClaro,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: Spacing.lg,
  },
  badge: {
    backgroundColor: Colors.celeste,
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
  },
  badgeText: {
    fontFamily: Fonts.title,
    fontSize: 13,
    color: Colors.blanco,
    fontWeight: '700',
  },
});
