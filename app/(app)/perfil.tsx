import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { CflColors } from '@/constants/theme';
import { MOCK_USER, StudentUser } from '@/constants/mocks';

export default function PerfilScreen() {
  const [user, setUser] = useState<StudentUser>(MOCK_USER);
  const [isEditing, setIsEditing] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  // Estados temporales del formulario de edición
  const [phone, setPhone] = useState(user.detail.phone || '');
  const [address, setAddress] = useState(user.detail.address || '');
  const [extraPhone, setExtraPhone] = useState(user.detail.extraPhone || '');
  const [extraEmail, setExtraEmail] = useState(user.detail.extraEmail || '');

  // Formatear fecha ISO a formato local es-AR (DD/MM/AAAA)
  const formatBirthDate = (isoDate: string | null) => {
    if (!isoDate) return 'No registrado';
    const date = new Date(isoDate);
    return date.toLocaleDateString('es-AR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  const handleStartEditing = () => {
    setPhone(user.detail.phone || '');
    setAddress(user.detail.address || '');
    setExtraPhone(user.detail.extraPhone || '');
    setExtraEmail(user.detail.extraEmail || '');
    setIsEditing(true);
    setShowSuccessToast(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleSave = () => {
    if (!phone.trim()) {
      Alert.alert('Campo requerido', 'Por favor ingresa al menos un número de teléfono de contacto.');
      return;
    }

    setUser((prev) => ({
      ...prev,
      detail: {
        ...prev.detail,
        phone: phone.trim(),
        address: address.trim(),
        extraPhone: extraPhone.trim() || null,
        extraEmail: extraEmail.trim() || null,
        updatedAt: new Date().toISOString(),
      },
    }));

    setIsEditing(false);
    setShowSuccessToast(true);
    setTimeout(() => {
      setShowSuccessToast(false);
    }, 4000);
  };

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        {/* Toast de confirmación */}
        {showSuccessToast && (
          <View style={styles.toast}>
            <Ionicons name="checkmark-circle" size={20} color={CflColors.exito} />
            <Text style={styles.toastText}>Datos de contacto actualizados con éxito</Text>
          </View>
        )}

        {/* Cabecera del Alumno */}
        <View style={styles.headerCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {user.firstName.charAt(0)}
              {user.lastName.charAt(0)}
            </Text>
          </View>
          <Text style={styles.fullName}>
            {user.firstName} {user.lastName}
          </Text>
          <Text style={styles.emailText}>{user.email}</Text>

          <View style={styles.tagsRow}>
            <View style={styles.roleTag}>
              <Text style={styles.roleTagText}>{user.role}</Text>
            </View>
            <View style={styles.statusTag}>
              <View style={styles.statusDot} />
              <Text style={styles.statusTagText}>{user.status}</Text>
            </View>
            {user.emailVerified && (
              <View style={styles.verifiedTag}>
                <Ionicons name="shield-checkmark" size={13} color={CflColors.azul} />
                <Text style={styles.verifiedTagText}>Verificado</Text>
              </View>
            )}
          </View>
        </View>

        {/* Bloque 1: Datos Filiatorios e Identidad (Lectura Institucional) */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Ionicons name="school-outline" size={20} color={CflColors.azul} />
            <Text style={styles.sectionTitle}>Identidad y Escolaridad</Text>
          </View>

          <View style={styles.card}>
            <View style={styles.fieldRow}>
              <Text style={styles.fieldLabel}>DNI / Documento</Text>
              <Text style={styles.fieldValue}>{user.dni || 'Sin registrar'}</Text>
            </View>

            <View style={styles.fieldDivider} />

            <View style={styles.fieldRow}>
              <Text style={styles.fieldLabel}>Fecha de Nacimiento</Text>
              <Text style={styles.fieldValue}>{formatBirthDate(user.detail.dob)}</Text>
            </View>

            <View style={styles.fieldDivider} />

            <View style={styles.fieldRow}>
              <Text style={styles.fieldLabel}>Género</Text>
              <Text style={styles.fieldValue}>{user.detail.gender || 'No especificado'}</Text>
            </View>

            <View style={styles.fieldDivider} />

            <View style={styles.fieldRow}>
              <Text style={styles.fieldLabel}>Nacionalidad</Text>
              <Text style={styles.fieldValue}>{user.detail.nacionality || 'Argentina'}</Text>
            </View>

            <View style={styles.fieldDivider} />

            <View style={styles.fieldRow}>
              <Text style={styles.fieldLabel}>Nivel Educativo</Text>
              <Text style={styles.fieldValue}>
                {user.detail.academicLevel || 'Secundario completo'}
              </Text>
            </View>
          </View>
        </View>

        {/* Bloque 2: Información de Contacto */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Ionicons name="call-outline" size={20} color={CflColors.azul} />
            <Text style={styles.sectionTitle}>Información de Contacto</Text>
          </View>

          <View style={styles.card}>
            {/* Teléfono Personal */}
            <View style={styles.inputGroup}>
              <Text style={styles.fieldLabel}>Teléfono personal</Text>
              {isEditing ? (
                <TextInput
                  style={styles.input}
                  value={phone}
                  onChangeText={setPhone}
                  placeholder="Ej. 221-555-0192"
                  placeholderTextColor={CflColors.grisClaro}
                  keyboardType="phone-pad"
                />
              ) : (
                <Text style={styles.fieldValue}>{user.detail.phone || 'No registrado'}</Text>
              )}
            </View>

            <View style={styles.fieldDivider} />

            {/* Domicilio */}
            <View style={styles.inputGroup}>
              <Text style={styles.fieldLabel}>Domicilio</Text>
              {isEditing ? (
                <TextInput
                  style={styles.input}
                  value={address}
                  onChangeText={setAddress}
                  placeholder="Ej. Calle 45 N° 820, La Plata"
                  placeholderTextColor={CflColors.grisClaro}
                />
              ) : (
                <Text style={styles.fieldValue}>{user.detail.address || 'No registrado'}</Text>
              )}
            </View>

            <View style={styles.fieldDivider} />

            {/* Contacto de Emergencia */}
            <View style={styles.inputGroup}>
              <Text style={styles.fieldLabel}>Contacto de emergencia</Text>
              {isEditing ? (
                <TextInput
                  style={styles.input}
                  value={extraPhone}
                  onChangeText={setExtraPhone}
                  placeholder="Ej. 221-555-0341 (Familiar)"
                  placeholderTextColor={CflColors.grisClaro}
                />
              ) : (
                <Text style={styles.fieldValue}>
                  {user.detail.extraPhone || 'Sin contacto de emergencia'}
                </Text>
              )}
            </View>

            <View style={styles.fieldDivider} />

            {/* Email Alternativo */}
            <View style={styles.inputGroup}>
              <Text style={styles.fieldLabel}>Email alternativo</Text>
              {isEditing ? (
                <TextInput
                  style={styles.input}
                  value={extraEmail}
                  onChangeText={setExtraEmail}
                  placeholder="Ej. personal@correo.com"
                  placeholderTextColor={CflColors.grisClaro}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              ) : (
                <Text style={styles.fieldValue}>
                  {user.detail.extraEmail || 'No especificado'}
                </Text>
              )}
            </View>
          </View>
        </View>

        {/* Botones de Acción */}
        <View style={styles.actionsContainer}>
          {isEditing ? (
            <View style={styles.editingButtonsRow}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={handleCancel}
                activeOpacity={0.7}
              >
                <Text style={styles.cancelButtonText}>Cancelar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.blueButton}
                onPress={handleSave}
                activeOpacity={0.8}
              >
                <Ionicons name="checkmark-outline" size={18} color={CflColors.blanco} />
                <Text style={styles.blueButtonText}>Guardar cambios</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              style={styles.blueButton}
              onPress={handleStartEditing}
              activeOpacity={0.8}
            >
              <Ionicons name="create-outline" size={18} color={CflColors.blanco} />
              <Text style={styles.blueButtonText}>Editar datos de contacto</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Nota institucional de Preceptoría */}
        <View style={styles.disclaimerBox}>
          <Ionicons name="information-circle" size={18} color={CflColors.azul} />
          <Text style={styles.disclaimerText}>
            Por reglamentación del CFL N° 404, para actualizar datos filiatorios protegidos
            (nombre, apellido, DNI o fecha de nacimiento) debes acercarte con tu documento a
            Preceptoría.
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: CflColors.fondo,
  },
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
    paddingBottom: 40,
  },
  toast: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#DCFCE7',
    borderWidth: 1,
    borderColor: '#86EFAC',
    borderRadius: 10,
    padding: 12,
    marginBottom: 16,
    gap: 8,
  },
  toastText: {
    color: '#166534',
    fontSize: 13,
    fontWeight: '600',
    flex: 1,
  },
  headerCard: {
    backgroundColor: CflColors.blanco,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: CflColors.borde,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  avatar: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: CflColors.azul,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 14,
    shadowColor: CflColors.azul,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 3,
  },
  avatarText: {
    color: CflColors.blanco,
    fontSize: 26,
    fontWeight: '700',
    letterSpacing: 1,
  },
  fullName: {
    fontSize: 20,
    fontWeight: '700',
    color: CflColors.grisOscuro,
    marginBottom: 4,
  },
  emailText: {
    fontSize: 13,
    color: CflColors.grisClaro,
    marginBottom: 14,
  },
  tagsRow: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  roleTag: {
    backgroundColor: '#EBF4FA',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 12,
  },
  roleTagText: {
    color: CflColors.azul,
    fontSize: 12,
    fontWeight: '700',
  },
  statusTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0FDF4',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    gap: 6,
  },
  statusDot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: CflColors.exito,
  },
  statusTagText: {
    color: CflColors.exito,
    fontSize: 12,
    fontWeight: '600',
  },
  verifiedTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    gap: 4,
  },
  verifiedTagText: {
    color: CflColors.grisClaro,
    fontSize: 11,
    fontWeight: '600',
  },
  sectionContainer: {
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
    paddingHorizontal: 4,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: CflColors.grisOscuro,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  card: {
    backgroundColor: CflColors.blanco,
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: CflColors.borde,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 3,
    elevation: 1,
  },
  fieldRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  fieldLabel: {
    fontSize: 13,
    color: CflColors.grisClaro,
    fontWeight: '500',
  },
  fieldValue: {
    fontSize: 14,
    color: CflColors.grisOscuro,
    fontWeight: '600',
    textAlign: 'right',
    flex: 1,
    marginLeft: 12,
  },
  fieldDivider: {
    height: 1,
    backgroundColor: CflColors.borde,
  },
  inputGroup: {
    paddingVertical: 8,
  },
  input: {
    backgroundColor: CflColors.fondo,
    borderWidth: 1,
    borderColor: CflColors.bordeActivo,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 9,
    fontSize: 14,
    color: CflColors.grisOscuro,
    marginTop: 6,
  },
  actionsContainer: {
    marginTop: 4,
    marginBottom: 16,
  },
  editingButtonsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  blueButton: {
    flex: 1,
    backgroundColor: CflColors.azul,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 14,
    borderRadius: 12,
    gap: 8,
    shadowColor: CflColors.azul,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  blueButtonText: {
    color: CflColors.blanco,
    fontSize: 15,
    fontWeight: '700',
  },
  cancelButton: {
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: CflColors.blanco,
    borderWidth: 1,
    borderColor: CflColors.borde,
    borderRadius: 12,
  },
  cancelButtonText: {
    color: CflColors.grisClaro,
    fontSize: 14,
    fontWeight: '600',
  },
  disclaimerBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#EBF4FA',
    borderRadius: 12,
    padding: 14,
    gap: 10,
  },
  disclaimerText: {
    flex: 1,
    fontSize: 12,
    color: CflColors.azul,
    lineHeight: 18,
    fontWeight: '500',
  },
});
