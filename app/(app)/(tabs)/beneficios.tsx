/**
 * Beneficios (Placeholder) — CFL 404 Mobile
 * Sección a implementar por el subgrupo correspondiente.
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Fonts, Spacing } from '@/constants/theme';

export default function BeneficiosScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.iconCircle}>
        <Ionicons name="bag-outline" size={48} color={Colors.azul} />
      </View>
      <Text style={styles.title}>Beneficios y Comercios</Text>
      <Text style={styles.subtitle}>
        Próximamente vas a poder consultar todos los comercios adheridos con descuentos para alumnos del CFL 404.
      </Text>
      <View style={styles.badge}>
        <Text style={styles.badgeText}>Próximamente</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
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
