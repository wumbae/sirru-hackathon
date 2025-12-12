import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text } from 'react-native';
import { useMemo, useState } from 'react';
import { COLORS } from '../constants';
import { MainTabParamList, OnboardingStackParamList } from './types';
import WelcomeScreen from '../screens/WelcomeScreen';
import NicknameScreen from '../screens/NicknameScreen';
import AtollScreen from '../screens/AtollScreen';
import HomeScreen from '../screens/HomeScreen';
import BreathingScreen from '../screens/BreathingScreen';
import ChatScreen from '../screens/ChatScreen';

const OnboardingStack = createNativeStackNavigator<OnboardingStackParamList>();
const MainTabs = createBottomTabNavigator<MainTabParamList>();

function TabIcon({ icon, label, focused }: { icon: string; label: string; focused: boolean }) {
  return (
    <View style={{ alignItems: 'center', paddingTop: 8 }}>
      <View
        style={{
          backgroundColor: focused ? COLORS.primary + '20' : 'transparent',
          paddingHorizontal: 16,
          paddingVertical: 6,
          borderRadius: 20,
        }}
      >
        <Text style={{ fontSize: 20 }}>{icon}</Text>
      </View>
      <Text
        style={{
          color: focused ? COLORS.primary : COLORS.textMuted,
          fontSize: 10,
          marginTop: 4,
          fontWeight: focused ? '600' : '400',
        }}
      >
        {label}
      </Text>
    </View>
  );
}

function OnboardingNavigator({ onComplete }: { onComplete: () => void }) {
  return (
    <OnboardingStack.Navigator screenOptions={{ headerShown: false }}>
      <OnboardingStack.Screen name="Welcome" component={WelcomeScreen} />
      <OnboardingStack.Screen name="Nickname" component={NicknameScreen} />
      <OnboardingStack.Screen name="Atoll">
        {(props) => <AtollScreen {...props} onComplete={onComplete} />}
      </OnboardingStack.Screen>
    </OnboardingStack.Navigator>
  );
}

function MainTabNavigator() {
  return (
    <MainTabs.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: COLORS.surface,
          borderTopColor: COLORS.surfaceLight,
          borderTopWidth: 1,
          height: 85,
          paddingBottom: 20,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: 0.15,
          shadowRadius: 12,
          elevation: 20,
        },
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.textMuted,
      }}
    >
      <MainTabs.Screen 
        name="Home" 
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => <TabIcon icon="🌊" label="Pulse" focused={focused} />,
        }}
      />
      <MainTabs.Screen 
        name="Breathe" 
        component={BreathingScreen}
        options={{
          tabBarIcon: ({ focused }) => <TabIcon icon="🌬️" label="Breathe" focused={focused} />,
        }}
      />
      <MainTabs.Screen 
        name="Chat" 
        component={ChatScreen}
        options={{
          tabBarIcon: ({ focused }) => <TabIcon icon="🐚" label="Faru" focused={focused} />,
        }}
      />
    </MainTabs.Navigator>
  );
}

const navigationTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: COLORS.background,
    card: COLORS.surface,
    text: COLORS.text,
    border: COLORS.surfaceLight,
    primary: COLORS.primary,
  },
};

export default function AppNavigator() {
  const [hasOnboarded, setHasOnboarded] = useState(false);

  const theme = useMemo(() => navigationTheme, []);

  return (
    <NavigationContainer theme={theme}>
      {hasOnboarded ? <MainTabNavigator /> : <OnboardingNavigator onComplete={() => setHasOnboarded(true)} />}
    </NavigationContainer>
  );
}

