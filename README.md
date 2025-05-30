# Ryt Transfer - React Native Payment Transfer App

A modern and secure payment transfer application built with React Native, TypeScript, and Expo.

## Features

- 💰 Easy money transfers with real-time balance updates
- 👥 Recipient management with recent transfers list
- 🔐 Biometric authentication (Face ID/Touch ID)
- 🎨 Modern UI with smooth animations
- 📱 Cross-platform (iOS & Android)
- 🔄 Simulated API integration
- 🧪 Unit tests included

## Tech Stack

- React Native with Expo
- TypeScript
- Redux Toolkit for state management
- React Navigation for routing
- React Native Biometrics
- React Native Elements UI library
- Jest & React Native Testing Library

## Project Structure

```
src/
  ├── components/    # Reusable UI components
  ├── screens/      # Main application screens
  ├── services/     # API and biometric services
  ├── store/        # Redux store and slices
  ├── types/        # TypeScript interfaces
  └── utils/        # Helper functions
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator (for Mac) or Android Emulator

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

3. Start the development server:
   ```bash
   npm start
   ```

4. Run on iOS or Android:
   ```bash
   npm run ios
   # or
   npm run android
   ```

## Design Decisions

### State Management
- Using Redux Toolkit for its simplified setup and built-in immutability helpers
- Centralized store for user data, transactions, and app state

### Authentication
- Biometric authentication for secure transfers
- Fallback to PIN/passcode when biometrics unavailable

### Performance
- Optimized list rendering with React.memo and PureComponent
- Debounced search inputs
- Lazy loading for better initial load time

### UI/UX
- Consistent spacing and typography system
- Smooth animations for better user experience
- Clear error messages and loading states
- Accessibility considerations

## Future Improvements

1. Add offline support with local storage
2. Implement real API integration
3. Add more payment methods
4. Enhanced recipient management
5. Transaction history with filters
6. Add push notifications
7. Support for multiple currencies
8. Dark mode support

## Testing

Run the test suite:

```bash
npm test
```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License.
