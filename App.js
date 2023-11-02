import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useState, useEffect, useCallback } from "react";
import { useFonts } from "@use-expo/font"
import Navigation from "./navigation";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";


export default function App() {
  const [fontsLoaded] = useFonts({
    'Nexa': require("./assets/fonts/NexaHeavy.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return <Navigation />;
}
