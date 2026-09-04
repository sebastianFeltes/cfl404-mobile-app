import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  Pressable,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

import { Palette, Typography } from '@/constants/theme';
import { currentStudent, mockCourses } from '@/data/coursesData';

export default function AsistenciaCredencialScreen() {
  const router = useRouter();
  const primaryCourse = mockCourses[0];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}>
        {/* Título de Pantalla */}
        <View style={styles.headerTitleContainer}>
          <Text style={styles.screenTitle}>Credencial de Alumno</Text>
          <Text style={styles.screenSubtitle}>
            Acreditación de identidad y presentismo presencial
          </Text>
        </View>

        {/* Tarjeta Credencial Física-Digital */}
        <View style={styles.credentialCard}>
          {/* Banda Superior Institucional */}
          <View style={styles.cardTopBar}>
            <View style={styles.institutionHeader}>
              <Text style={styles.instProvince}>PROVINCIA DE BUENOS AIRES</Text>
              <Text style={styles.instDgcye}>Dirección General de Cultura y Educación</Text>
              <Text style={styles.instCfl}>CFL N.º 404 — Berisso</Text>
            </View>
            <View style={styles.roleBadge}>
              <Text style={styles.roleBadgeText}>ALUMNO REGULAR</Text>
            </View>
          </View>

          {/* Cuerpo de la Credencial */}
          <View style={styles.cardBody}>
            <View style={styles.studentRow}>
              {/* Foto o Avatar */}
              <View style={styles.photoContainer}>
                <Ionicons name="person" size={44} color={Palette.azul} />
              </View>

              {/* Datos Filiatorios */}
              <View style={styles.dataCol}>
                <Text style={styles.nameLabel}>ESTUDIANTE</Text>
                <Text style={styles.fullName}>
                  {currentStudent.lastName.toUpperCase()}, {currentStudent.firstName}
                </Text>
                <Text style={styles.dniText}>DNI: {currentStudent.dni}</Text>
                <Text style={styles.cycleBadgeText}>{currentStudent.cycleLabel}</Text>
              </View>
            </View>

            {/* Curso Principal en el que cursa */}
            <View style={styles.coursePillBox}>
              <Text style={styles.coursePillLabel}>CURSADA ACTUAL:</Text>
              <Text style={styles.coursePillName}>{primaryCourse.name}</Text>
            </View>

            {/* Código QR de Asistencia */}
            <View style={styles.qrSection}>
              <View style={styles.qrWrapper}>
                {/* Simulación visual de código QR con esquinas de escáner */}
                <View style={styles.qrCornerTL} />
                <View style={styles.qrCornerTR} />
                <View style={styles.qrCornerBL} />
                <View style={styles.qrCornerBR} />
                <View style={styles.qrBox}>
                  <Ionicons name="qr-code" size={170} color={Palette.grisOscuro} />
                </View>
              </View>
              <Text style={styles.qrInstruction}>
                Presenta este código al personal docente o preceptoría para registrar tu asistencia.
              </Text>
              <Text style={styles.qrTokenText}>
                ID: {currentStudent.id} • DNI {currentStudent.dni}
              </Text>
            </View>
          </View>
        </View>

        {/* Salvedad Informativa: El historial está en Curso */}
        <View style={styles.infoBox}>
          <Ionicons name="information-circle-outline" size={22} color={Palette.azul} />
          <View style={styles.infoTextContainer}>
            <Text style={styles.infoTitle}>¿Quieres ver tu historial de asistencias?</Text>
            <Text style={styles.infoDesc}>
              El cómputo de clases, faltas consumidas y justificaciones se gestiona dentro de cada curso.
            </Text>
            <Pressable
              style={styles.goToCourseButton}
              onPress={() => router.push(`/(app)/cursos/${primaryCourse.id}`)}>
              <Text style={styles.goToCourseButtonText}>
                Ver Asistencia en {primaryCourse.name}
              </Text>
              <Ionicons name="arrow-forward" size={14} color={Palette.azul} />
            </Pressable>
          </View>
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
  headerTitleContainer: {
    marginBottom: 16,
    alignItems: 'center',
  },
  screenTitle: {
    fontFamily: Typography.fontFamily.bold,
    fontWeight: 'bold',
    fontSize: 22,
    color: Palette.grisOscuro,
    marginBottom: 2,
  },
  screenSubtitle: {
    fontFamily: Typography.fontFamily.regular,
    fontSize: 13,
    color: Palette.grisClaro,
    textAlign: 'center',
  },
  credentialCard: {
    backgroundColor: Palette.blanco,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Palette.border,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    overflow: 'hidden',
    marginBottom: 20,
  },
  cardTopBar: {
    backgroundColor: Palette.azul,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  institutionHeader: {
    flex: 1,
  },
  instProvince: {
    fontFamily: Typography.fontFamily.bold,
    fontWeight: 'bold',
    fontSize: 10,
    color: Palette.amarillo,
    letterSpacing: 1,
  },
  instDgcye: {
    fontFamily: Typography.fontFamily.regular,
    fontSize: 11,
    color: '#E0F2FE',
  },
  instCfl: {
    fontFamily: Typography.fontFamily.bold,
    fontWeight: 'bold',
    fontSize: 15,
    color: Palette.blanco,
    marginTop: 2,
  },
  roleBadge: {
    backgroundColor: Palette.amarillo,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  roleBadgeText: {
    fontFamily: Typography.fontFamily.bold,
    fontWeight: 'bold',
    fontSize: 9,
    color: Palette.grisOscuro,
  },
  cardBody: {
    padding: 20,
    alignItems: 'center',
  },
  studentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 16,
  },
  photoContainer: {
    width: 70,
    height: 80,
    borderRadius: 8,
    backgroundColor: '#EBF5FB',
    borderWidth: 1,
    borderColor: '#D4E6F1',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  dataCol: {
    flex: 1,
  },
  nameLabel: {
    fontFamily: Typography.fontFamily.semiBold,
    fontSize: 10,
    color: Palette.grisClaro,
    letterSpacing: 0.5,
  },
  fullName: {
    fontFamily: Typography.fontFamily.bold,
    fontWeight: 'bold',
    fontSize: 17,
    color: Palette.grisOscuro,
    marginBottom: 2,
  },
  dniText: {
    fontFamily: Typography.fontFamily.bold,
    fontWeight: 'bold',
    fontSize: 13,
    color: Palette.azul,
    marginBottom: 4,
  },
  cycleBadgeText: {
    fontFamily: Typography.fontFamily.regular,
    fontSize: 11,
    color: Palette.grisClaro,
  },
  coursePillBox: {
    width: '100%',
    backgroundColor: Palette.surfaceSubtle,
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
  },
  coursePillLabel: {
    fontFamily: Typography.fontFamily.bold,
    fontWeight: 'bold',
    fontSize: 10,
    color: Palette.grisClaro,
    marginBottom: 2,
  },
  coursePillName: {
    fontFamily: Typography.fontFamily.bold,
    fontWeight: 'bold',
    fontSize: 13,
    color: Palette.grisOscuro,
  },
  qrSection: {
    alignItems: 'center',
    width: '100%',
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: Palette.surfaceSubtle,
  },
  qrWrapper: {
    position: 'relative',
    padding: 12,
    backgroundColor: Palette.blanco,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Palette.border,
    marginBottom: 12,
  },
  qrBox: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  qrCornerTL: {
    position: 'absolute',
    top: 4,
    left: 4,
    width: 16,
    height: 16,
    borderTopWidth: 3,
    borderLeftWidth: 3,
    borderColor: Palette.azul,
  },
  qrCornerTR: {
    position: 'absolute',
    top: 4,
    right: 4,
    width: 16,
    height: 16,
    borderTopWidth: 3,
    borderRightWidth: 3,
    borderColor: Palette.azul,
  },
  qrCornerBL: {
    position: 'absolute',
    bottom: 4,
    left: 4,
    width: 16,
    height: 16,
    borderBottomWidth: 3,
    borderLeftWidth: 3,
    borderColor: Palette.azul,
  },
  qrCornerBR: {
    position: 'absolute',
    bottom: 4,
    right: 4,
    width: 16,
    height: 16,
    borderBottomWidth: 3,
    borderRightWidth: 3,
    borderColor: Palette.azul,
  },
  qrInstruction: {
    fontFamily: Typography.fontFamily.regular,
    fontSize: 12,
    color: Palette.grisOscuro,
    textAlign: 'center',
    lineHeight: 16,
    marginBottom: 6,
    paddingHorizontal: 12,
  },
  qrTokenText: {
    fontFamily: Typography.fontFamily.semiBold,
    fontSize: 10,
    color: Palette.grisClaro,
    letterSpacing: 0.5,
  },
  infoBox: {
    backgroundColor: Palette.blanco,
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: Palette.border,
    borderLeftWidth: 4,
    borderLeftColor: Palette.azul,
  },
  infoTextContainer: {
    flex: 1,
    marginLeft: 12,
  },
  infoTitle: {
    fontFamily: Typography.fontFamily.bold,
    fontWeight: 'bold',
    fontSize: 14,
    color: Palette.grisOscuro,
    marginBottom: 4,
  },
  infoDesc: {
    fontFamily: Typography.fontFamily.regular,
    fontSize: 12,
    color: Palette.grisClaro,
    lineHeight: 16,
    marginBottom: 10,
  },
  goToCourseButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  goToCourseButtonText: {
    fontFamily: Typography.fontFamily.bold,
    fontWeight: 'bold',
    fontSize: 12,
    color: Palette.azul,
  },
});