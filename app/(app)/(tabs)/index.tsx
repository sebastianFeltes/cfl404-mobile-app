/**
 * Dashboard (Home) — CFL 404 Mobile
 * Muestra Mis Cursos (jua-tiz) en cards con horario, aula y presentismo.
 * Al tocar una card, navega al detalle del curso.
 */

import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '@/context/AuthContext';
import { MOCK_CURSOS, type CourseItem } from '@/constants/mocks';
import { Colors, CflColors, Fonts, Spacing } from '@/constants/theme';

export default function DashboardScreen() {
  const router = useRouter();
  const { user } = useAuth();
  const firstName = user?.nombre?.split(' ')[0] ?? 'Alumno';

  const handleCoursePress = (item: CourseItem) => {
    router.push({
      pathname: '/(app)/cursos/[id]',
      params: { id: item.course.id },
    });
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.heroCard}>
        <Text style={styles.heroGreeting}>¡Hola, {firstName}!</Text>
        <Text style={styles.heroSubtitle}>Centro de Formación Laboral N° 404</Text>
        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{MOCK_CURSOS.length}</Text>
            <Text style={styles.statLabel}>Cursos activos</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>Ciclo</Text>
            <Text style={styles.statLabel}>2026</Text>
          </View>
        </View>
      </View>

      <View style={styles.sectionHeader}>
        <View>
          <Text style={styles.sectionTitle}>Mis Cursos</Text>
          <Text style={styles.sectionSubtitle}>Cursadas activas — toca una para ver el detalle</Text>
        </View>
        <TouchableOpacity
          onPress={() => router.push('/(app)/cursos')}
          accessibilityLabel="Ver avisos de cursada"
        >
          <Text style={styles.seeAllLink}>Avisos</Text>
        </TouchableOpacity>
      </View>

      {MOCK_CURSOS.map((item) => {
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
            onPress={() => handleCoursePress(item)}
          >
            <View style={styles.cardHeader}>
              <View style={styles.courseTitleContainer}>
                <Text style={styles.courseName}>{item.course.name}</Text>
                <Text style={styles.instructorName}>
                  Docente: {item.course.instructor.firstName} {item.course.instructor.lastName}
                </Text>
              </View>
              <View style={styles.activeBadge}>
                <Text style={styles.activeBadgeText}>{item.course.status.name}</Text>
              </View>
            </View>

            <View style={styles.divider} />

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
            </View>

            <View style={styles.attendanceBox}>
              <View style={styles.attendanceHeader}>
                <Text style={styles.attendanceLabel}>Presentismo</Text>
                <Text style={styles.attendancePercentage}>{attendancePercent}%</Text>
              </View>
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

            <View style={styles.cardFooter}>
              <Text style={styles.cardFooterText}>Ver detalle</Text>
              <Ionicons name="chevron-forward" size={18} color={Colors.grisClaro} />
            </View>
          </TouchableOpacity>
        );
      })}
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
  heroCard: {
    backgroundColor: CflColors.azul,
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
  },
  heroGreeting: {
    fontFamily: Fonts.title,
    fontSize: 22,
    fontWeight: '700',
    color: CflColors.blanco,
    marginBottom: 4,
  },
  heroSubtitle: {
    fontFamily: Fonts.body,
    fontSize: 13,
    color: '#E0F2FE',
    fontWeight: '500',
    marginBottom: 16,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  statBox: {
    flex: 1,
    alignItems: 'center',
  },
  statDivider: {
    width: 1,
    height: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  statNumber: {
    fontSize: 18,
    fontWeight: '800',
    color: CflColors.blanco,
  },
  statLabel: {
    fontSize: 11,
    color: '#E0F2FE',
    marginTop: 2,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 12,
  },
  sectionTitle: {
    fontFamily: Fonts.title,
    fontSize: 16,
    fontWeight: '700',
    color: CflColors.grisOscuro,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  sectionSubtitle: {
    fontFamily: Fonts.body,
    fontSize: 13,
    color: CflColors.grisClaro,
    marginTop: 2,
  },
  seeAllLink: {
    fontFamily: Fonts.title,
    fontSize: 14,
    fontWeight: '700',
    color: CflColors.azul,
    paddingBottom: 2,
  },
  courseCard: {
    backgroundColor: CflColors.blanco,
    borderRadius: 14,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: CflColors.borde,
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
  remainingAbsenceText: {
    fontSize: 12,
    fontWeight: '600',
    color: CflColors.exito,
  },
  urgentAbsenceText: {
    color: CflColors.peligro,
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: Spacing.xs,
    marginTop: 12,
  },
  cardFooterText: {
    fontFamily: Fonts.body,
    fontSize: 12,
    fontWeight: '600',
    color: CflColors.azul,
  },
});
