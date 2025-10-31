import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { OnboardingScreen } from './src/screens/OnboardingScreen';

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#0b1220' }}>
      <StatusBar style="light" />
      <OnboardingScreen />
    </SafeAreaView>
  );
}
