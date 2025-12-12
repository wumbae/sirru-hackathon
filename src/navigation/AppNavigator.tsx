import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text } from 'react-native';
import { useMemo, useState } from 'react';
import Svg, { Path, Circle } from 'react-native-svg';
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

// Custom SVG Icons
function PulseIcon({ color, size = 24 }: { color: string; size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      {/* Wave/pulse icon */}
      <Path
        d="M2 12C2 12 5 8 8 12C11 16 14 8 17 12C20 16 22 12 22 12"
        stroke={color}
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Circle cx="4" cy="12" r="1.5" fill={color} />
      <Circle cx="20" cy="12" r="1.5" fill={color} />
    </Svg>
  );
}

function BreatheIcon({ color, size = 24 }: { color: string; size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      {/* Concentric circles for breathing */}
      <Circle cx="12" cy="12" r="10" stroke={color} strokeWidth={1.5} opacity={0.3} />
      <Circle cx="12" cy="12" r="6" stroke={color} strokeWidth={2} opacity={0.6} />
      <Circle cx="12" cy="12" r="2.5" fill={color} />
    </Svg>
  );
}

function ChatIcon({ color, size = 24 }: { color: string; size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      {/* Chat bubble */}
      <Path
        d="M21 11.5C21 16.19 16.97 20 12 20C10.64 20 9.35 19.72 8.19 19.22L3 21L4.5 16.5C3.55 15.13 3 13.39 3 11.5C3 6.81 7.03 3 12 3C16.97 3 21 6.81 21 11.5Z"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Dots inside */}
      <Circle cx="8" cy="11.5" r="1" fill={color} />
      <Circle cx="12" cy="11.5" r="1" fill={color} />
      <Circle cx="16" cy="11.5" r="1" fill={color} />
    </Svg>
  );
}

type TabIconProps = {
  icon: 'pulse' | 'breathe' | 'chat';
  label: string;
  focused: boolean;
};

function TabIcon({ icon, label, focused }: TabIconProps) {
  const color = focused ? COLORS.primary : COLORS.textMuted;
  
  const renderIcon = () => {
    switch (icon) {
      case 'pulse':
        return <PulseIcon color={color} size={22} />;
      case 'breathe':
        return <BreatheIcon color={color} size={22} />;
      case 'chat':
        return <ChatIcon color={color} size={22} />;
    }
  };

  return (
    <View style={{ alignItems: 'center', justifyContent: 'center', paddingTop: 4, width: 70 }}>
      <View
        style={{
          backgroundColor: focused ? COLORS.primary + '20' : 'transparent',
          paddingHorizontal: 14,
          paddingVertical: 6,
          borderRadius: 14,
          marginBottom: 3,
        }}
      >
        {renderIcon()}
      </View>
      <Text
        numberOfLines={1}
        style={{
          color: focused ? COLORS.primary : COLORS.textMuted,
          fontSize: 10,
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
          height: 90,
          paddingBottom: 16,
          paddingTop: 4,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: 0.2,
          shadowRadius: 16,
          elevation: 25,
        },
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.textMuted,
      }}
    >
      <MainTabs.Screen 
        name="Home" 
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => <TabIcon icon="pulse" label="Pulse" focused={focused} />,
        }}
      />
      <MainTabs.Screen 
        name="Breathe" 
        component={BreathingScreen}
        options={{
          tabBarIcon: ({ focused }) => <TabIcon icon="breathe" label="Breathe" focused={focused} />,
        }}
      />
      <MainTabs.Screen 
        name="Chat" 
        component={ChatScreen}
        options={{
          tabBarIcon: ({ focused }) => <TabIcon icon="chat" label="Chat" focused={focused} />,
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

