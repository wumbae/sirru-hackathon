# Sirru - Product Requirements Document
## Mental Wellness App for Maldivian Youth
### Current Implementation State (Hackathon Prototype)

---

## 📱 Overview

**Sirru** (Dhivehi: "The Secret") is an anonymous mental wellness app designed for Maldivian youth. The app provides a safe, judgment-free space for emotional check-ins, peer support, and breathing exercises.

**Target Platform:** iOS & Android (React Native + Expo)  
**Current Status:** ✅ Hackathon Prototype (Demo-ready)  
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
| Insights Button | Top-right | "📊 Insights" pill button |
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
| Legend | Bottom-left | Sunny/Stormy indicators (vertical) |
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
**Status:** ✅ Complete & Fully Functional

Shown after a stormy check-in:

| Option | Icon | Description | Action |
|--------|------|-------------|--------|
| Talk to Koamas | 💬 | "A friend who listens" | → KoamasScreen ✅ |
| Join the Faru | 🐢 | "Connect with others" | → ChatScreen ✅ |
| Breathing Exercise | 🌬️ | "1 minute to calm" | → BreathingScreen ✅ |
| Just check in | ✕ | Skip support | Close modal |

#### 3.6 Insights Modal
**Status:** ✅ Complete

Accessed via 📊 Insights button:

| Section | Content |
|---------|---------|
| Header | "Tonight's Insights" |
| Stats Cards | Total Anchors, Sunny count, Stormy count |
| Aava Chart | Hourly mood visualization (bar chart) |

---

### 4. Breathing Screen (`BreathingScreen.tsx`)
**Status:** ✅ Complete & Fully Functional

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
- ✅ **Auto-navigates to completion after 3 cycles**

---

### 5. Breathing Complete Screen (`BreathingCompleteScreen.tsx`)
**Status:** ✅ Complete & Wired

Post-breathing celebration screen.

| Element | Description |
|---------|-------------|
| Icon | 🧘 with cyan glow |
| Title | "Well done!" |
| Subtitle | "X cycles completed. Take this calm with you." |
| Stats | Cycles + Duration (from actual session) |
| Quote | Random inspirational quote |
| CTA | "Back to Home" / "Breathe Again" |

---

### 6. Chat Screen / Faru (`ChatScreen.tsx`)
**Status:** ✅ Complete & Dynamic

Anonymous group chat for peer support with **auto-playing messages**.

#### Header
| Element | Description |
|---------|-------------|
| Icon | 🐚 The Faru |
| Status | "X in the reef tonight" (randomized 5-12) |
| Badge | "Safe Space" pill |

#### Auto-Play Script (9 messages)
| Time | Creature | Message |
|------|----------|---------|
| 0s | 🐙 Koamas | "Hey everyone. Safe space here..." |
| 3s | 🐢 Turtle | "can't sleep again 😔" |
| 5.5s | 🦈 Shark | "same here. brain won't shut up" |
| 8.5s | 🐙 Koamas | "Those nights are the hardest..." |
| 12s | 🐙 Octopus | "it helps knowing others feel it too" |
| 15s | 🐢 Turtle | "yeah... thanks for being here 💙" |
| 18.5s | 🐙 Koamas | "That's what the Faru is for..." |
| 22s | 🦈 Shark | "anyone tried the breathing exercise?" |
| 25s | 🐙 Octopus | "the 4-4-4-4 one? gonna try it now" |

#### Features
- ✅ Animated typing indicators (bouncing dots)
- ✅ Message fade-in animations
- ✅ Auto-scroll as messages appear
- ✅ User can type and get a response
- ✅ Welcome banner
- ✅ "Messages disappear at sunrise 🌅" footer

---

### 7. Koamas Screen (`KoamasScreen.tsx`)
**Status:** ✅ Complete & Accessible

1:1 AI chat companion for emotional support.

#### Features
| Feature | Description |
|---------|-------------|
| Welcome Message | Personalized greeting from Koamas |
| Quick Prompts | "can't sleep", "feeling alone", "stressed", "anxious" |
| Keyword Matching | AI responds based on keywords in user message |
| Typing Indicator | Shows while "thinking" (1.5-2.5s delay) |
| Crisis Line Notice | Always visible at bottom |

#### Response Keywords
| Keyword | Sample Response |
|---------|-----------------|
| "can't sleep" | "Those nights are the worst. Mind racing?" |
| "overwhelmed" | "That sounds heavy. What's weighing on you?" |
| "alone" | "That loneliness hits different. I'm here." |
| "hurt myself" | Crisis resources provided |
| (default) | "I hear you. Want to tell me more?" |

#### Access Points
- ✅ From Support Options Modal (after stormy check-in)
- Opens as modal (slide up from bottom)

---

## 📊 Demo Data

### Check-in Stats
```typescript
DEMO_STATS = {
  total: 25,
  sunny: 7,
  stormy: 18,
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

## ✅ All Features Complete

| Feature | Status |
|---------|--------|
| Onboarding (3 screens) | ✅ |
| Home Screen with Map | ✅ |
| Check-in Modal | ✅ |
| Support Options Modal | ✅ |
| Insights Modal | ✅ |
| Breathing Exercise | ✅ |
| Breathing Complete Screen | ✅ |
| Faru Group Chat (auto-play) | ✅ |
| Koamas 1:1 Chat | ✅ |
| Custom Tab Icons | ✅ |

---

## 🔮 Future Enhancements (Post-Hackathon)

### Medium Priority
- [ ] Haptic feedback on check-in
- [ ] Sound effects for breathing exercise
- [ ] Smooth screen transitions

### Low Priority
- [ ] Real backend integration
- [ ] User authentication
- [ ] Push notifications
- [ ] Analytics dashboard

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
| 6 | SupportOptionsModal | ✅ | Yes |
| 7 | InsightsModal | ✅ | Yes |
| 8 | BreathingScreen | ✅ | Yes |
| 9 | BreathingCompleteScreen | ✅ | Yes |
| 10 | ChatScreen (Faru) | ✅ | Yes (auto-play + input) |
| 11 | KoamasScreen | ✅ | Yes |

**Total: 11 screens, all functional**

---

## 🎯 Hackathon Demo Flow

**Recommended demo path:**

### Path 1: Sunny User (2 min)
1. **Onboarding** (30s) → Welcome → Nickname → Atoll
2. **Explore Map** (30s) → See pulse dots, tap Insights
3. **Check in Sunny** (20s) → See success
4. **Faru Chat** (40s) → Watch messages appear

### Path 2: Stormy User (3 min) ⭐ Recommended
1. **Onboarding** (30s) → Welcome → Nickname → Atoll
2. **Check in Stormy** (30s) → See support options
3. **Talk to Koamas** (45s) → Type message, get response
4. **Breathing Exercise** (1.5min) → Complete 3 cycles → See completion screen
5. **Faru Chat** (30s) → Watch community support

**Total Demo Time:** 2-3 minutes

---

## 📦 Repository

**GitHub:** https://github.com/wumbae/sirru-hackathon

**Run locally:**
```bash
npm install
npx expo start
```

**Scan QR code** with Expo Go app to test on device.

---

*Last Updated: December 12, 2025*
*Version: 1.0 (Hackathon Ready)*
