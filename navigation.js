import { View, Text } from "react-native";
import React from "react";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import Stopwatch from "./screens/stopwatch";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./screens/Home";

const Stack = createNativeStackNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Stopwatch" screenOptions={{ headerShown: false}}>
        <Stack.Screen name="Home" component={Home} initialParams={{ newseconds: 0 }} />
        <Stack.Screen name="Stopwatch" component={Stopwatch} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
