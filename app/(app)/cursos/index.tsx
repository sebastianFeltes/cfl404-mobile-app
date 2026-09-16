import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  SafeAreaView,
  Image,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { Palette, Typography } from '@/constants/theme';
import { mockCourses, currentStudent } from '@/data/coursesData';

export default function CursosIndexScreen() {
  const router = useRouter();

  // Acumulador de todas las notificaciones de cursada
  const allNotifications = mockCourses.flatMap((c) =>
    c.notifications.map((n) => ({ ...n, courseName: c.name, courseId: c.id }))
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}>
        {/* Cabecera de Alumno con datos en mayúsculas/negrita, DNI, ciclo lectivo con año y círculo más grande */}
        <View style={styles.studentBanner}>
          <View style={styles.studentBannerHeader}>
            <View style={styles.studentAvatarBox}>
              {currentStudent.profilePhotoUrl ? (
                <Image
                  source={{ uri: currentStudent.profilePhotoUrl }}
                  style={styles.studentAvatarImage}
                />
              ) : (
                <Ionicons name="person" size={32} color={Palette.azul} />
              )}
            </View>
            <View style={styles.studentHeaderDetails}>
              <Text style={styles.studentName}>
                {currentStudent.firstName.toUpperCase()} {currentStudent.lastName.toUpperCase()}
              </Text>
              <Text style={styles.studentMetaText}>
                DNI: {currentStudent.dni}
              </Text>
              <Text style={styles.studentMetaText}>
                Ciclo Lectivo: 2026
              </Text>
            </View>
          </View>

          {/* Ventanas de estado: Alumno Regular y Cursos Activos (separadas con espacio dedicado) */}
          <View style={styles.statusWindowsRow}>
            {/* Ventana Alumno Regular */}
            <View style={styles.roleGreenBadge}>
              <View style={styles.statusWindowHeader}>
                <Ionicons name="checkmark-circle" size={15} color={Palette.success} />
                <Text style={styles.roleGreenBadgeTag}>ESTADO</Text>
              </View>
              <Text style={styles.roleGreenBadgeText}>Alumno Regular</Text>
              <Text style={styles.roleGreenBadgeSub}>{currentStudent.cycleLabel}</Text>
            </View>

            {/* Ventana Cursos Activos */}
            <View style={styles.badgeActiveGreen}>
              <View style={styles.statusWindowHeader}>
                <Ionicons name="school" size={15} color={Palette.success} />
                <Text style={styles.badgeActiveGreenTag}>CURSADAS</Text>
              </View>
              <Text style={styles.badgeActiveGreenText}>
                {mockCourses.length} {mockCourses.length === 1 ? 'Curso Activo' : 'Cursos Activos'}
              </Text>
              <Text style={styles.badgeActiveGreenSub}>Inscripción 2026</Text>
            </View>
          </View>
        </View>

        {/* Sección de Avisos y Novedades sombreados de color amarillo */}
        {allNotifications.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <View style={styles.sectionIconYellowBox}>
                <Ionicons name="notifications" size={18} color="#D97706" />
              </View>
              <Text style={styles.sectionTitle}>Avisos y Novedades</Text>
            </View>

            {allNotifications.map((notif) => (
              <Pressable
                key={notif.id}
                style={styles.notificationCardYellow}
                onPress={() => router.push(`/(app)/cursos/${notif.courseId}`)}>
                <View style={styles.notificationHeader}>
                  <View style={styles.notificationTagYellow}>
                    <Ionicons name="alert-circle" size={11} color="#854D0E" style={{ marginRight: 3 }} />
                    <Text style={styles.notificationTagYellowText}>
                      {notif.type.toUpperCase()}
                    </Text>
                  </View>
                  <Text style={styles.notificationDateYellow}>{notif.date}</Text>
                </View>
                <Text style={styles.notificationTitle}>{notif.title}</Text>
                <Text style={styles.notificationMessage}>{notif.message}</Text>
                <View style={styles.notificationFooterRow}>
                  <Text style={styles.notificationCourseName}>
                    Curso: {notif.courseName}
                  </Text>
                  <Ionicons name="chevron-forward" size={14} color="#B45309" />
                </View>
              </Pressable>
            ))}
          </View>
        )}

        {/* Sección de Cursos Inscritos con imágenes correspondientes y datos importantes en verde */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionIconBlueBox}>
              <Ionicons name="school" size={18} color={Palette.azul} />
            </View>
            <Text style={styles.sectionTitle}>Mis Cursos Asignados</Text>
          </View>

          {mockCourses.map((course) => {
            const isNearLimit = course.absenceCount >= course.maxAbsences - 2;

            return (
              <Pressable
                key={course.id}
                style={({ pressed }) => [
                  styles.courseCard,
                  pressed && styles.courseCardPressed,
                ]}
                onPress={() => router.push(`/(app)/cursos/${course.id}`)}>
                {/* Imagen correspondiente al curso */}
                <View style={styles.imageWrapper}>
                  <Image
                    source={course.image}
                    style={styles.courseBannerImage}
                    resizeMode="cover"
                  />
                  {/* Badges sobre la imagen */}
                  <View style={styles.imageOverlayRow}>
                    {/* Información importante resaltada en verde */}
                    <View style={styles.statusPillGreen}>
                      <View style={styles.statusDotGreen} />
                      <Text style={styles.statusTextGreen}>{course.statusName}</Text>
                    </View>

                    <View style={styles.regularBadgeGreen}>
                      <Ionicons name="shield-checkmark" size={12} color={Palette.success} />
                      <Text style={styles.regularBadgeGreenText}>Regular</Text>
                    </View>
                  </View>
                </View>

                {/* Contenido de la tarjeta */}
                <View style={styles.courseBody}>
                  {/* Título del curso */}
                  <Text style={styles.courseTitle}>{course.name}</Text>
                  <Text style={styles.instructorText}>
                    Docente:{' '}
                    <Text style={styles.instructorBold}>
                      {course.instructor.firstName} {course.instructor.lastName}
                    </Text>
                  </Text>

                  {/* Resumen de inasistencias resaltado con verde si está al día */}
                  <View style={styles.importantInfoRow}>
                    <View
                      style={[
                        styles.absencePill,
                        isNearLimit ? styles.absencePillWarning : styles.absencePillGreen,
                      ]}>
                      <Ionicons
                        name={isNearLimit ? 'alert-circle' : 'checkmark-circle'}
                        size={15}
                        color={isNearLimit ? Palette.warning : Palette.success}
                        style={{ marginRight: 5 }}
                      />
                      <Text
                        style={[
                          styles.absencePillText,
                          isNearLimit
                            ? { color: Palette.warning }
                            : styles.absencePillTextGreen,
                        ]}>
                        Faltas: {course.absenceCount} / {course.maxAbsences} ({course.maxAbsences - course.absenceCount} disponibles)
                      </Text>
                    </View>
                  </View>

                  {/* Info rápida: Días, Horarios y Aula */}
                  <View style={styles.metaContainer}>
                    <View style={styles.metaRow}>
                      <Ionicons name="calendar-outline" size={15} color={Palette.grisClaro} />
                      <Text style={styles.metaText}>
                        {course.days.join(' y ')} • {course.startTime} a {course.endTime} hs
                      </Text>
                    </View>
                    <View style={styles.metaRow}>
                      <Ionicons name="location-outline" size={15} color={Palette.grisClaro} />
                      <Text style={styles.metaText}>{course.classroom}</Text>
                    </View>
                  </View>

                  {/* Footer de la tarjeta */}
                  <View style={styles.cardFooter}>
                    <Text style={styles.cardFooterHint}>
                      Ver asistencia, recursos y grupo de WhatsApp
                    </Text>
                    <View style={styles.cardArrow}>
                      <Ionicons name="arrow-forward" size={16} color={Palette.azul} />
                    </View>
                  </View>
                </View>
              </Pressable>
            );
          })}
        </View>

        {/* Nota institucional al pie */}
        <View style={styles.footerNote}>
          <Text style={styles.footerNoteText}>
            Centro de Formación Laboral N.º 404 — Dirección General de Cultura y Educación
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
=======
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { CflColors } from '@/constants/theme';
import { MOCK_CURSOS, MOCK_NOTIFICACIONES, CourseItem, CourseNotification } from '@/constants/mocks';

