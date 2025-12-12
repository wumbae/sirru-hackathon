import { View, Text } from 'react-native';
import { COLORS } from '../constants';

type AavaDataPoint = {
  hour: number;
  label: string;
  stormy: number;
};

type Props = {
  data: AavaDataPoint[];
};

// Interpolate between cyan (low stormy) and purple (high stormy)
function getBarColor(stormyPercent: number): string {
  if (stormyPercent >= 90) return COLORS.stormy;
  if (stormyPercent >= 70) return '#7C6BF0'; // mix
  if (stormyPercent >= 50) return '#5BA8E8'; // more cyan
  return COLORS.primary + 'CC';
}

export default function Aava({ data }: Props) {
  const maxStormy = Math.max(...data.map(d => d.stormy));

  return (
    <View 
      className="rounded-3xl p-5"
      style={{ backgroundColor: COLORS.surface }}
    >
      {/* Header */}
      <View className="flex-row items-center justify-between mb-5">
        <View className="flex-row items-center gap-2">
          <Text className="text-xl">🌊</Text>
          <Text className="text-text font-bold text-lg">The Tide</Text>
        </View>
        <View 
          className="px-3 py-1 rounded-full"
          style={{ backgroundColor: COLORS.stormy + '25' }}
        >
          <Text 
            className="text-xs font-semibold"
            style={{ color: COLORS.stormy }}
          >
            Peak: 11pm
          </Text>
        </View>
      </View>

      {/* Chart */}
      <View className="flex-row items-end justify-between h-28 mb-3 px-1">
        {data.map((point) => {
          const isMax = point.stormy === maxStormy;
          const barColor = getBarColor(point.stormy);
          const heightPercent = (point.stormy / 100) * 100;

          return (
            <View key={point.hour} className="flex-1 items-center mx-[2px]">
              {/* Bar */}
              <View
                className="w-full rounded-t-lg"
                style={{
                  height: `${heightPercent}%`,
                  backgroundColor: barColor,
                  shadowColor: isMax ? COLORS.stormy : 'transparent',
                  shadowOffset: { width: 0, height: 0 },
                  shadowOpacity: isMax ? 0.8 : 0,
                  shadowRadius: isMax ? 12 : 0,
                  opacity: isMax ? 1 : 0.7,
                }}
              />
            </View>
          );
        })}
      </View>

      {/* Labels */}
      <View className="flex-row justify-between px-1">
        {data.map((point) => {
          const isMax = point.stormy === maxStormy;
          return (
            <View key={`label-${point.hour}`} className="flex-1 items-center">
              <Text
                className="text-[9px]"
                style={{ 
                  color: isMax ? COLORS.stormy : COLORS.textMuted,
                  fontWeight: isMax ? '700' : '400',
                }}
              >
                {point.label}
              </Text>
            </View>
          );
        })}
      </View>

      {/* Insight */}
      <View 
        className="mt-4 pt-4 flex-row items-center justify-center gap-2"
        style={{ borderTopWidth: 1, borderTopColor: COLORS.surfaceLight }}
      >
        <Text className="text-textMuted text-xs">💡</Text>
        <Text className="text-textMuted text-xs text-center">
          Most people struggle around <Text style={{ color: COLORS.stormy, fontWeight: '600' }}>11pm</Text>
        </Text>
      </View>
    </View>
  );
}



