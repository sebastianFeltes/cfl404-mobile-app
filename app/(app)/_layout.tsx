import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/haptic-tab';
import { Palette, Typography } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function AppTabsLayout() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarActiveTintColor: Palette.azul,
        tabBarInactiveTintColor: Palette.grisClaro,
        tabBarStyle: {
          backgroundColor: isDark ? '#1E293B' : Palette.blanco,
          borderTopColor: isDark ? '#334155' : Palette.border,
          borderTopWidth: 1,
          height: Platform.OS === 'ios' ? 88 : 64,
          paddingBottom: Platform.OS === 'ios' ? 28 : 10,
          paddingTop: 8,
          elevation: 4,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.05,
          shadowRadius: 4,
        },
        tabBarLabelStyle: {
          fontFamily: Typography.fontFamily.semiBold,
          fontSize: 11,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Inicio',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'home' : 'home-outline'} size={22} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="cursos"
        options={{
          title: 'Cursos',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'school' : 'school-outline'} size={22} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="asistencia"
        options={{
          title: 'Credencial',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'qr-code' : 'qr-code-outline'} size={22} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="contacto"
        options={{
          title: 'Contacto',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'chatbubbles' : 'chatbubbles-outline'} size={22} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="ayuda"
        options={{
          title: 'Ayuda',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'help-circle' : 'help-circle-outline'} size={22} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}