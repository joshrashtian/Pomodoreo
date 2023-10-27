import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useState } from 'react';

export default function App() {
  const [count, setCount] = useState(0);

  const intId = setInterval(() => {
    setCount(count + 1);
    clearInterval(intId);
  }, 1000)

  return (
    <View style={styles.container}>
      <Text style={styles.clock}>{count}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  clock: {
    fontSize: 40,
    fontWeight: '700',
  }
});
