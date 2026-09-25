import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  SafeAreaView,
  Linking,
  Alert,
  Image,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { Palette, Typography } from '@/constants/theme';
import { MOCK_USER } from '@/constants/mocks';
import { useAuth } from '@/context/AuthContext';
import { mockCourses, Course } from '@/data/coursesData';
import SolicitudReincorporacionModal from '@/components/SolicitudReincorporacionModal';

export default function CursoDetalleScreen() {
  const params = useLocalSearchParams<{ id: string | string[] }>();
  const courseId = Array.isArray(params.id) ? params.id[0] : params.id;
  const router = useRouter();
  const { user } = useAuth();
  const [reincorporacionVisible, setReincorporacionVisible] = useState(false);

  const course: Course | undefined = mockCourses.find((c) => c.id === courseId);

  // Estado para desplegar el historial de asistencia al tocar el botón tipo barra
  const [showAttendanceHistory, setShowAttendanceHistory] = useState(true);

  if (!course) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.notFoundContainer}>
          <Ionicons name="alert-circle-outline" size={48} color={Palette.grisClaro} />
          <Text style={styles.notFoundText}>No se encontró el curso solicitado.</Text>
          <Pressable style={styles.backButton} onPress={() => router.replace('/(app)/(tabs)')}>
            <Text style={styles.backButtonText}>Volver al listado</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  // Cálculos métricos de asistencia
  const presentCount = course.attendanceHistory.filter(
    (a) => a.codeName === 'presente'
  ).length;
  const lateCount = course.attendanceHistory.filter(
    (a) => a.codeName === 'tarde'
  ).length;
  const justifiedCount = course.attendanceHistory.filter(
    (a) => a.codeName === 'justificado'
  ).length;
  const absentCount = course.attendanceHistory.filter(
    (a) => a.countsAsAbsence
  ).length;

  const remainingAbsences = Math.max(0, course.maxAbsences - course.absenceCount);
  const noAbsencesLeft = remainingAbsences === 0;
  const isNearLimit = course.absenceCount >= course.maxAbsences - 2;
  const classesDone = course.attendanceHistory.length;
  const classesTotal = course.classesQuantity;
  const coursePercent =
    classesTotal > 0 ? Math.min(100, Math.round((classesDone / classesTotal) * 100)) : 0;

  const handleOpenLink = async (url: string, label: string) => {
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert('Enlace', `No se pudo abrir ${label}. URL: ${url}`);
      }
    } catch {
      Alert.alert('Aviso', `Accediendo a: ${url}`);
    }
  };

  const getStatusBadgeStyle = (codeName: string) => {
    switch (codeName) {
      case 'presente':
        return { bg: '#DCFCE7', text: Palette.success, label: 'Presente' };
      case 'ausente':
        return { bg: '#FEE2E2', text: Palette.danger, label: 'Ausente' };
      case 'media falta':
        return { bg: '#FEF3C7', text: Palette.warning, label: 'Media Falta' };
      case 'tarde':
        return { bg: '#FEF3C7', text: Palette.warning, label: 'Tarde' };
      case 'justificado':
        return { bg: '#E0F2FE', text: Palette.info, label: 'Justificado' };
      case 'feriado':
        return { bg: '#F1F5F9', text: Palette.grisClaro, label: 'Feriado' };
      default:
        return { bg: '#F1F5F9', text: Palette.grisClaro, label: codeName };
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}>
        {/* Cabecera del Curso con Imagen de Portada y Datos Importantes en Verde */}
        <View style={styles.headerCard}>
          {/* Imagen correspondiente del curso */}
          <View style={styles.bannerImageContainer}>
            <Image
              source={course.image}
              style={styles.bannerImage}
              resizeMode="cover"
            />
          </View>

          <View style={styles.headerCardContent}>
            {/* Información importante resaltada en verde */}
            <View style={styles.statusBadgeRow}>
              <View style={styles.statusPillGreen}>
                <View style={styles.statusDotGreen} />
                <Text style={styles.statusPillTextGreen}>{course.statusName}</Text>
              </View>
              <View style={styles.roleGreenBadge}>
                <Ionicons name="checkmark-circle" size={13} color={Palette.success} />
                <Text style={styles.roleGreenBadgeText}>Alumno Regular</Text>
              </View>
              <Text style={styles.cycleText}>Ciclo 2026</Text>
            </View>

            <Text style={styles.courseName}>{course.name}</Text>
            <Text style={styles.courseDescription}>{course.description}</Text>

            {/* Docente */}
            <View style={styles.instructorBox}>
              <View style={styles.instructorAvatar}>
                <Ionicons name="person" size={18} color={Palette.azul} />
              </View>
              <View style={styles.instructorDetails}>
                <Text style={styles.instructorLabel}>DOCENTE A CARGO</Text>
                <Text style={styles.instructorName}>
                  {course.instructor.firstName} {course.instructor.lastName}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Ficha técnica de cursada */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Datos de la Cursada</Text>

          <View style={styles.infoGrid}>
            <View style={styles.infoItem}>
              <Ionicons name="calendar-outline" size={18} color={Palette.azul} />
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Días y Horarios</Text>
                <Text style={styles.infoValue}>
                  {course.days.join(', ')} • {course.startTime} a {course.endTime} hs
                </Text>
              </View>
            </View>

            <View style={styles.infoItem}>
              <Ionicons name="location-outline" size={18} color={Palette.azul} />
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Espacio Asignado</Text>
                <Text style={styles.infoValue}>{course.classroom}</Text>
              </View>
            </View>

            <View style={styles.infoItem}>
              <Ionicons name="time-outline" size={18} color={Palette.azul} />
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Carga Horaria y Período</Text>
                <Text style={styles.infoValue}>
                  {course.hourQuantity} hs reloj • {course.startDate} al {course.endDate}
                </Text>
              </View>
            </View>

            <View style={styles.infoItem}>
              <Ionicons name="ribbon-outline" size={18} color={Palette.azul} />
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Certificación Oficial</Text>
                <Text style={styles.infoValue}>
                  {course.endorsementBy || 'DGCyE — CFL 404'}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Enlaces de Comunicación y Recursos */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Canales y Recursos del Curso</Text>

          <View style={styles.actionButtonsContainer}>
            {/* Botón WhatsApp de Cursada */}
            <Pressable
              style={({ pressed }) => [
                styles.actionBtn,
                styles.whatsappBtn,
                pressed && styles.actionBtnPressed,
              ]}
              onPress={() =>
                handleOpenLink(course.whatsappGroupUrl, 'el grupo de WhatsApp')
              }>
              <Ionicons name="logo-whatsapp" size={22} color={Palette.blanco} />
              <View style={styles.actionBtnTextCol}>
                <Text style={styles.actionBtnTitleWhite}>Grupo de WhatsApp</Text>
                <Text style={styles.actionBtnSubWhite}>
                  Canal de comunicación con docente y compañeros
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color={Palette.blanco} />
            </Pressable>

            {/* Botón Recursos Académicos */}
            <Pressable
              style={({ pressed }) => [
                styles.actionBtn,
                styles.resourcesBtn,
                pressed && styles.actionBtnPressed,
              ]}
              onPress={() =>
                handleOpenLink(course.resourcesUrl, 'los recursos académicos')
              }>
              <Ionicons name="folder-open-outline" size={22} color={Palette.azul} />
              <View style={styles.actionBtnTextCol}>
                <Text style={styles.actionBtnTitleBlue}>Recursos Académicos</Text>
                <Text style={styles.actionBtnSubBlue}>
                  Apuntes, trabajos prácticos y materiales de clase
                </Text>
              </View>
              <Ionicons name="open-outline" size={18} color={Palette.azul} />
            </Pressable>
          </View>
        </View>

        {/* REQUERIMIENTO EXPLÍCITO:
            Botón "Ver asistencia" con forma de rectángulo estilo barra
            del ancho de la pantalla con los bordes redondeados. */}
        <View style={styles.sectionAttendanceButton}>
          <Pressable
            style={({ pressed }) => [
              styles.barAttendanceButton,
              pressed && styles.barAttendanceButtonPressed,
            ]}
            onPress={() => setShowAttendanceHistory((prev) => !prev)}>
            <Ionicons name="clipboard-outline" size={22} color={Palette.blanco} />
            <Text style={styles.barAttendanceButtonText}>Ver Asistencia</Text>
            <Ionicons
              name={showAttendanceHistory ? 'chevron-up' : 'chevron-down'}
              size={20}
              color={Palette.blanco}
            />
          </Pressable>
        </View>

        {/* Historial y Métricas de Asistencia y Presentismo */}
        {showAttendanceHistory && (
          <View style={styles.attendanceContainer}>
            {/* Panel de métricas de presentismo y faltas restantes */}
            <View style={styles.metricsCard}>
              <View style={styles.metricHeader}>
                <View>
                  <Text style={styles.metricTitle}>Estado de Presentismo</Text>
                  <Text style={styles.metricSubtitle}>Seguimiento de regularidad</Text>
                </View>
              </View>

              <View style={styles.courseProgressCard}>
                <View style={styles.metricHeader}>
                  <Text style={styles.metricTitle}>Avance del curso</Text>
                  <Text style={styles.metricSubtitle}>
                    {classesDone} de {classesTotal} clases
                  </Text>
                </View>
                <View style={styles.progressTrack}>
                  <View style={[styles.progressBarFill, { width: `${coursePercent}%` }]} />
                </View>
              </View>

              <View
                style={[
                  styles.remainingHighlightCard,
                  noAbsencesLeft || isNearLimit ? styles.remainingCardAlert : styles.remainingCardSuccess,
                ]}>
                <View style={[styles.availableBadge, noAbsencesLeft && styles.availableBadgeDanger]}>
                  <Text
                    style={[
                      styles.availableBadgeText,
                      noAbsencesLeft && styles.availableBadgeTextDanger,
                    ]}>
                    {remainingAbsences} faltas disponibles
                  </Text>
                </View>
                <Text style={[styles.progressLabel, noAbsencesLeft && styles.progressLabelDanger]}>
                  {course.absenceCount} de {course.maxAbsences} faltas utilizadas
                </Text>
              </View>

              {noAbsencesLeft ? (
                <Pressable
                  style={({ pressed }) => [
                    styles.reincorporationButton,
                    pressed && styles.reincorporationButtonPressed,
                  ]}
                  onPress={() => setReincorporacionVisible(true)}>
                  <Ionicons name="paper-plane" size={18} color={Palette.blanco} />
                  <Text style={styles.reincorporationButtonText}>Solicitar Reincorporación</Text>
                </Pressable>
              ) : null}

              {/* Desglose de Clases con Presentes en Verde */}
              <View style={styles.breakdownRow}>
                <View style={styles.breakdownItem}>
                  <Text style={[styles.breakdownNumber, { color: Palette.success }]}>
                    {presentCount}
                  </Text>
                  <Text style={styles.breakdownLabel}>Presentes</Text>
                </View>
                <View style={styles.breakdownDivider} />
                <View style={styles.breakdownItem}>
                  <Text style={styles.breakdownNumber}>{lateCount}</Text>
                  <Text style={styles.breakdownLabel}>Tardes</Text>
                </View>
                <View style={styles.breakdownDivider} />
                <View style={styles.breakdownItem}>
                  <Text style={[styles.breakdownNumber, { color: Palette.danger }]}>
                    {absentCount}
                  </Text>
                  <Text style={styles.breakdownLabel}>Faltas</Text>
                </View>
                <View style={styles.breakdownDivider} />
                <View style={styles.breakdownItem}>
                  <Text style={styles.breakdownNumber}>{justifiedCount}</Text>
                  <Text style={styles.breakdownLabel}>Justificadas</Text>
                </View>
              </View>
            </View>

            {/* Listado cronológico de asistencias */}
            <View style={styles.historyList}>
              <View style={styles.historyHeader}>
                <Text style={styles.historyTitle}>Registro Detallado de Clases</Text>
                <Text style={styles.historySubtitle}>
                  Registrado por el preceptor en el sistema
                </Text>
              </View>

              {course.attendanceHistory.map((item, index) => {
                const badge = getStatusBadgeStyle(item.codeName);

                return (
                  <View key={item.id || index} style={styles.historyRow}>
                    <View style={styles.historyDateCol}>
                      <Ionicons name="calendar" size={16} color={Palette.grisClaro} />
                      <Text style={styles.historyDate}>{item.date}</Text>
                    </View>

                    <View style={styles.historyDetailsCol}>
                      <View style={[styles.badgePill, { backgroundColor: badge.bg }]}>
                        <Text style={[styles.badgePillText, { color: badge.text }]}>
                          {badge.label}
                        </Text>
                      </View>
                    </View>
                  </View>
                );
              })}
            </View>

            {/* Botón hacia la Credencial QR */}
            <View style={styles.qrShortcutCard}>
              <Ionicons name="qr-code-outline" size={24} color={Palette.azul} />
              <View style={styles.qrShortcutInfo}>
                <Text style={styles.qrShortcutTitle}>Credencial de Asistencia</Text>
                <Text style={styles.qrShortcutSubtitle}>
                  Muestra tu código QR en preceptoría para acreditar tu presencia
                </Text>
              </View>
              <Pressable
                style={styles.qrShortcutButton}
                onPress={() => router.push('/(app)/(tabs)/asistencia')}>
                <Text style={styles.qrShortcutButtonText}>Ver QR</Text>
              </Pressable>
            </View>
          </View>
        )}

        {/* Espaciador inferior */}
        <View style={{ height: 32 }} />
      </ScrollView>

      <SolicitudReincorporacionModal
        visible={reincorporacionVisible}
        alumno={{
          firstName: MOCK_USER.firstName,
          lastName: MOCK_USER.lastName,
          dni: MOCK_USER.dni || 'Sin registrar',
          legajo: user?.legajo || 'Sin registrar',
          courseName: course.name,
        }}
        onClose={() => setReincorporacionVisible(false)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Palette.background,
  },
  container: {
    padding: 16,
    paddingBottom: 40,
  },
  notFoundContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  notFoundText: {
    fontFamily: Typography.fontFamily.semiBold,
    fontSize: 16,
    color: Palette.grisClaro,
    marginTop: 12,
    marginBottom: 20,
    textAlign: 'center',
  },
  backButton: {
    backgroundColor: Palette.azul,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  backButtonText: {
    fontFamily: Typography.fontFamily.bold,
    fontWeight: 'bold',
    color: Palette.blanco,
    fontSize: 14,
  },
  headerCard: {
    backgroundColor: Palette.blanco,
    borderRadius: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: Palette.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 3,
    overflow: 'hidden',
  },
  bannerImageContainer: {
    width: '100%',
    height: 180,
    backgroundColor: '#E2E8F0',
  },
  bannerImage: {
    width: '100%',
    height: '100%',
  },
  headerCardContent: {
    padding: 18,
  },
  statusBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  statusPillGreen: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#86EFAC',
  },
  statusDotGreen: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Palette.success,
    marginRight: 6,
  },
  statusPillTextGreen: {
    fontFamily: Typography.fontFamily.bold,
    fontWeight: 'bold',
    fontSize: 11,
    color: Palette.success,
  },
  roleGreenBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#86EFAC',
    gap: 4,
  },
  roleGreenBadgeText: {
    fontFamily: Typography.fontFamily.bold,
    fontWeight: 'bold',
    fontSize: 11,
    color: Palette.success,
  },
  cycleText: {
    fontFamily: Typography.fontFamily.semiBold,
    fontSize: 12,
    color: Palette.grisClaro,
    marginLeft: 'auto',
  },
  courseName: {
    fontFamily: Typography.fontFamily.bold,
    fontSize: 22,
    fontWeight: 'bold',
    color: Palette.grisOscuro,
    marginBottom: 10,
    lineHeight: 28,
  },
  courseDescription: {
    fontFamily: Typography.fontFamily.regular,
    fontSize: 14,
    color: Palette.grisOscuro,
    lineHeight: 20,
    marginBottom: 16,
  },
  instructorBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Palette.surfaceSubtle,
    borderRadius: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: Palette.border,
  },
  instructorAvatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#EBF5FB',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  instructorDetails: {
    flex: 1,
  },
  instructorLabel: {
    fontFamily: Typography.fontFamily.semiBold,
    fontSize: 10,
    color: Palette.grisClaro,
    letterSpacing: 0.5,
  },
  instructorName: {
    fontFamily: Typography.fontFamily.bold,
    fontWeight: 'bold',
    fontSize: 14,
    color: Palette.grisOscuro,
  },
  instructorEmail: {
    fontFamily: Typography.fontFamily.regular,
    fontSize: 12,
    color: Palette.azul,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontFamily: Typography.fontFamily.bold,
    fontSize: 17,
    fontWeight: 'bold',
    color: Palette.grisOscuro,
    marginBottom: 12,
  },
  infoGrid: {
    backgroundColor: Palette.blanco,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Palette.border,
    paddingHorizontal: 14,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Palette.surfaceSubtle,
  },
  infoContent: {
    marginLeft: 12,
    flex: 1,
  },
  infoLabel: {
    fontFamily: Typography.fontFamily.semiBold,
    fontSize: 12,
    color: Palette.grisClaro,
    marginBottom: 2,
  },
  infoValue: {
    fontFamily: Typography.fontFamily.regular,
    fontSize: 14,
    color: Palette.grisOscuro,
  },
  actionButtonsContainer: {
    gap: 12,
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
  },
  actionBtnPressed: {
    opacity: 0.88,
    transform: [{ scale: 0.99 }],
  },
  whatsappBtn: {
    backgroundColor: '#25D366',
    borderColor: '#20BA5A',
  },
  resourcesBtn: {
    backgroundColor: Palette.blanco,
    borderColor: Palette.border,
  },
  actionBtnTextCol: {
    flex: 1,
    marginLeft: 14,
  },
  actionBtnTitleWhite: {
    fontFamily: Typography.fontFamily.bold,
    fontWeight: 'bold',
    fontSize: 15,
    color: Palette.blanco,
  },
  actionBtnSubWhite: {
    fontFamily: Typography.fontFamily.regular,
    fontSize: 12,
    color: '#E8F8F0',
    marginTop: 2,
  },
  actionBtnTitleBlue: {
    fontFamily: Typography.fontFamily.bold,
    fontWeight: 'bold',
    fontSize: 15,
    color: Palette.azul,
  },
  actionBtnSubBlue: {
    fontFamily: Typography.fontFamily.regular,
    fontSize: 12,
    color: Palette.grisClaro,
    marginTop: 2,
  },

  /* REQUERIMIENTO EXPLÍCITO: Botón barra de ancho completo con bordes redondeados */
  sectionAttendanceButton: {
    marginVertical: 14,
    width: '100%',
  },
  barAttendanceButton: {
    width: '100%',
    backgroundColor: Palette.azul,
    borderRadius: 14,
    paddingVertical: 16,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 3,
    shadowColor: Palette.azul,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
  },
  barAttendanceButtonPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.995 }],
  },
  barAttendanceButtonText: {
    fontFamily: Typography.fontFamily.bold,
    fontWeight: 'bold',
    fontSize: 17,
    color: Palette.blanco,
    letterSpacing: 0.5,
  },

  /* Contenedor del Historial */
  attendanceContainer: {
    marginTop: 6,
  },
  metricsCard: {
    backgroundColor: Palette.blanco,
    borderRadius: 14,
    padding: 18,
    borderWidth: 1,
    borderColor: Palette.border,
    marginBottom: 16,
  },
  metricHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  metricTitle: {
    fontFamily: Typography.fontFamily.bold,
    fontWeight: 'bold',
    fontSize: 16,
    color: Palette.grisOscuro,
  },
  metricSubtitle: {
    fontFamily: Typography.fontFamily.regular,
    fontSize: 12,
    color: Palette.grisClaro,
    marginTop: 1,
  },

  /* Recuadro notable de faltas restantes */
  remainingHighlightCard: {
    borderRadius: 14,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1.5,
    alignItems: 'center',
  },
  remainingCardSuccess: {
    backgroundColor: '#F0FDF4',
    borderColor: '#86EFAC',
  },
  remainingCardAlert: {
    backgroundColor: '#FEF2F2',
    borderColor: '#FCA5A5',
  },
  availableBadge: {
    alignSelf: 'center',
    backgroundColor: '#DCFCE7',
    borderWidth: 1,
    borderColor: '#166534',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginBottom: 8,
  },
  availableBadgeText: {
    fontFamily: Typography.fontFamily.bold,
    fontWeight: '700',
    fontSize: 12,
    color: '#15803D',
  },
  availableBadgeDanger: {
    backgroundColor: '#FEE2E2',
    borderColor: Palette.danger,
  },
  availableBadgeTextDanger: {
    color: Palette.danger,
  },
  progressLabelDanger: {
    color: Palette.danger,
    fontFamily: Typography.fontFamily.bold,
    fontWeight: '700',
  },
  reincorporationButton: {
    width: '100%',
    backgroundColor: Palette.azul,
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 16,
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
  reincorporationButtonPressed: {
    opacity: 0.9,
  },
  reincorporationButtonText: {
    fontFamily: Typography.fontFamily.bold,
    fontWeight: 'bold',
    fontSize: 16,
    color: Palette.blanco,
  },
  remainingCardTop: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 12,
  },
  remainingIconBox: {
    width: 46,
    height: 46,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  remainingIconBoxSuccess: {
    backgroundColor: '#DCFCE7',
  },
  remainingIconBoxAlert: {
    backgroundColor: '#FEE2E2',
  },
  remainingContentCol: {
    flex: 1,
  },
  remainingCardTag: {
    fontFamily: Typography.fontFamily.bold,
    fontWeight: 'bold',
    fontSize: 11,
    color: Palette.grisClaro,
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  remainingBigNumber: {
    fontFamily: Typography.fontFamily.extraBold,
    fontWeight: '800',
    fontSize: 22,
    letterSpacing: 0.5,
  },
  progressTrack: {
    height: 8,
    borderRadius: 4,
    backgroundColor: '#E2E8F0',
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 4,
    backgroundColor: Palette.azul,
  },
  progressTextRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  progressLabel: {
    fontFamily: Typography.fontFamily.regular,
    fontSize: 12,
    color: Palette.grisOscuro,
    textAlign: 'center',
  },
  progressLabelBold: {
    fontFamily: Typography.fontFamily.bold,
    fontWeight: 'bold',
  },
  progressRemainingLabel: {
    fontFamily: Typography.fontFamily.bold,
    fontWeight: 'bold',
    fontSize: 12,
  },
  breakdownRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingTop: 14,
    borderTopWidth: 1,
    borderTopColor: Palette.border,
  },
  breakdownItem: {
    alignItems: 'center',
  },
  breakdownNumber: {
    fontFamily: Typography.fontFamily.bold,
    fontWeight: 'bold',
    fontSize: 18,
    color: Palette.azul,
    marginBottom: 2,
  },
  breakdownLabel: {
    fontFamily: Typography.fontFamily.regular,
    fontSize: 11,
    color: Palette.grisClaro,
  },
  breakdownDivider: {
    width: 1,
    height: 24,
    backgroundColor: Palette.border,
  },
  historyList: {
    backgroundColor: Palette.blanco,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: Palette.border,
    padding: 16,
    marginBottom: 16,
  },
  historyHeader: {
    marginBottom: 14,
  },
  historyTitle: {
    fontFamily: Typography.fontFamily.bold,
    fontWeight: 'bold',
    fontSize: 15,
    color: Palette.grisOscuro,
  },
  historySubtitle: {
    fontFamily: Typography.fontFamily.regular,
    fontSize: 12,
    color: Palette.grisClaro,
    marginTop: 2,
  },
  historyRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: Palette.surfaceSubtle,
  },
  historyDateCol: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 110,
  },
  historyDate: {
    fontFamily: Typography.fontFamily.semiBold,
    fontSize: 13,
    color: Palette.grisOscuro,
    marginLeft: 6,
  },
  historyDetailsCol: {
    flex: 1,
    marginLeft: 8,
    alignItems: 'flex-end',
  },
  badgePill: {
    alignSelf: 'flex-end',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  badgePillText: {
    fontFamily: Typography.fontFamily.bold,
    fontWeight: 'bold',
    fontSize: 10,
  },
  countsAsAbsenceHint: {
    fontFamily: Typography.fontFamily.regular,
    fontSize: 11,
    color: Palette.danger,
    marginLeft: 6,
  },
  historyNote: {
    fontFamily: Typography.fontFamily.regular,
    fontSize: 12,
    color: Palette.grisClaro,
    marginTop: 4,
    fontStyle: 'italic',
  },
  qrShortcutCard: {
    backgroundColor: '#EBF5FB',
    borderRadius: 12,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D4E6F1',
  },
  qrShortcutInfo: {
    flex: 1,
    marginLeft: 12,
    marginRight: 8,
  },
  qrShortcutTitle: {
    fontFamily: Typography.fontFamily.bold,
    fontWeight: 'bold',
    fontSize: 13,
    color: Palette.azul,
  },
  qrShortcutSubtitle: {
    fontFamily: Typography.fontFamily.regular,
    fontSize: 11,
    color: Palette.grisOscuro,
    marginTop: 2,
  },
  qrShortcutButton: {
    backgroundColor: Palette.azul,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  qrShortcutButtonText: {
    fontFamily: Typography.fontFamily.bold,
    fontWeight: 'bold',
    fontSize: 12,
    color: Palette.blanco,
  },
});