/**
 * Root Layout — CFL 404 Mobile
 * Carga fuentes, provee AuthContext, y define el stack principal.
 */

import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import { RobotoFlex_400Regular } from '@expo-google-fonts/roboto-flex';
import { Nunito_700Bold } from '@expo-google-fonts/nunito';
import { AuthProvider } from '@/context/AuthContext';
import 'react-native-reanimated';
import 'react-native-gesture-handler';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    RobotoFlex_400Regular,
    Nunito_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <AuthProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(app)" />
      </Stack>
      <StatusBar style="dark" />
    </AuthProvider>
  );
}
