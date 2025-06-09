# Ryt Transfer - React Native Payment Transfer App

A modern and secure payment transfer application built with React Native, TypeScript, and Expo.

## Features

- 💰 Easy money transfers with real-time balance updates
- 👥 Recipient management with recent transfers list
- 🔐 Biometric authentication (Face ID/Touch ID)
- 🎨 Modern UI with smooth animations
- 📱 Cross-platform (iOS & Android)
- 🔄 Simulated API integration
  - To simulate success/failed network request, go to `src/lib/apiClient.ts` and change the boolean flag `shouldSucceed` to `true/false`

## Tech Stack

- React Native with Expo
- TypeScript
- Redux Toolkit for state management
- React Navigation for routing
- Axios for API requests
- Expo Local Authentication for biometric authentication

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm (v9+) or yarn (v1+)
- Expo CLI (`npm install -g expo-cli`)
- Xcode (for iOS Simulator, macOS only)
- Android Studio (for Android Emulator)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/ryt-transfer.git
   ```

2. Install dependencies:

   ```bash
   cd ryt-transfer
   npm install
   ```

### Running with Expo

1. Start the Expo development server:

   ```bash
   npx expo start
   ```

2. Use the Expo Go app on your device, or run on an emulator/simulator:
   - Press `i` to open in iOS Simulator
   - Press `a` to open in Android Emulator

### Running a Development Build (Recommended)

1. Build the app for development: 

   ```bash
   # Add --device flag to select a specific device
   npx expo run:ios   # for iOS
   npx expo run:android  # for Android
   ```

# Demo Video
[Demo.mp4](Demo.mp4)

# Future Improvements

1. Add offline support with local storage
2. Implement real API integration
3. Show Transaction history with Search and Filters
4. Add push notifications
5. Support for multiple currencies
6. Dark mode support
