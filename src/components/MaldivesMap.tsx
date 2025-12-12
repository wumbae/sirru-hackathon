import { useMemo } from 'react';
import { View, Text, Dimensions } from 'react-native';
import Svg, { Path, Circle, Defs, RadialGradient, Stop, G } from 'react-native-svg';
import { COLORS } from '../constants';
import { CheckinPin } from '../data/demoData';
import PulseDot from './PulseDot';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// Actual Maldives atoll positions (normalized 0-100 coordinates)
// Based on real geographic layout - double chain formation
const ATOLL_POSITIONS: Record<string, { x: number; y: number }> = {
  // Northern atolls
  'HA': { x: 48, y: 4 },
  'HDh': { x: 52, y: 8 },
  'Sh': { x: 50, y: 12 },
  'N': { x: 54, y: 16 },
  'R': { x: 48, y: 20 },
  'B': { x: 52, y: 24 },
  'Lh': { x: 56, y: 28 },
  // Central atolls (Malé area) - double chain
  'K': { x: 50, y: 34 },      // Malé - capital
  'AA': { x: 54, y: 38 },
  'ADh': { x: 48, y: 42 },
  'V': { x: 58, y: 44 },
  'M': { x: 44, y: 48 },
  'F': { x: 52, y: 52 },
  'Dh': { x: 46, y: 56 },
  // Southern atolls
  'Th': { x: 50, y: 60 },
  'L': { x: 54, y: 66 },
  'GA': { x: 48, y: 74 },
  'GDh': { x: 52, y: 80 },
  'Gn': { x: 50, y: 86 },
  'S': { x: 48, y: 94 },      // Addu - southernmost
};

// Seeded random for consistent positions
function seededRandom(seed: number) {
  const x = Math.sin(seed * 9999) * 10000;
  return x - Math.floor(x);
}

type Props = {
  checkins: CheckinPin[];
  userAtoll: string;
};

