import React, { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Linking,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { Palette, Typography } from '@/constants/theme';
import { cflContactData } from '@/data/coursesData';

export interface AlumnoReincorporacion {
  firstName: string;
  lastName: string;
  dni: string;
  legajo: string;
  courseName: string;
}

interface SolicitudReincorporacionModalProps {
  visible: boolean;
  alumno: AlumnoReincorporacion;
  onClose: () => void;
}

function asuntoSinAcentos(value: string) {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toUpperCase();
}

export default function SolicitudReincorporacionModal({
  visible,
  alumno,
  onClose,
}: SolicitudReincorporacionModalProps) {
  const [motivo, setMotivo] = useState('');

  const cerrar = () => {
    setMotivo('');
    onClose();
  };

  const enviar = async () => {
    const justificacion = motivo.trim();
    if (!justificacion) {
      Alert.alert('Solicitud', 'Explicá el motivo de la solicitud antes de enviar.');
      return;
    }

    const nombreCompleto = `${alumno.firstName} ${alumno.lastName}`.trim();
    const asunto = `SOLICITUD REINCORPORACION ${asuntoSinAcentos(alumno.lastName)} ${asuntoSinAcentos(alumno.firstName)}`;
    const cuerpo = [
      `Nombre y apellido: ${nombreCompleto}`,
      `DNI: ${alumno.dni}`,
      `Legajo: ${alumno.legajo}`,
      `Curso: ${alumno.courseName}`,
      '',
      'Motivo:',
      justificacion,
      '',
      '[enviado desde la aplicacion movil del CFL404 Berisso]',
    ].join('\n');

    const url = `mailto:${cflContactData.email}?subject=${encodeURIComponent(asunto)}&body=${encodeURIComponent(cuerpo)}`;

    try {
      await Linking.openURL(url);
      cerrar();
    } catch {
      Alert.alert('Correo', 'No se pudo abrir la casilla de mail.');
    }
  };

  const campos = [
    { icon: 'person-outline' as const, label: 'Nombre y apellido', value: `${alumno.firstName} ${alumno.lastName}` },
    { icon: 'card-outline' as const, label: 'DNI', value: alumno.dni },
    { icon: 'id-card-outline' as const, label: 'Legajo', value: alumno.legajo },
    { icon: 'school-outline' as const, label: 'Curso', value: alumno.courseName },
  ];

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={cerrar}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <Pressable style={styles.backdrop} onPress={cerrar}>
          <Pressable style={styles.sheet} onPress={() => {}}>
            <ScrollView
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.sheetContent}>
              <View style={styles.header}>
                <View style={styles.headerIcon}>
                  <Ionicons name="paper-plane" size={18} color={Palette.azul} />
                </View>
                <View style={styles.headerTitles}>
                  <Text style={styles.title}>Solicitud de reincorporación</Text>
                  <Text style={styles.subtitle}>Se abre el correo institucional</Text>
                </View>
                <Pressable accessibilityLabel="Cerrar" onPress={cerrar} hitSlop={8}>
                  <Ionicons name="close" size={22} color={Palette.grisClaro} />
                </Pressable>
              </View>

              <View style={styles.dataCard}>
                {campos.map((campo, index) => (
                  <View key={campo.label}>
                    {index > 0 ? <View style={styles.divider} /> : null}
                    <View style={styles.fieldRow}>
                      <View style={styles.fieldIcon}>
                        <Ionicons name={campo.icon} size={16} color={Palette.azul} />
                      </View>
                      <View style={styles.fieldText}>
                        <Text style={styles.fieldLabel}>{campo.label}</Text>
                        <Text style={styles.fieldValue}>{campo.value}</Text>
                      </View>
                    </View>
                  </View>
                ))}
              </View>

              <Text style={styles.motivoLabel}>Explicá el motivo de la solicitud</Text>
              <TextInput
                value={motivo}
                onChangeText={setMotivo}
                placeholder="Ej: tuve un cambio en el horario laboral..."
                placeholderTextColor={Palette.grisClaro}
                multiline
                textAlignVertical="top"
                style={styles.input}
              />

              <Pressable
                style={({ pressed }) => [styles.sendButton, pressed && styles.sendButtonPressed]}
                onPress={enviar}>
                <Ionicons name="paper-plane" size={18} color={Palette.blanco} />
                <Text style={styles.sendButtonText}>Enviar</Text>
              </Pressable>
            </ScrollView>
          </Pressable>
        </Pressable>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(29, 30, 28, 0.45)',
    justifyContent: 'center',
    padding: 16,
  },
  sheet: {
    backgroundColor: Palette.blanco,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Palette.border,
    maxHeight: '90%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 6,
  },
  sheetContent: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 14,
  },
  headerIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#EBF4FA',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitles: {
    flex: 1,
  },
  title: {
    fontFamily: Typography.fontFamily.bold,
    fontWeight: '700',
    fontSize: 16,
    color: Palette.grisOscuro,
  },
  subtitle: {
    fontFamily: Typography.fontFamily.regular,
    fontSize: 12,
    color: Palette.grisClaro,
    marginTop: 2,
  },
  dataCard: {
    backgroundColor: Palette.background,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: Palette.border,
    marginBottom: 14,
  },
  fieldRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  fieldIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: Palette.blanco,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fieldText: {
    flex: 1,
  },
  fieldLabel: {
    fontFamily: Typography.fontFamily.bold,
    fontSize: 11,
    color: Palette.grisClaro,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.4,
    marginBottom: 2,
  },
  fieldValue: {
    fontFamily: Typography.fontFamily.semiBold,
    fontSize: 14,
    color: Palette.grisOscuro,
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: Palette.border,
    marginHorizontal: 12,
  },
  motivoLabel: {
    fontFamily: Typography.fontFamily.bold,
    fontWeight: '700',
    fontSize: 13,
    color: Palette.grisOscuro,
    marginBottom: 8,
  },
  input: {
    minHeight: 96,
    borderWidth: 1,
    borderColor: Palette.border,
    borderRadius: 12,
    backgroundColor: Palette.blanco,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontFamily: Typography.fontFamily.regular,
    fontSize: 14,
    color: Palette.grisOscuro,
    marginBottom: 14,
  },
  sendButton: {
    backgroundColor: Palette.azul,
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    elevation: 3,
    shadowColor: Palette.azul,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
  },
  sendButtonPressed: {
    opacity: 0.9,
  },
  sendButtonText: {
    fontFamily: Typography.fontFamily.bold,
    fontWeight: 'bold',
    fontSize: 16,
    color: Palette.blanco,
  },
});
