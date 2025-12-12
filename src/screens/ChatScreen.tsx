import { useState, useEffect, useRef } from 'react';
import { View, Text, ScrollView, Pressable, TextInput, Animated, Easing } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS, CREATURES } from '../constants';
import { FARU_SCRIPT, FaruMessage } from '../data/demoData';

type DisplayMessage = FaruMessage & {
  isNew?: boolean;
};

// Creature config
const CREATURE_CONFIG: Record<string, { emoji: string; name: string; color: string }> = {
  koamas: { emoji: '🐙', name: 'Koamas', color: COLORS.primary },
  turtle: { emoji: '🐢', name: 'Anonymous Turtle', color: COLORS.sunny },
  shark: { emoji: '🦈', name: 'Anonymous Shark', color: COLORS.stormy },
  octopus: { emoji: '🐙', name: 'Anonymous Octopus', color: COLORS.secondary },
  manta: { emoji: '🦈', name: 'Anonymous Manta', color: COLORS.primary },
};

// Animated typing indicator
function TypingIndicator({ creature }: { creature: string }) {
  const dot1 = useRef(new Animated.Value(0.3)).current;
  const dot2 = useRef(new Animated.Value(0.3)).current;
  const dot3 = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    const animateDot = (dot: Animated.Value, delay: number) => {
      Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.timing(dot, {
            toValue: 1,
            duration: 400,
            easing: Easing.ease,
            useNativeDriver: true,
          }),
          Animated.timing(dot, {
            toValue: 0.3,
            duration: 400,
            easing: Easing.ease,
            useNativeDriver: true,
          }),
        ])
      ).start();
    };

    animateDot(dot1, 0);
    animateDot(dot2, 150);
    animateDot(dot3, 300);
  }, []);

  const config = CREATURE_CONFIG[creature] || CREATURE_CONFIG.koamas;

  return (
    <View className="flex-row gap-3 max-w-[85%]">
      <View 
        className="w-8 h-8 rounded-full items-center justify-center mt-1"
        style={{ backgroundColor: config.color + '30' }}
      >
        <Text>{config.emoji}</Text>
      </View>
      <View>
        <Text 
          className="text-xs font-medium mb-1"
          style={{ color: creature === 'koamas' ? COLORS.primary : COLORS.textMuted }}
        >
          {config.name}
        </Text>
        <View className="rounded-2xl rounded-tl-sm bg-surface px-4 py-3">
          <View className="flex-row gap-1.5 items-center h-5">
            <Animated.View 
              style={{ 
                width: 6, 
                height: 6, 
                borderRadius: 3, 
                backgroundColor: COLORS.textMuted,
                opacity: dot1,
              }} 
            />
            <Animated.View 
              style={{ 
                width: 6, 
                height: 6, 
                borderRadius: 3, 
                backgroundColor: COLORS.textMuted,
                opacity: dot2,
              }} 
            />
            <Animated.View 
              style={{ 
                width: 6, 
                height: 6, 
                borderRadius: 3, 
                backgroundColor: COLORS.textMuted,
                opacity: dot3,
              }} 
            />
          </View>
        </View>
      </View>
    </View>
  );
}

