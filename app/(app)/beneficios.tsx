import React, { useState, useMemo } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Linking,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { CflColors } from '@/constants/theme';
import { MOCK_BENEFICIOS, BenefitItem } from '@/constants/mocks';

// Habilitar animaciones de layout en Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function BeneficiosScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedId, setExpandedId] = useState<string | number | null>(null);

  // Filtrado reactivo en tiempo real
  const filteredBeneficios = useMemo(() => {
    if (!searchQuery.trim()) return MOCK_BENEFICIOS;
    const query = searchQuery.toLowerCase().trim();
    return MOCK_BENEFICIOS.filter(
      (b) =>
        b.nombre.toLowerCase().includes(query) ||
        b.rubro.toLowerCase().includes(query) ||
        b.direccion.toLowerCase().includes(query) ||
        b.descuento.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  const toggleExpand = (id: string | number) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const handleOpenWhatsApp = (phone: string, storeName: string) => {
    const text = encodeURIComponent(
      `¡Hola! Me comunico desde la app del CFL 404 para consultar por el beneficio en ${storeName}.`
    );
    const url = `https://wa.me/${phone}?text=${text}`;
    Linking.openURL(url).catch(() => {
      console.warn('No se pudo abrir WhatsApp');
    });
  };

  return (
    <View style={styles.container}>
      {/* Barra de búsqueda superior */}
      <View style={styles.searchHeader}>
        <View style={styles.searchBar}>
          <Ionicons name="search-outline" size={20} color={CflColors.grisClaro} />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar por comercio, rubro o dirección..."
            placeholderTextColor={CflColors.grisClaro}
            value={searchQuery}
            onChangeText={setSearchQuery}
            clearButtonMode="while-editing"
          />
          {searchQuery.length > 0 && Platform.OS !== 'ios' && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={18} color={CflColors.grisClaro} />
            </TouchableOpacity>
          )}
        </View>

        <Text style={styles.resultsCount}>
          {filteredBeneficios.length} comercio
          {filteredBeneficios.length !== 1 ? 's' : ''} disponible
          {filteredBeneficios.length !== 1 ? 's' : ''}
        </Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Banner Informativo */}
        <View style={styles.promoBanner}>
          <Ionicons name="card-outline" size={20} color={CflColors.azul} />
          <Text style={styles.promoBannerText}>
            Presenta tu condición de alumno regular en caja para acceder a los descuentos.
          </Text>
        </View>

        {/* Lista de Comercios con Acordeón */}
        {filteredBeneficios.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Ionicons name="search" size={48} color={CflColors.borde} />
            <Text style={styles.emptyTitle}>No se encontraron comercios</Text>
            <Text style={styles.emptySubtitle}>
              Prueba buscando por otro término, rubro o limpia la búsqueda.
            </Text>
          </View>
        ) : (
          filteredBeneficios.map((item: BenefitItem) => {
            const isExpanded = expandedId === item.id;

            return (
              <View key={item.id} style={styles.card}>
                {/* Cabecera Compacta (Tocable para expandir) */}
                <TouchableOpacity
                  style={styles.cardTouchHeader}
                  activeOpacity={0.7}
                  onPress={() => toggleExpand(item.id)}
                >
                  <View style={styles.cardHeaderTop}>
                    <View style={styles.storeInfo}>
                      <Text style={styles.storeName}>{item.nombre}</Text>
                      <Text style={styles.storeCategory}>{item.rubro}</Text>
                    </View>

                    {/* Badge de descuento */}
                    <View style={styles.discountBadge}>
                      <Text style={styles.discountBadgeText}>{item.descuento}</Text>
                    </View>
                  </View>

                  <View style={styles.locationRow}>
                    <Ionicons name="location-outline" size={15} color={CflColors.grisClaro} />
                    <Text style={styles.locationText} numberOfLines={1}>
                      {item.direccion}
                    </Text>
                  </View>

                  <View style={styles.expandRow}>
                    <Text style={styles.expandText}>
                      {isExpanded ? 'Ocultar detalles' : 'Ver beneficio completo'}
                    </Text>
                    <Ionicons
                      name={isExpanded ? 'chevron-up' : 'chevron-down'}
                      size={16}
                      color={CflColors.azul}
                    />
                  </View>
                </TouchableOpacity>

                {/* Contenido Expandido (Acordeón Inline) */}
                {isExpanded && (
                  <View style={styles.expandedContent}>
                    <View style={styles.divider} />

                    {/* Descripción */}
                    <Text style={styles.sectionHeading}>Sobre el comercio</Text>
                    <Text style={styles.descriptionText}>{item.descripcion}</Text>

                    {/* Detalle del descuento y condiciones */}
                    <View style={styles.conditionBox}>
                      <Ionicons name="pricetag" size={16} color={CflColors.azul} />
                      <Text style={styles.conditionText}>{item.descuentoDetalle}</Text>
                    </View>

                    {/* Rubros / Catálogo destacado */}
                    {item.catalogo && item.catalogo.length > 0 && (
                      <View style={styles.chipsContainer}>
                        <Text style={styles.sectionHeading}>Rubros incluidos:</Text>
                        <View style={styles.chipsRow}>
                          {item.catalogo.map((chip, idx) => (
                            <View key={idx} style={styles.chip}>
                              <Text style={styles.chipText}>{chip}</Text>
                            </View>
                          ))}
                        </View>
                      </View>
                    )}

                    {/* Horarios */}
                    {item.horario && (
                      <View style={styles.metaRow}>
                        <Ionicons name="time-outline" size={16} color={CflColors.grisClaro} />
                        <Text style={styles.metaText}>{item.horario}</Text>
                      </View>
                    )}

                    {/* Botón azul de acción para WhatsApp */}
                    <TouchableOpacity
                      style={styles.blueButton}
                      activeOpacity={0.8}
                      onPress={() => handleOpenWhatsApp(item.telefono, item.nombre)}
                    >
                      <Ionicons name="logo-whatsapp" size={18} color={CflColors.blanco} />
                      <Text style={styles.blueButtonText}>Consultar por WhatsApp</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            );
          })
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
  searchHeader: {
    backgroundColor: CflColors.blanco,
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: CflColors.borde,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: CflColors.fondo,
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 44,
    borderWidth: 1,
    borderColor: CflColors.borde,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: CflColors.grisOscuro,
    height: '100%',
  },
  resultsCount: {
    fontSize: 12,
    color: CflColors.grisClaro,
    marginTop: 8,
    fontWeight: '500',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  promoBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EBF4FA',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    gap: 10,
  },
  promoBannerText: {
    flex: 1,
    fontSize: 12,
    color: CflColors.azul,
    fontWeight: '500',
    lineHeight: 16,
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 48,
    paddingHorizontal: 24,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: CflColors.grisOscuro,
    marginTop: 12,
    marginBottom: 6,
  },
  emptySubtitle: {
    fontSize: 13,
    color: CflColors.grisClaro,
    textAlign: 'center',
  },
  card: {
    backgroundColor: CflColors.blanco,
    borderRadius: 14,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: CflColors.borde,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 3,
    elevation: 1,
    overflow: 'hidden',
  },
  cardTouchHeader: {
    padding: 16,
  },
  cardHeaderTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 12,
    marginBottom: 8,
  },
  storeInfo: {
    flex: 1,
  },
  storeName: {
    fontSize: 16,
    fontWeight: '700',
    color: CflColors.grisOscuro,
    marginBottom: 2,
  },
  storeCategory: {
    fontSize: 12,
    color: CflColors.grisClaro,
    fontWeight: '500',
  },
  discountBadge: {
    backgroundColor: '#FEF9C3',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#FDE047',
  },
  discountBadgeText: {
    color: '#854D0E',
    fontSize: 12,
    fontWeight: '800',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 10,
  },
  locationText: {
    flex: 1,
    fontSize: 13,
    color: CflColors.grisClaro,
  },
  expandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  expandText: {
    fontSize: 12,
    fontWeight: '600',
    color: CflColors.azul,
  },
  expandedContent: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  divider: {
    height: 1,
    backgroundColor: CflColors.borde,
    marginBottom: 14,
  },
  sectionHeading: {
    fontSize: 12,
    fontWeight: '700',
    color: CflColors.grisClaro,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 6,
  },
  descriptionText: {
    fontSize: 13,
    color: CflColors.grisOscuro,
    lineHeight: 18,
    marginBottom: 12,
  },
  conditionBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#F8FAFC',
    borderRadius: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: CflColors.borde,
    gap: 10,
    marginBottom: 12,
  },
  conditionText: {
    flex: 1,
    fontSize: 12,
    color: CflColors.grisOscuro,
    fontWeight: '600',
    lineHeight: 16,
  },
  chipsContainer: {
    marginBottom: 12,
  },
  chipsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: 4,
  },
  chip: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  chipText: {
    fontSize: 11,
    color: CflColors.grisOscuro,
    fontWeight: '500',
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  metaText: {
    fontSize: 12,
    color: CflColors.grisClaro,
  },
  blueButton: {
    backgroundColor: CflColors.azul,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 10,
    gap: 8,
    shadowColor: CflColors.azul,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  blueButtonText: {
    color: CflColors.blanco,
    fontSize: 14,
    fontWeight: '700',
  },
});
