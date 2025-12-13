# 🌊 Sirru - The Secret

> *A safe space for Maldivian minds*

**Team Name:** Rookie Arc  
**Project:** Sirru - Anonymous Mental Wellness App for Maldivian Youth

---

## 👥 Team Members

| Name |
|------|
| Saroof |
| Nabhan |
| Shadhan |
| Zayan |
| Ayaan |

---

## 📱 About Sirru

**Sirru** (Dhivehi: "The Secret") is an anonymous mental wellness app designed specifically for Maldivian youth. The app provides a judgment-free space where young people can:

- 🌤️ **Check in anonymously** - Share how you're feeling without anyone knowing it's you
- 🗺️ **See the national pulse** - View real-time emotional weather across all 20 atolls
- 🐙 **Talk to Koamas** - Chat with an empathetic AI companion
- 🐢 **Join the Faru** - Connect with others in anonymous group chat
- 🌬️ **Breathe** - Guided box breathing exercises for calm

---

## 🛠️ Tech Stack & Dependencies

### Core Framework
- **React Native** - Cross-platform mobile development
- **Expo** - Development and build tooling
- **TypeScript** - Type-safe JavaScript

### Styling
- **NativeWind** - Tailwind CSS for React Native
- **Tailwind CSS** - Utility-first CSS framework

### Navigation
- **@react-navigation/native** - Navigation container
- **@react-navigation/native-stack** - Stack navigator
- **@react-navigation/bottom-tabs** - Bottom tab navigator

### UI & Animation
- **react-native-reanimated** - Smooth animations
- **react-native-svg** - SVG rendering for map and icons
- **react-native-safe-area-context** - Safe area handling
- **react-native-screens** - Native screen optimization

### Storage
- **@react-native-async-storage/async-storage** - Local data persistence

---

## 🚀 Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Expo Go app on your phone (for testing)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/wumbae/sirru-hackathon.git

# 2. Navigate to project directory
cd sirru-hackathon

# 3. Install dependencies
npm install

# 4. Start the development server
npx expo start
```

### Running the App

After running `npx expo start`, you'll see a QR code in your terminal:

- **iOS:** Scan with Camera app → Opens in Expo Go
- **Android:** Scan with Expo Go app directly

---

## 📂 Project Structure

```
sirru/
├── App.tsx                 # Root component
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── MaldivesMap.tsx    # SVG map of Maldives
│   │   ├── PulseDot.tsx       # Animated mood dots
│   │   ├── Aava.tsx           # Hourly mood chart
│   │   └── ...
│   ├── constants/          # App constants
│   │   └── index.ts           # Colors, atolls, creatures
│   ├── data/               # Demo data
│   │   └── demoData.ts        # Hardcoded data for prototype
│   ├── navigation/         # Navigation config
│   │   ├── AppNavigator.tsx   # Main navigator
│   │   └── types.ts           # TypeScript types
│   └── screens/            # All app screens
│       ├── WelcomeScreen.tsx
│       ├── HomeScreen.tsx
│       ├── BreathingScreen.tsx
│       ├── ChatScreen.tsx
│       ├── KoamasScreen.tsx
│       └── ...
├── tailwind.config.js      # Tailwind configuration
├── babel.config.js         # Babel configuration
└── package.json            # Dependencies
```

---

## 🎯 Demo Flow

### Recommended Path (3 minutes)

1. **Onboarding** → Pick nickname → Select atoll
2. **Check in as Stormy** ⛈️ → See support options
3. **Talk to Koamas** 🐙 → Type a message
4. **Breathing Exercise** 🌬️ → Complete 3 cycles
5. **Join the Faru** 🐢 → Watch community chat




