# Sirru - Product Requirements Document
## Mental Wellness App for Maldivian Youth
### Current Implementation State (Hackathon Prototype)

---

## 📱 Overview

**Sirru** (Dhivehi: "The Secret") is an anonymous mental wellness app designed for Maldivian youth. The app provides a safe, judgment-free space for emotional check-ins, peer support, and breathing exercises.

**Target Platform:** iOS & Android (React Native + Expo)  
**Current Status:** Hackathon Prototype (Demo-ready)  
**Data:** All hardcoded for demonstration

---

## 🎨 Design System

### Color Palette
| Name | Hex | Usage |
|------|-----|-------|
| Background | `#121212` | App background |
| Surface | `#1E1E1E` | Cards, modals |
| Surface Light | `#2A2A2A` | Borders, dividers |
| Primary | `#00FFE0` | Cyan accent, CTAs |
| Secondary | `#A855F7` | Purple accent |
| Sunny | `#FFD93D` | Positive mood |
| Stormy | `#6366F1` | Struggling mood |
| Text | `#FFFFFF` | Primary text |
| Text Muted | `#A0A0A0` | Secondary text |

### Visual Style
- Dark theme (Discord/Spotify aesthetic)
- Glowing accents on interactive elements
- Rounded corners (16-24px radius)
- Custom SVG icons for navigation

---

## 🗺️ App Architecture

### Tech Stack
- **Framework:** React Native + Expo
- **Language:** TypeScript
- **Styling:** NativeWind (Tailwind CSS)
- **Navigation:** React Navigation (Stack + Bottom Tabs)
- **Animations:** React Native Animated API
- **Icons:** Custom SVG components

### Folder Structure
```
src/
├── components/       # Reusable UI components
├── constants/        # Colors, atolls, creatures, crisis lines
├── data/            # Demo data (checkins, stats, responses)
├── navigation/      # Navigator configurations
└── screens/         # All app screens
```

---

## 📲 Screens & Features

### 1. Onboarding Flow

#### 1.1 Welcome Screen (`WelcomeScreen.tsx`)
**Status:** ✅ Complete

| Element | Description |
|---------|-------------|
| Logo | "SIRRU" with cyan glow effect |
| Subtitle | "The Secret" |
| Tagline | "A safe space for Maldivian minds" |
| CTA | "Get Started" button → Nickname |

#### 1.2 Nickname Screen (`NicknameScreen.tsx`)
**Status:** ✅ Complete

| Element | Description |
|---------|-------------|
| Header | Back arrow, "Pick a nickname" |
| Input | Text field with cyan focus border |
| Validation | Minimum 2 characters required |
| CTA | "Next" button → Atoll Selection |

#### 1.3 Atoll Selection Screen (`AtollScreen.tsx`)
**Status:** ✅ Complete

| Element | Description |
|---------|-------------|
| Welcome | Personalized with nickname |
| List | All 20 Maldivian atolls (scrollable) |
| Selection | Highlighted with cyan border |
| CTA | "Finish onboarding" → Main App |

**Atolls Available:**
- HA, HDh, Sh, N, R, B, Lh, K (Malé), AA, ADh, V, M, F, Dh, Th, L, GA, GDh, Gn, S

---

### 2. Main App (Tab Navigation)

#### Tab Bar
**Status:** ✅ Complete

| Tab | Icon | Label | Screen |
|-----|------|-------|--------|
| 1 | Wave SVG | Pulse | HomeScreen |
| 2 | Circles SVG | Breathe | BreathingScreen |
| 3 | Chat bubble SVG | Chat | ChatScreen (Faru) |

Custom SVG icons with:
- Cyan highlight when active
- Muted gray when inactive
- Labels below icons

---

### 3. Home Screen / Pulse (`HomeScreen.tsx`)
**Status:** ✅ Complete

The main dashboard showing real-time emotional weather across the Maldives.

#### 3.1 Header
| Element | Position | Description |
|---------|----------|-------------|
| Logo | Top-left | "SIRRU" with glow |
| Insights Button | Top-right | "📊 Insights" - opens modal |
| Atoll Badge | Top-right | Shows user's atoll (e.g., "Kaafu (Malé)") |

#### 3.2 Maldives Map (`MaldivesMap.tsx`)
**Status:** ✅ Complete

