import { Modal, View, Text, Pressable } from 'react-native';
import { COLORS } from '../constants';

type SupportOption = 'koamas' | 'faru' | 'breathing' | 'none';

type Props = {
  visible: boolean;
  onClose: () => void;
  onSelect: (option: SupportOption) => void;
};

const OPTIONS = [
  {
    id: 'koamas' as const,
    icon: '💬',
    title: 'Talk to Koamas',
    subtitle: 'A friend who listens',
    color: COLORS.primary,
  },
  {
    id: 'faru' as const,
    icon: '🐢',
    title: 'Join the Faru',
    subtitle: 'Connect with others',
    color: COLORS.stormy,
  },
  {
    id: 'breathing' as const,
    icon: '🌬️',
    title: 'Breathing Exercise',
    subtitle: '1 minute to calm',
    color: COLORS.secondary,
  },
];

export default function SupportOptionsModal({ visible, onClose, onSelect }: Props) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-end">
        {/* Backdrop */}
        <Pressable 
          className="absolute inset-0 bg-black/60"
          onPress={onClose}
        />

        {/* Content */}
        <View 
          className="rounded-t-3xl px-6 pt-6 pb-10"
          style={{ backgroundColor: COLORS.surface }}
        >
          {/* Handle */}
          <View className="w-12 h-1 rounded-full bg-surfaceLight self-center mb-6" />

          {/* Header */}
          <View className="items-center mb-8">
            <Text className="text-3xl mb-3">💙</Text>
            <Text className="text-text text-2xl font-bold mb-2">
              You're not alone
            </Text>
            <Text className="text-textMuted text-center">
              We're here for you. What would help right now?
            </Text>
          </View>

          {/* Option Cards */}
          <View className="gap-3 mb-6">
            {OPTIONS.map((option) => (
              <Pressable
                key={option.id}
                onPress={() => onSelect(option.id)}
                className="flex-row items-center p-4 rounded-2xl"
                style={{
                  backgroundColor: COLORS.background,
                  borderWidth: 1,
                  borderColor: COLORS.surfaceLight,
                }}
              >
                {/* Icon */}
                <View 
                  className="w-14 h-14 rounded-2xl items-center justify-center mr-4"
                  style={{ backgroundColor: option.color + '20' }}
                >
                  <Text className="text-2xl">{option.icon}</Text>
                </View>

                {/* Text */}
                <View className="flex-1">
                  <Text className="text-text font-semibold text-lg">
                    {option.title}
                  </Text>
                  <Text className="text-textMuted text-sm">
                    {option.subtitle}
                  </Text>
                </View>

                {/* Arrow */}
                <Text className="text-textMuted text-lg">→</Text>
              </Pressable>
            ))}
          </View>

          {/* Skip option */}
          <Pressable 
            onPress={() => onSelect('none')}
            className="py-3"
          >
            <Text className="text-center text-textMuted">
              ✕ Just check in
            </Text>
          </Pressable>

          {/* Crisis line */}
          <View 
            className="mt-4 pt-4 items-center"
            style={{ borderTopWidth: 1, borderTopColor: COLORS.surfaceLight }}
          >
            <Text className="text-textMuted text-xs text-center">
              In crisis? Call <Text style={{ color: COLORS.primary }}>1425</Text> (24/7 Mental Health Line)
            </Text>
          </View>
        </View>
      </View>
    </Modal>
  );
}



