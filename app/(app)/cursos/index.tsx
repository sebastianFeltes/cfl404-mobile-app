import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  SafeAreaView,
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
        {/* Cabecera de Alumno */}
        <View style={styles.studentBanner}>
          <View style={styles.studentInfo}>
            <Text style={styles.studentGreeting}>
              Cursadas de {currentStudent.firstName} {currentStudent.lastName}
            </Text>
            <Text style={styles.studentRoleBadge}>
              ROL ALUMNO • {currentStudent.cycleLabel}
            </Text>
          </View>
          <View style={styles.badgeActive}>
            <Text style={styles.badgeActiveText}>
              {mockCourses.length} {mockCourses.length === 1 ? 'CURSO' : 'CURSOS'}
            </Text>
          </View>
        </View>

        {/* Sección de Notificaciones y Avisos de Cursada */}
        {allNotifications.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Ionicons name="notifications-outline" size={20} color={Palette.azul} />
              <Text style={styles.sectionTitle}>Avisos y Novedades</Text>
            </View>

            {allNotifications.map((notif) => (
              <Pressable
                key={notif.id}
                style={styles.notificationCard}
                onPress={() => router.push(`/(app)/cursos/${notif.courseId}`)}>
                <View style={styles.notificationHeader}>
                  <View style={styles.notificationTag}>
                    <Text style={styles.notificationTagText}>
                      {notif.type.toUpperCase()}
                    </Text>
                  </View>
                  <Text style={styles.notificationDate}>{notif.date}</Text>
                </View>
                <Text style={styles.notificationTitle}>{notif.title}</Text>
                <Text style={styles.notificationMessage}>{notif.message}</Text>
                <Text style={styles.notificationCourseName}>
                  Curso: {notif.courseName}
                </Text>
              </Pressable>
            ))}
          </View>
        )}

        {/* Sección de Cursos Inscritos */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="school-outline" size={20} color={Palette.azul} />
            <Text style={styles.sectionTitle}>Cursos Activos</Text>
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
                {/* Cabecera de la tarjeta */}
                <View style={styles.cardHeader}>
                  <View style={styles.statusPill}>
                    <View style={styles.statusDot} />
                    <Text style={styles.statusText}>{course.statusName}</Text>
                  </View>
                  <View
                    style={[
                      styles.absencePill,
                      isNearLimit ? styles.absencePillWarning : styles.absencePillNormal,
                    ]}>
                    <Ionicons
                      name={isNearLimit ? 'alert-circle-outline' : 'checkmark-circle-outline'}
                      size={14}
                      color={isNearLimit ? Palette.warning : Palette.azul}
                      style={{ marginRight: 4 }}
                    />
                    <Text
                      style={[
                        styles.absencePillText,
                        isNearLimit && { color: Palette.warning },
                      ]}>
                      Faltas: {course.absenceCount} / {course.maxAbsences}
                    </Text>
                  </View>
                </View>

                {/* Título y Docente */}
                <Text style={styles.courseTitle}>{course.name}</Text>
                <Text style={styles.instructorText}>
                  Docente:{' '}
                  <Text style={styles.instructorBold}>
                    {course.instructor.firstName} {course.instructor.lastName}
                  </Text>
                </Text>

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

                {/* Footer de la tarjeta con acción clara */}
                <View style={styles.cardFooter}>
                  <Text style={styles.cardFooterHint}>
                    Ver historial de asistencia, recursos y grupo
                  </Text>
                  <View style={styles.cardArrow}>
                    <Ionicons name="arrow-forward" size={16} color={Palette.azul} />
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
  studentBanner: {
    backgroundColor: Palette.blanco,
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: Palette.border,
  },
  studentInfo: {
    flex: 1,
  },
  studentGreeting: {
    fontFamily: Typography.fontFamily.bold,
    fontSize: 16,
    fontWeight: 'bold',
    color: Palette.grisOscuro,
    marginBottom: 4,
  },
  studentRoleBadge: {
    fontFamily: Typography.fontFamily.semiBold,
    fontSize: 12,
    color: Palette.grisClaro,
    letterSpacing: 0.5,
  },
  badgeActive: {
    backgroundColor: '#EBF5FB',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#D4E6F1',
  },
  badgeActiveText: {
    fontFamily: Typography.fontFamily.bold,
    fontWeight: 'bold',
    fontSize: 11,
    color: Palette.azul,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontFamily: Typography.fontFamily.bold,
    fontSize: 18,
    fontWeight: 'bold',
    color: Palette.grisOscuro,
    marginLeft: 8,
  },
  notificationCard: {
    backgroundColor: Palette.blanco,
    borderRadius: 10,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: Palette.border,
    borderLeftWidth: 4,
    borderLeftColor: Palette.celeste,
  },
  notificationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  notificationTag: {
    backgroundColor: '#E0F2FE',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  notificationTagText: {
    fontFamily: Typography.fontFamily.bold,
    fontWeight: 'bold',
    fontSize: 10,
    color: Palette.azul,
  },
  notificationDate: {
    fontFamily: Typography.fontFamily.regular,
    fontSize: 12,
    color: Palette.grisClaro,
  },
  notificationTitle: {
    fontFamily: Typography.fontFamily.bold,
    fontWeight: 'bold',
    fontSize: 15,
    color: Palette.grisOscuro,
    marginBottom: 4,
  },
  notificationMessage: {
    fontFamily: Typography.fontFamily.regular,
    fontSize: 13,
    color: Palette.grisOscuro,
    lineHeight: 18,
    marginBottom: 6,
  },
  notificationCourseName: {
    fontFamily: Typography.fontFamily.semiBold,
    fontSize: 12,
    color: Palette.azul,
  },
  courseCard: {
    backgroundColor: Palette.blanco,
    borderRadius: 14,
    padding: 18,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Palette.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 2,
  },
  courseCardPressed: {
    opacity: 0.94,
    transform: [{ scale: 0.995 }],
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  statusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Palette.success,
    marginRight: 6,
  },
  statusText: {
    fontFamily: Typography.fontFamily.bold,
    fontWeight: 'bold',
    fontSize: 11,
    color: Palette.success,
  },
  absencePill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
  },
  absencePillNormal: {
    backgroundColor: '#F1F5F9',
    borderColor: Palette.border,
  },
  absencePillWarning: {
    backgroundColor: '#FEF3C7',
    borderColor: '#FDE68A',
  },
  absencePillText: {
    fontFamily: Typography.fontFamily.semiBold,
    fontSize: 11,
    color: Palette.azul,
  },
  courseTitle: {
    fontFamily: Typography.fontFamily.bold,
    fontSize: 17,
    fontWeight: 'bold',
    color: Palette.grisOscuro,
    marginBottom: 6,
    lineHeight: 22,
  },
  instructorText: {
    fontFamily: Typography.fontFamily.regular,
    fontSize: 13,
    color: Palette.grisClaro,
    marginBottom: 12,
  },
  instructorBold: {
    fontFamily: Typography.fontFamily.semiBold,
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