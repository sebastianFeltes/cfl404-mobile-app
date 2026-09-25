/**
 * Cursos List Layout / Stack — CFL 404 Mobile
 */

import { Stack, useRouter } from 'expo-router';
import { Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/theme';

function BackToDashboard() {
  const router = useRouter();

  return (
    <Pressable
      onPress={() => router.replace('/(app)/(tabs)')}
      hitSlop={12}
      accessibilityLabel="Volver al inicio"
      accessibilityRole="button"
      style={{ paddingHorizontal: 8 }}
    >
      <Ionicons name="arrow-back" size={24} color={Colors.azul} />
    </Pressable>
  );
}

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
        animation: 'slide_from_right',
        animationDuration: 320,
        gestureEnabled: true,
      }}
    >
      <Stack.Screen name="index" options={{ title: 'Mis Cursos' }} />
      <Stack.Screen
        name="[id]"
        options={{
          title: 'Detalle de Curso',
          headerBackVisible: false,
          gestureEnabled: false,
          headerLeft: () => <BackToDashboard />,
        }}
      />
    </Stack>
  );
}

