import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { View, Text, Pressable, TextInput, Keyboard, TouchableWithoutFeedback, KeyboardAvoidingView, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import { OnboardingStackParamList } from '../navigation/types';
import { COLORS } from '../constants';

type Props = NativeStackScreenProps<OnboardingStackParamList, 'Nickname'>;

export default function NicknameScreen({ navigation }: Props) {
  const [nickname, setNickname] = useState('');
  const [focused, setFocused] = useState(false);
  const isReady = nickname.trim().length >= 2;

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1 bg-background"
      >
        {/* Ambient glow */}
        <View 
          className="absolute -top-20 -right-20 w-64 h-64 rounded-full opacity-10"
          style={{ backgroundColor: COLORS.primary }}
        />

        <View className="flex-1 px-6 pt-4 pb-8">
          {/* Header */}
          <View className="flex-row items-center justify-between">
            <Pressable 
              onPress={() => navigation.goBack()} 
              className="w-10 h-10 rounded-full bg-surface items-center justify-center"
              style={{
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.3,
                shadowRadius: 4,
              }}
            >
              <Text className="text-text text-lg">←</Text>
            </Pressable>

            {/* Step indicator */}
            <View className="flex-row items-center gap-2">
              <View className="w-8 h-1 rounded-full bg-primary" />
              <View className="w-8 h-1 rounded-full bg-surfaceLight" />
            </View>

            <View className="w-10" />
          </View>

          {/* Content */}
          <View className="flex-1 justify-center">
            {/* Icon */}
            <View 
              className="w-16 h-16 rounded-2xl bg-surface items-center justify-center mb-6"
              style={{
                shadowColor: COLORS.primary,
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.2,
                shadowRadius: 12,
              }}
            >
              <Text className="text-3xl">🎭</Text>
            </View>

            <Text className="text-3xl font-bold text-text mb-2">
              Pick a nickname
            </Text>
            <Text className="text-base text-textMuted leading-6">
              Anything you want. It's your secret identity.{'\n'}
              <Text className="text-primary">No one will know it's you.</Text>
            </Text>

            {/* Input */}
            <View 
              className="mt-8"
              style={focused ? {
                shadowColor: COLORS.primary,
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 0.3,
                shadowRadius: 12,
              } : {}}
            >
              <TextInput
                value={nickname}
                onChangeText={setNickname}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                placeholder="e.g., MidnightOwl"
                placeholderTextColor="#666"
                returnKeyType="done"
                autoCapitalize="none"
                autoCorrect={false}
                onSubmitEditing={Keyboard.dismiss}
                className="rounded-2xl px-5 py-4 bg-surface text-text text-lg"
                style={{
                  borderWidth: 2,
                  borderColor: focused ? COLORS.primary : COLORS.surfaceLight,
                }}
              />
              {nickname.length > 0 && (
                <View className="absolute right-4 top-4">
                  <Text className={nickname.length >= 2 ? 'text-primary' : 'text-textMuted'}>
                    {nickname.length >= 2 ? '✓' : `${nickname.length}/2`}
                  </Text>
                </View>
              )}
            </View>

            {/* Suggestions */}
            <View className="flex-row flex-wrap gap-2 mt-4">
              {['NightOwl', 'StormRider', 'CoralDream', 'IslandSoul'].map((suggestion) => (
                <Pressable
                  key={suggestion}
                  onPress={() => setNickname(suggestion)}
                  className="px-3 py-2 rounded-full bg-surface border border-surfaceLight"
                >
                  <Text className="text-textMuted text-sm">{suggestion}</Text>
                </Pressable>
              ))}
            </View>
          </View>

          {/* CTA Button */}
          <Pressable
            disabled={!isReady}
            onPress={() => navigation.navigate('Atoll', { nickname: nickname.trim() })}
            className="rounded-2xl overflow-hidden"
            style={isReady ? {
              shadowColor: COLORS.primary,
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.4,
              shadowRadius: 16,
            } : {}}
          >
            {isReady ? (
              <LinearGradient
                colors={[COLORS.primary, '#00D4BE']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                className="px-8 py-5"
              >
                <Text className="text-center text-background text-lg font-bold">
                  Continue as {nickname.trim()}
                </Text>
              </LinearGradient>
            ) : (
              <View className="px-8 py-5 bg-surface">
                <Text className="text-center text-textMuted text-lg font-semibold">
                  Enter a nickname
                </Text>
              </View>
            )}
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

