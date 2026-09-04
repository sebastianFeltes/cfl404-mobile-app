import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { CflColors } from '@/constants/theme';
import { MOCK_USER } from '@/constants/mocks';

export default function AsistenciaScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.header}>
          <Text style={styles.institution}>CFL N° 404 Berisso</Text>
          <Text style={styles.badge}>Ciclo 2026</Text>
        </View>

        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {MOCK_USER.firstName.charAt(0)}
            {MOCK_USER.lastName.charAt(0)}
          </Text>
        </View>

        <Text style={styles.name}>
          {MOCK_USER.firstName} {MOCK_USER.lastName}
        </Text>
        <Text style={styles.dni}>DNI: {MOCK_USER.dni}</Text>

        <View style={styles.qrPlaceholder}>
          <Ionicons name="qr-code-outline" size={120} color={CflColors.azul} />
          <Text style={styles.qrText}>Credencial Digital del Alumno</Text>
        </View>

        <Text style={styles.disclaimer}>
          Presenta este código QR al personal de preceptoría para registrar tu asistencia.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CflColors.fondo,
    padding: 20,
    justifyContent: 'center',
  },
  card: {
    backgroundColor: CflColors.blanco,
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: CflColors.borde,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  institution: {
    fontSize: 14,
    fontWeight: '700',
    color: CflColors.azul,
  },
  badge: {
    backgroundColor: '#FEF9C3',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    fontSize: 11,
    fontWeight: '700',
    color: '#854D0E',
  },
  avatar: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: CflColors.azul,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatarText: {
    fontSize: 24,
    fontWeight: '700',
    color: CflColors.blanco,
  },
  name: {
    fontSize: 18,
    fontWeight: '700',
    color: CflColors.grisOscuro,
  },
  dni: {
    fontSize: 13,
    color: CflColors.grisClaro,
    marginTop: 2,
    marginBottom: 16,
  },
  qrPlaceholder: {
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: CflColors.borde,
    width: '100%',
  },
  qrText: {
    fontSize: 12,
    fontWeight: '600',
    color: CflColors.grisClaro,
    marginTop: 8,
  },
  disclaimer: {
    fontSize: 12,
    color: CflColors.grisClaro,
    textAlign: 'center',
    marginTop: 16,
    lineHeight: 16,
  },
});
