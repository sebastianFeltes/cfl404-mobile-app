/**
 * Drawer Custom Content — CFL 404 Mobile
 * - Fondo azul institucional (#166193).
 * - Textos e íconos en blanco.
 * - Información del usuario intacta.
 * - Opciones: Perfil, Ayuda, Contacto, Cerrar sesión.
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking, Alert } from 'react-native';
import { DrawerContentScrollView } from 'expo-router/drawer';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuth } from '@/context/AuthContext';
import { Colors, Fonts, Spacing } from '@/constants/theme';

export function CustomDrawerContent(props: any) {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    router.replace('/(auth)/login');
  };

  const handleOpenPlataformaWeb = async () => {
    const url = 'https://cfl404.ar';
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        await Linking.openURL(url);
      }
    } catch {
      Alert.alert('Plataforma Web', 'No se pudo abrir el enlace a la plataforma web institucional.');
    }
  };

  return (
    <View style={styles.container}>
      <DrawerContentScrollView {...props} contentContainerStyle={styles.scrollContent}>
        {/* Cabecera del Drawer con datos de usuario */}
        <View style={styles.userHeader}>
          <View style={styles.avatarPlaceholder}>
            <Ionicons name="person" size={32} color={Colors.azul} />
          </View>
          <Text style={styles.userName}>{user?.nombre || 'Alumno'}</Text>
          <Text style={styles.userEmail}>{user?.email || 'alumno@cfl404.edu.ar'}</Text>
          {user?.legajo && (
            <Text style={styles.userLegajo}>Legajo: {user.legajo}</Text>
          )}
        </View>

        <View style={styles.divider} />

        {/* Opciones del Drawer */}
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => router.push('/(app)/perfil')}
          activeOpacity={0.7}
        >
          <Ionicons name="person-outline" size={22} color={Colors.blanco} />
          <Text style={styles.menuItemText}>Perfil</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => router.push('/(app)/ayuda')}
          activeOpacity={0.7}
        >
          <Ionicons name="help-circle-outline" size={22} color={Colors.blanco} />
          <Text style={styles.menuItemText}>Ayuda</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => router.push('/(app)/contacto')}
          activeOpacity={0.7}
        >
          <Ionicons name="mail-outline" size={22} color={Colors.blanco} />
          <Text style={styles.menuItemText}>Contacto</Text>
        </TouchableOpacity>

        {/* 4to botón: Plataforma Web */}
        <TouchableOpacity
          style={styles.menuItem}
          onPress={handleOpenPlataformaWeb}
          activeOpacity={0.7}
        >
          <Ionicons name="globe-outline" size={22} color={Colors.blanco} />
          <Text style={styles.menuItemText}>Plataforma Web</Text>
        </TouchableOpacity>
      </DrawerContentScrollView>

      {/* Pie con botón de Cerrar sesión */}
      <View style={[styles.footer, { paddingBottom: Math.max(insets.bottom, 16) + 12 }]}>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout} activeOpacity={0.7}>
          <Ionicons name="log-out-outline" size={20} color={Colors.blanco} />
          <Text style={styles.logoutText}>Cerrar sesión</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.azul,
  },
  scrollContent: {
    paddingTop: Spacing.lg,
  },
  userHeader: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.md,
  },
  avatarPlaceholder: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: Colors.blanco,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.sm,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  userName: {
    fontFamily: Fonts.title,
    fontSize: 18,
    color: Colors.blanco,
    fontWeight: '700',
  },
  userEmail: {
    fontFamily: Fonts.body,
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.85)',
    marginTop: 2,
  },
  userLegajo: {
    fontFamily: Fonts.body,
    fontSize: 12,
    color: Colors.blanco,
    marginTop: 4,
    fontWeight: '400',
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    marginVertical: Spacing.md,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: Spacing.lg,
    gap: 16,
  },
  menuItemText: {
    fontFamily: Fonts.body,
    fontSize: 16,
    color: Colors.blanco,
    fontWeight: '500',
  },
  footer: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.2)',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.45)',
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
  },
  logoutText: {
    fontFamily: Fonts.title,
    fontSize: 15,
    color: Colors.blanco,
    fontWeight: '700',
  },
});
