/**
 * Asistencia / Credencial — CFL 404 Mobile
 * Credencial digital del alumno.
 * - Fondo con gradiente de azul a celeste.
 * - Flecha de retorno al inicio arriba a la izquierda.
 * - Foto de perfil, nombre y apellido, legajo del alumno.
 * - Código QR con logo del CFL en el centro y padding adecuado.
 */

import React, { useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, useWindowDimensions } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from '@/context/AuthContext';
import { generarJWT } from '@/data/mock';
import { Colors, Fonts, Spacing, BorderRadius } from '@/constants/theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function AsistenciaScreen() {
  const { user } = useAuth();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { width } = useWindowDimensions();

  // QR ocupa casi todo el ancho de la pantalla de forma cuadrada
  const qrCardPadding = 14;
  const horizontalPadding = 16;
  const qrSize = Math.min(width - (horizontalPadding * 2 + qrCardPadding * 2), 360);
  const qrLogoSize = Math.round(qrSize * 0.2);

  const qrPayload = useMemo(() => {
    return generarJWT(user?.id || 'alumno-001');
  }, [user?.id]);

  return (
    <LinearGradient
      colors={[Colors.azul, Colors.celeste]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <StatusBar style="light" />

      {/* Flecha arriba a la izquierda para volver al inicio */}
      <View style={[styles.topBar, { paddingTop: Math.max(insets.top, 16) }]}>
        <TouchableOpacity
          onPress={() => router.replace('/(app)/(tabs)')}
          style={styles.backButton}
          activeOpacity={0.7}
          accessibilityLabel="Volver a la pantalla principal"
          accessibilityRole="button"
        >
          <Ionicons name="arrow-back" size={26} color={Colors.blanco} />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        {/* Identificación del alumno: Foto, Nombre y Apellido, Legajo */}
        <View style={styles.studentInfoContainer}>
          <View style={styles.avatarCircle}>
            <Ionicons name="person" size={48} color={Colors.azul} />
          </View>
          <Text style={styles.studentName}>
            {user?.nombre || 'Alumno'}
          </Text>
          {user?.legajo && (
            <Text style={styles.legajoText}>Legajo: {user.legajo}</Text>
          )}
        </View>

        {/* QR con Logo del CFL en el centro con padding adecuado */}
        <View style={styles.qrSection}>
          <View style={[styles.qrWrapper, { padding: qrCardPadding }]}>
            <QRCode
              value={qrPayload}
              size={qrSize}
              color={Colors.azul}
              backgroundColor={Colors.blanco}
              logo={require('@/assets/logo.png')}
              logoSize={qrLogoSize}
              logoBackgroundColor={Colors.blanco}
              logoBorderRadius={8}
              logoMargin={6}
              ecl="H"
            />
          </View>
          <Text style={styles.qrInstruction}>
            Presentá este código QR para registrar tu asistencia
          </Text>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topBar: {
    paddingHorizontal: Spacing.md,
    paddingBottom: Spacing.xs,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
  },
  scrollContent: {
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.xs,
    paddingBottom: Spacing.xl,
  },
  studentInfoContainer: {
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  avatarCircle: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: Colors.blanco,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.xs,
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
  legajoText: {
    fontFamily: Fonts.body,
    fontSize: 15,
    color: Colors.blanco,
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
    color: 'rgba(255, 255, 255, 0.95)',
    textAlign: 'center',
    marginTop: Spacing.md,
    maxWidth: 260,
  },
});
