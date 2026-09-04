import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  Pressable,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { Palette, Typography } from '@/constants/theme';
import { currentStudent, mockCourses } from '@/data/coursesData';

export default function DashboardScreen() {
  const router = useRouter();
  const primaryCourse = mockCourses[0];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}>
        {/* Cabecera del Alumno */}
        <View style={styles.headerBanner}>
          <View style={styles.avatarCircle}>
            <Text style={styles.avatarInitial}>
              {currentStudent.firstName[0]}
              {currentStudent.lastName[0]}
            </Text>
          </View>
          <View style={styles.headerInfo}>
            <Text style={styles.welcomeLabel}>¡HOLA!</Text>
            <Text style={styles.studentName}>
              {currentStudent.firstName} {currentStudent.lastName}
            </Text>
            <Text style={styles.studentSubtitle}>
              {currentStudent.cycleLabel} • {currentStudent.institution}
            </Text>
          </View>
        </View>

        {/* Acceso Rápido a Credencial */}
        <Pressable
          style={({ pressed }) => [
            styles.credentialQuickCard,
            pressed && styles.cardPressed,
          ]}
          onPress={() => router.push('/(app)/asistencia')}>
          <View style={styles.credentialIconBox}>
            <Ionicons name="qr-code" size={32} color={Palette.azul} />
          </View>
          <View style={styles.credentialTextBox}>
            <Text style={styles.credentialTitle}>Credencial de Alumno</Text>
            <Text style={styles.credentialSubtitle}>
              Muestra tu código QR para el registro de asistencia en el centro
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={Palette.azul} />
        </Pressable>

        {/* Atajos principales */}
        <View style={styles.shortcutsGrid}>
          <Pressable
            style={({ pressed }) => [styles.shortcutCard, pressed && styles.cardPressed]}
            onPress={() => router.push('/(app)/cursos')}>
            <View style={[styles.shortcutIconBox, { backgroundColor: '#EBF5FB' }]}>
              <Ionicons name="school" size={22} color={Palette.azul} />
            </View>
            <Text style={styles.shortcutTitle}>Mis Cursos</Text>
            <Text style={styles.shortcutCount}>{mockCourses.length} activos</Text>
          </Pressable>

          <Pressable
            style={({ pressed }) => [styles.shortcutCard, pressed && styles.cardPressed]}
            onPress={() => router.push('/(app)/contacto')}>
            <View style={[styles.shortcutIconBox, { backgroundColor: '#DCFCE7' }]}>
              <Ionicons name="chatbubbles" size={22} color={Palette.success} />
            </View>
            <Text style={styles.shortcutTitle}>Contacto</Text>
            <Text style={styles.shortcutCount}>Redes y teléfono</Text>
          </Pressable>

          <Pressable
            style={({ pressed }) => [styles.shortcutCard, pressed && styles.cardPressed]}
            onPress={() => router.push('/(app)/ayuda')}>
            <View style={[styles.shortcutIconBox, { backgroundColor: '#FEF3C7' }]}>
              <Ionicons name="help-circle" size={22} color={Palette.warning} />
            </View>
            <Text style={styles.shortcutTitle}>Ayuda</Text>
            <Text style={styles.shortcutCount}>Guías y soporte</Text>
          </Pressable>
        </View>

        {/* Cursada Principal Activa */}
        {primaryCourse && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Próxima Clase</Text>
              <Pressable onPress={() => router.push('/(app)/cursos')}>
                <Text style={styles.seeAllLink}>Ver todos</Text>
              </Pressable>
            </View>

            <Pressable
              style={({ pressed }) => [
                styles.courseCard,
                pressed && styles.cardPressed,
              ]}
              onPress={() => router.push(`/(app)/cursos/${primaryCourse.id}`)}>
              <View style={styles.courseHeader}>
                <View style={styles.statusPill}>
                  <View style={styles.statusDot} />
                  <Text style={styles.statusPillText}>{primaryCourse.statusName}</Text>
                </View>
                <Text style={styles.absenceText}>
                  Faltas: {primaryCourse.absenceCount}/{primaryCourse.maxAbsences}
                </Text>
              </View>

              <Text style={styles.courseTitle}>{primaryCourse.name}</Text>
              <Text style={styles.courseMeta}>
                {primaryCourse.days.join(' y ')} • {primaryCourse.startTime} a{' '}
                {primaryCourse.endTime} hs
              </Text>
              <Text style={styles.classroomText}>{primaryCourse.classroom}</Text>

              <View style={styles.courseFooter}>
                <Text style={styles.instructorText}>
                  Docente: {primaryCourse.instructor.firstName}{' '}
                  {primaryCourse.instructor.lastName}
                </Text>
                <View style={styles.viewCourseButton}>
                  <Text style={styles.viewCourseButtonText}>Ver detalle</Text>
                  <Ionicons name="arrow-forward" size={14} color={Palette.azul} />
                </View>
              </View>
            </Pressable>
          </View>
        )}
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
  headerBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Palette.azul,
    borderRadius: 14,
    padding: 20,
    marginBottom: 16,
    elevation: 3,
  },
  avatarCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: Palette.blanco,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  avatarInitial: {
    fontFamily: Typography.fontFamily.bold,
    fontWeight: 'bold',
    fontSize: 18,
    color: Palette.azul,
  },
  headerInfo: {
    flex: 1,
  },
  welcomeLabel: {
    fontFamily: Typography.fontFamily.bold,
    fontWeight: 'bold',
    fontSize: 11,
    color: Palette.amarillo,
    letterSpacing: 1,
  },
  studentName: {
    fontFamily: Typography.fontFamily.bold,
    fontWeight: 'bold',
    fontSize: 19,
    color: Palette.blanco,
    marginBottom: 2,
  },
  studentSubtitle: {
    fontFamily: Typography.fontFamily.regular,
    fontSize: 12,
    color: '#E0F2FE',
  },
  credentialQuickCard: {
    backgroundColor: Palette.blanco,
    borderRadius: 14,
    padding: 16,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D4E6F1',
    elevation: 2,
  },
  credentialIconBox: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#EBF5FB',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  credentialTextBox: {
    flex: 1,
    marginRight: 8,
  },
  credentialTitle: {
    fontFamily: Typography.fontFamily.bold,
    fontWeight: 'bold',
    fontSize: 15,
    color: Palette.grisOscuro,
    marginBottom: 2,
  },
  credentialSubtitle: {
    fontFamily: Typography.fontFamily.regular,
    fontSize: 12,
    color: Palette.grisClaro,
    lineHeight: 16,
  },
  shortcutsGrid: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 20,
  },
  shortcutCard: {
    flex: 1,
    backgroundColor: Palette.blanco,
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: Palette.border,
    alignItems: 'center',
  },
  shortcutIconBox: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  shortcutTitle: {
    fontFamily: Typography.fontFamily.bold,
    fontWeight: 'bold',
    fontSize: 13,
    color: Palette.grisOscuro,
    marginBottom: 2,
  },
  shortcutCount: {
    fontFamily: Typography.fontFamily.regular,
    fontSize: 11,
    color: Palette.grisClaro,
  },
  cardPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
  section: {
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontFamily: Typography.fontFamily.bold,
    fontWeight: 'bold',
    fontSize: 17,
    color: Palette.grisOscuro,
  },
  seeAllLink: {
    fontFamily: Typography.fontFamily.bold,
    fontWeight: 'bold',
    fontSize: 13,
    color: Palette.azul,
  },
  courseCard: {
    backgroundColor: Palette.blanco,
    borderRadius: 14,
    padding: 18,
    borderWidth: 1,
    borderColor: Palette.border,
    elevation: 2,
  },
  courseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  statusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Palette.success,
    marginRight: 6,
  },
  statusPillText: {
    fontFamily: Typography.fontFamily.bold,
    fontWeight: 'bold',
    fontSize: 11,
    color: Palette.success,
  },
  absenceText: {
    fontFamily: Typography.fontFamily.semiBold,
    fontSize: 12,
    color: Palette.azul,
  },
  courseTitle: {
    fontFamily: Typography.fontFamily.bold,
    fontWeight: 'bold',
    fontSize: 16,
    color: Palette.grisOscuro,
    marginBottom: 4,
  },
  courseMeta: {
    fontFamily: Typography.fontFamily.regular,
    fontSize: 13,
    color: Palette.grisClaro,
    marginBottom: 2,
  },
  classroomText: {
    fontFamily: Typography.fontFamily.regular,
    fontSize: 13,
    color: Palette.grisClaro,
    marginBottom: 12,
  },
  courseFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: Palette.surfaceSubtle,
  },
  instructorText: {
    fontFamily: Typography.fontFamily.regular,
    fontSize: 12,
    color: Palette.grisClaro,
  },
  viewCourseButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  viewCourseButtonText: {
    fontFamily: Typography.fontFamily.bold,
    fontWeight: 'bold',
    fontSize: 12,
    color: Palette.azul,
  },
});