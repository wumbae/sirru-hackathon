type CheckinMood = 'sunny' | 'stormy';

export type CheckinPin = {
  id: string;
  atoll: string;
  mood: CheckinMood;
  x: number;
  y: number;
};

// 25 checkins spread across 5 regions (North, Upper, Central, Lower, South)
export const DEMO_CHECKINS: CheckinPin[] = [
  // North region (HA, HDh, Sh, N) - 4 dots
  { id: '1', atoll: 'HA', mood: 'stormy', x: 0, y: 0 },
  { id: '2', atoll: 'HDh', mood: 'stormy', x: 0, y: 0 },
  { id: '3', atoll: 'Sh', mood: 'sunny', x: 0, y: 0 },
  { id: '4', atoll: 'N', mood: 'stormy', x: 0, y: 0 },
  
  // Upper region (R, B, Lh, K) - 6 dots (more activity near capital)
  { id: '5', atoll: 'K', mood: 'stormy', x: 0, y: 0 },
  { id: '6', atoll: 'K', mood: 'stormy', x: 0, y: 0 },
  { id: '7', atoll: 'K', mood: 'sunny', x: 0, y: 0 },
  { id: '8', atoll: 'B', mood: 'stormy', x: 0, y: 0 },
  { id: '9', atoll: 'Lh', mood: 'stormy', x: 0, y: 0 },
  { id: '10', atoll: 'R', mood: 'sunny', x: 0, y: 0 },
  
  // Central region (AA, ADh, V, M) - 5 dots
  { id: '11', atoll: 'AA', mood: 'stormy', x: 0, y: 0 },
  { id: '12', atoll: 'AA', mood: 'stormy', x: 0, y: 0 },
  { id: '13', atoll: 'ADh', mood: 'sunny', x: 0, y: 0 },
  { id: '14', atoll: 'V', mood: 'stormy', x: 0, y: 0 },
  { id: '15', atoll: 'M', mood: 'stormy', x: 0, y: 0 },
  
  // Lower region (F, Dh, Th, L) - 5 dots
  { id: '16', atoll: 'F', mood: 'stormy', x: 0, y: 0 },
  { id: '17', atoll: 'Dh', mood: 'stormy', x: 0, y: 0 },
  { id: '18', atoll: 'Th', mood: 'sunny', x: 0, y: 0 },
  { id: '19', atoll: 'L', mood: 'stormy', x: 0, y: 0 },
  { id: '20', atoll: 'L', mood: 'sunny', x: 0, y: 0 },
  
  // South region (GA, GDh, Gn, S) - 5 dots
  { id: '21', atoll: 'GA', mood: 'stormy', x: 0, y: 0 },
  { id: '22', atoll: 'GDh', mood: 'stormy', x: 0, y: 0 },
  { id: '23', atoll: 'Gn', mood: 'stormy', x: 0, y: 0 },
  { id: '24', atoll: 'S', mood: 'sunny', x: 0, y: 0 },
  { id: '25', atoll: 'S', mood: 'stormy', x: 0, y: 0 },
];

export const DEMO_STATS = {
  total: 25,
  sunny: 7,
  stormy: 18,
};

export const AAVA_DATA = [
  { hour: 0, label: '12am', stormy: 65 },
  { hour: 6, label: '6am', stormy: 25 },
  { hour: 12, label: '12pm', stormy: 35 },
  { hour: 18, label: '6pm', stormy: 50 },
  { hour: 21, label: '9pm', stormy: 70 },
  { hour: 22, label: '10pm', stormy: 80 },
  { hour: 23, label: '11pm', stormy: 92 },
];

export const KOAMAS_RESPONSES: Record<string, string> = {
  "can't sleep": "Those nights are the worst. Mind racing, or just can't switch off?",
  overwhelmed: "That sounds heavy. What's weighing on you the most right now?",
  alone: "That loneliness hits different. You're not alone right now though — I'm here.",
  expectations: "That's exhausting. Carrying everyone's expectations is really hard.",
  stressed: "I hear you. Stress can feel suffocating sometimes. What's going on?",
  anxious: "Anxiety is rough. Is it about something specific, or just... everything?",
  'hurt myself':
    "I'm really glad you told me. Please reach out to: Mental Health Hotline 1425 (24/7), Thibaa 722 1212, Emergency 119. I'm still here too.",
  default: "I hear you. Want to tell me more about what's going on?",
};

export function getKoamasResponse(input: string): string {
  const normalized = input.toLowerCase();
  for (const [keyword, response] of Object.entries(KOAMAS_RESPONSES)) {
    if (keyword === 'default') {
      continue;
    }
    if (normalized.includes(keyword.toLowerCase())) {
      return response;
    }
  }
  return KOAMAS_RESPONSES.default;
}

export type FaruMessage = {
  id: string;
  creature: string;
  content: string;
  delay: number;
};

export const FARU_SCRIPT: FaruMessage[] = [
  {
    id: '1',
    creature: 'koamas',
    content: "Hey everyone. Safe space here. How's everyone's storm tonight?",
    delay: 0,
  },
  { id: '2', creature: 'turtle', content: "can't sleep again 😔", delay: 3000 },
  { id: '3', creature: 'shark', content: "same here. brain won't shut up", delay: 5500 },
  {
    id: '4',
    creature: 'koamas',
    content: "Those nights are the hardest. You're not alone — clearly others are up too.",
    delay: 8500,
  },
  { id: '5', creature: 'octopus', content: 'it helps knowing others feel it too', delay: 12000 },
  { id: '6', creature: 'turtle', content: "yeah... thanks for being here everyone 💙", delay: 15000 },
  { 
    id: '7', 
    creature: 'koamas', 
    content: "That's what the Faru is for. We're all just floating through this together.", 
    delay: 18500 
  },
  { id: '8', creature: 'shark', content: "anyone tried the breathing exercise? actually helped me yesterday", delay: 22000 },
  { id: '9', creature: 'octopus', content: "the 4-4-4-4 one? gonna try it now", delay: 25000 },
];

export const ANCHOR_COUNT = 2847;

