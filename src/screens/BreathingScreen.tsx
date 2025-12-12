import { View, Text, Pressable } from 'react-native';
import { COLORS } from '../constants';

export default function BreathingScreen() {
  return (
    <View className="flex-1 bg-background">
      {/* Ambient glows */}
      <View 
        className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full opacity-10"
        style={{ backgroundColor: COLORS.primary }}
      />
      <View 
        className="absolute bottom-1/3 right-1/4 w-48 h-48 rounded-full opacity-10"
        style={{ backgroundColor: COLORS.secondary }}
      />

      <View className="flex-1 justify-center items-center px-8">
        {/* Breathing circle placeholder */}
        <View 
          className="w-56 h-56 rounded-full items-center justify-center mb-10"
          style={{
            backgroundColor: COLORS.surface,
            borderWidth: 3,
            borderColor: COLORS.primary + '40',
            shadowColor: COLORS.primary,
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.3,
            shadowRadius: 30,
          }}
        >
          <View 
            className="w-40 h-40 rounded-full items-center justify-center"
            style={{
              backgroundColor: COLORS.primary + '10',
              borderWidth: 2,
              borderColor: COLORS.primary + '30',
            }}
          >
            <Text className="text-primary text-4xl font-light">4</Text>
            <Text className="text-textMuted text-sm mt-1">seconds</Text>
          </View>
        </View>

        <Text className="text-3xl font-bold text-text mb-2">Breathe</Text>
        <Text className="text-primary text-lg font-medium mb-6">Inhale...</Text>
        
        <Text className="text-textMuted text-center text-base leading-6 px-4 mb-10">
          Box breathing: Inhale 4s → Hold 4s → Exhale 4s → Hold 4s
        </Text>

        {/* Controls */}
        <View className="flex-row gap-4">
          <Pressable 
            className="px-6 py-3 rounded-2xl bg-surface border border-surfaceLight"
          >
            <Text className="text-textMuted font-medium">Reset</Text>
          </Pressable>
          <Pressable 
            className="px-8 py-3 rounded-2xl"
            style={{ backgroundColor: COLORS.primary }}
          >
            <Text className="text-background font-bold">Start Breathing</Text>
          </Pressable>
        </View>
      </View>

      {/* Session info */}
      <View className="px-8 pb-10">
        <View className="flex-row items-center justify-center gap-6">
          <View className="items-center">
            <Text className="text-text text-lg font-semibold">0</Text>
            <Text className="text-textMuted text-xs">cycles</Text>
          </View>
          <View className="w-[1px] h-6 bg-surfaceLight" />
          <View className="items-center">
            <Text className="text-text text-lg font-semibold">0:00</Text>
            <Text className="text-textMuted text-xs">duration</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

