import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
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
  );
}

const styles = StyleSheet.create({
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
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
