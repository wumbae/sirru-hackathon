import { useState, useRef, useEffect } from 'react';
import { View, Text, ScrollView, TextInput, Pressable, KeyboardAvoidingView, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { COLORS, CREATURES } from '../constants';
import { FARU_SCRIPT, FaruMessage } from '../data/demoData';

type ChatMessage = {
  id: string;
  creature: string;
  content: string;
  isUser?: boolean;
};

export default function FaruScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const scrollViewRef = useRef<ScrollView>(null);
  
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [currentScriptIndex, setCurrentScriptIndex] = useState(0);

  // Auto-play scripted messages
  useEffect(() => {
    if (currentScriptIndex >= FARU_SCRIPT.length) return;

    const scriptMessage = FARU_SCRIPT[currentScriptIndex];
    
    const timer = setTimeout(() => {
      setIsTyping(true);
      
      // Show typing for a bit, then add message
      setTimeout(() => {
        setMessages(prev => [...prev, {
          id: scriptMessage.id,
          creature: scriptMessage.creature,
          content: scriptMessage.content,
        }]);
        setIsTyping(false);
        setCurrentScriptIndex(prev => prev + 1);
      }, 1000 + Math.random() * 500);
    }, scriptMessage.delay);

    return () => clearTimeout(timer);
  }, [currentScriptIndex]);

  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [messages, isTyping]);

  const getCreatureEmoji = (creatureId: string) => {
    const creature = CREATURES.find(c => c.id === creatureId);
    return creature?.emoji || '🐚';
  };

  const getCreatureName = (creatureId: string) => {
    const creature = CREATURES.find(c => c.id === creatureId);
    return creature?.name || 'Anonymous';
  };

  const handleSend = () => {
    if (!inputText.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      creature: 'user',
      content: inputText.trim(),
      isUser: true,
    };
    setMessages(prev => [...prev, userMessage]);
    setInputText('');
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1"
      style={{ backgroundColor: COLORS.background }}
    >
      {/* Header */}
      <View 
        className="px-4 pb-3 border-b flex-row items-center justify-between"
        style={{ 
          paddingTop: insets.top + 8,
          borderBottomColor: COLORS.surfaceLight,
        }}
      >
        <Pressable onPress={() => navigation.goBack()}>
          <Text style={{ color: COLORS.textMuted, fontSize: 16 }}>← Back</Text>
        </Pressable>
        <View className="items-center">
          <Text className="text-text font-bold">The Faru</Text>
          <Text className="text-textMuted text-xs">5 creatures online</Text>
        </View>
        <View style={{ width: 50 }} />
      </View>

      {/* Welcome banner */}
      <View 
        className="mx-4 mt-3 p-3 rounded-xl"
        style={{ backgroundColor: COLORS.primary + '15' }}
      >
        <Text className="text-center" style={{ color: COLORS.primary, fontSize: 13 }}>
          🐢 This is a safe reef. Be kind to each other.
        </Text>
      </View>

      {/* Messages */}
      <ScrollView 
        ref={scrollViewRef}
        className="flex-1 px-4 py-4"
        showsVerticalScrollIndicator={false}
      >
        {messages.map((message) => (
          <View 
            key={message.id}
            className={`mb-4 max-w-[85%] ${message.isUser ? 'self-end' : 'self-start'}`}
          >
            {!message.isUser && (
              <View className="flex-row items-center mb-1">
                <Text style={{ fontSize: 16, marginRight: 6 }}>
                  {getCreatureEmoji(message.creature)}
                </Text>
                <Text className="text-textMuted text-xs">
                  {getCreatureName(message.creature)}
                </Text>
              </View>
            )}
            <View 
              className="px-4 py-3 rounded-2xl"
              style={{
                backgroundColor: message.isUser ? COLORS.primary : COLORS.surface,
                borderBottomRightRadius: message.isUser ? 4 : 16,
                borderBottomLeftRadius: !message.isUser ? 4 : 16,
              }}
            >
              <Text 
                style={{ 
                  color: message.isUser ? COLORS.background : COLORS.text,
                  fontSize: 15,
                  lineHeight: 22,
                }}
              >
                {message.content}
              </Text>
            </View>
          </View>
        ))}
        
        {/* Typing indicator */}
        {isTyping && (
          <View className="self-start mb-4">
            <View className="flex-row items-center mb-1">
              <Text style={{ fontSize: 16, marginRight: 6 }}>🐙</Text>
              <Text className="text-textMuted text-xs">Someone is typing...</Text>
            </View>
            <View 
              className="px-4 py-3 rounded-2xl"
              style={{ backgroundColor: COLORS.surface, borderBottomLeftRadius: 4 }}
            >
              <Text style={{ color: COLORS.textMuted }}>...</Text>
            </View>
          </View>
        )}

        {/* Footer notice */}
        <View className="mt-4 mb-2">
          <Text className="text-textMuted text-xs text-center">
            Messages disappear at sunrise 🌅
          </Text>
        </View>
      </ScrollView>

      {/* Input */}
      <View 
        className="px-4 py-3 border-t flex-row items-center gap-3"
        style={{ 
          borderTopColor: COLORS.surfaceLight,
          paddingBottom: insets.bottom + 8,
        }}
      >
        <TextInput
          value={inputText}
          onChangeText={setInputText}
          placeholder="Share with the faru..."
          placeholderTextColor={COLORS.textMuted}
          className="flex-1 px-4 py-3 rounded-full"
          style={{ 
            backgroundColor: COLORS.surface,
            color: COLORS.text,
            fontSize: 15,
          }}
          onSubmitEditing={handleSend}
          returnKeyType="send"
        />
        <Pressable
          onPress={handleSend}
          disabled={!inputText.trim()}
          className="w-10 h-10 rounded-full items-center justify-center"
          style={{ 
            backgroundColor: inputText.trim() ? COLORS.primary : COLORS.surfaceLight,
          }}
        >
          <Text style={{ fontSize: 18 }}>↑</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

