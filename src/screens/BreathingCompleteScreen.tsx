import { View, Text, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../constants';

export default function BreathingCompleteScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<any>();

  return (
    <View 
      className="flex-1 items-center justify-center px-6"
      style={{ backgroundColor: COLORS.background, paddingTop: insets.top }}
    >
      {/* Success Icon */}
      <View 
        className="w-24 h-24 rounded-full items-center justify-center mb-6"
        style={{ 
          backgroundColor: COLORS.primary + '20',
          shadowColor: COLORS.primary,
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0.5,
          shadowRadius: 20,
        }}
      >
        <Text style={{ fontSize: 48 }}>🌊</Text>
      </View>

      {/* Title */}
      <Text 
        className="text-2xl font-bold mb-2"
        style={{ color: COLORS.text }}
      >
        You did it!
      </Text>
      
      <Text 
        className="text-center mb-8"
        style={{ color: COLORS.textMuted, fontSize: 16, lineHeight: 24 }}
      >
        3 cycles completed.{'\n'}
        Take this calm with you.
      </Text>

      {/* Stats */}
      <View className="flex-row gap-4 mb-10">
        <View 
          className="items-center px-6 py-4 rounded-2xl"
          style={{ backgroundColor: COLORS.surface }}
        >
          <Text style={{ color: COLORS.primary, fontSize: 28, fontWeight: '700' }}>3</Text>
          <Text style={{ color: COLORS.textMuted, fontSize: 12 }}>Cycles</Text>
        </View>
        <View 
          className="items-center px-6 py-4 rounded-2xl"
          style={{ backgroundColor: COLORS.surface }}
        >
          <Text style={{ color: COLORS.primary, fontSize: 28, fontWeight: '700' }}>1:12</Text>
          <Text style={{ color: COLORS.textMuted, fontSize: 12 }}>Minutes</Text>
        </View>
      </View>

      {/* Quote */}
      <View 
        className="px-5 py-4 rounded-xl mb-10"
        style={{ backgroundColor: COLORS.surface }}
      >
        <Text 
          className="text-center italic"
          style={{ color: COLORS.text, fontSize: 14, lineHeight: 22 }}
        >
          "The ocean stirs the heart, inspires the imagination,{'\n'}
          and brings eternal joy to the soul."
        </Text>
        <Text 
          className="text-center mt-2"
          style={{ color: COLORS.textMuted, fontSize: 12 }}
        >
          — Wyland
        </Text>
      </View>

      {/* Buttons */}
      <Pressable
        onPress={() => navigation.navigate('MainTabs', { screen: 'Home' })}
        className="w-full py-4 rounded-xl mb-3"
        style={{ backgroundColor: COLORS.primary }}
      >
        <Text 
          className="text-center font-semibold"
          style={{ color: COLORS.background, fontSize: 16 }}
        >
          Back to Home
        </Text>
      </Pressable>

      <Pressable
        onPress={() => navigation.goBack()}
        className="w-full py-4 rounded-xl"
        style={{ backgroundColor: COLORS.surface }}
      >
        <Text 
          className="text-center font-semibold"
          style={{ color: COLORS.text, fontSize: 16 }}
        >
          Breathe Again
        </Text>
      </Pressable>
    </View>
  );
}

