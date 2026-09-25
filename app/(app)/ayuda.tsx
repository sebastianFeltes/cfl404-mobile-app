import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  Pressable,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

import { Palette, Typography } from '@/constants/theme';

export default function AyudaScreen() {
  const router = useRouter();

  const helpTopics = [
    {
      id: 'qr',
      icon: 'qr-code-outline' as const,
      title: 'Credencial Digital y Código QR',
      description:
        'Tu credencial contiene un código QR único que te identifica como alumno activo. Al ingresar al centro o aula, preséntala ante el preceptor para registrar tu presentismo.',
      important: 'Recuerda: el alumno no marca asistencia con un botón; la lectura la realiza el personal docente o preceptoría.',
    },
    {
      id: 'cursos',
      icon: 'school-outline' as const,
      title: 'Seguimiento de Cursada y Faltas',
      description:
        'En la pestaña "Cursos" puedes ver todas las materias en las que estás inscripto. Dentro de cada curso encontrarás los datos del aula, docente, enlace al grupo de WhatsApp y recursos académicos.',
      important: 'Usa el botón rectangular "Ver Asistencia" dentro del curso para consultar las faltas restantes y el historial de clases.',
    },
    {
      id: 'justificaciones',
      icon: 'document-text-outline' as const,
      title: 'Justificación de Inasistencias',
      description:
        'Si te ausentaste por motivos de salud o laborales, debes presentar el certificado correspondiente en la preceptoría del centro dentro de las 48 horas hábiles.',
      important: 'Las inasistencias justificadas quedan asentadas en tu historial pero no descuentan de tu límite de faltas.',
    },
    {
      id: 'contacto',
      icon: 'chatbubble-ellipses-outline' as const,
      title: 'Atención al Alumno y Soporte',
      description:
        'Para consultas administrativas, constancias de alumno regular o dudas sobre la plataforma, utiliza los canales directos en la sección de Contacto.',
      important: 'Atención presencial y telefónica: Lunes a Viernes de 08:00 a 21:00 hs.',
    },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}>
        {/* ENCABEZADO CON DEGRADÉ DE COLORES Y LETRA EN BLANCO (ESTILO PERFIL) */}
        <LinearGradient
          colors={[Palette.azul, Palette.celeste]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.heroGradient}>
          <View style={styles.heroIconBadge}>
            <Ionicons name="help-buoy" size={28} color={Palette.azul} />
          </View>
          <Text style={styles.heroTitleBold}>Centro de Ayuda</Text>
          <Text style={styles.heroSubtitleBold}>
            Guía de uso para Alumnos — CFL N.º 404 Berisso
          </Text>
          <Text style={styles.heroDescriptionBold}>
            Todo lo que necesitas saber sobre tu cursada, credencial QR, asistencia y canales de comunicación.
          </Text>
        </LinearGradient>

        {/* Bloque de Acceso Exclusivo para Alumnos con estilo disclaimer de Perfil */}
        <View style={styles.disclaimerBox}>
          <Ionicons name="information-circle" size={22} color={Palette.azul} />
          <View style={styles.disclaimerTextWrapper}>
            <Text style={styles.disclaimerTitleBold}>APLICACIÓN EXCLUSIVA PARA ALUMNOS</Text>
            <Text style={styles.disclaimerText}>
              Esta app está diseñada para facilitar tu vida académica en el centro. Tus datos filiatorios están protegidos y validados por preceptoría.
            </Text>
          </View>
        </View>

        {/* Tarjetas de temas de ayuda al estilo del módulo Perfil */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Ionicons name="help-circle-outline" size={20} color={Palette.azul} />
            <Text style={styles.sectionTitle}>Preguntas Frecuentes y Guías</Text>
          </View>

          {helpTopics.map((topic) => (
            <View key={topic.id} style={styles.topicCard}>
              <View style={styles.topicHeader}>
                <View style={styles.topicIconBox}>
                  <Ionicons name={topic.icon} size={20} color={Palette.azul} />
                </View>
                <Text style={styles.topicTitleBold}>{topic.title}</Text>
              </View>

              <Text style={styles.topicDescription}>{topic.description}</Text>

              {/* REQUERIMIENTO: Mantener las cards verdes con leyenda "importante" */}
              <View style={styles.importantCalloutGreen}>
                <View style={styles.importantHeaderRow}>
                  <Ionicons name="checkmark-circle" size={15} color={Palette.success} style={{ marginRight: 5 }} />
                  <Text style={styles.importantLabelGreenBold}>IMPORTANTE:</Text>
                </View>
                <Text style={styles.importantTextGreenBold}>{topic.important}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Tarjeta de degradé con botón directo de contacto */}
        <LinearGradient
          colors={['#0F4C75', Palette.azul]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.contactGradientCard}>
          <Text style={styles.contactGradientTitleBold}>
            ¿Tienes alguna consulta adicional?
          </Text>
          <Text style={styles.contactGradientTextBold}>
            Comunícate directamente con la secretaría o el equipo de preceptoría a través de nuestros canales oficiales.
          </Text>
          <Pressable
            style={({ pressed }) => [
              styles.contactGradientButton,
              pressed && styles.buttonPressed,
            ]}
            onPress={() => router.push('/(app)/contacto')}>
            <Ionicons name="chatbubbles" size={18} color={Palette.azul} />
            <Text style={styles.contactGradientButtonTextBold}>
              Ir a la Pantalla de Contacto
            </Text>
          </Pressable>
        </LinearGradient>
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

  /* DEGRADÉ DE COLORES PARA LA CABECERA */
  heroGradient: {
    borderRadius: 16,
    padding: 24,
    marginBottom: 20,
    elevation: 4,
    shadowColor: Palette.azul,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    alignItems: 'center',
  },
  heroIconBadge: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: Palette.blanco,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  heroTitleBold: {
    fontFamily: Typography.fontFamily.bold,
    fontWeight: 'bold',
    fontSize: 24,
    color: Palette.blanco,
    marginBottom: 6,
    textAlign: 'center',
  },
  heroSubtitleBold: {
    fontFamily: Typography.fontFamily.bold,
    fontWeight: 'bold',
    fontSize: 14,
    color: Palette.blanco,
    marginBottom: 10,
    textAlign: 'center',
  },
  heroDescriptionBold: {
    fontFamily: Typography.fontFamily.semiBold,
    fontWeight: 'bold',
    fontSize: 13,
    color: '#EBF5FB',
    textAlign: 'center',
    lineHeight: 19,
  },

  /* Disclaimer con estilo del módulo Perfil */
  disclaimerBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#EBF4FA',
    borderRadius: 14,
    padding: 14,
    gap: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#D4E7F5',
  },
  disclaimerTextWrapper: {
    flex: 1,
  },
  disclaimerTitleBold: {
    fontFamily: Typography.fontFamily.bold,
    fontWeight: 'bold',
    fontSize: 11,
    color: Palette.azul,
    letterSpacing: 0.4,
    marginBottom: 3,
    textTransform: 'uppercase',
  },
  disclaimerText: {
    fontFamily: Typography.fontFamily.regular,
    fontSize: 12,
    color: Palette.azul,
    lineHeight: 18,
  },

  /* Secciones con estilo del módulo Perfil */
  sectionContainer: {
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
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
  topicCard: {
    backgroundColor: Palette.blanco,
    borderRadius: 16,
    padding: 18,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: Palette.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 3,
    elevation: 1,
  },
  topicHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  topicIconBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#EBF4FA',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  topicTitleBold: {
    fontFamily: Typography.fontFamily.bold,
    fontWeight: 'bold',
    fontSize: 15,
    color: Palette.grisOscuro,
    flex: 1,
  },
  topicDescription: {
    fontFamily: Typography.fontFamily.regular,
    fontSize: 13,
    color: Palette.grisOscuro,
    lineHeight: 19,
    marginBottom: 10,
  },
  /* Recuadros con la leyenda "importante" coloreados de verde */
  importantCalloutGreen: {
    backgroundColor: '#DCFCE7', // verde suave
    borderRadius: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: '#86EFAC',
    borderLeftWidth: 4,
    borderLeftColor: Palette.success, // verde principal #15803D
    marginTop: 4,
  },
  importantHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  importantLabelGreenBold: {
    fontFamily: Typography.fontFamily.bold,
    fontWeight: 'bold',
    fontSize: 12,
    color: Palette.success,
    letterSpacing: 0.5,
  },
  importantTextGreenBold: {
    fontFamily: Typography.fontFamily.bold,
    fontWeight: 'bold',
    fontSize: 12,
    color: '#14532D', // verde oscuro legible
    lineHeight: 17,
  },

  /* Tarjeta de degradé con botón */
  contactGradientCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    alignItems: 'center',
    elevation: 3,
  },
  contactGradientTitleBold: {
    fontFamily: Typography.fontFamily.bold,
    fontWeight: 'bold',
    fontSize: 16,
    color: Palette.blanco,
    marginBottom: 6,
    textAlign: 'center',
  },
  contactGradientTextBold: {
    fontFamily: Typography.fontFamily.semiBold,
    fontWeight: 'bold',
    fontSize: 12,
    color: '#EBF5FB',
    textAlign: 'center',
    lineHeight: 17,
    marginBottom: 16,
  },
  contactGradientButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Palette.blanco,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  contactGradientButtonTextBold: {
    fontFamily: Typography.fontFamily.bold,
    fontWeight: 'bold',
    fontSize: 13,
    color: Palette.azul,
    marginLeft: 8,
  },
  buttonPressed: {
    opacity: 0.88,
    transform: [{ scale: 0.98 }],
  },
});