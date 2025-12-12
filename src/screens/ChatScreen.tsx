import { View, Text, ScrollView, Pressable, TextInput } from 'react-native';
import { COLORS } from '../constants';

export default function ChatScreen() {
  return (
    <View className="flex-1 bg-background">
      {/* Header */}
      <View 
        className="px-6 pt-14 pb-4 border-b border-surfaceLight"
        style={{ backgroundColor: COLORS.surface }}
      >
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center gap-3">
            <View 
              className="w-12 h-12 rounded-full items-center justify-center"
              style={{ backgroundColor: COLORS.stormy + '30' }}
            >
              <Text className="text-2xl">🐚</Text>
            </View>
            <View>
              <Text className="text-text font-bold text-lg">Faru</Text>
              <View className="flex-row items-center gap-1">
                <View className="w-2 h-2 rounded-full bg-primary" />
                <Text className="text-textMuted text-xs">12 in the reef tonight</Text>
              </View>
            </View>
          </View>
          <Pressable className="w-10 h-10 rounded-full bg-surfaceLight items-center justify-center">
            <Text className="text-textMuted">⋯</Text>
          </Pressable>
        </View>
      </View>

      {/* Chat messages */}
      <ScrollView 
        className="flex-1 px-4 py-4"
        contentContainerStyle={{ gap: 12 }}
      >
        {/* Koamas message */}
        <View className="flex-row gap-3 max-w-[85%]">
          <View 
            className="w-8 h-8 rounded-full items-center justify-center mt-1"
            style={{ backgroundColor: COLORS.primary + '30' }}
          >
            <Text>🐙</Text>
          </View>
          <View>
            <Text className="text-primary text-xs font-medium mb-1">Koamas</Text>
            <View className="rounded-2xl rounded-tl-sm bg-surface p-3">
              <Text className="text-text text-base leading-5">
                Hey everyone. Safe space here. How's everyone's storm tonight?
              </Text>
            </View>
            <Text className="text-textMuted text-xs mt-1">Just now</Text>
          </View>
        </View>

        {/* Turtle message */}
        <View className="flex-row gap-3 max-w-[85%]">
          <View 
            className="w-8 h-8 rounded-full items-center justify-center mt-1"
            style={{ backgroundColor: COLORS.sunny + '30' }}
          >
            <Text>🐢</Text>
          </View>
          <View>
            <Text className="text-textMuted text-xs font-medium mb-1">Anonymous Turtle</Text>
            <View className="rounded-2xl rounded-tl-sm bg-surface p-3">
              <Text className="text-text text-base leading-5">
                can't sleep again
              </Text>
            </View>
          </View>
        </View>

        {/* Shark message */}
        <View className="flex-row gap-3 max-w-[85%]">
          <View 
            className="w-8 h-8 rounded-full items-center justify-center mt-1"
            style={{ backgroundColor: COLORS.stormy + '30' }}
          >
            <Text>🦈</Text>
          </View>
          <View>
            <Text className="text-textMuted text-xs font-medium mb-1">Anonymous Shark</Text>
            <View className="rounded-2xl rounded-tl-sm bg-surface p-3">
              <Text className="text-text text-base leading-5">
                same here. brain won't shut up
              </Text>
            </View>
          </View>
        </View>

        {/* Typing indicator */}
        <View className="flex-row gap-3 max-w-[85%]">
          <View 
            className="w-8 h-8 rounded-full items-center justify-center"
            style={{ backgroundColor: COLORS.primary + '30' }}
          >
            <Text>🐙</Text>
          </View>
          <View className="rounded-2xl bg-surface px-4 py-3">
            <View className="flex-row gap-1">
              <View className="w-2 h-2 rounded-full bg-textMuted opacity-60" />
              <View className="w-2 h-2 rounded-full bg-textMuted opacity-40" />
              <View className="w-2 h-2 rounded-full bg-textMuted opacity-20" />
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Input area */}
      <View 
        className="px-4 py-4 border-t border-surfaceLight"
        style={{ backgroundColor: COLORS.surface }}
      >
        <View className="flex-row items-center gap-3">
          <View className="flex-1 flex-row items-center bg-background rounded-2xl px-4 py-3">
            <TextInput
              placeholder="Share how you're feeling..."
              placeholderTextColor={COLORS.textMuted}
              className="flex-1 text-text text-base"
              editable={false}
            />
          </View>
          <Pressable 
            className="w-12 h-12 rounded-full items-center justify-center"
            style={{ backgroundColor: COLORS.primary }}
          >
            <Text className="text-background text-lg">↑</Text>
          </Pressable>
        </View>
        <Text className="text-textMuted text-xs text-center mt-2">
          Messages are anonymous and disappear at sunrise 🌅
        </Text>
      </View>
    </View>
  );
}