// Message bubble component
function MessageBubble({ message, isNew }: { message: DisplayMessage; isNew?: boolean }) {
  const config = CREATURE_CONFIG[message.creature] || CREATURE_CONFIG.koamas;
  const fadeAnim = useRef(new Animated.Value(isNew ? 0 : 1)).current;
  const slideAnim = useRef(new Animated.Value(isNew ? 20 : 0)).current;

  useEffect(() => {
    if (isNew) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [isNew]);

  return (
    <Animated.View 
      className="flex-row gap-3 max-w-[85%]"
      style={{ 
        opacity: fadeAnim,
        transform: [{ translateY: slideAnim }],
      }}
    >
      <View 
        className="w-8 h-8 rounded-full items-center justify-center mt-1"
        style={{ backgroundColor: config.color + '30' }}
      >
        <Text>{config.emoji}</Text>
      </View>
      <View className="flex-1">
        <Text 
          className="text-xs font-medium mb-1"
          style={{ color: message.creature === 'koamas' ? COLORS.primary : COLORS.textMuted }}
        >
          {config.name}
        </Text>
        <View className="rounded-2xl rounded-tl-sm bg-surface p-3">
          <Text className="text-text text-base leading-5">
            {message.content}
          </Text>
        </View>
        <Text className="text-textMuted text-xs mt-1">Just now</Text>
      </View>
    </Animated.View>
  );
}

export default function ChatScreen() {
  const insets = useSafeAreaInsets();
  const scrollViewRef = useRef<ScrollView>(null);
  const [messages, setMessages] = useState<DisplayMessage[]>([]);
  const [typingCreature, setTypingCreature] = useState<string | null>(null);
  const [inputText, setInputText] = useState('');
  const [onlineCount] = useState(Math.floor(Math.random() * 8) + 5); // 5-12 online
  const scriptIndexRef = useRef(0);
  const hasStartedRef = useRef(false);

  // Auto-scroll when messages change
  useEffect(() => {
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  }, [messages, typingCreature]);

  // Play the script with delays
  useEffect(() => {
    if (hasStartedRef.current) return;
    hasStartedRef.current = true;

    const playNextMessage = () => {
      if (scriptIndexRef.current >= FARU_SCRIPT.length) return;

      const currentMsg = FARU_SCRIPT[scriptIndexRef.current];
      const nextMsg = FARU_SCRIPT[scriptIndexRef.current + 1];
      
      // Show the message
      setTypingCreature(null);
      setMessages(prev => [...prev, { ...currentMsg, isNew: true }]);
      
      // Clear "isNew" flag after animation
      setTimeout(() => {
        setMessages(prev => prev.map(m => 
          m.id === currentMsg.id ? { ...m, isNew: false } : m
        ));
      }, 500);

      scriptIndexRef.current++;

      // Schedule next message
      if (nextMsg) {
        const delay = nextMsg.delay - currentMsg.delay;
        
        // Show typing indicator 1.5s before message appears
        setTimeout(() => {
          setTypingCreature(nextMsg.creature);
        }, Math.max(0, delay - 1500));
        
        // Show next message
        setTimeout(playNextMessage, delay);
      }
    };

    // Start with first message immediately
    playNextMessage();
  }, []);

  // Handle user sending a message
  const handleSend = () => {
    if (!inputText.trim()) return;
    
    const userMsg: DisplayMessage = {
      id: `user-${Date.now()}`,
      creature: 'user',
      content: inputText.trim(),
      delay: 0,
      isNew: true,
    };
    
    setMessages(prev => [...prev, userMsg]);
    setInputText('');

    // Simulate a response after a delay
    setTimeout(() => {
      setTypingCreature('koamas');
      setTimeout(() => {
        setTypingCreature(null);
        setMessages(prev => [...prev, {
          id: `koamas-${Date.now()}`,
          creature: 'koamas',
          content: "Thanks for sharing 💙 You're not alone here.",
          delay: 0,
          isNew: true,
        }]);
      }, 2000);
    }, 1000);
  };

  return (
    <View className="flex-1 bg-background">
      {/* Header */}
      <View 
        className="px-5 pb-4 border-b border-surfaceLight"
        style={{ paddingTop: insets.top + 8, backgroundColor: COLORS.surface }}
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
              <Text className="text-text font-bold text-lg">The Faru</Text>
              <View className="flex-row items-center gap-1.5">
                <View 
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: COLORS.primary }}
                />
                <Text className="text-textMuted text-xs">{onlineCount} in the reef tonight</Text>
              </View>
            </View>
          </View>
          <View 
            className="px-3 py-1.5 rounded-full"
            style={{ backgroundColor: COLORS.primary + '20' }}
          >
            <Text style={{ color: COLORS.primary, fontSize: 11, fontWeight: '600' }}>Safe Space</Text>
          </View>
        </View>
      </View>

      {/* Chat messages */}
      <ScrollView 
        ref={scrollViewRef}
        className="flex-1 px-4 py-4"
        contentContainerStyle={{ gap: 16, paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Welcome banner */}
        <View 
          className="rounded-2xl p-4 mb-2"
          style={{ backgroundColor: COLORS.surface }}
        >
          <Text className="text-textMuted text-sm text-center leading-5">
            🌙 Welcome to the Faru — a safe reef for night owls.{'\n'}
            Everyone here is anonymous. Be kind.
          </Text>
        </View>

        {/* Messages */}
        {messages.map((msg) => (
          msg.creature === 'user' ? (
            // User message (right aligned)
            <View key={msg.id} className="flex-row justify-end">
              <View 
                className="max-w-[80%] rounded-2xl rounded-br-sm p-3"
                style={{ backgroundColor: COLORS.primary }}
              >
                <Text style={{ color: COLORS.background }} className="text-base leading-5">
                  {msg.content}
                </Text>
              </View>
            </View>
          ) : (
            <MessageBubble key={msg.id} message={msg} isNew={msg.isNew} />
          )
        ))}

        {/* Typing indicator */}
        {typingCreature && <TypingIndicator creature={typingCreature} />}
      </ScrollView>

      {/* Input area */}
      <View 
        className="px-4 py-3 border-t border-surfaceLight"
        style={{ backgroundColor: COLORS.surface, paddingBottom: insets.bottom + 8 }}
      >
        <View className="flex-row items-center gap-3">
          <View className="flex-1 flex-row items-center bg-background rounded-2xl px-4 py-3">
            <TextInput
              value={inputText}
              onChangeText={setInputText}
              placeholder="Share how you're feeling..."
              placeholderTextColor={COLORS.textMuted}
              className="flex-1 text-text text-base"
              onSubmitEditing={handleSend}
              returnKeyType="send"
            />
          </View>
          <Pressable 
            onPress={handleSend}
            className="w-11 h-11 rounded-full items-center justify-center"
            style={{ 
              backgroundColor: inputText.trim() ? COLORS.primary : COLORS.surfaceLight,
            }}
          >
            <Text style={{ fontSize: 18 }}>↑</Text>
          </Pressable>
        </View>
        <Text className="text-textMuted text-xs text-center mt-2">
          Messages are anonymous and disappear at sunrise 🌅
        </Text>
      </View>
    </View>
  );
}
