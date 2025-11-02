import React from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { OnboardingScreen } from "./src/screens/OnboardingScreen";

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }} edges={["top", "bottom"]}>
        <StatusBar style="dark" />
        <OnboardingScreen />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