- **Full-screen background** with dark ocean (`#050a12`)
- **Accurate SVG paths** from official Maldives map
- **All 20 atolls** rendered with proper geography
- **User's atoll highlighted** with cyan glow
- **Pulse dots** showing anonymous check-ins:
  - Yellow (sunny) = feeling okay
  - Purple (stormy) = struggling
- **Animated dots** with subtle pulsing effect

#### 3.3 UI Overlays
| Element | Position | Description |
|---------|----------|-------------|
| Legend | Bottom-left | Sunny/Stormy indicators |
| Stats Pill | Bottom-right | "X tonight • ●Y ●Z" |
| Check-in Button | Bottom-center | "How's your weather?" |

#### 3.4 Check-in Modal (`CheckinModal.tsx`)
**Status:** ✅ Complete

**Flow:**
1. User taps "How's your weather?"
2. Modal slides up with two options:
   - ☀️ **Sunny** - "Feeling okay"
   - ⛈️ **Stormy** - "Struggling tonight"
3. Selected option glows with corresponding color
4. "Check in as [mood]" button submits
5. Success animation shows
6. **If Stormy:** Triggers Support Options Modal

#### 3.5 Support Options Modal (`SupportOptionsModal.tsx`)
**Status:** ✅ Complete (Navigation partially working)

Shown after a stormy check-in:

| Option | Icon | Description | Action |
|--------|------|-------------|--------|
| Talk to Koamas | 💬 | "A friend who listens" | → KoamasScreen* |
| Join the Faru | 🐢 | "Connect with others" | → ChatScreen |
| Breathing Exercise | 🌬️ | "1 minute to calm" | → BreathingScreen |
| Just check in | ✕ | Skip support | Close modal |

*Note: KoamasScreen navigation needs wiring

#### 3.6 Insights Modal
**Status:** ✅ Complete

Accessed via 📊 button or stats pill:

| Section | Content |
|---------|---------|
| Header | "Tonight's Insights" |
| Stats Cards | Total Anchors, Sunny count, Stormy count |
| Aava Chart | Hourly mood visualization (bar chart) |

---

### 4. Breathing Screen (`BreathingScreen.tsx`)
**Status:** ✅ Complete & Functional

**Box Breathing Exercise (4-4-4-4 Technique)**

#### Animation Cycle
| Phase | Duration | Circle | Color |
|-------|----------|--------|-------|
| Inhale | 4 sec | Expands | Cyan |
| Hold | 4 sec | Static (expanded) | Yellow |
| Exhale | 4 sec | Contracts | Purple |
| Hold | 4 sec | Static (contracted) | Yellow |

#### UI Elements
| Element | Description |
|---------|-------------|
| Header | "Box Breathing" + subtitle |
| Breathing Circle | Animated expanding/contracting with glow |
| Countdown | Large number (4-3-2-1) |
| Phase Label | "Inhale" / "Hold" / "Exhale" |
| Phase Dots | 4 dots showing progress through cycle |
| Controls | Start/Stop/Reset buttons |
| Stats | Cycles completed + Duration (M:SS) |

#### Functionality
- ✅ Start breathing exercise
- ✅ Stop mid-exercise
- ✅ Reset stats
- ✅ Continue from pause
- ✅ Cycle counting
- ✅ Duration tracking
- ✅ Smooth animations

---

### 5. Chat Screen / Faru (`ChatScreen.tsx`)
**Status:** ⚠️ Static Demo

Anonymous group chat for peer support.

#### Header
| Element | Description |
|---------|-------------|
| Icon | 🐚 Faru |
| Status | "12 in the reef tonight" |

#### Demo Messages (Hardcoded)
| Creature | Message |
|----------|---------|
| 🐙 Koamas | "Hey everyone. Safe space here..." |
| 🐢 Turtle | "can't sleep again" |
| 🦈 Shark | "same here. brain won't shut up" |
| 🐙 Koamas | (typing indicator) |

#### Input Area
- Text input placeholder: "Share how you're feeling..."
- Send button
- Footer: "Messages are anonymous and disappear at sunrise 🌅"

---

### 6. Koamas Screen (`KoamasScreen.tsx`)
**Status:** ✅ Complete but **not accessible from navigation**

1:1 AI chat companion for emotional support.

