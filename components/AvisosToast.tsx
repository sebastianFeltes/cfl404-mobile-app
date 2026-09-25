/**
 * AvisosToast — CFL 404 Mobile
 * Banner / Toast de avisos con estilo institucional.
 * - Gradiente azul a celeste (idéntico al de la pantalla Perfil).
 * - Icono de campanita en amarillo (#FDEA14).
 * - Tipografía en amarillo institucional (#FDEA14).
 * - Ubicado por encima de "Cursadas activas — Ciclo 2026", centrado en la pantalla.
 * - Altura reducida (formato finito / compact).
 * - Animaciones de deslizamiento (entrada/salida hacia la derecha), latencia sutil y botón de cierre "X".
 */

import React, { useEffect, useRef, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
  Easing,
  useWindowDimensions,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Fonts } from '@/constants/theme';

interface AvisosToastProps {
  onPress?: () => void;
  onClose?: () => void;
}

export function AvisosToast({ onPress, onClose }: AvisosToastProps) {
  const { width } = useWindowDimensions();
  const [isClosed, setIsClosed] = useState(false);

  // Animación de deslizamiento lateral desde la derecha
  const slideAnim = useRef(new Animated.Value(width)).current;
  // Animación de latencia / respiración sutil
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // 1. Entrada suave desde la derecha
    Animated.spring(slideAnim, {
      toValue: 0,
      damping: 18,
      stiffness: 140,
      mass: 0.9,
      useNativeDriver: true,
    }).start();

    // 2. Latencia suave continua
    const pulseLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.025,
          duration: 1200,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1200,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ])
    );

    pulseLoop.start();

    return () => {
      pulseLoop.stop();
    };
  }, [slideAnim, pulseAnim, width]);

  const handleClose = () => {
    Animated.timing(slideAnim, {
      toValue: width,
      duration: 250,
      easing: Easing.in(Easing.cubic),
      useNativeDriver: true,
    }).start(() => {
      setIsClosed(true);
      onClose?.();
    });
  };

  if (isClosed) {
    return null;
  }

  return (
    <Animated.View
      style={[
        styles.wrapper,
        {
          transform: [{ translateX: slideAnim }, { scale: pulseAnim }],
        },
      ]}
    >
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={onPress}
        accessibilityLabel="Aviso: Tenés avisos sin leer"
        accessibilityRole="alert"
      >
        <LinearGradient
          colors={[Colors.azul, Colors.celeste]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradientContainer}
        >
          <View style={styles.leftContent}>
            <View style={styles.iconCircle}>
              <MaterialCommunityIcons name="bell-ring-outline" size={19} color={Colors.blanco} />
            </View>
            <Text style={styles.toastText} numberOfLines={1}>
              Tenés avisos sin leer
            </Text>
          </View>

          <TouchableOpacity
            style={styles.closeButton}
            onPress={handleClose}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            activeOpacity={0.7}
            accessibilityLabel="Cerrar notificación"
            accessibilityRole="button"
          >
            <Ionicons name="close" size={18} color={Colors.blanco} />
          </TouchableOpacity>
        </LinearGradient>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    alignSelf: 'center',
    marginBottom: 14,
    zIndex: 99,
  },
  gradientContainer: {
    borderRadius: 10,
    paddingVertical: 7,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: 'rgba(253, 234, 20, 0.4)',
    shadowColor: Colors.azul,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.22,
    shadowRadius: 4,
    elevation: 3,
  },
  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 8,
    gap: 8,
  },
  iconCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(255, 255, 255, 0.18)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  toastText: {
    fontFamily: Fonts.title,
    fontSize: 14.5,
    fontWeight: '700',
    color: Colors.amarillo,
    flexShrink: 1,
  },
  closeButton: {
    padding: 4,
    borderRadius: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.12)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
