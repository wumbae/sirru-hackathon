import { useState, useRef, useEffect } from 'react';
import { View, Text, Pressable, Animated, Easing } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { COLORS } from '../constants';
import { MainStackParamList } from '../navigation/types';

const TARGET_CYCLES = 3; // Navigate to complete screen after 3 cycles

type Phase = 'idle' | 'inhale' | 'hold1' | 'exhale' | 'hold2';

const PHASE_DURATION = 4000; // 4 seconds per phase
const PHASE_LABELS: Record<Phase, string> = {
  idle: 'Ready',
  inhale: 'Inhale',
  hold1: 'Hold',
  exhale: 'Exhale',
  hold2: 'Hold',
};

export default function BreathingScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NativeStackNavigationProp<MainStackParamList>>();
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState<Phase>('idle');
  const [countdown, setCountdown] = useState(4);
  const [cycles, setCycles] = useState(0);
  const [totalSeconds, setTotalSeconds] = useState(0);
  const totalSecondsRef = useRef(0); // Ref to track seconds for navigation

  // Animation values
  const scaleAnim = useRef(new Animated.Value(0.6)).current;
  const opacityAnim = useRef(new Animated.Value(0.3)).current;
  const glowAnim = useRef(new Animated.Value(0)).current;

  // Timers
  const phaseTimer = useRef<NodeJS.Timeout | null>(null);
  const countdownTimer = useRef<NodeJS.Timeout | null>(null);
  const durationTimer = useRef<NodeJS.Timeout | null>(null);

  // Format duration as M:SS
  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Animate circle based on phase
  const animateCircle = (toPhase: Phase) => {
    const isExpanding = toPhase === 'inhale';
    const isContracting = toPhase === 'exhale';
    
    if (isExpanding) {
      Animated.parallel([
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: PHASE_DURATION,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 0.8,
          duration: PHASE_DURATION,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(glowAnim, {
          toValue: 1,
          duration: PHASE_DURATION,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]).start();
    } else if (isContracting) {
      Animated.parallel([
        Animated.timing(scaleAnim, {
          toValue: 0.6,
          duration: PHASE_DURATION,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 0.3,
          duration: PHASE_DURATION,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(glowAnim, {
          toValue: 0,
          duration: PHASE_DURATION,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]).start();
    }
    // Hold phases: no animation, circle stays where it is
  };

  // Start countdown for current phase
  const startCountdown = () => {
    setCountdown(4);
    countdownTimer.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          return 4;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // Move to next phase
  const nextPhase = (currentPhase: Phase): Phase => {
    switch (currentPhase) {
      case 'inhale': return 'hold1';
      case 'hold1': return 'exhale';
      case 'exhale': return 'hold2';
      case 'hold2': return 'inhale';
      default: return 'inhale';
    }
  };

  // Start the breathing exercise
  const startBreathing = () => {
    setIsActive(true);
    setPhase('inhale');
    setCycles(0);
    setTotalSeconds(0);
    animateCircle('inhale');
    startCountdown();

    // Duration timer
    totalSecondsRef.current = 0;
    durationTimer.current = setInterval(() => {
      totalSecondsRef.current += 1;
      setTotalSeconds(totalSecondsRef.current);
    }, 1000);

    // Phase timer
    const runPhase = (currentPhase: Phase, currentCycles: number) => {
      phaseTimer.current = setTimeout(() => {
        const next = nextPhase(currentPhase);
        setPhase(next);
        animateCircle(next);
        
        let newCycles = currentCycles;
        
        // Count cycle when completing hold2 -> inhale
        if (currentPhase === 'hold2') {
          newCycles = currentCycles + 1;
          setCycles(newCycles);
          
          // Check if we've reached target cycles
          if (newCycles >= TARGET_CYCLES) {
            // Stop the exercise
            if (phaseTimer.current) clearTimeout(phaseTimer.current);
            if (countdownTimer.current) clearInterval(countdownTimer.current);
            if (durationTimer.current) clearInterval(durationTimer.current);
            
            setIsActive(false);
            setPhase('idle');
            
            // Navigate to completion screen
            navigation.navigate('BreathingComplete', {
              cycles: newCycles,
              duration: totalSecondsRef.current,
            });
            return;
          }
        }
        
        runPhase(next, newCycles);
      }, PHASE_DURATION);
    };

    runPhase('inhale', 0);
  };

  // Stop/Reset
  const resetBreathing = () => {
    setIsActive(false);
    setPhase('idle');
    setCountdown(4);
    
    // Clear all timers
    if (phaseTimer.current) clearTimeout(phaseTimer.current);
    if (countdownTimer.current) clearInterval(countdownTimer.current);
    if (durationTimer.current) clearInterval(durationTimer.current);

    // Reset animations
    Animated.parallel([
      Animated.timing(scaleAnim, {
        toValue: 0.6,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 0.3,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(glowAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (phaseTimer.current) clearTimeout(phaseTimer.current);
      if (countdownTimer.current) clearInterval(countdownTimer.current);
      if (durationTimer.current) clearInterval(durationTimer.current);
    };
  }, []);

  // Get phase color
  const getPhaseColor = () => {
    switch (phase) {
      case 'inhale': return COLORS.primary;
      case 'hold1': 
      case 'hold2': return COLORS.sunny;
      case 'exhale': return COLORS.secondary;
      default: return COLORS.textMuted;
    }
  };

  return (
    <View className="flex-1 bg-background">
      {/* Header */}
      <View 
        className="px-6 pb-4"
        style={{ paddingTop: insets.top + 16 }}
      >
        <Text 
          className="text-2xl font-bold text-center"
          style={{ color: COLORS.text }}
        >
          Box Breathing
        </Text>
        <Text className="text-textMuted text-center text-sm mt-1">
          4-4-4-4 technique for calm
        </Text>
      </View>

      {/* Ambient background glows */}
      <View 
        className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full"
        style={{ backgroundColor: COLORS.primary, opacity: 0.05 }}
      />
      <View 
        className="absolute bottom-1/3 right-1/4 w-48 h-48 rounded-full"
        style={{ backgroundColor: COLORS.secondary, opacity: 0.05 }}
      />

      {/* Main breathing circle area */}
      <View className="flex-1 justify-center items-center">
        {/* Outer glow ring */}
        <Animated.View
          style={{
            position: 'absolute',
            width: 280,
            height: 280,
            borderRadius: 140,
            backgroundColor: getPhaseColor(),
            opacity: glowAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 0.15],
            }),
            transform: [{ scale: scaleAnim.interpolate({
              inputRange: [0.6, 1],
              outputRange: [1.1, 1.3],
            })}],
          }}
        />

        {/* Main breathing circle */}
        <Animated.View
          style={{
            width: 220,
            height: 220,
            borderRadius: 110,
            backgroundColor: COLORS.surface,
            borderWidth: 3,
            borderColor: getPhaseColor(),
            alignItems: 'center',
            justifyContent: 'center',
            transform: [{ scale: scaleAnim }],
            opacity: opacityAnim.interpolate({
              inputRange: [0.3, 0.8],
              outputRange: [0.7, 1],
            }),
            shadowColor: getPhaseColor(),
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.5,
            shadowRadius: 30,
            elevation: 10,
          }}
        >
          {/* Inner content */}
          <Text 
            className="text-6xl font-light"
            style={{ color: getPhaseColor() }}
          >
            {isActive ? countdown : '4'}
          </Text>
          <Text 
            className="text-lg font-medium mt-2"
            style={{ color: getPhaseColor() }}
          >
            {PHASE_LABELS[phase]}
          </Text>
        </Animated.View>
      </View>

      {/* Phase indicator dots */}
      <View className="flex-row justify-center items-center gap-3 mb-6">
        {(['inhale', 'hold1', 'exhale', 'hold2'] as Phase[]).map((p, index) => (
          <View key={p} className="items-center">
            <View
              style={{
                width: phase === p ? 12 : 8,
                height: phase === p ? 12 : 8,
                borderRadius: phase === p ? 6 : 4,
                backgroundColor: phase === p ? getPhaseColor() : COLORS.surfaceLight,
                shadowColor: phase === p ? getPhaseColor() : 'transparent',
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 0.8,
                shadowRadius: 6,
              }}
            />
            <Text 
              className="text-xs mt-1"
              style={{ 
                color: phase === p ? getPhaseColor() : COLORS.textMuted,
                fontWeight: phase === p ? '600' : '400',
              }}
            >
              {['In', 'Hold', 'Out', 'Hold'][index]}
            </Text>
          </View>
        ))}
      </View>

      {/* Controls */}
      <View className="px-8 mb-4">
        <View className="flex-row gap-4 justify-center">
          {isActive ? (
            <Pressable 
              onPress={resetBreathing}
              className="flex-1 py-4 rounded-2xl items-center"
              style={{ backgroundColor: COLORS.surface, borderWidth: 1, borderColor: COLORS.surfaceLight }}
            >
              <Text className="text-text font-semibold text-base">Stop</Text>
            </Pressable>
          ) : (
            <>
              {cycles > 0 && (
                <Pressable 
                  onPress={() => { setCycles(0); setTotalSeconds(0); }}
                  className="px-6 py-4 rounded-2xl items-center"
                  style={{ backgroundColor: COLORS.surface, borderWidth: 1, borderColor: COLORS.surfaceLight }}
                >
                  <Text className="text-textMuted font-medium">Reset</Text>
                </Pressable>
              )}
              <Pressable 
                onPress={startBreathing}
                className="flex-1 py-4 rounded-2xl items-center"
                style={{ 
                  backgroundColor: COLORS.primary,
                  shadowColor: COLORS.primary,
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.4,
                  shadowRadius: 12,
                }}
              >
                <Text className="text-background font-bold text-base">
                  {cycles > 0 ? 'Continue' : 'Start Breathing'}
                </Text>
              </Pressable>
            </>
          )}
        </View>
      </View>

      {/* Session stats */}
      <View 
        className="px-8 pb-6"
        style={{ paddingBottom: insets.bottom + 100 }}
      >
        <View 
          className="flex-row items-center justify-center rounded-2xl py-4"
          style={{ backgroundColor: COLORS.surface }}
        >
          <View className="items-center flex-1">
            <Text 
              className="text-2xl font-bold"
              style={{ color: cycles > 0 ? COLORS.primary : COLORS.text }}
            >
              {cycles}
            </Text>
            <Text className="text-textMuted text-xs">cycles</Text>
          </View>
          <View className="w-[1px] h-10 bg-surfaceLight" />
          <View className="items-center flex-1">
            <Text 
              className="text-2xl font-bold"
              style={{ color: totalSeconds > 0 ? COLORS.primary : COLORS.text }}
            >
              {formatDuration(totalSeconds)}
            </Text>
            <Text className="text-textMuted text-xs">duration</Text>
          </View>
        </View>
      </View>
    </View>
  );
}
