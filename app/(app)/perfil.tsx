import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { CflColors } from '@/constants/theme';
import { MOCK_USER } from '@/constants/mocks';

export default function PerfilScreen() {
  const user = MOCK_USER;

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

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Card Principal con Gradiente de Azul a Celeste */}
      <LinearGradient
        colors={[CflColors.azul, CflColors.celeste]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.headerCard}
      >
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
      </LinearGradient>

      {/* Sección 1: Información Personal (Incluye Escolaridad) */}
      <View style={styles.sectionContainer}>
        <View style={styles.sectionHeader}>
          <Ionicons name="person-circle-outline" size={20} color={CflColors.azul} />
          <Text style={styles.sectionTitle}>Información Personal</Text>
        </View>

        <View style={styles.card}>
          {/* DNI */}
          <View style={styles.fieldRow}>
            <View style={styles.fieldIconContainer}>
              <Ionicons name="card-outline" size={18} color={CflColors.azul} />
            </View>
            <View style={styles.fieldTextContainer}>
              <Text style={styles.fieldLabel}>DNI / Documento</Text>
              <Text style={styles.fieldValue}>{user.dni || 'Sin registrar'}</Text>
            </View>
          </View>

          <View style={styles.fieldDivider} />

          {/* Fecha de Nacimiento */}
          <View style={styles.fieldRow}>
            <View style={styles.fieldIconContainer}>
              <Ionicons name="calendar-outline" size={18} color={CflColors.azul} />
            </View>
            <View style={styles.fieldTextContainer}>
              <Text style={styles.fieldLabel}>Fecha de Nacimiento</Text>
              <Text style={styles.fieldValue}>{formatBirthDate(user.detail.dob)}</Text>
            </View>
          </View>

          <View style={styles.fieldDivider} />

          {/* Género */}
          <View style={styles.fieldRow}>
            <View style={styles.fieldIconContainer}>
              <Ionicons name="person-outline" size={18} color={CflColors.azul} />
            </View>
            <View style={styles.fieldTextContainer}>
              <Text style={styles.fieldLabel}>Género</Text>
              <Text style={styles.fieldValue}>{user.detail.gender || 'No especificado'}</Text>
            </View>
          </View>

          <View style={styles.fieldDivider} />

          {/* Nacionalidad */}
          <View style={styles.fieldRow}>
            <View style={styles.fieldIconContainer}>
              <Ionicons name="globe-outline" size={18} color={CflColors.azul} />
            </View>
            <View style={styles.fieldTextContainer}>
              <Text style={styles.fieldLabel}>Nacionalidad</Text>
              <Text style={styles.fieldValue}>{user.detail.nacionality || 'Argentina'}</Text>
            </View>
          </View>

          <View style={styles.fieldDivider} />

          {/* Escolaridad */}
          <View style={styles.fieldRow}>
            <View style={styles.fieldIconContainer}>
              <Ionicons name="school-outline" size={18} color={CflColors.azul} />
            </View>
            <View style={styles.fieldTextContainer}>
              <Text style={styles.fieldLabel}>Escolaridad</Text>
              <Text style={styles.fieldValue}>
                {user.detail.academicLevel || 'Secundario completo'}
              </Text>
            </View>
          </View>

          <View style={styles.fieldDivider} />

          {/* Correo Institucional */}
          <View style={styles.fieldRow}>
            <View style={styles.fieldIconContainer}>
              <Ionicons name="mail-outline" size={18} color={CflColors.azul} />
            </View>
            <View style={styles.fieldTextContainer}>
              <Text style={styles.fieldLabel}>Correo institucional</Text>
              <Text style={styles.fieldValue}>{user.email}</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Sección 2: Contactos */}
      <View style={styles.sectionContainer}>
        <View style={styles.sectionHeader}>
          <Ionicons name="call-outline" size={20} color={CflColors.azul} />
          <Text style={styles.sectionTitle}>Contactos</Text>
        </View>

        <View style={styles.card}>
          {/* Teléfono Personal */}
          <View style={styles.fieldRow}>
            <View style={styles.fieldIconContainer}>
              <Ionicons name="call-outline" size={18} color={CflColors.azul} />
            </View>
            <View style={styles.fieldTextContainer}>
              <Text style={styles.fieldLabel}>Teléfono personal</Text>
              <Text style={styles.fieldValue}>{user.detail.phone || 'No registrado'}</Text>
            </View>
          </View>

          <View style={styles.fieldDivider} />

          {/* Domicilio */}
          <View style={styles.fieldRow}>
            <View style={styles.fieldIconContainer}>
              <Ionicons name="location-outline" size={18} color={CflColors.azul} />
            </View>
            <View style={styles.fieldTextContainer}>
              <Text style={styles.fieldLabel}>Domicilio</Text>
              <Text style={styles.fieldValue}>{user.detail.address || 'No registrado'}</Text>
            </View>
          </View>

          <View style={styles.fieldDivider} />

          {/* Contacto de Emergencia */}
          <View style={styles.fieldRow}>
            <View style={styles.fieldIconContainer}>
              <Ionicons name="alert-circle-outline" size={18} color={CflColors.azul} />
            </View>
            <View style={styles.fieldTextContainer}>
              <Text style={styles.fieldLabel}>Contacto de emergencia</Text>
              <Text style={styles.fieldValue}>
                {user.detail.extraPhone || 'Sin contacto de emergencia'}
              </Text>
            </View>
          </View>

          <View style={styles.fieldDivider} />

          {/* Correo Alternativo */}
          <View style={styles.fieldRow}>
            <View style={styles.fieldIconContainer}>
              <Ionicons name="at-outline" size={18} color={CflColors.azul} />
            </View>
            <View style={styles.fieldTextContainer}>
              <Text style={styles.fieldLabel}>Correo alternativo</Text>
              <Text style={styles.fieldValue}>
                {user.detail.extraEmail || 'No especificado'}
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* Nota institucional de no edición de datos dados de alta */}
      <View style={styles.disclaimerBox}>
        <Ionicons name="lock-closed" size={18} color={CflColors.azul} />
        <Text style={styles.disclaimerText}>
          Los datos del alumno quedan registrados de forma definitiva al momento del alta
          institucional. Para solicitar modificaciones de información personal o de contacto,
          acérquese a Preceptoría con su documento.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CflColors.fondo,
  },
  content: {
    padding: 16,
    paddingBottom: 40,
  },
  headerCard: {
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    marginBottom: 22,
    shadowColor: CflColors.azul,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 10,
    elevation: 4,
  },
  avatar: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: CflColors.blanco,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  avatarText: {
    color: CflColors.azul,
    fontSize: 26,
    fontWeight: '800',
    letterSpacing: 1,
  },
  fullName: {
    fontSize: 21,
    fontWeight: '800',
    color: CflColors.blanco,
    marginBottom: 4,
    textAlign: 'center',
  },
  emailText: {
    fontSize: 13,
    color: '#E0F2FE',
    fontWeight: '500',
    marginBottom: 16,
    textAlign: 'center',
  },
  tagsRow: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  roleTag: {
    backgroundColor: 'rgba(255, 255, 255, 0.92)',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 12,
  },
  roleTagText: {
    color: CflColors.azul,
    fontSize: 12,
    fontWeight: '800',
  },
  statusTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.92)',
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
    fontWeight: '700',
  },
  verifiedTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.92)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    gap: 4,
  },
  verifiedTagText: {
    color: CflColors.azul,
    fontSize: 11,
    fontWeight: '700',
  },
  sectionContainer: {
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 10,
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
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 4,
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
    alignItems: 'flex-start',
    paddingVertical: 12,
    gap: 12,
  },
  fieldIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#EBF4FA',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 2,
  },
  fieldTextContainer: {
    flex: 1,
  },
  fieldLabel: {
    fontSize: 11,
    color: CflColors.grisClaro,
    fontWeight: '600',
    marginBottom: 3,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  fieldValue: {
    fontSize: 14,
    color: CflColors.grisOscuro,
    fontWeight: '600',
    lineHeight: 20,
  },
  fieldDivider: {
    height: 1,
    backgroundColor: CflColors.borde,
  },
  disclaimerBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#EBF4FA',
    borderRadius: 14,
    padding: 14,
    gap: 10,
    marginTop: 4,
    borderWidth: 1,
    borderColor: '#D4E7F5',
  },
  disclaimerText: {
    flex: 1,
    fontSize: 12,
    color: CflColors.azul,
    lineHeight: 18,
    fontWeight: '500',
  },
});
