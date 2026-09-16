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
        contentStyle: { backgroundColor: Colors.blanco },
      }}
    >
      <Stack.Screen name="login" />
      <Stack.Screen name="ayuda" options={{ headerShown: true, title: 'Ayuda' }} />
    </Stack>
  );
}
