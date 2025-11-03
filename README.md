# Venn - Take Home Test

A production-ready React Native onboarding form built with TypeScript, featuring comprehensive validation, async API integration, and testing.

## Demo

### iOS
https://github.com/user-attachments/assets/7c02ceb8-ffc8-4c6a-a5d9-d7e7496fe576

### Android
https://github.com/user-attachments/assets/0ef47fbd-1b13-4c10-a32a-1e16553bbb4b

## Features

- Form validation with real-time error messages
- Async corporation number validation via API
- Full TypeScript implementation with Zod schema validation
- Atomic design component architecture
- Integration tests with React Native Testing Library
- ESLint for code quality

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- iOS Simulator or Android Studio
- Expo CLI

### Installation

```bash
npm install
```

For iOS development:
```bash
cd ios && pod install && cd ..
```

### Running the Application

```bash
npm start
npm run ios
npm run android
```

## Testing

```bash
npm test
npm run test:watch
npm run test:coverage
```

## Code Quality

```bash
npm run lint
npm run lint:fix
```

## Project Structure

```
src/
├── components/
│   ├── atoms/
│   │   ├── Button.tsx
│   │   ├── HelperText.tsx
│   │   └── Label.tsx
│   ├── molecules/
│   │   └── TextField.tsx
│   ├── organisms/
│   │   ├── __tests__/
│   │   │   └── OnboardingForm.test.tsx
│   │   └── OnboardingForm.tsx
│   └── templates/
│       └── FormTemplate.tsx
├── constants/
│   ├── colors.ts
│   ├── spacing.ts
│   └── typography.ts
├── hooks/
│   ├── __tests__/
│   │   └── useCorpNumberCheck.test.tsx
│   └── useCorpNumberCheck.ts
├── screens/
│   ├── __tests__/
│   │   └── OnboardingScreen.test.tsx
│   └── OnboardingScreen.tsx
└── utils/
    └── onboarding/
        ├── api.ts
        └── schema.ts
```

## Architecture

The project follows atomic design principles with components organized from simple to complex:

- Atoms: Basic UI elements (Button, Label, HelperText)
- Molecules: Combinations of atoms (TextField)
- Organisms: Complex UI sections (OnboardingForm)
- Templates: Page layouts (FormTemplate)
- Screens: Complete pages (OnboardingScreen)

Design tokens are centralized in `src/constants/` for colors, spacing, and typography.

## Form Validation Rules

- **First Name & Last Name**: Required, max 50 characters
- **Phone Number**: Required, must start with `+1` followed by 10 digits (e.g., `+14165551234`)
- **Corporation Number**: Required, exactly 9 digits, validated asynchronously via API

Valid test corporation numbers: `826417395`, `158739264`, `123456789`, `591863427`, `312574689`, `287965143`, `265398741`, `762354918`, `468721395`, `624719583`

## API Integration

**Corporation Number Validation**
- GET `https://fe-hometask-api.qa.vault.tryvault.com/corporation-number/{number}`
- Response: `{ "corporationNumber": "123456789", "valid": true }`

**Profile Submission**
- POST `https://fe-hometask-api.qa.vault.tryvault.com/profile-details`
- Payload: `{ "firstName": "Jane", "lastName": "Doe", "phone": "+14165551234", "corporationNumber": "826417395" }`

## Technologies

- React Native (0.81.5)
- Expo (~54.0.20)
- TypeScript (~5.9.2)
- React Hook Form (^7.65.0)
- Zod (^3.25.76)
- React Native Testing Library (^12.5.1)
- Jest & ESLint

