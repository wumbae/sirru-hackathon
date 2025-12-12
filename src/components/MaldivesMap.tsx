import { useMemo } from 'react';
import { View, Dimensions } from 'react-native';
import Svg, { Path, Polygon, Polyline, Defs, RadialGradient, Stop } from 'react-native-svg';
import { COLORS } from '../constants';
import { CheckinPin } from '../data/demoData';
import PulseDot from './PulseDot';

// Original SVG dimensions from Maldives_location_map.svg
const SVG_WIDTH = 323.15;
const SVG_HEIGHT = 527.24;
const SVG_ASPECT_RATIO = SVG_WIDTH / SVG_HEIGHT;

// Get screen dimensions
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Ocean background color - exported for HomeScreen
export const OCEAN_BG = '#050a12';

// Atoll center positions in original SVG coordinates
const ATOLL_POSITIONS: Record<string, { x: number; y: number }> = {
  'HA': { x: 144, y: 24 },
  'HDh': { x: 155, y: 60 },
  'Sh': { x: 127, y: 70 },
  'N': { x: 147, y: 110 },
  'R': { x: 150, y: 130 },
  'B': { x: 147, y: 91 },
  'Lh': { x: 178, y: 155 },
  'K': { x: 150, y: 143 },
  'AA': { x: 182, y: 127 },
  'ADh': { x: 185, y: 190 },
  'V': { x: 178, y: 156 },
  'M': { x: 140, y: 225 },
  'F': { x: 183, y: 250 },
  'Dh': { x: 183, y: 250 },
  'Th': { x: 145, y: 290 },
  'L': { x: 158, y: 322 },
  'GA': { x: 170, y: 440 },
  'GDh': { x: 177, y: 493 },
  'Gn': { x: 177, y: 493 },
  'S': { x: 160, y: 513 },
};

// Island colors
const ISLAND_FILL = '#3A9080';
const ISLAND_STROKE = 'rgba(255,255,255,0.3)';
const ISLAND_STROKE_WIDTH = 1;

// User atoll highlight
const USER_FILL = COLORS.primary + '60';
const USER_STROKE = COLORS.primary;
const USER_STROKE_WIDTH = 2;

type Props = {
  checkins: CheckinPin[];
  userAtoll: string;
};

