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
        {/* Cabecera de Alumno: nombre en mayúsculas, DNI, ciclo lectivo y foto más grande */}
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
                {currentStudent.cycleLabel}
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
    borderRadius: 14,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: Palette.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  studentBannerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  studentAvatarBox: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#EBF5FB',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    overflow: 'hidden',
  },
  studentAvatarImage: {
    width: 56,
    height: 56,
  },
  studentHeaderDetails: {
    flex: 1,
  },
  studentName: {
    fontFamily: Typography.fontFamily.bold,
    fontSize: 16,
    fontWeight: 'bold',
    color: Palette.grisOscuro,
  },
  studentMetaText: {
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
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