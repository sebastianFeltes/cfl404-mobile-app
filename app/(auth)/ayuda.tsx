/**
 * Ayuda (Auth) — CFL 404 Mobile
 * Pantalla de ayuda accesible desde el login.
 */

import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Colors, Fonts, Spacing } from '@/constants/theme';

export default function AyudaAuthScreen() {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      <Text style={styles.title}>¿Cómo usar la app?</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Iniciar sesión</Text>
        <Text style={styles.sectionBody}>
          Tocá el botón &quot;Iniciar sesión con Google&quot; y usá tu cuenta de correo
          electrónico institucional para acceder a la app.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Dashboard</Text>
        <Text style={styles.sectionBody}>
          Una vez dentro, vas a ver tus cursos actuales. Tocá cualquier curso
          para ver más detalles.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Credencial</Text>
        <Text style={styles.sectionBody}>
          En la pestaña &quot;Credencial&quot; vas a encontrar tu carnet digital con un
          código QR que el personal del instituto puede escanear para registrar
          tu asistencia.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>¿Problemas?</Text>
        <Text style={styles.sectionBody}>
          Si tenés algún inconveniente, contactá a la administración del CFL 404
          a través de la sección &quot;Contacto&quot; dentro de la app.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.blanco,
  },
  content: {
    padding: Spacing.lg,
  },
  title: {
    fontFamily: Fonts.title,
    fontSize: 24,
    color: Colors.grisOscuro,
    marginBottom: Spacing.lg,
  },
  section: {
    marginBottom: Spacing.lg,
  },
  sectionTitle: {
    fontFamily: Fonts.title,
    fontSize: 18,
    color: Colors.azul,
    marginBottom: Spacing.sm,
  },
  sectionBody: {
    fontFamily: Fonts.body,
    fontSize: 15,
    color: Colors.grisOscuro,
    lineHeight: 22,
  },
});
