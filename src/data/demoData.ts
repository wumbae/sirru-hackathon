type CheckinMood = 'sunny' | 'stormy';

export type CheckinPin = {
  id: string;
  atoll: string;
  mood: CheckinMood;
  x: number;
  y: number;
};

export const DEMO_CHECKINS: CheckinPin[] = [
  { id: '1', atoll: 'K', mood: 'stormy', x: 16, y: 19 },
  { id: '2', atoll: 'AA', mood: 'stormy', x: 22, y: 28 },
  { id: '3', atoll: 'HDh', mood: 'stormy', x: 28, y: 37 },
  { id: '4', atoll: 'R', mood: 'stormy', x: 34, y: 46 },
  { id: '5', atoll: 'F', mood: 'sunny', x: 40, y: 55 },
  { id: '6', atoll: 'M', mood: 'stormy', x: 46, y: 64 },
  { id: '7', atoll: 'V', mood: 'sunny', x: 52, y: 73 },
  { id: '8', atoll: 'B', mood: 'stormy', x: 58, y: 82 },
  { id: '9', atoll: 'Dh', mood: 'stormy', x: 64, y: 11 },
  { id: '10', atoll: 'Sh', mood: 'sunny', x: 70, y: 20 },
  { id: '11', atoll: 'Lh', mood: 'stormy', x: 76, y: 29 },
  { id: '12', atoll: 'GA', mood: 'stormy', x: 82, y: 38 },
  { id: '13', atoll: 'GDh', mood: 'stormy', x: 88, y: 47 },
  { id: '14', atoll: 'Gn', mood: 'sunny', x: 14, y: 56 },
  { id: '15', atoll: 'S', mood: 'sunny', x: 20, y: 65 },
  { id: '16', atoll: 'ADh', mood: 'stormy', x: 26, y: 74 },
  { id: '17', atoll: 'N', mood: 'stormy', x: 32, y: 83 },
  { id: '18', atoll: 'L', mood: 'stormy', x: 38, y: 12 },
  { id: '19', atoll: 'Th', mood: 'stormy', x: 44, y: 21 },
  { id: '20', atoll: 'K', mood: 'sunny', x: 50, y: 30 },
  { id: '21', atoll: 'AA', mood: 'sunny', x: 56, y: 39 },
  { id: '22', atoll: 'HDh', mood: 'stormy', x: 62, y: 48 },
  { id: '23', atoll: 'R', mood: 'stormy', x: 68, y: 57 },
  { id: '24', atoll: 'F', mood: 'stormy', x: 74, y: 66 },
  { id: '25', atoll: 'M', mood: 'sunny', x: 80, y: 75 },
  { id: '26', atoll: 'V', mood: 'stormy', x: 86, y: 84 },
  { id: '27', atoll: 'B', mood: 'stormy', x: 12, y: 13 },
  { id: '28', atoll: 'Dh', mood: 'sunny', x: 18, y: 22 },
  { id: '29', atoll: 'Sh', mood: 'stormy', x: 24, y: 31 },
  { id: '30', atoll: 'Lh', mood: 'sunny', x: 30, y: 40 },
  { id: '31', atoll: 'GA', mood: 'stormy', x: 36, y: 49 },
  { id: '32', atoll: 'GDh', mood: 'stormy', x: 42, y: 58 },
  { id: '33', atoll: 'Gn', mood: 'stormy', x: 48, y: 67 },
  { id: '34', atoll: 'S', mood: 'stormy', x: 54, y: 76 },
  { id: '35', atoll: 'ADh', mood: 'sunny', x: 60, y: 85 },
  { id: '36', atoll: 'N', mood: 'stormy', x: 66, y: 14 },
  { id: '37', atoll: 'L', mood: 'stormy', x: 72, y: 23 },
  { id: '38', atoll: 'Th', mood: 'stormy', x: 78, y: 32 },
  { id: '39', atoll: 'K', mood: 'stormy', x: 84, y: 41 },
  { id: '40', atoll: 'AA', mood: 'sunny', x: 10, y: 50 },
  { id: '41', atoll: 'HDh', mood: 'stormy', x: 16, y: 59 },
  { id: '42', atoll: 'R', mood: 'sunny', x: 22, y: 68 },
  { id: '43', atoll: 'F', mood: 'stormy', x: 28, y: 77 },
  { id: '44', atoll: 'M', mood: 'stormy', x: 34, y: 86 },
  { id: '45', atoll: 'V', mood: 'sunny', x: 40, y: 15 },
  { id: '46', atoll: 'B', mood: 'stormy', x: 46, y: 24 },
  { id: '47', atoll: 'Dh', mood: 'stormy', x: 52, y: 33 },
  { id: '48', atoll: 'Sh', mood: 'stormy', x: 58, y: 42 },
  { id: '49', atoll: 'Lh', mood: 'sunny', x: 64, y: 51 },
  { id: '50', atoll: 'GA', mood: 'sunny', x: 70, y: 60 },
];

export const DEMO_STATS = {
  total: 47,
  sunny: 12,
  stormy: 35,
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
  { id: '2', creature: 'turtle', content: "can't sleep again", delay: 3000 },
  { id: '3', creature: 'shark', content: "same here. brain won't shut up", delay: 5000 },
  {
    id: '4',
    creature: 'koamas',
    content: "Those nights are the hardest. You're not alone — clearly others are up too.",
    delay: 8000,
  },
  { id: '5', creature: 'octopus', content: 'it helps knowing others feel it too', delay: 11000 },
];

export const ANCHOR_COUNT = 2847;

