/**
 * Login — CFL 404 Mobile
 * Pantalla de inicio de sesión con autenticación mock.
 */

import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '@/context/AuthContext';
import { Colors, Fonts, Spacing } from '@/constants/theme';

export default function LoginScreen() {
  const { login } = useAuth();
  const router = useRouter();

  const handleLogin = () => {
    login();
    router.replace('/(app)/(tabs)');
  };

  return (
    <View style={styles.container}>
      {/* Logo placeholder */}
      <View style={styles.logoContainer}>
        <View style={styles.logoPlaceholder}>
          <Text style={styles.logoText}>CFL 404</Text>
        </View>
        <Text style={styles.subtitle}>Centro de Formación Laboral N° 404</Text>
      </View>

      {/* Botón de login */}
      <TouchableOpacity style={styles.googleButton} onPress={handleLogin}>
        <Ionicons name="logo-google" size={22} color={Colors.blanco} />
        <Text style={styles.googleButtonText}>Iniciar sesión con Google</Text>
      </TouchableOpacity>

      {/* Link a ayuda */}
      <Link href="/(auth)/ayuda" style={styles.helpLink}>
        <Text style={styles.helpLinkText}>¿Necesitás ayuda?</Text>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.blanco,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 64,
  },
  logoPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: Colors.azul,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  logoText: {
    fontFamily: Fonts.title,
    fontSize: 24,
    color: Colors.blanco,
    fontWeight: '700',
  },
  subtitle: {
    fontFamily: Fonts.body,
    fontSize: 16,
    color: Colors.grisClaro,
    textAlign: 'center',
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.azul,
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 12,
    gap: 12,
    width: '100%',
    justifyContent: 'center',
  },
  googleButtonText: {
    fontFamily: Fonts.title,
    fontSize: 16,
    color: Colors.blanco,
    fontWeight: '700',
  },
  helpLink: {
    marginTop: Spacing.lg,
  },
  helpLinkText: {
    fontFamily: Fonts.body,
    fontSize: 14,
    color: Colors.celeste,
    textDecorationLine: 'underline',
  },
});
