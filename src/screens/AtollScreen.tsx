import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ScrollView, View, Text, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import { ATOLLS } from '../constants';
import { OnboardingStackParamList } from '../navigation/types';
import { COLORS } from '../constants';

type Props = NativeStackScreenProps<OnboardingStackParamList, 'Atoll'> & {
  onComplete: () => void;
};

export default function AtollScreen({ onComplete, route, navigation }: Props) {
  const [selected, setSelected] = useState<string>('K');
  const nickname = route.params.nickname;
  const selectedAtoll = ATOLLS.find(a => a.code === selected);

  return (
    <View className="flex-1 bg-background">
      {/* Ambient glow */}
      <View 
        className="absolute top-40 -left-20 w-64 h-64 rounded-full opacity-10"
        style={{ backgroundColor: COLORS.stormy }}
      />

      <View className="flex-1 px-6 pt-4 pb-8">
        {/* Header */}
        <View className="flex-row items-center justify-between mb-6">
          <Pressable 
            onPress={() => navigation.goBack()} 
            className="w-10 h-10 rounded-full bg-surface items-center justify-center"
          >
            <Text className="text-text text-lg">←</Text>
          </Pressable>

          {/* Step indicator */}
          <View className="flex-row items-center gap-2">
            <View className="w-8 h-1 rounded-full bg-primary" />
            <View className="w-8 h-1 rounded-full bg-primary" />
          </View>

          <View className="w-10" />
        </View>

        {/* Welcome badge */}
        <View className="flex-row items-center gap-3 mb-6 px-4 py-3 rounded-2xl bg-surface self-start">
          <Text className="text-2xl">👋</Text>
          <View>
            <Text className="text-textMuted text-xs uppercase tracking-wider">Welcome</Text>
            <Text className="text-text font-semibold">{nickname}</Text>
          </View>
        </View>

        {/* Title */}
        <Text className="text-2xl font-bold text-text mb-1">
          Select your atoll
        </Text>
        <Text className="text-base text-textMuted mb-6">
          Where are you checking in from tonight?
        </Text>

        {/* Atoll Grid */}
        <ScrollView 
          className="flex-1" 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
        >
          <View className="flex-row flex-wrap gap-3">
            {ATOLLS.map((atoll) => {
              const isSelected = atoll.code === selected;
              return (
                <Pressable
                  key={atoll.code}
                  onPress={() => setSelected(atoll.code)}
                  className="rounded-2xl overflow-hidden"
                  style={[
                    { width: '47%' },
                    isSelected && {
                      shadowColor: COLORS.primary,
                      shadowOffset: { width: 0, height: 4 },
                      shadowOpacity: 0.4,
                      shadowRadius: 12,
                    }
                  ]}
                >
                  <View
                    className="px-4 py-4"
                    style={{
                      backgroundColor: isSelected ? COLORS.primary + '20' : COLORS.surface,
                      borderWidth: 2,
                      borderColor: isSelected ? COLORS.primary : COLORS.surfaceLight,
                      borderRadius: 16,
                    }}
                  >
                    <View className="flex-row items-center justify-between mb-1">
                      <Text 
                        className="text-xs font-bold uppercase tracking-wider"
                        style={{ color: isSelected ? COLORS.primary : COLORS.textMuted }}
                      >
                        {atoll.code}
                      </Text>
                      {isSelected && (
                        <View className="w-5 h-5 rounded-full bg-primary items-center justify-center">
                          <Text className="text-background text-xs">✓</Text>
                        </View>
                      )}
                    </View>
                    <Text 
                      className="text-sm font-medium"
                      style={{ color: isSelected ? COLORS.text : COLORS.textMuted }}
                      numberOfLines={1}
                    >
                      {atoll.name}
                    </Text>
                  </View>
                </Pressable>
              );
            })}
          </View>
        </ScrollView>

        {/* Selected indicator */}
        {selectedAtoll && (
          <View className="flex-row items-center justify-center gap-2 mb-4 py-3">
            <Text className="text-textMuted">Checking in from</Text>
            <Text className="text-primary font-semibold">{selectedAtoll.name}</Text>
          </View>
        )}

        {/* CTA Button */}
        <Pressable
          onPress={onComplete}
          className="rounded-2xl overflow-hidden"
          style={{
            shadowColor: COLORS.primary,
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.4,
            shadowRadius: 16,
          }}
        >
          <LinearGradient
            colors={[COLORS.primary, '#00D4BE']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            className="px-8 py-5"
          >
            <Text className="text-center text-background text-lg font-bold">
              Enter Sirru
            </Text>
          </LinearGradient>
        </Pressable>
      </View>
    </View>
  );
}

