/**
 * Auth Layout — Stack sin tabs para pantallas fuera de sesión.
 */

import { Stack } from 'expo-router';
import { Colors } from '@/constants/theme';

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: Colors.fondo },
        animation: 'slide_from_right',
        animationDuration: 320,
        gestureEnabled: true,
      }}
    >
      <Stack.Screen name="login" />
      <Stack.Screen name="ayuda" options={{ headerShown: true, title: 'Ayuda' }} />
    </Stack>
  );
}
