/**
 * Cursos List Layout / Stack — CFL 404 Mobile
 */

import { Stack } from 'expo-router';
import { Colors } from '@/constants/theme';

export default function CursosLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerTintColor: Colors.azul,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        contentStyle: { backgroundColor: Colors.blanco },
      }}
    >
      <Stack.Screen name="index" options={{ title: 'Mis Cursos' }} />
      <Stack.Screen name="[id]" options={{ title: 'Detalle de Curso' }} />
    </Stack>
  );
}
