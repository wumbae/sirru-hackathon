import { useState, useRef, useEffect } from 'react';
import { View, Text, ScrollView, TextInput, Pressable, KeyboardAvoidingView, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { COLORS, CRISIS_LINES } from '../constants';
import { getKoamasResponse } from '../data/demoData';
import { MainStackParamList } from '../navigation/types';

type Message = {
  id: string;
  role: 'user' | 'koamas';
  content: string;
};

const QUICK_PROMPTS = [
  "can't sleep",
  "feeling alone",
  "stressed",
  "anxious",
];

export default function KoamasScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NativeStackNavigationProp<MainStackParamList>>();
  const scrollViewRef = useRef<ScrollView>(null);
  
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'koamas',
      content: "Hey there 🌊 I'm Koamas. This is a safe space — no judgments, just listening. What's on your mind tonight?",
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = (text?: string) => {
    const messageText = text || inputText.trim();
    if (!messageText) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: messageText,
    };
    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate Koamas typing delay
    setTimeout(() => {
      const response = getKoamasResponse(messageText);
      const koamasMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'koamas',
        content: response,
      };
      setMessages(prev => [...prev, koamasMessage]);
      setIsTyping(false);
    }, 1500 + Math.random() * 1000);
  };

  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [messages, isTyping]);

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
        <View className="flex-row items-center">
          <Text style={{ fontSize: 24, marginRight: 8 }}>🐙</Text>
          <View>
            <Text className="text-text font-bold">Koamas</Text>
            <Text className="text-textMuted text-xs">Your ocean friend</Text>
          </View>
        </View>
        <View style={{ width: 50 }} />
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
            className={`mb-3 max-w-[85%] ${message.role === 'user' ? 'self-end' : 'self-start'}`}
          >
            {message.role === 'koamas' && (
              <Text style={{ fontSize: 20, marginBottom: 4 }}>🐙</Text>
            )}
            <View 
              className="px-4 py-3 rounded-2xl"
              style={{
                backgroundColor: message.role === 'user' ? COLORS.primary : COLORS.surface,
                borderBottomRightRadius: message.role === 'user' ? 4 : 16,
                borderBottomLeftRadius: message.role === 'koamas' ? 4 : 16,
              }}
            >
              <Text 
                style={{ 
                  color: message.role === 'user' ? COLORS.background : COLORS.text,
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
          <View className="self-start mb-3">
            <Text style={{ fontSize: 20, marginBottom: 4 }}>🐙</Text>
            <View 
              className="px-4 py-3 rounded-2xl"
              style={{ backgroundColor: COLORS.surface, borderBottomLeftRadius: 4 }}
            >
              <Text style={{ color: COLORS.textMuted }}>typing...</Text>
            </View>
          </View>
        )}
        
        {/* Quick prompts - only show at start */}
        {messages.length === 1 && (
          <View className="mt-4">
            <Text className="text-textMuted text-xs mb-2">Quick options:</Text>
            <View className="flex-row flex-wrap gap-2">
              {QUICK_PROMPTS.map((prompt) => (
                <Pressable
                  key={prompt}
                  onPress={() => handleSend(prompt)}
                  className="px-3 py-2 rounded-full"
                  style={{ backgroundColor: COLORS.surfaceLight }}
                >
                  <Text style={{ color: COLORS.text, fontSize: 13 }}>{prompt}</Text>
                </Pressable>
              ))}
            </View>
          </View>
        )}

        {/* Crisis line notice */}
        <View className="mt-6 mb-4 p-3 rounded-xl" style={{ backgroundColor: COLORS.surface }}>
          <Text className="text-textMuted text-xs text-center">
            If you need urgent help, call{' '}
            <Text style={{ color: COLORS.primary, fontWeight: '600' }}>
              {CRISIS_LINES.mentalHealth.number}
            </Text>
            {' '}(24/7 Mental Health Line)
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
          placeholder="Say something..."
          placeholderTextColor={COLORS.textMuted}
          className="flex-1 px-4 py-3 rounded-full"
          style={{ 
            backgroundColor: COLORS.surface,
            color: COLORS.text,
            fontSize: 15,
          }}
          onSubmitEditing={() => handleSend()}
          returnKeyType="send"
        />
        <Pressable
          onPress={() => handleSend()}
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