export default function MaldivesMap({ checkins, userAtoll }: Props) {
  // Calculate dot positions near their atolls
  const dotPositions = useMemo(() => {
    return checkins.slice(0, 25).map((checkin, index) => {
      const atollPos = ATOLL_POSITIONS[checkin.atoll] || { x: 50, y: 50 };
      const seed = parseInt(checkin.id) * 1000 + index;
      
      // Small offset around the atoll
      const offsetX = (seededRandom(seed) - 0.5) * 12;
      const offsetY = (seededRandom(seed + 1) - 0.5) * 6;
      
      return {
        ...checkin,
        x: Math.max(5, Math.min(95, atollPos.x + offsetX)),
        y: Math.max(3, Math.min(97, atollPos.y + offsetY)),
      };
    });
  }, [checkins]);

  const userAtollPos = ATOLL_POSITIONS[userAtoll] || { x: 50, y: 34 };

  return (
    <View className="flex-1 relative overflow-hidden">
      {/* Deep ocean background */}
      <View className="absolute inset-0" style={{ backgroundColor: '#050510' }} />
      
      {/* SVG Map Layer */}
      <Svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
        <Defs>
          {/* Ocean gradient */}
          <RadialGradient id="oceanGlow" cx="50%" cy="40%" r="60%">
            <Stop offset="0%" stopColor={COLORS.primary} stopOpacity="0.08" />
            <Stop offset="100%" stopColor="#050510" stopOpacity="0" />
          </RadialGradient>
          {/* User location glow */}
          <RadialGradient id="userGlow" cx="50%" cy="50%" r="50%">
            <Stop offset="0%" stopColor={COLORS.primary} stopOpacity="0.6" />
            <Stop offset="100%" stopColor={COLORS.primary} stopOpacity="0" />
          </RadialGradient>
        </Defs>

        {/* Ocean ambient glow */}
        <Circle cx="50" cy="40" r="45" fill="url(#oceanGlow)" />

        {/* Maldives chain outline - stylized path */}
        <Path
          d="M 48 2 
             Q 52 6, 50 10 
             Q 54 14, 48 18 
             Q 52 22, 56 26 
             Q 50 32, 54 36 
             Q 48 40, 58 44 
             Q 44 48, 52 54 
             Q 46 58, 50 62 
             Q 54 68, 48 76 
             Q 52 82, 50 88 
             Q 48 94, 48 98"
          stroke={COLORS.primary}
          strokeWidth="0.5"
          strokeOpacity="0.3"
          fill="none"
          strokeDasharray="2,2"
        />

        {/* Atoll markers */}
        {Object.entries(ATOLL_POSITIONS).map(([code, pos]) => {
          const isUser = code === userAtoll;
          return (
            <G key={code}>
              {/* Atoll circle */}
              <Circle
                cx={pos.x}
                cy={pos.y}
                r={isUser ? 3 : 1.5}
                fill={isUser ? COLORS.primary + '40' : COLORS.surfaceLight + '40'}
                stroke={isUser ? COLORS.primary : COLORS.surfaceLight}
                strokeWidth={isUser ? 0.8 : 0.3}
              />
              {/* User glow */}
              {isUser && (
                <Circle
                  cx={pos.x}
                  cy={pos.y}
                  r={6}
                  fill="url(#userGlow)"
                />
              )}
            </G>
          );
        })}
      </Svg>

      {/* Atoll labels */}
      {Object.entries(ATOLL_POSITIONS).map(([code, pos]) => {
        const isUser = code === userAtoll;
        if (!isUser) return null;
        return (
          <View
            key={`label-${code}`}
            className="absolute"
            style={{
              left: `${pos.x + 4}%`,
              top: `${pos.y - 1}%`,
            }}
          >
            <Text
              style={{
                color: COLORS.primary,
                fontSize: 10,
                fontWeight: '700',
                textShadowColor: COLORS.primary,
                textShadowRadius: 8,
              }}
            >
              {code}
            </Text>
          </View>
        );
      })}

      {/* Pulse dots */}
      {dotPositions.map((checkin) => (
        <View
          key={checkin.id}
          className="absolute"
          style={{
            left: `${checkin.x}%`,
            top: `${checkin.y}%`,
            marginLeft: -6,
            marginTop: -6,
          }}
        >
          <PulseDot mood={checkin.mood} size={12} />
        </View>
      ))}

      {/* Legend */}
      <View 
        className="absolute bottom-28 left-4 right-4 flex-row items-center justify-center gap-6 py-2.5 px-5 rounded-2xl"
        style={{ backgroundColor: COLORS.surface + 'E0' }}
      >
        <View className="flex-row items-center gap-2">
          <View 
            style={{ 
              width: 10,
              height: 10,
              borderRadius: 5,
              backgroundColor: COLORS.sunny,
              shadowColor: COLORS.sunny,
              shadowOpacity: 0.8,
              shadowRadius: 4,
            }}
          />
          <Text style={{ color: COLORS.text, fontSize: 12, fontWeight: '500' }}>Sunny</Text>
        </View>
        <View className="flex-row items-center gap-2">
          <View 
            style={{ 
              width: 10,
              height: 10,
              borderRadius: 5,
              backgroundColor: COLORS.stormy,
              shadowColor: COLORS.stormy,
              shadowOpacity: 0.8,
              shadowRadius: 4,
            }}
          />
          <Text style={{ color: COLORS.text, fontSize: 12, fontWeight: '500' }}>Stormy</Text>
        </View>
        <View className="flex-row items-center gap-2">
          <View 
            style={{ 
              width: 10,
              height: 10,
              borderRadius: 5,
              backgroundColor: COLORS.primary + '40',
              borderWidth: 2,
              borderColor: COLORS.primary,
            }}
          />
          <Text style={{ color: COLORS.text, fontSize: 12, fontWeight: '500' }}>You</Text>
        </View>
      </View>
    </View>
  );
}

