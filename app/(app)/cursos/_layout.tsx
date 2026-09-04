import React from 'react';
import { Stack } from 'expo-router';
import { Palette, Typography } from '@/constants/theme';

export default function CursosStackLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: Palette.azul,
        },
        headerTintColor: Palette.blanco,
        headerTitleStyle: {
          fontFamily: Typography.fontFamily.bold,
          fontSize: 18,
        },
        headerShadowVisible: false,
      }}>
      <Stack.Screen
        name="index"
        options={{
          title: 'Mis Cursos',
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="[id]"
        options={{
          title: 'Detalle de Cursada',
          headerTitleAlign: 'center',
          headerBackTitle: 'Cursos',
        }}
      />
    </Stack>
  );
}