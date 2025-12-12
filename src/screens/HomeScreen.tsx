import { View, Text, Pressable } from 'react-native';
import { useState } from 'react';
import { DEMO_STATS, DEMO_CHECKINS } from '../data/demoData';
import { COLORS, ATOLLS } from '../constants';
import { MaldivesMap } from '../components';
import CheckinModal from './CheckinModal';

// Demo user's atoll (hardcoded for prototype)
const USER_ATOLL = 'K';

export default function HomeScreen() {
  const [showCheckin, setShowCheckin] = useState(false);
  const atollName = ATOLLS.find(a => a.code === USER_ATOLL)?.name ?? USER_ATOLL;

  return (
    <View className="flex-1 bg-background">
      {/* Header - overlaid on map */}
      <View className="absolute top-0 left-0 right-0 z-10 px-5 pt-14 pb-4">
        <View className="flex-row items-center justify-between">
          <Text 
            className="text-2xl font-black tracking-wider"
            style={{ 
              color: COLORS.primary,
              textShadowColor: COLORS.primary,
              textShadowOffset: { width: 0, height: 0 },
              textShadowRadius: 10,
            }}
          >
            SIRRU
          </Text>
          <View 
            className="flex-row items-center gap-2 px-3 py-2 rounded-full"
            style={{ backgroundColor: COLORS.surface + 'DD' }}
          >
            <View 
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: COLORS.primary }}
            />
            <Text className="text-textMuted text-xs">{atollName}</Text>
          </View>
        </View>
      </View>

      {/* Full Page Pulse Map */}
      <View className="flex-1">
        <MaldivesMap checkins={DEMO_CHECKINS} userAtoll={USER_ATOLL} />
      </View>

      {/* Bottom overlay with stats and check-in */}
      <View 
        className="absolute bottom-0 left-0 right-0 z-10 px-4 pb-6 pt-4"
        style={{ 
          backgroundColor: 'transparent',
        }}
      >
        {/* Stats Row */}
        <View 
          className="mb-3 py-2 px-4 rounded-full self-center"
          style={{ backgroundColor: COLORS.surface + 'EE' }}
        >
          <View className="flex-row items-center gap-2">
            <Text className="text-text font-semibold">{DEMO_STATS.total}</Text>
            <Text className="text-textMuted text-sm">tonight</Text>
            <Text className="text-textMuted">·</Text>
            <Text style={{ color: COLORS.sunny }}>{DEMO_STATS.sunny} ☀️</Text>
            <Text style={{ color: COLORS.stormy }}>{DEMO_STATS.stormy} ⛈️</Text>
          </View>
        </View>

        {/* Check-in Button */}
        <Pressable 
          onPress={() => setShowCheckin(true)}
          className="rounded-2xl py-4"
          style={{
            backgroundColor: COLORS.primary,
            shadowColor: COLORS.primary,
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.5,
            shadowRadius: 20,
            elevation: 10,
          }}
        >
          <Text className="text-center text-background text-lg font-bold">
            How's your weather? ☀️ ⛈️
          </Text>
        </Pressable>
      </View>

      {/* Check-in Modal */}
      <CheckinModal 
        visible={showCheckin} 
        onClose={() => setShowCheckin(false)} 
      />
    </View>
  );
}

