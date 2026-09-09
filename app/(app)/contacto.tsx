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
        {/* REQUERIMIENTO: Recuadro "Contacto Institucional" con degradé azul */}
        <LinearGradient
          colors={['#0C4A6E', Palette.azul, Palette.celeste]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.headerGradientCard}>
          <View style={styles.logoBadgeWhite}>
            <Ionicons name="business" size={26} color={Palette.azul} />
          </View>
          <Text style={styles.titleBoldWhite}>Contacto Institucional</Text>
          <Text style={styles.headerSubtitleGold}>
            Centro de Formación Laboral N.º 404 — Sede Berisso
          </Text>
          <Text style={styles.headerTextWhite}>
            Canales de comunicación oficiales para consultas de cursadas, certificados, preceptoría y trámites estudiantiles.
          </Text>
        </LinearGradient>

        {/* Canales de Comunicación y Redes Sociales */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitleBold}>Canales de Comunicación</Text>
          <Text style={styles.sectionSubtitle}>
            Selecciona el medio por el cual deseas contactar al centro
          </Text>

          {/* PRIMERA FILA: Instagram, YouTube, Facebook, X y Mail
              Botones cuadrados con bordes redondeados y sus respectivos logos */}
          <View style={styles.rowBlock}>
            <Text style={styles.rowLabelBold}>Redes Sociales y Correo Electrónico</Text>
            <View style={styles.firstRowContainer}>
              {/* 1. Instagram */}
              <Pressable
                accessibilityLabel="Instagram CFL 404"
                style={({ pressed }) => [
                  styles.squareButton,
                  styles.igBtn,
                  pressed && styles.buttonPressed,
                ]}
                onPress={() =>
                  handleOpenUrl(cflContactData.social.instagram, 'Instagram')
                }>
                <Ionicons name="logo-instagram" size={26} color={Palette.blanco} />
                <Text style={styles.buttonMiniLabel}>Instagram</Text>
              </Pressable>

              {/* 2. YouTube */}
              <Pressable
                accessibilityLabel="YouTube CFL 404"
                style={({ pressed }) => [
                  styles.squareButton,
                  styles.ytBtn,
                  pressed && styles.buttonPressed,
                ]}
                onPress={() =>
                  handleOpenUrl(cflContactData.social.youtube, 'YouTube')
                }>
                <Ionicons name="logo-youtube" size={26} color={Palette.blanco} />
                <Text style={styles.buttonMiniLabel}>YouTube</Text>
              </Pressable>

              {/* 3. Facebook */}
              <Pressable
                accessibilityLabel="Facebook CFL 404"
                style={({ pressed }) => [
                  styles.squareButton,
                  styles.fbBtn,
                  pressed && styles.buttonPressed,
                ]}
                onPress={() =>
                  handleOpenUrl(cflContactData.social.facebook, 'Facebook')
                }>
                <Ionicons name="logo-facebook" size={26} color={Palette.blanco} />
                <Text style={styles.buttonMiniLabel}>Facebook</Text>
              </Pressable>

              {/* 4. X (Twitter) */}
              <Pressable
                accessibilityLabel="X (Twitter) CFL 404"
                style={({ pressed }) => [
                  styles.squareButton,
                  styles.xBtn,
                  pressed && styles.buttonPressed,
                ]}
                onPress={() =>
                  handleOpenUrl(cflContactData.social.twitterX, 'X')
                }>
                <FontAwesome6 name="x-twitter" size={22} color={Palette.blanco} />
                <Text style={styles.buttonMiniLabel}>X</Text>
              </Pressable>

              {/* 5. Mail */}
              <Pressable
                accessibilityLabel="Correo institucional CFL 404"
                style={({ pressed }) => [
                  styles.squareButton,
                  styles.mailBtn,
                  pressed && styles.buttonPressed,
                ]}
                onPress={() =>
                  handleOpenUrl(cflContactData.social.email, 'Correo Electrónico')
                }>
                <Ionicons name="mail" size={24} color={Palette.blanco} />
                <Text style={styles.buttonMiniLabel}>Mail</Text>
              </Pressable>
            </View>
          </View>

          {/* SEGUNDA FILA: WhatsApp y Teléfono Fijo */}
          <View style={styles.rowBlock}>
            <Text style={styles.rowLabelBold}>Atención Telefónica Directa</Text>
            <View style={styles.secondRowContainer}>
              {/* WhatsApp */}
              <Pressable
                accessibilityLabel="WhatsApp Institucional"
                style={({ pressed }) => [
                  styles.secondRowButton,
                  styles.waBtn,
                  pressed && styles.buttonPressed,
                ]}
                onPress={() =>
                  handleOpenUrl(cflContactData.social.whatsapp, 'WhatsApp Institucional')
                }>
                <View style={styles.secondRowIconBox}>
                  <Ionicons name="logo-whatsapp" size={26} color={Palette.blanco} />
                </View>
                <View style={styles.secondRowTextCol}>
                  <Text style={styles.secondRowTitleBold}>WhatsApp Institucional</Text>
                  <Text style={styles.secondRowSub}>Consultas estudiantiles</Text>
                  <Text style={styles.secondRowNumber}>+54 9 221 319-2360</Text>
                </View>
                <Ionicons name="chevron-forward" size={18} color="#D1FAE5" />
              </Pressable>

              {/* Teléfono Fijo */}
              <Pressable
                accessibilityLabel="Teléfono Fijo CFL 404"
                style={({ pressed }) => [
                  styles.secondRowButton,
                  styles.telBtn,
                  pressed && styles.buttonPressed,
                ]}
                onPress={() =>
                  handleOpenUrl(cflContactData.social.phone, 'Teléfono Fijo')
                }>
                <View style={[styles.secondRowIconBox, { backgroundColor: '#0C4A6E' }]}>
                  <Ionicons name="call" size={24} color={Palette.blanco} />
                </View>
                <View style={styles.secondRowTextCol}>
                  <Text style={styles.secondRowTitleBold}>Teléfono Fijo</Text>
                  <Text style={styles.secondRowSub}>Sede central Berisso</Text>
                  <Text style={styles.secondRowNumber}>{cflContactData.phone}</Text>
                </View>
                <Ionicons name="chevron-forward" size={18} color="#BAE6FD" />
              </Pressable>
            </View>
          </View>
        </View>

        {/* Ubicación y Horarios de Atención */}
        <View style={styles.infoCard}>
          <Text style={styles.sectionTitleBold}>Sede y Horarios de Atención</Text>

          <View style={styles.infoRow}>
            <View style={styles.infoIconBox}>
              <Ionicons name="location" size={20} color={Palette.azul} />
            </View>
            <View style={styles.infoTextCol}>
              <Text style={styles.infoTitleBold}>Dirección</Text>
              <Text style={styles.infoValue}>{cflContactData.address}</Text>
              <Text style={styles.infoSub}>{cflContactData.city}</Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <View style={styles.infoIconBox}>
              <Ionicons name="time" size={20} color={Palette.azul} />
            </View>
            <View style={styles.infoTextCol}>
              <Text style={styles.infoTitleBold}>Horario de Preceptoría y Alumnos</Text>
              <Text style={styles.infoValue}>{cflContactData.schedule}</Text>
              <Text style={styles.infoSub}>Días hábiles escolares</Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <View style={styles.infoIconBox}>
              <Ionicons name="mail-outline" size={20} color={Palette.azul} />
            </View>
            <View style={styles.infoTextCol}>
              <Text style={styles.infoTitleBold}>Correo Institucional Oficial</Text>
              <Text style={styles.infoValue}>{cflContactData.email}</Text>
            </View>
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
    borderRadius: 16,
    padding: 22,
    marginBottom: 18,
    alignItems: 'center',
    shadowColor: Palette.azul,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  logoBadgeWhite: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: Palette.blanco,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  titleBoldWhite: {
    fontFamily: Typography.fontFamily.bold,
    fontWeight: 'bold',
    fontSize: 22,
    color: Palette.blanco,
    marginBottom: 4,
    textAlign: 'center',
  },
  headerSubtitleGold: {
    fontFamily: Typography.fontFamily.bold,
    fontWeight: 'bold',
    fontSize: 14,
    color: Palette.amarillo,
    marginBottom: 10,
    textAlign: 'center',
  },
  headerTextWhite: {
    fontFamily: Typography.fontFamily.semiBold,
    fontWeight: 'bold',
    fontSize: 13,
    color: '#E0F2FE',
    textAlign: 'center',
    lineHeight: 18,
  },
  sectionCard: {
    backgroundColor: Palette.blanco,
    borderRadius: 14,
    padding: 18,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Palette.border,
  },
  sectionTitleBold: {
    fontFamily: Typography.fontFamily.bold,
    fontWeight: 'bold',
    fontSize: 18,
    color: Palette.grisOscuro,
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontFamily: Typography.fontFamily.regular,
    fontSize: 13,
    color: Palette.grisClaro,
    marginBottom: 18,
  },
  rowBlock: {
    marginBottom: 18,
  },
  rowLabelBold: {
    fontFamily: Typography.fontFamily.bold,
    fontWeight: 'bold',
    fontSize: 14,
    color: Palette.grisOscuro,
    marginBottom: 10,
  },

  /* PRIMERA FILA: 5 botones cuadrados con bordes redondeados */
  firstRowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 8,
  },
  squareButton: {
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
    padding: 6,
  },
  buttonPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.96 }],
  },
  buttonMiniLabel: {
    fontFamily: Typography.fontFamily.bold,
    fontWeight: 'bold',
    fontSize: 9,
    color: Palette.blanco,
    marginTop: 4,
    textAlign: 'center',
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

  /* SEGUNDA FILA: WhatsApp y Teléfono Fijo */
  secondRowContainer: {
    flexDirection: 'column',
    gap: 12,
  },
  secondRowButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 14,
    padding: 14,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  waBtn: {
    backgroundColor: '#10B981',
  },
  telBtn: {
    backgroundColor: Palette.azul,
  },
  secondRowIconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#059669',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  secondRowTextCol: {
    flex: 1,
  },
  secondRowTitleBold: {
    fontFamily: Typography.fontFamily.bold,
    fontWeight: 'bold',
    fontSize: 15,
    color: Palette.blanco,
    marginBottom: 2,
  },
  secondRowSub: {
    fontFamily: Typography.fontFamily.regular,
    fontSize: 12,
    color: '#E0F2FE',
  },
  secondRowNumber: {
    fontFamily: Typography.fontFamily.bold,
    fontWeight: 'bold',
    fontSize: 13,
    color: Palette.amarillo,
    marginTop: 2,
  },

  /* Información de sede y horarios */
  infoCard: {
    backgroundColor: Palette.blanco,
    borderRadius: 14,
    padding: 18,
    borderWidth: 1,
    borderColor: Palette.border,
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Palette.surfaceSubtle,
  },
  infoIconBox: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: '#EBF5FB',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  infoTextCol: {
    flex: 1,
  },
  infoTitleBold: {
    fontFamily: Typography.fontFamily.bold,
    fontWeight: 'bold',
    fontSize: 14,
    color: Palette.grisOscuro,
    marginBottom: 2,
  },
  infoValue: {
    fontFamily: Typography.fontFamily.regular,
    fontSize: 13,
    color: Palette.grisOscuro,
    lineHeight: 18,
  },
  infoSub: {
    fontFamily: Typography.fontFamily.regular,
    fontSize: 12,
    color: Palette.grisClaro,
    marginTop: 2,
  },
});