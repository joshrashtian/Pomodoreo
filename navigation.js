import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer, useNavigation } from '@react-navigation/native'
import Stopwatch from './screens/stopwatch';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName="Stopwatch" screenOptions={{ }}>
            <Stack.Screen name="Stopwatch" component={Stopwatch}/>
        </Stack.Navigator>
    </NavigationContainer>
  )
}