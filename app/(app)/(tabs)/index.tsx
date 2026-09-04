/**
 * Dashboard (Home) — CFL 404 Mobile
 * Muestra el listado de cursos actuales en cards interactivas y minimalistas.
 * Al tocar una card, navega al detalle del curso (realizado por el otro grupo).
 */

import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { MOCK_CURSOS, type Curso } from '@/data/mock';
import { Colors, Fonts, Spacing, BorderRadius } from '@/constants/theme';

export default function DashboardScreen() {
  const router = useRouter();

  const handleCoursePress = (curso: Curso) => {
    router.push({
      pathname: '/(app)/cursos/[id]',
      params: { id: curso.id },
    });
  };

  const renderCourseCard = ({ item }: { item: Curso }) => {
    return (
      <TouchableOpacity
        style={styles.card}
        activeOpacity={0.7}
        onPress={() => handleCoursePress(item)}
      >
        <View style={styles.cardContent}>
          <View style={styles.courseIconContainer}>
            <Ionicons name="school-outline" size={24} color={Colors.azul} />
          </View>
          <Text style={styles.courseName} numberOfLines={2}>
            {item.nombre}
          </Text>
          <Ionicons name="chevron-forward" size={20} color={Colors.grisClaro} />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* Título de sección */}
      <View style={styles.titleSection}>
        <Text style={styles.sectionTitle}>Cursos actuales</Text>
        <Text style={styles.sectionSubtitle}>
          Seleccioná un curso para ver detalles e información
        </Text>
      </View>

      {/* Lista de cursos en cards interactivas */}
      <FlatList
        data={MOCK_CURSOS}
        keyExtractor={(item) => item.id}
        renderItem={renderCourseCard}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  titleSection: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.md,
  },
  sectionTitle: {
    fontFamily: Fonts.title,
    fontSize: 22,
    fontWeight: '700',
    color: Colors.grisOscuro,
  },
  sectionSubtitle: {
    fontFamily: Fonts.body,
    fontSize: 14,
    color: Colors.grisClaro,
    marginTop: 4,
  },
  listContent: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.xl,
    gap: Spacing.md,
  },
  card: {
    backgroundColor: Colors.blanco,
    borderRadius: BorderRadius.md,
    paddingVertical: 18,
    paddingHorizontal: Spacing.md,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  courseIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#EAF4FA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  courseName: {
    flex: 1,
    fontFamily: Fonts.title,
    fontSize: 16,
    fontWeight: '700',
    color: Colors.grisOscuro,
  },
});
