import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { CflColors } from '@/constants/theme';
import { MOCK_USER, MOCK_CURSOS } from '@/constants/mocks';

export default function DashboardScreen() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Banner de Bienvenida */}
      <View style={styles.heroCard}>
        <View style={styles.heroHeader}>
          <View style={styles.heroTextContainer}>
            <Text style={styles.heroGreeting}>¡Hola, {MOCK_USER.firstName}!</Text>
            <Text style={styles.heroSubtitle}>Centro de Formación Laboral N° 404</Text>
          </View>
          <View style={styles.statusBadge}>
            <Text style={styles.statusBadgeText}>{MOCK_USER.status}</Text>
          </View>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{MOCK_CURSOS.length}</Text>
            <Text style={styles.statLabel}>Cursos activos</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>92%</Text>
            <Text style={styles.statLabel}>Presentismo</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>Ciclo</Text>
            <Text style={styles.statLabel}>2026</Text>
          </View>
        </View>
      </View>

      {/* Secciones del subgrupo */}
      <Text style={styles.sectionTitle}>Accesos rápidos</Text>

      {/* Tarjeta Mis Cursos */}
      <TouchableOpacity
        style={styles.actionCard}
        activeOpacity={0.8}
        onPress={() => router.push('/(app)/cursos')}
      >
        <View style={[styles.iconContainer, { backgroundColor: '#EBF4FA' }]}>
          <Ionicons name="book" size={24} color={CflColors.azul} />
        </View>
        <View style={styles.actionCardText}>
          <Text style={styles.actionCardTitle}>Mis Cursos</Text>
          <Text style={styles.actionCardSubtitle}>
            {MOCK_CURSOS.length} cursadas en curso y avisos académicos recientes
          </Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color={CflColors.grisClaro} />
      </TouchableOpacity>

      {/* Tarjeta Beneficios */}
      <TouchableOpacity
        style={styles.actionCard}
        activeOpacity={0.8}
        onPress={() => router.push('/(app)/beneficios')}
      >
        <View style={[styles.iconContainer, { backgroundColor: '#E0F2FE' }]}>
          <Ionicons name="pricetag" size={24} color={CflColors.celeste} />
        </View>
        <View style={styles.actionCardText}>
          <Text style={styles.actionCardTitle}>Beneficios y Comercios</Text>
          <Text style={styles.actionCardSubtitle}>
            Descuentos exclusivos presentando tu condición de alumno
          </Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color={CflColors.grisClaro} />
      </TouchableOpacity>

      {/* Tarjeta Perfil */}
      <TouchableOpacity
        style={styles.actionCard}
        activeOpacity={0.8}
        onPress={() => router.push('/(app)/perfil')}
      >
        <View style={[styles.iconContainer, { backgroundColor: '#F1F5F9' }]}>
          <Ionicons name="person" size={24} color={CflColors.azul} />
        </View>
        <View style={styles.actionCardText}>
          <Text style={styles.actionCardTitle}>Mi Perfil</Text>
          <Text style={styles.actionCardSubtitle}>
            Datos filiatorios, escolaridad y actualización de contacto
          </Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color={CflColors.grisClaro} />
      </TouchableOpacity>

      {/* Aviso institucional */}
      <View style={styles.infoBanner}>
        <Ionicons name="information-circle-outline" size={20} color={CflColors.azul} />
        <Text style={styles.infoBannerText}>
          Las clases se dictan en Calle La Portada N° 4120, Berisso.
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
    paddingBottom: 32,
  },
  heroCard: {
    backgroundColor: CflColors.azul,
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  heroHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  heroTextContainer: {
    flex: 1,
  },
  heroGreeting: {
    fontSize: 22,
    fontWeight: '700',
    color: CflColors.blanco,
    marginBottom: 4,
  },
  heroSubtitle: {
    fontSize: 13,
    color: '#E0F2FE',
    fontWeight: '500',
  },
  statusBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: CflColors.amarillo,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  statBox: {
    flex: 1,
    alignItems: 'center',
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
  statDivider: {
    width: 1,
    height: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: CflColors.grisOscuro,
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  actionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: CflColors.blanco,
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: CflColors.borde,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 1,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  actionCardText: {
    flex: 1,
  },
  actionCardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: CflColors.grisOscuro,
    marginBottom: 3,
  },
  actionCardSubtitle: {
    fontSize: 12,
    color: CflColors.grisClaro,
    lineHeight: 16,
  },
  infoBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EBF4FA',
    borderRadius: 10,
    padding: 12,
    marginTop: 12,
    gap: 8,
  },
  infoBannerText: {
    flex: 1,
    fontSize: 12,
    color: CflColors.azul,
    fontWeight: '500',
  },
});
