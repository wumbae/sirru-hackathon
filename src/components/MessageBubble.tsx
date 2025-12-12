import { useEffect, useRef } from 'react';
import { View, Text, Animated } from 'react-native';
import { COLORS } from '../constants';

type Message = {
  role: 'user' | 'koamas';
  content: string;
};

type Props = {
  message: Message;
  isTyping?: boolean;
};

function TypingDots() {
  const dot1 = useRef(new Animated.Value(0.3)).current;
  const dot2 = useRef(new Animated.Value(0.3)).current;
  const dot3 = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    const animateDot = (dot: Animated.Value, delay: number) => {
      return Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.timing(dot, {
            toValue: 1,
            duration: 400,
            useNativeDriver: true,
          }),
          Animated.timing(dot, {
            toValue: 0.3,
            duration: 400,
            useNativeDriver: true,
          }),
        ])
      );
    };

    const anim1 = animateDot(dot1, 0);
    const anim2 = animateDot(dot2, 200);
    const anim3 = animateDot(dot3, 400);

    anim1.start();
    anim2.start();
    anim3.start();

    return () => {
      anim1.stop();
      anim2.stop();
      anim3.stop();
    };
  }, []);

  return (
    <View className="flex-row items-center gap-1 py-1">
      <Animated.View
        style={{
          width: 8,
          height: 8,
          borderRadius: 4,
          backgroundColor: COLORS.textMuted,
          opacity: dot1,
        }}
      />
      <Animated.View
        style={{
          width: 8,
          height: 8,
          borderRadius: 4,
          backgroundColor: COLORS.textMuted,
          opacity: dot2,
        }}
      />
      <Animated.View
        style={{
          width: 8,
          height: 8,
          borderRadius: 4,
          backgroundColor: COLORS.textMuted,
          opacity: dot3,
        }}
      />
    </View>
  );
}

export default function MessageBubble({ message, isTyping }: Props) {
  const isUser = message.role === 'user';

  if (isTyping) {
    return (
      <View className="flex-row items-end gap-2 mb-3 max-w-[80%]">
        {/* Koamas avatar */}
        <View
          style={{
            width: 32,
            height: 32,
            borderRadius: 16,
            backgroundColor: COLORS.primary + '20',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text style={{ fontSize: 16 }}>🐙</Text>
        </View>
        
        {/* Typing bubble */}
        <View
          style={{
            backgroundColor: COLORS.surface,
            paddingHorizontal: 16,
            paddingVertical: 12,
            borderRadius: 20,
            borderTopLeftRadius: 4,
          }}
        >
          <TypingDots />
        </View>
      </View>
    );
  }

  if (isUser) {
    return (
      <View className="flex-row justify-end mb-3">
        <View
          style={{
            maxWidth: '80%',
            backgroundColor: COLORS.primary,
            paddingHorizontal: 16,
            paddingVertical: 12,
            borderRadius: 20,
            borderTopRightRadius: 4,
          }}
        >
          <Text
            style={{
              color: COLORS.background,
              fontSize: 15,
              lineHeight: 21,
            }}
          >
            {message.content}
          </Text>
        </View>
      </View>
    );
  }

  // Koamas message
  return (
    <View className="flex-row items-end gap-2 mb-3 max-w-[85%]">
      {/* Koamas avatar */}
      <View
        style={{
          width: 32,
          height: 32,
          borderRadius: 16,
          backgroundColor: COLORS.primary + '20',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Text style={{ fontSize: 16 }}>🐙</Text>
      </View>
      
      {/* Message bubble */}
      <View
        style={{
          flex: 1,
          backgroundColor: COLORS.surface,
          paddingHorizontal: 16,
          paddingVertical: 12,
          borderRadius: 20,
          borderTopLeftRadius: 4,
        }}
      >
        <Text
          style={{
            color: COLORS.text,
            fontSize: 15,
            lineHeight: 21,
          }}
        >
          {message.content}
        </Text>
      </View>
    </View>
  );
}