export default function MaldivesMap({ checkins, userAtoll }: Props) {
  // Calculate dot positions near their atolls
  const dotPositions = useMemo(() => {
    const atollCounts: Record<string, number> = {};
    
    return checkins.map((checkin) => {
      const atollPos = ATOLL_POSITIONS[checkin.atoll];
      if (!atollPos) return null;
      
      const count = atollCounts[checkin.atoll] || 0;
      atollCounts[checkin.atoll] = count + 1;
      
      const offsets = [
        { x: 0, y: 0 },
        { x: 12, y: 8 },
        { x: -10, y: 10 },
      ];
      const offset = offsets[count % offsets.length];
      
      return {
        ...checkin,
        x: atollPos.x + offset.x,
        y: atollPos.y + offset.y,
      };
    }).filter(Boolean) as (CheckinPin & { x: number; y: number })[];
  }, [checkins]);

  // Check if atoll is user's atoll
  const isUserAtoll = (code: string) => code === userAtoll;
  const getFill = (code: string) => isUserAtoll(code) ? USER_FILL : ISLAND_FILL;
  const getStroke = (code: string) => isUserAtoll(code) ? USER_STROKE : ISLAND_STROKE;
  const getStrokeWidth = (code: string) => isUserAtoll(code) ? USER_STROKE_WIDTH : ISLAND_STROKE_WIDTH;

  // Calculate SVG display dimensions maintaining aspect ratio
  const screenAspectRatio = SCREEN_WIDTH / SCREEN_HEIGHT;
  let svgDisplayWidth: number;
  let svgDisplayHeight: number;
  
  if (screenAspectRatio > SVG_ASPECT_RATIO) {
    svgDisplayHeight = SCREEN_HEIGHT;
    svgDisplayWidth = SCREEN_HEIGHT * SVG_ASPECT_RATIO;
  } else {
    svgDisplayWidth = SCREEN_WIDTH;
    svgDisplayHeight = SCREEN_WIDTH / SVG_ASPECT_RATIO;
  }

  return (
    <View 
      style={{ 
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: OCEAN_BG,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* SVG Map with fixed dimensions to maintain aspect ratio */}
      <Svg 
        width={svgDisplayWidth}
        height={svgDisplayHeight}
        viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}
        preserveAspectRatio="xMidYMid meet"
      >
        <Defs>
          <RadialGradient id="userGlow" cx="50%" cy="50%" r="50%">
            <Stop offset="0%" stopColor={COLORS.primary} stopOpacity="0.5" />
            <Stop offset="100%" stopColor={COLORS.primary} stopOpacity="0" />
          </RadialGradient>
        </Defs>

        {/* ===== EXACT MALDIVES ATOLL SHAPES FROM SVG FILE ===== */}
        
        {/* Haa Alif - northernmost */}
        <Polygon
          points="144.003,18.25 144.282,18.373 145.503,18.916 147.17,20.083 148.003,21.166 149.337,22.25 150.42,25.166 150.42,26.583 148.837,27.583 149.337,28.666 148.92,30.333 147.753,30.333 145.92,30.75 144.587,29.25 143.17,27.833 141.337,26.25 139.753,25.666 137.587,24.083 137.587,22.333 137.92,20.666 138.67,20.416 140.837,18.666 142.587,18.25"
          fill={getFill('HA')}
          stroke={getStroke('HA')}
          strokeWidth={getStrokeWidth('HA')}
        />
        
        {/* Haa Dhaalu / Large northern */}
        <Path
          d="M163.17,27.833l1.083,1.583l0.667,1.75v2.75l-0.875,1.75l-1.625,3.25l-2.75,2.583l-2.75,3.083l-1.75,2.583l-0.833,3v2.667l-0.52,4.5v3.5l1.519,1.75l2.917,1.833l1.834,0.5l3.75,2.583l2.084,4.25l2.666,5.583v3.167l0.333,3.917l1,4.583l2.583,2.083l4.832,1.833l2.834,4.333v3.333l-2.084,2.167l-1.5,4.417l-0.333,3.083l-2.083,1.5l-3.417,0.833l-3.759-1.917l-2.408-2.917l-2.083-2.583l-2.083-2.833l-1.583-3.917v-2.667l-1.917-5.083l-4.5-5.083L151.251,82l-2-4.417l-0.667-3.667v-3.25l-2.583-2.917l-3.333-2.917l-1-6c0,0-0.25-3.5,0-3.75s-0.111-4.333-0.111-4.333l0.944-5.583l2.167-3.667l1.917-5.084l1.333-1.583l3.75-0.25l2.5-1.833l2.667-3.333l2.917-1.583h2H163.17z"
          fill={getFill('HDh')}
          stroke={getStroke('HDh')}
          strokeWidth={getStrokeWidth('HDh')}
        />
        
        {/* Shaviyani */}
        <Polygon
          points="131.667,63.833 129.917,65.917 127.167,69.583 126.75,72 125.75,75.417 124.417,76.333 122.5,76.333 121.583,74.75 121.583,73.167 122.333,70.667 123.75,68.083 125.083,66.5 126.625,64.583 128.833,63.417 130.5,62.667 131.167,62.667"
          fill={getFill('Sh')}
          stroke={getStroke('Sh')}
          strokeWidth={getStrokeWidth('Sh')}
        />
        
        {/* Small island (Baa) */}
        <Polygon
          points="146,90.166 147.5,90.833 147.167,91.999 146,92.333 145.083,91.249"
          fill={getFill('B')}
          stroke={getStroke('B')}
          strokeWidth={getStrokeWidth('B')}
        />
        
        {/* Noonu / Raa region */}
        <Path
          d="M146.917,95.333l1.5,1l1,2.583l1.333,2.417l0.417,3.333l0.667,5.5l1.083,2.416l0.5,4.25v3l-0.5,3.25l-1.417,4.417l-1.833,1.083l-3.917,2.5l-3.5,0.417h-2l-0.5-0.833l0.833-0.583c0,0,0.25-0.583,0.25-0.833s0.333-1.917,0.333-1.917l-0.333-2.333L139,123.666l-1.583-2v-3.917l0.75-4.333l0.583-2.917l1.417-4.083l1.39-5.417l2.193-2.583l1.667-2.417l0.875-0.667H146.917z"
          fill={getFill('N')}
          stroke={getStroke('N')}
          strokeWidth={getStrokeWidth('N')}
        />
        
        {/* Kaafu / Malé - Capital */}
        <Polygon
          points="141.557,135.749 142,135.083 144,133.916 145.417,132.833 147,132.333 149.917,130.833 152.417,129.999 154.75,130.416 156.667,132.499 158.583,134.499 161.25,137.166 162.25,139.833 160.5,141.583 156.084,146.832 153.417,148.999 148.751,152.499 145.417,153.582 142.751,152.999 140.417,152.499 138.834,150.332 138.417,148.832 137.417,147.249 138.001,145.332 138.751,143.499 139.251,141.791 139.417,139.332 140.251,137.832"
          fill={getFill('K')}
          stroke={getStroke('K')}
          strokeWidth={getStrokeWidth('K')}
        />
        
        {/* Alif Alif */}
        <Polygon
          points="181.5,117.915 181.637,118.179 182.917,120.665 184.834,121.999 187.334,123.665 189.5,126.165 191.834,129.582 190.917,134.082 187.25,136.332 184.5,137.165 181.5,136.082 180.667,133.749 179.417,131.999 176.417,130.749 173.25,130.415 171.167,129.582 171.5,126.915 172.75,123.082 174.917,121.665 176.25,120.165 178.667,118.915 180.168,117.915 181.5,117.582"
          fill={getFill('AA')}
          stroke={getStroke('AA')}
          strokeWidth={getStrokeWidth('AA')}
        />
        
        {/* Vaavu small */}
        <Polygon
          points="178.084,154.665 180.168,155.082 179.75,156.832 178.084,156.832 178.084,155.165"
          fill={getFill('V')}
          stroke={getStroke('V')}
          strokeWidth={getStrokeWidth('V')}
        />
        
        {/* Small central island */}
        <Polygon
          points="150.75,161.332 149.833,162.332 147.417,164.166 144.5,165.166 142.083,164.666 140.917,163.249 140.917,161.749 141.917,160.666 143.583,160.666 145.417,160.666 147.667,160.666 149.5,160.666 150.333,161.082"
          fill={ISLAND_FILL}
          stroke={ISLAND_STROKE}
          strokeWidth={ISLAND_STROKE_WIDTH}
        />
        
        {/* Lhaviyani */}
        <Polygon
          points="175,167.332 174.334,168.832 175.667,170.165 177.084,170.165 179.584,170.165 181.5,170.165 181.5,168.249 179.5,167.332 177.25,166.915"
          fill={getFill('Lh')}
          stroke={getStroke('Lh')}
          strokeWidth={getStrokeWidth('Lh')}
        />
        
        {/* Alif Dhaalu */}
        <Polygon
          points="180.083,171.664 181.916,172.664 184.416,174.414 186.75,176.831 188.166,179.914 190,181.831 193.333,184.164 195.333,186.414 195.333,189.748 193.333,191.831 190,194.331 187.708,196.164 186,198.998 185.25,203.498 183.833,205.998 181.916,206.331 178.666,206.331 176.583,206.331 175.5,204.581 172.833,202.331 172.083,200.914 172.083,197.748 172.083,194.914 172.083,190.998 172.75,187.498 172.833,185.248 173,182.748 173.166,181.248 174.334,179.081 175.166,178.248 176.833,174.664 179.25,171.664"
          fill={getFill('ADh')}
          stroke={getStroke('ADh')}
          strokeWidth={getStrokeWidth('ADh')}
        />
        
        {/* Meemu */}
        <Polygon
          points="183.333,209.081 184.416,212.331 184.416,214.914 182.666,222.748 180.666,225.914 178.083,228.998 175.5,228.998 173.333,225.914 173.333,222.248 173.666,215.164 174.25,211.664 176,210.748 176.916,209.081 180.083,208.581 181.333,208.581"
          fill={getFill('M')}
          stroke={getStroke('M')}
          strokeWidth={getStrokeWidth('M')}
        />
        
        {/* Small island */}
        <Polyline
          points="148.166,196.081 150.333,196.081 151.833,197.581 151.083,199.998 149,200.998 147.083,199.831 146.583,197.664 147.083,196.414 148.166,195.664"
          fill={ISLAND_FILL}
          stroke={ISLAND_STROKE}
          strokeWidth={ISLAND_STROKE_WIDTH}
        />
        
        {/* Faafu large */}
        <Polygon
          points="138.583,198.831 140.333,200.581 142.5,202.998 144.75,206.331 146.583,210.415 146.917,214.081 146.917,217.748 146.917,221.415 146.917,223.581 147.5,226.165 148.25,228.998 148.25,232.081 148.25,237.998 146.667,246.248 144.333,248.998 141.583,251.331 139,250.998 134.917,250.331 132.667,249.165 132.083,244.498 132.083,242.415 130.167,233.248 130.583,224.748 131.5,215.415 131.667,208.581 132.25,206.331 134,200.414 135.75,199.581"
          fill={getFill('F')}
          stroke={getStroke('F')}
          strokeWidth={getStrokeWidth('F')}
        />
        
        {/* Dhaalu */}
        <Polygon
          points="178.875,236.664 181.834,239.164 182.668,242.914 183.918,247.247 185.918,250.664 188.501,252.164 191.084,251.664 193.001,250.581 196.001,249.164 197.668,250.081 199.584,252.831 199.001,256.247 196.418,257.664 193.334,258.664 190.334,257.914 186.334,258.664 184.416,259.164 183.334,260.747 180.418,261.414 177.584,259.914 176.084,257.497 173.751,254.081 170.668,253.081 168.751,252.581 167.584,251.247 167.584,248.414 168.834,246.914 169.834,244.081 172.834,239.914 174.751,238.081 176.918,237.497 178.584,236.664"
          fill={getFill('Dh')}
          stroke={getStroke('Dh')}
          strokeWidth={getStrokeWidth('Dh')}
        />
        
        {/* Small island */}
        <Polygon
          points="177.834,263.164 179.751,263.664 179.751,265.747 177.168,266.497 175.584,265.914 175.584,264.247 176.918,263.164"
          fill={ISLAND_FILL}
          stroke={ISLAND_STROKE}
          strokeWidth={ISLAND_STROKE_WIDTH}
        />
        
        {/* Central southern */}
        <Polygon
          points="173.835,270.048 173.835,274.496 173.835,279.912 173.835,283.662 173.418,285.912 172.834,291.746 172.834,296.412 175.584,297.412 179.751,294.746 183.168,291.246 186.502,290.079 187.002,288.412 189.418,285.496 190.584,280.246 191.584,277.496 192.834,274.496 191.084,273.912 189.252,272.829 184.752,272.996 180.834,270.048 176.168,270.048 174.418,270.048"
          fill={ISLAND_FILL}
          stroke={ISLAND_STROKE}
          strokeWidth={ISLAND_STROKE_WIDTH}
        />
        
        {/* Western southern */}
        <Path
          d="M144.671,259.83l3.083,1.584l2.167,1.75l2.417,3.333v2.249l-1.083,5.667l-3.004,1.916l-3.996,1.084l-2.667-1.334c0,0-1.333-1.499-1.333-1.916s0-3.167,0-3.167l-1.833-3.334l-0.75-2.832l0.917-2.167l2.083-1.833l2.333-0.417L144.671,259.83z"
          fill={ISLAND_FILL}
          stroke={ISLAND_STROKE}
          strokeWidth={ISLAND_STROKE_WIDTH}
        />
        
        {/* Thaa */}
        <Polygon
          points="149.254,280.996 149.657,281.137 150.92,281.579 151.754,284.163 151.754,285.163 151.754,290.496 151.254,296.579 149.254,298.913 145.754,301.663 141.004,302.996 139.92,299.663 138.254,295.829 138.254,291.413 138.254,286.829 139.504,285.246 141.587,281.663 145.004,280.579 147.67,280.579"
          fill={getFill('Th')}
          stroke={getStroke('Th')}
          strokeWidth={getStrokeWidth('Th')}
        />
        
        {/* Laamu */}
        <Polygon
          points="159.254,309.745 161.42,310.412 163.587,311.662 165.254,312.662 168.42,312.662 171.004,313.829 173.17,316.829 174.67,320.162 172.834,323.079 169.087,326.162 164.587,329.162 158.42,332.245 153.816,334.329 150.17,333.995 146.67,332.162 145.42,328.579 144.254,323.995 143.92,320.579 143.004,318.579 143.004,314.829 143.92,313.912 146.254,311.829 149.92,311.245 153.42,310.162 156.67,309.162"
          fill={getFill('L')}
          stroke={getStroke('L')}
          strokeWidth={getStrokeWidth('L')}
        />
        
        {/* Southern large */}
        <Polygon
          points="187.671,336.246 184.588,338.913 184.588,342.996 184.588,346.829 184.588,351.163 181.838,356.496 178.004,357.829 175.004,358.246 172.004,359.329 169.088,358.829 167.588,356.496 165.754,355.746 165.338,352.829 165.338,350.329 166.754,348.329 169.671,346.079 173.254,344.246 178.838,340.329 182.004,338.746 184.921,337.329 185.921,336.246 187.004,335.829 187.671,335.829"
          fill={ISLAND_FILL}
          stroke={ISLAND_STROKE}
          strokeWidth={ISLAND_STROKE_WIDTH}
        />
        
        {/* Gaafu Alif / Large southern */}
        <Path
          d="M161.754,417.914l0.5,2.083l1.334,1.667l1.75,2.25l-1,3.083l-3.917,3.75l-3.75,1.584l-2.854,2.916l-2.979,2.083l-1.583,3.25v3.417l0.583,3.5l1.25,3.583l1.333,3.5l2.917,2.583l2.333,2.417l3.583,1.083h3.167l3.667-1l1.833-2.083l3.167-0.917l2.416-0.5l2.667-0.083l4-3.5c0,0,3.5-2.583,3.5-3s2.167-4.5,2.167-4.5s-0.666-1.167-0.834-1.75c-0.166-0.583-1.833-3.165-1.833-4.041s-3.167-4.959-3.167-4.959l-2.75-2.167l-0.25-3.333l-0.333-4.583l-2.25-5.582l-2.083-3.5c0,0-0.25,0.084-0.584,0c-0.333-0.084-3.25,0-3.25,0l-4.083-0.75l-1.5,0.583l-0.917,0.833l-1.916,1.25L161.754,417.914z"
          fill={getFill('GA')}
          stroke={getStroke('GA')}
          strokeWidth={getStrokeWidth('GA')}
        />
        
        {/* Gnaviyani */}
        <Polygon
          points="177.087,489.247 178.67,491.664 178.67,494.497 177.879,495.997 177.087,494.747 176.754,492.997 176.254,491.58 175.837,490.747 175.337,489.247 176.42,488.747"
          fill={getFill('Gn')}
          stroke={getStroke('Gn')}
          strokeWidth={getStrokeWidth('Gn')}
        />
        
        {/* Seenu / Addu - southernmost */}
        <Path
          d="M165.087,510.081v2.416l-0.667,1.667l-1.833,2.417l-1.833,1.333h-2c0,0-0.583-1.25-0.833-1.25s-2.083-1.583-2.083-1.583l-0.917-1.917v-3.083h1.333l0.583,0.5l1.25,0.333h1.083l2.5-0.833l1.417-0.584h2l0.333,0.417L165.087,510.081z"
          fill={getFill('S')}
          stroke={getStroke('S')}
          strokeWidth={getStrokeWidth('S')}
        />
      </Svg>

      {/* Pulse dots for check-ins */}
      {dotPositions.map((checkin) => {
        // Convert SVG coordinates to pixel position
        const xPos = (checkin.x / SVG_WIDTH) * svgDisplayWidth;
        const yPos = (checkin.y / SVG_HEIGHT) * svgDisplayHeight;
        
        // Calculate offset from center
        const offsetX = (SCREEN_WIDTH - svgDisplayWidth) / 2;
        const offsetY = (SCREEN_HEIGHT - svgDisplayHeight) / 2;
        
        return (
          <View
            key={checkin.id}
            style={{
              position: 'absolute',
              left: offsetX + xPos - 7,
              top: offsetY + yPos - 7,
            }}
          >
            <PulseDot mood={checkin.mood} size={14} />
          </View>
        );
      })}
    </View>
  );
}