#### Features
| Feature | Description |
|---------|-------------|
| Welcome Message | Personalized greeting from Koamas |
| Quick Prompts | "can't sleep", "feeling alone", "stressed", "anxious" |
| Keyword Matching | AI responds based on keywords in user message |
| Typing Indicator | Shows while "thinking" |
| Crisis Line Notice | Always visible at bottom |

#### Response Keywords
| Keyword | Sample Response |
|---------|-----------------|
| "can't sleep" | "Those nights are the worst. Mind racing?" |
| "overwhelmed" | "That sounds heavy. What's weighing on you?" |
| "alone" | "That loneliness hits different. I'm here." |
| "hurt myself" | Crisis resources provided |
| (default) | "I hear you. Want to tell me more?" |

---

### 7. Additional Screens (Created but not wired)

#### FaruScreen (`FaruScreen.tsx`)
**Status:** ⚠️ Created, not integrated

Alternative implementation of group chat with scripted autoplay.

#### BreathingCompleteScreen (`BreathingCompleteScreen.tsx`)
**Status:** ⚠️ Created, not integrated

Post-breathing celebration screen with session stats.

---

## 📊 Demo Data

### Check-in Stats
```typescript
DEMO_STATS = {
  total: 10,
  sunny: 3,
  stormy: 7,
}
```

### Aava Chart Data (Hourly Mood)
| Hour | Stormy % |
|------|----------|
| 12am | 65% |
| 6am | 25% |
| 12pm | 35% |
| 6pm | 50% |
| 9pm | 70% |
| 10pm | 80% |
| 11pm | 92% |

### Anchor Count
Total registered users: **2,847**

---

## 🚨 Crisis Resources

Always accessible in the app:

| Service | Number | Hours |
|---------|--------|-------|
| Mental Health Hotline | **1425** | 24/7 |
| Thibaa | 722 1212 | 9AM-10PM |
| Emergency | 119 | 24/7 |

---

## ⚠️ Known Gaps / TODO

### High Priority
1. [ ] Wire KoamasScreen to navigation (accessible from Support Modal)
2. [ ] Connect BreathingCompleteScreen after exercise ends
3. [ ] Make ChatScreen interactive (not just static)

### Medium Priority
4. [ ] Add smooth transitions between screens
5. [ ] Haptic feedback on check-in
6. [ ] Sound effects for breathing exercise

### Low Priority (Post-Hackathon)
7. [ ] Real backend integration
8. [ ] User authentication
9. [ ] Push notifications
10. [ ] Analytics dashboard

---

## 🔐 Privacy Principles

1. **Anonymous by default** - No real names required
2. **No data persistence** - Demo uses hardcoded data
3. **Messages disappear** - "at sunrise" (metaphor for privacy)
4. **Local atoll only** - Users grouped by location for relevance

---

## 📱 Screens Summary

| # | Screen | Status | Interactive |
|---|--------|--------|-------------|
| 1 | WelcomeScreen | ✅ | Yes |
| 2 | NicknameScreen | ✅ | Yes |
| 3 | AtollScreen | ✅ | Yes |
| 4 | HomeScreen | ✅ | Yes |
| 5 | CheckinModal | ✅ | Yes |
| 6 | SupportOptionsModal | ✅ | Partial |
| 7 | InsightsModal | ✅ | Yes |
| 8 | BreathingScreen | ✅ | Yes |
| 9 | ChatScreen (Faru) | ⚠️ | Static |
| 10 | KoamasScreen | ✅ | Yes (not accessible) |

---

## 🎯 Hackathon Demo Flow

**Recommended demo path:**

1. **Onboarding** (30 sec)
   - Welcome → Nickname → Select Atoll

2. **Explore Map** (30 sec)
   - Show pulse dots across Maldives
   - Tap Insights to see Aava chart

3. **Check-in Flow** (45 sec)
   - Tap "How's your weather?"
   - Select Stormy
   - Show Support Options

4. **Breathing Exercise** (1 min)
   - Navigate to Breathe tab
   - Complete 2-3 cycles
   - Show stats

5. **Group Chat** (30 sec)
   - Navigate to Chat tab
   - Show anonymous creatures

**Total Demo Time:** ~3 minutes

---

## 📦 Repository

**GitHub:** https://github.com/wumbae/sirru-hackathon

**Run locally:**
```bash
npm install
npx expo start
```

---

*Last Updated: December 12, 2025*

