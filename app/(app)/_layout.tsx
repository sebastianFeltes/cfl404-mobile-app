import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { CflColors } from '@/constants/theme';

export default function AppTabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: CflColors.azul,
        tabBarInactiveTintColor: CflColors.grisClaro,
        tabBarStyle: {
          backgroundColor: CflColors.blanco,
          borderTopColor: CflColors.borde,
          borderTopWidth: 1,
          height: 62,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
        headerStyle: {
          backgroundColor: CflColors.azul,
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTintColor: CflColors.blanco,
        headerTitleStyle: {
          fontWeight: '700',
          fontSize: 18,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Inicio',
          headerTitle: 'CFL N° 404',
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons name={focused ? 'home' : 'home-outline'} size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="cursos/index"
        options={{
          title: 'Cursos',
          headerTitle: 'Mis Cursos',
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons name={focused ? 'book' : 'book-outline'} size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="beneficios"
        options={{
          title: 'Beneficios',
          headerTitle: 'Comercios Adheridos',
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons name={focused ? 'pricetag' : 'pricetag-outline'} size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="perfil"
        options={{
          title: 'Perfil',
          headerTitle: 'Perfil del Alumno',
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons name={focused ? 'person' : 'person-outline'} size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="asistencia"
        options={{
          href: null, // Oculto del tab bar principal para mantener 4 pestañas limpias, accesible por ruta
          title: 'Credencial',
          headerTitle: 'Credencial y Asistencia',
        }}
      />
    </Tabs>
  );
}
