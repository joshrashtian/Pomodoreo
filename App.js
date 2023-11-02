import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useState, useEffect, useCallback } from 'react';
import Navigation from './navigation';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';

export default function App() {
  const [appReady , setAppReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await {getFonts};
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppReady(true);
      }
    }

    prepare();
  }, []);

   const getFonts = Font.loadAsync({

   })

   const onLayoutRootView = useCallback(async ()=> {
    
   })


  return (
    <Navigation />
  )
}
