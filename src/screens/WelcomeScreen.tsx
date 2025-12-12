import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { View, Text, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { OnboardingStackParamList } from '../navigation/types';
import { COLORS } from '../constants';

type Props = NativeStackScreenProps<OnboardingStackParamList, 'Welcome'>;

export default function WelcomeScreen({ navigation }: Props) {
  return (
    <View className="flex-1 bg-background">
      {/* Ambient glow orbs */}
      <View 
        className="absolute top-20 -left-20 w-64 h-64 rounded-full opacity-20"
        style={{ backgroundColor: COLORS.primary }}
      />
      <View 
        className="absolute bottom-40 -right-32 w-80 h-80 rounded-full opacity-10"
        style={{ backgroundColor: COLORS.stormy }}
      />
      <View 
        className="absolute top-1/3 right-10 w-32 h-32 rounded-full opacity-15"
        style={{ backgroundColor: COLORS.sunny }}
      />

      <View className="flex-1 justify-center items-center px-8">
        {/* Logo Section */}
        <View className="items-center mb-16">
          {/* Glowing ring behind logo */}
          <View 
            className="absolute w-48 h-48 rounded-full opacity-30"
            style={{ 
              backgroundColor: 'transparent',
              borderWidth: 2,
              borderColor: COLORS.primary,
              shadowColor: COLORS.primary,
              shadowOffset: { width: 0, height: 0 },
              shadowOpacity: 0.8,
              shadowRadius: 30,
            }}
          />
          
          <Text
            className="text-6xl font-black tracking-[0.35em] mb-4"
            style={{ 
              color: COLORS.primary,
              textShadowColor: COLORS.primary,
              textShadowOffset: { width: 0, height: 0 },
              textShadowRadius: 25,
            }}
          >
            SIRRU
          </Text>
          
          <View className="flex-row items-center gap-3 mb-6">
            <View className="h-[1px] w-8 bg-textMuted opacity-50" />
            <Text className="text-lg font-light text-text tracking-[0.2em] uppercase">
              The Secret
            </Text>
            <View className="h-[1px] w-8 bg-textMuted opacity-50" />
          </View>

          <Text className="text-base text-textMuted text-center leading-6 px-4">
            No names. No judgment.{'\n'}Just you.
          </Text>
        </View>

        {/* Stats teaser */}
        <View className="flex-row items-center gap-6 mb-16 opacity-60">
          <View className="items-center">
            <Text className="text-2xl font-bold text-primary">2,847</Text>
            <Text className="text-xs text-textMuted uppercase tracking-wider">Anchors</Text>
          </View>
          <View className="w-[1px] h-8 bg-surfaceLight" />
          <View className="items-center">
            <Text className="text-2xl font-bold text-text">20</Text>
            <Text className="text-xs text-textMuted uppercase tracking-wider">Atolls</Text>
          </View>
          <View className="w-[1px] h-8 bg-surfaceLight" />
          <View className="items-center">
            <Text className="text-2xl font-bold text-stormy">Anonymous</Text>
            <Text className="text-xs text-textMuted uppercase tracking-wider">Always</Text>
          </View>
        </View>
      </View>

      {/* Bottom CTA */}
      <View className="px-8 pb-12">
        <Pressable
          onPress={() => navigation.navigate('Nickname')}
          className="rounded-2xl overflow-hidden"
          style={{
            shadowColor: COLORS.primary,
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.4,
            shadowRadius: 20,
            elevation: 10,
          }}
        >
          <LinearGradient
            colors={[COLORS.primary, '#00D4BE']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            className="px-8 py-5"
          >
            <Text className="text-center text-background text-lg font-bold tracking-wide">
              Get Started
            </Text>
          </LinearGradient>
        </Pressable>

        <Text className="text-center text-textMuted text-xs mt-4 opacity-60">
          Your identity stays with you
        </Text>
      </View>
    </View>
  );
}

