/**
 * Ayuda (App) — CFL 404 Mobile
 * Sección del Drawer para consultar información y soporte.
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Fonts, Spacing } from '@/constants/theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function AyudaAppScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: Math.max(insets.top, 16) }]}>
      <View style={styles.topNav}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={Colors.azul} />
        </TouchableOpacity>
        <Text style={styles.navTitle}>Centro de Ayuda</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>¿Cómo presentar la asistencia?</Text>
          <Text style={styles.sectionBody}>
            Ingresá a la pestaña central "Credencial". Mostrale la pantalla con tu código QR al personal de preceptoría o docente al llegar a tu curso.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>¿Cómo ver el historial de cursada?</Text>
          <Text style={styles.sectionBody}>
            Tocá cualquier curso desde la pantalla principal para acceder a la ficha completa con recursos, enlace al grupo de WhatsApp y tu historial de presentismo.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Beneficios comerciales</Text>
          <Text style={styles.sectionBody}>
            En la sección de Beneficios podés enterarte de todos los comercios que ofrecen descuentos a la comunidad educativa del CFL 404.
          </Text>
        </View>
      </ScrollView>
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
  scrollContent: {
    padding: Spacing.lg,
    gap: Spacing.md,
  },
  section: {
    backgroundColor: Colors.blanco,
    padding: Spacing.md,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  sectionTitle: {
    fontFamily: Fonts.title,
    fontSize: 16,
    fontWeight: '700',
    color: Colors.azul,
    marginBottom: Spacing.xs,
  },
  sectionBody: {
    fontFamily: Fonts.body,
    fontSize: 14,
    color: Colors.grisOscuro,
    lineHeight: 20,
  },
});
