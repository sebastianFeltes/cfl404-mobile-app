import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  SafeAreaView,
  Linking,
  Alert,
} from 'react-native';
import { Ionicons, FontAwesome6 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

import { Palette, Typography } from '@/constants/theme';
import { cflContactData } from '@/data/coursesData';

export default function ContactoScreen() {
  const handleOpenUrl = async (url: string, description: string) => {
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert('Contacto', `Acceso a ${description}: ${url}`);
      }
    } catch {
      Alert.alert('Contacto', `No se pudo abrir ${description}`);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}>
        {/* REQUERIMIENTO: Recuadro "Contacto Institucional" con degradé azul y letras blancas */}
        <LinearGradient
          colors={['#0C4A6E', Palette.azul, Palette.celeste]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.headerGradientCard}>
          <View style={styles.logoBadgeWhite}>
            <Ionicons name="business" size={26} color={Palette.azul} />
          </View>
          <Text style={styles.titleBoldWhite}>Contacto Institucional</Text>
          <Text style={styles.headerSubtitleWhite}>
            Centro de Formación Laboral N.º 404 — Sede Berisso
          </Text>
          <Text style={styles.headerTextWhite}>
            Canales de comunicación oficiales para consultas de cursadas, certificados, preceptoría y trámites estudiantiles.
          </Text>
        </LinearGradient>

        {/* PRIMERA SECCIÓN: Redes Sociales (solo iconos, botones cuadrados con bordes redondeados) */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Ionicons name="share-social-outline" size={20} color={Palette.azul} />
            <Text style={styles.sectionTitle}>Redes Sociales y Correo</Text>
          </View>

          <View style={styles.socialCard}>
            <View style={styles.firstRowContainer}>
              {/* 1. Instagram (solo icono) */}
              <Pressable
                accessibilityLabel="Instagram CFL 404"
                style={({ pressed }) => [
                  styles.squareIconButton,
                  styles.igBtn,
                  pressed && styles.buttonPressed,
                ]}
                onPress={() =>
                  handleOpenUrl(cflContactData.social.instagram, 'Instagram')
                }>
                <Ionicons name="logo-instagram" size={26} color={Palette.blanco} />
              </Pressable>

              {/* 2. YouTube (solo icono) */}
              <Pressable
                accessibilityLabel="YouTube CFL 404"
                style={({ pressed }) => [
                  styles.squareIconButton,
                  styles.ytBtn,
                  pressed && styles.buttonPressed,
                ]}
                onPress={() =>
                  handleOpenUrl(cflContactData.social.youtube, 'YouTube')
                }>
                <Ionicons name="logo-youtube" size={26} color={Palette.blanco} />
              </Pressable>

              {/* 3. Facebook (solo icono) */}
              <Pressable
                accessibilityLabel="Facebook CFL 404"
                style={({ pressed }) => [
                  styles.squareIconButton,
                  styles.fbBtn,
                  pressed && styles.buttonPressed,
                ]}
                onPress={() =>
                  handleOpenUrl(cflContactData.social.facebook, 'Facebook')
                }>
                <Ionicons name="logo-facebook" size={26} color={Palette.blanco} />
              </Pressable>

              {/* 4. X (Twitter) (solo icono) */}
              <Pressable
                accessibilityLabel="X (Twitter) CFL 404"
                style={({ pressed }) => [
                  styles.squareIconButton,
                  styles.xBtn,
                  pressed && styles.buttonPressed,
                ]}
                onPress={() =>
                  handleOpenUrl(cflContactData.social.twitterX, 'X')
                }>
                <FontAwesome6 name="x-twitter" size={22} color={Palette.blanco} />
              </Pressable>

              {/* 5. Mail (solo icono) */}
              <Pressable
                accessibilityLabel="Correo institucional CFL 404"
                style={({ pressed }) => [
                  styles.squareIconButton,
                  styles.mailBtn,
                  pressed && styles.buttonPressed,
                ]}
                onPress={() =>
                  handleOpenUrl(cflContactData.social.email, 'Correo Electrónico')
                }>
                <Ionicons name="mail" size={24} color={Palette.blanco} />
              </Pressable>
            </View>
          </View>
        </View>

        {/* SEGUNDA SECCIÓN: Atención Telefónica Directa (estilo 'iconos y letras' de PERFIL) */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Ionicons name="call-outline" size={20} color={Palette.azul} />
            <Text style={styles.sectionTitle}>Atención Telefónica y Mensajería</Text>
          </View>

          <View style={styles.card}>
            {/* WhatsApp Institucional */}
            <Pressable
              style={({ pressed }) => [styles.fieldPressableRow, pressed && styles.rowPressed]}
              onPress={() =>
                handleOpenUrl(cflContactData.social.whatsapp, 'WhatsApp Institucional')
              }>
              <View style={[styles.fieldIconContainer, { backgroundColor: '#DCFCE7' }]}>
                <Ionicons name="logo-whatsapp" size={20} color={Palette.success} />
              </View>
              <View style={styles.fieldTextContainer}>
                <Text style={styles.fieldLabel}>WHATSAPP INSTITUCIONAL</Text>
                <Text style={styles.fieldValue}>+54 9 221 319-2360</Text>
                <Text style={styles.fieldSub}>Consultas estudiantiles y trámites</Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color={Palette.grisClaro} />
            </Pressable>

            <View style={styles.fieldDivider} />

            {/* Teléfono Fijo */}
            <Pressable
              style={({ pressed }) => [styles.fieldPressableRow, pressed && styles.rowPressed]}
              onPress={() =>
                handleOpenUrl(cflContactData.social.phone, 'Teléfono Fijo')
              }>
              <View style={styles.fieldIconContainer}>
                <Ionicons name="call-outline" size={18} color={Palette.azul} />
              </View>
              <View style={styles.fieldTextContainer}>
                <Text style={styles.fieldLabel}>TELÉFONO FIJO</Text>
                <Text style={styles.fieldValue}>{cflContactData.phone}</Text>
                <Text style={styles.fieldSub}>Sede central Berisso</Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color={Palette.grisClaro} />
            </Pressable>
          </View>
        </View>

        {/* TERCERA SECCIÓN: Sede y Horarios de Atención (estilo 'iconos y letras' de PERFIL) */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Ionicons name="location-outline" size={20} color={Palette.azul} />
            <Text style={styles.sectionTitle}>Sede y Horarios de Atención</Text>
          </View>

          <View style={styles.card}>
            {/* Dirección */}
            <View style={styles.fieldRow}>
              <View style={styles.fieldIconContainer}>
                <Ionicons name="location-outline" size={18} color={Palette.azul} />
              </View>
              <View style={styles.fieldTextContainer}>
                <Text style={styles.fieldLabel}>DIRECCIÓN</Text>
                <Text style={styles.fieldValue}>{cflContactData.address}</Text>
                <Text style={styles.fieldSub}>{cflContactData.city}</Text>
              </View>
            </View>

            <View style={styles.fieldDivider} />

            {/* Horario de Atención */}
            <View style={styles.fieldRow}>
              <View style={styles.fieldIconContainer}>
                <Ionicons name="time-outline" size={18} color={Palette.azul} />
              </View>
              <View style={styles.fieldTextContainer}>
                <Text style={styles.fieldLabel}>HORARIO DE PRECEPTORÍA Y ALUMNOS</Text>
                <Text style={styles.fieldValue}>{cflContactData.schedule}</Text>
                <Text style={styles.fieldSub}>Días hábiles escolares</Text>
              </View>
            </View>

            <View style={styles.fieldDivider} />

            {/* Correo Oficial */}
            <Pressable
              style={({ pressed }) => [styles.fieldPressableRow, pressed && styles.rowPressed]}
              onPress={() =>
                handleOpenUrl(cflContactData.social.email, 'Correo Institucional')
              }>
              <View style={styles.fieldIconContainer}>
                <Ionicons name="mail-outline" size={18} color={Palette.azul} />
              </View>
              <View style={styles.fieldTextContainer}>
                <Text style={styles.fieldLabel}>CORREO INSTITUCIONAL OFICIAL</Text>
                <Text style={styles.fieldValue}>{cflContactData.email}</Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color={Palette.grisClaro} />
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
  headerGradientCard: {
    borderRadius: 20,
    padding: 24,
    marginBottom: 20,
    alignItems: 'center',
    shadowColor: Palette.azul,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.22,
    shadowRadius: 8,
    elevation: 4,
  },
  logoBadgeWhite: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: Palette.blanco,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 3,
  },
  titleBoldWhite: {
    fontFamily: Typography.fontFamily.bold,
    fontWeight: 'bold',
    fontSize: 22,
    color: Palette.blanco,
    marginBottom: 4,
    textAlign: 'center',
  },
  headerSubtitleWhite: {
    fontFamily: Typography.fontFamily.bold,
    fontWeight: 'bold',
    fontSize: 14,
    color: Palette.blanco,
    marginBottom: 10,
    textAlign: 'center',
  },
  headerTextWhite: {
    fontFamily: Typography.fontFamily.regular,
    fontSize: 13,
    color: '#E0F2FE',
    textAlign: 'center',
    lineHeight: 18,
  },

  /* Secciones estilo módulo Perfil */
  sectionContainer: {
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 10,
    paddingHorizontal: 4,
  },
  sectionTitle: {
    fontFamily: Typography.fontFamily.bold,
    fontSize: 15,
    fontWeight: '700',
    color: Palette.grisOscuro,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },

  /* Card contenedor de botones de redes sociales */
  socialCard: {
    backgroundColor: Palette.blanco,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: Palette.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 3,
    elevation: 1,
  },
  firstRowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 8,
  },
  squareIconButton: {
    flex: 1,
    aspectRatio: 1,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  buttonPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.96 }],
  },
  igBtn: {
    backgroundColor: '#E1306C',
  },
  ytBtn: {
    backgroundColor: '#FF0000',
  },
  fbBtn: {
    backgroundColor: '#1877F2',
  },
  xBtn: {
    backgroundColor: '#000000',
  },
  mailBtn: {
    backgroundColor: Palette.azul,
  },

  /* Card con estilo "iconos y letras" de PERFIL */
  card: {
    backgroundColor: Palette.blanco,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: Palette.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 3,
    elevation: 1,
  },
  fieldRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 12,
    gap: 12,
  },
  fieldPressableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    gap: 12,
  },
  rowPressed: {
    opacity: 0.8,
  },
  fieldIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#EBF4FA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fieldTextContainer: {
    flex: 1,
  },
  fieldLabel: {
    fontFamily: Typography.fontFamily.bold,
    fontSize: 11,
    color: Palette.grisClaro,
    fontWeight: '600',
    marginBottom: 3,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  fieldValue: {
    fontFamily: Typography.fontFamily.semiBold,
    fontSize: 14,
    color: Palette.grisOscuro,
    fontWeight: '600',
    lineHeight: 20,
  },
  fieldSub: {
    fontFamily: Typography.fontFamily.regular,
    fontSize: 12,
    color: Palette.grisClaro,
    marginTop: 2,
  },
  fieldDivider: {
    height: 1,
    backgroundColor: Palette.border,
  },
});