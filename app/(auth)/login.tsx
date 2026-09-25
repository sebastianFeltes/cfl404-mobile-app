/**
 * Login — CFL 404 Mobile
 * Misma pieza que el login web: foto del taller, logo y tarjeta blanca de ingreso.
 * La sesión sigue siendo mock.
 */

import { useState } from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { Link, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SvgXml } from 'react-native-svg';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuth } from '@/context/AuthContext';
import { Colors, Fonts } from '@/constants/theme';
import { CFL_LOGO_HERO_SVG } from '@/components/CflLogoHeroSvg';

const GOOGLE_G_SVG = `<svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
  <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
  <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
  <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
  <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
  <path fill="none" d="M0 0h48v48H0z"/>
</svg>`;

export default function LoginScreen() {
  const { login } = useAuth();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [acceptedTerms, setAcceptedTerms] = useState(true);
  const [rememberMe, setRememberMe] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = () => {
    if (!acceptedTerms) {
      setErrorMsg('Debés aceptar los términos y condiciones antes de ingresar.');
      return;
    }
    setErrorMsg('');
    login();
    router.replace('/(app)/(tabs)');
  };

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={[
        styles.screenContent,
        { paddingTop: Math.max(insets.top, 16), paddingBottom: Math.max(insets.bottom, 16) },
      ]}
      bounces={false}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.card}>
        <View style={styles.hero}>
          <View style={styles.heroBody}>
            <SvgXml xml={CFL_LOGO_HERO_SVG} width={176} height={176} />
            <Text style={styles.welcome}>¡Bienvenido/a!</Text>
            <Text style={styles.welcomeHint}>
              Ingresá con tu cuenta de Google para acceder a la plataforma.
            </Text>
          </View>
        </View>

        <View style={styles.form}>
          {errorMsg ? (
            <View style={styles.errorBox}>
              <Ionicons name="warning-outline" size={16} color="#BE123C" />
              <Text style={styles.errorText}>{errorMsg}</Text>
            </View>
          ) : null}

          <Pressable
            style={styles.checkRow}
            onPress={() => {
              setAcceptedTerms((value) => !value);
              setErrorMsg('');
            }}
          >
            <Ionicons
              name={acceptedTerms ? 'checkbox' : 'square-outline'}
              size={18}
              color={acceptedTerms ? Colors.amarillo : Colors.blanco}
            />
            <Text style={styles.checkText}>
              Acepto los términos y condiciones y la política de privacidad, y declaro que mis datos son veraces.
            </Text>
          </Pressable>

          <Pressable style={styles.rememberRow} onPress={() => setRememberMe((value) => !value)}>
            <Ionicons
              name={rememberMe ? 'checkbox' : 'square-outline'}
              size={18}
              color={rememberMe ? Colors.amarillo : Colors.blanco}
            />
            <Text style={styles.rememberText}>Mantener la sesión iniciada en este dispositivo</Text>
          </Pressable>

          <Pressable style={styles.googleButton} onPress={handleLogin}>
            <SvgXml xml={GOOGLE_G_SVG} width={18} height={18} />
            <Text style={styles.googleButtonText}>Iniciar sesión con Google</Text>
          </Pressable>

          <View style={styles.privacyBox}>
            <Ionicons name="shield-checkmark-outline" size={16} color={Colors.blanco} />
            <Text style={styles.privacyText}>
              Usamos tu cuenta de Google solo para verificar tu identidad. Nunca accedemos a tu contraseña ni al contenido de tu correo.
            </Text>
          </View>
        </View>
      </View>

      <Link href="/(auth)/ayuda" style={styles.helpLink}>
        <Text style={styles.helpLinkText}>¿Necesitás ayuda?</Text>
      </Link>
      <Text style={styles.footer}>© 2026 CFL N°404 Berisso. Todos los derechos reservados.</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F1F5F9',
  },
  screenContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  card: {
    backgroundColor: Colors.blanco,
    borderRadius: 28,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#F3F4F6',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.12,
    shadowRadius: 24,
    elevation: 8,
  },
  hero: {
    backgroundColor: Colors.blanco,
    justifyContent: 'flex-end',
  },
  heroBody: {
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 22,
    alignItems: 'center',
    gap: 10,
  },
  form: {
    backgroundColor: Colors.azul,
    paddingHorizontal: 22,
    paddingTop: 22,
    paddingBottom: 20,
  },
  welcome: {
    fontFamily: Fonts.title,
    fontSize: 26,
    fontWeight: '800',
    color: Colors.grisOscuro,
    textAlign: 'center',
    marginBottom: 6,
  },
  welcomeHint: {
    fontFamily: Fonts.body,
    fontSize: 14,
    lineHeight: 20,
    color: Colors.grisClaro,
    textAlign: 'center',
  },
  errorBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    backgroundColor: '#FFF1F2',
    borderLeftWidth: 4,
    borderLeftColor: '#F43F5E',
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
    padding: 12,
    marginBottom: 16,
  },
  errorText: {
    flex: 1,
    fontFamily: Fonts.body,
    fontSize: 13,
    lineHeight: 18,
    color: '#BE123C',
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    gap: 10,
    marginTop: 18,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#747775',
    borderRadius: 999,
    minHeight: 40,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  googleButtonText: {
    fontFamily: Fonts.body,
    fontSize: 14,
    fontWeight: '500',
    color: '#1F1F1F',
    letterSpacing: 0.1,
  },
  checkRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    marginTop: 16,
  },
  checkText: {
    flex: 1,
    fontFamily: Fonts.body,
    fontSize: 12,
    lineHeight: 17,
    color: Colors.blanco,
  },
  rememberRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 14,
  },
  rememberText: {
    fontFamily: Fonts.body,
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  privacyBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    marginTop: 16,
    padding: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.28)',
    borderRadius: 12,
  },
  privacyText: {
    flex: 1,
    fontFamily: Fonts.body,
    fontSize: 12,
    lineHeight: 17,
    color: 'rgba(255, 255, 255, 0.92)',
  },
  helpLink: {
    alignSelf: 'center',
    marginTop: 16,
  },
  helpLinkText: {
    fontFamily: Fonts.body,
    fontSize: 14,
    color: Colors.azul,
    textDecorationLine: 'underline',
  },
  footer: {
    marginTop: 14,
    textAlign: 'center',
    fontFamily: Fonts.body,
    fontSize: 11,
    color: Colors.grisClaro,
  },
});
