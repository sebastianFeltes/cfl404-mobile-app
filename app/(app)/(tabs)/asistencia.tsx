/**
 * Asistencia / Credencial — CFL 404 Mobile
 * Credencial digital del alumno.
 * - Pantalla completa azul institucional (#166193).
 * - Logo CFL 404 y textos en blanco.
 * - Nombre del alumno.
 * - Código QR grande centrado abajo con JWT simulado.
 */

import React, { useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '@/context/AuthContext';
import { generarJWT } from '@/data/mock';
import { Colors, Fonts, Spacing, BorderRadius } from '@/constants/theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function AsistenciaScreen() {
  const { user } = useAuth();
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const qrPayload = useMemo(() => {
    return generarJWT(user?.id || 'alumno-001');
  }, [user?.id]);

  return (
    <View style={[styles.container, { paddingTop: Math.max(insets.top, 24), paddingBottom: Math.max(insets.bottom, 24) }]}>
      <StatusBar style="light" />

      {/* Barra superior con botón volver y logo */}
      <View style={styles.topBar}>
        <TouchableOpacity
          onPress={() => router.replace('/(app)/(tabs)')}
          style={styles.backButton}
          accessibilityLabel="Volver al inicio"
        >
          <Ionicons name="arrow-back" size={24} color={Colors.blanco} />
        </TouchableOpacity>

        <View style={styles.logoBadge}>
          <Text style={styles.logoText}>CFL 404</Text>
        </View>

        <View style={styles.placeholderBox} />
      </View>

      <Text style={styles.institutionSubtitle}>
        Centro de Formación Laboral N° 404
      </Text>

      {/* Contenedor central: Identificación del alumno */}
      <View style={styles.studentInfoContainer}>
        <View style={styles.avatarCircle}>
          <Ionicons name="person" size={48} color={Colors.azul} />
        </View>
        <Text style={styles.studentName}>
          {user?.nombre || 'Alumno'}
        </Text>
        <Text style={styles.credentialTag}>CREDENCIAL DIGITAL</Text>
        {user?.legajo && (
          <Text style={styles.legajoText}>Legajo: {user.legajo}</Text>
        )}
      </View>

      {/* QR Grande centrado abajo */}
      <View style={styles.qrSection}>
        <View style={styles.qrWrapper}>
          <QRCode
            value={qrPayload}
            size={220}
            color={Colors.azul}
            backgroundColor={Colors.blanco}
          />
        </View>
        <Text style={styles.qrInstruction}>
          Presentá este código QR al ingresar a la institución
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.azul,
    paddingHorizontal: Spacing.lg,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  topBar: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    padding: 8,
    borderRadius: 8,
  },
  placeholderBox: {
    width: 40,
  },
  logoBadge: {
    backgroundColor: Colors.blanco,
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 8,
  },
  logoText: {
    fontFamily: Fonts.title,
    fontSize: 18,
    fontWeight: '700',
    color: Colors.azul,
    letterSpacing: 0.5,
  },
  institutionSubtitle: {
    fontFamily: Fonts.body,
    fontSize: 14,
    color: '#D4E6F1',
    marginTop: -Spacing.sm,
    textAlign: 'center',
  },
  studentInfoContainer: {
    alignItems: 'center',
    marginVertical: Spacing.md,
  },
  avatarCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.blanco,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  },
  studentName: {
    fontFamily: Fonts.title,
    fontSize: 24,
    fontWeight: '700',
    color: Colors.blanco,
    textAlign: 'center',
  },
  credentialTag: {
    fontFamily: Fonts.body,
    fontSize: 12,
    letterSpacing: 2,
    color: Colors.amarillo,
    fontWeight: '700',
    marginTop: 6,
  },
  legajoText: {
    fontFamily: Fonts.body,
    fontSize: 14,
    color: '#D4E6F1',
    marginTop: 4,
  },
  qrSection: {
    alignItems: 'center',
    width: '100%',
    marginBottom: Spacing.md,
  },
  qrWrapper: {
    backgroundColor: Colors.blanco,
    padding: 20,
    borderRadius: BorderRadius.lg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  qrInstruction: {
    fontFamily: Fonts.body,
    fontSize: 13,
    color: '#E0F2FE',
    textAlign: 'center',
    marginTop: Spacing.md,
    maxWidth: 260,
  },
});