type TabType = 'cursos' | 'notificaciones';

export default function CursosScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabType>('cursos');

  const formatNotificationDate = (isoDate: string) => {
    const date = new Date(isoDate);
    return date.toLocaleDateString('es-AR', {
      day: '2-digit',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getNotificationBadge = (type: CourseNotification['type']) => {
    switch (type) {
      case 'examen':
        return { bg: '#FEF3C7', color: '#B45309', label: 'Evaluación' };
      case 'urgente':
        return { bg: '#FEE2E2', color: '#B91C1C', label: 'Urgente' };
      case 'clase':
        return { bg: '#E0F2FE', color: '#0369A1', label: 'Material' };
      case 'aviso':
      default:
        return { bg: '#EBF4FA', color: CflColors.azul, label: 'Aviso general' };
    }
  };

  return (
    <View style={styles.container}>
      {/* Selector de pestañas superiores */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'cursos' && styles.tabButtonActive]}
          onPress={() => setActiveTab('cursos')}
          activeOpacity={0.8}
        >
          <Ionicons
            name="book"
            size={18}
            color={activeTab === 'cursos' ? CflColors.azul : CflColors.grisClaro}
          />
          <Text
            style={[styles.tabButtonText, activeTab === 'cursos' && styles.tabButtonTextActive]}
          >
            Mis Cursos ({MOCK_CURSOS.length})
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'notificaciones' && styles.tabButtonActive]}
          onPress={() => setActiveTab('notificaciones')}
          activeOpacity={0.8}
        >
          <Ionicons
            name="notifications"
            size={18}
            color={activeTab === 'notificaciones' ? CflColors.azul : CflColors.grisClaro}
          />
          <Text
            style={[
              styles.tabButtonText,
              activeTab === 'notificaciones' && styles.tabButtonTextActive,
            ]}
          >
            Avisos ({MOCK_NOTIFICACIONES.length})
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Pestaña: Mis Cursos */}
        {activeTab === 'cursos' && (
          <View>
            <View style={styles.tabIntroRow}>
              <Text style={styles.tabIntroTitle}>Cursadas activas — Ciclo 2026</Text>
              <Text style={styles.tabIntroSubtitle}>
                Consulta el estado, horarios y límites de inasistencia
              </Text>
            </View>

            {MOCK_CURSOS.map((item: CourseItem) => {
              const remainingAbsences = item.absenceLimit - item.absenceCount;
              const attendancePercent = Math.round(
                (item.attendanceSummary.present /
                  (item.attendanceSummary.present + item.attendanceSummary.absent)) *
                  100
              );

              return (
                <TouchableOpacity
                  key={item.userCourseId}
                  style={styles.courseCard}
                  activeOpacity={0.85}
                  onPress={() =>
                    router.push({
                      pathname: '/(app)/cursos/[id]',
                      params: { id: item.course.id },
                    })
                  }
                >
                  {/* Cabecera de la tarjeta */}
                  <View style={styles.cardHeader}>
                    <View style={styles.courseTitleContainer}>
                      <Text style={styles.courseName}>{item.course.name}</Text>
                      <Text style={styles.instructorName}>
                        Docente: {item.course.instructor.firstName}{' '}
                        {item.course.instructor.lastName}
                      </Text>
                    </View>
                    <View style={styles.activeBadge}>
                      <Text style={styles.activeBadgeText}>{item.course.status.name}</Text>
                    </View>
                  </View>

                  <View style={styles.divider} />

                  {/* Datos de cursada */}
                  <View style={styles.detailsGrid}>
                    <View style={styles.detailItem}>
                      <Ionicons name="calendar-outline" size={16} color={CflColors.azul} />
                      <Text style={styles.detailText}>{item.days.join(' y ')}</Text>
                    </View>

                    <View style={styles.detailItem}>
                      <Ionicons name="time-outline" size={16} color={CflColors.azul} />
                      <Text style={styles.detailText}>
                        {item.course.startTime} a {item.course.endTime} hs
                      </Text>
                    </View>

                    <View style={styles.detailItem}>
                      <Ionicons name="location-outline" size={16} color={CflColors.azul} />
                      <Text style={styles.detailText}>{item.classroom}</Text>
                    </View>

                    <View style={styles.detailItem}>
                      <Ionicons name="ribbon-outline" size={16} color={CflColors.azul} />
                      <Text style={styles.detailText}>
                        {item.course.courseDetail.hourQuantity} hs cátedra
                      </Text>
                    </View>
                  </View>

                  {/* Resumen de Asistencia */}
                  <View style={styles.attendanceBox}>
                    <View style={styles.attendanceHeader}>
                      <Text style={styles.attendanceLabel}>Presentismo registrado</Text>
                      <Text style={styles.attendancePercentage}>{attendancePercent}%</Text>
                    </View>

                    {/* Barra de progreso de asistencia */}
                    <View style={styles.progressBarBackground}>
                      <View
                        style={[
                          styles.progressBarFill,
                          {
                            width: `${Math.min(attendancePercent, 100)}%`,
                            backgroundColor:
                              remainingAbsences <= 2 ? CflColors.peligro : CflColors.azul,
                          },
                        ]}
                      />
                    </View>

                    <View style={styles.attendanceFooter}>
                      <Text style={styles.absenceText}>
                        Faltas: <Text style={styles.boldText}>{item.absenceCount}</Text> de{' '}
                        {item.absenceLimit} máx.
                      </Text>
                      <Text
                        style={[
                          styles.remainingAbsenceText,
                          remainingAbsences <= 2 && styles.urgentAbsenceText,
                        ]}
                      >
                        {remainingAbsences > 0
                          ? `Te restan ${remainingAbsences} falta${remainingAbsences > 1 ? 's' : ''}`
                          : 'Límite alcanzado'}
                      </Text>
                    </View>
                  </View>

                  {/* Aviso particular si existe */}
                  {item.notification && (
                    <View style={styles.courseAlertBanner}>
                      <Ionicons name="megaphone-outline" size={16} color={CflColors.azul} />
                      <Text style={styles.courseAlertText}>{item.notification}</Text>
                    </View>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        )}

        {/* Pestaña: Avisos y Notificaciones */}
        {activeTab === 'notificaciones' && (
          <View>
            <View style={styles.tabIntroRow}>
              <Text style={styles.tabIntroTitle}>Novedades y Avisos de Cursada</Text>
              <Text style={styles.tabIntroSubtitle}>
                Comunicaciones importantes de docentes y directivos
              </Text>
            </View>

            {MOCK_NOTIFICACIONES.map((notif: CourseNotification) => {
              const badge = getNotificationBadge(notif.type);

              return (
                <View key={notif.id} style={styles.notifCard}>
                  <View style={styles.notifHeader}>
                    <View style={[styles.typeBadge, { backgroundColor: badge.bg }]}>
                      <Text style={[styles.typeBadgeText, { color: badge.color }]}>
                        {badge.label}
                      </Text>
                    </View>
                    <Text style={styles.notifDate}>{formatNotificationDate(notif.date)}</Text>
                  </View>

                  <Text style={styles.notifCourse}>{notif.courseName}</Text>
                  <Text style={styles.notifTitle}>{notif.title}</Text>
                  <Text style={styles.notifMessage}>{notif.message}</Text>
                </View>
              );
            })}
          </View>
        )}
      </ScrollView>
    </View>
>>>>>>> origin/main
  );
}

const styles = StyleSheet.create({
<<<<<<< HEAD
  safeArea: {
    flex: 1,
    backgroundColor: Palette.background,
  },
  container: {
    padding: 16,
    paddingBottom: 40,
  },
  studentBanner: {
    backgroundColor: Palette.blanco,
    borderRadius: 14,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: Palette.border,
=======
  container: {
    flex: 1,
    backgroundColor: CflColors.fondo,
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: CflColors.blanco,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: CflColors.borde,
    gap: 12,
  },
  tabButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: CflColors.fondo,
    gap: 8,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  tabButtonActive: {
    backgroundColor: '#EBF4FA',
    borderColor: CflColors.azul,
  },
  tabButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: CflColors.grisClaro,
  },
  tabButtonTextActive: {
    color: CflColors.azul,
    fontWeight: '700',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  tabIntroRow: {
    marginBottom: 16,
  },
  tabIntroTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: CflColors.grisOscuro,
    marginBottom: 4,
  },
  tabIntroSubtitle: {
    fontSize: 13,
    color: CflColors.grisClaro,
  },
  courseCard: {
    backgroundColor: CflColors.blanco,
    borderRadius: 14,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: CflColors.borde,
>>>>>>> origin/main
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
<<<<<<< HEAD
  studentBannerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  studentAvatarBox: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#EBF5FB',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  studentHeaderDetails: {
    flex: 1,
  },
  studentGreeting: {
    fontFamily: Typography.fontFamily.bold,
    fontSize: 16,
    fontWeight: 'bold',
    color: Palette.grisOscuro,
  },
  studentDniText: {
    fontFamily: Typography.fontFamily.regular,
    fontSize: 12,
    color: Palette.grisClaro,
    marginTop: 2,
  },
  /* Fila de Ventanas de Estado: Alumno Regular y Cursos Activos separadas y sin superposición */
  statusWindowsRow: {
    flexDirection: 'row',
    gap: 10,
  },
  /* Ventana Alumno Regular resaltada en verde */
  roleGreenBadge: {
    flex: 1,
    backgroundColor: '#DCFCE7',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#86EFAC',
  },
  statusWindowHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 3,
  },
  roleGreenBadgeTag: {
    fontFamily: Typography.fontFamily.bold,
    fontWeight: 'bold',
    fontSize: 10,
    color: Palette.success,
    letterSpacing: 0.4,
  },
  roleGreenBadgeText: {
    fontFamily: Typography.fontFamily.bold,
    fontWeight: 'bold',
    fontSize: 13,
    color: Palette.grisOscuro,
  },
  roleGreenBadgeSub: {
    fontFamily: Typography.fontFamily.regular,
    fontSize: 11,
    color: Palette.grisClaro,
    marginTop: 1,
  },
  /* Ventana Cursos Activos resaltada en verde */
  badgeActiveGreen: {
    flex: 1,
    backgroundColor: '#DCFCE7',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#86EFAC',
  },
  badgeActiveGreenTag: {
    fontFamily: Typography.fontFamily.bold,
    fontWeight: 'bold',
    fontSize: 10,
    color: Palette.success,
    letterSpacing: 0.4,
  },
  badgeActiveGreenText: {
    fontFamily: Typography.fontFamily.bold,
    fontWeight: 'bold',
    fontSize: 13,
    color: Palette.grisOscuro,
  },
  badgeActiveGreenSub: {
    fontFamily: Typography.fontFamily.regular,
    fontSize: 11,
    color: Palette.grisClaro,
    marginTop: 1,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionIconYellowBox: {
    width: 28,
    height: 28,
    borderRadius: 7,
    backgroundColor: '#FEF3C7',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  sectionIconBlueBox: {
    width: 28,
    height: 28,
    borderRadius: 7,
    backgroundColor: '#EBF5FB',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  sectionTitle: {
    fontFamily: Typography.fontFamily.bold,
    fontSize: 18,
    fontWeight: 'bold',
    color: Palette.grisOscuro,
  },

  /* RECUADROS DE AVISOS Y NOVEDADES SOMBREADOS DE COLOR AMARILLO */
  notificationCardYellow: {
    backgroundColor: '#FEFCE8', // fondo suave amarillo
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1.5,
    borderColor: '#FACC15', // borde amarillo nítido
    borderLeftWidth: 5,
    borderLeftColor: '#EAB308', // acento dorado fuerte
    // SOMBRA DE COLOR AMARILLO
    shadowColor: '#EAB308',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.38,
    shadowRadius: 8,
    elevation: 5,
  },
  notificationHeader: {
=======
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 12,
  },
  courseTitleContainer: {
    flex: 1,
  },
  courseName: {
    fontSize: 17,
    fontWeight: '700',
    color: CflColors.grisOscuro,
    marginBottom: 4,
  },
  instructorName: {
    fontSize: 13,
    color: CflColors.grisClaro,
  },
  activeBadge: {
    backgroundColor: '#F0FDF4',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#BBF7D0',
  },
  activeBadgeText: {
    color: '#166534',
    fontSize: 11,
    fontWeight: '700',
  },
  divider: {
    height: 1,
    backgroundColor: CflColors.borde,
    marginVertical: 12,
  },
  detailsGrid: {
    gap: 8,
    marginBottom: 14,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  detailText: {
    fontSize: 13,
    color: CflColors.grisOscuro,
    fontWeight: '500',
  },
  attendanceBox: {
    backgroundColor: '#F8FAFC',
    borderRadius: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: CflColors.borde,
  },
  attendanceHeader: {
>>>>>>> origin/main
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
<<<<<<< HEAD
  notificationTagYellow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF08A',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#FDE047',
  },
  notificationTagYellowText: {
    fontFamily: Typography.fontFamily.bold,
    fontWeight: 'bold',
    fontSize: 10,
    color: '#854D0E',
  },
  notificationDateYellow: {
    fontFamily: Typography.fontFamily.semiBold,
    fontSize: 12,
    color: '#92400E',
  },
  notificationTitle: {
    fontFamily: Typography.fontFamily.bold,
    fontWeight: 'bold',
    fontSize: 15,
    color: '#78350F',
    marginBottom: 4,
  },
  notificationMessage: {
    fontFamily: Typography.fontFamily.regular,
    fontSize: 13,
    color: '#451A03',
    lineHeight: 18,
    marginBottom: 8,
  },
  notificationFooterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 6,
    borderTopWidth: 1,
    borderTopColor: '#FEF08A',
  },
  notificationCourseName: {
    fontFamily: Typography.fontFamily.semiBold,
    fontSize: 12,
    color: '#B45309',
  },

  /* Tarjetas de cursos */
  courseCard: {
    backgroundColor: Palette.blanco,
    borderRadius: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: Palette.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 3,
    overflow: 'hidden',
  },
  courseCardPressed: {
    opacity: 0.95,
    transform: [{ scale: 0.995 }],
  },
  imageWrapper: {
    width: '100%',
    height: 150,
    position: 'relative',
    backgroundColor: '#E2E8F0',
  },
  courseBannerImage: {
    width: '100%',
    height: '100%',
  },
  imageOverlayRow: {
    position: 'absolute',
    top: 10,
    left: 10,
    right: 10,
=======
  attendanceLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: CflColors.grisClaro,
  },
  attendancePercentage: {
    fontSize: 14,
    fontWeight: '700',
    color: CflColors.azul,
  },
  progressBarBackground: {
    height: 6,
    backgroundColor: '#E2E8F0',
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 3,
  },
  attendanceFooter: {
>>>>>>> origin/main
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
<<<<<<< HEAD
  /* Badges en verde resaltado */
  statusPillGreen: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 9,
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
  statusTextGreen: {
    fontFamily: Typography.fontFamily.bold,
    fontWeight: 'bold',
    fontSize: 11,
    color: Palette.success,
  },
  regularBadgeGreen: {
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
  regularBadgeGreenText: {
    fontFamily: Typography.fontFamily.bold,
    fontWeight: 'bold',
    fontSize: 11,
    color: Palette.success,
  },
  courseBody: {
    padding: 16,
  },
  courseTitle: {
    fontFamily: Typography.fontFamily.bold,
    fontSize: 18,
    fontWeight: 'bold',
    color: Palette.grisOscuro,
    marginBottom: 4,
    lineHeight: 23,
  },
  instructorText: {
    fontFamily: Typography.fontFamily.regular,
    fontSize: 13,
    color: Palette.grisClaro,
    marginBottom: 10,
  },
  instructorBold: {
    fontFamily: Typography.fontFamily.semiBold,
    color: Palette.grisOscuro,
  },

  /* Resaltado verde de información importante */
  importantInfoRow: {
    marginBottom: 12,
  },
  absencePill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
  },
  absencePillGreen: {
    backgroundColor: '#DCFCE7',
    borderColor: '#86EFAC',
  },
  absencePillTextGreen: {
    color: Palette.success,
    fontFamily: Typography.fontFamily.bold,
    fontWeight: 'bold',
    fontSize: 12,
  },
  absencePillWarning: {
    backgroundColor: '#FEF3C7',
    borderColor: '#FDE68A',
  },
  absencePillText: {
    fontFamily: Typography.fontFamily.semiBold,
    fontSize: 12,
    color: Palette.grisOscuro,
  },

  metaContainer: {
    backgroundColor: Palette.surfaceSubtle,
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 3,
  },
  metaText: {
    fontFamily: Typography.fontFamily.regular,
    fontSize: 13,
    color: Palette.grisOscuro,
    marginLeft: 8,
    flex: 1,
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: Palette.border,
  },
  cardFooterHint: {
    fontFamily: Typography.fontFamily.regular,
    fontSize: 12,
    color: Palette.grisClaro,
    flex: 1,
  },
  cardArrow: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#EBF5FB',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  footerNote: {
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 20,
  },
  footerNoteText: {
    fontFamily: Typography.fontFamily.regular,
    fontSize: 11,
    color: Palette.grisClaro,
    textAlign: 'center',
  },
});
=======
  absenceText: {
    fontSize: 12,
    color: CflColors.grisClaro,
  },
  boldText: {
    fontWeight: '700',
    color: CflColors.grisOscuro,
  },
  remainingAbsenceText: {
    fontSize: 12,
    fontWeight: '600',
    color: CflColors.exito,
  },
  urgentAbsenceText: {
    color: CflColors.peligro,
  },
  courseAlertBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EBF4FA',
    borderRadius: 8,
    padding: 10,
    marginTop: 12,
    gap: 8,
  },
  courseAlertText: {
    flex: 1,
    fontSize: 12,
    color: CflColors.azul,
    fontWeight: '500',
  },
  notifCard: {
    backgroundColor: CflColors.blanco,
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: CflColors.borde,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 3,
    elevation: 1,
  },
  notifHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  typeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  typeBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  notifDate: {
    fontSize: 12,
    color: CflColors.grisClaro,
  },
  notifCourse: {
    fontSize: 12,
    fontWeight: '700',
    color: CflColors.azul,
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  notifTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: CflColors.grisOscuro,
    marginBottom: 6,
  },
  notifMessage: {
    fontSize: 13,
    color: CflColors.grisClaro,
    lineHeight: 18,
  },
});
>>>>>>> origin/main
