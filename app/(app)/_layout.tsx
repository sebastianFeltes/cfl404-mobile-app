/**
 * App Layout — Drawer de la aplicación post-login.
 * Contiene el Tabs layout como pantalla principal, además de pantallas del menú hamburguesa.
 */

import { Drawer } from 'expo-router/drawer';
import { CustomDrawerContent } from '@/components/CustomDrawerContent';
import { CustomAppHeader } from '@/components/CustomAppHeader';
import { Colors } from '@/constants/theme';

export default function AppLayout() {
  return (
    <Drawer
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerActiveTintColor: Colors.azul,
        drawerInactiveTintColor: Colors.grisOscuro,
        drawerPosition: 'right', // Se abre desde la derecha donde está el icono hamburguesa
        swipeEdgeWidth: 50,
      }}
    >
      <Drawer.Screen
        name="(tabs)"
        options={{
          drawerItemStyle: { display: 'none' }, // No mostrar tabs como item en el drawer
        }}
      />
      <Drawer.Screen
        name="perfil"
        options={{
          title: 'Mi Perfil',
          headerShown: true,
          header: () => <CustomAppHeader />,
          drawerItemStyle: { display: 'none' },
        }}
      />
      <Drawer.Screen
        name="ayuda"
        options={{
          title: 'Ayuda',
          headerShown: true,
          header: () => <CustomAppHeader />,
          drawerItemStyle: { display: 'none' },
        }}
      />
      <Drawer.Screen
        name="contacto"
        options={{
          title: 'Contacto Institucional',
          headerShown: true,
          header: () => <CustomAppHeader />,
          drawerItemStyle: { display: 'none' },
        }}
      />
      <Drawer.Screen
        name="cursos"
        options={{
          drawerItemStyle: { display: 'none' },
        }}
      />
    </Drawer>
  );
}

