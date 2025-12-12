import { Modal, View, Text, Pressable } from 'react-native';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../constants';
import { SupportOptionsModal } from '../components';

type Props = {
  visible: boolean;
  onClose: () => void;
};

export default function CheckinModal({ visible, onClose }: Props) {
  const navigation = useNavigation<any>();
  const [selected, setSelected] = useState<'sunny' | 'stormy' | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [showSupport, setShowSupport] = useState(false);

  const handleSubmit = () => {
    if (selected) {
      setSubmitted(true);
      
      if (selected === 'stormy') {
        // Show support options after brief delay
        setTimeout(() => {
          setSubmitted(false);
          setShowSupport(true);
        }, 1200);
      } else {
        // Sunny - just close after success message
        setTimeout(() => {
          resetAndClose();
        }, 1500);
      }
    }
  };

  const handleSupportSelect = (option: 'koamas' | 'faru' | 'breathing' | 'none') => {
    setShowSupport(false);
    resetAndClose();
    
    // Navigate based on selection
    if (option === 'koamas') {
      navigation.navigate('Koamas');
    } else if (option === 'faru') {
      navigation.navigate('Chat');
    } else if (option === 'breathing') {
      navigation.navigate('Breathe');
    }
    // 'none' just closes
  };

  const resetAndClose = () => {
    setSubmitted(false);
    setSelected(null);
    setShowSupport(false);
    onClose();
  };

  const handleClose = () => {
    if (showSupport) {
      setShowSupport(false);
    }
    resetAndClose();
  };

  return (
    <>
      <Modal
        visible={visible && !showSupport}
        transparent
        animationType="slide"
        onRequestClose={handleClose}
      >
        <View className="flex-1 justify-end">
          {/* Backdrop */}
          <Pressable 
            className="absolute inset-0 bg-black/60"
            onPress={handleClose}
          />

          {/* Content */}
          <View 
            className="rounded-t-3xl px-6 pt-6 pb-10"
            style={{ backgroundColor: COLORS.surface }}
          >
            {/* Handle */}
            <View className="w-12 h-1 rounded-full bg-surfaceLight self-center mb-6" />

            {submitted ? (
              /* Success State */
              <View className="items-center py-8">
                <View 
                  className="w-20 h-20 rounded-full items-center justify-center mb-4"
                  style={{ 
                    backgroundColor: selected === 'sunny' ? COLORS.sunny + '20' : COLORS.stormy + '20',
                  }}
                >
                  <Text className="text-4xl">{selected === 'sunny' ? '☀️' : '⛈️'}</Text>
                </View>
                <Text className="text-text text-xl font-bold mb-2">Checked in!</Text>
                <Text className="text-textMuted text-center">
                  {selected === 'stormy' 
                    ? "We're here for you..." 
                    : "Your anonymous pulse has been added to the map."
                  }
                </Text>
              </View>
            ) : (
              <>
                {/* Header */}
                <View className="items-center mb-8">
                  <Text className="text-text text-2xl font-bold mb-2">
                    How's your weather?
                  </Text>
                  <Text className="text-textMuted text-center">
                    Check in anonymously. No one knows it's you.
                  </Text>
                </View>

                {/* Mood Options */}
                <View className="flex-row gap-4 mb-8">
                  {/* Sunny Option */}
                  <Pressable 
                    onPress={() => setSelected('sunny')}
                    className="flex-1 items-center py-6 rounded-2xl"
                    style={{
                      backgroundColor: selected === 'sunny' ? COLORS.sunny + '20' : COLORS.background,
                      borderWidth: 2,
                      borderColor: selected === 'sunny' ? COLORS.sunny : COLORS.surfaceLight,
                      shadowColor: selected === 'sunny' ? COLORS.sunny : 'transparent',
                      shadowOffset: { width: 0, height: 4 },
                      shadowOpacity: selected === 'sunny' ? 0.3 : 0,
                      shadowRadius: 12,
                    }}
                  >
                    <Text className="text-5xl mb-3">☀️</Text>
                    <Text 
                      className="text-lg font-semibold"
                      style={{ color: selected === 'sunny' ? COLORS.sunny : COLORS.text }}
                    >
                      Sunny
                    </Text>
                    <Text className="text-textMuted text-xs mt-1">Feeling okay</Text>
                  </Pressable>

                  {/* Stormy Option */}
                  <Pressable 
                    onPress={() => setSelected('stormy')}
                    className="flex-1 items-center py-6 rounded-2xl"
                    style={{
                      backgroundColor: selected === 'stormy' ? COLORS.stormy + '20' : COLORS.background,
                      borderWidth: 2,
                      borderColor: selected === 'stormy' ? COLORS.stormy : COLORS.surfaceLight,
                      shadowColor: selected === 'stormy' ? COLORS.stormy : 'transparent',
                      shadowOffset: { width: 0, height: 4 },
                      shadowOpacity: selected === 'stormy' ? 0.3 : 0,
                      shadowRadius: 12,
                    }}
                  >
                    <Text className="text-5xl mb-3">⛈️</Text>
                    <Text 
                      className="text-lg font-semibold"
                      style={{ color: selected === 'stormy' ? COLORS.stormy : COLORS.text }}
                    >
                      Stormy
                    </Text>
                    <Text className="text-textMuted text-xs mt-1">Struggling tonight</Text>
                  </Pressable>
                </View>

                {/* Submit Button */}
                <Pressable 
                  onPress={handleSubmit}
                  disabled={!selected}
                  className="rounded-2xl py-4"
                  style={{
                    backgroundColor: selected ? COLORS.primary : COLORS.surfaceLight,
                    shadowColor: selected ? COLORS.primary : 'transparent',
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: selected ? 0.4 : 0,
                    shadowRadius: 12,
                  }}
                >
                  <Text 
                    className="text-center text-lg font-bold"
                    style={{ color: selected ? COLORS.background : COLORS.textMuted }}
                  >
                    {selected ? `Check in as ${selected === 'sunny' ? 'Sunny ☀️' : 'Stormy ⛈️'}` : 'Select your weather'}
                  </Text>
                </Pressable>

                {/* Privacy note */}
                <Text className="text-textMuted text-xs text-center mt-4">
                  🔒 Your check-in is completely anonymous
                </Text>
              </>
            )}
          </View>
        </View>
      </Modal>

      {/* Support Options Modal (shown after stormy check-in) */}
      <SupportOptionsModal
        visible={showSupport}
        onClose={handleClose}
        onSelect={handleSupportSelect}
      />
    </>
  );
}

