import { View, Text, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { COLORS } from '../constants';
import { MainStackParamList } from '../navigation/types';

type RouteProps = RouteProp<MainStackParamList, 'BreathingComplete'>;

// Inspirational quotes
const QUOTES = [
  {
    text: "The ocean stirs the heart, inspires the imagination, and brings eternal joy to the soul.",
    author: "Wyland"
  },
  {
    text: "Feelings come and go like clouds in a windy sky. Conscious breathing is my anchor.",
    author: "Thich Nhat Hanh"
  },
  {
    text: "Breath is the bridge which connects life to consciousness.",
    author: "Thich Nhat Hanh"
  },
  {
    text: "Just breathe. You are strong enough to handle your challenges.",
    author: "Unknown"
  },
];

export default function BreathingCompleteScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NativeStackNavigationProp<MainStackParamList>>();
  const route = useRoute<RouteProps>();
  
  const { cycles, duration } = route.params;
  
  // Format duration as M:SS
  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Get random quote
  const quote = QUOTES[Math.floor(Math.random() * QUOTES.length)];

  return (
    <View 
      className="flex-1 items-center justify-center px-6"
      style={{ backgroundColor: COLORS.background, paddingTop: insets.top }}
    >
      {/* Success Icon with glow */}
      <View 
        className="w-28 h-28 rounded-full items-center justify-center mb-8"
        style={{ 
          backgroundColor: COLORS.primary + '20',
          shadowColor: COLORS.primary,
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0.6,
          shadowRadius: 30,
        }}
      >
        <Text style={{ fontSize: 56 }}>🧘</Text>
      </View>

      {/* Title */}
      <Text 
        className="text-3xl font-bold mb-2"
        style={{ color: COLORS.text }}
      >
        Well done!
      </Text>
      
      <Text 
        className="text-center mb-8"
        style={{ color: COLORS.textMuted, fontSize: 16, lineHeight: 24 }}
      >
        {cycles} cycles completed.{'\n'}
        Take this calm with you.
      </Text>

      {/* Stats */}
      <View className="flex-row gap-4 mb-10">
        <View 
          className="items-center px-8 py-5 rounded-2xl"
          style={{ backgroundColor: COLORS.surface }}
        >
          <Text style={{ color: COLORS.primary, fontSize: 32, fontWeight: '700' }}>{cycles}</Text>
          <Text style={{ color: COLORS.textMuted, fontSize: 13 }}>Cycles</Text>
        </View>
        <View 
          className="items-center px-8 py-5 rounded-2xl"
          style={{ backgroundColor: COLORS.surface }}
        >
          <Text style={{ color: COLORS.primary, fontSize: 32, fontWeight: '700' }}>{formatDuration(duration)}</Text>
          <Text style={{ color: COLORS.textMuted, fontSize: 13 }}>Duration</Text>
        </View>
      </View>

      {/* Quote */}
      <View 
        className="px-6 py-5 rounded-2xl mb-10 w-full"
        style={{ backgroundColor: COLORS.surface }}
      >
        <Text 
          className="text-center italic"
          style={{ color: COLORS.text, fontSize: 15, lineHeight: 24 }}
        >
          "{quote.text}"
        </Text>
        <Text 
          className="text-center mt-3"
          style={{ color: COLORS.primary, fontSize: 12, fontWeight: '500' }}
        >
          — {quote.author}
        </Text>
      </View>

      {/* Buttons */}
      <Pressable
        onPress={() => navigation.navigate('MainTabs')}
        className="w-full py-4 rounded-2xl mb-3"
        style={{ 
          backgroundColor: COLORS.primary,
          shadowColor: COLORS.primary,
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.4,
          shadowRadius: 12,
        }}
      >
        <Text 
          className="text-center font-bold"
          style={{ color: COLORS.background, fontSize: 16 }}
        >
          Back to Home
        </Text>
      </Pressable>

      <Pressable
        onPress={() => navigation.goBack()}
        className="w-full py-4 rounded-2xl"
        style={{ backgroundColor: COLORS.surface }}
      >
        <Text 
          className="text-center font-semibold"
          style={{ color: COLORS.text, fontSize: 16 }}
        >
          Breathe Again
        </Text>
      </Pressable>

      {/* Bottom padding */}
      <View style={{ height: insets.bottom + 20 }} />
    </View>
  );
}
