# Venn - Onboarding Form

A production-ready React Native onboarding form built with TypeScript, featuring comprehensive validation, async API integration, and automated testing.

## 🎯 Features

- **Form Validation**: Real-time validation with user-friendly error messages
- **Async API Validation**: Corporation number validation via external API
- **Type Safety**: Full TypeScript implementation with Zod schema validation
- **Atomic Design**: Organized component architecture (atoms/molecules/organisms/templates)
- **Testing**: Comprehensive integration tests using React Native Testing Library
- **Code Quality**: ESLint configuration for consistent code standards

## 📋 Requirements Met

- ✅ TypeScript implementation
- ✅ React hooks (including custom hooks)
- ✅ Form validation (Zod + React Hook Form)
- ✅ Async corporation number validation
- ✅ Automated integration tests
- ✅ Atomic design pattern
- ✅ ESLint configuration
- ✅ Expo framework

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- iOS Simulator (for iOS development) or Android Studio (for Android development)
- Expo CLI (optional, included in project)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Venn
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Install iOS dependencies** (macOS only)
   ```bash
   cd ios && pod install && cd ..
   ```

### Running the Application

#### Start the Expo development server
```bash
npm start
```

#### Run on iOS
```bash
npm run ios
```

#### Run on Android
```bash
npm run android
```

#### Run on Web
```bash
npm run web
```

## 🧪 Testing

### Run all tests
```bash
npm test
```

### Run tests in watch mode
```bash
npm run test:watch
```

### Run tests with coverage
```bash
npm run test:coverage
```

## 🔍 Code Quality

### Run ESLint
```bash
npm run lint
```

### Fix ESLint issues automatically
```bash
npm run lint:fix
```

## 📁 Project Structure

```
src/
├── __tests__/                 # Integration tests
│   └── OnboardingScreen.test.tsx
├── components/                # UI components
│   ├── atoms/                 # Basic building blocks
│   │   ├── Button.tsx
│   │   ├── HelperText.tsx
│   │   └── Label.tsx
│   ├── molecules/             # Composite components
│   │   └── TextField.tsx
│   ├── organisms/             # Complex components
│   │   └── OnboardingForm.tsx
│   └── templates/             # Page layouts
│       └── FormTemplate.tsx
├── design/                    # Design tokens
│   ├── colors.ts
│   ├── spacing.ts
│   └── typography.ts
├── domain/                    # Business logic
│   └── onboarding/
│       ├── api.ts            # API integration
│       └── schema.ts         # Validation schema
├── hooks/                     # Custom React hooks
│   └── useCorpNumberCheck.ts
└── screens/                   # Screen components
    └── OnboardingScreen.tsx
```

## 🎨 Architecture

### Atomic Design Pattern

The project follows atomic design principles:

- **Atoms**: Basic UI elements (Button, Label, HelperText)
- **Molecules**: Combinations of atoms (TextField)
- **Organisms**: Complex UI sections (OnboardingForm)
- **Templates**: Page layouts (FormTemplate)
- **Screens**: Complete pages (OnboardingScreen)

### Design Tokens

Centralized design system in `src/design/`:
- `colors.ts`: Color palette
- `spacing.ts`: Spacing scale
- `typography.ts`: Text styles

## 📝 Form Validation Rules

### First Name & Last Name
- Required field
- Maximum 50 characters

### Phone Number
- Required field
- Must start with `+1` (Canadian country code)
- Must be followed by exactly 10 digits
- No special characters except `+` at the beginning
- Example: `+14165551234`

### Corporation Number
- Required field
- Must be exactly 9 digits
- Validated asynchronously via API
- Valid test numbers:
  - `826417395`
  - `158739264`
  - `123456789`
  - `591863427`
  - `312574689`
  - `287965143`
  - `265398741`
  - `762354918`
  - `468721395`
  - `624719583`

## 🔌 API Integration

### Corporation Number Validation
- **Endpoint**: `GET https://fe-hometask-api.qa.vault.tryvault.com/corporation-number/{number}`
- **Response**: `{ "corporationNumber": "123456789", "valid": true }`

### Profile Submission
- **Endpoint**: `POST https://fe-hometask-api.qa.vault.tryvault.com/profile-details`
- **Payload**:
  ```json
  {
    "firstName": "Jane",
    "lastName": "Doe",
    "phone": "+14165551234",
    "corporationNumber": "826417395"
  }
  ```
- **Success Response**: Status 200
- **Error Response**: Status 400 with error message

## 🛠️ Technologies Used

- **React Native** (0.81.5): Mobile framework
- **Expo** (~54.0.20): Development platform
- **TypeScript** (~5.9.2): Type safety
- **React Hook Form** (^7.65.0): Form state management
- **Zod** (^3.25.76): Schema validation
- **React Native Testing Library** (^12.5.1): Testing
- **Jest**: Test runner
- **ESLint**: Code linting

## 📱 User Experience

- **On-blur validation**: Fields validate when user leaves the field
- **Real-time feedback**: Immediate validation errors
- **Loading states**: Visual feedback during async operations
- **Disabled states**: Submit button disabled until all fields are valid
- **Keyboard handling**: Proper keyboard types for each field
- **Safe area support**: Respects device safe areas

## 🚀 Production Readiness

This project is built with production standards:

1. **Type Safety**: Full TypeScript coverage
2. **Testing**: Comprehensive integration tests
3. **Error Handling**: Proper error states and messages
4. **Code Quality**: ESLint configuration
5. **Architecture**: Scalable atomic design pattern
6. **Validation**: Client-side and server-side validation
7. **Accessibility**: Proper ARIA labels and roles
8. **Performance**: Optimized re-renders with React Hook Form

## 📄 License

Private - For take-home assessment purposes only.

## 👨‍💻 Author

Built as a take-home task demonstration.

