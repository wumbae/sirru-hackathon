import { View, Text, Pressable, Modal, ScrollView } from 'react-native';
import { useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { DEMO_STATS, DEMO_CHECKINS, AAVA_DATA, ANCHOR_COUNT } from '../data/demoData';
import { COLORS, ATOLLS } from '../constants';
import { MaldivesMap, Aava } from '../components';
import { OCEAN_BG } from '../components/MaldivesMap';
import CheckinModal from './CheckinModal';

// Demo user's atoll (hardcoded for prototype)
const USER_ATOLL = 'K';

export default function HomeScreen() {
  const [showCheckin, setShowCheckin] = useState(false);
  const [showInsights, setShowInsights] = useState(false);
  const insets = useSafeAreaInsets();
  const atollName = ATOLLS.find(a => a.code === USER_ATOLL)?.name ?? USER_ATOLL;

  return (
    <View style={{ flex: 1, backgroundColor: OCEAN_BG }}>
      {/* ===== HEADER ===== */}
      <View 
        className="absolute top-0 left-0 right-0 z-20 px-4"
        style={{ paddingTop: insets.top + 8 }}
      >
        <View className="flex-row items-center justify-between">
          {/* Logo */}
          <Text 
            className="text-xl font-black tracking-wider"
            style={{ 
              color: COLORS.primary,
              textShadowColor: COLORS.primary,
              textShadowOffset: { width: 0, height: 0 },
              textShadowRadius: 8,
            }}
          >
            SIRRU
          </Text>
          
          {/* Right side: Insights + Atoll */}
          <View className="flex-row items-center gap-2">
            <Pressable 
              onPress={() => setShowInsights(true)}
              className="w-8 h-8 rounded-full items-center justify-center"
              style={{ backgroundColor: COLORS.surface + 'DD' }}
            >
              <Text style={{ fontSize: 14 }}>📊</Text>
            </Pressable>
            <View 
              className="flex-row items-center px-2.5 py-1.5 rounded-full"
              style={{ backgroundColor: COLORS.surface + 'DD' }}
            >
              <View 
                className="w-1.5 h-1.5 rounded-full mr-1.5"
                style={{ backgroundColor: COLORS.primary }}
              />
              <Text className="text-text text-xs">{atollName}</Text>
            </View>
          </View>
        </View>
        
        {/* Stats pill - integrated under header */}
        <Pressable 
          onPress={() => setShowInsights(true)}
          className="mt-3 py-2 px-4 rounded-full self-center"
          style={{ backgroundColor: COLORS.surface + 'CC' }}
        >
          <View className="flex-row items-center">
            <Text className="text-text font-semibold">{DEMO_STATS.total}</Text>
            <Text className="text-textMuted text-sm ml-1">tonight</Text>
            <View className="w-1 h-1 rounded-full bg-textMuted mx-2" />
            <View className="flex-row items-center">
              <View 
                className="w-2 h-2 rounded-full mr-1"
                style={{ backgroundColor: COLORS.sunny }}
              />
              <Text style={{ color: COLORS.sunny, fontWeight: '500', fontSize: 13 }}>{DEMO_STATS.sunny}</Text>
            </View>
            <View className="flex-row items-center ml-2">
              <View 
                className="w-2 h-2 rounded-full mr-1"
                style={{ backgroundColor: COLORS.stormy }}
              />
              <Text style={{ color: COLORS.stormy, fontWeight: '500', fontSize: 13 }}>{DEMO_STATS.stormy}</Text>
            </View>
          </View>
        </Pressable>
      </View>

      {/* ===== MAP - Full screen background ===== */}
      <MaldivesMap checkins={DEMO_CHECKINS} userAtoll={USER_ATOLL} />

      {/* ===== LEGEND - Left side vertical ===== */}
      <View 
        style={{ 
          position: 'absolute',
          left: 12,
          bottom: 100,
          backgroundColor: COLORS.surface + 'CC',
          borderRadius: 12,
          paddingVertical: 10,
          paddingHorizontal: 10,
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 8 }}>
          <View 
            style={{ 
              width: 8,
              height: 8,
              borderRadius: 4,
              backgroundColor: COLORS.sunny,
              shadowColor: COLORS.sunny,
              shadowOffset: { width: 0, height: 0 },
              shadowOpacity: 0.8,
              shadowRadius: 4,
            }}
          />
          <Text style={{ color: COLORS.textMuted, fontSize: 10 }}>Sunny</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
          <View 
            style={{ 
              width: 8,
              height: 8,
              borderRadius: 4,
              backgroundColor: COLORS.stormy,
              shadowColor: COLORS.stormy,
              shadowOffset: { width: 0, height: 0 },
              shadowOpacity: 0.8,
              shadowRadius: 4,
            }}
          />
          <Text style={{ color: COLORS.textMuted, fontSize: 10 }}>Stormy</Text>
        </View>
      </View>

      {/* ===== CHECK-IN BUTTON - Just above tab bar ===== */}
      <View 
        style={{ 
          position: 'absolute',
          left: 16,
          right: 16,
          bottom: 16,
        }}
      >
        <Pressable 
          onPress={() => setShowCheckin(true)}
          style={{
            backgroundColor: COLORS.primary,
            borderRadius: 14,
            paddingVertical: 14,
            shadowColor: COLORS.primary,
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.4,
            shadowRadius: 12,
            elevation: 8,
          }}
        >
          <Text style={{ 
            textAlign: 'center', 
            color: OCEAN_BG, 
            fontSize: 15, 
            fontWeight: '700' 
          }}>
            How's your weather?
          </Text>
        </Pressable>
      </View>

      {/* ===== MODALS ===== */}
      <CheckinModal 
        visible={showCheckin} 
        onClose={() => setShowCheckin(false)} 
      />

      {/* Insights Modal */}
      <Modal
        visible={showInsights}
        transparent
        animationType="slide"
        onRequestClose={() => setShowInsights(false)}
      >
        <View className="flex-1 justify-end">
          <Pressable 
            className="absolute inset-0 bg-black/60"
            onPress={() => setShowInsights(false)}
          />
          <View 
            className="rounded-t-3xl px-5 pt-5 pb-8 max-h-[75%]"
            style={{ backgroundColor: COLORS.surface }}
          >
            {/* Handle */}
            <View className="w-10 h-1 rounded-full bg-surfaceLight self-center mb-4" />
            
            <ScrollView showsVerticalScrollIndicator={false}>
              {/* Header */}
              <View className="items-center mb-5">
                <Text className="text-text text-xl font-bold">Tonight's Insights</Text>
                <Text className="text-textMuted text-sm mt-1">Real-time emotional weather</Text>
              </View>

              {/* Stats cards */}
              <View className="flex-row gap-2 mb-4">
                <View 
                  className="flex-1 p-3 rounded-xl items-center"
                  style={{ backgroundColor: COLORS.background }}
                >
                  <Text className="text-primary text-2xl font-bold">{ANCHOR_COUNT.toLocaleString()}</Text>
                  <Text className="text-textMuted text-xs">Total Anchors</Text>
                </View>
                <View 
                  className="flex-1 p-3 rounded-xl items-center"
                  style={{ backgroundColor: COLORS.sunny + '15' }}
                >
                  <Text style={{ color: COLORS.sunny }} className="text-2xl font-bold">{DEMO_STATS.sunny}</Text>
                  <Text className="text-textMuted text-xs">Sunny</Text>
                </View>
                <View 
                  className="flex-1 p-3 rounded-xl items-center"
                  style={{ backgroundColor: COLORS.stormy + '15' }}
                >
                  <Text style={{ color: COLORS.stormy }} className="text-2xl font-bold">{DEMO_STATS.stormy}</Text>
                  <Text className="text-textMuted text-xs">Stormy</Text>
                </View>
              </View>

              {/* Aava Chart */}
              <Aava data={AAVA_DATA} />

              <View className="h-4" />
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}
