/**
 * Tabs Layout — CFL 404 Mobile
 * 3 Tabs visibles en la barra inferior: Beneficios, Credencial (centro), Cooperadora.
 * El index (Dashboard) está oculto en la tab bar pero es la ruta inicial.
 * Se comparte el CustomAppHeader en las pantallas del tab group.
 */

import { CustomAppHeader } from "@/components/CustomAppHeader";
import { Colors, Fonts } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        header: () => <CustomAppHeader />,
        tabBarActiveTintColor: Colors.celeste,
        tabBarInactiveTintColor: Colors.grisClaro,
        tabBarStyle: {
          backgroundColor: Colors.blanco,
          borderTopColor: "#E2E8F0",
          borderTopWidth: 1,
          height: 60,
          paddingBottom: 8,
          paddingTop: 6,
        },
        tabBarLabelStyle: {
          fontFamily: Fonts.body,
          fontSize: 12,
          fontWeight: "500",
        },
      }}
    >
      {/* Tab Oculto: Dashboard (Home) */}
      <Tabs.Screen
        name="index"
        options={{
          title: "Inicio",
          tabBarItemStyle: { display: "none" }, // Oculto en la barra inferior
        }}
      />

      {/* Tab 1: Beneficios (Izquierda) */}
      <Tabs.Screen
        name="beneficios"
        options={{
          title: "Beneficios",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "bag" : "bag-outline"}
              size={size || 24}
              color={color}
            />
          ),
        }}
      />

      {/* Tab 2: Credencial / Asistencia (Centro) */}
      <Tabs.Screen
        name="asistencia"
        options={{
          title: "Credencial",
          headerShown: false, // La credencial tiene su propio layout de pantalla completa azul
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "qr-code" : "qr-code-outline"}
              size={(size || 24) + 4}
              color={focused ? Colors.azul : color}
            />
          ),
        }}
      />

      {/* Tab 3: Cooperadora (Derecha) */}
      <Tabs.Screen
        name="cooperadora"
        options={{
          title: "Cooperadora",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "heart" : "heart-outline"}
              size={size || 24}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
