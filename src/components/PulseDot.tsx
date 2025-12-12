import { useEffect, useRef, useMemo } from 'react';
import { View, Animated, Easing } from 'react-native';
import { COLORS } from '../constants';

type Props = {
  mood: 'sunny' | 'stormy';
  size?: number;
  delay?: number;
};

export default function PulseDot({ mood, size = 12, delay }: Props) {
  const scaleAnim = useRef(new Animated.Value(0.85)).current;
  const opacityAnim = useRef(new Animated.Value(0.7)).current;

  const color = mood === 'sunny' ? COLORS.sunny : COLORS.stormy;
  
  // Random delay if not specified (0-2000ms)
  const animationDelay = useMemo(() => delay ?? Math.random() * 2000, [delay]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      // Scale animation
      Animated.loop(
        Animated.sequence([
          Animated.timing(scaleAnim, {
            toValue: 1.15,
            duration: 1500,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(scaleAnim, {
            toValue: 0.85,
            duration: 1500,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ])
      ).start();

      // Opacity animation
      Animated.loop(
        Animated.sequence([
          Animated.timing(opacityAnim, {
            toValue: 1,
            duration: 1500,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(opacityAnim, {
            toValue: 0.7,
            duration: 1500,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ])
      ).start();
    }, animationDelay);

    return () => clearTimeout(timeout);
  }, [animationDelay]);

  return (
    <Animated.View 
      style={{
        transform: [{ scale: scaleAnim }],
        opacity: opacityAnim,
      }}
    >
      <View
        style={{
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: color,
          shadowColor: color,
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0.8,
          shadowRadius: size * 0.6,
          elevation: 8,
        }}
      />
    </Animated.View>
  );
}

