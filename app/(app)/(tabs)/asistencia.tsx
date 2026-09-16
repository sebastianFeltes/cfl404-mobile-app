/**
 * Asistencia / Credencial — CFL 404 Mobile
 * Credencial digital del alumno.
 * - Pantalla completa azul institucional (#166193).
 * - Foto de perfil, nombre y apellido, credencial con legajo.
 * - Código QR grande con logo del CFL 404 en el centro.
 */

import React, { useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '@/context/AuthContext';
import { generarJWT } from '@/data/mock';
import { Colors, Fonts, Spacing, BorderRadius } from '@/constants/theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function AsistenciaScreen() {
  const { user } = useAuth();
  const insets = useSafeAreaInsets();

  const qrPayload = useMemo(() => {
    return generarJWT(user?.id || 'alumno-001');
  }, [user?.id]);

  return (
    <View style={[styles.container, { paddingTop: Math.max(insets.top, 20) }]}>
      <StatusBar style="light" />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        {/* Identificación del alumno: Foto, Nombre, Credencial y Legajo */}
        <View style={styles.studentInfoContainer}>
          <View style={styles.avatarCircle}>
            <Ionicons name="person" size={54} color={Colors.azul} />
          </View>
          <Text style={styles.studentName}>
            {user?.nombre || 'Alumno'}
          </Text>
          <View style={styles.credentialBadge}>
            <Text style={styles.credentialTag}>CREDENCIAL DIGITAL</Text>
          </View>
          {user?.legajo && (
            <Text style={styles.legajoText}>Legajo: {user.legajo}</Text>
          )}
        </View>

        {/* QR con Logo del CFL en el medio */}
        <View style={styles.qrSection}>
          <View style={styles.qrWrapper}>
            <QRCode
              value={qrPayload}
              size={210}
              color={Colors.azul}
              backgroundColor={Colors.blanco}
              logo={require('@/assets/logo.png')}
              logoSize={46}
              logoBackgroundColor={Colors.blanco}
              logoBorderRadius={8}
              logoMargin={2}
            />
          </View>
          <Text style={styles.qrInstruction}>
            Presentá este código QR para registrar tu asistencia
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.azul,
  },
  scrollContent: {
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.sm,
    paddingBottom: Spacing.xl,
  },
  studentInfoContainer: {
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  avatarCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: Colors.blanco,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.sm,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  studentName: {
    fontFamily: Fonts.title,
    fontSize: 24,
    fontWeight: '700',
    color: Colors.blanco,
    textAlign: 'center',
  },
  credentialBadge: {
    marginTop: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  credentialTag: {
    fontFamily: Fonts.body,
    fontSize: 12,
    letterSpacing: 1.5,
    color: Colors.amarillo,
    fontWeight: '700',
  },
  legajoText: {
    fontFamily: Fonts.body,
    fontSize: 15,
    color: Colors.blanco,
    fontWeight: '600',
    marginTop: 6,
  },
  qrSection: {
    alignItems: 'center',
    width: '100%',
  },
  qrWrapper: {
    backgroundColor: Colors.blanco,
    padding: 16,
    borderRadius: BorderRadius.lg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  qrInstruction: {
    fontFamily: Fonts.body,
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    marginTop: Spacing.md,
    maxWidth: 260,
  },
});
